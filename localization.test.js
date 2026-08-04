const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const localeConfig = require('./localization.config');

const germanPages = [
  'index.html',
  'download.html',
  'about.html',
  'privacy-policy.html',
  'terms-conditions.html',
  'refund-policy.html',
  'licenses.html',
];

const publishedLocales = localeConfig.publishedLocales || ['en', 'de'];
const publicPages = localeConfig.publicPages || germanPages;

function pageUrl(locale, pageBase) {
  const isIndex = pageBase === 'index';
  if (locale === 'en') return isIndex ? 'https://hushbook.app/' : `https://hushbook.app/${pageBase}`;
  return isIndex ? `https://hushbook.app/${locale}` : `https://hushbook.app/${locale}/${pageBase}`;
}

for (const page of germanPages) {
  const file = path.join('de', page);
  assert.ok(fs.existsSync(file), `${file} must exist`);
  const html = fs.readFileSync(file, 'utf8');
  assert.match(html, /<html lang="de">/, `${file} must declare German`);
  assert.match(html, /data-locale-switcher/, `${file} must expose a locale switcher`);
  assert.match(html, /hreflang="de"/, `${file} must declare German alternate metadata`);
  assert.doesNotMatch(html, /(?:src|href)="assets\//, `${file} must not resolve assets relative to /de/`);
  assert.doesNotMatch(html, /\/assets\/img\/mockups\/de\//, `${file} must use shared screenshots`);
}

// Every public MPA page must advertise the full published hreflang set.
for (const page of publicPages) {
  const pageBase = page.replace(/\.html$/, '');
  for (const locale of publishedLocales) {
    const file = locale === 'en' ? page : path.join(locale, page);
    assert.ok(fs.existsSync(file), `${file} must exist`);
    const html = fs.readFileSync(file, 'utf8');
    for (const code of publishedLocales) {
      const href = pageUrl(code, pageBase);
      assert.match(
        html,
        new RegExp(
          `<link rel="alternate" hreflang="${code.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}" href="${href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}">`
        ),
        `${file} must declare hreflang ${code} → ${href}`
      );
    }
    assert.match(
      html,
      new RegExp(
        `<link rel="alternate" hreflang="x-default" href="${pageUrl('en', pageBase).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}">`
      ),
      `${file} must declare x-default hreflang`
    );
  }
}

assert.equal(localeConfig.mockupRoot, '/assets/img/mockups/', 'all locales must share root mockup assets');
assert.ok(localeConfig.plannedLocales.includes('de'), 'German must remain in locale registry');

const localeScript = fs.readFileSync('assets/js/locale.js', 'utf8');
assert.match(localeScript, /hushbook_locale/, 'locale selector must persist explicit choice');
assert.match(localeScript, /locale-switcher__menu/, 'locale selector must render a dropdown menu');

for (const code of publishedLocales) {
  assert.match(
    localeScript,
    new RegExp(`code:\\s*'${code.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'`),
    `locale selector must list published locale ${code}`,
  );
}

const config = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
const countryRedirects = config.redirects.filter((rule) =>
  rule.has?.some((condition) => condition.key === 'x-vercel-ip-country'),
);
assert.ok(
  countryRedirects.some((rule) => rule.has?.some((condition) => condition.key === 'x-vercel-ip-country' && condition.value === 'DE')),
  'Vercel config must route first-time Germany visitors to German pages',
);

const geoLocales = new Set(
  countryRedirects
    .map((rule) => (rule.destination || '').replace(/^\/([^/]+).*/, '$1'))
    .filter((code) => code && code !== ':path*'),
);
for (const code of Object.values(localeConfig.countryLocales || { DE: 'de' })) {
  assert.ok(geoLocales.has(code), `Vercel geo routing must include locale ${code}`);
}

const cookieLocales = new Set(
  config.redirects
    .filter((rule) => rule.has?.some((c) => c.key === 'hushbook_locale'))
    .map((rule) => rule.has.find((c) => c.key === 'hushbook_locale').value),
);
for (const code of publishedLocales.filter((entry) => entry !== 'en')) {
  assert.ok(cookieLocales.has(code), `Vercel cookie routing must include locale ${code}`);
}

console.log('Localization contract passes.');
