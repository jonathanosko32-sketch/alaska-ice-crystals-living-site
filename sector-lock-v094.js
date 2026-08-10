(() => {
  const property=document.getElementById('property');
  const cameraStage=document.getElementById('cameraStage');
  const right=document.querySelector('.sector-right');
  const back=document.querySelector('.sector-back');
  const left=document.querySelector('.sector-left');
  const storeBtn=document.querySelector('.store-open-v088');
  if(!property||!cameraStage||!right||!back||!left)return;

  const setVis=(el,on)=>{
    el.style.setProperty('opacity',on?'1':'0','important');
    el.style.setProperty('visibility',on?'visible':'hidden','important');
    el.style.setProperty('pointer-events',on?'auto':'none','important');
  };
  const sync=()=>{
    const text=(document.querySelector('#lookCompass')?.textContent||'').trim();
    const isBack=text.startsWith('BACK PROPERTY');
    const isRight=text.startsWith('RIGHT PROPERTY');
    const isLeft=text.startsWith('LEFT PROPERTY');
    const isGate=text.startsWith('GATE');

    setVis(back,isBack);
    setVis(right,isRight);
    setVis(left,isLeft);

    cameraStage.style.setProperty('visibility',isGate?'visible':'hidden','important');
    cameraStage.style.setProperty('opacity',isGate?'1':'0','important');

    if(storeBtn){
      storeBtn.hidden=!isBack || property.hidden;
      storeBtn.style.setProperty('display',(!storeBtn.hidden)?'block':'none','important');
    }

    if(isBack) cameraStage.classList.add('back-property-active');
    else cameraStage.classList.remove('back-property-active');
  };

  setInterval(sync,80);
  document.addEventListener('click',()=>setTimeout(sync,30));
  sync();
})();
