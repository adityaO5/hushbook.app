'use strict';

/*
 * Creates private localization drafts from English source pages using the
 * Google Translate endpoint explicitly approved for this project.  It keeps
 * page markup, shared asset paths, URLs, and non-visible code intact.
 */
const fs = require('node:fs/promises');
const path = require('node:path');

const pages = [
  'index.html', 'download.html', 'about.html', 'privacy-policy.html',
  'terms-conditions.html', 'refund-policy.html', 'licenses.html',
];
const locales = process.argv.slice(2);
if (!locales.length) throw new Error('Pass one or more locale codes.');

const runtimeCopy = [
  'Close menu', 'Open menu', 'Opening the right store for your device…',
];
const protectedTerms = ['HushBook', 'HushBook Engine', 'App Store', 'Google Play', 'iOS', 'Android'];

function decodeHtml(value) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(parseInt(n, 10)))
    .replace(/&(amp|lt|gt|quot|apos|nbsp);/gi, (_, n) => ({ amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' })[n.toLowerCase()]);
}

function escapeHtml(value, attr = false) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(attr ? /"/g : /$^/, '&quot;');
}

function normalize(value) { return value.replace(/\s+/g, ' ').trim(); }
function canTranslate(value) {
  const v = normalize(value);
  if (!v || !/[A-Za-z]/.test(v) || /^https?:|^\/|^#|^mailto:|^tel:|^[\w.-]+@[\w.-]+$/.test(v)) return false;
  if (/^(website|summary_large_image|en|true|false|noopener|noreferrer)$/i.test(v)) return false;
  return true;
}

function maskTerms(value) {
  const saved = [];
  let out = value;
  for (const term of protectedTerms) {
    const token = `ZZPROTECT${saved.length}ZZ`;
    if (out.includes(term)) { saved.push([token, term]); out = out.split(term).join(token); }
  }
  return { out, saved };
}
function unmaskTerms(value, saved) {
  for (const [token, term] of saved) value = value.split(token).join(term);
  return value;
}

async function googleTranslate(values, locale) {
  const unique = [...new Set(values.filter(canTranslate))];
  const batches = [];
  let batch = [];
  let length = 0;
  for (let i = 0; i < unique.length; i++) {
    const item = maskTerms(unique[i]);
    const line = `[[[${i}]]] ${item.out}`;
    if (batch.length && length + line.length + 1 > 3500) { batches.push(batch); batch = []; length = 0; }
    batch.push({ i, ...item }); length += line.length + 1;
  }
  if (batch.length) batches.push(batch);
  const translated = new Map();
  let cursor = 0;
  async function runBatch(items) {
    const text = items.map(({ i, out }) => `[[[${i}]]] ${out}`).join('\n');
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${encodeURIComponent(locale)}&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Google Translate ${response.status}`);
    const data = await response.json();
    const output = data[0].map(part => part[0]).join('');
    const found = new Map();
    const rx = /\[\[\[(\d+)\]\]\]\s*([\s\S]*?)(?=\n?\[\[\[\d+\]\]\]|$)/g;
    for (const match of output.matchAll(rx)) found.set(Number(match[1]), match[2].trim());
    for (const item of items) {
      const value = found.get(item.i);
      if (!value) throw new Error(`Translation marker missing for ${locale}, item ${item.i}`);
      translated.set(unique[item.i], unmaskTerms(value, item.saved));
    }
    cursor++;
    process.stdout.write(`${locale} ${cursor}/${batches.length}\r`);
  }
  const queue = [...batches];
  const workers = Array.from({ length: 3 }, async () => { while (queue.length) await runBatch(queue.shift()); });
  await Promise.all(workers);
  process.stdout.write('\n');
  return translated;
}

function stringsInHtml(html) {
  const values = [];
  const opaque = /<script\b[\s\S]*?<\/script\s*>|<style\b[\s\S]*?<\/style\s*>|<!--[\s\S]*?-->/gi;
  let last = 0;
  for (const block of html.matchAll(opaque)) {
    collectText(html.slice(last, block.index), values); last = block.index + block[0].length;
  }
  collectText(html.slice(last), values);
  html.replace(/\b(?:aria-label|alt|title|placeholder|content)=(['"])([\s\S]*?)\1/gi, (_, __, value) => { values.push(decodeHtml(value)); return _; });
  for (const copy of runtimeCopy) if (html.includes(copy)) values.push(copy);
  return values;
}
function collectText(fragment, values) {
  for (const match of fragment.matchAll(/>([^<>]+)</g)) values.push(decodeHtml(match[1]));
}
function replaceText(fragment, translations) {
  return fragment.replace(/>([^<>]+)</g, (all, raw) => {
    const value = decodeHtml(raw);
    const translated = translations.get(value);
    return translated ? `>${escapeHtml(translated)}<` : all;
  });
}
function localizeHtml(html, translations, locale) {
  const opaque = /<script\b[\s\S]*?<\/script\s*>|<style\b[\s\S]*?<\/style\s*>|<!--[\s\S]*?-->/gi;
  let result = '';
  let last = 0;
  for (const block of html.matchAll(opaque)) {
    result += replaceText(html.slice(last, block.index), translations) + block[0];
    last = block.index + block[0].length;
  }
  result += replaceText(html.slice(last), translations);
  result = result.replace(/\b(aria-label|alt|title|placeholder|content)=(['"])([\s\S]*?)\2/gi, (all, name, quote, raw) => {
    const translated = translations.get(decodeHtml(raw));
    return translated ? `${name}=${quote}${escapeHtml(translated, true)}${quote}` : all;
  });
  for (const copy of runtimeCopy) {
    const translated = translations.get(copy);
    if (translated) result = result.split(copy).join(translated.replace(/'/g, "\\'"));
  }
  result = result.replace(/<html lang="en">/i, `<html lang="${locale}">`);
  result = result.replace(/https:\/\/hushbook\.app\/(?!assets\/)/g, `https://hushbook.app/${locale}/`);
  return result;
}

async function main() {
  const source = await Promise.all(pages.map(page => fs.readFile(path.join(process.cwd(), page), 'utf8')));
  const values = source.flatMap(stringsInHtml);
  for (const locale of locales) {
    const translations = await googleTranslate(values, locale);
    const destination = path.join(process.cwd(), locale);
    await fs.mkdir(destination, { recursive: true });
    for (let i = 0; i < pages.length; i++) {
      await fs.writeFile(path.join(destination, pages[i]), localizeHtml(source[i], translations, locale), 'utf8');
    }
  }
}
main().catch(error => { console.error(error.stack || error); process.exitCode = 1; });
