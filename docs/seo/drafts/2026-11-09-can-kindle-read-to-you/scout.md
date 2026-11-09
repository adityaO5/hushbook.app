# Scout brief: "Can Kindle read to you?" (2026-11-09)

**Verdict: GO.** Keep the pick, slug `can-kindle-read-to-you`, with a read-aloud-only scope (Assistive Reader, VoiceView, Alexa, phone screen readers, Kindle on a computer, Audible narration as a way to listen). It has more demand than every runner-up combined, no page of ours targets it, and the SERP has the same shape as the Libby one. One difference from Libby: Amazon really has the feature and its help pages answer the head query, so the post wins on the device, voice, "not working" and "for free" long tail, not on the head term.

Tool report: `docs/seo/keyword-research-2026-11-09.md`. Raw signals: `C:\Users\rakes\hushbook-seo\keyword-scout\2026-11-09\signals.json` (outside the repo).

## Evidence

### Scout run

`node tools/seo/keyword-scout.mjs --seeds "can kindle read to you,kindle read aloud,listen to kindle books,kindle text to speech,kindle assistive reader,learn italian with audiobooks,can you read along with apple books,audiobook book club,how to cite an audiobook" --engines google-chrome,youtube,bing,ddg --reddit 12 --reddit-sub 0 --serp 0 --allintitle 0` (about 22 minutes). The runner-up topics went in as seeds so all of them were measured in the same run. The tool added 6 GSC gap seeds of its own.

- 942 expansion queries x 4 engines, all OK. 6,161 unique suggestions, 3,605 families. Reddit: `search.json` 403, RSS mode, 12 searches. SERP probe off (`--serp 0`, brief: no Playwright, no Google SERP), so Weakness is "n/p" everywhere and the SERP read below comes from `notes.md`.
- **Kindle read-aloud cluster** (phrasings with "kindle" and read to / aloud / out loud / text to speech / assistive reader / voiceview): **1,483 distinct phrasings, 675 from Google, 252 from Bing or DuckDuckGo, 15 on all four engines, 35 with Google relevance 1,250 or more** (Google's top completion). Plus 372 "listen to kindle books" phrasings.
- **Runners-up, same run.** "Italian" with audio or listen: 47 Google phrasings, 0 at relevance 1,250 or more. Apple Books read along or read to you: 6 Google, 0. Audiobook book club: 31 Google, 0. Cite or quote an audiobook: 33 Google, 3 (already rejected in the config as `search-cite`). Portuguese did not come up at all (it was not seeded).
- Caveat: 5 of the 9 seeds were Kindle seeds, so the raw phrasing count favours Kindle. The relevance-1,250 count and the four-engine count depend much less on the seeds, and Kindle leads on both by a wide margin.

Largest Kindle families (phrasings, engines, best Google relevance, tool score):

| Family (top phrasing) | Phr | Engines | Rel | Score | Flags |
|---|---|---|---|---|---|
| can kindle read to you | 170 | C Y B D | 601 | -38.8 | COVERED, CANNIBALIZATION (false, see below) |
| kindle app read aloud (Q: does kindle read aloud) | 102 | C Y B D | 1251 | 12.9 | NEAR |
| listen to kindle books | 83 | C Y B D | 601 | -38.7 | COVERED, CANNIBALIZATION (false) |
| kindle book text to speech | 80 | C Y B D | 1250 | **30.1, ranked #1 overall** | NEAR |
| kindle assistive reader app (Q: how to get assistive reader on kindle) | 46 | C Y B D | 601 | -3.9 | CANNIBALIZATION (1 impr. on the immersive post) |
| listen to kindle books on iphone | 28 | C Y B D | 1252 | -6.7 | NEAR |
| can kindle read to you on iphone | 18 | C Y B D | 1252 | 12.7 | NEAR |
| kindle read aloud iphone | 16 | C Y B D | 1250 | 12.6 | NEAR |
| kindle read aloud android | 14 | C B D | 1250 | -7 | NEAR |
| can kindle read to you for free | 13 | C Y B D | 601 | -5.7 | NEAR |
| can kindle read to you on android | 12 | C Y B D | 1250 | 12.4 | NEAR |
| kindle assistive reader voice | 10 | C Y B D | 1251 | -2.5 | |
| kindle assistive reader not working | 10 | C Y B D | 1250 | excluded, pre-score 17.3 | no fit |
| kindle paperwhite assistive reader | 7 | C Y B D | 601 | excluded, pre-score 15 | no fit |

Variant counts inside the cluster: iPhone 132, Android 106, PC or computer 62, free 59, Fire 54, Paperwhite 43, iPad 37, Kindle Unlimited 38, Audible 28, Mac 20, Kindle Kids 17, Alexa 15, Scribe 10, "without Audible" 10, Colorsoft 8, Speechify 7. Voice 110 and "not working" 36 phrasings are also large; several of them sit at relevance 1,250 to 1,253 ("kindle assistive reader speed", "... in background", "... screen off").

**Why the scores undersell it (read before trusting the table).** The tool's numbers are wrong for this cluster in three ways, so the ranking is a judgment call:

1. **Fit is 0** for every read-aloud family, because the Fit lexicon in `keyword-scout.config.mjs` has no read-aloud or text-to-speech category. The #1 family's Fit 40 is an accident: the regex matched "with text" inside "kindle with text to speech feature".
2. **COVERED** on "can kindle read to you" and "listen to kindle books" is token matching: {kindle, read} and {kindle, listen} hit the Audible post's keyword "how to listen and read on kindle" (Jaccard 0.67). The Audible post covers Read & Listen, not read-aloud.
3. **CANNIBALIZATION** on those families is the Read & Listen queries below (positions 7.7 to 11 on the Audible post), plus one "kindle assistive reader change voice" impression on the immersive reading post. Nothing of ours ranks for read-aloud.

Reddit: Fit-0 families never reached the Reddit shortlist. The two Kindle families searched found only small threads ("Looking for a good app to read Kindle books aloud?", r/AudiobookReviews, 1 point). The live SERP in `notes.md` is better evidence: an r/kindle thread ranks #1 for the head query, and Reddit (40+ comments) ranks for "how to listen to kindle books".

### Search Console (90 days, 2026-08-10 to 2026-11-07): every query containing "kindle"

| Query | Impr | Pos | Lands on | Intent |
|---|---|---|---|---|
| does audible count towards kindle reading streak | 6 | 9.8 | /blog/do-audiobooks-count-on-goodreads | Streak: out of scope |
| kindle read along with audible | 4 | 10 | /blog/can-you-read-along-with-audible | Read & Listen |
| can you listen to an audiobook and read at the same time on kindle | 3 | 9 | /blog/can-you-read-along-with-audible | Read & Listen |
| kindle audible read and listen | 3 | 7.7 | /blog/can-you-read-along-with-audible | Read & Listen |
| do audible books count towards kindle streak | 2 | 10 | /blog/do-audiobooks-count-on-goodreads | Streak |
| kindle audiobooks how to listen | 2 | 8 | /blog/can-you-read-along-with-audible | **Listen: the new post should take this one** |
| audible kindle read and listen | 1 | 1 | /blog/can-you-read-along-with-audible | Read & Listen |
| audible read and listen on kindle | 1 | 10 | /blog/can-you-read-along-with-audible | Read & Listen |
| does listening to audible count towards kindle reading streak | 1 | 9 | /blog/do-audiobooks-count-on-goodreads | Streak |
| how to listen to audible and read on kindle at the same time | 1 | 1 | /blog/can-you-read-along-with-audible | Read & Listen |
| i don't have kindle | 1 | 1 | /blog/can-you-read-along-with-audible | Read & Listen |
| if i have a book on audible can i read it on kindle | 1 | 11 | /blog/can-you-read-along-with-audible | Read & Listen |
| **kindle assistive reader change voice** | 1 | 9 | /blog/what-is-immersive-reading | **Read-aloud: the new post should take this one** |
| read and listen audible kindle | 1 | 11 | /blog/can-you-read-along-with-audible | Read & Listen |
| read and listen kindle | 1 | 10 | /blog/can-you-read-along-with-audible | Read & Listen |

In the 7-day file (Nov 1 to 7), 8 of these show up, all on the same pages. Related: "does audible read to you" (2 impressions, position 6) lands on the Audible post.

**Scope boundary.** The Audible post keeps every "read and listen / read along / immersion reading / at the same time" Kindle query. The new post gets one linking sentence on Read & Listen and nothing more: no requirements list, no steps, no badge, no country rollout. The goal is for "kindle audiobooks how to listen" and "kindle assistive reader change voice" to move to the new post. Kindle reading-streak queries stay with the Goodreads post as a FAQ line (plan item, not this post).

The Libby post's section "Can Kindle read your Libby books aloud?" already explains Assistive Reader in a few lines. The new post goes deeper. Link back for library loans; don't repeat the Libby "Read With..., Kindle" steps.

Sibling performance (pages, 7 days): Audible post 1,677 impressions (13 clicks, 7.5); Libby 154 to **750** (8 clicks, 6.1); Spotify 546 (4 clicks, 5.7). CTR on this series is about 0.7% to 1.1%.

### SERP read (from notes.md: live Google, signed out, US, 2026-11-09)

- "can kindle read to you": AI Overview (Assistive Reader on 11th and 12th generation e-readers, Scribe and Colorsoft, Bluetooth needed; app version on iOS and Android; VoiceView; iOS Speak Screen and Android TalkBack as fallbacks; cites ElevenReader, Amazon, Reddit, YouTube). Organic results: Reddit r/kindle (9 comments, 1 year old), Amazon "Assistive Reader in Kindle Apps", ElevenReader (vendor), Amazon "Assistive Reader for Kindle" (e-readers), libanswers.csudh.edu (.edu FAQ), Murf.ai (vendor). Video pack.
- Count: 3 authority results (2 Amazon, 1 .edu), 1 forum, 2 vendors, videos. Amazon splits the answer across separate pages for apps, e-readers, VoiceView, Alexa and Audible narration, and no page says which route to use on which device or why it isn't working.
- **Can one consolidated answer page win?** It can rank, the way the Libby post did (position 6.1 after two weeks against libbyapp help pages). It can't easily take #1 on the head query: Amazon's page answers it directly, which never happened with Libby ("Libby can't, by itself"), and the AI Overview answers it before any click. The openings: the Reddit result at #1 is thin; vendor posts sell their own apps; and Amazon has no single page covering device variants (PC, Mac, Paperwhite, Fire, Alexa), voice and speed, "not working", "for free" or "like Audible". Those are the families with relevance 1,250 completions. Aim for a top 5 on the variants and AI Overview citations (it cites ElevenReader and Reddit today, both weak).

### Runners-up: none overturns the pick

| Candidate | This run | Verdict |
|---|---|---|
| Learn Italian with audiobooks | "italian audiobooks for beginners" 29.0 (#2, 9 phrasings, rel 601, C Y B D); "learn italian audiobook free" 25.3 (20 phrasings). 47 Google phrasings in all | Parked for next week. Template exists, but the Nov 4 language posts have 45 / 0 / 0 impressions |
| Learn Portuguese | Not seeded; 2026-11-07 run: 20 Google phrasings | Parked |
| Apple Books read-along / "can apple books read to you" | YouTube-only single phrasings (#5 24.3, #8 22.5); 6 Google phrasings. The automated run's suggest call got 10 for "can apple books read to you" | Small. Best done as the next "can X read to you" sibling, along with "google play books read aloud" (10 suggestions in the automated run, including "not working" and "voice change") |
| Audiobook book clubs | "best audiobook club" 29 phrasings, Fit 0, mostly subscription "audiobook club" shopping and title searches ("bromance book club audiobook") | Reject (see config proposal) |
| How to cite an audiobook | Already rejected in config (`search-cite`, 2026-11-04). The automated weekly run proposed it again because it doesn't read the config | Keep rejected |
| GSC-seed families (double speed, dyslexia kids, free trial) | 18.9 to 24.1, mostly YouTube-only or NEAR existing posts | Not better |

## Target

- **Primary query:** `can kindle read to you`
- **Secondary:** `kindle read aloud`, `kindle text to speech`, `how to listen to kindle books`
- **Slug:** `can-kindle-read-to-you`

**Option A (recommended, matches the Libby entry so the series reads as one):**
- H1 / `title`: **Can Kindle Read to You? How to Make Kindle Read Aloud on Any Device** (67)
- `metaTitle`: **Can Kindle Read to You? How to Make Kindle Read Aloud** (53)

**Option B:**
- H1 / `title`: Can Kindle Read to You? Assistive Reader, Text to Speech and Audible (68)
- `metaTitle`: Can Kindle Read to You? Read Aloud on iPhone, Android, PC (57). Use this only if research confirms a PC route; otherwise drop "PC".

`metaDescription` starting point (144): "Yes. Kindle apps and newer e-readers read aloud for free with Assistive Reader. How to turn it on for each device, change the voice, and fix it."

Answer-first opening to verify: Yes. The Kindle app on phones and tablets, and recent Kindle e-readers, can read books aloud for free with Assistive Reader, a text-to-speech voice that highlights the text as it reads. On an e-reader you need Bluetooth headphones or a speaker. For a human narrator, add the Audible audiobook. HushBook is not one of these routes: say so in the closing section, not the opening.

## 8 keywords (exact autocomplete wording)

1. can kindle read to you (C Y B D)
2. how to make kindle read to you (automated run; family "how do you get kindle to read aloud" B D)
3. kindle read aloud iphone (C Y B D, rel 1250)
4. kindle read aloud android (C B D, rel 1250)
5. kindle text to speech (C Y B D)
6. kindle assistive reader not working (C Y B D, rel 1250)
7. how to listen to kindle books for free (C, rel 561; its family "listen to kindle books free" is on all 4 engines)
8. how to listen to kindle books without audible (C B D)

## H2 outline

PAA wording from `notes.md` is marked PAA. Queries are exact autocomplete phrasings from this run or the automated one. (rel n) = Google relevance.

1. **Can Kindle read to you?** Short answer plus a table: route, devices, voice (synthetic or narrator), cost, highlights text yes/no. Queries: can kindle read to you; does kindle read to you; can the kindle app read to you; does kindle have text to speech; kindle read aloud feature (1250); does kindle have a read aloud option; can kindle read all books to you.
2. **How do you get your Kindle to read to you?** (PAA) Pick by device in 2 to 3 sentences, then jump links. Queries: how to make kindle read to you; how do you get kindle to read aloud; how do i get text to speech on my kindle; how to have kindle read to you. If the post runs long, fold this into H2 1.
3. **How to make Kindle read aloud on iPhone and iPad.** Numbered H3 steps: `### 1. Open the book`, `### 2. Open Aa, then More`, `### 3. Turn on Assistive Reader`, `### 4. Press play and set the speed`. Then the iOS fallback (Spoken Content / Speak Screen, renamed Read & Speak in iOS 26 per the Libby post; verify). Queries: can kindle read to you on iphone (1252); kindle read aloud iphone (1250); how to get kindle to read aloud on iphone; can kindle read to you on ipad; how to get kindle to read to you on ipad (PASF); listen to kindle books on iphone (1252).
4. **How to make Kindle read aloud on Android and Fire tablets.** Numbered H3 steps, plus TalkBack or Select to Speak as the fallback (verify). Queries: can kindle read to you on android (1250); kindle read aloud android (1250); kindle text to speech android (1251); kindle fire text to speech; can kindle fire read books to you; kindle fire assistive reader.
5. **Can a Kindle Paperwhite read to you?** (Paperwhite, Scribe, Colorsoft, Basic Kindle.) Assistive Reader on supported models, VoiceView, no speaker so Bluetooth is required. Numbered H3 steps: pair Bluetooth, turn on Assistive Reader, play. Queries: can kindle paperwhite read to you; does kindle paperwhite have text to speech; kindle paperwhite assistive reader; kindle scribe text to speech; can kindle colorsoft read to you; can you listen to a kindle book on bluetooth; can i listen to audiobooks on kindle paperwhite (PASF).
6. **Can Kindle read to you on a PC or Mac?** Queries: kindle text to speech pc (1250); can kindle read to you on pc; can kindle read to you on mac (1200); kindle assistive reader mac; how to make kindle read to you on computer; can i listen to kindle books on my laptop. Every fact here needs a fresh source (Kindle for PC read-aloud, Kindle for Mac availability).
7. **Can Alexa read your Kindle books?** Keep it short: 15 to 17 phrasings, relevance 601 or less. Queries: can i listen to my kindle books on alexa; how to listen to kindle books with alexa; kindle assistive reader alexa app; "kindle assisted reader not on alexa plus" (B D), a sign that Alexa+ changed this. Verify on Amazon's pages on the writing day.
8. **How to change the Kindle Assistive Reader voice and speed.** Queries: kindle assistive reader voice (1251); kindle text to speech change voice (1250); kindle assistive reader change voice (1250; GSC 1 impression at 9 on the immersive post); kindle assistive reader speed (1253); kindle text to speech speed. Steps as numbered H3s if the app and the phone's voice settings are separate places.
9. **Why is Kindle Assistive Reader not working?** Checklist: book lacks Enhanced Typesetting, PDF or comic or personal document, unsupported e-reader generation, no Bluetooth device paired, app out of date, speed setting ignored. Queries: kindle assistive reader not working (1250, 4 engines); kindle text to speech not working (1250); why wont my kindle read to me; kindle assistive reader speed not working (1252); kindle assistive reader wont speed up (1250); kindle fire text to speech not working; kindle app read aloud not working.
10. **How can I listen to my Kindle books for free?** (PAA) Open with "without Audible": Assistive Reader and phone screen readers cost nothing; some Kindle Unlimited and Prime Reading titles include narration; library audiobooks through Libby; free public domain audiobooks. Queries: can kindle read to you for free; how to listen to kindle books for free; listen to kindle books free (4 engines); how to listen to kindle books without audible; can you listen to kindle books without audible; how to listen to kindle books without audible on iphone (PASF); kindle text to speech free.
11. **How do I turn my Kindle book into an audiobook?** (PAA; also "How do I turn my Kindle into an audiobook?") Legitimate routes only: add Audible narration where Amazon offers it, Kindle Unlimited titles with narration, or Assistive Reader. Then one sentence linking Read & Listen to the Audible post. Queries: how to have kindle read to you with audible; can i listen to my kindle books on audible; can you listen to kindle unlimited books on audible; how to listen to kindle books with audible.
12. **Does Kindle read to you like Audible?** A synthetic voice reading the ebook versus a person performing the audiobook: what each is good for. **This is the one soft-upsell spot.** The reader who wants a narrator and still wants to see the words. Also one line on ElevenReader and Speechify, linking the best-apps post. Queries: does kindle read to you like audible; can you listen to kindle books on speechify (one line only); how to listen to kindle books on elevenreader (one line only).
13. **What we could not confirm** (house pattern).
14. **Listening with a narrator in HushBook** (closing section, wording from the Libby closing; see do-not-claim list).

## FAQ candidates (questions as typed; each answer 40 words or fewer)

1. Can Kindle read to you with the screen off? (kindle assistive reader screen off, rel 1250; kindle assistive reader in background, 1251)
2. Can Kindle Unlimited books read to you? (can kindle unlimited read to you; does kindle unlimited read aloud)
3. Can Kindle read PDFs aloud? (can kindle read aloud pdf; kindle read aloud unavailable pdf)
4. Can a kids Kindle read to you? (can kindle kids read to you; does kids kindle read aloud; kindle kids assistive reader)
5. Can Kindle read to you out loud without headphones? (can kindle read to you out loud; can kindle read out loud; e-reader versus app answer)
6. Is there a monthly fee for Kindle? (PAA. One line: the read-aloud features are free; Kindle Unlimited is an optional subscription. Give the price with a date or leave it out.)

Spares: Can you listen to Kindle books offline? (can you listen to kindle books offline). Does Kindle highlight the words when it reads aloud? (Amazon says Assistive Reader highlights text; check whether that holds on e-ink.)

## Internal links (existing slugs) and where each goes

| Target | Sentence it belongs in |
|---|---|
| `/blog/can-libby-read-to-you` | H2 10: "Borrowed the book from your library? US libraries can send Libby ebooks to Kindle, and our [Libby read-aloud guide] covers what works with a loan." |
| `/blog/can-you-read-along-with-audible` | H2 11, the only Read & Listen sentence: "If you own both the Kindle ebook and the Audible audiobook, Read & Listen highlights the Kindle text as the narrator reads; [how Read & Listen works]." |
| `/blog/audiobooks-with-captions` | H2 12: "Most audiobooks show no text at all while they play ([which apps add captions])." |
| `/blog/how-to-listen-to-audiobooks-for-free` | H2 10: "For a human narrator at no cost, [these free audiobook routes] are the place to start." |
| `/blog/does-reading-along-with-an-audiobook-help` | H2 12, after the highlighting point: "Whether hearing and seeing the words together helps is [what the research says]." |
| `/blog/how-to-put-audiobooks-on-iphone` | Closing section: "If you own the audiobook as an MP3 or M4B file, [put it on your iPhone] and open it in HushBook." |
| `/blog/audiobook-listening-speed` | H2 8, speed step: "For a human narrator, [what speed to pick] is a separate question; most people land between 1.2x and 1.5x" (check the number against that post). |
| `/blog/best-apps-to-read-and-listen-at-the-same-time` | H2 12, the ElevenReader/Speechify line: "We compare AI-voice readers such as ElevenReader and Speechify with narrated read-along apps in [best apps to read and listen at the same time]." |

Optional: `/whispersync-alternative` in H2 11, if the post names "Whispersync for Voice" (the old name for Read & Listen).

## Do not cover / do not claim

- **No text-to-speech in HushBook.** HushBook does not read Kindle books, ebooks or any text aloud, and cannot open Kindle or Audible files (DRM). Say this plainly once, in the closing section.
- No "Sync with e-book" Pro feature (`proTourEbookHow`), no "focus view" (removed in 34c5d81). Never "tap a word to jump": the claim is "long-press a line to play from there".
- Claims allowed (as live in the Libby closing): built-in free public domain catalogue from LibriVox and the Internet Archive in six languages; imports MP3 and M4B you own; transcribes on the phone and highlights each word; free to download, no ads, no account; works offline after a one-time engine download.
- No Read & Listen or Immersion Reading explanation beyond the one linking sentence (the Audible post ranks 7.7 to 11 for those queries). No Whispersync history.
- No Libby steps (link instead).
- No DRM removal, Kindle to MP3 or EPUB conversion, Calibre plugins, screen recording or "screenshot your Kindle into an AI reader" workarounds. The "turn my Kindle book into an audiobook" H2 sticks to Amazon's own routes.
- No how-to for ElevenReader, Speechify or Murf with Kindle books. One neutral line plus the best-apps link; don't repeat their claims about reading Kindle books.
- Kindle reading streak queries (Goodreads post territory).
- Device shopping from PAA: "What are the downsides of a Kindle?", "Why are people moving away from Kindle?", "Why are people leaving Audible?", "Which is better, Audible or Kindle?".
- Seniors, blind and low-vision angles (rejected topics `seniors` and `blind-low-vision`). VoiceView appears as a feature, not as a "Kindle for blind readers" section. Skip the PAA "What is the easiest way for seniors to listen to audiobooks?".
- Unverified AI Overview details: "speeds from 0.5x to 3.5x", "30-second rewinds", the exact e-reader generation list. Use them only if Amazon's own page says so on the writing day.
- Alexa reading Kindle books (Alexa+ may have changed it), Kindle for PC read-aloud, Kindle for Mac availability, the iOS 26 "Read & Speak" name: all need a fresh primary source or go under "What we could not confirm".
- Assistive Reader on library loans: the Libby post lists it as unconfirmed. Keep it unconfirmed unless Amazon says otherwise.
- Prices (Kindle Unlimited, Audible narration add-on): dated, sourced, or left out.

## Proposed additions to `tools/seo/keyword-scout.config.mjs` (proposal only; not edited)

```js
// rejected[]
{ id: 'book-club', re: /book ?club/, why: 'Rejected 2026-11-09: "audiobook club" is subscription shopping and title searches; app questions belong in best-apps; HushBook has no social features.' },
{ id: 'kindle-read-and-listen', re: /kindle.*(read and listen|listen and read|read ?along|immersion|whispersync|same time)|(read and listen|listen and read|read ?along|immersion|whispersync|same time).*kindle/, why: '2026-11-09: GSC sends these to can-you-read-along-with-audible (pos 7.7 to 11); can-kindle-read-to-you only links there.' },
{ id: 'kindle-streak', re: /streak/, why: '2026-11-09: Kindle reading-streak queries land on do-audiobooks-count-on-goodreads; a FAQ line there, not a post.' },
{ id: 'kindle-device-shopping', re: /downsides? of (a |the )?kindle|monthly fee for kindle|(moving away|leaving|switch(ing)? from) (kindle|audible)|which is better.*(audible|kindle)/, why: '2026-11-09: device and subscription shopping from Kindle PAA, no reader pain.' },
{ id: 'drm-convert', re: /(kindle|audible|aax|azw3?).*(to mp3|to epub|to pdf|convert|remove drm|drm free)|convert (kindle|audible)|(kindle|audible) (book )?to audio ?book converter/, why: '2026-11-09: DRM removal; HushBook cannot open Kindle or Audible files.' },
{ id: 'tts-vendor-kindle', re: /kindle.*(speechify|eleven ?reader|natural ?reader|murf|voice dream)|(speechify|eleven ?reader|natural ?reader|murf|voice dream).*kindle/, why: '2026-11-09: vendor-owned SERPs; one line in can-kindle-read-to-you, no how-to.' },
```

Two scout problems to fix separately (not rejections): the Fit lexicon has no read-aloud or text-to-speech category, so this whole cluster scored Fit 0; and `synced-text`'s `with text` matches "with text to speech". Once the post ships, its `keywords` in `data/blog-posts.js` will mark the family as covered anyway.

## Top risks

1. **Fit and conversion.** The reader wants their Kindle library read aloud, and HushBook can't do that. Expect impressions and few installs; the Libby post gets 8 clicks on 750 impressions. Keep the HushBook mention to H2 12 and the closing section, and be honest about what it can't do.
2. **Amazon owns the head answer, plus an AI Overview.** Unlike Libby, Kindle has the feature, and Amazon's help pages and the AI Overview answer "can kindle read to you" before any click. Expect CTR around 1%. The win is in the variants: iPhone/Android at relevance 1,250, voice and speed, "not working", Paperwhite, PC/Mac, "for free".
3. **Facts that change.** Assistive Reader's e-reader models (new around Aug 2025, going by a demo video dated Aug 27, 2025), Alexa+ (autocomplete already says "kindle assisted reader not on alexa plus"), Kindle for PC/Mac, iOS 26 menu names. Check every step against Amazon, Apple and Google help pages on the writing day; anything unconfirmed goes under "What we could not confirm". Also watch scope creep into Read & Listen, which would compete with the Audible post.
