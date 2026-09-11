/* OSKO Living OS - System Supervisor v1
   Coordinates permissions, boot, diagnostics, persistence, recovery and updates.
   It does not install Android packages, own rendering, or control physical hardware.
*/
(function(root){
'use strict';
function create(opts){
  opts=opts||{};
  const permission=opts.permission||null;
  const boot=opts.boot||null;
  const diagnostics=opts.diagnostics||null;
  const persistence=opts.persistence||null;
  const recovery=opts.recovery||null;
  const updates=opts.updates||null;
  const vault=opts.vault||null;
  const eventBus=opts.eventBus||null;
  const state={mode:'idle',activeRelease:null,lastCheck:null,lastCheckpoint:null,lastError:null};

  function emit(type,payload){ if(eventBus&&typeof eventBus.emit==='function'){try{eventBus.emit(type,payload);}catch(_e){}} }
  function setMode(mode,detail){ state.mode=mode; emit('supervisor:mode',{mode,detail:detail||null,time:Date.now()}); return status(); }
  function allowed(actor,capability,context){
    if(!permission) return {allowed:true};
    try{
      if(typeof permission.check==='function') return permission.check(actor,capability,context||{});
      if(typeof permission.evaluate==='function') return permission.evaluate(actor,capability,context||{});
    }catch(err){ return {allowed:false,reason:String(err&&err.message||err)}; }
    return {allowed:false,reason:'PERMISSION_METHOD_UNAVAILABLE'};
  }
  function runHealth(){
    if(!diagnostics) return {healthy:true,skipped:true};
    try{
      const r=typeof diagnostics.summary==='function'?diagnostics.summary():{results:typeof diagnostics.runAll==='function'?diagnostics.runAll():[]};
      const healthy=r.healthy!==false && !(r.results||[]).some(x=>x&&(x.status==='fail'||x.status==='error'));
      state.lastCheck={time:Date.now(),healthy,result:r};
      emit('supervisor:health',state.lastCheck);
      return {healthy,result:r};
    }catch(err){ state.lastError=String(err&&err.message||err); return {healthy:false,error:state.lastError}; }
  }
  function checkpoint(label,snapshot){
    if(!persistence||typeof persistence.checkpoint!=='function') return {ok:false,error:'PERSISTENCE_UNAVAILABLE'};
    try{
      const data=snapshot||{vault:vault&&typeof vault.snapshot==='function'?vault.snapshot():null,supervisor:status()};
      const cp=persistence.checkpoint(label||'supervisor-safe-point',data,{source:'system-supervisor'});
      state.lastCheckpoint={time:Date.now(),id:cp&&cp.id||null,label:cp&&cp.name||label||null};
      emit('supervisor:checkpoint',state.lastCheckpoint);
      return {ok:true,checkpoint:cp};
    }catch(err){ return {ok:false,error:String(err&&err.message||err)}; }
  }
  function start(){
    setMode('checking');
    const health=runHealth();
    if(!health.healthy){ setMode('recovery-required',health); return {ok:false,stage:'diagnostics',health,status:status()}; }
    if(!boot||typeof boot.boot!=='function'){ setMode('degraded'); return {ok:false,error:'BOOT_UNAVAILABLE',status:status()}; }
    try{
      const result=boot.boot();
      if(result&&result.ok===false){ setMode('recovery-required',result); return {ok:false,stage:'boot',result,status:status()}; }
      setMode('running');
      return {ok:true,result,status:status()};
    }catch(err){ state.lastError=String(err&&err.message||err); setMode('recovery-required'); return {ok:false,error:state.lastError,status:status()}; }
  }
  async function approveAndActivate(actor,context){
    const gate=allowed(actor||'owner','release.activate',context||{});
    if(gate.allowed===false) return {ok:false,error:'NOT_AUTHORIZED',decision:gate};
    const pre=runHealth();
    if(!pre.healthy) return {ok:false,error:'HEALTH_CHECK_FAILED',health:pre};
    const cp=checkpoint('pre-update');
    if(!cp.ok) return {ok:false,error:'CHECKPOINT_FAILED',checkpoint:cp};
    if(!updates||typeof updates.activateStaged!=='function') return {ok:false,error:'UPDATE_CORE_UNAVAILABLE'};
    setMode('updating');
    const out=await updates.activateStaged(context||{});
    if(!out||out.ok===false){
      setMode('recovery-required',out||{});
      if(recovery&&typeof recovery.recover==='function'){
        try{ await recovery.recover({reason:'update-failed',updateResult:out}); }catch(_e){}
      }
      return {ok:false,error:'UPDATE_FAILED',result:out,status:status()};
    }
    const post=runHealth();
    if(!post.healthy){
      if(updates&&typeof updates.rollback==='function'){ try{ await updates.rollback({reason:'post-update-health-failed'}); }catch(_e){} }
      setMode('recovery-required',post);
      return {ok:false,error:'POST_UPDATE_HEALTH_FAILED',health:post,status:status()};
    }
    state.activeRelease=out.version||null;
    setMode('running');
    return {ok:true,result:out,status:status()};
  }
  async function recover(reason){
    setMode('recovering',{reason:reason||null});
    if(!recovery||typeof recovery.recover!=='function') return {ok:false,error:'RECOVERY_UNAVAILABLE',status:status()};
    try{
      const r=await recovery.recover({reason:reason||'manual'});
      const h=runHealth();
      if(r&&r.ok!==false&&h.healthy){ setMode('running'); return {ok:true,result:r,health:h,status:status()}; }
      setMode('recovery-required'); return {ok:false,result:r,health:h,status:status()};
    }catch(err){ state.lastError=String(err&&err.message||err); setMode('recovery-required'); return {ok:false,error:state.lastError,status:status()}; }
  }
  function status(){ return {mode:state.mode,activeRelease:state.activeRelease,lastCheck:state.lastCheck,lastCheckpoint:state.lastCheckpoint,lastError:state.lastError}; }
  return {start,runHealth,checkpoint,approveAndActivate,recover,status};
}
root.OSKOSystemSupervisor={create};
})(typeof window!=='undefined'?window:globalThis);
