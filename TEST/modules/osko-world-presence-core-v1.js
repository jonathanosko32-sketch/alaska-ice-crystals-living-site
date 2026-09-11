/* OSKO Living OS - World Presence Core v1
   Tracks logical presence/occupancy for people, Aurora, robots, vehicles and wildlife.
   It does not control physical movement.
*/
(function(root){
'use strict';
function create(opts){
  opts=opts||{};
  const eventBus=opts.eventBus||null;
  const entities=new Map();
  const zones=new Map();
  function emit(type,payload){ if(eventBus&&typeof eventBus.emit==='function') eventBus.emit(type,payload); }
  function addZone(id,config){
    if(!id) throw new Error('zone id required');
    const z=Object.assign({id,name:id,kind:'property',restricted:false},config||{}); zones.set(id,z); return z;
  }
  function register(id,config){
    if(!id) throw new Error('entity id required');
    const e=Object.assign({id,name:id,type:'unknown',zone:'property',status:'present',lastSeen:Date.now(),meta:{}},config||{});
    entities.set(id,e); emit('presence:registered',Object.assign({},e)); return e;
  }
  function move(id,zone,meta){
    const e=entities.get(id); if(!e) throw new Error('unknown entity '+id);
    if(!zones.has(zone)) addZone(zone,{name:zone});
    const from=e.zone; e.zone=zone; e.lastSeen=Date.now(); if(meta) e.meta=Object.assign({},e.meta,meta);
    emit('presence:moved',{id,from,to:zone,time:e.lastSeen}); return Object.assign({},e);
  }
  function setStatus(id,status){ const e=entities.get(id); if(!e) return null; e.status=status; e.lastSeen=Date.now(); emit('presence:status',{id,status}); return Object.assign({},e); }
  function inZone(zone){ return Array.from(entities.values()).filter(e=>e.zone===zone).map(e=>Object.assign({},e)); }
  function get(id){ const e=entities.get(id); return e?Object.assign({},e):null; }
  function snapshot(){ return {zones:Array.from(zones.values()).map(z=>Object.assign({},z)),entities:Array.from(entities.values()).map(e=>Object.assign({},e))}; }
  addZone('property',{name:'AIC Property'});
  addZone('hq',{name:'AIC HQ'});
  addZone('workshop',{name:'OSKO Workshop'});
  addZone('school',{name:'School & Library'});
  addZone('robot-garage',{name:'Robot Garage'});
  addZone('aurora-cabin',{name:'Aurora Cabin'});
  addZone('lake',{name:'Lake'});
  addZone('ranch',{name:'Ranch'});
  addZone('communications',{name:'Communications Tower'});
  return {addZone,register,move,setStatus,inZone,get,snapshot};
}
root.OSKOWorldPresence={create};
})(typeof window!=='undefined'?window:globalThis);
