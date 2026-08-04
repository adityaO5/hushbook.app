'use strict';
const fs = require('node:fs');

const en = fs.readFileSync('index.html', 'utf8');
const de = fs.readFileSync('de/index.html', 'utf8');
const tr = fs.readFileSync('tr/index.html', 'utf8');

const madeEn = en.match(/class="big"[^>]*>([\s\S]*?)<\/h2>/);
const madeDe = de.match(/class="big"[^>]*>([\s\S]*?)<\/h2>/);
const madeTr = tr.match(/class="big"[^>]*>([\s\S]*?)<\/h2>/);
console.log('EN big:', madeEn?.[1]?.slice(0, 80));
console.log('DE big:', madeDe?.[1]?.slice(0, 80));
console.log('TR big:', madeTr?.[1]?.slice(0, 120));

// en style length
const style = en.match(/<style>[\s\S]*?<\/style>/);
console.log('en style chars', style?.[0].length);

// scripts after locale switcher pattern
const enScripts = en.match(/<script[\s\S]*$/);
console.log('en tail starts', enScripts?.[0]?.slice(0, 200));

// count spam patterns in tr
for (const re of [
  /(?:About ){3,}About/g,
  /(?:Made for ){3,}Made for/g,
  /(?:Analizler ){2,}Analizler/g,
  /(?:SSS )+SSS/g,
  /(?:web sitesi ){3,}/g,
  /(?:ÜRÜN )+ÜRÜN/g,
  /(?:ŞİRKET )+ŞİRKETİ?/g,
]) {
  const m = tr.match(re);
  console.log(re, 'hits', m?.length, 'first len', m?.[0]?.length);
}
