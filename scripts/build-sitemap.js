'use strict';

/**
 * Builds sitemap.xml from localization.config.js so locale pages stay aligned.
 *
 * Usage: node scripts/build-sitemap.js
 */
const fs = require('node:fs');
const path = require('node:path');
const localeConfig = require('../localization.config');

const root = path.join(__dirname, '..');
const BASE = 'https://hushbook.app';
const DEFAULT_LOCALE = localeConfig.defaultLocale || 'en';
const LOCALES = localeConfig.publishedLocales || [DEFAULT_LOCALE];
const PAGES = (localeConfig.publicPages || []).map((page) => page.replace(/\.html$/, ''));

const PAGE_META = {
  index: { priority: '1.0', changefreq: 'weekly' },
  download: { priority: '0.9', changefreq: 'weekly' },
  about: { priority: '0.7', changefreq: 'monthly' },
  'privacy-policy': { priority: '0.3', changefreq: 'yearly' },
  'terms-conditions': { priority: '0.3', changefreq: 'yearly' },
  'refund-policy': { priority: '0.3', changefreq: 'yearly' },
  licenses: { priority: '0.3', changefreq: 'yearly' },
};

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

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

function lastmodFor(locale, page) {
  const file = pageFile(locale, page);
  try {
    const stat = fs.statSync(file);
    return stat.mtime.toISOString().slice(0, 10);
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

function hreflangLinks(page) {
  const lines = [];
  for (const locale of LOCALES) {
    const href = pageUrl(locale, page);
    lines.push(
      `    <xhtml:link rel="alternate" hreflang="${escapeXml(locale)}" href="${escapeXml(href)}"/>`
    );
  }
  lines.push(
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(pageUrl(DEFAULT_LOCALE, page))}"/>`
  );
  return lines.join('\n');
}

const urls = [];

for (const page of PAGES) {
  const meta = PAGE_META[page] || { priority: '0.5', changefreq: 'monthly' };
  const alternates = hreflangLinks(page);

  for (const locale of LOCALES) {
    const file = pageFile(locale, page);
    if (!fs.existsSync(file)) {
      console.warn(`skip missing: ${path.relative(root, file)}`);
      continue;
    }

    const loc = pageUrl(locale, page);
    const lastmod = lastmodFor(locale, page);
    // Slight demote non-default locales so English ranks as primary cluster hub
    const priority =
      locale === DEFAULT_LOCALE
        ? meta.priority
        : (Math.max(0.1, parseFloat(meta.priority) - 0.1)).toFixed(1);

    urls.push(
      [
        '  <url>',
        `    <loc>${escapeXml(loc)}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${meta.changefreq}</changefreq>`,
        `    <priority>${priority}</priority>`,
        alternates,
        '  </url>',
      ].join('\n')
    );
  }
}

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset',
  '  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
  '  xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  urls.join('\n'),
  '</urlset>',
  '',
].join('\n');

const out = path.join(root, 'sitemap.xml');
fs.writeFileSync(out, xml);
console.log(`Wrote ${path.relative(root, out)} with ${urls.length} URLs`);
console.log(`Locales: ${LOCALES.length} · Pages: ${PAGES.length}`);
