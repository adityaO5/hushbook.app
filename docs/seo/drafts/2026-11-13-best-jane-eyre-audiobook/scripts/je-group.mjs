// Group every Jane Eyre phrasing into H2/FAQ buckets.
// Copied 2026-11-13 from ../../2026-11-12-best-wuthering-heights-audiobook/scripts/wh-group.mjs
// (parent: ../../2026-11-11-best-war-and-peace-audiobook/scripts/wp-group.mjs); buckets and noise patterns changed for Jane Eyre.
// Sources: the 2026-11-11 43-call book-lane sweep (books/ac-google.json, Google chrome; ac-bing/ac-ddg.json),
// this run's je-ac-g.json (gchrome, gfirefox), je-ac-y.json (youtube) and je-ac-bd.json (bing, ddg).
// node je-group.mjs <scratch ac dir> <scratch books dir>
import fs from 'node:fs';
import path from 'node:path';
const [, , AC, BOOKS] = process.argv;
const load = (f) => (fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : {});
const T = 'jane eyre';
const re = /jane eyre|eyre/;
const src = new Map();
const add = (s, eng, rel = 0) => { s = s.toLowerCase().trim(); if (!re.test(s)) return; const p = src.get(s) || { rel: 0, eng: new Set() }; p.rel = Math.max(p.rel, rel || 0); p.eng.add(eng); src.set(s, p); };
for (const f of ['ac-google.json', 'ac-google-rev.json', 'ac-google-mc.json']) for (const v of Object.values(load(path.join(BOOKS, f))[T] || {})) for (const x of v.r || []) add(x.s, 'G', x.rel);
for (const v of Object.values(load(path.join(BOOKS, 'ac-bing.json'))[T] || {})) for (const x of v.r || []) add(x.s, 'B');
for (const v of Object.values(load(path.join(BOOKS, 'ac-ddg.json'))[T] || {})) for (const x of v.r || []) add(x.s, 'D');
const tag = { gchrome: 'G', gfirefox: 'F', youtube: 'Y', bing: 'B', ddg: 'D' };
const calls = {};
for (const f of ['je-ac-g.json', 'je-ac-y.json', 'je-ac-bd.json']) for (const [eng, qs] of Object.entries(load(path.join(AC, f)))) { calls[eng] = Object.keys(qs).length; for (const r of Object.values(qs)) for (const x of r) add(x.s, tag[eng], x.rel); }
// Film and TV kept apart. Never put a bare "ring" or "eyre" fragment in noise patterns.
const FILM = /movie|film|\bcast\b(?!.*audio)|trailer|2011|2006|1996|1997|1983|1973|1943|1970|mia wasikowska|fassbender|ruth wilson|toby stephens|orson welles|joan fontaine|timothy dalton|zelah|charlotte gainsbourg|william hurt|ciaran hinds|samantha morton|zeffirelli|series|episode|where to watch|netflix|prime video|bbc iplayer|book vs|vs book|tv\b|miniseries|musical|broadway|ballet|opera/;
const NOISE = /song|lyrics|chords|costume|dress|outfit|tattoo|wallpaper|aesthetic|quotes|quote\b|summary|summaries|sparknotes|analysis|essay|themes|meaning|symbolism|pdf|epub|kindle|paperback|hardcover|cover|for sale|price|\bused\b|first edition|vintage|amazon|haworth|game|play\b|theatre|theater|hindi|tamil|urdu|bangla|spanish|en español|italian|portuguese|in arabic|chinese|japanese|korean|plot|ending explained|\btest\b|quiz|\bvk\b|ok ru|dailymotion|wiki\b|wikipedia|shirt|tote|mug|jewelry|necklace|fanfic|fan art|drawing|illustrat|wide sargasso|jasper fforde|thursday next|eyre affair|eyre square|galway|jane eyre house|hotel|restaurant|perfume|candle/;
const AUDIO = /audio|narrat|audible|librivox|read by|read along|unabridged|abridged|listen/;
const buckets = [
  ['Film/TV x audiobook (film terms in an audio phrasing)', { test: (s) => FILM.test(s) && AUDIO.test(s) }],
  ['Film and TV', FILM],
  ['Best version / narrator', /best|which|version|narrat|who reads|read by|voice|good (as an )?audiobook|good on audiobook|worth|recommend|review|stevenson|thandiwe|thandie|newton|popplewell|amanda root|juliet mills|ericksen|josephine bailey|nadia may|flo gibson|messenger|lucy scott|mccaddon|klett|dawn sutton|naxos|audible|penguin|full cast|dramati|bbc|radio|claire bloom|accent|british|american/],
  ['Length / time / chapters', /how long|length|pages|page count|word count|hours|duration|time|minutes|days|weeks|how many|chapters?\b|volume|part \d|part one|part two|part 1|part 2/],
  ['French / Adele', /french|adele|adèle|céline|celine|translat/],
  ['Pronunciation (Eyre, St. John)', /pronoun|say\b|st\.? john|sinjin|how do you say/],
  ['Hard to read', /hard\b|hard to|difficult|easy|beginner|boring|confus|tough|vocabulary|modern english|old english|understand|slow/],
  ['Read or listen / audio vs book', /read or listen|or book|vs book|better as|audiobook or|listen or read|reading or listening/],
  ['Read along / with text', /with text|read along|read aloud|subtitles|alongside|and ebook|whispersync/],
  ['Names / characters / narrator of the story', /character|names|family tree|who is who|rochester|helen|adele|reed|rivers|brocklehurst|temple|fairfax|grace poole|blanche|ingram|bessie|mason|bertha|thornfield|lowood|gateshead|narrator of|who narrates the|who tells|first person|point of view|reader i/],
  ['Free / where to listen', /free|youtube|librivox|archive|spotify|online|full|unabridged|abridged|audio version|audiobooks$|audio book|audio$|apple|libby|hoopla|podcast|chirp|libro/],
  ['Reading guide / how to read', /guide|schedule|plan|how to read|book club|companion|study/],
];
const out = {}; const used = new Set();
for (const [name, b] of buckets) {
  out[name] = [...src.entries()].filter(([s]) => (name.startsWith('Film') || !NOISE.test(s)) && !used.has(s) && b.test(s)).sort((a, c) => c[1].rel - a[1].rel);
  out[name].forEach(([s]) => used.add(s));
}
const rest = [...src.entries()].filter(([s]) => !NOISE.test(s) && !used.has(s));
const noise = [...src.entries()].filter(([s]) => NOISE.test(s) && !used.has(s));
let total = 0;
for (const [name, l] of Object.entries(out)) {
  total += l.length;
  console.log(`\n### ${name} (${l.length})\n`);
  console.log(l.map(([s, p]) => `${s}${p.rel >= 1250 ? ' **[' + p.rel + ']**' : ''} (${[...p.eng].sort().join('')})`).join('; '));
}
console.log(`\n### Other on-topic (${rest.length})\n`);
console.log(rest.map(([s, p]) => `${s}${p.rel >= 1250 ? ' **[' + p.rel + ']**' : ''} (${[...p.eng].sort().join('')})`).join('; '));
const top = [...src.entries()].filter(([, p]) => p.rel >= 1250).sort((a, c) => c[1].rel - a[1].rel);
const bucketOf = (s) => Object.entries(out).find(([, l]) => l.some(([x]) => x === s))?.[0] || (NOISE.test(s) ? 'noise' : 'other');
console.log(`\n### rel >= 1250 (${top.length}, all buckets)\n` + top.map(([s, p]) => `${s} ${p.rel} [${bucketOf(s)}] (${[...p.eng].sort().join('')})`).join('\n'));
const per = {}; for (const [, p] of src) for (const e of p.eng) per[e] = (per[e] || 0) + 1;
console.log(`\nTOTAL grouped ${total} (film ${out['Film and TV'].length}, film x audio ${out['Film/TV x audiobook (film terms in an audio phrasing)'].length}), other ${rest.length}, noise ${noise.length}, all distinct ${src.size}`);
console.log('calls this run', JSON.stringify(calls));
console.log('distinct per engine', JSON.stringify(per));
fs.writeFileSync(path.join(AC, 'noise.txt'), noise.map(([s]) => s).join('\n'));
