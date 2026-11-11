// Group every Crime and Punishment phrasing (today's Google chrome + Bing + DDG, plus yesterday's Google firefox lane) into H2/FAQ buckets.
import fs from 'node:fs';
const load = (f) => (fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : {});
const T = 'crime and punishment';
const re = /crime and punishment/;
const src = new Map(); // phrase -> {rel, eng:Set}
const add = (s, eng, rel = 0) => { s = s.toLowerCase().trim(); if (!re.test(s)) return; const p = src.get(s) || { rel: 0, eng: new Set() }; p.rel = Math.max(p.rel, rel || 0); p.eng.add(eng); src.set(s, p); };
for (const v of Object.values(load('ac-google.json')[T] || {})) for (const x of v.r) add(x.s, 'G', x.rel);
for (const v of Object.values(load('ac-bing.json')[T] || {})) for (const x of v.r) add(x.s, 'B');
for (const v of Object.values(load('ac-ddg.json')[T] || {})) for (const x of v.r) add(x.s, 'D');
const y = load('C:/Users/rakes/AppData/Local/Temp/claude/34842c9e8e99357b/79be317d-7c26-4857-84db-69018ba4c3a5/scratchpad/lane-books/ac-gff.json')[T] || {};
for (const v of Object.values(y)) for (const x of v.gff || []) add(x.s, 'F');
const NOISE = /\bado\b|lyrics|\bvk\b|hindi|tamil|bangla|india|movie|film|adaptation|quotes|summary|summaries|analysis|economic|near me|\bart\b|date\b|cover|explained|comedy|christian|age rating|publisher|textbook|calculator|jobs|series|in one sitting|lexile|grade level|reading level|book rating|reading notes|\bpdf\b|chapter \d|part \d/;
const buckets = [
  ['Best version / narrator', /best|which|version|narrat|who reads|voice|good (as an )?audiobook|good on audiobook|worth it|recommend|review/],
  ['Translation', /translat|garnett|pevear|volokhonsky|p&v|mcduff|ready|katz|monas|slater|cockrell|penguin|vintage|signet|oxford|new translation/],
  ['Length / time', /how long|length|hours|duration|time|minutes/],
  ['Hard to read / difficulty', /hard|difficult|easy|beginner|too hard/],
  ['Read or listen / audio vs book', /read or listen|or book|vs book|better as|audiobook or|or the idiot|or brothers/],
  ['Read along / with text', /with text|read along|read aloud|subtitles|alongside/],
  ['Free / where to listen', /free|youtube|librivox|internet archive|spotify|audible|amazon|online|full|unabridged|abridged|audio version|audiobooks$/],
];
const out = {}; const used = new Set();
for (const [name, b] of buckets) {
  out[name] = [...src.entries()].filter(([s]) => !NOISE.test(s) && !used.has(s) && b.test(s)).sort((a, b) => b[1].rel - a[1].rel);
  out[name].forEach(([s]) => used.add(s));
}
const rest = [...src.entries()].filter(([s]) => !NOISE.test(s) && !used.has(s));
let total = 0;
for (const [name, l] of Object.entries(out)) {
  total += l.length;
  console.log(`\n### ${name} (${l.length})\n`);
  console.log(l.map(([s, p]) => `${s}${p.rel >= 1250 ? ' **[' + p.rel + ']**' : ''} (${[...p.eng].sort().join('')})`).join('; '));
}
console.log(`\n### Other on-topic (${rest.length})\n`);
console.log(rest.map(([s, p]) => `${s} (${[...p.eng].sort().join('')})`).join('; '));
console.log(`\nTOTAL grouped ${total}, other ${rest.length}, all distinct incl. noise ${src.size}`);
