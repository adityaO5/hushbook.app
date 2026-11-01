const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {
  TRACKING_PARAMS,
  normalizeTrackingParams,
} = require('./scripts/normalize-tracking-params');

const ROOT = __dirname;
const trackingSrc = fs.readFileSync(path.join(ROOT, 'src/tracking.mjs'), 'utf8');
const workerSrc = fs.readFileSync(path.join(ROOT, 'src/worker.mjs'), 'utf8');
const listed = [...trackingSrc.matchAll(/'([a-z0-9_]+)'/gi)].map((match) => match[1]);
const workerParams = listed.filter((name) => TRACKING_PARAMS.includes(name));

assert.deepEqual(
  workerParams,
  [...TRACKING_PARAMS],
  'src/tracking.mjs TRACKING_PARAMS must stay in sync with scripts/normalize-tracking-params.js',
);
assert.match(trackingSrc, /status:\s*308/, 'malformed tracking links must redirect to valid query URLs');
assert.match(workerSrc, /normalizeTrackingRequest\(request\)/, 'the Worker must normalize tracking links');
assert.match(workerSrc, /export default \{\s*async fetch\(/, 'Cloudflare must see a Worker default export with fetch');
for (const [name, src] of [['src/tracking.mjs', trackingSrc], ['src/worker.mjs', workerSrc]]) {
  assert.doesNotMatch(
    src,
    /searchParams\.delete/,
    `${name} must preserve valid tracking query parameters for analytics attribution`,
  );
}

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
  'demos', // iframe embeds: the host page already counts the view
  'embeds', // blog body partials, not pages
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
