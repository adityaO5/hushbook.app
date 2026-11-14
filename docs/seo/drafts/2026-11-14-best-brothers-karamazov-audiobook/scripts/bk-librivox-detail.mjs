// Every LibriVox Brothers Karamazov project in detail (English versions, and any Grand Inquisitor recording): catalogue page facts (catalog
// date, zip size, coordinator, status), archive.org item facts (downloads,
// rating, reviews, publicdate), the per-file `artist` tag HushBook reads for its
// "Read by" line, the 64 kbps MP3 size HushBook downloads, and the chapter
// order HushBook builds (track tag, then file name; 64 kbps preferred),
// mirroring D:\hushbook lib/core/store/librivox_provider.dart (HEAD c0040d1).
// Copied 2026-11-14 from ../../2026-11-13-best-jane-eyre-audiobook/scripts/je-librivox-detail.mjs (parents: P&P pp-librivox-detail.mjs,
// W&P wp-librivox-detail.mjs); title queries changed (Brothers Karamazov, Grand Inquisitor); per-file lengths kept for chapter timing.
//
// Usage: node bk-librivox-detail.mjs <outdir>
// Run 2026-11-14 for research-platforms.md sections 2 and 7.
import fs from 'node:fs';

const outdir = process.argv[2];
fs.mkdirSync(outdir, { recursive: true });
const UA = { 'User-Agent': 'Mozilla/5.0 (research script)' };
const lv = { books: [] };
for (const q of ['%5EBrothers%20Karamazov', '%5EThe%20Brothers%20Karamazov', '%5EGrand%20Inquisitor', '%5EThe%20Grand%20Inquisitor']) {
  const j = await (await fetch(`https://librivox.org/api/feed/audiobooks/?title=${q}&format=json&extended=1&limit=50`, { headers: UA })).json().catch(() => ({}));
  for (const b of j.books || []) if (!lv.books.some((x) => x.id === b.id)) lv.books.push(b);
}
fs.writeFileSync(`${outdir}/lv-api.json`, JSON.stringify(lv));
const clean = (s) => s.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const prio = (f) => ({ '64Kbps MP3': 3, '128Kbps MP3': 2, 'VBR MP3': 1 }[f] || 0);
const out = [];
for (const b of lv.books) {
  const row = { id: b.id, title: b.title, totaltime: b.totaltime, sections: (b.sections || []).length };
  row.readers = [...new Set((b.sections || []).flatMap((s) => (s.readers || []).map((r) => r.display_name)))];
  row.translators = (b.translators || []).map((t) => `${t.first_name} ${t.last_name}`.trim());
  row.text = b.url_text_source;
  // Catalogue page
  try {
    const h = await (await fetch(b.url_librivox, { headers: UA })).text();
    fs.writeFileSync(`${outdir}/page_${b.id}.html`, h);
    const t = clean(h);
    row.catalogDate = (t.match(/Catalog date:\s*([0-9-]+)/) || [])[1] || '';
    row.zip = (t.match(/Download \(([^)]*MB[^)]*)\)/i) || t.match(/zip file[^0-9]{0,40}([0-9.]+\s*MB)/i) || [])[1] || '';
    row.coordinator = (t.match(/Book Coordinator:\s*([^:]+?)\s+(?:Meta Coordinator|Proof Listener|Production details)/) || [])[1] || '';
    row.status = /in progress|Open for volunteers|Abandoned|Being read/i.test(t) ? (t.match(/(in progress|Open for volunteers|Abandoned|Being read)/i) || [])[1] : 'complete';
  } catch (e) { row.pageErr = e.message; }
  // archive.org item
  const item = (b.url_iarchive || '').split('/').pop();
  row.item = item;
  if (item) {
    const m = await (await fetch(`https://archive.org/metadata/${item}`, { headers: UA })).json();
    fs.writeFileSync(`${outdir}/meta_${item}.json`, JSON.stringify(m));
    row.downloads = m.item?.downloads ?? null;
    row.publicdate = (m.metadata?.publicdate || '').slice(0, 10);
    row.iaRuntime = m.metadata?.runtime || '';
    const rv = m.reviews || [];
    row.reviews = rv.length;
    row.avg = rv.length ? +(rv.reduce((a, r) => a + +r.stars, 0) / rv.length).toFixed(2) : null;
    row.reviewTitles = rv.map((r) => `${r.stars}* ${r.reviewtitle}`);
    row.reviewsFull = rv.map((r) => ({ reviewer: r.reviewer, stars: r.stars, date: r.reviewdate, title: r.reviewtitle, body: r.reviewbody }));
    const mp3 = (m.files || []).filter((f) => /\.mp3$/i.test(f.name || '') && /mp3/i.test(f.format || ''));
    const stems = new Map();
    for (const f of mp3) { const s = f.name.toLowerCase().replace(/(_(64|128)kb|_vbr)?\.mp3$/, ''); if (!stems.has(s)) stems.set(s, []); stems.get(s).push(f); }
    const tracked = []; const untracked = [];
    let bytes = 0;
    for (const v of stems.values()) {
      let c = v[0]; for (const f of v.slice(1)) if (prio(f.format) > prio(c.format)) c = f;
      bytes += +(c.size || 0);
      let t = null; for (const f of v) { const mm = String(f.track ?? '').match(/\d+/); if (mm) { t = +mm[0]; break; } }
      (t != null ? tracked : untracked).push({ t, name: c.name, title: c.title, artist: c.artist ?? null, fmt: c.format, length: c.length ?? null });
    }
    tracked.sort((a, b2) => a.t - b2.t || a.name.localeCompare(b2.name)); untracked.sort((a, b2) => a.name.localeCompare(b2.name));
    const all = [...tracked, ...untracked];
    row.chapters = all.length;
    row.formatTaken = [...new Set(all.map((x) => x.fmt))].join(',');
    row.bytesTaken = bytes;
    row.artistTagsOnTaken = [...new Set(all.map((x) => x.artist))].slice(0, 5);
    row.artistTagsAnyFormat = [...new Set(mp3.map((f) => f.artist).filter(Boolean))].slice(0, 5);
    row.first = all.slice(0, 2).map((x) => x.title || x.name);
    row.last = all.slice(-1).map((x) => x.title || x.name);
    row.files = all.map((x) => [x.t, x.title || x.name, x.length]);
  }
  out.push(row);
  console.log(JSON.stringify(row));
  await new Promise((r) => setTimeout(r, 400));
}
fs.writeFileSync(`${outdir}/lv-detail.json`, JSON.stringify(out, null, 1));
