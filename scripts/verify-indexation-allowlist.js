'use strict';

/**
 * Verify the indexation proposal without changing publication configuration.
 *
 * The proposal is intentionally pending user approval. This contract checks
 * that its evidence still describes the current publication set, while never
 * treating that evidence as approval to change config, sitemap, hreflang, or
 * routing.
 */
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const ROOT = path.join(__dirname, '..');
const allowlist = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/indexation-allowlist.json'), 'utf8'));
const config = require('../localization.config');
const seo = require('./seo-localization');

const VALID_STATUSES = new Set(['approved', 'pending_review', 'blocked']);
const expectedLocales = [...config.publishedLocales];
const expectedPages = [...config.publicPages];
const expectedLocaleSet = new Set(expectedLocales);
const expectedPageSet = new Set(expectedPages);
const expectedRoutes = [];

function pageName(page) {
  return page.replace(/\.html$/, '');
}

for (const page of expectedPages) {
  for (const locale of expectedLocales) {
    expectedRoutes.push({
      locale,
      page,
      path: new URL(seo.pageUrl(locale, page), seo.BASE_URL).pathname,
      url: seo.pageUrl(locale, page),
      file: seo.pageFile(locale, page),
    });
  }
}

const expectedRouteByPath = new Map(expectedRoutes.map((route) => [route.path, route]));
const expectedHreflangSet = new Set([...expectedLocales, 'x-default']);

function sha256(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(path.join(ROOT, file))).digest('hex');
}

function assertSameArray(actual, expected, message) {
  assert.deepEqual(actual, expected, message);
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, file), 'utf8'));
}

function assertHreflangBlock(block, route, label) {
  const tags = [...block.matchAll(/<xhtml:link\b[^>]*\bhreflang="([^"]+)"[^>]*\bhref="([^"]+)"[^>]*\/>/g)]
    .map((match) => ({ locale: match[1], href: match[2] }));
  assert.equal(tags.length, expectedHreflangSet.size, `${label}: hreflang count`);
  assert.equal(new Set(tags.map((tag) => tag.locale)).size, tags.length, `${label}: duplicate hreflang`);
  assertSameArray(
    tags.map((tag) => tag.locale).sort(),
    [...expectedHreflangSet].sort(),
    `${label}: hreflang locale set`,
  );
  for (const tag of tags) {
    const expectedUrl = tag.locale === 'x-default'
      ? seo.pageUrl(config.defaultLocale, route.page)
      : seo.pageUrl(tag.locale, route.page);
    assert.equal(tag.href, expectedUrl, `${label}: ${tag.locale} href`);
  }
}

function verifySchemaAndStatuses() {
  assert.equal(allowlist.$schema, 'https://json-schema.org/draft/2020-12/schema');
  assert.equal(allowlist.schemaVersion, 1);
  assert.equal(allowlist.artifactType, 'indexation-allowlist-proposal');
  assert.ok(allowlist.statusDefinitions && typeof allowlist.statusDefinitions === 'object');
  for (const status of VALID_STATUSES) assert.equal(typeof allowlist.statusDefinitions[status], 'string');

  assert.equal(allowlist.publicationDecision.status, 'pending_user_approval');
  assert.equal(allowlist.publicationDecision.currentPublicationMustRemainUnchanged, true);
  assertSameArray(allowlist.publicationDecision.approvedLocales, [], 'approved locale list must remain empty while policy is pending');
  assert.equal(allowlist.publicationDecision.approvedRouteCount, 0);

  const evidence = allowlist.currentPublicationEvidence;
  assertSameArray(evidence.publishedLocales, expectedLocales, 'published locale evidence');
  assert.equal(evidence.publishedLocaleCount, expectedLocales.length, 'published locale count');
  assertSameArray(evidence.publicPages, expectedPages, 'public page evidence');
  assert.equal(evidence.publicPageCount, expectedPages.length, 'public page count');
  assert.equal(evidence.routeSet.type, 'publishedLocales_x_publicPages');
  assert.equal(evidence.routeSet.expectedRouteCount, expectedRoutes.length, 'expected route count');
  assert.equal(expectedRoutes.length, 147, 'current publication route count');
  assert.equal(evidence.sitemap.urlCount, 147);
  assert.equal(evidence.sitemap.uniqueUrlCount, 147);
  assert.equal(evidence.sitemap.hreflangCountPerUrl, expectedHreflangSet.size);
  assert.equal(evidence.sitemap.includesXDefault, true);

  const statuses = allowlist.localeStatuses;
  assert.equal(statuses.length, expectedLocales.length, 'one locale status per published locale');
  assert.equal(new Set(statuses.map((entry) => entry.locale)).size, statuses.length, 'duplicate locale status');
  assertSameArray(statuses.map((entry) => entry.locale), expectedLocales, 'locale status order/coverage');

  for (const entry of statuses) {
    assert.ok(VALID_STATUSES.has(entry.status), `${entry.locale}: invalid locale status`);
    assert.equal(entry.automatedContractStatus, 'pass', `${entry.locale}: automated contract evidence`);
    assert.equal(entry.routeCount, expectedPages.length, `${entry.locale}: route count`);
  }

  const blockedLocales = statuses.filter((entry) => entry.status === 'blocked').map((entry) => entry.locale);
  const pendingLocales = statuses.filter((entry) => entry.status === 'pending_review').map((entry) => entry.locale);
  const approvedLocales = statuses.filter((entry) => entry.status === 'approved').map((entry) => entry.locale);
  assertSameArray(approvedLocales, allowlist.publicationDecision.approvedLocales, 'approved locale/status agreement');
  assertSameArray(blockedLocales, ['de', 'ja', 'tr'], 'documented blocked locales');
  assert.equal(pendingLocales.length, 18, 'remaining locales pending review');

  const routeNotes = allowlist.routeNotes;
  assert.equal(new Set(routeNotes.map((note) => note.path)).size, routeNotes.length, 'duplicate route note');
  for (const note of routeNotes) {
    assert.ok(expectedRouteByPath.has(note.path), `${note.path}: route note outside current route set`);
    assert.ok(VALID_STATUSES.has(note.status), `${note.path}: invalid route status`);
    assert.equal(typeof note.reason, 'string');
  }
  assert.equal(routeNotes.filter((note) => note.status === 'blocked').length, 15);
  assert.equal(routeNotes.find((note) => note.path === '/tr/refund-policy').status, 'blocked');
}

function verifyCurrentPublicationEvidence() {
  const evidence = allowlist.currentPublicationEvidence;
  for (const [file, expectedHash] of Object.entries(evidence.fileSha256)) {
    assert.equal(sha256(file), expectedHash, `${file}: publication evidence changed`);
  }

  const sitemap = fs.readFileSync(path.join(ROOT, evidence.sitemap.file), 'utf8');
  const blocks = [...sitemap.matchAll(/<url>[\s\S]*?<\/url>/g)].map((match) => match[0]);
  const locs = blocks.map((block, index) => {
    const matches = [...block.matchAll(/<loc>([^<]+)<\/loc>/g)];
    assert.equal(matches.length, 1, `sitemap url block ${index + 1}: loc count`);
    return matches[0][1];
  });
  assert.equal(blocks.length, expectedRoutes.length, 'sitemap route block count');
  assert.equal(new Set(locs).size, locs.length, 'sitemap duplicate loc');
  assertSameArray(locs, expectedRoutes.map((route) => route.url), 'sitemap exact route coverage');
  blocks.forEach((block, index) => assertHreflangBlock(block, expectedRoutes[index], `sitemap ${locs[index]}`));

  for (const route of expectedRoutes) {
    assert.ok(fs.existsSync(route.file), `${route.path}: published HTML file missing`);
    const html = fs.readFileSync(route.file, 'utf8');
    const tags = [...html.matchAll(/<link\b(?=[^>]*\brel\s*=\s*["']alternate["'])(?=[^>]*\bhreflang\s*=\s*["'][^"']+["'])[^>]*>/gi)]
      .map((match) => match[0]);
    assert.equal(tags.length, expectedHreflangSet.size, `${route.path}: HTML hreflang count`);
    const locales = tags.map((tag) => tag.match(/\bhreflang\s*=\s*["']([^"']+)["']/i)[1]);
    assertSameArray([...new Set(locales)].sort(), [...expectedHreflangSet].sort(), `${route.path}: HTML hreflang locale set`);
  }

  const vercel = readJson(evidence.routing.file);
  const destinations = (vercel.redirects || []).map((redirect) => String(redirect.destination || ''));
  for (const locale of expectedLocales.filter((entry) => entry !== config.defaultLocale)) {
    assert.ok(destinations.some((destination) => destination.includes(`/${locale}`)), `vercel routing missing ${locale}`);
  }
}

function verifySourceReviewGates() {
  const qa = fs.readFileSync(path.join(ROOT, 'docs/LOCALIZATION_QA.md'), 'utf8');
  assert.match(qa, /before indexing or production routing/i);

  const ja = fs.readFileSync(path.join(ROOT, 'docs/LOCALE_REVIEW_ja.md'), 'utf8');
  assert.match(ja, /private draft/i);
  assert.match(ja, /Approved for routing and indexing/);
  assert.match(ja, /All legal review remains pending/i);

  const de = fs.readFileSync(path.join(ROOT, 'docs/LOCALE_REVIEW_de.md'), 'utf8');
  assert.match(de, /private-preview/i);
  assert.match(de, /Production routing\/indexing: blocked until legal approval/i);

  const trRefund = fs.readFileSync(path.join(ROOT, 'tr/refund-policy.html'), 'utf8');
  assert.match(trRefund, /Notund/);
}

function verifyAutomatedContractEvidence() {
  const output = execFileSync(process.execPath, ['seo-repair-contract.test.js'], {
    cwd: ROOT,
    encoding: 'utf8',
  });
  assert.match(output, /SEO repair contract passes\./);
}

verifySchemaAndStatuses();
verifyCurrentPublicationEvidence();
verifySourceReviewGates();
verifyAutomatedContractEvidence();

console.log('Indexation allowlist schema and exact current 21-locale/147-route evidence pass.');
console.log('Publication decision pending user approval; localization config, sitemap, hreflang output, and routing remain unchanged.');
console.log('Locale status counts: approved=0 pending_review=18 blocked=3; blocked route notes=15.');
