(() => {
 const right=document.querySelector('.sector-right');
 const back=document.querySelector('.sector-back');
 const left=document.querySelector('.sector-left');
 if(!right||!back||!left)return;

 const style=document.createElement('style');
 style.textContent=`
  /* v18 — add a few more log buildings and give every destination its own road/driveway. */
  .log-building-v18{position:absolute;z-index:9;height:18%;border:1px solid rgba(126,228,241,.28);border-radius:12px 12px 5px 5px;background:repeating-linear-gradient(180deg,rgba(89,56,31,.97) 0 10px,rgba(117,75,39,.96) 10px 14px,rgba(65,42,26,.98) 14px 23px);box-shadow:0 14px 28px rgba(0,0,0,.38),inset 0 0 14px rgba(78,221,246,.04);pointer-events:none}
  .log-building-v18:before{content:'';position:absolute;left:-5%;right:-5%;top:-24%;height:30%;clip-path:polygon(0 100%,18% 35%,50% 0,82% 35%,100% 100%);background:linear-gradient(180deg,rgba(58,46,38,.98),rgba(30,27,25,.99));filter:drop-shadow(0 5px 7px rgba(0,0,0,.34))}
  .log-building-v18 .name{position:absolute;left:50%;top:7%;transform:translateX(-50%);padding:4px 8px;border:1px solid rgba(130,234,249,.25);border-radius:999px;background:rgba(3,23,32,.9);color:#e4fbff;font-size:.48rem;font-weight:900;letter-spacing:.06em;white-space:nowrap}
  .log-building-v18 .door{position:absolute;left:50%;bottom:0;width:27%;height:55%;transform:translateX(-50%);border:1px solid rgba(131,230,244,.22);background:repeating-linear-gradient(90deg,rgba(55,42,31,.9) 0 8px,rgba(94,66,39,.9) 8px 13px)}
  .log-building-v18 .win{position:absolute;top:40%;width:14%;height:17%;border:1px solid rgba(128,231,245,.28);background:rgba(90,203,224,.12)}
  .log-building-v18 .w1{left:10%}.log-building-v18 .w2{right:10%}

  .truck-service-v18{right:23%;top:56%;width:23%}
  .freight-office-v18{left:54%;top:71%;width:20%}
  .cabins-office-v18{left:29%;top:59%;width:22%}

  .drive-v18{position:absolute;z-index:4;height:8%;pointer-events:none;background:linear-gradient(180deg,rgba(66,75,75,.55),rgba(20,33,36,.88));clip-path:polygon(0 25%,100% 0,100% 75%,0 100%);box-shadow:inset 0 0 8px rgba(0,0,0,.25)}
  .drive-v18:after{content:'';position:absolute;left:0;right:0;top:47%;height:1px;background:rgba(110,225,239,.15)}
  .right-drive-workshop{left:18%;top:65%;width:31%;transform:rotate(6deg)}
  .right-drive-freightdock{right:2%;top:70%;width:29%;transform:rotate(-7deg)}
  .right-drive-service{right:22%;top:70%;width:28%;transform:rotate(-4deg)}
  .right-drive-office{left:47%;top:78%;width:31%;transform:rotate(7deg)}
  .back-drive-store{right:3%;top:67%;width:34%;transform:rotate(-5deg)}
  .back-drive-hq{left:39%;top:55%;width:25%;transform:rotate(1deg)}
  .back-drive-fire{left:5%;top:76%;width:30%;transform:rotate(6deg)}
  .back-drive-cabins{left:24%;top:72%;width:28%;transform:rotate(-3deg)}
  .left-drive-barn{left:3%;top:72%;width:32%;transform:rotate(7deg)}
  .left-drive-shop{right:3%;top:72%;width:32%;transform:rotate(-7deg)}

  /* Keep new builds comfortably spaced from old ones. */
  .sector-right .workshop-building{left:4%!important;top:39%!important;width:32%!important}
  .sector-right .freight-dock{right:2%!important;top:58%!important;width:16%!important}
  .sector-back .store-building{right:2%!important;top:39%!important;width:30%!important}
  .campfire-v7{left:3%!important;top:63%!important;width:18%!important}
  .log-barn-v8{left:3%!important;top:50%!important;width:23%!important}
  .log-shed-v8{right:3%!important;top:50%!important;width:23%!important}

  @media(max-width:520px){
    .truck-service-v18{right:20%;top:57%;width:22%}.freight-office-v18{left:51%;top:73%;width:20%}.cabins-office-v18{left:27%;top:60%;width:21%}
    .log-building-v18 .name{font-size:.43rem;padding:4px 6px}
  }
 `;
 document.head.appendChild(style);

 const addBuilding=(sector,cls,name)=>{if(sector.querySelector('.'+cls))return;const b=document.createElement('div');b.className='log-building-v18 '+cls;b.innerHTML=`<div class="name">${name}</div><i class="door"></i><i class="win w1"></i><i class="win w2"></i>`;sector.appendChild(b);};
 const addDrive=(sector,cls)=>{if(sector.querySelector('.'+cls))return;const d=document.createElement('div');d.className='drive-v18 '+cls;sector.insertBefore(d,sector.firstChild);};

 addBuilding(right,'truck-service-v18','OSKO TRUCK SERVICE');
 addBuilding(right,'freight-office-v18','OSKO FREIGHT OFFICE');
 addBuilding(back,'cabins-office-v18','OSKO CABIN OFFICE');

 ['right-drive-workshop','right-drive-freightdock','right-drive-service','right-drive-office'].forEach(c=>addDrive(right,c));
 ['back-drive-store','back-drive-hq','back-drive-fire','back-drive-cabins'].forEach(c=>addDrive(back,c));
 ['left-drive-barn','left-drive-shop'].forEach(c=>addDrive(left,c));

 const map=document.querySelector('.property-map-v16');
 if(map){
  const zones=map.querySelectorAll('.map-zone-v16');
  if(zones[1])zones[1].innerHTML='<strong>RIGHT • 90°</strong>Workshop • truck service • freight dock • freight office';
  if(zones[2])zones[2].innerHTML='<strong>BACK • 180°</strong>Headquarters • Outfitters • campfire • cabin office';
  if(zones[3])zones[3].innerHTML='<strong>LEFT • 270°</strong>OSKO Farm • log barn • farm shop • animals';
 }
 const stamp=document.querySelector('.build-stamp');if(stamp)stamp.textContent='LAND TEST • v18 more log buildings + roads to every build';
})();