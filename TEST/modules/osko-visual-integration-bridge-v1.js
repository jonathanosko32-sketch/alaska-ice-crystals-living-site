/* OSKO Living OS - Visual Integration Bridge v1
   Clean bridge between logical OS state/actions and the visible world.
   Does not own a render loop, patch legacy source, or control physical hardware.
*/
(function(root){
'use strict';
function create(opts){
  opts=opts||{};
  const eventBus=opts.eventBus||null;
  const sceneBinding=opts.sceneBinding||null;
  const camera=opts.camera||null;
  const worldState=opts.worldState||null;
  const stateSync=opts.stateSync||null;
  const listeners=[];
  const registeredTargets=new Set();

  function emit(type,payload){
    if(eventBus&&typeof eventBus.emit==='function'){
      try{ eventBus.emit(type,payload); }catch(_e){}
    }
  }
  function focus(id,extra){
    if(!id) return {ok:false,error:'TARGET_REQUIRED'};
    if(!sceneBinding||typeof sceneBinding.focusPoint!=='function') return {ok:false,error:'SCENE_BINDING_UNAVAILABLE'};
    if(!camera||typeof camera.registerTarget!=='function'||typeof camera.go!=='function') return {ok:false,error:'CAMERA_UNAVAILABLE'};
    const p=sceneBinding.focusPoint(id);
    if(!p) return {ok:false,error:'FOCUS_POINT_UNAVAILABLE',id};
    const cfg=Object.assign({
      id:id,
      name:id,
      position:{x:p.x,y:p.y+38,z:p.z+72},
      lookAt:{x:p.x,y:p.y,z:p.z},
      zoom:1.15,
      kind:'object'
    },extra||{});
    camera.registerTarget(id,cfg);
    registeredTargets.add(id);
    const result=camera.go(id);
    emit('visual:focus',{id,result});
    return result;
  }
  function home(){
    if(!camera||typeof camera.home!=='function') return {ok:false,error:'CAMERA_UNAVAILABLE'};
    const result=camera.home(); emit('visual:home',result); return result;
  }
  function applyObjectState(id,state){
    if(stateSync&&typeof stateSync.apply==='function') return stateSync.apply(id,state);
    if(sceneBinding&&typeof sceneBinding.applyState==='function') return sceneBinding.applyState(id,state);
    return {ok:false,error:'STATE_SYNC_UNAVAILABLE',id};
  }
  function syncSnapshot(snapshot){
    snapshot=snapshot||{};
    const objects=snapshot.objects||{};
    const results=[];
    Object.keys(objects).forEach(id=>results.push({id,result:applyObjectState(id,objects[id])}));
    emit('visual:snapshot-synced',{count:results.length});
    return results;
  }
  function connect(){
    if(eventBus&&typeof eventBus.on==='function'){
      listeners.push(eventBus.on('object:changed',evt=>{
        const p=evt&&evt.payload||{};
        if(p.id) applyObjectState(p.id,p.state||{});
      }));
      listeners.push(eventBus.on('interaction:complete',evt=>{
        const rec=evt&&evt.payload||{};
        const req=rec.request||{};
        if(rec.result&&rec.result.ok===false) return;
        if(req.action==='OPEN'||req.action==='SHOW'||req.action==='FOCUS'||req.action==='ENTER'){
          if(req.target) focus(req.target);
        } else if(req.action==='HOME') home();
      }));
    }
    if(worldState&&typeof worldState.subscribe==='function'){
      listeners.push(worldState.subscribe((evt,snapshot)=>{
        if(evt&&evt.type==='object:changed'){
          const p=evt.payload||{}; if(p.id) applyObjectState(p.id,p.state||{});
        }
        if(evt&&evt.type==='world:tick') emit('visual:world-tick',{phase:snapshot&&snapshot.time&&snapshot.time.phase});
      }));
    }
    emit('visual:bridge-connected',{eventBus:!!eventBus,worldState:!!worldState});
    return status();
  }
  function disconnect(){ while(listeners.length){ const stop=listeners.pop(); try{ if(typeof stop==='function') stop(); }catch(_e){} } return status(); }
  function status(){ return {ready:!!(sceneBinding&&camera),connected:listeners.length>0,registeredTargets:Array.from(registeredTargets)}; }
  return {connect,disconnect,focus,home,applyObjectState,syncSnapshot,status};
}
root.OSKOVisualIntegrationBridge={create};
})(typeof window!=='undefined'?window:globalThis);
