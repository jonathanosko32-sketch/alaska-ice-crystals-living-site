/* OSKO Living OS - Phone Install Profile Core v1
   Describes the installed-phone identity, stable/candidate release slots, persistent data boundary,
   launcher intent and recovery target. Does not install APKs or call privileged Android APIs.
*/
(function(root){
'use strict';
function create(opts){
  opts=opts||{};
  const eventBus=opts.eventBus||null;
  const protectedReleases=new Set((opts.protectedReleases||['V11','FIX8']).map(String));
  const state={
    installed:false,
    packageId:String(opts.packageId||'com.osko.alaskaicecrystals.livingos'),
    displayName:String(opts.displayName||'OSKO Living OS'),
    launcherMode:opts.launcherMode!==false,
    stableRelease:String(opts.stableRelease||'V11'),
    candidateRelease:null,
    previousRelease:null,
    dataSchema:Number(opts.dataSchema)||1,
    dataBoundary:'persistent-user-data-separate-from-release-code',
    recoveryRelease:String(opts.recoveryRelease||'FIX8'),
    installedAt:null,
    updatedAt:null,
    lastError:null
  };
  function emit(type,payload){if(eventBus&&typeof eventBus.emit==='function'){try{eventBus.emit(type,payload);}catch(_e){}}}
  function clone(v){return JSON.parse(JSON.stringify(v));}
  function status(){return Object.assign({},clone(state),{protectedReleases:Array.from(protectedReleases)});}
  function install(meta){
    meta=meta||{};
    state.installed=true;
    state.installedAt=state.installedAt||Date.now();
    state.updatedAt=Date.now();
    if(meta.stableRelease) state.stableRelease=String(meta.stableRelease);
    if(meta.dataSchema!=null) state.dataSchema=Math.max(1,Number(meta.dataSchema)||state.dataSchema);
    emit('phone-install:installed',status());
    return {ok:true,status:status()};
  }
  function stageCandidate(releaseId){
    if(!state.installed) return {ok:false,error:'NOT_INSTALLED'};
    const id=String(releaseId||'').trim(); if(!id) return {ok:false,error:'RELEASE_REQUIRED'};
    if(id===state.stableRelease) return {ok:false,error:'ALREADY_STABLE'};
    state.candidateRelease=id; state.lastError=null; emit('phone-install:candidate-staged',{releaseId:id});
    return {ok:true,status:status()};
  }
  function activateCandidate(context){
    context=context||{};
    if(!state.candidateRelease) return {ok:false,error:'NO_CANDIDATE'};
    if(context.verified!==true) return {ok:false,error:'VERIFICATION_REQUIRED'};
    if(context.phoneConfirmed!==true) return {ok:false,error:'PHONE_CONFIRMATION_REQUIRED'};
    if(context.ownerApproved!==true) return {ok:false,error:'OWNER_APPROVAL_REQUIRED'};
    state.previousRelease=state.stableRelease;
    state.stableRelease=state.candidateRelease;
    state.candidateRelease=null;
    state.updatedAt=Date.now();
    emit('phone-install:activated',{stableRelease:state.stableRelease,previousRelease:state.previousRelease});
    return {ok:true,status:status()};
  }
  function rollback(reason){
    const target=state.previousRelease||state.recoveryRelease;
    if(!target) return {ok:false,error:'NO_ROLLBACK_TARGET'};
    const failed=state.stableRelease;
    state.stableRelease=target;
    state.candidateRelease=null;
    state.previousRelease=null;
    state.lastError=String(reason||'ROLLBACK');
    state.updatedAt=Date.now();
    emit('phone-install:rollback',{from:failed,to:target,reason:state.lastError});
    return {ok:true,status:status()};
  }
  function protect(releaseId){const id=String(releaseId||'').trim();if(!id)return false;protectedReleases.add(id);emit('phone-install:protected',{releaseId:id});return true;}
  function unprotect(releaseId,context){
    const id=String(releaseId||'').trim();
    if(context&&context.ownerApproved===true&&context.userConfirmed===true){protectedReleases.delete(id);emit('phone-install:unprotected',{releaseId:id});return true;}
    return false;
  }
  function canRemove(releaseId){return !protectedReleases.has(String(releaseId));}
  return {install,stageCandidate,activateCandidate,rollback,protect,unprotect,canRemove,status};
}
root.OSKOPhoneInstallProfile={create};
})(typeof window!=='undefined'?window:globalThis);
