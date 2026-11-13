// HushBook Discover's second search tier ("expanded": every token in title, creator, subject or description,
// excluding first-tier hits; D:\hushbook lib/core/store/search_query.dart:100-111 at HEAD d2ed665) for both libraries,
// to see which cards a user scrolling past the first tier meets, and to flag uploads that look like copies of
// commercial recordings. New 2026-11-13 (companion to je-discover-cards.mjs, same base clauses).
// Usage: node je-discover-expanded.mjs "jane eyre"
const text = process.argv[2] || 'jane eyre';
const UA = { 'User-Agent': 'Mozilla/5.0 (research script)' };
const toks = [...new Set(text.toLowerCase().split(/[^\p{L}\p{M}\p{N}']+/u).filter(Boolean))].slice(0, 8);
const allOf = (fields) => '(' + toks.map((t) => '(' + fields.map((f) => `${f}:(${t})`).join(' OR ') + ')').join(' AND ') + ')';
const clause = `(${allOf(['title', 'creator', 'subject', 'description'])} AND NOT ${allOf(['title', 'creator'])})`;
const safety = ['erotica', 'eroticism', 'erotic', 'pornography'].map((s) => `-subject:${s}`);
const bases = {
  librivox: ['collection:librivoxaudio', 'mediatype:audio'],
  internet_archive: ['mediatype:audio', 'collection:audio_bookspoetry', '-collection:librivoxaudio', '(format:"VBR MP3" OR format:"64Kbps MP3" OR format:"128Kbps MP3" OR format:MP3)'],
};
for (const [prov, base] of Object.entries(bases)) {
  const q = [...base, clause, ...safety].join(' AND ');
  const url = `https://archive.org/advancedsearch.php?q=${encodeURIComponent(q)}&fl[]=identifier&fl[]=title&fl[]=creator&fl[]=downloads&fl[]=runtime&fl[]=year&output=json&rows=24&page=1&sort[]=${encodeURIComponent('downloads desc')}`;
  const j = await (await fetch(url, { headers: UA })).json();
  console.log(`\n${prov}: ${j.response?.numFound} found`);
  for (const d of j.response?.docs || []) console.log(`  ${d.title} | ${[].concat(d.creator || '').join('; ')} | ${d.runtime || '-'} | ${d.identifier} | ${d.year || '-'} | dl ${d.downloads}`);
}
