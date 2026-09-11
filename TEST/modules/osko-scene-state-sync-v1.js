/* OSKO Living OS - Scene State Sync v1
   Bridges logical world/object state to registered visual adapters without owning the render loop.
*/
(function(root){
'use strict';
function create(opts){
  opts=opts||{};
  const eventBus=opts.eventBus||null;
  const adapters=new Map();
  let paused=false;
  function emit(type,payload){ if(eventBus&&typeof eventBus.emit==='function') eventBus.emit(type,payload); }
  function register(id,adapter){
    if(!id) throw new Error('adapter id required');
    if(!adapter||typeof adapter.apply!=='function') throw new Error('adapter.apply required');
    adapters.set(id,{id,apply:adapter.apply,getState:adapter.getState||null,enabled:adapter.enabled!==false});
    emit('scene-sync:registered',{id}); return id;
  }
  function unregister(id){ const existed=adapters.delete(id); if(existed) emit('scene-sync:unregistered',{id}); return existed; }
  function setEnabled(id,value){ const a=adapters.get(id); if(!a) return false; a.enabled=!!value; return a.enabled; }
  function apply(id,state,meta){
    if(paused) return {ok:false,reason:'paused'};
    const a=adapters.get(id); if(!a) return {ok:false,reason:'missing-adapter'};
    if(!a.enabled) return {ok:false,reason:'disabled'};
    try{ a.apply(state,meta||{}); emit('scene-sync:applied',{id}); return {ok:true}; }
    catch(err){ emit('scene-sync:error',{id,message:String(err&&err.message||err)}); return {ok:false,reason:'error',error:String(err&&err.message||err)}; }
  }
  function applyMany(entries,meta){
    const out=[]; (entries||[]).forEach(e=>{ if(e&&e.id) out.push({id:e.id,result:apply(e.id,e.state,meta)}); }); return out;
  }
  function snapshot(){
    const list=[]; adapters.forEach(a=>{ let state=null; if(a.getState){ try{ state=a.getState(); }catch(_e){} } list.push({id:a.id,enabled:a.enabled,state}); }); return {paused,adapters:list};
  }
  function setPaused(value){ paused=!!value; emit('scene-sync:paused',{paused}); return paused; }
  return {register,unregister,setEnabled,apply,applyMany,snapshot,setPaused};
}
root.OSKOSceneStateSync={create};
})(typeof window!=='undefined'?window:globalThis);
