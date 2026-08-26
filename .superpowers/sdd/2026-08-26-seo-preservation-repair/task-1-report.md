Task 1 report: Freeze the current content before repair

Date: August 26, 2026

Summary

Implemented preservation tooling that freezes the current published-homepage SEO copy, FAQ, FAQ JSON-LD, About facts block, `scripts/inject-seo-copy.js`, and `robots.txt` before any repair work begins.

Files changed

- `scripts/seo-preservation.js`
- `seo-preservation.test.js`
- `output/seo-preservation-baseline.json`
- `package.json`

What the helper records

- Every published locale homepage from `localization.config.js`
- Relative path, newline style, and byte length for each homepage
- SHA-256 for:
  - SEO COPY marker through FAQ marker
  - FAQ marker through FINALE marker
  - `data-hushbook-faq` JSON-LD block
  - post-`</head>` body content
- Marker counts for SEO COPY, FAQ, FINALE, and FAQ JSON-LD
- FAQ item count, FAQ JSON-LD count, and H1 count
- Exact hash of the current About facts section in `about.html`
- Exact hashes of the current `scripts/inject-seo-copy.js` and `robots.txt`

Implementation notes

- The baseline was generated from the current worktree after inspecting the existing user diff.
- The helper hard-fails if any published homepage is missing a protected region or contains duplicate protected markers.
- The baseline stores hashes and structural counts only. It does not store replacement source text.
- `assertExactReplacement` was added for future repair work so later scripts can prove they changed only intended ranges.

Verification

- Existing `npm test` passed before the new preservation check was added.
- `npm run test:seo-preservation` passed after generating the baseline.
- Full `npm test` passed after wiring the preservation test into the main test chain.
- `package.json` was normalized back to LF in the worktree after a mixed-line-ending warning during review.

Scope and safety

- No existing HTML, `scripts/inject-seo-copy.js`, `robots.txt`, audit outputs, or saved plan files were modified.
- No bulk normalizer was run.
- No unrelated user changes were staged.

Concerns

- None in scope for Task 1. Draft and legacy routes such as `es`, `pt`, and `fr-argos` were intentionally excluded from the manifest because the brief scoped homepage preservation to published locales only.

Fix round 1: exact replacement contract and newline representation

Date: August 26, 2026

Summary

- Strengthened `assertExactReplacement` so it now accepts a concrete replacement descriptor and validates:
  - `source.file`
  - `source.text`
  - `replacement.file`
  - `replacement.oldText`
  - presence and type of `replacement.newText`
  - `replacement.reason`
- The helper now requires `replacement.file` to match `source.file`, requires `replacement.oldText` to match exactly once in the source text before any write, and proves the resulting text is only that exact replacement.
- Newline detection no longer silently collapses mixed files into `CRLF`. It now represents `MIXED` and also distinguishes bare `CR`.
- Refreshed `output/seo-preservation-baseline.json` so it reflects the current worktree under the stricter newline representation.
- Expanded `seo-preservation.test.js` with focused contract tests for valid replacement, blank reason, file mismatch, duplicate old text, stray extra edits, and missing `newText`.

Files changed in fix round 1

- `scripts/seo-preservation.js`
- `seo-preservation.test.js`
- `output/seo-preservation-baseline.json`

Covering commands and output

```text
> npm run test:seo-preservation

> hushbook-app@1.0.0 test:seo-preservation
> node seo-preservation.test.js

node:assert:95
  throw new AssertionError(obj);
  ^

AssertionError [ERR_ASSERTION]: ar/index.html newline style changed

'MIXED' !== 'CRLF'
```

```text
> npm test

> hushbook-app@1.0.0 test
> node localization.test.js && node seo-localization.test.js && node seo-preservation.test.js && node mobile-nav.test.js && node blur-in-heading-reveal.test.js

German localization contract passes.
Localized SEO indexation contract passes.
node:assert:95
  throw new AssertionError(obj);
  ^

AssertionError [ERR_ASSERTION]: ar/index.html newline style changed

'MIXED' !== 'CRLF'
```

```text
> node scripts/seo-preservation.js --write-baseline
Wrote output\seo-preservation-baseline.json
```

```text
> npm run test:seo-preservation

> hushbook-app@1.0.0 test:seo-preservation
> node seo-preservation.test.js

SEO preservation baseline passes.
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
