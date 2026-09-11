/* OSKO Living OS - Communications Core v1
   Logical communications/tower layer. No radio transmission or physical hardware control.
*/
(function(root){
'use strict';
function create(opts){
  opts=opts||{};
  const eventBus=opts.eventBus||null;
  const channels=new Map();
  const services=new Map();
  const state={online:true,towerOnline:true,lastHeartbeat:Date.now(),signal:'LOCAL',messages:[]};
  function emit(type,payload){ if(eventBus&&typeof eventBus.emit==='function') eventBus.emit(type,payload); }
  function registerChannel(id,config){
    if(!id) throw new Error('channel id required');
    channels.set(id,Object.assign({id,name:id,enabled:true,kind:'logical'},config||{}));
    emit('communications:channel-registered',{id}); return channels.get(id);
  }
  function registerService(id,config){
    if(!id) throw new Error('service id required');
    services.set(id,Object.assign({id,name:id,online:true,kind:'service'},config||{}));
    emit('communications:service-registered',{id}); return services.get(id);
  }
  function post(source,text,meta){
    const item={id:'msg-'+Date.now()+'-'+Math.random().toString(36).slice(2,7),source:source||'system',text:String(text||''),meta:meta||{},time:Date.now()};
    state.messages.push(item); if(state.messages.length>100) state.messages.shift();
    emit('communications:message',item); return item;
  }
  function setTowerOnline(value){ state.towerOnline=!!value; emit('communications:tower',{online:state.towerOnline}); return state.towerOnline; }
  function heartbeat(){ state.lastHeartbeat=Date.now(); emit('communications:heartbeat',{time:state.lastHeartbeat}); return state.lastHeartbeat; }
  function status(){ return {online:state.online,towerOnline:state.towerOnline,lastHeartbeat:state.lastHeartbeat,signal:state.signal,channels:Array.from(channels.values()),services:Array.from(services.values()),recentMessages:state.messages.slice(-10)}; }
  registerChannel('skie',{name:'SKIE',kind:'voice-data'});
  registerChannel('property',{name:'Property Systems',kind:'local-data'});
  registerChannel('robots',{name:'Robot Status',kind:'status-only'});
  registerChannel('weather',{name:'Weather',kind:'data'});
  registerService('tower',{name:'Communications Tower'});
  return {registerChannel,registerService,post,setTowerOnline,heartbeat,status};
}
root.OSKOCommunications={create};
})(typeof window!=='undefined'?window:globalThis);
