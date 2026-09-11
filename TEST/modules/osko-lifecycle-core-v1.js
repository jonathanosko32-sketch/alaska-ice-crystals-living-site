/* OSKO Living OS - Lifecycle Core v1
   Coordinates startup, pause, resume, checkpoint and safe logical shutdown.
   This module does not power off devices or physical robots.
*/
(function(root){
'use strict';

function create(opts){
  opts=opts||{};
  const runtime=opts.runtime||null;
  const persistence=opts.persistence||null;
  const diagnostics=opts.diagnostics||null;
  const eventBus=opts.eventBus||null;
  const journal=opts.journal||null;
  const state={phase:'created',startedAt:null,pausedAt:null,stoppedAt:null,lastCheckpoint:null,errors:[]};

  function emit(type,payload){
    if(eventBus&&typeof eventBus.emit==='function'){
      try{ eventBus.emit(type,payload); }catch(_e){}
    }
  }

  function record(type,data){
    if(journal&&typeof journal.record==='function'){
      try{ journal.record(type,data||{}); }catch(_e){}
    }
  }

  function fail(source,err){
    const item={time:Date.now(),source,error:String(err&&err.message||err)};
    state.errors.push(item);
    if(state.errors.length>50) state.errors.shift();
    emit('lifecycle:error',item);
    record('lifecycle:error',item);
    return item;
  }

  function start(){
    if(state.phase==='running') return status();
    try{
      if(runtime&&typeof runtime.start==='function') runtime.start();
      if(diagnostics&&typeof diagnostics.runAll==='function') diagnostics.runAll();
      state.phase='running';
      state.startedAt=state.startedAt||Date.now();
      state.pausedAt=null;
      emit('lifecycle:started',{time:Date.now()});
      record('lifecycle:started',{});
    }catch(err){
      fail('start',err);
      state.phase='degraded';
    }
    return status();
  }

  function pause(reason){
    if(state.phase!=='running') return status();
    state.phase='paused';
    state.pausedAt=Date.now();
    emit('lifecycle:paused',{time:state.pausedAt,reason:reason||null});
    record('lifecycle:paused',{reason:reason||null});
    return status();
  }

  function resume(){
    if(state.phase!=='paused'&&state.phase!=='degraded') return status();
    state.phase='running';
    state.pausedAt=null;
    emit('lifecycle:resumed',{time:Date.now()});
    record('lifecycle:resumed',{});
    return status();
  }

  function checkpoint(label,snapshot){
    if(!persistence||typeof persistence.checkpoint!=='function'){
      return {ok:false,error:'PERSISTENCE_CHECKPOINT_UNAVAILABLE'};
    }
    try{
      const name=String(label||('checkpoint-'+Date.now()));
      const result=persistence.checkpoint(name,snapshot||{lifecycle:status()});
      state.lastCheckpoint={time:Date.now(),label:name};
      emit('lifecycle:checkpoint',state.lastCheckpoint);
      record('lifecycle:checkpoint',state.lastCheckpoint);
      return {ok:true,result};
    }catch(err){
      const item=fail('checkpoint',err);
      return {ok:false,error:item.error};
    }
  }

  function stop(reason){
    state.phase='stopped';
    state.stoppedAt=Date.now();
    emit('lifecycle:stopped',{time:state.stoppedAt,reason:reason||null});
    record('lifecycle:stopped',{reason:reason||null});
    return status();
  }

  function tick(now){
    if(state.phase!=='running') return {ok:false,phase:state.phase};
    if(runtime&&typeof runtime.tick==='function'){
      try{ return {ok:true,result:runtime.tick(now)}; }
      catch(err){ fail('tick',err); state.phase='degraded'; return {ok:false,phase:state.phase}; }
    }
    return {ok:false,error:'RUNTIME_TICK_UNAVAILABLE'};
  }

  function status(){
    return {
      phase:state.phase,
      startedAt:state.startedAt,
      pausedAt:state.pausedAt,
      stoppedAt:state.stoppedAt,
      lastCheckpoint:state.lastCheckpoint,
      recentErrors:state.errors.slice(-10)
    };
  }

  return {start,pause,resume,checkpoint,stop,tick,status};
}

root.OSKOLifecycle={create};
})(typeof window!=='undefined'?window:globalThis);
