// What HushBook Discover shows for a search, in the order a user sees it:
// tier-1 results of both libraries merged the way the app merges them
// (one LibriVox item, then one Internet Archive item, index by index:
// StoreRepository.mergeCatalogPages, D:\hushbook lib/core/store/store_repository.dart:553-571,
// provider order kStoreProviderIds = librivox, internet_archive, store_models.dart:675),
// each card's lines (title; author = archive.org `creator` as is,
// librivox_provider.dart:662-679; meta = length "14h 35m" from whole rounded
// minutes, discover_copy.dart:23-41), plus for LibriVox items the download the
// app takes (64 kbps MP3 first, librivox_provider.dart:454-459) in the app's
// size format (MiB, formatDownloadSize, discover_copy.dart:16-21), the chapter
// count, and the "Read by" line (per-file `artist` tag of the chosen files;
// the author's name does not count, librivox_provider.dart:363-376,
// reader_credit.dart:31-46).
// Queries rebuilt as in ../../2026-11-11-best-crime-and-punishment-audiobook/scripts/discover-search.mjs.
//
// Usage: node pp-discover-cards.mjs "pride and prejudice"
// Adapted 2026-11-12 from ../../2026-11-11-best-war-and-peace-audiobook/scripts/wp-discover-cards.mjs (only the title filter changed).
// Run 2026-11-12 (D:\hushbook HEAD c0040d1, pubspec 1.3.5+70) for research-platforms.md section 5.
const text = process.argv[2] || 'pride and prejudice';
const UA = { 'User-Agent': 'Mozilla/5.0 (research script)' };
const tokens = [...new Set(text.toLowerCase().split(/[^\p{L}\p{M}\p{N}']+/u).filter(Boolean))].slice(0, 8);
const allOf = (toks, fields) => '(' + toks.map((t) => '(' + fields.map((f) => `${f}:(${t})`).join(' OR ') + ')').join(' AND ') + ')';
const primary = allOf(tokens, ['title', 'creator']);
const safety = ['erotica', 'eroticism', 'erotic', 'pornography'].map((s) => `-subject:${s}`);
const bases = {
  librivox: ['collection:librivoxaudio', 'mediatype:audio'],
  internet_archive: ['mediatype:audio', 'collection:audio_bookspoetry', '-collection:librivoxaudio', '(format:"VBR MP3" OR format:"64Kbps MP3" OR format:"128Kbps MP3" OR format:MP3)'],
};
const FIELDS = 'fl[]=identifier&fl[]=title&fl[]=creator&fl[]=downloads&fl[]=avg_rating&fl[]=num_reviews&fl[]=year&fl[]=runtime&fl[]=language&fl[]=subject';
const pages = {};
for (const [prov, base] of Object.entries(bases)) {
  const q = [...base, primary, ...safety].join(' AND ');
  const url = `https://archive.org/advancedsearch.php?q=${encodeURIComponent(q)}&${FIELDS}&output=json&rows=24&page=1&sort[]=${encodeURIComponent('downloads desc')}`;
  pages[prov] = ((await (await fetch(url, { headers: UA })).json()).response?.docs || []).map((d) => ({ prov, ...d }));
}
const merged = [];
const max = Math.max(...Object.values(pages).map((p) => p.length));
for (let i = 0; i < max; i++) for (const prov of ['librivox', 'internet_archive']) if (pages[prov][i]) merged.push(pages[prov][i]);

const secs = (r) => (r ? String(r).split(':').map(Number).reduce((a, b) => a * 60 + b, 0) : null);
const lengthLabel = (s) => { if (!s) return '(no length)'; const m = Math.max(1, Math.round(s / 60)); return m >= 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m}m`; };
const sizeLabel = (b) => (b < 1024 ** 3 ? `${Math.round(b / 1024 ** 2)} MB` : `${(b / 1024 ** 3).toFixed(1)} GB`);
const prio = (f) => ({ '64Kbps MP3': 3, '128Kbps MP3': 2, 'VBR MP3': 1 }[f] || 0);
let pos = 0;
for (const d of merged) {
  pos++;
  let extra = '';
  if (d.prov === 'librivox' && /pride and prejudice/i.test(d.title)) {
    const m = await (await fetch(`https://archive.org/metadata/${d.identifier}`, { headers: UA })).json();
    const mp3 = (m.files || []).filter((f) => /\.mp3$/i.test(f.name || '') && /mp3/i.test(f.format || ''));
    const stems = new Map();
    for (const f of mp3) { const s = f.name.toLowerCase().replace(/(_(64|128)kb|_vbr)?\.mp3$/, ''); if (!stems.has(s)) stems.set(s, []); stems.get(s).push(f); }
    let bytes = 0; const artists = new Set();
    for (const v of stems.values()) { let c = v[0]; for (const f of v.slice(1)) if (prio(f.format) > prio(c.format)) c = f; bytes += +(c.size || 0); if (c.artist && !/austen/i.test(c.artist)) artists.add(c.artist); }
    extra = ` | download ${sizeLabel(bytes)} | ${stems.size} chapters | Read by: ${artists.size === 0 ? 'Reader not listed' : artists.size === 1 ? [...artists][0] : 'Several readers'}`;
  }
  const rating = d.num_reviews ? ` · ${d.avg_rating} (${d.num_reviews})` : '';
  console.log(`${String(pos).padStart(2)}. [${d.prov === 'librivox' ? 'LibriVox' : 'Internet Archive'}] ${d.title} | ${d.creator} | ${lengthLabel(secs(d.runtime))}${rating}${extra} | ${d.identifier} | year ${d.year ?? '-'} | downloads ${d.downloads ?? '-'}`);
}
