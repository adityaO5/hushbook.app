'use strict';

const fs = require('node:fs');
const path = require('node:path');
const localeConfig = require('../localization.config');

const ROOT = path.join(__dirname, '..');
const BASE_URL = 'https://hushbook.app';
const DEFAULT_LOCALE = localeConfig.defaultLocale || 'en';
const PUBLISHED_LOCALES = [...(localeConfig.publishedLocales || [])];
const PUBLIC_PAGES = (localeConfig.publicPages || []).map((page) => page.replace(/\.html$/, ''));
const INDEXABLE_ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

function normalizePage(page) {
  const name = String(page).replace(/\.html$/, '');
  return name || 'index';
}

function pagePath(locale, page) {
  const pageName = normalizePage(page);
  if (locale === DEFAULT_LOCALE) {
    return pageName === 'index' ? '/' : `/${pageName}`;
  }
  return pageName === 'index' ? `/${locale}` : `/${locale}/${pageName}`;
}

function pageUrl(locale, page) {
  return `${BASE_URL}${pagePath(locale, page)}`;
}

function normalizeCanonicalUrl(value) {
  const url = new URL(value, BASE_URL);
  const pathname = url.pathname || '/';
  const cleanPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
  return `${url.origin}${cleanPath}${url.search}${url.hash}`;
}

function pageFile(locale, page) {
  const pageName = normalizePage(page);
  return locale === DEFAULT_LOCALE
    ? path.join(ROOT, `${pageName}.html`)
    : path.join(ROOT, locale, `${pageName}.html`);
}

function escapeAttribute(value) {
  return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function replaceAttribute(tag, attribute, value) {
  const pattern = new RegExp(`(\\b${attribute}\\s*=\\s*)(["'])([^"']*)(\\2)`, 'i');
  return tag.replace(pattern, (match, prefix, quote) => `${prefix}${quote}${escapeAttribute(value)}${quote}`);
}

function insertBeforeHeadClose(html, content, newline) {
  const marker = /<\/head\s*>/i;
  if (!marker.test(html)) return `${html}${newline}${content}`;
  return html.replace(marker, `${content}${newline}</head>`);
}

function upsertHeadTag(html, selector, attribute, value, createTag, newline) {
  let seen = false;
  const updated = html.replace(selector, (tag) => {
    if (seen) return '';
    seen = true;
    return replaceAttribute(tag, attribute, value);
  });
  return seen ? updated : insertBeforeHeadClose(updated, createTag(value), newline);
}

function languageCatchalls() {
  const published = new Set(PUBLISHED_LOCALES);
  const redirects = localeConfig.legacyRedirects || {};
  const catchalls = new Map();
  for (const locale of PUBLISHED_LOCALES) {
    const dash = locale.indexOf('-');
    if (dash === -1) continue;
    const lang = locale.slice(0, dash);
    if (published.has(lang) || catchalls.has(lang)) continue;
    const redirected = redirects[lang];
    const target = published.has(redirected) ? redirected : locale;
    catchalls.set(lang, target);
  }
  return catchalls;
}

/**
 * Full reciprocal hreflang cluster for a page:
 *  - one entry per published locale (self + siblings)
 *  - language-only catchalls when we only publish regional variants
 *    (es → es-ES, pt → pt-PT) so unmatched Spanish/Portuguese queries
 *    still map to a localized URL instead of English
 *  - language-COUNTRY extras from countryLocales (de-DE, es-MX, ja-JP, …)
 *    pointing at the same published page — never at a 301 alias
 *  - x-default → English
 */
function hreflangAlternates(page) {
  const seen = new Set();
  const entries = [];
  const add = (code, locale) => {
    const key = String(code).toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    entries.push({ hreflang: code, href: pageUrl(locale, page) });
  };

  for (const locale of PUBLISHED_LOCALES) add(locale, locale);
  for (const [lang, target] of languageCatchalls()) add(lang, target);
  for (const [country, locale] of Object.entries(localeConfig.countryLocales || {})) {
    const lang = String(locale).split('-')[0];
    add(`${lang}-${country}`, locale);
  }
  add('x-default', DEFAULT_LOCALE);
  return entries;
}

function buildHreflangBlock(page, newline) {
  return hreflangAlternates(page)
    .map(({ hreflang, href }) => `<link rel="alternate" hreflang="${hreflang}" href="${href}">`)
    .join(newline);
}

function injectHreflang(html, page) {
  const newline = html.includes('\r\n') ? '\r\n' : '\n';
  const alternateTag = /[ \t]*<link\b(?=[^>]*\brel\s*=\s*["']alternate["'])(?=[^>]*\bhreflang\s*=\s*["'][^"']+["'])[^>]*>[ \t]*[\r\n]*/gi;
  const withoutAlternates = html.replace(alternateTag, '');
  const block = buildHreflangBlock(page, newline);
  const canonicalTag = /<link\b(?=[^>]*\brel\s*=\s*["']canonical["'])[^>]*>/i;
  if (canonicalTag.test(withoutAlternates)) {
    return withoutAlternates.replace(canonicalTag, (tag) => `${tag}${newline}${block}`);
  }
  return insertBeforeHeadClose(withoutAlternates, block, newline);
}

function normalizeJsonLd(html, canonical) {
  return html.replace(
    /(<script\b[^>]*\btype\s*=\s*["']application\/ld\+json["'][^>]*>)([\s\S]*?)(<\/script\s*>)/gi,
    (full, open, body, close) => {
      const trimmed = body.trim();
      if (!trimmed) return full;

      try {
        const data = JSON.parse(trimmed);
        let changed = false;
        const visit = (value) => {
          if (Array.isArray(value)) {
            value.forEach(visit);
            return;
          }
          if (!value || typeof value !== 'object') return;
          if (value['@type'] === 'SoftwareApplication' && typeof value.url === 'string') {
            if (value.url !== canonical) {
              value.url = canonical;
              changed = true;
            }
          }
          Object.values(value).forEach(visit);
        };
        visit(data);
        if (!changed) return full;
        const leading = body.match(/^\s*/)?.[0] || '';
        const trailing = body.match(/\s*$/)?.[0] || '';
        return `${open}${leading}${JSON.stringify(data, null, 2)}${trailing}${close}`;
      } catch {
        if (!/"@type"\s*:\s*"SoftwareApplication"/.test(body)) return full;
        const replaced = body.replace(/("url"\s*:\s*")[^"]*(")/, `$1${canonical}$2`);
        return `${open}${replaced}${close}`;
      }
    },
  );
}

function localizeInternalHref(locale, href) {
  if (locale === DEFAULT_LOCALE) return null;

  let absolute = false;
  let relativeHref = href;
  if (href === BASE_URL || href.startsWith(`${BASE_URL}/`)) {
    const url = new URL(href);
    if (url.origin !== BASE_URL) return null;
    absolute = true;
    relativeHref = `${url.pathname}${url.search}${url.hash}`;
  } else if (!href.startsWith('/')) {
    return null;
  }

  const match = relativeHref.match(/^\/([^?#]*)([?#].*)?$/);
  if (!match) return null;

  let route = match[1].replace(/\/+$/, '');
  if (route.endsWith('.html')) route = route.slice(0, -5);
  const page = route || 'index';
  if (!PUBLIC_PAGES.includes(page)) return null;
  const localized = `${pagePath(locale, page)}${match[2] || ''}`;
  return absolute ? `${BASE_URL}${localized}` : localized;
}

function localizeInternalLinks(html, locale) {
  if (locale === DEFAULT_LOCALE) return html;
  return html.replace(/<a\b[^>]*>/gi, (tag) => {
    const hrefPattern = /(\bhref\s*=\s*)(["'])([^"']*)(\2)/i;
    return tag.replace(hrefPattern, (match, prefix, quote, href) => {
      const localized = localizeInternalHref(locale, href);
      return localized ? `${prefix}${quote}${escapeAttribute(localized)}${quote}` : match;
    });
  });
}

function normalizeLocalizedSeoHtml(html, locale, page) {
  const pageName = normalizePage(page);
  const canonical = pageUrl(locale, pageName);
  const newline = html.includes('\r\n') ? '\r\n' : '\n';
  let output = html;

  if (/<html\b[^>]*\blang\s*=\s*["'][^"']*["']/i.test(output)) {
    output = output.replace(
      /(<html\b[^>]*\blang\s*=\s*["'])[^"']*(["'])/i,
      `$1${locale}$2`,
    );
  } else {
    output = output.replace(/<html\b/i, `<html lang="${locale}"`);
  }

  output = upsertHeadTag(
    output,
    /<link\b(?=[^>]*\brel\s*=\s*["']canonical["'])[^>]*>/gi,
    'href',
    canonical,
    (value) => `<link rel="canonical" href="${escapeAttribute(value)}">`,
    newline,
  );
  output = upsertHeadTag(
    output,
    /<meta\b(?=[^>]*\bname\s*=\s*["']robots["'])[^>]*>/gi,
    'content',
    INDEXABLE_ROBOTS,
    (value) => `<meta name="robots" content="${escapeAttribute(value)}">`,
    newline,
  );
  output = upsertHeadTag(
    output,
    /<meta\b(?=[^>]*\bproperty\s*=\s*["']og:url["'])[^>]*>/gi,
    'content',
    canonical,
    (value) => `<meta property="og:url" content="${escapeAttribute(value)}">`,
    newline,
  );
  output = normalizeJsonLd(output, canonical);
  output = localizeInternalLinks(output, locale);
  return injectHreflang(output, pageName);
}

function normalizePublishedFiles() {
  let changed = 0;
  for (const locale of PUBLISHED_LOCALES) {
    for (const page of PUBLIC_PAGES) {
      const file = pageFile(locale, page);
      if (!fs.existsSync(file)) {
        throw new Error(`Missing published page: ${path.relative(ROOT, file)}`);
      }
      const before = fs.readFileSync(file, 'utf8');
      const after = normalizeLocalizedSeoHtml(before, locale, page);
      if (after !== before) {
        fs.writeFileSync(file, after, 'utf8');
        changed += 1;
      }
    }
  }
  return changed;
}

module.exports = {
  BASE_URL,
  DEFAULT_LOCALE,
  INDEXABLE_ROBOTS,
  normalizeCanonicalUrl,
  PUBLIC_PAGES,
  PUBLISHED_LOCALES,
  hreflangAlternates,
  injectHreflang,
  languageCatchalls,
  localizeInternalHref,
  normalizeLocalizedSeoHtml,
  normalizePublishedFiles,
  pageFile,
  pagePath,
  pageUrl,
};
