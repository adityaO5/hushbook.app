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
