// Group every Pride and Prejudice phrasing into H2/FAQ buckets.
// Adapted 2026-11-12 from ../../2026-11-11-best-war-and-peace-audiobook/scripts/wp-group.mjs.
// Sources: the 2026-11-11 43-call book-lane sweep (books/ac-google*.json Google chrome, ac-bing.json,
// ac-ddg.json), this run's pp-ac.json (gchrome, gfirefox, youtube) and pp-ac-bd.json (bing, ddg),
// plus the 2026-11-10 firefox lane (lane-books/ac-gff.json).
// node pp-group.mjs <scratch pp/ac dir> <scratch books dir> <11-10 ac-gff.json>
import fs from 'node:fs';
import path from 'node:path';
const [, , PP, BOOKS, GFF] = process.argv;
const load = (f) => (fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : {});
const T = 'pride and prejudice';
const re = /pride (and|&|n) prejudice|pride and prej/;
const src = new Map(); // phrase -> {rel, eng:Set}
const add = (s, eng, rel = 0) => { s = s.toLowerCase().trim(); if (!re.test(s)) return; const p = src.get(s) || { rel: 0, eng: new Set() }; p.rel = Math.max(p.rel, rel || 0); p.eng.add(eng); src.set(s, p); };
const oldCalls = {};
for (const f of ['ac-google.json', 'ac-google-rev.json', 'ac-google-mc.json']) { const o = load(path.join(BOOKS, f))[T] || {}; oldCalls[f] = Object.keys(o).length; for (const v of Object.values(o)) for (const x of v.r) add(x.s, 'G', x.rel); }
for (const [f, e] of [['ac-bing.json', 'B'], ['ac-ddg.json', 'D']]) { const o = load(path.join(BOOKS, f))[T] || {}; oldCalls[f] = Object.keys(o).length; for (const v of Object.values(o)) for (const x of v.r) add(x.s, e); }
const pp = load(path.join(PP, 'pp-ac.json')), bd = load(path.join(PP, 'pp-ac-bd.json'));
const tag = { gchrome: 'G', gfirefox: 'F', youtube: 'Y', bing: 'B', ddg: 'D' };
const calls = {};
for (const o of [pp, bd]) for (const [eng, qs] of Object.entries(o)) { calls[eng] = Object.keys(qs).length; for (const r of Object.values(qs)) for (const x of r) add(x.s, tag[eng], x.rel); }
const gffo = load(GFF)[T] || {}; oldCalls['ac-gff.json (11-10)'] = Object.keys(gffo).length;
for (const v of Object.values(gffo)) for (const x of v.gff || []) add(x.s, 'F');
// Noise: films and TV (2005 film, 1995 and 1980 BBC series as TV), cast, musical, zombies, quotes,
// summaries, study notes, other books, other languages, merchandise.
const NOISE = /movie|film|(?<!audible |audiobook |audible full |full )\bcast\b(?! audiobook)|series|episode|\bmini|tv show|imdb|netflix|keira|knightley|macfadyen|colin firth|jennifer ehle(?! audiobook)|1995|1940|1980|2005|joe wright|olivier|garson|bollywood|bride and prejudice|zombie|musical|song|lyrics|soundtrack|score|piano|dawn|game|board|quote|summary|summaries|sparknotes|analysis|essay|themes|meaning|pdf|epub|kindle|paperback|hardcover|\bcover|first edition|vintage|price|amazon(?! audible)|sequel|fanfic|fan fiction|death comes|longbourn|darcy and|mr darcy (actor|played)|actors|actress|watch|trailer|streaming|where to watch|\btv\b|hindi|tamil|urdu|bangla|spanish|español|french|german|deutsch|italian|portuguese|in russian|arabic|chinese|japanese|korean|tattoo|meme|costume|\bdress|aesthetic|wallpaper|tote|necklace|candle|\bring\b|funko|lego|sticker|shirt|mug|journal|\bart\b|painting|drawing|map\b|plot|ending|lesson plan|worksheet|quiz|\btest\b|questions and answers|ar points|lexile|age rating|reading level|pages|page count|hand flex|proposal scene|rain scene|letter scene|location|chatsworth|lyme park|netherfield park|filming|bennet sisters ages|wikipedia|author|published|when was|who wrote|why did|what year|historical context|marxist|feminist|criticism|seth grahame|ebook free download/;
const buckets = [
  ['BBC / radio / dramatised', /bbc|radio|drama|full cast|cast audiobook|audiobook cast|audible cast|dramati|audible original|audible adaptation|performance|play\b|harris dickinson|marisa abela|bill nighy|bertie carvel|glenn close|indira varma|will poulter|luke thompson/],
  ['Best version / narrator', /best|which|version|narrat|who reads|read by|voice|good (as an )?audiobook|good on audiobook|worth|recommend|review|rosamund|pike|juliet|stevenson|karen savage|savage|julie andrews|emilia fox|lindsay duncan|kate reading|flo gibson|ehle|carolyn seymour|josephine bailey|irene sutcliffe|susan lyons|alison larkin|wanda|nadia may|harriet walter|joanna david|marian|ruth wilson|elizabeth klett|annie coleman|accent|american|british|male narrator|female narrator/],
  ['Length / time', /how long|length|hours|duration|time|minutes|days|weeks|how many|word count|words/],
  ['Hard to read / difficulty / language', /hard\b|hard to|hard read|difficult|easy|beginner|too long|boring|intimidat|tough|old english|language|vocabulary|modern english|modern|annotated|understand|english learners|esl|level/],
  ['Read or listen / audio vs book', /read or listen|or book|vs book|better as|audiobook or|listen or read|reading or listening/],
  ['Read along / with text', /with text|read along|read aloud|subtitles|alongside|and ebook|whispersync|immersion|with words|lyrics/],
  ['Characters / names', /character|names|family tree|who is who|cast list|genealogy|darcy|elizabeth|lizzy|bingley|wickham|collins|lady catherine|bennet|jane|lydia|kitty|charlotte|georgiana/],
  ['Free / where to listen', /free|youtube|librivox|archive|spotify|audible|online|full|unabridged|abridged|audio version|audiobooks$|audio book|audio$|apple|libby|hoopla|podcast|cd\b|mp3|download/],
  ['Reading guide / plan / study', /guide|schedule|plan|how to read|reading group|book club|companion|chapter|volume|study/],
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
console.log('calls this run', JSON.stringify(calls), '| reused calls', JSON.stringify(oldCalls));
console.log('distinct per engine (all)', JSON.stringify(per), '(clean)', JSON.stringify(perClean));
fs.writeFileSync(path.join(PP, 'noise.txt'), noise.map(([s]) => s).join('\n'));
