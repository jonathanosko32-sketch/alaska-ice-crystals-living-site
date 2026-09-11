from pathlib import Path

p = Path("app/src/main/java/com/osko/launcher/LayoverLivingV6Activity.kt")
s = p.read_text(encoding="utf-8")

replacements = [
    (
        'window.statusBarColor = Color.TRANSPARENT',
        'window.statusBarColor = Color.rgb(1, 8, 17)'
    ),
    (
        'leftMargin = dp(8); rightMargin = dp(8); bottomMargin = dp(10)',
        'leftMargin = dp(8); rightMargin = dp(8); bottomMargin = dp(34)'
    ),
    (
        '        drawRoads(canvas)\n',
        ''
    ),
    (
        '    private fun baseScale() = (height * 0.96f) / backgroundBitmap.height.toFloat()\n',
        '''    private fun baseScale(): Float {\n        if (width <= 0 || height <= 0) return 1f\n        val density = resources.displayMetrics.density\n        val safeTop = 78f * density\n        val safeBottom = 92f * density\n        val usableHeight = (height - safeTop - safeBottom).coerceAtLeast(height * 0.55f)\n        val fitWidth = (width * 0.96f) / backgroundBitmap.width.toFloat()\n        val fitHeight = usableHeight / backgroundBitmap.height.toFloat()\n        return min(fitWidth, fitHeight)\n    }\n'''
    ),
    (
        '        if (!initialized) { offsetX = (width - dw) / 2f; offsetY = (height - dh) / 2f; initialized = true }',
        '''        if (!initialized) {\n            val density = resources.displayMetrics.density\n            val safeTop = 78f * density\n            val safeBottom = 92f * density\n            val usableHeight = (height - safeTop - safeBottom).coerceAtLeast(height * 0.55f)\n            offsetX = (width - dw) / 2f\n            offsetY = safeTop + (usableHeight - dh) / 2f\n            initialized = true\n        }'''
    ),
]

for old, new in replacements:
    if old not in s:
        raise SystemExit(f"Expected source text not found:\n{old}")
    s = s.replace(old, new, 1)

# Keep the route data for Aurora movement, but hide the temporary visual road.
# The real roads will be coded to match the approved world instead of drawing a gray test stripe.

p.write_text(s, encoding="utf-8")
print("Applied coded duplicate phone layout fix")
