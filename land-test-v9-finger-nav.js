(() => {
  const property=document.getElementById('property');
  const enter=document.getElementById('enterButton');
  if(!property||!enter)return;

  const style=document.createElement('style');
  style.textContent=`
    /* v10 test: finger-first property navigation with smoother vertical movement. */
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
  surface.setAttribute('aria-label','Swipe around the property');
  property.appendChild(surface);

  const hint=document.createElement('div');
  hint.className='finger-nav-hint-v9';
  hint.textContent='SWIPE TO LOOK AROUND';
  property.appendChild(hint);

  const rightBtn=()=>document.querySelector('button[data-look="right"]');
  const leftBtn=()=>document.querySelector('button[data-look="left"]');
  const upBtn=()=>document.querySelector('button[data-look="up"]');
  const downBtn=()=>document.querySelector('button[data-look="down"]');
  const lookToggle=()=>document.querySelector('.look-toggle');

  const enableFingerView=()=>{
    const toggle=lookToggle();
    if(toggle && !property.classList.contains('viewer-360-active')) toggle.click();
    property.classList.add('viewer-360-active');
  };

  enter.addEventListener('click',()=>setTimeout(enableFingerView,40));

  let active=false,lastX=0,lastY=0,accumX=0,accumY=0,axis='';
  const STEP_X=24;
  const STEP_Y=15;
  const AXIS_LOCK=8;

  const turn=(dir)=>{
    const b=dir>0?rightBtn():leftBtn();
    if(b)b.click();
  };
  const moveVertical=(dir)=>{
    /* Natural finger drag: drag up moves the view up; drag down moves it down. */
    const b=dir<0?downBtn():upBtn();
    if(b)b.click();
  };

  surface.addEventListener('pointerdown',e=>{
    active=true;
    lastX=e.clientX;lastY=e.clientY;
    accumX=0;accumY=0;axis='';
    surface.setPointerCapture?.(e.pointerId);
  });

  surface.addEventListener('pointermove',e=>{
    if(!active)return;
    const dx=e.clientX-lastX;
    const dy=e.clientY-lastY;
    lastX=e.clientX;lastY=e.clientY;

    accumX+=dx;
    accumY+=dy;

    if(!axis && (Math.abs(accumX)>=AXIS_LOCK || Math.abs(accumY)>=AXIS_LOCK)){
      axis=Math.abs(accumX)>=Math.abs(accumY)?'x':'y';
    }

    if(axis==='x'){
      while(Math.abs(accumX)>=STEP_X){
        /* Finger left turns view right; finger right turns view left. */
        turn(accumX<0?1:-1);
        accumX+=accumX<0?STEP_X:-STEP_X;
      }
      accumY=0;
    }else if(axis==='y'){
      while(Math.abs(accumY)>=STEP_Y){
        moveVertical(accumY<0?-1:1);
        accumY+=accumY<0?STEP_Y:-STEP_Y;
      }
      accumX=0;
    }
  });

  const stop=e=>{
    active=false;accumX=0;accumY=0;axis='';
    try{surface.releasePointerCapture?.(e.pointerId);}catch(_){}
  };
  surface.addEventListener('pointerup',stop);
  surface.addEventListener('pointercancel',()=>{active=false;accumX=0;accumY=0;axis=''});

  /* Keep things the user must tap above the finger navigation sheet. */
  document.querySelectorAll('.store-open-v088,.store-enter,.back-button,#backButton,.store-modal').forEach(el=>{el.style.position=el.style.position||'relative';el.style.zIndex='90';});

  const stamp=document.querySelector('.build-stamp');
  if(stamp)stamp.textContent='LAND TEST • v10 finger navigation + smoother up/down';
})();
