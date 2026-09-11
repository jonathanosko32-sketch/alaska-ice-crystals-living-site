/* OSKO Living OS - Camera Navigation Core v1
   Device-agnostic camera intent/state for phone, desktop, and future spatial views.
   Does not own a render loop and does not directly mutate Three.js objects.
*/
(function(root){
'use strict';
function clamp(v,min,max){ return Math.max(min,Math.min(max,v)); }
function copyPoint(p){ return {x:+(p&&p.x||0),y:+(p&&p.y||0),z:+(p&&p.z||0)}; }
function create(opts){
  opts=opts||{};
  const eventBus=opts.eventBus||null;
  const targets=new Map();
  const limits=Object.assign({minZoom:0.35,maxZoom:4.0,dragThreshold:8},opts.limits||{});
  const state={mode:'home',targetId:'home',zoom:1,pan:{x:0,y:0},gesture:null,lastChange:Date.now()};
  function emit(type,payload){ if(eventBus&&typeof eventBus.emit==='function') eventBus.emit(type,payload); }
  function registerTarget(id,config){
    if(!id) throw new Error('camera target id required');
    const t=Object.assign({id,name:id,position:{x:0,y:0,z:0},lookAt:{x:0,y:0,z:0},zoom:1,kind:'world'},config||{});
    t.position=copyPoint(t.position); t.lookAt=copyPoint(t.lookAt); t.zoom=clamp(+t.zoom||1,limits.minZoom,limits.maxZoom);
    targets.set(id,t); return Object.assign({},t);
  }
  function go(id){
    const t=targets.get(id); if(!t) return {ok:false,error:'unknown-target',id};
    state.mode=t.kind||'world'; state.targetId=id; state.zoom=t.zoom; state.pan={x:0,y:0}; state.lastChange=Date.now();
    const out={ok:true,target:Object.assign({},t),state:snapshot()}; emit('camera:go',out); return out;
  }
  function home(){ return go('home'); }
  function setZoom(value){ state.zoom=clamp(+value||1,limits.minZoom,limits.maxZoom); state.lastChange=Date.now(); emit('camera:zoom',{zoom:state.zoom}); return state.zoom; }
  function zoomBy(factor){ return setZoom(state.zoom*(+factor||1)); }
  function panBy(dx,dy){ state.pan.x+=(+dx||0); state.pan.y+=(+dy||0); state.lastChange=Date.now(); emit('camera:pan',{pan:Object.assign({},state.pan)}); return Object.assign({},state.pan); }
  function beginGesture(x,y,pointers){ state.gesture={startX:+x||0,startY:+y||0,lastX:+x||0,lastY:+y||0,pointers:pointers||1,dragging:false}; return Object.assign({},state.gesture); }
  function updateGesture(x,y){
    if(!state.gesture) return null;
    const g=state.gesture, nx=+x||0, ny=+y||0, dx=nx-g.lastX, dy=ny-g.lastY;
    const total=Math.hypot(nx-g.startX,ny-g.startY); if(total>=limits.dragThreshold) g.dragging=true;
    if(g.dragging&&g.pointers===1) panBy(dx,dy);
    g.lastX=nx; g.lastY=ny; return {dragging:g.dragging,total};
  }
  function endGesture(){ const g=state.gesture; state.gesture=null; return g?{wasDrag:!!g.dragging}:null; }
  function isTapAllowed(){ return !state.gesture||!state.gesture.dragging; }
  function snapshot(){ return {mode:state.mode,targetId:state.targetId,zoom:state.zoom,pan:Object.assign({},state.pan),lastChange:state.lastChange,limits:Object.assign({},limits)}; }
  registerTarget('home',{name:'Property Home',position:{x:0,y:180,z:260},lookAt:{x:0,y:0,z:0},zoom:1,kind:'property'});
  return {registerTarget,go,home,setZoom,zoomBy,panBy,beginGesture,updateGesture,endGesture,isTapAllowed,snapshot};
}
root.OSKOCameraNavigation={create};
})(typeof window!=='undefined'?window:globalThis);
