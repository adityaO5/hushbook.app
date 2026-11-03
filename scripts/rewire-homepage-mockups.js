#!/usr/bin/env node
'use strict';
/**
 * Mirrors the homepage's phone-mockup markup from index.html into every locale homepage.
 *
 * The English page is the source of truth for the blocks that carry no translatable text:
 * the hero fan (five phones + the live read-along layer), its CSS block, its script tag,
 * the player marquee and the WebGL marquee's image list. Every other phone slot is a
 * single <img>; those are rewritten in place, by position inside their section, so the
 * locale page keeps its translated alt text around the new file name.
 *
 * Image paths: locale pages point at /assets/img/mockups/<file>.webp (the English masters)
 * by default. `--mode localized` points them at /assets/img/mockups/locales/<lc>/<file>.webp
 * for the files that exist there (rendered with `node tools/mockups/render.mjs --locale <lc>`),
 * and leaves the rest on the masters.
 *
 *   node scripts/rewire-homepage-mockups.js              all published locales, masters
 *   node scripts/rewire-homepage-mockups.js --locale de  one locale
 *   node scripts/rewire-homepage-mockups.js --mode localized
 *   node scripts/rewire-homepage-mockups.js --check      report, write nothing (exit 1 on drift)
 */
const fs = require('node:fs');
const path = require('node:path');
const config = require('../localization.config.js');

const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const opt = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };
const MODE = opt('--mode') || 'masters';
const CHECK = args.includes('--check');
const LOCALES = opt('--locale') ? opt('--locale').split(',') : config.publishedLocales.filter((l) => l !== 'en');

const en = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

/** Slots whose <img> is rewritten by position: [section regex, [new file per img in order]]. */
const SLOTS = [
  // How it works: four steps
  { name: 'steps', open: /<div class="steps">/, close: /<\/div>\s*<\/div>\s*<\/section>/, files: ['discover', 'step-transcribe', 'step-transcribing', 'read-along-paper'] },
  // Quotes: three cards
  { name: 'gallery', open: /<div class="gallery">/, close: /<\/div>\s*<\/div>\s*<div class="marquee/, files: ['quote-mark', 'quote-index', 'quote-card'] },
  // Library split: home + library
  { name: 'library-duo', open: /<div class="split-media duo reveal">\s*<img src="[^"]*home/, close: /<\/div>/, files: ['home', 'library'] },
  // Reading life split: brain + analytics
  { name: 'life-duo', open: /<div class="split-media duo reveal">\s*<img src="[^"]*brain/, close: /<\/div>/, files: ['brain', 'analytics'] },
  // Pro collage: two cards, the phone, two cards
  { name: 'collage', open: /<div class="collage">/, close: /<\/div>\s*<p class="collage-cap/, files: ['card-habits', 'card-genres', 'analytics-calendar', 'card-records', 'card-goals'] },
  // Characters: back + front
  { name: 'characters', open: /<div class="split-media layer reveal">/, close: /<\/div>/, files: ['characters-sheet', 'characters-map'] },
];

/** Blocks copied verbatim from English (paths absolutised). */
function extractBetween(src, startRe, endRe, label) {
  const s = src.search(startRe);
  if (s < 0) throw new Error(`${label}: start marker not found`);
  const rest = src.slice(s);
  const m = rest.match(endRe);
  if (!m) throw new Error(`${label}: end marker not found`);
  const e = s + m.index + m[0].length;
  return { start: s, end: e, text: src.slice(s, e) };
}

const BLOCKS = [
  { name: 'hero-fan', startRe: /<div class="fan" aria-hidden="true">/, endRe: /\n<\/section>/ },
  { name: 'hero-css', startRe: /\/\* hra:css:start \*\//, endRe: /\/\* hra:css:end \*\//, optional: true },
  { name: 'hero-script', startRe: /<!-- hra:script -->/, endRe: /<script defer src="[^"]*hero-read-along\.js"><\/script>/, optional: true },
  { name: 'marquee-track', startRe: /<div class="marquee-track" id="marquee-fallback">/, endRe: /\n\s*<\/div>/ },
  { name: 'marquee-images', startRe: /const IMAGES = \[/, endRe: /\];/ },
  { name: 'marquee-keyframes', startRe: /@keyframes slide\{/, endRe: /\}\}/ },
];

function absolutise(text) {
  return text
    .replace(/(src|href)="assets\//g, '$1="/assets/')
    .replace(/url\((['"]?)assets\//g, 'url($1/assets/')
    .replace(/"assets\/img\/mockups\//g, '"/assets/img/mockups/');
}

function mockupPath(locale, file) {
  if (MODE === 'localized' && fs.existsSync(path.join(ROOT, 'assets', 'img', 'mockups', 'locales', locale, file + '.webp'))) {
    return `/assets/img/mockups/locales/${locale}/${file}.webp`;
  }
  return `/assets/img/mockups/${file}.webp`;
}

function rewriteSlots(html, locale, report) {
  for (const slot of SLOTS) {
    const s = html.search(slot.open);
    if (s < 0) { report.push(`  ${slot.name}: section not found`); continue; }
    const rest = html.slice(s);
    const closeM = rest.match(slot.close);
    const e = closeM ? s + closeM.index + closeM[0].length : html.length;
    let section = html.slice(s, e);
    let i = 0;
    section = section.replace(/<img([^>]*?)src="[^"]*\/mockups\/[^"]*"/g, (m, pre) => {
      const file = slot.files[i++];
      if (!file) return m;
      return `<img${pre}src="${mockupPath(locale, file)}"`;
    });
    if (i !== slot.files.length) report.push(`  ${slot.name}: expected ${slot.files.length} images, found ${i}`);
    html = html.slice(0, s) + section + html.slice(e);
  }
  return html;
}

function localiseBlock(block, locale) {
  // Live-layer images and the marquee list live on the masters or the locale folder like any slot.
  return absolutise(block.text).replace(/\/assets\/img\/mockups\/([a-z0-9-]+)\.webp/g, (m, file) => {
    if (file === 'frame-iphone') return m;
    return mockupPath(locale, file);
  });
}

/**
 * The hero's live read-along draws its chapter label and "Aa" button from the JSON inside the fan
 * block, with a Latin-only subset of the hero font. A locale whose label the font can show gets
 * the label from tools/mockups/scenes/ios-read-along/strings/<lc>.json, so the live layer matches
 * the localized render beneath it. Any other locale keeps the English label and, with it, the
 * English render underneath, so nothing changes when the live layer fades in.
 */
const HERO_FONT_COVERS = /^[ -ɏ{}]+$/;
function heroStrings(locale) {
  const file = path.join(ROOT, 'tools', 'mockups', 'scenes', 'ios-read-along', 'strings', `${locale}.json`);
  if (MODE !== 'localized' || !fs.existsSync(file)) return null;
  const s = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (typeof s.chapterLabel !== 'string' || !HERO_FONT_COVERS.test(s.chapterLabel)) return null;
  return { chapterLabel: s.chapterLabel, aaButton: typeof s.aaButton === 'string' ? s.aaButton : 'Aa' };
}
function localiseHeroFan(block, locale) {
  let text = localiseBlock(block, locale);
  const hs = heroStrings(locale);
  if (hs) {
    text = text
      .replace(/("chapterLabel":\s*)"[^"]*"/, `$1${JSON.stringify(hs.chapterLabel)}`)
      .replace(/("aaButton":\s*)"[^"]*"/, `$1${JSON.stringify(hs.aaButton)}`);
  } else {
    text = text.replace(/\/assets\/img\/mockups\/locales\/[a-z0-9-]+\/read-along\.webp/gi, '/assets/img/mockups/read-along.webp');
  }
  return text;
}

/**
 * The Pro collage is rebuilt from the English block: the locale pages carried broken markup there
 * (escaped `>` showing as text, missing </figure>, a stale `dark` card class). The locale keeps
 * its own five tag labels and five alt texts, taken from the old block in order.
 */
const TAG_RE = /(<span class="tag [^"]*"[^>]*>)([^<]*)(<\/span>)/g;
const ALT_RE = /(<img [^>]*?alt=")([^"]*)(")/g;
function rebuildCollage(html, locale, report) {
  const s = html.search(/<div class="collage">/);
  if (s < 0) { report.push('  collage: section not found'); return html; }
  const capAt = html.indexOf('<p class="collage-cap', s);
  if (capAt < 0) { report.push('  collage: caption not found'); return html; }
  const old = html.slice(s, capAt);
  const tags = [...old.matchAll(TAG_RE)].map((m) => m[2]);
  const alts = [...old.matchAll(ALT_RE)].map((m) => m[2]);
  const enS = en.search(/<div class="collage">/);
  const enBlock = en.slice(enS, en.indexOf('<p class="collage-cap', enS));
  const want = [...enBlock.matchAll(TAG_RE)].length;
  if (tags.length !== want || alts.length !== want) {
    report.push(`  collage: expected ${want} tags and alts, found ${tags.length} tags / ${alts.length} alts; left as is`);
    return html;
  }
  let ti = 0;
  let ai = 0;
  const block = localiseBlock({ text: enBlock }, locale)
    .replace(TAG_RE, (m, a, _t, b) => a + tags[ti++] + b)
    .replace(ALT_RE, (m, a, _t, b) => a + alts[ai++] + b);
  return html.slice(0, s) + block + html.slice(capAt);
}

const enBlocks = {};
for (const b of BLOCKS) {
  try { enBlocks[b.name] = extractBetween(en, b.startRe, b.endRe, b.name); }
  catch (e) { if (!b.optional) throw e; }
}

let drift = 0;
for (const locale of LOCALES) {
  const file = path.join(ROOT, locale, 'index.html');
  if (!fs.existsSync(file)) continue;
  const before = fs.readFileSync(file, 'utf8');
  let html = before;
  const report = [];

  for (const b of BLOCKS) {
    const enBlock = enBlocks[b.name];
    if (!enBlock) continue;
    let target;
    try { target = extractBetween(html, b.startRe, b.endRe, b.name); }
    catch (e) {
      if (b.name === 'hero-css') {
        // First run: insert the CSS block right after the English page's own anchor, the .fan rules.
        const anchor = html.search(/\n\.fan img:hover\{[^\n]*\n/);
        if (anchor < 0) { report.push('  hero-css: anchor not found'); continue; }
        const at = anchor + html.slice(anchor).indexOf('\n', 1) + 1;
        html = html.slice(0, at) + localiseBlock(enBlock, locale) + '\n' + html.slice(at);
        continue;
      }
      if (b.name === 'hero-script') {
        const at = html.lastIndexOf('</body>');
        if (at < 0) { report.push('  hero-script: </body> not found'); continue; }
        html = html.slice(0, at) + localiseBlock(enBlock, locale) + '\n' + html.slice(at);
        continue;
      }
      report.push(`  ${b.name}: ${e.message}`);
      continue;
    }
    const localised = b.name === 'hero-fan' ? localiseHeroFan(enBlock, locale) : localiseBlock(enBlock, locale);
    html = html.slice(0, target.start) + localised + html.slice(target.end);
  }

  html = rebuildCollage(html, locale, report);
  html = rewriteSlots(html, locale, report);

  // Stale single references the slots do not cover (the old hero alt, old preload hints).
  html = html.replace(/\/assets\/img\/mockups\/locales\/[a-z-]+\/karaoke-live\.webp/g, mockupPath(locale, 'read-along'));

  const changed = html !== before;
  if (changed) drift++;
  console.log(`${locale.padEnd(7)} ${changed ? (CHECK ? 'would change' : 'updated') : 'unchanged'}${report.length ? '\n' + report.join('\n') : ''}`);
  if (changed && !CHECK) fs.writeFileSync(file, html);
}
if (CHECK && drift) process.exit(1);
