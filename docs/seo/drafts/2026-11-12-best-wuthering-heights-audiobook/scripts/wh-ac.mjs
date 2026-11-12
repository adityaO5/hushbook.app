// Wuthering Heights phrasing sweep, 2026-11-12.
// Adapted from ../../2026-11-11-best-war-and-peace-audiobook/scripts/wp-ac.mjs (same engines, same cache format).
// node wh-ac.mjs <cache.json> <engine...>   engines: gchrome gfirefox youtube bing ddg
// Seeds cover narrator (incl. the names people search), length, free, abridged, with text / read along,
// hard to read, Joseph's dialect, the two narrators, names / family tree, BBC / radio, the 2026 film.
// Google clients also get "wuthering heights audiobook <a..z>".
// Responses are cached per engine+query in <cache.json>; rerun skips cached calls.
import fs from 'node:fs';
const [, , cacheFile, ...engines] = process.argv;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';
const T = 'wuthering heights';
export const seeds = [
  `${T} audiobook`, `best ${T} audiobook`, `best audiobook version of ${T}`, `which ${T} audiobook`, `best ${T}`,
  `${T} audiobook narrator`, `${T} audiobook best narrator`, `who narrates ${T}`, `${T} narrated by`, `${T} read by`,
  `${T} audible`, `${T} audiobook review`, `${T} audiobook reddit`, `is ${T} good on audiobook`,
  `how long is the ${T} audiobook`, `${T} audiobook length`, `how long is ${T}`, `how long to read ${T}`, `how long does it take to read ${T}`,
  `is ${T} hard to read`, `is ${T} worth reading`, `should i read or listen to ${T}`, `${T} audiobook vs book`, `${T} audiobook or book`,
  `${T} audiobook free`, `${T} librivox`, `${T} audiobook youtube`, `${T} audiobook spotify`, `${T} audiobook libby`,
  `${T} unabridged audiobook`, `${T} abridged audiobook`, `${T} abridged`,
  `${T} read along`, `${T} audiobook with text`, `${T} audiobook and ebook`,
  `${T} characters`, `${T} character list`, `${T} names`, `${T} family tree`, `${T} character map`, `${T} two catherines`,
  `${T} joseph`, `${T} joseph dialect`, `${T} dialect`, `${T} yorkshire dialect`, `${T} joseph translation`,
  `${T} narrator`, `${T} nelly`, `${T} lockwood`, `who is the narrator of ${T}`,
  `${T} bbc`, `${T} bbc radio`, `${T} radio drama`, `${T} full cast`, `${T} dramatised`,
  `${T} movie`, `${T} 2026`, `${T} before the movie`, `${T} movie tie in`, `${T} margot robbie`, `${T} jacob elordi`, `${T} book vs movie`,
  `${T} joanne froggatt`, `${T} juliet stevenson`, `${T} patricia routledge`, `${T} michael kitchen`, `${T} janet mcteer`,
  `${T} david timson`, `${T} emma messenger`, `${T} carolyn seymour`, `${T} aimee lou wood`, `${T} naxos`,
  `${T} reading guide`, `how to read ${T}`, `${T} audiobook 2026`, `${T} audiobook new`,
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
  if (eng === 'gchrome' || eng === 'gfirefox') for (const l of letters) qs.push(`${T} audiobook ${l}`);
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
