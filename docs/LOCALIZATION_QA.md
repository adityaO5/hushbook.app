# Localization QA goal

Complete this goal for every locale before indexing or production routing.

## Screenshot policy

- All locale pages use shared `/assets/img/mockups/*` assets.
- Do not generate locale-specific screenshots. Screenshot UI and book covers may remain English.
- Translate each page's `alt` text into target locale.

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
- English UI embedded inside shared screenshots.

Record each additional exception with page, exact text, reason, and reviewer approval in release notes. Do not add broad exception patterns.

## Required evidence

- QA command output for locale.
- Reviewer route checklist covering every public page.
- Screenshot review for header, mobile navigation, text wrapping, internal links, selector behavior, and dynamic quotes/testimonials.
