# LAYOVER HQ LIBRARY HANDOFF — 2026-09-09

## What was inspected
- `AI_HANDOFF_READ_FIRST.md`
- main `index.html`
- main `app.js`
- `TEST/v213-hq-master-library-standalone.html`

## What changed
- Added `hq-library-v213.js` on main.
- Updated main `index.html` to load `hq-library-v213.js` after the existing Living Site scripts.
- The Headquarters node now exposes an `OPEN SCHOOL / HQ LIBRARY` button that opens `TEST/v213-hq-master-library-standalone.html`.

## Current checkpoint
- Library source remains `TEST/v213-hq-master-library-standalone.html`.
- New connector script commit: `ae8edefc7dce1e3633b342440744d9cad4d53120`.
- Main index connection commit: `5f92148ec5703cccd57bed647e09b6f6bbb7edc5`.

## Protected / not changed
- V212 school campus remains unchanged.
- V213 standalone library remains unchanged and preserved.
- Existing gate, property, workshop, store, 360 viewer and other Living Site scripts were not redesigned or removed.

## Test / remaining risk
- Code connection is in place. Phone/browser visual tap-through still needs Osko verification on the deployed site.
- If deployment caching delays the new button, reload the Living Site and enter Headquarters again.

## Next step
- Osko should open the Living Site, enter the property, tap `Headquarters`, then tap `OPEN SCHOOL / HQ LIBRARY` and confirm it opens V213 on the phone.

## 2026-09-13 — V102 OS Updates surface

- Inspected before work: `AI_HANDOFF_READ_FIRST.md`, `00_OSKO_OS_FOUNDATION_READ_FIRST.md`, `00_PROTECTED_BASELINES_READ_FIRST.md`, and the current `TEST/OSKO-Living-OS-HQ-ALL-CABINS-v101.html` build.
- Changed: created the additive `TEST/OSKO-Living-OS-HQ-ALL-CABINS-v102.html` build. Added a phone-friendly `UPDATES` surface with current HQ/living-world notices and a locally saved update/reminder field.
- Current checkpoint: `TEST/OSKO-Living-OS-HQ-ALL-CABINS-v102.html` (new file beside v101; v101 remains preserved).
- Tested: all embedded JavaScript blocks parse successfully with Node (`JS syntax OK`).
- Protected and not changed: HQ sign geometry, gate, house signs, lighting/weather engine, animals, mountains, and v101 source.
- Remaining risk: the update shelf is local phone storage only; a connected update service still needs to be designed and added later.
- Next recommended step: add physical room/open-door behavior to the building workspaces, one controlled slice at a time.
- Phone-safe build link after publish: `https://jonathanosko32-sketch.github.io/alaska-ice-crystals-living-site/TEST/OSKO-Living-OS-HQ-ALL-CABINS-v102.html?v=102`

## 2026-09-13 — Phone installer and owner-approved updates v6

- Inspected before work: permanent phone-delivery and Android launcher rules, existing phone installer v5, its manifest, service worker, update client, Android host contract, and release registry.
- Changed: created separate v6 phone installer files. The installer runs the protected FIX8 release by default and offers the v102 living-world build as an owner-approved test update. Update checks run once per minute while open and immediately when OSKO returns to the foreground.
- Current checkpoint: `TEST/phone/OSKO-Living-OS-PHONE-INSTALL-v6.html`, `manifest-v6.webmanifest`, `sw-v6.js`, and `releases-v3.json`.
- Tested: embedded JavaScript, service-worker JavaScript, manifest JSON, and release-registry JSON all parse successfully. Local HTTP cross-process verification was unavailable; phone installation and fullscreen behavior remain unconfirmed until published and tested on Osko's phone.
- Protected and not changed: v5 phone installer, FIX8 fallback, Microsoft Launcher/One UI Home, existing icons, update client, scanner, HQ/cabin v101 and v102 visuals, and the main gate.
- Remaining risk: this is an installable web app, not yet a signed Android APK. Chrome/Android must accept the install prompt from the hosted HTTPS page. Candidate v102 must be tested and explicitly kept before it becomes active on the phone.
- Next recommended step: publish v6, install it alongside the existing launcher, test RUN OS/fullscreen, then use UPDATES → TEST UPDATE → KEEP UPDATE only after v102 works correctly.
- Phone installer link after publish: `https://jonathanosko32-sketch.github.io/alaska-ice-crystals-living-site/TEST/phone/OSKO-Living-OS-PHONE-INSTALL-v6.html?v=6`

## 2026-09-13 — CURRENT PHONE TRUTH AFTER REAL OSKO PHONE TESTS

This section supersedes the earlier unconfirmed phone assumptions above. Read it before touching the phone build.

### What is actually installed

- Osko installed the PWA from the v6 phone installer. It appears on his Android home screen as the dark-blue **OSKO star icon**.
- The installed OSKO star is a standalone web app that currently uses Chrome/Android's web engine underneath. It is not yet a signed native Android APK and it is not yet a replacement Android launcher.
- The v6 shell provides `RUN OS`, `INSTALL`, `SCAN`, and `UPDATES`, with owner-controlled `TEST UPDATE`, `KEEP UPDATE`, `REJECT UPDATE`, `ROLL BACK`, and `USE FIX8` actions.
- The release registry checks while the app is open and when it returns to the foreground. No candidate is supposed to become the approved master merely because it was published.

### Real phone results — do not misreport these as successes

- FIX8 remains the protected rollback: `TEST/OSKO-Living-OS-FIRST-BUILD-v1-FIX8.html`.
- Direct FIX8 in Chrome initially moved very fast with very little lag, but Osko later reported that it could also slow down after being open. Therefore FIX8 is the best known foundation, not a confirmed permanent performance fix.
- v102 added the OS Updates surface and was published as a test candidate.
- v103 enlarged phone UI through a width-limited media query, but Osko's installed-app screenshots showed the top controls and bottom `HOME / NEAR / SKIE / LIFE` controls still far too small. Do not claim the large-button issue is fixed.
- v104 attempted 30 FPS, reduced pixel ratio, fewer snow/smoke effects, simplified phone shadows, and pause-when-hidden behavior. Osko reported it still ran slowly.
- v105 reduced the workload more aggressively and limited the phone to 20 FPS. This made control and movement substantially worse; Osko could hardly move the world.
- v106 restored unrestricted movement while retaining reduced phone effects. Osko reported it was better and worse at the same time: visually faster, but with serious control lag.
- v107 tried 30 FPS with stronger camera following and fewer effects. Osko reported it was unusable and could not do anything with it. **Do not build forward from v107. Do not tell Osko to keep v107.**
- Current correct recovery instruction is to use direct FIX8 while a new phone foundation is prepared. Preserve every prior file; do not overwrite or delete them.

### Correct next phone-development method

1. Start from the protected FIX8 movement/rendering behavior, in a new version. Do not stack another patch on v104-v107.
2. Measure and isolate the actual slowdown before adding features. Check sustained rendering, heat/throttling, open OSKO tabs/windows, WebGL draw calls, memory growth, weather effects, and installed-shell/iframe overhead.
3. Make controls large **unconditionally in the installed phone layout**, not only under a media query that may fail inside the PWA/iframe. The owner must be able to see and press recovery/update controls even when the 3D world is struggling.
4. Keep update/recovery controls outside the heavy 3D render surface. A lagging world must not prevent `ROLL BACK` or `USE FIX8`.
5. Change one performance factor at a time and have Osko test it for several minutes and after reopening. Never label a build stable until Osko explicitly confirms it.
6. Maintain separate phone and computer profiles. Phone is a lighter responsive controller/living world; computer can carry full-detail 3D buildings, animals, lighting, signs, school, and later robot functions.

### Product direction that must be preserved

- Buildings are functional OS objects, not decorative buttons or ordinary folders.
- A building should open in a special physical sequence: camera approaches, doors open, roof/wall/room transitions reveal the interior, and rooms/shelves/tools represent apps and content. `HOME` returns to the yard.
- Start with one building, likely `School & Library`, agree on its physical opening sequence with Osko, then reuse the approved system for other buildings.
- School & Library is intended to hold books, the Bible, Webster's Dictionary, GED through college-level learning, page-turn effects, and later SKIE voice reading/assistance. Only licensed/public-domain/user-owned content may be bundled.
- Workshop, Robot Garage, HQ, Aurora and other buildings will each hold their own tools/apps/workspaces.
- OSKO should eventually be packaged as a signed Android app that opens full-screen, can use carefully approved location/microphone/camera/file permissions, and receives owner-approved updates. Keep Microsoft Launcher and One UI Home available during testing as a safe return path.
- After the usable phone app is stable, a bootable computer OSKO system may be developed. A practical build can boot directly into the custom OSKO environment using a low-level hardware-compatible foundation while hiding the conventional desktop. An entirely new kernel/driver ecosystem is a separate multi-year engineering program and must not be promised as a quick follow-on.
- The phone and computer editions belong to one OSKO / Alaska Ice Crystals system and should receive separate, hardware-appropriate builds and updates.

### Immediate next action

- Do not add more visual features yet. First create a clean FIX8-derived phone performance test with genuinely large always-visible controls and independent recovery. Test the direct build and installed OSKO star separately before resuming School & Library construction.
