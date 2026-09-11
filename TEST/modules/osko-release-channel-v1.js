/* OSKO Living OS - Release Channel Core v1
   Keeps stable, test and development releases separated so protected versions are not overwritten.
*/
(function(root){
'use strict';
function create(opts){
  opts=opts||{};
  const eventBus=opts.eventBus||null;
  const channels={stable:null,test:null,development:null};
  const releases=new Map();
  const protectedVersions=new Set((opts.protectedVersions||['V11','FIX8']).map(String));

  function emit(type,payload){ if(eventBus&&typeof eventBus.emit==='function'){try{eventBus.emit(type,payload);}catch(_e){}} }
  function copy(r){ if(!r)return null; return {version:r.version,channel:r.channel,status:r.status,createdAt:r.createdAt,verifiedAt:r.verifiedAt||null,phoneConfirmed:!!r.phoneConfirmed,protected:protectedVersions.has(r.version),meta:Object.assign({},r.meta||{})}; }
  function register(def){
    if(!def||!def.version) throw new Error('release version required');
    const version=String(def.version);
    const channel=String(def.channel||'development').toLowerCase();
    if(!(channel in channels)) throw new Error('invalid release channel');
    const old=releases.get(version);
    if(old&&protectedVersions.has(version)) return {ok:false,error:'PROTECTED_RELEASE_IMMUTABLE',release:copy(old)};
    const r={version,channel,status:def.status||'registered',createdAt:old&&old.createdAt||Date.now(),verifiedAt:def.verifiedAt||null,phoneConfirmed:!!def.phoneConfirmed,meta:Object.assign({},old&&old.meta||{},def.meta||{})};
    releases.set(version,r); emit('release:registered',copy(r)); return {ok:true,release:copy(r)};
  }
  function markVerified(version,result){ const r=releases.get(String(version)); if(!r)return {ok:false,error:'UNKNOWN_RELEASE'}; r.status=result===false?'failed':'verified'; r.verifiedAt=Date.now(); emit('release:verified',copy(r)); return {ok:r.status==='verified',release:copy(r)}; }
  function confirmPhone(version){ const r=releases.get(String(version)); if(!r)return {ok:false,error:'UNKNOWN_RELEASE'}; r.phoneConfirmed=true; emit('release:phone-confirmed',copy(r)); return {ok:true,release:copy(r)}; }
  function promote(version,target){
    const r=releases.get(String(version)); if(!r)return {ok:false,error:'UNKNOWN_RELEASE'};
    target=String(target||'test').toLowerCase(); if(!(target in channels))return {ok:false,error:'INVALID_CHANNEL'};
    if(target==='stable'&&(r.status!=='verified'||!r.phoneConfirmed)) return {ok:false,error:'STABLE_REQUIRES_VERIFIED_AND_PHONE_CONFIRMED',release:copy(r)};
    r.channel=target; channels[target]=r.version; if(target==='stable')r.status='stable'; emit('release:promoted',{version:r.version,target}); return {ok:true,release:copy(r),channels:Object.assign({},channels)};
  }
  function protect(version){ protectedVersions.add(String(version)); return status(); }
  function current(channel){ channel=String(channel||'stable').toLowerCase(); return releases.has(channels[channel])?copy(releases.get(channels[channel])):null; }
  function list(){ return Array.from(releases.values()).map(copy).sort(function(a,b){return a.createdAt-b.createdAt;}); }
  function status(){ return {channels:Object.assign({},channels),protectedVersions:Array.from(protectedVersions),releases:list()}; }
  return {register,markVerified,confirmPhone,promote,protect,current,list,status};
}
root.OSKOReleaseChannel={create};
})(typeof window!=='undefined'?window:globalThis);
