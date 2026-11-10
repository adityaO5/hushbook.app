# Images: best-count-of-monte-cristo-audiobook

Made 2026-11-10. Nothing stock or AI-generated: one composition of real app renders and two HTML figures rendered with the repo's Playwright. Method as in the focus, Spanish and Kindle posts (memory note `blog-images`). All browser work headless, Chrome with `chromiumSandbox: true`.

## Files

| File | Size | Made from |
|---|---|---|
| `assets/img/blog/count-of-monte-cristo-audiobook-runtimes.webp` | 1400x1600, 127 KB | `runtimes-chart.html`, rendered at 2x |
| `assets/img/blog/count-of-monte-cristo-audiobook-read-along.webp` | 1400x900, 58 KB | two renders from temporary mockup scenes, composed with PIL |
| `assets/img/blog/count-of-monte-cristo-aliases.webp` | 1400x1650, 115 KB | `aliases-figure.html`, rendered at 2x |

## Runtimes chart

Data: `research-evidence.md`, master table rows 1 to 17. Runtime = the value used in the words-per-minute table of section 3 (first-listed or publisher value). Arthur Lane and Juliette Martin are not in that table, so their value is the master table's first-listed one (Audible). LibriVox seconds are kept for bar length and dropped in the label.

| Narrator | Label on chart | Runtime plotted | Source value |
|---|---|---|---|
| Richard Matthews | Random House Audio | 43 h 18 min | PRH "43 Hours 18 Minutes" |
| Peter Batchelor | Trout Lake Media | 43 h 52 min | Audible |
| Philippe Duquenoy | Goffin Media | 45 h 4 min | Audible |
| John Lee (Best paid) | Blackstone | 46 h 56 min | Audible |
| Teddy Garraway | NTMC | 48 h 37 min | Audible |
| Arthur Lane | Lantern Audio | 49 h 28 min | Audible (master table) |
| LibriVox volunteers | version 1 | 49 h 43 min | LibriVox 49:43:15 |
| LibriVox volunteers | version 2 | 49 h 48 min | LibriVox 49:48:19 |
| Christopher Tester | Spotify Audiobooks | 50 h 20 min | Audible |
| Andrew Timothy | RNIB | 50 h 44 min | Audible |
| David Rintoul | SNR Audio | 50 h 48 min | Audible |
| Bill Homewood | Naxos AudioBooks | 52 h 41 min | Naxos page (Audible prints the same) |
| B.J. Harrison | Classic Tales Edition | 52 h 41 min | Audible |
| Juliette Martin | Dahmani Limited | 52 h 43 min | Audible (master table) |
| David Clarke (Best free) | LibriVox version 3 | 54 h 16 min | LibriVox 54:16:11 |
| Guy Mott | Brilliance Audio | 55 h 37 min | Audible |
| Alan Munro | Trout Lake Media | 57 h 20 min | Audible |

- Sorted shortest to longest; the Homewood and Harrison tie keeps master-table order.
- Short labels: "Blackstone" for Audible's "Blackstone Publishing" / Apple's "Blackstone Audio, Inc."; "Classic Tales Edition" for the Harrison listing (Audible publisher field "B.J. Harrison"); "Brilliance Audio" for the AmazonClassics Edition; "Lantern Audio" for "Lantern Audio LLC".
- Design (dataviz skill): one series, so no legend. Bars start at a zero baseline on a 0 to 60 h axis, 24 px tall, 4 px rounded data end. Neutral bars `#655E57` with paper text inside (5.5:1); the two picks in coral `#E8613F` with ink text inside (5.8:1) and the tag right-aligned in the bar. Value at each bar tip. No gridlines (every bar carries its value); hairline axis with ticks. Validator (`--mode dark --surface #0B0A09`, `#E8613F,#655E57`): lightness, CVD (protan ΔE 11.7), normal-vision ΔE 23.7 and contrast pass; the chroma floor fails for the gray, as intended for a de-emphasis gray. All text 15 px or larger at 1x; a script check confirms every label fits inside its bar.
- Heading: "The Count of Monte Cristo, unabridged: how long each recording runs". Sources line: "Runtimes as listed by Audible, Penguin Random House and LibriVox, read November 10, 2026".

## Read-along image

- Left phone: a copy of `player-cover` as `tools/mockups/scenes/_tmp-mc-player/`, with one BOOKS entry (`local: true`, cover from the temp folder's own `assets/`) and one line so a local cover loads. Vars: elapsed 10, length 1344, chapter 1 of 117. Shows the cover, "The Count of Monte Cristo", "Alexandre Dumas", "23 min left in chapter", 00:10 and −22:14, Chapters "1 of 117".
  - Cover: `Count_of_Monte_Cristo_1308.jpg` from archive.org item `count_montecristo_1308_librivox` (LibriVox version 3, licence field CC0), 300x300, 92,993 bytes as in the item metadata. The words "read by David Clarke" are printed on the cover art itself; the app adds no narrator label on this screen.
  - Length 1344 s and 117 chapters: the item's file `countofmontecristo_001_dumas.mp3` has length 1343.75 s, and the item has 117 chapter files.
- Right phone: a copy of `ios-read-along` as `tools/mockups/scenes/_tmp-mc-read-along/`, shot at t = 10, `theme: 'warm'` (Warm Paper). Changes in the copy only:
  - `CHAPTER`: the first five paragraphs of chapter 1 of Project Gutenberg #1184 ("On the 24th of February, 1815, ..." to "... La Réserve basin."), from the researcher's copy `pg1184.txt` (SHA-256 99245b8f...fd623f9c, same as `research-evidence.md`). Italic underscores removed, since a transcript has no italics.
  - `CHAPTER_TITLE = '001 - Marseilles - The Arrival'`: the archive.org title of that chapter file. The app's Discover import stores the file title as the chapter title (`librivox_provider.dart` `_chaptersFrom`, `store_import_service.dart`), and the read-along shows it: `ChapterBlock` draws it under "CHAPTER I" (Newsreader, 1.32 em, w420), and the running head uses its full form "I · 001 - MARSEILLES - THE ARRIVAL", here on two balanced lines (`running_head.dart` fit rule). The temp copy gained that title and the fit rule; the shipped scene has neither.
  - `CHAPTER_LEN` 1344, `COVER_AVERAGE` `#3B3B3B` (16 px wide decode of the cover), `BREATHS` set for this text, `alnum` widened to `\p{L}\p{N}` for Château, Phocée, Pomègue.
  - At t = 10 the current word is "pilot" at 58% of the phone's height, page 1 of 5, in the line "As usual, a pilot put off immediately, and rounding the Château d’If, got on board the vessel between Cape Morgiou and Rion island."
- Rendered with `node tools/mockups/render.mjs --shot _tmp-mc-ra-ambient,_tmp-mc-ra-warm,_tmp-mc-player --png` (an ambient variant was rendered too; warm was picked because the spoken words and underline read better at blog width).
- Composed with `compose_phones.py`: 1400x900 ink canvas, coral glows, drop shadows, left phone 1000 px tall at (175, 130), right phone 1060 px tall at (715, 50), WebP quality 84.
- Cleanup: deleted `tools/mockups/scenes/_tmp-mc-player/`, `tools/mockups/scenes/_tmp-mc-read-along/`, `assets/img/mockups/_tmp-mc-player.webp`, `_tmp-mc-ra-ambient.webp`, `_tmp-mc-ra-warm.webp`, and `tools/mockups/out/en-_tmp-mc-*.png`. No tracked file under `assets/img/mockups/` was rewritten.
- Simplification, as in the earlier posts: the page starts at the novel's first sentence. The real chapter file opens with the spoken LibriVox preamble, which a HushBook transcript would also show.

## Aliases figure

Data: `research-evidence.md` section 6 (first chapter where each name appears in Gutenberg #1184). Ordered by chapter.

| Chapter | Name | Line on the figure |
|---|---|---|
| 1 | Edmond Dantès | The Pharaon’s young mate, engaged to Mercédès |
| 25 | Lord Wilmore | English alias used to buy his father’s old house |
| 26 | Abbé Busoni | Italian priest who visits Caderousse; first named in chapter 43 |
| 28 | Chief clerk of Thomson & French | Englishman who buys up Morrel’s debts |
| 29 | Sinbad the Sailor | Signs a letter to Julie Morrel; meets Franz in chapter 31 |
| 33 | The Count of Monte Cristo | The wealthy, mysterious count of Rome and Paris |
| 69 | Monsieur Zaccone | The family name Abbé Busoni gives the police envoy for the count |

- Heading: "Edmond Dantès and his aliases, by the chapter where each name first appears". Small line: "Chapter numbers from the Project Gutenberg text (eBook #1184)".
- Newsreader names, Inter chapter numbers and lines, ink background, paper text, coral only on the markers (a ring for Dantès, dots for the aliases) along one hairline spine. All text 15 px or larger at 1x.
- Spoilers: every alias row is an identity spoiler per section 6. Place the figure where the post already discusses the aliases.

## Scripts and sources (scratchpad, session temp, not in the repo)

`C:\Users\rakes\AppData\Local\Temp\claude\34842c9e8e99357b\79be317d-7c26-4857-84db-69018ba4c3a5\scratchpad\montecristo-images\`

- `work\runtimes-chart.html`, `work\aliases-figure.html`: the figures (fonts from `file:///D:/hushbook.app/tools/mockups/assets/fonts/`). Re-render with `node scripts\render-html.mjs <figure.html> <out.webp> 700 auto`.
- `scripts\render-html.mjs`: repo `playwright` and `sharp` via `createRequire('D:/hushbook.app/package.json')`, headless Chrome, sandbox on, deviceScaleFactor 2, WebP 84; reports fonts, overflow, text under 15 px and bar-label fit.
- `scripts\compose_phones.py`, `scripts\probe-read-along.mjs` (current word position per t), `scripts\ia_meta.py`, `scripts\gut_js.py`, `scripts\cover_avg.py`, `scripts\preview760.py` (760 px readability previews).
- `work\scene-_tmp-mc-read-along\`, `work\scene-_tmp-mc-player\`: copies of the temp scenes; `work\en-_tmp-mc-*.png`: the renders, for re-composing.
- `dl-cover\Count_of_Monte_Cristo_1308.jpg`: the downloaded cover.

## Alt text

- **runtimes:** "Bar chart of the unabridged runtimes of 17 English recordings of The Count of Monte Cristo, shortest to longest, bars starting at zero: Richard Matthews, Random House Audio, 43 h 18 min; Peter Batchelor, Trout Lake Media, 43 h 52 min; Philippe Duquenoy, Goffin Media, 45 h 4 min; John Lee, Blackstone, 46 h 56 min, marked best paid; Teddy Garraway, NTMC, 48 h 37 min; Arthur Lane, Lantern Audio, 49 h 28 min; LibriVox volunteers version 1, 49 h 43 min; LibriVox volunteers version 2, 49 h 48 min; Christopher Tester, Spotify Audiobooks, 50 h 20 min; Andrew Timothy, RNIB, 50 h 44 min; David Rintoul, SNR Audio, 50 h 48 min; Bill Homewood, Naxos AudioBooks, 52 h 41 min; B.J. Harrison, Classic Tales Edition, 52 h 41 min; Juliette Martin, Dahmani Limited, 52 h 43 min; David Clarke, LibriVox version 3, 54 h 16 min, marked best free; Guy Mott, Brilliance Audio, 55 h 37 min; Alan Munro, Trout Lake Media, 57 h 20 min. Runtimes as listed by Audible, Penguin Random House and LibriVox, read November 10, 2026."
- **read-along:** "Two HushBook screens for the free LibriVox recording of The Count of Monte Cristo read by David Clarke: the player with the LibriVox cover at the start of chapter 1 of 117, with a Read along button, and the read-along page in the warm paper theme showing the opening of chapter 1, where the words already read are tinted red and the word being spoken, pilot, is underlined."
- **aliases:** "Edmond Dantès and his aliases, by the chapter where each name first appears in the Project Gutenberg text: Edmond Dantès, chapter 1, the Pharaon's young mate; Lord Wilmore, chapter 25, the English alias he uses to buy his father's old house; Abbé Busoni, chapter 26, an Italian priest who visits Caderousse, first named in chapter 43; the chief clerk of Thomson & French, chapter 28, who buys up Morrel's debts; Sinbad the Sailor, chapter 29, who signs a letter to Julie Morrel and meets Franz in chapter 31; the Count of Monte Cristo, chapter 33; Monsieur Zaccone, chapter 69, the family name Abbé Busoni gives the police for the count."
