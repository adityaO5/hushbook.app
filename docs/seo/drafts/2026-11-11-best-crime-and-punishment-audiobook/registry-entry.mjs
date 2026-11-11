const entry = {
  slug: 'best-crime-and-punishment-audiobook',
  cta: { heading: 'Read Crime and Punishment as you hear it', text: 'HushBook finds the free LibriVox recordings of Crime and Punishment and highlights each word as the narrator reads, so no name slips past you. Free on iPhone, Android and Windows, no account.' },
  title: 'Best Audiobook Version of Crime and Punishment: Every Translation and Narrator Compared',
  metaTitle: 'Best Crime and Punishment Audiobook: Every Edition Compared',
  metaDescription: 'Anthony Heald\'s Blackstone recording is the best Crime and Punishment audiobook; Mark Nelson\'s LibriVox Version 3 is the best free one. 20 editions compared.',
  description: 'Anthony Heald\'s Blackstone recording is our pick and Mark Nelson\'s LibriVox reading the free one. Every unabridged edition by translation, narrator and runtime, the McDuff and Penguin question, listening time and the Russian names.',
  category: 'Reading and listening',
  datePublished: '2026-11-11',
  dateModified: '2026-11-11',
  readingTime: '17 min read',
  keywords: [
    'best crime and punishment audiobook',
    'crime and punishment audiobook best narrator',
    'best crime and punishment translation',
    'crime and punishment audiobook length',
    'crime and punishment audiobook free',
    'crime and punishment audiobook translated by david mcduff',
    'crime and punishment audiobook translated by richard pevear',
    'crime and punishment audiobook penguin classics'
  ],
  takeaways: [
    'Anthony Heald\'s unabridged Blackstone recording, 20 hours 28 minutes, is our best overall pick: 4.6 stars from 10,436 Audible ratings as of November 11, 2026, and a 2009 Audie finalist.',
    'The best free version is LibriVox Version 3, in which Mark Nelson reads Constance Garnett\'s translation alone for 22 hours 2 minutes. All four free LibriVox recordings read Garnett\'s 1914 text.',
    'Penguin\'s unabridged audiobook, read by Don Warrington in 2020, uses Oliver Ready\'s translation. The only audio on the David McDuff page is a 2005 abridged download of 5 hours 15 minutes.',
    'For Pevear and Volokhonsky\'s translation, Bill Homewood\'s 2025 recording runs 28 hours 4 minutes. Anthony Heald, Will Poulter, Constantine Gregory and George Guidall all read Garnett\'s public domain translation.',
    'Garnett\'s text has 203,197 words in 41 chapters by our count: about 22 hours 26 minutes at 1x, 17 hours 57 minutes at 1.25x and 14 hours 57 minutes at 1.5x.'
  ],
  faqs: [
    ['Who is the best narrator of Crime and Punishment?', 'Anthony Heald, on the evidence we could check. His 2007 Blackstone recording runs 20 hours 28 minutes and has 4.6 stars from 10,436 Audible ratings as of November 11, 2026, more than any other edition.'],
    ['How many hours is the Crime and Punishment audiobook?', 'About 20 to 28 hours. Paid editions run from 20 hours 8 minutes (Alastair Cameron) to 28 hours 4 minutes (Bill Homewood) on Audible. The free LibriVox Version 2 runs 19 hours 53 minutes.'],
    ['Is there a free Crime and Punishment audiobook?', 'Yes. LibriVox has four free recordings of Constance Garnett\'s translation. In Version 3, Mark Nelson reads alone for 22 hours 2 minutes; Version 4 is a dramatic reading with 49 volunteers.'],
    ['Is there an audiobook of the Penguin Classics translation?', 'Yes, of Oliver Ready\'s: Penguin\'s 2020 unabridged recording, read by Don Warrington, runs 1,502 minutes. We found no unabridged audiobook of David McDuff\'s translation, the Penguin Classics paperback sold in the US.'],
    ['Which translation of Crime and Punishment is best for listening?', 'Garnett\'s, for choice: most audiobooks and all four free ones read her 1914 translation. For modern English, Don Warrington reads Oliver Ready\'s and Bill Homewood reads Pevear and Volokhonsky\'s.'],
    ['Is there a Crime and Punishment audiobook with text?', 'Yes. HushBook, the app we built, highlights each word as the narrator reads the free LibriVox recordings or DRM-free MP3 and M4B files you own, on iPhone, Android and Windows.']
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
  check(entry.title.startsWith('Best Audiobook Version of Crime and Punishment'), 'title must start with the query');
  check(entry.metaTitle.length <= 60, `metaTitle ${entry.metaTitle.length} > 60`);
  check(entry.metaTitle.startsWith('Best Crime and Punishment Audiobook'), 'metaTitle must start with the query');
  check(entry.metaDescription.length <= 160, `metaDescription ${entry.metaDescription.length} > 160`);
  check(entry.description.length <= 240, `description ${entry.description.length} > 240`);
  check(entry.cta.text.length <= 220, `cta.text ${entry.cta.text.length} > 220`);
  check(entry.keywords.length === 8, `keywords ${entry.keywords.length} != 8`);
  check(entry.takeaways.length === 5, `takeaways ${entry.takeaways.length} != 5`);
  entry.takeaways.forEach((t, i) => check(words(t) >= 22 && words(t) <= 32, `takeaway ${i + 1} has ${words(t)} words (22 to 32)`));
  check(entry.faqs.length === 6, `faqs ${entry.faqs.length} != 6`);
  entry.faqs.forEach(([q, a], i) => check(words(a) >= 23 && words(a) <= 36, `faq ${i + 1} answer has ${words(a)} words (23 to 36)`));
  check(!('hero' in entry) && !('aside' in entry) && !('compared' in entry), 'no hero, aside or compared field');

  // Dashes: none in the entry; none in post.md outside double-quoted text.
  const all = JSON.stringify(entry);
  check(!dash.test(all), 'en or em dash in entry');
  const unquoted = post.replace(/"[^"\n]*"/g, '');
  const dashHit = unquoted.match(new RegExp('.{0,30}' + dash.source + '.{0,30}'));
  check(!dashHit, `en or em dash outside quotes in post.md: ${dashHit && dashHit[0]}`);

  // Banned phrases and claims (owner rules, AI filler, do-not-claim lists).
  const banned = new RegExp(['focus ' + 'mode', 'tap any ' + 'word', 'tap a ' + 'word', 'seam' + 'less', 'del' + 've', 'whether you' + '\'re', 'it\'s worth ' + 'noting', 'let\'s ' + 'dive', 'in today\'s ' + 'world', 'in con' + 'clusion', 'twelve monthly', 'misspel', 'cannot open', 'can\'t open', 'does not open', 'won an Audie', 'Audie winner', 'Earphones'].join('|'), 'i');
  const bannedHit = (all + post).match(banned);
  check(!bannedHit, `banned phrase or claim: ${bannedHit && bannedHit[0]}`);

  const llms = readFileSync(join(here, 'llms-line.txt'), 'utf8').trim();
  check(llms === `- [${entry.title}](https://hushbook.app/blog/${entry.slug}): ${entry.description}`, 'llms-line.txt does not match title/description');

  const links = [...post.matchAll(/\]\((\/(?:blog|alternatives)\/[^)\s]+)\)/g)].map(m => m[1]);
  links.forEach(l => {
    const file = l.startsWith('/blog/') ? join(repo, 'content', 'blog', l.slice(6) + '.md') : join(repo, l.slice(1) + '.html');
    check(existsSync(file), `internal link target missing: ${l}`);
  });
  check(links.length >= 3 && links.length <= 6, `internal links ${links.length} not in 3..6`);
  const images = [...post.matchAll(/!\[[^\]]*\]\((\/assets\/[^)\s]+) "wide"\)/g)].map(m => m[1]);
  const missingImages = images.filter(p => !existsSync(join(repo, p.slice(1))));
  check(images.length === 3, `wide images ${images.length} != 3`);

  const [bodyPart, sourcesPart = ''] = post.split(/\n## Sources\n/);
  const body = bodyPart.replace(/^# .*\n/, '').replace(/!\[[^\]]*\]\([^)]*\)/g, '');

  // Every number in takeaways and FAQ answers must appear in the body text.
  const nums = s => (s.match(/\d[\d,.]*\d|\d/g) || []).map(n => n.replace(/[.,]$/, ''));
  const bodyNums = new Set(nums(body));
  const missingNums = [];
  [...entry.takeaways, ...entry.faqs.map(f => f[1]), entry.metaDescription, entry.description].forEach(t => nums(t).forEach(n => { if (!bodyNums.has(n)) missingNums.push(n); }));
  check(!missingNums.length, `numbers not in body: ${[...new Set(missingNums)].join(', ')}`);

  const bodyWords = body.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[#*|`>_-]+/g, ' ').split(/\s+/).filter(w => /[\p{L}\p{N}]/u.test(w)).length;
  const proseWords = body.split('\n').filter(l => !l.trim().startsWith('|')).join('\n').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[#*|`>_-]+/g, ' ').split(/\s+/).filter(w => /[\p{L}\p{N}]/u.test(w)).length;
  const minutes = Math.round(bodyWords / 220);
  check(entry.readingTime === `${minutes} min read`, `readingTime should be "${minutes} min read" (${bodyWords} words)`);
  const hushbook = (bodyPart.match(/HushBook/g) || []).length;
  const first = body.trim().split('\n')[0].split(/(?<=\.)\s/)[0];

  const h2s = (post.match(/^## .+$/gm) || []);
  const h3 = (post.match(/^### /gm) || []).length;
  const tables = bodyPart.split('\n').filter((l, i, a) => l.trim().startsWith('|') && !(a[i - 1] || '').trim().startsWith('|')).length;
  const sourceLinks = (sourcesPart.match(/^- \[/gm) || []).length;

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
