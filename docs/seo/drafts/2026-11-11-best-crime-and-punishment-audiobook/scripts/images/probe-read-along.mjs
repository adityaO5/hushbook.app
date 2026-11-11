// Seeks the temp read-along scene to several t values and prints the current word, its height on the
// phone (fraction of the frame), the page, the head fit and the chapter title height.
// Usage: node probe-read-along.mjs <scene index.html> <theme> t1 t2 ...
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
const require = createRequire('D:/hushbook.app/package.json');
const { chromium } = require('playwright');
const [scene, theme, ...ts] = process.argv.slice(2);
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
await page.waitForFunction(() => window.__hbReady === true && !!(window.__timelines && window.__timelines.main), null, { timeout: 60000 });
await page.evaluate(() => document.fonts.ready);
const info = await page.evaluate(() => ({ headFit: window.__headFit, titleH: window.__titleH, head: document.getElementById('hTitleText').innerText,
  pages: window.__dbg().layouts[Object.keys(window.__dbg().layouts)[0]].pages }));
console.log(JSON.stringify(info));
for (const t of ts.map(Number)) {
  const r = await page.evaluate((t) => {
    const tl = window.__timelines.main; tl.pause(); tl.seek(t, false);
    if (typeof window.render === 'function') window.render(t);
    const f = document.getElementById('frame').getBoundingClientRect();
    const now = document.querySelector('.w.now');
    if (!now) return { t, word: null };
    const b = now.getBoundingClientRect();
    const line = now.closest('.ln');
    return { t, word: now.textContent.slice(0, 40), yFrac: +((b.top + b.height / 2 - f.top) / f.height).toFixed(3),
      page: document.getElementById('pnum').textContent, line: line ? line.innerText.slice(0, 90) : null };
  }, t);
  console.log(JSON.stringify(r));
}
await browser.close();
