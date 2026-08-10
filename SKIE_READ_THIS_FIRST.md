# SKIE READ THIS FIRST — ALASKA ICE CRYSTALS LIVING WEBSITE

This repository is the master codebase for Osko's Alaska Ice Crystals living interactive website.

## HARD CONTINUITY RULES

1. DO NOT delete, replace, rewrite, simplify, or rebuild the project from scratch unless Osko explicitly orders it.
2. DO NOT substitute generic internet assets for approved OSKO assets. This project is created from the ground up.
3. DO NOT overwrite an approved working build to experiment. New work must preserve the last known good version.
4. Before editing, read this file, `BUILD_LOG.md`, and `SKIE_HANDOFF/CURRENT_STATE.md`.
5. If something is unclear, preserve the working version and ask Osko rather than guessing.
6. Camera, calculator, launcher, Skie, Aurora, trucks, buildings, animals, signs, and other OSKO elements are separate projects/assets and must not be casually replaced.
7. Every meaningful approved change must be committed with a clear message.
8. At the end of each work session, record what changed, what works, what failed, what is locked, and the next step.
9. Do not generate or redraw images unless Osko explicitly asks. Current property work is code/layout only.

## PURPOSE

This is not a template website. It is a living interactive Alaska Ice Crystals world. The property itself becomes the interface. Buildings, vehicles, Aurora, Skie, wildlife, fire, smoke, aurora, lights, water, and other elements can move and be interactive.

## CURRENT FOUNDATION — 2026-08-09

Repository owner: jonathanosko32-sketch
Repository: alaska-ice-crystals-living-site
Default branch: main
Primary phone test page: `land-test.html`

Current property state:
- Large acreage/land test is working and Osko approved the amount of available land.
- Entrance/gate is visible and the property can be entered smoothly.
- Finger swipe navigation is active; old on-screen 360 control pad is hidden.
- Vertical finger navigation is currently good and should not be changed unless Osko asks.
- Horizontal finger navigation was slowed again on 2026-08-09: `STEP_X=22`, `TURN_GAP=32` in `land-test-v9-finger-nav.js`.
- Store entry/exit is working smoothly after earlier sticking/freezing issues.
- Current code-built locations include the log workshop, Outfitters store, campfire, freight dock, truck yard, freight area, OSKO farm, log barn, and farm shop.
- The farm/buildings are code structures/placeholders, not replacements for future approved finished OSKO assets.
- Front gate and back-property districts are being spaced out to avoid crowding while keeping destinations close enough that the user does not feel lost.
- Osko wants all major buildings in this property style to remain log buildings unless he later changes that direction.
- Keep enough room for future roads, mountains, trees, additional buildings, animals, cabin/home, Aurora area, equipment, and other living-world features.

Current navigation priority:
- Keep swipe movement smooth on Android/Chrome.
- Do not make destinations so far apart that repeated swipes are needed just to find them.
- Do not crowd buildings/labels together.
- Keep front gate approach clear.

## RECENT USER-APPROVED DIRECTION

- Land size: approved; do not shrink it.
- Up/down swipe: approved as good.
- Side-to-side swipe: still being tuned slower for control.
- Layout: spread front and back districts, but not excessively far apart.
- Farm: continue as a real district with multiple log buildings and room for animals/equipment.
- Do not return to the earlier narrow-road-only layout.

## RECOVERY / HANDOFF

The master project must remain recoverable at all times.
A new AI/model should first read:
1. `SKIE_READ_THIS_FIRST.md`
2. `SKIE_HANDOFF/CURRENT_STATE.md`
3. `BUILD_LOG.md`
4. Current `land-test.html`
5. `land-test-v8.js` for property district/farm layout
6. `land-test-v9-finger-nav.js` for current finger navigation tuning

Do not guess at older versions when these current files are present.
