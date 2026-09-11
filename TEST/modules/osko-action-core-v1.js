/* OSKO Living OS — Action Core v1
   Shared deterministic action router for touch, voice, phone, spatial controls and robot-safe requests.
   This module does not control physical robot motors or safety-critical hardware.
*/
(function(global){
  'use strict';

  const listeners=new Set();
  const registry=new Map();
  const aliases=new Map();
  const history=[];
  const MAX_HISTORY=120;

  function norm(v){return String(v||'').trim().toLowerCase().replace(/\s+/g,' ')}
  function emit(evt){
    const frozen=Object.freeze(Object.assign({time:Date.now()},evt));
    history.push(frozen);if(history.length>MAX_HISTORY)history.shift();
    listeners.forEach(fn=>{try{fn(frozen)}catch(e){console.warn('OSKO action listener error',e)}});
    return frozen;
  }
  function addAlias(alias,id){aliases.set(norm(alias),id)}

  function register(spec){
    if(!spec||!spec.id)throw new Error('OSKOActionCore.register requires id');
    const id=norm(spec.id);
    if(registry.has(id))throw new Error('Duplicate OSKO action object: '+id);
    const obj={
      id,
      name:spec.name||spec.id,
      type:spec.type||'object',
      state:Object.assign({},spec.state||{}),
      actions:Object.assign({},spec.actions||{}),
      permissions:Object.assign({touch:true,voice:true,spatial:true,ai:true,robot:false},spec.permissions||{}),
      metadata:Object.assign({},spec.metadata||{})
    };
    registry.set(id,obj);
    addAlias(id,id);addAlias(obj.name,id);
    (spec.aliases||[]).forEach(a=>addAlias(a,id));
    emit({kind:'register',objectId:id});
    return obj;
  }

  function resolve(name){
    const key=norm(name);if(!key)return null;
    const id=registry.has(key)?key:aliases.get(key);
    return id?registry.get(id)||null:null;
  }

  function allowed(obj,source){
    const s=norm(source||'touch');
    return obj.permissions[s]!==false;
  }

  function perform(objectName,actionName,payload,context){
    const obj=resolve(objectName);
    const source=(context&&context.source)||'touch';
    if(!obj)return {ok:false,error:'OBJECT_NOT_FOUND'};
    if(!allowed(obj,source)){
      emit({kind:'blocked',objectId:obj.id,action:norm(actionName),source});
      return {ok:false,error:'SOURCE_NOT_ALLOWED',object:obj.id};
    }
    const actionKey=norm(actionName);
    const fn=obj.actions[actionKey];
    if(typeof fn!=='function')return {ok:false,error:'ACTION_NOT_FOUND',object:obj.id,action:actionKey};
    try{
      const result=fn({
        payload:payload||{},
        context:Object.assign({source},context||{}),
        object:obj,
        getState:()=>Object.assign({},obj.state),
        setState:(patch)=>{Object.assign(obj.state,patch||{});emit({kind:'state',objectId:obj.id,state:Object.assign({},obj.state)});return obj.state;}
      });
      emit({kind:'action',objectId:obj.id,action:actionKey,source,payload:payload||{}});
      return {ok:true,object:obj.id,action:actionKey,result,state:Object.assign({},obj.state)};
    }catch(err){
      emit({kind:'error',objectId:obj.id,action:actionKey,source,message:String(err&&err.message||err)});
      return {ok:false,error:'ACTION_FAILED',message:String(err&&err.message||err)};
    }
  }

  function setState(objectName,patch){
    const obj=resolve(objectName);if(!obj)return false;
    Object.assign(obj.state,patch||{});
    emit({kind:'state',objectId:obj.id,state:Object.assign({},obj.state)});
    return true;
  }

  function getState(objectName){const obj=resolve(objectName);return obj?Object.assign({},obj.state):null}
  function list(){return Array.from(registry.values()).map(o=>({id:o.id,name:o.name,type:o.type,state:Object.assign({},o.state),permissions:Object.assign({},o.permissions),metadata:Object.assign({},o.metadata)}))}
  function on(fn){listeners.add(fn);return()=>listeners.delete(fn)}
  function getHistory(){return history.slice()}

  global.OSKOActionCore={register,resolve,perform,setState,getState,list,on,getHistory};
})(typeof window!=='undefined'?window:globalThis);
