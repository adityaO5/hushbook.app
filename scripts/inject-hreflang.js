'use strict';

/**
 * Replace <link rel="alternate" hreflang="..."> blocks on every public page
 * with the full publishedLocales set (+ x-default).
 *
 * URLs match scripts/build-sitemap.js (cleanUrls, no .html).
 * Safe to re-run.
 *
 * Usage: node scripts/inject-hreflang.js
 */
const fs = require('node:fs');
const path = require('node:path');
const localeConfig = require('../localization.config');

const root = path.join(__dirname, '..');
const BASE = 'https://hushbook.app';
const DEFAULT_LOCALE = localeConfig.defaultLocale || 'en';
const LOCALES = localeConfig.publishedLocales || [DEFAULT_LOCALE];
const PAGES = (localeConfig.publicPages || []).map((page) => page.replace(/\.html$/, ''));

/** Clean URL for a locale + page (matches vercel cleanUrls / trailingSlash:false). */
function pageUrl(locale, page) {
  const isIndex = page === 'index';
  if (locale === DEFAULT_LOCALE) {
    return isIndex ? `${BASE}/` : `${BASE}/${page}`;
  }
  return isIndex ? `${BASE}/${locale}` : `${BASE}/${locale}/${page}`;
}

function pageFile(locale, page) {
  const file = page === 'index' ? 'index.html' : `${page}.html`;
  return locale === DEFAULT_LOCALE
    ? path.join(root, file)
    : path.join(root, locale, file);
}

function hreflangBlock(page) {
  const lines = [];
  for (const locale of LOCALES) {
    if (!fs.existsSync(pageFile(locale, page))) continue;
    lines.push(
      `<link rel="alternate" hreflang="${locale}" href="${pageUrl(locale, page)}">`
    );
  }
  lines.push(
    `<link rel="alternate" hreflang="x-default" href="${pageUrl(DEFAULT_LOCALE, page)}">`
  );
  return lines.join('\n');
}

/** Contiguous block of alternate hreflang links (with optional blank lines). */
const HREFLANG_BLOCK_RE =
  /(?:[ \t]*<link\s+rel="alternate"\s+hreflang="[^"]*"\s+href="[^"]*"\s*>\s*\n?)+/gi;

let updated = 0;
let skipped = 0;
let missing = 0;

for (const page of PAGES) {
  const block = hreflangBlock(page);

  for (const locale of LOCALES) {
    const file = pageFile(locale, page);
    if (!fs.existsSync(file)) {
      console.warn(`skip missing: ${path.relative(root, file)}`);
      missing += 1;
      continue;
    }

    const html = fs.readFileSync(file, 'utf8');
    if (!HREFLANG_BLOCK_RE.test(html)) {
      // reset lastIndex after test()
      HREFLANG_BLOCK_RE.lastIndex = 0;
      console.warn(`no hreflang block: ${path.relative(root, file)}`);
      skipped += 1;
      continue;
    }
    HREFLANG_BLOCK_RE.lastIndex = 0;

    const next = html.replace(HREFLANG_BLOCK_RE, () => `${block}\n`);
    if (next === html) {
      skipped += 1;
      continue;
    }

    fs.writeFileSync(file, next);
    updated += 1;
  }
}

console.log(
  `hreflang inject: updated=${updated} unchanged/skipped=${skipped} missing=${missing}`
);
console.log(`Locales: ${LOCALES.length} · Pages: ${PAGES.length}`);
