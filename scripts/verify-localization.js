'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { mockupRoot, publicPages } = require('../localization.config');

const locale = process.argv[2] || 'de';
const localeDir = path.join(process.cwd(), locale);

if (!fs.existsSync(localeDir)) {
  throw new Error(`Missing locale directory: ${localeDir}`);
}

// High-signal interface copy. Extend this list whenever review finds a new
// English leak; exceptions belong in docs/LOCALIZATION_QA.md, not in this list.
const englishUi = /\b(?:Download|Read-along|Privacy|Accessibility|Analytics|Habit insights|Genre radar|Honest goals|Book info|My Collections|Search by Title|Upload Audiobook|Choose your profile|Improve Reading Comprehension|Brain Health|Words per book|Total books read|Transcribe|Transcribing|Save|Terms and Conditions|Refund Policy|Privacy Policy)\b/i;

const failures = [];
for (const page of publicPages) {
  const file = path.join(localeDir, page);
  if (!fs.existsSync(file)) {
    failures.push(`${file}: missing page`);
    continue;
  }

  const html = fs.readFileSync(file, 'utf8');
  if (!new RegExp(`<html lang="${locale}">`).test(html)) failures.push(`${file}: wrong lang attribute`);
  if (html.includes('/assets/img/mockups/de/')) failures.push(`${file}: locale-specific screenshot path`);
  if (html.match(new RegExp(`${mockupRoot.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}de/`))) failures.push(`${file}: generated screenshot path`);

  const stripped = html
    .replace(/\s(?:href|src|action)=(?:"[^"]*"|'[^']*')/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<svg[\s\S]*?<\/svg>/gi, '');
  const match = stripped.match(englishUi);
  if (match) failures.push(`${file}: unapproved English UI copy “${match[0]}”`);
}

if (failures.length) throw new Error(`Localization QA failed:\n${failures.join('\n')}`);
console.log(`${locale}: shared screenshots and high-signal English UI scan pass.`);
