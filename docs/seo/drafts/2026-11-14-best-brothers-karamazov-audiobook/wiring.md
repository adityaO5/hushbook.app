# Wiring for /blog/best-brothers-karamazov-audiobook

2026-11-14, writer's hand-off. Nothing outside this folder was touched: no site files, no build, no commit.

## Files in this folder

- `post.md`: copy byte for byte to `content/blog/best-brothers-karamazov-audiobook.md`.
- `registry-entry.mjs`: the registry object plus a self-check. `node registry-entry.mjs` prints: title 74, metaTitle 59, metaDescription 156, description 235, cta.heading 55, cta.text 199; first sentence 20 words; body about 6,200 words (about 4,880 outside tables), so `readingTime: '28 min read'`; 10 H2s plus Sources, 17 H3s, 12 tables, 4 wide images (each directly under its own H2, alts 235 to 240 characters), 76 source links, 5 outbound links in the body (all also under Sources), 7 internal links; 0 en or em dashes in the post, the entry or the llms line. All four body images are on disk and viewed; the only failures left when I finished were the hero embed HTML and the -og image, which the image maker had not written yet. Rerun it after they land; it must print OK.
- `llms-line.txt`: the llms.txt line. The self-check asserts it equals title plus description.

Length note: counted with the self-check's method (body without H1, images and Sources, tables included), the post is about 6,200 words, against 6,132 for Jane Eyre and 6,181 for Wuthering Heights. I cut about 380 words from the first draft (store duplicates, a second Davidson quote, the Chukovsky line the C&P post already has, the Grand Inquisitor reading-ease aside, the Kindle-pairing gap).

What the self-check asserts beyond yesterday's: takeaways 22 to 32 words; the cta uses "iPhone, Android, Windows and Mac"; the body says "macOS 14 or later"; each pick H3 links its store page (Thompson and Gregory Audible, Pirie LibriVox, Miles hoopla and Audible); the four pick H3s carry the hero card's labels, names and runtimes; every question H2 and H3 opens with a one-sentence answer (quoted titles ignored); spoiler terms (the murder plot, late-book events, the titles of Books VIII to XII and the Epilogue chapters), the never-mention items (the archive.org upload, compendium, loudreader, Audible Plus) and both do-not-claim lists are banned; the Bruce Peery listing appears in exactly one body sentence, with the timing check and the public-domain reason; accents appear only with "according to We Love Translations" or AudioFile via Audible; every translator people search by name appears; the hero files exist.

## Registry and llms.txt

- `data/blog-posts.js`: insert the entry first, above `best-jane-eyre-audiobook` (line 10 today). Field order matches the exemplar.
- `hero: 'brothers-karamazov-picks'`: `content/blog/embeds/brothers-karamazov-picks.html`, `assets/img/blog/brothers-karamazov-picks.webp` and `brothers-karamazov-picks-og.webp`, from the image maker. The card on disk (11:41) reads: Best overall Luke Thompson 43 h 6 min, Penguin Classics, McDuff translation; Most rated Constantine Gregory 37 h 4 min, Naxos AudioBooks, Garnett translation; Best free Bruce Pirie 39 h 38 min, LibriVox, Garnett translation; Best to borrow Ben Miles 42 h 16 min, Macmillan Audio, Pevear and Volokhonsky translation. These match the four H3s. The embed HTML and the -og file were not on disk when I finished.
- `llms.txt`: insert `llms-line.txt` directly under the `- [HushBook blog]` line, above the Jane Eyre line.

## metaTitle

| Option | Characters |
|---|---|
| **Best Brothers Karamazov Audiobook: Narrators by Translation** (in the entry) | 59 |
| Best Brothers Karamazov Audiobook: Every Version Compared | 57 |
| Best Brothers Karamazov Audiobook: Narrator and Translation | 59 |

All three are 50 or more, so the build does not append " | HushBook". The chosen one names the two things searchers combine in this book's completions ("audiobook narrator" [1250], "translations" [1251], six translator names [1250]). "Every Translation Compared" (61) and "Translations and Narrators" (61) are one character too long.

## Images

| Image | Under H2 | Alt (as in post.md) | Status |
|---|---|---|---|
| `brothers-karamazov-editions.webp` | Which Brothers Karamazov audiobook is best? | Bar chart of 12 complete Brothers Karamazov recordings by translation, 34 h 18 min to 46 h 25 min, 9 from stores and 3 free on LibriVox, with ratings. Marked: Thompson best overall, Gregory most rated, Miles best to borrow, Pirie best free. | On disk (11:43), viewed, alt written against it. The chart has 9 store recordings; the post's table has 12 (it adds Jason Smith, Teddy Garraway and Ralph Lister, 1 or 2 ratings each). The LibriVox panel shows archive.org ratings: the group reading's "5.0 (6)" counts a zero-star note among its six entries (research-platforms 2a); Pirie "5.0 (2)" is right. Reviewer may prefer dropping that column, as for Jane Eyre. |
| `brothers-karamazov-length.webp` | How long is The Brothers Karamazov audiobook? | Stat tiles: 349,788 words in Garnett's translation, 96 chapters of 9 to 62 minutes, and 38 h 36 min at 1x at 151 words a minute, over a bar of the four parts and the epilogue: 7 h 40 min, 8 h 30 min, 9 h 12 min, 12 h 12 min and 1 h 2 min. | On disk (after 11:45), viewed, alt written against it. Every figure matches the post's parts table and length H2; "9 to 62 minutes" = Book I Ch. 2 (1,297 words) and the Grand Inquisitor (9,287). Footer "median pace of ten LibriVox readers" matches `how-long-is-an-audiobook.md:5`. |
| `brothers-karamazov-grand-inquisitor.webp` | Where is the Grand Inquisitor in The Brothers Karamazov? | Stat tiles: the Grand Inquisitor is Book V, Chapter 5, chapter 36 of 96, the longest at 9,287 words and 62 min at 1x, starting 30.8% in, 11 h 54 min into the book and 12 h 14 min into Pirie's free recording, over a bar of the 12 books. | On disk (11:46), viewed, alt written against it. Tiles 36 of 96, 9,287 words, 62 min, 30.8% (11 h 54 min), 12 h 14 min in Pirie; a bar of the 12 books plus the epilogue to 38 h 36 min; Book V "Pro and Contra" 3 h 37 min, 7 chapters, 32,812 words; Book VI "The Russian Monk" 2 h 24 min, 3 chapters, 21,761 words. All match the post. Book bars are labelled by number only; no title of Books VII to XII or the Epilogue chapters appears. |
| `brothers-karamazov-read-along.webp` | Is there a Brothers Karamazov audiobook with text? | Two HushBook screens for Bruce Pirie's free LibriVox recording, The Brothers Karamazov (version 3): the player 10 seconds into the first chapter, and its read-along page, Chapter I, with "and still" tinted red and "remembered" underlined. | On disk (11:40), viewed. Player 00:10 / -09:29 fits a 9:39 Chapter 1 file. The read-along header shows the file's tag as "01 - 01.01 Fyodor Pavlovitch Karamazov", which confirms the post's careful wording that the Grand Inquisitor shows with "05.05 The Grand Inquisitor" *in* its title (the "36 - " prefix will be there too). The page shows Garnett's first sentence ("gloomy and tragic death"), which Book I tells; not a spoiler. |

## Inbound links (link-only edits, no dateModified bump)

Yesterday's reviewer preferred appended sentences to wrapped words, so each of these appends one sentence to the end of the line named.

1. `content/blog/best-crime-and-punishment-audiobook.md:161` ("Is Crime and Punishment hard to read?"), append:
   `*The Brothers Karamazov* scores 82.0 by the same measure and runs 1.72 times as long, as our [Brothers Karamazov audiobook comparison](/blog/best-brothers-karamazov-audiobook) shows.`
   (Alternative from scout.md: wrap "The Brothers Karamazov" in line 155's BBC collection sentence. Readers following that link may expect the BBC version; the post covers it in two paragraphs only.)
2. `content/blog/how-to-keep-track-of-characters-in-a-book.md:11` (step 1, after the Pride and Prejudice sentence), append:
   `In *The Brothers Karamazov*, the eldest brother is "Mitya" 911 times and "Dmitri" 380, and our [Brothers Karamazov audiobook comparison](/blog/best-brothers-karamazov-audiobook) lists every name form in a spoiler-free table.`
3. `content/blog/abridged-vs-unabridged-audiobooks.md:32` (after the Monte Cristo sentence), append:
   `Simon Vance's abridged *Brothers Karamazov* runs 19 hours 8 minutes, long enough to pass for complete, and our [Brothers Karamazov audiobook comparison](/blog/best-brothers-karamazov-audiobook) flags it beside the complete recordings.`
4. `content/blog/how-long-is-an-audiobook.md:65` (bullet "Translation and edition."), append:
   `The two modern translations of *The Brothers Karamazov*, for example, run 42 and 43 hours on audio against 37 hours 4 minutes for Constantine Gregory's Garnett, as our [Brothers Karamazov audiobook comparison](/blog/best-brothers-karamazov-audiobook) shows.`

Each new sentence restates a figure from the new post (82.0, 1.72; 911, 380; 19 h 8 min; 42 h 16 min, 43 h 6 min, 37 h 4 min).

## Outbound internal links (7, all exist in content/blog/)

| Link | Section | Anchor text |
|---|---|---|
| /blog/how-long-is-an-audiobook | How long is The Brothers Karamazov audiobook? | how long audiobooks run |
| /blog/audiobook-listening-speed | How long is The Brothers Karamazov audiobook? (after the speed table) | what speed to listen at |
| /blog/best-war-and-peace-audiobook | Is The Brothers Karamazov longer than Crime and Punishment? (H3) | War and Peace audiobook comparison |
| /blog/is-librivox-safe-and-legal | Is there a free Brothers Karamazov audiobook? | LibriVox is free and legal |
| /blog/abridged-vs-unabridged-audiobooks | Which Brothers Karamazov audiobooks are abridged or dramatised? | abridged and unabridged audiobooks |
| /blog/how-to-keep-track-of-characters-in-a-book | How do you keep track of the names in The Brothers Karamazov? | keep track of characters |
| /blog/best-crime-and-punishment-audiobook | Is The Brothers Karamazov hard to read? | Crime and Punishment |

## Top-completion families and where each is answered

Top completions (Google relevance 1250 or 1251, scout.md), all 24 about the book:

| Completion or family | Section |
|---|---|
| the brothers karamazov audiobook; best brothers karamazov audiobook; which ... is best; best audible version | First paragraph; H2 "Which Brothers Karamazov audiobook is best?" |
| the brothers karamazov audiobook luke thompson | Pick H3 "Best overall: Luke Thompson" |
| brothers karamazov audiobook narrator; who narrates; best narrator | H2 1, the four pick H3s, "Also worth knowing", the table |
| who is the narrator in brothers karamazov (the in-book narrator) | "Is The Brothers Karamazov hard to read?" (Soar: an unnamed townsman) |
| brothers karamazov translations; best (the) brothers karamazov translation; translation comparison; translations compared/ranked; which translation | H2 "Which translation does each Brothers Karamazov audiobook use?" (table, critics' bullets) and H3 "Hear the difference" |
| brothers karamazov mcduff translation; audiobook david mcduff | Translation H2 table and critics; pick H3 Thompson |
| brothers karamazov garnett translation; constance garnett audiobook | Translation H2; Gregory pick ("the pick for Constance Garnett's translation") |
| brothers karamazov pevear and volokhonsky; pevear audiobook; bicentennial edition audiobook | Pick H3 Ben Miles ("also the pick for Pevear and Volokhonsky readers"); translation table; FAQ 3 |
| brothers karamazov avsey / katz / macandrew translation; katz audiobook; avsey audiobook | Translation table ("None found"), critics paragraph, edition-match list; FAQ 7 |
| magarshack translation | Translation table, critics bullet, "Hear the difference" (Woolf sample) |
| the brothers karamazov audiobook penguin classics; penguin audiobook | H3 "Which audiobook matches your print edition?"; FAQ 6 |
| hallow edition audiobook | Edition-match list (Hallow prints Garnett); could-not-verify (Hallow app audio) |
| frederick davidson brothers karamazov | "Also worth knowing"; the Davidson correction in the translation H2 |
| ben miles / constantine gregory / simon vance | Pick H3s; abridged H2 ("Simon Vance's recording is abridged") |
| the brothers karamazov audiobook length; brothers karamazov audiobook length; how long; how many hours | H2 "How long is The Brothers Karamazov audiobook?"; FAQ 2 |
| how many chapters / books / parts; books and chapters; word count; part 1 to part 4 | H3 "How many books and chapters are in The Brothers Karamazov?" (parts table, file numbers for part 2) |
| how long to read; how many days to read | Days table; silent reading at 260 wpm (22 h 25 min) |
| brothers karamazov book 5 chapter 4 [1251] | H3 "How long is the Grand Inquisitor on audio?" ("Rebellion": 4,949 words, 33 min) |
| brothers karamazov book 5 chapter 5; grand inquisitor chapter brothers karamazov; what chapter / where is the grand inquisitor | H2 "Where is the Grand Inquisitor in The Brothers Karamazov?"; FAQ 4 |
| how long is the grand inquisitor; the grand inquisitor audiobook / audio | H3 "How long is the Grand Inquisitor on audio?"; H3 "Can you listen to the Grand Inquisitor on its own?" |
| zosima; book 6; the russian monk | H3 "How long is the Zosima section?" |
| brothers karamazov ivan and the devil; ivan's nightmare | H3 "Where is the chapter about Ivan and the devil?" |
| brothers karamazov fyodor dostoevsky | Second paragraph (Dostoevsky's last novel, serialised 1879 and 1880) |
| the brothers karamazov audiobook youtube | H3 "Is the YouTube Brothers Karamazov audiobook free?" |
| free; librivox; internet archive; full audiobook | H2 "Is there a free Brothers Karamazov audiobook?" and its H3; FAQ 5 |
| abridged; bbc radio 4; radio drama; full cast | H2 "Which Brothers Karamazov audiobooks are abridged or dramatised?" |
| brothers karamazov names and nicknames; character list no spoilers; who is who; character list with nicknames | H2 "How do you keep track of the names in The Brothers Karamazov?" (table, traps) |
| how to pronounce karamazov / alyosha / names pronunciation | H3 "How do you pronounce Karamazov and Alyosha?" and the table's "Say it" column |
| is the brothers karamazov hard to read; crime and punishment or the brothers karamazov | H2 "Is The Brothers Karamazov hard to read?" |
| audiobook with text; read along; read aloud | H2 "Is there a Brothers Karamazov audiobook with text?" |
| grand inquisitor counter / swgoh (Star Wars) | Not answered (off topic, as scout.md says) |
| spotify | "What we could not verify" (not checked) |

## Figures I derived from research data (arithmetic shown)

- Gregory "more than the 3,645 ratings of the other 11 complete recordings in our table": 858 + 484 + 1,437 + 346 + 228 + 153 + 110 + 25 + 2 + 1 + 1 = 3,645. (Research's 3,616 sums seven; adding the Peery listing's 42 would give 3,687, still under 5,910.)
- "About seven times Thompson's count": 5,910 / 858 = 6.89.
- Thompson's 4.9 performance "ties Ben Miles's for the highest of any edition with hundreds of ratings": Thompson 4.9 (858), Miles 4.9 (484), Gregory 4.7 (5,910), Vance 4.7 (438, abridged), Davidson 4.3 (1,437), Covell 4.1 (346), Woolf 4.1 (228).
- "24 years before Ben Miles's": Davidson (P)2000, Miles released 2024.
- "The ten Garnett recordings matched 79 to 95%": samples 78.9 (Covell, Lister, Smith) to 95.1 (Peery). "Under 2%": Thompson 0.2, Miles 0.0, Woolf 1.5.
- "10 of the 13 complete recordings on Audible US": research 1a rows 1 to 13 (Peery included).
- Speed table and days table: research section 4, rechecked: 349,788 / 151 = 2,316.5 min = 38 h 36; / 1.25 = 1,853.2 = 30 h 53; / 1.5 = 1,544.3 = 25 h 44; / 2 = 1,158.2 = 19 h 18. Thompson 2,586 min: 2,068.8 = 34 h 29; 1,724 = 28 h 44; 1,293 = 21 h 33. Gregory 2,224: 1,779.2 = 29 h 39; 1,482.7 = 24 h 43; 1,112 = 18 h 32. Pirie 2,377.8: 1,902.3 = 31 h 42; 1,585.2 = 26 h 25; 1,188.9 = 19 h 49. Miles 2,536: 2,028.8 = 33 h 49; 1,690.7 = 28 h 11; 1,268 = 21 h 8. Days at 30 min: 77.2, 61.8, 51.5, 38.6, rounded up 78, 62, 52, 39; at 60 min: 39, 31, 26, 20.
- Pirie at one hour a day: 2,377.8 / 60 = 39.6 → 40; / 1.25 → 31.7 → 32; / 1.5 → 26.4 → 27; / 2 → 19.8 → 20.
- Parts table chapters: Books of 5, 8, 11 = 24; 7, 7, 3 = 17; 4, 8, 9 = 21; 7, 10, 14 = 31; Epilogue 3; total 96. Words sum 69,503 + 77,054 + 83,306 + 110,575 + 9,350 = 349,788. "Book IV, Chapter 1 is file 25": 24 + 1. "Part III starts at file 42": 24 + 17 + 1.
- Book XII "about 5 hours 4 minutes": 45,840 / 151 = 303.6 min.
- "1.72 times as long": 349,788 / 203,197 = 1.721. War and Peace "1.6 times longer again": 561,870 / 349,788 = 1.606.
- "More than twice as many chapters": 96 / 41 = 2.34.
- Average chapter "about 24 minutes": 3,644 / 151 = 24.1.
- Grand Inquisitor: "about 31%" = 30.8%; "roughly 12 hours" = 11 h 54 at 151 wpm and 12:13:52 in Pirie; 9,287 / 151 = 61.5 → 62 min; / 1.25 = 49.2 → 49; / 1.5 = 41.0 → 41. With Rebellion: 14,236 / 151 = 94.3 = 1 h 34; Pirie 33:39 + 59:15 = 1:32:54. Rebellion 4,949 / 151 = 32.8 → 33. Book V 32,812 / 151 = 217.3 = 3 h 37. Longest speech 4,549 / 151 = 30.1.
- Next longest: "The Duel" 9,153 / 151 = 60.6 → 61; Ivan's Nightmare 7,941 / 151 = 52.6 → 53 ("third longest"); "An Onion" 7,818 / 151 = 51.8 → 52.
- Zosima: 21,761 / 151 = 144.1 = 2 h 24; last two chapters 15,389 / 151 = 101.9 = 1 h 42; Pirie 42:20 + 59:18 + 42:24 = 2:24:02.
- Peery "within a quarter of a second": the largest gap in research 2c is 0.24 s.
- Parolita Pirie "39 hours 9 minutes": 39:08:42.
- "Five of the six entries" on the group reading's archive.org page are five-star: research 2a.
- "Seven listings ... cut, retold or dramatised": the seven rows of the abridged table (Debra Winger's unverified abridgement left out).
- "About a dozen smaller recordings" on Apple Books: Farrow, Joyce, Johnson, Jarmaine, Squire, Myers, Overbaugh, Croft, Bryant, Ring, Liberty (11), plus the Parolita Pirie named separately.
- metaDescription "43 hour 6 minute" = Thompson's runtime.

The research and the brief agree on every pick figure. The brief's "Ben Miles (Macmillan, 2024)" is "Macmillan Audio" in the H3, as the research and the picks card name the publisher.

## Research items left out, and why

- Bruce Peery: the Reddit "is it AI" thread, the "Only on Audible" tag, Audible Plus and the "US Minerva" plan, the McDuff blurb on a Garnett recording, the Apple listing. The brief asked for one neutral sentence; these add accusation or unverified plan detail.
- The archive.org "Victorian Vault" upload, YouTube copies of commercial recordings, compendium.audio, loudreader: never mention (brief).
- The Version 1 / Version 3 Grand Inquisitor files differing by 0.03 s: not for the post (notes.md item 9).
- Mike Joyce ("DO NOT get" on Reddit), Davidson's harshest quotes ("snooty", "drives me bananas") and the 2013 "high class English" quote: negative or duplicative; one neutral Davidson quote kept.
- Debra Winger's abridged P&V: unverified (not in today's sweep).
- Icon full-cast Grand Inquisitor (1 h 34 min) and Thomas Brandon: cut for length; Gutenberg #8578 reading ease 64.2: cut for length.
- Collections (Harding, Theis, Connell), Giuliano "Redux", AI-voice and "adapted" listings: named generally in "Listings we left out".
- Chukovsky on Garnett (already in the C&P post), the Freud line, Garnett's speed anecdote: not needed.
- Emery and Geballe (brain fever) and Geballe (Zosima's corpse): spoiler-adjacent.
- Wikipedia's claim that the BBC version omits the Grand Inquisitor: unverified; listed under "What we could not verify".
- Google Play 4.8 (11 reviews) and Apple 4.6 (283) for Thompson; Gregory's $64.99 Apple price: cut for length.
- Competitor errors (We Love Translations' Miles runtime and Pirie version, thebooksinsider's 24.3 hours, annotatedebooks' nicknames): the post states the right facts without naming them; the nicknames point is kept as "Fewer pet names than some guides list".
- Hallow's Lent "Pray40" plan and The Free Press article: only the translation fact is needed.
- Davidson's hoopla runtime (33 h 18 min against Audible's 34 h 52 min): the post uses Audible's.
- Dialogue in the Epilogue (58.4%): left out of the by-part sentence for brevity.

## Deviations from the brief, for the reviewer

- **The Grand Inquisitor H2.** The brief's order line reads "where is the Grand Inquisitor and how long is it on audio", and scout.md words it "Where is the Grand Inquisitor, and how long is it on audio?". That is two questions in one H2, against the 2026-11-12 rule (one question per H2, the second as an H3). I used `## Where is the Grand Inquisitor in The Brothers Karamazov?` (the searched "where is the grand inquisitor in brothers karamazov") with `### How long is the Grand Inquisitor on audio?` ("how long is the grand inquisitor"). The H2's one-sentence answer still gives both position and length. If the owner prefers scout's wording, change the H2 line and the matching key in the self-check's `wantH2` and `wantImages`.
- **Two extra H3s under the length H2**: "How many books and chapters are in The Brothers Karamazov?" (the books, chapters and parts family, 158 phrasings) and "Is The Brothers Karamazov longer than Crime and Punishment?" (scout.md's suggestion).
- **Table rows**: the editions table includes Jason Smith, Teddy Garraway and Ralph Lister (1 or 2 ratings each), which research section 10 left out, so that "10 of 13 read Garnett" and "every unabridged recording compared" hold. The Peery listing is not a row; it is the one free-section sentence.

## Open questions for the reviewer or owner

- Best overall: Thompson (owner's call against Gregory, notes.md item 1). The post calls Gregory "most rated" and the pick for Garnett, as the brief says.
- Google People Also Ask and AI Overview for `best brothers karamazov audiobook`, `brothers karamazov translations` and `what chapter is the grand inquisitor in the brothers karamazov` are unchecked (needs a normal browser).
- The editions chart's archive.org rating for the group reading ("5.0 (6)") includes a zero-star note among its six entries.
- Inbound link 1: the hard-to-read append at `best-crime-and-punishment-audiobook.md:161` or scout's wrap at `:155`.

## Reviewer edits (orchestrator, 2026-11-14)

Draft read and approved with these edits to post.md, no other wording changes:

1. Names section, soft-upsell paragraph (line 317): "Seeing each name highlighted as the narrator says it puts it in front of you, and that is why we built HushBook: its character map keeps one card per person, with Mitya and Dmitri Fyodorovitch on the same card." becomes "Seeing each word highlighted as the narrator says it puts the name in front of you, and that is why we built HushBook. Its free character map keeps every name a person goes by on one card: add Mitya once and keep Dmitri and Dmitri Fyodorovitch in his card's notes." (the wording the Crime and Punishment and War and Peace posts publish; the old sentence implied the app merges names by itself).
2. Grand Inquisitor alt (line 176), replaced with the image maker's, since the bar also shows the epilogue: "The Grand Inquisitor, Book V, Chapter 5: chapter 36 of 96, 9,287 words, the longest, 62 min at 1x. It starts 30.8% in, 11 h 54 min at 1x, 12 h 14 min into Bruce Pirie's LibriVox recording. Below, the 12 books and the epilogue by listening time."
3. Read-along alt (line 366): unchanged, must stay at 250 characters or fewer.
4. Hero embed: alt at most 250 characters, `src` `/assets/img/blog/brothers-karamazov-picks.webp`, otherwise identical to `jane-eyre-picks.html`.

Inbound links: the four in "Inbound links" above, each appended to the end of its line, Crime and Punishment at `:161` (not the `:155` wrap); no dateModified bump.

## Wired (2026-11-14)

- Edits 1 and 2 applied by exact-match script (each old string found once). `node registry-entry.mjs` prints OK: title 74, metaTitle 59, metaDescription 156, description 235, cta.heading 55, cta.text 199; alts 240/238/244/238; body 6,210 words (4,895 outside tables), still 28 min; 12 tables, 17 H3s, 76 source links, 7 internal links. No assertion needed changing.
- Hero embed: alt 248 characters, `src` correct, identical to `jane-eyre-picks.html` apart from `src` and `alt` (normalized compare). Card 1400x788, -og 1200x630.
- post.md copied to `content/blog/best-brothers-karamazov-audiobook.md` (`cmp` identical).
- `data/blog-posts.js`: entry inserted first by script (quotes escaped), above Jane Eyre; re-read with `require`: 45 posts, first slug best-brothers-karamazov-audiobook, object equal to `registry-entry.mjs`'s, same field order as Jane Eyre. `llms.txt`: line 41, under the blog line, above Jane Eyre.
- Inbound links appended (line text confirmed first): best-crime-and-punishment-audiobook.md:161, how-to-keep-track-of-characters-in-a-book.md:11, abridged-vs-unabridged-audiobooks.md:32, how-long-is-an-audiobook.md:65. Every appended figure is in the new post (82.0, 1.72, 911, 380, 19 hours 8 minutes, 42 h 16 min, 43 h 6 min, 37 hours 4 minutes). Built pages: each has the link once; each changed line is the old line plus the new sentence; JSON-LD dateModified equals HEAD's on all four (2026-11-11, 2026-10-27, 2026-10-15, 2026-10-20), only `wordCount` moved. `scripts/build-answer-pages.js` has no Crime and Punishment entry in `LABELS`/`RELATED`, so it was left alone and not run.
- `npm run build:blog`: 45 posts, sitemap 85 URLs (new URL added, /blog lastmod 2026-11-14, no other lastmod changed), gtag failed 0. The other 40 post pages changed only in their "Keep reading" and latest-post lists (checked line by line); blog/index.html and feed.xml gained the post.
- Tests one by one: localization, seo-localization, tracking-params, mobile-nav, blur-in-heading-reveal, alternative-pages, blog-pages ("Blog contracts pass for 45 post(s).") and worker pass. seo-preservation ("ar/index.html protected region hash changed", worktree and repository, same three hashes) and seo-repair-contract ("Body baseline worktree routeCount must equal expected route count", 86 !== 26) fail exactly as on a `git archive HEAD` export run today.
- Built page: `<title>` 59 characters, no brand suffix; meta description 156 (og:description the same); og:image and twitter:image `brothers-karamazov-picks-og.webp`; BlogPosting.image the picks card (1400x788); one JSON-LD block (BlogPosting, FAQPage with 7, BreadcrumbList), dates 2026-11-14; hero figure first, above the first H2, the only `fetchpriority="high"`; four body figures each directly after its H2, alts equal post.md; 12 tables, all in `.table-wrap` (12 in the markdown); no markdown leaks (`|`, `**`, `](`, `##`, backticks); no en or em dash in the page text or JSON-LD; all 32 root-relative links and images resolve. No `_tmp-*` files under tools/mockups or assets/img/mockups.
- Recount on a fresh download of Gutenberg #28054 (SHA-256 2e75c187…22fe, same as the research run; header updated September 18, 2026) with `bk-wordcount.py`: 349,788 words, 96 chapters, parts 69,503 / 77,054 / 83,306 / 110,575 / 9,350, the Grand Inquisitor 9,287 words (36th, 30.8%, 11 h 54 min), Book VI 21,761, Mitya 911, Dmitri 380, Alyosha 1,241, Alexey 163, Ivan 714. All match.
- **One figure differs: the Grand Inquisitor's start offset.** The post (line 180), research-platforms.md (line 202), notes-images.md and `scripts/images/grand-inquisitor-tiles.html` say it begins after 107,780 words. `bk-wordcount.py`'s own chapter rows put it after 107,753 (Books I to IV 91,984 plus Book V Chapters 1 to 4: 4,437 + 2,541 + 3,842 + 4,949), and a second method with its own heading strip and tokenizer (`scripts/bk-gi-offset.py`, new) gives 107,753 too (107,777 if the five book headings were counted, 107,994 with every heading line). Every rounded figure built on it is unchanged: 30.805% is 30.8%, 713.6 min is 11 h 54 min, "about 31%", "roughly 12 hours", and the image's tiles. Not changed in the post; owner's or reviewer's call (107,753 would be the number to print).
- Social kit: entry added at the top of `tools/social/kit.data.mjs` (folder 'Brothers Karamazov', facts from the registry entry only: Thompson 43 h 6 min, Pirie 39 h 38 min, 38 h 36 min at 1x and 25 h 44 min at 1.5x, the Grand Inquisitor's chapter and about 62 minutes, McDuff and Pevear and Volokhonsky translators). `node tools/social/kit.mjs karamazov` wrote `Originals/social-kit/1 Brothers Karamazov/` (card PNG, Instagram square, caption.txt), X text 242 of 280.
- Not staged, not committed.
