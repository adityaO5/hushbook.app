# Notes: "Best Audiobook Apps for Dyslexia in 2026: 7 Apps for Adults and Students Compared"

Draft prepared 2026-10-30, built and tested locally. Not committed, pushed, deployed or pinged. Slug: `best-audiobook-apps-for-dyslexia`. Category: Accessibility. Hero: `read-along-card`.

Word count: 2,374 words before the Sources list (markdown stripped, tables included; the at-a-glance table is about 310 of them). The build's `wordCount` for the whole page body is 2,662.

## Why this topic

- **Demand.** Keyword file `docs/seo/keyword-research-ai-search-2026-10-30.md`, ranked candidate #4: 23 autocomplete phrases across "best audiobook app for dyslexia" and adult variants ("dyslexia app for adults", "reading apps for dyslexia adults", "best dyslexia apps for adults", "dyslexia apps for adults free", "best text to speech app for dyslexia"). Reddit phrasing from r/Dyslexia and r/audiobooks in 2026 ("I just want to read a book", "Being read out loud to", "My friend has dyslexia but really enjoys books..."). Search Console: an LLM-agent probe ("can smart speakers read text aloud for students with dyslexia?") already lands at position 1.0 on the research post.
- **SERP.** Medium and child-focused: Learning Ally pages, Understood.org, UMich dyslexiahelp, homeschoolpicks, Speechify's own "5 best apps" post. No adult-first comparison with prices and eligibility rules.
- **AI answers (audit `C-ai-answer-audit.md`, query 2).** Perplexity names Learning Ally first ("the best overall audiobook app for dyslexia"), then Bookshare, Libby, Voice Dream, Audible + Kindle, LibriVox. ChatGPT names Audible first, then EasyReader, Speechify, Learning Ally, Microsoft Immersive Reader. Google AI Mode lists Learning Ally, Bookshare, Voice Dream, Speechify, Libby and cites a small kids blog (kidvokit). Bing names Eist first from eist.app's own blog post. None names HushBook. Gaps row 2: engines lean on vendor blogs and a kids blog; hushbook.app/audiobook-app-for-dyslexia is indexed in Bing but uncited. The opening is a ranked, dated, sourced list with "best for" labels, eligibility rules and plain-text prices: the shape every engine lifts (verdict line, label per app, table, catch line, FAQ).
- **Product fit.** High: word-by-word highlighting of human narration on files the reader owns, the Dyslexia & ADHD profile, OpenDyslexic, Lexend, Atkinson Hyperlegible and Andika, no account and no eligibility step.

## Ranking

Kept the brief's order: HushBook; Learning Ally; Bookshare with Dolphin EasyReader; Voice Dream Reader; Speechify; Audible Read & Listen with Kindle; Libby. Criteria (stated in the post's "How we chose"): human narration with each word highlighted; who can use it without proving a disability; adult price; reading controls; platforms.

- Considered moving Audible + Kindle to third (human narration plus highlighting, open to anyone). Kept it sixth: it needs two purchases per book (help page: "You will need both the audiobook and the Kindle eBook"), no page we fetched lists dyslexia-specific reading controls for it, and the two accessibility libraries match more of the intent (dyslexia-specific tools, the eligibility questions searchers ask).
- Learning Ally second, as the brief's runner-up: its app page claims "Human-read audio plus word-by-word highlighting" and "80,000+ human-narrated titles", the closest match to the label after HushBook, for those who qualify.
- Bookshare third: over 1 million titles, free for qualified US students, $79.99 for US adults; mostly device text-to-speech.
- Voice Dream above Speechify: cheaper entry ($4.99 a month against $29 a month), plays MP3 audiobooks and Bookshare books natively.
- Libby last: free, but highlighted narration is only in children's read-alongs.

## Sources and how each was verified (all fetched 2026-10-30)

Official pages fetched with curl and read as stripped text unless noted. App Store pages are the US listings (apps.apple.com/us), server-rendered, with the In-App Purchases list read from the page. Quotes are verbatim, with straight quotes.

| Claim in the post | Source | URL | How verified |
|---|---|---|---|
| Learning Ally individual adult membership "$135.00", "proof of eligibility within 30 days of registration", financial assistance form | Learning Ally FAQ | https://learningally.org/faq/how-do-i-start-a-membership-for-myself-as-an-adult-for-the-audiobooks-2/ | curl, quoted |
| "Become a member for just $135/year"; college textbooks, test prep, classic literature, "many STEM titles"; speed control | Learning Ally college and adults page | https://learningally.org/college-adults/ | curl |
| "Accessible audiobooks for adults with documented print disabilities"; "80,000+ human-narrated titles"; "Human-read audio plus word-by-word highlighting"; web, iPhone and iPad, Android, Windows, Mac; FAQ adds Chromebook; offline; school accounts; in-app dictionary; family membership | Learning Ally app page | https://learningally.org/app/ | curl |
| "Learning Ally membership is required to use this app"; "highlighted text synced with the audio narration"; for students with dyslexia or other reading deficits; release note 2025-09-16 separating "Classic Audio" covers from the "VoiceText" label | Learning Ally Audiobooks, App Store | https://apps.apple.com/us/app/learning-ally-audiobooks/id1131235021 | curl |
| Classic Audio titles are "human-narrated with no highlighted text on the screen" | Learning Ally volunteer blog, 1 Oct 2019 | https://volunteers.learningally.org/Blog/volunteer-nation-live | WebFetch (date and quote) |
| Bookshare "$79.99 per year" for US non-students; "no cost for qualified U.S. students through an award from the U.S. Department of Education"; "one time discounted fee of $59.99" | Bookshare, "How much does Bookshare cost?" | https://www.bookshare.org/help-and-learning-articles/adult-members/ | curl. Resolves the $79.99 vs "$50 plus $25" conflict: the current page names only $79.99, and the old fee FAQ URL (cms/help-center/faqs-about-bookshares-updated-fee) now returns 404 |
| "An annual membership costs for US adults is $79.99"; "Over 1 million titles"; books available "the same day they are available on other mainstream book outlets" | Bookshare Adults | https://www.bookshare.org/adults | curl |
| Qualifying conditions include dyslexia; a professional with appropriate expertise confirms; "IEP or 504 plans are not required"; Learning Ally or NLS membership accepted as verification | Bookshare, "Who qualifies for Bookshare?" and "Adults, who qualifies for Bookshare?" | https://www.bookshare.org/help-and-learning-articles/who-qualifies-for-bookshare and https://www.bookshare.org/help-and-learning-articles/adults-who-qualifies-for-bookshare | curl |
| "The majority of Bookshare books use the text to speech voices built into the device"; human-narrated collection is the exception | Bookshare, "How to hear higher quality voices for Bookshare books" | https://www.bookshare.org/help-and-learning-articles/how-to-hear-higher-quality-voices-for-bookshare-books/ | curl |
| Bookshare "free reading app for web browsers, smartphones, tablets" | Bookshare home | https://www.bookshare.org/ | curl |
| Bookshare Reader: "the world's largest library of ebooks for people with reading barriers like dyslexia..."; "Follow along with highlighted text"; membership required | Bookshare Reader, App Store | https://apps.apple.com/us/app/bookshare-reader/id1605201737 | curl |
| EasyReader: "Download up to five titles at a time"; 50 libraries; dyslexia-friendly fonts, colours, letter and line spacing; "highlights the text as it reads it aloud"; "human-sounding synthesised speech"; iPhone, iPad, Android, Kindle Fire, Chromebook, Windows; Mac with Premium | Dolphin EasyReader page | https://yourdolphin.com/EasyReader (redirect from product?id=23) | curl |
| EasyReader Premium Personal $4.99 monthly, $49.99 annual | Dolphin EasyReader, App Store IAPs | https://apps.apple.com/us/app/dolphin-easyreader/id1161662515 | curl |
| Voice Dream: "A subscription is required to access the app. A free trial is offered to new users."; IAPs $4.99 monthly and annual $39.99, $59.99, $79.99; 36 built-in iOS voices and 200+ premium; "Spoken word is highlighted"; finger reading; MP3 and MP4 audiobooks, Bookshare, DAISY, DRM-free EPUB | Voice Dream, App Store | https://apps.apple.com/us/app/voice-dream-natural-reader/id496177674 | curl |
| "Turn PDFs, articles, reports, and books into audio"; "your iPhone, iPad, and Mac" | Voice Dream site | https://www.voicedream.com/ | curl (/pricing returns 404) |
| Speechify Free: "Listen at speeds up to 1.5x", "10 robotic sounding voices", "Text to speech features only"; Premium "$29 /Month or $139 billed yearly"; 1000+ voices, 60+ languages; Android, Chrome, Edge, Web, Mac and Windows apps | Speechify pricing | https://speechify.com/pricing/ | curl |
| "Designed to help people with dyslexia, ADHD, low vision acuity, concussions, and other reading disabilities"; word-for-word highlighting; scan a page; IAPs include Premium $139.99 | Speechify, App Store | https://apps.apple.com/us/app/speechify-text-to-speech-pdf/id1209815023 | curl |
| "You will need both the audiobook and the Kindle eBook to access this feature." (page dated Oct 1, 2026) | Audible Help, "What is immersion reading?" | https://help.audible.com/s/article/what-is-immersion-reading | WebFetch (JavaScript page) |
| Immersion reading expansion; "follow along with highlighted text as they listen"; 800,000+ English and German titles; dictionary for English and Spanish titles; iOS, Android, iPad, Fire tablets | Audible newsroom, 26 Oct 2026 | https://www.audible.com/about/newsroom/audibles-read-and-listen-experience-comes-to-more-listeners-around-the-globe | curl. It neither restates nor removes the ebook requirement |
| Standard $8.99/mo, Premium $14.95/mo | Audible membership page | https://www.audible.com/ep/memberbenefits | curl |
| Libby free, "no subscription costs, no in-app purchases, and no late fees"; iOS, Android, Fire, browser | Libby Help 6144 | https://help.libbyapp.com/en-us/6144.htm | curl |
| OpenDyslexic under "Book Design" | Libby Help 6148 (updated 26 Feb 2026) | https://help.libbyapp.com/en-us/6148.htm | curl |
| Speed 0.6x to 3x | Libby Help 6048 (5 Jun 2026) | https://help.libbyapp.com/en-us/6048.htm | curl |
| Audiobooks "can't be transferred to MP3 players or iPods" | Libby Help 6131 | https://help.libbyapp.com/en-us/6131.htm | curl |
| "Read and listen to interactive read-alongs with your kids" | Libby, App Store | https://apps.apple.com/us/app/libby-the-library-app/id1076402606 | curl |
| Read-alongs have recorded narration; "Many read-along ebooks will highlight words, sentences, or paragraphs" | OverDrive Help 1152 (18 Aug 2026) | https://help.overdrive.com/en-us/1152.htm | curl |
| HushBook: 0.5x to 3x; press and hold any line to play from there; Dyslexia & ADHD profile (OpenDyslexic, colored overlay); Atkinson Hyperlegible; Lexend, Andika; formats; transcription free "for every book"; thousands of LibriVox and Internet Archive classics; no account | HushBook, App Store | https://apps.apple.com/us/app/hushbook-audiobook-read-along/id6783243597 | curl. Spacing and sentence highlight from the brief's fact sheet and hushbook.app ("color overlays, generous spacing") |
| Wood et al. 2018: 22 studies, d = .35; coded "type of oral modality (synthesized text-to-speech, human readers, recorded human voice)"; "only a single, significant moderator emerged, namely whether the study design was a between- or within-subject study" | Journal of Learning Disabilities, DOI 10.1177/0022219416688170 | https://pmc.ncbi.nlm.nih.gov/articles/PMC5494021/ | Crossref ✓ (title, authors, journal); abstract via Europe PMC; moderator text read in the PMC full text |
| Yale: "Recommend that students read along with the audiobook version or to follow the words alongside the reader." | Yale Center for Dyslexia and Creativity | https://dyslexia.yale.edu/resources/educators/instruction/kids-cant-wait-strategies-to-support-struggling-readers/ | curl, verbatim |
| OpenDyslexic: "no improvement in reading rate or accuracy" | Wery and Diliberto, Annals of Dyslexia, DOI 10.1007/s11881-016-0127-1 | https://doi.org/10.1007/s11881-016-0127-1 | Crossref ✓; abstract via OpenAlex |
| Dyslexie font: 170 children with dyslexia, not faster or more accurate | Kuster et al., Annals of Dyslexia, DOI 10.1007/s11881-017-0154-6 | https://doi.org/10.1007/s11881-017-0154-6 | Crossref ✓; abstract via OpenAlex |
| Extra letter spacing improves reading | Zorzi et al., PNAS, DOI 10.1073/pnas.1205566109 | https://doi.org/10.1073/pnas.1205566109 | Crossref ✓; abstract via OpenAlex |

No new studies beyond those `are-audiobooks-good-for-dyslexia` already cites. The Wood moderator finding is new to the site but comes from the same paper.

## Claims left out

- Learning Ally verifying through Bookshare or NLS (the reverse direction): only in a search snippet of a Learning Ally page that now returns 404. The post states only Bookshare's side.
- Learning Ally family membership price, and whether school access is free to students: not on any page fetched. The post says "through a school account or a family membership" without a price.
- The share of Learning Ally titles with text today (VOICEtext vs Classic Audio): under "What we could not confirm".
- Which Voice Dream tier a new US user is offered: under "What we could not confirm".
- Whether Bookshare Reader highlights by word or by sentence in every title: a third-party DAISY page says word by word; no Bookshare page fetched says so. Under "What we could not confirm".
- Audible DRM (files stay in Audible's app): no Audible help page found today, so not stated. Libby's transfer rule is stated from its help page.
- Prime Reading loans of Read & Listen titles: in a search snippet only, not on the help page as fetched. Dropped.
- Microsoft Immersive Reader and Eist (named by ChatGPT and Bing): outside the brief's seven; not added.
- Any HushBook limitation or price: none, per owner rule.

## Cannibalization checks

- `are-audiobooks-good-for-dyslexia` (research) owns the studies. This post names Wood 2018 and Yale in two sentences and links there; the font paragraph is four sentences and links to its `#do-dyslexia-fonts-help` section.
- `/audiobook-app-for-dyslexia` (product page) is single-product and short. Linked once with the anchor "reading profiles for dyslexia"; the product page links out with "Are audiobooks good for dyslexia?", so the anchors differ.
- `are-audiobooks-good-for-adhd`, `does-reading-along-with-an-audiobook-help`, `how-to-focus-on-audiobooks`: linked, not repeated.
- `/alternatives/speechify-alternatives` and `/speechify-alternative`: linked from the text-to-speech H2.
- Sibling `best-apps-to-read-and-listen-at-the-same-time`: linked once from "Which apps highlight each word". Different intent (general read-and-listen, not dyslexia).

## Link-back edits (one sentence each)

- `content/blog/are-audiobooks-good-for-dyslexia.md`, end of "Audiobooks for adults with dyslexia": "We compare seven apps, including Learning Ally and Bookshare, in our guide to the [best audiobook apps for dyslexia](/blog/best-audiobook-apps-for-dyslexia)."
- `content/blog/are-audiobooks-good-for-adhd.md`, end of "Keep the text in view for hard books": "For apps that show the words as they are read, see our comparison of the [best audiobook apps for dyslexia](/blog/best-audiobook-apps-for-dyslexia)."

## Wiring

- `content/blog/best-audiobook-apps-for-dyslexia.md`
- `data/blog-posts.js`: entry inserted first in `posts`, with `hero: 'read-along-card'` and `compared` (the ItemList schema renders; checked in the built HTML)
- `llms.txt`: one line at the top of "## Blog (English)"
- Build: `npm run build:blog && node blog-pages.test.js` passed for 27 posts. Sitemap lastmod lines left for the orchestrator, as instructed.
