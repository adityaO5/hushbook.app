// LibriVox War and Peace projects: readers, translators, runtimes, per-set totals, archive.org downloads.
// Discover's own ordering: run ../../2026-11-11-best-crime-and-punishment-audiobook/scripts/discover-search.mjs "war and peace".
// Reddit scores: https://arctic-shift.photon-reddit.com/api/posts/ids?ids=<ids>&fields=id,subreddit,title,score,num_comments,created_utc
// node wp-librivox.mjs
const UA = { 'User-Agent': 'Mozilla/5.0 (research script)' };
const lv = await (await fetch('https://librivox.org/api/feed/audiobooks/?title=%5EWar%20and%20Peace&format=json&extended=1&limit=50', { headers: UA })).json();
const ia = await (await fetch('https://archive.org/advancedsearch.php?q=' + encodeURIComponent('collection:librivoxaudio AND title:("war and peace")') + '&fl[]=identifier&fl[]=downloads&fl[]=publicdate&rows=50&output=json', { headers: UA })).json();
const dl = Object.fromEntries(ia.response.docs.map((d) => [d.identifier, d]));
const sec = (t) => (t ? t.split(':').map(Number).reduce((a, b) => a * 60 + b, 0) : 0);
const fmt = (s) => `${Math.floor(s / 3600)}:${String(Math.floor((s % 3600) / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
const sets = {};
for (const b of lv.books) {
  const readers = new Set((b.sections || []).flatMap((s) => (s.readers || []).map((r) => r.display_name)));
  const id = (b.url_iarchive || '').split('/').pop();
  const set = /Book \d/.test(b.title) ? '17 books (2007-2011)' : /Dole/.test(b.title) ? 'Dole, 3 vols' : 'Maude, 4 vols (2022-2023)';
  sets[set] ||= { secs: 0, readers: new Set(), dl: 0, items: 0 };
  sets[set].secs += sec(b.totaltime); sets[set].items++; readers.forEach((r) => sets[set].readers.add(r)); sets[set].dl += dl[id]?.downloads || 0;
  console.log([b.id, b.title, b.totaltime || 'no runtime', `${(b.sections || []).length} sections`, `${readers.size} readers`, (b.translators || []).map((t) => `${t.first_name} ${t.last_name}`.trim()).join(' & ') || 'translator not listed', id || 'no archive item', dl[id]?.downloads ?? '-', (dl[id]?.publicdate || '').slice(0, 10)].join(' | '));
}
console.log('\nPer set:');
for (const [k, v] of Object.entries(sets)) console.log(`${k}: ${v.items} items, ${fmt(v.secs)} total, ${v.readers.size} distinct readers, ${v.dl} archive.org downloads`);
