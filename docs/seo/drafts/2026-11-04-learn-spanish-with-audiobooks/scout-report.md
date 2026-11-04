# Blog topic scout, 2026-11-04

Method: about 420 Google autocomplete calls (`client=firefox&hl=en&gl=us`): 181 single seeds (question, persona and need shapes) plus a-z expansions of 9 seeds ("audiobooks to learn spanish", "spanish audiobooks", "french audiobooks", "german audiobooks", "audiobooks for language learning", "audiobooks with hearing aids", "internet archive audiobooks", "graded readers", "aphantasia audiobooks"). Raw results: `C:\Users\rakes\AppData\Local\Temp\claude\34842c9e8e99357b\5564f299-6c40-46f0-80a7-4dc4f59fee6e\scratchpad\ac\r1.json` to `r6.json`. I checked SERPs with WebSearch, which is Bing-like and not Google, so rank checks are approximate. Cannibalization was checked against `~/hushbook-seo/gsc/2026-11-02/queries_pages.csv` and `queries.csv`, and the H2s of the published posts were read.

**Main finding:** the biggest new cluster with no coverage on the site is people learning a language with audiobooks. Spanish has 127 distinct audio phrasings, French 104 and German 62. GSC shows zero impressions for any of them. The SERPs are mostly Audible and Kobo store listings plus vendor blogs (Lingopie, FluentU, Beelinguapp, Migaku). The AI summaries even say "no rigorous research" was found, so a sourced page has room to rank. HushBook fits well: its Discover tab already offers LibriVox in Spanish, French, German, Italian and Portuguese, and on-device transcription shows the words in the narrator's language. This is a series: whichever language goes first, the rest follow with the same template.

---

## #1 Learn Spanish with audiobooks

- **Slug:** `learn-spanish-with-audiobooks` (pairs with `learn-english-with-audiobooks`)
- **H1:** How to Learn Spanish With Audiobooks (and Free Ones With Text)
- **Answer-first opening:** Audiobooks help you learn Spanish when you can follow the words: start with short, slow beginner stories, read the Spanish text while you listen, replay each chapter until you understand it without the text, and only then move to native-speed novels.

### H2s (autocomplete / PAA wording)
1. Can you learn Spanish from audiobooks?
2. What research says about reading and listening at the same time in a new language
3. What are the best Spanish audiobooks for beginners? (A1 to A2: graded short stories, "slow Spanish", children's classics)
4. Spanish audiobooks for intermediate learners (B1 and up: first real novels)
5. Where can I listen to audiobooks in Spanish for free? (LibriVox Spanish, Libby/hoopla Spanish shelves, Spotify hours, public-domain Internet Archive items)
6. Do Spanish audiobooks come with text or a transcript? (with text, with transcript, with English translation, bilingual)
7. Can you learn Spanish on Audible, Spotify or Libby?
8. A simple routine: listen, read along, replay, then listen without text (speed section: why Spanish sounds fast)
9. How to read along with a Spanish audiobook in HushBook

### FAQ (6)
1. Can you learn Spanish just by listening to audiobooks?
2. Are there free Spanish audiobooks for beginners?
3. Does Audible have books in Spanish, and can you learn Spanish on Audible?
4. Are Spanish audiobooks with English translation good for learning?
5. Should I pick Latin American or Castilian (Spain) narration? (autocomplete: "best audiobook to learn mexican spanish", "mexican spanish audiobooks")
6. Are podcasts or audiobooks better for learning Spanish? (autocomplete: "podcasts or audiobooks to learn spanish", "best podcasts or audiobooks to learn spanish")

### Autocomplete phrasings (127 distinct Spanish audio/LibriVox phrasings)
- "audiobooks to learn spanish" a-z family: **20** (audiobooks to learn spanish, best audiobooks to learn spanish for beginners, easy audiobooks to learn spanish, free audio books to learn spanish, are there audio books to learn spanish, can you learn spanish on audible, podcasts or audiobooks to learn spanish, best audiobook to learn mexican spanish, learn spanish audiobook reddit ...)
- "spanish audiobooks" a-z family: **93** (spanish audiobooks for beginners, a2 spanish audiobooks, spanish a1 audiobook, slow spanish audiobooks, simple spanish audiobooks, intermediate spanish audiobooks, spanish audiobooks with text, spanish audiobooks with transcript, spanish audiobooks with english translation, bilingual audiobooks spanish english, spanish audiobooks on libby / spotify / audible / youtube, spanish audiobooks free download, dreaming spanish audiobooks, pimsleur spanish audiobooks, paul noble spanish audiobooks in order ...)
- By sub-intent (overlapping): learn/learning **37**, platform (Spotify/Audible/Libby/YouTube/app/LibriVox) **23**, beginner/easy/level **20**, free/download **16**, text/transcript/translation/bilingual **7**, kids **7**
- Question shapes: can you learn spanish from audiobooks; are there audio books to learn spanish; how to learn spanish audiobook; how to listen to audiobooks in spanish; where can i listen to audiobooks in spanish; does audible have books in spanish; can you learn spanish on audible
- Generic language-learning questions that can go in as a FAQ or a section (about 12): can you learn a language by listening to audiobooks; does listening to audiobooks in another language help you learn; are audiobooks good for language learning; best audiobooks for language learning; graded readers with audio (+ spanish graded readers with audio, graded readers spanish a1/a2/b1)

### SERP notes
- "audiobooks to learn spanish for beginners": mostly **store listings** (Audible .com/.es/.ca/.de, Kobo, Bookmate, hoopla library records, TuneIn), plus BookRiot "5 Great Spanish Audiobooks" (old, thin), trufluency.com and an Audible blog article. Weak.
- "spanish audiobooks with text": spanish.academy "22 Spanish audiobooks with text" (vendor list), BookRiot, a row of Learning Ally catalog records, library catalog pages. Weak, and none of them explain how to get the text.
- "can you learn spanish from audiobooks": Lingopie x2 (vendor), Open University OpenLearn Create page (kids), Audible blog, Talkpal, Speechling (vendor), metacast/Storytel listings. The AI summary says "no rigorous research ... most sources are sellers". A research-backed answer page can win the citation.

### Cannibalization check
- GSC 2026-11-02: **zero** queries containing spanish, french, german, bilingual, translat, foreign, language or graded. Only Italian hit: "app audiolibri gratis italiano" -> /it (1 impression, a different intent).
- Content: `learn-english-with-audiobooks` is English-only. Its H2 "Can you learn English just by listening" is language-specific, so no conflict. Reuse its reading-while-listening studies briefly and link to it, rather than repeating the full research section.
- Do not target "do audiobooks come with text": GSC sends it to /audiobook-with-text and can-you-read-along-with-audible.

### Product fit: HIGH
- Pain: Spanish narration feels too fast and words blur together ("slow spanish audiobooks", "spanish audiobooks with text/transcript"). HushBook's answer: Discover lists LibriVox and Internet Archive classics **in Spanish**. The app transcribes the Spanish audio on the phone and fills in each word as the narrator says it, with a red underline on the current word. Long-press a line to replay it, slow the speed down, and keep words or phrases with Quotes & notes. Your own DRM-free Spanish MP3/M4B files (graded-reader audio downloads, Libro.fm purchases) import the same way.
- Limits to state honestly: no Audible, Libby or Spotify import (DRM), so Pimsleur, Paul Noble and most Audible "learn Spanish" titles are out. LibriVox Spanish is public domain (old vocabulary, volunteer narrators, Spain and Latin American accents mixed). Speech recognition errs on names. No built-in translation that I could see; the dictionary samples are English words, so the platform-facts agent must confirm. No plain-text transcript export.

### Internal links
- /blog/learn-english-with-audiobooks (sibling method + studies)
- /blog/free-read-along-audiobooks (free sources with text)
- /blog/best-librivox-app and /blog/is-librivox-safe-and-legal (LibriVox Spanish)
- /blog/audiobook-listening-speed (speed section)
- /read-along-audiobooks (answer page) or /blog/does-reading-along-with-an-audiobook-help

---

## #2 Learn French with audiobooks

- **Slug:** `learn-french-with-audiobooks`
- **H1:** How to Learn French With Audiobooks (Free Ones With Text)
- **Answer-first opening:** You can learn French with audiobooks if you pair them with the text: begin with short graded stories read slowly, follow the French words as they are spoken, replay what you missed, and save native-speed classics for when a chapter makes sense on the second listen.

### H2s
1. Can you learn French by listening to audiobooks?
2. Why spoken French is hard to follow (liaison, dropped sounds) and how reading along helps
3. What are the best French audiobooks for beginners? (A1, A2, "easy French")
4. French audiobooks for intermediate learners (B1 and up)
5. Where can I find free French audiobooks? (LibriVox French, Libby, Spotify, Internet Archive)
6. Are there French audiobooks with text or a transcript? (with transcript, with English translation)
7. Are there French audiobooks on Spotify or Audible?
8. How to read along with a French audiobook in HushBook

### FAQ (6)
1. Can you learn French just from audiobooks?
2. Are there free French audiobooks with a transcript?
3. Are there French audiobooks on Spotify?
4. Are French audiobooks with English translation useful?
5. Is Harry Potter in French a good first audiobook?
6. What speed should I listen to French audiobooks at?

### Autocomplete phrasings (104 distinct French audio/LibriVox phrasings)
- "french audiobooks" a-z: 98, plus seed variants. Sub-intents: platform **22**, free/download **13**, beginner/easy/level **12**, learn/learning **12**, text/transcript/translation **7**, kids **5**
- Examples: french audiobooks for beginners (+free), b1 french audiobooks, french a1 audiobook, easy french audiobooks (+spotify), simple french audiobooks, intermediate french audiobooks, french audiobooks with text, french audiobooks with transcript, free french audiobooks with transcript, french audio books with english translation, learn french through audiobooks, learn french with audiobooks, are there french audiobooks on spotify, how to find french audiobooks on spotify, librivox french audiobooks

### SERP notes
- "french audiobooks for beginners": Lingopie "7 Best Audiobooks to Learn French", FluentU x2 (french-audiobooks, french-audio-books), Audible blog (.com and .com.au), then Audible/Bookmate/Storytel/Libro.fm store pages. Medium-weak (vendor blogs, no sources).
- Generic "can you learn a language by listening to audiobooks": Migaku, JustLearn, LanguageConvo, Beelinguapp (several pages), a LibriVox forum post. All vendor content, and the AI summary says it found no controlled research.

### Cannibalization check
- GSC: zero French queries. No overlap with published posts. If both #1 and #2 ship, each one targets its own language. The generic "can you learn a language" question becomes a FAQ in each post, or a later hub page.

### Product fit: HIGH
- Same features as #1, and French makes the case even better: liaison makes word boundaries hard to hear, and word-level highlighting shows where each word starts. Discover lists French LibriVox titles. Limits: same as #1. Watch public-domain status: Le Petit Prince is still under US copyright.

### Internal links
- /blog/learn-english-with-audiobooks, /blog/free-read-along-audiobooks, /blog/best-librivox-app, /blog/audiobook-listening-speed, /blog/learn-spanish-with-audiobooks (if #1 ships first)

---

## #3 Audiobooks with hearing aids and hearing loss

- **Slug:** `audiobooks-for-hearing-loss`
- **H1:** Audiobooks With Hearing Loss: Hearing Aids, Cochlear Implants and Reading Along
- **Answer-first opening:** Yes, you can listen to audiobooks with hearing aids or a cochlear implant: stream the book straight to them over Bluetooth (or a streamer, telecoil or cable), choose clear narrators at a comfortable speed, and read the words along with the audio, which audiologists suggest as listening practice after a new fitting.

### H2s
1. Can you listen to audiobooks with hearing aids?
2. How do you stream audiobooks to hearing aids? (Made for iPhone, Android ASHA / LE Audio, streamers, telecoil)
3. Are audiobooks good for adjusting to new hearing aids?
4. Audiobooks for cochlear implant listening practice
5. What makes an audiobook easier to hear? (narrator voice, speed, background music, mono audio)
6. Free audiobooks for hearing impaired listeners (and who qualifies for talking-book services)
7. Can deaf people enjoy audiobooks? (text and captions)
8. Reading along with any audiobook in HushBook

### FAQ (6)
1. Can you listen to Audible through hearing aids?
2. Do hearing aids stream audiobooks on Android?
3. Should I read along while I listen with new hearing aids?
4. Does slowing down an audiobook help with hearing loss?
5. Are there audiobooks with captions for deaf people?
6. Do talking-book libraries (NLS, Calibre, Listening Books) serve people with hearing loss?

### Autocomplete phrasings (about 11 relevant, from 17 hearing-related)
- how to listen to audiobooks with hearing aids; can you listen to audiobooks with hearing aids; audiobooks for people with hearing aids; audio books for hearing aids; audiobooks for hearing impaired; free audio books for hearing impaired; audiobooks for hard of hearing; talking books for hard of hearing; audiobooks for deaf; audiobooks for deaf people; audiobooks for cochlear implant; plus nearby phrasings: cochlear implant listening practice, listening exercises for cochlear implant
- Small cluster, but the questions are phrased the way AI answer engines lift them.

### SERP notes
- "how to listen to audiobooks with hearing aids": templated hearing-clinic blogs (Van Doorne Hearing x3, HAHC x2, Fort HealthCare, ENT Sinus & Hearing Care, a New York Hearing Center beta site), the MED-EL blog, hearinglikeme.com, HearingTracker forum threads, Amplifon AU, and the Audible blog post "A new chapter for the hearing impaired". Weak, and the clinic pages are syndicated copies of each other.
- "audiobooks for hearing impaired people": Audible "hearing loss" category pages, an NIH SBIR grant abstract (R44 DC017403, an audiobook app for people with hearing loss), spun-content sites, IBVI (which is for blind readers). Very weak. The AI summary says it "turned up few sources aimed specifically at people with hearing loss".

### Cannibalization check
- GSC: zero queries with hearing, deaf or cochlear.
- Content overlap: **medium**. `audiobooks-with-captions` has the H2 "Do captions help if you are hard of hearing?" (Zekveld 2009, WHO, NIDCD). Keep this post practical (streaming, fitting, CI practice, services) and link to the captions post for the caption evidence instead of repeating it.

### Product fit: MEDIUM-HIGH
- Clinics and Audible's own article recommend following the printed text while listening as practice with new hearing aids or a cochlear implant. HushBook gives word-synced text for any DRM-free book you own, with the Vision profile for large captions, speed control and long-press to replay a line.
- Limits: not medical ("reading aid, not medical"). The app does not stream to hearing aids itself; the phone does that. Audible and Libby books cannot be imported. Recognition errors on names matter more when you depend on the text.

### Internal links
- /blog/audiobooks-with-captions, /audiobook-with-text, /blog/audiobook-listening-speed, /blog/how-to-listen-to-audiobooks-for-free, /blog/can-you-read-along-with-audible

---

## Research brief for #1 (learn-spanish-with-audiobooks)

### Evidence agent (studies and numbers; check every DOI with Crossref, use Europe PMC/ERIC for abstracts)
- Is there any reading-while-listening (RWL) or audiobook study whose learners were studying **Spanish, French or another non-English L2**? (The learn-english post used EFL studies: Brown, Waring & Donkaewbua 2008; Chang & Millett 2014; Webb & Chang 2015; Clinton-Lisell 2023. Reuse at most one or two and look for L2 Spanish ones.)
- Captioned and same-language-subtitle meta-analyses for L2 listening and vocabulary: Montero Perez, Van den Noortgate & Desmet 2013 (System) effect sizes; anything newer (2020 onward) that covers L2 Spanish or French.
- How fast is spoken Spanish? Pellegrino, Coupé & Marsico 2011 (Language): syllables per second for Spanish vs English and information rate. This supports the "why Spanish sounds fast" section.
- Does slowing playback help L2 listening comprehension? (e.g. Zhao 1997 Applied Linguistics, learner-controlled speech rate; any recent replication.) Is there evidence on 0.75x for learners?
- Vocabulary coverage needed to understand listening vs reading: van Zeeland & Schmitt 2013 (95% for listening), Hu & Nation 2000 (98% for reading). How many word families is that for a typical novel?
- Graded readers / extensive listening: Nation & Waring, or the Extensive Reading Foundation guide, on level-matched audio. Any study on graded readers with audio.
- How long it takes to learn Spanish: FSI official language difficulty page (Spanish = Category I, weeks and class hours), quoted exactly.
- Scale: Instituto Cervantes "El español en el mundo" latest annual report (native speakers, people studying Spanish as a foreign language). MLA language enrollment survey for US college Spanish enrollment.
- Honest limits: anything showing listening alone does not build speaking. Krashen's input hypothesis is theory, so label it that way. A note on what "Dreaming Spanish"-style comprehensible-input hour claims are (vendor claims, not studies).

### Platform-facts agent (fetch and quote the same day, exact wording + URL)
- **LibriVox:** number of Spanish-language projects (librivox.org search by language, or the API `https://librivox.org/api/feed/audiobooks?language=Spanish` if it accepts that). Find 5 to 8 learner-friendly public-domain titles with LibriVox URLs and narrator accent notes, checking US public-domain status (e.g. Horacio Quiroga "Cuentos de la selva" 1918, Juan Ramón Jiménez "Platero y yo" 1914, Bécquer "Leyendas", Spanish fairy-tale collections, short-story collections).
- **Audible:** does audible.com sell Spanish-language audiobooks (its Spanish-language storefront/category page)? Does Read & Listen (Whispersync) work for Spanish titles? What do the Paul Noble and Pimsleur Spanish pages say (runtime, course vs book)?
- **Spotify:** are Spanish-language audiobooks in the Premium catalog in the US? Current listening-hour allowance (the free post has 15 h US/UK/CA/AU and 12 h in the Oct 2026 markets), recheck.
- **Libby/OverDrive and hoopla:** language filter (Spanish) in search, and whether audiobooks show any text (they do not; quote the help page).
- **Graded readers with audio:** Teach Yourself / Olly Richards "Short Stories in Spanish for Beginners". How is the audio delivered (MP3 download vs locked app)? Is it DRM-free? Same for one other series (e.g. Lingo Mastery or Paco Ardit / Juan Fernández "Spanish graded readers").
- **DRM-free shops:** does Libro.fm sell Spanish-language audiobooks, and does it state DRM-free MP3/M4B downloads (exact quote)?
- **Competitors** (exact store-listing claims): Beelinguapp (bilingual karaoke text), LingQ (import audio + text), Lingopie (video). How they handle text sync, and price model.
- **HushBook app source (`D:\hushbook`):** confirm Discover filters by Spanish and lists both LibriVox and Internet Archive Spanish items. Confirm the whisper model is multilingual and how language is chosen (auto-detect or setting). Confirm the playback speed range, whether the dictionary works for Spanish words, whether Quotes & notes and long-press replay work the same in Spanish, and whether any translation exists (so the post states it correctly).

---

## Rejected on the day

- **Internet Archive audiobooks** (84 phrasings): the long tail is pirated copyrighted titles (Harry Potter, Dune, Fourth Wing, Stephen King), which is legal and brand risk. The public-domain side overlaps best-librivox-app and is-librivox-safe-and-legal.
- **Do audiobooks come with text / does an audiobook come with the book** (12): GSC already sends these to /audiobook-with-text and can-you-read-along-with-audible.
- **Bookmark / highlight audiobooks** (Spotify, Apple Books, Libby, Audible; about 12): fully covered by how-to-take-notes-on-audiobooks (H2s "How to bookmark..." and "Can you highlight audiobooks?").
- **Search inside an audiobook / page numbers on Audible / how to quote or cite an audiobook** (about 28): the cite SERP is owned by Scribbr, Purdue and EasyBib. HushBook's "Search in book" only appears in ebook text mode; there is no transcript search to point to.
- **Audiobooks for visually impaired / blind / low vision** (30+): the SERP is owned by NLS, RNIB, Learning Ally, Bookshare and AFB, and on-screen text does not help blind listeners.
- **Audiobooks / players for seniors and the elderly** (about 25): device intent ("simple audiobook player for seniors"); HushBook is not a simplified player.
- **Audiobooks and concussion** (7, question-shaped): YMYL medical, and early concussion advice limits screen use, which is HushBook's whole value.
- **Audiobooks for students (high school, college, ESL)**: mostly list or discount intent ("is audible free for college students"); the study angle is covered by the retention and notes posts.
- **Textbook audiobooks** (9): low fit; textbooks rarely have audio editions (Learning Ally and Bookshare territory).
- **Are audiobooks good for autism** (about 5): small, and the evidence base is thin.
- **Aphantasia and audiobooks** (2 relevant): too small; keep as a future character-map angle.
- **Graded readers** (232 phrasings): the head terms are PDF, piracy or language-specific (HSK, N5). Fold "graded readers with audio" into the beginner section of #1/#2.
- **Generic "can you learn a language by listening to audiobooks"** (about 12): weak vendor SERP, but on its own it would sit too close to learn-english-with-audiobooks. Use it as a FAQ inside #1 and #2, and as a hub once two or more language posts exist.
- **Audio drama vs audiobook** (6): close to the rejected full-cast topic; low fit.
- **"Can you read an audiobook on hoopla / Apple Books"**: Apple Books is still parked (small). hoopla adds one phrasing; not enough on its own.
