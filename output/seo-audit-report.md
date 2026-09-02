# HushBook SEO audit

Audited: 2026-08-26  
Site: https://hushbook.app  
Scope: source tree plus live deployment smoke checks. Search Console, analytics, backlinks, competitor gaps, and PageSpeed Insights field data were not available.

## Executive summary

Status: technically crawlable, but international SEO release is blocked by localization and metadata defects.

Strong baseline:

- 147 expected HTML routes exist: 21 published locales × 7 public page types.
- Live sitemap contains 147 unique URLs; all 147 returned HTTP 200.
- Source canonicals match expected clean URLs on all 147 pages.
- Every page has a complete 22-entry hreflang set: 21 locales plus x-default, including self-reference.
- Live browser render exposes valid SoftwareApplication and FAQPage JSON-LD on homepage locales. Homepage FAQ schema has 14 complete questions.
- All 147 pages have exactly one H1.
- No true missing alt attributes, placeholder anchors, or missing local asset references were found. Empty alt="" values are used for decorative/repeated mockup imagery.
- Live desktop and 390px mobile smoke checks showed no horizontal overflow and no site console errors.

Release blockers:

1. Six French public routes contain Unicode replacement characters (�); live /fr/about rendered 69 of them.
2. 73 pages use translated or corrupted og:type values instead of the required website.
3. 93 pages use translated or corrupted twitter:card values instead of the required summary_large_image.
4. All 21 download routes are missing the normal Open Graph/Twitter metadata set and only expose the injected og:url.
5. Public locale content contains brand/copy corruption: BushBook, HuhBook, Notund, HBTER2X, and a stray HBOPEXIX.
6. Repository QA docs state native-language/legal review is pending or production indexing is blocked for locale work, while all 21 locales are in publishedLocales, indexable, in sitemap, and in hreflang clusters.

## Report 1 — crawlability and indexation

| Check | Result | Assessment |
|---|---:|---|
| robots.txt live status | 200 | Pass |
| Sitemap live status | 200 | Pass |
| Sitemap URLs | 147 unique | Pass |
| Sitemap URL status crawl | 147/147 HTTP 200 | Pass |
| Hreflang entries per sitemap URL | 22 | Pass |
| HTML hreflang self-reference | 147/147 | Pass |
| HTML x-default | 147/147 | Pass |
| Canonical-to-expected URL match | 147/147 | Pass |
| noindex on canonical host | None observed | Pass |
| HTTP to HTTPS / host security | HTTPS, HSTS, canonical host | Pass |

robots.txt allows general crawling and references https://hushbook.app/sitemap.xml. Vercel configuration uses clean URLs with no trailing slash, consistent with generated canonical and sitemap URLs.

Locale aliases also resolve correctly in live checks:

- /es → /es-ES
- /pt → /pt-PT
- /fr-argos → /fr
- /privacy → /privacy-policy
- /terms → /terms-conditions

## Report 2 — technical and on-page findings

### SEO-001 — Unreviewed locale pages are indexable

Impact: High  
Priority: P0

Evidence:

- localization.config.js publishes 21 locales.
- All 147 pages use indexable robots directives and appear in sitemap/hreflang.
- docs/LOCALIZATION_QA.md says every locale needs route, metadata, visible-copy, legal, and native-language review before indexing.
- docs/LOCALE_REVIEW_ja.md leaves native-language, legal, and approved-for-routing-and-indexing checks open.
- docs/LOCALE_REVIEW_de.md says production routing/indexing is blocked until legal approval.

Fix:

Complete native-language and legal review before keeping a locale in publishedLocales. Until approved, keep it out of the production sitemap and hreflang cluster; stage unfinished work on a non-indexed preview host.

### SEO-002 — French encoding corruption

Impact: High  
Priority: P0

Evidence:

- fr/download.html, fr/about.html, fr/privacy-policy.html, fr/terms-conditions.html, fr/refund-policy.html, and fr/licenses.html contain �.
- Live /fr/download title is T�l�charger HushBook.
- Live /fr/about contains 69 replacement characters.

Fix:

Regenerate all French pages as UTF-8, verify every response and source file is UTF-8, then run a hard CI failure for U+FFFD before routing or indexing.

### SEO-003 — Reserved social metadata values were translated or corrupted

Impact: High  
Priority: P0

Evidence:

- 73 pages do not use og:type=website.
- 93 pages do not use twitter:card=summary_large_image.
- Examples include fr/about.html with og:type=site Web and twitter:card=r�sum� grand image.
- tr/refund-policy.html contains a repeated translated og:type value and twitter:card=Özet large image.

These are protocol enum values, not user-facing copy. Social parsers may ignore them, weakening link previews and share CTR.

Fix:

Protect protocol metadata from translation. Normalize every page to:

~~~html
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
~~~

Add a test that rejects any other value.

### SEO-004 — Download pages lack social metadata

Impact: Medium  
Priority: P1

Evidence:

- All 21 /download locale pages lack og:type, og:site_name, og:title, og:description, og:image, twitter:card, and twitter:image.
- download.html currently has title, description, canonical, favicon, then only injected robots/og:url.
- Live /download confirms og:image is absent.

Fix:

Give every download page the same complete localized OG/Twitter set as the homepage, using og-hushbook.webp or a download-specific image. Keep title, description, canonical, and social URL aligned.

### SEO-005 — Brand and copy corruption in public locales

Impact: High  
Priority: P1

Evidence:

- Live /da renders BushBook.
- Live /vi/download uses Tải về as title and the source contains HuhBook.
- Live /th/download contains HBTER2X; source also contains stray HBOPEXIX.
- tr/refund-policy.html title is Notund Policy – HushBook.

Fix:

Create a protected brand-term allowlist (HushBook, HushBook Engine) and fail localization QA on substitutions or unexplained uppercase tokens. Review all customer-facing metadata, navigation labels, image alt text, FAQs, testimonials, and legal text—not only hero copy.

### SEO-006 — Arabic pages lack RTL direction metadata

Impact: Medium  
Priority: P2

Evidence:

- All 7 Arabic public pages have lang="ar" but none declare dir="rtl".

Fix:

Set dir="rtl" on Arabic HTML roots and verify navigation, legal text, breadcrumbs, image captions, and mobile layout in browser snapshots.

### SEO-007 — Missing explicit content-language metadata

Impact: Low  
Priority: P3

Evidence:

- No page contains meta http-equiv="content-language".
- html lang and hreflang are present and correct, so this is not a Google indexation blocker.

Fix:

Treat html lang and hreflang as primary signals. Add content-language metadata only if Bing coverage is a priority, and keep it aligned with the page locale.

## On-page and content assessment

### Strengths

- Homepage titles and descriptions target clear audiobook/read-along intent.
- Homepage contains a dedicated SEO section covering synced text, free audiobook apps, iPhone/Android, privacy, accessibility, and owned audiobook files.
- All pages have one H1 and logical H2/H3 content structure.
- All image elements have an alt attribute. Empty alt values are concentrated in decorative/repeated mockups and are appropriate when those images add no unique information.
- Internal anchors and asset references resolved cleanly in source checks.
- Homepage JSON-LD is rendered, not merely present in static source: SoftwareApplication plus FAQPage; all 14 FAQ questions had non-empty accepted answers.
- About, privacy, terms, refund, and license pages provide trust and legal support.

### Content risks

- Locale quality varies materially. The source contains machine/draft-quality strings, mixed English, encoding damage, and incorrect brand terms.
- Some locale titles are too generic or low-information, such as Arabic حول for About and Vietnamese Tải về for Download.
- Some localized legal pages retain English fragments or awkward translated legal copy. Do not use these pages as indexable locale alternatives until reviewed.
- Legal pages are present in the sitemap, but legal translation approval is not complete according to repository QA records.

## Prioritized action plan

### P0 — before further indexation

1. Repair UTF-8 corruption in all six French routes.
2. Restore exact og:type and twitter:card enum values across all pages.
3. Decide release policy for unreviewed locales. Remove unfinished locales from published sitemap/hreflang/indexation until native and legal review is complete.

### P1 — next release

1. Add complete OG/Twitter metadata to all 21 download routes.
2. Fix BushBook, HuhBook, Notund, HBTER2X, HBOPEXIX, and related translation artifacts.
3. Add CI checks for replacement characters, brand substitutions, protocol metadata enums, and unapproved locale routing.
4. Add Arabic dir="rtl" and run browser QA at desktop and mobile widths.

### P2/P3 — growth and maintenance

1. Tighten localized titles/descriptions around actual locale search intent.
2. Add locale-specific reviewer sign-off files for every public page type.
3. Connect Google Search Console and Bing Webmaster Tools; submit sitemap and review coverage, rich results, country/language targeting, and Core Web Vitals.
4. Run PageSpeed Insights/WebPageTest for representative English, French, Arabic, and mobile URLs. Current browser smoke timings are not field Core Web Vitals.

## Tooling note

The Vercel CLI is not installed in this workspace. Install it with npm i -g vercel if deployment-level checks are needed (vercel env pull, vercel deploy, vercel logs).

