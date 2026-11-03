# Homepage phone mockups, rebuilt from the real app (2026-11-03)

## Intent

The homepage still shows the 2025 app (Material look, "Howdy? John", Meditations hero). The app shipped a new design in 2026 (Lamplight + Folio player, the new Home, Library, Discover, Quotes & notes, Analytics, Reading engagement, Character map). `D:\hushbook-demo-video\showcase\ios\*` already holds pixel-faithful HTML replicas of those screens, built from the app code for the launch films, each a deterministic `render(t)` composition inside the owner's iPhone 16 frame.

This project turns those replicas into the homepage's phone images, makes the hero's centre phone a live read-along animation, rewrites the copy around them, and gives the site a one-command generator so every locale gets its own rendered set.

## Goals

- Every phone on the homepage shows the current app, rendered from the replicas, inside the iPhone 16 frame (`frame-iphone.png`, green screen keyed).
- Hero centre phone: the read-along actually plays (words light up with the narrator), as a live DOM animation with a static first-frame image underneath so first paint and LCP are unchanged.
- The red Hitchhiker's Guide cover is the book in the hero (Home's continue card, the player, the read-along's text) and in the player carousel.
- Images are small and sharp: lossy WebP with alpha, ~960 px wide for phones, quality 82, no resampling of text (capture at the size we ship).
- One generator in the site repo: `npm run build:mockups` renders every shot for `en`; `--locale de` (or `all`) renders a locale's set into `assets/img/mockups/locales/<lc>/`. UI strings come from `tools/mockups/scenes/<scene>/strings/<locale>.json`; a missing key falls back to English.
- Copy for the touched sections rewritten: crisp, specific, human, no AI cadence. Matches what the screens show (including the new transcription flow: on this phone or handed to your computer).

## Non-goals

- The languages section (`#languages`, Spanish/Italian/French poetry phones) keeps its current images.
- Desktop screenshots, the value-band iframe (`/demos/read-along-card`), badges, lifestyle photos: untouched.
- Rebuilding the HyperFrames films. The scenes are copied into this repo and adapted; the demo-video repo is read-only for this work.
- Translating copy on locale pages (a separate pass). Locale pages get the new image files; their text is handled later.

## Anti-goals

- Invented UI. Everything drawn comes from the app code in `D:\hushbook\lib` (read-only) or the replicas that were built from it.
- Taglines, helper text or labels on the screens that the real screen does not have.
- Shipping the generator sources: `tools/` must be in `.assetsignore`.
- A hero animation that costs LCP: the static WebP is the LCP candidate; the live layer fades in after JS and fonts are ready.

## Constraints

- Site is static HTML (`index.html` holds the homepage CSS inline). Locale homepages are checked-in copies under `<lc>/index.html` that reference `/assets/img/mockups/locales/<lc>/<file>.webp`.
- `localization.test.js` requires every locale page to use `/assets/img/mockups/` paths (no `/assets/img/mockups/de/`).
- Tooling on this machine: global `playwright@1.64.1` with Chromium, `sharp`, `ffmpeg`, Python with Pillow + numpy. The generator uses Playwright + sharp as devDependencies of this repo.
- Hero fan sizes: `.fan img` 120–230 px wide, centre 150–268 px; carousel 190 px; steps 82 % of a ~300 px column; split-media 220–300 px; collage phone ~ 320 px; cards ~ 440 px wide. 960 px wide phone renders cover 3x on the largest slot.

## The generator (`tools/mockups/`)

```
tools/mockups/
  README.md            contract (this section, kept in sync)
  render.mjs           Playwright + sharp runner
  lib/i18n.js          shared helper every scene includes
  assets/              shared: fonts/, covers/, frame-iphone.png, hushbook_mark.png, ...
  scenes/<scene>/index.html          one replica per scene (ported from the showcase)
  scenes/<scene>/shots.json          that scene's output images: id, t, crop, out, vars, width
  scenes/<scene>/strings/en.json     UI strings the scene reads (master); <locale>.json overrides
```

Scene contract (what `render.mjs` relies on):

1. A scene is a self-contained page at 3840 x 2160 with the phone centred, 1960 px tall, the frame image as `img#frame` on top of the screen, exactly like the showcase scenes. Fonts and images load from `../../assets/...` (relative to the scene folder); no network except GSAP from the jsDelivr CDN (keep the `<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js">` tag the showcase scenes use).
2. The scene registers a paused GSAP timeline at `window.__timelines.main` whose proxy tween calls `render(t)`; the runner seeks it. It also sets `window.__hbReady = true` once fonts are loaded, geometry measured and the timeline registered. The runner waits for that flag.
3. The canvas colour is painted only on `html`, `body` and `#root`. The runner sets those transparent before capture so the frame's alpha edges survive.
4. Strings: include `<script src="../../lib/i18n.js"></script>` before the scene's own script. Static markup uses `data-t="key"` (text content replaced) or `data-t-attr="attr:key"`; strings built in JS go through `hbT('key', 'English fallback')`. Call `hbApplyStrings()` at the start of the build step, before anything is measured. `window.__HB_LOCALE` holds the locale code (`en` default); scenes call `hbLocaleSetup()` (in the helper) which sets `html[lang]` and, for `ar`, `dir="rtl"`. Every visible English string on a screen must be reachable this way, except book titles, author names, people's names and numbers.
5. Variables: `window.__HB_VARS` (object) is set by the runner from the shot's `vars`. Scenes read it with `hbVar('cover', 'hitchhikers')`. Use it for the book on screen, the theme, anything a shot needs to switch.
6. Crops: `"crop": "phone"` captures `img#frame`'s box; `"crop": "#selector"` captures that element's box (for cards cut out of a screen; the element must be inside the phone screen). `"width"` is the output width in px (default 960 for `phone`); the runner scales the capture with device scale factor so no text is resampled.

Shot entry:

```json
{ "id": "home", "t": 0.4, "crop": "phone", "out": "home", "vars": { "hero": "hitchhikers" } }
```

Output: `assets/img/mockups/<out>.webp` for `en`, `assets/img/mockups/locales/<lc>/<out>.webp` otherwise. WebP: quality 82, alpha, `effort: 6`, `smartSubsample`.

Commands: `node tools/mockups/render.mjs` (all shots, en) · `--shot home,library` · `--locale de` · `--locale all` · `--png` (also keep a PNG next to it for inspection in `tools/mockups/out/`).

## Shots and where they go

| Slot (index.html) | Out file | Scene | What the frame shows |
|---|---|---|---|
| Hero f1 | `brain` | ios-brain | Reading engagement score settled (Level 3 of 5) |
| Hero f2, Library pair left | `home` | ios-home | Home after launch: greeting, streak, Hitchhiker's as the continue card, the grid |
| Hero f3 (static under the live layer) | `read-along` | ios-read-along | The reader mid-paragraph, Hitchhiker's text, ambient theme, a word lit |
| Hero f4, carousel | `player-hitchhikers` | player-cover | The player's cover face with the red cover |
| Hero f5, Library pair right, step 01 | `library` | library | The Library screen with the owner's covers |
| Step 02 | `step-transcribe` | ios-offload | Book page, Options sheet up: Transcribe book / Transcribe on my PC |
| Step 03 | `step-transcribing` | ios-offload | The PC job card climbing ("On your computer: transcribing, 64 %") |
| Step 04 | `read-along` | ios-read-along | same file as hero f3 |
| Quotes 01 | `quote-mark` | ios-quotes | A sentence picked in the read-along, the Highlight · Note · Quote toolbar |
| Quotes 02 | `quote-index` | ios-quotes | Quotes & notes page |
| Quotes 03 | `quote-card` | ios-quotes | Customize editor with the share card |
| Carousel | `player-<book>` x 6+ | player-cover | martian, lotr, love-hypothesis, crime-punishment, pride-prejudice, hitchhikers (+ project-hail-mary, fourth-wing, dune, mexican-gothic if cheap) |
| Analytics pair | `brain`, `analytics` | ios-brain, ios-analytics | brain as above; Analytics Momentum + This week |
| Collage cards (4) | `card-*` | ios-analytics | Cropped cards: whichever four real cards best match habits, genres, words/records, goals; builder reports the mapping so the tags and copy follow |
| Collage phone | `analytics-rhythm` (name after what it is) | ios-analytics or ios-recap | A full phone: the listening calendar / month in review |
| Characters | `characters-map` (front), `characters-sheet` (back) | ios-characters | The map at rest; a character's detail sheet |

The hero live layer (`assets/js/hero-read-along.js` + CSS in index.html) is a port of the ios-read-along reader loop, driven by `requestAnimationFrame`, looping over the Hitchhiker's opening paragraphs, with the frame as a transparent WebP (`assets/img/mockups/frame-iphone.webp`) over a 393 x 852 stage scaled to the slot. Text and UI strings come from `data-*` attributes on the hero markup so locale pages can swap them.

## Copy

Rewritten by the copy pass (marketing-skills:copywriting, then content-humanizer): hero sub, value band chips if they contradict the screens, How it works (head + four steps, including the two transcription paths), Quotes (head + three cards), Library split, Reading life (head + Pro analytics head + collage tags + caption), Characters split. Alt text for every new image. Voice: specific, short, written by someone who built it. No em-dash habit, no "seamless", no triplets for rhythm, no rhetorical questions.

## What is left to the builders

- Exact `t` per shot (pick the frame that reads best; look at it).
- Which real analytics cards map to the four collage slots.
- Cover sources for the carousel (`C:\Users\rakes\Downloads\Book covers`; the Hitchhiker's red cover must be recovered from the existing `player-hitchhikers.webp` or a matching edition fetched from Open Library at >= 500 px).
- Whether to keep the old files: superseded files are deleted once nothing references them (grep all `*.html`, `content/`, `data/` first).
