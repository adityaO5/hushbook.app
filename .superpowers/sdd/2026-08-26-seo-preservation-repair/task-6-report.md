# Task 6 report: indexation approval gate

## Result

Created an explicit indexation proposal and deterministic evidence contract. Publication decision remains `pending_user_approval`.

No publication policy was inferred. `localization.config.js`, `sitemap.xml`, hreflang output, `vercel.json`, HTML, SEO copy, FAQ content, legal copy, and unrelated dirty user changes were not modified.

## Files created

- `data/indexation-allowlist.json`
- `scripts/verify-indexation-allowlist.js`
- `.superpowers/sdd/2026-08-26-seo-preservation-repair/task-6-report.md`

## Recorded evidence

- Current publication remains 21 locales, 7 public page types, and 147 routes.
- Current sitemap contains 147 unique URLs; each URL contains 22 hreflang entries including `x-default`.
- Current routing evidence includes all non-English published locale destinations.
- Automated SEO repair contract passes for the current publication set.
- `de` is `blocked` by its private-preview, pending qualified legal review, and routing/indexing block.
- `ja` is `blocked` by its private-draft, incomplete product/native/legal/zero-English review, and routing/indexing block.
- `tr` is `blocked` at `/tr/refund-policy` because the reviewed `Notund` legal/customer-copy occurrence remains pending trusted replacement and legal review.
- Other 18 locales are `pending_review`; none is marked approved because no user-approved indexation policy exists.
- Approved locale list and approved route count remain empty: `[]` and `0`.

## Test results

`node scripts/verify-indexation-allowlist.js` — passed:

```text
Indexation allowlist schema and exact current 21-locale/147-route evidence pass.
Publication decision pending user approval; localization config, sitemap, hreflang output, and routing remain unchanged.
Locale status counts: approved=0 pending_review=18 blocked=3; blocked route notes=15.
```

`npm test` — passed:

```text
German localization contract passes.
Localized SEO indexation contract passes.
SEO preservation baseline passes.
Mobile navigation overlap contract passes.
Blur-in heading reveal contract passes.
```

The focused contract also reruns `node seo-repair-contract.test.js` and requires its `SEO repair contract passes.` result.

No commit made, per request.
