'use strict';

/**
 * write-preservation-baseline.js
 *
 * Writes output/seo-preservation-baseline.json with both:
 *   snapshots.worktree  — current working tree state
 *   snapshots.repository — committed HEAD state (via git show)
 *
 * Usage: node scripts/write-preservation-baseline.js
 */

const fs = require('node:fs');
const path = require('node:path');
const { buildManifest, buildManifestFromGitRevision, BASELINE_PATH } = require('./seo-preservation');

const ROOT = path.join(__dirname, '..');

const worktree = buildManifest(ROOT);
const repository = buildManifestFromGitRevision('HEAD', ROOT);

const baseline = {
  snapshots: {
    worktree,
    repository,
  },
};

fs.writeFileSync(BASELINE_PATH, `${JSON.stringify(baseline, null, 2)}\n`, 'utf8');
console.log(`Wrote ${path.relative(ROOT, BASELINE_PATH)} with worktree + repository snapshots.`);
