# Images: best-pride-and-prejudice-audiobook

Made 2026-11-12 with the method of the War and Peace set (`../2026-11-11-best-war-and-peace-audiobook/notes-images.md`): same scripts, tokens (ink #0B0A09, paper #F6EFE4, paper-dim #CABFB0, coral #E8613F), fonts (Newsreader headings, Inter labels, from `tools/mockups/assets/fonts`) and layout, new data. Nothing stock or AI-generated: four HTML figures rendered with the repo's Playwright and one composition of real app renders. All browser work headless, Chrome with `chromiumSandbox: true` (bundled Chromium as fallback; not needed). WebP quality 84. Every name and number comes from `research-platforms.md` in this folder (VERIFIED values only). The dataviz skill was loaded before the figures; its validator on `#E8613F,#655E57` against ink (`--mode dark --surface #0B0A09`) gives the same result as the approved figures: lightness, CVD (protan ΔE 11.7), normal-vision ΔE 23.7 and contrast pass; the chroma floor fails for the gray, as intended for a de-emphasis gray.

## Files

| File | Pixels | Size | Made from |
|---|---|---|---|
| `assets/img/blog/pride-and-prejudice-picks.webp` | 1400x788 | 72 KB (73,998 bytes) | `scripts/images/picks-card.html` with the player render, 2x |
| `assets/img/blog/pride-and-prejudice-editions.webp` | 1400x2166 | 166 KB (170,226 bytes) | `scripts/images/editions-figure.html`, 2x |
| `assets/img/blog/pride-and-prejudice-length.webp` | 1400x1234 | 78 KB (80,384 bytes) | `scripts/images/length-tiles.html`, 2x |
| `assets/img/blog/pride-and-prejudice-who-is-speaking.webp` | 1400x1122 | 67 KB (68,672 bytes) | `scripts/images/who-is-speaking.html`, 2x |
| `assets/img/blog/pride-and-prejudice-audiobook-with-text.webp` | 1400x900 | 62 KB (63,622 bytes) | two renders from temporary mockup scenes, composed with PIL |
| `content/blog/embeds/pride-and-prejudice-picks.html` | | | the hero embed, same form as `war-and-peace-picks.html` |

Re-render a figure: `node scripts/images/render-html.mjs <figure.html> <out.webp> 700 auto` (picks card: `700 394`). The renderer reports font loading, overflow, text under 15 px and fit (labels, values and blocks inside their boxes). All four figures: no overflow (the picks card's only flag is the phone running past the bottom edge, as intended), every text 15 px CSS or larger (30 px or larger in the 1400 px files), everything fits. Each image was viewed at full size and at the blog's 760 px display width (`preview760.py`). Text on gray is paper (5.6:1); ink on coral 5.9:1; muted sources line 6.3:1 on ink.

## 1. Picks card (lead image; `hero: 'pride-and-prejudice-picks'`)

- Method: `picks-card.html`, a 700x394 page at 2x. Left: the player render from the temp scene of image 5 (`en-_tmp-pp-player.png`, copied next to the HTML as `phone-player.png`), 470 px tall at (44, 30) CSS, drop shadow. Right: heading "Pride and Prejudice audiobooks: our picks", four rows (coral label, name in Newsreader 22 px, details in Inter 15 px). Same layout as the War and Peace card.
- Data (research-platforms.md section 7, tables 1a, 1b, 2a, 8):

| Label | Name | Details | Source |
|---|---|---|---|
| Best overall | Rosamund Pike | Audible Studios · 11 h 35 min | 1a row 1: 11 h 35 min (695 min) |
| Runner-up | Juliet Stevenson | Naxos AudioBooks · 14 h 2 min | 1a row 3: Audible 14 h 2 min (842) |
| Best free | Karen Savage | LibriVox version 3 · 10 h 23 min | 2a: version 3, 10:23:00 |
| Best dramatised | Audible Original, 2025 | Full cast · 4 h 34 min adaptation | 1b: Audible Originals, 2025-09-09, 4 h 34 min (274 min), full cast |

- The phone shows the Discover card the post names, "Pride and Prejudice (version 3)" (details under image 5).
- Embed written: `content/blog/embeds/pride-and-prejudice-picks.html` (`width="1400" height="788"`, `fetchpriority="high"`, alt below).

## 2. Editions figure (running time and rating)

- Method: `editions-figure.html`. Each row is two lines: narrator (semibold) · publisher, an ink-on-coral tag for the three picks, and the rating right-aligned; under it a 10 px bar from zero on a 0 to 15 h axis (530 px, ticks every 5 h) with the time at its tip. Two-line rows because the War and Peace layout (label inside the bar) cannot fit "Rosamund Pike · Audible Studios" plus a tag inside an 11 h 35 min bar. Bars sorted shortest first within each group; a short zero tick per bar instead of a line through the labels. Neutral bars `#655E57`, the picks coral with a text tag as the non-colour cue.
- Groups name where the rating comes from: Audible (Audible US overall stars, count), Apple Books and Libby (Apple Books stars, count; Libby shows none, so Kellgren has no rating), Free on LibriVox (archive.org review average, count, as the research gives them, two decimals where it has two).
- Rows: the 14 VERIFIED recordings of research table 8, without Julie Andrews' Noiser podcast (17 h 16 min of episodes with music: a podcast, not a reading time). The other 10 store listings of table 1a and LibriVox versions 1 and 5 are left out to keep the figure readable; the heading claims no total.

| Group | Bar label | On figure | Rating on figure | Source |
|---|---|---|---|---|
| Audible | Carolyn Seymour · Blackstone | 11 h 28 min | 4.6 (1,902) | 1a row 8 |
| | Flo Gibson · Recorded Books | 11 h 28 min | 4.6 (252) | 1a row 12 |
| | Rosamund Pike · Audible Studios, tag Best overall | 11 h 35 min | 4.8 (43,975) | 1a row 1 |
| | Lindsay Duncan · Audible Studios | 12 h 3 min | 4.7 (5,348) | 1a row 2 |
| | Emilia Fox · Naxos AudioBooks | 13 h 2 min | 4.7 (787) | 1a row 4 |
| | Indira Varma · Penguin Classics | 13 h 27 min (with introduction; said in the sources line) | 4.7 (195) | 1a row 5 |
| | Juliet Stevenson · Naxos AudioBooks, tag Runner-up | 14 h 2 min | 4.9 (204) | 1a row 3 |
| Apple Books and Libby | Kate Beckinsale · Apple | 11 h 43 min (Apple 11:43:04) | 4.5 (8,598), Apple | 1a row 6 |
| | Kate Reading · Books on Tape | 12 h 8 min (Apple 12:08:09) | 4.2 (203), Apple | 1a row 7 |
| | Katherine Kellgren · Duke Classics | 12 h 21 min (OverDrive 12:20:38) | none | 1a row 10 |
| Free on LibriVox | Karen Savage · version 3, tag Best free | 10 h 23 min (10:23:00) | 4.25 (17) | 2a |
| | Elizabeth Klett · version 4 | 11 h 10 min (11:09:53) | 4.91 (12) | 2a |
| | 26 readers · version 6, dramatic reading | 11 h 58 min (11:57:51) | 5 (1) | 2a |
| | Annie Coleman Rothenberg · version 2 | 13 h 25 min (13:25:01) | 4.8 (5) | 2a |

- Heading: "Pride and Prejudice, unabridged: running time and rating". Sources line: "Runtimes and ratings as listed by Audible US, Apple Books US, OverDrive, LibriVox and archive.org, read November 12, 2026. Indira Varma's time includes an introduction".

## 3. Length tiles

- Method: `length-tiles.html`, the War and Peace tiles (two value tiles, four speed tiles with meters showing each time as a share of the 1x time) plus a tall segmented bar for the volumes (28 px blocks, widths 23:19:19, 2 px gaps, paper text on gray), each block's continuous chapter numbers under it. Coral only on the dashes and meters.

| Tile | Value | Source |
|---|---|---|
| Words | 121,676 "in the novel" | 3a: the site's published figure, which the research says to keep (ours 121,850; same to within a minute at every speed) |
| Chapters | 61 "in three volumes" | 3b |
| 1x / 1.25x / 1.5x / 2x | 13 h 26 min / 10 h 45 min / 8 h 57 min / 6 h 43 min | 3c, "121,676 (site) at 151 wpm"; the page computes 121,676 / 151 / speed and rounds to the minute |
| Volumes of 1813 | Volume I 23 chapters (1 to 23), II 19 (24 to 42), III 19 (43 to 61) | 3b, Wikisource transcription of the first edition |

- Sources line: "Our count of Project Gutenberg eBook #1342. 151 words a minute is the median pace of ten LibriVox readers in our audiobook length study. Volumes as in the 1813 edition on Wikisource".
- Note: the site's how-long post gives 13 hours 25 minutes for this book (LibriVox version 2's real runtime); the tile's 13 h 26 min is the computed time at 151 wpm, as research 3c gives it.

## 4. Who is speaking (stat tiles)

- Method: `who-is-speaking.html`, the same tiles: two value tiles with meters (bottom-aligned), and a wide tile with a thin segmented bar (8 px, 2 px gap) split 39:26, each count and name above its own segment; Elizabeth's segment coral, Jane's gray.

| Tile | On figure | Source |
|---|---|---|
| Dialogue | 46.8% "of the words are dialogue", meter 46.8% | 3d: 46.8% of the words inside quotation marks (57,027 of 121,850; includes quoted letters) |
| No speaker named | 61.5%, "754 of 1,227 speech paragraphs name no speaker", meter 61.5% | 3d: of 1,227 paragraphs opening with a quotation mark, 754 (61.5%) have no speaker name or speech verb outside the quotes |
| "Miss Bennet" | "Who “Miss Bennet” means, 65 times in the text": 39 times Jane, 26 times Elizabeth | 3e and notes.md: 65 uses assigned by hand, 39 Jane, 26 Elizabeth |

- Sources line: "Our count of the Project Gutenberg text (eBook #1342): words inside quotation marks; paragraphs that open with a quotation mark and have no speaker's name or speech verb outside it; each “Miss Bennet” read in context". The research's caveats (the heuristic misses names inside the quotes and counts letters' paragraphs as speech; recount the Miss Bennet split before publishing) are in the post's text, not on the image.

## 5. Read-along image (`pride-and-prejudice-audiobook-with-text.webp`)

- Recording: LibriVox **Pride and Prejudice (version 3)**, archive.org item `pride_prejudice_krs_librivox` (metadata read today: `title` "Pride and Prejudice (version 3)", `creator` "Jane Austen", runtime 10:23:00, licenseurl creativecommons.org/licenses/publicdomain, 61 files in each MP3 format). The 3rd Discover card for "pride and prejudice" in research 5a.
- Cover: `pride_and_prejudice3.jpg` from that item (JPEG original, 300x300, 60,035 bytes, SHA-1 adb5943f...16415f96dd9 as the item metadata lists, SHA-256 510acb49...b8ba451). It shows "Pride & Prejudice", "Jane Austen", "Read by Karen Savage", "LibriVox" and a ball-room illustration. The app's own cover URL (`archive.org/services/img/<id>`) serves the same picture at 180x180; same average colour.
- Chapter 29 of 61, length 805: computed with `ia_chapter_order.py`, which repeats `_chosenChapterFiles` and `_chaptersFrom` (D:\hushbook\lib\core\store\librivox_provider.dart, HEAD c0040d1): the 29th chapter in track order is `pride_and_prejudice_29_austen_64kb.mp3`, title "Chapter 29", 13:25 (VBR copy 805.09 s). "Chapter 29" is a generic title (`localizedChapterTitle`, `_chapterHeading` in player_screen.dart), so the running head shows the short form "CHAPTER XXIX" and no title; the shipped scene already does that, so no head or block changes were needed this time.
- Left phone (read-along): a copy of `ios-read-along` as `tools/mockups/scenes/_tmp-pp-read-along/`, shot `_tmp-pp-ra-warm` at t = 518.7, `theme: 'warm'` (Warm Paper). Changes in the copy only (full diff in `scripts/images/temp-scenes.patch`):
  - `CHAPTER`: all of Chapter XXIX of Project Gutenberg #1342 (fresh download, SHA-256 3f6bb9d6...5a216bcaf9d75, matching the research), set as a transcript reads by `gut_js.py`: no quotation marks (apostrophes kept; the inner ‘Lady Catherine,’ quote too), "--" and "----" read as commas, italics dropped, the two [Illustration] markers dropped. 42 paragraphs, 2,384 words. The whole chapter from its first line, so the page number is the scene's own.
  - `CHAPTER_LEN` 805, `CHAPTER_NUMBER` 29, `CHAPTER_NUMERAL` 'XXIX', `COVER_AVERAGE` `#96909E` (`cover_avg.py`; only the ambient look uses it), `BREATHS` empty, `alnum` widened to `\p{L}\p{N}` (carried over).
  - At t = 518.7 the page is 22 of 35 and the narrated group is "Do you play and sing, Miss Bennet? A little." (Lady Catherine's question and Elizabeth's answer, merged into one line by the app's regroup rule because "A little." is under six words), tinted, with "little." underlined at 45% of the phone's height (`probe-read-along.mjs`). The page also shows "Do your sisters play and sing? One of them does.", the same merge. This is the passage the post quotes ("In Chapter 29, Lady Catherine asks...", post.md line 187), and the "Miss Bennet" here is Elizabeth.
- Right phone (player): a copy of `player-cover` as `_tmp-pp-player/`, one BOOKS entry (`'pp-librivox-v3'`, title and author as the item's metadata gives them, `local: true`, cover in the temp folder's `assets/`) plus the one-line local-cover change. Vars: elapsed 518, length 805, chapter 29, chapters 61. Shows the cover, "Pride and Prejudice (version 3)", "Jane Austen", "5 min left in chapter", 08:38 and −04:47, Chapters "29 of 61", Read along.
- Rendered with `node tools/mockups/render.mjs --shot _tmp-pp-player,_tmp-pp-ra-warm --png` (sepia and ambient looks were tried first; warm shows the spoken line clearest).
- Composed with `compose_phones.py` (now with `--glow-left`): read-along 1010 px tall at (170, 40), player 930 px tall at (765, 148), glows mirrored. Visibly different from `can-kindle-read-to-you-read-along.webp` (player left, Chapter 1's opening page with its drop cap on the right): here the read-along leads on the left with a mid-chapter dialogue page, and the player sits on the right with the LibriVox version 3 cover. The bottom edge cuts below "does.", between line groups.
- Simplification, as before: word timings are the scene's formula, not Karen Savage's real timing, so 08:38 is the scene's position for that line, not a measured one.
- Cleanup: deleted `tools/mockups/scenes/_tmp-pp-player/`, `tools/mockups/scenes/_tmp-pp-read-along/`, `assets/img/mockups/_tmp-pp-player.webp`, `_tmp-pp-ra-sepia.webp`, `_tmp-pp-ra-ambient.webp`, `_tmp-pp-ra-warm.webp`, and `tools/mockups/out/en-_tmp-pp-*.png` (4 files). `git status` shows no `_tmp-pp` file; no tracked file under `tools/mockups/` or `assets/img/mockups/` was changed. The Wuthering Heights agent's `_tmp-wh-*` scenes were not touched.

## Scripts (`scripts/images/`)

- `render-html.mjs`: repo `playwright` and `sharp` via `createRequire('D:/hushbook.app/package.json')`, headless Chrome, sandbox on, deviceScaleFactor 2, WebP 84, overflow, font, 15 px and fit checks (fit message made generic).
- `picks-card.html`, `editions-figure.html`, `length-tiles.html`, `who-is-speaking.html`: the four HTML images.
- `compose_phones.py` (PIL composition, `--glow-left` added), `probe-read-along.mjs` (current word, its height and page at given t), `probe-lines.mjs` (new: every line group's page, start time and text, to choose t), `gut_js.py` (one chapter of #1342 as a transcript-style JS array), `patch_scene_text.py` (puts that array into the temp scene), `pp_chapter.py` (prints a chapter's paragraphs with word counts), `ia_meta.py`, `ia_files.py` (file entries by name), `ia_chapter_order.py` (the app's chapter order for an item), `cover_avg.py`, `preview760.py`. Python runs with `-I`; downloads were kept in their own scratchpad folder.
- `temp-scenes.patch`: the two temp scenes as a diff against `player-cover` and `ios-read-along`. To recreate: copy the two scenes to `_tmp-pp-player` and `_tmp-pp-read-along`, apply the patch, put the cover in `_tmp-pp-player/assets/`, write the two `shots.json` files (ids and vars above), render, compose, then delete the temp scenes and the runner's `_tmp-pp-*` outputs.

## Alt text

- **picks** (already in the embed): "Pride and Prejudice audiobooks, our picks: best overall, Rosamund Pike, Audible Studios, 11 h 35 min; runner-up, Juliet Stevenson, Naxos AudioBooks, 14 h 2 min; best free, Karen Savage, LibriVox version 3, 10 h 23 min; best dramatised, the 2025 Audible Original, a full-cast adaptation of 4 h 34 min. Beside the list, the HushBook player with the LibriVox cover of Pride and Prejudice (version 3)."
- **editions:** "Bar chart of 14 unabridged recordings of Pride and Prejudice, grouped by where each is sold and rated, bars starting at zero. Audible, with Audible US ratings: Carolyn Seymour, Blackstone, 11 h 28 min, 4.6 (1,902); Flo Gibson, Recorded Books, 11 h 28 min, 4.6 (252); Rosamund Pike, Audible Studios, 11 h 35 min, 4.8 (43,975), marked best overall; Lindsay Duncan, Audible Studios, 12 h 3 min, 4.7 (5,348); Emilia Fox, Naxos AudioBooks, 13 h 2 min, 4.7 (787); Indira Varma, Penguin Classics, 13 h 27 min with an introduction, 4.7 (195); Juliet Stevenson, Naxos AudioBooks, 14 h 2 min, 4.9 (204), marked runner-up. Apple Books and Libby, with Apple Books ratings: Kate Beckinsale, Apple, 11 h 43 min, 4.5 (8,598); Kate Reading, Books on Tape, 12 h 8 min, 4.2 (203); Katherine Kellgren, Duke Classics, 12 h 21 min. Free on LibriVox, with archive.org reviews: Karen Savage, version 3, 10 h 23 min, 4.25 (17), marked best free; Elizabeth Klett, version 4, 11 h 10 min, 4.91 (12); 26 readers, version 6, dramatic reading, 11 h 58 min, 5 (1); Annie Coleman Rothenberg, version 2, 13 h 25 min, 4.8 (5). Runtimes and ratings as listed by Audible US, Apple Books US, OverDrive, LibriVox and archive.org, read November 12, 2026."
- **length:** "How long Pride and Prejudice is: 121,676 words in the novel and 61 chapters in three volumes. At 151 words a minute it takes 13 hours 26 minutes to hear at 1x, 10 hours 45 minutes at 1.25x, 8 hours 57 minutes at 1.5x and 6 hours 43 minutes at 2x. The first edition of 1813 has Volume I with 23 chapters (chapters 1 to 23), Volume II with 19 (24 to 42) and Volume III with 19 (43 to 61). Counted from Project Gutenberg eBook #1342; volumes as in the 1813 edition on Wikisource."
- **who-is-speaking:** "Who is speaking in Pride and Prejudice: 46.8% of the words are dialogue; 61.5% of speech paragraphs, 754 of 1,227, name no speaker; and of the 65 times the text says Miss Bennet, it means Jane 39 times and Elizabeth 26 times. Our count of the Project Gutenberg text, eBook #1342."
- **audiobook-with-text:** "Two HushBook screens for the free LibriVox recording Pride and Prejudice (version 3), read by Karen Savage. Left: the read-along page of Chapter 29 in the warm paper theme, where Lady Catherine questions Elizabeth; the line Do you play and sing, Miss Bennet? A little. is tinted as it is spoken and the word little is underlined. Right: the player with the LibriVox cover, 8:38 into chapter 29 of 61."

## Check against post.md (draft of 12:02)

- Picks, runtimes, ratings, word count, chapters, volumes, listening times and the dialogue figures in the post match the images.
- **Mismatch, line 9 (editions alt):** it describes a 24-recording chart in one list with Audible US ratings only (Sharon Williams, Josephine Bailey, Jasmine Blackborow and others). The figure has the 14 table-8 recordings in three groups, with Apple Books ratings for Beckinsale and Kate Reading and archive.org reviews for the LibriVox versions. Use the editions alt above.
- **Mismatch, line 248 (read-along alt):** it describes Chapter 1 ("It is a truth universally acknowledged") on the right. The image shows Chapter 29 on the left (the Lady Catherine exchange the post quotes at line 187) and the player on the right. Use the alt above. Line 254 ("so in Chapter 1 you see every word of Mr. and Mrs. Bennet's exchange") is text, not an image claim, but "in Chapter 29 you see Lady Catherine's questions and Elizabeth's answers" would match the picture.
- Lines 74 and 181 (length and who-is-speaking alts) are correct but shorter than the images (no 1.25x to 2x times; no 754 of 1,227 or 65 total); the alts above are complete.
- Observation for line 252 ("one chapter per file, "Chapter 01" to "Chapter 61""): the item's file titles are not all uniform. File 5 is "Chapter 5", the 19th file is titled "Chapter 18" (the app shows it as Chapter 19, since a bare "Chapter N" title is replaced by the chapter's number), and files 26 and 33 are titled "Chatper 26" and "Chatper 33", which the app shows as written. First and last are "Chapter 01" and "Chapter 61", so the sentence holds as a range.
