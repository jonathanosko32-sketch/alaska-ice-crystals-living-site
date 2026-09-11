/* OSKO Living OS - Diagnostics Core v1
   Read-only health/diagnostics layer for logical Living OS modules.
*/
(function(root){
'use strict';
function create(opts){
  opts=opts||{};
  const eventBus=opts.eventBus||null;
  const checks=new Map();
  const history=[];
  function emit(type,payload){ if(eventBus&&typeof eventBus.emit==='function') eventBus.emit(type,payload); }
  function register(id,fn,meta){
    if(!id||typeof fn!=='function') throw new Error('diagnostic check requires id and function');
    checks.set(id,{id,fn,meta:Object.assign({label:id,critical:false},meta||{})});
    return id;
  }
  function normalize(id,result,meta){
    if(result&&typeof result==='object'&&!Array.isArray(result)){
      return Object.assign({id,status:'ok',message:'OK',time:Date.now(),meta:meta||{}},result,{id,time:Date.now()});
    }
    return {id,status:result===false?'fail':'ok',message:result===false?'FAILED':'OK',time:Date.now(),meta:meta||{}};
  }
  function run(id){
    const item=checks.get(id); if(!item) return {id,status:'missing',message:'Unknown diagnostic check',time:Date.now()};
    try{
      const out=normalize(id,item.fn(),item.meta);
      history.push(out); if(history.length>250) history.shift();
      emit('diagnostics:result',out); return out;
    }catch(err){
      const out={id,status:'error',message:String(err&&err.message||err),time:Date.now(),meta:item.meta};
      history.push(out); if(history.length>250) history.shift();
      emit('diagnostics:result',out); return out;
    }
  }
  function runAll(){ return Array.from(checks.keys()).map(run); }
  function summary(){
    const results=runAll();
    const counts=results.reduce((a,r)=>{a[r.status]=(a[r.status]||0)+1;return a;},{});
    return {time:Date.now(),counts,healthy:!results.some(r=>r.status==='fail'||r.status==='error'),results};
  }
  function recent(limit){ return history.slice(-(Math.max(1,limit||20))); }
  function registerStandard(name,getter){
    register(name,function(){
      const value=typeof getter==='function'?getter():getter;
      return value?{status:'ok',message:name+' online'}:{status:'fail',message:name+' unavailable'};
    },{label:name});
  }
  return {register,registerStandard,run,runAll,summary,recent};
}
root.OSKODiagnostics={create};
})(typeof window!=='undefined'?window:globalThis);
