// Prints the values each figure computes (window.__check), for the notes; minLabelGap is for figures with
// a chapter-label row (.xl span), none here. Copied unchanged in function from the Jane Eyre set.
// Headless Chrome, sandbox on; bundled Chromium as fallback.
// Usage: node check-values.mjs <figure.html> [...]
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
const require = createRequire('D:/hushbook.app/package.json');
const { chromium } = require('playwright');

async function launch() {
  try { return await chromium.launch({ headless: true, channel: 'chrome', chromiumSandbox: true }); }
  catch { return chromium.launch({ headless: true, chromiumSandbox: true }); }
}
const browser = await launch();
const page = await browser.newPage({ viewport: { width: 700, height: 900 } });
for (const f of process.argv.slice(2)) {
  await page.goto(pathToFileURL(path.resolve(f)).href, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const out = await page.evaluate(() => {
    const labels = [...document.querySelectorAll('.xl span')].map((e) => {
      const r = document.createRange(); r.selectNodeContents(e); return r.getBoundingClientRect();
    });
    let gap = null;
    for (let i = 1; i < labels.length; i++) gap = Math.min(gap ?? 1e9, labels[i].left - labels[i - 1].right);
    return { check: window.__check, minLabelGap: gap === null ? null : +gap.toFixed(1) };
  });
  console.log(path.basename(f), JSON.stringify(out));
}
await browser.close();
