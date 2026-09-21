(function oskoFix80PinchAndAllInteriors(){
'use strict';
if(window.__oskoFix80)return;window.__oskoFix80=true;

/* ---------------- Smooth two-finger Bible print enlargement ---------------- */
const bible=document.getElementById('bible66');
const book=document.getElementById('h74-open-book');
const turn=document.getElementById('h74-turn');
const sizeLabel=document.getElementById('h75-size');
const smaller=document.getElementById('h75-smaller');
const larger=document.getElementById('h75-larger');
const reset=document.getElementById('h75-reset');
let fontPx=20,targetFont=20,raf=0;
try{fontPx=targetFont=Math.max(16,Math.min(52,Number(localStorage.getItem('osko_bible_font_px'))||20))}catch(_){}

function updateSizeLabel(){
 if(sizeLabel)sizeLabel.innerHTML='TEXT SIZE '+Math.round(fontPx/20*100)+'%<small>'+Math.round(fontPx)+' PIXEL BIBLE PRINT • PINCH OR BUTTONS</small>';
}
function applyFont(px,save=false){
 fontPx=Math.max(16,Math.min(52,px));
 targetFont=fontPx;
 if(bible)bible.style.setProperty('--h75-font',fontPx.toFixed(2)+'px');
 updateSizeLabel();
 if(save)try{localStorage.setItem('osko_bible_font_px',String(Math.round(fontPx)))}catch(_){}
}
function animateFont(){
 raf=0;
 const delta=targetFont-fontPx;
 if(Math.abs(delta)<.06){applyFont(targetFont);return}
 fontPx+=delta*.42;
 if(bible)bible.style.setProperty('--h75-font',fontPx.toFixed(2)+'px');
 updateSizeLabel();
 raf=requestAnimationFrame(animateFont);
}
function aimFont(px){
 targetFont=Math.max(16,Math.min(52,px));
 if(!raf)raf=requestAnimationFrame(animateFont);
}
applyFont(fontPx);

if(bible&&book){
 const fingers=new Map();
 let pinching=false,startDistance=0,startFont=fontPx,suppressUntilClear=false,bypassCancel=false;
 const distance=()=>{const a=[...fingers.values()];return a.length<2?0:Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y)};
 function cancelOldSwipe(pointerId){
  if(!turn||!book)return;
  bypassCancel=true;
  try{book.dispatchEvent(new PointerEvent('pointercancel',{pointerId,bubbles:true,cancelable:true}))}catch(_){}
  bypassCancel=false;
  turn.className='h74-turn';turn.innerHTML='';
  book.classList.remove('h79-swiping');
 }
 bible.addEventListener('pointerdown',e=>{
  if(bypassCancel||!e.target.closest('#h74-open-book'))return;
  fingers.set(e.pointerId,{x:e.clientX,y:e.clientY});
  if(fingers.size===2){
   pinching=true;suppressUntilClear=true;startDistance=Math.max(20,distance());startFont=fontPx;
   cancelOldSwipe([...fingers.keys()][0]);
   book.classList.add('h80-pinching');
   e.preventDefault();e.stopImmediatePropagation();
   const s=document.getElementById('h74-status');if(s)s.textContent='PINCHING BIBLE PRINT • '+Math.round(fontPx/20*100)+'%';
  }else if(suppressUntilClear){e.preventDefault();e.stopImmediatePropagation()}
 },true);
 bible.addEventListener('pointermove',e=>{
  if(bypassCancel||!fingers.has(e.pointerId))return;
  fingers.set(e.pointerId,{x:e.clientX,y:e.clientY});
  if(pinching&&fingers.size>=2){
   e.preventDefault();e.stopImmediatePropagation();
   const ratio=distance()/startDistance;
   aimFont(startFont*ratio);
   const s=document.getElementById('h74-status');if(s)s.textContent='BIBLE PRINT • '+Math.round(targetFont/20*100)+'% • RELEASE TO KEEP';
  }else if(suppressUntilClear){e.preventDefault();e.stopImmediatePropagation()}
 },true);
 function endFinger(e){
  if(bypassCancel||!fingers.has(e.pointerId))return;
  const wasPinching=pinching;
  fingers.delete(e.pointerId);
  if(wasPinching||suppressUntilClear){e.preventDefault();e.stopImmediatePropagation()}
  if(pinching&&fingers.size<2){
   pinching=false;book.classList.remove('h80-pinching');applyFont(targetFont,true);
   const s=document.getElementById('h74-status');if(s)s.textContent='KING JAMES VERSION • PINCH SIZE SAVED • SWIPE ONE FINGER TO TURN';
  }
  if(!fingers.size)suppressUntilClear=false;
 }
 bible.addEventListener('pointerup',endFinger,true);
 bible.addEventListener('pointercancel',endFinger,true);

 // Keep the manual text controls and make them work from the exact pinched size.
 function manualSize(button,delta,absolute){
  if(!button)return;
  button.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();applyFont(absolute===undefined?fontPx+delta:absolute,true)},true);
 }
 manualSize(smaller,-2);manualSize(larger,2);manualSize(reset,0,20);
}

/* ---------------- Large readable interiors for all nine other buildings ---------------- */
const houses={
 'OSKO Workshop':{sub:'TOOLS • DESIGN • BUILD',down:'Main Workshop',up:'Design & Planning Loft',cards:['Tool Wall','Project Bench','Parts Storage','Truck Design Desk']},
 'School & Library':{sub:'LEARNING • BOOKS • TEACHING',down:'Learning Hall',up:'Library Loft',cards:['Classroom','Reading Tables','Reference Books','SKIE Teaching Desk']},
 'Robot Garage':{sub:'SKIE • SERVICE • ROBOTICS',down:'Robot Service Bay',up:'Robotics Lab',cards:['Charging Stations','Repair Bench','Sensor Tools','Robot Planning Desk']},
 'Aurora Cabin':{sub:'AURORA • REST • HOME',down:'Aurora Living Room',up:'Quiet Rest Loft',cards:['Aurora Bed','Warm Sitting Area','Food & Gear','Window Reading Chair']},
 'Crystal Lab':{sub:'ALASKA ICE CRYSTALS • RESEARCH',down:'Crystal Workshop',up:'Research Loft',cards:['Crystal Table','Lighting Bench','Sample Storage','Design Station']},
 'Grow House':{sub:'FOOD • PLANTS • YEAR-ROUND GROWING',down:'Indoor Garden',up:'Seed & Planning Loft',cards:['Growing Beds','Water Station','Seed Storage','Harvest Table']},
 'Equipment Barn':{sub:'PROPERTY • MACHINES • STORAGE',down:'Equipment Hall',up:'Parts & Control Loft',cards:['Machine Bays','Parts Wall','Safety Station','Property Control Desk']},
 'Work Shed':{sub:'REPAIR • BUILD • PLAN',down:'Main Workroom',up:'Planning Loft',cards:['Repair Bench','Material Rack','Hand Tools','Project Desk']},
 'Greenhouse':{sub:'PLANTS • WARMTH • LIGHT',down:'Greenhouse Garden',up:'Observation Loft',cards:['Plant Rows','Water Controls','Potting Bench','Garden Records']}
};

const overlay=document.createElement('section');
overlay.id='h80-house';
overlay.setAttribute('aria-hidden','true');
overlay.innerHTML=`
 <header class="h80-head"><button id="h80-close-top">← YARD</button><div><b id="h80-title">PROPERTY BUILDING</b><span id="h80-sub">TWO FINISHED FLOORS</span></div><button id="h80-lights">LIGHTS</button></header>
 <nav class="h80-tabs"><button id="h80-down-tab" class="on">DOWNSTAIRS</button><button id="h80-up-tab">UPSTAIRS</button></nav>
 <main class="h80-stage">
  <section class="h80-floor on" id="h80-down">
   <div class="h80-log-shell"><div class="h80-beams"></div><h2 id="h80-down-name">MAIN FLOOR</h2>
    <div class="h80-room-grid">
     <article class="h80-fireplace"><div class="h80-mantle">STONE FIREPLACE</div><div class="h80-firebox on" id="h80-fire"><i></i><i></i><i></i><div class="h80-logs"></div></div><button id="h80-fire-button">FIRE ON / OFF</button></article>
     <article class="h80-sofa"><b>COUNTRY LIVING AREA</b><div class="h80-couch"></div><div class="h80-rug"></div></article>
     <article class="h80-card"><b id="h80-card-a">WORK AREA</b><span>READY TO USE</span></article>
     <article class="h80-card"><b id="h80-card-b">STORAGE</b><span>ORGANIZED AND FINISHED</span></article>
    </div>
   </div>
  </section>
  <section class="h80-floor" id="h80-up">
   <div class="h80-log-shell"><div class="h80-beams"></div><h2 id="h80-up-name">UPSTAIRS</h2>
    <div class="h80-room-grid h80-up-grid">
     <article class="h80-loft"><b id="h80-card-c">LOFT ROOM</b><div class="h80-desk"></div><span>SKIE WORK SYSTEM</span></article>
     <article class="h80-bedroom"><b id="h80-card-d">QUIET ROOM</b><div class="h80-bed"></div><span>COMPLETELY FURNISHED</span></article>
     <article class="h80-reading"><b>READING CORNER</b><div class="h80-books"></div><span>CHAIR • LAMP • SHELVES</span></article>
    </div>
   </div>
  </section>
 </main>
 <footer class="h80-foot"><button id="h80-floor-switch">GO UPSTAIRS</button><button id="h80-close">RETURN TO PROPERTY</button></footer>`;
document.body.appendChild(overlay);

const css=document.createElement('style');
css.id='fix80-style';
css.textContent=`
/* Bible: reserve two fingers for print size and one finger for pages. */
.bible66.fix79 .h74-book{touch-action:pan-y!important}
.bible66.fix79 .h74-book.h80-pinching{cursor:zoom-in}
.bible66.fix79 .h74-verses,.bible66.fix79 .h75-fold-page .h74-verses{font-size:var(--h75-font,20px)!important}

/* Make the whole OS easier to see and touch. */
#status{font-size:15px!important;min-height:44px!important;padding:12px 16px!important}
#panel.open{max-height:58vh!important;padding:18px!important}
#panel.open #ptype{font-size:12px!important}
#panel.open #ptitle{font-size:25px!important}
#panel.open #ptext{font-size:16px!important;line-height:1.5!important}
#panel.open .chip{min-width:112px!important;min-height:72px!important;padding:14px 18px!important;font-size:17px!important}
#dock>button{min-height:82px!important;font-size:18px!important}

#h80-house{position:fixed;inset:0;z-index:220;display:none;flex-direction:column;overflow:hidden;background:#170c06;color:#fff2d2;font-family:system-ui,-apple-system,Segoe UI,sans-serif}
#h80-house.open{display:flex}#h80-house *{box-sizing:border-box}
.h80-head{flex:0 0 auto;display:grid;grid-template-columns:104px 1fr 104px;align-items:center;gap:9px;min-height:92px;padding:max(10px,env(safe-area-inset-top)) 10px 10px;background:#120b08f5;border-bottom:2px solid #69dcf5}
.h80-head button,.h80-tabs button,.h80-foot button,.h80-fireplace button{min-height:68px;border:2px solid #70dbf0;border-radius:14px;background:linear-gradient(#174e64,#082d3b);color:#f1fdff;font-weight:900;font-size:16px;touch-action:manipulation}
.h80-head div{text-align:center;min-width:0}.h80-head b{display:block;font:900 clamp(20px,5vw,30px) Georgia;color:#ffe5af}.h80-head span{display:block;margin-top:4px;color:#83e7fa;font-weight:900;font-size:11px;letter-spacing:.12em}
.h80-tabs{flex:0 0 auto;display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:9px 10px;background:#1c100a}.h80-tabs button{min-height:76px;font-size:19px}.h80-tabs button.on{background:linear-gradient(#8b5b2e,#44240f);border-color:#f2ca77;color:#fff0c7}
.h80-stage{position:relative;flex:1;min-height:0;overflow:hidden;background:radial-gradient(circle at 50% 12%,#a76c3d,#442510 58%,#170a04)}
.h80-floor{position:absolute;inset:0;display:none;overflow:auto;padding:12px 12px 118px}.h80-floor.on{display:block}
.h80-log-shell{position:relative;width:min(1050px,100%);min-height:690px;margin:auto;padding:90px 18px 25px;overflow:hidden;border:6px solid #351a0b;border-radius:20px;background:repeating-linear-gradient(0deg,#8b572f 0 27px,#5c3017 28px 34px,#925d34 35px 62px);box-shadow:0 25px 65px #000d,inset 0 0 80px #321306}
.h80-beams{position:absolute;left:0;right:0;top:0;height:76px;background:repeating-linear-gradient(90deg,#2d1609 0 15%,#75421e 15% 18%,#2d1609 18% 34%);clip-path:polygon(0 0,100% 0,100% 24%,62% 24%,50% 100%,38% 24%,0 24%);filter:drop-shadow(0 8px 8px #0009)}
.h80-log-shell h2{position:absolute;top:48px;left:0;right:0;margin:0;text-align:center;font:900 25px Georgia;color:#ffe4ad;text-shadow:0 3px 5px #000}
.h80-room-grid{display:grid;grid-template-columns:1.1fr 1fr;gap:14px}.h80-room-grid article{position:relative;min-height:245px;padding:15px;border:4px solid #351b0e;border-radius:16px;background:linear-gradient(#754222,#43220f);box-shadow:0 12px 25px #0008,inset 0 0 18px #1c0b04}
.h80-room-grid article>b{display:block;text-align:center;color:#ffe7b4;font:900 17px Georgia}.h80-room-grid article>span{display:block;margin-top:12px;text-align:center;color:#9cecff;font-weight:900;font-size:12px;letter-spacing:.08em}
.h80-fireplace{background:linear-gradient(90deg,#6f7372,#a6a19a,#5e6667)!important}
.h80-mantle{height:28px;margin:-2px -5px 8px;border:4px solid #4d4037;background:#725038;text-align:center;color:#fff0ca;font:900 12px/20px system-ui}
.h80-firebox{position:relative;width:min(270px,85%);height:135px;margin:8px auto;border:10px solid #514943;border-radius:48% 48% 8px 8px;background:#080604;overflow:hidden;box-shadow:inset 0 0 25px #000}
.h80-firebox i{display:none;position:absolute;bottom:28px;left:50%;width:54px;height:92px;border-radius:65% 15% 58% 25%;transform-origin:bottom;background:linear-gradient(#fff7ac 0 12%,#ffc832 35%,#ff681c 70%,#9f1708);filter:drop-shadow(0 0 13px #ff7a20);animation:h80flame .7s ease-in-out infinite alternate}.h80-firebox.on i{display:block}.h80-firebox i:nth-child(1){margin-left:-55px;transform:rotate(-13deg) scale(.72)}.h80-firebox i:nth-child(2){margin-left:-23px;animation-delay:-.25s}.h80-firebox i:nth-child(3){margin-left:15px;transform:rotate(13deg) scale(.78);animation-delay:-.45s}
.h80-logs{position:absolute;left:18%;right:18%;bottom:15px;height:22px;border-radius:9px;background:#4d2712;box-shadow:0 -8px 0 #6d3617;transform:rotate(-4deg)}
.h80-fireplace button{display:block;width:min(270px,90%);margin:8px auto 0;min-height:54px;font-size:14px}
@keyframes h80flame{from{height:70px;filter:drop-shadow(0 0 9px #ff6a10)}to{height:103px;filter:drop-shadow(0 0 20px #ffa51f)}}
.h80-couch{height:96px;margin:32px auto 8px;border:8px solid #3c2116;border-radius:28px 28px 11px 11px;background:linear-gradient(#6f3329,#401d19);box-shadow:inset 0 -18px 0 #2f1513,0 10px 15px #0008}.h80-rug{height:45px;margin:14px 6%;border-radius:50%;background:repeating-linear-gradient(90deg,#1b6073 0 18px,#63bfd1 19px 25px,#9b4c2f 26px 42px)}
.h80-card:after{content:"";display:block;height:105px;margin:28px 7% 0;border:5px solid #402411;border-radius:9px;background:repeating-linear-gradient(90deg,#52301a 0 21px,#a36b39 22px 42px)}
.h80-up-grid{grid-template-columns:1fr 1fr 1fr}.h80-up-grid article{min-height:360px}.h80-desk{height:105px;margin-top:75px;border:7px solid #38200e;background:#70401d;box-shadow:0 13px 0 #321707}.h80-bed{height:120px;margin-top:70px;border:8px solid #38200e;border-radius:20px 20px 7px 7px;background:linear-gradient(#d7c49e,#704136)}.h80-books{height:155px;margin-top:50px;border:8px solid #3a210e;background:repeating-linear-gradient(90deg,#173c55 0 20px,#b67135 21px 38px,#68402a 39px 56px)}
.h80-foot{position:absolute;z-index:5;left:0;right:0;bottom:0;display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:10px max(10px,env(safe-area-inset-left)) max(10px,env(safe-area-inset-bottom));background:#160c08f3;border-top:2px solid #6bdcf3}.h80-foot button{min-height:88px;font-size:18px}
#h80-house.lights-off .h80-stage{filter:brightness(.52)}#h80-house.lights-off .h80-firebox{filter:brightness(1.6)}
@media(max-width:650px){.h80-head{grid-template-columns:86px 1fr 86px}.h80-head button{font-size:13px}.h80-room-grid,.h80-up-grid{grid-template-columns:1fr}.h80-log-shell{min-height:1180px}.h80-floor{padding-left:7px;padding-right:7px}.h80-room-grid article{min-height:230px}.h80-up-grid article{min-height:300px}}
`;
document.head.appendChild(css);

let currentHouse=null,upstairs=false;
const q=id=>document.getElementById(id);
function showFloor(up){
 upstairs=up;q('h80-down').classList.toggle('on',!up);q('h80-up').classList.toggle('on',up);
 q('h80-down-tab').classList.toggle('on',!up);q('h80-up-tab').classList.toggle('on',up);
 q('h80-floor-switch').textContent=up?'GO DOWNSTAIRS':'GO UPSTAIRS';
 q(up?'h80-up':'h80-down').scrollTop=0;
}
function openHouse(name){
 const h=houses[name];if(!h)return;
 currentHouse=name;q('h80-title').textContent=name;q('h80-sub').textContent=h.sub;
 q('h80-down-name').textContent=h.down;q('h80-up-name').textContent=h.up;
 q('h80-card-a').textContent=h.cards[0];q('h80-card-b').textContent=h.cards[1];q('h80-card-c').textContent=h.cards[2];q('h80-card-d').textContent=h.cards[3];
 overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');showFloor(false);
}
function closeHouse(){overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true');currentHouse=null}
q('h80-down-tab').onclick=()=>showFloor(false);q('h80-up-tab').onclick=()=>showFloor(true);q('h80-floor-switch').onclick=()=>showFloor(!upstairs);
q('h80-close').onclick=closeHouse;q('h80-close-top').onclick=closeHouse;
q('h80-fire-button').onclick=()=>q('h80-fire').classList.toggle('on');
q('h80-lights').onclick=()=>overlay.classList.toggle('lights-off');

document.addEventListener('click',e=>{
 const button=e.target.closest&&e.target.closest('.chip');
 if(!button||button.textContent.trim().toUpperCase()!=='OPEN')return;
 const title=document.getElementById('ptitle');
 const name=title&&title.textContent.trim();
 if(!houses[name])return;
 e.preventDefault();e.stopImmediatePropagation();openHouse(name);
},true);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&overlay.classList.contains('open'))closeHouse()});
window.OSKO_OPEN_BUILDING=openHouse;
})();
