# HushBook weekly SEO + AEO action plan — week of 2026-10-22

Format follows the Rerun "Weekly SEO Action Plan" template: where things stand, then the five highest-impact actions (page, target query, change, reason, evidence), ranked by expected impact, then carried-over items and the items that need you. This is the first automated run. Next plan: 2026-10-27 (scheduled Monday run).

**Evidence:** Search Console pulled 2026-10-22 (90 days, 2026-08-03 to 2026-10-20, `sc-domain:hushbook.app`), plus per-week page and query breakdowns from the Search Console API for 2026-10-14 to 10-20 and 2026-10-07 to 10-13. URL Inspection for 168 URLs (every sitemap URL plus known variants). Git log since the 2026-10-20 plan. Repo files. Google autocomplete via curl. WebSearch for competing results. No live Google or Bing SERP check this week: the Playwright browser was not available to this run.

## Where things stand

- **Traffic is up sharply week over week.** Last 7 days (Oct 14 to 20): **82 clicks / 4,596 impressions**. Previous 7 days (Oct 7 to 13): **29 clicks / 937 impressions**. That is 2.8x the clicks and 4.9x the impressions. CTR fell from 3.1% to 1.8% because the new impressions are mostly blog queries at positions 7 to 10. For reference, the window the last plan used (Oct 12 to 18) had 62 clicks / 3,465 impressions.
- **90 days:** 253 clicks / 6,969 impressions, up from 222 / 5,317 in the 2026-10-20 pull.
- **Indexing is clean.** All **76 of 76 sitemap URLs are "Submitted and indexed"** (last plan: 67 of 73, with 4 unknown and 2 "Discovered, not indexed"). `/blog` and `/blog/m4b-vs-mp3` are now indexed. All 7 posts published on Oct 20 and 21 were crawled and indexed within about a day.
- **Two big pages have not been recrawled since their snippet fixes.** `/blog/what-is-immersive-reading` was last crawled **2026-10-13** and `/blog/can-you-read-along-with-audible` on **2026-10-15**. The new title and meta descriptions shipped on 2026-10-20 (commit bee5ec0). Google is still showing the old snippets on the two pages that hold 43% of this week's impressions.
- **Bing coverage: unknown this week.** No browser was available to check. Last known state (2026-10-20): home, `/about` and `/read-along-audiobooks` only.

### Pages that rose (Oct 14 to 20 vs Oct 7 to 13)

| Page | Clicks | Impressions | Avg position |
|---|---|---|---|
| `/alternatives/pocket-fm-alternatives` | 2 → **21** | 35 → 382 | 5.4 → 6.0 |
| `/blog/can-you-read-along-with-audible` | 0 → 6 | 121 → **1,108** | 7.0 → 7.0 |
| `/blog/what-is-immersive-reading` | 0 → 2 | 115 → **873** | 6.8 → 8.1 |
| `/alternatives/bookplayer-alternatives` | 0 → 3 | 16 → 142 | 5.2 → 5.7 |
| `/audiobook-with-text` | 0 → 3 | 28 → 111 | **15.9 → 4.1** |
| `/alternatives/storytel-alternatives` | 0 → 1 | 20 → 116 | 5.2 → 4.8 |
| `/blog/abridged-vs-unabridged-audiobooks` (new Oct 15) | 0 | 0 → 146 | 12.8 |
| `/blog/how-to-focus-on-audiobooks` (new Oct 15) | 1 | 0 → 121 | 5.6 |
| `/blog/audiobook-listening-speed` (new Oct 15) | 1 | 0 → 110 | 7.4 |
| `/blog/does-listening-to-audiobooks-count-as-reading` | 0 → 2 | 15 → 99 | 5.7 → 6.7 |
| `/blog/why-do-i-fall-asleep-listening-to-audiobooks` (new Oct 18) | 3 | 0 → 59 | 6.0 |

### Pages that fell

| Page | Clicks | Impressions | Avg position |
|---|---|---|---|
| `/read-along-audiobooks` | 7 → 1 | 78 → 18 | 4.0 → 5.5 |
| `/` (home) | 7 → 2 | 137 → 113 | 4.2 → 2.9 |
| `/whispersync-alternative` | 4 → 0 | 91 → 73 | 6.9 → 6.9 |
| `/alternatives` (hub) | 0 | 72 → 13 | 6.3 → 6.2 |
| `/ar` | 3 → 1 | 35 → 14 | 7.8 → 7.4 |

Week-level samples are small, so a single query explains most moves. `/read-along-audiobooks` lost its 2 clicks on "audio books with text to follow" (position 1.7 the week before, 8.0 this week). Brand queries containing "hush" went from 7 clicks to 4 (Oct 14 to 19 in the API), which explains most of the home page dip. Too small to act on; watch it next week.

### Page-one rankings with low click-through (90 days)

| Query | Page | Clicks / impressions | Position |
|---|---|---|---|
| immersive reading | `/blog/what-is-immersive-reading` | 0 / 191 | 7.9 |
| what is immersive reading | `/blog/what-is-immersive-reading` | 0 / 184 | 7.6 |
| immersive reader meaning | `/blog/what-is-immersive-reading` | 0 / 132 | 7.4 |
| immersive reading meaning | `/blog/what-is-immersive-reading` | 0 / 105 | 7.2 |
| whispersync | `/whispersync-alternative` | 1 / 55 | 9.4 |
| hushbook | `/about` | 2 / 273 | 3.7 (sitelink, benign) |

### Queries at positions 4 to 20 worth pushing (90 days, 10+ impressions)

- "pocket fm alternative free" 4 / 41, pos 7.2; "pocket fm alternative" 0 / 16, pos 7.2; "pocket fm competitors" 0 / 15, pos 7.1; "pocket fm kostenlose alternative" 2 / 13, pos 6.0
- "can you read along with audible" 0 / 18, pos 8.6; "how to read along with audible" 0 / 13, pos 10.1
- "what is immersive reader" 0 / 15, pos 4.5; "what does immersive reading mean" 0 / 15, pos 7.1; "immersion reading" 1 / 15, pos 19.7
- "free alternative to speechify" 0 / 13, pos 17.9 (`/alternatives/speechify-alternatives`, avg position 26)
- "whispersync alternative" 1 / 10, pos 4.5
- "unabridged audiobook" 0 / 10, pos 15.3

### New queries since the last pull (no matching page or weak match)

Mostly long-tail variants of existing pages: Audible read-along phrasings, "is it good to listen to audiobooks while sleeping" (sleep post), "what to do while listening to an audiobook" (pos 3, focus post), "are dramatized audiobooks abridged" (abridged post), "how much is pocket fm" (Pocket FM page), "how to learn english step by step book" (learn-English post). No new query cluster lacked a page. The blog topic below came from autocomplete instead (see Part B).

### Posts published in the last two weeks

| Post | Published | Oct 14 to 20 | Index status |
|---|---|---|---|
| how-to-focus-on-audiobooks | Oct 15 | 1 click / 121 impr, pos 5.6 | indexed, crawled Oct 21 |
| audiobook-listening-speed | Oct 15 | 1 / 110, pos 7.4 | indexed, crawled Oct 21 |
| abridged-vs-unabridged-audiobooks | Oct 15 | 0 / 146, pos 12.8 | indexed, crawled Oct 16 |
| why-do-i-fall-asleep-listening-to-audiobooks | Oct 18 | 3 / 59, pos 6.0 | indexed, crawled Oct 21 |
| are-audiobooks-good-for-dyslexia | Oct 20 | 0 / 9, pos 3.2 (90-day total) | indexed, crawled Oct 21 |
| learn-english-with-audiobooks | Oct 20 | 0 / 6, pos 3.5 (90-day total) | indexed, crawled Oct 21 |
| how-long-is-an-audiobook | Oct 20 | no impressions yet | indexed, crawled Oct 20 |
| how-to-play-m4b-files | Oct 20 | no impressions yet | indexed, crawled Oct 21 |
| how-to-retain-information-from-audiobooks | Oct 21 | after data window | indexed, crawled Oct 21 |
| are-audiobooks-good-for-adhd | Oct 21 | after data window | indexed, crawled Oct 21 |
| how-to-listen-to-audiobooks-for-free | Oct 21 | after data window | indexed, crawled Oct 21 |

The sleep post is the fastest starter so far: 3 clicks in its first 3 days at position 6.0. The abridged post gets impressions but sits on page two for its definition queries.

### Indexing detail (inspection_all.json)

- **Sitemap URLs:** 76 of 76 indexed. No fetch errors on any sitemap URL.
- **Canonical mismatches:** 4 sitemap URLs (`/es-ES/about`, `/pt-PT/about`, `/ar/about`, `/id/about`) still carry an August 5 crawl where the declared canonical was `/about`. The live files now self-canonicalize, and Google already picked the page itself as canonical. Benign; they will clear on recrawl. 23 more mismatches are on retired locale legal pages (below).
- **"URL is unknown to Google" (37):** fragment URLs (`/#faq` etc.), old aliases (`/privacy`, `/terms`, `/es`, `/pt`, `/index.html`), `/blog/feed.xml` and never-shipped locale download/licenses variants. Expected, no action.
- **Retired URLs:** all 26 URLs in `sitemap-retired.xml` are still "Submitted and indexed" from crawls on Aug 5 to 7. They 308-redirect live (checked: `/uk/privacy-policy` → `/privacy-policy`, `/de/download` → `/de`). Search Console lists only `sitemap.xml` as a submitted sitemap (last submitted 2026-10-21, 0 errors), so Google is only finding `sitemap-retired.xml` through robots.txt. The removal check is due on or after 2026-12-01; not due yet.

## Top 5 actions this week

### 1. `/blog/can-you-read-along-with-audible` → turn 1,108 weekly impressions into clicks

- **Target queries:** "how to read along with audible" (12 impr this week, pos 10.1), "can you read along with audible" (11, pos 8.3), "in audible can i read along" (8, pos 7.8), "can you read books on audible or only listen" (5, pos 3.0), "can you read along with audible on iphone" (5, pos 10.4), "if i buy an audiobook can i also read it" (3, pos 3.3), "how to turn on read and listen on audible" (3, pos 10.3).
- **Evidence:** 1,108 impressions and 6 clicks (0.54% CTR) at position 7.0 this week, up from 121 impressions. About 70 distinct Audible read-along phrasings hit this one page (and most impressions come from anonymized queries Search Console does not list). Many sit at positions 9 to 11, the edge of page one.
- **Change:**
  1. Request indexing (see "Needs you"). Google last crawled it on Oct 15, before the shorter meta description shipped on Oct 20.
  2. Add H2s that match the phrasing exactly: "Can you read books on Audible or only listen?", "If I buy an audiobook, can I also read it?", "How do I turn on Read & Listen?" (rename "How to turn it on"), "Can you read along with Audible on iPhone?" Open each with a one or two sentence answer.
  3. Add FAQs: "Does Audible come with text?" and "Can I see the words on Audible?" Restate body facts only.
  4. Bump `dateModified`.
- **Why first:** largest impression pool on the site, and most of the long tail is one H2 away from a direct answer.

### 2. `/blog/what-is-immersive-reading` → answer the "Immersive Reader meaning" intent

- **Target queries:** "immersive reading" (152 impr this week, pos 8.0), "what is immersive reading" (131, pos 8.0), "immersive reader meaning" (100, pos 7.6), "immersive reading meaning" (80, pos 7.4), "what does immersive reading mean" (12, pos 8.2), "what is immersive reader" (11, pos 5.8).
- **Evidence:** 873 impressions and 2 clicks at position 8.1 this week. Over 90 days, the four head queries have 612 impressions and 0 clicks. Google last crawled the page on Oct 13, so it has not seen the new title ("What Is Immersive Reading? Meaning and How It Works") or the definition-first opening from Oct 20.
- **Change:**
  1. Request indexing first, then wait a week before judging the title.
  2. Rename the H2 "Microsoft Immersive Reader isn't an audiobook library" to "What does Immersive Reader mean?" and open it with a 40 to 60 word definition of Microsoft's tool, then the contrast with immersive reading. About a fifth of the listed impressions this week (roughly 128) are "immersive reader" phrasings, and the page answers that only in a section halfway down.
  3. Add the FAQ "What is the difference between immersive reading and Immersive Reader?"
- **Why:** second-largest impression pool, and it has zero organic clicks so far.

### 3. `/alternatives/pocket-fm-alternatives` → lean into "free"

- **Target queries:** "pocket fm alternative free" (32 impr this week, 4 clicks, pos 7.2), "pocket fm alternative" (13, pos 8.1), "pocket fm competitors" (10, pos 7.1), "pocket fm kostenlose alternative" (11, 1 click, pos 6.0), "app like pocket fm but free" (6, pos 7.3), "pocket fm similar app free" (5, pos 5.6).
- **Evidence:** the site's top click earner this week: 21 clicks / 382 impressions at position 6.0, up from 2 / 35. "Free" appears in most of its queries.
- **Change:**
  1. Title test: `5 Best Free Pocket FM Alternatives for Complete Stories (2026)`. Check the alternatives title contract test before changing it; this was deferred last week for the same reason.
  2. Add an FAQ for the new query "How much is Pocket FM?" Only with a price checked on Pocket FM's own store listing on the day of the edit. Unverified this run.
  3. Mark which picks are free and which are paid in each entry's first line. Keep HushBook first, per the comparison-page rule.
- **Why:** proven CTR (5.5%) on a growing query set. A title that says "free" should lift CTR on the free-intent queries.

### 4. `/blog/abridged-vs-unabridged-audiobooks` → get the definition queries onto page one

- **Target queries:** "unabridged audiobook" (9 impr this week, pos 13.8), "what does unabridged mean" (6, pos 22), "unabridged audiobooks" (6, pos 25.5), "abridged vs unabridged" (4, pos 28), "what is unabridged" (5, pos 26.6), plus new "are dramatized audiobooks abridged".
- **Evidence:** 146 impressions this week, 0 clicks, average position 12.8. At 678 words it is the thinnest post on the blog.
- **Change:** open with a one-line dictionary-style definition of both words. Add H2s "What does abridged version mean?" and "Are dramatized audiobooks abridged?" Add how-much-gets-cut figures with named, sourced examples (carried over from last week). Aim for about 1,200 words. Bump `dateModified`.
- **Why:** definition queries reward the clearest first sentence, and this post is already ranking on page two without much depth.

### 5. `/whispersync-alternative` and `/read-along-audiobooks` → the comparison table (carried over)

- **Target queries:** "whispersync" (25 impr this week, pos 8.8), "whispersync alternative" (3, pos 4.7), "read along audiobooks" (2, pos 10.5), "audiobooks with text to follow" (1, pos 8.0).
- **Evidence:** `/whispersync-alternative` went from 4 clicks to 0 on 73 impressions. `/read-along-audiobooks` fell from 7 clicks / 78 impressions to 1 / 18. Neither page has a table or the "Read & Listen not working?" section yet.
- **Change:** as specified in the 2026-10-20 plan (actions 4 and 5): the 5-app comparison table (App, plays your own files, where the text comes from, needs the ebook?, platforms, price), a "Which one fits you?" section, about 1,200 words each, and the "Read & Listen not working?" H2 on the Whispersync page. Re-verify Spokt and Storyteller facts on the day of the edit.
- **Why:** both pages lost clicks this week, and the competing pages (Spokt guides) win on tables.

## Quick wins (under 15 minutes each)

- **`/blog/how-to-focus-on-audiobooks` → link the ADHD post.** The focus post has 121 impressions this week, and its People Also Ask is about ADHD, but it does not link `/blog/are-audiobooks-good-for-adhd` (0 links found). Add one contextual link in "Why is it so hard to focus on audiobooks?". This replaces last week's "add an ADHD H2" now that a full ADHD post exists. Link-only edit, no `dateModified` bump.
- **Submit `sitemap-retired.xml` in Search Console → Sitemaps.** Robots.txt discovery is slower; a direct submission should speed the recrawl of the 26 retired URLs.

## Carried over from the 2026-10-20 plan

**Done since that plan (git log):**
- Snippet fixes for immersive reading and Audible posts, `metaDescription` field, real sitemap `lastmod`: shipped in bee5ec0 (Oct 20).
- Guides footer, entity schema, IndexNow key and script: d84325f (Oct 20).
- Temporary `sitemap-retired.xml` + robots.txt line: c726f94 (Oct 20).
- Value-first HushBook hints and per-post CTAs: ca2f3b4 (Oct 20).
- New posts: learn-English (bee5ec0), dyslexia, audiobook length, M4B playback (298a36d), retention, ADHD, free audiobooks (f845ac0). The "How to play an M4B" item for m4b-vs-mp3 is covered by the new M4B playback post.
- `/blog` and `/blog/m4b-vs-mp3` are now indexed.

**Still open:**
- Action 1 (Bing Webmaster Tools import, URL submission, IndexNow after each deploy): status unknown, needs you.
- Action 2 (focus post): the ADHD part is superseded by the ADHD post; the "What to do with your hands" section, the FAQs matching People Also Ask and a read-along screenshot are still open.
- Action 3 (pause Reddit cross-posting, AlternativeTo and listings): status unknown, needs you.
- Actions 4 and 5 (read-along table, Whispersync expansion): open, now action 5 above.
- `/blog/audiobook-listening-speed` speed/time table and FAQs: open. 110 impressions this week at pos 7.4; "best speed to listen to audiobooks" 4 impr at pos 8.0. Also link the new `/blog/how-long-is-an-audiobook` post from it.
- `/blog/abridged-vs-unabridged-audiobooks` expansion: open, now action 4.
- Backlog items unchanged: home SEO-copy block, home H1, mobile speed (fonts, gtag), per-post OG images, Speechify page cannibalization watch (`/alternatives/speechify-alternatives` at avg pos 26, `/speechify-alternative` at 14.7, no swapping seen yet), Wikidata.
- `seo-preservation` and `seo-repair-contract` baseline refresh: still awaiting your decision.

## New blog post (draft, ready to review)

See `docs/seo/drafts/2026-10-22-are-audiobooks-good-for-kids/`. Topic chosen from autocomplete ("are audiobooks good for kids", "…learning to read", "…toddlers", "…better than tv for kids", "do audiobooks help kids learn to read"), a weak SERP (Understood, Fatherly, Scholastic, retailer blogs), and the existing "Are audiobooks good for…" series. Search Console has no kids queries yet, so this is a new cluster, not a cannibalization risk. Not published: it needs a reviewed session to apply, build, test and deploy.

## Needs you

1. **Request indexing** in Search Console (URL Inspection → Request indexing) for:
   - `https://hushbook.app/blog/what-is-immersive-reading` (last crawled Oct 13, before the Oct 20 title fix)
   - `https://hushbook.app/blog/can-you-read-along-with-audible` (last crawled Oct 15, before the Oct 20 description fix)
   - After the kids post ships: `https://hushbook.app/blog/are-audiobooks-good-for-kids`
2. **Submit `https://hushbook.app/sitemap-retired.xml`** in Search Console → Sitemaps.
3. **Bing:** confirm the Bing Webmaster Tools import from Search Console was done, and that `npm run indexnow` ran after the Oct 20 and 21 deploys (with full URLs for the 7 new posts). If not, do both.
4. **Reddit and listings** (last week's action 3): confirm promotional posting is paused.
5. **Review the kids draft** and approve publishing it.
6. **Decide** on refreshing the `seo-preservation` / `seo-repair-contract` baselines.

## Run notes

- **Data window:** the Search Console export ends 2026-10-20. Oct 20 (11 clicks / 881 impressions) came from the fresh-data export; the API's final daily data ended at Oct 19 when queried. Treat Oct 20 as provisional.
- **Week-over-week method:** per-page and per-query weekly figures came from the Search Console API (`query_search_analytics`) because the CSV files are 90-day aggregates. Page-level weekly sums (about 75 clicks) are lower than the daily totals (82) because Search Console drops some rows at page level; the headline numbers use the daily totals.
- **Previous comparison folder:** `gsc/2026-10-20` holds a 90-day pull to Oct 18. Diffing two overlapping 90-day pulls only shows two days of change, so the API weekly breakdown was used instead. Improvement: have `gsc_pull.py` also write `pages_7d.csv`, `pages_prev7d.csv`, `queries_7d.csv` and `queries_prev7d.csv`.
- **Blocked tools:** Playwright MCP browser failed to connect (connection timeout), so there was no live Google SERP, People Also Ask or Bing check. Competing results came from WebSearch, which is not Google's index. Bing coverage could not be measured.
- **Shell restrictions in this run:** some Bash forms (output redirection, `cd` before git, shell variables) needed approval and were skipped. Scripts wrote their own output files instead. No impact on results.
- **Not verified this run:** Pocket FM pricing (action 3), Spokt and Storyteller facts (action 5). Re-check before editing.
- **Blog research:** one opus research agent (read-only). Its own Bash calls were denied, so it used WebSearch/WebFetch only. All 20 DOIs and 8 ERIC IDs it reported were then checked against Crossref and the ERIC API; all matched. Key numbers were re-read from PMC or Europe PMC abstracts. One source it suggested (a HealthyChildren.org quote) could not be confirmed and was dropped. The draft's notes.md lists every source and what was left out.
- **No People Also Ask data** for the draft (no browser). Check PAA before publishing.
- **Nothing was committed, pushed, deployed or built.** Only this file and the draft folder were written in the repo.
