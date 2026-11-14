# Images: best-brothers-karamazov-audiobook

Made 2026-11-14 with the method and look of the Jane Eyre set (`../2026-11-13-best-jane-eyre-audiobook/notes-images.md`): same renderer, tokens (ink #0B0A09, paper #F6EFE4, paper-dim #CABFB0, coral #E8613F, de-emphasis gray #655E57), fonts (Newsreader, Inter from `tools/mockups/assets/fonts`) and phone composition. Nothing stock or AI-generated: four HTML figures rendered with the repo's Playwright and one composition of real app renders. All browser work headless, Chrome with `chromiumSandbox: true` (bundled Chromium as fallback; not needed). WebP quality 84, deviceScaleFactor 2. Every name and number comes from `research-platforms.md` in this folder (section cited per value below); the only numbers not printed in it are the words per book on the Grand Inquisitor bar, which are lines of the same `bk-wordcount.py` run that section 4 quotes (re-run today, identical output; see image 4). The dataviz skill was loaded before the figures; its palette validator was run (results under "Validator").

## Files

| File | Pixels | Size | Made from |
|---|---|---|---|
| `assets/img/blog/brothers-karamazov-picks.webp` | 1400x788 | 81 KB (82,962 bytes) | `scripts/images/picks-card.html` with the player render, 2x |
| `assets/img/blog/brothers-karamazov-picks-og.webp` | 1200x630 | 57 KB (58,822 bytes) | `node tools/blog/og-card.mjs assets/img/blog/brothers-karamazov-picks.webp` |
| `assets/img/blog/brothers-karamazov-editions.webp` | 1400x1862 | 177 KB (181,084 bytes) | `scripts/images/editions-figure.html`, 2x |
| `assets/img/blog/brothers-karamazov-length.webp` | 1400x1426 | 112 KB (114,576 bytes) | `scripts/images/length-tiles.html`, 2x |
| `assets/img/blog/brothers-karamazov-grand-inquisitor.webp` | 1400x1852 | 123 KB (126,054 bytes) | `scripts/images/grand-inquisitor-tiles.html`, 2x |
| `assets/img/blog/brothers-karamazov-read-along.webp` | 1400x900 | 65 KB (66,766 bytes) | two renders from temporary mockup scenes, composed with PIL |
| `content/blog/embeds/brothers-karamazov-picks.html` | | | the hero embed (registry `hero: 'brothers-karamazov-picks'`), the markup of `jane-eyre-picks.html` with only `src` and `alt` changed (checked by diff) |

Re-render a figure: `node scripts/images/render-html.mjs <figure.html> <out.webp> 700 auto` (picks card: `700 394`). The renderer reports font loading, overflow, text under 15 px and a per-figure fit check; `node scripts/images/check-values.mjs <figure.html>` prints the values a page computes; `node scripts/images/slack.mjs editions-figure.html` prints each bar's spare room. Results:

- Picks card: the only overflow flag is the phone running past the bottom edge, as intended; all text 15 px CSS or larger; heading, name lines and details lines all end inside the right column. Computed: 43 h 6 min, 37 h 4 min, 39 h 38 min, 42 h 16 min.
- Editions: no overflow, all text 15 px or larger, every label fits inside its bar with its padding, every value label ends at least 12 px before its row's rating (tightest: Tony Addison, 16.5 px to "none"; tightest bar: Constantine Gregory, 7.4 px spare after "Naxos AudioBooks" and "Most rated"). 12 rows; longest 46.41 h.
- Length: no overflow, all text 15 px or larger, every tile value fits, the segment names do not touch. Computed: 349,788 words (parts add up), 96 chapters (parts add up), 38 h 36 min; 9 to 62 minutes; parts 7 h 40 min, 8 h 30 min, 9 h 12 min, 12 h 12 min, 1 h 2 min, which add to 2,316 min = 38 h 36 min.
- Grand Inquisitor: no overflow, all text 15 px or larger, every value fits, book names and axis labels apart, the callout inside the tile. Computed: chapter 36 of 96, 62 min, 30.8%, 11 h 54 min, 12 h 14 min, Book V 3 h 37 min, Book VI 2 h 24 min, 38 h 36 min; Book V starts at word 91,984, the chapter 15,796 words into it; the chapter's strip is 15.1 px CSS wide.

Every image was viewed at full size and at the blog's 760 px display width (`preview760.py`). Fixes made on viewing:

- Editions: on the first render (plot 530 px) "Most rated" sat 1.5 px past its minimum gap after "Naxos AudioBooks" and read as one run of text; the plot is now 538 px (7.4 px spare). 545 px was tried and pushed Tony Addison's value to 10 px from "none", under the 12 px rule.
- Length: the equal tile grid let "349,788 words" push the first tile wider than the other two; the grid is now explicit (1.15 : 1 : 1). The parts list was a CSS grid whose row rules broke at every column gap; it is a table with full-width rules now.
- Length, editions: the sources line broke between "November" and "14"; a non-breaking space keeps the date together.
- Grand Inquisitor: tile 1 read "chapters: Book / V, Chapter 5"; now the value says "36 of 96 chapters" and the label "Book V, Chapter 5" (non-breaking spaces). The minutes tile says "listening time at 1x, at 151 words a minute", as the length figure does. The 30.8% tile's time stays on one line.

Decisions made before rendering (from measured text widths, `measure.mjs`): the picks heading's first line "Brothers Karamazov audiobooks:" is 362 px wide at 26 px, wider than the Jane Eyre card's 348 px column, so the column is 384 px (starts at 290 px; phone at 36 px, 460 px tall); the details line now carries "publisher · translation", and the runtime moved to the right end of the name line, so each row keeps three lines and the card stays 394 px tall. In the editions chart a translation column or an in-bar translation would not fit beside 34 to 46-hour bars at 700 px (Gregory's bar alone needs 387 px for its label and tag), so each group has the translation as a sub-heading, as the Crime and Punishment figure grouped by translation.

## 1. Picks card (lead image, the post's `hero`)

- Method: `picks-card.html`. Left: the player render from the temp scene of image 5 (`en-_tmp-bk-player.png`, copied next to the HTML as `phone-player.png` for the render, then deleted). Right: heading "Brothers Karamazov audiobooks: our picks" (line break after the colon), four rows: coral label; name in Newsreader 22 px with the runtime at the right; publisher and translation in Inter 15 px. Coral only on the labels.
- Data (labels as fixed by the orchestrator; names, publishers and runtimes from the research):

| Label | Name | Details on the card | Runtime | Source (research-platforms.md) |
|---|---|---|---|---|
| Best overall | Luke Thompson | Penguin Classics · McDuff translation | 43 h 6 min | section 9; 1a row 1: 43 hrs 6 mins (2,586), translation by credit and sample (1c) |
| Most rated | Constantine Gregory | Naxos AudioBooks · Garnett translation | 37 h 4 min | section 9; 1a row 3: 37 hrs 4 mins (2,224); credit, sample 79.4% |
| Best free | Bruce Pirie | LibriVox · Garnett translation | 39 h 38 min | section 9; 2a Version 3: 39:37:50; all LibriVox sets read Garnett (2a) |
| Best to borrow | Ben Miles | Macmillan Audio · Pevear and Volokhonsky translation | 42 h 16 min | section 9; 1a row 2: 42 hrs 16 mins (2,536); publisher "Macmillan Audio" (1a, section 10) |

- The brief said "Macmillan"; the research names the publisher "Macmillan Audio", which the card uses.
- The phone shows the recording the free pick names, as Discover titles it: "The Brothers Karamazov (version 3)", Fyodor Dostoyevsky (details under image 5). No reader name on the phone: Discover's card says "Reader not listed" (7a), and the player shows only title and author.
- Share card: `og-card.mjs` scales the card into 1200x630 and fills the sides from its edge pixels; nothing cropped (viewed).

## 2. Editions figure

- Method: `editions-figure.html`, the Jane Eyre bar chart with new data and one change: inside each group ("Sold by stores", "Free on LibriVox") the recordings sit under a "Translated by ..." sub-heading, each block sorted shortest first. Bars from zero on a 0 to 50 h axis (538 px), ticks every 10 h, hairline to 50 h, value at each tip, no gridlines. Right-hand column: the rating with its number of ratings, headed "Audible US rating" and "archive.org rating". The four picks are coral with ink text and carry their pick label inside the bar (the second, non-colour cue); the rest are gray `#655E57` with paper text.
- Rows: the twelve rows of the ready-to-paste table (section 10), values from table 1a, section 2a and the Discover cards in 7a. Store runtimes are Audible's; LibriVox runtimes are LibriVox's own, rounded to the minute. Translations: 1a's translation column (store credit, publisher text and the sample match in 1c) and 2a for LibriVox.

| Group | Translation | Bar label | Runtime | Rating | Source |
|---|---|---|---|---|---|
| Sold by stores | Constance Garnett | James Anderson Foster · Brilliance | 34 h 18 min | 4.6 (110) | 1a row 8 (Brilliance Audio, AmazonClassics; credit, sample 91.9%); section 10 "Brilliance (AmazonClassics)" |
| | | Alastair Cameron · A.R.N. Publications | 34 h 24 min | 4.4 (153) | 1a row 7 (credit, sample 87.0%) |
| | | Frederick Davidson · Blackstone | 34 h 52 min | 4.3 (1,437) | 1a row 4 (sample 81.7%, OverDrive credit); Audible runtime (hoopla prints 33h 18m) |
| | | Walter Covell · Jimcin Recordings | 37 h 1 min | 4.0 (346) | 1a row 6 (credit, sample 78.9%) |
| | | Constantine Gregory · Naxos AudioBooks, "Most rated" | 37 h 4 min | 4.6 (5,910) | 1a row 3 |
| | | David Rintoul · SNR Audio | 37 h 19 min | 4.8 (25) | 1a row 9 (credit, sample 86.4%) |
| | David Magarshack | Gabriel Woolf · RNIB | 37 h 50 min | 4.1 (228) | 1a row 5 (credit; sample 1.5% Garnett) |
| | Richard Pevear and Larissa Volokhonsky | Ben Miles · Macmillan Audio, "Best to borrow" | 42 h 16 min | 4.8 (484) | 1a row 2 (credit, sample) |
| | David McDuff | Luke Thompson · Penguin Classics, "Best overall" | 43 h 6 min | 4.7 (858) | 1a row 1 (credit, sample) |
| Free on LibriVox | Constance Garnett | 27 readers · group reading | 37 h 55 min | 5.0 (6) | 2a Version 1: 37:55:17, 27 readers, 6 entries; 7a card "5 (6)" |
| | | Bruce Pirie · solo, "Best free" | 39 h 38 min | 5.0 (2) | 2a Version 3: 39:37:50, 2 reviews; 7a card "5 (2)" |
| | | Tony Addison · solo | 46 h 25 min | none | 2a Version 2: 46:24:44, no reviews |

- Short labels to fit the bars: "Brilliance" for Brilliance Audio's AmazonClassics edition (as in the Jane Eyre and Wuthering Heights figures); "solo" and "group reading" for the LibriVox sets instead of version numbers, as yesterday.
- The group reading's "(6)" is archive.org's count as archive.org and Discover show it: five five-star reviews and one zero-star note ("Translated by... Constance Garnett"); knarf111's review is posted word for word on both Version 1 and Version 3 (2a).
- Left out, as in section 10: the smaller and newer listings (Bruce Peery/Hexagon, Lister, Garraway, Smith, the Apple-only 1e listings), the abridged, dramatised and partial versions (1b), collections, and the Spanish LibriVox set. The figure states no total count beyond its twelve bars.
- Sources line: "Translations from store and LibriVox credits and from Audible samples matched to Project Gutenberg #28054. Runtimes as listed by Audible and LibriVox. Ratings from Audible US and archive.org, read November 14, 2026".

## 3. Length tiles

- Method: `length-tiles.html`, the Jane Eyre tiles reworked: three tiles (words, chapters, 1x time) and a wide tile with a segmented bar of the four parts and the epilogue, each segment named directly below, over a five-row table (part, books, chapters, time at 1x, words). The segments share one neutral fill (`#9A9086`) with 2 px gaps: with five parts named under the bar and in the table, colour carries no identity, and coral stays on the tile dashes. The page computes every time from the word counts at 151 wpm and rounds to the minute.

| On the image | Value | Source (research-platforms.md) |
|---|---|---|
| Words | 349,788 words, "in Constance Garnett's translation" | section 4: "349,788 without heading lines ... (the figure to publish)", Gutenberg #28054, SHA-256 2e75c187...d22fe (the research's download, hash checked today) |
| Chapters | 96 chapters, "9 to 62 minutes each at 1x" | section 4: shortest Book I Ch. 2, 1,297 words (8.6 min); section 3: longest the Grand Inquisitor, 9,287 words (61.5 min) |
| 1x time | 38 h 36 min, "listening time at 1x, at 151 words a minute" | section 4: 1x 38 h 36 min |
| Part I | Books I to III, 24 chapters, 7 h 40 min, 69,503 words | section 4 |
| Part II | Books IV to VI, 17 chapters, 8 h 30 min, 77,054 words | section 4 |
| Part III | Books VII to IX, 21 chapters, 9 h 12 min, 83,306 words | section 4 |
| Part IV | Books X to XII, 31 chapters, 12 h 12 min, 110,575 words | section 4 |
| Epilogue | 3 chapters, 1 h 2 min, 9,350 words | section 4 |

- Chapters per part are computed from section 4's chapters per book (5, 8, 11 | 7, 7, 3 | 4, 8, 9 | 7, 10, 14 | 3). Parts add up to 349,788 words and 96 chapters; their rounded times to 38 h 36 min.
- Sources line: "Our count of Project Gutenberg eBook #28054, Constance Garnett's translation, November 14, 2026. 151 words a minute is the median pace of ten LibriVox readers in our audiobook length study" (as yesterday; `content/blog/how-long-is-an-audiobook.md`).

## 4. Grand Inquisitor tiles

- Method: `grand-inquisitor-tiles.html`, the tiles and meter of the Jane Eyre French figure and the segmented bar of the length figure. Row 1: chapter 36 of 96 (Book V, Chapter 5), 9,287 words ("the longest chapter in the novel"), 62 min at 1x. Row 2: 30.8% with a coral meter ("of the way in: it starts 11 h 54 min into the book at 1x") and 12 h 14 min ("where it starts in Bruce Pirie's free LibriVox recording"). Wide tile: the twelve books and the epilogue as one bar by listening time at 1x (widths by words, at a fixed pace the same thing), Book V coral with the chapter as a paper strip inside it, Book VI the lighter gray `#9A9086`, the rest gray `#655E57`; a stem and the direct label "The Grand Inquisitor starts 11 h 54 min in" above the strip; book numerals under each segment (V and VI in paper semibold, the rest muted); an hour axis (0, 10 h, 20 h, 30 h, 38 h 36 min); and a legend naming Book V "Pro and Contra" and "Next: Book VI" "The Russian Monk" with time, chapters and words. Non-colour cues: the direct label, the bold numerals and the named legend.

| On the image | Value | Source (research-platforms.md) |
|---|---|---|
| Chapter | 36 of 96 chapters, Book V, Chapter 5 | section 3: "the 36th of 96 chapters"; computed in the page from chapters per book (31 in Books I to IV, + 5) |
| Words | 9,287, the longest chapter in the novel | section 3 |
| Minutes | 62 min at 1x | section 3: "about 62 minutes at 151 wpm"; computed 9,287 / 151 = 61.5 |
| How far in | 30.8%, 11 h 54 min | section 3: starts after 107,780 of 349,788 words, 30.8%, 11 h 54 min at 151 wpm; computed 30.81%, 713.8 min |
| In the free recording | 12 h 14 min | section 2b: Version 3, file 36 "05.05 The Grand Inquisitor", starts 12:13:52 (also re-derived today from the archive.org file lengths with `ia_files.py`: 12:13:52, 30.9%, file length 59:15) |
| Book V | "Pro and Contra", 7 chapters, 3 h 37 min, 32,812 words | section 3 ("Book V as a whole") |
| Book VI | "The Russian Monk", 3 chapters, 2 h 24 min, 21,761 words | section 3 |
| Total | 38 h 36 min, 96 chapters, 349,788 words | section 4 |
| Bar widths | Books I to XII and Epilogue: 12,365; 26,255; 30,883; 22,481; 32,812; 21,761; 17,460; 36,048; 29,798; 21,358; 43,377; 45,840; 9,350 words | `scripts/bk-wordcount.py` (the research's script, section 4's source) on the research's #28054 download, re-run today: output identical to the research's run apart from the C&P comparison (not requested). Section 4 prints the part sums, section 3 Books V and VI, section 4 Book XII; the per-book lines are the same run's. They add to 349,788 |

- No spoilers: books by number only; the only titles printed are Book V's, Book VI's and the chapter's own. No chapter titles from Books VII to XII or the Epilogue, nothing about events.
- Sources line: "Our count of Project Gutenberg eBook #28054, Constance Garnett's translation, November 14, 2026; start time in the recording from archive.org's file lengths. 151 words a minute is the median pace of ten LibriVox readers in our audiobook length study".

## 5. Read-along image

- The recording: LibriVox Version 3, Bruce Pirie solo, archive.org item `brothers_karamazov_v3_2002_librivox` (metadata read today with `ia_meta.py` and `ia_files.py`: `title` "The Brothers Karamazov (version 3)", `creator` "Fyodor Dostoyevsky", licence `http://creativecommons.org/publicdomain/mark/1.0/`, runtime 39:37:50, 96 files in 64 kbps MP3). It is the second Discover card for "brothers karamazov" (research 7a; positions follow downloads and can change).
- Left phone: a copy of `player-cover` as `tools/mockups/scenes/_tmp-bk-player/`, one BOOKS entry `bk-librivox` (`local: true`, cover from the temp folder's own `assets/`) plus the one-line change that loads a local cover. Vars: elapsed 10, length 579, chapter 1, chapters 96. Shows the cover, "The Brothers Karamazov (version 3)", "Fyodor Dostoyevsky", "10 min left in chapter", 00:10 and −09:29; the Chapters pill ("1 of 96") is in the render but below the crop of both compositions.
  - Title and author are the item's `title` and `creator`, which Discover imports unchanged (7a shows the same card title and author line).
  - Cover: the app downloads `https://archive.org/services/img/brothers_karamazov_v3_2002_librivox`, which served the item tile `__ia_thumb.jpg` (180x180, 14,882 bytes, MD5 d2dd56d7... as in the metadata). The render uses the item's JPEG original `brothers_karamazov_3.jpg` (300x300, 77,301 bytes, MD5 604edeaa... as in the metadata, SHA-256 9ebcec79...8852), the same artwork at a higher resolution (mean pixel difference 2.0 to 3.5 of 255 per channel at 180 px, `cover_diff.py`). It shows "Fyodor DOSTOYEVSKY", "BROTHERS Karamazov", "VERSION III" and "LibriVox"; no reader name.
  - Chapter 1 of 96 and length 579: the first 64 kbps file is `brotherskaramazov3_01_dostoyevsky_64kb.mp3`, title "01 - 01.01 Fyodor Pavlovitch Karamazov", length 09:38, 4,634,395 bytes (579.3 s at 64 kbps).
  - Low contrast, as in the app: this cover is pale, so the blurred backdrop is light and the player's cream author and time lines ("Fyodor Dostoyevsky", "10 min left in chapter") almost vanish. That is the app's own look (`lyrics_backdrop.dart`: blurred cover over #22252C with a bottom fade; `FolioTokens.cover()`: fixed cream ink), not a render fault, so the render is left as it is. Worth a look by the owner for light covers.
- Right phone: a copy of `ios-read-along` as `tools/mockups/scenes/_tmp-bk-read-along/`, shot at t = 9, `theme: 'warm'` (Warm Paper). Changes in the copy only (full diff: `scripts/images/temp-scenes.patch`, against the shipped scenes; it carries over the War and Peace, Wuthering Heights and Jane Eyre additions: chapter-block title, running-head fit rule, `\p{L}\p{N}` word lengths, `TITLE_ABBR`):
  - `CHAPTER`: the first paragraph of Book I, Chapter I of Gutenberg #28054 (219 words; `gut_js.py`, the research's download, SHA-256 2e75c187...d22fe as in section 4), set as a transcript reads: no quotation marks, dashes as commas. "this “landowner”—for so we used to call him, although he hardly spent a day of his life on his own estate—was" becomes "this landowner, for so we used to call him, although he hardly spent a day of his life on his own estate, was"; "not stupidity—the majority of these fantastical fellows are shrewd and intelligent enough—but" takes commas the same way.
  - `CHAPTER_TITLE = '01 - 01.01 Fyodor Pavlovitch Karamazov'`, the file title, which the app shows unchanged (research 7b). The block reads "CHAPTER I" over the title on two lines; the running head "I · 01 - 01.01 FYODOR PAVLOVITCH KARAMAZOV" takes the two-line form.
  - `CHAPTER_LEN` 579, `COVER_AVERAGE` `#D7CAB4` (16 px wide decode of the services/img tile the app downloads, `cover_avg.py`; `#D8CAB4` from the 300 px original), `BREATHS` `['Alexey Fyodorovitch Karamazov was the third son', 'still remembered among us']`.
  - The drop cap is the first character, "A" of "Alexey".
  - At t = 9 the current word is "remembered", underlined at 55.8% of the phone's height, page 1 of 4, with "and still" tinted (`probe-read-along.mjs`). t = 12 was not used: its current word is "death,".
- Shots (`shots.json` in each temp scene):
  - `{ "id": "_tmp-bk-player", "t": 0, "crop": "phone", "out": "_tmp-bk-player", "vars": { "cover": "bk-librivox", "elapsed": 10, "length": 579, "chapter": 1, "chapters": 96 } }`
  - `{ "id": "_tmp-bk-ra-warm", "t": 9, "crop": "phone", "out": "_tmp-bk-ra-warm", "vars": { "theme": "warm" } }`
- Rendered with `node tools/mockups/render.mjs --shot _tmp-bk-ra-warm,_tmp-bk-player --png` (only these two shots).
- Composed with `compose_phones.py` from the two PNGs: 1400x900 ink canvas, coral glows, drop shadows, left phone 1000 px tall at (175, 130), right phone 1060 px tall at (715, 50), the same placement as before.
- Simplification, as before: the page starts at the novel's first words. The LibriVox file opens with its spoken notice and the headings; the first sentence starts at 26.68 s (research 2c), so the player's 00:10 and the page's "remembered" are two separate moments.
- Spoilers: the page is the opening of Book I, Chapter 1; its first sentence says the father's death happened thirteen years before, which the research marks as not a spoiler (section 4, "First sentence"). The player shows only the cover, title and chapter 1.

## Validator (dataviz `scripts/validate_palette.js`)

| Figure | Run | Result |
|---|---|---|
| Editions | `"#E8613F,#655E57" --mode dark --surface "#0B0A09"` | lightness band PASS; chroma floor FAIL for `#655E57` (0.014), the intended de-emphasis gray, as in the approved figures; CVD PASS (protan ΔE 11.7, tritan 27.3); normal-vision PASS (ΔE 23.7); contrast PASS |
| Length | `"#9A9086" --mode dark --surface "#12110F"` (the tile surface) | one neutral, no pairs; lightness and contrast PASS; chroma floor FAIL (a neutral by design: the segments are named, not colour-coded) |
| Grand Inquisitor | `"#655E57,#E8613F,#9A9086"` and `"#9A9086,#655E57"`, `--mode dark --surface "#12110F"` (Book IV / V / VI / VII in bar order) | lightness band PASS; chroma floor FAIL for both grays (single-accent site, by design); CVD PASS (worst coral / `#9A9086` deutan ΔE 9.6; grays ΔE 17.2); normal-vision PASS (worst ΔE 15.9); contrast WARN for `#655E57` at 2.96:1, relieved by the numeral under every segment and the legend |
| Grand Inquisitor strip | `"#E8613F,#F6EFE4"` | paper is the strip inside coral, not a series: lightness and chroma "FAIL" as expected for paper; CVD PASS (ΔE 29.9), normal-vision PASS (ΔE 33.9), contrast PASS |

The picks card has no data colours (coral is the label text, as on every picks card).

## Cleanup

Deleted after composing: `tools/mockups/scenes/_tmp-bk-player/` (with its `assets/brothers_karamazov_3.jpg`), `tools/mockups/scenes/_tmp-bk-read-along/`, `assets/img/mockups/_tmp-bk-player.webp`, `assets/img/mockups/_tmp-bk-ra-warm.webp`, `tools/mockups/out/en-_tmp-bk-player.png`, `tools/mockups/out/en-_tmp-bk-ra-warm.png` and `scripts/images/phone-player.png`. No tracked file under `tools/mockups/` or `assets/img/mockups/` changed: `git status --short` shows only the six new images, the embed and this draft folder, plus `docs/seo/keyword-research-2026-11-14.md`, which predates this run.

Downloads, each in its own new folder under the session scratchpad `images/`: `dl-ia-meta/meta.json` (archive.org metadata), `dl-cover/brothers_karamazov_3.jpg`, `dl-cover-tile/services-img.jpg`. The text is the research's own download (`book/dl-gutenberg-28054/pg28054.txt`, hash checked), read only. Python ran with `-I` with paths as arguments; scripts stayed in their own folders; requests carried a generic browser User-Agent.

## Scripts (`scripts/images/`)

- `render-html.mjs`: repo `playwright` and `sharp` via `createRequire('D:/hushbook.app/package.json')`, headless Chrome, sandbox on, deviceScaleFactor 2, WebP 84, with the overflow, font, 15 px and fit checks (unchanged).
- `picks-card.html`, `editions-figure.html`, `length-tiles.html`, `grand-inquisitor-tiles.html`: the four HTML images (no Google tag in them; `npm run build:blog` runs `inject-gtag.js`, which may add one to these drafts later).
- `check-values.mjs` (each figure's computed values), `slack.mjs` (new: each editions bar's spare room and value-to-rating gap), `measure.mjs` (new: text widths in the mockup fonts, used to plan the picks column and the editions layout).
- `compose_phones.py` (PIL composition), `probe-read-along.mjs` (current word and its height per t), `ia_meta.py` (title, cover and chapter files from archive.org metadata), `ia_files.py` (new: chosen files' size, length and MD5, and a track's start time from the file lengths), `gut_js.py` (Book I, Chapter I of Gutenberg #28054 as a transcript-style JS array; heading search changed for this file), `cover_avg.py`, `cover_diff.py` (new: tile against original), `preview760.py`.
- `temp-scenes.patch`: the two temp scenes as a diff against `player-cover` and `ios-read-along`. To recreate: in a folder holding only copies of the two shipped scenes named `_tmp-bk-player` and `_tmp-bk-read-along`, run `patch -p0 < temp-scenes.patch` (checked today: it reproduces both files byte for byte; with the shipped folders present, patch edits those instead); put `brothers_karamazov_3.jpg` in `_tmp-bk-player/assets/`, write the two `shots.json` files above, move the folders into `tools/mockups/scenes/`, render, compose, then delete the temp scenes and the runner's `_tmp-bk-*` outputs. `edit_ra.py` is the one-off that swapped the Jane Eyre data for this book's in the read-along copy (kept for the record; the patch is the source).

## Alt text

- **picks** (in the embed, 248 characters): "Brothers Karamazov audiobook picks: best overall Luke Thompson (McDuff), 43 h 6 min; most rated Constantine Gregory (Garnett), 37 h 4 min; best free Bruce Pirie, LibriVox, 39 h 38 min; best to borrow Ben Miles (Pevear and Volokhonsky), 42 h 16 min."
- **editions** (246): "Bar chart of 12 complete Brothers Karamazov recordings by translation and running time: 9 on sale, 34 h 18 min to 43 h 6 min, 6 in Garnett's translation and 3 in others; 3 free on LibriVox, all Garnett, 37 h 55 min to 46 h 25 min. Picks in coral."
- **length** (235): "Stat tiles for The Brothers Karamazov in Garnett's translation: 349,788 words, 96 chapters of 9 to 62 minutes, 38 h 36 min at 1x at 151 words a minute. Parts I to IV: 7 h 40 min, 8 h 30 min, 9 h 12 min, 12 h 12 min; Epilogue 1 h 2 min."
- **grand-inquisitor** (244): "The Grand Inquisitor, Book V, Chapter 5: chapter 36 of 96, 9,287 words, the longest, 62 min at 1x. It starts 30.8% in, 11 h 54 min at 1x, 12 h 14 min into Bruce Pirie's LibriVox recording. Below, the 12 books and the epilogue by listening time."
- **read-along** (241): "Two HushBook screens for Bruce Pirie's free LibriVox recording, The Brothers Karamazov (version 3): the player 10 seconds into the first chapter, and its read-along page in warm paper, with "and still" tinted red and "remembered" underlined."

## Check against the draft (post.md as of 11:47)

The four body-image alts in post.md (lines 9, 126, 176, 366) match their images, with one wording point:

- **Grand Inquisitor alt (line 176)** ends "over a bar of the 12 books"; the bar has the 12 books and the epilogue (13 segments). Suggest "over a bar of the 12 books and the epilogue", or the alt above.

Points to know, none of them errors:

- **LibriVox ratings.** post.md's table (line 63) says "Free" in the rating column; the figure gives archive.org ratings: 5.0 (6) for the group reading, 5.0 (2) for Pirie, "none" for Addison. post.md line 247 says five of the group's six entries are five-star reviews, which matches the "(6)".
- **Rows.** post.md's table also lists Garraway and Lister (lines 59 and 60), which are not in section 10's ready table and so not on the figure (the figure shows the twelve section 10 rows, as briefed).
- **Publisher labels.** The figure says "Brilliance" where post.md's table says "Brilliance Audio (AmazonClassics)", as in the earlier posts.
