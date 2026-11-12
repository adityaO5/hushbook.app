// Copied 2026-11-12 from ../../2026-11-11-best-war-and-peace-audiobook/scripts/wp-reddit.mjs (ids, subreddits, title and name filters changed).
// Reddit threads about Wuthering Heights audiobooks, through the Arctic Shift API
// (post and comment archive; scores as stored there). Finds threads by id and
// by title search in audiobook and Tolstoy subreddits, then pulls every
// comment of the audiobook threads and prints those naming a narrator,
// translator or LibriVox.
//
// Usage: node wp-reddit.mjs <outdir>
// Run 2026-11-12 for research-platforms.md section 4.
import fs from 'node:fs';

const outdir = process.argv[2];
fs.mkdirSync(outdir, { recursive: true });
const A = 'https://arctic-shift.photon-reddit.com/api';
const get = async (u) => { const r = await fetch(u, { headers: { 'User-Agent': 'research script' } }); return r.json(); };
const ids = ['px6ykl', 'fxtq06', '83iw0u', '7p6zng', 'ul16bc', 'antni0', 'ltqtso', '9ubk2s'];
const posts = new Map();
const byId = await get(`${A}/posts/ids?ids=${ids.join(',')}`);
for (const p of byId.data || []) posts.set(p.id, p);
for (const sub of ['audiobooks', 'audible', 'books', 'classicliterature', 'literature', 'librivox', 'brontesisters', 'suggestmeabook', 'bookclub', 'thehemingwaylist']) {
  const s = await get(`${A}/posts/search?subreddit=${sub}&title=${encodeURIComponent('wuthering heights')}&limit=100`);
  for (const p of s.data || []) {
    const t = `${p.title} ${p.selftext || ''}`;
    if (/audio|narrat|listen|librivox|audible|joseph|dialect|accent/i.test(t) && !posts.has(p.id)) posts.set(p.id, p);
  }
}
fs.writeFileSync(`${outdir}/posts.json`, JSON.stringify([...posts.values()]));
const NAMES = /froggatt|stevenson|routledge|kitchen|mcteer|timson|messenger|seymour|aimee|lou wood|atherton|merlington|michael page|flosnik|gibson|golding|librivox|naxos|penguin|bbc|full cast|dramati|joseph|dialect|accent|yorkshire|lockwood|nelly|two narrators|narrator/i;
for (const p of [...posts.values()].sort((a, b) => b.score - a.score)) {
  const date = new Date(p.created_utc * 1000).toISOString().slice(0, 10);
  console.log(`\n### ${p.id} r/${p.subreddit} ${date} score ${p.score} comments ${p.num_comments} | ${p.title}`);
  if (p.selftext) console.log('   OP:', p.selftext.replace(/\s+/g, ' ').slice(0, 400));
  const c = await get(`${A}/comments/search?link_id=${p.id}&limit=100`);
  fs.writeFileSync(`${outdir}/c_${p.id}.json`, JSON.stringify(c));
  for (const x of (c.data || []).sort((a, b) => b.score - a.score)) {
    if (!NAMES.test(x.body || '')) continue;
    console.log(`   [${x.score}] ${new Date(x.created_utc * 1000).toISOString().slice(0, 10)} ${x.body.replace(/\s+/g, ' ').slice(0, 330)}`);
  }
  await new Promise((r) => setTimeout(r, 400));
}
