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

assert.equal(localeConfig.mockupRoot, '/assets/img/mockups/', 'all locales must share root mockup assets');
assert.ok(localeConfig.plannedLocales.includes('de'), 'German must remain in locale registry');

const localeScript = fs.readFileSync('assets/js/locale.js', 'utf8');
assert.match(localeScript, /hushbook_locale/, 'locale selector must persist explicit choice');

const config = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
assert.ok(
  config.redirects.some((rule) =>
    rule.destination === '/de' &&
    rule.has?.some((condition) =>
      condition.key === 'x-vercel-ip-country' &&
      String(condition.value).split('|').includes('DE'),
    ),
  ),
  'Vercel config must route first-time Germany visitors to German pages',
);

console.log('German localization contract passes.');
