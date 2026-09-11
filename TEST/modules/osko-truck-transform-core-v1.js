/* OSKO Living OS - Truck Transform Core v1
   Logical transform state for the user's custom three-axle truck.
   Sides extend/retract, roof lifts/lowers, and twin-stack smoke is tracked separately.
   This module does not move physical hardware; a visual/Android/vehicle adapter may mirror state later.
*/
(function(root){
'use strict';
function create(opts){
  opts=opts||{};
  const eventBus=opts.eventBus||null;
  const state={
    truckId:'truck',
    axleCount:3,
    plow:true,
    sideExtension:0,
    sideTarget:0,
    roofLift:0,
    roofTarget:0,
    stackSmoke:false,
    motion:'idle',
    lastChanged:Date.now()
  };
  const speed=Math.max(.05,Math.min(2,Number(opts.speed)||.65));
  function emit(type,payload){if(eventBus&&typeof eventBus.emit==='function'){try{eventBus.emit(type,payload);}catch(_e){}}}
  function clone(v){return JSON.parse(JSON.stringify(v));}
  function clamp01(v){return Math.max(0,Math.min(1,Number(v)||0));}
  function setTargets(sides,roof){
    if(sides!=null) state.sideTarget=clamp01(sides);
    if(roof!=null) state.roofTarget=clamp01(roof);
    state.lastChanged=Date.now();
    updateMotion();
    emit('truck-transform:target',status());
    return status();
  }
  function updateMotion(){
    const movingSides=Math.abs(state.sideExtension-state.sideTarget)>.001;
    const movingRoof=Math.abs(state.roofLift-state.roofTarget)>.001;
    if(movingSides&&movingRoof)state.motion='transforming';
    else if(movingSides)state.motion=state.sideTarget>state.sideExtension?'sides-extending':'sides-retracting';
    else if(movingRoof)state.motion=state.roofTarget>state.roofLift?'roof-lifting':'roof-lowering';
    else state.motion='idle';
  }
  function stepValue(current,target,delta){
    if(Math.abs(target-current)<=delta)return target;
    return current+(target>current?delta:-delta);
  }
  function tick(dtSeconds){
    const dt=Math.max(0,Math.min(1,Number(dtSeconds)||0));
    const delta=speed*dt;
    state.sideExtension=stepValue(state.sideExtension,state.sideTarget,delta);
    state.roofLift=stepValue(state.roofLift,state.roofTarget,delta);
    updateMotion();
    emit('truck-transform:state',status());
    return status();
  }
  function sidesOut(){return setTargets(1,null);}
  function sidesIn(){return setTargets(0,null);}
  function roofUp(){return setTargets(null,1);}
  function roofDown(){return setTargets(null,0);}
  function open(){return setTargets(1,1);}
  function close(){return setTargets(0,0);}
  function setSmoke(on){state.stackSmoke=!!on;state.lastChanged=Date.now();emit('truck-transform:smoke',status());return status();}
  function command(name){
    const c=String(name||'').trim().toLowerCase().replace(/\s+/g,'-');
    if(['open','expand','open-truck'].includes(c))return {ok:true,state:open()};
    if(['close','retract','close-truck'].includes(c))return {ok:true,state:close()};
    if(['sides-out','extend-sides','side-out'].includes(c))return {ok:true,state:sidesOut()};
    if(['sides-in','retract-sides','side-in'].includes(c))return {ok:true,state:sidesIn()};
    if(['roof-up','top-up','lift-roof','lift-top'].includes(c))return {ok:true,state:roofUp()};
    if(['roof-down','top-down','lower-roof','lower-top'].includes(c))return {ok:true,state:roofDown()};
    if(['smoke-on','stacks-on'].includes(c))return {ok:true,state:setSmoke(true)};
    if(['smoke-off','stacks-off'].includes(c))return {ok:true,state:setSmoke(false)};
    return {ok:false,error:'UNKNOWN_TRUCK_COMMAND',command:c};
  }
  function status(){return clone(state);}
  return {sidesOut,sidesIn,roofUp,roofDown,open,close,setSmoke,command,tick,status};
}
root.OSKOTruckTransformCore={create};
})(typeof window!=='undefined'?window:globalThis);
