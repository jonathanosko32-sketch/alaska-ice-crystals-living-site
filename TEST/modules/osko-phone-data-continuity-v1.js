/* OSKO Living OS - Phone Data Continuity Core v1
   Protects persistent user data across phone upgrades with checkpoint, migration preview,
   owner-approved apply, and rollback restore. Never modifies visual builds or installs APKs.
*/
(function(root){
'use strict';
function create(opts){
  opts=opts||{};
  const vault=opts.vault||null;
  const migration=opts.migration||null;
  const eventBus=opts.eventBus||null;
  const checkpoints=new Map();
  let seq=0;
  let lastPreview=null;
  function emit(type,payload){if(eventBus&&typeof eventBus.emit==='function'){try{eventBus.emit(type,payload);}catch(_e){}}}
  function clone(v){return v==null?v:JSON.parse(JSON.stringify(v));}
  function needVault(){return !!(vault&&typeof vault.snapshot==='function'&&typeof vault.importSnapshot==='function');}
  function makeId(){seq++;return 'data-checkpoint-'+Date.now().toString(36)+'-'+seq.toString(36);}
  function checkpoint(meta){
    if(!needVault()) return {ok:false,error:'VAULT_UNAVAILABLE'};
    const snap=vault.snapshot();
    const id=makeId();
    const row={id,time:Date.now(),meta:clone(meta||{}),snapshot:clone(snap)};
    checkpoints.set(id,row);
    if(checkpoints.size>12){const oldest=Array.from(checkpoints.values()).sort((a,b)=>a.time-b.time)[0];if(oldest)checkpoints.delete(oldest.id);}
    emit('phone-data:checkpoint',{id,time:row.time,schemaVersion:snap.schemaVersion});
    return {ok:true,id,checkpoint:clone(row)};
  }
  function preview(targetSchema,context){
    if(!needVault()) return {ok:false,error:'VAULT_UNAVAILABLE'};
    const snap=vault.snapshot();
    const from=Number(snap.schemaVersion||1),to=Math.max(1,Number(targetSchema)||from);
    if(from===to){lastPreview={ok:true,from,to,changed:false,snapshot:clone(snap),applied:[]};return clone(lastPreview);}
    if(!migration||typeof migration.migrate!=='function') return {ok:false,error:'MIGRATION_UNAVAILABLE',from,to};
    const out=migration.migrate(snap.data,from,to,Object.assign({source:'phone-data-preview'},context||{}));
    if(!out.ok){lastPreview={ok:false,error:out.error||'MIGRATION_FAILED',from,to,detail:clone(out)};emit('phone-data:migration-failed',clone(lastPreview));return clone(lastPreview);}
    lastPreview={ok:true,from,to,changed:true,snapshot:{schemaVersion:to,savedAt:Date.now(),data:clone(out.data)},applied:clone(out.applied||[])};
    emit('phone-data:migration-preview',{from,to,applied:clone(out.applied||[])});
    return clone(lastPreview);
  }
  function applyPreview(context){
    context=context||{};
    if(!lastPreview||lastPreview.ok!==true) return {ok:false,error:'NO_VALID_PREVIEW'};
    if(context.ownerApproved!==true) return {ok:false,error:'OWNER_APPROVAL_REQUIRED'};
    if(!needVault()) return {ok:false,error:'VAULT_UNAVAILABLE'};
    const applied=vault.importSnapshot(JSON.stringify(lastPreview.snapshot),{allowProtected:true});
    emit('phone-data:migration-applied',{schemaVersion:applied.schemaVersion,keyCount:Object.keys(applied.data||{}).length});
    return {ok:true,snapshot:clone(applied),preview:clone(lastPreview)};
  }
  function restore(checkpointId,context){
    context=context||{};
    if(context.ownerApproved!==true&&context.recoveryAuthorized!==true) return {ok:false,error:'RESTORE_APPROVAL_REQUIRED'};
    if(!needVault()) return {ok:false,error:'VAULT_UNAVAILABLE'};
    const row=checkpoints.get(String(checkpointId));
    if(!row) return {ok:false,error:'UNKNOWN_CHECKPOINT'};
    const restored=vault.importSnapshot(JSON.stringify(row.snapshot),{allowProtected:true});
    emit('phone-data:restored',{id:row.id,schemaVersion:restored.schemaVersion});
    return {ok:true,id:row.id,snapshot:clone(restored)};
  }
  function list(){return Array.from(checkpoints.values()).sort((a,b)=>b.time-a.time).map(x=>({id:x.id,time:x.time,meta:clone(x.meta),schemaVersion:x.snapshot.schemaVersion,keyCount:Object.keys(x.snapshot.data||{}).length}));}
  function status(){const current=needVault()?vault.status():null;return {vaultAvailable:needVault(),current,checkpoints:list(),lastPreview:clone(lastPreview)};}
  return {checkpoint,preview,applyPreview,restore,list,status};
}
root.OSKOPhoneDataContinuity={create};
})(typeof window!=='undefined'?window:globalThis);
