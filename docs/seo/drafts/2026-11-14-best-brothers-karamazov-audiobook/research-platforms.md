# Platform research: best Brothers Karamazov audiobook

Post slug: `best-brothers-karamazov-audiobook`. Researched November 14, 2026. Every claim carries a source, the date read (November 14, 2026 unless a line says otherwise) and **VERIFIED** (opened and seen today) or **UNVERIFIED**. **OUR CALCULATION** = produced by a saved script on a saved text or file. **OUR TRANSCRIPTION** = speech recognition of an Audible sample (faster-whisper; close but not word-perfect). Prices and ratings change; each is a snapshot of 2026-11-14.

Scope: what a listener can get (editions, which translation each reads, free recordings, listener opinion, HushBook, competing pages), plus the book data the comparison needs (word count, structure, the Grand Inquisitor and the long chapters, names and pronunciation). The book's history, translation scholarship and the read-or-listen studies are in `research-evidence.md`.

## How pages were read

Same methods as `../2026-11-13-best-jane-eyre-audiobook/research-platforms.md`, plus the translation layer of `../2026-11-11-best-crime-and-punishment-audiobook/` (transcribe each Audible sample and match it against the public-domain text). Scripts copied and adapted into `scripts/` here (each names its parent in its header). Raw responses stay in the session scratchpad (`6a2c6b29…/scratchpad/book/`: `gate/`, `ac/`, `serp/`, `pages/`, `aud-cat/`, `aud-prod-us/`, `aud-prod-uk/`, `render/`, `render-hoopla/`, `apple/`, `od/`, `lv-detail/`, `ia/`, `discover/`, `reddit/`, `audies/`, `kindle/`, `wikt/`, `ev/`, `ev-oa/`, `ev-crossref/`, `hallow/`, `samples-out/`, and download folders `dl-gutenberg-28054/`, `dl-gutenberg-28054-html/`, `dl-gutenberg-2554/`, `dl-gutenberg-8578/`, `dl-samples/`, `dl-pirie/`, `dl-gi-check/`, `dl-hallow-pdf/`), outside git. Python ran with `-I`; every download went into its own new folder.

- **Audible catalogue API** (no auth), `.com`, `.co.uk`, `.ca`, `.com.au`, 31 keyword sets ("brothers karamazov", "+dostoevsky", "+dostoyevsky", "+unabridged", "the karamazov brothers", every translator, every narrator found, "+naxos", "+penguin classics", "+bbc", "+full cast", "+dramatisation", "+abridged", "grand inquisitor", "dostoevsky/dostoyevsky collection", "karamazov", "+bicentennial"), 2 pages each: 618 Dostoevsky products (`scripts/bk-audible-catalog.mjs`). Product records for 28 US and 5 UK ASINs (`scripts/bk-audible-products.mjs`, tabled with `scripts/bk-audible-table.mjs`, dumped with `scripts/audible-product-dump.mjs`). Prices are the API's list price.
- **Audible product pages** rendered in headless Chrome (`headless: true`, `channel: 'chrome'`, `chromiumSandbox: true`, Playwright through `createRequire('D:/hushbook.app/package.json')`) with `?ipRedirectOverride=true&overrideBaseCountry=true`: Thompson, Miles, Gregory, Davidson, Covell, Woolf, Rintoul, Foster, Cameron, Peery, Vance, Lamberg (`scripts/bk-render.mjs`): offers, top reviews, critic quotes, copyright lines, the `whispersync` data tag. Also rendered: Penguin UK (Thompson), Google Play (Thompson), four hoopla title pages. Libro.fm and Kobo answered HTTP 403 to the renderer: UNCHECKED.
- **Apple Books**: iTunes Search API, 12 terms, and every matching `books.apple.com` page's schema.org data (`scripts/bk-apple.mjs`).
- **Libby / OverDrive**: thunder API for NYPL, LAPL, KCLS, SFPL, Chicago PL, three queries each (`scripts/bk-overdrive.mjs`).
- **hoopla**: headless Chrome, 13 title pages (`scripts/bk-hoopla.mjs`); narrators read from the rendered pages' schema `readBy` where the parser missed them.
- **Amazon Kindle**: 16 Kindle listings read with `scripts/bk-kindle-pairing.mjs`; Amazon served this machine's location (India) and the pages said "Sorry, there was a problem loading this page" where the Audible add-on sits: Whispersync pairing UNCHECKED.
- **Samples**: 21 Audible US sample MP3s, first 150 s transcribed with faster-whisper large-v3-turbo (CPU int8, VAD) and scored by 6-word shingle overlap with Gutenberg #28054 (Garnett), plus a 4-word overlap with the first sentence of nine translations as printed by welovetranslations.com (`scripts/bk_sample_check.py`). A Garnett reading scores 72 to 95% (speech-recognition noise and the transcriber's spellings keep it under 100); other translations score 0 to 5%.
- **Text**: Project Gutenberg #28054 (`scripts/bk-wordcount.py`, `scripts/bk-names-extra.py`), recounted from the HTML edition with a different parser (`scripts/bk-recount.py`); Gutenberg #2554 for the same-script comparison with Crime and Punishment; Gutenberg #8578 (Blavatsky's Grand Inquisitor) to identify a standalone recording.
- **LibriVox**: API (four title queries), catalogue pages, archive.org metadata (including every `reviews` array, printed by `scripts/bk-ia-reviews.py`, and per-file lengths) and advancedsearch (`scripts/bk-librivox-detail.mjs`). **Discover**: the app's own queries rebuilt (`scripts/bk-discover-cards.mjs` first tier, `scripts/bk-discover-expanded.mjs` second tier).
- **Reddit**: Arctic Shift API (`scripts/bk-reddit.mjs`). **Awards**: 31 Audie year pages on audiopub.org (`scripts/bk-audies.mjs`). **Pronunciation**: English Wiktionary parse API (`scripts/bk-wiktionary-ipa.py`; 429 rate limit on the first pass, retried slowly).
- **HushBook**: app source D:\hushbook at HEAD `d2ed665` (2026-11-12 13:13 +0530), pubspec `version: 1.3.5+70` (pubspec.yaml:4), the same HEAD as the Jane Eyre research, so its line references stand; every line cited below was re-read today. The working tree has uncommitted `lib/l10n/app_*.arb` edits in other languages; citations are to HEAD files. Site copy read with `git show HEAD:` at D:\hushbook.app HEAD `ee1f7e7` (2026-11-13 17:53).

---

## 1. Complete (unabridged) recordings

### 1a. Master table (all values read 2026-11-14)

Translation column: "(sample)" = the Audible sample matched that text by the shingle test (1c); "(credit)" = the store names the translator; "(publisher)" = the publisher's text says so. Ratings: Audible overall stars (number of ratings) / performance stars. Runtimes as each store prints them. "wpm" = 349,788 words (our Garnett count, section 4) divided by the runtime, for Garnett recordings only (other translations have other word counts). OUR CALCULATION.

| # | Narrator | Translation (how we know) | Publisher | Release | Runtime | wpm | Audible US rating / perf. | Audible UK rating / perf. | US list price (API) | Where else (checked today) | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | **Luke Thompson** | **David McDuff** (credit: Audible "David McDuff - translator", Penguin UK "David McDuff (Translator)", OverDrive; sample is the end of Dostoevsky's "From the Author" preface in a non-Garnett, non-P&V wording, 1c). Page: "Translated with an Introduction and notes by DAVID McDUFF", "© David McDuff 2003 (P) Penguin Audio 2021" | Penguin Classics | 2021-08-05 | 43 hrs 6 mins (2,586); Apple PT43H6M; OverDrive 43:06:09; Google Play 43 hr 6 min | n/a | **4.7 (858) / 4.9** | 4.7 (250) / 4.9 | $19.32 | CA 4.8 (30), AU 4.8 (59); Apple $12.99, 4.6 (283); Google Play 4.8 (11 reviews); **Libby LAPL 7 copies, 46 holds**; Penguin UK lists Apple Books, Audible, Bookshop.org, Google Play, Hive, Kobo, Libro.fm, Spotify, xigxag | VERIFIED. ASIN 0241533228 (ISBN 9780241533222). Includes McDuff's introduction (Audible summary) |
| 2 | **Ben Miles** | **Richard Pevear & Larissa Volokhonsky** (credit: Audible, Apple, OverDrive; title "(Bicentennial Edition)"; sample = end of "From the Author" then "Part One, Book One, A Nice Little Family", 1c) | Macmillan Audio ("A Macmillan Audio production from Farrar, Straus and Giroux") | 2024-05-07 | 42 hrs 16 mins (2,536); Apple 42:16:14; OverDrive 42:16:20; hoopla 42h 16m | n/a | **4.8 (484) / 4.9** | 4.7 (31) / 4.9 | $37.49 | CA 4.9 (9), AU 4.7 (12); Apple $29.99, 4.8 (46); **Libby LAPL 9 copies, 49 holds**; **hoopla** (title page 16289312) | VERIFIED. B0CKM7JKD1. Audible quotes AudioFile: "Ben Miles's English accent is perfect for the text of this recent, award-winning translation." |
| 3 | **Constantine Gregory** | **Garnett** (credit: Audible "Constance Garnett - translator"; sample 79.4%) | Naxos AudioBooks; "(P)2013 Naxos AudioBooks" | Audible 2012-12-30; Apple 2013-05-01; OverDrive 2013-06-30 | 37 hrs 4 mins (2,224); Apple 37:04:07; OverDrive 37:04:30 | 157 | **4.6 (5,910) / 4.7** | 4.5 (1,022) / 4.7 | $28.16 | CA 4.7 (290), AU 4.6 (250); Apple $64.99, 5 (2); **Libby LAPL 5 copies (1 available), KCLS 6 (18 holds)** | VERIFIED. B00EZAXAF8 (UK B00EZANR7Y). The most-rated Brothers Karamazov on Audible by seven times |
| 4 | **Frederick Davidson** | **Garnett** (sample 81.7%; OverDrive credits "Constance Garnett"; Audible names no translator) | Blackstone; "(P)2000 Blackstone Audio, Inc." | Audible 2009-10-08; Apple and OverDrive 2010-07-21 | 34 hrs 52 mins (2,092); Apple 34:52:36; OverDrive 34:52:47; **hoopla 33h 18m** | 167 | 4.3 (1,437) / 4.3 | 3.9 (85) / 3.8 | $27.49 | CA 4.3 (49), AU 4.6 (20); Apple $22.99; **Libby NYPL 11 copies (34 holds), SFPL 8 (4 holds)**; **hoopla** 10025362 (3.8 from 116, reader Frederick Davidson) | VERIFIED. B002V8LAN0. Its Audible and hoopla pages carry critic quotes written about the Pevear and Volokhonsky translation (Washington Post Book World, Joseph Frank): not about this recording (section 8) |
| 5 | **Gabriel Woolf** | **David Magarshack** (credit: Audible "David Magarshack - translator"; sample 1.5% Garnett, different wording, e.g. "nothing but an ill-natured clown" where Garnett has "an ill-natured buffoon") | RNIB; "Public Domain (P)2009 RNIB" | 2009-03-17 | 37 hrs 50 mins (2,270); Apple 37:51:58 | n/a | 4.1 (228) / 4.1 | 3.8 (74) / 3.4 | $27.49 | AU 5.0 (5); Apple $14.99, 4.1 (33) | VERIFIED. B0035A86I0. Summary: "Please note: This is a vintage recording. The audio quality may not be up to modern day standards." |
| 6 | Walter Covell | Garnett (credit; sample 78.9%) | Jimcin Recordings; "©1987 Jimcin Recordings (P)1987" | Audible 2006-08-28 | 37 hrs 1 min (2,221); Apple 37:03:08 | 158 | 4.0 (346) / 4.1 | 3.5 (19) | $27.49 | Apple $32.99, 4.2 (14) | VERIFIED. B002V1NN78 |
| 7 | Alastair Cameron | Garnett (credit; sample 87.0%, opens on Garnett's first sentence) | A.R.N. Publications; "(P)2016" | 2016-09-15 | 34 hrs 24 mins (2,064); Apple 34:25:18 | 170 | 4.4 (153) / 4.2 | 4.8 (8) | $28.54 | Apple $25.99, 3 (10) | VERIFIED. B01M1221N5 |
| 8 | James Anderson Foster | Garnett (credit; sample 91.9%); "this edition … (AmazonClassics Edition) includes editorial revisions" | Brilliance Audio (AmazonClassics) | 2020-03-03 | 34 hrs 18 mins (2,058); Apple 34:20:43 | 170 | 4.6 (110) / 4.8 | 4.7 (3) | $29.75; plans include **KindleUnlimited** | Apple $23.99, 3.8 (4) | VERIFIED. 1799744744 |
| 9 | David Rintoul | Garnett (credit; sample 86.4%, opens on Garnett's first sentence) | SNR Audio; "(P)2023" | 2023-06-22 | 37 hrs 19 mins (2,239); Apple 37:20:20 | 156 | 4.8 (25) / 4.9 | 4.9 (8) | $30.02 | Apple $19.99; also in SNR Dostoyevsky collections | VERIFIED. B0C8NHYPDZ |
| 10 | **Bruce Peery** (Audible's spelling) | Garnett (sample 95.1%, opens "Book I. The History of a Family. Chapter I. Fyodor Pavlovitch Karamazov"; summary is Penguin's McDuff blurb, wrongly) | Hexagon Tech; "(P)2021 Hexagon Tech" | Audible 2022-09-08; Apple 2025-11-13 | 39 hrs 13 mins; Apple 39:14:55 | 149 | 4.3 (42) / 4.4 | 4.0 (5) | $30.00; plans AccessViaMusic, US Minerva | Apple $10.99, 3.7 (3) | VERIFIED as listed. **The same recording as the free LibriVox Version 3 by Bruce Pirie** (timing test, section 2c) |
| 11 | Ralph Lister | Garnett (sample 78.9%) | Spotify Audiobooks | 2026-08-11 | 40 hrs 22 mins; Apple 40:22:01 | 144 | 5.0 (1) | none | $31.58 | Apple $19.99 | VERIFIED. B0HBPQ1V45 |
| 12 | Teddy Garraway | Garnett (sample 87.7%) | NTMC | 2024-08-30 | 35 hrs 22 mins; Apple 35:22:09 | 165 | 5.0 (1) | none | $30.02 | Apple $12.99, 3 (2) | VERIFIED. B0DFQ49SNG |
| 13 | Jason Smith | Garnett (sample 78.9%) | Stream Readers | 2024-05-14 | 34 hrs 33 mins | 169 | 1.0 (2) | none | $30.02 | Apple $29.99 | VERIFIED. B0CZRNT9P2 |

Totals and range: complete, human-read, single-title recordings on Audible run **34 h 18 min (Foster) to 43 h 6 min (Thompson)**, and **46 h 25 min** for Tony Addison's free LibriVox reading. Garnett recordings read at 126 to 170 wpm, median 157, across 13 (the 10 Garnett rows above plus the three LibriVox sets; `bk-wordcount.py`). The two modern translations run longer (42 h 16 min and 43 h 6 min) and include Dostoevsky's "From the Author" preface (plus McDuff's introduction on Thompson's), which Garnett's translation does not have. OUR CALCULATION.

**Translation count (the answer to "which translation is each audiobook"):** of the 13 complete single-title Audible recordings above, **10 read Garnett**, one each reads **Pevear and Volokhonsky** (Miles), **McDuff** (Thompson) and **Magarshack** (Woolf). All three free LibriVox recordings read Garnett. VERIFIED (1c).

### 1b. Abridged, dramatised, adapted, partial (flag in the post)

| Version | Kind | Publisher, release | Runtime | Ratings / price | Status |
|---|---|---|---|---|---|
| **Simon Vance** | **Abridged** (Audible format "abridged"; credit Garnett; sample 53.6% Garnett with sentences cut: "He would probably have succeeded, but fortunately Adelaida's family circumvented his greediness", OUR TRANSCRIPTION) | Mission Audio, "(P)2005 Mission Audio"; Audible 2009-01-15; OverDrive (Mission Audio, 2005-05-01) | **19 hrs 8 mins**; OverDrive 19:11:43 | US 4.5 (438) / 4.7, $24.10; **Libby LAPL 5 copies (8 holds)**, listed "Abridged" | VERIFIED. B002V8KQUI. welovetranslations calls it the christianaudio abridgement. Reddit (2013) praised it as "the Simon Vance version" without saying it is cut: the post should say plainly that it is abridged |
| Tim Pigott-Smith | Abridged (credit Garnett; sample 72.5% Garnett) | Naxos AudioBooks; Audible 2004-12-26; OverDrive 2004-04-02 | 10 hrs 33 mins; Apple 10:33:42 | US 4.2 (96) / 4.5, $17.98; UK 4.4 (46); Libby NYPL 5 (3 available), LAPL 3 | VERIFIED. B002V0QORU |
| **BBC Radio 4 dramatisation** (Roy Marsden, Paul Hilton, Nicholas Boulton), "Dramatised in five parts by Melissa Murray", "First broadcast on BBC Radio 4 in November 2006" | Radio drama | BBC Audio, inside "The Fyodor Dostoevsky BBC Radio Drama Collection" (2021-03-25) | Collection 17 hrs 28 mins for four novels, three stories and two documentaries; the Karamazov share not stated | US 4.4 (18), $19.32; UK 4.6 (16) | VERIFIED (BBC programme page b00y9455; Audible 1529141796). The collection was a 2022 Audie finalist (audiopub.org 2022 page). Wikipedia says the adaptation "omits the Grand Inquisitor episode": UNVERIFIED (the BBC page does not say) |
| L.A. Theatre Works, full cast (John de Lancie, Sharron Gless, Arye Gross, Harry Hamlin…) | Radio play; Audible "original_recording" | 2010-02-22; OverDrive 2007-08-01 | 2 hrs 15 mins; OverDrive 02:16:11 | US 4.5 (51) / 4.7, $10.55; Libby NYPL 3; hoopla 2h 16m | VERIFIED. B003999U7I |
| L.A. Theatre Works, "The Brothers Karamazov & The Idiot (Dramatized)" (Edward Asner and others) | Two radio plays | 2006-10-25 | 3 hrs 59 mins | US 3.9 (40), $11.78; Libby NYPL 5, KCLS 2; hoopla | VERIFIED. B002V8KWUW |
| Real Reads (Hattie Briggs; Tony Evans's retelling) | Abridged retelling | 2020-08-07 | 37 mins | 5.0 (2), $5.26 | VERIFIED. 1911091514 |
| Sweet Cherry Publishing (Dan Bottomley; Gemma Barder) | Children's retelling | 2026-02-23 | 54 mins | none | VERIFIED. B0GPFKDTRV |
| Debra Winger, Audio Literature, "Abridged version based on the Pevear and Volokhonsky translation" | Abridged | (welovetranslations) | 6h 2m (welovetranslations) | | UNVERIFIED (not in today's Audible, Apple or Libby sweep) |
| **The Grand Inquisitor alone**: Corner Film Productions (Alan Lamberg, Dan Ribaudo) | Partial (the chapter alone; two readers credited); not Garnett (sample 5.2%); page "©2003 Penguin Books, Limited (P)2015 Corner Film Productions" | 2015-11-13 | 1 hr 18 mins; Apple 1:19:06 | US 4.4 (96) / 4.1, $8.87; Apple 4.3 (6) | VERIFIED as listed. Which translation: the 2003 Penguin copyright points to McDuff's revised Penguin text: UNVERIFIED |
| The Grand Inquisitor: Saethon Williams | Partial; **H. P. Blavatsky's translation** (sample opens "Quite impossible, as you see, to start without an introduction," = Gutenberg #8578, translator H. P. Blavatsky) | Integrated Media Systems, 2025-06-02 | 1 hr 2 mins | 5.0 (1), $9.99 | VERIFIED. B0FBNC7KM7 |
| The Grand Inquisitor: LibriVox dramatic reading (Ruth Golding narrator, om123 Ivan, Martin Geeson, Denny Sayers) | Partial, free; Blavatsky's translation per LibriVox | LibriVox 2012-02-05 (id 4465) | 1:17:07 | archive.org 51,713 downloads, no reviews | VERIFIED. HushBook Discover shows it (7a) |
| The Grand Inquisitor: Geoffrey Giuliano, "Full Cast Drama" (Icon Audio Arts) | Partial dramatisation | 2026-07-20 | 1 hr 34 mins | none | VERIFIED as listed; Apple also lists Thomas Brandon (2022, 1:16:26) |
| Collections that contain the novel complete: Michael A. Harding (Montgomery Providence, 96 hrs 12 mins, 4.0 (35)), Kevin Theis (Combray Media, 90 hrs 32 mins, 3.4 (34); sample opens on Garnett's first sentence, 82.5%), Jesse Connell ("translated by Tim Zengerink", 173 hrs 25 mins, 4.4 (73)), SNR collections with David Rintoul | Multi-book bundles | 2019 to 2026 | 90 to 272 h | | VERIFIED as listed; do not recommend for this book |
| "Redux" and "Original Manuscript" (Geoffrey Giuliano, Icon Audio Arts, 39 hrs 32 mins; sample is a reading of famous quotes, not the opening), Victorian-style and AI-voice listings ("Virtual Voice", "AI Voice Bob", "AI Voice Hugh Williams"), "Adapted for Modern Readers", a "2025 Translation" in two Virtual Voice volumes, SuperSummary study guides | Not a human reading of a known complete text, or not the novel | 2024 to 2026 | | | VERIFIED as listed; do not recommend |

**Is any complete full-cast recording on sale?** None found in today's sweep. The dramatised versions (BBC, L.A. Theatre Works) are adaptations. VERIFIED (sweep).

### 1c. What each Audible sample plays (OUR CALCULATION, `scripts/bk_sample_check.py`, run 2026-11-14)

| Edition | Sample length | Sample opens with (OUR TRANSCRIPTION) | Garnett overlap | Translation verdict |
|---|---|---|---|---|
| Luke Thompson | 300 s | "That is to say, at our own present-day current moment. The first novel, on the other hand, took place 13 years ago" … "Well, so much for the preface. I entirely agree that it is superfluous" … "And now to business." | 0.2% | **Not Garnett.** The end of "From the Author", which Garnett's translation does not contain; the wording is not P&V's (compare Miles below); matches the McDuff credit |
| Ben Miles | 300 s | "in our time, that is, in our present, current moment. As for the first novel, it already took place thirteen years ago" … "Well, that is the end of my introduction. I quite agree that it is superfluous, but since it is already written, let it stand. And now, to business." then "Part One. Book One. A Nice Little Family" | 0.0% | **Not Garnett** ("A Nice Little Family", where Garnett's Book I is "The History of a Family"); matches the P&V credit |
| Constantine Gregory | 300 s | "greatly captivated Adelaida Ivanovna's fancy. Fyodor Pavlovich's position at the time made him especially eager" | 79.4% | Garnett, Book I Ch. 1 |
| Frederick Davidson | 300 s | "and a pliable imagination persuaded her we must suppose for a brief moment that Fyodor Pavlovitch in spite of his parasitic position" | 81.7% | Garnett, Book I Ch. 1 |
| Gabriel Woolf | 300 s | "Indeed, had the cliff, which she discovered long before, and which had become her favourite spot, not been so picturesque" | 1.5% | **Not Garnett** (Book I Ch. 1 in other words); matches the Magarshack credit |
| Walter Covell | 600 s | "was preceded by an elopement, and this greatly captivated Adelaida Ivanovna's fancy" | 78.9% | Garnett |
| Alastair Cameron | 292 s | "Alexei Fyodorovich Karamazov was the third son of Fyodor Pavlovich Karamazov, a landowner well known in our district in his own day" | 87.0% (first sentence 98% Garnett) | Garnett, from the first line |
| James Anderson Foster | 300 s | "caused by lack of mental freedom she wanted perhaps to show her feminine independence" | 91.9% | Garnett ("editorial revisions" not visible here) |
| David Rintoul | 230 s | Garnett's first sentence | 86.4% (first sentence 98%) | Garnett, from the first line |
| Bruce Peery | 241 s | "Book I. The history of a family. Chapter I. Fyodor Pavlovitch Karamazov. Alexey Fyodorovitch Karamazov was the third son" | 95.1% (first sentence 87%) | Garnett, from the first line, no LibriVox notice |
| Ralph Lister | 300 s | "was one of the bold and ironical spirits of that progressive epoch" | 78.9% | Garnett |
| Teddy Garraway | 180 s | "three days of the Paris Revolution of February, 1848" | 87.7% | Garnett (Book I Ch. 2) |
| Jason Smith | 300 s | "who is always of a voluptuous temper and ready to run after any petticoat" | 78.9% | Garnett |
| Simon Vance (abridged) | 300 s | "he did his utmost for a long time to transfer to his name. He would probably have succeeded, but fortunately Adelaida's family circumvented his greediness." | 53.6% | Garnett, cut |
| Tim Pigott-Smith (abridged) | 597 s | "drunk when he heard of his wife's death" | 72.5% | Garnett, cut |
| Kevin Theis (collection) | 290 s | Garnett's first sentence | 82.5% | Garnett |
| Alan Lamberg (Grand Inquisitor) | 294 s | "The terrible and clever spirit. The spirit of self-annihilation and non-existence." | 5.2% | Not Garnett |
| Saethon Williams (Grand Inquisitor) | 285 s | "'Quite impossible, as you see, to start without an introduction,' laughed Ivan." | 2.2% | Blavatsky (Gutenberg #8578, line 73) |
| Geoffrey Giuliano "Redux" | 300 s | A string of quotations ("But I should always have my tea." "Man only likes to count his troubles.") | 17.6% | Not a reading of the opening; translation unknown |
| Michael A. Harding (collection) | 239 s | Crime and Punishment, Part I ("On an exceptionally hot evening early in July") | 0.5% | Sample is another novel |
| Jesse Connell (collection) | 167 s | A publisher's promotional introduction | 0.0% | Not identifiable |

**Hear the difference (the same passage in two translations, from the samples).** The end of Dostoevsky's preface, as transcribed:
- Ben Miles (Pevear and Volokhonsky): "Well, that is the end of my introduction. I quite agree that it is superfluous, but since it is already written, let it stand. And now, to business."
- Luke Thompson (McDuff): "Well, so much for the preface. I entirely agree that it is superfluous, but, as it has now been written, let it stay. And now to business." (The transcriber heard "they let it stay"; we read it as "let it stay".)
- Garnett: no preface. Her translation, and so every free recording, starts at Book I, Chapter 1. VERIFIED (Gutenberg #28054 has no "From the Author"; the LibriVox file lists start at "Book 1 Chapter 1").

### 1d. Notes per main edition

- **Luke Thompson (Penguin Classics, 2021, McDuff).** The searched narrator (top completion "the brothers karamazov audiobook luke thompson"). Audible summary: "This Penguin Classic is performed by Luke Thompson, best known for his role in the hit Netflix drama Bridgerton. This definitive recording includes an introduction by David McDuff." Top US reviews: "Best narration performance I've ever heard, which maintained interest and brought the story and characters of this long classic to life."; "What I didn't expect and was delighted to discover was Luke Thompson's masterful performance." Reddit: "The Luke Thompson one may be the best audiobook I've ever experienced" (1c4xs6e, 2024-08-06, 1); "Tried a couple different translations and narrators. Luke Thompson is the standout." (qwc0j2, 2024-03-07, 2); "I am currently listening to the Luke Thompson one and twice now I have paused to re-check that he is indeed doing all the voices?!" (1sh6egj, 2026-04-16, 1); "Luke Thompson is the best narrator." (1qzlvga, 2026-02-12, 1). A 2022 listener disliked the opening chapters (wlyow2: "I got lost in all of the character's names"). The edition that matches Penguin Classics' paperback (Reddit 1pyjtve and qwc0j2 asked exactly this). VERIFIED.
- **Ben Miles (Macmillan Audio, 2024, Pevear and Volokhonsky, "Bicentennial Edition").** The only unabridged P&V audiobook found (a 2015 Reddit thread, 2vj8h6, asked whether one existed; none did then). Audible page: AudioFile quote (above); "Winner of the Pen/Book-of-the-Month Club Translation Prize" (the translation's 1991 prize, research-evidence.md). Ben Miles is "best known for his narration of Hilary Mantel's Wolf Hall trilogy" (Audible summary). Top review: "I loved that the narrator managed to give unique voices to the huge cast of characters. it helped me follow the story in a way I never did trying to read it in print text." Reddit: "Miles transforms into these characters. You can even hear the spit flying when he's speaking as Fyodor!" (1edba6v, 2024-08-28, 1); "the P&V translation (decently read by Ben Miles)" (1sh6egj, 2026-04-10, 1). On hoopla as well as Libby. The US list price ($37.49) is the highest of the main editions. VERIFIED.
- **Constantine Gregory (Naxos, 2013, Garnett).** 5,910 US ratings, more than all other single-title editions combined (Thompson 858, Miles 484, Davidson 1,437, Covell 346, Woolf 228, Cameron 153, Foster 110: 3,616). Top review: "This translation (Garnett) is indeed great for first-timers and Gregory's narration is knockout." Reddit: "I decided to go with the Naxos version read by Constantine Gregory. 4.5 stars with 5,000 reviews." (1ig5a4n, 2025-02-04, 1); "I really like the Constantine Gregory one." (1c4xs6e, 2024-04-16, 2); "the Garnett translation (excellently read by Constantine Gregory)" (1sh6egj, 1). welovetranslations marks him "British male" from the sample. Apple lists it at $64.99. VERIFIED.
- **Frederick Davidson (Blackstone, 2000 recording, Garnett).** 1,437 US ratings at 4.3; divisive: "the narrator's snooty tone of voice with many sentences ending question-like with a rising pitch made it impossible to listen to beyond the first chapter" (Audible review) against "He brings the characters to life." Reddit: "The reader, Frederick Davidson, is British and has a very posh voice." (wlyow2 OP, 2022-08-11); "He sounds high class English but it's that type of book so it fits." (1s0icx, 2013-12-06, 1); "Frederick Davidson … drives me bananas" (2vj8h6, 2015). The most-held in libraries (NYPL 11 copies) and on hoopla. VERIFIED.
- **Gabriel Woolf (RNIB, Magarshack).** The only Magarshack audiobook (Penguin's 1958 translation, now out of print per welovetranslations). RNIB "vintage recording" note. Top review: "Gabriel Woolf's narration is the best of the lot in my opinion. … I prefer British accents for European novels and Woolf's Russian pronunciation is believable." VERIFIED.
- **Bruce Peery (Hexagon Tech).** See 2c. Reddit r/audible thread 1rbumnp (2026-02-22, 4 / 15) asked whether it is AI; the two top replies (12, 10) say it is the LibriVox reading by Bruce Pirie. VERIFIED (thread); identity tested in 2c.

### 1e. Smaller listings (VERIFIED as listed; not recommended without more checks)

Apple Books only (translation not tested): Charles Farrow (Golden Age Audio 2025, 34:14:41, $2.99, 3.9 (7)), **Mike Joyce** (Oregan Publishing 2018, 45:41:09, $0.99, 4 (20); a Reddit commenter: "DO NOT get the version narrated by Mike Joyce", 1c4xs6e, 2024-05-23, 2), Dave Johnson (2021, 39:46:46), Noel Jarmaine (2026, 39:30:05), Alex Squire (2026, 39:29:02), Aaron Myers (2025, 39:23:40), Ashley Overbaugh (2026, 40:36:51), Raphael Croft (four parts, 2025), **Salomon Bryant** (Author's Republic 2018, 46:10:52; hoopla 46h 5m; its hoopla summary is Macmillan's P&V blurb; Libby LAPL 1), Zeke Ring (USC 2025, 32:41:42, hoopla "Adapted For The Contemporary"), Justine Liberty (Ad Astra 2021, 36:38:27; Libby LAPL, hoopla), **Bruce Pirie via Parolita Libro** (2021, 39:08:42, $7.99, 4.6 (41); Libby LAPL 2 copies): the same reader as the free LibriVox Version 3; whether the same recording UNVERIFIED (2c tests the Hexagon one only). Upcoming or AI: see 1b.

### 1f. Translations on audio, and which audiobook matches your edition

English translations (Wikipedia's list, research-evidence.md (b)): Garnett 1912 (revised by Yarmolinsky 1933, Kropotkin 1949 abridged, Komroff 1958, Matlaw 1976, Matlaw and Oddo 2011), Magarshack 1958, MacAndrew 1970, Katzer 1980, Pevear and Volokhonsky 1990, McDuff 1993, Avsey 1994, Katz 2023.

| Translation | Complete audiobook? | Print editions it matches (publisher) | Evidence |
|---|---|---|---|
| Constance Garnett (1912) | **Yes, many**: Gregory, Davidson, Covell, Cameron, Foster, Rintoul, Peery, Lister, Garraway, Smith; free: three LibriVox sets | Project Gutenberg #28054, Modern Library, Dover, Wordsworth, Barnes & Noble, AmazonClassics (with "editorial revisions"), Xist, and **the 2026 Hallow Edition** ("Constance Garnett (Translator), Alex Jones (Foreword)", Goodreads; "Translated from Russian by Constance Garnett", sacrestar.com) | VERIFIED (samples, credits, Goodreads, sacrestar) |
| Garnett revised by Matlaw (Norton Critical, 1976; with Oddo 2011) | No recording found that reads the revision (every Garnett sample that reached the first sentence read "gloomy and tragic death", the 1912 wording; the revision reads "tragic and obscure death … exactly thirteen years ago") | Norton Critical Edition | VERIFIED for the samples that reached the first sentence (Cameron, Rintoul, Peery, Theis) |
| Pevear and Volokhonsky (1990) | **Yes: Ben Miles (2024), unabridged.** Debra Winger abridgement (welovetranslations): UNVERIFIED | Vintage Classics, Farrar, Straus and Giroux "Bicentennial Edition", Everyman's Library, North Point Press (1990) | VERIFIED (credits, sample) |
| David McDuff (1993; Penguin text "© David McDuff 2003") | **Yes: Luke Thompson (2021)**, unabridged, with McDuff's introduction | Penguin Classics (the "Penguin Black Classics" edition Reddit asks about) | VERIFIED (credits, Penguin UK, sample) |
| David Magarshack (1958) | **Yes: Gabriel Woolf (RNIB, 2009)**, unabridged | Penguin Classics 1958 (out of print per welovetranslations) | VERIFIED (credit, sample not Garnett) |
| Ignat Avsey (1994, "The Karamazov Brothers") | **None found** | Oxford World's Classics (Kindle B008C80UIY) | VERIFIED absence: Audible US/UK/CA/AU keyword "brothers karamazov avsey" and "the karamazov brothers", Apple, Libby (5 systems), hoopla, 2026-11-14. Reddit qqnskv (2021) asked and found none |
| Michael R. Katz (2023) | **None found** | Liveright / W. W. Norton (Kindle B0BHPRKQW8, "The Brothers Karamazov: A New Translation by Michael R. Katz"); LRB: "Liveright, 900 pp., £15.99, July 2024" (UK paperback) | VERIFIED absence (same sweep, "brothers karamazov katz"). Autocomplete asks for it ("katz audiobook", "translated by michael katz audiobook") |
| Andrew R. MacAndrew (1970) | **None found** | Bantam Classics (Kindle B005PRF4Z4) | VERIFIED absence (same sweep) |
| Julius Katzer (1980) | None found | Progress / Raduga (Moscow) | VERIFIED absence (same sweep) |

**Matching an edition for reading along:** Penguin Classics (McDuff) → Thompson; Vintage, FSG Bicentennial, Everyman's (P&V) → Miles; any Garnett edition, including Hallow's → Gregory, Davidson, the others, or a free LibriVox reading; Oxford (Avsey), Liveright (Katz), Bantam (MacAndrew) → no matching audiobook. Note that Garnett-based editions differ in small ways (AmazonClassics says it "includes editorial revisions"; whether Hallow's text is edited UNVERIFIED). Kindle Whispersync pairing for these editions UNCHECKED (1, "How pages were read").

**The Hallow question.** Autocomplete has "the brothers karamazov hallow edition audiobook", "brothers karamazov reading plan hallow", "brothers karamazov lent reading plan". The Hallow Edition was the book for Hallow's Lent 2026 "Pray40: The Return" (try.hallow.com; The Free Press, 2026-02-26, "'The Brothers Karamazov' Helped Inspire the Catholic App Hallow"; Goodreads 4.41 from 392 ratings). It prints Garnett's translation, so any Garnett audiobook reads the same translation. Whether the Hallow app itself offers an audio reading: UNVERIFIED (its reading-plan PDFs are image-only).

---

## 2. Free recordings

### 2a. LibriVox (all Constance Garnett, all source text Project Gutenberg #28054)

VERIFIED today: LibriVox API (`translators: Constance Garnett`; `url_text_source` gutenberg.org 28054 for all three), catalogue pages, archive.org metadata (reviews array read in full; per-file lengths) and advancedsearch (downloads).

| Set | LibriVox id, archive.org item, archive.org title | Readers | Runtime | Sections | Catalog date | 64 kbps download (app format) | archive.org downloads | Reviews |
|---|---|---|---|---|---|---|---|---|
| **Version 3** | 13837, `brothers_karamazov_v3_2002_librivox`, **"The Brothers Karamazov (version 3)"** | **Bruce Pirie** alone (also coordinator) | **39:37:50** | 96 ("01 - 01.01 Fyodor Pavlovitch Karamazov" … "96 - Ep.3 Ilusha's funeral. The speech at the stone") | 2020-02-21 | 1.1 GB (1,142,648,118 bytes); zip 1114 MB (catalogue page) | 333,073 | 2: "One of the greatest books ever written, and the narrator is extraordinarily good. THANK YOU…" (TORON DRAKRENO SERAKO, 5, 2026-08-08); and knarf111's review (5, 2024-06-14), posted word for word on Version 1's page too ("The reader is good, but no one can do justice verbally to the immense cast of characters") |
| Version 1 (group) | 743, `brothers_karamazov_1002_librivox`, **"The Brothers Karamazov"** | 27 readers (coordinator "Rainer"); the Grand Inquisitor chapter is read by Bob Sherman | 37:55:17 | 96 ("01 - Book 1 Chapter 1 - Fyodor Pavlovitch Karamazov" …) | 2010-02-04 | 1.0 GB (1,092,631,250 bytes) | **1,108,829** | 6 entries: 5 five-star ("this well done reading" Kevint60 2012; "huge turgid thing that it is. Loved having it read to me!" zobert 2013; "Great reading!" 2014; "this is well read, for the most part." 2015; knarf111 2024) and one zero-star note "Translated by... Constance Garnett" (torgman, 2013) |
| Version 2 | 10890, `brotherskaramazov2_1606_librivox`, **"The Brothers Karamazov"** (archive.org drops "version 2") | **Tony Addison** alone | 46:24:44 | 97 ("01 - Book One, Chapter One" …; the Grand Inquisitor in two files, "Book Five Chapter Five Part One" and "Part Two") | 2016-06-30 | 1.2 GB (1,336,798,720 bytes) | 208,197 | none |
| The Grand Inquisitor (dramatic reading) | 4465, `grand_inquisitor_1202_librivox` | 4 readers: Ruth Golding (narrator), om123 (Ivan), Martin Geeson, Denny Sayers (coordinator, d. 2015) | 1:17:07 | 3 parts | 2012-02-05 | 35 MB | 51,713 | none |
| Spanish, "Los hermanos Karamázov" | `hermanoskaramazov_2604_librivox` | | 33:59:30 | | 2026-04-16 | | 19,847 | |

**Accent:** welovetranslations.com, from the samples: Bruce Pirie "American male", Tony Addison "British male". Reddit: "It was read by Bruce Perry and was wonderful. The only problem being his gentle voice I could sometimes drift off to sleep on the bus" (1sh6egj, 2026-04-12, 1). No archive.org review mentions an accent. Say "according to We Love Translations".

**Which free set to pick:** Version 3 (Pirie): one voice throughout, the only free set whose title carries its version, 96 files that match the book's 96 chapters one to one, 39 h 38 min (147 wpm), praised on archive.org and Reddit, and the same reader Audible sells in its Plus catalogue (2c). Version 2 (Addison) is the other solo reading but runs 46 h 25 min (126 wpm, the slowest complete recording) and shares Version 1's title in apps. Version 1 changes reader by chapter. Days to finish Pirie at one hour a day (39:37:50 ÷ speed, rounded up): 40 at 1x, 32 at 1.25x, 27 at 1.5x, 20 at 2x. OUR CALCULATION.

### 2b. Where the Grand Inquisitor sits in each free recording (OUR CALCULATION from archive.org file lengths, `scripts/bk-librivox-detail.mjs`)

| Recording | File | Starts at | Length |
|---|---|---|---|
| Version 3, Bruce Pirie | 36, "05.05 The Grand Inquisitor" | **12:13:52** (30.9% in) | **59:15** |
| Version 1, group (Bob Sherman) | 36, "Book 5 Chapter 5 - The Grand Inquisitor" | 11:25:02 (30.1%) | 59:15 (3555.86 s; Pirie's is 3555.89 s) |
| Version 2, Tony Addison | 36 and 37, "Book Five Chapter Five Part One / Part Two" | 15:22:21 (33.1%) | 1:18:31 (17:17 + 1:01:14) |

Book VI ("The Russian Monk", Zosima) in Pirie's files: 39 to 41, 42:20 + 59:18 + 42:24 = **2:24:02**, starting at 14:05:45. Matches our 2 h 24 min at 151 wpm. "Rebellion" (Book V, Ch. 4) in Pirie's files: 33:39, starting at 11:40:13. VERIFIED (archive.org lengths).

Oddity for the owner (notes.md): the Grand Inquisitor files of Version 1 (Bob Sherman) and Version 3 (Bruce Pirie) differ in length by 0.03 seconds. The first 500 KB of each differ byte for byte; whether one reused the other's recording is UNVERIFIED (not needed for the post; Version 3's catalogue credits Pirie for all 96 sections).

### 2c. Is Audible's "Bruce Peery" recording the free LibriVox Version 3? (OUR CALCULATION, `scripts/bk_same_recording.py`)

Method: the Audible sample (241 s, opens on Book I, Chapter 1) and the first 2.5 MB of LibriVox Version 3's first file (`brotherskaramazov3_01_dostoyevsky_64kb.mp3`, downloaded into its own folder) were transcribed with word timestamps; nine sentence openings of Garnett's Book I, Chapter 1 were found in both, and the time from the first to each later one was compared. Different readings, or different takes by one reader, drift apart by seconds over two minutes.

| Anchor (start of a Garnett sentence) | Audible "Bruce Peery" | LibriVox Pirie | Difference |
|---|---|---|---|
| "Alexey Fyodorovitch Karamazov was" | +0.00 s (at 6.62 s) | +0.00 s (at 26.68 s) | |
| "For the present I will" | +19.74 s | +19.86 s | +0.12 s |
| "But he was one of" | +37.90 s | +38.04 s | +0.14 s |
| "He ran to dine" | +53.32 s | +53.44 s | +0.12 s |
| "At the same time he" | +63.74 s | +63.86 s | +0.12 s |
| "I repeat, it was" | +70.96 s | +71.08 s | +0.12 s |
| "He was married twice" | +83.06 s | +83.18 s | +0.12 s |
| "How it came to pass" | +105.12 s | +105.36 s | +0.24 s |
| "I knew a young lady" | +126.18 s | +126.20 s | +0.02 s |

**Result: the same recording.** Over 126 seconds every gap matches within 0.24 s (word timestamps are approximate to about a tenth of a second); the LibriVox file has about 20 seconds more at the start (its spoken LibriVox notice), which the Audible version does not have. With the reader's name (Pirie / Peery), the runtimes (LibriVox 39:37:50 with a notice on each of 96 files; Audible 39 h 13 min) and the two top Reddit replies (1rbumnp), this is strong evidence that Audible's Hexagon Tech listing is Bruce Pirie's free LibriVox reading under a misspelled name. OUR CALCULATION (`scripts/bk_same_recording.py`, run 2026-11-14; output in the scratchpad `samples-out/peery-vs-pirie2.txt`). Only the opening two minutes were compared. LibriVox recordings are public domain, so re-selling one is allowed; the post may say "the same reading is sold on Audible as Bruce Peery" (owner's call, notes.md).

### 2d. Other free routes (read today)

- **Audible Plus**: the Hexagon Tech "Bruce Peery" listing carries the plan "US Minerva" in the API, and Reddit (1rbumnp, 2026) says it is "included in the Audible Plus catalog". Which plan "US Minerva" is: UNVERIFIED. Davidson's Blackstone recording was in Audible's free catalogue in 2022 (Reddit wlyow2) and "Audible clawed it back" from one listener in 2024 (199rjpm): rotating; no current claim.
- **Kindle Unlimited**: Foster's AmazonClassics listing carries a "KindleUnlimited" plan in the API (snapshot; UNVERIFIED as an offer). A Goodreads reviewer (2026-03-12) of the Hallow Edition: "ebook and audiobook available on KU" (which audiobook not said).
- **YouTube**: a "[Audiobook + Text]" playlist (PLqPQQc4SlnxLOYkLdm1me-_n3DlK3sCdW) and a "Complete Audiobook (35.5 …)" video (cnEd3NHQuj4) rank; channels and sources not checked. A Reddit listener found "a Libra vox recording on YouTube in four segments … read by Bruce Perry" (1sh6egj). Post wording as in the Jane Eyre post: "YouTube uploads exist; the free recordings they usually copy are on LibriVox."
- **archive.org "Victorian Vault" upload**: see notes.md (owner only). Not in Discover (7a).
- **Machine-voiced free sites in the SERP**: loudreader.io ("Listen free on Mac and iPhone", device voices, "about 38 hours"), compendium.audio ("33 hr 36 min · 96 chapters · Narrated in full · Text on screen as you listen", first chapter free, then "Premium"), tinybooks.ca, freeclassicebooks2audiobooks.com, hotaudio.com (TLS error). Not human readings: do not recommend (Rodero and Lucas 2023, research-evidence.md).
- **Project Gutenberg #28054** is the free text all three LibriVox sets read. VERIFIED.
- Spotify (album 69H3oyC7nSU5ZjFkMt9kV8 ranks for two queries): publisher not visible without login: UNCHECKED.

---

## 3. The Grand Inquisitor, Book VI and the long chapters (OUR CALCULATION, `scripts/bk-wordcount.py`, recounted by `scripts/bk-recount.py`)

This is the extra original-data angle. Why it was chosen: the Grand Inquisitor family is the largest book-specific family after translations (73 phrasings about the novel, three top completions: "book 5 chapter 4" [1251], "book 5 chapter 5" [1250], "grand inquisitor chapter brothers karamazov" [1250]); Zosima / Book VI adds 13; every ranking page (LitCharts, SparkNotes, CliffsNotes, Wikisource) gives "Book 5, Chapter 5" and nothing about length or where it falls in a 38-hour listen. The names angle is covered by the names table (section 5); the "is it hard" angle by section 4.

- **Where:** Part II, Book V ("Pro and Contra"), Chapter 5, "The Grand Inquisitor": **the 36th of 96 chapters.** It starts after 107,753 of 349,788 words (corrected at wiring from 107,780, see wiring.md), **30.8% of the way in: about 11 h 54 min into the book at 151 wpm**, and 12 h 14 min into Pirie's free recording (2b). VERIFIED by both counts (plain text and HTML agree on 9,287 words and 30.8%).
- **How long:** **9,287 words, the longest chapter in the book**: about **62 minutes at 151 wpm** (49 min at 1.25x, 41 min at 1.5x); Pirie's file runs 59:15. Next longest: Book VI, Ch. 2 "The Duel" (9,153 words, 61 min), Book XI, Ch. 9 "The Devil. Ivan's Nightmare" (7,941, 53 min), Book VII, Ch. 3 "An Onion" (7,818, 52 min), Book X, Ch. 5 "By Ilusha's Bedside" (6,653, 44 min).
- **Rebellion first:** Book V, Ch. 4 "Rebellion" (the chapter before; "book 5 chapter 4" is the 1251 completion): 4,949 words, about 33 min (Pirie 33:39). The two together: **14,236 words, about 1 h 34 min** at 151 wpm (Pirie 1:32:54).
- **One long speech:** 56.2% of the chapter's words sit inside quotation marks, and one unbroken stretch of quoted speech runs **4,549 words, about 30 minutes** at 151 wpm, the longest in the novel (a heuristic: consecutive paragraphs that open a quotation without closing it).
- **Book VI, "The Russian Monk" (Zosima):** 3 chapters, **21,761 words, 6.2% of the novel, about 2 h 24 min** at 151 wpm (Pirie 2:24:02), starting 35.7% in. Chapters 2 and 3 alone (Zosima's life and teachings as Alyosha wrote them down, per the chapter's own opening): 15,389 words, about 1 h 42 min.
- **Book V as a whole** ("Pro and Contra", 7 chapters): 32,812 words, 9.4%, about 3 h 37 min, starting 26.3% in.
- **Standalone recordings of the chapter:** Corner Film Productions 1 h 18 min (4.4 from 96 US ratings, not Garnett), Saethon Williams 1 h 2 min (Blavatsky), LibriVox dramatic reading 1:17:07 (Blavatsky, free), Icon full-cast drama 1 h 34 min (1b). Gutenberg #8578 is Blavatsky's 1881 translation of the chapter on its own (reading ease 64.2). VERIFIED as listed.
- **Spoiler check:** chapter titles, positions and lengths only. Nothing about what the Inquisitor decides or how the chapter ends goes in the post (the LRB essay quotes the ending: do not reuse).

---

## 4. Own data: length, structure, pace, "is it hard" against Crime and Punishment

Source: https://www.gutenberg.org/cache/epub/28054/pg28054.txt, downloaded 2026-11-14 into its own folder, header "Release date: February 12, 2009 [eBook #28054] Most recently updated: September 18, 2026", "Translator: Constance Garnett", title page "The Lowell Press, New York". SHA-256 `2e75c187cb750df3f7c910fa90970b264b9a4fee212be2a73c6bb507d9ad22fe`. Counting rules as in the series' scripts. OUR CALCULATION.

- **Counts:** 350,685 whitespace tokens between the markers; 350,120 with a letter or digit; 349,329 from "PART I" to "THE END"; 350,440 also splitting em dashes; **349,788 without heading lines (part, book, chapter number and title, "EPILOGUE"), footnote markers and "THE END" (the figure to publish)**; 350,216 if a narrator reads all book and chapter titles (428 words). Nine translator's footnotes at the end are not counted. **Independent recount** from the HTML edition with a different parser: **349,820** (0.01% apart), 96 chapters, the Grand Inquisitor 9,287 words in both. Publish "about 350,000 words (349,788 by our count)". annotatedebooks.com's "approximately 365,000" and loudreader's "~339,900" are other estimates.
- **No "From the Author" preface** in Garnett's translation (Gutenberg #28054 goes from the contents to "PART I"). P&V and McDuff include it (samples, 1c). VERIFIED.
- **Structure:** 4 parts, 12 books and an epilogue, **96 chapters** (Books I to XII: 5, 8, 11, 7, 7, 3, 4, 8, 9, 7, 10, 14; Epilogue 3). Part I (Books I to III) 69,503 words, 7 h 40 min at 151 wpm; Part II (IV to VI) 77,054, 8 h 30 min; Part III (VII to IX) 83,306, 9 h 12 min; Part IV (X to XII) 110,575, 12 h 12 min; Epilogue 9,350, 1 h 2 min. Book XII alone (the last book) is 45,840 words, 5 h 4 min, 13.1%. The LibriVox files number chapters 1 to 96 straight through; Pirie's file titles carry book and chapter ("05.05").
- **Chapter length:** mean 3,644 words (24.1 min at 151 wpm), median 3,401 (22.5 min); 37 of 96 chapters take under 20 minutes, 19 take 30 or more, 2 take an hour or more (the Grand Inquisitor and "The Duel"). Shortest: Book I, Ch. 2 "He Gets Rid Of His Eldest Son", 1,297 words, about 9 min; Book I, Ch. 1, 1,333 words.
- **Listening time at 151 wpm** (the site's median for LibriVox solo readers): **1x 38 h 36 min; 1.25x 30 h 53 min; 1.5x 25 h 44 min; 2x 19 h 18 min**. At ACX's 155 wpm: 37 h 37 min at 1x. Silent reading at 260 wpm: 22 h 25 min.
- **Days to finish at 151 wpm** (rounded up): 30 min a day: 78 at 1x, 62 at 1.25x, 52 at 1.5x, 39 at 2x; 60 min a day: 39, 31, 26, 20.
- **Actual recordings at speed** (runtime ÷ speed; 1.25x / 1.5x / 2x): Thompson 43 h 6 min → 34 h 29 min, 28 h 44 min, 21 h 33 min. Miles 42 h 16 min → 33 h 49 min, 28 h 11 min, 21 h 8 min. Gregory 37 h 4 min → 29 h 39 min, 24 h 43 min, 18 h 32 min. Davidson 34 h 52 min → 27 h 54 min, 23 h 15 min, 17 h 26 min. Woolf 37 h 50 min → 30 h 16 min, 25 h 13 min, 18 h 55 min. Pirie (free) 39 h 38 min → 31 h 42 min, 26 h 25 min, 19 h 49 min. Addison (free) 46 h 25 min → 37 h 8 min, 30 h 56 min, 23 h 12 min. Group (free) 37 h 55 min → 30 h 20 min, 25 h 17 min, 18 h 58 min.
- **Narrator pace (Garnett recordings, wpm):** Foster 170, Cameron 170, Smith 169, Davidson 167, Garraway 165, Covell 158, Gregory 157, Rintoul 156, LibriVox group 154, Peery 149, Pirie 147, Lister 144, Addison 126. Range 126 to 170, median 157 (13 recordings).
- **Against Crime and Punishment (same script, Gutenberg #2554, reproduces the published 203,197, 12.7 and 55.4%):** 349,788 vs 203,197 words, **1.72 times as long** (38 h 36 min vs 22 h 26 min at 151 wpm); mean sentence **14.0 vs 12.7 words** (24,978 vs 16,006 sentences); dialogue **55.5% vs 55.4%** of words inside quotation marks; Project Gutenberg's own reading-ease score **82.0 ("6th grade. Easy to read.") vs 83.0**; mean chapter 3,644 vs 4,956 words (Karamazov's chapters are shorter; there are more of them). Against War and Peace (561,870): 0.62 times; against Jane Eyre (186,145): 1.88 times. VERIFIED (Gutenberg pages) and OUR CALCULATION.
- **Dialogue by part:** I 52.0%, II 54.8%, III 46.7%, IV 64.7%, Epilogue 58.4%.
- **First sentence:** 49 words ("Alexey Fyodorovitch Karamazov was the third son of Fyodor Pavlovitch Karamazov, a land owner well known in our district in his own day, and still remembered among us owing to his gloomy and tragic death, which happened thirteen years ago, and which I shall describe in its proper place."). It tells you the father died: that is not a spoiler; who did it is.

---

## 5. Names, pronunciation and the traps (from the text; OUR CALCULATION for counts)

Whole-word, case-sensitive counts in the novel text (`bk-wordcount.py`, `bk-names-extra.py`; single names recounted by `bk-recount.py`, which agrees within 2: Mitya 910 vs 911, Zossima 102 vs 100). "Told by" = the book and chapter where the fact is stated. **Spoiler check:** every fact below is told by the chapter shown, all within the first 30% of the novel except Kolya's introduction (Book X, which only introduces him), and none says who kills anyone, who is arrested, accused, tried or convicted, who dies or how anything ends. Left out on purpose: Smerdyakov's rumoured parentage (Book III, Ch. 2; it bears on the mystery), Zosima's death, Ilusha's illness, the money, the night of the murder, the investigation and the trial.

| Character | Every form in Garnett's translation (count) | Who | Told by | Say it (Russian, Wiktionary) |
|---|---|---|---|---|
| The father | Fyodor Pavlovitch 298 (Fyodor 300); Karamazov 171 (all Karamazovs) | A landowner, father of three sons by two wives | Book I, Ch. 1 | Fyodor [ˈfʲɵdər], FYO-dər |
| The eldest son | **Mitya 911**, Dmitri 380 (Dmitri Fyodorovitch 170), Mityenka 3, Mitri 2, Mitenka 1 | Son of the first wife; has "only lately left the army" | Book I, Ch. 1 to 2; Book II, Ch. 6 | Mitya [ˈmʲitʲə], MEE-tya; Dmitri [ˈdmʲitrʲɪj] |
| The second son | **Ivan 714** (Ivan Fyodorovitch 59), Vanka 3 (only in a song a character sings) | Son of the second wife (Sofya Ivanovna); writes articles | Book I, Ch. 3; Book II, Ch. 7 | Ivan [ɪˈvan], ee-VAHN |
| The youngest son | **Alyosha 1,241**, Alexey 163 (Alexey Fyodorovitch 113) | Ivan's full brother; a novice at the monastery | Book I, Ch. 1, 4, 5 | Alyosha [ɐˈlʲɵʂə], a-LYO-sha; Alexey [ɐlʲɪkˈsʲej] |
| The servant | **Smerdyakov 371**, Pavel Fyodorovitch 1 | Fyodor Pavlovitch's servant and cook, raised by Grigory and Marfa | Book III, Ch. 2, 6 | not in Wiktionary |
| The old servants | Grigory 192 (Grigory Vassilyevitch 29), Marfa Ignatyevna 30 (Marfa 57) | Fyodor Pavlovitch's servant and his wife | Book I, Ch. 2; Book III, Ch. 1 | |
| A young woman of the town | **Grushenka 362**, Agrafena Alexandrovna 39, Grusha 18 | Agrafena Alexandrovna, called Grushenka | Book II, Ch. 7 (named); Book III, Ch. 10 (full name) | Grushenka [ˈɡruʂɨnʲkə], GROO-shin-ka; Agrafena [ɐɡrɐˈfʲenə] |
| Dmitri's betrothed | **Katerina Ivanovna 199** (Katerina 212), Katya 75, Katenka 1 | Engaged to Dmitri ("she is betrothed to him") | Book II, Ch. 6; Book III, Ch. 4 to 5 | Katerina [kətʲɪˈrʲinə]; Katya [ˈkatʲə], KAH-tya |
| The elder | Zossima 100 (Father Zossima 90) (modern translations spell it Zosima) | The elder at the monastery; Alyosha's teacher | Book I, Ch. 4 to 5 | not in Wiktionary |
| Alyosha's friend | Rakitin 198, Misha 24 (Rakitin's first name, used by friends), Mihail Osipovitch | A seminarist | Book II, Ch. 7 | |
| A monk | Father Païssy 73 (one more "Païssy" in Book I, Ch. 5 is a historical monk) | A learned monk of the monastery | Book II, Ch. 2 | |
| A relative | Miüsov 79, Pyotr Alexandrovitch 38 | A cousin of Dmitri's mother; a landowner | Book I, Ch. 2 | |
| A rich widow and her daughter | Madame Hohlakov 93; Lise 144 | Visitors to the monastery | Book II, Ch. 3 to 4 | |
| A boy and his father | Ilusha 166; Snegiryov 22 (Nikolay Ilyitch 2) | A schoolboy; his father, "formerly a captain in the Russian infantry" | Book IV, Ch. 3 (the boy, unnamed), Ch. 6 (both named) | |
| A schoolboy | Kolya 210, Krassotkin 68 (Kolya Krassotkin 6) | A schoolboy | Book IV, Ch. 3 (Krassotkin named); Book X, Ch. 1 | Kolya [ˈkolʲə], KOH-lya |

**The traps, in numbers:**
- **Three names for one brother.** The eldest is "Mitya" 911 times and "Dmitri" 380; the youngest "Alyosha" 1,241 and "Alexey" 163. A listener who hears "Dmitri Fyodorovitch" in one scene and "Mitya" in the next is hearing the same man.
- **The patronymic is shared.** All three brothers are "Fyodorovitch" (son of Fyodor): Dmitri Fyodorovitch 170, Ivan Fyodorovitch 59, Alexey Fyodorovitch 113, and once even Pavel Fyodorovitch (Smerdyakov). "Fyodorovitch" alone does not tell you which brother.
- **Grushenka is also Agrafena Alexandrovna** (39) and Grusha (18). Katerina Ivanovna is also Katya (75).
- **Garnett keeps fewer pet forms than some guides list.** Mitka, Alyoshka, Lyosha, Alyoshenka and Vanya never occur in her translation (0 each); annotatedebooks.com's "Name Decoder Table" lists them. Whether they occur in other translations or the Russian: not counted (no Russian text was processed today).
- **Spelling changes with the translation:** Garnett's "Zossima", "Hohlakov", "Ilusha", "Krassotkin", "Pavlovitch" appear as "Zosima", "Khokhlakov", "Ilyusha", "Krasotkin", "Pavlovich" in modern translations (the P&V sample says "Fyodor Pavlovich"; the Penguin and Macmillan blurbs say "Fyodor Karamazov" and "Fyodor Pavlovich Karamazov"). VERIFIED for Garnett by count; for the modern spellings by the samples and blurbs only.

**Pronunciation:**
- **Karamazov** = ka-ra-MA-zov, stress on "ma": Wikipedia's lead gives the Russian title "Братья Карамазовы … IPA: [ˈbratʲjə kərɐˈmazəvɨ]" (Karamazov has no Wiktionary entry). VERIFIED.
- **Dostoevsky** = dəs-ta-YEF-skee, Wiktionary [dəstɐˈjefskʲɪj]. VERIFIED.
- Names above: Wiktionary Russian sections (`scripts/bk-wiktionary-ipa.py`; Smerdyakov, Zosima, Rakitin, Ilyusha have no entries). The respellings (MEE-tya etc.) are ours from the IPA. How each narrator says them: UNVERIFIED (no sample reaches most names; Woolf's "Russian pronunciation is believable" per one Audible reviewer).

---

## 6. What listeners say, and awards

### 6a. Reddit (Arctic Shift; scores as stored, read 2026-11-14)

| Thread | Sub, date | Score / comments | Remarks (comment score) |
|---|---|---|---|
| https://www.reddit.com/r/audiobooks/comments/qwc0j2/ "Best audiobook version of Brothers Karamazov on Audible?" | r/audiobooks, 2021-11-17 | 29 / 13 | Gregory via library "very enjoyable … narration is pretty good" (4); "The Penguin Classics Audio one … is of the McDuff translation. … narrated by Luke Thompson." (2); "Luke Thompson is the standout." (2, 2024); Davidson "a voice similar to that of John Hurt. Some American listeners may find him a bit - well - effete" (1); "is a 1 to 1 match with the penguin classic audiobook?" (1, 2025) |
| https://www.reddit.com/r/audiobooks/comments/2t9pp5/ "The Brothers Karamazov is a good choice for an audiobook" | r/audiobooks, 2015-01-22 | 27 / 8 | OP: "The plot is easy to understand and the characters are so kinetic that it is easy to follow along."; reply: "I thought Pyoter Alexandrovich and Myusov were two different people for pretty much that whole scene." (1) (the names trap: Miüsov is Pyotr Alexandrovitch) |
| https://www.reddit.com/r/audiobooks/comments/1s0icx/ | r/audiobooks, 2013-12-03 | 10 / 7 | Davidson recommended (3, 3); Simon Vance (3); Davidson "sounds very flamboyant to me" (2) |
| https://www.reddit.com/r/audiobooks/comments/2vj8h6/ "Is there a Pevear and Volokhonsky translated audiobook?" | r/audiobooks, 2015-02-11 | 8 / 3 | None then; "Book Four is called 'Lacerations' in the Garnett translation" (1) |
| https://www.reddit.com/r/audiobooks/comments/wlyow2/ (Davidson on Chirp, $3.99) | r/audiobooks, 2022-08-11 | 6 / 9 | OP: "The reader, Frederick Davidson, is British and has a very posh voice." |
| https://www.reddit.com/r/audiobooks/comments/1c4xs6e/ "What is the best version (Narrator)…" | r/audiobooks, 2024-04-15 | 4 / 2 | OP's list: Salomon Bryant, Luke Thompson, Ben Miles, Constantine Gregory, Frederick Davidson, Bruce Peery, David Rintoul, Gabriel Woolf, Alastair Cameron; "DO NOT get the version narrated by Mike Joyce" (2); Gregory (2); Thompson "may be the best audiobook I've ever experienced" (1) |
| https://www.reddit.com/r/audible/comments/1rbumnp/ "… narrated by Bruce Peery actually AI?" | r/audible, 2026-02-22 | 4 / 15 | "This same recording of the Brothers Karamazov is in Librivox's public domain collection credited to a narrator named Bruce Pirie." (12); "Librivox has a clear policy prohibiting AI narration." (10); "it is definitely NOT ai" (2) |
| https://www.reddit.com/r/audiobooks/comments/1edba6v/ (Ben Miles) | r/audiobooks, 2024-07-27 | 2 / 1 | "Miles transforms into these characters." (1) |
| https://www.reddit.com/r/audiobooks/comments/qqnskv/ (Avsey audiobook?) | r/audiobooks, 2021-11-10 | 2 / 2 | None found |
| https://www.reddit.com/r/audiobooks/comments/1pyjtve/ (match the Penguin Black Classics edition) | r/audiobooks, 2025-12-29 | 2 / 2 | "Audible has it." (1) |
| https://www.reddit.com/r/audiobooks/comments/1sh6egj/ | r/audiobooks, 2026-04-09 | 1 / 1 | Thompson "doing all the voices?!"; Pirie "wonderful"; "McDuff (excellently read by Luke Thompson), … P&V (decently read by Ben Miles), and … Garnett (excellently read by Constantine Gregory)" |
| https://www.reddit.com/r/dostoevsky/comments/1v9avsa/ "Why is The brothers Karamazov considered a hard to read book?" | r/dostoevsky, 2026-07-28 | 171 / 104 | OP finds it "moving super fluidly"; "the majority of people are not comfortable with reading 800 page 19th century classics" (4). (Do not quote the 5-point Zosima joke: it mentions his death) |
| https://www.reddit.com/r/classicliterature/comments/1xk3vr3/ (C&P or Karamazov?) | 2026-10-31 | 198 / 104 | "that haunting Grand Inquisitor section" (0) |
| https://www.reddit.com/r/classicliterature/comments/1xgk73f/ "Struggling with The Brothers Karamazov" | 2026-10-27 | 19 / 38 | "Keep going until 'The Grand Inquisitor' chapter; that's usually where it clicks for people coming from Crime and Punishment" (1); "I found the forst half to be quite slow for me. … I'd read a chapter a day." (2) |
| https://www.reddit.com/r/classicliterature/comments/1o2yiqe/ "Best translation…" | 2025-10-10 | 26 / 22 | Katz "reads really well" (11); "Michael Katz hands down." (9) |

Pattern: Thompson is the most praised since 2021, Gregory the safe Garnett pick, Davidson divides people (posh, theatrical), Miles is praised by P&V readers; recurring questions are which translation each audiobook uses, whether a matching audiobook exists for a print edition, and the names. VERIFIED (from the comments above).

### 6b. Awards

- No Brothers Karamazov recording appears as an Audie winner or finalist on the 31 year pages (1996 to 2026; `scripts/bk-audies.mjs`, terms "Karamazov", "Grand Inquisitor", "Luke Thompson", "Ben Miles", "Constantine Gregory", "Frederick Davidson": 0 hits). The 2022 page lists "The Fyodor Dostoevsky BBC Radio Drama Collection … Performed by Roy Marsden, Alex Jennings, Roger Allam…" (Audio Drama finalist, as the C&P post says). VERIFIED.
- Ben Miles: AudioFile quote on Audible (AudioFile not opened). Davidson: "an AudioFile Golden Voice winner" per a Reddit OP (UNVERIFIED at AudioFile).
- The P&V translation won the PEN/Book-of-the-Month Club Translation Prize in 1991 (pen.org list: "1991 Richard Pevear and Larissa Volokhonsky, The Brothers Karamazov by Fyodor Dostoevsky (North Point Press)"). A translation prize, not an audio award: say so. VERIFIED.

### 6c. Audible Whispersync tag

The `"eventId":"whispersync"` tag appears on 9 of the 12 Audible US pages rendered (Thompson, Miles, Gregory, Davidson, Covell, Rintoul, Foster, Cameron, Peery); not on Woolf, Vance or Lamberg. What it promises per edition: UNVERIFIED. welovetranslations names three Kindle and Audible "matching-est" pairs (P&V Picador Kindle with the Macmillan audio, AmazonClassics Garnett, Penguin McDuff): third-party claim, UNVERIFIED.

---

## 7. HushBook facts for this book (positive framing; verified in source and on the live site)

### 7a. What Discover shows for "brothers karamazov"

- VERIFIED. Discover searches archive.org for two libraries, LibriVox and Internet Archive, 24 rows a page (`kIaPageSize = 24`, D:\hushbook\lib\core\store\librivox_provider.dart:17), first tier = every word in title or creator (search_query.dart:100-101, 122), sorted by all-time downloads by default (catalog_filter_queries.dart:92-93), pages interleaved LibriVox first (store_repository.dart:553-571). Line references as re-checked for Jane Eyre at the same HEAD `d2ed665`. Live result of the app's exact queries today (`scripts/bk-discover-cards.mjs`; "brothers karamazov", "the brothers karamazov" and "karamazov" give the same first three):

| # | Card title | Author line | Length · rating | Download (64 kbps MP3, app format) | Chapters | Read by line | Which recording |
|---|---|---|---|---|---|---|---|
| 1 | **The Brothers Karamazov** | Fyodor Dostoyevsky | **37h 55m · 5 (6)** | 1.0 GB | 96 | Reader not listed | **Version 1, group, 27 readers** |
| **2** | **The Brothers Karamazov (version 3)** | Fyodor Dostoyevsky | **39h 38m · 5 (2)** | **1.1 GB** | **96** | Reader not listed | **Bruce Pirie, solo** |
| 3 | **The Brothers Karamazov** | Fyodor Dostoyevsky | **46h 25m** | 1.2 GB | 97 | Reader not listed | **Tony Addison, solo** (LibriVox "version 2") |
| (4, "karamazov" only) | Los hermanos Karamázov | Fyodor Dostoyevsky | 34h 0m | | | | Spanish |

- **Internet Archive tier: no result** for "brothers karamazov" (the app's query, internet_archive_provider.dart:198-212). The Victorian Vault upload sits in collections `cratediggers` and `folksoundomy`, not `audio_bookspoetry`, so Discover does not show it. The second ("expanded") tier (`scripts/bk-discover-expanded.mjs`) adds Crime and Punishment (Version 1) and "The Grand Inquisitor (dramatic reading)" from LibriVox, and nothing from Internet Archive. **No Discover result looks like a copy of a commercial recording.** VERIFIED.
- Search "grand inquisitor": first card "The Grand Inquisitor (dramatic reading)", 1h 17m, 35 MB, 3 chapters, "Reader not listed" (Blavatsky translation; 2a). VERIFIED.
- Card lines per store_cover_card.dart:55 ("length · rating (count)") and discover_copy.dart:16-41 (MB under 1 GB, else GB with one decimal; length in whole rounded minutes). Positions follow archive.org downloads and can change (the group set leads Pirie by 1.11 million to 333,073). VERIFIED (code plus live data; not observed on a device).
- **"Reader not listed"** (D:\hushbook\lib\l10n\app_en.arb:7617) on all three: the 64 kbps files carry no reader in their `artist` tag (librivox_provider.dart:354-376; the author's name does not count). So the post names Bruce Pirie from LibriVox and tells readers to pick "The Brothers Karamazov (version 3)", 39h 38m, and to tell the two untitled ones apart by length (37h 55m group, 46h 25m Addison). VERIFIED.
- Safe wording: "In HushBook's Discover tab, search Brothers Karamazov and pick The Brothers Karamazov (version 3), 39h 38m: that is Bruce Pirie's LibriVox reading, 96 chapters, a 1.1 GB download."
- "Play a sample" (app_en.arb:8697). VERIFIED.

### 7b. Import, chapters, how the Grand Inquisitor shows

- VERIFIED. A Discover download becomes one book with one chapter per file (store_import_service.dart:327-365), each chapter titled with the file's `title` tag (librivox_provider.dart:354-376: `iaToText(f['title']) ?? _stemName(name)`). In Pirie's set: 96 chapters, titles like "05.05 The Grand Inquisitor" (archive.org titles read today: "36 - 05.05 The Grand Inquisitor"; the "36 - " prefix is in the tag as archive.org shows it).
- VERIFIED. The read-along's chapter block shows "Chapter {numeral}" in small capitals (synced_lyrics_view.dart:3527-3535, `playerChapterRoman` app_en.arb:8647) with the chapter's title under it; the numeral is the file's position. **The Grand Inquisitor is file 36, so the app shows it as Chapter XXXVI** (and the book's Book I, Chapter 1 as Chapter I: no preface offset, unlike C&P's LibriVox v3). Not observed on a device.
- VERIFIED. Store downloads queue transcription on the phone ("Added to library. Transcription queued.", app_en.arb:771).
- VERIFIED (site copy, HEAD ee1f7e7). Files you own: "MP3, M4A, M4B, AAC, WAV, FLAC, OGG, OPUS, OGA, AIFF, AIF, CAF, WMA, MKA, and ALAC. … Chapters inside M4B files are detected automatically" (index.html:668). Desktop: "Import MP3 and M4B files or whole folders. Covers and chapters come from the files." (desktop.html:429); "Free · Windows 10 or 11, 64-bit · macOS 14 or later" (desktop.html:332).

### 7c. Reading along, names, speed, e-book sync

- VERIFIED (site copy). "Words fill in as the narrator reads them, with a red underline on the current one. Long-press any line to play from there." (index.html:1033). Never "tap any word"; "Tap a line to jump there" is an off-by-default switch (app_en.arb:8453).
- VERIFIED (site copy and source). "You can pair an EPUB, PDF or TXT with the audiobook and HushBook aligns the real book text to the audio, word by word. This ebook sync is in beta." (audiobook-with-text.html:67). App: "Unlimited e-book syncs turn a matching book into timed, word-by-word read-along text." (app_en.arb:2112); "Attach a matching, DRM-free EPUB, PDF or TXT" (2113); "Use the same unabridged edition with English narration. Sync is in beta; processing takes time and highlight timing can vary." (2114). **First sync free, then Pro** (D:\hushbook\lib\core\ebook\ebook_sync_allowance.dart:6, 33: `freeAvailable` when no allowance row exists; `requiresPro` for a second, different pair). Still reads so at `d2ed665`. **The fit:** Pirie's LibriVox reading and Gutenberg #28054 are the same text, so a synced read-along shows Garnett's words (and spellings: "Zossima", "Mitya") in time with the voice. Not run on a device for this book: write it as what the feature does, scoped to "a matching DRM-free e-book".
- VERIFIED. Without e-book sync the words on screen come from the on-device transcript; how speech recognition spells Russian names is not tested: do not quote or promise any spelling.
- VERIFIED. **Character map** ("Character map", app_en.arb:879), added by hand; "First heard" "Ch. {chapter} · {time}" (app_en.arb:2160-2161). Use: one card per brother, the other names in Notes ("Mitya, Dmitri Fyodorovitch"; "Alyosha, Alexey"; "Grushenka, Agrafena Alexandrovna, Grusha"). Do not claim name suggestions.
- VERIFIED. Speed 0.5x to 3x in 0.05x steps (playback_speed_sheet.dart:25-48, as cited 11-13 at the same HEAD). "Mark: highlight, note or quote" (app_en.arb:8753).
- VERIFIED. Platforms: iPhone, Android, Windows, Mac (desktop.html:332; Mac live per memory 2026-11-13 and the site's "macOS 14 or later"). Price: "The core read-along experience and the public-domain library are free. There's an optional Pro upgrade for advanced analytics" (index.html:676). "Transcribe on my PC" is Pro (index.html:1021). Privacy: "Transcription runs on-device. There is no account and no cloud upload of your audio." (llms.txt:3).

### 7d. Do not claim (HushBook)

1. That Discover names Bruce Pirie (the card says "Reader not listed"), or that card positions or titles are fixed.
2. That HushBook opens Audible, Apple Books, Libby, hoopla, Spotify, Kobo or Chirp purchases. Scope to "audiobook files you own" and "DRM-free MP3 or M4B".
3. That HushBook detects characters, suggests names, translates, or fixes pronunciation.
4. Any spelling the transcript will show for Russian names.
5. That e-book sync is unlimited for free users or out of beta; that it was tested on this book.
6. That "Transcribe on my PC" is free.
7. Any phone transcription time for a 1.1 GB, 39-hour book.
8. That the Apple (Parolita) or Audible (Hexagon) Pirie listings are the LibriVox files, beyond what 2c shows for Hexagon.
9. That Libro.fm sells Thompson's recording DRM-free as checked today (Libro.fm blocked us; Penguin UK lists Libro.fm among its stores; Libro.fm's DRM-free policy was read 2026-11-10 for the C&P post).

---

## 8. Competing pages: provable errors (state the right fact; do not name them)

- **readingtheodyssey.com** (2025-01-15, modified 2026-10-22): "Best Audiobook … Narrated by Frederick Davidson — Pevear and Volokhonsky translation". Davidson's Blackstone recording reads Garnett: its sample matches Garnett's text (81.7%), OverDrive credits Constance Garnett, and the recording dates from 2000 ("(P)2000 Blackstone Audio"), before any P&V audio. The confusion is understandable: Blackstone's Audible and hoopla pages quote critics writing about the P&V translation. The only unabridged P&V audiobook is Ben Miles's (2024). VERIFIED.
- **welovetranslations.com audiobook page**: Ben Miles "Running time 46h 16m" (Audible, Apple, OverDrive and hoopla: 42 h 16 min); Bruce Pirie listed as "Librivox Version 2" (LibriVox: version 3; Tony Addison is version 2); no ratings; missing 2022 to 2026 listings. Its translation page still says of P&V: "There's an abridged audiobook version" and "There are unabridged audio versions of the Garnett, Magarshack, and McDuff translations". VERIFIED.
- **thebooksinsider.com** (build 2026-10-12): "runs an estimated 24.3 hours … from its 822 pages", filed under Romance. Every complete recording on sale runs 34 h 18 min or more. VERIFIED.
- **annotatedebooks.com** (2026-11-12): nicknames "Mitka", "Alyoshka", "Lyosha", "Alyoshenka", "Vanya", "Vanyusha" in its decoder: none occurs in Garnett's translation (our count; other translations not counted); its reading plan cites "Book VIII, Chapter 9" (Book VIII has 8 chapters) and puts Ivan's visits to Smerdyakov in Book XI, Chapters 1 to 5 (the chapter titles put them at 6 to 8); "approximately 365,000 words" (Garnett: 349,788 by our count; other translations differ); the plan spoils the murder and the trial. VERIFIED.
- **Audible "Bruce Peery" listing**: its summary is Penguin's McDuff blurb ("Dostoevsky's last and greatest novel, The Brothers Karamazov (1880) is both a brilliantly told crime story…"), but the recording reads Garnett (sample 95.1%). VERIFIED. (Not a competitor; do not name in the post beyond what 2c supports.)
- **Wikipedia** (BBC adaptation "omits the Grand Inquisitor episode"): not confirmed by the BBC page; do not repeat.

---

## 9. Picks, with the evidence

- **Best overall: Luke Thompson (Penguin Classics, 2021, David McDuff's translation, 43 h 6 min).** 4.7 from 858 Audible US ratings, **4.9 for performance**; UK 4.7 (250), Apple 4.6 (283), Google Play 4.8 (11); the searched narrator (top completion); Reddit's most praised recording since 2021; matches the Penguin Classics paperback; includes McDuff's introduction. https://www.audible.com/pd/0241533228 (Owner's call against Gregory: risks in scout.md.)
- **Most rated, and best Garnett: Constantine Gregory (Naxos, 2013, 37 h 4 min).** 4.6 from **5,910** US ratings (seven times Thompson's), 4.7 performance; Libby LAPL and KCLS; the free LibriVox recordings read the same translation, so you can switch between them. https://www.audible.com/pd/B00EZAXAF8
- **Best for Pevear and Volokhonsky readers: Ben Miles (Macmillan Audio, 2024, Bicentennial Edition, 42 h 16 min).** 4.8 from 484, 4.9 performance; the only unabridged P&V audiobook; AudioFile on his "English accent" (via Audible); on hoopla. https://www.audible.com/pd/B0CKM7JKD1
- **Best free: Bruce Pirie, LibriVox Version 3 (2020, 39 h 38 min).** Solo, 96 files = 96 chapters, Discover card "The Brothers Karamazov (version 3)", 1.1 GB; archive.org "the narrator is extraordinarily good"; Reddit "wonderful"; sold on Audible as "Bruce Peery" (2c). https://librivox.org/brothers-karamazov-v3-by-fyodor-dostoyevsky/
- **Best to borrow: Ben Miles on hoopla** (no waitlist shown on hoopla's title page), or Davidson (NYPL 11 copies, SFPL 8, hoopla) for the Garnett. Libby waits today: Miles LAPL 49 holds on 9 copies, Thompson LAPL 46 on 7, Gregory KCLS 18 on 6 (LAPL 1 of 5 available). https://www.hoopladigital.com/audiobook/the-brothers-karamazov-fyodor-m-dostoevsky/16289312 (hoopla's availability rules: UNVERIFIED for the owner's region.)
- **Also worth knowing:** Frederick Davidson (Blackstone, 34 h 52 min, 4.3 from 1,437; theatrical, "very posh", divides listeners); Gabriel Woolf (the only Magarshack, RNIB "vintage recording"); David Rintoul (SNR, 4.8 from 25).
- **If you only want the Grand Inquisitor:** the chapter in any complete recording (about an hour), or the free LibriVox dramatic reading (1 h 17 min, Blavatsky's translation).
- **Avoid if you want the whole book:** Simon Vance (19 h 8 min, abridged), Tim Pigott-Smith (10 h 33 min, abridged), the BBC and L.A. Theatre Works dramatisations, Real Reads, Sweet Cherry, AI-voice and "adapted" listings, and the Icon "Redux".

---

## 10. Ready-to-paste comparison table (VERIFIED rows only)

| Narrator | Translation | Runtime | Publisher | Year | Audible US rating | Where to get it |
|---|---|---|---|---|---|---|
| Luke Thompson | David McDuff | 43 h 6 min | Penguin Classics | 2021 | 4.7 (858) | Audible, Apple Books, Google Play, Libby |
| Ben Miles | Pevear and Volokhonsky | 42 h 16 min | Macmillan Audio | 2024 | 4.8 (484) | Audible, Apple Books, Libby, hoopla |
| Constantine Gregory | Constance Garnett | 37 h 4 min | Naxos AudioBooks | 2013 | 4.6 (5,910) | Audible, Apple Books, Libby |
| Frederick Davidson | Constance Garnett | 34 h 52 min | Blackstone | 2000 | 4.3 (1,437) | Audible, Apple Books, Libby, hoopla |
| Gabriel Woolf | David Magarshack | 37 h 50 min | RNIB | 2009 | 4.1 (228) | Audible, Apple Books |
| Walter Covell | Constance Garnett | 37 h 1 min | Jimcin Recordings | 1987 | 4.0 (346) | Audible, Apple Books |
| Alastair Cameron | Constance Garnett | 34 h 24 min | A.R.N. Publications | 2016 | 4.4 (153) | Audible, Apple Books |
| James Anderson Foster | Constance Garnett | 34 h 18 min | Brilliance (AmazonClassics) | 2020 | 4.6 (110) | Audible, Apple Books |
| David Rintoul | Constance Garnett | 37 h 19 min | SNR Audio | 2023 | 4.8 (25) | Audible, Apple Books |
| Bruce Pirie (LibriVox) | Constance Garnett | 39 h 38 min | LibriVox (free) | 2020 | n/a | LibriVox, Internet Archive, HushBook Discover |
| Tony Addison (LibriVox) | Constance Garnett | 46 h 25 min | LibriVox (free) | 2016 | n/a | LibriVox, Internet Archive, HushBook Discover |
| LibriVox group reading (27 readers) | Constance Garnett | 37 h 55 min | LibriVox (free) | 2010 | n/a | LibriVox, Internet Archive, HushBook Discover |

Abridged and dramatised, to flag: Simon Vance (abridged, 19 h 8 min); Tim Pigott-Smith (Naxos, abridged, 10 h 33 min); BBC Radio 4 dramatisation (2006, five parts, in The Fyodor Dostoevsky BBC Radio Drama Collection); L.A. Theatre Works (2 h 15 min; with The Idiot 3 h 59 min); Real Reads (37 min); Sweet Cherry (54 min).

Year notes: Davidson: recorded "(P)2000", on Audible 2009, Apple and OverDrive 2010. Covell: "(P)1987 Jimcin", on Audible 2006. Gregory: Audible 2012-12-30, "(P)2013". Bruce Peery (Hexagon Tech, 39 h 13 min, 4.3 from 42) is left out of the table on purpose (same reader as the free Pirie row; 2c); the owner may add it as "Bruce Pirie, sold as Bruce Peery".

---

## 11. Sources (opened 2026-11-14)

Audible
- Catalogue API: https://api.audible.com/1.0/catalog/products?keywords=brothers+karamazov&num_results=50&response_groups=contributors,product_desc,product_attrs,rating,media,sample,series,relationships (and .co.uk, .ca, .com.au; 31 keyword sets); per-ASIN `/1.0/catalog/products/{ASIN}?response_groups=…price,product_plans…`
- Rendered pages (`?ipRedirectOverride=true&overrideBaseCountry=true`): https://www.audible.com/pd/0241533228 (Thompson) · /pd/B0CKM7JKD1 (Miles) · /pd/B00EZAXAF8 (Gregory) · /pd/B002V8LAN0 (Davidson) · /pd/B0035A86I0 (Woolf) · /pd/B002V1NN78 (Covell) · /pd/B01M1221N5 (Cameron) · /pd/1799744744 (Foster) · /pd/B0C8NHYPDZ (Rintoul) · /pd/B0BDP54D6M (Peery) · /pd/B002V8KQUI (Vance) · /pd/B017WJ5NXA (Lamberg)
- API-only: B0HBPQ1V45 (Lister) · B0DFQ49SNG (Garraway) · B0CZRNT9P2 (Smith) · B0G765ZL8T (Giuliano Redux) · B002V0QORU (Pigott-Smith) · 1529141796 (BBC collection) · B003999U7I, B002V8KWUW (L.A. Theatre Works) · 1911091514 (Real Reads) · B0GPFKDTRV (Sweet Cherry) · B0FBNC7KM7 (Williams) · B0H9NPZFZW (Icon GI) · B0B6786Q8T, B07T7L4CWK, B0G319W4D2 (collections) · UK: B00EZANR7Y, B0CKM7H9Y6, B004FTH776, B004FU5XNA, 0241533228
- Sample MP3s: `https://samples.audible.com/bk/{…}_sample.mp3` (API `sample_url`)

Apple Books
- https://itunes.apple.com/search?term=brothers+karamazov&media=audiobook&country=us&limit=200 (and 11 more terms)
- https://books.apple.com/us/audiobook/id1576340336 (Thompson) · id1707866001 (Miles) · id1453518941 (Gregory) · id1646037374 (Davidson) · id308171733 (Woolf) · id187025553 (Covell) · id1155286532 (Cameron) · id1500804183 (Foster) · id1694042400 (Rintoul) · id1644238856 (Peery) · id1595590469 (Pirie, Parolita) · id6770137130 (Lister) · id1446352517 (Mike Joyce) · id1058961770 (Lamberg)

Publishers and other stores
- https://www.penguin.co.uk/books/35480/the-brothers-karamazov-by-dostoyevsky-fyodor/9780241533222 (Thompson, store list)
- https://play.google.com/store/audiobooks/details/The_Brothers_Karamazov?id=AQAAAEBcO2d7KM
- https://thunder.api.overdrive.com/v2/libraries/nypl/media?query=brothers%20karamazov&format=audiobook-overdrive,audiobook-mp3&perPage=100 (also lapl, kcls, sfpl, chipublib; "karamazov brothers", "grand inquisitor")
- https://www.hoopladigital.com/audiobook/the-brothers-karamazov-fyodor-m-dostoevsky/16289312 (Miles) · …/10025362 (Davidson) · …/10764520 (L.A. Theatre Works)
- https://www.amazon.com/s?k=brothers+karamazov+dostoevsky&i=digital-text (Kindle listings; India session)

Free
- https://librivox.org/api/feed/audiobooks/?title=%5EBrothers%20Karamazov&format=json&extended=1 (and "^The Brothers Karamazov", "^Grand Inquisitor")
- https://librivox.org/brothers-karamazov-v3-by-fyodor-dostoyevsky/ (Pirie) · https://librivox.org/the-brothers-karamazov-by-fyodor-dostoyevsky/ (group) · LibriVox id 10890 (Addison) · id 4465 (Grand Inquisitor)
- https://archive.org/details/brothers_karamazov_v3_2002_librivox · https://archive.org/details/brothers_karamazov_1002_librivox · https://archive.org/details/brotherskaramazov2_1606_librivox · https://archive.org/details/grand_inquisitor_1202_librivox ; reviews and file lengths via https://archive.org/metadata/{identifier}
- https://www.gutenberg.org/ebooks/28054 · https://www.gutenberg.org/ebooks/8578

Text and book facts
- https://en.wikipedia.org/wiki/The_Brothers_Karamazov · https://www.gutenberg.org/ebooks/2554 · https://en.wiktionary.org/wiki/Алёша (and Митя, Дмитрий, Иван, Фёдор, Грушенька, Груша, Аграфена, Катя, Катерина, Коля, Достоевский)

Listeners, awards
- Arctic Shift: https://arctic-shift.photon-reddit.com/api/posts/search?subreddit=…&title=karamazov ; `/api/posts/ids?ids=qwc0j2,1c4xs6e` ; `/api/comments/search?link_id={id}`
- https://www.audiopub.org/2022audieawards-1 (and the 30 other year pages from https://www.audiopub.org/audie-awards-winners)
- https://pen.org/pen-translation-prize/
- https://www.bbc.co.uk/programmes/b00y9455

Hallow
- https://try.hallow.com/brothers-karamazov-book-fyodor-dostoevsky · https://www.goodreads.com/book/show/246646916-the-brothers-karamazov-hallow-edition · https://www.sacrestar.com/product/the-brothers-karamazov-hallow-edition/ · https://www.thefp.com/p/the-brothers-karamazov-helped-inspire

Competitors
- https://welovetranslations.com/2023/02/12/whats-the-best-audiobook-of-the-brothers-karamazov/ · https://welovetranslations.com/2022/01/10/whats-the-best-translation-of-the-brothers-karamazov/ · https://www.readingtheodyssey.com/translations-brothers-karamazov/ · https://thebooksinsider.com/audiobook/the-brothers-karamazov/ · https://booktrace.app/audiobook-length/the-brothers-karamazov/ · https://annotatedebooks.com/blog/is-the-brothers-karamazov-hard-to-read-reading-difficulty/ · https://fluentech.org/en/blog/brothers-karamazov-characters · https://www.davidlapadat.com/post/brothers-karamazov-character-map · https://loudreader.io/listen/the-brothers-karamazov · https://compendium.audio/book/the-brothers-karamazov/ · https://recommendedaudiobooks.com/literature-fiction/the-brothers-karamazov/

HushBook
- D:\hushbook HEAD d2ed665: files and lines in section 7. D:\hushbook.app HEAD ee1f7e7: index.html, desktop.html, audiobook-with-text.html, llms.txt lines in section 7.

---

## 12. Do not claim

1. That Davidson reads Pevear and Volokhonsky, or any critic quote on his pages as being about his recording.
2. That any recording reads the Garnett/Matlaw revision, Avsey, Katz, MacAndrew or Katzer (none found); that Debra Winger's abridged P&V is on sale (not seen today).
3. That Thompson or Miles won an Audie (no hit), or that the PEN prize is an audio award.
4. That Gregory's Naxos recording is the "best" outright: it is the most rated; "best overall" is the editorial pick (Thompson) with reasons.
5. A runtime for the BBC Karamazov dramatisation on its own, or that it omits the Grand Inquisitor.
6. That Simon Vance's 19-hour version is complete (it is abridged).
7. That the Hexagon "Bruce Peery", Apple "Bruce Pirie" (Parolita) or Author's Republic "Salomon Bryant" listings are or are not LibriVox recordings, beyond 2c's test of the Hexagon one.
8. Accents except as sourced: Ben Miles "English accent" (AudioFile via Audible); Davidson British (Reddit OP); others "according to We Love Translations".
9. Plot facts in tables, figures, alt text or quotes: who killed Fyodor Pavlovitch, the arrest, the trial, the verdict, Smerdyakov's parentage, Zosima's death, Ilusha's illness, what the Inquisitor does at the end, "brain fever" contexts (late-book). Every store blurb names the murder and some name the suspect: do not quote blurbs.
10. Spotify, Libro.fm, Chirp, Kobo or Scribd availability (blocked or not checked today; Penguin UK's store list may be quoted as Penguin's list).
11. Any YouTube upload as legal or official; never the Victorian Vault archive.org upload.
12. Word counts for the modern translations (only Garnett's was counted).
13. That the Hallow app has an audiobook, or that the Hallow Edition text is unedited Garnett.

## 13. What we could not verify

- Spotify listings (login), Libro.fm and Kobo (HTTP 403 today), Chirp, Google Play beyond Thompson's page, Scribd/Everand, BBC Sounds.
- Google SERP, People Also Ask, AI Overview; ask.metafilter.com (bot check), hotaudio.com (TLS error).
- AudioFile's own pages (Miles quote; Davidson "Golden Voice").
- Kindle Whispersync pairings (Amazon page section did not load; India session).
- How each narrator pronounces the names, reads the Grand Inquisitor, or whether Thompson's and Miles's recordings include all of McDuff's and P&V's notes (samples stop early).
- The BBC dramatisation's own runtime and whether it includes the Grand Inquisitor.
- Whether the Corner Film Productions Grand Inquisitor reads McDuff (page says "©2003 Penguin Books").
- Translations of the Apple-only listings (Farrow, Joyce, Johnson, Jarmaine, Squire, Myers, Overbaugh, Croft, Bryant, Ring, Liberty).
- Russian-text name counts (not processed today; the C&P and W&P posts did this; optional for the writer).
- HushBook e-book sync and transcript behaviour on this book (not run on a device).
