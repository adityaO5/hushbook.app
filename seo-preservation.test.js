'use strict';

const fs = require('node:fs');
const { BASELINE_PATH, buildManifest, assertManifestUnchanged } = require('./scripts/seo-preservation');

const baseline = JSON.parse(fs.readFileSync(BASELINE_PATH, 'utf8'));
const manifest = buildManifest();

assertManifestUnchanged(baseline, manifest);

console.log('SEO preservation baseline passes.');
