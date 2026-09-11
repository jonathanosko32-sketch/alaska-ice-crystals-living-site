/* OSKO Living OS - Update Core v1
   Safe staged release/rollback logic for the Living OS layer.
   Does not install Android packages or modify protected master builds.
*/
(function(root){
'use strict';

function create(opts){
  opts=opts||{};
  const eventBus=opts.eventBus||null;
  const verify=typeof opts.verify==='function'?opts.verify:null;
  const protectedVersions=new Set((opts.protectedVersions||['V11','FIX8']).map(String));
  const releases=new Map();
  let activeVersion=opts.activeVersion?String(opts.activeVersion):null;
  let previousVersion=null;
  let stagedVersion=null;

  function emit(type,payload){
    if(eventBus&&typeof eventBus.emit==='function'){
      try{eventBus.emit(type,payload);}catch(_e){}
    }
  }

  function registerRelease(def){
    if(!def||!def.version) throw new Error('release version required');
    const version=String(def.version);
    const current=releases.get(version)||{};
    const record=Object.assign({},current,def,{version,registeredAt:current.registeredAt||Date.now()});
    releases.set(version,record);
    emit('update:release-registered',{version});
    return snapshotRelease(version);
  }

  function snapshotRelease(version){
    const r=releases.get(String(version));
    if(!r) return null;
    const copy=Object.assign({},r);
    delete copy.apply;
    delete copy.rollback;
    delete copy.verify;
    return copy;
  }

  function stage(version){
    version=String(version);
    if(!releases.has(version)) return {ok:false,error:'UNKNOWN_RELEASE',version};
    if(version===activeVersion) return {ok:false,error:'ALREADY_ACTIVE',version};
    stagedVersion=version;
    emit('update:staged',{version,activeVersion});
    return {ok:true,version,activeVersion};
  }

  async function runVerification(version,context){
    const r=releases.get(version);
    if(!r) return {ok:false,error:'UNKNOWN_RELEASE',version};
    const checks=[];
    if(typeof r.verify==='function'){
      try{
        const result=await r.verify(context||{});
        checks.push({source:'release',ok:!(result&&result.ok===false)&&result!==false,result});
      }catch(err){checks.push({source:'release',ok:false,error:String(err&&err.message||err)});}
    }
    if(verify){
      try{
        const result=await verify(r,context||{});
        checks.push({source:'global',ok:!(result&&result.ok===false)&&result!==false,result});
      }catch(err){checks.push({source:'global',ok:false,error:String(err&&err.message||err)});}
    }
    if(checks.length===0) checks.push({source:'default',ok:false,error:'NO_VERIFICATION_CONFIGURED'});
    return {ok:checks.every(x=>x.ok),version,checks};
  }

  async function activateStaged(context){
    if(!stagedVersion) return {ok:false,error:'NOTHING_STAGED'};
    const version=stagedVersion;
    const r=releases.get(version);
    const verification=await runVerification(version,context);
    if(!verification.ok){
      emit('update:verification-failed',{version,verification});
      return {ok:false,error:'VERIFICATION_FAILED',version,verification};
    }
    try{
      if(typeof r.apply==='function'){
        const applied=await r.apply(context||{});
        if(applied===false||(applied&&applied.ok===false)){
          emit('update:apply-failed',{version,result:applied});
          return {ok:false,error:'APPLY_FAILED',version,result:applied};
        }
      }
      previousVersion=activeVersion;
      activeVersion=version;
      stagedVersion=null;
      emit('update:activated',{version,previousVersion});
      return {ok:true,version,previousVersion,verification};
    }catch(err){
      emit('update:apply-failed',{version,error:String(err&&err.message||err)});
      return {ok:false,error:'APPLY_EXCEPTION',version,message:String(err&&err.message||err)};
    }
  }

  async function rollback(context){
    if(!previousVersion) return {ok:false,error:'NO_ROLLBACK_VERSION'};
    const target=previousVersion;
    const current=activeVersion;
    const currentRelease=releases.get(current);
    try{
      if(currentRelease&&typeof currentRelease.rollback==='function'){
        const result=await currentRelease.rollback({target,current,context:context||{}});
        if(result===false||(result&&result.ok===false)) return {ok:false,error:'ROLLBACK_HANDLER_FAILED',target,result};
      }
      activeVersion=target;
      previousVersion=current;
      stagedVersion=null;
      emit('update:rolled-back',{activeVersion,previousVersion});
      return {ok:true,activeVersion,previousVersion};
    }catch(err){
      return {ok:false,error:'ROLLBACK_EXCEPTION',target,message:String(err&&err.message||err)};
    }
  }

  function removeRelease(version){
    version=String(version);
    if(protectedVersions.has(version)) return {ok:false,error:'PROTECTED_VERSION',version};
    if(version===activeVersion||version===previousVersion||version===stagedVersion) return {ok:false,error:'VERSION_IN_USE',version};
    return {ok:releases.delete(version),version};
  }

  function protect(version){protectedVersions.add(String(version));return status();}

  function status(){
    return {
      activeVersion,
      previousVersion,
      stagedVersion,
      protectedVersions:Array.from(protectedVersions),
      releases:Array.from(releases.keys()).sort()
    };
  }

  return {registerRelease,stage,runVerification,activateStaged,rollback,removeRelease,protect,status};
}

root.OSKOUpdateCore={create};
})(typeof window!=='undefined'?window:globalThis);
