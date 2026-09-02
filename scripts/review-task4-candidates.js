'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const { extractProtectedRegions } = require('./seo-preservation');

const ROOT = path.join(__dirname, '..');
const TRUSTED_REVISION = '4f5d885';
const REVIEW_DATE = '2026-08-26';
const FRENCH_FILES = [
  'fr/download.html',
  'fr/about.html',
  'fr/privacy-policy.html',
  'fr/terms-conditions.html',
  'fr/refund-policy.html',
  'fr/licenses.html',
];
const FRENCH_EXPECTED_COUNTS = {
  'fr/download.html': 20,
  'fr/about.html': 76,
  'fr/privacy-policy.html': 391,
  'fr/terms-conditions.html': 288,
  'fr/refund-policy.html': 123,
  'fr/licenses.html': 57,
};
const DANISH_FILES = [
  'da/index.html',
  'da/download.html',
  'da/about.html',
  'da/privacy-policy.html',
  'da/terms-conditions.html',
  'da/refund-policy.html',
  'da/licenses.html',
];
const VIETNAMESE_FILES = [
  'vi/about.html',
  'vi/privacy-policy.html',
  'vi/terms-conditions.html',
  'vi/refund-policy.html',
  'vi/licenses.html',
];
const THAI_FILES = [
  'th/download.html',
  'th/about.html',
  'th/privacy-policy.html',
  'th/terms-conditions.html',
  'th/refund-policy.html',
  'th/licenses.html',
];

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
}

function readJson(relativePath) {
  return JSON.parse(read(relativePath));
}

function trusted(relativePath) {
  return execFileSync(
    'git',
    ['-c', 'safe.directory=D:/Hushbook.app', 'show', `${TRUSTED_REVISION}:${relativePath}`],
    { cwd: ROOT, encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 },
  );
}

function splitLines(text) {
  return text.split(/\r?\n/);
}

function count(text, token) {
  return text.split(token).length - 1;
}

function sha256(text) {
  return crypto.createHash('sha256').update(text).digest('hex');
}

function normalizeTrustedMatch(line) {
  return line
    .replace(/href="[^"]*"/g, 'href="?"')
    .replace(/(?:hello|aditya)@hushbook\.app/g, 'EMAIL')
    .replace(/[^\x00-\x7F]/g, '?');
}

function restoreNonAscii(currentLine, trustedLine) {
  const currentNonAscii = [...currentLine].filter((character) => character.codePointAt(0) > 127);
  const trustedNonAscii = [...trustedLine].filter((character) => character.codePointAt(0) > 127);
  assert.equal(
    currentNonAscii.length,
    trustedNonAscii.length,
    `non-ASCII sequence length differs\nCURRENT ${currentLine}\nTRUSTED ${trustedLine}`,
  );
  let nonAsciiIndex = 0;
  return [...currentLine].map((character) => {
    if (character.codePointAt(0) <= 127) return character;
    const trustedCharacter = trustedNonAscii[nonAsciiIndex];
    nonAsciiIndex += 1;
    if (character === '\uFFFD') return trustedCharacter;
    assert.equal(
      character,
      trustedCharacter,
      `existing non-ASCII character differs from trusted source\nCURRENT ${currentLine}\nTRUSTED ${trustedLine}`,
    );
    return character;
  }).join('');
}

function lineArea(lines, lineIndex) {
  const headClose = lines.findIndex((line) => /<\/head>/i.test(line));
  const footerStart = lines.findIndex((line) => /<footer\b/i.test(line));
  const line = lines[lineIndex];
  if (lineIndex < headClose) {
    const jsonLdStart = lines.slice(0, lineIndex + 1).findLastIndex((candidate) => /<script\s+type="application\/ld\+json"/i.test(candidate));
    const jsonLdEnd = lines.slice(0, lineIndex + 1).findLastIndex((candidate) => /<\/script>/i.test(candidate));
    if (jsonLdStart > jsonLdEnd) return 'head JSON-LD';
    if (/<title>|<meta\b/i.test(line)) return 'head metadata';
    return 'head markup';
  }
  if (/aria-label=/i.test(line)) return footerStart !== -1 && lineIndex >= footerStart ? 'footer ARIA label' : 'navigation/ARIA label';
  if (footerStart !== -1 && lineIndex >= footerStart) return 'footer text';
  if (/<nav\b|<a\b/i.test(line)) return 'navigation text';
  return 'customer/legal body text';
}

function createEntry({ id, file, oldText, newText, context, reason, source, status = 'approved', artifact, line }) {
  assert.notEqual(oldText, newText, `${id} must change text`);
  const fullText = read(file);
  const newline = fullText.includes('\r\n') ? '\r\n' : '\n';
  const boundedOldText = line === 1 ? `${oldText}${newline}` : `${newline}${oldText}`;
  const boundedNewText = line === 1 ? `${newText}${newline}` : `${newline}${newText}`;
  return {
    id,
    file,
    oldText: boundedOldText,
    newText: boundedNewText,
    context,
    reason,
    artifact,
    source,
    review: {
      status,
      reviewedOn: REVIEW_DATE,
      method: 'exact surrounding markup inspected; repository history and local UTF-8 evidence checked',
    },
    sourceLine: line,
  };
}

function frenchEntries() {
  const entries = [];
  let sequence = 0;
  for (const file of FRENCH_FILES) {
    const currentLines = splitLines(read(file));
    const trustedLines = splitLines(trusted(file));
    let fileCount = 0;
    for (let index = 0; index < currentLines.length; index += 1) {
      const oldText = currentLines[index];
      const occurrenceCount = count(oldText, '\uFFFD');
      if (occurrenceCount === 0) continue;
      fileCount += occurrenceCount;
      const signature = normalizeTrustedMatch(oldText);
      const matches = trustedLines
        .map((line, trustedIndex) => ({ line, trustedIndex }))
        .filter((candidate) => normalizeTrustedMatch(candidate.line) === signature);
      let newText;
      let source;
      if (matches.length === 1) {
        newText = restoreNonAscii(oldText, matches[0].line);
        source = {
          type: 'git-history',
          revision: TRUSTED_REVISION,
          file,
          line: matches[0].trustedIndex + 1,
          evidence: 'same markup line before U+FFFD corruption',
        };
      } else {
        assert.equal(file, 'fr/download.html', `only Task 3-added French download metadata may lack historical line match: ${file}:${index + 1}`);
        assert.match(oldText, /T\uFFFDl\uFFFDcharger/, `unmatched French download line must contain reviewed title/description: ${oldText}`);
        newText = oldText.replaceAll('T\uFFFDl\uFFFDcharger', 'Télécharger');
        source = {
          type: 'repository-utf8',
          files: [
            `${TRUSTED_REVISION}:fr/download.html:16-17`,
            'fr-argos/download.html:6-7',
          ],
          evidence: 'exact French download title/description in two trusted UTF-8 sources',
        };
      }
      assert.equal(count(newText, '\uFFFD'), 0, `${file}:${index + 1} replacement must resolve every reviewed U+FFFD on line`);
      sequence += 1;
      entries.push(createEntry({
        id: `fr-ufffd-${String(sequence).padStart(3, '0')}`,
        file,
        oldText,
        newText,
        context: `${lineArea(currentLines, index)}; current line ${index + 1}; ${occurrenceCount} reviewed U+FFFD occurrence(s)`,
        reason: 'restore only corrupted Unicode code points from reviewed UTF-8 repository source; preserve all surrounding copy and markup',
        artifact: 'U+FFFD',
        source,
        line: index + 1,
      }));
    }
    assert.equal(fileCount, FRENCH_EXPECTED_COUNTS[file], `${file} U+FFFD occurrence total changed during review`);
  }
  assert.equal(entries.reduce((total, entry) => total + count(entry.oldText, '\uFFFD'), 0), 955, 'French review must cover all 955 U+FFFD occurrences');
  return entries;
}

function tokenLineEntries(files, token, replacement, artifact, sourceFactory, reason) {
  const entries = [];
  let sequence = 0;
  for (const file of files) {
    const lines = splitLines(read(file));
    for (let index = 0; index < lines.length; index += 1) {
      const oldText = lines[index];
      if (!oldText.includes(token)) continue;
      sequence += 1;
      entries.push(createEntry({
        id: `${artifact.toLowerCase()}-${String(sequence).padStart(3, '0')}`,
        file,
        oldText,
        newText: oldText.replaceAll(token, replacement),
        context: `${lineArea(lines, index)}; current line ${index + 1}; ${count(oldText, token)} exact token occurrence(s)`,
        reason,
        artifact,
        source: sourceFactory(file, index, oldText),
        line: index + 1,
      }));
    }
  }
  return entries;
}

function viDownloadEntries() {
  const file = 'vi/download.html';
  const expected = readJson('output/seo-repair-download-metadata.json').routes[file];
  const lines = splitLines(read(file));
  const specs = [
    { pattern: /^<title>/, value: `<title>${expected.title}</title>`, field: 'title' },
    { pattern: /^<meta name="description"/, value: `<meta name="description" content="${expected.description}">`, field: 'description' },
    { pattern: /^  "description":/, value: `  "description": "${expected.description}",`, field: 'JSON-LD description' },
    { pattern: /^<meta property="og:title"/, value: `<meta property="og:title" content="${expected.title}">`, field: 'og:title' },
    { pattern: /^<meta property="og:description"/, value: `<meta property="og:description" content="${expected.description}">`, field: 'og:description' },
    { pattern: /^<meta name="twitter:title"/, value: `<meta name="twitter:title" content="${expected.title}">`, field: 'twitter:title' },
    { pattern: /^<meta name="twitter:description"/, value: `<meta name="twitter:description" content="${expected.description}">`, field: 'twitter:description' },
  ];
  return specs.map((spec, index) => {
    const matches = lines.map((line, lineIndex) => ({ line, lineIndex })).filter(({ line }) => spec.pattern.test(line));
    assert.equal(matches.length, 1, `${file} must contain one ${spec.field} line`);
    return createEntry({
      id: `vi-download-reviewed-${String(index + 1).padStart(2, '0')}`,
      file,
      oldText: matches[0].line,
      newText: spec.value,
      context: `head ${spec.field}; current line ${matches[0].lineIndex + 1}`,
      reason: 'apply Task 2 reviewed Vietnamese download metadata expectation; remove HuhBook where present and align all linked title/description fields',
      artifact: matches[0].line.includes('HuhBook') ? 'HuhBook' : 'reviewed-download-copy',
      source: {
        type: 'reviewed-baseline',
        file: 'output/seo-repair-download-metadata.json',
        route: file,
        field: spec.field.includes('title') ? 'title' : 'description',
        evidence: 'explicit Task 2 reviewed expected value, not derived from current corrupted source',
      },
      line: matches[0].lineIndex + 1,
    });
  });
}

function hboEntries() {
  return THAI_FILES.map((file, index) => {
    const lines = splitLines(read(file));
    const matches = lines.map((line, lineIndex) => ({ line, lineIndex })).filter(({ line }) => line === 'HBOPEXIX');
    assert.equal(matches.length, 1, `${file} must contain one isolated HBOPEXIX line`);
    const lineIndex = matches[0].lineIndex;
    const predecessor = lines.slice(0, lineIndex).findLast((line) => line.trim() !== '');
    const successor = lines.slice(lineIndex + 1).find((line) => line.trim() !== '');
    assert.match(predecessor, /<link\b/, `${file} HBOPEXIX predecessor must be a complete link element`);
    assert.match(successor, /^(?:<link\b|<meta\b)/, `${file} HBOPEXIX successor must be a complete head element`);
    return createEntry({
      id: `hbopexix-${String(index + 1).padStart(2, '0')}`,
      file,
      oldText: 'HBOPEXIX',
      newText: '',
      context: `isolated head text node at current line ${lineIndex + 1}, between complete link/meta elements`,
      reason: 'remove only isolated opaque token; adjacent head elements and blank-line structure remain intact',
      artifact: 'HBOPEXIX',
      source: {
        type: 'markup-review',
        file,
        line: lineIndex + 1,
        evidence: 'exact token is an isolated text node, not part of customer copy or an HTML block',
      },
      line: lineIndex + 1,
    });
  });
}

function notundReviews() {
  const file = 'tr/refund-policy.html';
  const lines = splitLines(read(file));
  const approved = [6, 12].map((lineNumber, index) => {
    const oldText = lines[lineNumber - 1];
    assert.ok(oldText.includes('Notund Policy'), `${file}:${lineNumber} must contain Notund Policy`);
    return createEntry({
      id: `notund-approved-${String(index + 1).padStart(2, '0')}`,
      file,
      oldText,
      newText: oldText.replace('Notund Policy', 'İade Politikası'),
      context: `head ${lineNumber === 6 ? 'title' : 'og:title'}; current line ${lineNumber}`,
      reason: 'replace corrupted policy label using explicit repository Turkish UI translation while preserving separator and HushBook name',
      artifact: 'Notund',
      source: {
        type: 'repository-utf8',
        file: 'scripts/seed-draft-ui.js',
        evidence: "explicit tr mapping: 'Refund Policy':'İade Politikası'",
      },
      line: lineNumber,
    });
  });
  const blockedLine = lines[242];
  assert.ok(blockedLine.includes('Notund'), `${file}:243 must contain blocked Notund context`);
  const blocked = {
    id: 'notund-blocked-01',
    file,
    oldText: blockedLine,
    newText: blockedLine,
    context: 'customer-facing subscription refund-request label; current line 243',
    reason: 'no exact trusted Turkish source for this legal/customer-facing phrase; leave unchanged and gate route for later indexation review',
    artifact: 'Notund',
    source: {
      type: 'blocked-after-repository-search',
      searched: [
        'git history for tr/refund-policy.html',
        'Turkish public routes',
        'repository localization mappings',
      ],
      evidence: 'only policy-title translation is trusted; no exact source for this body phrase',
    },
    review: {
      status: 'blocked',
      reviewedOn: REVIEW_DATE,
      method: 'exact surrounding legal markup inspected; repository history and local UTF-8 sources searched',
    },
    sourceLine: 243,
  };
  return { approved, blocked };
}

function applyEntries(entries) {
  const original = new Map();
  const working = new Map();
  for (const entry of entries) {
    if (!working.has(entry.file)) {
      const text = read(entry.file);
      original.set(entry.file, text);
      working.set(entry.file, text);
    }
    const before = working.get(entry.file);
    assert.equal(count(before, entry.oldText), 1, `${entry.id} oldText must match exactly once in ${entry.file}:${entry.sourceLine}; count=${count(before, entry.oldText)}; oldText=${JSON.stringify(entry.oldText)}`);
    working.set(entry.file, before.replace(entry.oldText, entry.newText));
  }
  return { original, working };
}

function postHeadBody(text) {
  const match = /<\/head>/i.exec(text);
  assert.ok(match, 'HTML must contain </head>');
  return text.slice(match.index + match[0].length);
}

function baselineUpdates(entries, simulation) {
  const bodyBaseline = readJson('output/seo-repair-body-baseline.json');
  const body = [];
  for (const [file, nextText] of simulation.working.entries()) {
    const oldText = simulation.original.get(file);
    const oldHash = sha256(postHeadBody(oldText));
    const newHash = sha256(postHeadBody(nextText));
    assert.equal(oldHash, bodyBaseline.routes[file], `${file} current body must match full 147-route baseline`);
    if (oldHash !== newHash) {
      body.push({
        file,
        oldSha256: oldHash,
        newSha256: newHash,
        reason: 'post-head body changes only through explicit approved replacement-map entries for this route',
      });
    }
  }
  body.sort((left, right) => left.file.localeCompare(right.file));

  const downloadBaseline = readJson('output/seo-repair-download-metadata.json');
  const downloadMetadata = [{
    file: 'fr/download.html',
    oldValue: downloadBaseline.routes['fr/download.html'],
    newValue: {
      title: 'Télécharger HushBook',
      description: 'Télécharger HushBook pour iPhone ou Android.',
      productToken: 'HushBook',
    },
    reason: 'restore reviewed French UTF-8 title/description from trusted repository sources',
    source: [
      `${TRUSTED_REVISION}:fr/download.html:16-17`,
      'fr-argos/download.html:6-7',
    ],
  }];

  const preservationBaseline = readJson('output/seo-preservation-baseline.json');
  const oldHomepage = preservationBaseline.homepages.find((entry) => entry.path === 'da/index.html');
  assert.ok(oldHomepage, 'preservation baseline must contain da/index.html');
  const nextHomepageText = simulation.working.get('da/index.html');
  const regions = extractProtectedRegions('da/index.html', nextHomepageText);
  const newHomepage = {
    ...oldHomepage,
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
  assert.deepEqual(newHomepage.protectedRegionSha256, oldHomepage.protectedRegionSha256, 'da/index.html protected SEO/FAQ hashes must remain unchanged');
  assert.deepEqual(newHomepage.markerCounts, oldHomepage.markerCounts, 'da/index.html protected marker counts must remain unchanged');
  assert.equal(newHomepage.faqItemCount, oldHomepage.faqItemCount, 'da/index.html FAQ item count must remain unchanged');
  assert.equal(newHomepage.faqJsonLdCount, oldHomepage.faqJsonLdCount, 'da/index.html FAQ JSON-LD count must remain unchanged');
  assert.equal(newHomepage.h1Count, oldHomepage.h1Count, 'da/index.html H1 count must remain unchanged');
  assert.equal(newHomepage.byteLength, oldHomepage.byteLength, 'same-length brand correction must preserve da/index.html byte length');
  assert.notEqual(newHomepage.postHeadBodySha256, oldHomepage.postHeadBodySha256, 'da/index.html approved brand correction must change post-head body hash');

  return {
    body,
    downloadMetadata,
    preservation: [{
      file: 'da/index.html',
      oldValue: oldHomepage,
      newValue: newHomepage,
      reason: 'approved page-specific BushBook-to-HushBook corrections change body hash only; protected SEO copy, FAQ, FAQ JSON-LD, markers, counts, newline style, and byte length remain unchanged',
    }],
  };
}

function main() {
  assert.deepEqual(process.argv.slice(2), [], 'review script accepts no arguments and never writes files');
  const notund = notundReviews();
  const replacements = [
    ...frenchEntries(),
    ...tokenLineEntries(
      DANISH_FILES,
      'BushBook',
      'HushBook',
      'BushBook',
      (file, index) => ({
        type: 'page-specific-brand-review',
        file,
        line: index + 1,
        evidence: 'same route identifies product as HushBook via title, canonical domain, wordmark, app-store links, and/or legal definition',
      }),
      'correct unambiguous HushBook product-name substitution in this exact page context; preserve surrounding Danish copy and markup',
    ),
    ...viDownloadEntries(),
    ...tokenLineEntries(
      VIETNAMESE_FILES,
      'HuhBook',
      'HushBook',
      'HuhBook',
      (file, index) => ({
        type: 'git-history-and-page-specific-brand-review',
        revision: TRUSTED_REVISION,
        file,
        line: index + 1,
        evidence: 'trusted history and same-page product identity use HushBook in this exact role',
      }),
      'correct unambiguous HushBook product-name substitution in this exact page context; preserve surrounding Vietnamese copy and markup',
    ),
    ...tokenLineEntries(
      ['th/download.html', 'th/terms-conditions.html', 'th/refund-policy.html'],
      'HBTER2X',
      'Google Play',
      'HBTER2X',
      (file, index) => ({
        type: 'page-specific-store-review',
        file,
        line: index + 1,
        evidence: 'same page pairs token with Apple App Store or a play.google.com link and separately names Google Play',
      }),
      'restore exact Google Play store name in this page-specific context; preserve surrounding Thai copy and markup',
    ),
    ...hboEntries(),
    ...notund.approved,
  ];

  const ids = replacements.map((entry) => entry.id);
  assert.equal(new Set(ids).size, ids.length, 'replacement IDs must be unique');
  const simulation = applyEntries(replacements);
  const baselines = baselineUpdates(replacements, simulation);

  const artifactExpectedOccurrences = {
    BushBook: 75,
    HuhBook: 59,
    HBTER2X: 6,
    HBOPEXIX: 6,
    Notund: 3,
  };
  for (const [artifact, expectedCount] of Object.entries(artifactExpectedOccurrences)) {
    const approvedCount = replacements
      .filter((entry) => entry.artifact === artifact)
      .reduce((total, entry) => total + count(entry.oldText, artifact), 0);
    const blockedCount = artifact === 'Notund' ? count(notund.blocked.oldText, artifact) : 0;
    assert.equal(approvedCount + blockedCount, expectedCount, `${artifact} review coverage must be complete`);
  }

  const map = {
    schemaVersion: 1,
    reviewedOn: REVIEW_DATE,
    policy: {
      defaultMode: 'dry-run',
      allowedModes: ['--dry-run', '--write'],
      exactMatchOnly: true,
      globalRegexAllowed: false,
      fileWideReplacementAllowed: false,
      deleteFilesOrHtmlBlocksAllowed: false,
    },
    uFFFDReview: {
      files: FRENCH_FILES,
      expectedOccurrencesByFile: FRENCH_EXPECTED_COUNTS,
      expectedTotal: 955,
      reviewedAreas: [
        'head metadata',
        'navigation',
        'ARIA labels',
        'legal/customer body text',
        'footer text',
        'JSON-LD',
      ],
      status: 'approved-complete',
      trustedSources: [
        `${TRUSTED_REVISION}:six French routes`,
        'fr-argos/download.html',
      ],
    },
    artifactReview: {
      expectedOccurrences: artifactExpectedOccurrences,
      status: 'complete-with-one-explicitly-blocked-context',
    },
    replacements,
    blockedReviews: [notund.blocked],
    blockedRoutes: [{
      file: 'tr/refund-policy.html',
      reason: 'contains one reviewed/blocked Notund legal/customer-facing phrase without exact trusted Turkish source; exclude during later indexation gating',
    }],
    expectedPostWriteSha256: Object.fromEntries(
      [...simulation.working.entries()]
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([file, text]) => [file, sha256(text)]),
    ),
    baselineUpdates: baselines,
  };

  process.stdout.write(`${JSON.stringify(map, null, 2)}\n`);
}

main();
