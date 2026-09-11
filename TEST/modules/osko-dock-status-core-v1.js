/* OSKO Living OS - Dock Status Core v1
   Truthful dock/charging presentation state for phone + robot ecosystem.
   Never invents charging state or battery percentage.
*/
(function(root){
'use strict';
function create(opts){
  opts=opts||{};
  const eventBus=opts.eventBus||null;
  const nodes=new Map();
  function emit(type,payload){ if(eventBus&&typeof eventBus.emit==='function'){ try{eventBus.emit(type,payload);}catch(_e){} } }
  function clamp(v){ return v==null?null:Math.max(0,Math.min(100,Number(v)||0)); }
  function set(id,input){
    if(!id) throw new Error('dock node id required'); input=input||{};
    const prev=nodes.get(String(id))||{id:String(id),kind:input.kind||'robot',connected:false,docked:false,charging:false,battery:null,powerSource:null,lastUpdate:null};
    const n=Object.assign({},prev);
    if('connected' in input)n.connected=!!input.connected;
    if('docked' in input)n.docked=!!input.docked;
    if('charging' in input)n.charging=!!input.charging;
    if('battery' in input)n.battery=clamp(input.battery);
    if('powerSource' in input)n.powerSource=input.powerSource?String(input.powerSource):null;
    if('kind' in input)n.kind=String(input.kind||n.kind);
    if(n.charging&&!n.docked)n.charging=false;
    if(!n.connected){n.docked=false;n.charging=false;}
    n.lastUpdate=Date.now(); nodes.set(n.id,n); emit('dock:status',snapshot(n.id)); return snapshot(n.id);
  }
  function label(id){
    const n=nodes.get(String(id)); if(!n)return 'OFFLINE';
    if(!n.connected)return 'OFFLINE';
    if(n.charging)return 'CHARGING';
    if(n.docked)return 'DOCKED / READY';
    return 'CONNECTED / READY';
  }
  function snapshot(id){ const n=nodes.get(String(id)); if(!n)return null; return Object.assign({},n,{displayState:label(id)}); }
  function all(){ return Array.from(nodes.keys()).map(snapshot); }
  function systemStatus(){ const a=all(); return {connected:a.filter(x=>x.connected).length,charging:a.filter(x=>x.charging).length,docked:a.filter(x=>x.docked).length,nodes:a}; }
  return {set,label,snapshot,all,systemStatus};
}
root.OSKODockStatus={create};
})(typeof window!=='undefined'?window:globalThis);
