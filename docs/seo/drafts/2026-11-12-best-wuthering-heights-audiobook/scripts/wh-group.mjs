// Group every Wuthering Heights phrasing into H2/FAQ buckets.
// Adapted from ../../2026-11-11-best-war-and-peace-audiobook/scripts/wp-group.mjs.
// Sources: the 2026-11-11 43-call book-lane sweep (books/ac-google*.json, Google chrome; ac-bing/ac-ddg.json),
// this run's wh-ac.json (gchrome, gfirefox, youtube) and wh-ac-bd.json (bing, ddg).
// node wh-group.mjs <scratch wh dir> <scratch books dir>
import fs from 'node:fs';
import path from 'node:path';
const [, , WH, BOOKS] = process.argv;
const load = (f) => (fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : {});
const T = 'wuthering heights';
const re = /wuthering/;
const src = new Map(); // phrase -> {rel, eng:Set}
const add = (s, eng, rel = 0) => { s = s.toLowerCase().trim(); if (!re.test(s)) return; const p = src.get(s) || { rel: 0, eng: new Set() }; p.rel = Math.max(p.rel, rel || 0); p.eng.add(eng); src.set(s, p); };
for (const f of ['ac-google.json', 'ac-google-rev.json', 'ac-google-mc.json']) for (const v of Object.values(load(path.join(BOOKS, f))[T] || {})) for (const x of v.r || []) add(x.s, 'G', x.rel);
for (const v of Object.values(load(path.join(BOOKS, 'ac-bing.json'))[T] || {})) for (const x of v.r || []) add(x.s, 'B');
for (const v of Object.values(load(path.join(BOOKS, 'ac-ddg.json'))[T] || {})) for (const x of v.r || []) add(x.s, 'D');
const wh = load(path.join(WH, 'wh-ac.json')), bd = load(path.join(WH, 'wh-ac-bd.json'));
const tag = { gchrome: 'G', gfirefox: 'F', youtube: 'Y', bing: 'B', ddg: 'D' };
const calls = {};
for (const o of [wh, bd]) for (const [eng, qs] of Object.entries(o)) { calls[eng] = Object.keys(qs).length; for (const r of Object.values(qs)) for (const x of r) add(x.s, tag[eng], x.rel); }
// Film phrasings are kept apart (own bucket) because the brief asks whether the 2026 film drives phrasings.
// Note: never put a bare "ring" in these patterns: it matches "wuthe-ring".
const FILM = /movie|film|2026|margot|robbie|elordi|fennell|(?<!full )\bcast\b|trailer|premiere|tie.?in|before the movie|book vs|vs book|charli|soundtrack|box office|rotten|streaming|watch|release date|showtimes|hbo|max\b|1992|1939|2011|2009|ralph fiennes|olivier|tom hardy|kaya|andrea arnold|cliff richard/;
const NOISE = /kate bush|song|lyrics|chords|piano|karaoke|dance|tiktok|meme|costume|dress|outfit|halloween|tattoo|wallpaper|aesthetic|quotes|quote\b|summary|summaries|sparknotes|analysis|essay|themes|meaning|symbolism|pdf|epub|kindle|paperback|hardcover|cover|edition for sale|price|\bused\b|first edition|vintage|amazon|haworth|moor|walk|hike|map\b|location|filming|poster|funko|lego|perfume|candle|candles|merch|book box|game|musical|opera|ballet|play\b|theatre|theater|hindi|tamil|urdu|bangla|spanish|french|german|italian|portuguese|in arabic|chinese|japanese|korean|plot|ending explained|age rating|ar points|\btest\b|quiz|\bvk\b|ok ru|dailymotion|123movies|netflix|imdb|wiki\b|wikipedia|lyric|shirt|sweatshirt|tote|mug|jewelry|necklace|\bring\b|fanfic|fan art|drawing|illustrat/;
const AUDIO = /audio|narrat|audible|librivox|read by|read along|unabridged|abridged|listen/;
const buckets = [
  ['Film x audiobook (film terms in an audio phrasing)', { test: (s) => FILM.test(s) && AUDIO.test(s) }],
  ['Film (2026 and older)', FILM],
  ['Best version / narrator', /best|which|version|narrat|who reads|read by|voice|good (as an )?audiobook|good on audiobook|worth|recommend|review|froggatt|stevenson|routledge|kitchen|mcteer|timson|messenger|seymour|aimee|lou wood|naxos|audible|penguin|full cast|dramati|bbc|radio/],
  ['Length / time', /how long|length|pages|page count|word count|hours|duration|time|minutes|days|weeks|how many/],
  ['Hard to read / dialect / Joseph', /hard\b|hard to|hard read|difficult|easy|beginner|boring|confus|tough|joseph|dialect|yorkshire|accent|translat|what does .* mean|understand/],
  ['Read or listen / audio vs book', /read or listen|or book|vs book|better as|audiobook or|listen or read|reading or listening/],
  ['Read along / with text', /with text|read along|read aloud|subtitles|alongside|and ebook|whispersync/],
  ['Names / family tree / narrators of the story', /character|names|family tree|who is who|genealogy|two cath|catherine|cathy|heathcliff|hareton|hindley|linton|edgar|isabella|nelly|lockwood|zillah|earnshaw|narrator of|who narrates the|who tells|frame|timeline/],
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
console.log(rest.map(([s, p]) => `${s} (${[...p.eng].sort().join('')})`).join('; '));
const top = [...src.entries()].filter(([, p]) => p.rel >= 1250).sort((a, c) => c[1].rel - a[1].rel);
console.log(`\n### rel >= 1250 (${top.length}, all buckets)\n` + top.map(([s, p]) => `${s} ${p.rel}${FILM.test(s) ? ' [film]' : NOISE.test(s) ? ' [noise]' : ''}`).join('; '));
const per = {}; for (const [, p] of src) for (const e of p.eng) per[e] = (per[e] || 0) + 1;
console.log(`\nTOTAL grouped ${total} (film ${out['Film (2026 and older)'].length}, film x audio ${out['Film x audiobook (film terms in an audio phrasing)'].length}), other ${rest.length}, noise ${noise.length}, all distinct ${src.size}`);
console.log('calls this run', JSON.stringify(calls));
console.log('distinct per engine', JSON.stringify(per));
fs.writeFileSync(path.join(WH, 'noise.txt'), noise.map(([s]) => s).join('\n'));
