# Platform facts: learn-french-with-audiobooks

Fetched 2026-11-04 with curl (`-A "Mozilla/5.0 ..."`), WebFetch and WebSearch, plus the LibriVox catalogue/API, the archive.org advancedsearch API and the iTunes Search API. Requests come from an Indian IP, so Audible pages were fetched with `?ipRedirectOverride=true` and show USD prices. Store prices change by region and date: date every price in the post. Raw downloads: `C:\Users\rakes\AppData\Local\Temp\claude\34842c9e8e99357b\5564f299-6c40-46f0-80a7-4dc4f59fee6e\scratchpad\dl-fr-platforms\`.

Anything marked **UNVERIFIED** could not be confirmed from a primary page today.

---

## Part A: services and catalogues

### A1. LibriVox in French

**How I counted.** The API has no language parameter (https://librivox.org/api/info). I used two catalogue views, language id 2 = "French":

1. Advanced search (`https://librivox.org/advanced_search?...&recorded_language=2&status=complete&project_type=either`): 21 pages, **505 rows**. Those rows are not 505 books. 266 rows are single French pieces inside **multilingual** collections (e.g. "Le Bon Berger (in Christmas Carol Collection 2012)", meta "Complete | Collaborative | Multilingual"). Another 17 rows are series groups that hide their volumes (e.g. "Fables de La Fontaine", "La Comédie Humaine", "Bible (LSG, 1910)").
2. Browse by language (`https://librivox.org/search/get_results?primary_key=2&search_category=language&...`): 43 pages, 1,075 rows. Collapsed to unique project URLs:

| Filter | Projects |
|---|---|
| Complete, French-language project | **316** |
| of which Solo | 188 |
| of which Collaborative | 122 |
| of which Dramatic / poetry | 5 / 1 |
| Not finished (open, on hold, fully subscribed, abandoned) | 7 |
| Multilingual collections that contain some French pieces | 98 |

- Cross-check on archive.org: `collection:librivoxaudio AND mediatype:audio AND (language:"French" OR "fre" OR "fr" OR "fra")` = **316**. Same number.
- Safe wording: **"about 300 finished French books"** or "more than 300". Do not say 500.
- Side finding for the Spanish post: the same browse method gives **565** complete Spanish-language projects (448 solo, 113 collaborative, 4 dramatic), which matches archive.org's 565 exactly. The "628 complete" in the Spanish research file came from the advanced search and includes pieces inside multilingual collections. If the live Spanish post says "about 630", it should say "more than 550".

**Public domain and readers** (reused from the Spanish file, same pages):
- https://librivox.org/pages/about-librivox/: "All our audio is in the public domain, so you may use it for whatever purpose you wish." and "We accept all volunteers in all languages, with all kinds of accents."
- https://wiki.librivox.org/index.php/Copyright_and_Public_Domain: "LibriVox makes good faith efforts to ensure that the texts recorded are public domain in the United States."
- US cut-off today: Cornell's chart (https://copyright.cornell.edu/publicdomain, fetched 2026-11-04) lists works "Before 1931" as "In the public domain due to copyright expiration", and "1931 through 1963 Published with notice and the copyright was renewed" as "95 years after publication date".

**Titles that are NOT on LibriVox** (API title search returned `{"error":"Audiobooks could not be found"}`; author search and archive.org agree):
- *Le Petit Prince* (Saint-Exupéry). It was first published in New York in April 1943, so under the 95-year rule above it stays in copyright in the US through 2038. The renewal record was not checked (UNVERIFIED), but LibriVox has no recording either way. Communia (2015-01-23, https://communia-association.org/?p=1197): "Beginning this year, "The Little Prince" is in the public domain almost everywhere in Europe." and "in France, the novel will pass into the public domain sometime between 1 May 2033 and 1 January 2045".
- *Le Petit Nicolas* (Goscinny and Sempé, from 1959). In copyright everywhere. No LibriVox recording.
- *Les Malheurs de Sophie* (Ségur, 1858) and *Sans famille* (Malot, 1878) are public domain, but **LibriVox has no recording of either**. The only French Ségur project is *Nouveaux contes de fées pour les petits enfants*. The only French Malot project is *Le Mari de Charlotte*. Free MP3s of *Les Malheurs de Sophie* exist elsewhere (A9).
- *Le Petit Chose* (Daudet): no recording found.

**Learner-friendly French titles.** Running time, section count and readers come from the API (`extended=1`) and each catalogue page, fetched 2026-11-04. "Solo" means one reader for the whole book. **No page states where a reader is from** (France, Québec, Belgium...). Reader names are catalogue names only. Several group readings include English-named volunteers (e.g. Karen Savage, Alex Foster, Carl Manchester on the Verne), so expect some non-native accents (UNVERIFIED per reader). The Fables livre 01 page says the fables "ont été enregistrées par des lecteurs de divers horizons".

| # | Title (author, date) | LibriVox URL | Time, sections | Type and readers | Notes for learners |
|---|---|---|---|---|---|
| 1 | *ABC: Petits Contes* (Jules Lemaître) | https://librivox.org/abc-petits-contes-by-jules-lemaitre/ | 00:46:00, 26 | **Solo**: Sonia | Page: "une collection de 25 petits contes, surtout amusants ... dont la plupart des protagonistes sont des animaux. Chaque titre commence par une autre lettre de l'alphabet". Very short sections ("Âne", "Bélier", "Canard"...). The easiest start. |
| 2 | *Il était une fois... 001 (contes pour enfants)* (Andersen, Perrault, Grimm in French) | https://librivox.org/contes-et-histoires-preferes-des-enfants-001/ | 3:59:53, 20 | Group: Caroline Sophie, Stanley, ani poirier, Fanny RW, Nadine Eckert-Boulet, Kalynda, Ezwa | Stories learners already know: "Le Petit chaperon rouge", "Cendrillon", "Le Vilain petit canard", "Les Musiciens de la ville de Brême". |
| 3 | *Histoires ou Contes du temps passé avec des moralités* (Charles Perrault; 1742 edition) | https://librivox.org/contes-du-temps-passe-avec-des-moralites-by-charles-perrault/ | 2:32:44, 11 | **Solo**: Ezwa | Sections: "Le petit chaperon rouge", "La barbe bleue", "La belle au bois dormant", "Le chat botté", "Cendrillon", "Le petit poucet". 17th-century French, so A2+ with the story already known. |
| 4 | *Nouveaux contes de fées pour les petits enfants* (Comtesse de Ségur, 1857) | https://librivox.org/nouveaux-contes-de-fees-pour-les-petits-enfants-by-sophie-comtesse-de-segur/ | 5:28:38, 19 | **Solo**: Ezwa | The only Ségur on LibriVox. Page: "quelques récits qui avaient tant amusés ses petites-filles". |
| 5 | *Fables de La Fontaine, livre 01* | https://librivox.org/fables_la_fontaine_01 (group) / https://librivox.org/fables-de-jean-la-fontaine-livre-01-jl/ (solo) | 00:43:45, 23 / 0:52:21, 23 | Group: Ezwa, Faris, Claire Goget, Karen Savage, Christina Zhu, Susan Denney / **Solo**: Jean Lambert | "La Cigale et la Fourmi", "Le Corbeau et le Renard", "Le Loup et l'Agneau". Each fable is 1-3 minutes, but it is 17th-century verse, so not easy. All 12 books are recorded, most in two or three versions (24 projects). |
| 6 | *Lettres de mon moulin* (Alphonse Daudet, 1869) | https://librivox.org/lettres-de-mon-moulin-by-alphonse-daudet-0901/ | 4:22:42, 25 | **Solo**: Naf | Page: "Contes de Provence, d'Algérie et de Corse." Includes "La chèvre de monsieur Seguin", which many French schoolchildren read. Self-contained stories of 5 to 15 minutes. B1+. |
| 7 | *Contes du jour et de la nuit* (Guy de Maupassant, 1885) | https://librivox.org/contes-du-jour-et-de-la-nuit-by-guy-de-maupassant/ | 05:57:52, 27 | Group: Frédéric Surget, Cocotte, Christiane Jehanne, Margot, Rémi, YasmineHaggag, Martine | 27 short stories, including "La parure". Alternative: *Boule de suif* (https://librivox.org/boule-de-suif-by-guy-de-maupassant-0904/, 4:14:11, 14 sections, group of 8 readers: "Douze nouvelles dans lesquelles Guy de Maupassant pose un regard ironique"). B1+. |
| 8 | *Le Tour du monde en quatre-vingts jours* (Jules Verne, 1872) | https://librivox.org/le-tour-du-monde-en-quatre-vingts-jours-by-jules-verne/ | 8:05:21, 37 | Group: Faris, Karen Savage, Christophe, Elisa, Ezwa, Alex Foster, Carl Manchester, Claire Goget | A plot-driven novel in short chapters, with a different voice from chapter to chapter. 12 other French Verne novels are on LibriVox, e.g. *Michel Strogoff* (09:32:30, solo). |

Alternatives:
- *Candide ou L'optimisme* (Voltaire, 1759): https://librivox.org/candide-by-voltaire-2/, 3:52:57, 30 sections, **solo** (Bernard). Short chapters, but 18th-century irony: B2+.
- *Contes du Magasin des enfants* (Leprince de Beaumont, 1757): https://librivox.org/contes-du-magasin-des-enfants-by-jeanne-marie-leprince-de-beaumont-1002/, 4:25:26, 15 sections, Ezwa and Aldor. Includes "La Belle et la Bête". The page calls her "le premier écrivain à avoir volontairement adopté un style simple réellement adapté aux jeunes lecteurs".
- **Québec texts**, but reader origin is not stated:
  - *Contes, anecdotes et récits canadiens* (Filiatreault): https://librivox.org/contes-anecdotes-et-recits-canadiens-by-aristide-filiatreault/, 01:12:51, 20 sections, solo czandra. Page: "De courts contes drôles tirés de l'oral en bon québecois d'antan."
  - *La Chasse-galerie* (Beaugrand): https://librivox.org/la-chasse-galerie-by-honore-beaugrand/, 1:42:48, 5 sections, 4 readers.
  - *Les anciens canadiens* (Aubert de Gaspé): 13:49:56, 25 sections.
- Children's grammar books: *La Grammaire de Mademoiselle Lili* and *L'Arithmétique de Mademoiselle Lili* (Jean Macé), solo.

### A2. Audible

- **audible.fr exists:** https://www.audible.fr/, title "Audible | Écoutez livres audio, podcasts et originaux".
- **French titles on audible.com.** The search page has a Language facet "French" (`feature_six_browse-bin=18685582011`):
  - https://www.audible.com/search?feature_six_browse-bin=18685582011&ipRedirectOverride=true shows "1 - 20 of over 50,000 results" (podcasts included).
  - With the Audiobook format facet added: "1 - 20 of over 30,000 results".
  - Topic pages such as `audible.com/es_US/topic/audiobooks-teach-french` showed up in search results only.
- **Read & Listen / immersion reading.** https://www.audible.com/ep/read-listen (curl, today):
  - **"Immersion reading and Page Sync are currently available for supported English and German language titles in the United States, United Kingdom, Australia, and Germany."**
  - "Read & Listen features, including immersion reading, are currently available in the following marketplaces: the United States, United Kingdom, Canada, France, Germany, Italy, Spain, Japan, India, Brazil, and Australia."
  - "If you purchased a different version of the eBook (e.g., a different publisher or language), the sync may not connect."
  - So French titles are excluded from immersion reading. France is a Read & Listen marketplace but is **not** in the immersion-reading list.
- **Paul Noble:** https://www.audible.com/pd/B01D1XVJV6, "Learn French with Paul Noble for Beginners – Complete Course".
  - JSON-LD: duration PT12H38M (12 h 38 min), datePublished 2016-03-31, publisher Collins, readBy Paul Noble, **inLanguage "english"**.
  - "guide you through over 12 hours of everyday scenarios", "A downloadable booklet is also included", "This download contains the entire course – Parts 1, 2, and 3."
  - Visible price **"Buy for $28.97"** (the JSON-LD offer of 14.95 looks like a member price).
- **Pimsleur:** https://www.audible.com/pd/B07FXMJVJN, "Pimsleur French Level 1 Lessons 1-5".
  - JSON-LD: duration PT3H, datePublished 2018-09-18, publisher Pimsleur, inLanguage "english".
  - "5, 30-minute audio lessons", "In total, 2.5 hours of audio, all featuring native speakers", "a digital Reading Booklet", "Only 30 minutes a day."
  - Visible price **"Buy for $19.76"**. Level 1 is sold in six chunks (Lessons 1-5 through 26-30).
- Both are spoken courses taught in English, not French books. Both are Audible files with DRM, so HushBook cannot import them (consistent with the site's existing posts; I did not fetch a separate Audible DRM page today).

### A3. Spotify

- **France has audiobooks in Premium since 14 October 2024.** https://newsroom.spotify.com/2024-10-14/audiobooks-launch-france-belgium-netherlands-luxembourg/ (curl):
  - "We're offering each Premium individual subscriber, as well as plan managers for Family and Duo accounts, 12 hours of listening per month in these new markets."
  - "Bookworms who use up their 12 hours before their monthly billing cycles refresh can purchase a 10-hour top-up for €9.99."
  - "...with 15,000 French and 15,000 Dutch and Flemish titles joining our catalog".
- https://www.spotify.com/fr/audiobooks/ (today) gives no number: "Les abonnements Premium éligibles incluent des heures d'écoute mensuelles."
- **US:** https://www.spotify.com/us/audiobooks/ (today): "Now enjoy 15 hours of audiobook listening time on Premium, every month."
- **12-hour markets:** France, Belgium, the Netherlands and Luxembourg (2024). From the 2026-10-07 newsroom: "Eligible Premium subscribers get 12 hours of audiobook listening every month, included in their plan. This option is coming to Italy, Spain, Portugal, Brazil, Mexico, Colombia, Poland, Chile, Norway, Peru, and more."
- **Two rules that matter to learners.** https://support.spotify.com/us/article/audiobooks-premium-plans/ (today):
  - "Adjusting the speed of the playback won't affect the amount of audiobook listening time included/remaining in your allocation"
  - "If you relisten to a book, or part of the book, your listening time will continue to reduce as normal."
  - So every replay of a hard chapter uses up the monthly hours.
- **Whether US Premium includes French-language audiobooks: UNVERIFIED.** No official page says so. Safe wording: "French titles joined Spotify's catalogue when audiobooks launched in France; from the US, search for the title."
- **No text:** Spotify shows no transcript for audiobooks (Spanish-file quote from https://support.spotify.com/us/article/audiobooks/, which lists only speed, ±15 s and sleep timer).

### A4. Libby / OverDrive (reused from the Spanish file, same day)

- https://www.libbylife.com/2025-03-06-search-like-a-pro-expert-tips-for-finding-your-next-read-in-the-libby-app: "After running your search, narrow down your results with filters like format, language, subject, and more." and "pinning the audiobooks and English filters will exclude all books and magazines and non-English language audiobooks when you browse and search." A learner pins French plus audiobooks the same way.
- https://help.libbyapp.com/en-us/6131.htm: "Audiobooks in Libby can't be transferred to MP3 players or iPods."
- No Libby help page describes text or captions for regular audiobooks. HushBook cannot import Libby loans.

### A5. Graded readers with audio

- **Olly Richards, *Short Stories in French for Beginners* (Teach Yourself):** https://www.audible.com/pd/1473683459
  - JSON-LD: duration **PT4H26M**, narrator **Louis Bernard**, publisher Teach Yourself, 2018-10-04, inLanguage "english" (the course framing; the stories are in French).
  - "Mapped to **A2-B1** on the Common European Framework of Reference, these eight captivating stories..."
  - "Controlled language at your level, including the 1000 most frequent words"
  - Includes "A bilingual word list", "Comprehension questions", "Full plot summary".
  - "PLEASE NOTE: When you purchase this title, the accompanying reference material will be available in your Library section along with the audio on our Desktop Site."
  - Visible price **"Buy for $11.06"**.
  - Despite "for Beginners", the publisher says A2-B1, not A1.
  - The publisher's own reader app also covers French (Spanish file: App Store id1422731589, "available in French, Italian, German, Spanish, Russian and English"). Its audio plays inside the app.
- **DRM-free route:** Libro.fm lists it at https://libro.fm/audiobooks/9781473683457-short-stories-in-french-for-beginners. Search snippet: Olly Richards and Richard Simcott, narrator Louis Bernard, 4 h 26 min. The page returns 403/202 to curl and WebFetch, so **price UNVERIFIED**. The search snippet also says Libro.fm's *Short Stories in French for Intermediate Learners* ($14.69) is AI-narrated (UNVERIFIED).
- **Lingo Mastery, *French Short Stories for Beginners: 20 Captivating Short Stories...*:** https://www.audible.com/pd/B07SD2H3ZF
  - Duration PT6H39M, narrators Noelia Gouty and Craig Levin, publisher Lingo Mastery, 2019-05-28.
  - "The summaries follow a synopsis in French and in English"
  - "PLEASE NOTE: When you purchase this title, the accompanying PDF will be available in your Audible Library along with the audio."
  - Visible price **"Buy for $16.54"**. No CEFR level on the listing.
  - A Lingo Mastery French DRM-free copy: UNVERIFIED.

### A6. Free French audio that comes with text

| Source | What it offers (exact wording) | Text? | Audio as a file? |
|---|---|---|---|
| **RFI, Journal en français facile.** Show page: https://francaisfacile.rfi.fr/fr/podcasts/journal-en-fran%C3%A7ais-facile/ | "Un vrai journal d'information pour suivre l'actualité internationale en français. Du lundi au vendredi sur l'antenne de RFI à 16 h (TU) puis sur le site Le français facile avec RFI avec sa transcription." Plus: "Chaque semaine, ... deux exercices". | **Yes, free.** The episode of 2026-11-03 shows "Écouter - 10:00", chapter times, then "Transcription · Ouvrir le PDF" and the full text on the page. | **Yes.** The player has a "Télécharger" link (`"downloadable":true`) to a plain MP3: `https://aod-fle.akamaized.net/rfi/francais/audio/jff/202611/journal_francais_facile_16h00_-_16h10_gmt_20261103.mp3?dl=1`. A HEAD request returned `200`, `audio/mpeg`. |
| **innerFrench** (Hugo Cotton; from episode 92 with Ingrid). RSS: https://podcast.innerfrench.com/feed.xml | Feed description: "You can find all the transcripts at https://innerfrench.com/podcast/" and "The episodes get progressively more challenging, so I'd recommend starting from the oldest ones". **The show has ended:** E200 "Toutes les bonnes choses ont une fin", published Mon, 14 Sep 2026. 200 episodes stay in the feed. | Transcripts exist. **Free or paid: UNVERIFIED** (innerfrench.com returns a Cloudflare challenge to curl and 403 to WebFetch). | **Yes.** The RSS enclosures are MP3s on mcdn.podbean.com. |
| **Podcast Français Facile.** https://www.podcastfrancaisfacile.com/ | Title: "Apprendre le français – Cours et exercices de français gratuits". Intermediate index: "La plupart de ces dialogues sont accompagnés de fichiers audio, de document PDF et parfois d'explications en vidéo." | **Yes, free.** The dialogue text is printed on the page, e.g. https://www.podcastfrancaisfacile.com/debutant/dialogue-francais-pour-debutant.html. | **Yes.** Direct links such as `.../wp-content/uploads/2015/08/dialogue-debutant-visite-chambre.mp3` and a PDF. These are short dialogues (seconds to minutes), not books. |
| **TV5MONDE EDU** (formerly "Apprendre"). App Store: https://apps.apple.com/us/app/tv5monde-edu-learn/id1482250598 | "It is simple, easy and free. The exercises are aimed at beginners (A1) to advanced learners (B2)." "Each video comes with subtitles and a French transcript." "You learn to understand French as it is spoken in Paris, Geneva, Dakar, Montreal, Brussels, and elsewhere." | **Yes, free** (video subtitles plus transcript). | **No file.** "Content can be downloaded for use without internet connection" inside the app. This is video, not audio files. apprendre.tv5monde.com returned "Access Denied" to curl and WebFetch. **"7 jours sur la planète" status today: UNVERIFIED.** |
| **Français Authentique** (Johan Tekfak). Episode example: https://www.francaisauthentique.com/la-joie-detre-un-amateur/ | App listing: "Accède gratuitement à tous les contenus de Français Authentique" and "Français Authentique s'adresse aux non-francophones ayant déjà une bonne compréhension orale." | **Yes, free.** "Transcription de l'épisode :" followed by the full text on the page. | **Yes.** "(Fais un clic droit sur ce lien pour enregistrer le fichier MP3)" linking to `https://traffic.libsyn.com/francaisauthentique/La_joie_dtre_un_amateur.mp3`. |
| **France Culture fiction** | `radiofrance.fr/franceculture/podcasts/fictions-theatre-et-cie` now lands on "Le Théâtre" ("Des grands textes du répertoire"). | **No transcript found.** | UNVERIFIED. Leave it out, or call it audio only. |

### A7. Competitor apps (US App Store, fetched 2026-11-04 unless noted)

- **Beelinguapp** (Spanish-file quotes, same day, id1225056371):
  - Its language list includes "Learn French".
  - "Using our parallel-text method, you can read stories in two languages side by side"
  - "Karaoke-Style Scrolling Text: Follow along with synchronized text"
  - Prices "Beelinguapp Yearly $49.90", "Beelinguapp Monthly $7.99".
  - Only its own stories; you cannot import your own audiobook. One review says a French story used "dirigeant" for a wooden ruler.
- **LingQ** (Spanish-file quotes, id379385811):
  - Languages include French.
  - "AI Audio Transcription: Turn podcasts and audiobooks into interactive lessons."
  - Prices "LingQ Premium (Monthly) $14.99", "(12 Months) $119.99", "Premium Plus Monthly $29.99".
- **Lingopie** (id1534737981, refetched today):
  - "Learn Spanish, French, German, Italian..."
  - "Enjoy videos with subtitles in your target and native languages. Tap on any word to get instant translations"
  - "Enjoy 8 minutes of language learning each week for FREE."
  - Prices: "Lingopie Monthly Subscription $13.99", "Lingopie Annual Subscription $83.99" (also $11.99, $71.99, $59.99 yearly, and $34.99 for 3 months).
  - Its French page title: "Learn French with TV Shows, Movies & Netflix | Lingopie". Video only.
- **Readle is NOT German-only any more. Correct the brief.**
  - https://www.readle-app.com/ (today): "I want to learn 🇬🇧 English 🇪🇸 Spanish 🇫🇷 French 🇩🇪 German 🇮🇹 Italian 🇯🇵 Japanese 🇨🇳 Chinese", "A1–C1", "Native audio & podcasts Listen to every story", "Try 7 days free".
  - There is a separate French app, "Learn French: News by Readle" (https://apps.apple.com/us/app/learn-french-news-by-readle/id6450673740, A-Type Technologies): "A1-B2 vocabulary & conjugation", "Listen to the story audio sentence by sentence", "Quickly look up a word translation in every article with a tap on the word".
  - In-app purchases: "Learn French: Premium $69.99", "Learn French: Premium $12.99" (period not labelled), "Readle Quarterly Subscription $44.99", "Readle Premium Lifetime $249.99".
  - It has its own graded stories only. No import.
- **Français Authentique** (https://apps.apple.com/us/app/fran%C3%A7ais-authentique/id1086665572, Hestia Développement): Free. "Accède gratuitement à tous les contenus", "Rejoins une communauté de plus de 5 millions de membres". The paid "Académie" and courses exist on the site (a Black Friday "-50%" banner today); their prices are UNVERIFIED.

### A8. Libro.fm

- https://support.libro.fm/support/solutions/articles/48000695426-how-do-i-download-audiobook-files-to-listen-on-my-computer- (refetched today, curl 200): "You can download the zipped folder(s) containing the DRM-free files (MP3s or M4B format) directly to your computer and import these files into your media player of choice." and "To download a single audio file that contains your entire audiobook, choose the M4B option."
- French-language titles exist. Search results show French-language listings, e.g. *Les Malheurs de Sophie*: https://libro.fm/audiobooks/9782924981924-les-malheurs-de-sophie, https://libro.fm/audiobooks/9791090054677-les-malheurs-de-sophie, https://libro.fm/audiobooks/9781894983952-les-malheurs-de-sophie. **The size of the French catalogue, and whether there is a French browse page: UNVERIFIED** (libro.fm blocks automated fetches).

### A9. Beyond LibriVox: Internet Archive and Littérature audio

- **Littérature audio** (https://www.litteratureaudio.com/, today):
  - Title: "Plus de 10 000 livres audio gratuits !"; nav "Livres audio (10104)". Volunteer readers ("Donneurs de voix"), run by an association.
  - A sample book page (https://www.litteratureaudio.com/livre-audio-gratuit-mp3/alexandre-dumas-la-jeunesse-de-pierrot.html): "Consulter la version texte de ce livre audio." / "Télécharger ce livre audio par archive Zip" / "Licence d'utilisation : Réutilisation du livre audio soumise à autorisation préalable."
  - So it offers free MP3 downloads for personal listening, with a link to the text.
  - English Wikipedia's *Sophie's Misfortunes* article links a Littérature audio recording of *Les Malheurs de Sophie* (search result; the page was not fetched).
- **Internet Archive, non-LibriVox French**, using HushBook's exact Internet Archive query (audio_bookspoetry, minus librivoxaudio, MP3 formats, `language` French/fre/fr, safety clauses): **766 items**.
  - Top downloads are CC BY-ND or BY-NC-ND uploads, e.g. Chateaubriand, Lamartine, a Dumas, and *La Guerre des mondes* in French.
  - 25 of the top 100 have no license field (same piracy caveat as the Spanish file).

---

## Part B: HushBook app source (`D:\hushbook`), French check

**Discover includes French.** `lib/core/store/store_models.dart` line 13: `french('fre', 'French', ['French', 'fre', 'fr']),`, and `lib/l10n/app_en.arb`: `"langFrench": "French"`. Everything in Part B of `2026-11-04-learn-spanish-with-audiobooks/research-platforms.md` applies to French unchanged. I spot-checked today:
- Universal engine: `ggml-base-q5_1.bin`, with `language: model == EngineModel.multilingual ? 'auto' : 'en'` (`transcription_service.dart:1138`).
- `"engineUniversalLanguages": "99 languages including Spanish, French, ..."`.
- `engineEnglishOnlyWarningTitle` is still unreferenced in Dart.
- Dictionary host `api.dictionaryapi.dev` (English), with the ASCII-only word regex `[A-Za-z]+(?:['’-][A-Za-z]+)*`.
- Speed `kMinPlaybackSpeed = 0.5` / `kMaxPlaybackSpeed = 3.0`.
- `"ebookErrorUnsupportedLanguage": "Fast e-book sync currently supports English narration."`
- `"desktopTileEnglishOnly": "English books only for now."`
- `"playerTapLineToJumpHint": "You can always long-press a line to play from there."`
- `"bundleExportRow": "Export .hushbook file"` (no plain-text export).

**New French-specific findings:**
1. **Discover's LibriVox French filter misses about 40 books.**
   - `librivox_provider.dart` queries LibriVox with the language `code` only (`queryTermsFor` returns `[code]` for every provider except internet_archive), i.e. `language:("fre")`. That finds **275** items.
   - archive.org tags **40** French LibriVox items `fra`, mostly newer uploads (2023-2026), including *Michel Strogoff*, *Le Fantôme de l'Opéra*, *Le Dossier 113*, *Les Dents du tigre*, *Mémoires d'outre-tombe* tomes 2-4 and *Le Loup blanc*. With `fra` included the total is 316.
   - The Internet Archive provider's French terms (`French`, `fre`, `fr`) also omit `fra`, but no non-LibriVox item uses `fra` today (0 hits).
   - Fix (not made, read-only task): add `'fra'` to the French terms and let the LibriVox provider use the term list too.
   - Discover today: **275 LibriVox + 766 Internet Archive ≈ 1,040 French items** before client-side filtering.
2. **The dictionary regex breaks French words.** It accepts only ASCII letters, so "été", "garçon" and "où" would not parse as single words. The dictionary is English-only anyway.
3. Transcription of French uses the same Universal (whisper base, multilingual) engine, about 57 MB. French accuracy was not measured (UNVERIFIED).

---

## Facts the post must state honestly

1. **LibriVox French:** about **316** finished French-language books (188 read by one person). Do not use the advanced-search "505"; it counts French poems inside multilingual collections. The recordings are US public domain, so the texts are old (17th to early 20th century). Readers are volunteers with mixed accents, and no catalogue page says whether a reader is from France or Québec.
2. ***Le Petit Prince*** (New York, 1943) is still in US copyright through 2038 under the 95-year rule, and in France until 2033 or later. ***Le Petit Nicolas*** (1959) is in copyright. Neither is on LibriVox. ***Les Malheurs de Sophie*** and ***Sans famille*** are public domain but **have no LibriVox recording**. Point readers to Littérature audio for Ségur, or use Ségur's *Nouveaux contes de fées*.
3. **Starter picks that exist:** Lemaître *ABC: Petits Contes* (46 min, one reader), *Il était une fois... 001* (4 h, well-known fairy tales), Perrault *Contes du temps passé* (2 h 33, one reader), La Fontaine *Fables* livre 01 (44-52 min), Daudet *Lettres de mon moulin* (4 h 23, one reader), Maupassant *Contes du jour et de la nuit* (5 h 58), Verne *Le Tour du monde en quatre-vingts jours* (8 h 05, eight readers).
4. **Audible** has more than 30,000 French-language audiobooks on audible.com, and audible.fr is a separate store. Immersion reading is listed only for "supported English and German language titles", so do not suggest it for French books. Paul Noble (12 h 38 min, $28.97) and Pimsleur Level 1 Lessons 1-5 (3 h, $19.76) are courses taught in English, sold with Audible DRM, and HushBook cannot open them.
5. **Spotify:** France has had audiobooks in Premium since October 2024, with **12 hours** a month and 15,000 French titles at launch. The US gets **15 hours**. Replaying a chapter uses up hours again; slowing down does not. Whether US Premium carries French titles is unverified. Spotify shows no text.
6. **Libby** lets you filter or pin a language, but its audiobooks show no text and "can't be transferred". HushBook cannot import them.
7. **Olly Richards *Short Stories in French for Beginners*** is mapped by its publisher to **A2-B1**, not A1 (Audible: 4 h 26 min, narrated by Louis Bernard, $11.06, with a reference PDF). A Libro.fm (DRM-free) listing exists, but its price is unverified. **Lingo Mastery** French (6 h 39 min, $16.54, with a PDF) gives no CEFR level.
8. **Free French audio with text:**
   - RFI *Journal en français facile*: 10 minutes every weekday, a free transcript plus PDF, and a downloadable MP3.
   - Français Authentique: free transcript and MP3.
   - Podcast Français Facile: short dialogues, free text, MP3 and PDF.
   - TV5MONDE EDU: free videos with transcripts, A1-B2, but video only and offline only inside its app.
   - innerFrench: **ended in September 2026**, but its 200 episodes stay downloadable as MP3s. Whether its transcripts are free is unverified.
   - Downloaded MP3s from RFI, Français Authentique and Podcast Français Facile can go into HushBook for word-by-word sync; the publishers' own transcripts are the reference text.
9. **Readle is not German-only.** It has a French app (A1-B2, sentence-by-sentence audio, tap-to-translate), from $12.99. Lingopie (French included; $13.99/month or $83.99/year; 8 free minutes a week) is video. Beelinguapp ($7.99/month, $49.90/year) and Readle play only their own stories. LingQ ($14.99/month) can transcribe imported audio.
10. **Libro.fm** sells "DRM-free files (MP3s or M4B format)", which import into HushBook. It carries French-language titles, but the size of that catalogue is unverified.
11. **HushBook:** keep the **Universal** engine (the default), which auto-detects French. There is **no translation and no French dictionary** (the dictionary is English-only, Pro, and cannot even parse accented words). E-book sync and "Transcribe on my PC" may be English-only. Speed runs from 0.5× to 3× in 0.05× steps, set per reading profile. Long-press a line to play from there, since tap-to-jump is off by default. There is no plain-text transcript export. Speech recognition makes mistakes on names, archaic French and noisy volunteer recordings (French accuracy not measured).
12. **Do not promise "every French LibriVox book is in Discover"** until the `fra` gap is fixed: about 40 newer recordings (e.g. *Michel Strogoff*, *Le Fantôme de l'Opéra*) do not appear under the French filter today. They can still be found by searching their titles (UNVERIFIED: the title search may not apply the language clause).
