// The read-along card from the App Store search asset (app-store-header/src/search/readalong:
// ReadAlongCard.tsx + read-along-card-model.ts), ported to plain DOM: the Folio page as shipped,
// the running head, live karaoke over Chapter I of The Hound of the Baskervilles, the page turn
// and the lamp. Light uses LyricsTheme.light, dark LyricsTheme.dark (FolioTokens.forTheme).
// Lengths are the app's dp; the card shows an 850 x 500 dp landscape window.
(function () {
  var E = window.HBEase;

  // ─── Window and type (dp) ──────────────────────────────────────────────────
  var WINDOW = { w: 850, h: 500 };
  var TEXT_SCALE = 50 / 23, CHROME_TEXT_SCALE = Math.min(TEXT_SCALE, 1.4);
  var READING = { size: 23, height: 1.5, padV: 10, minSide: 28, columnEms: 31, tracking: .25 };
  var READ_SIZE = READING.size * TEXT_SCALE, READ_LINE = READ_SIZE * READING.height;
  var INSETS = { top: 48, bottomReading: 16 + 94 };
  var SIDE = Math.max(READING.minSide, (WINDOW.w - READING.columnEms * READ_SIZE) / 2);
  var COLUMN = { left: SIDE, width: WINDOW.w - 2 * SIDE, top: INSETS.top, height: WINDOW.h - INSETS.top - INSETS.bottomReading };
  var FONT = '"HB Newsreader"', METRICS = { ascent: 1470 / 2000 };
  var FEATURES = '"kern" 1, "liga" 1', CASE_FEATURES = '"case" 1, "kern" 1, "liga" 1';
  var TYPE = {
    head: { size: 11, tracking: .085 * 11, height: 1.3, weight: 500, numeralWeight: 700 },
    back: { glyph: '‹', size: 36, weight: 380, padStart: 9, padBottom: 6, tracking: .25 },
    aa: { text: 'Aa', size: 19, weight: 450, tracking: -.19, maxScale: 1.4 },
    mark: { text: 'MARK', size: 12, weight: 500, tracking: .12 * 12, height: 1.25, maxScale: 2 }
  };
  var HEAD = { row: 48, edgePad: 4, side: 96, minSide: 52, button: 48 };
  var MARK = { icon: 24, wordStart: 8, wordGap: 6, wordEnd: 10 };
  var MARK_PEN = ['M9.3 11.4 3.8 16.9V20h8.7l2.8-2.8', 'M20.8 12.4l-4.4 4.4a1.8 1.8 0 0 1-2.5 0l-5.2-5.2a1.8 1.8 0 0 1 0-2.5l4.4-4.4'];
  var LAMP = { size: 64, core: 42, glyph: 22, end: 20, bottom: 16, ringBox: 66, ringR: 30, ringStroke: 3,
    handle: { target: 48, gap: 4, w: 40, h: 26, radius: 13, icon: 18 } };
  var PAUSE = 'M12 10 H20 V38 H12 Z M28 10 H36 V38 H28 Z';
  var CHEVRON = { path: 'M6 121 172 290Q179 297 186 297Q194 297 201 290L367 121Q372 117 372 107Q372 99 366.5 93Q361 87 353 87Q344 87 339 93L186 249L34 93Q29 87 20 87Q12 87 6 93Q0 99 0 107Q0 116 6 121Z',
    upm: 512, advance: 372, baseline: ((1 - (454 + 74) / 512) / 2 + 454 / 512) * 512 };
  var HEAD_TITLE = { numeral: 'I', rest: ' · MR. SHERLOCK HOLMES' };
  var NOW_RULE = { stroke: 2, below: 1 };
  var ACTIVATION_S = .18, PAGE_TURN_S = .32;
  var CARD = { w: 358, radius: 22 };

  // ─── Colours (FolioTokens.forTheme) ────────────────────────────────────────
  function rgb(hex) { var n = parseInt(hex.slice(1), 16); return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255]; }
  function css(c, a) { return 'rgba(' + Math.round(c[0] * 255) + ',' + Math.round(c[1] * 255) + ',' + Math.round(c[2] * 255) + ',' + (a == null ? 1 : a) + ')'; }
  function lum(c) { var l = function (v) { return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }; return .2126 * l(c[0]) + .7152 * l(c[1]) + .0722 * l(c[2]); }
  function ratio(a, b) { var x = lum(a), y = lum(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); }
  function lowestAlpha(fg, bg, r) {
    for (var step = 40; step <= 100; step++) {
      var a = step / 100, mix = [0, 1, 2].map(function (i) { return a * fg[i] + (1 - a) * bg[i]; });
      if (ratio(mix, bg) >= r) return a;
    }
    return 1;
  }
  function folio(dark) {
    var ink = rgb(dark ? '#F2F0EA' : '#252421'), page = rgb(dark ? '#121315' : '#F7F6F2');
    return {
      page: css(page), ink: css(ink),
      near: css(ink, lowestAlpha(ink, page, 10.5)), far: css(ink, lowestAlpha(ink, page, 6.3)),
      secondary: dark ? '#C7C4BE' : '#625F59', rubric: dark ? '#E46A4F' : '#C4402B',
      glyph: dark ? '#141416' : css(page), dock: dark ? '#222326' : '#FFFDF9',
      hairline: css(ink, dark ? .14 : .11), track: css(ink, dark ? .20 : .16),
      dockShadow: dark ? [[18, 44, 'rgba(0,0,0,.5)'], [2, 8, 'rgba(0,0,0,.35)']]
        : [[14, 36, 'rgba(60,40,20,.12)'], [2, 6, 'rgba(60,40,20,.07)']],
      handleShadow: [[4, 12, dark ? 'rgba(0,0,0,.4)' : 'rgba(0,0,0,.14)']],
      cardShadow: dark ? [[1, 2, 'rgba(0,0,0,.4)'], [10, 26, 'rgba(0,0,0,.45)']]
        : [[1, 2, 'rgba(60,40,20,.05)'], [10, 26, 'rgba(60,40,20,.08)']]
    };
  }

  // ─── Transcript (the deck's chapter I, its timing, AlignmentConfig.reader) ─
  var PARAGRAPHS = [
    'Mr. Sherlock Holmes, who was usually very late in the mornings, save upon those not infrequent occasions when he was up all night, was seated at the breakfast table.',
    'I stood upon the hearth-rug and picked up the stick which our visitor had left behind him the night before.',
    'It was a fine, thick piece of wood, bulbous-headed, of the sort which is known as a “Penang lawyer.” Just under the head was a broad silver band nearly an inch across.',
    '“To James Mortimer, M.R.C.S., from his friends of the C.C.H.,” was engraved upon it, with the date “1884.” It was just such a stick as the old-fashioned family practitioner used to carry — dignified, solid, and reassuring.',
    '“Well, Watson, what do you make of it?”',
    'Holmes was sitting with his back to me, and I had given him no sign of my occupation.',
    '“How did you know what I was doing? I believe you have eyes in the back of your head.”',
    '“I have, at least, a well-polished, silver-plated coffee-pot in front of me,” said he. “But, tell me, Watson, what do you make of our visitor’s stick?”',
    '“Since we have been so unfortunate as to miss him and have no notion of his errand, this accidental souvenir becomes of importance. Let me hear you reconstruct the man by an examination of it.”'
  ];
  var WORDS = [], FIRST_OF = [];
  (function () {
    var t = 652000;
    PARAGRAPHS.forEach(function (p) {
      FIRST_OF.push(WORDS.length);
      p.split(/\s+/).forEach(function (w) {
        var dur = 170 + 42 * (w.replace(/[^A-Za-z0-9]/g, '').length || 1);
        WORDS.push({ w: w, s: t, e: t + dur });
        t += dur + 40;
        if (/[,;:—]$/.test(w) || /[,;:]["”’]$/.test(w)) t += 220;
        if (/[.?!]["”’]?$/.test(w)) t += 420;
      });
      t += 650;
    });
  })();
  var SPEED = 1.25;

  function regroup(words) {
    var n = words.length, breaks = [], runWords = 0, runChars = 0, i;
    for (i = 0; i < n; i++) {
      var text = words[i].w.trim(), last = text.slice(-1);
      runWords++; runChars += text.length + 1;
      var cut = i + 1 < n && words[i + 1].s - words[i].e >= 1400;
      if ('.!?'.indexOf(last) >= 0) cut = true;
      if (',;:'.indexOf(last) >= 0 && runWords >= 14) cut = true;
      if (runChars >= 180 && runWords >= 14) cut = true;
      breaks[i] = cut;
      if (cut) { runWords = 0; runChars = 0; }
    }
    var segments = [], cur = [];
    for (i = 0; i < n; i++) { cur.push(i); if (breaks[i]) { segments.push(cur); cur = []; } }
    if (cur.length) segments.push(cur);
    function bestSplit(seg) {
      var mid = Math.floor(seg.length / 2), cl = function (v) { return Math.min(Math.max(v, 1), seg.length - 2); };
      var lo = cl(mid - 12), hi = cl(mid + 12);
      if (hi > 23) hi = 23;
      if (lo > hi) lo = Math.max(1, hi - 12);
      var best = mid > hi ? hi : mid, score = -1;
      for (var k = lo; k <= hi; k++) {
        var sc = words[seg[k + 1]].s - words[seg[k]].e + (',;:'.indexOf(words[seg[k]].w.trim().slice(-1)) >= 0 ? 200 : 0);
        if (sc > score) { score = sc; best = k; }
      }
      return best;
    }
    var capped = [];
    segments.forEach(function (seg) {
      var rest = seg;
      while (rest.length > 24) { var c = bestSplit(rest); capped.push(rest.slice(0, c + 1)); rest = rest.slice(c + 1); }
      if (rest.length) capped.push(rest);
    });
    segments = [];
    capped.forEach(function (seg) {
      var last = segments[segments.length - 1];
      if (last && seg.length < 6 && last.length + seg.length <= 24) Array.prototype.push.apply(last, seg);
      else segments.push(seg.slice());
    });
    var L = segments.length;
    if (L >= 2 && segments[L - 1].length < 6 && segments[L - 2].length + segments[L - 1].length <= 24) {
      Array.prototype.push.apply(segments[L - 2], segments.pop());
    }
    return segments;
  }
  var LINES = regroup(WORDS);

  function wordIn(p, text) {
    var to = p + 1 < FIRST_OF.length ? FIRST_OF[p + 1] : WORDS.length;
    for (var i = FIRST_OF[p]; i < to; i++) if (WORDS[i].w === text) return i;
    throw new Error('read-along passage: no ' + text);
  }
  var PASSAGE = { pageFrom: wordIn(3, 'dignified,'), from: wordIn(4, '“Well,'), to: wordIn(6, 'doing?') };
  var FROM_MS = WORDS[PASSAGE.from].s, TO_MS = WORDS[PASSAGE.to].e, PRE_MS = FROM_MS - 1;
  var CLIP_S = (TO_MS - FROM_MS) / 1000 / SPEED;
  function clipS(ms) { return (ms - FROM_MS) / 1000 / SPEED; }
  function positionAt(t) { return t <= 0 ? PRE_MS : Math.min(TO_MS, FROM_MS + t * 1000 * SPEED); }

  // ─── Pages (lyrics_page_layout.dart) ───────────────────────────────────────
  function wrap(words, indent, maxWidth, measure) {
    var space = measure(' '), placed = [], line = 0, x = indent ? READ_SIZE + READING.tracking : 0, has = false;
    words.forEach(function (i) {
      var w = measure(WORDS[i].w);
      if (has && x + w > maxWidth + .01) { line++; x = 0; }
      placed.push({ i: i, x: x, w: w, line: line });
      x += w + space;
      has = true;
    });
    return { placed: placed, lines: line + 1 };
  }
  function measureLine(words, measure) { return READING.padV * 2 + wrap(words, true, COLUMN.width, measure).lines * READ_LINE; }

  function layoutPages(measure) {
    var source = [];
    LINES.forEach(function (line) {
      var w = line.filter(function (i) { return i >= PASSAGE.pageFrom; });
      if (w.length) source.push(w);
    });
    var pages = [], current = [], used = 0;
    function finish() { if (current.length) pages.push(current); current = []; used = 0; }
    source.forEach(function (line) {
      var rest = line;
      while (rest.length) {
        var remaining = COLUMN.height - used;
        if (current.length && remaining <= 0) { finish(); continue; }
        var whole = measureLine(rest, measure);
        if (whole <= remaining) { current.push(rest); used += whole; break; }
        var fit = 0, fitH = 0;
        for (var count = 1; count < rest.length; count++) {
          var h = measureLine(rest.slice(0, count), measure);
          if (h > remaining) break;
          fit = count; fitH = h;
        }
        if (fit === 0) {
          if (!current.length) { current.push(rest); used += whole; break; }
          finish(); continue;
        }
        current.push(rest.slice(0, fit)); used += fitH; rest = rest.slice(fit); finish();
      }
    });
    finish();
    var last = -1;
    pages.forEach(function (page, p) { if (last < 0 && page.some(function (w) { return w.indexOf(PASSAGE.to) >= 0; })) last = p; });
    var pieces = [];
    pages.slice(0, last + 1).forEach(function (page, p) {
      var top = 0;
      page.forEach(function (words, k) {
        var r = wrap(words, k > 0, COLUMN.width, measure);
        pieces.push({ words: words, page: p, top: top, placed: r.placed, lines: r.lines });
        top += READING.padV * 2 + r.lines * READ_LINE;
      });
    });
    return pieces;
  }

  // ─── Karaoke (lyrics_karaoke.dart) ─────────────────────────────────────────
  function karaoke(words, pos) {
    var newest = -1, i;
    for (i = 0; i < words.length; i++) {
      var s = words[i].s;
      if (s <= pos && (newest < 0 || s > words[newest].s || (s === words[newest].s && i > newest))) newest = i;
    }
    if (newest < 0) return { completed: {}, any: false, current: null, fraction: 0 };
    var cur = words[newest], completed = {}, any = false;
    for (i = 0; i < words.length; i++) {
      var w = words[i];
      if (w.s > pos) continue;
      if (w.e <= pos || w.s < cur.s || (w.s === cur.s && i < newest)) { completed[i] = true; any = true; }
    }
    if (pos >= cur.e) { completed[newest] = true; return { completed: completed, any: true, current: null, fraction: 0 }; }
    return { completed: completed, any: true, current: newest, fraction: (pos - cur.s) / (cur.e - cur.s) };
  }
  function nowWord(words, pos) {
    var newest = -1;
    for (var i = 0; i < words.length; i++) if (words[i].s <= pos && (newest < 0 || words[i].s >= words[newest].s)) newest = i;
    return newest < 0 ? null : newest;
  }

  // ─── Follow: the narrated line, page turns, line fades (synced_lyrics_view.dart) ─
  function followAt(pieces, t) {
    var tNow = Math.max(t, clipS(PRE_MS)), pos = positionAt(t);
    var starts = pieces.map(function (p) { return clipS(WORDS[p.words[0]].s); });
    function activeAt(time) { var idx = -1; starts.forEach(function (s, i) { if (s <= time) idx = i; }); return idx; }
    var active = activeAt(clipS(pos)), startIdx = activeAt(clipS(PRE_MS));
    var initial = startIdx >= 0 ? pieces[startIdx].page : 0, turns = [], page = initial;
    starts.forEach(function (s, i) { if (i > startIdx && pieces[i].page !== page) { page = pieces[i].page; turns.push({ at: s, to: page }); } });
    function pagePosAt(time) {
      var run = null;
      function along(r, at) { return r.from + (r.to - r.from) * E.outCubic(E.clamp((at - r.at) / PAGE_TURN_S, 0, 1)); }
      for (var k = 0; k < turns.length; k++) {
        if (turns[k].at > time) break;
        run = { at: turns[k].at, from: run ? along(run, turns[k].at) : initial, to: turns[k].to };
      }
      return run ? along(run, time) : initial;
    }
    var activation = pieces.map(function (piece, i) {
      var start = starts[i], end = i + 1 < starts.length ? starts[i + 1] : Infinity;
      if (start > tNow) return 0;
      var mounted = Math.abs(piece.page - pagePosAt(start - 1e-6)) < 1;
      function litAt(time) { return mounted ? E.outCubic(E.clamp((time - start) / ACTIVATION_S, 0, 1)) : 1; }
      if (tNow < end) return litAt(tNow);
      var from = litAt(end), dur = ACTIVATION_S * from;
      return dur <= 0 ? 0 : from * (1 - E.outCubic(E.clamp((tNow - end) / dur, 0, 1)));
    });
    return { active: active, pagePos: pagePosAt(tNow), activation: activation };
  }

  // ─── Measuring (once the font is in) ───────────────────────────────────────
  var REF = 400, measurer = null, widths = {};
  function variation(weight) { return '"wght" ' + weight + ', "opsz" 18'; }
  function emWidth(text, weight, trackingEm, features) {
    features = features || FEATURES;
    var key = weight + '|' + trackingEm + '|' + features + '|' + text;
    if (widths[key] != null) return widths[key];
    if (!measurer) {
      measurer = document.createElement('span');
      measurer.style.cssText = 'position:absolute;left:-100000px;top:0;visibility:hidden;white-space:pre;font-family:' + FONT + ';font-size:' + REF + 'px;line-height:1';
      document.body.appendChild(measurer);
    }
    measurer.style.fontVariationSettings = variation(weight);
    measurer.style.letterSpacing = (trackingEm || 0) * REF + 'px';
    measurer.style.fontFeatureSettings = features;
    measurer.textContent = text;
    return (widths[key] = measurer.getBoundingClientRect().width / REF);
  }
  function headSize(base, max) { return base * Math.min(CHROME_TEXT_SCALE, max == null ? Infinity : max); }
  function tightTop(lineTop, size, height, even) {
    return lineTop + (even ? size * (height - 1) / 2 : METRICS.ascent * size * (height - 1));
  }

  // ─── Building the card ─────────────────────────────────────────────────────
  var stage = document.getElementById('stage');
  var cardEl, content, pageEls = {}, pieceEls = [], pieces = [], ringArc, k = 1, cardW = 0;
  var SVGNS = 'http://www.w3.org/2000/svg';

  function run(x, top, size, weight, color, tracking, features, text) {
    var s = document.createElement('span');
    s.className = 'run';
    s.style.cssText = 'left:' + x * k + 'px;top:' + top * k + 'px;font-size:' + size * k + 'px;font-variation-settings:' + variation(weight) +
      ';font-feature-settings:' + (features || FEATURES) + ';color:' + color + (tracking ? ';letter-spacing:' + tracking * k + 'px' : '');
    s.textContent = text;
    return s;
  }
  function svg(w, h, box) {
    var s = document.createElementNS(SVGNS, 'svg');
    s.setAttribute('width', w); s.setAttribute('height', h); s.setAttribute('viewBox', box);
    s.style.position = 'absolute'; s.style.overflow = 'visible';
    return s;
  }
  function node(tag, attrs) {
    var n = document.createElementNS(SVGNS, tag);
    for (var a in attrs) n.setAttribute(a, attrs[a]);
    return n;
  }
  function shadowCss(list, scale) {
    return list.map(function (s) { return '0 ' + s[0] * scale + 'px ' + 2 * (s[1] * .57735 + .5) * scale + 'px ' + s[2]; }).join(', ');
  }
  function isDark() {
    var r = document.documentElement.classList;
    if (r.contains('dark')) return true;
    if (r.contains('light')) return false;
    return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }
  function wordTop(piece, line) {
    return tightTop(COLUMN.top + piece.top + READING.padV + line * READ_LINE, READ_SIZE, READING.height, true);
  }

  function build() {
    var F = folio(isDark());
    var avail = Math.min(document.documentElement.clientWidth || 360, 520) - 24;
    cardW = avail;
    var h = cardW * WINDOW.h / WINDOW.w;
    k = cardW / WINDOW.w;
    var kCard = cardW / CARD.w;
    stage.innerHTML = '';
    cardEl = document.createElement('div');
    cardEl.className = 'card';
    cardEl.style.cssText = 'width:' + cardW + 'px;height:' + h + 'px;border-radius:' + CARD.radius * kCard + 'px;background:' + F.page +
      ';box-shadow:' + shadowCss(F.cardShadow, kCard) + ', inset 0 0 0 ' + kCard + 'px ' + F.hairline;
    content = document.createElement('div');
    content.className = 'content';
    cardEl.appendChild(content);
    stage.appendChild(cardEl);

    // The page.
    pieces = layoutPages(function (text) { return emWidth(text, 400, READING.tracking / READ_SIZE) * READ_SIZE; });
    pageEls = {};
    pieceEls = pieces.map(function (piece) {
      if (!pageEls[piece.page]) {
        var pg = document.createElement('div');
        pg.className = 'page';
        content.appendChild(pg);
        pageEls[piece.page] = pg;
      }
      var host = pageEls[piece.page];
      function layer(color) {
        var l = document.createElement('div');
        l.className = 'layer';
        var spans = piece.placed.map(function (wd) {
          var s = run(COLUMN.left + wd.x, wordTop(piece, wd.line), READ_SIZE, 400, color, READING.tracking, FEATURES, WORDS[wd.i].w);
          l.appendChild(s);
          return s;
        });
        host.appendChild(l);
        return { el: l, spans: spans };
      }
      var rule = document.createElement('div');
      rule.className = 'rule';
      rule.style.background = F.rubric;
      rule.style.height = NOW_RULE.stroke * k + 'px';
      var far = layer(F.far), near = layer(F.near), ink = layer(F.ink);
      host.appendChild(rule);
      return { far: far, near: near, ink: ink, rule: rule, words: piece.words.map(function (i) { return WORDS[i]; }), clip: [] };
    });

    // Running head: ‹ · I · MR. SHERLOCK HOLMES · Aa, Mark.
    var head = document.createElement('div');
    head.className = 'head';
    var b = TYPE.back, backW = emWidth(b.glyph, b.weight, b.tracking / b.size) * b.size;
    head.appendChild(run(HEAD.edgePad + (HEAD.button - (b.padStart + backW)) / 2 + b.padStart, (HEAD.row - (b.size + b.padBottom)) / 2,
      b.size, b.weight, F.ink, b.tracking, FEATURES, b.glyph));
    var titleSize = headSize(TYPE.head.size);
    var mk = TYPE.mark, markSize = headSize(mk.size, mk.maxScale);
    var markWordW = emWidth(mk.text, mk.weight, mk.tracking / markSize, CASE_FEATURES) * markSize;
    var markW = Math.max(HEAD.button, MARK.wordStart + MARK.icon + MARK.wordGap + markWordW + MARK.wordEnd);
    var inner = WINDOW.w - 2 * HEAD.edgePad, equal = Math.max(HEAD.side, HEAD.button, HEAD.button + markW);
    var titleX = HEAD.edgePad + equal, titleW = inner - 2 * equal;
    var title = document.createElement('div');
    title.className = 'title';
    title.style.cssText = 'left:' + titleX * k + 'px;top:' + tightTop((HEAD.row - titleSize * TYPE.head.height) / 2, titleSize, TYPE.head.height, false) * k +
      'px;width:' + titleW * k + 'px;font-size:' + titleSize * k + 'px;letter-spacing:' + TYPE.head.tracking * k + 'px;font-feature-settings:' + CASE_FEATURES +
      ';color:' + F.secondary + ';font-variation-settings:' + variation(TYPE.head.weight);
    var num = document.createElement('span');
    num.style.cssText = 'color:' + F.rubric + ';font-variation-settings:' + variation(TYPE.head.numeralWeight);
    num.textContent = HEAD_TITLE.numeral;
    title.appendChild(num);
    title.appendChild(document.createTextNode(HEAD_TITLE.rest));
    head.appendChild(title);
    var aaSize = headSize(TYPE.aa.size, TYPE.aa.maxScale), aaW = emWidth(TYPE.aa.text, TYPE.aa.weight, TYPE.aa.tracking / aaSize) * aaSize;
    var trailingX = WINDOW.w - HEAD.edgePad - (HEAD.button + markW), markX = trailingX + HEAD.button;
    head.appendChild(run(trailingX + (HEAD.button - aaW) / 2, (HEAD.row - aaSize) / 2, aaSize, TYPE.aa.weight, F.ink, TYPE.aa.tracking, FEATURES, TYPE.aa.text));
    var markLine = markSize * mk.height, rowTop = (HEAD.row - Math.max(MARK.icon, markLine)) / 2;
    var pen = svg(MARK.icon * k, MARK.icon * k, '0 0 24 24');
    pen.style.left = (markX + MARK.wordStart) * k + 'px';
    pen.style.top = (rowTop + (Math.max(MARK.icon, markLine) - MARK.icon) / 2) * k + 'px';
    var g = node('g', { fill: 'none', stroke: F.ink, 'stroke-width': 1.9, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
    MARK_PEN.forEach(function (d) { g.appendChild(node('path', { d: d })); });
    pen.appendChild(g);
    head.appendChild(pen);
    head.appendChild(run(markX + MARK.wordStart + MARK.icon + MARK.wordGap,
      tightTop(rowTop + (Math.max(MARK.icon, markLine) - markLine) / 2, markSize, mk.height, true),
      markSize, mk.weight, F.ink, mk.tracking, CASE_FEATURES, mk.text));
    cardEl.appendChild(head);

    // Lamp and its handle, bottom right.
    var left = WINDOW.w - LAMP.end - LAMP.size, top = WINDOW.h - LAMP.bottom - LAMP.size, hd = LAMP.handle;
    var tabLeft = left + (LAMP.size - hd.target) / 2 + (hd.target - hd.w) / 2, tabTop = top - hd.gap - hd.h;
    var tab = document.createElement('div');
    tab.className = 'disc';
    tab.style.cssText = 'left:' + tabLeft * k + 'px;top:' + tabTop * k + 'px;width:' + hd.w * k + 'px;height:' + hd.h * k + 'px;border-radius:' + hd.radius * k +
      'px;background:' + F.dock + ';border:' + k + 'px solid ' + F.hairline + ';box-shadow:' + shadowCss(F.handleShadow, k);
    cardEl.appendChild(tab);
    var chevW = CHEVRON.advance / CHEVRON.upm * hd.icon;
    var chev = svg(chevW * k, hd.icon * k, '0 0 ' + CHEVRON.advance + ' ' + CHEVRON.upm);
    chev.style.left = (tabLeft + (hd.w - chevW) / 2) * k + 'px';
    chev.style.top = (tabTop + (hd.h - hd.icon) / 2) * k + 'px';
    chev.appendChild(node('path', { d: CHEVRON.path, transform: 'translate(0 ' + CHEVRON.baseline + ') scale(1 -1)', fill: F.secondary }));
    cardEl.appendChild(chev);
    var orb = document.createElement('div');
    orb.className = 'disc';
    orb.style.cssText = 'left:' + left * k + 'px;top:' + top * k + 'px;width:' + LAMP.size * k + 'px;height:' + LAMP.size * k +
      'px;border-radius:50%;background:' + F.dock + ';border:' + k + 'px solid ' + F.hairline + ';box-shadow:' + shadowCss(F.dockShadow, k);
    cardEl.appendChild(orb);
    var c = LAMP.ringBox / 2, rings = svg(LAMP.ringBox * k, LAMP.ringBox * k, '0 0 ' + LAMP.ringBox + ' ' + LAMP.ringBox);
    rings.style.left = (left - 1) * k + 'px';
    rings.style.top = (top - 1) * k + 'px';
    rings.appendChild(node('circle', { cx: c, cy: c, r: LAMP.ringR, fill: 'none', stroke: F.track, 'stroke-width': LAMP.ringStroke }));
    ringArc = node('path', { fill: 'none', stroke: F.rubric, 'stroke-width': LAMP.ringStroke, 'stroke-linecap': 'round' });
    rings.appendChild(ringArc);
    rings.appendChild(node('circle', { cx: c, cy: c, r: LAMP.core / 2, fill: F.rubric }));
    var glyph = node('g', { transform: 'translate(' + (c - LAMP.glyph / 2) + ' ' + (c - LAMP.glyph / 2) + ') scale(' + LAMP.glyph / 48 + ')' });
    glyph.appendChild(node('path', { d: PAUSE, fill: F.glyph }));
    rings.appendChild(glyph);
    cardEl.appendChild(rings);
  }

  function arcPath(c, r, f) {
    f = E.clamp(f, 0, 1);
    var a = 2 * Math.PI * f;
    return 'M ' + c + ' ' + (c - r) + ' A ' + r + ' ' + r + ' 0 ' + (f > .5 ? 1 : 0) + ' 1 ' + (c + r * Math.sin(a)) + ' ' + (c - r * Math.cos(a));
  }

  // ─── One frame at narration time t ─────────────────────────────────────────
  function draw(t) {
    var follow = followAt(pieces, t), pos = positionAt(t);
    for (var p in pageEls) {
      var off = (p - follow.pagePos);
      pageEls[p].style.display = Math.abs(off) < 1 ? '' : 'none';
      pageEls[p].style.transform = 'translate3d(' + (off * WINDOW.w * k).toFixed(2) + 'px,0,0)';
    }
    pieces.forEach(function (piece, i) {
      var v = pieceEls[i], act = follow.activation[i];
      v.far.el.style.opacity = (1 - act).toFixed(3);
      v.near.el.style.opacity = act.toFixed(3);
      var timing = i === follow.active && act > 0 ? karaoke(v.words, pos) : null;
      var spoken = !!(timing && (timing.any || timing.current !== null));
      v.ink.el.style.display = spoken ? '' : 'none';
      if (spoken) {
        for (var w = 0; w < v.ink.spans.length; w++) {
          var shown = timing.completed[w] ? 1 : w === timing.current ? timing.fraction : 0;
          var clip = shown <= 0 ? 'hidden' : shown >= 1 ? 'all' : 'inset(0 ' + ((1 - shown) * 100).toFixed(2) + '% 0 0)';
          if (v.clip[w] !== clip) {
            v.clip[w] = clip;
            var st = v.ink.spans[w].style;
            st.visibility = clip === 'hidden' ? 'hidden' : '';
            st.clipPath = st.webkitClipPath = clip === 'all' || clip === 'hidden' ? '' : clip;
          }
        }
      }
      var now = spoken ? nowWord(v.words, pos) : null;
      if (now === null) { v.rule.style.display = 'none'; return; }
      var wd = piece.placed[now];
      v.rule.style.display = '';
      v.rule.style.left = (COLUMN.left + wd.x) * k + 'px';
      v.rule.style.top = (wordTop(piece, wd.line) + READ_SIZE + NOW_RULE.below - NOW_RULE.stroke / 2) * k + 'px';
      v.rule.style.width = wd.w * k + 'px';
      v.rule.style.opacity = act.toFixed(3);
    });
    var lamp = Math.round(pos / 1450000 * 1000) / 1000;
    ringArc.setAttribute('d', arcPath(LAMP.ringBox / 2, LAMP.ringR, lamp));
  }

  // At rest, the narration (about 12 s at the deck's 1.25x), a held last word, then a fade
  // back to the start. Reduce Motion holds the App Store poster frame ("had" half lit).
  var PRE = 1, HOLD = 1.4, FADE = .45, LOOP = PRE + CLIP_S + HOLD + 2 * FADE, POSTER = 6.6;
  function render(t, still) {
    if (!pieces.length) return;
    if (still) { content.style.opacity = 1; draw(POSTER); return; }
    t = ((t % LOOP) + LOOP) % LOOP;
    var end = PRE + CLIP_S + HOLD, opacity = 1, nt = E.clamp(t - PRE, 0, CLIP_S);
    if (t >= end && t < end + FADE) opacity = 1 - (t - end) / FADE;
    else if (t >= end + FADE) { opacity = (t - end - FADE) / FADE; nt = 0; }
    content.style.opacity = opacity.toFixed(3);
    draw(nt);
  }

  var loop = null;
  function start() {
    build();
    if (!loop) loop = window.HBLoop(render); else loop.restart();
  }
  var ready = document.fonts && document.fonts.load ? document.fonts.load('400 40px ' + FONT) : null;
  if (ready) ready.then(start, start); else setTimeout(start, 300);
  window.HBOnWidth(start);
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    if (mq.addEventListener) mq.addEventListener('change', start);
  }
})();
