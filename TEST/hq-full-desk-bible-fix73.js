(function hq73FullDeskBible(){
'use strict';
const root=document.getElementById('hq66');
if(!root||document.getElementById('hq73-style'))return;
root.classList.add('fix73');

const css=document.createElement('style');
css.id='hq73-style';
css.textContent=`
/* Make the complete 66-book KJV reader presentation-size. */
.bible66{padding:max(12px,env(safe-area-inset-top)) 10px max(12px,env(safe-area-inset-bottom))!important}
.bible66-head{gap:10px!important;padding:12px!important;border-width:2px!important;border-radius:16px!important}
.bible66-head b{font-size:20px!important}
.bible66-head select,.bible66-head input{height:62px!important;font-size:18px!important;border-width:2px!important;border-radius:12px!important}
.bible66-head select{max-width:210px!important;min-width:155px!important}
.bible66-head input{width:84px!important}
.bible66-head button{height:62px!important;min-width:92px!important;padding:0 15px!important;font-size:16px!important;border-width:2px!important;border-radius:12px!important}
.bible-status{font-size:13px!important;padding:9px!important;letter-spacing:.1em!important}
.page66{padding:34px clamp(22px,5vw,52px) 42px!important;border-width:3px!important;box-shadow:-13px 18px 38px #000d,inset 15px 0 21px #8a744a44!important}
.page66 h2{font-size:clamp(26px,7vw,38px)!important}
.page66 .edition{font-size:13px!important}
.verses{font-size:clamp(20px,5.2vw,27px)!important;line-height:1.62!important}
.page-number{font-size:14px!important}
.bible66-nav{gap:11px!important}
.bible66-nav button{height:80px!important;font-size:16px!important;border-width:2px!important;border-radius:15px!important}
.h73-full-badge{flex-basis:100%;padding:7px 10px;border-radius:9px;background:#0c4052;color:#c9f8ff;text-align:center;font:900 13px system-ui;letter-spacing:.11em}

/* A real, prominent and usable KJV Bible on the SKIE work desk. */
#hq66.fix73 .h72-study{overflow:visible;background:linear-gradient(#b97843 0 31px,#713a19 32px);box-shadow:0 24px 26px #000c,inset 0 0 0 4px #d4a06a55}
#hq66.fix73 .h72-study:before{content:"";display:none}
.h73-skie-screen{position:absolute;left:5%;right:5%;top:22px;height:68px;border:7px solid #111a1e;border-radius:8px;background:linear-gradient(155deg,#03101a,#0b526a 48%,#02070b 50%);display:grid;place-items:center;color:#baf8ff;font:italic 900 13px Georgia;letter-spacing:.13em;text-shadow:0 0 10px #30d8ff;box-shadow:0 10px 14px #0009,inset 0 0 16px #36bfe455}
.h73-desk-bible{position:absolute;left:50%;top:105px;transform:translateX(-50%) rotate(-2deg);width:250px;height:145px;border:6px solid #d8bd72;border-radius:11px;background:linear-gradient(135deg,#120e0a,#3c2815 48%,#100c08);box-shadow:0 17px 20px #000c,inset 0 0 0 4px #72582e;color:#edd89b;font:900 24px Georgia;line-height:1.12;text-align:center;touch-action:manipulation}
.h73-desk-bible:before{content:"✦";display:block;margin-bottom:5px;color:#d6bb72;font-size:27px}
.h73-desk-bible:after{content:"";position:absolute;right:7px;top:7px;bottom:7px;width:11px;border-radius:4px;background:repeating-linear-gradient(#f1e4bb 0 3px,#ad9963 4px 5px)}
.h73-desk-bible small{display:block;margin-top:8px;font:900 12px system-ui;letter-spacing:.11em;color:#fff0c5}
.h73-desk-bible em{display:block;margin-top:6px;color:#a9f4ff;font:900 11px system-ui;letter-spacing:.08em}
.h73-desk-bible:active{transform:translateX(-50%) rotate(-2deg) scale(.96)}
.h73-notes{position:absolute;right:4%;bottom:12px;width:84px;height:55px;border:3px solid #bca875;border-radius:4px;background:repeating-linear-gradient(0deg,#fff7dc 0 8px,#c6d9df 9px 10px);transform:rotate(4deg);box-shadow:0 7px 8px #0008}
.h73-pen{position:absolute;right:5%;bottom:72px;width:7px;height:76px;border-radius:6px;background:linear-gradient(#8fefff,#075e84);transform:rotate(25deg);box-shadow:0 0 7px #39d9ff}
#hq66.fix73 .h72-study-chair{bottom:5px}

/* Final finishing details for both floors. */
.h73-kitchen-sign{position:absolute;left:50%;bottom:19px;transform:translateX(-50%);padding:8px 15px;border:3px solid #2a160b;border-radius:8px;background:linear-gradient(#986037,#552a13);color:#ffe0aa;font:900 12px Georgia;letter-spacing:.11em;box-shadow:0 9px 12px #0009}
.h73-dining-sideboard{position:absolute;left:4%;bottom:35px;width:20%;height:92px;border:7px solid #2b1509;border-radius:8px;background:linear-gradient(#9f673b,#552b14);box-shadow:0 14px 15px #0009}
.h73-dining-sideboard.r{left:auto;right:4%}

@media(max-width:520px){
 .bible66-head b{flex-basis:100%;text-align:center}
 .bible66-head select{flex:1;max-width:none!important}
 .bible66-head button{min-width:82px!important}
 .bible66-nav button{font-size:13px!important}
 .h73-desk-bible{width:215px;height:140px;font-size:21px}
 .h73-skie-screen{font-size:11px}
}
`;
document.head.appendChild(css);

const bibleHead=document.querySelector('.bible66-head');
if(bibleHead&&!document.querySelector('.h73-full-badge')){
  bibleHead.insertAdjacentHTML('beforeend','<div class="h73-full-badge">FULL 66-BOOK KING JAMES BIBLE • GENESIS THROUGH REVELATION</div>');
}

const desk=root.querySelector('.h72-study');
if(desk){
  desk.innerHTML='<div class="h73-skie-screen">SKIE STUDY SYSTEM • SCRIPTURE READY</div><button class="h73-desk-bible" id="h73-desk-bible" aria-label="Open full King James Bible">HOLY BIBLE<small>KING JAMES VERSION</small><em>OPEN FULL BIBLE</em></button><div class="h73-notes"></div><div class="h73-pen"></div>';
}
const deskBible=document.getElementById('h73-desk-bible');
if(deskBible)deskBible.onclick=()=>document.getElementById('h69-bible')?.click();

const kitchen=root.querySelector('.h70-kitchen');
if(kitchen)kitchen.insertAdjacentHTML('beforeend','<div class="h73-kitchen-sign">COMPLETE COUNTRY KITCHEN</div>');
const dining=root.querySelector('.h70-dining');
if(dining)dining.insertAdjacentHTML('beforeend','<div class="h73-dining-sideboard"></div><div class="h73-dining-sideboard r"></div>');
const title=root.querySelector('.h69-title span');
if(title)title.textContent='COMPLETE HOME • FULL USABLE KJV BIBLE';
})();
