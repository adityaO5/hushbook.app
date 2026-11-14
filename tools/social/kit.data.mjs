// Social upload kit: one entry per book post, newest first.
// Every fact here is already in that post's registry entry (data/blog-posts.js).
// `x` must fit in 280 characters with the link counted as 23 (kit.mjs checks it).

const link = (slug) => `https://hushbook.app/blog/${slug}`;

export default [
  {
    folder: 'Brothers Karamazov',
    slug: 'best-brothers-karamazov-audiobook',
    card: 'assets/img/blog/brothers-karamazov-picks-v2.webp',
    caption: `Today's audiobook pick: The Brothers Karamazov 🎧

Best free: Bruce Pirie in the HushBook app, 39 h 38 min
Best overall: Luke Thompson, 43 h 6 min

Good to know
• 38 h 36 min at 1x. 25 h 44 min at 1.5x.
• The Grand Inquisitor, Book V, Chapter 5, is the longest of its 96 chapters: about 62 minutes.
• Luke Thompson reads David McDuff's translation; Ben Miles reads Pevear and Volokhonsky's.

Every translation and narrator compared:
${link('best-brothers-karamazov-audiobook')}

#BrothersKaramazov #Dostoevsky #audiobooks #classicbooks`,
    x: `Today's audiobook pick: The Brothers Karamazov 🎧

Best free: Bruce Pirie in the HushBook app
Best overall: Luke Thompson (43 h 6 min)

The Grand Inquisitor, Book V, Chapter 5, is the novel's longest chapter: about 62 minutes.

${link('best-brothers-karamazov-audiobook')}`,
  },
  {
    folder: 'Jane Eyre',
    slug: 'best-jane-eyre-audiobook',
    card: 'assets/img/blog/jane-eyre-picks-v2.webp',
    caption: `Today's audiobook pick: Jane Eyre 🎧

Best free: Elizabeth Klett in the HushBook app, 18 h 36 min
Best overall: Thandiwe Newton, 19 h 10 min

Good to know
• 20 h 33 min at 1x. 13 h 42 min at 1.5x.
• Only about 2 minutes of it is in French.
• St. John is said "SIN-jin".

Every narrator compared:
${link('best-jane-eyre-audiobook')}

#JaneEyre #CharlotteBronte #audiobooks #classicbooks`,
    x: `Today's audiobook pick: Jane Eyre 🎧

Best free: Elizabeth Klett in the HushBook app
Best overall: Thandiwe Newton (19 h 10 min)

Only about 2 minutes of it is in French, and St. John is said "SIN-jin".

${link('best-jane-eyre-audiobook')}`,
  },
  {
    folder: 'Pride and Prejudice',
    slug: 'best-pride-and-prejudice-audiobook',
    card: 'assets/img/blog/pride-and-prejudice-picks-v2.webp',
    caption: `Today's audiobook pick: Pride and Prejudice 🎧

Best free: Karen Savage in the HushBook app, 10 h 23 min
Best overall: Rosamund Pike, 11 h 35 min

Good to know
• 13 h 26 min at 1x. 8 h 57 min at 1.5x.
• Audible's 2025 full-cast version is a 4 h 34 min adaptation, not the whole novel.
• Juliet Stevenson has two under one title: 14 h 2 min complete, 2 h 47 min abridged.

Every narrator compared:
${link('best-pride-and-prejudice-audiobook')}

#PrideAndPrejudice #JaneAusten #audiobooks #classicbooks`,
    x: `Today's audiobook pick: Pride and Prejudice 🎧

Best free: Karen Savage in the HushBook app
Best overall: Rosamund Pike (11 h 35 min)

Audible's 2025 full-cast version is a 4 h 34 min adaptation, not the whole novel.

${link('best-pride-and-prejudice-audiobook')}`,
  },
  {
    folder: 'Wuthering Heights',
    slug: 'best-wuthering-heights-audiobook',
    card: 'assets/img/blog/wuthering-heights-picks-v2.webp',
    caption: `Today's audiobook pick: Wuthering Heights 🎧

Best free: Ruth Golding in the HushBook app, 14 h 49 min
Best overall: Joanne Froggatt, 12 h 32 min

Good to know
• 12 h 51 min at 1x. 8 h 34 min at 1.5x.
• Joseph's Yorkshire dialect is only about 12 minutes of the book.
• Want two voices? Janet McTeer and David Timson, Naxos.

Every narrator compared:
${link('best-wuthering-heights-audiobook')}

#WutheringHeights #EmilyBronte #audiobooks #classicbooks`,
    x: `Today's audiobook pick: Wuthering Heights 🎧

Best free: Ruth Golding in the HushBook app
Best overall: Joanne Froggatt (12 h 32 min)

Joseph's Yorkshire dialect is only about 12 minutes of the book.

${link('best-wuthering-heights-audiobook')}`,
  },
  {
    folder: 'War and Peace',
    slug: 'best-war-and-peace-audiobook',
    card: 'assets/img/blog/war-and-peace-audiobook-picks-v2.webp',
    caption: `Today's audiobook pick: War and Peace 🎧

Best free: Mark Nelson in the HushBook app, 62 h 27 min
Best overall: Thandiwe Newton, 60 h 14 min

Good to know
• 62 h at 1x. 41 h 21 min at 1.5x. 31 h at 2x.
• 365 chapters: one a day takes a year.
• One modern translation on audio: Anthony Briggs's, from Penguin Classics.

Every translation and narrator compared:
${link('best-war-and-peace-audiobook')}

#WarAndPeace #Tolstoy #audiobooks #classicbooks`,
    x: `Today's audiobook pick: War and Peace 🎧

Best free: Mark Nelson in the HushBook app
Best overall: Thandiwe Newton (60 h 14 min), a 2023 Audie winner

365 chapters: one a day takes a year.

${link('best-war-and-peace-audiobook')}`,
  },
  {
    folder: 'Crime and Punishment',
    slug: 'best-crime-and-punishment-audiobook',
    card: 'assets/img/blog/crime-and-punishment-audiobook-picks-v2.webp',
    caption: `Today's audiobook pick: Crime and Punishment 🎧

Best free: Mark Nelson in the HushBook app, 22 h 2 min
Best overall: Anthony Heald, 20 h 28 min

Good to know
• 22 h 26 min at 1x. 14 h 57 min at 1.5x.
• Heald, Will Poulter and George Guidall all read the same translation: Constance Garnett's.
• Want a modern one? Don Warrington reads Oliver Ready's.

Every translation and narrator compared:
${link('best-crime-and-punishment-audiobook')}

#CrimeAndPunishment #Dostoevsky #audiobooks #classicbooks`,
    x: `Today's audiobook pick: Crime and Punishment 🎧

Best free: Mark Nelson in the HushBook app
Best overall: Anthony Heald (20 h 28 min)

Most editions read the same translation: Constance Garnett's.

${link('best-crime-and-punishment-audiobook')}`,
  },
];
