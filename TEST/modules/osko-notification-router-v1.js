/* OSKO Living OS - Notification Router v1
   Routes logical notices to available device/alert channels. No hidden/background OS permissions.
*/
(function(root){
'use strict';
function create(opts){
  opts=opts||{};
  const eventBus=opts.eventBus||null;
  const deviceBridge=opts.deviceBridge||null;
  const alertCenter=opts.alertCenter||null;
  const rules=[];
  const history=[];
  function emit(type,payload){ if(eventBus&&typeof eventBus.emit==='function') eventBus.emit(type,payload); }
  function addRule(rule){ const r=Object.assign({id:'rule-'+Date.now()+'-'+Math.random().toString(36).slice(2,6),enabled:true,minSeverity:'info',channels:['alert']},rule||{}); rules.push(r); return r; }
  function severityRank(s){ return ({info:0,low:1,medium:2,high:3,critical:4})[String(s||'info').toLowerCase()]||0; }
  function send(notice){
    const n=Object.assign({id:'notice-'+Date.now(),title:'Living OS',message:'',severity:'info',category:'general',time:Date.now(),meta:{}},notice||{});
    const active=rules.filter(r=>r.enabled&&severityRank(n.severity)>=severityRank(r.minSeverity));
    const channels=new Set(); active.forEach(r=>(r.channels||[]).forEach(c=>channels.add(c))); if(!active.length) channels.add('alert');
    const result={notice:n,delivered:[],failed:[]};
    if(channels.has('alert')&&alertCenter&&typeof alertCenter.push==='function'){ try{ alertCenter.push({title:n.title,message:n.message,severity:n.severity,category:n.category,source:'notification-router',data:n.meta}); result.delivered.push('alert'); }catch(e){ result.failed.push('alert'); } }
    if(channels.has('device')&&deviceBridge&&typeof deviceBridge.request==='function'){ try{ deviceBridge.request('notify',{title:n.title,message:n.message,severity:n.severity}); result.delivered.push('device'); }catch(e){ result.failed.push('device'); } }
    history.push(result); if(history.length>100) history.shift(); emit('notification:sent',result); return result;
  }
  function listRules(){ return rules.map(r=>Object.assign({},r)); }
  function recent(limit){ return history.slice(-Math.max(1,Math.min(Number(limit)||20,100))); }
  addRule({id:'critical-to-device',minSeverity:'critical',channels:['alert','device']});
  addRule({id:'normal-to-alerts',minSeverity:'info',channels:['alert']});
  return {addRule,send,listRules,recent};
}
root.OSKONotificationRouter={create};
})(typeof window!=='undefined'?window:globalThis);
