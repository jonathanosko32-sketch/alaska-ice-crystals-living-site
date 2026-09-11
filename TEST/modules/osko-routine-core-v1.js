(function(global){
  'use strict';

  function nowMs(){ return Date.now(); }
  function clone(v){ return JSON.parse(JSON.stringify(v)); }
  function normalizeTime(t){
    if (typeof t === 'number' && isFinite(t)) return t;
    var n = Date.parse(t);
    return isFinite(n) ? n : null;
  }

  function create(options){
    options = options || {};
    var routines = new Map();
    var history = [];
    var listeners = new Set();
    var maxHistory = Math.max(20, options.maxHistory || 250);

    function emit(type, payload){
      var evt = { type:type, at:nowMs(), payload:clone(payload || {}) };
      history.push(evt);
      if (history.length > maxHistory) history.shift();
      listeners.forEach(function(fn){ try{ fn(evt); }catch(_e){} });
      return evt;
    }

    function validate(spec){
      if (!spec || !spec.id) throw new Error('routine id required');
      if (!spec.action) throw new Error('routine action required');
      var r = clone(spec);
      r.id = String(r.id);
      r.enabled = r.enabled !== false;
      r.mode = r.mode || 'manual';
      r.lastRun = r.lastRun || null;
      r.nextRun = r.nextRun || null;
      r.cooldownMs = Math.max(0, Number(r.cooldownMs || 0));
      r.conditions = Array.isArray(r.conditions) ? r.conditions : [];
      return r;
    }

    function add(spec){
      var r = validate(spec);
      if (routines.has(r.id)) throw new Error('routine already exists: '+r.id);
      routines.set(r.id, r);
      emit('routine.added', r);
      return clone(r);
    }

    function upsert(spec){
      var r = validate(spec);
      var existed = routines.has(r.id);
      routines.set(r.id, r);
      emit(existed ? 'routine.updated' : 'routine.added', r);
      return clone(r);
    }

    function remove(id){
      id = String(id);
      var existed = routines.delete(id);
      if (existed) emit('routine.removed', {id:id});
      return existed;
    }

    function get(id){
      var r = routines.get(String(id));
      return r ? clone(r) : null;
    }

    function list(){ return Array.from(routines.values()).map(clone); }

    function setEnabled(id, enabled){
      var r = routines.get(String(id));
      if (!r) return false;
      r.enabled = !!enabled;
      emit('routine.enabled', {id:r.id, enabled:r.enabled});
      return true;
    }

    function conditionPasses(cond, context){
      context = context || {};
      if (!cond || !cond.key) return true;
      var actual = context[cond.key];
      var expected = cond.value;
      switch(cond.op || 'eq'){
        case 'eq': return actual === expected;
        case 'neq': return actual !== expected;
        case 'gt': return Number(actual) > Number(expected);
        case 'gte': return Number(actual) >= Number(expected);
        case 'lt': return Number(actual) < Number(expected);
        case 'lte': return Number(actual) <= Number(expected);
        case 'in': return Array.isArray(expected) && expected.indexOf(actual) >= 0;
        case 'truthy': return !!actual;
        case 'falsy': return !actual;
        default: return false;
      }
    }

    function canRun(r, context, at){
      at = at || nowMs();
      if (!r.enabled) return {ok:false, reason:'disabled'};
      if (r.lastRun && r.cooldownMs && at - r.lastRun < r.cooldownMs) return {ok:false, reason:'cooldown'};
      for (var i=0;i<r.conditions.length;i++){
        if (!conditionPasses(r.conditions[i], context)) return {ok:false, reason:'condition', condition:r.conditions[i]};
      }
      if (r.mode === 'once' && r.lastRun) return {ok:false, reason:'already-ran'};
      if (r.nextRun){
        var next = normalizeTime(r.nextRun);
        if (next && at < next) return {ok:false, reason:'not-due'};
      }
      return {ok:true};
    }

    function markRun(id, result){
      var r = routines.get(String(id));
      if (!r) return false;
      r.lastRun = nowMs();
      r.lastResult = clone(result || {ok:true});
      if (r.mode === 'once') r.enabled = false;
      emit('routine.ran', {id:r.id, result:r.lastResult, lastRun:r.lastRun});
      return true;
    }

    function due(context, at){
      at = at || nowMs();
      return Array.from(routines.values()).filter(function(r){ return canRun(r, context, at).ok; }).map(clone);
    }

    function subscribe(fn){ listeners.add(fn); return function(){ listeners.delete(fn); }; }
    function getHistory(){ return history.map(clone); }

    return { add:add, upsert:upsert, remove:remove, get:get, list:list, setEnabled:setEnabled, canRun:function(id,ctx,at){ var r=routines.get(String(id)); return r ? canRun(r,ctx,at) : {ok:false,reason:'missing'}; }, due:due, markRun:markRun, subscribe:subscribe, getHistory:getHistory };
  }

  global.OSKORoutineCore = { create:create };
})(typeof window !== 'undefined' ? window : globalThis);
