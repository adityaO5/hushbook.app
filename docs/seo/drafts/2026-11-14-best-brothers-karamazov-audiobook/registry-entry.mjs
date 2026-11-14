const entry = {
  slug: 'best-brothers-karamazov-audiobook',
  hero: 'brothers-karamazov-picks',
  cta: { heading: 'Read the Grand Inquisitor along with the free recording', text: 'HushBook finds Bruce Pirie\'s free LibriVox reading of The Brothers Karamazov and shows each word in time with his voice, through all 96 chapters. Free on iPhone, Android, Windows and Mac, no account.' },
  title: 'Best Brothers Karamazov Audiobook: Every Translation and Narrator Compared',
  metaTitle: 'Best Brothers Karamazov Audiobook: Narrators by Translation',
  metaDescription: 'Luke Thompson\'s 43 hour 6 minute recording is the best Brothers Karamazov audiobook; Bruce Pirie\'s LibriVox reading is free. Every translation and narrator.',
  description: 'Luke Thompson\'s Penguin recording is our pick, Constantine Gregory\'s the most rated, Bruce Pirie\'s LibriVox reading the free one and Ben Miles\'s the one to borrow. Every recording by translation, the Grand Inquisitor, length and names.',
  category: 'Reading and listening',
  datePublished: '2026-11-14',
  dateModified: '2026-11-14',
  readingTime: '28 min read',
  keywords: [
    'the brothers karamazov audiobook',
    'the brothers karamazov audiobook length',
    'the brothers karamazov audiobook luke thompson',
    'the brothers karamazov audiobook penguin classics',
    'brothers karamazov translations',
    'brothers karamazov pevear and volokhonsky',
    'grand inquisitor chapter brothers karamazov',
    'brothers karamazov names and nicknames'
  ],
  takeaways: [
    'Luke Thompson\'s 2021 Penguin Classics recording of David McDuff\'s translation, 43 hours 6 minutes, is our best overall pick: 4.7 stars from 858 Audible US ratings and 4.9 for performance.',
    'Constantine Gregory\'s Naxos recording, 37 hours 4 minutes, is the most rated, with 5,910 Audible US ratings, and our pick for Constance Garnett\'s translation, which 10 of 13 complete Audible recordings read.',
    'The best free version is Bruce Pirie\'s solo LibriVox reading, 39 hours 38 minutes, titled "The Brothers Karamazov (version 3)"; the other two free recordings share a plain title.',
    'The Grand Inquisitor is Book V, Chapter 5, the longest of the novel\'s 96 chapters: 9,287 words by our count, about 62 minutes at 151 words a minute.',
    'Garnett\'s translation has 349,788 words in 96 chapters by our count: 38 hours 36 minutes at 1x, 30 hours 53 minutes at 1.25x and 25 hours 44 minutes at 1.5x.'
  ],
  faqs: [
    ['What is the best Brothers Karamazov audiobook?', 'Luke Thompson\'s Penguin Classics recording of David McDuff\'s translation, 43 hours 6 minutes, with 4.7 stars from 858 Audible US ratings on November 14, 2026. Constantine Gregory\'s Naxos recording of Garnett\'s translation is the most rated.'],
    ['How long is The Brothers Karamazov audiobook?', '38 hours 36 minutes at 1x for Garnett\'s 349,788 words, by our count at 151 words a minute. Complete Audible recordings run 34 hours 18 minutes to 43 hours 6 minutes; Tony Addison\'s free reading takes 46 hours 25 minutes.'],
    ['Is there a Pevear and Volokhonsky audiobook of The Brothers Karamazov?', 'Yes. Ben Miles reads it unabridged in Macmillan Audio\'s 2024 Bicentennial Edition, 42 hours 16 minutes. It is the only unabridged recording of that translation we found, and hoopla carries it.'],
    ['What chapter is the Grand Inquisitor in?', 'Book V, Chapter 5, the 36th of 96 chapters. It is the longest chapter, 9,287 words by our count, about 62 minutes at 151 words a minute, and starts roughly 12 hours into a complete recording.'],
    ['Is there a free Brothers Karamazov audiobook?', 'Yes. LibriVox has three complete free recordings of Constance Garnett\'s translation: Bruce Pirie\'s solo reading (39 hours 38 minutes), Tony Addison\'s (46 hours 25 minutes) and a 27-reader group reading (37 hours 55 minutes).'],
    ['Which Brothers Karamazov audiobook matches the Penguin Classics edition?', 'Luke Thompson\'s. Penguin publishes it from the same David McDuff translation, and the recording includes McDuff\'s introduction.'],
    ['Is there an audiobook of the Katz or Avsey translation?', 'No. On November 14, 2026 we found none on Audible in four countries, Apple Books, Libby or hoopla. The modern translations on audio are Pevear and Volokhonsky\'s, read by Ben Miles, and McDuff\'s, read by Luke Thompson.']
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
  const query = 'Best Brothers Karamazov Audiobook';

  // Title, meta and registry shape.
  check(h1 === entry.title, `H1 "${h1}" differs from title`);
  check(entry.title.startsWith(query), 'title must start with the query');
  check(entry.metaTitle.startsWith(query + ':'), 'metaTitle must open with the query and a colon');
  check(entry.metaTitle.length >= 50 && entry.metaTitle.length <= 60, `metaTitle ${entry.metaTitle.length} not in 50..60 (under 50 gets " | HushBook")`);
  check(entry.metaDescription.length <= 160, `metaDescription ${entry.metaDescription.length} > 160`);
  check(/^Luke Thompson's 43 hour 6 minute/.test(entry.metaDescription) && /Bruce Pirie's LibriVox reading is free/.test(entry.metaDescription), 'metaDescription must open with the pick and its running time and name the free pick');
  check(entry.description.length <= 240, `description ${entry.description.length} > 240`);
  check(entry.cta.text.length <= 220, `cta.text ${entry.cta.text.length} > 220`);
  check(/iPhone, Android, Windows and Mac/.test(entry.cta.text), 'cta must use the current platform wording');
  check(/[\[\]]/.test(entry.title + entry.metaTitle + entry.metaDescription) === false, 'no brackets in title or meta');
  check(entry.hero === 'brothers-karamazov-picks', 'hero must be brothers-karamazov-picks');
  check(entry.category === 'Reading and listening', 'category');
  check(entry.datePublished === '2026-11-14' && entry.dateModified === '2026-11-14', 'dates must be 2026-11-14');
  const order = ['slug', 'hero', 'cta', 'title', 'metaTitle', 'metaDescription', 'description', 'category', 'datePublished', 'dateModified', 'readingTime', 'keywords', 'takeaways', 'faqs'];
  check(JSON.stringify(Object.keys(entry)) === JSON.stringify(order), 'field order differs from the exemplar');
  check(entry.keywords.length === 8, `keywords ${entry.keywords.length} != 8`);
  check(entry.takeaways.length === 5, `takeaways ${entry.takeaways.length} != 5`);
  entry.takeaways.forEach((t, i) => check(words(t) >= 22 && words(t) <= 32, `takeaway ${i + 1} has ${words(t)} words (22 to 32)`));
  check(entry.faqs.length >= 5 && entry.faqs.length <= 7, `faqs ${entry.faqs.length} not in 5..7`);
  entry.faqs.forEach(([q, a], i) => check(words(a) <= 40, `faq ${i + 1} answer has ${words(a)} words (max 40)`));
  // Yes/no questions answer yes or no first; the length question answers with its number first.
  entry.faqs.forEach(([q, a], i) => { if (/^(Is|Do|Does|Can|Are) /.test(q)) check(/^(Yes|No)\./.test(a), `faq ${i + 1} must start with Yes. or No.`); });
  check(/^\d/.test(entry.faqs.find(([q]) => /^How long/.test(q))[1]), 'length FAQ must start with the number');
  check(!/!\[[^\]]*\]\([^)]*brothers-karamazov-picks/.test(post), 'picks card comes from the registry hero, not post.md');

  // Dashes: none anywhere.
  const all = JSON.stringify(entry);
  check(!dash.test(all), 'en or em dash in entry');
  const dashHit = post.match(new RegExp('.{0,30}' + dash.source + '.{0,30}'));
  check(!dashHit, `en or em dash in post.md: ${dashHit && dashHit[0]}`);
  check(!/ -- /.test(post), 'double hyphen used as a dash in post.md');
  const llmsRaw = readFileSync(join(here, 'llms-line.txt'), 'utf8');
  check(!dash.test(llmsRaw), 'en or em dash in llms-line.txt');

  // Banned phrases: owner rules, HushBook negatives, spoilers, never-mention items and both do-not-claim lists.
  const banned = new RegExp([
    'tap any ' + 'word', 'tap a ' + 'word', 'tap the ' + 'word', 'seam' + 'less', 'del' + 've', 'landscape', 'journey', 'whether you' + '\'re', 'it\'s worth ' + 'noting', 'let\'s ' + 'dive', 'in con' + 'clusion', 'studies ' + 'show',
    'HushBook can' + '\'t', 'HushBook cannot', 'cannot open', 'can\'t open', 'does not open', 'not supported', 'copy-protected', 'DRM-protected', 'e-ink', 'Reader not listed', 'detects characters', 'suggests (names|characters)', 'translates', 'unlimited sync', 'Transcribe on my PC', 'speech recognition (errors|mistakes)', 'misspell',
    // Spoilers: the murder plot, late-book events, titles of Books VIII to XII and the Epilogue chapters.
    'murder', 'killed', 'killer', 'kills', 'parricide', 'trial', 'verdict', 'convict', 'arrest', 'accused', 'suspect', 'Siberia', 'penal', 'brain fever', 'Lizaveta', 'epilep', 'funeral', 'Mokroye', 'three thousand', 'roubles', 'deceased', 'Bedside', 'Preliminary Investigation', 'The Boys', 'Brother Ivan', 'Judicial Error', 'Escape', 'Lie Becomes Truth', 'Speech at the Stone', 'Zossima\'s death', 'Zosima\'s death', 'who did it', 'whodunit',
    // Never mention.
    'Victorian Vault', 'cratediggers', 'compendium', 'loudreader', 'Audible Plus', 'Minerva', '\\bAI\\b',
    // Research do-not-claim lists.
    'won an Audie', 'Audie winner', 'Golden Voice', 'Debra Winger', 'Heartily recommended', 'scrupulous rendition', 'Washington Post', 'deckchair', 'five thousand words', 'most accurate', 'Earphones', 'Whispersync', '1990 recording', 'omits the Grand Inquisitor', 'Thomas Brandon'
  ].join('|'), 'i');
  const bannedHit = (all + post).match(banned);
  check(!bannedHit, `banned phrase or claim: ${bannedHit && bannedHit[0]}`);
  // Accents only with their source.
  [...post.matchAll(/(American|British) voice/g)].forEach(m => check(/We Love Translations/.test(post.slice(m.index, m.index + 120)), `accent without its source: ${m[0]}`));
  check(/English accent is perfect/.test(post) && /Audible quotes AudioFile/.test(post), 'Miles accent must be AudioFile via Audible');
  // The Peery listing: one neutral sentence with the evidence and the public-domain reason.
  const peery = post.split(/\n## Sources\n/)[0].match(/[^.\n]*"Bruce Peery"[^\n]*/g) || [];
  check(peery.length === 1 && /timing check/.test(peery[0]) && /public domain/.test(peery[0]), 'Peery sentence must be the one timing-check sentence');
  // Davidson reads Garnett, stated with evidence.
  check(/Davidson's Blackstone recording reads Garnett, not Pevear and Volokhonsky/.test(post), 'Davidson correction missing');
  // Simon Vance flagged abridged.
  check(/Simon Vance's recording is abridged/.test(post), 'Vance must be flagged abridged');
  // Names table says it carries no spoilers.
  check(/It carries no spoilers/.test(post), 'names table spoiler sentence missing');
  // Discover card named by title and length.
  check(/"The Brothers Karamazov \(version 3\)", the card that reads 39h 38m/.test(post), 'Discover card title and length missing');
  // Grand Inquisitor figures with the method.
  ['9,287', '36th', '30.8%', '12:13:52', '59:15', '14,236', '4,549', '21,761'].forEach(n => check(post.includes(n), `Grand Inquisitor figure missing: ${n}`));
  // Site consistency: 151 wpm, Crime and Punishment 203,197 words, War and Peace 561,870.
  check(/151 words a minute/.test(post) && /203,197/.test(post) && /561,870/.test(post), 'site figures 151 wpm, 203,197 or 561,870 missing');

  const llms = llmsRaw.trim();
  check(llms === `- [${entry.title}](https://hushbook.app/blog/${entry.slug}): ${entry.description}`, 'llms-line.txt does not match title/description');

  const [bodyPart, sourcesPart = ''] = post.split(/\n## Sources\n/);
  check(sourcesPart.length > 0, 'no ## Sources section');

  // Internal links: 5 to 7, all real, no duplicates, the two required ones present.
  const links = [...post.matchAll(/\]\((\/blog\/[^)\s]+)\)/g)].map(m => m[1]);
  links.forEach(l => check(existsSync(join(repo, 'content', 'blog', l.slice(6) + '.md')), `internal link target missing: ${l}`));
  check(links.length >= 5 && links.length <= 7, `internal links ${links.length} not in 5..7`);
  check(new Set(links).size === links.length, 'duplicate internal link');
  ['/blog/best-crime-and-punishment-audiobook', '/blog/best-war-and-peace-audiobook'].forEach(l => check(links.includes(l), `required internal link missing: ${l}`));
  check(!/\]\(\/(?!blog\/|assets\/)/.test(post), 'internal link outside /blog/');

  // Each pick H3 paragraph links its store page.
  const picks = { 'Luke Thompson': 'audible.com/pd/0241533228', 'Constantine Gregory': 'audible.com/pd/B00EZAXAF8', 'Bruce Pirie': 'librivox.org/brothers-karamazov-v3', 'Ben Miles': 'hoopladigital.com/audiobook/the-brothers-karamazov-fyodor-m-dostoevsky/16289312' };
  Object.entries(picks).forEach(([name, url]) => {
    const at = bodyPart.indexOf('\n### ', bodyPart.indexOf(name) - 80);
    const sec = bodyPart.slice(bodyPart.search(new RegExp('\\n### [^\\n]*' + name)), bodyPart.length);
    const end = sec.indexOf('\n### ', 5);
    check((end > 0 ? sec.slice(0, end) : sec).includes(url), `pick ${name} does not link ${url} in its H3`);
  });

  // Outbound links in the body all appear under Sources.
  const sourceUrls = [...sourcesPart.matchAll(/\]\((https?:[^)\s]+)\)/g)].map(m => m[1]);
  check(new Set(sourceUrls).size === sourceUrls.length, 'duplicate URL in Sources');
  const bodyUrls = [...bodyPart.matchAll(/\]\((https?:[^)\s]+)\)/g)].map(m => m[1]);
  bodyUrls.forEach(u => check(sourceUrls.includes(u), `body link not in Sources: ${u}`));
  // Every study, critic source and page quoted in the body is in Sources.
  ['Clinton-Lisell', 'Varao Sousa', 'Feng, D\'Mello and Graesser', 'Soar', 'Remnick', 'PEN America', 'Wikipedia', 'Wiktionary', 'We Love Translations', 'Libro.fm', 'Goodreads', 'Sacrestar'].forEach(s => check(sourcesPart.includes(s), `source missing from Sources: ${s}`));

  // Images: exactly four wide images, each the first thing under its own H2, alt at most 250, no placeholders.
  const lines = post.split('\n');
  const imageLines = lines.map((l, i) => [l, i]).filter(([l]) => /^!\[[^\]]*\]\(\/assets\/[^)\s]+ "wide"\)$/.test(l));
  const anyImages = (post.match(/!\[/g) || []).length;
  const images = imageLines.map(([l]) => l.match(/\((\/assets\/[^)\s]+) "wide"\)/)[1]);
  check(images.length === 4 && anyImages === 4, `wide images ${images.length} (all images ${anyImages}) != 4`);
  const wantImages = {
    '/assets/img/blog/brothers-karamazov-editions.webp': '## Which Brothers Karamazov audiobook is best?',
    '/assets/img/blog/brothers-karamazov-length.webp': '## How long is The Brothers Karamazov audiobook?',
    '/assets/img/blog/brothers-karamazov-grand-inquisitor.webp': '## Where is the Grand Inquisitor in The Brothers Karamazov?',
    '/assets/img/blog/brothers-karamazov-read-along.webp': '## Is there a Brothers Karamazov audiobook with text?'
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
    check(alt.length >= 60 && !/_ALT$/.test(alt), `${src} alt text is a placeholder`);
  });
  const missingImages = images.filter(p => !existsSync(join(repo, p.slice(1))));
  check(!missingImages.length, `images not on disk: ${missingImages.join(', ')}`);
  ['content/blog/embeds/brothers-karamazov-picks.html', 'assets/img/blog/brothers-karamazov-picks.webp', 'assets/img/blog/brothers-karamazov-picks-og.webp'].forEach(p => check(existsSync(join(repo, p)), `hero file not on disk: ${p}`));

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

  // Structure: H2 order, every H2 but the fixed ones is one question, a one-sentence answer first.
  const h2s = post.match(/^## .+$/gm) || [];
  const wantH2 = [
    '## Which Brothers Karamazov audiobook is best?',
    '## Which translation does each Brothers Karamazov audiobook use?',
    '## How long is The Brothers Karamazov audiobook?',
    '## Where is the Grand Inquisitor in The Brothers Karamazov?',
    '## Is there a free Brothers Karamazov audiobook?',
    '## Which Brothers Karamazov audiobooks are abridged or dramatised?',
    '## How do you keep track of the names in The Brothers Karamazov?',
    '## Is The Brothers Karamazov hard to read?',
    '## What we could not verify',
    '## Is there a Brothers Karamazov audiobook with text?',
    '## Sources'
  ];
  check(JSON.stringify(h2s) === JSON.stringify(wantH2), `H2 order differs:\n  ${h2s.join('\n  ')}`);
  h2s.filter(h => !/^## (Sources|What we could not verify)$/.test(h)).forEach(h => check(/\?$/.test(h) && (h.match(/\?/g) || []).length === 1, `H2 must be one question: ${h}`));
  // Answer under each question heading (H2 and H3): the first paragraph that is not an image is one sentence.
  const qHeads = lines.map((l, i) => [l, i]).filter(([l]) => /^#{2,3} .+\?$/.test(l));
  qHeads.forEach(([h, i]) => {
    let k = i + 1;
    while (k < lines.length && (!lines[k].trim() || /^!\[/.test(lines[k]))) k++;
    const para = lines[k] || '';
    check(!/^[|#-]/.test(para), `no answer sentence under "${h}"`);
    const sentences = para.replace(/"[^"]*"/g, "\"\"").split(/(?<=[.!?]["']?)\s+(?=[A-Z*"])/).length;
    check(sentences === 1, `answer under "${h}" has ${sentences} sentences`);
  });
  // The four pick H3s use the hero card's labels, names and runtimes.
  ['### Best overall: Luke Thompson (Penguin Classics, 2021)', '### Most rated: Constantine Gregory (Naxos AudioBooks, 2013)', '### Best free: Bruce Pirie, LibriVox Version 3 (2020)', '### Best to borrow: Ben Miles (Macmillan Audio, 2024)'].forEach(h => check(post.includes('\n' + h + '\n'), `pick H3 missing: ${h}`));
  ['43 hours 6 minutes', '37 hours 4 minutes', '39 hours 38 minutes', '42 hours 16 minutes'].forEach(r => check(post.includes(r), `pick runtime missing: ${r}`));
  check(/pick for Constance Garnett's translation/.test(post) && /also the pick for Pevear and Volokhonsky readers/.test(post) && /no waitlist/.test(post), 'pick texts for Garnett, P&V and hoopla missing');
  check(post.includes('\n### Every unabridged recording compared\n'), 'comparison table H3 missing');
  ['### Which audiobook matches your print edition?', '### Hear the difference', '### How many books and chapters are in The Brothers Karamazov?', '### Is The Brothers Karamazov longer than Crime and Punishment?', '### How long is the Grand Inquisitor on audio?', '### Can you listen to the Grand Inquisitor on its own?', '### How long is the Zosima section?', '### Where is the chapter about Ivan and the devil?', '### Which LibriVox Brothers Karamazov should you pick?', '### Is the YouTube Brothers Karamazov audiobook free?', '### How do you pronounce Karamazov and Alyosha?', '### Should you read or listen to The Brothers Karamazov?'].forEach(h => check(post.includes('\n' + h + '\n'), `H3 missing: ${h}`));
  // Translators people search by name are all covered.
  ['Garnett', 'McDuff', 'Pevear', 'Magarshack', 'Avsey', 'Katz', 'MacAndrew', 'Katzer', 'Matlaw', 'Hallow'].forEach(t => check(post.includes(t), `translator or edition missing: ${t}`));

  const body = bodyPart.replace(/^# .*\n/, '').replace(/!\[[^\]]*\]\([^)]*\)/g, '');
  const paras = body.trim().split('\n\n');
  // First paragraph: the four picks with running times, the pick's rating; second: count dated, author line.
  const first = paras[0].split(/(?<=\.)\s/)[0];
  check(words(first) < 25, `first sentence ${words(first)} words (want under 25)`);
  ['Luke Thompson', 'Constantine Gregory', 'Bruce Pirie', 'Ben Miles', '43 hours 6 minutes', '37 hours 4 minutes', '39 hours 38 minutes', '42 hours 16 minutes', '4.7 stars from 858'].forEach(s => check(paras[0].includes(s), `first paragraph lacks "${s}"`));
  ['5,910', 'as of November 14, 2026', 'Dostoevsky', '1879 and 1880'].forEach(s => check(paras[1].includes(s), `second paragraph lacks ${s}`));

  // HushBook: at most two body spots before the closing H2 (table cells aside); one is the value-first hint in the names section.
  const closingAt = bodyPart.indexOf('\n## Is there a Brothers Karamazov audiobook with text?');
  const beforeClosing = bodyPart.slice(0, closingAt);
  const hintParas = beforeClosing.split(/\n\n/).filter(p => /HushBook/.test(p) && !/^\|/.test(p.trim()) && !/^!\[/.test(p.trim()));
  check(hintParas.length >= 1 && hintParas.length <= 2, `HushBook paragraphs before the closing H2: ${hintParas.length} (want 1 or 2)`);
  const namesAt = bodyPart.indexOf('\n## How do you keep track of the names');
  const namesEnd = bodyPart.indexOf('\n## ', namesAt + 5);
  check(hintParas.some(p => bodyPart.indexOf(p) > namesAt && bodyPart.indexOf(p) < namesEnd), 'the HushBook hint must sit in the names section');
  check(/that is why we built HushBook/.test(post), 'say we built the app');
  check(/Long-press any line to play from there/.test(bodyPart), 'long-press line missing');
  check(/e-book sync \(in beta, first sync free\)/.test(bodyPart), 'e-book sync wording as in the Jane Eyre post');
  check(/iPhone, Android, Windows and Mac/.test(bodyPart) && /macOS 14 or later/.test(bodyPart), 'current platform wording missing');

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
