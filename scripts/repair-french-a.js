'use strict';
const fs = require('node:fs');
const pages = require('../localization.config').publicPages;
let total = 0;
for (const page of pages) {
  const file = `fr/${page}`;
  if (!fs.existsSync(file)) continue;
  let h = fs.readFileSync(file, 'utf8');
  h = h.replace(/'\uFFFD/g, "'à");
  h = h.replace(/\uFFFD/g, 'à');
  fs.writeFileSync(file, h);
  const a = (h.match(/\uFFFD/g) || []).length;
  total += a;
  console.log(page, a);
}
console.log('total', total);
