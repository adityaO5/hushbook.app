# Marketing Context — HushBook

*Last updated: 2026-06-11*
*Auto-drafted (Mode 1) from app source (`D:\hushbook`) + live site (`D:\Hushbook.app`). Confidence tags: 🟢 verified from code/site · 🟡 reasonable inference · 🔴 assumed — needs your input.*

> **This is V1.** Sections tagged 🔴 (competitors to confirm, real customer quotes, testimonials/logos, actual metrics, business goal) need you to fill or correct. Every other marketing skill reads this file first — get it right once, never repeat yourself.

---

## Product Overview
**One-liner:** 🟢 HushBook turns any audiobook into word-level karaoke — read along with every word you hear, transcribed privately on your phone.
**What it does:** 🟢 HushBook is an audiobook player that generates synchronized, word-level text for your audiobooks using an on-device speech-to-text engine (whisper.cpp via native FFI — the "HushBook Engine"). Every word lights up in sync with the narration, Apple-Music-lyrics style, so you read and listen at once. It ships with a free library of public-domain classics (LibriVox + Internet Archive), lets you import your own MP3/M4B files, and reshapes the entire UI around accessibility profiles (Dyslexia/ADHD, Low-vision, Comprehension).
**Product category:** 🟢 Audiobook player + read-along reader + on-device transcription (the "shelf": *read-along audiobook app* / *audiobook with synced text*).
**Product type:** 🟢 Mobile app (Flutter, Android primary + iOS). Local-only, no backend.
**Business model:** 🟢 Freemium. Core read-along + public-domain library = free. Optional **HushBook Pro** unlocks advanced analytics; streaks stay free. **Do not print prices on the landing page** — pricing lives in-app. Frame Pro as *supporting ongoing development and upkeep* ("Going Pro helps keep HushBook independent and improving"), not as a gate.

---

## Target Audience
**Target "companies":** 🟢 N/A — direct-to-consumer mobile app, not B2B.
**Decision-makers (who installs):** 🟢 The end user is the sole decision-maker. No buying committee.
**Primary use case:** 🟢 "I want to *read along* with the audiobook I'm listening to — to focus better, retain more, or because plain audio or plain text alone doesn't work for how I read."
**Jobs to be done:**
- 🟢 Help me focus and retain more by seeing the words as I hear them.
- 🟢 Make reading accessible to me (dyslexia, low vision, attention) without fighting the app.
- 🟢 Let me read along with books I already own and free classics — privately, offline, free.
**Use cases / scenarios:**
- 🟢 Dyslexic/ADHD reader who loses focus with audio alone — karaoke highlight anchors the eye.
- 🟢 Low-vision reader who needs very large captions + high-contrast text synced to narration.
- 🟢 Language/literacy learner pairing audio + text of the same words.
- 🟢 Privacy-conscious listener who won't upload their library to a cloud service.
- 🟢 Habit-builder who wants streaks, a brain score, and comprehension tracking — all private.

---

## Personas

| Persona | Role | Cares about | Challenge | Value we promise |
|---|---|---|---|---|
| 🟢 **Maya — Dyslexic/ADHD reader** | User | Finishing books, focus, not feeling "bad at reading" | Audio drifts; plain text is exhausting | OpenDyslexic + overlays + karaoke highlight that keeps her place |
| 🟢 **Ed — Low-vision reader** | User | Legibility, large high-contrast text, independence | Tiny captions, cloud apps that ignore accessibility | Atkinson Hyperlegible, ~108px captions, contrast themes, synced to voice |
| 🟢 **Priya — Privacy-first listener** | User / Champion | No cloud, no account, owns her data | Cloud audiobook apps track and upload | 100% on-device, no account, works offline — code-true |
| 🟢 **Sam — Quantified-self habit-builder** | User / Champion | Streaks, brain score, measurable progress | Generic apps don't show learning/retention | Brain score, badges, comprehension charts, archetype — all on-device |
| 🟡 **The recommender (SLP / teacher / parent)** | Champion | Tools that help a student/child read | Few accessible, private read-along tools exist | A genuinely accessible, private, free read-along app to recommend |

*Note: no Financial Buyer / Technical Influencer personas — consumer app, single decision-maker.*

---

## Problems & Pain Points
**Core problem:** 🟢 Listening alone doesn't work for everyone. Many readers — especially dyslexic, ADHD, low-vision, and second-language readers — focus and retain far better when they can *see the words as they hear them*. No mainstream audiobook app does word-level read-along on your *own* files.
**Why alternatives fall short:**
- 🟢 Audible/Spotify/most players = audio only, no synced text; closed, DRM'd catalogs.
- 🟢 "Immersion reading" (Audible + matching Kindle ebook) requires buying *two* products and only works on a narrow set of Whispersync-enabled titles.
- 🟢 TTS reader apps (Speechify, NaturalReader, Voice Dream) read *text aloud* with synthetic voices — the opposite direction, and not your real narrated audiobook.
- 🟢 Cloud transcription services require uploading your audio — a privacy non-starter for many.
- 🟡 Accessibility is usually an afterthought toggle, not a whole-app profile.
**What it costs them:** 🟢 Abandoned books, poor retention, eye strain/fatigue, exclusion from audiobooks entirely, or surrendering private listening data to the cloud.
**Emotional tension:** 🟢 "Reading is hard / tiring / not for me." Frustration at losing your place. Worry about privacy. Feeling underserved by apps that treat accessibility as a checkbox.

---

## Competitive Landscape
🟢 **Positioning decision: we are revolutionising *plain listening*.** The competitor isn't another app — it's the status quo of listening to an audiobook with no text at all. Frame everything against "listening alone": passive, easy to zone out, nothing to read along to. HushBook is what plain listening *should* be. Other apps below are context, not the fight.

| Competitor | Type | How they fall short for our user |
|---|---|---|
| 🟢 **Plain audiobook listening (status quo)** | **Primary** | Audio only — zone out, lose focus, retain less, no words to follow. **This is what we revolutionise.** |
| 🟡 Audible (+ Whispersync immersion) | Context | Read-along only on select titles you buy twice; DRM; cloud; no on-device transcription of your own files |
| 🟡 Speechify / NaturalReader / Voice Dream | Context (TTS) | Synthetic voice reading *text*, not your real narrated audiobook |
| 🟡 Apple Books / Play Books read-aloud | Context | Read-aloud of ebooks (TTS), not word-sync of your audiobook audio |
| 🟡 Smart AudioBook Player / Libby / LibriVox apps | Context | Deliver the audio; no read-along karaoke at all |

---

## Differentiation
**Key differentiators:**
- 🟢 **On-device transcription of ANY audiobook** — word-level karaoke generated from *your own* audio, no lyrics database, no cloud. No mainstream competitor does this.
- 🟢 **Genuinely private** — nothing uploaded, no account, fully offline after one model download. A defensible, code-true claim (not "privacy theater").
- 🟢 **Accessibility as a whole-app profile** — pick Dyslexia/ADHD, Vision, or Comprehension once and fonts, caption sizes, colors, contrast, spacing adapt everywhere.
- 🟢 **Free to start** — large public-domain library (LibriVox + Internet Archive) + import your own; no catalogue paywall.
- 🟢 **Deep, private analytics** — brain "neuroplasticity" score, streaks, 30+ badges, comprehension checkpoints, reader archetype, character graph — all on-device.
**How we do it differently:** 🟢 Run whisper.cpp natively on the phone to produce word-level timings, then race the playback position to highlight each word at 60 fps. Everything (notes, goals, scores, notifications) is local SQLite — no server exists.
**Why that's better:** 🟢 You read along with the *real* narration of *any* book you own, privately and offline, in an app that adapts to how you read — for free.
**Why customers choose us:** 🟢 We revolutionise plain listening — the only private, on-device way to turn any audiobook into Apple-Music-style read-along, in an app that adapts to how you read.

---

## Objections
| Objection | Response |
|---|---|
| 🟢 "Can I read along with my Audible books?" | Not DRM-protected ones — Audible files are encrypted. HushBook works with **un-DRM'd files you own** (MP3/M4B/etc.) and the free public-domain library. *(Be upfront — see anti-persona.)* |
| 🟢 "Isn't the first transcription slow?" | The first pass on a long book takes a while (it's doing real speech-to-text on your phone); after that it's instant every open. It runs in the background and resumes if interrupted. |
| 🟢 "Won't on-device transcription drain my battery / cook my phone?" | The HushBook Engine is thermal-aware — it caps worker threads and idles between chunks to stay cool. |
| 🟢 "Is it *really* private?" | Yes — there's no cloud and no account in the code. Audio never leaves the device; everything is local. |
| 🟡 "Will it have the latest bestsellers?" | The built-in library is public-domain classics. For new releases, import the files you own. |

**Anti-persona (NOT a good fit):** 🟢 Someone who only wants to listen to the **latest DRM-protected commercial bestsellers** (e.g., locked Audible titles) and doesn't care about read-along, privacy, or accessibility. HushBook can't transcribe encrypted files and isn't a bestseller storefront.

---

## Switching Dynamics (JTBD Four Forces)
- **Push (away from current):** 🟢 Audio-only apps don't aid focus/retention; accessibility gaps; discomfort with cloud apps tracking/uploading personal listening.
- **Pull (toward us):** 🟢 "Apple-Music lyrics, for books"; private + offline; whole-app accessibility; free classics; delightful analytics.
- **Habit (keeping them stuck):** 🟡 Already paying for Audible/Spotify; used to plain listening; library locked into one ecosystem.
- **Anxiety (about switching):** 🟢 "Will my files work?" "How accurate is the transcription?" "Is the first run too slow?" "Do I have to rebuy my books?"

---

## Customer Language
🔴 **Verbatim quotes: deferred by decision** — none yet, added later from beta users / App Store reviews / DMs. **Do not invent quotes or use placeholder testimonials on the page.** Until real quotes exist, lean on product proof points (Section: Proof Points) instead of social proof.

**Words to use:** 🟢 read along, read-along, word-level, karaoke, on-device, private, offline, no account, accessible, your own books, free classics, highlight, follow along, the HushBook Engine.
**Words to avoid:** 🟢 "AI voice" / "text-to-speech" / "synthetic narration" (we sync to the *real* narrator — don't confuse us with TTS apps); "cloud," "upload," "stream from our servers" (we're on-device); "subscription required" (core is free); over-claiming exact specs flagged ⚑ in the landing brief.

| Term | Meaning |
|---|---|
| 🟢 HushBook Engine | The on-device transcription engine (whisper.cpp via native FFI) that generates word-level timings. |
| 🟢 Read-along / karaoke | Word-level synced text highlighting in time with the narration. |
| 🟢 Reading profile | Accessibility profile (Comprehension / Dyslexia-ADHD / Vision) that reshapes the whole app. |
| 🟢 Brain score | The on-device neuroplasticity score (0–100, 8 tiers). *(Keep this name; retire leftover "Neuron score" label.)* |
| 🟢 Reader archetype | On-device reading-personality card (8 archetypes). |

---

## Brand Voice
**Tone:** 🟢 Calm, literary, confident, privacy-proud, warm. Quietly reverent about reading.
**Style:** 🟢 Direct and concrete. Short sentences. Show the product, don't hype it.
**Personality (adjectives):** 🟢 Thoughtful · Private · Accessible · Crafted · Unhurried.
**Voice DO's:** 🟢 Lead with the read-along moment ("Apple-Music lyrics, for books"). State privacy plainly. Use real, specific capabilities. Respect the reader. Let whitespace and the karaoke animation carry weight.
**Voice DON'T's:** 🟢 No growth-hack hype, no exclamation spam, no "revolutionary/AI-powered" filler, no fake urgency, no claiming TTS/AI-voice features we don't have, no unverified specs (see landing brief ⚑).

---

## Style Guide
**Grammar:** 🟢 Sentence-case headlines (a few title-case wordmarks ok). Oxford comma. Em dashes for asides.
**Capitalization:** 🟢 **HushBook** (one word, capital H + B). **HushBook Engine** (capital E). "read-along," "on-device," "word-level," "low-vision" hyphenated. Profiles: Comprehension, Dyslexia/ADHD, Vision.
**Formatting:** 🟢 Dark canvas `#0B0A09`; warm gold accent `#C9A36A`; cream/brown secondary (`#FBF8F2` / `#6F3825`) on lighter surfaces. Display serif (Fraunces / Playfair Display) for headlines; Hanken Grotesk body. Keep an animated read-along demo above the fold.
**Preferred terms:** 🟢 "read along with every word you hear," "transcribed privately on your phone," "never the cloud," "an app that fits how you read."

---

## Proof Points
**Metrics (product proof — 🟢 from code; usage metrics 🔴 TBD):**
- 🟢 100% on-device transcription (whisper.cpp via native FFI) — audio never leaves the phone.
- 🟢 Word-level sync, 60 fps highlight. No account; fully offline after one model download.
- 🟢 Playback 0.5×–3.0×, ±30s skip, volume to 2×, sleep timer (duration or end-of-chapter).
- 🟢 3 accessibility profiles; 6 bundled accessibility-friendly fonts; 5 app icons.
- 🟢 Brain score 0–100 (8 tiers); 30+ badges; 5 goal types; 8 reader archetypes.
- 🟢 Library: LibriVox + Internet Archive; 6 languages; import MP3/M4A/M4B/AAC/WAV/FLAC/OGG & more.
- 🔴 Installs, ratings, retention, # books transcribed — fill once available.
**Customers / logos:** 🔴 None to cite yet (indie). Consider accessibility-org endorsements later.
**Testimonials:** 🔴 None yet — collect from beta users / App Store reviews.

| Value Theme | Supporting Proof |
|---|---|
| 🟢 Read-along that works | Word-level, 60 fps, tap-to-seek, smart auto-scroll |
| 🟢 Genuinely private | On-device whisper.cpp, no account, offline — code-true |
| 🟢 Accessibility-first | 3 whole-app profiles, OpenDyslexic + Atkinson Hyperlegible, contrast/overlay/spacing controls |
| 🟢 Free to start | LibriVox + Internet Archive library, import your own, no catalogue paywall |

---

## Content & SEO Context
**Target keywords:**

| Cluster | Primary Keyword | Secondary Keywords | Intent |
|---|---|---|---|
| 🟢 Read-along | read-along audiobook app | audiobook karaoke, audiobook with synced text, follow along audiobook | commercial |
| 🟢 On-device / privacy | on-device audiobook transcription | offline audiobook transcription, private audiobook app, no-cloud transcription | commercial |
| 🟢 Accessibility | dyslexia audiobook app | OpenDyslexic reader, low-vision audiobook, Atkinson Hyperlegible app, ADHD audiobook focus | commercial/informational |
| 🟢 Free library | free LibriVox app | Internet Archive audiobooks, public-domain audiobook player | commercial |

**Internal links map:**

| Page | URL | Use for | Anchor text |
|---|---|---|---|
| 🟢 Landing | `/` | All clusters | HushBook |
| 🟢 About | `/about` | Mission/values | About HushBook |
| 🟢 Privacy | `/privacy-policy` | On-device/privacy proof | privacy policy |
| 🟢 Terms | `/terms-conditions` | Import/copyright/DMCA | terms |

**Writing examples:** 🟢 Current `index.html` feature rows + FAQ (good tone reference); `research/report.html` (design research). See `LANDING_REVAMP_BRIEF.md` (repo root) for the full feature inventory + copy bank.

---

## Goals
**Business goal:** 🟢 Maximize **app installs** (indie launch). Single north star.
**Conversion action:** 🟢 Tap **App Store / Google Play** download. The app is **live** — every CTA drives to the stores. *(Store URLs are **placeholders** in the current site; real links shared later — keep the download buttons, just swap hrefs when provided.)*
**Current metrics:** 🔴 Not tracked here yet — fill installs / store rating when available.

---

### Status of open items (resolved 2026-06-11)
1. ✅ **Store status:** Live. CTA drives to App Store / Google Play. Store URLs are placeholders to swap when shared.
2. ✅ **Competitor:** Plain listening (the status quo) — "revolutionising plain listening." Other apps are context only.
3. ✅ **Customer quotes:** Deferred — none until real ones exist; no placeholders.
4. ✅ **Goal & metric:** App installs (north star); usage metrics TBD.
5. ✅ **Pricing:** Not on the landing page. Pro framed as supporting development; prices live in-app only.

### Still needed from you
- 🔴 **Real store URLs** (App Store + Play) when live links are ready → swap placeholder hrefs.
- 🔴 **Logos/assets:** share the asset folder path (see chat) — want LibriVox + Internet Archive source logos for a trust strip, and real in-app screenshots for Player / Comprehension / Notifications / Accessibility / Archetype / Characters / Quotes.
