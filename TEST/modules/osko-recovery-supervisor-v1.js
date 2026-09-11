/* OSKO Living OS - Recovery Supervisor v1
   Coordinates safe logical recovery after boot/update/runtime failures.
   Does not power hardware, delete user data, or modify protected master builds.
*/
(function(root){
'use strict';
function create(opts){
  opts=opts||{};
  const eventBus=opts.eventBus||null;
  const boot=opts.boot||null;
  const lifecycle=opts.lifecycle||null;
  const persistence=opts.persistence||null;
  const updater=opts.updater||null;
  const diagnostics=opts.diagnostics||null;
  const journal=opts.journal||null;
  const state={mode:'normal',attempts:0,lastReason:null,lastAction:null,history:[],errors:[]};
  function emit(type,payload){ if(eventBus&&typeof eventBus.emit==='function'){ try{eventBus.emit(type,payload);}catch(_e){} } }
  function add(kind,data){ const x=Object.assign({time:Date.now(),kind},data||{}); state.history.push(x); if(state.history.length>120)state.history.shift(); emit('recovery:'+kind,x); if(journal&&typeof journal.system==='function'){ try{journal.system({source:'recovery',action:kind,status:x.ok===false?'fail':'ok',output:x});}catch(_e){} } return x; }
  function fail(source,err){ const x={time:Date.now(),source,error:String(err&&err.message||err)}; state.errors.push(x); if(state.errors.length>50)state.errors.shift(); emit('recovery:error',x); return x; }
  function enter(reason){
    state.mode='recovery'; state.lastReason=reason||'unknown'; state.attempts++;
    if(lifecycle&&typeof lifecycle.pause==='function'){ try{lifecycle.pause('recovery:'+state.lastReason);}catch(_e){} }
    if(boot&&typeof boot.enterRecovery==='function'){ try{boot.enterRecovery(state.lastReason);}catch(_e){} }
    state.lastAction=add('entered',{reason:state.lastReason,attempt:state.attempts});
    return status();
  }
  function diagnosticsCheck(){
    try{
      if(!diagnostics) return {ok:true,skipped:true};
      const r=typeof diagnostics.summary==='function'?diagnostics.summary():(typeof diagnostics.runAll==='function'?{results:diagnostics.runAll()}:null);
      if(!r) return {ok:false,error:'DIAGNOSTICS_UNAVAILABLE'};
      const ok=r.healthy!==false && !(r.results||[]).some(x=>x&&(x.status==='fail'||x.status==='error'));
      return {ok,result:r};
    }catch(err){ return {ok:false,error:fail('diagnostics',err).error}; }
  }
  function restoreLatestCheckpoint(){
    try{
      if(!persistence||typeof persistence.listCheckpoints!=='function'||typeof persistence.restore!=='function') return {ok:false,error:'CHECKPOINT_API_UNAVAILABLE'};
      const list=persistence.listCheckpoints();
      if(!list.length) return {ok:false,error:'NO_CHECKPOINT'};
      const cp=list[list.length-1];
      const restored=persistence.restore(cp.id);
      if(!restored) return {ok:false,error:'RESTORE_FAILED'};
      state.lastAction=add('checkpoint-restored',{ok:true,id:cp.id,name:cp.name||null});
      return {ok:true,checkpoint:restored};
    }catch(err){ return {ok:false,error:fail('restore-checkpoint',err).error}; }
  }
  async function rollbackUpdate(context){
    try{
      if(!updater||typeof updater.rollback!=='function') return {ok:false,error:'ROLLBACK_API_UNAVAILABLE'};
      const r=await updater.rollback(context||{});
      state.lastAction=add('update-rollback',{ok:!!(r&&r.ok),result:r||null});
      return r||{ok:false,error:'EMPTY_ROLLBACK_RESULT'};
    }catch(err){ return {ok:false,error:fail('rollback-update',err).error}; }
  }
  function resume(){
    const d=diagnosticsCheck();
    if(!d.ok) return {ok:false,error:'DIAGNOSTICS_NOT_HEALTHY',diagnostics:d,status:status()};
    try{
      if(lifecycle&&typeof lifecycle.resume==='function') lifecycle.resume();
      state.mode='normal'; state.lastAction=add('resumed',{ok:true});
      return {ok:true,diagnostics:d,status:status()};
    }catch(err){ return {ok:false,error:fail('resume',err).error,status:status()}; }
  }
  async function recover(strategy,context){
    strategy=String(strategy||'checkpoint').toLowerCase();
    if(state.mode!=='recovery') enter((context&&context.reason)||'manual');
    if(strategy==='rollback'){
      const r=await rollbackUpdate(context); if(!r.ok) return {ok:false,strategy,result:r,status:status()};
    }else if(strategy==='checkpoint'){
      const r=restoreLatestCheckpoint(); if(!r.ok) return {ok:false,strategy,result:r,status:status()};
    }else if(strategy==='diagnostics'){
      const r=diagnosticsCheck(); return {ok:r.ok,strategy,result:r,status:status()};
    }else return {ok:false,error:'UNKNOWN_RECOVERY_STRATEGY',strategy,status:status()};
    return Object.assign({strategy},resume());
  }
  function status(){ return {mode:state.mode,attempts:state.attempts,lastReason:state.lastReason,lastAction:state.lastAction,recentHistory:state.history.slice(-20),recentErrors:state.errors.slice(-10)}; }
  return {enter,diagnosticsCheck,restoreLatestCheckpoint,rollbackUpdate,resume,recover,status};
}
root.OSKORecoverySupervisor={create};
})(typeof window!=='undefined'?window:globalThis);
