(function (global) {
  'use strict';

  function create(options) {
    options = options || {};
    var eventBus = options.eventBus || null;
    var persistence = options.persistence || null;
    var maxEntries = Math.max(100, Number(options.maxEntries) || 1000);
    var entries = [];
    var seq = 0;

    function emit(type, payload) {
      if (eventBus && typeof eventBus.emit === 'function') {
        try { eventBus.emit(type, payload); } catch (e) {}
      }
    }

    function sanitize(value, depth) {
      depth = depth || 0;
      if (depth > 4) return '[max-depth]';
      if (value == null || typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return value;
      if (Array.isArray(value)) return value.slice(0, 50).map(function (v) { return sanitize(v, depth + 1); });
      if (typeof value === 'object') {
        var out = {};
        Object.keys(value).slice(0, 80).forEach(function (key) {
          if (/password|secret|token|api.?key|credential/i.test(key)) out[key] = '[redacted]';
          else out[key] = sanitize(value[key], depth + 1);
        });
        return out;
      }
      return String(value);
    }

    function add(kind, data) {
      seq += 1;
      var entry = {
        id: 'j-' + seq,
        at: Date.now(),
        kind: String(kind || 'event'),
        source: String((data && data.source) || 'system'),
        action: data && data.action ? String(data.action) : null,
        objectId: data && data.objectId ? String(data.objectId) : null,
        status: data && data.status ? String(data.status) : null,
        input: sanitize(data && data.input),
        output: sanitize(data && data.output),
        note: data && data.note ? String(data.note) : null
      };
      entries.push(entry);
      if (entries.length > maxEntries) entries.splice(0, entries.length - maxEntries);
      emit('journal:entry', entry);
      return entry;
    }

    function command(data) { return add('command', data || {}); }
    function result(data) { return add('result', data || {}); }
    function decision(data) { return add('decision', data || {}); }
    function system(data) { return add('system', data || {}); }

    function query(filter) {
      filter = filter || {};
      var from = Number(filter.from || 0);
      var to = Number(filter.to || Number.MAX_SAFE_INTEGER);
      return entries.filter(function (e) {
        if (e.at < from || e.at > to) return false;
        if (filter.kind && e.kind !== filter.kind) return false;
        if (filter.source && e.source !== filter.source) return false;
        if (filter.status && e.status !== filter.status) return false;
        if (filter.objectId && e.objectId !== filter.objectId) return false;
        if (filter.action && e.action !== filter.action) return false;
        return true;
      });
    }

    function exportLog() {
      return {
        version: 1,
        exportedAt: Date.now(),
        count: entries.length,
        entries: entries.slice()
      };
    }

    function checkpoint(label) {
      var payload = exportLog();
      payload.label = label || 'journal';
      if (persistence && typeof persistence.checkpoint === 'function') {
        try { persistence.checkpoint(payload.label, payload); } catch (e) {}
      }
      emit('journal:checkpoint', { label: payload.label, count: payload.count });
      return payload;
    }

    function clear(options) {
      options = options || {};
      if (options.preserveDecisions) entries = entries.filter(function (e) { return e.kind === 'decision'; });
      else entries = [];
      emit('journal:cleared', { remaining: entries.length });
      return entries.length;
    }

    function recent(limit) {
      limit = Math.max(1, Math.min(maxEntries, Number(limit) || 50));
      return entries.slice(-limit);
    }

    return {
      add: add,
      command: command,
      result: result,
      decision: decision,
      system: system,
      query: query,
      recent: recent,
      exportLog: exportLog,
      checkpoint: checkpoint,
      clear: clear,
      count: function () { return entries.length; }
    };
  }

  global.OSKOCommandJournal = { create: create };
})(typeof globalThis !== 'undefined' ? globalThis : this);
