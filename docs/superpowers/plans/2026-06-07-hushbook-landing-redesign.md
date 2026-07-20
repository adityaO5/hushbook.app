# HushBook Landing Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the HushBook landing page in the Raycast-iOS rhythm — hero with angled app mockups → a feature section per real app screen (×6) → moment band → device availability → centered QR → big footer — with six full, hand-built HTML/CSS app screens and store-badges-front CTAs.

**Architecture:** Static, no build step. Split into `index.html` (semantic markup), `assets/css/styles.css` (all styles, overwriting the orphaned v1), `assets/js/main.js` (vanilla IIFE modules, overwriting the orphaned v1). Reuse `assets/js/config.js` (Supabase) verbatim. Real assets (official store-badge SVGs, 3D badge `.webp` renders, provider logos, app-icon theme variants, local Playfair/Atkinson/Inter fonts, `sherlock-cover.svg`) are wired in rather than recreated.

**Tech Stack:** HTML5, CSS (custom properties, grid/flex, IntersectionObserver-driven reveals), vanilla ES5-ish JS (matches current style), Google Fonts (Fraunces, Hanken Grotesk, Ewert) + local `@font-face` (Playfair Display, Atkinson Hyperlegible, Inter, HushFont), Supabase REST for waitlist, deployed on Vercel.

**Verification model:** This is a static visual site with no test runner; introducing one is YAGNI. Each task's "test" is an explicit **verification step**: serve locally (`python -m http.server 8000` from repo root, open `http://localhost:8000/`), confirm the named render/behavior, check DevTools console for zero errors, and check the reduced-motion + responsive states where relevant. Do **not** auto-run Playwright screenshots while the user is watching the dev server (per project memory) — verify by description or let the user look.

**Source of truth for ported logic:** the current inline `index.html` (pre-rewrite) contains working karaoke, nav, reveal, mini-loop and waitlist scripts and the `#hb-wordmark` SVG symbol. Port these; do not reinvent. Reference them at `git show HEAD:index.html` if the working tree has already been overwritten.

---

## File Structure

| File | Responsibility |
|------|----------------|
| `index.html` | Semantic page: `<head>` (SEO/meta carried from current page), inline `#hb-wordmark` SVG symbol, 15 sections of markup, script tags. No inline CSS; minimal/no inline JS. |
| `assets/css/styles.css` | All styles: tokens, `@font-face`, base/atmosphere, components (buttons/badges/eyebrow/phone frame), nav, hero, trust, 6 feature rows + 6 app screens, moment, availability, QR, FAQ, finale, footer, dockbar, responsive, reduced-motion. **Overwrites** the orphaned v1 file. |
| `assets/js/main.js` | Vanilla IIFE modules: `nav`, `karaoke`, `screenLoops` (score count-up, library shimmer, profile cycle, import progress), `reveal`, `waitlist`. **Overwrites** the orphaned v1 file. |
| `assets/js/config.js` | **Unchanged.** Sets `window.HB_SUPABASE`. |
| `assets/badges/*.svg`, `assets/img/*.webp/png`, `assets/book/sherlock-cover.svg`, `assets/fonts/*` | Existing assets, referenced. |
| (optional cleanup) `assets/js/gsap.min.js`, `assets/js/ScrollTrigger.min.js`, `assets/js/glshader.js` | Orphaned, grep-confirmed unreferenced. Deleted in the final task. |

Asset inventory to wire in:
- Store badges: `assets/badges/app-store-badge.svg`, `assets/badges/google-play-badge.svg`
- 3D badges: `assets/img/streak_7_front.webp`, `streak_30_front.webp`, `books_10_front.webp`, `words_100k_front.webp`, `hours_50_front.webp`, `special_first_transcript_front.webp`
- Providers: `assets/img/librivox.png`, `assets/img/internet_archive.png`
- App-icon themes (for the profiles/themes screen swatches): `assets/img/default_preview.png`, `forest_preview.png`, `crimson_preview.png`, `charcoal_preview.png`, `blush_preview.png`
- Book cover: `assets/book/sherlock-cover.svg`
- Fonts: `assets/fonts/PlayfairDisplay.ttf`, `AtkinsonHyperlegible-Regular.ttf`, `AtkinsonHyperlegible-Bold.ttf`, `Inter-Regular.ttf`, `Inter-Medium.ttf`, `Inter-SemiBold.ttf`, `Inter-Bold.ttf`, `HushFont-Regular.otf`

---

## Task 1: Skeleton — head, font loading, file scaffold

**Files:**
- Modify: `index.html` (full rewrite begins here — keep `<head>` content from current page)
- Overwrite: `assets/css/styles.css`
- Overwrite: `assets/js/main.js`

- [ ] **Step 1: Snapshot the current page for porting**

Run: `git show HEAD:index.html > /tmp/old-index.html` (keeps the working karaoke/waitlist/nav/reveal scripts and `#hb-wordmark` symbol available to copy from). On Windows PowerShell: `git show HEAD:index.html | Out-File -Encoding utf8 $env:TEMP\old-index.html`.

- [ ] **Step 2: Write `index.html` head + body shell**

Carry over verbatim from the current page: the `<head>` (title, description, theme-color, OG/Twitter, canonical, icon) and the `<link>` Google Fonts tag **plus** add Playfair Display to it. Replace the inline `<style>` with a stylesheet link. Body holds the wordmark symbol + a `<main>` placeholder.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- ... existing meta/SEO/OG/canonical/icon carried over unchanged ... -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Ewert&family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,400..600&family=Hanken+Grotesk:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400..800;1,400..600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body>
  <!-- paste the <svg ...><symbol id="hb-wordmark" ...>...</symbol></svg> block from old index.html verbatim -->
  <a class="skip" href="#features">Skip to content</a>
  <main id="top"></main>
  <script src="assets/js/config.js"></script>
  <script src="assets/js/main.js" defer></script>
</body>
</html>
```

(Playfair is loaded from Google here for simplicity; the local `PlayfairDisplay.ttf` is a fallback `@font-face` added in Task 2. Atkinson/Inter/HushFont are local-only `@font-face`, also Task 2.)

- [ ] **Step 3: Initialize `assets/css/styles.css` and `assets/js/main.js` empty-but-valid**

`styles.css`: a single comment header. `main.js`: `'use strict';` + a comment header. (Real content lands in later tasks.)

- [ ] **Step 4: Verify**

Run: `python -m http.server 8000` then open `http://localhost:8000/`. Expected: blank dark-ish page (no styles yet → white is fine), **no console errors**, Network shows `styles.css`, `main.js`, `config.js`, and all four font families (Fraunces, Hanken, Ewert, Playfair) returning 200.

- [ ] **Step 5: Commit**

```bash
git add index.html assets/css/styles.css assets/js/main.js
git commit -m "Landing rewrite: head, fonts, file scaffold"
```

---

## Task 2: Design tokens, @font-face, base, atmosphere, shared components

**Files:**
- Modify: `assets/css/styles.css`

- [ ] **Step 1: Tokens + reset + atmosphere + fonts**

Port the `:root` token block, `*` reset, `html/body`, and the `body::before` (layered radial glow) / `body::after` (grain) atmosphere from the old page verbatim. Add the accent font token and local `@font-face` declarations.

```css
:root{
  --ink:#0B0A09; --ink-2:#100E0C; --surface:#181512; --surface-2:#211C18;
  --line:rgba(245,238,227,.10); --line-soft:rgba(245,238,227,.06);
  --paper:#F6EFE4; --paper-dim:#CABFB0; --muted:#8B8275;
  --amber:#F3C079; --amber-deep:#E0A24C; --amber-2:#FFD89B; --glow:rgba(243,192,121,.40); --sage:#A6C9A9;
  --r-sm:12px; --r-md:18px; --r-lg:26px; --r-xl:34px; --wrap:1180px;
  --ease:cubic-bezier(.22,.61,.36,1);
  --font-d:"Fraunces",Georgia,serif;
  --font-b:"Hanken Grotesk",system-ui,sans-serif;
  --font-logo:"Ewert","Fraunces",Georgia,serif;
  --font-accent:"Playfair Display",Georgia,serif;
  --font-app:"Inter",system-ui,sans-serif;            /* in-screen app UI font */
  --font-a11y:"Atkinson Hyperlegible",system-ui,sans-serif;
}
@font-face{font-family:"Playfair Display";src:url("../fonts/PlayfairDisplay.ttf") format("truetype");font-weight:400 800;font-display:swap}
@font-face{font-family:"Inter";src:url("../fonts/Inter-Regular.ttf") format("truetype");font-weight:400;font-display:swap}
@font-face{font-family:"Inter";src:url("../fonts/Inter-Medium.ttf") format("truetype");font-weight:500;font-display:swap}
@font-face{font-family:"Inter";src:url("../fonts/Inter-SemiBold.ttf") format("truetype");font-weight:600;font-display:swap}
@font-face{font-family:"Inter";src:url("../fonts/Inter-Bold.ttf") format("truetype");font-weight:700;font-display:swap}
@font-face{font-family:"Atkinson Hyperlegible";src:url("../fonts/AtkinsonHyperlegible-Regular.ttf") format("truetype");font-weight:400;font-display:swap}
@font-face{font-family:"Atkinson Hyperlegible";src:url("../fonts/AtkinsonHyperlegible-Bold.ttf") format("truetype");font-weight:700;font-display:swap}
@font-face{font-family:"HushFont";src:url("../fonts/HushFont-Regular.otf") format("opentype");font-weight:400;font-display:swap}
```

(`@font-face` paths are relative to `assets/css/`, so `../fonts/…`.)

- [ ] **Step 2: Shared components**

Port verbatim from the old page: `.wrap`, `.skip`, `.btn`/`.btn-primary`/`.btn-ghost`/`:active`, `:focus-visible` rings, `.badge`+`.dot`+`@keyframes pulse`, `.eyebrow`, `.sec`/`.sec-head`/`.sec-head.center`, `.reveal`/`.reveal.in`, and the `@media (prefers-reduced-motion:reduce)` block (sets `.reveal` visible, kills animations/scroll-behavior).

Add the store-badge image lockup component (used in nav/hero/availability/finale):

```css
.storebadges{display:flex;gap:12px;flex-wrap:wrap;align-items:center}
.storebadge{display:inline-flex;height:48px;position:relative;border-radius:9px;overflow:hidden}
.storebadge img{height:100%;width:auto;display:block}      /* official lockup, never restyled */
.storebadge.soon{opacity:.55;pointer-events:none}
.storebadge.soon::after{content:"Coming soon";position:absolute;left:50%;bottom:4px;transform:translateX(-50%);
  font:600 9px/1 var(--font-b);letter-spacing:.08em;text-transform:uppercase;color:#fff;
  background:rgba(0,0,0,.6);padding:2px 6px;border-radius:99px;white-space:nowrap}
```

Add the device-frame component (reused by all 6 screens):

```css
.phone{position:relative;border-radius:38px;padding:14px;aspect-ratio:9/19;
  background:linear-gradient(160deg,#2a241f,#0d0b0a);border:1px solid rgba(245,238,227,.12);
  box-shadow:0 40px 80px -40px rgba(0,0,0,.85), inset 0 1px 0 rgba(255,255,255,.08)}
.phone::before{content:"";position:absolute;top:18px;left:50%;transform:translateX(-50%);
  width:64px;height:5px;border-radius:99px;background:rgba(0,0,0,.5);z-index:3}
.scr{height:100%;border-radius:26px;overflow:hidden;position:relative;
  background:linear-gradient(180deg,#141110,#0c0a09);font-family:var(--font-app);color:var(--paper)}
```

- [ ] **Step 3: Verify**

Reload `localhost:8000`. Expected: dark background with warm radial glow + faint grain; no content yet but no console errors. In DevTools, confirm `Atkinson Hyperlegible`, `Inter`, `HushFont`, `Playfair Display` appear under Network/Fonts (loaded or ready to load).

- [ ] **Step 4: Commit**

```bash
git add assets/css/styles.css
git commit -m "Landing rewrite: tokens, font-face, base atmosphere, shared components"
```

---

## Task 3: Navigation (markup + CSS + JS module)

**Files:**
- Modify: `index.html` (nav), `assets/css/styles.css` (nav), `assets/js/main.js` (nav module)

- [ ] **Step 1: Nav markup**

Insert before `<main>`. Brand reuses `#hb-wordmark`. Desktop CTA = store-badge pair (coming soon); links scroll to sections.

```html
<header class="nav" id="nav">
  <div class="wrap nav-inner">
    <a class="brand" href="#top" aria-label="HushBook home">
      <span class="logo" aria-hidden="true"><span class="h">H</span></span>
      <svg class="wordmark" viewBox="0 0 617 93" aria-hidden="true" focusable="false"><use href="#hb-wordmark"/></svg>
    </a>
    <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="nav-menu">
      <svg class="ic-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      <svg class="ic-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6 18 18M18 6 6 18"/></svg>
    </button>
    <nav class="nav-links" id="nav-menu">
      <a href="#features">Features</a>
      <a href="#how">How it works</a>
      <a href="#faq">FAQ</a>
      <a href="/about">About</a>
      <span class="nav-cta storebadges">
        <a class="storebadge soon" aria-disabled="true"><img src="assets/badges/app-store-badge.svg" alt="Download on the App Store (coming soon)"></a>
        <a class="storebadge soon" aria-disabled="true"><img src="assets/badges/google-play-badge.svg" alt="Get it on Google Play (coming soon)"></a>
      </span>
    </nav>
  </div>
</header>
```

- [ ] **Step 2: Nav CSS**

Port `.nav`, `.nav-inner`, `.brand`/`.logo`/`.h`/`.wordmark`, `.nav-links`, `.nav-toggle` + the `@media(max-width:880px)` collapse from the old page. In the mobile menu, the `.nav-cta` store-badges stack full-width (`.nav-cta{display:flex;gap:10px;margin-top:14px}` inside the breakpoint; shrink badge height to ~40px on mobile).

- [ ] **Step 3: Nav JS module**

Port the mobile-nav IIFE from old index.html into `main.js` verbatim (open/close, aria sync, Escape, outside-click, resize reset).

- [ ] **Step 4: Verify**

Reload. Expected: sticky blurred nav, wordmark renders, store badges show with dimmed "Coming soon" overlay. Resize < 880px: hamburger appears, opens/closes the menu, Escape and outside-click close it, badges stack. No console errors.

- [ ] **Step 5: Commit**

```bash
git add index.html assets/css/styles.css assets/js/main.js
git commit -m "Landing rewrite: sticky nav with store-badge CTA + mobile menu"
```

---

## Task 4: Hero (store-badges-front) + Screen 1 (read-along player) + karaoke JS

**Files:**
- Modify: `index.html` (hero), `assets/css/styles.css` (hero + `.scr--player`), `assets/js/main.js` (karaoke module)

- [ ] **Step 1: Hero markup**

Two-column hero: copy left (eyebrow, H1, sub, **store-badge pair primary**, secondary "or join the waitlist →" anchor to `#finale`, QR card), visual right (angled phone running the live read-along player = Screen 1).

```html
<section class="hero">
  <div class="wrap">
    <div class="hero__copy">
      <span class="badge"><span class="dot"></span>iOS &amp; Android · Coming soon</span>
      <h1>Read along with <span class="hl">every word</span> you hear.</h1>
      <p class="hero__sub">HushBook turns any audiobook into word-level karaoke — transcribed privately on your phone.</p>
      <div class="hero__cta">
        <div class="storebadges">
          <a class="storebadge soon" aria-disabled="true"><img src="assets/badges/app-store-badge.svg" alt="Download on the App Store (coming soon)"></a>
          <a class="storebadge soon" aria-disabled="true"><img src="assets/badges/google-play-badge.svg" alt="Get it on Google Play (coming soon)"></a>
        </div>
        <a class="hero__alt" href="#finale">or join the waitlist →</a>
      </div>
      <div class="hero__qr">
        <span class="hero__qr-box" aria-hidden="true"><!-- QR asset added in Task 12 (placeholder box for now) --></span>
        <small>Scan to get the app — coming soon to your phone.</small>
      </div>
    </div>
    <div class="hero__visual reveal">
      <div class="phone phone--hero">
        <div class="scr scr--player" id="player-hero">
          <div class="player__bar"><span class="live"><i></i>Now reading</span><span class="player__title">A Scandal in Bohemia</span></div>
          <p class="karaoke" id="karaoke" aria-label="A demonstration of synced read-along lyrics"></p>
          <div class="player__scrub" aria-hidden="true"><i id="scrub"></i></div>
          <div class="player__transport" aria-hidden="true">
            <button class="pp" aria-label="Play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Hero + player-screen CSS**

Port the `.hero`, `.hero .wrap` grid, `.badge`/`.dot`, `.hero h1`/`.hl`, `.hero__sub` from the old page. Add `.hero__cta` (column gap), `.hero__alt` (amber underlined link), `.hero__qr` (small flex row, `.hero__qr-box` ~96px square dashed-border placeholder).

`.phone--hero` is rotated for the Raycast fan: `transform:rotate(3deg)`; on `:hover` ease to `rotate(0)`. Max-width ~320px, centered. Below 900px the hero grid collapses to one column and the phone un-rotates.

Player screen (`.scr--player`) — port and rename the old `.demo__bar`/`.karaoke`/`.hero__scrub` rules into `.player__bar`/`.karaoke`/`.player__scrub`, keep the word states:

```css
.scr--player{padding:30px 18px 18px;display:flex;flex-direction:column;gap:18px}
.player__bar{display:flex;align-items:center;gap:10px;color:var(--muted);font-size:12px;font-weight:600}
.player__bar .live{display:inline-flex;align-items:center;gap:6px;color:var(--amber)}
.player__bar .live i{width:6px;height:6px;border-radius:50%;background:var(--amber);box-shadow:0 0 8px var(--amber)}
.player__title{margin-left:auto;font-family:var(--font-d)}
.karaoke{font-family:var(--font-d);font-weight:400;font-size:clamp(17px,2vw,21px);line-height:1.5;letter-spacing:-.01em}
.karaoke .w{color:rgba(245,238,227,.22);transition:color .35s var(--ease),text-shadow .35s var(--ease)}
.karaoke .w.read{color:rgba(245,238,227,.55)}
.karaoke .w.lit{color:var(--amber);text-shadow:0 0 18px var(--glow)}
.player__scrub{height:4px;border-radius:99px;background:rgba(245,238,227,.10);overflow:hidden;margin-top:auto}
.player__scrub i{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--amber-deep),var(--amber-2))}
.player__transport{display:flex;justify-content:center}
.player__transport .pp{width:38px;height:38px;border-radius:50%;border:0;cursor:pointer;color:#241704;
  background:linear-gradient(160deg,var(--amber-2),var(--amber-deep));display:grid;place-items:center}
```

- [ ] **Step 3: Karaoke JS module**

Port the karaoke IIFE from old index.html into `main.js` verbatim (word-span builder, timed `tick()` auto-play loop with per-word duration, scrubber width, tap-to-jump, `prefers-reduced-motion` → static `paint(4)`). It targets `#karaoke` and `#scrub` exactly as before.

- [ ] **Step 4: Verify**

Reload. Expected: hero with headline, store-badge pair (coming soon), "or join the waitlist" link, QR placeholder; phone tilted ~3°, words light up amber one-by-one and loop, scrubber fills, tapping a word jumps. Toggle OS reduced-motion → verse renders fully lit, no loop. Collapse to mobile → single column, phone upright. No console errors.

- [ ] **Step 5: Commit**

```bash
git add index.html assets/css/styles.css assets/js/main.js
git commit -m "Landing rewrite: store-badges-front hero + live read-along player (Screen 1)"
```

---

## Task 5: Trust band

**Files:** Modify `index.html`, `assets/css/styles.css`

- [ ] **Step 1: Markup** — port the 4-item trust strip verbatim (`on-device`, `works offline`, `thousands of titles`, `MP3/M4B & more`) inside `<section class="wrap" aria-label="Why HushBook">` with `.trust`/`.trust__item`.
- [ ] **Step 2: CSS** — port `.trust`, `.trust__item`, `.trust__item b`, and the `@media(max-width:760px)` 2-col rule.
- [ ] **Step 3: Verify** — reload; 4-up strip under hero, 2-up on mobile, no console errors.
- [ ] **Step 4: Commit**

```bash
git add index.html assets/css/styles.css
git commit -m "Landing rewrite: trust band"
```

---

## Task 6: Feature-row layout + §1 Read-along karaoke section

**Files:** Modify `index.html`, `assets/css/styles.css`

- [ ] **Step 1: Shared `.feature-row` CSS**

```css
.feature-row{display:grid;grid-template-columns:1fr 1fr;gap:clamp(32px,5vw,72px);align-items:center}
.feature-row + .feature-row{margin-top:clamp(64px,9vw,120px)}
.feature-row.flip .feature-row__media{order:-1}        /* alternate screen side */
.feature-row__copy .eyebrow{margin-bottom:14px}
.feature-row__copy h2{font-family:var(--font-d);font-weight:400;font-size:clamp(28px,4vw,46px);line-height:1.08;letter-spacing:-.02em}
.feature-row__copy p{color:var(--paper-dim);font-size:clamp(16px,1.7vw,18px);margin-top:16px}
.feature-row__points{margin-top:22px;display:flex;flex-direction:column;gap:12px}
.feature-row__points li{display:flex;gap:10px;color:var(--paper-dim);font-size:15px;list-style:none}
.feature-row__points svg{flex:none;width:18px;height:18px;color:var(--amber)}
.feature-row__media{display:flex;justify-content:center}
.feature-row__media .phone{max-width:300px}
@media(max-width:860px){.feature-row{grid-template-columns:1fr;gap:36px}.feature-row.flip .feature-row__media{order:0}}
```

- [ ] **Step 2: §1 markup**

`<section class="sec" id="features">` opens with a centered `.sec-head` ("What it does"), then the first `.feature-row`: copy (eyebrow "Read-along", h2 "Word-level karaoke for any audiobook", paragraph, 3 `.feature-row__points`) + media = **a second instance of the player screen** (`.scr--player` markup, but give the karaoke a distinct id `#karaoke-feat` and scrub `#scrub-feat`, OR reuse a static lit copy). To keep one karaoke engine, render this screen statically lit (no second animation) and let the hero be the live one.

- [ ] **Step 3: Verify** — reload; section header + first feature row (text ↔ player screen). Responsive stacks at ≤860px. No console errors.
- [ ] **Step 4: Commit**

```bash
git add index.html assets/css/styles.css
git commit -m "Landing rewrite: feature-row layout + Read-along section (§1)"
```

---

## Task 7: §2 Free library + Screen 2 (library) + shimmer JS

**Files:** Modify `index.html`, `assets/css/styles.css`, `assets/js/main.js`

- [ ] **Step 1: Library screen CSS (`.scr--lib`)** — top search field + horizontal category chips; vertical scroll list of rows: cover (use `assets/book/sherlock-cover.svg` for one, gradient placeholders for others), title/author lines, a download ring. Source row at bottom showing `librivox.png` + `internet_archive.png` on light chips (`.provider-chip{background:rgba(245,238,227,.9);border-radius:6px;padding:3px 6px}` so the dark logos read).

```css
.scr--lib{display:flex;flex-direction:column;padding:26px 14px 14px;gap:12px}
.lib__search{height:30px;border-radius:99px;background:rgba(245,238,227,.06);display:flex;align-items:center;gap:8px;padding:0 12px;color:var(--muted);font-size:12px}
.lib__chips{display:flex;gap:7px;overflow:hidden}
.lib__chip{font-size:11px;padding:4px 10px;border-radius:99px;border:1px solid var(--line);color:var(--paper-dim);white-space:nowrap}
.lib__chip.on{background:rgba(243,192,121,.14);border-color:rgba(243,192,121,.4);color:var(--amber)}
.lib__row{display:flex;align-items:center;gap:11px}
.lib__cv{width:34px;height:46px;border-radius:6px;flex:none;overflow:hidden;background:linear-gradient(155deg,#3a2f24,#211a14);box-shadow:inset 0 0 0 1px rgba(243,192,121,.12)}
.lib__cv img{width:100%;height:100%;object-fit:cover}
.lib__meta{flex:1;display:flex;flex-direction:column;gap:6px}
.lib__ln{height:7px;border-radius:99px;background:rgba(245,238,227,.18)}
.lib__ln.s{height:6px;width:55%;background:rgba(245,238,227,.10)}
.lib__dl{width:22px;height:22px;border-radius:50%;border:1.5px solid var(--amber-deep);flex:none;display:grid;place-items:center;color:var(--amber)}
```

- [ ] **Step 2: §2 markup** — `.feature-row flip` (screen on the left): copy (eyebrow "Library", h2 "Thousands of classics, free", paragraph, points) + `.scr--lib` with ~6 rows + provider chips.
- [ ] **Step 3: Shimmer JS** — in `main.js` `screenLoops`, on reveal add a subtle pulse to one `.lib__dl` (download filling) via a CSS class toggle; guard with reduced-motion (skip).
- [ ] **Step 4: Verify** — reload; library screen with search/chips/rows, provider logos legible on light chips, one download ring pulses (static under reduced-motion). Row order alternates (screen left). No console errors.
- [ ] **Step 5: Commit**

```bash
git add index.html assets/css/styles.css assets/js/main.js
git commit -m "Landing rewrite: Free library section (§2) + library screen"
```

---

## Task 8: §3 Analytics & neuron score + Screen 3 + count-up JS

**Files:** Modify `index.html`, `assets/css/styles.css`, `assets/js/main.js`

- [ ] **Step 1: Score screen CSS (`.scr--stats`)** — port/extend the old `.ring`/`.spark` rules. Big conic-gradient score ring with a Playfair numeral, a "Neuron score" caption, three stat chips (streak, words read, comprehension), and a sparkline. Numeral uses `font-family:var(--font-accent)`.
- [ ] **Step 2: §3 markup** — `.feature-row` (screen right): copy (eyebrow "Analytics", h2 "A living neuron score", paragraph, points) + `.scr--stats` with ring `#neuron-ring` and numeral `#neuron-num` (data-target="82").
- [ ] **Step 3: Count-up JS**

```js
/* score count-up — runs once when the stats screen reveals */
(function(){
  var num=document.getElementById('neuron-num'); if(!num) return;
  var target=parseInt(num.getAttribute('data-target'),10)||0;
  var reduce=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  if(reduce){ num.textContent=target; return; }
  var io=new IntersectionObserver(function(es){es.forEach(function(e){
    if(!e.isIntersecting) return; io.unobserve(e.target);
    var t0=null, dur=1100;
    function step(ts){ if(!t0)t0=ts; var p=Math.min((ts-t0)/dur,1);
      num.textContent=Math.round(target*(p<1?(1-Math.pow(1-p,3)):1));
      if(p<1) requestAnimationFrame(step); }
    requestAnimationFrame(step);
  });},{threshold:.4});
  io.observe(num);
})();
```

- [ ] **Step 4: Verify** — reload; scroll to §3, score counts up to 82 once (shows 82 immediately under reduced-motion), sparkline + stat chips render. No console errors.
- [ ] **Step 5: Commit**

```bash
git add index.html assets/css/styles.css assets/js/main.js
git commit -m "Landing rewrite: Analytics section (§3) + neuron-score screen"
```

---

## Task 9: §4 Accessibility profiles + Screen 4 + profile-cycle JS

**Files:** Modify `index.html`, `assets/css/styles.css`, `assets/js/main.js`

- [ ] **Step 1: Profiles screen CSS (`.scr--a11y`)** — segmented control (Vision / Dyslexia / Comprehension), a sample reading block whose font/size swaps per profile, a caption-size indicator, and a row of theme swatches built from the app-icon variants. Profiles map to data attributes the JS toggles:

```css
.scr--a11y{padding:26px 16px 16px;display:flex;flex-direction:column;gap:16px}
.a11y__seg{display:flex;background:rgba(245,238,227,.06);border-radius:99px;padding:3px}
.a11y__seg button{flex:1;border:0;background:transparent;color:var(--paper-dim);font:600 11px/1 var(--font-b);padding:7px 4px;border-radius:99px;cursor:pointer}
.a11y__seg button[aria-pressed="true"]{background:var(--amber);color:#241704}
.a11y__sample{font-size:15px;line-height:1.5;color:var(--paper)}
.scr--a11y[data-profile="vision"] .a11y__sample{font-family:var(--font-a11y);font-size:18px}
.scr--a11y[data-profile="dyslexia"] .a11y__sample{font-family:var(--font-a11y);letter-spacing:.02em;word-spacing:.12em}
.scr--a11y[data-profile="comprehension"] .a11y__sample{font-family:var(--font-app)}
.a11y__themes{display:flex;gap:8px}
.a11y__themes img{width:34px;height:34px;border-radius:9px;border:1px solid var(--line)}
```

(Atkinson Hyperlegible approximates the Vision/Dyslexia faces; OpenDyslexic is not bundled — Atkinson + letter/word-spacing is the documented stand-in. Do not block on font assets.)

- [ ] **Step 2: §4 markup** — `.feature-row flip` (screen left): copy (eyebrow "Accessibility", h2 "An app that fits how you read", paragraph, points) + `.scr--a11y` with seg buttons, a sample paragraph, caption-size dots, and 5 `.a11y__themes img` (`default/forest/crimson/charcoal/blush_preview.png`).
- [ ] **Step 3: Profile-cycle JS** — in `screenLoops`: clicking a seg button sets `data-profile` + `aria-pressed`; on reveal, auto-advance through the three profiles every ~2.6s until the user interacts; reduced-motion → no auto-advance, default to "vision".
- [ ] **Step 4: Verify** — reload; §4 screen: tapping Vision/Dyslexia/Comprehension swaps the sample font/size; theme swatches show the 5 icon colors; auto-cycles until clicked; static under reduced-motion. No console errors.
- [ ] **Step 5: Commit**

```bash
git add index.html assets/css/styles.css assets/js/main.js
git commit -m "Landing rewrite: Accessibility section (§4) + profiles screen"
```

---

## Task 10: §5 Collectible badges & streaks + Screen 5 (real 3D renders)

**Files:** Modify `index.html`, `assets/css/styles.css`

- [ ] **Step 1: Badges screen CSS (`.scr--badges`)** — a 2-col grid of the six real `.webp` badge renders with labels, plus a streak calendar strip and a goal ring. Badge images sit on transparent tiles with a soft radial glow behind.

```css
.scr--badges{padding:26px 16px 16px;display:flex;flex-direction:column;gap:16px}
.badges-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.badge-cell{display:flex;flex-direction:column;align-items:center;gap:6px}
.badge-cell img{width:100%;aspect-ratio:1;object-fit:contain;filter:drop-shadow(0 6px 14px rgba(0,0,0,.5))}
.badge-cell span{font-size:9.5px;color:var(--paper-dim);text-align:center}
.streak-cal{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}
.streak-cal i{aspect-ratio:1;border-radius:4px;background:rgba(245,238,227,.08)}
.streak-cal i.on{background:var(--amber)}
```

- [ ] **Step 2: §5 markup** — `.feature-row` (screen right): copy (eyebrow "Momentum", h2 "Streaks you can hold in your hand", paragraph, points) + `.scr--badges` with the six images:
  `streak_7_front.webp` "7-day", `streak_30_front.webp` "30-day", `books_10_front.webp` "10 books", `words_100k_front.webp` "100k words", `hours_50_front.webp` "50 hours", `special_first_transcript_front.webp` "First transcript"; plus a 14-cell streak calendar (some `.on`).
- [ ] **Step 3: Verify** — reload; §5 shows the six real 3D badges in a grid with labels + streak strip. Images load (200). No console errors.
- [ ] **Step 4: Commit**

```bash
git add index.html assets/css/styles.css
git commit -m "Landing rewrite: Badges section (§5) with real 3D renders"
```

---

## Task 11: §6 On-device & import + Screen 6 (import) + progress JS

**Files:** Modify `index.html`, `assets/css/styles.css`, `assets/js/main.js`

- [ ] **Step 1: Import screen CSS (`.scr--import`)** — a file row (MP3/M4B chip), a detected-chapters list, an on-device transcription progress bar, and a reassurance line "Audio never leaves this phone" with a lock glyph.

```css
.scr--import{padding:26px 16px 16px;display:flex;flex-direction:column;gap:14px}
.imp__file{display:flex;align-items:center;gap:10px;padding:10px;border:1px solid var(--line);border-radius:12px}
.imp__file .fmt{font:700 10px/1 var(--font-b);color:var(--amber);border:1px solid rgba(243,192,121,.4);border-radius:5px;padding:3px 5px}
.imp__chaps{display:flex;flex-direction:column;gap:7px}
.imp__chap{display:flex;justify-content:space-between;font-size:12px;color:var(--paper-dim)}
.imp__bar{height:6px;border-radius:99px;background:rgba(245,238,227,.10);overflow:hidden}
.imp__bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--amber-deep),var(--amber-2))}
.imp__safe{display:flex;align-items:center;gap:7px;font-size:12px;color:var(--sage)}
```

- [ ] **Step 2: §6 markup** — `.feature-row flip` (screen left): copy (eyebrow "Private by design", h2 "Transcribed on your phone, never the cloud", paragraph, points) + `.scr--import` with file row, ~3 chapters, progress bar `#imp-bar`, and the safe line.
- [ ] **Step 3: Progress JS** — in `screenLoops`: on reveal, animate `#imp-bar i` width 0→~68% over ~1.6s (rAF), then hold; reduced-motion → set width to 68% immediately.
- [ ] **Step 4: Verify** — reload; §6 import screen, progress bar fills then holds (static under reduced-motion), "Audio never leaves this phone" in sage. No console errors.
- [ ] **Step 5: Commit**

```bash
git add index.html assets/css/styles.css assets/js/main.js
git commit -m "Landing rewrite: Private/import section (§6) + import screen"
```

---

## Task 12: Moment band + Availability row + QR section

**Files:** Modify `index.html`, `assets/css/styles.css`; add a QR asset

- [ ] **Step 1: Moment band** — port the old `.band`/`#how` band. Statement set in `var(--font-accent)` (Playfair) for the editorial accent: "Apple-Music lyrics, for books." + supporting paragraph. `id="how"` (nav target).
- [ ] **Step 2: Availability row** — `<section>` "iOS & Android, launching together": two upright phones (reuse `.scr--player` static + `.scr--lib`), copy, and a `.storebadges` pair (coming soon). CSS: simple centered grid, phones side by side, collapse on mobile.
- [ ] **Step 3: QR section + asset** — centered card with a QR code that encodes `https://hushbook.app/` (pre-launch, points to the site/waitlist). Generate `assets/img/qr-hushbook.svg` (an SVG QR for `https://hushbook.app/`) and reference it in both this section and the hero `.hero__qr-box` (replace the placeholder). Caption: "Scan to get HushBook — coming soon." If QR generation tooling is unavailable at build time, use a static pre-generated SVG/PNG committed to `assets/img/`.

```css
.qr{text-align:center;display:flex;flex-direction:column;align-items:center;gap:16px}
.qr__card{width:180px;height:180px;border-radius:20px;background:#F6EFE4;padding:16px;display:grid;place-items:center}
.qr__card img{width:100%;height:100%}
```

- [ ] **Step 4: Verify** — reload; Playfair moment statement reads as an editorial accent; availability row shows two phones + coming-soon badges; QR renders in both the section and the hero; scanning the QR opens hushbook.app. Mobile collapses cleanly. No console errors.
- [ ] **Step 5: Commit**

```bash
git add index.html assets/css/styles.css assets/img/qr-hushbook.svg
git commit -m "Landing rewrite: moment band, availability row, QR-to-download"
```

---

## Task 13: FAQ + Finale CTA + waitlist JS

**Files:** Modify `index.html`, `assets/css/styles.css`, `assets/js/main.js`

- [ ] **Step 1: FAQ** — port the `.faq` `<details>` accordion + all six Q/A pairs verbatim, `id="faq"`.
- [ ] **Step 2: Finale** — port `.finale` with `id="finale"`: mark, h2, paragraph, the waitlist `<form class="waitlist" id="form-finale" novalidate>` (email field + submit + note + `.waitlist__ok` status), and a `.storebadges` pair (coming soon). Also add the waitlist form CSS (`.waitlist`, `.field`, `.field input`, `.waitlist__note`, `.waitlist__ok`, mobile stack) ported from the old page.
- [ ] **Step 3: Waitlist JS** — port the waitlist IIFE from old index.html verbatim (email regex, `isLive(cfg)` check against `window.HB_SUPABASE`, POST to `/rest/v1/waitlist_signups` with `apikey`/`Authorization`/`Prefer`, local-success fallback, status messaging). It binds to every `.waitlist` form, so the hero's "join the waitlist →" anchor target works once the finale form exists.
- [ ] **Step 4: Verify** — reload; FAQ accordion opens/closes; finale form validates a bad email (inline error), and on a valid email shows the success line. With `config.js` live, confirm a row reaches Supabase (or the network POST returns 2xx/409). No console errors.
- [ ] **Step 5: Commit**

```bash
git add index.html assets/css/styles.css assets/js/main.js
git commit -m "Landing rewrite: FAQ + finale waitlist (Supabase) + store badges"
```

---

## Task 14: Footer + mobile dockbar + reveal module

**Files:** Modify `index.html`, `assets/css/styles.css`, `assets/js/main.js`

- [ ] **Step 1: Footer** — port the `<footer>` multi-column grid (brand blurb, Product, Company, Legal columns with `/about`, `/privacy-policy`, `/terms-conditions`, `/licenses`, `mailto:aditya@hushbook.app`), the `.foot-bottom` copyright + social icons (X, Instagram, email). Port `.foot-*` CSS.
- [ ] **Step 2: Dockbar** — port the `.dockbar` sticky mobile CTA; change its button to scroll to `#finale` (waitlist). Port `.dockbar` CSS (shows ≤760px, adds footer bottom padding).
- [ ] **Step 3: Reveal JS** — port the IntersectionObserver `reveal` IIFE (adds `.in`, staggered `transition-delay`). Ensure every `.reveal` element across all sections is observed.
- [ ] **Step 4: Verify** — reload; footer columns + social links resolve to the right routes; dockbar appears ≤760px and scrolls to the waitlist; sections fade/rise in on scroll (instant under reduced-motion). No console errors.
- [ ] **Step 5: Commit**

```bash
git add index.html assets/css/styles.css assets/js/main.js
git commit -m "Landing rewrite: footer, mobile dockbar, scroll reveals"
```

---

## Task 15: Full QA pass — responsive, a11y, reduced-motion, badge compliance

**Files:** Modify as needed across `index.html`, `assets/css/styles.css`, `assets/js/main.js`

- [ ] **Step 1: Responsive sweep** — at 360 / 768 / 1180+ confirm: no horizontal scroll, hero stacks, feature rows stack (screens never overflow the phone frame), trust 2-up, nav hamburger, dockbar. Fix any overflow (`overflow-x:hidden` on body is already present).
- [ ] **Step 2: Reduced-motion audit** — with OS reduce-motion ON: karaoke static-lit, no count-up/profile-cycle/import/shimmer animation, reveals instant, `scroll-behavior:auto`. Every loop in `main.js` must early-return on the reduce check.
- [ ] **Step 3: Keyboard + SR** — Tab through: skip-link works, focus rings visible on nav/links/badges/form/FAQ, FAQ toggles via keyboard, decorative phone screens are `aria-hidden="true"` and the adjacent copy carries the meaning. Store-badge `<img>` alts say "(coming soon)".
- [ ] **Step 4: Store-badge compliance** — official lockups unaltered (no recolor/animate), ≥40px tall, ≥¼-height clear space around each. The "Coming soon" overlay sits outside the badge glyph, not painted over it.
- [ ] **Step 5: Console + meta** — zero console errors/warnings; `<title>`/OG/canonical intact; `theme-color` still `#0B0A09`.
- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Landing rewrite: QA pass — responsive, a11y, reduced-motion, badge compliance"
```

---

## Task 16: Remove orphaned assets + final commit + PR

**Files:** Delete `assets/js/gsap.min.js`, `assets/js/ScrollTrigger.min.js`, `assets/js/glshader.js`

- [ ] **Step 1: Confirm unreferenced** — `git grep -n -E "gsap|ScrollTrigger|glshader"` returns only `research/report.html` prose (no live reference). If anything else references them, stop and reassess.
- [ ] **Step 2: Delete + commit**

```bash
git rm assets/js/gsap.min.js assets/js/ScrollTrigger.min.js assets/js/glshader.js
git commit -m "Remove orphaned v1 GSAP/shader assets (unused after landing rewrite)"
```

- [ ] **Step 3: Push + open PR** (only if the user asks to push)

```bash
git push -u origin landing-raycast-redesign
gh pr create --title "Raycast-rhythm landing redesign with 6 app screens" --body "Implements docs/superpowers/specs/2026-06-07-hushbook-landing-redesign-design.md. Full rewrite into index.html + assets/css/styles.css + assets/js/main.js; six hand-built app screens; store-badges-front hero; real badge/provider/store assets wired in.

🤖 Generated with [Claude Code](https://claude.com/claude-code)"
```

---

## Self-Review

**Spec coverage:**
- Full rewrite, split files (styles.css/main.js/config.js) — Tasks 1–2, all. ✓
- Six full app screens — Screen 1 (T4), 2 (T7), 3 (T8), 4 (T9), 5 (T10), 6 (T11). ✓
- Store-badges-front hero + secondary waitlist + QR — T4, T12. ✓
- 15-section Raycast flow — nav T3, hero T4, trust T5, §1 T6, §2 T7, §3 T8, §4 T9, §5 T10, §6 T11, moment+availability+QR T12, FAQ+finale T13, footer+dockbar T14. ✓
- Waitlist → Supabase reused — T13. ✓
- Reduced-motion / AA / keyboard / skip-link — built per-task, audited T15. ✓
- Store-badge compliance — component T2, audit T15. ✓
- Playfair accent — loaded T1, tokenized T2, used in moment band T12 + neuron numeral T8. ✓
- Real assets (badges/providers/themes/cover/fonts) — T7, T9, T10, T12. ✓
- Responsive 360/768/1180 — T15. ✓

**Placeholder scan:** No "TBD/TODO/handle edge cases". Visual CSS sections give exact class contracts + key rules; ported logic (karaoke/nav/reveal/waitlist) is taken verbatim from the named source file (`git show HEAD:index.html`) rather than re-specified, which is intentional reuse, not a placeholder. The only deliberately-deferred artifact is the QR SVG, with an explicit fallback (commit a static pre-generated file).

**Type/name consistency:** IDs are unique and consistent across HTML/JS — `#karaoke`/`#scrub` (hero, T4) vs `#karaoke-feat`/`#scrub-feat` (static, T6); `#neuron-num` (T8); `#imp-bar` (T11); forms `#form-finale` (T13). Screen classes `.scr--player/lib/stats/a11y/badges/import` are each defined once and reused. `screenLoops` module accretes across T7/T8/T9/T11 — keep it one IIFE with guarded sub-blocks.

**Note on altitude:** visual CSS is specified as component contracts (classes, key declarations, responsive + state rules) rather than pixel-final stylesheets, because the exact styling is the creative build. Logic-bearing code (JS modules, ported scripts, asset wiring) is given concretely. A worker can execute each task deterministically; fine visual tuning happens during the task and is checked in its verify step.
