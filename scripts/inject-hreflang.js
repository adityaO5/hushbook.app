'use strict';

/**
 * Replace <link rel="alternate" hreflang="..."> blocks on every public page
 * with hreflangAlternates(): published locales, language catchalls (es, pt),
 * country-region tags from countryLocales, and x-default.
 *
 * URLs match scripts/build-sitemap.js (cleanUrls, no .html).
 * Safe to re-run.
 *
 * Usage: node scripts/inject-hreflang.js
 */
const fs = require('node:fs');
const path = require('node:path');
const {
  injectHreflang,
  PUBLIC_PAGES,
  ENGLISH_ONLY_PAGES,
  PUBLISHED_LOCALES,
  DEFAULT_LOCALE,
  pageFile,
} = require('./seo-localization');

const root = path.join(__dirname, '..');
const LOCALES = PUBLISHED_LOCALES;
const PAGES = PUBLIC_PAGES;

let updated = 0;
let skipped = 0;
let missing = 0;

for (const page of PAGES) {
  for (const locale of LOCALES) {
    const file = pageFile(locale, page);
    if (!fs.existsSync(file)) {
      console.warn(`skip missing: ${path.relative(root, file)}`);
      missing += 1;
      continue;
    }

    const html = fs.readFileSync(file, 'utf8');
    const next = injectHreflang(html, page);
    if (next === html) {
      skipped += 1;
      continue;
    }

    fs.writeFileSync(file, next);
    updated += 1;
  }
}

for (const page of ENGLISH_ONLY_PAGES) {
  const file = pageFile(DEFAULT_LOCALE, page);
  if (!fs.existsSync(file)) {
    console.warn(`skip missing: ${path.relative(root, file)}`);
    missing += 1;
    continue;
  }
  const html = fs.readFileSync(file, 'utf8');
  const next = injectHreflang(html, page);
  if (next === html) {
    skipped += 1;
    continue;
  }
  fs.writeFileSync(file, next);
  updated += 1;
}

console.log(
  `hreflang inject: updated=${updated} unchanged/skipped=${skipped} missing=${missing}`
);
console.log(`Locales: ${LOCALES.length} · Pages: ${PAGES.length}`);
