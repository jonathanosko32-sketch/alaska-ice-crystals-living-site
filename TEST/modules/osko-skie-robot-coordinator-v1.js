/* OSKO Living OS - SKIE Robot Coordinator v1
   Central SKIE brain coordination for the four robot work bodies.
   Simulator-first. No direct motor actuation or safety bypass.
*/
(function(root){
'use strict';
function create(opts){
  opts=opts||{};
  const fleet=opts.fleet||null;
  const jobs=opts.jobs||null;
  const docks=opts.docks||null;
  const permission=opts.permission||null;
  const eventBus=opts.eventBus||null;
  const history=[];

  function emit(type,payload){ if(eventBus&&typeof eventBus.emit==='function'){ try{eventBus.emit(type,payload);}catch(_e){} } }
  function clone(v){ return JSON.parse(JSON.stringify(v)); }
  function record(kind,data){ const r=Object.assign({time:Date.now(),kind},data||{}); history.push(r); if(history.length>250) history.shift(); emit('skie-robot:'+kind,r); return r; }
  function ensureSkiePrincipal(){
    if(!permission||typeof permission.registerPrincipal!=='function') return null;
    const existing=typeof permission.describe==='function'?permission.describe('skie'):null;
    if(existing) return existing;
    return permission.registerPrincipal({
      id:'skie',
      type:'ai',
      capabilities:[
        'robot.job.submit','robot.job.dispatch','robot.job.complete','robot.job.cancel','robot.job.assign','robot.mode.set',
        'robot.status.read','robot.dock.read','robot.simulation.run'
      ],
      denied:['robot.hardware.control','system.release.promote','system.protected.modify']
    });
  }
  ensureSkiePrincipal();

  function status(){
    return {
      brain:'SKIE',
      fleet:fleet&&typeof fleet.status==='function'?fleet.status():null,
      jobs:jobs&&typeof jobs.status==='function'?jobs.status():null,
      docks:docks&&typeof docks.status==='function'?docks.status():null,
      recent:history.slice(-20)
    };
  }

  function chooseJobSpec(intent){
    intent=intent||{};
    const action=String(intent.action||intent.type||'inspect').toLowerCase();
    const target=intent.target?String(intent.target):null;
    if(['promote','release-promote','protected-modify','safety-disable','physical-actuation','drive-motor'].includes(action)){
      return {ok:false,error:'PROTECTED_OR_PHYSICAL_ACTION',action};
    }
    const map={
      inspect:{type:'inspect',requiredCapability:'inspect-sim',title:'Inspect '+(target||'assigned area')},
      patrol:{type:'patrol',requiredCapability:'move-sim',title:'Patrol '+(target||'property')},
      move:{type:'move',requiredCapability:'move-sim',title:'Move to '+(target||'assigned location')},
      dock:{type:'dock',requiredCapability:'dock-sim',title:'Return to dock'},
      report:{type:'report',requiredCapability:'report',title:'Report status'},
      'test-build':{type:'test-build',requiredCapability:'inspect-sim',title:'Check test build '+(target||'')}
    };
    const base=map[action]||{type:action,requiredCapability:intent.requiredCapability||null,title:intent.title||action};
    return {ok:true,spec:Object.assign({},base,{target,payload:clone(intent.payload||{}),priority:intent.priority||50,simulation:true})};
  }

  function request(intent,context){
    context=Object.assign({actor:'skie'},context||{});
    if(!jobs||typeof jobs.submit!=='function') return {ok:false,error:'JOB_CORE_UNAVAILABLE'};
    const built=chooseJobSpec(intent);
    if(!built.ok){ record('blocked',{intent:clone(intent||{}),reason:built.error}); return built; }
    const submitted=jobs.submit(built.spec,context);
    record(submitted.ok?'job-requested':'job-rejected',{intent:clone(intent||{}),result:clone(submitted)});
    return submitted;
  }

  function dispatch(context){
    context=Object.assign({actor:'skie'},context||{});
    if(!jobs||typeof jobs.dispatchNext!=='function') return {ok:false,error:'JOB_CORE_UNAVAILABLE'};
    const out=jobs.dispatchNext(context);
    record(out.ok?'job-dispatched':'dispatch-wait',{result:clone(out)});
    return out;
  }

  function complete(jobId,result,context){
    context=Object.assign({actor:'skie'},context||{});
    if(!jobs||typeof jobs.finish!=='function') return {ok:false,error:'JOB_CORE_UNAVAILABLE'};
    const out=jobs.finish(jobId,result||{ok:true},context);
    record(out.ok?'job-complete':'job-complete-failed',{jobId:String(jobId),result:clone(out)});
    return out;
  }

  function sendToDock(robotId,context){
    context=Object.assign({actor:'skie'},context||{});
    if(!fleet||typeof fleet.snapshot!=='function') return {ok:false,error:'FLEET_UNAVAILABLE'};
    const robot=fleet.snapshot(robotId);
    if(!robot) return {ok:false,error:'UNKNOWN_ROBOT'};
    return request({action:'dock',target:robotId,payload:{robotId}},context);
  }

  function recent(limit){ return history.slice(-(Math.max(1,Number(limit)||30))); }
  return {request,dispatch,complete,sendToDock,status,recent};
}
root.OSKOSKIERobotCoordinator={create};
})(typeof window!=='undefined'?window:globalThis);
