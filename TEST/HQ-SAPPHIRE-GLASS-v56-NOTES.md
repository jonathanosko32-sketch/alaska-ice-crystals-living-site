# HQ sapphire glass v56

User requested a shiny finish and more blue depth after viewing v55. Separate v56 preserves previous versions and protected FIX8.

HQ changes: richer sapphire/cobalt facet palette, darker internal edge refraction with central blue depth, restrained polished reflection strips, darker glossy slab edges. A single transparent ShaderMaterial plane adds subtle camera-responsive blue glass reflections over the sign. Shader uses standard Three.js cameraPosition and world-space normal/view vectors; no external dependency, animation loop change, render target or full-screen bloom. Existing turquoise script, geometry, halo, local lights and property actions retained.

Validation: inline JavaScript syntax passes; crystal canvas texture generation and shader material setup executed against stubs. GPU shader compilation and visual appearance have not been browser-verified; needs phone confirmation. Test remains separate from master.

Test: https://jonathanosko32-sketch.github.io/alaska-ice-crystals-living-site/TEST/OSKO-Living-OS-HQ-SAPPHIRE-GLASS-v56.html
Previous v55: https://jonathanosko32-sketch.github.io/alaska-ice-crystals-living-site/TEST/OSKO-Living-OS-HQ-CUT-CRYSTAL-v55.html
Protected FIX8: https://jonathanosko32-sketch.github.io/alaska-ice-crystals-living-site/TEST/OSKO-Living-OS-FIRST-BUILD-v1-FIX8.html
