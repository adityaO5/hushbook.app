'use strict';

/**
 * Insert Google tag (gtag.js) immediately after <head> on every HTML page.
 * Skips worktrees, node_modules, and pages that already include the measurement ID.
 *
 * Usage: node scripts/inject-gtag.js
 */
const fs = require('node:fs');
const path = require('node:path');

const MEASUREMENT_ID = 'G-KM7TGB9SZC';
const TAG = `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${MEASUREMENT_ID}');
</script>
`;

const SKIP_DIRS = new Set([
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

const root = path.join(__dirname, '..');

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(ent.name)) continue;
    // skip hidden dirs except we already listed known ones
    if (ent.isDirectory() && ent.name.startsWith('.')) continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, out);
    else if (ent.isFile() && ent.name.endsWith('.html')) out.push(full);
  }
  return out;
}

const files = walk(root);
let updated = 0;
let skipped = 0;
let failed = 0;

for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes(MEASUREMENT_ID) || html.includes('googletagmanager.com/gtag/js')) {
    skipped += 1;
    continue;
  }

  const re = /<head([^>]*)>/i;
  if (!re.test(html)) {
    console.warn('no <head>:', path.relative(root, file));
    failed += 1;
    continue;
  }

  html = html.replace(re, (match) => `${match}\n${TAG}`);
  fs.writeFileSync(file, html);
  updated += 1;
}

console.log(`Updated ${updated} pages · already present ${skipped} · failed ${failed}`);
console.log(`Total HTML scanned: ${files.length}`);
