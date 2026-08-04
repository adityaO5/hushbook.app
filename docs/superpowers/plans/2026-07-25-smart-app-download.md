# Smart App Download Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Link every Android CTA to Google Play and add a universal `/download` destination for the site QR code.

**Architecture:** Use direct store links for visible CTAs. Add a standalone static `download.html` page that detects mobile platforms in-browser, redirects them with `location.replace`, and retains both store links as a no-script/unknown-platform fallback.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, SVG QR code

## Global Constraints

- App Store URL: `https://apps.apple.com/us/app/hushbook-read-while-listening/id6783243597`
- Google Play URL: `https://play.google.com/store/apps/details?id=com.hushbook.hushbook`
- Universal QR URL: `https://hushbook.app/download`
- No third-party redirect or analytics service.
- Preserve existing CTA visual styling and accessibility.

---

### Task 1: Activate Android links

**Files:**
- Modify: `index.html`

**Interfaces:**
- Consumes: Existing `.pill` CTA styling and footer store links.
- Produces: Direct Google Play links with accessible labels.

- [ ] Replace both Google Play placeholder buttons with anchors using the live URL and “Get it on” copy.
- [ ] Update footer Google Play link.
- [ ] Remove obsolete toast CSS and `showAndroidToast` JavaScript.
- [ ] Verify no “Coming soon” copy, toast handler, or placeholder Google Play href remains.

### Task 2: Add smart download page

**Files:**
- Create: `download.html`

**Interfaces:**
- Consumes: Browser `navigator.userAgent`, `navigator.platform`, and `navigator.maxTouchPoints`.
- Produces: Android/App Store redirects plus manual store-choice fallback.

- [ ] Build branded responsive page with both store links and homepage link.
- [ ] Add platform classifier:

```js
function getStoreTarget(userAgent, platform, maxTouchPoints) {
  if (/android/i.test(userAgent)) return PLAY_STORE_URL;
  const appleMobile = /iPhone|iPad|iPod/i.test(userAgent);
  const iPadDesktop = /Mac/i.test(platform) && maxTouchPoints > 1;
  if (appleMobile || iPadDesktop) return APP_STORE_URL;
  return null;
}
```

- [ ] Redirect known mobile platforms with `location.replace`.
- [ ] Keep manual links visible and provide a `<noscript>` explanation.

### Task 3: Regenerate and validate QR

**Files:**
- Modify: `assets/img/qr-hushbook.svg`

**Interfaces:**
- Consumes: Exact URL `https://hushbook.app/download`.
- Produces: Scannable SVG QR used by `index.html`.

- [ ] Generate SVG QR from exact universal URL.
- [ ] Decode QR and assert exact payload.
- [ ] Verify homepage still references `assets/img/qr-hushbook.svg`.

### Task 4: Verify locally

**Files:**
- Test: `index.html`
- Test: `download.html`

- [ ] Confirm homepage and `/download` return HTTP 200.
- [ ] Test Android user agent redirects to Google Play.
- [ ] Test iPhone and iPadOS desktop-mode inputs resolve to App Store.
- [ ] Test desktop remains on page with both store links.
- [ ] Run `git diff --check` and inspect final diff.
