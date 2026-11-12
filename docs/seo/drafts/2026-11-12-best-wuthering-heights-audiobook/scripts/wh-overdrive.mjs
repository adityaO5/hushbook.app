// Copied 2026-11-12 from ../../2026-11-11-best-war-and-peace-audiobook/scripts/wp-overdrive.mjs (query and filter changed).
// Libby / OverDrive: public thunder catalogue API for five large US library
// systems, audiobook formats only; one line per Wuthering Heights audiobook with
// narrator, publisher, runtime (from formats), copies and availability.
// Same endpoint as the Crime and Punishment research (section "How pages were read").
//
// Usage: node wp-overdrive.mjs <outdir>
// Run 2026-11-12 for research-platforms.md section 1.
import fs from 'node:fs';

const outdir = process.argv[2];
fs.mkdirSync(outdir, { recursive: true });
const libs = ['nypl', 'lapl', 'kcls', 'sfpl', 'chipublib'];
const byTitle = new Map();
for (const lib of libs) {
  const url = `https://thunder.api.overdrive.com/v2/libraries/${lib}/media?query=${encodeURIComponent('wuthering heights')}&format=audiobook-overdrive,audiobook-mp3&perPage=100`;
  const j = await (await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (research script)' } })).json();
  fs.writeFileSync(`${outdir}/${lib}.json`, JSON.stringify(j));
  for (const m of j.items || []) {
    if (!/bront/i.test(JSON.stringify(m.creators || [])) || !/wuthering/i.test(m.title)) continue;
    const narr = (m.creators || []).filter((c) => /narrator|performer|reader/i.test(c.role)).map((c) => c.name).join('; ');
    const trans = (m.creators || []).filter((c) => /translator/i.test(c.role)).map((c) => c.name).join('; ');
    const dur = (m.formats || []).map((f) => f.duration).filter(Boolean)[0] || '';
    const key = `${m.title}|${m.subtitle || ''}|${narr}|${m.publisher?.name}|${dur}`;
    if (!byTitle.has(key)) byTitle.set(key, { title: m.title, subtitle: m.subtitle || '', narr, trans, pub: m.publisher?.name, date: (m.publishDate || '').slice(0, 10), dur, edition: m.edition || '', libs: [] });
    byTitle.get(key).libs.push(`${lib}:${m.ownedCopies ?? '?'}c/${m.availableCopies ?? '?'}a/${m.holdsCount ?? 0}h`);
  }
}
for (const v of byTitle.values()) console.log(JSON.stringify(v));
