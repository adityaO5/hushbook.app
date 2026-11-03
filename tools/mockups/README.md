# Homepage phone mockups

`npm run build:mockups` renders every phone image on the homepage from the scenes in `scenes/`, through Playwright, into `assets/img/mockups/` (English) or `assets/img/mockups/locales/<lc>/` (`--locale de`, `--locale all`).

The contract between `render.mjs` and a scene, the list of shots and where each one lands on the page: `docs/superpowers/specs/2026-11-03-homepage-mockups-design.md`.

- `scenes/<name>/shots.json`: one entry per output image from that scene (`id`, `t` seconds, `crop`, `out`, optional `vars`, `width`).
- `scenes/<name>/strings/en.json`: every UI string the scene draws, keyed; `strings/<locale>.json` overrides what it has, the rest falls back to English.
- `lib/i18n.js`: `hbT`, `hbVar`, `hbApplyStrings`, `hbLocaleSetup`. Every scene includes it.
- `assets/`: fonts, covers, the keyed iPhone 16 frame, brand marks. Scenes reach them with `../../assets/...`.
- `scenes/<name>/index.html`: one replica per scene, ported from `D:\hushbook-demo-video\showcase\ios` and the app code in `D:\hushbook\lib`.

Open any scene directly in Chrome to work on it; `window.__timelines.main.seek(t)` moves it. `node tools/mockups/render.mjs --shot <id> --png` writes a PNG to `out/` next to the WebP for inspection.

Never shipped: `tools/` is in `.assetsignore`.
