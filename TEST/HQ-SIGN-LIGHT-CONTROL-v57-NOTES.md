# HQ sign light control v57

User requested direct control of the HQ sign lighting after v56. New v57 preserves all previous builds and protected FIX8.

Added SIGN LIGHT shortcut and HQ action opening a labeled range slider (0–150%, 5% steps), on/off toggle restoring previous brightness, NORMAL 100%, and DONE. Setting saved locally under osko.hq.sign.light.v1 with guarded reads/writes and clamped values. Sign lights, exterior halo, face brightness and baked light blur respond together. OFF extinguishes the three sign point lights and exterior halo, removes texture light blur and dims the readable blue sign; crystalline facets and glass reflections remain. HQ building LIGHTS action retained separately.

Texture changes are coalesced to at most one per animation frame; replaced maps disposed. Sign control does not alter the camera or canvas gesture handlers. Default 100% matches v56 lighting. Existing sign appearance, script, glow geometry, polished glass and property preserved.

Validation: JS syntax passes; control logic exercised with stubs for 150% light scaling, OFF (zero point lights and hidden halo), restoring previous brightness, and range clamping. No browser or phone confirmation yet. This remains a separate test.

Test: https://jonathanosko32-sketch.github.io/alaska-ice-crystals-living-site/TEST/OSKO-Living-OS-HQ-SIGN-LIGHT-CONTROL-v57.html
Previous v56: https://jonathanosko32-sketch.github.io/alaska-ice-crystals-living-site/TEST/OSKO-Living-OS-HQ-SAPPHIRE-GLASS-v56.html
Protected FIX8: https://jonathanosko32-sketch.github.io/alaska-ice-crystals-living-site/TEST/OSKO-Living-OS-FIRST-BUILD-v1-FIX8.html
