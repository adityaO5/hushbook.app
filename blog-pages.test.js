'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { posts } = require('./data/blog-posts');

const root = __dirname;
const site = 'https://hushbook.app';
const read = (rel) => fs.readFileSync(path.join(root, rel), 'utf8');

assert.ok(posts.length >= 1, 'at least one blog post must be configured');
assert.equal(new Set(posts.map((post) => post.slug)).size, posts.length, 'blog slugs must be unique');

const hub = read('blog/index.html');
assert.match(hub, new RegExp(`<link rel="canonical" href="${site}/blog">`));
assert.ok(hub.includes('"@type":"Blog"'), 'blog hub needs Blog schema');

const feed = read('blog/feed.xml');
const sitemap = read('sitemap.xml');
const llms = read('llms.txt');
assert.ok(sitemap.includes(`<loc>${site}/blog</loc>`), 'sitemap must include /blog');

for (const post of posts) {
  const canonical = `${site}/blog/${post.slug}`;
  assert.ok(fs.existsSync(path.join(root, 'content', 'blog', `${post.slug}.md`)), `${post.slug} needs markdown source`);
  assert.ok(post.description.length <= 240, `${post.slug} description is too long`);
  assert.ok(post.metaTitle.length <= 60, `${post.slug} metaTitle must fit in 60 characters`);
  assert.ok(post.faqs.length >= 3, `${post.slug} needs at least three FAQs`);
  assert.ok(post.takeaways.length >= 3, `${post.slug} needs key takeaways`);

  const html = read(`blog/${post.slug}.html`);
  assert.match(html, new RegExp(`<link rel="canonical" href="${canonical}">`));
  assert.equal((html.match(/hreflang=/g) || []).length, 2, `${post.slug} must stay English-only`);
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${post.slug} must have exactly one h1`);
  assert.ok(html.includes('"@type":"BlogPosting"'), `${post.slug} needs BlogPosting schema`);
  assert.ok(html.includes('"@type":"FAQPage"'), `${post.slug} needs FAQ schema`);
  assert.ok(html.includes('"@type":"BreadcrumbList"'), `${post.slug} needs breadcrumb schema`);
  assert.ok(html.includes(`"datePublished":"${post.datePublished}"`), `${post.slug} needs datePublished`);
  assert.ok(html.includes('utm_medium%3Dblog'), `${post.slug} Google Play CTA needs install UTM referrer`);

  for (const [, href] of html.matchAll(/href="(\/[^"#?]*)/g)) {
    if (href === '/' || href.startsWith('/assets/')) continue;
    const clean = href.replace(/^\//, '').replace(/\/$/, '');
    const exists = fs.existsSync(path.join(root, `${clean}.html`)) || fs.existsSync(path.join(root, clean, 'index.html'));
    assert.ok(exists, `${post.slug} has a broken internal link: ${href}`);
  }

  assert.ok(hub.includes(`/blog/${post.slug}`), `blog hub must link to ${post.slug}`);
  assert.ok(feed.includes(`<link>${canonical}</link>`), `RSS feed must include ${post.slug}`);
  assert.ok(sitemap.includes(`<loc>${canonical}</loc>`), `sitemap must include ${post.slug}`);
  assert.ok(llms.includes(canonical), `llms.txt must list ${post.slug}`);
}

const homepage = read('index.html');
assert.ok(homepage.split('<footer')[1].includes('href="/blog"'), 'homepage footer must link to /blog');

console.log(`Blog contracts pass for ${posts.length} post(s).`);
