'use strict';

const fs = require('node:fs');
const path = require('node:path');
const localeConfig = require('../localization.config');

function walkLocaleFiles(locale, fn) {
  const dir = path.join(process.cwd(), locale);
  if (!fs.existsSync(dir)) return;
  for (const name of fs.readdirSync(dir).filter((f) => f.endsWith('.html'))) {
    const file = path.join(dir, name);
    const before = fs.readFileSync(file, 'utf8');
    const after = fn(before, name);
    if (after !== before) fs.writeFileSync(file, after);
  }
}

function fixFrench(html) {
  let out = html;

  const phrases = [
    // multi-char / special
    [/o\uFFFD\b/g, 'où'],
    [/O\uFFFD\b/g, 'Où'],
    [/\uFFFDa\b/g, 'ça'],
    [/\uFFFDa\./g, 'ça.'],
    [/\uFFFDtre\b/g, 'être'],
    [/\uFFFDt\uFFFD\b/g, 'été'],
    [/\uFFFDt\uFFFD /g, 'été '],
    [/\uFFFDv\uFFFDnements/g, 'événements'],
    [/\uFFFDv\uFFFDnement/g, 'événement'],
    [/\uFFFDtoiles/g, 'étoiles'],
    [/\uFFFDtoile/g, 'étoile'],
    [/\uFFFDvidence/g, 'évidence'],
    [/\uFFFDchec/g, 'échec'],
    [/\uFFFDcartement/g, 'écartement'],
    [/\uFFFDpigramme/g, 'épigramme'],
    [/\uFFFDil\b/g, 'œil'],
    [/D\uFFFDj\uFFFD/g, 'Déjà'],
    [/d\uFFFDj\uFFFD/g, 'déjà'],
    [/int\uFFFDress\uFFFD/g, 'intéressé'],
    [/Int\uFFFDress\uFFFD/g, 'Intéressé'],
    [/int\uFFFDress/g, 'intéress'],
    [/t\uFFFDl\uFFFDcharg\uFFFD/g, 'téléchargé'],
    [/T\uFFFDl\uFFFDcharg\uFFFD/g, 'Téléchargé'],
    [/\uFFFDcoul\uFFFD/g, 'écoulé'],
    [/parl\uFFFD/g, 'parlé'],
    [/synchronis\uFFFD/g, 'synchronisé'],
    [/concentr\uFFFD/g, 'concentré'],
    [/recommand\uFFFD/g, 'recommandé'],
    [/essay\uFFFD/g, 'essayé'],
    [/not\uFFFD/g, 'noté'],
    [/destin\uFFFD/g, 'destiné'],
    [/int\uFFFDgr\uFFFD/g, 'intégré'],
    [/enregistr\uFFFD/g, 'enregistré'],
    [/calcul\uFFFD/g, 'calculé'],
    [/alli\uFFFD/g, 'allié'],
    [/canap\uFFFD/g, 'canapé'],
    [/\uFFFDlev\uFFFD/g, 'élevé'],
    [/capacit\uFFFD/g, 'capacité'],
    [/possibilit\uFFFD/g, 'possibilité'],
    [/sant\uFFFD/g, 'santé'],
    [/perspicacit\uFFFD/g, 'perspicacité'],
    [/arr\uFFFDt/g, 'arrêt'],
    [/l\uFFFD\b/g, 'là'],
    [/Comment \uFFFDa/g, 'Comment ça'],
    [/comme \uFFFDa/g, 'comme ça'],
    [/essayer \uFFFDa/g, 'essayer ça'],
    [/5 \uFFFDtoiles/g, '5 étoiles'],
    [/\uFFFDtoiles sur/g, 'étoiles sur'],
    // remaining participle-ish trailing FFFD → é
    [/(\p{L})\uFFFD\b/gu, '$1é'],
    [/(\p{L})\uFFFD(\p{L})/gu, '$1é$2'],
    [/\b\uFFFD(\p{L})/gu, 'é$1'],
  ];

  for (const [re, rep] of phrases) out = out.replace(re, rep);
  return out;
}

function fixTurkishIndex(html) {
  let out = html;
  // Everyday section
  out = out.replace(
    /<h2 class="big">[\s\S]*?<\/h2>/,
    '<h2 class="big">Her günün için <i>yapıldı.</i></h2>',
  );
  // Only first big h2 — be careful; class="big" may appear once on index
  // Review card leftover English
  out = out.replace(
    /Günlük okuma için Made for daily reading/g,
    'Günlük okuma için tasarlandı',
  );
  out = out.replace(/\bMade for\b/g, 'Tasarım:');
  // undo over-replace if we broke h2
  out = out.replace(
    /<h2 class="big">Tasarım:[\s\S]*?<\/h2>/,
    '<h2 class="big">Her günün için <i>yapıldı.</i></h2>',
  );
  // Nav FAQ
  out = out.replace(/>SSS</g, '>SSS</');
  // Company footer label
  out = out.replace(/>ŞİRKET</g, '>ŞİRKET</');
  return out;
}

function fixVietnameseIndex(html) {
  let out = html;
  out = out.replace(
    /<h2 class="big">[\s\S]*?<\/h2>/,
    '<h2 class="big">Làm ra cho <i>ngày thường của bạn.</i></h2>',
  );
  out = out.replace(/HuhBook/g, 'HushBook');
  out = out.replace(/Hugbook/g, 'HushBook');
  // fix accidental markdown leftovers
  out = out.replace(/# Tặng cho # For/g, 'Làm ra cho');
  out = out.replace(/# /g, '');
  return out;
}

function fixUkrainianIndex(html) {
  let out = html;
  out = out.replace(
    /<h2 class="big">[\s\S]*?<\/h2>/,
    '<h2 class="big">Зроблено для <i>вашого щодня.</i></h2>',
  );
  return out;
}

// FR all pages
walkLocaleFiles('fr', (html) => fixFrench(html));

// Targeted index fixes
for (const [locale, fn] of [
  ['tr', fixTurkishIndex],
  ['vi', fixVietnameseIndex],
  ['uk', fixUkrainianIndex],
]) {
  const file = path.join(process.cwd(), locale, 'index.html');
  const before = fs.readFileSync(file, 'utf8');
  fs.writeFileSync(file, fn(before));
}

// Report
for (const l of ['fr', 'tr', 'vi', 'uk', 'th']) {
  let fffd = 0;
  for (const page of localeConfig.publicPages) {
    const file = path.join(process.cwd(), l, page);
    if (!fs.existsSync(file)) continue;
    const h = fs.readFileSync(file, 'utf8');
    fffd += (h.match(/\uFFFD/g) || []).length;
  }
  const idx = fs.readFileSync(path.join(process.cwd(), l, 'index.html'), 'utf8');
  const big = idx.match(/class="big"[^>]*>([\s\S]*?)<\/h2>/)?.[1]
    ?.replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  console.log(`${l}: totalFFFD=${fffd} big="${big}" style=${idx.includes('<style')} spam=${/About About|Made for Made/.test(idx)}`);
}

// remaining fr samples
const fr = fs.readFileSync('fr/index.html', 'utf8');
const ctx = new Set();
for (const m of fr.matchAll(/\uFFFD/g)) {
  ctx.add(fr.slice(Math.max(0, m.index - 10), m.index + 10));
}
console.log('fr remaining contexts:', [...ctx].slice(0, 20));
