# Platform research: "Does Kindle Paperwhite support Immersion Reading?" (2026-11-10)

Platform researcher output for slug `immersion-reading-kindle-paperwhite`. Read-only research; no other repo file was changed.

**How this was checked.** Every page below was read on **November 10, 2026**.
- "Chrome" = opened in headed Google Chrome through the repo's Playwright (`createRequire('D:/hushbook.app/package.json')`, `chromiumSandbox: true`, `channel: 'chrome'`, `headless: false`), page text saved from `document.body.innerText`.
- "curl" = static HTML fetched with a browser user agent, tags stripped with a `python -I` script.
- Scripts and raw captures: `C:\Users\rakes\AppData\Local\Temp\claude\34842c9e8e99357b\79be317d-7c26-4857-84db-69018ba4c3a5\scratchpad\platform\` (`grab.mjs`, `grab2.mjs`, `serp.mjs`, `kugs.py`; captures in `pages1` to `pages5`, `curl`, `kug`, `reddit`).
- Reddit comment text and scores came from the Arctic Shift API by thread ID (reddit.com itself serves a JS challenge).

**Status key.** VERIFIED = the quoted page says it, read today. UNVERIFIED = third-party or user reports only, or the page could not be read. NOT STATED = the relevant official pages are silent; do not fill the gap. CONFLICT = two official pages disagree.

**Locale notes.**
- The machine is in India. Amazon pages show "Deliver to India" and INR prices; only wording is usable, never prices.
- `help.audible.com/s/article/...` now 302-redirects to `www.audible.com/help/article/...`, and audible.com geo-redirects to audible.in. The US article loads only with `?ipRedirectOverride=true`. Cite the clean US URL (without the parameter) in the post.
- Audible's article "what-is-immersion-reading" (cited by search summaries) no longer exists; it redirects to the Help Center home. Anything a search summary attributes to it is stale.

---

## Quick answer for the writer

**No Kindle e-reader does Immersion Reading.** That covers every Paperwhite (10th, 11th, 12th generation, Signature, 2026), the basic Kindle, Colorsoft, Scribe and Oasis. Every e-ink model listed below plays Audible audiobooks over Bluetooth and lets you **switch** between the ebook and the audiobook at the same spot. None of them highlights the words while the narrator reads. Immersion Reading (highlighted text in sync with Audible narration) runs on:
- Fire tablets
- the Kindle apps for iOS and Android (per Amazon)
- the Audible app on iPhone, iPad, Android, Fire and macOS (per Audible)

There is no documented route on a Windows PC.

| Device | Immersion Reading (words highlighted with Audible narration) | Audible playback | Switch reading/listening | Assistive Reader (computer voice, words underlined) | Main source |
|---|---|---|---|---|---|
| Kindle Paperwhite 10th gen (2018) | No | Yes, Bluetooth | Yes | No (pre-11th gen) | PW10 user guide; product modal |
| Kindle Paperwhite 11th gen (2021), incl. Signature Edition | No | Yes, Bluetooth | Yes | Yes | PW11 user guide; Amazon forum staff 2023 |
| Kindle Paperwhite 12th gen (2024), incl. Signature Edition | No | Yes, Bluetooth | Yes | Yes | PW12 user guide; PW 2024 product page |
| Kindle Paperwhite / Signature (2026 release) | No | Yes, Bluetooth | Yes | Yes (user guide) | 2026 user guides |
| Kindle 11th gen (2022, 2024) and Kindle (2026) | No | Yes, Bluetooth | Yes | Yes | user guides |
| Kindle Colorsoft (2024/2025) and Colorsoft (2026) | No | Yes, Bluetooth | Yes | Yes | user guides; Amazon forum staff 2025 |
| Kindle Scribe (2022, 2024, 3rd gen, Scribe Colorsoft) | No | Yes, Bluetooth | Yes | Yes | user guides |
| Kindle Oasis (9th gen 2017, 10th gen 2019) | No | Yes, Bluetooth | Yes | No | Oasis user guide; 2017 press release |
| Fire tablets | **Yes** (Kindle app: FireOS 7 and above; Audible app: FOS8 and above) | Yes, built-in speaker | Yes | Yes (Kindle app) | Amazon Fire help; Audible help |

"No" for Immersion Reading rests on three things, none of which is a sentence saying "the Paperwhite can't":
- Amazon's product-page wording names only "the Kindle Apps (iOS/Android) and Fire tablets" (section 1).
- Audible's immersion device list has no Kindle e-reader (section 2).
- None of the 16 Amazon e-reader user guides checked mentions Immersion Reading, while all of them describe switching (section 4).

Amazon forum staff have also said no for the Paperwhite (2023) and the Colorsoft (2025), but other Amazon reps have said yes (section 10). Write: "Amazon lists Immersion Reading only for its Kindle apps and Fire tablets."

---

## 1. Amazon's statement of where Immersion Reading works

- **Product-page wording (the "Add Audible narration" pop-up on Kindle ebook pages).** VERIFIED (curl, Nov 10, 2026). "Read and listen at the same time with Immersion Reading, which immerses you in a story by narrating and highlighting the text as you read. Immersion Reading is available on the Kindle Apps (iOS/Android) and Fire tablets." Same pop-up, listening devices: "Listen on the Kindle App (iOS/Android) when you buy. You can also listen on Fire tablets, Kindle Touch, Kindle Keyboard, Bluetooth enabled Kindle eReaders and the Audible App (iOS/Android/Windows)." Example page: https://www.amazon.com/Project-Hail-Mary-Andy-Weir-ebook/dp/B08FHBV4ZX. Note: "Audible App (... Windows)" is stale; Audible discontinued its Windows app (section 3).
- **Read & Listen store page.** VERIFIED (Chrome). H1 "Enable Read & Listen for the books in your library". The page lists three features:
  - "Seamless syncing: Switch between reading and listening across supported devices without losing your place."
  - "Immersion Reading: Read along while you listen with text highlighting and audio synced in real-time."
  - "Discounted audiobooks: Have the Kindle eBook? Get the Audible audiobook at a discount."

  https://www.amazon.com/Whispersync-for-Voice/b?ie=UTF8&node=12527156011. The page names no devices for Immersion Reading. Its "See supported devices" link was not followed; its target was not captured.
- **Kindle app reading options.** VERIFIED (Chrome). Under the More tab for the Android/iOS apps, and again under macOS: "Real-time Text Highlighting: Highlights words while either Assistive Reader or Audible narrates your text." The macOS section adds: "Tip: In addition to visual adjustments to your content, you can add audio with Immersion Reading. Using Audible's Whispersync with Voice, Immersion Reading allows you to simultaneously read a Kindle book while listening to the Audible version of the book." The "Visual Adjustment Options for PC" section has no such line. https://www.amazon.com/gp/help/customer/display.html?nodeId=TABlJ4ot69emTO8jJG
- **Fire tablets.** VERIFIED (Chrome). Heading "Immersion Reading with Audible on Fire Tablet". "Note: This feature is available on Fire Tablets with FireOS 7 and above. Switch between reading and listening with Audible audiobooks. Synchronized highlighting of the text is available while the audio is playing." https://www.amazon.com/gp/help/customer/display.html?nodeId=TjCHGCnIKBM42lnQrE
- **E-ink Kindles: switching only, over Bluetooth.** VERIFIED (curl; headed Chrome returned "Page Not Found" once at about 11:55 IST, curl got the full page minutes later, so treat it as live but flaky). Breadcrumb: Kindle E-Reader Help > Device and Account Settings for Kindle E-Reader. "Use a paired Bluetooth audio device to switch between your Kindle e-book and the matching Audible audiobook without losing your place." https://www.amazon.com/gp/help/customer/display.html?nodeId=TZkqDMewOPQ0FqrSqX (steps in section 7). The page never mentions highlighting.
- **Older Amazon narration page.** VERIFIED (Chrome; served with an empty `<title>`). H1 "Switch between reading and listening with Audible audiobooks". "Syncing titles between multiple devices is available on both borrowed and purchased titles. To experience Immersion Reading and use the Audible player in Kindle apps, titles must be purchased." Device tabs: Mobile, Tablets, Fire Tablets, Kindle E-Reader. The Kindle E-Reader tab is stale: "Make sure your Kindle Keyboard is connected to Wi-Fi to get your audiobook. From the main menu, click on Archived Items". The Fire Tablets tab says: "Tap on the overflow menu, then Immersion Reading, to return to your book and switch between reading and listening". https://www.amazon.com/hz/audible/narrationhelp/ (Do not use its e-reader steps.)
- **An Amazon "Immersion Reading" help article by that name.** NOT FOUND. Searches turned up no current amazon.com help node titled Immersion Reading. The pages above are what Amazon has.
- **Kindle app store listings.** VERIFIED (curl). App Store and Google Play both say: "When you can’t read, listen. Switch seamlessly from reading your Kindle book to listening to the Audible book, all within the Kindle app." They also mention "Kindle books (including those with Audible narration)". Neither listing says "Immersion Reading" or describes highlighting. https://apps.apple.com/us/app/amazon-kindle-reading-app/id302584613 and https://play.google.com/store/apps/details?id=com.amazon.kindle

## 2. Audible's statements (Read & Listen and immersion reading)

- **"Learn about immersion reading" (Audible help).** VERIFIED (Chrome, US version). https://www.audible.com/help/article/learn-about-immersion-reading
  - "Immersion reading lets you read and listen to a book at the same time. The text highlights as the narrator reads, so you can follow along in the Kindle eBook while listening to the audiobook. This feature is available for titles that support Read & Listen."
  - "Note: Immersion reading uses the professional narrator from your audiobook, not text-to-speech."
  - Needs: "Both the Read & Listen supported versions of the audiobook and Kindle eBook for the same title." and "An internet connection: the eBook text loads from the internet in the Audible app." plus "Note: Some pages are saved so you can still see them without an internet connection."
  - **Device list, complete:** "Audible Mobile Apps (Android, iOS). / Fire Tablet FOS8 and above. / Audible Apps on iPad and Android Tablets. / Audible App for macOS." **No Kindle e-reader, no Windows, no Kindle app.**
  - Start: "Open an audiobook with a Read & Listen badge in the Audible app. / While playing a title, use the toggle above the cover image to switch from Listen to Read & Listen. / Follow along with the highlighted text while you listen."
  - Settings: font style, text size, theme, playback speed, chapter navigation, page turning, "Reading focus", "Dictionary: Press and hold any word to see its definition."
- **"Learn about Read & Listen" (Audible help).** VERIFIED (Chrome, US version). https://www.audible.com/help/article/listen-with-whispersync-for-voice
  - "Read & Listen is a feature that keeps track of where you are when you switch between the audiobook and Kindle eBook. It was formerly called Whispersync for Voice."
  - **Switching device list, complete:** "The following devices support switching between reading and listening: Audible apps (Android, iOS). / Fire Tablet FOS8 and above. / Kindle Ereader devices from 2022 and above. / Kindle Apps (Android, iOS, Fire Tablet, PC)."
  - So the unverified search summary was half right: e-readers appear only in the **switching** list, never in the immersion list.
  - "On the Audible app, you can read while listening to a title or just listening." / "On the Kindle app, you can read and listen, read the eBook, or just listen to audiobooks if you own both formats."
  - Kindle-app handoff: "From your Kindle book, select the 3-dot More menu. / Select Listen on Audible. / Confirm you'd like to open the Audible app."
  - "The product details for a title will say Read & Listen (formerly "Whispersync for Voice-ready") if this feature is available. You can also look for the option to add Audible narration on the Kindle eBook page in Amazon."
  - "Note: Since this is a 1-Click purchase on Amazon, you can only purchase the eBook and audiobook together with your credit card."
- **CONFLICT on e-reader years.** Audible says switching works on "Kindle Ereader devices from 2022 and above". Amazon's own user guides for the Paperwhite 11th gen (released 2021), the Paperwhite 10th gen (2018) and the Oasis 10th gen (2019) all document Audible playback and "Switch to Listening" (section 4). Writer: do not repeat Audible's "2022 and above"; say "Kindle e-readers with Bluetooth audio" and cite the user guides.
- **Audible landing page FAQ.** VERIFIED (curl of static HTML; the Chrome view collapses answers). https://www.audible.com/ep/read-listen. Title "Read & Listen on Audible | Read Along with Synced Narration".
  - "Immersion reading lets you read and listen at the same time, like karaoke for books."
  - "What’s the difference between Read & Listen in the Kindle app and in the Audible app? The experience is similar; you just start from a different place. In the Audible app, you start from the audiobook player and toggle Read & Listen to view the eBook text. In the Kindle app, you start with the eBook and can add audio narration on top."
  - "Does Kindle Unlimited include Read & Listen audio for all eBooks? Availability varies by title. Kindle Unlimited gives you access to many eBooks, but the audiobook isn’t always included."
  - "Whispersync for Voice is now called Read & Listen."
  - Marketplace answer: "the United States, United Kingdom, Canada, France, Germany, Italy, Spain, Japan, India, Brazil, and Australia".
  - **CONFLICT inside the same page:** "Immersion reading and Page Sync are currently available for supported English and German language titles in the United States, United Kingdom, Australia, and Germany." The October 26 press release (below) says immersion reading is rolling out to seven more countries.
- **Audible press release, February 18, 2026.** VERIFIED (Chrome). "Audible Launches Immersion Reading for Deeper Engagement with Books". https://www.audible.com/about/newsroom/audible-launches-immersion-reading-for-deeper-engagement-with-books
  - "We're bringing this functionality, currently available on Kindle, directly into the Audible app"
  - "With hundreds of thousands of titles available at launch, including titles in English, German, Spanish, Italian and French"
  - "The feature is now rolling out to customers in the U.S., with the UK, Australia and Germany to follow in the coming months."
  - "customers instantly able to switch between the “Listen” and “Read & Listen” modes while real-time word-by-word text highlighting stays in sync with the audiobook narration."
- **Audible press release, October 26, 2026.** VERIFIED (Chrome). "Audible’s Read & Listen Experience Comes to More Listeners Around the Globe". https://www.audible.com/about/newsroom/audibles-read-and-listen-experience-comes-to-more-listeners-around-the-globe
  - "Audible’s immersion reading experience, already live in the U.S., UK, Germany, and Australia, is now rolling out to customers in Canada, India, France, Italy, Spain, Japan, and Brazil."
  - "All of these Read & Listen experiences are available for more than 800,000 English and German-language titles, with more languages coming in 2027."
- **ACX (Audible's author side).** VERIFIED (Chrome). https://help.acx.com/s/article/ir-for-acx. Eligible audiobooks must be "Read & Listen supported", "Unabridged", "Published in English or German", and "Available alongside the eBook version, through membership and à la carte purchasing". Availability: "US / UK / Australia / Germany", "More marketplaces are coming soon."

## 3. Computers: Kindle for Windows, Kindle for Mac, Audible on PC

- **Old Kindle for PC is gone; new app needs Windows 11.** VERIFIED (curl). https://www.amazon.com/gp/help/customer/display.html?nodeId=TlLrSvAdaGJObw5fIG
  - "Important: The Legacy Kindle app (previously called Kindle for PC) isn't supported as of June 30, 2026."
  - "Supported Operating Systems: Windows: Windows 11. Mac: OS x 10.14 or higher"
  - "Note: If your operating system isn't supported, use Kindle for Web ."
- **Kindle for Windows: switching yes, Immersion Reading not listed.**
  - Audible's switching list includes "Kindle Apps (Android, iOS, Fire Tablet, PC)" (VERIFIED, section 2).
  - Audible's immersion list has no Windows entry (VERIFIED, section 2).
  - Amazon's product pop-up names only "Kindle Apps (iOS/Android) and Fire tablets" (VERIFIED, section 1).
  - Amazon's reading-options page has no Audible highlighting line for PC (VERIFIED, section 1).
  - Amazon's Kindle for Windows accessibility page covers screen readers only: "Kindle for Windows supportsthe Narrator screen reader that's built into Windows 11, NVDA 2017.1 or higher and JAWS screen reader on Windows computers." (sic) https://www.amazon.com/gp/help/customer/display.html?nodeId=G74WVD3PVFJ8N3KL
  - The Windows keyboard-shortcut page has no Audible content (curl, GPC7U392HH93VPC8).
  - Writer: "Amazon and Audible list no Immersion Reading for Kindle on Windows."
- **Kindle for Mac.** CONFLICT. Amazon's reading-options page lists "Real-time Text Highlighting: Highlights words while either Assistive Reader or Audible narrates your text" under macOS, plus the Immersion Reading tip (VERIFIED, section 1). But the product pop-up names only iOS/Android and Fire, and Audible's lists do not name Kindle for Mac. The Mac keyboard-shortcut page has no Audible content (curl, GFBT6Y7AFLJY947N). Writer: on a Mac, point to the **Audible app for macOS**, which Audible lists (VERIFIED). Do not promise it in Kindle for Mac.
- **Audible on a Windows PC.** VERIFIED (Chrome). "Audible App Download Discontinued on Windows 11". https://www.audible.com/help/article/audible-app-download-discontinued-on-win11
  - "Microsoft discontinued the Amazon Appstore on Windows 11 in March 2024. The Audible Android app is no longer available or supported on Windows 11."
  - "To keep listening to titles in your library, you can use the Audible mobile app for iOS or Android, sign in to Audible.com to listen with the Cloud Player, or listen on your Alexa/Echo devices."
  - "If you want to transfer your titles onto a supported MP3 player, you can do so using AudibleSync."
- **"Audible read and listen on PC": answer.** No documented Windows route. Audible's immersion list has no Windows app or Cloud Player, the Windows app is discontinued, and Kindle for Windows is listed only for switching. A Mac has the Audible app for macOS. Third party (UNVERIFIED, not needed): Audible's Windows 10 app was discontinued January 13, 2022 (search summary of a Softpedia report). The Cloud Player help article URL guessed (`listen-with-the-audible-cloud-player`) redirected to the Help Center home; not read.

## 4. Per-model answers

Amazon publishes an HTML user guide per model; the index is https://www.amazon.com/gp/help/customer/display.html?nodeId=G7N7RPHV2SW8CKBW (VERIFIED, curl). The guides themselves have no `<title>`; the index labels each "Kindle User Guide - American English". All 16 guides below were fetched today (curl) and searched for "Playing Audible books", "Switch to Listening", "Assistive Reader" and "Immersion".

**Shared wording, VERIFIED in every guide that has it:**
- Bluetooth: "To listen to Audible books on your Kindle, you must first pair a Bluetooth audio device, such as headphones, speakers or earbuds."
- To listening: "Switch to Listening : If you are reading a Kindle book with Audible and tap to display the Reading Navigation toolbar, a headphone icon will appear on the bottom right of the screen. Tap the icon to switch to the Audible Player to listen to the audiobook version."
- Back to reading (Paperwhite 11/12/2026, Colorsoft): "Switch to Kindle book : If you own both the audiobook and Kindle book, this option displays. Use it to switch back to the reading experience and pick up reading your book from the same place you were listening." The Kindle 11th gen guide calls it "Switch to ebook".
- Assistive Reader: "With the Assistive Reader, you can listen to your books with Text-to-Speech and read along with synchronized real-time underlining." and "To use Assistive Reader on your Kindle, you must first pair a Bluetooth audio device, such as headphones, speakers, or earbuds." The second line is new: yesterday's research found no Bluetooth line on the Assistive Reader help page, but the user guides now state it.
- **"Immersion" appears in none of the 16 guides** (searched case-insensitive).

| Guide (URL slug under `d1ergij2b6wmg5.cloudfront.net/kug/<slug>/v1/en-US/html/kug.html`) | Playing Audible books | Switch to Listening | Assistive Reader | Immersion |
|---|---|---|---|---|
| `kindle_all_new_paperwhite_v2` (Paperwhite 10th gen; index slot "Kindle Paperwhite (10th Generation)"; the guide's setup text also names the 10th Generation) | yes | yes | no | no |
| `kindle_paperwhite_11th` (also covers the 11th gen Signature Edition, per the index) | yes | yes | yes | no |
| `kindle_paperwhite_12th` (also covers 12th gen Signature) | yes | yes | yes | no |
| `kindle_paperwhite_2026`, `kindle_paperwhite_signature_edition_2026` | yes | yes | yes | no |
| `kindle_11th` (2022), `kindle_11th_2024`, `kindle_2026`, `kindle_aluminum_2026` | yes | yes | yes | no |
| `kindle_colorsoft`, `kindle_colorsoft_2026` | yes | yes | yes | no |
| `kindle_scribe`, `kindle_scribe_2024`, `kindle_scribe_3rd_generation`, `kindle_scribe_colorsoft_1st_generation` | yes | yes | yes | no |
| `kindle_all_new_oasis_v2` (Oasis) | yes | yes | no | no |

Per-model notes:
- **Paperwhite 12th gen (2024) product page.** VERIFIED (curl). The page's "Generation" row says "Kindle Paperwhite (12th Generation) - 2024 release."
  - "Audible audiobook streaming over Bluetooth will reduce battery life."
  - "Formats Supported ... Audible audio format (AAX)."
  - The word "immersion" appears only in the waterproofing line.
  - https://www.amazon.com/clp/B0CFPJYX7P (title "Kindle Paperwhite 16 GB | Fastest Kindle E-Reader | Amazon").
- **Release years** (Amazon identify page, VERIFIED, Chrome, https://www.amazon.com/gp/help/customer/display.html?nodeId=GK33S847NN4V6Y83):
  - "Kindle Paperwhite (11th Generation) ... Released 2021"
  - "Kindle Paperwhite (11th Generation) Signature Edition ... Released 2021"
  - "Kindle Paperwhite (12th Generation) ... Released 2024"
  - "Kindle Oasis (10th Generation) ... Released 2019"
  - The 2026 models are listed by year ("Kindle Paperwhite (2026 release)").
- **Assistive Reader help page (models).** VERIFIED (curl). "Assistive Reader provides you with new options to control TTS (Text-to-Speech) on your Kindle E-Reader 11th Generation and higher, Kindle Scribe, or Kindle Colorsoft." / "Note: Assistive Reader supports books in English, Spanish, French, German, and Italian language." https://www.amazon.com/gp/help/customer/display.html?nodeId=TdHCSXXqsdhaVKt3Tc. The 2026 guides describe Assistive Reader too (resolves yesterday's NOT STATED for 2026 models: the guides say yes).
- **Oasis.** Audible arrived on the Oasis (9th gen) at launch in 2017, and later on the first Oasis via update (section 8). No Assistive Reader in its guide.
- **Fire tablets.** Immersion Reading yes (section 1: FireOS 7 and above in the Kindle app; section 2: FOS8 and above in the Audible app). Both may be true, for different apps.
- **Amazon forum staff, per model** (CONFLICTING, see section 10):
  - Paperwhite, Feb 7, 2023: "Unfortunately, you cannot perform this on the Kindle Paperwhite."
  - Colorsoft, Sep 14, 2025: "Current, the Kindle Colorsoft does not support Immersion Reading. However, it does support audible books"
  - Paperwhite, Oct 12, 2026: "Read & Listen isn't available on the Kindle Paperwhite."
- **Paperwhite Kids product-page note.** UNVERIFIED (quoted second-hand by Amazon staff on the UK forum, Sep 25, 2023): "Note: Kindle devices don’t support Immersion Reading, which lets you listen and read along as the text highlights." https://uk.amazonforum.com/s/question/0D56Q0000CHNxU5SQL/kindle-and-immersion-reading. Not found on the current Paperwhite 2024 page.

## 5. How Immersion Reading works where it is supported

- **What you must have.** VERIFIED. Amazon: "Important: You must own or borrow both the audiobook and eBook versions of a title that supports Read & Listen to use Read & Listen. Kindle+ members who borrow a title listed under the "Books with Audio" label in the Kindle Store or Kindle app automatically receive both versions." https://www.amazon.com/gp/help/customer/display.html?nodeId=TBOgUdeE7YXXcq28Ac. Audible ep FAQ: "Account mismatch. Both purchases need to be on the same Amazon account."
- **Badges.** VERIFIED. Audible: "Read & Listen (formerly "Whispersync for Voice-ready")"; a "Read & Listen" badge next to covers; a Read & Listen library filter. Amazon Fire page: "the product details for an audiobook will say Whispersync for Voice-ready if it’s available. You can also look for the option to add the Audible narration on the Kindle eBook page on Amazon." The Kindle ebook page button reads "Add audiobook for" plus a price (seen in INR; do not print a price).
- **Turn it on.**
  - Audible app: VERIFIED, "Open an audiobook with a Read & Listen badge in the Audible app. While playing a title, use the toggle above the cover image to switch from Listen to Read & Listen."
  - Fire tablet, Kindle app: VERIFIED. "Open the Kindle app on your Tablet and select the book that you’d like to read and listen to. / Tap on the page to invoke the option to download the Audible audiobook. / Tap on the download icon at the bottom of the page. / To begin listening, tap the play icon at the bottom of the page."
  - Kindle app on iPhone (Amazon's older narration page): "tap the highlighted area to download the audiobook. Then, tap the play icon to begin listening."
  - Turn off highlighting (Fire): "Tap the top center of the screen, and then select the reading settings menu Aa. Select More, and then turn off Real-time Text Highlighting."
- **Number of titles.** VERIFIED. "more than 800,000 English and German-language titles" (Audible, Oct 26, 2026). At the February 2026 launch: "hundreds of thousands of titles ... including titles in English, German, Spanish, Italian and French". In 2012: "nearly 15,000 Kindle books and 15,000 Audible audiobooks" (section 8).
- **Languages and countries.** VERIFIED but CONFLICTING (section 2). ACX says English or German titles. Audible's FAQ says English and German titles in 4 countries in one answer and lists 11 marketplaces in another. The October press release says 7 more countries are rolling out.
- **Cost wording (no prices).** VERIFIED.
  - Amazon: "Have the Kindle eBook? Get the Audible audiobook at a discount."
  - Audible: "Customers will also receive discounts on the audiobook version of eligible Kindle eBooks they already own".
  - Audible help: the Add Narration offer is a 1-Click credit-card purchase. "If you later make an eligible return of that Kindle eBook, Audible will automatically give you a refund for the Audible title and remove it from your Library."
  - Older Amazon page: "To experience Immersion Reading and use the Audible player in Kindle apps, titles must be purchased." This conflicts with the newer Kindle+ borrowing rule; prefer the Troubleshoot page.
- **Kindle+ interplay.** VERIFIED (curl, About Amazon, title "Kindle Unlimited is now Kindle+: Everything you need to know").
  - "In the U.S., a Kindle+ subscription costs $11.99 a month plus taxes."
  - "Thousands of eBooks also include companion audiobooks, allowing you to switch seamlessly between reading and listening to the same title at no additional cost."
  - "Audio narration is available for thousands of Kindle+ titles. Just look for the headphone icon next to the Kindle+ logo on each book."
  - Kindle+ is not part of Prime (same page, "Is Kindle+ included with Prime?" answered no; verified yesterday, heading re-seen today).
- **Audible Plus / Standard credits.** UNVERIFIED. Amazon forum staff (Jun 29, 2025): "Please note that this feature does not apply to titles borrowed from the Audible Plus catalog." A Reddit user (r/audiobooks, 2026-04-06, "Audible Standard Flaw - Read & Listen") says titles bought with an Audible Standard credit don't get Read & Listen. Neither is on an Audible or Amazon help page. Do not use.
- **Offline.** VERIFIED for the Audible app: "An internet connection: the eBook text loads from the internet in the Audible app." / "Some pages are saved so you can still see them without an internet connection." Reader complaint (r/audible, 2026-08-14, "Why can’t I use ‘read and listen’ offline", https://www.reddit.com/r/audible/comments/1vohkt1/): title only read.

## 6. "Kindle immersion reading not working": official troubleshooting

- **Amazon, "Troubleshoot Read & Listen".** VERIFIED (Chrome). https://www.amazon.com/gp/help/customer/display.html?nodeId=TBOgUdeE7YXXcq28Ac. "For syncing issues with Read & Listen, make sure:"
  - "Your device is connected to a wireless network."
  - "The Sync Settings option from your Amazon account is turned on. Go to Manage Your Content and Devices and select the Preferences tab. Scroll down to Sync Settings and open the drop down. Check that the setting is ON."
  - "You turn on the Sync setting on your app or device."
  - "You sync your Kindle app or device."
  - "Your device software is updated to the latest software."
  - "You update your Kindle app or device to the latest version."
  - "You update your Kindle book. Go to Manage Your Content and Devices and select the Content tab. Select Books and search for your title. If the title shows Update available under the details, select it and then Update."
  - "As a final step, you try removing the download for the book from your device. Sync your Kindle app or device again, and then redownload the book."
- **Audible ep FAQ.** VERIFIED (curl).
  - "I’m not seeing the Read & Listen toggle": "Do you own both the eBook and the audiobook? Read & Listen requires both. If you only have the audiobook, the toggle won’t appear." / "Is the title eligible? Not all titles support Read & Listen." / "Is your app up to date?" / "Try closing and reopening the app."
  - "I bought both the eBook and audiobook. Why isn’t Read & Listen working?": "Mismatched editions. The eBook and audiobook must be for the same edition of the title." / "Regional availability." / "Account mismatch. Both purchases need to be on the same Amazon account." / "If none of these apply, try removing and re-downloading the title, or contact support."
- **Audible help, manual sync.** VERIFIED (Chrome). "Go to your Profile. / Select the Settings gear icon. / Select Player. / Scroll down and toggle the Sync device position slider off, then on again."
- **Audible's accessibility fallback.** VERIFIED (curl, ep FAQ). "I rely on Read & Listen due to dyslexia/vision impairment. What are my options if a title isn’t eligible?" The answer suggests narration speed, VoiceOver/TalkBack, and "Kindle accessibility features ... text-to-speech on supported devices." Useful for a one-line "Audible itself offers no read-along for ineligible titles" point.
- **The commonest cause, for e-ink owners: the feature does not exist on the device.** Most "not working" threads in the e-ink subreddits are owners looking for a mode their Kindle never had (section 10).
- **Amazon forum staff steps (app).** VERIFIED (Chrome, Aug 31, 2024): "Make sure that your mobile is connected to the internet. / Doble check if there's update for your Kindle app. / Make sure that your mobile has the most up to date software. / Restart your device. / Uninstall and reinstall your Kindle app." (sic) https://www.amazonforum.com/s/question/0D56Q0000DajHtzSQE/why-isnt-immersion-reading-working-anymore

## 7. How to use Whispersync (Read & Listen) on a Kindle Paperwhite

1. **Pair Bluetooth.** VERIFIED (Chrome). Amazon page title "Connect and Sync Bluetooth to Your Kindle E-Reader" (H1 "Pair a Bluetooth Audio Device with Your Kindle E-Reader"). "Listen to VoiceView commands or an audiobook with a supported Bluetooth device."
   - Steps: "Open the Quick Actions or select the Menu icon on your Kindle device. / Select All Settings or Settings, then Wi-Fi & Bluetooth or Wireless. / Turn Bluetooth on. / Select Bluetooth Devices to scan for the nearby Bluetooth devices. / Select your Bluetooth device from the list. / Click on Connect."
   - "Note: Only devices released during or after 2016 support Bluetooth connectivity."
   - https://www.amazon.com/gp/help/customer/display.html?nodeId=TIHMXAou9Wm1q17sg5
   - The PW12 guide also allows pairing on first play: "If you have not paired a Bluetooth device, you will receive a prompt to do so after the Play button is pressed." It adds "Note: This Kindle device supports A2DP and AVRCP profiles."
2. **Own both versions and download the audio over Wi-Fi.** VERIFIED (curl, TZkqDMewOPQ0FqrSqX). "To switch from reading to listening experience, you need a Kindle e-book with a matching Audible audiobook. Kindle e-book that support audio, shows a headphone icon in your library." / "Download the audiobook over Wi-Fi before swithing to listening experience." (sic)
3. **Reading to listening.** VERIFIED (same page). "While reading, tap the top of the screen to open the reading toolbar. / Tap the headphone icon. / Select Play . The audiobook starts from last reading page."
4. **Listening to reading.** VERIFIED (same page). "Tap the screen to open the player controls. / Tap the book icon or select Switch to Reading . Your e-book starts from the same page where you stopped listening." The PW12 guide calls the option "Switch to Kindle book".
5. **The setting is now called "Sync", not "Whispersync".** VERIFIED.
   - The PW12 user guide never uses the word Whispersync: "To manage your Sync settings, open the Quick Actions menu, then tap All Settings. On the Settings page, tap Device Options > Sync."
   - The 2024 Colorsoft guide still says "Whispersync for Books".
   - Amazon's sync page: "To turn Sync off or on for Kindle E-Readers : Select More . Select Settings . Select Device Options . Turn Sync off or on, and then confirm your choice." and "Sync, is already enabled by default on all Kindle devices and apps." https://www.amazon.com/gp/help/customer/display.html?nodeId=GGFEXXS8Z7DPJSTN
   - This explains forum posts that can't find "Advanced Options > Whispersync" (section 10).
6. **Player controls on e-ink.** VERIFIED (PW12 and Colorsoft guides): rewind and fast-forward 30 seconds, Speed, Chapters, Add Bookmark, Volume, "Bluetooth Connected".
7. **Library display.** VERIFIED (guides): "If you own the audiobook and the companion Kindle book, they will appear as one item in your library and a pair of headphones will display ... When you own both items, deleting the Kindle book will also delete the audiobook."

## 8. History (one paragraph)

- **2012: Immersion Reading and Whispersync for Voice launch, Fire only.** VERIFIED (Chrome). Press release dated "Sep. 6, 2012".
  - "“Immersion Reading” ... available exclusively with the all-new Kindle Fire and Kindle Fire HD family"
  - "As customers read their books on Kindle Fire, text is highlighted while it is professionally narrated via the Audible audiobook."
  - "nearly 15,000 Kindle books and 15,000 Audible audiobooks ... are available for customers to experience using Immersion Reading and Whispersync for Voice"
  - Launch add-on prices: "the discounted price ranging from $4.95 to $12.95" (2012 history only).
  - https://press.aboutamazon.com/2012/9/audible-and-amazon-introduce-immersion-reading-and-whispersync-for-voice-two-momentous-steps-forward-for-reading
- **2014: Kindle app for iPhone gets Audible.** Third party, UNVERIFIED with Amazon: iClarified, "Posted June 10, 2014", "Read and listen to a Kindle book at the same time; pages turn automatically." https://www.iclarified.com/41464/kindle-app-now-lets-you-listen-to-audiobooks (WebFetch). Optional.
- **2017: Audible comes to e-ink Kindles.** VERIFIED (Chrome). Amazon press release, Oct. 11, 2017, Kindle Oasis:
  - "With Audible built in, access the world’s largest library of audiobooks and easily switch between reading and listening to your book on your Bluetooth-enabled speakers or headphones"
  - "Audible will be available on the all-new Kindle Oasis via a free over-the-air update when the device ships—and it will be available via a free over-the-air update to Kindle (Gen 8) and the first Kindle Oasis in the coming months."
  - https://press.aboutamazon.com/2017/10/meet-the-all-new-kindle-oasis-featuring-a-7-inch-300-ppi-display-waterproof-design-and-audible
  - Third party (The eBook Reader, Dec 12, 2017): the update shipped; "Kindles don’t support immersion reading so you can’t read along while the audiobook is playing like on Fire tablets."
- **2018: first Paperwhite with Audible (10th gen).** VERIFIED via the PW10 user guide ("Playing Audible books"). Third-party dating: The eBook Reader, Dec 11, 2018, "now that the new Kindle Paperwhite supports Audible audiobooks".
- **2016 onward: Bluetooth.** VERIFIED: "Only devices released during or after 2016 support Bluetooth connectivity." (Bluetooth page above).
- **2025: Assistive Reader brings synced underlining (computer voice) to 11th-gen and newer e-readers.** See yesterday's research (The eBook Reader, Aug 27, 2025, third party). VERIFIED today that the guides say "read along with synchronized real-time underlining".
- **February 2026: immersion reading moves into the Audible app** (section 2).
- **Why e-ink has no Immersion Reading: NOT STATED by Amazon.** No Amazon help page, product page, user guide or press release read today gives a reason. The reasons in circulation are unofficial:
  - Screen refresh speculation: The eBook Reader, Dec 11, 2018: "The lack of Immersion Reading likely comes down to the limitations with the slow refresh rate of E Ink screens".
  - The same author withdrew it on Dec 29, 2020: "I used to think it was because E Ink screens refresh to slowly to stay in time with the audiobook, but I’ve tried Immersion Reading with Onyx’s ereaders using the Kindle app and it works fine." and "The bottom line is Kindles could support Immersion Reading if Amazon wanted them to." https://blog.the-ebook-reader.com/2020/12/29/is-amazon-ever-going-to-add-immersion-reading-to-kindles/
  - Non-staff forum replies repeat the refresh theory ("No, Kindles are not compatible with Immersion Reading because of how the screen refreshes.", camSoCal, Nov 21, 2024; "it's never been on Kindles as the screen would have to refresh every time for word changed.", CBRetriever, Oct 12, 2026).
  - A Reddit claim that "Amazon isn't allowed to do immersion reading due to agreement with publishers" (r/kindle, zv3xn1, seen only as a DDG snippet) is unsupported.
  - Fact the writer can set beside the theory: Amazon's own guides say Assistive Reader on these same e-readers shows "synchronized real-time underlining". A reader made the same point: "I don’t buy what they’re saying about the e-ink not being able to keep up since it can with the assistive reader feature." (r/kindle, 2026-05-27, https://www.reddit.com/r/kindle/comments/1t1wnwx/). Present it as an open question, not a conclusion.

## 9. People Also Ask and related searches

- **Google PAA: UNCHECKED.** One query ("immersion reading kindle paperwhite") in headed Chrome (fresh profile) hit Google's "unusual traffic" check on the first load. No further Google queries were run.
- **DuckDuckGo (11 queries, headed Chrome): no PAA box exists there.** Related searches and Search Assist answers were captured (`serp_ddg.json`).
- **Reddit's own "People also ask about" box** on the r/kindle thread (Reddit's feature, not Google's): "Immersion reading tips for Kindle users", "Best Kindle hacks for audiobooks", "Understanding immersive reading".

DuckDuckGo related searches (verbatim):
- "immersion reading kindle paperwhite": "does kindle allow immersion reading?", "immersion reading devices for kindle?", "immersion reading kindle fire?", "immersive reading on kindle?", "amazon kindle immersion reading?".
- "which kindle has immersion reading": "audible read along with kindle?", "sync audible with kindle book?", "how to whispersync kindle?", "kindle with audible narration?", "audible immersion reading?", "how does whispersync work?".
- "can you read and listen at the same time on kindle paperwhite": "how to read and listen on kindle?", "read and listen to kindle unlimited?", "kindle immersion read and listen?".
- "does whispersync work on kindle paperwhite": "whispersync for kindle paperwhite?", "whispersync settings kindle?", "amazon sync settings for kindle?".
- "how to use whispersync on kindle paperwhite": "kindle whispersync not working?", "how to find whispersync books?", "why won't my kindle sync?".
- "audible read and listen on pc": "audible listen on desktop?", "listen to audible on windows?", "install audible on pc?", "audible reader for pc?".

DuckDuckGo Search Assist (AI answer) signals. The AI answers disagree with each other; one is wrong.
- "can you do immersion reading on kindle paperwhite": "No, the Kindle Paperwhite does not support Immersion Reading, which allows simultaneous reading and listening with synchronized highlighting. This feature is available on certain Kindle apps and Fire tablets, but not on Kindle e-readers due to screen limitations." (Sources: amazonforum. "due to screen limitations" is not an Amazon statement.)
- "can you read and listen at the same time on kindle paperwhite": "Yes, you can read and listen at the same time on the Kindle Paperwhite using the Read and Listen feature, which allows you to switch between reading an eBook and listening to its Audible audiobook without losing your place." (Source: goodereader.com.) This mixes up switching with simultaneous reading. A clear H2 answer can correct it.
- "which kindle has immersion reading": "Immersion Reading is available on the latest generation Kindle Fire tablets." Incomplete: it leaves out the phone apps and the Audible app.

Autocomplete phrasings (lane data `lane-competitor/ac1.json`+`ac2.json` and `lane-data/ac*.txt`/`q*.txt`; engines G=Google, Y=YouTube, B=Bing, D=DDG). No volumes exist; the Google relevance score is ordering only, do not cite.
- On all four engines: "immersion reading kindle paperwhite", "immersion reading kindle", "how to use whispersync on kindle", "whispersync on kindle", "whispersync kindle paperwhite", "can kindle paperwhite read to you", "how to do immersion reading on kindle", "audible read and listen".
- Google + Bing + DDG: "how to use whispersync on kindle paperwhite", "immersion reading kindle fire", "kindle immersion reading not working", "kindle paperwhite read and listen", "whispersync kindle scribe", "whispersync on pc".
- Google only: "immersion reading kindle paperwhite 12th generation", "immersion reading kindle paperwhite 11th generation", "can you read and listen on kindle paperwhite", "does whispersync work on kindle paperwhite", "immersion reading kindle colorsoft", "can you read and listen on kindle colorsoft", "immersion reading kindle scribe", "immersion reading kindle oasis", "which kindle has immersion reading", "is immersion reading available on kindle paperwhite", "kindle immersion reading devices", "audible read and listen on pc", "immersion reading kindle pc", "kindle immersion reading on pc", "whispersync windows", "whispersync for mac", "immersion reading vs whispersync", "immersion reading kindle unlimited", "immersion reading app", "immersion reading libby".
- Lane q-files: "can you do immersion reading on kindle paperwhite" (q2, q3, q4), "which kindle has immersion reading" (q2), "audible read and listen not working" (q2).

**Question phrasings for H2s and FAQs (17), with origin:**
1. Does Kindle Paperwhite support Immersion Reading? (target query; autocomplete GYBD "immersion reading kindle paperwhite"; G "is immersion reading available on kindle paperwhite")
2. Can you do Immersion Reading on a Kindle Paperwhite? (lane q2/q3/q4; DDG query; Amazon forum and Best Buy titles)
3. Which Kindle has Immersion Reading? (autocomplete G "which kindle has immersion reading", G "kindle immersion reading devices"; DDG)
4. Does the Kindle Paperwhite 12th generation have Immersion Reading? (autocomplete G; Amazon forum "listening & reading on 2024 12th generation Paperwhite")
5. Does the Kindle Paperwhite 11th generation or Signature Edition have Immersion Reading? (autocomplete G "...11th generation"; Amazon forum "Is immersion reading available on kindle paperwhite 11th gen?"; Reddit 1x0gxm7, 1v3z0hn)
6. Can you read and listen at the same time on a Kindle Paperwhite? (autocomplete G "can you read and listen on kindle paperwhite" and variants; Amazon forum "read and listen at the same time"; DDG Search Assist gets it wrong)
7. Does Whispersync work on Kindle Paperwhite? (autocomplete G; DDG related "whispersync for kindle paperwhite?"; Amazon forum "Does the Kindle Paperwhite no longer support Whispersync?")
8. How do you use Whispersync on a Kindle Paperwhite? (autocomplete G-BD "how to use whispersync on kindle paperwhite")
9. Does the Kindle Colorsoft have Immersion Reading? (autocomplete G "immersion reading kindle colorsoft", "can you read and listen on kindle colorsoft"; Amazon forum)
10. Does the Kindle Scribe support Immersion Reading? (autocomplete G; Amazon forum "Does the Scribe support immersion reading?"; "Brand New $700 Kindle Scribe Colorsoft doesn't have "Immersion Reading"?!?!?")
11. Does the Kindle Oasis have Immersion Reading? (autocomplete G "immersion reading kindle oasis")
12. Does Immersion Reading work on a Fire tablet? (autocomplete G-BD "immersion reading kindle fire"; DDG related)
13. Can you use Audible Read & Listen or Immersion Reading on a PC? (autocomplete G "audible read and listen on pc", "kindle immersion reading on pc", G-BD "whispersync on pc")
14. Why doesn't my Kindle have Immersion Reading? / Why won't Amazon add it to Kindles? (Reddit 1x0gxm7, 1v3z0hn; The eBook Reader 2020 title; Reddit "Understanding immersive reading")
15. What is the difference between Whispersync and Immersion Reading? (autocomplete G "immersion reading vs whispersync", "whispersync vs immersion reading")
16. Why is Kindle Immersion Reading not working? (autocomplete G-BD "kindle immersion reading not working"; G "immersion reading kindle app not working")
17. Is there a better alternative to Kindle Immersion Reading? (house rule, competitor post)

Optional extras: "Does Kindle Unlimited include Immersion Reading?" (autocomplete GY), "Does Immersion Reading work offline?" (Reddit r/audible title).

## 10. Competitor outlines, errors to correct, reader complaints

**DuckDuckGo page one, "can you do immersion reading on kindle paperwhite"** (Nov 10): Amazon forum (Signature Paperwhite, 2024), Amazon forum (Paperwhite 11th gen, 2025), Reddit wz8ln3 (2022), Reddit 109h0g7 (2023), UK Amazon forum (2023), The eBook Reader (2018 list), Best Buy Q&A x2, The eBook Reader (2020), UK Amazon forum ("Do any of the kindles do immersive reading?"). No current first-party Amazon or Audible page ranks for the exact question. It is a weak page one: forums, Q&A and blog posts from 2018 to 2020.

Competitor pages read today:
- **The eBook Reader, "List of Devices that Support Immersion Reading for Kindle Books"** (Dec 11, 2018, Chrome). Lists "Kindle iOS app / Kindle Android app / Fire Tablets (2nd generation and newer)". It says "Immersion Reading is not available on Kindle ebook readers" and gives the refresh-rate guess.
  - **Stale:** no Audible app (2026), no macOS, Fire version now "FireOS 7 and above" (Amazon) or "FOS8 and above" (Audible), no Assistive Reader, no 2021 to 2026 models.
  - The author contradicted his own refresh theory in 2020.
- **The eBook Reader, "Is Amazon Ever Going to Add Immersion Reading to Kindles?"** (Dec 29, 2020). Quoted in section 8. Still accurate on the core point; no 2025 to 2026 context.
- **Nerds Chalk, "How to Read and Listen to Book at Same Time on Kindle [2024]"** (updated Jan 18, 2024). Errors:
  - "Immersion Reading only works for a few devices, and hardly any e-ink Kindle readers." (Implies some e-ink Kindles do. None do.)
  - "Whispersync is also compatible with all Kindle devices and apps." (Only Bluetooth-capable models play Audible.)
  - Gives the path "Settings > Device Options > Advanced Options > Whispersync for Books". Current Paperwhite guides say "Device Options > Sync"; forum users in 2025 and 2026 report "advanced options" is missing.
  - Links a DRM-removal guide. Do not link it.
- **Just Kindle Books, "What is Kindle Immersion Reading?"** (Feb 12, 2021). Errors:
  - "Most Kindle devices and free Kindle apps have a “read along” feature that doesn’t require an Audible account". In 2021 e-ink Kindles had no general read-aloud; Assistive Reader reached e-readers in 2025.
  - "Kindle Fire tablets (2nd generation and above)" is stale.
- **OneClearWinner, "10 Best Kindle Immersion Reading Devices of 2026".** Ranks page turners and the Paperwhite Signature and basic Kindle as "Immersion Reading Devices", which they are not. Thin affiliate page.
- **Best Buy Q&A (Paperwhite Signature 2021).** "Amazon Devices Customer Support", 3 years ago: "While you can listen to audiobooks you've purchased on the Kindle Paperwhite via bluetooth, it does not support Immersion Reading at this time."
- **Best Buy Q&A (Paperwhite 2024).** "Amazon Devices Customer Support", 1 year ago: "Yes, The Kindle Paperwhite does support Immersive Reading." (voted Helpful 4, Unhelpful 32). A customer answer, 8 months ago: "It's very frustrating, because the assistive reader generates a robotic voice that highlights the text as it reads, but this feature does not work with a purchased, professional reader." **Amazon's own reps contradict each other.**
- **Amazon forum, Amazon Staff answers.** VERIFIED that they were posted; they are not policy.
  - Feb 7, 2023 (UK): "Unfortunately, you cannot perform this on the Kindle Paperwhite. This feature is only available on devices with the Kindle Reading App, such as phones and tablets."
  - Jun 29, 2025: "When you buy Audible narration for your books, in addition to switching back and forth between reading and listening, you can read and listen simultaneously, with real-time text highlighting." This was given to a Paperwhite owner, and it is wrong for e-ink per Amazon's own pages. https://www.amazonforum.com/s/question/0D5Kf00003gtbz0KAA/read-and-listen-at-the-same-time. DDG's AI answer likely inherits this error.
  - Sep 14, 2025 (Colorsoft): "Current, the Kindle Colorsoft does not support Immersion Reading."
  - Oct 12, 2026: "Read & Listen isn't available on the Kindle Paperwhite." This overstates it: switching is Read & Listen, and the Paperwhite guides document switching.
- **sensazioni.org ("How Immersion Reading Works on Kindle (A Complete Guide)", Apr 16, 2026) and projectxeros.org ("Kindle Immersion Reading 2025: The Ultimate Retention Hack", slug "...-2027").** UNVERIFIED: both served a Cloudflare "Just a moment..." challenge in Chrome. Lane snippets only. The title year (2025) and URL year (2027) mismatch suggests spun content.

**Gaps every competitor leaves:**
- a per-model table that includes the 2024 and 2026 models
- the Audible app route (February 2026) and the macOS app
- the Windows answer after Kindle for PC ended on June 30, 2026
- the "Sync" rename on current Paperwhites
- Assistive Reader as the free, robot-voiced read-along that e-ink does have
- the fact that Amazon has never said why
- honest workarounds

**Top reader complaints and workarounds (Reddit; quotes from Arctic Shift comment data, apostrophes normalized):**
- r/kindle, "So freaking bummed that I can't do Immersion Reading on my Kindle!" (2026-07-23, 28 points, 40 comments by the lane's count, 48 comments in Arctic Shift). https://www.reddit.com/r/kindle/comments/1v3z0hn/so_freaking_bummed_that_i_cant_do_immersion/
  - OP: "I have ADHD and listening while reading a book has completely changed the game for my focus." / "I know I can do both on my iphone with the app, but I never liked using that because the screen is tiny and I am already used to, and love, the screen of my kindle signature paperwhite."
  - Top answer (87): "Well yes but it’s also an option to play audio from your phone and then read from your kindle."
  - Why highlighting matters (21): "the active highlighting helps so much. Without it I find if I get a little ahead or zone out then it can take a great deal of effort to scan and skim the pages to get back in sync with the narration."
  - Phone downside (3): "But my phone distracts me and tires my eyes." Another (2): "having my phone nearby oftentimes would lead to me doom scrolling" (bought a Boox Go 7).
  - Headphone-button trick (3): "There’s a workaround where you play the audiobook on your kindle device, navigate to the ebook (audio will stop automatically), and then press play on your headphones or speaker to resume the audiobook while able to read the ebook. This method will not highlight or turn pages for you."
  - Same post cross-posted to r/audible: https://www.reddit.com/r/audible/comments/1v3yzat/
- r/kindle, "Immersion Reading on Paperwhite" (2026-06-21). https://www.reddit.com/r/kindle/comments/1ubju8e/immersion_reading_on_paperwhite/. OP: "it even highlights the words as you read which REALLY REALLY helps my dyslexia." Reply: "Not possible on Kindle devices." One user tried the headphone trick: "I can’t get this to work".
- r/kindle, "I think I found an immersive reading work around on Kindle Paperwhite SE?" (2026-05-02). https://www.reddit.com/r/kindle/comments/1t1wnwx/. "The only caveat is that you have to read along and manually turn the page. It does not do the traditional immersive reading highlighting obviously." A Colorsoft owner: "IT WORKS!" UNVERIFIED (user reports, not documented by Amazon).
- r/kindle, "How do I use Read & Listen / Whispersync best on Kindle Paperwhite 12th Gen Signature Edition?" (2026-04-21). https://www.reddit.com/r/kindle/comments/1sriuz6/. "you only seem to be able to ‘switch’ between reading or listening but not at the same time." Another: "Really??? So what's the whole Whispersync about if you can't use it on your Kindle?"
- r/kindle, "Has anyone figured out how to do immersive reading yet?" (2026-10-08). https://www.reddit.com/r/kindle/comments/1x0gxm7/. "I have a Paperwhite signature 11th gen. Any ideas when they're going to come out for it in their kindles?"
- r/ereader, "Immersion reading" (2026-07-26). https://www.reddit.com/r/ereader/comments/1v6oj5r/immersion_reading/. "I need immersive reading due to handicap. Is there any other ereaders that can do immersive reading?" Replies point to Boox readers running the Kindle app, and to Storyteller (self-hosted).
- r/kindle, "Did read & listen migrate to audible app?" (2026-09-08). https://www.reddit.com/r/kindle/comments/1wa9yc8/. "Yes, the active highlight feature has moved to Audible, now in the app at the top it’ll have a ‘Listen/Read & Listen’ toggle" and "I can’t take down a note, add highlights, or add bookmarks in the audible app!" **UNVERIFIED, and CONFLICTS with Amazon's pages**, which still list the Kindle apps (section 1). Writer: name both apps, lead with the Audible app (the route Audible documents today), and do not say the Kindle app lost the feature.
- Complaint themes, ranked by how often they recur: (1) bought both formats for a Kindle that can't use them together; (2) phone screen too small or too distracting; (3) highlighting is what keeps ADHD and dyslexic readers in sync; (4) the Assistive Reader voice is robotic; (5) confusion between Whispersync (switching) and Immersion Reading (simultaneous); (6) Amazon reps give conflicting answers.
- **Workarounds the writer may list, honestly labelled:**
  - phone or tablet plays the audio while you read on the Kindle (no highlighting, manual page turns)
  - the headphone play-button trick (user-reported, no highlighting)
  - an Echo playing the audiobook (user-reported)
  - Assistive Reader (free, computer voice, underlines words)
  - a Fire tablet (real Immersion Reading)
  - an Android e-ink reader running the Kindle or Audible app (third party; not tested by us)
  - HushBook on a phone or Windows PC for audio you own

## 11. HushBook facts (with file:line) and DO NOT CLAIM

Phone app (app source `D:\hushbook`, read today):
- **Import formats (15).** `D:\hushbook\lib\core\audio\supported_audio_formats.dart:6-22` `kAudioImportExtensions` = mp3, m4a, m4b, aac, wav, flac, ogg, opus, oga, aiff, aif, caf, wma, mka, alac; `:28` webm/webma Android-only. No `aax`/`aaxc` (so no Audible files). Live site: `D:\hushbook.app\index.html:668` "MP3, M4A, M4B, AAC, WAV, FLAC, OGG, OPUS, OGA, AIFF, AIF, CAF, WMA, MKA, and ALAC."
- **Free classics.** `D:\hushbook\lib\l10n\app_en.arb:1139` "Public-domain titles from LibriVox & Internet Archive". Six Discover languages: `D:\hushbook\lib\core\store\store_models.dart:10-26` (English, German, French, Spanish, Italian, Portuguese). Site: `index.html:1258` "Discover searches LibriVox and Internet Archive at once, in English, German, French, Spanish, Italian or Portuguese."
- **Word-level highlight to the narrator.** Site: `index.html:1367` "every spoken word lights up in time with the narrator". Transcription on the phone: `app_en.arb:490` "Transcribe book".
- **Long-press, not tap.** `app_en.arb:8453` "Tap a line to jump there"; `:8457` "You can always long-press a line to play from there."; default off at `D:\hushbook\lib\core\prefs\prefs_service.dart:1027-1033` (`defaultValue: false`); `app_en.arb:8633` "Playing from here".
- **Speed.** `prefs_service.dart:1138-1139` 0.5 to 3.0.
- **Offline, no upload, no account.** `index.html:652` "Not to any server. Transcription runs on your phone, or on your own computer over home Wi-Fi if you choose that. There's no upload, no account, and after a one-time engine download the whole app works offline." Also `:860-861` "Works offline after one download", "No account, ever"; `:1413`.
- **Platforms.** `index.html:162` operatingSystem "iOS, Android". Store links at `:1386` (App Store id6783243597, Google Play com.hushbook.hushbook).
- **Price.** `index.html:676` "The core read-along experience and the public-domain library are free. There's an optional Pro upgrade for advanced analytics". Pro price (memory, 20 days old, UNVERIFIED today): App Store Pro from $2.99/week to $49.99 lifetime. Do not print.
- **Transcribe on my PC is Pro.** `index.html:1021` "With Pro, Transcribe on my PC sends it to your computer over home Wi-Fi."; `app_en.arb:2809` "Transcribe on my PC". The phone may show `app_en.arb:6217` "English books only for now." / `:6601` "Your computer does English books only for now." for PC jobs.
- **Existing site answer on Whispersync.** `index.html:732` "Whispersync and Immersion Reading usually depend on Audible plus a matching Kindle ebook. HushBook works with your own audio files, generates text privately on your phone, and does not require an Amazon account or cloud upload."
- **Name-error limit, live wording.** `content/blog/can-kindle-read-to-you.md:208` "Speech recognition can misread names and unusual words, so a character's name may be spelled wrong on screen."; `content/blog/audiobooks-with-captions.md:123` "unusual names and invented words can come out wrong".

HushBook for your computer (`D:\hushbook.app\desktop.html`, live; app source `D:\Hushbook Desktop client`, release 1.0.1 per git log):
- `desktop.html:334` "Free · Windows 10 or 11, 64-bit"; schema `:49` "Windows 10, Windows 11 (64-bit)".
- `:345` "HushBook runs whisper.cpp on your graphics card, with the Turbo model and word-level timing. On a PC without a capable card, it uses the processor."
- `:347` "Free and unlimited. No cap on books or hours."; `:348` "Nothing is uploaded. There is no server and no account."
- `:391` "Every word lights up as the narrator reads it, set in pages like a printed book."
- `:405` "Pair them once on the same Wi-Fi. They talk to each other directly, with no cloud in between. A phone pairs with one computer."
- `:431` "Import MP3 and M4B files or whole folders."; `:433` Discover "Free public-domain audiobooks to browse and download."
- `:420` "Pro is bought in the phone app, and the paired PC has it too. The Desktop platform sells nothing and it's free to use." Pro on desktop: listening-progress sync (`:409`), Add from your PC (`:415`), Insights (`:434`), phone-to-PC transcription (`:354`).
- Download: page `https://hushbook.app/desktop`; installer `https://downloads.hushbook.app/windows/HushBook-Setup.exe` (`:50`); buttons go through `/dl/windows` (`:325`), which logs the source and redirects.
- Mac: `:329-331` "Coming soon". Not available.
- Desktop engines: `D:\Hushbook Desktop client\lib\data\settings.dart:72-85` (Tiny, Regular, Large "Highest English accuracy", Universal "Multilingual. Choose this for books not in English.", Turbo "Best accuracy with word-level timing. Needs a graphics card for speed.").

**Honest limits that must appear in the post:**
- HushBook does not run on Kindle e-readers (Paperwhite, Colorsoft, Scribe, Oasis, basic Kindle). It is an iPhone, Android and Windows app.
- It cannot open Kindle books or Audible audiobooks (DRM; no AAX in its import list).
- Its text is a transcript of the audio made by speech recognition, not the publisher's ebook. Names and invented words can come out wrong.
- It reads along with audio you own (DRM-free files) or free public domain classics, not the Kindle store catalogue.

**DO NOT CLAIM:**
- That any Kindle e-reader (any Paperwhite, Signature, Kindle, Colorsoft, Scribe, Oasis, 2026 model) does Immersion Reading or highlights words with Audible narration.
- That Amazon has explained why (it has not). Do not state the screen-refresh theory or a publisher-agreement theory as fact.
- That Read & Listen "doesn't work" on a Paperwhite. Switching works; only simultaneous highlighting is missing.
- Audible's "Kindle Ereader devices from 2022 and above" as the cutoff (it conflicts with Amazon's own 2018, 2019 and 2021 user guides).
- That the Kindle app on iPhone/Android has lost Immersion Reading (Reddit only), or that it definitely still has it (Amazon's pages say yes; recent user reports say the highlight moved to the Audible app). Say "Amazon lists the Kindle apps; Audible's own app has it".
- Immersion Reading on Windows (Kindle for Windows, Audible Cloud Player or any Audible Windows app), or on Kindle for Mac (point to the Audible app for macOS).
- That Kindle for PC still works (unsupported since June 30, 2026), or that the new Kindle for Windows runs on Windows 10 (Amazon says Windows 11).
- A Fire OS cutoff as one number. Amazon says FireOS 7 and above (Kindle app); Audible says FOS8 and above (Audible app).
- That Immersion Reading is free or included with Prime. It needs both editions, a discounted add-on purchase, or a Kindle+ title with audio ($11.99 a month in the US, not part of Prime).
- That immersion reading works fully offline in the Audible app (Audible: the ebook text loads from the internet; some pages are saved).
- Audible Plus or Standard-credit exclusions (forum/Reddit only).
- A US price for any Audible add-on (only INR was seen).
- The headphone-button trick as an Amazon feature (user-reported; it plays audio with no highlighting and manual page turns).
- That HushBook runs on a Kindle, opens Kindle or Audible books, imports AAX, removes DRM, has text-to-speech, or shows the publisher's ebook text.
- HushBook's "Sync with e-book" (Pro, DRM-free files, English narration) in this post at all.
- "Tap any word to jump" (tap-to-seek is off by default; say long-press).
- HushBook on Mac (coming soon only), on Boox or other Android e-ink readers (untested), or desktop transcription speeds (the "13x real time" card on /desktop is an animated per-GPU example).
- That HushBook for Windows transcribes every language. Desktop has a multilingual engine, but phone-to-PC jobs can say "English books only for now".
- Any search-volume figure.

## 12. Draft comparison table (every cell sourced above)

| | Kindle Paperwhite and other e-ink Kindles | Immersion Reading (Kindle app or Audible app, Fire) | HushBook phone | HushBook for your computer (Windows) |
|---|---|---|---|---|
| Voice | Audible narrator for listening only, or Assistive Reader's computer voice (s.4) | The audiobook's professional narrator, "not text-to-speech" (s.2) | The narrator in your audio file (s.11) | Same (s.11) |
| Words highlighted with the narration | No; switch between reading and listening (s.1, s.4, s.7) | Yes, "real-time word-by-word text highlighting" (s.2) | Yes, every spoken word (index.html:1367) | Yes, "Every word lights up as the narrator reads it" (desktop.html:391) |
| Runs on an e-ink Kindle | Yes (it is one) | No (s.1, s.2) | No | No |
| Runs on a phone | No | Yes: Audible app iOS/Android; Kindle app per Amazon (s.1, s.2, s.10) | Yes, iPhone and Android | Pairs with the phone app over Wi-Fi |
| Runs on a Windows PC | No | No documented route (s.3) | No | Yes, Windows 10 or 11, 64-bit |
| What you must buy | The Kindle book and the Audible audiobook | Both editions on one Amazon account, an add-on at a discount, or a Kindle+ "Books with Audio" title (s.5) | Nothing for read-along; optional Pro | Nothing; "sells nothing" (desktop.html:420) |
| Works with your own audio files | No, only the matching Audible audiobook | No | Yes, 15 formats incl. MP3, M4B (DRM-free) | Yes, MP3 and M4B files or folders |
| Free library | No | No; some Kindle+ titles include audio with a paid subscription | LibriVox and Internet Archive, six languages | Discover, free public domain audiobooks |
| Offline | Audible files download to the Kindle over Wi-Fi first (s.7) | Audible app: ebook text loads from the internet; some pages saved (s.5) | Yes, after a one-time engine download | Transcribes on the PC, no server (desktop.html:348) |
| Account needed | Amazon account | Amazon account; both purchases on the same account | No | No |
| Whose text you read | The publisher's Kindle ebook | The publisher's Kindle ebook | A speech-recognition transcript of the audio (names can be wrong) | Same |

"Better for" lines the table supports:
- HushBook is better for reading along with audiobooks you own, free classics, and a big screen on a Windows PC.
- Amazon's route is the only one for books that exist only in your Kindle and Audible libraries, and it shows the publisher's exact text.

## Sources

Ready to paste. Titles are the page `<title>` (Amazon's " - Amazon Customer Service" suffix dropped as in earlier posts) or, where noted, the H1. The 2012 press H1 and the two Best Buy titles contain dashes in the original; they are kept verbatim inside quotes (drop the " – Q&A – Best Buy" suffix if the writer prefers).

- [Amazon, "Troubleshoot Read & Listen"](https://www.amazon.com/gp/help/customer/display.html?nodeId=TBOgUdeE7YXXcq28Ac)
- [Amazon, "Switch Between Reading and Listening Experience"](https://www.amazon.com/gp/help/customer/display.html?nodeId=TZkqDMewOPQ0FqrSqX)
- [Amazon, "Other Reading Accessibility Settings on Fire Tablet"](https://www.amazon.com/gp/help/customer/display.html?nodeId=TjCHGCnIKBM42lnQrE)
- [Amazon, "Accessible Reading Options for Kindle Reading Apps"](https://www.amazon.com/gp/help/customer/display.html?nodeId=TABlJ4ot69emTO8jJG)
- [Amazon, "Switch between reading and listening with Audible audiobooks" (page heading; served title is empty)](https://www.amazon.com/hz/audible/narrationhelp/)
- [Amazon, "Amazon.com: Whispersync for Voice - Learn More: Kindle Store"](https://www.amazon.com/Whispersync-for-Voice/b?ie=UTF8&node=12527156011)
- [Amazon, "Amazon.com: Project Hail Mary: A Novel eBook : Weir, Andy: Kindle Store" (Kindle product page with the Immersion Reading note)](https://www.amazon.com/Project-Hail-Mary-Andy-Weir-ebook/dp/B08FHBV4ZX)
- [Amazon, "Kindle Paperwhite 16 GB | Fastest Kindle E-Reader | Amazon"](https://www.amazon.com/clp/B0CFPJYX7P)
- [Amazon, "Connect and Sync Bluetooth to Your Kindle E-Reader"](https://www.amazon.com/gp/help/customer/display.html?nodeId=TIHMXAou9Wm1q17sg5)
- [Amazon, "Update Your Sync Settings for Kindle"](https://www.amazon.com/gp/help/customer/display.html?nodeId=GGFEXXS8Z7DPJSTN)
- [Amazon, "How to Use the Assistive Reader on Your Kindle"](https://www.amazon.com/gp/help/customer/display.html?nodeId=TdHCSXXqsdhaVKt3Tc)
- [Amazon, "How to Find Out Your Kindle Model and Generation"](https://www.amazon.com/gp/help/customer/display.html?nodeId=GK33S847NN4V6Y83)
- [Amazon, "Kindle E-Reader User and Quick Start Guides"](https://www.amazon.com/gp/help/customer/display.html?nodeId=G7N7RPHV2SW8CKBW)
- [Amazon, Kindle User Guide - American English, Kindle Paperwhite (12th Generation) (page has no title)](https://d1ergij2b6wmg5.cloudfront.net/kug/kindle_paperwhite_12th/v1/en-US/html/kug.html)
- [Amazon, Kindle User Guide - American English, Kindle Paperwhite (11th Generation) (page has no title)](https://d1ergij2b6wmg5.cloudfront.net/kug/kindle_paperwhite_11th/v1/en-US/html/kug.html)
- [Amazon, Kindle User Guide - American English, Kindle Paperwhite (2026 release) (page has no title)](https://d1ergij2b6wmg5.cloudfront.net/kug/kindle_paperwhite_2026/v1/en-US/html/kug.html)
- [Amazon, Kindle User Guide - American English, Kindle Colorsoft (page has no title)](https://d1ergij2b6wmg5.cloudfront.net/kug/kindle_colorsoft/v1/en-US/html/kug.html)
- [Amazon, Kindle User Guide - American English, Kindle Scribe (3rd Generation) (page has no title)](https://d1ergij2b6wmg5.cloudfront.net/kug/kindle_scribe_3rd_generation/v1/en-US/html/kug.html)
- [Amazon, Kindle User Guide - American English, Kindle (11th Generation) 2024 (page has no title)](https://d1ergij2b6wmg5.cloudfront.net/kug/kindle_11th_2024/v1/en-US/html/kug.html)
- [Amazon, Kindle User Guide - American English, Kindle Oasis (page has no title)](https://d1ergij2b6wmg5.cloudfront.net/kug/kindle_all_new_oasis_v2/v1/en-US/html/kug.html)
- [Amazon, "Install or Update the Kindle App for Desktop"](https://www.amazon.com/gp/help/customer/display.html?nodeId=TlLrSvAdaGJObw5fIG)
- [Amazon, "Kindle for Windows Accessibility Features"](https://www.amazon.com/gp/help/customer/display.html?nodeId=G74WVD3PVFJ8N3KL)
- [Amazon, "Amazon Kindle: Reading App" (App Store listing)](https://apps.apple.com/us/app/amazon-kindle-reading-app/id302584613)
- [Audible, "Learn about immersion reading"](https://www.audible.com/help/article/learn-about-immersion-reading)
- [Audible, "Learn about Read & Listen"](https://www.audible.com/help/article/listen-with-whispersync-for-voice)
- [Audible, "Read & Listen on Audible | Read Along with Synced Narration"](https://www.audible.com/ep/read-listen)
- [Audible, "Audible App Download Discontinued on Windows 11"](https://www.audible.com/help/article/audible-app-download-discontinued-on-win11)
- [Audible (February 18, 2026), "Audible Launches Immersion Reading for Deeper Engagement with Books"](https://www.audible.com/about/newsroom/audible-launches-immersion-reading-for-deeper-engagement-with-books)
- [Audible (October 26, 2026), "Audible’s Read & Listen Experience Comes to More Listeners Around the Globe"](https://www.audible.com/about/newsroom/audibles-read-and-listen-experience-comes-to-more-listeners-around-the-globe)
- [ACX, "Learn about immersion reading for ACX"](https://help.acx.com/s/article/ir-for-acx)
- [About Amazon, "Kindle Unlimited is now Kindle+: Everything you need to know"](https://www.aboutamazon.com/news/devices/what-is-kindle-plus)
- [Amazon Press Center (September 6, 2012), "Audible and Amazon Introduce “Immersion Reading” and “Whispersync for Voice”—Two Momentous Steps Forward for Reading" (H1)](https://press.aboutamazon.com/2012/9/audible-and-amazon-introduce-immersion-reading-and-whispersync-for-voice-two-momentous-steps-forward-for-reading)
- [Amazon Press Center (October 11, 2017), "Meet the All-New Kindle Oasis: Featuring a 7-inch, 300 ppi Display, Waterproof Design, and Audible" (H1)](https://press.aboutamazon.com/2017/10/meet-the-all-new-kindle-oasis-featuring-a-7-inch-300-ppi-display-waterproof-design-and-audible)
- [The eBook Reader (December 11, 2018), "List of Devices that Support Immersion Reading for Kindle Books"](https://blog.the-ebook-reader.com/2018/12/11/list-of-devices-that-support-immersion-reading-for-kindle-books/)
- [The eBook Reader (December 29, 2020), "Is Amazon Ever Going to Add Immersion Reading to Kindles?"](https://blog.the-ebook-reader.com/2020/12/29/is-amazon-ever-going-to-add-immersion-reading-to-kindles/)
- [The eBook Reader (December 12, 2017), "New Update Adds Audible Support to Kindle and 1st Gen Oasis"](https://blog.the-ebook-reader.com/2017/12/12/new-update-adds-audible-support-to-kindle-and-1st-gen-oasis/)
- [Amazon Forum, "Can you read & listen at same time on Kindle Paperwhite?"](https://uk.amazonforum.com/s/question/0D56Q0000AtiF2MSQU/can-you-read-listen-at-same-time-on-kindle-paperwhite)
- [Amazon Forum, "read and listen at the same time"](https://www.amazonforum.com/s/question/0D5Kf00003gtbz0KAA/read-and-listen-at-the-same-time)
- [Amazon Forum, "Immersion Reading" (Kindle Colorsoft)](https://www.amazonforum.com/s/question/0D5at00000QlbBkCAJ/immersion-reading)
- [Amazon Forum, "Does the Kindle Paperwhite no longer support Whispersync?"](https://www.amazonforum.com/s/question/0D5at00000y2YmOCAU/does-the-kindle-paperwhite-no-longer-support-whispersync)
- [Best Buy, "Does this new Kindle allow for immersion reading? – Q&A – Best Buy"](https://www.bestbuy.com/site/questions/amazon-kindle-paperwhite-16-gb-2024-black/6602737/question/4a0f6552-f3bf-3d61-bbbb-1df640b81284)
- [Best Buy, "Does the kindle paperwhite support immersion read – Q&A – Best Buy"](https://www.bestbuy.com/site/questions/amazon-kindle-paperwhite-signature-edition-32gb-2021-black/6482036/question/8673fe3a-a35e-307c-a596-48a4204ad385)
- [Reddit r/kindle, "So freaking bummed that I can't do Immersion Reading on my Kindle!"](https://www.reddit.com/r/kindle/comments/1v3z0hn/so_freaking_bummed_that_i_cant_do_immersion/)
- [Reddit r/kindle, "Immersion Reading on Paperwhite"](https://www.reddit.com/r/kindle/comments/1ubju8e/immersion_reading_on_paperwhite/)
- [Reddit r/kindle, "I think I found an immersive reading work around on Kindle Paperwhite SE?"](https://www.reddit.com/r/kindle/comments/1t1wnwx/i_think_i_found_an_immersive_reading_work_around/)
- [Nerds Chalk, "How to Read and Listen to Book at Same Time on Kindle [2024]"](https://nerdschalk.com/read-listen-book-same-time-kindle/)
