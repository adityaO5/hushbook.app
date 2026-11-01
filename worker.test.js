'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { render } = require('./scripts/build-cloudflare-config');

const ROOT = __dirname;
const load = (file) => import(pathToFileURL(path.join(ROOT, file)).href);
const BROWSER_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15';

function request(url, { method = 'GET', country, cookie, userAgent = BROWSER_UA } = {}) {
  const headers = { 'user-agent': userAgent };
  if (cookie) headers.cookie = cookie;
  const req = new Request(url, { method, headers });
  if (country) req.cf = { country };
  return req;
}

function fakeEnv() {
  const calls = [];
  return {
    calls,
    ASSETS: {
      async fetch(req) {
        calls.push(req.url);
        return new Response('asset body', { status: 200, headers: { 'Content-Type': 'text/html' } });
      },
    },
  };
}

async function main() {
  const { BOT_USER_AGENT, localeRedirect } = await load('src/routing.mjs');
  const { TRACKING_PARAMS, normalizeTrackingRequest } = await load('src/tracking.mjs');
  const { default: worker } = await load('src/worker.mjs');
  const rules = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/locale-rules.json'), 'utf8'));

  for (const [file, content] of Object.entries(render())) {
    const committed = fs.readFileSync(path.join(ROOT, file), 'utf8').replace(/\r\n/g, '\n');
    assert.equal(committed, content, `${file} is stale: run node scripts/build-cloudflare-config.js`);
  }

  const route = (conditions) => localeRedirect({ pathname: '/', userAgent: BROWSER_UA, ...conditions }, rules);

  for (const [country, locale] of Object.entries(rules.countryLocales)) {
    assert.deepEqual(route({ country }), { status: 307, location: `/${locale}` }, `${country} must route to /${locale}`);
  }
  for (const locale of rules.cookieLocales) {
    assert.deepEqual(
      route({ cookieHeader: `theme=dark; hushbook_locale=${locale}` }),
      { status: 307, location: `/${locale}` },
      `cookie ${locale} must route to /${locale}`,
    );
  }
  assert.equal(rules.cookieLocales.includes('en'), false, 'en is the default locale, never a cookie redirect');
  assert.deepEqual(route({ country: 'JP', cookieHeader: 'hushbook_locale=de' }), { status: 307, location: '/de' }, 'cookie beats geo');
  assert.equal(route({ country: 'DE', cookieHeader: 'hushbook_locale=en' }), null, 'cookie en must suppress geo');
  assert.equal(route({ country: 'DE', cookieHeader: 'hushbook_locale=xx' }), null, 'unknown cookie must suppress geo');
  assert.equal(route({ country: 'US' }), null, 'unmapped country stays on /');
  assert.equal(route({}), null, 'no country, no cookie stays on /');

  const bots = BOT_USER_AGENT.source.replace(/^\(|\)$/g, '').split('|');
  for (const bot of ['Googlebot', 'Google-InspectionTool', 'bingbot', 'GPTBot', 'ClaudeBot', 'PerplexityBot', 'Amazonbot']) {
    assert.ok(bots.includes(bot), `${bot} must be in BOT_USER_AGENT`);
  }
  for (const bot of bots) {
    for (const userAgent of [`Mozilla/5.0 (compatible; ${bot}/2.1; +https://example.com/bot)`, bot.toLowerCase()]) {
      assert.equal(route({ country: 'DE', cookieHeader: 'hushbook_locale=fr', userAgent }), null, `${userAgent} must not be redirected`);
    }
  }

  for (const pathname of ['/blog', '/de', '/about', '/index.html']) {
    assert.equal(
      localeRedirect({ pathname, country: 'DE', cookieHeader: 'hushbook_locale=fr', userAgent: BROWSER_UA }, rules),
      null,
      `${pathname} must not be locale-redirected`,
    );
  }

  const tracked = (url, options) => normalizeTrackingRequest(request(url, options));
  const expectTracking = (url, location) => {
    const response = tracked(url);
    assert.ok(response, `${url} must be normalized`);
    assert.equal(response.status, 308, url);
    assert.equal(response.headers.get('location'), location, url);
    assert.equal(response.headers.get('cache-control'), 'public, max-age=3600', url);
  };
  expectTracking('https://hushbook.app/utm_source=chatgpt', '/?utm_source=chatgpt');
  expectTracking('https://hushbook.app/blog/utm_source=x&utm_medium=y', '/blog?utm_source=x&utm_medium=y');
  expectTracking('https://hushbook.app/UTM_SOURCE=ChatGPT&Ref=Launch', '/?UTM_SOURCE=ChatGPT&Ref=Launch');
  const spoofed = new Request('https://hushbook.app/utm_source=x', { headers: { 'x-forwarded-host': 'evil.example' } });
  assert.equal(normalizeTrackingRequest(spoofed).headers.get('location'), '/?utm_source=x', 'X-Forwarded-Host must not steer the redirect');
  assert.equal(tracked('https://hushbook.app/about=team'), null, 'unknown param must pass through');
  assert.equal(tracked('https://hushbook.app/utm_source='), null, 'empty value must pass through');
  assert.equal(tracked('https://hushbook.app/utm_source=x', { method: 'POST' }), null, 'POST must pass through');
  assert.equal(tracked('https://hushbook.app/?utm_source=x'), null, 'valid query must pass through');
  assert.equal(tracked('https://hushbook.app/assets/utm_source=x'), null, '/assets/ is excluded like the Vercel matcher');
  assert.equal(tracked('https://hushbook.app/utm_source=x', { method: 'HEAD' }).status, 308, 'HEAD is normalized');
  assert.ok(TRACKING_PARAMS.includes('utm_source') && TRACKING_PARAMS.includes('_gl'));

  let env = fakeEnv();
  let response = await worker.fetch(request('https://hushbook.app/', { country: 'DE' }), env);
  assert.equal(response.status, 307);
  assert.equal(response.headers.get('location'), '/de');
  assert.equal(response.headers.get('cache-control'), 'private, no-store');
  assert.equal(response.headers.get('vary'), 'Cookie, User-Agent');
  assert.equal(env.calls.length, 0, 'locale redirect must not touch ASSETS');

  response = await worker.fetch(request('https://hushbook.app/?utm_source=chatgpt', { cookie: 'hushbook_locale=pt-BR' }), env);
  assert.equal(response.headers.get('location'), '/pt-BR?utm_source=chatgpt', 'locale redirect keeps the query string');

  response = await worker.fetch(request('https://hushbook.app/', { country: 'DE', userAgent: 'Googlebot/2.1' }), env);
  assert.equal(response.status, 200, 'Googlebot gets the English homepage');
  assert.equal(env.calls.length, 1);

  response = await worker.fetch(request('https://hushbook.app/blog/utm_source=x'), env);
  assert.equal(response.status, 308);
  assert.equal(response.headers.get('location'), '/blog?utm_source=x');
  assert.equal(env.calls.length, 1, 'tracking redirect must not touch ASSETS');

  env = fakeEnv();
  response = await worker.fetch(request('https://hushbook.app/about'), env);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('x-robots-tag'), null, 'hushbook.app stays indexable');
  assert.equal(await response.text(), 'asset body');

  response = await worker.fetch(request('https://hushbook.someone.workers.dev/about'), env);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('x-robots-tag'), 'noindex, nofollow', 'workers.dev must be noindex');
  assert.equal(response.headers.get('content-type'), 'text/html');
  assert.equal(await response.text(), 'asset body');
  assert.equal(env.calls.length, 2);

  console.log('Cloudflare Worker routing, tracking and noindex contract passes.');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
