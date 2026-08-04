'use strict';
const fs = require('node:fs');

const fr = fs.readFileSync('fr/index.html', 'utf8');
const ctx = new Set();
for (const m of fr.matchAll(/\uFFFD/g)) {
  ctx.add(JSON.stringify(fr.slice(Math.max(0, m.index - 14), m.index + 14)));
}
console.log('remaining unique', ctx.size);
console.log([...ctx].slice(0, 50).join('\n'));

for (const p of ['about.html', 'download.html', 'privacy-policy.html', 'terms-conditions.html', 'refund-policy.html', 'licenses.html']) {
  const h = fs.readFileSync(`fr/${p}`, 'utf8');
  console.log(p, (h.match(/\uFFFD/g) || []).length);
}

for (const l of ['tr', 'vi', 'uk', 'th']) {
  const h = fs.readFileSync(`${l}/index.html`, 'utf8');
  const big = h.match(/class="big"[^>]*>([\s\S]*?)<\/h2>/);
  console.log(l, 'big=', big?.[1]?.replace(/\s+/g, ' ').trim());
  // footer company about link text
  const about = h.match(/href="\/about"[^>]*>([^<]{0,80})/);
  console.log(l, 'about link=', about?.[1]);
}
