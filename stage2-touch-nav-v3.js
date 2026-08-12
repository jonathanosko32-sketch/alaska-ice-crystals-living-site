(()=>{
  const win=document.getElementById('worldWindow');
  const plane=document.getElementById('worldPlane');
  const pos=document.getElementById('position');
  const dot=document.getElementById('you');
  if(!win||!plane||win.dataset.touchNavV3==='1')return;
  win.dataset.touchNavV3='1';

  let scale=.28, panX=0, panY=0;
  let dragStart=null, pinchStart=null;
  const pts=new Map();
  const PAN_FACTOR=.18;
  const MIN_SCALE=.08;
  const MAX_SCALE=4.5;
  const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));

  function apply(){
    plane.style.left='50%';
    plane.style.top='50%';
    plane.style.transformOrigin='center center';
    plane.style.transform=`translate(calc(-50% + ${panX}px),calc(-50% + ${panY}px)) scale(${scale})`;
    if(pos){
      const z=Math.round(scale*100);
      pos.textContent=`ZOOM ${z}% • WORLD 180000 × 180000`;
    }
    if(dot){
      const r=plane.getBoundingClientRect();
      const vr=win.getBoundingClientRect();
      const cx=vr.left+vr.width/2, cy=vr.top+vr.height/2;
      const x=clamp((cx-r.left)/Math.max(1,r.width),0,1);
      const y=clamp((cy-r.top)/Math.max(1,r.height),0,1);
      dot.style.left=(x*100)+'%';
      dot.style.top=(y*100)+'%';
    }
  }
  function dist(){
    const a=[...pts.values()];
    return a.length<2?0:Math.hypot(a[1].x-a[0].x,a[1].y-a[0].y);
  }
  function mid(){
    const a=[...pts.values()];
    return {x:(a[0].x+a[1].x)/2,y:(a[0].y+a[1].y)/2};
  }

  const stopOriginal=e=>{e.stopImmediatePropagation()};
  ['pointerdown','pointermove','pointerup','pointercancel'].forEach(t=>win.addEventListener(t,stopOriginal,{capture:true,passive:false}));

  win.addEventListener('pointerdown',e=>{
    e.preventDefault();
    pts.set(e.pointerId,{x:e.clientX,y:e.clientY});
    try{win.setPointerCapture(e.pointerId)}catch(_){}
    if(pts.size===1){
      dragStart={x:e.clientX,y:e.clientY,panX,panY};
      pinchStart=null;
    }else if(pts.size===2){
      pinchStart={d:dist(),scale,panX,panY,m:mid()};
      dragStart=null;
    }
  },{capture:true,passive:false});

  win.addEventListener('pointermove',e=>{
    if(!pts.has(e.pointerId))return;
    e.preventDefault();
    pts.set(e.pointerId,{x:e.clientX,y:e.clientY});
    if(pts.size===1&&dragStart){
      panX=dragStart.panX+(e.clientX-dragStart.x)*PAN_FACTOR;
      panY=dragStart.panY+(e.clientY-dragStart.y)*PAN_FACTOR;
      apply();
    }else if(pts.size===2&&pinchStart){
      const d=dist();
      if(!pinchStart.d)return;
      const m=mid();
      const ns=clamp(pinchStart.scale*(d/pinchStart.d),MIN_SCALE,MAX_SCALE);
      const factor=ns/pinchStart.scale;
      panX=m.x-(m.x-pinchStart.panX)*factor;
      panY=m.y-(m.y-pinchStart.panY)*factor;
      scale=ns;
      apply();
    }
  },{capture:true,passive:false});

  const end=e=>{
    pts.delete(e.pointerId);
    if(pts.size===1){
      const a=[...pts.values()][0];
      dragStart={x:a.x,y:a.y,panX,panY};
      pinchStart=null;
    }else if(!pts.size){
      dragStart=null;
      pinchStart=null;
    }
  };
  win.addEventListener('pointerup',end,{capture:true,passive:false});
  win.addEventListener('pointercancel',end,{capture:true,passive:false});
  win.style.touchAction='none';
  apply();
})();