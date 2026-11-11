# Images: best-crime-and-punishment-audiobook

Made 2026-11-11. Nothing stock or AI-generated: two HTML figures rendered with the repo's Playwright and one composition of real app renders. Same method and look as the Monte Cristo post of 2026-11-10 (memory note `blog-images`). All browser work headless, Chrome with `chromiumSandbox: true` (bundled Chromium as fallback; it was not needed). WebP quality 84.

## Files

| File | Pixels | Size | Made from |
|---|---|---|---|
| `assets/img/blog/crime-and-punishment-audiobook-editions.webp` | 1400x2256 | 185 KB (189,828 bytes) | `scripts/images/editions-figure.html`, rendered at 2x |
| `assets/img/blog/crime-and-punishment-audiobook-length.webp` | 1400x1092 | 66 KB (67,860 bytes) | `scripts/images/length-tiles.html`, rendered at 2x |
| `assets/img/blog/crime-and-punishment-read-along.webp` | 1400x900 | 68 KB (69,584 bytes) | two renders from temporary mockup scenes, composed with PIL |

Re-render a figure: `node scripts/images/render-html.mjs <figure.html> <out.webp> 700 auto` (fonts load from `D:/hushbook.app/tools/mockups/assets/fonts/`). The renderer reports font loading, overflow, text under 15 px and bar-label fit; all three images passed with no overflow and all text at 15 px or larger at 1x.

## 1. Editions figure (which translation each recording reads)

Data: `research-platforms.md` tables 1a (store editions), 2a (LibriVox) and 8 (ready-to-paste, VERIFIED rows only). Runtime = Audible's for store editions and LibriVox's own for the free versions, rounded to the minute exactly as table 8 rounds them. Bars start at zero on a 0 to 30 h axis; each group is sorted shortest first.

| Group (translation, year) | Bar label | Runtime on figure | Source value |
|---|---|---|---|
| Constance Garnett, 1914 | Alastair Cameron · A.R.N. Publications | 20 h 8 min | Audible 20 hrs 8 mins |
| | Anthony Heald · Blackstone | 20 h 28 min | Audible 20 hrs 28 mins |
| | James Anderson Foster · Brilliance Audio | 20 h 43 min | Audible 20 hrs 43 mins |
| | Keith Brown · Spotify Audiobooks | 21 h 20 min | Audible 21 hrs 20 mins |
| | Mark Nelson · Paperless | 21 h 50 min | Audible 21 hrs 50 mins |
| | Constantine Gregory · Naxos AudioBooks | 22 h 2 min | Audible 22 hrs 2 mins |
| | David Bendena · Dreamscape Media | 22 h 22 min | Audible 22 hrs 22 mins |
| | Will Poulter · Audible Studios | 22 h 27 min | Audible 22 hrs 27 mins |
| | David Rintoul · SNR Audio | 22 h 38 min | Audible 22 hrs 38 mins |
| | Walter Zimmerman · Jimcin Recordings | 23 h 21 min | Audible 23 hrs 21 mins |
| | Dick Hill · Tantor Audio | 23 h 44 min | Audible 23 hrs 44 mins |
| | Charlton Griffin · Audio Connoisseur | 24 h 19 min | Audible 24 hrs 19 mins |
| | George Guidall · Recorded Books | 25 h 1 min | Audible 25 hrs 1 min |
| | Alan Munro · Trout Lake Media | 25 h 4 min | Audible 25 hrs 4 mins |
| Garnett, sub-label "Free on LibriVox" | Expatriate · Version 2 | 19 h 53 min | LibriVox 19:52:38 |
| | 49 readers · Version 4, dramatic | 21 h 20 min | LibriVox 21:19:44 |
| | Mark Nelson · Version 3 (coral, "Best free") | 22 h 2 min | LibriVox 22:02:11 |
| | 14 readers · Version 1 | 23 h 26 min | LibriVox 23:26:07 |
| Richard Pevear and Larissa Volokhonsky, 1992 | Bill Homewood · Echo Point Books & Media, 2025 | 28 h 4 min | Audible 28 hrs 4 mins |
| Oliver Ready, 2014 | Don Warrington · Penguin Classics, 2020 | 25 h 2 min | Audible 25 hrs 2 mins (Penguin UK 1,502 minutes) |

- Translation per row: table 1a's translation column (store or publisher credit, or the Audible sample matched against Gutenberg #2554) and table 2a for LibriVox (`translators: Constance Garnett`). Translation years: Garnett 1914 and Ready 2014 (research-evidence master table); Pevear and Volokhonsky 1992 as LARB labels it (research-evidence conflict 3 allows "1992, first published"). Recording years 2020 (Penguin UK "Published: 23/04/2020") and 2025 (Audible 02-20-25) only on the two modern-translation rows.
- Left out on purpose: Peter Batchelor's P&V recording (Audible US 404, withdrawn), the abridged and radio editions, and the smaller unverified listings (Harry Shaw, Mary J., Teddy Garraway, Arthur Lane, Emma Bronks, Giuliano, machine voices). The figure shows no total count, since those listings exist.
- Short publisher names: "Brilliance Audio" for the AmazonClassics Edition, "Penguin Classics" for Penguin Classics (Penguin Audio). Mark Nelson appears twice (Paperless and LibriVox Version 3): table 1a says whether they are the same recording is UNVERIFIED, so they are separate rows.
- Design (dataviz skill): one series, so no legend; the translator headings carry identity. Neutral bars `#655E57` with paper text (5.5:1), the free pick in coral `#E8613F` with ink text (5.8:1) and the "Best free" tag as a second, non-colour cue. 24 px bars, 4 px rounded data end, value at each tip, no gridlines, hairline axis with ticks every 5 h. Validator (`--mode dark --surface #0B0A09`, `#E8613F,#655E57`): lightness, CVD (protan ΔE 11.7), normal-vision ΔE 23.7 and contrast pass; the chroma floor fails for the gray, as intended for a de-emphasis gray (same as 2026-11-10).
- Heading: "Crime and Punishment, unabridged: which translation each recording reads". Sources line: "Translations from store, publisher and LibriVox credits, or from Audible samples matched to Project Gutenberg #2554. Runtimes as listed by Audible and LibriVox, read November 11, 2026".

## 2. Length tiles

Data: `research-evidence.md` section (b)2 only.

| Tile | Value | Source |
|---|---|---|
| Words | 203,197 "in the novel, without preface or notes" | Count 5 of the English word-count table (novel only, without the translator's preface, footnotes and heading words), Gutenberg #2554 |
| Chapters | 41 "in six parts and an epilogue" | Parts table: 7, 7, 6, 6, 5, 8 plus Epilogue I and II |
| 1x | 22 h 26 min | 1,345.7 min at 151 wpm |
| 1.25x | 17 h 57 min | 1,076.5 min |
| 1.5x | 14 h 57 min | 897.1 min |

- The page computes the three times from 203,197 / 151 / speed and rounds to the minute; they match the research table. Each speed tile has an 8 px meter whose coral fill is that time as a share of the 1x time (100%, 80%, 67%) on a paper-tinted track.
- Heading "How long Crime and Punishment is, in Constance Garnett's translation" and the row label "Listening time at 151 words a minute" keep the times tied to the Garnett text (research-evidence "Do not claim" 13: not a runtime for any modern-translation edition).
- Sources line: "Our count of Project Gutenberg eBook #2554 (Constance Garnett, 1914). 151 words a minute is the median pace of ten LibriVox readers in our audiobook length study" (the study is `content/blog/how-long-is-an-audiobook.md`, lines 5 and 39).
- Single accent: coral only on the tile dashes and meter fills; values and labels in paper tokens.

## 3. Read-along image

- Left phone: a copy of `player-cover` as `tools/mockups/scenes/_tmp-cp-player/`, with one BOOKS entry (`local: true`, cover from the temp folder's own `assets/`) and the one-line change that loads a local cover. Vars: elapsed 10, length 1283, chapter 2 of 41. Shows the cover, "Crime and Punishment (Version 3)", "Fyodor Dostoyevsky", "22 min left in chapter", 00:10 and −21:13, Chapters "2 of 41", and the Read along button.
  - Title and author are the item's metadata `title` and `creator`, which Discover imports unchanged (no title cleaning in `D:\hushbook\lib\core\store`).
  - Cover: `crimepunishment_1708.jpg` from archive.org item `crime_punishment_3_1708_librivox` (LibriVox Version 3, licence field Public Domain Mark 1.0), 300x300, 40,867 bytes as in the item metadata (SHA-256 d4ff4f93...3a01c4c8). The app's own cover URL is `archive.org/services/img/<id>`, the same item image at thumbnail size.
  - Chapter 2 of 41 and length 1283: the item has 41 64 kbps files; the first is "00 - Preface", the second `crimepunishment_01_dostoyevsky_64kb.mp3`, title "01 - Part 1 Chapter 1", length 21:23 (128 kbps copy: 1283.29 s). The player numbers chapters as `chapter.ordinal + 1` (`player_screen.dart:2144`), so Part 1, Chapter 1 is chapter 2. Checked again on the coordinator's question ("CHAPTER II" looks like a mistake): `_chaptersFrom` keeps every chosen file in track order with `index: i` (`librivox_provider.dart:354-376`, no preface filter), the import stores `chapterIndex: Value(i)` (`store_import_service.dart:354`), and the preface is track 1, so the app does print "CHAPTER II" and "II ·" over "01 - Part 1 Chapter 1". Image left as rendered.
- Right phone: a copy of `ios-read-along` as `tools/mockups/scenes/_tmp-cp-read-along/`, shot at t = 10, `theme: 'warm'` (Warm Paper). Changes in the copy only (full diff: `scripts/images/temp-scenes.patch`, made against the shipped scenes):
  - `CHAPTER`: the first three paragraphs of Part I, Chapter I of Project Gutenberg #2554 ("On an exceptionally hot evening early in July ..." to "... slip out unseen."), from a fresh download whose SHA-256 (4a84a709...1297eb688) matches `research-evidence.md`. Only the first paragraph and a half are on screen.
  - `CHAPTER_TITLE = '01 - Part 1 Chapter 1'` (the file title above), with the chapter-block title and running-head fit rule carried over from the 2026-11-10 temp scene: the block reads "CHAPTER II" over "01 - Part 1 Chapter 1", the running head "II · 01 - PART 1 CHAPTER 1" on one line.
  - `CHAPTER_NUMBER` 2, `CHAPTER_NUMERAL` 'II', `CHAPTER_LEN` 1283, `COVER_AVERAGE` `#B86D25` (16 px wide decode of the cover; only the ambient look uses it), `BREATHS` set for this text, `alnum` widened to `\p{L}\p{N}` (carried over).
  - One deviation from the app, flagged: Garnett's initials "S." and "K." are read through, not treated as sentence ends. The shipped regroup (`alignment_pipeline.dart` `_computeBreaks`) cuts a line after any word ending in "."; on the Gutenberg text that put "Place and walked slowly" on its own line after "in S.", which reads like a bug. A real transcript of Mark Nelson's reading may print the initials differently, so the image keeps the app's look for ordinary sentences and drops that one artefact.
  - At t = 10 the current word is "towards", underlined at 58% of the phone's height, page 1 of 5, in the line "as though in hesitation, towards K. bridge."; the words before it in the line are tinted.
- Rendered with `node tools/mockups/render.mjs --shot _tmp-cp-ra-ambient,_tmp-cp-ra-warm,_tmp-cp-player --png` (an ambient variant was rendered too; warm was picked to match the Monte Cristo image).
- Composed with `scripts/images/compose_phones.py`: 1400x900 ink canvas, coral glows, drop shadows, left phone 1000 px tall at (175, 130), right phone 1060 px tall at (715, 50), the same placement as 2026-11-10.
- Simplification, as in the earlier posts: the page starts at the novel's first sentence. The real chapter file opens with the spoken LibriVox preamble, which a HushBook transcript would also show.
- Cleanup: deleted `tools/mockups/scenes/_tmp-cp-player/`, `tools/mockups/scenes/_tmp-cp-read-along/`, `assets/img/mockups/_tmp-cp-player.webp`, `_tmp-cp-ra-ambient.webp`, `_tmp-cp-ra-warm.webp`, and `tools/mockups/out/en-_tmp-cp-*.png`. No tracked file under `assets/img/mockups/` or `tools/mockups/` was changed.

## Scripts (`scripts/images/`)

- `render-html.mjs`: repo `playwright` and `sharp` via `createRequire('D:/hushbook.app/package.json')`, headless Chrome, sandbox on, deviceScaleFactor 2, WebP 84, with the overflow, font, 15 px and bar-fit checks.
- `editions-figure.html`, `length-tiles.html`: the two figures.
- `compose_phones.py` (PIL composition), `probe-read-along.mjs` (current word and its height per t in a temp scene), `ia_meta.py` (cover and chapter files from archive.org metadata), `gut_js.py` (Part I, Chapter I paragraphs of Gutenberg #2554 as a JS array), `cover_avg.py` (cover average colour), `preview760.py` (760 px readability previews). Python runs with `-I`.
- `temp-scenes.patch`: the two temp scenes as a diff against `player-cover` and `ios-read-along`, to recreate them (plus the cover in `_tmp-cp-player/assets/` and the two `shots.json` files: `_tmp-cp-player` with the vars above; `_tmp-cp-ra-ambient` and `_tmp-cp-ra-warm` at t = 10, the second with `theme: warm`).

## Alt text

- **editions:** "Bar chart of 20 unabridged English recordings of Crime and Punishment, grouped by the translation each one reads, bars starting at zero. Constance Garnett's 1914 translation: Alastair Cameron, A.R.N. Publications, 20 h 8 min; Anthony Heald, Blackstone, 20 h 28 min; James Anderson Foster, Brilliance Audio, 20 h 43 min; Keith Brown, Spotify Audiobooks, 21 h 20 min; Mark Nelson, Paperless, 21 h 50 min; Constantine Gregory, Naxos AudioBooks, 22 h 2 min; David Bendena, Dreamscape Media, 22 h 22 min; Will Poulter, Audible Studios, 22 h 27 min; David Rintoul, SNR Audio, 22 h 38 min; Walter Zimmerman, Jimcin Recordings, 23 h 21 min; Dick Hill, Tantor Audio, 23 h 44 min; Charlton Griffin, Audio Connoisseur, 24 h 19 min; George Guidall, Recorded Books, 25 h 1 min; Alan Munro, Trout Lake Media, 25 h 4 min; and free on LibriVox, Expatriate, Version 2, 19 h 53 min; 49 readers, Version 4 dramatic, 21 h 20 min; Mark Nelson, Version 3, 22 h 2 min, marked best free; 14 readers, Version 1, 23 h 26 min. Richard Pevear and Larissa Volokhonsky's 1992 translation: Bill Homewood, Echo Point Books & Media, 2025, 28 h 4 min. Oliver Ready's 2014 translation: Don Warrington, Penguin Classics, 2020, 25 h 2 min. Translations from store, publisher and LibriVox credits or Audible samples matched to Project Gutenberg #2554; runtimes as listed by Audible and LibriVox, read November 11, 2026."
- **length:** "Crime and Punishment in Constance Garnett's translation: 203,197 words in the novel and 41 chapters in six parts and an epilogue. At 151 words a minute it takes 22 hours 26 minutes to hear at 1x, 17 hours 57 minutes at 1.25x and 14 hours 57 minutes at 1.5x. Counted from Project Gutenberg eBook #2554."
- **read-along:** "Two HushBook screens for the free LibriVox recording Crime and Punishment (Version 3): the player with the LibriVox cover at the start of chapter 2 of 41, with a Read along button, and the read-along page in the warm paper theme showing the opening of Part 1, Chapter 1, where the words already read are tinted red and the word being spoken, towards, is underlined."
