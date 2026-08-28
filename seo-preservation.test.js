'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const {
  BASELINE_PATH,
  buildManifest,
  assertManifestUnchanged,
  assertExactReplacement,
} = require('./scripts/seo-preservation');

const baseline = JSON.parse(fs.readFileSync(BASELINE_PATH, 'utf8'));
const worktreeBaseline = baseline.snapshots?.worktree ?? baseline;
assert.ok(baseline.snapshots?.repository, 'preservation baseline must include a committed-repository snapshot');
const manifest = buildManifest();

assertManifestUnchanged(baseline, manifest);

const tolerantCandidate = structuredClone(worktreeBaseline);
tolerantCandidate.homepages[0].byteLength += 17;
tolerantCandidate.homepages[0].newlineStyle = tolerantCandidate.homepages[0].newlineStyle === 'LF' ? 'CRLF' : 'LF';
assert.doesNotThrow(() => {
  assertManifestUnchanged(baseline, tolerantCandidate);
});

assert.throws(() => {
  assertManifestUnchanged(baseline, tolerantCandidate, { strict: true });
}, /newline style changed|byte length changed/);

const bodyDriftCandidate = structuredClone(worktreeBaseline);
bodyDriftCandidate.homepages[0].postHeadBodySha256 = '0'.repeat(64);
assert.throws(() => {
  assertManifestUnchanged(baseline, bodyDriftCandidate);
}, /post-head body hash changed/);

const protectedDriftCandidate = structuredClone(worktreeBaseline);
protectedDriftCandidate.homepages[0].protectedRegionSha256 = {
  ...protectedDriftCandidate.homepages[0].protectedRegionSha256,
  faqJsonLd: 'f'.repeat(64),
};
assert.throws(() => {
  assertManifestUnchanged(baseline, protectedDriftCandidate);
}, /protected region hash changed/);

const source = {
  file: 'sample/file.txt',
  text: 'alpha OLD omega',
};
const replacement = {
  file: 'sample/file.txt',
  oldText: 'OLD',
  newText: 'NEW',
  reason: 'freeze exact replacement contract',
};

assert.doesNotThrow(() => {
  assertExactReplacement(source, replacement, 'alpha NEW omega');
});

assert.throws(() => {
  assertExactReplacement(source, { ...replacement, reason: '   ' }, 'alpha NEW omega');
}, /descriptor\.reason must not be empty/);

assert.throws(() => {
  assertExactReplacement(source, { ...replacement, file: 'other/file.txt' }, 'alpha NEW omega');
}, /descriptor\.file must match source\.file/);

assert.throws(() => {
  assertExactReplacement(
    { file: 'sample/file.txt', text: 'OLD middle OLD' },
    replacement,
    'NEW middle OLD',
  );
}, /oldText must match exactly once before write/);

assert.throws(() => {
  assertExactReplacement(source, replacement, 'alpha NEW omega plus');
}, /replacement must change only descriptor\.oldText/);

assert.throws(() => {
  const missingNewText = { ...replacement };
  delete missingNewText.newText;
  assertExactReplacement(source, missingNewText, 'alpha NEW omega');
}, /descriptor\.newText must be present/);

console.log('SEO preservation baseline passes.');
