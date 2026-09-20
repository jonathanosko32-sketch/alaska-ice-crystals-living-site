(function hq75FoldZoomControls(){
'use strict';
const root=document.getElementById('hq66'),bible=document.getElementById('bible66');
if(!root||!bible||document.getElementById('hq75-style'))return;
root.classList.add('fix75');

// Enlarge the installed phone shell controls while this candidate is running.
try{
 if(window.parent&&window.parent!==window){
  const pd=window.parent.document;let ps=pd.getElementById('fix75-phone-controls');
  if(!ps){ps=pd.createElement('style');ps.id='fix75-phone-controls';pd.head.appendChild(ps)}
  ps.textContent='.bar{gap:13px!important;padding:15px!important}.btn{min-height:84px!important;min-width:84px!important;padding:17px 22px!important;font-size:21px!important;border-radius:15px!important}.state{font-size:19px!important}.panel .btn{min-height:88px!important;font-size:20px!important}';
 }
}catch(_){}

const css=document.createElement('style');
css.id='hq75-style';
css.textContent=`
/* Larger exterior and Headquarters controls. */
#view-toggle{width:148px!important;height:88px!important;min-width:148px!important;min-height:88px!important;font-size:21px!important}
#view-adjust button{width:142px!important;height:114px!important;min-width:142px!important;min-height:114px!important;font-size:42px!important}
#dock>button{height:94px!important;min-height:94px!important;font-size:21px!important}
.chip{min-width:106px!important;min-height:76px!important;padding:15px 20px!important;font-size:18px!important}
#hq66.fix75 .h69-head{grid-template-columns:104px 1fr 104px;min-height:106px}
#hq66.fix75 .h69-head button{min-width:102px!important;min-height:92px!important;font-size:20px!important}
#hq66.fix75 .h69-tabs button{min-height:104px!important;font-size:23px!important}
#hq66.fix75 .h69-foot button{height:104px!important;min-height:104px!important;font-size:22px!important}
#hq66.fix75 .h70-controls button{min-height:94px!important;font-size:18px!important}

/* Bible control enlargement and adjustable print. */
.bible66.h74-reader .h74-head{gap:11px;padding:13px}
.bible66.h74-reader .h74-head select,.bible66.h74-reader .h74-head input,.bible66.h74-reader .h74-head button{height:78px!important;font-size:20px!important}
.bible66.h74-reader .h74-head button{font-size:18px!important}
.h75-text-tools{flex:0 0 auto;display:grid;grid-template-columns:1fr 1fr 1fr 1.15fr;gap:10px;margin:8px 3px 0;padding:9px;border:2px solid #c5a05e;border-radius:15px;background:linear-gradient(#2d1b11,#160d08)}
.h75-text-tools button{height:82px;border:2px solid #d3aa62;border-radius:14px;background:linear-gradient(#775029,#3b2313);color:#fff1cb;font:900 18px system-ui;letter-spacing:.05em}
.h75-text-size{display:grid;place-items:center;border:2px solid #55d8f2;border-radius:14px;background:#07394a;color:#d7fbff;text-align:center;font:900 17px system-ui;letter-spacing:.06em}
.h75-text-size small{display:block;font-size:11px;color:#92ddeb}
.bible66.h74-reader .h74-status{font-size:15px!important;padding:10px!important}
.bible66.h74-reader .h74-nav button{height:96px!important;font-size:19px!important}
.bible66.h74-reader .h74-book{height:min(59vh,700px)}
.bible66.h74-reader .h74-verses{font-size:var(--h75-font,20px)!important;line-height:1.58!important}

/* The moving sheet carries the real printed scripture while it folds and rolls. */
.bible66.h74-reader .h74-turn{overflow:hidden;background:#fffdf4;box-shadow:-18px 2px 32px #000b,0 0 0 1px #b59c68}
.bible66.h74-reader .h74-turn:before{opacity:.24}
.h75-fold-page{position:absolute;inset:0;z-index:3;overflow:hidden;padding:28px clamp(15px,3vw,38px);background:linear-gradient(90deg,#d5c497,#fffdf3 7%,#fffef8 91%,#cdbc8b);color:#21170f;backface-visibility:hidden}
.h75-fold-page h2{margin:0 0 5px;text-align:center;font:900 clamp(21px,4.6vw,33px) Georgia}
.h75-fold-page .h74-edition{text-align:center;padding-bottom:10px;margin-bottom:10px;border-bottom:1px solid #b7a16d;color:#725d38;font:900 10px system-ui;letter-spacing:.14em}
.h75-fold-page .h74-verses{font-size:var(--h75-font,20px)!important;line-height:1.55!important}
.h75-fold-page .h74-page-num{display:none}
.bible66.h74-reader .h74-turn.forward{animation:h75Forward .8s cubic-bezier(.38,0,.18,1)!important}
.bible66.h74-reader .h74-turn.backward{animation:h75Backward .8s cubic-bezier(.38,0,.18,1)!important}
@keyframes h75Forward{
 0%{transform:rotateY(0) rotateX(0) scaleX(1);border-radius:0 10px 10px 0;filter:brightness(1)}
 18%{transform:rotateY(-22deg) rotateX(3deg) translateY(-7px) scaleX(.96);border-radius:38% 10px 12px 45%;filter:brightness(1.05)}
 48%{transform:rotateY(-86deg) rotateX(-2deg) translateY(-10px) scaleX(.72);border-radius:55% 5px 5px 55%;filter:brightness(.78)}
 76%{transform:rotateY(-151deg) rotateX(2deg) translateY(-5px) scaleX(.92);border-radius:12px 48% 48% 12px;filter:brightness(.9)}
 100%{transform:rotateY(-180deg) rotateX(0) scaleX(1);border-radius:10px 0 0 10px;filter:brightness(1)}
}
@keyframes h75Backward{
 0%{transform:rotateY(0) rotateX(0) scaleX(1);border-radius:10px 0 0 10px;filter:brightness(1)}
 18%{transform:rotateY(22deg) rotateX(3deg) translateY(-7px) scaleX(.96);border-radius:10px 38% 45% 12px;filter:brightness(1.05)}
 48%{transform:rotateY(86deg) rotateX(-2deg) translateY(-10px) scaleX(.72);border-radius:5px 55% 55% 5px;filter:brightness(.78)}
 76%{transform:rotateY(151deg) rotateX(2deg) translateY(-5px) scaleX(.92);border-radius:48% 12px 12px 48%;filter:brightness(.9)}
 100%{transform:rotateY(180deg) rotateX(0) scaleX(1);border-radius:0 10px 10px 0;filter:brightness(1)}
}

@media(max-width:620px){
 #hq66.fix75 .h69-head{grid-template-columns:86px 1fr 86px}
 #hq66.fix75 .h69-head button{min-width:84px!important;font-size:17px!important}
 #hq66.fix75 .h69-tabs button{font-size:20px!important}
 .h75-text-tools{grid-template-columns:1fr 1fr 1fr;gap:7px}
 .h75-text-tools button{height:76px;font-size:15px}.h75-text-size{grid-column:1/-1;min-height:58px}
 .bible66.h74-reader .h74-head select,.bible66.h74-reader .h74-head input,.bible66.h74-reader .h74-head button{height:70px!important;font-size:17px!important}
 .bible66.h74-reader .h74-book{height:min(55vh,640px)}
 .bible66.h74-reader .h74-nav button{height:88px!important;font-size:15px!important}
 .h75-fold-page{padding:21px 13px}
}
`;
document.head.appendChild(css);

const status=document.getElementById('h74-status');
if(status&&!document.getElementById('h75-text-tools')){
 status.insertAdjacentHTML('afterend','<div class="h75-text-tools" id="h75-text-tools"><button id="h75-smaller">A−<br>TEXT SMALLER</button><button id="h75-larger">A＋<br>TEXT LARGER</button><button id="h75-reset">RESET TEXT</button><div class="h75-text-size" id="h75-size">TEXT SIZE 100%<small>PINCH-FREE READING</small></div></div>');
}

const sizes=[16,18,20,23,26,30,34,38,42];let sizeIndex=2;
try{const saved=Number(localStorage.getItem('osko_bible_font_px'));const found=sizes.indexOf(saved);if(found>=0)sizeIndex=found}catch(_){}
function applySize(){
 const px=sizes[sizeIndex];bible.style.setProperty('--h75-font',px+'px');
 const label=document.getElementById('h75-size');if(label)label.innerHTML='TEXT SIZE '+Math.round(px/20*100)+'%<small>'+px+' PIXEL BIBLE PRINT</small>';
 try{localStorage.setItem('osko_bible_font_px',String(px))}catch(_){}
}
document.getElementById('h75-smaller').onclick=()=>{sizeIndex=Math.max(0,sizeIndex-1);applySize()};
document.getElementById('h75-larger').onclick=()=>{sizeIndex=Math.min(sizes.length-1,sizeIndex+1);applySize()};
document.getElementById('h75-reset').onclick=()=>{sizeIndex=2;applySize()};
applySize();

const turn=document.getElementById('h74-turn'),next=document.getElementById('h74-next'),prev=document.getElementById('h74-prev'),openBook=document.getElementById('h74-open-book');
function prepareFold(direction){
 if(!turn)return;
 const source=document.querySelector(direction==='next'?'.h74-page.right':'.h74-page.left');
 if(source)turn.innerHTML='<div class="h75-fold-page">'+source.innerHTML+'</div>';
}
if(next)next.addEventListener('pointerdown',()=>prepareFold('next'),true);
if(prev)prev.addEventListener('pointerdown',()=>prepareFold('prev'),true);
let foldStart=0;
if(openBook){
 openBook.addEventListener('pointerdown',e=>{foldStart=e.clientX},true);
 openBook.addEventListener('pointerup',e=>{const dx=e.clientX-foldStart;if(dx<-45)prepareFold('next');else if(dx>45)prepareFold('prev')},true);
}
})();
