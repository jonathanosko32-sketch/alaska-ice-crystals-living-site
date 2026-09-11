/* OSKO Living OS - Property Integration Core v1
   Coordinates logical property objects with scene bindings, camera targets, and world state.
   Does not own the render loop and does not directly control physical hardware.
*/
(function(root){
'use strict';

function create(opts){
  opts=opts||{};
  const manifest=opts.manifest||null;
  const registry=opts.registry||null;
  const sceneBinding=opts.sceneBinding||null;
  const camera=opts.camera||null;
  const worldState=opts.worldState||null;
  const eventBus=opts.eventBus||null;
  const records=new Map();
  const warnings=[];

  function emit(type,payload){
    if(eventBus&&typeof eventBus.emit==='function'){
      try{ eventBus.emit(type,payload); }catch(_e){}
    }
  }

  function warn(code,detail){
    const item={time:Date.now(),code,detail:detail||null};
    warnings.push(item);
    if(warnings.length>100) warnings.shift();
    emit('property-integration:warning',item);
    return item;
  }

  function resolve(id){
    if(!id) return null;
    if(manifest&&typeof manifest.resolve==='function'){
      const r=manifest.resolve(id);
      if(r) return r;
    }
    return String(id);
  }

  function ensureLogical(id,meta){
    const logicalId=resolve(id)||String(id);
    if(registry){
      try{
        if(typeof registry.get==='function'&&registry.get(logicalId)) return logicalId;
        if(typeof registry.register==='function') registry.register(logicalId,meta||{});
      }catch(err){ warn('REGISTRY_REGISTER_FAILED',{id:logicalId,error:String(err&&err.message||err)}); }
    }
    if(worldState&&typeof worldState.registerObject==='function'){
      try{ worldState.registerObject(logicalId,{status:'ready'}); }
      catch(err){ warn('WORLD_REGISTER_FAILED',{id:logicalId,error:String(err&&err.message||err)}); }
    }
    return logicalId;
  }

  function bind(id,visual,config){
    const logicalId=ensureLogical(id,config&&config.meta);
    if(!sceneBinding||typeof sceneBinding.bind!=='function'){
      return {ok:false,error:'SCENE_BINDING_UNAVAILABLE',id:logicalId};
    }
    try{
      sceneBinding.bind(logicalId,visual,config||{});
      records.set(logicalId,{id:logicalId,bound:true,visual,config:Object.assign({},config||{}),time:Date.now()});
      if(camera&&typeof camera.registerTarget==='function'){
        let p=null;
        if(sceneBinding&&typeof sceneBinding.focusPoint==='function') p=sceneBinding.focusPoint(logicalId);
        if(p) camera.registerTarget(logicalId,{name:logicalId,position:{x:p.x,y:p.y+45,z:p.z+90},lookAt:p,zoom:1,kind:'object'});
      }
      emit('property-integration:bound',{id:logicalId});
      return {ok:true,id:logicalId};
    }catch(err){
      return {ok:false,error:String(err&&err.message||err),id:logicalId};
    }
  }

  function unbind(id){
    const logicalId=resolve(id)||String(id);
    let ok=false;
    if(sceneBinding&&typeof sceneBinding.unbind==='function'){
      try{ ok=!!sceneBinding.unbind(logicalId); }catch(_e){}
    }
    records.delete(logicalId);
    emit('property-integration:unbound',{id:logicalId,ok});
    return ok;
  }

  function focus(id){
    const logicalId=resolve(id)||String(id);
    if(camera&&typeof camera.go==='function'){
      const out=camera.go(logicalId);
      if(out&&out.ok) return out;
    }
    return {ok:false,error:'CAMERA_TARGET_UNAVAILABLE',id:logicalId};
  }

  function applyState(id,state,meta){
    const logicalId=resolve(id)||String(id);
    const result=sceneBinding&&typeof sceneBinding.applyState==='function'
      ? sceneBinding.applyState(logicalId,state||{})
      : {ok:false,error:'SCENE_BINDING_UNAVAILABLE',id:logicalId};

    if(result&&result.ok&&worldState&&typeof worldState.setObjectState==='function'){
      try{ worldState.setObjectState(logicalId,state||{}); }
      catch(err){ warn('WORLD_STATE_SYNC_FAILED',{id:logicalId,error:String(err&&err.message||err)}); }
    }
    emit('property-integration:state',{id:logicalId,state:state||{},result,meta:meta||null});
    return result;
  }

  function bindMany(items){
    const results=[];
    (items||[]).forEach(item=>{
      if(!item||!item.id||!item.visual) return results.push({ok:false,error:'INVALID_BIND_ITEM'});
      results.push(bind(item.id,item.visual,item.config||{}));
    });
    return results;
  }

  function status(){
    return {
      ready:!!sceneBinding,
      boundCount:records.size,
      boundIds:Array.from(records.keys()).sort(),
      hasManifest:!!manifest,
      hasRegistry:!!registry,
      hasCamera:!!camera,
      hasWorldState:!!worldState,
      warnings:warnings.slice(-20)
    };
  }

  return {resolve,ensureLogical,bind,unbind,bindMany,focus,applyState,status};
}

root.OSKOPropertyIntegration={create};
})(typeof window!=='undefined'?window:globalThis);
