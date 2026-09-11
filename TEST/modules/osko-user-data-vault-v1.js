/* OSKO Living OS - User Data Vault v1
   Keeps user-owned state separate from visual releases and code versions.
   Provides namespaced data, snapshots, schema metadata, export/import and protected keys.
*/
(function(root){
'use strict';
function create(opts){
  opts=opts||{};
  const eventBus=opts.eventBus||null;
  const storageKey=opts.storageKey||'osko.livingos.userdata.v1';
  const schemaVersion=Number(opts.schemaVersion||1);
  const protectedKeys=new Set((opts.protectedKeys||['identity.owner','release.protected','security.permissions']).map(String));
  const memory={schemaVersion,data:{},savedAt:null};

  function emit(type,payload){ if(eventBus&&typeof eventBus.emit==='function'){ try{eventBus.emit(type,payload);}catch(_e){} } }
  function clone(v){ return JSON.parse(JSON.stringify(v)); }
  function canStore(){ try{ if(!root.localStorage)return false; const k=storageKey+'.test'; root.localStorage.setItem(k,'1'); root.localStorage.removeItem(k); return true; }catch(_e){return false;} }
  const persistent=canStore();
  function loadEnvelope(){
    if(!persistent) return clone(memory);
    try{ const raw=root.localStorage.getItem(storageKey); if(!raw)return {schemaVersion,data:{},savedAt:null}; const p=JSON.parse(raw); return {schemaVersion:Number(p.schemaVersion||1),data:p.data&&typeof p.data==='object'?p.data:{},savedAt:p.savedAt||null}; }
    catch(_e){ return {schemaVersion,data:{},savedAt:null}; }
  }
  function saveEnvelope(env){ env.savedAt=Date.now(); if(persistent)root.localStorage.setItem(storageKey,JSON.stringify(env)); else Object.assign(memory,clone(env)); emit('vault:saved',{savedAt:env.savedAt,schemaVersion:env.schemaVersion}); }
  function fullKey(namespace,key){ return String(namespace||'general').trim()+'.'+String(key||'').trim(); }
  function get(namespace,key,fallback){ const env=loadEnvelope(),fk=fullKey(namespace,key); return Object.prototype.hasOwnProperty.call(env.data,fk)?clone(env.data[fk]):fallback; }
  function set(namespace,key,value,context){
    context=context||{}; const env=loadEnvelope(),fk=fullKey(namespace,key);
    if(protectedKeys.has(fk)&&context.allowProtected!==true) return {ok:false,error:'PROTECTED_KEY',key:fk};
    env.data[fk]=clone(value); env.schemaVersion=schemaVersion; saveEnvelope(env); emit('vault:changed',{key:fk}); return {ok:true,key:fk,value:clone(value)};
  }
  function remove(namespace,key,context){
    context=context||{}; const env=loadEnvelope(),fk=fullKey(namespace,key);
    if(protectedKeys.has(fk)&&context.allowProtected!==true) return {ok:false,error:'PROTECTED_KEY',key:fk};
    const existed=Object.prototype.hasOwnProperty.call(env.data,fk); if(existed)delete env.data[fk]; saveEnvelope(env); emit('vault:removed',{key:fk,existed}); return {ok:true,key:fk,existed};
  }
  function list(namespace){ const env=loadEnvelope(),prefix=namespace?String(namespace).trim()+'.':null; const out={}; Object.keys(env.data).sort().forEach(k=>{ if(!prefix||k.startsWith(prefix))out[k]=clone(env.data[k]); }); return out; }
  function snapshot(){ const env=loadEnvelope(); return {schemaVersion:env.schemaVersion,savedAt:env.savedAt,data:clone(env.data),persistent}; }
  function exportSnapshot(){ return JSON.stringify(snapshot()); }
  function importSnapshot(text,context){
    context=context||{}; const p=JSON.parse(String(text||'')); if(!p||!p.data||typeof p.data!=='object')throw new Error('Invalid OSKO user data snapshot');
    const incoming=clone(p.data); if(context.allowProtected!==true){ for(const k of protectedKeys){ if(Object.prototype.hasOwnProperty.call(incoming,k))delete incoming[k]; } }
    const env={schemaVersion:Number(p.schemaVersion||schemaVersion),data:incoming,savedAt:Date.now()}; saveEnvelope(env); emit('vault:imported',{schemaVersion:env.schemaVersion,keyCount:Object.keys(env.data).length}); return snapshot();
  }
  function mergeSnapshot(obj,context){
    context=context||{}; const env=loadEnvelope(),incoming=obj&&obj.data&&typeof obj.data==='object'?obj.data:{};
    Object.keys(incoming).forEach(k=>{ if(protectedKeys.has(k)&&context.allowProtected!==true)return; env.data[k]=clone(incoming[k]); });
    env.schemaVersion=Math.max(Number(env.schemaVersion||1),Number(obj&&obj.schemaVersion||schemaVersion)); saveEnvelope(env); emit('vault:merged',{keyCount:Object.keys(incoming).length}); return snapshot();
  }
  function protectKey(namespace,key){ protectedKeys.add(fullKey(namespace,key)); return Array.from(protectedKeys).sort(); }
  function status(){ const env=loadEnvelope(); return {persistent,schemaVersion:env.schemaVersion,keyCount:Object.keys(env.data).length,savedAt:env.savedAt,protectedKeys:Array.from(protectedKeys).sort()}; }
  return {get,set,remove,list,snapshot,exportSnapshot,importSnapshot,mergeSnapshot,protectKey,status};
}
root.OSKOUserDataVault={create};
})(typeof window!=='undefined'?window:globalThis);
