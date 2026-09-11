/* OSKO Living OS - Phone Audio Contract v1
   Logical Android audio/STT/TTS boundary for the installed-phone stage.
   This file does not request Android permissions or access microphone hardware itself.
*/
(function(root){
'use strict';
function create(opts){
  opts=opts||{};
  const eventBus=opts.eventBus||null;
  const onTranscript=typeof opts.onTranscript==='function'?opts.onTranscript:null;
  const onSpeechComplete=typeof opts.onSpeechComplete==='function'?opts.onSpeechComplete:null;
  const state={connected:false,micPermission:'unknown',sttAvailable:false,ttsAvailable:false,listening:false,speaking:false,lastTranscript:null,lastSpeech:null,lastError:null};
  function emit(type,payload){if(eventBus&&typeof eventBus.emit==='function'){try{eventBus.emit(type,payload);}catch(_e){}}}
  function clone(v){return v==null?v:JSON.parse(JSON.stringify(v));}
  function connect(info){info=info||{};state.connected=true;state.micPermission=String(info.micPermission||state.micPermission);state.sttAvailable=info.sttAvailable!==false;state.ttsAvailable=info.ttsAvailable!==false;state.lastError=null;emit('phone-audio:connected',status());return {ok:true,status:status()};}
  function disconnect(reason){state.connected=false;state.listening=false;state.speaking=false;state.lastError=reason?String(reason):null;emit('phone-audio:disconnected',{reason:state.lastError});return status();}
  function setMicPermission(value){state.micPermission=['granted','denied','unknown'].includes(String(value))?String(value):'unknown';emit('phone-audio:permission',{micPermission:state.micPermission});return status();}
  function startListening(){if(!state.connected)return {ok:false,error:'AUDIO_HOST_OFFLINE'};if(state.micPermission!=='granted')return {ok:false,error:'MIC_PERMISSION_REQUIRED'};if(!state.sttAvailable)return {ok:false,error:'STT_UNAVAILABLE'};state.listening=true;emit('phone-audio:listening',{listening:true});return {ok:true,status:status()};}
  function stopListening(){state.listening=false;emit('phone-audio:listening',{listening:false});return {ok:true,status:status()};}
  function pushTranscript(text,meta){const value=String(text||'').trim();if(!state.connected)return {ok:false,error:'AUDIO_HOST_OFFLINE'};if(!value)return {ok:false,error:'EMPTY_TRANSCRIPT'};state.lastTranscript={time:Date.now(),text:value,meta:clone(meta||{})};emit('phone-audio:transcript',clone(state.lastTranscript));if(onTranscript){try{return {ok:true,transcript:clone(state.lastTranscript),result:onTranscript(value,meta||{})};}catch(err){state.lastError=String(err&&err.message||err);return {ok:false,error:state.lastError};}}return {ok:true,transcript:clone(state.lastTranscript)};}
  function speak(text,options){const value=String(text||'').trim();if(!state.connected)return {ok:false,error:'AUDIO_HOST_OFFLINE'};if(!state.ttsAvailable)return {ok:false,error:'TTS_UNAVAILABLE'};if(!value)return {ok:false,error:'EMPTY_SPEECH'};state.speaking=true;state.lastSpeech={time:Date.now(),text:value,responseId:options&&options.responseId||null};emit('phone-audio:speaking',clone(state.lastSpeech));return {ok:true,responseId:state.lastSpeech.responseId};}
  function completeSpeech(responseId){if(!state.speaking)return {ok:false,error:'NOT_SPEAKING'};const last=state.lastSpeech;if(responseId&&last&&last.responseId&&String(responseId)!==String(last.responseId))return {ok:false,error:'RESPONSE_MISMATCH'};state.speaking=false;emit('phone-audio:speech-complete',clone(last));if(onSpeechComplete){try{onSpeechComplete(last);}catch(_e){}}return {ok:true,speech:clone(last)};}
  function stop(){const was=state.speaking;state.speaking=false;emit('phone-audio:speech-stopped',{wasSpeaking:was});return {ok:true,stopped:was};}
  function status(){return clone(state);}
  return {connect,disconnect,setMicPermission,startListening,stopListening,pushTranscript,speak,completeSpeech,stop,status};
}
root.OSKOPhoneAudioContract={create};
})(typeof window!=='undefined'?window:globalThis);
