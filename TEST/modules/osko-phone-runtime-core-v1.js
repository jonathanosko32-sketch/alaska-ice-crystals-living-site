/* OSKO Living OS - Phone Runtime Core v1
   Coordinates the Android host, wake session, SKIE voice bridge, fleet and docks
   for the installed-phone stage. No privileged Android access, APK install, or motor control.
*/
(function(root){
'use strict';
function create(opts){
  opts=opts||{};
  const androidHost=opts.androidHost||null;
  const wake=opts.wakeSession||null;
  const voice=opts.voiceBridge||null;
  const fleet=opts.fleet||null;
  const docks=opts.docks||null;
  const eventBus=opts.eventBus||null;
  const history=[];
  const state={mode:'offline',sessionId:null,lastCommand:null,lastResult:null,lastError:null};

  function emit(type,payload){if(eventBus&&typeof eventBus.emit==='function'){try{eventBus.emit(type,payload);}catch(_e){}}}
  function clone(v){return v==null?v:JSON.parse(JSON.stringify(v));}
  function record(kind,data){const r=Object.assign({time:Date.now(),kind},data||{});history.push(r);if(history.length>250)history.shift();emit('phone-runtime:'+kind,r);return r;}
  function hostReady(){return !!(androidHost&&typeof androidHost.readiness==='function'&&androidHost.readiness().ready);}
  function setMode(mode,detail){state.mode=mode;record('mode',{mode,detail:detail||null});return status();}

  function connectHost(info){
    if(!androidHost||typeof androidHost.connect!=='function') return {ok:false,error:'ANDROID_HOST_UNAVAILABLE'};
    const out=androidHost.connect(info||{});
    const ready=androidHost.readiness();
    setMode(ready.ready?'ready':'degraded',ready);
    return {ok:!!ready.ready,host:out,readiness:ready,status:status()};
  }

  function disconnectHost(reason){
    if(androidHost&&typeof androidHost.disconnect==='function') androidHost.disconnect(reason||null);
    if(wake&&typeof wake.arm==='function') wake.arm(false);
    state.sessionId=null;setMode('offline',{reason:reason||null});return status();
  }

  function armVoice(enabled){
    if(!wake||typeof wake.arm!=='function') return {ok:false,error:'WAKE_SESSION_UNAVAILABLE'};
    if(enabled!==false&&!hostReady()) return {ok:false,error:'PHONE_HOST_NOT_READY'};
    const s=wake.arm(enabled!==false);record('voice-armed',{armed:s.armed});return {ok:true,wake:s};
  }

  function hear(phrase,context){
    context=Object.assign({actor:'owner',source:'phone-voice',local:true},context||{});
    if(!hostReady()) return {ok:false,error:'PHONE_HOST_NOT_READY'};
    if(!wake||typeof wake.detect!=='function'||typeof wake.acceptCommand!=='function') return {ok:false,error:'WAKE_SESSION_UNAVAILABLE'};
    if(!voice||typeof voice.execute!=='function') return {ok:false,error:'VOICE_BRIDGE_UNAVAILABLE'};

    const first=wake.detect(phrase);
    let command='';
    if(first&&first.woke){
      state.sessionId='voice-'+Date.now().toString(36);
      command=String(first.remainder||'').trim();
      record('wake',{sessionId:state.sessionId,phrase:String(phrase||'')});
      if(!command){setMode('listening');return {ok:true,woke:true,listening:true,status:status()};}
    }else{
      const ws=typeof wake.status==='function'?wake.status():null;
      if(!ws||ws.state!=='listening') return {ok:false,error:'WAKE_PHRASE_REQUIRED'};
      command=String(phrase||'').trim();
    }

    const accepted=wake.acceptCommand(command);
    if(!accepted.ok) return {ok:false,error:accepted.error||'COMMAND_NOT_ACCEPTED',wake:accepted.state};
    setMode('processing');
    const out=voice.execute(command,context);
    state.lastCommand={time:Date.now(),text:accepted.text,sessionId:state.sessionId};
    state.lastResult=clone(out);
    state.lastError=out&&out.ok===false?(out.error||'COMMAND_FAILED'):null;
    if(typeof wake.finish==='function') wake.finish(out);
    setMode('ready');
    record(out&&out.ok?'command-complete':'command-failed',{sessionId:state.sessionId,command:accepted.text,result:clone(out)});
    return {ok:!!(out&&out.ok),woke:!!first.woke,command:accepted.text,result:out,status:status()};
  }

  function tick(now){if(wake&&typeof wake.tick==='function') wake.tick(now);return status();}
  function status(){
    return {
      mode:state.mode,
      sessionId:state.sessionId,
      host:androidHost&&typeof androidHost.status==='function'?androidHost.status():null,
      wake:wake&&typeof wake.status==='function'?wake.status():null,
      fleet:fleet&&typeof fleet.status==='function'?fleet.status():null,
      docks:docks&&typeof docks.systemStatus==='function'?docks.systemStatus():null,
      lastCommand:clone(state.lastCommand),lastResult:clone(state.lastResult),lastError:state.lastError
    };
  }
  function recent(limit){return history.slice(-(Math.max(1,Number(limit)||30)));}
  return {connectHost,disconnectHost,armVoice,hear,tick,status,recent};
}
root.OSKOPhoneRuntime={create};
})(typeof window!=='undefined'?window:globalThis);
