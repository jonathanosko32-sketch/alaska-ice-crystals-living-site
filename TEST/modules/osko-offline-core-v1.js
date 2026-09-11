/* OSKO Living OS - Offline Capability Core v1
   Determines what remains available when internet/cloud services are unavailable.
   Safety-critical local behavior is never delegated to cloud services.
*/
(function(root){
'use strict';
function create(opts){
  opts=opts||{};
  const eventBus=opts.eventBus||null;
  const capabilities=new Map();
  let online = opts.online !== false;
  let cloudReachable = opts.cloudReachable !== false;
  let lastChange = Date.now();

  function emit(type,payload){
    if(eventBus && typeof eventBus.emit==='function') eventBus.emit(type,payload);
  }
  function register(id,config){
    if(!id) throw new Error('capability id required');
    const item=Object.assign({id,name:id,requiresInternet:false,requiresCloud:false,localFallback:true,safetyCritical:false},config||{});
    capabilities.set(id,item);
    return Object.assign({},item);
  }
  function setNetwork(next){
    online=!!next;
    lastChange=Date.now();
    emit('offline:network',{online,lastChange});
    return status();
  }
  function setCloud(next){
    cloudReachable=!!next;
    lastChange=Date.now();
    emit('offline:cloud',{cloudReachable,lastChange});
    return status();
  }
  function evaluate(id){
    const c=capabilities.get(id);
    if(!c) return {id,available:false,mode:'unknown',reason:'UNREGISTERED'};
    if(c.safetyCritical && !c.localFallback){
      return {id,available:false,mode:'blocked',reason:'SAFETY_REQUIRES_LOCAL'};
    }
    if(c.requiresInternet && !online){
      return c.localFallback ? {id,available:true,mode:'local-fallback',reason:'OFFLINE'} : {id,available:false,mode:'unavailable',reason:'OFFLINE'};
    }
    if(c.requiresCloud && !cloudReachable){
      return c.localFallback ? {id,available:true,mode:'local-fallback',reason:'CLOUD_UNREACHABLE'} : {id,available:false,mode:'unavailable',reason:'CLOUD_UNREACHABLE'};
    }
    return {id,available:true,mode:'normal',reason:null};
  }
  function status(){
    const evaluated={};
    capabilities.forEach((_,id)=>{ evaluated[id]=evaluate(id); });
    return {online,cloudReachable,lastChange,capabilities:evaluated};
  }

  register('world-state',{name:'World State',localFallback:true});
  register('touch-navigation',{name:'Touch Navigation',localFallback:true});
  register('voice-intent-local',{name:'Local Voice Intent Parsing',localFallback:true});
  register('skie-cloud',{name:'SKIE Cloud Intelligence',requiresInternet:true,requiresCloud:true,localFallback:true});
  register('wildlife-awareness',{name:'Wildlife Awareness',localFallback:true});
  register('robot-safety',{name:'Robot Safety',localFallback:true,safetyCritical:true});
  register('state-persistence',{name:'State Persistence',localFallback:true});
  register('communications-external',{name:'External Communications',requiresInternet:true,localFallback:false});

  return {register,setNetwork,setCloud,evaluate,status};
}
root.OSKOOfflineCore={create};
})(typeof window!=='undefined'?window:globalThis);
