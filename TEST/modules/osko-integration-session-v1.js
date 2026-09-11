/* OSKO Living OS - Integration Session v1
   Stages clean visual integration without touching the protected stable build.
   Tracks readiness, scene bindings, logical state sync and test results.
*/
(function(root){
'use strict';
function create(opts){
  opts=opts||{};
  const readiness=opts.readiness||null;
  const sceneBinding=opts.sceneBinding||null;
  const sceneSync=opts.sceneSync||null;
  const manifest=opts.manifest||null;
  const eventBus=opts.eventBus||null;
  const tests=[];
  const state={phase:'PREPARE',startedAt:Date.now(),lastChange:Date.now(),bound:[],warnings:[],errors:[],checks:[]};
  function emit(type,payload){ if(eventBus&&typeof eventBus.emit==='function') eventBus.emit(type,payload); }
  function setPhase(phase){ state.phase=String(phase||'PREPARE').toUpperCase(); state.lastChange=Date.now(); emit('integration:phase',{phase:state.phase}); return state.phase; }
  function warn(message,data){ const x={time:Date.now(),message:String(message),data:data||null}; state.warnings.push(x); if(state.warnings.length>100)state.warnings.shift(); emit('integration:warning',x); return x; }
  function fail(message,data){ const x={time:Date.now(),message:String(message),data:data||null}; state.errors.push(x); if(state.errors.length>100)state.errors.shift(); emit('integration:error',x); return x; }
  function resolve(id){
    if(!manifest) return id;
    try{
      if(typeof manifest.resolve==='function') return manifest.resolve(id)||id;
      return id;
    }catch(err){ warn('manifest resolve failed',{id,error:String(err&&err.message||err)}); return id; }
  }
  function bind(id,visual,config){
    const logicalId=resolve(id);
    if(!sceneBinding||typeof sceneBinding.bind!=='function') return {ok:false,error:'SCENE_BINDING_UNAVAILABLE',id:logicalId};
    try{
      sceneBinding.bind(logicalId,visual,config||{});
      if(!state.bound.includes(logicalId)) state.bound.push(logicalId);
      emit('integration:bound',{id:logicalId});
      return {ok:true,id:logicalId};
    }catch(err){ return {ok:false,error:fail('scene bind failed',{id:logicalId,error:String(err&&err.message||err)}).message}; }
  }
  function registerStateAdapter(id,adapter){
    const logicalId=resolve(id);
    if(!sceneSync||typeof sceneSync.register!=='function') return {ok:false,error:'SCENE_SYNC_UNAVAILABLE',id:logicalId};
    try{ sceneSync.register(logicalId,adapter); return {ok:true,id:logicalId}; }
    catch(err){ return {ok:false,error:String(err&&err.message||err),id:logicalId}; }
  }
  function apply(id,nextState,meta){
    const logicalId=resolve(id);
    if(sceneSync&&typeof sceneSync.apply==='function'){
      try{ return sceneSync.apply(logicalId,nextState||{},meta||{}); }
      catch(err){ return {ok:false,error:String(err&&err.message||err),id:logicalId}; }
    }
    if(sceneBinding&&typeof sceneBinding.applyState==='function') return sceneBinding.applyState(logicalId,nextState||{});
    return {ok:false,error:'NO_STATE_SYNC_PATH',id:logicalId};
  }
  function addTest(name,fn){ if(!name||typeof fn!=='function') throw new Error('test name and function required'); tests.push({name,fn}); return api; }
  async function runTests(){
    const results=[];
    for(const t of tests){
      try{ const value=await t.fn(); const ok=!(value&&value.ok===false)&&value!==false; results.push({name:t.name,ok,value:value===undefined?null:value}); }
      catch(err){ results.push({name:t.name,ok:false,error:String(err&&err.message||err)}); }
    }
    state.checks=results; emit('integration:tests',{results}); return {ok:results.every(x=>x.ok),results};
  }
  function checkReadiness(context){
    if(!readiness) return {ok:false,error:'READINESS_GATE_UNAVAILABLE'};
    try{
      if(typeof readiness.check==='function') return readiness.check(context||{});
      if(typeof readiness.run==='function') return readiness.run(context||{});
      if(typeof readiness.status==='function') return readiness.status();
      return {ok:false,error:'READINESS_METHOD_UNAVAILABLE'};
    }catch(err){ return {ok:false,error:String(err&&err.message||err)}; }
  }
  async function prove(context){
    setPhase('VERIFY');
    const ready=checkReadiness(context);
    const testsResult=await runTests();
    const ok=(ready&&ready.ok!==false)&&testsResult.ok&&state.errors.length===0;
    setPhase(ok?'READY_FOR_VISUAL_TEST':'DEGRADED');
    const result={ok,phase:state.phase,readiness:ready,tests:testsResult.results,bound:state.bound.slice(),warnings:state.warnings.slice(-10),errors:state.errors.slice(-10)};
    emit('integration:proved',result);
    return result;
  }
  function status(){ return {phase:state.phase,startedAt:state.startedAt,lastChange:state.lastChange,bound:state.bound.slice(),warnings:state.warnings.slice(-20),errors:state.errors.slice(-20),checks:state.checks.slice()}; }
  const api={setPhase,warn,fail,bind,registerStateAdapter,apply,addTest,runTests,checkReadiness,prove,status};
  return api;
}
root.OSKOIntegrationSession={create};
})(typeof window!=='undefined'?window:globalThis);
