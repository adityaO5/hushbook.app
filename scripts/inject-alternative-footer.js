'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { pages } = require('../data/alternative-pages');
const localeConfig = require('../localization.config');

const root = path.join(__dirname, '..');
const links = [
  ['/alternatives', 'All alternatives'],
  ...pages.map((page) => [`/alternatives/${page.slug}`, `${page.competitor} alternatives`]),
];

function landingCol(nl) {
  return [
    `      <div class="fcol">`,
    `        <b>Compare</b>`,
    ...links.map(([href, label]) => `        <a href="${href}">${label}</a>`),
    `      </div>`,
    '',
  ].join(nl);
}

function legalCol(nl) {
  return [
    `      <div class="foot-col">`,
    `        <h4>Compare</h4>`,
    ...links.map(([href, label]) => `        <a href="${href}">${label}</a>`),
    `      </div>`,
    '',
  ].join(nl);
}

function targets() {
  const files = [
    'index.html',
    'about.html',
    'privacy-policy.html',
    'terms-conditions.html',
    'refund-policy.html',
    'licenses.html',
  ];
  for (const locale of localeConfig.publishedLocales) {
    if (locale === 'en') continue;
    for (const page of ['index.html', 'about.html', 'refund-policy.html', 'licenses.html']) {
      files.push(path.join(locale, page));
    }
  }
  for (const locale of ['es', 'pt']) {
    for (const page of ['index.html', 'about.html', 'refund-policy.html', 'licenses.html']) {
      files.push(path.join(locale, page));
    }
  }
  return files.map((rel) => path.join(root, rel)).filter((file) => fs.existsSync(file));
}

let changed = 0;
for (const file of targets()) {
  const rel = path.relative(root, file).replace(/\\/g, '/');
  const html = fs.readFileSync(file, 'utf8');
  const nl = html.includes('\r\n') ? '\r\n' : '\n';
  const footerStart = html.lastIndexOf('<footer');
  if (footerStart === -1) {
    console.warn(`skip (no footer): ${rel}`);
    continue;
  }
  const footer = html.slice(footerStart);
  if (/<b>Compare<\/b>|<h4>Compare<\/h4>/.test(footer)) {
    console.log(`already has compare column: ${rel}`);
    continue;
  }

  const marker = html.includes('class="fcol"')
    ? `${nl}      <div class="fcol">`
    : `${nl}      <div class="foot-col">`;
  const insertAt = html.lastIndexOf(marker);
  if (insertAt === -1 || insertAt < footerStart) {
    console.warn(`skip (no footer match): ${rel}`);
    continue;
  }
  const col = html.includes('class="fcol"') ? landingCol(nl) : legalCol(nl);
  const next = html.slice(0, insertAt) + nl + col + html.slice(insertAt + nl.length);
  fs.writeFileSync(file, next);
  changed += 1;
  console.log(`updated ${rel}`);
}
console.log(`Footer compare column added to ${changed} pages`);
