'use strict';

// Record what a deployment serves, or diff two recordings (Vercel -> Cloudflare move).
//   node scripts/site-snapshot.js --base https://hushbook.app --out docs/migration/snapshots/prod-before.json
//   node scripts/site-snapshot.js --diff before.json after.json
// Snapshot: sitemap URLs + redirect, asset and locale-variant probes, redirects not followed.
// Diff: one line per changed field, classed accepted / warn / fail; exit 1 on any fail.

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const UA_DEFAULT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) hushbook-site-snapshot';
const UA_GOOGLEBOT = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';
const TIMEOUT_MS = 20000;
const CONCURRENCY = 6;

const REDIRECT_PROBES = [
  '/es', '/es/index.html', '/pt', '/fr-argos', '/privacy', '/terms', '/download', '/de/download',
  '/de/about', '/fr/privacy-policy', '/about.html', '/blog/', '/blog/index.html', '/de/',
  '/nope-404-probe', '/utm_source=chatgpt', '/blog/utm_source=x&utm_medium=y', '/?utm_source=snapshot',
];
const ASSET_PROBES = [
  '/robots.txt', '/llms.txt', '/sitemap.xml', '/blog/feed.xml', '/assets/css/blog.css',
  '/assets/img/default_preview.png', '/assets/img/blog/videodrome-tv.webp',
  '/assets/video/hushbook-reading-view.mp4', '/d04d4af3fd528f227119e0e1ca657324.txt', '/404.html',
  '/package.json', '/localization.config.js', '/data/blog-posts.js', '/content/blog/how-to-get-into-audiobooks.md',
];
const VARIANT_PATHS = ['/', '/de'];
const VARIANTS = [
  { tag: 'ua=googlebot', ua: UA_GOOGLEBOT },
  { tag: 'cookie=de', cookie: 'hushbook_locale=de' },
  { tag: 'cookie=en', cookie: 'hushbook_locale=en' },
  { tag: 'cookie=de,ua=googlebot', cookie: 'hushbook_locale=de', ua: UA_GOOGLEBOT },
];
// Source files the Cloudflare build stops shipping on purpose (.assetsignore).
const DROPPED_FILES = /^\/(package\.json|localization\.config\.js|data\/blog-posts\.js|content\/.+)$/;
// contentLength is recorded, not diffed: bodySha256 covers 2xx, other body sizes are platform noise.
const FIELDS = ['status', 'location', 'contentType', 'cacheControl', 'xRobotsTag', 'contentLanguage',
  'bodySha256', 'title', 'canonical', 'hreflang', 'metaRobots', 'error'];

const is2xx = (s) => s >= 200 && s < 300;
const is3xx = (s) => s >= 300 && s < 400;
const sha256 = (data) => crypto.createHash('sha256').update(data).digest('hex');

function pathOnly(href) {
  const u = URL.parse(href);
  return u ? u.pathname + u.search : href;
}

async function request(url, { ua, cookie } = {}) {
  const headers = { 'user-agent': ua || UA_DEFAULT, ...(cookie && { cookie }) };
  const once = async () => {
    const res = await fetch(url, { redirect: 'manual', headers, signal: AbortSignal.timeout(TIMEOUT_MS) });
    return { res, body: Buffer.from(await res.arrayBuffer()) };
  };
  return once().catch(once); // one retry on network error or timeout
}

// The proxied Cloudflare zone rewrites HTML per request: Email Address
// Obfuscation (random XOR key) and a bot-detection script carrying the ray id.
// Undo both before hashing so hashes are stable and match hosts outside the zone.
function cfEmail(hex) {
  const bytes = Buffer.from(hex, 'hex');
  return Buffer.from(bytes.subarray(1).map((b) => b ^ bytes[0])).toString('utf8');
}

function stripCloudflare(html) {
  return html
    .replace(/<script data-cfasync="false" src="\/cdn-cgi\/scripts\/[^"]+\/email-decode\.min\.js"><\/script>/g, '')
    .replace(/<script>\(function\(\)\{function c\(\)\{[^<]*__CF\$cv\$params[^<]*<\/script>/g, '')
    .replace(/<(a|span)\b[^>]*class="__cf_email__" data-cfemail="([0-9a-f]+)">\[email&#160;protected\]<\/\1>/g,
      (_, tag, hex) => cfEmail(hex))
    .replace(/\/cdn-cgi\/l\/email-protection#([0-9a-f]+)/g, (_, hex) => `mailto:${cfEmail(hex)}`);
}

function attrs(tag) {
  const out = {};
  for (const m of tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+))/g)) {
    out[m[1].toLowerCase()] = m[2] ?? m[3] ?? m[4];
  }
  return out;
}

function seoTags(html) {
  const end = html.search(/<\/head>/i);
  const head = end === -1 ? html : html.slice(0, end);
  const tags = (name) => [...head.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map((m) => attrs(m[0]));
  const hasRel = (l, rel) => (l.rel || '').toLowerCase().split(/\s+/).includes(rel);
  const links = tags('link');
  const title = head.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return {
    title: title ? title[1].trim() : null,
    canonical: links.find((l) => hasRel(l, 'canonical'))?.href ?? null,
    hreflang: links.filter((l) => hasRel(l, 'alternate') && l.hreflang)
      .map((l) => `${l.hreflang}=${pathOnly(l.href)}`).sort(),
    metaRobots: tags('meta').find((m) => (m.name || '').toLowerCase() === 'robots')?.content ?? null,
  };
}

async function record({ url, variant }) {
  const got = await request(url, variant).catch((err) => ({ error: `${err.name}: ${err.cause?.code || err.message}` }));
  if (got.error) return { status: 0, error: got.error };
  const { res, body } = got;
  const header = (name) => res.headers.get(name);
  const target = header('location') ? new URL(header('location'), url) : null;
  const entry = {
    status: res.status,
    location: target && (target.host === new URL(url).host ? target.pathname + target.search : target.href),
    contentType: header('content-type'),
    cacheControl: header('cache-control'),
    xRobotsTag: header('x-robots-tag'),
    contentLanguage: header('content-language'),
    contentLength: body.length,
  };
  if (is2xx(res.status)) {
    const html = /text\/html/i.test(entry.contentType || '') ? stripCloudflare(body.toString('utf8')) : null;
    entry.bodySha256 = sha256(html ?? body);
    if (html) Object.assign(entry, seoTags(html));
  }
  return entry;
}

async function targets(base) {
  const { res, body } = await request(`${base}/sitemap.xml`);
  if (!is2xx(res.status)) throw new Error(`${base}/sitemap.xml returned ${res.status}`);
  const locs = [...body.toString('utf8').matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((m) => pathOnly(m[1]));
  const list = new Map();
  for (const p of [...locs, ...REDIRECT_PROBES, ...ASSET_PROBES]) list.set(p, { url: base + p });
  for (const p of VARIANT_PATHS) for (const v of VARIANTS) list.set(`${p} [${v.tag}]`, { url: base + p, variant: v });
  return [...list];
}

async function pool(items, size, fn) {
  const results = [];
  let next = 0;
  await Promise.all(Array.from({ length: size }, async () => {
    for (let i = next++; i < items.length; i = next++) results[i] = await fn(items[i]);
  }));
  return results;
}

async function snapshot(baseArg, out) {
  const base = baseArg.replace(/\/+$/, '');
  const list = await targets(base);
  const results = await pool(list, CONCURRENCY, ([, target]) => record(target));
  const entries = Object.fromEntries(list.map(([key], i) => [key, results[i]]).sort(([a], [b]) => (a < b ? -1 : 1)));
  fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true });
  fs.writeFileSync(out, `${JSON.stringify({ base, generatedAt: new Date().toISOString(), entries }, null, 2)}\n`);
  const counts = {};
  for (const e of results) counts[e.status] = (counts[e.status] || 0) + 1;
  const summary = Object.entries(counts).map(([status, n]) => `${status}: ${n}`).join(', ');
  console.log(`${results.length} entries -> ${out} (${summary})`);
}

function classify(key, field, before, after, afterBase) {
  if (DROPPED_FILES.test(key.split(/[ ?]/)[0]) && before.status === 200 && after.status === 404) return 'accepted';
  if (field === 'status') {
    const redirectFlavour = [before.status, after.status].sort().join() === '307,308';
    return redirectFlavour && before.location === after.location ? 'accepted' : 'fail';
  }
  if (field === 'cacheControl') return is2xx(before.status) || is2xx(after.status) ? 'warn' : 'accepted';
  if (field === 'contentType') return is3xx(before.status) && is3xx(after.status) ? 'accepted' : 'warn';
  // The Worker marks every workers.dev response noindex on purpose.
  const preview = /\.workers\.dev$/.test(new URL(afterBase).host);
  if (field === 'xRobotsTag' && preview && /noindex/.test(after.xRobotsTag || '')) return 'accepted';
  return 'fail';
}

function show(field, entry, other) {
  const v = entry[field];
  if (field === 'hreflang') return (v || []).filter((x) => !(other.hreflang || []).includes(x)).join(' ') || '-';
  if (field === 'bodySha256') return v ? `${v.slice(0, 12)} (${entry.contentLength} B)` : '-';
  return v ?? '-';
}

function diff(fileA, fileB) {
  const [a, b] = [fileA, fileB].map((f) => JSON.parse(fs.readFileSync(f, 'utf8')));
  const keys = [...new Set([...Object.keys(a.entries), ...Object.keys(b.entries)])].sort();
  const totals = { fail: 0, warn: 0, accepted: 0 };
  const print = (cls, key, field, before, after) => {
    totals[cls]++;
    console.log(`${cls.toUpperCase().padEnd(8)} ${key}  ${field}: ${before} -> ${after}`);
  };
  for (const key of keys) {
    const [before, after] = [a.entries[key], b.entries[key]];
    if (!before || !after) {
      print('fail', key, 'entry', before ? 'present' : 'missing', after ? 'present' : 'missing');
      continue;
    }
    // A status change makes body, header and SEO differences consequential noise.
    for (const field of before.status === after.status ? FIELDS : ['status', 'location', 'error']) {
      if (JSON.stringify(before[field] ?? null) === JSON.stringify(after[field] ?? null)) continue;
      const cls = classify(key, field, before, after, b.base);
      print(cls, key, field, show(field, before, after), show(field, after, before));
    }
  }
  const total = totals.fail + totals.warn + totals.accepted;
  const summary = Object.entries(totals).map(([cls, n]) => `${n} ${cls}`).join(', ');
  console.log(`${total} differences across ${keys.length} keys (${summary})`);
  if (totals.fail) process.exitCode = 1;
}

async function main() {
  const argv = process.argv.slice(2);
  const arg = (name, offset = 1) => (argv.includes(name) ? argv[argv.indexOf(name) + offset] : undefined);
  if (argv.includes('--diff')) {
    if (!arg('--diff', 2)) throw new Error('Usage: --diff <before.json> <after.json>');
    return diff(arg('--diff'), arg('--diff', 2));
  }
  if (!arg('--base') || !arg('--out')) throw new Error('Usage: --base <url> --out <file> | --diff <a.json> <b.json>');
  return snapshot(arg('--base'), arg('--out'));
}

if (require.main === module) main().catch((err) => { console.error(err.message || err); process.exitCode = 2; });

module.exports = { stripCloudflare, seoTags };
