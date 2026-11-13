# Wiring for /blog/best-jane-eyre-audiobook

2026-11-13, writer's hand-off. Nothing outside this folder was touched: no site files, no build, no commit.

## Files in this folder

- `post.md`: copy byte for byte to `content/blog/best-jane-eyre-audiobook.md`.
- `registry-entry.mjs`: the registry object plus a self-check. `node registry-entry.mjs` prints OK: title 61, metaTitle 57, metaDescription 160, description 233, cta.heading 44, cta.text 185; first sentence 17 words; body 6,132 words (4,719 outside tables), so `readingTime: '28 min read'`; 11 H2s plus Sources, 14 H3s, 11 tables, 4 wide images (all on disk, each directly under its own H2, alts 249/227/219/224 characters), 59 source links, 6 outbound links in the body (all also under Sources), 6 internal links; 0 en or em dashes in the post or the entry.
- `llms-line.txt`: the llms.txt line. The self-check asserts it equals title plus description.

Length note: the brief gives 5,500 to 5,800 words for the exemplars. Counted with the self-check's own method (body without H1, images and Sources, tables included), the published exemplars run 5,564 (Pride and Prejudice) and 6,181 (Wuthering Heights); this post is 6,132, inside that range. The Wuthering Heights registry entry also says 28 min.

## Registry and llms.txt

- `data/blog-posts.js`: insert the entry first, above `best-pride-and-prejudice-audiobook` (line 10 today). Field order matches the exemplar.
- `hero: 'jane-eyre-picks'`: `content/blog/embeds/jane-eyre-picks.html`, `assets/img/blog/jane-eyre-picks.webp` and `jane-eyre-picks-og.webp` were created by the images agent. The card's four labels and runtimes (Best overall Newton 19 h 10 min, Runner-up Stevenson 19 h 13 min, Best free Klett 18 h 36 min, Best to borrow Popplewell 22 h 51 min) match the post's H3s.
- `llms.txt`: insert `llms-line.txt` directly under the `- [HushBook blog]` line (line 40 today), above the Pride and Prejudice line.

## metaTitle

| Option | Characters |
|---|---|
| **Best Jane Eyre Audiobook: Every Narrator and Free Version** (in the entry) | 57 |
| Best Jane Eyre Audiobook: Every Narrator, Runtime and Rating | 60 |
| Best Jane Eyre Audiobook: Narrators, Lengths and the French | 59 |

All three are over 49, so the build does not append " | HushBook". The chosen one names the free version, a top completion ("jane eyre audiobook free"); the metaDescription carries the running time for the length queries.

## Images (all four on disk at 13:14; alts written against the rendered files)

| Image | Under H2 | Alt (as in post.md) | Note |
|---|---|---|---|
| `jane-eyre-editions.webp` | Which Jane Eyre audiobook is best? | Bar chart of 16 complete Jane Eyre recordings, 17 h 27 min to 25 h 19 min, 12 from stores, 4 free on LibriVox, with ratings. Marked: Thandiwe Newton best overall, Juliet Stevenson runner-up, Anna Popplewell best to borrow, Elizabeth Klett best free. | Rows match the post's table. The LibriVox panel shows archive.org ratings: Klett "5.0 (22)" counts 2 non-reviews and 1 spam post (research-platforms 2a), and the group set's misfiled rating is correctly left blank. Consider "19 reviews" for Klett or dropping that column. |
| `jane-eyre-length.webp` | How long is the Jane Eyre audiobook? | Stat tiles: 186,145 words, 38 chapters of 12 to 74 minutes, and 20 h 33 min at 1x at 151 words a minute, over a bar of the first edition's three volumes: Chapters 1 to 15, 6 h 41 min; 16 to 26, 6 h 35 min; 27 to 38, 7 h 17 min. | Matches the post. Footer's "median pace of ten LibriVox readers" matches `how-long-is-an-audiobook.md:5, 39`. |
| `jane-eyre-french.webp` | Do you need to know French to listen to Jane Eyre? | Stat tiles on the French in Jane Eyre, by our count: 346 words, 0.19% of the novel, 2.3 minutes at 1x, 84% of it Adèle's, in Chapters 11 to 24, over a bar chart of French words by chapter that peaks at 98 in Chapter 17. | The image shows 0.19% and 2.3 min; the post's answer says "under 0.2%" and "about two minutes", and its method paragraph gives 0.19% and 2.3 minutes so the two agree. |
| `jane-eyre-read-along.webp` | Is there a Jane Eyre audiobook with text? | Two HushBook phone screens with Elizabeth Klett's free LibriVox recording, "Jane Eyre (version 3)": the player with a Read along button, and the Chapter 1 read-along page, with "Reed, when" tinted red and "there" underlined. | Player shows 00:10 and -13:10, which matches Klett's 13:20 Chapter 1 file. |

If any image is re-rendered, re-read it and update its alt in `post.md` before copying.

## Inbound links (link-only edits, no dateModified bump)

1. `content/blog/how-to-read-classics-without-getting-bored.md:76`, section "How to get into classic literature", item 3. Wrap the existing words `*Jane Eyre*`:
   `3. **Third book:** a big novel with support, such as *Pride and Prejudice* or [*Jane Eyre*](/blog/best-jane-eyre-audiobook), with the audio, the text and a cast list.`
2. `content/blog/how-long-is-an-audiobook.md:47`, section "Is there an average audiobook length?". Wrap `Big classics`:
   `[Big classics](/blog/best-jane-eyre-audiobook) and fantasy series often go past 20 hours a book.` (Jane Eyre is 20 h 33 min at the site's 151 wpm.)
3. `content/blog/best-wuthering-heights-audiobook.md`. Scout offers two places; I recommend the second, because the anchor then names what the reader gets:
   - `:291`, section "Which Wuthering Heights audiobooks are abridged or dramatised?", paragraph "The BBC dramatisation.": wrap `The Brontë BBC Radio Drama Collection` (its tracks 1 to 2 are the BBC Jane Eyre, covered in the new post). Readers may expect a page about the collection.
   - **`:197`**, section "What is Joseph saying in Wuthering Heights?", paragraph "Which spelling you hear.": wrap the first `Charlotte Brontë`, giving `[Charlotte Brontë](/blog/best-jane-eyre-audiobook) changed Joseph's spelling for the 1850 edition.`

Neither linking paragraph gains any new fact.

## Outbound internal links (6, all exist in content/blog/)

| Link | Section | Anchor text |
|---|---|---|
| /blog/how-long-is-an-audiobook | How long is the Jane Eyre audiobook? | how long audiobooks run |
| /blog/best-wuthering-heights-audiobook | Is Jane Eyre longer than Wuthering Heights? (H3) | Wuthering Heights audiobook comparison |
| /blog/best-pride-and-prejudice-audiobook | Which Jane Eyre audiobook has a British accent? (H3) | Pride and Prejudice |
| /blog/is-librivox-safe-and-legal | Is there a free Jane Eyre audiobook? ("Other free routes") | LibriVox is free and legal |
| /blog/abridged-vs-unabridged-audiobooks | Which Jane Eyre audiobooks are abridged or dramatised? | abridged and unabridged audiobooks |
| /blog/how-to-keep-track-of-characters-in-a-book | Who is who in Jane Eyre? | keep track of characters |

## For the reviewer: figures the writer derived from research data

- "Ten times as many as the next most rated edition": 22,153 / 2,188 = 10.1 (research says "ten times").
- Stevenson "three minutes longer": 19 h 13 min minus 19 h 10 min.
- "1.6 times as long": 186,145 / 116,440 = 1.599.
- "99.8% English": 100 minus 346 / 186,145 (0.186%) = 99.81%.
- "84%": 291 / 346 = 84.1%.
- French sums: by chapter 2 + 33 + 10 + 76 + 50 + 12 + 18 + 98 + 5 + 9 + 31 + 2 = 346; by volume 183 + 161 + 2 = 346; by speaker 291 + 29 + 10 + 8 + 5 + 2 + 1 = 346.
- "About two minutes", "2.3 minutes": 346 / 151 = 2.29 min.
- Speed table, rechecked: novel 186,145 / 151 = 1,232.75 min = 20 h 33 min, / 1.25 = 16 h 26, / 1.5 = 13 h 42, / 2 = 10 h 16. Newton 1,150 min / 1.25 = 920 = 15 h 20; / 1.5 = 766.7 = 12 h 47; / 2 = 575 = 9 h 35. Stevenson 1,153 / 2 = 576.5, printed 9 h 36 as in the research. Klett 1,116.5 min / 1.25 = 14 h 53; / 1.5 = 12 h 24; / 2 = 9 h 18. Popplewell 1,371 / 1.25 = 18 h 17; / 1.5 = 15 h 14; / 2 = 685.5 = 11 h 26.
- Days, 30 and 60 min a day: 1,232.75 / 30 = 41.1, so 42; 986.2 / 30 = 32.9, so 33; 821.8 / 30 = 27.4, so 28; 616.4 / 30 = 20.5, so 21; at 60 a day 21, 17, 14, 11. Klett at 60 a day: 1,116.5 / 60 = 18.6, so 19; then 15, 13, 10.
- Silent reading: 186,145 / 260 = 716 min = 11 h 56 min (research figure).
- Volumes: 60,508 / 151 = 6 h 41; 59,611 / 151 = 6 h 35; 66,026 / 151 = 7 h 17.
- "12 complete recordings you can buy or borrow": 11 solo rows plus Spoken Realms; plus 4 LibriVox = 16 (also the chart's count).
- "Nine listings ... from 2 hours to 6 hours 6 minutes": the nine rows of the abridged table; Joanna David's OverDrive 06:05:58 rounds to 6 h 6 min.
- "Every fact in it is told by Chapter 31": the highest "Told in" chapter in the names table (Rosamond Oliver).
- "Four Johns": John Reed, the Thornfield manservant John, John Green, St. John Rivers (the uncle in the Chapter 21 letter left out as a spoiler path, as research advises).
- "Best performance score there among the most rated editions" (Stevenson, UK): 4.9 against Newton 4.8, Scott 4.7, Popplewell 4.7, Messenger 4.2.
- "Best rated edition with hundreds of ratings that we found on Libby" (Popplewell): the only Libby-held edition with over 200 US ratings.
- "Best rated audio adaptation": BBC 4.7 (263) is the highest rating among the nine abridged and dramatised listings.
- "Four Reddit threads ... 2018 to 2024": 7oyip1 (2018), ojuz9s (2021), 19eheal and 1bs2soc (2024).

## Handled in the writing (research items too weak, contradictory or spoiler-prone)

- research-platforms 1d calls Emma Messenger's 21 h 47 min "the longest of the main editions", but Popplewell runs 22 h 51 min and Bentinck 23 h 8 min. The post makes no "longest" claim.
- Scout lists Stevenson among British accents "by listener reviews", but the research quotes no accent line for her Jane Eyre. The accent H3 names only Newton (NYT) and Klett (Manchester reviewer), plus reviewers' praise for Root, Scott and Popplewell.
- The published posts give Varao Sousa et al. 211 students; this research gives no sample size and its do-not-claim list allows only the listed ones, so the post gives none.
- Rochester's two French words in Chapter 37 would place him in the last chapters; the post says only "2 in Chapter 37" and "2 in Volume III".
- John Green is a clerk in Chapter 26; his role is omitted ("a minor character") because of what happens in that chapter.
- Grace Poole stays in the names table as a Thornfield servant, which is how Chapter 11 presents her. Reviewer's call if even that feels too close.
- The NYT quote stops before "cruel stepbrother"; the Stevenson review quote starts after its "--".
- The group set's 4.6 rating and the YouTube playlist are not mentioned; the Discover card is named by title and length (18h 36m).
- The Brontë BBC Radio Drama Collection: 141 ratings in the Wuthering Heights post (read November 12), 142 here (read November 13). Both dated in their sections.

## Open questions for the reviewer or owner

- Adèle's translations are the researcher's, checked for sense against the guidesite; notes.md suggests a French speaker look at them before publishing.
- People Also Ask and AI Overview for `best jane eyre audiobook`, `jane eyre french translations` and `how to pronounce st john in jane eyre` are unchecked (needs a normal browser).
- notes.md item 3: possible 2026/2027 Jane Eyre film or series (unverified). If announced, a one-line FAQ like the Wuthering Heights film one may be worth adding; the post has 7 FAQs, the maximum, so one would have to go.

## Reviewer edits (orchestrator, 2026-11-13): NOT YET APPLIED, nothing wired

State: post.md, registry-entry.mjs, llms-line.txt, all six images and the hero embed exist; nothing is copied into content/blog, data/blog-posts.js or llms.txt; no build. Draft read in full and approved with these edits to post.md before copying:

1. Line 23: delete ", the best performance score there among the most rated editions".
2. Line 255, replace the soft-upsell sentence with: "Seeing Adèle's lines while you hear them settles the rest. In HushBook, the app we built, you can pair Elizabeth Klett's free recording with Project Gutenberg's free EPUB of the same text, and e-book sync (in beta, first sync free) aligns Brontë's text, French included, to her voice."
3. Line 368: "in Jane's card's notes" becomes "in the notes on Jane's card".
4. Line 360 alt, replace with the re-rendered image's alt: Two HushBook screens for Elizabeth Klett's free LibriVox recording, Jane Eyre (version 3): the player 10 seconds into the first chapter, and its read-along page in warm paper, with "but since dinner, Mrs." tinted red and "Reed," underlined.
5. Sources: add the OverDrive catalogue API line for the Chicago Public Library (chipublib) after the San Francisco one; the post names five systems.
6. Re-run `node registry-entry.mjs` until OK.

Inbound links, replacing the list above (no dateModified bump):
- how-to-read-classics-without-getting-bored.md:76: wrap *Jane Eyre* as written above.
- how-long-is-an-audiobook.md:47: do not wrap "Big classics"; append: "*Jane Eyre*, for example, takes 20 hours 33 minutes at 151 words a minute, as our [Jane Eyre audiobook comparison](/blog/best-jane-eyre-audiobook) shows."
- best-wuthering-heights-audiobook.md:291: append to the BBC paragraph: "The collection's first two tracks are the BBC *Jane Eyre*, which our [Jane Eyre audiobook comparison](/blog/best-jane-eyre-audiobook) sets beside the complete recordings."
- best-war-and-peace-audiobook.md, Newton's pick paragraph: append "Newton also reads our pick for the [best Jane Eyre audiobook](/blog/best-jane-eyre-audiobook)."

Then: registry entry first in data/blog-posts.js, llms.txt line, `npm run build:blog`, the ten test suites one by one (8 pass, seo-preservation and seo-repair-contract fail as at HEAD), inspect blog/best-jane-eyre-audiobook.html (title 57 with no suffix, description 160, og:image jane-eyre-picks-og.webp, FAQPage 7, hero first, four figures directly under their H2s), fresh-download recount of 186,145 words and 346 French words with scripts/je-wordcount.py and je-french.py, commit without trailers. Adèle's translations were read by the reviewer and are sound.

## Wired (2026-11-13)

- Reviewer edits 1 to 5 applied to post.md; `node registry-entry.mjs` prints OK (title 61, metaTitle 57, metaDescription 160, description 233, 6 internal links, alts 249/227/219/240). post.md copied byte for byte to `content/blog/best-jane-eyre-audiobook.md` (`cmp` identical).
- `data/blog-posts.js`: entry first, above Pride and Prejudice (44 posts). `llms.txt`: line 41, under the blog line.
- Inbound links as in the reviewer section: classics post (wrap), how-long post, Wuthering Heights post (BBC paragraph), War and Peace post (Newton paragraph). dateModified unchanged on all four (JSON-LD compared with HEAD).
- Recount on a fresh download of Gutenberg #1260 (SHA-256 13414dee…7631, same as the research run): 186,145 words, 38 chapters, volumes 60,508 / 59,611 / 66,026; French 346 words in 55 passages, 0.19%, 2.3 min, Adèle 291, per-chapter row as in the post. No figure changed.
- `npm run build:blog`: 44 posts, sitemap 84 URLs, gtag failed 0. Other blog pages changed only in their "Keep reading" and latest-post lists.
- Tests one by one: localization, seo-localization, tracking-params, mobile-nav, blur-in-heading-reveal, alternative-pages, blog-pages ("44 post(s)") and worker pass; seo-preservation (ar/index.html protected region hash) and seo-repair-contract (routeCount) fail as at HEAD.
- Built page: `<title>` 57 characters with no brand suffix, meta description 160, og:image and twitter:image `jane-eyre-picks-og.webp`, BlogPosting.image the picks card, one JSON-LD block (BlogPosting, FAQPage with 7, BreadcrumbList), hero figure first with the only `fetchpriority="high"`, four body figures each directly after its H2, 11 tables all in `.table-wrap`, no markdown leaks, no en or em dashes, every root-relative link resolves. No `_tmp-je-*` files left.
