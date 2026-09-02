# SEO Preservation-First Repair Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Repair the SEO audit blockers with small, reviewable changes while preserving every existing SEO paragraph, FAQ question and answer, JSON-LD block, page script, legal paragraph, and current uncommitted user change.

**Architecture:** Create a protected-content manifest and regression tests first. Apply only allowlisted, exact-match HTML edits through a new surgical repair script. Metadata fixes remain head-only; copy fixes use per-file reviewed replacements. Do not regenerate complete HTML pages.

**Tech Stack:** Static HTML, Node.js built-ins (fs, path, crypto, assert), existing npm test suite, local browser smoke checks.

**Spec:** Existing audit reports at output/seo-audit-report.md and output/seo-audit-summary.json.

## Global Constraints

- This worktree is dirty. Existing changes belong to the user and must remain intact. Review diffs with git diff --ignore-space-at-eol because several localized pages currently show line-ending churn.
- Never use git reset --hard, git checkout --, recursive deletion, or a whole-page generator for this repair.
- Do not run scripts/inject-seo-copy.js, scripts/normalize-localized-seo.js, or scripts/normalize-download-landing-pages.js during the repair. They perform broad replacements and full-file writes; inject-seo-copy.js can strip and recreate the SEO and FAQ regions.
- Protect the current SEO copy and FAQ on all 21 published homepage files. The exact SEO COPY block, FAQ block, FAQPage JSON-LD block, marker counts, FAQ item count, and H1 count must remain unchanged unless an explicit content change is separately approved.
- Protect the current About facts section in about.html, the current robots.txt additions, and the current SEO expansion changes in scripts/inject-seo-copy.js. They are not repair targets.
- Every replacement must name its file, old text, new text, and reason. It must match exactly once; zero or multiple matches abort the run before any file is written.
- Preserve each file's original LF or CRLF convention. Do not run formatters, line-ending converters, or scripts that rewrite unrelated whitespace.
- No locale directory, SEO text, FAQ text, legal text, or generated route is removed. Do not change publishedLocales until an explicit indexation decision is made.
- Run the existing npm test command before the first write and after every repair task. Review the resulting diff before continuing.
- Do not stage or commit unrelated pre-existing changes. A checkpoint commit is optional and requires explicit user approval.

## Current Scope and Evidence

- The site has 21 published locales, 7 public page types, and 147 expected HTML routes.
- The audit found six French routes containing U+FFFD, invalid og:type values on 73 pages, invalid twitter:card values on 93 pages, missing social metadata on all 21 download pages, brand/copy artifacts such as BushBook, HuhBook, Notund, HBTER2X, and HBOPEXIX, and missing dir=rtl on 7 Arabic pages.
- The current uncommitted work includes expanded English SEO discovery copy, localized discovery paragraphs in scripts/inject-seo-copy.js, the About facts section, robots crawler rules, and localized page changes. These changes must be included in the protected baseline, not overwritten by a regenerated page.
- The audit's positive checks also remain release invariants: 147 routes, one H1 per page, working canonicals, hreflang, sitemap coverage, local assets, and browser/mobile behavior.

---

### Task 1: Freeze the current content before repair

**Files:**
- Create: scripts/seo-preservation.js
- Create: seo-preservation.test.js
- Create: output/seo-preservation-baseline.json
- Modify: package.json

**Interfaces:**
- scripts/seo-preservation.js exports buildManifest, extractProtectedRegions, assertManifestUnchanged, and assertExactReplacement.
- The baseline records hashes and structural counts, not replacement source text.
- seo-preservation.test.js reads the baseline and fails if protected content changes.

- [ ] Run npm test and record the clean baseline result before adding new checks.
- [ ] Implement region extraction for each published locale homepage: the SEO COPY marker through the FAQ marker, the FAQ marker through the FINALE marker, and the data-hushbook-faq JSON-LD script.
- [ ] Record for every protected file: relative path, newline style, byte length, SHA-256 of protected regions, SHA-256 of the post-head body, marker counts, FAQ item count, JSON-LD count, and H1 count.
- [ ] Record the exact About facts section hash and the current scripts/inject-seo-copy.js and robots.txt hashes so accidental edits fail review.
- [ ] Generate output/seo-preservation-baseline.json from the current worktree only after inspecting the current diff.
- [ ] Make the test assert that every protected region exists exactly once, its hash matches the baseline, and all structural counts are unchanged.
- [ ] Add the preservation test to the npm test chain only after it passes against the generated baseline.
- [ ] Run npm test and inspect the manifest and diff. Stop immediately if the baseline indicates a missing SEO block, missing FAQ block, or unexpected pre-existing content loss.

### Task 2: Add red tests for the audit contracts

**Files:**
- Create: seo-repair-contract.test.js
- Modify: package.json

**Interfaces:**
- The contract test consumes localization.config.js and the protected-content helpers.
- It produces deterministic failures for invalid protocol metadata, encoding loss, brand artifacts, incomplete download metadata, and missing Arabic direction metadata.

- [ ] Assert every published page has exactly one og:type with value website and exactly one twitter:card with value summary_large_image.
- [ ] Assert every published download page has og:site_name, og:title, og:description, og:url, og:image, twitter:card, twitter:title, twitter:description, and twitter:image, with the existing HushBook image asset and page-specific title/description.
- [ ] Assert no published HTML contains U+FFFD or the known corruption tokens BushBook, HuhBook, HBTER2X, or HBOPEXIX.
- [ ] Treat Notund as a contextual review item rather than performing a blind global substitution; the test must reject it until a page-specific approved replacement is recorded.
- [ ] Assert all Arabic roots use lang="ar" and dir="rtl".
- [ ] Assert the metadata contract does not change the post-head body of pages whose repair is head-only.
- [ ] Run the new test once and record the expected failures from the audit. Keep it out of the full npm test chain until the corresponding repairs pass.

### Task 3: Implement a dry-run, head-only metadata repair

**Files:**
- Create: scripts/repair-seo-metadata.js
- Modify: seo-repair-contract.test.js

**Interfaces:**
- Command modes: node scripts/repair-seo-metadata.js --dry-run and node scripts/repair-seo-metadata.js --write.
- Dry-run reports exact files, tags, old values, and new values without writing.
- Write mode refuses to run unless all preconditions and protected-content assertions pass.

- [ ] Implement a head-boundary helper that never searches or replaces inside body content.
- [ ] Implement exact attribute replacement for existing og:type and twitter:card tags; preserve the surrounding tag formatting and all other attributes.
- [ ] For download pages only, add the missing social tags immediately before the head close, using the existing localized title and description, site name HushBook, the canonical URL, and https://hushbook.app/assets/img/og-hushbook.webp.
- [ ] Assert the download asset exists locally before adding its URL.
- [ ] Preserve the existing canonical, robots, hreflang, JSON-LD, scripts, links, and all body bytes.
- [ ] Make --dry-run the default-safe path and require --write for mutations. Write only files whose exact intended change is non-empty.
- [ ] Run the dry-run report, review every affected path, run the preservation test, then run --write.
- [ ] Run npm test and seo-repair-contract.test.js. Confirm the only changed regions are protocol metadata and the new download head tags.

### Task 4: Repair encoding and copy artifacts with reviewed maps

**Files:**
- Create: data/seo-repair-replacements.json
- Create: scripts/apply-seo-replacements.js
- Modify: seo-repair-contract.test.js

**Interfaces:**
- The JSON map contains explicit entries with file, exact old text, exact new text, context, and review reason.
- The replacement script supports --dry-run and --write, uses assertExactReplacement, and runs preservation checks before and after writing.

- [ ] Produce a read-only occurrence report for every U+FFFD in the six French routes: fr/download.html, fr/about.html, fr/privacy-policy.html, fr/terms-conditions.html, fr/refund-policy.html, and fr/licenses.html.
- [ ] Restore French characters only from a trusted UTF-8 source or an explicitly reviewed translation. Do not guess a French sentence from the English page and do not replace every U+FFFD with a generic character.
- [ ] Include metadata, navigation, ARIA labels, legal copy, footer text, and JSON-LD in the occurrence review; no occurrence is silently skipped.
- [ ] Add page-specific approved replacements for BushBook and HuhBook where the intended product name is unambiguous.
- [ ] Add page-specific approved replacements for Notund and opaque tokens such as HBTER2X or HBOPEXIX only after checking their surrounding markup. Removing an artifact is allowed only when the exact old token is isolated and the surrounding sentence remains intact.
- [ ] If a trusted replacement is unavailable for a legal or customer-facing sentence, leave that sentence unchanged and keep the affected route out of the approved-indexation set rather than inventing copy.
- [ ] Run the replacement script in dry-run mode and review a context diff for every map entry. Reject any diff that removes a block, changes a protected hash, or changes more occurrences than declared.
- [ ] Apply only the approved map, run npm test plus both preservation and repair-contract tests, then inspect git diff --ignore-space-at-eol.

### Task 5: Add Arabic direction metadata with a seven-file allowlist

**Files:**
- Modify: ar/index.html
- Modify: ar/download.html
- Modify: ar/about.html
- Modify: ar/privacy-policy.html
- Modify: ar/terms-conditions.html
- Modify: ar/refund-policy.html
- Modify: ar/licenses.html

- [ ] Replace only the opening html tag in each allowlisted file from lang="ar" to lang="ar" dir="rtl"; require exactly one match per file.
- [ ] Verify the remainder of each file is byte-identical and the protected homepage regions remain unchanged.
- [ ] Run npm test, the preservation test, the repair contract, and desktop/mobile browser checks for /ar and /ar/download.

### Task 6: Make locale indexation a separate approval gate

**Files:**
- Create: data/indexation-allowlist.json
- Modify only after approval: localization.config.js, generated sitemap/hreflang outputs, and Vercel routing configuration if required

- [ ] Reconcile docs/LOCALIZATION_QA.md, docs/LOCALE_REVIEW_ja.md, and docs/LOCALE_REVIEW_de.md with an explicit approved locale list.
- [ ] Do not remove locale files or their copy. If a locale is not approved, change only publication, sitemap, hreflang, and routing policy after the user selects that policy.
- [ ] Add a test requiring publishedLocales, sitemap entries, hreflang entries, and approved routing to agree with data/indexation-allowlist.json.
- [ ] Regenerate sitemap/hreflang only after this decision and compare the route count to the chosen allowlist. Never hand-edit generated output.

### Task 7: Verify the repair and prepare a reviewable handoff

**Files:**
- Test: all files changed by Tasks 1–6
- Review: output/seo-audit-report.md and output/seo-audit-summary.json

- [ ] Run npm test, seo-repair-contract.test.js, and the preservation manifest verification.
- [ ] Run git diff --ignore-space-at-eol --stat and inspect every changed path. There must be no deletion-only hunk in an SEO, FAQ, legal, script, or facts region.
- [ ] Compare the number of SEO paragraphs, FAQ questions, FAQ JSON-LD entries, and all protected hashes with the baseline.
- [ ] Smoke-test /, /fr, /fr/download, /ar, and /ar/download at desktop and 390px widths. Check title, description, canonical, OG/Twitter tags, FAQ rendering, RTL layout, console errors, and horizontal overflow.
- [ ] If deployment-level verification is required, install the unavailable Vercel CLI with npm i -g vercel, then use it only for read-only environment/log checks or an explicitly approved deployment.
- [ ] Report exact files changed, tests passed, unresolved translation/indexation gates, and the preserved baseline manifest. Do not claim completion while any protected-content hash differs without an explicit approved content change.

## Completion Criteria

- All existing SEO copy, FAQ content, FAQ schema, page scripts, legal content, About facts, and robots additions are preserved by hash or by an explicit reviewed replacement.
- Metadata enum and download social-tag tests pass for every approved published route.
- No U+FFFD or unapproved corruption token remains in an indexable route.
- Arabic pages declare RTL direction and pass browser checks.
- Locale publication status reflects explicit review evidence rather than being changed implicitly by a repair script.
- The final diff is small, allowlisted, line-ending-stable, and free of unexpected deletions.
