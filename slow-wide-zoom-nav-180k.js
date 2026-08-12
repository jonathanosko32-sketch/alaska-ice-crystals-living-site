(()=>{
  const win=document.getElementById('worldWindow');
  const plane=document.getElementById('worldPlane');
  const pos=document.getElementById('position');
  if(!win||!plane)return;

  win.dataset.slowWideNav='2';
  const pointers=new Map();
  let scale=.28, tx=0, ty=0, dragStart=null, pinchStart=null;
  const DRAG_SPEED=.16;
  const MIN_SCALE=.045;
  const MAX_SCALE=5.5;
  const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));

  function apply(){
    plane.style.left='50%';
    plane.style.top='50%';
    plane.style.transformOrigin='center center';
    plane.style.transform=`translate(calc(-50% + ${tx}px),calc(-50% + ${ty}px)) scale(${scale})`;
    if(pos){
      const px=plane.offsetWidth*scale||1, py=plane.offsetHeight*scale||1;
      const nx=clamp(.5-tx/px,0,1), ny=clamp(.5-ty/py,0,1);
      pos.textContent=`X ${Math.round(nx*180000)} • Y ${Math.round(ny*180000)} • ZOOM ${Math.round(scale*100)}% • WORLD 180000 × 180000`;
    }
  }
  const dist=()=>{const a=[...pointers.values()];return a.length<2?0:Math.hypot(a[1].x-a[0].x,a[1].y-a[0].y)};
  const mid=()=>{const a=[...pointers.values()];return{x:(a[0].x+a[1].x)/2,y:(a[0].y+a[1].y)/2}};

  function down(e){
    if(e.pointerType==='mouse'&&e.button!==0)return;
    e.preventDefault(); e.stopImmediatePropagation();
    pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
    try{win.setPointerCapture(e.pointerId)}catch(_){}
    if(pointers.size===1){dragStart={x:e.clientX,y:e.clientY,tx,ty};pinchStart=null}
    else if(pointers.size===2){pinchStart={d:dist(),s:scale,m:mid(),tx,ty};dragStart=null}
  }
  function move(e){
    if(!pointers.has(e.pointerId))return;
    e.preventDefault(); e.stopImmediatePropagation();
    pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
    if(pointers.size===1&&dragStart){
      tx=dragStart.tx+(e.clientX-dragStart.x)*DRAG_SPEED;
      ty=dragStart.ty+(e.clientY-dragStart.y)*DRAG_SPEED;
      apply();
    }else if(pointers.size===2&&pinchStart){
      const d=dist(); if(!pinchStart.d)return;
      const ns=clamp(pinchStart.s*(d/pinchStart.d),MIN_SCALE,MAX_SCALE);
      const m=mid();
      const ratio=ns/pinchStart.s;
      tx=pinchStart.tx+(m.x-pinchStart.m.x)*.35;
      ty=pinchStart.ty+(m.y-pinchStart.m.y)*.35;
      scale=ns;
      apply();
    }
  }
  function end(e){
    if(pointers.has(e.pointerId)){e.preventDefault();e.stopImmediatePropagation();}
    pointers.delete(e.pointerId);
    if(pointers.size===1){const a=[...pointers.values()][0];dragStart={x:a.x,y:a.y,tx,ty};pinchStart=null}
    else if(!pointers.size){dragStart=null;pinchStart=null}
  }

  win.addEventListener('pointerdown',down,{capture:true,passive:false});
  win.addEventListener('pointermove',move,{capture:true,passive:false});
  win.addEventListener('pointerup',end,{capture:true,passive:false});
  win.addEventListener('pointercancel',end,{capture:true,passive:false});
  win.style.touchAction='none';
  apply();
})();