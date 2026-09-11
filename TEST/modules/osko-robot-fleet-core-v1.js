/* OSKO Living OS - Robot Fleet Core v1
   SKIE-centered coordination model for four robot work bodies.
   This is logical/simulation coordination only. It does NOT drive motors,
   disable local safety controllers, or bypass owner permissions.
*/
(function(root){
'use strict';

function create(opts){
  opts=opts||{};
  const eventBus=opts.eventBus||null;
  const permission=opts.permission||null;
  const maxRobots=Math.max(1,Math.min(16,Number(opts.maxRobots)||4));
  const robots=new Map();
  const history=[];

  function now(){return Date.now();}
  function emit(type,payload){ if(eventBus&&typeof eventBus.emit==='function'){ try{eventBus.emit(type,payload);}catch(_e){} } }
  function clone(v){ return JSON.parse(JSON.stringify(v)); }
  function log(kind,data){ const r=Object.assign({time:now(),kind},data||{}); history.push(r); if(history.length>200)history.shift(); emit('robot:'+kind,r); return r; }
  function validPercent(v){ return v==null?null:Math.max(0,Math.min(100,Number(v)||0)); }

  function register(def){
    if(!def||!def.id) throw new Error('robot id required');
    const id=String(def.id);
    if(!robots.has(id)&&robots.size>=maxRobots) throw new Error('robot fleet limit reached');
    const current=robots.get(id)||{};
    const r=Object.assign({
      id,
      name:def.name||id,
      role:def.role||'worker',
      connected:false,
      docked:false,
      charging:false,
      ready:false,
      battery:null,
      location:'unknown',
      mode:'idle',
      currentJob:null,
      fault:null,
      localSafety:true,
      lastSeen:null,
      capabilities:[],
      metadata:{}
    },current,def);
    r.id=id;
    r.battery=validPercent(r.battery);
    r.capabilities=Array.from(new Set((r.capabilities||[]).map(String)));
    r.metadata=Object.assign({},r.metadata||{});
    robots.set(id,r);
    log('registered',{id,name:r.name});
    return snapshot(id);
  }

  function snapshot(id){
    const r=robots.get(String(id));
    return r?clone(r):null;
  }

  function updateTelemetry(id,telemetry){
    const r=robots.get(String(id)); if(!r) return {ok:false,error:'UNKNOWN_ROBOT',id};
    telemetry=telemetry||{};
    if('connected' in telemetry) r.connected=!!telemetry.connected;
    if('docked' in telemetry) r.docked=!!telemetry.docked;
    if('charging' in telemetry) r.charging=!!telemetry.charging;
    if('battery' in telemetry) r.battery=validPercent(telemetry.battery);
    if('location' in telemetry) r.location=String(telemetry.location||'unknown');
    if('fault' in telemetry) r.fault=telemetry.fault?String(telemetry.fault):null;
    if('localSafety' in telemetry) r.localSafety=telemetry.localSafety!==false;
    r.lastSeen=now();
    r.ready=!!(r.connected&&r.localSafety&&!r.fault&&(r.battery==null||r.battery>5));
    if(r.charging&&!r.docked) r.charging=false;
    log('telemetry',{id:r.id,state:snapshot(r.id)});
    return {ok:true,robot:snapshot(r.id)};
  }

  function can(id,capability){
    const r=robots.get(String(id)); if(!r) return false;
    return r.capabilities.includes(String(capability));
  }

  function setMode(id,mode,context){
    const r=robots.get(String(id)); if(!r) return {ok:false,error:'UNKNOWN_ROBOT'};
    const next=String(mode||'idle');
    if(permission&&typeof permission.check==='function'){
      const decision=permission.check({actor:(context&&context.actor)||'skie',action:'robot.mode.set',resource:r.id,mode:next},context||{});
      if(decision&&decision.allowed===false) return {ok:false,error:'PERMISSION_DENIED',decision};
    }
    if(!r.localSafety) return {ok:false,error:'LOCAL_SAFETY_UNAVAILABLE'};
    r.mode=next;
    log('mode',{id:r.id,mode:next});
    return {ok:true,robot:snapshot(r.id)};
  }

  function assignJob(id,job){
    const r=robots.get(String(id)); if(!r) return {ok:false,error:'UNKNOWN_ROBOT'};
    if(!r.ready) return {ok:false,error:'ROBOT_NOT_READY',robot:snapshot(r.id)};
    if(r.currentJob) return {ok:false,error:'ROBOT_BUSY',job:r.currentJob};
    r.currentJob=clone(job||{});
    r.mode='working';
    log('job-assigned',{id:r.id,job:r.currentJob});
    return {ok:true,robot:snapshot(r.id)};
  }

  function completeJob(id,result){
    const r=robots.get(String(id)); if(!r) return {ok:false,error:'UNKNOWN_ROBOT'};
    const job=r.currentJob;
    r.currentJob=null;
    r.mode=r.docked?'docked':'idle';
    log('job-complete',{id:r.id,job,result:result||null});
    return {ok:true,robot:snapshot(r.id)};
  }

  function list(){ return Array.from(robots.keys()).map(snapshot); }
  function ready(capability){ return list().filter(r=>r.ready&&(!capability||r.capabilities.includes(String(capability)))); }
  function status(){
    const items=list();
    return {
      count:items.length,
      connected:items.filter(r=>r.connected).length,
      ready:items.filter(r=>r.ready).length,
      working:items.filter(r=>!!r.currentJob).length,
      charging:items.filter(r=>r.charging).length,
      robots:items
    };
  }
  function recent(limit){ return history.slice(-(Math.max(1,Number(limit)||30))); }

  ['robot-1','robot-2','robot-3','robot-4'].slice(0,maxRobots).forEach(function(id,index){
    register({id,name:'Robot '+(index+1),capabilities:['move-sim','inspect-sim','dock-sim','report']});
  });

  return {register,snapshot,updateTelemetry,can,setMode,assignJob,completeJob,list,ready,status,recent};
}

root.OSKORobotFleet={create};
})(typeof window!=='undefined'?window:globalThis);
