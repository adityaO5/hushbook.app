# Research evidence: best Brothers Karamazov audiobook (the book, its translations, read or listen)

Post: "Best Brothers Karamazov Audiobook" (slug `best-brothers-karamazov-audiobook`).

Scope: the book facts the comparison needs (publication, structure, the text the free recordings read, our counts), what scholars and reviewers say about each English translation, and the short read-or-listen block. Editions, narrators, prices, LibriVox, the Grand Inquisitor timings and HushBook are in `research-platforms.md`; counts are repeated here only where the evidence uses them.

All pages were read on November 14, 2026. **VERIFIED** = read today on the page, scan or API named. **REUSED** = verified on 2026-11-11 (`../2026-11-11-best-war-and-peace-audiobook/research-evidence.md`, section (f)) or 2026-11-07 (`../2026-11-07-why-cant-i-focus-on-reading/research-evidence.md`) and carried through the Jane Eyre file; its DOI was re-resolved in Crossref today with `scripts/bk-crossref-check.py` and returned the same title, journal, volume and pages. **UNVERIFIED** = not confirmed by a page read today. **OUR CALCULATION** = a saved script on a saved text. **SECONDARY** = a quotation read today as quoted by another page (named), not in the original.

How pages were read: curl and the Crossref, OpenAlex and Europe PMC APIs; no browser automation for this file. Python ran with `-I`; downloads went into new folders in the session scratchpad (`book/dl-gutenberg-28054/`, `book/dl-gutenberg-28054-html/`, `book/dl-gutenberg-2554/`, `book/dl-gutenberg-8578/`, `book/ev/`, `book/ev-oa/`, `book/ev-crossref/`).

No search-volume numbers are cited in this file.

---

## (a) The facts most likely to shape the post

1. **Length, our count:** Project Gutenberg #28054 (Constance Garnett's translation, the text every free recording reads) has **349,788 words** in the novel by the series' rules, **96 chapters** in **12 books and an epilogue**, grouped in **four parts**. At the site's 151 words a minute: **38 h 36 min at 1x, 30 h 53 min at 1.25x, 25 h 44 min at 1.5x, 19 h 18 min at 2x**. An independent recount from the HTML edition with a different parser gives 349,820 (0.01% apart). It is **1.72 times as long as Crime and Punishment** (203,197 words, same script, which reproduces the published figure). OUR CALCULATION (`scripts/bk-wordcount.py`, `scripts/bk-recount.py`).
2. **The Grand Inquisitor:** Book V, Chapter 5, the 36th of 96 chapters, **the longest chapter in the book (9,287 words, about 62 minutes at 151 wpm)**, starting **30.8% of the way in** (about 11 h 54 min at 151 wpm; 12 h 14 min into Bruce Pirie's free recording, whose file runs 59 min 15 s). OUR CALCULATION, both counts agree.
3. **Four translations exist on audio, unabridged:** Garnett (1912; most recordings and all free ones), Pevear and Volokhonsky (1990; Ben Miles, 2024), McDuff (1993; Luke Thompson, 2021), Magarshack (1958; Gabriel Woolf, RNIB). None found for Avsey (1994), Katz (2023), MacAndrew (1970) or Katzer (1980). VERIFIED (samples, credits, catalogue sweeps: research-platforms.md 1c and 1f).
4. **Garnett has no "From the Author" preface.** Gutenberg #28054 goes from the contents to Part I; the McDuff and P&V audiobooks begin with it (their samples). VERIFIED.
5. **What the critics say, in one line each:** Peter France: Garnett "shortens and simplifies", McDuff's literalism "makes for difficult reading", P&V "a rather more satisfactory compromise between the literal and the readable" (SECONDARY, Wikipedia quoting the Oxford Guide, 2000); Daniel Soar (LRB, 2025): P&V's "is the closest to getting across the oddness of the writing" (VERIFIED). The P&V translation won the PEN/Book-of-the-Month Club Translation Prize in 1991 (VERIFIED, pen.org).
6. **Is it hard?** Not sentence by sentence: Project Gutenberg's reading-ease score is 82.0 ("6th grade. Easy to read.") against 83.0 for Crime and Punishment; our same-script mean sentence is 14.0 words against 12.7; 55.5% of the words are dialogue against 55.4%. Length, names and long speeches are the hard part. VERIFIED (Gutenberg pages) and OUR CALCULATION.
7. **Read or listen (two cited sentences for the post):** overall, listening and reading comprehension do not reliably differ (Clinton-Lisell 2022, 46 studies), but minds wander most when only listening (Varao Sousa, Carriere and Smilek 2013). Book-specific addition: minds wander more on difficult texts (Feng, D'Mello and Graesser 2013). REUSED.
8. **What no study tests:** a 38-hour novel on audio, Russian names by ear, the Grand Inquisitor's hour of speech, translation choice for listeners, or a read-along app with this book.

---

## (b) The book

| Claim | Value | Source | Label |
|---|---|---|---|
| Serial publication | "published as a serial in The Russian Messenger from January 1879 to November 1880"; infobox "1879–80; separate edition 1880" | Wikipedia "The Brothers Karamazov" (raw wikitext, read today) | VERIFIED (secondary) |
| Final novel; author's death | "the sixteenth and final novel by Russian author Fyodor Dostoevsky … Dostoevsky died less than four months after its publication." LRB (Soar 2025): "in serial form, in Russkiy Vestnik (the 'Russian Herald'), over the course of 1879 and 1880, the year before Dostoevsky died" | Wikipedia; LRB | VERIFIED |
| Russian title and stress | "Братья Карамазовы … IPA: [ˈbratʲjə kərɐˈmazəvɨ]" (stress on "ma") | Wikipedia lead | VERIFIED |
| Also titled | "also translated as The Karamazov Brothers" (Katzer 1980 and Avsey 1994 use it) | Wikipedia | VERIFIED |
| Structure (Garnett) | 4 parts, Books I to XII and an Epilogue, 96 chapters; Books of 5, 8, 11, 7, 7, 3, 4, 8, 9, 7, 10, 14 chapters, Epilogue 3 | Gutenberg #28054 contents and headings | OUR CALCULATION |
| Book V and VI as the novel's argument | Dostoevsky wrote to his editor that Book V was to portray "the seed of the idea of destruction in our time in Russia among the young people uprooted from reality"; "With Book VI, 'The Russian Monk', Dostoevsky sought to provide the refutation of Ivan's negation of God" | Wikipedia, citing Joseph Frank's biography | SECONDARY (Frank not opened) |
| Zosima's model | "to some extent based on Father Ambrose of the Optina Monastery, who Dostoevsky had met on a visit to the monastery in 1878" | Wikipedia | SECONDARY |
| The Grand Inquisitor's standing | "The most famous, and most famously extraordinary, passage is Book 5, Chapter 5 – 'The Grand Inquisitor'. Whole books have been written about it; Peter Brook turned it into a play" | LRB (Soar 2025) | VERIFIED |
| Freud's line (used in Penguin's blurb) | "The Brothers Karamazov is the most magnificent novel ever written." (Freud, as quoted by the LRB and on Audible's Penguin and Blackstone pages) | LRB; Audible | VERIFIED as quoted (Freud's 1928 essay not opened) |
| Garnett's text used by the free recordings | Gutenberg #28054, "Translator: Constance Garnett", "The Lowell Press, New York"; "Release date: February 12, 2009 … Most recently updated: September 18, 2026"; no "From the Author" preface; nine translator's footnotes at the end. All three LibriVox projects give it as their source (`url_text_source` …/etext/28054 or …/ebooks/28054) | Gutenberg (SHA-256 `2e75c187…ad22fe`); LibriVox API | VERIFIED |
| Popularity on Gutenberg | "34873 downloads in the last 30 days" (Crime and Punishment: 61655) | gutenberg.org/ebooks/28054, /2554 | VERIFIED (snapshot) |
| Reading ease | Karamazov "Reading ease score: 82.0 (6th grade). Easy to read."; Crime and Punishment "83.0 (6th grade). Easy to read."; The Grand Inquisitor (#8578, Blavatsky) "64.2 (8th & 9th grade)" | Gutenberg ebook pages | VERIFIED |
| The narrator is a townsman | "the story – or, as the text claims, the history – purports to be written by an unnamed inhabitant of Skotoprigonyevsk, the (fictional) small town" | LRB (Soar 2025) | VERIFIED |

Counts (all OUR CALCULATION; detail in research-platforms.md sections 3 to 5):

- Word counts: 350,685 whitespace tokens between the Gutenberg markers; **349,788** novel words by the series' rules; 349,820 by the HTML recount.
- Parts: I 69,503 (7 h 40 min); II 77,054 (8 h 30 min); III 83,306 (9 h 12 min); IV 110,575 (12 h 12 min); Epilogue 9,350 (1 h 2 min).
- Chapters: mean 3,644 words (24.1 min at 151 wpm), median 3,401; longest the Grand Inquisitor (9,287, about 62 min), shortest Book I, Ch. 2 (1,297, about 9 min).
- Book VI ("The Russian Monk"): 21,761 words, 6.2%, about 2 h 24 min.
- Dialogue: 55.5% of words inside quotation marks (Crime and Punishment 55.4% by the same function).

---

## (c) The translations: what scholars and reviewers say (short quotes)

| Translation | What is said | Source | Label |
|---|---|---|---|
| **Constance Garnett (1912)** | Garth Terry called it "the first adequate English translation" | Wikipedia, citing Jones and Terry (1983) | SECONDARY |
| Garnett | Peter France: "[Her] translations read easily...the basic meaning of the Russian text is accurately rendered on the whole. It is true … that she shortens and simplifies, muting Dostoevsky's jarring contrasts" | Wikipedia, quoting France, The Oxford Guide to Literature in English Translation (2000), pp. 595 to 596 | SECONDARY (the Guide not opened) |
| Garnett | Korney Chukovsky: under Garnett's pen the style becomes "a safe blandscript: not a volcano, but a smooth lawn mowed in the English manner—which is to say a complete distortion of the original." | Remnick, "The Translation Wars", The New Yorker (2005); also quoted by Soar (LRB 2025) | VERIFIED (as quoted by both) |
| Garnett | "Garnett worked at great speed – according to one account she turned out five thousand words a day" | Soar, LRB (2025) | VERIFIED (Soar's report; a letter in a later LRB issue disputes his dictionary anecdote: do not use that part) |
| Garnett | Emery and Geballe (2020): Garnett uses "brain fever" "in reference to a wide variety of medical conditions in the works of Fyodor Dostoevsky"; "Garnett's abundance of interpolated brain fevers" | PMLA 135(5), 895-913, DOI 10.1632/pmla.2020.135.5.895 (abstract) | VERIFIED (Crossref + abstract). Our count: "brain fever" 9 times in #28054. Contexts are late-book: do not quote them |
| Garnett | Geballe (2020): Garnett's "translation strategies redeem, resurrect, and provide miracles" for Dostoevsky's unburied corpses, including "Father Zosima in The Brothers Karamazov" | The Russian Review 79(4), 606-622, DOI 10.1111/russ.12287 (abstract) | VERIFIED (Crossref + abstract). Background only (Zosima's death is a plot point) |
| Garnett revisions | "In 1976, Ralph Matlaw thoroughly revised Garnett's work for his Norton Critical Edition volume"; Wikipedia's list adds revisions by Yarmolinsky (1933), Kropotkin (1949, abridged), Komroff (1958) and Matlaw with Oddo (2011) | Wikipedia | SECONDARY |
| **David Magarshack (1958)** | France: "it is not certain that Magarshack has worn as well as Garnett. He certainly corrects some of her errors; he also aims for a more up-to-date style" | Wikipedia quoting France (2000), p. 596 | SECONDARY |
| Magarshack | Remnick: Larissa Volokhonsky, reading "Karamazov" over her husband's shoulder "in a translation by one of Garnett's epigones, David Magarshak", "was outraged. It's not there! she thought. He doesn't have it! He's an entirely different writer!" | Remnick (2005) | VERIFIED |
| **Pevear and Volokhonsky (1990)** | "1991 Richard Pevear and Larissa Volokhonsky, The Brothers Karamazov by Fyodor Dostoevsky (North Point Press), translated from Russian" | PEN America, PEN Translation Prize list | VERIFIED |
| P&V | France: "generally offer a rather more satisfactory compromise between the literal and the readable. In particular, their rendering of dialogue is often livelier and more colloquial than McDuff's...Elsewhere … the desire to replicate the vocabulary or syntax of the Russian results in unnecessary awkwardness and obscurity." | Wikipedia quoting France (2000), p. 597 | SECONDARY |
| P&V | Soar: "Pevear and Volokhonsky's version, published by Vintage, is the closest to getting across the oddness of the writing. In his introduction, Pevear explains that he and his wife tried to replicate the narrator's redundancies and tautologies" | LRB 47(4), 6 March 2025 | VERIFIED |
| P&V | Joseph Frank (Princeton): "Heartily recommended to any reader who wishes to come as close to Dostoevsky's Russian as it is possible."; Donald Fanger (Washington Post): "[This] scrupulous rendition can only be welcomed." | Publisher quotes on the Ben Miles Audible page (and, misleadingly, on Blackstone's Davidson pages) | VERIFIED as publisher quotes |
| **David McDuff (1993; Penguin, revised 2003)** | France: "McDuff carries this literalism the furthest of any of the translators. In his Brothers Karamazov the odd, fussy tone of the narrator is well rendered in the preface … Such 'foreignizing' fidelity makes for difficult reading." (France wrote in 2000, before McDuff's 2003 revision) | Wikipedia quoting France (2000), pp. 596 to 597 | SECONDARY |
| **Ignat Avsey (1994)** | France: "His is an enjoyable version in the domesticating tradition." | Wikipedia quoting France (2000), p. 597 | SECONDARY |
| **Michael R. Katz (2023)** | Soar: "Katz, for his part, is one of those translators who writes, perfectly nicely, as if the thing came out yesterday … And he sometimes writes things that just aren't there in the original" | LRB (2025) | VERIFIED |
| One line in four translations | P&V: "One thing, perhaps, is rather doubtless." McDuff: "One thing is, perhaps, fairly beyond doubt." Avsey: "One thing, however, is indisputable." Katz: "In any event, one thing is fairly certain" (all from "From the Author"; Garnett's translation has no preface) | LRB (2025) | VERIFIED. Ready for the post's "hear the difference" H3 beside the two sample transcriptions in research-platforms.md 1c |

**What this evidence supports in the post:** "Critics split: Peter France found Garnett easy but simplified and McDuff faithful but hard going; the LRB's Daniel Soar thought Pevear and Volokhonsky closest to the oddness of Dostoevsky's narrator." Keep France attributed as "as quoted on Wikipedia" or cite the Oxford Guide with "(2000)" and the page, not as read by us.

**Held in reserve (Crossref-checked today, not needed):** Ostanina-Olszewska and Despot (2017), "When 'soul' is lost in translation: Metaphorical conceptions of 'soul' in Dostoyevsky's original … and its translations into Polish, Croatian and English", Cognitive Studies 17, DOI 10.11649/cs.1319; Jacobs (2007), "The Brothers Incandenza: Translating Ideology in Fyodor Dostoevsky's The Brothers Karamazov and David Foster Wallace's Infinite Jest", Texas Studies in Literature and Language 49(3), 265-292, DOI 10.1353/tsl.2007.0014; Berman (2009), "Siblings in The Brothers Karamazov", The Russian Review 68(2), 263-282, DOI 10.1111/j.1467-9434.2009.00524.x; Miller (1982), review of Terras, "A Karamazov Companion", SEEJ 26(3), 357, DOI 10.2307/306995.

---

## (d) Read or listen: the evidence (REUSED; the post carries two cited sentences plus one book-specific)

Today's Crossref re-check (`scripts/bk-crossref-check.py`) returned the same titles, journals, volumes and pages for all seven reused DOIs.

**Use these two in the post:**

1. **Clinton-Lisell (2022), "Listening Ears or Reading Eyes: A Meta-Analysis of Reading and Listening Comprehension Comparisons", Review of Educational Research 92(4), 543-582. DOI 10.3102/00346543211060871.** REUSED, abstract re-read today: "Based on robust variance estimation (46 studies; N = 4,687), the overall difference between reading and listening comprehension was not reliably different (g = 0.07, p = .23)."
2. **Varao Sousa, Carriere and Smilek (2013), "The way we encounter reading material influences how frequently we mind wander", Frontiers in Psychology 4. DOI 10.3389/fpsyg.2013.00892.** REUSED, abstract re-read today: "reading aloud led to the least amount of mind wandering, while listening to the passage led to the most mind wandering."

Suggested two sentences (no dashes): "Across 46 studies, Clinton-Lisell (2022) found no reliable overall difference between understanding a text by reading it and by listening to it. Minds do wander more when people only listen, though: Varao Sousa and colleagues (2013) found listening produced the most mind wandering of three ways of taking in a passage."

**Book-specific addition (for the Grand Inquisitor and Book VI):**

3. **Feng, D'Mello and Graesser (2013), "Mind wandering while reading easy and difficult texts", Psychonomic Bulletin & Review 20(3), 586-592. DOI 10.3758/s13423-012-0367-y.** REUSED from 2026-11-07 (80 undergraduates; mind wandering at 42.3% of probes on difficult texts vs 36.2% on easy versions, VERIFIED then on Springer's open-access text); abstract re-read today via Europe PMC (PMID 23288660): "mind wandering occurred more frequently when participants read difficult rather than easy texts. However, mind wandering had a more negative influence on comprehension for the difficult texts". Suggested sentence: "Dense passages make it worse: in a 2013 study of 80 students, Feng, D'Mello and Graesser found minds wandered more on difficult texts than on easy versions of the same passages." The study used reading, not listening, and short standardized passages.

**Held in reserve (all re-checked in Crossref today):** Hui and Godfroid (2026; online 2025-06-12), Language Learning 76(1), 311-351, DOI 10.1111/lang.12721 (86 learners; reading-while-listening below silent reading, both above listening only); Richardson et al. (2020), Scientific Reports 10, 11298, DOI 10.1038/s41598-020-68253-2; Rodero and Lucas (2023; online 2021), New Media & Society 25(7), 1746-1764, DOI 10.1177/14614448211024142 ("listeners enjoyed stories narrated by a human voice more than a synthetic one": supports "avoid AI-voice listings"); Murphy et al. (2022; online 2021), Applied Cognitive Psychology 36(1), 69-82, DOI 10.1002/acp.3899 ("minimal costs incurred by increasing video speed from 1x to 1.5x, or 2x speed, but performance declined beyond 2x speed": lecture videos, not novels).

---

## What the evidence does not show

- No study tests listening to a 38-hour novel, or which translation is easier to follow by ear.
- No study tests how listeners keep track of Russian names and patronymics, or whether hearing "Mitya" and "Dmitri" as separate words confuses them.
- No study tests the Grand Inquisitor (an hour of near-continuous speech) on audio, or skipping Book VI.
- Feng (2013) used reading of short standardized passages; Clinton-Lisell (2022) pooled studies of short texts; Varao Sousa (2013) used one passage. None tests a novel.
- France's judgements (2000) predate McDuff's 2003 revision and the 2023 Katz translation.

---

## (e) Conflicts between sources

1. **Davidson's translation:** readingtheodyssey.com pairs Frederick Davidson with Pevear and Volokhonsky; OverDrive credits Garnett, the sample matches Garnett, and Blackstone's recording is "(P)2000". Publisher pages for Davidson quote P&V critics. Garnett is right.
2. **Ben Miles's runtime:** welovetranslations "46h 16m"; Audible, Apple, OverDrive and hoopla 42 h 16 min. Use 42 h 16 min.
3. **Pirie's version number:** welovetranslations "Version 2"; LibriVox and archive.org: version 3 (Addison is version 2).
4. **Word count:** annotatedebooks.com "approximately 365,000"; loudreader "~339,900"; ours 349,788 (Garnett). Translations differ in length; say "Garnett's translation, by our count".
5. **Publication:** Wikipedia "January 1879 to November 1880" and "separate edition 1880"; LRB "over the course of 1879 and 1880". Consistent. The post needs only "serialised in 1879 and 1880".
6. **P&V's date:** Wikipedia and PEN give 1990 (North Point Press; prize 1991); the audiobook is titled "Bicentennial Edition" (Dostoevsky was born in 1821; the FSG Bicentennial print edition's year not checked) and was released 2024-05-07. Say "Pevear and Volokhonsky's 1990 translation, recorded in 2024".
7. **Spelling:** Garnett "Zossima", "Pavlovitch"; modern translations and Wikipedia "Zosima", "Pavlovich". Use Garnett's spellings when quoting her or the free recordings, modern ones in general prose, and say so once.
8. **BBC dramatisation:** Wikipedia says it "omits the Grand Inquisitor episode"; the BBC page does not say. Do not claim either way.

---

## Sources

Ready to paste. Titles are the pages' own (`<title>`, article headline or Crossref title) as read on 2026-11-14. Owner rule: no en or em dashes in the post; the LRB title uses a question mark and a middle word only, and none of the titles below contains a dash.

- [Project Gutenberg, "The Brothers Karamazov by Fyodor Dostoyevsky" (eBook #28054, translated by Constance Garnett)](https://www.gutenberg.org/ebooks/28054)
- [Project Gutenberg, plain text of eBook #28054](https://www.gutenberg.org/cache/epub/28054/pg28054.txt)
- [Project Gutenberg, "Crime and Punishment by Fyodor Dostoyevsky" (eBook #2554)](https://www.gutenberg.org/ebooks/2554)
- [Project Gutenberg, "The Grand Inquisitor by Fyodor Dostoyevsky" (eBook #8578, translated by H. P. Blavatsky)](https://www.gutenberg.org/ebooks/8578)
- [Wikipedia, "The Brothers Karamazov"](https://en.wikipedia.org/wiki/The_Brothers_Karamazov)
- [Daniel Soar, "Will I, Won't I? Dostoevsky's Kiss", London Review of Books, Vol. 47 No. 4, 6 March 2025](https://www.lrb.co.uk/the-paper/v47/n04/daniel-soar/will-i-won-t-i)
- [David Remnick, "The Translation Wars", The New Yorker (2005)](https://www.newyorker.com/magazine/2005/11/07/the-translation-wars)
- [PEN America, "PEN Translation Prize"](https://pen.org/pen-translation-prize/)
- [BBC Radio 4 Extra, "Dostoyevsky, The Brothers Karamazov, 1. Inheritance"](https://www.bbc.co.uk/programmes/b00y9455)
- [Penguin UK, "The Brothers Karamazov" (Audio Download, read by Luke Thompson, translated by David McDuff)](https://www.penguin.co.uk/books/35480/the-brothers-karamazov-by-dostoyevsky-fyodor/9780241533222)
- [Emery and Geballe (2020), "Between Fiction and Physiology: Brain Fever in The Brothers Karamazov and Its English Afterlife", PMLA](https://doi.org/10.1632/pmla.2020.135.5.895)
- [Geballe (2020), "Remains To Be Seen: Constance Garnett and the English Afterlife of Dostoevsky's Corpses", The Russian Review](https://doi.org/10.1111/russ.12287)
- [Clinton-Lisell (2022), "Listening Ears or Reading Eyes: A Meta-Analysis of Reading and Listening Comprehension Comparisons", Review of Educational Research](https://doi.org/10.3102/00346543211060871)
- [Varao Sousa, Carriere and Smilek (2013), "The way we encounter reading material influences how frequently we mind wander", Frontiers in Psychology](https://doi.org/10.3389/fpsyg.2013.00892)
- [Feng, D'Mello and Graesser (2013), "Mind wandering while reading easy and difficult texts", Psychonomic Bulletin & Review](https://doi.org/10.3758/s13423-012-0367-y)
- [We Love Translations, "What's the best translation of The Brothers Karamazov?"](https://welovetranslations.com/2022/01/10/whats-the-best-translation-of-the-brothers-karamazov/) (for the translators' first sentences used in our sample test; cite only if the post mentions the method)

Optional (only if used): Rodero and Lucas (2023), https://doi.org/10.1177/14614448211024142 ; Murphy et al. (2022), https://doi.org/10.1002/acp.3899 ; Hui and Godfroid (2026), https://doi.org/10.1111/lang.12721 .

Store pages for the comparison table (Audible, Apple Books, OverDrive, hoopla, LibriVox, archive.org) are listed in research-platforms.md section 11; label them descriptively, as the Jane Eyre post did. Internal sources: 151 words a minute, `/blog/how-long-is-an-audiobook`; Crime and Punishment's figures, `/blog/best-crime-and-punishment-audiobook`.

---

## Do not claim

1. That listening is worse than reading in general (Clinton-Lisell 2022: no reliable overall difference), or that reading along improves comprehension for self-paced adults.
2. That any study tested this novel, its names, its translations or the Grand Inquisitor on audio.
3. France's opinions as our reading of the Oxford Guide (we read them on Wikipedia): attribute them.
4. Soar's "dictionary by her deckchair" anecdote (disputed in the LRB's letters).
5. That one translation is "the most accurate" or "the best": report who said what.
6. Sample sizes other than these: Clinton-Lisell 46 studies (N = 4,687); Feng 80 undergraduates; Hui and Godfroid 86.
7. Any plot detail from the LRB essay (it describes the murder, the trial and the end of the Grand Inquisitor), from Geballe's abstract (Zosima's corpse), or from the "brain fever" contexts.
8. A Russian word count or Russian name-form counts (not processed today).
9. That P&V's audiobook is from 1990, or that the "Bicentennial Edition" is a new translation (it is the 1990 translation, recorded in 2024).
