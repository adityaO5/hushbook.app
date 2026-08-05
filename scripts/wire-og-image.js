'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OLD = 'https://hushbook.app/assets/img/default_preview.png';
const NEW = 'https://hushbook.app/assets/img/og-hushbook.webp';

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (
      entry.name === 'node_modules' ||
      entry.name === 'videos' ||
      entry.name === '.git' ||
      entry.name.startsWith('.')
    ) {
      continue;
    }
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

const files = walk(ROOT);
let changed = 0;

for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');
  if (!html.includes(OLD) && !html.includes('og:image')) continue;

  const original = html;
  html = html.split(OLD).join(NEW);
  html = html.replace(
    /<meta property="og:image:type" content="image\/png">/g,
    '<meta property="og:image:type" content="image/webp">'
  );

  if (
    html.includes(NEW) &&
    html.includes('property="og:image"') &&
    !html.includes('og:image:width')
  ) {
    html = html.replace(
      /(<meta property="og:image" content="https:\/\/hushbook\.app\/assets\/img\/og-hushbook\.webp">)/,
      '$1\n<meta property="og:image:width" content="1800">\n<meta property="og:image:height" content="945">'
    );
  }

  if (html !== original) {
    fs.writeFileSync(file, html, 'utf8');
    changed += 1;
    console.log('updated', path.relative(ROOT, file));
  }
}

// Keep inject script in sync for future re-runs
const injectPath = path.join(ROOT, 'scripts', 'inject-seo-copy.js');
if (fs.existsSync(injectPath)) {
  let inject = fs.readFileSync(injectPath, 'utf8');
  const next = inject
    .split(OLD)
    .join(NEW)
    .replace(
      "content=\"image/png\"",
      "content=\"image/webp\""
    )
    .replace(
      "meta property=\"og:image:type\" content=\"image/png\"",
      "meta property=\"og:image:type\" content=\"image/webp\""
    );
  // Ensure width/height in metaBlock template if present
  if (next.includes('og:image:type') && !next.includes('og:image:width')) {
    const patched = next.replace(
      /(<meta property="og:image:type" content="image\/webp">)/,
      '<meta property="og:image:width" content="1800">\n<meta property="og:image:height" content="945">\n$1'
    );
    fs.writeFileSync(injectPath, patched, 'utf8');
    console.log('updated scripts/inject-seo-copy.js');
  } else if (next !== inject) {
    fs.writeFileSync(injectPath, next, 'utf8');
    console.log('updated scripts/inject-seo-copy.js');
  }
}

console.log('files changed', changed);
