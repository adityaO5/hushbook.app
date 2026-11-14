// Render pages headlessly and save their HTML and visible text (Audible pages
// answer curl with HTTP 503 today; hoopla, Kobo and others are client-rendered).
// Same as ../../2026-11-11-best-crime-and-punishment-audiobook/scripts/render-pages.mjs
// plus the HTML, so data tags such as Audible's "whispersync" can be read.
// Playwright from the repo, chromiumSandbox on, Chrome channel, headless.
//
// Usage: node bk-render.mjs <outdir> URL [URL ...]
// Copied unchanged 2026-11-14 from ../../2026-11-13-best-jane-eyre-audiobook/scripts/je-render.mjs (parents: P&P pp-render.mjs, W&P wp-render.mjs); run for The Brothers Karamazov.
import fs from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire('D:/hushbook.app/package.json');
const { chromium } = require('playwright');

const [outdir, ...urls] = process.argv.slice(2);
fs.mkdirSync(outdir, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: 'chrome', chromiumSandbox: true });
const ctx = await browser.newContext({ locale: 'en-US', viewport: { width: 1280, height: 2000 } });
for (const url of urls) {
  const page = await ctx.newPage();
  try {
    const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(6000);
    const text = await page.evaluate(() => document.body.innerText);
    const html = await page.content();
    const name = url.replace(/^https?:\/\//, '').replace(/[^a-z0-9]+/gi, '_').slice(0, 120);
    fs.writeFileSync(`${outdir}/${name}.txt`, `${url}\n${page.url()}\n\n${text}`);
    fs.writeFileSync(`${outdir}/${name}.html`, html);
    console.log('OK', resp?.status(), url, text.length, /"eventId":"whispersync"/.test(html) ? 'whispersync-tag' : '');
  } catch (e) {
    console.log('ERR', url, e.message.split('\n')[0]);
  }
  await page.close();
}
await browser.close();
