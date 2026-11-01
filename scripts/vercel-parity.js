'use strict';

/**
 * One-off check that the Cloudflare stack (src/routing.mjs + src/locale-rules.json,
 * _redirects, _headers) reproduces every vercel.json redirect and header rule.
 * Delete together with vercel.json.
 *
 * Usage: node scripts/vercel-parity.js
 */
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { parseRedirects, parseHeaders } = require('./build-cloudflare-config');

const ROOT = path.join(__dirname, '..');
const BROWSER_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';
const read = (file) => fs.readFileSync(path.join(ROOT, file), 'utf8');
const same = (actual, expected) => JSON.stringify(actual) === JSON.stringify(expected);
const isDynamic = (source) => /[*:]/.test(source);

/** vercel.json source -> Cloudflare path(s). */
function cloudflarePaths(source) {
  if (source === '/(.*)') return ['/*'];
  const group = source.match(/^\/:path\(([^)]+)\)$/);
  if (group) return group[1].split('|').map((page) => `/${page}`);
  return [source.replace(/\/\(\.\*\)$/, '/*').replace(/\/:path\*$/, '/*')];
}

async function main() {
  const vercel = JSON.parse(read('vercel.json'));
  const rules = JSON.parse(read('src/locale-rules.json'));
  const redirects = parseRedirects(read('_redirects'));
  const headers = parseHeaders(read('_headers'));
  const { BOT_USER_AGENT, localeRedirect } = await import(pathToFileURL(path.join(ROOT, 'src/routing.mjs')).href);

  const failures = [];
  const check = (ok, message) => {
    if (!ok) failures.push(message);
  };
  const counts = { cookie: 0, geo: 0, plain: 0, skipped: 0 };
  const route = (conditions) => localeRedirect({ pathname: '/', userAgent: BROWSER_UA, ...conditions }, rules);
  const coveredCookies = new Set();
  const coveredCountries = new Set();
  const matchedLines = [];

  for (const rule of vercel.redirects) {
    const status = rule.statusCode || (rule.permanent ? 308 : 307);
    const has = rule.has || [];
    const missing = rule.missing || [];
    const label = `${rule.source} -> ${rule.destination} ${JSON.stringify(has)}`;

    const host = has.find((condition) => condition.type === 'host');
    if (host) {
      counts.skipped += 1;
      console.log(`skip: ${rule.source} -> ${rule.destination} on host ${host.value} (www has no DNS record)`);
      continue;
    }

    const cookie = has.find((condition) => condition.type === 'cookie' && condition.key === 'hushbook_locale');
    const geo = has.find((condition) => condition.type === 'header' && condition.key === 'x-vercel-ip-country');
    if (has.length !== (cookie || geo ? 1 : 0)) {
      check(false, `${label}: unsupported has condition`);
      continue;
    }

    if (!cookie && !geo) {
      check(missing.length === 0, `${label}: unsupported missing condition`);
      const expected = {
        source: rule.source.replace(/\/:path\*$/, '/*'),
        destination: rule.destination.replace(/\/:path\*$/, '/:splat'),
        status,
      };
      const index = redirects.findIndex((line) => same(line, expected));
      check(index !== -1, `${label}: _redirects has no "${expected.source} ${expected.destination} ${status}"`);
      if (index !== -1) matchedLines.push(index);
      counts.plain += 1;
      continue;
    }

    check(rule.source === '/', `${label}: the Worker only routes /`);
    check(status === 307, `${label}: locale redirects are 307`);
    const expected = { status: 307, location: rule.destination };
    const ua = missing.find((condition) => condition.type === 'header' && condition.key === 'user-agent');
    const bots = ua ? ua.value.replace(/^\(\?i\)\(|\)$/g, '').split('|') : [];
    check(Boolean(ua), `${label}: crawlers must be exempt`);
    if (ua) {
      check(BOT_USER_AGENT.source === ua.value.replace(/^\(\?i\)/, '') && BOT_USER_AGENT.flags.includes('i'), `${label}: BOT_USER_AGENT differs`);
    }

    if (cookie) {
      const cookieHeader = `hushbook_locale=${cookie.value}`;
      check(same(route({ cookieHeader }), expected), `${label}: cookie ${cookie.value}`);
      for (const bot of bots) check(route({ cookieHeader, userAgent: `${bot}/1.0` }) === null, `${label}: ${bot} must pass`);
      coveredCookies.add(cookie.value);
      counts.cookie += 1;
      continue;
    }

    check(missing.some((condition) => condition.type === 'cookie' && condition.key === 'hushbook_locale' && !condition.value), `${label}: expected missing cookie`);
    for (const country of geo.value.split('|')) {
      check(same(route({ country }), expected), `${label}: country ${country}`);
      check(route({ country, cookieHeader: 'hushbook_locale=en' }) === null, `${label}: ${country} with cookie en must pass`);
      check(route({ country, cookieHeader: 'hushbook_locale=xx' }) === null, `${label}: ${country} with any cookie must pass`);
      for (const bot of bots) check(route({ country, userAgent: `${bot}/1.0` }) === null, `${label}: ${bot} must pass`);
      coveredCountries.add(country);
    }
    counts.geo += 1;
  }

  check(same([...coveredCookies].sort(), [...rules.cookieLocales].sort()), 'cookieLocales differ from vercel.json cookie rules');
  check(same([...coveredCountries].sort(), Object.keys(rules.countryLocales).sort()), 'countryLocales differ from vercel.json geo rules');
  redirects.forEach((line, index) => {
    check(matchedLines.includes(index), `_redirects line "${line.source} ${line.destination} ${line.status}" has no vercel.json rule`);
  });
  const dynamicOrder = matchedLines.filter((index) => isDynamic(redirects[index].source));
  check(same(dynamicOrder, [...dynamicOrder].sort((a, b) => a - b)), '_redirects dynamic rules are out of vercel.json order');
  const staticCount = redirects.filter((line) => !isDynamic(line.source)).length;
  check(redirects.slice(0, staticCount).every((line) => !isDynamic(line.source)), '_redirects static rules must precede dynamic rules');
  check(staticCount <= 2000 && redirects.length - staticCount <= 100, '_redirects exceeds Cloudflare limits');

  const expectedHeaders = new Map();
  let headerRules = 0;
  for (const rule of vercel.headers) {
    const host = (rule.has || []).find((condition) => condition.type === 'host');
    let paths;
    if (host) {
      check(/vercel\\?\.app/.test(host.value), `${rule.source}: unsupported host ${host.value}`);
      paths = [...headers.keys()].filter((source) => /^https:\/\/.*\.workers\.dev\/\*$/.test(source));
      check(paths.length === 1, `${rule.source} on ${host.value}: _headers needs one workers.dev rule`);
    } else {
      check(!rule.has && !rule.missing, `${rule.source}: unsupported condition`);
      paths = cloudflarePaths(rule.source);
    }
    for (const source of paths) {
      const entry = expectedHeaders.get(source) || {};
      for (const { key, value } of rule.headers) entry[key.toLowerCase()] = value;
      expectedHeaders.set(source, entry);
    }
    headerRules += 1;
  }
  for (const [source, entry] of expectedHeaders) {
    check(same(headers.get(source), entry), `_headers ${source}: expected ${JSON.stringify(entry)}, got ${JSON.stringify(headers.get(source))}`);
  }
  for (const source of headers.keys()) {
    check(expectedHeaders.has(source), `_headers ${source} has no vercel.json rule`);
  }
  check(headers.size <= 100, '_headers exceeds 100 rules');

  const replayed = counts.cookie + counts.geo + counts.plain;
  console.log(
    `Redirects: ${replayed}/${vercel.redirects.length} replayed (${counts.cookie} cookie, ${counts.geo} geo via localeRedirect; ` +
    `${counts.plain} plain via _redirects), ${counts.skipped} skipped.`,
  );
  console.log(`Headers: ${headerRules}/${vercel.headers.length} rules replayed as ${headers.size} _headers paths.`);
  if (failures.length) {
    for (const failure of failures) console.error(`MISMATCH ${failure}`);
    console.error(`${failures.length} mismatch(es).`);
    process.exitCode = 1;
    return;
  }
  console.log('Vercel parity passes: 0 mismatches.');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
