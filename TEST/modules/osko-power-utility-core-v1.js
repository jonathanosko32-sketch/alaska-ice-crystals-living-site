/* OSKO Living OS - Property Power & Utility Core v1
   Logical utility state only. Does not switch real electrical loads or hardware.
*/
(function(root){
'use strict';
function create(opts){
  opts=opts||{};
  const eventBus=opts.eventBus||null;
  const circuits=new Map();
  const resources={shorePower:false,solarAvailable:false,batteryPercent:100,generatorAvailable:false,waterPercent:100,fuelPercent:100};
  function emit(type,payload){ if(eventBus&&typeof eventBus.emit==='function') eventBus.emit(type,payload); }
  function addCircuit(id,config){
    if(!id) throw new Error('circuit id required');
    const c=Object.assign({id,name:id,enabled:true,priority:5,kind:'utility',loadWatts:0,critical:false},config||{});
    circuits.set(id,c); emit('utility:circuit-added',Object.assign({},c)); return Object.assign({},c);
  }
  function setCircuit(id,enabled){
    const c=circuits.get(id); if(!c) throw new Error('unknown circuit '+id);
    c.enabled=!!enabled; emit('utility:circuit-state',{id,enabled:c.enabled}); return Object.assign({},c);
  }
  function setResource(name,value){
    if(!(name in resources)) throw new Error('unknown resource '+name);
    resources[name]=value; emit('utility:resource',{name,value}); return value;
  }
  function totalLoad(){ let watts=0; circuits.forEach(c=>{ if(c.enabled) watts+=Number(c.loadWatts)||0; }); return watts; }
  function shedNonCritical(maxWatts){
    const ordered=Array.from(circuits.values()).filter(c=>c.enabled&&!c.critical).sort((a,b)=>(b.priority||0)-(a.priority||0));
    const changed=[];
    for(const c of ordered){ if(totalLoad()<=maxWatts) break; c.enabled=false; changed.push(c.id); emit('utility:circuit-state',{id:c.id,enabled:false,reason:'load-shed'}); }
    return {changed,totalLoad:totalLoad()};
  }
  function status(){ return {resources:Object.assign({},resources),totalLoadWatts:totalLoad(),circuits:Array.from(circuits.values()).map(c=>Object.assign({},c))}; }
  addCircuit('hq-lights',{name:'HQ Lights',loadWatts:450,priority:2});
  addCircuit('workshop',{name:'Workshop',loadWatts:1200,priority:6});
  addCircuit('school',{name:'School & Library',loadWatts:350,priority:4});
  addCircuit('communications',{name:'Communications Tower',loadWatts:180,priority:1,critical:true});
  addCircuit('robot-garage',{name:'Robot Garage',loadWatts:900,priority:3,critical:true});
  addCircuit('yard-lights',{name:'Yard Lights',loadWatts:300,priority:5});
  return {addCircuit,setCircuit,setResource,totalLoad,shedNonCritical,status};
}
root.OSKOUtilities={create};
})(typeof window!=='undefined'?window:globalThis);
