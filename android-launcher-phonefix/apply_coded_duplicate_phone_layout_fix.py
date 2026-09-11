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
        '''    private fun baseScale(): Float {\n        if (width <= 0 || height <= 0) return 1f\n        val density = resources.displayMetrics.density\n        val safeTop = 78f * density\n        val safeBottom = 92f * density\n        val usableHeight = (height - safeTop - safeBottom).coerceAtLeast(height * 0.55f)\n        val fitWidth = (width * 0.96f) / backgroundBitmap.width.toFloat()\n        val fitHeight = usableHeight / backgroundBitmap.height.toFloat()\n        // Start larger than whole-world fit, but do not force the tiny source image\n        // into the extreme full-height enlargement that caused the blocky screenshot.\n        return min(fitHeight, fitWidth * 1.42f)\n    }\n'''
    ),
    (
        '        if (!initialized) { offsetX = (width - dw) / 2f; offsetY = (height - dh) / 2f; initialized = true }',
        '''        if (!initialized) {\n            val density = resources.displayMetrics.density\n            val safeTop = 78f * density\n            val safeBottom = 92f * density\n            val usableHeight = (height - safeTop - safeBottom).coerceAtLeast(height * 0.55f)\n            offsetX = (width - dw) / 2f\n            offsetY = safeTop + (usableHeight - dh) / 2f\n            initialized = true\n        }'''
    ),
    (
        '        userScale = newScale.coerceIn(0.78f, 3.6f)',
        '''        // Keep V11-style freedom to resize and pan, but stop the two unusable\n        // extremes seen on Android: postage-stamp world and highly pixelated blow-up.\n        userScale = newScale.coerceIn(0.72f, 2.05f)'''
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

# Keep route data for Aurora movement, but hide the temporary gray coded road.
# The approved background road remains visible; Aurora follows the shared route data.
# Limit animation to ~30 FPS and reduce snow load so Samsung/Android stays responsive.
# The bundled background is only 7.5 KB, so code deliberately caps zoom rather than
# pretending that extreme enlargement can add image detail that is not in the source.

p.write_text(s, encoding="utf-8")
print("Applied coded duplicate Android clarity-safe zoom, stability and Aurora fix")
