'use strict';

// Blog post registry. Body copy lives in content/blog/<slug>.md; the first
// "# " heading in that file is the on-page H1. Newest posts go first.
// Run `npm run build:blog` after adding or editing a post.

const posts = [
  {
    slug: 'm4b-vs-mp3',
    title: 'M4B vs MP3: Which Audiobook Format Should You Use?',
    metaTitle: 'M4B vs MP3: Which Audiobook Format Should You Use?',
    description: 'M4B keeps a whole audiobook in one file with chapters and saved position. MP3 plays on almost anything. What each format is, how they compare on quality and chapters, and when to convert.',
    category: 'Audiobook formats',
    datePublished: '2026-10-09',
    dateModified: '2026-10-09',
    readingTime: '6 min read',
    keywords: [
      'm4b vs mp3',
      'mp3 vs m4b',
      'what is m4b',
      'what is an m4b file',
      'm4b format',
      'm4a vs m4b',
      'm4b to mp3',
      'best audiobook format',
      'is m4b better than mp3'
    ],
    // Answer-first summary for readers and AI answer engines. Every point is
    // stated in the post body; keep it that way when editing.
    takeaways: [
      'For an audiobook, M4B is usually the better file to keep, and MP3 is the one that plays everywhere.',
      'An M4B is one MPEG-4 file, usually AAC audio, with built-in chapters, cover art and an audiobook flag that lets players remember your place. An MP3 audiobook is normally one file per chapter.',
      'At the same bitrate AAC generally sounds better than MP3, but for a narrator\'s voice the difference is small. LibriVox says its 64 kbps and 128 kbps MP3s are barely distinguishable.',
      'M4A and M4B are mostly the same format; the .m4b extension tells apps to treat the file as an audiobook.',
      'Convert M4B to MP3 only if a device cannot play M4B, keep the original, and remember that conversion does not remove DRM.',
      'HushBook imports both M4B and MP3, keeps M4B chapters and cover art, and highlights each word as the narrator reads. It cannot import files with DRM.'
    ],
    faqs: [
      ['Is M4B better than MP3 for audiobooks?', 'Usually, if you listen in an audiobook app. M4B keeps the whole book in one file with named chapters, cover art and a saved position, and its AAC audio is generally more efficient. MP3 wins on compatibility with older devices and car stereos.'],
      ['What is an M4B file?', 'An M4B is an audiobook file in the MPEG-4 container, almost always with AAC audio. It is close to an M4A file, but the .m4b extension tells players to treat it as an audiobook: remember your place, show chapters, and keep it out of the music library.'],
      ['What is the difference between M4A and M4B?', 'Mostly the extension. Both are MPEG-4 audio, usually AAC. Players treat .m4b as an audiobook and .m4a as a music track.'],
      ['Does M4B sound better than MP3?', 'At the same bitrate, AAC in an M4B generally sounds better than MP3. For speech the gap is small, so it is not worth re-buying or re-encoding a book for quality alone.'],
      ['Should I convert M4B to MP3?', 'Only if a device you rely on cannot play M4B. Convert a copy, keep the original, and expect to lose the chapter list unless the converter splits the file at each chapter. Both formats are lossy, so each conversion loses a little quality.'],
      ['Can I convert a DRM-protected M4B or Audible audiobook?', 'Files locked to a store, such as protected Apple M4B files or Audible AAX downloads, are not ordinary files you can move between apps. Use the store\'s own app for them.'],
      ['Can HushBook play M4B and MP3 files?', 'Yes. HushBook imports M4B, MP3 and other common audio formats one file per import, keeps M4B chapters and cover art, and transcribes the recording on your phone so each word is highlighted as the narrator reads. It cannot import files with DRM.']
    ]
  },
  {
    slug: 'can-you-read-along-with-audible',
    title: 'Can You Read Along With Audible? How Read & Listen Works',
    metaTitle: 'Can You Read Along With Audible? How Read & Listen Works',
    description: 'Yes, with Audible Read & Listen, if you own both the audiobook and the Kindle ebook. What you need, how to turn it on, what to do if you own one edition, and options for audiobooks that did not come from Audible.',
    category: 'Read-along guides',
    datePublished: '2026-10-08',
    dateModified: '2026-10-08',
    readingTime: '5 min read',
    keywords: [
      'can you read along with audible',
      'how to listen and read on audible',
      'audible listen and read',
      'audible read and listen',
      'how to listen and read on kindle',
      'can you listen and read on kindle',
      'kindle unlimited listen and read',
      'whispersync for voice',
      'read along with audiobook without kindle'
    ],
    // Answer-first summary for readers and AI answer engines. Every point is
    // stated in the post body; keep it that way when editing.
    takeaways: [
      'Yes. Audible Read & Listen highlights the Kindle text word by word while the narrator reads, and you can switch between listening and reading along at any time.',
      'You need both editions on the same Amazon account: the audiobook in your Audible library and the Kindle ebook in your Kindle library. The title must be marked Read & Listen, formerly Whispersync for Voice-ready.',
      'In the Audible app, filter your Library by Read & Listen, start the book, and use the toggle above the cover to switch modes.',
      'Audible announced the current version in February 2026, starting in the US with the UK, Australia and Germany planned next. Check your country before buying.',
      'For audiobooks that did not come from Audible, such as MP3 or M4B files you can legally import, HushBook transcribes the audio on your phone and highlights each word. It cannot open protected Audible downloads or Kindle ebooks.'
    ],
    faqs: [
      ['Can you read along with Audible?', 'Yes, for eligible titles. Audible Read & Listen shows the Kindle ebook text and highlights each word as the narrator reads it. You need both the Audible audiobook and the Kindle ebook of the same title on your Amazon account.'],
      ['How do I turn on Read & Listen in the Audible app?', 'Open your Library, use the Read & Listen filter or look for the badge next to a cover, start playing the book, and use the toggle above the cover image to switch from Listen to Read & Listen.'],
      ['Do I have to buy the Kindle ebook to read along on Audible?', 'Yes. Audible does not bundle the two formats. If you already own the Kindle ebook, Amazon often offers the matching audiobook at a discount as an option to add Audible narration.'],
      ['Does Read & Listen work on a Kindle e-reader?', 'Audible lists its iPhone, iPad, Android and Android tablet apps, Fire tablets running Fire OS 8 or later, and its macOS app as supported. Kindle e-readers are not on that list.'],
      ['Is Audible Read & Listen available in my country?', 'At its February 2026 launch it started in the US, with the UK, Australia and Germany planned over the following months. Check the Audible help pages for your country.'],
      ['Can I read along with an audiobook that is not from Audible?', 'Audible Read & Listen only covers titles in your Audible and Kindle libraries. For MP3 or M4B files you can legally import, such as LibriVox recordings, HushBook transcribes the audio on your phone and highlights each word as the narrator reads.'],
      ['Can HushBook open Audible audiobooks or Kindle ebooks?', 'No. Protected Audible downloads and Kindle ebooks are locked to Amazon apps, so HushBook cannot import them. If your books are in Audible and Kindle, use Read & Listen.']
    ]
  },
  {
    slug: 'what-is-immersive-reading',
    title: 'What Is Immersive Reading? How to Read and Listen at the Same Time',
    metaTitle: 'What Is Immersive Reading? How to Read and Listen at Once',
    description: 'Immersive reading means following the text while you listen to the audiobook. How it differs from text-to-speech, Microsoft Immersive Reader, and Audible Read & Listen, and how to try it with your own recording.',
    category: 'Read-along guides',
    datePublished: '2026-10-07',
    dateModified: '2026-10-07',
    readingTime: '6 min read',
    keywords: [
      'immersive reading',
      'immersion reading',
      'how to read and listen to a book at the same time',
      'read along with audiobook',
      'audiobook with highlighted text',
      'reading while listening to audiobook',
      'Audible Read & Listen',
      'Microsoft Immersive Reader vs audiobook',
      'text-to-speech vs audiobook',
      'read-along app for ADHD and dyslexia'
    ],
    // Answer-first summary for readers and AI answer engines. Every point is
    // stated in the post body; keep it that way when editing.
    takeaways: [
      'Immersive reading means reading the words while listening to the same book, either with an app that highlights each word or with a book on your lap and headphones on.',
      'An audiobook already has a human narrator; a text-to-speech reader turns a document into computer speech. Read-along for an audiobook needs text that follows that specific recording.',
      'Microsoft Immersive Reader and Edge Reading mode work on digital text such as web pages. They are not an audiobook library.',
      'Audible announced Read & Listen in February 2026 for eligible Audible and Kindle editions, starting in the US. Check it before buying another copy.',
      'HushBook transcribes an audiobook file you can legally import (MP3 or M4B) on your phone and highlights each word in time with the narrator, offline.'
    ],
    faqs: [
      ['What is immersive reading?', 'Immersive reading is reading the words of a book while listening to the same book being narrated. An app can highlight each word as the narrator speaks it, or you can follow a printed or ebook edition while the audiobook plays.'],
      ['How do I read and listen to a book at the same time?', 'Start with what you already have: play the audiobook and follow a matching edition of the text for a few pages. Check that both editions match, since abridged recordings or different introductions will not line up. If you keep losing your place, a read-along app that highlights the current word gives you a point to return to.'],
      ['Is Microsoft Immersive Reader the same as reading along with an audiobook?', 'No. Microsoft Immersive Reader and Reading mode in Edge are tools for digital text. They can simplify a web page, change how text looks, and read it aloud with a computer voice. They do not follow a recorded audiobook narrator.'],
      ['Does Audible have a read-along feature?', 'Audible announced Read & Listen in February 2026. It pairs eligible audiobook and ebook editions from your Audible and Kindle libraries and highlights the text with the narration. The announcement described a US rollout first, and you may need both formats.'],
      ['Can HushBook play Audible audiobooks?', 'No. Protected Audible downloads cannot be imported into HushBook. HushBook works with audio files you can legally import, such as MP3 or M4B files and public-domain recordings from LibriVox.'],
      ['Does reading while listening help with ADHD or dyslexia?', 'Some readers find that seeing the words helps them stay with a chapter, and Understood describes audiobooks and text-to-speech as reading supports. Its expert-reviewed guide also says assistive tools alone probably will not improve reading skills, and an app does not replace teaching or treatment for ADHD or dyslexia.'],
      ['Do I need the ebook to use HushBook read-along?', 'No. HushBook creates a transcript from the audio on your phone, so you do not need to buy the ebook. The transcript comes from speech recognition, so names or noisy recordings can contain mistakes.']
    ]
  }
];

module.exports = { posts };
