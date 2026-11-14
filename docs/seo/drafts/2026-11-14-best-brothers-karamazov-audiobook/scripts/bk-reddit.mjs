// Reddit threads about The Brothers Karamazov audiobooks and translations, through the Arctic Shift API
// (post and comment archive; scores as stored there). Finds threads by id and
// by title search in audiobook, Dostoevsky and literature subreddits, then pulls every
// comment of the audiobook threads and prints those naming a narrator,
// a translator, an accent, the Grand Inquisitor, Zosima or LibriVox.
//
// Usage: node bk-reddit.mjs <outdir> [id1,id2,...]
// Run 2026-11-14 for research-platforms.md section 6.
// Copied 2026-11-14 from ../../2026-11-13-best-jane-eyre-audiobook/scripts/je-reddit.mjs (parents: P&P pp-reddit.mjs, W&P wp-reddit.mjs); subreddits, title query, filters and names changed.
import fs from 'node:fs';

const outdir = process.argv[2];
fs.mkdirSync(outdir, { recursive: true });
const A = 'https://arctic-shift.photon-reddit.com/api';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const get = async (u) => { for (let i = 0; i < 4; i++) { try { const r = await fetch(u, { headers: { 'User-Agent': 'research script' } }); const j = await r.json(); if (!j.error) return j; } catch {} await sleep(3000 * (i + 1)); } return { data: [] }; };
const ids = (process.argv[3] || '').split(',').filter(Boolean);
const posts = new Map();
const byId = ids.length ? await get(`${A}/posts/ids?ids=${ids.join(',')}`) : { data: [] };
for (const p of byId.data || []) posts.set(p.id, p);
for (const sub of ['audiobooks', 'audible', 'dostoevsky', 'books', 'librivox', 'classicliterature', 'literature', 'suggestmeabook', 'ClassicBookClub', 'russianlit', 'TrueLit', 'Catholicism']) for (const tq of ['karamazov']) {
  const s = await get(`${A}/posts/search?subreddit=${sub}&title=${encodeURIComponent(tq)}&limit=100`);
  for (const p of s.data || []) {
    const t = `${p.title} ${p.selftext || ''}`;
    if (/audio|narrat|listen|librivox|audible|pronoun|translat|garnett|pevear|mcduff|avsey|katz|grand inquisitor|zosima|zossima|skip|hard to read|names/i.test(t) && !posts.has(p.id)) posts.set(p.id, p);
  }
}
fs.writeFileSync(`${outdir}/posts.json`, JSON.stringify([...posts.values()]));
const NAMES = /luke thompson|thompson|ben miles|miles|constantine|gregory|davidson|covell|woolf|vance|rintoul|foster|pirie|addison|naxos|librivox|bbc|full cast|dramati|accent|american|british|pronoun|narrat|audiobook|audible|garnett|pevear|p&v|p ?& ?v|mcduff|avsey|katz|macandrew|magarshack|grand inquisitor|zosima|zossima|hallow/i;
for (const p of [...posts.values()].sort((a, b) => b.score - a.score)) {
  const date = new Date(p.created_utc * 1000).toISOString().slice(0, 10);
  console.log(`\n### ${p.id} r/${p.subreddit} ${date} score ${p.score} comments ${p.num_comments} | ${p.title}`);
  if (p.selftext) console.log('   OP:', p.selftext.replace(/\s+/g, ' ').slice(0, 400));
  const c = await get(`${A}/comments/search?link_id=${p.id}&limit=100`);
  fs.writeFileSync(`${outdir}/c_${p.id}.json`, JSON.stringify(c));
  for (const x of (c.data || []).sort((a, b) => b.score - a.score)) {
    if (!NAMES.test(x.body || '')) continue;
    console.log(`   [${x.score}] ${new Date(x.created_utc * 1000).toISOString().slice(0, 10)} ${x.body.replace(/\s+/g, ' ').slice(0, 420)}`);
  }
  await new Promise((r) => setTimeout(r, 400));
}
