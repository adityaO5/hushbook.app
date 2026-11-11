// Render pages headlessly and print their visible text (buy boxes and other
// client-rendered parts that curl cannot see).
// Playwright from the repo, chromiumSandbox on, Chrome channel, headless.
//
// Usage: node render-pages.mjs <outdir> URL [URL ...]
// Run 2026-11-11 for research-platforms.md.
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
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(6000);
    const text = await page.evaluate(() => document.body.innerText);
    const name = url.replace(/^https?:\/\//, '').replace(/[^a-z0-9]+/gi, '_').slice(0, 120);
    fs.writeFileSync(`${outdir}/${name}.txt`, `${url}\n${page.url()}\n\n${text}`);
    console.log('OK', url, text.length);
  } catch (e) {
    console.log('ERR', url, e.message.split('\n')[0]);
  }
  await page.close();
}
await browser.close();
