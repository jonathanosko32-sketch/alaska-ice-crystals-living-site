# AI HANDOFF — LAYOVER V8 — SEPTEMBER 10, 2026

1. Inspected/read before work: Osko’s clear v7 phone screenshot and feedback that the layout is good, animals still do not visibly move, the animated aurora bands come too far down over the mountains/yard, and people should be added near the fire; also reviewed the v7 source patch, current workflow, version metadata, and prior handoff history.

2. Changed: preserved v7 and created separate branch `layover-living-life-v8-test`. Added `android-launcher-phonefix/apply_v8_life_patch.py`, which keeps the aurora animation higher in the sky with thinner/narrower bands, adds six seated people around the fire with subtle movement, and makes existing animal regions visibly move by gently re-drawing their own protected artwork regions with small offsets while retaining horse-tail motion. Existing clear yard layout, professional panels, drag/pinch, dark OSKO All Apps, snow, fire, smoke, Aurora route, LIFE/SNOW/LOCK/RESET, and hotspots remain. Version is `2.7.0-living-layover-v8`, versionCode `107`.

3. Exact checkpoint: branch `layover-living-life-v8-test`; v8 patch commit `3af56f1401bb4c234c2cff7562ff6bc441602280`; workflow commit `96f2deecd5ed23987b9b55e5ef678b35c7e797a3`; version/head commit `02f51a5a09381ebac7373252e8f0fa84e209690d`; GitHub Actions run `34436235124` succeeded. Final signed APK is `OSKO-Living-Layover-v8-CLEAR-SIGNED.apk`, Drive ID `16AA4_NKKkQn9mtrYpWbAaoS_QYGe4J87`.

4. Tested: GitHub Actions completed successfully. Final APK was rebuilt with the preserved clear 1536x1024 Layover background, signed with the permanent OSKO launcher certificate, and `apksigner` verified APK Signature Scheme v2 and v3 with one RSA-4096 signer.

5. Protected/not changed: v7 clear signed APK, v6/v5/v4 checkpoints, `launcher-usability-fix`, main branch, permanent HOME launcher, school/robot masters, prior APK history, and signing key were not deleted or promoted.

6. Remaining risk/uncertainty: phone visual testing is required. The master yard remains a flattened image, so animal motion is controlled image-region animation rather than fully separated photoreal animal sprites; coordinates may need tuning. People are code-drawn seated figures, not separate photographed characters. `SkieCbActivity` is intentionally not changed yet; Osko wants SKIE/CB after this Layover pass is accepted.

7. Next step: install v8 and verify aurora stays high in the sky, people are visible near the fire, and animals visibly move with LIFE on. If approved, set this direction as the Layover checkpoint, then do the separate SKIE CB Channel 27 integration pass.

8. Phone-safe build link: https://drive.google.com/file/d/16AA4_NKKkQn9mtrYpWbAaoS_QYGe4J87/view?usp=drivesdk
