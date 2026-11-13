# Keyword research: 2026-11-13

Book lane, next title after Pride and Prejudice and Wuthering Heights. Pick: **`best-jane-eyre-audiobook`**. Brief: `docs/seo/drafts/2026-11-13-best-jane-eyre-audiobook/scout.md`.

## Gate

Demand is the 2026-11-11 controlled sweep (`keyword-research-2026-11-11.md`, same 43 Google and 16 Bing/DDG calls per title). SERP: one DuckDuckGo HTML query per title, "best <title> audiobook", read 2026-11-13 with `ddghtml.mjs` (5 queries, all HTTP 200). Every result that looked like a comparison page was opened (`pages.mjs`; dates from markup, words approximate).

| Title | Audiobook-decision / rel ≥ 1250 (11-11) | Dedicated comparison pages in DDG top 10 (opened today) | Gate |
|---|---|---|---|
| Dracula | 133 / 16 | **academyvoices.com/blog/dracula-audiobook-versions-compared**, published 2026-10-13, modified 2026-11-08, about 2,360 words, a "versions at a glance" table of 7 or more editions with narrators, runtimes and a "Full novel?" column, plus an FAQ that answers "Is the Jonathan Bailey Dracula the full book?". Also a Guardian review of the Audible full cast (2026-10-29) and an Esquire piece | **Fails** (dated 2026 page with a real editions table) |
| **Jane Eyre** | **87 / 11** | audiobook.co.uk/recordings/jane-eyre: **no date in markup**, about 470 words, a 9-row Audible UK table (narrator, length, type). products.consumerecho.com "10 Best Jane Eyre Audiobook - January 2025" ("Last Updated : 01-28-2025"): about 220 words, ten product tiles titled "Jane Eyre" with scores, no narrators or runtimes, so no editions table. Rest: Reddit x2, Audible x2, YouTube, librivox.app, librivox.org, archive.org | **Passes** |
| Anna Karenina | 83 / 4 | None. thebooksinsider.com single-edition length page; audiobooksoul series page; Reddit x2; Audible x2; YouTube; archive.org; listenly; librivox.app | Passes |
| The Brothers Karamazov | 80 / 7 | welovetranslations.com "What's the best audiobook of The Brothers Karamazov?": URL and post date **2023-02-12** (the 2024 to 2025 `<time>` tags are reader comments), about 1,900 words, about 25 editions with runtimes. recommendedaudiobooks.com (2026-07-21): a review of one edition (42 h 21 min), not a comparison | Passes (comparison page is from 2023) |
| Les Misérables | 72 / 5 | None. Reddit x2, YouTube x2, Audible x2, librivox.app, librivox.org, audiobooksoul, listening-books.org.uk | Passes |

Free-recording check for the pick (2026-11-13): LibriVox API lists two complete English solo readings of Jane Eyre, Elizabeth Klett (project 2192, 18:36:29) and Dawn Sutton (project 18154, 25:19:06), plus a 21-reader group set and a 36-reader dramatic reading. HushBook Discover's search for "jane eyre" (rebuilt with `je-discover-cards.mjs`) puts Klett's reading first ("Jane Eyre (version 3)", 18h 36m, 4,648,589 archive.org downloads).

**Why Jane Eyre.** Dracula still has the most demand, but the 11-11 reason to park it has been overtaken by a better one: since 2026-10-13 a dedicated 2026 page (academyvoices.com) ranks third for "best dracula audiobook" with a full editions table, a "Full novel?" column and an answer to the full-cast question, so our page would arrive second with the same template. Jane Eyre is the next highest on both counts (87 phrasings, 11 top completions, against Anna Karenina's 83 and 4 and Karamazov's 80 and 7), and its only table is an undated 470-word Audible UK list on the same affiliate site we out-built for Wuthering Heights. The 11 top completions are almost all audiobook-decision ones (`jane eyre audiobook length`, `... juliet stevenson`, `... thandie newton`, `... librivox`, `... free`, `... bbc`, `... youtube`, `... reddit`, `... chapter 1`, `... part 2`), and it is the sibling of yesterday's Brontë post, so the two cross-link.

**Runner-up order for the next days:** 1. The Brothers Karamazov (head of the documented queue; Anna Karenina's 83 against 80 is a near tie, and Karamazov has 7 top completions to 4, plus 17 translation phrasings), 2. Anna Karenina, 3. Les Misérables. Dracula stays parked: re-test only if the owner wants a second-place fight with academyvoices.com.
