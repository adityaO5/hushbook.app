// The Brothers Karamazov phrasing sweep, 2026-11-14.
// Copied from ../../2026-11-13-best-jane-eyre-audiobook/scripts/je-ac.mjs (parents: WH wh-ac.mjs, W&P wp-ac.mjs);
// same engines, same cache format; seeds changed for The Brothers Karamazov (two stems: "brothers karamazov" and
// "the brothers karamazov"; every narrator in the Audible catalogue sweep, every English translator, the Grand Inquisitor,
// Zosima / Book VI, names and nicknames, pronunciation, length, free, hard to read, read along, BBC / radio / film).
// Google clients also get "brothers karamazov audiobook <a..z>" and "the brothers karamazov audiobook <a..z>".
// node bk-ac.mjs <cache.json> <engine...>   engines: gchrome gfirefox youtube bing ddg
import fs from 'node:fs';
const [, , cacheFile, ...engines] = process.argv;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';
const T = 'brothers karamazov';
const TT = 'the brothers karamazov';
export const seeds = [
  `${T} audiobook`, `${TT} audiobook`, `best ${T} audiobook`, `best ${TT} audiobook`, `best audiobook version of ${TT}`, `which ${T} audiobook`, `best ${T}`,
  `${T} audiobook narrator`, `${T} audiobook best narrator`, `who narrates ${TT}`, `${T} narrated by`, `${T} read by`,
  `${T} audible`, `${T} audiobook review`, `${T} audiobook reddit`, `is ${T} good on audiobook`, `${T} audiobook translation`,
  `${T} translation`, `best translation of ${TT}`, `${T} which translation`, `${T} translation reddit`, `${T} translation comparison`,
  `${T} pevear`, `${T} pevear volokhonsky audiobook`, `${T} mcduff`, `${T} mcduff audiobook`, `${T} garnett`, `${T} garnett audiobook`,
  `${T} avsey`, `${T} katz`, `${T} macandrew`, `${T} magarshack`, `${T} new translation`,
  `${T} luke thompson`, `${T} ben miles`, `${T} constantine gregory`, `${T} frederick davidson`, `${T} walter covell`, `${T} gabriel woolf`,
  `${T} simon vance`, `${T} david rintoul`, `${T} james anderson foster`, `${T} naxos`, `${T} penguin audiobook`, `${T} blackstone`,
  `how long is ${TT} audiobook`, `${T} audiobook length`, `how long is ${TT}`, `how long to read ${TT}`, `how long does it take to read ${TT}`,
  `${T} how many pages`, `${T} chapters`, `how many chapters in ${TT}`, `${T} books`, `${T} parts`, `${T} word count`, `${T} audiobook part 1`, `${T} audiobook chapter 1`, `${T} book 5`,
  `is ${TT} hard to read`, `is ${TT} worth reading`, `is ${TT} boring`, `${T} for beginners`, `should i read or listen to ${TT}`, `${T} audiobook vs book`, `${T} audiobook or book`,
  `${T} audiobook free`, `${T} librivox`, `${T} audiobook youtube`, `${T} audiobook spotify`, `${T} audiobook libby`,
  `${T} unabridged audiobook`, `${T} abridged audiobook`, `${T} abridged`,
  `${T} read along`, `${T} audiobook with text`, `${T} audiobook and ebook`, `${T} read aloud`,
  `${T} characters`, `${T} character list`, `${T} names`, `${T} character map`, `${T} family tree`, `${T} nicknames`, `${T} russian names`, `${T} who is who`,
  `${T} alyosha`, `${T} dmitri`, `${T} mitya`, `${T} ivan`, `${T} smerdyakov`, `${T} grushenka`, `${T} katerina`, `${T} zosima`, `${T} fyodor`,
  `how to pronounce karamazov`, `karamazov pronunciation`, `how to pronounce alyosha`, `how to pronounce ${TT}`, `how to pronounce dostoevsky`,
  `grand inquisitor`, `the grand inquisitor audiobook`, `grand inquisitor chapter`, `grand inquisitor ${T}`, `where is the grand inquisitor in ${TT}`, `how long is the grand inquisitor`,
  `${T} zosima chapter`, `${T} skip`, `${T} book 6`, `${T} russian monk`, `${T} rebellion chapter`,
  `${T} bbc`, `${T} bbc radio`, `${T} radio drama`, `${T} full cast`, `${T} dramatized`, `${T} movie`,
  `${T} reading guide`, `how to read ${TT}`, `${T} reading schedule`, `${T} study guide`, `${T} audiobook 2026`, `${T} audiobook new`,
];
const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
const gsuggest = (client) => async (q) => {
  const r = await fetch(`https://suggestqueries.google.com/complete/search?client=${client}&hl=en&gl=us&q=${encodeURIComponent(q)}`, { headers: { 'User-Agent': UA } });
  if (!r.ok) throw new Error('HTTP ' + r.status);
  const txt = Buffer.from(await r.arrayBuffer()).toString('latin1');
  const j = JSON.parse(txt);
  const rel = j[4]?.['google:suggestrelevance'] || [];
  const typ = j[4]?.['google:suggesttype'] || [];
  return j[1].map((s, i) => ({ s, rel: rel[i], type: typ[i] })).filter((x) => x.type !== 'NAVIGATION');
};
const FETCH = {
  gchrome: gsuggest('chrome'),
  gfirefox: gsuggest('firefox'),
  youtube: async (q) => {
    const r = await fetch(`https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&hl=en&gl=us&q=${encodeURIComponent(q)}`, { headers: { 'User-Agent': UA } });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const j = JSON.parse(Buffer.from(await r.arrayBuffer()).toString('latin1'));
    return j[1].map((s) => ({ s }));
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
const DELAY = { gchrome: 350, gfirefox: 350, youtube: 350, bing: 250, ddg: 300 };
const cache = fs.existsSync(cacheFile) ? JSON.parse(fs.readFileSync(cacheFile, 'utf8')) : {};
for (const eng of engines) {
  cache[eng] ||= {};
  const qs = [...seeds];
  if (eng === 'gchrome' || eng === 'gfirefox') for (const l of letters) qs.push(`${T} audiobook ${l}`, `${TT} audiobook ${l}`);
  let calls = 0, fails = 0;
  for (const q of qs) {
    if (cache[eng][q]) continue;
    let res = null;
    for (let a = 0; a < 3 && !res; a++) {
      try { res = await FETCH[eng](q); } catch (e) { fails++; console.error(eng, 'fail', q, e.message); await sleep(5000 * (a + 1)); }
    }
    if (res) cache[eng][q] = res;
    calls++;
    await sleep(DELAY[eng]);
  }
  fs.writeFileSync(cacheFile, JSON.stringify(cache));
  console.error(`done ${eng}: ${calls} new calls, ${fails} failures, ${Object.keys(cache[eng]).length} cached queries`);
}
