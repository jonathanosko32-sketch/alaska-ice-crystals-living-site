# AI HANDOFF — V7 ANIMALS + DARK ALL APPS

Read `AI_HANDOFF_READ_FIRST.md` first. This note supplements it for the v7 TEST branch and does not replace older handoff history.

## MANDATORY NEXT-AI NOTE RULE
Before ending a substantial work session, changing models, handing the task to another AI, or reaching a stopping point, append a dated note stating: (1) what was inspected/read, (2) what changed, (3) the exact branch/file/build/checkpoint, (4) what was tested and the result, (5) what was not changed and must remain protected, (6) remaining problems/uncertainties/risks, (7) the next recommended step, and (8) the phone-safe build link. Never erase older handoff notes.

## HANDOFF NOTE — SEPTEMBER 9, 2026 — ANIMAL MOTION + DARK ALL APPS TEST V7

1. **Inspected/read before work:** Osko’s v6 phone feedback/request to code the animals and replace the plain white All Apps screen; v6 source activity; version metadata; workflow; current Layover handoff.
2. **Changed:** created separate TEST branch `layover-living-animals-v7-test`. Added `android-launcher-phonefix/apply_v7_animals_apps_patch.py`, which is applied only during this branch’s build. It strengthens visible animal motion cues with head turns, stepping, ear movement and tail swishes, while retaining the dedicated horse-tail pass. It also replaces the white Android `AlertDialog` All Apps list with a custom dark OSKO/cyan scrollable app yard showing app icons and names. Version bumped to `2.6.0-living-layover-v7` / `106`.
3. **Exact checkpoint:** branch `layover-living-animals-v7-test`; version commit `8626db126abcb8806bfa284484356cdf2d9c6d6a`; workflow/head `ece8a6684bb869199ae6e7e9e29c7a463fb0433d`; GitHub Actions run `34434690921` succeeded; final Drive APK `OSKO-Living-Layover-v7-SIGNED.apk`, ID `1v8rrbZp6xbZb5RWAj-htS-hcriYjnypJ`.
4. **Tested:** build-time patch step succeeded; Gradle build succeeded; final APK was signed with the permanent OSKO launcher key; `apksigner` verified v2 and v3 signatures with one RSA-4096 signer.
5. **Protected/not changed:** v6 signed APK/checkpoint, v5/v4 history, `launcher-usability-fix`, main branch, permanent HOME launcher, school/robot masters, and prior APK history were not promoted or replaced. The v6 source branch was restored after the v7 branch was cut; the temporary helper-file history remains in Git.
6. **Remaining risk/uncertainty:** the yard master remains a flattened image, so animal motion is animated overlay/body-part motion rather than fully isolated photoreal sprites. Phone testing is required to tune exact positions and motion strength. The new dark All Apps yard needs phone visual/touch confirmation.
7. **Next step:** install v7 over the test launcher; tap APPS to confirm the white list is gone; with LIFE on, watch the horses/moose/bison/wolf areas and report which movement is visible or misplaced. Do not promote until Osko approves.
8. **Phone-safe build:** https://drive.google.com/file/d/1v8rrbZp6xbZb5RWAj-htS-hcriYjnypJ/view?usp=drivesdk
