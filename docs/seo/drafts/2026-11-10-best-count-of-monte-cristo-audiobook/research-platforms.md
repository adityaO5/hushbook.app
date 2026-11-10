# Platform research: Best Count of Monte Cristo audiobook

Post slug: `best-count-of-monte-cristo-audiobook`. Researched November 10, 2026. Every claim is tagged VERIFIED (file:line in D:\hushbook or D:\hushbook.app, or a URL read November 10, 2026) or UNVERIFIED. Edition facts (narrators, translations, runtimes of commercial editions) belong to the separate edition researcher and are not checked here.

Build caveat for everything in Part A: app source is D:\hushbook HEAD `c0040d1` (2026-11-05), pubspec `version: 1.3.5+70` (D:\hushbook\pubspec.yaml:4, set in commit fc049d1 on 2026-10-29). The newest git tags are `ios-v1.2.8-build24` (2026-08-13), so the repo does not say which build is live in the stores. The tiered search described below landed 2026-10-17 (commit 663f13b), before 1.3.5+70. If the store build is 1.3.5 (70) or newer, Part A matches it; if it is older, the search details may differ. I did not query the App Store or Play Store APIs (that would send the app ID out). The owner should confirm the live version before the post goes up.

---

## PART A. HushBook facts, verified in source

### A1. How Discover searches

Discover does not call the LibriVox API. Both libraries are queried through archive.org.

- VERIFIED. Two providers, LibriVox and Internet Archive, both via `https://archive.org/advancedsearch.php`. D:\hushbook\lib\core\store\librivox_provider.dart:603-611 and D:\hushbook\lib\core\store\internet_archive_provider.dart:99-107. Provider list: D:\hushbook\lib\core\store\store_models.dart:675 (`['librivox', 'internet_archive']`).
- VERIFIED. LibriVox query base: `collection:librivoxaudio AND mediatype:audio`, then filter clauses, the search clause, and four safety clauses `-subject:erotica -subject:eroticism -subject:erotic -subject:pornography`. librivox_provider.dart:681-687, D:\hushbook\lib\core\store\content_safety.dart:45-54.
- VERIFIED. Internet Archive query base: `mediatype:audio AND collection:audio_bookspoetry AND -collection:librivoxaudio AND (format:"VBR MP3" OR format:"64Kbps MP3" OR format:"128Kbps MP3" OR format:MP3)`. internet_archive_provider.dart:198-213.
- VERIFIED. Parameters: `fl[]=identifier,title,creator,downloads,avg_rating,num_reviews,year,runtime,language,subject` (plus `description` on the second tier), `output=json`, `rows=24`, `page=N`, `sort[]=downloads desc` for the default Popular sort. librivox_provider.dart:17, 541-548, 603-611; D:\hushbook\lib\core\store\catalog_filter_queries.dart:84-97.
- VERIFIED. Default search filters: both libraries, any language, any length, all genres, Popular sort. D:\hushbook\lib\core\store\discover_rows.dart:66-72 and 87-92, store_models.dart:307-318 and 387. The search screen passes these (D:\hushbook\lib\features\store\provider_browse_screen.dart:299-305).
- VERIFIED. Search text is lowercased, split into up to 8 words, and searched in tiers. D:\hushbook\lib\core\store\search_query.dart:80-120.
  - Tier 1 (primary): every word must match `title` or `creator`. search_query.dart:122, 169-179.
  - Tier 2 (expanded): stopwords such as "of" dropped, every remaining word must match `title`, `creator`, `subject` or `description`, and tier 1 hits are excluded. search_query.dart:101-111, 16-29.
  - Tier 3 (fuzzy, `~1`): only if tiers 1 and 2 found nothing. D:\hushbook\lib\core\store\store_repository.dart:236-251.
  - Results are shown tier by tier, deduped by provider plus identifier, and within a tier the two libraries are interleaved in their downloads order. store_repository.dart:117-232, 553-589.
  - Client-side filters drop items with no identifier and anything the safety denylist hits. librivox_provider.dart:618-633.

### A2. What Discover shows for "count of monte cristo" and "monte cristo" today

Method: I rebuilt the exact queries above in a script (scratchpad `montecristo-platforms/discover.mjs`) and ran them against archive.org on November 10, 2026, with a generic User-Agent (the app sends its own UA, librivox_provider.dart:18; the results do not depend on it). Example tier 1 URL as sent:

`https://archive.org/advancedsearch.php?q=collection%3Alibrivoxaudio%20AND%20mediatype%3Aaudio%20AND%20((title%3A(count)%20OR%20creator%3A(count))%20AND%20(title%3A(of)%20OR%20creator%3A(of))%20AND%20(title%3A(monte)%20OR%20creator%3A(monte))%20AND%20(title%3A(cristo)%20OR%20creator%3A(cristo)))%20AND%20-subject%3Aerotica%20AND%20-subject%3Aeroticism%20AND%20-subject%3Aerotic%20AND%20-subject%3Apornography&fl[]=identifier&fl[]=title&fl[]=creator&fl[]=downloads&fl[]=avg_rating&fl[]=num_reviews&fl[]=year&fl[]=runtime&fl[]=language&fl[]=subject&output=json&rows=24&page=1&sort[]=downloads%20desc`

Search "count of monte cristo" (VERIFIED, live query):

| Order | Tier | archive.org item | Title shown | LibriVox project | Language | Runtime field | Recorded (publicdate) |
|---|---|---|---|---|---|---|---|
| 1 | 1 | count_monte_cristo_0711_librivox | The Count of Monte Cristo | Version 1 (LibriVox id 47) | eng | 49:43:15 | 2007 |
| 2 | 1 | count_montecristo_1308_librivox | The Count of Monte Cristo | Version 3, read by David Clarke (id 6697) | eng | 54:16:11 | 2013 |
| 3 | 1 | countofmontecristo_1303_librivox | The Count of Monte Cristo | Version 2 (id 6263) | eng | 49:48:19 | 2013 |
| 4 | 2 | comte_monte_cristo_jg_librivox | Le Comte de Monte Cristo | French, read by Jc Guan (id 1259) | fre | 51:26:35 | 2008 |
| 5 | 2 | monte-cristos_daughter_1709_librivox | Monte-Cristo's Daughter (Edmund Flagg) | not Dumas | eng | 9:37:12 | |
| 6 | 2 | edmond_dantes_1706_librivox | Edmond Dantès (Edmund Flagg) | not Dumas | eng | 9:38:15 | |

Internet Archive returned nothing for either tier.

Search "monte cristo" (VERIFIED, live query): tier 1 gives the three English versions, the French version and the two Spanish volumes `el_conde_de_monte_cristo_volumen_1_2312_librivox` (29:49:57) and `montecristovol2_2405_librivox` (25:16:04), read by Epachuko, translated by Victor Balaguer i Cirera. Tier 2 adds the two Flagg books, two LibriVox "Celebrated Crimes, Vol. 3: Mary Stuart" items, and two Internet Archive Dumas items (Le Capitaine Pamphile, Histoire de mes bêtes).

Cross-check against the LibriVox API (`https://librivox.org/api/feed/audiobooks/?author=Dumas&format=json&limit=500`), VERIFIED: LibriVox lists exactly these Monte Cristo projects: Version 1 (id 47, 49:43:15, 128 sections), French (id 1259), Version 2 (id 6263, 49:48:19, 120 sections), Version 3 (id 6697, 54:16:11, 117 sections), a "version 4 Dramatic Reading" (id 9845, no total time and no catalog URL, so not finished and not on archive.org), and the two Spanish volumes. Catalog pages: https://librivox.org/the-count-of-monte-cristo-by-alexandre-dumas/ , https://librivox.org/the-count-of-monte-cristo-by-alexandre-dumas-2/ , https://librivox.org/the-count-of-monte-cristo-version-3-by-alexandre-dumas/ , https://librivox.org/le-comte-de-monte-cristo-by-alexandre-dumas/ .

Verdict for the post: it may say "the free LibriVox recordings of The Count of Monte Cristo are in HushBook's Discover tab" (VERIFIED for source HEAD and live archive.org data; see the build caveat at the top). Things the post must not imply:

- The three English versions all show the same title, "The Count of Monte Cristo" by Alexandre Dumas, with no "version 1/2/3" label. A reader tells them apart by length and recorded year (VERIFIED: titles come straight from archive.org `title`, librivox_provider.dart:662-679).
- Discover will most likely not name David Clarke. The reader line is built only from per-file `artist` tags (librivox_provider.dart:365-376, D:\hushbook\lib\core\store\reader_credit.dart:31-46). On all three English items those tags name the author, so Versions 2 and 3 should read "Reader not listed" (app_en.arb:7617). Version 1 has 7 garbled tags and 1 misspelled "Alexabdre Dumas", which the code would read as two different readers, so it should read "Several readers" (app_en.arb:7885). Derived from code plus live metadata, not observed on a device. UNVERIFIED on screen.
- Version 1 is messy inside HushBook. Its archive.org item holds 9 alternate chapter readings ("025alt", "026alt", "031alt", "032alt", "033alt", "043alt", "044alt", "045alt", "094alt"; the item description says "This book contains alternate versions of a number of chapters", https://archive.org/details/count_monte_cristo_0711_librivox). The app keeps one file per file-name stem and orders by track tag (librivox_provider.dart:272-332), so a Discover download of Version 1 gets 128 chapters, alternates included, and some land out of place, for example "025alt - The Unknown" right after "013 - The Hundred Days", and "094alt - Maximilian's Avowal" between chapters 101 and 102. Simulated with the app's logic on live metadata (scratchpad `order.mjs`), not observed on a device. Versions 2 (120 chapters) and 3 (117 chapters) come out in clean file order. Recommendation: in the HushBook mention, point readers to Version 3 (David Clarke) or Version 2, or say nothing about Version 1 inside HushBook.

### A3. After download

- VERIFIED. Discover downloads each chapter's MP3, preferring the 64 kbps file over 128 kbps and VBR. librivox_provider.dart:454-461, D:\hushbook\lib\core\store\store_import_service.dart:227-270.
- VERIFIED. Multi-file books are joined into one MP3 with chapter markers kept (title per chapter from the file tags). store_import_service.dart:296-305 and 339-365; stream copy, no re-encode, when the files are compatible: D:\hushbook\lib\core\audio\audio_ingest_service.dart:704-717. So Version 3 becomes one book with 117 chapters, Version 2 with 120.
- VERIFIED. A second tap on a book already in the library does not download it again. store_import_service.dart:174-191.
- VERIFIED. Transcription starts by itself by default. The setting "Transcribe new books" has three choices: "On this phone" ("Starts on this phone as soon as a book is added."), "On my PC" (Pro), "Don't start automatically" (app_en.arb:6489-6537). With no stored choice the default is phone: D:\hushbook\lib\core\prefs\new_book_transcription.dart:34-41; routing D:\hushbook\lib\features\library\new_book_route.dart:88-94, 149-155; the job is queued in D:\hushbook\lib\features\library\post_import_processing_dispatcher.dart:120-128; store downloads pass through this route, store_import_service.dart:375-402.
- VERIFIED (site copy). "On the phone, each chapter is ready to read the moment it finishes." D:\hushbook.app\index.html:1027. Engine is "thermal-aware" and "resumes automatically if a long transcription is interrupted" (index.html:684).
- VERIFIED. Default engine is the multilingual one (Universal), so the French and Spanish recordings transcribe without changing settings. D:\hushbook\lib\core\prefs\prefs_service.dart:565-571; engines D:\hushbook\lib\core\whisper\model_manager.dart:17-57. Matching site wording: D:\hushbook.app\content\blog\learn-german-with-audiobooks.md:150.
- VERIFIED. Discover offers a 30-second sample before download. D:\hushbook\lib\features\store\discover_samples.dart:16, D:\hushbook\lib\core\audio\sample_preview.dart:10.

### A4. Read-along

- VERIFIED (site copy, matches code). "Words fill in as the narrator reads them, with a red underline on the current one. Long-press any line to play from there." index.html:1033.
- VERIFIED. Long-press a line plays from there, confirmed with "Playing from here" (app_en.arb:8633). "Tap a line to jump there" is a switch, off by default: D:\hushbook\lib\core\prefs\prefs_service.dart:1024-1033; label and hint "You can always long-press a line to play from there." app_en.arb:8453-8458.
- VERIFIED. Reading mode defaults to Page ("Turn pages like a book", app_en.arb:12-13; default prefs_service.dart:1479 and 1558). The view follows the narrator on its own unless the reader pages away (auto-follow on by default, prefs_service.dart:1036-1043; D:\hushbook\lib\features\player\synced_lyrics_view.dart:1508-1510). Safe wording: "the page keeps up with the narrator". Avoid promising a specific page-turn animation.
- VERIFIED. Speed: presets 0.5x, 0.75x, 1x, 1.25x, 1.5x, 1.75x, 2x, 2.5x, 3x, plus a stepper in 0.05x steps within 0.5x to 3x. D:\hushbook\lib\features\player\widgets\playback_speed_sheet.dart:25-53.
- VERIFIED. Sleep timer: a set duration (presets or custom) or end of chapter, with a fade-out. D:\hushbook\lib\core\audio\sleep_timer.dart:13, 107-131; "Fading out" app_en.arb:8629.
- VERIFIED. Marks: "Mark: highlight, note or quote" (app_en.arb:8753); "Saved quotes & bookmarks" (app_en.arb:1071).
- VERIFIED. Works offline after the one-time engine download. index.html:753-757 ("Does HushBook work offline?").

### A5. Character map (for the "50 hours, dozens of characters" mention)

- VERIFIED. On each book's Characters tab. No Pro check anywhere in D:\hushbook\lib\features\characters (grep for entitlement, isPro and ProGate finds nothing), so it is free. Site already says "It is free, with no Pro upgrade needed": D:\hushbook.app\content\blog\how-to-keep-track-of-characters-in-a-book.md:50.
- VERIFIED. If the book is playing when you add a character, it records "First heard" as chapter and time, shown as "Ch. {chapter} · {time}". D:\hushbook\lib\features\characters\data\first_heard.dart:6-32, app_en.arb:2160-2161.
- VERIFIED. Typed ties between characters, a Cast list with a search box once there are 8 or more (D:\hushbook\lib\features\characters\canvas\cast_sheet.dart:72), share as image or cast summary text (app_en.arb:755-758).
- VERIFIED. Characters are added by hand. The string "Transcript suggestions become available after transcription." exists (app_en.arb:1069) but no Dart code uses it, so there is no automatic character detection. Do not claim it.

### A6. "When you'll finish" estimate

- VERIFIED. Free, on the book's analytics page: "Free: where you are and when you'd finish", the rest is behind Pro. D:\hushbook\lib\features\analytics\book_analytics_body.dart:62-69.
- VERIFIED. Wording: "About {left} left at {speed}x." (app_en.arb:9176), "At about {pace} a day, you'll finish around {date}." (3815), and for long books "{left} left. At about {pace} a day, that's more than six months away." (3836). It needs history first: "Listen on 3 different days in the next two weeks and we'll estimate when you'll finish." (3874).

### A7. Import, platforms, privacy, free vs Pro

- VERIFIED. Import formats: mp3, m4a, m4b, aac, wav, flac, ogg, opus, oga, aiff, aif, caf, wma, mka, alac (plus webm on Android). D:\hushbook\lib\core\audio\supported_audio_formats.dart:6-28. Site: index.html:668 (same list; several files become one book, chapters inside M4B detected).
- VERIFIED. Platforms: iPhone and Android (store links index.html:130-131); Windows 10 or 11, 64-bit desktop app, free, Mac "Coming soon" (D:\hushbook.app\desktop.html:25, 330-334, 347). Desktop has its own free public-domain library and imports MP3 and M4B (desktop.html:431-433).
- VERIFIED. Privacy: "Transcription runs on-device. There is no account and no cloud upload of your audio." D:\hushbook.app\llms.txt:3. Desktop: "Nothing is uploaded. There is no server and no account." desktop.html:347-350.
- VERIFIED. Free: read-along, Discover library, import, on-phone transcription, character map, per-book finish estimate, desktop app with unlimited PC transcription ("Free and unlimited. No cap on books or hours." desktop.html:347). index.html:676: "The core read-along experience and the public-domain library are free."
- VERIFIED. Pro: the Trends tabs and the rest of book analytics (D:\hushbook\lib\features\trends\trends_screen.dart:248-251, book_analytics_body.dart:66-69), unlimited e-book syncs, Audiobookshelf progress sync, Dictionary, Pro covers and icons (app_en.arb:2363-2370), and sending a book to the PC ("Transcribe on my PC"), which needs Pro (new_book_route.dart:172-174; index.html:1021; desktop.html:420 "Pro is bought in the phone app, and the paired PC has it too.").
- VERIFIED, optional. E-book sync: attach a "matching, DRM-free EPUB, PDF or TXT" (app_en.arb:2113) and the e-book's own text is highlighted. Limits: "Use the same unabridged edition with English narration. Sync is in beta; processing takes time and highlight timing can vary." (app_en.arb:2114). First sync free, then Pro (D:\hushbook\lib\core\ebook\ebook_sync_allowance.dart:6-36; site wording "your first sync is free", content\blog\can-you-read-along-with-spotify-audiobooks.md:77). This is the one route to correctly spelled names, but only if the e-book is the same translation the narrator reads. UNVERIFIED which text each LibriVox version reads (edition researcher should confirm before the post suggests pairing a Project Gutenberg text).

### A8. Limits to state

- DRM. VERIFIED app behaviour: protected audio is refused with "This audio is DRM-protected and cannot be imported." D:\hushbook\lib\core\audio\audio_ingest_service.dart:376-382. Site wording to reuse:
  - "HushBook cannot open Kindle books or Audible audiobooks, which are protected by DRM." content\blog\immersion-reading-kindle-paperwhite.md:258
  - "M4B files with DRM, such as many store purchases, cannot be imported as ordinary files." m4b-player.html:39
  - "It cannot import Audible, Libby or Spotify books" content\blog\why-cant-i-focus-on-reading.md:175
  - "You own audiobooks from any store, in files without DRM." content\blog\can-kindle-read-to-you.md:143
- Names. VERIFIED site wording: "Its text is a speech-recognition transcript, not the publisher's ebook, so names and invented words can come out wrong." immersion-reading-kindle-paperwhite.md:258; "speech recognition can garble unusual names" why-cant-i-focus-on-reading.md:175. For this book: Dantès, Villefort, Mercédès, Haydée, Danglars, Fernand Mondego, Abbé Faria can come out misspelled. Not tested on these recordings.
- Phone transcription time for a 50-hour book: no basis in source or site. Do not claim a number. Safe: "a book this long takes a while to transcribe on a phone; each chapter is readable as soon as it is done" (index.html:660 "The first pass on a long book takes a while", index.html:1027).
- PC transcription time: the only measured figure is a GTX 1650 at "13 × real time", "A 10 hour book takes about 45 min" (desktop.html:369-377; the script comment at desktop.html:544-552 says only that row is measured, the others are estimates). By arithmetic a 54-hour recording would take about 4 hours on that card. This is an extrapolation; if used, say "on a GTX 1650-class card" and keep it approximate, or leave it out.
- Storage. VERIFIED from archive.org file sizes of exactly the files the app downloads (64 kbps MP3s, summed as in librivox_provider.dart:380-390):
  - Version 3, David Clarke: 1,563,613,184 bytes, about 1.56 GB (https://archive.org/metadata/count_montecristo_1308_librivox)
  - Version 2: 1,434,966,016 bytes, about 1.43 GB (https://archive.org/metadata/countofmontecristo_1303_librivox)
  - Version 1: 1,592,889,870 bytes, about 1.59 GB, alternates included (https://archive.org/metadata/count_monte_cristo_0711_librivox)
  - French: about 1.48 GB (https://archive.org/metadata/comte_monte_cristo_jg_librivox)
  - Safe wording: "about 1.5 GB on your phone". During the download the chapter files and the joined copy exist at the same time (temp folder deleted after success, store_import_service.dart:442-457), so free space needed while importing is higher. No exact peak figure.

### A9. DO NOT CLAIM

1. That Discover shows "Version 1/2/3" labels or names David Clarke as reader (A2).
2. That Version 1 plays in clean chapter order inside HushBook (A2).
3. Any phone transcription time for this book (A8).
4. That HushBook finds or suggests characters automatically (A5).
5. That names will be spelled right in the transcript (A8).
6. That HushBook opens Audible AAX/AAXC, Kindle, Libby, hoopla, Spotify, Chirp, Kobo or Apple Books purchases, or Google Play audiobooks that cannot be exported (A8, Part B).
7. That "Transcribe on my PC" is free (it is Pro); that a Mac desktop app exists (Coming soon).
8. That e-book sync works for French or Spanish narration, is unlimited for free users, or is out of beta (A7).
9. That the finish estimate is Pro, or that it shows from the first session (A6).
10. An exact storage figure beyond "about 1.5 GB", or that no extra space is needed while importing (A8).
11. That the post's Discover results match the store build exactly, until the owner confirms the live version (top caveat).
12. "117 chapters" as a general HushBook fact: true for Version 3 only (Version 2: 120, Version 1: 128 with alternates).

---

## PART B. Where to buy an audiobook you keep

All read November 10, 2026. "Any player" means a file you can play outside the store's own app.

| Store | File that plays in any player? | Supporting sentence (store's own page) | URL | Status |
|---|---|---|---|---|
| Libro.fm | Yes | "You can download the zipped folder(s) containing the DRM-free files (MP3s or M4B format) directly to your computer and import these files into your media player of choice." M4B option gives "a single audio file that contains your entire audiobook". | https://support.libro.fm/support/solutions/articles/48000695426-how-do-i-download-audiobook-files-to-listen-on-my-computer- (modified 28 Apr 2026) | VERIFIED. Note: libro.fm main site returns 403 to automated fetches, so I could not check its Monte Cristo listings. |
| Downpour | Mostly yes, check each title | "While much of Downpour's content is DRM free which allows for usage across platforms, select products on Downpour are required by publishers to have DRM protected files. These products will be playable exclusively on the Downpour.com apps". After cancelling: "Your library titles will always be available." | https://www.downpour.com/kbase | VERIFIED. File format (MP3 or M4B) not stated on the FAQ: UNVERIFIED. |
| Naxos AudioBooks (direct) | No direct download sale found | The Naxos product page for the unabridged Count of Monte Cristo (Bill Homewood) shows "Listen to this title on Audible", "Listen to this title on Spotify", "Listen to this title on Naxos Spoken Word Library" and "Buy CD on Downpour", with no buy-download button. The "Download Shop / FAQs / How It Works" menu is commented out in the page HTML, and /frequently-asked-questions/ and /how-it-works/ return 404. | https://naxosaudiobooks.com/count-of-monte-cristo-the-unabridged/ | VERIFIED that no direct download sale is offered on the page today. Older Naxos blog posts describe a DRM-free MP3/M4B shop; treat it as closed. Do not write "buy the DRM-free download from Naxos". |
| Chirp | No | "Chirp offers digital audiobooks that can be listened to on our site or in our app." "You can stream directly or download for later!" (in the app); browser streaming on a computer; Alexa skill. | https://www.chirpbooks.com/how-to-listen | VERIFIED for app, browser and Alexa only. The help-center article saying they "aren't available on CD or as MP3 files" (chirpbooks.zendesk.com/hc/en-us/articles/15546345177620) sits behind a Cloudflare check: UNVERIFIED. |
| Kobo | No (no export described) | "You can listen to your audiobook in the Kobo App for Android or iOS through your device's speakers or with headphones." "Some Kobo eReaders can play audiobooks via Bluetooth." "Audiobooks are not available on the Kobo Desktop app." Kobo's export page covers only EPUB and PDF. | https://help.kobo.com/hc/en-us/articles/360018108653-Audiobooks-overview-How-to-listen-to-audiobooks ; https://help.kobo.com/hc/en-us/articles/360019527954 | VERIFIED. That audiobook files cannot be exported at all: UNVERIFIED (not stated either way). |
| Google Play Books | Sometimes; format not stated | On a computer: "From the book you want to download, click" More, then Export. "Some audiobooks are not available for export." Check "Export option" under "Additional information" on the book's page. | https://support.google.com/googleplay/answer/7572879?hl=en&co=GENIE.Platform%3DDesktop | VERIFIED that export exists for some titles. Exported file format and DRM status: UNVERIFIED. |
| Apple Books | No (tied to Apple Account) | Purchases download in the Books app when "signed in to the same Apple Account"; "You can authorize up to five computers and up to ten iOS devices and iPadOS devices". No export is described. | https://support.apple.com/guide/books/download-purchased-and-updated-items-ibks888f2d84/mac ; https://support.apple.com/guide/books/authorize-your-mac-ibks6aaae2e7/mac | VERIFIED (authorization and no export). Apple's pages do not use the word DRM; that the files will not play elsewhere is UNVERIFIED on Apple's own page (the site's M4B post cites the Library of Congress for it, content\blog\how-to-play-m4b-files.md:50). |
| Spotify | No | Unlocking: "this content is not being sold or transferred to you. Spotify and its partners retain ownership of the Audiobook content even after you unlock or access it." Downloads are in the app: "You can download the audiobook to listen to it offline, available on both Premium and free." Premium hours: counted "at normal speed", so speeding up does not save hours; "unused audiobook listening time expires on a monthly basis"; when it runs out, "You won't be able to listen to audiobooks from the subscriber catalog until you replenish your listening time." | https://support.spotify.com/us/article/audiobooks-purchase/ ; https://support.spotify.com/us/article/audiobooks-premium-plans/ | VERIFIED. The monthly number of hours is not on these pages today ("varies per country"). An existing post states "15 hours/month" for the US (content\blog\how-to-listen-to-audiobooks-for-free.md:69, checked October 2026); re-check before reusing. |
| Audible | No (Audible apps, AudibleSync to supported devices, Apple Books on Mac after authorizing) | Formats: "AA and AAX (Audible Enhanced Audiobook): Formats specifically created by Audible for audiobook files." Windows: "Downloading titles using AudibleSync will save them to your computer but can only be played by transferring them to a compatible MP3 player or accessibility device." "You can only download titles you've purchased with an Audible credit or a credit card to your computer." After cancelling: "You can listen to titles you purchased with a credit or a credit/debit card anytime. They're yours to keep and will always be available in your Library whether you're a current member or not." But "you'll lose access to any included titles you've downloaded the included catalog, and these titles will be locked." Unused credits are lost: "Audible Premium members will lose access to all unused credits". | https://www.audible.com/ep/what-is-an-audiobook ; https://www.audible.com/help/article/listen-with-audiblesync ; https://www.audible.com/help/article/download-titles ; https://www.audible.com/help/article/cancel-membership (US pages need `?ipRedirectOverride=true` from outside the US) | VERIFIED. Audible's pages do not use the words "DRM" or "AAXC"; "AAXC" is UNVERIFIED on Audible's own pages, so write "Audible's own AA and AAX formats". Apple's authorize page confirms Books on Mac can play Audible downloads after authorizing. |
| Libby | No (loan) | "Titles are automatically returned to the library on their due dates. When they're returned, they're also removed from your Shelf and deleted from your device (if downloaded)." "Audiobooks in Libby can't be transferred to MP3 players or iPods." | https://help.libbyapp.com/en-us/6033.htm ; https://help.libbyapp.com/en-us/6131.htm | VERIFIED |
| hoopla | No (loan) | "Most Audiobooks, Comics, and eBooks are available for 21 days from the time you borrow the title." "Titles on the Windows and MacOS platforms are only available for streaming. If you wish to download a title, you can do so on any of our three mobile apps (Android, iOS, Kindle)". | https://www.hoopladigital.com/faq | VERIFIED |

Angles that suit this book: a 21-day hoopla loan of a roughly 50-hour recording means about 2.5 hours a day to finish (arithmetic). Spotify counts Premium hours at normal speed, so a 50-hour book uses 50 hours of allowance whatever speed you play it at (VERIFIED rule, Spotify page above).

---

## PART C. The competition

### C1. Search results (WebSearch, US, November 10, 2026; DuckDuckGo HTML returned HTTP 202 bot pages to scripts, so not used)

All four queries ("best count of monte cristo audiobook", "best audiobook version of the count of monte cristo", "count of monte cristo audiobook length", "count of monte cristo audiobook unabridged") return mostly retail pages:

- Audible product pages and mirrors (apx-security-*, origin-www.audible.*, stories.audible.com) for Bill Homewood, John Lee, B.J. Harrison Classic Tales, AmazonClassics/Guy Mott, Andrew Timothy, Orson Welles radio play. Retail, years vary.
- Apple Books (books.apple.com/us/audiobook/id331226143), audiobooks.com (Version 3 David Clarke listing), audiobooksnow.com (several editions), ElevenReader, Everand, lismio.app. Retail.
- naxosaudiobooks.com product page (Homewood, unabridged). Publisher.
- archive.org LibriVox items and librivox.app pages. Free source.
- presentationbuilder.internationaltrucks.com/count-monte-cristo-audiobook. Spam.
- Editorial: Modern Mrs Darcy book page (modernmrsdarcy.com/?p=42954, undated, footer 2026); Pop Culture Lunchbox Substack (June 12, 2024); Books of Brilliance translation guide (November 3, 2026); thetestedhub.com/?p=12583 buying guide (geo-blocked to my fetch, HTTP 403 "Not available in your region"; known only from search snippets).

No result is a page that compares every unabridged edition with free versions, runtimes, translation and where you can keep the file.

### C2. The strongest non-forum pages

1. Books of Brilliance, "Which Translation of The Count of Monte Cristo Should You Read?" (https://booksofbrilliance.com/2026/11/03/the-count-of-monte-cristo-best-translation/, Nov 3, 2026). Covers print translations: Robin Buss (Penguin), revised Oxford, Project Gutenberg ebook 1184, Lowell Bair's abridged Bantam, Wordsworth, and how to tell if a copy is abridged. Misses: audiobooks almost entirely (only "check the listing for translator, narrator and abridgment"), no runtimes, no LibriVox, no DRM or where to buy, no listening tips.
2. Modern Mrs Darcy book page (https://modernmrsdarcy.com/?p=42954). One recommendation: John Lee, about 47 hours, via a Libro.fm link; the writer looked things up on SparkNotes several times. Misses: comparison, other narrators, free versions, translation, abridged warnings.
3. Pop Culture Lunchbox, "The Count of Monte Cristo is a tour de force of reading adventure" (https://popculturelunchbox.substack.com/p/the-count-of-monte-cristo-is-a-tour, June 12, 2024). Compares a short Naxos abridgement (on hoopla) with the unabridged recording and rates both. Misses: narrator names, translation, free options, where to buy.
4. thetestedhub.com buying guide (UNVERIFIED, snippets only): reportedly lists Homewood and John Lee and gives a wrong runtime range of over 100 hours, and credits the Buss translation to the Naxos edition. Could not load it to confirm.
5. Retail listings (Audible, audiobooksnow) carry the only reader reviews. They answer "how long" per edition but never compare.

Gap the post can own: one table of every unabridged English recording with runtime, translation, price model and whether you keep a file; the three LibriVox versions told apart (they all carry the same title); abridged traps; and a straight answer on which to pick.

### C3. Question phrasings (Google and DuckDuckGo autocomplete, November 10, 2026; People Also Ask not obtainable)

- how long is the count of monte cristo audiobook / how many hours is the count of monte cristo audiobook / how long is the unabridged count of monte cristo audiobook / how long is it on audible / on spotify / abridged
- best count of monte cristo audiobook narrator / reddit / version / free / on spotify / best unabridged count of monte cristo audiobook / best audiobook reading of the count of monte cristo
- which count of monte cristo audiobook is best / which audiobook version of the count of monte cristo is best / count of monte cristo audiobook which language
- count of monte cristo audiobook john lee / bill homewood / penguin classics / youtube / unabridged / narrator
- is the count of monte cristo hard to read / hard to follow / hard to get into / hard to read in english / in french
- count of monte cristo abridged or unabridged reddit / abridged or not / abridged vs original / penguin classics abridged or unabridged / translated and abridged by lowell bair / should i read the count of monte cristo abridged or unabridged
- count of monte cristo audiobook free / librivox / pdf / download
- Earlier data (lane-books dump.txt lines 47-54): "should i read or listen to the count of monte cristo", "the count of monte cristo audiobook vs book", "bill homewood free", "john lee free".

### C4. What Reddit listeners want (thread titles only, all-montecristo-audio.xml, 27 entries, 2012 to 2026)

- The biggest single theme: an audiobook of the Robin Buss (Penguin) translation. At least nine threads from 2014 to 2023 ask whether one exists. Titles from July and November 2026 say Penguin Classics has set a release date and opened preorders. UNVERIFIED here; the edition researcher should confirm the date and narrator, since this changes the "best version" answer.
- Which narrator or version is best (2014 thread, a 2025 poll).
- Whether the book works on audio at all, and paperback or audiobook for a first read (2016).
- Difficulty: "most difficult audiobook to digest" (2023).
- Identifying which translation a given recording uses (2014).
- One-offs: wanting a reader with a French accent (2012), free audiobook posts and deal spam.

---

## PART D. Internal links

### D1. Links from the new post (6)

1. `/blog/how-long-is-an-audiobook`: in the runtime section. Anchor: "how long audiobooks run". Must stay consistent (see D3).
2. `/blog/abridged-vs-unabridged-audiobooks`: at the abridged-edition warning. Anchor: "abridged vs unabridged audiobooks".
3. `/blog/how-to-keep-track-of-characters-in-a-book`: at HushBook mention 2 (dozens of characters). Anchor: "keep track of characters".
4. `/blog/is-librivox-safe-and-legal`: at HushBook mention 1 (free LibriVox versions). Anchor: "LibriVox is free and legal".
5. `/blog/audiobook-listening-speed`: where 50 hours at 1.25x or 1.5x comes up. Anchor: "what speed to listen at".
6. `/blog/how-to-play-m4b-files` (or `/blog/m4b-vs-mp3`): at HushBook mention 3 (DRM-free MP3 or M4B from Libro.fm). Anchor: "play an M4B file".

Spare: `/blog/how-to-read-classics-without-getting-bored` (if the post covers "is it hard to get into"), `/blog/best-librivox-app`.

### D2. Links to the new post from existing posts (3)

1. D:\hushbook.app\content\blog\how-long-is-an-audiobook.md:63. Current: "**The narrator.** Our ten readers ranged from 131 to 179 words a minute. On LibriVox, different recordings of the same book often differ by 10% or more. *The Count of Monte Cristo* runs from about 50 to 54 hours depending on the version." Proposed sentence to append: "We compare every unabridged recording of it in [the best Count of Monte Cristo audiobook](/blog/best-count-of-monte-cristo-audiobook)."
2. D:\hushbook.app\content\blog\abridged-vs-unabridged-audiobooks.md:30. Current: "Abridged editions make sense in a few situations: a long non-fiction book where you only want the main argument, a classic you want to sample before committing to 40 hours, or a young listener who'd struggle with the full text. Just know what you're getting." Proposed sentence to append: "For *The Count of Monte Cristo*, which is sold both ways, our [guide to its audiobook editions](/blog/best-count-of-monte-cristo-audiobook) separates the complete recordings from the cut ones."
3. D:\hushbook.app\content\blog\how-to-read-classics-without-getting-bored.md:55. Current bullet: "**Pick the narrator.** LibriVox readers are volunteers and quality varies, so prefer a solo recording and play the first chapter. More in [is LibriVox safe and legal](/blog/is-librivox-safe-and-legal)." Proposed sentence to append: "For a long classic, see how [the recordings of *The Count of Monte Cristo*](/blog/best-count-of-monte-cristo-audiobook) compare."

### D3. Existing Monte Cristo facts the new post must match

grep of content\blog and data\blog-posts.js finds only how-long-is-an-audiobook.md:

- Line 35: "*The Count of Monte Cristo*: 459,752 words, 54 hours 16 minutes (141 words a minute)". This is the David Clarke recording (Version 3), and the list is introduced as "solo LibriVox recordings" (line 27). Live data agrees: archive.org runtime 54:16:11, LibriVox API 54:16:11.
- Line 63: "*The Count of Monte Cristo* runs from about 50 to 54 hours depending on the version." Live data agrees: Versions 1 and 2 are 49:43:15 and 49:48:19, Version 3 is 54:16:11.
- Line 90: source link https://librivox.org/the-count-of-monte-cristo-version-3-by-alexandre-dumas/ labelled "read by David Clarke".
- Trap: the Version 1 files add up to about 55.3 hours because of the alternate chapters. Use LibriVox's 49:43:15, never the file sum.

No Monte Cristo entry exists in data\blog-posts.js.
