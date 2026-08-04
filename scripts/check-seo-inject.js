'use strict';
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');

const h = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
console.log('seo-copy css count', (h.match(/\.seo-copy\{/g) || []).length);
console.log('seo section count', (h.match(/about-hushbook/g) || []).length);
const m = h.match(/id="about-hushbook"[\s\S]*?<\/article>/);
if (m) {
  const t = m[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  console.log('EN prose words', t.split(/\s+/).length);
}

const locales = fs
  .readdirSync(root, { withFileTypes: true })
  .filter((d) => d.isDirectory() && fs.existsSync(path.join(root, d.name, 'index.html')))
  .map((d) => d.name)
  .filter((n) => !['node_modules', 'assets', 'scripts', 'docs', 'videos', 'research', 'output', 'tests', 'supabase'].includes(n) && !n.startsWith('.'));

let ok = 0;
for (const l of locales) {
  const x = fs.readFileSync(path.join(root, l, 'index.html'), 'utf8');
  const good = x.includes('about-hushbook') && x.includes('.seo-copy{') && x.includes('og:locale');
  if (good) ok += 1;
  else console.log('missing', l);
}
console.log('locales ok', ok, 'of', locales.length);
