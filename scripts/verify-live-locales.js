'use strict';
const https = require('node:https');

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let body = '';
        res.on('data', (c) => (body += c));
        res.on('end', () => resolve({ status: res.statusCode, body }));
      })
      .on('error', reject);
  });
}

(async () => {
  for (const path of ['/tr', '/fr', '/uk', '/vi', '/th']) {
    const { status, body } = await get(`https://hushbook.app${path}`);
    const style = body.includes('<style') || body.includes('.nav{');
    const fffd = (body.match(/\uFFFD/g) || []).length;
    const spam = /About About About|Made for Made for Made/.test(body);
    const h1 = (body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1]
      ?.replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 70);
    const big = (body.match(/class="big"[^>]*>([\s\S]*?)<\/h2>/) || [])[1]
      ?.replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 60);
    const diamond = body.includes('�') || /T\uFFFDl|priv\uFFFD|accessibilit/.test(body);
    console.log(`${path} status=${status} style=${style} fffd=${fffd} spam=${spam}`);
    console.log(`  h1: ${h1}`);
    console.log(`  big: ${big}`);
  }
})();
