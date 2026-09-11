/* OSKO Living OS - Robot Job Core v1
   SKIE-owned job queue and simulator-first assignment for robot work bodies.
   Never directly actuates motors or promotes protected OS releases.
*/
(function(root){
'use strict';
function create(opts){
  opts=opts||{};
  const fleet=opts.fleet||null;
  const eventBus=opts.eventBus||null;
  const permission=opts.permission||null;
  const jobs=new Map();
  const queue=[];
  let seq=0;

  function emit(type,payload){ if(eventBus&&typeof eventBus.emit==='function'){ try{eventBus.emit(type,payload);}catch(_e){} } }
  function clone(v){ return JSON.parse(JSON.stringify(v)); }
  function id(){ seq++; return 'job-'+Date.now().toString(36)+'-'+seq.toString(36); }
  function risky(type){ return ['release-promote','protected-modify','safety-disable','physical-actuation'].includes(String(type)); }

  function submit(spec,context){
    spec=spec||{};
    const actor=(context&&context.actor)||'skie';
    const type=String(spec.type||'generic');
    if(risky(type)) return {ok:false,error:'PROTECTED_JOB_TYPE',type};
    if(permission&&typeof permission.check==='function'){
      const decision=permission.check({actor,action:'robot.job.submit',resource:type},context||{});
      if(decision&&decision.allowed===false) return {ok:false,error:'PERMISSION_DENIED',decision};
    }
    const job={
      id:id(),
      type,
      title:String(spec.title||type),
      requestedBy:actor,
      target:spec.target?String(spec.target):null,
      requiredCapability:spec.requiredCapability?String(spec.requiredCapability):null,
      priority:Math.max(0,Math.min(100,Number(spec.priority)||50)),
      payload:clone(spec.payload||{}),
      simulation:spec.simulation!==false,
      state:'queued',
      assignedRobot:null,
      createdAt:Date.now(),
      startedAt:null,
      finishedAt:null,
      result:null
    };
    if(job.simulation!==true) return {ok:false,error:'SIMULATION_REQUIRED_FIRST',job};
    jobs.set(job.id,job); queue.push(job.id); sortQueue(); emit('robot-job:queued',clone(job)); return {ok:true,job:clone(job)};
  }

  function sortQueue(){ queue.sort(function(a,b){ return jobs.get(b).priority-jobs.get(a).priority || jobs.get(a).createdAt-jobs.get(b).createdAt; }); }

  function pickRobot(job){
    if(!fleet||typeof fleet.ready!=='function') return null;
    const candidates=fleet.ready(job.requiredCapability||null);
    return candidates.length?candidates[0]:null;
  }

  function dispatchNext(){
    if(!queue.length) return {ok:false,error:'QUEUE_EMPTY'};
    for(let i=0;i<queue.length;i++){
      const job=jobs.get(queue[i]); if(!job||job.state!=='queued') continue;
      const robot=pickRobot(job); if(!robot) continue;
      const assigned=fleet.assignJob(robot.id,job);
      if(!assigned.ok) continue;
      queue.splice(i,1);
      job.state='running'; job.assignedRobot=robot.id; job.startedAt=Date.now();
      emit('robot-job:started',clone(job));
      return {ok:true,job:clone(job),robot:assigned.robot};
    }
    return {ok:false,error:'NO_READY_ROBOT'};
  }

  function finish(jobId,result){
    const job=jobs.get(String(jobId)); if(!job) return {ok:false,error:'UNKNOWN_JOB'};
    if(job.state!=='running') return {ok:false,error:'JOB_NOT_RUNNING',state:job.state};
    job.state=(result&&result.ok===false)?'failed':'complete';
    job.finishedAt=Date.now(); job.result=clone(result||{ok:true});
    if(fleet&&job.assignedRobot&&typeof fleet.completeJob==='function') fleet.completeJob(job.assignedRobot,job.result);
    emit('robot-job:finished',clone(job));
    return {ok:true,job:clone(job)};
  }

  function cancel(jobId,reason){
    const job=jobs.get(String(jobId)); if(!job) return {ok:false,error:'UNKNOWN_JOB'};
    if(job.state==='complete'||job.state==='failed') return {ok:false,error:'JOB_ALREADY_FINISHED'};
    const qi=queue.indexOf(job.id); if(qi>=0)queue.splice(qi,1);
    if(job.state==='running'&&fleet&&job.assignedRobot&&typeof fleet.completeJob==='function') fleet.completeJob(job.assignedRobot,{ok:false,cancelled:true,reason:reason||null});
    job.state='cancelled'; job.finishedAt=Date.now(); job.result={ok:false,cancelled:true,reason:reason||null};
    emit('robot-job:cancelled',clone(job)); return {ok:true,job:clone(job)};
  }

  function get(jobId){ const j=jobs.get(String(jobId)); return j?clone(j):null; }
  function list(filter){ filter=filter||{}; return Array.from(jobs.values()).filter(j=>!filter.state||j.state===filter.state).map(clone); }
  function status(){ return {queued:queue.length,running:list({state:'running'}).length,complete:list({state:'complete'}).length,failed:list({state:'failed'}).length,total:jobs.size}; }

  return {submit,dispatchNext,finish,cancel,get,list,status};
}
root.OSKORobotJobs={create};
})(typeof window!=='undefined'?window:globalThis);
