// Prints each bar's spare room (bar width minus its labels and padding) and the gap from its value label
// to its rating, for the editions figure. Headless Chrome, sandbox on; bundled Chromium as fallback.
// Usage: node slack.mjs <figure.html>
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
await page.goto(pathToFileURL(path.resolve(process.argv[2])).href, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
for (const r of await page.evaluate(() => window.__slack())) console.log(JSON.stringify(r));
await browser.close();
