# Platform research: best Jane Eyre audiobook

Post slug: `best-jane-eyre-audiobook`. Researched November 13, 2026. Every claim carries a source, the date read (November 13, 2026 unless a line says otherwise) and **VERIFIED** (opened and seen today) or **UNVERIFIED**. **OUR CALCULATION** = produced by a saved script on a saved text or file. Prices and ratings change; each is a snapshot of 2026-11-13.

Scope: what a listener can get (editions, free recordings, listener opinion, HushBook, competing pages), plus the book data the comparison needs (word count, chapters, volumes, the French, names and pronunciation). The read-or-listen studies are in `research-evidence.md`.

## How pages were read

Same methods as `../2026-11-12-best-wuthering-heights-audiobook/research-platforms.md`, scripts copied and adapted into `scripts/` here (each names its parent in its header). Raw responses stay in the session scratchpad (`c2a3d7ee…/scratchpad/book/`: `gate/`, `ac/`, `serp/`, `pages/`, `aud-cat/`, `aud-prod-us/`, `aud-prod-uk/`, `render/`, `apple/`, `od/`, `lv/`, `lv-detail/`, `reddit/`, `audies/`, `pub/`, `stores/`, `refs/`, `ev/`, and download folders `dl-gutenberg-1260/`, `dl-gutenberg-768/`, `dl-gutenberg-1342/`, `dl-naxos-pdf/`, `dl-samples/`), outside git. Python ran with `-I`; every download went into its own new folder.

- **Audible catalogue API** (no auth), `.com`, `.co.uk`, `.ca`, `.com.au`, 29 keyword sets ("jane eyre", "+bronte", "+unabridged", "jane eyre an autobiography", 13 narrator names, "+naxos", "+penguin classics", "+bbc", "+dramatisation", "+full cast", "+audible original", "+drama", "+abridged", "+claire bloom", two Brontë collection terms), 2 pages each: 514 Brontë "Jane Eyre" products (`scripts/je-audible-catalog.mjs`; rows printed with `scripts/je-aud-rows.py`). Product records for 39 US and 7 UK ASINs (`scripts/je-audible-products.mjs`, tabled with `scripts/je-audible-table.mjs`, dumped with `scripts/audible-product-dump.mjs`). Prices are the API's list price.
- **Audible product pages** rendered in headless Chrome (`headless: true`, `channel: 'chrome'`, `chromiumSandbox: true`, Playwright through `createRequire('D:/hushbook.app/package.json')`) with `?ipRedirectOverride=true&overrideBaseCountry=true`: Newton, Stevenson, Messenger, Scott, Ericksen, Root, Popplewell, BBC (`scripts/je-render.mjs`): buy-box wording, top reviews, press quotes, the `whispersync` data tag.
- **Apple Books**: iTunes Search API, 12 terms, and every matching `books.apple.com` page's schema.org data, 90 listings (`scripts/je-apple.mjs`).
- **Libby / OverDrive**: thunder API for NYPL, LAPL, KCLS, SFPL, Chicago PL (`scripts/je-overdrive.mjs`).
- **hoopla**: headless Chrome, 33 title pages (`scripts/je-hoopla.mjs`); narrator lines did not parse, so rows are matched by publisher and length.
- **Kobo US** search page (curl, first page). **Libro.fm, Chirp, Spotify, Google Play, Scribd/Everand: not checked** (blocked in earlier runs, or need a login).
- **Publishers**: Naxos product page and PDF booklet (curl with a browser User-Agent and referer; text via `scripts/je-pdftext.py`).
- **Samples**: seven Audible US sample MP3s, first 90 s transcribed with faster-whisper large-v3-turbo (CPU int8, VAD) and scored by 6-word shingle overlap with Gutenberg #1260 (`scripts/je_sample_check.py`). The transcriber invents text after the 90 s cut, which lowers some overlap scores; the first-segment text is what counts.
- **Text**: Project Gutenberg #1260 (`scripts/je-wordcount.py`, `scripts/je-french.py`, `scripts/je-contexts.py`); Gutenberg #768 and #1342 for same-method comparisons; Wikisource's first-edition transcription for the volumes.
- **LibriVox**: API, catalogue pages, archive.org metadata (including the full `reviews` array of each item, printed by `scripts/je-ia-reviews.py`) and advancedsearch (`scripts/je-librivox-detail.mjs`). **Discover**: the app's own queries rebuilt (`scripts/je-discover-cards.mjs` for the first tier, `scripts/je-discover-expanded.mjs` for the second).
- **Reddit**: Arctic Shift API (`scripts/je-reddit.mjs`). **Awards**: 31 Audie year pages on audiopub.org (`scripts/je-audies.mjs`).
- **HushBook**: app source D:\hushbook at HEAD `d2ed665` (2026-11-12), pubspec `version: 1.3.5+70` (pubspec.yaml:4). Between the previous research HEAD `c0040d1` and `d2ed665` only billing, diagnostics and test files changed (`git diff --stat`, 16 files), so every store, l10n and player line cited below was re-read at `d2ed665` and is unchanged. The working tree has uncommitted `lib/l10n/app_*.arb` edits in other languages; citations are to HEAD files. Site copy read with `git show HEAD:` at D:\hushbook.app HEAD `fae94ea`.

---

## 1. Complete (unabridged) recordings

### 1a. Master table (all values read 2026-11-13)

Ratings: Audible overall stars (number of ratings) / performance stars. Runtimes as each store prints them. "wpm" = 186,145 words (our count, section 4) divided by the Audible runtime; it includes any introduction or preface, so those editions read the novel a little faster than shown. OUR CALCULATION.

| # | Narrator(s) | Publisher | Release | Runtime | wpm | Audible US rating / perf. | Audible UK rating / perf. | US list price (API) | Where else (checked today) | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | **Thandiwe Newton** (credited as Thandie Newton in Audible's 2016 SoundCloud post) | Audible Studios | 2016-04-17 | 19 hrs 10 mins (1,150 min); Apple 19:11:56 | 162 | **4.8 (22,153) / 4.9 (20,267)**, 2,764 reviews | 4.8 (4,363) / 4.8 | $24.89; plans AccessViaMusic, US Minerva | AU 4.8 (1,004); CA 4.7 (861); Apple $22.99, 4.4 (70). Not in Libby (5 systems), not on hoopla | VERIFIED. B01COOZ5C2 (UK B01CO9WRZK) |
| 2 | **Juliet Stevenson** | Audible Studios (SKU BK_BBCW_002898) | 2009-07-31 | 19 hrs 13 mins (1,153) | 161 | **4.7 (2,188) / 4.8 (1,874)**, 226 reviews | **4.8 (1,715) / 4.9** | $24.10; plans **Free Tier**, AccessViaMusic; the US page shows **"Listen for free"** to a signed-out visitor | AU 4.8 (188); CA 4.6 (39). Not found in Apple Books US search; not in Libby or hoopla | VERIFIED. B002V5CWOY (UK B004FTBKUQ) |
| 3 | **Emma Messenger** | Trout Lake Media | 2012-09-10 | 21 hrs 47 mins (1,307); Apple 21:48:27 | 142 | 4.6 (2,041) / 4.5 (1,810), 167 reviews | 4.3 (134) / 4.2 | $28.16 | AU 4.5 (16); Apple $15.99, 4.3 (63) | VERIFIED. B0096TOT4O |
| 4 | **Lucy Scott** | RNIB | 2008-12-19 | 20 hrs 27 mins (1,227); Apple 20:28:17 | 152 | 4.6 (567) / 4.6 (332) | 4.6 (164) / 4.7 | $27.49 | Apple $12.99, 4.3 (124). Summary: "Please note: This is a vintage recording. The audio quality may not be up to modern day standards." Includes the 1848 preface (sample, 1c) | VERIFIED. B0036NAQUC (UK B004FU5TO8) |
| 5 | **Susan Ericksen** | Brilliance Audio, "Jane Eyre (AmazonClassics Edition)"; "includes editorial revisions" | 2017-07-24 | 17 hrs 27 mins (1,047); Apple 17:28:42 | 178 | 4.7 (567) / 4.8 (462) | 4.8 (5) | $24.66; plans include **KindleUnlimited** | Apple $26.99, 5 (5). Same narrator, "The Classic Collection" (Brilliance, 2015), 17 hrs 21 mins, 4.7 (83) | VERIFIED. B073VRW59Y |
| 6 | **Amanda Root** | Naxos AudioBooks; Naxos "Released: April 2005", "Produced by David Timson" | Audible 2004-12-26 | 20 hrs 33 mins (1,233); Naxos "Running Time: 20 h 34 m", booklet "Total time on CDs 1–17: 20:34:11"; Apple 20:33:45 | 151 | 4.7 (279) / 4.8 (184) | 4.7 (45) / 4.8 | $27.45 | Apple $36.99. Naxos: Root played "Miss Temple in Zeffirelli's film of Jane Eyre". Educational Edition (2024, with Francis Gilbert's guide read by Nicholas Boulton), 22 hrs 2 mins, on hoopla | VERIFIED. B002V1NMBU (UK B004FU0XT4). Digital ISBN 978-962-954-463-8 |
| 7 | **Anna Popplewell** | Penguin Classics; "This definitive recording includes an Introduction by Stevie Davies" | 2019-09-26 | 22 hrs 51 mins (1,371); Apple 22:51:55; OverDrive 22:51:58 | 136 | **4.8 (219) / 4.9 (181)** | 4.7 (62) / 4.7 | $19.32 | AU 4.6 (19); Apple $12.99, 4.5 (140); **Libby LAPL 3 copies (9 holds)** | VERIFIED. ASIN 0241438691 |
| 8 | **Wanda McCaddon** | Tantor Audio | 2008-04-01 (OverDrive 2008-04-15) | 17 hrs 56 mins (1,076); OverDrive 17:57:18 | 173 | 4.4 (102) / 4.4 | 4.5 (66) / 4.4 | $23.14 | **Libby KCLS 9 copies (5 available)**, NYPL 2, LAPL 2, SFPL 2; Apple $22.99 | VERIFIED. B002V19RRI |
| 9 | **Wanda McCaddon, credited as Nadia May in Libby** | Blackstone | 2009-06-19 (OverDrive 2009-06-12) | 18 hrs 51 mins (1,131); OverDrive 18:52:16; Apple 18:52:46 | 165 | 4.5 (75) / 4.7 | 5.0 (5) | $23.22 | **Libby NYPL 7 copies (15 holds), SFPL 4 (17 holds)** under "Nadia May"; Apple lists "Wanda McCaddon" | VERIFIED (same publisher, date and length under both names). B002V5IZWC |
| 10 | Josephine Bailey | Books on Tape | OverDrive 2007-12-18; Apple 2011-02-08 | OverDrive 20:55:05; Apple 20:54:52 | 148 | not on Audible (sweep) | n/a | n/a | Libby LAPL 3 (7 holds), SFPL 3 (2 holds); Apple $16.99, 4.2 (17) | VERIFIED |
| 11 | Flo Gibson | Recorded Books (OverDrive 1980) | Audible 1999-07-06 | 18 hrs 26 mins (1,106); OverDrive 18:28:41 | 168 | 4.2 (108) / 4.2 | 3.6 (7) | $21.02 | Libby LAPL 2, KCLS 3; Apple $22.99 (18:31:25). Also Audio Book Contractors 2009, 18 hrs 23 mins, 4.5 (24): whether the same recording UNVERIFIED | VERIFIED. B002VACE10 |
| 12 | Juliet Mills | Blackstone 2014; Phoenix Books 2019 | 2014-06-12; 2019-11-22 | 19 hrs 26 mins; 19 hrs 10 mins | 160; 162 | 4.7 (23); 4.8 (10) | 5.0 (3); 5.0 (6) | $24.79; $25.74 | hoopla (Phoenix, 19h 10m); Apple (2002 listing, 19:10:25, $36.99) | VERIFIED. B00KWWCT2S, B081TMXNV8 |
| 13 | Anna Bentinck | Dreamscape | 2015-11-05 | 23 hrs 8 mins (1,388) | 134 | 4.8 (28) / 4.8 | 5.0 (1) | $28.54 | hoopla 23h 8m; Libby LAPL 1 (5 holds); Apple $5.99 | VERIFIED. B017KTXCG2 |
| 14 | Alison Larkin | Alison Larkin Presents ("followed by three poems by Charlotte Bronte") | 2020-04-28 | 21 hrs 50 mins | 142 | 4.7 (18) / 4.8 | none | $29.75 | 2025 re-recording/edition "followed by a new Study Guide", 22 hrs 3 mins (B0G319W3LX); hoopla 21h 58m (with guide). A 2024 Reddit poster heard her on Scribd (UNVERIFIED) | VERIFIED. B087KRNNF4 |
| 15 | Donna Barkman | Jimcin Recordings | 2007-02-08 | 20 hrs 54 mins | 148 | 3.9 (57) / 4.5 | 2.0 (4) | $27.49 | Apple 3.8 (14) | VERIFIED. B002V1JRPU |
| 16 | Andrea Giordani | A.R.N. Publications | 2015-11-25 | 17 hrs 56 mins | 173 | 4.5 (53) / 4.3 | 5.0 (1) | $24.05 | | VERIFIED. B018H7DEBE |
| 17 | Alice Johnson | Audioliterature | 2017-07-03 | 18 hrs 20 mins | 169 | 4.8 (34) / 4.8 | n/a | $24.69 | Apple $5.99 | VERIFIED. B072XJNCRD |
| 18 | **Full cast:** Amanda Friday (Jane), Rob Goll (Rochester), Jeff Moon (St. John Rivers), Sara Morsey (Mrs. Reed), Elizabeth Klett (Diana Rivers) and others | Spoken Realms | 2019-09-11 | 19 hrs 38 mins (1,178) | 158 | 4.8 (28) / 4.7 | 4.4 (8) / 3.8 | $25.53 | | VERIFIED (cast list in the summary). B07XPGPGK5 |
| 19 | **Full cast:** Robin Siegerman, Blaise Doran, Graham Scott, Mai Ling Turner, Denis Daly, Alexandra Lee Smith, Jen Smith | Thrive Audio (hoopla: Blackstone) | 2024-05-28 | 21 hrs 52 mins (1,312) | 142 | 4.8 (21) / 4.6 | none | $30.02 | hoopla 21h 52m; Apple $24.99 | VERIFIED (roles not listed). B0D3454ZLL |

Totals and range: complete, human-read, single-title recordings run **17 h 21 min (Susan Ericksen, Classic Collection) to 23 h 8 min (Anna Bentinck)** on sale, and **25 h 19 min** for Dawn Sutton's free LibriVox reading. Pace 122 to 179 wpm across 29 complete recordings including the four LibriVox sets, median 157 (`je-wordcount.py`). OUR CALCULATION.

### 1b. Abridged, dramatised, adapted (flag in the post)

| Version | Kind | Publisher, release | Runtime | Ratings / price | Status |
|---|---|---|---|---|---|
| **BBC Radio 4 full-cast dramatisation**, "Amanda Hale and Tom Burke star in a brand new BBC Radio 4 full-cast dramatisation of Charlotte Brontë's most beloved novel, adapted by Rachel Joyce" | Radio drama; Audible format "abridged" | BBC Digital Audio, 2016-05-05 | **2 hrs 13 mins** (133 min); Apple 2:13:16; OverDrive 02:13:16 | US **4.7 (263) / 4.8**, $15.77; UK 4.7 (157); Apple $12.99; Libby LAPL 1 | VERIFIED. B01DE02OHO (UK B01DE066FA). Also inside "The Brontë BBC Radio Drama Collection: Seven Full-Cast Dramatisations" (2018-10-04, 15 hrs 40 mins, US 4.6 (142) / 4.9, $19.32, B07FSVD5Q1): "Jane Eyre by Charlotte Brontë (tracks 1-2)". Top review: "It's always tricky in adaptations as to what to keep and what to cut for space: I thought they made some good choices." |
| Claire Bloom and Sir Anthony Quayle | "dramatised reading", abridged | HarperCollins, Audible UK 2010-12-10 | 2 hrs 54 mins | UK 4.6 (22), £/$11.19 | VERIFIED. UK B004FP98UY; not in the US sweep |
| Emma Fielding (Naxos) | Abridged; 2009 release adds "Top Teacher's Notes" by Francis Gilbert | Naxos 2009-02-18; 1999-12-26 | 4 hrs 1 min; 3 hrs 54 mins | 4.3 (24); 3.9 (28) | VERIFIED. B002V0QGBE, B002VA932S; Libby LAPL 1 |
| Joanna David | Abridged | Penguin Group (USA), OverDrive 2005-06-16 | 06:05:58 | | VERIFIED (Libby NYPL 1) |
| Penelope Wilton | Abridged | Hodder & Stoughton, 2009 | 3 hrs 10 mins | 4.5 (4) | VERIFIED. B0032N8RNY |
| Dame Wendy Hiller | Abridged ("abridgement of Charlotte Bronte's famous novel") | BN Publishing, 2015 | 3 hrs 2 mins | 4.4 (11) | VERIFIED. B012OKMHGI |
| Carole Boyd | Abridged | CSA Word 2008 / The Copyright Group 2011 / Canongate (OverDrive) | 2 hrs 23 mins | 4.5 (10) | VERIFIED. B0036GPKFU; Libby NYPL 4 (3 available) |
| L.A. Theatre Works, full cast | Radio play; Audible "original_recording" | 2016-03-24 | 2 hrs | 3.0 (10) | VERIFIED. B01DCOASS4; Libby NYPL 2, KCLS 3 |
| Oxford Bookworms Library Stage 6, Ishia Bennison | "An Oxford Bookworms Library reader for learners of English, adapted from the Charlotte Bronté original by Clare West"; title carries "(Adaptation)" | OUP, 2011 | 3 hrs 21 mins | 4.5 (23) | VERIFIED. B004I401W6 |
| BBC Classics: Pride and Prejudice, Jane Eyre & Cranford (Katherine Press, Carolyn Pickles, Clare Corbett) | "abridged readings of three of the greatest novels" | BBC Audio, 2021 | 38 hrs 24 mins (three books) | 3.8 (4) | VERIFIED. 1529142504 |
| Deborah Carr; Real Reads (Gill Tavner); Saddleback; Sweet Cherry (children's); "Mercury Summer Theater of the Air" | Short adaptations, retellings, old radio | various | 0:31 to 0:53 | | VERIFIED as listed |
| Retellings and sequels: "Jane Eyre Laid Bare" (Penelope Rawlins, 10:07), "Not Forgetting Adele" (sequel), "Jane Heir" | Not the novel | | | | VERIFIED as listed; do not recommend |
| Synthetic voices ("Virtual Voice", "AI Voice Bob", "AI Voice Jon", "AI Voice (Kokoro TTS)"), "Adapted for Modern Readers", study guides (Course Hero, GCSE notes), "Slumber Studios" sleep edition (Elizabeth Grace, 28:52:18) | Not a human reading of the novel, or not the novel | 2020 to 2026 | | | VERIFIED as listed; do not recommend |

**Is the full-cast version the whole book?** Three full-cast recordings read the whole text: Spoken Realms (19 h 38 min, 158 wpm), Thrive Audio (21 h 52 min, 142 wpm) and LibriVox's free dramatic reading (19 h 42 min 53 s, 157 wpm). Paces consistent with the complete text (complete solo readings run 122 to 179 wpm); not checked by sample. The BBC Radio 4 (2 h 13 min) and L.A. Theatre Works (2 h) full casts are adaptations. OUR CALCULATION from runtimes.

### 1c. What each Audible sample plays (OUR CALCULATION, `scripts/je_sample_check.py`, run 2026-11-13)

| Edition | Sample length | Sample opens with | Overlap with Gutenberg #1260 | Note |
|---|---|---|---|---|
| Juliet Stevenson | 229 s | "There was no possibility of taking a walk that day." | 93.5% | Chapter 1 from its first line |
| Anna Popplewell | 308 s | "there was no possibility of taking a walk that day" | 92.0% | Chapter 1 from its first line: the sample does **not** play Stevie Davies's introduction (unlike Froggatt's Wuthering Heights sample) |
| Emma Messenger | 120 s | "Jane Eyre, an autobiography, by Charlotte Bronte, read by Emma Messinger, chapter one." | 85.6% | Credits, then Chapter 1 |
| Thandiwe Newton | 300 s | "of winters, glazed in alpine heights above heights" | 92.3% | Starts partway into Chapter 1 (the Bewick passage) |
| Amanda Root | 600 s | "...the multiplied rigors of extreme cold." | 64.5% (first 90 s verbatim; transcriber noise after the cut) | Partway into Chapter 1 |
| Susan Ericksen | 300 s | "studded with isles from its southern extremity" | 49.3% (first 90 s verbatim; transcriber noise after the cut) | Partway into Chapter 1; the AmazonClassics "editorial revisions" did not show in these 90 s |
| Lucy Scott | 300 s | "and as vital, a mien as dauntless and as daring. Is the satirist of Vanity Fair admired in high places? I cannot tell." | 87.3% | **The 1848 preface** (its Thackeray paragraph): Scott's recording includes the preface |

No sample reaches the French (Chapter 11 onward) or St. John (Chapter 28), so how each narrator handles them is not tested here.

### 1d. Notes per main edition

- **Thandiwe Newton (Audible Studios, 2016).** By far the most-rated Jane Eyre: 22,153 US ratings, ten times the next (Stevenson 2,188). Audible's page: "Earphones Award Winner (AudioFile Magazine)" (Audible's statement; AudioFile not opened). Press quotes on the page: "Narrator Thandie Newton gives a delightful performance of this beloved classic. She delivers the voice of Jane from childhood to adulthood with elegant conviction, breezing through the dense sentences as if they were part of a contemporary novel." (AudioFile); "[Thandie Newton's] taut British diction makes a one-woman play out of the orphan girl's love story" (The New York Times Book Review; the quote later calls John Reed Jane's "cruel stepbrother", which is wrong: he is her cousin; stop before that clause if quoted). Name: Audible US/UK, Amazon UK and CA list "Thandiwe Newton"; Audible's own SoundCloud post (2016) reads "Jane Eyre by Charlotte Bronte, Narrated by Thandie Newton" and links the same ASIN B01COOZ5C2, so autocomplete's "thandie newton" is this recording. VERIFIED. Reddit: "My favorite is the one recorded Thandiwe Newton … It feels like you are listening to Jane's inner monolog." (r/JaneEyre 1bs2soc, 2024-03-31, score 11); "Definitely Thandawe Newton, amazing." (19eheal, 2024-01-24, 10); "She's got a beautiful accent and does a great job vocally distinguishing between characters." (7oyip1, 2018-01-08, 2). A listener on r/ClassicBookClub (v2wpz0, 2022-06-02, 7): "I am listening to the audiobook narrated by Thandiwe Newton and listening to the song was just amazing." (Rochester's song, Ch. 24.) Her War and Peace won the 2023 Audie; this recording won none (6b).
- **Juliet Stevenson (Audible Studios, 2009).** UK 4.8 from 1,715 with **4.9 performance**, the best UK performance score among the big editions; US 4.7 from 2,188. "Listen for free" on the US page today (plan "Free Tier"; membership terms UNVERIFIED). Top US review: "I must've read Jane Eyre at least 15 times between the ages of 7 and 67, but never heard it as an audiobook -- never dared. … But Juliet Stevenson does such a good job as reader that for the very first time I actually cried at a point or two". Reddit: r/JaneEyre OP (2024): "found the Juliet Stevenson narrated version on Audible. Complete and unabridged; 19 hours and 13 minutes. I love her narration and characterisations."; "Juliet Stevenson is the GOAT." (4). She sings Rochester's song: "Juliet Stevenson made the artistic decision to sing it in the style of a rustic ballad." (r/ClassicBookClub v2wpz0, 2022-06-02, 6). Not found on Apple Books US. audiobook.co.uk's pick. VERIFIED.
- **Emma Messenger (Trout Lake, 2012).** Third most-rated (2,041), 4.6 / 4.5; the longest of the main editions at 21 h 47 min (142 wpm). No accent or quality lines in the rendered top reviews. VERIFIED.
- **Lucy Scott (RNIB, 2008).** 4.6 from 567; RNIB's note: "This is a vintage recording. The audio quality may not be up to modern day standards." Reviews: "The narrator has the perfect "accent" and her voice is very pleasant, easy to listen to."; "Her accent was perfect and easily understood." Reddit: "Lucy Scott, hands down. … Lucy Scott brings a level of intimacy and eerieness that just brings forth so much in the book. Please try Lucy!" (ojuz9s, 2021-07-14, 2). Includes the 1848 preface (1c). VERIFIED.
- **Susan Ericksen (AmazonClassics, 2017).** Kindle Unlimited plan in the API (today); the fastest complete reading (178 wpm, 17 h 27 min). Reddit: "I've only heard the Amazon Classics edition, read by someone named Susan Ericksen. It was competently done" (1bs2soc, 2). VERIFIED.
- **Amanda Root (Naxos, 2005).** 4.7 / 4.8 from 279; review: "Amanda Root is perfect for it! She has an amazing accent that sweeps you into the story." Naxos booklet track list starts tracks at "'Ah!' cried she, in French…" (CD 4, track 8) and several St John lines. Naxos: she played Miss Temple in Zeffirelli's Jane Eyre. VERIFIED.
- **Anna Popplewell (Penguin Classics, 2019).** 4.8 / 4.9 from 219, the highest US stars among editions with 200+ ratings (tied 4.8 with Newton, same 4.9 performance); top review by a self-described "professor of British novels": "Popplewell gives an impressively sensitive, unabridged reading". Reddit: "Anna Popplewell has a nice median resonance with an unpretentious accent." (19eheal, 1). Penguin's blurb names her "best known for her leading role as Susan Pevensie in The Chronicles of Narnia films". The most library-held of the higher-rated editions (LAPL 3 copies, 9 holds). Its blurb names "his terrible secret": do not quote it. VERIFIED.
- **Wanda McCaddon / Nadia May.** Two recordings: Tantor 2008 (17 h 56 min) and Blackstone 2009 (18 h 51 min, credited "Nadia May" in Libby, "Wanda McCaddon" on Audible and Apple). Autocomplete: "jane eyre nadia may". Reddit OP (ojuz9s, 2021) was choosing between "Alison Larkin's reading or there's Nadia May's reading"; reply "Nadia May is probably my favorite narrator". The two names belong to one narrator on the evidence of matching listings; a biographical source was not opened (UNVERIFIED beyond the listings). VERIFIED (listings).

### 1e. Smaller listings (VERIFIED as listed; not recommended without more checks)

Audible US, complete and human-read: Emily Woof (silksoundbooks 2015, 20:12, 5.0 (7)), Rachel Atkins (SNR 2024, 20:35, 4.6 (7)), Judi Pennington (Cherry Hill 2012, 20:31, 4.1 (17)), Margaret Melosh (Musaicum 2020, 19:16), Elizabeth Barr (Hexagon Tech 2022, 19:23), Graham Stuart (2023, 20:32), Sara Nichols (SoundCraft 2024, 21:14), Alexandra May (NTMC 2025, 21:02, 1.0 (1)), Magda Allani (2020, 22:40), Andrea Giordani (MuseumAudiobooks 2020, 20:57), Stephanie Poppins (Neworld 2025-11-12, 20:46), Cyril Taylor-Carr (Icon "Stories for Everyone" 2023, 18:28), Geoffrey Giuliano ("The Original Manuscript", Icon 2026, 18:26). Apple only: Claire Walsh (2018, 18:19:42, $0.99, 4.1 (53)), Sarah Coomes (2023, 22:43:13), Kate Hopkins (2026, 22:51:22), Sophie Bennet (2025, 21:01:02), Petra Clay, Gennifer Blunt, Eloise Fairfax, Everly Sydney, Delilah Griffin. **Elizabeth Klett commercial re-listings**: Saga Egmont 2017 (18:27, 4.7 (24)), Paperless 2016 (18:19, 4.6 (23)), Erika 2023 (18:22), Apple $0.99 (18:23:50, **4.3 (194)**), Kobo (18 hours 23 min): same reader as the free LibriVox Version 2 (18:36:29); whether the same recording UNVERIFIED. Upcoming: Blackstone, release 2027-04-06, 19:00, no narrator listed (B0H7YY98ZV): do not mention.

---

## 2. Free recordings

### 2a. LibriVox (four English sets, one German)

All English sets read Project Gutenberg #1260 (LibriVox `url_text_source`). VERIFIED today: LibriVox API, catalogue pages, archive.org metadata (reviews array read in full) and advancedsearch (downloads).

| Set | LibriVox id, archive.org item and title | Readers | Runtime | Catalog date | 64 kbps download, files | archive.org downloads | Reviews |
|---|---|---|---|---|---|---|---|
| **LibriVox "Jane Eyre (version 2)"**, archive.org title **"Jane Eyre (version 3)"** (URL slug `jane-eyre-version-3-by-charlotte-bronte`) | 2192, `jane_eyre_ver03_0809_librivox` | **Elizabeth Klett** alone (also coordinator) | **18:36:29** | 2008-10-01 | 511 MB, 38 files ("01 - Chapter 01" … "38 - Chapter 38, Conclusion"); zip 523.4 MB | **4,648,589** | 22 entries: 19 five-star reviews of the reading, 2 zero-star non-reviews (a question, a LibriVox reply), 1 five-star spam (2025). archive.org average shown 5 |
| Version 1 (group), "Jane Eyre" | 133, `jane_eyre_librivox` | 21 readers (coordinator Kristin LeMoine) | 20:36:36 | 2007-05-19 | 566 MB, 39 files ("00 Preface and Note to 3rd Edition", "01" … "38"); zip 593.8 MB | 3,521,496 | 8 entries, **five of them praise Klett's reading posted on the wrong page** ("Jane Eyre read by Elizabeth Klett", 2010; a reviewer of the Klett page notes a review "mistakenly placed on the page of another Librivox rendition"). The one review of this set: "I have reached Chapter 11 and the reader (as Jane, in the first person) is a man. Surely that can't be right?" (Tonto2, 2 stars, 2018-03-23); LibriVox replied pointing to Klett's "female-only rendering" and the dramatic reading |
| Version 3, dramatic reading, "Jane Eyre (dramatic reading)" | 6772, `janeeyre3_1212_librivox` | 36 readers; cast list: "Narrator/Charlotte Bronte/Louisa Eshton: Eden Rea-Hedrick Jane Eyre: Elizabeth Barr Young Jane/Mrs. Dent/Bread Shop Woman: Arielle Lipshaw … Mr. Rochester: Algy Pug … Adele: Tiffany Halla Colonna Sophie: Nadine Eckert-Boulet … St. John Rivers: Aidan Brack"; "Miss Temple/…/Diana Rivers: Elizabeth Klett" | 19:42:53 | 2012-12-27 | 542 MB, 39 files ("00 - Preface/Dramatis Personae" … "38 - Chapter 38") | 1,229,593 | 2: "This dramatic reading of Jane Eyre is marvelous. … The lead characters are very well acted, and the supporting cast is pretty darn good too." (Runcible, 5, 2013-01-11) |
| Version 4, "Jane Eyre: An Autobiography" | 18154, `jane_eyre_2208_librivox` | **Dawn Sutton** alone | **25:19:06** | 2022-08-22 | 696 MB, 41 files ("00 - Preface", "01 - Chapter I" … "40 - Chapter XXXX"): file numbers stop matching the book's 38 chapters after Chapter 26 (our length comparison) | 62,104 | none |
| German, "Jane Eyre, die Waise von Lowood" | 6660, `janeeyrediewaisevonlowood_1402_librivox` | 15 readers | 22:42:28 (API; no runtime on archive.org) | 2014-02-02 | 49 files | 407,063 | none |

**What Klett's reviewers say (quoted character for character from the archive.org `reviews` array):**
- TheBookworm, 5 stars, 2009-01-10, "Fabulous reading": "Elizabeth Klett gives us a wonderful, professional quality reading of this classic. Happy to report that her British accent is very creditable, even to the ears of a native speaker. Brava!  (The BookWorm, Manchester, UK)"
- CasualListener, 5 stars, 2008-12-03, "heartily recommended": "Priceless are the numerous duets between Eyre and Mr Rochester for the reader seems to have a neat distinct voice for both and never fades out of character." Also: "The first minutes of the first chapter are somehow hard to follow, but then … the reader voice catches up with the beat".
- w0manp0et, 5 stars, 2011-01-21, "Download this version!": "The other version of 'Jane Eyre' is narrated by several different readers, some of the accents are confusing, some voices are strong while others rise just above a whisper, and the females who speak Rochester's lines leave much to be desired."
- jessn519, 5 stars, 2015-08-06: "I find sometimes listening to the audio books is confusing during dialog. This reader reads with such emotion and has a specifc voice for each character its like watching a movie."
- Laetitian, 5 stars, 2016-05-25: "I listened to this recording in 2010, and it was my first English audio-book I listened to." and the list ending "\"St. John (Sinjhn.)\" How do you even look that up?)"
- beautman1, 5 stars, 2017-05-07: "Rochester was not given voice as I would have had him but that's a subjective disagreement. Many free audiobooks tend to drone on after a while but this one pleases hour after hour."
- Rarog, 5 stars, 2020-05-25: "Flawless performance, high audio quality. Masterful personification of Jane Eyre."
- Misfiled on the group page: cynthus, 5 stars, 2010-10-14: "She sounds, in fact, like Zelah Clark, who played Jane in the BBC production with Timothy Dalton as Mr. Rochester."; OurLittleGretta, 5 stars, 2017-02-15: "Her accent added to the "real" feel of each character for the period in time."
- Reddit: "I've listened to the Librivox version with Elizabeth Klett and really enjoyed it." (1bs2soc, 3); "Same here, Elizabeth Klett's voice is permanently the voice I hear in my head when I read the book" (2); "I listened to the Librivox version of Jane Eyre … I was genuinely impressed with the quality! I believe the narrator is Elizabeth Clett" (7oyip1, 2018, 2).

**Which free set to pick:** Klett: the most downloaded Jane Eyre on archive.org, the only free solo reading in a normal length, 19 five-star reviews, a British accent per a Manchester reviewer, "Sinjhn". Dawn Sutton's is the other solo reading but runs 25 h 19 min (122 wpm, the slowest complete reading). For a cast, the dramatic reading. The group set changes reader by chapter and has a man reading Jane in at least Chapter 11 (per its one review). Days to finish Klett at one hour a day (18 h 36 min ÷ speed, rounded up): 19 at 1x, 15 at 1.25x, 13 at 1.5x, 10 at 2x. OUR CALCULATION.

### 2b. Other free routes (read today)

- **Audible**: Stevenson's US page shows "Listen for free" to a signed-out visitor (plan "Free Tier"): terms UNVERIFIED; say "showed 'Listen for free' to a signed-out visitor on November 13, 2026" at most.
- **Kindle Unlimited**: Ericksen's AmazonClassics listing carries a "KindleUnlimited" plan in the API: snapshot, UNVERIFIED as an offer.
- **Audible's SoundCloud** (`soundcloud.com/audible/jane-eyre`, oEmbed): "Jane Eyre by Charlotte Bronte, Narrated by Thandie Newton" by Audible, with "Get this audiobook for free when you try Audible". A promotional sample, not the book. VERIFIED (oEmbed).
- **YouTube** (oEmbed authors): "Jane Eyre by Charlotte Bronte | Full Audiobook" (Gates of Imagination; source not stated), "Jane Eyre by Charlotte Brontë | Full Audiobook (LibriVox Public Domain Recording)" (Nevan Brown's Audiobooks & Tech), "Jane Eyre: Volume 1 (audiobook synced with text)" (mercibeaucs), "Jane Eyre Audiobook - British English Reading - Chapters 1 to 11" (iswearenglish; an English-teaching channel, partial), "\"Jane Eyre\" by CHARLOTTE BRONTE Full Novel Audiobook FREE" (CBGP Literature). None is a rights holder's channel; LibriVox recordings may be re-uploaded legally (public domain), but which recording each plays was not checked. **The playlist "Audiobook-Jane Eyre-Narrator-Juliet Stevenson" (channel "Shine") looks like a copy of the commercial recording: never mention it (notes.md).** Post wording: "YouTube uploads exist, but none we found comes from a publisher; the same free recordings are on LibriVox."
- **Spotify** show "Jane Eyre" (open.spotify.com/show/6RDoNccoq9Z7vSJoArW4Hg; oEmbed gives only the title): publisher UNCHECKED. Do not recommend.
- **Machine-voiced "free audiobook" sites** in the SERP: audiobook-maker.com (17 h 56 min), openearbooks.com (17 hr 53 min, "free audiobook and full text"). Not human readings (Rodero and Lucas 2023: listeners enjoy human voices more). Do not recommend.
- **Project Gutenberg #1260** is the free text the LibriVox sets read. VERIFIED.

---

## 3. The French in Jane Eyre (OUR CALCULATION, `scripts/je-french.py`)

### 3a. How much, where, whose

Method: a French-word detector over the 38 chapters (quoted speech judged sentence by sentence, narration clause by clause; italic and single-quoted French spans added), then every passage read by hand (25 false hits dropped: "&c.", "content", loanwords "naïve", "naïveté", "tête-à-tête", a lone "Mesdames"), and each passage's speaker labelled by hand from its paragraph. A few one-word exclamations are missed (for example "Oh ciel!", "parlez!"), so publish "about 350 words".

- **346 French words in 55 passages, 0.19% of the novel's 186,145 words, about 2.3 minutes of listening at 151 wpm.**
- **By chapter:** 10: 2, 11: 33, 12: 10, **13: 76**, **14: 50**, 15: 12, 16: 18, **17: 98**, 18: 5, 22: 9, 24: 31, 37: 2. Nothing in Chapters 1 to 9, 19 to 21, 23, 25 to 36 or 38.
- **By volume:** I 183, II 161, III 2.
- **By speaker:** **Adèle 291 (84%)**, Rochester 29 (mostly single words while telling Jane about Adèle's mother, Ch. 15: "grande passion", "taille d'athlète", "porte cochère", "beauté mâle", "voiture", "Mon ange"), Jane's narration 10 ("en règle", "par parenthèse", "père noble de théâtre", "minois chiffoné"), Blanche Ingram 8, Sophie 5 ("Mais oui, certainement", "bon soir"), Lady Ingram 2 ("Tant pis!"), Mrs. Fairfax 1 ("bonne").
- **Longest passages:** Ch. 13, 51 words (Adèle on a present); Ch. 17, 36 words (Adèle on her mother's guests); Ch. 17, 19 words (Adèle asking for a flower); Ch. 16, 16 words (Adèle: "Vos doigts tremblent comme la feuille").
- **Most of Adèle's talk is in English on the page.** Ch. 11: after "La Ligue des Rats: fable de La Fontaine", Jane tells us Adèle "declaimed the little piece" without giving it; her account of her life ("With Madame Frédéric and her husband: she took care of me…") is printed in English. VERIFIED by reading the text.

### 3b. What Adèle says (OUR TRANSLATION, plain English; spoiler-free)

| Ch. | French (Gutenberg #1260) | English |
|---|---|---|
| 11 | "C'est là ma gouvernante!" | "So that's my governess!" |
| 11 | "J'ai bien faim, moi!" | "I'm really hungry!" |
| 13 | "Et cela doit signifier, qu'il y aura là dedans un cadeau pour moi, et peut-être pour vous aussi, mademoiselle. Monsieur a parlé de vous: il m'a demandé le nom de ma gouvernante, et si elle n'était pas une petite personne, assez mince et un peu pâle. J'ai dit qu'oui: car c'est vrai, n'est-ce pas, mademoiselle?" | "And that must mean there's a present in there for me, and maybe for you too, miss. Monsieur talked about you: he asked me my governess's name, and whether she wasn't a little person, rather thin and a bit pale. I said yes, because it's true, isn't it, miss?" |
| 14 | "Est-ce que ma robe va bien? et mes souliers? et mes bas? Tenez, je crois que je vais danser!" | "Does my dress look right? And my shoes? And my stockings? Look, I think I'm going to dance!" |
| 16 | "Qu'avez-vous, mademoiselle? Vos doigts tremblent comme la feuille, et vos joues sont rouges: mais, rouges comme des cerises!" | "What's the matter, miss? Your fingers are shaking like a leaf, and your cheeks are red, red as cherries!" |
| 17 | "Chez maman, quand il y avait du monde, je le suivais partout, au salon et à leurs chambres; souvent je regardais les femmes de chambre coiffer et habiller les dames, et c'était si amusant: comme cela on apprend." | "At Mama's, when there were guests, I followed them everywhere, to the drawing room and to their rooms; I often watched the maids do the ladies' hair and dress them, and it was such fun: that's how you learn." |
| 17 | "Est-ce que je ne puis pas prendre une seule de ces fleurs magnifiques, mademoiselle? Seulement pour completer ma toilette." | "Can't I take just one of these beautiful flowers, miss? Only to finish my outfit." |

A complete fan translation exists (The Reader's Guide to Charlotte Brontë's "Jane Eyre", jane-eyre.guidesite.co.uk/french-translations, "from the excellent Barnes and Noble version", Chapters 11 to 18, 22, 24). Its Chapter 11 line reads "C'est là ma gouvernante?" with a question mark; Gutenberg #1260 has "!". VERIFIED.

---

## 4. Own data: length, chapters, volumes, pace, reading ease

Source: https://www.gutenberg.org/cache/epub/1260/pg1260.txt, downloaded 2026-11-13 into its own folder, header "Release date: March 1, 1998 [eBook #1260] Most recently updated: September 27, 2025", "Credits: David Price", the 1897 Service & Paton edition (F. H. Townsend's illustrations named; one illustration line), with the 1848 preface and the note to the third edition. SHA-256 `13414dee2951c3ee731d76d2ffd822016b2479c892162760c5d0eb2aa5fa7631`. Counting rules as in the series' scripts. OUR CALCULATION.

- **Counts:** 185,390 whitespace tokens between the markers; 185,381 with a letter or digit; 184,445 from "CHAPTER I"; 186,222 also splitting em dashes; **186,145 without the 38 chapter headings (the figure to publish)**. Preface plus note: 904 more. annotatedebooks.com's "approximately 185,000" agrees.
- **38 chapters in three volumes** (Wikisource, first edition; research-evidence.md (b)): **Volume I = Chapters 1 to 15, 60,508 words, 6 h 41 min; Volume II = 16 to 26, 59,611 words, 6 h 35 min; Volume III = 27 to 38, 66,026 words, 7 h 17 min** at 151 wpm. Gutenberg and the LibriVox files number 1 to 38 straight through; first-edition-style print editions restart at Chapter I in each volume (Vol. II Ch. n = Ch. 15 + n; Vol. III Ch. n = Ch. 26 + n). Which modern print editions restart: UNVERIFIED.
- **Chapter length:** mean 4,899 words (32.4 min at 151 wpm), median 4,368 (28.9 min). Longest **Chapter 27, 11,238 words (74 min; 62 min in Klett's file)**, then 34 (9,323), 21 (8,826), 17 (8,109), 37 (7,510). Shortest Chapter 38 (1,828, 12 min), then **Chapter 1 (1,934, 13 min; Klett's file 13:20)**, 2 (2,751), 6 (2,912), 22 (2,913). Only 6 of 38 chapters take under 20 minutes; 18 take 30 minutes or more.
- **Listening time at 151 wpm** (the site's median for LibriVox solo readers): **1x 20 h 33 min; 1.25x 16 h 26 min; 1.5x 13 h 42 min; 2x 10 h 16 min**. At ACX's 155 wpm: 20 h 1 min at 1x. Silent reading at 260 wpm: 11 h 56 min.
- **Days to finish at 151 wpm** (rounded up): 30 minutes a day: 42 at 1x, 33 at 1.25x, 28 at 1.5x, 21 at 2x; 60 minutes a day: 21, 17, 14, 11.
- **Actual recordings at speed** (runtime ÷ speed; 1.25x / 1.5x / 2x): Newton 19 h 10 min → 15 h 20 min, 12 h 47 min, 9 h 35 min. Stevenson 19 h 13 min → 15 h 22 min, 12 h 49 min, 9 h 36 min. Klett (free) 18 h 36 min → 14 h 53 min, 12 h 24 min, 9 h 18 min. Root 20 h 33 min → 16 h 26 min, 13 h 42 min, 10 h 16 min. Scott 20 h 27 min → 16 h 22 min, 13 h 38 min, 10 h 14 min. Messenger 21 h 47 min → 17 h 26 min, 14 h 31 min, 10 h 54 min. Popplewell 22 h 51 min → 18 h 17 min, 15 h 14 min, 11 h 26 min. Ericksen 17 h 27 min → 13 h 58 min, 11 h 38 min, 8 h 44 min.
- **Narrator pace (wpm):** Ericksen 179 (Classic Collection) and 178 (AmazonClassics), McCaddon (Tantor) 173, Giordani 173, Alice Johnson 169, Gibson 168 and 169, Klett 167, McCaddon/Nadia May (Blackstone) 165, Newton 162, Mills 162 and 160, Stevenson 161, Spoken Realms 158, LibriVox dramatic 157, Woof 154, Scott 152, Root 151, Pennington 151, Atkins 151, LibriVox group 150, Bailey 148, Barkman 148, Messenger 142, Larkin 142, Thrive 142, Popplewell 136 (with introduction), Bentinck 134, Sutton 122 (with preface). Range 122 to 179, median 157 (29 recordings).
- **Is Jane Eyre longer than Wuthering Heights?** Yes: 186,145 words against 116,440 by the same script today (Gutenberg #768 reproduces the published figure exactly), 1.6 times as long; 20 h 33 min against 12 h 51 min at 151 wpm. Pride and Prejudice: 121,676 (the site's figure). VERIFIED (our script) and consistent with the published posts.
- **Reading ease (Project Gutenberg's own scores, read today):** Jane Eyre "Reading ease score: 77.4 (7th grade). Fairly easy to read."; Wuthering Heights "78.8 (7th grade). Fairly easy to read."; Pride and Prejudice "69.2 (8th & 9th grade). Neither easy nor difficult to read." VERIFIED.
- **Sentence length (same splitter for all three, OUR CALCULATION):** Jane Eyre 17.6 words a sentence (10,589 sentences), Wuthering Heights 16.1, Pride and Prejudice 17.4 (matches the published P&P figure).
- **Dialogue:** 43.9% of words inside quotation marks (Volume I 35.7%, II 47.3%, III 48.8%); Wuthering Heights' frame narration and Pride and Prejudice's 46.8% are the comparisons on the site. 71.2% of paragraphs that open with a quotation mark carry no speaker name or speech verb outside the quotes (rough heuristic, as in the P&P research).
- **First person and the reader:** the word "reader" appears 38 times; 36 are Jane addressing the reader, in 22 chapters (Ch. 5, 9 to 13, 15, 17, 18, 24 to 29, 32 to 38). Do not quote the most famous one (it gives away the ending).

---

## 5. Names, pronunciation and the traps (from the text; OUR CALCULATION for counts)

Whole-word, case-sensitive counts in the novel text (`je-wordcount.py`); "first" is the first chapter the form appears in; facts are given with the chapter that tells them. **Spoiler check:** every fact below is told by the chapter shown and none reveals a later turn. Left out on purpose: the secret at Thornfield and everyone connected with it, Mr. Mason's business, how the Rivers family turns out to be related to anyone, Jane's uncle's letter and its consequences, and where anyone ends up.

| Name(s) in the book (count) | Who | Told by |
|---|---|---|
| Jane (340), Miss Eyre (45), Janet (21, Rochester's name for her, first Ch. 22) | The narrator, an orphan | Ch. 1 to 2 |
| Mrs. Reed (81) | Jane's aunt by marriage: her late husband "was my own uncle—my mother's brother" | Ch. 2 |
| John Reed (11; "Master John" 2), Eliza (30), Georgiana (44) | Mrs. Reed's children, Jane's cousins ("Eliza, John, and Georgiana Reed"; "John Reed was a schoolboy of fourteen years old") | Ch. 1 |
| Bessie (131; "Bessie Lee", Ch. 4), Miss Abbot (25) | Nursemaid and maid at Gateshead | Ch. 1 to 2 |
| Mr. Lloyd (12) | The apothecary | Ch. 3 |
| Mr. Brocklehurst (56) | Runs Lowood school | Ch. 4 to 5 |
| Miss Temple (63; "Maria Temple", Ch. 5) | Lowood's superintendent | Ch. 4 to 5 |
| Helen Burns (63 "Helen"; "Burns" 32) | A Lowood pupil; teachers call girls by surname ("the girls here were all called by their surnames") | Ch. 6 |
| Miss Scatcherd (23), Miss Miller (23), Mary Ann Wilson (4, Ch. 9) | Lowood teachers; a later Lowood friend | Ch. 5, 9 |
| Mrs. Fairfax (121) | Housekeeper at Thornfield; "The present Mr. Rochester's mother was a Fairfax, and second cousin to my husband" | Ch. 10 to 11 |
| Adèle Varens (Adèle 135; "Adela" 4, Mrs. Fairfax's form; Varens 12) | Mr. Rochester's French ward and Jane's pupil; "Adela was born on the Continent" | Ch. 11 |
| Sophie (27) | Adèle's French nurse | Ch. 11 |
| Mr. Rochester (332; Edward Fairfax Rochester, "Monsieur Edouard Fairfax de Rochester" in Adèle's version, Ch. 13) | Master of Thornfield | Named Ch. 11, met Ch. 12 |
| Grace Poole (21), Leah (27), John and his wife (Ch. 11 to 12) | Thornfield servants | Ch. 11 |
| Pilot (24) | Rochester's dog | Ch. 12 |
| Blanche Ingram (19; Ingram 90), Mary Ingram, Lady Ingram | Guests at Thornfield | Ch. 16 to 17 |
| St. John Rivers (130 "St. John", 2 "St John", Ch. 30 and 37; "Mr. Rivers" 33) | A clergyman; first name heard Ch. 28, surname Ch. 29 | Ch. 28 to 29 |
| Diana (76) and Mary Rivers | His sisters | Ch. 28 to 29 |
| Hannah (40) | The Rivers' old servant; speaks some dialect ("ye and Mr. St. John is like of different soart") | Ch. 28 |
| Rosamond Oliver (16) | A wealthy young woman of Morton | Ch. 31 |
| Places: Gateshead (43), Lowood (54), Thornfield (100), Millcote (29), Hay (18), Whitcross (10), Marsh End / Moor House (6 / 16), Morton (25) | | Ch. 2, 4, 10, 10, 11, 28, 28 to 29, 29 |

**The traps, in numbers:**
- **Johns:** "John" appears 200 times, 130 of them as "St. John". The others: John Reed, the cousin (Ch. 1 to 4, 10, 21); John, the Thornfield manservant (Ch. 11 onward); a clerk, John Green (Ch. 26). An uncle named John also appears in a letter in Ch. 21: leave him out (spoiler path). St. John Rivers is heard as "SIN-jin" on the recordings listeners mention (below), so the ear does not link him to the other Johns.
- **Marys:** Mary Ann Wilson (Lowood, Ch. 9), Mary Ingram (Ch. 16 to 18), Mary Rivers (Ch. 28 on); "Mary" 96 times in all.
- **Fairfax:** Mrs. Fairfax the housekeeper, and Rochester's middle name (his mother "was a Fairfax", Ch. 11).
- **Georgiana and Diana:** the Reed cousin and the Rivers sister.
- **Jane's names:** "Jane", "Miss Eyre", and from Rochester "Janet" (21, from Ch. 22).

**Pronunciation:**
- **Eyre** = "air": Wikipedia "Jane Eyre": "Jane Eyre (/ɛər/ AIR …)". VERIFIED.
- **St. John** = "SIN-jin": Wikipedia "St John (name)": "It can be pronounced /ˈsɪndʒɪn/ or /-ʒən/ sometimes in some places, particularly if it is the first part of a hyphenated family name or a given name"; the same page lists "Sinjin or Sinjun" as spellings. Listener evidence: Klett says "Sinjhn" (archive.org reviewer Laetitian, 2016); "I'm listening to the Audible version and I need to know, why the brits pronounce the name "St. John" as "Sinjin?"" (r/ClassicBookClub v7cv8x, 2022-06-08, score 6); "It's pronounced SinJin." (v5rldi, 2022-06-06, 6). How each paid narrator says it: UNVERIFIED (no sample reaches Chapter 28). VERIFIED (sources as quoted).
- Naxos track titles spell him "St John" (no full stop), e.g. "St John said these words as he pronounced his sermons…". VERIFIED.

---

## 6. What listeners say, and awards

### 6a. Reddit (Arctic Shift; scores as stored, read 2026-11-13)

| Thread | Sub, date | Score / comments | Remarks (comment score) |
|---|---|---|---|
| https://www.reddit.com/r/JaneEyre/comments/1bs2soc/ "Audio book" | r/JaneEyre, 2024-03-31 | 19 / 15 | OP: Stevenson, "Complete and unabridged; 19 hours and 13 minutes"; Newton "It feels like you are listening to Jane's inner monolog." (11); "Juliet Stevenson is the GOAT." (4); Klett LibriVox (3, 2); Ericksen "competently done" (2) |
| https://www.reddit.com/r/audiobooks/comments/19eheal/ "Which Jane Eyre narration is your favourite?" | r/audiobooks, 2024-01-24 | 5 / 7 | OP heard Alison Larkin on Scribd; "Definitely Thandawe Newton, amazing." (10); "love Juliet Stevenson" (4); "Thandiwe Newton did fantastic work on this one." (3); "I've listened to the Newton & Stevenson and they're both superb. You really can't go wrong with either." (1); Popplewell "unpretentious accent" (1) |
| https://www.reddit.com/r/audiobooks/comments/ojuz9s/ "Best reading of Jane Eyre?" | r/audiobooks, 2021-07-14 | 1 / 2 | "I personally liked Thandie Newton's a lot" (3); "Lucy Scott, hands down." (2) |
| https://www.reddit.com/r/audiobooks/comments/7oyip1/ "A good narrator for Jane Eyre on audible?" | r/audiobooks, 2018-01-08 | 8 / 3 | Newton "beautiful accent" (2); "I recommend the audible studio version with Thandie Newton." (2); LibriVox Klett (2) |
| https://www.reddit.com/r/ClassicBookClub/comments/v7cv8x/ (Chapter 30 discussion) | 2022-06-08 | 16 / 37 | "why the brits pronounce the name "St. John" as "Sinjin?"" (6) |
| https://www.reddit.com/r/ClassicBookClub/comments/v5rldi/ (Chapter 28) | 2022-06-06 | 16 / 49 | "It's pronounced SinJin." (6); "are you glad that we can actually read what Hannah is saying? … Thank goodness that she is no Joseph lol." (3) |
| https://www.reddit.com/r/ClassicBookClub/comments/v2wpz0/ (Chapter 24) | 2022-06-02 | 16 / 36 | Stevenson sings the song "in the style of a rustic ballad" (6); Newton "listening to the song was just amazing" (7) |
| https://www.reddit.com/r/ClassicBookClub/comments/uuc5vk/ (Chapter 12) | 2022-05-21 | 21 / 46 | "I am lLOVING Thandiwe Newton's narration" (6) |
| https://www.reddit.com/r/literature/comments/1cqe5ot/ "Should I read Jane Eyre?" | 2024-05-12 | 4 / 87 | "There are like 3 French lines in the whole book." (37); "Those few French lines aren't a problem." (20) |

Pattern: Newton is recommended most, Stevenson close behind, Klett for free, Lucy Scott and Popplewell have fans; the recurring listening questions are St. John's pronunciation and the French. VERIFIED (from the comments above).

### 6b. Awards

- No Jane Eyre recording appears as an Audie winner or finalist on the 31 year pages linked from audiopub.org (1996 to 2026; `scripts/je-audies.mjs`). The only hit: "Texts from Jane Eyre by Mallory Ortberg; narrated by Amy Landon and Zach Villa (Tantor Media)", 2016 finalist (Humor), a parody. VERIFIED.
- "Earphones Award Winner (AudioFile Magazine)" for Newton's recording is Audible's statement on its page (AudioFile's site search is script-rendered; not opened). Alison Larkin's 2025 listing: "Winner of an AudioFile Earphones Award" (publisher's statement). Do not carry Newton's 2023 Audie for War and Peace over to this book.

### 6c. Audible Whispersync tag

The `"eventId":"whispersync"` data tag appears on seven of the eight Audible US pages rendered (all but the BBC dramatisation). What it promises per edition: UNVERIFIED. Do not use as a differentiator.

---

## 7. HushBook facts for this book (positive framing; verified in source and on the live site)

### 7a. What Discover shows for "jane eyre"

- VERIFIED. Discover searches archive.org for two libraries, LibriVox and Internet Archive, 24 rows a page (`kIaPageSize = 24`, D:\hushbook\lib\core\store\librivox_provider.dart:17), first tier = every word in title or creator (search_query.dart:100-101, 122), sorted by all-time downloads by default (catalog_filter_queries.dart:92-93; no default language or genre filter, discover_rows.dart:66-92, store_models.dart:385-387), pages interleaved LibriVox first (store_repository.dart:553-571). Live result of the app's exact queries today (`scripts/je-discover-cards.mjs "jane eyre"`):

| # | Card title | Author line | Length · rating | Download (64 kbps MP3, app format) | Chapters | Read by line | Which recording |
|---|---|---|---|---|---|---|---|
| **1** | **Jane Eyre (version 3)** | Charlotte Brontë | **18h 36m · 5.0 (22)** | **511 MB** | **38** | Reader not listed | **Elizabeth Klett, solo** (LibriVox calls it "version 2") |
| 2 | Jane Eyre | Charlotte Brontë | 20h 37m · 4.6 (8) | 566 MB | 39 | Reader not listed | Group set, 21 readers |
| 3 | Jane Eyre (dramatic reading) | Charlotte Bronte | 19h 43m · 5.0 (2) | 542 MB | 39 | Reader not listed | Dramatic reading, 36 readers |
| 4 | Jane Eyre, die Waise von Lowood | Charlotte Brontë | no length | 624 MB | 49 | Reader not listed | German translation |
| 5 | Jane Eyre: An Autobiography | Charlotte Brontë | 25h 19m | 696 MB | 41 | Reader not listed | Dawn Sutton, solo |

- **Internet Archive tier: no result** for "jane eyre" today (numFound 0 with the app's query, internet_archive_provider.dart:198-212). The second ("expanded") tier, which a user meets by scrolling (search_query.dart:102-111; `scripts/je-discover-expanded.mjs`), shows other books whose description mentions Jane Eyre (Wuthering Heights (Solo Version), Shirley, Gaskell's Life of Charlotte Brontë, a Portuguese "Joanna Eyre", Agnes Grey) and **no upload that looks like a copy of a commercial Jane Eyre recording**.
- Card lines per store_cover_card.dart:55 ("length · rating (count)"), discover_copy.dart:16-41 (MB under 1 GB; length in whole rounded minutes) and 58-60 (rating with one decimal); download per librivox_provider.dart:454-459 (64 kbps preferred). VERIFIED (code plus live data; not observed on a device). Positions follow archive.org downloads and can change; Klett leads the group set by 4.65 million to 3.52 million.
- **"Reader not listed"** (D:\hushbook\lib\l10n\app_en.arb:7617) for all five: the 64 kbps files carry no `artist` tag (librivox_provider.dart:363-376; reader_credit.dart:31-46). So the post names Elizabeth Klett from LibriVox and tells readers to pick "Jane Eyre (version 3)", 18h 36m. **The card's "4.6 (8)" for the group set comes mostly from misfiled Klett reviews (2a).** VERIFIED.
- Safe wording: "In HushBook's Discover tab, search Jane Eyre and pick Jane Eyre (version 3), 18h 36m: that is Elizabeth Klett's LibriVox reading, 38 chapters, a 511 MB download."
- "Play a sample" (app_en.arb:8697). VERIFIED.

### 7b. Import, chapters, transcription

- VERIFIED. A Discover download becomes one book with one chapter per file (store_import_service.dart:379-405): Klett's 38 files, "01 - Chapter 01" to "38 - Chapter 38, Conclusion", so chapter numbers match the book.
- VERIFIED. Store downloads queue transcription on the phone ("Added to library. Transcription queued.", app_en.arb:771; new_book_transcription.dart:34-42).
- VERIFIED (site copy, HEAD fae94ea). Files you own: "MP3, M4A, M4B, AAC, WAV, FLAC, OGG, OPUS, OGA, AIFF, AIF, CAF, WMA, MKA, and ALAC. … Chapters inside M4B files are detected automatically" (index.html:668). Desktop: "Import MP3 and M4B files or whole folders. Covers and chapters come from the files." (desktop.html:431).

### 7c. Reading along, the French, names, speed

- VERIFIED (site copy). "Words fill in as the narrator reads them, with a red underline on the current one. Long-press any line to play from there." (index.html:1033). Never "tap any word"; "Tap a line to jump there" is an off-by-default switch (app_en.arb:8453).
- VERIFIED (site copy and source). "You can pair an EPUB, PDF or TXT with the audiobook and HushBook aligns the real book text to the audio, word by word. This ebook sync is in beta." (audiobook-with-text.html:67). App: "Unlimited e-book syncs turn a matching book into timed, word-by-word read-along text." (app_en.arb:2112); "Attach a matching, DRM-free EPUB, PDF or TXT" (2113); "Use the same unabridged edition with English narration. Sync is in beta; processing takes time and highlight timing can vary." (2114). First sync free, then Pro (D:\hushbook\lib\core\ebook\ebook_sync_allowance.dart:6, 33). **The fit for the French:** Klett's LibriVox reading and the Gutenberg #1260 EPUB are the same text, so a synced read-along shows Adèle's French as Brontë printed it, in time with the voice. Not run on a device for this book: write it as what the feature does, scoped to "a matching DRM-free e-book".
- VERIFIED. Without e-book sync the words on screen come from the on-device transcript; how speech recognition renders French lines or "St. John" is not tested: do not quote or promise any spelling.
- VERIFIED. **Character map** ("Character map", app_en.arb:879), added by hand; "First heard" "Ch. {chapter} · {time}" (app_en.arb:2160-2161); role chips incl. Family and Narrator (2219-2226); Notes and Relationships (character_detail_sheet.dart:171-228). One name field plus Notes: "add St. John Rivers once and note 'said Sinjin'"; "keep Janet and Miss Eyre in Jane's notes". Do not claim name suggestions (app_en.arb:1069 is unused at HEAD).
- VERIFIED. Speed 0.5x to 3x in 0.05x steps (playback_speed_sheet.dart:25-48). "Mark: highlight, note or quote" (app_en.arb:8753).
- VERIFIED. Offline after the one-time engine download (index.html:752-757). Platforms: iPhone, Android, Windows ("Free · Windows 10 or 11, 64-bit", desktop.html:334). Price: "The core read-along experience and the public-domain library are free. There's an optional Pro upgrade for advanced analytics" (index.html:676). "Transcribe on my PC" is Pro (index.html:1021). Privacy: "Transcription runs on-device. There is no account and no cloud upload of your audio." (llms.txt:3). App Store version not re-checked today (1.3.5 on 2026-11-12).

### 7d. Do not claim (HushBook)

1. That Discover names Elizabeth Klett (the card says "Reader not listed"), or that card positions or titles are fixed.
2. That HushBook opens Audible, Apple Books, Libby, hoopla, Spotify, Kobo or Chirp purchases. Scope to "audiobook files you own" and "DRM-free MP3 or M4B".
3. That HushBook detects characters, suggests names, translates French, or fixes pronunciation.
4. Any spelling the transcript will show for French lines or names.
5. That e-book sync is unlimited for free users or out of beta; that it was tested on this book.
6. That "Transcribe on my PC" is free, or that a Mac app exists.
7. Any phone transcription time for this book.
8. That the Audible, Apple or Kobo Elizabeth Klett listings are the LibriVox recording.

---

## 8. Competing pages: provable errors (state the right fact; do not name them)

- **thebooksinsider.com (catalogue build 2026-10-12):** "the Jane Eyre audiobook runs 18.9 hours (about 12.6 hours at 1.5× playback speed)" beside Penguin's Anna Popplewell blurb: Popplewell's recording runs 22 h 51 min; complete recordings run 17 h 21 min to 25 h 19 min. No single "the" length. VERIFIED.
- **annotatedebooks.com (2026-10-29, modified 2026-11-12):** "Adèle speaks almost exclusively in French" and French "In Chapters 11 through 15": our count finds 346 French words in the whole novel, Adèle's 291 spread over Chapters 11 to 24 (most in 13, 14 and 17); Brontë prints most of Adèle's speech in English. "12 to 14 hours" reading time is at 250 wpm, not listening time (20 h 33 min at 151 wpm). Its pages also spoil the plot. VERIFIED.
- **The New York Times Book Review quote on Newton's Audible page:** "her cruel stepbrother": John Reed is her cousin (Ch. 1 to 2). VERIFIED.
- **audiobook.co.uk:** correct as checked (runtimes match Audible UK; flags the BBC and Bloom versions and the Oxford Bookworms adaptation). Omits ratings, Lucy Scott, Emma Messenger, Nadia May / Wanda McCaddon and every free recording. VERIFIED.
- **consumerecho "10 Best Jane Eyre Audiobook - January 2025":** lists a sequel ("Death of a Gentleman: The Jane Eyre Chronicles, Book 4"), an Austen drama and a Spanish edition among "Jane Eyre" audiobooks. VERIFIED (titles only).

---

## 9. Picks, with the evidence

- **Best overall: Thandiwe Newton (Audible Studios, 2016, 19 h 10 min).** 4.8 from 22,153 Audible US ratings, 4.9 for performance (UK 4.8 from 4,363); ten times the ratings of the next edition; AudioFile Earphones Award per Audible's page; the most-recommended narrator on Reddit; the searched name ("thandie newton", two top completions). Audible and Apple only. https://www.audible.com/pd/B01COOZ5C2
- **Runner-up: Juliet Stevenson (Audible Studios, 2009, 19 h 13 min).** 4.7 / 4.8 from 2,188 US; UK 4.8 with 4.9 for performance from 1,715; a top completion; "Listen for free" on the US page today (terms unverified). Audible only. https://www.audible.com/pd/B002V5CWOY
- **Best free: Elizabeth Klett, LibriVox (2008, 18 h 36 min).** The most downloaded Jane Eyre on archive.org (4,648,589); 19 five-star reviews; "her British accent is very creditable, even to the ears of a native speaker"; first card in HushBook Discover ("Jane Eyre (version 3)", 511 MB). Reads Gutenberg #1260, so it pairs with the free e-book. https://librivox.org/jane-eyre-version-3-by-charlotte-bronte/
- **Best to borrow: Anna Popplewell (Penguin Classics, 2019, 22 h 51 min).** 4.8 / 4.9 from 219 US; Apple 4.5 from 140; LAPL 3 copies (9 holds). For a shorter wait: Wanda McCaddon (Tantor, KCLS 9 copies, 5 available) or the same narrator's Blackstone recording listed as Nadia May (NYPL 7, SFPL 4, both with holds). https://www.audible.com/pd/0241438691
- **Best classic British reading on a budget of hours: Amanda Root (Naxos, 2005, 20 h 33 min).** 4.7 / 4.8 from 279; played Miss Temple on film. https://www.audible.com/pd/B002V1NMBU
- **Best dramatisation: BBC Radio 4 (2016), Amanda Hale and Tom Burke, adapted by Rachel Joyce, 2 h 13 min.** 4.7 / 4.8 from 263 US. An adaptation, not the book. https://www.audible.com/pd/B01DE02OHO
- **Best full cast of the whole text: LibriVox dramatic reading (2012, 19 h 43 min, free; Elizabeth Barr as Jane, Algy Pug as Rochester).** Paid alternative: Spoken Realms (2019, 19 h 38 min, 4.8 from 28). https://librivox.org/jane-eyre-dramatic-reading-by-charlotte-bronte/
- **Also worth knowing:** Lucy Scott (RNIB, 4.6 from 567, includes the preface; "vintage recording" note); Emma Messenger (4.6 from 2,041; the longest main edition); Susan Ericksen (AmazonClassics, the fastest, Kindle Unlimited plan today).
- **Avoid if you want the whole book:** any 2 to 6-hour listing (BBC, Bloom and Quayle, Fielding, Hiller, Wilton, Boyd, Joanna David, L.A. Theatre Works, Oxford Bookworms), retellings, and AI-voice listings.

---

## 10. Ready-to-paste comparison table (VERIFIED rows only)

| Narrator | Runtime | Publisher | Year | Audible US rating | Where to get it |
|---|---|---|---|---|---|
| Thandiwe Newton | 19 h 10 min | Audible Studios | 2016 | 4.8 (22,153) | Audible, Apple Books |
| Juliet Stevenson | 19 h 13 min | Audible Studios | 2009 | 4.7 (2,188) | Audible |
| Emma Messenger | 21 h 47 min | Trout Lake Media | 2012 | 4.6 (2,041) | Audible, Apple Books |
| Lucy Scott | 20 h 27 min | RNIB | 2008 | 4.6 (567) | Audible, Apple Books |
| Susan Ericksen | 17 h 27 min | Brilliance (AmazonClassics) | 2017 | 4.7 (567) | Audible, Apple Books |
| Amanda Root | 20 h 33 min | Naxos AudioBooks | 2005 | 4.7 (279) | Audible, Apple Books, hoopla (Educational Edition) |
| Anna Popplewell | 22 h 51 min | Penguin Classics | 2019 | 4.8 (219) | Audible, Apple Books, Libby |
| Wanda McCaddon | 17 h 56 min | Tantor | 2008 | 4.4 (102) | Audible, Apple Books, Libby |
| Wanda McCaddon (Nadia May in Libby) | 18 h 51 min | Blackstone | 2009 | 4.5 (75) | Audible, Apple Books, Libby |
| Flo Gibson | 18 h 26 min | Recorded Books | 1999 | 4.2 (108) | Audible, Apple Books, Libby |
| Josephine Bailey | 20 h 55 min | Books on Tape | 2007 | (not on Audible) | Apple Books, Libby |
| Full cast (Amanda Friday, Rob Goll and others) | 19 h 38 min | Spoken Realms | 2019 | 4.8 (28) | Audible |
| Elizabeth Klett (LibriVox) | 18 h 36 min | LibriVox (free) | 2008 | n/a | LibriVox, Internet Archive, HushBook Discover |
| LibriVox dramatic reading (36 readers) | 19 h 43 min | LibriVox (free) | 2012 | n/a | LibriVox, Internet Archive, HushBook Discover |
| Dawn Sutton (LibriVox) | 25 h 19 min | LibriVox (free) | 2022 | n/a | LibriVox, Internet Archive, HushBook Discover |
| LibriVox group reading (21 readers) | 20 h 37 min | LibriVox (free) | 2007 | n/a | LibriVox, Internet Archive, HushBook Discover |

Abridged and dramatised, to flag: BBC Radio 4 dramatisation (Amanda Hale, Tom Burke; adapted by Rachel Joyce; 2 h 13 min); Claire Bloom and Anthony Quayle (dramatised reading, 2 h 54 min, Audible UK); Emma Fielding (Naxos, 4 h 1 min); Joanna David (6 h 6 min); Penelope Wilton (3 h 10 min); Wendy Hiller (3 h 2 min); Carole Boyd (2 h 23 min); L.A. Theatre Works (2 h); Oxford Bookworms Stage 6 (3 h 21 min, graded reader).

Year notes: Root: Audible 2004-12-26, Naxos "Released: April 2005"; Gibson: Audible 1999, OverDrive 1980; Bailey: OverDrive 2007, Apple 2011.

---

## 11. Sources (opened 2026-11-13)

Audible
- Catalogue API: https://api.audible.com/1.0/catalog/products?keywords=jane+eyre&num_results=50&response_groups=contributors,product_desc,product_attrs,rating,media,sample,series,relationships (and .co.uk, .ca, .com.au; 29 keyword sets); per-ASIN `/1.0/catalog/products/{ASIN}?response_groups=…price,product_plans…`
- Rendered pages (`?ipRedirectOverride=true&overrideBaseCountry=true`): https://www.audible.com/pd/B01COOZ5C2 (Newton) · /pd/B002V5CWOY (Stevenson) · /pd/B0096TOT4O (Messenger) · /pd/B0036NAQUC (Scott) · /pd/B073VRW59Y (Ericksen) · /pd/B002V1NMBU (Root) · /pd/0241438691 (Popplewell) · /pd/B01DE02OHO (BBC)
- API-only: B002V19RRI, B002V5IZWC (McCaddon) · B002VACE10, B002V0KR64 (Gibson) · B00KWWCT2S, B081TMXNV8 (Mills) · B017KTXCG2 (Bentinck) · B087KRNNF4, B0G319W3LX (Larkin) · B002V1JRPU (Barkman) · B018H7DEBE (Giordani) · B072XJNCRD (Johnson) · B07XPGPGK5 (Spoken Realms) · B0D3454ZLL (Thrive) · B0D2JV4PFZ (Naxos Educational) · B07FSVD5Q1 (BBC collection) · B002V0QGBE, B002VA932S (Fielding) · B004I401W6 (Bookworms) · B0032N8RNY (Wilton) · B012OKMHGI (Hiller) · B0036GPKFU (Boyd) · B01DCOASS4 (LATW) · B06XXJZSHY, B01LYWCYB2, B0C1HH1VKL (Klett re-listings) · UK: B004FP98UY (Bloom/Quayle), B01CO9WRZK, B004FTBKUQ, B004FU5TO8, B004FU0XT4, B0096TR0TK, B01DE066FA
- Sample MP3s: `https://samples.audible.com/bk/{…}_sample.mp3` (API `sample_url`)
- Audible on SoundCloud: https://soundcloud.com/audible/jane-eyre (oEmbed)

Apple Books
- https://itunes.apple.com/search?term=jane+eyre&media=audiobook&country=us&limit=200 (and 11 more terms)
- https://books.apple.com/us/audiobook/id1100423838 (Newton) · id1479199043 (Popplewell) · id306073683 (Scott) · id561321555 (Messenger) · id1263205707 (Ericksen) · id1748222642 (Root) · id1417779639 (Bailey) · id1645339020, id1645952580 (McCaddon) · id1640935106 (Gibson) · id1441222275 (BBC) · id1538441521 (Klett re-listing)

Publishers
- https://naxosaudiobooks.com/jane-eyre-unabridged/ ; booklet https://naxosaudiobooks.com/wp-content/uploads/2020/03/35712_Jane_Eyre.pdf

Libraries and other stores
- https://thunder.api.overdrive.com/v2/libraries/nypl/media?query=jane%20eyre&format=audiobook-overdrive,audiobook-mp3&perPage=100 (also lapl, kcls, sfpl, chipublib)
- https://www.hoopladigital.com/search?q=jane%20eyre&scope=everything&type=direct&kindId=8 ; https://www.hoopladigital.com/audiobook/jane-eyre-charlotte-bronte/16934339 (Naxos Educational)
- https://www.kobo.com/us/en/search?query=jane%20eyre&fcmedia=AudioBook

Free
- https://librivox.org/api/feed/audiobooks/?title=%5EJane%20Eyre&format=json&extended=1&limit=50
- https://librivox.org/jane-eyre-version-3-by-charlotte-bronte/ (Klett; catalogue title "Jane Eyre (version 2)") · https://librivox.org/jane-eyre-by-charlotte-bront/ · https://librivox.org/jane-eyre-dramatic-reading-by-charlotte-bronte · https://librivox.org/jane-eyre-an-autobiography-by-charlotte-bronte/
- https://archive.org/details/jane_eyre_ver03_0809_librivox · https://archive.org/details/jane_eyre_librivox · https://archive.org/details/janeeyre3_1212_librivox · https://archive.org/details/jane_eyre_2208_librivox ; reviews via https://archive.org/metadata/{identifier}
- https://www.gutenberg.org/ebooks/1260

Text and book facts
- https://en.wikisource.org/wiki/Jane_Eyre_(1st_edition) · https://en.wikipedia.org/wiki/Jane_Eyre · https://en.wikipedia.org/wiki/St_John_(name) · https://www.gutenberg.org/ebooks/768 · https://www.gutenberg.org/ebooks/1342

Listeners, awards
- Arctic Shift: https://arctic-shift.photon-reddit.com/api/posts/search?subreddit=…&title=jane%20eyre ; `/api/posts/ids?ids=ojuz9s,19eheal,1bs2soc` ; `/api/comments/search?link_id={id}`
- https://www.audiopub.org/2016-audies-1 (and the 30 other year pages from https://www.audiopub.org/audie-awards-winners)

Competitors
- https://www.audiobook.co.uk/recordings/jane-eyre/ · https://products.consumerecho.com/product/jane-eyre-audiobook/ · https://thebooksinsider.com/audiobook/jane-eyre/ · https://annotatedebooks.com/blog/is-jane-eyre-hard-to-read-reading-difficulty-guide/ · https://jane-eyre.guidesite.co.uk/french-translations · https://pronounce.namedrop.io/name-pronunciations-by-franchise/jane-eyre/ · https://audiobook-maker.com/free-audiobooks/en/jane-eyre/ · https://www.openearbooks.com/Jane_Eyre

HushBook
- D:\hushbook HEAD d2ed665: files and lines in section 7. D:\hushbook.app HEAD fae94ea: index.html, desktop.html, audiobook-with-text.html, llms.txt lines in section 7.

---

## 12. Do not claim

1. That Newton's Jane Eyre won an Audie (her War and Peace did; this one has Audible's "Earphones Award Winner" line only), or that AudioFile's award was checked at AudioFile.
2. That "Thandie" and "Thandiwe" Newton are different recordings, or why the name changed.
3. That Stevenson's "Listen for free" or Ericksen's Kindle Unlimited plan is a lasting offer, or which membership it means.
4. That Stevenson's recording is on Apple Books (not found in the search today) or that Newton's or Stevenson's is in Libby or hoopla.
5. That Nadia May and Wanda McCaddon are one person on biographical grounds; say "the Blackstone recording is credited to Nadia May in Libby and to Wanda McCaddon on Audible and Apple".
6. That the group LibriVox set has a 4.6 rating worth citing (misfiled reviews), or that Dawn Sutton's file numbers match the book's chapters.
7. That the commercial Klett listings are the LibriVox recording.
8. How any paid narrator says "St. John" or handles the French (no sample reaches them); that "Sinjin" is the only correct form.
9. That the BBC Radio 4 or L.A. Theatre Works version is the full novel, or that Spoken Realms or Thrive were checked by sample for completeness (pace only).
10. Any American-accented complete recording (none found described as such); Ericksen's or Gibson's nationality.
11. French figures other than ours with their method (about 350 words, 0.19%, Adèle 84%, Chapters 11 to 24), or "Adèle speaks only French".
12. Plot facts in names tables, blurbs or quotes: the Thornfield secret, Mr. Mason's purpose, the Rivers family connection, the uncle's letter, the ending, "Reader, I married him".
13. Spotify, Libro.fm, Chirp, Google Play or Scribd availability.
14. Any YouTube upload as a legal or official source; never the "Narrator-Juliet Stevenson" playlist.

## 13. What we could not verify

- Spotify listings (login), Libro.fm and Chirp (blocked in earlier runs, not retried), Google Play, Scribd/Everand, BBC Sounds.
- Google SERP, People Also Ask, AI Overview; readinglength, audiobooksoul, readingvine, hubpages and Cambridge Dictionary pages (bot checks).
- AudioFile's own pages for Newton's and Larkin's Earphones Awards.
- How each paid narrator pronounces "St. John", sings Rochester's song, or reads Adèle's French (samples stop in Chapter 1; listener reports cover Stevenson's and Newton's song only).
- Whether Spoken Realms and Thrive full-cast readings are verbatim (pace only), and whether Flo Gibson's two listings are one recording.
- Whether the paid Klett listings are her LibriVox recording; why Dawn Sutton's files are numbered past Chapter 38.
- Nationalities and accents of Ericksen, Gibson, Barkman, Bailey and McCaddon.
- Which modern print editions restart chapter numbers in each volume.
- HushBook e-book sync and transcript behaviour on this book (not run on a device).
