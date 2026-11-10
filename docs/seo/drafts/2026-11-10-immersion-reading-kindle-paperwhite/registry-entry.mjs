const entry = {
  slug: 'immersion-reading-kindle-paperwhite',
  cta: { heading: 'See every word as the narrator reads it', text: 'No Kindle e-reader highlights words with the narration. HushBook does, for audiobook files you own and free public domain classics, on iPhone, Android and Windows. Free, with no account. It cannot open Kindle or Audible books.' },
  title: 'Does Kindle Paperwhite Support Immersion Reading? Every Kindle, Checked',
  metaTitle: 'Does Kindle Paperwhite Support Immersion Reading? By Model',
  metaDescription: 'No. No Kindle e-reader highlights words with Audible narration. Immersion Reading works on Fire tablets and in the Kindle and Audible apps. Every model checked.',
  description: 'No Kindle e-reader, Paperwhite included, does Immersion Reading. A table for every model and app, how switching works on a Paperwhite, where words do light up, PC and Mac, troubleshooting, and what research says about reading along.',
  category: 'Read-along guides',
  datePublished: '2026-11-10',
  dateModified: '2026-11-10',
  readingTime: '19 min read',
  keywords: [
    'immersion reading kindle paperwhite',
    'can you do immersion reading on kindle paperwhite',
    'which kindle has immersion reading',
    'immersion reading kindle paperwhite 12th generation',
    'whispersync kindle paperwhite',
    'how to use whispersync on kindle paperwhite',
    'kindle immersion reading not working',
    'audible read and listen on pc'
  ],
  takeaways: [
    'No Kindle e-reader does Immersion Reading. Every Kindle Paperwhite, Colorsoft, Scribe, Oasis and basic Kindle plays Audible over Bluetooth and switches between reading and listening, but none highlights words with the narration.',
    'Amazon lists Immersion Reading only for the Kindle apps on iOS and Android and for Fire tablets. Audible lists its own apps on iPhone, iPad, Android, Fire tablets and macOS.',
    'On a Kindle Paperwhite, Read & Listen, formerly Whispersync for Voice, means switching: tap the headphone icon to hear the audiobook from your page, then switch back to the ebook at the same spot.',
    'There is no documented Immersion Reading on a Windows PC. Amazon stopped supporting Kindle for PC on June 30, 2026, and Audible discontinued its Windows app. On a Mac, use the Audible app.',
    'Reading along beats listening alone, but a 2023 meta-analysis of 30 studies found only a trivial gain over reading alone (g = 0.18), and no study shows the word highlighting itself helps.'
  ],
  faqs: [
    ['Does the 2026 Kindle Paperwhite have immersion reading?', 'No. Amazon\'s user guides for the 2026 Kindle Paperwhite and its Signature Edition describe Audible playback, switching to listening and Assistive Reader, but never mention Immersion Reading.'],
    ['Does Kindle Unlimited include immersion reading?', 'Yes, for some titles. Kindle+, the new name for Kindle Unlimited, includes companion audiobooks for thousands of eBooks. Words are highlighted in the Kindle app on a phone or Fire tablet, not on an e-ink Kindle.'],
    ['Is immersion reading free?', 'No. You need both the Kindle eBook and the Audible audiobook, often sold as a discounted add-on, or a Kindle+ title with audio at $11.99 a month in the US. Kindle+ is not part of Prime.'],
    ['Does immersion reading work offline?', 'No, not fully in the Audible app. Audible says the ebook text loads from the internet, though some pages are saved so you can still see them without a connection.'],
    ['Can I listen to Audible on a Kindle Paperwhite without headphones?', 'No. Amazon says you must first pair a Bluetooth audio device, such as headphones, speakers or earbuds, to listen to Audible books on a Kindle. A Bluetooth speaker plays the book out loud.'],
    ['Is there a better alternative to Immersion Reading on Kindle?', 'No, not on the Kindle itself. For audiobook files you own and free classics, HushBook highlights each word as the narrator reads, free on iPhone, Android and Windows. HushBook cannot open Kindle or Audible books.']
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
  const dash = new RegExp('[–—]');
  const query = 'Does Kindle Paperwhite Support Immersion Reading?';

  check(h1 === entry.title, `H1 "${h1}" differs from title`);
  check(entry.title.startsWith(query), 'title must start with the query');
  check(entry.metaTitle.length <= 60, `metaTitle ${entry.metaTitle.length} > 60`);
  check(entry.metaTitle.startsWith(query), 'metaTitle must start with the query');
  check(entry.metaDescription.length <= 160, `metaDescription ${entry.metaDescription.length} > 160`);
  check(entry.description.length <= 240, `description ${entry.description.length} > 240`);
  check(entry.keywords.length === 8, `keywords ${entry.keywords.length} != 8`);
  check(entry.takeaways.length === 5, `takeaways ${entry.takeaways.length} != 5`);
  entry.takeaways.forEach((t, i) => check(words(t) >= 20 && words(t) <= 35, `takeaway ${i + 1} has ${words(t)} words`));
  check(entry.faqs.length === 6, `faqs ${entry.faqs.length} != 6`);
  entry.faqs.forEach(([q, a], i) => {
    check(words(a) <= 40, `faq ${i + 1} answer has ${words(a)} words`);
    check(/^(Yes|No|One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten|\d)/.test(a), `faq ${i + 1} answer must start with yes, no or a number`);
  });
  check(!entry.hero && !entry.aside, 'hero/aside must not be set');

  // Sentence one under 25 words.
  const first = post.split('\n').find(l => l.trim() && !l.startsWith('#'));
  check(words(first) < 25, `first sentence has ${words(first)} words`);

  const all = JSON.stringify(entry);
  check(!dash.test(all), 'en or em dash in entry');
  check(!dash.test(post), 'en or em dash in post.md');
  const llms = readFileSync(join(here, 'llms-line.txt'), 'utf8').trim();
  check(!dash.test(llms), 'en or em dash in llms-line.txt');
  const banned = new RegExp(['focus ' + 'mode', 'focus ' + 'view', 'tap any ' + 'word', 'tap a ' + 'word', 'seam' + 'less', 'better than ' + 'kindle', 'sync with ' + 'e-book'].join('|'), 'i');
  check(!banned.test(all + post), 'banned product claim');
  check((post.match(/we built/gi) || []).length === 1, '"we built" must appear exactly once');

  check(llms === `- [${entry.title}](https://hushbook.app/blog/${entry.slug}): ${entry.description}`, 'llms-line.txt does not match title/description');

  const links = [...post.matchAll(/\]\((\/(?:blog|alternatives)\/[^)\s]+|\/desktop)\)/g)].map(m => m[1]);
  links.forEach(l => {
    const file = l.startsWith('/blog/') ? join(repo, 'content', 'blog', l.slice(6) + '.md') : join(repo, l.slice(1) + '.html');
    check(existsSync(file), `internal link target missing: ${l}`);
  });
  const images = [...post.matchAll(/!\[[^\]]*\]\((\/assets\/[^)\s]+) "wide"\)/g)].map(m => m[1]);
  check(images.length === 3 && new Set(images).size === 3, `expected 3 distinct wide images, found ${images.length}`);
  const missingImages = images.filter(p => !existsSync(join(repo, p.slice(1))));

  const body = post.split(/\n## Sources\n/)[0].replace(/^# .*\n/, '').replace(/!\[[^\]]*\]\([^)]*\)/g, '');
  const bodyWords = body.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[#*|`>_-]+/g, ' ').split(/\s+/).filter(w => /[A-Za-z0-9]/.test(w)).length;
  const minutes = Math.round(bodyWords / 220);
  check(entry.readingTime === `${minutes} min read`, `readingTime should be "${minutes} min read" (${bodyWords} words)`);

  const h2 = [...post.matchAll(/^## (.+)$/gm)].map(m => m[1]);
  const h3 = [...post.matchAll(/^### (.+)$/gm)].length;

  console.log(`title ${entry.title.length}, metaTitle ${entry.metaTitle.length}, metaDescription ${entry.metaDescription.length}, description ${entry.description.length}, cta.text ${entry.cta.text.length}`);
  console.log(`first sentence ${words(first)} words; body words ${bodyWords}; takeaway words ${entry.takeaways.map(words).join('/')}; faq answer words ${entry.faqs.map(f => words(f[1])).join('/')}`);
  console.log(`h2 ${h2.length} (incl. Sources), h3 ${h3}`);
  console.log(`internal links ${links.length}: ${links.join(', ')}`);
  console.log(`images ${images.length}${missingImages.length ? `, not on disk yet: ${missingImages.join(', ')}` : ', all on disk'}`);
  if (fails.length) { console.error('FAIL\n- ' + fails.join('\n- ')); process.exit(1); }
  console.log('OK');
}
