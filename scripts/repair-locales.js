'use strict';

/**
 * Repair broken machine-translated locale pages:
 * - reinject missing <style>/scripts from English counterparts (uk/vi/th)
 * - restore technical meta (viewport, og:type, theme-color)
 * - collapse MT word-spam loops (tr)
 * - replace French U+FFFD corruption with correct accents
 * - force root-relative /assets/ paths
 */
const fs = require('node:fs');
const path = require('node:path');
const localeConfig = require('../localization.config');

const ROOT = process.cwd();
const PAGES = localeConfig.publicPages;
const LOCALES = (localeConfig.publishedLocales || []).filter((c) => c !== 'en');

const EN = Object.fromEntries(
  PAGES.map((page) => {
    const file = path.join(ROOT, page);
    return [page, fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null];
  }),
);

function enPage(page) {
  return EN[page];
}

function extractStyle(html) {
  const m = html.match(/<style>[\s\S]*?<\/style>/);
  return m ? m[0] : '';
}

function extractHeadLinks(html) {
  // fonts + preconnect only (not canonical/hreflang which are locale-specific)
  const parts = [];
  for (const re of [
    /<link rel="preconnect"[^>]*>/g,
    /<link href="https:\/\/fonts\.googleapis\.com[^"]*"[^>]*>/g,
  ]) {
    const hits = html.match(re);
    if (hits) parts.push(...hits);
  }
  return parts.join('\n');
}

function extractTrailingScripts(html) {
  // From first external/runtime script after main content through locale.js
  const idx = html.search(/<script src="(?:https:|\/assets\/js\/)/);
  if (idx < 0) {
    // fallback: last chunk of script tags before </body>
    const m = html.match(/((?:<script[\s\S]*?<\/script>\s*)+)<div class="locale-switcher"[\s\S]*?<\/body>/);
    if (m) return m[1];
    return '';
  }
  const tail = html.slice(idx);
  const bodyClose = tail.lastIndexOf('</body>');
  const chunk = bodyClose >= 0 ? tail.slice(0, bodyClose) : tail;
  // Keep scripts + locale switcher mount
  return chunk.trim();
}

function restoreTechnicalMeta(html) {
  let out = html;
  out = out.replace(
    /<meta name="viewport"[^>]*>/i,
    '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">',
  );
  out = out.replace(
    /<meta property="og:type"[^>]*>/i,
    '<meta property="og:type" content="website">',
  );
  out = out.replace(
    /<meta name="twitter:card"[^>]*>/i,
    '<meta name="twitter:card" content="summary_large_image">',
  );
  if (!/charset=/i.test(out)) {
    out = out.replace(/<head>/i, '<head>\n<meta charset="utf-8">');
  }
  return out;
}

function forceAbsoluteAssets(html) {
  return html
    .replace(/(src|href|content)=(["'])assets\//g, '$1=$2/assets/')
    .replace(/(url\()(["']?)assets\//g, '$1$2/assets/');
}

function ensureLocaleScript(html) {
  if (html.includes('/assets/js/locale.js')) return html;
  if (html.includes('data-locale-switcher')) {
    return html.replace(
      '</body>',
      '<script src="/assets/js/locale.js" defer></script></body>',
    );
  }
  return html.replace(
    '</body>',
    '<div class="locale-switcher" data-locale-switcher aria-label="Language selector"></div>\n<script src="/assets/js/locale.js" defer></script></body>',
  );
}

function injectMissingStructure(localeHtml, enHtml) {
  let out = localeHtml;
  if (!out.includes('<style') && enHtml) {
    const style = extractStyle(enHtml);
    const fonts = extractHeadLinks(enHtml);
    if (style) {
      // Insert before </head>
      if (out.includes('</head>')) {
        out = out.replace('</head>', `${fonts}\n${style}\n</head>`);
      } else {
        out = out.replace('<body>', `${fonts}\n${style}\n<body>`);
      }
    }
  }

  if (!/<script/i.test(out) && enHtml) {
    const scripts = extractTrailingScripts(enHtml);
    if (scripts) {
      out = out.replace('</body>', `${scripts}\n</body>`);
    }
  }

  return out;
}

function collapseSpam(html) {
  let out = html;
  // Collapse any word/phrase repeated 3+ times with spaces
  out = out.replace(/\b([\p{L}\p{N}&']+(?: [\p{L}\p{N}&']+){0,3})(?: \1){2,}/gu, '$1');
  // English leftovers that looped in TR
  out = out.replace(/(?:About(?: About)+)/g, 'Hakkında');
  out = out.replace(/(?:Made for(?: Made for)+)/g, 'Made for');
  // Fix known TR section heading
  out = out.replace(
    /<h2 class="big">Made for<\/h2>/,
    '<h2 class="big">Made for <i>your everyday.</i></h2>',
  );
  // If still English "Made for" alone in TR big heading, use proper TR
  out = out.replace(
    /(<html lang="tr">[\s\S]*?<h2 class="big">)Made for(?: <i>your everyday\.<\/i>)?(<\/h2>)/,
    '$1Günlük hayatın için$2',
  );
  // Prefer better TR everyday line matching DE sense
  out = out.replace(
    /(<html lang="tr">[\s\S]*?<h2 class="big">)Günlük hayatın için(<\/h2>)/,
    '$1Her günün için yapıldı$2',
  );
  // Fix double-doubled short nav labels after collapse still wrong
  out = out.replace(/\bAnalizler Analizler\b/g, 'Analizler');
  out = out.replace(/\bSSS SSS\b/g, 'SSS');
  out = out.replace(/\bÜRÜN ÜRÜN\b/g, 'ÜRÜN');
  out = out.replace(/\bŞİRKET ŞİRKETİ\b/g, 'ŞİRKET');
  out = out.replace(/(?:web sitesi(?: web sitesi)+)/g, 'website');
  return out;
}

function fixFrenchReplacementChars(html) {
  let out = html;
  // Em dash / title separators first
  out = out.replace(/HushBook \uFFFD /g, 'HushBook — ');
  out = out.replace(/ \uFFFD /g, ' — ');

  // High-confidence French word repairs (� = lost é/è/ê/à/ç…)
  const phrases = [
    [/t\uFFFDl\uFFFDphone/g, 'téléphone'],
    [/T\uFFFDl\uFFFDcharger/g, 'Télécharger'],
    [/t\uFFFDl\uFFFDcharger/g, 'télécharger'],
    [/T\uFFFDl\uFFFDcharg/g, 'Télécharg'],
    [/t\uFFFDl\uFFFDcharg/g, 'télécharg'],
    [/karaok\uFFFD/g, 'karaoké'],
    [/priv\uFFFD/g, 'privé'],
    [/Priv\uFFFD/g, 'Privé'],
    [/accessibilit\uFFFD/g, 'accessibilité'],
    [/Accessibilit\uFFFD/g, 'Accessibilité'],
    [/r\uFFFDsum\uFFFD/g, 'résumé'],
    [/transform\uFFFD/g, 'transformé'],
    [/Transform\uFFFD/g, 'Transformé'],
    [/num\uFFFDriq/g, 'numériq'],
    [/s\uFFFDcurit/g, 'sécurit'],
    [/donn\uFFFDes/g, 'données'],
    [/Donn\uFFFDes/g, 'Données'],
    [/personnalis\uFFFD/g, 'personnalisé'],
    [/int\uFFFDgr/g, 'intégr'],
    [/Int\uFFFDgr/g, 'Intégr'],
    [/biblioth\uFFFDque/g, 'bibliothèque'],
    [/Biblioth\uFFFDque/g, 'Bibliothèque'],
    [/propri\uFFFDt/g, 'propriét'],
    [/qualit\uFFFD/g, 'qualité'],
    [/Qualit\uFFFD/g, 'Qualité'],
    [/gratuit\uFFFD/g, 'gratuité'],
    [/r\uFFFDalit/g, 'réalit'],
    [/R\uFFFDalit/g, 'Réalit'],
    [/int\uFFFDr\uFFFDt/g, 'intérêt'],
    [/premi\uFFFDre/g, 'première'],
    [/Premi\uFFFDre/g, 'Première'],
    [/derni\uFFFDre/g, 'dernière'],
    [/lumi\uFFFDre/g, 'lumière'],
    [/mani\uFFFDre/g, 'manière'],
    [/derri\uFFFDre/g, 'derrière'],
    [/tr\uFFFDs\b/g, 'très'],
    [/Tr\uFFFDs\b/g, 'Très'],
    [/d\uFFFDj\uFFFD/g, 'déjà'],
    [/apr\uFFFDs/g, 'après'],
    [/Apr\uFFFDs/g, 'Après'],
    [/compl\uFFFDt/g, 'complèt'],
    [/Compl\uFFFDt/g, 'Complèt'],
    [/sp\uFFFDcial/g, 'spécial'],
    [/Sp\uFFFDcial/g, 'Spécial'],
    [/g\uFFFDn\uFFFDral/g, 'général'],
    [/G\uFFFDn\uFFFDral/g, 'Général'],
    [/mod\uFFFDle/g, 'modèle'],
    [/Mod\uFFFDle/g, 'Modèle'],
    [/contr\uFFFDle/g, 'contrôle'],
    [/Contr\uFFFDle/g, 'Contrôle'],
    [/r\uFFFDglage/g, 'réglage'],
    [/R\uFFFDglage/g, 'Réglage'],
    [/pr\uFFFDf\uFFFDr/g, 'préfér'],
    [/Pr\uFFFDf\uFFFDr/g, 'Préfér'],
    [/m\uFFFDme/g, 'même'],
    [/M\uFFFDme/g, 'Même'],
    [/gr\uFFFDce/g, 'grâce'],
    [/Gr\uFFFDce/g, 'Grâce'],
    [/si\uFFFDcle/g, 'siècle'],
    [/\uFFFDcouter/g, 'écouter'],
    [/\uFFFDcoute/g, 'écoute'],
    [/\uFFFD\uFFFDgal/g, 'égal'],
    [/�galement/g, 'également'],
    [/\uFFFDgalement/g, 'également'],
    [/\uFFFDcran/g, 'écran'],
    [/\uFFFDcrans/g, 'écrans'],
    [/v\uFFFDrit/g, 'vérit'],
    [/V\uFFFDrit/g, 'Vérit'],
    [/l\uFFFDve/g, 'lève'],
    [/s\uFFFDlection/g, 'sélection'],
    [/S\uFFFDlection/g, 'Sélection'],
    [/connexions?\uFFFD/g, 'connexion'],
    [/exp\uFFFDrience/g, 'expérience'],
    [/Exp\uFFFDrience/g, 'Expérience'],
    [/t\uFFFDmoignage/g, 'témoignage'],
    [/T\uFFFDmoignage/g, 'Témoignage'],
    [/r\uFFFDponse/g, 'réponse'],
    [/R\uFFFDponse/g, 'Réponse'],
    [/r\uFFFDpond/g, 'répond'],
    [/R\uFFFDpond/g, 'Répond'],
    [/cr\uFFFD\uFFFD/g, 'créé'],
    [/cr\uFFFDe/g, 'crée'],
    [/Cr\uFFFDe/g, 'Crée'],
    [/num\uFFFDro/g, 'numéro'],
    [/p\uFFFDriode/g, 'période'],
    [/m\uFFFDthode/g, 'méthode'],
    [/M\uFFFDthode/g, 'Méthode'],
    [/syst\uFFFDme/g, 'système'],
    [/Syst\uFFFDme/g, 'Système'],
    [/param\uFFFDtre/g, 'paramètre'],
    [/Param\uFFFDtre/g, 'Paramètre'],
    [/r\uFFFDseau/g, 'réseau'],
    [/R\uFFFDseau/g, 'Réseau'],
    [/m\uFFFDdia/g, 'média'],
    [/M\uFFFDdia/g, 'Média'],
    [/vid\uFFFDo/g, 'vidéo'],
    [/Vid\uFFFDo/g, 'Vidéo'],
    [/audio\uFFFD/g, 'audio'],
    [/c\uFFFDt\uFFFD/g, 'côté'],
    [/\uFFFD\uFFFD/g, 'éé'], // rare double
  ];

  for (const [re, rep] of phrases) out = out.replace(re, rep);

  // Remaining lone FFFD between letters → é (most common lost French vowel)
  out = out.replace(/(\p{L})\uFFFD(\p{L})/gu, '$1é$2');
  out = out.replace(/(\p{L})\uFFFD\b/gu, '$1é');
  out = out.replace(/\b\uFFFD(\p{L})/gu, 'é$1');

  // Known FR typos from MT
  out = out.replace(/Tracscrivez/g, 'Transcrivez');
  out = out.replace(/tracscrivez/g, 'transcrivez');

  return out;
}

function fixVietnameseBranding(html) {
  return html
    .replace(/HuhBook/g, 'HushBook')
    .replace(/Hugbook/g, 'HushBook')
    .replace(/HugBook/g, 'HushBook')
    .replace(/Name<\/title>/, 'HushBook</title>')
    .replace(/content="Name"/g, 'content="HushBook"');
}

function fixLocalePaths(html, locale) {
  // canonical / hreflang self
  let out = html;
  // brand home on subpages should stay locale home when possible
  // (leave # anchors alone)
  return out;
}

function repairFile(locale, page) {
  const file = path.join(ROOT, locale, page);
  if (!fs.existsSync(file)) return { skipped: true };

  const enHtml = enPage(page);
  let html = fs.readFileSync(file, 'utf8');
  const before = html;

  html = injectMissingStructure(html, enHtml);
  html = restoreTechnicalMeta(html);
  html = forceAbsoluteAssets(html);
  html = ensureLocaleScript(html);

  if (locale === 'fr') html = fixFrenchReplacementChars(html);
  if (locale === 'tr') html = collapseSpam(html);
  if (locale === 'vi') html = fixVietnameseBranding(html);

  // Universal light spam collapse for any locale that looped
  if (/(?:About ){5,}/.test(html) || /(?:Made for ){5,}/.test(html)) {
    html = collapseSpam(html);
  }

  html = fixLocalePaths(html, locale);

  if (html !== before) {
    fs.writeFileSync(file, html);
    return {
      fixed: true,
      fffdBefore: (before.match(/\uFFFD/g) || []).length,
      fffdAfter: (html.match(/\uFFFD/g) || []).length,
      style: html.includes('<style'),
      scripts: (html.match(/<script/g) || []).length,
    };
  }
  return {
    fixed: false,
    fffdBefore: (before.match(/\uFFFD/g) || []).length,
    fffdAfter: (html.match(/\uFFFD/g) || []).length,
    style: html.includes('<style'),
    scripts: (html.match(/<script/g) || []).length,
  };
}

const report = [];
for (const locale of LOCALES) {
  for (const page of PAGES) {
    const result = repairFile(locale, page);
    if (!result.skipped) {
      report.push({ locale, page, ...result });
    }
  }
}

// Summary
const byLocale = {};
for (const row of report) {
  byLocale[row.locale] ||= { fixed: 0, pages: 0, fffd: 0, noStyle: 0 };
  byLocale[row.locale].pages += 1;
  if (row.fixed) byLocale[row.locale].fixed += 1;
  byLocale[row.locale].fffd += row.fffdAfter;
  if (!row.style) byLocale[row.locale].noStyle += 1;
}

console.log('Repair summary by locale:');
for (const [locale, s] of Object.entries(byLocale)) {
  console.log(
    `  ${locale}: pages=${s.pages} rewritten=${s.fixed} remainingFFFD=${s.fffd} missingStyle=${s.noStyle}`,
  );
}

// Spotlight checks
for (const l of ['uk', 'vi', 'th', 'fr', 'tr']) {
  const p = path.join(ROOT, l, 'index.html');
  const h = fs.readFileSync(p, 'utf8');
  const h1 = (h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1]
    ?.replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 80);
  const big = (h.match(/class="big"[^>]*>([\s\S]*?)<\/h2>/) || [])[1]
    ?.replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 80);
  console.log(
    `${l}: style=${h.includes('<style')} scripts=${(h.match(/<script/g) || []).length} fffd=${(h.match(/\uFFFD/g) || []).length}`,
  );
  console.log(`  h1: ${h1}`);
  console.log(`  big: ${big}`);
  console.log(`  aboutSpam=${/About About/.test(h)} viewportOK=${/width=device-width, initial-scale=1/.test(h)}`);
}
