# Writer notes: best-war-and-peace-audiobook (2026-11-11)

Files: `post.md`, `registry-entry.mjs` (run `node registry-entry.mjs` for the self-check), `llms-line.txt`. Nothing outside this folder was touched; no build, no commit.

## Measured (from `node registry-entry.mjs`, last run passed "OK")

- Body words 4,952 (prose outside tables 4,227), so readingTime "23 min read" (4,952 / 220 = 22.5).
- title 80, metaTitle 52, metaDescription 159, description 225, cta.heading 45, cta.text 195 characters.
- First sentence 24 words. Takeaways 31/29/27/29/29 words. FAQ answers 35/31/32/32/31/31 words.
- 14 H2s plus Sources, 4 H3s, 6 tables, 3 wide images (each directly under its H2, all on disk), 57 source links (no duplicate URLs), 6 internal links (all exist in content/blog/).
- Every number in takeaways, FAQ answers, metaDescription, description and cta.text appears in the body (script check).
- En and em dashes: 0 in post.md (inside quotes and Sources too), registry-entry.mjs and llms-line.txt.
- Banned phrases (AI filler, "tap any word", "misspel", "cannot open", "Earphones", "559 characters", "all but seven", "Kindle Unlimited", audiobookfest's phantom narrators, "Bromfield's translation"): none. Script also checks the picks card is not embedded in post.md, `hero` is `war-and-peace-picks`, and Maude is never given 361 chapters.

## Self-check changes from the Crime and Punishment script

- `hero` must equal `war-and-peace-picks` (the exemplar's "no hero" check was stale; the live entry has a hero).
- Dash check covers the whole post, quotes included (owner rule for this post).
- New: each wide image must sit directly under an H2; the three named image paths must all be present; the three required internal links must be present; at least one FAQ on length; no duplicate Sources URLs; first sentence under 25 words.
- Banned list adapted: "won an Audie" / "Audie winner" removed because Newton's recording did win (2023, Literary Fiction & Classics); added "won Best Female", "Jason won", "Earphones", "559 characters", "580 characters", "all but seven", "first to keep", "endorsed", "Kindle Unlimited", "Nicholas Guy Smith", "O'Karma", "Juliet Stevenson", "David Case", "Bromfield's translation".

## Decisions

- **Picks** exactly as research-platforms section 7 and the brief: Newton best overall, Jason best to borrow, Mark Nelson's LibriVox Maude Volumes 1 to 4 best free, Penguin Briggs best modern translation. Ballerini and Davidson as "Also worth knowing".
- **H2 order.** Length moved to second place (top three completions are all "how long"). Added "Who is the best War and Peace narrator, Thandiwe Newton or Neville Jason?" (top completions "best narrator" and "thandie newton") and "Is there a Pevear and Volokhonsky War and Peace audiobook?" (the McDuff counterpart).
- **Word count.** 561,870 (site figure) in prose, image and takeaway. Listening times are research-evidence's row for 561,870 at 151 wpm (62 h 1 min, 49 h 37 min, 41 h 21 min, 31 h 0 min). The 562,416 recount is not mentioned: the evidence file says keep 561,870 and does not ask for a comparison.
- **Chapters.** 365 Maude, 361 Russian, with the reason (Book One splits two chapters into five; a short extra chapter at the end of Book Five).
- **Runtime range.** 50 h 39 min (Preece) to 67 h 33 min (Barrett) among the 12 complete single-title recordings in research 1a; main editions 55 h 30 min to 67 h 13 min. Apple-only and Kobo-only listings (e.g. Ellington 72:20) are outside the verified table and not used for the range.
- **Competitor errors corrected without names:** "20.6 hours" (no complete recording under 50 hours); "60 to 67 hours" (four main recordings finish under 60); phantom 63-hour P&V and 60-hour solo Briggs recordings; Davidson "58 hours" (61 h 6 min); Jason "Garnett"/"Bromfield" (Maude). The "10 to 20 hours" dramatisation claim is answered by the table (8 h 25 min to 9 h 38 min) rather than stated, because the "Original Manuscript" listing (about 16 h, labelled abridged by Kobo) makes a flat "nothing between 10 and 25 hours" sentence untrue.
- **Comparison table** includes the Dole LibriVox set marked "first half only", as research section 8 does. The editions image (13 bars) leaves Dole out; the alt matches the image, and the section's answer sentence covers both ("two complete free ones and a free set that stops halfway").
- **Tolstoy's approval** handled as a correction: the 1905 letter quoted by Aylmer Maude, 17 years before their 1922 to 1923 War and Peace (do-not-claim 3). The synthetic edition's "authorized by Tolstoy" blurb is not quoted.
- **Owner's no-negatives rule.** No HushBook limits anywhere. HushBook appears in the table's three LibriVox rows ("HushBook Discover"), one value-first hint in the names section (highlighting plus the free character map, "add Pierre once and keep Monsieur Pierre and Count Bezúkhov in his card's notes", per research do-not-claim 13), and the closing H2. Closing line scoped as in the C&P post. Discover titles named exactly, with card lengths, never by position; the post never says Discover names Mark Nelson.
- **Images** each sit directly under their H2, then the one-sentence answer. Alts rewritten to match the webps on disk (checked visually): editions chart has 13 bars with Garnett first; length tiles say "in fifteen books and two epilogues" and "31 h 0 min"; read-along right phone shows "01 - Book 01 Chapter 01", line "if you don't tell me that this means war" being read, current word "horrors" underlined. The picks card on disk is `war-and-peace-audiobook-picks.webp`; the registry `hero: 'war-and-peace-picks'` needs `content/blog/embeds/war-and-peace-picks.html` (wiring/image agent).
- **In-copyright quotes:** one sentence each for Briggs and P&V (Herrmann's Moscow sentence), plus critics' phrases. Dash-bearing quotes trimmed (Herrmann on Briggs, Remnick on Hemingway, Tolstoy's opening line starts after its dash). Wikisource and Russian Wikipedia source titles lost their site-name suffix (which carries an em dash) to keep dashes out.
- **Sources titles.** Evidence sources use research-evidence's exact titles. Store pages have no recorded titles in research-platforms, so they are labelled descriptively, as in the C&P post. Only the six rendered Audible product pages get pd links; other Audible facts cite the catalogue API URL. Moscow Times added for Pevear's 2 percent estimate.
- **Internal links (6, the cap):** how-long-is-an-audiobook, audiobook-listening-speed, is-librivox-safe-and-legal, best-crime-and-punishment-audiobook, how-to-read-classics-without-getting-bored, how-to-keep-track-of-characters-in-a-book. best-count-of-monte-cristo-audiobook left out for the cap.

## Research facts left out, and why

- The Guardian reviewer's "whiteboard and pen" line: only in scout.md, with a truncated URL and not in either Sources block.
- Russian Wikipedia's 559 to 570 characters and the "about 200 historical" figure: do-not-claim 7; "more than 500" via Pevear only.
- Rogowsky 2016, Richardson 2020, Rodero and Lucas, Murphy 2022: cut for length; five studies kept, both directions.
- Library Journal's Davidson quote, Reddit "it'll cost you two credits", Ballerini repeated-sections review, Penguin's UK-only history on Reddit: cut for length.
- Serialisation history, Bromfield's 1866 draft, Bell's French source, Wiener beyond the opening, Dunnigan and Edmonds critic verdicts (Pavlovskis-Petit via Wikipedia only): unverified at source or off-topic for listening.
- Our 562,416 recount and the scout's 562,677: keep 561,870 (do-not-claim 4).
- AudioFile "Best Audiobooks of 2007" and the Earphones marker: publisher claim / marker only (do-not-claim 7).
- Kindle Unlimited and "free with membership": tier unverified (do-not-claim 8); post says only "Listen for free" to a signed-out visitor.
- HushBook e-book sync, "Transcribe on my PC" (Pro), per-volume character maps: not needed; e-book sync on a split book is unverified.
- Jessie Buckley: kept only as "Audible's cast list does not name Jessie Buckley" (verified absence), never as cast.

## For the orchestrator or owner to decide

1. **Length.** 4,952 body words, about 1,150 more than the C&P post, because the brief adds the French, BBC, P&V and Newton-or-Jason sections. Candidates to cut if wanted: the Newton-or-Jason H2 (fold into picks), the critics' bullets, or the Russian column of the names table.
2. **Hero embed.** `content/blog/embeds/war-and-peace-picks.html` must exist before the build; the webp is `war-and-peace-audiobook-picks.webp`.
3. **Length image footnote** says "the median pace of ten LibriVox readers", the same wording flagged on the C&P image (ten recordings by eight people).
4. **Jessie Buckley sentence** in the BBC section answers a searched phrasing but could be dropped if it reads oddly.
5. **Discover build.** Discover titles and card lengths come from source HEAD c0040d1 (1.3.5+70); App Store shows 1.3.5 (2026-10-30). Play Store build not checked.
6. Optional inbound links (scout.md, five link-only edits) for the wiring agent.
