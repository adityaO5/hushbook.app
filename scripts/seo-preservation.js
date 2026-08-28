'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const localeConfig = require('../localization.config');

const ROOT = path.join(__dirname, '..');
const BASELINE_PATH = path.join(ROOT, 'output', 'seo-preservation-baseline.json');

const SEO_COPY_MARKER = '<!-- ============ SEO COPY ============ -->';
const FAQ_MARKER = '<!-- ============ FAQ ============ -->';
const FINALE_MARKER = '<!-- ============ FINALE ============ -->';
const FAQ_JSON_LD_PATTERN = /<script\s+type="application\/ld\+json"\s+data-hushbook-faq>([\s\S]*?)<\/script>/g;
const ABOUT_FACTS_PATTERN = /<section aria-labelledby="facts-title">[\s\S]*?<\/section>/g;

function sha256(value) {
  const text = Buffer.isBuffer(value) ? value.toString('utf8') : String(value);
  const normalized = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  return crypto.createHash('sha256').update(normalized, 'utf8').digest('hex');
}

function toPosix(relativePath) {
  return relativePath.replace(/\\/g, '/');
}

function detectNewlineStyle(buffer) {
  const text = buffer.toString('utf8');
  const hasCrLf = text.includes('\r\n');
  const residual = text.replace(/\r\n/g, '');
  const hasBareLf = residual.includes('\n');
  const hasBareCr = residual.includes('\r');

  if ((hasCrLf && hasBareLf) || (hasCrLf && hasBareCr) || (hasBareLf && hasBareCr)) return 'MIXED';
  if (hasCrLf) return 'CRLF';
  if (hasBareLf) return 'LF';
  if (hasBareCr) return 'CR';
  return 'none';
}

function countOccurrences(text, token) {
  assert.ok(typeof token === 'string' && token.length > 0, 'countOccurrences token must be non-empty string');
  let count = 0;
  let searchFrom = 0;
  while (searchFrom <= text.length) {
    const index = text.indexOf(token, searchFrom);
    if (index === -1) break;
    count += 1;
    searchFrom = index + token.length;
  }
  return count;
}

function readWorkspaceFile(rootDir, relativePath, readBuffer = (absolutePath) => fs.readFileSync(absolutePath)) {
  const absolutePath = path.join(rootDir, relativePath);
  const buffer = readBuffer(absolutePath);
  return {
    absolutePath,
    relativePath: toPosix(relativePath),
    buffer,
    text: buffer.toString('utf8'),
  };
}

function findUniqueRange(text, startToken, endToken, label, relativePath) {
  const startCount = countOccurrences(text, startToken);
  assert.equal(startCount, 1, `${relativePath} must contain exactly one ${label} start marker`);

  const endCount = countOccurrences(text, endToken);
  assert.equal(endCount, 1, `${relativePath} must contain exactly one ${label} end marker`);

  const start = text.indexOf(startToken);
  const end = text.indexOf(endToken, start + startToken.length);
  assert.notEqual(end, -1, `${relativePath} must contain ${label} end marker after start marker`);
  assert.ok(end > start, `${relativePath} ${label} end marker must follow start marker`);

  return {
    start,
    end: end + endToken.length,
    content: text.slice(start, end + endToken.length),
  };
}

function extractSingleRegexMatch(text, pattern, label, relativePath) {
  const matches = [...text.matchAll(pattern)];
  assert.equal(matches.length, 1, `${relativePath} must contain exactly one ${label}`);
  const match = matches[0];
  return {
    start: match.index,
    end: match.index + match[0].length,
    content: match[0],
    capture: match[1],
  };
}

function extractProtectedRegions(relativePath, html) {
  const normalizedPath = toPosix(relativePath);
  const seoCopyToFaq = findUniqueRange(
    html,
    SEO_COPY_MARKER,
    FAQ_MARKER,
    'SEO COPY to FAQ protected region',
    normalizedPath,
  );
  const faqToFinale = findUniqueRange(
    html,
    FAQ_MARKER,
    FINALE_MARKER,
    'FAQ to FINALE protected region',
    normalizedPath,
  );
  const faqJsonLd = extractSingleRegexMatch(
    html,
    FAQ_JSON_LD_PATTERN,
    'data-hushbook-faq JSON-LD block',
    normalizedPath,
  );
  const headClose = html.search(/<\/head>/i);
  assert.notEqual(headClose, -1, `${normalizedPath} must contain </head>`);

  return {
    seoCopyToFaq,
    faqToFinale,
    faqJsonLd,
    markerCounts: {
      seoCopy: countOccurrences(html, SEO_COPY_MARKER),
      faq: countOccurrences(html, FAQ_MARKER),
      finale: countOccurrences(html, FINALE_MARKER),
      faqJsonLd: [...html.matchAll(FAQ_JSON_LD_PATTERN)].length,
    },
    faqItemCount: countOccurrences(faqToFinale.content, '<div class="qa">'),
    faqJsonLdCount: countOccurrences(html, 'data-hushbook-faq'),
    h1Count: [...html.matchAll(/<h1\b/gi)].length,
    postHeadBodySha256: sha256(html.slice(headClose + '</head>'.length)),
  };
}

function buildHomepageEntry(rootDir, relativePath, readBuffer) {
  const file = readWorkspaceFile(rootDir, relativePath, readBuffer);
  const regions = extractProtectedRegions(file.relativePath, file.text);

  return {
    path: file.relativePath,
    newlineStyle: detectNewlineStyle(file.buffer),
    byteLength: file.buffer.length,
    protectedRegionSha256: {
      seoCopyToFaq: sha256(regions.seoCopyToFaq.content),
      faqToFinale: sha256(regions.faqToFinale.content),
      faqJsonLd: sha256(regions.faqJsonLd.content),
    },
    postHeadBodySha256: regions.postHeadBodySha256,
    markerCounts: regions.markerCounts,
    faqItemCount: regions.faqItemCount,
    faqJsonLdCount: regions.faqJsonLdCount,
    h1Count: regions.h1Count,
  };
}

function buildManifest(rootDir = ROOT, readBuffer) {
  const homepagePaths = localeConfig.publishedLocales.map((locale) => (
    locale === localeConfig.defaultLocale ? 'index.html' : path.join(locale, 'index.html')
  ));

  const homepages = homepagePaths
    .map((relativePath) => buildHomepageEntry(rootDir, relativePath, readBuffer))
    .sort((left, right) => left.path.localeCompare(right.path));

  const aboutFile = readWorkspaceFile(rootDir, 'about.html', readBuffer);
  const aboutFactsMatches = [...aboutFile.text.matchAll(ABOUT_FACTS_PATTERN)];
  assert.ok(
    aboutFactsMatches.length === 0 || aboutFactsMatches.length === 1,
    `${aboutFile.relativePath} must contain at most one About facts section`,
  );

  const lockedFiles = ['scripts/inject-seo-copy.js', 'robots.txt'].map((relativePath) => {
    const file = readWorkspaceFile(rootDir, relativePath, readBuffer);
    return {
      path: file.relativePath,
      newlineStyle: detectNewlineStyle(file.buffer),
      byteLength: file.buffer.length,
      sha256: sha256(file.buffer),
    };
  });

  return {
    schemaVersion: 1,
    homepages,
    aboutFacts: aboutFactsMatches.length === 1
      ? {
          path: aboutFile.relativePath,
          present: true,
          newlineStyle: detectNewlineStyle(aboutFile.buffer),
          byteLength: aboutFile.buffer.length,
          sha256: sha256(aboutFactsMatches[0][0]),
        }
      : {
          path: aboutFile.relativePath,
          present: false,
        },
    lockedFiles,
  };
}

function buildManifestFromGitRevision(revision = 'HEAD', repoRoot = ROOT) {
  const readBuffer = (absolutePath) => {
    const relativePath = toPosix(path.relative(repoRoot, absolutePath));
    return execFileSync('git', ['-c', `safe.directory=${toPosix(repoRoot)}`, '-C', repoRoot, 'show', `${revision}:${relativePath}`]);
  };
  return buildManifest(repoRoot, readBuffer);
}

function assertHomepageUnchanged(expected, actual, options = {}) {
  assert.ok(actual, `${expected.path} must exist in current manifest`);
  if (options.strict) {
    assert.equal(actual.newlineStyle, expected.newlineStyle, `${expected.path} newline style changed`);
    assert.equal(actual.byteLength, expected.byteLength, `${expected.path} byte length changed`);
  }
  assert.deepEqual(actual.protectedRegionSha256, expected.protectedRegionSha256, `${expected.path} protected region hash changed`);
  assert.equal(actual.postHeadBodySha256, expected.postHeadBodySha256, `${expected.path} post-head body hash changed`);
  assert.deepEqual(actual.markerCounts, expected.markerCounts, `${expected.path} marker counts changed`);
  assert.equal(actual.faqItemCount, expected.faqItemCount, `${expected.path} FAQ item count changed`);
  assert.equal(actual.faqJsonLdCount, expected.faqJsonLdCount, `${expected.path} FAQ JSON-LD count changed`);
  assert.equal(actual.h1Count, expected.h1Count, `${expected.path} H1 count changed`);
}

function assertSingleManifestUnchanged(expectedManifest, actualManifest, options = {}) {
  assert.equal(actualManifest.schemaVersion, expectedManifest.schemaVersion, 'Manifest schema version changed');
  assert.equal(actualManifest.homepages.length, expectedManifest.homepages.length, 'Published homepage count changed');

  const actualHomepages = new Map(actualManifest.homepages.map((entry) => [entry.path, entry]));
  for (const expectedEntry of expectedManifest.homepages) {
    assertHomepageUnchanged(expectedEntry, actualHomepages.get(expectedEntry.path), options);
  }

  assert.deepEqual(actualManifest.aboutFacts, expectedManifest.aboutFacts, 'About facts section changed');
  assert.deepEqual(
    actualManifest.lockedFiles.map((entry) => ({ path: entry.path, sha256: entry.sha256 })),
    expectedManifest.lockedFiles.map((entry) => ({ path: entry.path, sha256: entry.sha256 })),
    'Locked file content hashes changed',
  );
  if (options.strict) {
    assert.deepEqual(actualManifest.lockedFiles, expectedManifest.lockedFiles, 'Locked file byte metadata changed');
  }
}

function manifestStates(manifest) {
  if (manifest && manifest.snapshots && typeof manifest.snapshots === 'object' && !Array.isArray(manifest.snapshots)) {
    return Object.entries(manifest.snapshots);
  }
  return [['default', manifest]];
}

function assertManifestUnchanged(expectedManifest, actualManifest, options = {}) {
  const failures = [];
  for (const [state, expectedState] of manifestStates(expectedManifest)) {
    try {
      assertSingleManifestUnchanged(expectedState, actualManifest, options);
      return state;
    } catch (error) {
      failures.push(`${state}: ${error.message}`);
    }
  }
  throw new Error(`No preservation baseline state matched current manifest:\n- ${failures.join('\n- ')}`);
}

function validateNonEmptyString(value, label) {
  assert.equal(typeof value, 'string', `${label} must be string`);
  assert.ok(value.trim().length > 0, `${label} must not be empty`);
}

function assertExactReplacement(source, replacement, actualText, label = 'replacement') {
  assert.ok(source && typeof source === 'object' && !Array.isArray(source), `${label} source must be object`);
  validateNonEmptyString(source.file, `${label} source.file`);
  assert.equal(typeof source.text, 'string', `${label} source.text must be string`);
  assert.ok(replacement && typeof replacement === 'object' && !Array.isArray(replacement), `${label} descriptor must be object`);
  validateNonEmptyString(replacement.file, `${label} descriptor.file`);
  validateNonEmptyString(replacement.oldText, `${label} descriptor.oldText`);
  assert.ok(Object.prototype.hasOwnProperty.call(replacement, 'newText'), `${label} descriptor.newText must be present`);
  assert.equal(typeof replacement.newText, 'string', `${label} descriptor.newText must be string`);
  validateNonEmptyString(replacement.reason, `${label} descriptor.reason`);
  assert.equal(typeof actualText, 'string', `${label} actualText must be string`);

  const normalizedSourceFile = toPosix(source.file);
  const normalizedReplacementFile = toPosix(replacement.file);
  assert.equal(
    normalizedReplacementFile,
    normalizedSourceFile,
    `${label} descriptor.file must match source.file`,
  );

  const occurrenceCount = countOccurrences(source.text, replacement.oldText);
  assert.equal(
    occurrenceCount,
    1,
    `${normalizedSourceFile} replacement oldText must match exactly once before write`,
  );

  const matchStart = source.text.indexOf(replacement.oldText);
  const matchEnd = matchStart + replacement.oldText.length;
  const expectedText = source.text.slice(0, matchStart)
    + replacement.newText
    + source.text.slice(matchEnd);

  assert.equal(
    actualText,
    expectedText,
    `${normalizedSourceFile} replacement must change only descriptor.oldText for stated reason: ${replacement.reason}`,
  );
}

function writeBaseline(outputPath = BASELINE_PATH, rootDir = ROOT) {
  const manifest = buildManifest(rootDir);
  fs.writeFileSync(outputPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  return manifest;
}

if (require.main === module) {
  if (process.argv.includes('--write-baseline')) {
    writeBaseline();
    process.stdout.write(`Wrote ${path.relative(ROOT, BASELINE_PATH)}\n`);
  } else {
    process.stdout.write(`${JSON.stringify(buildManifest(), null, 2)}\n`);
  }
}

module.exports = {
  BASELINE_PATH,
  buildManifest,
  buildManifestFromGitRevision,
  extractProtectedRegions,
  assertHomepageUnchanged,
  assertManifestUnchanged,
  assertExactReplacement,
};
