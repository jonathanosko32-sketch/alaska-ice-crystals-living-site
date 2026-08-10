(() => {
  const style=document.createElement('style');
  style.textContent=`
    /* v21: one continuous property ground. Sector ground layers were sliding
       independently during camera movement and looking like separate acreage. */
    .property::before{
      content:'';
      position:absolute;
      z-index:1;
      left:-18%;right:-18%;top:28%;bottom:-10%;
      pointer-events:none;
      background:linear-gradient(180deg,rgba(18,53,59,.52),rgba(5,25,34,.98));
      clip-path:polygon(7% 0,93% 0,100% 100%,0 100%);
    }
    .sector-world{z-index:5!important}
    .property-sector .sector-ground{background:transparent!important;box-shadow:none!important}
    .sector-right .sector-ground,.sector-back .sector-ground,.sector-left .sector-ground{background:transparent!important}
    .camera-stage{z-index:6!important}
    .property-map-button-v16,.finger-nav-hint-v9{z-index:79!important}
  `;
  document.head.appendChild(style);
})();
