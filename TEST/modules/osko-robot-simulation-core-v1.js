/* OSKO Living OS - Robot Simulation Core v1
   Advances simulated robot jobs through safe logical steps inside the Living OS world.
   Never controls physical motors or bypasses local safety.
*/
(function(root){
'use strict';
function create(opts){
  opts=opts||{};
  const fleet=opts.fleet||null;
  const jobs=opts.jobs||null;
  const eventBus=opts.eventBus||null;
  const routes=opts.routes||{};
  const active=new Map();

  function emit(type,payload){ if(eventBus&&typeof eventBus.emit==='function'){ try{eventBus.emit(type,payload);}catch(_e){} } }
  function clone(v){ return JSON.parse(JSON.stringify(v)); }
  function makeSteps(job){
    const target=job.target||'assigned-area';
    switch(job.type){
      case 'dock': return ['acknowledge','route-to-dock','arrive-dock','confirm-docked'];
      case 'patrol': return ['acknowledge','route-start','patrol-waypoints','return-report'];
      case 'move': return ['acknowledge','plan-route','travel-'+target,'arrive'];
      case 'test-build': return ['acknowledge','open-approved-test','run-checks','collect-results','report-only-no-activation'];
      case 'report': return ['collect-status','report'];
      default: return ['acknowledge','travel-'+target,'perform-'+job.type,'report'];
    }
  }

  function begin(job){
    if(!job||!job.id||!job.assignedRobot) return {ok:false,error:'ASSIGNED_JOB_REQUIRED'};
    if(job.simulation!==true) return {ok:false,error:'SIMULATION_ONLY'};
    if(active.has(job.id)) return {ok:false,error:'ALREADY_ACTIVE'};
    const sim={jobId:job.id,robotId:job.assignedRobot,type:job.type,target:job.target||null,steps:makeSteps(job),index:0,state:'running',startedAt:Date.now(),updatedAt:Date.now()};
    active.set(job.id,sim); emit('robot-sim:started',clone(sim)); return {ok:true,simulation:clone(sim)};
  }

  function step(jobId){
    const sim=active.get(String(jobId)); if(!sim) return {ok:false,error:'UNKNOWN_SIMULATION'};
    if(sim.state!=='running') return {ok:false,error:'SIMULATION_NOT_RUNNING',state:sim.state};
    const current=sim.steps[sim.index];
    sim.updatedAt=Date.now();
    if(current&&current.startsWith('travel-')&&fleet&&typeof fleet.updateTelemetry==='function'){
      const location=current.slice('travel-'.length)||sim.target||'en-route';
      fleet.updateTelemetry(sim.robotId,{connected:true,location:location,localSafety:true});
    }
    if(current==='arrive-dock'&&fleet&&typeof fleet.updateTelemetry==='function'){
      fleet.updateTelemetry(sim.robotId,{connected:true,docked:true,charging:false,location:'dock',localSafety:true});
    }
    emit('robot-sim:step',{jobId:sim.jobId,robotId:sim.robotId,step:current,index:sim.index});
    sim.index++;
    if(sim.index>=sim.steps.length){ sim.state='complete'; sim.finishedAt=Date.now(); emit('robot-sim:complete',clone(sim)); }
    return {ok:true,step:current,done:sim.state==='complete',simulation:clone(sim)};
  }

  function runToEnd(jobId,maxSteps){
    maxSteps=Math.max(1,Math.min(100,Number(maxSteps)||25));
    const events=[];
    for(let i=0;i<maxSteps;i++){
      const r=step(jobId); events.push(r); if(!r.ok||r.done) break;
    }
    const sim=active.get(String(jobId));
    return {ok:!!sim&&sim.state==='complete',events,simulation:sim?clone(sim):null};
  }

  function finishIntoJobCore(jobId,result,context){
    const sim=active.get(String(jobId)); if(!sim) return {ok:false,error:'UNKNOWN_SIMULATION'};
    if(sim.state!=='complete') return {ok:false,error:'SIMULATION_NOT_COMPLETE'};
    if(!jobs||typeof jobs.finish!=='function') return {ok:false,error:'JOB_CORE_UNAVAILABLE'};
    const out=jobs.finish(jobId,result||{ok:true,simulation:true,steps:sim.steps.length},Object.assign({actor:'skie'},context||{}));
    if(out.ok) active.delete(String(jobId));
    return out;
  }

  function get(jobId){ const s=active.get(String(jobId)); return s?clone(s):null; }
  function status(){ return {active:Array.from(active.values()).map(clone),count:active.size,routesConfigured:Object.keys(routes).length}; }
  return {begin,step,runToEnd,finishIntoJobCore,get,status};
}
root.OSKORobotSimulation={create};
})(typeof window!=='undefined'?window:globalThis);
