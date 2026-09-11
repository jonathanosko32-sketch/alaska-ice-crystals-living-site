/* OSKO Living OS - Phone Readiness Core v1
   Read-only readiness gate for moving from browser architecture tests toward an installed Android host build.
   It does not install an APK, request permissions, or promote a release.
*/
(function(root){
'use strict';
function create(opts){
  opts=opts||{};
  const modules=opts.modules||{};
  const required=opts.required||[
    'androidHost','phoneRuntime','phoneService','lifecycle','audio','wakeSession','voiceLoop','responses','conversationSession','installProfile','upgradeOrchestrator','dataContinuity'
  ];
  const checks=opts.checks||{};
  function exists(x){return !!x;}
  function run(context){
    context=context||{};
    const missing=required.filter(k=>!exists(modules[k]));
    const details={};let ok=missing.length===0;
    Object.keys(checks).forEach(name=>{
      try{const r=checks[name](context,modules);details[name]=r===true?{ok:true}:(r&&typeof r==='object'?r:{ok:!!r});if(!details[name].ok)ok=false;}
      catch(err){details[name]={ok:false,error:String(err&&err.message||err)};ok=false;}
    });
    if(context.syntaxChecked!==true){details.syntaxChecked={ok:false,error:'SYNTAX_CHECK_REQUIRED'};ok=false;}else details.syntaxChecked={ok:true};
    if(context.browserHarnessPassed!==true){details.browserHarnessPassed={ok:false,error:'HARNESS_PASS_REQUIRED'};ok=false;}else details.browserHarnessPassed={ok:true};
    if(context.phoneConfirmed!==true){details.phoneConfirmed={ok:false,error:'PHONE_CONFIRMATION_REQUIRED'};ok=false;}else details.phoneConfirmed={ok:true};
    return {ready:ok,mode:ok?'READY_FOR_ANDROID_HOST_BUILD':'NOT_READY',missing,details,rule:'Do not call the installed-phone build stable until syntax checks, harness checks, and Osko phone confirmation all pass.'};
  }
  return {run};
}
root.OSKOPhoneReadiness={create};
})(typeof window!=='undefined'?window:globalThis);
