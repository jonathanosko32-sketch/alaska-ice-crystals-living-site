/* OSKO Living OS - Android Host Contract v1
   Logical contract for running the Living OS over Android while Android remains the hardware host.
   No APK installation or privileged Android APIs are performed here.
*/
(function(root){
'use strict';
function create(opts){
  opts=opts||{};
  const eventBus=opts.eventBus||null;
  const required=opts.required||['network','storage','audio','microphone','camera'];
  const state={connected:false,host:'android',capabilities:{},version:null,updateState:'idle',lastError:null};
  function emit(type,payload){ if(eventBus&&typeof eventBus.emit==='function'){try{eventBus.emit(type,payload);}catch(_e){}} }
  function registerCapability(name,info){ state.capabilities[String(name)]=Object.assign({available:true},info||{}); emit('android-host:capability',{name:String(name),info:state.capabilities[String(name)]}); return state.capabilities[String(name)]; }
  function connect(info){ info=info||{}; state.version=info.androidVersion||info.version||null; state.connected=true; (info.capabilities||[]).forEach(function(c){ if(typeof c==='string') registerCapability(c,{available:true}); else if(c&&c.name) registerCapability(c.name,c); }); emit('android-host:connected',status()); return status(); }
  function disconnect(reason){ state.connected=false; state.lastError=reason||null; emit('android-host:disconnected',{reason:reason||null}); return status(); }
  function readiness(){
    const missing=required.filter(function(name){ return !state.capabilities[name]||state.capabilities[name].available===false; });
    return {ready:state.connected&&missing.length===0,connected:state.connected,missing,required:required.slice(),host:state.host,version:state.version};
  }
  function beginUpdate(meta){ if(state.updateState!=='idle') return {ok:false,error:'UPDATE_ALREADY_ACTIVE',state:state.updateState}; state.updateState='staging'; emit('android-host:update-stage',meta||{}); return {ok:true,state:state.updateState}; }
  function markUpdateVerified(meta){ if(state.updateState!=='staging') return {ok:false,error:'UPDATE_NOT_STAGED'}; state.updateState='verified'; emit('android-host:update-verified',meta||{}); return {ok:true,state:state.updateState}; }
  function markUpdateActivated(meta){ if(state.updateState!=='verified') return {ok:false,error:'UPDATE_NOT_VERIFIED'}; state.updateState='active'; emit('android-host:update-activated',meta||{}); return {ok:true,state:state.updateState}; }
  function completeUpdate(meta){ if(state.updateState!=='active') return {ok:false,error:'UPDATE_NOT_ACTIVE'}; state.updateState='idle'; emit('android-host:update-complete',meta||{}); return {ok:true,state:state.updateState}; }
  function failUpdate(error){ state.lastError=String(error||'UPDATE_FAILED'); state.updateState='rollback-required'; emit('android-host:update-failed',{error:state.lastError}); return {ok:false,state:state.updateState,error:state.lastError}; }
  function rollbackComplete(meta){ state.updateState='idle'; state.lastError=null; emit('android-host:rollback-complete',meta||{}); return {ok:true,state:state.updateState}; }
  function status(){ return {connected:state.connected,host:state.host,version:state.version,capabilities:Object.assign({},state.capabilities),updateState:state.updateState,lastError:state.lastError,readiness:readiness()}; }
  return {registerCapability,connect,disconnect,readiness,beginUpdate,markUpdateVerified,markUpdateActivated,completeUpdate,failUpdate,rollbackComplete,status};
}
root.OSKOAndroidHost={create};
})(typeof window!=='undefined'?window:globalThis);
