(() => {
 const style=document.createElement('style');
 style.textContent=`
  /* Back property is its own destination: keep other sectors completely out of this view. */
  .sector-back{overflow:hidden!important}
  .sector-back .store-building{right:2%!important;top:34%!important;width:48%!important;height:31%!important;transform:none!important}
  .sector-back .store-path{right:0!important;bottom:4%!important;width:52%!important;height:31%!important}
  .sector-back .store-light{right:50%!important}
  .sector-back .store-v088{opacity:1!important;filter:none!important}
  .back-property-active .sector-front,.back-property-active .sector-right,.back-property-active .sector-left,
  .back-property-active .workshop-v085,.back-property-active .workshop-v086,.back-property-active .workshop-v087,
  .back-property-active .reference-layout,.back-property-active .gate-frame,
  .back-property-active .world-node,.back-property-active .outfitters-ground{visibility:hidden!important;opacity:0!important;pointer-events:none!important}
  .back-property-active .sector-back,.back-property-active .sector-back .store-v088,.back-property-active .sector-back .store-building{visibility:visible!important;opacity:1!important}
  .back-property-active .property-hud{opacity:0!important;pointer-events:none!important}
  .back-property-active #lookCompass{opacity:1!important}
  .back-property-active .road,.back-property-active .road-glow{opacity:.55!important}
  @media(max-width:520px){.sector-back .store-building{right:3%!important;top:35%!important;width:50%!important;height:29%!important}.sector-back .store-path{right:0!important;width:55%!important}}
 `;
 document.head.appendChild(style);
 const stage=document.getElementById('cameraStage');
 const compass=()=>document.querySelector('#lookCompass')?.textContent||'';
 const sync=()=>{if(!stage)return;stage.classList.toggle('back-property-active',compass().includes('BACK PROPERTY'));};
 setInterval(sync,120); document.addEventListener('click',()=>setTimeout(sync,20)); sync();
})();
