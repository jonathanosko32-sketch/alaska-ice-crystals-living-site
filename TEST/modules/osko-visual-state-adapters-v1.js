/* OSKO Living OS - Visual State Adapters v1
   Reusable, render-loop-safe adapters for mapping logical state onto visible scene objects.
   Does not create a renderer, replace animation loops, or control physical hardware.
*/
(function(root){
'use strict';
function num(v,fallback){ v=Number(v); return Number.isFinite(v)?v:fallback; }
function setXYZ(target,value){
  if(!target||!value) return false;
  if(typeof target.set==='function') target.set(num(value.x,target.x||0),num(value.y,target.y||0),num(value.z,target.z||0));
  else { if(value.x!=null) target.x=num(value.x,target.x||0); if(value.y!=null) target.y=num(value.y,target.y||0); if(value.z!=null) target.z=num(value.z,target.z||0); }
  return true;
}
function makeBasic(options){
  options=options||{};
  return function apply(visual,state,meta){
    state=state||{};
    if(!visual) return {ok:false,error:'NO_VISUAL'};
    if(state.visible!=null && 'visible' in visual) visual.visible=!!state.visible;
    if(state.position) setXYZ(visual.position,state.position);
    if(state.rotation) setXYZ(visual.rotation,state.rotation);
    if(state.scale){
      if(typeof state.scale==='number'){
        if(visual.scale&&typeof visual.scale.setScalar==='function') visual.scale.setScalar(state.scale);
        else if(visual.scale) setXYZ(visual.scale,{x:state.scale,y:state.scale,z:state.scale});
      } else if(visual.scale) setXYZ(visual.scale,state.scale);
    }
    if(state.name && 'name' in visual) visual.name=String(state.name);
    return {ok:true,meta:meta||null};
  };
}
function makeLight(options){
  options=options||{};
  return function apply(light,state,meta){
    state=state||{};
    if(!light) return {ok:false,error:'NO_LIGHT'};
    if(state.on!=null && 'visible' in light) light.visible=!!state.on;
    if(state.visible!=null && 'visible' in light) light.visible=!!state.visible;
    if(state.intensity!=null && 'intensity' in light) light.intensity=Math.max(0,num(state.intensity,light.intensity||0));
    if(state.distance!=null && 'distance' in light) light.distance=Math.max(0,num(state.distance,light.distance||0));
    if(state.decay!=null && 'decay' in light) light.decay=Math.max(0,num(state.decay,light.decay||0));
    return {ok:true,meta:meta||null};
  };
}
function makeGate(options){
  options=Object.assign({openAngle:-Math.PI/2,closedAngle:0,axis:'y'},options||{});
  return function apply(gate,state){
    if(!gate) return {ok:false,error:'NO_GATE'};
    const r=gate.rotation;
    if(r && (state.open!=null || state.state)){
      const open=state.open!=null?!!state.open:String(state.state).toLowerCase()==='open';
      r[options.axis]=open?options.openAngle:options.closedAngle;
    }
    if(state.visible!=null && 'visible' in gate) gate.visible=!!state.visible;
    return {ok:true};
  };
}
function makeExpandable(options){
  options=Object.assign({closedScale:1,openScale:1.12,axis:'x'},options||{});
  return function apply(visual,state){
    if(!visual||!visual.scale) return {ok:false,error:'NO_EXPANDABLE_VISUAL'};
    const expanded=state.expanded!=null?!!state.expanded:String(state.state||'').toLowerCase()==='expanded';
    const value=expanded?options.openScale:options.closedScale;
    visual.scale[options.axis]=value;
    return {ok:true,expanded};
  };
}
function compose(){
  const adapters=Array.from(arguments).filter(fn=>typeof fn==='function');
  return function(visual,state,meta){
    const results=[];
    for(const fn of adapters){
      try{ results.push(fn(visual,state,meta)); }
      catch(err){ results.push({ok:false,error:String(err&&err.message||err)}); }
    }
    return {ok:results.every(r=>!r||r.ok!==false),results};
  };
}
root.OSKOVisualStateAdapters={makeBasic,makeLight,makeGate,makeExpandable,compose};
})(typeof window!=='undefined'?window:globalThis);
