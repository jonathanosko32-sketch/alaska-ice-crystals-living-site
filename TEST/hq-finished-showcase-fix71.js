(function hq71FinishedShowcase(){
'use strict';
const root=document.getElementById('hq66');
if(!root||document.getElementById('hq71-style'))return;
root.classList.add('fix71');

// A tested candidate should show the house, not leave the phone update card over it.
try{
  if(window.parent&&window.parent!==window){
    const parentDoc=window.parent.document;
    const panel=parentDoc.getElementById('panel');
    if(panel&&parentDoc.getElementById('panelTitle')?.textContent.includes('Living OS')){
      setTimeout(()=>panel.classList.remove('show'),450);
    }
  }
}catch(_){ }

const css=document.createElement('style');
css.id='hq71-style';
css.textContent=`
#hq66.fix71{--leather1:#bd8554;--leather2:#774523;--leather3:#3a1d0e;--oak1:#b2763e;--oak2:#653716;--iron:#191817}
#hq66.fix71 .h69-head{min-height:78px;padding:12px;background:linear-gradient(180deg,#17100bfa,#0c0907fa);box-shadow:0 10px 30px #000b}
#hq66.fix71 .h69-head button{min-width:82px;min-height:68px;font-size:16px;border-width:2px}
#hq66.fix71 .h69-title b{font-size:clamp(19px,5vw,28px);text-shadow:0 2px 2px #000,0 0 12px #b97b3b88}
#hq66.fix71 .h69-title span{font-size:11px;letter-spacing:.2em;color:#a9efff}
#hq66.fix71 .h69-tabs button{min-height:76px!important;font-size:18px!important;border-width:2px}
#hq66.fix71 .h69-foot button{height:80px!important;min-height:80px!important;font-size:18px!important;border-width:2px}
#hq66.fix71 .h69-stage{background:radial-gradient(circle at 50% 4%,#87532c,#281308 56%,#090402)}
#hq66.fix71 #h69-down .h69-shell{min-height:2350px;background:linear-gradient(90deg,#1c0b04aa,transparent 7% 93%,#1c0b04aa),repeating-linear-gradient(0deg,#89532d 0 28px,#5a3018 29px 34px,#945d34 35px 63px)}
#hq66.fix71 #h69-down .h69-living{min-height:2250px;padding:105px 4% 60px}
#hq66.fix71 .h70-home{display:flex;flex-direction:column;gap:22px;width:100%}
#hq66.fix71 .h70-zone{border:7px solid #30170a;border-radius:24px;box-shadow:0 26px 45px #000c,inset 0 0 42px #160803,0 0 0 2px #9b683d55}
#hq66.fix71 .h70-zone:after{content:"";position:absolute;inset:11px;border:1px solid #d3a05d33;border-radius:14px;pointer-events:none}

/* Finished great-room fireplace wall */
#hq66.fix71 .h70-fire-room{min-height:535px;padding:26px 18px 122px;background:linear-gradient(180deg,#8e5b36 0 25%,#5c341b 26% 68%,#351b0d 69%)}
#hq66.fix71 .h70-fire-room:before{content:"ALASKA ICE CRYSTALS • GREAT ROOM";left:0;right:0;top:15px;text-align:center;font:900 17px Georgia;color:#ffe2ad;text-shadow:0 2px 3px #000;letter-spacing:.12em}
#hq66.fix71 .h70-tv{position:relative;z-index:2;width:58%;height:118px;margin:39px auto 13px;border:10px solid #111;border-radius:10px;background:linear-gradient(150deg,#020408,#102635 45%,#020305 47%);box-shadow:0 14px 22px #000c,inset 0 0 22px #4aa6c855}
#hq66.fix71 .h70-tv:before{content:"ALASKA ICE CRYSTALS";position:absolute;inset:0;display:grid;place-items:center;color:#baf4ff;font:italic 800 15px Georgia;letter-spacing:.12em;text-shadow:0 0 10px #27cfff}
#hq66.fix71 .h70-console{z-index:3;width:96%;height:238px;border:9px solid #251207;border-radius:10px;background:linear-gradient(#a2683b,#5c3219);grid-template-columns:1fr 2.9fr 1fr;gap:10px;padding:15px;box-shadow:0 24px 30px #000c,inset 0 0 0 3px #b87c4c}
#hq66.fix71 .h70-console:before{content:"";position:absolute;left:-2%;right:-2%;top:-15px;height:21px;border:5px solid #2a160b;border-radius:7px;background:linear-gradient(#c38b57,#70401f);box-shadow:0 10px 12px #0008}
#hq66.fix71 .h70-cabinet{border-width:5px;background:linear-gradient(115deg,#342016 0 18%,#a76d43 19% 49%,#5b321d 50% 75%,#321a0e 76%);box-shadow:inset 0 0 0 3px #c28b5e77,0 8px 13px #0008}
#hq66.fix71 .h70-electric{border:12px solid #11171b;border-radius:7px;background:radial-gradient(ellipse at 50% 100%,#241007,#020203 74%);box-shadow:0 0 25px var(--g),inset 0 0 28px #000}
#hq66.fix71 .h70-electric:before{height:21px;background:repeating-linear-gradient(90deg,#323b3f 0 9%,#070809 9% 12%)}
#hq66.fix71 .h70-electric:after{height:31px;bottom:5px;opacity:.9}
#hq66.fix71 .h70-flames{left:5%;right:5%;bottom:25px;height:145px;background:none;display:flex;align-items:flex-end;justify-content:space-around;gap:2px;filter:drop-shadow(0 0 15px var(--c));animation:none}
#hq66.fix71 .h70-flames i{display:block;width:10%;height:58%;border-radius:72% 28% 65% 35%/72% 42% 58% 28%;background:linear-gradient(0deg,var(--f1) 0 14%,var(--f2) 15% 58%,var(--f3) 59% 82%,transparent 83%);transform-origin:50% 100%;animation:h71flame .72s ease-in-out infinite alternate}
#hq66.fix71 .h70-flames i:nth-child(2n){height:88%;animation-delay:-.32s;transform:rotate(3deg)}
#hq66.fix71 .h70-flames i:nth-child(3n){height:70%;animation-delay:-.51s;transform:rotate(-5deg)}
#hq66.fix71 .h70-flames i:nth-child(5n){height:100%;animation-delay:-.18s}
@keyframes h71flame{to{height:76%;transform:scaleX(.78) rotate(4deg);filter:brightness(1.22)}}
#hq66.fix71 .h70-crystal-trim{height:14px;bottom:-17px;border:2px solid #bff8ff;background:linear-gradient(90deg,var(--d),var(--c),#fff,var(--c),var(--d));box-shadow:0 0 22px var(--g)}
#hq66.fix71 .h70-label{bottom:88px;font-size:16px;text-shadow:0 0 12px var(--c)}
#hq66.fix71 .h70-controls{left:16px;right:16px;bottom:14px;gap:9px}
#hq66.fix71 .h70-controls button{min-height:66px;font-size:13px;border-width:2px;border-radius:13px;box-shadow:0 7px 10px #0009}
.h71-hearth-logs{position:absolute;left:28%;right:28%;bottom:10px;height:18px;z-index:5;background:repeating-linear-gradient(12deg,#32170b 0 14px,#8a421d 15px 27px,#251006 28px 38px);border-radius:50%;box-shadow:0 0 10px #000}
.h71-snow-window{position:absolute;top:54px;width:16%;height:112px;border:9px solid #39200f;border-radius:8px;background:linear-gradient(155deg,#07192b 0 42%,#176783 43% 54%,#e8f4f6 55%);box-shadow:inset 0 0 19px #000a,0 10px 17px #0008}.h71-snow-window.l{left:3%}.h71-snow-window.r{right:3%}.h71-snow-window:before{content:"";position:absolute;left:46%;top:0;bottom:0;width:7px;background:#39200f}.h71-snow-window:after{content:"";position:absolute;left:0;right:0;top:47%;height:7px;background:#39200f}

/* Finished living room */
#hq66.fix71 .h70-living-room{min-height:610px;background:linear-gradient(180deg,#945e36 0 22%,#65401f 23% 69%,#2e170b 70%);padding:24px}
#hq66.fix71 .h70-living-room h2,#hq66.fix71 .h70-kitchen h2,#hq66.fix71 .h70-dining h2{position:relative;z-index:3;font-size:27px;color:#ffe2ab;text-shadow:0 3px 4px #000;letter-spacing:.1em}
#hq66.fix71 .h70-sofa{left:9%;right:9%;top:94px;height:215px;border:10px solid #2d160a;border-radius:48px 48px 18px 18px;background:linear-gradient(#c08a59,#81502c 64%,#432311);box-shadow:0 28px 28px #000b,inset 0 0 0 3px #e0ab7566}
#hq66.fix71 .h70-sofa:before{left:8%;right:8%;top:31px;height:112px;border-radius:29px;background:linear-gradient(#d2a06d,#93613a);box-shadow:inset 0 0 0 5px #66401f,0 8px 11px #0006}
#hq66.fix71 .h70-sofa:after{top:28px;bottom:46px;width:5px;box-shadow:-85px 0 0 #6b4324,85px 0 0 #6b4324}
.h71-pillow{position:absolute;top:139px;z-index:5;width:67px;height:58px;border:4px solid #321a0e;border-radius:14px 22px;background:linear-gradient(135deg,#174e5f,#2a8a99 55%,#103744);box-shadow:0 7px 9px #0008}.h71-pillow.l{left:16%;transform:rotate(-10deg)}.h71-pillow.r{right:16%;transform:rotate(10deg)}
#hq66.fix71 .h70-chair{bottom:61px;width:25%;height:190px;border:8px solid #2b1509;border-radius:45px 45px 20px 20px;background:linear-gradient(#a66e43,#63381e 70%,#351a0c);box-shadow:0 23px 24px #000b,inset 0 0 0 3px #bd855666}
#hq66.fix71 .h70-chair:before{content:"";position:absolute;left:15%;right:15%;top:26px;height:105px;border-radius:28px 28px 12px 12px;background:linear-gradient(#bf895b,#754629);box-shadow:inset 0 0 0 4px #53301b}
#hq66.fix71 .h70-chair.l{left:4%;transform:rotate(7deg)}#hq66.fix71 .h70-chair.r{right:4%;transform:rotate(-7deg)}
#hq66.fix71 .h70-rug{left:12%;right:12%;bottom:28px;height:190px;box-shadow:0 18px 24px #000b}
#hq66.fix71 .h70-table{left:31%;right:31%;bottom:75px;height:119px;border-width:9px;background:radial-gradient(ellipse,#bd7b3c,#542910 72%);box-shadow:0 22px 20px #000c}
#hq66.fix71 .h70-book{width:148px;height:82px;font-size:15px;box-shadow:0 10px 14px #000c,inset 0 0 0 3px #70572e}
#hq66.fix71 .h70-end{bottom:198px;width:16%;height:77px;border-width:7px;background:linear-gradient(#b3773f,#5a2d14);box-shadow:0 12px 14px #0009}
#hq66.fix71 .h70-lamp{width:52px;height:72px;bottom:61px;background:linear-gradient(105deg,transparent 12%,#f7d58c 13% 87%,transparent 88%);filter:drop-shadow(0 0 13px #ffd884)}

/* Finished country kitchen */
#hq66.fix71 .h70-kitchen{min-height:610px;background:linear-gradient(180deg,#95613a 0 24%,#63391d 25% 72%,#32190c 73%);padding:24px}
#hq66.fix71 .h70-upper{left:6%;right:31%;top:82px;height:142px;gap:9px}
#hq66.fix71 .h70-upper i{border:7px solid #32190c;border-radius:7px;background:linear-gradient(130deg,#b27a4c,#71401f 58%,#452411);box-shadow:inset 0 0 0 3px #cf9b6866,0 8px 10px #0007}
#hq66.fix71 .h70-upper i:after{content:"";display:block;width:8px;height:8px;margin:60px 13px 0 auto;border-radius:50%;background:#d5b278;box-shadow:0 0 5px #fff8}
#hq66.fix71 .h70-counter{left:5%;right:30%;top:238px;height:118px;border:9px solid #2d170a;border-top:17px solid #dcc19e;background:linear-gradient(90deg,#75411e 0 47%,#925c31 48%);box-shadow:0 15px 17px #000a}
#hq66.fix71 .h70-counter:before{content:"SINK";position:absolute;left:10%;top:21px;width:31%;height:54px;display:grid;place-items:center;border:5px solid #273438;border-radius:50%;background:linear-gradient(135deg,#bdd6d8,#70878b);color:#26383c;font-weight:900}
#hq66.fix71 .h70-counter:after{content:"STOVE";position:absolute;right:7%;top:17px;width:30%;height:66px;display:grid;place-items:end center;padding-bottom:3px;border:5px solid #202020;border-radius:5px;background:radial-gradient(circle at 28% 40%,#080808 0 14%,#444 15% 20%,transparent 21%),radial-gradient(circle at 72% 40%,#080808 0 14%,#444 15% 20%,transparent 21%),#73787a;color:#1a1a1a;font-size:10px;font-weight:900}
#hq66.fix71 .h70-fridge{right:4%;top:80px;width:23%;height:281px;border-width:9px;box-shadow:0 19px 22px #000b,inset 0 0 13px #fff5}
#hq66.fix71 .h70-island{left:13%;right:30%;bottom:90px;height:146px;border-width:9px;border-top:18px solid #e0c39a;background:linear-gradient(#80502d,#542a12);box-shadow:0 22px 22px #000b}
#hq66.fix71 .h70-island:before{margin-top:54px;font-size:16px;color:#ffe0ab}
#hq66.fix71 .h70-stools{left:16%;right:34%;bottom:22px}.h70-stools i{width:65px!important;height:66px!important;border-width:7px!important;background:linear-gradient(#ad7647,#62371e)!important;box-shadow:0 12px 13px #0009}
.h71-pendants{position:absolute;left:16%;right:37%;top:37px;display:flex;justify-content:space-around;z-index:4}.h71-pendants i{width:42px;height:46px;border-radius:50% 50% 12% 12%;background:radial-gradient(circle,#fff3bd 0 21%,#d39746 22% 62%,#4a290f 64%);box-shadow:0 0 18px #ffd478}.h71-pendants i:before{content:"";display:block;width:4px;height:35px;margin:-31px auto 0;background:#25150c}

/* Finished dining room */
#hq66.fix71 .h70-dining{min-height:420px;background:linear-gradient(180deg,#8e5934,#5a3219 68%,#2c160a);padding:25px}
#hq66.fix71 .h70-dining-table{left:12%;right:12%;top:120px;height:145px;border:11px solid #2a1409;background:radial-gradient(ellipse,#bf7b3f,#6c3618 67%,#3b1c0c);box-shadow:0 27px 25px #000c,inset 0 0 0 4px #d39b6266}
#hq66.fix71 .h70-dining-table:before{content:"";width:84px;height:48px;margin:auto;border-radius:50%;background:radial-gradient(circle,#f6dd9d 0 12%,#227284 14% 31%,#c69a52 33% 48%,transparent 50%);filter:drop-shadow(0 4px 5px #000)}
#hq66.fix71 .h70-dining-chairs{left:8%;right:8%;bottom:20px}.h70-dining-chairs i{width:92px!important;height:101px!important;border-width:8px!important;background:linear-gradient(#a66d40,#593018)!important;box-shadow:0 15px 15px #0009,inset 0 0 0 3px #c48b5b55}
.h71-chandelier{position:absolute;left:50%;top:48px;transform:translateX(-50%);width:180px;height:53px;border-bottom:7px solid #24150d;border-radius:50%;z-index:4}.h71-chandelier:before{content:"";position:absolute;left:50%;top:-59px;width:5px;height:72px;background:#25150c}.h71-chandelier i{position:absolute;bottom:-8px;width:31px;height:31px;border-radius:50%;background:radial-gradient(circle,#fff7c9,#d69338 52%,#503014 56%);box-shadow:0 0 17px #ffd36d}.h71-chandelier i:nth-child(1){left:8px}.h71-chandelier i:nth-child(2){left:74px}.h71-chandelier i:nth-child(3){right:8px}

/* Upstairs is also a completed home, not an empty shelf and bed. */
#hq66.fix71 #h69-up .h69-shell{min-height:1220px}
#hq66.fix71 .h69-up{display:flex;flex-direction:column;gap:24px;min-height:1120px;padding:140px 5% 55px}
#hq66.fix71 .h69-loft,#hq66.fix71 .h69-bedroom{position:relative;width:auto;min-height:500px;padding:25px;border:7px solid #32190b;border-radius:23px;background:linear-gradient(155deg,#895633ee,#4c2814f2);box-shadow:0 25px 35px #000b,inset 0 0 35px #1a0903,0 0 0 2px #b77c4744}
#hq66.fix71 .h69-up h2{font-size:27px;color:#ffe0a9;text-shadow:0 3px 4px #000}
#hq66.fix71 .h69-case{height:245px;border-width:12px;box-shadow:0 15px 20px #0009,inset 0 0 18px #100603}
#hq66.fix71 .h69-case i{height:59px;box-shadow:inset 4px 0 #d0a35c55}
#hq66.fix71 .h69-desk{height:112px;font-size:16px;background:linear-gradient(#9d6537,#5c2e14);box-shadow:0 18px 20px #000a,inset 0 0 0 3px #bd865366}
#hq66.fix71 .h69-bed{height:245px;margin:34px 5% 0;border-width:12px;background:linear-gradient(#f5ecdc 0 23%,#1b7183 24% 61%,#865330 62%);box-shadow:0 22px 25px #000b,inset 0 0 0 3px #f6ddb855}
#hq66.fix71 .h69-bed:after{content:"ALASKA GUEST SUITE";display:block;margin:57px auto 0;text-align:center;color:#ddf9ff;font:900 14px Georgia;letter-spacing:.14em;text-shadow:0 2px 4px #000}
#hq66.fix71 .h69-night{height:100px;margin:-31px 3% 0 auto;border-width:7px;background:linear-gradient(#9f6738,#592c14);box-shadow:0 14px 16px #0009}
.h71-up-note{text-align:center;margin-top:12px;color:#d9f7ff;font:800 13px system-ui;letter-spacing:.09em}.h71-wardrobe{position:absolute;right:5%;top:87px;width:22%;height:236px;border:8px solid #2b160a;border-radius:8px;background:linear-gradient(90deg,#86522d 0 48%,#542b13 49%);box-shadow:0 17px 20px #000a}.h71-wardrobe:before,.h71-wardrobe:after{content:"";position:absolute;top:49%;width:8px;height:8px;border-radius:50%;background:#d3ad6b}.h71-wardrobe:before{left:39%}.h71-wardrobe:after{right:39%}

@media(max-width:900px){
 #hq66.fix71 #h69-down .h69-shell{min-height:2320px}
 #hq66.fix71 #h69-down .h69-living{min-height:2220px;padding:96px 3% 55px}
 #hq66.fix71 .h70-fire-room{min-height:620px;padding-bottom:232px}
 #hq66.fix71 .h70-label{bottom:205px}
 #hq66.fix71 .h70-controls{grid-template-columns:1fr 1fr;bottom:15px}
 #hq66.fix71 .h70-controls button{min-height:82px;font-size:15px}
 #hq66.fix71 .h70-living-room,#hq66.fix71 .h70-kitchen{min-height:620px}
 #hq66.fix71 .h70-dining{min-height:425px}
}
@media(max-width:430px){
 #hq66.fix71 .h69-head button{min-width:68px;font-size:14px}
 #hq66.fix71 .h69-title span{font-size:9px}
 #hq66.fix71 .h70-fire-room:before{font-size:13px}
 #hq66.fix71 .h70-tv{width:66%}
 #hq66.fix71 .h70-console{grid-template-columns:.75fr 3fr .75fr}
 #hq66.fix71 .h70-living-room h2,#hq66.fix71 .h70-kitchen h2,#hq66.fix71 .h70-dining h2{font-size:23px}
 #hq66.fix71 .h70-book{width:125px;height:76px;font-size:13px}
}
`;
document.head.appendChild(css);

const title=root.querySelector('.h69-title span');
if(title)title.textContent='FINISHED TWO-STORY LOG HOME • ALASKA';
const flames=document.getElementById('h70-flames');
if(flames)flames.innerHTML='<i></i>'.repeat(11);
const consoleEl=root.querySelector('.h70-console');
if(consoleEl)consoleEl.insertAdjacentHTML('beforeend','<div class="h71-hearth-logs"></div>');
const fireRoom=root.querySelector('.h70-fire-room');
if(fireRoom)fireRoom.insertAdjacentHTML('afterbegin','<div class="h71-snow-window l"></div><div class="h71-snow-window r"></div>');
const living=root.querySelector('.h70-living-room');
if(living)living.insertAdjacentHTML('beforeend','<div class="h71-pillow l"></div><div class="h71-pillow r"></div>');
const kitchen=root.querySelector('.h70-kitchen');
if(kitchen)kitchen.insertAdjacentHTML('beforeend','<div class="h71-pendants"><i></i><i></i><i></i></div>');
const dining=root.querySelector('.h70-dining');
if(dining)dining.insertAdjacentHTML('beforeend','<div class="h71-chandelier"><i></i><i></i><i></i></div>');
const loft=root.querySelector('.h69-loft');
if(loft)loft.insertAdjacentHTML('beforeend','<div class="h71-up-note">KJV STUDY • SKIE READING • QUIET LOFT</div>');
const bedroom=root.querySelector('.h69-bedroom');
if(bedroom)bedroom.insertAdjacentHTML('beforeend','<div class="h71-wardrobe"></div>');
})();
