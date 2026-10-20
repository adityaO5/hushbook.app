'use strict';

// Notify IndexNow engines (Bing, Yandex, Seznam, Naver; Bing feeds ChatGPT
// search and Copilot) that URLs changed. Run AFTER a production deploy, so the
// key file and the new pages are live.
//
//   node scripts/indexnow-ping.js                 # every <loc> in sitemap.xml
//   node scripts/indexnow-ping.js /blog/m4b-vs-mp3 /m4b-player   # just these paths
//   node scripts/indexnow-ping.js --dry-run       # print the payload only

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const HOST = 'hushbook.app';
const KEY = 'd04d4af3fd528f227119e0e1ca657324';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

function sitemapUrls() {
  const xml = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const paths = args.filter((a) => !a.startsWith('--'));
  const urlList = paths.length
    ? paths.map((p) => (p.startsWith('http') ? p : `https://${HOST}${p.startsWith('/') ? '' : '/'}${p}`))
    : sitemapUrls();

  if (!fs.existsSync(path.join(ROOT, `${KEY}.txt`))) throw new Error(`Missing key file ${KEY}.txt at repo root`);
  const payload = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList };
  if (dryRun) {
    console.log(JSON.stringify(payload, null, 2));
    return;
  }
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload)
  });
  // 200 = accepted, 202 = accepted (key validation pending), 403 = key file not live yet, 422 = URL/host mismatch.
  console.log(`IndexNow: HTTP ${res.status} for ${urlList.length} URL(s)`);
  if (res.status >= 400) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err.message);
  process.exitCode = 1;
});
