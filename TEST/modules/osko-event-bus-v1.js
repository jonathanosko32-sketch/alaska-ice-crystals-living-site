/* OSKO Living OS — Event Bus v1
   Shared low-overhead event layer for world state, object actions, wildlife alerts,
   routes, SKIE, phone UI and future spatial clients.
*/
(function(global){
  'use strict';

  function create(options){
    options=options||{};
    const topics=new Map();
    const history=[];
    const maxHistory=Math.max(10,Math.min(500,options.maxHistory||120));
    let seq=0;

    function on(topic,fn){
      if(typeof fn!=='function') throw new Error('event handler must be function');
      if(!topics.has(topic)) topics.set(topic,new Set());
      topics.get(topic).add(fn);
      return function(){off(topic,fn)};
    }

    function once(topic,fn){
      let stop=null;
      stop=on(topic,function(evt){if(stop)stop();fn(evt)});
      return stop;
    }

    function off(topic,fn){
      const set=topics.get(topic);if(!set)return false;
      const ok=set.delete(fn);if(set.size===0)topics.delete(topic);return ok;
    }

    function emit(topic,payload,meta){
      const evt={id:++seq,topic:topic,time:Date.now(),payload:payload===undefined?null:payload,meta:Object.assign({},meta||{})};
      history.push(evt);while(history.length>maxHistory)history.shift();
      const exact=topics.get(topic);if(exact){for(const fn of [...exact]){try{fn(evt)}catch(e){setTimeout(()=>{throw e},0)}}}
      const all=topics.get('*');if(all){for(const fn of [...all]){try{fn(evt)}catch(e){setTimeout(()=>{throw e},0)}}}
      return evt;
    }

    function getHistory(filter){
      if(!filter) return history.slice();
      if(typeof filter==='string') return history.filter(e=>e.topic===filter);
      const since=filter.since||0,topic=filter.topic||null;
      return history.filter(e=>(!topic||e.topic===topic)&&e.time>=since);
    }

    function clearHistory(){history.length=0}
    function topicCount(){return topics.size}

    return {on,once,off,emit,getHistory,clearHistory,topicCount};
  }

  global.OSKOEventBus={create:create};
})(typeof window!=='undefined'?window:globalThis);
