# Images: best-war-and-peace-audiobook

Made 2026-11-11, repeating the image set the owner approved for the Crime and Punishment post the same day (`../2026-11-11-best-crime-and-punishment-audiobook/notes-images.md`): same scripts, same tokens, fonts and layout, new data. Nothing stock or AI-generated: three HTML figures rendered with the repo's Playwright and one composition of real app renders. All browser work headless, Chrome with `chromiumSandbox: true` (bundled Chromium as fallback; it was not needed). WebP quality 84. Every name and number comes from `research-platforms.md` and `research-evidence.md` in this folder (VERIFIED values only).

## Files

| File | Pixels | Size | Made from |
|---|---|---|---|
| `assets/img/blog/war-and-peace-audiobook-picks.webp` | 1400x788 | 79 KB (80,964 bytes) | `scripts/images/picks-card.html` with the player render, rendered at 2x |
| `assets/img/blog/war-and-peace-audiobook-editions.webp` | 1400x1884 | 151 KB (154,906 bytes) | `scripts/images/editions-figure.html`, rendered at 2x |
| `assets/img/blog/war-and-peace-audiobook-length.webp` | 1400x1080 | 64 KB (65,260 bytes) | `scripts/images/length-tiles.html`, rendered at 2x |
| `assets/img/blog/war-and-peace-read-along.webp` | 1400x900 | 69 KB (70,178 bytes) | two renders from temporary mockup scenes, composed with PIL |

Re-render a figure: `node scripts/images/render-html.mjs <figure.html> <out.webp> 700 auto` (picks card: `700 394`). The renderer reports font loading, overflow, text under 15 px and label fit. All four images: no overflow (the picks card's only flag is the phone running past the bottom edge, as intended), every text at 15 px CSS or larger, so 30 px or larger in the 1400 px files. Each was viewed at full size and at the blog's 760 px display width (`preview760.py`).

Fix made on the way: the figures' label-fit check is now a getter, so it measures after the web fonts load. The Crime and Punishment copy computed it at script time, on the fallback font, which under-measured by about 10 px; it showed up here on the longest bar label (see image 2).

## 1. Picks card (lead image, the post's `hero`)

- Method: `picks-card.html`, a 700x394 page rendered at 2x. Left: the player render from the temp scene of image 4 (`en-_tmp-wp-player.png`, copied next to the HTML as `phone-player.png`), 470 px tall at (44, 30) CSS, overflowing the bottom edge, drop shadow. Right: heading "War and Peace audiobooks: our picks" in Newsreader 26 px, four rows: coral label (Inter 15 px semibold), name in Newsreader 22 px, details in Inter 15 px. Same layout as the Crime and Punishment card; to fit four rows instead of three the gaps were tightened (rows 5 px padding, heading 6 px below), with no text made smaller than before. Coral only on the four labels. No logo, no tagline, no em or en dashes.
- Data (research-platforms.md section 7 and tables 1a, 2a and 8):

| Label | Name | Details on the card | Source |
|---|---|---|---|
| Best overall | Thandiwe Newton | Audible Studios · 60 h 14 min | Audible 60 hrs 14 mins (table 1a row 1) |
| Best to borrow | Neville Jason | Naxos AudioBooks · 2 volumes · 61 h 43 min | Audible Vol. 1 30 hrs 19 mins + Vol. 2 31 hrs 24 mins (1a row 2, 1d) |
| Best free | Mark Nelson | LibriVox Volumes 1 to 4 · 62 h 27 min | LibriVox 14:34:37 + 16:08:33 + 17:00:19 + 14:43:44 = 62:27:13 (2a) |
| Best modern translation | Penguin Classics | Anthony Briggs · 5 readers · 67 h 13 min | Audible 67 hrs 13 mins; Penguin UK 4,034 minutes; five credited readers (1a row 5, 1d) |

- The phone shows the volume the reader starts with: "War and Peace, Volume 1 (Maude translation)", Leo Tolstoy, chapter 1 of 68 (details under image 4).
- Wiring note: `registry-entry.mjs` sets `hero: 'war-and-peace-picks'`, which `scripts/build-blog.js` reads as `content/blog/embeds/war-and-peace-picks.html`. That embed does not exist yet; copy `embeds/crime-and-punishment-picks.html` with `src="/assets/img/blog/war-and-peace-audiobook-picks.webp"`, `width="1400" height="788"` and the alt text below.

## 2. Editions figure (which translation each recording reads)

- Method: `editions-figure.html`, the Crime and Punishment figure with new data. Groups by translation, oldest first; each group sorted shortest first; bars from zero on a 0 to 70 h axis (530 px), ticks every 10 h, value at each tip, no gridlines. Multi-volume recordings show their total and say so in the label.
- Design (dataviz skill, loaded first): one series, so no legend; translator headings carry identity. Neutral bars `#655E57` with paper text, the free pick in coral `#E8613F` with ink text and the "Best free" tag as a second, non-colour cue. Validator (`--mode dark --surface #0B0A09`, `#E8613F,#655E57`): lightness, CVD (protan ΔE 11.7), normal-vision ΔE 23.7 and contrast pass; the chroma floor fails for the gray, as intended for a de-emphasis gray (same result as the approved figure).
- Data: research-platforms.md table 1a (all twelve VERIFIED complete, human-read, single-title recordings on sale), 1c (translation by sample, with store and publisher credits), 2a (LibriVox) and 8. Runtimes are Audible's for store editions and LibriVox's own for the free sets, rounded to the minute as table 8 rounds them.

| Group (translation, year) | Bar label | On figure | Source value | Translation evidence |
|---|---|---|---|---|
| Constance Garnett, 1904 | Frederick Davidson · Blackstone | 61 h 6 min | Audible 61 hrs 6 mins | OverDrive and Kobo credit; sample 81%, 98% on first 250 words |
| Louise and Aylmer Maude, 1922 to 1923 | Christopher Preece · Montgomery Providence | 50 h 39 min | Audible 50 hrs 39 mins | sample 82.1% |
| | Edoardo Ballerini · Brilliance Audio | 55 h 30 min | Audible 55 hrs 30 mins | Audible credit; sample 84.4% |
| | Philippe Duquenoy · Goffin Media | 56 h 45 min | Audible 56 hrs 45 mins | sample 93.0% |
| | Keith Brown · Spotify Audiobooks | 57 h 47 min | Audible 57 hrs 47 mins | sample 87.8% |
| | Jonathan Keeble · SNR Audio | 59 h 5 min | Audible 59 hrs 5 mins | Kobo credit; sample 81.2% |
| | Thandiwe Newton · Audible Studios | 60 h 14 min | Audible 60 hrs 14 mins | Audible credit; sample 84.3% |
| | Neville Jason · Naxos AudioBooks, 2 volumes | 61 h 43 min | Audible 30 hrs 19 mins + 31 hrs 24 mins | Naxos credit and booklet; samples 87.8% / 96.2% |
| | Sam Kusi · Lauscher Audiobooks | 62 h 31 min | Audible 62 hrs 31 mins | sample 88.9% |
| | Alan Munro · Trout Lake Media | 66 h 50 min | Audible 66 hrs 50 mins | Audible credit; sample 69.4% on first 250 words |
| | Zach Barrett · NTMC | 67 h 33 min | Audible 67 hrs 33 mins | sample 88.6% |
| Maude, sub-label "Free on LibriVox" | Mark Nelson · Volumes 1 to 4 (coral, "Best free") | 62 h 27 min | LibriVox 62:27:13 | LibriVox credit, Gutenberg #2600 |
| | 85 readers · Books 1 to 17 | 64 h 36 min | LibriVox 64:36:04 | LibriVox credit, Gutenberg #2600 |
| Anthony Briggs, 2005 | 5 readers · Penguin Classics, 2020 | 67 h 13 min | Audible 67 hrs 13 mins | Audible and Penguin UK credits; sample matches no public-domain text |

- Translation years from research-evidence.md (c)1: Garnett 1904, Maude 1922 to 1923, Briggs 2005 (conflict 8: use 2005). Recording year 2020 only on the modern-translation row (Penguin UK "Published: 30/04/2020"), as on the Crime and Punishment figure.
- Short publisher names: "Brilliance Audio" for the AmazonClassics Edition (as before) and **"Montgomery Providence" for Montgomery Providence Publishing**: the full name needs 408 px measured with the loaded fonts and Preece's bar is 383 px; widening the plot enough would push the longest value label into the right margin. "5 readers" stands for Chloe Pirrie, Sam Woolf, Michael Fox, Olivia Darnley and Terence Wilton.
- Left out on purpose: the LibriVox Dole set (stops halfway, so not complete), the abridged and dramatised versions (1b), and the 1e listings that were not checked enough to recommend (Harry Shaw, labelled abridged; Ella Porter, first part only; Peter Silverleaf, books sold separately; the Virtual Voice editions; the Apple- and Kobo-only listings, including Mark Nelson's Parolita Libro release, which may or may not be the LibriVox recording). The figure shows no total count, since those listings exist.
- Heading: "War and Peace, unabridged: which translation each recording reads". Sources line: "Translations from store, publisher and LibriVox credits, and from Audible samples matched to the Maude and Garnett texts. Runtimes as listed by Audible and LibriVox, read November 11, 2026".

## 3. Length tiles

- Method: `length-tiles.html`, the Crime and Punishment tiles with a fourth speed. The speed row is four tiles across (value 28 px, units 15 px) instead of three; each has an 8 px meter whose coral fill is that time as a share of the 1x time (100%, 80%, 67%, 50%). Single accent: coral only on the tile dashes and meter fills.
- Data: research-evidence.md section (b)2 only.

| Tile | Value | Source |
|---|---|---|
| Words | 561,870 "in the novel" | The site's published figure for Gutenberg #2600 (`content/blog/how-long-is-an-audiobook.md` line 36), which research-evidence (a)1, (h)13 and "Do not claim" 4 say to keep. Our own count with the sibling rules is 562,416; every time below is the same to the minute with either |
| Chapters | 365 "in fifteen books and two epilogues" | Structure table: Maude's 15 Books plus First and Second Epilogue, 365 chapters (the Russian has 361; "Do not claim" 1) |
| 1x | 62 h 1 min | 561,870 / 151 = 3,721.0 min; table row "151 wpm, site's 561,870 words": 62 h 01 min |
| 1.25x | 49 h 37 min | 2,976.8 min; table: 49 h 37 min |
| 1.5x | 41 h 21 min | 2,480.7 min; table: 41 h 21 min |
| 2x | 31 h 0 min | 1,860.5 min; table: 31 h 00 min |

- The page computes the four times from 561,870 / 151 / speed and rounds to the minute; they match the research table.
- Heading "How long War and Peace is, in the Maudes’ translation" and the row label "Listening time at 151 words a minute" tie the times to the Maude text ("Do not claim" 16: not a runtime for any commercial edition or other translation).
- Sources line: "Our count of Project Gutenberg eBook #2600 (Louise and Aylmer Maude). 151 words a minute is the median pace of ten LibriVox readers in our audiobook length study" (the study is `content/blog/how-long-is-an-audiobook.md`, lines 5 and 39). No year beside #2600: Gutenberg does not say whether it is the 1922 to 1923 text or the 1933 revision ("Do not claim" 15).

## 4. Read-along image

- The volume the reader starts with: LibriVox **War and Peace, Volume 1 (Maude translation)**, archive.org item `war_peace1_maude_translation_2212_librivox` (metadata read today: `title` "War and Peace, Volume 1 (Maude translation)", `creator` "Leo Tolstoy", runtime 14:34:37, 68 files in each MP3 format). It was the 7th Discover card for "war and peace" in research-platforms.md 5a (positions follow downloads and drift).
- Left phone: a copy of `player-cover` as `tools/mockups/scenes/_tmp-wp-player/`, one BOOKS entry (`local: true`, cover from the temp folder's own `assets/`) plus the one-line change that loads a local cover. Vars: elapsed 10, length 872, chapter 1, chapters 68. Shows the cover, "War and Peace, Volume 1 (Maude translation)", "Leo Tolstoy", "15 min left in chapter", 00:10 and −14:22, Chapters "1 of 68", and the Read along button.
  - Title and author are the item's `title` and `creator`, which Discover imports unchanged (`store_import_service.dart:382-383`).
  - Cover: `warandpeacevolume1_2212.jpg` from that item (the file the item lists as JPEG original), 300x300, 29,495 bytes as in the item metadata, SHA-256 3b8025e5...bf8e1c41. It shows "Leo Tolstoy, War and Peace, Volume 1: Books 1 - 3, LibriVox" over a Napoleon battle painting. The item's metadata has no licence field (the Crime and Punishment item carried Public Domain Mark 1.0); not checked further.
  - Chapter 1 of 68 and length 872: the first 64 kbps file is `war_peace_v1_maude_translation_01_tolstoy_64kb.mp3`, title "01 - Book 01 Chapter 01", track 1, length 14:32 (128 kbps copy: 871.86 s). There is **no preface track** (68 files = 68 LibriVox sections, Books 1 to 3: 28 + 21 + 19), so unlike the Crime and Punishment item the first chapter is chapter 1, "CHAPTER I". `_chaptersFrom` keeps each file's `title` unchanged with `index: i` (`librivox_provider.dart:354-377`) and the import stores it as is (`store_import_service.dart:354-355`).
- Right phone: a copy of `ios-read-along` as `tools/mockups/scenes/_tmp-wp-read-along/`, shot at t = 12, `theme: 'warm'` (Warm Paper). Changes in the copy only (full diff: `scripts/images/temp-scenes.patch`, made against the shipped scenes):
  - `CHAPTER`: the first two paragraphs of Book One, Chapter I of Project Gutenberg #2600, from a fresh download whose SHA-256 (2d5bb2ad...5fcc5d1b2b) matches research-evidence.md. Set as a transcript reads (`gut_js.py`): no quotation marks around the dialogue (apostrophes kept), the em dashes in "Antichrist—I really believe he is Antichrist—I will" and "frightened you—sit down" read as commas, and no stress accents on names (Pávlovna to Pavlovna; research-platforms "Do not claim" 13). Same principle as dropping italics last time. Only the first paragraph is on screen.
  - `CHAPTER_TITLE = '01 - Book 01 Chapter 01'` (the file title), with the chapter-block title and running-head fit rule carried over: the block reads "CHAPTER I" over "01 - Book 01 Chapter 01", the running head "I · 01 - BOOK 01 CHAPTER 01" fits on one line.
  - `CHAPTER_NUMBER` 1, `CHAPTER_NUMERAL` 'I', `CHAPTER_LEN` 872, `COVER_AVERAGE` `#746952` (16 px wide decode of the cover, `cover_avg.py`; only the ambient look uses it), `BREATHS` set for this text, `alnum` widened to `\p{L}\p{N}` (carried over).
  - The Crime and Punishment copy's "initials" exception (for Garnett's "S." and "K.") was removed, so line breaks follow the app's rule exactly.
  - At t = 12 the current word is "horrors", underlined at 56% of the phone's height, page 1 of 3, at the end of the line group "if you don’t tell me that this means war, if you still try to defend the infamies and horrors"; the words before it in the group are tinted (`probe-read-along.mjs`).
- Rendered with `node tools/mockups/render.mjs --shot _tmp-wp-ra-warm,_tmp-wp-player --png` (shots: `_tmp-wp-player` with the vars above; `_tmp-wp-ra-warm` at t = 12 with `theme: warm`).
- Composed with `compose_phones.py`: 1400x900 ink canvas, coral glows, drop shadows, left phone 1000 px tall at (175, 130), right phone 1060 px tall at (715, 50), the same placement as before.
- Simplification, as in the earlier posts: the page starts at the novel's first sentence. The real chapter file opens with the spoken LibriVox preamble, which a HushBook transcript would also show.
- Cleanup: deleted `tools/mockups/scenes/_tmp-wp-player/`, `tools/mockups/scenes/_tmp-wp-read-along/`, `assets/img/mockups/_tmp-wp-player.webp`, `assets/img/mockups/_tmp-wp-ra-warm.webp`, `tools/mockups/out/en-_tmp-wp-player.png` and `en-_tmp-wp-ra-warm.png`. No tracked file under `assets/img/mockups/` or `tools/mockups/` was changed.

## Scripts (`scripts/images/`)

- `render-html.mjs`: repo `playwright` and `sharp` via `createRequire('D:/hushbook.app/package.json')`, headless Chrome, sandbox on, deviceScaleFactor 2, WebP 84, with the overflow, font, 15 px and label-fit checks.
- `picks-card.html`, `editions-figure.html`, `length-tiles.html`: the three HTML images.
- `compose_phones.py` (PIL composition), `probe-read-along.mjs` (current word and its height per t), `ia_meta.py` (cover and chapter files from archive.org metadata), `gut_js.py` (Book One, Chapter I of Gutenberg #2600 as a transcript-style JS array), `cover_avg.py` (cover average colour), `preview760.py` (760 px readability previews). Python runs with `-I`.
- `temp-scenes.patch`: the two temp scenes as a diff against `player-cover` and `ios-read-along`. To recreate: copy the two scenes to `_tmp-wp-player` and `_tmp-wp-read-along`, apply the patch, put the cover in `_tmp-wp-player/assets/`, write the two `shots.json` files above, render, compose, then delete the temp scenes and the runner's `_tmp-*` outputs.

## Alt text

- **picks:** "War and Peace audiobooks, our picks: best overall, Thandiwe Newton, Audible Studios, 60 h 14 min; best to borrow, Neville Jason, Naxos AudioBooks, 2 volumes, 61 h 43 min; best free, Mark Nelson, LibriVox Volumes 1 to 4, 62 h 27 min; best modern translation, Penguin Classics, Anthony Briggs's translation read by five readers, 67 h 13 min. Beside the list, the HushBook player with the LibriVox cover of War and Peace, Volume 1 (Maude translation)."
- **editions:** "Bar chart of 14 unabridged English recordings of War and Peace, grouped by the translation each one reads, bars starting at zero. Constance Garnett's 1904 translation: Frederick Davidson, Blackstone, 61 h 6 min. Louise and Aylmer Maude's 1922 to 1923 translation: Christopher Preece, Montgomery Providence Publishing, 50 h 39 min; Edoardo Ballerini, Brilliance Audio, 55 h 30 min; Philippe Duquenoy, Goffin Media, 56 h 45 min; Keith Brown, Spotify Audiobooks, 57 h 47 min; Jonathan Keeble, SNR Audio, 59 h 5 min; Thandiwe Newton, Audible Studios, 60 h 14 min; Neville Jason, Naxos AudioBooks, 2 volumes, 61 h 43 min; Sam Kusi, Lauscher Audiobooks, 62 h 31 min; Alan Munro, Trout Lake Media, 66 h 50 min; Zach Barrett, NTMC, 67 h 33 min; and free on LibriVox, Mark Nelson, Volumes 1 to 4, 62 h 27 min, marked best free, and 85 readers, Books 1 to 17, 64 h 36 min. Anthony Briggs's 2005 translation: 5 readers, Penguin Classics, 2020, 67 h 13 min. Translations from store, publisher and LibriVox credits and from Audible samples matched to the Maude and Garnett texts; runtimes as listed by Audible and LibriVox, read November 11, 2026."
- **length:** "War and Peace in Louise and Aylmer Maude's translation: 561,870 words in the novel and 365 chapters in fifteen books and two epilogues. At 151 words a minute it takes 62 hours 1 minute to hear at 1x, 49 hours 37 minutes at 1.25x, 41 hours 21 minutes at 1.5x and 31 hours at 2x. Counted from Project Gutenberg eBook #2600."
- **read-along:** "Two HushBook screens for the free LibriVox recording War and Peace, Volume 1 (Maude translation): the player with the LibriVox cover at the start of chapter 1 of 68, with a Read along button, and the read-along page in the warm paper theme showing the opening of Book 1, Chapter 1, Well, Prince, so Genoa and Lucca are now just family estates of the Buonapartes, where the words already read are tinted red and the word being spoken, horrors, is underlined."

## Check against post.md (draft of 15:42)

- Picks, runtimes, word count, chapter count and the four listening times in the post match the images.
- **Mismatch:** the editions alt text in post.md (line 65) says "Bar chart of 13 unabridged English recordings"; the figure has 14 bars, and the alt's own list names 14 (12 on sale plus 2 free LibriVox sets). Use 14.
- Minor: that alt names "Montgomery Providence Publishing" while the bar reads "Montgomery Providence" (shortened to fit). The full name in alt text is fine.
- Format only: the post's list gives 2x as "31 hours", the tile prints "31 h 0 min". Same value.
- The hero embed `content/blog/embeds/war-and-peace-picks.html` is not written yet (see image 1).
