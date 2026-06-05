# HushBook.app site

Marketing landing page for **HushBook** (read-while-you-listen audiobook app) + the design research
that informed it. Static site — no build step.

## Open it

- **Landing page:** double-click `index.html` (opens in your browser).
- **Design research report:** open `research/report.html`.

The kinetic karaoke hero uses GSAP, which is **vendored locally** (`assets/js/`), so everything works
offline with no server. If you prefer to serve it:

```bash
cd "D:\Hushbook.app site"
python -m http.server 8080   # then visit http://localhost:8080
```

## What's here

```
index.html        Landing page — kinetic karaoke hero (Sherlock Holmes demo text),
                  features showcase, device mockups, download CTAs, footer
about.html        "About" — mission + values
privacy.html      Privacy Policy (on-device-processing angle)
terms.html        Terms of Service (user-import / copyright / DMCA angle)
research/
  report.html     Design-research report (Lazyweb DB + web research)
  references/      19 reference screenshots used in the report
assets/
  css/styles.css   Brand tokens mirror the app (cream #FBF8F2 + brown #6F3825; dark lyrics hero #0B0B0B)
  js/main.js       Scroll → word-by-word highlight + left↔right line travel (GSAP ScrollTrigger)
  js/gsap*.js      Vendored GSAP 3.12.5 + ScrollTrigger (offline)
  fonts/           Inter, HushFont, Atkinson Hyperlegible (copied from the app)
  img/             logo, app-icon previews, provider logos, 3D badges
  badges/          official App Store + Google Play badges (SVG)
  book/            Sherlock demo cover (SVG)
```

## The hero

Scroll position = playback position. As you scroll, the Sherlock Holmes opening lights up
word-by-word (like the app's synced lyrics) while the lines sweep left↔right into place
(traffic.productions-style). Honors `prefers-reduced-motion` (falls back to static, fully-readable
text) and degrades gracefully if GSAP fails to load.

## Before launch (placeholders / follow-ups)

- **App screenshots** — the phone mockups are CSS placeholders; drop in real captures.
- **Store links** — badges currently point to `#`. iOS shows "Coming soon" (Android-first app).
- **Contact email** — `hello@hushbook.app` / `privacy@hushbook.app` are placeholders.
- **Legal pages** — solid starting templates aligned to HushBook's on-device + import model; have
  counsel review and reconcile with the in-progress consent design, and fill the Play Console Data
  safety form to match.
- **Official badges** — keep the supplied artwork unmodified (¼-height clear space, ~40px min).
```
