// Copied 2026-11-12 from ../../2026-11-11-best-war-and-peace-audiobook/scripts/wp-apple.mjs (terms and filter changed).
// Apple Books (US): iTunes Search API for Wuthering Heights audiobooks, then each
// matching books.apple.com page's schema.org data (narrator, duration, rating).
// Same method as ../../2026-11-11-best-crime-and-punishment-audiobook/scripts/apple-pages-parse.mjs.
//
// Usage: node wp-apple.mjs <outdir>
// Run 2026-11-12 for research-platforms.md section 1.
import fs from 'node:fs';

const outdir = process.argv[2];
fs.mkdirSync(outdir, { recursive: true });
const UA = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36' };
const seen = new Map();
for (const term of ['wuthering heights', 'wuthering heights bronte', 'wuthering heights unabridged', 'wuthering heights bbc', 'wuthering heights penguin classics', 'emily bronte wuthering heights audiobook', 'wuthering', 'wuthering heights juliet stevenson', 'wuthering heights patricia routledge', 'wuthering heights janet mcteer', 'wuthering heights emma messenger', 'wuthering heights carolyn seymour', 'wuthering heights naxos', 'wuthering heights brilliance', 'wuthering heights blackstone']) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=audiobook&country=us&limit=200`;
  const j = await (await fetch(url, { headers: UA })).json();
  fs.writeFileSync(`${outdir}/search_${term.replace(/\W+/g, '-')}.json`, JSON.stringify(j));
  for (const r of j.results || []) if (!seen.has(r.collectionId)) seen.set(r.collectionId, r);
}
const rows = [...seen.values()].filter((r) => /wuthering/i.test(r.collectionName) && /bront/i.test(r.artistName + ' ' + r.collectionName));
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
