# Homepage copy for the new phone screens (2026-11-03)

Companion to `2026-11-03-homepage-mockups-design.md`. Text only: every element keeps its HTML structure and classes. Line numbers refer to `index.html` as of today.

Voice rules applied: short sentences, concrete nouns, the app's own labels where the screen shows them, no em-dashes, no rhetorical questions, no triplets for rhythm. A three-item list survives only where it names real UI options. Every claim traces to the appendix.

Word counts are in brackets after each new `p`.

---

## 1. Hero

### `p.sub` (line 745)

- **Current:** Read while you listen to your audiobook, build a habit that lasts
- **New:** Each word of your audiobook lights up as the narrator reads it. [12]
- **Why:** The centre phone now plays the read-along live, so the line under "Reclaim your ability to focus" describes what moves on screen and leaves the focus link to the reader. "Build a habit" comes later, in Reading life.
- Alternatives:
  - A. Listen to your audiobook and read every word as it's spoken.
  - B. Read along with your audiobook, one lit word at a time.

---

## 2. How it works (`#read-along`)

### `h2` (line 923)

- **Current:** From audio file to read-along, in three taps.
- **New:** How an audiobook becomes a read-along.
- **Why:** "Three taps" is no longer true. Transcribe lives in the book's Options sheet, a multi-chapter book opens a chapter picker first, and a free user who picks the PC sees a paywall.
- Alternatives:
  - A. From audio file to read-along.
  - B. Your audiobook, written out word by word.

### `p.sub` (line 924)

- **Current:** Pick a book, tap Transcribe, and the HushBook Engine gets to work — chapter by chapter, right on your phone.
- **New:** Add a book and choose where it's transcribed: on your phone, or on your computer over home Wi-Fi. Neither sends your audio to a server. [25]
- **Why:** There are two paths now, and "computer" makes people ask where the audio goes. The app's answer: "Books travel over your home Wi-Fi. They don't go through the internet."
- Alternative (if the privacy card directly below should own the no-server point): Add a book and choose where it's transcribed: on your phone, or on your computer over home Wi-Fi. [17]

### Step 01 (image: `library`)

- **h3 current:** Pick a book · **new:** Add a book
- **p current:** Browse free classics or import your own MP3, M4B, FLAC, OGG and many more.
- **p new:** Download a free classic from Discover, or import an audiobook file you already own. [14]
- **Why:** The Library screen shows both kinds of book side by side. The format list moves to the Library section, which has room for it.

### Step 02 (image: `step-transcribe`, Options sheet with Transcribe book / Transcribe on my PC)

- **h3 current:** Tap Transcribe · **new:** Phone or PC
- **p current:** One tap per chapter. Chapters in M4B files are detected automatically.
- **p new:** Transcribe book runs on your phone. With Pro, Transcribe on my PC sends it to your computer over home Wi-Fi. Faster, and your phone stays cool. [26]
- **Why:** The screenshot shows these two rows, so the copy uses the exact labels. "One tap per chapter" is gone: Transcribe book runs the whole book, or the chapters ticked in "Choose chapters to transcribe". Pairing a computer needs Pro, so saying so here avoids a surprise paywall. "Faster, and keeps your phone cool" is the app's own line under the PC option. The h3 follows the app's rule: short labels say PC, sentences say computer.
- Alternative without the Pro mention (if the owner prefers Pro to stay in the Desktop section): Transcribe book runs on your phone. Transcribe on my PC sends it to your computer over home Wi-Fi. Faster, and your phone stays cool. [23]

### Step 03 (image: `step-transcribing`, the PC job card climbing)

- **h3 current:** The Engine works · **new:** Keep listening while it runs
- **p current:** The HushBook Engine transcribes every spoken word into synchronized text that moves with the narration.
- **p new:** The book page keeps count: "On your computer: transcribing, 64%" and the minutes left. On the phone, each chapter is ready to read the moment it finishes. [26]
- **Why:** The image is that card. The quoted status is the app's string, and the "About N min left" line sits under it. On the phone path the app says "Chapters unlock for read-along as each one finishes" and "you can keep using the app while it runs". The copy says "ready to read" because "unlock" is on the banned list. The PC path sends the whole transcript back at the end, so the chapter-by-chapter line is limited to the phone.

### Step 04 (image: `read-along`)

- **h3:** Read along (unchanged)
- **p current:** Every word lights up with the narrator. Tap any word to jump there.
- **p new:** Words fill in as the narrator reads them, with a red underline on the current one. Long-press any line to play from there. [23]
- **Why:** "Tap any word to jump there" is wrong now. Tap-to-seek is a line-level switch ("Tap a line to jump there") and is off by default, so reading taps never move the audio. Long-press on a line always plays from it. "Fill in" and "red underline" describe the karaoke paint exactly: spoken words in full ink, the current word wiped, a 2 dp red now-rule under it.

---

## 3. Quotes

### `h2` (line 1002)

- **Current:** Save the line. Share the card.
- **New:** Keep the sentence that stopped you.
- **Why:** The section now covers highlights and notes as well as quotes, and the first screen is a sentence being picked.
- Alternatives:
  - A. Save the line. Share the card. (current, still true)
  - B. Every line you mark, kept.

### `p.sub` (line 1003)

- **Current:** Catch a quote the moment you hear it — two taps in the read-along, yours to keep or post.
- **New:** Pick words in the read-along and keep them. Each mark remembers where it sits in the audio, so you can hear it again. [23]
- **Why:** Every mark stores its chapter and time ("Quote · Chapter I · 00:00") and has Play from here. The three mark types are named once, in card 01, rather than twice.

### Card 01 (image: `quote-mark`, toolbar over the picked sentence)

- **h3 current:** Catch it in two taps · **new:** Pick the words
- **p current:** Tap the first word, tap the last. The line you just heard is saved — without leaving the read-along.
- **p new:** Tap Mark, then the first and last words. Pick Highlight, Note or Quote. Choose Note and the audio waits while you type. [22]
- **Why:** The real flow: the Mark button, then "Tap a word to start", then "Tap another word to extend". The toolbar floats above the pick with exactly these three labels. The note sheet says "Audio paused", which is the detail a reader will notice.

### Card 02 (image: `quote-index`, the Quotes & notes page)

- **h3 current:** Every line, in one place · **new:** Your commonplace book
- **p current:** Your quotes gather by book, stored on your phone. Revisit, edit, or send any one onward.
- **p new:** Quotes & notes keeps every mark, grouped by book, with your notes under them. Press play on any line to hear it in the narrator's voice. [26]
- **Why:** The page is a typeset index (the owner's pick was "The Commonplace Index"): count line, search, All / Quotes / Highlights / Notes tabs, books as entries, "My note" under the quote, a play button per mark.

### Card 03 (image: `quote-card`, the Customize editor)

- **h3 current:** A card worth posting · **new:** Share it as a card
- **p current:** Each quote becomes a finished card — the words, the book, the author. Ready to share.
- **p new:** Customize puts the quote on a card with the book's cover. Choose from 16 backgrounds and three fonts. Include my note adds your note under it. [26]
- **Why:** The editor has 16 backgrounds, three fonts (Playfair, Newsreader, Lexend) and an Include my note switch. The card prints the cover and a headed note ("Adi's note").

---

## 4. Library split

### `h2` (line 1163)

- **Current:** `Thousands of classics, free — <em>or bring your own.</em>`
- **New:** `Thousands of free classics, <em>or your own books.</em>`
- **Why:** Drops the em-dash and keeps the `<em>` turn. "Thousands" holds: LibriVox alone is listed at about 20,000 titles.
- Alternative: `Free classics to start, <em>or bring your own.</em>`

### `p.sub` 1 (line 1164)

- **Current:** A built-in catalogue of public-domain audiobooks from LibriVox and the Internet Archive, in six languages. Download one and the transcription starts on its own — you're reading along in minutes.
- **New:** Discover searches LibriVox and Internet Archive at once, in English, German, French, Spanish, Italian or Portuguese. Download a book and it queues for transcription by itself. [26]
- **Why:** These are the six languages in Discover's filter. The search field reads "Search both libraries". The app confirms a download with "Added to library. Transcription queued." "In minutes" is cut: a 12-hour classic does not finish in minutes on a phone.

### `p.sub` 2 (line 1165)

- **Current:** Already own your books? Import MP3, M4A, M4B, AAC, WAV, FLAC, OGG and many more. Chapters, covers, and metadata come along automatically.
- **New:** Or import your own MP3, M4A, M4B, FLAC, OGG and ten more file types. Chapter markers come along, and several files picked together become one book. [26]
- **Why:** The import list has 15 extensions (WebM is Android-only and adds one more). Embedded chapters and OverDrive markers are read. A multi-file pick imports as one book, one chapter per file, ordered by file name. The rhetorical question is gone.

---

## 5. Reading life (`#life`)

### `h2` (line 1177)

- **Current:** Watch your reading brain light up.
- **New:** Your reading habits, drawn as a brain.
- **Why:** The app is careful that the brain is an illustration ("Each region stands for one habit and is not a medical reading"). "Reading brain" reads like a neuroscience claim; "drawn as" doesn't.
- Alternatives:
  - A. Six habits, one brain to light up.
  - B. Watch your reading brain light up. (current; the app does use "light up your first region")

### `p.sub` 1 (line 1178)

- **Current:** A private analytics suite, computed entirely on your device. A brain score from 0 to 100 grows with your streak, words read, comprehension, and consistency — across eight levels, from Just Starting to Peak Brain Health.
- **New:** Reading engagement turns six habits into one score, 0 to 100, with five levels from First pages to Cover to cover. [21]
- **Why:** The name, the drivers, the level count and the level names have all changed. It is "Reading engagement", six drivers (Listening, Read-along, Book progress, Rhythm, Streak, Reflection), five levels: First pages, Settling in, Finding your rhythm, Deep in the story, Cover to cover. "Brain Health" goes: the app says the score "is not a medical or health measure".

### `p.sub` 2 (line 1179)

- **Current:** Words are counted from the actual transcript — real words you really heard. Every card is shareable as a polished image.
- **New:** Tap a habit to see how it's counted and what would raise it. It's all worked out on your phone, and the score comes with Pro. [26]
- **Why:** Each driver opens a sheet with How it's tracked, Your numbers, Last 4 weeks and How to raise it. The words claim is cut because the app estimates words when a book has no transcript yet. "Every card is shareable" is cut because only three cards and the month or year story share. The score sits in the Pro tabs, so this split says so, since it comes before the Pro heading.
- Alternative without Pro: Tap a habit to see how it's counted and what would raise it. It's all worked out on your phone, from what you played. [24]

### Pro analytics head: `h2` (line 1189)

- **Current:** Advanced analytics, at your service.
- **New:** Where your listening time goes.
- **Why:** States what the cards answer. The eyebrow already says Pro.
- Alternatives:
  - A. The numbers behind your listening.
  - B. Analytics that answer in sentences.

### Pro analytics head: `p.sub` (line 1190)

- **Current:** Go deeper than streaks — when you start, when you stop, what you reach for, and how many words you really heard. Every number computed from your transcripts, on your device.
- **New:** Pro opens three more tabs of cards. They answer in plain sentences, like "Most of your listening starts between 9 PM and 10 PM." [24]
- **Why:** Analytics has a free Momentum card above three Pro tabs: This week, Habits and Books. The cards lead with a sentence (the quoted line is the Habits card's own pattern). One real example beats a list of abstractions.

### Collage tags

The final four cards are still being picked. One row per candidate. The first column is the card's own title in the app. A tag that repeats the title printed on the card is redundant, so the recommendation is a tag that says what the card tells you.

| Card (crop id) | Title in the app | Tag option 1 (recommended) | Option 2 | Option 3 |
|---|---|---|---|---|
| Habits (`#cHabits`) | Habits | Your usual hour | When you press play | Habits |
| Listening time (`#cListen`) | Listening time | Week against week | Hours this week | Listening time |
| Goals (`#cGoals`) | Goals | Goals you set | Words a day | Goals |
| Genres (`#cGenres`) | What you listen to | What you reach for | Your genres | Genre mix |
| Month in review (`#cMonth`) | Month in review | Your month | A month on one card | Month in review |
| Listening calendar (`#cCal`) | Listening calendar | Every day you listened | Your year in days | Listening calendar |
| Records (`#cRecords`) | Your records | Personal bests | Longest session | Your records |
| Forecast (`#cForecast`, spare) | When you'll finish | Your finish date | When you'll finish | |

Default set if the builder keeps the spec's slots (habits, genres, records, goals):

- `tag-tl` (current "Habit insights"): **Your usual hour**
- `tag-bl` (current "Genre radar"): **What you reach for**
- `tag-tr` (current "Words per book"): **Personal bests**
- `tag-br` (current "Honest goals"): **Goals you set**
- `tag-c` on the collage phone (current "Your daily rhythm"), not in the brief's four but its image changes: **Every day you listened** if the phone shows the calendar, **Your month** if it shows Month in review.

Why: the old tags named cards that no longer exist. There is no genre radar and no words-per-book chart; genres are now a bar card.

### `p.collage-cap` (line 1207)

- **Current:** Habit insights · genre radar · words per book · honest goals — every card shareable as a polished image.
- **New:** Worked out on your phone from what you played. The calendar, genres and Month in review share as images. [19]
- **Why:** The share claim is narrowed to what's true: share buttons on Listening calendar, What you listen to and Finished this year, plus "Share image" on the month and year story. It no longer repeats the tags beside it.
- Alternative (keeps the old list shape, matching the default tags): Your usual hour · what you reach for · personal bests · goals you set. All worked out on your phone. [16]

---

## 6. Characters split

### `h2` (line 1231)

- **Current:** Map the cast as you read.
- **New:** Keep track of who's who.
- **Why:** Plain words for the pain the old first sentence named ("Sprawling novels get confusing"), which frees `p.sub` 1 for facts.
- Alternative: Map the cast as you read. (current; still accurate)

### `p.sub` 1 (line 1232)

- **Current:** Sprawling novels get confusing. Drag characters onto a canvas, draw the lines between them, and label each one in your own words — ally, rival, brother, admires. Your map lives with the book.
- **New:** Add a character while you're listening and the map stamps where you first heard them, down to the second. Give them a face and a role. [26]
- **Why:** Adding a character while the book is in the player captures the playhead as "First heard: Ch. 1 · 0:09". Faces come from the look builder (Shuffle look), roles from preset chips (Hero, Villain, Rival, Mentor, Friend, Family, Love interest, Narrator) or your own words.

### `p.sub` 2 (line 1233)

- **Current:** And when a line stops you cold: tap the first word, tap the last, and it's saved as a quote — ready to share as a card.
- **New:** Link two people and pick the tie, from Siblings to Secret, or type your own. Drag faces around until the map reads right. [23]
- **Why:** The quote line belonged to the old layout. Quotes have their own section now and the tap flow it describes is out of date. The tie sheet offers preset pills (Siblings, Rivals, Allies, Mentor of, Secret, Not sure and more) and "Custom…" for your own word. Nodes are draggable on a physics canvas.

---

## 7. Alt text for the new images

The hero fan is `aria-hidden="true"`, so its alts are never read. They are listed for completeness, and so the `.f3` alt stops naming Meditations. Values in the alts (58, 64%, 24 passages, names) match the frames rendered or specified today. Re-check them against the final `t` of each shot.

| Image | Where | Alt |
|---|---|---|
| `home.webp` | hero f2, Library duo left | HushBook Home with today's streak and word count, The Hitchhiker's Guide to the Galaxy ready to continue, and your books below |
| `library.webp` | hero f5, step 01, Library duo right | HushBook Library with search, the book in progress and a grid of your books |
| `read-along.webp` | hero f3 (static under the live layer), step 04 | Chapter 1 of The Hitchhiker's Guide to the Galaxy in the read-along, the narrated word filled in and underlined in red |
| `player-hitchhikers.webp` | hero f4 | The HushBook player with the red cover of The Hitchhiker's Guide to the Galaxy, minutes left in the chapter and a Read along button |
| `player-<book>.webp` (carousel) | marquee | keep `alt=""` (decorative, the marquee is `aria-hidden`) |
| `brain.webp` | hero f1, Reading life duo | Reading engagement score of 58, Level 3 of 5, Finding your rhythm, beside an ink-wash brain whose regions stand for six habits |
| `analytics.webp` | Reading life duo | HushBook Analytics: the Momentum streak card above the This week tab, opening on Listening time |
| `analytics-calendar.webp` (the collage phone, whatever its final name) | collage centre | The Books tab in Analytics: Month in review and a listening calendar with one square per day |
| `step-transcribe.webp` | step 02 | Project Hail Mary's book page with Options open, showing Transcribe book and Transcribe on my PC |
| `step-transcribing.webp` | step 03 | The book page card reading "On your computer: transcribing, 64%" with the time left underneath |
| `quote-mark.webp` | Quotes 01 | The first sentence of 1984 picked in the read-along, with Highlight, Note and Quote floating above it |
| `quote-index.webp` | Quotes 02 | Quotes & notes: 24 passages from 6 books, a quote from 1984 with the reader's note under it |
| `quote-card.webp` | Quotes 03 | Customize: the 1984 quote on a sunset-coloured card with the reader's note, font and background choices below, and a Share button |
| `characters-map.webp` | Characters front | Character map for 1984: Winston Smith as Hero, linked to Julia, O'Brien, Big Brother and four others |
| `characters-sheet.webp` | Characters back | Winston Smith's sheet: role, first heard at Ch. 1 · 0:09, a description, attributes and his relationships |

Card crops (use the row for the four that ship):

| Crop | Alt |
|---|---|
| `card-habits` (`#cHabits`) | Habits card: most listening starts between 9 PM and 10 PM, and a session usually lasts about 24 minutes |
| `card-listening-time` (`#cListen`) | Listening time card: last week's hours against the usual, week by week |
| `card-goals` (`#cGoals`) | Goals card: a daily goal of 5,000 words and how many days it was met |
| `card-genres` (`#cGenres`) | What you listen to: Fantasy is most of the last 30 days, with the other genres in bars |
| `card-month` (`#cMonth`) | Month in review for October 2026: hours listened and the books finished |
| `card-calendar` (`#cCal`) | Listening calendar: one square per day, darker on the days with more listening |
| `card-records` (`#cRecords`) | Your records: longest session, most in one day, longest streak and fastest finish |
| `card-forecast` (`#cForecast`) | When you'll finish: the current book's expected finish date at your pace |

If the quotes scenes switch from 1984 to the Hitchhiker's passage, swap the book and sentence in the three quote alts.

---

## 8. Other homepage copy that is now wrong or stale (not in this pass)

For the orchestrator or a later pass. Evidence is in the appendix.

| Where (line) | Current | Problem | Suggested fix |
|---|---|---|---|
| Hero `.f3` alt (761) | HushBook transcribing Meditations into live word-level karaoke | Old book, old screen | Use the `read-along` alt above |
| Privacy `h2` (961) | Transcribed on your phone. Never the cloud. | Also runs on your computer now | Transcribed on your phone or PC. Never the cloud. |
| Privacy list (964) | **Nothing leaves your phone.** Audio, transcripts… | With Transcribe on my PC, audio goes to your own computer over home Wi-Fi | **Nothing goes to a server.** Audio, transcripts… stay on your devices. |
| FAQ "Does my audio ever leave my phone?" (1305; JSON-LD twin at 587) | "No. … no upload, no account, and no server." | Same as above | "Not to any server. It stays on your phone, or goes to your own computer over home Wi-Fi if you choose that." |
| FAQ "What files can I import?" (1307; JSON-LD twin at 606) | "… one file per import" | Several files picked together import as one book | "… pick one file or several; several become one book, a chapter per file." |
| SEO prose (1276) | "seek any line with a tap" | Tap-to-seek is off by default; long-press always works | "long-press any line to play from there" |
| Library duo alt (1159) | My Collections library grid with an Upload Audiobook tile | That screen is gone | Use the `library` alt above |
| Reading profiles alt (1125) | Comprehension, Dyslexia/ADHD, or Vision | The app names them Focused Reader, Dyslexia & ADHD, Low Vision | Match the app's names |
| Desktop `p.sub` (987) | "…free and unlimited. With Pro, your phone and PC stay in step." | Consistent with the app (pairing needs Pro). "Graphics card" and "unlimited" live in the desktop client, which I did not read | Leave; verify against `D:\Hushbook Desktop client` before reuse |
| Value band chips (773-777) | five chips | None contradicts the new screens | Leave |

Also stale outside the site: the auto-memory note `hushbook-product.md` says "tap any word to seek" and "Neuron Score", and `.claude/product-marketing-context.md` lists "tap-to-seek" as a proof point. All three predate the current app.

### Notes for the builders

- The `ios-offload` scene names the computer "Adi's Macbook Pro". The phone only offers "Get HushBook for Windows" today, and the Mac build is still planned. If the name shows on any shipped frame, "Adi's PC" avoids promising a Mac app.
- The quotes and characters scenes use 1984 (the films' book), not Hitchhiker's. Fine for those sections. The alts above follow what's rendered.

---

## Appendix: research (app code `D:\hushbook\lib`, read-only; strings from `lib\l10n\app_en.arb`)

### A1. Transcription flow

- **Where Transcribe lives.** The book page has an Options bottom sheet. "Transcribe book" sits there, with "Transcribe on my PC" directly below it ("B2: the PC row sits directly below 'Transcribe book'"). Evidence: `features\library\book_detail_sheets.dart` (`BookOptionsSheet`, lines 21-245). Strings: `options` "Options", `transcribeBook` "Transcribe book", `transcribeOnMyPc` "Transcribe on my PC", `bookDetailRetranscribe` "Re-transcribe".
- **When adding a book.** The import screen "Book info" has an "After saving" group of tiles: "Auto-transcribe", "Transcribe on my PC" (with a Pro pill for free users), "Sync with e-book", "Add e-book to reader", "Decide later". A "Use for new books" link saves the tapped tile as the default. Evidence: `features\library\book_info_edit_screen.dart` lines 1875-2100; `features\library\use_for_new_books_link.dart`. Strings: `afterSaving`, `autoTranscribe`, `decideLater`, `useForNewBooks`.
- **Default for new books.** Settings "Transcribe new books" offers "On this phone" ("Starts on this phone as soon as a book is added."), "On my PC" ("Sends new books to your computer over Wi-Fi. Faster, and keeps your phone cool.") and "Don't start automatically". Without a stored choice it migrates the old auto-transcribe switch, which defaulted to on, so the default is the phone. Evidence: `core\prefs\new_book_transcription.dart`; strings `newBooksTitle`, `newBooksOnPhone`, `newBooksOnPc`, `newBooksOff` and their `Desc` strings (arb 6489-6533).
- **Chapter choice.** Transcribe book on a book with 2+ chapters opens "Choose chapters to transcribe" ("Only checked chapters get synced text. You can add more later."), confirming with "Transcribe N chapters". Single-file books skip it. Evidence: `features\library\book_detail_screen.dart` `_startTranscription` (line 1962); arb 2342-2356.
- **Phone path, while it runs.** "It transcribes the whole book in order, in the background — you can keep using the app while it runs. Chapters unlock for read-along as each one finishes, and you can pause anytime and resume right where it left off." (`bookDetailTranscriptionDescription`). Status strings: `transcribingProgress` "Transcribing…{pct}", `transcribingWithEta` "Transcribing · {eta}", `libraryMarkTranscribing` "Transcribing · {percent}", `transcriptionWarmWarning` "Your device may get warm — that's normal…". In the player, the Read along pill shows a small progress ring while this phone transcribes (`features\player\cover\read_along_pill.dart`). The lamp's dotted outer segment shows how much is transcribed (`features\player\chrome\lamp.dart`).
- **PC path, the choice.** Supporting line under the PC option: "Faster, and keeps your phone cool. Uses your computer on the same Wi-Fi." / "…Uses {pc} on your Wi-Fi." (`desktopTileSupportingUnpaired`, `desktopTileSupportingPaired`). Pro is required: "Pairing a computer needs Pro (upsell spec §3.5, D9), so a free user meets the paywall before Your computer" (`features\desktop\desktop_entry_flow.dart` lines 82-90). The paywall uses the RevenueCat offering `Computer_offering` (`features\pro\paywall_offerings.dart`). Strings `desktopCardProNeeded` "Pro is needed to use your computer.", `pcNoticeNeedsPro` "Not sent to your computer: needs Pro."
- **PC path, what the phone shows.** A card on the book page steps through: "Checking your computer…", "Sending to your computer: {pct}% ({sent} of {total})", "Queued on your computer, position {pos}", "On your computer: transcribing, {pct}%", "About {eta} left", "Getting the transcript from {pc}… {size}", "Adding the transcript to this book…", "Word-synced. Read along now." The Library row mark reads "On your PC · {percent}", the Options row "On your PC: {pct}%". Button "Transcribe on this phone instead". Evidence: arb 6005-6170, 6241, 8107; `features\desktop\desktop_job_status_card.dart`; replica beats in `D:\hushbook-demo-video\showcase\ios\ios-offload\index.html` lines 291-294. The PC sends the whole transcript back at the end. A partly phone-transcribed book offers "Finish on my PC instead", and the computer "will transcribe the whole book and replace this phone's transcript when it's done" (`desktopFinishBody`).
- **Pairing (the Your computer screen).** Unpaired: an ink illustration, "Pair your computer", "Your computer can transcribe your books much faster than this phone. Books travel over your home Wi-Fi. They don't go through the internet.", button "Pair a computer", rows "Other ways to pair", "Get HushBook for Windows", "Open a .hushbook file". Scan steps: "Open HushBook on your computer." / "Click your name, then choose Pair phone." / "Choose Pair a phone, then point this phone at the QR code." Progress: "Found {pc}", "Checking it's your computer", "Pairing this phone", "Paired with {pc}". Fallback: "Compare numbers", where both screens show the same 6 numbers. Paired: a status card (Connected / Checking…), "Pair a different computer", "Forget", then the rows "Transcribe new books", "Sync listening progress" (Pro and a PC that supports it) and "Open a .hushbook file". Evidence: `features\desktop\your_computer_screen.dart` lines 246-300 and 420-470; `features\desktop\pair_computer_screen.dart`; arb 5569-5735, 5594, 5936.
- **Desktop platform.** The phone links only to "Get HushBook for Windows" (`pairGetDesktopApp`) and the Library tile says "Pair your Windows computer to bring books and transcripts over Wi-Fi" (`addTileDesktopSubtitle`).
- **Import formats.** mp3, m4a, m4b, aac, wav, flac, ogg, opus, oga, aiff, aif, caf, wma, mka, alac (15), plus webm/webma on Android only. Evidence: `core\audio\supported_audio_formats.dart`.
- **Chapters.** FFprobe reads embedded chapter atoms and ID3/MP4 tags (`features\library\import_service.dart` line 2788). OverDrive markers become chapters (`core\audio\audio_ingest_service.dart` line 1313, `core\audio\overdrive_markers.dart`). A multi-file pick (`allowMultiple = true`, `core\audio\local_audio_picker.dart` line 224) imports as one book through `importFiles(List<File>)`, one chapter per file titled from its file name, in natural numeric order (`import_service.dart` lines 1712-1745; `features\library\audio_import_types.dart` `compareAudioFileNames`). Book options also offer "Add more chapters".
- **Store downloads transcribe on their own.** When a download finishes it calls `postImportProcessingDispatcherProvider.dispatch(bookId)` (`features\store\store_download_controller.dart` line 230), which follows the book's intent (auto-transcribe on the phone, or hand to the PC) (`features\library\post_import_processing_dispatcher.dart`). The store page then shows "Added to library. Transcription queued." (`features\store\widgets\download_button.dart` line 585; arb 771).
- **Engine.** "HushBook Engine"; engines Tiny, Regular, Large, Universal; Universal covers "99 languages including Spanish, French, German, Hindi, Mandarin…" (arb 191-202).

### A2. Player

- **Two faces.** `enum PlayerMode { cover, lyrics }` (`features\player\player_mode.dart`).
- **Cover face.** A 56 dp top bar (Back, Read along), the art stage, title, author, two quiet status lines ("10 min left in chapter", "Sleep in 24 min" while a timer runs), then the controls low on the screen. The art shrinks to a thumbnail, then goes, when text is large. Evidence: `features\player\cover\cover_layout.dart` lines 19-61; `cover_status_lines.dart`.
- **Switching.** "Read along" in the cover's top bar opens the read-along page and replaces the old Lyrics toggle (`features\player\cover\read_along_pill.dart`). ‹ goes back to the cover (`features\player\chrome\read_along_chrome.dart`, `onBack`).
- **Read-along paint.** The narrated line sits at the near alpha and the others at the far alpha (180 ms cross-fade). Spoken words are in full ink (or the look's accent), the current word is wiped left to right, and a 2 dp red now-rule sits under the newest started word. A drop cap in rubric red opens the chapter. Evidence: `features\player\lyrics_karaoke.dart` (lines 233-239, 335-392); replica notes in `ios-read-along\index.html` lines 463-466.
- **Running head.** It names the chapter with its numeral in rubric red ("CHAPTER I"), with Aa and the Mark button after it (`features\player\chrome\running_head.dart`).
- **Tap a word to jump? No.** "Tap-to-seek on transcribed text. Off by default so reading taps never move the audio by accident" (`core\prefs\prefs_service.dart` lines 1021-1029). The Aa switch is "Tap a line to jump there", with the hint "You can always long-press a line to play from there." (arb 8453-8457). Long-press always seeks and shows "Playing from here" (`features\player\synced_lyrics_view.dart` lines 1424-1490).
- **Themes.** Ambient (the blurred cover behind the page), Light, Sepia, Solar, Dark, Amber (`core\prefs\prefs_service.dart` line 1407; arb 47-52). Reading looks: Midnight Editorial, Warm Paper, Amber Focus (`features\player\lyrics_color_tokens.dart`).
- **Fonts.** Newsreader, Atkinson Hyperlegible, OpenDyslexic, Lexend, Andika, Comic Neue, Kameron, Inter, System (`features\player\widgets\appearance\folio_appearance_controls.dart` lines 599-607), tagged Book face / Low vision / Dyslexia / Easy reading.
- **Aa sheet groups.** Theme, Text size, Font, Reading (Page or Vertical, line spacing Tight / Normal / Airy, Highlight style, Tap a line to jump there), More options (Search in book, Auto-align, Align narration). Evidence: `features\player\widgets\lyrics_appearance_sheet.dart`.
- **The lamp.** A 64 dp disc with a red core holding play/pause. The outer ring shows chapter progress, the inner ring the sleep timer, and a dotted segment how much is transcribed. Tap toggles play/pause; long-press or swipe up shows the controls (`features\player\chrome\lamp.dart` lines 27-37).
- **The dock.** One opaque card that grows out of the lamp and folds back into it (`features\player\chrome\dock_card.dart`). It holds the scrubber with elapsed and -remaining, the transport (previous chapter, back 30, play, forward 30, next chapter) and the pills Speed, Sleep, Chapters, More (`features\player\controls\playback_controls.dart` lines 35-61). In the replica it folds into the lamp 2.5 s after opening (`ios-read-along\index.html` line 191).
- **Return pill.** When you scroll away from the narration, a round arrow pill brings you back to the spoken line (`features\player\chrome\read_along_cards.dart` lines 130-136).

### A3. Quotes and notes

- **Picking.** The Mark button ("Mark: highlight, note or quote") in the running head, then "Tap a word to start", "Tap another word to extend". Handles mark both ends. Evidence: `features\player\marks\mark_toolbar_layer.dart` lines 22-47, 171-175, 264-266; arb 8749-8765.
- **Toolbar.** Highlight · Note · Quote, floating 8 dp above the picked words (below them when the head is in the way). All three are off past the quote length cap. Results: "Highlight saved · Undo", "Quote saved · Share", "Note saved". The note sheet shows "Audio paused" and keeps an unsaved draft ("Draft kept"). Evidence: `features\player\marks\widgets\mark_toolbar.dart`, `mark_note_sheet.dart`; arb 8793-8813, 9065-9113.
- **Mark popover.** Play from here, Add note / Edit note, Make it a quote / Make it a highlight, Share (`features\player\marks\widgets\mark_popover.dart`).
- **Quotes & notes page.** At `/library/bookmarks`: "every mark the reader kept (quotes, highlights and notes), grouped by book, in reading order. The owner's pick L1 'The Commonplace Index': one typeset page, no cards." Count line "24 passages / from 6 books, kept since July", search "Search quotes and notes", tabs All / Quotes / Highlights / Notes with counts, books as index entries with a dotted leader to the count, "My note" under the quote, per-mark meta (QUOTE · CHAPTER I · 00:00 · NOV 2), a play button, and the closing line "That's every mark. Kept by {name} since {date}." Evidence: `features\library\bookmarks\bookmarked_screen.dart` lines 44-49, 898-901, 1073-1074, 1180-1181; arb 8873-9135; render `D:\hushbook.app\tools\mockups\out\en-quote-index.png`.
- **Customize share card.** A fixed 1080 x 1350 (4:5) card with the quote, author, book, cover, a "HUSHBOOK" mark, and an optional note headed with your name. Fonts Playfair (italic), Newsreader, Lexend (`features\library\bookmarks\quote_share_card.dart` lines 9-60). 16 backgrounds: Warm, Sunset, Dusk, Ember, Forest, Ocean, Brand, Ink, Slate, Clay, Peach, Blush, Sky, Mint, Lavender, Butter (`quote_backgrounds.dart`). "Include my note" switch, "Share" button (arb 9037-9041; `quote_editor_screen.dart`). The player's Quote saved toast offers Share; "Customize card" lives on the Quotes & notes page (demo-video AGENTS.md, Set 3).
- **Not Pro-gated.** No entitlement checks in `features\player\marks` or `features\library\bookmarks`.

### A4. Analytics

- **Layout.** "Analytics: the free Momentum header above three Pro tabs, This week, Habits and Books. Each tab body sits in a ProGate" (`features\trends\trends_screen.dart` lines 62-65, 241-252). Free users see a blurred teaser with "Unlock with Pro"; data is collected for everyone (`features\pro\pro_gate.dart` lines 12-21).
- **Momentum (free).** Streak ("Day streak"), "Next badge", "Total reading days" (`features\analytics\widgets\momentum_card.dart`).
- **This week (Pro).** Listening time, Goals, When you'll finish, Habits, Your records, Reading engagement (`trends_screen.dart` lines 549-562; titles at arb 2878, 3914, 3774, 2984, 3120, 719).
- **Habits tab (Pro).** Ear and eyes, Time saved (playback speed, when visible), When you listen.
- **Books tab (Pro).** Month in review, Listening calendar, Finished this year, What you listen to (genres), Quote of the week, On pause, reader summary, Year in review (`trends_screen.dart` lines 583-600).
- **Card sentences.** Listening time: "Last week you listened for 4h 20m, 37m more than usual." Habits: "Most of your listening starts between {start} and {end}.", "A session usually lasts about {duration}." (arb 2992-3040). Genres: "Fantasy is most of your listening: 57% over the last 30 days." Records: "Most words with the text", "Longest session", "Most in one day", "Longest streak", "Fastest finish" (arb 3148-3164). Goals: daily words, or books per week, month or year (arb 3922-3961).
- **Month in review.** It opens a story ("of listening", books finished, quotes saved, characters met, longest session, "An evening listener") with "Choose what's shown" and "Share image" (`features\analytics\recap\recap_screen.dart`; arb 4889-5065).
- **Sharing.** Only Finished this year, What you listen to and Listening calendar cards pass `shareMessage` (share button), plus the recap story. Checked across `features\analytics\cards\*`.
- **Home's daily word ring is Pro.** "Daily word goal is part of Pro. Get Pro" (`todayRingSemanticsFree`; `features\home\widgets\streak_card.dart` lines 421-561). Badges have no gating (`features\badges`).
- **Reading engagement.** Real name "Reading engagement" (`analyticsReadingEngagement`), subtitle "How your listening and reading habits have looked lately." Score 0 to 100. Five levels: First pages 0-19, Settling in 20-39, Finding your rhythm 40-59, Deep in the story 60-79, Cover to cover 80-100 (`core\analytics\engagement\engagement_model.dart` lines 98-115; arb 2696-2705). Six drivers and weights: Listening 25, Read-along 20, Book progress 20, Rhythm 15, Streak 10, Reflection 10. Read-along and Reflection stay out of the score until first used (`engagement_model.dart` lines 11-35). Each maps to a brain region (temporal, occipital, frontal, cerebellum, brainstem, parietal). Driver sheet sections: "How it's tracked", "Your numbers", "Last 4 weeks", "How to raise it" (arb 2522-2526). Disclaimers: "It is for fun and motivation. It is not a medical or health measure, and it does not measure intelligence or memory." and "The brain picture is an illustration." (arb 2680, 2695). Privacy line: "Stays on your device. Worked out from your listening on this phone." (arb 2527). The listening driver uses "the transcript when a book has one and an estimate when not" (arb 2528). It sits in the This week tab, so it is Pro.

### A5. Character map

- **Adding.** "Add a character" tray: name, look ("Shuffle look", "Change look", skin tone, clothing tint), "Hero of the story", role chips (Hero, Villain, Rival, Mentor, Friend, Family, Love interest, Narrator) or a free-text role, "Description" ("Describe them like you'd tell a friend"), "Related to", "Add and next" (arb 2136-2226). Evidence: `features\characters\presentation\sheets\character_tray.dart`.
- **First heard.** Captured from the playhead when the book is loaded in the player, shown as "Ch. {chapter} · {time}" (`character_tray.dart` lines 372-400; `features\characters\data\first_heard.dart`; arb 2160-2161).
- **Links and labels.** "Link to…" then "Tap who they're linked to", or "Hold the +, then drop it on a character". The tie sheet ("{a} and {b}", "Pick how they are tied.") shows every preset as a pill: friends, Family, Siblings, Rivals, Allies, partners, Mentor of, Student of, Parent of, Child of, Employer of, Employee of, Protects, Protected by, Secret, Not sure, Sweethearts, Good friends. "Custom…" opens "Their tie"; "Remove tie" deletes it. An unlabelled link reads "is connected to". Evidence: `features\characters\canvas\tie_sheet.dart` lines 15-24; `link_gesture.dart`; arb 862-875, 2172-2207, 9751-9759, 1669.
- **Canvas.** Draggable nodes on a physics simulation (`features\characters\character_graph_canvas.dart` lines 710-717). Fit / zoom buttons, "Cast · {count}" with search, share as an image ("Share character map").
- **Detail sheet.** Avatar, name, role pill (Hero), alias, Role, First heard, Description, Attributes chips, Relationships with tie pills, Notes, edit pencil, "Delete character" (`features\characters\presentation\sheets\character_detail_sheet.dart`; render `D:\hushbook.app\tools\mockups\out\en-characters-sheet.png`).
- **Not Pro-gated.** No entitlement checks in `features\characters`.

### A6. Library, Discover and Home

- **Sources.** LibriVox ("Free public domain audiobooks", "~20,000 titles") and Internet Archive ("Open audio collections", "Millions of items") (arb 1777-1786; `core\store\librivox_provider.dart`, `internet_archive_provider.dart`). Discover subtitle: "Free audiobooks from LibriVox and Internet Archive." Search: "Search both libraries"; chips "Both libraries", "Any language", "Any length"; rows "For November evenings", "Popular this month", "Under an hour", "In other languages", "From Internet Archive" (arb 6969-7689). Audiobookshelf (your own server) also exists; left out of the copy per the SEO scope decision.
- **Languages.** The filter offers English, German, French, Spanish, Italian, Portuguese (`core\store\store_models.dart` lines 10-16).
- **Library screen.** "The Library tab as one reading list: the title row, the always-visible search, Continue, 'Your books' with the pinned chips and sort line, the list (or grid), then the rows after it" (`features\library\library_screen.dart` lines 59-62). Chips: All, In progress, Not started (plus Finished). It ends with Discover and Dictionary tiles (`widgets\library_tool_tiles.dart`). Add sheet: "Import audiobook", "HushBook Desktop".
- **Home.** Greeting ("Good morning, Adi", "Thursday · A good time to start."), the Today card (streak in days, "words today" ring against the goal, rest days saved, the week row), the hero pager with the book to continue, "Your Books" ("Everything you've imported or downloaded"), Podcasts, the Discover tile ("Free classics, read aloud by volunteers.", "Browse"), and the Frames shelf ("Share your read", "Put the book you're reading on a photo"). Bottom dock: Home, Library, Analytics, Profile. Evidence: `features\home\home_screen.dart` lines 455-560; `features\home\widgets\*`; replica text in `D:\hushbook-demo-video\showcase\ios\ios-home\index.html`.
- **Book page tabs.** Overview, Chapters, Characters, Insights, Notes (`D:\hushbook.app\tools\mockups\scenes\ios-offload\strings\en.json`, from the app).

### A7. Film-note deviations that touch the copy (`D:\hushbook-demo-video\AGENTS.md`, "iOS showcase films")

- ETAs and transcript sizes in the offload film are invented. Status bars use Inter for SF Pro. Icons are traced.
- The character map does not run physics on open (nodes load at rest), and draw-on plays only for a new link.
- Quotes film: 1984 has no cover file, so the card and the index show the app's "Ember Grid" fallback cover. "Customize card lives on the Quotes & notes page."
- The pairing film uses a Mac, but the phone today links only to the Windows app.
