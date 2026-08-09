'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { plannedLocales, publicPages } = require('../localization.config');

const rows = plannedLocales.map((locale) => {
  const dir = path.join(process.cwd(), locale);
  const pages = publicPages.filter((page) => fs.existsSync(path.join(dir, page)));
  const review = fs.existsSync(path.join(dir, 'review.md')) || fs.existsSync(path.join(process.cwd(), 'docs', `LOCALE_REVIEW_${locale}.md`));
  return { locale, pages: pages.length, expected: publicPages.length, review, complete: pages.length === publicPages.length && review };
});

console.table(rows);
const incomplete = rows.filter((row) => !row.complete);
if (incomplete.length) {
  console.error(`${incomplete.length} locale(s) incomplete; keep routing/indexing disabled.`);
  process.exitCode = 1;
} else {
  console.log('All planned locales have page and review evidence.');
}
