(function oskoFix96TopLedLanding(){
'use strict';
if(window.__oskoFix96)return;window.__oskoFix96=true;

const bible=document.getElementById('bible66');
const book=document.getElementById('h74-open-book');
const next=document.getElementById('h74-next');
const prev=document.getElementById('h74-prev');
const status=document.getElementById('h74-status');
const sizeLabel=document.getElementById('h75-size');
const root=document.getElementById('hq66');

const css=document.createElement('style');
css.id='hq96-style';
css.textContent=`
/* FIX96 — the Bible uses the same StPageFlip engine and settings as Aurora's shirt books. */
.bible66.fix96 .h74-stage{width:100%!important;display:flex!important;flex-direction:row!important;align-items:stretch!important;justify-content:center!important}
.bible66.fix96 .h74-book{touch-action:pan-y!important;overflow:hidden!important;perspective:1900px!important;transform-style:preserve-3d!important;width:var(--h91-book-width,100%)!important;height:var(--h91-book-height,100%)!important;max-width:100%!important;max-height:100%!important;margin-inline:auto!important;transition:width .42s ease,height .42s ease!important;flex:none!important}
.bible66.fix96 .h74-page{touch-action:pan-y!important}
.bible66.fix96 .h74-verses p{font-weight:650!important;letter-spacing:.005em!important}
.bible66.fix96 .h74-verses sup{font-weight:900!important}
.bible66.fix96 .h79-swipe-help{display:none!important}
.bible66.fix96 .h74-head select,.bible66.fix96 .h74-head input,.bible66.fix96 .h74-head button{min-height:88px!important;font-size:20px!important}
.bible66.fix96 .h75-text-tools button{min-height:108px!important;font-size:24px!important;line-height:1.2!important}
.bible66.fix96 .h74-nav button{min-height:120px!important;font-size:25px!important;line-height:1.2!important;padding:12px 8px!important}
.h82-corner{position:absolute;z-index:31;top:5px;width:92px;height:92px;pointer-events:none;opacity:.9;transition:opacity .2s}
.h82-corner.left{left:6px;border-top:3px solid #bd944f;border-left:3px solid #bd944f;border-radius:15px 0 0 0}
.h82-corner.right{right:6px;border-top:3px solid #bd944f;border-right:3px solid #bd944f;border-radius:0 15px 0 0}
.h82-corner:after{content:'GRAB TOP';position:absolute;top:14px;width:78px;color:#5d3d17;font:900 12px system-ui;letter-spacing:.055em}
.h82-corner.left:after{left:5px}.h82-corner.right:after{right:5px;text-align:right}
.h82-page-mesh{position:absolute;z-index:48;display:none;pointer-events:none;transform-style:preserve-3d;overflow:visible;contain:layout style paint;will-change:transform}
.h82-page-mesh.on{display:block}
.h91-sheet{position:absolute;inset:0;width:100%;height:100%;overflow:visible;transform-style:preserve-3d;backface-visibility:visible;will-change:transform}
.h82-strip{position:absolute;top:0;height:100%;overflow:hidden;transform-style:preserve-3d;backface-visibility:visible;will-change:transform,filter}
.h82-face{position:absolute;inset:0 auto auto 0;height:100%;overflow:hidden;backface-visibility:hidden;background:#fffdf2;color:#20170d}
.h82-face.front{transform:translateZ(.35px)}
.h82-face.back{transform:rotateY(180deg) translateZ(.35px);background:repeating-linear-gradient(0deg,#fffdf3 0 23px,#cdbb8f55 24px 25px),radial-gradient(ellipse at top,#fffef7,#eadfbe 75%,#c0a56e)}
.h82-strip-content{position:absolute;top:0;height:100%;box-sizing:border-box;background:#fffdf2}
.h82-paper-edge{position:absolute;z-index:49;top:0;width:100%;height:4px;border-radius:50%;background:linear-gradient(180deg,#7a5a2a,#fff8d9,#8b672f);box-shadow:0 0 7px #0008;pointer-events:none;will-change:transform}
.h82-contact-shadow{position:absolute;z-index:45;top:0;width:100%;height:28px;pointer-events:none;background:linear-gradient(180deg,transparent,#0008,transparent);filter:blur(7px);opacity:0;will-change:transform,opacity}
.h82-finger-curl{position:absolute;z-index:51;display:none;width:42px;height:42px;border-radius:50%;pointer-events:none;background:radial-gradient(circle at 35% 30%,#fffef4 0 18%,#e7d29b 42%,#75552a 76%,transparent 78%);filter:drop-shadow(0 8px 7px #0008);opacity:.92;will-change:transform}
.h82-finger-curl.on{display:block}
.bible66.fix96.h82-turning .h74-turn{opacity:0!important}
.bible66.fix96.h82-turning .h82-corner,.bible66.fix96.h82-pinching .h82-corner{opacity:.18}
.bible66.fix96.h82-pinching .h74-book{filter:drop-shadow(0 0 14px #56dbff88)}
.h84-control-bar{width:100%;padding:0 2px;box-sizing:border-box}
.h84-control-bar button{width:100%;min-height:74px;padding:9px 10px;border:3px solid #79e9ff;border-radius:13px;background:linear-gradient(180deg,#0b6684,#063448);color:#fff;font:900 18px/1.2 system-ui;letter-spacing:.03em;text-shadow:0 2px 2px #000;touch-action:manipulation}
.h84-control-panel{position:fixed;z-index:10020;left:max(6px,env(safe-area-inset-left));right:max(6px,env(safe-area-inset-right));bottom:max(8px,env(safe-area-inset-bottom));display:none;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;padding:12px;border:3px solid #5fd8f1;border-radius:17px;background:linear-gradient(160deg,#321606f7,#071c27f7);box-shadow:0 0 0 9999px #0009,0 18px 45px #000;backdrop-filter:blur(7px)}
.h84-control-panel.open{display:grid}
.h84-control-panel button{min-height:106px;padding:12px 9px;border:3px solid #e3b867;border-radius:14px;background:linear-gradient(#80512a,#351707);color:#fffdf3;font:900 24px/1.15 system-ui;text-shadow:0 2px 2px #000;touch-action:manipulation}
.h84-control-panel button:active{transform:translateY(2px);filter:brightness(1.25)}
.h84-panel-readout,.h84-panel-close{grid-column:1/-1!important}
.h84-panel-readout{min-height:68px;display:grid;place-items:center;padding:6px;border-radius:10px;background:#07506b;color:#effdff;font:900 17px/1.25 system-ui;text-align:center;letter-spacing:.03em}
.h84-panel-close{background:linear-gradient(#176e54,#0c3c2d)!important;border-color:#5ff0b8!important}

/* Carry FIX81's finished HQ rooms forward without loading FIX81's flat corner gesture. */
#hq66.fix96 .h81-hq-room{position:relative;overflow:hidden;min-height:520px;margin-top:24px;padding:24px;border:8px solid #30170a;border-radius:25px;background:linear-gradient(155deg,#98623bee,#5b3119f4 62%,#31170bed);box-shadow:0 28px 42px #000c,inset 0 0 42px #170803,0 0 0 2px #c28c5544}
#hq66.fix96 .h81-hq-room:after{content:'';position:absolute;inset:12px;border:1px solid #e0b06b3b;border-radius:15px;pointer-events:none}
#hq66.fix96 .h81-hq-room h2{position:relative;z-index:4;margin:0;text-align:center;color:#ffe2aa;font:900 28px Georgia;letter-spacing:.08em;text-shadow:0 3px 5px #000}
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
@media(max-width:520px){#hq66.fix96 .h81-hq-room{min-height:620px}.h81-map,.h81-console{width:88%;left:6%;right:auto}.h81-map{top:145px}.h81-console{top:350px}.h81-cabinets{display:none}.h82-corner{width:84px;height:84px}.h84-control-bar button{min-height:72px;font-size:17px}.h84-control-panel button{min-height:104px;font-size:23px}.bible66.fix96 .h74-head select,.bible66.fix96 .h74-head input,.bible66.fix96 .h74-head button{min-height:84px!important;font-size:19px!important}.bible66.fix96 .h75-text-tools button{min-height:104px!important;font-size:22px!important;line-height:1.15!important}.bible66.fix96 .h74-nav button{min-height:116px!important;font-size:23px!important;line-height:1.15!important;padding:10px 6px!important}}
`;
css.textContent+=`
.bible66.fix96 .h74-book{position:relative!important}
.bible66.osko-real-pageflip .h74-book>.h74-page,.bible66.osko-real-pageflip .h74-book>.h74-turn{visibility:hidden!important}
#osko-bible-flip-stage{position:absolute;inset:0;z-index:50;width:100%;height:100%;overflow:visible;touch-action:pan-y}
#osko-bible-flip-stage .stf__parent{margin:auto}
#osko-bible-flip-stage .stf__item.osko-bible-flip-page{display:none}
.osko-bible-flip-page{box-sizing:border-box;width:100%;height:100%;overflow:hidden;background:linear-gradient(90deg,#e6d9b6,#fffdf2 7% 93%,#d8c49a);color:#20170d;box-shadow:inset 6px 0 14px #5b452933,inset -5px 0 10px #5b452922;padding:13px}
.osko-bible-page-inner{display:flex;flex-direction:column;height:100%;min-height:0}
.osko-bible-page-inner h2{font:900 21px/1.2 Georgia,serif;margin:0 0 5px}
.osko-bible-page-inner .h74-edition{flex:none}
.osko-bible-page-inner .h74-verses{flex:1;min-height:0;overflow:auto;font-size:var(--h75-font,20px)!important;line-height:1.35}
.osko-bible-page-inner .h74-verses p{margin:0 0 .48em}
.osko-bible-page-inner .h74-page-num{flex:none}
`;
css.textContent+=`.stf__parent {
  position: relative;
  display: block;
  box-sizing: border-box;
  transform: translateZ(0);

  -ms-touch-action: pan-y;
  touch-action: pan-y;
}

.sft__wrapper {
  position: relative;
  width: 100%;
  box-sizing: border-box;
}

.stf__parent canvas {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}

.stf__block {
  position: absolute;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  perspective: 2000px;
}

.stf__item {
  display: none;
  position: absolute;
  transform-style: preserve-3d;
}

.stf__outerShadow {
  position: absolute;
  left: 0;
  top: 0;
}

.stf__innerShadow {
  position: absolute;
  left: 0;
  top: 0;
}

.stf__hardShadow {
  position: absolute;
  left: 0;
  top: 0;
}

.stf__hardInnerShadow {
  position: absolute;
  left: 0;
  top: 0;
}`;
document.head.appendChild(css);

if(bible&&book&&next&&prev){
 bible.classList.remove('fix81','fix82','fix83','fix84');bible.classList.add('fix96');
 const stage=book.closest('.h74-stage');
 const controlBar=document.createElement('div');controlBar.className='h84-control-bar';
 controlBar.innerHTML='<button id="h84-open-controls">LARGE PAGE CONTROLS • SIZE • TOP-CORNER PAGE ROLL</button>';
 stage.parentNode.insertBefore(controlBar,stage);
 const controls=document.createElement('div');controls.className='h84-control-panel';controls.setAttribute('aria-label','Bible page size and glide controls');
 controls.innerHTML='<output class="h84-panel-readout" id="h84-page-readout"></output><button id="h84-glide-slower">GLIDE<br>SLOWER</button><button id="h84-glide-faster">GLIDE<br>FASTER</button><button id="h84-width-narrow">WIDTH<br>NARROWER</button><button id="h84-width-wide">WIDTH<br>WIDER</button><button id="h84-height-short">HEIGHT<br>SHORTER</button><button id="h84-height-tall">HEIGHT<br>TALLER</button><button id="h84-size-normal">NORMAL<br>SIZE</button><button class="h84-panel-close" id="h84-close-controls">SAVE & CLOSE CONTROLS</button>';
 bible.appendChild(controls);
 const flipStage=document.createElement('div');flipStage.id='osko-bible-flip-stage';book.appendChild(flipStage);
 const pointers=new Map();
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 const smooth=v=>v*v*(3-2*v);
 let mode='idle',corner='',owner=null,startX=0,startY=0,lastX=0,lastT=0,progress=0,dragY=0,startDistance=0,startFont=20,currentFont=20,pageW=0,pageH=0,stripW=0,strips=[],anim=0;
 let glideMs=clamp(Number(localStorage.getItem('osko_bible_glide_ms_fix91'))||1650,1100,3400);
 let bookWidth=clamp(Number(localStorage.getItem('osko_bible_book_width'))||100,86,100);
 let bookHeight=clamp(Number(localStorage.getItem('osko_bible_book_height'))||100,65,100);
 const getFont=()=>{const n=parseFloat(getComputedStyle(bible).getPropertyValue('--h75-font'));return Number.isFinite(n)?n:(Number(localStorage.getItem('osko_bible_font_px'))||20)};
 const distance=()=>{const p=[...pointers.values()];return p.length<2?0:Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y)};
 const readout=document.getElementById('h84-page-readout');
 function showPageControls(save){
  bible.style.setProperty('--h91-book-width',bookWidth+'%');bible.style.setProperty('--h91-book-height',bookHeight+'%');
  const label='GLIDE '+(glideMs/1000).toFixed(2)+' SEC • WIDTH '+bookWidth+'% • HEIGHT '+bookHeight+'%';
  if(readout)readout.textContent=label;if(controlBar.firstElementChild)controlBar.firstElementChild.textContent='PAGE CONTROLS • '+label;
  if(save)try{localStorage.setItem('osko_bible_glide_ms_fix91',String(glideMs));localStorage.setItem('osko_bible_book_width',String(bookWidth));localStorage.setItem('osko_bible_book_height',String(bookHeight))}catch(_){}
 }
 function cleanPageHTML(source){const clone=source.cloneNode(true);clone.querySelectorAll('[id]').forEach(n=>n.removeAttribute('id'));return clone.innerHTML}
 function showFont(px,save){
  currentFont=clamp(px,16,52);bible.style.setProperty('--h75-font',currentFont.toFixed(2)+'px');
  if(sizeLabel)sizeLabel.innerHTML='TEXT SIZE '+Math.round(currentFont/20*100)+'%<small>'+Math.round(currentFont)+' PIXEL BIBLE PRINT • PINCH OR BUTTONS</small>';
  if(status)status.textContent='BIBLE PRINT • '+Math.round(currentFont/20*100)+'%'+(save?' • SAVED':' • PINCH TO ADJUST');
  if(save)try{localStorage.setItem('osko_bible_font_px',String(Math.round(currentFont)))}catch(_){}
 }
 const reader=window.__oskoBibleReader;
 let flip=null,working=false;
 const escapeText=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function pageElement(items,i,total){
  const el=document.createElement('div');el.className='osko-bible-flip-page';
  const title=reader.getTitle();
  el.innerHTML='<div class="osko-bible-page-inner"><h2>'+escapeText(title)+(i%2?' • continued':'')+'</h2><div class="h74-edition">KING JAMES VERSION</div><div class="h74-verses">'+(items.length?items.map(v=>'<p><sup>'+escapeText(v.verse)+'</sup>'+escapeText(v.text)+'</p>').join(''):'<p>Continue to the next chapter.</p>')+'</div><div class="h74-page-num">PAGE '+(i+1)+' OF '+total+'</div></div>';
  return el;
 }
 function rebuild(index){
  if(!reader)return;const data=reader.getPages();if(!data.length)return;
  const pages=data.map((items,i)=>pageElement(items,i,data.length));
  const target=clamp(Number(index)||0,0,pages.length-1);
  if(!flip){
   flipStage.replaceChildren(...pages);
   flip=new St.PageFlip(flipStage,{width:350,height:550,size:'stretch',minWidth:210,maxWidth:560,minHeight:330,maxHeight:880,flippingTime:glideMs,drawShadow:true,maxShadowOpacity:.55,usePortrait:true,showCover:false,showPageCorners:true,autoSize:false,mobileScrollSupport:false,disableFlipByClick:true,startPage:target});
   flip.loadFromHTML(flipStage.querySelectorAll('.osko-bible-flip-page'));
   flip.on('flip',e=>{reader.setPage(e.data);if(status)status.textContent='KING JAMES VERSION • '+reader.getTitle()+' • PAGE '+(e.data+1)});
  }else{flip.turnToPage(0);flip.updateFromHtml(pages);flip.turnToPage(target)}
  bible.classList.add('osko-real-pageflip');
 }
 window.addEventListener('osko-bible-pages',e=>rebuild(e.detail&&e.detail.index));
 if(reader&&reader.getPages().length)rebuild(reader.getIndex());
 function go(direction){
  if(!flip||working||flip.getState()!=='read')return;
  const n=flip.getCurrentPageIndex(),last=flip.getPageCount()-1;
  if(direction>0&&n<last)flip.flipNext('top');
  else if(direction<0&&n>0)flip.flipPrev('top');
  else{
   working=true;Promise.resolve(reader.changeChapter(direction)).finally(()=>{working=false});
  }
 }
 window.addEventListener('click',e=>{
  if(!bible.classList.contains('open'))return;
  if(e.target===next||next.contains(e.target)){e.preventDefault();e.stopImmediatePropagation();go(1)}
  else if(e.target===prev||prev.contains(e.target)){e.preventDefault();e.stopImmediatePropagation();go(-1)}
 },{capture:true});
 flipStage.addEventListener('pointerup',e=>e.stopPropagation());
 flipStage.addEventListener('pointercancel',e=>e.stopPropagation());
 window.addEventListener('click',e=>{const id=e.target&&e.target.id;if(!['h75-smaller','h75-larger','h75-reset'].includes(id))return;e.preventDefault();e.stopImmediatePropagation();currentFont=getFont();showFont(id==='h75-reset'?20:currentFont+(id==='h75-larger'?2:-2),true)},{capture:true});
 controlBar.addEventListener('click',()=>controls.classList.add('open'));
 controls.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
  if(b.id==='h84-glide-slower')glideMs=clamp(glideMs+300,1100,3400);
  if(b.id==='h84-glide-faster')glideMs=clamp(glideMs-300,1100,3400);
  if(flip)flip.getSettings().flippingTime=glideMs;
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
 root.classList.remove('fix81','fix82','fix83','fix84');root.classList.add('fix96');
 const down=root.querySelector('#h69-down .h69-living');
 if(down&&!down.querySelector('.h81-mudroom'))down.insertAdjacentHTML('beforeend',`<section class="h81-hq-room h81-mudroom"><h2>Alaska Gear & Mudroom</h2><div class="h81-hooks">${'<i></i>'.repeat(5)}</div><div class="h81-bench"></div><div class="h81-boots">${'<i></i>'.repeat(4)}</div></section>`);
 const up=root.querySelector('.h72-upstairs')||root.querySelector('#h69-up .h69-up');
 if(up&&!up.querySelector('.h81-command-room'))up.insertAdjacentHTML('beforeend',`<section class="h81-hq-room h81-command-room"><h2>SKIE Command Study</h2><div class="h81-antlers"></div><div class="h81-map"></div><div class="h81-console">${'<i></i>'.repeat(4)}</div><div class="h81-cabinets">${'<i></i>'.repeat(4)}</div></section>`);
 const title=root.querySelector('.h69-title span');if(title)title.textContent='COMPLETE HQ • TOP-CORNER ROLL KJV BIBLE • FINISHED BOTH FLOORS';
}
})();
