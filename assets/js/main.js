/* ============================================================
   HushBook landing — interactions
   Vanilla, no deps. Each module guards for missing nodes and
   honors prefers-reduced-motion. Brand: dark amber, a11y-first.
   ============================================================ */
'use strict';

(function(){
  var REDUCE = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  /* ---------- mobile nav (hamburger) ---------- */
  (function(){
    var nav = document.getElementById('nav');
    if(!nav) return;
    var btn = nav.querySelector('.nav-toggle');
    var menu = document.getElementById('nav-menu');
    if(!btn || !menu) return;
    function setOpen(o){
      nav.classList.toggle('open', o);
      btn.setAttribute('aria-expanded', o ? 'true' : 'false');
      btn.setAttribute('aria-label', o ? 'Close menu' : 'Open menu');
    }
    btn.addEventListener('click', function(){ setOpen(!nav.classList.contains('open')); });
    menu.addEventListener('click', function(e){ if(e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function(e){ if(e.key === 'Escape') setOpen(false); });
    document.addEventListener('click', function(e){ if(nav.classList.contains('open') && !nav.contains(e.target)) setOpen(false); });
    window.addEventListener('resize', function(){ if(window.innerWidth > 980) setOpen(false); });
  })();

  /* ---------- live karaoke (hero read-along player) ---------- */
  (function(){
    var text = "You are listening to Meditations by Marcus Aurelius, narrated by Christopher Hurt. Chapter one, volume one. Marcus Aurelius was Roman emperor from 161 to 180 and a Stoic philosopher.";
    var el = document.getElementById('karaoke');
    var scrub = document.getElementById('scrub');
    if(!el) return;
    var words = text.split(' ');
    words.forEach(function(w, i){
      var s = document.createElement('span');
      s.className = 'w'; s.textContent = w; s.dataset.i = i;
      el.appendChild(s); el.appendChild(document.createTextNode(' '));
    });
    var spans = el.querySelectorAll('.w');
    var i = 0, timer;

    function paint(idx){
      spans.forEach(function(s, k){
        s.classList.remove('lit', 'read');
        if(k < idx) s.classList.add('read');
        else if(k === idx) s.classList.add('lit');
      });
      if(scrub) scrub.style.width = ((idx + 1) / spans.length * 100) + '%';
    }
    function tick(){
      paint(i);
      var dur = (spans[i] && spans[i].textContent.length > 6) ? 420 : 300;
      i++;
      if(i >= spans.length){ clearTimeout(timer); setTimeout(function(){ i = 0; run(); }, 1400); return; }
      timer = setTimeout(tick, dur);
    }
    function run(){ paint(0); timer = setTimeout(tick, 500); }

    // tap a word to jump there
    el.addEventListener('click', function(e){
      var t = e.target.closest('.w'); if(!t) return;
      clearTimeout(timer); i = parseInt(t.dataset.i, 10); tick();
    });

    if(REDUCE){ paint(4); } else { run(); }
  })();

  /* ---------- screen micro-loops (run once when revealed) ---------- */
  (function(){
    function onReveal(node, cb){
      if(!node) return;
      if(REDUCE){ cb(true); return; }            // reduced-motion: jump to final state
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(en){
          if(!en.isIntersecting) return;
          io.unobserve(en.target);
          cb(false);
        });
      }, { threshold:.4 });
      io.observe(node);
    }

    // neuron score count-up
    var num = document.getElementById('neuron-num');
    onReveal(num, function(jump){
      var target = parseInt(num.getAttribute('data-target'), 10) || 0;
      if(jump){ num.textContent = target; return; }
      var t0 = null, dur = 1100;
      function step(ts){
        if(!t0) t0 = ts;
        var p = Math.min((ts - t0) / dur, 1);
        num.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if(p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });

    // library: pulse the first download ring
    var dl = document.querySelector('#screen-lib .lib__dl');
    onReveal(document.getElementById('screen-lib'), function(jump){
      if(jump || !dl) return;
      dl.classList.add('pulsing');
    });

    // import: fill the transcription progress bar to a holding %
    var bar = document.getElementById('imp-bar');
    onReveal(document.getElementById('screen-import'), function(jump){
      if(!bar) return;
      var goal = 68;
      if(jump){ bar.style.width = goal + '%'; return; }
      var t0 = null, dur = 1600;
      function step(ts){
        if(!t0) t0 = ts;
        var p = Math.min((ts - t0) / dur, 1);
        bar.style.width = (goal * (1 - Math.pow(1 - p, 2))) + '%';
        if(p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  })();

  /* ---------- accessibility profile switcher (click + auto-cycle) ---------- */
  (function(){
    var screen = document.getElementById('screen-a11y');
    if(!screen) return;
    var btns = screen.querySelectorAll('.a11y__seg button');
    var order = ['vision', 'dyslexia', 'comprehension'];
    var auto = true, idx = 0, timer;

    function set(profile){
      screen.setAttribute('data-profile', profile);
      btns.forEach(function(b){ b.setAttribute('aria-pressed', b.dataset.profile === profile ? 'true' : 'false'); });
      idx = order.indexOf(profile);
    }
    btns.forEach(function(b){
      b.addEventListener('click', function(){ auto = false; clearInterval(timer); set(b.dataset.profile); });
    });
    if(!REDUCE){
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(en){
          if(en.isIntersecting && auto && !timer){
            timer = setInterval(function(){ if(!auto){ clearInterval(timer); return; } idx = (idx + 1) % order.length; set(order[idx]); }, 2600);
          }
        });
      }, { threshold:.4 });
      io.observe(screen);
    }
  })();

  /* ---------- reveal on scroll ---------- */
  (function(){
    var nodes = document.querySelectorAll('.reveal');
    if(!nodes.length) return;
    if(REDUCE){ nodes.forEach(function(n){ n.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold:.12, rootMargin:'0px 0px -8% 0px' });
    nodes.forEach(function(n, i){ n.style.transitionDelay = ((i % 4) * 70) + 'ms'; io.observe(n); });
  })();

  /* ---------- waitlist forms (POST to Supabase if configured, else local success) ---------- */
  (function(){
    var rx = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    function isLive(cfg){
      if(!cfg || !cfg.url || !cfg.anonKey) return false;
      var blob = String(cfg.url) + ' ' + String(cfg.anonKey);
      return blob.indexOf('YOUR-PROJECT') === -1 && blob.indexOf('YOUR_ANON') === -1;
    }
    function succeed(f, note, ok, btn){
      ok.style.color = 'var(--sage)';
      ok.textContent = "You're on the list. We'll email you the App Store and Google Play links at launch.";
      if(note) note.style.display = 'none';
      if(btn) btn.disabled = false;
    }
    document.querySelectorAll('.waitlist').forEach(function(f){
      f.addEventListener('submit', function(e){
        e.preventDefault();
        var input = f.querySelector('input'), ok = f.querySelector('.waitlist__ok'), note = f.querySelector('.waitlist__note');
        var btn = f.querySelector('button[type=submit], button');
        var email = input ? input.value.trim() : '';
        if(!rx.test(email)){ ok.style.color = '#E89B6A'; ok.textContent = 'Please enter a valid email address.'; input.focus(); return; }
        var cfg = window.HB_SUPABASE;
        if(!isLive(cfg)){ succeed(f, note, ok, btn); input.value = ''; input.blur(); return; }
        if(btn) btn.disabled = true;
        fetch(cfg.url + '/rest/v1/waitlist_signups', {
          method: 'POST',
          headers: { 'apikey': cfg.anonKey, 'Authorization': 'Bearer ' + cfg.anonKey, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
          body: JSON.stringify({ email: email, source: location.pathname, user_agent: navigator.userAgent, referrer: document.referrer })
        }).then(function(res){
          if(!res.ok && res.status !== 409){ console.warn('HushBook waitlist: unexpected response', res.status); }
          succeed(f, note, ok, btn); input.value = ''; input.blur();
        }).catch(function(err){ console.warn('HushBook waitlist: submit failed', err); succeed(f, note, ok, btn); input.value = ''; input.blur(); });
      });
    });
  })();

})();
