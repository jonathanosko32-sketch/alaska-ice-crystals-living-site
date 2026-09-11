/* OSKO Living OS - SKIE Context Core v1
   Read-only/context planning layer for SKIE. Does not execute safety-critical actions.
*/
(function(root){
'use strict';
function create(opts){
  opts=opts||{};
  const providers=new Map();
  const history=[];
  function registerProvider(id,fn){ if(!id||typeof fn!=='function') throw new Error('provider id/function required'); providers.set(id,fn); return id; }
  function removeProvider(id){ return providers.delete(id); }
  function collect(){
    const out={time:Date.now(),sources:{}};
    providers.forEach((fn,id)=>{ try{ out.sources[id]=fn(); }catch(err){ out.sources[id]={error:String(err&&err.message||err)}; } });
    return out;
  }
  function remember(role,text,meta){ const item={role:role||'system',text:String(text||''),meta:meta||{},time:Date.now()}; history.push(item); if(history.length>80) history.shift(); return item; }
  function recent(limit){ return history.slice(-Math.max(1,Math.min(Number(limit)||12,80))); }
  function plan(request){
    request=request||{};
    const ctx=collect();
    const plan={id:'plan-'+Date.now(),request,context:ctx,steps:[],requiresConfirmation:false,authority:'ADVISORY_ONLY',time:Date.now()};
    if(request.object&&request.action) plan.steps.push({type:'intent',object:request.object,action:request.action,args:request.args||{}});
    else if(request.intent) plan.steps.push({type:'intent',intent:request.intent,args:request.args||{}});
    else plan.steps.push({type:'clarify',message:'No explicit Living OS action resolved'});
    return plan;
  }
  return {registerProvider,removeProvider,collect,remember,recent,plan};
}
root.OSKOSKIEContext={create};
})(typeof window!=='undefined'?window:globalThis);
