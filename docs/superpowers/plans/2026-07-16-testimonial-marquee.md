# Testimonial Marquee Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a polished, accessible single-row testimonial marquee directly above the “How it works” section.

**Architecture:** Keep the feature inside the landing page’s existing `index.html` structure. CSS owns the graphite embossed-card treatment, responsive sizing, animation, pause behavior, and reduced-motion fallback; semantic HTML owns the five reviews; a tiny progressive-enhancement script clones the review set once to create the seamless loop.

**Tech Stack:** Semantic HTML5, inline SVG, CSS custom properties and keyframes, vanilla JavaScript.

## Global Constraints

- Insert the section after the value-band trust chips and before `#read-along`.
- Use one right-to-left row only.
- Show five gold stars only on the App Store review; Reddit and Instagram cards have no stars.
- Include the source logo and username in every card.
- Use cool graphite-grey embossed cards compatible with the existing near-black and gold HushBook palette.
- Pause motion on hover and keyboard focus; use a static horizontal snap list for `prefers-reduced-motion: reduce`.
- Add no external dependency or image request.
- Preserve the supplied review wording and do not modify existing hero, trust-chip, or “How it works” content.

---

### Task 1: Add the testimonial section and styling

**Files:**
- Modify: `index.html` in the inline stylesheet after the value-band styles and in markup immediately before `<!-- ============ HOW IT WORKS ============ -->`

**Interfaces:**
- Consumes: existing `--bg`, `--ink`, `--muted`, `--gold`, `--gold-hi`, `--serif`, `--sans`, `.wrap`, `.eyebrow`, `.sub`, and `.reveal` page primitives.
- Produces: `.reviews`, `.reviews-marquee`, `.reviews-track`, `.review-set`, `.review-card`, `.review-source`, `.review-stars`, and `.review-mark` elements used by the cloning script.

- [ ] **Step 1: Add a failing structural verification**

Run this read-only check before implementation:

```powershell
$html = Get-Content -Raw index.html
if ($html -notmatch 'class="reviews"') { throw 'testimonial section missing' }
```

Expected: command fails with `testimonial section missing`.

- [ ] **Step 2: Add the CSS design system for the section**

Add styles that:

```css
.reviews{padding:24px 0 92px;overflow:hidden}
.reviews-head{text-align:center;margin:0 auto 34px;padding:0 24px}
.reviews-head h2{margin-bottom:12px}
.reviews-head .sub{margin-inline:auto;max-width:650px}
.reviews-marquee{overflow:hidden;mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);-webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)}
.reviews-track{display:flex;width:max-content;animation:reviews-scroll 48s linear infinite;will-change:transform}
.review-set{display:flex;gap:20px;padding-right:20px}
.review-card{position:relative;isolation:isolate;width:380px;min-height:260px;padding:28px;border:1px solid rgba(255,255,255,.11);border-radius:22px;background:linear-gradient(145deg,#2b2d30,#202225);box-shadow:inset 1px 1px 0 rgba(255,255,255,.09),inset -1px -1px 0 rgba(0,0,0,.38),0 18px 44px rgba(0,0,0,.28);overflow:hidden;display:flex;flex-direction:column}
.review-card--wide{width:470px}
.review-source{display:flex;align-items:center;gap:10px;margin-bottom:24px;position:relative;z-index:1}
.review-source-icon{width:32px;height:32px;padding:7px;border-radius:10px;color:#d5d7da;background:linear-gradient(145deg,#33363a,#222428);box-shadow:inset 1px 1px 0 rgba(255,255,255,.12),inset -2px -2px 3px rgba(0,0,0,.45)}
.review-user{font-size:14px;font-weight:700;color:var(--ink)}
.review-platform{display:block;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#969a9f}
.review-stars{display:flex;gap:3px;color:var(--gold-hi);font-size:17px;letter-spacing:.04em;margin-bottom:14px;position:relative;z-index:1}
.review-title{font-family:var(--serif);font-size:24px;line-height:1.15;margin-bottom:12px;position:relative;z-index:1}
.review-quote{font-family:var(--serif);font-size:19px;line-height:1.48;color:#e4e1dc;position:relative;z-index:1}
.review-mark{position:absolute;right:-22px;top:-28px;width:150px;height:150px;color:rgba(255,255,255,.025);filter:drop-shadow(1px 1px 0 rgba(255,255,255,.035)) drop-shadow(-1px -1px 0 rgba(0,0,0,.5));z-index:0}
.review-card:focus-visible{outline:2px solid var(--gold-hi);outline-offset:-4px}
.reviews-marquee:hover .reviews-track,.reviews-marquee:focus-within .reviews-track{animation-play-state:paused}
@keyframes reviews-scroll{to{transform:translateX(-50%)}}
@media(max-width:680px){.reviews{padding-bottom:72px}.reviews-head{margin-bottom:26px}.review-card,.review-card--wide{width:84vw;min-height:250px;padding:24px}.review-quote{font-size:18px}.review-set{gap:14px;padding-right:14px}}
@media(prefers-reduced-motion:reduce){.reviews-marquee{overflow-x:auto;mask-image:none;-webkit-mask-image:none;scroll-snap-type:x mandatory;padding:0 20px}.reviews-track{animation:none}.review-set{padding-right:0}.review-set[aria-hidden="true"]{display:none}.review-card{scroll-snap-align:center}}
```

- [ ] **Step 3: Add the heading, copy, and five semantic cards**

Insert a `.reviews` section containing:

```html
<span class="eyebrow">Reader notes</span>
<h2>Already finding their place in HushBook.</h2>
<p class="sub">From the small playback details to the first word lighting up, readers are noticing what changes when listening becomes reading too.</p>
```

Add five `article.review-card` elements in `.review-set`, each with `tabindex="0"`. Use inline SVG source marks for Reddit, App Store, and Instagram; repeat each source SVG as `.review-mark`. Include these exact identities and text:

```text
u/larryloveinstein — Hello, seriously LOVING the app! I am wondering where quotes are stored?
marksewell — Just what I needed! — five stars — I’ve tried BookPlayer, Bound, and Apple Books. HushBook is the first app that correctly displays chapter elapsed and remaining time on my 2017 Toyota Camry JBL head unit, the steering wheel controls change chapters correctly, and the on-device transcription is excellent. Thank you!
u/larryloveinstein — Hello! I have it downloaded and very cool app. Is there a way to increase playback speed? I find that’s the only thing from incorporating this into my daily reading.
@authorsanu — Hi, is HushBook available for Android?
u/Momoflies — AHHHHHH I’VE BEEN WAITING FOR SOMETHING JUST LIKE THIS. THANK YOUUUUUUUUUUU!
```

- [ ] **Step 4: Run structural verification**

```powershell
$html = Get-Content -Raw index.html
$required = @('class="reviews"','Reader notes','larryloveinstein','marksewell','authorsanu','Momoflies','aria-label="5 out of 5 stars"')
foreach ($token in $required) { if (-not $html.Contains($token)) { throw "missing: $token" } }
if ($html.IndexOf('class="reviews"') -gt $html.IndexOf('id="read-along"')) { throw 'reviews are not above How it works' }
```

Expected: command exits successfully with no output.

### Task 2: Add seamless-loop progressive enhancement and verify behavior

**Files:**
- Modify: `index.html` in the existing bottom script before the Three.js feature code.

**Interfaces:**
- Consumes: the first `.review-set` created by Task 1.
- Produces: one cloned `.review-set[aria-hidden="true"]` with all cloned `tabindex` attributes removed.

- [ ] **Step 1: Add a failing clone-script verification**

```powershell
$html = Get-Content -Raw index.html
if ($html -notmatch "cloneNode\(true\)") { throw 'marquee clone enhancement missing' }
```

Expected: command fails with `marquee clone enhancement missing`.

- [ ] **Step 2: Add the minimal cloning script**

```js
const reviewSet=document.querySelector('.review-set');
if(reviewSet){
  const reviewClone=reviewSet.cloneNode(true);
  reviewClone.setAttribute('aria-hidden','true');
  reviewClone.querySelectorAll('[tabindex]').forEach(el=>el.removeAttribute('tabindex'));
  reviewSet.after(reviewClone);
}
```

- [ ] **Step 3: Run static verification**

```powershell
$html = Get-Content -Raw index.html
if ($html -notmatch "cloneNode\(true\)") { throw 'clone script missing' }
if (($html | Select-String -Pattern '<article class="review-card' -AllMatches).Matches.Count -ne 5) { throw 'expected five source review cards' }
if ($html.IndexOf('class="reviews"') -gt $html.IndexOf('id="read-along"')) { throw 'incorrect placement' }
```

Expected: command exits successfully with no output.

- [ ] **Step 4: Check the running page**

Open `http://localhost:8000`, refresh, and verify desktop and narrow/mobile widths. Confirm all five cards move right to left, the repeated sequence has no blank gap, hover/focus pauses the row, no document-level horizontal scrollbar appears, and reduced motion shows one scrollable card set.

- [ ] **Step 5: Commit the implementation**

```powershell
git add index.html docs/superpowers/plans/2026-07-16-testimonial-marquee.md
git commit -m "feat: add reader testimonial marquee"
```
