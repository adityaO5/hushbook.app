'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const localeConfig = require('./localization.config');

const ROOT = __dirname;
const BASE_URL = 'https://hushbook.app';
const DOWNLOAD_IMAGE_PATH = 'assets/img/og-hushbook.webp';
const DOWNLOAD_IMAGE_URL = `${BASE_URL}/${DOWNLOAD_IMAGE_PATH}`;
const DOWNLOAD_PAGE = 'download.html';
const BODY_BASELINE_PATH = path.join(ROOT, 'output', 'seo-repair-body-baseline.json');
const DOWNLOAD_METADATA_PATH = path.join(ROOT, 'output', 'seo-repair-download-metadata.json');
const REPLACEMENT_MAP_PATH = path.join(ROOT, 'data', 'seo-repair-replacements.json');
const CORRUPTION_TOKENS = ['BushBook', 'HuhBook', 'HBTER2X', 'HBOPEXIX'];

function readJson(jsonPath) {
  return JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
}

const BODY_BASELINE = Object.freeze(readJson(BODY_BASELINE_PATH));
const DOWNLOAD_METADATA_BASELINE = Object.freeze(readJson(DOWNLOAD_METADATA_PATH));
const REPLACEMENT_MAP = Object.freeze(readJson(REPLACEMENT_MAP_PATH));

function toPosix(relativePath) {
  return relativePath.replace(/\\/g, '/');
}

function sha256(value) {
  const normalized = value.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  return crypto.createHash('sha256').update(normalized, 'utf8').digest('hex');
}

function pagePath(locale, file) {
  const stem = file.replace(/\.html$/, '');
  if (locale === localeConfig.defaultLocale) {
    return stem === 'index' ? '/' : `/${stem}`;
  }
  return stem === 'index' ? `/${locale}` : `/${locale}/${stem}`;
}

function pageUrl(locale, file) {
  return `${BASE_URL}${pagePath(locale, file)}`;
}

function expectedRoutePaths() {
  const routes = [];
  for (const locale of localeConfig.publishedLocales) {
    for (const page of localeConfig.publicPages) {
      routes.push(toPosix(locale === localeConfig.defaultLocale ? page : path.join(locale, page)));
    }
  }
  return routes.sort((left, right) => left.localeCompare(right));
}

function expectedDownloadPaths() {
  return localeConfig.publishedLocales
    .map((locale) => toPosix(locale === localeConfig.defaultLocale ? DOWNLOAD_PAGE : path.join(locale, DOWNLOAD_PAGE)))
    .sort((left, right) => left.localeCompare(right));
}

function pageFile(locale, file) {
  return locale === localeConfig.defaultLocale
    ? path.join(ROOT, file)
    : path.join(ROOT, locale, file);
}

function readHtml(locale, file) {
  return fs.readFileSync(pageFile(locale, file), 'utf8');
}

function parseAttributes(tag) {
  const attributes = {};
  for (const match of tag.matchAll(/([A-Za-z_:][A-Za-z0-9:._-]*)\s*=\s*("([^"]*)"|'([^']*)')/g)) {
    attributes[match[1].toLowerCase()] = match[3] ?? match[4] ?? '';
  }
  return attributes;
}

function collectMetaTags(html) {
  return [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) => parseAttributes(match[0]));
}

function getMetaEntries(html, attributeName, attributeValue) {
  return collectMetaTags(html).filter((entry) => entry[attributeName] === attributeValue);
}

function splitHeadBoundary(html) {
  const headClose = html.search(/<\/head>/i);
  assert.notEqual(headClose, -1, 'HTML must contain </head>');
  const boundary = headClose + '</head>'.length;
  return {
    head: html.slice(0, boundary),
    body: html.slice(boundary),
  };
}

function getSingleMatch(html, pattern) {
  const globalPattern = pattern.global ? pattern : new RegExp(pattern.source, `${pattern.flags}g`);
  const matches = [...html.matchAll(globalPattern)];
  return matches.length === 1 ? matches[0][1] : null;
}

function getTitle(html) {
  return getSingleMatch(html, /<title>([^<]*)<\/title>/i);
}

function getMetaDescription(html) {
  return getSingleMatch(html, /<meta\s+name="description"\s+content="([^"]*)"\s*\/?>/i);
}

function getCanonicalHref(html) {
  return getSingleMatch(html, /<link\s+rel="canonical"\s+href="([^"]+)"\s*\/?>/i);
}

function getHtmlAttributes(html) {
  const match = html.match(/<html\b([^>]*)>/i);
  return match ? parseAttributes(match[1]) : null;
}

function extractNotundContexts(html) {
  const token = 'Notund';
  const contexts = [];
  let start = 0;
  while (start < html.length) {
    const index = html.indexOf(token, start);
    if (index === -1) break;
    const snippet = html
      .slice(Math.max(0, index - 40), Math.min(html.length, index + token.length + 40))
      .replace(/\s+/g, ' ')
      .trim();
    contexts.push(snippet);
    start = index + token.length;
  }
  return contexts;
}

const CONTEXTUAL_NOTUND_ALLOWLIST = Object.freeze(
  Object.fromEntries(
    (REPLACEMENT_MAP.blockedReviews ?? [])
      .filter((entry) => entry.artifact === 'Notund' && entry.review?.status === 'blocked')
      .map((entry) => {
        const tokenIndex = entry.oldText.indexOf('Notund');
        const fragment = entry.oldText.slice(
          Math.max(0, tokenIndex - 20),
          Math.min(entry.oldText.length, tokenIndex + 'Notund'.length + 40),
        );
        return [toPosix(entry.file), [fragment.replace(/\s+/g, ' ').trim()]];
      }),
  ),
);

function postHeadBodySha256(html) {
  const headClose = html.search(/<\/head>/i);
  assert.notEqual(headClose, -1, 'HTML must contain </head>');
  return sha256(html.slice(headClose + '</head>'.length));
}

function describeValue(value) {
  const serialized = JSON.stringify(value);
  return serialized.length <= 160 ? serialized : `${serialized.slice(0, 157)}..."`;
}

function assertExactRouteKeys(label, artifact, expectedKeys) {
  assert.equal(artifact.schemaVersion, 1, `${label} schemaVersion must be 1`);
  assert.equal(artifact.routeCount, expectedKeys.length, `${label} routeCount must equal expected route count`);
  assert.ok(artifact.routes && typeof artifact.routes === 'object' && !Array.isArray(artifact.routes), `${label} routes must be object`);
  const actualKeys = Object.keys(artifact.routes).sort((left, right) => left.localeCompare(right));
  assert.deepEqual(actualKeys, expectedKeys, `${label} routes must match published locale/page set exactly`);
}

function assertBodyBaseline(artifact, expectedKeys) {
  const states = artifact.snapshots && typeof artifact.snapshots === 'object' && !Array.isArray(artifact.snapshots)
    ? Object.entries(artifact.snapshots)
    : [['default', artifact]];
  assert.ok(states.length > 0, 'Body baseline must contain at least one state');
  for (const [state, stateArtifact] of states) {
    assertExactRouteKeys(`Body baseline ${state}`, stateArtifact, expectedKeys);
    for (const relativePath of expectedKeys) {
      assert.match(
        stateArtifact.routes[relativePath],
        /^[a-f0-9]{64}$/,
        `Body baseline ${state} ${relativePath} must contain a SHA-256 hash`,
      );
    }
  }
}

function bodyBaselineStates(artifact) {
  if (artifact.snapshots && typeof artifact.snapshots === 'object' && !Array.isArray(artifact.snapshots)) {
    return Object.entries(artifact.snapshots);
  }
  return [['default', artifact]];
}

function selectBodyBaselineRoutes(artifact, expectedKeys) {
  const actual = Object.fromEntries(expectedKeys.map((relativePath) => [
    relativePath,
    postHeadBodySha256(readHtml('', relativePath)),
  ]));
  const matches = bodyBaselineStates(artifact).filter(([, stateArtifact]) => (
    expectedKeys.every((relativePath) => stateArtifact.routes[relativePath] === actual[relativePath])
  ));
  assert.equal(
    matches.length,
    1,
    `Current files must match exactly one body baseline state; matched ${matches.map(([state]) => state).join(', ') || 'none'}`,
  );
  return matches[0][1].routes;
}

function assertDownloadMetadataBaseline(artifact, expectedKeys) {
  assertExactRouteKeys('Download metadata baseline', artifact, expectedKeys);
  for (const relativePath of expectedKeys) {
    const metadata = artifact.routes[relativePath];
    assert.ok(metadata && typeof metadata === 'object' && !Array.isArray(metadata), `${relativePath} download metadata baseline must be object`);
    for (const field of ['title', 'description', 'productToken']) {
      assert.equal(typeof metadata[field], 'string', `${relativePath} download metadata ${field} must be string`);
      assert.notEqual(metadata[field].trim(), '', `${relativePath} download metadata ${field} must be non-empty`);
    }
    assert.ok(
      metadata.title.includes(metadata.productToken),
      `${relativePath} download metadata title must include product token ${describeValue(metadata.productToken)}`,
    );
    assert.ok(
      metadata.description.includes(metadata.productToken),
      `${relativePath} download metadata description must include product token ${describeValue(metadata.productToken)}`,
    );
  }
}

assert.ok(
  fs.existsSync(path.join(ROOT, DOWNLOAD_IMAGE_PATH)),
  `${DOWNLOAD_IMAGE_PATH} must exist for download social metadata contract`,
);

const EXPECTED_ROUTE_PATHS = expectedRoutePaths();
const EXPECTED_DOWNLOAD_PATHS = expectedDownloadPaths();
assertBodyBaseline(BODY_BASELINE, EXPECTED_ROUTE_PATHS);
const BODY_BASELINE_ROUTES = selectBodyBaselineRoutes(BODY_BASELINE, EXPECTED_ROUTE_PATHS);
assertDownloadMetadataBaseline(DOWNLOAD_METADATA_BASELINE, EXPECTED_DOWNLOAD_PATHS);

const issues = [];

for (const locale of localeConfig.publishedLocales) {
  for (const page of localeConfig.publicPages) {
    const relativePath = toPosix(locale === localeConfig.defaultLocale ? page : path.join(locale, page));
    const html = readHtml(locale, page);
    const { head, body } = splitHeadBoundary(html);
    const expectedBodyHash = BODY_BASELINE_ROUTES[relativePath];
    const actualBodyHash = postHeadBodySha256(html);

    if (actualBodyHash !== expectedBodyHash) {
      issues.push(`${relativePath} post-head body hash changed for a head-only repair page.`);
    }

    const ogTypeEntries = getMetaEntries(head, 'property', 'og:type');
    if (ogTypeEntries.length !== 1) {
      issues.push(`${relativePath} must have exactly one og:type meta tag; found ${ogTypeEntries.length}.`);
    } else if (ogTypeEntries[0].content !== 'website') {
      issues.push(`${relativePath} og:type must be "website"; found ${describeValue(ogTypeEntries[0].content)}.`);
    }
    if (getMetaEntries(body, 'property', 'og:type').length !== 0) {
      issues.push(`${relativePath} og:type meta tag must stay inside <head>.`);
    }

    const twitterCardEntries = getMetaEntries(head, 'name', 'twitter:card');
    if (twitterCardEntries.length !== 1) {
      issues.push(`${relativePath} must have exactly one twitter:card meta tag; found ${twitterCardEntries.length}.`);
    } else if (twitterCardEntries[0].content !== 'summary_large_image') {
      issues.push(`${relativePath} twitter:card must be "summary_large_image"; found ${describeValue(twitterCardEntries[0].content)}.`);
    }
    if (getMetaEntries(body, 'name', 'twitter:card').length !== 0) {
      issues.push(`${relativePath} twitter:card meta tag must stay inside <head>.`);
    }

    if (html.includes('\uFFFD')) {
      issues.push(`${relativePath} contains U+FFFD replacement characters.`);
    }

    for (const token of CORRUPTION_TOKENS) {
      if (html.includes(token)) {
        issues.push(`${relativePath} contains corruption token ${JSON.stringify(token)}.`);
      }
    }

    const notundContexts = extractNotundContexts(html);
    if (notundContexts.length > 0) {
      const approvedContexts = CONTEXTUAL_NOTUND_ALLOWLIST[relativePath] ?? [];
      const unknownContexts = notundContexts.filter((context) => {
        const normalizedContext = context.replace(/\s+/g, ' ').trim();
        return !approvedContexts.some((approvedContext) => normalizedContext.includes(approvedContext));
      });
      if (unknownContexts.length > 0) {
        issues.push(`${relativePath} contains unapproved Notund context(s): ${unknownContexts.map((context) => JSON.stringify(context)).join(', ')}.`);
      }
    }

    if (page === DOWNLOAD_PAGE) {
      const expectedDownloadMetadata = DOWNLOAD_METADATA_BASELINE.routes[relativePath];
      const title = getTitle(head);
      const description = getMetaDescription(head);
      const canonicalHref = getCanonicalHref(head);

      if (title === null) {
        issues.push(`${relativePath} must have exactly one <title> for download social metadata.`);
      } else if (title !== expectedDownloadMetadata.title) {
        issues.push(`${relativePath} <title> must be ${describeValue(expectedDownloadMetadata.title)}; found ${describeValue(title)}.`);
      }
      if (description === null) {
        issues.push(`${relativePath} must have exactly one meta description for download social metadata.`);
      } else if (description !== expectedDownloadMetadata.description) {
        issues.push(`${relativePath} meta description must be ${describeValue(expectedDownloadMetadata.description)}; found ${describeValue(description)}.`);
      }
      if (canonicalHref === null) {
        issues.push(`${relativePath} must have exactly one canonical link.`);
      } else if (canonicalHref !== pageUrl(locale, page)) {
        issues.push(`${relativePath} canonical must be ${describeValue(pageUrl(locale, page))}; found ${describeValue(canonicalHref)}.`);
      }

      for (const [label, value] of [
        ['source title', title],
        ['source meta description', description],
      ]) {
        if (typeof value === 'string' && !value.includes(expectedDownloadMetadata.productToken)) {
          issues.push(`${relativePath} ${label} must include product token ${describeValue(expectedDownloadMetadata.productToken)}; found ${describeValue(value)}.`);
        }
      }

      for (const [attributeName, attributeValue, expectedValue] of [
        ['property', 'og:site_name', 'HushBook'],
        ['property', 'og:title', expectedDownloadMetadata.title],
        ['property', 'og:description', expectedDownloadMetadata.description],
        ['property', 'og:url', pageUrl(locale, page)],
        ['property', 'og:image', DOWNLOAD_IMAGE_URL],
        ['name', 'twitter:card', 'summary_large_image'],
        ['name', 'twitter:title', expectedDownloadMetadata.title],
        ['name', 'twitter:description', expectedDownloadMetadata.description],
        ['name', 'twitter:image', DOWNLOAD_IMAGE_URL],
      ]) {
        const entries = getMetaEntries(head, attributeName, attributeValue);
        if (entries.length !== 1) {
          issues.push(`${relativePath} must have exactly one ${attributeValue} meta tag; found ${entries.length}.`);
          continue;
        }
        if (entries[0].content !== expectedValue) {
          issues.push(`${relativePath} ${attributeValue} must be ${describeValue(expectedValue)}; found ${describeValue(entries[0].content)}.`);
        }
        if (getMetaEntries(body, attributeName, attributeValue).length !== 0) {
          issues.push(`${relativePath} ${attributeValue} meta tag must stay inside <head>.`);
        }
      }
    }
  }
}

for (const page of localeConfig.publicPages) {
  const relativePath = `ar/${page}`;
  const html = readHtml('ar', page);
  const htmlAttributes = getHtmlAttributes(html);
  if (!htmlAttributes) {
    issues.push(`${relativePath} must declare an <html> root.`);
    continue;
  }
  if (htmlAttributes.lang !== 'ar') {
    issues.push(`${relativePath} html lang must be "ar"; found ${JSON.stringify(htmlAttributes.lang)}.`);
  }
  if (htmlAttributes.dir !== 'rtl') {
    issues.push(`${relativePath} html dir must be "rtl"; found ${JSON.stringify(htmlAttributes.dir)}.`);
  }
}

if (issues.length > 0) {
  const uniqueIssues = [...new Set(issues)];
  throw new Error(`SEO repair contract failures (${uniqueIssues.length}):\n- ${uniqueIssues.join('\n- ')}`);
}

console.log('SEO repair contract passes.');
