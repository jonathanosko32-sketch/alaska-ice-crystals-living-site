/* OSKO Living OS - Phone Conversation Session v1
   Coordinates wake/listen/think/speak session state for the installed-phone SKIE experience.
   Does not capture audio or grant control authority; it only coordinates existing safe modules.
*/
(function(root){
'use strict';
function create(opts){
  opts=opts||{};
  const lifecycle=opts.lifecycle||null;
  const audio=opts.audio||null;
  const wake=opts.wakeSession||null;
  const voiceLoop=opts.voiceLoop||null;
  const responses=opts.responses||null;
  const eventBus=opts.eventBus||null;
  const timeoutMs=Math.max(3000,Number(opts.timeoutMs)||12000);
  const state={phase:'idle',startedAt:null,lastActivity:null,lastTranscript:null,lastResult:null,lastError:null,sessionId:null};
  let timer=null,seq=0;
  function emit(type,payload){if(eventBus&&typeof eventBus.emit==='function'){try{eventBus.emit(type,payload);}catch(_e){}}}
  function clone(v){return v==null?v:JSON.parse(JSON.stringify(v));}
  function id(){seq++;return 'skie-session-'+Date.now().toString(36)+'-'+seq.toString(36);}
  function clearTimer(){if(timer){clearTimeout(timer);timer=null;}}
  function armTimeout(){clearTimer();timer=setTimeout(function(){end('timeout');},timeoutMs);}
  function setPhase(p,detail){state.phase=p;state.lastActivity=Date.now();emit('skie-session:phase',{phase:p,sessionId:state.sessionId,detail:clone(detail||null)});}
  function canStart(){return !lifecycle||typeof lifecycle.canAcceptVoice!=='function'||lifecycle.canAcceptVoice();}
  function start(meta){
    if(!canStart())return {ok:false,error:'VOICE_NOT_AVAILABLE'};
    if(state.phase!=='idle'&&state.phase!=='ended')return {ok:false,error:'SESSION_ALREADY_ACTIVE',status:status()};
    state.sessionId=id();state.startedAt=Date.now();state.lastActivity=state.startedAt;state.lastTranscript=null;state.lastResult=null;state.lastError=null;
    if(wake&&typeof wake.arm==='function'){try{wake.arm(meta||{});}catch(_e){}}
    if(audio&&typeof audio.startListening==='function'){const a=audio.startListening();if(a&&a.ok===false){state.lastError=a.error;setPhase('error',a);return {ok:false,error:a.error,status:status()};}}
    setPhase('listening',meta||{});armTimeout();return {ok:true,status:status()};
  }
  function transcript(text,context){
    if(state.phase!=='listening')return {ok:false,error:'SESSION_NOT_LISTENING'};
    const value=String(text||'').trim();if(!value)return {ok:false,error:'EMPTY_TRANSCRIPT'};
    clearTimer();state.lastTranscript=value;
    if(audio&&typeof audio.stopListening==='function'){try{audio.stopListening();}catch(_e){}}
    setPhase('thinking',{text:value});
    if(!voiceLoop||typeof voiceLoop.handleTranscript!=='function')return fail('VOICE_LOOP_UNAVAILABLE');
    let out;try{out=voiceLoop.handleTranscript(value,context||{});}catch(err){return fail(String(err&&err.message||err));}
    state.lastResult=clone(out);state.lastError=out&&out.ok===false?String(out.result&&out.result.error||out.error||'REQUEST_FAILED'):null;
    setPhase('responding',{ok:!!(out&&out.ok)});
    if(responses&&typeof responses.status==='function'){
      const rs=responses.status();
      if(!rs.speaking&&(!rs.queued||rs.queued===0)) return end(state.lastError?'request-failed':'complete');
    }
    armTimeout();return {ok:!!(out&&out.ok),result:out,status:status()};
  }
  function speechComplete(responseId){
    clearTimer();
    if(responses&&typeof responses.complete==='function'){const r=responses.complete(responseId);if(r&&r.ok===false&&r.error!=='NOT_SPEAKING')return r;}
    if(audio&&typeof audio.completeSpeech==='function'){try{audio.completeSpeech(responseId);}catch(_e){}}
    return end(state.lastError?'request-failed':'complete');
  }
  function bargeIn(){
    if(state.phase!=='responding')return {ok:false,error:'NOT_RESPONDING'};
    if(responses&&typeof responses.stop==='function')responses.stop('barge-in');
    if(audio&&typeof audio.stop==='function')audio.stop();
    setPhase('listening',{reason:'barge-in'});
    if(audio&&typeof audio.startListening==='function'){const a=audio.startListening();if(a&&a.ok===false)return fail(a.error);}
    armTimeout();return {ok:true,status:status()};
  }
  function fail(error){state.lastError=String(error||'SESSION_FAILED');setPhase('error',{error:state.lastError});return {ok:false,error:state.lastError,status:status()};}
  function end(reason){
    clearTimer();
    if(audio&&typeof audio.stopListening==='function'){try{audio.stopListening();}catch(_e){}}
    if(wake&&typeof wake.disarm==='function'){try{wake.disarm(reason||'complete');}catch(_e){}}
    setPhase('ended',{reason:reason||'complete'});return {ok:!state.lastError,reason:reason||'complete',status:status()};
  }
  function onLifecycle(){if(!canStart()&&state.phase!=='idle'&&state.phase!=='ended')return end('lifecycle-unavailable');return {ok:true,status:status()};}
  function reset(){clearTimer();state.phase='idle';state.startedAt=null;state.lastActivity=null;state.lastTranscript=null;state.lastResult=null;state.lastError=null;state.sessionId=null;return status();}
  function status(){return clone(state);}
  return {start,transcript,speechComplete,bargeIn,end,onLifecycle,reset,status};
}
root.OSKOPhoneConversationSession={create};
})(typeof window!=='undefined'?window:globalThis);
