# Notes: "Can You Read Along With Spotify Audiobooks? Page Match, Recaps and Transcripts"

Draft prepared 2026-10-27. Content only: not built, committed, pushed, deployed or pinged. Slug: `can-you-read-along-with-spotify-audiobooks` (the keyword file's suggestion; nothing argued for another). Body: 1,819 words before the source list (8 min read); the build's `wordCount`, which includes the sources, is 2,060. The animated read-along card and the embed wiring are being built in parallel by the owner; this draft only places the `[[embed:read-along-card]]` line.

Files touched:
- `content/blog/can-you-read-along-with-spotify-audiobooks.md` (new)
- `data/blog-posts.js` (new entry at the top, above `how-to-keep-track-of-characters-in-a-book`; no `aside`)
- `llms.txt` (new line directly above the characters line, `\r\n` like its neighbours)

## Why this topic

From `docs/seo/keyword-research-2026-10-27.md`, ranked candidate #2 and Top 5 pick 2:

- **Demand proxy:** 9 autocomplete phrases across 11 seeds: "can you read along with spotify audiobooks", "can you read along with audiobooks on spotify", "does spotify audiobooks have text", "does spotify audiobooks have transcripts", "spotify audiobooks transcript", "how to read along on spotify audiobooks", "can you read along to audiobooks on spotify".
- **Search Console:** no Spotify query rows (a 16-month pull filtered on Spotify returned none for a new topic). The sibling pattern is proven: `can-you-read-along-with-audible` is the site's biggest impression pool (2,290 impressions over 90 days, 112 phrasings).
- **Fit:** high. HushBook answers "I want the words on screen", with the honest caveat that it cannot open Spotify audiobooks.
- **Cannibalization:** none. `how-to-listen-to-audiobooks-for-free` covers Spotify pricing and hours only; this post links there for hours instead of repeating them.

### SERP check (WebSearch, 2026-10-27; not Google's index, no People Also Ask)

- **"can you read along with spotify audiobooks":** Engadget (Page Match review), Android Central and inkl (pre-launch code leak), Jane Friedman, GSMArena (twice), a WINK News syndication page, Spotify Newsroom's Page Match tag page, Spotify for Authors blog. All are about Page Match; none says plainly that Spotify shows no text, or explains how to read along by hand.
- **"does spotify audiobooks have text transcript":** stuff.co.za, Yahoo Tech (Recaps), Neowin tag page, futurezone.at and ThePrint (podcast transcripts), WuV (podcast transcripts), Spotify Community "Transcripts for audiobooks" thread (a user request), feedbagel (Recaps), Thurrott (Page Match leak).
- **Verdict:** weak, as the keyword file said. News items about single features, podcast-transcript coverage and a forum request. Nobody puts the answer, Page Match, Recaps, podcast transcripts and a how-to in one place.
- **People Also Ask:** not collected (no browser this run). H2s use autocomplete wording. Check PAA after publishing and align one or two FAQs.

### H2s against the suggested list

| Suggested in keyword file | Used |
|---|---|
| Can you read along with Spotify audiobooks? | Same |
| Do Spotify audiobooks have text or transcripts? | Same |
| What is Spotify Page Match? | Same |
| How to read along with a Spotify audiobook | "How to read along on Spotify audiobooks" (the autocomplete wording "how to read along on spotify audiobooks") |
| What are Spotify audiobook Recaps? | Same |
| Do Spotify podcasts have read along? | Same |
| (brief: HushBook section) | "How to read along word by word instead" (holds the embed) |
| (brief: honest limits) | "Honest limits" |

### Cannibalization guard

- `can-you-read-along-with-audible`: one sentence on Read & Listen as the contrast (needs both editions), then a link. Nothing on how to turn it on.
- `does-reading-along-with-an-audiobook-help`: one paragraph with two of its already-verified studies (Adesope and Nesbit 2012, Varao Sousa et al. 2013) and a link for "is it worth it". The speed step reuses its ACX and Brysbaert figures in two sentences, as the Libby post does.
- `free-read-along-audiobooks` and `/audiobook-with-text`: linked from the HushBook section; the LibriVox "where to find free audiobooks" material is not repeated.
- `how-to-listen-to-audiobooks-for-free`: owns Spotify hours by plan and country. This post links there and keeps only the market count needed for Page Match.
- `can-libby-read-to-you` and `abridged-vs-unabridged-audiobooks`: one link each, at the point they matter.

## Embed and upsell placement

- **Light mention:** third intro paragraph, where the reader's want is first stated ("the words on screen, lighting up as the narrator says them"). One sentence naming HushBook, with "though not for books on Spotify".
- **Main section:** "How to read along word by word instead". The paragraph before the embed says what the app does in the order the card shows it: transcribes on the phone, highlights each word as the narrator reads, the Page reading mode with a page that turns as the narration moves on, then where the books come from. `[[embed:read-along-card]]` sits on its own line, blank lines around it, right after that paragraph. The card's specifics (the book, the chapter, the lamp button) are not described.
- **After the embed:** free vs Pro, e-book sync, on-device transcription, long-press a line, then the plain "can't open Spotify audiobooks" paragraph.
- An in-memory dry run of `scripts/build-blog.js` (the owner's working copy with embed support; all file writes intercepted, nothing written) rendered the post: the `<figure>` with the `/demos/read-along-card` iframe lands right after that paragraph. No markdown leaks, no en or em dashes, FAQPage schema present, `<title>` "Can You Read Along With Spotify Audiobooks? | HushBook".

## Sources and how each was verified

Spotify pages were downloaded with curl on 2026-10-27 (HTTP 200) and read as stripped text. Quotes are verbatim, with straight quotes and apostrophes where the source has curly ones. The three papers' DOIs were re-checked on `https://api.crossref.org/works/<doi>` (title, authors, journal, year match); their numbers were verified from abstracts and full text in `docs/seo/drafts/2026-10-23-does-reading-along-with-an-audiobook-help/notes.md` and are reused unchanged. No new DOI.

| Claim in the post | Source | URL | How verified | Status |
|---|---|---|---|---|
| Page Match announced February 5, 2026; "a first-of-its-kind feature that lets readers seamlessly switch between the printed (or e-book) and audiobook versions of a title"; iOS and Android, "most English-language titles" | Spotify Newsroom, Bookshop.org and Page Match announcement (2026-02-05) | newsroom.spotify.com/2026-02-05/bookshop-partnership-page-match-announcement/ | curl ✓, quotes verbatim | Used |
| Scan to listen, Play from here or Save for later, try again if no match; Scan to read, flip forward or backward; Premium and Audiobooks+ within monthly hours; free users with purchased audiobooks; button only on supported titles; Page Match and Recaps work together; mobile app | Spotify Newsroom, Page Match how-to (2026-02-05) | newsroom.spotify.com/2026-02-05/page-match-how-to/ | curl ✓ | Used |
| Audiobooks in Premium in 22 markets; Page Match expanding to more than 30 additional languages including French, German and Swedish; Recaps now on Android; Bookshop.org print sales live in the US and UK (Android that day, iOS the following week) | Spotify Newsroom (2026-04-15) | newsroom.spotify.com/2026-04-15/audiobook-charts-recaps-page-match-bookshop-update/ | curl ✓ | Used |
| Audiobooks expanding from 22 to more than 180 markets by end of 2026; Page Match page numbers: "Simply scan the book's ISBN barcode and use page numbers to find your place."; more than one million readers since February | Spotify Newsroom, "Audiobooks on Spotify Are Going Global" (2026-10-07) | newsroom.spotify.com/2026-10-07/audiobooks-global-expansion/ | curl ✓, quote verbatim | Used. Same post says Page Match "works in over 30 languages" (total, not additional); the post uses the April wording to avoid the mismatch |
| Recaps: beta from November 13, 2025, iOS, "a limited selection of English-language titles"; Recap button at the top of the audiobook page; first Recap after 15 to 20 minutes, then updated; "only cover the portion of the book you've already heard"; "use AI technology"; "not using audiobook content for LLM training purposes or voice generation" | Spotify Newsroom, Recaps (2025-11-13) | newsroom.spotify.com/2025-11-13/audiobook-recaps-beta-test/ | curl ✓, quotes verbatim | Used |
| Follow-Along: a test on select titles, "time-synchronized illustrations, photos, and graphics", in the audiobook's extras | Spotify Newsroom, 6 audiobook features (2024-11-21) | newsroom.spotify.com/2024-11-21/6-spotify-audiobook-features-that-level-up-your-listening-experience/ | curl ✓, quote verbatim. Current status unknown (stated in Honest limits) | Used |
| Podcasts: "auto-generated and time-synced transcripts" ... "so you can read along with an episode"; scroll down the Now Playing View, tap to follow along full screen; September 2023 | Spotify Newsroom, International Podcast Day (2023-09-28) | newsroom.spotify.com/2023-09-28/international-podcast-day-transcripts-chapters-show-pages-global/ | curl ✓, quotes verbatim | Used |
| Audiobook Now Playing controls: play speed, skip 15 seconds, sleep timer, rate after one chapter, share. No text listed | Spotify Support, "Unlock Audiobooks" | support.spotify.com/us/article/audiobooks-unlock/ | curl ✓. Also says unlocked content "is not being sold or transferred to you" (not quoted) | Used |
| Listening time counts at normal speed (5-hour book at 2x still uses 5 hours) | Spotify Support, "Audiobooks in Premium plans" | support.spotify.com/us/article/audiobooks-premium-plans/ | curl ✓ | Used |
| Desktop Now Playing view lists "Podcast transcripts" | Spotify Support, "Now Playing view" | support.spotify.com/us/article/now-playing/ | curl ✓ | Used |
| "Some shows have auto-generated episode transcripts."; creators can turn them off per episode or for the whole show; not available to all creators | Spotify for Creators Support, "Managing episode transcripts on Spotify" | support.spotify.com/us/creators/article/managing-episode-transcripts-on-spotify/ | curl ✓, quote verbatim; the "not available to all creators" note is paraphrased | Used |
| Spotify's User Guidelines forbid "ripping" and "transferring copies of cached Content from an authorized Device to any other Device" | Spotify, User Guidelines (incorporated by the Terms of Use) | spotify.com/us/legal/user-guidelines/ | curl ✓, quotes verbatim | Used |
| No Spotify help article on audiobook transcripts; no audiobook announcement mentions one | Spotify Support and Newsroom | (absence) | Two WebSearch queries restricted to support.spotify.com (one with `"audiobook" "transcript"`) returned only podcast transcript articles; all seven newsroom posts above read in full. Flagged as an absence claim in Honest limits | Used |
| Audible Read & Listen needs the audiobook and the Kindle ebook; text highlights as the narrator reads | Audible Help, "Learn about Read & Listen" | help.audible.com/s/article/listen-with-whispersync-for-voice?language=en_US | WebFetch ✓ ("you'll need both the audiobook and Kindle eBook"; "The text highlights as the narrator reads.") | Used (one sentence, then a link) |
| 57 studies; spoken plus written beat spoken only | Adesope and Nesbit (2012), Journal of Educational Psychology | 10.1037/a0026147 | Crossref ✓ today; numbers from the 2026-10-23 notes | Used |
| 211 students; listening gave more mind wandering than reading aloud or silently | Varao Sousa, Carriere and Smilek (2013), Frontiers in Psychology | 10.3389/fpsyg.2013.00892 | Crossref ✓ today; 211 analysed per the 2026-10-23 notes (full text) | Used |
| "most performers narrate about 9,300 words per hour" | ACX help | help.acx.com/s/article/how-long-will-my-narrated-audiobook-be | WebFetch ✓ (curl gets a script-only page). 155 a minute is our division | Used |
| 238 wpm non-fiction, 260 fiction | Brysbaert (2019), Journal of Memory and Language | 10.1016/j.jml.2019.104047 | Crossref ✓ today; numbers from the 2026-10-23 notes | Used |

17 sources in the post's list (12 Spotify, 1 Audible, 1 ACX, 3 papers).

### Claims checked but left out

- **Spotify Community "Transcripts for audiobooks" idea** (`community.spotify.com/t5/Live-Ideas/Transcripts-for-audiobooks/idi-p/6596498`): curl redirected to the Spotify login page, so its status could not be read. It is also a user request, not Spotify's own page. Left out.
- **Page Match countries.** No Spotify page lists them. The post says so instead of guessing.
- **Whether Page Match works on desktop or tablets.** Spotify mentions only the mobile app on iOS and Android. The post says "Spotify's posts don't mention desktop".
- **Whether Recaps are still in beta, and whether Follow-Along still runs.** No Spotify page after the launch posts says. Both stated as launch facts with dates.
- **Talk to Spotify / "ask about the story you're currently listening to"** (Newsroom 2026-08-11; English, eligible Premium 18+ in the US, Ireland and Sweden). Verified, but it is a conversational feature, not text on screen. Left out to keep the post on read-along.
- **Podcast transcript eligibility by language** (English, French, German, Spanish, Portuguese) from the Spotify for Creators "Feature Focus June 2025" page: seen only in a search summary, not fetched. Left out.
- **Page Match usage stats** (55% more audiobook hours, 62% of matched titles new to the user; April 2026 post): verified, but promotional and not useful to the reader. Left out.
- **How well Page Match matches an e-reader screen or an abridged audiobook.** No Spotify statement. A Community thread complains about abridged titles; not a primary source. The post advises matching editions and links the abridged guide.
- **Third-party reports** (Engadget's hands-on, Android Central's code leak). Not primary; not cited.
- **Spotify Premium audiobook hours by plan and country.** Owned by `how-to-listen-to-audiobooks-for-free`; linked, not repeated.

## Product claims (all from `D:\hushbook\lib`, branch `main` at `cee673c`)

| Claim in the post | Backing |
|---|---|
| Transcribes an audiobook on your phone | `longAudiobookDescription` ("Transcribing this book runs entirely on your device and can take a while. Your device may get warm and use battery") |
| Highlights each word as the narrator reads it | `notificationTranscriptReadyBody` ("word-by-word highlighting"), `engagementRaiseReadAlong` ("follow the highlighted words as the narrator reads") |
| Page reading mode; the page turns as the narration moves on | `lyricsReadingModePage` ("Page"), `lyricsReadingModePageA11y` ("Use book page reading mode"); `lib/features/player/synced_lyrics_view.dart`: the active line drives `_goToPage(_pageIndexForLine(idx))` when `lyricsAutoAlignProvider` is on, which defaults to true (`lib/core/prefs/prefs_service.dart`, `ProfileReadAlongToggleNotifier` `defaultValue = true`) |
| Free public domain audiobooks from LibriVox and the Internet Archive built in; read by volunteers | `providerLibriVoxTagline` ("Free public domain audiobooks"), `providerLibriVoxSubTagline` ("Read by volunteers from around the world"), `providerLibriVoxCatalogSize` ("~20,000 titles", stated as "thousands"), `providerInternetArchiveTagline`; `lib/core/store/librivox_provider.dart`, `internet_archive_provider.dart` |
| Import MP3, M4B, AAC, OGG, FLAC or WAV | `librarySupportedAudioFormats` ("MP3, M4B, AAC, OGG, FLAC, WAV") |
| Transcription, highlighting and the free catalogue are free | No `isPro`/entitlement check in on-device transcription (`lib/core/whisper/`), the player (`lib/features/player/`) or store import (`lib/core/store/`); `lib/features/library/new_book_route.dart` asks for Pro only when sending a book to a paired PC. Pro lists (`proWelcomeRow*`, `proTour*`) don't include read-along |
| Pro adds unlimited e-book syncs, reading insights, goals and a dictionary | `proWelcomeRowEbookTitle`/`proWelcomeRowEbookDetail` ("Unlimited syncs (beta)"), `proWelcomeInsightsTitle`/`proWelcomeInsightsBody` (insights, goal, streak), `proWelcomeRowDictTitle` ("Dictionary") |
| E-book sync with a DRM-free EPUB, PDF or TXT; e-book text highlighted instead of the transcript; beta; English narration; first sync free | `ebookErrorUnsupportedFormat` ("Choose a DRM-free EPUB, PDF or TXT file."), `readAlongTextSource` / `ebookText` / `transcribedText`, `ebookSyncBetaSubtitle` ("This beta can have timing issues"), `ebookErrorUnsupportedLanguage` ("Fast e-book sync currently supports English narration."), `ebookSyncFreeBusyTitle` ("Your first free e-book sync is already in use"), `ebookSyncProRequired`; `lib/core/ebook/ebook_sync_allowance.dart` (`freeAvailable` once, then `requiresPro`) |
| Long-press any line to play from there | `playerTapLineToJumpHint` ("You can always long-press a line to play from there.") |
| HushBook can't open Spotify audiobooks; no Spotify import | `grep -ri spotify lib` finds only two comments in `lib/core/audio/transcription_keepalive.dart` (audio-session mixing when Spotify plays at the same time); nothing in `app_en.arb`. Import sources are files, LibriVox, the Internet Archive and Audiobookshelf. `@libraryImportCantOpenType` describes copy-protected audiobooks as files HushBook can't open |
| Transcript comes from speech recognition, unusual names can be wrong | `engineDescription` (accuracy varies by engine) |

Not claimed: offline use, no ads, no account, the number of transcription languages, tap-a-line-to-jump (off by default, `lyricsTapToSeekHint`), fonts, the lamp button, desktop transcription, any Spotify integration.

## Checks run

- H1 equals `title` ✓ (the dry-run build would throw otherwise)
- `metaTitle` 43 characters (54 with " | HushBook", so the suffix renders); `metaDescription` 148 ≤ 160; `description` 225 ≤ 240 ✓
- 9 keywords, 5 takeaways, 7 FAQs; every takeaway and FAQ fact is stated in the body ✓
- No `aside` field ✓
- No en or em dashes in the post, registry entry, llms.txt line or these notes; the post is plain ASCII ✓
- Internal links (8): `/`, `can-you-read-along-with-audible`, `does-reading-along-with-an-audiobook-help`, `how-to-listen-to-audiobooks-for-free`, `abridged-vs-unabridged-audiobooks`, `/audiobook-with-text`, `free-read-along-audiobooks`, `can-libby-read-to-you` ✓
- In-memory render via `build-blog.js` with writes intercepted: embed `<figure>` in place, no markdown leaks ✓. `blog/`, `sitemap.xml`, `scripts/`, `demos/` and `assets/` untouched by this work.

## Not done (owner)

- `npm run build:blog`, tests, commit, deploy.
- Contextual links into the new post: the Spotify section of `how-to-listen-to-audiobooks-for-free` (the keyword file says it should link here), and a line in `can-you-read-along-with-audible` for Spotify listeners.
- After deploy: IndexNow ping for the post and `/blog`, Request indexing in Search Console, check People Also Ask for "can you read along with spotify audiobooks".
- Recheck in a few months: Spotify ships audiobook features often (Page Match languages, Recaps status, any audiobook text feature).
