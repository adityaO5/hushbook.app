'use strict';
const fs = require('node:fs');
const https = require('node:https');
const crypto = require('node:crypto');

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => resolve({ status: res.statusCode, buf: Buffer.concat(chunks), headers: res.headers }));
      })
      .on('error', reject);
  });
}

(async () => {
  const local = fs.readFileSync('th/index.html');
  const { status, buf, headers } = await get('https://hushbook.app/th');
  console.log('status', status);
  console.log('local bytes', local.length, 'live bytes', buf.length);
  console.log('local sha', crypto.createHash('sha256').update(local).digest('hex').slice(0, 16));
  console.log('live sha', crypto.createHash('sha256').update(buf).digest('hex').slice(0, 16));
  console.log('cache-control', headers['cache-control']);
  console.log('content-type', headers['content-type']);

  // Find first differing offset
  const min = Math.min(local.length, buf.length);
  let diff = -1;
  for (let i = 0; i < min; i++) {
    if (local[i] !== buf[i]) {
      diff = i;
      break;
    }
  }
  console.log('first diff offset', diff);
  if (diff >= 0) {
    console.log('local ctx', local.slice(Math.max(0, diff - 20), diff + 20).toString('utf8'));
    console.log('live  ctx', buf.slice(Math.max(0, diff - 20), diff + 20).toString('utf8'));
    console.log('local hex', local.slice(diff, diff + 10).toString('hex'));
    console.log('live  hex', buf.slice(diff, diff + 10).toString('hex'));
  }
})();
