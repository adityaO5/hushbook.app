# HushBook weekly SEO + AEO action plan: week of 2026-11-09

Format follows the Rerun "Weekly SEO Action Plan" template: where things stand, then the five highest-impact actions (page, target query, change, reason, evidence), ranked by expected impact, then carried-over items and the items that need you. Fourth scheduled run. Next plan: Monday 2026-11-16.

**Evidence:** Search Console pulled 2026-11-09 (`sc-domain:hushbook.app`): 90-day exports to 2026-11-07, plus per-page and per-query files for the last 7 days (**Nov 1 to 7**) and the 7 days before (**Oct 25 to 31**). Daily per-page breakdowns from the Search Console API (`searchconsole` MCP). URL Inspection for 214 URLs (all 75 live sitemap URLs plus known variants and every URL with impressions), re-run by hand after the scheduled inspection step failed again (see Run notes). Git log since the 2026-11-02 plan. Live Google SERPs in the Playwright browser (5 queries, no captcha). Google autocomplete via the suggest API. No Bing check this week.

## Where things stand

- **Best week so far.** Last 7 days (Nov 1 to 7): **173 clicks / 11,712 impressions**. Previous 7 days (Oct 25 to 31): **80 clicks / 7,683 impressions**. That is **+116% clicks** and **+52% impressions**. CTR rose from 1.04% to 1.48%. Daily clicks went from 11 to 15 on Nov 1 and 2 to **25 to 32 a day from Nov 3**.
- **The Oct 25 drop reversed by itself on Nov 3.** `/alternatives/pocket-fm-alternatives` went from 7 to 23 impressions a day (Oct 25 to Nov 2) to **50, 117, 125, 87 and 106** (Nov 3 to 7), and earned **25 clicks** this week (4.96% CTR, position 5.0). `/audiobook-with-text` went from 0 to **5 clicks** (99 impressions, position 5.2) and `/alternatives/storytel-alternatives` from 0 to 2. Neither page was edited or recrawled (Pocket FM's last crawl is still **Oct 13**), so last week's reading holds: it was a Google-side re-evaluation, and it came back.
- **Growth beyond the recovery is real.** Without the five pages that dipped on Oct 25, clicks rose from 78 to 141 (+81%). The biggest movers: `/blog/best-apps-to-read-and-listen-at-the-same-time` (1 → **14 clicks**, 19 → 717 impressions), `/blog/can-libby-read-to-you` (1 → **8**, 154 → 750), `/blog/can-you-read-along-with-audible` (8 → **13**, 1,146 → **1,677**), `/whispersync-alternative` (2 → **12**, 88 → 151).
- **New drop: the M4B how-to post collapsed on Nov 2.** `/blog/how-to-play-m4b-files` had 176 to 244 impressions every day from Oct 25 to Nov 1, then **5, 1, 0, 1, 0, 0** from Nov 2 to 7 (1,472 → 210 for the week, 7 → 0 clicks). It is still indexed (`site:` shows it), was recrawled on **Nov 5** with no fetch problem, and the live page returns 200 with a self-canonical and `index, follow`. Today it is not in Google's top results for "how to play m4b files" (Reddit, payhip, libritalk, Google Play, filehelper, the BookPlayer App Store page, cartechstudio). The drop started before the only edit since Oct 28 (one sentence on Nov 4). Same pattern as the Oct 25 group, which came back after 9 days. Its sibling `/blog/m4b-vs-mp3` picked up 65 to 117 impressions a day from Nov 2 to 5 and then faded on Nov 6 and 7.
- **90 days:** 560 clicks / 30,867 impressions, up from 391 / 19,210 in the 2026-11-02 pull.
- **The blog carries 82% of impressions** (10,230 of 12,459 in the page file) and half the clicks (88 of 174).
- **AI-style queries are appearing.** 42 long, prompt-shaped queries showed up this week (255 impressions, 0 clicks), against 15 (22 impressions) the week before. Examples: "what apps combine audiobook playback with online group chat?" (55, position 4.1), "what apps sync audiobook and reading progress for self-help?" (54, 2.8), "what app features both classic and modern young adult audiobooks" (29, 7.0), "who offers reading lists that combine ebooks and audiobooks" (12, 4.5), persona-prefixed questions ("i am a 18-24 or 25-34 year old female ... which platform has nonfiction with good highlight & note features?") and "evaluate the digital reading subscription: Everand ..." templates. They look like answer-engine fan-out or AI rank-tracker probes. 191 of their 90-day impressions land on the best-apps post.
- **Indexing:** **74 of 75 live sitemap URLs are "Submitted and indexed"**. Still not indexed: `/blog/how-to-put-audiobooks-on-iphone` ("Discovered - currently not indexed", never crawled, published Oct 28). All six posts published Nov 1 to 4 are indexed (crawled the day they shipped).
- **Not deployed yet:** `main` is 2 commits ahead of `origin/main`: the new post `why-cant-i-focus-on-reading` (34146df) and the fix that removes the false "focus view" claim from live pages (34c5d81). The live sitemap has 75 URLs, the local one 76.
- **Bing coverage:** not checked this run (last known state 2026-10-20: home, `/about` and `/read-along-audiobooks` only).

### Pages that rose (Nov 1 to 7 vs Oct 25 to 31)

| Page | Clicks | Impressions | Avg position |
|---|---|---|---|
| `/alternatives/pocket-fm-alternatives` | 1 → **25** | 145 → 504 | 7.0 → 5.0 |
| `/blog/best-apps-to-read-and-listen-at-the-same-time` | 1 → **14** | 19 → **717** | 8.2 → 5.7 |
| `/blog/can-you-read-along-with-audible` | 8 → **13** | 1,146 → **1,677** | 7.8 → 7.5 |
| `/whispersync-alternative` | 2 → **12** | 88 → 151 | 6.1 → 7.3 |
| `/blog/does-reading-along-with-an-audiobook-help` | 6 → 10 | 343 → 518 | 5.7 → 6.1 |
| `/blog/can-libby-read-to-you` | 1 → **8** | 154 → **750** | 7.1 → 6.1 |
| `/` (home) | 13 → 17 | 159 → 252 | 4.0 → 3.2 |
| `/blog/how-to-go-on-an-information-diet` (Nov 1) | new → 7 | new → 18 | 2.8 |
| `/audiobook-with-text` | 0 → 5 | 20 → 99 | 8.9 → 5.2 |
| `/blog/how-to-take-notes-on-audiobooks` (Nov 1) | new → 5 | new → 221 | 5.8 |
| `/blog/audiobooks-with-captions` (Nov 3) | new → 4 | new → 397 | 6.2 |
| `/blog/can-you-read-along-with-spotify-audiobooks` | 2 → 4 | 161 → 546 | 6.7 → 5.7 |
| `/blog/learn-english-with-audiobooks` | 0 → 4 | 89 → 84 | 5.5 → 5.4 |
| `/read-along-audiobooks` | 0 → 3 | 2 → 112 | 5.0 → 4.0 |
| `/blog/are-audiobooks-good-for-adhd` | 0 → 3 | 199 → 219 | 6.6 → 6.1 |
| `/blog/abridged-vs-unabridged-audiobooks` | 1 → 0 | 376 → **697** | 12.2 → 10.2 |
| `/blog/how-long-is-an-audiobook` | 0 → 1 | 2 → **494** | 12.5 → 6.8 |
| `/blog/m4b-vs-mp3` | 0 → 1 | 2 → 373 | 7.0 → 8.8 |
| `/blog/do-audiobooks-count-on-goodreads` (Nov 3) | new → 0 | new → 343 | 6.6 |

### Pages that fell

| Page | Clicks | Impressions | Avg position |
|---|---|---|---|
| `/blog/how-to-play-m4b-files` | **7 → 0** | **1,472 → 210** | 8.4 → 7.5 |
| `/blog/what-is-immersive-reading` | 0 → 1 | 796 → 634 | 8.1 → 8.2 |
| `/blog/why-do-i-fall-asleep-listening-to-audiobooks` | 4 → 4 | 716 → 583 | 6.7 → 6.9 |
| `/blog/how-to-retain-information-from-audiobooks` | 4 → 0 | 184 → 171 | 5.1 → 5.5 |
| `/blog/are-audiobooks-good-for-kids` | 3 → 2 | 196 → 158 | 6.4 → 7.1 |
| `/blog/are-audiobooks-good-for-dyslexia` | 3 → 2 | 122 → 87 | 4.8 → 4.9 |
| `/blog/does-listening-to-audiobooks-count-as-reading` | 0 → 0 | 119 → 143 | **8.0 → 15.6** |
| `/blog/how-to-listen-to-audiobooks-for-free` | 2 → 0 | 29 → 76 | 16.2 → 7.4 (recovering) |

### Queries that rose most (impressions, last 7 days vs the 7 before)

- AI-style questions on the best-apps post: "what apps combine audiobook playback with online group chat?" 1 → **55** (pos 4.1), "what apps sync audiobook and reading progress for self-help?" 1 → **54** (2.8), "what app features both classic and modern young adult audiobooks" 2 → 29 (7.0), "who offers reading lists that combine ebooks and audiobooks" 0 → 12 (4.5), "what are the best digital platforms for fast-paced read-alongs?" 0 → 10 (3.7), "best audiobook apps with integrated discussion boards." 0 → 9 (8.3).
- M4B vs MP3: "m4b vs mp3" 0 → 36 (7.4), "mp3 vs m4b" 0 → 30 (7.1), "m4b format" 2 → 19 (10.3), "what is m4b file" 1 → 11 (10.1).
- "whispersync" 15 → **48** (12.3); "whispersync alternative" 4 impressions with 1 click (1.8).
- Storytel and Pocket FM: "storytel alternatives" 14 → 44 (2.8), "storytel alternative" 3 → 18 with 1 click (3.7), "pocket fm alternative free" 0 → 18 (3.6), "talesfm alternatives" 3 → 20 (5.8), "pocket fm alternatives" 1 → 13 (2.0), "libro.fm alternatives" 2 → 10 (3.7).
- Speed: "how to listen to audiobooks faster without losing comprehension" 14 → **41** (5.9), "audiobook vs reading speed" 5 → 13 (9.5), "are audiobooks faster than reading" 2 → 9 (22.4), "what speed do you listen to audiobooks" 1 → 9 (7.8).
- Unabridged: "unabridged" 19 → 37 (17.5), "unabridged audiobook" 6 → 22 (11.0), "unabridged audiobooks" 12 → 28 (14.6), "abridged vs unabridged" 13 → 25 (13.2), "what is unabridged audiobook" 4 → 14 (9.9).
- Length: "how long is a 300 page audiobook" 0 → 16 (5.1), "how long is an audiobook for a 300 page book" 0 → 8 (3.9).
- Goodreads post's first queries: "audible vs goodreads" 0 → 10 (2.0), "goodreads vs audible" 0 → 6 (1.0), "does audible count towards kindle reading streak" 0 → 6 (9.8).
- Libby: "can libby read books to you" 0 → 12 (7.2), "how to get libby to read aloud" 2 → 8 (4.9).
- Brand: "hushbook" 39 → 55 with **16 clicks** (1.0), "hush book" 22 → 32 with 2 clicks (6.7).

Fell: every M4B how-to phrasing ("how to play m4b files" 39 → 5, "how to play m4b files on android" 25 → 0, "m4b player windows" 26 → 1, "how to listen to mpeg 4 audio on iphone" 23 → 3, "how to play m4b on iphone" 18 → 1), "immersive reading" 166 → 100 (position 9.1 → 10.3) and "what is immersive reading" 80 → 43.

### Page-one rankings with low click-through (90 days)

| Query | Page | Clicks / impressions | Position |
|---|---|---|---|
| immersive reading | `/blog/what-is-immersive-reading` | 1 / 575 | 9.0 |
| immersive reader meaning | `/blog/what-is-immersive-reading` | 0 / 435 | 7.6 |
| what is immersive reading | `/blog/what-is-immersive-reading` | 0 / 349 | 7.8 |
| immersive reading meaning | `/blog/what-is-immersive-reading` | 0 / 296 | 7.8 |
| storytel alternatives | `/alternatives/storytel-alternatives` | 0 / 60 | 3.5 |
| how to play m4b files | `/blog/how-to-play-m4b-files` | 0 / 58 | 5.9 |
| what apps combine audiobook playback with online group chat? | `/blog/best-apps-to-read-and-listen-at-the-same-time` | 0 / 56 | 4.2 |
| what apps sync audiobook and reading progress for self-help? | `/blog/best-apps-to-read-and-listen-at-the-same-time` | 0 / 54 | 2.9 |
| how to listen to audiobooks faster without losing comprehension | `/blog/audiobook-listening-speed` | 0 / 53 | 6.6 |
| can you read along with audible | `/blog/can-you-read-along-with-audible` | 0 / 51 | 8.5 |
| how to read along with audible | `/blog/can-you-read-along-with-audible` | 0 / 45 | 9.3 |
| is librivox safe | `/blog/is-librivox-safe-and-legal` | 0 / 42 | 8.0 |
| hushbook | `/about`, `/download` | 4 / 545 | 3.3 to 3.5 (sitelinks, benign) |

### Queries at positions 4 to 20 worth pushing (last 7 days)

- Immersive: "immersive reader meaning" 118 (7.9), "immersive reading" 100 (10.3), "immersive reading meaning" 73 (8.2), "what is immersive reading" 43 (8.2), "immersion reading" 13 (9.1)
- Audible: "how to read along with audible" 16 (9.4), "how to read and listen on audible" 11 (10.1), "can you read along with audible" 10 (10.3), "how does read and listen work on audible" 10 (9.1), "how to read along in audible" 8 (8.9), "if i buy an audiobook can i also read it" 7 (5.4), "does audible also give you the text" 6 (8.2)
- Unabridged: "unabridged" 37 (17.5), "unabridged audiobooks" 28 (14.6), "abridged vs unabridged" 25 (13.2), "unabridged audiobook" 22 (11.0), "what is unabridged" 22 (12.5), "what does unabridged mean" 15 (14.5), "what is unabridged audiobook" 14 (9.9)
- Speed: "how to listen to audiobooks faster without losing comprehension" 41 (5.9), "bookbeat playback speed" 21 (16.7), "audiobook vs reading speed" 13 (9.5)
- Whispersync: "whispersync" 48 (12.3)
- M4B: "m4b vs mp3" 36 (7.4), "mp3 vs m4b" 30 (7.1), "m4b" 24 (14.2), "m4b format" 19 (10.3)
- LibriVox: "is librivox safe" 21 (6.8)

### New queries with no matching page (or a weak one)

Almost every new query maps to an existing page. The gaps:

- **AI-style "which app" questions about social features** (group chat, discussion boards, audiobook clubs, reading lists that combine ebooks and audiobooks, YA classics and modern titles). They land on the best-apps post, which has no section on social or club features. See action 5.
- **Kindle read-aloud:** "kindle assistive reader change voice" (1, on the immersive post) is the only Kindle text-to-speech query, while autocomplete returns a large "can Kindle read to you" family (device, free, "like Audible" variants). This is this week's draft post (below).
- "does audible count towards kindle reading streak" (6, 9.8) and "do audible books count towards kindle streak" (2, 10.0) land on the Goodreads post. A one-line FAQ there would cover it, only after checking Amazon's Kindle reading-streak help page on the day of the edit (not verified in this run).
- "talesfm alternatives" (20, 5.8) and "libro.fm alternatives" (10, 3.7) land on the Pocket FM page. Libro.fm is a paid store, closer to the Storytel and Audible comparisons; watch, no new page yet.
- "audiobookshelf alternative" (9 over 90 days, 5.4): out of scope (no Audiobookshelf angle, per the 2026-10-20 decision).
- Pirated-copy searches ("splash city m4b", "do not enter m4b", "the drama m4b"): ignore.

### Posts published in the last two weeks

| Post | Published | Nov 1 to 7 | Index status |
|---|---|---|---|
| how-to-keep-track-of-characters-in-a-book | Oct 27 | 1 / 31, pos 4.1 | indexed, crawled Oct 29 |
| can-you-read-along-with-spotify-audiobooks | Oct 27 | 4 / 546, pos 5.7 | indexed, crawled Oct 29 |
| how-to-put-audiobooks-on-iphone | Oct 28 | no data | **Discovered, not indexed (12 days)** |
| how-to-read-classics-without-getting-bored | Oct 29 | no impressions | indexed, crawled Oct 31 |
| best-apps-to-read-and-listen-at-the-same-time | Oct 30 | **14 / 717**, pos 5.7 | indexed, crawled Oct 31 |
| best-audiobook-apps-for-dyslexia | Oct 30 | no impressions | indexed, crawled Oct 31 |
| best-librivox-app | Oct 30 | no impressions | indexed, crawled Oct 31 |
| how-to-get-into-audiobooks | Nov 1 | 0 / 24, pos 6.5 | indexed, crawled Nov 2 |
| how-to-take-notes-on-audiobooks | Nov 1 | 5 / 221, pos 5.8 | indexed, crawled Nov 1 |
| how-to-go-on-an-information-diet | Nov 1 | 7 / 18, pos 2.8 | indexed, crawled Nov 1 |
| audiobooks-with-captions | Nov 3 | 4 / 397, pos 6.2 | indexed, crawled Nov 3 |
| do-audiobooks-count-on-goodreads | Nov 3 | 0 / 343, pos 6.6 | indexed, crawled Nov 3 |
| learn-spanish-with-audiobooks | Nov 4 | 0 / 45, pos 8.4 | indexed, crawled Nov 4 |
| learn-french-with-audiobooks | Nov 4 | no impressions | indexed, crawled Nov 4 |
| learn-german-with-audiobooks | Nov 4 | no impressions | indexed, crawled Nov 4 |
| why-cant-i-focus-on-reading | committed Nov 8 | not live | **not deployed** |

The best-apps comparison is the standout: 14 clicks in its first full week, second only to the Pocket FM page. The captions and Goodreads posts each got 340 to 400 impressions within four days. The three ranked comparisons for dyslexia and LibriVox and the classics post have no impressions after nine days, although they are indexed. The language posts are slow starters (45 impressions for Spanish, none yet for French and German).

### Indexing detail (inspection_all.json)

- **Sitemap URLs:** 74 of 75 indexed. `/blog/how-to-put-audiobooks-on-iphone` is "Discovered - currently not indexed", never crawled. Last week's plan asked for an indexing request; it has not taken effect.
- **Stale crawls on pages that matter:** `/blog/what-is-immersive-reading` and `/alternatives/pocket-fm-alternatives` **Oct 13** (27 days), `/audiobook-with-text` and `/blog/free-read-along-audiobooks` Oct 15, `/blog/abridged-vs-unabridged-audiobooks` and `/read-along-audiobooks` Oct 16, `/blog/how-long-is-an-audiobook` Oct 20.
- **Fresh crawls:** `/blog/can-you-read-along-with-audible` Nov 9 (today), the Storytel and BookPlayer pages Nov 8, home Nov 7, the M4B how-to Nov 5. No fetch errors on any sitemap URL.
- **Canonical mismatches:** 21, all retired translated about, privacy, terms, refund or licence pages whose records date from Aug 5 to Sep 7 crawls. Same as last week; they clear as Google recrawls the 308 redirects. `/es-419/refund-policy` is still "Duplicate, Google chose different canonical than user".
- **Page with redirect (17)** and **"URL is unknown to Google" (55):** `www`, `http`, `/download`, fragment URLs, `/blog/feed.xml`, retired variants. Expected.
- **Retired URLs (`sitemap-retired.xml`, 86 URLs):** 65 still "Submitted and indexed" (68 last week), 12 "Page with redirect" (8 last week), 1 duplicate, 6 unknown, 2 not inspected. Moving in the right direction. The removal check is due on or after 2026-12-01; not due yet. Only `sitemap.xml` is submitted in Search Console (last submitted Oct 27).

## Top 5 actions this week

### 1. `/blog/can-you-read-along-with-audible` → add the question headings (fourth week on the list)

- **Target queries (90 days):** "can you read along with audible" (51 impressions, pos 8.5), "how to read along with audible" (45, 9.3), "how to read and listen on audible" (31, 10.0), "can i read along with audible" (24, 6.9), "in audible can i read along" (23, 8.6), "can you read books on audible or only listen" (21, 1 click, 7.0), "audible read along" (20, 9.1), "if i buy an audiobook can i also read it" (18, 5.8), "does audible also give you the text" (17, 8.0), "does audible have a read along option" (16, 6.1), "can you read along with audible on iphone" (14, 10.1), "does amazon audiobooks come with text" (14, 8.6), "how does read and listen work on audible" (14, 9.5).
- **Evidence:** the largest impression pool on the site: **1,677 impressions this week (+46%) and 13 clicks (0.78%)** at position 7.5. 159 phrasings over 90 days; the listed ones carry 824 impressions and 3 clicks. The H2s ("What you need", "How to turn it on", "If you only own one edition", "When Read & Listen won't cover your book") match none of them. Google recrawled it **today (Nov 9)**, so an edit now is the next version Google sees.
- **Change:**
  1. H2s with the exact wording, each opened by a one or two sentence answer: "Can you read books on Audible or only listen?", "If I buy an audiobook, can I also read it?", "How does Audible Read & Listen work?" (rename "How to turn it on"), "Can you read along with Audible on iPhone?".
  2. FAQs "Does Audible come with text?" and "Does an Amazon audiobook come with the ebook?". Restate body facts only.
  3. Bump `dateModified`, rebuild, deploy, request indexing.
- **Why first:** biggest pool, mostly page-one positions, and the Oct 27 description fix already showed this page responds to closer wording (CTR doubled after that recrawl).

### 2. `/blog/what-is-immersive-reading` → request indexing today, then answer "Immersive Reader meaning" near the top

- **Target queries (90 days):** "immersive reading" (575, 1 click, pos 9.0), "immersive reader meaning" (435, 7.6), "what is immersive reading" (349, 7.8), "immersive reading meaning" (296, 7.8), "immersion reading" (42, 1 click, 15.6), "what does immersive reading mean" (33, 7.5), "what is immersive reader" (23, 7.8); new "does immersive reading count as reading" (6, 7.5) and "wat is immersive reading" (5, 3.4).
- **Evidence:** **634 impressions and 1 click** this week; 3,029 impressions and 3 clicks over 90 days, the largest zero-click pool on the site. Google last crawled it on **Oct 13**, so the Oct 20 title ("What Is Immersive Reading? Meaning and How It Works") has never been shown. Last week's indexing request did not produce a crawl.
- **Change:**
  1. Request indexing now, before any edit (the title fix alone may move CTR, as it did on the Audible post).
  2. Rename the H2 "Microsoft Immersive Reader isn't an audiobook library" to "What does Immersive Reader mean?", move it to second place, and open it with a 40 to 60 word definition of Microsoft's tool plus one line on how it differs from immersive reading.
  3. FAQs "What is the difference between immersive reading and Immersive Reader?" and "Does immersive reading count as reading?" (link to `/blog/does-listening-to-audiobooks-count-as-reading`).
  4. Bump `dateModified`, deploy, request indexing again.
- **Why:** a recrawl is the cheapest lever on the site; four weeks of stale snippet.

### 3. `/blog/abridged-vs-unabridged-audiobooks` → win the definition queries on page two

- **Target queries (90 days):** "unabridged" (75, pos 21.1), "unabridged audiobooks" (54, 1 click, 23.3), "abridged vs unabridged" (48, 18.3), "unabridged audiobook" (48, 16.0), "what is unabridged" (46, 15.5), "what does unabridged mean" (41, 18.8), "what is unabridged audiobook" (19, 10.0), "what is abridged" (15, 13.7), "unabridged vs abridged" (14, 9.4), "what does unabridged audiobook mean" (13, 10.2), "what is unabridged version" (9, 9.3), "are dramatized audiobooks abridged" (8, 9.0).
- **Evidence:** impressions nearly doubled to **697 this week (376 the week before), 0 clicks**, average position 12.2 → 10.2. 109 phrasings over 90 days. Google is testing the page more; most phrasings sit just off page one. Last crawled **Oct 16**. It was last week's action 5 and is now growing fastest of the zero-click pages.
- **Change:**
  1. Add H2 "What does unabridged mean?" right after the intro: one sentence for the dictionary sense (not shortened) and one for audiobooks (every word of the print edition, read aloud), plus how publishers label it ("Unabridged" on Audible and Libby listings, "complete and unabridged" on older CDs; check one live listing of each on the day of the edit).
  2. Add H2 "What does abridged mean?" with the same pattern, and an FAQ "Are dramatized audiobooks abridged?" (only if the body already supports an answer; otherwise skip).
  3. Bump `dateModified`, deploy, request indexing.
- **Why:** the post already answers the question; the headings do not say it in the searcher's words, and position 10 to 18 is where a closer match moves a page onto page one.

### 4. `/blog/how-to-play-m4b-files` → ship the device headings now, and watch for a Google-side return

- **Target queries (90 days):** "how to play m4b files" (58, pos 5.9), "m4b player" (40, 8.5), "how to listen to mpeg 4 audio on iphone" (36, 6.8), "m4b player windows" (35, 5.0), "how to play m4b files on android" (27, 7.2), "m4b files android" (24, 6.2), "how to play m4b on iphone" (20, 8.6), "m4b android" (14, 4.6), "can vlc play m4b" (11, 8.8).
- **Evidence:** **1,472 → 210 impressions and 7 → 0 clicks** week over week. Daily impressions fell from about 200 to almost zero on **Nov 2** and stayed there. Indexed, recrawled Nov 5, no fetch or canonical problem, not in today's top results for "how to play m4b files". The five pages that fell on Oct 25 recovered on Nov 3 without any change, so the likeliest outcome is a return without edits; Search Engine Roundtable had no confirmed November 2026 update when checked today.
- **Change (small, low risk):**
  1. Add H2 "Does VLC play M4B files?" (restate the VLC facts already in the post).
  2. Rename "How to play M4B files on Windows 10 and 11" to "Best M4B player for Windows 10 and 11", keep the steps.
  3. Add FAQs "How do I listen to MPEG-4 audio on iPhone?" and "What app plays M4B files on Android?".
  4. Do not rewrite the post or change its URL. If impressions are not back by the 2026-11-16 run, compare the live page with the Nov 1 deploy (the Cloudflare cutover day, also the day of its last pre-drop crawl) for any markup difference.
- **Why fourth:** it was the biggest impression pool two weeks ago and the heading changes were already planned, but the drop looks Google-side, so the edit's expected effect is smaller than actions 1 to 3.

### 5. `/blog/best-apps-to-read-and-listen-at-the-same-time` → answer the AI-style "which app" questions it already ranks for

- **Target queries (last 7 days):** "what apps combine audiobook playback with online group chat?" (55, pos 4.1), "what apps sync audiobook and reading progress for self-help?" (54, 2.8), "what app features both classic and modern young adult audiobooks" (29, 7.0), "who offers reading lists that combine ebooks and audiobooks" (12, 4.5), "what are the best digital platforms for fast-paced read-alongs?" (10, 3.7), "best audiobook apps with integrated discussion boards." (9, 8.3), "what platforms support chapter-by-chapter thriller read-alongs?" (9, 6.7), "which platforms offer audiobook syncing for club reading?" (3, 7.3).
- **Evidence:** **14 clicks / 717 impressions** in its first full week (1.95% CTR, position 5.7), the second click earner on the site. 191 of its 90-day impressions come from 17 prompt-shaped queries with 0 clicks. These look like answer-engine fan-out queries; being the page that answers them is how a post gets cited.
- **Change:**
  1. Add one H2 "Which apps have book clubs or discussion for audiobooks?" with a short, sourced list. Check each claim on the day of the edit from the vendor's own page (for example Fable's clubs and whether they include audiobooks, Goodreads groups, Libby's lack of social features). Not verified in this run.
  2. Add one FAQ "Which apps sync audiobook and ebook progress?" restating the Whispersync, Storytel and Kobo facts already in the post (if they are there; do not add new claims without a source).
  3. Keep HushBook's ranking unchanged and honest: it has no social features.
- **Why:** cheap, and it is the clearest AEO signal in this week's data; the impressions are already arriving at page-one positions.

## Quick wins (under 15 minutes each)

- **`/blog/how-to-focus-on-audiobooks` → link the ADHD post.** Still no link to `/blog/are-audiobooks-good-for-adhd` (open three weeks). Link-only edit, no `dateModified` bump.
- **`/blog/audiobook-listening-speed` → answer "is it faster to read or listen to a book".** One paragraph using the median 151 words per minute from `/blog/how-long-is-an-audiobook` against Brysbaert's 238 to 260 words per minute silent reading (already cited on the site). "how to listen to audiobooks faster without losing comprehension" grew to 41 impressions (5.9), "audiobook vs reading speed" 13 (9.5), "are audiobooks faster than reading" 9 (22.4).
- **`/blog/how-long-is-an-audiobook` → add the reverse conversion in place.** The post already answers the 300-page question (its new 494 impressions sit at positions 4 to 9). Add two lines under that H2: pages per listening hour (9,300 words an hour divided by 250 to 330 words a page, about 28 to 37 pages) and "a 10-hour audiobook is about 280 to 370 pages; 12 hours is about 340 to 450". New queries: "how many pages is a 12 hour audiobook" (6, 8.8), "how many pages per hour audiobook" (6, 17.0), "how many pages is a 10 hour audiobook" (3, 9.0).

## Carried over from the 2026-11-02 plan

**Done since that plan (git log):**
- Goodreads draft published as `do-audiobooks-count-on-goodreads` (24d6122, Nov 3), indexed Nov 3, 343 impressions in four days.
- `audiobooks-with-captions` (fe4423e, Nov 3), indexed Nov 3.
- Language posts: Spanish (9d8b187), French and German (1f55e7e), Nov 4, all indexed. The Spanish commit also rewrote the outdated "tap any word to jump" claim on 20 posts.
- Homepage: new app renders and live read-along hero (17f5cf4), Arabic desktop fix (4e13a4a), "subtitles for audiobooks" copy (8293db7), Nov 3 and 4.
- Committed but **not deployed**: `why-cant-i-focus-on-reading` (34146df) and the "focus view" copy fix (34c5d81), Nov 8.

**Still open (not started):**
- Last week's action 1 (Pocket FM "free" title and facts refresh): the page recovered on its own to 25 clicks at 4.96% CTR. **Leave the title alone for now**; a title change on a recovering page risks the gain. The shared `checkedDate = '2026-09-13'` refresh across the five comparison pages is still due (facts are two months old).
- Last week's action 2 (M4B headings): open, now #4.
- Last week's action 3 (Audible headings): open, now #1 (fourth week).
- Last week's action 4 (Immersive Reader H2): open, now #2; the indexing request did not produce a crawl.
- Last week's action 5 (`/audiobook-with-text` question at the top): open, lower priority now that the page recovered (5 clicks, position 5.2). Still worth doing with the next answer-page rebuild.
- Quick wins: ADHD link and the speed paragraph (both open, carried again).
- `/blog/audiobook-listening-speed` speed/time table and FAQs (open; 362 impressions, 0.28% CTR this week).
- Backlog unchanged: home SEO-copy block, home H1, mobile speed (fonts, gtag), per-post OG images, Speechify pages (34.5 and 19.9, still far off), Wikidata, a possible "LibriVox alternatives" page, Whispersync comparison table ("whispersync" now 48 impressions a week at 12.3).
- `seo-preservation` and `seo-repair-contract` baseline refresh: still awaiting your decision.
- Temporary `sitemap-retired.xml` and its robots.txt line: keep until the check on or after 2026-12-01.

## New blog post (draft, ready to review)

See `docs/seo/drafts/2026-11-09-can-kindle-read-to-you/`. Full evidence is in its `notes.md` and `research.md`; summary below.

- **Title:** "Can Kindle Read to You? Assistive Reader, Alexa and Audible Narration" (`/blog/can-kindle-read-to-you`, about 2,800 words, 13 min read).
- **Topic:** "Can Kindle read to you?", the Kindle sibling of `/blog/can-libby-read-to-you`, which went from 154 to **750 impressions** this week (8 clicks, position 6.1).
- **Why:** Google autocomplete returns a full family on every seed: "can kindle read to you" (on android, iphone, ipad, mac, pc, the app, for free, out loud), "does kindle read to you like audible", "how to make kindle read to you", "kindle read aloud (iphone, android, app, feature)", "can i listen to my kindle books" (on audible, alexa, for free, on my phone), "how to listen to kindle books" (without audible, for free, on iphone). Search Console has no page for it: the only Kindle text-to-speech query is "kindle assistive reader change voice" (1 impression). The Kindle "read and listen" queries already go to the Audible post, so the draft stays on read-aloud and links there for Read & Listen.
- **Live Google (signed out, US, today):** an AI Overview, then Reddit (r/kindle, 1 year old), Amazon's Assistive Reader help pages, ElevenReader and Murf.ai (both text-to-speech vendors selling their own apps), a university library FAQ, and YouTube/TikTok walkthroughs. People Also Ask: "How do you get your Kindle to read to you?", "How do I turn my Kindle book into an audiobook?", "How can I listen to my Kindle books for free?", "Is there a monthly fee for Kindle?". H2s and FAQs use this wording.
- **What it says:** yes, free: Assistive Reader in the Kindle app (iPhone, iPad, Android, Mac, Fire) and on 11th generation and newer Kindles, Scribe and Colorsoft over Bluetooth; VoiceView on Kindles from 2016 on; Kindle for Windows shortcuts and screen readers; nothing documented for Kindle for Web; Alexa reads Kindle books, but Amazon says Kindle Assistive Reader "isn't available on Alexa+". Human narration costs extra (Audible add-on, $5.45 to $12.00 on three books today) or comes with some Kindle+ titles (Kindle Unlimited was renamed Kindle+ on October 22, 2026). A short, honest evidence section on synthetic voices vs narrators (Wester 2016 n = 36, 74% vs 70%, not significant; Govender and King 2018 n = 45; nothing book-length exists). Soft upsell where the reader weighs a computer voice against a narrator; HushBook's limits stated (it cannot open Kindle or Audible books).
- **Research:** one Opus research agent, about 60 Amazon, Apple, Google, vendor and study sources with VERIFIED/UNVERIFIED status; this run re-checked all 10 DOIs it used or considered against Crossref (all match).
- **Wiring:** `/whispersync-alternative` related card (replaces `/m4b-player`), plus contextual links from the Libby, immersive reading and Audible posts.
- **Files:** `post.md`, `registry-entry.js` (dates left as `YYYY-MM-DD`), `llms-line.txt`, `wiring.md`, `notes.md`, `research.md`.

## Needs you

1. **Deploy the two waiting commits** (`git push` on `main`): the new focus post and the fix that removes the false "focus view" claim from live pages. The second one is a correctness fix for pages that are live now. Then run IndexNow for `https://hushbook.app/blog/why-cant-i-focus-on-reading` and request indexing for it.
2. **Request indexing** (Search Console, URL Inspection, in Chrome Profile 2):
   - Now: `https://hushbook.app/blog/what-is-immersive-reading` (last crawled Oct 13; last week's request did not take, so try again and wait for "Indexing requested").
   - Now: `https://hushbook.app/blog/how-to-put-audiobooks-on-iphone` (Discovered since Oct 28, never crawled).
   - After actions 1, 3 and 4 ship: `https://hushbook.app/blog/can-you-read-along-with-audible`, `https://hushbook.app/blog/abridged-vs-unabridged-audiobooks`, `https://hushbook.app/blog/how-to-play-m4b-files`.
   - After the Kindle post ships: `https://hushbook.app/blog/can-kindle-read-to-you`.
   If the daily quota runs out, continue the next day.
3. **Submit `https://hushbook.app/sitemap-retired.xml`** in Search Console → Sitemaps. Still only `sitemap.xml` is submitted. Open for three weeks.
4. **Approve the inspection script fix.** The scheduled inspection step failed for the second Monday in a row with the same Cloudflare 403 on `Python-urllib` (details in Run notes). Two small edits outside the repo: send a `User-Agent` header in `gsc_inspect_all.py` line 23, and check `$LASTEXITCODE` in `weekly-seo.ps1` so a failure shows in the toast.
5. **Bing:** confirm the Bing Webmaster Tools import and that IndexNow ran after the Nov 3 and 4 deploys. Unknown for three weeks.
6. **Reddit and listings:** confirm promotional posting is paused (open since 2026-10-20).
7. **Review the Kindle draft** and approve publishing it.
8. **Decide** on refreshing the `seo-preservation` / `seo-repair-contract` baselines.

## Run notes

- **Error (again): URL Inspection step failed in the scheduled pull.** `inspection_all.json` was missing from `gsc\2026-11-09`, although the run prompt says it is there. The log `logs\weekly-2026-11-09.log` shows the same `urllib.error.HTTPError: HTTP Error 403: Forbidden` as last week while `gsc_inspect_all.py` fetched `https://hushbook.app/sitemap.xml` (Cloudflare answers the default `Python-urllib/3.14` user agent with 403). `weekly-seo.ps1` still does not check the exit code.
- **Workaround used:** `%USERPROFILE%\hushbook-seo\scratch\2026-11-09\inspect_wrapper.py` (same wrapper as last week: installs a urllib opener with a browser-like `User-Agent`, then runs `gsc_inspect_all.py` unchanged). It inspected 214 URLs (75 in the sitemap) in about 5 minutes and wrote the normal `inspection_all.json` into the data folder.
- **Improvement (needs your OK, unchanged from last week):** in `gsc_inspect_all.py`, fetch the sitemap with `urllib.request.urlopen(urllib.request.Request("https://hushbook.app/sitemap.xml", headers={"User-Agent": "Mozilla/5.0 (compatible; hushbook-seo-inspect/1.0)"}), timeout=30)`; in `weekly-seo.ps1`, check `$LASTEXITCODE` after the inspection step and toast "inspection failed".
- **Data window:** 7-day files cover Nov 1 to 7 and Oct 25 to 31 (end date = run day minus 2). The 90-day files run to Nov 7. Page-level click sums (174) match the daily total (173) within rounding. The query file lists only 38 of 173 clicks; most clicks come from anonymized queries.
- **Week-over-week method:** headline totals from `dates.csv`; page and query deltas from the `_7d` / `_prev7d` files; daily per-page rows for the M4B, Pocket FM, Libby, best-apps and immersive pages from the `searchconsole` MCP. Prompt-shaped query counts come from a simple filter (7+ words starting with what, which, who, best, top, evaluate, "i am", etc.), saved as `scratch\2026-11-09\promptq.py`.
- **Playwright:** worked. Five live Google searches (three for the draft, two to diagnose the M4B drop) with no captcha, then the browser was closed. This contradicts the 2026-11-07 note that Google bot-checks every automated Chromium query; the MCP browser passed today. Snapshots and console logs again went to `D:\Hushbook.app\.playwright-mcp\` (gitignored).
- **Keyword scout tool not used:** the run prompt forbids `node`, so `tools/seo/keyword-scout.mjs` was not run. Topic research used the suggest API from a Python script (`scratch\2026-11-09\ac.py`, 36 seeds), Search Console and the live SERP.
- **Google update check:** a WebSearch for November 2026 ranking volatility found no confirmed update or Search Engine Roundtable post for Nov 1 to 7 (only 2025 items). Treat the M4B drop as unexplained for now.
- **Bing:** not checked.
- **Memory not updated** (this run only writes the plan and the draft). The next interactive session should record: (1) the Nov 1 to 7 baseline (173 clicks / 11,712 impressions, 74/75 indexed); (2) the Oct 25 group's self-recovery on Nov 3 and the new M4B how-to drop on Nov 2; (3) the rise of prompt-shaped AI queries on the best-apps post; (4) the Kindle draft; (5) Google SERPs worked in the Playwright MCP browser on 2026-11-09.
- **Nothing was committed, pushed, deployed or built.** In the repo, only this file and the draft folder were written. Outside the repo: scratch scripts and outputs in `%USERPROFILE%\hushbook-seo\scratch\2026-11-09\` and `inspection_all.json` in the data folder.
