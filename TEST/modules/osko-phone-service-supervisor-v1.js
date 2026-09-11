/* OSKO Living OS - Phone Service Supervisor v1
   Coordinates phone foreground/background, display, network, charging and thermal state.
   Keeps OS behavior lightweight in background and never claims Android permissions it does not have.
*/
(function(root){
'use strict';
function create(opts){
  opts=opts||{};
  const eventBus=opts.eventBus||null;
  const phoneRuntime=opts.phoneRuntime||null;
  const performance=opts.performance||null;
  const state={
    appState:'foreground',
    screenOn:true,
    network:'unknown',
    charging:false,
    battery:null,
    thermal:'normal',
    wakeEligible:false,
    visualMode:'full',
    lastChanged:Date.now()
  };
  function emit(type,payload){if(eventBus&&typeof eventBus.emit==='function'){try{eventBus.emit(type,payload);}catch(_e){}}}
  function clamp(v){return v==null?null:Math.max(0,Math.min(100,Number(v)||0));}
  function compute(){
    const runtime=phoneRuntime&&typeof phoneRuntime.status==='function'?phoneRuntime.status():null;
    const hostReady=!!(runtime&&runtime.host&&runtime.host.readiness&&runtime.host.readiness.ready);
    state.wakeEligible=hostReady&&state.thermal!=='critical'&&state.battery!==0;
    if(state.thermal==='critical') state.visualMode='paused';
    else if(state.appState==='background'||!state.screenOn||state.thermal==='hot'||(state.battery!=null&&state.battery<15&&!state.charging)) state.visualMode='reduced';
    else state.visualMode='full';
    return status();
  }
  function update(input){
    input=input||{};
    if('appState' in input) state.appState=['foreground','background','suspended'].includes(String(input.appState))?String(input.appState):state.appState;
    if('screenOn' in input) state.screenOn=!!input.screenOn;
    if('network' in input) state.network=String(input.network||'unknown');
    if('charging' in input) state.charging=!!input.charging;
    if('battery' in input) state.battery=clamp(input.battery);
    if('thermal' in input) state.thermal=['normal','warm','hot','critical'].includes(String(input.thermal))?String(input.thermal):state.thermal;
    state.lastChanged=Date.now();
    const out=compute();
    if(performance&&typeof performance.setMode==='function'){
      try{performance.setMode(state.visualMode);}catch(_e){}
    }
    emit('phone-service:state',out);
    return out;
  }
  function canListen(){return !!state.wakeEligible;}
  function shouldRender(){return state.visualMode!=='paused';}
  function renderBudget(){return state.visualMode==='full'?'normal':state.visualMode==='reduced'?'low':'none';}
  function status(){return Object.assign({},state,{canListen:canListen(),shouldRender:shouldRender(),renderBudget:renderBudget()});}
  return {update,canListen,shouldRender,renderBudget,status};
}
root.OSKOPhoneServiceSupervisor={create};
})(typeof window!=='undefined'?window:globalThis);
