/* OSKO Living OS - Phone Upgrade Orchestrator v1
   Coordinates staged phone upgrades without overwriting protected releases or user data.
   Requires verification, phone confirmation, owner approval, and rollback-safe data checkpointing.
*/
(function(root){
'use strict';
function create(opts){
  opts=opts||{};
  const install=opts.installProfile||null;
  const data=opts.dataContinuity||null;
  const androidHost=opts.androidHost||null;
  const eventBus=opts.eventBus||null;
  const state={phase:'idle',candidate:null,checkpointId:null,targetSchema:null,lastError:null,lastResult:null};
  function emit(type,payload){if(eventBus&&typeof eventBus.emit==='function'){try{eventBus.emit(type,payload);}catch(_e){}}}
  function clone(v){return v==null?v:JSON.parse(JSON.stringify(v));}
  function setPhase(phase,detail){state.phase=phase;emit('phone-upgrade:phase',{phase,detail:clone(detail||null)});}
  function reject(error,detail){const e=String(error||'UPGRADE_BLOCKED');state.lastError=e;emit('phone-upgrade:blocked',{error:e,detail:clone(detail||null),phase:state.phase});return {ok:false,error:e,detail:clone(detail||null),status:status()};}
  function fail(error,detail){state.lastError=String(error||'UPGRADE_FAILED');state.lastResult=clone(detail||null);setPhase('failed',{error:state.lastError});return {ok:false,error:state.lastError,detail:clone(detail||null),status:status()};}
  function begin(spec){
    spec=spec||{};
    if(state.phase!=='idle'&&state.phase!=='complete'&&state.phase!=='rolled-back'&&state.phase!=='failed') return reject('UPGRADE_ALREADY_ACTIVE');
    if(!install||typeof install.stageCandidate!=='function') return fail('INSTALL_PROFILE_UNAVAILABLE');
    if(!data||typeof data.checkpoint!=='function') return fail('DATA_CONTINUITY_UNAVAILABLE');
    const releaseId=String(spec.releaseId||'').trim();if(!releaseId)return reject('RELEASE_REQUIRED');
    const cp=data.checkpoint({reason:'pre-upgrade',releaseId});if(!cp.ok)return fail(cp.error,cp);
    const staged=install.stageCandidate(releaseId);if(!staged.ok)return fail(staged.error,staged);
    state.candidate=releaseId;state.checkpointId=cp.id;state.targetSchema=spec.targetSchema==null?null:Math.max(1,Number(spec.targetSchema)||1);state.lastError=null;state.lastResult=null;
    if(androidHost&&typeof androidHost.beginUpdate==='function') androidHost.beginUpdate({releaseId});
    setPhase('staged',{releaseId,checkpointId:cp.id,targetSchema:state.targetSchema});
    return {ok:true,status:status()};
  }
  function prepareData(context){
    if(state.phase!=='staged') return reject('UPGRADE_NOT_STAGED');
    if(state.targetSchema==null){setPhase('data-ready',{migration:false});return {ok:true,migration:false,status:status()};}
    const p=data.preview(state.targetSchema,context||{});if(!p.ok)return fail(p.error||'DATA_MIGRATION_PREVIEW_FAILED',p);
    setPhase('data-ready',{migration:p.changed,from:p.from,to:p.to});return {ok:true,preview:p,status:status()};
  }
  function markVerified(meta){
    if(state.phase!=='staged'&&state.phase!=='data-ready') return reject('UPGRADE_NOT_READY_FOR_VERIFICATION');
    if(androidHost&&typeof androidHost.markUpdateVerified==='function'){const h=androidHost.markUpdateVerified(meta||{});if(h&&h.ok===false)return fail(h.error,h);}
    setPhase('verified',meta||{});return {ok:true,status:status()};
  }
  function activate(context){
    context=context||{};
    if(state.phase!=='verified') return reject('UPGRADE_NOT_VERIFIED');
    if(context.phoneConfirmed!==true) return reject('PHONE_CONFIRMATION_REQUIRED');
    if(context.ownerApproved!==true) return reject('OWNER_APPROVAL_REQUIRED');
    if(state.targetSchema!=null){const a=data.applyPreview({ownerApproved:true});if(!a.ok)return fail(a.error,a);}
    const out=install.activateCandidate({verified:true,phoneConfirmed:true,ownerApproved:true});if(!out.ok)return fail(out.error,out);
    if(androidHost&&typeof androidHost.markUpdateActivated==='function'){const h=androidHost.markUpdateActivated({releaseId:state.candidate});if(h&&h.ok===false)return fail(h.error,h);}
    setPhase('active',{releaseId:state.candidate});return {ok:true,release:state.candidate,status:status()};
  }
  function complete(meta){
    if(state.phase!=='active') return reject('UPGRADE_NOT_ACTIVE');
    if(androidHost&&typeof androidHost.completeUpdate==='function'){const h=androidHost.completeUpdate(meta||{});if(h&&h.ok===false)return fail(h.error,h);}
    state.lastResult={releaseId:state.candidate,completedAt:Date.now()};setPhase('complete',state.lastResult);return {ok:true,status:status()};
  }
  function rollback(reason,context){
    context=context||{};
    const installOut=install&&typeof install.rollback==='function'?install.rollback(reason||'UPGRADE_ROLLBACK'):{ok:false,error:'INSTALL_ROLLBACK_UNAVAILABLE'};
    const dataOut=state.checkpointId&&data&&typeof data.restore==='function'?data.restore(state.checkpointId,{recoveryAuthorized:true,ownerApproved:context.ownerApproved===true}):{ok:false,error:'DATA_RESTORE_UNAVAILABLE'};
    if(androidHost&&typeof androidHost.failUpdate==='function') androidHost.failUpdate(reason||'UPGRADE_ROLLBACK');
    if(androidHost&&typeof androidHost.rollbackComplete==='function') androidHost.rollbackComplete({reason:reason||null});
    state.lastError=String(reason||'UPGRADE_ROLLBACK');state.lastResult={install:clone(installOut),data:clone(dataOut)};setPhase('rolled-back',state.lastResult);
    return {ok:!!(installOut&&installOut.ok)&&!!(dataOut&&dataOut.ok),install:installOut,data:dataOut,status:status()};
  }
  function status(){return Object.assign({},clone(state),{install:install&&typeof install.status==='function'?install.status():null,data:data&&typeof data.status==='function'?data.status():null,host:androidHost&&typeof androidHost.status==='function'?androidHost.status():null});}
  return {begin,prepareData,markVerified,activate,complete,rollback,status};
}
root.OSKOPhoneUpgradeOrchestrator={create};
})(typeof window!=='undefined'?window:globalThis);
