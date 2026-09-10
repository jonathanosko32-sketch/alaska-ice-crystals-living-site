# V11 CODED DUPLICATE — CURRENT STATUS

## READ THIS FIRST

This branch is the safe working copy for converting Osko's V11 Living Layover into one coherent coded master. Do not edit the protected V11 branch while this work is being tested.

## User's current instruction

Code the duplicate as one coordinated system first; then Osko will inspect it on the phone. The world must be zoomable, movable, and expandable so roads, buildings, trucks, Aurora movement, AI/voice, website control, and later robot control can be added without tearing the system apart.

## Branch

`v11-coded-duplicate`

## Current architecture

The main Android Living Layover source was replaced on this duplicate branch with a consolidated `LivingWorldMasterView` inside:

`android-launcher-phonefix/app/src/main/java/com/osko/launcher/LayoverLivingV6Activity.kt`

It now uses one normalized world-coordinate system for:
- background/world placement
- one-finger pan
- pinch zoom
- +/- zoom controls
- reset
- movement lock
- hotspot locations
- a coded road/path layer
- Aurora route movement
- fire
- smoke
- people around the fire
- basic animal-life motion cues
- waving flag
- eagle movement
- snow
- HQ / truck / workshop / CB / Aurora / gate / lake / animals / eagle / tower hotspots
- school link
- installed-app access

All future objects should be placed in world coordinates, not raw phone-screen coordinates, so zoom/pan moves everything together.

## SKIE CB

`SkieCbActivity.kt` is now coded directly instead of depending on the legacy V11 patch for the duplicate branch.

Current duplicate behavior:
- Channel 27
- endpoint defaults to `/api/skie-session-ptt`
- WebRTC SDP connection to OpenAI Realtime
- microphone disabled until connected
- press PTT: cancel active response if needed, clear input buffer, enable mic, TX state
- release PTT: disable mic, commit input buffer, create response
- RX/TX state handling
- pointer capture/cancel protection against stuck microphone
- API key remains server-side; never put the API key in APK/GitHub/chat

Live voice still requires the Vercel server-side `OPENAI_API_KEY` to be configured and deployed.

## Test safety

The duplicate uses a separate Android package:
`com.osko.launcher.home.codedduplicate`

Label:
`OSKO Living Launcher CODED TEST`

This is deliberate so testing the duplicate does not overwrite the protected installed V11.

## Build flow

`.github/workflows/build-osko-phonefix.yml` now includes `v11-coded-duplicate` and builds this branch directly. The old V7/V8/V9/V10/V11 patch steps remain only for their legacy branches and do NOT run on the coded duplicate.

Latest known build run when this status file was written:
GitHub Actions run `34540936484` — in progress.

## Important commits in this phase

- `ce536f95710b0dce8efdfdbc758ed7d9d9621db1` — consolidated movable Living Layover master
- `6b95f6e74a989b79d3956e41e8d71e269eaf10cd` — direct SKIE CH27 PTT consolidation
- `57fbd27aeac9308067e178bd8d9564c97fd7c482` — duplicate direct-build workflow
- `a4a9884eed23ed0717903831a22731d8d98e7df9` — separate duplicate test package
- `f47221e753b8ef94410a1a8dfab1ade9a4cacb9c` — clear CODED TEST label

## Next AI instructions

1. Check the latest GitHub Actions run on branch `v11-coded-duplicate`.
2. If compile failed, inspect the build log and fix ONLY the duplicate branch.
3. If compile succeeds, retrieve the APK artifact for Osko to inspect.
4. Do not merge into protected V11.
5. Do not redesign the visual world from imagination. Preserve Osko's current `layover_background` as the visual reference/base until Osko supplies a picture for a specific replacement module.
6. Future roads/buildings/trucks/objects should be modular world-coordinate objects.
7. Aurora should follow approved world-coordinate paths/roads, not random screen movement.
8. Later AI/voice should interpret/rout commands, while OSKO permission logic decides what is allowed. Robot dangerous-motion safety remains local to the robot, not delegated solely to AI or the website.
9. Brand hierarchy: OSKO Ice Crystals is background parent/management/publisher; ALASKA ICE CRYSTALS is the prominent public-facing world/brand.
10. Do not delete prior patches or records; they are provenance/history even though the coded duplicate no longer depends on them during build.
