# Localization QA goal

Complete this goal for every locale before indexing or production routing.

## Screenshot policy

- English masters under `/assets/img/mockups/*` remain immutable.
- Non-English pages reference the matching generated asset under
  `/assets/img/mockups/locales/<locale>/`.
- Generated variants are deterministic local previews because no image-editing
  API key is configured. They repaint only manifest-declared text regions;
  device frames, charts, controls, illustrations, and book-cover artwork stay
  locked. Do not publish a variant whose mask or text has not been reviewed.
- Screenshot UI and book covers may remain English only when the exact region is
  recorded as an approved artwork/UI exception in the mockup report.
- Translate each page's `alt` text independently of baked screenshot text.

## Zero-English review

1. Run `node scripts/verify-localization.js <locale>`.
2. Review every customer-facing route at desktop and mobile sizes.
3. Inspect visible HTML text, metadata, Open Graph/Twitter fields, navigation, CTAs, forms, ARIA labels, image alt text, FAQs, footer, legal pages, testimonials, quotes, and JavaScript-rendered copy.
4. Search source for English leaks. Translate every result unless it appears in approved exceptions below.
5. Re-run scan and visual review. Locale cannot ship with any unapproved English text.

## Approved English exceptions

- HushBook and product names.
- Proper names, book titles, book-cover text, and user-created/library content.
- App Store, Google Play, iOS, Android, file extensions, URLs, email addresses, and third-party legal terms.
- English UI embedded inside a mockup region not yet declared editable in the
  private-preview manifest, with the exact asset recorded in
  `docs/MOCKUP_LOCALIZATION_QA.md`.

Record each additional exception with page, exact text, reason, and reviewer approval in release notes. Do not add broad exception patterns.

## Required evidence

- QA command output for locale.
- Reviewer route checklist covering every public page.
- Screenshot review for header, mobile navigation, text wrapping, internal links, selector behavior, and dynamic quotes/testimonials.
