/* OSKO Living OS — Object Registry v1
   Shared identities, permissions, actions, and status for world objects.
   Designed so touch, voice, spatial UI, SKIE, and robot-facing software can
   reference the same object instead of creating separate control systems.
*/
(function(global){
  'use strict';

  function createRegistry(){
    const objects=new Map();
    const listeners=new Set();

    function emit(type,payload){
      const evt={type,payload,time:Date.now()};
      listeners.forEach(fn=>{try{fn(evt)}catch(e){}});
      return evt;
    }

    function normalizeId(id){
      return String(id||'').trim().toLowerCase().replace(/\s+/g,'-');
    }

    function register(def){
      if(!def||!def.id) throw new Error('OSKOObjectRegistry.register requires id');
      const id=normalizeId(def.id);
      const current=objects.get(id)||{};
      const obj={
        id,
        name:def.name||current.name||id,
        type:def.type||current.type||'object',
        zone:def.zone||current.zone||'property',
        aliases:Array.from(new Set([...(current.aliases||[]),...(def.aliases||[])])),
        permissions:Object.assign({touch:true,voice:true,spatial:true,aiAssist:true,robotRead:true,robotWrite:false},current.permissions||{},def.permissions||{}),
        state:Object.assign({},current.state||{},def.state||{}),
        actions:Object.assign({},current.actions||{},def.actions||{}),
        meta:Object.assign({},current.meta||{},def.meta||{})
      };
      objects.set(id,obj);
      emit('register',{id,object:snapshot(obj)});
      return api(id);
    }

    function snapshot(obj){
      return JSON.parse(JSON.stringify({
        id:obj.id,name:obj.name,type:obj.type,zone:obj.zone,aliases:obj.aliases,
        permissions:obj.permissions,state:obj.state,meta:obj.meta,
        actionNames:Object.keys(obj.actions||{})
      }));
    }

    function find(ref){
      const q=normalizeId(ref);
      if(objects.has(q)) return objects.get(q);
      for(const obj of objects.values()){
        if(normalizeId(obj.name)===q) return obj;
        if((obj.aliases||[]).some(a=>normalizeId(a)===q)) return obj;
      }
      return null;
    }

    function can(obj,source){
      const p=obj.permissions||{};
      if(source==='touch') return p.touch!==false;
      if(source==='voice') return p.voice!==false;
      if(source==='spatial') return p.spatial!==false;
      if(source==='ai') return p.aiAssist!==false;
      if(source==='robot-read') return p.robotRead!==false;
      if(source==='robot-write') return p.robotWrite===true;
      return false;
    }

    async function invoke(ref,actionName,args,source){
      source=source||'touch';
      const obj=find(ref);
      if(!obj) return {ok:false,error:'OBJECT_NOT_FOUND',ref};
      if(!can(obj,source)) return {ok:false,error:'SOURCE_NOT_PERMITTED',id:obj.id,source};
      const action=obj.actions&&obj.actions[actionName];
      if(typeof action!=='function') return {ok:false,error:'ACTION_NOT_FOUND',id:obj.id,action:actionName};
      try{
        const result=await action({object:api(obj.id),args:args||{},source});
        emit('action',{id:obj.id,action:actionName,source,result});
        return {ok:true,id:obj.id,action:actionName,result};
      }catch(error){
        emit('error',{id:obj.id,action:actionName,source,message:String(error&&error.message||error)});
        return {ok:false,error:'ACTION_FAILED',id:obj.id,action:actionName,message:String(error&&error.message||error)};
      }
    }

    function api(ref){
      const obj=find(ref);
      if(!obj) return null;
      return {
        id:obj.id,
        get(){return snapshot(obj)},
        getState(key){return key==null?Object.assign({},obj.state):obj.state[key]},
        setState(key,value){obj.state[key]=value;emit('state',{id:obj.id,key,value});return value},
        patchState(patch){Object.assign(obj.state,patch||{});emit('state',{id:obj.id,patch:Object.assign({},patch||{})});return Object.assign({},obj.state)},
        setPermission(key,value){obj.permissions[key]=!!value;emit('permission',{id:obj.id,key,value:!!value});return !!value},
        invoke(action,args,source){return invoke(obj.id,action,args,source)}
      };
    }

    function list(filter){
      let arr=Array.from(objects.values());
      if(filter&&filter.type) arr=arr.filter(o=>o.type===filter.type);
      if(filter&&filter.zone) arr=arr.filter(o=>o.zone===filter.zone);
      return arr.map(snapshot);
    }

    function subscribe(fn){listeners.add(fn);return()=>listeners.delete(fn)}

    return {register,find:(ref)=>{const o=find(ref);return o?snapshot(o):null},get:api,list,invoke,subscribe};
  }

  global.OSKOObjectRegistry={create:createRegistry};
})(typeof window!=='undefined'?window:globalThis);
