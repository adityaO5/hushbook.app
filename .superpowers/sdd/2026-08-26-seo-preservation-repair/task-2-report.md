Task 2 report: Add red tests for the audit contracts

Date: August 26, 2026

Summary

- Added `seo-repair-contract.test.js` as a source-based contract over `publishedLocales` and `publicPages` from `localization.config.js`.
- Added isolated script `npm run test:seo-repair-contract` in `package.json`.
- Kept the new red contract out of the main `npm test` chain as required.
- Reused `buildManifest()` from `scripts/seo-preservation.js` to enforce frozen post-head body hashes for pages whose repair should stay head-only.
- Used local asset `assets/img/og-hushbook.webp` as the required download social image contract.

Files changed

- `seo-repair-contract.test.js`
- `package.json`
- `.superpowers/sdd/2026-08-26-seo-preservation-repair/task-2-report.md`

Contract coverage

- Every published page must have exactly one `og:type` with value `website`.
- Every published page must have exactly one `twitter:card` with value `summary_large_image`.
- Every published download page must expose complete OG/Twitter download metadata using:
  - `og:site_name = HushBook`
  - localized page `<title>`
  - localized page meta description
  - canonical page URL
  - `https://hushbook.app/assets/img/og-hushbook.webp`
- No published page may contain:
  - `U+FFFD`
  - `BushBook`
  - `HuhBook`
  - `HBTER2X`
  - `HBOPEXIX`
- `Notund` is rejected contextually with exact snippets, not blind replacement logic.
- All Arabic public pages must keep `lang="ar"` and add `dir="rtl"`.
- Head-only repair pages must preserve their post-head body hash.

Expected red run

Command:

```text
npm run test:seo-repair-contract
```

Result:

```text
> hushbook-app@1.0.0 test:seo-repair-contract
> node seo-repair-contract.test.js

Error: SEO repair contract failures (391):
- download.html must have exactly one og:type meta tag; found 0.
- download.html must have exactly one twitter:card meta tag; found 0.
- download.html must have exactly one og:site_name meta tag; found 0.
- download.html must have exactly one og:title meta tag; found 0.
- download.html must have exactly one og:description meta tag; found 0.
- download.html must have exactly one og:image meta tag; found 0.
- download.html must have exactly one twitter:title meta tag; found 0.
- download.html must have exactly one twitter:description meta tag; found 0.
- download.html must have exactly one twitter:image meta tag; found 0.
- fr/about.html og:type must be "website"; found "site Web".
- fr/about.html twitter:card must be "summary_large_image"; found "r�sum� grand image".
- fr/about.html contains U+FFFD replacement characters.
- tr/refund-policy.html contains unapproved Notund context(s): "l-scale=1, viewport-fit=cover\"> <title>Notund Policy – HushBook</title> <meta name=\"", "k\"> <meta property=\"og:title\" content=\"Notund Policy – HushBook\"> <meta property=\"og", "yı ele alacaktır.</li> <li><strong>Notund talepleri.</strong> Abonelik talepleri".
- th/download.html contains corruption token "HBTER2X".
- th/download.html contains corruption token "HBOPEXIX".
- vi/download.html contains corruption token "HuhBook".
- da/index.html contains corruption token "BushBook".
- ar/index.html html dir must be "rtl"; found undefined.
...
Node.js v22.15.0
```

Observed failure classes from that red run

- Download metadata missing on all 21 published download pages.
- Invalid `og:type` values still present across localized public pages.
- Invalid `twitter:card` values still present across localized public pages.
- `U+FFFD` still present on the six French non-home public routes.
- Corruption-token findings still present on Danish, Thai, and Vietnamese routes.
- Contextual `Notund` findings still present on `tr/refund-policy.html`.
- Arabic `dir="rtl"` missing on all 7 Arabic public routes.
- No head-only body-hash drift was reported in this run.

Existing suite verification

Command:

```text
npm test
```

Result:

```text
> hushbook-app@1.0.0 test
> node localization.test.js && node seo-localization.test.js && node seo-preservation.test.js && node mobile-nav.test.js && node blur-in-heading-reveal.test.js

German localization contract passes.
Localized SEO indexation contract passes.
SEO preservation baseline passes.
Mobile navigation overlap contract passes.
Blur-in heading reveal contract passes.
```

Self-review

- Verified the new contract reads only source files and local config/helpers.
- Verified the new contract is deterministic and sorted by `publishedLocales` / `publicPages`.
- Verified `Notund` handling is contextual and snippet-based, with no replacement behavior.
- Verified the new contract remains separate from the main `npm test` chain.
- Verified existing `npm test` stayed green after Task 2 changes.

Concerns

- The red contract currently reports a large expected failure set because it intentionally covers all audit classes before Tasks 3 through 5 repair them.
- Some localized `og:type` values are pathologically long; the test truncates displayed values so failures remain readable while still deterministic.

Fix round 1: full body baseline and explicit download metadata baseline

Date: August 26, 2026

Summary

- Replaced the partial inline body-hash map in `seo-repair-contract.test.js` with checked-in route-keyed baseline artifact `output/seo-repair-body-baseline.json`.
- The body baseline now covers all 147 published locale/page routes with no current-file fallback.
- Added checked-in route-keyed download metadata artifact `output/seo-repair-download-metadata.json`.
- Updated the contract to compare source `<title>`, source meta description, canonical, and OG/Twitter download title/description fields against explicit artifact values.
- Added route-specific product-token sanity checks so generic download metadata such as Vietnamese `Tải về` cannot pass.

Files changed in fix round 1

- `seo-repair-contract.test.js`
- `output/seo-repair-body-baseline.json`
- `output/seo-repair-download-metadata.json`
- `.superpowers/sdd/2026-08-26-seo-preservation-repair/task-2-report.md`

Coverage change

- `output/seo-repair-body-baseline.json`
  - `schemaVersion = 1`
  - `routeCount = 147`
  - exact route-keyed `postHeadBodySha256` for every published locale/public-page route
- `output/seo-repair-download-metadata.json`
  - `schemaVersion = 1`
  - `routeCount = 21`
  - explicit route-keyed `title`, `description`, and `productToken` for every published download route

Commands and output

```text
> npm run test:seo-repair-contract

> hushbook-app@1.0.0 test:seo-repair-contract
> node seo-repair-contract.test.js

Error: SEO repair contract failures (395):
- download.html must have exactly one og:type meta tag; found 0.
- download.html must have exactly one twitter:card meta tag; found 0.
- download.html must have exactly one og:site_name meta tag; found 0.
- download.html must have exactly one og:title meta tag; found 0.
- download.html must have exactly one og:description meta tag; found 0.
- download.html must have exactly one og:image meta tag; found 0.
- vi/download.html expected download title must include product token "HushBook"; found "Tải về".
- vi/download.html expected download description must include product token "HushBook"; found "Tải về HuhBook cho iPhone hay thiêu rừng.".
- vi/download.html source title must include product token "HushBook"; found "Tải về".
- vi/download.html source meta description must include product token "HushBook"; found "Tải về HuhBook cho iPhone hay thiêu rừng.".
- tr/refund-policy.html contains unapproved Notund context(s): "l-scale=1, viewport-fit=cover\"> <title>Notund Policy – HushBook</title> <meta name=\"", "k\"> <meta property=\"og:title\" content=\"Notund Policy – HushBook\"> <meta property=\"og", "yı ele alacaktır.</li> <li><strong>Notund talepleri.</strong> Abonelik talepleri".
- ar/index.html html dir must be "rtl"; found undefined.
...
Node.js v22.15.0
```

```text
> npm test

> hushbook-app@1.0.0 test
> node localization.test.js && node seo-localization.test.js && node seo-preservation.test.js && node mobile-nav.test.js && node blur-in-heading-reveal.test.js

German localization contract passes.
Localized SEO indexation contract passes.
SEO preservation baseline passes.
Mobile navigation overlap contract passes.
Blur-in heading reveal contract passes.
```

Self-review

- Verified the body baseline route keys match the 147 expected published locale/page routes exactly.
- Verified the download metadata baseline route keys match the 21 expected published download routes exactly.
- Verified the contract no longer falls back to hashing the current file when a route is absent from baseline.
- Verified the download contract no longer derives expected title/description from the same file under test.
- Verified existing `npm test` stayed green and the red contract remained outside the full test chain.

Fix round 1 verification and hardening

Date: August 26, 2026

Summary

- Kept the checked-in `output/seo-repair-body-baseline.json` as the full 147-route post-head body baseline. The contract requires its keys to match every published locale/page route exactly and validates every value as a SHA-256 hash; no current-file hash fallback remains.
- Kept the checked-in `output/seo-repair-download-metadata.json` as the 21-route download metadata expectation artifact. The contract requires exact route coverage plus non-empty explicit `title`, `description`, and `productToken` values for every route.
- Hardened product-name validation at artifact load time: each expected title and description must contain its route's product token. The Vietnamese expectation is now explicit approved metadata (`Tải HushBook` / `Tải HushBook cho iPhone hoặc Android.`), so generic `Tải về` cannot match the source or social metadata contract.
- Download checks compare source `<title>` and meta description, then OG/Twitter title and description, directly to the checked-in route expectation. Canonical and image assertions remain unchanged.
- Left `scripts/seo-preservation.js`, its homepage protected-region hashes, and its strict/tolerant behavior unchanged.

Files changed

- `seo-repair-contract.test.js`
- `output/seo-repair-body-baseline.json`
- `output/seo-repair-download-metadata.json`
- `.superpowers/sdd/2026-08-26-seo-preservation-repair/task-2-report.md`

Commands and output

```text
> npm run test:seo-repair-contract

> hushbook-app@1.0.0 test:seo-repair-contract
> node seo-repair-contract.test.js

Error: SEO repair contract failures (395):
- download.html must have exactly one og:type meta tag; found 0.
- fr/download.html contains U+FFFD replacement characters.
- tr/refund-policy.html contains unapproved Notund context(s): ...
- th/download.html contains corruption token "HBTER2X".
- vi/download.html <title> must be "Tải HushBook"; found "Tải về".
- vi/download.html meta description must be "Tải HushBook cho iPhone hoặc Android."; found "Tải về HuhBook cho iPhone hay thiêu rừng.".
- vi/download.html source title must include product token "HushBook"; found "Tải về".
- ar/index.html html dir must be "rtl"; found undefined.
Node.js v22.15.0
```

Exit code: `1` (expected red audit contract). No `post-head body hash changed` finding was emitted.

```text
> npm test

> hushbook-app@1.0.0 test
> node localization.test.js && node seo-localization.test.js && node seo-preservation.test.js && node mobile-nav.test.js && node blur-in-heading-reveal.test.js

German localization contract passes.
Localized SEO indexation contract passes.
SEO preservation baseline passes.
Mobile navigation overlap contract passes.
Blur-in heading reveal contract passes.
```

Exit code: `0`.

Review

- `git diff --check` passed for Task 2 fix paths.
- Existing unrelated dirty files were not modified or staged by this fix.
