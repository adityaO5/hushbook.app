#!/usr/bin/env node
// Keyword scout for hushbook.app blog topics.
//
//   node tools/seo/keyword-scout.mjs --seeds "audiobook,audiobooks" --out docs/seo/keyword-research-2026-11-07
//
// Signals: autocomplete (Google firefox + chrome, YouTube, Bing, DuckDuckGo), Reddit,
// Search Console CSVs, a live SERP probe in headed Chrome, optional vidIQ numbers.
// Writes <out>.md (report) and a raw JSON with every signal outside the repo
// (default ~/hushbook-seo/keyword-scout/<date>/signals.json) so GSC rows stay out of git.
// Every source fails soft: the report says which ones worked. Run with --help for flags.
// Scoring and caveats: tools/seo/README.md. Topic lists: tools/seo/keyword-scout.config.mjs.

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import * as cfg from './keyword-scout.config.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, '..', '..');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36';
const UA_FF = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0';

const HELP = `keyword-scout: rank blog topics for hushbook.app

Required
  --seeds "a,b,c"         comma-separated seeds (or --seeds-file <path>, one per line)
  --out <prefix>          report path without extension, e.g. docs/seo/keyword-research-2026-11-07

Common
  --gsc-dir <dir>         Search Console export (default: newest ~/hushbook-seo/gsc/<date>/ with queries.csv)
  --gsc-seeds <n>         add the top n uncovered GSC queries as seeds (default 6, 0 = off)
  --gsc-only              print the GSC gap list and exit (no network)
  --raw-dir <dir>         raw JSON + cache root (default ~/hushbook-seo/keyword-scout)
  --date YYYY-MM-DD       run date (default: today)

Autocomplete
  --engines <list>        google-firefox,google-chrome,youtube,bing,ddg (default: all)
  --hl en --gl us         language and country for Google and YouTube
  --delay <ms>            gap between calls to the same host (default 150)
  --l2 <n>                second-level expansion on the top n first-level phrases (default 25, 0 = off)
  --max-calls <n>         hard cap on autocomplete calls (default 9000)

Reddit, SERP, extras
  --reddit <n>            shortlist size for Reddit demand, global search (default 25, 0 = off)
  --reddit-sub <n>        also search r/audiobooks for the top n of those (default 10)
  --serp <n>              shortlist size for the browser SERP probe (default 30, 0 = off)
  --serp-engines <list>   google,ddg (default). brave is added when Google blocks.
  --serp-delay <ms>       wait between queries on one engine (default 9000)
  --allintitle <n>        allintitle:"phrase" counts for the top n (Google only, default 10)
  --headless              run the browser headless (Google blocks this almost always)
  --youtube-demand <json> merge vidIQ numbers: {"phrase": {"volume": n, "competition": n}}
  --top <n> --detail <n>  rows in the ranked table (15) and deep-dive sections (5)
  --fresh                 ignore cached responses (cache TTL: 3 days autocomplete/Reddit, 7 days SERP)
  --include-rejected      keep rejected topics in the ranked table
  --help
`;

// ---------------------------------------------------------------- args
function parseArgs(argv) {
  const a = { engines: 'google-firefox,google-chrome,youtube,bing,ddg', hl: 'en', gl: 'us', delay: 150, l2: 25, maxCalls: 9000, reddit: 25, redditSub: 10, serp: 30, serpEngines: 'google,ddg', serpDelay: 9000, allintitle: 10, top: 15, detail: 5, gscSeeds: 6 };
  const map = { 'seeds-file': 'seedsFile', 'gsc-dir': 'gscDir', 'gsc-seeds': 'gscSeeds', 'gsc-only': 'gscOnly', 'raw-dir': 'rawDir', 'max-calls': 'maxCalls', 'serp-engines': 'serpEngines', 'serp-delay': 'serpDelay', 'youtube-demand': 'youtubeDemand', 'include-rejected': 'includeRejected', 'reddit-sub': 'redditSub' };
  const bools = new Set(['gscOnly', 'headless', 'fresh', 'includeRejected', 'help']);
  for (let i = 0; i < argv.length; i++) {
    const raw = argv[i];
    if (!raw.startsWith('--')) continue;
    let [k, v] = raw.slice(2).split(/=(.*)/s);
    k = map[k] || k;
    if (bools.has(k)) { a[k] = true; continue; }
    if (v === undefined) v = argv[++i];
    a[k] = /^\d+$/.test(v) ? Number(v) : v;
  }
  return a;
}

// ---------------------------------------------------------------- text utils
const STOP = new Set(('a an the to of in on for with without and or vs versus like is are was were be been being do does did done can could should would will shall may might must how what why when where which who whom whose that this these those there here it its i im me my mine you your yours we our us they their them he she his her at by from into onto about as if so than then too very just not no yes any some all more most much many also get got gets go going goes make makes way ways use using used have has had am out up down over under best top good better great really actually theres whats its cant dont doesnt isnt arent wont anyone someone something anything reddit near one ones thing things need want online meaning mean means definition define explained while anymore still even ever always suddenly 2023 2024 2025 2026 2027 vs. etc').split(' '));
const GENERIC = new Set(['audiobook', 'audio', 'book', 'app', 'application']);
const ING = { reading: 'read', listening: 'listen', learning: 'learn', falling: 'fall', taking: 'take', finishing: 'finish' };
const QWORDS = ['how', 'what', 'why', 'can', 'does', 'is', 'are', 'should', 'which', 'best', 'when', 'where'];
const MODS = ['for', 'with', 'without', 'vs', 'like', 'or', 'app', 'apps', 'free'];
const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('');

function norm(s) {
  return String(s).toLowerCase().replace(/[‘’ʼ]/g, "'").replace(/\baudio[ -]books?\b/g, (m) => (m.endsWith('s') ? 'audiobooks' : 'audiobook')).replace(/[^a-z0-9'.+ ]+/g, ' ').replace(/'/g, '').replace(/\b(can|don|won|isn|doesn|didn|aren|wasn|couldn|shouldn|wouldn|haven) t\b/g, '$1t').replace(/\s+/g, ' ').trim();
}
function stem(t) {
  if (ING[t]) return ING[t];
  if (t.length > 4 && t.endsWith('ies')) return t.slice(0, -3) + 'y';
  if (t.length > 3 && t.endsWith('s') && !/(ss|us|is|ous)$/.test(t)) return t.slice(0, -1);
  return t;
}
const tokens = (s) => norm(s).split(' ').filter(Boolean);
const contentTokens = (s) => [...new Set(tokens(s).filter((t) => !STOP.has(t) && !/^\d{4}$/.test(t)).map(stem))];
const topicKey = (s) => contentTokens(s).filter((t) => !GENERIC.has(t)).sort();
function jaccard(a, b) {
  if (!a.length && !b.length) return 1;
  const B = new Set(b);
  const inter = a.filter((x) => B.has(x)).length;
  return inter / (a.length + b.length - inter);
}
const subset = (a, b) => a.length > 0 && a.every((x) => b.includes(x));
const isQuestion = (p) => /^(how|what|why|can|could|does|do|is|are|should|which|when|where|who|will|would|best|top)\b/.test(p) || /\b(is there|are there|app that|app to|apps that|which app|recommend)\b/.test(p);
const clamp01 = (x) => Math.max(0, Math.min(1, x));
const log10 = (x) => Math.log10(Math.max(0, x) + 1);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const sha1 = (s) => crypto.createHash('sha1').update(s).digest('hex');
const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
const log = (...m) => process.stderr.write(m.join(' ') + '\n');
const decodeEntities = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'").replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n))).replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)));
const noDash = (s) => String(s ?? '').replace(/[\u2013\u2014]/g, '-');
const cell = (s) => noDash(s).replace(/\|/g, '/').replace(/\n+/g, ' ');

function fitOf(phrase) {
  const p = norm(phrase);
  if (cfg.offFit.test(p)) return { score: 0, cats: [], offFit: true };
  const hits = cfg.fit.filter((c) => c.re.test(p)).sort((x, y) => y.weight - x.weight);
  if (!hits.length) return { score: 0, cats: [], offFit: false };
  const score = Math.min(100, hits[0].weight + hits.slice(1).reduce((s, c) => s + c.weight / 2, 0));
  return { score, cats: hits.map((c) => c.id), offFit: false };
}
const rejectedOf = (phrase) => cfg.rejected.find((r) => r.re.test(norm(phrase))) || null;

// ---------------------------------------------------------------- http + cache
const stats = {};
function stat(src) { return (stats[src] ||= { calls: 0, ok: 0, cached: 0, failed: 0, empty: 0, notes: [] }); }
function note(src, msg) { const s = stat(src); if (!s.notes.includes(msg)) s.notes.push(msg); log(`[${src}] ${msg}`); }

let CACHE_DIR = '';
let FRESH = false;
function cacheGet(src, key, ttlH) {
  if (FRESH) return null;
  const f = path.join(CACHE_DIR, src, key.slice(0, 2), key + '.json');
  try {
    const st = fs.statSync(f);
    if (Date.now() - st.mtimeMs > ttlH * 3600e3) return null;
    return JSON.parse(fs.readFileSync(f, 'utf8'));
  } catch { return null; }
}
function cachePut(src, key, val) {
  const f = path.join(CACHE_DIR, src, key.slice(0, 2), key + '.json');
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, JSON.stringify(val));
}

function makeLimiter(gapMs, concurrency = 1) {
  let last = 0; let active = 0; const waiting = [];
  return async function run(fn) {
    while (active >= concurrency) await new Promise((r) => waiting.push(r));
    active++;
    const wait = Math.max(0, last + gapMs - Date.now());
    last = Date.now() + wait;
    if (wait) await sleep(wait);
    try { return await fn(); } finally { active--; const next = waiting.shift(); if (next) next(); }
  };
}

async function httpGet(url, { src, ttlH = 72, headers = {}, timeoutMs = 20000, limiter, skip } = {}) {
  const s = stat(src);
  const key = sha1(url);
  const hit = cacheGet(src, key, ttlH);
  if (hit) { s.cached++; return { ...hit, cached: true }; }
  const doFetch = async () => {
    if (skip && skip()) return { status: -1, text: '', headers: {}, skipped: true };
    s.calls++;
    try {
      const res = await fetch(url, { headers: { 'user-agent': UA, 'accept-language': 'en-US,en;q=0.9', ...headers }, signal: AbortSignal.timeout(timeoutMs), redirect: 'follow' });
      const text = await res.text();
      const h = {};
      for (const k of ['x-ratelimit-remaining', 'x-ratelimit-reset', 'retry-after', 'content-type']) if (res.headers.get(k)) h[k] = res.headers.get(k);
      const out = { status: res.status, text, headers: h };
      if (res.ok) { s.ok++; cachePut(src, key, out); } else s.failed++;
      return out;
    } catch (e) {
      s.failed++;
      return { status: 0, text: '', headers: {}, error: String(e.message || e) };
    }
  };
  return limiter ? limiter(doFetch) : doFetch();
}

// ---------------------------------------------------------------- autocomplete
function engineDefs(hl, gl) {
  const e = encodeURIComponent;
  return {
    'google-firefox': { host: 'google', url: (q) => `https://suggestqueries.google.com/complete/search?client=firefox&hl=${hl}&gl=${gl}&q=${e(q)}`, parse: (t) => JSON.parse(t)[1].map((p, i) => ({ phrase: p, rank: i + 1 })) },
    'google-chrome': {
      host: 'google', url: (q) => `https://suggestqueries.google.com/complete/search?client=chrome&hl=${hl}&gl=${gl}&q=${e(q)}`,
      parse: (t) => { const j = JSON.parse(t); const m = j[4] || {}; return j[1].map((p, i) => ({ phrase: p, rank: i + 1, rel: m['google:suggestrelevance']?.[i] ?? null, type: m['google:suggesttype']?.[i] })).filter((x) => !x.type || x.type === 'QUERY'); },
    },
    youtube: { host: 'google', url: (q) => `https://suggestqueries.google.com/complete/search?client=youtube&ds=yt&hl=${hl}&gl=${gl}&q=${e(q)}`, parse: (t) => { const m = t.match(/\((\[[\s\S]*\])\)\s*;?\s*$/); return JSON.parse(m ? m[1] : t)[1].map((x, i) => ({ phrase: Array.isArray(x) ? x[0] : x, rank: i + 1 })); } },
    bing: { host: 'bing', url: (q) => `https://api.bing.com/osjson.aspx?query=${e(q)}&mkt=${hl}-${gl.toUpperCase()}`, parse: (t) => JSON.parse(t)[1].map((p, i) => ({ phrase: p, rank: i + 1 })) },
    ddg: { host: 'ddg', url: (q) => `https://duckduckgo.com/ac/?q=${e(q)}&type=list&kl=${gl}-${hl}`, parse: (t) => JSON.parse(t)[1].map((p, i) => ({ phrase: p, rank: i + 1 })) },
  };
}

function expansions(seed) {
  const s = norm(seed);
  const out = [s];
  for (const q of QWORDS) if (!s.startsWith(q + ' ')) out.push(`${q} ${s}`);
  for (const m of MODS) if (!s.split(' ').includes(m)) out.push(`${s} ${m}`);
  for (const l of LETTERS) out.push(`${s} ${l}`);
  return out;
}

async function runAutocomplete(queries, ctx) {
  const { engines, defs, delay, maxCalls, raw, phrases } = ctx;
  const limiters = { google: makeLimiter(delay, 2), bing: makeLimiter(delay, 2), ddg: makeLimiter(delay, 2) };
  const failStreak = {}; const disabled = new Set();
  let done = 0;
  if (ctx.left == null) ctx.left = maxCalls;
  const total = queries.length * engines.length;
  const tasks = [];
  for (const eng of engines) {
    const d = defs[eng];
    raw[eng] ||= {};
    for (const qq of queries) {
      tasks.push((async () => {
        const skip = () => {
          if (disabled.has(eng)) return true;
          if (ctx.left <= 0) { note('autocomplete', 'max-calls cap reached; remaining queries skipped'); return true; }
          ctx.left--;
          return false;
        };
        const r = await httpGet(d.url(qq.q), { src: 'ac-' + eng, ttlH: 72, limiter: limiters[d.host], skip });
        if (r.skipped) return;
        done++;
        if (done % 400 === 0) log(`  autocomplete ${done}/${total}`);
        let list = null;
        if (r.status === 200) { try { list = d.parse(r.text); } catch { list = null; } }
        if (!list) {
          failStreak[eng] = (failStreak[eng] || 0) + 1;
          if (failStreak[eng] >= 8 && !disabled.has(eng)) { disabled.add(eng); note('ac-' + eng, `disabled after 8 consecutive failures (last HTTP ${r.status}${r.error ? ' ' + r.error : ''})`); }
          return;
        }
        failStreak[eng] = 0;
        if (!list.length) stat('ac-' + eng).empty++;
        raw[eng][qq.q] = list.map((x) => x.phrase);
        for (const x of list) {
          const p = norm(x.phrase);
          if (!p || p.split(' ').length > 14) continue;
          const rec = phrases.get(p) || { phrase: p, engines: {}, rel: null, hits: 0, queries: new Set(), seeds: new Set(), level: qq.level };
          rec.engines[eng] = Math.min(rec.engines[eng] || 99, x.rank);
          if (x.rel != null) rec.rel = Math.max(rec.rel ?? 0, x.rel);
          if (!rec.queries.has(qq.q)) { rec.queries.add(qq.q); rec.hits++; }
          rec.seeds.add(qq.seed);
          rec.level = Math.min(rec.level, qq.level);
          phrases.set(p, rec);
        }
      })());
    }
  }
  await Promise.all(tasks);
}

// ---------------------------------------------------------------- csv + gsc
function parseCsv(text) {
  const rows = []; let row = []; let f = ''; let q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"') { if (text[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c; continue; }
    if (c === '"') q = true; else if (c === ',') { row.push(f); f = ''; } else if (c === '\n') { row.push(f); rows.push(row); row = []; f = ''; } else if (c !== '\r') f += c;
  }
  if (f || row.length) { row.push(f); rows.push(row); }
  const [head, ...body] = rows.filter((r) => r.length > 1);
  if (!head) return [];
  head[0] = head[0].replace(/^﻿/, '');
  return body.map((r) => Object.fromEntries(head.map((h, i) => [h, r[i]])));
}
function newestGscDir() {
  const root = path.join(os.homedir(), 'hushbook-seo', 'gsc');
  try {
    return fs.readdirSync(root).filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d) && fs.existsSync(path.join(root, d, 'queries.csv'))).sort().map((d) => path.join(root, d)).pop() || null;
  } catch { return null; }
}
function loadGsc(dir) {
  if (!dir || !fs.existsSync(path.join(dir, 'queries.csv'))) { note('gsc', `no queries.csv in ${dir}`); return null; }
  const read = (f) => (fs.existsSync(path.join(dir, f)) ? parseCsv(fs.readFileSync(path.join(dir, f), 'utf8')) : []);
  const num = (r) => ({ ...r, clicks: Number(r.clicks), impressions: Number(r.impressions), position: Number(r.position) });
  const queries = read('queries.csv').map(num);
  const qp = read('queries_pages.csv').map(num);
  const dates = read('dates.csv');
  const byQuery = new Map();
  for (const r of qp) { const k = norm(r.query); if (!byQuery.has(k)) byQuery.set(k, []); byQuery.get(k).push(r); }
  const qs = queries.map((r) => ({ ...r, n: norm(r.query), key: topicKey(r.query), pages: byQuery.get(norm(r.query)) || [] }));
  stat('gsc').ok = 1;
  return { dir, queries: qs, window: dates.length ? `${dates[0].date} to ${dates[dates.length - 1].date}` : 'unknown', totalImpr: queries.reduce((s, r) => s + r.impressions, 0) };
}

// ---------------------------------------------------------------- site coverage
function loadCoverage() {
  const items = [];
  const add = (kind, text, where) => { const key = topicKey(text); if (key.length) items.push({ kind, text, where, key }); };
  try {
    const req = createRequire(path.join(REPO, 'package.json'));
    const regPath = path.join(REPO, 'data', 'blog-posts.js');
    delete req.cache?.[regPath];
    const { posts } = req(regPath);
    for (const p of posts) {
      const where = `/blog/${p.slug}`;
      add('post', p.slug.replace(/-/g, ' '), where);
      add('post', p.title, where);
      for (const k of p.keywords || []) add('post', k, where);
      for (const f of p.faqs || []) add('faq', f[0], where);
    }
    stat('site').ok++;
  } catch (e) { note('site', `could not load data/blog-posts.js: ${e.message}`); }
  const skip = /^(404|500|licenses|privacy-policy|terms-conditions|refund-policy)\.html$/;
  const pages = [];
  for (const f of fs.readdirSync(REPO)) if (f.endsWith('.html') && !skip.test(f)) pages.push([path.join(REPO, f), '/' + f.replace(/\.html$/, '').replace(/^index$/, '')]);
  const alt = path.join(REPO, 'alternatives');
  if (fs.existsSync(alt)) for (const f of fs.readdirSync(alt)) if (f.endsWith('.html')) pages.push([path.join(alt, f), '/alternatives/' + f.replace(/\.html$/, '').replace(/^index$/, '')]);
  for (const [file, where] of pages) {
    const html = fs.readFileSync(file, 'utf8');
    const strip = (s) => decodeEntities(s.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
    const t = html.match(/<title>([\s\S]*?)<\/title>/i); if (t) add('page', strip(t[1]).replace(/\s*[|\-]\s*HushBook.*$/i, ''), where);
    const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i); if (h1) add('page', strip(h1[1]), where);
    if (where === '/questions') for (const m of html.matchAll(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/gi)) add('faq', strip(m[1]), where);
  }
  return items;
}
// One extra word from this set does not make a new topic ("audiobooks with subtitles in english").
const MODIFIERS = new Set(['english', 'online', 'free', 'download', 'list', 'site', 'website', 'android', 'iphone', 'io', 'ios', 'pc', 'window', 'mac', 'example', 'guide', 'tip', 'idea', 'fast', 'faster', 'quickly', 'quick', 'easy', 'easily', 'day', 'week', 'month', 'hour', 'minute', 'weekend', 'night', 'tonight']);
const coreKey = (key) => key.filter((t) => !MODIFIERS.has(t)).join(' ');
function coverageFor(key, items) {
  if (!key.length) return { level: 'head', by: [] };
  let best = null; const by = [];
  const rank = { covered: 3, faq: 2, near: 1 };
  for (const it of items) {
    const j = jaccard(key, it.key);
    let level = null;
    const modifierOnly = subset(it.key, key) && key.length - it.key.length === 1 && key.every((t) => it.key.includes(t) || MODIFIERS.has(t));
    if (j >= 0.67 || (subset(key, it.key) && it.key.length - key.length <= 1) || modifierOnly) level = it.kind === 'faq' ? 'faq' : 'covered';
    else if (j >= 0.4 || subset(it.key, key)) level = 'near';
    if (!level) continue;
    by.push({ level, where: it.where, text: it.text, j: Number(j.toFixed(2)) });
    if (!best || rank[level] > rank[best]) best = level;
  }
  by.sort((a, b) => rank[b.level] - rank[a.level] || b.j - a.j);
  const seen = new Set();
  return { level: best, by: by.filter((x) => { const k = x.where + x.level; if (seen.has(k)) return false; seen.add(k); return true; }).slice(0, 4) };
}
function gscFor(key, gsc) {
  if (!gsc || !key.length) return null;
  // 0.6, not 0.5: a one-word key ({focus}) would otherwise match every two-word key that contains it.
  const matched = gsc.queries.filter((q) => q.key.length && jaccard(key, q.key) >= 0.6);
  if (!matched.length) return { impressions: 0, clicks: 0, bestPos: null, queries: [], pages: [], cannibal: false, opportunity: false };
  const pages = new Map();
  for (const q of matched) for (const p of q.pages) { const x = pages.get(p.page) || { page: p.page.replace('https://hushbook.app', '') || '/', impressions: 0, bestPos: 999 }; x.impressions += p.impressions; x.bestPos = Math.min(x.bestPos, p.position); pages.set(p.page, x); }
  const pageList = [...pages.values()].sort((a, b) => b.impressions - a.impressions);
  const impressions = matched.reduce((s, q) => s + q.impressions, 0);
  const bestPos = Math.min(...matched.map((q) => q.position));
  return {
    impressions, clicks: matched.reduce((s, q) => s + q.clicks, 0), bestPos,
    queries: matched.sort((a, b) => b.impressions - a.impressions).slice(0, 8).map((q) => ({ query: q.query, impressions: q.impressions, position: q.position, page: q.pages[0]?.page.replace('https://hushbook.app', '') || null })),
    pages: pageList.slice(0, 4),
    cannibal: pageList.some((p) => p.bestPos <= 12),
    opportunity: impressions > 0 && (bestPos > 12 || matched.some((q) => !q.pages.length)),
  };
}
// A query counts as served when it already lands on a blog post or answer page at position 15 or better.
const LOCALE_OR_LEGAL = /^\/([a-z]{2}(-[a-z]{2,4})?)(\/|$)|^\/$|^\/(licenses|privacy-policy|terms-conditions|refund-policy|about)$/i;
function servedBy(q) {
  return q.pages.find((p) => p.position <= 15 && !LOCALE_OR_LEGAL.test(p.page.replace('https://hushbook.app', '') || '/')) || null;
}
function gscGap(gsc, items, n = 50) {
  if (!gsc) return [];
  return gsc.queries.filter((q) => !cfg.brand.test(q.n) && q.key.length).filter((q) => { const c = coverageFor(q.key, items).level; return c !== 'covered' && c !== 'faq' && !servedBy(q); })
    .sort((a, b) => b.impressions - a.impressions).slice(0, n)
    .map((q) => ({ query: q.query, impressions: q.impressions, clicks: q.clicks, position: q.position, page: q.pages[0]?.page.replace('https://hushbook.app', '') || null, fit: fitOf(q.query).score }));
}

// ---------------------------------------------------------------- reddit
// True when at least k of the required tokens (alternatives separated by |) occur in the title
// inside a window of at most `win` words.
function relevantTitle(title, req, k, win) {
  const words = tokens(title).map(stem);
  const hits = [];
  words.forEach((w, i) => req.forEach((r, j) => { if (r.split('|').includes(w)) hits.push([i, j]); }));
  for (let a = 0; a < hits.length; a++) {
    const seenReq = new Set();
    for (let b = a; b < hits.length && hits[b][0] - hits[a][0] < win; b++) {
      seenReq.add(hits[b][1]);
      if (seenReq.size >= k) return true;
    }
  }
  return false;
}
async function redditDemand(list, subreddit, subTop) {
  const out = {};
  const lim = makeLimiter(3500, 1);
  let mode = 'json';
  // Probe the JSON API once; Reddit blocks it from many networks ("blocked by network security").
  const probe = await httpGet(`https://www.reddit.com/r/${subreddit}/search.json?q=audiobook&restrict_sr=1&sort=top&t=year&limit=5`, { src: 'reddit-json', ttlH: 72, headers: { 'user-agent': UA_FF } });
  if (probe.status !== 200 || !probe.text.trim().startsWith('{')) { mode = 'rss'; note('reddit-json', `search.json returned HTTP ${probe.status}; using RSS search + Arctic Shift scores`); }
  const fetchRss = async (url) => {
    for (let attempt = 0; attempt < 4; attempt++) {
      const r = await httpGet(url, { src: 'reddit-rss', ttlH: 72, headers: { 'user-agent': UA_FF }, limiter: lim });
      if (r.status === 200) {
        const reset = Number(r.headers?.['x-ratelimit-reset'] || 0); const rem = Number(r.headers?.['x-ratelimit-remaining'] ?? 1);
        if (!r.cached && rem < 1 && reset) await sleep((reset + 1) * 1000);
        return r;
      }
      if (r.status === 429) { const wait = 20000 * (attempt + 1); note('reddit-rss', `HTTP 429, backing off ${wait / 1000}s`); await sleep(wait); continue; }
      return r;
    }
    return { status: 429, text: '' };
  };
  const parseRss = (xml) => [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((m) => {
    const e = m[1];
    const id = (e.match(/<id>t3_([a-z0-9]+)<\/id>/) || [])[1];
    if (!id) return null;
    return { id, title: decodeEntities((e.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || ''), subreddit: (e.match(/<category term="([^"]+)"/) || [])[1] || '', url: (e.match(/<link href="([^"]+)"/) || [])[1] || '', created: (e.match(/<published>([^<]+)<\/published>/) || e.match(/<updated>([^<]+)<\/updated>/) || [])[1] || null };
  }).filter(Boolean);
  const posts = new Map();
  let i = 0;
  for (const c of list) {
    const q = encodeURIComponent(c.redditQuery);
    let found = [];
    if (mode === 'json') {
      const urls = [`https://www.reddit.com/search.json?q=${q}&sort=top&t=year&limit=25`];
      if (i < subTop) urls.push(`https://www.reddit.com/r/${subreddit}/search.json?q=${q}&restrict_sr=1&sort=top&t=year&limit=25`);
      for (const url of urls) {
        const r = await httpGet(url, { src: 'reddit-json', ttlH: 72, headers: { 'user-agent': UA_FF }, limiter: lim });
        if (r.status !== 200) continue;
        try { for (const ch of JSON.parse(r.text).data.children) { const d = ch.data; found.push({ id: d.id, title: d.title, subreddit: d.subreddit, url: 'https://www.reddit.com' + d.permalink, created: new Date(d.created_utc * 1000).toISOString(), score: d.score, comments: d.num_comments }); } } catch { /* skip */ }
      }
    } else {
      // Global search sorted by top returns viral off-topic posts, so the global call uses relevance.
      const urls = [`https://www.reddit.com/search.rss?q=${q}&sort=relevance&t=year&limit=25`];
      if (i < subTop) urls.push(`https://www.reddit.com/r/${subreddit}/search.rss?q=${q}&restrict_sr=on&sort=top&t=year&limit=25`);
      for (const url of urls) {
        const r = await fetchRss(url);
        if (r.status === 200) found.push(...parseRss(r.text));
      }
    }
    const need = c.key.length ? c.key : contentTokens(c.redditQuery);
    const relevant = [];
    const seen = new Set();
    for (const p of found) {
      if (seen.has(p.id)) continue; seen.add(p.id);
      // One-word topics also need a book word; every topic's words must sit within 6 words of each other,
      // so "the focus should be ... what we have read" does not count for "cant focus on reading".
      const req = need.length <= 1 ? [need[0], 'audiobook|book|app|listen|read|audio'] : need;
      const k = need.length <= 1 ? 2 : need.length <= 3 ? need.length : 2;
      if (relevantTitle(p.title, req, k, 6)) { relevant.push(p); posts.set(p.id, p); }
    }
    out[c.id] = relevant;
    if (++i % 10 === 0) log(`  reddit ${i}/${list.length}`);
  }
  // Scores and comment counts for RSS hits come from Arctic Shift (final after ~36 h).
  if (mode === 'rss' && posts.size) {
    const ids = [...posts.keys()];
    for (let k = 0; k < ids.length; k += 100) {
      const r = await httpGet(`https://arctic-shift.photon-reddit.com/api/posts/ids?ids=${ids.slice(k, k + 100).join(',')}&fields=id,score,num_comments,created_utc`, { src: 'arctic-shift', ttlH: 72, timeoutMs: 60000 });
      if (r.status !== 200) { note('arctic-shift', `ids lookup HTTP ${r.status}; scores missing`); continue; }
      try { for (const d of JSON.parse(r.text).data || []) { const p = posts.get(d.id); if (p) { p.score = d.score; p.comments = d.num_comments; } } } catch { note('arctic-shift', 'unparseable response'); }
    }
  }
  const now = Date.now();
  const summary = {};
  for (const [id, rel] of Object.entries(out)) {
    const sorted = rel.slice().sort((a, b) => (b.score ?? -1) - (a.score ?? -1) || (b.comments ?? 0) - (a.comments ?? 0));
    const top = sorted[0];
    summary[id] = {
      posts: rel.length,
      questionPosts: rel.filter((p) => /\?\s*$/.test(p.title) || /^(is there|are there|any|looking for|how|what|why|can|does|which|recommend|best|help)/i.test(p.title)).length,
      topScore: top?.score ?? null, topComments: top?.comments ?? null,
      top: sorted.slice(0, 3).map((p) => ({ title: p.title, subreddit: p.subreddit, score: p.score ?? null, comments: p.comments ?? null, ageDays: p.created ? Math.round((now - Date.parse(p.created)) / 864e5) : null, url: p.url })),
    };
  }
  return { mode, summary };
}

// ---------------------------------------------------------------- serp probe
function domainOf(u) { try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return ''; } }
function classify(u) {
  const host = domainOf(u); let full = '';
  try { const x = new URL(u); full = x.hostname.replace(/^www\./, '') + x.pathname; } catch { /* ignore */ }
  const suffix = (d) => host === d || host.endsWith('.' + d);
  const hit = (d) => (d.includes('*') ? new RegExp(d.replace(/[.]/g, '\\.').replace(/\*/g, '[^/]+')).test(full) : d.includes('/') ? full.startsWith(d) : d.endsWith('.') ? host.startsWith(d) || host.includes('.' + d) : suffix(d));
  if (cfg.forumDomains.some(hit)) return 'forum';
  if (cfg.videoDomains.some(hit)) return 'video';
  if (cfg.authorityDomains.some((d) => (/^(gov|edu)$/.test(d) ? host.endsWith('.' + d) : suffix(d)))) return 'authority';
  return 'other';
}
function ensureProfile() {
  const base = path.join(process.env.LOCALAPPDATA || path.join(os.homedir(), 'AppData', 'Local'), 'hushbook-keyword-scout', 'chrome-profile');
  if (fs.existsSync(base)) return base;
  fs.mkdirSync(base, { recursive: true });
  // Seed from the newest Playwright MCP profile so Google sees an existing cookie jar.
  try {
    const root = path.join(process.env.LOCALAPPDATA, 'ms-playwright');
    const cands = fs.readdirSync(root).filter((d) => d.startsWith('mcp-chrome-')).map((d) => path.join(root, d)).filter((d) => fs.existsSync(path.join(d, 'Local State')))
      .sort((a, b) => fs.statSync(path.join(b, 'Local State')).mtimeMs - fs.statSync(path.join(a, 'Local State')).mtimeMs);
    if (cands[0]) fs.cpSync(cands[0], base, { recursive: true, filter: (p) => !/(Singleton|lockfile|[\\/](Code )?Cache|GPUCache|Service Worker|ShaderCache|GrShaderCache)/.test(p) });
  } catch { /* start empty */ }
  return base;
}
async function launchBrowser(headless) {
  const req = createRequire(path.join(REPO, 'package.json'));
  let pw;
  try { pw = req('playwright'); } catch {
    try { pw = createRequire(path.join(process.env.APPDATA || '', 'npm', 'node_modules', '@playwright', 'mcp', 'package.json'))('playwright-core'); } catch { return null; }
  }
  const profile = ensureProfile();
  const opts = { headless, chromiumSandbox: true, args: ['--window-position=2000,2000', '--window-size=1280,900'], viewport: { width: 1280, height: 900 }, locale: 'en-US' };
  try { return await pw.chromium.launchPersistentContext(profile, { ...opts, channel: 'chrome' }); } catch (e) {
    note('serp', `Chrome channel failed (${String(e.message).split('\n')[0]}); using bundled Chromium`);
    try { return await pw.chromium.launchPersistentContext(profile, opts); } catch (e2) { note('serp', `browser launch failed: ${String(e2.message).split('\n')[0]}`); return null; }
  }
}

const EXTRACT = {
  google: () => {
    const body = document.body.innerText;
    const blocked = /\/sorry\//.test(location.href) || /unusual traffic from your computer/i.test(body);
    const results = []; const seen = new Set();
    for (const h3 of document.querySelectorAll('#rso h3, #search h3')) {
      const a = h3.closest('a') || h3.parentElement?.querySelector('a[href^="http"]');
      if (!a || !/^https?:/.test(a.href) || /google\.[a-z.]+\/(search|url)|webcache|translate\.google/.test(a.href)) continue;
      if (seen.has(a.href)) continue; seen.add(a.href);
      const box = a.closest('.MjjYud, .g, [data-hveid]');
      results.push({ url: a.href, title: h3.innerText, snippet: (box ? box.innerText : '').slice(0, 400) });
    }
    if (!results.length) for (const c of document.querySelectorAll('#search cite')) { const t = c.innerText.split(' ')[0]; if (/^https?:/.test(t) && !seen.has(t)) { seen.add(t); results.push({ url: t, title: '', snippet: '' }); } }
    const paa = [...document.querySelectorAll('[data-q]')].map((e) => e.getAttribute('data-q')).filter(Boolean);
    const related = [...document.querySelectorAll('#botstuff a[href^="/search?"], #bres a[href^="/search?"]')].map((a) => a.innerText.trim()).filter((t) => t && t.length < 90 && !/^(next|\d+|more results)$/i.test(t));
    return { blocked, results, paa: [...new Set(paa)], related: [...new Set(related)], ai: /AI Overview/.test(body), forumBlock: /Discussions and forums/.test(body), stats: document.querySelector('#result-stats')?.innerText || null };
  },
  ddg: () => {
    const body = document.body.innerText;
    const blocked = /anomaly|bots use DuckDuckGo too/i.test(body) && !document.querySelector('article[data-testid="result"]');
    const results = [...document.querySelectorAll('article[data-testid="result"]')].map((a) => ({ url: a.querySelector('a[data-testid="result-title-a"]')?.href || '', title: a.querySelector('a[data-testid="result-title-a"]')?.innerText || '', snippet: a.innerText.slice(0, 400) })).filter((r) => r.url);
    const related = [...document.querySelectorAll('.related-searches__item-text')].map((e) => e.innerText.replace(/\?\s*$/, '').trim()).filter(Boolean);
    return { blocked, results, paa: [], related, ai: /Auto-generated based on listed sources/i.test(body), forumBlock: false, stats: null };
  },
  brave: () => {
    const body = document.body.innerText;
    const blocked = /captcha|are you a robot|rate limit/i.test(body) && !document.querySelector('.snippet[data-type="web"]');
    const results = [...document.querySelectorAll('.snippet[data-type="web"]')].map((s) => { const a = s.querySelector('a[href^="http"]'); return { url: a?.href || '', title: s.querySelector('.title')?.innerText || a?.innerText || '', snippet: s.innerText.slice(0, 400) }; }).filter((r) => r.url && !/brave\.com/.test(r.url));
    const related = [...document.querySelectorAll('#related-queries a')].map((a) => a.innerText.trim()).filter(Boolean);
    const llm = document.querySelector('#llm-snippet');
    return { blocked, results, paa: [], related, ai: !!(llm && llm.innerText.trim().length > 80), forumBlock: /\bDiscussions\b/.test(body), stats: null };
  },
};
const SERP_URL = {
  google: (q, hl, gl) => `https://www.google.com/search?hl=${hl}&gl=${gl}&pws=0&q=${encodeURIComponent(q)}`,
  ddg: (q, hl, gl) => `https://duckduckgo.com/?q=${encodeURIComponent(q)}&kl=${gl}-${hl}&ia=web`,
  brave: (q) => `https://search.brave.com/search?q=${encodeURIComponent(q)}&source=web`,
};

async function serpProbe(list, a, year) {
  const out = {};
  let engines = String(a.serpEngines).split(',').map((s) => s.trim()).filter(Boolean);
  const pending = []; // queries not cached
  for (const c of list) for (const e of engines.concat('brave')) {
    const hit = cacheGet('serp-' + e, sha1(c.serpQuery), 168);
    if (hit) { (out[c.id] ||= {})[e] = hit; stat('serp-' + e).cached++; }
  }
  const needs = (c, e) => !out[c.id]?.[e];
  if (!list.some((c) => engines.some((e) => needs(c, e)))) return out;
  const ctx = await launchBrowser(Boolean(a.headless));
  if (!ctx) { note('serp', 'no browser available; SERP signals missing'); return out; }
  const page = ctx.pages()[0] || await ctx.newPage();
  const lastAt = {};
  const blockedEngines = new Set();
  const visit = async (engine, q) => {
    const wait = Math.max(0, (lastAt[engine] || 0) + a.serpDelay - Date.now());
    if (wait) await sleep(wait);
    lastAt[engine] = Date.now();
    stat('serp-' + engine).calls++;
    try {
      await page.goto(SERP_URL[engine](q, a.hl, a.gl), { waitUntil: 'domcontentloaded', timeout: 45000 });
      if (engine === 'google' && /consent\.google/.test(page.url())) { await page.getByRole('button', { name: /accept all|i agree/i }).first().click({ timeout: 5000 }).catch(() => {}); await page.waitForTimeout(2000); }
      await page.waitForTimeout(engine === 'google' ? 3500 : 5000);
      const r = await page.evaluate(EXTRACT[engine]);
      if (r.blocked) { stat('serp-' + engine).failed++; return { blocked: true }; }
      stat('serp-' + engine).ok++;
      return r;
    } catch (e) { stat('serp-' + engine).failed++; return { error: String(e.message).split('\n')[0] }; }
  };
  try {
    for (const c of list) {
      for (const e of engines) {
        if (blockedEngines.has(e) || !needs(c, e)) continue;
        const r = await visit(e, c.serpQuery);
        if (r.blocked) {
          blockedEngines.add(e);
          note('serp-' + e, `${e} showed its bot check on "${c.serpQuery}"; stopped querying ${e} for this run`);
          if (e === 'google' && !engines.includes('brave')) { engines.push('brave'); note('serp', 'Google blocked: added Brave as the second SERP engine; PAA and allintitle unavailable'); }
          continue;
        }
        if (r.error) { note('serp-' + e, `error on "${c.serpQuery}": ${r.error}`); continue; }
        const clean = (t) => String(t).replace(/[\u200b-\u200d\ufeff]/g, '').trim();
        r.related = (r.related || []).map(clean).filter(Boolean);
        r.paa = (r.paa || []).map(clean).filter(Boolean);
        const results = r.results.slice(0, 10).map((x) => ({ ...x, domain: domainOf(x.url), cls: classify(x.url), years: [...new Set((`${x.title} ${x.snippet}`.match(/\b20[0-2]\d\b/g) || []).map(Number))].filter((y) => y <= year + 1) }));
        const rec = { engine: e, query: c.serpQuery, at: new Date().toISOString(), results, paa: r.paa, related: r.related, ai: r.ai, forumBlock: r.forumBlock, stats: r.stats };
        (out[c.id] ||= {})[e] = rec;
        cachePut('serp-' + e, sha1(c.serpQuery), rec);
      }
      if (!engines.some((e) => !blockedEngines.has(e))) break;
    }
    // allintitle counts (Google only, prints "About N results" in #result-stats when it still does).
    if (!blockedEngines.has('google') && engines.includes('google') && a.allintitle > 0) {
      for (const c of list.slice(0, a.allintitle)) {
        const key = sha1('allintitle:' + c.serpQuery);
        const hit = cacheGet('serp-allintitle', key, 168);
        let val = hit?.value;
        if (!hit) {
          const r = await visit('google', `allintitle:"${c.serpQuery}"`);
          if (r.blocked) { blockedEngines.add('google'); note('serp-google', 'bot check during allintitle; stopped'); break; }
          const m = (r.stats || '').replace(/[,.  ]/g, '').match(/(\d+)\s+results?/i);
          val = r.stats == null ? null : m ? Number(m[1]) : (r.results?.length ? r.results.length : 0);
          if (r.stats == null && r.results?.length === 0) val = 0;
          cachePut('serp-allintitle', key, { value: val, stats: r.stats ?? null });
          if (r.stats == null) note('serp-allintitle', 'Google did not print #result-stats; allintitle is the visible result count or null');
        }
        (out[c.id] ||= {}).allintitle = val ?? null;
      }
    }
  } finally { await ctx.close().catch(() => {}); }
  return out;
}

// ---------------------------------------------------------------- scoring
function serpMetrics(serp, year) {
  if (!serp) return null;
  const recs = ['google', 'ddg', 'brave'].map((e) => serp[e]).filter((r) => r && r.results && r.results.length);
  if (!recs.length) return null;
  const per = recs.map((r) => {
    const res = r.results;
    const qTok = new Set(contentTokens(r.query));
    r = { ...r, related: (r.related || []).filter((t) => t.split(' ').length >= 2 && contentTokens(t).some((x) => qTok.has(x) || GENERIC.has(x))) };
    const n = Math.max(1, res.length);
    const forum = res.filter((x) => x.cls === 'forum').length + (r.forumBlock && !res.some((x) => x.cls === 'forum') ? 1 : 0);
    const authority = res.filter((x) => x.cls === 'authority').length;
    const years = res.flatMap((x) => x.years);
    const dated = res.filter((x) => x.years.length);
    const stale = dated.length ? dated.filter((x) => Math.max(...x.years) <= year - 2).length / dated.length : 0.5;
    return { engine: r.engine, n: res.length, forum: Math.min(forum, n), authority, newest: years.length ? Math.max(...years) : null, oldest: years.length ? Math.min(...years) : null, stale, ai: r.ai, paa: r.paa || [], related: r.related || [], domains: res.map((x) => x.domain) };
  });
  const avg = (f) => per.reduce((s, p) => s + f(p), 0) / per.length;
  const google = per.find((p) => p.engine === 'google');
  const relatedQs = [...new Set(per.flatMap((p) => p.related).filter((t) => isQuestion(norm(t))))];
  return {
    engines: per.map((p) => p.engine), per,
    forum: avg((p) => p.forum), authority: avg((p) => p.authority), stale: avg((p) => p.stale),
    newest: Math.max(...per.map((p) => p.newest || 0)) || null,
    paa: google ? google.paa : [], paaSource: google ? 'google' : 'related-questions',
    paaCount: google ? google.paa.length : relatedQs.length,
    ai: per.some((p) => p.ai), aiBy: per.filter((p) => p.ai).map((p) => p.engine),
    allintitle: serp.allintitle ?? null,
  };
}

function scoreCandidate(c, ctx) {
  const { enginesOk, year } = ctx;
  // Demand (0-100)
  const engCov = enginesOk.length ? c.engines.filter((e) => enginesOk.includes(e)).length / enginesOk.length : 0;
  const rel = c.rel != null ? clamp01((c.rel - 500) / 750) : 0;
  const phr = clamp01(Math.log(1 + c.phrasings.length) / Math.log(1 + 25));
  const rd = c.reddit ? 0.5 * clamp01(log10(c.reddit.topScore || 0) / 3) + 0.5 * clamp01(c.reddit.posts / 10) : 0;
  const gs = c.gsc ? clamp01(log10(c.gsc.impressions) / 3) : 0;
  const yt = c.youtube ? clamp01(log10(c.youtube.volume || 0) / 5) : null;
  let D = 0.25 * engCov + 0.20 * rel + 0.20 * phr + 0.15 * rd + 0.20 * gs;
  if (yt != null) D = 0.9 * D + 0.1 * yt;
  // Weakness (0-100); neutral 0.5 when the SERP was not probed
  const m = c.serpM;
  let W = 0.5;
  if (m) {
    const parts = [[0.35, clamp01(m.forum / 4)], [0.30, 1 - clamp01(m.authority / 5)], [0.15, m.stale]];
    if (m.allintitle != null) parts.push([0.20, 1 - clamp01(log10(m.allintitle) / 5)]);
    const wsum = parts.reduce((s, p) => s + p[0], 0);
    W = parts.reduce((s, p) => s + p[0] * p[1], 0) / wsum;
  }
  // AI-search shape (0-100)
  const q = c.phrasings.some((p) => isQuestion(p.phrase)) ? 1 : 0;
  const words = Math.max(...c.phrasings.map((p) => p.phrase.split(' ').length));
  const len = words >= 4 ? 1 : words === 3 ? 0.5 : 0;
  const paa = m ? clamp01(m.paaCount / 4) : 0;
  const ai = m?.ai ? 1 : 0;
  const bing = c.engines.includes('bing') || c.engines.includes('ddg') ? 1 : 0;
  const A = 0.30 * q + 0.20 * len + 0.20 * paa + 0.15 * ai + 0.15 * bing;
  // Fit (0-100)
  const F = c.fit.score / 100;
  // Penalties and bonus (points)
  let pen = 0; const flags = [];
  if (c.rejected) { pen += 50; flags.push(`REJECTED:${c.rejected.id}`); }
  if (c.fit.offFit) { pen += 20; flags.push('OFF-FIT'); }
  if (c.coverage.level === 'covered') { pen += 35; flags.push('COVERED'); } else if (c.coverage.level === 'faq') { pen += 10; flags.push('FAQ'); } else if (c.coverage.level === 'near') { pen += 5; flags.push('NEAR'); } else if (c.coverage.level === 'head') { pen += 15; flags.push('HEAD-TERM'); }
  if (c.gsc?.cannibal) { pen += 20; flags.push('CANNIBALIZATION'); }
  if (c.gsc?.opportunity) { pen -= 5; flags.push('OPPORTUNITY'); }
  // Fit gates the score: demand, weakness and AI shape only count in proportion to the reader pain HushBook solves.
  const total = 100 * (0.40 * D + 0.35 * W + 0.25 * A) * (0.3 + 0.7 * F) - pen;
  return { total: Math.round(total * 10) / 10, D: Math.round(D * 100), W: m ? Math.round(W * 100) : null, A: Math.round(A * 100), F: Math.round(F * 100), pen, flags, parts: { engCov, rel, phr, rd, gs, yt, q, len, paa, ai, bing } };
}

// ---------------------------------------------------------------- families
function buildFamilies(phrases, items, gsc) {
  const fam = new Map();
  for (const p of phrases.values()) {
    const key = topicKey(p.phrase);
    const k = key.join(' ') || '(head)';
    const f = fam.get(k) || { id: k, key, phrasings: [], engines: new Set(), rel: null, hits: 0 };
    f.phrasings.push(p);
    for (const e of Object.keys(p.engines)) f.engines.add(e);
    if (p.rel != null) f.rel = Math.max(f.rel ?? 0, p.rel);
    f.hits += p.hits;
    fam.set(k, f);
  }
  const out = [];
  for (const f of fam.values()) {
    f.engines = [...f.engines];
    const demand = (p) => Object.keys(p.engines).length * 10 + p.hits + (p.rel ? (p.rel - 500) / 100 : 0);
    f.phrasings.sort((a, b) => demand(b) - demand(a) || a.phrase.length - b.phrase.length);
    f.rep = f.phrasings[0].phrase;
    f.question = f.phrasings.find((p) => isQuestion(p.phrase))?.phrase || null;
    const allText = f.phrasings.map((p) => p.phrase).join(' | ');
    f.fit = fitOf(allText);
    if (f.fit.offFit) f.fit = fitOf(f.rep); // one off-fit variant should not sink the family
    f.bookContext = f.phrasings.filter((p) => cfg.bookContext.test(p.phrase)).length / f.phrasings.length;
    if (f.fit.score > 0 && f.bookContext < 0.3) f.fit = { ...f.fit, score: Math.round(f.fit.score * 0.25), cats: [...f.fit.cats, 'no-book-context'] };
    f.rejected = rejectedOf(f.rep) || (f.question && rejectedOf(f.question)) || null;
    f.coverage = coverageFor(f.key, items);
    f.gsc = gscFor(f.key, gsc);
    f.redditQuery = contentTokens(f.rep).join(' ');
    f.serpQuery = f.rep;
    out.push(f);
  }
  return out;
}
// Merge near-duplicate families into the higher-ranked one when building the ranked list.
// Families that name different platforms (Libby vs Spotify vs none) never merge.
const PLATFORMS = new Set(cfg.platforms);
const platformsOf = (key) => key.filter((t) => PLATFORMS.has(t)).sort().join(' ');
function diversify(sorted, n) {
  const picked = [];
  for (const c of sorted) c.merged = [];
  for (const c of sorted) {
    if (picked.length >= n) break;
    const dup = picked.find((p) => p.key.length && c.key.length && platformsOf(p.key) === platformsOf(c.key) && (jaccard(p.key, c.key) >= 0.5 || subset(p.key, c.key) || subset(c.key, p.key) || (coreKey(p.key) && coreKey(p.key) === coreKey(c.key))));
    if (dup) { dup.merged.push(c.rep); continue; }
    picked.push(c);
  }
  return picked;
}

// ---------------------------------------------------------------- report
function mdTable(head, rows) {
  return [`| ${head.join(' | ')} |`, `|${head.map(() => '---').join('|')}|`, ...rows.map((r) => `| ${r.map(cell).join(' | ')} |`)].join('\n');
}
const ENG_LETTER = { 'google-firefox': 'F', 'google-chrome': 'C', youtube: 'Y', bing: 'B', ddg: 'D' };
function engStr(list, enginesUsed) { return enginesUsed.map((e) => (list.includes(e) ? ENG_LETTER[e] : '-')).join(''); }

function riskNotes(c) {
  const r = [];
  const m = c.serpM;
  if (!m) r.push('SERP not probed.');
  else {
    if (m.authority >= 5) r.push(`Authority-heavy top 10 (${m.authority.toFixed(1)} of 10 big-brand, .gov or .edu).`);
    if (m.forum >= 3) r.push(`Forums hold ${m.forum.toFixed(1)} of 10: weak SERP.`);
    if (!m.ai) r.push('No AI answer seen on the probed engines.');
  }
  if (c.coverage.level && c.coverage.level !== 'head') r.push(`Site coverage ${c.coverage.level}: ${c.coverage.by.map((b) => b.where).join(', ')}.`);
  if (c.gsc?.cannibal) r.push(`GSC already sends matched queries to ${c.gsc.pages.filter((p) => p.bestPos <= 12).map((p) => `${p.page} (pos ${p.bestPos})`).join(', ')}.`);
  if (c.phrasings.length <= 2) r.push('Thin autocomplete footprint (1 to 2 phrasings).');
  if (!c.reddit || !c.reddit.posts) r.push('No matching Reddit threads in the last year.');
  if (/\b(audible|spotify|libby|kindle|apple books|kobo|storytel|everand|hoopla)\b/.test(c.rep)) r.push('Brand-specific: the brand help page may own the answer.');
  if (c.rejected) r.push(`Rejected before: ${c.rejected.why}`);
  return r;
}

function writeReport(file, R) {
  const { a, date, ranked, gap, sources, acStats, gsc, enginesUsed, rawPath, rejectedHits, formula } = R;
  const L = [];
  L.push(`# Keyword scout report: ${date}`, '');
  L.push(`Generated by \`node tools/seo/keyword-scout.mjs\` on ${date}. Seeds: ${R.seeds.map((s) => `"${s}"`).join(', ')}.${R.gscSeeds.length ? ` GSC gap seeds added: ${R.gscSeeds.map((s) => `"${s}"`).join(', ')}.` : ''} Raw signals: \`${rawPath}\` (outside the repo). Scoring and caveats: \`tools/seo/README.md\`.`, '');
  L.push('## Sources (generated)', '');
  L.push(mdTable(['Source', 'Network calls', 'OK', 'From cache', 'Failed', 'Notes'], sources.map((s) => [s.name, s.calls, s.ok, s.cached, s.failed, s.notes.join(' ')])), '');
  L.push(`Autocomplete: ${acStats.queries} expansion queries per engine (${acStats.l1} first level, ${acStats.l2} second level), ${acStats.unique} unique suggestions, ${acStats.families} topic families. Firefox suggestions missing from the chrome client: ${acStats.ffNotInChrome}. DuckDuckGo suggestions missing from Bing: ${acStats.ddgNotInBing}.`, '');
  if (gsc) L.push(`Search Console: \`${gsc.dir}\`, ${gsc.window}, ${gsc.queries.length} queries, ${gsc.totalImpr} impressions.`, '');
  L.push('## Score', '', formula, '');
  L.push(`## Top ${ranked.length} candidates (generated)`, '');
  L.push('Engines: F google-firefox, C google-chrome, Y YouTube, B Bing, D DuckDuckGo. Rel = best chrome suggestrelevance. Phr = distinct phrasings in the family. Reddit = top thread score/comments (relevant threads in the last year). GSC = matched impressions @ best position. Forum, Auth = average count in the probed top 10. AI = AI answer seen (G Google AI Overview, D DuckDuckGo Search Assist, B Brave). PAA = Google People Also Ask count, or question-shaped related searches when Google was blocked (marked r).', '');
  L.push(mdTable(['#', 'Topic (top phrasing)', 'Score', 'D', 'W', 'A', 'F', 'Engines', 'Rel', 'Phr', 'Reddit', 'GSC', 'Forum', 'Auth', 'Newest yr', 'PAA', 'AI', 'allintitle', 'Flags'], ranked.map((c, i) => {
    const m = c.serpM;
    return [i + 1, c.rep + (c.question && c.question !== c.rep ? ` (Q: ${c.question})` : ''), c.s.total, c.s.D, c.s.W ?? 'n/p', c.s.A, c.s.F, engStr(c.engines, enginesUsed), c.rel ?? '', c.phrasings.length,
      c.reddit ? `${c.reddit.topScore ?? '?'}/${c.reddit.topComments ?? '?'} (${c.reddit.posts})` : 'n/p', c.gsc && c.gsc.impressions ? `${c.gsc.impressions} @ ${c.gsc.bestPos}` : '0',
      m ? m.forum.toFixed(1) : 'n/p', m ? m.authority.toFixed(1) : 'n/p', m?.newest ?? '', m ? `${m.paaCount}${m.paaSource === 'google' ? '' : 'r'}` : 'n/p', m ? (m.aiBy.map((e) => ({ google: 'G', ddg: 'D', brave: 'B' })[e]).join('') || 'no') : 'n/p', m?.allintitle ?? '', c.s.flags.join(' ')];
  })), '');
  L.push(`## Top ${Math.min(a.detail, ranked.length)} in detail (generated)`, '');
  ranked.slice(0, a.detail).forEach((c, i) => {
    L.push(`### ${i + 1}. ${c.rep}`, '');
    L.push(`- Score ${c.s.total} (Demand ${c.s.D}, Weakness ${c.s.W ?? 'not probed'}, AI shape ${c.s.A}, Fit ${c.s.F}, penalties ${c.s.pen}). Flags: ${c.s.flags.join(', ') || 'none'}.`);
    L.push(`- Phrasings (${c.phrasings.length}): ${c.phrasings.slice(0, 14).map((p) => `"${p.phrase}"`).join(', ')}${c.merged?.length ? `. Merged near-duplicates: ${c.merged.slice(0, 8).map((x) => `"${x}"`).join(', ')}` : ''}.`);
    L.push(`- Fit: ${c.fit.cats.join(', ') || 'none'}.`);
    const m = c.serpM;
    if (m) {
      for (const p of m.per) L.push(`- SERP ${p.engine}: ${p.domains.join(', ') || '(no results parsed)'}. Forums ${p.forum}, authority ${p.authority}, newest year ${p.newest ?? 'none'}, AI answer ${p.ai ? 'yes' : 'no'}.`);
      L.push(`- People Also Ask (${m.paaSource}): ${m.paa.length ? m.paa.map((q) => `"${q}"`).join('; ') : 'none captured'}.`);
      const rel = [...new Set(m.per.flatMap((p) => p.related))];
      L.push(`- Related searches: ${rel.length ? rel.slice(0, 10).map((q) => `"${q}"`).join('; ') : 'none captured'}.`);
      L.push(`- allintitle: ${m.allintitle ?? 'not available'}.`);
    } else L.push('- SERP: not probed.');
    if (c.reddit?.top?.length) L.push(`- Reddit: ${c.reddit.top.map((t) => `"${t.title}" (r/${t.subreddit}, score ${t.score ?? '?'}, ${t.comments ?? '?'} comments, ${t.ageDays ?? '?'} days old)`).join('; ')}.`);
    if (c.gsc?.queries?.length) L.push(`- GSC matches: ${c.gsc.queries.map((q) => `"${q.query}" ${q.impressions} @ ${q.position}${q.page ? ` -> ${q.page}` : ''}`).join('; ')}.`);
    else L.push('- GSC matches: none.');
    L.push(`- Site coverage: ${c.coverage.level || 'none'}${c.coverage.by.length ? ` (${c.coverage.by.map((b) => `${b.where} "${b.text}"`).join('; ')})` : ''}.`);
    L.push(`- Risk: ${riskNotes(c).join(' ') || 'none flagged.'}`, '');
  });
  if (rejectedHits.length) {
    L.push('## Strong families excluded (rejected, covered, off-fit or no fit)', '');
    L.push(mdTable(['Topic', 'Pre-score', 'Phr', 'Engines', 'Why'], rejectedHits.map((c) => [c.rep, c.s.total, c.phrasings.length, engStr(c.engines, enginesUsed), c.rejected ? `Rejected (${c.rejected.id}): ${c.rejected.why}` : c.coverage.level === 'covered' ? `Covered by ${c.coverage.by.filter((b) => b.level === 'covered').map((b) => b.where).join(', ')}` : c.fit.offFit ? 'Off-fit (creator, account, piracy or another product)' : c.coverage.level === 'head' ? 'Generic head term' : 'No HushBook fit (no pain category matched)'])), '');
  }
  // The report lives in git, so it shows only the top 15; all 50 are in the raw JSON outside the repo.
  L.push('## Search Console gap: top queries no published page covers', '');
  L.push(`Queries with impressions that no page covers by topic and that do not already land on a blog or answer page at position 15 or better. Top 15 of ${gap.length}; the full list is \`gscGap\` in the raw JSON.`, '');
  L.push(gap.length ? mdTable(['Query', 'Impr', 'Clicks', 'Pos', 'Lands on', 'Fit'], gap.slice(0, 15).map((g) => [g.query, g.impressions, g.clicks, g.position, g.page || '(no page row)', g.fit])) : 'No GSC data.', '');
  L.push('## Run notes', '');
  for (const s of sources) for (const n of s.notes) L.push(`- ${s.name}: ${n}`);
  L.push(`- Arguments: \`${process.argv.slice(2).join(' ')}\``, '');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, noDash(L.join('\n')));
}

const FORMULA = [
  'Score = 100 x (0.40 Demand + 0.35 Weakness + 0.25 AI shape) x (0.3 + 0.7 Fit) minus penalties. Each part is 0 to 1 (shown 0 to 100). Fit is a multiplier, so a topic with no reader pain cannot win on demand alone: Fit 0 keeps 30% of the score, Fit 100 keeps all of it.',
  '',
  '- Demand = 0.25 engine coverage (engines that suggested any phrasing / engines that worked) + 0.20 chrome suggestrelevance ((rel - 500) / 750) + 0.20 phrasings (log scale, 25 = full) + 0.15 Reddit (half log10 top score / 3, half relevant threads / 10) + 0.20 GSC impressions (log10 / 3). vidIQ volume, when given, takes 10%.',
  '- Weakness = 0.35 forums in top 10 (4 = full) + 0.30 absence of big brands, .gov and .edu (5 = none left) + 0.15 share of dated results two or more years old + 0.20 low allintitle count (log10 / 5, dropped and reweighted when missing). Not probed = 0.5.',
  '- AI shape = 0.30 question or prompt phrasing in the family + 0.20 four or more words (three = half) + 0.20 PAA count (4 = full) + 0.15 an AI answer already cites sources (Google AI Overview, DuckDuckGo Search Assist, Brave) + 0.15 present in Bing or DuckDuckGo autocomplete (Bing feeds ChatGPT search and Copilot).',
  '- Fit = strongest matching pain category weight + half of each other match, capped at 100 (categories in keyword-scout.config.mjs). A family where under 30% of phrasings mention books, reading or listening keeps a quarter of its Fit. Fit 0 families leave the ranked table.',
  '- Penalties: rejected topic 50, off-fit 20, covered by a published page 35, answered in a FAQ 10, near an existing page 5, generic head term 15, GSC cannibalization (a page already gets a matched query at position 12 or better) 20. GSC opportunity (impressions at position worse than 12, or no landing page) earns 5.',
].join('\n');

// ---------------------------------------------------------------- main
async function main() {
  const a = parseArgs(process.argv.slice(2));
  if (a.help) { process.stdout.write(HELP); return; }
  const date = a.date || today();
  const year = Number(date.slice(0, 4));
  const rawRoot = path.resolve(a.rawDir || path.join(os.homedir(), 'hushbook-seo', 'keyword-scout'));
  CACHE_DIR = path.join(rawRoot, 'cache');
  FRESH = Boolean(a.fresh);
  const gsc = loadGsc(a.gscDir ? path.resolve(a.gscDir) : newestGscDir());
  const items = loadCoverage();
  const gap = gscGap(gsc, items, 50);
  if (a.gscOnly) {
    process.stdout.write(mdTable(['Query', 'Impr', 'Clicks', 'Pos', 'Lands on', 'Fit'], gap.map((g) => [g.query, g.impressions, g.clicks, g.position, g.page || '-', g.fit])) + '\n');
    return;
  }
  let seeds = [];
  if (a.seeds) seeds.push(...String(a.seeds).split(','));
  if (a.seedsFile) seeds.push(...fs.readFileSync(path.resolve(a.seedsFile), 'utf8').split(/\r?\n/));
  seeds = [...new Set(seeds.map(norm).filter(Boolean))];
  if (!seeds.length || !a.out) { process.stderr.write(HELP); process.exitCode = 2; return; }
  // Gap queries become seeds only when they are about audiobooks in general (a generic token, 2 to 6 words, some fit),
  // so title searches such as "<book title> m4b" stay out.
  const gscSeeds = a.gscSeeds > 0 ? gap.filter((g) => { const w = norm(g.query).split(' '); return g.fit > 0 && w.length >= 2 && w.length <= 6 && contentTokens(g.query).some((t) => GENERIC.has(t)) && !seeds.includes(norm(g.query)); }).slice(0, a.gscSeeds).map((g) => norm(g.query)) : [];
  const allSeeds = [...seeds, ...gscSeeds];
  log(`seeds: ${allSeeds.join(', ')}`);

  // 1. autocomplete, level 1 then level 2
  const defs = engineDefs(a.hl, a.gl);
  const enginesUsed = String(a.engines).split(',').map((s) => s.trim()).filter((e) => defs[e]);
  const phrases = new Map(); const raw = {};
  const ctx = { engines: enginesUsed, defs, delay: a.delay, maxCalls: a.maxCalls, raw, phrases };
  const l1 = []; const queried = new Set();
  for (const s of allSeeds) for (const q of expansions(s)) if (!queried.has(q)) { queried.add(q); l1.push({ q, seed: s, level: 1 }); }
  log(`autocomplete level 1: ${l1.length} queries x ${enginesUsed.length} engines`);
  await runAutocomplete(l1, ctx);
  const l2 = [];
  if (a.l2 > 0) {
    const prov = [...phrases.values()].filter((p) => !queried.has(p.phrase) && !allSeeds.includes(p.phrase) && !cfg.offFit.test(p.phrase) && !rejectedOf(p.phrase) && p.phrase.split(' ').length >= 2)
      .map((p) => ({ p, v: Object.keys(p.engines).length * 10 + p.hits + (p.rel ? (p.rel - 500) / 100 : 0) + (fitOf(p.phrase).score > 0 ? 15 : 0) }))
      .sort((x, y) => y.v - x.v).slice(0, a.l2).map((x) => x.p.phrase);
    for (const p of prov) {
      const words = p.split(' ');
      for (const q of [p, ...MODS.filter((m) => !words.includes(m)).map((m) => `${p} ${m}`)]) if (!queried.has(q)) { queried.add(q); l2.push({ q, seed: p, level: 2 }); }
    }
    log(`autocomplete level 2: ${l2.length} queries on ${prov.length} phrases`);
    await runAutocomplete(l2, ctx);
  }
  const enginesOk = enginesUsed.filter((e) => stats['ac-' + e] && (stats['ac-' + e].ok + stats['ac-' + e].cached) > 0);
  const ffSet = new Set(Object.values(raw['google-firefox'] || {}).flat().map(norm));
  const chSet = new Set(Object.values(raw['google-chrome'] || {}).flat().map(norm));
  const bSet = new Set(Object.values(raw.bing || {}).flat().map(norm));
  const dSet = new Set(Object.values(raw.ddg || {}).flat().map(norm));
  const acStats = { queries: l1.length + l2.length, l1: l1.length, l2: l2.length, unique: phrases.size, families: 0, ffNotInChrome: `${[...ffSet].filter((p) => !chSet.has(p)).length} of ${ffSet.size}`, ddgNotInBing: `${[...dSet].filter((p) => !bSet.has(p)).length} of ${dSet.size}` };

  // 2. families + coverage + GSC
  const fams = buildFamilies(phrases, items, gsc);
  acStats.families = fams.length;
  const yd = a.youtubeDemand ? JSON.parse(fs.readFileSync(path.resolve(a.youtubeDemand), 'utf8')) : null;
  if (yd) for (const f of fams) { const hit = f.phrasings.map((p) => yd[p.phrase]).find(Boolean) || yd[f.id]; if (hit) f.youtube = hit; }
  const score = (f) => { f.s = scoreCandidate(f, { enginesOk, year }); return f; };
  fams.forEach(score);
  const eligible = (f) => a.includeRejected || (!f.rejected && !f.fit.offFit && f.fit.score > 0 && f.coverage.level !== 'covered' && f.coverage.level !== 'head');
  const byScore = (x, y) => y.s.total - x.s.total;

  // 3 + 4. Reddit and the SERP probe run in parallel on one shortlist (Reddit RSS allows about one call a minute).
  const short = diversify(fams.filter(eligible).sort(byScore), Math.max(a.reddit, a.serp));
  const redditList = short.slice(0, a.reddit);
  const serpList = short.slice(0, a.serp);
  log(`reddit: ${redditList.length} topics (${Math.min(a.redditSub, redditList.length)} also in r/${cfg.subreddit}); serp: ${serpList.length} topics`);
  const [rd, serp] = await Promise.all([
    redditList.length ? redditDemand(redditList, cfg.subreddit, a.redditSub) : null,
    serpList.length ? serpProbe(serpList, a, year) : null,
  ]);
  if (rd) {
    for (const f of redditList) f.reddit = rd.summary[f.id] || { posts: 0, questionPosts: 0, topScore: null, topComments: null, top: [] };
    stat('reddit-json').notes.push(`mode: ${rd.mode}`);
  }
  if (serp) for (const f of serpList) { f.serp = serp[f.id] || null; f.serpM = serpMetrics(f.serp, year); }
  fams.forEach(score);

  // 5. rank + write
  const sorted = fams.filter(eligible).sort(byScore);
  const ranked = diversify(sorted, a.top);
  // Strongest excluded families, four per reason, so a dropped topic with real demand stays visible.
  const reasonOf = (f) => (f.rejected ? 'rejected' : f.fit.offFit ? 'off-fit' : f.coverage.level === 'covered' ? 'covered' : f.coverage.level === 'head' ? 'head' : 'no-fit');
  const rejectedHits = ['rejected', 'covered', 'off-fit', 'no-fit', 'head'].flatMap((why) => fams.filter((f) => !eligible(f) && reasonOf(f) === why).sort(byScore).slice(0, 4));
  const outMd = path.resolve(a.out.endsWith('.md') ? a.out : a.out + '.md');
  const rawDir = path.join(rawRoot, date);
  fs.mkdirSync(rawDir, { recursive: true });
  const rawPath = a.json ? path.resolve(a.json) : path.join(rawDir, 'signals.json');
  const sources = Object.entries(stats).map(([name, s]) => ({ name, ...s }));
  writeReport(outMd, { a, date, ranked, gap, sources, acStats, gsc, enginesUsed, rawPath, rejectedHits, formula: FORMULA, seeds, gscSeeds });
  const ser = (f) => ({ ...f, phrasings: f.phrasings.map((p) => ({ phrase: p.phrase, engines: p.engines, rel: p.rel, hits: p.hits, level: p.level, seeds: [...p.seeds] })) });
  fs.writeFileSync(rawPath, JSON.stringify({ date, args: a, seeds: allSeeds, sources, acStats, gscDir: gsc?.dir || null, gscGap: gap, ranked: ranked.map((f) => f.id), families: sorted.concat(fams.filter((f) => !eligible(f))).map(ser), autocompleteRaw: raw }, null, 1));
  log(`report: ${outMd}`);
  log(`raw:    ${rawPath}`);
  log('sources: ' + sources.map((s) => `${s.name} ${s.ok + s.cached}/${s.calls + s.cached}`).join(', '));
}

main().catch((e) => { log(e.stack || String(e)); process.exitCode = 1; });
