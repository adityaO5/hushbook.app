# German locale review

Locale: `de`
Status: `private-preview`

## Source → German → back-translation review

- Reviewed product claims covering on-device transcription, offline operation, privacy, accessibility, diagnostics, downloads, third-party services, and purchases.
- Corrected mixed-language fragments in About, Privacy Policy, Terms, Refund Policy, and Licenses.
- Back-translation spot checks preserve obligations, exclusions, data-flow claims, platform references, and contact details.
- Approved exceptions: HushBook, Apple App Store, Google Play, Sentry, RevenueCat, LibriVox, Internet Archive, Hugging Face, URLs, email addresses, file formats, and shared screenshot UI.

## Verification

- High-signal zero-English scan: passed.
- Localization contract tests: passed.
- Locale-specific screenshot paths: passed for the 36-asset matrix.
- Browser legal-route snapshot for `/de/privacy-policy.html`: passed; flagged matches are only approved anchors, URLs, and legal route slugs.
- Browser snapshot for `/de/licenses.html`: passed after the legal-copy translation; remaining English is limited to approved font/library/license names and third-party proper names.
- Browser snapshots for `/de/terms-conditions.html`, `/de/refund-policy.html`, and `/de/about.html`: require a fresh final pass on the current worktree before approval.
- Qualified German legal review: pending.
- Production routing/indexing: blocked until legal approval.
