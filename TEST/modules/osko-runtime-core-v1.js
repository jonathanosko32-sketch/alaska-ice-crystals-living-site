/* OSKO Living OS - Runtime Core v1
   Safe modular coordinator. It wires logical modules together without owning Three.js render loops
   or physical robot motor control.
*/
(function(root){
'use strict';
function create(opts){
  opts=opts||{};
  const modules=Object.assign({},opts.modules||{});
  const state={started:false,startedAt:null,lastTick:null,ticks:0,errors:[],mode:'SAFE_MODULAR'};
  const listeners=new Set();

  function emit(type,payload){
    if(modules.eventBus&&typeof modules.eventBus.emit==='function'){
      try{ modules.eventBus.emit(type,payload); }catch(err){ recordError('eventBus.emit',err); }
    }
    listeners.forEach(fn=>{ try{ fn(type,payload); }catch(_e){} });
  }

  function recordError(source,err){
    const item={time:Date.now(),source,message:String(err&&err.message||err)};
    state.errors.push(item);
    if(state.errors.length>50) state.errors.shift();
    return item;
  }

  function register(name,api){
    if(!name) throw new Error('module name required');
    modules[name]=api;
    emit('runtime:module-registered',{name});
    return api;
  }

  function get(name){ return modules[name]||null; }

  function start(){
    if(state.started) return status();
    state.started=true;
    state.startedAt=Date.now();
    state.lastTick=state.startedAt;
    emit('runtime:started',{time:state.startedAt,mode:state.mode});
    return status();
  }

  function tick(now){
    if(!state.started) start();
    const t=Number(now)||Date.now();
    const dt=Math.max(0,Math.min(1000,t-(state.lastTick||t)));
    state.lastTick=t;
    state.ticks++;
    const order=['environment','worldState','routines','wildlife','awareness','alerts','diagnostics'];
    for(const name of order){
      const mod=modules[name];
      if(!mod) continue;
      try{
        if(typeof mod.tick==='function') mod.tick(t,dt);
        else if(typeof mod.update==='function') mod.update(t,dt);
        else if(name==='awareness'&&typeof mod.scan==='function') mod.scan();
      }catch(err){ recordError(name+'.tick',err); }
    }
    emit('runtime:tick',{time:t,dt,ticks:state.ticks});
    return {time:t,dt,ticks:state.ticks};
  }

  function execute(target,action,args,context){
    const core=modules.actions||modules.actionCore;
    if(!core) return {ok:false,error:'ACTION_CORE_UNAVAILABLE'};
    try{
      let result;
      if(typeof core.perform==='function') result=core.perform(target,action,args,context);
      else if(typeof core.execute==='function') result=core.execute(target,action,args,context);
      else if(typeof core.run==='function') result=core.run(target,action,args,context);
      else return {ok:false,error:'ACTION_METHOD_UNAVAILABLE'};
      emit('runtime:action',{target,action,ok:!(result&&result.ok===false)});
      return result&&typeof result.then==='function'
        ? result.then(value=>({ok:!(value&&value.ok===false),result:value})).catch(err=>{ const item=recordError('action:'+target+':'+action,err); return {ok:false,error:item.message}; })
        : {ok:!(result&&result.ok===false),result};
    }catch(err){
      const item=recordError('action:'+target+':'+action,err);
      emit('runtime:action',{target,action,ok:false,error:item.message});
      return {ok:false,error:item.message};
    }
  }

  function navigate(target,context){
    const routes=modules.routes||modules.routeCore;
    if(!routes) return {ok:false,error:'ROUTE_CORE_UNAVAILABLE'};
    try{
      const result=typeof routes.go==='function'?routes.go(target,context):
        (typeof routes.navigate==='function'?routes.navigate(target,context):null);
      if(result===null) return {ok:false,error:'ROUTE_METHOD_UNAVAILABLE'};
      emit('runtime:navigate',{target,ok:true});
      return {ok:true,result};
    }catch(err){
      const item=recordError('navigate:'+target,err);
      return {ok:false,error:item.message};
    }
  }

  function onEvent(fn){ if(typeof fn!=='function') throw new Error('listener required'); listeners.add(fn); return ()=>listeners.delete(fn); }

  function status(){
    return {
      started:state.started,
      startedAt:state.startedAt,
      lastTick:state.lastTick,
      ticks:state.ticks,
      mode:state.mode,
      modules:Object.keys(modules).sort(),
      recentErrors:state.errors.slice(-10)
    };
  }

  return {register,get,start,tick,execute,navigate,onEvent,status};
}
root.OSKORuntime={create};
})(typeof window!=='undefined'?window:globalThis);
