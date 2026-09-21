const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {
  TRACKING_PARAMS,
  normalizeTrackingParams,
} = require('./scripts/normalize-tracking-params');

const ROOT = __dirname;
const middlewareSrc = fs.readFileSync(path.join(ROOT, 'middleware.js'), 'utf8');
const listed = [...middlewareSrc.matchAll(/'([a-z0-9_]+)'/gi)].map((match) => match[1]);
const middlewareParams = [...new Set(listed.filter((name) => TRACKING_PARAMS.includes(name)))];

assert.deepEqual(
  [...middlewareParams].sort(),
  [...TRACKING_PARAMS].sort(),
  'middleware.js TRACKING_PARAMS must stay in sync with scripts/normalize-tracking-params.js',
);
assert.match(middlewareSrc, /status:\s*308/, 'malformed tracking links must redirect to valid query URLs');
assert.match(middlewareSrc, /export default function middleware/, 'Vercel must see an Edge middleware default export');
assert.doesNotMatch(
  middlewareSrc,
  /searchParams\.delete/,
  'middleware must preserve valid tracking query parameters for analytics attribution',
);

assert.deepEqual(
  normalizeTrackingParams('https://hushbook.app/?ref=chatgpt.com'),
  { changed: false, location: '/?ref=chatgpt.com' },
);
assert.deepEqual(
  normalizeTrackingParams('https://hushbook.app/?utm_source=chatgpt&utm_medium=referral'),
  { changed: false, location: '/?utm_source=chatgpt&utm_medium=referral' },
);
assert.deepEqual(
  normalizeTrackingParams('https://hushbook.app/utm_source=chatgpt'),
  { changed: true, location: '/?utm_source=chatgpt' },
);
assert.deepEqual(
  normalizeTrackingParams('https://hushbook.app/de/utm_source=chatgpt&utm_medium=referral'),
  { changed: true, location: '/de?utm_source=chatgpt&utm_medium=referral' },
);
assert.deepEqual(
  normalizeTrackingParams('https://hushbook.app/about=team'),
  { changed: false, location: '/about=team' },
);
assert.deepEqual(
  normalizeTrackingParams('https://hushbook.app/UTM_SOURCE=ChatGPT&Ref=Launch'),
  { changed: true, location: '/?UTM_SOURCE=ChatGPT&Ref=Launch' },
);

const sitemap = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
assert.equal(sitemap.includes('?ref='), false, 'sitemap must not list tracking-parameter URLs');
assert.equal(sitemap.includes('utm_source'), false, 'sitemap must not list utm URLs');

const htmlSkipDirs = new Set([
  'node_modules',
  'videos',
  'research',
  'output',
  '.worktrees',
  '.superpowers',
  '.legacy-index',
  '.playwright-cli',
  '.git',
  '.agents',
]);

function findHtmlFiles(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (htmlSkipDirs.has(entry.name)) continue;
    if (entry.isDirectory() && entry.name.startsWith('.')) continue;

    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) findHtmlFiles(file, files);
    else if (entry.isFile() && entry.name.endsWith('.html')) files.push(file);
  }
  return files;
}

for (const file of findHtmlFiles(ROOT)) {
  const html = fs.readFileSync(file, 'utf8');
  const relativeFile = path.relative(ROOT, file);
  assert.equal(
    (html.match(/googletagmanager\.com\/gtag\/js\?id=G-KM7TGB9SZC/g) || []).length,
    1,
    `${relativeFile} must load the GA4 tag exactly once`,
  );
  assert.equal(
    (html.match(/gtag\('config', 'G-KM7TGB9SZC'\)/g) || []).length,
    1,
    `${relativeFile} must configure GA4 exactly once`,
  );
}

console.log('Tracking-parameter attribution contract passes.');
