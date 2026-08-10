# SKIE — READ THIS FIRST BEFORE CHANGING ANYTHING

## Current protected working foundation
This project now has a working Living World V2 foundation. Treat the current working behavior as protected unless Osko specifically reports a problem with that behavior.

Current confirmed working pieces:
- 30,000 x 30,000 master world coordinate system.
- Fixed building/world addresses.
- Finger drag travel across the property.
- Pinch zoom with wide overview and close inspection.
- Property/minimap that matches the world.
- Roads and buildings staying planted in the same world.
- Headquarters building can be entered on mobile.
- Headquarters interior opens without destroying/rebuilding the outside world.
- Phone-first interaction is the primary test environment.

## DO NOT tear this foundation apart
Before modifying code, first inspect the current repository and read:
- `SKIE_HANDOFF/FIRST_WORLD_FAILURE_AND_REBUILD.md`
- this file

Do NOT return to the old 360 screen-sector architecture.
Do NOT rebuild the world foundation just because you prefer another architecture.
Do NOT delete working movement, zoom, map, world addresses, roads, or building-entry behavior unless Osko explicitly approves a replacement after the reason is explained.

## Required working method
1. Make one controlled change at a time.
2. Preserve unrelated working features.
3. Keep world coordinates and object addresses stable unless relocation is intentional.
4. Test the change on the phone before stacking more changes on top.
5. After Osko confirms a feature works, treat it as a checkpoint.
6. If a new change breaks a previously working feature, investigate/revert that change instead of redesigning the whole world.
7. Use commits/checkpoints so working states can be recovered.

## How to work with Osko
Osko directs behavior and layout; AI handles implementation-level coding.

Osko is not claiming to write code. He has long hands-on computer/software experience and is especially strong at visual/behavioral testing. When he says something is sticking, separating, disappearing, clipping, moving incorrectly, flashing, or behaving differently than expected, treat that report as test evidence and investigate it.

Do not talk down to him because he does not know coding syntax. Explain coding decisions in plain software terms and connect them to what he can see and test.

When Osko says:
- `TALK ONLY` — do not code.
- `NO DRAWING` — do not generate/edit images.
- `DO NOT DELETE` — preserve existing work.
- a feature is working well — avoid changing it unless necessary.

A simple `okay` does not authorize unrelated deletion, rebuilding, or redesign.

## Current architecture direction
This is not just a conventional webpage. It is being built as a living world with game-style spatial architecture:
- world -> property -> roads -> districts -> buildings -> interiors -> working systems.

The website, game-like navigation, real tools, store, trucking systems, farm systems, and future features are intended to grow inside the same world architecture.

## Building-entry rule
Headquarters is the first proven enterable building. Preserve the successful pattern:
- short tap opens the building;
- drag still moves the world;
- entering a building must not reset or destroy the outside world;
- exiting should return the user to the same outside context/position whenever practical.

Use this proven behavior as the pattern for future enterable buildings.

## Current priority
Continue building outward from the working foundation. Add new buildings, interiors, roads, districts, and systems without destabilizing the land/camera/navigation foundation.

If uncertain whether a requested change is structural, ask or explain before changing the foundation.
