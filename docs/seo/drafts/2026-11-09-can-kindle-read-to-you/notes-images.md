# Images: can-kindle-read-to-you

Made 2026-11-09. Nothing stock or AI-generated: one composition of real app renders and one HTML figure rendered with the repo's Playwright. Method as in the focus, captions and Spanish posts (memory note `blog-images`).

## Files

| File | Size | Made from |
|---|---|---|
| `assets/img/blog/can-kindle-read-to-you-read-along.webp` | 1400x900, 62 KB | two renders from a temporary mockup scene, composed with PIL |
| `assets/img/blog/can-kindle-read-to-you-routes.webp` | 1400x1714, 149 KB | `routes-figure.html` (in this folder), rendered at 2x |

## Read-along image: source renders

Route: the temporary scene worked on the first attempt, so no fallback was needed.

- `tools/mockups/scenes/_tmp-pride/`: a copy of `ios-read-along` with these changes only:
  - `CHAPTER`: the first nine paragraphs of chapter 1, "It is a truth universally acknowledged..." to "This was invitation enough.", from Wikisource (`api.php?action=parse&page=Pride_and_Prejudice/Chapter_1&prop=text&redirects=1`, which resolves to "Pride and Prejudice (1817)/Chapter 1"; public domain). Straight quotes set as curly quotes. The 1817 text has no comma after "good fortune" and reads "considered as the rightful property".
  - `BREATHS`: `'a good fortune'`, `'the feelings or views of such a man'`.
  - `CHAPTER_LEN`: 4:44, chapter 1 of LibriVox version 3 (Karen Savage), archive.org `pride_prejudice_krs_librivox`, file `pride_and_prejudice_01_austen.mp3`, 284.21 s. That recording has 61 chapter files.
  - `COVER_AVERAGE`: `#37373D`, the average of a 16 px wide decode of `assets/covers/prideandprejudice.jpg`. The warm theme does not use it; set for completeness.
  - One line in `regroup()`: the punctuation check looks past closing quotes (`?”`), so reader lines still break at sentence ends inside dialogue.
- Right phone: shot `read-along-pride`, t = 12.6, `vars: { theme: 'warm' }` (Warm Paper: sepia page, Kameron). Page 1 of 3, drop cap "I", the current line "However little known the feelings or views of such a man may be on his first" tinted, red underline under "entering". The current word sits at 54.6% of the phone's height (probe script below), well above the canvas edge.
- Left phone: shot `player-pride-ch1`, declared in the temp folder's `shots.json` with `"scene": "player-cover"` (the player scene itself was not copied or edited), `vars: { cover: 'pride-prejudice', elapsed: 13, length: 284, chapter: 1, chapters: 61 }`. **Deviation from the brief:** the existing `tools/mockups/out/en-player-pride-prejudice.png` shows chapter 3 of 61 at 01:38, which would not match a read-along page headed "Chapter I" at 0:12.6. The chapter 1 variant shows 00:13, −04:31 and "5 min left in chapter". To use the original instead, run `compose_phones.py` with that PNG as the left phone.
- Rendered with `node tools/mockups/render.mjs --shot read-along-pride,player-pride-ch1 --png`. The book differs from the previous posts (Hitchhiker's on the captions and focus posts).
- Cleanup after composing: deleted `tools/mockups/scenes/_tmp-pride/`, `assets/img/mockups/_tmp-read-along-pride.webp`, `assets/img/mockups/_tmp-player-pride-ch1.webp`, `tools/mockups/out/en-_tmp-read-along-pride.png` and `tools/mockups/out/en-_tmp-player-pride-ch1.png`. `git status --porcelain -- tools assets/img/mockups` is empty afterwards. Copies of both PNGs and of the temp scene are in the scratchpad (below).
- Layout: left phone 1000 px tall at (175, 130), right phone 1060 px tall at (715, 50), as in the focus post. No overlay text.

## Scripts

Scratchpad (session temp, not in the repo): `C:\Users\rakes\AppData\Local\Temp\claude\34842c9e8e99357b\489e83d3-5022-447b-808d-190ed34aeaa4\scratchpad\images\`

- `compose_phones.py`: PIL, 1400x900 canvas in ink `#0E0B0A`, two blurred coral `#E8613F` glows (top centre at 42%, bottom left at 16%), drop shadows (alpha 0.62, blur 38, offset 0/26), phones overflow the bottom edge, WebP quality 84. Run: `python -I compose_phones.py player-pride-ch1.png read-along-pride.png <out.webp> 1000 175 130 1060 715 50`.
- `render-html.mjs`: loads the repo's `playwright` and `sharp` through `createRequire('D:/hushbook.app/package.json')`; Chrome with `chromiumSandbox: true, channel: 'chrome'`, bundled Chromium as fallback; deviceScaleFactor 2; height `auto` sizes the viewport to the page; WebP quality 86; reports font load status, any element outside the viewport or clipping its content, and any text under 15 px. Run: `node render-html.mjs routes-figure.html <out.webp> 700 auto`. Final run: all fonts loaded, no overflow, all text 15 px or larger.
- `probe-read-along.mjs`: seeks a read-along scene to a list of t values and prints the current word and its height on the phone; used to pick t = 12.6.
- `routes-figure.html`: identical to the copy in this folder. Fonts load from `file:///D:/hushbook.app/tools/mockups/assets/fonts/` (Newsreader title, Inter labels), so the copy here re-renders as is.
- `read-along-pride.png`, `player-pride-ch1.png`, `scene-_tmp-pride/`: the renders and the temp scene, kept for re-composing.

## Routes figure: design (dataviz skill)

- Form: eight rows of categories, so a table rather than a chart. Emphasis: the paid human-narration group is the only thing in the accent, with a coral group marker, a 3 px coral inset rule and an 8.5% coral tint. The free group's marker is the de-emphasis gray `#6E6760`. No multi-series colour.
- Validator (`--mode dark --surface #0B0A09`, `#E8613F,#6E6760`): lightness, CVD (protan ΔE 9.4), normal-vision ΔE 21.5 and contrast pass. The chroma floor fails for the gray, which is expected: it is meant to read as gray, not as a second series.
- Text wears text tokens only: paper `#F6EFE4`, paper-dim `#CABFB0` (10.9:1), muted `#9A9086` (6.3:1) for column heads, "Not stated" and the sources line. Labels 15 to 16.5 px at 1x, title Newsreader 30 px.
- No hover layer: it ships as a static WebP. The post's own first table is the table view.

## Every fact on the routes figure and its line in post.md

| On the figure | post.md |
|---|---|
| Title: "Every Kindle read-aloud is free and synthetic." | line 108 ("Every read-aloud feature Amazon makes is free"), line 81 ("Assistive Reader, VoiceView and Alexa all use a synthetic voice") |
| Title: "A person reading costs extra." | line 5 ("A person reading costs extra"), line 116 |
| Kindle app on iPhone, iPad, Android, Mac · Assistive Reader · Yes | lines 13 and 14 |
| Kindle app on **Windows 11** · Assistive Reader shortcuts, Narrator, NVDA, JAWS · Not stated | line 15; Windows 11 also line 68 |
| Kindle **11th generation** and newer, Scribe, Colorsoft · Assistive Reader, over Bluetooth · Yes | line 16; also lines 51 and 111 |
| Kindles from **2016** on · VoiceView screen reader, over Bluetooth · Not stated | line 17; also lines 61 and 112 |
| Fire tablets · Assistive Reader, VoiceView · Yes, with Assistive Reader | line 18 |
| Echo and other Alexa devices, not Alexa+ · Kindle Assistive Reader on Alexa · Not stated | line 19; Alexa+ also line 77 |
| A person reading · paid: Audible narration added to the Kindle book, or included with a Kindle+ title | line 21 ("Paid, or included with some Kindle+ titles"), lines 98 and 100 |
| Kindle app on iOS and Android, Fire tablets · Audible narration · Yes | line 98 ("only in the Kindle apps for iOS and Android and on Fire tablets") |
| Kindles with Bluetooth · Audible narration, over Bluetooth · Not stated | line 98 ("on Bluetooth-enabled Kindle e-readers"); highlighting: `research-platforms.md` line 77, "Highlighting along with Audible on an e-ink Kindle: NOT STATED". Changed from "No" on 2026-11-09 |
| Sources line: Amazon help pages, checked **November 9, 2026** | line 5; also line 133 |

The only numbers on the figure are Windows 11, 11th generation, 2016 and November 9, 2026.

Left off on purpose: Kindle for Web (line 20, no read-aloud documented), listening in the Audible app (line 98), VoiceOver and TalkBack (line 47), and the Kindle+ price of $11.99 a month (line 100), because Kindle+ includes the audiobook only with some titles and the price would read as the cost of narration. If any of these facts change in post.md, edit `routes-figure.html` and re-render.

## Alt text

- **read-along:** "Two HushBook screens for Pride and Prejudice by Jane Austen: the player at the start of chapter 1 with a Read along button, and the read-along page in the warm paper theme showing the opening of chapter 1, where the line being spoken is tinted red and the word being spoken, entering, is underlined."
- **routes:** "Table: every Kindle read-aloud is free and synthetic, and a person reading costs extra. Free, computer voice: Kindle app on iPhone, iPad, Android and Mac, Assistive Reader, words highlighted. Kindle app on Windows 11, Assistive Reader shortcuts, Narrator, NVDA or JAWS, highlighting not stated. Kindle 11th generation and newer, Scribe and Colorsoft, Assistive Reader over Bluetooth, words highlighted. Kindles from 2016 on, VoiceView screen reader over Bluetooth, highlighting not stated. Fire tablets, Assistive Reader and VoiceView, words highlighted with Assistive Reader. Echo and other Alexa devices, not Alexa+, Kindle Assistive Reader on Alexa, highlighting not stated. Paid, a person reading: Audible narration added to the Kindle book or included with a Kindle+ title, with words highlighted in the Kindle app on iOS and Android and on Fire tablets, and not stated for Kindles with Bluetooth. Source: Amazon help pages, checked November 9, 2026."
