const entry = {
  slug: 'can-kindle-read-to-you',
  cta: { heading: 'Hear a narrator and see every word', text: 'A computer voice is free, but a human narrator usually means a second purchase. HushBook highlights each word as a recorded narrator says it, in free public domain classics or audio files you own. No ads, no account.' },
  title: 'Can Kindle Read to You? How to Make Kindle Read Aloud, by Device',
  metaTitle: 'Can Kindle Read to You? How to Make Kindle Read Aloud',
  metaDescription: 'Yes. Assistive Reader reads Kindle books aloud free in a computer voice, in the Kindle app and on newer Kindles. Steps by device, Alexa, voice and narration.',
  description: 'Yes. Assistive Reader reads Kindle books aloud for free in the Kindle app and on newer Kindles over Bluetooth. Steps for each device, Alexa and Alexa+, PC and Mac, voice and speed, why some books won\'t read, and the human-narrated route.',
  category: 'Read-along guides',
  datePublished: '2026-11-09',
  dateModified: '2026-11-09',
  readingTime: '16 min read',
  keywords: [
    'can kindle read to you',
    'how to make kindle read to you',
    'kindle read aloud iphone',
    'kindle read aloud android',
    'kindle text to speech',
    'kindle assistive reader not working',
    'how to listen to kindle books for free',
    'how to listen to kindle books without audible'
  ],
  takeaways: [
    'Yes. Assistive Reader, a free feature of the Kindle app on iPhone, iPad, Android, Mac and Fire tablets, reads eligible books in your device\'s text-to-speech voice and highlights the words.',
    'Kindle e-readers from the 11th generation on, Kindle Scribe and Kindle Colorsoft have Assistive Reader in five languages, with sound through Bluetooth headphones or a speaker. Older Kindles have VoiceView.',
    'Books need Enhanced Typesetting and must come from the Kindle store, Kindle+, Prime Reading, an official Kindle partner or Family Library. Amazon does not list public library loans.',
    'Alexa reads Kindle books on the original Alexa only. Amazon says Kindle Assistive Reader isn\'t available on Alexa+, which US Prime members have had at no extra cost since February 2026.',
    'A human narrator costs extra: add the Audible audiobook at a discount, or borrow a Kindle+ title with audio. In a 2023 study, listeners enjoyed and remembered stories more with a human voice.'
  ],
  faqs: [
    ['Can Kindle Unlimited books read to you?', 'Yes. Assistive Reader reads books borrowed from Kindle+, the new name for Kindle Unlimited, if they have Enhanced Typesetting. For a human narrator, borrow a Kindle+ title labeled "Books with Audio" and you get the audiobook too.'],
    ['Can Kindle read PDFs aloud?', 'No, not as far as Amazon documents. Assistive Reader works with Enhanced Typesetting books from the Kindle store, Kindle+, Prime Reading, official partners or Family Library. Amazon does not list PDFs or other files you add yourself.'],
    ['Can a Kindle read out loud without headphones?', 'Yes, in the Kindle app on a phone, tablet or computer. A Kindle e-reader plays sound over Bluetooth, so pair a Bluetooth speaker if you want the book read out loud in the room.'],
    ['Is there a monthly fee for Kindle?', 'No. The Kindle app is free, and Assistive Reader, VoiceView and Alexa reading cost nothing extra. Kindle+, at $11.99 a month in the US, and Audible narration are optional paid extras.'],
    ['Can Alexa read my Kindle books?', 'Yes, on the original Alexa. Ask Alexa to read a book by its title, then pause, skip chapters or change the speed by voice. Amazon says Kindle Assistive Reader isn\'t available on Alexa+.'],
    ['Can you change the Kindle Assistive Reader voice?', 'No, not inside the Kindle app. Amazon says Assistive Reader uses your device\'s own text-to-speech engine, so the voice comes from your phone, tablet or computer settings. Amazon does not say which setting.']
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
  const dash = new RegExp("[\u2013\u2014]");

  check(h1 === entry.title, `H1 "${h1}" differs from title`);
  check(entry.title.startsWith('Can Kindle Read to You?'), 'title must start with the query');
  check(entry.metaTitle.length <= 60, `metaTitle ${entry.metaTitle.length} > 60`);
  check(entry.metaTitle.startsWith('Can Kindle Read to You?'), 'metaTitle must start with the query');
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
  const all = JSON.stringify(entry);
  check(!dash.test(all), 'en or em dash in entry');
  check(!dash.test(post), 'en or em dash in post.md');
  const banned = new RegExp(['focus ' + 'mode', 'focus ' + 'view', 'tap any ' + 'word', 'seam' + 'less', 'A' + 'ZW'].join('|'), 'i');
  check(!banned.test(all + post), 'banned product claim');

  const llms = readFileSync(join(here, 'llms-line.txt'), 'utf8').trim();
  check(llms === `- [${entry.title}](https://hushbook.app/blog/${entry.slug}): ${entry.description}`, 'llms-line.txt does not match title/description');

  const links = [...post.matchAll(/\]\((\/(?:blog|alternatives)\/[^)\s]+)\)/g)].map(m => m[1]);
  links.forEach(l => {
    const file = l.startsWith('/blog/') ? join(repo, 'content', 'blog', l.slice(6) + '.md') : join(repo, l.slice(1) + '.html');
    check(existsSync(file), `internal link target missing: ${l}`);
  });
  const images = [...post.matchAll(/!\[[^\]]*\]\((\/assets\/[^)\s]+)/g)].map(m => m[1]);
  const missingImages = images.filter(p => !existsSync(join(repo, p.slice(1))));

  const body = post.split(/\n## Sources\n/)[0].replace(/^# .*\n/, '').replace(/!\[[^\]]*\]\([^)]*\)/g, '');
  const bodyWords = body.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[#*|`>_-]+/g, ' ').split(/\s+/).filter(w => /[A-Za-z0-9]/.test(w)).length;
  const minutes = Math.round(bodyWords / 220);
  check(entry.readingTime === `${minutes} min read`, `readingTime should be "${minutes} min read" (${bodyWords} words)`);

  console.log(`title ${entry.title.length}, metaTitle ${entry.metaTitle.length}, metaDescription ${entry.metaDescription.length}, description ${entry.description.length}, cta.text ${entry.cta.text.length}`);
  console.log(`body words ${bodyWords}, takeaway words ${entry.takeaways.map(words).join('/')}, faq answer words ${entry.faqs.map(f => words(f[1])).join('/')}`);
  console.log(`internal links ${links.length}: ${links.join(', ')}`);
  console.log(`images ${images.length}${missingImages.length ? `, not on disk yet: ${missingImages.join(', ')}` : ', all on disk'}`);
  if (fails.length) { console.error('FAIL\n- ' + fails.join('\n- ')); process.exit(1); }
  console.log('OK');
}
