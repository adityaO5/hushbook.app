# Glass Testimonial Marquee Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh HushBook testimonial cards with calm glassmorphism while retaining accessible horizontal auto-scrolling.

**Architecture:** Keep testimonials self-contained in `index.html`. Replace current opaque card surface with CSS glass layers, retain existing cloned review set and track animation, and preserve current interaction and reduced-motion behavior.

**Tech Stack:** Semantic HTML, CSS custom properties and animations, existing vanilla JavaScript.

## Global Constraints

- Modify only testimonial presentation and motion styling in `index.html`.
- Preserve every review, rating, platform label, semantic list role, source mark, and review order.
- Do not add dependencies, image assets, or third-party runtime code.
- Keep one seamless, right-to-left horizontal marquee with hover/focus pause.
- Preserve `prefers-reduced-motion: reduce` horizontal snap-list fallback.
- Do not introduce page-level horizontal overflow.

---

### Task 1: Add glass-card visual treatment

**Files:**
- Modify: `index.html:119-145` (`.review-card` testimonial CSS)
- Test: `index.html` CSS/markup validation command

**Interfaces:**
- Consumes: Existing `.review-card`, `.review-mark`, `.review-source`, `.review-stars`, and `.review-quote` markup.
- Produces: Glass card styling without markup or JavaScript changes.

- [ ] **Step 1: Write failing visual-contract check**

Run:

```powershell
$html = Get-Content -Raw 'index.html'
if ($html -notmatch '\.review-card\{[^}]*backdrop-filter:blur\(') { throw 'Glass blur missing' }
if ($html -notmatch '\.review-card\{[^}]*rgba\(.*\.\d+\)') { throw 'Translucent card surface missing' }
```

Expected: FAIL with `Glass blur missing` before glass CSS is added.

- [ ] **Step 2: Add minimal glass surface CSS**

Replace only `.review-card` visual properties so it has a translucent charcoal background, `backdrop-filter: blur(14px) saturate(115%)`, a low-opacity light border, inset top highlight, and restrained outer shadow. Retain dimensions, flex layout, `overflow:hidden`, and `isolation:isolate`.

```css
background:linear-gradient(145deg,rgba(57,60,65,.56),rgba(28,30,34,.48));
border:1px solid rgba(255,255,255,.16);
backdrop-filter:blur(14px) saturate(115%);
-webkit-backdrop-filter:blur(14px) saturate(115%);
box-shadow:inset 1px 1px 0 rgba(255,255,255,.16),inset -1px -1px 0 rgba(0,0,0,.28),0 18px 42px rgba(0,0,0,.24);
```

- [ ] **Step 3: Add restrained sheen layer**

Add `.review-card::after` with no text, `pointer-events:none`, and a low-opacity top-left radial highlight. Keep it below review text by using existing child `z-index:1` and the card stacking context.

```css
.review-card::after{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at 12% 0,rgba(255,255,255,.11),transparent 38%);z-index:0}
```

- [ ] **Step 4: Run visual-contract check**

Run command from Step 1.

Expected: No output and exit code `0`.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: add glass testimonial cards"
```

### Task 2: Preserve calm marquee motion and accessibility

**Files:**
- Modify: `index.html:116-148,1042-1048` (testimonial motion CSS and clone script)
- Test: `index.html` CSS/markup validation command

**Interfaces:**
- Consumes: Existing `.reviews-marquee`, `.reviews-track`, `.review-set`, focusable `.review-card`, and review-clone script.
- Produces: Continuous horizontal motion that pauses for reading and becomes a manual snap list when reduced motion is requested.

- [ ] **Step 1: Write failing behavior-contract check**

Run:

```powershell
$html = Get-Content -Raw 'index.html'
$required = @('animation:reviews-scroll','animation-play-state:paused','@media(prefers-reduced-motion:reduce)','scroll-snap-type:x mandatory','reviewClone.setAttribute(''aria-hidden'',''true'')')
$missing = $required | Where-Object { -not $html.Contains($_) }
if ($missing) { throw "Missing testimonial behavior: $($missing -join ', ')" }
```

Expected: FAIL only if a required marquee behavior was accidentally removed during styling work.

- [ ] **Step 2: Keep calm linear horizontal loop**

Retain `.reviews-track` as a single `display:flex` row with `animation:reviews-scroll 88s linear infinite` and `will-change:transform`. Do not add card bounce, tilt, or per-card animation. Keep `@keyframes reviews-scroll` translating `-50%` for clone-based continuity.

- [ ] **Step 3: Confirm pause and reduced-motion fallback unchanged**

Retain hover/focus pause selector and reduced-motion rules. Verify the clone script still makes exactly one cloned `.review-set`, applies `aria-hidden="true"`, and strips cloned `tabindex` attributes.

- [ ] **Step 4: Run behavior-contract check**

Run command from Step 1.

Expected: No output and exit code `0`.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "fix: preserve accessible testimonial marquee motion"
```

### Task 3: Verify responsive rendering and content integrity

**Files:**
- Modify: none unless verification exposes a testimonial-only regression in `index.html`
- Test: live/local browser or project visual-test tooling

**Interfaces:**
- Consumes: Finished glass card styles and existing responsive rules.
- Produces: Verified desktop, mobile, hover/focus, and reduced-motion behavior.

- [ ] **Step 1: Run content-integrity check**

Run:

```powershell
$html = Get-Content -Raw 'index.html'
$reviews = @('u/larryloveinstein','marksewell','Wilhelm Drescher','Dennis Branson','Google Play','★★★★★')
$missing = $reviews | Where-Object { -not $html.Contains($_) }
if ($missing) { throw "Missing testimonial content: $($missing -join ', ')" }
if (($html | Select-String -Pattern '<article class="review-card' -AllMatches).Matches.Count -lt 12) { throw 'Expected testimonial source cards missing' }
```

Expected: No output and exit code `0`.

- [ ] **Step 2: Check desktop viewport**

Open landing page at 1440px width. Confirm glass cards remain readable, edge masks soften entries and exits, rail is horizontal and continuous, and no horizontal document scrollbar appears.

- [ ] **Step 3: Check interaction and reduced motion**

Hover a card and keyboard-focus a card: scrolling must pause in both cases. Emulate `prefers-reduced-motion: reduce`: auto-scroll must stop and cards must be horizontally scrollable with snap alignment.

- [ ] **Step 4: Check mobile viewport**

Open landing page at 390px width. Confirm cards use the existing 80vw layout, stars and source metadata remain visible, review text has readable contrast, and no page-level overflow appears.

- [ ] **Step 5: Commit verification-only fix if required**

If a testimonial-only CSS adjustment is necessary, commit it separately:

```bash
git add index.html
git commit -m "fix: refine testimonial glass responsiveness"
```
