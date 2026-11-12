// Fetch Reddit threads by id from the Arctic Shift API (post + every comment), print the
// post and the comments that name a narrator, an accent or LibriVox. Scores as stored there.
// Companion to pp-reddit.mjs (which also searches subreddits by title).
// Usage: node pp-reddit-ids.mjs <outdir> id1,id2,...   Run 2026-11-12.
import fs from 'node:fs';
const [outdir, idList] = process.argv.slice(2);
fs.mkdirSync(outdir, { recursive: true });
const A = 'https://arctic-shift.photon-reddit.com/api';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const get = async (u) => { for (let i = 0; i < 4; i++) { try { const r = await fetch(u, { headers: { 'User-Agent': 'research script' } }); const j = await r.json(); if (!j.error) return j; } catch {} await sleep(3000 * (i + 1)); } return { data: [] }; };
const NAMES = /pike|rosamund|stevenson|juliet|savage|klett|annie coleman|rothenberg|duncan|lindsay|emilia|\bfox\b|kate reading|flo gibson|gibson|beckinsale|andrews|ehle|seymour|bailey|larkin|messenger|landor|varma|andoh|froggatt|redding|kellgren|gavin|lisanti|mcgee|caruso|librivox|bbc|full cast|dramati|audible original|abela|dickinson|accent|american|british|narrat/i;
const ids = idList.split(',');
const posts = (await get(`${A}/posts/ids?ids=${ids.join(',')}`)).data || [];
fs.writeFileSync(`${outdir}/posts.json`, JSON.stringify(posts));
for (const p of posts.sort((a, b) => b.score - a.score)) {
  console.log(`\n### ${p.id} r/${p.subreddit} ${new Date(p.created_utc * 1000).toISOString().slice(0, 10)} score ${p.score} comments ${p.num_comments} | ${p.title}`);
  if (p.selftext) console.log('   OP:', p.selftext.replace(/\s+/g, ' ').slice(0, 500));
  const c = await get(`${A}/comments/search?link_id=${p.id}&limit=100`);
  fs.writeFileSync(`${outdir}/c_${p.id}.json`, JSON.stringify(c));
  for (const x of (c.data || []).sort((a, b) => b.score - a.score)) {
    if (!NAMES.test(x.body || '')) continue;
    console.log(`   [${x.score}] ${new Date(x.created_utc * 1000).toISOString().slice(0, 10)} ${x.body.replace(/\s+/g, ' ').slice(0, 360)}`);
  }
  await sleep(500);
}
