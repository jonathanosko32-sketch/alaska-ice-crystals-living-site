(()=>{
  const win=document.getElementById('worldWindow');
  const plane=document.getElementById('worldPlane');
  const pos=document.getElementById('position');
  if(!win||!plane||win.dataset.slowWideNav==='1')return;
  win.dataset.slowWideNav='1';

  const pointers=new Map();
  let scale=.28;
  let tx=0,ty=0;
  let dragStart=null;
  let pinchStart=null;
  const DRAG_SPEED=.22;
  const MIN_SCALE=.06;
  const MAX_SCALE=4.5;
  const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));

  function apply(){
    plane.style.left='50%';
    plane.style.top='50%';
    plane.style.transformOrigin='center center';
    plane.style.transform=`translate(calc(-50% + ${tx}px),calc(-50% + ${ty}px)) scale(${scale})`;
    if(pos){
      const px=plane.offsetWidth*scale||1,py=plane.offsetHeight*scale||1;
      const nx=clamp(.5-tx/px,0,1),ny=clamp(.5-ty/py,0,1);
      pos.textContent=`X ${Math.round(nx*180000)} • Y ${Math.round(ny*180000)} • ZOOM ${Math.round(scale*100)}% • WORLD 180000 × 180000`;
    }
  }
  function dist(){const a=[...pointers.values()];return a.length<2?0:Math.hypot(a[1].x-a[0].x,a[1].y-a[0].y)}
  function mid(){const a=[...pointers.values()];return{x:(a[0].x+a[1].x)/2,y:(a[0].y+a[1].y)/2}}

  const stopOld=e=>e.stopImmediatePropagation();
  ['pointerdown','pointermove','pointerup','pointercancel'].forEach(type=>win.addEventListener(type,stopOld,true));

  win.addEventListener('pointerdown',e=>{
    e.preventDefault();
    pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
    try{win.setPointerCapture(e.pointerId)}catch(_){}
    if(pointers.size===1){dragStart={x:e.clientX,y:e.clientY,tx,ty};pinchStart=null}
    else if(pointers.size===2){pinchStart={d:dist(),s:scale,m:mid(),tx,ty};dragStart=null}
  },false);

  win.addEventListener('pointermove',e=>{
    if(!pointers.has(e.pointerId))return;
    e.preventDefault();
    pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
    if(pointers.size===1&&dragStart){
      tx=dragStart.tx+(e.clientX-dragStart.x)*DRAG_SPEED;
      ty=dragStart.ty+(e.clientY-dragStart.y)*DRAG_SPEED;
      apply();
    }else if(pointers.size===2&&pinchStart){
      const d=dist();if(!pinchStart.d)return;
      const ns=clamp(pinchStart.s*(d/pinchStart.d),MIN_SCALE,MAX_SCALE);
      const m=mid();
      const ratio=ns/pinchStart.s;
      tx=m.x-(m.x-pinchStart.tx)*ratio;
      ty=m.y-(m.y-pinchStart.ty)*ratio;
      scale=ns;
      apply();
    }
  },false);

  const end=e=>{
    pointers.delete(e.pointerId);
    if(pointers.size===1){const a=[...pointers.values()][0];dragStart={x:a.x,y:a.y,tx,ty};pinchStart=null}
    else if(!pointers.size){dragStart=null;pinchStart=null}
  };
  win.addEventListener('pointerup',end,false);
  win.addEventListener('pointercancel',end,false);
  win.style.touchAction='none';
  apply();
})();