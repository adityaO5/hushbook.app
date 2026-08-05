'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

function walk(dir, files = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', 'videos', '.git'].includes(e.name) || e.name.startsWith('.')) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, files);
    else if (e.name.endsWith('.html') || (e.name.endsWith('.js') && dir.includes('scripts'))) files.push(p);
  }
  return files;
}

let n = 0;
for (const f of walk(ROOT)) {
  let h = fs.readFileSync(f, 'utf8');
  if (!h.includes('og:image:width')) continue;
  const o = h;
  h = h
    .replace(/<meta property="og:image:width" content="1800">/g, '<meta property="og:image:width" content="1800">')
    .replace(/<meta property="og:image:height" content="945">/g, '<meta property="og:image:height" content="945">');
  if (h !== o) {
    fs.writeFileSync(f, h);
    n++;
    console.log('updated', path.relative(ROOT, f));
  }
}
console.log('files', n);
