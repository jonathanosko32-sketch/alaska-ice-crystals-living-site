/* OSKO Living OS — Device Bridge Core v1
   Shared capability layer for phone, foldable, spatial glasses and robot clients.
   No safety-critical motor control is permitted through this bridge.
*/
(function(global){
  'use strict';

  const SAFE_CAPABILITIES=new Set([
    'touch','voice','camera','location-coarse','notifications','haptics','storage',
    'display-secondary','spatial-pointer','spatial-hands','keyboard','mouse','microphone',
    'speaker','network','battery-status','robot-status-read','world-actions'
  ]);

  function create(options){
    options=options||{};
    const devices=new Map();
    const listeners=new Set();
    const localId=options.localId||'phone-primary';

    function emit(type,payload){
      const event={type,payload,at:Date.now()};
      listeners.forEach(function(fn){try{fn(event);}catch(_){}});
      return event;
    }

    function sanitizeCaps(caps){
      return Array.from(new Set((Array.isArray(caps)?caps:[]).filter(function(c){return SAFE_CAPABILITIES.has(c);}))).sort();
    }

    function register(device){
      if(!device||!device.id) throw new Error('Device id required');
      const record={
        id:String(device.id),
        kind:String(device.kind||'unknown'),
        name:String(device.name||device.id),
        capabilities:sanitizeCaps(device.capabilities),
        online:device.online!==false,
        trusted:device.trusted===true,
        lastSeen:Date.now(),
        meta:Object.assign({},device.meta||{})
      };
      devices.set(record.id,record); emit('device-registered',record); return Object.assign({},record);
    }

    function update(id,patch){
      const d=devices.get(id); if(!d) return null;
      patch=patch||{};
      if('capabilities' in patch) d.capabilities=sanitizeCaps(patch.capabilities);
      if('online' in patch) d.online=!!patch.online;
      if('trusted' in patch) d.trusted=!!patch.trusted;
      if('name' in patch) d.name=String(patch.name);
      if('meta' in patch) d.meta=Object.assign({},d.meta,patch.meta||{});
      d.lastSeen=Date.now(); emit('device-updated',d); return Object.assign({},d);
    }

    function can(id,capability){
      const d=devices.get(id); return !!(d&&d.online&&d.capabilities.indexOf(capability)>=0);
    }

    function request(id,action,payload){
      const d=devices.get(id); if(!d||!d.online) return {ok:false,error:'device-offline'};
      const safeActions={
        'show-world':'world-actions','speak':'speaker','listen':'microphone','notify':'notifications',
        'haptic':'haptics','open-camera':'camera','show-secondary':'display-secondary',
        'read-battery':'battery-status','read-robot-status':'robot-status-read'
      };
      const needed=safeActions[action];
      if(!needed) return {ok:false,error:'action-not-allowed'};
      if(!can(id,needed)) return {ok:false,error:'capability-unavailable'};
      const req={id:'req-'+Date.now().toString(36),deviceId:id,action:String(action),payload:payload||{},at:Date.now()};
      emit('request',req);
      return {ok:true,request:req};
    }

    function list(){ return Array.from(devices.values()).map(function(d){return Object.assign({},d,{capabilities:d.capabilities.slice(),meta:Object.assign({},d.meta)});}); }
    function get(id){ const d=devices.get(id); return d?Object.assign({},d,{capabilities:d.capabilities.slice(),meta:Object.assign({},d.meta)}):null; }
    function subscribe(fn){ if(typeof fn!=='function') return function(){}; listeners.add(fn); return function(){listeners.delete(fn);}; }

    register({id:localId,kind:'phone',name:'Primary Phone',trusted:true,online:true,capabilities:['touch','voice','storage','network','battery-status','world-actions']});

    return {register,update,can,request,list,get,subscribe,SAFE_CAPABILITIES:Array.from(SAFE_CAPABILITIES)};
  }

  global.OSKODeviceBridge={create};
})(typeof window!=='undefined'?window:globalThis);
