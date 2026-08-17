const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const localeConfig = require('./localization.config');

const ROOT = __dirname;
const BASE_URL = 'https://hushbook.app';
const PAGES = localeConfig.publicPages.map((file) => file.replace(/\.html$/, ''));
const PUBLISHED = localeConfig.publishedLocales;
const LEGACY_REDIRECTS = {
  es: 'es-ES',
  pt: 'pt-PT',
  'fr-argos': 'fr',
};

function pagePath(locale, page) {
  if (locale === localeConfig.defaultLocale) {
    return page === 'index' ? '/' : `/${page}`;
  }
  return page === 'index' ? `/${locale}` : `/${locale}/${page}`;
}

function pageUrl(locale, page) {
  return `${BASE_URL}${pagePath(locale, page)}`;
}

function pageFile(locale, page) {
  return locale === localeConfig.defaultLocale
    ? path.join(ROOT, `${page}.html`)
    : path.join(ROOT, locale, `${page}.html`);
}

function readHtml(locale, page) {
  const file = pageFile(locale, page);
  assert.ok(fs.existsSync(file), `${file} must exist`);
  return fs.readFileSync(file, 'utf8');
}

function extractSingle(html, pattern, label) {
  const match = html.match(pattern);
  assert.ok(match, `${label} must exist`);
  return match[1];
}

function extractHreflang(html) {
  return new Map(
    [...html.matchAll(/<link\s+rel="alternate"\s+hreflang="([^"]+)"\s+href="([^"]+)">/g)]
      .map((match) => [match[1], match[2]]),
  );
}

function extractAnchors(html) {
  return [...html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["']/gi)].map((match) => match[1]);
}

function expectedLocalizedHref(locale, href) {
  const match = href.match(/^\/(?:([^?#]*))(.*)$/);
  if (!match) return null;
  const route = match[1] || 'index';
  const suffix = match[2] || '';
  const page = route === '' ? 'index' : route;
  if (!PAGES.includes(page)) return null;
  return `${pagePath(locale, page)}${suffix}`;
}

for (const locale of PUBLISHED) {
  for (const page of PAGES) {
    const html = readHtml(locale, page);
    const canonical = extractSingle(
      html,
      /<link\s+rel="canonical"\s+href="([^"]+)"\s*\/?\s*>/i,
      `${locale}/${page} canonical`,
    );
    assert.equal(canonical, pageUrl(locale, page), `${locale}/${page} must self-canonicalize without redirect slashes`);

    const robots = extractSingle(
      html,
      /<meta\s+name="robots"\s+content="([^"]+)"\s*\/?\s*>/i,
      `${locale}/${page} robots`,
    );
    assert.match(robots, /^index,\s*follow(?:,|$)/i, `${locale}/${page} must use standard indexable robots directives`);

    const ogUrl = extractSingle(
      html,
      /<meta\s+property="og:url"\s+content="([^"]+)"\s*\/?\s*>/i,
      `${locale}/${page} og:url`,
    );
    assert.equal(ogUrl, pageUrl(locale, page), `${locale}/${page} og:url must match canonical`);

    const hreflang = extractHreflang(html);
    assert.equal(hreflang.size, PUBLISHED.length + 1, `${locale}/${page} must have one alternate per published locale plus x-default`);
    for (const alternateLocale of PUBLISHED) {
      assert.equal(
        hreflang.get(alternateLocale),
        pageUrl(alternateLocale, page),
        `${locale}/${page} hreflang ${alternateLocale} must point to the matching localized page`,
      );
    }
    assert.equal(hreflang.get('x-default'), pageUrl('en', page), `${locale}/${page} x-default must point to English`);

    if (locale !== localeConfig.defaultLocale) {
      for (const href of extractAnchors(html)) {
        const localizedHref = expectedLocalizedHref(locale, href);
        if (localizedHref) {
          assert.equal(href, localizedHref, `${locale}/${page} internal link ${href} must stay in the locale`);
        }
        if (href === BASE_URL || href.startsWith(`${BASE_URL}/`)) {
          const absolute = new URL(href);
          const absoluteLocalized = expectedLocalizedHref(
            locale,
            `${absolute.pathname}${absolute.search}${absolute.hash}`,
          );
          if (absoluteLocalized) {
            assert.equal(
              href,
              `${BASE_URL}${absoluteLocalized}`,
              `${locale}/${page} absolute internal link ${href} must stay in the locale`,
            );
          }
        }
      }
    }

    if (page === 'index') {
      for (const script of html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
        let json;
        try {
          json = JSON.parse(script[1]);
        } catch {
          continue;
        }
        if (json['@type'] === 'SoftwareApplication') {
          assert.equal(json.url, pageUrl(locale, page), `${locale}/index JSON-LD URL must match canonical`);
        }
      }
    }
  }
}

const sitemap = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert.equal(sitemapUrls.length, PUBLISHED.length * PAGES.length, 'sitemap must contain only published locale/page combinations');
for (const locale of PUBLISHED) {
  for (const page of PAGES) {
    assert.ok(sitemapUrls.includes(pageUrl(locale, page)), `${locale}/${page} must be in sitemap`);
  }
}
for (const legacyLocale of Object.keys(LEGACY_REDIRECTS)) {
  assert.ok(
    !sitemapUrls.some((url) => {
      const pathname = new URL(url).pathname;
      return pathname === `/${legacyLocale}` || pathname.startsWith(`/${legacyLocale}/`);
    }),
    `${legacyLocale} draft/legacy routes must not be in sitemap`,
  );
}

assert.deepEqual(localeConfig.legacyRedirects, LEGACY_REDIRECTS, 'legacy locale mappings must be explicit and reviewable');

for (const locale of PUBLISHED) {
  const downloadHtml = readHtml(locale, 'download');
  assert.match(
    downloadHtml,
    /function isSearchCrawler/,
    `${locale}/download must detect crawlers before auto-opening a store`,
  );
  assert.match(
    downloadHtml,
    /if\(target && !isSearchCrawler\(navigator\.userAgent\)\)/,
    `${locale}/download must not JS-redirect Googlebot to the app stores`,
  );
  assert.match(
    downloadHtml,
    /application\/ld\+json/,
    `${locale}/download must expose SoftwareApplication JSON-LD for AEO`,
  );
}

const vercel = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8'));
assert.ok(
  vercel.redirects
    .filter((rule) =>
      rule.has?.some((condition) => condition.key === 'x-vercel-ip-country' || condition.key === 'hushbook_locale'),
    )
    .every((rule) =>
      rule.missing?.some((condition) => condition.key === 'user-agent' && /Googlebot/i.test(String(condition.value))),
    ),
  'geo/cookie locale redirects must skip search crawlers',
);
for (const [from, to] of Object.entries(LEGACY_REDIRECTS)) {
  for (const [source, destination] of [[`/${from}`, `/${to}`], [`/${from}/:path*`, `/${to}/:path*`]]) {
    assert.ok(
      vercel.redirects.some((rule) => rule.source === source && rule.destination === destination && rule.permanent === true),
      `Vercel must permanently redirect ${source} to ${destination}`,
    );
  }
}

console.log('Localized SEO indexation contract passes.');
