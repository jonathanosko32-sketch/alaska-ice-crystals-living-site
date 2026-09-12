# HQ blue crystal glass v59

User requested glossy see-through blue crystal, explicitly leaving turquoise unchanged. Separate v59 preserves v58 and protected FIX8.

Blue interior: 24% alpha reduction before the existing turquoise rendering block; softer blue facet contrast and reduced opaque dark edge tint. Blue slab uses transparent MeshPhysicalMaterial with clearcoat and low roughness. Face material enables texture transparency. View-dependent blue gloss is stronger and uses a script protection mask excluding lettering and its raised edges/glow.

Turquoise rendering block verified byte-identical to v58. Letter shape, size, face colors, extrusion, reflections, glow and turquoise light intensity unchanged. Blue/master controls preserved. Partial transparency shows the existing HQ surfaces behind the crystal; scene geometry remains unchanged.

Validation: inline JS syntax passes; translucent texture and lettering mask material setup exercised against stubs; turquoise code equality assertion passes. GPU and phone visual appearance unverified. Separate test only.

Test: https://jonathanosko32-sketch.github.io/alaska-ice-crystals-living-site/TEST/OSKO-Living-OS-HQ-BLUE-CRYSTAL-GLASS-v59.html
Protected FIX8: https://jonathanosko32-sketch.github.io/alaska-ice-crystals-living-site/TEST/OSKO-Living-OS-FIRST-BUILD-v1-FIX8.html
