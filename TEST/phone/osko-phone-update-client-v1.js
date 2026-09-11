(function(root){
'use strict';
const KEY='osko-phone-update-state-v3';
function clone(v){return JSON.parse(JSON.stringify(v));}
function create(opts){
  opts=opts||{};
  const storage=opts.storage||root.localStorage;
  const now=opts.now||(()=>Date.now());
  const defaults={active:null,previous:null,staged:null,testing:false,lastGood:null,lastError:null,history:[]};
  function load(){try{return Object.assign({},defaults,JSON.parse(storage.getItem(KEY)||'{}'))}catch(_e){return clone(defaults)}}
  let state=load();
  function save(){storage.setItem(KEY,JSON.stringify(state));return status()}
  function record(type,detail){state.history.push({at:now(),type,detail:detail||null});if(state.history.length>40)state.history=state.history.slice(-40)}
  function validateRegistry(reg){
    if(!reg||reg.schema!==2)return {ok:false,error:'REGISTRY_SCHEMA'};
    if(!reg.stable||!reg.stable.id||!reg.stable.url)return {ok:false,error:'STABLE_MISSING'};
    if(reg.stable.protected!==true)return {ok:false,error:'STABLE_NOT_PROTECTED'};
    if(reg.candidate&&reg.candidate.enabled){
      if(!reg.candidate.id||!reg.candidate.url)return {ok:false,error:'CANDIDATE_INVALID'};
      if(reg.candidate.id===reg.stable.id)return {ok:false,error:'CANDIDATE_EQUALS_STABLE'};
    }
    return {ok:true};
  }
  function bootstrap(stable){if(!state.active){state.active=clone(stable);state.lastGood=clone(stable);record('bootstrap',stable.id);save()}return status()}
  function stage(candidate){
    if(!candidate||!candidate.enabled)return {ok:false,error:'CANDIDATE_DISABLED'};
    if(state.active&&candidate.id===state.active.id)return {ok:false,error:'ALREADY_ACTIVE'};
    state.staged=clone(candidate);state.testing=true;state.lastError=null;record('stage',candidate.id);save();return {ok:true,state:status()};
  }
  function confirmAndActivate(){
    if(!state.staged||!state.testing)return {ok:false,error:'NOT_TESTING'};
    state.previous=state.active?clone(state.active):null;
    state.active=clone(state.staged);
    state.active.phoneConfirmed=true;
    state.lastGood=clone(state.active);
    record('activate',state.active.id);
    state.staged=null;state.testing=false;save();return {ok:true,state:status()};
  }
  function reject(reason){
    if(!state.staged)return {ok:false,error:'NOT_STAGED'};
    record('reject',{id:state.staged.id,reason:reason||'owner-rejected'});
    state.lastError=reason||'owner-rejected';state.staged=null;state.testing=false;save();return {ok:true,state:status()};
  }
  function rollback(stable){
    const target=state.previous||state.lastGood||stable;
    if(!target)return {ok:false,error:'NO_ROLLBACK_TARGET'};
    const from=state.active&&state.active.id;
    state.active=clone(target);state.lastGood=clone(target);state.staged=null;state.testing=false;state.lastError='rolled-back';record('rollback',{from,to:target.id});save();return {ok:true,state:status()};
  }
  function useStable(stable){
    if(!stable)return {ok:false,error:'STABLE_MISSING'};
    if(state.active&&state.active.id!==stable.id)state.previous=clone(state.active);
    state.active=clone(stable);state.lastGood=clone(stable);state.staged=null;state.testing=false;record('stable',stable.id);save();return {ok:true,state:status()};
  }
  function reset(){state=clone(defaults);save();return status()}
  function status(){return clone(state)}
  return {validateRegistry,bootstrap,stage,confirmAndActivate,reject,rollback,useStable,status,reset};
}
root.OSKOPhoneUpdateClient={create};
})(typeof window!=='undefined'?window:globalThis);
