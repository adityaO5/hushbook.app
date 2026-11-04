# Notes: How to Learn French With Audiobooks

Published 2026-11-04 at /blog/learn-french-with-audiobooks, same day as the Spanish and German siblings, on the Spanish post's template (see `../2026-11-04-learn-spanish-with-audiobooks/notes.md` for the method).

## Why this topic

- Second pick of the same-day scout (`scout-report-spanish-run.md`, section #2): 104 distinct autocomplete phrasings (platform 22, free/download 13, level 12, learn 12, text/transcript/translation 7), e.g. "french audiobooks with transcript", "free french audiobooks with transcript", "easy french audiobooks spotify", "learn french through audiobooks".
- Search Console: no french, bilingual or language queries at all.
- SERP: Lingopie, FluentU, the Audible blog, store pages; vendors only.
- French-specific angle: liaison and enchaînement hide word boundaries, so the text earns its place; and French has unusually good free audio WITH text (RFI Journal en français facile, Podcast Français Facile, Français Authentique, Littérature audio).

## Research files

- `research-evidence.md`: 18 new sources (all DOIs Crossref-checked) plus the Spanish-file reuse list. Key facts: Pellegrino 2011 French 7.18 syl/s vs 6.19, density 0.74 vs 0.91; Tremblay and Spinelli 2014 liaison consonants "15 per cent shorter"; Graham 2006 learners' main problems = speed and "making out individual words"; Fievez et al. 2023 (n = 65 + 37) Netflix captions d = 1.56 to 1.62, 3,000 words = 95% coverage of the first three episodes; Montero Perez 2014 ReCALL (n = 226) full captions beat keyword captions; Peters et al. 2019 (n = 138) out-of-school input; Milton 2006 under 1,000 words at GCSE; Thomas 2004 (n = 87) liaison errors; Shoemaker and Wauquier 2019; Baker and Smith 2010 (vowels only); OIF 2026 396 million speakers (348 million by the old method); MLA 2021 French down 23.1% to 135,088; FSI French 30 weeks. UNVERIFIED and left out: Lonsdale and Le Bras coverage figures, Noreillie's 86%/93%, Graham's n = 594.
- `research-platforms.md`: LibriVox 316 finished French books (archive.org `language:(fre OR fra)`; the site's advanced search shows 505 because it counts pieces inside multilingual collections; 188 solo); eight picks with running times; Audible 30,000+ French titles, Read & Listen English and German only, Paul Noble French 12 h 38 min $28.97, Pimsleur French 1 $19.76; Olly Richards French A2-B1, 4 h 26 min, $11.06; Lingo Mastery 6 h 39 min $16.54; Spotify France 12 h since October 2024, replays count again; RFI/PFF/Français Authentique/TV5MONDE EDU/Littérature audio details; Readle covers French; Le Petit Prince (New York, 1943) in US copyright through 2038 (renewal not checked). HushBook: Discover's French filter queries LibriVox with `fre` only, so about 40 newer LibriVox books tagged `fra` (Michel Strogoff, Le Fantôme de l'Opéra) are missing; the post states Discover's own count (about 1,040 items, 275 LibriVox) and names the gap in Honest limits. App fix: add `'fra'` to the French terms in `store_models.dart` and use that list in `librovox_provider.dart` (D:\hushbook).

## Images

- `french-audiobook-read-along.webp`: temp copies of the read-along and player-cover scenes (deleted after) with the 1902-edition text of Perrault's "Le Petit Chaperon rouge" (fr.wikisource, Contes de Perrault éd. 1902), chapter II of LibriVox 131 (solo reader Ezwa, 308 s), cover `Histoires_Contes_temps_passe_moralites_1107.jpg` from archive.org, wash `#76716A`, t = 10 ("bonne" underlined).
- `french-speech-rate.webp`, `french-audiobook-routine.webp`: rendered HTML (same template as the Spanish figures).

## Wiring

Registry: metaTitle 57, metaDescription 158, description 232, 17 min read, category 'Language learning'. Links from learn-spanish-with-audiobooks (free-sources section), learn-english-with-audiobooks (combined Spanish/French/German sentence), free-read-along-audiobooks (combined sentence), is-librivox-safe-and-legal. Source labels fixed from fetched page titles: Spotify newsroom 2024 (title truncated before its em dash), Spotify Support "Audiobooks in Premium plans".
