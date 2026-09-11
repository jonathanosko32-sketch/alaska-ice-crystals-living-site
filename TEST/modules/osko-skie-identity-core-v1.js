/* OSKO Living OS - SKIE Identity Core v1
   Defines the current primary robot identity without deleting future robot slots.
   User-facing name is SKIE; robot-1 is the primary current body. Legacy Robot Four
   names are accepted only as compatibility aliases so older test flows do not break.
*/
(function(root){
'use strict';
function create(opts){
  opts=opts||{};
  const fleet=opts.fleet||null;
  const eventBus=opts.eventBus||null;
  const state={
    id:'robot-1',
    name:'SKIE',
    role:'primary-brain-body',
    current:true,
    legacyAliases:['robot-four','robot 4','robot four','robot-4'],
    aliases:['skie','robot-1','robot 1','robot one'],
    visualReference:'SKIE Robot 1 reference locked by owner',
    lastApplied:null
  };
  function emit(type,payload){if(eventBus&&typeof eventBus.emit==='function'){try{eventBus.emit(type,payload);}catch(_e){}}}
  function clone(v){return JSON.parse(JSON.stringify(v));}
  function resolve(value){
    const key=String(value||'').trim().toLowerCase();
    if(!key)return null;
    if(state.aliases.includes(key)||state.legacyAliases.includes(key)||key===state.id||key===state.name.toLowerCase()) return state.id;
    return null;
  }
  function apply(){
    if(!fleet||typeof fleet.register!=='function') return {ok:false,error:'ROBOT_FLEET_UNAVAILABLE'};
    const existing=typeof fleet.snapshot==='function'?fleet.snapshot(state.id):null;
    const out=fleet.register({
      id:state.id,
      name:state.name,
      role:state.role,
      capabilities:existing&&Array.isArray(existing.capabilities)?existing.capabilities:['move-sim','inspect-sim','dock-sim','report'],
      metadata:Object.assign({},existing&&existing.metadata||{}, {primary:true,displayIdentity:'SKIE'})
    });
    state.lastApplied=Date.now();
    emit('skie-identity:applied',{identity:status(),robot:out});
    return {ok:true,identity:status(),robot:out};
  }
  function status(){return clone(state);}
  return {resolve,apply,status};
}
root.OSKOSKIEIdentityCore={create};
})(typeof window!=='undefined'?window:globalThis);
