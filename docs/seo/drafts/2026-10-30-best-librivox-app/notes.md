# Notes: "What Is the Best LibriVox App? 7 Apps for iPhone and Android Compared"

Draft prepared 2026-10-30 by an Opus 5.5 writer for review. Slug: `best-librivox-app`. Category: Free audiobooks. Hero: `read-along-card`. Not committed, deployed or pinged.

Body: 2,398 words before the Sources list (counted the way `scripts/build-blog.js` counts, with link URLs, table rules and markdown symbols stripped). 10 min read.

## Why this topic

- **Keyword research** (`docs/seo/keyword-research-ai-search-2026-10-30.md`, row #3 and pick 2): 31 phrases from 18 seeds ("librivox app" android, iphone, free, review, reddit; "best librivox app"; "is librivox app free"; "how to listen to librivox on iphone / android"; "librivox player"). Weakest SERP of the run: a 2011 LibriVox blog post, AlternativeTo, Softpedia, store listings. No current listicle. GSC: "librivox alternative" 4 @ 29, "is librivox safe" 14 @ 10.6.
- **AI answer audit** (`C-ai-answer-audit.md`, query 14): Perplexity, ChatGPT and Google AI Mode cite only app store pages and name BookDesign first; Bing AI Mode names Lex first, citing Lex's own blog (`lex-books.com/blog/best-free-audiobook-apps`). Gaps row 14: "Highest-value gap. No independent 'best LibriVox app' comparison exists." Query 7 (free, no subscription): Libby, LibriVox, Hoopla; Bing again cites Lex's blog.
- **Product fit:** HushBook's Discover tab is built on LibriVox and the Internet Archive and adds word-level text, which no store-listing answer mentions.

## Skeleton and AI-lift shape

Verdict sentence first (label "Best free LibriVox app for reading along with the text"), runner-up sentence, check-date sentence, 7-column table (App | Best for | Platforms | Shows the text? | Ads | Price | Offline downloads), question H2s in the order the topic brief gave, then one "[App]: best for [label]" H2 per app with a descriptor quote, 3 to 5 bullets, a Price line, a Catch line (competitors only) and a vendor link. The `compared` array feeds the ItemList schema (rendered `numberOfItems: 7`).

## Ranking, and where it differs from the brief

Order kept as briefed: HushBook, BookDesign, LibriVox!, Fabuly, Lex, Smart AudioBook Player plus BookPlayer, librivox.org.

- **Title says 7 apps, not 6:** the combined "downloaded files" entry is two apps with separate table rows and ItemList items, so 7 is the honest count. librivox.org is not counted (not an app).
- **BookDesign runner-up:** largest catalogue (45,000 claimed), CarPlay, Android Auto, Google Cast, 5M+ Android downloads and 33K App Store ratings. Ads and an ad-tracking privacy label are its catch.
- **LibriVox! above Fabuly and Lex:** the only dedicated LibriVox catalogue app here with no ads, no tracking and no paid tier (tips only), which is what Reddit and its own reviewers ask for. Its catch (iPhone only, offline not stated) is smaller than Fabuly's and Lex's paywalled offline mode.
- **Fabuly above Lex:** both show text, but Fabuly's catalogue is human-narrated public-domain audio (LibriVox and Gutenberg sources), while Lex's App Store listing says its 30,000+ audiobooks are "human & AI-narrated", so a Lex title may not be a LibriVox recording. Lex's Android app could not be confirmed.
- **Aradia: LibriVox listener** (F-Droid, MIT), which ChatGPT named "Best ad-free Android option" for query 14, was seen on F-Droid search but not added: not in the brief's list, and adding it would push the body past 2,400 words. Candidate for the next refresh.

## Sources and how each was verified (all fetched 2026-10-30)

Store pages and sites were fetched with curl (desktop Chrome user agent, `Accept-Language: en-US`, US storefront), stripped to text and read. Quotes are verbatim from that text, with curly apostrophes made straight and the en dash in one app name replaced.

| Claim in post | Source | URL | How verified |
|---|---|---|---|
| "Our only official outlet is the LibriVox.org web site"; third parties "more than welcome to share and re-share them with the world"; API lets apps keep up with the catalog | LibriVox, "LibriVox API Update" (Sept 16, 2026) | https://librivox.org/2026/09/16/librivox-api-update/ | curl, full post read |
| 21,867 cataloged works, 49 languages, 14,951 readers; "free for anyone to listen to, on their computers, iPods or other mobile device" | LibriVox homepage | https://librivox.org/ | curl, statistics block |
| "a non-commercial, non-profit and ad-free project"; "for whatever purpose you wish" | LibriVox, About | https://librivox.org/pages/about-librivox/ | curl |
| Play button plays files "individually in your browser"; M4B "available for most of our books"; zip of the whole book | LibriVox, Help | https://librivox.org/pages/help/ | curl |
| "LibriVox itself doesn't produce any apps for the iphone" | LibriVox blog, Nov 9, 2011 | https://librivox.org/?p=21910 | curl |
| LIBRIVOX AUDIOBOOKS "is not affiliated with Librivox, though the owner is a Librivox member" | LibriVox Wiki, "Choosing a Digital Audio Player" (last edited Dec 4, 2020) | https://wiki.librivox.org/index.php/Choosing_a_Digital_Audio_Player | curl, found via wiki search for "iphone app" |
| "Online text" link to Gutenberg; M4B Part 1 and Part 2 links | LibriVox catalog page, Pride and Prejudice (Version 2) | https://librivox.org/pride-and-prejudice-by-jane-austen-solo-project/ | curl, plus LibriVox API record id 254 (url_text_source gutenberg.org/etext/1342) |
| BookDesign iOS: "Discover 45,000 free audiobooks", 30+ languages, CarPlay, offline downloads, sleep timer, bookmarks, collections; 4.8 from 33K ratings; Contains Advertising; IAP Monthly Subscription $1.99, Yearly Subscription $9.99, Lifetime Ad-Free $24.99; privacy label Third-Party Advertising: Coarse Location, Advertising Data; version 10.4.0 "2d ago" | App Store US | https://apps.apple.com/us/app/librivox-audiobooks/id596159212 | curl |
| Reviews: aj 10483 (10/10/2024) "chapters restarting halfway through"; Nvh9 (04/18/2023) "often continues to play for some time after I have fallen asleep"; Reno912 (05/06/2025) "a hard time finding the previous book" | App Store US, all reviews | https://apps.apple.com/us/app/librivox-audiobooks/id596159212?see-all=reviews | curl |
| Ad-Free app $4.99, "45,000 classics. No ads." | App Store US | https://apps.apple.com/us/app/librivox-audiobooks-ad-free/id662558935 | curl |
| BookDesign Android: Contains ads, In-app purchases ($0.99 to $9.99 per item in page data), 4.6 from 68.2K reviews, 5M+; "the LibriVox collection, thousands of old time radio dramas, and many other collections"; Android Auto, Google Cast; updated Oct 26, 2026; What's new "Fixed playback jumping back after rewinding"; Supporter app $4.99; review Joshua (Aug 29, 2026) "as soon as I close the app and come back they are all gone", BookDesign reply Oct 7, 2026 "should've resolved some of the issues"; review Zahra (June 13, 2026) "screen-enveloping Temu ads with teensy exit buttons" | Google Play US | https://play.google.com/store/apps/details?id=app.librivox.android | curl (the page rendered fully this time; the keyword file had marked it unrendered) |
| "The LibriVox App is not affiliated with the LibriVox project."; "supported by ads and optional purchases" | BookDesign, About | https://librivox.app/about | curl |
| The 45,000 includes non-LibriVox audio: "This recording is part of the Old Time Radio collection." (a BBC Radio 4 Miss Marple dramatization) | BookDesign catalogue page | https://librivox.app/book/166952 | curl |
| r/librivox thread "Is bookDesign and LibriVox the same organization?" (2024-07-15); comments on intrusive ads; the LibriVox! developer's reply | Reddit | https://www.reddit.com/r/librivox/comments/1e3mfci/is_bookdesign_and_librivox_the_same_organization/ | thread RSS feed (`/.rss`) via curl; JSON returned 403 |
| LibriVox!: "Ad free audiobooks for all"; "Great audio books narrated by humans from the librivox collections"; "No subscriptions", "No ads", "No tracking"; Libris.fm; tips $0.99, $1.99, $4.99, $9.99; Data Not Collected; 4.6 from 19 ratings; v2.2 Mar 8 (2026) "live search"; iPhone, iPad | App Store US | https://apps.apple.com/us/app/librivox/id6744654703 | curl |
| Fabuly iOS: "Over 20,000 classic audiobooks"; Free Mode "no ads, no listening limit"; "Read while listening on selected titles with synchronized text"; "On selected books"; Premium adds remastered audio, Originals, dictionary, sleep timer, offline downloads, highlights; "Many free audiobooks in Fabuly come from public-domain sources such as LibriVox and Gutenberg"; IAP $2.99, $19.95, $19.95, $39.99 | App Store US | https://apps.apple.com/us/app/id6476751297 | curl |
| Fabuly on Android: "Fabuly: Classic Audiobooks", in-app purchases $2.99 to $39.99 per item, no "Contains ads", 100K+ | Google Play US | https://play.google.com/store/apps/details?id=com.dopex | curl (package found via the fabuly.io store link) |
| Fabuly site: Read-While-Listening, Offline Downloads, links to both stores | fabuly.io | https://fabuly.io | curl |
| Lex Reader iOS: "Millions of books. Thousands of audiobooks. Free."; "30,000+ human & AI-narrated audiobooks"; "Text-to-audio synchronization (read along)" under INCLUDED FOR FREE; 0.5x to 3x, sleep timer; progress sync; Offline mode under PREMIUM; description $9.99/month or $95.90/year; IAP list $4.99 and $39.99; v1.24 Mar 18 (2026) | App Store US | https://apps.apple.com/us/app/lex-reader/id6757875402 | curl; app found via the iTunes Search API (seller LexBooks, Inc., sellerUrl lex-books.com) |
| Lex Premium "7-day free trial, then $9.99/month" | Lex Premium page | https://lex-books.com/premium | curl |
| Lex blog: "combines 30,000+ LibriVox audiobooks with full-text ebooks"; "No signup required to start listening"; claims iOS, Android, Windows, macOS and web | Lex Blog, March 15, 2026 | https://lex-books.com/blog/best-free-audiobook-apps | curl |
| Smart AudioBook Player: "The app is designed specially for playing audio books."; separate subfolder per book under "My Audiobooks", press "Update"; "First 30 days Full version. Later - Basic version."; "It is a one time purchase."; "The progress is saved independently for all books"; playback history; automatic pause, shake to continue; character list; "NO ADS!"; 4.9 from 201K reviews; 5M+; IAP $0.99 to $4.99 per item; updated Oct 27, 2026 | Google Play US | https://play.google.com/store/apps/details?id=ak.alizandro.smartaudiobookplayer | curl |
| BookPlayer: "A wonderful player for your M4B/M4A/MP3/FLAC based audiobooks"; AirDrop, Files, zip, Audiobookshelf or Jellyfin import; chapters, smart rewind, sleep timer, CarPlay, Apple Watch; GPL v3.0; Pro Monthly $4.99, Pro Yearly $49.99; requires iOS 26.0; no Advertising listed | App Store US | https://apps.apple.com/us/app/bookplayer/id1138219998 | curl |
| HushBook: "Read while listening, and never lose your place."; 0.5x to 3x; press and hold any line; Smart Rewind 3 to 20 seconds; sleep timer at the end of a chapter; thousands of LibriVox and Internet Archive audiobooks "free to download and play offline", filter by language and length, 30-second sample; no Advertising listed | App Store US, v1.3.5 | https://apps.apple.com/us/app/hushbook-audiobook-read-along/id6783243597 | curl |
| HushBook: "Free to download, Zero Ads"; "No account, no sign-in"; "Fully offline after a one-time engine download"; "Thousands of free classics"; catalogue "in six languages"; "Download one and the transcription starts on its own"; "Tap any word to jump there" | hushbook.app | https://hushbook.app/ | curl |
| HushBook on Google Play: same feature set, no "Contains ads" | Google Play US | https://play.google.com/store/apps/details?id=com.hushbook.hushbook | curl |

HushBook price: not printed anywhere (post, table, takeaways, FAQ, CTA, meta, llms line). Table cell "Free, optional Pro"; price line "Free to download. No account, no ads. Optional Pro."

## Claims checked and left out

- **Lex on Android, Windows and macOS:** claimed in Lex's blog and site schema; no Google Play listing found (Play search and WebSearch). Listed under "What we could not confirm"; the table shows Web, iPhone, iPad only.
- **Lex Premium price conflict:** App Store IAP list $4.99 and $39.99 vs the description and site's $9.99 a month ($95.90 a year in the description). The post uses the site's $9.99 a month and names the conflict.
- **Fabuly synced-text title count and Premium billing periods:** not stated anywhere. Left as "selected books" and the raw IAP amounts.
- **Smart AudioBook Player full-version price:** Play shows only a per-item range ($0.99 to $4.99). The post says "one-time in-app purchase".
- **BookDesign iOS subscriptions:** the listing names only "Lifetime Ad-Free" as ad-free; the $1.99 monthly and $9.99 yearly items are stated as subscriptions without claiming what they unlock.
- **LibriVox! offline downloads:** not in the listing; the table says "Not listed".
- **Reddit thread "I can't get the Librivox app to work on my Android Phone" (2022):** Reddit returned 429; not used. The "lose my place" H2 rests on four App Store and Google Play reviews read today.
- **LibriVox API limits** (500 records per request, possible 429s): in the source, deliberately not repeated. The post says only that LibriVox welcomes third-party apps and links to `is-librivox-safe-and-legal` for the rest.
- **"you don't need an app to listen on your phone" (LibriVox, 2011):** verified but cut for length.
- **AI-engine framing** ("Lex is the app Bing names"): kept out of the post; internal research only.

## Cannibalization checks

- `is-librivox-safe-and-legal`: owns safety, copyright, AI narration, quality and outages, and mentions unofficial apps in one paragraph. The new post links there for all of that and reuses only the September 2026 "official outlet" quote (re-fetched). Link back added in that paragraph.
- `how-to-listen-to-audiobooks-for-free` section 4: what LibriVox is, legality, caveats. The new post links there for non-LibriVox free sources. Link back added in section 4.
- `free-read-along-audiobooks`: owns the HushBook read-along how-to; linked instead of repeating the steps.
- `how-to-read-classics-without-getting-bored`: owns which classics to start with; linked from the librivox.org section.
- `how-to-put-audiobooks-on-iphone`, `how-to-play-m4b-files`: own file transfer and M4B playback; linked from the iPhone section.
- `how-long-is-an-audiobook`: running times; linked.
- Sibling `best-apps-to-read-and-listen-at-the-same-time`: linked once, from the "shows the text" H2. Its entry and HTML existed by build time, so the link test passes.

## Link edits (one sentence each)

- `content/blog/is-librivox-safe-and-legal.md`, "unofficial copies" paragraph: appended "We compare them in [which LibriVox app to use](/blog/best-librivox-app)."
- `content/blog/how-to-listen-to-audiobooks-for-free.md`, section 4, second paragraph: appended "To pick an app for LibriVox on your phone, see [the best LibriVox app](/blog/best-librivox-app)."

## Checks run

- H1 equals `title`; metaTitle 57; metaDescription 155; description 220.
- 9 keywords, 5 takeaways (each stated in the body), 7 FAQs (42 to 58 words, each stated in the body).
- Every body mention of HushBook bolded (headings excepted); no HushBook limitation anywhere.
- No en or em dashes in the post, the data entry, the llms line, these notes or the rendered HTML.
- `npm run build:blog` and `node blog-pages.test.js` pass (27 posts at build time).
- Rendered HTML: one table, ItemList with 7 items, read-along-card hero, no markdown leaks.
- sitemap.xml lastmod lines left for the orchestrator, per instructions.
