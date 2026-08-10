(() => {
 const style=document.createElement('style');
 style.textContent=`
  /* v19 — property cleanup from phone screenshots. LAND SIZE IS LOCKED. */

  /* FRONT GATE: keep the gate/approach open and readable. */
  .property.viewer-360-active .camera-stage .world-node{display:none!important}

  /* RIGHT / 90° TRUCKING DISTRICT: nothing should hang off-screen or stack on the center road. */
  .sector-right .workshop-building{left:5%!important;top:41%!important;width:29%!important;max-width:none!important}
  .truck-service-v18{left:39%!important;right:auto!important;top:52%!important;width:22%!important}
  .sector-right .freight-dock{right:4%!important;top:58%!important;width:15%!important}
  .freight-office-v18{left:auto!important;right:21%!important;top:71%!important;width:19%!important}
  .sector-right .sector-zone.primary{left:50%!important;top:48%!important;transform:translateX(-50%)!important;width:32%!important}
  .sector-right .sector-zone.left-zone{left:5%!important;top:82%!important}
  .sector-right .sector-zone.right-zone{right:5%!important;top:82%!important}
  .sector-right .service-apron{left:36%!important;right:36%!important}
  .sector-right .parking-lane.left{left:4%!important;width:18%!important}
  .sector-right .parking-lane.right{right:4%!important;width:18%!important}

  /* BACK / 180° COMMUNITY + COMMERCE: separate HQ, store, fire, and cabin office into clear lots. */
  .sector-back .sector-zone.primary{left:7%!important;top:40%!important;transform:none!important;width:34%!important;max-width:none!important}
  .sector-back .store-building{right:4%!important;top:43%!important;width:27%!important;max-width:none!important}
  .campfire-v7{left:5%!important;top:66%!important;width:18%!important}
  .cabins-office-v18{left:38%!important;top:67%!important;width:20%!important}
  .sector-back .sector-zone.left-zone{left:5%!important;top:84%!important}
  .sector-back .sector-zone.right-zone{right:5%!important;top:84%!important}

  /* FARM / 270°: preserve the good farm layout, just make the lots read as separate destinations. */
  .log-barn-v8{left:4%!important;top:52%!important;width:22%!important}
  .log-shed-v8{right:4%!important;top:52%!important;width:22%!important}
  .farm-v8 .farm-field{left:4%!important;bottom:9%!important;width:27%!important}
  .farm-v8 .pasture{right:4%!important;bottom:9%!important;width:27%!important}
  .farm-v8 .fence{left:4%!important;right:4%!important}
  .sector-left .sector-zone.left-zone{left:5%!important;top:83%!important}
  .sector-left .sector-zone.right-zone{right:5%!important;top:83%!important}

  /* Roads: keep main road clear, branch roads terminate at their own lot instead of crossing buildings. */
  .right-drive-workshop{left:16%!important;top:65%!important;width:25%!important;transform:rotate(8deg)!important}
  .right-drive-service{right:35%!important;top:65%!important;width:22%!important;transform:rotate(-2deg)!important}
  .right-drive-freightdock{right:4%!important;top:70%!important;width:23%!important;transform:rotate(-8deg)!important}
  .right-drive-office{left:auto!important;right:18%!important;top:78%!important;width:24%!important;transform:rotate(6deg)!important}
  .back-drive-hq{left:20%!important;top:57%!important;width:24%!important;transform:rotate(-5deg)!important}
  .back-drive-store{right:6%!important;top:64%!important;width:25%!important;transform:rotate(7deg)!important}
  .back-drive-fire{left:7%!important;top:76%!important;width:23%!important;transform:rotate(5deg)!important}
  .back-drive-cabins{left:37%!important;top:76%!important;width:22%!important;transform:rotate(-2deg)!important}
  .left-drive-barn{left:5%!important;top:69%!important;width:27%!important;transform:rotate(7deg)!important}
  .left-drive-shop{right:5%!important;top:69%!important;width:27%!important;transform:rotate(-7deg)!important}

  @media(max-width:520px){
    .sector-right .workshop-building{left:3%!important;width:28%!important}
    .truck-service-v18{left:38%!important;width:21%!important}
    .sector-right .freight-dock{right:2%!important;width:15%!important}
    .freight-office-v18{right:19%!important;width:18%!important}
    .sector-back .sector-zone.primary{left:4%!important;width:35%!important}
    .sector-back .store-building{right:2%!important;width:27%!important}
    .campfire-v7{left:2%!important;width:18%!important}
    .cabins-office-v18{left:38%!important;width:19%!important}
    .log-barn-v8{left:2%!important;width:22%!important}
    .log-shed-v8{right:2%!important;width:22%!important}
  }
 `;
 document.head.appendChild(style);
 const stamp=document.querySelector('.build-stamp');
 if(stamp)stamp.textContent='LAND TEST • v19 organized districts • land size locked';
})();