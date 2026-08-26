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
const manifest = buildManifest();

assertManifestUnchanged(baseline, manifest);

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
