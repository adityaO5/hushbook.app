'use strict';

/**
 * Builds the English blog: blog/index.html, blog/<slug>.html and blog/feed.xml
 * from data/blog-posts.js + content/blog/<slug>.md.
 *
 * Usage: node scripts/build-blog.js
 */
const fs = require('node:fs');
const path = require('node:path');
const { posts } = require('../data/blog-posts');

const root = path.join(__dirname, '..');
const outDir = path.join(root, 'blog');
const site = 'https://hushbook.app';
const author = {
  '@type': 'Person',
  '@id': `${site}/about#rakesh-aditya`,
  name: 'Rakesh Aditya',
  jobTitle: 'Creator of HushBook',
  url: `${site}/about`,
  image: `${site}/assets/img/rakesh.jpg`,
  sameAs: ['https://adityarakesh.xyz', 'https://www.linkedin.com/in/rakesh-aditya-194795181/']
};
const publisher = {
  '@type': 'Organization',
  '@id': `${site}/#organization`,
  name: 'HushBook',
  url: site,
  logo: { '@type': 'ImageObject', url: `${site}/assets/img/logo.png`, width: 192, height: 189 }
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function jsonLd(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

function slugify(value) {
  return String(value).toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function formatDate(iso) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

// Minimal Markdown: headings, paragraphs, "- " lists, links, **bold**, *italic*.
function inline(text) {
  return escapeHtml(text)
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => {
      const external = /^https?:\/\//.test(href) && !href.startsWith(site);
      return external
        ? `<a href="${href}" target="_blank" rel="noopener">${label}</a>`
        : `<a href="${href}">${label}</a>`;
    })
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');
}

function parseMarkdown(source) {
  const lines = source.replace(/\r\n/g, '\n').split('\n');
  let title = '';
  const headings = [];
  const html = [];
  let paragraph = [];
  let list = null;

  const flush = () => {
    if (paragraph.length) html.push(`<p>${inline(paragraph.join(' '))}</p>`);
    if (list) html.push(`<ul>\n${list.map((item) => `<li>${inline(item)}</li>`).join('\n')}\n</ul>`);
    paragraph = [];
    list = null;
  };

  for (const raw of lines) {
    const line = raw.trim();
    let match;
    if (!line) { flush(); continue; }
    if ((match = line.match(/^# (.+)$/))) { flush(); title = match[1]; continue; }
    if ((match = line.match(/^(#{2,3}) (.+)$/))) {
      flush();
      const level = match[1].length;
      const id = slugify(match[2]);
      if (level === 2) headings.push({ id, text: match[2] });
      html.push(`<h${level} id="${id}">${inline(match[2])}</h${level}>`);
      continue;
    }
    if ((match = line.match(/^[-*] (.+)$/))) {
      if (paragraph.length) flush();
      (list = list || []).push(match[1]);
      continue;
    }
    if (list) flush();
    paragraph.push(line);
  }
  flush();

  const text = source.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[#*]/g, ' ');
  return { title, headings, html: html.join('\n'), wordCount: text.trim().split(/\s+/).filter(Boolean).length };
}

function head({ title, description, canonical, schema, type, extra = '' }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<meta name="theme-color" content="#0B0A09">
<link rel="canonical" href="${canonical}">
<link rel="alternate" hreflang="en" href="${canonical}">
<link rel="alternate" hreflang="x-default" href="${canonical}">
<link rel="alternate" type="application/rss+xml" title="HushBook Blog" href="${site}/blog/feed.xml">
<link rel="icon" href="/assets/img/default_preview.png">
<meta property="og:type" content="${type}">
<meta property="og:site_name" content="HushBook">
<meta property="og:locale" content="en_US">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${site}/assets/img/og-hushbook.webp">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
${extra}<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@hushbookapp">
<meta name="twitter:title" content="${escapeHtml(title)}">
<meta name="twitter:description" content="${escapeHtml(description)}">
<meta name="twitter:image" content="${site}/assets/img/og-hushbook.webp">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..700&amp;family=Hanken+Grotesk:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/alternatives.css">
<link rel="stylesheet" href="/assets/css/blog.css">
<script type="application/ld+json">${jsonLd(schema)}</script>
</head>`;
}

function nav() {
  return `<a class="skip" href="#content">Skip to content</a>
<header class="nav" id="nav">
  <div class="wrap nav-inner">
    <a class="brand" href="/" aria-label="HushBook home"><span class="brand-mark" aria-hidden="true">H</span><span class="brand-name">HushBook</span></a>
    <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="nav-menu">
      <svg class="open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      <svg class="close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>
    </button>
    <nav class="nav-links" id="nav-menu" aria-label="Primary navigation">
      <a href="/blog">Blog</a>
      <a href="/alternatives">Alternatives</a>
      <a href="/#features">Features</a>
      <a href="/about">About</a>
      <a class="button" href="/">Get the app</a>
    </nav>
  </div>
</header>`;
}

function footer() {
  const recent = posts.slice(0, 5).map((post) => `<a href="/blog/${post.slug}">${escapeHtml(post.title)}</a>`).join('\n        ');
  return `<footer>
  <div class="wrap">
    <div class="footer-grid">
      <div><a class="brand" href="/"><span class="brand-mark" aria-hidden="true">H</span><span class="brand-name">HushBook</span></a><p class="footer-copy">Read while listening with private, word-level audiobook transcripts created on your device.</p></div>
      <div class="footer-col"><h2>Blog</h2><a href="/blog">All posts</a>
        ${recent}</div>
      <div class="footer-col"><h2>HushBook</h2><a href="/alternatives">Compare apps</a><a href="/about">About</a><a href="/privacy-policy">Privacy</a><a href="/">Get the app</a></div>
    </div>
    <div class="footer-bottom">© 2026 HushBook. Product names belong to their respective owners. No affiliation or endorsement implied.</div>
  </div>
</footer>
<script>
(function(){
  var nav=document.getElementById('nav');
  var button=nav&&nav.querySelector('.nav-toggle');
  var menu=document.getElementById('nav-menu');
  if(button&&menu){button.addEventListener('click',function(){var open=!nav.classList.contains('open');nav.classList.toggle('open',open);button.setAttribute('aria-expanded',String(open));button.setAttribute('aria-label',open?'Close menu':'Open menu');});}
  document.querySelectorAll('[data-campaign]').forEach(function(link){link.addEventListener('click',function(){if(typeof window.gtag==='function'){window.gtag('event','blog_cta_click',{campaign_name:link.dataset.campaign,destination:link.dataset.destination});}});});
})();
</script>
</body>
</html>`;
}

function postSchema(post, parsed) {
  const canonical = `${site}/blog/${post.slug}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${canonical}#article`,
        headline: post.title,
        description: post.description,
        abstract: post.takeaways.join(' '),
        image: { '@type': 'ImageObject', url: `${site}/assets/img/og-hushbook.webp`, width: 1200, height: 630 },
        datePublished: post.datePublished,
        dateModified: post.dateModified,
        inLanguage: 'en',
        wordCount: parsed.wordCount,
        articleSection: post.category,
        keywords: post.keywords.join(', '),
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
        isPartOf: { '@type': 'Blog', '@id': `${site}/blog#blog`, name: 'HushBook Blog' },
        author,
        publisher,
        about: [
          { '@type': 'Thing', name: 'Immersive reading' },
          { '@type': 'SoftwareApplication', name: 'HushBook', applicationCategory: 'BookApplication', operatingSystem: 'iOS, Android', url: site }
        ],
        speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.post-hero h1', '.takeaways'] }
      },
      {
        '@type': 'FAQPage',
        '@id': `${canonical}#faq`,
        mainEntity: post.faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } }))
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: site },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${site}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: canonical }
        ]
      }
    ]
  };
}

function cta(post) {
  const playReferrer = encodeURIComponent(`utm_source=hushbook.app&utm_medium=blog&utm_campaign=${post.slug}`);
  return `<section class="cta" aria-labelledby="cta-heading"><h2 id="cta-heading">Try read-along on a recording you own</h2><p>Import an MP3 or M4B audiobook, let HushBook create the transcript on your phone, and follow every word with the narrator. Free to download, with optional Pro.</p><div class="cta-actions"><a class="button" data-campaign="${post.slug}" data-destination="google-play" href="https://play.google.com/store/apps/details?id=com.hushbook.hushbook&amp;referrer=${playReferrer}" target="_blank" rel="noopener">Get HushBook on Google Play</a><a class="button button-secondary" data-campaign="${post.slug}" data-destination="app-store" href="https://apps.apple.com/app/apple-store/id6783243597?pt=129070657&amp;ct=blog-${post.slug}&amp;mt=8" target="_blank" rel="noopener">Download on App Store</a></div></section>`;
}

function renderPost(post) {
  const source = fs.readFileSync(path.join(root, 'content', 'blog', `${post.slug}.md`), 'utf8');
  const parsed = parseMarkdown(source);
  if (parsed.title !== post.title) throw new Error(`${post.slug}: markdown H1 "${parsed.title}" must match data title "${post.title}"`);
  const canonical = `${site}/blog/${post.slug}`;
  const takeaways = post.takeaways.map((item) => `<li>${escapeHtml(item)}</li>`).join('\n');
  const toc = parsed.headings.map(({ id, text }) => `<li><a href="#${id}">${escapeHtml(text)}</a></li>`).join('\n');
  const faqs = post.faqs.map(([question, answer]) => `<details><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`).join('\n');
  const others = posts.filter((candidate) => candidate.slug !== post.slug).slice(0, 3)
    .map((candidate) => `<a class="related-card" href="/blog/${candidate.slug}">${escapeHtml(candidate.title)}<span>${escapeHtml(candidate.description)}</span></a>`);
  const related = [
    ...others,
    '<a class="related-card" href="/audiobook-app-for-dyslexia">Audiobook app for dyslexia<span>What a read-along audiobook app can and cannot do for readers with dyslexia.</span></a>',
    '<a class="related-card" href="/read-along-audiobooks">Read-along audiobooks<span>How HushBook highlights each word in time with the narrator.</span></a>',
    '<a class="related-card" href="/alternatives/speechify-alternatives">Speechify alternatives: audiobooks vs text-to-speech<span>When a human-narrated audiobook fits better than an AI reader, and the other way round.</span></a>',
    '<a class="related-card" href="/alternatives/audible-alternatives">Best Audible alternatives<span>Libby, Hoopla, Libro.fm, LibriVox and HushBook compared on the same attributes.</span></a>'
  ].slice(0, 4).join('\n');
  const extra = [
    `<meta property="article:published_time" content="${post.datePublished}">`,
    `<meta property="article:modified_time" content="${post.dateModified}">`,
    `<meta property="article:author" content="${site}/about">`,
    `<meta property="article:section" content="${escapeHtml(post.category)}">`,
    ...post.keywords.slice(0, 6).map((keyword) => `<meta property="article:tag" content="${escapeHtml(keyword)}">`),
    `<meta name="author" content="Rakesh Aditya">`,
    ''
  ].join('\n');

  return `${head({ title: `${post.metaTitle} | HushBook`, description: post.description, canonical, schema: postSchema(post, parsed), type: 'article', extra })}
<body>
${nav()}
<main id="content">
  <nav class="wrap crumbs" aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/blog">Blog</a> / <span aria-current="page">${escapeHtml(post.category)}</span></nav>
  <header class="hero post-hero"><div class="wrap"><span class="eyebrow">${escapeHtml(post.category)}</span><h1>${escapeHtml(post.title)}</h1><p class="lede">${escapeHtml(post.description)}</p>
    <div class="author-line"><img src="/assets/img/rakesh.jpg" width="44" height="44" alt="" loading="eager" decoding="async"><div><a href="/about" rel="author"><strong>Rakesh Aditya</strong></a>, creator of HushBook<div class="byline"><span>Published <time datetime="${post.datePublished}">${formatDate(post.datePublished)}</time></span>${post.dateModified !== post.datePublished ? `<span>Updated <time datetime="${post.dateModified}">${formatDate(post.dateModified)}</time></span>` : ''}<span>${escapeHtml(post.readingTime)}</span></div></div></div>
  </div></header>
  <article class="article"><div class="wrap content post">
    <section class="answer-box takeaways" aria-labelledby="takeaways-heading"><p class="question" id="takeaways-heading">Key takeaways</p><ul>
${takeaways}
</ul></section>
    <nav class="toc" aria-labelledby="toc-heading"><p id="toc-heading">In this guide</p><ol>
${toc}
<li><a href="#faq-heading">Frequently asked questions</a></li>
</ol></nav>
    <div class="prose">
${parsed.html}
    </div>
    <section aria-labelledby="faq-heading"><h2 id="faq-heading">Frequently asked questions</h2><div class="faq">${faqs}</div></section>
    ${cta(post)}
    <section aria-labelledby="related-heading"><h2 id="related-heading">Keep reading</h2><div class="related-grid">${related}</div></section>
  </div></article>
</main>
${footer()}`;
}

function renderHub() {
  const canonical = `${site}/blog`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${canonical}#blog`,
    name: 'HushBook Blog',
    description: 'Guides to immersive reading, read-along audiobooks, and following the words while you listen.',
    url: canonical,
    inLanguage: 'en',
    publisher,
    blogPost: posts.map((post) => ({ '@type': 'BlogPosting', headline: post.title, url: `${site}/blog/${post.slug}`, datePublished: post.datePublished, dateModified: post.dateModified, author: { '@id': author['@id'], '@type': 'Person', name: author.name } }))
  };
  const cards = posts.map((post) => `<article class="hub-card post-card"><span class="eyebrow">${escapeHtml(post.category)}</span><h2><a href="/blog/${post.slug}">${escapeHtml(post.title)}</a></h2><p>${escapeHtml(post.description)}</p><p class="post-meta"><time datetime="${post.datePublished}">${formatDate(post.datePublished)}</time> · ${escapeHtml(post.readingTime)}</p></article>`).join('\n');
  return `${head({ title: 'HushBook Blog: Read-Along Audiobooks and Immersive Reading', description: 'Practical guides to immersive reading: how to read and listen at the same time, follow an audiobook word by word, and pick the right read-along setup.', canonical, schema, type: 'website' })}
<body>
${nav()}
<main id="content"><nav class="wrap crumbs" aria-label="Breadcrumb"><a href="/">Home</a> / <span aria-current="page">Blog</span></nav><header class="hero hub-hero"><div class="wrap"><span class="eyebrow">The HushBook blog</span><h1>Read along with every word you hear.</h1><p class="lede">Guides to immersive reading, read-along audiobooks, and staying with a book when your attention slips. Written by the people building HushBook.</p></div></header><section class="wrap content"><div class="hub-grid blog-grid">${cards}</div></section></main>
${footer()}`;
}

function renderFeed() {
  const items = posts.map((post) => `    <item>
      <title>${escapeHtml(post.title)}</title>
      <link>${site}/blog/${post.slug}</link>
      <guid isPermaLink="true">${site}/blog/${post.slug}</guid>
      <pubDate>${new Date(`${post.datePublished}T09:00:00Z`).toUTCString()}</pubDate>
      <category>${escapeHtml(post.category)}</category>
      <description>${escapeHtml(post.description)}</description>
    </item>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>HushBook Blog</title>
    <link>${site}/blog</link>
    <atom:link href="${site}/blog/feed.xml" rel="self" type="application/rss+xml"/>
    <description>Guides to immersive reading and read-along audiobooks.</description>
    <language>en</language>
    <lastBuildDate>${new Date(`${posts[0].dateModified}T09:00:00Z`).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
}

fs.mkdirSync(outDir, { recursive: true });
for (const post of posts) fs.writeFileSync(path.join(outDir, `${post.slug}.html`), renderPost(post));
fs.writeFileSync(path.join(outDir, 'index.html'), renderHub());
fs.writeFileSync(path.join(outDir, 'feed.xml'), renderFeed());
console.log(`Wrote ${posts.length} blog post(s), blog index and RSS feed.`);
