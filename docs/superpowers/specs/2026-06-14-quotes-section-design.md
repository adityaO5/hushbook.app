# Landing page — "The player" gallery → Quotes 3-step flow

**Date:** 2026-06-14
**File touched:** `D:\Hushbook.app\index.html` (single-page site; CSS is the inline `<style>` at line 24)
**Status:** Approved direction; blocked on 3 app screenshots before build.

---

## 1. Problem

The "The player" gallery section (`index.html` ~426–468) has three cards:

| Card | Image | Headline | Copy |
|---|---|---|---|
| 1 | player-mexican-gothic.webp | Three views, one tap | Cover, karaoke lyrics, or the up-next queue. |
| 2 | player-fourth-wing.webp | Fine control | 0.5×–3× speed, ±30-second skips, chapter hops, volume boost. |
| 3 | player-born-a-crime.webp | Sleep timer | Drift off mid-chapter — the narration fades out gently and saves your place. |

All three images show the **same screen** (cover-art player view, different book). The headlines promise three different capabilities the pictures never show. The karaoke read-along — the product's defining screen — appears nowhere in the section. Three near-identical screenshots is the cardinal app-landing mistake: each shot must earn its caption.

## 2. Goal

Repurpose the section to tell the **Quotes** story (brief Offering 11) as a 3-step narrative — select → collect → share — with three visually distinct, claim-matching screens. Pivot the section wrapper from "The player" to "Quotes." Keep the cover marquee.

Non-goals: touching any other section; capturing player screenshots; adding a CTA button; changing the marquee markup.

## 3. Design

### 3.1 Section header (rewrite)
- Eyebrow: `Quotes` (was `The player`)
- Headline: **Save the line. Share the card.** (was "Every book sets its own mood.")
- Sub: **Catch a quote the moment you hear it — two taps in the read-along, yours to keep or post.**

### 3.2 Three steps (replaces the 3 `.gcard` bodies)

Each card = a number, a phone/card image, a headline, one line. Copy is final (approved):

**01 · Select from the lyrics**
- Headline: **Catch it in two taps**
- Body: Tap the first word, tap the last. The line you just heard is saved — without leaving the read-along.

**02 · Where they land**
- Headline: **Every line, in one place**
- Body: Your quotes gather by book, stored on your phone. Revisit, edit, or send any one onward.

**03 · Share the card**
- Headline: **A card worth posting**
- Body: Each quote becomes a finished card — the words, the book, the author. Ready to share.

### 3.3 Layout / markup
- Reuse the existing `.gallery` grid (3 columns; already collapses to 1 column ≤680px) and `.gcard` image styling (rounded corners, drop shadow, hover lift).
- Add a step number to each card, styled like the how-it-works flow. Add one CSS rule:
  `.gcard .num{font-family:var(--serif);font-size:15px;color:var(--gold);letter-spacing:.1em;display:block;margin-bottom:14px}`
  (mirrors the existing `.step .num` rule at line 120).
- Number spans: `01` / `02` / `03`, placed above each image inside the `<figure class="gcard reveal">`.
- Keep `loading="lazy"` on images; keep the `reveal` animation class.

### 3.4 Marquee
- Unchanged. The scrolling cover row stays beneath the section as ambient book texture.

## 4. Assets required (BLOCKER — capture from app at `D:\hushbook`)

None exist in `assets/img/mockups` yet. Match the existing set: baked iPhone bezel for screenshots (screens 1–2); screen 3 is the raw exported share card (no bezel).

| # | File | What it shows | Source | Alt text |
|---|---|---|---|---|
| 1 | `quote-select.webp` | Karaoke/read-along view in **selection state** — first & last word highlighted, a Save-quote affordance visible | App screenshot (read-along, mid two-tap selection) | Selecting a quote in HushBook — tapping the first and last word in the read-along lyrics |
| 2 | `quotes-collection.webp` | The **Quotes list**, grouped by book | App screenshot (Quotes screen) | All saved quotes in HushBook, collected by book |
| 3 | `quote-card-share.webp` | One **generated share card** (1080×1350, 4:5) | App share-card export | A finished HushBook quote card ready to share — the line, author, and book |

User is providing these. Build proceeds once files land in `assets/img/mockups/`.

## 5. Implementation outline

1. Edit `index.html` header block of the section (~429–433): swap eyebrow, headline, sub.
2. Replace the three `.gcard` figures (~435–449): new images, add `<span class="num">`, new headlines + copy.
3. Add the `.gcard .num` CSS rule next to `.gcard h3` (~line 148).
4. Leave marquee (~452–467) untouched.
5. Cache-bust any image filename that collides with an old one (project precedent: `?v=2`). New filenames here, so not needed.

## 6. Risks / open items
- **Asset fidelity:** screen 1 must actually show the selection state (two highlighted words + Save affordance), not a plain lyrics view — otherwise we repeat the original sin of a shot that doesn't prove its caption.
- **Share-card legibility at card size:** the 4:5 card shrinks to ~246px wide; the quote must stay readable. Pick a short quote for the exported sample.
- **Section position:** stays where it is in the page order. Not moved.
