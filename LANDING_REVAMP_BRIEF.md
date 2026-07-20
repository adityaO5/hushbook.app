# HushBook — Landing Page Revamp Brief

> **What this is.** A self-contained, information-rich product brief for rebuilding the HushBook
> marketing landing page. Written to be pasted into a fresh Claude session (Claude app) that has
> **no access to the app source code**. Everything Claude needs — positioning, every feature, the
> proof points, the current page's structure, and a recommended revamp — is in this one file.
>
> **How to use it.** Open a new chat, paste this whole document, then say: *"Revamp my landing page
> using this brief. Here is my current index.html / CSS / JS …"* (attach the files in
> `D:\Hushbook.app\`). Or ask for a brand-new structure based on Section 8.
>
> Last compiled: 2026-06-11 · Source: live app code at `D:\hushbook` + current site at `D:\Hushbook.app`.

---

## 0. TL;DR — the one-paragraph pitch

**HushBook turns any audiobook into word-level karaoke — every word lights up in sync with the
narration, like Apple Music lyrics, but for books.** The transcription that powers it runs **100%
on your phone** (the on-device "HushBook Engine"), so no audio is ever uploaded, no account is
required, and the whole app works offline once a model is downloaded. It ships with a free library
of public-domain classics (LibriVox + Internet Archive), lets you import your own MP3/M4B files,
and is **accessibility-first** — pick a Vision, Dyslexia/ADHD, or Comprehension profile and fonts,
caption sizes, colors, and spacing adapt across the entire app. On top of reading, it quietly tracks
your habit: a brain "neuroplasticity" score, streaks, collectible badges, comprehension checkpoints,
a reader archetype, and a per-book character relationship graph — all computed on-device.

**Category:** Audiobook player + read-along reader + on-device speech-to-text.
**Platforms:** Android (primary) and iOS. **Price:** Free core + library; optional Pro upgrade for advanced analytics.
**The wedge:** *Read-along karaoke for audiobooks you already own, transcribed privately on-device.*

---

## 1. Positioning

### The core promise (use verbatim or close)
- **Headline idea:** "Read along with every word you hear."
- **Sub:** "Turn any audiobook into word-level karaoke — read and listen at once, transcribed privately on your phone."
- **The meme that sells it:** **"Apple-Music lyrics, for books."** This single line is the fastest way to make the product click. Keep it prominent.

### The positioning anchor: we revolutionise *plain listening*
The competitor isn't another app — it's the **status quo of listening with no text at all**: passive,
easy to zone out, nothing to follow. Frame the whole page against "listening alone." HushBook is what
plain listening *should* be.

### Why it's different from a normal audiobook app
Ordinary audiobook players just play audio. HushBook adds the thing they all lack: **synchronized,
word-level text you read while you listen** — generated on your own device from your own files, with
no lyrics database and no cloud. That synchronization is not a gimmick bolted on; it *is* the product.

### The three messaging pillars (everything ladders up to these)
1. **Read-along karaoke** — the hero capability. Word-perfect highlighting, tap-to-seek, smart auto-scroll.
2. **Private by design** — on-device transcription, no upload, no account, works offline. This is the trust wedge.
3. **Accessibility you can feel** — three reading profiles that reshape the whole app (dyslexia, low-vision, comprehension).

Secondary pillars that deepen the story: a free classics library, deep on-device analytics (brain
score, streaks, comprehension), and reading-companion tools (character graph, quotes, archetype).

### Who it's for (audience segments)
| Segment | The hook for them |
|---|---|
| **People who read with their ears** | Audiobook lovers who retain more / stay focused when they can *see* the words too. |
| **Dyslexia / ADHD readers** | OpenDyslexic font, reading overlays, adjustable spacing; karaoke highlight keeps the eye anchored to the voice. |
| **Low-vision readers** | Atkinson Hyperlegible font, very large captions, high-contrast themes, bold + line-spacing controls. |
| **Privacy-conscious users** | Nothing leaves the device. No account, no tracking, no server. A genuine, code-true claim. |
| **Language & literacy learners** | Hearing + reading the same words simultaneously is a proven comprehension aid. |
| **Quantified-self / habit builders** | Brain score, streaks, badges, goals, comprehension charts — all private. |

---

## 2. Offering map (the whole product, segmented)

HushBook's surface area is large. Group it on the page into these **offerings**. Each one below has:
*what it is → why it matters (user benefit) → proof points / hard numbers → a suggested section headline.*

> ⚑ = a claim to verify before publishing (see Section 10). Numbers without ⚑ are code-confirmed.

---

### OFFERING 1 — Read-Along Karaoke  *(the hero)*
**What it is.** Every word of the narration is highlighted in real time as it's spoken, Apple-Music-lyrics style, with the active line auto-scrolling into a comfortable reading position.

**Why it matters.** You read and listen at the same time — focus stays locked, comprehension and retention go up, and you never lose your place.

**Proof points / specifics**
- **Word-level** sync (per-word start/end timestamps), not just line-level.
- Highlight is **frame-accurate (60 fps)** — interpolated off the audio position, so the lit word truly tracks the voice.
- **Tap any word or line to seek** the audio straight to that point.
- **Smart auto-scroll** parks the active line ~30% down the screen, and **pauses the moment you scroll up**, resuming on its own after ~4 seconds idle.
- **Two-tap quote capture:** tap a first word, tap a last word, save the span as a quote (caps: 50 words / 300 chars).
- **Night mode** (solid dark backdrop) instead of the blurred cover-art backdrop, per reading profile.

**Suggested headline:** *"Word-level karaoke for any audiobook."*

---

### OFFERING 2 — The On-Device HushBook Engine  *(the privacy wedge)*
**What it is.** The speech-to-text that generates the synced text. It is **whisper.cpp running natively on the phone** (via FFI), not a cloud service.

**Why it matters.** Your audiobooks and your data never leave the device — no upload, no account, no sign-in. After a one-time model download, the entire app works **fully offline**.

**Proof points / specifics**
- **100% on-device.** Audio is never transmitted. This is literally true in the code — a rare, defensible privacy claim.
- **No account, ever.** The whole app is local-only (SQLite on device). No login, no email required.
- Choice of **four engine sizes** (Tiny → Medium) ⚑ with a download-size callout; English-only models plus a **multilingual model (99+ languages)** ⚑.
- Models can be **pre-bundled** or **downloaded once** (resumable, retried); then offline forever.
- Output is **word-level timing** with per-word confidence; long books are processed in chunks with **resume-on-failure** so progress is never lost.
- **Thermal-aware**: caps worker threads and idles between chunks to keep the phone cool on long transcriptions.

**Suggested headline:** *"Transcribed on your phone, never the cloud."*

> **Live mic transcription** exists as a screen but is **not shipped** ("coming soon"). Do **not** advertise it. Roadmap only.

---

### OFFERING 3 — Free Library + Your Own Books
**What it is.** A built-in store of public-domain audiobooks, plus single-file import of your own audio.

**Why it matters.** Thousands of free classics to read along with on day one — no subscription, no catalogue paywall — and you can bring books you already own.

**Proof points / specifics**
- Two sources: **LibriVox** (public-domain classics read by volunteers) and the **Internet Archive**.
- Browse by **popularity / recent / title A–Z / duration**; filter by **genre** (Fiction, Classics, Mystery, Philosophy, History, Children, Poetry, Drama, Non-Fiction, Religion, Science, Short Stories) and **duration buckets** (<2h, 2–6h, 6–12h, 12h+).
- **6 catalogue languages**: English, German, French, Spanish, Italian, Portuguese.
- Download a title → transcription **starts automatically** → reading along in minutes; then fully offline.
- Offline catalogue caching (stale-while-revalidate) so browsing is fast and bandwidth-light.
- **Import your own:** one file per import — **MP3, M4A, M4B, AAC, WAV, FLAC, OGG/OPUS, AIFF, ALAC, WMA** and more.
- **M4B chapters auto-detected** from the file's chapter markers; cover art and metadata (title/author/year/genre) pulled automatically, editable after import.
- Duplicate / restore detection via an audio fingerprint (re-import a deleted book and pick up where you left off).

**Suggested headline:** *"Thousands of classics, free — or bring your own."*

---

### OFFERING 4 — The Player
**What it is.** A full-screen player designed for *reading*, not just hearing.

**Why it matters.** Everything you need to read along — three views, fine control, and it keeps playing when the screen is off.

**Proof points / specifics**
- **Three modes:** Cover art · Karaoke lyrics · Up-next queue — switch with a tap.
- **Variable speed 0.5×–3.0×** (fine, ~0.02× steps).
- **±30-second** skip buttons; previous/next **chapter** navigation.
- **Volume boost up to 2×.**
- **Background playback** + **lock-screen / notification controls**; screen stays awake while reading (wakelock).
- **Sleep timer:** custom duration **or** "end of current chapter," with a gentle ~5-second volume fade before it pauses.
- **Mini-player bar** on Home/Library when something's playing; tap to jump back into the full player.

**Suggested headline:** *"A player built for reading, not just hearing."*

---

### OFFERING 5 — Accessibility Profiles  *(major differentiator — give it real space)*
**What it is.** Pick one profile and the **entire app** adapts: fonts, caption sizes, colors, contrast, spacing, overlays.

**Why it matters.** Most apps bolt on a font toggle. HushBook reshapes itself around how *you* read — this is a headline reason people will choose it and recommend it.

**The three profiles**
| Profile | Default font | What it changes |
|---|---|---|
| **Comprehension** | Inter (system) | Default profile; clean system font; focus + comprehension tools; lyrics night mode. |
| **Dyslexia / ADHD** | **OpenDyslexic** | Font picker (OpenDyslexic / Lexend / Andika / Comic Neue); **A− / A / A+** sizing; **reading overlay colors** (yellow / blue / green / purple / rose tints); larger caption sizes & line padding; night mode. |
| **Vision (low-vision)** | **Atkinson Hyperlegible** | Captions auto-ON; **largest karaoke captions (up to ~108px)**; **text-scale slider up to ~2.5×**; **high-contrast themes** (black-on-white, white-on-black, amber-on-black — drops the blurred backdrop for max legibility); **bold toggle**; **line-spacing slider**. |

**Other accessibility / personalization touches**
- **Five swappable app icons** (Default, Forest, Crimson, Charcoal, Blush).
- Fonts bundled: Inter, OpenDyslexic, Lexend, Andika, Comic Neue, Atkinson Hyperlegible.

**Suggested headline:** *"An app that fits how you read."*

---

### OFFERING 6 — Analytics & Brain Score  *(the "stickiness" engine)*
**What it is.** A private, on-device analytics suite. Centerpiece: a **brain "neuroplasticity" score** that lights up as you read.

**Why it matters.** Reading becomes visibly rewarding. You watch a brain map brighten, hold streaks, and see real insight into your own habit — all without anything leaving your phone.

**Proof points / specifics**
- **Brain Score 0–100**, with an **8-tier level system** ("Just Starting" → "Peak Brain Health"), shown as an evolving, generative brain visual that grows with you.
- The score blends **streak, words read, books completed, comprehension, and consistency** into one number ⚑ *(exact weights differ between code and docs — describe qualitatively, don't publish a formula).*
- **Momentum card:** current day-streak, total reading days, next-milestone countdown.
- **Habit Insights:** your usual listening hour, longest session, average session length, most active day.
- **Words Read** counted from the *actual transcript* (real words), not a guess — with a 150-wpm fallback only when no transcript exists.
- Three analytics tabs — **Insights** (month heatmap, genre radar) · **Platform** (app-usage scatter, cover-vs-lyrics playback split, library uploads) · **Personal** (brain score, reader archetype, habit insights, goals, words-per-book, average focus).
- **Every card is shareable** as a polished image.
- All computed **on-device**.

**Suggested headline:** *"Watch your reading brain light up."*

> Branding note: the score has been re-themed from a "neuron" visual to a **brain** visual. Keep the
> name **consistent** on the page — prefer "Brain score." (The current site still says "Neuron score"
> in one spot; fix it.)

---

### OFFERING 7 — Streaks, Badges & Goals  *(gamification)*
**What it is.** Daily streaks, collectible milestone badges, and honest goals.

**Why it matters.** A reason to come back tomorrow — the chain you don't want to break, made tangible.

**Proof points / specifics**
- **Daily streak** (consecutive days with a session) + all-time longest; streak-freeze tokens to forgive a missed day.
- **30+ collectible badges** ⚑ *(code shows ~31–34 across builds — use "30+")* across categories: **streaks** (3/7/14/30/100/365 days), **books** (1 → 200), **words** (10k → 1M), **hours** (1h → 500h), **focus** (read-along, deep-diver, night-owl, early-bird), and **special** (first import, first transcript, perfect week, marathon, comeback, genre explorer).
- Badges render as dimensional, hex-clipped collectible **medals**.
- **5 goal types:** weekly hours, monthly hours, monthly books, yearly books, weekly read-along minutes — with ML-suggested targets based on your own pace.
- **Streak calendar** visualizing the chain.

**Suggested headline:** *"Streaks you can hold in your hand."*

---

### OFFERING 8 — Comprehension & Deeper Insights
**What it is.** Tools to track not just *that* you read, but *how well it's sinking in.*

**Why it matters.** Turns passive listening into measured understanding — unique among audiobook apps.

**Proof points / specifics**
- **Comprehension checkpoints:** self-score (1–5) at any point in a book; charted across the whole book with a forecast trend line.
- **Per-book attention curve** (engagement over time) and a **listen heatmap** showing where attention peaked or dropped.
- **Genre radar** (multi-axis spider of what you read most), **daily-words trend**, **playback breakdown** (cover vs. lyrics time).
- **Average focus score by hour** — when you read most attentively.

**Suggested headline:** *"Know what's actually sinking in."*

---

### OFFERING 9 — Reader Identity (Archetype)
**What it is.** An on-device "reader archetype" card — your reading personality, written in a personalized paragraph.

**Why it matters.** A delightful, shareable identity moment that makes the data feel personal. Computed entirely on-device.

**Proof points / specifics**
- **8 archetypes** (e.g., Introspective Improver, Cozy Escapist, Deep Diver, Genre Wanderer, Steady Habitualist, Speed Voyager, Nocturnal Completionist, Dawn Reader), unlocked after ~2 finished books.
- Matched from your reading behavior (genres, pace, timing, streak, comprehension), with a personalized multi-sentence paragraph **generated on-device** — no AI server.
- Shareable card.

**Suggested headline:** *"Meet your reading self."*

---

### OFFERING 10 — Character Relationship Graph
**What it is.** A per-book, free-floating canvas to map who's who and how they connect.

**Why it matters.** Sprawling novels get confusing. Build a living web of characters and relationships you can keep at your fingertips.

**Proof points / specifics**
- Drag character **nodes** on an interactive canvas; **draw edges** between them; label relationships with **free text** ("ally," "rival," "brother," "admires").
- Add characters with name / alias / notes; positions persist; pinch-zoom & auto-fit.

**Suggested headline:** *"Map the cast as you read."*

---

### OFFERING 11 — Quotes & Sharing
**What it is.** Capture lines you love and share them as beautiful cards.

**Why it matters.** Built-in virality + a reason to evangelize. Each share carries the brand.

**Proof points / specifics**
- **Quotes** captured via two-tap word selection in the karaoke view, stored locally, grouped by book; edit / share / delete.
- **Quote share card:** 1080×1350 (4:5), dark gradient, auto-fitted text, author + book attribution, HushBook branding.
- **Frames:** a "Currently reading / Just finished" shareable card combining your photo + the book cover + a personalized heading ("Ashley's Current Read").

**Suggested headline:** *"Save the line. Share the card."*

---

### OFFERING 12 — Smart, Gentle Notifications
**What it is.** On-device reminders that know when to stay quiet.

**Why it matters.** Helpful nudges, never spam, never at 2am — and scheduled locally, so no server is watching you.

**Proof points / specifics**
- Three rules: **streak-at-risk** (only after 8pm, if your streak's on the line), **inactivity** (after a quiet stretch), **unplayed import** (a book you added but never opened).
- **Quiet hours** (default 22:00–08:00, customizable), **frequency caps**, and **adaptive timing** that learns your usual listening hour.
- Entirely **on-device** — no tracking, no push server.

**Suggested headline:** *"Reminders that know when to stay quiet."*

---

### OFFERING 13 — Onboarding & Personalization (local-only)
**What it is.** A short, account-free setup that tailors the app to you.

**Why it matters.** Reinforces the privacy story (no email/login) and makes the app feel personal from minute one.

**Proof points / specifics**
- No email, no login, no account — **fully local**.
- Steps: accessibility-profile pick → engine pick → name → photo (optional) → reading motivation (escape / learn / focus / habit) → daily goal (10/20/30/45 min) → preferred listening time → favorite genres.
- Your choices seed the home greeting, daily goal, reminder timing, and genre radar.

**Suggested headline:** *"Set up in a minute — no account, ever."*

---

## 3. Proof-point spec sheet (one-glance numbers)

| Spec | Value |
|---|---|
| Sync granularity | **Word-level**, 60 fps highlight |
| Transcription | **100% on-device** (whisper.cpp via native FFI) |
| Account required | **None** — fully local |
| Offline | **Yes**, after one-time model download |
| Engine sizes | **4** (Tiny → Medium) ⚑ · English + multilingual (99+ langs) ⚑ |
| Playback speed | **0.5×–3.0×** |
| Skip | **±30 s**; chapter prev/next |
| Volume | up to **2×** boost |
| Sleep timer | duration **or** end-of-chapter, with fade |
| Library sources | **LibriVox + Internet Archive** |
| Catalogue languages | **6** (EN, DE, FR, ES, IT, PT) |
| Import formats | MP3, M4A, **M4B (auto-chapters)**, AAC, WAV, FLAC, OGG/OPUS, AIFF, ALAC, WMA |
| Accessibility profiles | **3** (Comprehension, Dyslexia/ADHD, Vision) |
| Bundled fonts | Inter, OpenDyslexic, Lexend, Andika, Comic Neue, Atkinson Hyperlegible |
| App icons | **5** |
| Brain score | **0–100**, 8 tiers |
| Collectible badges | **30+** ⚑ |
| Goal types | **5** |
| Reader archetypes | **8** |
| Platforms | iOS + Android |
| Price | Free core + library; optional **Pro** for advanced analytics |

---

## 4. Voice, tone & brand

- **Tone:** calm, literary, confident, a little reverent about reading. Short sentences. No hype words.
- **Signature line:** *"Apple-Music lyrics, for books."* Use it once, prominently.
- **Recurring phrases that work:** "Read along with every word you hear." · "Transcribed privately on your phone." · "Never the cloud." · "An app that fits how you read."
- **Current visual system (keep / evolve):**
  - Near-black canvas `#0B0A09`; warm gold accent (`#C9A36A`).
  - Display serif **Fraunces** / **Playfair Display** for headlines; **Hanken Grotesk** for body; **Ewert** as a decorative face.
  - The hero's live, animating karaoke text is the centerpiece — keep an animated read-along demo above the fold.
- **Don't claim** anything in Section 10's ⚑ list without checking. The privacy claims are real and are your strongest asset — protect their credibility by keeping every *other* claim equally true.

---

## 5. SEO / keywords (for meta + headings)
Primary: *read-along audiobook app, audiobook karaoke, on-device transcription, offline audiobook transcription, audiobook with synced text, private audiobook app.*
Accessibility long-tail: *dyslexia audiobook app, OpenDyslexic reader, low-vision audiobook, Atkinson Hyperlegible reading app, audiobook for ADHD focus.*
Library long-tail: *free LibriVox app, Internet Archive audiobooks, public-domain audiobook player.*

Current `<title>`: *"HushBook — Read along with every word you hear."*
Current meta description (good, keep): *"HushBook turns any audiobook into word-level karaoke, transcribed privately on your phone with the on-device HushBook Engine. Privacy-first, accessibility-first. Free on iOS & Android."*

---

## 6. Suggested FAQ content (refreshed)
- **Where can I get HushBook?** → Live now, free on the App Store and Google Play (iPhone + Android). *(Store links are placeholders until real URLs land.)*
- **Does my audio ever leave my phone?** → No. On-device, no cloud, no account, offline after model download. *(Strongest answer — lead with it.)*
- **What files can I import?** → MP3, M4B, M4A, FLAC, OGG and more, one file per import; M4B chapters auto-detected.
- **Where do the synced lyrics come from?** → HushBook generates them on your audio — no lyrics database. First pass on a long book takes a while; instant every time after.
- **How much does it cost?** → The core read-along experience and the public-domain library are free. There's an optional Pro upgrade for advanced analytics — going Pro helps support HushBook's ongoing development. *(No prices on the page; pricing is shown in-app.)*
- **Who is it for?** → Anyone who reads with their ears — especially Vision, Dyslexia and Comprehension profile users.
- **Add:** *Which languages?* · *Does it drain battery / heat the phone?* (answer: thermal-aware engine) · *Can I read in the dark?* (night mode).

---

## 7. Current landing page — audit

**File:** `D:\Hushbook.app\index.html` (+ `assets/css/styles.css`, `assets/js/main.js`). Single-page, dark, animated.

**Current structure (in order):**
1. Nav (Features / How it works / FAQ / About)
2. **Hero** — animated karaoke phone + store badges + QR
3. **Trust strip** — 4 chips (on-device / offline / thousands of titles / formats)
4. **Features** — 10 alternating feature rows: ①Read-along ②Library ③Analytics/brain ④Accessibility ⑤Badges ⑥On-device import ⑦Characters ⑧Player ⑨Comprehension ⑩Notifications
5. **Moment band** — "Apple-Music lyrics, for books"
6. **Availability** — store badges + two mini phones
7. **QR** section
8. **FAQ** (6 Q&A)
9. **Finale** CTA
10. Footer + sticky dock bar

**What's working (keep):**
- The hero karaoke animation — that's the product in one glance. Non-negotiable keeper.
- "Apple-Music lyrics, for books" moment band.
- The on-device/privacy trust strip up high.
- Alternating feature rows with phone mockups — clean Raycast-style rhythm.
- Strong, true meta/OG tags.

**Gaps & opportunities:**
- **§8 Player, §9 Comprehension, §10 Notifications still use "Screenshot coming soon" placeholders.** Replace with real device shots or built mockups (like the others) before/at revamp.
- **Brain vs. neuron naming is inconsistent** — feature row says "brain map," availability mini-card says "Neuron score." Pick one (recommend "Brain score") everywhere.
- **Accessibility is under-sold for how strong it is.** Consider promoting it nearer the top, or giving it an interactive "switch the profile, watch the text change" demo (the markup already has a profile toggle component — make it live).
- **No reader-archetype, no quotes/Frames, no goals** are shown — these are delightful, shareable moments worth a row or a combined "your reading life" section.
- **No social proof / no real screenshots of the actual app** — every mockup is a CSS recreation. Add real screenshots when available.
- **Trust strip could carry harder numbers** (6 languages, word-level, 30+ badges) — currently soft.
- **Store links are placeholders** — the app is live, but the App Store / Play hrefs are stubs. Keep the download buttons and "Out now"; swap the URLs when the real links arrive. Goal of the whole page = **drive installs**.
- **No pricing on the page** — keep Pro out of the pricing spotlight. One soft line is fine ("Going Pro supports HushBook's development"), but no tiers/numbers; pricing lives in-app.

---

## 8. Recommended revamp — section order

A tightened narrative that leads with the wedge, banks trust early, then widens:

1. **Hero** — animated word-level karaoke demo + "Read along with every word you hear" + store/CTA. *(Keep.)*
2. **Trust strip** — harden it: *100% on-device · Word-level sync · Works offline · No account · 6 languages.*
3. **The hero capability, expanded** — Read-Along Karaoke (Offering 1) with the tap-to-seek + auto-scroll detail.
4. **Private by design** — On-Device Engine (Offering 2). The privacy wedge, stated plainly and proudly.
5. **Accessibility** — promote it here, high (Offering 5). Make the profile-switch demo interactive.
6. **Your library + your books** — Library + Import (Offering 3).
7. **The player** — (Offering 4) with real screenshots.
8. **"Apple-Music lyrics, for books"** moment band. *(Keep.)*
9. **Your reading life** — a combined section: Brain score + streaks/badges + comprehension + archetype + goals (Offerings 6–9). One strong scrollytelling block instead of three thin rows.
10. **Reading companions** — Characters graph + Quotes/Frames (Offerings 10–11).
11. **Gentle notifications** — (Offering 12), short.
12. **Availability / QR / Finale CTA.** *(Keep, verify store claim.)*
13. **FAQ** (refreshed per §6) + Footer.

> If a shorter page is wanted, collapse to: Hero → Trust → Karaoke → On-device/Privacy → Accessibility → Library → "Your reading life" (analytics+gamification) → Availability → FAQ.

---

## 9. Copy bank (drop-in headlines & subs)

- **Karaoke:** "Word-level karaoke for any audiobook." / "Every word lights up in sync with the narration — tap a word to jump there, and auto-scroll keeps your place."
- **On-device:** "Transcribed on your phone, never the cloud." / "No upload, no account — and fully offline once a model is downloaded."
- **Accessibility:** "An app that fits how you read." / "Pick Vision, Dyslexia or Comprehension once — fonts, captions, colors and spacing adapt everywhere."
- **Library:** "Thousands of classics, free — or bring your own." / "LibriVox and the Internet Archive, plus your own MP3 and M4B files."
- **Player:** "A player built for reading, not just hearing." / "Cover, lyrics and queue — 30-second skips, variable speed, lock-screen controls."
- **Analytics:** "Watch your reading brain light up." / "A brain score that grows with your streak, words and comprehension — all on your device."
- **Gamification:** "Streaks you can hold in your hand." / "Collectible badges, honest goals, and a chain you won't want to break."
- **Comprehension:** "Know what's actually sinking in." / "Drop a checkpoint and chart your understanding across the whole book."
- **Archetype:** "Meet your reading self." / "An on-device reader archetype, written just for you."
- **Characters:** "Map the cast as you read." / "Drag characters, draw relationships, never lose track of a big cast."
- **Notifications:** "Reminders that know when to stay quiet." / "Quiet hours, frequency caps, adaptive timing — scheduled on your phone."

---

## 10. ⚑ Claims to verify before publishing

| Claim on/near the page | Status | Action |
|---|---|---|
| **"Out now / live on iOS & Android"** | ✅ Confirmed **live**. Keep "Out now." | Store **URLs are placeholders** — swap App Store / Play hrefs when real links are shared. |
| **Badge count** | Code shows ~31 in one place, ~34 in another | Use **"30+"** until reconciled; don't print an exact number. |
| **Brain-score formula weights** | Differ between code and project docs | Describe qualitatively ("blends streak, words, comprehension, completion, consistency"); **don't publish a formula**. |
| **Engine sizes / names & MB** | 4 sizes referenced; exact labels (Tiny/Base/Small/Medium) and sizes vary | Verify the shipped picker labels before listing sizes. |
| **"99+ languages" multilingual** | True only if the multilingual model ships/bundled in the build | Confirm the multilingual model is actually offered in-app. |
| **Vision caption max (~108px) / text-scale (~2.5×)** | Code-referenced but build-dependent | Fine to say "very large captions"; verify exact px if printed. |
| **Catalogue size ("thousands")** | Safe; exact per-provider counts (e.g., "20,000 LibriVox") | Keep it to "thousands"; don't cite a precise catalogue count. |
| **Live mic transcription** | **Not shipped** | Do **not** put on the landing page. |
| **Volume "2×"** | Player overlay supports a boost; confirm ceiling in current build | Keep "up to 2×". |

---

## 11. Assets available in the site repo (`D:\Hushbook.app\assets\`)
- `assets/img/` — cover art (Meditations), library art, app-icon previews (default/forest/crimson/charcoal/blush), QR, default preview/OG image.
- `assets/img/*_front.webp` — rendered **badge** images (streak_7, streak_30, books_10, words_100k, hours_50, special_first_transcript …).
- `assets/badges/` — App Store + Google Play store badges.
- `assets/fonts/`, `assets/css/styles.css`, `assets/js/main.js` — current type, styles, and the karaoke animation script.
- `research/report.html` + `.lazyweb/design-research/` — prior design research worth skimming.
- **Still needed:** real in-app screenshots for Player, Comprehension/Trends, Notifications, Accessibility, Archetype, Characters, Quotes/Frames.

---

*End of brief. Everything above is derived from the live app source (`D:\hushbook`) and the current
site (`D:\Hushbook.app`). Treat ⚑ items as unverified marketing claims, not facts.*
