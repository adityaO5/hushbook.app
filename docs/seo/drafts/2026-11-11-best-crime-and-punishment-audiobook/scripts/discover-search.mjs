// Rebuild HushBook Discover's tier 1 and tier 2 archive.org queries for a search
// text and run them live, for both providers (LibriVox and Internet Archive).
//
// Mirrors D:\hushbook HEAD c0040d1 (pubspec 1.3.5+70):
//   lib/core/store/search_query.dart        tokens, stopwords, tier clauses
//   lib/core/store/librivox_provider.dart   _buildQuery, _kFields, URL shape
//   lib/core/store/internet_archive_provider.dart  _buildQuery
//   lib/core/store/content_safety.dart      -subject: safety clauses
// Default filters (both libraries, any language/length/genre, Popular sort) add
// no filter clauses; sort is downloads desc.
//
// Usage: node discover-search.mjs "crime and punishment"
// Run 2026-11-11 for research-platforms.md section 5.

const STOP = new Set(['the', 'and', 'for', 'with', 'from', 'not', 'but', 'are', 'was', 'were', 'has', 'have', 'had', 'his', 'her', 'its', 'our', 'you', 'this', 'that', 'these', 'those', 'into', 'over', 'about', 'who', 'what', 'out', 'all', 'a', 'an', 'of', 'in', 'on', 'to', 'by', 'at', 'as', 'is', 'it', 'or', 'be']);
const text = process.argv[2] || 'crime and punishment';
const tokens = [...new Set(text.toLowerCase().split(/[^\p{L}\p{M}\p{N}']+/u).filter(Boolean))].slice(0, 8);

const allOf = (toks, fields) => '(' + toks.map((t) => '(' + fields.map((f) => `${f}:(${t})`).join(' OR ') + ')').join(' AND ') + ')';
const primary = allOf(tokens, ['title', 'creator']);
const expanded = `(${allOf(tokens.filter((t) => !STOP.has(t)), ['title', 'creator', 'subject', 'description'])} AND NOT ${primary})`;
const safety = ['erotica', 'eroticism', 'erotic', 'pornography'].map((s) => `-subject:${s}`);

const bases = {
  librivox: ['collection:librivoxaudio', 'mediatype:audio'],
  internet_archive: ['mediatype:audio', 'collection:audio_bookspoetry', '-collection:librivoxaudio', '(format:"VBR MP3" OR format:"64Kbps MP3" OR format:"128Kbps MP3" OR format:MP3)'],
};
const FIELDS = 'fl[]=identifier&fl[]=title&fl[]=creator&fl[]=downloads&fl[]=avg_rating&fl[]=num_reviews&fl[]=year&fl[]=runtime&fl[]=language&fl[]=subject';

for (const [tier, clause] of [['1 primary', primary], ['2 expanded', expanded]]) {
  for (const [prov, base] of Object.entries(bases)) {
    const q = [...base, clause, ...safety].join(' AND ');
    const url = `https://archive.org/advancedsearch.php?q=${encodeURIComponent(q)}&${FIELDS}${tier.startsWith('2') ? '&fl[]=description' : ''}&output=json&rows=24&page=1&sort[]=${encodeURIComponent('downloads desc')}`;
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (research script)' } });
    const j = await res.json();
    console.log(`== tier ${tier} | ${prov} | numFound ${j.response?.numFound}`);
    if (tier.startsWith('1') && prov === 'librivox') console.log('URL:', url);
    for (const d of j.response?.docs || []) {
      console.log(['  ', d.identifier, '|', d.title, '|', d.creator, '| runtime', d.runtime, '| downloads', d.downloads, '| rating', d.avg_rating ?? '-', `(${d.num_reviews ?? 0})`, '| lang', d.language].join(' '));
    }
  }
}
