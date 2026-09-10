# READ FIRST — V11 CODED DUPLICATE MASTER HANDOFF

Date: 2026-09-11
Active work branch: `v11-coded-duplicate`
Protected source branch: `layover-skie-cb-v11-test`

## NON-NEGOTIABLE RULE
Do **not** delete, rewrite, or experiment on the protected V11 source. All consolidation/rebuild work belongs on `v11-coded-duplicate` until Osko tests and approves it on the phone.

## WHAT OSKO IS BUILDING
This is not just a launcher skin or a picture with shortcuts. It is the Alaska Ice Crystals Living Layover: a phone-first, movable/zoomable coded world that becomes the visual and voice control front end for the larger system.

The Living Layover must eventually connect to:
- HQ / school / library
- SKIE and CB CH 27
- workshop / build systems
- truck tools
- Aurora area
- maps / weather / other approved tools
- website
- later OSKO OS and the service robots

Voice is intended to become a primary control layer across the system. Touch/hotspots remain as usable manual controls and backup.

## CURRENT REBUILD GOAL
The old V11 path was built by a base plus layered V7/V8/V9/V10/V11 patches. On this duplicate branch, consolidate those known-good behaviors into one coherent coded master instead of continuing to stack patch files.

Preserve the look and behavior Osko already built. Do not redesign from internet examples and do not replace his layout with generic artwork.

## WORLD / CAMERA REQUIREMENTS
The coded world must use one shared world-coordinate system so everything stays registered together.

Required phone behavior:
- one-finger drag/pan
- pinch zoom bigger/smaller
- RESET to known starting framing
- sensible zoom/pan limits so the property cannot be lost completely off-screen
- roads, buildings, Aurora, animals, trucks, hotspots and later moving objects all use the same world coordinates

This is critical because Osko wants to add pieces later from pictures without rebuilding the whole world.

## MODULAR FUTURE PIECES
After the coded master is stable, Osko wants to be able to give ChatGPT a picture of one piece and have only that piece coded/replaced/added while the rest of the world remains intact. Examples: truck, building, gate, sign, fire setup, animal area, shop interior.

## ROADS / AURORA PATHING
After the master is stable:
- add roads and driveways as world objects
- define explicit road/path points
- Aurora should be able to move up/down the road, stop, turn around, and later use approved alternate routes
- Aurora movement must stay registered correctly when the user zooms or pans the world

Use path-following in the same world-coordinate space; do not animate Aurora as a screen-space overlay detached from the map.

## AI / ROBOT ARCHITECTURE INTENT
Osko wants a small amount of free/local AI later to improve voice recognition, intent routing, and smoothness. Do not give that AI unrestricted authority.

Conceptual command flow:
User voice -> speech recognition -> small/free interpreter/router -> OSKO permission/allow-list layer -> approved destination/function

Destinations eventually include Living Layover, website, school/library, SKIE/CH27, truck/business tools, and robots.

Robot safety must remain local to the robot. The Living Layover/AI can request approved actions, but the robot's own deterministic safety layer must govern force/motion limits, collision avoidance, emergency stop, and degraded behavior.

## BRAND HIERARCHY
- OSKO Ice Crystals = background parent/management/publishing/funding/legal-business layer
- Alaska Ice Crystals = primary public-facing brand/world

Do not swap or collapse these names.

## PRESERVATION / HANDOFF RULE
Every meaningful step on this duplicate must be documented so another ChatGPT can resume without guessing.

At minimum document:
- current branch
- last known-good commit
- files changed
- what was completed
- what remains
- what must not be changed
- phone test result when available
- rollback point

If interrupted, the next AI should read this file first, inspect the latest commits on `v11-coded-duplicate`, and continue from the last documented stable point instead of restarting or rebuilding from assumptions.

## CURRENT KNOWN COMMITS
- Stable duplicate branch was created from the V11 source.
- Consolidation map commit: `db48e4104c12939ef89272f2665bf20194872d3a`
- Shared world-coordinate/foundation work commit: `6a91c0e3bc7870ad2a84e665fca98da92c78e220`

Do not merge this branch into the protected V11 or main production path until Osko explicitly approves after phone testing.
