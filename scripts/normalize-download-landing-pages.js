'use strict';

const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const ignoredDirectories = new Set(['.git', '.worktrees', 'node_modules', 'output']);
const autoRedirectScript = /<script>\s*(?=(?:const APP_STORE_URL|function isSearchCrawler))[\s\S]*?<\/script>/;

function collectDownloadPages(directory, pages = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!ignoredDirectories.has(entry.name)) collectDownloadPages(path.join(directory, entry.name), pages);
    } else if (entry.name === 'download.html') {
      pages.push(path.join(directory, entry.name));
    }
  }
  return pages;
}

let changed = 0;
for (const file of collectDownloadPages(root)) {
  const html = fs.readFileSync(file, 'utf8');
  const normalized = html
    .replace(autoRedirectScript, '')
    .replace(/\s*<p class="status" id="status">[\s\S]*?<\/p>/, '')
    .replace(/\s*<noscript>[\s\S]*?<\/noscript>/, '')
    .replaceAll('HBOPAQX', '')
    .replaceAll('HBOPAQE2X', '')
    .replaceAll('ХБОПАКЕ0X', '')
    .replaceAll('ХБОПАКЕ2X', '')
    .replace('</style>の特長', '</style>')
    .replace(/\r?\nの特長\s*(?=<div class="locale-switcher")/, '\n')
    .replace('</script>の特長</body>', '</script></body>');
  if (normalized === html) continue;
  fs.writeFileSync(file, normalized);
  changed += 1;
}

console.log(`Normalized ${changed} download landing pages.`);
