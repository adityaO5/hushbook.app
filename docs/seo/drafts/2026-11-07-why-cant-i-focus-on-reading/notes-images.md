# Images: why-cant-i-focus-on-reading

Made 2026-11-08. Nothing stock or AI-generated: one composition of real app renders, two HTML figures rendered with the repo's Playwright. Method as in the captions and Spanish posts (memory note `blog-images`).

## Files

| File | Size | Made from |
|---|---|---|
| `assets/img/blog/why-cant-i-focus-on-reading-mind-wandering.webp` | 1400x576, 61 KB | `mind-wandering.html`, rendered at 2x |
| `assets/img/blog/why-cant-i-focus-on-reading-pace.webp` | 1400x592, 54 KB | `pace.html`, rendered at 2x |
| `assets/img/blog/why-cant-i-focus-on-reading-read-along.webp` | 1400x900, 66 KB | two renders from `tools/mockups/out`, composed with PIL |

## Source renders (read-along image)

- Left: `tools/mockups/out/en-player-hitchhikers.png` (player-cover scene, shot `player-hitchhikers`).
- Right: `tools/mockups/out/en-read-along-paper.png` (ios-read-along scene, shot `read-along-paper`, warm paper theme, t = 14.45): paged book text ("1 / 3"), the spoken sentence tinted and a red underline under "planet".
- Both renders date from 2026-11-03 12:33. Checked against the shipped homepage files (`assets/img/mockups/read-along.webp`, `read-along-paper.webp`): same frame, mean pixel difference about 1.5/255 (WebP compression only). Scene files unchanged since commit 17f5cf4. No re-render was needed, so `render.mjs` was not run and no repo render was touched.
- The paper theme was picked so the image does not repeat the captions post (`audiobook-captions-read-along.webp` uses the same player with the dark read-along page). The book on both phones is the same (Hitchhiker's), so cover and text match.
- Layout: left phone 1000 px tall at (175, 130), right phone 1060 px tall at (715, 50), so the highlighted sentence sits well above the bottom edge. No overlay text.

## Scripts

Scratchpad (session temp, not in the repo): `C:\Users\rakes\AppData\Local\Temp\claude\34842c9e8e99357b\67181169-1185-4f07-8cff-e2a8906768be\scratchpad\images\`

- `compose_phones.py`: PIL, 1400x900 dark canvas, coral glow, drop shadows, phones overflow the bottom edge, WebP quality 84. Run: `python -I compose_phones.py <left.png> <right.png> <out.webp> 1000 175 130 1060 715 50`.
- `render-html.mjs`: loads the repo's `playwright` and `sharp` through `createRequire('D:/hushbook.app/package.json')`; Chrome with `chromiumSandbox: true, channel: 'chrome'`, bundled Chromium as fallback; deviceScaleFactor 2; WebP quality 86; warns if any element overflows the viewport. Run: `node render-html.mjs mind-wandering.html <out.webp> 700 288` and `node render-html.mjs pace.html <out.webp> 700 296`.
- `mind-wandering.html`, `pace.html`: 700 px wide, mockup fonts from `file:///D:/hushbook.app/tools/mockups/assets/fonts/` (Newsreader headings, Inter labels), tokens ink #0B0A09, paper #F6EFE4, paper-dim #CABFB0, coral #E8613F.
- `librivox-rerun.txt`: output of a rerun of `librivox-runtime-count.py` (see below).

Design notes (dataviz skill): stat tiles are label + value with one coral accent and a sources line. Pace bars use the emphasis form: the narrator bar in coral, the two silent-reading bars in a de-emphasis gray #6E6760 (validator: 3:1 or better against the dark surface, protan ΔE 9.4 against the coral), values at the bar tips, bars 12 px, square at the baseline and rounded 4 px at the data end, one scale (0 to 300 words a minute). Length meters: coral fill on a dim coral track, value right-aligned. Every value is printed, so no legend or axis is needed.

## Numbers rendered and where each was verified

**mind-wandering.webp** ("Drifting while reading is normal, and daily reading is rarer")

| On the image | Source | Status in this folder |
|---|---|---|
| 35.6% of check-ins off the text in silent reading; 50.6% when listening; 211 students | Varao Sousa, Carriere and Smilek 2013, Frontiers in Psychology | `research-evidence.md` §1 and §9: **VERIFIED** (PMC3842750 full text, M = 0.356 and 0.506) |
| 42.3% mind wandering on difficult texts, 36.2% on easy versions; 80 undergraduates | Feng, D'Mello and Graesser 2013, Psychonomic Bulletin & Review | `research-evidence.md` §1: **VERIFIED** (Springer open-access PDF) |
| 16% of Americans read for pleasure on a given day in 2023, down from 28% in 2004; ATUS, n = 236,270 | Bone, Bu, Sonke and Fancourt 2025, iScience | `research-evidence.md` §3: **VERIFIED** (PMC12496190 full text) |

**pace.webp** (left "Narration is slower than reading", right "Many LibriVox recordings are short")

| On the image | Source | Status |
|---|---|---|
| LibriVox narrators, median of ten: 151 wpm | our count, `content/blog/how-long-is-an-audiobook.md` (ten classics, 131 to 179 wpm) | `research-evidence.md` §9 cites it as our count. Rechecked from the post's list: the ten rates give a median of 150.5, shown as 151 as in the post |
| Silent reading 238 wpm non-fiction, 260 wpm fiction | Brysbaert 2019, Journal of Memory and Language | `research-evidence.md` §6 and §9: **VERIFIED (abstract)** (190 studies, 18,573 participants) |
| Under 1 hour 13.4%, under 3 hours 37.4%, half under 4.56 hours (the median), of 18,824 English recordings with a running time | our archive.org count, `librivox-runtime-count.py` | `research-platforms.md` §3a (run 2026-11-08 00:03 IST = 2026-11-07 18:33 UTC). **Rerun 2026-11-08 00:30 IST: identical** (18,824 usable, 2,524 = 13.4%, 7,038 = 37.4%, median 4.56 h; 19,170 items, one more without a runtime) |
| "Includes poetry and story collections" | caveat from `research-platforms.md` §3a | |

Choices: the image says "211 students" (the evidence file's wording; it does not say undergraduates) and dates the LibriVox count "November 2026" (the count ran on November 7 UTC, November 8 IST). "Under 4.56 hours, the median: 50%" restates the median as a share so all three length rows sit on one 0 to 100% scale.

## Alt text

- **mind-wandering:** "Three stat tiles. In a 2013 study of 211 students, minds were off the text at 35.6% of random check-ins during silent reading and 50.6% while listening. In a 2013 study of 80 undergraduates, mind wandering was 42.3% on difficult texts against 36.2% on easier versions. The share of Americans who read for pleasure on a given day fell from 28% in 2004 to 16% in 2023."
- **pace:** "Two charts. Left: LibriVox narrators read at a median of 151 words a minute, against typical silent reading speeds of 238 for non-fiction and 260 for fiction. Right: of 18,824 English LibriVox recordings with a running time, 13.4% run under one hour, 37.4% under three hours, and half under 4.56 hours. The count includes poetry and story collections."
- **read-along:** "Two HushBook screens: the player for The Hitch-Hiker's Guide to the Galaxy with a Read along button, and the read-along page in the warm paper theme, where the sentence being spoken is tinted red and the word being spoken, planet, is underlined."
