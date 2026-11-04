# Wiring for /blog/learn-french-with-audiobooks

Draft, 2026-11-04. Nothing outside this folder has been edited.

## 1. Contextual links from existing posts (link-only, no `dateModified` bump)

- **`learn-spanish-with-audiobooks.md`**, "Where can you listen to Spanish audiobooks for free?". After the line `More free sources with text are in [free read-along audiobooks](/blog/free-read-along-audiobooks).` add:
  > For French, [how to learn French with audiobooks](/blog/learn-french-with-audiobooks) lists free audio that comes with a transcript, such as RFI's weekday news in easy French.

  The Spanish file has uncommitted edits in the working tree (the 564 LibriVox count). Apply this on top of them.
- **`learn-english-with-audiobooks.md`**, "Where to find free English audiobooks", line 61. It now ends with the Spanish sentence. Append:
  > For French, [how to learn French with audiobooks](/blog/learn-french-with-audiobooks) adds free French audio with transcripts.

  If the German post ships the same day, replace the Spanish and French sentences with one:
  > If you are learning another language, there are guides for [Spanish](/blog/learn-spanish-with-audiobooks), [French](/blog/learn-french-with-audiobooks) and [German](/blog/learn-german-with-audiobooks), each with the research and free books by level.
- **`free-read-along-audiobooks.md`**, "Who is it useful for?", line 40. Append to the "Language learners" bullet, after the Spanish sentence:
  > French learners will find free audio with transcripts in [how to learn French with audiobooks](/blog/learn-french-with-audiobooks).

## 2. Registry

Insert `registry-entry.mjs` at the top of `posts` in `data/blog-posts.js`. Checked by script:

| Field | Value |
|---|---|
| `title` | 61 chars, equals the post.md H1 |
| `metaTitle` | 57 chars (limit 60), contains "Learn French With Audiobooks" |
| `metaDescription` | 158 chars (limit 160) |
| `description` | 232 chars (limit 240), same text as `llms-line.txt` |
| `cta.heading` / `cta.text` | 34 / 242 chars |
| `keywords` / `takeaways` / `faqs` | 8 / 5 / 6 (FAQ answers 3 to 4 sentences) |

- **`readingTime`**: the build prints `post.readingTime` as is (`scripts/build-blog.js` lines 377 and 411), so `'auto'` would show the word "auto". Replace it with `'16 min read'`. The blog parser counts 3,680 words (3,799 raw, including Sources); ceil(3,680 / 230) = 16, the same rule as the Spanish post.
- **`category`**: `'Language learning'`, the same as the Spanish and English siblings.
- **Keywords**: all 8 are in the scout's raw autocomplete data (`scratchpad\ac\r*.json`), including "audiobooks to learn french" and "are there french audiobooks on spotify".
- No `hero`, `aside` or `compared` field. The three wide images are already in `assets/img/blog/` (untracked): `french-audiobook-read-along.webp`, `french-speech-rate.webp`, `french-audiobook-routine.webp`.

## 3. llms.txt

Insert `llms-line.txt` below the Spanish line, under `[HushBook blog]`.

## 4. Ship-together dependency

- The post links `/blog/learn-german-with-audiobooks` once (end of "What does the research say..."). `blog-pages.test.js` fails on a broken internal link, so the German post must be in the same build. If it is not, change that sentence to:
  > Matching guides cover [learning English](/blog/learn-english-with-audiobooks) and [learning Spanish with audiobooks](/blog/learn-spanish-with-audiobooks).

## 5. Facts I was unsure about

- **Le Petit Prince "through 2038"**: derived from first publication in New York in 1943 plus the 95-year rule on Cornell's chart. The renewal record was not checked (UNVERIFIED in the platforms file). LibriVox has no recording either way.
- **"For Ségur's best-known book, try Littérature audio"**: a Littérature audio recording of *Les Malheurs de Sophie* was seen only as a Wikipedia link in search results, not fetched. The wording points readers there without promising the file.
- **Levels**: "Roughly A2" and so on are our estimates. Only these come from the vendor: Olly Richards "A2-B1", TV5MONDE EDU "A1 to B2", Readle "A1 to B2". RFI states no level, so the table says "Learners". The Français Authentique level paraphrases its app listing: "s'adresse aux non-francophones ayant déjà une bonne compréhension orale".
- **RFI "10 minutes"**: taken from one episode (2026-11-03, "Écouter - 10:00") and the MP3 filename (16h00 to 16h10). The show page gives no length.
- **Pimsleur**: the listing data says 3 h, but the description says "In total, 2.5 hours of audio" over five 30-minute lessons. The post says "listed at 3 h for five 30-minute lessons".
- **Discover count** "about 1,040 French titles, 275 from LibriVox": the totals of the app's exact provider queries (275 LibriVox + 766 Internet Archive) before client-side filtering. The number on screen may be a little lower.
- **Readle "from $12.99"**: the listing does not say what period that price covers.
- **Spotify**: the post does not say whether US Premium carries French titles, because that is unverified.
- **Sample sizes not given** because they are not in the abstracts: Tremblay and Spinelli 2014, Graham 2006 (the often-quoted 594 is unverified), Shoemaker and Wauquier 2019, Baker and Smith 2010.
- **Paraphrases to check**:
  - Shoemaker and Wauquier: "processed liaison like French children" stands for "employing strategies previously observed only in children learning L1 French". "Earlier studies had found spelling shapes how learners process it" stands for "the existing literature holds that the processing of liaison is greatly influenced by orthographic representations".
  - Lingopie: "French and English subtitles" stands for "subtitles in your target and native languages".
- **Lightbown et al. 2002**: "French-speaking children in Canada" comes from the evidence file's reuse note.
- **FSI**: "about 1,200 hours" is labelled "by our arithmetic": 30 weeks × (23 class + 17 self-study hours).
- **Thomas's Sources line** differs from the evidence file. The journal is written "International Review of Applied Linguistics in Language Teaching" instead of "IRAL – ..." to keep en dashes out of the post. The only dash left in the file is Audible's own en dash inside the Paul Noble title.
- **"Free; Pro adds extras"** and **"No account, no ads"** come from existing site copy, as in the Spanish post.

## 6. Source labels not taken from page titles

- **Written without quotes because the page title was not captured** (labels come from URL slugs):
  - Spotify Newsroom (2024), audiobooks launch in France, Belgium, the Netherlands and Luxembourg
  - Spotify Support, audiobooks in Premium plans
- **Audible product names, taken from the research notes rather than the HTML `<title>`**:
  - "Short Stories in French for Beginners"
  - "Learn French with Paul Noble for Beginners – Complete Course"
  - "Pimsleur French Level 1 Lessons 1-5"
- **Reused from the Spanish post, with the same caveats as its wiring**:
  - Audible "Read & Listen", Spotify "Spotify Audiobooks" (US), Libby Help 6131
  - Libby Life post and Libro.fm support article: titles from URL slugs
- **Inline links, not in Sources**:
  - Lingo Mastery on Audible, the audible.com French search page
  - RFI, Podcast Français Facile, Littérature audio, librivox.org, the LibriVox book pages
  - TV5MONDE EDU, Beelinguapp, Readle, LingQ and Lingopie App Store pages
  - `francaisauthentique.com` links to the site root. Only an episode page (`/la-joie-detre-un-amateur/`) was fetched, so check the root resolves.

## 7. Left out

- **Unverified, per the brief or the research files**:
  - Lonsdale and Le Bras coverage figures, and the Noreillie/Fievez 86% and 93% figures
  - Libro.fm price for the Olly Richards book, and whether Lingo Mastery has a DRM-free copy
  - innerFrench transcripts (free or paid)
  - TV5MONDE "7 jours sur la planète", France Culture fiction
- **Verified but cut to fit 3,800 words**:
  - Tremblay 2011 ("little difficulty recognizing liaison-initial real words"), Tremblay et al. 2012, Harnois-Delpiano et al. 2019, Kennedy et al. 2014
  - Zhao 1997 (the speed advice now rests on Jensen and Vinther plus "no study has tested 0.75x")
  - Peterson 2025, Montero Perez 2018 and 2020, Brand and Ernestus 2018, Graham and Macaro 2008, Pigada and Schmitt 2006
  - innerFrench (ended September 2026, 200 MP3 episodes)
  - The Internet Archive's 766 other French uploads (25 of the top 100 have no licence)
  - *Candide*, *Michel Strogoff* as its own row (it is mentioned in the Verne row)
  - OIF's 51 million foreign-language learners and 90 million native speakers
  - 66% of Fievez learners saying they needed captions

## 8. Product notes

- **Discover `fra` gap**: `librivox_provider.dart` queries `language:("fre")` only, and about 40 newer French LibriVox items are tagged `fra` (e.g. *Michel Strogoff*, *Le Fantôme de l'Opéra*). Adding `'fra'` to the French terms, and letting the LibriVox provider use the term list, fixes it. Once fixed, update step 1 ("275 of them from LibriVox, which itself lists 316") and the honest-limits sentence.
- **Dictionary regex** is ASCII-only, so "été", "garçon" and "où" do not parse as words. The post says so.
- `engineEnglishOnlyWarningTitle/Body` are still unreferenced, so the post only says the other three engines are English-only and promises no warning.

## 9. After publishing

1. Run `npm run build:blog`, then the `*.test.js` suite. `seo-preservation` and `seo-repair-contract` already fail on the old baseline.
2. Check the rendered HTML: 1 h1, 12 h2, 3 wide figures, 4 tables. The draft renders through the blog parser with no markdown leaks.
3. Ping IndexNow for the new URL, /blog and the three posts that get links.
4. Request indexing in Search Console.
