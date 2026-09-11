/* OSKO Living OS - Integration Manifest v1
   Loader-only manifest. It does not execute modules or control render loops/hardware.
*/
(function(root){
'use strict';
const modules=[
  {id:'eventBus',path:'modules/osko-event-bus-v1.js',global:'OSKOEventBus',required:true},
  {id:'worldState',path:'modules/osko-world-state-v1.js',global:'OSKOWorldState',required:true},
  {id:'runtime',path:'modules/osko-runtime-core-v1.js',global:'OSKORuntime',required:true},
  {id:'selfTest',path:'modules/osko-module-selftest-v1.js',global:'OSKOModuleSelfTest',required:true},
  {id:'diagnostics',path:'modules/osko-diagnostics-core-v1.js',global:'OSKODiagnostics',required:false},
  {id:'safety',path:'modules/osko-safety-policy-v1.js',global:'OSKOSafetyPolicy',required:false},
  {id:'persistence',path:'modules/osko-state-persistence-v1.js',global:'OSKOStatePersistence',required:false},
  {id:'voice',path:'modules/osko-voice-intent-v1.js',global:'OSKOVoiceIntent',required:false},
  {id:'communications',path:'modules/osko-communications-core-v1.js',global:'OSKOCommunications',required:false},
  {id:'presence',path:'modules/osko-world-presence-core-v1.js',global:'OSKOWorldPresence',required:false},
  {id:'wildlife',path:'modules/osko-wildlife-v2.js',global:'OSKOWildlife',required:false},
  {id:'awareness',path:'modules/osko-wildlife-awareness-v1.js',global:'OSKOWildlifeAwareness',required:false}
];
function list(){return modules.map(x=>Object.assign({},x));}
function required(){return list().filter(x=>x.required);}
function optional(){return list().filter(x=>!x.required);}
function verify(scope){
  scope=scope||root;
  return modules.map(m=>({id:m.id,path:m.path,global:m.global,required:m.required,present:!!scope[m.global]}));
}
root.OSKOIntegrationManifest={version:'1.0.0',list,required,optional,verify};
})(typeof window!=='undefined'?window:globalThis);
