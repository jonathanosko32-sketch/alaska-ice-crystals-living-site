(() => {
 const style=document.createElement('style');
 style.textContent=`
 /* v20 — same approved acreage. Increase usable spacing inside each district. */
 .sector-right .workshop-building{left:-3%!important;top:34%!important;width:28%!important}
 .truck-service-v18{right:39%!important;top:48%!important;width:20%!important}
 .sector-right .freight-dock{right:0!important;top:51%!important;width:15%!important}
 .freight-office-v18{left:63%!important;top:72%!important;width:18%!important}
 .sector-right .sector-zone.left-zone{left:3%!important;top:79%!important}
 .sector-right .sector-zone.right-zone{right:3%!important;top:79%!important}
 .sector-right .sector-zone.primary{left:50%!important;top:55%!important;transform:translateX(-50%)!important}

 .sector-back .sector-zone.primary{left:24%!important;top:35%!important;transform:none!important;width:35%!important}
 .sector-back .store-building{right:-1%!important;top:36%!important;width:28%!important}
 .campfire-v7{left:0!important;top:68%!important;width:17%!important}
 .cabins-office-v18{left:42%!important;top:67%!important;width:18%!important}
 .sector-back .sector-zone.left-zone{left:5%!important;top:84%!important}
 .sector-back .sector-zone.right-zone{right:5%!important;top:84%!important}

 .log-barn-v8{left:1%!important;top:48%!important;width:22%!important}
 .log-shed-v8{right:1%!important;top:48%!important;width:22%!important}
 .farm-v8 .farm-field{left:2%!important;top:72%!important;width:27%!important}
 .farm-v8 .pasture{right:2%!important;top:72%!important;width:27%!important}
 .sector-left .sector-zone.primary{top:61%!important}
 .sector-left .sector-zone.left-zone{left:3%!important;top:83%!important}
 .sector-left .sector-zone.right-zone{right:3%!important;top:83%!important}

 /* Pull labels off roofs/roads where possible. */
 .log-building-v18 .name{top:4%!important}

 /* v22 — ONE continuous land plane. Older sector/camera layers were painting separate
    green slabs, which became visible as horizontal bands when finger navigation moved. */
 .property::before{
   left:-420vw!important;right:-420vw!important;top:32%!important;bottom:-120%!important;
   background:linear-gradient(180deg,#123747 0%,#0a2937 34%,#061d29 72%,#041722 100%)!important;
   border-top:0!important;
 }
 .property-sector .sector-ground,
 .sector-right .sector-ground,.sector-back .sector-ground,.sector-left .sector-ground{
   background:transparent!important;border:0!important;box-shadow:none!important;
 }
 .camera-stage::before{background:transparent!important;border:0!important;box-shadow:none!important}

 /* Keep the workshop inside the phone camera instead of letting its left side disappear. */
 .sector-right .workshop-building{left:2%!important;width:27%!important}
 .property-sector,.sector-world,.sector-right,.sector-back,.sector-left{overflow:visible!important}

 @media(max-width:520px){
  .sector-right .workshop-building{left:1%!important;width:27%!important}
  .truck-service-v18{right:38%!important;width:19%!important}
  .sector-right .freight-dock{right:-2%!important;width:15%!important}
  .freight-office-v18{left:64%!important;width:18%!important}
  .sector-back .store-building{right:-3%!important;width:29%!important}
  .campfire-v7{left:-2%!important;width:17%!important}
  .cabins-office-v18{left:41%!important;width:18%!important}
  .log-barn-v8{left:0!important;width:22%!important}
  .log-shed-v8{right:0!important;width:22%!important}
  .property::before{left:-480vw!important;right:-480vw!important;top:31%!important}
 }
 `;
 document.head.appendChild(style);
 const stamp=document.querySelector('.build-stamp');
 if(stamp)stamp.textContent='LAND TEST • v22 single ground • acreage unchanged';
})();
