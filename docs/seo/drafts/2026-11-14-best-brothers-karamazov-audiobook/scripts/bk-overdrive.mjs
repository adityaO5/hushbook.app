// Libby / OverDrive: public thunder catalogue API for five large US library
// systems, audiobook formats only; one line per Brothers Karamazov audiobook with
// narrator, publisher, runtime (from formats), copies and availability, translator.
// Copied 2026-11-14 from ../../2026-11-13-best-jane-eyre-audiobook/scripts/je-overdrive.mjs (parents: P&P pp-overdrive.mjs, W&P wp-overdrive.mjs); query and filter changed.
// Same endpoint as the Crime and Punishment research (section "How pages were read").
//
// Usage: node bk-overdrive.mjs <outdir>
// Run 2026-11-14 for research-platforms.md section 1 (The Brothers Karamazov).
import fs from 'node:fs';

const outdir = process.argv[2];
fs.mkdirSync(outdir, { recursive: true });
const libs = ['nypl', 'lapl', 'kcls', 'sfpl', 'chipublib'];
const byTitle = new Map();
for (const lib of libs) for (const q of ['brothers karamazov', 'karamazov brothers', 'grand inquisitor']) {
  const url = `https://thunder.api.overdrive.com/v2/libraries/${lib}/media?query=${encodeURIComponent(q)}&format=audiobook-overdrive,audiobook-mp3&perPage=100`;
  const j = await (await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (research script)' } })).json();
  fs.writeFileSync(`${outdir}/${lib}_${q.replace(/\W+/g, '-')}.json`, JSON.stringify(j));
  for (const m of j.items || []) {
    if (!/dosto/i.test(JSON.stringify(m.creators || [])) || !/karamazov|inquisitor/i.test(m.title)) continue;
    const narr = (m.creators || []).filter((c) => /narrator|performer|reader/i.test(c.role)).map((c) => c.name).join('; ');
    const trans = (m.creators || []).filter((c) => /translator/i.test(c.role)).map((c) => c.name).join('; ');
    const dur = (m.formats || []).map((f) => f.duration).filter(Boolean)[0] || '';
    const key = `${m.title}|${m.subtitle || ''}|${narr}|${m.publisher?.name}|${dur}`;
    if (!byTitle.has(key)) byTitle.set(key, { title: m.title, subtitle: m.subtitle || '', narr, trans, pub: m.publisher?.name, date: (m.publishDate || '').slice(0, 10), dur, edition: m.edition || '', libs: [] });
    if (!byTitle.get(key).libs.some((x) => x.startsWith(lib + ':'))) byTitle.get(key).libs.push(`${lib}:${m.ownedCopies ?? '?'}c/${m.availableCopies ?? '?'}a/${m.holdsCount ?? 0}h`);
  }
}
for (const v of byTitle.values()) console.log(JSON.stringify(v));
