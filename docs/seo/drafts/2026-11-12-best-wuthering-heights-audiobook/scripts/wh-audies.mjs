// Scan every Audie Awards year page linked from audiopub.org/audie-awards-winners for
// "Wuthering", "Brontë"/"Bronte" and the narrators in research-platforms.md.
// Same method as the War and Peace research (audiopub.org year pages), saved as a script here.
//
// Usage: node wh-audies.mjs <outdir>
// Run 2026-11-12 for research-platforms.md section 4.
import fs from 'node:fs';

const outdir = process.argv[2];
fs.mkdirSync(outdir, { recursive: true });
const UA = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130 Safari/537.36' };
const get = async (u) => {
  for (let a = 0; a < 4; a++) {
    try { const r = await fetch(u, { headers: UA }); return { status: r.status, text: await r.text() }; } catch (e) { await new Promise((r) => setTimeout(r, 3000 * (a + 1))); }
  }
  return { status: 0, text: '' };
};
const index = await get('https://www.audiopub.org/audie-awards-winners');
const links = [...new Set([...index.text.matchAll(/href="((?:https:\/\/www\.audiopub\.org)?\/(?:\d{4}[^"]*audie[^"]*))"/gi)].map((m) => (m[1].startsWith('http') ? m[1] : `https://www.audiopub.org${m[1]}`)))];
console.log('year pages:', links.length);
const NAMES = /Wuthering|Bront[eë]|Froggatt|Juliet Stevenson|Patricia Routledge|Michael Kitchen|Janet McTeer|David Timson|Emma Messenger|Carolyn Seymour|Aimee Lou Wood|Billie Fulford|Anne Flosnik|Flo Gibson/gi;
for (const u of links.sort()) {
  const { status, text } = await get(u);
  fs.writeFileSync(`${outdir}/${u.split('/').pop()}.html`, text);
  const plain = text.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ');
  const hits = [...plain.matchAll(NAMES)].map((m) => plain.slice(Math.max(0, m.index - 120), m.index + 160));
  console.log(`${u} [${status}] ${hits.length} hits`);
  for (const h of hits.slice(0, 6)) console.log('   …' + h + '…');
  await new Promise((r) => setTimeout(r, 500));
}
