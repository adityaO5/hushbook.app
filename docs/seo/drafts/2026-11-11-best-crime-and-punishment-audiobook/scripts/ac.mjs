// Book-lane autocomplete sweep, 2026-11-11.
// node ac.mjs <out.json> <engine>   (engine = google | bing | ddg)
// google: "<t> audiobook" + " a".." z" plus decision shapes; bing/ddg: decision shapes only.
import fs from 'node:fs';
const [, , outFile, engine] = process.argv;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';

export const titles = [
  'les miserables', 'war and peace', 'moby dick', 'anna karenina', 'don quixote', 'crime and punishment',
  'the brothers karamazov', 'middlemarch', 'dracula', 'frankenstein', 'pride and prejudice', 'the odyssey',
  'the iliad', 'sherlock holmes', 'jane eyre', 'the great gatsby', 'great expectations', 'wuthering heights',
  'little women', 'a tale of two cities', 'the three musketeers', 'the picture of dorian gray', 'dantes inferno',
  'the divine comedy', 'ulysses', 'meditations marcus aurelius', 'the art of war', 'east of eden',
  'project hail mary', 'jekyll and hyde', 'emma', 'the hound of the baskervilles', 'heart of darkness',
  'the aeneid', 'paradise lost', 'the scarlet letter', 'bleak house', 'david copperfield', 'jane austen',
];
export const shapes = {
  prefix_a: (t) => `${t} a`,
  prefix_best: (t) => `best ${t}`,
  best_ab: (t) => `best ${t} audiobook`,
  best_version: (t) => `best audiobook version of ${t}`,
  narrator: (t) => `${t} audiobook narrator`,
  best_translation: (t) => `best translation of ${t}`,
  translation_ab: (t) => `${t} translation audiobook`,
  how_long: (t) => `how long is the ${t} audiobook`,
  hard: (t) => `is ${t} hard to read`,
  read_or_listen: (t) => `should i read or listen to ${t}`,
  ab_free: (t) => `${t} audiobook free`,
  unabridged: (t) => `${t} unabridged audiobook`,
  vs_book: (t) => `${t} audiobook vs book`,
  which_ab: (t) => `which ${t} audiobook`,
  reddit: (t) => `${t} audiobook reddit`,
  read_along: (t) => `${t} read along`,
};
const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

const FETCH = {
  google: async (q) => {
    const r = await fetch(`https://suggestqueries.google.com/complete/search?client=chrome&hl=en&gl=us&q=${encodeURIComponent(q)}`, { headers: { 'User-Agent': UA } });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const j = JSON.parse(Buffer.from(await r.arrayBuffer()).toString('latin1'));
    const rel = j[4]?.['google:suggestrelevance'] || [];
    const typ = j[4]?.['google:suggesttype'] || [];
    return j[1].map((s, i) => ({ s, rel: rel[i], type: typ[i] })).filter((x) => x.type !== 'NAVIGATION');
  },
  bing: async (q) => {
    const r = await fetch(`https://api.bing.com/osjson.aspx?market=en-US&query=${encodeURIComponent(q)}`, { headers: { 'User-Agent': UA } });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const j = await r.json();
    return j[1].map((s) => ({ s }));
  },
  ddg: async (q) => {
    const r = await fetch(`https://duckduckgo.com/ac/?kl=us-en&q=${encodeURIComponent(q)}`, { headers: { 'User-Agent': UA } });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const j = await r.json();
    return j.map((x) => ({ s: x.phrase }));
  },
};
const DELAY = { google: 350, bing: 250, ddg: 250 };

if (process.argv[1].endsWith('ac.mjs')) {
  let out = fs.existsSync(outFile) ? JSON.parse(fs.readFileSync(outFile, 'utf8')) : {};
  let fails = 0;
  const get = async (q) => {
    for (let a = 0; a < 3; a++) {
      try { const r = await FETCH[engine](q); fails = 0; return r; }
      catch (e) { fails++; console.error(engine, 'fail', q, e.message); await sleep(8000 * (a + 1)); }
    }
    return null;
  };
  const order = process.env.TITLES ? process.env.TITLES.split(',') : process.env.REVERSE ? [...titles].reverse().slice(0, 18) : titles;
  for (const t of order) {
    out[t] ||= {};
    const qs = Object.entries(shapes).map(([k, mk]) => [k, mk(t)]);
    if (engine === 'google') {
      qs.push(['ab', `${t} audiobook`]);
      for (const l of letters) qs.push([`ab_${l}`, `${t} audiobook ${l}`]);
    }
    for (const [k, q] of qs) {
      if (out[t][k]) continue;
      const r = await get(q);
      if (r) out[t][k] = { q, r };
      if (fails >= 6) { console.error('too many fails, stopping'); fs.writeFileSync(outFile, JSON.stringify(out)); process.exit(1); }
      await sleep(DELAY[engine]);
    }
    fs.writeFileSync(outFile, JSON.stringify(out));
    console.error('done', engine, t);
  }
}
