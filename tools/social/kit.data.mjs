// Social upload kit: one entry per book post, newest first.
// Every fact here is already in that post's registry entry (data/blog-posts.js).
// `x` must fit in 280 characters with the link counted as 23 (kit.mjs checks it).

const link = (slug) => `https://hushbook.app/blog/${slug}`;

export default [
  {
    folder: 'Jane Eyre',
    slug: 'best-jane-eyre-audiobook',
    card: 'assets/img/blog/jane-eyre-picks.webp',
    caption: `Today's audiobook pick: Jane Eyre 🎧

Best overall: Thandiwe Newton, 19 h 10 min
Best free: Elizabeth Klett on LibriVox, 18 h 36 min

Good to know
• 20 h 33 min at 1x. 13 h 42 min at 1.5x.
• Only about 2 minutes of it is in French.
• St. John is said "SIN-jin".

Every narrator compared:
${link('best-jane-eyre-audiobook')}

#JaneEyre #CharlotteBronte #audiobooks #classicbooks`,
    x: `Today's audiobook pick: Jane Eyre 🎧

Best overall: Thandiwe Newton (19 h 10 min)
Best free: Elizabeth Klett on LibriVox

Only about 2 minutes of it is in French, and St. John is said "SIN-jin".

${link('best-jane-eyre-audiobook')}`,
  },
  {
    folder: 'Pride and Prejudice',
    slug: 'best-pride-and-prejudice-audiobook',
    card: 'assets/img/blog/pride-and-prejudice-picks.webp',
    caption: `Today's audiobook pick: Pride and Prejudice 🎧

Best overall: Rosamund Pike, 11 h 35 min
Best free: Karen Savage on LibriVox, 10 h 23 min

Good to know
• 13 h 26 min at 1x. 8 h 57 min at 1.5x.
• Audible's 2025 full-cast version is a 4 h 34 min adaptation, not the whole novel.
• Juliet Stevenson has two under one title: 14 h 2 min complete, 2 h 47 min abridged.

Every narrator compared:
${link('best-pride-and-prejudice-audiobook')}

#PrideAndPrejudice #JaneAusten #audiobooks #classicbooks`,
    x: `Today's audiobook pick: Pride and Prejudice 🎧

Best overall: Rosamund Pike (11 h 35 min)
Best free: Karen Savage on LibriVox

Audible's 2025 full-cast version is a 4 h 34 min adaptation, not the whole novel.

${link('best-pride-and-prejudice-audiobook')}`,
  },
  {
    folder: 'Wuthering Heights',
    slug: 'best-wuthering-heights-audiobook',
    card: 'assets/img/blog/wuthering-heights-picks.webp',
    caption: `Today's audiobook pick: Wuthering Heights 🎧

Best overall: Joanne Froggatt, 12 h 32 min
Best free: Ruth Golding on LibriVox, 14 h 49 min

Good to know
• 12 h 51 min at 1x. 8 h 34 min at 1.5x.
• Joseph's Yorkshire dialect is only about 12 minutes of the book.
• Want two voices? Janet McTeer and David Timson, Naxos.

Every narrator compared:
${link('best-wuthering-heights-audiobook')}

#WutheringHeights #EmilyBronte #audiobooks #classicbooks`,
    x: `Today's audiobook pick: Wuthering Heights 🎧

Best overall: Joanne Froggatt (12 h 32 min)
Best free: Ruth Golding on LibriVox

Joseph's Yorkshire dialect is only about 12 minutes of the book.

${link('best-wuthering-heights-audiobook')}`,
  },
  {
    folder: 'War and Peace',
    slug: 'best-war-and-peace-audiobook',
    card: 'assets/img/blog/war-and-peace-audiobook-picks.webp',
    caption: `Today's audiobook pick: War and Peace 🎧

Best overall: Thandiwe Newton, 60 h 14 min
Best free: Mark Nelson on LibriVox, 62 h 27 min

Good to know
• 62 h at 1x. 41 h 21 min at 1.5x. 31 h at 2x.
• 365 chapters: one a day takes a year.
• One modern translation on audio: Anthony Briggs's, from Penguin Classics.

Every translation and narrator compared:
${link('best-war-and-peace-audiobook')}

#WarAndPeace #Tolstoy #audiobooks #classicbooks`,
    x: `Today's audiobook pick: War and Peace 🎧

Best overall: Thandiwe Newton (60 h 14 min), a 2023 Audie winner
Best free: Mark Nelson on LibriVox

365 chapters: one a day takes a year.

${link('best-war-and-peace-audiobook')}`,
  },
  {
    folder: 'Crime and Punishment',
    slug: 'best-crime-and-punishment-audiobook',
    card: 'assets/img/blog/crime-and-punishment-audiobook-picks.webp',
    caption: `Today's audiobook pick: Crime and Punishment 🎧

Best overall: Anthony Heald, 20 h 28 min
Best free: Mark Nelson on LibriVox, 22 h 2 min

Good to know
• 22 h 26 min at 1x. 14 h 57 min at 1.5x.
• Heald, Will Poulter and George Guidall all read the same translation: Constance Garnett's.
• Want a modern one? Don Warrington reads Oliver Ready's.

Every translation and narrator compared:
${link('best-crime-and-punishment-audiobook')}

#CrimeAndPunishment #Dostoevsky #audiobooks #classicbooks`,
    x: `Today's audiobook pick: Crime and Punishment 🎧

Best overall: Anthony Heald (20 h 28 min)
Best free: Mark Nelson on LibriVox

Most editions read the same translation: Constance Garnett's.

${link('best-crime-and-punishment-audiobook')}`,
  },
];
