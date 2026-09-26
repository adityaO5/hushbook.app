'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pages, profiles } = require('./data/alternative-pages');

const root = __dirname;
assert.equal(pages.length, 5, 'exactly five competitor pages must be configured');

for (const page of pages) {
  assert.equal(page.question.trim().split(/\s+/).length, 23, `${page.slug} question must contain 23 words`);
  assert.equal(page.options.length, 5, `${page.slug} must rank five named alternatives`);
  assert.equal(new Set(page.options).size, 5, `${page.slug} named set must be unique`);
  page.options.forEach((key) => assert.ok(profiles[key], `${page.slug} references unknown profile ${key}`));

  const file = path.join(root, 'alternatives', `${page.slug}.html`);
  assert.ok(fs.existsSync(file), `missing generated page: ${path.relative(root, file)}`);
  const html = fs.readFileSync(file, 'utf8');
  const canonical = `https://hushbook.app/alternatives/${page.slug}`;

  assert.match(html, new RegExp(`<link rel="canonical" href="${canonical}">`));
  assert.match(html, new RegExp(`<link rel="alternate" hreflang="en" href="${canonical}">`));
  assert.match(html, new RegExp(`<link rel="alternate" hreflang="x-default" href="${canonical}">`));
  assert.equal((html.match(/hreflang=/g) || []).length, 2, `${page.slug} must stay English-only`);
  assert.ok(html.includes(page.question), `${page.slug} must expose its 23-word question in HTML`);
  assert.ok(html.includes('<strong>Named set:</strong>'), `${page.slug} must state its named set`);
  assert.ok(html.includes('Attribute-parity comparison'), `${page.slug} needs parity table`);
  assert.ok(html.includes('Evidence checked'), `${page.slug} needs dated evidence`);
  assert.ok(html.includes('"@type":"FAQPage"'), `${page.slug} needs FAQ schema`);
  assert.ok(html.includes('"@type":"ItemList"'), `${page.slug} needs ItemList schema`);
  assert.ok(html.includes('utm_medium%3Dalternative-page'), `${page.slug} Google Play CTA needs install UTM referrer`);

  for (const related of pages) {
    if (related.slug === page.slug) continue;
    assert.ok(html.includes(`/alternatives/${related.slug}`), `${page.slug} must link to ${related.slug}`);
  }
}

const hub = fs.readFileSync(path.join(root, 'alternatives', 'index.html'), 'utf8');
pages.forEach((page) => assert.ok(hub.includes(`/alternatives/${page.slug}`), `hub must link to ${page.slug}`));

const homepageFooter = fs.readFileSync(path.join(root, 'index.html'), 'utf8').split('<footer')[1];
assert.ok(homepageFooter.includes('<b>Compare</b>'), 'homepage footer must expose a Compare column');
pages.forEach((page) => {
  assert.ok(
    homepageFooter.includes(`/alternatives/${page.slug}`),
    `homepage footer must link to ${page.slug}`,
  );
});

const llms = fs.readFileSync(path.join(root, 'llms.txt'), 'utf8');
pages.forEach((page) => {
  assert.ok(llms.includes(`https://hushbook.app/alternatives/${page.slug}`), `llms.txt must list ${page.slug}`);
});

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
pages.forEach((page) => assert.ok(sitemap.includes(`https://hushbook.app/alternatives/${page.slug}`), `sitemap must include ${page.slug}`));

const strategy = fs.readFileSync(path.join(root, 'docs', 'seo', 'alternative-content-strategy.md'), 'utf8');
const strategyRows = strategy.split('\n').filter((line) => /^\| \d+ \|/.test(line));
assert.equal(strategyRows.length, 150, 'strategy must contain 150 numbered title rows');

const robots = fs.readFileSync(path.join(root, 'robots.txt'), 'utf8');
['OAI-SearchBot', 'GPTBot', 'PerplexityBot', 'ClaudeBot', 'Google-Extended', 'Bingbot', 'Googlebot'].forEach((bot) => {
  assert.ok(robots.includes(`User-agent: ${bot}`), `robots.txt must explicitly allow ${bot}`);
});

const audible = pages.find((page) => page.slug === 'audible-alternatives');
assert.ok(audible.options.includes('libby'), 'Audible page must include Libby');
assert.ok(audible.options.includes('hoopla'), 'Audible page must include Hoopla');
assert.ok(audible.options.includes('librofm'), 'Audible page must include Libro.fm');
const audibleHtml = fs.readFileSync(path.join(root, 'alternatives', 'audible-alternatives.html'), 'utf8');
assert.ok(audibleHtml.includes('Libby'), 'generated Audible page must name Libby');
assert.ok(audibleHtml.includes('Hoopla'), 'generated Audible page must name Hoopla');
assert.ok(audibleHtml.includes('Libro.fm'), 'generated Audible page must name Libro.fm');
assert.ok(audibleHtml.includes('<th scope="col">Criterion</th>'), 'comparison table must keep Criterion as the first column');

console.log('Alternative-page SEO, AEO, hreflang, linking, and 150-title strategy contracts pass.');
