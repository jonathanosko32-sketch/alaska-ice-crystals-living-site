(() => {
  const style=document.createElement('style');
  style.textContent=`
    /* v14 layout only: keep navigation speed untouched, clear gate approach, balance spacing so districts stay easy to find. */

    /* FRONT / RIGHT PROPERTY — bring pieces inward from the extreme edges but keep breathing room. */
    .sector-right .workshop-building{left:8%!important;top:43%!important;width:36%!important}
    .sector-right .freight-dock{right:5%!important;top:64%!important;width:18%!important}
    .sector-right .sector-zone.left-zone{left:6%!important;top:80%!important}
    .sector-right .sector-zone.right-zone{right:6%!important;top:80%!important}
    .sector-right .sector-zone.primary{left:57%!important;top:52%!important}
    .sector-right .parking-lane.left{left:5%!important;width:20%!important}
    .sector-right .parking-lane.right{right:5%!important;width:20%!important}
    .sector-right .service-apron{left:31%!important;right:31%!important}

    /* Keep the gate itself clean — no old node buttons sitting around the entrance. */
    .property.viewer-360-active .camera-stage .world-node{display:none!important}

    /* BACK PROPERTY — spread Outfitters, HQ and fire, but keep them close enough to read as one neighborhood. */
    .sector-back .store-building{right:5%!important;top:43%!important;width:34%!important}
    .sector-back .sector-zone.primary{left:50%!important;top:39%!important;transform:translateX(-50%)!important}
    .sector-back .sector-zone.left-zone{left:7%!important;top:81%!important}
    .sector-back .sector-zone.right-zone{right:7%!important;top:81%!important}
    .campfire-v7{left:7%!important;top:66%!important;width:20%!important}
    .campfire-v7 .stone-ring{width:88px!important}
    .campfire-v7 .log{width:54px!important}

    /* FARM — keep both log buildings apart, but not pushed so far to the edges that they feel disconnected. */
    .log-barn-v8{left:5%!important;top:54%!important;width:25%!important}
    .log-shed-v8{right:5%!important;top:54%!important;width:25%!important}
    .farm-v8 .farm-field{left:4%!important;width:30%!important}
    .farm-v8 .pasture{right:4%!important;width:30%!important}
    .farm-v8 .fence{left:4%!important;right:4%!important}
    .sector-left .sector-zone.left-zone{left:5%!important;top:81%!important}
    .sector-left .sector-zone.right-zone{right:5%!important;top:81%!important}

    @media(max-width:520px){
      .sector-right .workshop-building{left:4%!important;width:38%!important}
      .sector-right .freight-dock{right:3%!important;width:18%!important}
      .sector-back .store-building{right:3%!important;width:34%!important}
      .campfire-v7{left:3%!important;width:20%!important;top:68%!important}
      .log-barn-v8{left:3%!important;width:25%!important}
      .log-shed-v8{right:3%!important;width:25%!important}
    }
  `;
  document.head.appendChild(style);
  const stamp=document.querySelector('.build-stamp');
  if(stamp)stamp.textContent='LAND TEST • v14 balanced spacing';
})();
