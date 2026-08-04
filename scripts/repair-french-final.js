'use strict';
const fs = require('node:fs');
const pages = require('../localization.config').publicPages;

let total = 0;
for (const page of pages) {
  const file = `fr/${page}`;
  if (!fs.existsSync(file)) continue;
  let h = fs.readFileSync(file, 'utf8');
  const before = (h.match(/\uFFFD/g) || []).length;
  h = h
    .replace(/\uFFFD\s*propos/gi, 'À propos')
    .replace(/\uFFFD\s*(20\d\d)/g, '© $1')
    .replace(/>\uFFFD\s*/g, '>© ');

  // dump leftovers
  const leftovers = new Set();
  for (const m of h.matchAll(/\uFFFD/g)) {
    leftovers.add(JSON.stringify(h.slice(Math.max(0, m.index - 25), m.index + 25)));
  }
  if (leftovers.size) {
    console.log(page, 'leftovers:', [...leftovers]);
    // common legal French: à, ç, etc.
    h = h.replace(/(\p{L})\uFFFD/gu, '$1é');
    h = h.replace(/\uFFFD(\p{L})/gu, 'é$1');
  }

  fs.writeFileSync(file, h);
  const after = (h.match(/\uFFFD/g) || []).length;
  total += after;
  console.log(`${page}: ${before} → ${after}`);
}
console.log('remaining total', total);
