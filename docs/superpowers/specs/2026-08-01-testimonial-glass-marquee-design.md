# HushBook Glass Testimonial Marquee Design

## Goal

Refresh the landing page testimonial cards with a calm charcoal glass treatment while keeping the existing, continuously scrolling horizontal review rail.

## Scope

- Update only testimonial presentation and motion styling in `index.html`.
- Preserve every review, rating, platform label, semantic list role, and source mark.
- Keep the current heading, placement, card order, and one-row horizontal marquee.
- Do not add dependencies, assets, or third-party runtime code. MVPBlocks is visual reference only; its BSD-3-Clause license permits reuse, but this implementation stays native to HushBook.

## Visual direction

- Cards use a translucent graphite surface over the existing near-black landing page.
- Apply moderate backdrop blur, a soft top-left rim highlight, a low-contrast inner border, and a restrained depth shadow.
- Keep type readable: warm ivory review text, muted metadata, and gold five-star ratings.
- Preserve the subdued source watermark treatment behind applicable cards; it remains secondary to review content.
- Avoid bouncing, perspective tilt, spotlighting, vivid gradients, or other attention-seeking motion.

## Motion and interaction

- Retain a single, seamless, right-to-left CSS marquee loop at a calm reading pace.
- Keep edge masks so cards fade gently at viewport edges.
- Pause the rail while hovered or while a card has keyboard focus.
- `prefers-reduced-motion: reduce` removes auto-scrolling and exposes a horizontal, snap-aligned review list.
- Motion stays decorative: review content remains fully available in semantic HTML and clone content stays hidden from assistive technology.

## Responsive behavior

- Desktop retains current 310px standard and 430px wide card proportions unless glass borders require minor padding compensation.
- Mobile continues to use one horizontal rail with approximately 80vw card width and touch scroll support in reduced-motion mode.
- No page-level horizontal overflow may be introduced.

## Verification

- Confirm all review content and ratings remain unchanged.
- Confirm glass surfaces are visible without reducing text contrast.
- Confirm loop is seamless and pause behavior works for hover and keyboard focus.
- Confirm reduced-motion fallback works and the document has no horizontal overflow at desktop or mobile widths.
