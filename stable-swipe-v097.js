(() => {
  const property=document.getElementById('property');
  if(!property) return;
  const controls=()=>document.querySelector('.look-controls');
  const rightBtn=()=>document.querySelector('button[data-look="right"]');
  const leftBtn=()=>document.querySelector('button[data-look="left"]');

  const style=document.createElement('style');
  style.textContent=`
    .property.viewer-360-active .camera-stage{pointer-events:none!important}
    .stable-swipe-v097{position:absolute;z-index:55;left:0;right:0;top:90px;bottom:230px;display:none;touch-action:none;background:transparent}
    .property.viewer-360-active .stable-swipe-v097{display:block}
    .property-sector{transition:opacity .08s linear!important,transform .08s linear!important}
    .camera-stage{transition:translate .08s linear,scale .08s linear,opacity .08s linear!important}
    @media(max-width:520px){.stable-swipe-v097{top:80px;bottom:220px}}
  `;
  document.head.appendChild(style);

  const surface=document.createElement('div');
  surface.className='stable-swipe-v097';
  surface.setAttribute('aria-label','360 degree swipe area');
  property.appendChild(surface);

  let sx=0, sy=0, active=false;
  const step=(dir,count=6)=>{
    const btn=dir==='right'?rightBtn():leftBtn();
    if(!btn) return;
    for(let i=0;i<count;i++) btn.click();
  };
  surface.addEventListener('pointerdown',e=>{active=true;sx=e.clientX;sy=e.clientY;surface.setPointerCapture?.(e.pointerId);});
  surface.addEventListener('pointerup',e=>{
    if(!active) return; active=false;
    const dx=e.clientX-sx, dy=e.clientY-sy;
    if(Math.abs(dx)>35 && Math.abs(dx)>Math.abs(dy)) step(dx<0?'right':'left',6);
    try{surface.releasePointerCapture?.(e.pointerId);}catch(_){}
  });
  surface.addEventListener('pointercancel',()=>{active=false;});

  const store=document.querySelector('.store-open-v088');
  if(store) store.style.zIndex='80';
  const back=document.getElementById('backButton');
  if(back){back.style.position='relative';back.style.zIndex='80';}
})();
