'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { checkedDate, pages, profiles } = require('../data/alternative-pages');

const root = path.join(__dirname, '..');
const outDir = path.join(root, 'alternatives');
const site = 'https://hushbook.app';

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function wordCount(value) {
  return String(value).trim().split(/\s+/).filter(Boolean).length;
}

function jsonLd(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

function head({ title, description, canonical, schema, type = 'article' }) {
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
<link rel="icon" href="/assets/img/default_preview.png">
<meta property="og:type" content="${type}">
<meta property="og:site_name" content="HushBook">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${site}/assets/img/og-hushbook.webp">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(title)}">
<meta name="twitter:description" content="${escapeHtml(description)}">
<meta name="twitter:image" content="${site}/assets/img/og-hushbook.webp">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..700&amp;family=Hanken+Grotesk:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/alternatives.css">
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
      <a href="/alternatives">Alternatives</a>
      <a href="/#features">Features</a>
      <a href="/about">About</a>
      <a class="button" href="/">Get the app</a>
    </nav>
  </div>
</header>`;
}

function footer() {
  const links = pages.map((page) => `<a href="/alternatives/${page.slug}">${escapeHtml(page.competitor)} alternatives</a>`).join('\n        ');
  return `<footer>
  <div class="wrap">
    <div class="footer-grid">
      <div><a class="brand" href="/"><span class="brand-mark" aria-hidden="true">H</span><span class="brand-name">HushBook</span></a><p class="footer-copy">Read while listening with private, word-level audiobook transcripts created on your device.</p></div>
      <div class="footer-col"><h2>Compare</h2>${links}</div>
      <div class="footer-col"><h2>HushBook</h2><a href="/alternatives">All alternatives</a><a href="/about">About</a><a href="/privacy-policy">Privacy</a><a href="/">Get the app</a></div>
    </div>
    <div class="footer-bottom">© 2026 HushBook. Competitor names belong to their respective owners. No affiliation or endorsement implied.</div>
  </div>
</footer>
<script>
(function(){
  var nav=document.getElementById('nav');
  var button=nav&&nav.querySelector('.nav-toggle');
  var menu=document.getElementById('nav-menu');
  if(button&&menu){button.addEventListener('click',function(){var open=!nav.classList.contains('open');nav.classList.toggle('open',open);button.setAttribute('aria-expanded',String(open));button.setAttribute('aria-label',open?'Close menu':'Open menu');});}
  document.querySelectorAll('[data-campaign]').forEach(function(link){link.addEventListener('click',function(){if(typeof window.gtag==='function'){window.gtag('event','alternative_cta_click',{campaign_name:link.dataset.campaign,destination:link.dataset.destination});}});});
})();
</script>
</body>
</html>`;
}

const attributeRows = [
  ['Primary job', 'primaryJob'],
  ['Content source', 'source'],
  ['Narration', 'narration'],
  ['Read-along text', 'readAlong'],
  ['Own-file playback', 'ownFiles'],
  ['Offline use', 'offline'],
  ['Account and privacy', 'privacy'],
  ['Accessibility', 'accessibility'],
  ['Platforms', 'platforms'],
  ['Cost model', 'cost'],
  ['Best for', 'bestFor']
];

function namedSetLabel(page) {
  return page.options.map((key) => profiles[key].name).join(', ');
}

function pageSchema(page) {
  const canonical = `${site}/alternatives/${page.slug}`;
  const namedSet = namedSetLabel(page);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${canonical}#article`,
        headline: page.title,
        description: page.description,
        abstract: `This page compares ${namedSet}. ${page.baseline}`,
        keywords: namedSet,
        datePublished: checkedDate,
        dateModified: checkedDate,
        inLanguage: 'en',
        mainEntityOfPage: canonical,
        author: { '@type': 'Person', name: 'Rakesh Aditya', url: `${site}/about` },
        publisher: { '@type': 'Organization', name: 'HushBook', url: site },
        about: page.options.map((key) => ({ '@type': 'SoftwareApplication', name: profiles[key].name, url: profiles[key].url.startsWith('/') ? site + profiles[key].url : profiles[key].url }))
      },
      {
        '@type': 'ItemList',
        '@id': `${canonical}#list`,
        name: page.title,
        description: `This page compares ${namedSet}. ${page.baseline}`,
        numberOfItems: page.options.length,
        itemListOrder: 'https://schema.org/ItemListOrderAscending',
        itemListElement: page.options.map((key, index) => ({ '@type': 'ListItem', position: index + 1, name: profiles[key].name, url: profiles[key].url.startsWith('/') ? site + profiles[key].url : profiles[key].url }))
      },
      {
        '@type': 'FAQPage',
        '@id': `${canonical}#faq`,
        mainEntity: page.faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } }))
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: site },
          { '@type': 'ListItem', position: 2, name: 'Alternatives', item: `${site}/alternatives` },
          { '@type': 'ListItem', position: 3, name: `${page.competitor} alternatives`, item: canonical }
        ]
      }
    ]
  };
}

function renderComparisonTable(page) {
  const headings = page.options.map((key) => `<th scope="col">${escapeHtml(profiles[key].name)}</th>`).join('');
  const rows = attributeRows.map(([label, field]) => `<tr><th scope="row">${escapeHtml(label)}</th>${page.options.map((key) => `<td>${escapeHtml(profiles[key][field])}</td>`).join('')}</tr>`).join('\n');
  return `<div class="table-wrap"><table><caption>Attribute-parity comparison, checked ${checkedDate}</caption><thead><tr><th scope="col">Criterion</th>${headings}</tr></thead><tbody>${rows}</tbody></table></div>`;
}

function renderPage(page) {
  if (wordCount(page.question) !== 23) throw new Error(`${page.slug}: primary question must contain exactly 23 words; found ${wordCount(page.question)}`);
  const canonical = `${site}/alternatives/${page.slug}`;
  const summary = page.verdicts.map(([segment, winner, reason]) => `<div class="summary-card"><span>${escapeHtml(segment)}</span><p><strong>${escapeHtml(winner)}</strong>. ${escapeHtml(reason)}</p></div>`).join('');
  const cards = page.options.map((key, index) => {
    const profile = profiles[key];
    return `<article class="rank-card" id="${key}"><span class="rank-number" aria-hidden="true">${index + 1}</span><p class="best-for">Best for: ${escapeHtml(profile.bestFor)}</p><h3>${escapeHtml(profile.name)}</h3><p><strong>Why it stands out:</strong> ${escapeHtml(profile.strength)}</p><p><strong>Tradeoff:</strong> ${escapeHtml(profile.tradeoff)}</p><p class="verdict"><strong>Verdict:</strong> For ${escapeHtml(profile.bestFor.toLowerCase())}, the best option in this segment is ${escapeHtml(profile.name)} because it matches that job most directly. Evidence: ${escapeHtml(profile.strength)}</p></article>`;
  }).join('\n');
  const faqs = page.faqs.map(([question, answer]) => `<details><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`).join('\n');
  const related = pages.filter((candidate) => candidate.slug !== page.slug).map((candidate) => `<a class="related-card" href="/alternatives/${candidate.slug}">${escapeHtml(candidate.title)}<span>Compare ${escapeHtml(candidate.competitor)} alternatives using same dated method.</span></a>`).join('\n');
  const playReferrer = encodeURIComponent(`utm_source=hushbook.app&utm_medium=alternative-page&utm_campaign=${page.slug}`);

  return `${head({ title: page.title, description: page.description, canonical, schema: pageSchema(page) })}
<body>
${nav()}
<main id="content">
  <div class="wrap crumbs" aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/alternatives">Alternatives</a> / ${escapeHtml(page.competitor)}</div>
  <header class="hero"><div class="wrap"><span class="eyebrow">Best audiobook tools · ${checkedDate.slice(0, 4)}</span><h1>${escapeHtml(page.title)}</h1><p class="lede">${escapeHtml(page.description)}</p><div class="byline"><span>By <strong>Rakesh Aditya</strong>, HushBook creator</span><span>Evidence checked <time datetime="${checkedDate}">${checkedDate}</time></span><span>English-only page</span></div></div></header>
  <article class="article"><div class="wrap content">
    <section class="answer-box" aria-labelledby="primary-question"><p class="question" id="primary-question">${escapeHtml(page.question)}</p><p>${escapeHtml(page.directAnswer)}</p></section>
    <div class="quick-summary" aria-label="Best option by use case">${summary}</div>

    <section aria-labelledby="comparison-heading"><h2 id="comparison-heading">Comparison at a glance</h2><p>Every option uses the same eleven buyer attributes. “Not listed” means the checked official source did not present that capability as a standard feature; it does not prove the capability can never exist.</p>${renderComparisonTable(page)}</section>

    <section aria-labelledby="ranked-heading"><h2 id="ranked-heading">Five best alternatives, ranked by fit</h2><p>Ranking prioritizes match for the stated job, not brand size. Each verdict names the segment where an option wins and its reason.</p><div class="rank-list">${cards}</div></section>

    <section aria-labelledby="faq-heading"><h2 id="faq-heading">Frequently asked questions</h2><div class="faq">${faqs}</div></section>

    <section aria-labelledby="related-heading"><h2 id="related-heading">Related alternative guides</h2><p>Every guide links to every other guide, giving readers and crawlers a complete comparison cluster.</p><div class="related-grid">${related}</div></section>

    <aside class="disclosure"><p><strong>Editorial disclosure:</strong> HushBook publishes this comparison. Competitor strengths and limits use cited public information. No competitor paid for inclusion.</p></aside>
    <section class="cta" aria-labelledby="cta-heading"><h2 id="cta-heading">Try read-along on a book you own</h2><p>Import a compatible audiobook, create its transcript on your device, and follow every word with the original narration.</p><div class="cta-actions"><a class="button" data-campaign="${page.slug}" data-destination="google-play" href="https://play.google.com/store/apps/details?id=com.hushbook.hushbook&amp;referrer=${playReferrer}" target="_blank" rel="noopener">Get HushBook on Google Play</a><a class="button button-secondary" data-campaign="${page.slug}" data-destination="app-store" href="https://apps.apple.com/app/apple-store/id6783243597?pt=129070657&ct=Hushbook-landing&mt=8" target="_blank" rel="noopener">Download on App Store</a></div></section>
  </div></article>
</main>
${footer()}`;
}

function hubSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'HushBook Audiobook App Alternatives',
    description: 'Dated, source-linked comparisons of audiobook players, subscription services, and accessible reading tools.',
    url: `${site}/alternatives`,
    inLanguage: 'en',
    dateModified: checkedDate,
    mainEntity: { '@type': 'ItemList', numberOfItems: pages.length, itemListElement: pages.map((page, index) => ({ '@type': 'ListItem', position: index + 1, name: page.title, url: `${site}/alternatives/${page.slug}` })) }
  };
}

function renderHub() {
  const canonical = `${site}/alternatives`;
  const cards = pages.map((page) => `<article class="hub-card"><span class="eyebrow">${escapeHtml(page.competitor)} alternatives</span><h2>${escapeHtml(page.title)}</h2><p>${escapeHtml(page.directAnswer)}</p><a href="/alternatives/${page.slug}">Read comparison</a></article>`).join('\n');
  return `${head({ title: 'Best Audiobook App Alternatives Compared: 2026 Guide', description: 'Compare the best alternatives to Audible, BookPlayer, Storytel, Pocket FM, and Speechify using dated sources and consistent buyer attributes. Updated 2026.', canonical, schema: hubSchema(), type: 'website' })}
<body>
${nav()}
<main id="content"><div class="wrap crumbs"><a href="/">Home</a> / Alternatives</div><header class="hero hub-hero"><div class="wrap"><span class="eyebrow">Comparison library</span><h1>Choose the right audiobook tool for how you read.</h1><p class="lede">Five English-only, source-linked guides compare named products on the same attributes. Each guide states who should choose HushBook and who should choose something else.</p><div class="byline"><span>Evidence checked <time datetime="${checkedDate}">${checkedDate}</time></span><span>Updated when official product terms change</span></div></div></header><section class="wrap content"><div class="answer-box"><p class="question">What is the best audiobook app alternative?</p><p>For owned audiobook files with private synchronized text, HushBook is the best fit. For commercial catalogs, serialized fiction, self-hosting, or AI narration from documents, use the guide matching that specific job.</p></div><div class="hub-grid">${cards}</div><div class="method-box"><p><strong>Selection method:</strong> These five competitors represent high-visibility direct and adjacent choices across audiobook stores, owned-file players, subscriptions, serialized audio, and accessible text-to-speech. Selection reflects verified product relevance and public footprint, not an unverified claim of exact search-volume rank.</p></div></section></main>
${footer()}`;
}

fs.mkdirSync(outDir, { recursive: true });
for (const page of pages) fs.writeFileSync(path.join(outDir, `${page.slug}.html`), renderPage(page));
fs.writeFileSync(path.join(outDir, 'index.html'), renderHub());
console.log(`Wrote ${pages.length} alternative pages plus index. All primary questions contain 23 words.`);
