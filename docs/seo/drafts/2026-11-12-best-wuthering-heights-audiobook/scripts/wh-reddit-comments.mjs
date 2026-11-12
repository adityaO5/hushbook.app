// Top comments of the Wuthering Heights audiobook and Joseph threads, through the Arctic Shift
// API, with retries (the comment calls in wh-reddit.mjs timed out during a network drop on
// 2026-11-12). Prints the 9 highest-scoring comments per thread.
//
// Usage: node wh-reddit-comments.mjs <outdir>
// Run 2026-11-12 for research-platforms.md section 6a.
import fs from 'node:fs';

const outdir = process.argv[2];
fs.mkdirSync(outdir, { recursive: true });
const A = 'https://arctic-shift.photon-reddit.com/api';
const get = async (u) => {
  for (let a = 0; a < 5; a++) {
    try { const j = await (await fetch(u, { headers: { 'User-Agent': 'research script' } })).json(); if (j.data) return j; } catch (e) { /* retry */ }
    await new Promise((r) => setTimeout(r, 3000 * (a + 1)));
  }
  return { data: [] };
};
for (const id of ['px6ykl', '7p6zng', 'ul16bc', '83iw0u', 'fxtq06', 'ltqtso', '9ubk2s', '1qtb2ku', '1qi0p09']) {
  const c = await get(`${A}/comments/search?link_id=${id}&limit=100`);
  fs.writeFileSync(`${outdir}/c2_${id}.json`, JSON.stringify(c));
  console.log(`\n### ${id} (${c.data.length} comments)`);
  for (const x of c.data.sort((a, b) => b.score - a.score).slice(0, 9)) {
    console.log(`  [${x.score}] ${new Date(x.created_utc * 1000).toISOString().slice(0, 10)} ${(x.body || '').replace(/\s+/g, ' ').slice(0, 300)}`);
  }
  await new Promise((r) => setTimeout(r, 800));
}
