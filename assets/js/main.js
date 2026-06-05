/* ============================================================
   HushBook landing — auto karaoke hero
   The big lyric text BEHIND the waitlist is its own ambient layer.
   It highlights word-by-word on a time-based loop (no scroll) —
   like the app's synced_lyrics_view running by itself, "shader" style.
   Degrades to a static lit block under prefers-reduced-motion.
   ============================================================ */
(function () {
  "use strict";

  var body = document.body;
  var hero = document.querySelector(".hero");
  var layer = document.querySelector(".hero__lyrics");
  var lines = layer ? Array.prototype.slice.call(layer.querySelectorAll(".ll")) : [];

  // ---- split each line into word spans, collect in reading order ----
  var words = [];
  lines.forEach(function (line) {
    var text = line.textContent.replace(/\s+/g, " ").trim();
    line.textContent = "";
    text.split(" ").forEach(function (w, i) {
      if (i) line.appendChild(document.createTextNode(" "));
      var s = document.createElement("span");
      s.className = "w";
      s.textContent = w;
      line.appendChild(s);
      words.push(s);
    });
  });

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- fallback: reduced motion / nothing to animate -> static lit text ----
  if (!hero || !words.length || reduce) {
    body.classList.add("no-motion");
    words.forEach(function (w) { w.classList.add("spoken"); });
    initReveal();
    initWaitlist();
    return;
  }

  // ---- time-based karaoke playhead ----
  var PER_WORD = 340;   // ms a word holds the "current" highlight
  var LEAD_IN  = 650;   // ms of quiet before the first word lights
  var HOLD_END = 2400;  // ms the fully-lit verse holds before looping
  var FADE     = 1100;  // ms the layer dims down, then the loop restarts
  var TOTAL = LEAD_IN + words.length * PER_WORD + HOLD_END + FADE;
  var fadeStart = TOTAL - FADE;

  var startTs = null;
  var lastCur = -2;
  var raf = 0;

  function frame(ts) {
    if (startTs === null) startTs = ts;
    var t = (ts - startTs) % TOTAL;

    // gentle dim before the verse loops back to the top (never fully blanks)
    layer.style.opacity = t > fadeStart
      ? (1 - 0.88 * (t - fadeStart) / FADE).toFixed(3)
      : 1;

    // which word is "current"? -1 during lead-in, >=length during the hold
    var cur = t < LEAD_IN ? -1 : Math.floor((t - LEAD_IN) / PER_WORD);
    if (cur !== lastCur) {
      for (var i = 0; i < words.length; i++) {
        var c = words[i].classList;
        c.toggle("spoken", i < cur);     // already passed -> stays lit
        c.toggle("current", i === cur);  // being spoken -> bright + glow
      }
      lastCur = cur;
    }
    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);

  // pause the loop while the hero is scrolled out of view (battery / CPU)
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          if (!raf) { startTs = null; lastCur = -2; raf = requestAnimationFrame(frame); }
        } else if (raf) {
          cancelAnimationFrame(raf); raf = 0;
        }
      });
    }, { threshold: 0.04 }).observe(hero);
  }

  initReveal();
  initWaitlist();

  // ---- lightweight scroll reveal for the sections below the hero ----
  function initReveal() {
    var items = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    if (!items.length) return;
    var hasGSAP = window.gsap && window.ScrollTrigger;
    if (!hasGSAP || reduce) { items.forEach(function (n) { n.style.opacity = 1; }); return; }
    gsap.registerPlugin(ScrollTrigger);
    gsap.set(items, { opacity: 0, y: 24 });
    ScrollTrigger.batch(items, {
      start: "top 88%",
      onEnter: function (b) {
        gsap.to(b, { opacity: 1, y: 0, duration: .6, stagger: .08, ease: "power2.out", overwrite: true });
      }
    });
    window.addEventListener("load", function () { ScrollTrigger.refresh(); });
  }

  // ---- waitlist forms: POST to Supabase if configured, else local success ----
  function initWaitlist() {
    var forms = Array.prototype.slice.call(document.querySelectorAll("form.waitlist"));

    // a config is only "live" with real url+key (no placeholder tokens)
    function isLive(cfg) {
      if (!cfg || !cfg.url || !cfg.anonKey) return false;
      var blob = String(cfg.url) + " " + String(cfg.anonKey);
      return blob.indexOf("YOUR-PROJECT") === -1 && blob.indexOf("YOUR_ANON") === -1;
    }

    function succeed(form, input, btn) {
      form.classList.add("done");
      var ok = form.querySelector(".waitlist__ok");
      if (ok) ok.textContent = "You're on the list — we'll email " +
        (input && input.value ? input.value : "you") + " when HushBook lands.";
      if (btn) btn.disabled = false;
    }

    forms.forEach(function (form) {
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var input = form.querySelector("input[type=email]");
        if (input && !input.checkValidity()) { input.reportValidity(); return; }

        var btn = form.querySelector("button[type=submit], button, input[type=submit]");
        var cfg = window.HB_SUPABASE;
        var email = input && input.value ? input.value : "";

        // not configured (or placeholder) -> resolve locally, current behaviour
        if (!isLive(cfg)) { succeed(form, input, btn); return; }

        if (btn) btn.disabled = true;

        fetch(cfg.url + "/rest/v1/waitlist_signups", {
          method: "POST",
          headers: {
            "apikey": cfg.anonKey,
            "Authorization": "Bearer " + cfg.anonKey,
            "Content-Type": "application/json",
            "Prefer": "return=minimal"
          },
          body: JSON.stringify({
            email: email,
            source: location.pathname,
            user_agent: navigator.userAgent,
            referrer: document.referrer
          })
        }).then(function (res) {
          // ok or 409 (duplicate email) both count as a successful signup
          if (!res.ok && res.status !== 409) {
            console.warn("HushBook waitlist: unexpected response", res.status);
          }
          succeed(form, input, btn);
        }).catch(function (err) {
          // network/other error -> never block the visitor
          console.warn("HushBook waitlist: submit failed", err);
          succeed(form, input, btn);
        });
      });
    });
  }
})();
