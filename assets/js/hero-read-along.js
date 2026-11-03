/* Hero read-along: a port of the reader in tools/mockups/scenes/ios-read-along, looping over
 * img.hra-shot from `startSeconds` to page 1's last word. Text: #hra-text; look: .hra- in
 * index.html. Reduced motion, a missing font or frame, or an error leave the static image. */
(function () {
'use strict';
const root = document.querySelector('.hra');
const data = document.getElementById('hra-text');
if (!root || !data || !document.fonts || !window.ResizeObserver) return;
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
if (reduce.matches) return;
const q = s => root.querySelector(s), live = q('.hra-live'), screen = q('.hra-screen'), frameImg = q('.hra-frame');
if (!live || !screen || !frameImg) return;
let T;
try { T = JSON.parse(data.textContent); } catch (e) { return; }
if (!T.paragraphs || !T.paragraphs.length) return;

// Pace: .19 s + .028 s a letter; pauses .42 (sentence), .30 (: ;), .17 (, dash), .12 (breaths).
let LETTER;
try { LETTER = new RegExp('[\\p{L}\\p{N}]', 'gu'); } catch (e) { LETTER = /[A-Za-z0-9\u00C0-\u024F]/g; }
const words = [];
T.paragraphs.forEach(p => p.split(' ').forEach(w => {
  if (w) words.push({ text: w, end: /[.!?]["\u2019\u201D)]*$/.test(w), breath: false });
}));
const flatText = words.map(w => w.text).join(' ');
(T.breaths || []).forEach(ph => {
  const at = flatText.indexOf(ph);
  if (at >= 0) words[flatText.slice(0, at + ph.length).split(' ').length - 1].breath = true;
});
const pause = w => w.end ? 0.42 : /[;:]["\u2019\u201D]*$/.test(w.text) ? 0.30 : /[,\u2014]["\u2019\u201D]*$/.test(w.text) ? 0.17 : w.breath ? 0.12 : 0;
const wStart = [], wEnd = [];
let clockT = 0;
words.forEach(w => {
  const say = 0.19 + 0.028 * (w.text.match(LETTER) || []).length;
  wStart.push(clockT); wEnd.push(clockT + say); clockT += say + pause(w);
});

// Reader lines: AlignmentPipeline.regroup, AlignmentConfig.reader (gaps 1400 ms, 180 chars).
const MAX_W = 24, MIN_W = 6, SOFT_W = 14;
const ms = s => Math.round(s * 1000);
const isSoft = c => c === ',' || c === ';' || c === ':';
function regroup() {
  const n = words.length, segs = [], out = [], merged = [];
  let runWords = 0, runChars = 0, cur = [];
  for (let i = 0; i < n; i++) {
    const text = words[i].text.trim(), last = text.slice(-1);
    runWords++; runChars += text.length + 1;
    let br = last === '.' || last === '!' || last === '?';
    if (i + 1 < n && ms(wStart[i + 1]) - ms(wEnd[i]) >= 1400) br = true;
    if (isSoft(last) && runWords >= SOFT_W) br = true;
    if (runChars >= 180 && runWords >= SOFT_W) br = true;
    cur.push(i);
    if (br) { segs.push(cur); cur = []; runWords = 0; runChars = 0; }
  }
  if (cur.length) segs.push(cur);
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const best = seg => {
    const mid = seg.length >> 1;
    let lo = clamp(mid - (MAX_W >> 1), 1, seg.length - 2), hi = clamp(mid + (MAX_W >> 1), 1, seg.length - 2);
    if (hi > MAX_W - 1) hi = MAX_W - 1;
    if (lo > hi) { lo = hi - (MAX_W >> 1); if (lo < 1) lo = 1; }
    let bi = mid > hi ? hi : mid, bs = -1;
    for (let i = lo; i <= hi; i++) {
      const score = ms(wStart[seg[i + 1]]) - ms(wEnd[seg[i]]) + (isSoft(words[seg[i]].text.trim().slice(-1)) ? 200 : 0);
      if (score > bs) { bs = score; bi = i; }
    }
    return bi;
  };
  segs.forEach(seg => {
    while (seg.length > MAX_W) { const c = best(seg); out.push(seg.slice(0, c + 1)); seg = seg.slice(c + 1); }
    if (seg.length) out.push(seg);
  });
  out.forEach(seg => {
    const prev = merged[merged.length - 1];
    if (prev && seg.length < MIN_W && prev.length + seg.length <= MAX_W) prev.push.apply(prev, seg);
    else merged.push(seg.slice());
  });
  const m = merged.length;
  if (m >= 2 && merged[m - 1].length < MIN_W && merged[m - 2].length + merged[m - 1].length <= MAX_W)
    merged[m - 2].push.apply(merged[m - 2], merged.pop());
  return merged;
}
const LINES = regroup();

// Page on a 393 x 852 iPhone: text 28 / 107 / 28 / 50, rows past y 634 narrowed to 265 by the lamp.
const TEXT_TOP = 59 + 48, PAGE_W = 393 - 56, PAGE_H = 852 - TEXT_TOP - 50;
const NOTCH_TOP = 852 - (34 + 16 + 64 + 4 + 48 + 4 + 48) - TEXT_TOP, NOTCH_W = 393 - 20 - 64 - 16 - 28;
const PAD = 10, CAP_ROW = 0.78 * 23 * 2.15, BLOCK_H = 4 + 15 + 16 + 1 + 28;

// playerChapterRoman in folio caps (locale-aware, so Turkish i caps dotted); the numeral is rubric.
const caps = s => s.toLocaleUpperCase(document.documentElement.lang || undefined);
const label = String(T.chapterLabel || ''), slot = label.indexOf('{numeral}');
const head = slot < 0 ? [caps(label), '', ''] : [caps(label.slice(0, slot)), String(T.chapterNumeral || ''), caps(label.slice(slot + 9))];
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

// The stage, built off screen so it measures without the fan's 3D tilt.
const icon = (size, box, body) => '<svg width="' + size + '" height="' + size + '" viewBox="0 0 ' + box + ' ' + box + '" fill="currentColor">' + body + '</svg>';
const PAUSE = '<path d="M128 405h85v-298h-85v298zm171-298v298h85v-298h-85z"/>';
const CHEVRON = '<path d="M76 325l166-169q7-7 14-7 8 0 15 7l166 169q5 4 5 14 0 8-5.5 14-5.5 6-13.5 6-9 0-14-6l-153-156-152 156q-5 6-14 6-8 0-14-6-6-6-6-14 0-9 6-14z"/>';
const PEN = '<path d="M9.3 11.4 3.8 16.9V20h8.7l2.8-2.8M20.8 12.4l-4.4 4.4a1.8 1.8 0 0 1-2.5 0l-5.2-5.2a1.8 1.8 0 0 1 0-2.5l4.4-4.4"/>';  // stroke: CSS
// Status bar icons: the scene's statusIcons().
const STATUS = '<rect x="0" y="8" width="3.2" height="4" rx="1"/><rect x="4.6" y="6" width="3.2" height="6" rx="1"/>' +
  '<rect x="9.2" y="3.6" width="3.2" height="8.4" rx="1"/><rect x="13.8" y="1" width="3.2" height="11" rx="1"/>' +
  '<path d="M30.65 11.6L28.32 9.27A3.3 3.3 0 0 1 32.98 9.27ZM27.11 8.06L25.7 6.65A7 7 0 0 1 35.6 6.65L34.19 8.06A5 5 0 0 0 27.11 8.06Z' +
  'M24.5 5.45L23.01 3.96A10.8 10.8 0 0 1 38.29 3.96L36.80 5.45A8.7 8.7 0 0 0 24.5 5.45Z"/>' +
  '<rect x="45.5" y=".5" width="25" height="12" rx="3.8" fill="none" stroke="currentColor" stroke-opacity=".35"/>' +
  '<rect x="47.5" y="2.5" width="21" height="8" rx="2"/><path d="M72 4.5c.9.3 1.5 1.1 1.5 2s-.6 1.7-1.5 2Z" fill-opacity=".4"/>';
const holder = document.createElement('div');
holder.className = 'hra-host';
const stage = document.createElement('div');
stage.className = 'hra-stage';
stage.innerHTML = '<div class="hra-pager"></div><div class="hra-pnum"></div>' +
  '<div class="hra-head"><div class="hra-hb hra-back"><span>\u2039</span></div>' +
  '<div class="hra-title"><span>' + esc(head[0]) + (head[1] ? '<b>' + esc(head[1]) + '</b>' : '') + esc(head[2]) + '</span></div>' +
  '<div class="hra-hb hra-aa"><span>' + esc(T.aaButton || '') + '</span></div>' +
  '<div class="hra-hb hra-mark">' + icon(24, 24, PEN) + '</div></div>' +
  '<div class="hra-handle">' + icon(18, 512, CHEVRON) + '</div>' +
  '<div class="hra-lamp"><div class="hra-disc"></div>' +
  '<svg class="hra-rings" width="66" height="66" viewBox="0 0 66 66"><circle cx="33" cy="33" r="30"/><path/></svg>' +
  '<div class="hra-core">' + icon(22, 512, PAUSE) + '</div></div>' +
  '<div class="hra-sbar"><div class="hra-sbtime">9:41</div><svg class="hra-sbicons" width="76" height="13" viewBox="0 0 76 13">' +
  '<g fill="currentColor">' + STATUS + '</g></svg></div><div class="hra-home"></div>';
const pager = stage.querySelector('.hra-pager');
const arc = stage.querySelector('.hra-rings path');

// Words split after hyphens ("ape-|descended" can wrap apart): wipe and now-rule go per fragment.
// Lines after the first open with an em-space (lyricsIndentPrefix).
let capLH = 28;
const frags = t => t.match(/[^-\u2010]*[-\u2010]+|[^-\u2010]+/g) || [t];
function wordHTML(i, cap) {
  return frags(words[i].text).map((t, k) => {
    const ch = cap && !k ? String.fromCodePoint(t.codePointAt(0)) : '';
    return '<span class="hra-f">' + (ch ? '<span class="hra-cap" style="line-height:' + capLH + 'px">' + esc(ch) + '</span>' : '') + esc(t.slice(ch.length)) + '</span>';
  }).join('');
}
function textHTML(idx, dropCap, indent) {
  return (indent && !dropCap ? '\u2003' : '') +
    idx.map((i, k) => '<span class="hra-w">' + wordHTML(i, dropCap && k === 0) + '</span>').join(' ');
}

// Pagination: lyrics_page_layout.dart paginateLyricsLines.
let meas = null;
function measure(idx, dropCap, width) {
  meas.style.width = width + 'px';
  meas.innerHTML = '<div class="hra-tx">' + textHTML(idx, dropCap, true) + '</div>';
  return meas.getBoundingClientRect().height + 2 * PAD;
}
function largestPrefix(ws, maxH, m, dropCap) {
  if (maxH <= 0 || ws.length < 2) return null;
  const h = c => m(ws.slice(0, c), dropCap);
  const fh = h(1);
  if (fh > maxH) return null;
  let lo = 1, loH = fh, hi = ws.length - 1;
  while (lo < hi) { const mid = (lo + hi + 1) >> 1, mh = h(mid); if (mh <= maxH) { lo = mid; loH = mh; } else hi = mid - 1; }
  return { count: lo, h: loH };
}
function paginate() {
  const wide = (l, d) => measure(l, d, PAGE_W), narrowM = (l, d) => measure(l, d, NOTCH_W);
  const pages = [];
  let current = [], used = 0, curDrop = false, lineBase = 0, curNarrow = null, curJoined = false;
  const hasBlock = () => pages.length === 0;
  const budget = () => hasBlock() ? Math.max(0, PAGE_H - BLOCK_H) : PAGE_H;
  const occupied = () => current.length > 0 || hasBlock();
  const firstUnplaced = () => lineBase === 0 && current.length === 0;
  const top = () => (hasBlock() ? BLOCK_H : 0) + used;
  const fit = (line, dropCap, joined) => {
    if (!joined && curNarrow === null) { const full = wide(line, dropCap); if (top() + full - PAD <= NOTCH_TOP) return { h: full, narrow: false }; }
    const nh = narrowM(line, dropCap);
    return { h: joined ? Math.max(1, nh - PAD) : nh, narrow: true };
  };
  const place = (line, h, narrow, joined) => {
    if (!current.length) curDrop = firstUnplaced();
    if (narrow && curNarrow === null) { curNarrow = current.length; curJoined = !!joined; }
    current.push(line); used += h;
  };
  const finish = () => {
    if (!occupied()) return;
    pages.push({ lines: current, hasDropCap: curDrop, narrowFrom: curNarrow, joined: curJoined });
    lineBase += current.length; current = []; used = 0; curDrop = false; curNarrow = null; curJoined = false;
  };
  LINES.forEach(src => {
    let rem = src, joined = false;
    while (rem.length) {
      const dropCap = firstUnplaced(), remH = budget() - used;
      if (occupied() && remH <= 0) { finish(); joined = false; continue; }
      const cf = fit(rem, dropCap, joined);
      if (cf.narrow && curNarrow === null && !joined) {
        const room = NOTCH_TOP - top() + PAD;
        const lead = room > 0 ? largestPrefix(rem, Math.min(room, remH + PAD), wide, dropCap) : null;
        if (lead) {
          const leadH = Math.max(1, lead.h - PAD), rest = rem.slice(lead.count);
          if (Math.max(1, narrowM([rest[0]], false) - PAD) <= remH - leadH) { place(rem.slice(0, lead.count), leadH, false, false); rem = rest; joined = true; continue; }
        }
      }
      if (cf.h <= remH) { place(rem, cf.h, cf.narrow, joined); break; }
      const fitting = largestPrefix(rem, remH, (l, d) => fit(l, d, joined).h, dropCap);
      if (!fitting) {
        if (!occupied()) { place(rem, cf.h, cf.narrow, joined); break; }
        finish(); joined = false; continue;
      }
      const piece = rem.slice(0, fitting.count);
      place(piece, fitting.h, fit(piece, dropCap, joined).narrow, joined);
      rem = rem.slice(fitting.count);
      if (rem.length) { finish(); joined = false; }
    }
  });
  finish();
  // Page 1's lines; joined pieces light up together.
  const pg = pages[0], nf = pg.narrowFrom;
  const lines = pg.lines.map((idx, k) => {
    const joinAbove = pg.joined && nf !== null && k === nf;
    return { idx, cap: pg.hasDropCap && k === 0, start: wStart[idx[0]], joinAbove, joinBelow: pg.joined && nf !== null && k === nf - 1,
      indent: k > 0 && !joinAbove, narrow: nf !== null && k >= nf };
  });
  return { pages: pages.length, lines };
}

// Karaoke: narrated line near, others far (180 ms fade), spoken words in ink, the current word
// wiped, the now-rule under the newest. Writes only what changed.
const easeOutCubic = p => 1 - Math.pow(1 - Math.max(0, Math.min(1, p)), 3);
let F = [], INK = '', FAR = 0, NEAR = 0, wipeWord = -1, wipes = [], ends = [], lineEls = [], spans = [];
const lineCol = [], wordCls = [], wordNow = [], touched = new Set();
const lineColor = x => 'rgba(' + INK + ',' + (1 - (1 - FAR * (1 - x)) * (1 - NEAR * x)).toFixed(4) + ')';
function setLine(n, color) {
  if (lineCol[n] !== color) { lineEls[n].style.color = color; lineCol[n] = color; }
}
function setWord(i, cls, nowA) {
  const s = spans[i];
  if (wordCls[i] !== cls) { s.className = cls; wordCls[i] = cls; }
  if (wordNow[i] !== nowA) {
    if (nowA) s.style.setProperty('--hra-now-a', nowA); else s.style.removeProperty('--hra-now-a');
    wordNow[i] = nowA;
  }
}
// The wipe: a full-ink copy of each fragment, clipped at its width share of `frac`.
function setWipe(i, frac) {
  if (i !== wipeWord) {
    wipes.forEach(w => w.parentNode.removeChild(w));
    wipeWord = i;
    const fs = i < 0 ? [] : Array.from(spans[i].children), all = fs.reduce((s, f) => s + f.offsetWidth, 0) || 1;
    let acc = 0;
    ends = fs.map(f => (acc += f.offsetWidth) / all);
    wipes = fs.map(f => {
      const w = document.createElement('span');
      w.className = 'hra-wipe';
      w.innerHTML = f.innerHTML;
      return f.appendChild(w);
    });
  }
  wipes.forEach((w, k) => {
    const a = k ? ends[k - 1] : 0, p = Math.max(0, Math.min(1, (frac - a) / (ends[k] - a || 1)));
    w.style.webkitClipPath = w.style.clipPath = 'inset(-40px ' + ((1 - p) * 100).toFixed(2) + '% -12px 0)';
  });
}
function paint(li, pos) {
  const group = li < 0 ? [] : [li].concat(F[li].joinAbove ? [li - 1] : [], F[li].joinBelow ? [li + 1] : []);
  const gStart = li < 0 ? 0 : Math.min.apply(null, group.map(n => F[n].start));
  const act = li < 0 ? 0 : easeOutCubic((pos - gStart) / 0.18);
  const want = new Map();
  group.forEach(n => want.set(n, act));
  // The line just left fades from near to far over 180 ms.
  const prev = li > 0 ? Math.min.apply(null, group) - 1 : -1;
  if (prev >= 0 && pos - gStart < 0.18) {
    const x = 1 - easeOutCubic((pos - gStart) / 0.18);
    want.set(prev, x);
    if (F[prev].joinAbove) want.set(prev - 1, x);
  }
  touched.forEach(n => {
    if (want.has(n)) return;
    setLine(n, '');
    F[n].idx.forEach(i => setWord(i, 'hra-w', ''));
    touched.delete(n);
  });
  let cur = -1, curFrac = 0;
  want.forEach((x, n) => {
    setLine(n, lineColor(x));
    touched.add(n);
    const active = group.indexOf(n) >= 0, idx = F[n].idx;
    let newest = -1, c = -1;
    for (let k = 0; k < idx.length; k++) if (wStart[idx[k]] <= pos) newest = k;
    if (active && newest >= 0 && pos < wEnd[idx[newest]]) {
      c = newest; cur = idx[c];
      curFrac = (pos - wStart[cur]) / (wEnd[cur] - wStart[cur]);
    }
    idx.forEach((i, k) => {
      const now = active && k === newest;
      setWord(i, 'hra-w' + (active && k <= newest && k !== c ? ' hra-sp' : '') + (now ? ' hra-now' : ''), now ? act.toFixed(3) : '');
    });
  });
  setWipe(cur, curFrac);
}

// One frame at chapter position `pos` (s).
let LEN = 1, lastArc = '';
function render(pos) {
  let lo = 0, hi = F.length - 1;
  while (lo < hi) { const m = (lo + hi + 1) >> 1; if (F[m].start <= pos) lo = m; else hi = m - 1; }
  paint(F[lo].start <= pos ? lo : -1, pos);
  const sweep = 2 * Math.PI * Math.min(1, Math.max(0, pos / LEN));
  const d = 'M33 3A30 30 0 ' + (sweep > Math.PI ? 1 : 0) + ' 1 ' + (33 + 30 * Math.sin(sweep)).toFixed(2) + ' ' + (33 - 30 * Math.cos(sweep)).toFixed(2);
  if (d !== lastArc) { arc.setAttribute('d', d); lastArc = d; }
}

let START = 0, END = 0, pos = 0;
function build() {
  document.body.appendChild(holder);
  holder.appendChild(stage);
  const css = getComputedStyle(stage), v = k => css.getPropertyValue('--hra-' + k).trim();
  INK = v('ink-rgb'); FAR = +v('far-a'); NEAR = +v('near-a');
  if (!INK || !(FAR > 0) || !(NEAR > 0)) throw new Error('no .hra- styles');
  meas = document.createElement('div');
  meas.className = 'hra-ln hra-meas';
  meas.style.width = PAGE_W + 'px';
  stage.appendChild(meas);
  // Drop cap row: .78 x 49.45 px; calibrate the cap's line height.
  const first = words[0].text, capCh = String.fromCodePoint(first.codePointAt(0));
  meas.innerHTML = '<div class="hra-tx"><span class="hra-cap" style="line-height:28px">' + esc(capCh) + '</span>' +
    esc(first.slice(capCh.length, capCh.length + 1)) + '</div>';
  capLH = 28 + 2 * (CAP_ROW - meas.getBoundingClientRect().height);
  const L = paginate();
  stage.removeChild(meas);
  F = L.lines;
  let html = '<div class="hra-pbox"><div class="hra-blk"><div class="hra-label">' + esc(head.join('')) + '</div><div class="hra-rule"></div></div>';
  let narrowOpen = false;
  F.forEach(f => {
    if (f.narrow && !narrowOpen) { html += '<div class="hra-narrow">'; narrowOpen = true; }
    html += '<div class="hra-ln" style="padding:' + (f.joinAbove ? 0 : PAD) + 'px 0 ' + (f.joinBelow ? 0 : PAD) + 'px">' +
      '<div class="hra-tx">' + textHTML(f.idx, f.cap, f.indent) + '</div></div>';
  });
  pager.innerHTML = html + (narrowOpen ? '</div>' : '') + '</div>';
  // Page 1 holds words 0.. and lines 0.. in document order.
  spans = Array.from(pager.querySelectorAll('.hra-w'));
  lineEls = Array.from(pager.querySelectorAll('.hra-ln'));
  stage.querySelector('.hra-pnum').textContent = '1 / ' + L.pages;
  LEN = +T.chapterSeconds > 0 ? +T.chapterSeconds : 1;
  // Loop from the static frame's moment to the page's last word plus a breath.
  const lastIdx = F[F.length - 1].idx;
  END = wEnd[lastIdx[lastIdx.length - 1]] + 1.2;
  START = +T.startSeconds;
  if (!(START >= 0 && START < END - 2)) START = 0;
  pos = START;
  render(pos);
  screen.appendChild(stage);
  document.body.removeChild(holder);
}

// Scale to the slot, fade in on the static frame's moment, play.
let raf = 0, last = 0, holdUntil = 0, shown = false, visible = true, xfTimer = 0;
function frame(now) {
  if (!visible || reduce.matches) { raf = 0; return; }
  raf = requestAnimationFrame(frame);
  const dt = last ? Math.min(0.1, (now - last) / 1000) : 0;
  last = now;
  if (now < holdUntil) return;
  pos += dt;
  if (pos >= END) {
    pos = START + (pos - END);
    stage.classList.add('hra-xf');  // cross-fade back to the opening frame
    clearTimeout(xfTimer);
    xfTimer = setTimeout(() => stage.classList.remove('hra-xf'), 450);
  }
  render(pos);
}
function play() {
  if (shown && visible && !raf) { last = 0; raf = requestAnimationFrame(frame); }
}
function show() {
  if (!shown) requestAnimationFrame(() => { live.classList.add('hra-on'); holdUntil = performance.now() + 700; play(); });
  shown = true;
}

const sample = T.paragraphs.join(' ') + head.join('') + (T.aaButton || '') + '\u2039 0123456789/';
const fonts = Promise.all([
  document.fonts.load('400 23px HRANews', sample),
  document.fonts.load('600 17px HRAInter', '9:41'),
]).then(r => { if (!r[0].length || !r[1].length) throw new Error('no font'); });
const frameLoaded = new Promise((resolve, reject) => {
  frameImg.onload = resolve;
  frameImg.onerror = () => reject(new Error('no frame'));
  frameImg.src = frameImg.getAttribute('data-src');
}).then(() => frameImg.decode().catch(() => {}));

Promise.all([fonts, frameLoaded]).then(() => {
  build();
  new ResizeObserver(entries => {
    const r = entries[entries.length - 1].contentRect, w = r.width, h = r.height;
    if (!w || !h) return;
    const z = Math.max(w / 393, h / 852);
    stage.style.transform = 'translate(' + ((w - 393 * z) / 2).toFixed(3) + 'px,0) scale(' + z.toFixed(5) + ')';
    show();
  }).observe(screen);
  new IntersectionObserver(entries => { visible = entries[entries.length - 1].isIntersecting; play(); }).observe(root);
}).catch(err => {
  if (holder.parentNode) holder.parentNode.removeChild(holder);
  console.warn('hero read-along stays static:', err && err.message);
});
})();
