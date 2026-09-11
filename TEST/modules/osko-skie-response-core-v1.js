/* OSKO Living OS - SKIE Response Core v1
   Central response queue for SKIE text + future Android TTS output.
   Never grants control authority and never assumes audio hardware exists.
*/
(function(root){
'use strict';
function create(opts){
  opts=opts||{};
  const eventBus=opts.eventBus||null;
  const audio=opts.audio||null;
  const history=[];
  const queue=[];
  let seq=0;
  let speaking=null;
  function emit(type,payload){if(eventBus&&typeof eventBus.emit==='function'){try{eventBus.emit(type,payload);}catch(_e){}}}
  function clone(v){return v==null?v:JSON.parse(JSON.stringify(v));}
  function makeId(){seq++;return 'skie-response-'+Date.now().toString(36)+'-'+seq.toString(36);}
  function record(kind,data){const r=Object.assign({time:Date.now(),kind},data||{});history.push(r);if(history.length>250)history.shift();emit('skie-response:'+kind,r);return r;}
  function enqueue(text,meta){
    const value=String(text||'').trim();if(!value)return {ok:false,error:'EMPTY_RESPONSE'};
    const item={id:makeId(),text:value,priority:Math.max(0,Math.min(100,Number(meta&&meta.priority)||50)),createdAt:Date.now(),meta:clone(meta||{}),state:'queued'};
    queue.push(item);queue.sort((a,b)=>b.priority-a.priority||a.createdAt-b.createdAt);record('queued',{item:clone(item)});return {ok:true,item:clone(item)};
  }
  function speakNext(options){
    if(speaking)return {ok:false,error:'ALREADY_SPEAKING',item:clone(speaking)};
    if(!queue.length)return {ok:false,error:'QUEUE_EMPTY'};
    const item=queue.shift();item.state='speaking';speaking=item;record('speaking',{item:clone(item)});
    if(audio&&typeof audio.speak==='function'){
      try{
        const out=audio.speak(item.text,Object.assign({responseId:item.id},options||{}));
        if(out&&out.ok===false){item.state='failed';record('failed',{item:clone(item),error:out.error||'AUDIO_SPEAK_FAILED'});speaking=null;return {ok:false,error:out.error||'AUDIO_SPEAK_FAILED',item:clone(item)};}
        return {ok:true,item:clone(item),audio:clone(out||null)};
      }catch(err){item.state='failed';record('failed',{item:clone(item),error:String(err&&err.message||err)});speaking=null;return {ok:false,error:String(err&&err.message||err),item:clone(item)};}
    }
    item.state='text-only';record('text-only',{item:clone(item)});speaking=null;return {ok:true,textOnly:true,item:clone(item)};
  }
  function complete(responseId){
    if(!speaking)return {ok:false,error:'NOT_SPEAKING'};
    if(responseId&&String(responseId)!==speaking.id)return {ok:false,error:'RESPONSE_MISMATCH'};
    const item=speaking;item.state='complete';speaking=null;record('complete',{item:clone(item)});return {ok:true,item:clone(item)};
  }
  function stop(reason){
    if(audio&&typeof audio.stop==='function'){try{audio.stop();}catch(_e){}}
    if(!speaking)return {ok:true,stopped:false};
    const item=speaking;item.state='stopped';speaking=null;record('stopped',{item:clone(item),reason:reason||null});return {ok:true,stopped:true,item:clone(item)};
  }
  function status(){return {queued:queue.length,speaking:clone(speaking),recent:clone(history.slice(-20))};}
  function recent(limit){return clone(history.slice(-(Math.max(1,Number(limit)||30))));}
  return {enqueue,speakNext,complete,stop,status,recent};
}
root.OSKOSKIEResponseCore={create};
})(typeof window!=='undefined'?window:globalThis);
