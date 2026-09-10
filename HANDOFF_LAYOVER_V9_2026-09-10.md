# HANDOFF — LAYOVER V9 LIVING MOTION TEST — SEPTEMBER 10, 2026

1. Inspected/read before work: v8 motion patch, current Layover activity, workflow, install-compatible version metadata, and Osko's request to make animals, the flag, and Aurora visibly move while keeping the approved clear Layover.
2. Changed: preserved v8 and created branch `layover-living-motion-v9-test`. Added `android-launcher-phonefix/apply_v9_living_motion_patch.py` with stronger whole-animal stepping/breathing/head/ear motion, retained horse-tail swishing, added a waving U.S. flag animation near HQ, and replaced the simple Aurora route marker with a clearly moving dog-shaped code-rendered sprite following the road/fire route with stepping legs, tail swish, and pink scarf. Existing high-sky aurora, snow, fire, smoke, people, professional panels, dark All Apps, drag/pinch, hotspots, and layout remain.
3. Exact checkpoint: branch `layover-living-motion-v9-test`; source head `b8d6bc076dde173608c7f978fa9871f3bdd90625`; versionCode 1009; versionName `2.8.0-living-layover-v9-motion`; GitHub Actions run `34437950396` succeeded. Final signed APK `OSKO-Living-Layover-v9-CLEAR-SIGNED.apk`, Drive ID `1J7YkLstZpIigtPl3JIV6uAs7gMk9pk31`.
4. Tested: v7, v8, and v9 patch steps all succeeded; Gradle build succeeded; final APK was repacked with preserved clear 1536x1024 Layover background and apksigner verified APK Signature Scheme v2/v3 with the permanent OSKO key.
5. Protected/not changed: v8 install-fix build, v7 clear build, v6/v5/v4 checkpoints, `launcher-usability-fix` known-good fallback, main branch, permanent HOME launcher, SKIE CB, school/robot masters, and signing key were not deleted or promoted.
6. Remaining risk: yard art remains one flattened image. Animal animation therefore uses controlled re-rendered image regions and may show minor ghosting/patch edges. Aurora's moving dog is code-rendered rather than a separated photoreal sprite. Exact placement/strength requires Osko phone testing.
7. Next step: install v9 and confirm flag waves, Aurora visibly travels the road/fire route, and animals visibly step/breathe without hurting clarity. If approved, lock this as the Layover checkpoint before separate SKIE CB Channel 27 integration.
8. Phone-safe build: https://drive.google.com/file/d/1J7YkLstZpIigtPl3JIV6uAs7gMk9pk31/view?usp=drivesdk

## Mandatory next-AI note rule
Before leaving substantial work, append a dated note stating what was read, changed, exact checkpoint, tests, protected versions, remaining risks, next step, and phone-safe link. Preserve prior history.
