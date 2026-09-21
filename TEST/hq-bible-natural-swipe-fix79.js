(function hq79NaturalBibleSwipe(){
'use strict';
const bible=document.getElementById('bible66');
const book=document.getElementById('h74-open-book');
const turn=document.getElementById('h74-turn');
const next=document.getElementById('h74-next');
const prev=document.getElementById('h74-prev');
const status=document.getElementById('h74-status');
if(!bible||!book||!turn||!next||!prev||document.getElementById('hq79-style'))return;
bible.classList.add('fix79');

const css=document.createElement('style');
css.id='hq79-style';
css.textContent=`
/* Natural phone reading: vertical movement scrolls text; horizontal movement turns paper. */
.bible66.fix79 .h74-book{touch-action:pan-y pinch-zoom;user-select:none;-webkit-user-select:none}
.bible66.fix79 .h74-page{touch-action:pan-y pinch-zoom;overscroll-behavior-y:contain}
.bible66.fix79 .h74-book.h79-swiping{cursor:grabbing}
.bible66.fix79 .h74-book.h79-swiping .h74-page{overflow:hidden}
.bible66.fix79 .h74-turn.h79-drag{display:block!important;animation:none!important;transform-style:preserve-3d!important;will-change:transform,filter;border-radius;pointer-events:none}
.bible66.fix79 .h74-turn.h79-drag.forward{right:0;left:auto;transform-origin:left center;transform:rotateY(calc(var(--h79-progress,0) * -168deg)) scaleX(calc(1 - var(--h79-bend,0) * .17));border-radius:calc(var(--h79-bend,0) * 48%) 10px 10px calc(var(--h79-bend,0) * 48%);filter:brightness(calc(1 - var(--h79-bend,0) * .14))}
.bible66.fix79 .h74-turn.h79-drag.backward{left:0;right:auto;transform-origin:right center;transform:rotateY(calc(var(--h79-progress,0) * 168deg)) scaleX(calc(1 - var(--h79-bend,0) * .17));border-radius:10px calc(var(--h79-bend,0) * 48%) calc(var(--h79-bend,0) * 48%) 10px;filter:brightness(calc(1 - var(--h79-bend,0) * .14))}
.bible66.fix79 .h74-turn.h79-drag:before{opacity:calc(.45 + var(--h79-bend,0) * .45)}
.bible66.fix79 .h74-turn.h79-drag:after{width:calc(20px + var(--h79-bend,0) * 46px);filter:blur(calc(3px + var(--h79-bend,0) * 5px));opacity:calc(.3 + var(--h79-bend,0) * .65)}
.bible66.fix79 .h79-swipe-help{position:absolute;z-index:20;left:50%;bottom:8px;transform:translateX(-50%);max-width:88%;padding:7px 13px;border:1px solid #cfae68;border-radius:999px;background:#25150de8;color:#ffe8b5;box-shadow:0 5px 15px #0008;font:900 12px system-ui;letter-spacing:.07em;text-align:center;pointer-events:none;transition:opacity .35s}
.bible66.fix79 .h79-swipe-help.hide{opacity:0}
.bible66.fix79 .h74-nav button{touch-action:manipulation}
@media(max-width:620px){.bible66.fix79 .h79-swipe-help{font-size:11px;padding:6px 10px;bottom:5px}}
@media(prefers-reduced-motion:reduce){.bible66.fix79 .h74-turn.forward,.bible66.fix79 .h74-turn.backward{animation-duration:.28s!important}}
`;
document.head.appendChild(css);

const help=document.createElement('div');
help.className='h79-swipe-help';
help.textContent='SWIPE LEFT OR RIGHT TO TURN • MANUAL BUTTONS STILL WORK';
book.appendChild(help);

let pointerId=null,startX=0,startY=0,lastX=0,lastTime=0,startTime=0;
let horizontal=false,vertical=false,direction='',progress=0;

function sourceFor(dir){
 return book.querySelector(dir==='next'?'.h74-page.right':'.h74-page.left');
}
function prepare(dir){
 direction=dir;
 const source=sourceFor(dir);
 turn.innerHTML='<div class="h75-fold-page">'+(source?source.innerHTML:'')+'<span class="h76-top-curl" aria-hidden="true"></span></div>';
 turn.className='h74-turn h79-drag '+(dir==='next'?'forward':'backward');
 turn.style.setProperty('--h79-progress','0');
 turn.style.setProperty('--h79-bend','0');
 book.classList.add('h79-swiping');
}
function showProgress(value){
 progress=Math.max(0,Math.min(1,value));
 const bend=Math.sin(progress*Math.PI);
 turn.style.setProperty('--h79-progress',String(progress));
 turn.style.setProperty('--h79-bend',String(Math.max(.08,bend)));
}
function clearDrag(){
 book.classList.remove('h79-swiping');
 turn.style.removeProperty('--h79-progress');
 turn.style.removeProperty('--h79-bend');
 turn.className='h74-turn';
 turn.innerHTML='';
 horizontal=false;vertical=false;direction='';progress=0;pointerId=null;
}
function completeSwipe(dir){
 clearDrag();
 help.classList.add('hide');
 try{localStorage.setItem('osko_bible_swipe_learned','1')}catch(_){}
 if(navigator.vibrate)navigator.vibrate(18);
 // Use the original buttons so the full manual system and existing page animation stay authoritative.
 (dir==='next'?next:prev).click();
}
function cancelSwipe(){
 turn.style.transition='transform .2s ease,filter .2s ease';
 showProgress(0);
 setTimeout(()=>{turn.style.transition='';clearDrag()},210);
}

book.addEventListener('pointerdown',e=>{
 if(pointerId!==null||e.button>0)return;
 pointerId=e.pointerId;startX=lastX=e.clientX;startY=e.clientY;startTime=lastTime=performance.now();
 horizontal=false;vertical=false;direction='';progress=0;
 try{book.setPointerCapture(pointerId)}catch(_){}
},true);

book.addEventListener('pointermove',e=>{
 if(e.pointerId!==pointerId)return;
 const dx=e.clientX-startX,dy=e.clientY-startY,adx=Math.abs(dx),ady=Math.abs(dy);
 if(!horizontal&&!vertical){
  if(adx<12&&ady<12)return;
  if(ady>adx*1.12){vertical=true;return}
  horizontal=true;prepare(dx<0?'next':'prev');
 }
 if(vertical)return;
 e.preventDefault();e.stopImmediatePropagation();
 const width=Math.max(220,book.getBoundingClientRect().width*.72);
 const current=dx<0?'next':'prev';
 if(current!==direction)prepare(current);
 showProgress(Math.abs(dx)/width);
 lastX=e.clientX;lastTime=performance.now();
},true);

book.addEventListener('pointerup',e=>{
 if(e.pointerId!==pointerId)return;
 if(!horizontal){e.stopImmediatePropagation();pointerId=null;vertical=false;return}
 e.preventDefault();e.stopImmediatePropagation();
 const dx=e.clientX-startX,elapsed=Math.max(1,performance.now()-startTime);
 const velocity=Math.abs(dx)/elapsed;
 const commit=progress>=.26||(Math.abs(dx)>=58&&velocity>.34);
 const dir=direction;
 if(commit)completeSwipe(dir);else cancelSwipe();
},true);

book.addEventListener('pointercancel',e=>{
 if(e.pointerId===pointerId&&horizontal)cancelSwipe();else if(e.pointerId===pointerId)pointerId=null;
},true);

// Keyboard and accessibility support do not replace the visible manual controls.
bible.addEventListener('keydown',e=>{
 if(!bible.classList.contains('open'))return;
 if(e.key==='ArrowRight'){e.preventDefault();next.click()}
 if(e.key==='ArrowLeft'){e.preventDefault();prev.click()}
});

if(status)status.textContent='KING JAMES VERSION • SWIPE PAGES OR USE MANUAL BUTTONS';
try{if(localStorage.getItem('osko_bible_swipe_learned'))help.classList.add('hide')}catch(_){}
})();
