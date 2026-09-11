/* OSKO Living OS - Interaction Router v1
   Unifies tap, voice, spatial and UI requests into one logical action path.
   Does not directly control physical robot motors or safety-critical hardware.
*/
(function(root){
'use strict';
function create(opts){
  opts=opts||{};
  const actions=opts.actions||null;
  const registry=opts.registry||null;
  const safety=opts.safety||null;
  const eventBus=opts.eventBus||null;
  const history=[];
  function emit(type,payload){ if(eventBus&&typeof eventBus.emit==='function') eventBus.emit(type,payload); }
  function normalize(input){
    if(typeof input==='string') return {source:'ui',action:input,target:null,args:{}};
    const x=Object.assign({source:'ui',action:null,target:null,args:{},confirmed:false},input||{});
    x.source=String(x.source||'ui').toLowerCase();
    x.action=x.action?String(x.action).toUpperCase():null;
    x.target=x.target?String(x.target):null;
    return x;
  }
  function targetExists(id){
    if(!id||!registry) return true;
    if(typeof registry.get==='function') return !!registry.get(id);
    if(typeof registry.find==='function') return !!registry.find(id);
    if(typeof registry.has==='function') return !!registry.has(id);
    return true;
  }
  function safetyDecision(req){
    if(!safety) return {allowed:true,requiresConfirmation:false};
    if(typeof safety.evaluate==='function') return safety.evaluate(req,{userConfirmed:req.confirmed===true})||{allowed:true};
    if(typeof safety.check==='function') return safety.check(req,{userConfirmed:req.confirmed===true})||{allowed:true};
    return {allowed:true,requiresConfirmation:false};
  }
  async function dispatch(input){
    const req=normalize(input);
    const started=Date.now();
    let result;
    if(!req.action){ result={ok:false,code:'NO_ACTION'}; }
    else if(!targetExists(req.target)){ result={ok:false,code:'UNKNOWN_TARGET',target:req.target}; }
    else {
      const decision=safetyDecision(req);
      if(decision.allowed===false) result={ok:false,code:decision.level==='confirm'?'CONFIRMATION_REQUIRED':'BLOCKED_BY_POLICY',decision};
      else if(decision.requiresConfirmation&&!req.confirmed) result={ok:false,code:'CONFIRMATION_REQUIRED',decision};
      else if(actions&&typeof actions.perform==='function'&&req.target) result=await actions.perform(req.target,req.action,req.args,{source:req.source,confirmed:req.confirmed});
      else if(actions&&typeof actions.run==='function') result=await actions.run(req.action,req.target,req.args,req);
      else if(actions&&typeof actions.execute==='function') result=await actions.execute(req.action,req.target,req.args,req);
      else result={ok:true,code:'ROUTED_ONLY',request:req};
    }
    const record={time:started,durationMs:Date.now()-started,request:req,result:result||null};
    history.push(record); if(history.length>100) history.shift();
    emit('interaction:complete',record);
    return result;
  }
  function recent(limit){ return history.slice(-(limit||20)); }
  function status(){ return {ready:true,historyCount:history.length,hasActions:!!actions,hasRegistry:!!registry,hasSafety:!!safety}; }
  return {dispatch,recent,status};
}
root.OSKOInteractionRouter={create};
})(typeof window!=='undefined'?window:globalThis);
