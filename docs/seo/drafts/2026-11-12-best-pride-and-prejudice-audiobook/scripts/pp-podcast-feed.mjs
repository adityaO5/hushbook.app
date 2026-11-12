// Sum the episode durations of a podcast RSS feed for episodes whose title matches a term
// (e.g. Noiser's "Jane Austen Stories", read by Julie Andrews). No network: pass a saved feed.
// Usage: node pp-podcast-feed.mjs <feed.xml> "Pride and Prejudice"
// Run 2026-11-12 for research-platforms.md (dramatised and podcast versions).
import fs from 'node:fs';
const [file, term] = process.argv.slice(2);
const x = fs.readFileSync(file, 'utf8');
const tag = (s, t) => {
  const m = s.match(new RegExp(`<${t}(?:\\s[^>]*)?>([\\s\\S]*?)</${t}>`));
  return m ? m[1].replace(/^<!\[CDATA\[|\]\]>$/g, '').trim() : '';
};
const secs = (d) => (d.includes(':') ? d.split(':').map(Number).reduce((a, b) => a * 60 + b, 0) : Number(d));
const items = [...x.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => m[1]);
console.log(`channel: ${tag(x, 'title')} | author: ${tag(x, 'itunes:author')} | items: ${items.length}`);
let total = 0;
const rows = [];
for (const it of items) {
  const title = tag(it, 'title');
  if (!new RegExp(term, 'i').test(title)) continue;
  const d = tag(it, 'itunes:duration');
  total += secs(d);
  rows.push(`${tag(it, 'pubDate').slice(0, 16)} | ${title} | ${d} | ${tag(it, 'itunes:episodeType')} | season ${tag(it, 'itunes:season')} ep ${tag(it, 'itunes:episode')}`);
}
console.log(rows.reverse().join('\n'));
console.log(`matching episodes: ${rows.length}; total ${Math.floor(total / 3600)} h ${Math.round((total % 3600) / 60)} min (${total} s)`);
