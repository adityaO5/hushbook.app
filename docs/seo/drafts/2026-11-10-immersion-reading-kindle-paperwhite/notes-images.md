# Images: immersion-reading-kindle-paperwhite

Made 2026-11-10. Nothing stock or AI-generated: two HTML figures rendered with the repo's Playwright, and one composition of real HushBook renders. Method as in the Kindle, focus, captions and Spanish posts (memory note `blog-images`). The two figures use the same visual language as `2026-11-09-can-kindle-read-to-you/routes-figure.html`: ink canvas, Newsreader title, Inter labels, one coral accent, muted sources line.

## Files

| File | Size | Made from |
|---|---|---|
| `assets/img/blog/immersion-reading-kindle-by-device.webp` | 1400x2714, 197 KB (201,784 bytes) | `by-device-figure.html` (this folder), 700 CSS px wide at 2x |
| `assets/img/blog/immersion-reading-vs-switching.webp` | 1400x900, 73 KB (74,402 bytes) | `switching-figure.html` (this folder), 700x450 CSS px at 2x |
| `assets/img/blog/immersion-reading-hushbook-read-along.webp` | 1400x900, 81 KB (82,766 bytes) | two phone renders composed with PIL |

All three are WebP quality 84. post.md already references them at lines 42, 68 and 235.

## 1. By-device matrix: exact values drawn

Title "Which Kindle has Immersion Reading?" Lede "No Kindle e-reader does. Fire tablets and the phone apps do." Sources line "Amazon and Audible help pages and Kindle user guides, read November 10, 2026".

Columns: "Immersion Reading, words highlighted with the narrator" (the only tinted column) | "Plays the Audible audiobook" | "Switch between reading and listening".

| Row (detail line) | Immersion Reading | Plays the Audible audiobook | Switch |
|---|---|---|---|
| **Kindle e-readers** | | | |
| Kindle Paperwhite (10th gen (2018), 11th gen (2021), 12th gen (2024), 2026, and Signature Editions) | No | Yes, over Bluetooth | Yes |
| Kindle (11th gen (2022, 2024) and 2026) | No | Yes, over Bluetooth | Yes |
| Kindle Colorsoft (2024/2025 and 2026) | No | Yes, over Bluetooth | Yes |
| Kindle Scribe (2022, 2024, 3rd gen, Scribe Colorsoft) | No | Yes, over Bluetooth | Yes |
| Kindle Oasis (9th gen (2017), 10th gen (2019)) | No | Yes, over Bluetooth | Yes |
| **Tablets and phones** | | | |
| Fire tablets (Fire OS 7 and up (Kindle app), Fire OS 8 and up (Audible app)) | Yes | Yes | Yes |
| Kindle app (iPhone, iPad, Android) | Yes, per Amazon | Yes | Yes |
| Audible app (iPhone, iPad, Android) | Yes | Yes | Yes |
| **Computers** | | | |
| Audible app on a Mac (macOS) | Yes | Yes | Not listed |
| Kindle for Mac (Amazon pages disagree) | Unclear | Not stated | Not listed |
| Kindle for Windows (Windows 11) | Not listed | Not stated | Yes, per Audible |
| Audible on a Windows PC (app discontinued, Cloud Player in a browser) | No | Yes, in a browser | Not listed |

Sources in `research-platforms.md`: e-reader rows from the "Quick answer" table and section 4 (16 user guides: Playing Audible books and Switch to Listening in all, "Immersion" in none). Fire, Kindle app and Audible app from sections 1 and 2 (Amazon's product pop-up; Audible's immersion and switching device lists). Mac and Windows from section 3. "Yes, over Bluetooth" is the guides' "you must first pair a Bluetooth audio device". "Yes, per Audible" for Kindle for Windows is Audible's switching list "Kindle Apps (Android, iOS, Fire Tablet, PC)". The Audible app on a Mac gets "Not listed" for switching because that list names only "Audible apps (Android, iOS)".

### Differences from the table in post.md (lines 25 to 40), all deliberate

- The figure folds post.md's four Paperwhite rows into one row. All four have identical values in these three columns.
- Colorsoft years: the figure says "2024/2025 and 2026" (the research wording). post.md says "(2024) and Kindle Colorsoft (2026)".
- The Audible app: post.md has one row (iPhone, iPad, Android and macOS, switch "Yes, on iOS and Android"). The figure splits it into a phone row and a Mac row. The facts are the same.
- Audible on a Windows PC, switching: post.md "n/a", figure "Not listed" (Audible's switching list has no Windows app or Cloud Player).
- Kindle for Mac, Immersion Reading: post.md "Unclear: one Amazon page says yes", figure "Unclear" with the detail line "Amazon pages disagree".
- The figure leaves out post.md's Assistive Reader column (the brief asked for three columns).

If post.md's table changes, edit `by-device-figure.html` and re-render.

### Design (dataviz skill)

- Form: 12 rows of categories, so a table, not a chart. Emphasis: the Immersion Reading column is the only one with a coral band (8.5% tint, 3 px coral cap), and its Yes marks are the only filled coral marks. Yes marks in the other columns are neutral outline checks.
- Marks never depend on colour alone. Every cell has a text label plus a shape: check in a circle (Yes), x in a circle (No), bar in a circle ("Not listed", "Not stated", "Unclear").
- Validator (`--mode dark --surface #0B0A09`, `#E8613F,#6E6760`): lightness, CVD (protan ΔE 9.4), normal-vision ΔE 21.5 and contrast pass. The gray fails the chroma floor, which is intended: it is the de-emphasis mark, the same as yesterday's figure.
- Text uses text tokens only: paper `#F6EFE4`, paper-dim `#CABFB0`, muted `#9A9086` (6.3:1). Labels are 15 to 16.5 px at 1x and the title is Newsreader 30 px. The render check reported all fonts loaded, no overflow, and all text 15 px or larger.

## 2. Switching vs Immersion Reading

- Left panel: "Switching" / "Kindle Paperwhite". It shows two generic e-ink e-readers drawn in CSS: "Reading" (a page of text) and "Listening" (headphones, "CHAPTER 1", a progress bar, a play button), with swap arrows between them. Caption: "**One at a time.** The Kindle keeps your place when you swap." (research section 1: "switch between your Kindle e-book and the matching Audible audiobook without losing your place").
- Right panel: "Immersion Reading" / "Fire tablet, Kindle and Audible apps". It shows a generic tablet with the same page, one word ("possession") highlighted in coral, and a playing audio bar (pause icon, coral progress) at the same time. Caption: "**Both at once.** The text highlights as the narrator reads." (Audible help, section 2, verbatim).
- Page text: Pride and Prejudice, chapter 1, the 1817 edition on Wikisource (public domain), the same text the 2026-11-09 post used: "It is a truth universally acknowledged, that a single man in possession of a good fortune must be in want of a wife." followed by the start of the second paragraph. The text is clipped on line boundaries.
- No Amazon logos, product photos, screenshots or Amazon UI. The devices are plain rounded rectangles with an even bezel.
- The page text inside the devices is 9.2 px (e-ink) and 11 px (tablet) at 1x, so 18 to 22 px in the file. That is schematic content; the headings, labels and captions are 15 px or larger. The render check's one "outside viewport" note is that clipped page text, which is hidden.

## 3. HushBook read-along: source renders

- Left phone: `tools/mockups/out/en-discover.png` (existing homepage render, not regenerated). It shows Discover with "For November evenings", The Count of Monte Cristo featured, then The Odyssey, Crime and Punishment and A Tale of Two Cities.
- Right phone: a new frame of the Pride and Prejudice read-along in the app's default look ("ambient": dark page, Newsreader), t = 15.4. It shows page 1 of 2 with drop cap "I", the spoken line "this truth is so well fixed in the minds of the surrounding families," brighter, and a coral underline under "fixed" at 60.9% of the phone's height.
- Why this pairing: no existing blog image uses Discover. The other read-along images pair a player cover with a read-along page: Hitchhiker's on the focus and captions posts, Pride (player chapter 1 plus warm-paper read-along) on the Kindle post, plus the Spanish, German and French posts. The only English read-along renders in `out/` are Hitchhiker's, and pairing one with a different book's player would show two different books. Discover plus a public-domain book also matches the post's honest limit (HushBook reads along with audio you own or free classics, not Kindle or Audible books). It also matches figure 2's page text.
- How the frame was rendered: I copied yesterday's temp scene (the `ios-read-along` copy with the Pride text, from the 2026-11-09 scratchpad) to `tools/mockups/scenes/_tmp-pride/`. I wrote a one-shot `shots.json` (`read-along-pride-ambient`, t 15.4, no vars) and ran `node tools/mockups/render.mjs --shot read-along-pride-ambient --png`. The scene's line grouping breaks after "Mr." further down the page; that line sits below the canvas edge, so it does not show.
- Cleanup: deleted `tools/mockups/scenes/_tmp-pride/`, `assets/img/mockups/_tmp-read-along-pride-ambient.webp` and `tools/mockups/out/en-_tmp-read-along-pride-ambient.png`. Copies are in the scratchpad (below).
- Layout: left phone 1000 px tall at (175, 130), right phone 1060 px tall at (715, 50), the same as the Kindle post. Ink canvas, two coral glows, drop shadows, phones overflowing the bottom edge. No overlay text.

## Scripts

Scratchpad (session temp, not in the repo): `C:\Users\rakes\AppData\Local\Temp\claude\34842c9e8e99357b\79be317d-7c26-4857-84db-69018ba4c3a5\scratchpad\images\`

- `render-html.mjs`: loads the repo's `playwright` and `sharp` through `createRequire('D:/hushbook.app/package.json')`. It runs headless Chrome (`headless: true, channel: 'chrome', chromiumSandbox: true`), with bundled Chromium as the fallback and the sandbox still on, at deviceScaleFactor 2, WebP quality 84. It reports font status, overflow and text under 15 px. Run: `node render-html.mjs by-device-figure.html <out.webp> 700 auto` and `node render-html.mjs switching-figure.html <out.webp> 700 450`.
- `compose_phones.py`: PIL composition. Run: `python -I compose_phones.py discover.png read-along-pride-ambient.png <out.webp> 1000 175 130 1060 715 50`.
- `probe-read-along.mjs`: headless; seeks the read-along scene and prints the current word and its height on the phone (used to pick t = 15.4).
- `by-device-figure.html`, `switching-figure.html`: identical to the copies in this folder. Fonts load from `file:///D:/hushbook.app/tools/mockups/assets/fonts/`, so the copies here re-render as they are.
- `discover.png`, `read-along-pride-ambient.png`, `scene-_tmp-pride/`: the two phone renders and the temp scene, kept for re-composing.

## Alt text (suggested)

- **by-device:** "Table: which Kindle has Immersion Reading. No Kindle e-reader does; Fire tablets and the phone apps do. Kindle Paperwhite (10th, 11th and 12th generation, 2026 and Signature Editions), Kindle, Kindle Colorsoft, Kindle Scribe and Kindle Oasis: no Immersion Reading, but they play the Audible audiobook over Bluetooth and switch between reading and listening. Fire tablets, the Kindle app on iPhone, iPad and Android (per Amazon) and the Audible app on iPhone, iPad and Android: Immersion Reading yes, playback yes, switching yes. Audible app on a Mac: Immersion Reading yes, switching not listed. Kindle for Mac: unclear, Amazon pages disagree. Kindle for Windows: Immersion Reading not listed, switching yes per Audible. Audible on a Windows PC: no Immersion Reading, the app is discontinued and the Cloud Player plays in a browser. Source: Amazon and Audible help pages and Kindle user guides, read November 10, 2026."
- **vs-switching:** "Diagram: on a Kindle Paperwhite you switch, reading the page or listening on headphones one at a time, and the Kindle keeps your place when you swap. With Immersion Reading on a Fire tablet or in the Kindle and Audible apps, the audiobook plays while the word being read is highlighted on the page, here in the opening of Pride and Prejudice."
- **hushbook-read-along:** "Two HushBook screens: Discover, listing free public-domain audiobooks such as The Count of Monte Cristo, The Odyssey and Crime and Punishment, and the read-along page for chapter 1 of Pride and Prejudice, where the line being spoken is brighter and the word being spoken, fixed, is underlined in coral."
