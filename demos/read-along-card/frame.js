// Shared runtime for the paywall components: the theme override and height report the
// preview deck uses (?theme=, ?preview=1), a frozen frame (?at=seconds), and the frame loop
// with its Reduce Motion still.
(function () {
  var q = location.search;
  var theme = /[?&]theme=(light|dark)/.exec(q);
  if (theme) document.documentElement.classList.add(theme[1]);

  // Preview deck only: tell the parent page how tall the component is.
  if (/[?&]preview=1/.test(q) && window.parent !== window) {
    var last = 0;
    var report = function () {
      var h = Math.ceil(document.body.getBoundingClientRect().height);
      if (h && h !== last) {
        last = h;
        window.parent.postMessage({ hbHeight: h, src: location.href }, '*');
      }
    };
    window.addEventListener('load', report);
    window.addEventListener('resize', report);
    setInterval(report, 400);
  }

  var at = /[?&]at=([0-9.]+)/.exec(q);

  /** Runs render(seconds, still) every frame; still (Reduce Motion) draws one fixed frame. */
  window.HBLoop = function (render) {
    var mq = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    var raf = 0, t0 = 0;
    function tick(now) {
      render((now - t0) / 1000, false);
      raf = requestAnimationFrame(tick);
    }
    function apply() {
      cancelAnimationFrame(raf);
      if (at) { render(parseFloat(at[1]), false); return; }
      if (mq && mq.matches) { render(0, true); return; }
      t0 = performance.now();
      render(0, false); // drawn now, not on the first animation frame
      raf = requestAnimationFrame(tick);
    }
    if (mq && mq.addEventListener) mq.addEventListener('change', apply);
    else if (mq && mq.addListener) mq.addListener(apply);
    window.renderAt = function (t) { cancelAnimationFrame(raf); render(t, false); };
    apply();
    return { restart: apply };
  };

  /** Calls fn when the component's width changes (debounced). */
  window.HBOnWidth = function (fn) {
    var w = document.documentElement.clientWidth, timer = 0;
    window.addEventListener('resize', function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        var nw = document.documentElement.clientWidth;
        if (nw !== w) { w = nw; fn(); }
      }, 120);
    });
  };

  window.HBEase = {
    inOut: function (x) { return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; },
    outCubic: function (x) { return 1 - Math.pow(1 - x, 3); },
    clamp: function (x, a, b) { return Math.min(b, Math.max(a, x)); }
  };
})();
