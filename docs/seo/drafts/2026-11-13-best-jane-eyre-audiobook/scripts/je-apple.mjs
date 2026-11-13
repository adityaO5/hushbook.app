// Apple Books (US): iTunes Search API for Jane Eyre audiobooks, then each
// matching books.apple.com page's schema.org data (narrator, duration, rating).
// Same method as ../../2026-11-11-best-crime-and-punishment-audiobook/scripts/apple-pages-parse.mjs.
//
// Usage: node je-apple.mjs <outdir>
// Run 2026-11-13 for research-platforms.md section 1.
// Copied 2026-11-13 from ../../2026-11-12-best-pride-and-prejudice-audiobook/scripts/pp-apple.mjs (parent: War and Peace wp-apple.mjs); search terms and title filter changed.
import fs from 'node:fs';

const outdir = process.argv[2];
fs.mkdirSync(outdir, { recursive: true });
const UA = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36' };
const seen = new Map();
for (const term of ['jane eyre', 'jane eyre charlotte bronte', 'jane eyre unabridged', 'jane eyre bbc', 'jane eyre thandiwe newton', 'jane eyre juliet stevenson', 'jane eyre amanda root', 'jane eyre anna popplewell', 'jane eyre lucy scott', 'jane eyre emma messenger', 'jane eyre susan ericksen', 'jane eyre elizabeth klett']) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=audiobook&country=us&limit=200`;
  const j = await (await fetch(url, { headers: UA })).json();
  fs.writeFileSync(`${outdir}/search_${term.replace(/\W+/g, '-')}.json`, JSON.stringify(j));
  for (const r of j.results || []) if (!seen.has(r.collectionId)) seen.set(r.collectionId, r);
}
const rows = [...seen.values()].filter((r) => /jane eyre/i.test(r.collectionName) && /bront/i.test(r.artistName + ' ' + r.collectionName));
for (const r of rows) {
  const url = `https://books.apple.com/us/audiobook/id${r.collectionId}`;
  let ld = null; let narr = ''; let h = '';
  try {
    h = await (await fetch(url, { headers: UA })).text();
    fs.writeFileSync(`${outdir}/p${r.collectionId}.html`, h);
    for (const m of h.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)) {
      try { const j = JSON.parse(m[1]); if (/Audiobook|Book/.test(JSON.stringify(j['@type'] || ''))) ld = j; } catch {}
    }
    const i = h.indexOf('Narrator');
    narr = i > 0 ? h.slice(i, i + 400).replace(/<[^>]+>/g, '|').replace(/\|+/g, '|').slice(0, 120) : '';
  } catch (e) { narr = 'ERR ' + e.message; }
  const ar = ld?.aggregateRating || {};
  console.log(JSON.stringify({
    id: r.collectionId, name: r.collectionName, artist: r.artistName, price: r.collectionPrice, released: (r.releaseDate || '').slice(0, 10),
    copyright: r.copyright, ldName: ld?.name, duration: ld?.duration, readBy: typeof ld?.readBy === 'string' ? ld.readBy : [].concat(ld?.readBy || []).map((x) => x?.name ?? x).join('; '),
    author: Array.isArray(ld?.author) ? ld.author.map((x) => x.name).join('; ') : ld?.author?.name, publisher: ld?.publisher?.name,
    rating: ar.ratingValue ?? null, ratingCount: ar.reviewCount ?? ar.ratingCount ?? null, narrSnip: narr,
  }));
  await new Promise((res) => setTimeout(res, 500));
}
