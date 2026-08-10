(() => {
  const style=document.createElement('style');
  style.textContent=`
    /* v1.0.2: turn each view into a real property area instead of a narrow road strip. */
    .sector{overflow:visible!important}
    .sector:before{
      content:'';position:absolute;left:-18vw;right:-18vw;top:50%;bottom:0;z-index:0;
      background:
        linear-gradient(90deg,rgba(17,55,60,.58),rgba(23,74,72,.22) 34%,rgba(12,35,42,.28) 50%,rgba(23,74,72,.22) 66%,rgba(17,55,60,.58));
      box-shadow:inset 0 18px 40px rgba(0,0,0,.22);
      pointer-events:none;
    }
    .sector:after{
      content:'';position:absolute;left:36%;right:36%;top:49%;bottom:0;z-index:1;
      background:linear-gradient(180deg,rgba(74,92,94,.35),rgba(12,28,34,.78));
      clip-path:polygon(42% 0,58% 0,100% 100%,0 100%);
      opacity:.75;pointer-events:none;
    }
    .sector-zone,.sector-crystal,.workshop-v085,.store-v088{z-index:4!important}
    .sector-right .workshop-building{left:34%!important;top:36%!important;width:40%!important;height:27%!important}
    .sector-right .parking-lane.left{left:3%!important;bottom:14%!important;width:26%!important}
    .sector-right .parking-lane.right{right:4%!important;bottom:14%!important;width:26%!important}
    .sector-right .freight-dock{right:-1%!important;top:56%!important;width:18%!important}
    .sector-back .store-building{right:5%!important;top:34%!important;width:42%!important;height:31%!important}
    .sector-back .store-path{right:1%!important;width:47%!important}
    .sector-left .sector-zone.primary{left:24%!important;transform:none!important}
    .sector-left .sector-zone.left-zone{left:3%!important}
    .sector-left .sector-zone.right-zone{right:3%!important}
    .sector-front .sector-zone.left-zone{left:3%!important}.sector-front .sector-zone.right-zone{right:3%!important}
    @media(max-width:520px){
      .sector:before{left:-24vw;right:-24vw}
      .sector:after{left:38%;right:38%}
      .sector-right .workshop-building{left:33%!important;width:43%!important}
      .sector-back .store-building{right:4%!important;width:44%!important}
    }
  `;
  document.head.appendChild(style);
  const stamp=document.querySelector('.build-stamp');
  if(stamp)stamp.textContent='AIC Living Site • v1.0.2';
})();
