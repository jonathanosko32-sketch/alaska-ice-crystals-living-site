(function oskoFix81RealBibleAndMoreHQ(){
'use strict';
if(window.__oskoFix81)return;window.__oskoFix81=true;

const bible=document.getElementById('bible66');
const book=document.getElementById('h74-open-book');
const next=document.getElementById('h74-next');
const prev=document.getElementById('h74-prev');
const status=document.getElementById('h74-status');
const sizeLabel=document.getElementById('h75-size');
const root=document.getElementById('hq66');

const css=document.createElement('style');
css.id='hq81-style';
css.textContent=`
/* FIX81 — a real-book gesture: only the upper outside corners start a page. */
.bible66.fix81 .h74-book{touch-action:pan-y!important;overflow:hidden}
.bible66.fix81 .h74-page{touch-action:pan-y!important}
.bible66.fix81 .h79-swipe-help{display:none!important}
.h81-corner-hint{position:absolute;z-index:18;top:8px;width:58px;height:58px;pointer-events:none;opacity:.72}
.h81-corner-hint.left{left:8px;border-top:3px solid #b98e49;border-left:3px solid #b98e49;border-radius:13px 0 0 0}
.h81-corner-hint.right{right:8px;border-top:3px solid #b98e49;border-right:3px solid #b98e49;border-radius:0 13px 0 0}
.h81-corner-hint:after{content:'TURN';position:absolute;top:12px;color:#74562d;font:900 9px system-ui;letter-spacing:.08em}
.h81-corner-hint.left:after{left:7px}.h81-corner-hint.right:after{right:7px}
.h81-corner-fold{display:none;position:absolute;z-index:40;top:0;width:50%;height:48%;pointer-events:none;transform-style:preserve-3d;will-change:clip-path,transform,filter;border-radius;background:linear-gradient(145deg,#fffef6 0 48%,#e4d4aa 65%,#8c7040 100%);box-shadow:0 15px 24px #0008;overflow:hidden}
.h81-corner-fold.on{display:block}
.h81-corner-fold.right{right:0;transform-origin:100% 0;clip-path:polygon(calc(100% - var(--curl,0)*100%) 0,100% 0,100% calc(var(--curl,0)*100%));border-radius:0 10px 0 calc(var(--curl,0)*70%)}
.h81-corner-fold.left{left:0;transform-origin:0 0;clip-path:polygon(0 0,calc(var(--curl,0)*100%) 0,0 calc(var(--curl,0)*100%));border-radius:10px 0 calc(var(--curl,0)*70%) 0}
.h81-corner-fold:before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent 0 23px,#ad986744 24px 25px),radial-gradient(ellipse at top,#fffef8,#eadfbe 72%,#a58b57);opacity:.85}
.h81-corner-fold:after{content:'';position:absolute;top:0;width:38%;height:100%;background:linear-gradient(90deg,transparent,#6b512c88);filter:blur(6px)}
.h81-corner-fold.right:after{left:0}.h81-corner-fold.left:after{right:0;transform:scaleX(-1)}
.bible66.fix81.h81-turning .h74-turn{opacity:0!important}
.bible66.fix81.h81-pinching .h81-corner-hint{opacity:.2}
.bible66.fix81.h81-pinching .h74-book{filter:drop-shadow(0 0 14px #56dbff88)}

/* Extra HQ rooms and finishing work. */
#hq66.fix81 .h81-hq-room{position:relative;overflow:hidden;min-height:520px;margin-top:24px;padding:24px;border:8px solid #30170a;border-radius:25px;background:linear-gradient(155deg,#98623bee,#5b3119f4 62%,#31170bed);box-shadow:0 28px 42px #000c,inset 0 0 42px #170803,0 0 0 2px #c28c5544}
#hq66.fix81 .h81-hq-room:after{content:'';position:absolute;inset:12px;border:1px solid #e0b06b3b;border-radius:15px;pointer-events:none}
#hq66.fix81 .h81-hq-room h2{position:relative;z-index:4;margin:0;text-align:center;color:#ffe2aa;font:900 28px Georgia;letter-spacing:.08em;text-shadow:0 3px 5px #000}
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
@media(max-width:520px){#hq66.fix81 .h81-hq-room{min-height:620px}.h81-map,.h81-console{width:88%;left:6%;right:auto}.h81-map{top:145px}.h81-console{top:350px}.h81-cabinets{display:none}.h81-corner-hint{width:48px;height:48px}}
`;
document.head.appendChild(css);

/* Build the real top-corner page gesture without removing the manual buttons. */
if(bible&&book&&next&&prev){
 bible.classList.add('fix81');
 book.insertAdjacentHTML('beforeend','<span class="h81-corner-hint left" aria-hidden="true"></span><span class="h81-corner-hint right" aria-hidden="true"></span><span class="h81-corner-fold" id="h81-corner-fold" aria-hidden="true"></span>');
 const fold=document.getElementById('h81-corner-fold');
 const pointers=new Map();
 let mode='idle',corner='',owner=null,startX=0,startY=0,progress=0,startDistance=0,startFont=20,currentFont=20;
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 const getFont=()=>{const n=parseFloat(getComputedStyle(bible).getPropertyValue('--h75-font'));return Number.isFinite(n)?n:(Number(localStorage.getItem('osko_bible_font_px'))||20)};
 const distance=()=>{const p=[...pointers.values()];return p.length<2?0:Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y)};
 function showFont(px,save){
  currentFont=clamp(px,16,52);bible.style.setProperty('--h75-font',currentFont.toFixed(2)+'px');
  if(sizeLabel)sizeLabel.innerHTML='TEXT SIZE '+Math.round(currentFont/20*100)+'%<small>'+Math.round(currentFont)+' PIXEL BIBLE PRINT • PINCH OR BUTTONS</small>';
  if(status)status.textContent='BIBLE PRINT • '+Math.round(currentFont/20*100)+'%'+(save?' • SAVED':' • PINCH TO ADJUST');
  if(save)try{localStorage.setItem('osko_bible_font_px',String(Math.round(currentFont)))}catch(_){}
 }
 function clearFold(){fold.className='h81-corner-fold';fold.style.removeProperty('--curl');mode='idle';corner='';owner=null;progress=0}
 function beginCorner(side,e){mode='corner';corner=side;owner=e.pointerId;startX=e.clientX;startY=e.clientY;fold.className='h81-corner-fold on '+side;fold.style.setProperty('--curl','.06');if(status)status.textContent='HOLD THE TOP CORNER AND TURN THE PAGE'}
 function updateCorner(e){
  const rect=book.getBoundingClientRect();
  const inward=corner==='right'?startX-e.clientX:e.clientX-startX;
  const down=Math.max(0,e.clientY-startY);
  progress=clamp((inward+down*.28)/(rect.width*.42),0,1);
  fold.style.setProperty('--curl',String(Math.max(.06,progress)));
  fold.style.transform='rotateY('+(corner==='right'?-progress*48:progress*48)+'deg) translateY('+(progress*7)+'px)';
 }
 function finishCorner(commit){
  if(!commit){fold.style.transition='all .2s ease';fold.style.setProperty('--curl','0');setTimeout(()=>{fold.style.transition='';clearFold()},210);return}
  bible.classList.add('h81-turning');fold.style.transition='all .82s cubic-bezier(.35,0,.2,1)';fold.style.setProperty('--curl','1');fold.style.transform='rotateY('+(corner==='right'?-165:165)+'deg) translateY(18px) scaleX(.82)';
  const button=corner==='right'?next:prev;
  setTimeout(()=>button.click(),70);
  setTimeout(()=>{bible.classList.remove('h81-turning');fold.style.transition='';clearFold();if(status)status.textContent='KING JAMES VERSION • TOP CORNER PAGE TURN • PINCH TO ENLARGE'},850);
 }
 function isInsideBook(target){return !!(target&&target.closest&&target.closest('#h74-open-book'))}
 window.addEventListener('pointerdown',e=>{
  if(!bible.classList.contains('open')||!isInsideBook(e.target))return;
  pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
  e.stopImmediatePropagation();
  if(pointers.size===2){
   if(mode==='corner')clearFold();mode='pinch';bible.classList.add('h81-pinching');startDistance=Math.max(20,distance());startFont=currentFont=getFont();e.preventDefault();return;
  }
  const r=book.getBoundingClientRect(),top=e.clientY-r.top,left=e.clientX-r.left;
  if(top<=r.height*.28&&left<=r.width*.28)beginCorner('left',e);
  else if(top<=r.height*.28&&left>=r.width*.72)beginCorner('right',e);
 },{capture:true,passive:false});
 window.addEventListener('pointermove',e=>{
  if(!pointers.has(e.pointerId))return;
  pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});e.stopImmediatePropagation();
  if(mode==='pinch'){e.preventDefault();showFont(startFont*(distance()/startDistance),false)}
  else if(mode==='corner'&&e.pointerId===owner){e.preventDefault();updateCorner(e)}
 },{capture:true,passive:false});
 function endPointer(e){
  if(!pointers.has(e.pointerId))return;
  e.stopImmediatePropagation();const wasMode=mode;pointers.delete(e.pointerId);
  if(wasMode==='pinch'){e.preventDefault();if(pointers.size<2){bible.classList.remove('h81-pinching');showFont(currentFont,true);mode=pointers.size?'blocked':'idle'}}
  else if(wasMode==='corner'&&e.pointerId===owner){e.preventDefault();finishCorner(progress>=.34)}
  if(!pointers.size&&mode==='blocked')mode='idle';
 }
 window.addEventListener('pointerup',endPointer,{capture:true,passive:false});
 window.addEventListener('pointercancel',endPointer,{capture:true,passive:false});
 window.addEventListener('click',e=>{
  const id=e.target&&e.target.id;if(!['h75-smaller','h75-larger','h75-reset'].includes(id))return;
  e.preventDefault();e.stopImmediatePropagation();currentFont=getFont();showFont(id==='h75-reset'?20:currentFont+(id==='h75-larger'?2:-2),true);
 },{capture:true});
 currentFont=getFont();showFont(currentFont,false);
 }

/* Add visible, finished space to both HQ floors; preserve every existing room. */
if(root){
 root.classList.add('fix81');
 const down=root.querySelector('#h69-down .h69-living');
 if(down&&!down.querySelector('.h81-mudroom'))down.insertAdjacentHTML('beforeend',`<section class="h81-hq-room h81-mudroom"><h2>Alaska Gear & Mudroom</h2><div class="h81-hooks">${'<i></i>'.repeat(5)}</div><div class="h81-bench"></div><div class="h81-boots">${'<i></i>'.repeat(4)}</div></section>`);
 const up=root.querySelector('.h72-upstairs')||root.querySelector('#h69-up .h69-up');
 if(up&&!up.querySelector('.h81-command-room'))up.insertAdjacentHTML('beforeend',`<section class="h81-hq-room h81-command-room"><h2>SKIE Command Study</h2><div class="h81-antlers"></div><div class="h81-map"></div><div class="h81-console">${'<i></i>'.repeat(4)}</div><div class="h81-cabinets">${'<i></i>'.repeat(4)}</div></section>`);
 const title=root.querySelector('.h69-title span');if(title)title.textContent='COMPLETE HQ • REAL KJV BIBLE • FINISHED BOTH FLOORS';
}
})();
