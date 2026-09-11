/* OSKO Living OS - Permission Core v1
   Capability-based access control for modules, AI assistance, UI, voice, spatial clients and future robots.
   Safety-critical hardware authority remains outside this module.
*/
(function(root){
'use strict';
function create(opts){
  opts=opts||{};
  const eventBus=opts.eventBus||null;
  const principals=new Map();
  const policies=new Map();
  const decisions=[];
  const maxHistory=Math.max(50,Math.min(1000,opts.maxHistory||250));

  function emit(type,payload){ if(eventBus&&typeof eventBus.emit==='function'){ try{eventBus.emit(type,payload);}catch(_e){} } }
  function norm(v){ return String(v||'').trim().toLowerCase(); }
  function clone(v){ return JSON.parse(JSON.stringify(v)); }
  function capMatch(granted,requested){
    granted=norm(granted); requested=norm(requested);
    if(!granted||!requested) return false;
    if(granted==='*') return true;
    if(granted===requested) return true;
    if(granted.endsWith('.*')) return requested.startsWith(granted.slice(0,-1));
    return false;
  }
  function registerPrincipal(def){
    if(!def||!def.id) throw new Error('principal id required');
    const id=norm(def.id);
    const current=principals.get(id)||{};
    const rec={
      id,
      type:def.type||current.type||'module',
      enabled:def.enabled!==false,
      capabilities:Array.from(new Set([...(current.capabilities||[]),...((def.capabilities||[]).map(norm))])),
      denied:Array.from(new Set([...(current.denied||[]),...((def.denied||[]).map(norm))])),
      meta:Object.assign({},current.meta||{},def.meta||{})
    };
    principals.set(id,rec); emit('permission:principal-registered',{id,type:rec.type}); return describe(id);
  }
  function setPolicy(capability,rule){
    const cap=norm(capability); if(!cap) throw new Error('capability required');
    policies.set(cap,Object.assign({requiresConfirmation:false,localOnly:false,enabled:true},rule||{}));
    emit('permission:policy-set',{capability:cap}); return clone(policies.get(cap));
  }
  function grant(id,capability){ const p=principals.get(norm(id)); if(!p) return false; const c=norm(capability); if(!p.capabilities.includes(c))p.capabilities.push(c); p.denied=p.denied.filter(x=>x!==c); emit('permission:granted',{id:p.id,capability:c}); return true; }
  function deny(id,capability){ const p=principals.get(norm(id)); if(!p) return false; const c=norm(capability); if(!p.denied.includes(c))p.denied.push(c); emit('permission:denied',{id:p.id,capability:c}); return true; }
  function revoke(id,capability){ const p=principals.get(norm(id)); if(!p) return false; const c=norm(capability); p.capabilities=p.capabilities.filter(x=>x!==c); p.denied=p.denied.filter(x=>x!==c); emit('permission:revoked',{id:p.id,capability:c}); return true; }
  function evaluate(id,capability,context){
    context=context||{}; const p=principals.get(norm(id)); const cap=norm(capability);
    let out;
    if(!p) out={allowed:false,reason:'UNKNOWN_PRINCIPAL'};
    else if(!p.enabled) out={allowed:false,reason:'PRINCIPAL_DISABLED'};
    else if(p.denied.some(x=>capMatch(x,cap))) out={allowed:false,reason:'EXPLICIT_DENY'};
    else {
      const rule=policies.get(cap)||null;
      if(rule&&rule.enabled===false) out={allowed:false,reason:'CAPABILITY_DISABLED'};
      else if(rule&&rule.localOnly===true&&context.local!==true) out={allowed:false,reason:'LOCAL_ONLY'};
      else if(rule&&rule.requiresConfirmation===true&&context.userConfirmed!==true) out={allowed:false,reason:'CONFIRMATION_REQUIRED',requiresConfirmation:true};
      else if(!p.capabilities.some(x=>capMatch(x,cap))) out={allowed:false,reason:'CAPABILITY_NOT_GRANTED'};
      else out={allowed:true,reason:'GRANTED'};
    }
    const rec={time:Date.now(),principal:norm(id),capability:cap,decision:out.reason,allowed:!!out.allowed};
    decisions.push(rec); if(decisions.length>maxHistory)decisions.shift(); emit('permission:decision',rec); return Object.assign({},out,{principal:rec.principal,capability:cap});
  }
  function require(id,capability,context){ const r=evaluate(id,capability,context); if(!r.allowed){ const e=new Error('Permission denied: '+r.reason); e.code=r.reason; e.decision=r; throw e; } return r; }
  function describe(id){ const p=principals.get(norm(id)); return p?clone(p):null; }
  function list(){ return Array.from(principals.values()).map(clone); }
  function recent(limit){ return decisions.slice(-(Math.max(1,limit||30))); }
  function status(){ return {principals:principals.size,policies:policies.size,recentDecisions:recent(10)}; }

  registerPrincipal({id:'owner',type:'user',capabilities:['*']});
  setPolicy('system.release.promote',{requiresConfirmation:true});
  setPolicy('system.protected.modify',{requiresConfirmation:true});
  setPolicy('robot.hardware.control',{localOnly:true,requiresConfirmation:true});

  return {registerPrincipal,setPolicy,grant,deny,revoke,evaluate,require,describe,list,recent,status};
}
root.OSKOPermissionCore={create};
})(typeof window!=='undefined'?window:globalThis);
