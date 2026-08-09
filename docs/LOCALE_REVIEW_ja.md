# Locale back-translation review

Locale: `ja` (Japanese)  
Reviewer: Local-model draft pass; native-language reviewer not assigned  
Date: `2026-07-31`

## Meaning checks

- Scope completed: `ja/index.html` only. Source copy was processed locally; no site or legal text was transmitted outside workspace.
- Japanese product copy retains core intent: on-device transcription, no account/cloud upload, offline use after engine download, free core experience, optional Pro analytics, and accessibility support.
- Metadata, major image alt text, navigation aria labels, quote runtime text, animated phrase runtime text, and store-opening runtime text received Japanese draft copy.
- Back-translation, performed by local semantic review: “文字起こしはスマートフォン内で。クラウドには送信しません。” back-translates as “Transcription is on your smartphone. It is not sent to the cloud.” This preserves source privacy claim without adding a new guarantee.
- Back-translation, performed by local semantic review: “アカウントもログインも不要。” back-translates as “No account or sign-in is required.” This preserves source intent.
- Back-translation, performed by local semantic review: “Engine を一度ダウンロードすれば、機内でもトンネルでも、どこでも使えます。” back-translates as “After downloading the Engine once, it can be used on a plane, in a tunnel, or anywhere.” This preserves intended offline qualification.

## Required verdict

- [x] Local Japanese product-copy draft generated for index page.
- [ ] Product-copy review approved.
- [ ] Native-language review approved.
- [ ] Legal review approved for Privacy, Terms, Refunds, and Licenses.
- [ ] Zero-English QA passed, with only documented exceptions.
- [ ] Approved for routing and indexing.

Unresolved findings:

- `index.html`, several testimonials remain English; localized testimonial pass required.
- `index.html`, several descriptive image `alt` values remain English or mixed-language; localized alt pass required.
- `index.html`, remaining analytics/card caption and reading-companion copy remain English; localized copy pass required.
- `download.html`, `about.html`, `privacy-policy.html`, `terms-conditions.html`, `refund-policy.html`, and `licenses.html` have not yet been created for Japanese.
- All legal review remains pending. This private draft must not be routed or indexed.
