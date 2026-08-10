(() => {
  const right=document.querySelector('.sector-right');
  const back=document.querySelector('.sector-back');
  const left=document.querySelector('.sector-left');
  if(!right||!back||!left)return;

  const style=document.createElement('style');
  style.textContent=`
    /* LAND TEST v8 — lock acreage, spread districts, add coded log farm buildings. */
    .sector-right .workshop-building{left:7%!important;top:40%!important;width:43%!important;z-index:8!important}
    .sector-right .freight-dock{right:5%!important;top:58%!important;width:22%!important;z-index:8!important}
    .sector-right .sector-zone.left-zone{left:5%!important;top:73%!important}
    .sector-right .sector-zone.right-zone{right:5%!important;top:73%!important}
    .sector-right .sector-zone.primary{left:52%!important;top:47%!important}

    .sector-back .store-building{right:5%!important;top:39%!important;width:44%!important;z-index:8!important}
    .sector-back .sector-zone.primary{left:49%!important;top:45%!important}
    .sector-back .sector-zone.left-zone{left:4%!important;top:71%!important}
    .sector-back .sector-zone.right-zone{right:4%!important;top:71%!important}
    .campfire-v7{left:3%!important;top:57%!important;width:28%!important}

    .sector-left .sector-zone.primary{top:36%!important;left:50%!important}
    .sector-left .sector-zone.left-zone{left:3%!important;top:72%!important}
    .sector-left .sector-zone.right-zone{right:3%!important;top:72%!important}

    .farm-v8{position:absolute;inset:0;z-index:8;pointer-events:none}
    .farm-v8 .farm-title{position:absolute;left:50%;top:48%;transform:translateX(-50%);padding:6px 12px;border:1px solid rgba(116,232,250,.32);border-radius:999px;background:rgba(3,24,34,.84);color:#dffbff;font-size:.6rem;font-weight:900;letter-spacing:.1em;white-space:nowrap}
    .farm-v8 .farm-field{position:absolute;left:4%;bottom:8%;width:38%;height:28%;border:1px solid rgba(109,219,235,.18);background:repeating-linear-gradient(100deg,rgba(33,75,62,.8) 0 9px,rgba(18,48,43,.86) 9px 18px);clip-path:polygon(8% 0,100% 8%,92% 100%,0 90%);box-shadow:inset 0 0 18px rgba(80,220,200,.06)}
    .farm-v8 .pasture{position:absolute;right:3%;bottom:8%;width:38%;height:28%;border:1px solid rgba(109,219,235,.18);background:linear-gradient(180deg,rgba(29,69,57,.72),rgba(10,39,36,.9));clip-path:polygon(0 8%,92% 0,100% 90%,8% 100%)}
    .farm-v8 .fence{position:absolute;left:2%;right:2%;bottom:33%;height:58px;opacity:.62;background:repeating-linear-gradient(0deg,transparent 0 14px,rgba(121,225,235,.45) 14px 18px,transparent 18px 30px)}
    .farm-v8 .fence:before,.farm-v8 .fence:after{content:'';position:absolute;top:0;bottom:0;width:5px;background:rgba(91,151,154,.7)}
    .farm-v8 .fence:before{left:24%}.farm-v8 .fence:after{right:24%}

    .log-farm-building{position:absolute;height:24%;border:1px solid rgba(126,228,241,.28);border-radius:12px 12px 5px 5px;background:repeating-linear-gradient(180deg,rgba(89,56,31,.97) 0 11px,rgba(117,75,39,.96) 11px 15px,rgba(65,42,26,.98) 15px 25px);box-shadow:0 14px 28px rgba(0,0,0,.4),inset 0 0 14px rgba(78,221,246,.04)}
    .log-farm-building:before{content:'';position:absolute;left:-5%;right:-5%;top:-24%;height:30%;clip-path:polygon(0 100%,18% 35%,50% 0,82% 35%,100% 100%);background:linear-gradient(180deg,rgba(58,46,38,.98),rgba(30,27,25,.99));filter:drop-shadow(0 5px 7px rgba(0,0,0,.34))}
    .log-farm-building:after{content:'';position:absolute;left:50%;top:-4%;width:8px;height:108%;transform:translateX(-50%);background:rgba(54,33,21,.35)}
    .log-farm-building .name{position:absolute;left:50%;top:7%;transform:translateX(-50%);padding:5px 9px;border:1px solid rgba(130,234,249,.25);border-radius:999px;background:rgba(3,23,32,.88);color:#e4fbff;font-size:.5rem;font-weight:900;letter-spacing:.07em;white-space:nowrap}
    .log-farm-building .door{position:absolute;left:50%;bottom:0;width:28%;height:56%;transform:translateX(-50%);border:1px solid rgba(131,230,244,.24);background:repeating-linear-gradient(90deg,rgba(55,42,31,.9) 0 8px,rgba(94,66,39,.9) 8px 13px)}
    .log-farm-building .win{position:absolute;top:38%;width:15%;height:18%;border:1px solid rgba(128,231,245,.28);background:rgba(90,203,224,.12)}
    .log-farm-building .w1{left:10%}.log-farm-building .w2{right:10%}
    .log-barn-v8{left:8%;top:49%;width:34%}
    .log-shed-v8{right:8%;top:50%;width:31%}

    .farm-path-v8{position:absolute;left:50%;bottom:0;width:24%;height:44%;transform:translateX(-50%);clip-path:polygon(42% 0,58% 0,100% 100%,0 100%);background:linear-gradient(180deg,rgba(73,81,78,.32),rgba(17,35,35,.82));opacity:.8}
    .farm-sign-v8{position:absolute;left:50%;bottom:26%;transform:translateX(-50%);padding:5px 9px;border:1px solid rgba(106,225,239,.24);border-radius:8px;background:rgba(5,29,37,.78);color:#bdeff4;font-size:.48rem;font-weight:900;letter-spacing:.06em}

    @media(max-width:520px){
      .sector-right .workshop-building{left:3%!important;width:46%!important}
      .sector-back .store-building{right:2%!important;width:46%!important}
      .campfire-v7{left:1%!important;width:30%!important}
      .log-barn-v8{left:3%;width:38%;top:51%}
      .log-shed-v8{right:3%;width:35%;top:52%}
      .farm-v8 .farm-title{top:46%}
      .farm-v8 .farm-field,.farm-v8 .pasture{height:25%;bottom:6%}
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
  if(stamp)stamp.textContent='LAND TEST • v8 spread layout + OSKO farm + 4 log buildings';
})();
