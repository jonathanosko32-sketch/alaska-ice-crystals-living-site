from pathlib import Path
import re

path = Path('app/src/main/java/com/osko/launcher/LayoverLivingV6Activity.kt')
text = path.read_text()

# Run the flag as part of the same LIFE animation loop.
old = 'drawAurora(canvas, t); drawSmoke(canvas, t); drawFire(canvas, t); drawPropertyLights(canvas, t)\n            drawPeople(canvas, t); drawAnimalMotion(canvas, t); drawHorseTails(canvas, t); drawAuroraRoute(canvas, t); drawEagleMotion(canvas, t)'
new = 'drawAurora(canvas, t); drawSmoke(canvas, t); drawFire(canvas, t); drawPropertyLights(canvas, t); drawFlag(canvas, t)\n            drawPeople(canvas, t); drawAnimalMotion(canvas, t); drawHorseTails(canvas, t); drawAuroraRoute(canvas, t); drawEagleMotion(canvas, t)'
if old not in text:
    raise SystemExit('Could not find LIFE draw sequence')
text = text.replace(old, new, 1)

# Replace animal pass with more obvious body stepping/head/tail motion while preserving original yard art.
pat = re.compile(r'''    private fun drawAnimalMotion\(canvas: Canvas, t: Float\) \{.*?^    \}\n\n    private fun drawHorseTails''', re.S | re.M)
rep = r'''    private fun drawAnimalMotion(canvas: Canvas, t: Float) {
        data class MovingAnimal(val x: Float, val y: Float, val w: Float, val h: Float, val speed: Float, val phase: Float)
        val animals = listOf(
            MovingAnimal(0.105f, 0.340f, 0.078f, 0.100f, 0.62f, 0.0f),
            MovingAnimal(0.655f, 0.365f, 0.070f, 0.086f, 0.78f, 0.9f),
            MovingAnimal(0.715f, 0.372f, 0.070f, 0.086f, 0.73f, 1.7f),
            MovingAnimal(0.785f, 0.366f, 0.070f, 0.086f, 0.83f, 2.4f),
            MovingAnimal(0.845f, 0.458f, 0.085f, 0.100f, 0.55f, 3.2f),
            MovingAnimal(0.730f, 0.600f, 0.064f, 0.082f, 0.84f, 4.1f)
        )

        animals.forEachIndexed { i, a ->
            val leftN = (a.x - a.w / 2f).coerceIn(0f, 1f)
            val topN = (a.y - a.h / 2f).coerceIn(0f, 1f)
            val rightN = (a.x + a.w / 2f).coerceIn(0f, 1f)
            val bottomN = (a.y + a.h / 2f).coerceIn(0f, 1f)
            val src = Rect(
                (leftN * backgroundBitmap.width).toInt(), (topN * backgroundBitmap.height).toInt(),
                (rightN * backgroundBitmap.width).toInt(), (bottomN * backgroundBitmap.height).toInt()
            )
            val tl = worldPoint(leftN, topN)
            val br = worldPoint(rightN, bottomN)

            // A slow forward/back step plus breathing makes the whole animal visibly alive.
            val walk = sin(t * a.speed + a.phase)
            val lift = abs(sin(t * a.speed * 2.0f + a.phase))
            val dx = 11f * walk
            val dy = -4.5f * lift
            val breathe = 1f + 0.018f * sin(t * a.speed * 2.4f + a.phase)
            val cx = (tl.x + br.x) / 2f + dx
            val cy = (tl.y + br.y) / 2f + dy
            val hw = (br.x - tl.x) * 0.5f * breathe
            val hh = (br.y - tl.y) * 0.5f / breathe
            val dst = RectF(cx - hw, cy - hh, cx + hw, cy + hh)

            bgPaint.alpha = 252
            canvas.drawBitmap(backgroundBitmap, src, dst, bgPaint)
            bgPaint.alpha = 255

            // Head nod and ear movement cue, kept dark/natural so it blends into the animal.
            val p = worldPoint(a.x, a.y)
            val nod = 5f * sin(t * (1.35f + i * 0.08f) + a.phase)
            lifePaint.style = Paint.Style.FILL
            lifePaint.color = Color.argb(125, 55, 42, 32)
            canvas.drawCircle(p.x + dx + 11f, p.y + dy - 11f + nod, 5.5f, lifePaint)
            lifePaint.style = Paint.Style.STROKE
            lifePaint.strokeWidth = 3f
            val ear = 5f + 3f * sin(t * 2.3f + i)
            canvas.drawLine(p.x + dx + 8f, p.y + dy - 16f + nod, p.x + dx + 4f, p.y + dy - 16f - ear + nod, lifePaint)
            canvas.drawLine(p.x + dx + 14f, p.y + dy - 16f + nod, p.x + dx + 18f, p.y + dy - 16f - ear + nod, lifePaint)
            lifePaint.style = Paint.Style.FILL
        }
    }

    private fun drawHorseTails'''
text, n = pat.subn(rep, text, count=1)
if n != 1:
    raise SystemExit('Could not patch drawAnimalMotion')

# Replace Aurora route marker with a small, clearly moving dog-shaped coded sprite and pink scarf.
pat = re.compile(r'''    private fun drawAuroraRoute\(canvas: Canvas, t: Float\) \{.*?^    \}\n\n    private fun drawEagleMotion''', re.S | re.M)
rep = r'''    private fun drawAuroraRoute(canvas: Canvas, t: Float) {
        val phase = (t * 0.055f) % 1f
        val pts = arrayOf(
            0.55f to 0.70f, 0.55f to 0.63f, 0.545f to 0.56f, 0.515f to 0.51f,
            0.555f to 0.485f, 0.625f to 0.49f, 0.655f to 0.515f, 0.605f to 0.56f,
            0.565f to 0.63f, 0.55f to 0.70f
        )
        val segF = phase * (pts.size - 1)
        val seg = min(pts.size - 2, segF.toInt())
        val u = segF - seg
        val x = pts[seg].first + (pts[seg + 1].first - pts[seg].first) * u
        val y = pts[seg].second + (pts[seg + 1].second - pts[seg].second) * u
        val p = worldPoint(x, y)
        val step = sin(t * 8f)

        // Soft shadow so Aurora reads as walking on the road, not floating.
        lifePaint.style = Paint.Style.FILL
        lifePaint.color = Color.argb(95, 0, 0, 0)
        canvas.drawOval(RectF(p.x - 18f, p.y + 14f, p.x + 18f, p.y + 21f), lifePaint)

        // Body / head / muzzle.
        lifePaint.color = Color.argb(235, 38, 33, 30)
        canvas.drawOval(RectF(p.x - 18f, p.y - 7f, p.x + 11f, p.y + 11f), lifePaint)
        canvas.drawCircle(p.x + 13f, p.y - 8f, 9f, lifePaint)
        lifePaint.color = Color.argb(235, 235, 230, 220)
        canvas.drawOval(RectF(p.x + 12f, p.y - 7f, p.x + 21f, p.y + 1f), lifePaint)
        canvas.drawCircle(p.x + 17f, p.y - 12f, 2.3f, lifePaint)

        // Four stepping legs.
        lifePaint.style = Paint.Style.STROKE
        lifePaint.strokeCap = Paint.Cap.ROUND
        lifePaint.strokeWidth = 4f
        lifePaint.color = Color.argb(235, 35, 30, 28)
        canvas.drawLine(p.x - 11f, p.y + 8f, p.x - 13f + 5f * step, p.y + 20f, lifePaint)
        canvas.drawLine(p.x - 3f, p.y + 8f, p.x - 1f - 5f * step, p.y + 20f, lifePaint)
        canvas.drawLine(p.x + 5f, p.y + 7f, p.x + 7f + 5f * step, p.y + 19f, lifePaint)
        canvas.drawLine(p.x + 9f, p.y + 5f, p.x + 11f - 5f * step, p.y + 18f, lifePaint)

        // Tail swish.
        val swish = sin(t * 3.2f)
        val tail = Path()
        tail.moveTo(p.x - 17f, p.y - 3f)
        tail.quadTo(p.x - 27f, p.y - 12f, p.x - 28f + 12f * swish, p.y - 18f)
        canvas.drawPath(tail, lifePaint)

        // Aurora's pink scarf.
        lifePaint.style = Paint.Style.FILL
        lifePaint.color = Color.argb(245, 255, 92, 170)
        canvas.drawRoundRect(RectF(p.x + 4f, p.y - 4f, p.x + 14f, p.y + 2f), 3f, 3f, lifePaint)
    }

    private fun drawEagleMotion'''
text, n = pat.subn(rep, text, count=1)
if n != 1:
    raise SystemExit('Could not patch drawAuroraRoute')

# Insert a waving US flag overlay near the existing HQ flag. This is code-only animation.
insert_before = '    private fun drawPeople(canvas: Canvas, t: Float) {'
flag_fun = r'''    private fun drawFlag(canvas: Canvas, t: Float) {
        val poleTop = worldPoint(0.365f, 0.255f)
        val poleBottom = worldPoint(0.365f, 0.335f)
        lifePaint.style = Paint.Style.STROKE
        lifePaint.strokeWidth = 3f
        lifePaint.color = Color.argb(210, 185, 190, 198)
        canvas.drawLine(poleTop.x, poleTop.y, poleBottom.x, poleBottom.y, lifePaint)

        val flagW = 42f
        val flagH = 24f
        val rows = 7
        for (r in 0 until rows) {
            val y0 = poleTop.y + 3f + r * (flagH / rows)
            val wave0 = sin(t * 3.0f + r * 0.35f) * 2.4f
            val wave1 = sin(t * 3.0f + 1.1f + r * 0.35f) * 3.8f
            val path = Path()
            path.moveTo(poleTop.x + 1f, y0 + wave0)
            path.cubicTo(
                poleTop.x + flagW * 0.35f, y0 + wave1,
                poleTop.x + flagW * 0.68f, y0 - wave1,
                poleTop.x + flagW, y0 + wave0
            )
            lifePaint.color = if (r % 2 == 0) Color.argb(235, 190, 35, 48) else Color.argb(235, 238, 238, 235)
            lifePaint.strokeWidth = flagH / rows + 0.8f
            canvas.drawPath(path, lifePaint)
        }
        lifePaint.style = Paint.Style.FILL
        lifePaint.color = Color.argb(240, 35, 55, 112)
        val cantonWave = sin(t * 3.0f) * 2f
        canvas.drawRect(poleTop.x + 1f, poleTop.y + 2f + cantonWave, poleTop.x + 18f, poleTop.y + 13f + cantonWave, lifePaint)
    }

'''
if insert_before not in text:
    raise SystemExit('Could not find drawPeople insertion point')
text = text.replace(insert_before, flag_fun + insert_before, 1)

path.write_text(text)
print('Applied v9 living motion: stronger animals, waving flag, walking Aurora')
