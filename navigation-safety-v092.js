(() => {
  const property=document.getElementById('property');
  const entrance=document.getElementById('entrance');
  const backButton=document.getElementById('backButton');
  const panel=document.querySelector('.store-panel-v088');
  const storeOpen=document.querySelector('.store-open-v088');
  const lookControls=document.querySelector('.look-controls');
  const lookToggle=document.querySelector('.look-toggle');
  const stage=document.getElementById('cameraStage');

  const hardReturnToWorld=()=>{
    if(panel) panel.hidden=true;
    document.body.classList.remove('store-panel-open-v090');
    if(storeOpen) storeOpen.hidden=false;
  };

  const hardReturnToEntrance=()=>{
    hardReturnToWorld();
    if(property) property.hidden=true;
    if(entrance) entrance.hidden=false;
    if(stage){
      stage.classList.remove('back-property-active');
      stage.style.translate='0px 0px';
      stage.style.scale='1';
      stage.style.opacity='1';
    }
    document.querySelectorAll('.property-sector').forEach(el=>{el.style.opacity='0';el.style.transform='';});
    const compass=document.querySelector('#lookCompass');
    const readout=document.querySelector('#lookReadout');
    if(compass) compass.textContent='GATE • 0°';
    if(readout) readout.textContent='0° • 100%';
    if(lookControls) lookControls.hidden=true;
    if(lookToggle){lookToggle.textContent='VIEW 360°';lookToggle.setAttribute('aria-expanded','false');}
    property?.classList.remove('viewer-360-active');
    window.scrollTo({top:0,left:0,behavior:'auto'});
  };

  panel?.querySelector('.store-close-v088')?.addEventListener('click',hardReturnToWorld,{capture:true});
  backButton?.addEventListener('click',hardReturnToEntrance,{capture:true});

  const style=document.createElement('style');
  style.textContent=`
    .store-panel-v088 .store-close-v088{position:sticky;bottom:0;z-index:4;display:block!important}
    .store-panel-v088[hidden]{display:none!important}
    #backButton{z-index:170!important}
  `;
  document.head.appendChild(style);
})();
