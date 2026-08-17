'use strict';

/**
 * Regenerates vercel.json redirects from localization.config.js so geo
 * routing, cookie preference, and the language dropdown stay aligned.
 *
 * Usage: node scripts/build-vercel-locales.js
 */
const fs = require('node:fs');
const path = require('node:path');
const localeConfig = require('../localization.config');

const root = path.join(__dirname, '..');
const PUBLIC_PAGES = localeConfig.publicPages
  .map((page) => page.replace(/\.html$/, ''))
  .filter((page) => page !== 'index')
  .join('|');
const PAGE_SOURCE = `/:path(${PUBLIC_PAGES})`;

const defaultLocale = localeConfig.defaultLocale || 'en';
const cookieLocales = (localeConfig.publishedLocales || [])
  .filter((code) => code !== defaultLocale);

// Keep Googlebot / AI crawlers on the canonical English URLs. Geo and cookie
// 307s on /download were reported in Search Console as "Page with redirect".
const CRAWLER_UA =
  '(?i)(Googlebot|Google-InspectionTool|GoogleOther|bingbot|BingPreview|DuckDuckBot|Slurp|YandexBot|Baiduspider|facebookexternalhit|Twitterbot|LinkedInBot|Applebot|GPTBot|ChatGPT-User|ClaudeBot|PerplexityBot|OAI-SearchBot|Bytespider|Amazonbot)';
const missingCrawler = { type: 'header', key: 'user-agent', value: CRAWLER_UA };

/** Collapse countryLocales map into value strings Vercel can match. */
const countryGroups = new Map();
for (const [country, locale] of Object.entries(localeConfig.countryLocales || {})) {
  if (!countryGroups.has(locale)) countryGroups.set(locale, []);
  countryGroups.get(locale).push(country);
}

const redirects = [];

for (const code of cookieLocales) {
  redirects.push({
    source: '/',
    has: [{ type: 'cookie', key: 'hushbook_locale', value: code }],
    missing: [missingCrawler],
    destination: `/${code}`,
    permanent: false,
  });
  redirects.push({
    source: PAGE_SOURCE,
    has: [{ type: 'cookie', key: 'hushbook_locale', value: code }],
    missing: [missingCrawler],
    destination: `/${code}/:path*`,
    permanent: false,
  });
}

for (const [locale, countries] of countryGroups) {
  const value = countries.join('|');
  redirects.push({
    source: '/',
    has: [{ type: 'header', key: 'x-vercel-ip-country', value }],
    missing: [{ type: 'cookie', key: 'hushbook_locale' }, missingCrawler],
    destination: `/${locale}`,
    permanent: false,
  });
  redirects.push({
    source: PAGE_SOURCE,
    has: [{ type: 'header', key: 'x-vercel-ip-country', value }],
    missing: [{ type: 'cookie', key: 'hushbook_locale' }, missingCrawler],
    destination: `/${locale}/:path*`,
    permanent: false,
  });
}

for (const [legacyLocale, publishedLocale] of Object.entries(localeConfig.legacyRedirects || {})) {
  redirects.push({
    source: `/${legacyLocale}`,
    destination: `/${publishedLocale}`,
    permanent: true,
  });
  redirects.push({
    source: `/${legacyLocale}/:path*`,
    destination: `/${publishedLocale}/:path*`,
    permanent: true,
  });
}

redirects.push({
  source: '/(.*)',
  has: [{ type: 'host', value: 'www.hushbook.app' }],
  destination: 'https://hushbook.app/$1',
  permanent: true,
});
redirects.push({ source: '/privacy', destination: '/privacy-policy', permanent: true });
redirects.push({ source: '/terms', destination: '/terms-conditions', permanent: true });

const config = {
  $schema: 'https://openapi.vercel.sh/vercel.json',
  cleanUrls: true,
  trailingSlash: false,
  redirects,
  headers: [
    // Block indexing on all Vercel aliases/previews (*.vercel.app).
    // Only hushbook.app / www (301 → apex) should appear in search results.
    {
      source: '/(.*)',
      has: [{ type: 'host', value: '(?<h>.+)\\.vercel\\.app' }],
      headers: [
        { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
      ],
    },
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
      ],
    },
    {
      source: '/assets/(.*)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
  ],
};

fs.writeFileSync(path.join(root, 'vercel.json'), `${JSON.stringify(config, null, 2)}\n`);
console.log(`Wrote vercel.json with ${redirects.length} redirects`);
console.log(`Cookie locales: ${cookieLocales.length}`);
console.log(`Geo locale groups: ${countryGroups.size}`);
