/* OSKO Living OS - Integration Readiness Gate v1
   Read-only readiness checks before a visual build is allowed to be called integration-ready.
*/
(function(root){
'use strict';
function create(opts){
  opts=opts||{};
  const modules=opts.modules||{};
  const required=opts.required||[
    'eventBus','worldState','runtime','actions','safety','registry','camera','sceneBinding','interaction'
  ];
  const recommended=opts.recommended||[
    'environment','performance','persistence','alerts','presence','communications','diagnostics','offline','journal'
  ];
  function has(name){ return !!modules[name]; }
  function apiCheck(name){
    const m=modules[name]; if(!m) return {name,present:false,api:false};
    const expectations={
      eventBus:['emit','on'],
      worldState:['snapshot','subscribe'],
      runtime:['start','tick','status'],
      actions:['perform','run','execute'],
      safety:['evaluate','check'],
      registry:['get','find','has'],
      camera:['go','home'],
      sceneBinding:['bind','focusPoint'],
      interaction:['dispatch']
    };
    const any=expectations[name]||[];
    const api=any.length===0||any.some(k=>typeof m[k]==='function');
    return {name,present:true,api};
  }
  function report(){
    const req=required.map(apiCheck);
    const rec=recommended.map(name=>({name,present:has(name)}));
    const missing=req.filter(x=>!x.present||!x.api).map(x=>x.name);
    const recommendedMissing=rec.filter(x=>!x.present).map(x=>x.name);
    return {
      ready:missing.length===0,
      mode:missing.length===0?'INTEGRATION_READY':'DEGRADED',
      required:req,
      missing,
      recommended:rec,
      recommendedMissing,
      checkedAt:Date.now(),
      rule:'Do not replace FIX8 or declare a new visual build stable until required checks pass and the new build is phone-confirmed.'
    };
  }
  return {report};
}
root.OSKOIntegrationReadiness={create};
})(typeof window!=='undefined'?window:globalThis);
