// The signup arc (CompanionArcPicker) stepping through all fourteen companions by itself:
// ArcGeometry, the 170/22 spring a tap on a neighbour runs, the middle companion awake and
// breathing, the others asleep, and CompanionCaption under it.
(function () {
  var C = window.HBComp, IDS = C.ids, N = IDS.length, E = window.HBEase;
  var BASE_W = 390, TH = 35 * Math.PI / 180, R = 166, CY = 98;
  var SIZES = [120, 76, 52, 40], OPS = [1, .75, .45];
  var HOLD = 1.7, STEP = 2.4, LOOP = N * STEP;
  var SETTLED = .42;          // the spring is within .01 of its target: the new companion is selected
  var HALF_BREATH = LOOP / 12; // the picker's 3 s breath, fitted so the loop has no seam
  var ARC_H = CY + R * (1 - Math.cos(2 * TH)) + 26 + 6; // down to the outer pair, which hold 52 px
  var TINT = 'cream';
  var MAX_W = 480;            // AdaptivePageFrame on the signup page

  var stage = document.getElementById('stage');
  var s = 1, base = 120, items = [], caps = [];

  function el(tag, cls) { var e = document.createElement(tag); e.className = cls; return e; }
  function lerp(arr, a) {
    var i = Math.min(arr.length - 2, Math.floor(a)), u = Math.min(1, a - i);
    return arr[i] + (arr[i + 1] - arr[i]) * u;
  }
  // SpringSimulation(mass 1, stiffness 170, damping 22), 0 to 1 from rest.
  function spring(tau) {
    if (tau <= 0) return 0;
    var e = Math.exp(-11 * tau);
    return 1 - e * (Math.cos(7 * tau) + 11 / 7 * Math.sin(7 * tau));
  }

  function build() {
    var w = Math.min(document.documentElement.clientWidth || 360, MAX_W);
    s = w / BASE_W;
    base = 120 * s;
    stage.innerHTML = '';
    var arc = el('div', 'arc');
    arc.style.width = w + 'px';
    arc.style.height = ARC_H * s + 'px';
    items = IDS.map(function (id) {
      var it = el('div', 'it');
      it.style.width = it.style.height = base + 'px';
      var c = C.make(id, base, { tint: TINT });
      it.appendChild(c);
      arc.appendChild(it);
      return { it: it, c: c, vis: true };
    });
    var cap = el('div', 'cap');
    var nm = Math.max(15, Math.min(20, 18 * s)), tp = Math.max(12.5, Math.min(15.5, 14 * s));
    cap.style.width = w + 'px';
    cap.style.marginTop = 4 * s + 'px';
    cap.style.height = Math.ceil(nm * 1.3 + 2 + tp * 1.4) + 'px';
    caps = [0, 1].map(function () {
      var c = el('div', 'c'), a = el('div', 'nm'), b = el('div', 'tp');
      a.style.fontSize = nm + 'px';
      b.style.fontSize = tp + 'px';
      c.appendChild(a); c.appendChild(b); cap.appendChild(c);
      return { c: c, nm: a, tp: b, id: null };
    });
    stage.appendChild(arc);
    stage.appendChild(cap);
  }

  function caption(layer, id, opacity) {
    if (layer.id !== id) {
      layer.id = id;
      layer.nm.textContent = C.name(id);
      layer.tp.textContent = C.temper(id);
    }
    layer.c.style.opacity = opacity;
  }

  function render(t, still) {
    t = ((t % LOOP) + LOOP) % LOOP;
    var k = Math.floor(t / STEP), tau = t - k * STEP - HOLD;
    var pos = still ? 0 : k + (tau > 0 ? spring(tau) : 0);
    var landed = tau >= SETTLED;
    var sel = still ? 0 : (landed ? k + 1 : k) % N;
    var since = landed ? tau - SETTLED : tau + STEP - SETTLED; // seconds since sel landed
    var x = (t / HALF_BREATH) % 2, b = still ? .5 : E.inOut(x < 1 ? x : 2 - x);
    for (var i = 0; i < N; i++) {
      var d = i - pos;
      d = ((d + N / 2) % N + N) % N - N / 2;
      var a = Math.abs(d);
      var o = a <= 2 ? lerp(OPS, a) : Math.max(0, .45 - .45 * (a - 2) / .55);
      var item = items[i];
      if (o <= 0) {
        if (item.vis) { item.it.style.visibility = 'hidden'; item.vis = false; }
        continue;
      }
      if (!item.vis) { item.it.style.visibility = ''; item.vis = true; }
      var ang = d * TH;
      var cx = (BASE_W / 2 + R * Math.sin(ang)) * s;
      var cy = (CY + R * (1 - Math.cos(ang)) - (a < 1 ? 8 * (1 - a) : 0)) * s;
      var k2 = lerp(SIZES, Math.min(a, 3)) / 120;
      item.it.style.transform = 'translate3d(' + (cx - base / 2).toFixed(2) + 'px,' + (cy - base / 2).toFixed(2) +
        'px,0) rotate(' + (d * 35 * .22).toFixed(3) + 'deg) scale(' + k2.toFixed(4) + ')';
      item.it.style.opacity = o.toFixed(3);
      item.it.style.zIndex = 100 - Math.round(a * 10);
      var awake = i === sel;
      C.set(item.c, awake ? 'rest' : 'asleep', awake && !still && since > .95 && since < 1.07);
      item.c.style.transform = awake && !still
        ? 'translateY(' + (-base * .015 * b).toFixed(2) + 'px) rotate(' + (.035 * (b - .5)).toFixed(4) + 'rad)'
        : '';
    }
    // AnimatedSwitcher, 120 ms: the new caption fades in as the last one fades out.
    var f = still ? 1 : E.clamp(since / .12, 0, 1);
    caption(caps[0], IDS[sel], f);
    caption(caps[1], IDS[(sel - 1 + N) % N], 1 - f);
  }

  build();
  var loop = window.HBLoop(render);
  window.HBOnWidth(function () { build(); loop.restart(); });
})();
