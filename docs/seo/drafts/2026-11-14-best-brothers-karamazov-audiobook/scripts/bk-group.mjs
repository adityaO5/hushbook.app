// Group every Brothers Karamazov phrasing into H2/FAQ buckets.
// Copied 2026-11-14 from ../../2026-11-13-best-jane-eyre-audiobook/scripts/je-group.mjs
// (parents: WH wh-group.mjs, W&P wp-group.mjs); buckets and noise patterns changed for The Brothers Karamazov
// (translation, Grand Inquisitor, Zosima / Book VI, plot-and-spoiler questions kept apart).
// Sources: the 2026-11-11 43-call book-lane sweep (books/ac-google.json, Google chrome; ac-bing/ac-ddg.json; key "the brothers karamazov"),
// this run's bk-ac-g.json (gchrome, gfirefox), bk-ac-y.json (youtube) and bk-ac-bd.json (bing, ddg).
// node bk-group.mjs <scratch ac dir> <scratch books dir>
import fs from 'node:fs';
import path from 'node:path';
const [, , AC, BOOKS] = process.argv;
const load = (f) => (fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : {});
const T = 'the brothers karamazov';
const re = /karamazov|grand inquisitor|karamazovs/;
const src = new Map();
const add = (s, eng, rel = 0) => { s = s.toLowerCase().trim(); if (!re.test(s)) return; const p = src.get(s) || { rel: 0, eng: new Set() }; p.rel = Math.max(p.rel, rel || 0); p.eng.add(eng); src.set(s, p); };
for (const f of ['ac-google.json', 'ac-google-rev.json', 'ac-google-mc.json']) for (const v of Object.values(load(path.join(BOOKS, f))[T] || {})) for (const x of v.r || []) add(x.s, 'G', x.rel);
for (const v of Object.values(load(path.join(BOOKS, 'ac-bing.json'))[T] || {})) for (const x of v.r || []) add(x.s, 'B');
for (const v of Object.values(load(path.join(BOOKS, 'ac-ddg.json'))[T] || {})) for (const x of v.r || []) add(x.s, 'D');
const tag = { gchrome: 'G', gfirefox: 'F', youtube: 'Y', bing: 'B', ddg: 'D' };
const calls = {};
for (const f of ['bk-ac-g.json', 'bk-ac-y.json', 'bk-ac-bd.json']) for (const [eng, qs] of Object.entries(load(path.join(AC, f)))) { calls[eng] = Object.keys(qs).length; for (const r of Object.values(qs)) for (const x of r) add(x.s, tag[eng], x.rel); }
const FILM = /movie|film|\bcast\b(?!.*audio)|trailer|1958|1969|1968|2009|yul brynner|maria schell|claire bloom|lee j\.? cobb|richard basehart|william shatner|pyryev|series|episode|where to watch|netflix|prime video|tv\b|miniseries|musical|broadway|play\b|theatre|theater|opera|anime|manga/;
const NOISE = /song|lyrics|chords|costume|tattoo|wallpaper|aesthetic|quotes|quote\b|sparknotes|cliffsnotes|essay|symbolism|pdf|epub|kindle|paperback|hardcover|cover|for sale|price|\bused\b|first edition|vintage classics paperback|amazon|game|hindi|tamil|urdu|bangla|spanish|en español|italian|portuguese|in arabic|chinese|japanese|korean|turkish|persian|farsi|deutsch|german|french|\btest\b|quiz|\bvk\b|ok ru|dailymotion|wiki\b|wikipedia|shirt|tote|mug|fanfic|fan art|drawing|illustrat|hotel|restaurant|bar\b|band|album|meme|goodreads|barnes|book review pdf|signed|leather|folio society|easton press/;
const AUDIO = /audio|narrat|audible|librivox|read by|read along|unabridged|abridged|listen/;
const SPOIL = /who killed|who is the killer|who murdered|killer|murderer|culprit|whodunit|verdict|ending|end of|does .* die|did .* kill|is .* guilty|trial|sentence|convicted|what happens to|plot twist|spoiler/;
const buckets = [
  ['Film/TV x audiobook (film terms in an audio phrasing)', { test: (s) => FILM.test(s) && AUDIO.test(s) }],
  ['Film and TV', FILM],
  ['Plot and spoilers (not answered; kept to measure demand)', SPOIL],
  ['Translation', /translat|pevear|volokhonsky|p&v|p and v|mcduff|garnett|avsey|katz|macandrew|magarshack|matlaw|komroff|katzer|penguin|oxford|vintage|norton|wordsworth|everyman|modern library|bantam|signet|which version|best version|version to read|edition/],
  ['Grand Inquisitor / Rebellion', /inquisitor|rebellion|pro and contra|book 5\b|book five|book v\b/],
  ['Zosima / Book VI', /zosima|zossima|russian monk|book 6\b|book six|book vi\b|\bskip|elder/],
  ['Best version / narrator', /best|which|narrat|who reads|read by|voice|good (as an )?audiobook|good on audiobook|worth|recommend|review|thompson|ben miles|miles\b|gregory|davidson|covell|woolf|vance|rintoul|foster|cameron|peery|pirie|lister|naxos|audible|blackstone|full cast|dramati|bbc|radio|accent|british|american/],
  ['Length / time / chapters / books', /how long|length|pages|page count|word count|words|hours|duration|time|minutes|days|weeks|how many|chapters?\b|books\b|book \d|part \d|parts\b|volume/],
  ['Names / characters', /character|names|nickname|family tree|who is who|alyosha|alexei|alexey|dmitri|dmitry|mitya|ivan|smerdyakov|grushenka|katerina|katya|fyodor|kolya|ilusha|ilyusha|rakitin|lise|hohlakov|snegiryov|grigory|brothers names|how many brothers|siblings|father/],
  ['Pronunciation', /pronoun|how to say|how do you say/],
  ['Hard to read', /hard\b|hard to|difficult|easy|beginner|boring|confus|tough|understand|slow|dense|intimidat/],
  ['Read or listen / audio vs book', /read or listen|or book|vs book|better as|audiobook or|listen or read|reading or listening/],
  ['Read along / with text', /with text|read along|read aloud|subtitles|alongside|and ebook|whispersync/],
  ['Free / where to listen', /free|youtube|librivox|archive|spotify|online|full|unabridged|abridged|audio version|audiobooks$|audio book|audio$|apple|libby|hoopla|podcast|chirp|libro/],
  ['Reading guide / how to read', /guide|schedule|plan|how to read|book club|companion|study|summary by chapter|chapter summary/],
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
console.log(`\nTOTAL grouped ${total} (film ${out['Film and TV'].length}, film x audio ${out['Film/TV x audiobook (film terms in an audio phrasing)'].length}, spoilers ${out['Plot and spoilers (not answered; kept to measure demand)'].length}), other ${rest.length}, noise ${noise.length}, all distinct ${src.size}`);
console.log('calls this run', JSON.stringify(calls));
console.log('distinct per engine', JSON.stringify(per));
fs.writeFileSync(path.join(AC, 'noise.txt'), noise.map(([s]) => s).join('\n'));
