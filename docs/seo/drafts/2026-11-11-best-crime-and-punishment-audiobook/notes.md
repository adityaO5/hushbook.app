# Writer notes: best-crime-and-punishment-audiobook (2026-11-11)

Files: `post.md`, `registry-entry.mjs` (run `node registry-entry.mjs` for the self-check), `llms-line.txt`. Nothing outside this folder was touched; no build, no commit.

## Measured (from `node registry-entry.mjs`, last run passed "OK")

- Body words 3,799 (prose outside tables 3,106), so readingTime "17 min read" (3,799 / 220 = 17.3).
- title 87, metaTitle 59, metaDescription 157, description 231, cta.heading 40, cta.text 191 characters.
- First sentence 23 words. Takeaways 30/31/31/29/31 words. FAQ answers 35/34/31/32/29/30 words.
- 12 H2s plus Sources, 3 H3s, 6 tables, 3 wide images, 58 source links, 6 internal links (all exist in content/blog/).
- Every number in takeaways, FAQ answers, metaDescription and description appears in the body (script check).
- En and em dashes: 0 in post.md, registry-entry.mjs and llms-line.txt (counted with a node regex, not grep).
- Banned phrases (AI filler, "tap any word", "misspel", "cannot open", "won an Audie", "Earphones", "twelve monthly"): none.
- Images not on disk yet (the image agent's job): crime-and-punishment-audiobook-editions.webp, crime-and-punishment-audiobook-length.webp, crime-and-punishment-read-along.webp.

## Decisions

- **Picks.** Best overall Anthony Heald (research-platforms section 7). Best free LibriVox Version 3, Mark Nelson. Best modern translation Bill Homewood (P&V), with Don Warrington (Ready) for Penguin Classics readers. Runners-up Will Poulter and Constantine Gregory. All checked against research-platforms 1a and 7.
- **McDuff H2.** States only: PRH's McDuff page carries a 2005 "Abridged Audiobook Download" by Alex Jennings, 5 h 15 min, naming no translator; Penguin UK's McDuff page lists no audio; Penguin's unabridged audio (2020, Warrington) credits Oliver Ready. "Probably why people search" is hedged, as in research-evidence (f).
- **Date format.** The brief said prices and ratings "as of 11 November 2026". I used "November 11, 2026" because AEO checklist item 9 asks for one date format and the approved Monte Cristo post uses "November 10, 2026". Swap if the owner wants day-month.
- **Competitor corrections, no names.** Guidall reads Garnett (not P&V); the P&V recording on sale is Homewood's 28 h 4 min (the 25 h figure was Batchelor's withdrawn 2020 recording). Framed as "Two facts often get mixed up."
- **Owner's no-negatives rule over AEO checklist item 12.** No HushBook limits anywhere. Closing line scoped: "HushBook works with free public domain recordings and audio files you own without DRM." (same line as the live Monte Cristo post). cta.text has no limitation clause (the live Monte Cristo cta had one removed).
- **HushBook mentions before the closing section:** the four LibriVox rows of the comparison table ("HushBook Discover", from research-platforms section 8) and one value-first hint in the names section (word highlighting plus the free character map). Closing H2 is phrased as the searched question "Is there a Crime and Punishment audiobook with text?".
- **Discover wording.** The post never says Discover names Mark Nelson (it shows "Reader not listed"); it says pick "Crime and Punishment (Version 3)", the 22-hour one, and for Version 2 the bare-titled one at 19 h 53 min.
- **Quotes from in-copyright translations:** one sentence each, the horse-dream line from Dralyuk (LARB 2015) for McDuff, P&V and Ready. No other in-copyright translation text.
- **Quotes with dashes trimmed** so none appear even inside quotes: Chukovsky ends at "mowed in the English manner"; A. N. Wilson's "colloquial, compellingly modern" stops before his dash; Morson is quoted only as "Potemkin translations".
- **Studies.** Five used (Clinton-Lisell 2022 and 2023, Varao Sousa 2013, Hui and Godfroid 2026, Richardson 2020), reported both ways, with no claim that reading along improves comprehension (research-evidence do-not-claim 14).
- **Sources titles.** Evidence sources use the exact titles in research-evidence.md. Store pages (Audible, Naxos, LibriVox, hoopla, Kobo) have no recorded page titles in research-platforms.md, so they are labelled descriptively ("Audible, Crime and Punishment (Anthony Heald, Blackstone)") rather than presented as exact titles. Reddit 8s43ve has no recorded title; labelled "thread on Crime and Punishment versions (2018)".
- **Internal links (6, the cap):** how-long-is-an-audiobook, audiobook-listening-speed, best-count-of-monte-cristo-audiobook, how-to-read-classics-without-getting-bored, how-to-keep-track-of-characters-in-a-book, is-librivox-safe-and-legal. Left out for the cap: does-reading-along-with-an-audiobook-help, abridged-vs-unabridged-audiobooks, how-to-play-m4b-files, free-read-along-audiobooks.

## Research facts left out, and why

- Serialisation in 8 issues of The Russian Messenger (and Wikipedia's wrong "twelve"): true and verified, but not about audiobooks.
- Amazon "Add audiobook" and Whispersync data tags: US price and pairing unverified; competitor features with no value to this post.
- HushBook e-book sync with the Gutenberg #2554 text: first sync free then Pro, and labelled beta in the app; mentioning it cleanly would need a caveat.
- "Transcribe on my PC" (Pro): not needed; the Windows app's own free transcription is mentioned instead.
- Heald "almost muffled" Reddit comment: used only in its positive form (listeners with hearing difficulty preferred Rintoul or Cameron).
- Poulter "4.9 from 993" (research section 7) conflicts with the table's 1,061 ratings; I used 4.7 from 1,061 and the 4.9 performance score without a count.
- Foster's 2019 Audie finalist and claimed Earphones Award: Earphones unverified; Foster not a pick.
- Heald won the 2009 Literary Fiction Audie for Elmer Gantry: irrelevant to this book, risks being misread as a C&P win.
- Rodero and Lucas 2023 and Murphy 2022: not needed for this post.
- Russian-language recording (Gerasimov), Russian name inflection detail beyond the table, translation history (Magarshack, Kropotkin, Coulson years): unverified years or off-topic.
- Opening sentences of modern translations: unverified (PRH data error), not quoted.

## For the orchestrator or owner to decide

1. **Image 3 alt text** assumes the render shows the player plus Part I, Chapter 1 read-along opening "On an exceptionally hot evening early in July a young man came out of the garret", with the current word underlined. Match it to the actual webp (and name the underlined word, as the Monte Cristo alt did).
2. **Discover build.** research-platforms do-not-claim 16: Discover results are from source HEAD c0040d1 (1.3.5+70). Confirm the live store build is 1.3.5 (70) or newer before publishing the closing section's Discover steps.
3. **Date format** (above).
4. Optional cross-links into this post from how-to-keep-track-of-characters-in-a-book, how-to-read-classics-without-getting-bored and best-count-of-monte-cristo-audiobook are listed in scout.md (link-only edits, no dateModified bump). The abridged post link is also justified now that abridged editions are confirmed.
