(() => {
 const style=document.createElement('style');
 style.textContent=`
  /* v17: more room without losing orientation. Roads/map from v16 remain the guide. */
  .sector-right .workshop-building{left:3%!important;top:42%!important;width:31%!important}
  .sector-right .freight-dock{right:3%!important;top:63%!important;width:15%!important}
  .sector-right .sector-zone.primary{left:55%!important;top:48%!important}
  .sector-right .sector-zone.left-zone{left:4%!important;top:82%!important}
  .sector-right .sector-zone.right-zone{right:4%!important;top:82%!important}
  .sector-right .parking-lane.left{left:3%!important;width:17%!important}
  .sector-right .parking-lane.right{right:3%!important;width:17%!important}
  .sector-right .service-apron{left:34%!important;right:34%!important}

  .sector-back .store-building{right:3%!important;top:42%!important;width:29%!important}
  .sector-back .sector-zone.primary{left:50%!important;top:35%!important;transform:translateX(-50%)!important}
  .sector-back .sector-zone.left-zone{left:5%!important;top:83%!important}
  .sector-back .sector-zone.right-zone{right:5%!important;top:83%!important}
  .campfire-v7{left:4%!important;top:66%!important;width:17%!important}
  .campfire-v7 .stone-ring{width:80px!important}
  .campfire-v7 .log{width:48px!important}

  .log-barn-v8{left:3%!important;top:53%!important;width:21%!important}
  .log-shed-v8{right:3%!important;top:53%!important;width:21%!important}
  .farm-v8 .farm-field{left:3%!important;width:26%!important}
  .farm-v8 .pasture{right:3%!important;width:26%!important}
  .farm-v8 .fence{left:3%!important;right:3%!important}
  .sector-left .sector-zone.left-zone{left:4%!important;top:83%!important}
  .sector-left .sector-zone.right-zone{right:4%!important;top:83%!important}

  /* Keep roads visually central so the extra spacing still feels connected. */
  .district-road-v16.main{width:14%!important}
  .district-road-v16.left,.district-road-v16.right{width:43%!important;bottom:17%!important}

  @media(max-width:520px){
    .sector-right .workshop-building{left:2%!important;width:32%!important}
    .sector-right .freight-dock{right:2%!important;width:15%!important}
    .sector-back .store-building{right:2%!important;width:29%!important}
    .campfire-v7{left:2%!important;width:17%!important;top:68%!important}
    .log-barn-v8{left:2%!important;width:22%!important}
    .log-shed-v8{right:2%!important;width:22%!important}
  }
 `;
 document.head.appendChild(style);
 const stamp=document.querySelector('.build-stamp');
 if(stamp)stamp.textContent='LAND TEST • v17 more room + roads + map';
})();