# Notes: "How to Put Audiobooks on iPhone: From a PC, a Mac or Without iTunes"

Draft prepared 2026-10-28, built and tested locally. Not committed, pushed, deployed or pinged: the owner approves those separately. Slug: `how-to-put-audiobooks-on-iphone`. Body: about 1,850 words before "What we could not confirm" and 1,930 before the source list (9 min read). The build's `wordCount` (which includes the source list) is 2,204. Topic is backlog pick #3 of `docs/seo/keyword-research-2026-10-27.md`; not re-picked.

## Why this topic

### Search Console signal (`sc-domain:hushbook.app`, pulled 2026-10-28 via the API)
- 90 days (2026-07-29 to 2026-10-27), `query` + `page`, query matching `iphone|ios|ipad`: 20 rows. **16 of them land on `/blog/how-to-play-m4b-files`**, 39 impressions and 1 click in total, positions 6.8 to 11.0:
  - "how to listen to mpeg 4 audio on iphone" 15 @ 6.8
  - "play m4b on iphone" 5 @ 10.2
  - "m4b file iphone" 4 @ 9.8
  - "how to put m4b files on iphone" 2 @ 9.0, "how to open m4b files on iphone" 2 @ 9.5
  - one impression each: "m4b files on iphone" (1 click, @ 7), "can iphone play m4b files", "how to listen to m4b files on iphone", "how to open m4b on iphone", "how to play m4b file on iphone", "how to play m4b on iphone", "m4b file on iphone", "m4b ios", "m4b iphone", "m4b on iphone", "m4b player iphone"
  - Elsewhere: "can you read along with audible on iphone" 9 @ 10.1 (Audible post), "audiobook apps for iphone" 1 @ 9 (`/questions`).
- Same window, query matching put / transfer / add / import / upload / sync / copy / move / download / where with audiobook, M4B or MP3: only "how to put m4b files on iphone" (2 @ 9.0). The other 14 rows are synthetic persona prompts on the free-audiobooks post, not real searches.
- So Google already ranks the M4B post on page 1 for the M4B slice of "audiobooks on iPhone". The broader put / transfer / add / where cluster has no page and no impressions yet.

### Google autocomplete (curl, `client=firefox&hl=en&gl=us`, 2026-10-28, 12 seeds)
- "how to put audiobooks on iphone": **...from pc**, **...without itunes**, **...from mac**, ...with itunes, how to upload audiobooks on iphone, how to transfer audiobooks on iphone, how to import audiobook on iphone, how to put downloaded audiobooks on iphone, how to put audiobook files on iphone
- "how to transfer audiobooks to iphone": ...from pc, ...from mac, how to add audiobooks to iphone (from pc / from mac / books app), how to import audiobooks to iphone, how to move audiobooks to iphone, how to send audiobooks to iphone
- "how to add audiobooks to apple books": ...iphone, ...app, how to import audiobooks to apple books (iphone), how to transfer audiobooks to apple books, how to add downloaded audiobooks to apple books (on iphone), how to manually add audiobooks to apple books, how to add mp3 audiobook to apple books
- "where do audiobooks go on iphone": where do downloaded audiobooks go on iphone, where do itunes audiobooks go on iphone, **where do downloaded audible books go on iphone**, where do audio books save on iphone, where are audiobooks (stored) on iphone, where to find (downloaded) audiobooks on iphone
- "how to listen to downloaded audiobooks on iphone": how to listen to purchased / itunes audiobooks on iphone, how to play downloaded audiobooks on iphone, best way to listen to downloaded audiobooks on iphone, can i listen to audiobooks on my iphone
- "how to get audiobooks on iphone": free, download, buy, audible, find, amazon, kindle, downloaded
- "how to import audiobooks to iphone": copy, from pc, downloaded, **how to transfer mp3 audiobook to iphone**, how to transfer audiobook files to iphone
- "how to add mp3 to apple books on iphone": how to add mp3 to apple books, how to add pdf to books on iphone, how to add mp3 to library on iphone
- "audiobooks on iphone without itunes": how to put audiobooks on iphone without itunes, can i download audiobooks to my iphone
- "how to sync audiobooks to iphone": itunes, connect audible, from mac / macbook / windows / pc, from iphone to ipad, audible between iphone and ipad
- Empty: "how to put mp3 audiobooks on iphone", "why are my audiobooks not showing up on iphone" (the "why won't it show up" H2 is kept as a troubleshooting section; it is not a proven query).

### Competing results (WebSearch, 2026-10-28; not Google's own index)
- **"how to put audiobooks on iphone from pc"**: AOMEI (backup-utility.com, ubackup.com), Smartprix, Apple Community, AppleVis threads, WinX MediaTrans, Softorino (WALTR), emchat.
- **"where do audiobooks go on iphone"**: Apple Community threads, Macworld (two guides), iMore, Softorino, Apeaksoft, TidBITS forum, Book Riot.
- **"how to add audiobooks to apple books on iphone"**: Softorino, scrolldroll, iPhoneLife, Aiseesoft, EaseUS MobiMover.
- **"how to put audiobooks on iphone without itunes"**: Softorino, AOMEI, Wondershare MobileTrans, EaseUS, WinX, telecomdrive.
- **Verdict: medium, vendor-led.** No Apple Support page appears in any of the four result lists, and most pages sell a transfer tool. Nobody combines the free routes (iCloud Drive, USB drive, AirDrop, Safari, Finder sync) with sourced steps and the "where does it go" answer.
- **Not checked:** the live Google SERP and People Also Ask (no browser this run; Playwright belongs to another agent). H2s use the autocomplete phrasing.

### Product fit
High. HushBook imports audio files on iPhone through the system Files picker and plays them with chapters and covers, then adds word-by-word text. The post's "then play it" step lands naturally, and the "where do they go / why is it just a file in Files" pain is where HushBook is mentioned first.

### Cannibalization check
- `how-to-play-m4b-files`, H2 "How to play M4B files on iPhone and iPad": keeps the "play / open M4B on iPhone" intent (players: BookPlayer, HushBook, Mac sync). It now links to the new post for getting the file onto the phone. The new post links back for players and does not repeat the player list.
- `m4b-vs-mp3`: format choice only; linked from the new post.
- `is-librivox-safe-and-legal`: download formats line now links to the new post.
- `/m4b-player`: product page; linked from the HushBook section.
- No other page covers PC or Mac transfer, iCloud Drive, AirDrop or Finder sync.

## Sources and how each was verified

All pages opened on 2026-10-28. Apple, Libby, LibriVox and ProVideo Coalition pages were fetched with curl and read as stripped text; Audible's help center renders with JavaScript, so it was read through WebFetch. Quotes in the post are verbatim from that text, with straight quotes where the source has curly ones. No studies or DOIs are cited, so no Crossref check was needed.

| Claim in the post | Source | URL | How verified |
|---|---|---|---|
| Windows 10 or later: Apple Devices; Windows 7 or earlier: iTunes; Mac 10.15 or later: Finder; "Transferring, sharing, or syncing may be restricted for ... files protected by copyrights." | Apple, "Transfer files between your iPhone and other devices" | support.apple.com/guide/iphone/transfer-files-between-devices-iph339bafff3/ios | curl ✓ |
| USB drive or SD card, "you might need a cable adapter", drive under Locations in Files; Box or Dropbox under Locations; Keep Downloaded; "If Keep Downloaded doesn't appear in the menu, the file is already on your iPhone." | Apple, "Transfer files from iPhone to a storage device, a server, or the cloud" | .../transfer-files-iphone-a-storage-device-iphe9aff429a/ios | curl ✓ |
| iCloud Drive in Files: Browse > iCloud Drive | Apple, "Set up iCloud Drive on iPhone" | .../set-up-icloud-drive-iphbbcf8827d/ios | curl ✓ |
| Downloads in Files: Browse > Downloads; if missing, tap iCloud Drive | Apple, "Find your downloaded files on iPhone" | .../find-your-downloaded-files-on-iphone-iphc9cd7266c/ios | curl ✓ |
| Unzip: touch and hold, tap Uncompress | Apple, "Organize files and folders in Files on iPhone" | .../organize-files-and-folders-iphab82e0798/ios | curl ✓ |
| AirDrop from Finder sidebar; same Apple Account auto-accepts; "some items may be saved in the Files app"; "best for sharing a small selection of files" | Apple, "Use AirDrop to send items to nearby Apple devices" | .../use-airdrop-to-send-items-to-nearby-devices-iphcd8b9f0af/ios | curl ✓ |
| Books player: skip, chapter list, 1x speed dial, sleep timer, mini-player; "Some audiobooks refer to chapters as tracks, or don't define chapters." | Apple, "Listen to audiobooks in the Books app on iPhone" | .../listen-to-audiobooks-iphac1971248/ios | curl ✓ |
| CarPlay: open Audiobooks and select a book | Apple, "Play audiobooks with CarPlay" | .../play-audiobooks-iphb6f5ef73a/ios | curl ✓ |
| Library holds books and audiobooks "from the Book Store or manually added to Books"; collections include Audiobooks | Apple, "Read books in the Books app on iPhone" | .../read-books-iphc1af7c57/ios | curl ✓ |
| Purchases saved in Library and sorted into collections such as Audiobooks; "Apple Books isn't available in all countries or regions." | Apple, "Organize books in the Books app on iPhone" | .../organize-books-iphab219b91/ios | curl ✓ |
| Buy: Book Store or Audiobooks or Search, Buy or Get | Apple, "Buy books and audiobooks on iPhone" | .../buy-books-and-audiobooks-iphab21972d/ios | curl ✓ |
| Books on iPhone opens PDFs from other apps | Apple, "Read PDF documents in the Books app on iPhone" | .../read-pdfs-iphab2193d5/ios | curl ✓ |
| The iPhone guide's Books topics: Buy, Read, Annotate, Access on other devices, Listen, Reading goals, Organize, Read PDFs (no topic for adding audio files) | Apple, iPhone User Guide table of contents | support.apple.com/guide/iphone/welcome/ios | curl ✓, TOC scanned |
| Books on Mac: File > Import; imports "such as PDFs, mp3 audiobooks" and many EPUB books; "Some content (such as ACSM, AZW, and ODM files) can only be opened in the associated third-party app." | Apple, "Import books, audiobooks, or PDFs in Books on Mac" | support.apple.com/guide/books/import-books-audiobooks-or-pdfs-ibkseed72068/mac | curl ✓ |
| Finder sync steps: Audiobooks tab, "Sync audiobooks onto [device name]", "Selected audiobooks", Apply, eject; delete warning quote | Apple, "Sync audiobooks between your Mac and iPhone" (macOS Sequoia 15 guide) | .../mac-help/sync-audiobooks-to-your-device-mchlf764c5a4/15.0/mac/15.0 | curl ✓. The unversioned and macOS 26/27 URLs redirect to the Mac guide home |
| Current Mac guide lists "music, movies, TV shows, podcasts, books" as sync types; first sync by cable, then Wi-Fi | Apple, "Sync content between your Mac and iPhone" (current guide, macOS 27) | .../mac-help/sync-music-books-and-more-between-devices-mchlde9a31f1/mac | curl ✓ |
| "5 GB of free storage" | Apple, "What is iCloud?" | .../mac-help/what-is-icloud-mh36832/mac | curl ✓ |
| iCloud for Windows: turn on iCloud Drive; folder in File Explorer | Apple, "Set up iCloud Drive on your Windows computer" | support.apple.com/guide/icloud-windows/set-up-icloud-drive-icw0144825a5/icloud | curl ✓ |
| Drag files into iCloud Drive in the navigation pane; available on all devices with iCloud Drive | Apple, "View, add, or remove iCloud Drive files in iCloud for Windows" | .../icloud-windows/view-add-or-remove-files-icwddbc813bd/icloud | curl ✓ |
| Apple Devices > Files: apps that support file sharing; drag files; "The files are immediately transferred to the device and are available using the app." | Apple Devices User Guide for Windows, "Transfer files between your Windows device and iPhone" | support.apple.com/guide/devices-windows/transfer-files-between-your-devices-mchl4bd77d3a/windows | curl ✓ |
| Apple Devices guide has pages for music, movies, TV shows, photos and files, none for audiobooks | Apple Devices User Guide for Windows, TOC and "Intro to syncing" | .../devices-windows/welcome/windows, .../syncing-overview-mchl923c1147/windows | curl ✓, TOC scanned (also read "Sync your content between devices" and "Sync music") |
| Audible: Library, 3-dot More menu, Download; downloads "to your computer or Audible app"; no mention of Files or Apple Books | Audible Help, "Download titles" (page shows Sep 3, 2026) | help.audible.com/s/article/download-titles?language=en_US | WebFetch ✓ (JS page) |
| Audiobooks "can't be transferred to MP3 players or iPods" | Libby Help 6131 (last updated Feb 26, 2026) | help.libbyapp.com/en-us/6131.htm | curl ✓ |
| Whole-book zip of 64kbps MP3s; "Zip files can range in size from less than 100 MB to > 1GB"; "M4B formats are available for most of our books." | LibriVox, Help | librivox.org/pages/help/ | curl ✓ |
| Books on iPhone: opening a DRM-free M4B, "Nothing happens"; "has no Import or Open function either"; Mac opens it into Books | Tépper, ProVideo Coalition (July 16, 2024) | provideocoalition.com/apple-books-app-inconsistent-among-formats-platforms/ | curl ✓. Dated 2024, so the post says "A 2024 test" |

Background pages opened, not cited: Apple iPhone "Files basics", "Modify files and folders", "Find and view files and folders", "Access books on other Apple devices"; Apple "Use the Finder to share files" (support.apple.com/en-us/119585); Books on Mac "Listen to audiobooks"; iTunes for Windows "Sync iTunes content on PC", "Import media", "Intro to syncing"; Apple Devices "Sync music"; Audible Help "Devices compatible with Audible"; LibriVox wiki "How to Listen" and "How To Get LibriVox Audio Files"; Library of Congress fdd000110 (iTunes-era M4B DRM, too old to be useful).

### Claims left out
- **"MP3 audiobooks synced from a computer land in the Music app, M4B in Books."** Only in transfer-tool vendor pages (Softorino, EaseUS, AOMEI) seen as WebSearch summaries. Apple's pages say nothing about it.
- **Apple Devices for Windows syncing audiobooks into Books.** No guide page. Apple Community threads (WebSearch summaries only, not opened) report that MP3 audiobooks don't sync. Listed in the post under "What we could not confirm"; not tested.
- **iTunes for Windows audiobook steps.** Apple's iTunes guide has no audiobook page; its one audiobook line is about importing from Audible Manager. Legacy, so left out beyond "Apple keeps iTunes for Windows 7 or earlier".
- **The Finder tab name on macOS 26 and 27.** Apple's current guide lists books, not audiobooks, as a sync type and the audiobook page exists only in the macOS 15 guide. The post gives the Sequoia steps and says to check Books if there is no Audiobooks tab.
- **Where exactly an AirDropped audio file lands.** Apple says only "some items may be saved in the Files app". Not tested; in "What we could not confirm".
- **Audible AAX on Mac into Books, AudibleSync to MP3 players.** Apple's Mac import page lists "Audible audiobooks", and Audible's help mentions AudibleSync for Windows MP3 players. Neither is an iPhone route; left out to keep the Audible answer simple and accurate for iPhone.
- **Files "Open With" for audio files.** Apple documents Open With, but which apps appear depends on each app. Not used.
- **Connect to Server (SMB) from Files.** Documented by Apple but needs Windows sharing set up; cut for length.

## Product claims (`D:\hushbook\lib\l10n\app_en.arb`, app code, live site)
- Library header button tooltip `libraryImportAudiobook` "Import audiobook" (`library_screen.dart`, plus icon); add sheet title `libraryAddToLibrary` "Add to your library"; tile `libraryChooseAudioFile` "Choose an audio file" with subtitle `librarySupportedAudioFormats` "MP3, M4B, AAC, OGG, FLAC, WAV" (`add_audiobook_sheet.dart`).
- On iOS the tile opens the system document picker (`UIDocumentPickerViewController`, `ios/Runner/AppDelegate.swift`, channel `hushbook/document_access`), so files come from the Files browser (iCloud Drive, On My iPhone, Downloads, connected drives). The post says "pick it in Files".
- Several files picked at once become one book: `import_service.dart` `pickAndImportSingle()` picks with `allowMultiple: true` and sorts by `compareAudioFileNames`; `LocalAudioDraft` creates one `bookId`, with `chapterCount` = number of files (`book_info_edit_screen.dart`). In the code since the iOS 1.2.8 release commit (2026-08-13). **Flag:** `/m4b-player` says "One file per import", which now undersells the app; worth updating that page.
- `bookInfo` "Book info", `save` "Save" (import editor); `addMoreChapters` "Add More Chapters" (not used in the post).
- `longAudiobookBackground` "You can start listening as soon as the first chapter is ready, and each chapter unlocks for read-along as it finishes."
- `badgeTitleSpecialFirstImport` "My First Book" / "Imported your first local audiobook."
- Live site (index.html): "Chapters, covers, and metadata come along automatically."; "Every word lights up with the narrator. Tap any word to jump there."; "Pick a book, tap Transcribe"; "Transcribed on your phone. Never the cloud."; "Free to download, Zero Ads."; "No account, no sign-in."; "A built-in catalogue of public-domain audiobooks from LibriVox and the Internet Archive, in six languages."
- **Not claimed:** opening a file in HushBook from the iOS share sheet or Open With (`Info.plist` declares no document types), Home Screen quick action, Audiobookshelf and HushBook Desktop import routes.

## HushBook placement (bright side only)
- Intro, third paragraph: one line (imports MP3 and M4B straight from Files, highlights each word).
- "Where do audiobooks go on iPhone?": the pain line ("Files is a file manager, not an audiobook player") followed by HushBook turning the file into a book with chapters, cover art and metadata.
- "How to listen to downloaded audiobooks": three import steps and the multi-file tip.
- Closing section "Read along with the audiobooks you put on your iPhone": formats, on-phone transcription, word highlighting, free, no ads, no account, built-in classics, My First Book badge.
- Every body mention is bold, with one or two benefit phrases in bold or italics. No HushBook limitation is stated. Limits of Apple Books, Audible, Libby, iTunes and the Apple Devices app stay.
- `hero: 'read-along-card'` (existing embed), the only animation in the post, above the takeaways.
- `cta`: "Play the audiobooks you own, word by word".

## Checks run
- H1 equals `title` ✓ (the build throws otherwise)
- metaTitle 48 characters (59 with " | HushBook", so it renders with the suffix); metaDescription 153 ≤ 160; description 227 ≤ 240 ✓
- 9 keywords, 5 takeaways, 7 FAQs; every takeaway and FAQ fact is stated in the body ✓
- No en or em dashes in the post, registry entry, llms.txt line, draft files, the two edited posts or the rendered HTML (`LC_ALL=C.UTF-8 grep -P '[\x{2013}\x{2014}]'`) ✓
- Internal links in the body: `m4b-vs-mp3`, `is-librivox-safe-and-legal`, `how-to-play-m4b-files`, `/m4b-player`, `free-read-along-audiobooks`, home ✓. 2 new contextual links into the post ✓
- Rendered HTML: canonical `https://hushbook.app/blog/how-to-put-audiobooks-on-iphone`; BlogPosting + FAQPage (7 questions) + BreadcrumbList, all JSON-LD parses; read-along card iframe directly above the Key takeaways box; all 22 internal hrefs resolve to files in the repo; no markdown leaks ✓
- sitemap.xml: only the new URL and `/blog` lastmod (2026-10-27 to 2026-10-28) changed ✓
- Tests: 7 pass; `seo-preservation` (ar/index.html protected region hash) and `seo-repair-contract` (body baseline routeCount 86 !== 26) fail on the old baseline, on files this change does not touch ✓

## After publishing
1. IndexNow ping for the new post, `/blog`, `/blog/how-to-play-m4b-files` and `/blog/is-librivox-safe-and-legal`.
2. Request indexing in Search Console for `https://hushbook.app/blog/how-to-put-audiobooks-on-iphone`.
3. Check People Also Ask for "how to put audiobooks on iphone" and "where do audiobooks go on iphone" in a browser, and align FAQ wording if needed.
4. Update `/m4b-player` ("One file per import") to match the multi-file import.
