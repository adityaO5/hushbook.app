# Research: Can Kindle Read to You? Assistive Reader, Alexa and Audible Narration

Checked 2026-11-09. Sibling post: content/blog/can-libby-read-to-you.md.

## Summary: can Kindle read to you?

1. **Kindle app (iPhone, iPad, Android, Mac, Fire tablets): yes, free.** Assistive Reader reads the book with the device's own text-to-speech voice and highlights the text as it goes, for books with Enhanced Typesetting bought from Amazon, borrowed through Kindle+ (the new name of Kindle Unlimited since October 22, 2026) or Prime Reading, or shared through Family Library.
2. **Kindle e-readers: yes, free, but only through Bluetooth headphones or a speaker.** Assistive Reader runs on 11th generation and newer Kindles, Kindle Scribe and Kindle Colorsoft (English, Spanish, French, German, Italian). VoiceView, the screen reader, runs over Bluetooth on most models since 2016.
3. **Kindle for Windows: Amazon documents Assistive Reader keyboard shortcuts plus Narrator, NVDA and JAWS support. Kindle for Web (browser): no read-aloud option is documented.**
4. **Alexa: yes, free, on "all Alexa built-in devices", but Amazon says "Kindle Assistive Reader isn't available on Alexa+"**, which has been open to everyone in the US since February 2026 and is free with Prime.
5. **Human narration costs extra:** add the Audible audiobook at a discount (examples today: $5.45 to $12.00 on top of the Kindle price), or get companion audiobooks "at no additional cost" on thousands of Kindle+ titles ($11.99 a month). Word highlighting with Audible narration (Immersion Reading) is on the Kindle apps for iOS and Android and Fire tablets, not on e-ink Kindles.

## Big changes since the Libby post (October 2026)

- Kindle Unlimited was renamed **Kindle+** (About Amazon note dated October 22, 2026). Amazon help pages are inconsistent: the Assistive Reader app page says "Kindle+", the Alexa page still says "Kindle Unlimited".
- Amazon announced **Alexa Tablets** on October 8, 2026. They "run Android" with "the full Google Play Store" and replace the Fire tablet line. Amazon's Kindle help still says "Fire tablets".
- **Alexa+** became available to everyone in the US in February 2026, free with Prime, and Kindle Assistive Reader does not work on it.
- **The legacy Kindle for PC app** has not been supported since June 30, 2026. The new Kindle for Windows app needs Windows 11.
- **The product page line "Text-to-Speech: Enabled"** did not appear on any of the 5 US Kindle product pages we checked. They show "Screen Reader: Supported" and "Enhanced typesetting: Enabled" instead.

## How the pages were fetched

- Amazon help pages: WebFetch returned HTTP 503, so I used curl with a desktop Chrome user agent and stripped the HTML locally. All Amazon help pages below were fetched and read in full on 2026-11-09.
- Amazon product pages: fetched with curl and a USD currency cookie (the request comes from an IP in India). Prices are what an anonymous US-currency session saw on 2026-11-09. Signed-in accounts may see different prices.
- Audible help (help.audible.com and audible.com/help): the article body is loaded by JavaScript, so neither curl nor WebFetch saw it. Facts from it are marked UNVERIFIED today.
- nytimes.com: curl returned 403 and WebFetch is blocked.
- Scientific papers: a research sub-agent fetched abstracts and full texts. I re-ran every DOI through the Crossref API myself (results in section 10).

---

## 1. Assistive Reader in the Kindle apps

- **Fact:** Assistive Reader is a text-to-speech control in the free Kindle app for iPhone, iPad, Android phones and tablets, Mac and Fire tablets.
  - Quote: "Assistive Reader provides you with new options to control TTS (Text-to-Speech) on the free Kindle app for iPhone, iPad, Android phones and tablets, Mac, and Fire tablets."
  - URL: https://www.amazon.com/gp/help/customer/display.html?nodeId=TqLHvK6eo6O7DJVQoZ
  - Page title: "Use Assistive Reader to Read Aloud in Kindle Apps - Amazon Customer Service" (on-page H1: "How to Use the Assistive Reader in Kindle Apps")
  - VERIFIED, 2026-11-09
- **Fact:** It highlights text as it reads.
  - Quote: "With Assistive Reader, you can use built-in audio controls in the Kindle app, as well as real-time text highlighting while listening."
  - Same URL and title. VERIFIED, 2026-11-09
- **Fact:** The voice is the device's own TTS engine. Amazon describes no voice picker inside the Kindle app, so changing the voice would happen in the phone's settings. That last part is an inference, not documented by Amazon.
  - Quote: "Assistive Reader uses your device's OS-level Text-to-Speech engines to read aloud the text of the book."
  - Same URL and title. VERIFIED, 2026-11-09
  - On Windows, Amazon says: "You can configure the Assistive Reader language from the System Preferences on your computer." (https://www.amazon.com/gp/help/customer/display.html?nodeId=GPC7U392HH93VPC8, "Kindle for Windows Keyboard Shortcuts - Amazon Customer Service", VERIFIED)
- **Fact:** It pauses when you open the menu or make a highlight or note.
  - Quote: "Assistive Reader automatically pauses when you're no longer reading, such as when you open the navigation menu or make an annotation (highlights or notes)."
  - Same URL and title. VERIFIED, 2026-11-09
- **Fact:** Which books work: Enhanced Typesetting is required.
  - Quote: "Assistive Reader works with any Kindle book with Enhanced Typesetting. To learn if a book supports Enhanced Typesetting, go to the Kindle eBook Store and look for "Enhanced Typesetting: Enabled" in the features list."
  - Same URL and title. VERIFIED, 2026-11-09
- **Fact:** Which sources work.
  - Quote: "Purchased from the Kindle store; or Borrowed from Kindle+ or Prime Reading, or other official Kindle partner sources; or Shared with you in your Family Library."
  - Also: "Books must also be available in a language supported by your device's Text-to-Speech engine."
  - Same URL and title. VERIFIED, 2026-11-09
  - Public library (Libby) loans are not named. That is unchanged from the Libby post.
- **Fact:** Steps.
  - Quote, steps as listed: "Open the Kindle app on your iOS, Android, or Fire Tablet device." / "Select the top center of the screen, and then the reading settings menu, Aa." / "Select More, and then turn on Assistive Reader." / "To display the player controls, tap the screen. You can control the reading speed, or rewind by 30 seconds using the player controls at the bottom of the screen."
  - Tip: "long press a word to open the quick actions menu. Then, select Play to begin Text-to-Speech from that point forward".
  - Once on, "it remains available until you turn it off again."
  - Same URL and title. VERIFIED, 2026-11-09
  - Note: the steps name iOS, Android and Fire Tablet, while the intro also names Mac.
- **Fact:** Speed range: Amazon gives none. The 30-second rewind is confirmed. The AI answer's "0.5x to 3.5x" is NOT on any Amazon page we fetched (app page, e-reader page, Windows and Mac shortcut pages). Windows only says "Increase speech rate - Shift, +" and "Decrease speech rate - Shift, -".
  - VERIFIED absence on those pages, 2026-11-09. Treat 0.5x to 3.5x as unsupported.
- **Fact:** The More tab also has "Real-time Text Highlighting".
  - Quote: "Real-time Text Highlighting: Highlights words while either Assistive Reader or Audible narrates your text."
  - Also: "Assistive Reader: Listen to Text-to-Speech and read along with highlighted text."
  - URL: https://www.amazon.com/gp/help/customer/display.html?nodeId=TABlJ4ot69emTO8jJG
  - Page title: "Accessible Reading Options for Kindle Reading Apps - Amazon Customer Service"
  - VERIFIED, 2026-11-09. Listed for Kindle for Android and iOS and for macOS.
- **Fact:** Free: Amazon calls it a feature of "the free Kindle app" and mentions no fee. VERIFIED (absence of any price), 2026-11-09.
- **Fact:** Offline: not documented by Amazon. It may work offline if the phone's TTS voice is downloaded, but that is an inference. UNVERIFIED.
- **Fact:** Launch date: Amazon published no launch date that we found.
  - Earliest Amazon-dated mention: an About Amazon article published 2025-04-08 (modified 2025-09-30) that calls it "Kindle's latest accessibility feature".
  - Quote: "Kindle's latest accessibility feature, Assistive Reader, offers text-to-speech audio and synchronized highlighting on the Kindle app for iOS, Android, and Fire tablets, as well as current generation Kindle devices, making Kindle books more accessible for individuals with dyslexia or other disabilities."
  - URL: https://www.aboutamazon.com/news/books-and-authors/kindle-accessibility-features-for-all-readers
  - Page title: "Kindle accessibility features like text-to-speech, visual customization, more" (datePublished 2025-04-08T18:15Z in page metadata)
  - VERIFIED, 2026-11-09
  - Third-party reports (the-ebook-reader.com blog, June 2024) say the feature appeared quietly in the apps in 2024. UNVERIFIED, so do not cite as fact.
- **Fact:** Books that can't be read aloud at all: print replica and image-based books.
  - Quote: "Currently, print replica and image-based fixed layout Kindle books aren't readable in read aloud and braille."
  - URL: https://www.amazon.com/gp/help/customer/display.html?nodeId=TzZzGnAX8N8zL1qWfT
  - Page title: "Learn About Accessibility Information for Kindle Books - Amazon Customer Service"
  - VERIFIED, 2026-11-09
  - The same page says listings show "Readable in read aloud and braille", "Partially readable...", "Not readable..." or "Not known...", and that accessibility information "is based on details provided by the publisher."

## 2. Kindle e-readers: Assistive Reader and VoiceView

- **Fact:** Assistive Reader models.
  - Quote: "Assistive Reader provides you with new options to control TTS (Text-to-Speech) on your Kindle E-Reader 11th Generation and higher, Kindle Scribe, or Kindle Colorsoft."
  - URL: https://www.amazon.com/gp/help/customer/display.html?nodeId=TdHCSXXqsdhaVKt3Tc
  - Page title: "How to Use the Assistive Reader on Your Kindle - Amazon Customer Service"
  - VERIFIED, 2026-11-09
- **Fact:** Languages: "Assistive Reader supports books in English, Spanish, French, German, and Italian language." Same URL. VERIFIED.
- **Fact:** Controls and highlighting: "Play, pause, control the reading speed, or rewind by 30 seconds" and "Follow along with the words highlighted as they're read aloud". The intro calls it "text underlining". Same URL. VERIFIED.
- **Fact:** Enhanced Typesetting is required: "Assistive Reader only works with books that have Enhanced Typesetting." Same URL. VERIFIED.
- **Fact:** Steps: open the book, "Tap the top center of the screen, and then select the reading settings menu, Aa.", then "Select More, and then turn on Assistive Reader." Same URL. VERIFIED.
- **Fact:** Bluetooth requirement: the e-reader Assistive Reader page does not mention Bluetooth or audio output at all. Amazon's device pages describe Kindle audio only over Bluetooth:
  - Kindle Paperwhite spec, quote: "VoiceView screen reader, available over Bluetooth audio, provides spoken feedback allowing you to navigate your device and read books with text-to-speech (available in English only)." Also: "Audible audiobook streaming over Bluetooth will reduce battery life."
    - URL: https://www.amazon.com/dp/B0CFPJYX7P
    - Page title: "Kindle Paperwhite 16 GB | Fastest Kindle E-Reader | Amazon"
    - VERIFIED, 2026-11-09
    - Note the conflict: "English only" here vs six languages on the VoiceView help page below.
  - Bluetooth pairing page, quote: "Listen to VoiceView commands or an audiobook with a supported Bluetooth device." and "Only devices released during or after 2016 support Bluetooth connectivity."
    - URL: https://www.amazon.com/gp/help/customer/display.html?nodeId=TIHMXAou9Wm1q17sg5
    - Page title: "Connect and Sync Bluetooth to Your Kindle E-Reader - Amazon Customer Service" (H1 "Pair a Bluetooth Audio Device with Your Kindle E-Reader")
    - VERIFIED, 2026-11-09
  - "No speaker": no Amazon page we fetched says "no speaker" in those words. The safe wording is "Kindle e-readers play audio through Bluetooth headphones or speakers." Older models had headphone jacks: the Identify page lists "Headphone jack" for the Kindle Keyboard (3rd Generation), Kindle DX and Kindle (2nd Generation).
- **Fact:** Firmware: Amazon's current software page lists 5.20.1 for 11th generation and newer models, Scribe and Colorsoft. The Paperwhite 12th generation release notes list only "Version 5.20.1, September 2026" and "Version 5.19.6, July 2026", both "Performance improvements, bug fixes, and other general enhancements."
  - URLs: https://www.amazon.com/gp/help/customer/display.html?nodeId=GKMQC26VQQMM8XSW ("Latest Kindle Software Updates and Versions - Amazon Customer Service") and https://s3.amazonaws.com/firmwarereleasenotes/update_kindle_12th/ATVPDKIKX0DER/en_US.html
  - VERIFIED, 2026-11-09
  - The version that first brought Assistive Reader (5.18.4 in July 2025, pulled, then returned in 5.18.4.01 and 5.18.5, August to September 2025) comes from third-party blogs (the-ebook-reader.com, Boing Boing, Android Authority). UNVERIFIED against Amazon.
- **Fact:** VoiceView over Bluetooth: how to turn it on.
  - Quote, 11th Generation and newer: "Place your Bluetooth audio device into pairing mode." / "Press the Power button three times within two seconds to initiate VoiceView." / "When you hear audio from your Bluetooth device (within two minutes), hold two fingers spaced apart on the screen to confirm the pairing."
  - Quote, older models: "Press and hold the power button on your Kindle for nine seconds. Then press two fingers spaced apart on the screen for one second."
  - Quote, languages: "VoiceView over Bluetooth is available in the following languages: English, French, German, Italian, Portuguese, and Spanish."
  - Also: "There is no audio announcement or feedback until the last step."
  - URL: https://www.amazon.com/gp/help/customer/display.html?nodeId=TKfsDEx2U1RrGi8o1C
  - Page title: "Use VoiceView Over Bluetooth on Kindle - Amazon Customer Service"
  - VERIFIED, 2026-11-09
- **Fact:** VoiceView models: Amazon's Identify page lists "VoiceView screen reader over Bluetooth" on models from 2016 onward. That includes the Kindle (8th Generation), Oasis (8th, 9th, 10th), Paperwhite (10th, 11th, 12th, 2026), Kindle (10th, 11th, 2026), Scribe models and Colorsoft (2025, 2026). The Paperwhite (7th Generation) needs an audio adapter ("VoiceView screen reader over Bluetooth (with audio adapter)").
  - URL: https://www.amazon.com/gp/help/customer/display.html?nodeId=GK33S847NN4V6Y83
  - Page title: "How to Find Out Your Kindle Model and Generation - Amazon Customer Service"
  - VERIFIED, 2026-11-09. Read the page directly before quoting per model; the list is long.
- **Fact:** VoiceView history: "Since introducing VoiceView in 2016 to provide screen reader support for blind and low-vision users navigating Kindle devices (now available in English, Spanish, French, Italian, German, and Portuguese)".
  - URL: https://www.aboutamazon.com/news/books-and-authors/kindle-accessibility-features-for-all-readers
  - VERIFIED, 2026-11-09
- **Fact:** VoiceView reads books: "Use VoiceView gestures to navigate a supported Kindle and listen to Kindle books and other Kindle content over a compatible Bluetooth audio device."
  - URL: https://www.amazon.com/gp/help/customer/display.html?nodeId=TAy5KCy5PpYSoGtEA3
  - Page title: "Guide to VoiceView Gestures on Your Kindle - Amazon Customer Service"
  - VERIFIED, 2026-11-09

## 3. Kindle for PC, Mac and Kindle for Web

- **Fact:** The legacy Kindle for PC app is no longer supported.
  - Quote: "Important: The Legacy Kindle app (previously called Kindle for PC) isn't supported as of June 30, 2026."
  - Supported systems: "Windows: Windows 11." and "Mac: OS x 10.14 or higher".
  - URL: https://www.amazon.com/gp/help/customer/display.html?nodeId=TlLrSvAdaGJObw5fIG
  - Page title: "Install or Update the Kindle App for Desktop - Amazon Customer Service"
  - VERIFIED, 2026-11-09
- **Fact:** Kindle for Windows supports Assistive Reader, per Amazon's shortcut page. Note that the main Assistive Reader page does not list Windows.
  - Quote: "To use these shortcuts, enable Assistive Reader first. Press Ctrl, A, or select the Aa menu, then enable Assistive Reader."
  - Shortcuts: "Toggle Text-to-Speech - Ctrl, T", "Increase speech rate - Shift, +", "Toggle continuous reading - Ctrl, Shift, C".
  - Also: "This feature only works on eligible Kindle content."
  - URL: https://www.amazon.com/gp/help/customer/display.html?nodeId=GPC7U392HH93VPC8
  - Page title: "Kindle for Windows Keyboard Shortcuts - Amazon Customer Service"
  - VERIFIED, 2026-11-09
- **Fact:** Kindle for Windows works with screen readers.
  - Quote: "Kindle for Windows supports the Narrator screen reader that's built into Windows 11, NVDA 2017.1 or higher and JAWS screen reader on Windows computers." (The page runs "supports" and "the" together.)
  - Also: "You can read aloud over 6 million titles in English and most titles available in other languages in the Kindle Store using screen reader technology."
  - Also: product pages show "Screen Reader: Supported", meaning compatible with "VoiceView on Fire Tablets and Kindle E-readers, VoiceOver on iOS, TalkBack on Android, and NVDA on Windows."
  - URL: https://www.amazon.com/gp/help/customer/display.html?nodeId=G74WVD3PVFJ8N3KL
  - Page title: "Kindle for Windows Accessibility Features - Amazon Customer Service"
  - VERIFIED, 2026-11-09
  - Historical note: the old "Kindle for PC with Accessibility Plugin" is not mentioned on any current Amazon page we fetched. Do not describe it as current.
- **Fact:** Kindle for Mac: Assistive Reader is listed for Mac on the main page (section 1). The Mac shortcut page still describes a "Text-to-Speech" mode.
  - Quote: "Text-to-Speech is only supported with Mac OSX 10.10 or above." and "Press Command T or select the Tools menu and choose Start Text-to-Speech."
  - URL: https://www.amazon.com/gp/help/customer/display.html?nodeId=GFBT6Y7AFLJY947N
  - Page title: "Kindle for Mac Keyboard Shortcuts - Amazon Customer Service"
  - VERIFIED, 2026-11-09. This may describe the older Mac app; the Mac minimum on the install page is 10.14.
- **Fact:** Kindle for Web (read.amazon.com) shows no read-aloud option. Its settings list Font, Font Size, Page Color, Layout, Margin and Reading Progress only.
  - URL: https://www.amazon.com/gp/help/customer/display.html?nodeId=TT200NNkr2BE4Jnsy9
  - Page title: "Customize Kindle for Web - Amazon Customer Service"
  - VERIFIED, 2026-11-09
  - The "Accessible Reading Options" page lists only visual options for Kindle for Web (TABlJ4ot69emTO8jJG, VERIFIED). Absence of a feature is not proof it can never work, so word it as "Amazon documents no read-aloud option in Kindle for Web".

## 4. Fire tablets (and the new Alexa Tablets)

- **Fact:** Assistive Reader runs in the Kindle app on Fire tablets (section 1 page, steps name "Fire Tablet device"). VERIFIED.
- **Fact:** VoiceView on Fire: "Use gestures and Text-to-Speech to read and interact with your book on Fire tablet (FireOS 5 and higher)."
  - Also: "When you open a book, Text-to-Speech begins reading the book and automatically turns the pages."
  - Voice change: "From Settings, select Keyboard & Language, and then select Text-to-Speech."
  - Speed: "The continuous reading speed control is located in the bottom right corner of the screen when the reading toolbar is open."
  - Language: "The VoiceView's Text-to-Speech voice reads in your device language. However, not all languages are supported."
  - URL: https://www.amazon.com/gp/help/customer/display.html?nodeId=Tlyb2fwnqEsM9z3lb8
  - Page title: "Guide to Reading Books with VoiceView on Fire Tablet - Amazon Customer Service"
  - VERIFIED, 2026-11-09
- **Fact:** Speak Selection on Fire (Fire OS 7 and higher) can read the whole screen.
  - Quote: "provides controls to select specific items to be read aloud, or to speak the entire content of the screen on your Fire tablet (FireOS 7 and higher)." and "Tap the Play icon to read the full screen from the top."
  - Path: Settings > Accessibility > Speak Selection (under Screen Readers).
  - URL: https://www.amazon.com/gp/help/customer/display.html?nodeId=Tg6KhWuGJgXz2yPpQd
  - Page title: "Guide to Speak Selection for Fire Tablet - Amazon Customer Service"
  - VERIFIED, 2026-11-09
- **Fact:** Immersion Reading with Audible on Fire: "This feature is available on Fire Tablets with FireOS 7 and above." and "Synchronized highlighting of the text is available while the audio is playing."
  - URL: https://www.amazon.com/gp/help/customer/display.html?nodeId=TjCHGCnIKBM42lnQrE
  - Page title: "Other Reading Accessibility Settings on Fire Tablet - Amazon Customer Service"
  - VERIFIED, 2026-11-09
- **Fact:** Built-in speaker: Fire tablets play audio through their own speakers, so no Bluetooth is needed (Amazon's Fire VoiceView guide mentions no Bluetooth step). UNVERIFIED as a quoted spec: no Fire spec page we fetched lists speakers.
  - For the new Alexa Tablets, Amazon says the 12 Pro has "quad Dolby Atmos speakers" and the 11 has "dual Dolby Atmos speakers". (Alexa Tablets URL below, VERIFIED.)
- **Fact:** Fire tablets are being replaced by Android Alexa Tablets (announced 2026-10-08).
  - Quote: "They seamlessly connect your Amazon experiences right out of the box, run Android, and come with access to the full Google Play Store" and "Built-in Amazon experiences including Prime Video, Kindle, Audible, and Amazon Music".
  - URL: https://www.aboutamazon.com/news/devices/new-amazon-alexa-tablets-alexa-plus
  - Page title: "New Amazon Alexa Tablets with Alexa+ built in: details, availability, and pricing" (article:published_time 2026-10-08)
  - VERIFIED, 2026-11-09
  - Amazon has not said whether Assistive Reader runs on Alexa Tablets. Because they run Android, the Kindle for Android route (and TalkBack and Select to Speak) is the likely path. That is an inference: UNVERIFIED.

## 5. Alexa

- **Fact:** Alexa can read Kindle books through "Kindle Assistive Reader", but not on Alexa+.
  - Quote: "Turn on Kindle Assistive Reader to read books with Alexa and control Alexa's reading with your voice." / "Note: Kindle Assistive Reader isn't available on Alexa+." / "Kindle Assistive Reader is designed to support customers with disabilities to read Kindle books. Kindle Assistive Reader is available on all Alexa built-in devices and uses Alexa's underlying Text-to-Speech capabilities." / "To turn on Kindle Assistive Reader, simply ask Alexa to read a book or turn it on in your Alexa app accessibility settings."
  - Voice controls listed: read a specific title, "Pause, stop, or restart reading the book", "Navigate through your book by chapters, or by time intervals", "Slow down or speed up Alexa's reading speed", "Set or cancel a timer for Alexa to stop reading".
  - URL: https://www.amazon.com/gp/help/customer/display.html?nodeId=TAyb6hr4lsK1J9eK2S
  - Page title: "Use Alexa to Read Your Kindle Books - Amazon Customer Service"
  - VERIFIED, 2026-11-09
- **Fact:** Which books Alexa can read.
  - Quote: "Purchased from the Kindle Store" / "Borrowed from Kindle Unlimited or Prime Reading, or other official Kindle partner sources" / "Shared with you in your Amazon Family Library" / "Books must also support Enhanced Typesetting and be available in one of Alexa's supported languages." / "To see a list of supported books, ask Alexa to "Show my Kindle books," or use the Alexa app."
  - URL: https://www.amazon.com/gp/help/customer/display.html?nodeId=GYDXGLMJXN5D73UN
  - Page title: "Which Books Can Alexa Read with Kindle Assistive Reader? - Amazon Customer Service"
  - VERIFIED, 2026-11-09
  - This page still says "Kindle Unlimited", not Kindle+.
- **Fact:** Turning it on in the Alexa app: Open the Alexa app > More > Settings > Accessibility > Kindle Assistive Reader.
  - URL: https://www.amazon.com/gp/help/customer/display.html?nodeId=T0vuvMLQPkuh4jBLkm
  - Page title: "Turn On Kindle Assistive Reader on Echo Devices with a Screen - Amazon Customer Service"
  - VERIFIED, 2026-11-09
- **Fact:** Where Alexa starts reading: "Alexa starts reading from the most recent page read on any device. To help set context, Alexa may start reading from the previous paragraph from your most recent page."
  - URL: https://www.amazon.com/gp/help/customer/display.html?nodeId=GDNJ68Z4KQE9VRRT
  - Page title: "Syncing Issues with Books Read by Alexa with Kindle Assistive Reader - Amazon Customer Service"
  - VERIFIED, 2026-11-09
- **Fact:** Alexa+ availability: "Alexa+ is now available in the U.S. for $19.99 per month and included at no additional cost to Prime members." The update note reads: "09/01/26: This article has been updated to better describe the Alexa+ tier details, which became free for Prime members in February 2026."
  - URL: https://www.aboutamazon.com/news/devices/alexa-plus-available-free-prime-members-us
  - Page title (HTML title tag): "How to get Alexa Plus free with Prime membership" (article:published_time 2026-02-04)
  - VERIFIED, 2026-11-09
- **Fact:** Amazon help on Alexa+: "Alexa+ is free for Prime customers." and "there's no free experience for Alexa+ on devices (Echo and Fire TV)."
  - URL: https://www.amazon.com/gp/help/customer/display.html?nodeId=T1UrsVvRAUeAWWiHAc
  - Page title: "About Alexa+ - Amazon Customer Service"
  - VERIFIED, 2026-11-09
- **Fact:** Amazon device marketing: "Alexa Smart speakers & displays, tablets, photo frame, and smart home devices, all powered by Alexa+." (on the Kindle Paperwhite product page navigation, https://www.amazon.com/dp/B0CFPJYX7P). VERIFIED, 2026-11-09.
  - Implication for the post: on a new or upgraded Echo running Alexa+, "Alexa, read my Kindle book" is not supported by Amazon's own account. Whether a user can switch back to the original Alexa is not documented on pages we fetched: UNVERIFIED.

## 6. Audible narration, Kindle+ and Read & Listen

- **Fact:** Amazon's store page for Read & Listen (formerly Whispersync for Voice).
  - Quote: "Immersion Reading: Read along while you listen with text highlighting and audio synced in real-time." / "Discounted audiobooks: Have the Kindle eBook? Get the Audible audiobook at a discount."
  - URL: https://www.amazon.com/Whispersync-for-Voice/b?ie=UTF8&node=12527156011
  - Page title: "Amazon.com: Whispersync for Voice - Learn More: Kindle Store"
  - VERIFIED, 2026-11-09
- **Fact:** The "Add audiobook" box on Kindle product pages explains where you can listen and where highlighting works.
  - Quote (modal "Add an Audible audiobook to your Kindle book"): "Save on the Audible audiobook and get a reduced price with the Kindle book." / "Listen on the Kindle App (iOS/Android) when you buy. You can also listen on Fire tablets, Kindle Touch, Kindle Keyboard, Bluetooth enabled Kindle eReaders and the Audible App (iOS/Android/Windows)." / "Immersion Reading is available on the Kindle Apps (iOS/Android) and Fire tablets."
  - URL: https://www.amazon.com/dp/B08FHBV4ZX
  - Page title: "Amazon.com: Project Hail Mary: A Novel eBook : Weir, Andy: Kindle Store"
  - VERIFIED, 2026-11-09
  - So listening to Audible narration is possible on Bluetooth Kindle e-readers, but Amazon lists Immersion Reading (highlighting) only for the Kindle apps on iOS and Android and Fire tablets.
- **Fact: real add-on prices,** anonymous US-dollar session, 2026-11-09. Each figure is the Kindle price, then the "Add audiobook for" price (with the struck-through price Amazon shows next to it).
  - Project Hail Mary (Andy Weir): Kindle $14.99, "Add audiobook for $5.85" (shown next to $25.22). https://www.amazon.com/dp/B08FHBV4ZX. VERIFIED.
  - The Martian (Andy Weir): Kindle $8.99, "Add audiobook for $5.45" (next to $20.52). https://www.amazon.com/dp/B00EMXBDMA, "Amazon.com: The Martian: A Novel eBook : Weir, Andy: Kindle Store". VERIFIED.
  - Atomic Habits (James Clear): Kindle $12.99, "Add audiobook for $12.00" (next to $18.00). https://www.amazon.com/dp/B07D23CFGR, "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones - Kindle edition by Clear, James. Health, Fitness & Dieting Kindle eBooks @ Amazon.com.". VERIFIED.
  - Extra: Wuthering Heights (AmazonClassics Edition): "Add audiobook for $6.92" (next to $21.30). https://www.amazon.com/dp/B073QM98F5. VERIFIED.
  - Prices change daily and may differ when signed in. Write "for example, on November 9, 2026".
- **Fact:** Kindle+ (formerly Kindle Unlimited) includes companion audiobooks on thousands of titles at no extra cost.
  - Quote: "With a Kindle+ subscription, you can access millions of eBooks, audiobooks, comics, manga, and magazines across all genres. Thousands of eBooks also include companion audiobooks, allowing you to switch seamlessly between reading and listening to the same title at no additional cost." (On the page, "magazines" is followed by a dash before "across"; replaced here.)
  - Also: "In the U.S., a Kindle+ subscription costs $11.99 a month plus taxes."
  - Also: "UPDATE: This article was updated on October 22, 2026, to reflect that Kindle Unlimited has been renamed Kindle+."
  - Also: "The Kindle app is available on iOS, Android, Mac, PC, and the web, and it's included on all Amazon Alexa Tablets."
  - URL: https://www.aboutamazon.com/news/devices/what-is-kindle-plus
  - Page title: "Kindle Unlimited is now Kindle+: Everything you need to know" (H1: "Amazon's Kindle+ subscription: Your questions, answered")
  - VERIFIED, 2026-11-09
- **Fact:** KDP's definition: "Kindle+ is a subscription program where customers can enjoy unlimited reading and listening of enrolled books." And: "Audiobooks will show a headphone badge in addition to the Kindle+ badge."
  - URL: https://kdp.amazon.com/en_US/help/topic/G201537300
  - Page title: "Kindle+"
  - VERIFIED, 2026-11-09
- **Fact:** Kindle+ signup page: "Switch seamlessly between reading and listening" and "One subscription with millions of stories to read or listen to, instantly, on any device."
  - URL: https://www.amazon.com/kindle-dbs/hz/subscribe/ku
  - Page title: "Sign up to Kindle+ for a Free Trial"
  - VERIFIED, 2026-11-09
- **Fact:** Prime Reading now presents as a "taste" of Kindle+.
  - Quote, Kindle store navigation: "Prime members can access a curated catalog of eBooks, audiobooks, magazines, comics, and more, that offer a taste of the Kindle+ library."
  - Seen on https://www.amazon.com/Whispersync-for-Voice/b?ie=UTF8&node=12527156011. VERIFIED, 2026-11-09.
  - Amazon still has a store listing titled "Books with Audible Narration in Prime Reading": https://www.amazon.com/s?rh=n%3A16273563011%2Cp_n_feature_nineteen_browse-bin%3A9045887011. VERIFIED that the heading exists. We did not confirm the no-extra-cost terms for Prime members.
- **Fact:** Read & Listen in the Audible app: "The experience is available across iOS, Android, iPad, and Fire tablets for our services worldwide". Also: "All of these Read & Listen experiences are available for more than 800,000 English and German-language titles, with more languages coming in 2027."
  - URL: https://www.audible.com/about/newsroom/audibles-read-and-listen-experience-comes-to-more-listeners-around-the-globe
  - Page title: "Audible's Read & Listen Experience Comes to More Listeners Around the Globe | About Audible" (dated October 26, 2026)
  - VERIFIED, 2026-11-09 (curl with ipRedirectOverride=true)
- **Fact:** Audible help "Learn about Read & Listen". Only the meta description could be read today: "Read & Listen (formerly Whispersync for Voice) is a feature that allows you to seamlessly switch between listening to the audiobook and reading the eBook on Kindle with no action required on your part."
  - URL: https://www.audible.com/help/article/listen-with-whispersync-for-voice
  - Page title: "Learn about Read & Listen"
  - VERIFIED for the meta description only.
  - The details already in /blog/can-you-read-along-with-audible (1-Click card purchase, no Audible credits, refund if the Kindle book is returned, Fire OS 8 and later, macOS app) could NOT be re-checked today because the body is loaded by JavaScript. UNVERIFIED today; they were verified when that post was written.
- **Link target:** /blog/can-you-read-along-with-audible covers Read & Listen in depth.

## 7. Publishers can switch text-to-speech off (2009) and what product pages show now

- **Fact:** Amazon's February 27, 2009 statement.
  - Quote: "Kindle 2's experimental text-to-speech feature is legal: no copy is made, no derivative work is created, and no performance is being given." / "Nevertheless, we strongly believe many rightsholders will be more comfortable with the text-to-speech feature if they are in the driver's seat." / "Therefore, we are modifying our systems so that rightsholders can decide on a title by title basis whether they want text-to-speech enabled or disabled for any particular title."
  - URL: https://press.aboutamazon.com/2009/2/statement-from-amazon-com-regarding-kindle-2s-experimental-text-to-speech-feature
  - Page title: "Statement-from-Amazon.com-Regarding-Kindle-2s-Experimental-Text-to-Speech-Feature - US Press Center" (H1: "Statement from Amazon.com Regarding Kindle 2's Experimental Text-to-Speech Feature"; dateline "SEATTLE, Feb 27, 2009 (BUSINESS WIRE)")
  - VERIFIED, 2026-11-09
- **Fact:** The Authors Guild's response (March 2, 2009).
  - Quote: Amazon said "it would allow publishers (and thereby many authors) to block text-to-speech audio functionality on a title-by-title basis". The Guild called the Kindle 2 "a combination e-book reader and low-quality audiobook device" and the change "a good first step."
  - URL: https://authorsguild.org/news/amazon-reverses-stance-on-computer-generated-audio-for-the-kindle-2/ (fetched as https://authorsguild.org/?p=7694)
  - Page title: "Amazon Reverses Stance on Computer-Generated Audio for the Kindle 2 - The Authors Guild"
  - VERIFIED via WebFetch, 2026-11-09
- **Fact:** Roy Blount Jr., then Authors Guild president, wrote the New York Times op-ed "The Kindle Swindle?". URL: https://www.nytimes.com/2009/02/25/opinion/25blount.html (print date February 25, 2009; blogs date the web version February 24).
  - UNVERIFIED: nytimes.com returned 403 to curl and blocks WebFetch. Headline and date come from search snippets and blogs only. Say "in a February 2009 New York Times op-ed" and quote nothing from it.
- **Fact:** Product pages today show "Screen Reader: Supported", not "Text-to-Speech". The raw HTML of 5 US Kindle product pages fetched today had zero occurrences of "Text-to-Speech". Each listed "Screen Reader : Supported" and "Enhanced typesetting : Enabled":
  - Project Hail Mary (B08FHBV4ZX)
  - The Martian (B00EMXBDMA)
  - Atomic Habits (B07D23CFGR)
  - Wuthering Heights AmazonClassics (B073QM98F5)
  - The Exception to the Rule (B0CL7GMPD4)
  - VERIFIED for these 5 pages, 2026-11-09. A sample of 5 does not prove the line is gone everywhere.
  - Several third-party guides still tell readers to look for "Text-to-Speech: Enabled". Our check contradicts them for the pages we saw.
- **Fact:** What controls what: Amazon's current pages tie Assistive Reader (apps, e-readers, Alexa) to Enhanced Typesetting, the purchase or borrow source, and language. They tie screen readers to "Screen Reader: Supported" and the "Readable in read aloud and braille" accessibility label. No current Amazon page we fetched says whether the 2009 publisher text-to-speech switch still exists or whether it blocks Assistive Reader. UNVERIFIED either way; do not claim it does or does not.

## 8. Phone screen readers as a fallback

- **Fact:** Amazon documents VoiceOver in the Kindle app for iOS.
  - Quote: "The Kindle reading app for iOS supports the VoiceOver accessibility feature." / "Read continuously and have the pages turn automatically. Swipe down using two fingers." / "Pause or resume reading. Tap once with two fingers." / "Go to the next page. Swipe left with three fingers."
  - Path: Settings > Accessibility > (Vision) VoiceOver > On.
  - URL: https://www.amazon.com/gp/help/customer/display.html?nodeId=G4PD9B7BHV4GQP5U
  - Page title: "Use VoiceOver with the Kindle App on iOS - Amazon Customer Service"
  - VERIFIED, 2026-11-09
- **Fact:** Amazon documents TalkBack in the Kindle app for Android.
  - Quote: "Kindle Reading app on Android supports the TalkBack accessibility feature." / "Read continuously and have the pages turn automatically. Swipe down then right to open the TalkBack menu. Then, choose "Read from focused item"." / "After you turn on TalkBack, spoken feedback begins immediately."
  - URL: https://www.amazon.com/gp/help/customer/display.html?nodeId=GFEDJC3YY98GPZW7
  - Page title: "Use TalkBack with the Kindle App on Android - Amazon Customer Service"
  - VERIFIED, 2026-11-09
- **Fact:** iPhone Speak Screen, iOS 26 naming ("Read & Speak").
  - Quote: "Tap Accessibility, then tap Read & Speak." / "Speak Screen: Tap Speak Screen, then turn on Speak Screen to have iPhone read all text on the screen" / "Hear all text on the screen (if you turned on Speak Screen): Swipe down with two fingers from the top of the screen." / "Use the controls that appear to pause speaking, adjust the rate" / "Siri: Ask Siri something like, "Speak screen."" / "Voices: Choose a voice and dialect." / "Speaking Rate: Drag the slider."
  - Speak Screen also has a "Highlighting" option: "Customize the highlight style, color, and selection for in-app text that is spoken aloud."
  - URL: https://support.apple.com/guide/iphone/hear-whats-on-the-screen-or-typed-iph96b214f0/26/ios/26
  - Page title: "Hear iPhone speak the screen, selected text, and typing feedback - Apple Support"
  - VERIFIED, 2026-11-09
  - Amazon does NOT document Speak Screen for the Kindle app. Vendor pages claim it works; we have not tested it.
- **Fact:** iOS 26 Accessibility Reader.
  - Quote: "With Accessibility Reader on iPhone, you can read or listen to text in a full-screen view" and "You can use Accessibility Reader with any app on your iPhone."
  - Start it: "triple-click the side button on your iPhone, then tap Accessibility Reader" (if added to Accessibility Shortcuts) or from Control Center.
  - URL: https://support.apple.com/guide/iphone/read-listen-text-apps-accessibility-reader-iph406a46ab8/26/ios/26
  - Page title: "Read or listen to text in apps with Accessibility Reader on iPhone - Apple Support"
  - VERIFIED, 2026-11-09. Not tested with the Kindle app.
- **Fact:** Android Select to Speak.
  - Quote: "You can select items on your screen and hear them read or described aloud with Select to Speak for Android." / "Tap Accessibility, then tap Select to Speak." / "To hear everything, tap Play." / "When the player is open, use the buttons to pause or play, skip forward or backward, and to increase or decrease speed." / "Some of these steps work only on Android 11.0 and up."
  - Shortcut: "2-finger swipe up (3-finger swipe if TalkBack is on), or tap the Accessibility button".
  - URL: https://support.google.com/accessibility/android/answer/7349565
  - Page title: "Use Select to Speak - Android Accessibility Help"
  - VERIFIED, 2026-11-09. Amazon does not document Select to Speak for the Kindle app.
- **Already on site, not re-fetched today:** Apple "Turn on and practice VoiceOver on iPhone", Apple "Use VoiceOver gestures on iPhone", Google "Turn on TalkBack" and "Get started on Android with TalkBack" (see the Libby post Sources).

## 9. "Turn my Kindle book into an audiobook" and "listen to Kindle books for free"

Amazon's own options, all VERIFIED above:

- **Free:** Assistive Reader in the Kindle app (synthetic voice, highlighting).
- **Free:** Assistive Reader on 11th generation and newer Kindles, Scribe and Colorsoft, with Bluetooth audio.
- **Free:** VoiceView on e-readers (Bluetooth) and Fire tablets.
- **Free:** Alexa, original Alexa only, not Alexa+.
- **Free:** phone screen readers documented by Amazon (VoiceOver, TalkBack) and Kindle for Windows screen readers (Narrator, NVDA, JAWS).
- **Paid:** "Add audiobook" Audible narration at a discount (section 6 prices).
- **Subscription:** Kindle+ companion audiobooks "at no additional cost" ($11.99 a month in the US).

For authors (to turn their own Kindle book into an audiobook):

- **Fact:** KDP virtual voice beta.
  - Quote: "KDP authors in the beta can create audiobooks with virtual voice (computer-generated narration)". Authors choose "from 80 voices" and set "a list price between $3.99 and $14.99". "Audiobooks created by virtual voice are clearly labeled". It launched "in beta to the U.S. marketplace".
  - URL: https://kdp.amazon.com/en_US/help/topic/G3QRL9HQNF273Q2H
  - Page title: "Learn more about audiobooks with virtual voice"
  - VERIFIED, 2026-11-09
  - KDP Kindle+ page: "Audiobooks with virtual voice are automatically enrolled in KDP Select when your corresponding eBook is enrolled." (G201537300, VERIFIED)

Third-party apps (vendor claims, label them as such):

- **ElevenReader (vendor claim):**
  - Quote: "Your Kindle library, made listenable in stunningly natural voices for the books you already own."
  - Step 2: "Open a Kindle book you own: Access your own Kindle online account to view books you already have access to" (the page goes on: "a Kindle subscription may be required").
  - Also: "ElevenReader reads any page you open" and "No copying, no uploading. Open the page, press play, and it reads aloud live."
  - Pricing: "Our free plan offers 10 hours of listening every month, no payment required." It also sells a Chrome extension ("Add to Chrome").
  - Reading of the method: it reads Kindle pages as you open them in your online Kindle account (in effect Kindle for Web inside its app or extension). It does not import Kindle files.
  - URL: https://elevenreader.io/kindle-read-aloud
  - Page title: "Kindle Read Aloud: Listen to Kindle Books with Natural Voices | ElevenReader"
  - VERIFIED (that the vendor says this), 2026-11-09. Not tested.
  - The same page claims iPhone Speak Screen reads Kindle "at 0.5x to 2x speed" and that VoiceView works on "Paperwhite (10th gen and newer) and Oasis". Do not reuse these vendor claims.
- **Speechify (vendor claim, method not explained):**
  - Quote: "In addition it pairs well on kindle readers." and "Imagine reading your favorite e-book on your Kindle app, and when you need to take a break, simply switch to Text-to-Speech mode."
  - Its general page says "You can upload any document format such as PDF, DOCX, TXT, EPUB and read them aloud", which is not Kindle-specific.
  - URL: https://speechify.com/blog/text-to-speech-amazon/
  - Page title: "How to use text to speech on Amazon | Speechify"
  - VERIFIED (vendor wording), 2026-11-09
  - We found no Speechify help article explaining how it reads purchased Kindle books. Third-party blogs say it relies on its Chrome extension at read.amazon.com, and some report it reads scrambled text there. UNVERIFIED.
- **NaturalReader (vendor help page):** works by logging into Kindle for Web.
  - Quote: "Login to your Kindle account from https://read.amazon.com/", "Open a book from your Kindle Library", then press the "Play button to start listening".
  - URL: https://help.naturalreaders.com/en/articles/6214013-chrome-extension-reading-with-kindle-online
  - Page title: "Reading with Kindle Online (Chrome Extension) | NaturalReader Help Center"
  - VERIFIED via WebFetch, 2026-11-09
- **Takeaway for the writer:** none of these vendors say they import Kindle book files. They read the pages that Kindle for Web shows in a browser. No DRM removal is recommended or needed for any route in this post.

## 10. Synthetic voice vs human narration: evidence

Every DOI below was checked against api.crossref.org on 2026-11-09. Titles, venues, years and first authors match what we expected unless noted. Abstracts and full texts were fetched by the research sub-agent and marked VERIFIED where it read the abstract or paper.

- **Cambre, Colnago, Maddock, Tsai and Kaye (2020)**
  - Crossref: title "Choice of Voices", subtitle "A Large-Scale Evaluation of Text-to-Speech Voice Quality for Long-Form Content"; venue "Proceedings of the 2020 CHI Conference on Human Factors in Computing Systems"; issued 2020-04-21; first author Cambre. DOI 10.1145/3313831.3376789. Crossref splits title and subtitle.
  - Design: crowdsourced evaluation of 18 TTS voices, 3 human recordings and a text-only control.
  - Quote from abstract: "TTS voices are close to rivaling human voices, yet no single voice outperforms the others across all evaluation dimensions."
  - Total participant N: not in the abstract, paper blocked (403). UNVERIFIED. A Mozilla blog says 50 Mechanical Turk listeners per recording; do not use that number.
  - VERIFIED (abstract only).
- **Govender and King (2018), pupillometry**
  - Crossref: "Using Pupillometry to Measure the Cognitive Load of Synthetic Speech"; Interspeech 2018; issued 2018-09-02; Govender. DOI 10.21437/Interspeech.2018-1174.
  - N = 45 native English speakers aged 19 to 37 (3 experiments of 15). Stimuli were short sentences from 2010 and 2011 Blizzard systems (pre-neural).
  - Quote: "In all cases, synthetic speech imposes a higher cognitive load than natural speech."
  - VERIFIED.
- **Govender and King (2018), dual task**
  - Crossref: "Measuring the Cognitive Load of Synthetic Speech Using a Dual Task Paradigm"; Interspeech 2018; issued 2018-09-02; Govender. DOI 10.21437/Interspeech.2018-1199.
  - N = 20 per experiment, 2 experiments.
  - Quote: "reaction times slow down as speech quality reduces" but "natural speech did not have the fastest reaction times."
  - VERIFIED.
- **Govender, Wagner and King (2019)**
  - Crossref: "Using Pupil Dilation to Measure Cognitive Load When Listening to Text-to-Speech in Quiet and in Noise"; Interspeech 2019; issued 2019-09-15; Govender. DOI 10.21437/Interspeech.2019-1783.
  - N = 30.
  - Quote: "in quiet listening conditions, pupil dilation does not reflect listening effort but rather attention and engagement."
  - This partly revises how the 2018 pupillometry result should be read. VERIFIED.
- **Govender, Valentini-Botinhao and King (2019)**
  - Crossref: "Measuring the contribution to cognitive load of each predicted vocoder speech parameter in DNN-based speech synthesis"; 10th ISCA Workshop on Speech Synthesis (SSW 10); issued 2019-09-20; Govender. DOI 10.21437/SSW.2019-22.
  - Quote: listening to "even high quality text-to-speech ... still requires greater cognitive effort than natural speech, under noisy conditions."
  - N not checked. VERIFIED (abstract).
- **Paris, Thomas, Gilson and Kincaid (2000)**
  - Crossref: "Linguistic Cues and Memory for Synthetic and Natural Speech"; Human Factors: The Journal of the Human Factors and Ergonomics Society; issued 2000-09; Paris. DOI 10.1518/001872000779698132.
  - Quote: "inappropriate prosodic modeling in synthetic speech was the major source of a performance differential between natural and synthetic speech."
  - N not in abstract. VERIFIED (abstract).
- **Duffy and Pisoni (1992), narrative review**
  - Crossref: "Comprehension of Synthetic Speech Produced by Rule: A Review and Theoretical Interpretation"; Language and Speech; issued 1992-10; Duffy. DOI 10.1177/002383099203500401.
  - VERIFIED (abstract).
  - Winters and Pisoni (2004) is an Indiana University progress report with no DOI, not opened. Do not cite.
- **Wester, Watts and Henter (2016): the only long-passage comprehension test found**
  - Crossref: "Evaluating comprehension of natural and synthetic conversational speech"; Speech Prosody 2016; issued 2016-05-31; Wester. DOI 10.21437/SpeechProsody.2016-157.
  - N = 36 listeners, three 10-minute radio interviews, natural speech vs DNN parametric TTS.
  - Results: natural 74% correct vs TTS 70%, not significant. TTS with forced-aligned durations scored 61%, which was significant.
  - Full text: "many participants said that synthetic speech was more difficult to focus on".
  - VERIFIED.
- **Simantiraki, Wagner and Cooke (2023)**
  - Crossref: "The impact of speech type on listening effort and intelligibility for native and non-native listeners"; Frontiers in Neuroscience; issued 2023-09-28; Simantiraki. DOI 10.3389/fnins.2023.1235911.
  - N = 26 native and 31 non-native listeners, sentences in noise.
  - Quote: synthetic speech had the lowest intelligibility and highest subjective effort ("the reverse was true for synthetic speech").
  - VERIFIED.
- **Ahrens-Schwabe, Kosch, Stocker and Boomgaarden (2026), audiobook excerpts**
  - Crossref: "Who cares about artificial intelligence? Human and artificial voices in audiobooks"; Computers in Human Behavior Reports; issued 2026-05; Ahrens-Schwabe. DOI 10.1016/j.chbr.2026.101068.
  - Quote: "differences in listener evaluations between AI-generated and human voices were minute."
  - N and excerpt length UNVERIFIED (full text blocked). VERIFIED (abstract).
- **Rodero and Lucas (2021 online, 2023 print), audiobooks**
  - Crossref: "Synthetic versus human voices in audiobooks: The human emotional intimacy effect"; New Media & Society; issued 2021-06-28 (online), print volume 25, 2023; Rodero. DOI 10.1177/14614448211024142.
  - Abstract: listeners "remembered more information" with the human voice.
  - N UNVERIFIED. VERIFIED (abstract).
- **Deng, Zhang, Yu, Jiang and Wang (2026), educational videos**
  - Crossref: "Real versus AI-generated instructors and human versus synthetic voices in educational videos: Impacts on perceived human-likeness, motivation, and knowledge retention"; Education and Information Technologies; issued 2026-07-03; Deng. DOI 10.1007/s10639-026-14085-y.
  - N = 130, 2 x 2 between subjects.
  - Quote: "no direct effects of either instructor or voice type on motivation and knowledge retention."
  - VERIFIED.
- **Dai et al. (2024), primary school classrooms**
  - Crossref: "Text-to-speech and virtual reality agents in primary school classroom environments" (Crossref uses non-breaking hyphen characters in "Text-to-speech"); Journal of Computer Assisted Learning; issued 2024-08-07; Dai. DOI 10.1111/jcal.13046.
  - Quote: "Human voices received superior quality ratings over TTS voices within the classroom context."
  - N UNVERIFIED. VERIFIED (abstract).
- **Kuhne, Fischer and Zhou (2020)** (Crossref spells the first author Kühne)
  - Crossref: "The Human Takes It All: Humanlike Synthesized Voices Are Perceived as Less Eerie and More Likable. Evidence From a Subjective Ratings Study"; Frontiers in Neurorobotics; issued 2020-12-16. DOI 10.3389/fnbot.2020.593732.
  - N = 95 adults, short clips. More humanlike voices were rated less eerie, the reverse of an "uncanny valley".
  - VERIFIED.
- **Clark, Silen, Kenter and Leith (2019)**
  - Crossref: "Evaluating Long-form Text-to-Speech: Comparing the Ratings of Sentences and Paragraphs"; SSW 10; issued 2019-09-20; Clark. DOI 10.21437/SSW.2019-18.
  - Quote: "the traditional way of evaluating sentences in isolation does not suffice."
  - VERIFIED (abstract).
- **Wood, Moxley, Tighe and Wagner (2018) meta-analysis (already on site, re-confirmed)**
  - Crossref: "Does Use of Text-to-Speech and Related Read-Aloud Tools Improve Reading Comprehension for Students With Reading Disabilities? A Meta-Analysis"; Journal of Learning Disabilities; issued 2017-01-23 (online), print 2018 (vol 51, pp. 73 to 84); Wood. DOI 10.1177/0022219416688170.
  - Effect: d-bar = .35 (Hedges g), 95% CI .14 to .56, read-aloud vs no read-aloud.
  - Mismatch to note: the text says "22 remaining studies", but Table 2 lists K = 23 with N = 2,942 participants. Keep "22 studies, g = 0.35" as the site already says, and add the participant count only if the writer cites Table 2.
  - Delivery method (recorded voice .29 vs human reader .44) was not a significant moderator. Study design was the only significant one.
  - VERIFIED (full text via PMC5494021).

**What the evidence does NOT show**

- No study tests Kindle Assistive Reader, Alexa reading or VoiceView.
- No meta-analysis or systematic review of synthetic vs natural speech comprehension was found.
- Passages are seconds to minutes long; the longest are 10-minute interviews (Wester 2016). Nothing is book length, and nothing tracks fatigue over hours.
- The cognitive-load studies (Govender) used pre-neural voices and small samples (15 to 30 per experiment). In quiet, pupil size tracked attention rather than effort.
- No peer-reviewed study compares current neural TTS with a human narrator across a whole audiobook on comprehension. The 2021 to 2026 audiobook studies use excerpts and mostly ratings: Rodero and Lucas found better memory with the human voice; Ahrens-Schwabe and colleagues found minute differences in ratings.
- Wood et al. compares read-aloud tools with silent reading for students with reading disabilities. It is not a TTS vs human comparison and not about adult leisure readers.

## 11. Reading-rate context

- **Fact:** ACX narration rate.
  - Quote: "On average, most performers narrate about 9,300 words per hour."
  - URL: https://help.acx.com/s/article/how-long-will-my-narrated-audiobook-be
  - Page title as rendered: "Narrate an audiobook" (section heading "How long will my narrated audiobook be?")
  - VERIFIED via WebFetch, 2026-11-09. 9,300 an hour is 155 a minute (arithmetic).
- **Fact:** Brysbaert (2019).
  - Crossref: "How many words do we read per minute? A review and meta-analysis of reading rate"; Journal of Memory and Language; issued 2019-12; Brysbaert. DOI 10.1016/j.jml.2019.104047.
  - Quote: "Based on the analysis of 190 studies (18,573 participants), we estimate that the average silent reading rate for adults in English is 238 words per minute (wpm) for non-fiction and 260 wpm for fiction."
  - Also: oral reading averages 183 wpm (77 studies, 5,965 participants).
  - VERIFIED (abstract).

---

## Do not claim

- That Assistive Reader speed runs "0.5x to 3.5x" or any range. Amazon gives no range. The 30-second rewind IS documented.
- That Assistive Reader lets you choose a voice inside the Kindle app. Amazon only says it uses the device's OS-level TTS engine.
- That Assistive Reader works offline, or that it works with Libby or public library loans. Neither is documented.
- That Assistive Reader is in Kindle for Web (browser). Nothing documents it.
- That the main Assistive Reader page lists Windows. It doesn't, though the Windows shortcut page documents Assistive Reader in Kindle for Windows. Say "Amazon's Kindle for Windows help documents Assistive Reader shortcuts".
- That "Alexa, read my Kindle book" works everywhere. Amazon: "Kindle Assistive Reader isn't available on Alexa+." Do not claim you can switch back from Alexa+ (undocumented).
- That Kindle e-readers can read aloud without Bluetooth audio, or that Amazon says "no speaker" in those words. Say audio goes through Bluetooth headphones or speakers.
- That Assistive Reader on e-readers came in a specific firmware version (5.18.4, July 2025). Third-party only.
- That the app version of Assistive Reader launched on a specific date. No Amazon launch date found; the earliest Amazon-dated mention is April 8, 2025.
- That "Text-to-Speech: Enabled" is still shown on Kindle product pages. It was absent on all 5 US pages checked; they say "Screen Reader: Supported".
- That the publisher's 2009-style text-to-speech switch controls (or does not control) Assistive Reader or Alexa. Undocumented today.
- That Fire tablets are still Amazon's current tablet line. Alexa Tablets (Android, Google Play) were announced October 8, 2026. Do not claim Assistive Reader works on Alexa Tablets (undocumented).
- That Immersion Reading (highlighting with Audible narration) works on Kindle e-readers. Amazon lists the Kindle apps for iOS and Android and Fire tablets.
- A typical "Add Audible narration" price or range. Give dated examples only ($5.45, $5.85, $12.00 on November 9, 2026).
- "Kindle Unlimited" as the current name without noting Kindle+ (renamed, About Amazon note dated October 22, 2026).
- That Prime members get Audible narration free on Prime Reading titles. Not confirmed.
- Any quote from Roy Blount Jr.'s NYT op-ed (page not fetched).
- That ElevenReader, Speechify or NaturalReader "import" Kindle books. Their own pages describe reading Kindle for Web pages; Speechify explains no method.
- Vendor claims as fact: Speak Screen "0.5x to 2x" in Kindle, ElevenReader's VoiceView model list.
- "Studies show TTS is as good as a human narrator for books" or "TTS causes fatigue". Neither is shown.
- A Cambre et al. participant total (not in the abstract; paper blocked).

## Ready-to-paste Sources

- [Amazon, "Use Assistive Reader to Read Aloud in Kindle Apps"](https://www.amazon.com/gp/help/customer/display.html?nodeId=TqLHvK6eo6O7DJVQoZ)
- [Amazon, "Accessible Reading Options for Kindle Reading Apps"](https://www.amazon.com/gp/help/customer/display.html?nodeId=TABlJ4ot69emTO8jJG)
- [Amazon, "How to Use the Assistive Reader on Your Kindle"](https://www.amazon.com/gp/help/customer/display.html?nodeId=TdHCSXXqsdhaVKt3Tc)
- [Amazon, "Use VoiceView Over Bluetooth on Kindle"](https://www.amazon.com/gp/help/customer/display.html?nodeId=TKfsDEx2U1RrGi8o1C)
- [Amazon, "Guide to VoiceView Gestures on Your Kindle"](https://www.amazon.com/gp/help/customer/display.html?nodeId=TAy5KCy5PpYSoGtEA3)
- [Amazon, "Connect and Sync Bluetooth to Your Kindle E-Reader"](https://www.amazon.com/gp/help/customer/display.html?nodeId=TIHMXAou9Wm1q17sg5)
- [Amazon, "How to Find Out Your Kindle Model and Generation"](https://www.amazon.com/gp/help/customer/display.html?nodeId=GK33S847NN4V6Y83)
- [Amazon, "Latest Kindle Software Updates and Versions"](https://www.amazon.com/gp/help/customer/display.html?nodeId=GKMQC26VQQMM8XSW)
- [Amazon, "Kindle Paperwhite 16 GB | Fastest Kindle E-Reader"](https://www.amazon.com/dp/B0CFPJYX7P)
- [Amazon, "Install or Update the Kindle App for Desktop"](https://www.amazon.com/gp/help/customer/display.html?nodeId=TlLrSvAdaGJObw5fIG)
- [Amazon, "Kindle for Windows Accessibility Features"](https://www.amazon.com/gp/help/customer/display.html?nodeId=G74WVD3PVFJ8N3KL)
- [Amazon, "Kindle for Windows Keyboard Shortcuts"](https://www.amazon.com/gp/help/customer/display.html?nodeId=GPC7U392HH93VPC8)
- [Amazon, "Kindle for Mac Keyboard Shortcuts"](https://www.amazon.com/gp/help/customer/display.html?nodeId=GFBT6Y7AFLJY947N)
- [Amazon, "Customize Kindle for Web"](https://www.amazon.com/gp/help/customer/display.html?nodeId=TT200NNkr2BE4Jnsy9)
- [Amazon, "Use VoiceOver with the Kindle App on iOS"](https://www.amazon.com/gp/help/customer/display.html?nodeId=G4PD9B7BHV4GQP5U)
- [Amazon, "Use TalkBack with the Kindle App on Android"](https://www.amazon.com/gp/help/customer/display.html?nodeId=GFEDJC3YY98GPZW7)
- [Amazon, "Learn About Accessibility Information for Kindle Books"](https://www.amazon.com/gp/help/customer/display.html?nodeId=TzZzGnAX8N8zL1qWfT)
- [Amazon, "Guide to Reading Books with VoiceView on Fire Tablet"](https://www.amazon.com/gp/help/customer/display.html?nodeId=Tlyb2fwnqEsM9z3lb8)
- [Amazon, "Guide to Speak Selection for Fire Tablet"](https://www.amazon.com/gp/help/customer/display.html?nodeId=Tg6KhWuGJgXz2yPpQd)
- [Amazon, "Other Reading Accessibility Settings on Fire Tablet"](https://www.amazon.com/gp/help/customer/display.html?nodeId=TjCHGCnIKBM42lnQrE)
- [Amazon, "Use Alexa to Read Your Kindle Books"](https://www.amazon.com/gp/help/customer/display.html?nodeId=TAyb6hr4lsK1J9eK2S)
- [Amazon, "Which Books Can Alexa Read with Kindle Assistive Reader?"](https://www.amazon.com/gp/help/customer/display.html?nodeId=GYDXGLMJXN5D73UN)
- [Amazon, "Turn On Kindle Assistive Reader on Echo Devices with a Screen"](https://www.amazon.com/gp/help/customer/display.html?nodeId=T0vuvMLQPkuh4jBLkm)
- [Amazon, "Syncing Issues with Books Read by Alexa with Kindle Assistive Reader"](https://www.amazon.com/gp/help/customer/display.html?nodeId=GDNJ68Z4KQE9VRRT)
- [Amazon, "About Alexa+"](https://www.amazon.com/gp/help/customer/display.html?nodeId=T1UrsVvRAUeAWWiHAc)
- [About Amazon, "How to get Alexa Plus free with Prime membership"](https://www.aboutamazon.com/news/devices/alexa-plus-available-free-prime-members-us)
- [About Amazon, "Kindle accessibility features like text-to-speech, visual customization, more"](https://www.aboutamazon.com/news/books-and-authors/kindle-accessibility-features-for-all-readers)
- [About Amazon, "Kindle Unlimited is now Kindle+: Everything you need to know"](https://www.aboutamazon.com/news/devices/what-is-kindle-plus)
- [About Amazon, "New Amazon Alexa Tablets with Alexa+ built in: details, availability, and pricing"](https://www.aboutamazon.com/news/devices/new-amazon-alexa-tablets-alexa-plus)
- [Amazon, "Sign up to Kindle+ for a Free Trial"](https://www.amazon.com/kindle-dbs/hz/subscribe/ku)
- [Kindle Direct Publishing, "Kindle+"](https://kdp.amazon.com/en_US/help/topic/G201537300)
- [Kindle Direct Publishing, "Learn more about audiobooks with virtual voice"](https://kdp.amazon.com/en_US/help/topic/G3QRL9HQNF273Q2H)
- [Amazon, "Whispersync for Voice - Learn More: Kindle Store"](https://www.amazon.com/Whispersync-for-Voice/b?ie=UTF8&node=12527156011)
- [Amazon, "Project Hail Mary: A Novel eBook" (Kindle product page)](https://www.amazon.com/dp/B08FHBV4ZX)
- [Amazon, "The Martian: A Novel eBook" (Kindle product page)](https://www.amazon.com/dp/B00EMXBDMA)
- [Amazon, "Atomic Habits" (Kindle product page)](https://www.amazon.com/dp/B07D23CFGR)
- [Audible Help, "Learn about Read & Listen"](https://www.audible.com/help/article/listen-with-whispersync-for-voice)
- [Audible newsroom (October 26, 2026), "Audible's Read & Listen Experience Comes to More Listeners Around the Globe"](https://www.audible.com/about/newsroom/audibles-read-and-listen-experience-comes-to-more-listeners-around-the-globe)
- [Amazon (February 27, 2009), "Statement from Amazon.com Regarding Kindle 2's Experimental Text-to-Speech Feature"](https://press.aboutamazon.com/2009/2/statement-from-amazon-com-regarding-kindle-2s-experimental-text-to-speech-feature)
- [The Authors Guild (March 2, 2009), "Amazon Reverses Stance on Computer-Generated Audio for the Kindle 2"](https://authorsguild.org/news/amazon-reverses-stance-on-computer-generated-audio-for-the-kindle-2/)
- [Apple Support, "Hear iPhone speak the screen, selected text, and typing feedback" (iOS 26)](https://support.apple.com/guide/iphone/hear-whats-on-the-screen-or-typed-iph96b214f0/26/ios/26)
- [Apple Support, "Read or listen to text in apps with Accessibility Reader on iPhone" (iOS 26)](https://support.apple.com/guide/iphone/read-listen-text-apps-accessibility-reader-iph406a46ab8/26/ios/26)
- [Android Accessibility Help, "Use Select to Speak"](https://support.google.com/accessibility/android/answer/7349565)
- [ElevenReader, "Kindle Read Aloud: Listen to Kindle Books with Natural Voices" (vendor page)](https://elevenreader.io/kindle-read-aloud)
- [NaturalReader Help Center, "Reading with Kindle Online (Chrome Extension)" (vendor page)](https://help.naturalreaders.com/en/articles/6214013-chrome-extension-reading-with-kindle-online)
- [Speechify, "How to use text to speech on Amazon" (vendor page)](https://speechify.com/blog/text-to-speech-amazon/)
- [ACX, "How long will my narrated audiobook be?"](https://help.acx.com/s/article/how-long-will-my-narrated-audiobook-be)
- [Cambre, Colnago, Maddock, Tsai and Kaye (2020), "Choice of Voices: A Large-Scale Evaluation of Text-to-Speech Voice Quality for Long-Form Content", Proceedings of the 2020 CHI Conference on Human Factors in Computing Systems](https://doi.org/10.1145/3313831.3376789)
- [Govender and King (2018), "Using Pupillometry to Measure the Cognitive Load of Synthetic Speech", Interspeech 2018](https://doi.org/10.21437/Interspeech.2018-1174)
- [Govender and King (2018), "Measuring the Cognitive Load of Synthetic Speech Using a Dual Task Paradigm", Interspeech 2018](https://doi.org/10.21437/Interspeech.2018-1199)
- [Govender, Wagner and King (2019), "Using Pupil Dilation to Measure Cognitive Load When Listening to Text-to-Speech in Quiet and in Noise", Interspeech 2019](https://doi.org/10.21437/Interspeech.2019-1783)
- [Govender, Valentini-Botinhao and King (2019), "Measuring the contribution to cognitive load of each predicted vocoder speech parameter in DNN-based speech synthesis", 10th ISCA Workshop on Speech Synthesis (SSW 10)](https://doi.org/10.21437/SSW.2019-22)
- [Paris, Thomas, Gilson and Kincaid (2000), "Linguistic Cues and Memory for Synthetic and Natural Speech", Human Factors](https://doi.org/10.1518/001872000779698132)
- [Duffy and Pisoni (1992), "Comprehension of Synthetic Speech Produced by Rule: A Review and Theoretical Interpretation", Language and Speech](https://doi.org/10.1177/002383099203500401)
- [Wester, Watts and Henter (2016), "Evaluating comprehension of natural and synthetic conversational speech", Speech Prosody 2016](https://doi.org/10.21437/SpeechProsody.2016-157)
- [Simantiraki, Wagner and Cooke (2023), "The impact of speech type on listening effort and intelligibility for native and non-native listeners", Frontiers in Neuroscience](https://doi.org/10.3389/fnins.2023.1235911)
- [Ahrens-Schwabe, Kosch, Stocker and Boomgaarden (2026), "Who cares about artificial intelligence? Human and artificial voices in audiobooks", Computers in Human Behavior Reports](https://doi.org/10.1016/j.chbr.2026.101068)
- [Rodero and Lucas (2021), "Synthetic versus human voices in audiobooks: The human emotional intimacy effect", New Media & Society](https://doi.org/10.1177/14614448211024142)
- [Deng, Zhang, Yu, Jiang and Wang (2026), "Real versus AI-generated instructors and human versus synthetic voices in educational videos: Impacts on perceived human-likeness, motivation, and knowledge retention", Education and Information Technologies](https://doi.org/10.1007/s10639-026-14085-y)
- [Dai et al. (2024), "Text-to-speech and virtual reality agents in primary school classroom environments", Journal of Computer Assisted Learning](https://doi.org/10.1111/jcal.13046)
- [Kühne, Fischer and Zhou (2020), "The Human Takes It All: Humanlike Synthesized Voices Are Perceived as Less Eerie and More Likable. Evidence From a Subjective Ratings Study", Frontiers in Neurorobotics](https://doi.org/10.3389/fnbot.2020.593732)
- [Clark, Silen, Kenter and Leith (2019), "Evaluating Long-form Text-to-Speech: Comparing the Ratings of Sentences and Paragraphs", 10th ISCA Workshop on Speech Synthesis (SSW 10)](https://doi.org/10.21437/SSW.2019-18)
- [Wood, Moxley, Tighe and Wagner (2018), "Does Use of Text-to-Speech and Related Read-Aloud Tools Improve Reading Comprehension for Students With Reading Disabilities? A Meta-Analysis", Journal of Learning Disabilities](https://doi.org/10.1177/0022219416688170)
- [Brysbaert (2019), "How many words do we read per minute? A review and meta-analysis of reading rate", Journal of Memory and Language](https://doi.org/10.1016/j.jml.2019.104047)

Rodero and Lucas: Crossref "issued" is the 2021 online date; the print volume is 2023. Use one year consistently.
