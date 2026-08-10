(() => {
  const right=document.querySelector('.sector-right');
  const back=document.querySelector('.sector-back');
  const left=document.querySelector('.sector-left');
  if(!right||!back||!left)return;

  const style=document.createElement('style');
  style.textContent=`
    /* LAND TEST v11 — acreage locked, clear the gate, spread every district farther apart. */
    .sector-right .workshop-building{left:14%!important;top:42%!important;width:34%!important;z-index:8!important}
    .sector-right .freight-dock{right:1%!important;top:64%!important;width:17%!important;z-index:8!important}
    .sector-right .sector-zone.left-zone{left:1%!important;top:82%!important}
    .sector-right .sector-zone.right-zone{right:1%!important;top:82%!important}
    .sector-right .sector-zone.primary{left:58%!important;top:51%!important}
    .sector-right .parking-lane.left{left:1%!important;width:18%!important}
    .sector-right .parking-lane.right{right:1%!important;width:18%!important}
    .sector-right .service-apron{left:35%!important;right:35%!important}
    .sector-right .yard-post.p1{left:10%!important}.sector-right .yard-post.p2{left:29%!important}.sector-right .yard-post.p3{right:29%!important}.sector-right .yard-post.p4{right:10%!important}

    .sector-back .store-building{right:1%!important;top:44%!important;width:32%!important;z-index:8!important}
    .sector-back .sector-zone.primary{left:50%!important;top:38%!important;transform:translateX(-50%)!important}
    .sector-back .sector-zone.left-zone{left:2%!important;top:84%!important}
    .sector-back .sector-zone.right-zone{right:2%!important;top:84%!important}
    .campfire-v7{left:2%!important;top:67%!important;width:18%!important}
    .campfire-v7 .stone-ring{width:82px!important}
    .campfire-v7 .log{width:50px!important}

    .sector-left .sector-zone.primary{top:30%!important;left:50%!important;transform:translateX(-50%)!important}
    .sector-left .sector-zone.left-zone{left:1%!important;top:83%!important}
    .sector-left .sector-zone.right-zone{right:1%!important;top:83%!important}

    /* The old clickable node labels were useful during the first build, but they crowd the front gate now. */
    .property.viewer-360-active .camera-stage .world-node{display:none!important}

    .farm-v8{position:absolute;inset:0;z-index:8;pointer-events:none}
    .farm-v8 .farm-title{position:absolute;left:50%;top:42%;transform:translateX(-50%);padding:6px 12px;border:1px solid rgba(116,232,250,.32);border-radius:999px;background:rgba(3,24,34,.84);color:#dffbff;font-size:.6rem;font-weight:900;letter-spacing:.1em;white-space:nowrap}
    .farm-v8 .farm-field{position:absolute;left:1%;bottom:3%;width:31%;height:24%;border:1px solid rgba(109,219,235,.18);background:repeating-linear-gradient(100deg,rgba(33,75,62,.8) 0 9px,rgba(18,48,43,.86) 9px 18px);clip-path:polygon(8% 0,100% 8%,92% 100%,0 90%);box-shadow:inset 0 0 18px rgba(80,220,200,.06)}
    .farm-v8 .pasture{position:absolute;right:1%;bottom:3%;width:31%;height:24%;border:1px solid rgba(109,219,235,.18);background:linear-gradient(180deg,rgba(29,69,57,.72),rgba(10,39,36,.9));clip-path:polygon(0 8%,92% 0,100% 90%,8% 100%)}
    .farm-v8 .fence{position:absolute;left:1%;right:1%;bottom:29%;height:58px;opacity:.62;background:repeating-linear-gradient(0deg,transparent 0 14px,rgba(121,225,235,.45) 14px 18px,transparent 18px 30px)}
    .farm-v8 .fence:before,.farm-v8 .fence:after{content:'';position:absolute;top:0;bottom:0;width:5px;background:rgba(91,151,154,.7)}
    .farm-v8 .fence:before{left:16%}.farm-v8 .fence:after{right:16%}

    .log-farm-building{position:absolute;height:20%;border:1px solid rgba(126,228,241,.28);border-radius:12px 12px 5px 5px;background:repeating-linear-gradient(180deg,rgba(89,56,31,.97) 0 11px,rgba(117,75,39,.96) 11px 15px,rgba(65,42,26,.98) 15px 25px);box-shadow:0 14px 28px rgba(0,0,0,.4),inset 0 0 14px rgba(78,221,246,.04)}
    .log-farm-building:before{content:'';position:absolute;left:-5%;right:-5%;top:-24%;height:30%;clip-path:polygon(0 100%,18% 35%,50% 0,82% 35%,100% 100%);background:linear-gradient(180deg,rgba(58,46,38,.98),rgba(30,27,25,.99));filter:drop-shadow(0 5px 7px rgba(0,0,0,.34))}
    .log-farm-building:after{content:'';position:absolute;left:50%;top:-4%;width:8px;height:108%;transform:translateX(-50%);background:rgba(54,33,21,.35)}
    .log-farm-building .name{position:absolute;left:50%;top:7%;transform:translateX(-50%);padding:5px 9px;border:1px solid rgba(130,234,249,.25);border-radius:999px;background:rgba(3,23,32,.88);color:#e4fbff;font-size:.5rem;font-weight:900;letter-spacing:.07em;white-space:nowrap}
    .log-farm-building .door{position:absolute;left:50%;bottom:0;width:28%;height:56%;transform:translateX(-50%);border:1px solid rgba(131,230,244,.24);background:repeating-linear-gradient(90deg,rgba(55,42,31,.9) 0 8px,rgba(94,66,39,.9) 8px 13px)}
    .log-farm-building .win{position:absolute;top:38%;width:15%;height:18%;border:1px solid rgba(128,231,245,.28);background:rgba(90,203,224,.12)}
    .log-farm-building .w1{left:10%}.log-farm-building .w2{right:10%}
    .log-barn-v8{left:1%;top:53%;width:24%}
    .log-shed-v8{right:1%;top:53%;width:24%}

    .farm-path-v8{position:absolute;left:50%;bottom:0;width:14%;height:44%;transform:translateX(-50%);clip-path:polygon(42% 0,58% 0,100% 100%,0 100%);background:linear-gradient(180deg,rgba(73,81,78,.32),rgba(17,35,35,.82));opacity:.8}
    .farm-sign-v8{position:absolute;left:50%;bottom:22%;transform:translateX(-50%);padding:5px 9px;border:1px solid rgba(106,225,239,.24);border-radius:8px;background:rgba(5,29,37,.78);color:#bdeff4;font-size:.48rem;font-weight:900;letter-spacing:.06em}

    @media(max-width:520px){
      .sector-right .workshop-building{left:5%!important;width:36%!important;top:43%!important}
      .sector-right .freight-dock{right:0!important;width:16%!important;top:65%!important}
      .sector-back .store-building{right:0!important;width:31%!important;top:45%!important}
      .campfire-v7{left:0!important;width:17%!important;top:69%!important}
      .sector-back .sector-zone.primary{top:37%!important}
      .sector-back .sector-zone.left-zone,.sector-back .sector-zone.right-zone{top:86%!important}
      .log-barn-v8{left:0;width:23%;top:55%}
      .log-shed-v8{right:0;width:23%;top:55%}
      .farm-v8 .farm-title{top:41%}
      .farm-v8 .farm-field,.farm-v8 .pasture{height:22%;bottom:3%;width:29%}
      .farm-path-v8{width:13%}
    }
  `;
  document.head.appendChild(style);

  if(!left.querySelector('.farm-v8')){
    const farm=document.createElement('div');
    farm.className='farm-v8';
    farm.innerHTML=`
      <div class="farm-title">OSKO FARM</div>
      <div class="farm-field"></div><div class="pasture"></div><div class="fence"></div><div class="farm-path-v8"></div>
      <div class="log-farm-building log-barn-v8"><div class="name">OSKO LOG BARN</div><i class="door"></i><i class="win w1"></i><i class="win w2"></i></div>
      <div class="log-farm-building log-shed-v8"><div class="name">OSKO FARM SHOP</div><i class="door"></i><i class="win w1"></i><i class="win w2"></i></div>
      <div class="farm-sign-v8">FARM • ANIMALS • EQUIPMENT</div>`;
    left.appendChild(farm);
  }

  const stamp=document.querySelector('.build-stamp');
  if(stamp)stamp.textContent='LAND TEST • v11 clear gate + wider districts + OSKO farm';
})();
