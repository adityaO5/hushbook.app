# Research: captions and on-screen text for audiobooks, by platform

All pages fetched 2026-11-03. Apple pages geo-redirected to the en-IN copy of the same iOS 27 guide. "Absence" means only that the named page does not mention the feature.

## 1. Spotify audiobooks

- Fact: The audiobook help page lists speed, 15-second skips, sleep timer, download and "extra material", with no captions, transcript or text. https://support.spotify.com/us/article/audiobooks/, fetched 2026-11-03, VERIFIED
- Fact: Spotify transcripts are a podcast feature. Source quote: "Some shows have auto-generated episode transcripts. Listeners see transcripts in the Now Playing View and on episode pages in the Spotify mobile app." https://support.spotify.com/us/creators/article/managing-episode-transcripts-on-spotify/, fetched 2026-11-03, VERIFIED
- Fact: Help thread "Transcripts for audiobooks", opened 2024-12-15, last reply 2026-06-19. Source quote: "I have noticed that transcripts are common in podcasts. But I haven't seen them on audiobooks." https://community.spotify.com/t5/Other-Podcasts-Partners-etc/Transcripts-for-audiobooks/td-p/6586356, fetched 2026-11-03, VERIFIED (dates from page JSON)
- Fact: The poster filed an Idea Exchange entry on 2024-12-20 (…/Live-Ideas/Transcripts-for-audiobooks/idi-p/6596498). That URL redirects to a Spotify login. A user wrote on 2025-06-19: "I clicked on your link above, and unfortunately, it says access denied." Source: same thread. Idea status and vote count: UNVERIFIED.
- Fact: Page Match syncs your position between a print book or e-book and the audiobook. It shows no text. Source quote: "This first-of-its-kind feature lets you switch between a print book or e-book and its audiobook counterpart with a quick scan of your mobile phone camera." / "will be available on most English-language titles by the end of February for all Spotify audiobook listeners on iOS and Android." Spotify Newsroom, 2026-02-05, https://newsroom.spotify.com/2026-02-05/page-match-how-to/, fetched 2026-11-03, VERIFIED

## 2. Libby (OverDrive)

- Fact: Libby's accessibility page has no caption, subtitle or transcript setting; its only audiobook option is speed ("0.6–3x"). https://help.libbyapp.com/en-us/6243.htm (updated August 21 2026), fetched 2026-11-03, VERIFIED
- Fact: No en-us Libby Help title numbered 6000–6420 mentions captions, subtitles or transcripts. Method: curl of each https://help.libbyapp.com/en-us/{n}.htm, VERIFIED (titles only)
- Fact: Libby Help names read-alongs only as a title type: "Only available for certain titles, like magazines, read-alongs, picture books, and graphic novels." https://help.libbyapp.com/en-us/6205.htm, fetched 2026-11-03, VERIFIED. I found no help.libbyapp.com article saying who read-alongs are for: UNVERIFIED on that domain.
- Fact: OverDrive says read-alongs are narrated kids' ebooks, not captions on audiobooks. Source quote: "OverDrive read-alongs are narrated ebooks that are supported in Libby and on your OverDrive website. By reading along with engaging audio narration for their favorite stories, developing readers can independently enjoy ebooks and expand their reading skills." / "Text highlighted as the narrator reads (offered by some publishers)". https://resources.overdrive.com/library/libby-features/overdrive-read-alongs/, fetched 2026-11-03, VERIFIED

## 3. Apple Books and iOS Live Captions

- Fact: The Books audiobook guide covers skip, chapters, speed, sleep timer, AirPlay and PDFs, with no transcript or captions. https://support.apple.com/guide/iphone/listen-to-audiobooks-iphac1971248/ios, fetched 2026-11-03, VERIFIED
- Fact: Live Captions works with audio in any app on iPhone 11 or later. Source quote: "Use Live Captions to more easily follow the audio in any app, such as FaceTime or Podcasts, as well as live conversations around you." / "Live Captions is available on iPhone 11 or later. Live Captions isn't available in all languages, countries, or regions. The accuracy of Live Captions may vary and shouldn't be relied upon in high-risk or emergency situations." Turning it on: "Tap Accessibility, tap Live Captions, then turn on Live Captions." / "Transcribe iPhone audio: Tap Live Captions, then tap iPhone Audio." https://support.apple.com/guide/iphone/get-live-captions-of-spoken-audio-iphe0990f7bb/ios, fetched 2026-11-03, VERIFIED. The current page does not call it beta.
- Fact: The iOS 16 edition labels it beta, US and Canadian English only. Source quote: "With Live Captions (beta), spoken dialogue is turned into text and displayed in real time on your iPhone screen. … Live Captions is available on iPhone 11 and later when the primary language is set to English (U.S.) or English (Canada)." https://support.apple.com/guide/iphone/iphe0990f7bb/16.0/ios/16.0, fetched 2026-11-03, VERIFIED. iOS 16 is the oldest guide edition with the page. "Introduced in iOS 16" is my inference, not Apple's wording.
- Fact: Languages today. The iOS 27 list under "Accessibility: Live Captions" has 18 entries: Cantonese and Mandarin Chinese (2 each), English (6: Australia, Canada, India, Singapore, UK, US), French (2), German, Japanese, Korean and Spanish (3: Mexico, Spain, US). https://www.apple.com/ios/feature-availability/, fetched 2026-11-03, VERIFIED

## 4. Android Live Caption

- Fact: It covers media and calls. Source quote: "You can use it on media like videos, podcasts, phone calls, video calls, and audio messages." https://support.google.com/accessibility/android/answer/9350862?hl=en, fetched 2026-11-03, VERIFIED. Correction to the brief: it does caption phone calls. The page adds that it "isn't intended for calls with more than one other person."
- Fact: Devices and languages. Source quote: "Pixel 2 and Pixel 3 series in English." / "Pixel 4 and Pixel 5 series and selected Android phones in English, French, German, Italian, Japanese, Hindi, and Spanish." / "Pixel 6+ and selected Android phones in Android U+" add eight more: Traditional and Simplified Chinese, Turkish, Polish, Portuguese, Korean, Russian and Vietnamese (15 in all). VERIFIED
- Fact: How to turn it on. Source quote: "Press the volume button. Under the volume controls, tap More > Live Caption > Done." (the page renders these as icons) VERIFIED
- Fact: Limits. Source quote: "Captions might be unavailable for some media and calling apps." / "Live Caption doesn't work on music." / "All audio and captions are processed on the device and are never stored or sent to Google." VERIFIED
- Fact: Expressive captions. Source quote: "On Android 14 and above devices that have "Live Caption" on, Expressive captions are available in English (US)." VERIFIED. The page gives no launch date.

## 5. Audible app

- Fact: Audible's old captions help URL now 301-redirects to the Read & Listen article, which never mentions captions. Source: curl returned "HTTP/1.1 301 Moved Permanently" with "Location: https://help.audible.com/s/article/listen-with-whispersync-for-voice" for https://help.audible.com/s/article/is-the-audible-captions-feature-available. Fetched 2026-11-03, VERIFIED
- Fact: Read & Listen needs both formats. Source quote: "To use Read & Listen, you'll need both the audiobook and Kindle eBook in your Audible and Kindle libraries." Supported apps include "Audible apps (Android, iOS)". https://help.audible.com/s/article/listen-with-whispersync-for-voice, fetched 2026-11-03, VERIFIED
- Fact: Immersion reading. Source quote: "The text highlights as the narrator reads." / "You will need both the audiobook and the Kindle eBook to access this feature." https://help.audible.com/s/article/what-is-immersion-reading, fetched 2026-11-03, VERIFIED. The marketing page says: "Immersion reading lets you read and listen at the same time, like karaoke for books." https://www.audible.com/ep/read-listen, VERIFIED

## 6. Hoopla

- Fact: Hoopla's FAQ covers closed captions only for video. Its audiobook entries cover speed and bookmarks, with no text view. Source quote: "While playing a video, tap the settings (three dots) icon … Tap Subtitles." https://www.hoopladigital.com/faq, fetched 2026-11-03, VERIFIED. help.hoopladigital.com returned an empty JavaScript shell.

## 7. Apps that show text for audiobook files you own

- SubRead (Android via F-Droid; free, AGPL-3.0; version 0.9.4 "Added on Oct 27, 2026"; Android 8.0+, 64-bit ARM). It aligns the audiobook with the matching ebook and exports .srt. It does not transcribe. Source quote: "SubRead lines an audiobook up with its ebook, sentence by sentence, and gives you subtitles with the time of each line." / "The words come from your book, not from a speech model." / "You need the audiobook and the ebook of the same text." https://f-droid.org/en/packages/space.subread.app/, fetched 2026-11-03, VERIFIED. A companion app, SubRead Overlay, "shows the lines of a subtitle file (.srt) over the app that plays your audiobook or video". https://f-droid.org/en/packages/space.subread.overlay/, VERIFIED
- WorkAudioBook (Windows, Android). A phrase-by-phrase player for language learners. You supply the subtitle file. Source quote: "Split audio into phrases" / "Formats: SRT, WAB HTML". http://www.workaudiobook.com/ (HTTP only), fetched 2026-11-03, VERIFIED
  - Windows. Source quote: "Starting from 2022, WorkAudioBook for Windows has become a paid program." / "You can use the program free of charge for up to 10 minutes per day". http://www.workaudiobook.com/WorkAudioBook/How-to-activate(Windows).aspx, VERIFIED. Licence price UNVERIFIED: checkout returned HTTP 403.
  - Android. Source quote: "Full version -- $4.95 (in app menu choose Purchase), first two weeks are free of charge." Last updated "Mar 21, 2019". The listing still calls the Windows version "fully FREE", which the 2022 licence page contradicts. https://play.google.com/store/apps/details?id=com.povalyaev.WorkAudioBook, VERIFIED
- Clearly Audiobooks (iPhone, iPad, Vision Pro; BioSpeech, Inc.; category Medical; version 1.2, 11/04/2025). A hearing-training app with its own catalogue; it does not play your files. Source quote: "Listen and read audiovisual books that sync voice, text, and lips—coaching people with hearing challenges." / "Provides 20 hours of audiobooks and unlimited rounds of the training program." / "SUBSCRIPTION REQUIRED." In-app purchases: "Full Access $5.99", "Full Access $59.99". https://apps.apple.com/us/app/clearly-audiobooks/id1608953900, fetched 2026-11-03, VERIFIED (full listing rendered). Billing periods are not stated: UNVERIFIED.
- Storytel Synced Listening. Source quote: "Synced listening is rolling out gradually to users in Sweden on titles from selected publishers who have opted in for being a part of this launch from September 24th. The feature will expand to more users in more markets in the upcoming months." Press release, 24 September 2025, https://storage.mfn.se/43472b75-0186-4bdc-9ec6-825a5966a81d/storytel-launches-innovative-product-features-to-elevate-the-user-experience.pdf, VERIFIED
  - Q1 2026. Source quote: "Synced Listening was further scaled during the quarter and made available to a large part of the catalogue across markets." https://www.storytelgroup.com/en/wp-content/uploads/sites/2/2021/10/interim-report-january-march-2026-260428.pdf, VERIFIED. No source names the markets: UNVERIFIED.
  - US. Source quote: "the United States, through Audiobooks.com." https://www.storytelgroup.com/en/wp-content/uploads/sites/2/2021/10/storytel-group-annual-report-2025-260326.pdf, VERIFIED. storytel.com has no /us storefront (it redirects to a sign-in). So the Storytel brand is not sold in the US. Whether Audiobooks.com offers synced text: UNVERIFIED.
- Speechify reads text aloud in AI voices. Source quote: "Text to speech from Speechify lets you listen to docs, articles, PDFs, email, and various other formats — anything you read." The listing offers no captions for an audio file. https://apps.apple.com/us/app/speechify-text-to-speech-pdf/id1209815023, fetched 2026-11-03, VERIFIED
- ElevenReader reads text aloud in AI voices and also sells audiobooks. Source quote: "Listen to anything — bestsellers, PDFs, docs, articles — in stunningly natural voices you'll love." The listing offers no transcription of an imported audio file. https://apps.apple.com/us/app/elevenreader-read-books-aloud/id6479373050, fetched 2026-11-03, VERIFIED
- Storyteller (self-hosted; needs the ebook). Source quote: "A self-hosted platform for automatically aligning ebooks and audiobooks for immersive reading." / "Storyteller produces EPUB 3 compliant ebook files." https://storyteller-platform.dev/, fetched 2026-11-03, VERIFIED
- Bloox (iPhone, iPad, Apple Watch; free; iOS 26.0+). It transcribes your own files on the device. Source quote: "See synchronized captions as your audiobook plays, with separate controls for word and sentence highlighting." / "English transcription runs on your device." / "No subscription, in-app purchases or ads." https://apps.apple.com/us/app/bloox-m4b-audiobook-player/id6759511972, fetched 2026-11-03, VERIFIED
- Hoshi Reader (iOS, free, Japanese EPUB reader). Source quote: "Sasayaki (Audiobooks): Sync audiobooks to book text to read along". https://apps.apple.com/us/app/hoshi-reader/id6758244332, VERIFIED
- BookPlayer (iOS) and Smart AudioBook Player (Android) show no text. Neither listing mentions a transcript, captions or subtitles. https://apps.apple.com/us/app/bookplayer/id1138219998 and https://play.google.com/store/apps/details?id=ak.alizandro.smartaudiobookplayer, fetched 2026-11-03, VERIFIED (absence). Prologue was not checked.

## 8. Transcription tools for a file you own

- OpenAI Whisper. Source quote: "Whisper's code and model weights are released under the MIT License." CLI `--output_format` choices include "vtt" and "srt". https://github.com/openai/whisper, fetched 2026-11-03, VERIFIED
- whisper.cpp. Repo description: "Port of OpenAI's Whisper model in C/C++". LICENSE: "MIT License". CLI: "-osrt, --output-srt … output result in a srt file". https://github.com/ggml-org/whisper.cpp, fetched 2026-11-03, VERIFIED
- Apple Notes transcribes recordings made in Notes. Source quote: "In the Notes app, you can record audio and have the spoken words transcribed to text." / "Audio transcription is available on iPhone 12 and later when the device language is set to English, Spanish, Portuguese, Italian, French, German, Japanese, Korean, Simplified Chinese, and Traditional Chinese." https://support.apple.com/guide/iphone/record-and-transcribe-audio-iphbe11247b5/ios, VERIFIED. The page covers recordings only, so transcribing an imported audiobook file is UNVERIFIED.
- Voice Memos. Source quote: "Speech in your audio recordings can be transcribed to text in Voice Memos." Also iPhone 12 or later. https://support.apple.com/guide/iphone/view-a-transcription-iph00953a982/ios, VERIFIED
- Windows 11 Live captions. Source quote: "Live captions is available in Windows 11, version 22H2 and later." / "Captions can be provided for audio even when disconnected from the internet." / "Go to Settings > Accessibility > Captions and turn on the Live captions toggle." / "Only speech detected in audio will be captioned." / "Generated captions are not stored anywhere on the device or the cloud." The FAQ lists 21 speech languages, including 7 English variants. https://support.microsoft.com/en-us/accessibility/windows/use-live-captions-to-better-understand-audio, fetched 2026-11-03, VERIFIED

## 9. Legal line

- Audible Conditions of Use (last updated November 2, 2026). Source quote: "You may not … (iv) attempt to disable, bypass, modify, defeat, or otherwise circumvent any digital rights management or other protection system applied to Content or used as part of the Service". https://www.audible.com/legal/conditions-of-use, fetched 2026-11-03, VERIFIED
- LibriVox. Source quote: "all our recordings are public domain (definitely in the USA, and maybe in your country as well, see below ). This means anyone can use all our recordings however they wish (even to sell them)." https://librivox.org/pages/public-domain/, fetched 2026-11-03, VERIFIED

## Sources

- [Spotify, "Unlock Audiobooks"](https://support.spotify.com/us/article/audiobooks/)
- [Spotify, "Managing episode transcripts on Spotify"](https://support.spotify.com/us/creators/article/managing-episode-transcripts-on-spotify/)
- [Spotify Community, "Transcripts for audiobooks"](https://community.spotify.com/t5/Other-Podcasts-Partners-etc/Transcripts-for-audiobooks/td-p/6586356)
- [Spotify Newsroom, "How to Use Page Match to Seamlessly Switch Between a Book and Its Audiobook on Spotify"](https://newsroom.spotify.com/2026-02-05/page-match-how-to/)
- [Libby Help, "Customizing Libby to meet your needs"](https://help.libbyapp.com/en-us/6243.htm)
- [Libby Help, "Keyboard shortcuts for Libby's ebook reader and audiobook player"](https://help.libbyapp.com/en-us/6205.htm)
- [OverDrive Resource Center, "OverDrive Read-Alongs"](https://resources.overdrive.com/library/libby-features/overdrive-read-alongs/)
- [Apple Support, "Listen to audiobooks in the Books app on iPhone"](https://support.apple.com/guide/iphone/listen-to-audiobooks-iphac1971248/ios)
- [Apple Support, "Get live captions of spoken audio on iPhone"](https://support.apple.com/guide/iphone/get-live-captions-of-spoken-audio-iphe0990f7bb/ios)
- [Apple Support, "Get live captions in real time on iPhone"](https://support.apple.com/guide/iphone/iphe0990f7bb/16.0/ios/16.0)
- [Apple, "iOS and iPadOS 27 - Feature Availability"](https://www.apple.com/ios/feature-availability/)
- [Apple Support, "Record and transcribe audio in Notes on iPhone"](https://support.apple.com/guide/iphone/record-and-transcribe-audio-iphbe11247b5/ios)
- [Apple Support, "View a Voice Memos transcription on iPhone"](https://support.apple.com/guide/iphone/view-a-transcription-iph00953a982/ios)
- [Android Accessibility Help, "Live Caption: Caption media & calls on your device"](https://support.google.com/accessibility/android/answer/9350862?hl=en)
- [Audible Help, "Learn about Read & Listen"](https://help.audible.com/s/article/listen-with-whispersync-for-voice)
- [Audible, "Read & Listen on Audible | Read Along with Synced Narration"](https://www.audible.com/ep/read-listen)
- [Audible, "Conditions of Use | Audible.com"](https://www.audible.com/legal/conditions-of-use)
- [hoopla, "Find hoopla support, help, and FAQs | hoopla"](https://www.hoopladigital.com/faq)
- [F-Droid, "SubRead | F-Droid - Free and Open Source Android App Repository"](https://f-droid.org/en/packages/space.subread.app/)
- [F-Droid, "SubRead Overlay | F-Droid - Free and Open Source Android App Repository"](https://f-droid.org/en/packages/space.subread.overlay/)
- [WorkAudioBook, "WorkAudioBook - Audio Player for Language Learners"](http://www.workaudiobook.com/)
- [WorkAudioBook, "WorkAudioBook for Windows - License and Activation"](http://www.workaudiobook.com/WorkAudioBook/How-to-activate(Windows).aspx)
- [Google Play, "Repeat player WorkAudioBook - Apps on Google Play"](https://play.google.com/store/apps/details?id=com.povalyaev.WorkAudioBook)
- [App Store, "Clearly Audiobooks App - App Store"](https://apps.apple.com/us/app/clearly-audiobooks/id1608953900)
- [Storytel, "Storytel launches innovative product features to elevate the user experience"](https://storage.mfn.se/43472b75-0186-4bdc-9ec6-825a5966a81d/storytel-launches-innovative-product-features-to-elevate-the-user-experience.pdf)
- [Storytel Group, "Interim report January–March 2026"](https://www.storytelgroup.com/en/wp-content/uploads/sites/2/2021/10/interim-report-january-march-2026-260428.pdf)
- [Storytel Group, "Annual and Sustainability Report 2025"](https://www.storytelgroup.com/en/wp-content/uploads/sites/2/2021/10/storytel-group-annual-report-2025-260326.pdf)
- [App Store, "Speechify – Text to Speech PDF App - App Store"](https://apps.apple.com/us/app/speechify-text-to-speech-pdf/id1209815023)
- [App Store, "ElevenReader: Read Books Aloud App - App Store"](https://apps.apple.com/us/app/elevenreader-read-books-aloud/id6479373050)
- [Storyteller, "Storyteller Docs | Storyteller"](https://storyteller-platform.dev/)
- [App Store, "Bloox - M4B Audiobook Player App - App Store"](https://apps.apple.com/us/app/bloox-m4b-audiobook-player/id6759511972)
- [App Store, "Hoshi Reader App - App Store"](https://apps.apple.com/us/app/hoshi-reader/id6758244332)
- [App Store, "BookPlayer App - App Store"](https://apps.apple.com/us/app/bookplayer/id1138219998)
- [Google Play, "Smart AudioBook Player - Apps on Google Play"](https://play.google.com/store/apps/details?id=ak.alizandro.smartaudiobookplayer)
- [GitHub, "openai/whisper"](https://github.com/openai/whisper)
- [GitHub, "ggml-org/whisper.cpp"](https://github.com/ggml-org/whisper.cpp)
- [Microsoft Support, "Use live captions to better understand audio"](https://support.microsoft.com/en-us/accessibility/windows/use-live-captions-to-better-understand-audio)
- [LibriVox, "Public Domain | LibriVox"](https://librivox.org/pages/public-domain/)
