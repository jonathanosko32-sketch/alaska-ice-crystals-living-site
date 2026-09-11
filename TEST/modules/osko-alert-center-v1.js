(function(global){
  'use strict';

  function clone(v){ return JSON.parse(JSON.stringify(v)); }
  function create(options){
    options = options || {};
    var alerts = new Map();
    var listeners = new Set();
    var seq = 0;
    var maxActive = Math.max(10, options.maxActive || 100);
    var priorities = {info:1, low:2, medium:3, high:4, critical:5};

    function notify(type, data){
      var evt = {type:type, at:Date.now(), data:clone(data)};
      listeners.forEach(function(fn){ try{fn(evt);}catch(_e){} });
      return evt;
    }

    function normalize(input){
      input = input || {};
      var id = input.id || ('alert-'+(++seq));
      var severity = priorities[input.severity] ? input.severity : 'info';
      return {
        id:String(id),
        source:String(input.source || 'living-os'),
        title:String(input.title || 'Living OS notice'),
        message:String(input.message || ''),
        severity:severity,
        category:String(input.category || 'general'),
        createdAt:Number(input.createdAt || Date.now()),
        updatedAt:Date.now(),
        acknowledged:!!input.acknowledged,
        resolved:!!input.resolved,
        requiresConfirmation:!!input.requiresConfirmation,
        data:clone(input.data || {})
      };
    }

    function push(input){
      var a = normalize(input);
      alerts.set(a.id, a);
      trim();
      notify('alert.pushed', a);
      return clone(a);
    }

    function update(id, patch){
      var a = alerts.get(String(id));
      if (!a) return null;
      Object.keys(patch || {}).forEach(function(k){
        if (k === 'id' || k === 'createdAt') return;
        if (k === 'severity' && !priorities[patch[k]]) return;
        a[k] = clone(patch[k]);
      });
      a.updatedAt = Date.now();
      notify('alert.updated', a);
      return clone(a);
    }

    function acknowledge(id){ return update(id, {acknowledged:true}); }
    function resolve(id){ return update(id, {resolved:true, acknowledged:true}); }
    function remove(id){
      var key = String(id);
      var a = alerts.get(key);
      if (!a) return false;
      alerts.delete(key);
      notify('alert.removed', a);
      return true;
    }

    function list(filter){
      filter = filter || {};
      var out = Array.from(alerts.values()).filter(function(a){
        if (filter.activeOnly && a.resolved) return false;
        if (filter.unacknowledgedOnly && a.acknowledged) return false;
        if (filter.severity && a.severity !== filter.severity) return false;
        if (filter.category && a.category !== filter.category) return false;
        if (filter.source && a.source !== filter.source) return false;
        return true;
      });
      out.sort(function(a,b){
        var pd = priorities[b.severity]-priorities[a.severity];
        return pd || (b.updatedAt-a.updatedAt);
      });
      return out.map(clone);
    }

    function highestActive(){ var l=list({activeOnly:true}); return l.length ? l[0] : null; }

    function trim(){
      if (alerts.size <= maxActive) return;
      var candidates = Array.from(alerts.values()).sort(function(a,b){
        if (a.resolved !== b.resolved) return a.resolved ? -1 : 1;
        return a.updatedAt - b.updatedAt;
      });
      while (alerts.size > maxActive && candidates.length){ alerts.delete(candidates.shift().id); }
    }

    function subscribe(fn){ listeners.add(fn); return function(){listeners.delete(fn);}; }
    function clearResolved(){ Array.from(alerts.values()).forEach(function(a){ if(a.resolved) alerts.delete(a.id); }); notify('alert.cleared-resolved', {}); }

    return { push:push, update:update, acknowledge:acknowledge, resolve:resolve, remove:remove, list:list, highestActive:highestActive, subscribe:subscribe, clearResolved:clearResolved };
  }

  global.OSKOAlertCenter = { create:create };
})(typeof window !== 'undefined' ? window : globalThis);
