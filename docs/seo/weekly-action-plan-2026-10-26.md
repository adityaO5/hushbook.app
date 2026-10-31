# HushBook weekly SEO + AEO action plan: week of 2026-10-26

Format follows the Rerun "Weekly SEO Action Plan" template: where things stand, then the five highest-impact actions (page, target query, change, reason, evidence), ranked by expected impact, then carried-over items and the items that need you. Second scheduled run. Next plan: Monday 2026-11-02.

**Evidence:** Search Console pulled 2026-10-26 (`sc-domain:hushbook.app`): 90-day exports to 2026-10-24, plus per-page and per-query files for the last 7 days (**Oct 18 to 24**) and the 7 days before (**Oct 11 to 17**). URL Inspection for 172 URLs (all 80 sitemap URLs plus known variants). Git log since the 2026-10-22 plan. Repo files. Live Google SERPs and People Also Ask in the Playwright browser (5 queries, no captcha). Google autocomplete via the suggest API. No Bing check this week.

## Where things stand

- **Clicks almost doubled week over week.** Last 7 days (Oct 18 to 24): **102 clicks / 6,947 impressions**. Previous 7 days (Oct 11 to 17): **55 clicks / 2,828 impressions**. That is +85% clicks and +146% impressions. CTR fell from 1.9% to 1.5% because most new impressions are blog queries at positions 7 to 13.
- **Against last plan's week** (Oct 14 to 20: 82 clicks / 4,596 impressions): +24% clicks, +51% impressions. Daily impressions passed 1,000 for the first time on Oct 22 (1,190) and stayed above it through Oct 24 (peak 1,287 on Oct 23).
- **90 days:** 311 clicks / 11,527 impressions, up from 253 / 6,969 in the 2026-10-22 pull.
- **The blog now carries the impressions, the comparison and answer pages carry the clicks.** Blog posts: about 5,370 of 6,947 impressions (77%) but 33 of 102 clicks (32%). `/alternatives/pocket-fm-alternatives` (24 clicks) and `/audiobook-with-text` (13) alone earned 37 clicks.
- **Indexing is clean.** **80 of 80 sitemap URLs are "Submitted and indexed"**, no fetch errors. The four posts published since the last plan are all indexed: kids (crawled Oct 22), reading-along (Oct 23), LibriVox (Oct 25), Libby (Oct 26).
- **The two snippet fixes still have not been seen by Google.** `/blog/what-is-immersive-reading` was last crawled **2026-10-13** and `/blog/can-you-read-along-with-audible` **2026-10-15**, the same dates as last week, even though indexing was requested on Oct 22. Their CTR is still under 0.4%. The checklist rule applies: Audible headings and FAQs stay the #1 action.
- **Bing coverage:** not checked this run. Last known state (2026-10-20): home, `/about` and `/read-along-audiobooks` only.

### Pages that rose (Oct 18 to 24 vs Oct 11 to 17)

| Page | Clicks | Impressions | Avg position |
|---|---|---|---|
| `/alternatives/pocket-fm-alternatives` | 14 → **24** | 271 → 553 | 5.9 → 5.8 |
| `/audiobook-with-text` | 1 → **13** | 82 → 176 | **7.9 → 3.7** |
| `/blog/why-do-i-fall-asleep-listening-to-audiobooks` | 0 → **8** | 0 → 504 | 6.7 |
| `/blog/can-you-read-along-with-audible` | 5 → 5 | 804 → **1,486** | 6.9 → 7.4 |
| `/blog/how-to-play-m4b-files` (Oct 20) | 0 → 1 | 0 → **645** | 9.5 |
| `/blog/abridged-vs-unabridged-audiobooks` | 0 → 1 | 52 → 340 | 13.1 → 13.4 |
| `/blog/how-to-listen-to-audiobooks-for-free` (Oct 21) | 0 → 3 | 0 → 266 | 11.2 |
| `/blog/audiobook-listening-speed` | 1 → 1 | 44 → 268 | 6.4 → 7.4 |
| `/blog/how-to-focus-on-audiobooks` | 0 → 4 | 42 → 248 | 5.7 → 5.3 |
| `/blog/what-is-immersive-reading` | 0 → 2 | 706 → 893 | 7.7 → 8.3 |
| `/blog/free-read-along-audiobooks` | 1 → 3 | 9 → 44 | 10.3 → 10.1 |

### Pages that fell

| Page | Clicks | Impressions | Avg position |
|---|---|---|---|
| `/read-along-audiobooks` | 3 → 0 | 58 → **2** | 4.3 → 8.5 |
| `/blog/does-listening-to-audiobooks-count-as-reading` | 2 → 0 | 81 → 125 | 6.9 → 6.6 |
| `/fr` | 3 → 1 | 27 → 12 | 6.6 → 5.8 |
| `/alternatives` (hub) | 0 | 27 → 19 | 7.6 → 10.1 |
| `/alternatives/speechify-alternatives` | 0 | 22 → 9 | 24.0 → 15.1 |

`/read-along-audiobooks` is not a ranking loss: 21 of its 90-day impressions were the brand query "hushbook" as a sitelink, and its real queries ("read along audiobooks", "audio books with words on screen") have 2 to 3 impressions each. Meanwhile `/audiobook-with-text` jumped to position 3.7 with 13 clicks. Watch both, but do not publish anything new that targets "audiobook with text" or "audiobook transcript" (see Part B).

### Queries that rose most (impressions, last 7 days vs the 7 before)

- "immersive reading" 122 → 189 (pos 8.9), "immersive reader meaning" 86 → 107 (7.3), "what is immersive reading" 109 → 119 (8.8). Still **0 clicks** on all of them.
- "can you read along with audible" 7 → 21 (8.5), "how to read along with audible" 5 → 15 (9.1), "how to read and listen on audible" 0 → 13 (10.1), "can you read books on audible or only listen" 2 → 10 (6.6), "audible read along" 2 → 10 (8.6). All 0 clicks.
- M4B cluster (new): "m4b player" 0 → 16 (8.6), "how to play m4b files" 0 → 14 (6.8), "m4b" 0 → 12 (9.9), "how to listen to mpeg 4 audio on iphone" 0 → 10 (6.7), "m4b player windows" 0 → 8 (5.5), "m4b vlc" 4 (7.2), "does vlc play m4b" 3 (8.0).
- Unabridged cluster: "unabridged" 1 → 18 (pos 30.4), "unabridged audiobook" 2 → 18 (15.9), "abridged vs unabridged" 1 → 9 (26.3).
- "whispersync alternative" 3 → 15 with 2 clicks (5.4); "pocket fm kostenlose alternative" 6 → 17 with 2 clicks (6.0).

Fell: "whispersync" 38 → 13 (9.7), "pocket fm alternative free" 29 → 19 (still 1 click, pos 6.8), "speechify alternative" 7 → 1 (pos 37).

### Page-one rankings with low click-through (90 days)

| Query | Page | Clicks / impressions | Position |
|---|---|---|---|
| immersive reading | `/blog/what-is-immersive-reading` | 0 / 311 | 8.6 |
| what is immersive reading | `/blog/what-is-immersive-reading` | 0 / 226 | 7.7 |
| immersive reader meaning | `/blog/what-is-immersive-reading` | 0 / 193 | 7.3 |
| immersive reading meaning | `/blog/what-is-immersive-reading` | 0 / 161 | 7.6 |
| hushbook | `/about` and `/download` | 3 / 452 | 3.7 (sitelinks, benign) |

At page level, the Audible post has the biggest gap: **1,486 impressions and 5 clicks (0.34%) this week**. Over 90 days it shows up for 112 distinct phrasings (96 of them this week), none above 28 impressions; only 292 of this week's impressions come from listed queries, the rest are anonymized long-tail searches.

### Queries at positions 4 to 20 worth pushing (last 7 days)

- Audible: "can i read along with audible" 10 (5.6), "can you read books on audible or only listen" 10 (6.6), "in audible can i read along" 9 (7.4), "does audible have a read along option" 7 (2.4), "if you buy an audiobook can you read it too" 7 (9.7), "does amazon audiobooks come with text" 6 (7.7)
- Speed: "best speed to listen to audiobooks" 11 (7.5), "best speed for audiobooks" 8 (6.6), "what speed do you listen to audiobooks" 6 (14.7)
- Free: "how to listen to audiobooks for free" 9 (11.2), "how to listen to audiobooks free" 7 (11.9)
- Focus: "how to focus on audiobooks" 10 (7.6)
- Pocket FM: "pocket fm alternative" 13 (6.5), "pocket fm competitors" 11 (7.5), "app like pocket fm but free" 10 (8.2), "pocket fm alternative free app" 8 (5.0)

### New queries with no matching page (or a weak one)

Almost every new query maps to an existing post (M4B, free audiobooks, Audible, sleep, kids, ADHD). The few without a good page:

- "librivox alternative" 4 impressions at position 29 (lands on `/alternatives`). Candidate for a future comparison page, now that the LibriVox post exists.
- "are audiobooks faster than reading" 2 at position 40 (lands on the speed post). Fold a short answer into the speed post rather than a new post.
- "simultaneous ebook" 4 at 18.8 and "audiobook library" / "rent audiobooks" at 34 to 42: too vague to target.
- "splash city m4b", "sing sing m4b", "the drama m4b" and similar (about 40 impressions at positions 17 to 46): people looking for pirated M4B copies of specific books. Ignore; they drag the M4B post's average position down.

### Posts published in the last two weeks

| Post | Published | Oct 18 to 24 | Index status |
|---|---|---|---|
| how-to-focus-on-audiobooks | Oct 15 | 4 clicks / 248 impr, pos 5.3 | indexed, crawled Oct 21 |
| audiobook-listening-speed | Oct 15 | 1 / 268, pos 7.4 | indexed, crawled Oct 21 |
| abridged-vs-unabridged-audiobooks | Oct 15 | 1 / 340, pos 13.4 | indexed, crawled Oct 16 |
| why-do-i-fall-asleep-listening-to-audiobooks | Oct 18 | **8 / 504**, pos 6.7 | indexed, crawled Oct 21 |
| how-to-play-m4b-files | Oct 20 | 1 / **645**, pos 9.5 | indexed, crawled Oct 21 |
| are-audiobooks-good-for-dyslexia | Oct 20 | 1 / 108, pos 4.5 | indexed, crawled Oct 21 |
| learn-english-with-audiobooks | Oct 20 | 2 / 86, pos 5.0 | indexed, crawled Oct 21 |
| how-long-is-an-audiobook | Oct 20 | 0 / 48, pos 15.8 | indexed, crawled Oct 20 |
| how-to-listen-to-audiobooks-for-free | Oct 21 | 3 / 266, pos 11.2 | indexed, crawled Oct 21 |
| are-audiobooks-good-for-adhd | Oct 21 | 0 / 111, pos 6.3 | indexed, crawled Oct 21 |
| how-to-retain-information-from-audiobooks | Oct 21 | 0 / 51, pos 6.0 | indexed, crawled Oct 21 |
| are-audiobooks-good-for-kids | Oct 22 | 0 / 72, pos 6.2 | **indexed**, crawled Oct 22 |
| does-reading-along-with-an-audiobook-help | Oct 23 | 2 / 62, pos 5.2 | indexed, crawled Oct 23 |
| is-librivox-safe-and-legal | Oct 24 | 0 / 1 | indexed, crawled Oct 25 |
| can-libby-read-to-you | Oct 25 | after data window | indexed, crawled Oct 26 |

The sleep post is the best performer of the batch (8 clicks, 1.6% CTR). The M4B post is the biggest surprise: 645 impressions in its first full week, mostly "m4b player" and "how to play m4b" phrasings, but only 1 click. The kids post (checklist item 1) is indexed and already has 72 impressions at position 6.2, including "are audiobooks good for kids" and "are audiobooks good for babies".

### Indexing detail (inspection_all.json)

- **Sitemap URLs:** 80 of 80 indexed, no fetch errors.
- **Canonical mismatches:** 3 left (`/es-ES/about`, `/pt-PT/about`, `/id/about`), all from an August 5 crawl when the canonical pointed to `/about`. Google already picks each page as its own canonical. Benign; `/ar/about` cleared since last week.
- **"URL is unknown to Google" (26):** fragment URLs, old aliases, `/blog/feed.xml` and never-shipped variants. Expected.
- **Page with redirect (5):** `www`, `http`, `/ar/privacy-policy`, `/fr/download`, `/ar/download`. Expected.
- **`/desktop`** (new Oct 25) is `noindex` and not in the sitemap, so it was not inspected. Intended for a coming-soon page.
- **Retired URLs:** all 26 URLs in `sitemap-retired.xml` are still "Submitted and indexed", last crawled between Aug 5 and Sep 25. None of their inspection records lists `sitemap-retired.xml` as a sitemap, so Google has not picked the file up from robots.txt yet. The removal check is due on or after 2026-12-01; not due yet. Submitting the file in Search Console is still open (see "Needs you").

## Top 5 actions this week

### 1. `/blog/can-you-read-along-with-audible` → answer each Audible phrasing with its own heading

- **Target queries:** "can you read along with audible" (21 impr this week, pos 8.5), "how to read along with audible" (15, pos 9.1), "how to read and listen on audible" (13, pos 10.1), "can you read books on audible or only listen" (10, pos 6.6), "can i read along with audible" (10, pos 5.6), "audible read along" (10, pos 8.6), "if you buy an audiobook can you read it too" (7, pos 9.7), "does amazon audiobooks come with text" (6, pos 7.7).
- **Evidence:** 1,486 impressions and 5 clicks (0.34% CTR) at position 7.4 this week, up from 804. 2,290 impressions and 10 clicks over 90 days. Google last crawled it on Oct 15, so it is still showing the pre-Oct 20 description. The current H2s ("What you need", "How to turn it on", "If you only own one edition") match none of the query wording.
- **Change:**
  1. Add H2s with the exact phrasing, each opened by a one or two sentence answer: "Can you read books on Audible or only listen?", "If I buy an audiobook, can I also read it?", "How do I turn on Read & Listen?" (rename "How to turn it on"), "Can you read along with Audible on iPhone?".
  2. Add FAQs "Does Audible come with text?" and "Does an Amazon audiobook come with the ebook?". Restate body facts only.
  3. Bump `dateModified` so the sitemap `lastmod` changes, deploy, then request indexing again.
- **Why first:** the largest impression pool on the site for the second week running, with most phrasings on page one and almost no clicks. Same action as last week; nothing was changed on this page except one link (Oct 25).

### 2. `/blog/what-is-immersive-reading` → answer "Immersive Reader meaning" near the top

- **Target queries:** "immersive reading" (189 impr this week, pos 8.9), "what is immersive reading" (119, pos 8.8), "immersive reader meaning" (107, pos 7.3), "immersive reading meaning" (85, pos 7.9), "what does immersive reading mean" (14, pos 8.9), "immersive read" (11, pos 10.1), "what is immersive reader" (8, pos 6.0).
- **Evidence:** 893 impressions and 2 clicks at position 8.3 this week. Over 90 days the four head queries have **891 impressions and 0 clicks**. Last crawled Oct 13, so Google has not seen the Oct 20 title ("What Is Immersive Reading? Meaning and How It Works") or the definition-first opening.
- **Change:**
  1. Rename the H2 "Microsoft Immersive Reader isn't an audiobook library" to "What does Immersive Reader mean?" and move it up to second place, opened by a 40 to 60 word definition of Microsoft's tool and one line on how it differs from immersive reading.
  2. Add the FAQ "What is the difference between immersive reading and Immersive Reader?".
  3. Bump `dateModified`, deploy, request indexing.
- **Why:** second-largest impression pool; "immersive reader" phrasings are about a fifth of its listed query impressions over 90 days (237 of 1,087), and the page answers them only halfway down.

### 3. `/blog/how-to-play-m4b-files` → match the "M4B player" and VLC queries (new)

- **Target queries:** "m4b player" (16 impr, pos 8.6), "how to play m4b files" (14, pos 6.8), "m4b" (12, pos 9.9), "how to listen to mpeg 4 audio on iphone" (10, pos 6.7), "m4b player windows" (8, pos 5.5), "m4b vlc" (4, pos 7.2), "does vlc play m4b" / "does vlc play m4b files" (3 + 3, pos 8 to 10), "how to put m4b files on iphone" (2, pos 9.0), "m4b player windows 11" (2).
- **Evidence:** 645 impressions and 1 click (0.16%) in its first full week, position 9.5. Of its listed 90-day query impressions, 46 of 208 are piracy-style "<book title> m4b" searches at positions 17 to 46 that pull the average down; the real how-to queries sit at positions 5 to 10.
- **Change:**
  1. Add a short H2 "Does VLC play M4B files?" (yes, with chapters under Playback; restate the existing VLC facts).
  2. Rename "How to play M4B files on Windows 10 and 11" to "Best M4B player for Windows 10 and 11" and keep the steps.
  3. Add FAQs "How do I put M4B files on my iPhone?" and "How do I listen to MPEG-4 audio on iPhone?" (M4B and M4A are MPEG-4 audio; restate the Files app route already in the post).
  4. Test the metaDescription lead "The best M4B player for each device: ..." (keep under 160 characters). Bump `dateModified`.
- **Why:** fastest-growing new cluster on the site, high intent, and HushBook is a named answer for iPhone and Android.

### 4. `/alternatives/pocket-fm-alternatives` → put "free" in the title

- **Target queries:** "pocket fm alternative free" (19 impr, 1 click, pos 6.8), "pocket fm kostenlose alternative" (17, 2 clicks, pos 6.0), "pocket fm alternative" (13, 1 click, pos 6.5), "pocket fm competitors" (11, pos 7.5), "app like pocket fm but free" (10, pos 8.2), "pocket fm similar app free" (8, 1 click, pos 5.5), "pocket fm alternative free app" (8, pos 5.0).
- **Evidence:** the top click earner again: **24 clicks / 553 impressions (4.3% CTR)** at position 5.8, up from 14 / 271. The current title, "5 Best Pocket FM Alternatives for Complete Audiobooks", does not say "free", while most of its queries do. Last crawled Oct 13.
- **Change:**
  1. Title test: `5 Best Free Pocket FM Alternatives for Complete Stories (2026)`. Check the alternatives title contract test before changing it (deferred twice for that reason).
  2. Mark free vs paid in the first line of each pick. Keep HushBook first, per the comparison-page rule.
  3. "How much is Pocket FM?" FAQ only with a price checked on Pocket FM's store listing on the day of the edit (not verified in this run).
- **Why:** proven CTR on a query set that grew 2x in a week; a "free" title should lift the free-intent half of it.

### 5. `/blog/abridged-vs-unabridged-audiobooks` → get the definition queries onto page one

- **Target queries:** "unabridged audiobook" (18 impr, pos 15.9), "unabridged" (18, pos 30.4), "unabridged audiobooks" (11, pos 29.0), "abridged vs unabridged" (9, pos 26.3), "what does unabridged mean" (9, pos 23.8), "what is unabridged" (9, pos 23.7), "what is abridged" (5, pos 16.2).
- **Evidence:** 340 impressions and 1 click at position 13.4 this week, up from 52. At 678 words it is still the thinnest post on the blog.
- **Change:** open with a one-line dictionary-style definition of both words; add H2s "What does unabridged mean?", "What does abridged version mean?" and "Are dramatized audiobooks abridged?"; add how-much-gets-cut examples with named, sourced figures; aim for about 1,200 words; bump `dateModified`.
- **Why:** impressions grew 6.5x, but every definition query is on page two or three. Definition queries reward the clearest first sentence.

## Quick wins (under 15 minutes each)

- **`/blog/how-to-focus-on-audiobooks` → link the ADHD post.** Still 0 links from the focus post to `/blog/are-audiobooks-good-for-adhd` (open since last week). The focus post had 248 impressions this week. Link-only edit, no `dateModified` bump.
- **`/blog/audiobook-listening-speed` → answer "are audiobooks faster than reading".** One short paragraph: silent reading speed vs typical narration speed, with the median 151 words per minute from `/blog/how-long-is-an-audiobook`. The query lands on this page at position 40.

## Carried over from the 2026-10-22 plan

**Done since that plan (git log):**
- Kids post published (fbaabf3, Oct 22), indexed.
- Three more posts: reading along (78fb8fe, Oct 23), LibriVox (e5fb374, Oct 24), Libby (049a533, Oct 25). All indexed.
- Footer badge changes (8dee682, 479a163, eb8f618, 651654f, 2894785) and the Desktop legal pages plus a `noindex` `/desktop` page (b336a36). No SEO impact expected.

**Still open (not started):**
- Action 1 (Audible headings and FAQs): open, still #1.
- Action 2 (Immersive Reader H2 and FAQ): open, still #2.
- Action 3 (Pocket FM "free" title): open, now #4.
- Action 4 (abridged expansion): open, now #5.
- Action 5 (Whispersync / read-along comparison table): open, moved out of the top 5. `/whispersync-alternative` recovered to 4 clicks / 84 impressions, and "whispersync alternative" earned 2 clicks at position 5.4.
- Quick win: ADHD link from the focus post (open).
- `/blog/audiobook-listening-speed` speed/time table and FAQs (open; 268 impressions this week, 0.37% CTR).
- Backlog unchanged: home SEO-copy block, home H1, mobile speed (fonts, gtag), per-post OG images, Speechify page watch (`/alternatives/speechify-alternatives` at 15.1, `/speechify-alternative` at 24.8 this week; no swap seen), Wikidata, a possible "LibriVox alternatives" comparison page.
- `seo-preservation` and `seo-repair-contract` baseline refresh: still awaiting your decision.
- Temporary `sitemap-retired.xml` and its robots.txt line: keep until the check on or after 2026-12-01.

## New blog post (draft, ready to review)

See `docs/seo/drafts/2026-10-26-how-to-get-into-audiobooks/`. Details are in Part B notes; summary below.

- **Topic:** "How to get into audiobooks", the beginner guide parked in the backlog since 2026-10-21.
- **Why:** a cluster of beginner phrasings in autocomplete ("how to get into audiobooks", "how to get used to listening to audiobooks", "how to get started with audiobooks", "how to start listening to audiobooks", "how to enjoy audiobooks", "can't get into audiobooks"). The live Google top results are weak: Reddit threads from 3 and 11 years ago, Facebook groups, a 2021 blog, a 2020 WordPress post, NetGalley and Medium. None cite research, and the AI Overview cites Facebook, Reddit and YouTube. Search Console has no query for it yet, so it is a new cluster. It links to five existing posts (focus, free, speed, count-as-reading, ADHD).
- **People Also Ask** (live, 4 queries): "Why is it so hard for me to listen to audiobooks?", "What is the easiest way to listen to audiobooks?", "What is the easiest way for seniors to listen to audiobooks?", "Is it better for your brain to read or listen to audiobooks?", "Do people with ADHD have trouble listening to audiobooks?". H2s and FAQs use this wording.
- **Not cannibalizing:** the focus post covers "why can't I focus"; this post covers choosing, starting and building the habit, and links to the focus post for attention problems. "Audiobook to text" (would compete with the rising `/audiobook-with-text`) and "M4B to MP3" (converter-tool SERP) were rejected (see notes.md).
- **Files:** `post.md` (about 2,100 words, 17 sources), `registry-entry.js` (dates left as `YYYY-MM-DD`), `llms-line.txt`, `wiring.md` (2 contextual links, no answer-page change), `notes.md`.

## Needs you

1. **Request indexing** (Search Console, URL Inspection, in Chrome Profile 2) after actions 1 and 2 ship:
   - `https://hushbook.app/blog/can-you-read-along-with-audible` (last crawled Oct 15; the Oct 22 request did not lead to a crawl)
   - `https://hushbook.app/blog/what-is-immersive-reading` (last crawled Oct 13)
   - `https://hushbook.app/alternatives/pocket-fm-alternatives` after its title change (last crawled Oct 13)
   - After the new post ships: `https://hushbook.app/blog/how-to-get-into-audiobooks`
   When you request, wait for the "Indexing requested" confirmation; if Search Console says the quota is reached, try again the next day.
2. **Submit `https://hushbook.app/sitemap-retired.xml`** in Search Console → Sitemaps. Google has not linked it to any of the 26 retired URLs yet.
3. **Bing:** confirm the Bing Webmaster Tools import from Search Console, and that `npm run indexnow` (or `node scripts/indexnow-ping.js` with full URLs) ran after the Oct 22 to 25 deploys. Status unknown for two weeks.
4. **Reddit and listings:** confirm promotional posting is paused (open since 2026-10-20).
5. **Review the beginner-guide draft** and approve publishing it.
6. **Decide** on refreshing the `seo-preservation` / `seo-repair-contract` baselines.

## Run notes

- **Data window:** 7-day files cover Oct 18 to 24 and Oct 11 to 17 (end date = run day minus 2, `dataState: all`). Oct 23 and 24 are fresh data and may still change slightly. The 90-day query and page files run to Oct 24.
- **Week-over-week method:** this run used the new `pages_7d` / `pages_prev7d` / `queries_7d` / `queries_prev7d` files; the headline totals come from `dates.csv`. Page-level click sums (102) match the daily totals this week. Query-level files list only 18 of 102 clicks, because most clicks come from anonymized queries.
- **Improvement:** `queries_pages.csv` is a 90-day file, so this run mapped weekly queries to pages through 90-day data. A `queries_pages_7d.csv` from `gsc_pull.py` would make the page mapping exact.
- **Improvement:** `gsc_inspect_all.py` could flag sitemap URLs whose `lastCrawlTime` is older than the file's last git change. That would have caught the two un-recrawled snippet fixes automatically.
- **Search Console MCP** (`searchconsole`) failed to connect (30 s timeout). Not needed this week because the 7-day CSVs covered it.
- **Playwright:** worked. Five live Google searches with no captcha; browser closed at the end. The Playwright MCP saved its page snapshots and console logs to `D:\Hushbook.app\.playwright-mcp\`, which is gitignored but sits inside the repo. Improvement: start the server with an output directory outside the repo.
- **Bing:** not checked (time spent on the SERP and PAA work for the draft). Still unknown since 2026-10-20.
- **Shell restrictions:** inline `python -c` needed approval and was skipped; analysis ran as scripts in `%USERPROFILE%\hushbook-seo\scratch\2026-10-26\` that write their own output files. No impact on results.
- **Not verified this run:** Pocket FM pricing (action 4), the alternatives title contract test (action 4), Spokt and Storyteller facts (carried action 5).
- **Blog research:** one opus research agent (read-only, about 18 minutes). All 13 DOIs used or considered were checked against Crossref in this run and matched (a DOI guessed for the Richardson study before the agent reported returned 404 and was not used; the agent's DOI matched). Pew, OverDrive, NLS, RNIB and Libby pages were fetched to confirm titles and key phrases; the Pew percentages were read from the page's chart data. The agent corrected the brief in one place (Pew has a 2025 figure, 26%, newer than the 2021 one). Not verified and therefore not used: sample sizes in the two driving studies, the APA "58% of Americans" figure, Audible's sample length, and an RNIB book count (the page gives both 34,000 and 40,000). Details are in the draft's notes.md.
- **Memory not updated:** edits to the `weekly-seo-plan` and `blog-topic-backlog` memory files were blocked as sensitive in this headless run. Next interactive session should record: the Oct 18 to 24 baseline (102 clicks / 6,947 impressions, 80/80 indexed), the un-recrawled Audible and immersive pages, the M4B baseline (645 / 1 / pos 9.5), this draft, and the rejected topics (audiobook to text, M4B to MP3). Improvement: allow memory-file edits in the scheduled task's allowlist, or have the run write a `memory-update.md` next to the plan.
- **Nothing was committed, pushed, deployed or built.** Only this file and the draft folder were written in the repo.
