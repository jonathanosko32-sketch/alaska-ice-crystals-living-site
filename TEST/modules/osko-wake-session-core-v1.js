/* OSKO Living OS - Wake Session Core v1
   Local wake/listening state machine for future "Hey SKIE" phone integration.
   This module does NOT access microphone hardware itself.
*/
(function(root){
'use strict';
function create(opts){
  opts=opts||{};
  const eventBus=opts.eventBus||null;
  const wakePhrases=(opts.wakePhrases&&opts.wakePhrases.length?opts.wakePhrases:['hey skie','skie']).map(norm);
  const listenWindowMs=Math.max(3000,Math.min(60000,Number(opts.listenWindowMs)||12000));
  let state='idle';
  let armed=true;
  let openedAt=0;
  let expiresAt=0;
  let lastWake=null;
  let lastCommand=null;

  function norm(v){return String(v||'').trim().toLowerCase().replace(/[^a-z0-9\s-]/g,' ').replace(/\s+/g,' ');}
  function emit(type,payload){ if(eventBus&&typeof eventBus.emit==='function'){try{eventBus.emit(type,payload);}catch(_e){}} }
  function snapshot(){return {state,armed,openedAt,expiresAt,lastWake,lastCommand,wakePhrases:wakePhrases.slice(),listenWindowMs};}
  function arm(v){armed=v!==false;if(!armed){state='idle';openedAt=0;expiresAt=0;}emit('wake:armed',snapshot());return snapshot();}
  function detect(phrase){
    const text=norm(phrase); if(!armed||!text)return {woke:false,state:snapshot()};
    let matched=null;
    wakePhrases.forEach(function(w){if(!matched&&(text===w||text.startsWith(w+' ')))matched=w;});
    if(!matched)return {woke:false,state:snapshot()};
    const now=Date.now();state='listening';openedAt=now;expiresAt=now+listenWindowMs;lastWake={time:now,phrase:matched};
    let remainder=text.slice(matched.length).trim();
    emit('wake:detected',{phrase:matched,remainder,state:snapshot()});
    return {woke:true,remainder,state:snapshot()};
  }
  function acceptCommand(phrase){
    const now=Date.now();
    if(state!=='listening')return {ok:false,error:'NOT_LISTENING',state:snapshot()};
    if(now>expiresAt){state='idle';emit('wake:expired',snapshot());return {ok:false,error:'LISTEN_WINDOW_EXPIRED',state:snapshot()};}
    const text=norm(phrase); if(!text)return {ok:false,error:'EMPTY_COMMAND',state:snapshot()};
    lastCommand={time:now,text};state='processing';emit('wake:command',lastCommand);return {ok:true,text,state:snapshot()};
  }
  function finish(result){state='idle';openedAt=0;expiresAt=0;emit('wake:finished',{result:result||null,state:snapshot()});return snapshot();}
  function tick(now){now=Number(now)||Date.now();if(state==='listening'&&now>expiresAt){state='idle';openedAt=0;expiresAt=0;emit('wake:expired',snapshot());}return snapshot();}
  return {arm,detect,acceptCommand,finish,tick,status:snapshot};
}
root.OSKOWakeSession={create};
})(typeof window!=='undefined'?window:globalThis);
