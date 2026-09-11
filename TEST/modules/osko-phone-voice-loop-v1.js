/* OSKO Living OS - Phone Voice Loop v1
   Joins recognized phone speech -> Phone Runtime -> SKIE spoken response.
   Does not capture audio itself and does not bypass permissions/safety.
*/
(function(root){
'use strict';
function create(opts){
  opts=opts||{};
  const runtime=opts.phoneRuntime||null;
  const responses=opts.responses||null;
  const audio=opts.audio||null;
  const eventBus=opts.eventBus||null;
  let last=null;
  function emit(type,payload){if(eventBus&&typeof eventBus.emit==='function'){try{eventBus.emit(type,payload);}catch(_e){}}}
  function summarize(result){
    if(!result)return 'I could not complete that request.';
    if(result.ok===false){
      const e=String(result.error||'REQUEST_FAILED').replace(/_/g,' ').toLowerCase();
      return 'I could not do that. '+e+'.';
    }
    const inner=result.result||result;
    if(inner&&inner.intent&&inner.intent.kind==='robot'){
      const robot=inner.intent.robotId?inner.intent.robotId.replace('robot-','Robot '):'Robot';
      const action=inner.intent.action||'job';
      return robot+' '+action+' request accepted.';
    }
    if(inner&&inner.intent&&(inner.intent.type==='navigation'||inner.intent.type==='object-action')) return 'Done.';
    return 'Done.';
  }
  function handleTranscript(text,context){
    if(!runtime||typeof runtime.hear!=='function')return {ok:false,error:'PHONE_RUNTIME_UNAVAILABLE'};
    const out=runtime.hear(text,context||{});const spoken=summarize(out);last={time:Date.now(),text:String(text||''),result:out,response:spoken};emit('phone-voice-loop:result',last);
    if(responses&&typeof responses.enqueue==='function'){
      const q=responses.enqueue(spoken,{priority:out&&out.ok===false?70:50,source:'voice-loop'});
      if(q.ok&&typeof responses.speakNext==='function') responses.speakNext();
    }else if(audio&&typeof audio.speak==='function') audio.speak(spoken,{});
    return {ok:!!(out&&out.ok),result:out,response:spoken};
  }
  function status(){return {last:last?JSON.parse(JSON.stringify(last)):null};}
  return {handleTranscript,status};
}
root.OSKOPhoneVoiceLoop={create};
})(typeof window!=='undefined'?window:globalThis);
