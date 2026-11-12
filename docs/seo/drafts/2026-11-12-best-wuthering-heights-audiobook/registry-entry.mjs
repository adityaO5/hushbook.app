const entry = {
  slug: 'best-wuthering-heights-audiobook',
  hero: 'wuthering-heights-picks',
  cta: { heading: 'Read Wuthering Heights as you hear it', text: 'HushBook finds Ruth Golding\'s free LibriVox reading of Wuthering Heights and shows each word in time with her voice, so neither Catherine slips past you. Free on iPhone, Android and Windows, no account.' },
  title: 'Best Wuthering Heights Audiobook: Every Narrator and Edition Compared',
  metaTitle: 'Best Wuthering Heights Audiobook: Every Narrator Compared',
  metaDescription: 'Joanne Froggatt\'s recording is the best Wuthering Heights audiobook. Juliet Stevenson\'s is the highest rated, and Ruth Golding\'s LibriVox reading is free.',
  description: 'Joanne Froggatt\'s recording is our pick, Juliet Stevenson\'s the highest rated, Naxos the best with two voices and Ruth Golding\'s LibriVox reading the free one. Every edition, listening time, Joseph\'s Yorkshire and the names.',
  category: 'Reading and listening',
  datePublished: '2026-11-12',
  dateModified: '2026-11-12',
  readingTime: '26 min read',
  keywords: [
    'best wuthering heights audiobook',
    'wuthering heights audiobook narrator',
    'wuthering heights audiobook length',
    'wuthering heights audiobook joanne froggatt',
    'wuthering heights audiobook aimee lou wood',
    'who narrates wuthering heights in the book',
    'wuthering heights joseph translation',
    'wuthering heights audiobook librivox'
  ],
  takeaways: [
    'Joanne Froggatt\'s 2017 Audible Studios recording, 12 hours 32 minutes, is our best overall pick: 4.4 stars from 8,661 Audible US ratings and 4.8 for performance.',
    'Juliet Stevenson\'s 2015 recording, 13 hours 24 minutes, is the highest rated: 4.6 stars from 427 US ratings and 4.7 from 507 UK. Skip her abridgement of 2 hours 41 minutes.',
    'Janet McTeer and David Timson\'s Naxos recording, 13 hours 9 minutes, gives Lockwood and Nelly separate voices, and the New York Public Library had 14 copies on Libby.',
    'The best free version is Ruth Golding\'s solo LibriVox reading, 14 hours 49 minutes. It reads Project Gutenberg\'s text, which uses Charlotte Brontë\'s 1850 spelling of Joseph\'s Yorkshire dialect.',
    'The novel has 116,440 words in 34 chapters by our count: 12 hours 51 minutes at 1x, 10 hours 17 minutes at 1.25x and 8 hours 34 minutes at 1.5x.'
  ],
  faqs: [
    ['Who is the best narrator of Wuthering Heights?', 'Joanne Froggatt, on the evidence we could check. Her 2017 Audible Studios recording has 4.4 stars from 8,661 Audible US ratings and 4.8 for performance. Juliet Stevenson\'s is the highest rated, at 4.6 from 427.'],
    ['How long is the Wuthering Heights audiobook?', 'About 12 hours 51 minutes at 1x, by our count of 116,440 words. Complete recordings run from 11 hours 1 minute (Kate Petrie) to 14 hours 49 minutes (Ruth Golding\'s free LibriVox reading).'],
    ['Which Wuthering Heights audiobook has two narrators?', 'Janet McTeer and David Timson\'s Naxos recording, Michael Page and Laural Merlington\'s AmazonClassics edition, and Ciaran Saward and Sherry Baines\'s 2026 Arcturus edition. In each one\'s sample, a male voice reads Lockwood.'],
    ['What is Joseph saying in Wuthering Heights?', 'Yorkshire dialect, spelled as it sounds. By our count his 42 speeches in dialect come to 1,814 words, about 12 minutes of listening. Charlotte Brontë respelled his lines for the 1850 edition.'],
    ['Is there a Wuthering Heights audiobook read by the 2026 film\'s cast?', 'No. On November 12, 2026, Audible narrator searches for the cast, Margot Robbie and Jacob Elordi included, found no Brontë title. The recording the film brought back into the news is Aimee Lou Wood\'s 2020 reading.'],
    ['Is there a Wuthering Heights audiobook with text?', 'Yes. HushBook, the app we built, plays Ruth Golding\'s free LibriVox recording or DRM-free MP3 and M4B files you own and shows the words in time with the voice, on iPhone, Android and Windows.']
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

  // Lengths and shape.
  check(h1 === entry.title, `H1 "${h1}" differs from title`);
  check(entry.title.startsWith('Best Wuthering Heights Audiobook'), 'title must start with the query');
  check(entry.metaTitle.length <= 60, `metaTitle ${entry.metaTitle.length} > 60`);
  check(entry.metaTitle.startsWith('Best Wuthering Heights Audiobook'), 'metaTitle must start with the query');
  check(entry.metaDescription.length <= 160, `metaDescription ${entry.metaDescription.length} > 160`);
  check(/^Joanne Froggatt/.test(entry.metaDescription), 'metaDescription must open with the answer');
  check(entry.description.length <= 240, `description ${entry.description.length} > 240`);
  check(entry.cta.text.length <= 220, `cta.text ${entry.cta.text.length} > 220`);
  check(entry.datePublished === '2026-11-12' && entry.dateModified === '2026-11-12', 'dates must be 2026-11-12');
  check(entry.category === 'Reading and listening', 'category');
  check(entry.keywords.length === 8, `keywords ${entry.keywords.length} != 8`);
  check(entry.takeaways.length === 5, `takeaways ${entry.takeaways.length} != 5`);
  entry.takeaways.forEach((t, i) => check(words(t) >= 22 && words(t) <= 32, `takeaway ${i + 1} has ${words(t)} words (22 to 32)`));
  check(entry.faqs.length === 6, `faqs ${entry.faqs.length} != 6`);
  entry.faqs.forEach(([q, a], i) => check(words(a) >= 23 && words(a) <= 36, `faq ${i + 1} answer has ${words(a)} words (23 to 36, cap 40)`));
  check(entry.faqs.some(([q]) => /how long/i.test(q)), 'no FAQ on length');
  check(entry.faqs.filter(([q]) => /film|movie/i.test(q)).length === 1, 'exactly one film FAQ');
  check(entry.hero === 'wuthering-heights-picks', 'hero must be wuthering-heights-picks');
  check(!('aside' in entry) && !('compared' in entry), 'no aside or compared field');
  check(!/!\[[^\]]*\]\([^)]*wuthering-heights-picks/.test(post), 'picks card must come from the registry hero, not post.md');

  // Dashes: none anywhere, including inside quotes, alt text and Sources.
  const all = JSON.stringify(entry);
  check(!dash.test(all), 'en or em dash in entry');
  const dashHit = post.match(new RegExp('.{0,30}' + dash.source + '.{0,30}'));
  check(!dashHit, `en or em dash in post.md: ${dashHit && dashHit[0]}`);

  // Banned phrases and claims: owner rules, AI filler, and the do-not-claim lists of both research files.
  const banned = new RegExp([
    'focus ' + 'mode', 'tap any ' + 'word', 'tap a ' + 'word', 'tap the ' + 'word', 'seam' + 'less', 'del' + 've', 'whether you' + '\'re', 'it\'s worth ' + 'noting', 'let\'s ' + 'dive', 'in today\'s ' + 'world', 'in con' + 'clusion',
    // HushBook negatives (owner rule) and claims the app source does not back.
    'HushBook can' + '\'t', 'HushBook cannot', 'cannot open', 'can\'t open', 'does not open', 'won\'t open', 'not supported', 'copy-protected', 'DRM-protected', 'e-ink', 'Reader not listed', 'lists no reader', 'detects characters', 'suggests (names|characters)', 'unlimited sync', 'Transcribe on my PC', '\\bMac\\b', 'misspel', 'translates? the dialect',
    // Research do-not-claim lists.
    'Kindle Unlimited', 'Whispersync', '440%', 'tie-in edition of the audiobook', 'Atherton reads', 'read by Kristin', 'won an Audie', 'Audie winner', 'won the 2024', '1846', 'Daniel Massey reads', 'Charlotte (translated|removed)', 'only Joseph', 'Nellie the', 'stories\\.audible'
  ].join('|'), 'i');
  const bannedHit = (all + post).match(banned);
  check(!bannedHit, `banned phrase or claim: ${bannedHit && bannedHit[0]}`);
  // Narrator of the Year must always be attributed to Audible.
  [...post.matchAll(/Narrator of the Year/g)].forEach(m => {
    const around = post.slice(Math.max(0, m.index - 160), m.index + 40);
    check(/Audible/.test(around), 'Narrator of the Year not attributed to Audible');
  });
  // Ruth Golding is named from LibriVox; the Discover card is named by title only.
  check(/Wuthering Heights \(Solo Version\)/.test(post), 'Discover card title missing');
  // Mitterer and McQueen: participants, not students.
  check(!/121 Dutch students/.test(post), 'say 121 Dutch participants');

  const llms = readFileSync(join(here, 'llms-line.txt'), 'utf8').trim();
  check(llms === `- [${entry.title}](https://hushbook.app/blog/${entry.slug}): ${entry.description}`, 'llms-line.txt does not match title/description');

  // Internal links: 3 to 6, all real, the required ones present.
  const links = [...post.matchAll(/\]\((\/(?:blog|alternatives)\/[^)\s]+)\)/g)].map(m => m[1]);
  links.forEach(l => {
    const file = l.startsWith('/blog/') ? join(repo, 'content', 'blog', l.slice(6) + '.md') : join(repo, l.slice(1) + '.html');
    check(existsSync(file), `internal link target missing: ${l}`);
  });
  check(links.length >= 3 && links.length <= 6, `internal links ${links.length} not in 3..6`);
  check(new Set(links).size === links.length, 'duplicate internal link');
  ['how-long-is-an-audiobook', 'how-to-keep-track-of-characters-in-a-book', 'abridged-vs-unabridged-audiobooks'].forEach(s => check(links.includes('/blog/' + s), `required internal link missing: ${s}`));

  // Images: exactly four wide images, each directly under its own H2 (image first, then the answer).
  const lines = post.split('\n');
  const imageLines = lines.map((l, i) => [l, i]).filter(([l]) => /^!\[[^\]]*\]\(\/assets\/[^)\s]+ "wide"\)$/.test(l));
  const anyImages = (post.match(/!\[/g) || []).length;
  const images = imageLines.map(([l]) => l.match(/\((\/assets\/[^)\s]+) "wide"\)/)[1]);
  check(images.length === 4 && anyImages === 4, `wide images ${images.length} (all images ${anyImages}) != 4`);
  const wantImages = {
    '/assets/img/blog/wuthering-heights-editions.webp': /^## Which Wuthering Heights audiobook is best\?$/,
    '/assets/img/blog/wuthering-heights-length.webp': /^## How long is the Wuthering Heights audiobook\?$/,
    '/assets/img/blog/wuthering-heights-family-tree.webp': /^## How do you keep the two Catherines/,
    '/assets/img/blog/wuthering-heights-read-along.webp': /^## Is there a Wuthering Heights audiobook with text\?$/
  };
  imageLines.forEach(([l, i]) => {
    let j = i - 1; while (j >= 0 && !lines[j].trim()) j--;
    const src = l.match(/\((\/assets\/[^)\s]+) "wide"\)/)[1];
    check(/^## /.test(lines[j] || ''), `image on line ${i + 1} is not directly under an H2`);
    check(wantImages[src] && wantImages[src].test(lines[j] || ''), `${src} is under the wrong H2: ${lines[j]}`);
    const alt = l.match(/^!\[([^\]]*)\]/)[1];
    check(alt.length >= 120, `${src} alt text too short (${alt.length})`);
  });
  Object.keys(wantImages).forEach(p => check(images.includes(p), `image missing: ${p}`));
  const firstNonBlank = lines.slice(1).find(l => l.trim());
  check(!/^!\[/.test(firstNonBlank), 'no image at the very top of the post');
  const missingImages = images.filter(p => !existsSync(join(repo, p.slice(1))));

  const [bodyPart, sourcesPart = ''] = post.split(/\n## Sources\n/);
  const body = bodyPart.replace(/^# .*\n/, '').replace(/!\[[^\]]*\]\([^)]*\)/g, '');

  // Every number in takeaways, FAQ answers, meta and cta must appear in the body text.
  const nums = s => (s.match(/\d[\d,.]*\d|\d/g) || []).map(n => n.replace(/[.,]$/, ''));
  const bodyNums = new Set(nums(body));
  const missingNums = [];
  [...entry.takeaways, ...entry.faqs.map(f => f[1]), entry.metaDescription, entry.description, entry.cta.text].forEach(t => nums(t).forEach(n => { if (!bodyNums.has(n)) missingNums.push(n); }));
  check(!missingNums.length, `numbers not in body: ${[...new Set(missingNums)].join(', ')}`);

  // Words, reading time, first sentence.
  const bodyWords = body.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[#*|`>_-]+/g, ' ').split(/\s+/).filter(w => /[\p{L}\p{N}]/u.test(w)).length;
  const proseWords = body.split('\n').filter(l => !l.trim().startsWith('|')).join('\n').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[#*|`>_-]+/g, ' ').split(/\s+/).filter(w => /[\p{L}\p{N}]/u.test(w)).length;
  const minutes = Math.round(bodyWords / 220);
  check(entry.readingTime === `${minutes} min read`, `readingTime should be "${minutes} min read" (${bodyWords} words)`);
  const first = body.trim().split('\n')[0].split(/(?<=\.)\s/)[0];
  check(words(first) < 25, `first sentence ${words(first)} words (want under 25)`);
  ['Joanne Froggatt', 'Juliet Stevenson', 'Janet McTeer', 'Ruth Golding', '12 hours 32 minutes', '13 hours 24 minutes', '13 hours 9 minutes', '14 hours 49 minutes'].forEach(s => check(body.trim().split('\n')[0].includes(s), `first paragraph lacks "${s}"`));

  // HushBook: one value-first hint before the closing H2, then the closing section.
  const closingAt = bodyPart.indexOf('\n## Is there a Wuthering Heights audiobook with text?');
  const beforeClosing = bodyPart.slice(0, closingAt);
  const hintParas = beforeClosing.split(/\n\n/).filter(p => /HushBook/.test(p) && !/^\|/.test(p.trim()) && !/^!\[/.test(p.trim()));
  check(hintParas.length === 1, `HushBook hint paragraphs before the closing H2: ${hintParas.length} (want 1, table cells aside)`);
  check(/Long-press any line to play from there/.test(bodyPart), 'long-press line missing');

  // Every H2 except the fixed ones is a question; the first line under each is the answer.
  const h2s = (post.match(/^## .+$/gm) || []);
  h2s.filter(h => !/^## (Sources|What we could not verify)$/.test(h)).forEach(h => check(/\?$/.test(h), `H2 not a question: ${h}`));
  const h3 = (post.match(/^### /gm) || []).length;
  const tables = bodyPart.split('\n').filter((l, i, a) => l.trim().startsWith('|') && !(a[i - 1] || '').trim().startsWith('|')).length;
  const sourceLinks = (sourcesPart.match(/^- \[/gm) || []).length;
  const sourceUrls = [...sourcesPart.matchAll(/\]\((https?:[^)\s]+)\)/g)].map(m => m[1]);
  check(new Set(sourceUrls).size === sourceUrls.length, 'duplicate URL in Sources');

  // Every study cited in the body appears in Sources.
  ['Wiltshire', 'Clarke and Garrett', 'Floccia', 'Adank', 'Mitterer and McQueen', 'Davis', 'Sohoglu', 'Rodero and Lucas', 'Clinton-Lisell (2022)', 'Varao Sousa', 'Kopp and D\'Mello', 'Clinton-Lisell (2023)', 'Hui and Godfroid'].forEach(s => check(sourcesPart.includes(s), `study missing from Sources: ${s}`));

  console.log(`title ${entry.title.length}, metaTitle ${entry.metaTitle.length}, metaDescription ${entry.metaDescription.length}, description ${entry.description.length}, cta.heading ${entry.cta.heading.length}, cta.text ${entry.cta.text.length}`);
  console.log(`first sentence ${words(first)} words`);
  console.log(`body words ${bodyWords} (prose outside tables ${proseWords}), takeaway words ${entry.takeaways.map(words).join('/')}, faq answer words ${entry.faqs.map(f => words(f[1])).join('/')}`);
  console.log(`h2 ${h2s.length} (incl. Sources), h3 ${h3}, tables ${tables}, wide images ${images.length}, source links ${sourceLinks}`);
  h2s.forEach(h => console.log('  ' + h));
  console.log(`internal links ${links.length}: ${links.join(', ')}`);
  console.log(`images ${images.length}${missingImages.length ? `, not on disk yet: ${missingImages.join(', ')}` : ', all on disk'}`);
  if (fails.length) { console.error('FAIL\n- ' + fails.join('\n- ')); process.exit(1); }
  console.log('OK');
}
