'use strict';

/**
 * update-baselines.js
 * Updates seo-repair-body-baseline.json and seo-repair-download-metadata.json
 * to include a "worktree" snapshot matching current working tree state.
 *
 * Usage: node scripts/update-baselines.js
 */

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const localeConfig = require('../localization.config');

const ROOT = path.join(__dirname, '..');
const BODY_BASELINE_PATH = path.join(ROOT, 'output', 'seo-repair-body-baseline.json');
const DOWNLOAD_METADATA_PATH = path.join(ROOT, 'output', 'seo-repair-download-metadata.json');

function toPosix(p) { return p.replace(/\\/g, '/'); }

function sha256Normalize(html) {
  const normalized = html.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  return crypto.createHash('sha256').update(normalized, 'utf8').digest('hex');
}

function postHeadBodySha256(html) {
  const headClose = html.search(/<\/head>/i);
  assert.notEqual(headClose, -1, 'HTML must contain </head>');
  return sha256Normalize(html.slice(headClose + '</head>'.length));
}

function readHtmlFile(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
}

function getTitle(html) {
  const m = html.match(/<title>([^<]+)<\/title>/i);
  return m ? m[1].trim() : null;
}

function getMetaDescription(html) {
  const m = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  return m ? m[1].trim() : null;
}

function expectedRoutePaths() {
  const routes = [];
  for (const locale of localeConfig.publishedLocales) {
    for (const page of localeConfig.publicPages) {
      routes.push(toPosix(locale === localeConfig.defaultLocale ? page : path.join(locale, page)));
    }
  }
  for (const page of localeConfig.englishOnlyPages || []) {
    routes.push(toPosix(page));
  }
  return routes.sort((a, b) => a.localeCompare(b));
}

function expectedDownloadPaths() {
  if (!localeConfig.publicPages.includes('download.html')) return [];
  return localeConfig.publishedLocales
    .map((locale) => toPosix(locale === localeConfig.defaultLocale ? 'download.html' : path.join(locale, 'download.html')))
    .sort((a, b) => a.localeCompare(b));
}

// ── 1. Update body baseline ─────────────────────────────────────────────────

const routePaths = expectedRoutePaths();
const bodyBaseline = JSON.parse(fs.readFileSync(BODY_BASELINE_PATH, 'utf8'));

// Build current worktree hashes
const worktreeRoutes = {};
for (const rel of routePaths) {
  const html = readHtmlFile(rel);
  worktreeRoutes[rel] = postHeadBodySha256(html);
}

// Ensure snapshots object exists
if (!bodyBaseline.snapshots || typeof bodyBaseline.snapshots !== 'object') {
  bodyBaseline.snapshots = {};
}

// Replace worktree snapshot
bodyBaseline.snapshots.worktree = {
  schemaVersion: 1,
  routeCount: routePaths.length,
  routes: worktreeRoutes,
};

fs.writeFileSync(BODY_BASELINE_PATH, `${JSON.stringify(bodyBaseline, null, 2)}\n`, 'utf8');
console.log(`Updated ${path.relative(ROOT, BODY_BASELINE_PATH)} — worktree snapshot with ${routePaths.length} routes.`);

// ── 2. Update download metadata baseline ────────────────────────────────────

const downloadPaths = expectedDownloadPaths();
const downloadMetadata = JSON.parse(fs.readFileSync(DOWNLOAD_METADATA_PATH, 'utf8'));

const nextDownloadRoutes = {};
let updatedCount = 0;
for (const rel of downloadPaths) {
  const html = readHtmlFile(rel);
  const title = getTitle(html);
  const description = getMetaDescription(html);
  if (!title || !description) {
    console.warn(`WARNING: ${rel} — could not extract title or description`);
    continue;
  }
  const existing = downloadMetadata.routes[rel] || {};
  const productToken = existing.productToken || 'HushBook';
  nextDownloadRoutes[rel] = { title, description, productToken };
  updatedCount++;
}
downloadMetadata.routes = nextDownloadRoutes;
downloadMetadata.routeCount = downloadPaths.length;

fs.writeFileSync(DOWNLOAD_METADATA_PATH, `${JSON.stringify(downloadMetadata, null, 2)}\n`, 'utf8');
console.log(`Updated ${path.relative(ROOT, DOWNLOAD_METADATA_PATH)} — ${updatedCount} routes refreshed.`);
