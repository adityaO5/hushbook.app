# CTA Pill Hover Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace cursor-following CTA pill movement with a restrained 2px hover lift and refined shadow.

**Architecture:** Keep CTA interactions CSS-only. Remove the magnetic pointer-tracking script from both store pills and the navigation download CTA.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript

## Global Constraints

- Preserve pill shape, typography, colors, layout, links, and Google Play toast.
- Use 200ms easing for pill transform and shadow.
- Keep the existing 2px upward hover lift.
- Remove `.nav-cta` magnetic behavior while preserving its CSS hover lift.
- Preserve reduced-motion and touch behavior.

---

### Task 1: Refine CTA pill hover

**Files:**
- Modify: `index.html:78-85`
- Modify: `index.html:1079-1087`

**Interfaces:**
- Consumes: Existing `.pill`, `.stores .pill`, `.nav-cta`, `fine`, and `calm` selectors/flags.
- Produces: CSS-only hover behavior for store pills and `.nav-cta`.

- [ ] **Step 1: Record failing source checks**

Confirm current source contains `transition:transform .25s,box-shadow .25s` and `querySelectorAll('.stores .pill,.nav-cta')`.

- [ ] **Step 2: Run checks and verify old behavior exists**

Run:

```powershell
rg -n "transition:transform \.25s,box-shadow \.25s|querySelectorAll\('\.stores \.pill,\.nav-cta'\)" index.html
```

Expected: Both old patterns are reported.

- [ ] **Step 3: Apply minimal implementation**

Change pill transition to:

```css
transition:transform .2s cubic-bezier(.2,.7,.2,1),box-shadow .2s cubic-bezier(.2,.7,.2,1)
```

Remove the magnetic pointer-tracking block:

```js
if(fine&&!calm)document.querySelectorAll('.stores .pill,.nav-cta').forEach(el=>{
  // pointermove and pointerleave handlers
});
```

- [ ] **Step 4: Run source checks**

Run:

```powershell
rg -n "transition:transform \.2s cubic-bezier\(\.2,\.7,\.2,1\),box-shadow \.2s cubic-bezier\(\.2,\.7,\.2,1\)" index.html
rg -n "magnetic buttons|querySelectorAll\('\.stores \.pill,\.nav-cta'\)|querySelectorAll\('\.nav-cta'\)" index.html
```

Expected: New pill transition found; magnetic comment and selectors absent.

- [ ] **Step 5: Review in browser**

Serve repository root, open `http://localhost:8000`, and verify:

- Hero and finale pills lift 2px without following pointer.
- Shadows transition smoothly.
- App Store CTA opens its existing URL.
- Google Play CTA still shows its toast.
- Navigation CTA uses only its subtle CSS hover lift.

- [ ] **Step 6: Commit**

```powershell
git add index.html docs/superpowers/plans/2026-07-25-cta-pill-hover.md
git commit -m "fix: refine CTA pill hover"
```
