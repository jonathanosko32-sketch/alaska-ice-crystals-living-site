# OSKO LIVING OS — CURRENT MODULE INVENTORY

Updated: September 11, 2026

## Protection rule

`OSKO-Living-OS-FIRST-BUILD-v1-FIX8.html` remains the current user-confirmed working visual build. V11 is also a protected visual/master reference. These modules are being developed beside those protected builds. Do not overwrite, simplify, delete, or force new modules into FIX8/V11 until a clean integration build is prepared, verified, and phone-confirmed.

## Current modules

- `osko-world-state-v1.js` — shared world state.
- `osko-event-bus-v1.js` — shared event bus.
- `osko-action-core-v1.js` — deterministic object/action layer.
- `osko-environment-core-v1.js` — time, season, weather and environment state.
- `osko-object-registry-v1.js` — object identity, permissions and capabilities.
- `osko-performance-v1.js` — adaptive phone/device performance quality.
- `osko-route-core-v1.js` — logical routing and movement planning.
- `osko-state-persistence-v1.js` — snapshots, checkpoints and restore support.
- `osko-device-bridge-v1.js` — phone/foldable/spatial/device capability bridge; not physical motor control.
- `osko-voice-intent-v1.js` — SKIE voice intent routing into deterministic actions.
- `osko-safety-policy-v1.js` — safety boundary for high-risk actions and robot-control separation.
- `osko-routine-core-v1.js` — routines, time/condition-driven behaviors.
- `osko-alert-center-v1.js` — central alert, acknowledge and resolve state.
- `osko-communications-core-v1.js` — communications-tower logical channels/services.
- `osko-world-presence-core-v1.js` — logical presence/occupancy for people, Aurora, robots, vehicles and wildlife.
- `osko-diagnostics-core-v1.js` — read-only health checks and diagnostics history.
- `osko-camera-navigation-v1.js` — phone-first pan, zoom, home target and tap-vs-drag handling.
- `osko-scene-binding-v1.js` — safe logical-object to Three.js scene binding without owning the render loop.
- `osko-runtime-core-v1.js` — modular runtime coordinator; no physical motor control and no render-loop takeover.
- `osko-module-selftest-v1.js` — read-only presence/API-shape checks for modular OS components.
- `osko-power-utility-core-v1.js` — logical property power, battery, solar, generator, water and fuel state.
- `osko-scene-state-sync-v1.js` — pushes logical OS state into bound visible scene objects safely.
- `osko-interaction-router-v1.js` — shared input path for touch, voice, UI and future spatial controls.
- `osko-scene-manifest-v1.js` — stable IDs for major property/world objects.
- `osko-offline-core-v1.js` — offline/degraded capability state and graceful loss-of-cloud behavior.
- `osko-library-index-v1.js` — School & Library collection/index/search foundation.
- `osko-skies-context-core-v1.js` — SKIE advisory context/planning support; not safety-critical authority.
- `osko-notification-router-v1.js` — shared routing for wildlife, weather, robot, property and SKIE notices.
- `osko-boot-recovery-core-v1.js` — startup checks, degraded mode and state recovery support.
- `osko-command-journal-v1.js` — command/event journal with common secret-field redaction.
- `osko-integration-manifest-v1.js` — loader-only manifest for isolated integration testing.
- `osko-visual-integration-bridge-v1.js` — clean logical-to-visual bridge without taking over rendering.
- `osko-integration-readiness-v1.js` — required-module/API gate before visual integration can advance.
- `osko-integration-session-v1.js` — tracks staged integration, tests, warnings, readiness and proof state.
- `osko-visual-state-adapters-v1.js` — reusable visual state adapters for basic objects, lights, gates and expandable objects.
- `osko-property-integration-core-v1.js` — coordinates property identities, bindings, camera targets and world state.
- `osko-lifecycle-core-v1.js` — startup, pause, resume, checkpoint, tick and logical shutdown lifecycle.
- `osko-visual-smoke-test-v1.js` — read-only visual integration smoke tests.
- `osko-binding-plan-v1.js` — required/optional logical binding plan for property objects.
- `osko-update-core-v1.js` — staged release verification, activation and rollback with protected versions.
- `osko-system-boot-v1.js` — boot coordinator from saved-state restore through diagnostics into runtime.
- `osko-release-channel-core-v1.js` — development/test/stable release-channel control with phone-confirmation requirement for stable promotion.
- `osko-state-migration-core-v1.js` — schema migration path for saved data across future OS versions.
- `osko-recovery-supervisor-v1.js` — recovery-mode coordinator for diagnostics, checkpoint restore and update rollback.
- `osko-permission-core-v1.js` — capability-based authority for user, modules, SKIE, UI, voice, spatial clients and future robots; safety-critical authority remains separate.
- `osko-user-data-vault-v1.js` — user-owned namespaced data kept separate from code/visual releases, with protected keys and import/export support.
- `osko-wildlife-v1.js` — first standalone wildlife system.
- `osko-wildlife-v2.js` — expanded wildlife schedules/state/behavior work.
- `osko-wildlife-awareness-v1.js` — read-only wildlife awareness and safe alerts; no autonomous confrontation.

## Integration harness

`TEST/OSKO-Living-OS-MODULE-HARNESS-v3.html` is the newest isolated integration harness. It extends the earlier harnesses with lifecycle, persistence, journal, action, camera, binding and readiness checks. It does not modify FIX8 or V11, own the Three.js render loop, or control physical robot/vehicle hardware.

The harness is a development checkpoint, not a replacement visual Living OS build. It must not be called stable until its required checks pass and a new visual integration build is phone-confirmed.

## Current architecture direction

Build clean modular systems first. Connect them through shared state, events, actions and explicit contracts. Avoid wrapper-on-wrapper stacking and avoid replacing the main render loop blindly.

Touch, voice, future spatial controls and SKIE should call the same deterministic action layer. Safety-critical robot behavior stays separate from convenience AI/voice features.

Phone deployment should keep code/releases separate from persistent user data. Candidate builds are staged and verified separately from the stable installed release; approved releases can activate without treating the user data vault as disposable. Recovery and rollback remain available if a candidate fails.

Wildlife and domestic/ranch animals remain behaviorally separate. Wildlife awareness can report danger but does not authorize robots to confront animals.

## Delivery rule for Osko

When a new visual Living OS build is ready for Osko to check, send:

1. the direct tap-ready GitHub Pages link for the new test build;
2. directly underneath it, the current known-working FIX8 link;
3. a clear label saying whether the new build is phone-confirmed, syntax-checked only, or untested.

Never send only a repo path, blob/source page, or commit SHA and expect Osko to assemble the link.

Current confirmed fallback:

`https://jonathanosko32-sketch.github.io/alaska-ice-crystals-living-site/TEST/OSKO-Living-OS-FIRST-BUILD-v1-FIX8.html`
