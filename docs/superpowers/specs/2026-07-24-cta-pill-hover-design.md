# CTA Pill Hover Design

## Goal

Replace cursor-following magnetic movement on download CTA pills with a restrained, professional hover response.

## Scope

- Remove the JavaScript pointer tracking applied to `.stores .pill`.
- Preserve the existing pill shape, typography, colors, and layout.
- Keep a subtle 2px upward lift with a refined shadow on hover.
- Use smooth 200ms easing for transform and shadow changes.
- Preserve the existing reduced-motion behavior and keyboard accessibility.
- Leave `.nav-cta` behavior unchanged because this request targets CTA pills.

## Interaction

At rest, CTA pills retain their current appearance. On hover-capable devices, a pill rises 2px and gains a controlled shadow without moving toward the pointer. On pointer exit, it returns smoothly to rest. Touch devices receive no hover-only movement.

## Verification

- Confirm hero and finale CTA pills no longer follow pointer position.
- Confirm hover lift and shadow remain smooth at desktop width.
- Confirm CTA links and Google Play toast still work.
- Confirm reduced-motion and mobile behavior remain stable.
