from pathlib import Path

p = Path("app/src/main/java/com/osko/launcher/LayoverLivingV6Activity.kt")
s = p.read_text(encoding="utf-8")

replacements = [
    (
        'window.statusBarColor = Color.TRANSPARENT',
        'window.statusBarColor = Color.rgb(1, 8, 17)'
    ),
    (
        'root = FrameLayout(this).apply { setBackgroundColor(Color.BLACK) }',
        'root = FrameLayout(this).apply { setBackgroundColor(Color.rgb(2, 18, 32)) }'
    ),
    (
        'leftMargin = dp(8); rightMargin = dp(8); bottomMargin = dp(10)',
        'leftMargin = dp(8); rightMargin = dp(8); bottomMargin = dp(34)'
    ),
    (
        '    private val flakes = List(120) { SnowFlake(random.nextFloat(), random.nextFloat(), 1.4f + random.nextFloat() * 4.8f, 0.045f + random.nextFloat() * 0.10f, random.nextFloat() * 8f) }',
        '    private val flakes = List(72) { SnowFlake(random.nextFloat(), random.nextFloat(), 1.4f + random.nextFloat() * 4.8f, 0.045f + random.nextFloat() * 0.10f, random.nextFloat() * 8f) }'
    ),
    (
        '        Hotspot("aurora", "AURORA", "INFO / CARE", 0.55f, 0.70f),',
        '        Hotspot("aurora", "AURORA", "INFO / CARE", 0.49f, 0.78f),'
    ),
    (
        '        drawRoads(canvas)\n',
        ''
    ),
    (
        '        postInvalidateOnAnimation()\n',
        '        if (isShown && windowVisibility == View.VISIBLE) postInvalidateDelayed(33L)\n'
    ),
    (
        '    private fun baseScale() = (height * 0.96f) / backgroundBitmap.height.toFloat()\n',
        '''    private fun baseScale(): Float {\n        if (width <= 0 || height <= 0) return 1f\n        val density = resources.displayMetrics.density\n        val safeTop = 78f * density\n        val safeBottom = 92f * density\n        val usableHeight = (height - safeTop - safeBottom).coerceAtLeast(height * 0.55f)\n        // First camera rule: the world is exactly fitted top-to-bottom on Android.\n        // Its extra width remains off-screen and is explored by moving left/right.\n        return usableHeight / backgroundBitmap.height.toFloat()\n    }\n'''
    ),
    (
        '        if (!initialized) { offsetX = (width - dw) / 2f; offsetY = (height - dh) / 2f; initialized = true }',
        '''        if (!initialized) {\n            val density = resources.displayMetrics.density\n            val safeTop = 78f * density\n            offsetX = (width - dw) / 2f\n            offsetY = safeTop\n            initialized = true\n        }'''
    ),
    (
        '        userScale = newScale.coerceIn(0.78f, 3.6f)',
        '''        // Keep the first approved camera size fixed while this layout is tuned.\n        // The world stays top-to-bottom; navigation is horizontal left/right.\n        userScale = 1f'''
    ),
    (
        '            offsetX += dx; offsetY += dy; clampOffset()',
        '            offsetX += dx; clampOffset()'
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

# First approved Android camera target: exact vertical fit with no top/bottom dead block.
# Keep the world at that size and let the user slide horizontally across the wide scene.
# Aurora remains enlarged and follows the cattle-guard road route.
# Temporary coded road stays hidden; the approved background road remains visible.
# Animation remains capped near 30 FPS for Samsung/Android stability.

p.write_text(s, encoding="utf-8")
print("Applied coded duplicate top-to-bottom Android fit with horizontal world pan")
