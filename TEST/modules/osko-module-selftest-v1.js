/* OSKO Living OS - Module Self Test v1
   Read-only checks for module presence and basic API shape.
*/
(function(root){
'use strict';
function create(opts){
  opts=opts||{};
  const checks=[];
  const modules=opts.modules||{};

  function add(name,fn){ checks.push({name,fn}); return api; }
  function exists(name){ return !!modules[name]; }
  function hasAny(name,methods){
    const m=modules[name]; if(!m) return false;
    return methods.some(k=>typeof m[k]==='function');
  }

  function defaults(){
    add('event-bus',()=>exists('eventBus')&&hasAny('eventBus',['emit','publish']));
    add('world-state',()=>exists('worldState'));
    add('actions',()=>exists('actions')&&hasAny('actions',['execute','run']));
    add('objects',()=>exists('objects'));
    add('routes',()=>exists('routes'));
    add('environment',()=>exists('environment'));
    add('performance',()=>exists('performance'));
    add('persistence',()=>exists('persistence'));
    add('voice',()=>exists('voice'));
    add('safety',()=>exists('safety'));
    add('alerts',()=>exists('alerts'));
    add('routines',()=>exists('routines'));
    add('communications',()=>exists('communications'));
    add('presence',()=>exists('presence'));
    add('diagnostics',()=>exists('diagnostics'));
    add('camera',()=>exists('camera'));
    add('scene-binding',()=>exists('sceneBinding'));
    add('wildlife',()=>exists('wildlife'));
    add('wildlife-awareness',()=>exists('awareness'));
    return api;
  }

  function run(){
    const started=Date.now();
    const results=checks.map(c=>{
      try{ const ok=!!c.fn(); return {name:c.name,ok,status:ok?'PASS':'MISSING'}; }
      catch(err){ return {name:c.name,ok:false,status:'ERROR',error:String(err&&err.message||err)}; }
    });
    const passed=results.filter(r=>r.ok).length;
    return {started,finished:Date.now(),passed,total:results.length,ok:passed===results.length,results};
  }

  const api={add,defaults,run};
  return api;
}
root.OSKOModuleSelfTest={create};
})(typeof window!=='undefined'?window:globalThis);
