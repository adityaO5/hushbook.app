// node dump.mjs "<title>" "<alias regex>"  -> every on-topic suggestion, per engine, deduped, with Google relevance
import fs from 'node:fs';
const [, , t, aliasRe] = process.argv;
const re = new RegExp(aliasRe);
const load = (f) => (fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : {});
const G = { ...load('ac-google.json')[t], ...load('ac-google-rev.json')[t], ...load('ac-google-mc.json')[t] };
const B = load('ac-bing.json')[t] || {}, D = load('ac-ddg.json')[t] || {};
const g = new Map();
for (const [k, v] of Object.entries(G)) for (const x of v.r) { const s = x.s.toLowerCase(); if (!re.test(s)) continue; const p = g.get(s); if (!p || (x.rel || 0) > p.rel) g.set(s, { rel: x.rel || 0, k }); }
const bd = new Map();
for (const [src, o] of [['B', B], ['D', D]]) for (const [k, v] of Object.entries(o)) for (const x of v.r) { const s = x.s.toLowerCase(); if (!re.test(s)) continue; bd.set(s, (bd.get(s) || '') + src); }
const rows = [...g.entries()].sort((a, b) => b[1].rel - a[1].rel);
console.log(`# ${t}: Google ${g.size} on-topic suggestions; Bing+DDG ${bd.size}; in both ${[...bd.keys()].filter((s) => g.has(s)).length}`);
for (const [s, v] of rows) console.log(`G ${String(v.rel).padStart(4)} ${bd.has(s) ? '[' + bd.get(s) + ']' : '    '} ${s}`);
for (const [s, v] of bd) if (!g.has(s)) console.log(`  BD   [${v}] ${s}`);
