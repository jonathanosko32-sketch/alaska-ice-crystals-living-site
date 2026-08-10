(() => {
  const property=document.getElementById('property');
  const entrance=document.getElementById('entrance');
  const stage=document.getElementById('cameraStage');
  const panel=document.querySelector('.store-panel-v088');
  const open=document.querySelector('.store-open-v088');
  const backButton=document.getElementById('backButton');
  const compass=document.querySelector('#lookCompass');
  if(!property||!entrance||!stage||!panel||!open||!backButton)return;

  const style=document.createElement('style');
  style.textContent=`
    .store-open-v088{z-index:240!important;pointer-events:auto!important;opacity:1!important}
    .store-panel-v088{z-index:260!important;pointer-events:auto!important}
    .store-panel-v088[hidden]{display:none!important}
    #backButton{z-index:250!important;pointer-events:auto!important}
    body.store-panel-open-v093 #backButton{display:none!important}
  `;
  document.head.appendChild(style);

  const headingText=()=>compass?.textContent||'';
  const onBackProperty=()=>headingText().includes('BACK PROPERTY');

  const closeStore=()=>{
    panel.hidden=true;
    document.body.classList.remove('store-panel-open-v090','store-panel-open-v093');
    stage.style.filter='';
    open.hidden=!onBackProperty();
  };

  const openStore=()=>{
    if(!onBackProperty()) return;
    panel.hidden=false;
    document.body.classList.add('store-panel-open-v093');
    document.body.classList.add('store-panel-open-v090');
  };

  const forceEntrance=()=>{
    closeStore();
    document.body.classList.remove('store-panel-open-v090','store-panel-open-v093');
    stage.classList.remove('back-property-active');
    document.querySelectorAll('.property-sector').forEach(el=>{el.style.opacity='';el.style.transform='';});
    stage.style.translate=''; stage.style.scale=''; stage.style.opacity=''; stage.style.filter='';
    property.hidden=true;
    entrance.hidden=false;
    open.hidden=true;
    const controls=document.querySelector('.look-controls'); if(controls) controls.hidden=true;
    const toggle=document.querySelector('.look-toggle'); if(toggle){toggle.textContent='VIEW 360°';toggle.setAttribute('aria-expanded','false');}
    property.classList.remove('viewer-360-active');
    window.scrollTo({top:0,left:0,behavior:'auto'});
  };

  const oldClose=panel.querySelector('.store-close-v088');
  if(oldClose){
    const replacement=oldClose.cloneNode(true);
    oldClose.replaceWith(replacement);
    replacement.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();closeStore();});
  }

  const newOpen=open.cloneNode(true);
  open.replaceWith(newOpen);
  newOpen.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();openStore();});

  backButton.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();forceEntrance();},true);

  setInterval(()=>{
    if(property.hidden){newOpen.hidden=true;return;}
    if(!panel.hidden){newOpen.hidden=true;return;}
    newOpen.hidden=!onBackProperty();
  },120);
})();
