const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const localeConfig = require('./localization.config');

const germanPages = [
  'index.html',
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

const localeRules = JSON.parse(fs.readFileSync('src/locale-rules.json', 'utf8'));
assert.equal(
  localeRules.countryLocales.DE,
  'de',
  'Cloudflare locale rules must route first-time Germany visitors to German pages',
);

console.log('German localization contract passes.');
