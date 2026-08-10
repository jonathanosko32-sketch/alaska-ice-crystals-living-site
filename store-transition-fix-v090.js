(() => {
  const style=document.createElement('style');
  style.textContent=`
    body.store-panel-open-v090 #cameraStage{filter:brightness(.42) saturate(.75);transition:filter .22s ease}
    body:not(.store-panel-open-v090) #cameraStage{filter:none!important;opacity:1!important}
    body:not(.store-panel-open-v090) .sector-back{opacity:1!important;filter:none!important}
    .sector-back[aria-hidden='false'] .sector-right,.sector-back[aria-hidden='false'] ~ .sector-right{opacity:0!important}
    .back-property-active .sector-right,.back-property-active .workshop-v085,.back-property-active .workshop-v087{opacity:0!important;visibility:hidden!important;pointer-events:none!important}
    body.store-panel-open-v090 .store-open-v088{opacity:0;pointer-events:none}
    .store-panel-v088{z-index:200!important}
  `;
  document.head.appendChild(style);
  const panel=document.querySelector('.store-panel-v088');
  const open=document.querySelector('.store-open-v088');
  if(!panel||!open)return;
  const sync=()=>document.body.classList.toggle('store-panel-open-v090',!panel.hidden);
  open.addEventListener('click',()=>requestAnimationFrame(sync));
  panel.querySelector('.store-close-v088')?.addEventListener('click',()=>requestAnimationFrame(sync));
  new MutationObserver(sync).observe(panel,{attributes:true,attributeFilter:['hidden']});
  sync();
})();
