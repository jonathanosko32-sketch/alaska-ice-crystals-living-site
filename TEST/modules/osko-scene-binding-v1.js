/* OSKO Living OS - Scene Binding Adapter v1
   Bridges logical Living OS object ids to visual scene objects without taking over rendering.
   No render-loop replacement, no document.write, no wrapper patching.
*/
(function(root){
'use strict';
function create(opts){
  opts=opts||{};
  const eventBus=opts.eventBus||null;
  const bindings=new Map();
  const groups=new Map();
  function emit(type,payload){ if(eventBus&&typeof eventBus.emit==='function') eventBus.emit(type,payload); }
  function validId(id){ return typeof id==='string'&&id.trim().length>0; }
  function bind(id,visual,config){
    if(!validId(id)) throw new Error('binding id required');
    if(!visual) throw new Error('visual object required for '+id);
    const b={id,visual,config:Object.assign({visible:true,interactive:true,group:'world'},config||{}),createdAt:Date.now()};
    bindings.set(id,b);
    const g=b.config.group; if(!groups.has(g)) groups.set(g,new Set()); groups.get(g).add(id);
    emit('scene:bound',{id,group:g}); return id;
  }
  function unbind(id){
    const b=bindings.get(id); if(!b) return false;
    if(groups.has(b.config.group)) groups.get(b.config.group).delete(id);
    bindings.delete(id); emit('scene:unbound',{id}); return true;
  }
  function get(id){ const b=bindings.get(id); return b?b.visual:null; }
  function describe(id){ const b=bindings.get(id); return b?{id:b.id,config:Object.assign({},b.config),createdAt:b.createdAt}:null; }
  function setVisible(id,value){
    const b=bindings.get(id); if(!b) return false;
    const v=!!value; b.config.visible=v; if('visible' in b.visual) b.visual.visible=v;
    emit('scene:visibility',{id,visible:v}); return true;
  }
  function setInteractive(id,value){ const b=bindings.get(id); if(!b) return false; b.config.interactive=!!value; emit('scene:interactive',{id,interactive:b.config.interactive}); return true; }
  function listInteractive(){ return Array.from(bindings.values()).filter(b=>b.config.interactive&&b.config.visible).map(b=>b.visual); }
  function idsByGroup(group){ return groups.has(group)?Array.from(groups.get(group)):[]; }
  function applyState(id,state){
    const b=bindings.get(id); if(!b) return {ok:false,error:'not-bound',id};
    const cfg=b.config;
    if(typeof cfg.applyState==='function'){
      try { cfg.applyState(b.visual,state||{}); emit('scene:state-applied',{id}); return {ok:true}; }
      catch(err){ emit('scene:state-error',{id,error:String(err&&err.message||err)}); return {ok:false,error:String(err&&err.message||err)}; }
    }
    return {ok:false,error:'no-state-adapter',id};
  }
  function focusPoint(id){
    const b=bindings.get(id); if(!b) return null;
    if(typeof b.config.focusPoint==='function') return b.config.focusPoint(b.visual);
    const p=b.visual.position; return p?{x:+p.x||0,y:+p.y||0,z:+p.z||0}:null;
  }
  function snapshot(){ return Array.from(bindings.values()).map(b=>({id:b.id,config:Object.assign({},b.config),createdAt:b.createdAt})); }
  return {bind,unbind,get,describe,setVisible,setInteractive,listInteractive,idsByGroup,applyState,focusPoint,snapshot};
}
root.OSKOSceneBinding={create};
})(typeof window!=='undefined'?window:globalThis);
