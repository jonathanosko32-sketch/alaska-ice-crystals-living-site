/* OSKO Living OS - State Migration Core v1
   Safely upgrades persisted Living OS data between schema versions.
   Never mutates protected visual builds and never deletes user state implicitly.
*/
(function(root){
'use strict';
function clone(v){ return v==null?v:JSON.parse(JSON.stringify(v)); }
function create(opts){
  opts=opts||{};
  const eventBus=opts.eventBus||null;
  const migrations=new Map();
  const state={currentSchema:Number(opts.currentSchema)||1,lastRun:null,history:[],errors:[]};
  function emit(type,payload){ if(eventBus&&typeof eventBus.emit==='function'){ try{eventBus.emit(type,payload);}catch(_e){} } }
  function record(type,data){ const x=Object.assign({time:Date.now(),type},data||{}); state.history.push(x); if(state.history.length>100)state.history.shift(); emit('migration:'+type,x); return x; }
  function fail(from,to,err){ const x={time:Date.now(),from,to,error:String(err&&err.message||err)}; state.errors.push(x); if(state.errors.length>50)state.errors.shift(); emit('migration:error',x); return x; }
  function register(fromVersion,toVersion,fn,meta){
    const from=Number(fromVersion),to=Number(toVersion);
    if(!Number.isInteger(from)||!Number.isInteger(to)||to<=from) throw new Error('migration versions must increase');
    if(typeof fn!=='function') throw new Error('migration function required');
    const key=from+'>'+to;
    migrations.set(key,{from,to,fn,meta:Object.assign({},meta||{})});
    record('registered',{from,to});
    return key;
  }
  function nextFrom(version){
    const choices=Array.from(migrations.values()).filter(m=>m.from===version).sort((a,b)=>a.to-b.to);
    return choices[0]||null;
  }
  function plan(fromVersion,toVersion){
    const from=Number(fromVersion)||1,to=Number(toVersion)||state.currentSchema;
    if(from===to) return {ok:true,from,to,steps:[]};
    if(from>to) return {ok:false,error:'DOWNGRADE_NOT_SUPPORTED',from,to,steps:[]};
    const steps=[]; let v=from; const seen=new Set();
    while(v<to){
      if(seen.has(v)) return {ok:false,error:'MIGRATION_LOOP',from,to,steps};
      seen.add(v);
      const m=nextFrom(v);
      if(!m||m.to>to) return {ok:false,error:'MISSING_MIGRATION',from,to,at:v,steps};
      steps.push({from:m.from,to:m.to,meta:clone(m.meta)}); v=m.to;
    }
    return {ok:v===to,from,to,steps,error:v===to?null:'INCOMPLETE_PLAN'};
  }
  function migrate(input,fromVersion,toVersion,context){
    const p=plan(fromVersion,toVersion);
    if(!p.ok) return Object.assign({data:clone(input)},p);
    let data=clone(input); const applied=[];
    try{
      for(const s of p.steps){
        const m=migrations.get(s.from+'>'+s.to);
        const out=m.fn(clone(data),Object.assign({from:s.from,to:s.to},context||{}));
        if(out===undefined) throw new Error('migration returned undefined for '+s.from+'>'+s.to);
        data=clone(out); applied.push({from:s.from,to:s.to});
      }
      state.lastRun={time:Date.now(),from:p.from,to:p.to,applied:clone(applied)};
      record('complete',state.lastRun);
      return {ok:true,from:p.from,to:p.to,data,applied};
    }catch(err){
      const current=applied.length?applied[applied.length-1].to:p.from;
      const e=fail(current,p.to,err);
      return {ok:false,error:'MIGRATION_FAILED',message:e.error,from:p.from,to:p.to,applied,data:clone(input)};
    }
  }
  function inspectEnvelope(saved){
    if(!saved) return {schemaVersion:1,state:null,meta:{}};
    const meta=Object.assign({},saved.meta||{});
    const schemaVersion=Number(meta.schemaVersion||saved.schemaVersion||1)||1;
    return {schemaVersion,state:clone(saved.state),meta};
  }
  function status(){ return {currentSchema:state.currentSchema,registered:Array.from(migrations.keys()).sort(),lastRun:clone(state.lastRun),recentErrors:clone(state.errors.slice(-10))}; }
  return {register,plan,migrate,inspectEnvelope,status};
}
root.OSKOStateMigration={create};
})(typeof window!=='undefined'?window:globalThis);
