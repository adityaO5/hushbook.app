// Group every War and Peace phrasing into H2/FAQ buckets.
// Sources: today's 43-call book-lane sweep (books/ac-google*.json, Google chrome), this run's wp-ac.json (gchrome, gfirefox, youtube)
// and wp-ac-bd.json (bing, ddg), plus the 2026-11-10 firefox lane (lane-books/ac-gff.json).
// node wp-group.mjs <scratch wp dir> <scratch books dir> <11-10 ac-gff.json>
import fs from 'node:fs';
import path from 'node:path';
const [, , WP, BOOKS, GFF] = process.argv;
const load = (f) => (fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : {});
const T = 'war and peace';
const re = /war (and|&|n) peace/;
const src = new Map(); // phrase -> {rel, eng:Set}
const add = (s, eng, rel = 0) => { s = s.toLowerCase().trim(); if (!re.test(s)) return; const p = src.get(s) || { rel: 0, eng: new Set() }; p.rel = Math.max(p.rel, rel || 0); p.eng.add(eng); src.set(s, p); };
for (const f of ['ac-google.json', 'ac-google-rev.json', 'ac-google-mc.json']) for (const v of Object.values(load(path.join(BOOKS, f))[T] || {})) for (const x of v.r) add(x.s, 'G', x.rel);
for (const v of Object.values(load(path.join(BOOKS, 'ac-bing.json'))[T] || {})) for (const x of v.r) add(x.s, 'B');
for (const v of Object.values(load(path.join(BOOKS, 'ac-ddg.json'))[T] || {})) for (const x of v.r) add(x.s, 'D');
const wp = load(path.join(WP, 'wp-ac.json')), bd = load(path.join(WP, 'wp-ac-bd.json'));
const tag = { gchrome: 'G', gfirefox: 'F', youtube: 'Y', bing: 'B', ddg: 'D' };
const calls = {};
for (const o of [wp, bd]) for (const [eng, qs] of Object.entries(o)) { calls[eng] = Object.keys(qs).length; for (const r of Object.values(qs)) for (const x of r) add(x.s, tag[eng], x.rel); }
for (const v of Object.values(load(GFF)[T] || {})) for (const x of v.gff || []) add(x.s, 'F');
const NOISE = /movie|film|(?<!full )\bcast\b|series|episode|\bmini|tv show|imdb|netflix|bondarchuk|1956|1966|1972|2016|opera|prokofiev|musical|great comet|song|lyrics|game|board|quotes|summary|summaries|sparknotes|analysis|essay|themes|meaning|pdf|epub|kindle|paperback|hardcover|cover|map of|napoleon|borodino|\brussia\b|1812|painting|art\b|tattoo|meme|vs harry|harry potter|hindi|tamil|urdu|bangla|in russian|russian audiobook|spanish|german|deutsch|italian|portuguese|\bvk\b|tolstoy museum|plot|ending|epilogue explained|pages|page count|word count|chapters|chapter \d|book \d|part \d|volume \d|vol \d|on sale|price|used|first edition|vintage|amazon|adaptation|sound pack|jobs|james norton|edmondson|revolution|cavalry|army|french march|singers|hardback|iplayer|streaming|where to watch|clips|trailer|soundtrack|bbc music|bbc rating|bbc youtube|bbc cast|bbc family tree|characters bbc|bbc review|review bbc|review tv|director|\bband\b|hepburn|hopkins|actors|atlas|ar points|ar answers|age rating|peacock|dvd|watch|\btv\b|\bshow\b|documentary|preston|\bkent\b|\bberg\b|eisenhower|and war|audio drama jobs/;
const buckets = [
  ['Best version / narrator', /best|which|version|narrat|who reads|read by|voice|good (as an )?audiobook|good on audiobook|worth|recommend|review|newton|neville jason|davidson|petherbridge|ballerini|preece|vance|homewood|guy smith|o'karma|stevenson|duquenoy/],
  ['Translation', /translat|garnett|maude|briggs|pevear|volokhonsky|p&v|dunnigan|edmonds|mandelker|bromfield|penguin|oxford|everyman|norton|signet|new translation|english version/],
  ['Length / time', /how long|length|hours|duration|time|minutes|days|weeks|how many/],
  ['Hard to read / difficulty', /hard\b|hard to|hard read|difficult|easy|beginner|too long|boring|intimidat|tough/],
  ['Read or listen / audio vs book', /read or listen|or book|vs book|better as|audiobook or|listen or read|reading or listening/],
  ['Read along / with text', /with text|read along|read aloud|subtitles|alongside|and ebook|whispersync|immersion/],
  ['Characters / names / French', /character|names|family tree|who is who|cast list|genealogy|french|pierre|natasha|andrei|andrew|bolkonsk|rostov|bezukhov|kuragin/],
  ['BBC / radio / dramatised', /bbc|radio|drama|full cast|dramati/],
  ['Free / where to listen', /free|youtube|librivox|archive|spotify|audible|online|full|unabridged|abridged|audio version|audiobooks$|audio book|audio$|apple|libby|hoopla|podcast/],
  ['Reading guide / plan', /guide|schedule|plan|how to read|a year of|a chapter a day|reading group|book club|companion/],
];
const out = {}; const used = new Set();
for (const [name, b] of buckets) {
  out[name] = [...src.entries()].filter(([s]) => !NOISE.test(s) && !used.has(s) && b.test(s)).sort((a, c) => c[1].rel - a[1].rel);
  out[name].forEach(([s]) => used.add(s));
}
const rest = [...src.entries()].filter(([s]) => !NOISE.test(s) && !used.has(s));
const noise = [...src.entries()].filter(([s]) => NOISE.test(s));
let total = 0;
for (const [name, l] of Object.entries(out)) {
  total += l.length;
  console.log(`\n### ${name} (${l.length})\n`);
  console.log(l.map(([s, p]) => `${s}${p.rel >= 1250 ? ' **[' + p.rel + ']**' : ''} (${[...p.eng].sort().join('')})`).join('; '));
}
console.log(`\n### Other on-topic (${rest.length})\n`);
console.log(rest.map(([s, p]) => `${s} (${[...p.eng].sort().join('')})`).join('; '));
const top = [...src.entries()].filter(([, p]) => p.rel >= 1250).sort((a, c) => c[1].rel - a[1].rel);
console.log(`\n### rel >= 1250 (${top.length}, noise included)\n` + top.map(([s, p]) => `${s} ${p.rel}${NOISE.test(s) ? ' [noise]' : ''}`).join('; '));
const per = {}; for (const [, p] of src) for (const e of p.eng) per[e] = (per[e] || 0) + 1;
const perClean = {}; for (const [s, p] of src) if (!NOISE.test(s)) for (const e of p.eng) perClean[e] = (perClean[e] || 0) + 1;
console.log(`\nTOTAL grouped ${total}, other ${rest.length}, noise ${noise.length}, all distinct ${src.size}`);
console.log('calls this run', JSON.stringify(calls));
console.log('distinct per engine (all)', JSON.stringify(per), '(clean)', JSON.stringify(perClean));
fs.writeFileSync(path.join(WP, 'noise.txt'), noise.map(([s]) => s).join('\n'));
