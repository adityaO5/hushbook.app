# Notes: Do Audiobooks Count on Goodreads?

Draft written by the scheduled weekly run on 2026-11-02. Nothing in this folder is live. Publish in a reviewed session with blog-writing-method steps 6 to 10.

## Why this topic

- **Backlog pick, seasonal.** Pick #5 of `docs/seo/keyword-research-2026-10-27.md`, flagged in the topic backlog as "seasonal, publish before January". Reading challenges reset on January 1, so November is the right time to get it indexed.
- **Search Console:** no query mentions Goodreads, StoryGraph, 75 Hard or reading challenges in the 90 days to 2026-10-31 (`queries_pages.csv` grep). So this is a new cluster and cannot cannibalize an existing page through Search Console data.
- **Google autocomplete (2026-11-02, `hl=en&gl=us`, 15 seeds):**
  - "do audiobooks count on goodreads" seed: "do audiobooks count on goodreads challenge", "should audiobooks count on goodreads", "do audible books count on goodreads", "do you count audiobooks on goodreads", "do people count audiobooks on goodreads", "do audiobooks count as reading on goodreads", "do audiobooks count towards goodreads goal".
  - "do audiobooks count towards" seed: "...spotify minutes", "...spotify wrapped", "...reading goal", "...goodreads reading challenge", "...screen time", "...reading challenge".
  - "do audiobooks count as reading for" seed: "...kids", "...75 hard", "...goodreads", "...school", "do audiobooks count for reading challenges".
  - "does goodreads count audiobooks" seed: "does goodreads not count audiobooks", "how does goodreads count pages for audiobooks", "does goodreads have audiobooks".
  - "how to add audiobooks to goodreads" seed: "how to put audiobooks on goodreads", "can you link audible to goodreads", "how to link audible to goodreads".
  - "how to track audiobooks on goodreads" seed: "how to track audiobook progress on goodreads", "can you log audiobooks on goodreads".
  - "goodreads audiobook" seed: "goodreads audiobook page count".
  - "do audiobooks count for reading challenge" seed: "do audiobooks count for summer reading challenge".
  - "should audiobooks count" seed: "should audiobooks count towards a reading goal".
  - "storygraph audiobook" seed: "storygraph audiobook tracking", "storygraph audiobook pages", "storygraph add audiobook", "storygraph log audiobook", "storygraph change to audiobook".
  - "how to track audiobooks" seed: "how to track audiobooks on storygraph", "how to track audiobooks on fable", "how to track audiobooks on goodreads".
- **Rejected alternatives this week:** Apple Books read-along (6 autocomplete phrases, smaller cluster; keep for a later week), "why can't I finish books" (weaker product fit), best audiobook apps for offline listening (prompt-shaped autocomplete, but a comparison page on the same pattern shipped three times last week). Spotify Wrapped and screen-time phrasings are left out on purpose: different intent and fast-changing facts.

## Live Google results (Playwright, signed out, `hl=en&gl=us`, 2026-11-02, no captcha)

- **"do audiobooks count on goodreads":** AI Overview says yes, cites Goodreads and r/goodreads, and stresses setting a "Date Read" and choosing the audio edition. Organic: a Goodreads member poll ("Do audiobooks 'count' on Goodreads?"), r/goodreads threads (3 years old, 2017, 2024), a Facebook book group, two Goodreads Help community answers (Oct 2025, Apr 2025), a Goodreads discussion thread (2023), NBC News opinion (Nov 2022), another Goodreads Help community answer (Sep 2023), a Goodreads group thread (2024). No guide from a publisher or app.
  - People Also Ask: "Why are people no longer using Goodreads?", "Does Goodreads track audiobooks?", "Can I import my Audible books to Goodreads?", "Does it count as reading if you listen to an audiobook?"
- **"do audiobooks count towards goodreads reading challenge":** same pattern (Reddit, Goodreads poll, Facebook, Goodreads Help community answers, NBC 2022).
  - People Also Ask: "Does listening to an audiobook count as reading on Goodreads?", "Why are people no longer using Goodreads?", "Does rereading a book count on the Goodreads Challenge?", "Why is a book not showing up in my reading challenge on Goodreads?"
- **"how to add audiobooks to goodreads":** Goodreads Help community answers (2022 to 2024), r/audiobooks (3 years old), a 2015 Goodreads group thread, Facebook groups.
  - People Also Ask: "Is there a way to add Audible books to Goodreads?", "Why are we boycotting Goodreads?", "How do I add a book on Goodreads that is not available on it?", "Do Audible books count towards Goodreads?"
- **"do audiobooks count for 75 hard":** AI Overview says no and cites andyfrisella.com. Organic: r/75HARD (2021 to 2024), Instagram, andyfrisella.com "75 HARD Rules", 75soft.com (2022), reset75.com (Sep 2026).
  - People Also Ask: "Does 2 walks count for 75 Hard?", "Does the Bible count for 75 Hard?", "Is it okay to do 75 Hard workouts 3 hours apart?", "How long is a 70,000 word audiobook?"
- **"how to track audiobooks on storygraph":** AI Overview built from r/TheStoryGraph and StoryGraph. Organic: r/TheStoryGraph threads (2023 to Feb 2026), StoryGraph roadmap changelog "Audiobook Tracking and Stats!" (Jun 1, 2022), YouTube and TikTok how-tos, Facebook group.
  - People Also Ask: "Does StoryGraph sync with Audible?", "Is StoryGraph Black Woman owned?", "Why use StoryGraph instead of Goodreads?", "How do I add a book as an audiobook on StoryGraph?"

**Verdict:** a weak SERP made of forums, polls, social posts and community answers. Nobody puts the Goodreads, StoryGraph, 75 Hard and library rules on one page with sources. H2s and FAQs below use the PAA wording.

## Cannibalization check

- `does-listening-to-audiobooks-count-as-reading` owns "does listening count as reading" (the research question). This post answers "does it count here" for specific trackers and challenges and links to that post for the research instead of repeating it. That post has one line ("Put it on your Goodreads shelf"), which becomes a contextual link to this post (see wiring.md).
- `how-long-is-an-audiobook` owns the hours-from-pages maths. This post reuses its sourced figures (ACX 9,300 words an hour, Gatekeeper Press words per page) for the reverse question, pages from hours, and links to it.
- No answer page covers tracking or challenges.

SOURCES_PLACEHOLDER
