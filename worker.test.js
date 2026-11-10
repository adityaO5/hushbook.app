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

  const { DOWNLOADS, downloadEvent } = await load('src/downloads.mjs');
  const dl = (url, headers = {}, method = 'GET') => {
    const req = new Request(url, { method, headers: { 'user-agent': BROWSER_UA, ...headers } });
    req.cf = { country: 'SE' };
    return req;
  };
  const source = (url, headers) => downloadEvent(dl(url, headers)).row;

  let row = source('https://hushbook.app/dl/windows?utm_source=Reddit&utm_medium=Social&utm_campaign=launch&r=https%3A%2F%2Fwww.reddit.com%2Fr%2Faudiobooks%2F%3Fx%3D1', { referer: 'https://hushbook.app/desktop?utm_source=Reddit' });
  assert.equal(row.src, 'reddit', 'utm_source wins and is lowercased');
  assert.equal(row.medium, 'social');
  assert.equal(row.campaign, 'launch');
  assert.equal(row.referrer, 'https://www.reddit.com/r/audiobooks/', 'referrer drops its query string');
  assert.equal(row.page, '/desktop');
  assert.equal(row.country, 'SE');
  assert.equal(row.bot, 0);
  assert.equal(source('https://hushbook.app/dl/windows?ref=producthunt').src, 'producthunt', 'ref names the source');
  assert.equal(source('https://hushbook.app/dl/windows?r=https%3A%2F%2Fwww.producthunt.com%2Fposts%2Fhushbook').src, 'producthunt.com', 'landing referrer host names the source');
  assert.equal(source('https://hushbook.app/dl/windows', { referer: 'https://news.ycombinator.com/item?id=1' }).src, 'news.ycombinator.com', 'a link straight to /dl counts its referrer');
  row = source('https://hushbook.app/dl/windows?from=%2Fblog%2Fcan-kindle-read-to-you&r=https%3A%2F%2Fhushbook.app%2F', { referer: 'https://hushbook.app/desktop' });
  assert.equal(row.src, 'direct', 'the site itself is never a source');
  assert.equal(row.prev, '/blog/can-kindle-read-to-you');
  assert.equal(row.referrer, '');
  assert.equal(source('https://hushbook.app/dl/windows?r=javascript%3Aalert(1)').src, 'direct', 'non-http referrer is ignored');
  assert.equal(source('https://hushbook.app/dl/windows?utm_source=' + 'x'.repeat(500)).src.length, 80, 'values are clipped');
  for (const userAgent of ['node', 'facebookexternalhit/1.1', 'Mozilla/5.0 (compatible; SemrushBot/7~bl)', 'RiverBot/1.0', 'curl/8.4.0']) {
    assert.equal(source('https://hushbook.app/dl/windows', { 'user-agent': userAgent }).bot, 1, `"${userAgent}" must be flagged as a bot`);
  }
  assert.equal(downloadEvent(dl('https://hushbook.app/dl/macos')), null, 'unknown platform passes through');
  assert.equal(downloadEvent(dl('https://hushbook.app/dl/windows/extra')), null);
  assert.equal(downloadEvent(dl('https://hushbook.app/dl/windows', {}, 'POST')), null, 'POST passes through');

  const fakeDb = (fail) => {
    const rows = [];
    return { rows, prepare: () => ({ bind: (...values) => ({ run: async () => { if (fail) throw new Error('d1 down'); rows.push(values); } }) }) };
  };
  const ctx = () => { const pending = []; return { pending, waitUntil: (p) => pending.push(p) }; };

  env = { ...fakeEnv(), DB: fakeDb() };
  let context = ctx();
  response = await worker.fetch(dl('https://hushbook.app/dl/windows?utm_source=x'), env, context);
  await Promise.all(context.pending);
  assert.equal(response.status, 302);
  assert.equal(response.headers.get('location'), DOWNLOADS.windows);
  assert.equal(response.headers.get('cache-control'), 'private, no-store', 'a cached redirect would skip the log');
  assert.equal(response.headers.get('x-robots-tag'), 'noindex, nofollow');
  assert.equal(env.DB.rows.length, 1, 'GET writes one row');
  assert.equal(env.DB.rows[0][2], 'x');
  assert.equal(env.calls.length, 0, 'download redirect must not touch ASSETS');

  response = await worker.fetch(dl('https://hushbook.app/dl/windows', {}, 'HEAD'), env, context);
  response = await worker.fetch(dl('https://hushbook.app/dl/windows', { 'sec-purpose': 'prefetch' }), env, context);
  assert.equal(response.status, 302);
  assert.equal(env.DB.rows.length, 1, 'HEAD and prefetch are not counted');

  env = { ...fakeEnv(), DB: fakeDb(true) };
  context = ctx();
  const consoleError = console.error;
  console.error = () => {};
  response = await worker.fetch(dl('https://hushbook.app/dl/windows'), env, context);
  await Promise.all(context.pending);
  console.error = consoleError;
  assert.equal(response.headers.get('location'), DOWNLOADS.windows, 'a failed log must not block the download');
  response = await worker.fetch(dl('https://hushbook.app/dl/windows'), fakeEnv());
  assert.equal(response.status, 302, 'no DB binding and no ctx still redirects');

  const wrangler = fs.readFileSync(path.join(ROOT, 'wrangler.jsonc'), 'utf8');
  assert.ok(/"run_worker_first":\s*\[[^\]]*"\/dl\/\*"/.test(wrangler), '/dl/* must reach the Worker');
  assert.ok(/"binding":\s*"DB"/.test(wrangler), 'DB binding must exist');
  assert.ok(fs.readFileSync(path.join(ROOT, '.assetsignore'), 'utf8').includes('/migrations/'), 'migrations must not ship as assets');
  const desktop = fs.readFileSync(path.join(ROOT, 'desktop.html'), 'utf8');
  assert.equal((desktop.match(/<a [^>]*href="\/dl\/windows"[^>]*data-dl="windows"/g) || []).length, 2, 'both Windows buttons go through /dl/windows');
  assert.equal(/<a [^>]*href="[^"]*HushBook-Setup\.exe/.test(desktop), false, 'no button may bypass the download log');

  console.log('Cloudflare Worker routing, tracking, download log and noindex contract passes.');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
