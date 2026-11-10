# Notes: "Does Kindle Paperwhite Support Immersion Reading?" (draft 2026-11-10)

Writer output. Draft only: nothing in `content/`, `data/`, `llms.txt` or `scripts/` was touched. Facts come only from `research-platforms.md` (RP) and `research-evidence.md` (RE) in this folder; section numbers below refer to those files.

## Length and checks

- `node registry-entry.mjs`: OK. Title 71, metaTitle 58, metaDescription 160, description 232. First sentence 24 words. Takeaways 32/30/34/33/32 words. FAQ answers 27/36/36/30/33/35 words, all start with Yes or No. No en or em dash in post.md, the entry or llms-line.txt. "we built" appears once. No "tap any word", "seamless", "focus mode/view", "better than Kindle" or "Sync with e-book". All internal link targets exist. Images: 3 distinct wide images, not on disk yet (being made in parallel).
- Word count: about 3,830 words of prose plus about 430 words in the two tables (about 4,260 counted by the readingTime rule, so `'19 min read'`). Sources excluded.
- 21 content H2s + Sources, 9 H3 steps (5 for switching on a Paperwhite, 4 for setting up Immersion Reading), 2 pipe tables, 51 Sources.

## Soft-sell placements (owner's rule B)

1. End of the first H2: one sentence, value-first, with the "we built" disclosure.
2. End of the PC H2: one sentence linking `/desktop`, for files you own.
3. H2 "Is there a better alternative to Immersion Reading on a Kindle?": answer starts "Not on the Kindle itself." Neutral table where the Kindle columns win "Text you read", "Reads on an e-ink screen" and "Your Kindle and Audible library"; one paragraph says when the Kindle route is the right one.
4. Closing "HushBook for audiobooks you own": download links and the four honest limits (no e-ink, no Kindle or Audible DRM books, transcript not the publisher's ebook with name errors, reading aid not medical).
5. `cta` field.
"HushBook included" also appears once, factually, in "What the evidence does not show". No takeaway names HushBook (owner's rule allows one; left out to keep the sell restrained). One FAQ answers the better-alternative question with "No, not on the Kindle itself."

## Claim-to-source map (claims a reviewer might question)

| Claim in post | Source | Status |
|---|---|---|
| No Kindle e-reader does Immersion Reading | RP Quick answer, s.1 product pop-up, s.2 Audible device list, s.4 (16 guides, "immersion" in none) | VERIFIED by absence plus Amazon's positive list; post says Amazon has no page saying "can't" |
| "Immersion Reading is available on the Kindle Apps (iOS/Android) and Fire tablets." | RP s.1, Project Hail Mary product page pop-up | VERIFIED |
| Audible immersion device list (apps Android/iOS/iPad/Android tablets/macOS, Fire FOS8+) | RP s.2 | VERIFIED |
| All 16 guides describe Audible playback and Switch to Listening | RP s.4 table | VERIFIED |
| Feb 7, 2023 UK forum staff quote | RP s.10 | VERIFIED as posted; not policy |
| Per-model table rows and Assistive Reader column (PW10 and Oasis no; others yes) | RP Quick answer table, s.4 | VERIFIED |
| Kindle app iOS/Android: Immersion "Yes, per Amazon"; Assistive Reader yes | RP s.1 (pop-up; reading-options page "Real-time Text Highlighting") | VERIFIED; Reddit says highlight moved (UNVERIFIED), stated in conflicts section |
| Audible app switching "Yes, on iOS and Android" | RP s.2 switching list "Audible apps (Android, iOS)" | VERIFIED |
| Kindle for Windows switching "Yes, per Audible"; Immersion "Not listed" | RP s.2, s.3 | VERIFIED |
| Kindle for Windows Assistive Reader "Not checked" | Today's research did not cover it; yesterday's live post covers it, so the table points there instead of contradicting it | n/a |
| Kindle for Mac "Unclear: one Amazon page says yes"; Assistive Reader yes | RP s.3 (CONFLICT), s.1 reading-options page | CONFLICT, stated as such |
| Audible on Windows: Cloud Player "in a browser" | RP s.3 "sign in to Audible.com to listen with the Cloud Player" | VERIFIED; "in a browser" is a plain-language gloss |
| Fire tablet: FireOS 7+ (Kindle app), FOS8+ (Audible app) | RP s.1, s.2 | VERIFIED, both given per DO NOT CLAIM |
| Switching quote "use a paired Bluetooth audio device..." and switching steps | RP s.1, s.7 (nodeId TZkqDMewOPQ0FqrSqX, flaky but read) | VERIFIED |
| Bluetooth pairing steps, "only devices released during or after 2016" | RP s.7 | VERIFIED |
| "deleting the Kindle book will also delete the audiobook" | RP s.7.7 | VERIFIED |
| Player controls (30-second rewind/fast-forward, speed, chapters, bookmark, volume) | RP s.7.6 (PW12, Colorsoft guides) | VERIFIED |
| Setting renamed: "tap Device Options > Sync"; 2024 Colorsoft guide "Whispersync for Books"; Sync on by default | RP s.7.5 | VERIFIED |
| Forum posts can't find Whispersync under Advanced Options | RP s.7.5, s.10 (Nerds Chalk note; forum users 2025 and 2026) | VERIFIED that the posts exist; thread cited is "Does the Kindle Paperwhite no longer support Whispersync?" |
| Audible "Kindle Ereader devices from 2022 and above" vs Amazon guides for 2018/2019/2021 models | RP s.2 CONFLICT, s.4 | CONFLICT, post goes by Amazon's guides as RP instructs |
| PW 2024 product page: AAX, battery line, "immersion" only in waterproofing | RP s.4 | VERIFIED |
| Best Buy 2021 Signature answer "does not support Immersion Reading at this time" | RP s.10 | VERIFIED as posted |
| Best Buy 2024 "Yes" answer, voted 4 helpful / 32 unhelpful | RP s.10 | VERIFIED as posted |
| Jun 29, 2025 staff answer (wrong for e-ink); Oct 12, 2026 staff answer | RP s.10, s.4 | VERIFIED as posted. The Oct 12, 2026 quote's thread URL is not pinned in RP, so the post gives date and quote without a link |
| Colorsoft staff quote Sep 14, 2025 | RP s.4, s.10 | VERIFIED as posted (sic "Current") |
| Oasis: 2017 press release; "Released 2019" | RP s.8, s.4 | VERIFIED |
| 2012 launch, Fire only, "nearly 15,000 Kindle books and 15,000 Audible audiobooks" | RP s.8 | VERIFIED |
| PW 10th gen got Audible in 2018 | RP s.8 (guide VERIFIED; 2018 dating from The eBook Reader, third party) | Dating is third party; worded as history only |
| Own/borrow both; same account; same edition | RP s.5, s.6 | VERIFIED |
| Badge "Read & Listen," formerly "Whispersync for Voice-ready" | RP s.2, s.5 | VERIFIED |
| Kindle+ $11.99/month US, not part of Prime, "Books with Audio" gives both | RP s.5 | VERIFIED (Prime "no" verified Nov 9, heading re-seen Nov 10) |
| Audible app toggle steps; ebook text loads online, some pages saved | RP s.2, s.5 | VERIFIED |
| Fire tablet Kindle app steps; turn off Real-time Text Highlighting | RP s.5 | VERIFIED |
| 800,000+ English and German titles (Oct 26, 2026) | RP s.2 | VERIFIED |
| Kindle for PC unsupported since June 30, 2026; Windows 11 required | RP s.3 | VERIFIED |
| Audible Android app gone on Windows 11 after Appstore ended March 2024 | RP s.3 | VERIFIED |
| Why no Immersion Reading on e-ink: Amazon never said; 2018 refresh theory; 2020 retraction | RP s.8 | NOT STATED by Amazon; theory attributed, not asserted |
| Assistive Reader "synchronized real-time underlining" | RP s.4 shared wording | VERIFIED |
| Troubleshooting bullets | RP s.6 (Amazon Troubleshoot page, Audible ep FAQ, Audible manual sync) | VERIFIED |
| "Most 'not working' threads ... a mode their Kindle never had" | RP s.6 (researcher's reading of the subreddits) | Researcher judgement, worded as an observation |
| Audible FAQ four countries vs Oct 26 press release seven more | RP s.2 CONFLICT | CONFLICT, both quoted |
| Evidence numbers: Clinton-Lisell g = 0.18 / 0.41 / 0.06, 30 studies, 1,945 | RE s.1 | VERIFIED (abstract) |
| Hui 2024 (46), Hui and Godfroid 2026 (86) | RE s.1 | VERIFIED (abstract); year 2026 per issue, matching the Nov 9 post |
| Brown, Waring and Donkaewbua 2008 (35; 16% vs 15% vs 2%) | RE s.2 | VERIFIED (full text) |
| Wood 2018 (22 studies, g = 0.35) | RE s.2 | VERIFIED (abstract reports d = .35; RE's citation sentence and the existing site use g; kept consistent with the site) |
| Keelor 2023, no difference with/without highlighting; n not given | RE s.3 | VERIFIED (abstract), n stated as not given |
| Gerbier 2015 (35 pupils, helped meaning), 2018 (40 children, hurt meaning) | RE s.3 | VERIFIED (abstract) |
| Varao Sousa 2013 (211 analysed; about half vs about a third) | RE s.5 | VERIFIED (full text); uses 211 not 235 |
| Benedetto 2013 (12 adults, PW vs Fire HD vs paper) | RE s.4 | VERIFIED (full text) |
| Audible "Research shows..." names no study; "nine in ten" survey has no n or method | RE s.3 | VERIFIED |

## UNVERIFIED items and how the post words them

- **Reddit report that highlighting moved from the Kindle app to the Audible app** (r/kindle 1wa9yc8, Sept 2026): "That report is unverified. Amazon's pages still list the Kindle apps for iOS and Android. If the Kindle app doesn't highlight for you, try the Audible app." Also in "What we could not confirm". The post never says the Kindle app lost the feature.
- **Workarounds** (phone audio, headphone-button trick, Echo): introduced as "user reports, not Amazon features", with the "will not highlight or turn pages" caveat and the conflicting "I can't get this to work" / "IT WORKS!" replies. Not tested; listed in "What we could not confirm".
- **Reason Amazon leaves e-ink out**: refresh-rate theory attributed to The eBook Reader 2018 and its 2020 retraction; "The reason remains an open question." Publisher-agreement theory not mentioned.
- **Kindle for Mac Immersion Reading**: "Unclear: one Amazon page says yes" in the table; PC section points Mac users to the Audible app.
- **Audible Plus / Standard credit exclusions**: not claimed; listed in "What we could not confirm" as forum and Reddit only.
- **Google People Also Ask**: unchecked (Google traffic check); disclosed in "What we could not confirm".
- **Amazon's "See supported devices" link**: not followed; disclosed.
- **Kindle+ and Immersion Reading** (FAQ 2): built from RP s.5 (Kindle+ "Books with Audio" gives both versions) and s.1 (Immersion Reading in the Kindle apps and Fire). An older Amazon narration page says titles "must be purchased" for Immersion Reading; RP says prefer the newer Troubleshoot page, which allows borrowing. Reviewer may soften FAQ 2 to "Yes, for some titles" (already its opening).

## Not used (DO NOT CLAIM respected)

No Fire OS cutoff as one number; no Audible add-on price; no "free" or Prime claim for Immersion Reading; no offline claim for the Audible app; no Windows Immersion Reading; no claim that Kindle for PC works or that Kindle for Windows runs on Windows 10; no HushBook "Sync with e-book", Mac, Boox, transcription speed, AAX, DRM removal or text-to-speech claims; "long-press a line to play from there", never tap-to-seek; no search-volume figure. Paperwhite Kids product-page note (UNVERIFIED, second-hand) not used. Nerds Chalk, OneClearWinner, ACX, App Store listing, Kindle for Windows accessibility page and the older narrationhelp page are not cited.

## Sources formatting notes

- All 51 Sources lines are copied from the RP and RE Sources blocks, except **Reddit r/kindle "Did read & listen migrate to audible app?"**, whose title and URL come from RP s.10 (not in the RP Sources block).
- Dashes normalised (no en or em dash anywhere in the file): the 2012 press release H1's em dash became " - "; the Best Buy titles drop their " – Q&A – Best Buy" suffix and get a short parenthetical instead.
- The Audible ep page title's "|" became "," (pipe inside a list line, same convention as the Kindle Paperwhite product title in the Nov 9 post). Amazon's "Amazon.com: " prefixes and " | Amazon" suffixes dropped as in earlier posts. Kindle user guide titles drop "- American English" and "(page has no title)".
- Adesope and Nesbit (2012) was cut in the trim pass and removed from Sources.

## Question phrasings (RP s.9) covered vs skipped

| # | Phrasing | Where |
|---|---|---|
| 1 | Does Kindle Paperwhite support Immersion Reading? | H1, H2 |
| 2 | Can you do Immersion Reading on a Kindle Paperwhite? | Answered by the first H2 (same answer); keyword in registry. No separate H2, to avoid two H2s with one answer |
| 3 | Which Kindle has Immersion Reading? | H2 + table |
| 4 | Paperwhite 12th generation | H2 |
| 5 | Paperwhite 11th generation or Signature Edition | H2 |
| 6 | Can you read and listen at the same time on a Kindle Paperwhite? | H2 |
| 7 | Does Whispersync work on Kindle Paperwhite? | H2 |
| 8 | How do you use Whispersync on a Kindle Paperwhite? | H2 + 5 H3 steps |
| 9 | Kindle Colorsoft | H2 |
| 10 | Kindle Scribe | H2 |
| 11 | Kindle Oasis | H2 |
| 12 | Fire tablet | H2, plus H2 "How do you set up Immersion Reading?" with 4 H3 steps |
| 13 | Audible Read & Listen or Immersion Reading on a PC | H2 |
| 14 | Why doesn't my Kindle have Immersion Reading? | H2 |
| 15 | Whispersync vs Immersion Reading | H2 |
| 16 | Why is Kindle Immersion Reading not working? | H2 |
| 17 | Is there a better alternative? | H2 + FAQ 6 |
| extra | Does Kindle Unlimited include Immersion Reading? | FAQ 2 |
| extra | Does Immersion Reading work offline? | FAQ 4 |
| added | 2026 Paperwhite; is it free; Audible on a Paperwhite without headphones | FAQs 1, 3, 5 |

Skipped: none of the 17. The 10th generation Paperwhite and basic Kindle have no own H2 (table rows only).
