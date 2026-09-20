(function hq72CompleteFloorsAndControls(){
'use strict';
const root=document.getElementById('hq66');
if(!root||document.getElementById('hq72-style'))return;
root.classList.add('fix72');

// Enlarge the installed phone shell controls too. The house runs in its iframe.
try{
  if(window.parent&&window.parent!==window){
    const pd=window.parent.document;
    if(!pd.getElementById('fix72-phone-big-controls')){
      const ps=pd.createElement('style');
      ps.id='fix72-phone-big-controls';
      ps.textContent='.bar{gap:12px!important;padding:14px!important}.btn{min-height:76px!important;min-width:76px!important;padding:16px 20px!important;font-size:19px!important;border-radius:13px!important}.state{font-size:18px!important}.panel .btn{min-height:82px!important;font-size:19px!important}';
      pd.head.appendChild(ps);
    }
    const panel=pd.getElementById('panel');
    if(panel)setTimeout(()=>panel.classList.remove('show'),350);
  }
}catch(_){}

const css=document.createElement('style');
css.id='hq72-style';
css.textContent=`
/* Every important control is deliberately large enough for a phone and a demonstration. */
#view-toggle{width:132px!important;height:78px!important;min-width:132px!important;min-height:78px!important;font-size:18px!important;border-width:3px!important}
#view-adjust{grid-template-columns:132px 132px!important;gap:13px!important}
#view-adjust button{width:132px!important;height:106px!important;min-width:132px!important;min-height:106px!important;font-size:38px!important}
#dock{gap:11px!important;padding:12px!important}
#dock>button{height:82px!important;min-height:82px!important;font-size:18px!important;border-width:2px!important}
.chip{min-width:92px!important;min-height:66px!important;padding:13px 18px!important;font-size:16px!important;border-radius:14px!important}

#hq66.fix72 .h69-head{grid-template-columns:96px 1fr 96px;min-height:94px;padding:13px}
#hq66.fix72 .h69-head button{min-width:94px!important;min-height:80px!important;font-size:18px!important;border-radius:14px}
#hq66.fix72 .h69-title b{font-size:clamp(20px,5.4vw,30px)}
#hq66.fix72 .h69-title span{font-size:12px}
#hq66.fix72 .h69-tabs{gap:13px;padding:13px}
#hq66.fix72 .h69-tabs button{min-height:94px!important;font-size:21px!important;border-radius:15px}
#hq66.fix72 .h69-foot{gap:13px;padding:12px}
#hq66.fix72 .h69-foot button{height:94px!important;min-height:94px!important;font-size:20px!important;border-radius:15px}
#hq66.fix72 .h70-controls{gap:11px}
#hq66.fix72 .h70-controls button{min-height:86px!important;padding:11px!important;font-size:16px!important;border-radius:15px}

/* The downstairs remains completely furnished and has room to scroll above the large footer. */
#hq66.fix72 #h69-down .h69-shell{min-height:2470px}
#hq66.fix72 #h69-down .h69-living{min-height:2370px;padding-bottom:150px}
#hq66.fix72 .h70-kitchen{min-height:660px}
#hq66.fix72 .h70-dining{min-height:455px}

/* Rebuilt full upstairs floor. */
#hq66.fix72 #h69-up .h69-shell{min-height:2410px;background:linear-gradient(90deg,#1e0d05aa,transparent 7% 93%,#1e0d05aa),repeating-linear-gradient(0deg,#88512b 0 28px,#5a3018 29px 34px,#925a31 35px 63px)}
#hq66.fix72 #h69-up .h69-floor{height:19%}
#hq66.fix72 .h69-up{display:block;min-height:2300px;padding:128px 4% 155px}
.h72-upstairs{display:flex;flex-direction:column;gap:24px}
.h72-room{position:relative;overflow:hidden;border:8px solid #30170a;border-radius:25px;background:linear-gradient(155deg,#946039ee,#593019f4 60%,#32180bed);box-shadow:0 28px 42px #000c,inset 0 0 42px #170803,0 0 0 2px #c28c5544}
.h72-room:after{content:"";position:absolute;inset:12px;border:1px solid #e0b06b3b;border-radius:15px;pointer-events:none}
.h72-room h2{position:relative;z-index:4;margin:0;padding:24px 15px 12px;text-align:center;color:#ffe2aa;font:900 29px Georgia;text-shadow:0 3px 5px #000;letter-spacing:.08em}
.h72-room h3{margin:0;color:#f4d39b;font:900 18px Georgia;letter-spacing:.08em}
.h72-library{min-height:760px;background:linear-gradient(180deg,#9d673e 0 19%,#673a1d 20% 72%,#32190c 73%)}
.h72-library-window{position:absolute;left:5%;top:88px;width:25%;height:180px;border:12px solid #38200f;border-radius:8px;background:linear-gradient(#071827 0 43%,#237996 44% 57%,#ecf7f8 58%);box-shadow:inset 0 0 23px #000b,0 14px 18px #0009}
.h72-library-window:before,.h72-library-window:after{content:"";position:absolute;background:#38200f}.h72-library-window:before{left:48%;top:0;bottom:0;width:8px}.h72-library-window:after{left:0;right:0;top:48%;height:8px}
.h72-bookwall{position:absolute;left:34%;right:5%;top:82px;height:285px;padding:12px;border:13px solid #2a1408;border-radius:10px;background:repeating-linear-gradient(0deg,#75431f 0 14px,#231006 15px 22px,#7f4b28 23px 69px);display:grid;grid-template-columns:repeat(8,1fr);gap:5px;align-items:end;box-shadow:0 20px 25px #000b,inset 0 0 20px #130702}
.h72-bookwall i{height:59px;border:2px solid #cda963;background:linear-gradient(90deg,#123b55,#bd813b 51%,#194d68);box-shadow:inset 4px 0 #e8c37655}
.h72-reading{position:absolute;left:5%;bottom:55px;width:40%;height:330px}
.h72-reading-chair{position:absolute;left:3%;right:15%;bottom:20px;height:235px;border:10px solid #2b1509;border-radius:58px 58px 22px 22px;background:linear-gradient(#b57d50,#744323 69%,#3b1c0d);box-shadow:0 25px 25px #000b,inset 0 0 0 4px #d3a07255;transform:rotate(3deg)}
.h72-reading-chair:before{content:"";position:absolute;left:13%;right:13%;top:32px;height:130px;border-radius:38px 38px 14px 14px;background:linear-gradient(#d09c6b,#8b5834);box-shadow:inset 0 0 0 5px #5e381f}
.h72-reading-lamp{position:absolute;right:0;top:4px;width:74px;height:84px;background:linear-gradient(105deg,transparent 10%,#f6d58d 11% 89%,transparent 90%);filter:drop-shadow(0 0 17px #ffd77c)}
.h72-reading-lamp:after{content:"";position:absolute;left:34px;top:76px;width:7px;height:202px;background:#28170d;box-shadow:0 188px 0 18px #45230f}
.h72-study{position:absolute;left:49%;right:5%;bottom:52px;height:300px;border:9px solid #2b1509;border-radius:13px;background:linear-gradient(#a96d3b 0 26px,#6b3617 27px);box-shadow:0 22px 24px #000b,inset 0 0 0 3px #c9935b55}
.h72-study:before{content:"SKIE STUDY DESK";display:grid;place-items:center;height:100%;color:#ffe2aa;font:900 18px Georgia;letter-spacing:.11em}
.h72-study-chair{position:absolute;left:63%;bottom:12px;width:145px;height:154px;border:8px solid #2a150a;border-radius:30px 30px 12px 12px;background:linear-gradient(#95603a,#552c16);box-shadow:0 17px 19px #000a}

.h72-bedroom{min-height:850px;background:linear-gradient(180deg,#945f39 0 18%,#64381d 19% 75%,#31180b 76%)}
.h72-snow-window{position:absolute;left:5%;top:88px;width:25%;height:190px;border:12px solid #38200f;border-radius:8px;background:linear-gradient(155deg,#061625 0 40%,#2c819c 41% 55%,#eff9fa 56%);box-shadow:inset 0 0 22px #000b,0 14px 20px #0009}
.h72-snow-window:before,.h72-snow-window:after{content:"";position:absolute;background:#38200f}.h72-snow-window:before{left:48%;top:0;bottom:0;width:8px}.h72-snow-window:after{left:0;right:0;top:48%;height:8px}
.h72-wardrobe{position:absolute;right:5%;top:88px;width:25%;height:272px;border:11px solid #2c160a;border-radius:9px;background:linear-gradient(90deg,#986039 0 48%,#603116 49%);box-shadow:0 19px 23px #000b,inset 0 0 0 3px #c48b5d55}
.h72-wardrobe:before,.h72-wardrobe:after{content:"";position:absolute;top:50%;width:10px;height:10px;border-radius:50%;background:#e0ba75;box-shadow:0 0 7px #fff7}.h72-wardrobe:before{left:40%}.h72-wardrobe:after{right:40%}
.h72-bed{position:absolute;left:14%;right:14%;top:320px;height:330px;border:13px solid #2d1609;border-radius:34px 34px 12px 12px;background:linear-gradient(#f4ecdf 0 23%,#16758a 24% 60%,#8e5b36 61%);box-shadow:0 29px 31px #000c,inset 0 0 0 4px #f8dfbb55}
.h72-bed:before{content:"";position:absolute;left:8%;right:8%;top:24px;height:88px;border-radius:21px;background:linear-gradient(90deg,#fff8e9 0 48%,#d9cebb 49% 51%,#fff8e9 52%);box-shadow:inset 0 0 0 4px #c8bba7}
.h72-bed:after{content:"ALASKA GUEST SUITE";position:absolute;left:0;right:0;top:168px;text-align:center;color:#e8fcff;font:900 18px Georgia;letter-spacing:.15em;text-shadow:0 3px 5px #000}
.h72-night{position:absolute;bottom:82px;width:17%;height:119px;border:9px solid #2d160a;border-radius:9px;background:linear-gradient(#a86d3c,#5b2e15);box-shadow:0 17px 19px #000a}.h72-night.l{left:4%}.h72-night.r{right:4%}
.h72-night:before{content:"";position:absolute;left:50%;top:-91px;transform:translateX(-50%);width:62px;height:75px;background:linear-gradient(105deg,transparent 10%,#f8d990 11% 89%,transparent 90%);filter:drop-shadow(0 0 16px #ffda7d)}
.h72-bench{position:absolute;left:30%;right:30%;bottom:39px;height:104px;border:9px solid #2c1509;border-radius:20px;background:linear-gradient(#b67c4c,#69381b);box-shadow:0 18px 18px #000a}

.h72-prayer{min-height:510px;background:linear-gradient(180deg,#8f5a34,#593018 69%,#2d160a)}
.h72-prayer-rug{position:absolute;left:8%;right:8%;bottom:30px;height:250px;border-radius:50%;background:radial-gradient(ellipse,#1b6a7b 0 18%,#e2ba6b 19% 27%,#743628 28% 48%,#1c5f6f 49% 59%,#d4a958 60% 68%,#392015 69%);box-shadow:0 20px 23px #000b}
.h72-settee{position:absolute;left:7%;width:42%;top:107px;height:224px;border:10px solid #2b1509;border-radius:48px 48px 19px 19px;background:linear-gradient(#b98253,#754322 68%,#3c1d0d);box-shadow:0 23px 24px #000b,inset 0 0 0 4px #d4a06c55}
.h72-settee:before{content:"";position:absolute;inset:30px 12% 55px;border-radius:28px;background:linear-gradient(#d09b68,#8c5834);box-shadow:inset 0 0 0 5px #5e381e}
.h72-prayer-table{position:absolute;right:7%;top:130px;width:36%;height:170px;border:11px solid #2a1408;border-radius:50%;background:radial-gradient(ellipse,#bd7a3c,#542810 72%);box-shadow:0 24px 22px #000c;display:grid;place-items:center}
.h72-bible{width:190px;height:112px;border:5px solid #d2b66d;border-radius:9px;background:linear-gradient(135deg,#16110c,#392716 52%,#0d0a07);box-shadow:0 13px 16px #000c,inset 0 0 0 3px #73592d;color:#edd595;font:900 18px Georgia;line-height:1.2;touch-action:manipulation}
.h72-bible small{display:block;margin-top:6px;font-size:11px}
.h72-prayer-note{position:absolute;left:0;right:0;bottom:27px;text-align:center;color:#e4f9ff;font:900 14px system-ui;letter-spacing:.12em;text-shadow:0 2px 4px #000}

@media(max-width:500px){
 #hq66.fix72 .h69-head{grid-template-columns:78px 1fr 78px}
 #hq66.fix72 .h69-head button{min-width:76px!important;font-size:15px!important}
 #hq66.fix72 .h69-title span{font-size:9px}
 #hq66.fix72 .h69-tabs button{font-size:18px!important}
 #hq66.fix72 .h70-controls button{font-size:14px!important}
 .h72-room h2{font-size:25px}
 .h72-study:before{font-size:15px}
 .h72-bed:after{font-size:15px}
 .h72-bible{width:155px;font-size:15px}
}
`;
document.head.appendChild(css);

const upstairs=root.querySelector('.h69-up');
if(upstairs){
  upstairs.innerHTML=`
  <div class="h72-upstairs">
    <section class="h72-room h72-library">
      <h2>Library & Study Loft</h2>
      <div class="h72-library-window"></div>
      <div class="h72-bookwall">${'<i></i>'.repeat(32)}</div>
      <div class="h72-reading"><div class="h72-reading-chair"></div><div class="h72-reading-lamp"></div></div>
      <div class="h72-study"></div><div class="h72-study-chair"></div>
    </section>
    <section class="h72-room h72-bedroom">
      <h2>Alaska Guest Bedroom</h2>
      <div class="h72-snow-window"></div><div class="h72-wardrobe"></div>
      <div class="h72-bed"></div><div class="h72-night l"></div><div class="h72-night r"></div><div class="h72-bench"></div>
    </section>
    <section class="h72-room h72-prayer">
      <h2>Prayer & Reading Room</h2>
      <div class="h72-prayer-rug"></div><div class="h72-settee"></div>
      <div class="h72-prayer-table"><button class="h72-bible" id="h72-bible">HOLY BIBLE<small>KING JAMES VERSION</small></button></div>
      <div class="h72-prayer-note">A QUIET PLACE FOR SCRIPTURE • PRAYER • SKIE READING</div>
    </section>
  </div>`;
}
const bible=document.getElementById('h72-bible');
if(bible)bible.onclick=()=>document.getElementById('h69-bible')?.click();
const title=root.querySelector('.h69-title span');
if(title)title.textContent='COMPLETE UPSTAIRS + DOWNSTAIRS LOG HOME';
})();
