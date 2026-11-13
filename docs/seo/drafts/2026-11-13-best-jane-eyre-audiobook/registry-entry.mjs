const entry = {
  slug: 'best-jane-eyre-audiobook',
  hero: 'jane-eyre-picks',
  cta: { heading: 'Read Jane Eyre along with the free recording', text: 'HushBook finds Elizabeth Klett\'s free LibriVox reading of Jane Eyre and shows each word in time with her voice, through all 38 chapters. Free on iPhone, Android and Windows, no account.' },
  title: 'Best Jane Eyre Audiobook: Every Narrator and Edition Compared',
  metaTitle: 'Best Jane Eyre Audiobook: Every Narrator and Free Version',
  metaDescription: 'Thandiwe Newton\'s 19 hour 10 minute recording is the best Jane Eyre audiobook; Elizabeth Klett\'s LibriVox reading is free. Every edition, the French, the names.',
  description: 'Thandiwe Newton\'s Audible recording is our pick, Juliet Stevenson\'s the runner-up, Elizabeth Klett\'s LibriVox reading the free one and Anna Popplewell\'s the one to borrow. Every edition by runtime, the French, St. John and the names.',
  category: 'Reading and listening',
  datePublished: '2026-11-13',
  dateModified: '2026-11-13',
  readingTime: '28 min read',
  keywords: [
    'best jane eyre audiobook',
    'jane eyre audiobook length',
    'jane eyre audiobook thandie newton',
    'jane eyre audiobook juliet stevenson',
    'jane eyre audiobook free',
    'jane eyre audiobook librivox',
    'jane eyre audiobook bbc',
    'jane eyre french translations'
  ],
  takeaways: [
    'Thandiwe Newton\'s 2016 Audible Studios recording, 19 hours 10 minutes, is our best overall pick: 4.8 stars from 22,153 Audible US ratings, ten times as many as the next most rated edition.',
    'Juliet Stevenson\'s 2009 Audible Studios recording, 19 hours 13 minutes, is the runner-up: 4.7 stars from 2,188 US ratings, and 4.8 from 1,715 on Audible UK with 4.9 for performance.',
    'The best free version is Elizabeth Klett\'s solo LibriVox reading, 18 hours 36 minutes. LibriVox calls it version 2 and the Internet Archive version 3, so pick it by its length.',
    'The novel has 186,145 words in 38 chapters by our count: 20 hours 33 minutes at 1x, 16 hours 26 minutes at 1.25x and 13 hours 42 minutes at 1.5x.',
    'French is only 346 of the novel\'s 186,145 words by our count, under 0.2% and about two minutes of listening. Adèle speaks 84% of it, all in Chapters 11 to 24.'
  ],
  faqs: [
    ['What is the best Jane Eyre audiobook?', 'Thandiwe Newton\'s unabridged Audible Studios recording, 19 hours 10 minutes, with 4.8 stars from 22,153 Audible US ratings on November 13, 2026. Juliet Stevenson\'s is the runner-up, and Elizabeth Klett\'s LibriVox reading is the best free one.'],
    ['How long is the Jane Eyre audiobook?', '20 hours 33 minutes at 1x for the novel\'s 186,145 words, by our count at 151 words a minute. Complete recordings run from 17 hours 21 minutes (Susan Ericksen) to 25 hours 19 minutes (Dawn Sutton, LibriVox).'],
    ['Is Thandie Newton\'s Jane Eyre unabridged?', 'Yes. It is the same recording that Audible now credits to Thandiwe Newton: Audible Studios, 2016, 19 hours 10 minutes, unabridged.'],
    ['Is there a free Jane Eyre audiobook?', 'Yes. LibriVox has four complete free English recordings. Elizabeth Klett\'s solo reading, 18 hours 36 minutes, is the one to pick; Dawn Sutton\'s solo reading runs 25 hours 19 minutes, and a dramatic reading has 36 readers.'],
    ['Is the BBC Jane Eyre audiobook the full book?', 'No. The BBC Radio 4 dramatisation with Amanda Hale and Tom Burke, adapted by Rachel Joyce, runs 2 hours 13 minutes. Complete recordings of the novel on sale take at least 17 hours 21 minutes.'],
    ['How do you pronounce St. John in Jane Eyre?', 'SIN-jin, the traditional British way and the one listeners report hearing on the recordings. Eyre sounds like "air".'],
    ['Do you need to know French to listen to Jane Eyre?', 'No. By our count French is 346 of the novel\'s 186,145 words, under 0.2%, about two minutes of listening. Adèle speaks 84% of it, and Brontë prints most of Adèle\'s talk in English.']
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
  const query = 'Best Jane Eyre Audiobook';

  // Title, meta and registry shape.
  check(h1 === entry.title, `H1 "${h1}" differs from title`);
  check(entry.title.startsWith(query), 'title must start with the query');
  check(entry.metaTitle.startsWith(query + ':'), 'metaTitle must open with the query and a colon');
  check(entry.metaTitle.length >= 50 && entry.metaTitle.length <= 60, `metaTitle ${entry.metaTitle.length} not in 50..60 (under 50 gets " | HushBook")`);
  check(entry.metaDescription.length <= 160, `metaDescription ${entry.metaDescription.length} > 160`);
  check(/^Thandiwe Newton's 19 hour 10 minute/.test(entry.metaDescription), 'metaDescription must open with the pick, narrator and running time');
  check(entry.description.length <= 240, `description ${entry.description.length} > 240`);
  check(entry.cta.text.length <= 220, `cta.text ${entry.cta.text.length} > 220`);
  check(/[\[\]]/.test(entry.title + entry.metaTitle + entry.metaDescription) === false, 'no brackets in title or meta');
  check(entry.hero === 'jane-eyre-picks', 'hero must be jane-eyre-picks');
  check(entry.category === 'Reading and listening', 'category');
  check(entry.datePublished === '2026-11-13' && entry.dateModified === '2026-11-13', 'dates must be 2026-11-13');
  const order = ['slug', 'hero', 'cta', 'title', 'metaTitle', 'metaDescription', 'description', 'category', 'datePublished', 'dateModified', 'readingTime', 'keywords', 'takeaways', 'faqs'];
  check(JSON.stringify(Object.keys(entry)) === JSON.stringify(order), 'field order differs from the exemplar');
  check(entry.keywords.length === 8, `keywords ${entry.keywords.length} != 8`);
  check(entry.takeaways.length === 5, `takeaways ${entry.takeaways.length} != 5`);
  entry.takeaways.forEach((t, i) => check(words(t) >= 20 && words(t) <= 35, `takeaway ${i + 1} has ${words(t)} words (20 to 35)`));
  check(entry.faqs.length >= 5 && entry.faqs.length <= 7, `faqs ${entry.faqs.length} not in 5..7`);
  entry.faqs.forEach(([q, a], i) => check(words(a) <= 40, `faq ${i + 1} answer has ${words(a)} words (max 40)`));
  // Yes/no questions answer yes or no first; the length question answers with its number first.
  entry.faqs.forEach(([q, a], i) => { if (/^(Is|Do|Does|Can|Are) /.test(q)) check(/^(Yes|No)\./.test(a), `faq ${i + 1} must start with Yes. or No.`); });
  check(/^\d/.test(entry.faqs.find(([q]) => /^How long/.test(q))[1]), 'length FAQ must start with the number');
  check(!/!\[[^\]]*\]\([^)]*jane-eyre-picks/.test(post), 'picks card comes from the registry hero, not post.md');

  // Dashes: none anywhere.
  const all = JSON.stringify(entry);
  check(!dash.test(all), 'en or em dash in entry');
  const dashHit = post.match(new RegExp('.{0,30}' + dash.source + '.{0,30}'));
  check(!dashHit, `en or em dash in post.md: ${dashHit && dashHit[0]}`);
  check(!/ -- /.test(post), 'double hyphen used as a dash in post.md');

  // Banned phrases: owner rules, HushBook negatives, spoilers and both do-not-claim lists.
  const banned = new RegExp([
    'tap any ' + 'word', 'tap a ' + 'word', 'tap the ' + 'word', 'seam' + 'less', 'del' + 've', 'whether you' + '\'re', 'it\'s worth ' + 'noting', 'let\'s ' + 'dive', 'in con' + 'clusion', 'studies ' + 'show',
    'HushBook can' + '\'t', 'HushBook cannot', 'cannot open', 'can\'t open', 'does not open', 'not supported', 'copy-protected', 'DRM-protected', 'e-ink', 'Reader not listed', 'detects characters', 'suggests (names|characters)', 'translates', 'unlimited sync', 'Transcribe on my PC', '\\bMac\\b',
    // Spoilers.
    'Bertha', 'attic', 'Reader, I married', 'married him', 'Mr\\. Mason', 'Madeira', 'inherit', 'fortune', 'wedding', 'Ferndean', 'blind', 'madwoman', 'uncle', 'Rivers[^.|]*cousin', 'cousin[^.|]*Rivers', 'stepbrother', 'terrible secret', 'Jeune encore',
    // Research do-not-claim lists.
    'won an Audie', 'Audie winner', 'won the 2023', '4\\.6 \\(8\\)', '4\\.57', 'Narrator-Juliet', 'playlist', 'channel "Shine"', 'Whispersync', 'only French', 'Thormählen', 'Harris \\(2007\\)', 'Stetz', '211 students', 'October 1847', '19 October', '16 October'
  ].join('|'), 'i');
  const bannedHit = (all + post).match(banned);
  check(!bannedHit, `banned phrase or claim: ${bannedHit && bannedHit[0]}`);
  // Earphones Award is always attributed to Audible.
  [...post.matchAll(/Earphones Award/g)].forEach(m => check(/Audible/.test(post.slice(Math.max(0, m.index - 120), m.index + 80)), 'Earphones Award not attributed to Audible'));
  // Klett's accent is always tied to this book.
  check(/"very creditable" in \*Jane Eyre\*/.test(post), 'Klett accent must be stated as "in Jane Eyre"');
  // Discover card named by title and length.
  check(/"Jane Eyre \(version 3\)", the card that reads 18h 36m/.test(post), 'Discover card title and length missing');
  // French figure with its method.
  check(/346/.test(post) && /under 0\.2%/.test(post) && /about two minutes/.test(post) && /How we counted/.test(post), 'French figure or method missing');
  // "Listen for free" belongs to Stevenson only.
  [...post.matchAll(/Listen for free/g)].forEach(m => check(/Stevenson/.test(post.slice(Math.max(0, m.index - 120), m.index + 20)), '"Listen for free" not tied to Stevenson'));
  // Site consistency: 151 wpm, Wuthering Heights 116,440 words.
  check(/151 words a minute/.test(post) && /116,440/.test(post), 'site figures 151 wpm or 116,440 missing');

  const llms = readFileSync(join(here, 'llms-line.txt'), 'utf8').trim();
  check(llms === `- [${entry.title}](https://hushbook.app/blog/${entry.slug}): ${entry.description}`, 'llms-line.txt does not match title/description');

  const [bodyPart, sourcesPart = ''] = post.split(/\n## Sources\n/);
  check(sourcesPart.length > 0, 'no ## Sources section');

  // Internal links: exactly six, all real, no duplicates.
  const links = [...post.matchAll(/\]\((\/blog\/[^)\s]+)\)/g)].map(m => m[1]);
  links.forEach(l => check(existsSync(join(repo, 'content', 'blog', l.slice(6) + '.md')), `internal link target missing: ${l}`));
  check(links.length === 6, `internal links ${links.length} != 6`);
  check(new Set(links).size === links.length, 'duplicate internal link');
  check(!/\]\(\/(?!blog\/|assets\/)/.test(post), 'internal link outside /blog/');

  // Outbound links in the body all appear under Sources.
  const sourceUrls = [...sourcesPart.matchAll(/\]\((https?:[^)\s]+)\)/g)].map(m => m[1]);
  check(new Set(sourceUrls).size === sourceUrls.length, 'duplicate URL in Sources');
  const bodyUrls = [...bodyPart.matchAll(/\]\((https?:[^)\s]+)\)/g)].map(m => m[1]);
  bodyUrls.forEach(u => check(sourceUrls.includes(u), `body link not in Sources: ${u}`));
  // Every study named in the body is in Sources.
  ['Eells', 'van Zeeland and Schmitt', 'Clinton-Lisell', 'Varao Sousa'].forEach(s => check(sourcesPart.includes(s), `study missing from Sources: ${s}`));

  // Images: exactly four wide images, each the first thing under its own H2, alt at most 250.
  const lines = post.split('\n');
  const imageLines = lines.map((l, i) => [l, i]).filter(([l]) => /^!\[[^\]]*\]\(\/assets\/[^)\s]+ "wide"\)$/.test(l));
  const anyImages = (post.match(/!\[/g) || []).length;
  const images = imageLines.map(([l]) => l.match(/\((\/assets\/[^)\s]+) "wide"\)/)[1]);
  check(images.length === 4 && anyImages === 4, `wide images ${images.length} (all images ${anyImages}) != 4`);
  const wantImages = {
    '/assets/img/blog/jane-eyre-editions.webp': '## Which Jane Eyre audiobook is best?',
    '/assets/img/blog/jane-eyre-length.webp': '## How long is the Jane Eyre audiobook?',
    '/assets/img/blog/jane-eyre-french.webp': '## Do you need to know French to listen to Jane Eyre?',
    '/assets/img/blog/jane-eyre-read-along.webp': '## Is there a Jane Eyre audiobook with text?'
  };
  Object.keys(wantImages).forEach(p => check(images.filter(x => x === p).length === 1, `image ${p} must appear exactly once`));
  const alts = [];
  imageLines.forEach(([l, i]) => {
    let j = i - 1; while (j >= 0 && !lines[j].trim()) j--;
    const src = l.match(/\((\/assets\/[^)\s]+) "wide"\)/)[1];
    check(lines[j] === wantImages[src], `${src} is not directly under "${wantImages[src]}" (found "${lines[j]}")`);
    const alt = l.match(/^!\[([^\]]*)\]/)[1];
    alts.push(alt.length);
    check(alt.length <= 250, `${src} alt text ${alt.length} > 250`);
  });
  const missingImages = images.filter(p => !existsSync(join(repo, p.slice(1))));

  // Tables well formed: header, separator, same cell count on every row.
  const cells = l => l.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').length;
  let tables = 0;
  for (let i = 0; i < lines.length; i++) {
    if (!lines[i].trim().startsWith('|') || (lines[i - 1] || '').trim().startsWith('|')) continue;
    tables++;
    const n = cells(lines[i]);
    check(/^\|(\s*:?-{3,}:?\s*\|)+$/.test((lines[i + 1] || '').trim()), `table at line ${i + 1} has no separator row`);
    check(cells(lines[i + 1] || '') === n, `table at line ${i + 1}: separator has ${cells(lines[i + 1] || '')} cells, header ${n}`);
    for (let k = i + 2; k < lines.length && lines[k].trim().startsWith('|'); k++) check(cells(lines[k]) === n, `table row at line ${k + 1} has ${cells(lines[k])} cells, header ${n}`);
    check(!(lines[i - 1] || '').trim() || i === 0, `table at line ${i + 1} needs a blank line before it`);
  }

  // Structure: H2 order, every H2 but the fixed ones is a question, answer sentence first.
  const h2s = post.match(/^## .+$/gm) || [];
  const wantH2 = [
    '## Which Jane Eyre audiobook is best?',
    '## How long is the Jane Eyre audiobook?',
    '## Thandiwe Newton or Juliet Stevenson: who is the best narrator?',
    '## Is there a free Jane Eyre audiobook?',
    '## Which Jane Eyre audiobooks are abridged or dramatised?',
    '## Do you need to know French to listen to Jane Eyre?',
    '## How do you pronounce Eyre and St. John?',
    '## Who is who in Jane Eyre?',
    '## Is Jane Eyre hard to read?',
    '## What we could not verify',
    '## Is there a Jane Eyre audiobook with text?',
    '## Sources'
  ];
  check(JSON.stringify(h2s) === JSON.stringify(wantH2), `H2 order differs:\n  ${h2s.join('\n  ')}`);
  h2s.filter(h => !/^## (Sources|What we could not verify)$/.test(h)).forEach(h => check(/\?$/.test(h) && (h.match(/\?/g) || []).length === 1, `H2 must be one question: ${h}`));
  // The four pick H3s use the hero card's labels.
  ['### Best overall: ', '### Runner-up: ', '### Best free: ', '### Best to borrow: '].forEach(h => check(post.includes('\n' + h), `pick H3 missing: ${h}`));
  check(post.includes('\n### Every unabridged recording compared\n'), 'comparison table H3 missing');
  ['### Is Thandie Newton the same as Thandiwe Newton?', '### Which LibriVox Jane Eyre should you pick?', '### Is the YouTube Jane Eyre audiobook free?', '### Is the full-cast Jane Eyre the whole book?', '### What does Adèle say?', '### How many characters are called John?', '### Is Jane Eyre longer than Wuthering Heights?', '### Which Jane Eyre audiobook has a British accent?', '### Should you read or listen to Jane Eyre?'].forEach(h => check(post.includes('\n' + h + '\n'), `H3 missing: ${h}`));

  const body = bodyPart.replace(/^# .*\n/, '').replace(/!\[[^\]]*\]\([^)]*\)/g, '');
  const paras = body.trim().split('\n\n');
  // First paragraph: the four picks with running times; second: rating count dated, author line.
  const first = paras[0].split(/(?<=\.)\s/)[0];
  check(words(first) < 25, `first sentence ${words(first)} words (want under 25)`);
  ['Thandiwe Newton', 'Juliet Stevenson', 'Elizabeth Klett', 'Anna Popplewell', '19 hours 10 minutes', '19 hours 13 minutes', '18 hours 36 minutes', '22 hours 51 minutes'].forEach(s => check(paras[0].includes(s), `first paragraph lacks "${s}"`));
  ['22,153', 'as of November 13, 2026', 'Charlotte Brontë', '1847', '"Currer Bell"'].forEach(s => check(paras[1].includes(s), `second paragraph lacks ${s}`));

  // HushBook: one value-first paragraph before the closing H2 (table cells aside), and it is in the French section.
  const closingAt = bodyPart.indexOf('\n## Is there a Jane Eyre audiobook with text?');
  const beforeClosing = bodyPart.slice(0, closingAt);
  const hintParas = beforeClosing.split(/\n\n/).filter(p => /HushBook/.test(p) && !/^\|/.test(p.trim()) && !/^!\[/.test(p.trim()));
  check(hintParas.length === 1, `HushBook paragraphs before the closing H2: ${hintParas.length} (want 1)`);
  const frenchAt = bodyPart.indexOf('\n## Do you need to know French');
  const nextH2 = bodyPart.indexOf('\n## ', frenchAt + 5);
  check(hintParas[0] && bodyPart.indexOf(hintParas[0]) > frenchAt && bodyPart.indexOf(hintParas[0]) < nextH2, 'the HushBook hint must sit in the French section');
  check(/In HushBook, the app we built, you can pair/.test(hintParas[0] || '') && /the app we built/.test(post), 'say we built the app');
  check(/Long-press any line to play from there/.test(bodyPart), 'long-press line missing');
  check(/e-book sync \(in beta, first sync free\)/.test(bodyPart), 'e-book sync wording as in the Wuthering Heights post');

  // Every number in takeaways, FAQ answers, meta, description and cta appears in the body.
  const nums = s => (s.match(/\d[\d,.]*\d|\d/g) || []).map(n => n.replace(/[.,]$/, ''));
  const bodyNums = new Set(nums(body));
  const missingNums = [];
  [...entry.takeaways, ...entry.faqs.map(f => f[1]), entry.metaDescription, entry.description, entry.cta.text].forEach(t => nums(t).forEach(n => { if (!bodyNums.has(n)) missingNums.push(n); }));
  check(!missingNums.length, `numbers not in body: ${[...new Set(missingNums)].join(', ')}`);

  // Words and reading time (body without H1, images and Sources, as the exemplar computes it).
  const bodyWords = body.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[#*|`>_-]+/g, ' ').split(/\s+/).filter(w => /[\p{L}\p{N}]/u.test(w)).length;
  const proseWords = body.split('\n').filter(l => !l.trim().startsWith('|')).join('\n').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[#*|`>_-]+/g, ' ').split(/\s+/).filter(w => /[\p{L}\p{N}]/u.test(w)).length;
  const minutes = Math.round(bodyWords / 220);
  check(entry.readingTime === `${minutes} min read`, `readingTime should be "${minutes} min read" (${bodyWords} words)`);

  const h3 = (post.match(/^### /gm) || []).length;
  const sourceLinks = (sourcesPart.match(/^- \[/gm) || []).length;
  console.log(`title ${entry.title.length}, metaTitle ${entry.metaTitle.length}, metaDescription ${entry.metaDescription.length}, description ${entry.description.length}, cta.heading ${entry.cta.heading.length}, cta.text ${entry.cta.text.length}`);
  console.log(`first sentence ${words(first)} words; alt lengths ${alts.join('/')}`);
  console.log(`body words ${bodyWords} (prose outside tables ${proseWords}), takeaway words ${entry.takeaways.map(words).join('/')}, faq answer words ${entry.faqs.map(f => words(f[1])).join('/')}`);
  console.log(`h2 ${h2s.length} (incl. Sources), h3 ${h3}, tables ${tables}, wide images ${images.length}, source links ${sourceLinks}, body outbound links ${bodyUrls.length}`);
  console.log(`internal links ${links.length}: ${links.join(', ')}`);
  console.log(`images ${images.length}${missingImages.length ? `, not on disk yet: ${missingImages.join(', ')}` : ', all on disk'}`);
  if (fails.length) { console.error('FAIL\n- ' + fails.join('\n- ')); process.exit(1); }
  console.log('OK');
}
