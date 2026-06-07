# HushBook Landing Redesign — Design Spec

- **Date:** 2026-06-07
- **Status:** Approved (design); pending spec review
- **Author:** Claude (brainstormed with adityaO5)
- **Supersedes:** the current single-file `index.html` landing page

---

## 1. Context & goal

HushBook is a pre-launch audiobook **read-along** app (word-level karaoke, transcribed
**on-device**, privacy- and accessibility-first; iOS & Android launching together). The
current landing page (`index.html`) works but reads as a *waitlist teaser*: placeholder
art ("real app screenshots before launch") and a 6-card icon bento instead of real
product screens.

Three research bundles back this redesign:
- `research/report.html` (4 Jun) — kinetic karaoke hero + dual store CTA.
- `.lazyweb/design-research/dark-waitlist-kinetic-hero-2026-06-05/` (5 Jun) — dark waitlist pivot.
- `.lazyweb/design-research/app-landing-page-2026-06-06/` (6 Jun) — **the chosen report**:
  evolve to an active-product landing; closest models **Raycast iOS, Speechify, Apple Books**.

**Goal:** rebuild the landing page following the **Raycast iOS rhythm** (top similarity hit,
0.74; palette already matches) — hero with angled app mockups → a feature section per real
app screen → an atmospheric moment → device availability → centered QR → big footer — with
**six full-fidelity, hand-built app screens** replacing all placeholder art.

## 2. Locked decisions

| Decision | Choice |
|----------|--------|
| Build scope | **Full rewrite** of the landing page |
| File architecture | **Split:** `index.html` + `assets/css/landing.css` + `assets/js/landing.js`; reuse existing `assets/js/config.js` |
| App screens | **Six**, full-fidelity, hand-built **HTML/CSS** (no images needed), in device frames |
| Hero CTA | **Store-badges-front:** App Store + Google Play pair primary (marked *coming soon*), waitlist secondary, QR → scan to download/join (soon) |
| Theme | Dark end-to-end, existing amber identity |
| Fonts | Fraunces (display) · Hanken Grotesk (body) · Ewert (logo) · **Playfair Display** as an editorial accent "here and there" |
| Deploy | Static, zero build step (Vercel). Other pages (`about`, `privacy-policy`, `terms-conditions`, `licenses`) untouched |

**YAGNI / out of scope:** no framework/bundler, no CMS, no real screenshots (app unshipped),
no live store links, no comparison table, no referral mechanic. These can come later.

## 3. Visual system

Carry the current design tokens verbatim (so nothing regresses):

- **Ink/surfaces:** `--ink:#0B0A09`, `--ink-2:#100E0C`, `--surface:#181512`, `--surface-2:#211C18`
- **Lines:** `--line:rgba(245,238,227,.10)`, `--line-soft:rgba(245,238,227,.06)`
- **Paper/text:** `--paper:#F6EFE4`, `--paper-dim:#CABFB0`, `--muted:#8B8275`
- **Amber:** `--amber:#F3C079`, `--amber-deep:#E0A24C`, `--amber-2:#FFD89B`, `--glow:rgba(243,192,121,.40)`, `--sage:#A6C9A9`
- **Radii / wrap / ease:** as today (`--r-sm..xl`, `--wrap:1180px`, `--ease:cubic-bezier(.22,.61,.36,1)`)
- **Fonts:** `--font-d:"Fraunces"`, `--font-b:"Hanken Grotesk"`, `--font-logo:"Ewert"`, **`--font-accent:"Playfair Display"`** (new). Playfair used sparingly: moment-band statement, section pull-quotes/large numerals — never body or controls.
- **Atmosphere:** keep the layered radial-glow `body::before` + grain `body::after`.

Reusable components: `.btn`/`.btn-primary`/`.btn-ghost`, `.badge`, `.eyebrow`, `.sec`/`.sec-head`,
`.phone`/`.scr` device frame, store-badge, QR card, FAQ `<details>`, footer grid, mobile dockbar.

## 4. Page structure (Raycast rhythm)

```
1  NAV          logo · Features How FAQ About · [App Store][Play] (soon)        sticky/blur
2  HERO         eyebrow "iOS & Android · coming soon"
                H1 (Fraunces) "Read along with every word you hear."
                sub. PRIMARY: [App Store][Google Play] (coming-soon, dim) ; secondary: "or join the waitlist →"
                QR card (scan to download/join, soon)
                VISUAL: angled phones fanned; lead phone = LIVE auto-play karaoke (SCREEN 1)
3  TRUST band   on-device · works offline · thousands of titles · MP3/M4B & more
4  FEATURE §1   Read-along karaoke        ⟷  SCREEN 1  (text left, screen right)
5  FEATURE §2   Free public-domain library ⟷  SCREEN 2  (alternate: screen left)
6  FEATURE §3   Analytics & neuron score   ⟷  SCREEN 3
7  FEATURE §4   Accessibility profiles     ⟷  SCREEN 4  (alternate)
8  FEATURE §5   Collectible badges & streaks ⟷ SCREEN 5
9  FEATURE §6   On-device & import         ⟷  SCREEN 6  (alternate) — the privacy wedge
10 MOMENT band  "Apple-Music lyrics, for books." oversized (Playfair/Fraunces) + glow
11 AVAILABILITY iOS & Android, launching together · two phones · store badges
12 QR section   centered QR → scan to download/join (coming soon)
13 FAQ          6-question accordion (carry current copy)
14 FINALE       waitlist form + store badges (coming soon)
15 FOOTER       Product / Company / Legal columns + social  |  mobile DOCKBAR (sticky CTA)
```

Feature sections alternate the screen left/right and use a shared `.feature-row` layout
(copy column: eyebrow + Fraunces h2 + paragraph + 2–3 sub-points; visual column: device frame).

## 5. The six app screens

Each is a hand-built phone UI inside the `.phone`/`.scr` frame, themed with the tokens above,
driven by light JS, with a frozen reduced-motion state. All decorative; `aria-hidden` with a
text alternative in the adjacent copy.

| # | Screen | Rendered contents | Motion | Reduced-motion |
|---|--------|-------------------|--------|----------------|
| 1 | **Read-along player** | now-playing bar (title/chapter), book text with current word lit amber + glow, prior words dimmed, scrubber, transport controls; tap a word to jump | word-by-word auto-play loop (reuse current karaoke engine) | freeze mid-verse, fully lit |
| 2 | **Library** | search field, category chips, scrollable cover grid (LibriVox / Internet Archive), title + author, per-item download ring | subtle cover shimmer / one ring filling | static grid |
| 3 | **Neuron score** | large score ring with count-up numeral (Playfair), streak, words-read, comprehension, heat sparkline / momentum | ring + numeral count-up once on reveal | final value shown |
| 4 | **Accessibility profiles** | segmented Vision / Dyslexia / Comprehension control; live font sample swap (Atkinson Hyperlegible ↔ OpenDyslexic), caption-size, color, reading overlay | auto-cycle profiles every few s (or on hover) | one profile shown |
| 5 | **Badges & streaks** | grid of dimensional badges (7/30/365-day, words, marathon, first transcript), streak calendar, goal ring | badge tilt/shine on reveal | static |
| 6 | **Import** | choose MP3/M4B, detected chapters list, on-device transcription progress bar + "audio never leaves this phone" | progress bar advancing | bar at a fixed % |

Fonts for screens 4 (OpenDyslexic / Atkinson Hyperlegible) are nice-to-have: if not bundled,
approximate with system fallbacks and label the intent — do **not** block the build on font assets.

## 6. JavaScript (`assets/js/landing.js`)

Vanilla, no deps. Modules (IIFEs), all guarded for missing nodes and `prefers-reduced-motion`:

- **karaoke** — word-span builder + timed auto-play loop + tap-to-jump + scrubber (port current logic; drive hero + screen 1).
- **screen micro-loops** — score count-up, profile cycle, import progress, library shimmer; each starts on IntersectionObserver reveal, runs once or gently loops.
- **reveal** — IntersectionObserver adds `.in` to `.reveal` elements (staggered).
- **nav** — hamburger open/close, escape, outside-click, resize reset.
- **waitlist** — port current Supabase POST (reads `window.HB_SUPABASE` from `config.js`; local-success fallback; email validation; status messaging).

## 7. Accessibility (non-negotiable — the app is a11y-first)

- `prefers-reduced-motion: reduce` → freeze every loop to a lit/static state; disable smooth-scroll and decorative animations.
- WCAG AA contrast on all text and the primary CTA.
- Visible `:focus-visible` amber rings; skip-link to content.
- Decorative app screens `aria-hidden="true"`; the adjacent copy carries the meaning.
- Honor the store-badge rules below (also an accessibility/legal concern).

## 8. Store-badge compliance (from research anti-patterns)

- Use **official** App Store / Google Play badge lockups; **do not** restyle, recolor, or animate them.
- Keep ≥¼-badge-height clear space; min height ~40px.
- Pre-launch: badges visibly marked *coming soon* (dimmed/disabled, not dead links). Real links swap in at launch.

## 9. Success criteria

1. New `index.html` + `assets/css/landing.css` + `assets/js/landing.js`; `config.js` reused; other pages unchanged.
2. All 15 sections render in the Raycast order; six full app screens replace every placeholder (no "screenshots before launch" text anywhere).
3. Hero leads with the store-badge pair (coming soon) + secondary waitlist + QR; lead phone runs the live karaoke.
4. Each of the 6 feature sections is anchored by its matching real screen, alternating sides.
5. Waitlist still posts to Supabase (or local-success when unconfigured), validating email.
6. `prefers-reduced-motion` freezes all motion to readable static states; AA contrast; keyboard-navigable; skip-link present.
7. Responsive: clean at 360 / 768 / 1180+; mobile dockbar appears; nav collapses to hamburger.
8. No console errors; no external runtime deps beyond Google Fonts + Supabase config.
