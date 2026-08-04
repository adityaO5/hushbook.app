'use strict';

const fs = require('node:fs');

const locales = ['uk', 'vi', 'th', 'fr', 'tr', 'de', 'en', 'ru', 'ja', 'ar'];
for (const l of locales) {
  const p = l === 'en' ? 'index.html' : `${l}/index.html`;
  if (!fs.existsSync(p)) continue;
  const h = fs.readFileSync(p, 'utf8');
  const title = (h.match(/<title>([^<]+)/) || [])[1];
  const h1 = (h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1]
    ?.replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  const vp = (h.match(/name="viewport" content="([^"]+)/) || [])[1];
  const fffd = (h.match(/\uFFFD/g) || []).length;
  const style = h.includes('<style');
  const scripts = (h.match(/<script/g) || []).length;
  const spam = /\b(\w+)(?: \1){4,}/.test(h);
  console.log(`--- ${l} style=${style} scripts=${scripts} fffd=${fffd} spam=${spam}`);
  console.log(`title: ${title}`);
  console.log(`h1: ${h1?.slice(0, 120)}`);
  console.log(`viewport: ${vp?.slice(0, 90)}`);
}

const fr = fs.readFileSync('fr/index.html', 'utf8');
const i = fr.indexOf('\uFFFD');
console.log('fr FFFD context:', JSON.stringify(fr.slice(Math.max(0, i - 30), i + 30)));

// how many unique FFFD neighborhoods in fr
const contexts = new Set();
for (const m of fr.matchAll(/\uFFFD/g)) {
  contexts.add(fr.slice(Math.max(0, m.index - 8), m.index + 9));
}
console.log('fr unique FFFD neighborhoods:', contexts.size);
console.log([...contexts].slice(0, 20));
