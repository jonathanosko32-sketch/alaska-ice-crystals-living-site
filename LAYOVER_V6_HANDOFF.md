# LAYOVER V6 — CURRENT CHECKPOINT

## MANDATORY NEXT-AI HANDOFF NOTE RULE

This rule applies to every ChatGPT/AI/model/tool that works on this project. Before ending a substantial work session, changing models, handing the task to another AI, or reaching a stopping point, the current AI MUST leave a dated handoff note in every current handoff record for each project area it changed.

Each note must include: (1) what was inspected/read before work started, (2) what was changed, (3) the exact current working version, branch, file, build, or checkpoint, (4) what was tested and the result, (5) what was NOT changed and must remain protected, (6) every remaining problem, uncertainty, failed attempt, or risk, (7) the next recommended step, and (8) any direct phone-safe link Osko needs to open the current build.

Never erase an older handoff note. Append the new dated note and preserve the full history. Every new handoff file created in the future MUST contain this same rule.

## HANDOFF NOTE — SEPTEMBER 9, 2026 — VISIBLE LIVING MOTION TEST V6

1. Inspected/read before work: Osko’s v5 phone screenshots and feedback that the layout/panels were excellent but the movement was not visibly showing, plus the current v5 activity, manifest, version metadata, workflow, and existing handoff.
2. Changed: preserved v5 and built a separate v6 test. Added `LayoverLivingV6Activity.kt` with continuous `postInvalidateOnAnimation()` scheduling and stronger visible motion: heavier falling snow, broader/faster waving aurora bands, larger fire flicker/flames/glow, drifting smoke, stronger pulsing property lights, seated-person idle/arm motion, animal motion cues, eagle wing motion, Aurora road/fire route motion cue, and newly requested horse-tail swishing. Professional picture-top scrollable panels, drag/pinch, hotspots, SNOW/LIFE/LOCK/RESET, and the approved yard layout remain. Version bumped to `2.5.0-living-layover-v6` / versionCode `105`.
3. Exact checkpoint: branch `layover-living-motion-v6-final-source`. New activity commit `2ea5009e557f7ff091bbe0d50d15d923923a1741`. Manifest commit `cf25f69b6b3c03ba95cf510ced7d6aaee998401c`. Version commit `500bebaae6d8b08f0402d479fe34be9df1af6545`. Workflow/head `eb29d401a2fb27784cd35b653215f5d4b8673d34`. GitHub Actions run `34432896749` succeeded. Final phone APK: `OSKO-Living-Layover-v6-SIGNED.apk`, Drive ID `1Yg14sMrUGfyEZsHJJhWtsSCOnceKcLZU`.
4. Tested: GitHub Actions compile/build succeeded. Final APK was patched with the preserved full-resolution 1536×1024 Layover artwork, signed with the permanent OSKO launcher key, `apksigner` verified v2/v3 signatures, and the embedded Layover image was re-opened and confirmed at 1536×1024.
5. Protected/not changed: v5 branch/build, locked v4 checkpoint, `launcher-usability-fix`, permanent HOME launcher, main branch, prior APK history, school/robot masters, and signing key were not deleted or promoted.
6. Remaining risk/uncertainty: phone visual testing is required. The base yard artwork remains flattened, so people/animals/Aurora are animated overlay motion cues rather than fully separated photoreal character sprites. Horse-tail motion is an overlay aligned to first-pass horse positions and may need coordinate tuning after phone testing. The source branch still carries the repository placeholder background; the final signed APK contains the full-resolution image.
7. Next step: install v6 and check specifically whether snow, aurora, fire, smoke, lights, people, animals, Aurora, eagle, and horse tails are visibly moving while drag, pinch, and panels continue working. Do not promote until Osko approves.
8. Phone-safe build link: https://drive.google.com/file/d/1Yg14sMrUGfyEZsHJJhWtsSCOnceKcLZU/view?usp=drivesdk
