# Platform research: best Pride and Prejudice audiobook

Post slug: `best-pride-and-prejudice-audiobook`. Researched November 12, 2026. Every claim carries a source, the date read (2026-11-12 unless a line says otherwise) and **VERIFIED** (opened and seen today) or **UNVERIFIED**. Prices and ratings change; each is a snapshot of 2026-11-12.

Scope: what a listener can get (editions, free recordings, dramatisations, listener opinion, HushBook), our own counts on the text (length, chapters, volumes, pace, dialogue, names), competing pages. The studies are in `research-evidence.md`.

There is no translation layer for this book, so the War and Peace sample-transcription test (which translation a recording reads) was not needed and was not run.

## How pages were read

Same methods as `../2026-11-11-best-war-and-peace-audiobook/research-platforms.md`; every script is in `scripts/` here. Raw responses stay in the session scratchpad (`2655ba97…/scratchpad/pp/`), outside git.

- **Audible catalogue API** (no auth): `https://api.audible.com/1.0/catalog/products?keywords=…` on `.com`, `.co.uk`, `.ca`, `.com.au`, 23 keyword sets (title, "+austen", "+unabridged", "pride & prejudice", each searched narrator name, "+bbc", "+dramatisation", "+full cast", "+audible original", "+drama", "+abridged", "+annotated", two Austen-collection sets), 2 pages each (`scripts/pp-audible-catalog.mjs`): 662 product rows, 133 on Audible US. Then `/catalog/products/{ASIN}` for 64 US and 10 UK products (`scripts/pp-audible-products.mjs`, parsed with `audible-product-dump.mjs` and `pp-audible-table.mjs`). Prices are the API's list price; the War and Peace research verified that it equals the "Buy for" price.
- **Audible US product pages** for 9 editions rendered in headless Chrome (`scripts/pp-render.mjs`, `chromiumSandbox: true`, `channel: 'chrome'`) to read the `whispersync` data tag and the buy box.
- **Apple Books**: iTunes Search API (`media=audiobook`, US, 9 terms) and each matching `books.apple.com/us/audiobook/id…` page's schema.org data (`scripts/pp-apple.mjs`): 104 Austen "Pride" rows. Extra lookups for Emilia Fox (US and GB).
- **Libby**: OverDrive thunder API for NYPL, LAPL, KCLS, SFPL, Chicago PL (`scripts/pp-overdrive.mjs`).
- **hoopla**: headless Chrome, 39 title pages (`scripts/pp-hoopla.mjs`).
- **Kobo US**: search page by curl (first page of audiobook results).
- **Publishers**: Naxos AudioBooks pages (Fox, Stevenson, Agutter, Educational Edition), Penguin UK page for the Varma recording.
- **LibriVox**: API (`?title=^Pride and Prejudice&extended=1` and `?author=Austen`), catalogue pages, archive.org `/metadata/` and `advancedsearch` (`scripts/pp-librivox-detail.mjs`).
- **Podcasts**: the RSS feeds of Noiser's "Jane Austen Stories" (Julie Andrews) and Ballarat National Theatre's "Pride and Prejudice", episode durations summed with `scripts/pp-podcast-feed.mjs`.
- **Reddit**: Arctic Shift API, title search in 8 subreddits plus 22 threads by id with all comments (`scripts/pp-reddit.mjs`, `scripts/pp-reddit-ids.mjs`).
- **Awards**: all 31 Audie year pages on audiopub.org, 1996 to 2026 (`scripts/pp-audies.mjs`). AudioFile reviews on kirkusreviews.com.
- **Narrator nationality**: Wikipedia REST summaries, publisher descriptions, narrators' own sites.
- **Own counts**: Project Gutenberg #1342 (`scripts/pp-wordcount.py`, `scripts/pp-contexts.py`), python run with `-I`, text in its own download folder.
- **HushBook**: app source D:\hushbook at HEAD `c0040d1` (2026-11-05), `pubspec.yaml` `version: 1.3.5+70` (line 4); the same HEAD the War and Peace research cited yesterday. Live Discover queries rebuilt with `scripts/pp-discover-cards.mjs`.

**Blocked today** (availability there NOT verified by me): Libro.fm (HTTP 202 empty, curl; 403 headless), Chirp (403, "Performing security verification"), Kobo in headless Chrome (403; curl worked), Spotify search (needs a login; one public album page rendered), countryandtownhouse.com and audiobooksoul.com (Cloudflare challenge), Google SERP and People Also Ask (not tried; they bot-check automated browsers).

---

## 1. Unabridged English recordings

### 1a. Main editions (all values read 2026-11-12)

Ratings: Audible US overall stars (number of ratings) / performance stars. Runtimes as each store prints them. "Pace" is OUR CALCULATION: 121,850 words (our count, section 3a) divided by the runtime; recordings with an introduction or an added guide come out slower than the narrator really reads.

| # | Narrator | Publisher | Release | Runtime | Pace (wpm) | Audible US rating / perf | Price | Where found today | Narrator (source) | ID, status |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Rosamund Pike | Audible Studios | Audible 2015-12-08 | 11 h 35 min (695 min) | 175 | **4.8 (43,975)** / 4.8; 3,181 reviews | $19.74 (API list); page shows a membership offer, no price | Audible US/UK/CA/AU only. UK 4.8 (7,704), £13.74, UK plans include KindleUnlimited. Not in Apple Books search, Libby (5 systems), hoopla or Kobo's first page | "British actress" (Wikipedia); played Jane Bennet in the 2005 film (Audible summary) | B016LN23CC; whispersync tag. VERIFIED |
| 2 | Lindsay Duncan | Audible Studios (SKU prefix `BK_BBCW`) | Audible 2006-02-28 | 12 h 3 min (723 min) | 168 | 4.7 (5,348) / 4.7; 484 reviews | $19.14; the US page shows **"Listen for free"** to a signed-out visitor; API plans "AnonFreeTier, Free Tier, AccessViaMusic" | Audible US/UK/CA/AU (UK 4.7 (1,496), £13.58, plans include Audible-AYCL); Apple Books $10.99, 12:04:15, 3.8 (5) | "Scottish actress" (Wikipedia) | B0036JWYQ0; whispersync tag. VERIFIED. That the recording began as a BBC production rests only on the SKU prefix: UNVERIFIED |
| 3 | Juliet Stevenson | Naxos AudioBooks | Naxos "Released: July 21"; Audible 2021-05-21; Apple 2021-05-06 | Audible 14 h 2 min (842); Naxos 14 h 03 m; Apple 14:02:45; OverDrive 14:02:50 | 145 | **4.9 (204)** / 4.8 | $22.35 | Audible (UK 4.8 (155), £14.35); Apple $29.99; Libby LAPL 2 copies (7 holds), KCLS 3 (7 holds); Naxos page links Audible, Spotify, Naxos Spoken Word Library and a Downpour CD | "English actress of stage and screen, and a narrator" (Wikipedia) | 1781983755; whispersync tag. AudioFile Earphones (4b). VERIFIED |
| 4 | Emilia Fox | Naxos AudioBooks | Naxos "Released: December 2004"; Audible 2004-12-26 | Audible 13 h 2 min (782); Naxos 13 h 03 m; Apple 13:02:13; OverDrive 13:02:25 | 156 | 4.7 (787) / 4.7 | $18.39 | Audible (UK 4.7 (587)); Apple $26.99; Libby NYPL 3, LAPL 2; Naxos links Spotify | "English actress" (Wikipedia) | B002V5CWJ4; whispersync tag. VERIFIED. OverDrive labels it "Abridged" with a 1996 date; its 13-hour runtime and Naxos's "unabridged" say otherwise |
| 5 | Indira Varma (Kristin Atherton also credited as reader) | Penguin Classics | Penguin "Published: 03/09/2020"; Audible 2020-09-03 | 13 h 27 min (807 min; Penguin "Length: 807 minutes"), **includes an introduction** | 151 (low because of the introduction) | 4.7 (195) / 4.8 | $15.70; Penguin £13.00 | Audible (UK 4.7 (36)); Apple $12.99, 4.4 (64); Penguin UK lists Apple Books, Audible, Bookshop.org, Google Play, Hive, Kobo, **Libro.fm**, Spotify, xigxag | "British actress and narrator" (Wikipedia) | 024145526X, ISBN 9780241455265; whispersync tag. VERIFIED. Who reads the introduction, and whose introduction it is: see 1d |
| 6 | Kate Beckinsale | Apple (© 2018 Apple Inc.) | Apple 2018-12-13 | 11:43:04 | 173 | n/a | **$0** on Apple Books US today | Apple Books only: "Actress Kate Beckinsale narrates this Apple Books exclusive audiobook" (description); 4.5 (8,598) | "English actress" (Wikipedia; also the description) | id1445220910. VERIFIED. That it stays free: UNVERIFIED (a 2023 Reddit commenter: "might have been a temporary deal") |
| 7 | Kate Reading | Books on Tape (OverDrive); the Apple listing's description is now Penguin's "official Netflix series tie-in edition" text | Apple 2000-12-12; OverDrive 2006-10-17 | Apple 12:08:09; OverDrive 12:08:59 | 167 | not found on Audible (keyword sweep, 4 markets) | Apple $16.99 | Apple 4.2 (203); Libby NYPL 3, LAPL 2 | **"American actress and audiobook narrator. She has won 6 Audie Awards and 46 Earphone Awards."** (Wikipedia) | id1417126571. VERIFIED |
| 8 | Carolyn Seymour | Blackstone | Audible 2011-01-28; OverDrive 2005-03-10 and 2011-01-19 (two listings) | 11 h 28 min; OverDrive 11:28:55 / 11:28:58 | 177 | 4.6 (1,902) / 4.5 | $18.97 | Apple $9.99; Libby in all 5 systems; hoopla (Blackstone, 11h 29m) | "English actress" (Wikipedia) | B004L72YX4; whispersync tag. VERIFIED |
| 9 | Emma Messenger | Trout Lake Media | Audible 2013-01-30 | 14 h 12 min | 143 | 4.6 (1,940) / 4.4 | $21.10 | Apple 4.0 (539), $25.99 | not checked | B00B76EJG2. VERIFIED |
| 10 | Katherine (Kate) Kellgren | Duke Classics | OverDrive (no date) | 12:20:38 | 165 | not on Audible sweep | library only | Libby: **LAPL 69 copies (62 available), SFPL 61 (53 available)**, NYPL 7 (34 holds), KCLS listed | "American actress, known for her narration of audiobooks" (Wikipedia) | OverDrive. VERIFIED |
| 11 | Josephine Bailey | Tantor | Audible 2008-03-12 | 11 h 20 min; OverDrive 11:20:37 | 179 | 4.6 (440) / 4.5 | $18.16 | Libby NYPL 3, LAPL 5, KCLS 40, SFPL 7, Chicago 4 (16 holds); Apple $19.99 | not checked | B002V01ILM. VERIFIED |
| 12 | Flo Gibson | Recorded Books (Audible 2006-07-24); also Audio Book Contractors (Audible 2008-10-30) | | 11 h 28 min; OverDrive 11:31:20 ("1980-01-01"); Kobo 11 h 30 min | 177 | 4.6 (252) / 4.5; ABC listing 4.4 (47) | $18.16 | Libby LAPL 2, KCLS 2; Kobo $25.99; Apple $21.99 | "American narrator of audiobooks" (Wikipedia) | B002V0LQ46, B002V8MFX4. VERIFIED |
| 13 | Alison Larkin | BMA and British Classic Audio (200th Anniversary Audio Edition) | Audible 2013-10-31 | 13 h 21 min; Apple 13:17:37; OverDrive 13:17:41 | 152 | 4.7 (188) / 4.6 | $20.42 | Libby LAPL 2; Apple $19.99. Also "with Songs from Regency England" (2016, 13 h 29 min, 4.6 (16)) | Audible summary: "AudioFile Earphones Award-winning narrator", "'the English American'" | B00GB8IMKU, B01MG7MWKY. VERIFIED |
| 14 | Rosalyn Landor | Dreamscape | Audible 2016-01-28 | 12 h 36 min | 161 | 4.8 (82) / 4.8 | $20.58 | Libby LAPL 3; hoopla 12h 35m; Apple $5.99 | "English film, television and stage actress and audio book narrator" (Wikipedia) | B01B518O1O. VERIFIED |
| 15 | Adjoa Andoh | Saga Egmont | Audible 2022-02-22 | 12 h 33 min | 162 | 5.0 (6) / 5.0 | $21.43 | hoopla 12h 33m; Kobo $19.99; Apple $14.99, 4.3 (8) | "British actress Adjoa Andoh" (Audible summary) | B09RTG4XPW. VERIFIED |
| 16 | Margarite (Apple: Marguerite) Gavin | Gildan (Audible); Ascent Audio (Apple "© 2013") | Audible 2013-02-08 | 12 h 3 min; Apple 12:03:25 | 168 | 4.6 (277) / 4.4 | $20.14 | Apple $19.99 | not checked | B00BCL3M42. VERIFIED |
| 17 | Helen Lisanti | Cherry Hill | Audible 2010-02-27 | 13 h 0 min | 156 | 4.5 (491) / 4.3 | $19.35 | Apple $22.99 | not checked | B003ACK4MO. VERIFIED |
| 18 | Victoria McGee | Trout Lake Media | Audible 2012-10-03 | 12 h 17 min | 165 | 4.4 (575) / 4.0 | $20.14 | Apple 3.6 (109) | not checked | B009KSQRGO. VERIFIED |
| 19 | Sharon Williams | Brilliance (AmazonClassics) | Audible 2017-06-28 | 11 h 7 min | 183 | 4.5 (246) / 4.4 | $20.40; plans include KindleUnlimited | Apple $19.99 | not checked | B072WWRBQT. VERIFIED |
| 20 | B. J. Harrison (male) | B.J. Harrison, "Classic Tales Edition" | Audible 2018-05-15 | 12 h 30 min | 163 | 4.7 (155) / 4.7 | $21.35 | hoopla 12h 30m | not checked | B07CV1SXD3. VERIFIED |
| 21 | Joanne Froggatt | SNR Audio | Audible 2024-08-07 | 13 h 16 min | 153 | 4.8 (8) / 4.9 | $21.69 | Apple $14.99 | "British actress" (Wikipedia) | B0D98TK4PY. VERIFIED |
| 22 | Karen Savage (paid release) | Saga Egmont | Audible 2017-05-12 | 11 h 1 min; Apple 11:01:41 | 184 | 4.7 (75) / 4.6 | $20.40 | Apple $12.99 | see 2a | B071S17YLK. VERIFIED as listed. Same recording as her free LibriVox one: UNVERIFIED (LibriVox runs 10:23:00) |
| 23 | Elizabeth Klett (paid release) | Paperless (2017); Pandora's Box (Apple, OverDrive) | Audible 2017-01-03 | 10 h 57 min; Apple (Pandora's Box) 11:01:29, $0.99, 4.3 (84) | 185 | 4.7 (34) / 4.7 | $20.11 | Libby NYPL 2 | see 2a | B01N4JBSNG. VERIFIED as listed; same recording as LibriVox v4: UNVERIFIED |
| 24 | Kate Redding (not Kate Reading) | InAudio (Audible, SKU prefix `BK_COMM`); "Spotify Audiobooks" (OverDrive) | Audible 2020-06-06; OverDrive and Apple 2012-01-01 | 11 h 58 min | 170 | 4.9 (9) / 5.0 | $20.49 | Kobo $14.99; Libby NYPL 4, LAPL 2; Apple $12.99 | "award-winning narrator with hundreds of audiobooks to her credit" (Audible summary) | 1467610496. VERIFIED. A different recording from Kate Reading's (runtime, publisher, year differ); whether the same person: UNVERIFIED |

Multi-voice unabridged (VERIFIED as listed): **Thrive Audio**, Catherine Bilson, Terah Tucker, Graham Scott, Linda Barrans, Denis Daly and "a full cast" (Audible 2023-02-21, 12 h 39 min, 5.0 (4), $21.43; Kobo $24.95; B0BVGHMZR9); **Spoken Realms 2026**, Lillian Rachel, Amanda Friday, Josh Innerst, Danielle Cohen, Jeff Moon and others (Audible 2026-08-12, 13 h 30 min; Apple 13:31:08, $22.99; B0HF1HWYVY).

Study and tie-in editions (VERIFIED as listed): **Naxos Educational Edition**, Juliet Stevenson and Nicholas Boulton, "Contains the unabridged audiobook and an educational audio guide" (guide by Francis Gilbert), 17 h 1 min, Naxos "Released: May 24", Audible $28.95 (B0D2JXKW7D), Apple $34.99, hoopla 17h 1m. **Penguin 2026 (UK/AU only on Audible)**, Jasmine Blackborow, with an introduction by Dolly Alderton, 13 h 21 min, 2026-10-08, £12.06: "Narrated by Jasmine Blackborow, who stars in Netflix's brand-new television adaptation of Pride and Prejudice" and "SOON TO BE A NETFLIX SERIES, ADAPTED FOR TELEVISION BY DOLLY ALDERTON AND STARRRING EMMA CORRIN AND JACK LOWDEN" (Audible UK summary, B0HCBT7G64). Audible US also lists a Vintage Digital "Now a major Netflix series adapted by Dolly Alderton" edition dated 2026-11-19, no narrator or runtime yet (B0HP1N5NF2). The series' release date: UNVERIFIED.

### 1b. Abridged, dramatised and adapted versions (flag in the post)

| Version | Kind | Publisher, release | Runtime | Rating / price | Notes | Status |
|---|---|---|---|---|---|---|
| **Audible Original**, adapted by Lulu Raczka: Marisa Abela (Elizabeth), Harris Dickinson (Darcy), Marianne Jean-Baptiste and Bill Nighy (Mrs and Mr Bennet), Glenn Close (Lady Catherine), with Sophie Wilde, Will Poulter, Jessie Buckley, Toheeb Jimoh, Patricia Allison, Bertie Carvel, Leah Harvey, David Gyasi, Rosalind Eleazar | Full-cast adaptation with "an original score by Grammy-nominated composer, Morgan Kibby"; "a retelling … like no other"; "Available in Dolby Atmos"; format `original_recording` | Audible Originals, 2025-09-09 | **4 h 34 min (274 min)** | US **4.8 (7,336)** / 4.9, 1,627 reviews, $14.79; UK 4.8 (2,144) | **2026 Audie Awards, Audiobook of the Year finalist** (audiopub.org). No whispersync tag. Reddit 1nr5x2q (2025): "there were times it was hard to hear the VAs over the bgm" | VERIFIED. B0FBS2CPR7 |
| BBC Radio 4 full-cast dramatisation: Amanda Root, David Troughton, Samantha Spiro, Pippa Nixon and cast | Radio drama | BBC Audio, Audible 2014-08-14 | 2 h 50 min; OverDrive 02:50:58 | US 4.6 (287), $16.98; UK 4.8 (98); Apple 4.5 (28), $12.99 | Libby LAPL 3, KCLS 5. Original broadcast year UNVERIFIED | VERIFIED. B00M9AYWC6 |
| BBC Radio 4 "Drama on 4", 2025: Luke Thompson (Darcy), Miles Jupp (Mr Bennet), Gaia Wise (Kitty), "dramatised by award winning writer Rachel Joyce" | Radio drama, "In two parts" | BBC Radio 4 / BBC Sounds, December 2025 (Sue Terry Voices; BBC Media Centre lists Austen's six novels "adapted for audio drama" for the 250th anniversary, collection launched 6 December) | UNVERIFIED | n/a | The 2025 query family ("bbc radio 4 2025", "luke thompson") points here. Whether it is sold as an audiobook: UNVERIFIED | VERIFIED (cast, writer, parts) |
| Patricia Hodge, "A BBC Radio 4 reading" | Reading; Audible's format field says "unabridged", but at 3 h 49 min it cannot be the whole novel | BBC Digital Audio, 2026-03-25 | 3 h 49 min | no ratings; $7.25 | | VERIFIED as listed. B0GQZT47FQ |
| **Juliet Stevenson, abridged** (same narrator and plain title as row 3) | Abridged | Hodder & Stoughton, 2006-07-26 | 2 h 47 min | US 4.7 (3), $8.04; UK 3.4 (10) | The trap audiobook.co.uk also flags | VERIFIED. B0032NADVS |
| Jenny Agutter | Abridged, Naxos "Young Adult Classics" | Naxos, "Released: April 2009" (Audible also lists a 1999 edition, 3 h 39 min) | 3 h 40 min | US 4.3 (30), $6.90 | Libby NYPL, LAPL | VERIFIED |
| Joanna David | Abridged | Penguin, Audible 2012-12-06 | 5 h 41 min | 4.5 (21), $10.86 | Libby NYPL | VERIFIED |
| Joanna Lumley | Abridged | CSA Word 2005; The Copyright Group 2011; Canongate (hoopla, Libby) | 2 h 12 min | 4.7 (6) | | VERIFIED |
| Jane Lapotaire (2 h 57 min), Neil Conrich (2 h 43 min), Angela Lansbury (53 min), Cathy Ritchie (54 min, Listener's Digest), Joy Rosselli (Real Reads, 40 min) | Abridged | various | as stated | | | VERIFIED |
| L.A. Theatre Works: Kate Burton, Miriam Margolyes and cast (2009, 2 h 5 min, 4.2 (140)); a second LATW production (2014, 1 h 49 min) | Dramatised (stage play for radio) | L.A. Theatre Works | as stated | | hoopla marks both "abridged" | VERIFIED |
| Oxford Bookworms Library Stage 6, Judy Bennett | "Adaptation", a graded reader for learners of English | OUP, 2011 | 3 h 13 min | 4.5 (15) | | VERIFIED |
| SmartPass study guide (full-cast extracts with commentary) | Study guide | SmartPass, 2006 | 4 h 22 min | 4.0 (6) | | VERIFIED |
| "Pride and Prejudice: A Play" (Mary Keith Medbery Mackaye's stage adaptation) | Play, LibriVox (free) | LibriVox 2012-12-27; also Spoken Realms on Audible | 2:42:55 | | 20 readers | VERIFIED |
| Christian Neale, Library of Alexandria | Labelled **"unabridged"**, but 4 h 37 min (121,850 words in 277 minutes would be 440 words a minute) | 2026-05-28 | 4 h 37 min | 4.8 (32) | Not the whole novel | VERIFIED as listed. B0H34BZW7B |

Every complete solo reading found runs **10 h 23 min (Karen Savage, LibriVox) to 14 h 27 min (LibriVox version 5)**; paid solo editions run 10 h 57 min (Elizabeth Klett, Paperless) to 14 h 12 min (Emma Messenger). A listing far below 10 hours is an abridgment or an adaptation. VERIFIED (tables 1a, 2a).

### 1c. The named narrators people search for (autocomplete, scout.md)

| Searched name | What exists (verified today) |
|---|---|
| Rosamund Pike (1250) | Unabridged, Audible Studios 2015, 11 h 35 min, Audible only |
| Juliet Stevenson (1251, the top narrator completion) | **Two**: unabridged Naxos 2021 (14 h 2 min) and an abridged Hodder 2006 (2 h 47 min) under the same plain title; plus the Naxos Educational Edition (17 h 1 min) |
| Karen Savage (1250) | Free LibriVox version 3 (2007, 10:23:00) and a paid Saga Egmont release (2017, 11 h 1 min) |
| **Julie Andrews (1250, twice)** | **Real.** Noiser's podcast "Jane Austen Stories", season 1: "Join Dame Julie Andrews as she reads Jane Austen's original, unabridged classics, brought to life with original music and immersive sound design" (feed and noiser.com). 25 parts, 29 Sep to 23 Dec 2025, **17 h 16 min of episodes** in all (RSS durations, include music and any ads). Free; Noiser launched it on 30 September 2025 "narrated by Dame Julie Andrews" (Sounds Profitable press release, 2025-09-30); listed on BBC Sounds ("Jane Austen Stories - Pride and Prejudice - Part 1 - BBC Sounds", DuckDuckGo result title). Not an Audible audiobook. Unabridged rests on Noiser's own wording: not checked against the text |
| Emilia Fox | Unabridged, Naxos 2004, 13 h 2 min |
| Lindsay Duncan | Unabridged, Audible Studios 2006, 12 h 3 min |
| Kate Reading | Unabridged, Books on Tape, 12 h 8 min; Apple Books and Libby; not on Audible's keyword sweep |
| "kate redding" (autocomplete also has this) | A different listing: InAudio / Spotify Audiobooks, 11 h 58 min |
| Flo Gibson | Unabridged, Recorded Books, 11 h 28 min |
| Kate Beckinsale (autocomplete "narrated by kate beckinsale") | Unabridged, Apple Books exclusive, free today |
| Jennifer Ehle | **No audiobook found.** She read the book aloud on YouTube during 2020: video "Reading Pride and Prejudice Part 1" on the channel "Jennifer Ehle, Reading From My Car etc" (YouTube oEmbed, read today); Reddit 2020 and 2022: "She is currently about three-quarters of the way through the book", "recorded herself reading it all the way through chapter by chapter … Not the best audio quality". Completeness UNVERIFIED |
| Elizabeth Klett | Free LibriVox version 4 (2010, 11:09:53) and paid releases (Paperless, Pandora's Box) |
| Claire Foy, Alexis Bledel, Sally Ann Burnett (in autocomplete) | Not found on Audible (4 markets, keyword sweep), Apple Books or OverDrive. UNVERIFIED whether they exist anywhere |
| Irene Sutcliffe | Audio Partners recording, a **1999 Audie finalist, Solo Narration—Female**; AudioFile review lists "Duration: 11 hrs, 30 mins", edited by David M. Shapard, release Feb. 4, 2005. Not found on sale today |
| BBC (1250) | Three different things: the 2014 Radio 4 dramatisation (2 h 50 min), the 2025 Radio 4 drama (BBC Sounds), the 2026 Patricia Hodge reading (3 h 49 min). Plus Julie Andrews' Noiser series on BBC Sounds. None is the 1995 TV series |
| "audible full cast" (1251), "audiobook cast" (1250) | The 2025 Audible Original adaptation (1b) |

### 1d. Notes per main edition

- **Rosamund Pike (Audible Studios, 2015).** Summary: "vividly brought to life by Academy Award nominee Rosamund Pike ( Gone Girl ). In her bright and energetic performance … her performance in the 2005 feature film version of the novel provide the perfect foundation". By far the most-rated: 43,975 US ratings, about eight times the next (Lindsay Duncan, 5,348). Audible-only. Reddit: "it was the first time I realised how funny the book can be" (158o7bt, 9 points, 2023); "Rosamund Pike narrates Sense & Sensibility and Pride and Prejudice on Audible" (159zxo2, 37 points, 2023, top comment on a request for an English accent). One dissent: 1kv9c4r (2025) "I love Rosamund I couldn't get through it. Returned it. I eventually found Indira Varma did a version and I'm in love." and "Pike's speed is already on slow side" (a listener's perception; by runtime she is among the faster readers at about 175 wpm). Not available as a DRM-free file. VERIFIED.
- **Juliet Stevenson (Naxos, 2021).** AudioFile on Kirkus: "Stevenson's flawless performance, sparkling with her distinctive voice and lyrical accent, brings Austen's story to life." and "Dialogue is lively and easy to follow." Earphones marker on the page. Kirkus header gives "RELEASE DATE: June 5, 2020" and "Duration: 14 hrs, 3 mins"; Naxos says "Released: July 21" (2021) and Audible 2021-05-21: use 2021, and flag (section 9). The slowest of the main editions (14 h 2 min, about 145 wpm). Naxos credits "Produced by: John Foley; Edited by: Andrew Riches". Reddit 159zxo2: "Juliet Stevensons are very good! Calm and charming." (20 points). VERIFIED.
- **Lindsay Duncan (Audible Studios, 2006).** Second most-rated (5,348). The US page shows "Listen for free" to a signed-out visitor; which membership or free tier that means: UNVERIFIED. Reddit: "The one on audible by Lindsay Duncan is my favorite!" (xgg1bl, 4 points, 2022). VERIFIED.
- **Emilia Fox (Naxos, 2004).** Reddit g759jf (2020): "I just listened to the Emilia Fox version. I really liked it!" VERIFIED.
- **Indira Varma (Penguin Classics, 2020).** Penguin's credit line: "Indira Varma (Read by), Kristin Atherton (Read by), Tony Tanner (Introducer)"; the same page's description says "This definitive recording includes an introduction by Vivien Jones"; Audible's authors field says "Tony Tanner - Introduction" and its summary says Vivien Jones. Whose introduction, and whether Kristin Atherton reads it: UNVERIFIED. The 807 minutes include it. Penguin lists Libro.fm (a DRM-free store) among its retailers: VERIFIED on Penguin's page; the Libro.fm listing itself is UNVERIFIED (blocked).
- **Kate Beckinsale (Apple Books, 2018).** "Apple Books exclusive audiobook"; free; 8,598 ratings, the most of any Apple listing found. Not a file you can export. VERIFIED.
- **Kate Reading (Books on Tape).** The American narrator. audiobookaccomplice.com (2021-04-03): "Kate Reading makes this my all-time FAVORITE P&P!!!" and "I kept pausing to Google Reading to make sure that, no really, the awesome woman AIN'T a jolly ol' Brit!", which suggests a British-sounding performance; but that review gives "Length: 11 hrs and 58 mins", the Kate Redding listing's runtime, so which recording it describes is unclear. Do not quote it. Reddit 6u32xm (2017): "I am a big fan of Kate Reading, and love her reading of Pride and Prejudice." (3 points). VERIFIED (quotes), conflict noted.
- **Katherine Kellgren (Duke Classics).** The easiest to borrow: LAPL 69 copies with 62 available, SFPL 61 with 53 available. Reddit 1exxj71 (2024): "I enjoyed to the version narrated by Kate Kellgren." / "I loved Kate Kellgren narrating!" VERIFIED.
- **Karen Savage** and **Elizabeth Klett**: section 2a.

### 1e. Smaller listings (VERIFIED as listed; not recommended without more checks)

Audible US also lists unabridged readings by Anne Flosnik (Alpha DVD, 2008, 12 h 32 min, 4.5 (155)), Beth Kesler (Page2Page, 2019, 12 h 16 min, 4.3 (73)), Marnye Young and Ramón de Ocampo (Silverton Agency, 2019, 13 h 11 min, 5.0 (30); its summary, "A poor country squire is trying to find husbands for his five daughters", reads like an adapted text, UNVERIFIED), Claire King ("a well known and loved British TV actress", 2018, 12 h 14 min), Harriet Stevens (2015), Shiromi Arserio (Spoken Realms, 2017, 11 h 42 min, 4.9 (15)), Eleanor Burrows (2019), NM Few ("Narrated by NM Few in a British accent", 2023, 12 h 9 min), Sam Kusi (2025), Stevie Zimmerman (Box Hill, 2026), Susan Edni, Amelia Clarke, Megan Green, Claire Storey, Eunike Lanti, Heather Long, Brady Smith, three Library of Alexandria listings (Nicky Griffiths, Terran Rae Smith, Sammy Cheung, 2026), "Down to Sleep" (2025), and synthetic-voice editions ("Virtual Voice", "AI Voice", Storyside "Eleanor [AI]", DeepRest Classics). Kobo's first page adds Jan Cramer (Kobo Editions, 2019, 12 h 17 min, $10.99 "or Free with Kobo Plus") and Steve Patriarca (2020, 11 h 47 min). hoopla adds Andre Reaves (12h 11m), Robert Larson (11h 3m) and several AI-voice editions. Spotify's public album page lists "Pride and Prejudice (Unabridged Audiobook)" by Wendy Ellison Mullen (2010, "about 11 hr", 71 tracks).

### 1f. Three questions the autocomplete asks

- **American accent ("pride and prejudice audiobook american accent", 1250).** No store page or review we read says any complete recording is narrated in an American accent. American narrators who recorded it: **Kate Reading** (Books on Tape; Apple, Libby), **Flo Gibson** (Recorded Books; Audible, Libby, Kobo), **Katherine Kellgren** (Duke Classics; Libby) and **Elizabeth Klett** (free LibriVox version 4; she "spend[s] my days teaching … at a university in Houston, TX" and lists "American, Southern, NY, British, Irish, Scottish accents" in her voice demo, elizabethklettaudio.com). Which accent each uses for the narration and for the characters: UNVERIFIED (not listened). The searches cut both ways: r/janeausten 159zxo2 (2023, 24 points): "Does anyone have any recommendations for an audiobook with an English accent? I'm having a bit of trouble with the American accented ones I have found." and "I'm an American, but I can't imagine listening to Jane Austen in an American accent. All wrong!" (6). Safe wording: "If you want an American narrator, Kate Reading, Flo Gibson and Katherine Kellgren are American; play a sample to hear the accent they use for Austen."
- **Male narrator ("audiobook male narrator", "male voice").** Complete readings under men's names: B. J. Harrison (Classic Tales Edition, 12 h 30 min, 4.7 from 155, the most-rated), Steve Patriarca (Kobo, 11 h 47 min). VERIFIED as listed; the listing pages do not state the narrator's gender, so the writer should say "read by B. J. Harrison" and let the sample speak, or check before writing "male narrator".
- **Different voices ("audiobook with different voices", "full cast").** Complete text with several voices: LibriVox version 6, the "dramatic reading" (26 readers, free, 11:57:51); Ballarat National Theatre's podcast (27 actors, free, 30 episodes, 14 h 28 min, section 2b); Thrive Audio and Spoken Realms (paid, 1a). Adaptations with a cast: the Audible Original (4 h 34 min) and the BBC dramatisations. Julie Andrews' series is one narrator with music and sound design. VERIFIED.

---

## 2. Free recordings

### 2a. LibriVox (six complete versions of the novel, one in progress, one play)

All read Project Gutenberg #1342 (API `url_text_source`). LibriVox API, catalogue pages and archive.org metadata/advancedsearch, read today. VERIFIED.

| Version (LibriVox id) | Readers | Runtime | Sections | Catalog date | archive.org downloads | archive.org reviews (avg) | Implied pace (our calc) |
|---|---|---|---|---|---|---|---|
| Version 1 (253), group | 13 readers (coordinator Chris Goringe) | 13:06:44 | 37 (e.g. "Chapters 1-3") | 2006-03-14 | **10,311,607** | 4.89 (9) | 155 wpm |
| Version 2 (254), solo | **Annie Coleman Rothenberg** | 13:25:01 | 35 ("Ch. 1-4" …) | 2006-01-25 | 6,270,522 | 4.8 (5) | 151 wpm |
| **Version 3 (1480), solo** | **Karen Savage** | **10:23:00** | 61, one per chapter | 2007-11-26 | **7,370,665** | 4.25 (17) | **196 wpm**, the fastest |
| **Version 4 (4023), solo** | **Elizabeth Klett** | 11:09:53 | 61 | 2010-05-05 | 5,471,661 | **4.91 (12)** | 182 wpm |
| Version 5 (969), two readers | Micah Sheppard, Linda Lee Paquet | 14:26:52 | 57 | 2011-02-27 | 714,968 | none | 141 wpm |
| Version 6 (5349), **dramatic reading** | 26 readers, one per character | 11:57:51 | 61 | 2011-07-24 | 535,507 | 5 (1) | 170 wpm |
| In progress (22765) | KEllieP | no runtime | 61 listed | no catalogue page, no archive.org item | | | |
| "Pride and Prejudice: A Play" (6415), Mary Keith Medbery Mackaye's adaptation (Gutenberg #37431) | 20 readers | 2:42:55 | 4 acts | 2012-12-27 | 216,991 | none | n/a |

- Zip sizes on the catalogue pages: v1 368.8 MB, v2 377.4 MB, v3 299 MB, v4 321.6 MB, v5 397 MB, v6 342.1 MB. VERIFIED.
- The site's published P&P figures ("121,676 words, 13 hours 25 minutes (151 words a minute)", `content/blog/how-long-is-an-audiobook.md` line 33) are LibriVox **version 2**, Annie Coleman Rothenberg; `best-librivox-app.md` and `how-to-read-classics-without-getting-bored.md` link that same catalogue page. Keep consistent. VERIFIED in the repo.
- Reviews and listener opinion. Karen Savage: Reddit g759jf (2020): "Librivox has a good version for free, read by Karen Savage." xgg1bl (2022): "Karen Savage on librivox is my absolute favorite. I can't even tell you the number of times I have listened to it." (11 points). 159zxo2: "Karen Savage singlehandedly got me into audiobooks." (6). The one recurring complaint, 1exxj71 (2024): "while I think she's a great narrator, all of the voices sound the same and it's hard for me to differentiate between characters." Elizabeth Klett: 159zxo2 "For free there are a few by Elizabeth Klett I like a lot. Especially S&S and P&P. She is the voice of Lizzie in my head now." (2); archive.org review titles include "Professional quality, highly recommend" and "So professional you may consider selling its CDs". VERIFIED (quotes).
- Karen Savage's own site: "professional narrator since 2009", "volunteered as a narrator on LibriVox.org since 2006", "a native speaker of both English and Spanish" (voice.karenrsavage.com). Her accent: UNVERIFIED (a Reddit listener: "I'm not English so I'm not sure what her accent is").
- Which one to pick for free: **Karen Savage (v3)** is the most-recommended solo reading and the shortest; **Elizabeth Klett (v4)** has the best archive.org average; **v6** for a voice per character. The most-downloaded, v1, changes reader between sections.

### 2b. Other legal free routes (read today)

- **Julie Andrews, Noiser "Jane Austen Stories"** (podcast; section 1c). Free in podcast apps and on BBC Sounds; Noiser+ subscribers "can also enjoy exclusive early access to additional episodes" (press release). VERIFIED.
- **Ballarat National Theatre podcast** (Australia, community theatre): "a dramatic reading of Jane Austen's beloved classic … each episode will feature 2-3 chapters", director Liana Emmerson, 2020 to 2021, 30 episodes; feed: "A Pride and Prejudice audiobook performed by 27 actors with gorgeous ambient sounds and music", "2021 Webby Award Honoree in the 25th Annual Webby Awards (Limited Series Podcast - Scripted Fiction)". 30 episodes total **14 h 28 min** (RSS). Whether every sentence is kept: UNVERIFIED. Reddit: "There is a free version by Balleret Theatre that's really good. It has a full cast of actors." (158o7bt, 3). VERIFIED.
- **Kate Beckinsale on Apple Books**, $0 today (1a). VERIFIED.
- **Lindsay Duncan on Audible US**: "Listen for free" shown to a signed-out visitor. Conditions UNVERIFIED.
- **Jennifer Ehle's YouTube readings** (1c). Exists; completeness UNVERIFIED.
- YouTube full uploads (SERP results) and an Internet Archive upload of a commercial recording exist; rights not checked. Do not recommend.

---

## 3. Our own data on the text (Project Gutenberg #1342)

Source file: https://www.gutenberg.org/cache/epub/1342/pg1342.txt, downloaded 2026-11-12 into its own folder; header "Release date: June 1, 1998 [eBook #1342] Most recently updated: September 1, 2026"; SHA-256 `3f6bb9d6f78e0293b56acd4714dd68cb7d6d1d293402031ce9d5a216bcaf9d75`. It is the 1894 George Allen edition with George Saintsbury's preface and Hugh Thomson's illustrations ("Credits: Chuck Greif and the Online Distributed Proofreading Team"). Gutenberg's record page (read today): "Reading ease score: 69.2 (8th & 9th grade). Neither easy nor difficult to read.", "230347 downloads in the last 30 days", "Last Update Sep 29, 2026", "This title is also available as eBook #42671". Script: `scripts/pp-wordcount.py` (same counting rules as `wp-wordcount.py`). All OUR CALCULATION unless marked.

### 3a. Word count

| Count | Words |
|---|---|
| 1. Whitespace tokens between the START/END markers | 127,360 |
| 2. Tokens with a letter or digit | 127,302 |
| 3. Novel only (CHAPTER I heading to "the means of uniting them.") | 122,344 |
| 4. As 3, also splitting on "--" and em dashes | 122,645 |
| **5. As 4, without the 154 illustration captions (673 words) and the chapter headings: the novel as a narrator reads it** | **121,850** |
| Saintsbury's preface alone (not read on any audiobook checked) | 4,316 |
| **Site's published figure** (`how-long-is-an-audiobook`, method not recorded) | **121,676** (0.1% below ours) |
| Figure in the classics post's notes (`docs/seo/drafts/2026-10-29-…/notes.md`, a sentence-count script) | 117,830, "probably a different start or end point" |

Recommendation: keep **121,676** in prose (the site's), or "about 122,000". Every listening time below is the same to within a minute either way.

### 3b. Chapters and volumes

- **61 chapters.** Our script finds CHAPTER I to LXI in #1342 (two headings, XIII and XIV, lack the full stop). VERIFIED.
- **First edition: three volumes, 23 + 19 + 19 chapters.** Wikisource's transcription of the 1813 first edition lists Volume I Chapters 1 to 23, Volume II Chapters 1 to 19, Volume III Chapters 1 to 19 (61 links, counted by script), and notes "The 1st edition, published in three volumes on 28 January 1813 by T. Egerton, Whitehall" and "The 3rd edition, published in two volumes in 1817". VERIFIED (Wikisource; secondary for the date).
- **How editions number them:** #1342 (and the LibriVox recordings made from it, whose file titles run "Chapter 01" to "Chapter 61") number 1 to 61 straight through. The 1813 edition, and modern editions that keep its division (autocomplete: "how many chapters are in pride and prejudice penguin classics", "how many chapters in pride and prejudice volume 1/2/3"), restart at Chapter 1 in each volume. Checked by first sentence: our Chapter 24 ("Miss Bingley's letter arrived, and put an end to doubt") is Wikisource's Volume II, Chapter I; our Chapter 43 ("Elizabeth, as they drove along, watched for the first appearance of Pemberley Woods") is Volume III, Chapter I. VERIFIED. Which specific modern editions restart the numbering: UNVERIFIED book by book (the Penguin print edition was not opened).
- Conversion: Volume II, Chapter n = Chapter 23 + n; Volume III, Chapter n = Chapter 42 + n. So Darcy's letter (our Ch. 35) is Volume II, Chapter 12; Pemberley (Ch. 43) is Volume III, Chapter 1; Lady Catherine's visit (Ch. 56) is Volume III, Chapter 14.

| Volume (1813) | Our chapters | Words | At 151 wpm |
|---|---|---|---|
| I | 1 to 23 | 41,105 | 4 h 32 min |
| II | 24 to 42 | 33,942 | 3 h 45 min |
| III | 43 to 61 | 46,803 | 5 h 10 min |

Chapter length: mean 1,998 words (13.2 min at 151 wpm), median 1,831 (12.1 min); only 14 of 61 chapters take under 10 minutes. Shortest: Ch. 12 (676 words, 4.5 min), Ch. 2 (798), Ch. 1 (849). Longest: **Ch. 18, the Netherfield ball (5,178 words, about 34 min)**, Ch. 43 Pemberley (4,858, about 32 min), Ch. 47 (4,087), Ch. 16 (3,377), Ch. 52 (3,029).

### 3c. Listening time

| Words | 1x | 1.25x | 1.5x | 2x |
|---|---|---|---|---|
| 121,676 (site) at 151 wpm | **13 h 26 min** | 10 h 45 min | 8 h 57 min | 6 h 43 min |
| 121,850 (ours) at 151 wpm | 13 h 27 min | 10 h 46 min | 8 h 58 min | 6 h 43 min |
| 121,676 at 155 wpm (ACX 9,300 an hour) | 13 h 5 min | 10 h 28 min | 8 h 43 min | 6 h 33 min |

Days to finish at 151 wpm, site figure (805.8 min), rounded up: 30 min a day: 27 days at 1x, 22 at 1.25x, 18 at 1.5x, 14 at 2x; 60 min a day: 14, 11, 9, 7. (The classics post's "At 20 minutes a day, the 13 hours 25 minutes … take about six weeks" agrees.) Silent reading at Brysbaert's 260 wpm for fiction: 121,676 / 260 = **7 h 48 min** (the site's why-cant-i-focus post already says "about 7.8 hours").

**Real recordings, from their runtimes** (pace = 121,850 / runtime; time at 1.25x / 1.5x / 2x):

| Recording | Runtime | 1.25x | 1.5x | 2x | wpm |
|---|---|---|---|---|---|
| Karen Savage, LibriVox v3 | 10:23:00 | 8 h 18 min | 6 h 55 min | 5 h 12 min | 196 |
| Elizabeth Klett, LibriVox v4 | 11:09:53 | 8 h 56 min | 7 h 27 min | 5 h 35 min | 182 |
| Rosamund Pike | 11 h 35 min | 9 h 16 min | 7 h 43 min | 5 h 48 min | 175 |
| Kate Beckinsale | 11:43:04 | 9 h 22 min | 7 h 49 min | 5 h 52 min | 173 |
| LibriVox v6 dramatic reading | 11:57:51 | 9 h 34 min | 7 h 59 min | 5 h 59 min | 170 |
| Lindsay Duncan | 12 h 3 min | 9 h 38 min | 8 h 2 min | 6 h 2 min | 168 |
| Kate Reading | 12:08:09 | 9 h 43 min | 8 h 5 min | 6 h 4 min | 167 |
| Katherine Kellgren | 12:20:38 | 9 h 53 min | 8 h 14 min | 6 h 10 min | 165 |
| Emilia Fox | 13 h 2 min | 10 h 26 min | 8 h 41 min | 6 h 31 min | 156 |
| Annie Coleman Rothenberg, LibriVox v2 | 13:25:01 | 10 h 44 min | 8 h 57 min | 6 h 43 min | 151 |
| Indira Varma (with introduction) | 13 h 27 min | 10 h 46 min | 8 h 58 min | 6 h 44 min | 151 |
| Juliet Stevenson | 14 h 2 min | 11 h 14 min | 9 h 21 min | 7 h 1 min | 145 |
| Emma Messenger | 14 h 12 min | 11 h 22 min | 9 h 28 min | 7 h 6 min | 143 |
| Ballarat National Theatre podcast | 14 h 28 min | 11 h 34 min | 9 h 38 min | 7 h 14 min | 140 |
| Julie Andrews, Noiser (episodes incl. music) | 17 h 16 min | 13 h 49 min | 11 h 30 min | 8 h 38 min | 118 (not a reading pace) |

Full list (31 recordings) in the script output. Caveats: LibriVox runtimes include short spoken announcements; Penguin includes an introduction; podcast episodes include intros, music and possibly ads. So these paces slightly understate each narrator's speed. Across the 25 complete solo readings in 1a and 2a (Varma left out for her introduction), the median pace is 167 wpm, or 165 wpm if the paid Savage and Klett releases are left out as possible duplicates; range 143 (Emma Messenger) to 196 (Karen Savage). OUR CALCULATION. The site's 151 wpm median is a different set: ten LibriVox readers across ten books.

### 3d. Dialogue, unattributed speech, letters

- **46.8% of the words sit inside quotation marks** (57,027 of 121,850). War and Peace (Maude): 21.8%; Crime and Punishment (Garnett): 55.4% (sibling research). Includes quoted letters. By volume: I 48.8%, II 45.1% (40.5% without Darcy's letter), III 46.3%. Austen wrote that the second volume has "a larger proportion of narrative" (letter of 29 January 1813, research-evidence.md); our count agrees, and Volume II is also the shortest in words (33,942).
- **Unattributed speech** (rough heuristic): of 1,227 paragraphs that open with a quotation mark, 754 (61.5%) have no speaker name or speech verb outside the quotes. 55 runs of four or more such paragraphs in a row. Longest: 18 paragraphs in Ch. 60 (Elizabeth and Darcy), 15 in Ch. 52, 12 in Ch. 29 (Lady Catherine questioning Elizabeth: "Do you play and sing, Miss Bennet?" "A little."), 12 in Ch. 56, and **10 in Ch. 1** (Mr. and Mrs. Bennet), within the first five minutes of any recording. A listener has to track who speaks by voice and content. OUR CALCULATION; the heuristic misses attributions inside the quotes and counts a letter's paragraphs as speech.
- **Letters.** "letter"/"letters" 131 times, in 33 of 61 chapters. **Darcy's letter (Ch. 35, "Be not alarmed, madam" to the signature) is 2,604 words, about 17 minutes at 151 wpm**, of a 3,001-word chapter: a long stretch in Darcy's first person read by the same narrator.
- Mean sentence 17.4 words (rough split on . ! ?; the classics post measured 20.9 with a different splitter, so do not compare the two). First sentence: 23 words.

### 3e. Names and forms of address (for the "who is who" section)

Whole-word, case-sensitive counts in the novel text of #1342; contexts checked by hand with `scripts/pp-contexts.py` where noted. Roles only, no spoilers.

| Person | Forms in the text (count) | Who uses which form | The trap for a listener |
|---|---|---|---|
| Elizabeth Bennet | Elizabeth 634; **Lizzy 95**; Eliza 23 (Miss Eliza 9); Miss Elizabeth 12; **"Miss Bennet" 26 times** | Family say Lizzy; Charlotte, Sir William and Miss Bingley say Eliza / Miss Eliza (Bennet) | "Miss Bennet" usually means Jane, but Darcy, Bingley, Wickham and Lady Catherine call Elizabeth "Miss Bennet" when speaking to her (Ch. 10 four times, 16, 18, 29, 31, 32, 37, 44, and **11 times in Ch. 56**) |
| Jane Bennet | Jane 292; **"Miss Bennet" 39 times** | The eldest unmarried daughter is "Miss Bennet": every use in Ch. 1 to 9 is Jane | Same title as above |
| Mr. Darcy | Darcy 417 (Mr. Darcy 273) | Narration and almost everyone | His first name appears **twice**: "Mr. Fitzwilliam Darcy" (Ch. 25) and the letter's signature "FITZWILLIAM DARCY" (Ch. 35) |
| Colonel Fitzwilliam, Darcy's cousin | Colonel Fitzwilliam 30; "Fitzwilliam" alone 5 (Lady Catherine: "What is that you are saying, Fitzwilliam?", Ch. 31; narration Ch. 31, 33) | | "Fitzwilliam" is Darcy's first name and his cousin's surname |
| Georgiana Darcy | Miss Darcy 39; Georgiana 15 | | |
| Mr. Bingley | Bingley 306 (Mr. Bingley 114); Charles 7 (his sisters, Ch. 8 to 11 and Ch. 21) | | "Bingley" alone can be him or, as "Miss Bingley", his sister |
| Caroline Bingley | Miss Bingley 87; Caroline 16 | | |
| Louisa Hurst | Mrs. Hurst 21; Louisa 6 | | |
| Kitty Bennet | Kitty 71; **Catherine 10** (all narration, e.g. "Catherine and Lydia") | | Two Catherines: Kitty and **Lady Catherine** (116; "Lady Catherine de Bourgh" 14; "her/your ladyship" 42) |
| Lydia Bennet | Lydia 170; Mrs. Wickham 3 | | Her married name appears late |
| Charlotte Lucas | Charlotte 85; Miss Lucas 25; **Mrs. Collins 29** | "Miss Lucas" is Charlotte until her marriage (24 times); in Ch. 30 it is her younger sister Maria | Charlotte becomes "Mrs. Collins" |
| Mr. and Mrs. Bennet | Mr. Bennet 89; Mrs. Bennet 154 | | No first names |
| Others | Mr. Collins 149; Wickham 194 (Mr. Wickham 68); Sir William 44; Lady Lucas 18; Maria 20; Mr. Gardiner 34; Mrs. Gardiner 57; Mrs. Philips 20 (this edition's spelling); Colonel Forster 27; Mrs. Forster 12; Mrs. Long 14; Mrs. Reynolds 9 | | |
| Places | Longbourn 88; Netherfield 73; Meryton 57; Pemberley 53; Rosings 49; Hunsford 25 | | |

OUR CALCULATION (counts) and OUR READING (who each "Miss Bennet" is; recount before publishing). The free Project Gutenberg text has no list of characters.

### 3f. Other Austen-specific listening difficulties (from our data)

- Long chapters: 47 of 61 take 10 minutes or more; the ball chapter about 34.
- Free indirect speech: Austen narrates characters' thoughts without "she thought"; one study found only "a quarter of the study participants could hear the 'dual voice'" in a Pride and Prejudice passage (research-evidence.md).
- One reader carries 17 minutes of Darcy's letter in his voice, after 12 chapters in which he is seen from outside.
- The same title for different people ("Miss Bennet", "Miss Lucas", "Fitzwilliam", "Catherine").

---

## 4. What listeners say

### 4a. Reddit (Arctic Shift API; scores as stored there, read 2026-11-12)

| Thread | Sub, date | Score / comments | Short remarks (comment score) |
|---|---|---|---|
| https://www.reddit.com/r/audible/comments/aqgn06/ "Pride and Prejudice narrated by Rosamund Pike is $0.99 with WhisperSync and Kindle book is free" | r/audible, 2019-02-14 | 56 / 14 | A past deal; not current |
| https://www.reddit.com/r/PrideandPrejudice/comments/158o7bt/ "I love the audiobook." | 2023-07-24 | 36 / 15 | "I adore Rosamund Pike's reading - I think listening to it was the first time I realised how funny the book can be." (9). "There is a free version by Balleret Theatre that's really good. It has a full cast of actors." (3) |
| https://www.reddit.com/r/janeausten/comments/159zxo2/ "Jane Austen Audiobooks" | 2023-07-26 | 24 / 36 | OP wants "an audiobook with an English accent" and has "trouble with the American accented ones". Pike (37), Stevenson (20, 12, 6, 3), Andoh "great too! She is excellent at bringing out the humour", Karen Savage (13, 6), Indira Varma (6), Kate Beckinsale "I got it on iBooks for free but that might have been a temporary deal" (2) |
| https://www.reddit.com/r/audible/comments/1kv9c4r/ "Cannot focus on listening Pride and Prejudice (Resumed Pike's narration)" | 2025-05-25 | 0 / 20 | "I love Rosamund I couldn't get through it. Returned it. I eventually found Indira Varma did a version and I'm in love." (5) |
| https://www.reddit.com/r/audiobooks/comments/1wz2r5y/ "Julie Andrews reads Emma and Pride and Prejudice!" | 2026-10-06 | 11 / 6 | "It's on BBC Sounds in the UK" (1) |
| https://www.reddit.com/r/PrideandPrejudice/comments/xgg1bl/ "Best Audio recording." | 2022-09-17 | 4 / 14 | Pike "absolutely perfect" (12); Karen Savage "my absolute favorite" (11); Jennifer Ehle's YouTube series (8, 3); Lindsay Duncan (4); Elizabeth Klett (2) |
| https://www.reddit.com/r/audiobooks/comments/g759jf/ "Are there any good 'Pride and Prejudice' audiobooks out there?" | 2020-04-24 | 3 / 10 | Karen Savage (2), Lindsay Duncan (1), Pike (1), Emilia Fox (1), Alison Larkin "the best" (1), the LibriVox dramatic reading (1) |
| https://www.reddit.com/r/audiobooks/comments/1exxj71/ "Good narration for Pride & Prejudice?" | 2024-08-21 | 2 / 4 | Karen Savage: "all of the voices sound the same"; Kate Kellgren enjoyed (3, 2) |
| https://www.reddit.com/r/suggestmeabook/comments/p6bzjh/ "Pride & Prejudice Audiobook" | 2021-08-17 | 3 / 13 | Pike (3), Lindsay Duncan "well done" (2), "jane austen needs to be read in an english accent" (2) |
| https://www.reddit.com/r/PrideandPrejudice/comments/1d11tzn/ "Public Domain Audiobook" | 2024-05-26 | 11 / 12 | Elizabeth Klett (5), "the 2007 Karen Savage one" (4) |
| https://www.reddit.com/r/audiobooks/comments/6u32xm/ "Best Narrators for Little Women and Pride and Prejudice" | 2017-08-16 | 3 / 3 | Kate Reading (3), Karen Savage and Elizabeth Klett (2), Barbara Caruso (1) |
| https://www.reddit.com/r/audible/comments/1negsnh/ "Loving the new fullcast pride and prejudice" | 2025-09-11 | 7 / 1 | |
| https://www.reddit.com/r/audiobooks/comments/1nr5x2q/ "Just finished the Audible version of Pride and Prejudice" | 2025-09-26 | 4 / 2 | "hard to hear the VAs over the bgm" |
| https://www.reddit.com/r/janeausten/comments/18xkszy/ | 2024-01-03 | 1 / 14 | "the P&P one was disappointing and they made some baffling changes" (1, on a BBC dramatisation) |
| https://www.reddit.com/r/audiobooks/comments/kg4n3s/ | 2020-12-19 | 8 / 11 | Library choice: Josephine Bailey, Kate Kellgren, Carolyn Seymour |

Pattern: Rosamund Pike is named first in nearly every thread; Karen Savage is the free reading people love; Juliet Stevenson is the British-accent favourite; Lindsay Duncan, Emilia Fox, Indira Varma, Adjoa Andoh, Kate Reading and Kate Kellgren have fans. Listeners repeatedly ask for (a) an English accent, (b) distinct character voices. VERIFIED (from the comments above).

### 4b. Awards and reviews

- **2026 Audie Awards, Audiobook of the Year, FINALIST**: "Pride and Prejudice By Jane Austen and Lulu Raczka Narrated by Marisa Abela, Harris Dickinson, Glenn Close, Marianne Jean-Baptiste, Bill Nighy, … Published by Audible Originals" (https://www.audiopub.org/2026audieawards-winners). VERIFIED.
- **1999 Audies, Solo Narration—Female, finalist**: "Pride and Prejudice by Jane Austen; narrated by Irene Sutcliffe (The Audio Partners Publishing Corp.)" (https://www.audiopub.org/1999-audies-1). VERIFIED.
- No other P&P recording in any Audie page 1996 to 2026; the 2011 and 2012 hits are "Pride and Prejudice and Zombies" (Katherine Kellgren). Rosamund Pike's recording appears in none. VERIFIED by the scan.
- **AudioFile (on Kirkus)**: Juliet Stevenson, Earphones marker, quoted in 1d (https://www.kirkusreviews.com/audiobook-reviews/jane-austen/pride-and-prejudice-2/); Irene Sutcliffe, no marker (…/pride-and-prejudice/). No AudioFile review page found for Pike, Duncan, Fox or Varma (…-3 to …-8 return 404). VERIFIED.
- Alison Larkin is billed as an "AudioFile Earphones Award-winning narrator" (Audible summary; publisher claim). Kate Reading's 6 Audies and 46 Earphones: Wikipedia (secondary).

---

## 5. HushBook facts (positive framing; verified in source at HEAD c0040d1 and on the live site copy)

### 5a. Is Pride and Prejudice in Discover?

- **No curated catalogue.** Discover is a live search of archive.org's LibriVox and Internet Archive collections (D:\hushbook\lib\core\store\librivox_provider.dart:17 `kIaPageSize = 24`; :682 `collection:librivoxaudio`, `mediatype:audio`; provider order D:\hushbook\lib\core\store\store_models.dart:675; pages merged index by index, D:\hushbook\lib\core\store\store_repository.dart:187, 386 `mergeCatalogPages`; default sort all-time downloads, D:\hushbook\lib\core\store\catalog_filter_queries.dart:88, 93). Pride and Prejudice appears on the Discover tile's decorative cover fan ("Decorative art from the bundled catalogue", D:\hushbook\lib\features\library\widgets\library_discover_card.dart:85-92; D:\hushbook\lib\features\home\widgets\discover_tile.dart:211-219): art only, not a featured title. VERIFIED.
- **Live result of the app's exact query for "pride and prejudice"** (`scripts/pp-discover-cards.mjs`, read 2026-11-12):

| # | Card title | Library | Length (card) | archive.org rating | Download (64 kbps MP3) | Chapters | archive.org id |
|---|---|---|---|---|---|---|---|
| 1 | Pride and Prejudice | LibriVox | 13h 7m | 4.89 (9) | 360 MB | 37 | pride_and_prejudice_librivox (version 1, 13 readers) |
| 2 | Pride and Prejudice | Internet Archive | no length | 0 (1) | | | synapseml_gutenberg_pride_and_prejudice_by_jane_austen (collection "gutenberg-audiobooks") |
| **3** | **Pride and Prejudice (version 3)** | LibriVox | **10h 23m** | 4.25 (17) | **299 MB** | **61** | pride_prejudice_krs_librivox (**Karen Savage**) |
| 4 | JANE AUSTEN Pride And Prejudice [ Stevenson] | Internet Archive | no length | | | | jane-austen-pride-and-prejudice-stevenson (see 5d) |
| 5 | Pride and Prejudice (version 2) | LibriVox | 13h 25m | 4.8 (5) | 369 MB | 35 | solo_pride_librivox (Annie Coleman Rothenberg) |
| 6 | pride_and_prejudice_1005_librivox | Internet Archive | no length | | | | an untitled item; identifier resembles LibriVox v4's; contents not checked |
| **7** | **Pride and Prejudice (version 4)** | LibriVox | **11h 10m** | 4.91 (12) | **307 MB** | **61** | prideandprejudice_1005_librivox (**Elizabeth Klett**) |
| 8 | Pride and Prejudice (version 5) | LibriVox | 14h 27m | none | 397 MB | 57 | pride_prejudice_1102_librivox |
| 9 | Pride and Prejudice (version 6 dramatic reading) | LibriVox | 11h 58m | 5 (1) | 329 MB | 61 | prideandprejudice_1107_librivox |
| 10 | Pride and Prejudice: A Play | LibriVox | 2h 43m | none | 75 MB | 4 | prideandprejudice_1212_librivox |

  Card meta line "length · rating (count)" (D:\hushbook\lib\features\store\widgets\store_cover_card.dart:55); length in whole rounded minutes; the rating shows **one decimal** (`discoverRatingLabel`, NumberFormat('0.0'), D:\hushbook\lib\features\store\discover_copy.dart:58-60), so do not quote card ratings to two decimals; size in MB under 1 GB. VERIFIED (code plus live data; not observed on a device).
- **"Read by" says "Reader not listed" for every P&P item** (D:\hushbook\lib\l10n\app_en.arb:7617 `discoverReaderNotListed`): the 64 kbps files carry no `artist` tag and the other formats carry "Jane Austen", which does not count (method in the War and Peace research, librivox_provider.dart and reader_credit.dart, same HEAD). **So the post must name the card ("Pride and Prejudice (version 3)"), never "Karen Savage in Discover".** VERIFIED.
- **Which LibriVox recording HushBook would play:** whichever card the listener picks. The top card is version 1 (13 readers, 37 sections). For one voice: **version 3 (Karen Savage, 3rd card)** or **version 4 (Elizabeth Klett, 7th card)**. Version 3 arrives as one book with 61 chapters titled "Chapter 01" to "Chapter 61"; version 4 "01 - Chapter 01" to "61 - Chapter 61" (file titles, `scripts/pp-librivox-detail.mjs`; one chapter per file, store_import_service.dart, per the War and Peace research). VERIFIED.
- "Play a sample" (app_en.arb:8697 `discoverSamplePlay`) plays 30 s of chapter 1, starting 30 s in when chapter 1 is at least 2 minutes (D:\hushbook\lib\core\audio\sample_preview.dart:10-17). Karen Savage's Chapter 01 file is a full chapter, so the sample skips the LibriVox introduction. VERIFIED (code).

### 5b. Reading along, names, speed, platforms (site copy and source)

- "Words fill in as the narrator reads them, with a red underline on the current one. Long-press any line to play from there." (D:\hushbook.app\index.html:1033). "Playing from here" (app_en.arb:8633); "Tap a line to jump there" is an off-by-default switch (app_en.arb:8453). Never "tap any word". VERIFIED.
- "On the phone, each chapter is ready to read the moment it finishes." (index.html:1027). "Added to library. Transcription queued." (app_en.arb:771). VERIFIED.
- **Character map**, free: "Character map" (app_en.arb:879), "First heard" with "Ch. {chapter} · {time}" (app_en.arb:2160-2161), role chips including Hero (app_en.arb:2219-2221), Notes and Relationships (War and Peace research, same HEAD). One name field per card plus Notes: so "add Elizabeth once and keep Lizzy, Eliza and Miss Bennet in her card's notes". Characters are added by hand; "Transcript suggestions become available after transcription" (app_en.arb:1069) is an empty-state string, do not claim suggestions. VERIFIED.
- Speed 0.5x to 3x in 0.05x steps (D:\hushbook\lib\features\player\widgets\playback_speed_sheet.dart:26, 34, 38). VERIFIED.
- "Mark: highlight, note or quote" (app_en.arb:8753). VERIFIED.
- Files you own: "MP3, M4A, M4B, AAC, WAV, FLAC, OGG, OPUS, OGA, AIFF, AIF, CAF, WMA, MKA, and ALAC … Chapters inside M4B files are detected automatically" (index.html:668). Desktop: "Import MP3 and M4B files or whole folders." (desktop.html:431). VERIFIED.
- Offline: "After the one-time HushBook Engine download, playback, read-along, and transcription run on your device without an internet connection." (index.html:756). VERIFIED.
- Platforms: iPhone, Android, Windows ("Free · Windows 10 or 11, 64-bit", desktop.html:334; "Free and unlimited. No cap on books or hours.", desktop.html:347; "Discover … Free public-domain audiobooks to browse and download.", desktop.html:433). Live App Store version **1.3.5**, released 2026-10-30, free, iOS 16.4+, 5 stars (4 ratings) (iTunes lookup id 6783243597, read today). VERIFIED.
- Price: "The core read-along experience and the public-domain library are free. There's an optional Pro upgrade for advanced analytics" (index.html:676). "With Pro, Transcribe on my PC sends it to your computer over home Wi-Fi." (index.html:1021). VERIFIED.
- Privacy: "Transcription runs on-device. There is no account and no cloud upload of your audio." (D:\hushbook.app\llms.txt:3). VERIFIED.
- "Sync with e-book": "Attach a matching, DRM-free EPUB, PDF or TXT" (app_en.arb:2113); first sync free, then Pro (D:\hushbook\lib\core\ebook\ebook_sync_allowance.dart:6, 33). Not needed for this post.
- An existing app render of the P&P player exists: `tools/mockups/out/en-player-pride-prejudice.png` (for the image agent); `can-kindle-read-to-you-read-along.webp` already shows P&P chapter 1 in read-along.

### 5c. Route to a paid recording with read-along

A DRM-free MP3 or M4B copy you own. Penguin UK lists Libro.fm (which sells DRM-free files) for the Indira Varma recording (VERIFIED on Penguin's page; the Libro.fm listing itself UNVERIFIED, blocked). Naxos links Downpour for the Stevenson CD. Audible, Apple Books (Beckinsale) and Libby titles are not files you own.

### 5d. Do not claim (HushBook)

1. That Discover names the reader (it shows "Reader not listed" for every P&P item). Name the card title.
2. That Pride and Prejudice is featured, curated or "built in" in Discover. It appears in search results and as decorative cover art. (The homepage's "Start with Monte Cristo, Austen, or Aurelius from the built-in catalogue", index.html:1381, is existing site copy; do not repeat "built-in" in the post.)
3. Card ratings to two decimals, or a fixed card position for each version (positions depend on live download counts; today's order above).
4. That HushBook plays Audible, Apple Books (Beckinsale), Libby, Spotify or Noiser podcast audio. Scope: "free public-domain recordings and audio files you own without DRM".
5. **The 4th Discover card ("JANE AUSTEN Pride And Prejudice [ Stevenson]", an Internet Archive upload in collection `audio_bookspoetry`, 2023)**: never mention it in the post. It looks like an upload of a commercial recording. Flag to the owner (notes.md).
6. Transcript-based character suggestions; "tap any word"; that the character map is filled automatically.
7. That e-book sync is needed or recommended for this book.
8. Owner rule: no list of what HushBook cannot do, no limits paragraph, no DRM disclaimer, no "No" cells for HushBook. Scope the positive claim instead.

---

## 6. Competing pages: provable factual errors (state the right fact; do not name them)

Pages fetched today (`scripts/pages.mjs`).

- **thebooksinsider.com** "Pride and Prejudice Audiobook: Length & Free Listen (10.6 hrs)" (time element 2026-10-12): "Pride and Prejudice runs about 10.6 hours, our estimate from its 358 pages at a typical narration pace." No complete recording is that short: the shortest is Karen Savage's free one at 10 h 23 min (10.4 h), paid editions start at 10 h 57 min, and the edition its own page describes (Indira Varma, Penguin) runs 13 h 27 min. A second URL on the same site says "10.4 hrs". VERIFIED.
- **annotatedebooks.com** (published 2026-06-12, modified 2026-11-12; sells an annotated edition): "The free LibriVox recording runs 12 hours" (there are six complete LibriVox versions, 10:23:00 to 14:26:52; none is 12 hours exactly) and "The original text takes about 10 hours at average reading speed" (121,676 words at Brysbaert's 260 wpm average for fiction is 7 h 48 min). VERIFIED.
- **audiobookfest.com** "Best Audiobook Versions of Pride and Prejudice" (published and modified 2024-11-15, about 1,330 words; picks Alison Larkin, Rosamund Pike, Emilia Fox, Flo Gibson, Karen Savage): calls Flo Gibson's "slower, measured tone" and says of Pike "Some may find the pacing slower". By runtime both are among the faster readers: Flo Gibson 11 h 28 min (about 177 wpm), Pike 11 h 35 min (about 175 wpm), against Juliet Stevenson's 14 h 2 min (about 145 wpm). It gives no runtimes, years or publishers, and omits Juliet Stevenson, Lindsay Duncan (the second most-rated), Indira Varma, Kate Beckinsale, Julie Andrews and the Audible Original. VERIFIED.
- **audiobook.co.uk** "Which Pride and Prejudice recording should you buy?" (no date in markup; 11 Audible UK recordings; affiliate): correct as checked (Pike, Duncan, Fox, Stevenson runtimes; the Stevenson abridgment; the Christian Neale listing; the Audible Original). Missing: LibriVox, Apple, Libby, the American narrators, BBC, the Varma recording.
- **audiobookaccomplice.com** (2021-04-03): Kate Reading review with an 11 h 58 min length, which matches Kate Redding's listing, not Kate Reading's 12 h 8 min. Not an error we can prove; do not cite.
- Reddit misattribution: "Rosamund Pike (Kane Bennet from the 2005 movie.)" (g759jf; a typo for Jane). Trivial.

---

## 7. Picks, with the evidence

- **Best overall: Rosamund Pike (Audible Studios, 2015, 11 h 35 min).** 4.8 from 43,975 ratings on Audible US (performance 4.8), 7,704 more on Audible UK: by far the most-rated recording of the book anywhere checked. Named first in nearly every Reddit thread; "listening to it was the first time I realised how funny the book can be". She played Jane Bennet in the 2005 film. Audible only (not Apple, Libby or DRM-free). Some listeners find her hard to focus on (one 2025 thread).
- **Runner-up / best for a British stage voice: Juliet Stevenson (Naxos, 2021, 14 h 2 min).** 4.9 from 204 (the highest average among recordings with 100+ ratings); AudioFile Earphones: "Stevenson's flawless performance". Sold on Audible and Apple, borrowable from Libby (LAPL, KCLS), on Spotify per Naxos. Warning: her 2 h 47 min Hodder abridgment has the same title.
- **Also strong:** Lindsay Duncan (4.7 from 5,348; shown "Listen for free" on Audible US today); Emilia Fox (Naxos 2004, 4.7 from 787); Indira Varma (Penguin 2020, 4.7 from 195; Penguin lists Libro.fm, so a DRM-free copy route; a Reddit listener switched from Pike to her).
- **Best free: Karen Savage, LibriVox version 3 (2007, 10 h 23 min).** The free reading listeners name most (Reddit 2017 to 2024), 7,370,665 archive.org downloads, one chapter per section (61), the shortest complete recording (about 196 wpm). In HushBook Discover: the card "Pride and Prejudice (version 3)", 299 MB. Alternative: **Elizabeth Klett, version 4** (11 h 10 min, archive.org 4.91 from 12, "Professional quality"). Also free but not files: Kate Beckinsale on Apple Books ($0 today), Julie Andrews' Noiser series (podcast).
- **Best dramatised:** the **Audible Original (2025)**, full cast led by Marisa Abela and Harris Dickinson, 4.8 from 7,336, a 2026 Audie Audiobook of the Year finalist; but it is a 4 h 34 min **adaptation**, not the novel. For the whole novel with a cast, free: **LibriVox version 6, dramatic reading** (26 readers, 11 h 58 min) or Ballarat National Theatre's podcast (27 actors, 14 h 28 min, Webby honoree).
- **Best American accent: none verified.** American narrators: Kate Reading (Apple, Libby), Flo Gibson (Audible, Libby, Kobo), Katherine Kellgren (Libby, widely available), Elizabeth Klett (free LibriVox). Their accent for Austen is unverified; the writer should say "American narrator", not "American accent", unless someone listens.
- **Best to borrow:** Katherine Kellgren (Duke Classics, 12 h 21 min): LAPL 69 copies (62 available), SFPL 61 (53 available) today; Carolyn Seymour is in all five library systems checked.

---

## 8. Ready-to-paste comparison table (VERIFIED rows only)

| Narrator | Runtime | Publisher | Year | Audible US rating | Where we found it |
|---|---|---|---|---|---|
| Rosamund Pike | 11 h 35 min | Audible Studios | 2015 | 4.8 (43,975) | Audible |
| Lindsay Duncan | 12 h 3 min | Audible Studios | 2006 | 4.7 (5,348) | Audible, Apple Books |
| Juliet Stevenson | 14 h 2 min | Naxos AudioBooks | 2021 | 4.9 (204) | Audible, Apple Books, Libby, Spotify |
| Emilia Fox | 13 h 2 min | Naxos AudioBooks | 2004 | 4.7 (787) | Audible, Apple Books, Libby, Spotify |
| Indira Varma | 13 h 27 min (with introduction) | Penguin Classics | 2020 | 4.7 (195) | Audible, Apple Books, Kobo, Libro.fm, Spotify, Google Play |
| Kate Beckinsale | 11 h 43 min | Apple | 2018 | not on Audible | Apple Books (free on Nov 12, 2026) |
| Kate Reading | 12 h 8 min | Books on Tape | 2000 (Apple) | not on Audible | Apple Books, Libby |
| Carolyn Seymour | 11 h 28 min | Blackstone | 2011 | 4.6 (1,902) | Audible, Apple Books, Libby, hoopla |
| Katherine Kellgren | 12 h 21 min | Duke Classics | n/a | not on Audible | Libby |
| Flo Gibson | 11 h 28 min | Recorded Books | 2006 | 4.6 (252) | Audible, Apple Books, Libby, Kobo |
| Karen Savage (LibriVox version 3) | 10 h 23 min | LibriVox | 2007 | Free | LibriVox, Internet Archive, HushBook Discover |
| Elizabeth Klett (LibriVox version 4) | 11 h 10 min | LibriVox | 2010 | Free | LibriVox, Internet Archive, HushBook Discover |
| 26 readers (LibriVox version 6, dramatic reading) | 11 h 58 min | LibriVox | 2011 | Free | LibriVox, Internet Archive, HushBook Discover |
| Annie Coleman Rothenberg (LibriVox version 2) | 13 h 25 min | LibriVox | 2006 | Free | LibriVox, Internet Archive, HushBook Discover |
| Julie Andrews (Noiser podcast, 25 parts) | 17 h 16 min of episodes | Noiser | 2025 | Free | Podcast apps, BBC Sounds |

Not the novel, to flag: Audible Original full-cast adaptation (2025, 4 h 34 min); BBC Radio 4 dramatisation (2014, 2 h 50 min); BBC Radio 4 drama (2025, two parts, BBC Sounds); Patricia Hodge's BBC Radio 4 reading (3 h 49 min); Juliet Stevenson abridged (Hodder, 2 h 47 min); Jenny Agutter abridged (Naxos, 3 h 40 min); Joanna David abridged (Penguin, 5 h 41 min); L.A. Theatre Works (2 h 5 min).

Year notes: Stevenson 2021 (Naxos and Audible; Kirkus says June 5, 2020); Fox 2004 (Naxos "December 2004"); Kate Reading 2000 is Apple's date (OverDrive 2006-10-17); Seymour 2011 is Audible's (OverDrive also lists a 2005 Blackstone release). "Spotify" for the Naxos titles rests on Naxos's links; the Penguin stores on Penguin UK's list.

---

## 9. What we could not verify

1. **Accents.** No recording was listened to. Which accent Kate Reading, Flo Gibson, Katherine Kellgren, Elizabeth Klett or Karen Savage use for Austen: unknown.
2. **Libro.fm, Chirp, Spotify search, Kobo beyond page 1, Amazon/Kindle pairing**: blocked or login-only. Whispersync tags exist on the Audible pages for Pike, Duncan, Fox, Stevenson, Varma, Seymour and Kate Redding; which Kindle edition pairs with each: unknown.
3. **"Listen for free" on Lindsay Duncan's US page** and Kate Beckinsale's $0 on Apple: what plan, and for how long.
4. **Julie Andrews' series is unabridged** only on Noiser's word; not checked against the text. Ad content in the 17 h 16 min unknown.
5. **Ballarat National Theatre podcast**: whether every sentence is read.
6. **2025 BBC Radio 4 drama**: runtime; whether sold as an audiobook (an Amazon listing "Jane Austen: The 250th Anniversary Collection: Four Full-Cast BBC Radio…" appeared in search results, not opened).
7. **Penguin's introduction**: Tony Tanner or Vivien Jones; who reads it.
8. **Juliet Stevenson's release year**: 2021 (Naxos, Audible) vs June 5, 2020 (Kirkus).
9. **Whether the paid Karen Savage (Saga Egmont, 11 h 1 min) and Elizabeth Klett (Paperless, 10 h 57 min) releases are their LibriVox recordings.**
10. **Kate Reading vs Kate Redding**: different listings; whether the same person.
11. **Jennifer Ehle's YouTube reading**: whether complete.
12. **The Netflix series' release date** (Penguin UK: "Soon to be a Netflix series"; Audible US tie-in dated 2026-11-19).
13. **Original broadcast year of the 2014-released BBC dramatisation.**
14. **Claire Foy, Alexis Bledel, Sally Ann Burnett P&P recordings** (autocomplete only).
15. **People Also Ask / Google SERP** (scout.md).

---

## 10. Sources (opened 2026-11-12)

Audible
- Catalogue API: https://api.audible.com/1.0/catalog/products?keywords=pride+and+prejudice&num_results=50&response_groups=contributors,product_desc,product_attrs,rating,media,sample,series,relationships (and .co.uk, .ca, .com.au; 23 keyword sets); per-ASIN `/1.0/catalog/products/{ASIN}?response_groups=…price,product_plans…`
- Rendered product pages (`?ipRedirectOverride=true&overrideBaseCountry=true`): https://www.audible.com/pd/B016LN23CC (Pike) · /pd/B0036JWYQ0 (Duncan) · /pd/B002V5CWJ4 (Fox) · /pd/1781983755 (Stevenson) · /pd/024145526X (Varma) · /pd/B0FBS2CPR7 (Audible Original) · /pd/B00M9AYWC6 (BBC 2014) · /pd/B004L72YX4 (Seymour) · /pd/1467610496 (Kate Redding)
- API only: B00B76EJG2, B009KSQRGO, B003ACK4MO, B002V01ILM, B00BCL3M42, B002V0LQ46, B002V8MFX4, B072WWRBQT, B00GB8IMKU, B01MG7MWKY, B002V1NS96, B07CV1SXD3, B01B518O1O, B071S17YLK, 2291067281, B01N4JBSNG, 1094121339, B07DD352R8, B00QMXA8OW, B00YI1DIRE, B06ZYZ19G3, B0D98TK4PY, B09RTG4XPW, B0BVGHMZR9, B0HF1HWYVY, B0D2JXKW7D, B0CTJ29FFG, B0HHK2CS8F, B0GQZT47FQ, B002V5GVUK, B0032NADVS, B00AEW0NVU, B002V1BOYC, B00ICUYRW2, B002VA9VOS, B005AM92I4, B0038VOBDU, B0036HY2IU, B004I42PUC, B002VAELU2, B003YUXUXW, B0H34BZW7B, B0HP1N5NF2; UK: B016LNBZOE, B004FTGCUE, B004FU4H4Q, 1781983755, 024145526X, B0FBS55SLD, B00M9B2T34, B0HCBT7G64, B0DF8VKR94, B072BPLLLS

Apple Books
- https://itunes.apple.com/search?term=pride+and+prejudice&media=audiobook&country=us&limit=200 (and 8 more terms)
- https://books.apple.com/us/audiobook/id1445220910 (Beckinsale) · id1417126571 (Kate Reading) · id1740088641 (Stevenson) · id1748220870 (Fox) · id1529115228 (Varma) · id1161711182 (Duncan) · id1646154810 (Seymour) · id1538561714, id1191649376 (Klett) · id1485917995 (Savage) · id1446073896 (BBC 2014) · id1422265957 (Kate Redding) · id598495555 (Messenger)

Publishers
- https://naxosaudiobooks.com/pride-and-prejudice-unabridged/ (Fox) · https://naxosaudiobooks.com/pride-and-prejudice-unabridged-2/ (Stevenson) · https://naxosaudiobooks.com/pride-and-prejudice-abridged/ (Agutter) · https://naxosaudiobooks.com/pride-and-prejudice-educational-edition/
- https://www.penguin.co.uk/books/55905/pride-and-prejudice-by-austen-jane/9780241455265

Libraries and other stores
- https://thunder.api.overdrive.com/v2/libraries/nypl/media?query=pride%20and%20prejudice&format=audiobook-overdrive,audiobook-mp3&perPage=100 (also lapl, kcls, sfpl, chipublib)
- https://www.hoopladigital.com/search?q=pride%20and%20prejudice&scope=everything&type=direct&kindId=8
- https://www.kobo.com/us/en/search?query=pride%20and%20prejudice%20austen&fcmedia=AudioBook
- https://open.spotify.com/album/0CAEuM3pNrTwDLGZqEhNHh

Free and podcasts
- https://librivox.org/api/feed/audiobooks/?title=%5EPride%20and%20Prejudice&format=json&extended=1&limit=50
- https://librivox.org/pride-and-prejudice-by-jane-austen/ (v1) · https://librivox.org/pride-and-prejudice-by-jane-austen-solo-project/ (v2) · https://librivox.org/pride-and-prejudice-by-jane-austen-2/ (v3, Karen Savage) · https://librivox.org/pride-and-prejudice-solo-version-3-by-jane-austen/ (v4, Elizabeth Klett) · https://librivox.org/pride-and-prejudice-v-4-by-jane-austen/ (v5) · https://librivox.org/pride-and-prejudice-by-jane-austen-3/ (v6, dramatic) · https://librivox.org/pride-and-prejudice-a-play-by-mary-keith-medbery-mackaye/
- https://archive.org/metadata/pride_prejudice_krs_librivox · prideandprejudice_1005_librivox · pride_and_prejudice_librivox · solo_pride_librivox · pride_prejudice_1102_librivox · prideandprejudice_1107_librivox · prideandprejudice_1212_librivox
- https://www.noiser.com/jane-austen-stories · https://feeds.acast.com/public/shows/68cc0f36f3dd257283d8eda1 · https://soundsprofitable.com/press-release/noiser-launches-pride-and-prejudice-podcast-with-dame-julie-andrews
- https://bnt.org.au/podcast/pride-prejudice-podcast · https://rss.buzzsprout.com/1078322.rss
- https://www.youtube.com/watch?v=cVbLdOWjfhg (Jennifer Ehle, via oEmbed)

BBC
- https://www.sueterryvoices.com/news/luke-thompson-miles-jupp-gaia-wise-in-new-pride-prejudice-for-bbc-radio-4
- https://www.bbc.com/mediacentre/2025/jane-austen-radio-4-birthday-special-programming

Awards and reviews
- https://www.audiopub.org/2026audieawards-winners · https://www.audiopub.org/1999-audies-1 (and the 29 other year pages)
- https://www.kirkusreviews.com/audiobook-reviews/jane-austen/pride-and-prejudice-2/ (Stevenson) · https://www.kirkusreviews.com/audiobook-reviews/jane-austen/pride-and-prejudice/ (Sutcliffe)

Narrators
- Wikipedia REST summaries: Rosamund_Pike, Lindsay_Duncan, Juliet_Stevenson, Emilia_Fox, Indira_Varma, Kate_Beckinsale, Carolyn_Seymour, Rosalyn_Landor, Katherine_Kellgren, Flo_Gibson, Kate_Reading, Joanne_Froggatt, Julie_Andrews, Harris_Dickinson
- https://www.elizabethklettaudio.com/ · https://voice.karenrsavage.com/about-me/ · https://www.karenrsavage.com/librivox.htm

Text
- https://www.gutenberg.org/ebooks/1342 · https://www.gutenberg.org/cache/epub/1342/pg1342.txt
- https://en.wikisource.org/wiki/Pride_and_Prejudice · https://en.wikisource.org/wiki/Pride_and_Prejudice_(1813) (and /Volume_2/Chapter_1, /Volume_3/Chapter_1)

Reddit (Arctic Shift): thread URLs in 4a.
