(() => {
  const property=document.getElementById('property');
  const controls=document.querySelector('.look-controls');
  if(!property||!controls)return;

  /* v22: keep the approved smooth finger movement, but stop the camera from
     travelling so far vertically that the property disappears into empty sky. */
  let verticalSteps=0;
  const MAX_UP=4;
  const MAX_DOWN=4;

  controls.addEventListener('click',event=>{
    const b=event.target.closest('button[data-look]');
    if(!b)return;
    const action=b.dataset.look;

    if(action==='reset' || action==='wide'){
      verticalSteps=0;
      return;
    }

    if(action==='up'){
      if(verticalSteps>=MAX_UP){
        event.preventDefault();
        event.stopImmediatePropagation();
        return;
      }
      verticalSteps++;
    }

    if(action==='down'){
      if(verticalSteps<=-MAX_DOWN){
        event.preventDefault();
        event.stopImmediatePropagation();
        return;
      }
      verticalSteps--;
    }
  },true);

  const style=document.createElement('style');
  style.textContent=`
    /* Keep the right-property workshop inside the phone camera frame. */
    .sector-right .workshop-building{left:1%!important;width:27%!important}
    @media(max-width:520px){.sector-right .workshop-building{left:1%!important;width:27%!important}}
  `;
  document.head.appendChild(style);

  const stamp=document.querySelector('.build-stamp');
  if(stamp)stamp.textContent='LAND TEST • v22 camera bounds • smooth movement kept';
})();
