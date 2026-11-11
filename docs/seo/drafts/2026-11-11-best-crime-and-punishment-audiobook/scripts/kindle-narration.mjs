// For Kindle product pages, read the "Add Audible narration" offer the page
// fills in client-side: the paired Audible ASIN and price fields.
// Playwright from the repo, chromiumSandbox on, Chrome channel, headless.
//
// Usage: node kindle-narration.mjs KINDLE_ASIN [KINDLE_ASIN ...]
// Run 2026-11-11 for research-platforms.md section 3. Note: Amazon served
// this machine's location (India), so displayed prices are in INR; the
// "You will be charged USD x" line gives the Kindle price in dollars.
import { createRequire } from 'node:module';

const require = createRequire('D:/hushbook.app/package.json');
const { chromium } = require('playwright');

const browser = await chromium.launch({ headless: true, channel: 'chrome', chromiumSandbox: true });
const ctx = await browser.newContext({ locale: 'en-US' });
for (const asin of process.argv.slice(2)) {
  const page = await ctx.newPage();
  await page.goto(`https://www.amazon.com/dp/${asin}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(5000);
  const out = await page.evaluate(() => {
    const v = (sel) => document.querySelector(sel)?.value ?? null;
    const txt = document.body.innerText;
    const line = (re) => (txt.match(re) || [])[0] || '';
    return {
      audibleAsin: v('#audibleAsin'),
      audibleOurPrice: v('#audibleOurPrice'),
      addAudiobookLine: line(/Add\s+audiobook for[^\n]*/),
      readAndListen: line(/Read and Listen for Free[^\n]*/),
      chargedLine: line(/You will be charged [^\n]*/),
      narrationHtml: (document.querySelector('#audibleNarration_feature_div, #addNarration_feature_div, [id*="narration" i]')?.innerText || '').slice(0, 300),
    };
  });
  console.log(asin, JSON.stringify(out));
  await page.close();
}
await browser.close();
