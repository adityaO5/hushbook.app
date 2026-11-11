// Reddit threads about War and Peace audiobooks, through the Arctic Shift API
// (post and comment archive; scores as stored there). Finds threads by id and
// by title search in audiobook and Tolstoy subreddits, then pulls every
// comment of the audiobook threads and prints those naming a narrator,
// translator or LibriVox.
//
// Usage: node wp-reddit.mjs <outdir>
// Run 2026-11-11 for research-platforms.md section 4.
import fs from 'node:fs';

const outdir = process.argv[2];
fs.mkdirSync(outdir, { recursive: true });
const A = 'https://arctic-shift.photon-reddit.com/api';
const get = async (u) => { const r = await fetch(u, { headers: { 'User-Agent': 'research script' } }); return r.json(); };
const ids = ['qmisl6', 'nwz66z', '14ao9hg', '176fo3k', '15pgf0t', '18uzbbg', 'p4dky1', 'ovtot0', 'mr5pna', '6eq2wo', '10b2kos', '18vkecx', '11e23rm'];
const posts = new Map();
const byId = await get(`${A}/posts/ids?ids=${ids.join(',')}`);
for (const p of byId.data || []) posts.set(p.id, p);
for (const sub of ['audiobooks', 'audible', 'tolstoy', 'books', 'russianlit', 'ayearofwarandpeace', 'librivox', 'classicliterature', 'literature']) {
  const s = await get(`${A}/posts/search?subreddit=${sub}&title=${encodeURIComponent('war and peace')}&limit=100`);
  for (const p of s.data || []) {
    const t = `${p.title} ${p.selftext || ''}`;
    if (/audio|narrat|listen|librivox|audible/i.test(t) && !posts.has(p.id)) posts.set(p.id, p);
  }
}
fs.writeFileSync(`${outdir}/posts.json`, JSON.stringify([...posts.values()]));
const NAMES = /newton|thandi|neville|jason|davidson|ballerini|briggs|pevear|maude|garnett|duquenoy|keeble|munro|penguin|naxos|blackstone|librivox|mark nelson|bbc|full cast|dramati|scourby|edmonds|dunnigan|mandelker|preece|barrett|kusi/i;
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
