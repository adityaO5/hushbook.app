# Builder brief: porting a showcase scene into the site's mockup generator

You are building one or more scenes under `D:\hushbook.app\tools\mockups\scenes\<scene>\`. The runner, `D:\hushbook.app\tools\mockups\render.mjs`, already works. Read these first:

1. `D:\hushbook.app\docs\superpowers\specs\2026-11-03-homepage-mockups-design.md` (the design, the scene contract, the shot table).
2. `D:\hushbook.app\tools\mockups\render.mjs` and `lib\i18n.js` (what the runner does and the helpers you call).
3. `D:\hushbook-demo-video\showcase\ios\BRIEF.md` and your source scene's `index.html` under `D:\hushbook-demo-video\showcase\ios\<scene>\` (read-only: never edit the demo-video repo).
4. The app code in `D:\hushbook\lib` (read-only, never run git there) whenever the replica and the real screen could differ, and for any screen that has no showcase scene yet.

## Where things go

```
tools/mockups/
  assets/fonts/        every font the showcase scenes use is already here (20 files)
  assets/covers/       the owner's covers (the files from C:\Users\rakes\Downloads\Book covers) + hitchhikers.jpg (see below)
  assets/frame-iphone.png, hushbook_mark.png, wordmark-ink.png
  scenes/<scene>/index.html
  scenes/<scene>/shots.json        array of shots (see below)
  scenes/<scene>/strings/en.json   every UI string the scene draws, keyed
  scenes/<scene>/assets/           only what is unique to this scene (a scene-only image). Fonts, covers and the frame are shared: use ../../assets/...
```

Shared `assets/` is add-only: copy a file in with `cp -n` if a scene needs one that is not there (keep the showcase file name); never modify or delete an existing one.

## Porting steps

1. Copy the showcase scene's `index.html` to `scenes/<scene>/index.html`. Rewrite asset paths: `assets/fonts/X` becomes `../../assets/fonts/X`, `assets/frame-iphone.png` becomes `../../assets/frame-iphone.png`, covers likewise `../../assets/covers/X`; scene-only images go to `scenes/<scene>/assets/` and stay `assets/X`. Do a single pass; do not double-prefix.
2. Add `<script src="../../lib/i18n.js"></script>` right after the GSAP script tag.
3. Guard the timeline registration: `window.__timelines = window.__timelines || {};` before `window.__timelines["main"] = tl;` and set `window.__hbReady = true;` right after `tl.seek(0);` (the last thing the build does). The runner waits for that flag; if measurement or fonts fail, it will time out, so keep the flag after everything else.
4. Call `hbLocaleSetup()` and `hbApplyStrings()` at the start of the build step (inside the `document.fonts.ready.then(...)` chain, before anything is measured), so translated strings are what gets measured.
5. Localise every visible UI string:
   - static text in markup: `<span data-t="key">English</span>`; attributes: `data-t-attr="aria-label:key"`;
   - text built in JS: `hbT('key', 'English')`.
   - Book titles, author names, people's names, numbers, times and dates stay as they are.
   - Write every key with its English into `strings/en.json` (flat object, key: string). Keys are camelCase and describe the string's role (`chapterLabel`, `transcribeOnMyPc`, `quotesAndNotes`).
   - Keep the English text identical to the showcase scene (it came from the app's own `.arb` strings); the real app's wording wins when the showcase differs from `D:\hushbook\lib\l10n\app_en.arb`.
6. Variables: read anything a shot switches (the book on screen, a theme, a tab) with `hbVar('name', default)` and declare its meaning in a comment at the top of the script.
7. The canvas colour (`#FAF9F5`) may only be painted on `html`, `body` and `#root`. Nothing else may paint a full-canvas background, or the capture loses its transparent surround.
8. `shots.json`: one entry per output image.

```json
[
  { "id": "home", "t": 0.4, "crop": "phone", "out": "home", "vars": { "hero": "hitchhikers" } }
]
```

   `crop` is `"phone"` (the whole device, `img#frame`'s box) or a CSS selector for a card inside the screen. `width` defaults to 960 for `phone`, 880 for a selector crop. `out` is the file name under `assets/img/mockups/` (no extension). Ids and out names are listed in the design's shot table; use those.

## Rendering and checking

From `D:\hushbook.app`:

```
node tools/mockups/render.mjs --list
node tools/mockups/render.mjs --shot <id>[,<id>] --png --verbose
```

`--png` writes `tools/mockups/out/en-<out>.png`. Look at every PNG you produce (the Read tool shows images) before you report. Check: the frame's edge is clean and the surround transparent, the status bar reads 9:41 with the icons, nothing is clipped at the screen's rounded corners, the text is sharp, the moment is the one the shot table asks for, no English leaks outside `strings/en.json` (search your HTML for visible words that are not wrapped). Fix and re-render until it is right.

Pick `t` by looking: seek the scene a few times (`--shot ... --png` with different `t` values in shots.json) and keep the frame that reads best at 230 px wide (squint test) and at 300 px.

Test a locale once to prove the strings work: write `strings/de.json` with two or three keys translated, render with `--locale de --shot <id> --png`, look at it, then delete `strings/de.json` (translations are a later pass). Report what you saw.

## Rules

- Never edit the demo-video repo or the app repo. Never run git in any repo. Do not commit.
- Only touch your own scene folder(s) and (add-only) `tools/mockups/assets/`. Do not edit `render.mjs`, `lib/i18n.js`, `index.html`, locale pages, or other scenes. If the runner needs a change, say exactly what in your report instead.
- No invented UI, strings, or placeholder data: everything comes from the showcase scene or the app code. Keep the showcase's invented data (names, dates, chapter lists) as it is unless the app code shows the real value.
- Deterministic scenes: no `setTimeout`, `requestAnimationFrame`, `Math.random`, `Date.now`, no network beyond the GSAP CDN tag.
- Keep to the showcase's HyperFrames gotchas (no template literal inside `querySelector`, measure once at build time, `fromTo` not `from`, clipped text toggled with `visibility: hidden`).

## Report (your final message)

- Scene folder(s) and the shots rendered: id, out file, size in px and KB, the `t` chosen and why.
- The strings file: how many keys; any visible text you could not route through strings and why.
- Every place the render knowingly differs from the real app (invented data, traced icons, skipped animations).
- Anything the orchestrator must do (a runner change, a cover file you could not find, a slot you think should show a different moment).

## Covers (`tools/mockups/assets/covers/`)

| File | Title | Author |
|---|---|---|
| hitchhikers.jpg | The Hitch-Hiker's Guide to the Galaxy | Douglas Adams |
| the martian.webp | The Martian | Andy Weir |
| projecthailmary.webp | Project Hail Mary | Andy Weir |
| LOR.jpg | The Lord of the Rings | J.R.R. Tolkien |
| LH.jpg | The Love Hypothesis | Ali Hazelwood |
| crimeandpunishmentjpg.jpg | Crime and Punishment | Fyodor Dostoevsky |
| prideandprejudice.jpg | Pride and Prejudice | Jane Austen |
| fourthwing.jpg | Fourth Wing | Rebecca Yarros |
| Mexicangothic.jpg | Mexican Gothic | Silvia Moreno-Garcia |
| dune.jpg | Dune | Frank Herbert |
| trevor_noah.jpg | Born a Crime | Trevor Noah |
| alexandardumas.jpg | The Count of Monte Cristo | Alexandre Dumas |
| comedy.jpg | The Hitch-Hiker's Guide to the Galaxy (the owner's 990 x 1500 copy of the same red cover; prefer hitchhikers.jpg) | Douglas Adams |
| odessey.jpg | The Odyssey | Homer |
| harry potter.jpg, harry potter1.jpg | Harry Potter (read the cover for which book) | J.K. Rowling |
| fantastic beasts.jpg | Fantastic Beasts and Where to Find Them | J.K. Rowling |
| dungeon crawler carl.jpg | Dungeon Crawler Carl | Matt Dinniman |
| 51E+0azDcuL._SL500_.jpg | Spanish edition of Project Hail Mary: do not use | |

The Hitchhiker's cover is the book of the homepage: Home's continue card, the player, the read-along's text, the first card of the carousel.

## The Hitchhiker's passage (read-along scenes and the hero's live layer use exactly this)

Running head: `CHAPTER 1`. Title: The Hitch-Hiker's Guide to the Galaxy. Author: Douglas Adams. Chapter length for the scrubber: 12:04.

1. Far out in the uncharted backwaters of the unfashionable end of the western spiral arm of the Galaxy lies a small unregarded yellow sun.
2. Orbiting this at a distance of roughly ninety-two million miles is an utterly insignificant little blue green planet whose ape-descended life forms are so amazingly primitive that they still think digital watches are a pretty neat idea.
3. This planet has, or rather had, a problem, which was this: most of the people living on it were unhappy for pretty much of the time. Many solutions were suggested for this problem, but most of these were largely concerned with the movements of small green pieces of paper, which is odd because on the whole it wasn't the small green pieces of paper that were unhappy.
4. And so the problem remained; lots of the people were mean, and most of them were miserable, even the ones with digital watches.

## Tool notes

- The Bash tool on this machine sometimes breaks heredocs; write files with the Write or Edit tool.
- Run the renderer from `D:\hushbook.app`. Look at the PNGs with the Read tool.
