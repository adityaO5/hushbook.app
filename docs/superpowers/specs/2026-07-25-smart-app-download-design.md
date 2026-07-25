# Smart App Download Design

## Goal

Make every Android CTA usable now that HushBook is live on Google Play, and provide one permanent QR destination that sends mobile visitors to the correct store.

## Store URLs

- App Store: `https://apps.apple.com/us/app/hushbook-read-while-listening/id6783243597`
- Google Play: `https://play.google.com/store/apps/details?id=com.hushbook.hushbook`
- Universal QR destination: `https://hushbook.app/download`

## CTA Changes

- Replace both Google Play placeholder buttons with links to the live Google Play listing.
- Change CTA copy from “Coming soon on” to “Get it on”.
- Update the footer Google Play link.
- Remove the obsolete Android toast code and styles.

## Smart Download Route

Create `download.html`, exposed as `/download` through Vercel clean URLs.

On load:

- Android user agents redirect to Google Play.
- iPhone, iPod, and iPad user agents redirect to the App Store.
- iPadOS desktop mode is detected using Apple platform information plus touch capability.
- Desktop, bots, and unknown platforms remain on a store-choice page with both links.
- Mobile visitors also see both links immediately, so navigation still works if automatic redirection is blocked.

The page must include a clear heading, short status text, both store links, and a link back to the HushBook homepage. No third-party redirect or analytics service is required.

## QR Code

Regenerate `assets/img/qr-hushbook.svg` to encode `https://hushbook.app/download`.

The QR contains only the universal URL. Platform detection happens after the browser opens `/download`, allowing store destinations to change later without replacing the QR.

## Verification

- Confirm every Google Play CTA uses the live listing.
- Confirm `/download` redirects Android and Apple mobile user agents correctly.
- Confirm desktop users see both store options.
- Decode the generated QR and confirm its payload is exactly `https://hushbook.app/download`.
- Verify `/download` and the homepage return HTTP 200 locally and after deployment.
