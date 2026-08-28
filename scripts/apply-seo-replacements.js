'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const localeConfig = require('../localization.config');
const {
  BASELINE_PATH,
  buildManifest,
  assertExactReplacement,
  assertManifestUnchanged,
} = require('./seo-preservation');

const ROOT = path.join(__dirname, '..');
const MAP_PATH = path.join(ROOT, 'data', 'seo-repair-replacements.json');
const BODY_BASELINE_PATH = path.join(ROOT, 'output', 'seo-repair-body-baseline.json');
const DOWNLOAD_METADATA_PATH = path.join(ROOT, 'output', 'seo-repair-download-metadata.json');
const DOWNLOAD_PAGE = 'download.html';

function toPosix(relativePath) {
  return relativePath.replace(/\\/g, '/');
}

function absolutePath(relativePath) {
  const normalized = toPosix(relativePath);
  assert.ok(normalized && !normalized.startsWith('/') && !normalized.includes('..'), `unsafe replacement path: ${relativePath}`);
  const resolved = path.resolve(ROOT, normalized);
  assert.equal(path.relative(ROOT, resolved).startsWith('..'), false, `replacement path escapes repository: ${relativePath}`);
  return resolved;
}

function readText(relativePath) {
  return fs.readFileSync(absolutePath(relativePath), 'utf8');
}

function readJson(relativePath) {
  return JSON.parse(readText(relativePath));
}

function countOccurrences(text, needle) {
  if (needle.length === 0) return 0;
  let count = 0;
  let offset = 0;
  while (offset <= text.length) {
    const index = text.indexOf(needle, offset);
    if (index === -1) break;
    count += 1;
    offset = index + needle.length;
  }
  return count;
}

function sha256(text) {
  const normalized = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  return crypto.createHash('sha256').update(normalized, 'utf8').digest('hex');
}

function postHeadBodySha256(html, relativePath) {
  const match = /<\/head>/i.exec(html);
  assert.ok(match, `${relativePath} must contain </head>`);
  return sha256(html.slice(match.index + match[0].length));
}

function detectNewline(text) {
  if (text.includes('\r\n')) return '\r\n';
  if (text.includes('\n')) return '\n';
  if (text.includes('\r')) return '\r';
  return '\n';
}

function bodyBaselineStates(artifact) {
  if (artifact.snapshots && typeof artifact.snapshots === 'object' && !Array.isArray(artifact.snapshots)) {
    return Object.entries(artifact.snapshots);
  }
  return [['default', artifact]];
}

function assertBodyBaseline(artifact, expectedRoutes) {
  const states = bodyBaselineStates(artifact);
  assert.ok(states.length > 0, 'Body baseline must contain at least one state');
  for (const [state, stateArtifact] of states) {
    assertRouteArtifact(stateArtifact, expectedRoutes, `Body baseline ${state}`);
  }
}

function selectBodyBaseline(artifact, expectedRoutes) {
  const actual = Object.fromEntries(expectedRoutes.map((relativePath) => [
    relativePath,
    postHeadBodySha256(readText(relativePath), relativePath),
  ]));
  const matches = bodyBaselineStates(artifact).filter(([, stateArtifact]) => (
    expectedRoutes.every((relativePath) => stateArtifact.routes[relativePath] === actual[relativePath])
  ));
  assert.equal(
    matches.length,
    1,
    `Current files must match exactly one body baseline state; matched ${matches.map(([state]) => state).join(', ') || 'none'}`,
  );
  return { state: matches[0][0], routes: matches[0][1].routes };
}

function preservationBaselineStates(artifact) {
  if (artifact.snapshots && typeof artifact.snapshots === 'object' && !Array.isArray(artifact.snapshots)) {
    return Object.entries(artifact.snapshots);
  }
  return [['default', artifact]];
}

function getPreservationState(artifact, state) {
  const entry = preservationBaselineStates(artifact).find(([name]) => name === state);
  assert.ok(entry, `Preservation baseline state ${state} must exist`);
  return entry[1];
}

function expectedPostWriteHashStates(map) {
  if (map.expectedPostWriteSha256States && typeof map.expectedPostWriteSha256States === 'object' && !Array.isArray(map.expectedPostWriteSha256States)) {
    return Object.entries(map.expectedPostWriteSha256States);
  }
  return [['default', map.expectedPostWriteSha256]];
}

function selectExpectedPostWriteHashes(map, files, simulations) {
  const matches = expectedPostWriteHashStates(map).filter(([, expectedHashes]) => (
    files.every((file) => sha256(simulations.get(file).workingText) === expectedHashes[file])
  ));
  assert.equal(
    matches.length,
    1,
    `Simulated files must match exactly one reviewed post-write hash state; matched ${matches.map(([state]) => state).join(', ') || 'none'}`,
  );
  return { state: matches[0][0], hashes: matches[0][1] };
}

function adaptEntryToSource(entry, sourceText) {
  if (countOccurrences(sourceText, entry.oldText) === 1) return entry;
  const newline = detectNewline(sourceText);
  const oldText = replaceLineBreaks(entry.oldText, newline);
  const newText = replaceLineBreaks(entry.newText, newline);
  if (oldText === entry.oldText && newText === entry.newText) return entry;
  return { ...entry, oldText, newText };
}

function replaceLineBreaks(text, newline) {
  return text.replace(/\r\n|\r|\n/g, newline);
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function expectedPublishedRoutes() {
  const routes = [];
  for (const locale of localeConfig.publishedLocales) {
    for (const page of localeConfig.publicPages) {
      routes.push(toPosix(locale === localeConfig.defaultLocale ? page : path.join(locale, page)));
    }
  }
  return routes.sort((left, right) => left.localeCompare(right));
}

function expectedDownloadRoutes() {
  return localeConfig.publishedLocales
    .map((locale) => toPosix(locale === localeConfig.defaultLocale ? DOWNLOAD_PAGE : path.join(locale, DOWNLOAD_PAGE)))
    .sort((left, right) => left.localeCompare(right));
}

function assertRouteArtifact(artifact, expectedRoutes, label) {
  assert.equal(artifact.schemaVersion, 1, `${label} schemaVersion must be 1`);
  assert.equal(artifact.routeCount, expectedRoutes.length, `${label} routeCount changed`);
  assert.ok(artifact.routes && typeof artifact.routes === 'object' && !Array.isArray(artifact.routes), `${label} routes must be object`);
  assert.deepEqual(
    Object.keys(artifact.routes).sort((left, right) => left.localeCompare(right)),
    expectedRoutes,
    `${label} route keys changed`,
  );
}

function validateMap(map) {
  assert.equal(map.schemaVersion, 1, 'replacement map schemaVersion must be 1');
  assert.ok(map.policy && map.policy.defaultMode === 'dry-run', 'replacement map must default to dry-run');
  assert.deepEqual(map.policy.allowedModes, ['--dry-run', '--write'], 'replacement map allowed modes changed');
  assert.equal(map.policy.exactMatchOnly, true, 'replacement map must be exact-match-only');
  assert.equal(map.policy.globalRegexAllowed, false, 'replacement map cannot allow global regexes');
  assert.equal(map.policy.fileWideReplacementAllowed, false, 'replacement map cannot allow file-wide replacements');
  assert.equal(map.policy.deleteFilesOrHtmlBlocksAllowed, false, 'replacement map cannot delete files or HTML blocks');
  assert.ok(Array.isArray(map.replacements) && map.replacements.length > 0, 'replacement map must contain entries');
  assert.ok(map.expectedPostWriteSha256 && typeof map.expectedPostWriteSha256 === 'object', 'replacement map must contain post-write hashes');
  for (const [state, hashes] of expectedPostWriteHashStates(map)) {
    assert.ok(hashes && typeof hashes === 'object' && !Array.isArray(hashes), `${state} post-write hashes must be object`);
  }

  const ids = new Set();
  const files = new Set();
  for (const entry of map.replacements) {
    assert.ok(entry && typeof entry === 'object' && !Array.isArray(entry), 'replacement entry must be object');
    assert.equal(typeof entry.id, 'string');
    assert.ok(entry.id.length > 0 && !ids.has(entry.id), `replacement id must be unique: ${entry.id}`);
    ids.add(entry.id);
    assert.equal(typeof entry.file, 'string');
    assert.equal(typeof entry.oldText, 'string');
    assert.equal(typeof entry.newText, 'string');
    assert.notEqual(entry.oldText, entry.newText, `${entry.id} oldText/newText must differ`);
    assert.equal(typeof entry.context, 'string');
    assert.ok(entry.context.trim().length > 0, `${entry.id} context must be non-empty`);
    assert.equal(typeof entry.reason, 'string');
    assert.ok(entry.reason.trim().length > 0, `${entry.id} reason must be non-empty`);
    assert.equal(entry.review?.status, 'approved', `${entry.id} must have approved review status`);
    assert.equal(Number.isInteger(entry.sourceLine), true, `${entry.id} sourceLine must be integer`);
    assert.ok(entry.source && typeof entry.source === 'object', `${entry.id} source evidence missing`);
    assert.ok(/\r\n|\n|\r/.test(entry.oldText), `${entry.id} oldText must retain its reviewed line structure`);
    assert.ok(/\r\n|\n|\r/.test(entry.newText), `${entry.id} newText must retain its reviewed line structure`);
    files.add(toPosix(entry.file));
  }

  const expectedFiles = [...files].sort((left, right) => left.localeCompare(right));
  assert.deepEqual(
    Object.keys(map.expectedPostWriteSha256).sort((left, right) => left.localeCompare(right)),
    expectedFiles,
    'replacement post-write hash keys must match replacement files',
  );
  for (const [state, hashes] of expectedPostWriteHashStates(map)) {
    assert.deepEqual(
      Object.keys(hashes).sort((left, right) => left.localeCompare(right)),
      expectedFiles,
      `${state} replacement post-write hash keys must match replacement files`,
    );
    for (const file of expectedFiles) {
      assert.match(hashes[file], /^[a-f0-9]{64}$/, `${state} ${file} post-write hash must be SHA-256`);
    }
  }

  assert.ok(map.uFFFDReview && map.uFFFDReview.status === 'approved-complete', 'French U+FFFD review must be complete');
  assert.equal(map.uFFFDReview.expectedTotal, 955, 'French U+FFFD review total changed');
  assert.deepEqual(map.uFFFDReview.reviewedAreas, [
    'head metadata',
    'navigation',
    'ARIA labels',
    'legal/customer body text',
    'footer text',
    'JSON-LD',
  ], 'French U+FFFD review areas changed');
  assert.ok(Array.isArray(map.blockedReviews), 'blockedReviews must be an array');
  for (const blocked of map.blockedReviews) {
    assert.equal(blocked.review?.status, 'blocked', `${blocked.id} must be explicitly blocked`);
    assert.equal(blocked.oldText, blocked.newText, `${blocked.id} blocked review must not silently replace text`);
  }
  return expectedFiles;
}

function entriesByFile(map, files) {
  const grouped = new Map(files.map((file) => [file, []]));
  for (const entry of map.replacements) grouped.get(toPosix(entry.file)).push(entry);
  return grouped;
}

function simulateFile(relativePath, sourceText, entries) {
  let workingText = sourceText;
  let pendingCount = 0;
  let appliedCount = 0;
  const diffs = [];

  for (const entry of entries) {
    const descriptor = adaptEntryToSource(entry, workingText);
    const occurrenceCount = countOccurrences(workingText, descriptor.oldText);
    if (occurrenceCount === 1) {
      const nextText = workingText.replace(descriptor.oldText, descriptor.newText);
      assertExactReplacement(
        { file: relativePath, text: workingText },
        descriptor,
        nextText,
        entry.id,
      );
      workingText = nextText;
      pendingCount += 1;
      diffs.push({
        id: entry.id,
        file: relativePath,
        sourceLine: entry.sourceLine,
        context: entry.context,
        oldText: descriptor.oldText,
        newText: descriptor.newText,
        status: 'pending',
      });
      continue;
    }
    assert.equal(occurrenceCount, 0, `${entry.id} in ${relativePath} must match once or be fully applied; found ${occurrenceCount}`);
    appliedCount += 1;
    diffs.push({
      id: entry.id,
      file: relativePath,
      sourceLine: entry.sourceLine,
      context: entry.context,
      oldText: descriptor.oldText,
      newText: descriptor.newText,
      status: 'already-applied',
    });
  }

  assert.ok(pendingCount === 0 || appliedCount === 0, `${relativePath} is partially applied; refusing mixed state`);
  return {
    relativePath,
    sourceText,
    workingText,
    state: pendingCount > 0 ? 'pending' : 'applied',
    pendingCount,
    appliedCount,
    diffs,
  };
}

function assertBaselineState(map, files, simulations, preservationStateName) {
  const bodyBaseline = readJson('output/seo-repair-body-baseline.json');
  const publishedRoutes = expectedPublishedRoutes();
  assertBodyBaseline(bodyBaseline, publishedRoutes);
  const bodySelection = selectBodyBaseline(bodyBaseline, publishedRoutes);
  const bodyBaselineRoutes = bodySelection.routes;

  const bodyUpdates = map.baselineUpdates?.body ?? [];
  const bodyUpdateByFile = new Map(bodyUpdates.map((entry) => [toPosix(entry.file), entry]));
  const bodyStates = new Set();
  const states = new Set([...simulations.values()].map((simulation) => simulation.state));
  assert.ok(states.size <= 1, 'replacement files are partially transitioned');
  const state = states.values().next().value;
  for (const update of bodyUpdates) {
    const current = bodyBaselineRoutes[update.file];
    if (current === update.oldSha256 || current === update.newSha256) {
      bodyStates.add(current === update.oldSha256 ? 'old' : 'new');
    } else {
      assert.equal(state, 'applied', `${update.file} body baseline differs from the reviewed transition; refusing a pending or mixed state`);
    }
  }
  assert.ok(bodyStates.size <= 1, 'body baseline is partially transitioned');

  for (const file of files) {
    const simulation = simulations.get(file);
    const update = bodyUpdateByFile.get(file);
    const currentBodyHash = postHeadBodySha256(simulation.sourceText, file);
    assert.equal(currentBodyHash, bodyBaselineRoutes[file], `${file} current body does not match selected preservation baseline state`);
  }

  const downloadBaseline = readJson('output/seo-repair-download-metadata.json');
  assertRouteArtifact(downloadBaseline, expectedDownloadRoutes(), 'Download metadata baseline');
  const downloadUpdates = map.baselineUpdates?.downloadMetadata ?? [];
  const downloadStates = new Set();
  for (const update of downloadUpdates) {
    const current = downloadBaseline.routes[update.file];
    assert.ok(JSON.stringify(current) === JSON.stringify(update.oldValue) || JSON.stringify(current) === JSON.stringify(update.newValue), `${update.file} download baseline is neither old nor reviewed new value`);
    downloadStates.add(JSON.stringify(current) === JSON.stringify(update.oldValue) ? 'old' : 'new');
  }
  assert.ok(downloadStates.size <= 1, 'download metadata baseline is partially transitioned');

  const preservationBaseline = readJson('output/seo-preservation-baseline.json');
  const preservationBaselineState = getPreservationState(preservationBaseline, preservationStateName);
  const preservationUpdates = map.baselineUpdates?.preservation ?? [];
  const preservationStates = new Set();
  for (const update of preservationUpdates) {
    const current = preservationBaselineState.homepages.find((entry) => entry.path === update.file);
    assert.ok(current, `${update.file} preservation baseline entry missing`);
    const currentJson = JSON.stringify(current);
    if (currentJson === JSON.stringify(update.oldValue)) preservationStates.add('old');
    else if (currentJson === JSON.stringify(update.newValue)) preservationStates.add('new');
    else assert.equal(state, 'applied', `${update.file} preservation baseline differs from the reviewed transition; refusing a pending or mixed state`);
  }
  assert.ok(preservationStates.size <= 1, 'preservation baseline is partially transitioned');

  if (state === 'pending') {
    assert.ok(bodyStates.size === 0 || bodyStates.has('old'), 'HTML pending state requires old body baselines');
    assert.ok(downloadStates.size === 0 || downloadStates.has('old'), 'HTML pending state requires old download baseline');
    assert.ok(preservationStates.size === 0 || preservationStates.has('old'), 'HTML pending state requires old preservation baseline');
  }
  if (state === 'applied') {
    assert.ok(bodyStates.size === 0 || bodyStates.has('new'), 'HTML applied state requires new body baselines');
    assert.ok(downloadStates.size === 0 || downloadStates.has('new'), 'HTML applied state requires new download baseline');
    assert.ok(preservationStates.size === 0 || preservationStates.has('new'), 'HTML applied state requires new preservation baseline');
  }
  return {
    bodyBaseline,
    bodyBaselineStateName: bodySelection.state,
    bodyUpdateByFile,
    downloadBaseline,
    downloadUpdates,
    preservationBaseline,
    preservationBaselineStateName: preservationStateName,
    preservationUpdates,
    state,
  };
}

function buildUpdatedArtifacts(map, baselineState, state) {
  const bodyContainer = clone(baselineState.bodyBaseline);
  const bodyState = bodyContainer.snapshots?.[baselineState.bodyBaselineStateName] ?? bodyContainer;
  for (const update of map.baselineUpdates?.body ?? []) {
    if (state === 'pending') bodyState.routes[update.file] = update.newSha256;
  }
  if (bodyContainer.snapshots) {
    bodyContainer.snapshots[baselineState.bodyBaselineStateName] = bodyState;
  }

  const downloadBaseline = clone(baselineState.downloadBaseline);
  for (const update of baselineState.downloadUpdates) {
    if (state === 'pending') downloadBaseline.routes[update.file] = update.newValue;
  }

  const preservationContainer = clone(baselineState.preservationBaseline);
  const preservationBaseline = preservationContainer.snapshots?.[baselineState.preservationBaselineStateName] ?? preservationContainer;
  for (const update of baselineState.preservationUpdates) {
    if (state === 'pending') {
      const index = preservationBaseline.homepages.findIndex((entry) => entry.path === update.file);
      assert.notEqual(index, -1, `${update.file} preservation baseline entry missing`);
      preservationBaseline.homepages[index] = update.newValue;
    }
  }
  if (preservationContainer.snapshots) {
    preservationContainer.snapshots[baselineState.preservationBaselineStateName] = preservationBaseline;
  }
  return { bodyBaseline: bodyContainer, downloadBaseline, preservationBaseline: preservationContainer };
}

function formatDiff(diff) {
  const oldText = JSON.stringify(diff.oldText);
  const newText = JSON.stringify(diff.newText);
  return `${diff.status.toUpperCase()} ${diff.id} ${diff.file}:${diff.sourceLine} ${diff.context}\n  - ${oldText}\n  + ${newText}`;
}

function writeJson(relativePath, value, originalText) {
  const newline = detectNewline(originalText);
  const serialized = `${JSON.stringify(value, null, 2)}\n`;
  return replaceLineBreaks(serialized, newline);
}

function writeTransaction(plans, artifacts, state) {
  if (state !== 'pending') return;

  const writes = new Map();
  for (const plan of plans) writes.set(plan.relativePath, plan.workingText);
  writes.set('output/seo-repair-body-baseline.json', writeJson('output/seo-repair-body-baseline.json', artifacts.bodyBaseline, readText('output/seo-repair-body-baseline.json')));
  writes.set('output/seo-repair-download-metadata.json', writeJson('output/seo-repair-download-metadata.json', artifacts.downloadBaseline, readText('output/seo-repair-download-metadata.json')));
  writes.set('output/seo-preservation-baseline.json', writeJson('output/seo-preservation-baseline.json', artifacts.preservationBaseline, readText('output/seo-preservation-baseline.json')));

  const originals = new Map([...writes.keys()].map((relativePath) => [relativePath, fs.readFileSync(absolutePath(relativePath))]));
  const written = [];
  try {
    for (const [relativePath, text] of writes) {
      const current = fs.readFileSync(absolutePath(relativePath), 'utf8');
      if (current === text) continue;
      fs.writeFileSync(absolutePath(relativePath), text, 'utf8');
      written.push(relativePath);
    }
  } catch (error) {
    for (const relativePath of written.reverse()) fs.writeFileSync(absolutePath(relativePath), originals.get(relativePath));
    throw new Error(`write transaction rolled back: ${error.message}`);
  }
}

function assertAfterWrite(expectedHashes, artifacts, files) {
  for (const file of files) {
    const html = readText(file);
    assert.equal(sha256(html), expectedHashes[file], `${file} final hash differs from reviewed map`);
  }
  const actualManifest = buildManifest();
  assertManifestUnchanged(artifacts.preservationBaseline, actualManifest);
  const bodyBaseline = readJson('output/seo-repair-body-baseline.json');
  assert.deepEqual(bodyBaseline, artifacts.bodyBaseline, 'body baseline final value differs from reviewed update');
  const downloadBaseline = readJson('output/seo-repair-download-metadata.json');
  assert.deepEqual(downloadBaseline, artifacts.downloadBaseline, 'download baseline final value differs from reviewed update');
}

function parseMode() {
  const args = process.argv.slice(2);
  assert.ok(args.length === 0 || args.length === 1, 'usage: node scripts/apply-seo-replacements.js [--dry-run|--write]');
  assert.ok(args.length === 0 || args[0] === '--dry-run' || args[0] === '--write', 'usage: node scripts/apply-seo-replacements.js [--dry-run|--write]');
  return args[0] ?? '--dry-run';
}

function main() {
  const mode = parseMode();
  const map = readJson('data/seo-repair-replacements.json');
  const files = validateMap(map);
  const grouped = entriesByFile(map, files);
  const simulations = new Map();

  const beforeManifest = buildManifest();
  const preservationBaseline = readJson('output/seo-preservation-baseline.json');
  const preservationStateName = assertManifestUnchanged(preservationBaseline, beforeManifest);

  for (const file of files) {
    const sourceText = readText(file);
    simulations.set(file, simulateFile(file, sourceText, grouped.get(file)));
  }

  const expectedHashState = selectExpectedPostWriteHashes(map, files, simulations);
  const baselineState = assertBaselineState(map, files, simulations, preservationStateName);
  baselineState.expectedPostWriteHashes = expectedHashState.hashes;
  assert.equal(
    expectedHashState.state,
    preservationStateName,
    `Reviewed post-write hash state ${expectedHashState.state} must match preservation state ${preservationStateName}`,
  );
  assert.equal(
    baselineState.bodyBaselineStateName,
    preservationStateName,
    `Body baseline state ${baselineState.bodyBaselineStateName} must match preservation state ${preservationStateName}`,
  );
  assert.equal(baselineState.state, simulations.values().next().value.state, 'baseline and HTML transition states differ');
  const artifacts = buildUpdatedArtifacts(map, baselineState, baselineState.state);

  const allDiffs = [...simulations.values()].flatMap((simulation) => simulation.diffs);
  const pendingCount = allDiffs.filter((diff) => diff.status === 'pending').length;
  const appliedCount = allDiffs.filter((diff) => diff.status === 'already-applied').length;
  process.stdout.write(`SEO replacement ${mode === '--write' ? 'write' : 'dry-run'} preflight: ${files.length} files, ${allDiffs.length} approved entries, ${pendingCount} pending, ${appliedCount} already applied.\n`);
  process.stdout.write(`French U+FFFD coverage: ${map.uFFFDReview.expectedTotal} occurrences reviewed across ${map.uFFFDReview.files.length} routes.\n`);
  process.stdout.write(`Blocked reviews: ${map.blockedReviews.length}; no blocked entry will be changed.\n`);
  for (const diff of allDiffs) process.stdout.write(`${formatDiff(diff)}\n`);

  if (mode === '--dry-run') {
    process.stdout.write('Dry-run complete. No files written.\n');
    return;
  }

  if (baselineState.state === 'applied') {
    process.stdout.write('Reviewed replacement map already applied. No files written.\n');
    return;
  }

  const plans = [...simulations.values()];
  writeTransaction(plans, artifacts, baselineState.state);
  try {
    assertAfterWrite(expectedHashState.hashes, artifacts, files);
  } catch (error) {
    throw new Error(`post-write preservation verification failed: ${error.message}`);
  }
  process.stdout.write(`Write complete: ${pendingCount} approved replacements applied; baselines updated only through reviewed transitions.\n`);
}

main();
