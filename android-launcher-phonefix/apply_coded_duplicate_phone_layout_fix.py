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
        '''    private fun baseScale(): Float {\n        if (width <= 0 || height <= 0) return 1f\n        val density = resources.displayMetrics.density\n        val safeTop = 78f * density\n        val safeBottom = 92f * density\n        val usableHeight = (height - safeTop - safeBottom).coerceAtLeast(height * 0.55f)\n        // RESET / start position is the exact top-to-bottom Android fit.\n        // Extra world width stays off-screen for left/right movement.\n        return usableHeight / backgroundBitmap.height.toFloat()\n    }\n'''
    ),
    (
        '        if (!initialized) { offsetX = (width - dw) / 2f; offsetY = (height - dh) / 2f; initialized = true }',
        '''        if (!initialized) {\n            val density = resources.displayMetrics.density\n            val safeTop = 78f * density\n            offsetX = (width - dw) / 2f\n            offsetY = safeTop\n            initialized = true\n        }'''
    ),
    (
        '        userScale = newScale.coerceIn(0.78f, 3.6f)',
        '''        // Let Osko shrink the world for inspection, but stop enlargement at 4x.\n        // RESET returns to 1x, which is the exact top-to-bottom fit above.\n        userScale = newScale.coerceIn(0.40f, 4.00f)'''
    ),
    (
        '                    offsetX+=dx; offsetY+=dy; clampOffsets(); invalidate()',
        '                    offsetX+=dx; clampOffsets(); invalidate()'
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

# Camera test rule:
# - RESET/start = exact top-to-bottom fit.
# - One-finger movement = horizontal only.
# - User may shrink to 0.40x for inspection.
# - Enlargement stops at 4.00x.
# Other coded-test stability/Aurora fixes remain unchanged.

p.write_text(s, encoding="utf-8")
print("Applied top-to-bottom start, horizontal pan, 0.40x-4.00x inspection zoom")
