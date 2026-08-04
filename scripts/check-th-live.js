'use strict';
const https = require('node:https');

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let d = '';
        res.on('data', (c) => (d += c));
        res.on('end', () => resolve({ status: res.statusCode, body: d }));
      })
      .on('error', reject);
  });
}

(async () => {
  for (const url of [
    'https://hushbook-i3rwb8jtp-adityas-projects-2f44cf23.vercel.app/th',
    'https://hushbook.app/th',
  ]) {
    const { status, body } = await get(url);
    const fffd = (body.match(/\uFFFD/g) || []).length;
    console.log(url);
    console.log('  status', status, 'fffd', fffd, 'style', body.includes('<style'));
    const i = body.indexOf('\uFFFD');
    if (i >= 0) console.log('  ctx', JSON.stringify(body.slice(i - 30, i + 30)));
  }
})();
