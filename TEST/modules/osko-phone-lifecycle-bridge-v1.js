/* OSKO Living OS - Phone Lifecycle Bridge v1
   Translates Android/app lifecycle events into safe Living OS runtime/service state.
   No privileged Android APIs are called here; native host adapters feed this module events.
*/
(function(root){
'use strict';
function create(opts){
  opts=opts||{};
  const phoneRuntime=opts.phoneRuntime||null;
  const phoneService=opts.phoneService||null;
  const eventBus=opts.eventBus||null;
  const state={created:false,resumed:false,screenOn:true,network:'unknown',charging:false,battery:null,thermal:'normal',lastEvent:null};
  function emit(type,payload){if(eventBus&&typeof eventBus.emit==='function'){try{eventBus.emit(type,payload);}catch(_e){}}}
  function clone(v){return v==null?v:JSON.parse(JSON.stringify(v));}
  function pushService(){
    if(!phoneService||typeof phoneService.update!=='function')return null;
    return phoneService.update({
      appState:state.resumed?'foreground':(state.created?'background':'suspended'),
      screenOn:state.screenOn,network:state.network,charging:state.charging,battery:state.battery,thermal:state.thermal
    });
  }
  function apply(type,data){
    data=data||{};state.lastEvent={time:Date.now(),type,data:clone(data)};
    switch(type){
      case 'create': state.created=true;break;
      case 'resume': state.created=true;state.resumed=true;break;
      case 'pause': state.resumed=false;break;
      case 'destroy': state.created=false;state.resumed=false;break;
      case 'screen': state.screenOn=data.on!==false;break;
      case 'network': state.network=String(data.state||data.network||'unknown');break;
      case 'power': state.charging=!!data.charging; if(data.battery!=null)state.battery=Math.max(0,Math.min(100,Number(data.battery)||0));break;
      case 'thermal': {const t=String(data.state||data.thermal||'normal');if(['normal','warm','hot','critical'].includes(t))state.thermal=t;break;}
      default:return {ok:false,error:'UNKNOWN_LIFECYCLE_EVENT',type};
    }
    const service=pushService();emit('phone-lifecycle:'+type,{state:status(),service});return {ok:true,state:status(),service};
  }
  function canAcceptVoice(){
    if(!state.created||!state.resumed||!state.screenOn)return false;
    if(phoneService&&typeof phoneService.canListen==='function')return !!phoneService.canListen();
    return !!(phoneRuntime&&typeof phoneRuntime.status==='function'&&phoneRuntime.status().mode!=='offline');
  }
  function status(){return Object.assign({},clone(state),{canAcceptVoice:canAcceptVoice()});}
  return {apply,canAcceptVoice,status};
}
root.OSKOPhoneLifecycleBridge={create};
})(typeof window!=='undefined'?window:globalThis);
