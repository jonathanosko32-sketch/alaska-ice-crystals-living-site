(function hq76FullHeightBibleAndTopCurl(){
'use strict';
const bible=document.getElementById('bible66');
const root=document.getElementById('hq66');
if(!bible||!root||document.getElementById('hq76-style'))return;
root.classList.add('fix76');

const css=document.createElement('style');
css.id='hq76-style';
css.textContent=`
/* Fill the complete reading space between the upper tools and lower page buttons. */
.bible66.h74-reader{gap:6px!important}
.bible66.h74-reader .h74-head{gap:10px!important;padding:12px!important}
.bible66.h74-reader .h74-head select,
.bible66.h74-reader .h74-head input,
.bible66.h74-reader .h74-head button{height:84px!important;min-height:84px!important}
.bible66.h74-reader .h74-status{margin-top:5px!important;padding:11px!important;font-size:16px!important}
.bible66.h74-reader .h74-stage{flex:1 1 auto!important;min-height:0!important;width:100%!important;display:flex!important;align-items:stretch!important;justify-content:center!important;padding:7px 3px!important}
.bible66.h74-reader .h74-book{align-self:stretch!important;width:min(98vw,1080px)!important;height:auto!important;max-height:none!important;min-height:0!important}
.bible66.h74-reader .h74-page{min-height:0!important;overscroll-behavior:contain;scrollbar-width:thin}

/* Slightly larger controls stay fixed above and below the full-height Bible. */
.bible66.h74-reader .h75-text-tools{margin-top:5px!important;padding:10px!important;gap:10px!important}
.bible66.h74-reader .h75-text-tools button{height:90px!important;min-height:90px!important;font-size:19px!important}
.bible66.h74-reader .h75-text-size{min-height:90px!important;font-size:18px!important}
.bible66.h74-reader .h74-nav{gap:10px!important;padding-top:2px!important}
.bible66.h74-reader .h74-nav button{height:104px!important;min-height:104px!important;font-size:20px!important}

/* Real-paper motion: the outer top corner lifts first, bends, then rolls across. */
.bible66.h74-reader .h74-turn{transform-style:preserve-3d!important;will-change:transform,clip-path,filter;border-top-style:solid!important}
.bible66.h74-reader .h74-turn.forward{animation:h76Forward .81s cubic-bezier(.34,.02,.16,1)!important}
.bible66.h74-reader .h74-turn.backward{animation:h76Backward .81s cubic-bezier(.34,.02,.16,1)!important}
.h76-top-curl{position:absolute;z-index:20;top:-2px;width:46%;height:31%;pointer-events:none;opacity:0;filter:drop-shadow(0 12px 10px #0008);background:linear-gradient(145deg,#fffef8 0 44%,#d7c28d 58%,#8c7040 72%,transparent 73%);clip-path:polygon(0 0,100% 0,100% 100%,74% 74%,52% 46%,25% 22%)}
.h74-turn.forward .h76-top-curl{right:-1px;transform-origin:100% 0;animation:h76CornerForward .81s cubic-bezier(.3,0,.2,1)}
.h74-turn.backward .h76-top-curl{left:-1px;transform:scaleX(-1);transform-origin:0 0;animation:h76CornerBackward .81s cubic-bezier(.3,0,.2,1)}
.h76-top-curl:after{content:"";position:absolute;inset:0;background:linear-gradient(125deg,transparent 28%,#fff 46%,#b8995d 62%,transparent 74%);opacity:.75}
@keyframes h76Forward{
 0%{transform:rotateY(0) rotateX(0) translateY(0) scaleX(1);clip-path:polygon(0 0,100% 0,100% 100%,0 100%);border-radius:0 12px 12px 0;filter:brightness(1)}
 12%{transform:rotateY(-9deg) rotateX(5deg) translateY(-5px) scaleX(.99);clip-path:polygon(0 0,91% 0,100% 10%,100% 100%,0 100%);border-radius:0 24% 12px 0;filter:brightness(1.08)}
 31%{transform:rotateY(-39deg) rotateX(7deg) translateY(-13px) scaleX(.93);clip-path:polygon(0 0,82% 0,100% 20%,100% 100%,0 100%);border-radius:0 44% 14px 0;filter:brightness(1.03)}
 55%{transform:rotateY(-91deg) rotateX(-4deg) translateY(-15px) scaleX(.7);clip-path:polygon(0 0,78% 0,100% 22%,100% 100%,0 100%);border-radius:52% 10px 10px 52%;filter:brightness(.72)}
 78%{transform:rotateY(-149deg) rotateX(4deg) translateY(-8px) scaleX(.91);clip-path:polygon(0 0,92% 0,100% 9%,100% 100%,0 100%);border-radius:14px 48% 48% 14px;filter:brightness(.9)}
 100%{transform:rotateY(-180deg) rotateX(0) translateY(0) scaleX(1);clip-path:polygon(0 0,100% 0,100% 100%,0 100%);border-radius:12px 0 0 12px;filter:brightness(1)}
}
@keyframes h76Backward{
 0%{transform:rotateY(0) rotateX(0) translateY(0) scaleX(1);clip-path:polygon(0 0,100% 0,100% 100%,0 100%);border-radius:12px 0 0 12px;filter:brightness(1)}
 12%{transform:rotateY(9deg) rotateX(5deg) translateY(-5px) scaleX(.99);clip-path:polygon(9% 0,100% 0,100% 100%,0 100%,0 10%);border-radius:24% 0 0 12px;filter:brightness(1.08)}
 31%{transform:rotateY(39deg) rotateX(7deg) translateY(-13px) scaleX(.93);clip-path:polygon(18% 0,100% 0,100% 100%,0 100%,0 20%);border-radius:44% 0 0 14px;filter:brightness(1.03)}
 55%{transform:rotateY(91deg) rotateX(-4deg) translateY(-15px) scaleX(.7);clip-path:polygon(22% 0,100% 0,100% 100%,0 100%,0 22%);border-radius:10px 52% 52% 10px;filter:brightness(.72)}
 78%{transform:rotateY(149deg) rotateX(4deg) translateY(-8px) scaleX(.91);clip-path:polygon(8% 0,100% 0,100% 100%,0 100%,0 9%);border-radius:48% 14px 14px 48%;filter:brightness(.9)}
 100%{transform:rotateY(180deg) rotateX(0) translateY(0) scaleX(1);clip-path:polygon(0 0,100% 0,100% 100%,0 100%);border-radius:0 12px 12px 0;filter:brightness(1)}
}
@keyframes h76CornerForward{0%{opacity:0;transform:rotate(0) scale(.12)}9%{opacity:1;transform:rotate(-4deg) scale(.45)}34%{opacity:1;transform:rotate(-13deg) scale(1)}63%{opacity:.82;transform:rotate(-24deg) scale(.78)}100%{opacity:0;transform:rotate(-36deg) scale(.15)}}
@keyframes h76CornerBackward{0%{opacity:0;transform:scaleX(-1) rotate(0) scale(.12)}9%{opacity:1;transform:scaleX(-1) rotate(-4deg) scale(.45)}34%{opacity:1;transform:scaleX(-1) rotate(-13deg) scale(1)}63%{opacity:.82;transform:scaleX(-1) rotate(-24deg) scale(.78)}100%{opacity:0;transform:scaleX(-1) rotate(-36deg) scale(.15)}}

@media(max-width:620px){
 .bible66.h74-reader{padding:max(6px,env(safe-area-inset-top)) 6px max(6px,env(safe-area-inset-bottom))!important;gap:4px!important}
 .bible66.h74-reader .h74-head{gap:7px!important;padding:8px!important}
 .bible66.h74-reader .h74-head select,.bible66.h74-reader .h74-head input,.bible66.h74-reader .h74-head button{height:76px!important;min-height:76px!important}
 .bible66.h74-reader .h74-status{font-size:14px!important;padding:8px!important}
 .bible66.h74-reader .h75-text-tools{grid-template-columns:1fr 1fr 1fr!important;padding:7px!important;gap:7px!important}
 .bible66.h74-reader .h75-text-tools button{height:84px!important;min-height:84px!important;font-size:17px!important}
 .bible66.h74-reader .h75-text-size{grid-column:1/-1!important;min-height:62px!important;font-size:17px!important}
 .bible66.h74-reader .h74-stage{padding:5px 1px!important}
 .bible66.h74-reader .h74-book{width:99%!important;border-width:7px!important}
 .bible66.h74-reader .h74-page{padding:18px 11px 27px!important}
 .bible66.h74-reader .h74-nav button{height:98px!important;min-height:98px!important;font-size:16px!important}
 .h76-top-curl{width:56%;height:34%}
}
`;
document.head.appendChild(css);

/* Extend Bible print enlargement while preserving the device's saved size. */
const sizes=[16,18,20,23,26,30,34,38,42,48,54,60];
let sizeIndex=2;
try{
 const current=Number((bible.style.getPropertyValue('--h75-font')||'20').replace('px',''));
 const saved=Number(localStorage.getItem('osko_bible_font_px'))||current;
 let nearest=0;
 sizes.forEach((n,i)=>{if(Math.abs(n-saved)<Math.abs(sizes[nearest]-saved))nearest=i});
 sizeIndex=nearest;
}catch(_){}
function applySize(){
 const px=sizes[sizeIndex];
 bible.style.setProperty('--h75-font',px+'px');
 const label=document.getElementById('h75-size');
 if(label)label.innerHTML='TEXT SIZE '+Math.round(px/20*100)+'%<small>'+px+' PIXEL BIBLE PRINT</small>';
 try{localStorage.setItem('osko_bible_font_px',String(px))}catch(_){}
}
const smaller=document.getElementById('h75-smaller');
const larger=document.getElementById('h75-larger');
const reset=document.getElementById('h75-reset');
if(smaller)smaller.onclick=()=>{sizeIndex=Math.max(0,sizeIndex-1);applySize()};
if(larger)larger.onclick=()=>{sizeIndex=Math.min(sizes.length-1,sizeIndex+1);applySize()};
if(reset)reset.onclick=()=>{sizeIndex=2;applySize()};
applySize();

/* Add the separate lifted top corner whenever a real printed turn begins. */
const turn=document.getElementById('h74-turn');
function addTopCurl(){
 if(!turn)return;
 const page=turn.querySelector('.h75-fold-page');
 if(page&&!page.querySelector('.h76-top-curl'))page.insertAdjacentHTML('beforeend','<span class="h76-top-curl" aria-hidden="true"></span>');
}
if(turn){
 const observer=new MutationObserver(()=>{if(turn.classList.contains('forward')||turn.classList.contains('backward'))requestAnimationFrame(addTopCurl)});
 observer.observe(turn,{attributes:true,attributeFilter:['class'],childList:true,subtree:true});
}
['h74-next','h74-prev'].forEach(id=>{const b=document.getElementById(id);if(b)b.addEventListener('pointerdown',()=>requestAnimationFrame(addTopCurl),true)});
})();
