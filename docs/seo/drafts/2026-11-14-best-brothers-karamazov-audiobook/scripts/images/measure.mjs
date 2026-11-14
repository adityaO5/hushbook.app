// Measures text widths in the mockup fonts (used to plan the picks card and the editions labels).
// Usage: node measure.mjs <any local .html page, e.g. picks-card.html> '<json [[text, cssFont], ...]>'
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
const require = createRequire('D:/hushbook.app/package.json');
const { chromium } = require('playwright');
const browser = await chromium.launch({ headless: true, channel: 'chrome', chromiumSandbox: true });
const page = await browser.newPage();
await page.goto(pathToFileURL(process.argv[2]).href);
const strs = JSON.parse(process.argv[3]);
const out = await page.evaluate(async (strs) => {
  const st = document.createElement('style');
  st.textContent = `
@font-face { font-family: 'HBInter'; src: url('file:///D:/hushbook.app/tools/mockups/assets/fonts/Inter-Regular.ttf'); font-weight: 400; }
@font-face { font-family: 'HBInter'; src: url('file:///D:/hushbook.app/tools/mockups/assets/fonts/Inter-Medium.ttf'); font-weight: 500; }
@font-face { font-family: 'HBInter'; src: url('file:///D:/hushbook.app/tools/mockups/assets/fonts/Inter-SemiBold.ttf'); font-weight: 600; }
@font-face { font-family: 'HBNews'; src: url('file:///D:/hushbook.app/tools/mockups/assets/fonts/Newsreader-Variable.ttf'); font-weight: 200 800; }
span{white-space:nowrap;display:inline-block}`;
  document.head.appendChild(st);
  for (const [txt, font] of strs) { const s = document.createElement('span'); s.style.font = font; s.textContent = txt; document.body.appendChild(s); document.body.appendChild(document.createElement('br')); }
  for (const f of ['400 15px HBInter', '500 15px HBInter', '600 15px HBInter', '500 22px HBNews']) await document.fonts.load(f);
  await document.fonts.ready;
  return [...document.body.querySelectorAll('span')].map(s => [s.textContent, s.style.font, +s.getBoundingClientRect().width.toFixed(1)]);
}, strs);
for (const r of out) console.log(String(r[2]).padStart(6), '|', r[0], '|', r[1]);
await browser.close();
