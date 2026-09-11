/* OSKO Living OS - Local Command Fallback v1
   Deterministic offline/degraded command path for basic phone/property actions when cloud AI is unavailable.
   This module does not use a language model and does not control physical robot motors.
*/
(function(root){
'use strict';
function create(opts){
  opts=opts||{};
  const propertyExecute=typeof opts.propertyExecute==='function'?opts.propertyExecute:null;
  const robotCoordinator=opts.robotCoordinator||null;
  const eventBus=opts.eventBus||null;
  const history=[];
  function emit(type,payload){if(eventBus&&typeof eventBus.emit==='function'){try{eventBus.emit(type,payload);}catch(_e){}}}
  function norm(v){return String(v||'').trim().toLowerCase().replace(/[^a-z0-9\s-]/g,' ').replace(/\s+/g,' ');}
  function rec(kind,data){const x=Object.assign({time:Date.now(),kind},data||{});history.push(x);if(history.length>100)history.shift();emit('local-command:'+kind,x);return x;}
  function parse(text){
    text=norm(text);if(!text)return {ok:false,error:'EMPTY_COMMAND'};
    if(/\b(disable safety|control motor|drive motor|delete protected|promote release|activate release)\b/.test(text))return {ok:false,error:'PROTECTED_ACTION'};
    const objectMap=[['robot garage','robot-garage'],['communications tower','communications'],['workshop','workshop'],['shop','workshop'],['school','school'],['library','school'],['truck','truck'],['hq','hq'],['house','hq'],['home','home'],['gate','gate'],['lake','lake'],['ranch','ranch']];
    let target=null;for(const p of objectMap){if(text.includes(p[0])){target=p[1];break;}}
    const rm=text.match(/\brobot\s*(one|1|two|2|three|3|four|4)\b/);
    if(rm){
      const ids={one:'robot-1','1':'robot-1',two:'robot-2','2':'robot-2',three:'robot-3','3':'robot-3',four:'robot-4','4':'robot-4'};
      let action='report';if(/\b(check|inspect)\b/.test(text))action='inspect';else if(/\b(go to|move to|head to|walk to)\b/.test(text))action='move';else if(/\b(dock|charge|return to dock)\b/.test(text))action='dock';
      return {ok:true,kind:'robot',robotId:ids[rm[1]],action,target};
    }
    if(/\b(go home|take me home|home)\b/.test(text))return {ok:true,kind:'property',type:'navigation',action:'HOME',target:'home'};
    if(target&&/\b(open|show|take me to|go to|focus|enter)\b/.test(text))return {ok:true,kind:'property',type:'navigation',action:'FOCUS',target};
    return {ok:false,error:'LOCAL_COMMAND_NOT_SUPPORTED'};
  }
  function execute(text,context){
    context=Object.assign({actor:'owner',source:'local-fallback',offline:true},context||{});
    const intent=parse(text);if(!intent.ok){rec('rejected',{text:String(text||''),error:intent.error});return intent;}
    if(intent.kind==='robot'){
      if(!robotCoordinator||typeof robotCoordinator.request!=='function')return {ok:false,error:'ROBOT_COORDINATOR_UNAVAILABLE',intent};
      const out=robotCoordinator.request({action:intent.action,target:intent.target,payload:{preferredRobot:intent.robotId,offline:true}},context);
      rec(out&&out.ok?'robot-complete':'robot-failed',{intent,result:out});return {ok:!!(out&&out.ok),intent,result:out};
    }
    if(!propertyExecute){rec('property-dry-run',{intent});return {ok:true,dryRun:true,intent};}
    try{const out=propertyExecute(intent,context);rec('property-complete',{intent,result:out});return {ok:true,intent,result:out};}
    catch(err){const e=String(err&&err.message||err);rec('property-failed',{intent,error:e});return {ok:false,error:e,intent};}
  }
  function recent(limit){return history.slice(-(Math.max(1,Number(limit)||20)));}
  return {parse,execute,recent};
}
root.OSKOLocalCommandFallback={create};
})(typeof window!=='undefined'?window:globalThis);
