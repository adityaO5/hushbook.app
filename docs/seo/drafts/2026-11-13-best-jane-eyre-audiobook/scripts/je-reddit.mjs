// Reddit threads about Jane Eyre audiobooks, through the Arctic Shift API
// (post and comment archive; scores as stored there). Finds threads by id and
// by title search in audiobook and Tolstoy subreddits, then pulls every
// comment of the audiobook threads and prints those naming a narrator,
// an accent or LibriVox.
//
// Usage: node je-reddit.mjs <outdir> [id1,id2,...]
// Run 2026-11-13 for research-platforms.md section 4.
// Copied 2026-11-13 from ../../2026-11-12-best-pride-and-prejudice-audiobook/scripts/pp-reddit.mjs (parent: War and Peace wp-reddit.mjs); subreddits, title, names changed; retries added.
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
for (const sub of ['audiobooks', 'audible', 'JaneEyre', 'bronte', 'books', 'librivox', 'classicliterature', 'literature', 'suggestmeabook', 'ClassicBookClub']) {
  const s = await get(`${A}/posts/search?subreddit=${sub}&title=${encodeURIComponent('jane eyre')}&limit=100`);
  for (const p of s.data || []) {
    const t = `${p.title} ${p.selftext || ''}`;
    if (/audio|narrat|listen|librivox|audible|pronoun|st\.? ?john|french/i.test(t) && !posts.has(p.id)) posts.set(p.id, p);
  }
}
fs.writeFileSync(`${outdir}/posts.json`, JSON.stringify([...posts.values()]));
const NAMES = /thandi|newton|stevenson|juliet|messenger|lucy scott|ericksen|amanda root|root|popplewell|klett|sutton|bailey|nadia may|mccaddon|flo gibson|gibson|mills|bentinck|larkin|woof|naxos|librivox|bbc|full cast|dramati|accent|american|british|french|pronoun|sinjin|st\.? ?john|narrat/i;
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
