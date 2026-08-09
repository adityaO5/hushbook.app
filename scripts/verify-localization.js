'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { mockupRoot, publicPages } = require('../localization.config');
const releasePath = path.join(process.cwd(), 'data', 'mockup-ai-release.json');
const release = fs.existsSync(releasePath)
  ? JSON.parse(fs.readFileSync(releasePath, 'utf8'))
  : { mode: 'masters', approvedLocales: [] };
const assetMode = process.env.MOCKUP_ASSET_MODE || release.mode || 'masters';
const approvedLocales = new Set(release.approvedLocales || []);

const locale = process.argv[2] || 'de';
const localeDir = path.join(process.cwd(), locale);

if (!fs.existsSync(localeDir)) {
  throw new Error(`Missing locale directory: ${localeDir}`);
}

// High-signal interface copy. Extend this list whenever review finds a new
// English leak; exceptions belong in docs/LOCALIZATION_QA.md, not in this list.
const tokens = ['Download','Read-along','Privacy','Accessibility','Analytics','Habit insights','Genre radar','Honest goals','Book info','My Collections','Search by Title','Upload Audiobook','Choose your profile','Improve Reading Comprehension','Brain Health','Words per book','Total books read','Transcribe','Transcribing','Save','Terms and Conditions','Refund Policy','Privacy Policy'];
// “Transcribe” is valid Spanish (imperative), and “Transcribeer” is valid
// Dutch. Keep those target-language words out of the English-leak detector.
const allowed = new Set(locale === 'es-ES' || locale === 'es-419' ? ['Transcribe'] : []);
const englishUi = new RegExp(`\\b(?:${tokens.filter(token => !allowed.has(token)).map(token => token.replace(/[.*+?^${}()|[\\]\\]/g, '\\\\$&')).join('|')})\\b`, 'i');

const failures = [];
for (const page of publicPages) {
  const file = path.join(localeDir, page);
  if (!fs.existsSync(file)) {
    failures.push(`${file}: missing page`);
    continue;
  }

  const html = fs.readFileSync(file, 'utf8');
  if (!new RegExp(`<html lang="${locale}">`).test(html)) failures.push(`${file}: wrong lang attribute`);
  const localeMockupRoot = `/assets/img/mockups/locales/${locale}/`;
  const expectsLocalizedMockups = assetMode === 'localized' && approvedLocales.has(locale);
  const hasLocaleMockupReference = html.includes(localeMockupRoot);
  // Legal/about pages may have no mockup images at all. Require a localized
  // reference only when the page actually contains a mockup master reference.
  const hasMockupReference = /\/assets\/img\/mockups\/(?!locales\/)/.test(html);
  if (expectsLocalizedMockups && hasMockupReference && !hasLocaleMockupReference) failures.push(`${file}: missing approved locale mockup references`);
  if (!expectsLocalizedMockups && hasLocaleMockupReference) failures.push(`${file}: pending locale mockup reference`);

  const stripped = html
    .replace(/\s(?:href|src|action|id|class|property|name|rel)=(?:"[^"]*"|'[^']*')/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    .replace(/\b(?:https?:\/\/|www\.)\S+\b/gi, '')
    .replace(/\b(?:sentry\.io\/privacy|archive\.org|huggingface\.co)\b/gi, '');
  const match = stripped.match(englishUi);
  if (match) failures.push(`${file}: unapproved English UI copy “${match[0]}”`);
}

if (failures.length) throw new Error(`Localization QA failed:\n${failures.join('\n')}`);
console.log(`${locale}: locale mockup references and high-signal English UI scan pass.`);
