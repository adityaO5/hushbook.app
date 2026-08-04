'use strict';
const fs = require('node:fs');
const https = require('node:https');

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let body = '';
      res.on('data', (c) => (body += c));
      res.on('end', () => resolve(body));
    }).on('error', reject);
  });
}

(async () => {
  const body = await get('https://hushbook.app/th');
  const ctx = new Set();
  for (const m of body.matchAll(/\uFFFD/g)) {
    ctx.add(JSON.stringify(body.slice(Math.max(0, m.index - 20), m.index + 20)));
  }
  console.log('live th fffd contexts', [...ctx]);

  // local
  for (const page of ['index.html', 'about.html', 'download.html']) {
    const h = fs.readFileSync(`th/${page}`, 'utf8');
    const n = (h.match(/\uFFFD/g) || []).length;
    if (!n) continue;
    const local = new Set();
    for (const m of h.matchAll(/\uFFFD/g)) {
      local.add(JSON.stringify(h.slice(Math.max(0, m.index - 20), m.index + 20)));
    }
    console.log('local', page, n, [...local]);
  }
})();
