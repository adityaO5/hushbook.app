// Copied unchanged 2026-11-13 from ../../2026-11-12-best-pride-and-prejudice-audiobook/scripts/pp-audies.mjs; run for "Jane Eyre".
// Scan every Audie Awards year page on audiopub.org (1996 to 2026, links from
// https://www.audiopub.org/audie-awards-winners) for a search term and print each hit
// with context. Pages are saved to <outdir>.
// Usage: node pp-audies.mjs <outdir> "Pride and Prejudice" ["Austen" ...]
// Run 2026-11-12 for research-platforms.md section 4 (same method as the War and Peace
// research's awards scan, which had no saved script).
import fs from 'node:fs';
const [outdir, ...terms] = process.argv.slice(2);
fs.mkdirSync(outdir, { recursive: true });
const UA = { 'User-Agent': 'Mozilla/5.0 (research script)' };
const idx = await (await fetch('https://www.audiopub.org/audie-awards-winners', { headers: UA })).text();
const paths = [...new Set([...idx.matchAll(/href="((?:https:\/\/www\.audiopub\.org)?\/(?:\d{4}[^"]*audie[^"]*))"/gi)].map((m) => m[1].replace('https://www.audiopub.org', '')))].sort();
console.log('year pages:', paths.length);
const clean = (s) => s.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&#8217;|&rsquo;/g, "'").replace(/\s+/g, ' ');
for (const p of paths) {
  let status = 0, html = '';
  for (let i = 0; i < 3 && !html; i++) {
    try { const r = await fetch('https://www.audiopub.org' + p, { headers: UA }); status = r.status; html = await r.text(); } catch (e) { await new Promise((res) => setTimeout(res, 3000)); }
  }
  fs.writeFileSync(`${outdir}/${p.replace(/\W+/g, '_')}.html`, html);
  const t = clean(html);
  const hits = [];
  for (const term of terms) for (const m of t.matchAll(new RegExp(term, 'gi'))) hits.push(t.slice(Math.max(0, m.index - 220), m.index + 220));
  console.log(`${p} HTTP ${status} ${t.length} chars, hits ${hits.length}`);
  for (const h of hits) console.log('   …' + h + '…');
  await new Promise((res) => setTimeout(res, 400));
}
