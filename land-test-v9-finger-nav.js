(() => {
  const property=document.getElementById('property');
  const enter=document.getElementById('enterButton');
  if(!property||!enter)return;

  const style=document.createElement('style');
  style.textContent=`
    /* v9 test: finger-first property navigation. Hide the 360 control box. */
    .look-controls,.look-toggle{display:none!important}
    .stable-swipe-v097{pointer-events:none!important}
    .finger-nav-v9{position:absolute;z-index:70;left:0;right:0;top:72px;bottom:82px;display:none;touch-action:none;background:transparent}
    .property.viewer-360-active .finger-nav-v9{display:block}
    .finger-nav-hint-v9{position:fixed;z-index:79;left:50%;bottom:22px;transform:translateX(-50%);padding:7px 12px;border:1px solid rgba(110,232,250,.32);border-radius:999px;background:rgba(3,24,34,.72);color:#bdeff5;font-size:.58rem;font-weight:800;letter-spacing:.08em;pointer-events:none;opacity:.72}
    @media(max-width:520px){.finger-nav-v9{top:66px;bottom:72px}.finger-nav-hint-v9{bottom:16px}}
  `;
  document.head.appendChild(style);

  const surface=document.createElement('div');
  surface.className='finger-nav-v9';
  surface.setAttribute('aria-label','Swipe left or right to move around the property');
  property.appendChild(surface);

  const hint=document.createElement('div');
  hint.className='finger-nav-hint-v9';
  hint.textContent='SWIPE TO LOOK AROUND';
  property.appendChild(hint);

  const rightBtn=()=>document.querySelector('button[data-look="right"]');
  const leftBtn=()=>document.querySelector('button[data-look="left"]');
  const lookToggle=()=>document.querySelector('.look-toggle');

  const enableFingerView=()=>{
    const toggle=lookToggle();
    if(toggle && !property.classList.contains('viewer-360-active')) toggle.click();
    property.classList.add('viewer-360-active');
  };

  enter.addEventListener('click',()=>setTimeout(enableFingerView,40));

  let active=false,lastX=0,accum=0;
  const STEP_PX=24;
  const turn=(dir)=>{
    const b=dir>0?rightBtn():leftBtn();
    if(b)b.click();
  };
  surface.addEventListener('pointerdown',e=>{
    active=true;lastX=e.clientX;accum=0;
    surface.setPointerCapture?.(e.pointerId);
  });
  surface.addEventListener('pointermove',e=>{
    if(!active)return;
    const dx=e.clientX-lastX;
    lastX=e.clientX;
    accum+=dx;
    while(Math.abs(accum)>=STEP_PX){
      /* Finger left turns view right; finger right turns view left. */
      turn(accum<0?1:-1);
      accum+=accum<0?STEP_PX:-STEP_PX;
    }
  });
  const stop=e=>{
    active=false;accum=0;
    try{surface.releasePointerCapture?.(e.pointerId);}catch(_){}
  };
  surface.addEventListener('pointerup',stop);
  surface.addEventListener('pointercancel',()=>{active=false;accum=0});

  /* Keep things the user must tap above the finger navigation sheet. */
  document.querySelectorAll('.store-open-v088,.store-enter,.back-button,#backButton,.store-modal').forEach(el=>{el.style.position=el.style.position||'relative';el.style.zIndex='90';});

  const stamp=document.querySelector('.build-stamp');
  if(stamp)stamp.textContent='LAND TEST • v9 finger navigation + spread property';
})();
