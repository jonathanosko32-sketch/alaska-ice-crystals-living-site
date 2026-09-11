/* OSKO Living OS - System Boot Coordinator v1
   Coordinates safe startup from persisted state through diagnostics into runtime.
   Does not own rendering, install Android packages, or control physical hardware.
*/
(function(root){
'use strict';
function create(opts){
  opts=opts||{};
  const lifecycle=opts.lifecycle||null;
  const persistence=opts.persistence||null;
  const diagnostics=opts.diagnostics||null;
  const eventBus=opts.eventBus||null;
  const worldState=opts.worldState||null;
  const restore=typeof opts.restore==='function'?opts.restore:null;
  const state={phase:'idle',lastBoot:null,lastRestore:null,lastDiagnostics:null,errors:[]};

  function emit(type,payload){ if(eventBus&&typeof eventBus.emit==='function'){ try{eventBus.emit(type,payload);}catch(_e){} } }
  function fail(source,err){ const item={time:Date.now(),source,error:String(err&&err.message||err)}; state.errors.push(item); if(state.errors.length>30)state.errors.shift(); emit('boot:error',item); return item; }
  function setPhase(phase){ state.phase=phase; emit('boot:phase',{phase,time:Date.now()}); return phase; }

  function loadSaved(){
    if(!persistence||typeof persistence.load!=='function') return {ok:true,restored:false,reason:'NO_PERSISTENCE'};
    try{
      const saved=persistence.load();
      if(!saved||!saved.state) return {ok:true,restored:false,reason:'NO_SAVED_STATE'};
      if(restore){
        const out=restore(saved.state,saved.meta||{});
        if(out===false||(out&&out.ok===false)) return {ok:false,error:'RESTORE_REJECTED',result:out};
      } else if(worldState&&typeof worldState.setProperty==='function'&&saved.state.property){
        Object.keys(saved.state.property).forEach(function(key){
          try{ worldState.setProperty(key,saved.state.property[key]); }catch(_e){}
        });
      }
      state.lastRestore={time:Date.now(),savedAt:saved.savedAt||null,meta:saved.meta||{}};
      emit('boot:restored',state.lastRestore);
      return {ok:true,restored:true,savedAt:saved.savedAt||null};
    }catch(err){ fail('restore',err); return {ok:false,error:'RESTORE_FAILED',message:String(err&&err.message||err)}; }
  }

  function runDiagnostics(){
    if(!diagnostics) return {ok:true,skipped:true,reason:'NO_DIAGNOSTICS'};
    try{
      const result=typeof diagnostics.summary==='function'?diagnostics.summary():
        (typeof diagnostics.runAll==='function'?{results:diagnostics.runAll()}:null);
      if(!result) return {ok:false,error:'DIAGNOSTICS_METHOD_UNAVAILABLE'};
      const healthy=result.healthy!==false && !(result.results||[]).some(function(r){return r&& (r.status==='fail'||r.status==='error');});
      state.lastDiagnostics={time:Date.now(),healthy,result};
      emit('boot:diagnostics',state.lastDiagnostics);
      return {ok:healthy,result};
    }catch(err){ fail('diagnostics',err); return {ok:false,error:'DIAGNOSTICS_FAILED',message:String(err&&err.message||err)}; }
  }

  function boot(){
    if(state.phase==='running') return {ok:true,status:status()};
    setPhase('restoring');
    const restored=loadSaved();
    if(!restored.ok){ setPhase('recovery'); return {ok:false,stage:'restore',restored,status:status()}; }

    setPhase('diagnostics');
    const diag=runDiagnostics();
    if(!diag.ok){ setPhase('recovery'); return {ok:false,stage:'diagnostics',diagnostics:diag,status:status()}; }

    setPhase('starting');
    try{
      const life=lifecycle&&typeof lifecycle.start==='function'?lifecycle.start():null;
      if(life&&life.phase==='degraded'){ setPhase('recovery'); return {ok:false,stage:'lifecycle',lifecycle:life,status:status()}; }
      state.lastBoot={time:Date.now(),restored:!!restored.restored};
      setPhase('running');
      emit('boot:complete',{time:state.lastBoot.time,restored:state.lastBoot.restored});
      return {ok:true,restored,diagnostics:diag,lifecycle:life,status:status()};
    }catch(err){ fail('start',err); setPhase('recovery'); return {ok:false,stage:'start',error:String(err&&err.message||err),status:status()}; }
  }

  function enterRecovery(reason){ setPhase('recovery'); emit('boot:recovery',{reason:reason||null,time:Date.now()}); return status(); }
  function status(){ return {phase:state.phase,lastBoot:state.lastBoot,lastRestore:state.lastRestore,lastDiagnostics:state.lastDiagnostics,recentErrors:state.errors.slice(-10)}; }
  return {boot,loadSaved,runDiagnostics,enterRecovery,status};
}
root.OSKOSystemBoot={create};
})(typeof window!=='undefined'?window:globalThis);
