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
  logo: { '@type': 'ImageObject', url: `${site}/assets/img/default_preview.png`, width: 256, height: 256 }
};

// Inline so it ships with the page: /assets/css is cached as immutable for a year.
const MEDIA_STYLE = `<style>
.post-media{margin:28px 0;display:flex;justify-content:center}
.post-media video,.post-media img{display:block;width:min(100%,320px);border:1px solid var(--line);border-radius:28px;background:#fff}
</style>`;
const ASIDE_STYLE = `<style>
.post-layout{display:grid;grid-template-columns:minmax(0,1fr) 380px;grid-template-areas:"hero aside" "body aside";column-gap:56px;align-items:start}
.post-layout>.post-hero{grid-area:hero}
.post-layout>.article{grid-area:body}
.post-layout .post{max-width:760px;margin:0}
.post-aside{grid-area:aside;position:sticky;top:84px;margin-top:24px}
.post-aside iframe{display:block;width:100%;height:min(820px,calc(100vh - 100px));min-height:560px;border:0;background:transparent}
@media (max-width:1023px){.post-layout{grid-template-columns:minmax(0,1fr);grid-template-areas:"hero" "aside" "body"}.post-layout .post{margin-inline:auto}.post-aside{position:static;width:100%;max-width:420px;margin:0 auto 8px}.post-aside iframe{height:640px;min-height:0}}
</style>`;

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

// Minimal Markdown: headings, paragraphs, "- " and "1. " lists, "> " quotes, "| a | b |" tables, "![alt](src)" media on its own line, links, **bold**, *italic*.
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

// "![alt](/assets/video/x.mp4)" renders a silent looping clip (with /assets/video/x.webm
// and /assets/img/x-poster.webp when those files exist); any other src renders an image.
function media(alt, src) {
  const label = escapeHtml(alt);
  if (/\.(mp4|webm)$/i.test(src)) {
    const base = src.replace(/\.(mp4|webm)$/i, '');
    const name = path.basename(base);
    const webm = fs.existsSync(path.join(root, `${base}.webm`)) ? `<source src="${base}.webm" type="video/webm">` : '';
    const mp4 = fs.existsSync(path.join(root, `${base}.mp4`)) ? `<source src="${base}.mp4" type="video/mp4">` : '';
    const poster = fs.existsSync(path.join(root, 'assets', 'img', `${name}-poster.webp`)) ? ` poster="/assets/img/${name}-poster.webp"` : '';
    return `<figure class="post-media"><video autoplay muted loop playsinline preload="metadata"${poster} aria-label="${label}">${webm}${mp4}</video></figure><script>if(matchMedia('(prefers-reduced-motion: reduce)').matches)document.querySelectorAll('.post-media video').forEach(function(v){v.removeAttribute('autoplay');v.pause();})</script>`;
  }
  return `<figure class="post-media"><img src="${src}" alt="${label}" loading="lazy" decoding="async"></figure>`;
}

function parseMarkdown(source) {
  const lines = source.replace(/\r\n/g, '\n').split('\n');
  let title = '';
  const headings = [];
  const html = [];
  let paragraph = [];
  let list = null;
  let ordered = false;
  let quote = null;
  let table = null;

  // GitHub-style pipe table: header row, "|---|---|" separator, body rows. The
  // first column becomes a row header so the table reads well to screen readers
  // and answer engines. Styles come from alternatives.css (.table-wrap, table).
  const cells = (row) => row.replace(/^\|/, '').replace(/\|$/, '').split('|').map((cell) => cell.trim());
  const renderTable = ({ header, rows }) => {
    const head = header.map((cell) => `<th scope="col">${inline(cell)}</th>`).join('');
    const body = rows.map((row) => row.map((cell, index) => (index === 0 ? `<th scope="row">${inline(cell)}</th>` : `<td>${inline(cell)}</td>`)).join('')).join('</tr>\n<tr>');
    return `<div class="table-wrap"><table><thead><tr>${head}</tr></thead>${rows.length ? `<tbody><tr>${body}</tr></tbody>` : ''}</table></div>`;
  };

  const flush = () => {
    if (paragraph.length) html.push(`<p>${inline(paragraph.join(' '))}</p>`);
    if (quote) html.push(`<blockquote><p>${inline(quote.join(' '))}</p></blockquote>`);
    if (list) {
      const tag = ordered ? 'ol' : 'ul';
      html.push(`<${tag}>\n${list.map((item) => `<li>${inline(item)}</li>`).join('\n')}\n</${tag}>`);
    }
    if (table) html.push(renderTable(table));
    paragraph = [];
    list = null;
    quote = null;
    table = null;
  };

  for (const raw of lines) {
    const line = raw.trim();
    let match;
    if (!line) { flush(); continue; }
    if ((match = line.match(/^!\[([^\]]*)\]\(([^)\s]+)\)$/))) { flush(); html.push(media(match[1], match[2])); continue; }
    if (line.startsWith('|')) {
      if (!table) { flush(); table = { header: cells(line), rows: [] }; continue; }
      if (/^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?$/.test(line)) continue;
      table.rows.push(cells(line));
      continue;
    }
    if (table) flush();
    if ((match = line.match(/^# (.+)$/))) { flush(); title = match[1]; continue; }
    if ((match = line.match(/^(#{2,3}) (.+)$/))) {
      flush();
      const level = match[1].length;
      const id = slugify(match[2]);
      if (level === 2) headings.push({ id, text: match[2] });
      html.push(`<h${level} id="${id}">${inline(match[2])}</h${level}>`);
      continue;
    }
    if ((match = line.match(/^> ?(.*)$/))) {
      if (!quote) flush();
      (quote = quote || []).push(match[1]);
      continue;
    }
    if (quote) flush();
    if ((match = line.match(/^(?:([-*])|\d+\.) (.+)$/))) {
      const isOrdered = !match[1];
      if (paragraph.length || (list && ordered !== isOrdered)) flush();
      ordered = isOrdered;
      (list = list || []).push(match[2]);
      continue;
    }
    if (list) flush();
    paragraph.push(line);
  }
  flush();

  const text = source.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/^\|?\s*:?-{3,}[-:|\s]*$/gm, ' ').replace(/[#*>|]/g, ' ');
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
    <a class="brand" href="/" aria-label="HushBook home"><img class="brand-mark" src="/assets/img/default_preview.png" width="34" height="34" alt=""><img class="brand-name" src="/assets/img/hb-wordmark.svg" width="133" height="20" alt=""></a>
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
      <div><a class="brand" href="/" aria-label="HushBook home"><img class="brand-mark" src="/assets/img/default_preview.png" width="34" height="34" alt=""><img class="brand-name" src="/assets/img/hb-wordmark.svg" width="133" height="20" alt=""></a><p class="footer-copy">Read while listening with private, word-level audiobook transcripts created on your device.</p></div>
      <div class="footer-col"><h2>Blog</h2><a href="/blog">All posts</a>
        ${recent}</div>
      <div class="footer-col"><h2>Guides</h2><a href="/read-along-audiobooks">Read-along audiobooks</a><a href="/audiobook-with-text">Audiobook with text</a><a href="/m4b-player">M4B player</a><a href="/audiobook-app-for-dyslexia">Audiobook app for dyslexia</a><a href="/whispersync-alternative">Whispersync alternative</a><a href="/questions">Common questions</a></div>
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
      // Ranked comparison posts list the apps they compare (post.compared:
      // [{ name, url, bestFor }]) so answer engines can read the ranking directly.
      ...(post.compared ? [{
        '@type': 'ItemList',
        '@id': `${canonical}#list`,
        name: post.title,
        itemListOrder: 'https://schema.org/ItemListOrderAscending',
        numberOfItems: post.compared.length,
        itemListElement: post.compared.map((app, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: app.name,
          url: app.url,
          description: app.bestFor,
          item: { '@type': 'SoftwareApplication', name: app.name, url: app.url, applicationCategory: 'BookApplication' }
        }))
      }] : []),
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
  return `<section class="cta" aria-labelledby="cta-heading"><h2 id="cta-heading">${escapeHtml((post.cta && post.cta.heading) || 'Try read-along on a recording you own')}</h2><p>${escapeHtml((post.cta && post.cta.text) || 'Import an MP3 or M4B audiobook, let HushBook create the transcript on your phone, and follow every word with the narrator. Free to download, no ads, no account.')}</p><div class="cta-actions"><a class="button" data-campaign="${post.slug}" data-destination="google-play" href="https://play.google.com/store/apps/details?id=com.hushbook.hushbook&amp;referrer=${playReferrer}" target="_blank" rel="noopener">Get HushBook on Google Play</a><a class="button button-secondary" data-campaign="${post.slug}" data-destination="app-store" href="https://apps.apple.com/app/apple-store/id6783243597?pt=129070657&amp;ct=blog-${post.slug}&amp;mt=8" target="_blank" rel="noopener">Download on App Store</a></div></section>`;
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
  // Optional demo beside the article (post.aside -> content/blog/embeds/<name>.html):
  // text left, demo sticky on the right; stacked above the text on narrow screens.
  const aside = post.aside ? fs.readFileSync(path.join(root, 'content', 'blog', 'embeds', `${post.aside}.html`), 'utf8').trim() : '';
  // Optional demo at the top of the article, above the takeaways (post.hero, same embeds folder).
  const hero = post.hero ? fs.readFileSync(path.join(root, 'content', 'blog', 'embeds', `${post.hero}.html`), 'utf8').trim() : '';
  const extra = [
    `<meta property="article:published_time" content="${post.datePublished}">`,
    `<meta property="article:modified_time" content="${post.dateModified}">`,
    `<meta property="article:author" content="${site}/about">`,
    `<meta property="article:section" content="${escapeHtml(post.category)}">`,
    ...post.keywords.slice(0, 6).map((keyword) => `<meta property="article:tag" content="${escapeHtml(keyword)}">`),
    `<meta name="author" content="Rakesh Aditya">`,
    ...(aside ? [ASIDE_STYLE] : []),
    ...(parsed.html.includes('class="post-media"') ? [MEDIA_STYLE] : []),
    ''
  ].join('\n');

  return `${head({ title: (`${post.metaTitle} | HushBook`.length <= 60 ? `${post.metaTitle} | HushBook` : post.metaTitle), description: post.metaDescription || post.description, canonical, schema: postSchema(post, parsed), type: 'article', extra })}
<body>
${nav()}
<main id="content">
  <nav class="wrap crumbs" aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/blog">Blog</a> / <span aria-current="page">${escapeHtml(post.category)}</span></nav>
  ${aside ? '<div class="wrap post-layout">\n  <header class="hero post-hero">' : '<header class="hero post-hero"><div class="wrap">'}<span class="eyebrow">${escapeHtml(post.category)}</span><h1>${escapeHtml(post.title)}</h1>
    <div class="byline"><span>Published <time datetime="${post.datePublished}">${formatDate(post.datePublished)}</time></span>${post.dateModified !== post.datePublished ? `<span>Updated <time datetime="${post.dateModified}">${formatDate(post.dateModified)}</time></span>` : ''}<span>${escapeHtml(post.readingTime)}</span></div>
  ${aside ? '</header>' : '</div></header>'}
  <article class="article">${aside ? '<div class="content post">' : '<div class="wrap content post">'}${hero ? `\n    ${hero}` : ''}
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
  </div></article>${aside ? `\n  <aside class="post-aside">${aside}</aside>\n  </div>` : ''}
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
    description: 'Straight answers on read-along audiobooks, audiobook file formats like M4B and MP3, and staying focused while you listen.',
    url: canonical,
    inLanguage: 'en',
    publisher,
    blogPost: posts.map((post) => ({ '@type': 'BlogPosting', headline: post.title, url: `${site}/blog/${post.slug}`, datePublished: post.datePublished, dateModified: post.dateModified, author: { '@id': author['@id'], '@type': 'Person', name: author.name } }))
  };
  const rows = posts.map((post) => `<li class="post-row"><a class="post-link" href="/blog/${post.slug}"><span class="post-row-meta"><span class="eyebrow">${escapeHtml(post.category)}</span><time datetime="${post.datePublished}">${formatDate(post.datePublished)}</time><span>${escapeHtml(post.readingTime)}</span></span><h2 class="post-row-title">${escapeHtml(post.title)}</h2><p class="post-row-desc">${escapeHtml(post.description)}</p><span class="post-row-cta" aria-hidden="true">Read the guide</span></a></li>`).join('\n');
  return `${head({ title: 'HushBook Blog: Read-Along Audiobooks and Immersive Reading', description: 'Practical guides to immersive reading: how to read and listen at the same time, follow an audiobook word by word, and pick the right read-along setup.', canonical, schema, type: 'website' })}
<body>
${nav()}
<main id="content"><nav class="wrap crumbs" aria-label="Breadcrumb"><a href="/">Home</a> / <span aria-current="page">Blog</span></nav><header class="hero hub-hero"><div class="wrap"><span class="eyebrow">The HushBook blog</span><h1>Straight answers for people who love audiobooks.</h1></div></header><section class="wrap content"><ol class="post-list" aria-label="All guides, newest first">${rows}</ol></section></main>
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
