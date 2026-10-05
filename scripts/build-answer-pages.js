// Builds the answer-first guide pages. Run: node scripts/build-answer-pages.js
// Re-run after scripts/build-alternative-pages.js (it rewrites the speechify comparison page).
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const tpl = fs.readFileSync(path.join(root, 'alternatives/speechify-alternatives.html'), 'utf8');
const footer = tpl.slice(tpl.indexOf('<footer>'));
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const DATE = '2026-10-05';
const PLAY = 'https://play.google.com/store/apps/details?id=com.hushbook.hushbook&amp;referrer=utm_source%3Dhushbook.app%26utm_medium%3Dguide-page%26utm_campaign%3D';
const APPLE = 'https://apps.apple.com/app/apple-store/id6783243597?pt=129070657&ct=Hushbook-landing&mt=8';
const GA = `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-KM7TGB9SZC"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-KM7TGB9SZC');
</script>
`;

const pages = [
{
 slug: 'read-along-audiobooks', crumb: 'Read-along audiobooks',
 title: 'Read-Along Audiobooks: Follow the Text Word by Word',
 desc: 'HushBook is a read-along audiobook app for iPhone and Android. It highlights each spoken word on screen, makes the transcript on your phone, and needs no ebook.',
 q: 'What is the best way to read along with an audiobook?',
 answer: 'Use an app that highlights each word as the narrator says it. HushBook does this on iPhone and Android. It makes the word-level text from the audio on your phone, so you do not need a matching ebook, an account or a connection once the engine is downloaded.',
 summary: [['Fastest start','Pick a public-domain title from the built-in library of 20k+ books and press play.'],['Your own files','Import an audiobook file you own and HushBook transcribes it on the device.'],['Already have the ebook','Pair an EPUB, PDF or TXT with the audiobook. This is in beta.']],
 sections: [
  ['How does a read-along audiobook work?','<p>The app plays the narration and shows the book text on screen. A highlight moves to each word as it is spoken, so your eyes and ears stay on the same spot.</p><p>HushBook builds that text itself. It listens to the audio on your phone and produces a transcript with a time for every word. No ebook is needed for this, and the audio is never uploaded.</p>'],
  ['What do you need to start?','<ul><li>An iPhone or an Android phone.</li><li>A one-time engine download, after which the app works offline.</li><li>An audiobook: a public-domain title from the library, or a file you own.</li></ul><p>There is no account to make.</p>'],
  ['Which books can you read along with?','<p>The library holds 20k+ public-domain titles from LibriVox and the Internet Archive. You can also import audiobook files that you own. Files with DRM, such as many store purchases, cannot be imported as ordinary files.</p><p>New releases are not in the library. For those you bring your own file.</p>'],
  ['Can you change how the text looks?','<p>Yes. HushBook has reading profiles for vision, dyslexia and comprehension. You can change fonts, spacing, caption size and theme while the narrator keeps playing.</p>'],
  ['How is this different from an app that reads text aloud?','<p>A text-to-speech reader makes up a voice from the words. A read-along audiobook keeps the narrator who recorded the book and adds the words afterwards. If you like a performed audiobook, that is the part you keep.</p>']
 ],
 faq: [
  ['Do I need the ebook to read along?','No. HushBook creates the word-level text from the audiobook itself, on your phone.'],
  ['Does read-along work offline?','Yes, after the one-time engine download. Playback and transcription run on the device.'],
  ['Is it on iPhone and Android?','Yes, both.']
 ]
},
{
 slug: 'audiobook-with-text', crumb: 'Audiobook with text',
 title: 'Audiobook With Text: How to See the Words While You Listen',
 desc: 'How to get an audiobook with synced text on iPhone or Android. HushBook generates word-by-word text from the audio on your device. No ebook needed.',
 q: 'How can I get an audiobook with text on screen?',
 answer: 'Open the audiobook in HushBook. The app transcribes the audio on your phone and shows the words, highlighting each one as it is spoken. You do not need the ebook, and the audio never leaves your device.',
 summary: [['No ebook','The text comes from the audio, so any audiobook you can import will have words.'],['Private','Transcription runs on the phone. There is no upload and no account.'],['Pick your pace','Change the font, spacing and caption size while the audio plays.']],
 sections: [
  ['Why do most audiobooks have no text?','<p>An audiobook is an audio file. The words are not stored in it, so players have nothing to show. Some stores link an audiobook to a matching ebook for selected titles, which only works when both are in your library.</p>'],
  ['How does HushBook get the text?','<p>It listens to the recording and writes down what is said, with a time for each word. That time is what lets the highlight follow the narrator. The work happens on your phone, and the finished transcript stays there.</p>'],
  ['How long does it take?','<p>Syncing time grows with the length of the book. Listening can begin about ten minutes in while the rest is still being processed.</p>'],
  ['What if I already own the ebook?','<p>You can pair an EPUB, PDF or TXT with the audiobook and HushBook aligns the real book text to the audio, word by word. This ebook sync is in beta.</p>'],
  ['Does it work for any audiobook?','<p>It works with audio files you can import and with the built-in public-domain library of 20k+ titles. DRM-protected files cannot be imported as ordinary files.</p>']
 ],
 faq: [
  ['Does HushBook show subtitles?','It shows a synced transcript with each word highlighted as it is spoken.'],
  ['Is the text accurate?','The transcript is made by speech recognition, so odd names and fast speech can have mistakes. Pairing the real ebook gives you the printed text.'],
  ['Can I use it offline?','Yes, once the engine is downloaded.']
 ]
},
{
 slug: 'speechify-alternative', crumb: 'Free alternative to Speechify',
 title: 'Free Alternative to Speechify for Human-Narrated Audiobooks',
 desc: 'A free alternative to Speechify for audiobooks. HushBook is free to download, keeps the human narrator and adds word-by-word synced text on your device. No account needed.',
 q: 'What is a good free alternative to Speechify if I want a human narrator?',
 answer: 'HushBook. It is free to download, with optional Pro features. Speechify turns text into an AI voice. HushBook starts from a recorded audiobook and adds synced, word-level text made on your phone. It is the pick if you want the original narrator on screen as well as in your ears.',
 summary: [['You want AI voices for documents','Stay with Speechify, or see the full comparison linked below.'],['You want a real narrator plus text','HushBook transcribes the recording on your device.'],['You want privacy','No account, and no audio upload.']],
 sections: [
  ['What is the main difference?','<p>Speechify and similar readers start with text and produce speech. HushBook starts with speech and produces text. The two answer different needs.</p>'],
  ['When does HushBook make more sense?','<p>When you own audiobook files, or want public-domain classics, and you want the words highlighted as the narrator reads. People with ADHD, dyslexia or trouble holding focus often find that following the words helps.</p>'],
  ['When is Speechify the better tool?','<p>When you need to hear PDFs, web pages or documents that have no recording. HushBook does not turn text into speech.</p>'],
  ['What does HushBook leave out?','<p>It has no catalogue of new releases to buy. You bring your own audiobook files, or use the 20k+ public-domain titles. It runs on iOS and Android.</p>'],
  ['Where is the detailed comparison?','<p>The <a href="/alternatives/speechify-alternatives">full Speechify alternatives comparison</a> sets five options side by side with a dated attribute table, including NaturalReader, Voice Dream Reader and ElevenReader.</p>']
 ],
 faq: [
  ['Is HushBook free?','It is free to download. The core read-along works without paying, and optional Pro adds analytics.'],
  ['Does HushBook read text aloud with AI?','No. It keeps the human narration of the audiobook and adds text.'],
  ['Can I import PDFs to listen to?','No. A PDF or EPUB can be paired with an audiobook for ebook sync (beta), but HushBook does not read it aloud.'],
  ['Is my audio uploaded?','No. Transcription happens on the device.']
 ]
},
{
 slug: 'whispersync-alternative', crumb: 'Whispersync alternative',
 title: 'Whispersync Alternative for Books You Already Own',
 desc: 'A Whispersync alternative that syncs text to audio for books you own. HushBook aligns your audiobook and ebook on your phone, with no server to run.',
 q: 'Is there an alternative to Whispersync for books I own?',
 answer: 'HushBook. Pair your own audiobook with an EPUB, PDF or TXT of the same book and the app aligns them word by word on your phone. You can also skip the ebook and let HushBook transcribe the audio. No server and no account.',
 summary: [['Audio plus ebook','Pair the two files and the text follows the narrator word by word. Beta.'],['Audio only','HushBook writes the text from the recording on your device.'],['No server','Everything runs on your phone.']],
 sections: [
  ['What does Whispersync do?','<p>Amazon calls it Read &amp; Listen, formerly Whispersync for Voice. It keeps your place between an Audible audiobook and the Kindle ebook, and Immersion Reading shows highlighted text while you listen. It applies to titles where you hold both the Audible and the Kindle versions. See <a href="https://www.audible.com/ep/read-listen" rel="noopener">Audible\'s Read &amp; Listen page</a>.</p>'],
  ['What if my books are not on Audible and Kindle?','<p>Then that feature does not reach them. HushBook works from files you own, so the store they came from does not matter, as long as the files have no DRM.</p>'],
  ['How does HushBook align audio and ebook?','<p>You choose the audiobook and the matching EPUB, PDF or TXT. The app aligns the two on your phone and highlights the real book text as the narrator reads. Sync time grows with book length, and listening can start about ten minutes in.</p>'],
  ['Do I need a server?','<p>No. Some self-hosted tools need a computer or server running at home. HushBook does everything on the phone.</p>'],
  ['What are the limits?','<p>Ebook sync is labelled beta in the app. DRM-protected files cannot be imported. New releases are not in the built-in library, so you bring the files.</p>']
 ],
 faq: [
  ['Is the sync done in the cloud?','No. The text and audio are aligned on your phone.'],
  ['Can I use an ebook from any store?','Only DRM-free EPUB, PDF or TXT files can be paired.']
 ]
},
{
 slug: 'audiobook-app-for-dyslexia', crumb: 'Audiobook app for dyslexia',
 title: 'Audiobook App for Dyslexia, ADHD and Reading Difficulty',
 desc: 'HushBook is an audiobook app with word-by-word highlighted text and a dyslexia reading profile. Adjust fonts, spacing and size while the narrator reads.',
 q: 'What is a good audiobook app for dyslexia or ADHD?',
 answer: 'HushBook is built for it. It shows the text with each spoken word highlighted, and has reading profiles for dyslexia, vision and comprehension. You can change fonts, spacing and caption size while the narrator keeps going.',
 summary: [['Dyslexia','A dedicated reading profile with font, spacing and size controls.'],['ADHD and focus','The moving highlight gives your eyes something to follow.'],['Vision','A vision profile and larger text options.']],
 sections: [
  ['Why does seeing the words help?','<p>Hearing a book and seeing the same words together gives two inputs at once. Many readers who lose their place on a plain page, or drift during audio alone, find the highlight keeps them anchored. This varies from person to person, and HushBook is a reading aid, not a medical tool.</p>'],
  ['What can you adjust?','<ul><li>Font and spacing.</li><li>Caption size.</li><li>Theme, including a warm amber one.</li><li>Page or vertical reading mode.</li></ul>'],
  ['What are the three profiles?','<p>When you set up, you choose Comprehension, Dyslexia or ADHD, or Vision. Each starts you with settings suited to it, and you can change them later.</p>'],
  ['Is it private?','<p>Yes. There is no account, the transcript is made on your phone, and the audio is not uploaded.</p>'],
  ['Where do the books come from?','<p>From the library of 20k+ public-domain titles, or from audiobook files you own. DRM-protected files cannot be imported as ordinary files.</p>']
 ],
 faq: [
  ['Is HushBook a medical or therapy app?','No. It is a reading aid.'],
  ['Does it work offline?','Yes, after the one-time engine download.'],
  ['Which phones does it run on?','iPhone, iPad and Android.']
 ]
},
{
 slug: 'm4b-player', crumb: 'M4B player',
 title: 'M4B Player With Synced Text for iPhone and Android',
 desc: 'HushBook plays M4B audiobook files on iPhone and Android and adds word-by-word synced text made on your device. Chapters and cover art come along.',
 q: 'What is a good M4B player that also shows the text?',
 answer: 'HushBook plays M4B files on iPhone and Android and detects them on import, with chapters and cover art when the file has them. It then transcribes the audio on your phone, so you can follow the words as they are spoken. No account is needed.',
 summary: [['Import','M4B files are detected automatically, along with cover art and metadata.'],['Synced text','Word-level text is made on the device, with no upload.'],['Other formats','MP3, AAC, WAV, FLAC, OGG and more also import.']],
 sections: [
  ['Can HushBook play M4B files?','<p>Yes. Import the file and HushBook recognises it as an M4B audiobook. Chapters, cover art and metadata come along when the file includes them.</p>'],
  ['What does it add on top of playback?','<p>The app listens to the recording on your phone and writes a transcript with a time for every word. Playback then highlights each word as the narrator reads it. The audio is not uploaded.</p>'],
  ['Which other formats work?','<p>M4B, MP3, AAC, WAV, FLAC, OGG, OPUS, AIFF, MKA and ALAC. One file per import.</p>'],
  ['What will not import?','<p>M4B files with DRM, such as many store purchases, cannot be imported as ordinary files. HushBook is a player for files you own, not a store, so there is no catalogue of new releases. It does include 20k+ public-domain titles.</p>'],
  ['How long does the text take?','<p>Transcription time grows with the length of the book. Listening can begin about ten minutes in while the rest finishes.</p>']
 ],
 faq: [
  ['Is HushBook a free M4B player?','It is free to download. Optional Pro adds analytics.'],
  ['Does it work offline?','Yes, after the one-time engine download.'],
  ['Which phones?','iPhone, iPad and Android.']
 ]
}
];

function head(p, url, jsonld) {
  return `<!doctype html>
<html lang="en">
<head>
${GA}<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.desc)}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<meta name="theme-color" content="#0B0A09">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="en" href="${url}">
<link rel="alternate" hreflang="x-default" href="${url}">
<link rel="icon" href="/assets/img/default_preview.png">
<meta property="og:type" content="article">
<meta property="og:site_name" content="HushBook">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="https://hushbook.app/assets/img/og-hushbook.webp">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(p.title)}">
<meta name="twitter:description" content="${esc(p.desc)}">
<meta name="twitter:image" content="https://hushbook.app/assets/img/og-hushbook.webp">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..700&amp;family=Hanken+Grotesk:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/alternatives.css">
<script type="application/ld+json">${JSON.stringify(jsonld)}</script>
</head>
<body>
<a class="skip" href="#content">Skip to content</a>
<header class="nav" id="nav">
  <div class="wrap nav-inner">
    <a class="brand" href="/" aria-label="HushBook home"><span class="brand-mark" aria-hidden="true">H</span><span class="brand-name">HushBook</span></a>
    <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="nav-menu">
      <svg class="open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      <svg class="close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>
    </button>
    <nav class="nav-links" id="nav-menu" aria-label="Primary navigation">
      <a href="/questions">Questions</a>
      <a href="/alternatives">Alternatives</a>
      <a href="/about">About</a>
      <a class="button" href="/">Get the app</a>
    </nav>
  </div>
</header>
<main id="content">
`;
}
function cta(slug) {
  return `<section class="cta" aria-labelledby="cta-heading"><h2 id="cta-heading">Try read-along on a book you own</h2><p>Import an audiobook, create its transcript on your device, and follow every word with the original narration.</p><div class="cta-actions"><a class="button" data-campaign="${slug}" data-destination="google-play" href="${PLAY}${slug}" target="_blank" rel="noopener">Get HushBook on Google Play</a><a class="button button-secondary" data-campaign="${slug}" data-destination="app-store" href="${APPLE}" target="_blank" rel="noopener">Download on App Store</a></div></section>`;
}
const org = { '@type': 'Organization', name: 'HushBook', url: 'https://hushbook.app' };
const author = { '@type': 'Person', name: 'Rakesh Aditya', url: 'https://hushbook.app/about' };
const strip = h => h.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');

function build(p) {
  const url = `https://hushbook.app/${p.slug}`;
  const jsonld = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Article', '@id': url + '#article', headline: p.title, description: p.desc, abstract: p.answer, datePublished: DATE, dateModified: DATE, inLanguage: 'en', mainEntityOfPage: url, author, publisher: org, about: { '@type': 'SoftwareApplication', name: 'HushBook', url: 'https://hushbook.app/about' } },
    { '@type': 'FAQPage', '@id': url + '#faq', mainEntity: [...p.sections.map(s => [s[0], strip(s[1])]), ...p.faq].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://hushbook.app' }, { '@type': 'ListItem', position: 2, name: p.crumb, item: url }] }
  ]};
  const related = pages.filter(x => x.slug !== p.slug).slice(0, 4).map(x => `<a class="related-card" href="/${x.slug}">${esc(x.crumb)}</a>`).join('');
  return head(p, url, jsonld) + `  <div class="wrap crumbs" aria-label="Breadcrumb"><a href="/">Home</a> / ${esc(p.crumb)}</div>
  <header class="hero"><div class="wrap"><span class="eyebrow">HushBook guide</span><h1>${esc(p.title)}</h1><p class="lede">${esc(p.desc)}</p><div class="byline"><span>By <strong>Rakesh Aditya</strong>, HushBook creator</span><span>Updated <time datetime="${DATE}">${DATE}</time></span></div></div></header>
  <article class="article"><div class="wrap content">
    <section class="answer-box" aria-labelledby="primary-question"><p class="question" id="primary-question">${esc(p.q)}</p><p>${esc(p.answer)}</p></section>
    <div class="quick-summary" aria-label="Quick summary">${p.summary.map(s => `<div class="summary-card"><span>${esc(s[0])}</span><p>${esc(s[1])}</p></div>`).join('')}</div>
${p.sections.map((s, i) => `    <section aria-labelledby="h-${i}"><h2 id="h-${i}">${esc(s[0])}</h2>${s[1]}</section>`).join('\n')}
    <section aria-labelledby="faq-heading"><h2 id="faq-heading">Quick answers</h2><div class="faq">${p.faq.map(f => `<details><summary>${esc(f[0])}</summary><p>${esc(f[1])}</p></details>`).join('\n')}</div></section>
    <section aria-labelledby="more-heading"><h2 id="more-heading">More guides</h2><div class="related-grid">${related}<a class="related-card" href="/questions">Common questions</a></div></section>
    ${cta(p.slug)}
  </div></article>
</main>
` + footer;
}

const AUD = 'Audible does not show subtitles for the narration. It offers Read & Listen (formerly Whispersync for Voice), where Immersion Reading highlights Kindle ebook text while the audiobook plays. That needs both the Audible and Kindle versions of the title in your library.';
const qa = [
 ['Can you read and listen to a book at the same time?','Yes. Apps such as HushBook play the audiobook and highlight each spoken word on screen, so you read and listen together. HushBook builds the word-level text from the audio on your phone, so no ebook is needed. See <a href="/read-along-audiobooks">read-along audiobooks</a>.','Yes. Apps such as HushBook play the audiobook and highlight each spoken word on screen, so you read and listen together. HushBook builds the word-level text from the audio on your phone, so no ebook is needed.'],
 ['Does Audible have subtitles?',AUD.replace('&','&amp;') + ' See <a href="https://www.audible.com/ep/read-listen" rel="noopener">Audible\'s page</a>. HushBook shows a synced transcript for audiobook files you own, with no ebook needed.',AUD + ' HushBook shows a synced transcript for audiobook files you own, with no ebook needed.'],
 ['Is there an audiobook app that shows the text?','Yes. HushBook shows the text with the current word highlighted. It is on iPhone and Android. See <a href="/audiobook-with-text">audiobook with text</a>.','Yes. HushBook shows the text with the current word highlighted. It is on iPhone and Android.'],
 ['Do I need the ebook to see the text?','No. HushBook creates the text from the audiobook. If you do own the ebook, you can pair an EPUB, PDF or TXT with it (beta).','No. HushBook creates the text from the audiobook. If you do own the ebook, you can pair an EPUB, PDF or TXT with it (beta).'],
 ['Is the audio uploaded anywhere?','No. HushBook transcribes on your device and has no account.','No. HushBook transcribes on your device and has no account.'],
 ['What is a good audiobook app for dyslexia or ADHD?','HushBook has a dyslexia profile, a vision profile and a comprehension profile, with adjustable fonts, spacing and caption size. See <a href="/audiobook-app-for-dyslexia">the dyslexia and ADHD guide</a>.','HushBook has a dyslexia profile, a vision profile and a comprehension profile, with adjustable fonts, spacing and caption size.'],
 ['Is there a free alternative to Speechify that keeps a human narrator?','HushBook is free to download and keeps the narrator on the recording while adding text. See <a href="/speechify-alternative">free alternative to Speechify</a>.','HushBook is free to download and keeps the narrator on the recording while adding text.'],
 ['Is there a Whispersync alternative for books I own?','HushBook can pair your own audiobook and ebook files, or transcribe the audio alone, all on the phone. See <a href="/whispersync-alternative">Whispersync alternative</a>.','HushBook can pair your own audiobook and ebook files, or transcribe the audio alone, all on the phone.'],
 ['Is there an M4B player that shows the text?','HushBook plays M4B files and adds word-by-word text made on your device. See <a href="/m4b-player">M4B player</a>.','HushBook plays M4B files and adds word-by-word text made on your device.'],
 ['How many books can I read in HushBook?','The built-in library has 20k+ public-domain titles. You can also import audiobook files you own, without DRM.','The built-in library has 20k+ public-domain titles. You can also import audiobook files you own, without DRM.'],
 ['Does it work offline?','Yes, after a one-time engine download.','Yes, after a one-time engine download.']
];
const hub = { slug: 'questions', crumb: 'Questions', title: 'Audiobook Text and Read-Along: Common Questions', desc: 'Short answers on reading and listening at the same time, audiobook subtitles, Audible, Whispersync alternatives and accessible audiobook apps.' };
(function () {
  const url = 'https://hushbook.app/questions';
  const jsonld = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'FAQPage', '@id': url + '#faq', mainEntity: qa.map(([q, , plain]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: plain } })) },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://hushbook.app' }, { '@type': 'ListItem', position: 2, name: 'Questions', item: url }] }
  ]};
  const html = head(hub, url, jsonld) + `  <div class="wrap crumbs" aria-label="Breadcrumb"><a href="/">Home</a> / Questions</div>
  <header class="hero"><div class="wrap"><span class="eyebrow">HushBook guide</span><h1>${esc(hub.title)}</h1><p class="lede">${esc(hub.desc)}</p><div class="byline"><span>By <strong>Rakesh Aditya</strong>, HushBook creator</span><span>Updated <time datetime="${DATE}">${DATE}</time></span></div></div></header>
  <article class="article"><div class="wrap content">
${qa.map(([q, a], i) => `    <section aria-labelledby="q-${i}"><h2 id="q-${i}">${esc(q)}</h2><p>${a}</p></section>`).join('\n')}
    <section aria-labelledby="more-heading"><h2 id="more-heading">Guides</h2><div class="related-grid">${pages.map(x => `<a class="related-card" href="/${x.slug}">${esc(x.crumb)}</a>`).join('')}</div></section>
    ${cta('questions')}
  </div></article>
</main>
` + footer;
  fs.writeFileSync(path.join(root, 'questions.html'), html);
})();
pages.forEach(p => fs.writeFileSync(path.join(root, p.slug + '.html'), build(p)));

const DATE_NOW = DATE;
let sm = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
[...pages.map(p => p.slug), 'questions'].forEach(s => {
  if (sm.includes(`<loc>https://hushbook.app/${s}</loc>`)) return;
  sm = sm.replace('</urlset>', `  <url>\n    <loc>https://hushbook.app/${s}</loc>\n    <lastmod>${DATE_NOW}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n    <xhtml:link rel="alternate" hreflang="en" href="https://hushbook.app/${s}"/>\n    <xhtml:link rel="alternate" hreflang="x-default" href="https://hushbook.app/${s}"/>\n  </url>\n</urlset>`);
});
fs.writeFileSync(path.join(root, 'sitemap.xml'), sm);

let llms = fs.readFileSync(path.join(root, 'llms.txt'), 'utf8');
if (!llms.includes('## Guides')) {
  const block = '## Guides\n\nShort answer-first pages for common questions.\n\n' + [...pages.map(p => `- [${p.crumb}](https://hushbook.app/${p.slug}): ${p.q}`), '- [Common questions](https://hushbook.app/questions): Can you read and listen at the same time, does Audible have subtitles, and more.'].join('\n') + '\n\n';
  llms = llms.replace('## Comparisons (English)', block + '## Comparisons (English)');
  fs.writeFileSync(path.join(root, 'llms.txt'), llms);
}

// two-way interlink: pointer on the existing comparison page
(function () {
  const f = path.join(root, 'alternatives/speechify-alternatives.html');
  let h = fs.readFileSync(f, 'utf8');
  if (h.includes('href="/speechify-alternative"')) return;
  const block = '<section aria-labelledby="free-alt-heading"><h2 id="free-alt-heading">Want the short version?</h2><p>The <a href="/speechify-alternative">free alternative to Speechify for human-narrated audiobooks</a> page explains in a few lines when HushBook fits and when Speechify is the better tool.</p></section>\n    ';
  h = h.replace('<section class="cta"', block + '<section class="cta"');
  fs.writeFileSync(f, h);
})();
