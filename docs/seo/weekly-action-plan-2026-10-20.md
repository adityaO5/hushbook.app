# HushBook weekly SEO + AEO action plan — week of 2026-10-20

Format follows the Rerun "Weekly SEO Action Plan" template: the five highest-impact actions, each with page, target query, change, and reason, ranked by expected impact. Next plan: 2026-10-27, ideally with Search Console data.

**Evidence:** live Google results loaded in a browser (hl=en, gl=us, signed out, one snapshot, blue links only), live Bing results, Google autocomplete, local Lighthouse mobile runs, a crawl of the repo's English pages, HTTP header checks, and an off-site footprint sweep. No Search Console data yet.

## Where things stand

- **Google: healthy and already rewarding the blog.** `site:hushbook.app` shows about 123 URLs, including answer pages and localized homes. `/blog/how-to-focus-on-audiobooks` ranks **#7** for "how to focus on audiobooks" and is the **first source cited in that query's AI Overview**. `/blog/can-you-read-along-with-audible` is about #14 and `/blog/audiobook-listening-speed` about #17. The other six posts are not in the top 30 yet, which is normal at 2 to 13 days old.
- **Bing: thin and stale. This is the AEO gap.** Bing returns the home page under an old title ("Free Audiobook App with Synced Texts"), `/about` under its old title, and `/read-along-audiobooks`. No blog post or comparison page surfaced even for exact-match queries. ChatGPT search and Copilot draw on Bing, so they cannot cite most of the site today.
- **SERP shape.** Every blog query shows an AI Overview and People Also Ask. Reddit holds #1 on 7 of 9 blog queries. Weak sites (personal Medium posts, small blogs) sit in the top 5 on six of them, so a new domain can win.
- **Technical base is strong.** Canonicals, hreflang, single-hop 308 redirects, real 404s, sitemap, Article/FAQ/Breadcrumb schema, `llms.txt`, and AI crawlers allowed in `robots.txt`.
- **Internal links were starving money pages.** Home linked to zero answer pages and zero blog posts. Fixed this week.
- **Off-site footprint is mostly self-submitted.** None of the third-party pages likely to be cited for the six core read-along questions mention HushBook. Spokt, a competitor, owns much of the "read along with your own audiobook" answer space with its own guides.

## Top 5 actions this week

### 1. Get Bing to index the site (Critical for ChatGPT and Copilot)

- **Pages:** all 22 English content pages, plus the refreshed home and About titles.
- **Change:**
  1. Deploy this week's on-site changes.
  2. Bing Webmaster Tools → Add site → **Import from Google Search Console**. Submit `https://hushbook.app/sitemap.xml`.
  3. Bing URL Submission for these 10: `/read-along-audiobooks`, `/audiobook-with-text`, `/whispersync-alternative`, `/m4b-player`, `/audiobook-app-for-dyslexia`, `/alternatives/audible-alternatives`, `/alternatives/bookplayer-alternatives`, `/blog/how-to-focus-on-audiobooks`, `/blog/what-is-immersive-reading`, `/blog/can-you-read-along-with-audible`.
  4. Run `npm run indexnow` after every deploy. It pings Bing, Yandex, Seznam and Naver with every sitemap URL. The key file ships with this change.
  5. Google side: Search Console → Indexing → Pages. Check that nothing important sits in "Crawled, currently not indexed". Resubmit the sitemap.
- **Why:** a page Bing has not indexed cannot be cited by ChatGPT search. This is the cheapest AEO win available.

### 2. `/blog/how-to-focus-on-audiobooks` → push from #7 into the top 3

- **Query:** "how to focus on audiobooks" (#7, first AI Overview source). Also "can't focus on audiobooks" and "audiobooks ADHD".
- **Why:** it already ranks and is already cited. Positions #1 to #3 are Reddit, Medium and Facebook threads. Every People Also Ask question on this query is about ADHD, and the post mentions ADHD once.
- **Change:**
  - New H2 "Are audiobooks good or bad for ADHD?" Open with a 60 to 100 word direct answer, cite sources, make no medical claims.
  - Add FAQ entries that match People Also Ask word for word: "Why is it so hard for me to listen to audiobooks?", "Do people with ADHD prefer audiobooks?", "What to do with your hands while listening to an audiobook?"
  - Fold in a short "What to do with your hands" section. That absorbs the parked "what to do while listening" topic, which is a no-go as its own post.
  - Add one read-along screenshot. None of the 9 posts has an image.
  - Bump `dateModified`.

### 3. Stop Reddit cross-posting, then build real third-party listings

- **Why:** about 45 self-posts and 50 self-comments went out from July to October, across about 30 subreddits and several accounts with identical titles. r/droidappshowcase already auto-removes posts with the hushbook.app link. One r/audiobookshelf thread has "AI slop" comments and a dispute over "free" versus in-app purchases, with official replies at −3 to −5. A sitewide spam flag on the domain is the largest AEO risk in this plan, because Reddit is the #1 source on most of these queries.
- **Change, in order:**
  1. Pause all promotional Reddit posting. Use one disclosed account, and only reply where someone asks for exactly this tool.
  2. **AlternativeTo:** create the HushBook page (`/software/hushbook/` is a 404 today). Add it as an alternative on [BookPlayer](https://alternativeto.net/software/bookplayer/), [Smart AudioBook Player](https://alternativeto.net/software/smart-audiobook-player/), [Storyteller](https://alternativeto.net/software/storyteller/) and [Voice Dream Reader](https://alternativeto.net/software/voice-dream/).
  3. **Fix existing listings.** Rename "HushBook AI" on [trendingaitools](https://www.trendingaitools.com/contact-us/). Claim [SaaSHub](https://www.saashub.com/hushbook). Finish the [Uneed](https://www.uneed.best/tool/hushbook) launch. Add store links on [Betterlaunch](https://www.betterlaunch.co/product/hushbook).
  4. **Pitch 2026-updated lists:** [homeschoolpicks](https://homeschoolpicks.com/special-needs/audiobooks-dyslexic-learners/) and [UMich dyslexiahelp](https://dyslexiahelp.umich.edu/apps/audiobooks) (dyslexiahelp@umich.edu) for dyslexia; [audiobook-converter.com](https://audiobook-converter.com/blog/best-audiobook-player-apps) and [LibriTalk](https://libritalk.com/guides/how-to-listen-to-m4b-on-iphone-and-android) (support@libritalk.com) for M4B.

### 4. `/read-along-audiobooks` → "audiobook player with synced text" and "read along audiobooks for adults"

- **Why:** Spokt's guide `spokt.net/guides/audiobook-player-with-synced-text.html` ranks with a "(2026)" title, a 6-column table and FAQs, and never mentions HushBook. Autocomplete shows "read along audiobooks for adults", and current results lean to kids' apps.
- **Change:**
  - Title: `Read-Along Audiobooks for Adults: 5 Apps Compared (2026)`.
  - Comparison table. Columns: App · Plays your own files · Where the text comes from · Needs the ebook? · Platforms · Price. Rows: HushBook, Audible Read & Listen, Spokt, Storyteller, Libby read-alongs.
  - Expand from about 530 to about 1,200 words. Add a "Which one fits you?" section: own the Kindle + Audible pair, own only the audio file, self-host, library borrower.
  - Keep the answer box first and HushBook first, with honest limits (no Audible/DRM import, no bestseller catalog).
- **Verified competitor facts:**
  - **Spokt:** iPhone/iPad only. A text-to-speech reader that also plays MP3/M4B/M4A/WAV and builds a synced transcript when you attach the matching PDF or EPUB. Free tier, plus a Plus plan or lifetime unlock.
  - **Storyteller:** open source and self-hosted. Aligns an EPUB with its audiobook and outputs EPUB 3 Media Overlays. Web plus iOS/Android apps. CPU-only alignment is slow.

### 5. `/whispersync-alternative` → "whispersync alternative"

- **Why:** the weakest result page checked. The top results are a YouTube video, a Hacker News thread, AI-written Q&A pages and an old Macworld article. Three Spokt guides and a Storyteller video are the likely AI citations.
- **Change:**
  - Title `Whispersync Alternative for Books You Own (2026)`. Expand to about 1,200 words with the same table as action 4.
  - Add the H2 "Read & Listen not working?" Autocomplete for "read and listen" is mostly Amazon troubleshooting: "audible not working", "kindle read and listen not working".

## Next up (week 2)

- **`/blog/audiobook-listening-speed` (about #17).** Put a table under the intro with columns for speed (1x to 2x), effective words per minute at a cited 150 to 160 wpm narration rate, and hours for a 10-hour book. Add the FAQs "How long does it take to listen to a 300-page audiobook?" and "How much faster is 1.5x?" (10 h becomes 6 h 40 m). Absorbs the "narrator words per minute" topic.
- **`/blog/can-you-read-along-with-audible` (about #14).** Add H2s that match autocomplete: "Can you read along with Audible on iPhone?" and "…on Kindle Paperwhite?" Add the FAQ "Does Audible have text to follow along?"
- **`/blog/what-is-immersive-reading`.** Move the one-sentence definition to the first line. The AI Overview and Reader's Digest both define it in sentence one; the post defines it in paragraph 3.
- **New post: "Learn English with audiobooks" (GO).** Google's #1 is digitalbook.io, a small site. Target "learn english with audiobooks" plus "…app" and "…free". Secondary targets: "can you learn a language by listening to audiobooks" and "read while listening method". Strong product fit: tap a word to replay, 0.75x speed, word-level text, a catalog in 6 languages.
- **New post: "Does Audible have subtitles?"** Answer "No" first. Audible Captions was announced in 2019 for a September launch and sued by seven publishers through the Association of American Publishers. The case settled in January 2020, and a February 2020 consent injunction required publisher permission, so Captions never launched beyond a public-domain pilot. Then cover Read & Listen and HushBook. Sources: [Publishers Weekly](https://www.publishersweekly.com/pw/by-topic/digital/copyright/article/82370-in-final-settlement-audible-agrees-to-limit-its-captions-program.html), [Publishing Perspectives](https://publishingperspectives.com/2020/02/copyright-coup-as-association-american-publishers-succeeds-in-audible-captions-case/), [Jane Friedman](https://janefriedman.com/audible-and-book-publishers-settle-the-captions-dispute/).
- **`/blog/abridged-vs-unabridged-audiobooks`.** The thinnest post at about 659 words. Add "how much gets cut" figures (others quote 35 to 75%) and named examples.
- **`/blog/m4b-vs-mp3`.** Add "How to play an M4B on iPhone, Android, Windows and Mac". People Also Ask and the top results are about conversion and playback.
- **No-go topics:**
  - "What to do while listening": fold it into action 2 instead.
  - "Is LibriVox free/legal": librivox.org holds #1 to #3, so answer it as an FAQ in the free read-along post.
  - "Free read along audiobooks" means children's read-alongs to searchers. Don't chase that query; keep the post for its long tail.

## Trust and consistency fixes (AEO)

Answer engines check facts across sources. These mismatches undercut citations:

- **Name drift on listings:** "Read while listening", then "Audiobook Karaoke", now "Audiobook Read Along". Ask APKCombo and AppsApk to refresh, or let them age out.
- **Launch date.** The stores show iOS on Jul 7, 2026 and Android on Jul 25, 2026. Keep site copy consistent with that.
- **Name collisions.** The 2015 "Hushbook" Facebook unfollow app owns `producthunt.com/products/hushbook` and TechCrunch coverage. The YouTube handle `@hushbook` belongs to a gaming channel. Launch on Product Hunt under a distinct slug, and create a brand YouTube channel with a "read along with your own M4B" demo.

## Done this week (local working tree, not committed or deployed)

| Change | Files |
|---|---|
| "Guides" footer column on home, linking all 7 answer pages | `index.html` |
| "Guides" footer column on every alternatives, answer and blog page | `scripts/build-alternative-pages.js`, `scripts/build-blog.js`, `assets/css/alternatives.css`, regenerated pages |
| Curated "More guides": each answer page links its matching blog post or comparison | `scripts/build-answer-pages.js` |
| `/questions` Audible answer links the Read & Listen post | `scripts/build-answer-pages.js` |
| Organization + WebSite schema with App Store, Google Play, Instagram, X, Facebook, Bluesky and Reddit `sameAs`. SoftwareApplication gets `@id` + publisher | `index.html` |
| AboutPage + Person + Organization + Breadcrumb schema. The blog's author `@id` now resolves | `about.html` |
| One `@id` for author and publisher across answer, comparison and blog pages. Blog logo switched to the 256 px brand mark | builders above |
| About title: `About HushBook: Who Builds the Read-Along Audiobook App` | `about.html` |
| Blog `<title>` drops " \| HushBook" when it would exceed 60 characters | `scripts/build-blog.js` |
| Fixed an invalid X link (`x.com/hushbook.app`, dots are not allowed in handles) to `x.com/hushbookapp` | 71 HTML files (About, legal, localized pages) |
| IndexNow key file + `npm run indexnow` | `d04d4af3fd528f227119e0e1ca657324.txt`, `scripts/indexnow-ping.js`, `package.json` |

Tests: 7 of 9 pass. `seo-preservation` and `seo-repair-contract` fail identically on clean `main` because of the Arabic retranslation baselines.

## Backlog (needs a decision or more effort)

- **Home SEO-copy block reads as keyword stuffing.** It targets "best audiobooks 2025", "Project Hail Mary audiobook", "audiobooks Apple", "romance audiobooks" and "audiobooks free trial". Those searchers want book lists, not a player. A preservation test hashes this region, so it was not touched. Recommended: rewrite it as about 300 focused words linking `/read-along-audiobooks`, `/m4b-player`, `/audiobook-app-for-dyslexia` and `/alternatives`, then refresh the baseline.
- **Home H1 has no keyword.** "Reclaim your ability to focus" is brand copy. The title tag carries the keyword, so this is low priority. One option: add "with read-along audiobooks" to the sub-headline.
- **"best audiobook player for android local files".** The top result is a Book Riot list from November 2019. A 2026 roundup could win. It overlaps `/alternatives/bookplayer-alternatives`; retarget that page or write a new one.
- **Mobile speed (lab).** Lighthouse mobile measured these:

  | Page | LCP | TBT |
  |---|---|---|
  | Subpages | 5.0 s | 270–370 ms |
  | Home | 5.8 s | 880 ms |

  On subpages, 87% of LCP is render delay from the Google Fonts stylesheet (about 0.9 s blocking) plus Google Tag Manager. Self-host Fraunces and Hanken Grotesk as subset WOFF2 with `preload`, and defer gtag until idle or first interaction. Field data probably does not exist yet at this traffic level, so UX benefits first.
- **Blog meta descriptions run 177 to 228 characters.** Google truncates around 155 to 160. Add a `metaDescription` field to `data/blog-posts.js`; keep the long text for the index and `llms.txt`.
- **Per-post OG images.** Every post shares one OG image.
- **Possible cannibalization.** `/speechify-alternative` and `/alternatives/speechify-alternatives` both target "speechify alternative". They cross-link. Watch Search Console for the two swapping places, and merge if they do.
- **Wikidata item** with the website, App Store ID and Play ID. Notability is borderline; revisit after press coverage.

## What Search Console access unlocks

1. **Performance export** (Search results → last 3 months → Export) with Queries and Pages. Real positions and impressions let each week target queries already sitting on page 2.
2. **Pages report export** (Indexing → Pages): exact reasons for any excluded URL.
3. **Ongoing weekly runs:** a Google Cloud service account with the Search Console API enabled, added as a restricted user on the `hushbook.app` property, connected through a Search Console MCP server.
4. **Bing Webmaster Tools** via the Search Console import: the coverage numbers behind action 1.
