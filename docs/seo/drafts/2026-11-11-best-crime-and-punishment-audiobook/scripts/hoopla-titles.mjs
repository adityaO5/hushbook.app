// hoopla: list the audiobook results for a search, then open each title page
// and print its visible facts (narrator, length, publisher, release).
// Playwright from the repo, chromiumSandbox on, Chrome channel, headless.
//
// Usage: node hoopla-titles.mjs "crime and punishment"
// Run 2026-11-11 for research-platforms.md section 1.
import { createRequire } from 'node:module';

const require = createRequire('D:/hushbook.app/package.json');
const { chromium } = require('playwright');

const q = process.argv[2] || 'crime and punishment';
const browser = await chromium.launch({ headless: true, channel: 'chrome', chromiumSandbox: true });
const ctx = await browser.newContext({ locale: 'en-US' });
const page = await ctx.newPage();
await page.goto(`https://www.hoopladigital.com/search?q=${encodeURIComponent(q)}&scope=everything&type=direct&kindId=8`, { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForTimeout(7000);
for (let i = 0; i < 4; i++) { await page.mouse.wheel(0, 4000); await page.waitForTimeout(1500); }
const links = await page.evaluate(() => [...new Set([...document.querySelectorAll('a[href*="/audiobook/crime-and-punishment-"]')].map((a) => a.href.split('?')[0]))]);
console.error('title links:', links.length);
for (const url of links) {
  const p = await ctx.newPage();
  try {
    await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await p.waitForTimeout(4500);
    const t = await p.evaluate(() => document.body.innerText.replace(/\n+/g, ' | '));
    const grab = (re) => (t.match(re) || [])[1] || '';
    console.log(JSON.stringify({
      url,
      title: grab(/\| (Crime[^|]{0,80}) \|/),
      narrator: grab(/(?:Narrator|Read by|Narrated by)s?:?\s*\|?\s*([^|]{2,80})/i),
      length: grab(/(\d+\s*hr[^|]{0,15}|\d+h\s*\d+m)/i),
      publisher: grab(/Publisher:?\s*\|?\s*([^|]{2,60})/i),
      released: grab(/Released?:?\s*\|?\s*([^|]{2,30})/i),
      abridged: /\bAbridged\b/.test(t) ? 'abridged' : (/Unabridged/.test(t) ? 'unabridged' : ''),
    }));
  } catch (e) {
    console.log(JSON.stringify({ url, error: e.message.split('\n')[0] }));
  }
  await p.close();
}
await browser.close();
