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
- `osko-android-host-core-v1.js` — Android-host boundary for phone hardware/services while OSKO updates remain separate from Android updates.
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
- `osko-system-supervisor-v1.js` — coordinates permissions, boot, diagnostics, persistence, recovery and protected update activation.
- `osko-permission-core-v1.js` — capability-based authority for user, modules, SKIE, UI, voice, spatial clients and future robots; safety-critical authority remains separate.
- `osko-user-data-vault-v1.js` — user-owned namespaced data kept separate from code/visual releases, with protected keys and import/export support.
- `osko-robot-fleet-core-v1.js` — SKIE-centered logical fleet for four robot work bodies, with connection, dock, battery, readiness, fault, capability and job state; no motor control. Permission calls are aligned to `OSKOPermissionCore.evaluate/require`.
- `osko-robot-job-core-v1.js` — simulator-first SKIE robot job queue/dispatcher with protected job types blocked from autonomous execution. Permission calls are aligned to the real Permission Core API.
- `osko-dock-status-core-v1.js` — truthful phone/robot dock and charging state; never invents charging or battery telemetry.
- `osko-skie-robot-coordinator-v1.js` — central SKIE coordination layer for the four robot work bodies. Creates a restricted SKIE permission principal, translates approved intents into simulation jobs, dispatches work, sends robots to dock, and blocks protected/physical actions.
- `osko-robot-simulation-core-v1.js` — safe Living OS simulation runner for robot jobs such as move, patrol, dock, report and approved test-build checks. Advances logical steps and simulated telemetry only; never drives motors.
- `osko-wildlife-v1.js` — first standalone wildlife system.
- `osko-wildlife-v2.js` — expanded wildlife schedules/state/behavior work.
- `osko-wildlife-awareness-v1.js` — read-only wildlife awareness and safe alerts; no autonomous confrontation.

## Integration harnesses

`TEST/OSKO-Living-OS-MODULE-HARNESS-v3.html` is the general isolated integration harness for lifecycle, persistence, journal, actions, camera, binding and readiness.

`TEST/OSKO-Living-OS-SKIE-4-ROBOTS-HARNESS-v1.html` is the dedicated SKIE + four-robot phone-first integration harness. It loads Event Bus, Permission Core, Robot Fleet, Robot Job Core, Dock Status, SKIE Robot Coordinator and Robot Simulation Core together. It checks that all four work bodies initialize and become ready, SKIE is permission-restricted, protected physical requests are blocked, false charging is rejected, four simultaneous simulated jobs are distributed across four distinct robots, all simulations complete, and a test-build job ends in report-only/no-activation mode. Its inline JavaScript was syntax-checked with Node before upload. It is a development test, not a stable visual Living OS build and not physical robot control.

Neither harness modifies FIX8 or V11, owns the Three.js render loop, promotes releases, or controls physical robot/vehicle hardware.

## Current architecture direction

Build clean modular systems first. Connect them through shared state, events, actions and explicit contracts. Avoid wrapper-on-wrapper stacking and avoid replacing the main render loop blindly.

Touch, voice, future spatial controls and SKIE should call the same deterministic action layer. SKIE is the central coordinating brain for the Living OS ecosystem. The four robots are connected work bodies/resources under SKIE coordination, not four unrelated AI brains. Each physical body must still keep local deterministic safety control for motors, balance, battery, thermal protection, sensors and emergency stop.

Robot work should be proved in the game-based Living OS simulation first. SKIE may assign approved jobs, route robots through the property, send them to dock, inspect simulated targets, run approved test checks and report results. Protected release promotion, protected-file modification, safety disablement and unproved physical actuation are not autonomous robot jobs.

Dock/charging presentation must stay truthful: show CHARGING only from real charging telemetry, otherwise use connected/docked/ready states. The phone should show all four robots without running four full independent AI brains.

Phone deployment should keep code/releases separate from persistent user data. Candidate builds are staged and verified separately from the stable installed release; approved releases can activate without treating the user data vault as disposable. Recovery and rollback remain available if a candidate fails.

Wildlife and domestic/ranch animals remain behaviorally separate. Wildlife awareness can report danger but does not authorize robots to confront animals.

## Delivery rule for Osko

When a new visual Living OS build or phone-check harness is ready for Osko to check, send:

1. the direct tap-ready GitHub Pages link for the new test build/harness;
2. directly underneath it, the current known-working FIX8 link;
3. a clear label saying whether the new build was phone-confirmed, syntax-checked only, or untested.

Never send only a repo path, blob/source page, or commit SHA and expect Osko to assemble the link.

Current confirmed fallback:

`https://jonathanosko32-sketch.github.io/alaska-ice-crystals-living-site/TEST/OSKO-Living-OS-FIRST-BUILD-v1-FIX8.html`
