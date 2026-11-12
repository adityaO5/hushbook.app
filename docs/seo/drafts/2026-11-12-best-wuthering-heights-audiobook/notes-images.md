# Images: best-wuthering-heights-audiobook

Made 2026-11-12 with the method and look of the War and Peace set (`../2026-11-11-best-war-and-peace-audiobook/notes-images.md`): same renderer, tokens (ink #0B0A09, paper #F6EFE4, paper-dim #CABFB0, coral #E8613F), fonts (Newsreader, Inter from `tools/mockups/assets/fonts`) and phone composition. Nothing stock or AI-generated: four HTML figures rendered with the repo's Playwright and one composition of real app renders. All browser work headless, Chrome with `chromiumSandbox: true` (bundled Chromium as fallback; not needed). WebP quality 84. Every name and number comes from `research-platforms.md` in this folder. The dataviz skill was loaded before the figures; its palette validator was run (results under images 2 and 3).

## Files

| File | Pixels | Size | Made from |
|---|---|---|---|
| `assets/img/blog/wuthering-heights-picks.webp` | 1400x788 | 78 KB (80,036 bytes) | `scripts/images/picks-card.html` with the player render, 2x |
| `assets/img/blog/wuthering-heights-editions.webp` | 1400x1696 | 166 KB (170,472 bytes) | `scripts/images/editions-figure.html`, 2x |
| `assets/img/blog/wuthering-heights-length.webp` | 1400x1076 | 69 KB (70,662 bytes) | `scripts/images/length-tiles.html`, 2x |
| `assets/img/blog/wuthering-heights-family-tree.webp` | 1400x1482 | 74 KB (75,940 bytes) | `scripts/images/family-tree.html`, 2x |
| `assets/img/blog/wuthering-heights-read-along.webp` | 1400x900 | 62 KB (63,958 bytes) | two renders from temporary mockup scenes, composed with PIL |
| `content/blog/embeds/wuthering-heights-picks.html` | | | the hero embed (registry `hero: 'wuthering-heights-picks'`), same form as `war-and-peace-picks.html` |

Re-render a figure: `node scripts/images/render-html.mjs <figure.html> <out.webp> 700 auto` (picks card: `700 394`). The renderer reports font loading, overflow, text under 15 px and a per-figure fit check. All four figures: no overflow (the picks card's only flag is the phone running past the bottom edge, as intended), every text 15 px CSS or larger (30 px or larger in the 1400 px files), fit checks clean. Each image was viewed at full size and at the blog's 760 px display width (`preview760.py`).

## 1. Picks card (lead image, the post's `hero`)

- Method: `picks-card.html`, the War and Peace card with new data. Left: the player render from the temp scene of image 5 (`en-_tmp-wh-player.png`, copied next to the HTML as `phone-player.png`), 470 px tall at (44, 30) CSS. Right: heading "Wuthering Heights audiobooks: our picks", four rows (coral label, name in Newsreader 22 px, details in Inter 15 px). Coral only on the labels.
- Data (research-platforms.md section 9, table 1a, section 2a):

| Label | Name | Details on the card | Source |
|---|---|---|---|
| Best overall | Joanne Froggatt | Audible Studios · 12 h 32 min | 1a row 1: 12 hrs 32 mins |
| Highest rated | Juliet Stevenson | silksoundbooks · 13 h 24 min | 1a row 4: 13 hrs 24 mins |
| Best two-voice | Janet McTeer with David Timson | Naxos AudioBooks · 13 h 9 min | section 9; Naxos "13 h 09 m", booklet 13:09:16 (1a row 2). Audible lists 13 hrs 8 mins |
| Best free | Ruth Golding | LibriVox, solo version · 14 h 49 min | 2a: 14:48:42, archive.org title "Wuthering Heights (Solo Version)" |

- The phone shows the recording the free pick names: "Wuthering Heights (Solo Version)", Emily Bronte, chapter 1 of 34 (details under image 5).

## 2. Editions figure

- Method: `editions-figure.html`, the War and Peace bar chart regrouped: "Sold by stores" and "Free on LibriVox", each sorted shortest first. Bars from zero on a 0 to 15 h axis (456 px), ticks every 3 h, value at each tip, no gridlines; a right-hand column gives the rating with its number of ratings, headed "Audible US rating" and "archive.org rating". The four picks are coral with ink text and carry their pick label inside the bar (the second, non-colour cue); the rest are gray `#655E57` with paper text.
- Validator (`--mode dark --surface #0B0A09`, `#E8613F,#655E57`): lightness, CVD (protan ΔE 11.7), normal-vision ΔE 23.7 and contrast pass; the chroma floor fails for the gray, as intended for a de-emphasis gray (same as the approved figures).
- Rows: the fifteen rows of the ready-to-paste table (section 10), values from table 1a and section 2a. Store runtimes are Audible's except Naxos (its own 13 h 9 min, to match the picks); LibriVox runtimes are LibriVox's own, rounded to the minute.

| Group | Bar label | Runtime | Rating | Source |
|---|---|---|---|---|
| Sold by stores | Flo Gibson · Recorded Books | 11 h 15 min | 3.9 (516) | 1a row 9 |
| | Carolyn Seymour · Blackstone | 11 h 34 min | 3.9 (81) | 1a row 11 |
| | Michael Kitchen · Audible Studios | 11 h 38 min | 4.2 (327) | 1a row 6 |
| | Michael Page, Laural Merlington · Brilliance | 11 h 57 min | 4.1 (223) | 1a row 8 (AmazonClassics Edition) |
| | Joanne Froggatt · Audible Studios, "Best overall" | 12 h 32 min | 4.4 (8,661) | 1a row 1 |
| | Janet McTeer, David Timson · Naxos, "Best two-voice" | 13 h 9 min | 4.2 (1,562) | 1a row 2 |
| | Emma Messenger · Trout Lake Media | 13 h 13 min | 4.0 (1,397) | 1a row 7 |
| | Ciaran Saward, Sherry Baines · Arcturus Digital | 13 h 14 min | none | 1a row 14 (no ratings) |
| | Juliet Stevenson · silksoundbooks, "Highest rated" | 13 h 24 min | 4.6 (427) | 1a row 4 |
| | Billie Fulford-Brown · Spotify Audiobooks | 13 h 38 min | none | 1a row 13 (not on Audible US; no UK ratings) |
| | Aimee Lou Wood, Kristin Atherton · Penguin Classics | 13 h 58 min | 4.4 (202) | 1a row 5 |
| | Patricia Routledge · Audible Studios | 14 h 15 min | 4.3 (1,533) | 1a row 3 |
| Free on LibriVox | 14 readers · Version 1 | 11 h 33 min | 2.83 (8) | 2a: 11:33:10 |
| | 25 readers · Version 3, dramatic | 11 h 54 min | none | 2a: 11:54:13, no reviews |
| | Ruth Golding · Version 2, solo, "Best free" | 14 h 49 min | 4.33 (13) | 2a: 14:48:42 |

- Short labels to fit the bars: "Janet McTeer, David Timson" (the "with" form was 19 px too wide for its bar), "Brilliance" for Brilliance Audio's AmazonClassics Edition, "Naxos" for Naxos AudioBooks.
- Left out, as in section 10: Anne Flosnik, Judy Holt, Kate Petrie and Donada Peters (all VERIFIED complete in 1a), the abridged, condensed and dramatised versions (1b) and the smaller listings (1e). The figure states no total count.
- Sources line: "Runtimes as listed by Audible, Naxos and LibriVox. Ratings from Audible US and archive.org, read November 12, 2026".

## 3. Length tiles

- Method: `length-tiles.html`, the War and Peace tiles reworked: three tiles (words, chapters, 1x time) and a wide tile with a segmented bar of who narrates. Coral on the tile dashes and Lockwood's part. The page computes every time from the word counts at 151 wpm and rounds to the minute.
- Segmented bar: one whole (the novel's words), three parts with 2 px gaps, legend below with name, share and time at 1x. Validator (`--mode dark --surface #12110F`, `#E8613F,#655E57,#9A9086`): lightness band, CVD (protan ΔE 11.7), normal-vision ΔE 17.3 pass; chroma floor fails for both grays (single-accent site, by design); contrast WARN for `#655E57` at 2.96:1 on the tile, relieved by the visible legend with every value.

| Tile | On the image | Source (research-platforms.md) |
|---|---|---|
| Words | 116,440 words, "in the novel" | section 4: "116,440 without the 34 CHAPTER headings and 9 break lines (the figure to publish)", Gutenberg #768, SHA-256 e533fe75...c5e02 (re-downloaded today, same hash) |
| Chapters | 34 chapters, "9 to 45 minutes each at 1x" | section 4: shortest Chapter 5, 1,414 words (9.4 min); longest Chapter 17, 6,832 words (45.2 min) |
| 1x time | 12 h 51 min, "listening time at 1x, at 151 words a minute" | section 4: 116,440 / 151 = 771.1 min |
| Lockwood | 14.7%, 1 h 53 min at 1x | section 3d: 17,103 words |
| Nelly Dean | 82.3%, 10 h 35 min at 1x | section 3d: 95,830 words |
| Isabella's letter | 3.0%, 23 min at 1x | section 3d: 3,507 words (Chapter 13, inside Nelly's tale) |

- The three parts add up to 116,440 words. Sources line: "Our count of Project Gutenberg eBook #768. 151 words a minute is the median pace of ten LibriVox readers in our audiobook length study" (`content/blog/how-long-is-an-audiobook.md` lines 5 and 39).

## 4. Family tree

- Method: `family-tree.html`. Generations run left to right so every card has room for the other names the text uses (six cards across a 700 px top-down row would be 88 px wide). Column 1, top to bottom: Frances, Hindley Earnshaw, Catherine Earnshaw, Edgar Linton, Isabella Linton, Heathcliff, so every marriage joins neighbours and each house's two children sit together. Column 2: each marriage's child, level with it. A double line is a marriage (key under the title). Catherine Linton and Hareton's engagement (Ch. 34) is left out on purpose: it gives away the ending (coordinator's call, 12:05; the first render had a dashed "to marry" line and key entry). The houses are brackets: "Wuthering Heights, the Earnshaws" (coral) over Hindley and Catherine, "Thrushcross Grange, the Lintons" (paper-dim) over Edgar and Isabella. A card's coloured left edge marks the house the person grew up in: Heights for Hindley, Catherine Earnshaw, Heathcliff and Hareton; Grange for Edgar, Isabella and Catherine Linton; none for Frances (came from elsewhere, Ch. 6) and Linton Heathcliff (born and raised near London, Ch. 17). House names and labels are text-coloured; colour sits on the brackets and edges only.
- Data (research-platforms.md section 5, the names table, from the text of Gutenberg #768):

| Card | Second line | Ties drawn | Source in the names table |
|---|---|---|---|
| Frances | | married to Hindley; mother of Hareton | Hindley row: "he brought a wife with him" (Ch. 6): Frances; Hareton row: son of Hindley and Frances |
| Hindley Earnshaw | | Catherine's brother | Hindley row |
| Catherine Earnshaw | Cathy · Mrs. Linton | married to Edgar; mother of Catherine Linton | Catherine Earnshaw row |
| Edgar Linton | | Isabella's brother | Edgar and Isabella rows |
| Isabella Linton | Mrs. Heathcliff | married to Heathcliff; mother of Linton Heathcliff | Isabella row ("He was christened Linton", Ch. 17) |
| Heathcliff | the foundling | | Heathcliff row (Ch. 4) |
| Hareton Earnshaw | | | Hareton row (son of Hindley and Frances) |
| Catherine Linton | Cathy · Mrs. Heathcliff | married to Linton Heathcliff | Catherine Linton row |
| Linton Heathcliff | Linton | | Linton Heathcliff row |

- Not drawn: the parents' generation (old Mr. Earnshaw, Mr. and Mrs. Linton), the servants, Lockwood. Two generations as briefed.
- Sources line: "Names and family ties from the text of the novel, Project Gutenberg eBook #768".

## 5. Read-along image

- The recording: LibriVox **Wuthering Heights, Version 2**, Ruth Golding solo, archive.org item `wuthering_heights_rg_librivox` (metadata read today with `ia_meta.py`: `title` "Wuthering Heights (Solo Version)", `creator` "Emily Bronte", licence Creative Commons public domain, runtime 14:48:42, 34 files in each MP3 format). It is the first Discover card for "wuthering heights" (research-platforms 7a; positions follow downloads and can change).
- Left phone: a copy of `player-cover` as `tools/mockups/scenes/_tmp-wh-player/`, one BOOKS entry (`local: true`, cover from the temp folder's own `assets/`) plus the one-line change that loads a local cover. Vars: elapsed 10, length 936, chapter 1, chapters 34. Shows the cover, "Wuthering Heights (Solo Version)", "Emily Bronte", "16 min left in chapter", 00:10 and −15:26, Chapters "1 of 34", and the Read along button.
  - Title and author are the item's `title` and `creator`, which Discover imports unchanged.
  - Cover: the app downloads `https://archive.org/services/img/wuthering_heights_rg_librivox` (librivox_provider.dart:232, store_import_service.dart:323), which served the item tile `__ia_thumb.jpg` (180x180, 17,335 bytes, MD5 605e2146... as in the metadata). The render uses the item's JPEG original `Wuthering_Heights.jpg` (300x300, 121,377 bytes, MD5 3eb880e0... as in the metadata, SHA-256 0f5222c4...e35d), the same artwork at a higher resolution (mean pixel difference 2.5 of 255 at 180 px). It shows "Emily Brontë, Wuthering Heights, LibriVox" over a painting of a stormy moor.
  - Chapter 1 of 34 and length 936: the first 64 kbps file is `wutheringheights_01_bronte_64kb.mp3`, title "01 - Chapter I", length 15:35, 7,487,680 bytes (935.96 s at 64 kbps); the VBR copy is 936.08 s.
- Right phone: a copy of `ios-read-along` as `tools/mockups/scenes/_tmp-wh-read-along/`, shot at t = 10, `theme: 'warm'` (Warm Paper). Changes in the copy only (full diff: `scripts/images/temp-scenes.patch`, against the shipped scenes; it carries over the War and Peace additions: chapter-block title, running-head fit rule, `\p{L}\p{N}` word lengths):
  - `CHAPTER`: the first four paragraphs of Chapter I of Gutenberg #768 (`gut_js.py`, same file and hash as research-platforms section 4), set as a transcript reads: no quotation marks, dashes as commas ("1801—I have just returned from a visit to my landlord—the solitary neighbour" becomes "1801, I have just returned from a visit to my landlord, the solitary neighbour"; "misanthropist's Heaven—and" becomes "misanthropist's Heaven, and").
  - `CHAPTER_TITLE = '01 - Chapter I'`, the file title, which the app shows unchanged (`localizedChapterTitle` only replaces an empty or generated "Chapter N" title; `_chapterHeading` in player_screen.dart:2531). The block reads "CHAPTER I" over "01 - Chapter I"; the running head "I · 01 - CHAPTER I" fits on one line.
  - `CHAPTER_LEN` 936, `COVER_AVERAGE` `#68685E` (16 px wide decode, `cover_avg.py`; the same from the 180 px tile and the 300 px original), `BREATHS` `['I could have fixed on a situation', 'how my heart warmed towards him']`.
  - The drop cap is the first character, "1" of "1801", as the app does it (`lyricsKaraokeTextSpan` takes the first rune, lyrics_karaoke.dart:309).
  - At t = 10 the current word is "England,", underlined at 58% of the phone's height, page 1 of 3, with "In all" tinted (`probe-read-along.mjs`).
- Shots (`shots.json` in each temp scene):
  - `{ "id": "_tmp-wh-player", "t": 0, "crop": "phone", "out": "_tmp-wh-player", "vars": { "cover": "wh-librivox", "elapsed": 10, "length": 936, "chapter": 1, "chapters": 34 } }`
  - `{ "id": "_tmp-wh-ra-warm", "t": 10, "crop": "phone", "out": "_tmp-wh-ra-warm", "vars": { "theme": "warm" } }`
- Rendered with `node tools/mockups/render.mjs --shot _tmp-wh-ra-warm,_tmp-wh-player --png` (only these two shots).
- Composed with `compose_phones.py`: 1400x900 ink canvas, coral glows, drop shadows, left phone 1000 px tall at (175, 130), right phone 1060 px tall at (715, 50), the same placement as before.
- Simplification, as before: the page starts at the novel's first words; the real chapter file opens with the spoken LibriVox preamble.
- Cleanup: deleted `tools/mockups/scenes/_tmp-wh-player/`, `tools/mockups/scenes/_tmp-wh-read-along/`, `assets/img/mockups/_tmp-wh-player.webp`, `assets/img/mockups/_tmp-wh-ra-warm.webp`, `tools/mockups/out/en-_tmp-wh-player.png` and `en-_tmp-wh-ra-warm.png`. No tracked file under `tools/mockups/` or `assets/img/mockups/` was changed. (The `_tmp-pp-*` files there belong to the Pride and Prejudice image run and were left alone.)

## Scripts (`scripts/images/`)

- `render-html.mjs`: repo `playwright` and `sharp` via `createRequire('D:/hushbook.app/package.json')`, headless Chrome, sandbox on, deviceScaleFactor 2, WebP 84, with the overflow, font, 15 px and fit checks.
- `picks-card.html`, `editions-figure.html`, `length-tiles.html`, `family-tree.html`: the four HTML images.
- `compose_phones.py` (PIL composition), `probe-read-along.mjs` (current word and its height per t), `ia_meta.py` (title, cover and chapter files from archive.org metadata), `gut_js.py` (Chapter I of Gutenberg #768 as a transcript-style JS array), `cover_avg.py` (cover average colour), `preview760.py` (760 px previews). Python runs with `-I`; downloads went to a fresh folder in the session scratchpad.
- `temp-scenes.patch`: the two temp scenes as a diff against `player-cover` and `ios-read-along`. To recreate: copy the two scenes to `_tmp-wh-player` and `_tmp-wh-read-along`, apply the patch, put `Wuthering_Heights.jpg` in `_tmp-wh-player/assets/`, write the two `shots.json` files above, render, compose, then delete the temp scenes and the runner's `_tmp-wh-*` outputs.

## Alt text

- **picks** (already in the embed): "Wuthering Heights audiobooks, our picks: best overall, Joanne Froggatt, Audible Studios, 12 h 32 min; highest rated, Juliet Stevenson, silksoundbooks, 13 h 24 min; best two-voice, Janet McTeer with David Timson, Naxos AudioBooks, 13 h 9 min; best free, Ruth Golding, LibriVox solo version, 14 h 49 min. Beside the list, the HushBook player with the LibriVox cover of Wuthering Heights (Solo Version)."
- **editions:** the alt in post.md (line 9) matches the figure row for row; keep it.
- **length:** the alt in post.md (line 71) matches; keep it.
- **family tree:** "Family tree of Wuthering Heights over two generations. Wuthering Heights, the Earnshaws: Hindley Earnshaw and his sister Catherine Earnshaw, called Cathy, later Mrs. Linton. Thrushcross Grange, the Lintons: Edgar Linton and his sister Isabella Linton, later Mrs. Heathcliff. Hindley married Frances, and their son is Hareton Earnshaw. Catherine Earnshaw married Edgar Linton, and their daughter is Catherine Linton, also Cathy and later Mrs. Heathcliff. Isabella married Heathcliff, the foundling raised at Wuthering Heights, and their son is Linton Heathcliff. Catherine Linton married her cousin Linton Heathcliff. Names from Project Gutenberg eBook #768."
- **read-along:** the alt in post.md (line 312) matches; keep it. Fuller option: "Two HushBook screens for Ruth Golding's free LibriVox recording, Wuthering Heights (Solo Version), by Emily Bronte: the player with the LibriVox cover of a stormy moor at the start of chapter 1 of 34, with a Read along button, and the read-along page in the warm paper theme showing Chapter I, 1801, I have just returned from a visit to my landlord, where the words already read, In all, are tinted red and the word being spoken, England, is underlined."

## Check against the draft (post.md and registry-entry.mjs as of 12:02)

- Picks, runtimes, ratings, word count, chapter count, the 1x time and the narrator shares in post.md match the images.
- **Family tree alt (post.md line 257) does not match the image:** it names old Mr. Earnshaw and Mr. and Mrs. Linton (not drawn) and places Heathcliff, Frances and Hareton "at Wuthering Heights" as a group; it leaves out Hindley and Frances's marriage line. Use the alt above, which also says nothing of the ending (Catherine Linton and Hareton).
- **Naxos runtime:** the picks card, the editions figure and post.md use 13 h 9 min (Naxos's own). `registry-entry.mjs` line 26 says "13 hours 8 minutes" (Audible's), and its check on line 160 requires "13 hours 8 minutes" in the first paragraph, which says "13 hours 9 minutes": that check will fail as written. Section 10 of the research also prints 13 h 8 min.
