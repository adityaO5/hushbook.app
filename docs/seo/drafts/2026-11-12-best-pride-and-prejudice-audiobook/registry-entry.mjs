const entry = {
  slug: 'best-pride-and-prejudice-audiobook',
  hero: 'pride-and-prejudice-picks',
  cta: { heading: 'See who is speaking in Pride and Prejudice', text: 'HushBook finds the free LibriVox recordings of Pride and Prejudice and highlights each word as the narrator reads, so no line of dialogue slips past you. Free on iPhone, Android and Windows, no account.' },
  title: 'Best Pride and Prejudice Audiobook: Every Narrator, Free Version and Dramatisation Compared',
  metaTitle: 'Best Pride and Prejudice Audiobook: Every Edition Compared',
  metaDescription: 'Rosamund Pike\'s recording is the best Pride and Prejudice audiobook; Karen Savage\'s free LibriVox reading runs 10 hours 23 minutes. Every edition compared.',
  description: 'Rosamund Pike\'s Audible recording is our pick, Juliet Stevenson\'s the runner-up and Karen Savage\'s LibriVox reading the free one. Every unabridged edition by runtime, the full-cast and BBC versions, the American narrators and the names.',
  category: 'Reading and listening',
  datePublished: '2026-11-12',
  dateModified: '2026-11-12',
  readingTime: '24 min read',
  keywords: [
    'best pride and prejudice audiobook',
    'which pride and prejudice audiobook is best',
    'pride and prejudice audiobook length',
    'pride and prejudice audiobook juliet stevenson',
    'pride and prejudice audiobook rosamund pike',
    'pride and prejudice audiobook american accent',
    'pride and prejudice audiobook free',
    'pride and prejudice audible full cast'
  ],
  takeaways: [
    'Rosamund Pike\'s Audible Studios recording, 11 hours 35 minutes, is our best overall pick: 4.8 stars from 43,975 Audible US ratings, about eight times as many as the next most rated edition.',
    'Juliet Stevenson\'s Naxos recording, 14 hours 2 minutes, is the runner-up with 4.9 stars from 204 ratings. Her 2 hour 47 minute abridged recording is sold under the same plain title.',
    'The best free version is Karen Savage\'s LibriVox Version 3: one voice, 10 hours 23 minutes, 61 sections, one per chapter. LibriVox has six complete free recordings in all.',
    'Audible\'s 2025 full-cast Pride and Prejudice, a 2026 Audie finalist, is a 4 hour 34 minute adaptation, not the novel. Every complete reading takes at least 10 hours 23 minutes.',
    'The novel has 121,676 words in 61 chapters: 13 hours 26 minutes at 1x, 10 hours 45 minutes at 1.25x, 8 hours 57 minutes at 1.5x, 6 hours 43 minutes at 2x.'
  ],
  faqs: [
    ['Who is the best narrator of Pride and Prejudice?', 'Rosamund Pike, on the evidence we could check. Her 2015 Audible Studios recording has 4.8 stars from 43,975 Audible US ratings. Juliet Stevenson\'s 2021 Naxos recording has the highest average, 4.9 from 204 ratings.'],
    ['How long is the Pride and Prejudice audiobook?', 'About 13 hours 26 minutes at 1x, by our count of 121,676 words. Complete readings run from 10 hours 23 minutes (Karen Savage, LibriVox) to 14 hours 27 minutes (LibriVox Version 5).'],
    ['Is there a free Pride and Prejudice audiobook?', 'Yes. LibriVox has six complete free recordings. Karen Savage reads Version 3 alone in 10 hours 23 minutes, and Version 6 is a dramatic reading with 26 readers, one per character.'],
    ['Is the Audible full-cast Pride and Prejudice unabridged?', 'No. The 2025 Audible Original with Marisa Abela and Harris Dickinson is a 4 hour 34 minute adaptation by Lulu Raczka. Every complete reading of the novel takes at least 10 hours 23 minutes.'],
    ['How many chapters are in Pride and Prejudice?', '61. The 1813 first edition has three volumes of 23, 19 and 19 chapters, so Volume II, Chapter 1 is Chapter 24 in editions that number straight through, such as Project Gutenberg\'s.'],
    ['Is there a Pride and Prejudice audiobook with text?', 'Yes. HushBook, the app we built, highlights each word as the narrator reads the free LibriVox recordings or DRM-free MP3 and M4B files you own, on iPhone, Android and Windows.']
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
  const warns = [];
  const check = (ok, msg) => { if (!ok) fails.push(msg); };
  const dash = new RegExp('[' + String.fromCharCode(0x2013, 0x2014) + ']');

  check(h1 === entry.title, `H1 "${h1}" differs from title`);
  check(entry.title.startsWith('Best Pride and Prejudice Audiobook'), 'title must start with the query');
  check(entry.metaTitle.length <= 60, `metaTitle ${entry.metaTitle.length} > 60`);
  check(entry.metaTitle.startsWith('Best Pride and Prejudice Audiobook'), 'metaTitle must start with the query');
  check(entry.metaDescription.length <= 160, `metaDescription ${entry.metaDescription.length} > 160`);
  check(/^Rosamund Pike/.test(entry.metaDescription), 'metaDescription must open with the answer');
  check(entry.description.length <= 240, `description ${entry.description.length} > 240`);
  check(entry.cta.text.length <= 220, `cta.text ${entry.cta.text.length} > 220`);
  check(entry.category === 'Reading and listening', 'category');
  check(entry.datePublished === '2026-11-12' && entry.dateModified === '2026-11-12', 'dates must be 2026-11-12');
  check(entry.keywords.length === 8, `keywords ${entry.keywords.length} != 8`);
  check(entry.takeaways.length === 5, `takeaways ${entry.takeaways.length} != 5`);
  entry.takeaways.forEach((t, i) => check(words(t) >= 22 && words(t) <= 32, `takeaway ${i + 1} has ${words(t)} words (22 to 32)`));
  check(entry.faqs.length === 6, `faqs ${entry.faqs.length} != 6`);
  entry.faqs.forEach(([q, a], i) => check(words(a) >= 20 && words(a) <= 40, `faq ${i + 1} answer has ${words(a)} words (20 to 40)`));
  check(entry.faqs.some(([q]) => /how long/i.test(q)), 'no FAQ on length');
  check(entry.hero === 'pride-and-prejudice-picks', 'hero must be pride-and-prejudice-picks');
  check(!('aside' in entry) && !('compared' in entry), 'no aside or compared field');
  check(!/pride-and-prejudice-picks/.test(post), 'picks card must come from the registry hero, not post.md');

  // Keywords must be scout.md phrasings.
  const scout = readFileSync(join(here, 'scout.md'), 'utf8').toLowerCase();
  entry.keywords.forEach(k => check(scout.includes(k), `keyword not in scout.md: ${k}`));

  // Dashes: none anywhere, including inside quotes and Sources.
  const all = JSON.stringify(entry);
  check(!dash.test(all), 'en or em dash in entry');
  const dashHit = post.match(new RegExp('.{0,30}' + dash.source + '.{0,30}'));
  check(!dashHit, `en or em dash in post.md: ${dashHit && dashHit[0]}`);

  // Banned phrases and claims: AI filler, owner rules, and the do-not-claim lists of both research files.
  const banned = new RegExp([
    'focus ' + 'mode', 'tap any ' + 'word', 'tap a ' + 'word', 'seam' + 'less', 'del' + 've', 'whether you' + '\'re',
    'it\'s worth ' + 'noting', 'let\'s ' + 'dive', 'in today\'s ' + 'world', 'in con' + 'clusion', 'misspel',
    'HushBook (can\'t|cannot|does not|doesn\'t|won\'t|isn\'t)', 'cannot open', 'can\'t open', 'does not open', 'e-ink',
    'Stevenson\\]', 'audio_bookspoetry', 'JANE AUSTEN Pride', 'Karen Savage in Discover', 'built-in', 'featured in Discover', 'curated',
    'suggests characters', 'character suggestions', 'Kindle Unlimited', 'Sync with e-book',
    'heart rate ran', 'beats per minute', 'tested her novels', 'Mrs\\. Wickham', 'Mrs\\. Collins', '17\\.4 words', '117,830', '122,000',
    'Sense and Sensibility', 'audiobookfest', 'thebooksinsider', 'annotatedebooks', 'audiobook\\.co\\.uk',
    'American accent (?:recording|edition|version) (?:is|by)',
    '(?:Reading|Gibson|Kellgren|Klett|Savage)(?:\'s)? (?:reads|narrates|recording is|reading is)[^.\\n]{0,20}(?:American|British|English) accent'
  ].join('|'), 'i');
  const bannedHit = (all + post).match(banned);
  check(!bannedHit, `banned phrase or claim: ${bannedHit && bannedHit[0]}`);
  check(!/HushBook[^|\n]*\|[^\n]*\|\s*No\s*\|/.test(post) && !/\|\s*No\s*\|[^\n]*HushBook/.test(post), 'a "No" cell next to HushBook');
  check(post.includes('"Pride and Prejudice (version 3)"'), 'closing must name the Discover card "Pride and Prejudice (version 3)"');
  check(/Long-press any line to play from there/.test(post), 'closing must say long-press a line');
  check((post.match(/121,676/g) || []).length >= 3, 'use the site word count 121,676');
  check(post.includes('Karen Savage') && post.includes('LibriVox'), 'name Karen Savage as the LibriVox reader');

  const llms = readFileSync(join(here, 'llms-line.txt'), 'utf8').trim();
  check(llms === `- [${entry.title}](https://hushbook.app/blog/${entry.slug}): ${entry.description}`, 'llms-line.txt does not match title/description');

  // Internal links. best-wuthering-heights-audiobook ships the same day: accept its draft folder, but report it.
  const sameDay = { 'best-wuthering-heights-audiobook': join(repo, 'docs', 'seo', 'drafts', '2026-11-12-best-wuthering-heights-audiobook') };
  const links = [...post.matchAll(/\]\((\/(?:blog|alternatives)\/[^)\s]+)\)/g)].map(m => m[1]);
  links.forEach(l => {
    const slug = l.startsWith('/blog/') ? l.slice(6) : null;
    const file = slug ? join(repo, 'content', 'blog', slug + '.md') : join(repo, l.slice(1) + '.html');
    if (existsSync(file)) return;
    if (slug && sameDay[slug] && existsSync(sameDay[slug])) { warns.push(`${l} is not in content/blog yet (same-day post; ship together or drop the sentence)`); return; }
    check(false, `internal link target missing: ${l}`);
  });
  check(links.length >= 3 && links.length <= 6, `internal links ${links.length} not in 3..6`);
  check(new Set(links).size === links.length, 'duplicate internal link');
  ['how-long-is-an-audiobook', 'how-to-keep-track-of-characters-in-a-book', 'abridged-vs-unabridged-audiobooks'].forEach(s => check(links.includes('/blog/' + s), `required internal link missing: ${s}`));

  // Images: exactly four wide images, each directly under its own H2 (image first, then the answer). None at the very top.
  const lines = post.split('\n');
  const imageLines = lines.map((l, i) => [l, i]).filter(([l]) => /^!\[[^\]]*\]\(\/assets\/[^)\s]+ "wide"\)$/.test(l));
  const images = imageLines.map(([l]) => l.match(/\((\/assets\/[^)\s]+) "wide"\)/)[1]);
  check(images.length === 4, `wide images ${images.length} != 4`);
  const wantUnder = {
    '/assets/img/blog/pride-and-prejudice-editions.webp': /^## Which Pride and Prejudice audiobook is best\?$/,
    '/assets/img/blog/pride-and-prejudice-length.webp': /^## How long is the Pride and Prejudice audiobook\?$/,
    '/assets/img/blog/pride-and-prejudice-who-is-speaking.webp': /^## How do you keep track of the names in Pride and Prejudice\?$/,
    '/assets/img/blog/pride-and-prejudice-audiobook-with-text.webp': /^## Is there a Pride and Prejudice audiobook with text\?$/
  };
  Object.keys(wantUnder).forEach(p => check(images.includes(p), `image missing: ${p}`));
  imageLines.forEach(([l, i]) => {
    let j = i - 1; while (j >= 0 && !lines[j].trim()) j--;
    const src = l.match(/\((\/assets\/[^)\s]+) "wide"\)/)[1];
    check(/^## /.test(lines[j] || ''), `image on line ${i + 1} is not directly under an H2`);
    if (wantUnder[src]) check(wantUnder[src].test(lines[j] || ''), `${src} is under "${lines[j]}"`);
    const alt = l.match(/^!\[([^\]]*)\]/)[1];
    check(alt.length >= 120, `alt text on line ${i + 1} is short (${alt.length} chars)`);
  });
  const firstContent = lines.slice(1).find(l => l.trim());
  check(!/^!\[/.test(firstContent), 'no image at the very top of the markdown');
  const missingImages = images.filter(p => !existsSync(join(repo, p.slice(1))));

  const [bodyPart, sourcesPart = ''] = post.split(/\n## Sources\n/);
  const body = bodyPart.replace(/^# .*\n/, '').replace(/!\[[^\]]*\]\([^)]*\)/g, '');

  // Every number in takeaways, FAQ answers, meta and cta must appear in the body text.
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
  const firstPara = body.trim().split('\n')[0];
  ['Rosamund Pike', 'Juliet Stevenson', 'Karen Savage', 'Audible Original', '4 hour 34 minute', '11 hours 35 minutes', '14 hours 2 minutes', '10 hours 23 minutes'].forEach(s => check(firstPara.includes(s), `first paragraph lacks "${s}"`));

  // The HushBook hint before the closing section: once, in the names section.
  const sections = bodyPart.split(/\n(?=## )/);
  const hintSections = sections.filter(s => /built HushBook/.test(s)).map(s => s.split('\n')[0]);
  check(hintSections.length === 1 && /keep track of the names/.test(hintSections[0]), `value-first hint should sit once in the names section, found in: ${hintSections.join(' / ')}`);

  const h2s = (post.match(/^## .+$/gm) || []);
  const h3 = (post.match(/^### /gm) || []).length;
  const tables = bodyPart.split('\n').filter((l, i, a) => l.trim().startsWith('|') && !(a[i - 1] || '').trim().startsWith('|')).length;
  check(tables >= 5, `tables ${tables} < 5`);
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
  warns.forEach(w => console.log('WARN ' + w));
  if (fails.length) { console.error('FAIL\n- ' + fails.join('\n- ')); process.exit(1); }
  console.log('OK');
}
