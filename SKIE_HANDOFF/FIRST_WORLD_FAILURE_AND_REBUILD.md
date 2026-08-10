# FIRST LIVING WORLD — FAILURE REPORT AND REBUILD RULES

## Why this document exists
The first Living World prototype was useful, but its foundation was built in the wrong order. This document records what happened so future AI sessions do not repeat the same architecture.

## What happened
1. Visual pieces and a small road/360-sector system existed before a true master land/world coordinate system.
2. Buildings were attached to old screen/sector containers instead of permanent independent locations on the full property.
3. Larger land was added later, but the old building containers remained. The result looked like more acreage without all objects truly belonging to that acreage.
4. Continued spacing changes pushed buildings toward/outside camera edges because percentages were being stretched inside old containers.
5. Multiple terrain/green layers became visible and moved separately. This exposed that the terrain presentation was not behaving as one fixed world.
6. The user observed that buildings moved together with a green layer instead of remaining planted while the camera/view moved.
7. Camera/navigation patches improved smoothness, but could not repair the underlying world architecture.

## What the running software showed
These observations are important test evidence:
- Store entry/exit could be made smooth and reliable.
- Finger navigation could be made smooth.
- Buildings became crowded as the old sectors were stretched.
- A left-side building began fading/clipping out of the phone camera.
- Three different-looking green terrain bands/layers could separate during movement.
- Buildings appeared stuck to an older/top green layer while newer/larger land existed below.
- Old 360 controls could reappear when an older/slimmer property presentation was served.

## What worked and must not be forgotten
Preserve the ideas and requirements even though the old architecture is being retired:
- Alaska Ice Crystals entrance/gate concept.
- Large long-term property.
- Log-building direction.
- Merchandise store and ability to enter/exit it.
- Farm, workshop/trucking, headquarters/outfitters/campfire districts.
- Roads connecting destinations.
- Property map/orientation concept.
- Smooth finger-first phone navigation.
- Living World grows over time; do not design it as a fixed one-page scene.

## Required architecture for rebuild
Build in this order:
1. Master world coordinate system.
2. Fixed land/property boundary.
3. Camera/view system that moves through/looks across the world while land and objects remain planted.
4. Roads and reference/boundary markers.
5. Test object/building anchored to independent world coordinates.
6. Phone testing and deliberate movement tests.
7. Only after the foundation passes: real districts, buildings, store, farm, interactive systems, merchandise, characters, and future expansion.

Do not rebuild the old 360 screen-sector architecture as the world foundation.

## Land measurement
Land is measured in WORLD UNITS / coordinates, not MB or GB. Storage size and world dimensions are different things.

The rebuild must expose an understandable land ledger containing:
- master world width and length;
- current developed bounds;
- remaining/reserved area;
- coordinates/bounds for roads and districts;
- four visible boundary/reference markers so the user can judge scale by eyesight;
- a map showing location/orientation.

The exact initial world dimensions must be chosen during the clean-land foundation build and then recorded here/handoff. Design coordinates so future expansion does not require moving existing buildings.

## How to work with Osko — required
Osko is currently building/testing primarily from a phone. He does not claim to write code and relies on AI for implementation-level coding. Lack of coding experience must NOT be interpreted as lack of software/computer experience.

Osko has long hands-on experience using and troubleshooting computers and software. His strongest role here is behavioral/visual software testing. Once enough of a feature exists to operate, he can identify behavior that does not make sense.

When Osko reports sticking, incorrect movement, disappearing objects, incorrect layering, objects moving together, unexpected controls, or other strange behavior, INVESTIGATE. Do not dismiss the report merely because code appears correct.

A screenshot or behavioral observation from the running software is evidence. Code analysis is also evidence. When they conflict, test and determine what is actually happening.

For major structural changes explain in plain software terms:
- what will change;
- why it needs to change;
- what existing working feature could be affected;
- how it will be tested.

A simple "okay" is not blanket permission to delete, replace, or redesign unrelated working pieces.

If Osko says TALK ONLY, do not code. If Osko says NO DRAWING, do not generate/edit images. If Osko says DO NOT DELETE, preserve existing work.

Working relationship: AI implements and translates important architecture into understandable software behavior; Osko directs, operates, observes, screenshots, and tests.

## Phone-first test checkpoints
Do not leave the user staring at invisible architecture for a long time. Provide visible test checkpoints early:
- clean land;
- four boundary markers (tree-style visual landmarks are acceptable for testing);
- one road;
- one simple test building/object;
- map/position indicator.

Test that land stays fixed, objects stay planted, looking upward shows sky without terrain floating upward, and moving/looking does not detach layers.

## Preservation
The complete first prototype was archived before rebuild on branch:
`archive/first-world-prototype-2026-08-10`

Do not delete that archive. It exists for recovery, comparison, lessons, and retrieval of working features.