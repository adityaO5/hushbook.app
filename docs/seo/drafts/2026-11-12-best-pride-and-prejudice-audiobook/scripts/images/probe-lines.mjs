// Lists the temp read-along scene's line groups: page, start time (s) and text, for choosing a shot's t.
// Usage: node probe-lines.mjs <scene index.html> <theme> [fromPage] [toPage]
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
const require = createRequire('D:/hushbook.app/package.json');
const { chromium } = require('playwright');
const [scene, theme, from = '0', to = '999'] = process.argv.slice(2);
const strings = JSON.parse(fs.readFileSync(path.join(path.dirname(scene), 'strings', 'en.json'), 'utf8'));
async function launch() {
  try { return await chromium.launch({ headless: true, channel: 'chrome', chromiumSandbox: true }); }
  catch { return chromium.launch({ headless: true, chromiumSandbox: true }); }
}
const browser = await launch();
const page = await browser.newPage({ viewport: { width: 3840, height: 2160 } });
await page.addInitScript(({ strings, vars }) => {
  window.__HB_STRINGS = strings; window.__HB_LOCALE = 'en'; window.__HB_VARS = vars; window.__timelines = window.__timelines || {};
}, { strings, vars: { theme } });
page.on('pageerror', (e) => console.error('page error: ' + e.message));
await page.goto(pathToFileURL(scene).href, { waitUntil: 'load' });
await page.waitForFunction(() => window.__hbReady === true && !!(window.__timelines && window.__timelines.main), null, { timeout: 120000 });
const rows = await page.evaluate(() => {
  const d = window.__dbg(), L = d.layouts[Object.keys(d.layouts)[0]];
  const els = [...document.querySelectorAll('.ln')];
  return { pages: L.pages, dur: window.__timelines.main.duration(), head: document.getElementById('hTitleText').innerText,
    lines: L.flat.map((f, n) => ({ n, page: f.page, start: f.start, narrow: f.narrow, text: els[n] ? els[n].textContent.replace(/\s+/g, ' ').trim() : '' })) };
});
console.log(`pages ${rows.pages}, timeline ${rows.dur.toFixed(1)} s, head "${rows.head}"`);
for (const l of rows.lines) if (l.page >= +from && l.page <= +to) console.log(`p${l.page + 1} n${l.n} t=${l.start.toFixed(2)}${l.narrow ? ' (narrow)' : ''}  ${l.text}`);
await browser.close();
