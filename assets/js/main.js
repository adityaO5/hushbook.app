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
    var text = document.documentElement.lang === 'de'
      ? 'Du hörst Meditationen von Marcus Aurelius, gelesen von Christopher Hurt. Erstes Kapitel, erster Band. Marcus Aurelius war von 161 bis 180 römischer Kaiser und stoischer Philosoph.'
      : "You are listening to Meditations by Marcus Aurelius, narrated by Christopher Hurt. Chapter one, volume one. Marcus Aurelius was Roman emperor from 161 to 180 and a Stoic philosopher.";
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
    var blocks = document.querySelectorAll('.reveal');
    var headings = document.querySelectorAll('h1, h2, h3');

    function splitText(node, index){
      Array.prototype.slice.call(node.childNodes).forEach(function(child){
        if(child.nodeType === Node.TEXT_NODE){
          var fragment = document.createDocumentFragment();
          Array.prototype.forEach.call(child.textContent, function(character){
            if(/\s/.test(character)){
              fragment.appendChild(document.createTextNode(' '));
              return;
            }
            var span = document.createElement('span');
            span.className = 'reveal-char';
            span.setAttribute('aria-hidden', 'true');
            span.style.transitionDelay = (index.value++ * 30) + 'ms';
            span.textContent = character;
            fragment.appendChild(span);
          });
          child.parentNode.replaceChild(fragment, child);
        } else if(child.nodeType === Node.ELEMENT_NODE){
          splitText(child, index);
        }
      });
    }

    function prepareHeading(heading){
      var label = heading.textContent.replace(/\s+/g, ' ').trim();
      if(!label) return;
      if(!heading.getAttribute('aria-label')) heading.setAttribute('aria-label', label);
      splitText(heading, { value:0 });
      heading.setAttribute('data-char-reveal', 'true');
    }

    function revealHeading(heading){
      heading.querySelectorAll('.reveal-char').forEach(function(character){ character.classList.add('in'); });
    }

    if(REDUCE){
      blocks.forEach(function(block){ block.classList.add('in'); });
      return;
    }

    headings.forEach(prepareHeading);
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(!en.isIntersecting) return;
        if(en.target.getAttribute('data-char-reveal') === 'true') revealHeading(en.target);
        en.target.classList.add('in');
        io.unobserve(en.target);
      });
    }, { threshold:.12, rootMargin:'0px 0px -8% 0px' });
    blocks.forEach(function(block, i){
      block.style.transitionDelay = ((i % 4) * 70) + 'ms';
      io.observe(block);
    });
    headings.forEach(function(heading){ if(!heading.classList.contains('reveal')) io.observe(heading); });
  })();

})();
