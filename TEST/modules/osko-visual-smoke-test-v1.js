/* OSKO Living OS - Visual Integration Smoke Test v1
   Read-only verification for the clean visual merge path.
   Does not own the render loop and does not control physical hardware.
*/
(function(root){
'use strict';
function create(opts){
  opts=opts||{};
  const sceneBinding=opts.sceneBinding||null;
  const camera=opts.camera||null;
  const manifest=opts.manifest||null;
  const session=opts.session||null;
  const eventBus=opts.eventBus||null;
  const results=[];

  function emit(type,payload){
    if(eventBus&&typeof eventBus.emit==='function'){
      try{ eventBus.emit(type,payload); }catch(_e){}
    }
  }
  function push(name,ok,detail){
    const r={name,ok:!!ok,status:ok?'PASS':'FAIL',detail:detail||null,time:Date.now()};
    results.push(r); emit('visual-test:result',r); return r;
  }
  function resolve(id){
    if(!manifest) return id;
    if(typeof manifest.resolve==='function') return manifest.resolve(id)||id;
    return id;
  }
  function testBinding(id){
    const rid=resolve(id);
    if(!sceneBinding||typeof sceneBinding.get!=='function') return push('binding:'+rid,false,'scene-binding-unavailable');
    const obj=sceneBinding.get(rid);
    return push('binding:'+rid,!!obj,obj?'bound':'not-bound');
  }
  function testFocus(id){
    const rid=resolve(id);
    if(!sceneBinding||typeof sceneBinding.focusPoint!=='function') return push('focus:'+rid,false,'focus-unavailable');
    const p=sceneBinding.focusPoint(rid);
    const ok=!!(p&&Number.isFinite(p.x)&&Number.isFinite(p.y)&&Number.isFinite(p.z));
    return push('focus:'+rid,ok,p||'no-focus-point');
  }
  function testCameraHome(){
    if(!camera||typeof camera.home!=='function') return push('camera:home',false,'camera-unavailable');
    try{ const r=camera.home(); return push('camera:home',!!(r&&r.ok!==false),r||null); }
    catch(err){ return push('camera:home',false,String(err&&err.message||err)); }
  }
  function run(ids){
    results.length=0;
    const list=Array.isArray(ids)&&ids.length?ids:['hq','school','workshop','truck','aurora','communications'];
    testCameraHome();
    list.forEach(id=>{ testBinding(id); testFocus(id); });
    const passed=results.filter(r=>r.ok).length;
    const out={ok:passed===results.length,passed,total:results.length,failed:results.length-passed,results:results.slice(),time:Date.now()};
    if(session&&typeof session.recordTest==='function'){
      try{ session.recordTest('visual-smoke-test',out); }catch(_e){}
    }
    emit('visual-test:complete',out);
    return out;
  }
  function summary(){
    const passed=results.filter(r=>r.ok).length;
    return {passed,total:results.length,failed:results.length-passed,ok:results.length>0&&passed===results.length};
  }
  return {run,testBinding,testFocus,testCameraHome,summary};
}
root.OSKOVisualSmokeTest={create};
})(typeof window!=='undefined'?window:globalThis);
