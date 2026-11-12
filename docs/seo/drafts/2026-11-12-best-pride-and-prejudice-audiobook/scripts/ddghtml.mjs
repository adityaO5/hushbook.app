// Copied unchanged 2026-11-12 from ../../2026-11-11-best-war-and-peace-audiobook/scripts/ddghtml.mjs (SERP probe for scout.md).
// DuckDuckGo HTML endpoint (no browser). node ddghtml.mjs <queries.json> <out.json>
import fs from 'node:fs';
const [, , qFile, outFile] = process.argv;
const qs = JSON.parse(fs.readFileSync(qFile, 'utf8'));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:132.0) Gecko/20100101 Firefox/132.0';
const out = fs.existsSync(outFile) ? JSON.parse(fs.readFileSync(outFile, 'utf8')) : {};
const dec = (s) => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();
for (const q of qs) {
  if (out[q]?.results?.length) continue;
  const r = await fetch('https://html.duckduckgo.com/html/', { method: 'POST', headers: { 'User-Agent': UA, 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'text/html', 'Accept-Language': 'en-US,en;q=0.8', Referer: 'https://html.duckduckgo.com/' }, body: `q=${encodeURIComponent(q)}&kl=us-en` });
  const t = await r.text();
  const results = [];
  for (const m of t.matchAll(/<a rel="nofollow" class="result__a" href="([^"]+)">([\s\S]*?)<\/a>[\s\S]*?(?:<a class="result__snippet"[^>]*>([\s\S]*?)<\/a>)?/g)) {
    let url = m[1]; const u = url.match(/uddg=([^&]+)/); if (u) url = decodeURIComponent(u[1]);
    if (/duckduckgo\.com\/y\.js/.test(url)) continue;
    results.push({ url, title: dec(m[2]), snippet: dec(m[3] || '').slice(0, 220) });
  }
  out[q] = { status: r.status, blocked: /anomaly|challenge-form/i.test(t) && !results.length, results: results.slice(0, 10) };
  console.log(`\n## ${q}  [HTTP ${r.status}${out[q].blocked ? ' BLOCKED' : ''}]`);
  results.slice(0, 10).forEach((x, i) => console.log(`  ${i + 1}. ${x.url.slice(0, 110)}\n      ${x.title.slice(0, 110)}`));
  fs.writeFileSync(outFile, JSON.stringify(out, null, 1));
  if (out[q].blocked) { console.log('blocked, stopping'); break; }
  await sleep(15000);
}
