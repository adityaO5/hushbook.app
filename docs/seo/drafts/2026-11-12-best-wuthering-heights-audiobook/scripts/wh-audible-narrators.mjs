// Audible catalogue API (no auth): does a given person narrate any Wuthering Heights (or Bronte) title?
// Used for the 2026 film cast (no audiobook found = verified absence) and for narrators named in autocomplete.
// Also runs keyword searches for "movie tie-in" audio editions.
//
// Usage: node wh-audible-narrators.mjs <outdir>
// Run 2026-11-12 for research-platforms.md sections 1 and scout.md (film).
import fs from 'node:fs';

const outdir = process.argv[2];
fs.mkdirSync(outdir, { recursive: true });
const UA = { 'User-Agent': 'Mozilla/5.0 (research script)' };
const RG = 'contributors,product_desc,product_attrs';
const get = async (u) => {
  for (let a = 0; a < 4; a++) {
    try { return await (await fetch(u, { headers: UA })).json(); } catch (e) { await new Promise((r) => setTimeout(r, 3000 * (a + 1))); }
  }
  return {};
};
const names = [
  // 2026 film cast and director, per warnerbros.com/movies/wuthering-heights (read 2026-11-12)
  'Jacob Elordi', 'Margot Robbie', 'Hong Chau', 'Alison Oliver', 'Martin Clunes', 'Shazad Latif', 'Ewan Mitchell', 'Emerald Fennell',
  // narrators people search for (scout.md) or the Guardian names
  'Aimee Lou Wood', 'Billie Fulford-Brown', 'Daniel Massey', 'Joanne Froggatt', 'Juliet Stevenson', 'Janet McTeer', 'David Timson',
  'Patricia Routledge', 'Michael Kitchen', 'Emma Messenger', 'Carolyn Seymour', 'Kristin Atherton', 'Judy Holt',
];
for (const n of names) {
  for (const host of ['api.audible.com', 'api.audible.co.uk']) {
    const j = await get(`https://${host}/1.0/catalog/products?narrator=${encodeURIComponent(n)}&num_results=50&response_groups=${RG}&products_sort_by=-ReleaseDate`);
    fs.writeFileSync(`${outdir}/${host}_${n.replace(/\W+/g, '-')}.json`, JSON.stringify(j));
    const wh = (j.products || []).filter((p) => /wuthering|bront/i.test(`${p.title || ''} ${(p.authors || []).map((a) => a.name).join(' ')}`));
    console.log(`${host.replace('api.audible.', '')} | ${n} | titles ${j.total_results ?? '?'} | WH/Bronte: ${wh.map((p) => `${p.asin} ${String(p.title).slice(0, 60)} ${p.release_date} ${p.runtime_length_min} min`).join(' ; ') || 'none'}`);
    await new Promise((r) => setTimeout(r, 300));
  }
}
for (const kw of ['wuthering heights movie tie-in', 'wuthering heights film tie-in', 'wuthering heights tie in']) {
  const j = await get(`https://api.audible.com/1.0/catalog/products?keywords=${encodeURIComponent(kw)}&num_results=20&response_groups=${RG}`);
  console.log(`keywords "${kw}" | ${j.total_results} | ${(j.products || []).slice(0, 8).map((p) => `${String(p.title).slice(0, 50)} / ${(p.narrators || []).map((x) => x.name).join(',')}`).join(' ; ')}`);
}
