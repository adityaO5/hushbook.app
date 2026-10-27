// One companion as the app's CompanionAvatar draws it: a tinted disc (or none) under the app's
// own ink layers (assets/companions/parts), the paper sentinel swapped for the theme's paper
// (currentColor). Poses rest, look, pleased, asleep; a blink; reactions star and z.
window.HBComp = (function () {
  var D = window.HBC_DATA;
  var LAYERS = ['base', 'eyes_open', 'eyes_closed', 'eyes_look', 'eyes_pleased',
    'mouth_rest', 'mouth_pleased', 'prop', 'fx_star', 'fx_z'];

  function make(id, size, o) {
    o = o || {};
    var el = document.createElement('div');
    el.className = 'cmp' + (o.disc === false ? ' bare' : '');
    el.style.width = size + 'px';
    el.style.height = size + 'px';
    el.style.setProperty('--hs', (size * .012).toFixed(2) + 'px');
    if (o.tint) el.setAttribute('data-tint', o.tint);
    var fig = document.createElement('div');
    fig.className = 'fig';
    var parts = D.parts[id], ly = {};
    for (var i = 0; i < LAYERS.length; i++) {
      var d = document.createElement('div');
      d.className = 'ly ' + LAYERS[i];
      d.innerHTML = parts[LAYERS[i]];
      fig.appendChild(d);
      ly[LAYERS[i]] = d;
    }
    el.appendChild(fig);
    el._ly = ly;
    el._s = {};
    set(el, 'rest');
    return el;
  }

  function show(el, key, layer) {
    var s = el._s;
    if (s[key] === layer) return;
    if (s[key]) el._ly[s[key]].style.display = '';
    el._ly[layer].style.display = 'block';
    s[key] = layer;
  }

  function fxAlpha(el, layer, a) {
    var s = el._s, k = 'a_' + layer;
    a = Math.round(a * 100) / 100;
    if (s[k] === a) return;
    s[k] = a;
    var st = el._ly[layer].style;
    st.display = a > 0 ? 'block' : '';
    st.opacity = a;
  }

  /** Pose, a blink (closed), and a reaction (fx 'star' or 'z') at alpha a (0..1). */
  function set(el, pose, closed, fx, a) {
    show(el, 'eyes', closed || pose === 'asleep' ? 'eyes_closed'
      : pose === 'look' ? 'eyes_look' : pose === 'pleased' ? 'eyes_pleased' : 'eyes_open');
    show(el, 'mouth', pose === 'pleased' ? 'mouth_pleased' : 'mouth_rest');
    var alpha = a == null ? 1 : a;
    fxAlpha(el, 'fx_star', fx === 'star' ? alpha : 0);
    fxAlpha(el, 'fx_z', fx === 'z' ? alpha : 0);
  }

  function tint(el, t) {
    if (el._s.tint === t) return;
    el._s.tint = t;
    el.setAttribute('data-tint', t);
  }

  return { make: make, set: set, tint: tint, ids: D.ids, name: function (id) { return D.names[id]; }, temper: function (id) { return D.tempers[id]; } };
})();
