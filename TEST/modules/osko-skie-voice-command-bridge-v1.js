/* OSKO Living OS - SKIE Voice Command Bridge v1
   Deterministic phrase-to-intent bridge for SKIE, robot jobs, and property actions.
   Does not open the microphone itself and never directly actuates physical hardware.
*/
(function(root){
'use strict';

function create(opts){
  opts=opts||{};
  const voiceIntent=opts.voiceIntent||null;
  const robotCoordinator=opts.robotCoordinator||null;
  const propertyExecute=typeof opts.propertyExecute==='function'?opts.propertyExecute:null;
  const permission=opts.permission||null;
  const eventBus=opts.eventBus||null;
  const history=[];

  function emit(type,payload){ if(eventBus&&typeof eventBus.emit==='function'){ try{eventBus.emit(type,payload);}catch(_e){} } }
  function norm(v){ return String(v||'').trim().toLowerCase().replace(/[^a-z0-9\s-]/g,' ').replace(/\s+/g,' '); }
  function clone(v){ return JSON.parse(JSON.stringify(v)); }
  function record(kind,data){ const r=Object.assign({time:Date.now(),kind},data||{}); history.push(r); if(history.length>250)history.shift(); emit('skie-voice:'+kind,r); return r; }
  function denied(capability,context){
    if(!permission||typeof permission.evaluate!=='function') return null;
    const out=permission.evaluate('skie',capability,context||{});
    return out&&out.allowed===false?out:null;
  }

  function extractRobot(text){
    const m=text.match(/\brobot\s*(one|1|two|2|three|3|four|4)\b/);
    if(!m) return null;
    const map={one:'robot-1','1':'robot-1',two:'robot-2','2':'robot-2',three:'robot-3','3':'robot-3',four:'robot-4','4':'robot-4'};
    return map[m[1]]||null;
  }
  function targetFrom(text){
    const targets=['workshop','shop','truck','school','library','hq','house','home','gate','lake','dock','robot garage','communications tower','tower','ranch','fuel','maintenance'];
    let best=null;
    targets.forEach(function(t){ if(text.includes(t)&&(!best||t.length>best.length)) best=t; });
    return best;
  }
  function parseRobot(text){
    const robotId=extractRobot(text);
    const target=targetFrom(text);
    let action=null;
    if(/\b(check|inspect|look at|look over)\b/.test(text)) action='inspect';
    else if(/\b(patrol|walk around|check around)\b/.test(text)) action='patrol';
    else if(/\b(return to dock|go to dock|dock|charge)\b/.test(text)) action='dock';
    else if(/\b(report|status)\b/.test(text)) action='report';
    else if(/\b(go to|move to|head to|walk to)\b/.test(text)) action='move';
    if(/\b(test|check)\b/.test(text)&&/\b(build|version|release)\b/.test(text)) action='test-build';
    if(/\b(promote|activate release|delete protected|disable safety|control motor|drive motor)\b/.test(text)) action='protected';
    if(!action && !robotId) return null;
    return {kind:'robot',action:action||'report',robotId,target};
  }

  function parse(phrase){
    const text=norm(phrase);
    if(!text) return {ok:false,reason:'empty'};
    const robot=parseRobot(text);
    if(robot) return Object.assign({ok:true,text},robot);
    if(voiceIntent&&typeof voiceIntent.parse==='function'){
      const out=voiceIntent.parse(text);
      return Object.assign({},out,{text});
    }
    return {ok:false,reason:'unrecognized',text};
  }

  function execute(phrase,context){
    context=Object.assign({actor:'skie',source:'voice'},context||{});
    const intent=parse(phrase);
    if(!intent.ok){ record('unrecognized',{phrase:String(phrase||''),intent}); return {ok:false,error:'UNRECOGNIZED',intent}; }

    if(intent.kind==='robot'){
      if(intent.action==='protected'){
        record('blocked',{phrase:String(phrase||''),reason:'PROTECTED_OR_PHYSICAL_ACTION'});
        return {ok:false,error:'PROTECTED_OR_PHYSICAL_ACTION',intent};
      }
      const pd=denied('robot.job.submit',context);
      if(pd){ record('blocked',{phrase:String(phrase||''),reason:pd.reason}); return {ok:false,error:'PERMISSION_DENIED',decision:pd,intent}; }
      if(!robotCoordinator||typeof robotCoordinator.request!=='function') return {ok:false,error:'ROBOT_COORDINATOR_UNAVAILABLE',intent};
      const req={action:intent.action,target:intent.target,payload:{preferredRobot:intent.robotId,spoken:String(phrase||'')}};
      const out=robotCoordinator.request(req,context);
      record(out&&out.ok?'robot-requested':'robot-rejected',{intent:clone(intent),result:clone(out)});
      return {ok:!!(out&&out.ok),intent,result:out};
    }

    if(intent.type==='object-action'||intent.type==='navigation'){
      if(!propertyExecute){ record('property-dry-run',{intent:clone(intent)}); return {ok:true,dryRun:true,intent}; }
      try{
        const out=propertyExecute(intent,context);
        record('property-requested',{intent:clone(intent),result:clone(out)});
        return {ok:true,intent,result:out};
      }catch(err){
        const msg=String(err&&err.message||err); record('property-error',{intent:clone(intent),error:msg}); return {ok:false,error:msg,intent};
      }
    }

    return {ok:false,error:'UNSUPPORTED_INTENT',intent};
  }

  function recent(limit){ return history.slice(-(Math.max(1,Number(limit)||30))); }
  return {parse,execute,recent};
}

root.OSKOSKIEVoiceCommandBridge={create};
})(typeof window!=='undefined'?window:globalThis);
