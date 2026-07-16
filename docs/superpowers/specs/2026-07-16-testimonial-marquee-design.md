# HushBook Testimonial Marquee Design

## Goal

Add real reader reactions to the open space between the value-band trust chips and the “How it works” section. The section should provide social proof without interrupting the calm, literary rhythm of the landing page.

## Placement and structure

- Insert one testimonial section immediately after the current trust chips and before `#read-along`.
- Use a restrained eyebrow and heading: “Reader notes” and “Already finding their place in HushBook.”
- Present all five supplied screenshots as individual review cards in one continuously moving horizontal row.
- Duplicate the visual card sequence only for a seamless animation loop. The duplicate sequence is hidden from assistive technology so each review is announced once.

## Review content

1. Reddit — `u/larryloveinstein`: “Hello, seriously LOVING the app! I am wondering where quotes are stored?”
2. App Store — `marksewell`, five stars, title “Just what I needed!”: “I’ve tried BookPlayer, Bound, and Apple Books. HushBook is the first app that correctly displays chapter elapsed and remaining time on my 2017 Toyota Camry JBL head unit, the steering wheel controls change chapters correctly, and the on-device transcription is excellent. Thank you!”
3. Reddit — `u/larryloveinstein`: “Hello! I have it downloaded and very cool app. Is there a way to increase playback speed? I find that’s the only thing from incorporating this into my daily reading.”
4. Instagram — `@authorsanu`: “Hi, is HushBook available for Android?”
5. Reddit — `u/Momoflies`: “AHHHHHH I’VE BEEN WAITING FOR SOMETHING JUST LIKE THIS. THANK YOUUUUUUUUUUU!”

The wording is transcribed faithfully from the supplied screenshots. Reddit and Instagram cards do not show star ratings.

## Visual direction

- Cards use a cool graphite-grey surface rather than the existing warm-brown panels, making the social proof distinct while remaining compatible with the near-black page.
- The embossed treatment comes from a subtle top-left highlight, bottom-right shadow, inset border, and a large low-contrast platform mark pressed into the card’s upper-right area.
- A smaller platform emblem sits beside the username in the card header. Platform marks are inline SVGs, so they remain crisp and require no external requests.
- App Store stars use HushBook gold. All other type remains cream, soft grey, or muted grey.
- Cards share a consistent height and width. Long text is allowed more width but does not create a second row.
- The signature element is the oversized, debossed source logo behind each review, making the origin legible without turning the section into a collection of bright social-media colors.

## Motion and interaction

- The row moves from right to left at a calm, readable pace with a seamless CSS loop.
- Hovering or keyboard focus within the marquee pauses motion so a review can be read comfortably.
- Edge masks soften the cards as they enter and leave the viewport.
- With `prefers-reduced-motion: reduce`, animation is removed and the row becomes a horizontally scrollable, snap-aligned list.
- Motion is decorative; all review content remains present in semantic HTML.

## Responsive behavior

- Desktop cards are approximately 350–430px wide, depending on text length.
- Mobile cards use roughly 84vw with smaller padding, retaining a single row.
- The section uses full-bleed motion while its heading remains aligned to the standard page wrapper.
- Touch devices can horizontally scroll the row when reduced motion is active.

## Implementation boundaries

- Keep the feature self-contained in `index.html`, matching the page’s current inline CSS and JavaScript structure.
- Use CSS animation; no new library or image dependency is required.
- Do not alter the existing hero, trust chips, or “How it works” content.
- Include visible focus handling and semantic labels for source, username, rating, title, and review text.

## Verification

- Confirm the section appears in the intended gap at desktop and mobile widths.
- Confirm all five reviews, usernames, source marks, and the single five-star rating are correct.
- Confirm the loop has no obvious blank gap or jump.
- Confirm hover/focus pause and reduced-motion fallback.
- Confirm the page remains free of horizontal document overflow and existing scripts still parse.
