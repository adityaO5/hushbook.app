// Which Kindle editions of The Brothers Karamazov offer "Audible narration"
// (Whispersync for Voice / Read & Listen), with whose narration and price.
// Step 1: Amazon Kindle search results (data-asin + title).
// Step 2: each Kindle product page, scanned for the Audible narration offer.
//
// Usage: node bk-kindle-pairing.mjs <outdir> "<search words>" [maxPages]
// Copied 2026-11-14 from ../../2026-11-11-best-war-and-peace-audiobook/scripts/wp-kindle-pairing.mjs (parent: C&P kindle-pairing.mjs); default words and title filter changed.
// Run 2026-11-14 for research-platforms.md section 1f (Amazon answered for the machine location, India; prices are what that session saw).
import fs from 'node:fs';

const [outdir, words = 'brothers karamazov dostoevsky', maxPages = '2'] = process.argv.slice(2);
fs.mkdirSync(outdir, { recursive: true });
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36';
const H = { 'User-Agent': UA, 'Accept-Language': 'en-US,en;q=0.9' };
const clean = (s) => s.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const found = new Map();
for (let p = 1; p <= Number(maxPages); p++) {
  const url = `https://www.amazon.com/s?k=${encodeURIComponent(words)}&i=digital-text&page=${p}`;
  const h = await (await fetch(url, { headers: H })).text();
  fs.writeFileSync(`${outdir}/search-${p}.html`, h);
  for (const m of h.matchAll(/data-asin="([A-Z0-9]{10})"[\s\S]*?<h2[^>]*>([\s\S]*?)<\/h2>/g)) {
    const t = clean(m[2]);
    if (!found.has(m[1]) && /karamazov/i.test(t)) found.set(m[1], t);
  }
  await sleep(2000);
}
console.error('kindle results:', found.size);

for (const [asin, title] of found) {
  const url = `https://www.amazon.com/dp/${asin}`;
  const r = await fetch(url, { headers: H });
  const h = await r.text();
  fs.writeFileSync(`${outdir}/${asin}.html`, h);
  const text = clean(h);
  const ctx = (re, n = 160) => { const m = text.match(re); if (!m) return ''; const i = m.index; return text.slice(Math.max(0, i - 40), i + n); };
  const row = {
    asin,
    title: title.slice(0, 90),
    http: r.status,
    byline: ctx(/\(Author\)/, 220).slice(0, 240),
    whispersync: /Whispersync for Voice/i.test(text),
    narration: ctx(/Audible narration|Add Audible|Audible Narration/i, 200),
    narratedBy: (text.match(/Narrated by:?\s*([A-Z][^|]{2,60}?)\s{0,2}(?:Length|Audible|\|)/) || [])[1] || '',
    kindlePrice: (text.match(/Kindle Price:?\s*(\$[0-9.]+)/) || text.match(/Kindle\s+\$([0-9.]+)/) || [])[1] || '',
    ku: /Kindle Unlimited/i.test(text) && /\$0\.00/.test(text),
  };
  console.log(JSON.stringify(row));
  await sleep(2500);
}
