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
        '''    private fun baseScale(): Float {\n        if (width <= 0 || height <= 0) return 1f\n        val density = resources.displayMetrics.density\n        val safeTop = 78f * density\n        val safeBottom = 92f * density\n        val usableHeight = (height - safeTop - safeBottom).coerceAtLeast(height * 0.55f)\n        // V11-style world view: fill Android vertically at reset so the black dead\n        // bands disappear. The user can still zoom far out to see the whole property.\n        return usableHeight / backgroundBitmap.height.toFloat()\n    }\n'''
    ),
    (
        '        if (!initialized) { offsetX = (width - dw) / 2f; offsetY = (height - dh) / 2f; initialized = true }',
        '''        if (!initialized) {\n            val density = resources.displayMetrics.density\n            val safeTop = 78f * density\n            val safeBottom = 92f * density\n            val usableHeight = (height - safeTop - safeBottom).coerceAtLeast(height * 0.55f)\n            offsetX = (width - dw) / 2f\n            offsetY = safeTop + (usableHeight - dh) / 2f\n            initialized = true\n        }'''
    ),
    (
        '        userScale = newScale.coerceIn(0.78f, 3.6f)',
        '        userScale = newScale.coerceIn(0.42f, 4.2f)'
    ),
    (
        '    private val auroraRoute = roadMain + roadMain.asReversed().drop(1)',
        '''    // Aurora starts at the cattle-guard end of the road, walks up the road,\n    // then returns along the same approved path.\n    private val auroraRoute = roadMain + roadMain.asReversed().drop(1)\n    private val auroraStartSeconds = System.nanoTime() / 1_000_000_000f'''
    ),
    (
        '        val phase = (t * 0.035f) % 1f\n        val a = pointOnRoute(auroraRoute, phase)\n        val q = worldPoint(a.x,a.y); val step = sin(t*8f)',
        '''        val phase = (((t - auroraStartSeconds).coerceAtLeast(0f)) * 0.035f) % 1f\n        val a = pointOnRoute(auroraRoute, phase)\n        val q = worldPoint(a.x,a.y); val step = sin(t*8f)\n        canvas.save()\n        canvas.scale(1.9f, 1.9f, q.x, q.y)'''
    ),
    (
        '        lifePaint.style = Paint.Style.FILL; lifePaint.color = Color.argb(245,255,92,170); canvas.drawRoundRect(RectF(q.x+4f,q.y-4f,q.x+14f,q.y+2f),3f,3f,lifePaint)\n    }\n\n    private fun drawEagle',
        '''        lifePaint.style = Paint.Style.FILL; lifePaint.color = Color.argb(245,255,92,170); canvas.drawRoundRect(RectF(q.x+4f,q.y-4f,q.x+14f,q.y+2f),3f,3f,lifePaint)\n        canvas.restore()\n    }\n\n    private fun drawEagle'''
    ),
]

for old, new in replacements:
    if old not in s:
        raise SystemExit(f"Expected source text not found:\n{old}")
    s = s.replace(old, new, 1)

# Keep the route data for Aurora movement, but hide the temporary visual road.
# The approved background road remains visible; Aurora follows the shared route data.

p.write_text(s, encoding="utf-8")
print("Applied coded duplicate Android/V11 movement and Aurora fix")
