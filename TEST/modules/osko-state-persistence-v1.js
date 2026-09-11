/* OSKO Living OS — State Persistence Core v1
   Standalone persistence/checkpoint layer. Does not mutate FIX8 or any visual build.
*/
(function(global){
  'use strict';

  function clone(value){ return JSON.parse(JSON.stringify(value)); }

  function create(options){
    options=options||{};
    const key=options.storageKey||'osko.livingos.state.v1';
    const maxCheckpoints=Math.max(3,Math.min(50,options.maxCheckpoints||12));
    const listeners=new Set();
    const memory={current:null,checkpoints:[]};

    function canUseStorage(){
      try{ if(!global.localStorage) return false; const t=key+'.test'; global.localStorage.setItem(t,'1'); global.localStorage.removeItem(t); return true; }
      catch(_){ return false; }
    }
    const persistent=canUseStorage();

    function emit(type,payload){
      const event={type,payload:clone(payload),at:Date.now()};
      listeners.forEach(function(fn){ try{ fn(event); }catch(_){} });
      return event;
    }

    function loadEnvelope(){
      if(!persistent) return clone(memory);
      try{
        const raw=global.localStorage.getItem(key);
        if(!raw) return {current:null,checkpoints:[]};
        const parsed=JSON.parse(raw);
        return {
          current:parsed&&parsed.current?parsed.current:null,
          checkpoints:Array.isArray(parsed&&parsed.checkpoints)?parsed.checkpoints:[]
        };
      }catch(_){ return {current:null,checkpoints:[]}; }
    }

    function saveEnvelope(env){
      env.checkpoints=(env.checkpoints||[]).slice(-maxCheckpoints);
      if(persistent){ global.localStorage.setItem(key,JSON.stringify(env)); }
      else{ memory.current=clone(env.current); memory.checkpoints=clone(env.checkpoints); }
    }

    function save(state,meta){
      const env=loadEnvelope();
      env.current={state:clone(state||{}),meta:clone(meta||{}),savedAt:Date.now(),version:1};
      saveEnvelope(env);
      emit('saved',env.current);
      return clone(env.current);
    }

    function load(){
      const env=loadEnvelope();
      emit('loaded',env.current);
      return clone(env.current);
    }

    function checkpoint(name,state,meta){
      const env=loadEnvelope();
      const cp={
        id:'cp-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,7),
        name:String(name||'Checkpoint'), state:clone(state||{}), meta:clone(meta||{}),
        savedAt:Date.now(), version:1
      };
      env.checkpoints.push(cp);
      env.current=cp;
      saveEnvelope(env);
      emit('checkpoint',cp);
      return clone(cp);
    }

    function listCheckpoints(){ return clone(loadEnvelope().checkpoints); }

    function restore(id){
      const env=loadEnvelope();
      const cp=(env.checkpoints||[]).find(function(x){ return x.id===id; });
      if(!cp) return null;
      env.current=clone(cp);
      saveEnvelope(env);
      emit('restored',cp);
      return clone(cp);
    }

    function exportSnapshot(){ return JSON.stringify(loadEnvelope()); }

    function importSnapshot(text){
      const parsed=JSON.parse(String(text||''));
      if(!parsed || !Array.isArray(parsed.checkpoints)) throw new Error('Invalid OSKO snapshot');
      const env={current:parsed.current||null,checkpoints:parsed.checkpoints.slice(-maxCheckpoints)};
      saveEnvelope(env);
      emit('imported',env);
      return clone(env);
    }

    function clearCurrent(){
      const env=loadEnvelope(); env.current=null; saveEnvelope(env); emit('cleared-current',{});
    }

    function subscribe(fn){ if(typeof fn!=='function') return function(){}; listeners.add(fn); return function(){listeners.delete(fn);}; }

    return {save,load,checkpoint,listCheckpoints,restore,exportSnapshot,importSnapshot,clearCurrent,subscribe,isPersistent:function(){return persistent;}};
  }

  global.OSKOStatePersistence={create};
})(typeof window!=='undefined'?window:globalThis);
