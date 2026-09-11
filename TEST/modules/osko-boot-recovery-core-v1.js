(function (global) {
  'use strict';

  function create(options) {
    options = options || {};
    var eventBus = options.eventBus || null;
    var diagnostics = options.diagnostics || null;
    var persistence = options.persistence || null;
    var requiredModules = Array.isArray(options.requiredModules) ? options.requiredModules.slice() : [];
    var phase = 'cold';
    var degraded = false;
    var lastBoot = null;
    var history = [];
    var maxHistory = Math.max(10, Number(options.maxHistory) || 80);

    function emit(type, data) {
      if (eventBus && typeof eventBus.emit === 'function') {
        try { eventBus.emit(type, data); } catch (e) {}
      }
    }

    function record(type, data) {
      var entry = {
        at: Date.now(),
        type: String(type || 'event'),
        data: data || null
      };
      history.push(entry);
      if (history.length > maxHistory) history.splice(0, history.length - maxHistory);
      emit('boot:record', entry);
      return entry;
    }

    function checkRequiredGlobals(root) {
      root = root || global;
      var missing = [];
      var present = [];
      requiredModules.forEach(function (name) {
        if (root && root[name]) present.push(name);
        else missing.push(name);
      });
      return { present: present, missing: missing, ok: missing.length === 0 };
    }

    function runDiagnostics() {
      if (!diagnostics) return { ok: true, skipped: true, result: null };
      try {
        var result = typeof diagnostics.runAll === 'function' ? diagnostics.runAll() : null;
        if (result && typeof result.then === 'function') {
          return result.then(function (value) {
            var summary = typeof diagnostics.summary === 'function' ? diagnostics.summary() : null;
            return { ok: !summary || summary.healthy !== false, skipped: false, result: value, summary: summary };
          });
        }
        var summary = typeof diagnostics.summary === 'function' ? diagnostics.summary() : null;
        return { ok: !summary || summary.healthy !== false, skipped: false, result: result, summary: summary };
      } catch (error) {
        return { ok: false, skipped: false, error: String(error && error.message || error) };
      }
    }

    function restoreState() {
      if (!persistence || typeof persistence.load !== 'function') return { ok: true, skipped: true, state: null };
      try {
        return { ok: true, skipped: false, state: persistence.load() };
      } catch (error) {
        return { ok: false, skipped: false, error: String(error && error.message || error) };
      }
    }

    function finishBoot(moduleCheck, diagnosticsResult, restoreResult) {
      var diagnosticsOk = !diagnosticsResult || diagnosticsResult.ok !== false;
      var restoreOk = !restoreResult || restoreResult.ok !== false;
      degraded = !moduleCheck.ok || !diagnosticsOk;
      phase = degraded ? 'degraded' : 'ready';
      lastBoot = {
        at: Date.now(),
        phase: phase,
        degraded: degraded,
        modules: moduleCheck,
        diagnostics: diagnosticsResult,
        restore: restoreResult,
        recoveryRecommended: !restoreOk || degraded
      };
      record('boot-complete', lastBoot);
      emit('boot:complete', lastBoot);
      return snapshot();
    }

    function boot(root) {
      phase = 'checking';
      degraded = false;
      record('boot-start', { requiredModules: requiredModules.slice() });
      emit('boot:start', { requiredModules: requiredModules.slice() });

      var moduleCheck = checkRequiredGlobals(root);
      record('module-check', moduleCheck);
      var restoreResult = restoreState();
      record('restore-state', restoreResult);
      var diagnosticsResult = runDiagnostics();

      if (diagnosticsResult && typeof diagnosticsResult.then === 'function') {
        return diagnosticsResult.then(function (resolved) {
          record('diagnostics', resolved);
          return finishBoot(moduleCheck, resolved, restoreResult);
        }).catch(function (error) {
          var failed = { ok: false, error: String(error && error.message || error) };
          record('diagnostics', failed);
          return finishBoot(moduleCheck, failed, restoreResult);
        });
      }

      record('diagnostics', diagnosticsResult);
      return finishBoot(moduleCheck, diagnosticsResult, restoreResult);
    }

    function safeMode(reason) {
      degraded = true;
      phase = 'safe-mode';
      var data = { at: Date.now(), reason: reason || 'manual' };
      record('safe-mode', data);
      emit('boot:safe-mode', data);
      return snapshot();
    }

    function recover(label) {
      if (!persistence || typeof persistence.restore !== 'function') {
        var noPersistence = { ok: false, reason: 'persistence-unavailable' };
        record('recovery-failed', noPersistence);
        return noPersistence;
      }
      try {
        var result = persistence.restore(label);
        var ok = { ok: true, result: result, label: label || null };
        record('recovery-restored', ok);
        emit('boot:recovered', ok);
        return ok;
      } catch (error) {
        var failed = { ok: false, reason: String(error && error.message || error), label: label || null };
        record('recovery-failed', failed);
        return failed;
      }
    }

    function snapshot() {
      return {
        phase: phase,
        degraded: degraded,
        lastBoot: lastBoot,
        requiredModules: requiredModules.slice(),
        recent: history.slice(-20)
      };
    }

    return {
      boot: boot,
      safeMode: safeMode,
      recover: recover,
      snapshot: snapshot,
      checkRequiredGlobals: checkRequiredGlobals,
      history: function () { return history.slice(); }
    };
  }

  global.OSKOBootRecovery = { create: create };
})(typeof globalThis !== 'undefined' ? globalThis : this);
