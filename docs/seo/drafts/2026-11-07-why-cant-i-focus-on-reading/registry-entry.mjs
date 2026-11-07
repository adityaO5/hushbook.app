const entry = {
  slug: 'why-cant-i-focus-on-reading',
  cta: { heading: 'Give your eyes a place to be', text: 'With the audiobook playing, HushBook underlines each word as the narrator says it and turns the page for you. Drift off, and a long press on the line you missed plays it again. Free LibriVox classics are built in. No account, no ads.' },
  title: 'Why Can\'t I Focus on Reading Anymore? Causes and What Helps',
  metaTitle: 'Why Can\'t I Focus on Reading Anymore? What Actually Helps',
  metaDescription: 'Usually tiredness, stress, notifications or a book that is too hard for now. Shorter sittings, an easier book and reading along with the audiobook help.',
  description: 'You usually can\'t focus on reading because you are tired or stressed, notifications interrupt, or the book is too hard for now. What phone research really found, when to see a doctor, reading slumps and nine things that help.',
  category: 'Reading and listening',
  datePublished: '2026-11-08',
  dateModified: '2026-11-08',
  readingTime: '14 min read',
  keywords: [
    'why can\'t i focus on reading anymore',
    'why can\'t i focus when i read',
    'can\'t focus on reading anymore',
    'suddenly can\'t focus on reading',
    'what to do when you can\'t focus on reading',
    'eyes can\'t focus when reading',
    'adhd can\'t focus on reading',
    'how to get out of a reading slump'
  ],
  takeaways: [
    'You usually can\'t focus on reading because you are tired or stressed, notifications interrupt, or the book is too hard. In a 2013 study of 211 students, minds wandered at 35.6% of silent-reading check-ins.',
    'The eight-second goldfish attention span has no traceable source, and a 2024 meta-analysis of 33 studies found no effect from a phone merely sitting nearby. Notifications did disrupt attention in a 2015 lab study.',
    'See a doctor or optometrist if the trouble started suddenly, comes with low mood or constant worry, or print blurs up close. NIMH says ADHD symptoms must begin before age 12.',
    'The best-supported fixes are simple: shorter sittings, an easier or shorter book, and notifications off. Of 18,824 English LibriVox recordings we counted on November 7, 2026, 37.4% run under three hours.',
    'Reading along lets a narrator set the pace, but no study has measured whether it reduces mind wandering. Narrators read at a median 151 words a minute, against 238 to 260 for silent reading.'
  ],
  faqs: [
    ['Why can\'t I focus on reading but I can focus on other things?', 'Two reasons. A book only moves when you move it, and your eyes can keep scanning after your mind leaves. In a 2013 study of 211 students, minds wandered at 35.6% of check-ins during silent reading.'],
    ['Is not being able to focus on reading a sign of ADHD?', 'No, not by itself. NIMH says ADHD symptoms must begin before age 12 and show in two or more settings. Focus trouble that started recently in adulthood has many other causes, such as sleep, stress, mood or eyesight.'],
    ['Can anxiety or depression make it hard to concentrate on reading?', 'Yes. NIMH lists difficulty concentrating as a symptom of depression, lasting at least 2 weeks, and of generalized anxiety disorder, lasting at least 6 months. If that sounds like you, talk to a doctor first.'],
    ['Why can\'t my eyes focus when I read?', 'Two common reasons. After about 40, presbyopia makes you hold print farther away to see it, says the American Academy of Ophthalmology. Convergence insufficiency can make words seem to move or float. An optometrist can check both.'],
    ['Is it okay to stop reading a book I\'m not enjoying?', 'Yes. In a 2013 Goodreads survey, "slow, boring" was the top reason for putting a book down. In Jellybooks\' reading tests, a book that 25% to 50% of readers finish counts as a good result. Quitting is normal.'],
    ['Do audiobooks count as reading if I can\'t focus on print?', 'Yes. The American Time Use Survey counts listening to audiobooks as reading. If audio gets you through a book, it counts, and reading along with the text gives your eyes something to follow too.']
  ]
};

export default entry;

// Self-check: node registry-entry.mjs
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const here = dirname(fileURLToPath(import.meta.url));
  const post = readFileSync(join(here, 'post.md'), 'utf8');
  const h1 = post.match(/^# (.+)$/m)[1];
  const words = s => s.trim().split(/\s+/).length;
  const fails = [];
  const check = (ok, msg) => { if (!ok) fails.push(msg); };
  const dash = new RegExp("[\u2013\u2014]");

  check(h1 === entry.title, `H1 "${h1}" differs from title`);
  check(entry.metaTitle.length <= 60, `metaTitle ${entry.metaTitle.length} > 60`);
  check(entry.metaTitle.startsWith('Why Can\'t I Focus on Reading Anymore?'), 'metaTitle must start with the query');
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
  check(!/focus mode|focus view|tap any word/i.test(all + post), 'banned product claim');

  const body = post.split(/\n## Sources\n/)[0].replace(/^# .*\n/, '').replace(/!\[[^\]]*\]\([^)]*\)/g, '');
  const bodyWords = body.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[#*|`>_-]+/g, ' ').split(/\s+/).filter(w => /[A-Za-z0-9]/.test(w)).length;
  const minutes = Math.round(bodyWords / 220);
  check(entry.readingTime === `${minutes} min read`, `readingTime should be "${minutes} min read" (${bodyWords} words)`);

  console.log(`title ${entry.title.length}, metaTitle ${entry.metaTitle.length}, metaDescription ${entry.metaDescription.length}, description ${entry.description.length}, cta.text ${entry.cta.text.length}`);
  console.log(`body words ${bodyWords}, takeaway words ${entry.takeaways.map(words).join('/')}, faq answer words ${entry.faqs.map(f => words(f[1])).join('/')}`);
  if (fails.length) { console.error('FAIL\n- ' + fails.join('\n- ')); process.exit(1); }
  console.log('OK');
}
