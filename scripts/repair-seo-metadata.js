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
const BODY_BASELINE_PATH = path.join(ROOT, 'output', 'seo-repair-body-baseline.json');
const DOWNLOAD_IMAGE_PATH = path.join(ROOT, 'assets', 'img', 'og-hushbook.webp');
const DOWNLOAD_IMAGE_URL = 'https://hushbook.app/assets/img/og-hushbook.webp';
const DOWNLOAD_PAGE = 'download.html';
const WEBSITE = 'website';
const SUMMARY_LARGE_IMAGE = 'summary_large_image';

function readJson(jsonPath) {
  return JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
}

function toPosix(relativePath) {
  return relativePath.replace(/\\/g, '/');
}

function sha256Buffer(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex');
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

function assertRouteArtifact(artifact, expectedKeys, label) {
  assert.equal(artifact.schemaVersion, 1, `${label} schemaVersion must be 1`);
  assert.equal(artifact.routeCount, expectedKeys.length, `${label} routeCount must match published route count`);
  assert.ok(artifact.routes && typeof artifact.routes === 'object' && !Array.isArray(artifact.routes), `${label} routes must be object`);
  const actualKeys = Object.keys(artifact.routes).sort((left, right) => left.localeCompare(right));
  assert.deepEqual(actualKeys, expectedKeys, `${label} route keys must match published route set`);
}

function describeBinary(binaryValue) {
  if (binaryValue === null) return '<missing>';
  const utf8Value = Buffer.from(binaryValue, 'latin1').toString('utf8');
  const serialized = JSON.stringify(utf8Value);
  return serialized.length <= 180 ? serialized : `${serialized.slice(0, 177)}..."`;
}

function detectNewline(binaryText) {
  if (binaryText.includes('\r\n')) return '\r\n';
  if (binaryText.includes('\n')) return '\n';
  if (binaryText.includes('\r')) return '\r';
  return '\n';
}

function splitHeadBinary(binaryText, relativePath) {
  const headCloseMatch = /<\/head>/i.exec(binaryText);
  assert.ok(headCloseMatch, `${relativePath} must contain </head>`);
  return {
    headBinary: binaryText.slice(0, headCloseMatch.index),
    headCloseTag: headCloseMatch[0],
    tailBinary: binaryText.slice(headCloseMatch.index + headCloseMatch[0].length),
  };
}

function parseAttributes(tagBinary) {
  const attributes = {};
  for (const match of tagBinary.matchAll(/([A-Za-z_:][A-Za-z0-9:._-]*)\s*=\s*("([^"]*)"|'([^']*)')/g)) {
    attributes[match[1].toLowerCase()] = match[3] ?? match[4] ?? '';
  }
  return attributes;
}

function collectMetaTagMatches(fragmentBinary) {
  return [...fragmentBinary.matchAll(/<meta\b[^>]*>/gi)].map((match) => ({
    index: match.index,
    tagBinary: match[0],
    attributes: parseAttributes(match[0]),
  }));
}

function collectLinkTagMatches(fragmentBinary) {
  return [...fragmentBinary.matchAll(/<link\b[^>]*>/gi)].map((match) => ({
    index: match.index,
    tagBinary: match[0],
    attributes: parseAttributes(match[0]),
  }));
}

function getMetaMatches(fragmentBinary, attributeName, attributeValue) {
  return collectMetaTagMatches(fragmentBinary).filter((entry) => entry.attributes[attributeName] === attributeValue);
}

function getLinkMatches(fragmentBinary, attributeName, attributeValue) {
  return collectLinkTagMatches(fragmentBinary).filter((entry) => entry.attributes[attributeName] === attributeValue);
}

function getSingleCapture(fragmentBinary, pattern, label, relativePath) {
  const globalPattern = pattern.global ? pattern : new RegExp(pattern.source, `${pattern.flags}g`);
  const matches = [...fragmentBinary.matchAll(globalPattern)];
  assert.equal(matches.length, 1, `${relativePath} must contain exactly one ${label}`);
  return matches[0][1];
}

function getSingleTitle(headBinary, relativePath) {
  return getSingleCapture(headBinary, /<title>([\s\S]*?)<\/title>/i, '<title>', relativePath);
}

function getSingleMetaDescription(headBinary, relativePath) {
  const matches = getMetaMatches(headBinary, 'name', 'description');
  assert.equal(matches.length, 1, `${relativePath} must contain exactly one meta description`);
  const content = matches[0].attributes.content;
  assert.equal(typeof content, 'string', `${relativePath} meta description must have content attribute`);
  assert.notEqual(content, '', `${relativePath} meta description must not be empty`);
  return content;
}

function getSingleCanonical(headBinary, relativePath) {
  const matches = getLinkMatches(headBinary, 'rel', 'canonical');
  assert.equal(matches.length, 1, `${relativePath} must contain exactly one canonical link`);
  const href = matches[0].attributes.href;
  assert.equal(typeof href, 'string', `${relativePath} canonical link must have href attribute`);
  assert.notEqual(href, '', `${relativePath} canonical href must not be empty`);
  return href;
}

function getSingleContentAttribute(tagBinary, relativePath, label) {
  const matches = [...tagBinary.matchAll(/content\s*=\s*("([^"]*)"|'([^']*)')/gi)];
  assert.equal(matches.length, 1, `${relativePath} ${label} must contain exactly one content attribute`);
  const match = matches[0];
  const quote = match[2] !== undefined ? '"' : '\'';
  const valueBinary = match[2] ?? match[3] ?? '';
  const valueStartInMatch = match[0].indexOf(quote) + 1;
  return {
    valueBinary,
    start: match.index + valueStartInMatch,
    end: match.index + valueStartInMatch + valueBinary.length,
  };
}

function replaceContentValue(tagBinary, expectedValueBinary, relativePath, label) {
  const contentAttribute = getSingleContentAttribute(tagBinary, relativePath, label);
  return {
    oldValueBinary: contentAttribute.valueBinary,
    newTagBinary:
      tagBinary.slice(0, contentAttribute.start)
      + expectedValueBinary
      + tagBinary.slice(contentAttribute.end),
  };
}

function createMetaTag(attributeName, attributeValue, contentBinary) {
  return `<meta ${attributeName}="${attributeValue}" content="${contentBinary}">`;
}

function readRouteFile(relativePath) {
  const absolutePath = path.join(ROOT, relativePath);
  const buffer = fs.readFileSync(absolutePath);
  const binaryText = buffer.toString('latin1');
  return {
    absolutePath,
    relativePath,
    buffer,
    binaryText,
    newline: detectNewline(binaryText),
  };
}

function assertBodyHash(relativePath, buffer) {
  const binaryText = buffer.toString('latin1');
  const split = splitHeadBinary(binaryText, relativePath);
  const bodyBuffer = Buffer.from(split.tailBinary, 'latin1');
  const expectedBodyHash = BODY_BASELINE.routes[relativePath];
  const actualBodyHash = sha256Buffer(bodyBuffer);
  assert.equal(
    actualBodyHash,
    expectedBodyHash,
    `${relativePath} post-head body hash changed before metadata repair`,
  );
  return split;
}

function assertNoTargetMetaInBody(relativePath, bodyBinary, specs) {
  for (const spec of specs) {
    const bodyMatches = getMetaMatches(bodyBinary, spec.attributeName, spec.attributeValue);
    assert.equal(
      bodyMatches.length,
      0,
      `${relativePath} must not contain ${spec.attributeValue} meta tag after first </head>`,
    );
  }
}

function buildDownloadSpecs(titleBinary, descriptionBinary, canonicalBinary) {
  return [
    { key: 'og:type', attributeName: 'property', attributeValue: 'og:type', expectedContentBinary: WEBSITE, allowMissing: true, normalize: true },
    { key: 'og:site_name', attributeName: 'property', attributeValue: 'og:site_name', expectedContentBinary: 'HushBook', allowMissing: true, normalize: false },
    { key: 'og:title', attributeName: 'property', attributeValue: 'og:title', expectedContentBinary: titleBinary, allowMissing: true, normalize: false },
    { key: 'og:description', attributeName: 'property', attributeValue: 'og:description', expectedContentBinary: descriptionBinary, allowMissing: true, normalize: false },
    { key: 'og:url', attributeName: 'property', attributeValue: 'og:url', expectedContentBinary: canonicalBinary, allowMissing: true, normalize: false },
    { key: 'og:image', attributeName: 'property', attributeValue: 'og:image', expectedContentBinary: DOWNLOAD_IMAGE_URL, allowMissing: true, normalize: false },
    { key: 'twitter:card', attributeName: 'name', attributeValue: 'twitter:card', expectedContentBinary: SUMMARY_LARGE_IMAGE, allowMissing: true, normalize: true },
    { key: 'twitter:title', attributeName: 'name', attributeValue: 'twitter:title', expectedContentBinary: titleBinary, allowMissing: true, normalize: false },
    { key: 'twitter:description', attributeName: 'name', attributeValue: 'twitter:description', expectedContentBinary: descriptionBinary, allowMissing: true, normalize: false },
    { key: 'twitter:image', attributeName: 'name', attributeValue: 'twitter:image', expectedContentBinary: DOWNLOAD_IMAGE_URL, allowMissing: true, normalize: false },
  ];
}

function planFile(relativePath) {
  const isDownloadPage = path.basename(relativePath) === DOWNLOAD_PAGE;
  const source = readRouteFile(relativePath);
  const initialSplit = assertBodyHash(relativePath, source.buffer);
  const originalTailBinary = initialSplit.tailBinary;
  const replacements = [];
  const reportEntries = [];
  let workingBinary = source.binaryText;

  function applyReplacement(descriptor, reportEntry) {
    const nextBinary = workingBinary.replace(descriptor.oldText, descriptor.newText);
    assertExactReplacement(
      { file: relativePath, text: workingBinary },
      descriptor,
      nextBinary,
      descriptor.reason,
    );
    const nextSplit = splitHeadBinary(nextBinary, relativePath);
    assert.equal(
      nextSplit.tailBinary,
      originalTailBinary,
      `${relativePath} replacement changed bytes after first </head>`,
    );
    replacements.push(descriptor);
    if (reportEntry) {
      reportEntries.push(reportEntry);
    }
    workingBinary = nextBinary;
    return nextSplit;
  }

  let split = initialSplit;
  const protocolSpecs = [
    { key: 'og:type', attributeName: 'property', attributeValue: 'og:type', expectedContentBinary: WEBSITE, allowMissing: isDownloadPage, normalize: true },
    { key: 'twitter:card', attributeName: 'name', attributeValue: 'twitter:card', expectedContentBinary: SUMMARY_LARGE_IMAGE, allowMissing: isDownloadPage, normalize: true },
  ];
  const allBodyForbiddenSpecs = [];

  for (const spec of protocolSpecs) {
    allBodyForbiddenSpecs.push(spec);
    const matches = getMetaMatches(split.headBinary, spec.attributeName, spec.attributeValue);
    if (matches.length > 1) {
      throw new Error(`${relativePath} contains duplicate ${spec.attributeValue} meta tags in <head>`);
    }
    if (matches.length === 0) {
      if (!spec.allowMissing) {
        throw new Error(`${relativePath} must contain exactly one ${spec.attributeValue} meta tag in <head>`);
      }
      continue;
    }
    const match = matches[0];
    const currentValueBinary = match.attributes.content;
    assert.equal(typeof currentValueBinary, 'string', `${relativePath} ${spec.attributeValue} meta tag must include content`);
    if (currentValueBinary === spec.expectedContentBinary) continue;
    const normalizedTag = replaceContentValue(match.tagBinary, spec.expectedContentBinary, relativePath, spec.attributeValue);
    split = applyReplacement(
      {
        file: relativePath,
        oldText: match.tagBinary,
        newText: normalizedTag.newTagBinary,
        reason: `normalize ${spec.attributeValue} meta tag inside head`,
      },
      {
        action: 'replace',
        key: spec.key,
        oldValueBinary: normalizedTag.oldValueBinary,
        newValueBinary: spec.expectedContentBinary,
      },
    );
  }

  if (isDownloadPage) {
    assert.ok(fs.existsSync(DOWNLOAD_IMAGE_PATH), `${path.relative(ROOT, DOWNLOAD_IMAGE_PATH)} must exist before adding download social tags`);
    const titleBinary = getSingleTitle(split.headBinary, relativePath);
    const descriptionBinary = getSingleMetaDescription(split.headBinary, relativePath);
    const canonicalBinary = getSingleCanonical(split.headBinary, relativePath);
    const downloadSpecs = buildDownloadSpecs(titleBinary, descriptionBinary, canonicalBinary);
    const missingSpecs = [];

    for (const spec of downloadSpecs) {
      allBodyForbiddenSpecs.push(spec);
      const matches = getMetaMatches(split.headBinary, spec.attributeName, spec.attributeValue);
      if (matches.length > 1) {
        throw new Error(`${relativePath} contains duplicate ${spec.attributeValue} meta tags in <head>`);
      }
      if (matches.length === 0) {
        if (!spec.allowMissing) {
          throw new Error(`${relativePath} is missing required ${spec.attributeValue} meta tag in <head>`);
        }
        missingSpecs.push(spec);
        continue;
      }

      const match = matches[0];
      const currentValueBinary = match.attributes.content;
      assert.equal(typeof currentValueBinary, 'string', `${relativePath} ${spec.attributeValue} meta tag must include content`);
      if (currentValueBinary === spec.expectedContentBinary) continue;
      if (!spec.normalize) {
        throw new Error(
          `${relativePath} has unexpected existing ${spec.attributeValue} content ${describeBinary(currentValueBinary)}; expected ${describeBinary(spec.expectedContentBinary)}`,
        );
      }
      const normalizedTag = replaceContentValue(match.tagBinary, spec.expectedContentBinary, relativePath, spec.attributeValue);
      split = applyReplacement(
        {
          file: relativePath,
          oldText: match.tagBinary,
          newText: normalizedTag.newTagBinary,
          reason: `normalize ${spec.attributeValue} meta tag inside head`,
        },
        {
          action: 'replace',
          key: spec.key,
          oldValueBinary: normalizedTag.oldValueBinary,
          newValueBinary: spec.expectedContentBinary,
        },
      );
    }

    if (missingSpecs.length > 0) {
      const prefix = split.headBinary.endsWith(source.newline) ? '' : source.newline;
      const insertionBlock = prefix
        + missingSpecs.map((spec) => createMetaTag(spec.attributeName, spec.attributeValue, spec.expectedContentBinary)).join(source.newline)
        + source.newline;
      split = applyReplacement(
        {
          file: relativePath,
          oldText: split.headCloseTag,
          newText: insertionBlock + split.headCloseTag,
          reason: 'add missing download social meta tags immediately before </head>',
        }
      );
      for (const spec of missingSpecs) {
        reportEntries.push({
          action: 'add',
          key: spec.key,
          oldValueBinary: null,
          newValueBinary: spec.expectedContentBinary,
        });
      }
    }
  }

  assertNoTargetMetaInBody(relativePath, split.tailBinary, allBodyForbiddenSpecs);

  return {
    relativePath,
    absolutePath: source.absolutePath,
    sourceBinary: source.binaryText,
    nextBinary: workingBinary,
    changed: workingBinary !== source.binaryText,
    reportEntries,
    replacements,
  };
}

function formatReport(plans, modeLabel) {
  const changedPlans = plans.filter((plan) => plan.changed);
  const lines = [
    `${modeLabel}: planned ${changedPlans.length} file(s); scanned ${plans.length} published file(s).`,
  ];

  for (const plan of changedPlans) {
    lines.push(plan.relativePath);
    for (const entry of plan.reportEntries) {
      lines.push(
        `  ${entry.action} ${entry.key}: ${describeBinary(entry.oldValueBinary)} -> ${describeBinary(entry.newValueBinary)}`,
      );
    }
  }

  if (changedPlans.length === 0) {
    lines.push('No head metadata changes needed.');
  }

  return `${lines.join('\n')}\n`;
}

function parseMode(argv) {
  const args = new Set(argv.slice(2));
  const knownArgs = new Set(['--dry-run', '--write']);
  for (const arg of args) {
    assert.ok(knownArgs.has(arg), `Unknown argument ${arg}`);
  }
  assert.ok(!(args.has('--dry-run') && args.has('--write')), 'Use either --dry-run or --write, not both');
  return args.has('--write') ? 'write' : 'dry-run';
}

const BODY_BASELINE = Object.freeze(readJson(BODY_BASELINE_PATH));
const PRESERVATION_BASELINE = Object.freeze(readJson(BASELINE_PATH));
const EXPECTED_ROUTE_PATHS = expectedRoutePaths();
const EXPECTED_DOWNLOAD_PATHS = expectedDownloadPaths();
assertRouteArtifact(BODY_BASELINE, EXPECTED_ROUTE_PATHS, 'Body baseline');
assert.deepEqual(EXPECTED_DOWNLOAD_PATHS.length, localeConfig.publishedLocales.length, 'Download route count must equal published locale count');

function buildPlans() {
  assertManifestUnchanged(PRESERVATION_BASELINE, buildManifest(ROOT));
  return EXPECTED_ROUTE_PATHS.map((relativePath) => planFile(relativePath));
}

function writePlans(plans) {
  const changedPlans = plans.filter((plan) => plan.changed);
  for (const plan of changedPlans) {
    const currentBinary = fs.readFileSync(plan.absolutePath).toString('latin1');
    assert.equal(currentBinary, plan.sourceBinary, `${plan.relativePath} changed after planning and before write`);
    fs.writeFileSync(plan.absolutePath, Buffer.from(plan.nextBinary, 'latin1'));
    const writtenBuffer = fs.readFileSync(plan.absolutePath);
    assert.equal(
      writtenBuffer.toString('latin1'),
      plan.nextBinary,
      `${plan.relativePath} write verification failed`,
    );
    assertBodyHash(plan.relativePath, writtenBuffer);
  }
  assertManifestUnchanged(PRESERVATION_BASELINE, buildManifest(ROOT));
  return changedPlans.length;
}

function main() {
  const mode = parseMode(process.argv);
  const plans = buildPlans();
  const report = formatReport(plans, mode === 'write' ? 'WRITE PLAN' : 'DRY RUN');
  process.stdout.write(report);

  if (mode === 'write') {
    const writeCount = writePlans(plans);
    process.stdout.write(`WRITE: updated ${writeCount} file(s).\n`);
  }
}

if (require.main === module) {
  main();
}
