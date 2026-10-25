# Notes: "Can Libby Read to You? Read Aloud, Read-Alongs and Audiobooks"

Draft prepared 2026-10-25, built and tested locally. Not committed, pushed, deployed or pinged: the owner approves those separately. Slug: `can-libby-read-to-you`. Body: about 1,970 words before the source list (9 min read, in line with the kids post at 1,927 words). The build's `wordCount` (which includes the source list) is 2,314.

## Why this topic

### Search Console signal (`sc-domain:hushbook.app`, pulled 2026-10-25 via the API)
- 90 days (2026-07-27 to 2026-10-24), `query` + `page`: 635 rows, 525 after dropping brand ("hushbook" and typos) and Pocket FM rows. As in the last three runs, no query cluster has a large impression count without a page.
- **The pattern this post follows.** The site's second-strongest blog page is the "read along with [app]" post: `/blog/can-you-read-along-with-audible` had 105 query rows, 369 impressions and 1 click, at an impression-weighted position of 8.2. Google already places the site for "can you read along with [service]" questions. Generic variants land there too: "can you read along with audiobooks" (1, position 11), "can i read along with audiobooks" (1, position 6), "can you listen to an audiobook and read at the same time" (1, position 11). Libby is the next service people ask this about (autocomplete below), and the site has no page for it.
- **Library intent ranks poorly.** "audiobook library" (3 impressions, position 42), "audiobooks library" (2, 27.5), "free audiobook library" (2, 24), "rent audiobooks" (2, 34), "rent audiobooks from library" (1, 37), "audio books library free" (1, 41), all on `/blog/how-to-listen-to-audiobooks-for-free`.
- 16 months (2025-06-25 to 2026-10-24), filtered on `libby|classic|spotify|kindle|read aloud|read to me|focus on reading|concentrate|rereading|zone out|hoopla|text to speech|tts`: 7 rows, none about Libby. Closest: "kindle read along with audible" (3, position 10) and "kindle assistive reader change voice" (1, position 9, on the immersive reading post).
- So the evidence is autocomplete plus a weak SERP (below), with Search Console showing that the "read along with [app]" pattern works for this site and that Libby is not covered.

### Google autocomplete (curl, `client=firefox&hl=en&gl=us`, 2026-10-25)
- "can libby read to you": can libby read books to you, can libby app read to you, can libby read ebooks to you, can you make libby read to you, can you have libby read to you, does libby read books to you, does libby read to you, does the libby app read to you, can libby read aloud
- "how to make libby read": **how to make libby read aloud**, how to make libby read to you, how to make libby read out loud, how to make libby read to me, how to have libby app read aloud, **how to get libby to read aloud on iphone**, how to get libby to read, **how to have siri read libby books**, how do you get libby to read to you
- "libby read aloud": libby read aloud android, libby read aloud mode, libby read aloud iphone, libby read aloud books, libby read along books, libby read along, libby read out loud, libby read to me, can libby read aloud
- "libby text to speech": libby text to speech android, libby text to speech iphone, libby text to speech ios, libby app text to speech, libby ebook text to speech, libby text to voice
- "libby read along" / "libby read alongs": libby read along books, libby read aloud, libby app read along, **libby audiobooks read along**, **does libby have read along books**, read along books for kids libby, read along audio books libby
- "can you read along with libby": **can you read along with libby audiobooks**, can you read books on the libby app, how to read with libby
- "does libby have read along": does libby have read along books, **does libby have read along audiobooks**, does libby have read aloud, does libby have a read aloud option
- "libby sync": libby sync between devices, libby sync to kobo, **libby sync audiobook and ebook**
- "libby ebook and audiobook": libby ebook to audiobook, libby sync audiobook and ebook, can you listen to libby audiobooks on kindle, can libby books be used on kindle
- "libby read to me": can libby read to me, libby app read to me, can i have libby read to me, how do i make libby read to me, will libby read a book to me
- "libby voiceover" / "libby talkback": can libby read aloud, how do i get libby to read aloud

### Competing results (WebSearch, 2026-10-25; not Google's own index)
- **"can libby read books aloud to you"**: two Tuscaloosa library pages, OverDrive's "What is the Libby app?", a White Plains library tag page, the App Store listing (three copies), Lake County library pages, Halifax library. None answers the read-aloud question directly.
- **"can you read along with libby audiobooks"**: library blog posts (Metropolitan Library, Athol, Knox County), OverDrive's read-alongs page, an APKMirror changelog. They describe kids' read-alongs only; none says plainly that ordinary audiobooks have no text, or what to do instead.
- **"libby read aloud iphone"**: App Store, NNELS (2023), AppleVis, a Pratt student design blog, an AI-generated page on onrender.com. **None quotes Libby's own rule that iPhone users need VoiceOver, not Spoken Content.**
- **Verdict:** a weak, scattered SERP. Library pages, app listings and accessibility forums. No page puts the three routes (audiobook, read-alongs, screen reader) and the Kindle option together with sourced steps.
- **Not checked:** the live Google SERP and People Also Ask. No browser was available to this run (Playwright belongs to another agent). H2s use the autocomplete phrasing instead: "can libby read to you", "does libby have read along books", "can you read along with a libby audiobook", "how to make libby read aloud on iphone / android", "can kindle read libby books aloud". Check PAA in a browser later and align one or two FAQs if the wording differs.

### Product fit
Strong on the read-along side, honest on the read-aloud side. Reading along with a whole audiobook is HushBook's core, and Libby's answer for adults is "you can't, except by hand". People who ask "can Libby read to me" often want a narrated book with the words on screen. HushBook does not do text-to-speech, cannot open Libby loans, and the post says both. The CTA points to what HushBook does do: free public domain classics and audio files you own, with each word highlighted.

### Cannibalization check
- `how-to-listen-to-audiobooks-for-free`, H2 "1. Libby (with a library card)": about 120 words on borrowing, loan periods and holds. Intent: "where do I get free audiobooks". It now links to the new post from its "Audiobooks play inside Libby" bullet.
- `can-you-read-along-with-audible`: Audible and Kindle Read & Listen only. It now links to the new post for library books.
- `are-audiobooks-good-for-kids`, `is-librivox-safe-and-legal`: mention Libby as a source only.
- `/read-along-audiobooks`, `/audiobook-with-text`, `/whispersync-alternative` (answer pages): product pages about HushBook, no Libby content.
- No existing post or page mentions read-alongs, VoiceOver, TalkBack or Assistive Reader.

### Topics considered and rejected
- **"Does listening to audiobooks while sleeping work / is it bad / what happens"** (the only GSC cluster with volume: 14 rows, 25 impressions, positions 6 to 26, all on the fall-asleep post): already answered by that post's H2 "Does listening to an audiobook while sleeping work?" (Andrillon 2017, Zust 2019). A new post would cannibalize it. Better handled as a snippet or title tweak on that post.
- **"Why can't I focus on reading (anymore) / why do I keep rereading the same sentence / why do I zone out when reading"**: large autocomplete cluster, weak SERP (airdroid, AAO, Substack, Yahoo). Rejected for now: the answers lean on health, anxiety and vision causes (high risk), and it sits next to `how-to-focus-on-audiobooks` and the ADHD post. A possible later post with mind-wandering research (Schotter, Tran and Rayner 2014; Reichle, Reineberg and Schooler 2010), not checked yet.
- **"How to read classics (without getting bored) / why are classics hard to read"**: excellent product fit (the free catalogue is classics), but the SERP is craft blogs and the evidence base is thin. Candidate for later.
- **"Spotify audiobooks read along / does spotify audiobooks have text / transcripts"**: real autocomplete, but Spotify's feature set changes often and would need its own primary-source check. Candidate for a sibling post.
- Earlier rejections still stand (see the 2026-10-22, 10-23 and 10-24 notes): screen time, audiobooks vs podcasts, "good for your brain", AI narration, dementia, "why are audiobooks so expensive".

## Sources and how each was verified

All four DOIs were checked against `api.crossref.org/works/<doi>` on 2026-10-25; titles, authors, venues, years and pages matched. Abstracts were read through the OpenAlex API. No ERIC sources were used. Official pages were fetched with curl (ACX through WebFetch, because its page renders with JavaScript) and read as stripped text. Every quote in the post is verbatim from that text, with straight quotes where the source has curly ones.

| Claim in the post | Source | ID / URL | How verified |
|---|---|---|---|
| Screen reader route: "Read From Here" mode; "For sighted users, we recommend listening to audiobooks instead."; iOS needs "VoiceOver, not Spoken Content"; dismiss navigation, then Read From Here; two-finger double tap toggles the mode; read-all command; cover page fix via Menu > Contents; NVDA and JAWS on desktop | Libby Help, "Reading a book using a screen reader" (updated 26 Feb 2026) | help.libbyapp.com/en-us/6244.htm | Fetched ✓, quotes verbatim |
| Works with VoiceOver, TalkBack, NVDA, JAWS | Libby Help, "Does Libby work with screen readers?" (3 Sep 2026) | 6056.htm | Fetched ✓ |
| Free: "no subscription costs, no in-app purchases, and no late fees"; library chooses titles | Libby Help, "What is Libby?" (13 Apr 2026) | 6144.htm | Fetched ✓ |
| Speed 0.6x to 3x | Libby Help, "Changing playback speed" (5 Jun 2026); also 6243 | 6048.htm | Fetched ✓ |
| Text scale slider | Libby Help, "Customizing Libby to meet your needs" (21 Aug 2026) | 6243.htm | Fetched ✓ |
| OpenDyslexic font under Book Design | Libby Help, "Turning on dyslexic font in a book" | 6148.htm | Fetched ✓ |
| Ebook and audiobook loans both count toward the borrowing limit; library sets it | Libby Help, "Borrowing limits" (3 Sep 2026) | 6003.htm | Fetched ✓ |
| Audiobooks "can't be transferred to MP3 players or iPods"; listen in the app or at libbyapp.com | Libby Help, "Can I transfer audiobooks to an MP3 player with Libby?" | 6131.htm | Fetched ✓ |
| Table Of Contents above the timeline | Libby Help, "Accessing the table of contents in a title" | 6283.htm | Fetched ✓ |
| Copy loans to another device with a recovery passkey or setup code | Libby Help, "Setting up Libby on another device" | 6070.htm | Fetched ✓ |
| Kobo with built-in OverDrive support; Libby audiobooks not supported on Kobo | Libby Help, "Reading Libby ebooks on a Kobo ereader" | 6251.htm | Fetched ✓ |
| Most Libby books on Kindle, US only; Read With... > Kindle > Amazon's website | Libby Help, "Reading Kindle Books on a Kindle ereader" (3 Sep 2026) | 6017.htm | Fetched ✓ |
| Kindle Books are for US libraries only; Kindle option is a reading preference for books | Libby Help, "Changing your reading preference for books" | 6013.htm | Fetched ✓ |
| Echo / Google Home over Bluetooth; "You won't be able to play audiobooks from Libby using voice command." | Libby Help, "Can I listen to Libby audiobooks on my Google Home or Amazon Echo?" (3 Sep 2026) | 6097.htm | Fetched ✓ |
| 163 help articles; the only one about hearing an ebook is the screen reader guide; none on audiobook and ebook sync | Libby Help table of contents | help.libbyapp.com/en-us/Data/Tocs/Libby_help_uiux_Chunk0.js | Fetched ✓. Counted article entries (categories, home and videos excluded) and scanned every title. A title scan, so the post says "the only one about having an ebook read aloud", not "no mention anywhere" |
| Read-alongs exist as a title type in Libby's reader | Libby Help 6190 (zoom) and 6205 (keyboard shortcuts) | 6190.htm, 6205.htm | Fetched ✓ (background, not cited) |
| "interactive read-alongs" with "your kids"; audio player features: 0.6x to 3.0x, sleep timer, swipe to skip, bookmarks, notes and highlights | Libby App Store listing | apps.apple.com/us/app/libby-the-library-app/id1076402606 | Fetched ✓ |
| Read-alongs: "OverDrive Read ebooks with professionally recorded narration that plays along while you read"; many highlight "words, sentences, or paragraphs"; pages turn automatically; tap a word to hear it again (browser reader); find via the Ebooks filter, "OverDrive Read-along" | OverDrive Help, "What is a read-along ebook and how does it work?" (18 Aug 2026) | help.overdrive.com/en-us/1152.htm | Fetched ✓ |
| "developing readers"; speed and volume controls; highlighting "offered by some publishers"; soundtracks with sound effects "available for some titles"; automatic page turning "with the option to pause" | OverDrive Resource Center, "OverDrive Read-Alongs" | resources.overdrive.com/library/libby-features/overdrive-read-alongs/ | Fetched ✓ |
| Filter icon > Format > read-alongs; recommended titles are children's picture books | Libby Life (OverDrive's blog), "25 awesome read-alongs to explore with your kids" (20 Jun 2023) | libbylife.com | Fetched ✓. Dated 2023, so the post says "a 2023 post" |
| Settings > Accessibility > VoiceOver; Siri "Turn on VoiceOver"; "VoiceOver changes the gestures you use to control iPhone."; VoiceOver Tutorial | Apple Support, "Turn on and practice VoiceOver on iPhone" | support.apple.com/guide/iphone/iph3e2e415f/ios | Fetched ✓ |
| Tap selects, double tap activates; two-finger swipe down speaks from the selected item; two-finger tap pauses or continues | Apple Support, "Use VoiceOver gestures on iPhone" | support.apple.com/guide/iphone/iph3e2e2281/ios | Fetched ✓ |
| iOS 18: Settings > Accessibility > Spoken Content holds Speak Selection and Speak Screen; Siri "Speak screen" | Apple Support, same page, iOS 18 version | .../iph96b214f0/18.0/ios/18.0 | Fetched ✓ |
| iOS 26: Accessibility > Read & Speak holds Speak Screen and Speak Selection | Apple Support, same page, iOS 26 version (also the current /ios page) | .../iph96b214f0/26/ios/26 | Fetched ✓ |
| "TalkBack gives you eyes-free control of your device."; tutorial opens automatically the first time | Android Accessibility Help, "Get started on Android with TalkBack" | support.google.com/accessibility/android/answer/6283677 | Fetched ✓ |
| Settings > Accessibility > TalkBack > Use TalkBack; hold both volume buttons for a few seconds (shortcut); "control your device with TalkBack gestures" | Android Accessibility Help, "Turn on TalkBack" | answer/6007100 | Fetched ✓. The volume shortcut depends on the TalkBack shortcut setting, so the post says "If the TalkBack shortcut is on" |
| "Read from the next item" reading action | Android Accessibility Help, "Use TalkBack gestures" | answer/6151827 | Fetched ✓ |
| Assistive Reader: device text-to-speech, real-time highlighting; Kindle app on iPhone, iPad, Android, Mac, Fire tablets; "works with any Kindle book with Enhanced Typesetting"; supported: purchased, "Borrowed from Kindle+ or Prime Reading, or other official Kindle partner sources", Family Library; Aa > More > Assistive Reader | Amazon, "Use Assistive Reader to Read Aloud in Kindle Apps" (page heading "How to Use the Assistive Reader in Kindle Apps") | amazon.com/gp/help/customer/display.html?nodeId=TqLHvK6eo6O7DJVQoZ | Fetched ✓ |
| "On average, most performers narrate about 9,300 words per hour." | ACX, "How long will my narrated audiobook be?" | help.acx.com | WebFetch ✓. 155 a minute is our division |
| 238 wpm non-fiction, 260 fiction (190 studies, 18,573 participants) | Brysbaert (2019), Journal of Memory and Language 109:104047 | DOI 10.1016/j.jml.2019.104047 | Crossref ✓, abstract ✓. "1.25x or 1.5x is often closer to your own pace" is our arithmetic (155 x 1.5 = 232.5) |
| 43 studies, 2,147 children; comprehension g+ = 0.17, expressive vocabulary g+ = 0.20, compared with "listening to stories in more traditional settings like storybook reading"; animated pictures, music, sound effects beneficial; hotspots, games, dictionaries distracting | Takacs, Swart and Bus (2015), Review of Educational Research 85(4) 698 to 739 | DOI 10.3102/0034654314566989 | Crossref ✓, abstract ✓ |
| 61 children aged 4 to 5; highlight synchronization raised looking at print from 19% to 38% of reading time | Liao, Chang, Huang and Sung (2020), Computers & Education 144:103703 | DOI 10.1016/j.compedu.2019.103703 | Crossref ✓, abstract ✓. "Doubled" is our wording for 19% to 38% |
| Text-to-speech and read-aloud tools, students with reading difficulties, g = .35 (95% CI .14 to .56) | Wood, Moxley, Tighe and Wagner (2018), Journal of Learning Disabilities 51(1) 73 to 84 | DOI 10.1177/0022219416688170 | Crossref ✓, abstract ✓. The number of studies is not in the abstract, so the post gives none |

### Claims checked but left out
- **Audible Read & Listen (Whispersync) with a Kindle book borrowed from the library.** Only Goodreads, MobileRead and a goodnovel Q&A, which disagree. No Amazon, Audible or OverDrive statement found. Listed under "What we could not confirm".
- **Kindle e-reader Assistive Reader** (11th generation and newer, Scribe, Colorsoft; English, Spanish, French, German, Italian): seen only in a WebSearch summary. Amazon's page (nodeId TdHCSXXqsdhaVKt3Tc) returned 403 to curl and 503 to WebFetch. Left out; the post covers the Kindle apps only.
- **Kindle Assistive Reader on Alexa** and the retirement of the legacy Kindle for Windows app (30 June 2026): WebSearch summaries only. Left out.
- **"Search the Libby app for 'read along'" and "Explore > Kids > Read Along"**: library pages (Athol, CWMARS), not OverDrive. Replaced by OverDrive's own filter instructions.
- **Apple's Accessibility Reader (iOS 26) in Libby**: Apple documents the feature, but nothing says whether it works in Libby. Not mentioned.
- **Android Select to Speak in Libby**: Libby names TalkBack only. Not mentioned.
- **Whether Libby's audiobook keeps playing while you read the ebook in Libby on the same phone**: not documented. The post recommends a second screen instead.
- **Libby's 2026 filter menu wording for read-alongs**: Libby Help 6064 (Sept 2026) lists books, audiobooks and magazines as catalog filters and does not mention read-alongs. The 2023 Libby Life instructions are given with their date.
- **Sora (school app) read-alongs**: not checked. Left out.

## Product claims (live site fetched 2026-10-25, `D:\hushbook\lib\l10n\app_en.arb`, or repo code)
- "A built-in catalogue of public-domain audiobooks from LibriVox and the Internet Archive, in six languages." (home)
- "Already own your books? Import MP3, M4A, M4B, AAC, WAV, FLAC, OGG and many more." (home)
- "Transcribed on your phone. Never the cloud."; "Every word lights up with the narrator. Tap any word to jump there." (home)
- "Free to download, Zero Ads."; "No account, no sign-in"; "Fully offline after a one-time engine download" (home)
- "The core read-along experience and the public-domain library are free. There's an optional Pro upgrade for advanced analytics" (home FAQ)
- Copy-protected audio cannot be added (`libraryImportCantOpenFile`, `libraryImportCantOpenType` descriptions in `app_en.arb`); Libby audio cannot leave Libby (Libby Help 6131).
- No text-to-speech: no TTS strings in `app_en.arb` and no TTS package in `lib/` or `pubspec.yaml`. The post says HushBook "does not read ebooks aloud".
- **Not claimed:** e-book sync. It exists but is beta, English narration only, and the first sync is free with Pro needed for more (`ebookFirstSyncTitle`, `ebookSyncProRequired`, `ebookErrorUnsupportedLanguage`). Libby ebook loans are copy-protected anyway, so it does not help this reader.

## Soft upsell placement
- No mid-body product mention. HushBook appears once, in the closing section, after the post has said what Libby and Kindle already do for free, with honest limits (cannot open Libby loans, no text-to-speech, speech recognition errors).
- `cta`: "Read along with a whole audiobook".

## Checks run
- H1 equals `title` ✓ (the build throws otherwise)
- metaTitle 51 characters (62 with " | HushBook", so it renders without the suffix, like the last post); metaDescription 152 ≤ 160; description 217 ≤ 240 ✓
- 8 keywords, 5 takeaways, 6 FAQs; every takeaway and FAQ fact is stated in the body ✓
- No en or em dashes in the post, registry entry, llms.txt line, draft files or rendered HTML (`LC_ALL=C.UTF-8 grep -P '[\x{2013}\x{2014}]'`) ✓
- 5 internal links in the post body: kids, abridged vs unabridged, reading along, dyslexia, home ✓. 2 new contextual links into the post ✓
- Rendered HTML: canonical `https://hushbook.app/blog/can-libby-read-to-you`; BlogPosting + FAQPage (6 questions) + BreadcrumbList; no markdown leaks ✓
- Tests: 7 pass; `seo-preservation` and `seo-repair-contract` fail with byte-identical output to the pre-change baseline run on 2026-10-25 ✓

## After publishing
1. IndexNow ping for the new post, `/blog`, and the two edited posts.
2. Request indexing in Search Console for `https://hushbook.app/blog/can-libby-read-to-you`.
3. Check People Also Ask for "can libby read to you" and "how to make libby read aloud" in a browser, and align FAQ wording if needed.
