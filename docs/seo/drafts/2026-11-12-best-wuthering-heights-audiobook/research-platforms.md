# Platform research: best Wuthering Heights audiobook

Post slug: `best-wuthering-heights-audiobook`. Researched November 12, 2026. Every claim carries a source, the date read (November 12, 2026 unless a line says otherwise) and **VERIFIED** (opened and seen today) or **UNVERIFIED**. **OUR CALCULATION** = produced by a saved script on a saved text or file. Prices and ratings change; each is a snapshot of 2026-11-12.

Scope: what a listener can get (editions, free recordings, listener opinion, HushBook, competing pages), plus the book data the comparison needs (word count, chapters, the Lockwood/Nelly frame, Joseph's dialect, names). The read-or-listen studies are in `research-evidence.md`.

## How pages were read

Same methods as `../2026-11-11-best-war-and-peace-audiobook/research-platforms.md`, scripts copied and adapted into `scripts/` here. Raw responses stay in the session scratchpad (`2655ba97…/scratchpad/`: `wh/`, `whp-audible/`, `whp-prod-*`, `whp-apple/`, `whp-od/`, `whp-lv/`, `whp-render/`, `whp-samples/`, `whp-pages/`, `whp-pub/`, `whp-pdf/`, `whp-reddit/`, `whp-audie/`, and download folders `wh-gutenberg-dl/`, `wh-gaskell-dl/`, `wh-ia-dl/`), outside git. Python ran with `-I`; every download went into its own new folder.

- **Audible catalogue API** (no auth), `.com`, `.co.uk`, `.ca`, `.com.au`, 22 keyword sets ("wuthering heights", "+bronte", "+unabridged", "+dramatisation", "+bbc", "+full cast", "+abridged", ten narrator names, "+naxos", "+penguin classics", "+audible original", "+retelling"), 2 pages each: 458 Bronte "Wuthering Heights" products (`scripts/wh-audible-catalog.mjs`). Product records for 37 ASINs (`scripts/wh-audible-products.mjs`, parsed with `scripts/audible-product-dump.mjs`). Narrator searches for the film cast and the searched narrators (`scripts/wh-audible-narrators.mjs`). Prices below are the API's list price.
- **Audible product pages** rendered in headless Chrome (sandbox on, `channel: 'chrome'`) with `?ipRedirectOverride=true&overrideBaseCountry=true` for eight US pages and the UK BBC page (`scripts/wh-render.mjs`): buy-box wording, top reviews, the `whispersync` data tag.
- **Apple Books**: iTunes Search API, 15 terms, and every matching `books.apple.com` page's schema.org data, 103 listings (`scripts/wh-apple.mjs`).
- **Libby / OverDrive**: thunder API for NYPL, LAPL, KCLS, SFPL, Chicago PL (`scripts/wh-overdrive.mjs`).
- **hoopla**: headless Chrome, 33 title pages (`scripts/wh-hoopla.mjs`); narrator lines did not parse, so rows are matched by publisher and length.
- **Kobo US** search page (curl, first page). **Libro.fm and Chirp: blocked** (Libro.fm HTTP 202 empty to curl and 403 in headless Chrome; Chirp 403 in headless Chrome, client-rendered to curl). **Spotify**: not checked (needs a login).
- **Publishers**: Naxos product page and PDF booklet; Penguin UK pages (film tie-in paperback, the 2012 Stevenson audio).
- **Two-voice and verbatim test**: Audible US sample MP3s, faster-whisper large-v3-turbo (CPU int8, VAD, first 120 to 240 s), median voice pitch per segment with librosa YIN, and 6-word shingle overlap with Gutenberg #768 (`scripts/wh_sample_voice.py`).
- **Text**: Project Gutenberg #768 (`scripts/wh-wordcount.py`); 1848 Harper and 1889 Smith, Elder OCR from archive.org for the 1847-versus-1850 check; Gaskell's Life of Charlotte Brontë (Gutenberg #1700).
- **LibriVox**: API, catalogue pages, archive.org metadata and advancedsearch (`scripts/wh-librivox-detail.mjs`). **Discover**: the app's own queries rebuilt (`scripts/wh-discover-cards.mjs`).
- **Reddit**: Arctic Shift API (`scripts/wh-reddit.mjs` plus a retry pass for comments). **Awards**: 31 Audie year pages on audiopub.org (`scripts/wh-audies.mjs`).
- **HushBook**: app source D:\hushbook at HEAD `c0040d1` (2026-11-05), pubspec `version: 1.3.5+70` (pubspec.yaml:4), the same HEAD as the War and Peace research; every line cited in section 7 was re-read today. The working tree has uncommitted `lib/l10n/app_*.arb` edits in other languages; citations are to HEAD files.

---

## 1. Complete (unabridged) recordings

### 1a. Master table (all values read 2026-11-12)

Ratings: Audible overall stars (number of ratings) / performance stars. Runtimes as each store prints them. "wpm" = 116,440 words (our count, section 4) divided by the Audible runtime; it includes any introduction, so editions with an introduction read the novel a little faster than shown. OUR CALCULATION.

| # | Narrator(s) | Publisher | Release | Runtime | wpm | Audible US rating / perf. | Audible UK rating / perf. | US list price (API) | Where else (checked today) | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | **Joanne Froggatt** (introduction by Ann Dinsdale, read by Rachel Atkins) | Audible Studios, "Public Domain (P)2017 Audible Ltd" | 2017-11-30 | 12 hrs 32 mins (752 min); Apple 12:32:29 | 155 | **4.4 (8,661) / 4.8 (7,952)** | 4.5 (1,385) / 4.8 | $21.30 | Audible US/UK/CA (4.4, 422)/AU (4.4, 630); Apple Books $20.99, 4.5 (47). Not in Libby (5 systems), not on hoopla | VERIFIED. B076PPDCYD (UK B076PLVXXG) |
| 2 | **Janet McTeer with David Timson** | Naxos AudioBooks; Naxos "Released: March 2006", "Produced by John Tydeman" | Audible 2006-01-01 | Audible 13 hrs 8 mins (788); Naxos 13 h 09 m, booklet "Total running time: 13:09:16"; Apple 13:08:11 | 148 | 4.2 (1,562) / 4.5 (1,110) | 4.5 (426) / 4.7 | $19.31 | Libby NYPL 14 copies (6 available), LAPL 4; Apple $26.99; Naxos links Audible, Spotify, Naxos Spoken Word Library; PDF booklet included on Audible ("the accompanying PDF will be available in your Audible Library"); hoopla has the 2024 Educational Edition (15 h 35 m) | VERIFIED. B002UZX6M2 (UK B004FTV5IS). Digital ISBN 978-962-954-466-9 |
| 3 | **Patricia Routledge** | Audible Studios ("© 2012 Audible Studios", Apple) | 2012-04-06 | 14 hrs 15 mins (855); Apple 14:15:45 | 136 | 4.3 (1,533) / 4.5 (1,411) | **4.5 (2,286) / 4.6**, the most-rated in the UK | $21.07; the US page shows **"Listen for free"** to a signed-out visitor; API plans "AnonFreeTier", "Free Tier" (UK adds "Audible-AYCL") | Apple $28.99, 3.4 (5). Not in Libby | VERIFIED. B002V8MFK2 (UK B004FT7NIO) |
| 4 | **Juliet Stevenson** | silksoundbooks ("© 2015 silksoundbooks Limited", Apple) | 2015-11-19 | 13 hrs 24 mins (804); Apple 13:24:40 | 145 | **4.6 (427) / 4.9 (398)** | **4.7 (507) / 4.9 (473)** | $20.82 | AU 4.8 (44); Apple $21.99, 4.3 (8). Not in Libby | VERIFIED. B0186DGBCI (UK B0186DHO8I). Not the 2 h 41 min abridgement she also read (1b) |
| 5 | **Aimee Lou Wood; Kristin Atherton** | Penguin Classics; Apple: "performed by Aimee Lou Wood… includes an introduction by Pauline Nestor" | 2020-09-03 | 13 hrs 58 mins (838); Apple 13:58:24; OverDrive 13:58:28 | 139 | 4.4 (202) / 4.5 (175) | 4.5 (94) / 4.7 | $15.70 | **Libby LAPL 47 copies (32 available)**; Apple $12.99, 4.3 (131); AU 4.5 (23) | VERIFIED. 0241440963 |
| 6 | **Michael Kitchen** | Audible Studios | 2006-10-13 | 11 hrs 38 mins (698); Apple 11:37:55 | 167 | 4.2 (327) / 4.5 | 4.3 (349) / 4.5 | $18.16 | AU 4.4 (88); Apple $14.99, 3.4 (28) | VERIFIED. B002V07ZY6 |
| 7 | **Emma Messenger** | Trout Lake Media | 2012-09-12 | 13 hrs 13 mins (793); Apple 13:14:36 | 147 | 4.0 (1,397) / 4.2 | 3.7 (72) / 3.6 | $20.36 | Apple $11.99, 3.9 (67) | VERIFIED. B0098ONW18 |
| 8 | **Michael Page and Laural Merlington** | Brilliance Audio (AmazonClassics Edition, "includes editorial revisions") | 2017-07-18 | 11 hrs 57 mins (717); Apple 11:58:16 | 162 | 4.1 (223) / 4.4 | 4.7 (6) | $20.40; API plans include **KindleUnlimited** | Apple $19.99, 4.1 (7). Same pair also on "The Classic Collection" (Brilliance, 2014, 11 hrs 15 mins, 4.1 (8)) | VERIFIED. B073X64BC3 |
| 9 | **Flo Gibson** | Recorded Books | Audible 1999-12-16 (OverDrive 1981) | 11 hrs 15 mins (675); OverDrive 11:16:21 | 173 | 3.9 (516) / 4.0 | n/a | $15.13 | **Libby in four systems** (NYPL 4, LAPL 2, KCLS 9, SFPL 4) | VERIFIED. B002V0KAH0 |
| 10 | **Anne Flosnik** | Tantor | 2008-07-28 | 12 hrs 19 mins (739); OverDrive 12:20:02 | 158 | 3.8 (229) / 4.0 | 4.7 (6) | $19.18 | Libby NYPL 5 (3 holds), SFPL 19, also LAPL, KCLS, Chicago; Apple $19.99 | VERIFIED. B002VA975Q |
| 11 | **Carolyn Seymour** | Blackstone | 2010-03-18 | 11 hrs 34 mins (694); Apple 11:35:06; hoopla 11h 35m; OverDrive 11:43:13 | 168 | 3.9 (81) / 4.2 | 4.0 (4) | $18.16 | Libby NYPL 16, SFPL 4, LAPL, KCLS; hoopla; Apple $14.99 | VERIFIED. B003D77X7U |
| 12 | **Judy Holt** | Damian Bonsall; summary: "brings this wonderful story to life with her authentic Yorkshire accent and dialect" | 2018-05-11 | 13 hrs 37 mins (817) | 143 | 4.5 (28) / 4.5 | 4.5 (17) / 4.9 | $22.16 | hoopla 13h 37m; Apple $12.99 | VERIFIED. B07CYQ8RFM. Small sample of ratings |
| 13 | **Billie Fulford-Brown** | Spotify Audiobooks | Audible UK 2024-07-12; Apple 2024-02-27 | 13 hrs 38 mins (818); Apple 13:38:40 | 142 | **not on Audible US** (the US catalogue record is empty) | no ratings | UK £14.45 | Apple $12.99; hoopla 13h 38m; Kobo US. She won the 2024 Audie for Best Fiction Narrator for a different book (The Last Lifeboat) | VERIFIED. UK B0D98N4C49 |
| 14 | **Ciaran Saward and Sherry Baines** | Arcturus Digital | Audible 2026-08-07; Apple 2026-02-01 | 13 hrs 14 mins (794); Apple 13:14:36 | 147 | no ratings | no ratings | $26.38 | Apple $7.99, 5 (1); hoopla 13h 14m; Kobo US | VERIFIED. B0HD99H5BX |
| 15 | Kate Petrie | A.R.N. Publications | 2015-09-22 | 11 hrs 1 min (661), the shortest complete listing | 176 | 4.6 (70) / 4.5 | none | $19.31 | Apple $21.99 | VERIFIED. B015NL1JQY |
| 16 | Donada Peters | Books on Tape | Apple 2009-11-17; OverDrive 2007-12-18 | OverDrive 11:12:54; Apple 11:11:00 | 174 | not on Audible (sweep) | n/a | n/a | Libby LAPL 3 copies; Apple $14.99, 5 (2). **2004 Audie finalist, Classic** (section 6b) | VERIFIED |

Totals and range: 16 rows above are complete, human-read, single-title recordings checked today. Shortest Kate Petrie 11 h 1 min; longest main edition Patricia Routledge 14 h 15 min; the free LibriVox solo reading runs 14 h 48 min 42 s (section 2). Pace 131 to 176 wpm across 18 complete recordings including the three LibriVox sets, median 151. OUR CALCULATION.

### 1b. Abridged, condensed, dramatised (flag in the post)

| Version | Kind | Publisher, release | Runtime | Ratings / price | Status |
|---|---|---|---|---|---|
| **BBC Radio 4 full-cast dramatisation**, "adapted by bestselling author Rachel Joyce"; Ben Batt, Chloe Pirrie, Emma Fielding and full cast ("Chloe Pirrie and Ben Batt star…") | Radio drama ("A full-cast BBC radio dramatisation"); Audible labels it "unabridged", it is an adaptation | BBC Digital Audio, 2018-07-05 | **2 hrs 17 mins** (137 min); Apple 2:17:28 | Audible UK 4.5 (39) / 4.7, £6.89; Apple $6.99, 4.3 (15) | VERIFIED. UK B07F1X5V76. On Audible US only inside "The Brontë BBC Radio Drama Collection: Seven Full-Cast Dramatisations" (BBC Digital Audio, 2018-10-04, 15 hrs 40 mins, 4.6 (141) / 4.9, $19.32, B07FSVD5Q1; Wuthering Heights is tracks 3 to 4). Original broadcast year UNVERIFIED |
| **Moira Quirk and Dan Stevens** | **Condensed, but listed "unabridged"** | Literati Audio, 2026-03-10 ("© 2026 by Literati Audio Productions"); hoopla shows Blackstone Publishing, 34 chapters | **7 hrs 41 mins** (461 min), which would be 253 wpm for the full text | US 4.5 (4); UK 5.0 (1); $18.06; Apple $16.99 | VERIFIED by sample: at the start of Chapter 2, **242 of the 493 Gutenberg words are not read**, including Lockwood's "Wretched inmates!" outburst and all three of Joseph's lines ("T' maister's down i' t' fowld…", "There's nobbut t' missis…", "Nor-ne me!…"); what remains is verbatim (82.2% 6-word overlap). B0GQCYSJR8. audiobook.co.uk noticed the length and wrote "We have not established why" |
| **Juliet Stevenson, abridged** | Abridged ("adapted for audio", Penguin English Library) | Penguin, 2012-12-06 (Penguin UK "Published: 06/12/2012", "Length: 161 minutes", £9.00); re-listed by Audio Holdings 2024-07-12; Apple re-listing 2026-10-02 | 2 hrs 41 mins | US 3.8 (20) / 4.3, $10.92 (Audio Holdings $11.59); Apple $7.99, 4.2 (5) | VERIFIED. B00AISDEE8, B0D96VSC76; ISBN 9780718198763. **Penguin's 2026 film tie-in paperback page (ISBN 9780241819937, 22/01/2026) lists "Audio Download" and links this abridgement** |
| Naxos abridged, Freda Dowie and Ken Drury | Abridged | Naxos, Audible 2000-10-26 (OverDrive 1995) | 3 hrs 42 mins | 3.9 (17); $6.90 | VERIFIED. B002V0KK7K; Libby NYPL 2 |
| Hannah Gordon | Abridged | CSA Word 2006 / The Copyright Group 2011 / Canongate (hoopla 2h 24m) | 2 hrs 23 mins | 3.9 (10); $10.32 | VERIFIED. B004UMS39O; Libby NYPL 5 |
| Martin Shaw | Abridged | HarperCollins, 2005-07-01 | 3 hrs 3 mins | UK 3.8 (13) | VERIFIED. UK B004EWDD0Y |
| Prunella Scales and Samuel West | Abridged | Penguin Group (USA), OverDrive 2005-06-16 | 05:30:16 | n/a | VERIFIED (OverDrive NYPL 1 copy) |
| Montgomery Clift and Joan Lorring, "Retro Audio (Dramatised)" | Radio play | Andrews UK, 2009 | 1 hr | 4.3 (15) | VERIFIED. B00333IPA8 |
| Oxford Bookworms Stage 5, Ishia Bennison | Graded reader, "(Adaptation)" in the title | OUP, 2011 | 3 hrs 17 mins | 3.9 (14) | VERIFIED. B004I421QU |
| Full-cast **unabridged** readings (not dramatisations): Spoken Realms (cast list: "Lockwood - David Shears Heathcliff/Joseph - Rob Goll … Ellen Dean - Lillian Rachel"), 2021, 12 hrs 9 mins, 5.0 (4); Voices of Today (Graham Scott, Linda Barrans and others), 2023, 12 hrs 38 mins, 4.8 (9) | Multi-voice complete readings | | | | VERIFIED as listed (B096WHS7TD, B0C51CWGY3); small rating counts; not sampled for completeness |
| Synthetic voices (Audible "Virtual Voice", "AI Voice …"), "Modern English" and "Adapted for Modern Readers" rewrites, "in One Hour", study guides | Not the novel or not a human reading | various, 2024 to 2026 | | | VERIFIED as listed; do not recommend |

### 1c. Who voices Lockwood? (sample test, two-voice editions)

The novel opens in Lockwood's voice (Chapter 1), so an Audible sample tells which reader takes him. Median voice pitch of the narration segments in the sample, librosa YIN (adult male voices sit roughly 85 to 180 Hz, female roughly 165 to 255 Hz); transcript overlap with Gutenberg #768. OUR CALCULATION, run 2026-11-12, `scripts/wh_sample_voice.py`.

| Edition | Sample opens with | Median pitch (25th to 75th percentile) | Overlap with Gutenberg | Verdict |
|---|---|---|---|---|
| Naxos, McTeer with Timson | Credits "Read by Janet McTeer and David Timson", then "1801. I have just returned from a visit to my landlord" | 125 Hz (110 to 160) | 92.3% | Lockwood in a male-range voice, consistent with David Timson. **Naxos does not state the split**; audiobook.co.uk says the two narrators are "split between the frame narrators". The Naxos track list starts new tracks at two Lockwood interludes ("Thus interrupting herself, the housekeeper rose…", "Mrs Dean raised the candle…"). |
| AmazonClassics, Page and Merlington | Chapter 1, Lockwood | 129 Hz (123 to 139) | 90.0% | Male voice reads Lockwood. An Audible US review: "A man narrates Lockwood's part, and a woman narrates the tale told by Mrs. Dean." VERIFIED |
| Arcturus 2026, Saward and Baines | Chapter 1, Lockwood | 89 Hz (84 to 97) | 88.2% | Male voice reads Lockwood (Ciaran Saward by name order; not stated) |
| Literati 2026, Quirk and Stevens | End of Chapter 1, Chapter 2 | 98 Hz (94 to 104) | 82.2% | Male voice reads Lockwood (Dan Stevens by name order); condensed text (1b) |
| Penguin, Aimee Lou Wood (and Kristin Atherton) | Chapter 1, Lockwood | about 190 to 205 Hz | 91.1% | **Female voice reads Lockwood**: one voice for both narrators. Atherton's part is not stated by any store; Apple says the edition "includes an introduction by Pauline Nestor" (her part is probably that introduction: UNVERIFIED) |
| Joanne Froggatt | **The whole 5-minute sample is the introduction** (Brontë family history, Ponden Hall), read by Rachel Atkins | 150 to 187 Hz | 0.0% (not novel text) | A listener sampling it never hears Froggatt. VERIFIED |
| Spoken Realms 2021, full cast | Chapter 8, Nelly's narration | about 180 to 220 Hz | 98.1% | Full text. The publisher's cast list names separate readers: "Lockwood - David Shears", "Ellen Dean - Lillian Rachel", "Heathcliff/Joseph - Rob Goll". VERIFIED (cast list on Audible; 4 ratings) |
| Voices of Today 2023, full cast | Chapter 1, Lockwood | narration about 155 to 180 Hz; Heathcliff's lines about 100 to 125 Hz | 93.0% | Full text; Lockwood's narration is not in a clearly male range (cast roles not listed in the summary): UNVERIFIED who reads him |

Every single-narrator edition (Froggatt, Stevenson, Routledge, Kitchen, Messenger, Seymour, Flosnik, Gibson, Holt, Fulford-Brown) gives Lockwood and Nelly the same voice. A Reddit listener on one such recording: "I thought the narrator was a woman for the first 3 chapters until I read chapter summaries online!" (r/audiobooks ul16bc, 2022-05-09, score 2). VERIFIED.

### 1d. Notes per main edition

- **Joanne Froggatt (Audible Studios, 2017).** Audible US summary: "Winner of Audible UK's 2017 Narrator of the Year Award In an Audible Exclusive production, Golden Globe winner Joanne Froggatt gives a powerhouse performance" (UK page: "Winner of Audible's 2017 Narrator of the Year Award"). This is Audible's own statement; no independent source checked. "This edition features an exclusive introduction written by Ann Dinsdale, Chief Curator of the Brontë Museum." Audible's highlight chips on the page include "Authentic Accents". Top review lines (rendered page): "The voices for different characters were very effective, almost as if performed by a whole cast." Reddit fxtq06 (2020): "Froggatt's reading is very clear and crisp" (score 5), "Her voice is just so lovely" (4). By far the most-rated Wuthering Heights on Audible US (8,661), performance 4.8. Not in Libby or hoopla (Audible title). Autocomplete top completion (rel 1250). VERIFIED.
- **Janet McTeer with David Timson (Naxos, 2006).** Booklet: "Janet McTeer … grew up in York and has a distinct ear for accents which made her an ideal reader for Wuthering Heights." Timson "has made over 1,000 broadcasts for BBC Radio Drama". Booklet includes a full track list with first lines and an essay quoting Charlotte Brontë's 1850 preface. One Audible US review: "I liked the narration however, the servant Joseph's accent was not understandable." Another: "The narration by Janet McTeer and David Timson was luscious and wonderful, particularly Ms. McTeer's." Reddit 7p6zng (2018): "I personally love the Naxos classics audiobooks" (6). Best borrowable two-voice edition (NYPL 14 copies). VERIFIED.
- **Patricia Routledge (Audible Studios, 2012).** Most-rated in the UK (2,286). Review line: "You will have to remind yourself that all the voices are from one person." Reddit fxtq06: a listener "ended up swapping it [Stevenson] for Patricia Routledge" (3). US page shows "Listen for free" to a signed-out visitor (membership tier UNVERIFIED; say "included with Audible membership at the time of writing" at most). VERIFIED.
- **Juliet Stevenson (silksoundbooks, 2015).** Highest stars among editions with hundreds of ratings: US 4.6 / 4.9, UK 4.7 / 4.9, AU 4.8. Review lines: "I was really impressed with Stevenson's ability to handle the different accents and emotional states of not only the female but also the male characters." "I look forward to using this with my students to illustrate accents from the north of England." audiobook.co.uk's pick. Reddit: "Can't go wrong with anything from Juliet Stevenson!" (7p6zng, 3); "She is the best narrator for classic novels imo" (83iw0u, 1). Same narrator has a 2 h 41 min abridgement: check the runtime. VERIFIED.
- **Aimee Lou Wood (Penguin Classics, 2020).** Guardian (Fiona Sturges, 2026-02-05, "Audiobook of the week"): "I favour this 2020 edition narrated by Aimee Lou Wood"; "Wood breathes fresh life into this tempestuous novel, capturing Nellie's gossipy tone and the early wildness of Catherine and Heathcliff." Independent (2026-02-12): "Recorded in 2020, Aimee Lou Wood's narration of Wuthering Heights was met with acclaim from critics and listeners alike… with Wood's northern accent lending itself well to the classic story." Review on Audible US: "She is a FANTASTIC narrator, and brings each character to life with incredible accents." Most library copies of any edition (LAPL 47). One voice for Lockwood and Nelly (1c). VERIFIED.
- **Michael Kitchen (Audible Studios, 2006).** Summary calls it "a masterclass in narration"; a top review answers "NOT a masterclass in narration … very little variation for the characters and their voices." Apple 3.4 (28). VERIFIED.
- **Emma Messenger (Trout Lake, 2012).** 1,397 US ratings but 4.0 / 4.2 (UK 3.7). Review: "The narrator has some very distinct voices and tones for the supporting characters (the voicing of Joseph is amazing), but it is the lack of distinction between the main male characters that I struggled with."; another: "The narrator did a fine job with the "country" dialects." VERIFIED.
- **Michael Page and Laural Merlington (AmazonClassics, 2017).** Two voices for the frame (1c); Kindle Unlimited plan in the API; review "Much recommended, especially if you have access to the Kindle ebook to go along with it." VERIFIED.
- **Judy Holt (2018).** The only edition whose publisher promises "authentic Yorkshire accent and dialect"; 28 US ratings. VERIFIED as stated by the publisher; accent not checked by listening.
- **Billie Fulford-Brown (Spotify Audiobooks, 2024).** Autocomplete names her ("wuthering heights audiobook billie fulford brown", FG). Not sold on Audible US. Spotify Audiobooks is the publisher, so it is likely on Spotify (UNVERIFIED: Spotify not checked).

### 1e. Smaller listings (VERIFIED as listed; not recommended without more checks)

Audible US, complete and human-read: Anna Bentinck (Dreamscape 2015, 13:55, 4.2 (5); hoopla), Charlton Griffin (Audio Connoisseur 2009, 13:41, 4.1 (27)), B.J. Harrison (2014, 12:34, 4.1 (39); hoopla), Laural Merlington solo (Alpha DVD 2009, 12:16, 3.7 (31)), Ruth Golding (Paperless 2017, 14:39, 4.0 (8); Erika 2021, 14:42; Booktrack 2018, 14:42; Apple $0.99, 4 (254), 14:42:27: same reader as the free LibriVox Version 2, whether the same recording UNVERIFIED), Wanda McCaddon (InAudio 2020, 12:28; OverDrive lists "Spotify Audiobooks"; Libby NYPL 4, LAPL 2), Adjoa Andoh (SNR 2024, 12:23, 5.0 (2)), Susan Edni (2025, 14:15), Sara Nichols (SoundCraft 2024, 12:50), Michelle Orpe (Library of Alexandria 2026-04-22, 12:23, US 4.8 (36), UK 5.0 (50): unusually uniform ratings, not checked), Alison Larkin ("With an Introduction and Student Guide", 2026-01-28, 14:41; Andrew Wincott reads "selected bonus material" only), Magda Allani (2012, 15:15), Ruth Golding (above), Nimisha Sirohi (Storyside IN 2024, 13:03, 1.0 (3)), Selena Simmons (NTMC 2024, 10:06, 2.0 (4)). Inside collections (SNR, SoundCraft, InAudio, Flâneur): not single titles.

Not found on Audible US or UK: **Daniel Massey** (named by the Guardian; his five Audible titles include no Bronte), **Dale Hodges** (named on Reddit 7p6zng for a library-for-the-blind recording). VERIFIED absence on Audible.

---

## 2. Free recordings

### 2a. LibriVox (three complete sets)

All read Project Gutenberg #768 (LibriVox `url_text_source`). VERIFIED today: LibriVox API, catalogue pages, archive.org metadata and advancedsearch.

| Set | LibriVox id, archive.org item | Readers | Runtime | Catalog date | Zip | archive.org downloads | archive.org rating (reviews) | What reviewers say |
|---|---|---|---|---|---|---|---|---|
| **Version 2 (solo)**, archive.org title "Wuthering Heights (Solo Version)" | 2994, `wuthering_heights_rg_librivox` | **Ruth Golding** alone (also coordinator), 34 sections | **14:48:42** | 2009-05-18 | 424.9 MB | **1,949,246** | **4.33 (13)** | "Ruth Golding does a beautiful job reading this novel." (2011); "Ruth Golding's unhurried and lively way of reading brought out much more of the detail and imagery" (2013); "very expressive, professional and steadily paced" (2025-12-15). One 1-star (2010). Reddit fxtq06: "Ruth Golding from Librivox. She does a great job." (6) |
| Version 1 (group) | 911, `wuthering_heights_0801_librivox` | 14 readers (coordinator Lady Maria; hosmer_angel 11 sections, Lady Maria 7) | 11:33:10 | 2008-01-23 | 317 MB | 655,039 | 2.83 (8) | "The voices of the narrators were so bad I could not even listen" (2009, 1 star); "Great story, horrible audio!" (3); a 2013 review points listeners to Version 2 |
| **Version 3, dramatic reading** | 6943, `wutheringheights_1306_librivox` | 25 volunteers; cast list in the description: "Mr. Lockwood: Jason Mills Heathcliff: Bruce Pirie Catherine Earnshaw/Narrator: Amanda Friday Ellen Dean: Tiffany Halla Colonna **Joseph: Algy Pug** Edgar Linton: Alan Mapstone Isabella Linton: Arielle Lipshaw … Hareton Earnshaw: John Trevithick Cathy Linton: Elizabeth Klett Linton Heathcliff: Chuck Williamson … Zillah: Caprisha Page" | 11:54:13 | 2013-06-12 | 342.9 MB | 292,643 | no reviews | r/thehemingwaylist antni0 (2019, 5): "Cool dramatic reading" |

- **Which free set to pick:** Version 2, Ruth Golding: the only solo reading, the most downloaded Wuthering Heights item on archive.org by a wide margin, the best reviews. For a cast with Joseph voiced by his own reader, Version 3. How the dramatic reading splits narration between Lockwood's and Nelly's readers: UNVERIFIED (only the cast list read).
- Words a minute: Golding 131 (the slowest complete reading), Version 1 168, Version 3 163. Days to finish Golding's reading at one hour a day: 15 at 1x, 12 at 1.25x, 10 at 1.5x, 8 at 2x (14 h 49 min ÷ speed, rounded up). OUR CALCULATION.
- Gutenberg #768 follows Charlotte Brontë's 1850 spelling of Joseph (section 3c), so every LibriVox set reads Charlotte's softened Joseph. OUR OBSERVATION from the comparison.

### 2b. Other free routes

- **Audible**: Routledge's US page shows "Listen for free" to a signed-out visitor (plan "AnonFreeTier"); membership offer terms UNVERIFIED. Reddit fxtq06 (2020): "Wuthering Heights is part of the selection of books that Audible made free at stories.audible.com" (2020; not checked today, do not claim it now).
- **archive.org `Wuthering_Heights-21271`** (creator "Audiobooks", 2018-11-30, 2,000 downloads): source and reader unknown. Do not recommend.
- **archive.org `synapseml_gutenberg_wuthering_heights_by_emily_bronte`** (3,418 downloads, 3 (3)): the identifier suggests a machine-voiced Gutenberg audiobook; not checked by listening. It is Discover's second card (section 7a). Do not recommend.
- **YouTube** full uploads rank (SERP); rights and source not checked. Flag only.
- **Project Gutenberg #768** is the free text the LibriVox sets read. VERIFIED.

---

## 3. Joseph, the dialect, and the frame

### 3a. How much of the book is Joseph (OUR CALCULATION, `scripts/wh-wordcount.py`)

Method: every quoted span in the novel with at least two Yorkshire forms making up 8% or more of its words (a 270-form lexicon of Brontë's spellings, such as t', i', o', wi', nobbut, maister, shoo, hev, mun, gooid, yah, thear) is a candidate; each candidate's speaker was labelled by hand from its speech tag ("said Joseph", "croaked Joseph", "shouted the ancient", "the religious elder", "the tenant of the kitchen"); three passages the parser cannot isolate (Joseph's Chapter 3 speech with book titles in nested quotes, and "Th' divil's harried off his soul") are added verbatim. Labels are in the script.

- **Joseph speaks in dialect 42 times (56 quoted spans), 1,814 words: 1.56% of the novel's 116,440 words, about 12 minutes of listening at 151 wpm.** 453 of his 1,814 words (25%) are Yorkshire forms.
- **13 chapters**: 2 (96 words), 3 (101), 9 (348), 10 (215, one speech quoted by Nelly), 13 (401, in Isabella's letter: the most), 17 (30), 19 (60), 20 (67), 23 (10), 24 (71), 32 (179), 33 (207), 34 (29). Longest single span: 215 words (Chapter 10); then 122 (Chapter 33) and 113 (Chapter 9).
- **Others who speak dialect, briefly** (hand-labelled spans): Hareton (6 short spans, including as a child in Chapter 11: "Damn the curate, and thee! Gie me that"), Zillah (Chapter 2), old Mr. Earnshaw (Chapter 5, "I cannot love thee, thou'rt worse than thy brother"), Mary the servant girl (Chapter 12), two herd-boys (Chapters 26 and 34), the old woman keeping the Grange in 1802 (Chapter 32). So "Joseph's dialect" is the bulk, not all.
- Cross-check: wuthering-heights.co.uk's "Joseph's Speech" page has translations under 11 chapter headings (2, 3, 9, 10, 13, 17, 19, 20, 23, 24, 32); our count also finds him in Chapters 33 and 34. VERIFIED (page read).
- Caveat for the writer: Joseph also says plain lines ("The Lord help us!", Chapter 1) that the dialect filter does not count; say "in dialect".

### 3b. What the readers say about Joseph on audio (all VERIFIED as quoted)

- Naxos (McTeer): Audible US review "the servant Joseph's accent was not understandable. I would have to read the book to see what he actually said".
- Emma Messenger: "(the voicing of Joseph is amazing)", same review: "it is the lack of distinction between the main male characters that I struggled with".
- Juliet Stevenson: "ability to handle the different accents"; "illustrate accents from the north of England".
- Judy Holt: publisher's "authentic Yorkshire accent and dialect" (not a review).
- Reddit 1qtb2ku (r/classicliterature, 2026-02-01, 14 / 32), a reader from just south of Yorkshire: "seeing it written down is an interesting challenge and I normally have to sound it out"; reply "I read along with an audio book" (3); "I've read it a few times … I skimmed over all of Joseph." (5).
- Reddit ltqtso (2021, 15 / 12): "His dialog is unreadable for me"; top reply "he only ever criticises everyone using vaguely biblical language so you can quite happily skip what he says" (11). Reddit 9ubk2s (2018, 15 / 29): "i can never ever understand what Joseph is saying"; a reply translates "I'd much rather have them swearing in my ears from morning until night, than listen to you at all."
- Reddit ul16bc (2022): "I find it hard to keep up with the strong english accent from the narrator. Is there an american version/naration?"; autocomplete has "wuthering heights audiobook american accent" (FG).
- No sample reached Joseph's lines except the Literati one, which cuts them. How each main narrator voices Joseph beyond these reviews: UNVERIFIED.

### 3c. Charlotte Brontë's 1850 respelling, and which text the free recordings read

- Charlotte to W. S. Williams, 29 September 1850 (Gaskell, The Life of Charlotte Brontë, Vol. 2, Ch. VIII; Project Gutenberg #1700): "It seems to me advisable to modify the orthography of the old servant Joseph's speeches; for though, as it stands, it exactly renders the Yorkshire dialect to a Yorkshire ear, yet, I am sure Southerns must find it unintelligible; and thus one of the most graphic characters in the book is lost on them." VERIFIED (text downloaded today).
- **Which version Gutenberg #768 carries:** Joseph's first lines, compared today:
  - 1848 Harper & Brothers, New York (set from the 1847 first edition; archive.org `wutheringheights04bron` OCR): "Whet are ye for?" he shouted. "T' maister's dahn i' t' fowld. Goa rahnd by th' end ut' laith, if yah went tuh spake tull him." / "They's nobbut t' missis, and shoo'll nut oppen't an ye mak yer flaysome dins till neeght."
  - 1889 Smith, Elder, London (archive.org `wutheringheights00bron` OCR): "What are ye for?" he shouted. "T' maister's down i' t' fowld. Go round by th' end o' t' laith, if ye went to spake to him."
  - Gutenberg #768: "What are ye for?" he shouted. "T' maister's down i' t' fowld. Go round by th' end o' t' laith, if ye went to spake to him." / "There's nobbut t' missis; and shoo'll not oppen 't an ye mak' yer flaysome dins till neeght."
  - So Gutenberg #768 (and the LibriVox recordings made from it) follows the revised spelling, not the 1847 one. OUR OBSERVATION from one passage; VERIFIED texts. Which text each commercial recording reads: UNVERIFIED (no sample reaches Joseph's lines except the condensed Literati one).
- Irene Wiltshire, "Speech in Wuthering Heights: Joseph's Dialect and Charlotte's Emendations", Brontë Studies 30(1), 19-29 (2005), DOI 10.1179/147489304x18821 (Crossref VERIFIED). Abstract (OpenAlex): "The outsider Lockwood speaks received English while the servant Joseph speaks the purest form of Yorkshire dialect." Full text not read.

### 3d. The two narrators (OUR CALCULATION, `scripts/wh-wordcount.py`)

Anchor phrases where narration passes between Lockwood and Nelly (listed in the script, 16 hand-overs):

| Voice | Words | Share | At 151 wpm |
|---|---|---|---|
| Lockwood (the frame: Chapters 1 to 3 and the start of 4, interludes in Chapters 7, 8, 9/10, 14/15, 25, the 1802 visit in Chapters 30 to 32, the last page of 34) | 17,103 | 14.7% | 1 h 53 min |
| Nelly Dean (her tale, including the long speeches she reports) | 95,830 | 82.3% | 10 h 35 min |
| Isabella's letter (Chapter 13, inside Nelly's tale) | 3,507 | 3.0% | 23 min |

- Lockwood's opening stretch alone (Chapter 1 to "Before I came to live here, she commenced", Chapter 4) is 10,997 words, about 73 minutes at 151 wpm: listeners spend the first hour with the frame narrator, which is why a female single voice reads as "a woman for the first 3 chapters".
- Other embedded tellers (Heathcliff's long speeches, Zillah's report in Chapter 30, Catherine's diary in Chapter 3) are counted inside the narrator who reports them.

---

## 4. Own data: length, chapters, pace

Source: https://www.gutenberg.org/cache/epub/768/pg768.txt, downloaded 2026-11-12, header "Release date: December 1, 1996 [eBook #768] Most recently updated: May 6, 2026", "Credits: David Price", SHA-256 `e533fe750589f0421d5d744576315f5c2b9b0d69e981179ea0551bbf134c5e02`. Counting rules as in the War and Peace and Crime and Punishment scripts. OUR CALCULATION.

- Counts: 115,945 whitespace tokens between the markers; 115,886 with a letter or digit; 115,881 from "CHAPTER I"; 116,508 also splitting em dashes; **116,440 without the 34 CHAPTER headings and 9 "* * * * *" break lines (the figure to publish)**.
- **34 chapters.** Mean 3,425 words (22.7 minutes at 151 wpm), median 3,256. Longest Chapter 17, 6,832 words (45.2 minutes); then 21 (6,365), 10 (6,325), 9 (6,089). Shortest Chapter 5, 1,414 words (9.4 minutes); then 25 (1,428), 26 (1,484), 19 (1,604).
- **Listening time at 151 wpm** (the site's median pace for LibriVox solo readers, `/blog/how-long-is-an-audiobook`): 1x 12 h 51 min; 1.25x 10 h 17 min; 1.5x 8 h 34 min; 2x 6 h 26 min.
- **Days to finish at 151 wpm** (rounded up): 30 minutes a day: 26 days at 1x, 21 at 1.25x, 18 at 1.5x, 13 at 2x; 60 minutes a day: 13, 11, 9, 7.
- **Actual recordings at speed** (runtime ÷ speed): Froggatt 12 h 32 min → 10 h 2 min at 1.25x, 8 h 21 min at 1.5x, 6 h 16 min at 2x. Stevenson 13 h 24 min → 10 h 43 min, 8 h 56 min, 6 h 42 min. Naxos 13 h 8 min → 10 h 30 min, 8 h 45 min, 6 h 34 min. Wood 13 h 58 min → 11 h 10 min, 9 h 19 min, 6 h 59 min. Routledge 14 h 15 min → 11 h 24 min, 9 h 30 min, 7 h 8 min. Golding (free) 14 h 49 min → 11 h 51 min, 9 h 52 min, 7 h 24 min. Kitchen 11 h 38 min → 9 h 18 min, 7 h 45 min, 5 h 49 min.
- **Narrator pace (words a minute)**: Kate Petrie 176, Flo Gibson 173, LibriVox Version 1 168, Seymour 168, Kitchen 167, LibriVox Version 3 163, Page and Merlington 162, Flosnik 158, Froggatt 155, Naxos 148, Messenger 147, Arcturus 147, Stevenson 145, Holt 143, Fulford-Brown 142, Wood 139, Routledge 136, Golding 131. Range 131 to 176, median 151 (18 complete recordings). Literati 2026 would be 253: not a complete text.
- For the competitor "12 to 14 hours": six complete recordings fall outside it (Petrie, Gibson, Seymour, Kitchen and Page/Merlington under 12 hours; Routledge and Golding over 14). VERIFIED against the table.

## 5. Names table (from the text; OUR CALCULATION for counts)

Name counts are whole-word matches in the novel text (`scripts/wh-wordcount.py`); forms set in italics in the Gutenberg file (`_Catherine Linton_`) are not counted.

| Name(s) in the book | Who | Family tie (text) | House |
|---|---|---|---|
| Mr. Earnshaw ("the old master"; "Mr. Earnshaw" 38 times in all, also used for Hindley and once for Hareton) | Father of Hindley and Catherine | Brings home a child found "starving, and houseless, and as good as dumb, in the streets of Liverpool" (Ch. 4) | Wuthering Heights |
| Hindley (80); "Mr. Hindley", later "Mr. Earnshaw" | Catherine's elder brother | "Mr. Hindley came home to the funeral; and … he brought a wife with him" (Ch. 6): Frances (4). Father of Hareton: "Mr. Hindley Earnshaw, that was Hareton's father" (Ch. 4) | Wuthering Heights |
| Catherine Earnshaw, "Cathy", "Miss Catherine", later "Mrs. Linton" (Catherine 379 for both Catherines; Cathy 124; Mrs. Linton 62) | The heroine | Marries Edgar Linton; dies two hours after her daughter is born: "About twelve o'clock that night was born the Catherine you saw at Wuthering Heights: a puny, seven-months' child; and two hours after the mother died" (Ch. 16) | Heights, then the Grange |
| Heathcliff (475; "Mr. Heathcliff" 130) | The foundling | "they had christened him 'Heathcliff': it was the name of a son who died in childhood, and it has served him ever since, both for Christian and surname" (Ch. 4). Marries Isabella Linton | Wuthering Heights; owns the Grange in 1801 ("Thrushcross Grange is my own, sir", Ch. 1) |
| Edgar Linton (116), "Mr. Linton" (60, also his father) | Catherine Earnshaw's husband | Son of Mr. and Mrs. Linton; father of Catherine Linton | Thrushcross Grange |
| Isabella Linton (62), later "Mrs. Heathcliff" | Edgar's sister | Marries Heathcliff; "there she had a son born a few months subsequent to her escape. He was christened Linton" (Ch. 17) | Grange, then the Heights, then "near London" |
| Catherine Linton, "Cathy", "Miss Cathy" (38), later "Mrs. Heathcliff" / "Mrs. Linton Heathcliff" | The daughter of Catherine and Edgar; the young woman Lockwood meets | "she is my late master's daughter: Catherine Linton was her maiden name" (Ch. 4); "Mrs. Heathcliff is my daughter-in-law" (Heathcliff, Ch. 2). Marries her cousin Linton Heathcliff; at the end she and Hareton will marry "on New Year's Day" (Ch. 34) | Grange, then the Heights |
| Linton Heathcliff ("Linton"; 404 "Linton" in all, shared by Edgar, Isabella, their parents and this boy) | Son of Heathcliff and Isabella | Marries Catherine Linton; dead by 1801 ("He had a son, it seems?" "Yes, he had one—he is dead.", Ch. 4) | The Heights |
| Hareton Earnshaw (179) | Son of Hindley and Frances, born on "a fine June day" in "the summer of 1778", "the last of the ancient Earnshaw stock" (Ch. 7 to 8) | "he is the late Mrs. Linton's nephew" (Ch. 4); his name is carved over the door with "1500" (Ch. 1) | Wuthering Heights |
| Nelly / Ellen / Mrs. Dean (89 / 98 / 37) | Servant, then housekeeper; tells most of the story | "my mother had nursed Mr. Hindley Earnshaw" (Ch. 4) | Both houses |
| Mr. Lockwood (19) | Tenant of the Grange in 1801; opens and closes the book | | Thrushcross Grange |
| Joseph (140) | Old servant at the Heights | | Wuthering Heights |
| Zillah (35) | Housekeeper at the Heights in Lockwood's time | | Wuthering Heights |

- **The famous confusion, in numbers:** two Catherines (379 "Catherine" between them), four people called Linton by surname or first name (404), "Mrs. Heathcliff" used for Isabella and for the younger Catherine (25 times, in Chapters 2, 3, 4, 14, 17, 18, 30, 31 and 32), "Mr. Earnshaw" for the father, for Hindley (Isabella's letter, Chapters 13 and 17) and once for Hareton (Zillah, Chapter 2: "Well, Mr. Earnshaw"), with Hareton plain "Earnshaw" through Chapters 28 to 34, and a Hareton whose name matches the one carved over the door with "1500". OUR CALCULATION (counts); which person each "Mrs. Heathcliff" means was not tallied chapter by chapter.
- **The window-ledge names** (Ch. 3): "a name repeated in all kinds of characters, large and small—Catherine Earnshaw, here and there varied to Catherine Heathcliff, and then again to Catherine Linton." The daughter's own names run the other way: born Linton, married Heathcliff, to marry an Earnshaw. OUR OBSERVATION from the text.
- **Years stated in the text:** "1801" (Ch. 1 opening), "1802" (Ch. 32 opening), "the summer of 1778" (Hareton's birth, Ch. 7). Other dates are derived by critics; do not state them as text.

---

## 6. What listeners say, and awards

### 6a. Reddit (Arctic Shift; scores as stored, read 2026-11-12)

| Thread | Sub, date | Score / comments | Remarks (comment score) |
|---|---|---|---|
| https://www.reddit.com/r/audible/comments/fxtq06/ "Wuthering Heights" ("what is considered to be the best Wuthering Heights version? Not abridged, which i realized is the one i have") | r/audible, 2020-04-09 | 14 / 19 (22 comments fetched) | "Ruth Golding from Librivox. She does a great job." (6); "I also loved the Joanne Froggatt recording … Froggatt's reading is very clear and crisp." (5); "I have the Joanne Froggatt version. Her voice is just so lovely." (4); "I still prefer the Librivox free version" (4); "I got the Juliet Stevenson narration to begin with but ended up swapping it for Patricia Routledge" (3) |
| https://www.reddit.com/r/audible/comments/7p6zng/ "Which version of Wuthering Heights is best?" | r/audible, 2018-01-09 | 15 / 2 (6 fetched) | "I personally love the Naxos classics audiobooks" (6); "Can't go wrong with anything from Juliet Stevenson!" (3); a 2024 reply on Stevenson: "As soon as I heard her sample, it was an insta-buy." (1) |
| https://www.reddit.com/r/audiobooks/comments/px6ykl/ "What is the best audio recording for Wuthering Heights?" | r/audiobooks, 2021-09-28 | 9 / 12 | "Why not try the dramatised version" (4, link to Audible UK B07F1X5V76); "the BBC Dramatization of Wuthering Heights was good" (2) |
| https://www.reddit.com/r/audiobooks/comments/ul16bc/ "What is the best version of Wuthering heights?" | r/audiobooks, 2022-05-08 | 2 / 10 | OP: "hard to keep up with the strong english accent"; "I thought the narrator was a woman for the first 3 chapters until I read chapter summaries online!" (2); "try the one narrated by Joanne Froggatt, Aimee Lou Wood or Flo Gibson" (2) |
| https://www.reddit.com/r/audiobooks/comments/83iw0u/ "A good narrator for Wuthering Heights?" | r/audiobooks, 2018-03-10 | 2 / 4 | Froggatt link ("an audible exclusive"); "I'd personally recommend Juliet Stevenson version" (1); "I liked the sample of the Emma Messenger version" (1) |
| https://www.reddit.com/r/classicliterature/comments/1qtb2ku/ "Joseph Wuthering Heights" | r/classicliterature, 2026-02-01 | 14 / 32 | "I read along with an audio book" (3); "I skimmed over all of Joseph." (5) |
| https://www.reddit.com/r/classicliterature/comments/ltqtso/ "Understanding Joseph in Wuthering Heights." | 2021-02-27 | 15 / 9 | see 3b |
| https://www.reddit.com/r/books/comments/9ubk2s/ "…i cant read anything Joseph says..." | r/books, 2018-11-05 | 15 / 26 | see 3b |
| https://www.reddit.com/r/thehemingwaylist/comments/antni0/ | 2019-02-06 | 5 / 2 | LibriVox dramatic reading |
| https://www.reddit.com/r/classicliterature/comments/1r25z3z/ (film reaction) | 2026-02-11 | 204 / 41 | Film, not audio |

Pattern: Froggatt, Stevenson and Ruth Golding are recommended most; Naxos has fans; the recurring problems are the accent, Joseph, and not knowing which voice is narrating. VERIFIED (from the comments above).

### 6b. Awards

- **2004 Audies, Classic, finalist**: "Wuthering Heights by Emily Bronte; narrated by Donada Peters (Books on Tape)" (winner: East of Eden, Richard Poe). https://www.audiopub.org/2004-audies-1 VERIFIED.
- No other Wuthering Heights recording appears in the 31 Audie year pages linked from audiopub.org (1996 to 2026; `scripts/wh-audies.mjs`). Narrator credits for other books: Billie Fulford-Brown, **2024 Best Fiction Narrator winner** (The Last Lifeboat); Joanne Froggatt in several finalists and a 2026 Thriller/Suspense winner (full cast); Juliet Stevenson in finalists and the 2018 Literary Fiction & Classics winner (House of Names, "et al."). Do not attach any of these to Wuthering Heights. VERIFIED.
- Froggatt's "Audible UK's 2017 Narrator of the Year" is Audible's statement on its own product page (VERIFIED as stated there; not independently checked).
- Press: Guardian "Audiobook of the week" (2026-02-05) for the Aimee Lou Wood edition. VERIFIED.

### 6c. Audible Whispersync tag

The `"eventId":"whispersync"` data tag appears on all eight Audible US pages rendered (Froggatt, Naxos, Routledge, Stevenson, Wood, Kitchen, Page/Merlington, Messenger). What it promises per edition: UNVERIFIED (Amazon not checked). Do not use as a differentiator.

---

## 7. HushBook facts for this book (positive framing; verified in source and on the live site)

### 7a. What Discover shows for "wuthering heights"

- VERIFIED. Discover searches archive.org for two libraries, LibriVox and Internet Archive, 24 rows a page (`kIaPageSize = 24`, D:\hushbook\lib\core\store\librivox_provider.dart:17), pages interleaved index by index, LibriVox first (`mergeCatalogPages`, D:\hushbook\lib\core\store\store_repository.dart:553-571; provider order store_models.dart:675). Live result of the app's exact queries today (`scripts/wh-discover-cards.mjs "wuthering heights"`):

| # | Card title | Author line | Length · rating | Download (64 kbps MP3, app format) | Chapters | Read by line |
|---|---|---|---|---|---|---|
| **1** | **Wuthering Heights (Solo Version)** [LibriVox Version 2, Ruth Golding] | Emily Bronte | **14h 49m · 4.33 (13)** | **407 MB** | **34** | Reader not listed |
| 2 | Wuthering Heights [Internet Archive, `synapseml_gutenberg_…`] | Brontë, Emily, 1818-1848 | no length · 3 (3) | | | |
| 3 | Wuthering Heights [LibriVox Version 1, 14 readers] | Emily Bronte | 11h 33m · 2.83 (8) | 317 MB | 34 | Reader not listed |
| 4 | Wuthering Heights (dramatic reading) [LibriVox Version 3] | Emily Bronte | 11h 54m | 327 MB | 34 | Reader not listed |

- Card lines and sizes per discover_copy.dart:16-41 (MB under 1 GB; length in whole rounded minutes) and librivox_provider.dart:454-459 (64 kbps preferred). VERIFIED (code plus live data; not observed on a device). Positions follow archive.org downloads and can change.
- **"Reader not listed"** (D:\hushbook\lib\l10n\app_en.arb:7617) for all three: the reader comes only from the chosen files' `artist` tag and an author's name there does not count (librivox_provider.dart:363-376; reader_credit.dart:31-46); the 64 kbps files carry no artist tag. So the post names Ruth Golding from LibriVox, and tells readers to pick the card titled "Wuthering Heights (Solo Version)", 14h 49m. VERIFIED.
- Safe wording: "In HushBook's Discover tab, search Wuthering Heights and pick Wuthering Heights (Solo Version): that is Ruth Golding's LibriVox reading, 14 hours 49 minutes in 34 chapters, a 407 MB download."
- "Play a sample" (app_en.arb:8697). VERIFIED.

### 7b. Import, chapters, transcription

- VERIFIED. A Discover download becomes one book with one chapter per file (store_import_service.dart:379-405): 34 chapters, "Chapter I" to "Chapter XXXIV" file titles ("01 - Chapter I" … "34 - Chapter XXXIV").
- VERIFIED. Store downloads start transcription on the phone by default ("Added to library. Transcription queued.", app_en.arb:771; new_book_transcription.dart:34-42).
- VERIFIED (site copy). Files you own: MP3, M4A, M4B and more; "Chapters inside M4B files are detected automatically" (D:\hushbook.app\index.html:668). Desktop: "Import MP3 and M4B files or whole folders." (desktop.html:431).

### 7c. Reading along, Joseph, names, speed

- VERIFIED (site copy). "Words fill in as the narrator reads them, with a red underline on the current one. Long-press any line to play from there." (index.html:1033). Never "tap any word"; "Tap a line to jump there" is an off-by-default switch (app_en.arb:8453).
- VERIFIED (site copy, HEAD). "You can pair an EPUB, PDF or TXT with the audiobook and HushBook aligns the real book text to the audio, word by word. This ebook sync is in beta." (audiobook-with-text.html:67). App: "Unlimited e-book syncs turn a matching book into timed, word-by-word read-along text." (app_en.arb:2112); "Attach a matching, DRM-free EPUB, PDF or TXT" (2113); "Use the same unabridged edition with English narration. Sync is in beta; processing takes time and highlight timing can vary." (2114). First sync free, then Pro (D:\hushbook\lib\core\ebook\ebook_sync_allowance.dart:6, 33). **The fit for Joseph:** the LibriVox Ruth Golding reading and the Gutenberg #768 EPUB are the same text, so a synced read-along shows Brontë's spelling of Joseph's lines (in Charlotte's 1850 form) in time with the voice. Not run on a device for this book: UNVERIFIED in practice; write it as what the feature does, scoped to "a matching DRM-free e-book".
- VERIFIED. Without e-book sync, the words on screen come from the on-device transcript of the recording; how speech recognition spells Joseph's dialect is not tested: do not quote or promise any spelling.
- VERIFIED. **Character map** ("Character map", app_en.arb:879), added by hand; "First heard" "Ch. {chapter} · {time}" (app_en.arb:2160-2161); role chips incl. Family and Narrator (2219-2226); Notes, Relationships (character_detail_sheet.dart:171-228); ties incl. Parent of, Child of, Siblings, Sweethearts (862-875, 2203-2206). One name field plus Notes: so "add Catherine Linton once and keep Cathy and Mrs. Heathcliff in her card's notes". The string "Transcript suggestions become available after transcription" (app_en.arb:1069) is not used by any Dart code at HEAD: do not claim suggestions.
- VERIFIED. Speed 0.5x to 3x in 0.05x steps (playback_speed_sheet.dart:25-48).
- VERIFIED. "Mark: highlight, note or quote" (app_en.arb:8753).
- VERIFIED. Offline after the one-time engine download (index.html:752-757). Platforms: iPhone, Android, Windows 10 or 11 64-bit free ("Free · Windows 10 or 11, 64-bit", desktop.html:334). **Live App Store version 1.3.5, released 2026-10-30, free, iOS 16.4+, 5 stars (4 ratings)** (itunes lookup id6783243597, read today). Play Store not checked.
- VERIFIED. Price: "The core read-along experience and the public-domain library are free. There's an optional Pro upgrade for advanced analytics" (index.html:676). "Transcribe on my PC" is Pro (index.html:1021).
- VERIFIED. Privacy: "Transcription runs on-device. There is no account and no cloud upload of your audio." (llms.txt:3).

### 7d. Do not claim (HushBook)

1. That Discover names Ruth Golding (the card says "Reader not listed"), or that the card positions are fixed.
2. That HushBook opens Audible, Apple Books, Libby, hoopla, Spotify, Kobo or Chirp purchases. Scope to "audiobook files you own" and "DRM-free MP3 or M4B". (Owner rule: never write what it cannot do; just scope the positive claim.)
3. That HushBook detects characters, suggests names, or fills in other names.
4. Any spelling the transcript will show for Joseph, or that the transcript "translates" the dialect.
5. That e-book sync is unlimited for free users (first sync free) or out of beta; that it was tested on this book.
6. That "Transcribe on my PC" is free, or that a Mac app exists.
7. Any phone transcription time for this book.
8. That the Apple / Audible Ruth Golding listings are the LibriVox recording.
9. That the Play Store build matches 1.3.5.

---

## 8. Competing pages: provable errors (state the right fact; do not name them)

- **audiobookfest.com (2024-11-15):** "The unabridged version typically runs 12-14 hours": complete recordings run 11 h 1 min to 14 h 49 min, with Kitchen 11 h 38 min, Seymour 11 h 34 min, Page/Merlington 11 h 57 min, Routledge 14 h 15 min outside it. Routledge "Available On: Google Play, Scribd": it is an Audible Studios title on Audible and Apple; Google Play and Scribd not checked. Omits the most-rated recording (Froggatt) and Naxos. VERIFIED.
- **thebooksinsider.com:** "Wuthering Heights : Audiobook by Emily Brontë · 1846": the novel was published in 1847 (Naxos booklet: "The first edition, published in 1847"; TODAY, 2026-02-19: "first published in 1847"). "runs 11.2 hours" (11 h 12 min) is one edition's length (close to Johan Girado's 11:12:34 and Donada Peters' 11:11:00 on Apple), not "the" audiobook: complete recordings run 11 h 1 min to 14 h 49 min. VERIFIED.
- **booktrace.app:** "11 hr" headline; same single-edition problem. VERIFIED (title only).
- **audiobook.co.uk:** correct as checked (runtimes match Audible UK; it flags the Stevenson abridgement). Its open question about the 7 h 41 min Quirk/Stevens edition is answered by our sample test (condensed). VERIFIED.
- **Independent (2026-02-12):** "Nellie the housekeeper", Guardian "Nellie": the text spells her "Nelly" (89 times) and "Ellen" (98). Not an error worth naming; use "Nelly". VERIFIED.

---

## 9. Picks, with the evidence

- **Best overall: Joanne Froggatt (Audible Studios, 2017, 12 h 32 min).** The most-rated Wuthering Heights on Audible US by far, 4.4 from 8,661 ratings with 4.8 for performance (UK 4.5 from 1,385, 4.8); Audible bills it as "Winner of Audible UK's 2017 Narrator of the Year Award"; Reddit: "very clear and crisp"; the narrator people search for (top completion). Includes Ann Dinsdale's introduction; Audible's free sample plays only that introduction (read by Rachel Atkins), so skip ahead in the sample or judge by reviews. Audible and Apple only.
- **Highest rated (runner-up): Juliet Stevenson (silksoundbooks, 2015, 13 h 24 min).** 4.6 / 4.9 from 427 US ratings, 4.7 / 4.9 from 507 UK; reviewers single out her northern accents. Buy the 13 h 24 min one, not her 2 h 41 min abridgement.
- **Best two-voice (Lockwood and Nelly in different voices): Janet McTeer with David Timson (Naxos, 2006, 13 h 9 min).** 4.2 / 4.5 from 1,562 US ratings, 4.5 / 4.7 from 426 UK; McTeer "grew up in York" (Naxos booklet); Lockwood in a male-range voice in the sample; on Libby (NYPL 14 copies, LAPL 4); PDF booklet with the track list. Alternative: Michael Page and Laural Merlington (AmazonClassics, 11 h 57 min, 4.1 from 223; a reviewer confirms "A man narrates Lockwood's part, and a woman narrates the tale told by Mrs. Dean"; Kindle Unlimited plan).
- **Best free: Ruth Golding, LibriVox Version 2 (2009, 14 h 49 min).** The only solo LibriVox reading; 1,949,246 archive.org downloads; 4.33 from 13 reviews; Reddit "She does a great job." In HushBook Discover it is the first card, "Wuthering Heights (Solo Version)", 407 MB. Reads Gutenberg #768, so it pairs with the free e-book.
- **Best dramatisation: BBC Radio 4, adapted by Rachel Joyce (2 h 17 min; Ben Batt, Chloe Pirrie, Emma Fielding).** UK 4.5 / 4.7 from 39; Apple 4.3 from 15; in the US only inside the seven-drama Brontë BBC collection (4.6 / 4.9 from 141). An adaptation, not the book. **Best full cast of the whole text, free:** LibriVox Version 3 dramatic reading (2013, 11 h 54 min, 25 volunteers, Joseph read by his own voice).
- **Best to borrow:** Naxos (two voices, NYPL and LAPL) or Aimee Lou Wood (Penguin, LAPL 47 copies). Seymour, Flosnik and Flo Gibson are the most widely held in Libby but rate lower (3.8 to 3.9).
- **Also worth knowing:** Aimee Lou Wood (Penguin Classics, 2020, 13 h 58 min; Guardian's audiobook of the week as the film opened; 4.4 from 202 US, 4.5 from 94 UK; one voice for both narrators). Patricia Routledge (the UK favourite, 2,286 ratings; "Listen for free" on the US page today).
- **Avoid if you want the whole book:** the 2026 Literati edition (Moira Quirk and Dan Stevens, 7 h 41 min, condensed despite the "unabridged" label); any 2 to 4-hour listing; the "Audio Download" link on Penguin's film tie-in page (the 161-minute Stevenson abridgement).

---

## 10. Ready-to-paste comparison table (VERIFIED rows only)

| Narrator | Voices for Lockwood / Nelly | Runtime | Publisher | Year | Audible US rating | Where to get it |
|---|---|---|---|---|---|---|
| Joanne Froggatt | One voice (plus an introduction by another reader) | 12 h 32 min | Audible Studios | 2017 | 4.4 (8,661) | Audible, Apple Books |
| Juliet Stevenson | One voice | 13 h 24 min | silksoundbooks | 2015 | 4.6 (427) | Audible, Apple Books |
| Janet McTeer with David Timson | Two voices (man for Lockwood, by sample) | 13 h 8 min | Naxos AudioBooks | 2006 | 4.2 (1,562) | Audible, Apple Books, Libby, Spotify (per Naxos) |
| Patricia Routledge | One voice | 14 h 15 min | Audible Studios | 2012 | 4.3 (1,533) | Audible, Apple Books |
| Aimee Lou Wood (and Kristin Atherton) | One voice for the novel | 13 h 58 min | Penguin Classics | 2020 | 4.4 (202) | Audible, Apple Books, Libby |
| Michael Kitchen | One voice | 11 h 38 min | Audible Studios | 2006 | 4.2 (327) | Audible, Apple Books |
| Emma Messenger | One voice | 13 h 13 min | Trout Lake Media | 2012 | 4.0 (1,397) | Audible, Apple Books |
| Michael Page and Laural Merlington | Two voices (man for Lockwood) | 11 h 57 min | Brilliance (AmazonClassics) | 2017 | 4.1 (223) | Audible, Apple Books |
| Flo Gibson | One voice | 11 h 15 min | Recorded Books | 1999 | 3.9 (516) | Audible, Libby |
| Carolyn Seymour | One voice | 11 h 34 min | Blackstone | 2010 | 3.9 (81) | Audible, Apple Books, Libby, hoopla |
| Billie Fulford-Brown | One voice | 13 h 38 min | Spotify Audiobooks | 2024 | (Audible UK only) | Audible UK, Apple Books, hoopla, Kobo |
| Ciaran Saward and Sherry Baines | Two voices (man for Lockwood) | 13 h 14 min | Arcturus Digital | 2026 | no ratings | Audible, Apple Books, hoopla, Kobo |
| Ruth Golding (LibriVox, Version 2) | One voice | 14 h 49 min | LibriVox (free) | 2009 | n/a | LibriVox, Internet Archive, HushBook Discover |
| LibriVox dramatic reading (25 readers) | Full cast | 11 h 54 min | LibriVox (free) | 2013 | n/a | LibriVox, Internet Archive, HushBook Discover |
| LibriVox Version 1 (14 readers) | Changes reader by chapter | 11 h 33 min | LibriVox (free) | 2008 | n/a | LibriVox, Internet Archive, HushBook Discover |

Abridged, condensed and dramatised, to flag: BBC Radio 4 dramatisation (Rachel Joyce, 2 h 17 min); Juliet Stevenson abridged (2 h 41 min, the audio linked from Penguin's 2026 film tie-in page); Naxos abridged (Freda Dowie, Ken Drury, 3 h 42 min); Martin Shaw (3 h 3 min); Hannah Gordon (2 h 23 min); Prunella Scales and Samuel West (5 h 30 min); Moira Quirk and Dan Stevens (Literati 2026, 7 h 41 min, listed unabridged, condensed).

Year notes: Naxos "Released: March 2006" (Audible 2006-01-01). Naxos runtime: Audible 13 hrs 8 mins, Naxos 13 h 09 m. "Spotify" for Naxos rests on the Naxos page's link.

---

## 11. Sources (opened 2026-11-12)

Audible
- Catalogue API: https://api.audible.com/1.0/catalog/products?keywords=wuthering+heights&num_results=50&response_groups=contributors,product_desc,product_attrs,rating,media,sample,series,relationships (and .co.uk, .ca, .com.au; 22 keyword sets); per-ASIN `/1.0/catalog/products/{ASIN}?response_groups=…price,product_plans…`; narrator search `?narrator=…`
- Rendered product pages (`?ipRedirectOverride=true&overrideBaseCountry=true`): https://www.audible.com/pd/B076PPDCYD (Froggatt) · /pd/B002UZX6M2 (Naxos) · /pd/B002V8MFK2 (Routledge) · /pd/B0186DGBCI (Stevenson) · /pd/0241440963 (Wood) · /pd/B002V07ZY6 (Kitchen) · /pd/B073X64BC3 (Page/Merlington) · /pd/B0098ONW18 (Messenger) · https://www.audible.co.uk/pd/B07F1X5V76 (BBC)
- API-only: B0GQCYSJR8 (Literati) · B0HD99H5BX (Arcturus) · B07CYQ8RFM (Holt) · B015NL1JQY (Petrie) · B002V0KAH0 (Gibson) · B002VA975Q (Flosnik) · B003D77X7U (Seymour) · B07FSVD5Q1 (BBC collection) · B00AISDEE8, B0D96VSC76 (Stevenson abridged) · B002V0KK7K (Naxos abridged) · B004UMS39O (Gordon) · B00333IPA8 (Clift) · B096WHS7TD, B0C51CWGY3 (full cast) · B0D2JW987R (Naxos educational) · UK: B0D98N4C49 (Fulford-Brown), B076PLVXXG, B004FTV5IS, B004FT7NIO, B0186DHO8I, B004EWDD0Y (Shaw)
- Sample MP3s: `https://samples.audible.com/bk/{…}_sample.mp3` (API `sample_url`)

Apple Books
- https://itunes.apple.com/search?term=wuthering+heights&media=audiobook&country=us&limit=200 (and 14 more terms)
- https://books.apple.com/us/audiobook/id1316105143 (Froggatt) · id1748220544 (Naxos) · id517691706 (Routledge) · id1060712362 (Stevenson) · id1529117303 (Wood) · id201955298 (Kitchen) · id1260050054 (Page/Merlington) · id561847782 (Messenger) · id1446038987 (BBC) · id1879611284 (Literati) · id1867458010 (Arcturus) · id1694155341 (Fulford-Brown) · id1417450541 (Donada Peters) · id1549896174 (Ruth Golding re-listing) · id1440418905 (Stevenson abridged)

Publishers
- https://naxosaudiobooks.com/wuthering-heights-unabridged/ ; booklet https://naxosaudiobooks.com/wp-content/uploads/2020/03/39712_Wuthering_Heights.pdf
- https://www.penguin.co.uk/books/183707/wuthering-heights-by-bronte-emily/9780241819937 (film tie-in) · https://www.penguin.co.uk/books/183707/wuthering-heights-by-bronte-emily/9780718198763 (Stevenson abridged audio)

Libraries and other stores
- https://thunder.api.overdrive.com/v2/libraries/nypl/media?query=wuthering%20heights&format=audiobook-overdrive,audiobook-mp3&perPage=100 (also lapl, kcls, sfpl, chipublib)
- https://www.hoopladigital.com/search?q=wuthering%20heights&scope=everything&type=direct&kindId=8 ; https://www.hoopladigital.com/audiobook/wuthering-heights-emily-bronte/19506918 (Literati)
- https://www.kobo.com/us/en/search?query=wuthering%20heights&fcmedia=AudioBook

Free
- https://librivox.org/api/feed/audiobooks/?title=%5EWuthering%20Heights&format=json&extended=1&limit=50
- https://librivox.org/wuthering-heights-by-emily-bronte-2/ · https://librivox.org/wuthering-heights-by-emily-bronte/ · https://librivox.org/wuthering-heights-dramatic-reading-by-emily-bronte/
- https://archive.org/details/wuthering_heights_rg_librivox · https://archive.org/details/wuthering_heights_0801_librivox · https://archive.org/details/wutheringheights_1306_librivox
- https://www.gutenberg.org/ebooks/768

Texts for the dialect check
- https://archive.org/details/wutheringheights04bron (Harper & Brothers, New York, 1848) · https://archive.org/details/wutheringheights00bron (Smith, Elder, London, 1889) · https://www.gutenberg.org/ebooks/1700 (Gaskell, Life of Charlotte Brontë, Vol. 2)

Film
- https://www.warnerbros.com/movies/wuthering-heights

Listeners, press, awards
- Arctic Shift: https://arctic-shift.photon-reddit.com/api/posts/ids?ids=px6ykl,7p6zng,ul16bc,83iw0u,fxtq06,antni0,ltqtso,9ubk2s ; `/api/comments/search?link_id={id}`
- https://www.theguardian.com/books/2026/feb/05/wuthering-heights-by-emily-bronte-audiobook-review-aimee-lou-wood-reads-the-romance-of-the-moment
- https://www.independent.co.uk/extras/indybest/books/wuthering-heights-audiobook-aimee-lou-wood-b2918366.html
- https://variety.com/2026/shopping/news/wuthering-heights-audiobook-aimee-lou-wood-download-online-1236665688/
- https://www.today.com/popculture/books/reading-wuthering-heights-book-trend-rcna259613
- https://www.audiopub.org/2004-audies-1 (and the 30 other year pages from https://www.audiopub.org/audie-awards-winners)

Competitors
- https://audiobookfest.com/best-audiobook-for-wuthering-heights-where-to-listen/ · https://www.audiobook.co.uk/recordings/wuthering-heights/ · https://reviews.oneclearwinner.com/product/wuthering-heights-by-emily-bronte-audiobook/ · https://thebooksinsider.com/audiobook/wuthering-heights/ · https://playlisttime.com/audiobook-length/wuthering-heights/ · https://wuthering-heights.co.uk/josephs-speech.php

HushBook
- D:\hushbook HEAD c0040d1: files and lines in section 7. D:\hushbook.app (HEAD): index.html, desktop.html, audiobook-with-text.html, llms.txt lines in section 7. https://itunes.apple.com/lookup?id=6783243597&country=us

---

## 12. Do not claim

1. That any 2026 film cast member narrates Wuthering Heights, or that an audio "film tie-in" edition exists. Neither was found (Audible narrator and keyword searches).
2. Who plays whom in the 2026 film (the Warner Bros. page does not list roles).
3. That the 440% Spotify rise is for the Aimee Lou Wood recording (Variety's text does not say which recording).
4. That Froggatt won an independent award for this book: "Narrator of the Year" is Audible's own statement. That any Wuthering Heights recording won an Audie (Donada Peters was a 2004 finalist).
5. That Naxos states who reads Lockwood. Say "a male voice reads Lockwood" (our sample measurement) or quote audiobook.co.uk / the AmazonClassics reviewer.
6. That Kristin Atherton reads any particular part of the Penguin edition.
7. That the Literati 2026 edition is abridged by its publisher's own label (it is listed "unabridged"); say what the sample shows: about half of the opening of Chapter 2 is not read, including Joseph's lines.
8. That every LibriVox set is good: Version 1 has a 2.83 rating and audio-quality complaints.
9. That the commercial Ruth Golding listings are the LibriVox recording.
10. Joseph figures other than ours with their method (1.56% of the words, 1,814 words, 42 speeches, 13 chapters), or "Joseph's dialect is the only dialect" (Hareton, Zillah and others use some).
11. That the Penguin Classics audio reads the 1847 text, or that any commercial recording uses a given edition.
12. Membership tiers, "free with Audible" or Kindle Unlimited as permanent facts.
13. That the BBC Radio 4 version is the full novel, or its broadcast year.
14. That Whispersync is a feature of particular editions (the tag is on all eight pages).
15. Spotify, Libro.fm or Chirp availability for any edition (not checked; blocked).

## 13. What we could not verify

- Spotify listings (needs a login), Libro.fm (HTTP 202 / 403), Chirp (403), Google Play, Scribd, BBC Sounds.
- Google SERP, People Also Ask, AI Overview.
- How each main narrator voices Joseph beyond the reviews quoted (no sample reaches his lines except Literati's, which cuts them).
- Who reads which part in the Naxos (stated nowhere) and Penguin (Atherton) editions; the dramatic reading's narration split.
- Which text (1847 or 1850 spelling) each commercial recording reads.
- The BBC dramatisation's original broadcast year; Daniel Massey's recording (named by the Guardian, not on Audible).
- Whether the commercial Ruth Golding listings are the LibriVox recording.
- Audible membership tiers behind "Listen for free" and the plan names.
- HushBook e-book sync and transcript behaviour on this specific book (not run on a device).
