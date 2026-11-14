// Renders a local HTML figure to WebP with the repo's Playwright and sharp.
// Usage: node render-html.mjs <figure.html> <out.webp> <width> [height|auto]
//   Chrome (sandbox on), bundled Chromium as fallback; deviceScaleFactor 2; WebP quality 84.
//   "auto" (default) sizes the viewport to the page's height. Warns if anything overflows.
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
const require = createRequire('D:/hushbook.app/package.json');
const { chromium } = require('playwright');
const sharp = require('sharp');

const [html, out, w, h = 'auto'] = process.argv.slice(2);
const width = Number(w);
async function launch() {
  try { return await chromium.launch({ headless: true, channel: 'chrome', chromiumSandbox: true }); }
  catch { return chromium.launch({ headless: true, chromiumSandbox: true }); }
}
const browser = await launch();
const page = await browser.newPage({ viewport: { width, height: 1200 }, deviceScaleFactor: 2 });
page.on('pageerror', (e) => console.error('page error: ' + e.message));
page.on('requestfailed', (r) => console.error('request failed: ' + r.url()));
await page.goto(pathToFileURL(path.resolve(html)).href, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
const height = h === 'auto' ? await page.evaluate(() => Math.ceil(document.body.getBoundingClientRect().height)) : Number(h);
await page.setViewportSize({ width, height });
await page.waitForTimeout(100);
const report = await page.evaluate(({ width, height }) => {
  const bad = [];
  for (const el of document.body.querySelectorAll('*')) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue;
    const name = el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).split(' ').join('.') : '');
    if (r.right > width + 0.5 || r.left < -0.5 || r.bottom > height + 0.5) bad.push(`${name} outside viewport (${r.left.toFixed(1)},${r.top.toFixed(1)} ${r.width.toFixed(1)}x${r.height.toFixed(1)})`);
    if (el.scrollWidth > el.clientWidth + 1 && getComputedStyle(el).overflow !== 'visible') bad.push(`${name} clips its content`);
  }
  const fonts = [...document.fonts].map((f) => `${f.family} ${f.weight} ${f.status}`);
  const small = [...document.body.querySelectorAll('*')].filter((el) => el.childNodes.length && [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()) && parseFloat(getComputedStyle(el).fontSize) < 15).map((el) => el.tagName.toLowerCase() + '.' + el.className + ' ' + getComputedStyle(el).fontSize);
  return { bad, fonts, small, fit: window.__fit };
}, { width, height });
const png = await page.screenshot({ type: 'png', fullPage: false });
await browser.close();
await sharp(png).webp({ quality: 84, effort: 6, smartSubsample: true }).toFile(out);
const meta = await sharp(out).metadata();
console.log(`${out}  ${meta.width}x${meta.height}  (css ${width}x${height})`);
console.log('fonts: ' + report.fonts.join(', '));
console.log(report.bad.length ? 'OVERFLOW:\n  ' + report.bad.join('\n  ') : 'no overflow');
console.log(report.small.length ? 'TEXT UNDER 15px:\n  ' + report.small.join('\n  ') : 'all text 15px or larger');
if (report.fit !== undefined) console.log(report.fit.length ? 'LABELS TOO WIDE FOR THEIR BAR: ' + JSON.stringify(report.fit) : 'every bar label fits inside its bar');
