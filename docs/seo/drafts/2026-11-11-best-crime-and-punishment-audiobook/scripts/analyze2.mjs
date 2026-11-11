// node analyze2.mjs -> comparable per-title table (same 43 Google calls and 16 Bing/DDG calls per title)
import fs from 'node:fs';
const load = (f) => (fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : {});
const G = {};
for (const src of [load('ac-google.json'), load('ac-google-rev.json'), load('ac-google-mc.json')]) for (const [t, v] of Object.entries(src)) { G[t] ||= {}; for (const [k, x] of Object.entries(v)) if (!G[t][k]) G[t][k] = x; }
const B = load('ac-bing.json'), D = load('ac-ddg.json');
const alias = {
  'les miserables': /les mis/, 'war and peace': /war and peace/, 'moby dick': /moby/, 'anna karenina': /karenina/,
  'don quixote': /quixote|quijote/, 'crime and punishment': /crime and punishment/, 'the brothers karamazov': /karamazov/,
  middlemarch: /middlemarch/, dracula: /dracula/, frankenstein: /frankenstein/, 'pride and prejudice': /pride and prejudice/,
  'the odyssey': /odyssey/, 'the iliad': /iliad/, 'sherlock holmes': /sherlock|holmes/, 'jane eyre': /jane eyre/,
  'the great gatsby': /gatsby/, 'great expectations': /great expectations/, 'wuthering heights': /wuthering/,
  'little women': /little women/, 'a tale of two cities': /two cities/, 'the three musketeers': /musketeers/,
  'the picture of dorian gray': /dorian/, 'dantes inferno': /inferno|dante/, 'the divine comedy': /divine comedy|dante/,
  ulysses: /ulysses/, 'meditations marcus aurelius': /meditations|aurelius/, 'the art of war': /art of war/,
  'east of eden': /east of eden/, 'project hail mary': /hail mary/, 'jekyll and hyde': /jekyll|hyde/, emma: /\bemma\b/,
  'the hound of the baskervilles': /baskerville/, 'heart of darkness': /heart of darkness/, 'the aeneid': /aeneid/,
  'paradise lost': /paradise lost/, 'the scarlet letter': /scarlet letter/, 'bleak house': /bleak house/,
  'david copperfield': /copperfield/, 'jane austen': /austen/, 'the count of monte cristo': /monte cristo/,
};
// audiobook-decision intent: audio words, or decision words (best/version/translation/length/hard/narrator)
const AD = /audio ?book|audible|narrat|librivox|listen|unabridged|abridged|read by|read along|read aloud|translat|best version|best edition|how long|length|hours|hard to read|difficult|tough read|easy to read|worth reading|reading time|time to read/;
const NOISE = /movie|film|musical|song|lyrics|cast\b|broadway|quotes|costume|game|dbd|tokyo|ado\b|\bvk\b|hindi|tamil|summary|recap|episode/;
const rows = [];
for (const [t, re] of Object.entries(alias)) {
  const gt = G[t]; if (!gt) continue;
  const g = new Map();
  for (const v of Object.values(gt)) for (const x of v.r) { const s = x.s.toLowerCase(); if (re.test(s)) g.set(s, Math.max(g.get(s) || 0, x.rel || 0)); }
  const ad = [...g.entries()].filter(([s]) => AD.test(s) && !NOISE.test(s));
  const bd = new Set();
  for (const src of [B[t], D[t]]) for (const v of Object.values(src || {})) for (const x of v.r) { const s = x.s.toLowerCase(); if (re.test(s) && AD.test(s) && !NOISE.test(s)) bd.add(s); }
  rows.push({
    t, gAll: g.size, gAd: ad.length, top: ad.filter(([, r]) => r >= 1250).length, mid: ad.filter(([, r]) => r >= 800).length,
    trans: ad.filter(([s]) => /translat/.test(s)).length, hard: ad.filter(([s]) => /hard|difficult|tough|easy to read/.test(s)).length,
    len: ad.filter(([s]) => /how long|length|hours|duration|reading time|time to read/.test(s)).length,
    best: ad.filter(([s]) => /best|which|version|narrator/.test(s)).length, bd: bd.size,
    topList: ad.filter(([, r]) => r >= 1250).map(([s]) => s.replace(re, '~')).join(' | '),
  });
}
rows.sort((a, b) => b.gAd - a.gAd);
console.log('| Title | Google on-topic | Google audiobook-decision | rel>=1250 | rel>=800 | best/which/narrator | translation | length | hard | Bing+DDG audiobook-decision |');
console.log('|---|---|---|---|---|---|---|---|---|---|');
for (const r of rows) console.log(`| ${r.t} | ${r.gAll} | ${r.gAd} | ${r.top} | ${r.mid} | ${r.best} | ${r.trans} | ${r.len} | ${r.hard} | ${r.bd} |`);
console.log('\nTop completions (rel >= 1250, audiobook-decision only):');
for (const r of rows.filter((r) => r.top)) console.log(`- ${r.t}: ${r.topList}`);
fs.writeFileSync('table2.json', JSON.stringify(rows, null, 1));
