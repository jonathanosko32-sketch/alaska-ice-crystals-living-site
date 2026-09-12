# HQ crystal sign v53

Separate test built from the fully resolved FIX6 world used by v51. Existing files and protected FIX8 preserved.

Fix: v51 attempted to replace the original tex drawing string after FIX6 had already changed it, so the crystal replacement did not match. v53 changes the HQ sign creation directly in the resolved world. Only HQ uses the new texture and slab; other signs retain their existing behavior.

HQ: deterministic blue triangular crystal facets, luminous beveled perimeter, turquoise raised script with layered extrusion and shadow, a shallow physical slab, local backlight. Great Vibes font subset embedded under its included SIL OFL license for Android availability. Texture is 2048 by 448 with capped anisotropy. Basic material preserves turquoise and ocean blue under daylight and nighttime lighting without a white emissive wash.

Loading: no nested HTML rewrite/fetch chain. Engine fallback URLs have timeouts. Embedded font awaited before texture generation. Touch pan, pinch zoom, HOME, NEAR, SKIE, LIFE, property objects and FIX6 living systems retained.

Validation: all inline JS syntax checked; texture executed against canvas API stub and checked for expected dimensions and brand lettering. Browser visual verification unavailable because Chromium download timed out. Not confirmed on Osko's phone. This is not a stable/master replacement.

New test: https://jonathanosko32-sketch.github.io/alaska-ice-crystals-living-site/TEST/OSKO-Living-OS-HQ-CRYSTAL-v53.html

Protected fallback: https://jonathanosko32-sketch.github.io/alaska-ice-crystals-living-site/TEST/OSKO-Living-OS-FIRST-BUILD-v1-FIX8.html
