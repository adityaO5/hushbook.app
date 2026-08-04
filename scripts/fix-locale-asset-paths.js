'use strict';

const fs = require('node:fs');
const path = require('node:path');
const localeConfig = require('../localization.config');

const locales = [
  ...new Set([
    ...(localeConfig.publishedLocales || []).filter((code) => code !== 'en'),
    'es',
    'pt',
  ]),
];

let files = 0;
let replacements = 0;

for (const locale of locales) {
  const dir = path.join(process.cwd(), locale);
  if (!fs.existsSync(dir)) continue;

  for (const name of fs.readdirSync(dir).filter((entry) => entry.endsWith('.html'))) {
    const file = path.join(dir, name);
    const before = fs.readFileSync(file, 'utf8');
    const matches = before.match(/(?:src|href|content)=["']assets\//g) || [];
    const urlMatches = before.match(/url\(["']?assets\//g) || [];
    const next = before
      .replace(/(src|href|content)=(["'])assets\//g, '$1=$2/assets/')
      .replace(/(url\()(["']?)assets\//g, '$1$2/assets/');

    if (next !== before) {
      fs.writeFileSync(file, next);
      files += 1;
      replacements += matches.length + urlMatches.length;
    }
  }
}

console.log(`Updated ${files} files (${replacements} asset path fixes).`);

for (const locale of ['de', 'fr', 'ja', 'es-ES', 'pt-BR', 'ar']) {
  const file = path.join(process.cwd(), locale, 'index.html');
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, 'utf8');
  const rel = (html.match(/(?:src|href)=["']assets\//g) || []).length;
  const abs = (html.match(/(?:src|href)=["']\/assets\//g) || []).length;
  console.log(`${locale}: relative=${rel} absolute=${abs}`);
}
