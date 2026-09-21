(function oskoFix84PhoneFitTopLandGlide(){
'use strict';
if(window.__oskoFix84)return;window.__oskoFix84=true;

const bible=document.getElementById('bible66');
const book=document.getElementById('h74-open-book');
const next=document.getElementById('h74-next');
const prev=document.getElementById('h74-prev');
const status=document.getElementById('h74-status');
const sizeLabel=document.getElementById('h75-size');
const root=document.getElementById('hq66');

const css=document.createElement('style');
css.id='hq84-style';
css.textContent=`
/* FIX84 — full phone-width Bible, independent height/width controls, top-first landing. */
.bible66.fix84 .h74-stage{width:100%!important;display:flex!important;flex-direction:row!important;align-items:stretch!important;justify-content:center!important}
.bible66.fix84 .h74-book{touch-action:pan-y!important;overflow:hidden!important;perspective:1700px!important;transform-style:preserve-3d!important;width:var(--h84-book-width,100%)!important;height:var(--h84-book-height,100%)!important;max-width:100%!important;max-height:100%!important;margin-inline:auto!important;transition:width .42s ease,height .42s ease!important;flex:none!important}
.bible66.fix84 .h74-page{touch-action:pan-y!important}
.bible66.fix84 .h79-swipe-help{display:none!important}
.h82-corner{position:absolute;z-index:31;top:6px;width:66px;height:66px;pointer-events:none;opacity:.82;transition:opacity .2s}
.h82-corner.left{left:6px;border-top:3px solid #bd944f;border-left:3px solid #bd944f;border-radius:15px 0 0 0}
.h82-corner.right{right:6px;border-top:3px solid #bd944f;border-right:3px solid #bd944f;border-radius:0 15px 0 0}
.h82-corner:after{content:'GRAB PAGE';position:absolute;top:12px;width:55px;color:#725329;font:900 8px system-ui;letter-spacing:.06em}
.h82-corner.left:after{left:5px}.h82-corner.right:after{right:5px;text-align:right}
.h82-page-mesh{position:absolute;z-index:48;display:none;pointer-events:none;transform-style:preserve-3d;overflow:visible;contain:layout style paint;will-change:transform}
.h82-page-mesh.on{display:block}
.h82-strip{position:absolute;top:0;height:100%;overflow:hidden;transform-style:preserve-3d;backface-visibility:visible;will-change:transform,filter}
.h82-face{position:absolute;inset:0 auto auto 0;height:100%;overflow:hidden;backface-visibility:hidden;background:#fffdf2;color:#20170d}
.h82-face.front{transform:translateZ(.35px)}
.h82-face.back{transform:rotateY(180deg) translateZ(.35px);background:repeating-linear-gradient(0deg,#fffdf3 0 23px,#cdbb8f55 24px 25px),radial-gradient(ellipse at top,#fffef7,#eadfbe 75%,#c0a56e)}
.h82-strip-content{position:absolute;top:0;height:100%;box-sizing:border-box;background:#fffdf2}
.h82-paper-edge{position:absolute;z-index:49;top:0;width:4px;height:100%;border-radius:50%;background:linear-gradient(90deg,#7a5a2a,#fff8d9,#8b672f);box-shadow:0 0 7px #0008;pointer-events:none;will-change:transform}
.h82-contact-shadow{position:absolute;z-index:45;top:0;width:38px;height:100%;pointer-events:none;background:linear-gradient(90deg,transparent,#0008,transparent);filter:blur(9px);opacity:0;will-change:transform,opacity}
.h82-finger-curl{position:absolute;z-index:51;display:none;width:42px;height:42px;border-radius:50%;pointer-events:none;background:radial-gradient(circle at 35% 30%,#fffef4 0 18%,#e7d29b 42%,#75552a 76%,transparent 78%);filter:drop-shadow(0 8px 7px #0008);opacity:.92;will-change:transform}
.h82-finger-curl.on{display:block}
.bible66.fix84.h82-turning .h74-turn{opacity:0!important}
.bible66.fix84.h82-turning .h82-corner,.bible66.fix84.h82-pinching .h82-corner{opacity:.18}
.bible66.fix84.h82-pinching .h74-book{filter:drop-shadow(0 0 14px #56dbff88)}
.h84-control-bar{width:100%;padding:0 2px;box-sizing:border-box}
.h84-control-bar button{width:100%;min-height:54px;padding:6px 8px;border:2px solid #5fd8f1;border-radius:11px;background:linear-gradient(180deg,#0b5872,#073548);color:#e9fbff;font:900 12px/1.2 system-ui;letter-spacing:.035em;text-shadow:0 2px 2px #000;touch-action:manipulation}
.h84-control-panel{position:fixed;z-index:10020;left:max(6px,env(safe-area-inset-left));right:max(6px,env(safe-area-inset-right));bottom:max(8px,env(safe-area-inset-bottom));display:none;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;padding:12px;border:3px solid #5fd8f1;border-radius:17px;background:linear-gradient(160deg,#321606f7,#071c27f7);box-shadow:0 0 0 9999px #0009,0 18px 45px #000;backdrop-filter:blur(7px)}
.h84-control-panel.open{display:grid}
.h84-control-panel button{min-height:72px;padding:8px 5px;border:2px solid #bd914e;border-radius:12px;background:linear-gradient(#70441f,#351707);color:#fff8e7;font:900 15px/1.1 system-ui;text-shadow:0 2px 2px #000;touch-action:manipulation}
.h84-control-panel button:active{transform:translateY(2px);filter:brightness(1.25)}
.h84-panel-readout,.h84-panel-close{grid-column:1/-1!important}
.h84-panel-readout{min-height:48px;display:grid;place-items:center;padding:4px;border-radius:9px;background:#073e53;color:#dcfaff;font:900 12px/1.25 system-ui;text-align:center;letter-spacing:.035em}
.h84-panel-close{background:linear-gradient(#176e54,#0c3c2d)!important;border-color:#5ff0b8!important}

/* Carry FIX81's finished HQ rooms forward without loading FIX81's flat corner gesture. */
#hq66.fix84 .h81-hq-room{position:relative;overflow:hidden;min-height:520px;margin-top:24px;padding:24px;border:8px solid #30170a;border-radius:25px;background:linear-gradient(155deg,#98623bee,#5b3119f4 62%,#31170bed);box-shadow:0 28px 42px #000c,inset 0 0 42px #170803,0 0 0 2px #c28c5544}
#hq66.fix84 .h81-hq-room:after{content:'';position:absolute;inset:12px;border:1px solid #e0b06b3b;border-radius:15px;pointer-events:none}
#hq66.fix84 .h81-hq-room h2{position:relative;z-index:4;margin:0;text-align:center;color:#ffe2aa;font:900 28px Georgia;letter-spacing:.08em;text-shadow:0 3px 5px #000}
.h81-antlers{position:absolute;left:50%;top:62px;width:150px;height:80px;transform:translateX(-50%);border-bottom:9px solid #3b2418;border-radius:50%}
.h81-antlers:before,.h81-antlers:after{content:'';position:absolute;top:9px;width:71px;height:51px;border:8px solid #d7bd8b;border-top:0;border-radius:0 0 70% 70%}
.h81-antlers:before{left:0;transform:rotate(22deg)}.h81-antlers:after{right:0;transform:rotate(-22deg)}
.h81-map{position:absolute;left:5%;top:160px;width:42%;height:190px;border:10px solid #2d170b;border-radius:9px;background:linear-gradient(145deg,#173b47,#43889b 45%,#d9edf1 46% 55%,#315f6b 56%);box-shadow:0 17px 22px #000a,inset 0 0 23px #0008}
.h81-map:after{content:'OSKO PROPERTY MAP';position:absolute;inset:0;display:grid;place-items:center;color:#d8f9ff;font:900 12px system-ui;letter-spacing:.12em;text-shadow:0 2px 3px #000}
.h81-console{position:absolute;right:5%;top:160px;width:42%;height:190px;border:9px solid #251208;border-radius:10px;background:linear-gradient(#9f673b 0 28%,#512810 29%);box-shadow:0 17px 22px #000b,inset 0 0 0 3px #c88f5d55}
.h81-console:before{content:'SKIE HOUSE CONTROLS';position:absolute;left:7%;right:7%;top:18px;height:62px;display:grid;place-items:center;border:5px solid #10191d;border-radius:7px;background:linear-gradient(145deg,#031019,#0b566c);color:#bff7ff;font:900 12px system-ui;letter-spacing:.1em;text-shadow:0 0 9px #31d8ff}
.h81-console i{position:relative;float:left;width:20%;height:25px;margin:112px 2.5% 0;border-radius:5px;background:#57dcf4;box-shadow:0 0 10px #28cff1}
.h81-cabinets{position:absolute;left:5%;right:5%;bottom:32px;height:98px;display:grid;grid-template-columns:repeat(4,1fr);gap:9px}
.h81-cabinets i{border:6px solid #2c160a;border-radius:7px;background:linear-gradient(135deg,#ad7346,#63351b);box-shadow:inset 0 0 0 2px #d1a06a55}
.h81-mudroom{min-height:430px!important}
.h81-bench{position:absolute;left:7%;right:7%;top:135px;height:105px;border:9px solid #2c160a;border-radius:10px;background:linear-gradient(#a66b3e,#5a2d14);box-shadow:0 17px 20px #000b}
.h81-hooks{position:absolute;left:9%;right:9%;top:87px;height:34px;border-bottom:9px solid #3a2012}
.h81-hooks i{display:inline-block;width:16%;height:30px;margin:0 2%;border-left:6px solid #c3a06c;border-bottom:6px solid #c3a06c;border-radius:0 0 0 10px}
.h81-boots{position:absolute;left:9%;right:9%;bottom:35px;display:flex;justify-content:space-around}
.h81-boots i{width:58px;height:96px;border:7px solid #1e130e;border-radius:8px 8px 22px 9px;background:linear-gradient(90deg,#402b22,#15100d);box-shadow:20px 24px 0 -8px #20150f}
@media(max-width:520px){#hq66.fix84 .h81-hq-room{min-height:620px}.h81-map,.h81-console{width:88%;left:6%;right:auto}.h81-map{top:145px}.h81-console{top:350px}.h81-cabinets{display:none}.h82-corner{width:58px;height:58px}.h84-control-bar button{min-height:50px;font-size:11px}.h84-control-panel button{min-height:68px;font-size:14px}}
`;
document.head.appendChild(css);

if(bible&&book&&next&&prev){
 bible.classList.remove('fix81','fix82','fix83');bible.classList.add('fix84');
 const stage=book.closest('.h74-stage');
 const controlBar=document.createElement('div');controlBar.className='h84-control-bar';
 controlBar.innerHTML='<button id="h84-open-controls">PAGE CONTROLS • PHONE WIDTH • HEIGHT • GLIDE</button>';
 stage.parentNode.insertBefore(controlBar,stage);
 const controls=document.createElement('div');controls.className='h84-control-panel';controls.setAttribute('aria-label','Bible page size and glide controls');
 controls.innerHTML='<output class="h84-panel-readout" id="h84-page-readout"></output><button id="h84-glide-slower">GLIDE<br>SLOWER</button><button id="h84-glide-faster">GLIDE<br>FASTER</button><button id="h84-width-narrow">WIDTH<br>NARROWER</button><button id="h84-width-wide">WIDTH<br>WIDER</button><button id="h84-height-short">HEIGHT<br>SHORTER</button><button id="h84-height-tall">HEIGHT<br>TALLER</button><button id="h84-size-normal">NORMAL<br>SIZE</button><button class="h84-panel-close" id="h84-close-controls">SAVE & CLOSE CONTROLS</button>';
 bible.appendChild(controls);
 book.insertAdjacentHTML('beforeend','<span class="h82-corner left" aria-hidden="true"></span><span class="h82-corner right" aria-hidden="true"></span><div class="h82-contact-shadow" id="h82-shadow"></div><div class="h82-page-mesh" id="h82-mesh"></div><span class="h82-paper-edge" id="h82-edge" hidden></span><span class="h82-finger-curl" id="h82-grab" aria-hidden="true"></span>');
 const mesh=document.getElementById('h82-mesh'),shadow=document.getElementById('h82-shadow'),edge=document.getElementById('h82-edge'),grab=document.getElementById('h82-grab');
 const SEGMENTS=24,pointers=new Map();
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 const smooth=v=>v*v*(3-2*v);
 let mode='idle',corner='',owner=null,startX=0,startY=0,lastX=0,lastT=0,progress=0,dragY=0,startDistance=0,startFont=20,currentFont=20,pageW=0,pageH=0,stripW=0,strips=[],anim=0;
 let glideMs=clamp(Number(localStorage.getItem('osko_bible_glide_ms'))||1550,900,2600);
 let bookWidth=clamp(Number(localStorage.getItem('osko_bible_book_width'))||100,86,100);
 let bookHeight=clamp(Number(localStorage.getItem('osko_bible_book_height'))||100,65,100);
 const getFont=()=>{const n=parseFloat(getComputedStyle(bible).getPropertyValue('--h75-font'));return Number.isFinite(n)?n:(Number(localStorage.getItem('osko_bible_font_px'))||20)};
 const distance=()=>{const p=[...pointers.values()];return p.length<2?0:Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y)};
 const readout=document.getElementById('h84-page-readout');
 function showPageControls(save){
  bible.style.setProperty('--h84-book-width',bookWidth+'%');bible.style.setProperty('--h84-book-height',bookHeight+'%');
  const label='GLIDE '+(glideMs/1000).toFixed(2)+' SEC • WIDTH '+bookWidth+'% • HEIGHT '+bookHeight+'%';
  if(readout)readout.textContent=label;if(controlBar.firstElementChild)controlBar.firstElementChild.textContent='PAGE CONTROLS • '+label;
  if(save)try{localStorage.setItem('osko_bible_glide_ms',String(glideMs));localStorage.setItem('osko_bible_book_width',String(bookWidth));localStorage.setItem('osko_bible_book_height',String(bookHeight))}catch(_){}
 }
 function cleanPageHTML(source){const clone=source.cloneNode(true);clone.querySelectorAll('[id]').forEach(n=>n.removeAttribute('id'));return clone.innerHTML}
 function showFont(px,save){
  currentFont=clamp(px,16,52);bible.style.setProperty('--h75-font',currentFont.toFixed(2)+'px');
  if(sizeLabel)sizeLabel.innerHTML='TEXT SIZE '+Math.round(currentFont/20*100)+'%<small>'+Math.round(currentFont)+' PIXEL BIBLE PRINT • PINCH OR BUTTONS</small>';
  if(status)status.textContent='BIBLE PRINT • '+Math.round(currentFont/20*100)+'%'+(save?' • SAVED':' • PINCH TO ADJUST');
  if(save)try{localStorage.setItem('osko_bible_font_px',String(Math.round(currentFont)))}catch(_){}
 }
 function buildMesh(side){
  const source=book.querySelector(side==='right'?'.h74-page.right':'.h74-page.left');if(!source)return false;
  const br=book.getBoundingClientRect(),sr=source.getBoundingClientRect();pageW=Math.max(120,sr.width);pageH=Math.max(180,sr.height);stripW=pageW/SEGMENTS;
  mesh.style.left=(sr.left-br.left)+'px';mesh.style.top=(sr.top-br.top)+'px';mesh.style.width=pageW+'px';mesh.style.height=pageH+'px';mesh.className='h82-page-mesh on '+side;mesh.innerHTML='';
  const html=cleanPageHTML(source);strips=[];
  for(let i=0;i<SEGMENTS;i++){
   const s=document.createElement('div');s.className='h82-strip';s.style.left=(i*stripW-.2)+'px';s.style.width=(stripW+.7)+'px';
   const f=document.createElement('div');f.className='h82-face front';f.style.width=(stripW+.8)+'px';
   const c=document.createElement('div');c.className='h82-strip-content';c.style.width=pageW+'px';c.style.left=(-i*stripW)+'px';c.innerHTML=html;f.appendChild(c);
   const b=document.createElement('div');b.className='h82-face back';b.style.width=(stripW+.8)+'px';
   s.append(f,b);mesh.appendChild(s);strips.push(s);
  }
  edge.hidden=false;grab.className='h82-finger-curl on';return true;
 }
 function renderCurl(p,y,landing=0){
  progress=clamp(p,0,1);dragY=clamp(y,-pageH*.2,pageH*.42);const sideSign=corner==='right'?-1:1;
  const front=1-progress*1.06,curlWidth=.20+.16*Math.sin(progress*Math.PI),globalPull=progress*pageW*.11;
  const topLand=smooth(clamp(landing/.42,0,1)),bodyLand=smooth(clamp((landing-.24)/.76,0,1));
  strips.forEach((s,i)=>{
   const pageU=corner==='right'?(i+.5)/SEGMENTS:1-(i+.5)/SEGMENTS;
   const rolled=clamp((pageU-front)/curlWidth,0,1),turn=smooth(rolled);
   const angle=sideSign*turn*(24+progress*154);
   const flatten=1-bodyLand*.96;
   const roll=Math.sin(turn*Math.PI)*Math.min(32,pageW*.09)*(0.35+progress*.65)*flatten;
   const slide=sideSign*(globalPull*pageU+turn*stripW*1.15+topLand*pageW*.085*(1-pageU*.30));
   const lift=(dragY*pageU*(.16+.50*progress)-Math.sin(pageU*Math.PI)*5*progress)*flatten;
   const pitch=Math.sin(clamp(landing,0,1)*Math.PI)*11;
   s.style.transformOrigin=(corner==='right'?'0':'100%')+' 3%';
   s.style.transform='translate3d('+slide.toFixed(2)+'px,'+lift.toFixed(2)+'px,'+roll.toFixed(2)+'px) rotateX('+pitch.toFixed(2)+'deg) rotateY('+angle.toFixed(2)+'deg)';
   s.style.filter='brightness('+(1-turn*.22+Math.sin(turn*Math.PI)*.10).toFixed(3)+')';
   s.style.zIndex=String(100+Math.round(roll));
  });
  const contact=corner==='right'?pageW*(1-front):pageW*front;
  shadow.style.left=(parseFloat(mesh.style.left)+contact-19)+'px';shadow.style.top=mesh.style.top;shadow.style.height=pageH+'px';shadow.style.opacity=String(Math.min(.72,.12+progress*.72)*(1-bodyLand*.94));shadow.style.transform='translateX('+(sideSign*(globalPull*.35+topLand*pageW*.085))+'px) skewY('+(sideSign*progress*4*(1-bodyLand))+'deg)';
  const edgeX=corner==='right'?parseFloat(mesh.style.left)+pageW-progress*pageW*.78:parseFloat(mesh.style.left)+progress*pageW*.78;
  const edgeY=parseFloat(mesh.style.top)+dragY*(.45+.45*progress);
  edge.style.left=(edgeX-2)+'px';edge.style.top=parseFloat(mesh.style.top)+'px';edge.style.height=pageH+'px';edge.style.transform='translateY('+(edgeY-parseFloat(mesh.style.top))+'px) rotateY('+(sideSign*progress*155)+'deg)';
  grab.style.opacity=String(.92*(1-topLand));grab.style.transform='translate3d('+(edgeX-21)+'px,'+(edgeY-15-topLand*8)+'px,70px) rotate('+(sideSign*(18+progress*55))+'deg) scale('+(0.72+progress*.32)+')';
 }
 function clearMesh(){
  cancelAnimationFrame(anim);anim=0;mesh.className='h82-page-mesh';mesh.innerHTML='';shadow.style.opacity='0';shadow.removeAttribute('style');edge.hidden=true;edge.removeAttribute('style');grab.className='h82-finger-curl';grab.removeAttribute('style');bible.classList.remove('h82-turning');strips=[];mode='idle';corner='';owner=null;progress=0;dragY=0;
 }
 function beginCorner(side,e){
  cancelAnimationFrame(anim);corner=side;owner=e.pointerId;startX=lastX=e.clientX;startY=e.clientY;lastT=performance.now();progress=0;dragY=0;
  if(!buildMesh(side)){clearMesh();return}mode='corner';bible.classList.add('h82-turning');renderCurl(.018,0);if(status)status.textContent='HOLD THE PAGE • PULL IT SLOWLY LIKE REAL PAPER';
 }
 function updateCorner(e){
  const inward=corner==='right'?startX-e.clientX:e.clientX-startX;const down=e.clientY-startY;
  renderCurl(inward/(pageW*.88),down);lastX=e.clientX;lastT=performance.now();
 }
 function settle(commit){
  const from=progress,to=commit?1:0,fromY=dragY,duration=commit?glideMs:420,start=performance.now(),side=corner;
  mode='animating';
  function frame(now){const t=clamp((now-start)/duration,0,1);let p,y,landing=0;
   if(commit&&t<.66){const a=smooth(t/.66);p=from+(.93-from)*a;y=fromY*(1-a*.55)}
   else if(commit){const a=smooth((t-.66)/.34);p=.93+.07*a;y=fromY*.45*(1-a);landing=a}
   else{const a=smooth(t);p=from*(1-a);y=fromY*(1-a)}
   renderCurl(p,y,landing);if(t<1){anim=requestAnimationFrame(frame);return}
   if(commit){if(navigator.vibrate)navigator.vibrate(18);(side==='right'?next:prev).click()}clearMesh();if(status)status.textContent='KING JAMES VERSION • REAL FINGERTIP PAGE ROLL • PINCH TO ENLARGE';
  }anim=requestAnimationFrame(frame);
 }
 function isBookTarget(t){return !!(t&&t.closest&&t.closest('#h74-open-book'))}
 function pointerDown(e){
  if(!bible.classList.contains('open')||!isBookTarget(e.target)||mode==='animating')return;
  pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});e.stopImmediatePropagation();
  if(pointers.size===2){if(mode==='corner')clearMesh();mode='pinch';bible.classList.add('h82-pinching');startDistance=Math.max(20,distance());startFont=currentFont=getFont();e.preventDefault();return}
  const r=book.getBoundingClientRect(),top=e.clientY-r.top,left=e.clientX-r.left;
  if(top<=r.height*.30&&left<=r.width*.25)beginCorner('left',e);
  else if(top<=r.height*.30&&left>=r.width*.75)beginCorner('right',e);
  else mode='reading';
 }
 function pointerMove(e){
  if(!pointers.has(e.pointerId))return;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});e.stopImmediatePropagation();
  if(mode==='pinch'){e.preventDefault();showFont(startFont*(distance()/startDistance),false)}
  else if(mode==='corner'&&e.pointerId===owner){e.preventDefault();updateCorner(e)}
 }
 function pointerEnd(e){
  if(!pointers.has(e.pointerId))return;e.stopImmediatePropagation();const was=mode;pointers.delete(e.pointerId);
  if(was==='pinch'){e.preventDefault();if(pointers.size<2){bible.classList.remove('h82-pinching');showFont(currentFont,true);mode=pointers.size?'blocked':'idle'}}
  else if(was==='corner'&&e.pointerId===owner){e.preventDefault();const travel=Math.abs(e.clientX-startX),elapsed=Math.max(1,performance.now()-lastT),velocity=Math.abs(e.clientX-lastX)/elapsed;settle(progress>=.38||(travel>pageW*.27&&velocity>.26))}
  else if(was==='reading'&&!pointers.size)mode='idle';
  if(!pointers.size&&mode==='blocked')mode='idle';
 }
 window.addEventListener('pointerdown',pointerDown,{capture:true,passive:false});
 window.addEventListener('pointermove',pointerMove,{capture:true,passive:false});
 window.addEventListener('pointerup',pointerEnd,{capture:true,passive:false});
 window.addEventListener('pointercancel',e=>{if(mode==='corner'&&e.pointerId===owner)settle(false);else pointerEnd(e)},{capture:true,passive:false});
 window.addEventListener('click',e=>{const id=e.target&&e.target.id;if(!['h75-smaller','h75-larger','h75-reset'].includes(id))return;e.preventDefault();e.stopImmediatePropagation();currentFont=getFont();showFont(id==='h75-reset'?20:currentFont+(id==='h75-larger'?2:-2),true)},{capture:true});
 controlBar.addEventListener('click',()=>controls.classList.add('open'));
 controls.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
  if(b.id==='h84-glide-slower')glideMs=clamp(glideMs+250,900,2600);
  if(b.id==='h84-glide-faster')glideMs=clamp(glideMs-250,900,2600);
  if(b.id==='h84-width-narrow')bookWidth=clamp(bookWidth-4,86,100);
  if(b.id==='h84-width-wide')bookWidth=clamp(bookWidth+4,86,100);
  if(b.id==='h84-height-short')bookHeight=clamp(bookHeight-5,65,100);
  if(b.id==='h84-height-tall')bookHeight=clamp(bookHeight+5,65,100);
  if(b.id==='h84-size-normal'){bookWidth=100;bookHeight=100}
  if(b.id==='h84-close-controls')controls.classList.remove('open');
  showPageControls(true);if(status)status.textContent='PAGE CONTROLS SAVED • WIDTH '+bookWidth+'% • HEIGHT '+bookHeight+'%';
 });
 currentFont=getFont();showFont(currentFont,false);showPageControls(false);
}

if(root){
 root.classList.remove('fix81','fix82','fix83');root.classList.add('fix84');
 const down=root.querySelector('#h69-down .h69-living');
 if(down&&!down.querySelector('.h81-mudroom'))down.insertAdjacentHTML('beforeend',`<section class="h81-hq-room h81-mudroom"><h2>Alaska Gear & Mudroom</h2><div class="h81-hooks">${'<i></i>'.repeat(5)}</div><div class="h81-bench"></div><div class="h81-boots">${'<i></i>'.repeat(4)}</div></section>`);
 const up=root.querySelector('.h72-upstairs')||root.querySelector('#h69-up .h69-up');
 if(up&&!up.querySelector('.h81-command-room'))up.insertAdjacentHTML('beforeend',`<section class="h81-hq-room h81-command-room"><h2>SKIE Command Study</h2><div class="h81-antlers"></div><div class="h81-map"></div><div class="h81-console">${'<i></i>'.repeat(4)}</div><div class="h81-cabinets">${'<i></i>'.repeat(4)}</div></section>`);
 const title=root.querySelector('.h69-title span');if(title)title.textContent='COMPLETE HQ • FINGERTIP-ROLL KJV BIBLE • FINISHED BOTH FLOORS';
}
})();
