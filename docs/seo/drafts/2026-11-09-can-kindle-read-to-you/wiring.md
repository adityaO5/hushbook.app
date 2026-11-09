# Wiring for /blog/can-kindle-read-to-you

Draft, 2026-11-09. Nothing outside this folder has been edited by the writer. Copy `post.md` to `content/blog/can-kindle-read-to-you.md`.

## 1. Contextual links from existing posts (link-only, no `dateModified` bump)

- **`content/blog/can-libby-read-to-you.md`**, "Can Kindle read your Libby books aloud?". The paragraph
  > The catch: Amazon's page lists books bought from the Kindle store, borrowed from "Kindle+ or Prime Reading, or other official Kindle partner sources," and shared in Family Library. It does not mention public library loans, so try it on your loan before you count on it.

  append to that paragraph:
  > For e-readers, Alexa and the other ways to have a Kindle read aloud, see [can Kindle read to you](/blog/can-kindle-read-to-you).

- **`content/blog/can-you-read-along-with-audible.md`**, "How to turn it on". The paragraph
  > The text and the narration stay in sync when you switch back and forth. Audible lists its iPhone, iPad, Android and Android tablet apps, Fire tablets (Fire OS 8 and later) and its macOS app as supported. A Kindle e-reader isn't on that list.

  append to that paragraph:
  > Newer Kindle e-readers can still read a book aloud in a computer voice; see [can Kindle read to you](/blog/can-kindle-read-to-you).

  If plan action 1 renames this H2 to a question in the same session, the sentence stays where it is.

- **`content/blog/what-is-immersive-reading.md`**, "An audiobook and a text-to-speech reader do different jobs". The paragraph
  > A text-to-speech reader goes the other way. Give it a document or ebook and a computer voice reads the words. I would use that for a PDF with no recording.

  append to that paragraph:
  > The Kindle app has one built in, called Assistive Reader; see [can Kindle read to you](/blog/can-kindle-read-to-you).

  This page got the "kindle assistive reader change voice" impression in GSC; the link hands that query to the new post. If the plan's Immersive Reader H2 change ships in the same session, that change may bump `dateModified`; this link alone does not.

## 2. Registry

Insert the object literal from `registry-entry.mjs` (the `entry` object only, not the self-check) at the top of `posts` in `data/blog-posts.js`. `node registry-entry.mjs` passes:

| Field | Value |
|---|---|
| `title` | 64 chars, equals the post.md H1 |
| `metaTitle` | 53 chars (limit 60), starts with the query |
| `metaDescription` | 157 chars (limit 160), answer-first |
| `description` | 237 chars (limit 240), same text as `llms-line.txt` |
| `cta.text` | 216 chars |
| `keywords` / `takeaways` / `faqs` | 8 (scout.md list) / 5 (28 to 33 words) / 6 (answers 31 to 37 words, each starts with Yes or No) |
| `readingTime` | `'16 min read'` (3,509 body words / 220) |
| `category` | `'Read-along guides'`, same as can-libby-read-to-you |
| dates | `datePublished` and `dateModified` `'2026-11-09'`; change both if it ships later |

- `faqs` use the registry's `[question, answer]` array shape.
- No `hero`, `aside` or `compared` field.
- Both wide images are in `assets/img/blog/` (untracked): `can-kindle-read-to-you-routes.webp`, `can-kindle-read-to-you-read-along.webp`. Commit them with the post.

## 3. llms.txt

Insert `llms-line.txt` at the top of the `## Blog (English)` list, directly under the `[HushBook blog]` line (line 40), above the `why-cant-i-focus-on-reading` line.

## 4. Answer pages (`scripts/build-answer-pages.js`)

No change. The morning draft proposed swapping `/m4b-player` for this post in `RELATED['whispersync-alternative']`. Leave it: that page serves people who own both an ebook and an audiobook and want them synced, and a free computer-voice post is a weaker next step for them than the Audible Read & Listen post it already links. Revisit if this post starts ranking for "kindle read and listen" queries.

## 5. Ship check

1. Internal links in the post, all live: `/blog/can-libby-read-to-you`, `/blog/audiobook-listening-speed`, `/blog/does-reading-along-with-an-audiobook-help`, `/blog/can-you-read-along-with-audible`, `/blog/how-to-listen-to-audiobooks-for-free`, `/alternatives/speechify-alternatives`, plus `/`. No ship-together dependency.
2. `npm run build:blog`, then the `*.test.js` suite (`seo-preservation` and `seo-repair-contract` already fail at HEAD on old baselines; not a regression).
3. Rendered HTML should have 1 h1, 13 h2 (12 + Sources), 7 h3, 2 wide figures, 1 table (8 rows), 52 source links.
4. Publish-day re-check, because these changed recently: Amazon's Alexa page still says "Kindle Assistive Reader isn't available on Alexa+", and the About Amazon Kindle+ page still gives $11.99 a month.
5. Plain commit message, no co-author or session trailers.
6. After deploy: IndexNow for the new URL, /blog and the three posts that got links; then request indexing in Search Console.
