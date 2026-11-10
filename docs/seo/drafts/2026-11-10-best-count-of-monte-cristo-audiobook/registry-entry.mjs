const entry = {
  slug: 'best-count-of-monte-cristo-audiobook',
  cta: { heading: 'See every word of the free recording as it is read', text: 'HushBook finds the free LibriVox recordings of The Count of Monte Cristo and highlights each word as the narrator reads. Free on iPhone, Android and Windows, no account. French names can come out misspelled.' },
  title: 'Best Audiobook Version of The Count of Monte Cristo: Every Unabridged Edition Compared',
  metaTitle: 'Best Count of Monte Cristo Audiobook: Every Edition Compared',
  metaDescription: 'John Lee\'s Blackstone recording is the best paid Count of Monte Cristo audiobook; David Clarke\'s LibriVox reading is the best free one. 17 editions compared.',
  description: 'John Lee\'s Blackstone recording is our paid pick and David Clarke\'s LibriVox reading the free one. Every unabridged edition by runtime and narrator, translations, the 2027 Penguin Audio listing, abridged traps and files you keep.',
  category: 'Reading and listening',
  datePublished: '2026-11-10',
  dateModified: '2026-11-10',
  readingTime: '17 min read',
  keywords: [
    'best count of monte cristo audiobook',
    'best audiobook version of the count of monte cristo',
    'best count of monte cristo audiobook narrator',
    'best unabridged count of monte cristo audiobook',
    'how long is the count of monte cristo audiobook',
    'count of monte cristo audiobook free',
    'count of monte cristo audiobook john lee',
    'count of monte cristo abridged or unabridged'
  ],
  takeaways: [
    'John Lee\'s unabridged Blackstone recording, 46 hours 56 minutes on Audible and winner of the 2009 Audie Award for male solo narration, is our paid pick. Bill Homewood\'s Naxos recording is the runner-up.',
    'The best free version is David Clarke\'s solo LibriVox recording: one voice for all 117 chapters, 54 hours 16 minutes, in the public domain and free to download as MP3 or M4B.',
    'A Penguin Audio recording listed on the Robin Buss translation\'s page is expected on February 11, 2027, with narrator and length unannounced. No commercial audiobook page we read names its translation.',
    'Unabridged recordings run from 43 hours 18 minutes to 57 hours 20 minutes. Naxos\'s abridgement, read by the same narrator as its unabridged recording, keeps about 5% of the running time.',
    'Only the LibriVox files are verifiably free of copy protection. Audible purchases stay in your library after you cancel, but they play only in Audible\'s apps and on supported devices.'
  ],
  faqs: [
    ['Who is the best narrator for The Count of Monte Cristo audiobook?', 'John Lee, on the evidence we could check. His unabridged Blackstone recording won the 2009 Audie Award for male solo narration and runs 46 hours 56 minutes on Audible. Play the sample first.'],
    ['Is there a Robin Buss audiobook of The Count of Monte Cristo?', 'Not yet. Penguin UK lists a Penguin Audio download for February 11, 2027 on the Robin Buss translation\'s page, crediting Buss for the introduction. No narrator or length has been announced.'],
    ['Can I listen to The Count of Monte Cristo audiobook for free?', 'Yes. LibriVox has three finished English recordings in the public domain, free to stream or download. In version 3, David Clarke reads all 117 chapters alone in 54 hours 16 minutes.'],
    ['How many hours is the unabridged Count of Monte Cristo audiobook?', '43 to 57 hours. Richard Matthews\'s recording runs 43 hours 18 minutes, per Penguin Random House, and Alan Munro\'s 57 hours 20 minutes, per Audible. Abridged versions can be under 3 hours.'],
    ['Which translation does the John Lee audiobook use?', 'No page says. Audible, Apple Books and Downpour name no translator for John Lee\'s recording. Only the LibriVox recordings name their text, Project Gutenberg eBook #1184, which itself names no translator.'],
    ['Is the Count of Monte Cristo audiobook on Audible abridged?', 'Both kinds are sold there. Complete recordings run 43 to 57 hours. David Case\'s Tantor recording is abridged at 17 hours 18 minutes, and some listings marked "Unabridged Audiobook" are far shorter.'],
    ['How long does it take to listen to The Count of Monte Cristo?', '47 days at an hour a day for John Lee\'s 46-hour-56-minute recording at 1x, or 32 days at 1.5x. David Clarke\'s free 54-hour recording takes 55 days at 1x.']
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
  const dash = new RegExp("[–—]");

  check(h1 === entry.title, `H1 "${h1}" differs from title`);
  check(entry.title.startsWith('Best Audiobook Version of The Count of Monte Cristo'), 'title must start with the query');
  check(entry.metaTitle.length <= 60, `metaTitle ${entry.metaTitle.length} > 60`);
  check(entry.metaTitle.startsWith('Best Count of Monte Cristo Audiobook'), 'metaTitle must start with the query');
  check(entry.metaDescription.length <= 160, `metaDescription ${entry.metaDescription.length} > 160`);
  check(entry.description.length <= 240, `description ${entry.description.length} > 240`);
  check(entry.cta.text.length <= 220, `cta.text ${entry.cta.text.length} > 220`);
  check(entry.keywords.length === 8, `keywords ${entry.keywords.length} != 8`);
  check(entry.takeaways.length === 5, `takeaways ${entry.takeaways.length} != 5`);
  entry.takeaways.forEach((t, i) => check(words(t) >= 20 && words(t) <= 35, `takeaway ${i + 1} has ${words(t)} words`));
  check(entry.faqs.length >= 6 && entry.faqs.length <= 7, `faqs ${entry.faqs.length} not in 6..7`);
  entry.faqs.forEach(([q, a], i) => {
    check(words(a) >= 25 && words(a) <= 35, `faq ${i + 1} answer has ${words(a)} words (owner's rule: 25 to 35)`);
  });
  check(!('hero' in entry) && !('aside' in entry) && !('compared' in entry), 'no hero, aside or compared field');
  const all = JSON.stringify(entry);
  check(!dash.test(all), 'en or em dash in entry');
  check(!dash.test(post), 'en or em dash in post.md');
  const banned = new RegExp(['focus ' + 'mode', 'focus ' + 'view', 'tap any ' + 'word', 'tap a ' + 'word', 'seam' + 'less', 'A' + 'ZW', 'AA' + 'XC', 'del' + 've', 'whether you' + "'re", 'it\'s worth ' + 'noting', 'let\'s ' + 'dive', 'Chapman', '1996', 'restores passages'].join('|'), 'i');
  const bannedHit = (all + post).match(banned);
  check(!bannedHit, `banned phrase or claim: ${bannedHit && bannedHit[0]}`);
  check(!/Dantes|Mercedes|Haydee/.test(all + post), 'missing accents on Dantès, Mercédès or Haydée');

  const llms = readFileSync(join(here, 'llms-line.txt'), 'utf8').trim();
  check(llms === `- [${entry.title}](https://hushbook.app/blog/${entry.slug}): ${entry.description}`, 'llms-line.txt does not match title/description');

  const links = [...post.matchAll(/\]\((\/(?:blog|alternatives)\/[^)\s]+)\)/g)].map(m => m[1]);
  links.forEach(l => {
    const file = l.startsWith('/blog/') ? join(repo, 'content', 'blog', l.slice(6) + '.md') : join(repo, l.slice(1) + '.html');
    check(existsSync(file), `internal link target missing: ${l}`);
  });
  const images = [...post.matchAll(/!\[[^\]]*\]\((\/assets\/[^)\s]+)/g)].map(m => m[1]);
  const missingImages = images.filter(p => !existsSync(join(repo, p.slice(1))));
  check(images.length === 3, `images ${images.length} != 3`);

  const [bodyPart, sourcesPart = ''] = post.split(/\n## Sources\n/);
  const body = bodyPart.replace(/^# .*\n/, '').replace(/!\[[^\]]*\]\([^)]*\)/g, '');
  const bodyWords = body.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[#*|`>_-]+/g, ' ').split(/\s+/).filter(w => /[A-Za-z0-9]/.test(w)).length;
  const proseWords = body.split('\n').filter(l => !l.trim().startsWith('|')).join('\n').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[#*|`>_-]+/g, ' ').split(/\s+/).filter(w => /[A-Za-z0-9]/.test(w)).length;
  const minutes = Math.round(bodyWords / 220);
  check(entry.readingTime === `${minutes} min read`, `readingTime should be "${minutes} min read" (${bodyWords} words)`);
  const hushbook = (bodyPart.match(/HushBook/g) || []).length;

  const h2 = (post.match(/^## /gm) || []).length;
  const h3 = (post.match(/^### /gm) || []).length;
  const tables = bodyPart.split('\n').filter((l, i, a) => l.trim().startsWith('|') && !(a[i - 1] || '').trim().startsWith('|')).length;
  const sourceLinks = (sourcesPart.match(/^- \[/gm) || []).length;

  console.log(`title ${entry.title.length}, metaTitle ${entry.metaTitle.length}, metaDescription ${entry.metaDescription.length}, description ${entry.description.length}, cta.text ${entry.cta.text.length}`);
  console.log(`body words ${bodyWords} (prose outside tables ${proseWords}), takeaway words ${entry.takeaways.map(words).join('/')}, faq answer words ${entry.faqs.map(f => words(f[1])).join('/')}`);
  console.log(`h2 ${h2} (incl. Sources), h3 ${h3}, tables ${tables}, wide images ${images.length}, source links ${sourceLinks}, "HushBook" mentions in body ${hushbook}`);
  console.log(`internal links ${links.length}: ${links.join(', ')}`);
  console.log(`images ${images.length}${missingImages.length ? `, not on disk yet: ${missingImages.join(', ')}` : ', all on disk'}`);
  if (fails.length) { console.error('FAIL\n- ' + fails.join('\n- ')); process.exit(1); }
  console.log('OK');
}
