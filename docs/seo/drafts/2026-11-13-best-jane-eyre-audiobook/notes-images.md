# Images: best-jane-eyre-audiobook

Made 2026-11-13 with the method and look of the Wuthering Heights set (`../2026-11-12-best-wuthering-heights-audiobook/notes-images.md`): same renderer, tokens (ink #0B0A09, paper #F6EFE4, paper-dim #CABFB0, coral #E8613F, de-emphasis gray #655E57), fonts (Newsreader, Inter from `tools/mockups/assets/fonts`) and phone composition. Nothing stock or AI-generated: four HTML figures rendered with the repo's Playwright and one composition of real app renders. All browser work headless, Chrome with `chromiumSandbox: true` (bundled Chromium as fallback; not needed). WebP quality 84. Every name and number comes from `research-platforms.md` in this folder (section cited per value below). The dataviz skill was loaded before the figures; its palette validator was run (results under "Validator").

## Files

| File | Pixels | Size | Made from |
|---|---|---|---|
| `assets/img/blog/jane-eyre-picks.webp` | 1400x788 | 67 KB (68,498 bytes) | `scripts/images/picks-card.html` with the player render, 2x |
| `assets/img/blog/jane-eyre-picks-og.webp` | 1200x630 | 46 KB (47,472 bytes) | `node tools/blog/og-card.mjs assets/img/blog/jane-eyre-picks.webp` |
| `assets/img/blog/jane-eyre-editions.webp` | 1400x1688 | 160 KB (163,652 bytes) | `scripts/images/editions-figure.html`, 2x |
| `assets/img/blog/jane-eyre-length.webp` | 1400x1164 | 85 KB (87,444 bytes) | `scripts/images/length-tiles.html`, 2x |
| `assets/img/blog/jane-eyre-french.webp` | 1400x1590 | 95 KB (96,782 bytes) | `scripts/images/french-tiles.html`, 2x |
| `assets/img/blog/jane-eyre-read-along.webp` | 1400x900 | 60 KB (61,504 bytes) | two renders from temporary mockup scenes, composed with PIL (re-rendered after review, see image 5) |
| `content/blog/embeds/jane-eyre-picks.html` | | | the hero embed (registry `hero: 'jane-eyre-picks'`), the markup of `wuthering-heights-picks.html` with only `src` and `alt` changed |

Re-render a figure: `node scripts/images/render-html.mjs <figure.html> <out.webp> 700 auto` (picks card: `700 394`). The renderer reports font loading, overflow, text under 15 px and a per-figure fit check; `node scripts/images/check-values.mjs <figure.html>` prints the values a page computes. Results:

- Picks card: the only overflow flag is the phone running past the bottom edge, as intended; all text 15 px CSS or larger.
- Editions: no overflow, all text 15 px or larger, every label fits inside its bar with its padding, every value label ends at least 12 px before its row's rating.
- Length: no overflow, all text 15 px or larger, every value fits its tile or legend column. Computed: 20 h 33 min; 6 h 41 min, 6 h 35 min, 7 h 17 min; 12 to 74 minutes.
- French: no overflow, all text 15 px or larger, every value fits its tile and every chapter label and cap value its slot; the chapter counts add to 346. Computed: 0.19%, 2.3 min, 84%. Closest chapter labels 8.6 px CSS apart (17 px in the file).

Every image was viewed at full size and at the blog's 760 px display width (`preview760.py`). Fixes made on viewing: the picks heading broke as "Jane Eyre / audiobooks: our picks" under `text-wrap: balance`, now "Jane Eyre audiobooks: / our picks"; the editions axis hairline ended 5 px short of the longest bar, now runs to 26 h; the French chart's chapter labels sat 7.3 px apart, now 8.6 px (merged slots sized to their labels, chart tile padding 10 px).

## 1. Picks card (lead image, the post's `hero`)

- Method: `picks-card.html`, the Wuthering Heights card with new data. Left: the player render from the temp scene of image 5 (`en-_tmp-je-player.png`, copied next to the HTML as `phone-player.png` for the render, then deleted), 470 px tall at (44, 30) CSS. Right: heading "Jane Eyre audiobooks: our picks" (line break after the colon), four rows (coral label, name in Newsreader 22 px, details in Inter 15 px). Coral only on the labels.
- Data (research-platforms.md section 9, table 1a, section 2a):

| Label | Name | Details on the card | Source |
|---|---|---|---|
| Best overall | Thandiwe Newton | Audible Studios · 19 h 10 min | section 9; 1a row 1: 19 hrs 10 mins (1,150 min) |
| Runner-up | Juliet Stevenson | Audible Studios · 19 h 13 min | section 9; 1a row 2: 19 hrs 13 mins (1,153) |
| Best free | Elizabeth Klett | LibriVox · 18 h 36 min | section 9; 2a: 18:36:29 |
| Best to borrow | Anna Popplewell | Penguin Classics · 22 h 51 min | section 9; 1a row 7: 22 hrs 51 mins (1,371) |

- The phone shows the recording the free pick names: "Jane Eyre (version 3)", Charlotte Brontë (details under image 5).
- Share card: `og-card.mjs` scales the card into 1200x630 and fills the sides from its edge pixels; nothing cropped.

## 2. Editions figure

- Method: `editions-figure.html`, the Wuthering Heights bar chart with new data: groups "Sold by stores" and "Free on LibriVox", each sorted shortest first. Bars from zero on a 0 to 25 h axis (480 px), ticks every 5 h, hairline to 26 h, value at each tip, no gridlines; side padding 30 px (36 before) so the 22,153 rating fits beside the longest labels. A right-hand column gives the rating with its number of ratings, headed "Audible US rating" and "archive.org rating". The four picks are coral with ink text and carry their pick label inside the bar (the second, non-colour cue); the rest are gray `#655E57` with paper text.
- Rows: the sixteen rows of the ready-to-paste table (section 10), values from table 1a, section 2a and the Discover cards in 7a. Store runtimes are Audible's except Josephine Bailey (not on Audible: OverDrive); LibriVox runtimes are LibriVox's own, rounded to the minute.

| Group | Bar label | Runtime | Rating | Source |
|---|---|---|---|---|
| Sold by stores | Susan Ericksen · Brilliance | 17 h 27 min | 4.7 (567) | 1a row 5 (AmazonClassics Edition); section 10 "Brilliance (AmazonClassics)" |
| | Wanda McCaddon · Tantor | 17 h 56 min | 4.4 (102) | 1a row 8 |
| | Flo Gibson · Recorded Books | 18 h 26 min | 4.2 (108) | 1a row 11 |
| | Wanda McCaddon · Blackstone | 18 h 51 min | 4.5 (75) | 1a row 9 (Nadia May in Libby) |
| | Thandiwe Newton · Audible Studios, "Best overall" | 19 h 10 min | 4.8 (22,153) | 1a row 1 |
| | Juliet Stevenson · Audible Studios, "Runner-up" | 19 h 13 min | 4.7 (2,188) | 1a row 2 |
| | Full cast · Spoken Realms | 19 h 38 min | 4.8 (28) | 1a row 18 |
| | Lucy Scott · RNIB | 20 h 27 min | 4.6 (567) | 1a row 4 |
| | Amanda Root · Naxos AudioBooks | 20 h 33 min | 4.7 (279) | 1a row 6 (Audible's runtime; Naxos prints 20 h 34 m) |
| | Josephine Bailey · Books on Tape | 20 h 55 min | not on Audible | 1a row 10: OverDrive 20:55:05 |
| | Emma Messenger · Trout Lake Media | 21 h 47 min | 4.6 (2,041) | 1a row 3 |
| | Anna Popplewell · Penguin Classics, "Best to borrow" | 22 h 51 min | 4.8 (219) | 1a row 7 |
| Free on LibriVox | Elizabeth Klett · solo, "Best free" | 18 h 36 min | 5.0 (22) | 2a: 18:36:29, 22 review entries, archive.org average 5; 7a card "5.0 (22)" |
| | 36 readers · dramatic reading | 19 h 43 min | 5.0 (2) | 2a: 19:42:53, 2 reviews; 7a card "5.0 (2)" |
| | 21 readers · group reading | 20 h 37 min | left empty | 2a: 20:36:36. Its archive.org rating is left out on purpose: five of its eight entries praise Klett's recording, posted on the wrong page (2a; section 12 item 6) |
| | Dawn Sutton · solo | 25 h 19 min | none | 2a: 25:19:06, no reviews |

- Short labels to fit the bars: "Brilliance" for Brilliance Audio's AmazonClassics Edition (as in the Wuthering Heights figure), "Full cast" for the Spoken Realms cast (Amanda Friday, Rob Goll and others), "solo", "dramatic reading" and "group reading" for the LibriVox sets instead of version numbers (LibriVox and archive.org number Klett's set differently, 2a).
- Klett's "(22)" is archive.org's review count as archive.org and HushBook Discover show it: 19 five-star reviews of the reading, 2 zero-star non-reviews and 1 five-star spam (2a).
- Left out, as in section 10: the smaller and unconfirmed listings (Mills, Bentinck, Larkin, Barkman, Giordani, Johnson, Thrive Audio and 1e), the abridged and dramatised versions (1b) and the German LibriVox set. The figure states no total count.
- Sources line: "Runtimes as listed by Audible, OverDrive and LibriVox. Ratings from Audible US and archive.org, read November 13, 2026".

## 3. Length tiles

- Method: `length-tiles.html`, the Wuthering Heights tiles reworked: three tiles (words, chapters, 1x time) and a wide tile with a segmented bar of the first edition's three volumes. Coral on the tile dashes and Volume I; Volume II gray `#655E57`, Volume III `#9A9086`; each legend column names its volume, chapters, time at 1x and words, so no part relies on colour. The page computes every time from the word counts at 151 wpm and rounds to the minute.

| Tile | On the image | Source (research-platforms.md) |
|---|---|---|
| Words | 186,145 words, "in the novel" | section 4: "186,145 without the 38 chapter headings (the figure to publish)", Gutenberg #1260, SHA-256 13414dee...7631 (re-downloaded today, same hash) |
| Chapters | 38 chapters, "12 to 74 minutes each at 1x" | section 4: shortest Chapter 38, 1,828 words (12.1 min); longest Chapter 27, 11,238 words (74.4 min) |
| 1x time | 20 h 33 min, "listening time at 1x, at 151 words a minute" | section 4: 186,145 / 151 = 1,232.7 min |
| Volume I | Chapters 1 to 15, 6 h 41 min, 60,508 words | section 4 (Wikisource, first edition) |
| Volume II | Chapters 16 to 26, 6 h 35 min, 59,611 words | section 4 |
| Volume III | Chapters 27 to 38, 7 h 17 min, 66,026 words | section 4 |

- The three volumes add up to 186,145 words, and their rounded times to 20 h 33 min. Sources line: "Our count of Project Gutenberg eBook #1260, November 13, 2026; volumes as in the first edition on Wikisource. 151 words a minute is the median pace of ten LibriVox readers in our audiobook length study" (`content/blog/how-long-is-an-audiobook.md` lines 5 and 39). No year on the image: 1847 is in research-evidence.md, not in research-platforms.md.

## 4. French tiles

- Method: `french-tiles.html`, the tiles of `length-tiles.html` and the meter of the Pride and Prejudice `who-is-speaking.html`. Row 1: three stat tiles (words, share, time at 1x). Row 2: Adèle's share with a coral meter (84% filled on a paper track), and the span of her French. Wide tile: "French words by chapter", one coral column per chapter from a zero baseline with the count on each cap that has one. Single accent: coral on dashes, meter and columns only; all text in paper tones.
- The column row covers all 38 chapters, not only 11 to 24 as briefed: section 3a also puts 2 words in Chapter 10 and 2 in Chapter 37, and a row cut at 11 to 24 would show 342 of the 346 words. The empty runs are merged slots labelled "1 to 9" and "25 to 36"; Chapters 19 to 21, 23 and 38 show as empty slots with their numbers. Chapter 17 (98 words) is 112 px tall.

| On the image | Value | Source (research-platforms.md) |
|---|---|---|
| Words | 346 words, "of French, by our count" | 3a: "346 French words in 55 passages" |
| Share | 0.19%, "of the novel's 186,145 words" | 3a: 0.19%; section 4: 186,145. Computed 346 / 186,145 = 0.186% |
| Time | 2.3 min, "listening time at 1x, at 151 words a minute" | 3a: "about 2.3 minutes of listening at 151 wpm". Computed 346 / 151 = 2.29 |
| Adèle | 84%, "is Adèle's: 291 of the 346 words" | 3a: "Adèle 291 (84%)" |
| Span | "Ch. 11 to 24", "where Adèle's French falls, most of it in 13, 14 and 17" | section 8: "Adèle's 291 spread over Chapters 11 to 24 (most in 13, 14 and 17)"; section 12 item 11 |
| Columns | 10: 2, 11: 33, 12: 10, 13: 76, 14: 50, 15: 12, 16: 18, 17: 98, 18: 5, 22: 9, 24: 31, 37: 2; none in 1 to 9, 19 to 21, 23, 25 to 36, 38 | 3a "By chapter" |

- Sources line: "Our count of Project Gutenberg eBook #1260, November 13, 2026: French found by script, every passage checked by hand and its speaker read in context. 151 words a minute is the median pace of ten LibriVox readers in our audiobook length study".
- No French text on the image, and nothing past the chapters' numbers.

## 5. Read-along image

- The recording: LibriVox "Jane Eyre (version 2)", Elizabeth Klett solo, archive.org item `jane_eyre_ver03_0809_librivox` (metadata read today with `ia_meta.py`: `title` "Jane Eyre (version 3)", `creator` "Charlotte Brontë", licence `http://creativecommons.org/licenses/publicdomain/`, runtime 18:36:29, 38 files in 64 kbps MP3). It is the first Discover card for "jane eyre" (research-platforms 7a; positions follow downloads and can change).
- Left phone: a copy of `player-cover` as `tools/mockups/scenes/_tmp-je-player/`, one BOOKS entry `je-librivox` (`local: true`, cover from the temp folder's own `assets/`) plus the one-line change that loads a local cover. Vars: elapsed 10, length 800, chapter 1, chapters 38. Shows the cover, "Jane Eyre (version 3)", "Charlotte Brontë", "14 min left in chapter", 00:10 and −13:10, and the Read along button; the Chapters pill ("1 of 38") is in the render but below the crop of both compositions, as in the Wuthering Heights set.
  - Title and author are the item's `title` and `creator`, which Discover imports unchanged.
  - Cover: the app downloads `https://archive.org/services/img/jane_eyre_ver03_0809_librivox` (librivox_provider.dart:232, store_import_service.dart:323), which served the item tile `__ia_thumb.jpg` (180x180, 15,556 bytes, MD5 694b6087... as in the metadata). The render uses the item's JPEG original `Jane_Eyre_1002.jpg` (300x300, 108,995 bytes, MD5 47f184ce... as in the metadata, SHA-256 eb6cc401...088f), the same artwork at a higher resolution (mean pixel difference 2.1 to 2.6 of 255 per channel at 180 px). It shows "Charlotte Brontë", "Jane Eyre" and "LibriVox" over a painted portrait of a young woman.
  - Chapter 1 of 38 and length 800: the first 64 kbps file is `janeeyre_01_bronte_64kb.mp3`, title "01 - Chapter 01", length 13:20, 6,400,962 bytes (800.1 s at 64 kbps); the VBR copy is 800.22 s. The last is "38 - Chapter 38, Conclusion" (research 7b).
- Right phone: a copy of `ios-read-along` as `tools/mockups/scenes/_tmp-je-read-along/`, shot at t = 10, `theme: 'warm'` (Warm Paper). Changes in the copy only (full diff: `scripts/images/temp-scenes.patch`, against the shipped scenes; it carries over the War and Peace and Wuthering Heights additions: chapter-block title, running-head fit rule, `\p{L}\p{N}` word lengths):
  - `CHAPTER`: the first four paragraphs of Chapter I of Gutenberg #1260 (`gut_js.py`, same file and hash as research-platforms section 4), set as a transcript reads: no quotation marks, dashes and brackets as commas. "since dinner (Mrs. Reed, when there was no company, dined early) the cold winter wind" becomes "since dinner, Mrs. Reed, when there was no company, dined early, the cold winter wind"; "(for the time neither quarrelling nor crying)" takes commas the same way; "manner—something lighter, franker, more natural, as it were—she" becomes "manner, something lighter, franker, more natural, as it were, she"; Mrs. Reed's reported speech and "What does Bessie say I have done?" lose their quotation marks.
  - `CHAPTER_TITLE = '01 - Chapter 01'`, the file title, which the app shows unchanged. The block reads "CHAPTER I" over "01 - Chapter 01"; the running head "I · 01 - CHAPTER 01" fits on one line.
  - `CHAPTER_LEN` 800, `COVER_AVERAGE` `#796D48` (16 px wide decode, `cover_avg.py`; the same from the 180 px tile and the 300 px original), `BREATHS` `['the cold winter wind had brought with it', 'humbled by the consciousness']`.
  - New in this copy (after the coordinator's review): a title's full stop (`TITLE_ABBR`: "Mr.", "Mrs.", "Ms.", "Dr.", "St.") is not a sentence end, neither for the timing pause nor for the reader-line cut, so no block break falls inside "Mrs. Reed". The first render broke the block as "...but since dinner, Mrs." / "Reed, when there...", which reads as a glitch. This differs from the app's own splitter: `AlignmentPipeline._computeBreaks` (D:\hushbook\lib\features\transcription\alignment_pipeline.dart, lines 93 to 107) cuts after every word ending in a full stop, so a transcript that writes "Mrs. Reed" would break there in the app. The block now breaks after "morning;" (a semicolon, a soft cut once a run has 14 words). "Mrs." is the only abbreviation in the four paragraphs (checked by script), so no other break can fall inside one on the page.
  - The drop cap is the first character, "T" of "There", as the app does it.
  - At t = 10 the current word is "Reed,", underlined at 58% of the phone's height, page 1 of 4, with "but since dinner, Mrs." tinted (`probe-read-along.mjs`).
- Shots (`shots.json` in each temp scene):
  - `{ "id": "_tmp-je-player", "t": 0, "crop": "phone", "out": "_tmp-je-player", "vars": { "cover": "je-librivox", "elapsed": 10, "length": 800, "chapter": 1, "chapters": 38 } }`
  - `{ "id": "_tmp-je-ra-warm", "t": 10, "crop": "phone", "out": "_tmp-je-ra-warm", "vars": { "theme": "warm" } }`
- Rendered with `node tools/mockups/render.mjs --shot _tmp-je-ra-warm,_tmp-je-player --png` (only these two shots).
- Composed with `compose_phones.py` from the two PNGs: 1400x900 ink canvas, coral glows, drop shadows, left phone 1000 px tall at (175, 130), right phone 1060 px tall at (715, 50), the same placement as before.
- Simplification, as before: the page starts at the novel's first words; LibriVox chapter files open with a spoken preamble (not checked for this file).
- Spoilers: the page is the first page of Chapter I; the player shows only the cover, title and chapter 1.

## Validator (dataviz `scripts/validate_palette.js`)

| Figure | Run | Result |
|---|---|---|
| Editions | `"#E8613F,#655E57" --mode dark --surface "#0B0A09"` | lightness band PASS; chroma floor FAIL for `#655E57` (0.014), the intended de-emphasis gray, as in the approved figures; CVD PASS (protan ΔE 11.7, tritan 27.3); normal-vision PASS (ΔE 23.7); contrast PASS |
| Length | `"#E8613F,#655E57,#9A9086" --mode dark --surface "#12110F"` (the tile surface) | lightness band PASS; chroma floor FAIL for both grays (single-accent site, by design); CVD PASS (protan ΔE 11.7); normal-vision PASS (ΔE 17.3); contrast WARN for `#655E57` at 2.96:1, relieved by the visible legend that names every volume with its values |
| French | `"#E8613F" --mode dark --surface "#12110F"` | all checks PASS |

The picks card has no data colours (coral is the label text, as on every picks card).

## Cleanup

Deleted after composing, twice (after the first render, and again after the review re-render, for which both scenes were recreated from `temp-scenes.patch` and both shots rendered; the player render and the other four images are unchanged): `tools/mockups/scenes/_tmp-je-player/` (with its `assets/Jane_Eyre_1002.jpg`), `tools/mockups/scenes/_tmp-je-read-along/`, `assets/img/mockups/_tmp-je-player.webp`, `assets/img/mockups/_tmp-je-ra-warm.webp`, `tools/mockups/out/en-_tmp-je-player.png`, `tools/mockups/out/en-_tmp-je-ra-warm.png` and `scripts/images/phone-player.png`. No `_tmp-pp-*` or other temp files were present. No tracked file under `tools/mockups/` or `assets/img/mockups/` was changed (`git status --short` shows only the six new images, the embed and this draft folder, plus `docs/seo/keyword-research-2026-11-13.md`, which predates this run).

Downloads, each in its own new folder under the session scratchpad `images/`: `dl-ia-meta/meta.json` (archive.org metadata), `dl-cover/Jane_Eyre_1002.jpg`, `dl-cover-tile/services-img.jpg`, `dl-gutenberg-1260/pg1260.txt`. Python ran with `-I`; scripts stayed in this folder; requests carried a generic browser User-Agent.

## Scripts (`scripts/images/`)

- `render-html.mjs`: repo `playwright` and `sharp` via `createRequire('D:/hushbook.app/package.json')`, headless Chrome, sandbox on, deviceScaleFactor 2, WebP 84, with the overflow, font, 15 px and fit checks.
- `picks-card.html`, `editions-figure.html`, `length-tiles.html`, `french-tiles.html`: the four HTML images. No Google tag in them; `npm run build:blog` runs `inject-gtag.js`, which may add one to these drafts later.
- `check-values.mjs` (new): prints each figure's computed values and the closest pair of chapter labels.
- `compose_phones.py` (PIL composition), `probe-read-along.mjs` (current word and its height per t), `ia_meta.py` (title, cover and chapter files from archive.org metadata), `gut_js.py` (Chapter I of Gutenberg #1260 as a transcript-style JS array; brackets added to the rules), `cover_avg.py` (cover average colour; Pillow 12 deprecation fixed), `preview760.py` (760 px previews).
- `temp-scenes.patch`: the two temp scenes as a diff against `player-cover` and `ios-read-along`. To recreate: copy the two scenes to `_tmp-je-player` and `_tmp-je-read-along`, apply the patch, put `Jane_Eyre_1002.jpg` in `_tmp-je-player/assets/`, write the two `shots.json` files above, render, compose, then delete the temp scenes and the runner's `_tmp-je-*` outputs.

## Alt text

- **picks** (in the embed, 249 characters): "Jane Eyre audiobook picks: best overall Thandiwe Newton, 19 h 10 min, and runner-up Juliet Stevenson, 19 h 13 min, both Audible Studios; best free Elizabeth Klett, LibriVox, 18 h 36 min; best to borrow Anna Popplewell, Penguin Classics, 22 h 51 min."
- **editions** (228): "Bar chart of 16 complete Jane Eyre recordings by running time, shortest first: 12 sold by stores, 17 h 27 min to 22 h 51 min, with Audible US ratings, and 4 free on LibriVox, 18 h 36 min to 25 h 19 min. In coral: the four picks."
- **length** (235): "Stat tiles for Jane Eyre: 186,145 words, 38 chapters of 12 to 74 minutes, 20 h 33 min at 1x at 151 words a minute. The first edition's three volumes: I, Chapters 1 to 15, 6 h 41 min; II, 16 to 26, 6 h 35 min; III, 27 to 38, 7 h 17 min."
- **french** (210): "Stat tiles: 346 French words in Jane Eyre, 0.19% of its 186,145 words, 2.3 minutes at 1x; 84% is Adèle's, in Chapters 11 to 24. Below, French words by chapter: 12 chapters have any, most in 13 (76) and 17 (98)."
- **read-along** (240): "Two HushBook screens for Elizabeth Klett's free LibriVox recording, Jane Eyre (version 3): the player 10 seconds into the first chapter, and its read-along page in warm paper, with "but since dinner, Mrs." tinted red and "Reed," underlined."

## Check against the draft (post.md as of 13:16, registry-entry.mjs as of 13:15)

The draft's own check (`node registry-entry.mjs`) passes: four wide images, all on disk, alts 249/227/219/224 characters. The editions, length and French alts in post.md match their images; keep them.

- **Read-along alt (post.md line 360) no longer matches.** It says "Reed, when" is tinted red and "there" underlined, which described the first render. After the review re-render the tinted words are "but since dinner, Mrs." and the underlined word is "Reed,". Use the read-along alt above (240 characters).

Otherwise every name, runtime, rating, word count, chapter count, volume figure, French count and pick label in post.md that also appears on an image matches it. Points to know, none of them errors:

- **Klett's rating cell.** The editions figure shows Klett at "5.0 (22)" (archive.org's own count, as Discover shows it), while post.md lines 29 and 173 say "19 five-star reviews". Both are right (the 22 entries include 2 zero-star non-reviews and 1 spam, 2a), but a reader may compare them. If it should match, the figure can show "5.0" without the count, or post.md can add "of 22 entries".
- **Rating column for LibriVox.** post.md's table (lines 59 to 62) says "Free" in the rating column; the figure gives archive.org ratings for Klett and the dramatic reading, leaves the group reading empty and says "none" for Dawn Sutton. post.md line 176 explains why the group's archive.org average is unreliable, which covers the empty cell.
- **Publisher labels.** The figure says "Brilliance" where post.md's table says "Brilliance Audio (AmazonClassics)" and its bullet says "AmazonClassics"; and "Full cast · Spoken Realms" where the table says "Full cast: Amanda Friday, Rob Goll and others".
- **Time for the French.** The French figure prints "2.3 min"; post.md says "about two minutes" (lines 226, 345 and the registry takeaway and FAQ). Consistent, rounded differently.
- **The range on sale.** The editions figure's store bars run 17 h 27 min to 22 h 51 min (the sixteen table rows); post.md line 83 gives the full range on sale, 17 h 21 min (Ericksen's Classic Collection) to 23 h 8 min (Bentinck), from listings the figure leaves out (post.md line 66 says so).
