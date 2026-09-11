/* OSKO Living OS — Safety Policy v1
   Keeps AI/voice/UI convenience separate from safety-critical authority.
*/
(function(global){
  'use strict';

  const HARD_BLOCKED = new Set([
    'robot.motor.raw','robot.balance.disable','robot.estop.disable','robot.joint.limit.override',
    'battery.bms.override','thermal.shutdown.disable','collision.disable','vehicle.brake.override'
  ]);

  const CONFIRM_REQUIRED = new Set([
    'gate.unlock','truck.start','truck.move','robot.leave-property','robot.heavy-lift','robot.power-cycle'
  ]);

  function normalizeIntent(intent){
    intent=intent||{};
    const objectId=String(intent.objectId||intent.target||'');
    const action=String(intent.action||'');
    return objectId+'.'+action;
  }

  function actionLooksConfrontational(action){
    const a=String(action||'').toLowerCase();
    return /chase|approach|confront|attack|scare|push|grab/.test(a);
  }

  function evaluate(intent,context){
    context=context||{};
    const key=normalizeIntent(intent);
    if(HARD_BLOCKED.has(key)) return {allowed:false,reason:'safety-critical control is local/deterministic only',level:'hard-block'};

    if(key.startsWith('robot.') && context.wildlifeAlert===true && actionLooksConfrontational(intent.action)){
      return {allowed:false,reason:'robot may not autonomously confront wildlife',level:'hard-block'};
    }

    if(CONFIRM_REQUIRED.has(key) && context.userConfirmed!==true){
      return {allowed:false,reason:'explicit user confirmation required',level:'confirm'};
    }

    if(context.offline===true && context.requiresCloud===true){
      return {allowed:false,reason:'cloud-dependent action unavailable offline',level:'temporary'};
    }

    return {allowed:true,level:'allowed'};
  }

  function create(options){
    options=options||{};
    const extra=Array.isArray(options.rules)?options.rules:[];
    function check(intent,context){
      const base=evaluate(intent,context);
      if(!base.allowed) return base;
      for(const rule of extra){
        const out=rule(intent,context||{});
        if(out && out.allowed===false) return out;
      }
      return base;
    }
    return {check:check,evaluate:evaluate};
  }

  global.OSKOSafetyPolicy={create:create,evaluate:evaluate,HARD_BLOCKED:HARD_BLOCKED,CONFIRM_REQUIRED:CONFIRM_REQUIRED};
})(typeof window!=='undefined'?window:globalThis);
