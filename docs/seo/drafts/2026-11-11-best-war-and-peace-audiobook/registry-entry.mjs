const entry = {
  slug: 'best-war-and-peace-audiobook',
  hero: 'war-and-peace-picks',
  cta: { heading: 'See every name in War and Peace as it is read', text: 'HushBook finds the free LibriVox recording of War and Peace and highlights each word as the narrator reads, so no name slips past you in 62 hours. Free on iPhone, Android and Windows, no account.' },
  title: 'Best Audiobook Version of War and Peace: Every Translation and Narrator Compared',
  metaTitle: 'Best War and Peace Audiobook: Every Edition Compared',
  metaDescription: 'Thandiwe Newton\'s 2023 Audie winner is the best War and Peace audiobook; Mark Nelson\'s free LibriVox reading of the Maude translation runs 62 hours 27 minutes.',
  description: 'Thandiwe Newton\'s 2023 Audie winner is our pick, Neville Jason\'s Naxos set the one to borrow and Mark Nelson\'s LibriVox reading the free one. Every edition by translation and runtime, listening time, the French and the names.',
  category: 'Reading and listening',
  datePublished: '2026-11-11',
  dateModified: '2026-11-11',
  readingTime: '22 min read',
  keywords: [
    'best war and peace audiobook',
    'war and peace audiobook length',
    'how long is war and peace audiobook',
    'war and peace audiobook best narrator',
    'war and peace audiobook thandie newton',
    'best war and peace translation',
    'war and peace pevear and volokhonsky audiobook',
    'war and peace audiobook librivox'
  ],
  takeaways: [
    'Thandiwe Newton\'s Audible Studios recording, 60 hours 14 minutes, is our best overall pick: winner of the 2023 Audie Award for Literary Fiction & Classics, with 4.6 stars from 1,613 ratings.',
    'Neville Jason\'s Naxos recording, 61 hours 43 minutes in two volumes, is the best to borrow: Libby showed it at the New York, King County and San Francisco libraries.',
    'The best free version is LibriVox\'s Maude translation in four volumes, read by Mark Nelson alone for 62 hours 27 minutes over 365 sections, one per chapter.',
    'Penguin Classics\' 2020 recording of Anthony Briggs\'s translation, 67 hours 13 minutes with five readers, is the only modern translation on audio. We found no Pevear and Volokhonsky audiobook.',
    'The Maude translation has 561,870 words: 62 hours 1 minute at 1x, 49 hours 37 minutes at 1.25x, 41 hours 21 minutes at 1.5x and 31 hours at 2x.'
  ],
  faqs: [
    ['Who is the best narrator of War and Peace?', 'Thandiwe Newton, on the evidence we could check. Her 2021 Audible Studios recording of the Maude translation won the 2023 Audie Award for Literary Fiction & Classics and has 4.6 stars from 1,613 Audible ratings.'],
    ['How long is the War and Peace audiobook?', 'About 62 hours at 1x. Complete recordings run from 50 hours 39 minutes to 67 hours 33 minutes on Audible, and the free LibriVox Maude reading runs 62 hours 27 minutes.'],
    ['Which translation of War and Peace is best for audiobooks?', 'The Maude translation, for choice: ten of the twelve complete recordings on sale read it, and so do both complete free ones. Penguin\'s Briggs recording is the only modern translation on audio.'],
    ['Is there a Pevear and Volokhonsky audiobook of War and Peace?', 'No. On November 11, 2026 we found none on Audible in four countries, Apple Books, OverDrive, Kobo or hoopla. The only modern translation on audio is Penguin\'s 2020 recording of Anthony Briggs\'s.'],
    ['Do War and Peace audiobooks read the French parts?', 'Mostly in English. Every complete recording reads the Maude, Garnett or Briggs translation, which put almost all of Tolstoy\'s French into English. The French is heaviest in the first five hours.'],
    ['Is there a War and Peace audiobook with text?', 'Yes. HushBook, the app we built, highlights each word as the narrator reads the free LibriVox Maude recordings or DRM-free MP3 and M4B files you own, on iPhone, Android and Windows.']
  ]
};

export default entry;

// Self-check: node registry-entry.mjs
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const here = dirname(fileURLToPath(import.meta.url));
  const repo = join(here, '..', '..', '..', '..');
  const post = readFileSync(join(here, 'post.md'), 'utf8');
  const h1 = post.match(/^# (.+)$/m)[1];
  const words = s => s.trim().split(/\s+/).length;
  const fails = [];
  const check = (ok, msg) => { if (!ok) fails.push(msg); };
  const dash = new RegExp('[' + String.fromCharCode(0x2013, 0x2014) + ']');

  check(h1 === entry.title, `H1 "${h1}" differs from title`);
  check(entry.title.startsWith('Best Audiobook Version of War and Peace'), 'title must start with the query');
  check(entry.metaTitle.length <= 60, `metaTitle ${entry.metaTitle.length} > 60`);
  check(entry.metaTitle.startsWith('Best War and Peace Audiobook'), 'metaTitle must start with the query');
  check(entry.metaDescription.length <= 160, `metaDescription ${entry.metaDescription.length} > 160`);
  check(entry.description.length <= 240, `description ${entry.description.length} > 240`);
  check(entry.cta.text.length <= 220, `cta.text ${entry.cta.text.length} > 220`);
  check(entry.keywords.length === 8, `keywords ${entry.keywords.length} != 8`);
  check(entry.takeaways.length === 5, `takeaways ${entry.takeaways.length} != 5`);
  entry.takeaways.forEach((t, i) => check(words(t) >= 22 && words(t) <= 32, `takeaway ${i + 1} has ${words(t)} words (22 to 32)`));
  check(entry.faqs.length === 6, `faqs ${entry.faqs.length} != 6`);
  entry.faqs.forEach(([q, a], i) => check(words(a) >= 23 && words(a) <= 36, `faq ${i + 1} answer has ${words(a)} words (23 to 36)`));
  check(entry.faqs.some(([q]) => /how long/i.test(q)), 'no FAQ on length');
  check(entry.hero === 'war-and-peace-picks', 'hero must be war-and-peace-picks');
  check(!('aside' in entry) && !('compared' in entry), 'no aside or compared field');
  check(!/!\[[^\]]*\]\([^)]*war-and-peace-picks/.test(post), 'picks card must come from the registry hero, not post.md');

  // Dashes: none anywhere, including inside quotes and Sources.
  const all = JSON.stringify(entry);
  check(!dash.test(all), 'en or em dash in entry');
  const dashHit = post.match(new RegExp('.{0,30}' + dash.source + '.{0,30}'));
  check(!dashHit, `en or em dash in post.md: ${dashHit && dashHit[0]}`);

  // Banned phrases and claims (owner rules, AI filler, do-not-claim lists of both research files).
  const banned = new RegExp(['focus ' + 'mode', 'tap any ' + 'word', 'tap a ' + 'word', 'seam' + 'less', 'del' + 've', 'whether you' + '\'re', 'it\'s worth ' + 'noting', 'let\'s ' + 'dive', 'in today\'s ' + 'world', 'in con' + 'clusion', 'misspel', 'cannot open', 'can\'t open', 'does not open', 'Earphones', 'won Best Female', 'Best Female Narrator winner', 'Jason won', '559 characters', '580 characters', 'all but seven', 'first to keep', 'authorized the Maude', 'endorsed', 'suggests characters', 'Kindle Unlimited', 'Nicholas Guy Smith', 'O\'Karma', 'Juliet Stevenson', 'David Case', 'Bromfield\'s translation'].join('|'), 'i');
  const bannedHit = (all + post).match(banned);
  check(!bannedHit, `banned phrase or claim: ${bannedHit && bannedHit[0]}`);
  check(!/361 chapters in (the )?Maude|Maude[^.\n]{0,40}361 chapters/i.test(post), 'Maude has 365 chapters, not 361');

  const llms = readFileSync(join(here, 'llms-line.txt'), 'utf8').trim();
  check(llms === `- [${entry.title}](https://hushbook.app/blog/${entry.slug}): ${entry.description}`, 'llms-line.txt does not match title/description');

  const links = [...post.matchAll(/\]\((\/(?:blog|alternatives)\/[^)\s]+)\)/g)].map(m => m[1]);
  links.forEach(l => {
    const file = l.startsWith('/blog/') ? join(repo, 'content', 'blog', l.slice(6) + '.md') : join(repo, l.slice(1) + '.html');
    check(existsSync(file), `internal link target missing: ${l}`);
  });
  check(links.length >= 3 && links.length <= 6, `internal links ${links.length} not in 3..6`);
  ['best-crime-and-punishment-audiobook', 'how-to-keep-track-of-characters-in-a-book', 'how-long-is-an-audiobook'].forEach(s => check(links.includes('/blog/' + s), `required internal link missing: ${s}`));

  // Images: exactly three wide images, each directly under an H2 (image first, then the answer).
  const lines = post.split('\n');
  const imageLines = lines.map((l, i) => [l, i]).filter(([l]) => /^!\[[^\]]*\]\(\/assets\/[^)\s]+ "wide"\)$/.test(l));
  const images = imageLines.map(([l]) => l.match(/\((\/assets\/[^)\s]+) "wide"\)/)[1]);
  check(images.length === 3, `wide images ${images.length} != 3`);
  ['/assets/img/blog/war-and-peace-audiobook-editions.webp', '/assets/img/blog/war-and-peace-audiobook-length.webp', '/assets/img/blog/war-and-peace-read-along.webp'].forEach(p => check(images.includes(p), `image missing: ${p}`));
  imageLines.forEach(([l, i]) => {
    let j = i - 1; while (j >= 0 && !lines[j].trim()) j--;
    check(/^## /.test(lines[j] || ''), `image on line ${i + 1} is not directly under an H2`);
  });
  const missingImages = images.filter(p => !existsSync(join(repo, p.slice(1))));

  const [bodyPart, sourcesPart = ''] = post.split(/\n## Sources\n/);
  const body = bodyPart.replace(/^# .*\n/, '').replace(/!\[[^\]]*\]\([^)]*\)/g, '');

  // Every number in takeaways and FAQ answers must appear in the body text.
  const nums = s => (s.match(/\d[\d,.]*\d|\d/g) || []).map(n => n.replace(/[.,]$/, ''));
  const bodyNums = new Set(nums(body));
  const missingNums = [];
  [...entry.takeaways, ...entry.faqs.map(f => f[1]), entry.metaDescription, entry.description, entry.cta.text].forEach(t => nums(t).forEach(n => { if (!bodyNums.has(n)) missingNums.push(n); }));
  check(!missingNums.length, `numbers not in body: ${[...new Set(missingNums)].join(', ')}`);

  const bodyWords = body.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[#*|`>_-]+/g, ' ').split(/\s+/).filter(w => /[\p{L}\p{N}]/u.test(w)).length;
  const proseWords = body.split('\n').filter(l => !l.trim().startsWith('|')).join('\n').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[#*|`>_-]+/g, ' ').split(/\s+/).filter(w => /[\p{L}\p{N}]/u.test(w)).length;
  const minutes = Math.round(bodyWords / 220);
  check(entry.readingTime === `${minutes} min read`, `readingTime should be "${minutes} min read" (${bodyWords} words)`);
  const hushbook = (bodyPart.match(/HushBook/g) || []).length;
  const first = body.trim().split('\n')[0].split(/(?<=\.)\s/)[0];
  check(words(first) < 25, `first sentence ${words(first)} words (want under 25)`);

  const h2s = (post.match(/^## .+$/gm) || []);
  const h3 = (post.match(/^### /gm) || []).length;
  const tables = bodyPart.split('\n').filter((l, i, a) => l.trim().startsWith('|') && !(a[i - 1] || '').trim().startsWith('|')).length;
  const sourceLinks = (sourcesPart.match(/^- \[/gm) || []).length;
  const sourceUrls = [...sourcesPart.matchAll(/\]\((https?:[^)\s]+)\)/g)].map(m => m[1]);
  check(new Set(sourceUrls).size === sourceUrls.length, 'duplicate URL in Sources');

  console.log(`title ${entry.title.length}, metaTitle ${entry.metaTitle.length}, metaDescription ${entry.metaDescription.length}, description ${entry.description.length}, cta.heading ${entry.cta.heading.length}, cta.text ${entry.cta.text.length}`);
  console.log(`first sentence ${words(first)} words`);
  console.log(`body words ${bodyWords} (prose outside tables ${proseWords}), takeaway words ${entry.takeaways.map(words).join('/')}, faq answer words ${entry.faqs.map(f => words(f[1])).join('/')}`);
  console.log(`h2 ${h2s.length} (incl. Sources), h3 ${h3}, tables ${tables}, wide images ${images.length}, source links ${sourceLinks}, "HushBook" mentions in body ${hushbook}`);
  h2s.forEach(h => console.log('  ' + h));
  console.log(`internal links ${links.length}: ${links.join(', ')}`);
  console.log(`images ${images.length}${missingImages.length ? `, not on disk yet: ${missingImages.join(', ')}` : ', all on disk'}`);
  if (fails.length) { console.error('FAIL\n- ' + fails.join('\n- ')); process.exit(1); }
  console.log('OK');
}
