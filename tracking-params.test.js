const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { TRACKING_PARAMS, stripTrackingParams } = require('./scripts/strip-tracking-params');

const ROOT = __dirname;
const middlewareSrc = fs.readFileSync(path.join(ROOT, 'middleware.js'), 'utf8');
const listed = [...middlewareSrc.matchAll(/'([a-z0-9_]+)'/gi)].map((match) => match[1]);
const middlewareParams = [...new Set(listed.filter((name) => TRACKING_PARAMS.includes(name)))];

assert.deepEqual(
  [...middlewareParams].sort(),
  [...TRACKING_PARAMS].sort(),
  'middleware.js TRACKING_PARAMS must stay in sync with scripts/strip-tracking-params.js',
);
assert.match(middlewareSrc, /status:\s*301/, 'tracking-param middleware must 301 to the clean URL');
assert.match(middlewareSrc, /export default function middleware/, 'Vercel must see an Edge middleware default export');

assert.deepEqual(
  stripTrackingParams('https://hushbook.app/?ref=launches.uicomet.com'),
  { changed: true, location: '/' },
);
assert.deepEqual(
  stripTrackingParams('https://hushbook.app/?utm_source=toolify'),
  { changed: true, location: '/' },
);
assert.deepEqual(
  stripTrackingParams('https://hushbook.app/?utm_source=toolify&utm_medium=directory&keep=1'),
  { changed: true, location: '/?keep=1' },
);
assert.deepEqual(
  stripTrackingParams('https://hushbook.app/pt-BR/about?utm_source=x'),
  { changed: true, location: '/pt-BR/about' },
);
assert.deepEqual(
  stripTrackingParams('https://hushbook.app/pt-PT/terms-conditions'),
  { changed: false, location: '/pt-PT/terms-conditions' },
);
assert.deepEqual(
  stripTrackingParams('https://hushbook.app/?UTM_SOURCE=Toolify&Ref=Launch'),
  { changed: true, location: '/' },
);

const sitemap = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
assert.equal(sitemap.includes('?ref='), false, 'sitemap must not list tracking-parameter URLs');
assert.equal(sitemap.includes('utm_source'), false, 'sitemap must not list utm URLs');

console.log('Tracking-parameter canonicalization contract passes.');
