// Read Audible US product pages (price, length, release date, rating text,
// Whispersync tag) for a list of ASINs. Audible US redirects non-US IPs unless
// ?ipRedirectOverride=true&overrideBaseCountry=true is added.
//
// Usage: node audible-pages.mjs <outdir> ASIN [ASIN ...]
// Run 2026-11-11 for research-platforms.md sections 1 and 3.
import fs from 'node:fs';

const [outdir, ...asins] = process.argv.slice(2);
fs.mkdirSync(outdir, { recursive: true });
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36';
const clean = (s) => s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const pick = (h, re) => (h.match(re) || [])[1] || '';

for (const asin of asins) {
  const url = `https://www.audible.com/pd/${asin}?ipRedirectOverride=true&overrideBaseCountry=true`;
  let h = '';
  try {
    const r = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'en-US,en;q=0.9' } });
    h = await r.text();
    fs.writeFileSync(`${outdir}/${asin}.html`, h);
    if (r.status !== 200) { console.log(asin, 'HTTP', r.status); continue; }
  } catch (e) { console.log(asin, 'ERR', e.message); continue; }
  const row = {
    asin,
    title: clean(pick(h, /<h1[^>]*>([\s\S]*?)<\/h1>/)),
    buy: pick(h, /Buy for (\$[0-9.,]+)/),
    length: pick(h, /Length: ([^<]+)</).trim(),
    release: pick(h, /Release date: ([^<]+)</).trim(),
    format: pick(h, /"format":"([^"]+)"/),
    whispersync: /"eventId":"whispersync"/.test(h),
    plus: /Plus Catalog/i.test(pick(h, /(Included in[^<]{0,80}|Plus Catalog[^<]{0,40})/)) ,
    included: clean(pick(h, /(Included (?:in|with)[^<]{0,80})</)),
    rating: pick(h, /"rating":\{"[^}]*?"value":([0-9.]+)/) || pick(h, /([0-9.]+) out of 5 stars/),
    ratingCount: pick(h, /([0-9,]+) ratings/),
    translator: clean(pick(h, /(Translated by[\s\S]{0,200}?)<\/li>/)).slice(0, 120),
  };
  console.log(JSON.stringify(row));
  await new Promise((r) => setTimeout(r, 1500));
}
