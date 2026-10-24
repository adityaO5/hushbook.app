# Notes: "Is LibriVox Safe, Legal and Free? What to Know Before You Download"

Draft prepared 2026-10-24 and published the same day (owner approved commit, push, deploy and IndexNow for this post). Slug: `is-librivox-safe-and-legal`. Body: about 1,860 words before the source list (8 min read). The build's `wordCount` (which includes the source list) is 2,069.

## Why this topic

### Search Console signal (`sc-domain:hushbook.app`, pulled 2026-10-24 via the API)
- 90 days (2026-07-26 to 2026-10-23), 482 query and page rows. As in the last two runs, no query cluster has a large impression count without a page.
- The one LibriVox query lands on the wrong page: "librivox alternative" (4 impressions, position 29) went to `/alternatives`, which does not discuss LibriVox. The site has no page about LibriVox itself, although LibriVox is the main source of HushBook's built-in catalogue.
- Other small gaps seen and not chosen: "are audiobooks faster than reading" (2, position 40, on the speed post), "how many pages per hour audiobook" (1, position 45, on the length post), "is immersive reading cheating" (5, 1 click, on the count-as-reading post).
- So the evidence is autocomplete plus a weak SERP (below), with Search Console showing only that the site has no LibriVox page yet.

### Google autocomplete (curl, `client=firefox&hl=en&gl=us`, 2026-10-24)
- "is librivox": **safe**, **free**, **legit**, **down**, still available, app free, **legal**, librivox.org down, **good**, **ai**
- "is librivox safe": safe to download, safe reddit, free, why is librivox not working, what books are on librivox, how to become a librivox reader
- "is librivox free": app free, audiobooks free, really free, gratis, safe, legal
- "does librivox": **have ads**, have an app, **use ai**, have modern books, **pay**, have harry potter, still exist, have new books, have ebooks
- "librivox readers": readers wanted, best readers, **do librivox readers get paid**, how to become a librivox reader
- "librivox app": for android, free, for iphone, review, download, reddit, for windows
- "librivox vs": audible, libby
- "why is librivox": not working, so slow
- "librivox copyright": is librivox legal, is librivox free
- "what is librivox": app, audiobooks, what does librivox mean, what is a librivox recording, is librivox safe

### Competing results (WebSearch, 2026-10-24; not Google's own index)
- **"is librivox safe"**: vpnsuper.com "Is Website Safe" blog, MyWOT scorecard, rigorousthemes.com review, justuseapp.com app reviews (two third-party apps), goodnovel Q&A, trusted.de, ecml.at tool inventory.
- **"is librivox legal"**: rigorousthemes.com, ecml.at, castreader.com (vendor), a LibriVox forum thread about resale on Audible, an SFFaudio post about Canadian Bill C-61 (2008), Wikipedia, a "legal torrent sites" listicle.
- **"is librivox ai narrated"**: resemble.ai (vendor), a personal blog, Hacker News mirrors, parse.gl, a third-party App Store listing, a LibriVox forum thread, lowendbox.
- **"is librivox free legit review"**: justuseapp, marlvel.ai, trusted.de, rigorousthemes.com, thebookdesigner.com, a Google Sites review page, Wikipedia.
- **Verdict:** a very weak SERP. Trust-checker sites, app-review aggregators and old blog reviews. Nobody quotes LibriVox's own AI policy, its copyright wiki or a concrete country example.
- **Not checked:** the live Google SERP and People Also Ask. The shared Playwright browser was reserved for another agent in this run. H2s use the autocomplete phrasing instead ("is librivox safe / legal / ai / free / good", "why is librivox not working", "librivox vs libby / audible"). The FAQs cover the "does librivox have ads / an app / harry potter / pay" questions. Check PAA in a browser later and align one or two FAQs if the wording differs.

### Product fit
Very strong. HushBook's Discover page is built on LibriVox and the Internet Archive (`discoverSubtitle`: "Free audiobooks from LibriVox and Internet Archive."). Every HushBook user who downloads a free book is downloading a LibriVox or Internet Archive recording, so "is this safe and legal" is a question HushBook should answer honestly, including that HushBook is itself a third-party app.

### Cannibalization check
- `how-to-listen-to-audiobooks-for-free`, H2 "4. LibriVox: free public domain audiobooks": about 200 words inside a nine-option list. It says LibriVox is legal and free, quality varies, and public domain depends on your country. Intent: "how do I get free audiobooks". The new post targets "can I trust LibriVox" (safety, copyright outside the US, AI, apps, outages), which that section does not answer.
- `free-read-along-audiobooks`, "LibriVox" subsection: about 80 words, a definition.
- `m4b-vs-mp3`, `how-long-is-an-audiobook`, `learn-english-with-audiobooks`: mention LibriVox as a file or book source only.
- The new post links out to the free-audiobooks post for "LibriVox alternatives" rather than listing them. The two LibriVox sections above now link to the new post.

### Topics considered and rejected
- "Are audiobooks faster than reading / is listening faster than reading / why are audiobooks read so slowly" (large autocomplete cluster, 2 impressions at position 40): the ACX narrator rate vs Brysbaert reading rate comparison is already in `does-reading-along-with-an-audiobook-help`, and speed is covered by `audiobook-listening-speed` and `how-long-is-an-audiobook`. Better as one H2 in the speed post.
- "How to tell if an audiobook is AI / are AI audiobooks good / ai narrated audiobooks audible": strong autocomplete, but weak product fit (HushBook does not sell audiobooks) and the answer rests on vendor policies that change month to month. Partly served by the new "Is LibriVox AI?" H2.
- "Do audiobooks count as screen time": rejected on 2026-10-23 for the same reason (read-along puts a screen in front of you).
- "Is it bad to listen to audiobooks all day / while working": no primary research found.
- "Audiobooks for visually impaired / seniors / dementia": weak fit for a visual read-along app, or a health claim without audiobook research.
- "Does listening to audiobooks improve memory / writing / vocabulary": overlaps the count-as-reading, retention, kids and learn-English posts.
- "Audiobook vs ebook / is it better to read or listen": cannibalizes `does-listening-to-audiobooks-count-as-reading`.

## Sources and how each was verified

All three DOIs were checked against `api.crossref.org/works/<doi>` on 2026-10-24; titles, authors, venues, years and pages matched. Abstracts were read through the OpenAlex API. No ERIC sources were used. Official pages were fetched with curl and read as stripped text; every quote below is verbatim from that text (straight quotes in the post where the source has curly ones).

| Source | ID / URL | Check | What the post uses |
|---|---|---|---|
| Panayotov, Chen, Povey and Khudanpur (2015), ICASSP 2015, pp. 5206 to 5210 | DOI 10.1109/ICASSP.2015.7178964 | Crossref ✓ | Abstract: corpus of read English speech for "training and evaluating speech recognition systems", "derived from audiobooks that are part of the LibriVox project", "1000 hours of speech sampled at 16 kHz" ✓ |
| Kahn et al. (2020), ICASSP 2020, pp. 7669 to 7673 | DOI 10.1109/ICASSP40776.2020.9052942 | Crossref ✓ (15 authors) | Abstract: "derived from open-source audio books from the LibriVox project", "over 60K hours of audio", "to our knowledge, the largest freely-available corpus of speech" ✓ |
| Zen, Dang, Clark, Zhang, Weiss, Jia, Chen and Wu (2019), Interspeech 2019, pp. 1526 to 1530 | DOI 10.21437/Interspeech.2019-2441 | Crossref ✓ | Abstract: "designed for text-to-speech use", derived from LibriSpeech, "585 hours of speech data at 24kHz sampling rate from 2,456 speakers" ✓ |
| LibriVox, "About LibriVox" | librivox.org/pages/about-librivox/ | Fetched ✓ | "a non-commercial, non-profit and ad-free project"; "donates its recordings to the public domain"; "powered by volunteers"; "All our audio is in the public domain, so you may use it for whatever purpose you wish."; "may contain language or express notions that are antiquated at best, offending at worst"; "You don't need to audition"; "We'll accept you no matter what you sound like."; Internet Archive hosts the audio "(for free!)"; fund-raising drives in 2010 and July 2013; started August 2005 by Hugh McGuire ✓ |
| LibriVox homepage | librivox.org | Fetched 2026-10-24 ✓ | "free for anyone to listen to"; Cataloged works 21,855; works cataloged last month 62; languages 49; readers 14,947; catalog labels "Solo" / "Collaborative" ✓ |
| LibriVox, "Public Domain" | librivox.org/pages/public-domain/ | Fetched ✓ | "anyone can use all our recordings however they wish (even to sell them)"; "all our recordings are public domain in the USA, but not necessarily in other countries"; recommends checking "before downloading"; still says "in general, we can only record texts published before 1923" (outdated, noted in the post) ✓ |
| LibriVox, "Help" | librivox.org/pages/help/ | Fetched ✓ | Play in browser or download; 64 and 128 kbps MP3; zip of the whole book; "M4B formats are available for most of our books"; no sign-in step anywhere ✓ |
| LibriVox, "LibriVox API Update" (September 16, 2026) | librivox.org/2026/09/16/librivox-api-update/ | Fetched ✓ | "Our only official outlet is the LibriVox.org web site"; third parties "more than welcome" to share; traffic "from bots and scrapers" and "a few apps" a problem for "the volunteers who share the same server"; limits planned on or after September 26, 2026 (so the post says "announced"); forum needs an account ✓ |
| LibriVox, "Happy 20th Anniversary, LibriVox!" (August 1, 2025) | librivox.org/2025/08/01/... | Homepage excerpt ✓ | "LibriVox celebrates its 20th anniversary this month." ✓ |
| LibriVox Wiki, "Copyright and Public Domain" (last edited 5 August 2026) | wiki.librivox.org | Fetched ✓ | Accepts "Works published 96 years ago or earlier", US government works, Project Gutenberg-cleared works; Kafka 1916 vs Wyllie 2002 translation; "a volunteer organization with no budget to defend copyright challenges" / "a very cautious approach"; "It is the responsibility of each reader and listener to determine..." (verbatim); Berne countries "50 or 70 years beyond the death of the author"; Orwell died 1950, UK public domain 1 January 2021, "at the beginning of the seventy-first year"; lists "Used LibriVox recordings to train AI models" ✓ |
| LibriVox Wiki, "Recording & Text Policies" | wiki.librivox.org | Fetched ✓ | "LibriVox recordings are made by volunteers using their own voices."; no AI audio, summaries or covers; may not change text "to remove swear words, language or ideas you find objectionable" ✓ |
| LibriVox Wiki, "LibriVox and Artificial Intelligence (AI)" | wiki.librivox.org | Fetched ✓ | Policy extended to covers and summaries "in 2023"; AI content "will be removed from the project or, if completed, the catalog"; "not a business with yearly goals, but a hobby for many people"; "has not, does not, and will not sell its recordings to anyone"; "it is legal for AI trainers to use them for anything without our/your permission, for free" ✓ |
| LibriVox Wiki, "Guide for Proof-listeners" | wiki.librivox.org | Fetched ✓ | "usually all its audio files are proof-listened"; checks "repeats, big stumbles or long pauses"; flag computer-generated voices to the MC; "we never say: 'This reader is not good enough for LibriVox.'" ✓ |
| LibriVox catalog API and Milne author page | librivox.org/api/feed/audiobooks, librivox.org/author/1259 | Fetched ✓ | Six *Winnie-the-Pooh* recordings (versions 1 to 6, version 5 a dramatic reading); A. A. Milne 1882 to 1956 ✓ |
| LibriVox, *Winnie-the-Pooh* (Version 3) catalog page | librivox.org/winnie-the-pooh-version-3-by-a-a-milne-/ | Fetched ✓ | "If you are not in the USA, please verify the copyright status of these works in your own country before downloading" (same notice found on the Alice and Frankenstein pages) ✓ |
| Project Gutenberg, *Winnie-the-Pooh* (#67098) | gutenberg.org/ebooks/67098 | Fetched ✓ | Milne 1882 to 1956; original publication 1926; "Public domain in the USA"; released January 3, 2022 ✓ |
| 17 U.S.C. sections 304 and 305 (Cornell LII) | law.cornell.edu | Fetched ✓ | 304(b): "95 years from the date copyright was originally secured"; 305: terms "run to the end of the calendar year in which they would otherwise expire" ✓. "1930 or earlier in 2026" and "Winnie-the-Pooh public domain in the US in 2022" are our arithmetic (1930 + 95 = 2025; 1926 + 95 = 2021), consistent with the wiki's 96-year rule and Gutenberg's release date. |
| GOV.UK, "How long copyright lasts" | gov.uk/copyright/how-long-copyright-lasts | Fetched ✓ | "Written, dramatic, musical and artistic work: 70 years after the author's death" ✓. "Until 1 January 2027" for Milne is our arithmetic using the wiki's rule (1956 + 71). |
| Internet Archive Blogs, "Internet Archive Services Update: 2024-10-21" | blog.archive.org | Fetched ✓ | "cyberattacks on October 9"; archive.org back "in a read-only manner" as of October 21 ✓ |
| Libby Help, "Getting started with Libby" | help.libbyapp.com/en-us/6103.htm | Fetched ✓ | "All you need is a library card." ✓ |
| HushBook, "How long is an audiobook" (own post) | /blog/how-long-is-an-audiobook | Repo ✓ | "Our ten readers ranged from 131 to 179 words a minute" ✓ |

### Claims checked but left out
- **Hachette v. Internet Archive** (2d Cir., September 4, 2024, No. 23-1260): would have clarified that the lawsuit the Internet Archive lost was about lending scans of in-copyright books, not public domain audio. The opinion PDF returned 404 at ca2.uscourts.gov and CourtListener served no text, so it is left out.
- **The October 2024 breach of 31 million Internet Archive accounts**: only in secondary sources, not in the Internet Archive's own update. Left out.
- **Author's Republic selling LibriVox recordings on Audible**: seen only in a WebSearch summary of a LibriVox forum thread. Replaced by LibriVox's own "even to sell them".
- **Third-party "LibriVox" apps with ads, in-app purchases or samples that need payment** (justuseapp reviews): store listings not checked. The post only says each app sets its own ads, prices and privacy rules.
- **AI-narrated Project Gutenberg audiobooks** (Microsoft, MIT, Project Gutenberg, 2023): no peer-reviewed version found on Crossref. Left out.
- **Forum admin line "We use real people, even some that speak somewhat robotically"**: WebSearch summary only. Not quoted.
- **EU Directive 2006/116/EC (life plus 70)**: EUR-Lex returned empty pages to curl and WebFetch. The post cites the UK and LibriVox's "50 or 70 years" statement instead.
- **Canada's 2022 extension to life plus 70**: not checked. Left out.
- **US Copyright Office Circular 15a**: the PDF could not be rendered here. The statute is cited instead.
- **Comments under the API post about 522 and 525 errors**: user comments, not LibriVox statements. Not used.
- **resemble.ai "LibriVox" integration pages**: vendor pages, no LibriVox confirmation. Not used.

## Product claims (live site fetched 2026-10-24, `D:\hushbook\lib\l10n\app_en.arb`, or repo code)
- "A built-in catalogue of public-domain audiobooks from LibriVox and the Internet Archive, in six languages. Download one and the transcription starts on its own" (home).
- "Free to download, Zero Ads."; "No account, no sign-in"; "Fully offline after a one-time engine download" (home).
- "The core read-along experience and the public-domain library are free. There's an optional Pro upgrade for advanced analytics" (home FAQ).
- "Every word lights up with the narrator. Tap any word to jump there." (home).
- Discover shows "Read by {reader}" or "Read by several readers" (`discoverReadBy`, `discoverReadBySeveral` in `app_en.arb`).
- LibriVox audio is downloaded from archive.org (`lib/core/store/librivox_provider.dart`). When one library fails, Discover says "{failed} didn't answer, so you're seeing {other} only." (`discoverProviderDidNotAnswer`).
- Limits stated: archive.org outages stop HushBook's LibriVox downloads too; speech recognition errors on unusual names; cannot fix an uneven reader; cannot tell you a book's copyright status in your country.
- **Not claimed:** a solo/collaborative filter in Discover (only the reader line was confirmed), any number of titles in the HushBook catalogue (the app string says "~20,000 titles" for LibriVox, but the live site says only "thousands").

## Soft upsell placement
- No mid-body hint. The post is about trusting a free source, and a product line in the middle would read as salesy. HushBook appears once, in the closing section, introduced as "one of the third-party apps that use LibriVox's catalog", with honest limits.
- `cta`: "Free classics, with every word on screen".

## Checks run
- H1 equals `title` ✓ (the build throws otherwise)
- metaTitle 60 ≤ 60 (rendered without the " | HushBook" suffix); metaDescription 154 ≤ 160; description 224 ≤ 240 ✓
- 8 keywords, 5 takeaways, 6 FAQs; every takeaway and FAQ fact is stated in the body ✓
- No en or em dashes in the post, registry entry, llms.txt line or rendered HTML ✓
- 4 internal links in the post: M4B vs MP3, how long is an audiobook, free audiobooks, home ✓. 2 new contextual links into the post ✓
- Rendered HTML: canonical `https://hushbook.app/blog/is-librivox-safe-and-legal`; BlogPosting + FAQPage (6 questions) + BreadcrumbList; no markdown leaks ✓
- `npm test` suite: 7 pass; `seo-preservation` and `seo-repair-contract` fail exactly as on the pre-change baseline ✓

## After publishing
1. IndexNow ping for the new post, `/blog` and the two edited posts.
2. Request indexing in Search Console for `https://hushbook.app/blog/is-librivox-safe-and-legal`.
3. Check People Also Ask for "is librivox safe" and "is librivox legal" in a browser when one is free, and align FAQ wording if needed.
