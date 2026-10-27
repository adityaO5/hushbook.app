'use strict';
/**
 * Builds demos/character-map.html, the autoplaying phone demo embedded in the
 * character-tracking blog post, from the app repo's character map design deck
 * (docs/design/character-map-variations.html, picks A1 Ink Peeps, B2 Map is
 * home, C1 Ink and margin). Labels are patched to the shipped app strings.
 *
 * Usage: node scripts/build-character-map-demo.js
 *        CHARACTER_MAP_DECK=<path> overrides the deck location.
 */
const fs = require('node:fs');
const path = require('node:path');
const SRC = process.env.CHARACTER_MAP_DECK || 'D:/hushbook/docs/design/character-map-variations.html';
const OUT = path.join(__dirname, '..', 'demos', 'character-map.html');
const lines = fs.readFileSync(SRC, 'utf8').replace(/\r\n/g, '\n').split('\n');
const L = (a, b) => lines.slice(a - 1, b).join('\n');

function patch(text, from, to, all = false) {
  if (!text.includes(from)) throw new Error(`patch target missing: ${from.slice(0, 90)}`);
  return all ? text.split(from).join(to) : text.replace(from, () => to);
}

// ---------- CSS ----------
if (!lines[9].startsWith('<style>') || !lines[468].startsWith('</style>')) throw new Error('style block moved');
let css = L(11, 468);
css = css.replace(/url\(fonts\/(Inter-[A-Za-z]+\.ttf)\)/g, 'url(/assets/fonts/$1)');
css = css.replace(/@font-face\{[^}]*url\(fonts\/[^}]*\}\n?/g, ''); // Newsreader + Playfair come from Google Fonts

// ---------- sprite (CC0 avatar parts) ----------
if (!lines[471].startsWith('<!-- Avatar parts') || !lines[472].startsWith('<svg class="sprite"')) throw new Error('sprite moved');
const sprite = L(472, 473);

// ---------- prototype code ----------
if (!lines[782].startsWith('/* ═══════════ foundations') || !lines[1681].startsWith("const PICK_KEY")) throw new Error('script bounds moved');
let js = L(783, 1681);

// Shipped strings (D:\hushbook\lib\l10n\app_en.arb)
js = patch(js, "const TYPES={family:'Family',love:'Sweethearts',rivalry:'Old rivals',ally:'Good friends',mentor:'Mentor',secret:'A secret',unknown:'Not sure yet'};",
  "const TYPES={family:'Family',love:'Sweethearts',rivalry:'Rivals',ally:'Good friends',mentor:'Mentor of',secret:'Secret',unknown:'Not sure'};");
js = patch(js, "this.hint(`Now tap who ${this.cast[id].name} is linked to.`)", "this.hint(\"Tap who they're linked to\")");
js = patch(js, "this.hint('Tap one character, then another.')", "this.hint('')", true);
js = patch(js, "${esc(A.name)} &amp; ${esc(B.name)}", "${esc(A.name)} and ${esc(B.name)}");
js = patch(js, "['First heard',c.fh||'Ch. 3, 1:12:40']", "['First heard',(c.fh||'Ch. 3, 1:12:40').replace(', ',' · ')]");
js = patch(js, 'aria-label="Try another face"', 'aria-label="Shuffle look"', true);

// B2: map is home, with C1 role pills, hero ring and the pair card
js = patch(js, '<div class="map-hint" style="top:auto;bottom:122px;right:90px">Tip: drag + onto a character to add someone linked to them.</div>', '<div class="map-hint" aria-live="polite"></div>');
js = patch(js, '<h4>Cast</h4><span class="hint">7 characters</span>', '<h4>Cast · 7</h4>');
js = patch(js, "$('.casttray .hint',scr).textContent='8 characters';", "$('.casttray h4',scr).textContent='Cast · 8';");
js = patch(js, "view=new MapView($('.map',scr),{style:'ink',section:sec,scr});",
  "view=new MapView($('.map',scr),{style:'ink',section:sec,scr,hintEl:$('.map-hint',scr),avatar:(c,id)=>c.role?`<span class=\"rolewrap\">${peep(c,{size:60,live:true})}${rolePill(c)}</span>`:peep(c,{size:60,live:true})}); view.pairCard=true;");
js = patch(js, "Object.entries(POS).forEach(([id,[x,y]])=>view.addNode(id,x,y-20)); PRE.forEach(([a,b,t,l])=>view.connect(a,b,t,l));",
  "Object.entries(POS).forEach(([id,[x,y]])=>view.addNode(id,x,y-20)); PRE.forEach(([a,b,t,l])=>view.connect(a,b,t,l)); heroRing(view,'eliz');");
js = patch(js, "const PRE=[['eliz','jane','family','Sisters'],['mrb','mrsb','family','Married'],['mrb','eliz','family','Father'],['darcy','bingley','ally','Good friends']];",
  "const PRE=[['eliz','jane','family','Siblings'],['mrb','mrsb','love','Partners'],['mrb','eliz','family','Parent of'],['darcy','bingley','ally','Good friends']];");
js = patch(js, "const NEWC=()=>Object.assign({},CAST.charlotte,{id:'charlotte'});", "const NEWC=()=>Object.assign({},CAST.charlotte,{id:'charlotte',role:'Friend'});");
js = patch(js, "requestAnimationFrame(()=>requestAnimationFrame(()=>view.move('charlotte',target[0],target[1])));",
  "if(REDUCED()) view.move('charlotte',target[0],target[1]); else requestAnimationFrame(()=>requestAnimationFrame(()=>view.move('charlotte',target[0],target[1])));");
js = patch(js, '<h4>Who did you meet?</h4>', '<h4>Who did you just meet?</h4>');
js = patch(js, '<label class="flabel" for="b2n">Name</label>', '<label class="flabel" for="b2n">Character name</label>');
js = patch(js, '<b style="font-weight:600">This is how they look</b><p class="hint">Made from the name. Try another if it is not right.</p>', '<b style="font-weight:600">Look</b>');
js = patch(js, '<button class="pillbtn" data-next="3">Looks right</button>', '<button class="pillbtn" data-next="3">Next</button>');
js = patch(js, "{family:'Family',love:'Love',rivalry:'Rivalry',ally:'Friend',mentor:'Mentor',secret:'Secret'}[tp]",
  "{family:'Family',love:'Sweethearts',rivalry:'Rivals',ally:'Good friends',mentor:'Mentor of',secret:'Secret'}[tp]");
js = patch(js, '<button class="pillbtn" data-add>Add Charlotte</button>', '<button class="pillbtn" data-add>Add</button>');
js = patch(js, "; $('[data-add]',t).textContent='Add '+(inp.value.trim().split(' ')[0]||'');", ';');
js = patch(js, "  sec._replay=()=>go(0);\n  go(0);\n}\n\n/* ═══════════ B3", "  sec._go=go; sec._view=()=>view;\n  go(0);\n}\n\n/* ═══════════ B3");

// ---------- page ----------
const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Character map demo</title>
<meta name="robots" content="noindex">
<link rel="canonical" href="https://hushbook.app/blog/how-to-keep-track-of-characters-in-a-book">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,600;1,700&display=swap">
<!-- Built from D:\\hushbook\\docs\\design\\character-map-variations.html (A1 Ink Peeps, B2 Map is home, C1 Ink and margin) by an autoplay driver. Edit the deck, then regenerate. -->
<style>
${css}
/* ───────── demo page ───────── */
html,body{height:100%}
body.demo{margin:0;padding:12px 0;background:transparent;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;overflow:hidden}
.fit{position:relative;flex:none}
.rig{position:absolute;left:0;top:0;width:390px;height:800px;transform-origin:0 0}
.rig .phone{transform:none!important;margin:0!important;box-shadow:0 30px 70px rgba(0,0,0,.55);border-color:#1c1a18}
.finger{position:absolute;left:0;top:0;width:46px;height:46px;margin:-23px 0 0 -23px;border-radius:50%;background:rgba(245,239,230,.30);border:2px solid rgba(245,239,230,.75);box-shadow:0 6px 18px rgba(0,0,0,.35);z-index:50;pointer-events:none;opacity:0;transition:left .55s cubic-bezier(.45,0,.2,1),top .55s cubic-bezier(.45,0,.2,1),opacity .25s,transform .12s}
.finger.on{opacity:1}
.finger.tap{transform:scale(.78)}
.finger::after{content:"";position:absolute;inset:-2px;border-radius:50%;border:2px solid rgba(245,239,230,.7);opacity:0}
.finger.tap::after{animation:ring .5s ease-out}
@keyframes ring{from{opacity:.9;transform:scale(1)}to{opacity:0;transform:scale(2)}}
.bar{display:flex;align-items:center;gap:12px;max-width:min(92vw,460px);min-height:40px;color:#E9E0D3;font:500 15px/1.35 Inter,system-ui,sans-serif}
.cap{margin:0;flex:1;text-align:center}
.cap b{color:#E8927C;font-weight:600;margin-right:6px}
.pp{flex:none;width:36px;height:36px;border-radius:18px;border:1px solid rgba(201,163,106,.45);background:rgba(245,239,230,.06);color:#E9E0D3;display:grid;place-items:center;cursor:pointer;padding:0}
.pp svg{width:16px;height:16px}
.pp:focus-visible{outline:2px solid #E8C893;outline-offset:2px}
.phone input{caret-color:var(--acc)}
.steps{display:none!important}
.map-hint:empty{display:none}
</style>
</head>
<body class="demo">
${sprite}
<section id="B2">
<ol class="steps" data-steps="B2" hidden></ol>
<div class="fit"><div class="rig"><div class="phone dark" data-proto="B2" aria-hidden="true"></div><div class="finger" aria-hidden="true"></div></div></div>
</section>
<div class="bar"><p class="cap" aria-live="polite"></p><button class="pp" type="button" aria-label="Pause demo"></button></div>
<script>
${js}

/* ═══════════ autoplay demo ═══════════ */
(function demo(){
  const sec=document.getElementById('B2'), phone=$('.phone',sec), rig=$('.rig'), fit=$('.fit'), finger=$('.finger'), cap=$('.cap'), pp=$('.pp');
  const PAUSE='<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>';
  const PLAY='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 001.5.86l10.5-6.5a1 1 0 000-1.72L9.5 4.64A1 1 0 008 5.5z"/></svg>';
  let scale=1, paused=false, visible=true;
  io.observe(phone); buildB2(phone);

  function layout(){
    const h=innerHeight-24-54, w=innerWidth-24;
    scale=Math.min(1,h/800,w/390);
    fit.style.width=390*scale+'px'; fit.style.height=800*scale+'px'; rig.style.transform='scale('+scale+')';
  }
  addEventListener('resize',layout); layout();

  new IntersectionObserver(es=>es.forEach(e=>{visible=e.isIntersecting;}),{threshold:.25}).observe(fit);
  function setPaused(v){ paused=v; pp.innerHTML=v?PLAY:PAUSE; pp.setAttribute('aria-label',v?'Play demo':'Pause demo'); }
  pp.onclick=()=>setPaused(!paused); setPaused(false);

  const gate=async()=>{ while(paused||!visible) await new Promise(r=>setTimeout(r,200)); };
  const wait=async ms=>{ await sleep(ms); await gate(); };
  const say=(n,t)=>{ cap.innerHTML='<b>'+n+'</b>'+t; };

  async function point(el){
    if(!el) return;
    const r=el.getBoundingClientRect(), o=rig.getBoundingClientRect();
    finger.style.left=((r.left+r.width/2-o.left)/scale)+'px'; finger.style.top=((r.top+r.height/2-o.top)/scale)+'px';
    finger.classList.add('on'); await wait(620);
  }
  async function tap(el,act){
    await point(el); finger.classList.add('tap'); await sleep(130); finger.classList.remove('tap');
    if(act) act(); else if(el) el.click(); await wait(320);
  }
  async function type(inp,text){
    inp.value=''; inp.dispatchEvent(new Event('input'));
    for(const ch of text){ inp.value+=ch; inp.dispatchEvent(new Event('input')); await wait(ch===' '?150:75); }
  }
  const scr=()=>$('.scr',phone);

  async function run(){
    finger.classList.remove('on');
    sec._go(0);
    say('1','Your cast so far, tied together in ink.');
    await wait(2200);

    say('2','Someone new? Tap + and type their name.');
    await tap($('.fab',scr()),()=>sec._go(1));
    await wait(450);
    const inp=$('#b2n',scr());
    await point(inp); finger.classList.remove('on');
    await type(inp,'Charlotte Lucas');
    await wait(500);
    await tap($('[data-next="2"]',scr()));

    say('3','A face is drawn from the name. Shuffle until it fits.');
    await wait(700);
    await tap($('.growtray .dice',scr())); await wait(500);
    await tap($('.growtray .dice',scr())); await wait(700);
    await tap($('[data-next="3"]',scr()));

    say('4','Say who they are tied to, and how.');
    await wait(600);
    await tap($('[data-rel] .tchip[data-id="eliz"]',scr()));
    await tap($('[data-type] .tchip[data-t="ally"]',scr()));
    await tap($('[data-add]',scr()));
    finger.classList.remove('on');

    say('5','They drop into the map, and the tie draws itself.');
    await wait(2600);

    const view=sec._view(), c=view.cast.charlotte;
    const scrim=document.createElement('div'); scrim.className='scrim2';
    const sh=document.createElement('div'); sh.className='tray dsheet';
    sh.innerHTML='<div class="grab"></div>'+idCard(c,{title:'Meet '+c.name,rel:'Elizabeth',size:88})+'<div class="rowbtns"><button class="pillbtn ghost">Share</button><button class="pillbtn">Add another</button></div>';
    scr().appendChild(scrim); scr().appendChild(sh); registerLive(sh);
    if(!REDUCED()) sh.animate([{transform:'translateY(100%)'},{transform:'none'}],{duration:320,easing:'cubic-bezier(.22,1,.36,1)'});
    say('6','A card for each, with when you first heard them.');
    await wait(3400);
    if(!REDUCED()) await sh.animate([{transform:'none'},{transform:'translateY(100%)'}],{duration:240,easing:'ease-in'}).finished;
    sh.remove(); scrim.remove();

    say('7','Later, tap two characters to tie them.');
    view.onTap=null; view.type='rivalry';
    await tap(view.node('darcy'),()=>view.tap('darcy'));
    await wait(500);
    await tap(view.node('eliz'),()=>view.tap('eliz'));
    finger.classList.remove('on');
    await wait(3600);
  }

  (async()=>{
    if(REDUCED()){ await run(); return; } // one pass to the finished map, no loop
    for(;;) await run();
  })();
})();
</script>
</body>
</html>
`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, html);
console.log(`wrote ${OUT} (${(html.length / 1024).toFixed(0)} KB)`);
