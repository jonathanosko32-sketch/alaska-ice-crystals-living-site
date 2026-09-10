from pathlib import Path
import re

path = Path('app/src/main/java/com/osko/launcher/LayoverLivingV6Activity.kt')
text = path.read_text()

# Keep the animated northern lights up in the sky instead of sweeping down across the yard.
pat = re.compile(r'''    private fun drawAurora\(canvas: Canvas, t: Float\) \{.*?^    \}\n\n    private fun drawFire''', re.S | re.M)
rep = r'''    private fun drawAurora(canvas: Canvas, t: Float) {
        val colors = intArrayOf(Color.rgb(65, 255, 170), Color.rgb(70, 205, 255), Color.rgb(180, 75, 255), Color.rgb(80, 255, 205))
        for (band in 0..3) {
            auroraPaint.color = colors[band]
            auroraPaint.strokeWidth = 18f + band * 4f
            auroraPaint.alpha = (70 + 34 * sin(t * 0.55f + band * 0.9f)).toInt().coerceIn(40, 112)
            val baseY = 0.040f + band * 0.020f
            val path = Path()
            val p0 = worldPoint(-0.08f, baseY)
            path.moveTo(p0.x, p0.y)
            for (i in 1..36) {
                val nx = -0.08f + i / 31f
                val wave = sin(nx * 9f + t * (0.70f + band * 0.04f)) + 0.45f * sin(nx * 17f - t * 0.36f)
                val p = worldPoint(nx, baseY + 0.016f * wave)
                path.lineTo(p.x, p.y)
            }
            canvas.drawPath(path, auroraPaint)
        }
    }

    private fun drawFire'''
text, n = pat.subn(rep, text, count=1)
if n != 1:
    raise SystemExit('Could not patch drawAurora')

# Add clearly visible seated people around the fire while keeping them small enough to fit the scene.
pat = re.compile(r'''    private fun drawPeople\(canvas: Canvas, t: Float\) \{.*?^    \}\n\n    private fun drawAnimalMotion''', re.S | re.M)
rep = r'''    private fun drawPeople(canvas: Canvas, t: Float) {
        val seats = listOf(
            Triple(0.505f, 0.488f, Color.rgb(55, 85, 125)),
            Triple(0.535f, 0.505f, Color.rgb(120, 60, 45)),
            Triple(0.570f, 0.520f, Color.rgb(45, 95, 70)),
            Triple(0.615f, 0.515f, Color.rgb(95, 70, 120)),
            Triple(0.648f, 0.492f, Color.rgb(110, 80, 45)),
            Triple(0.665f, 0.465f, Color.rgb(45, 75, 110))
        )
        seats.forEachIndexed { index, seat ->
            val p = worldPoint(seat.first, seat.second)
            val bob = sin(t * 1.15f + index) * 2.5f
            val lean = sin(t * 0.65f + index * 1.1f) * 2.8f

            // Jacket/body
            lifePaint.style = Paint.Style.FILL
            lifePaint.color = Color.argb(230, Color.red(seat.third), Color.green(seat.third), Color.blue(seat.third))
            canvas.drawRoundRect(RectF(p.x - 7f + lean, p.y - 7f + bob, p.x + 8f + lean, p.y + 16f + bob), 5f, 5f, lifePaint)

            // Head
            lifePaint.color = Color.argb(235, 210, 166, 130)
            canvas.drawCircle(p.x + lean, p.y - 15f + bob, 6f, lifePaint)

            // Arm movement toward the fire every few seconds
            lifePaint.style = Paint.Style.STROKE
            lifePaint.strokeCap = Paint.Cap.ROUND
            lifePaint.strokeWidth = 4f
            lifePaint.color = Color.argb(225, Color.red(seat.third), Color.green(seat.third), Color.blue(seat.third))
            val reach = 8f + 5f * (0.5f + 0.5f * sin(t * 0.85f + index))
            canvas.drawLine(p.x + lean, p.y + 1f + bob, p.x + lean + reach, p.y + 8f + bob, lifePaint)
            lifePaint.style = Paint.Style.FILL
        }
    }

    private fun drawAnimalMotion'''
text, n = pat.subn(rep, text, count=1)
if n != 1:
    raise SystemExit('Could not patch drawPeople')

# Make the existing animals visibly move by gently re-drawing their own image region with small natural offsets.
# This keeps Osko's original yard artwork rather than replacing the animals with new artwork.
pat = re.compile(r'''    private fun drawAnimalMotion\(canvas: Canvas, t: Float\) \{.*?^    \}\n\n    private fun drawHorseTails''', re.S | re.M)
rep = r'''    private fun drawAnimalMotion(canvas: Canvas, t: Float) {
        data class MovingAnimal(val x: Float, val y: Float, val w: Float, val h: Float, val speed: Float, val phase: Float)
        val animals = listOf(
            MovingAnimal(0.105f, 0.340f, 0.075f, 0.095f, 0.70f, 0.0f),
            MovingAnimal(0.655f, 0.365f, 0.065f, 0.080f, 0.82f, 0.9f),
            MovingAnimal(0.715f, 0.372f, 0.065f, 0.080f, 0.76f, 1.7f),
            MovingAnimal(0.785f, 0.366f, 0.065f, 0.080f, 0.88f, 2.4f),
            MovingAnimal(0.845f, 0.458f, 0.080f, 0.095f, 0.58f, 3.2f),
            MovingAnimal(0.730f, 0.600f, 0.060f, 0.075f, 0.90f, 4.1f)
        )

        animals.forEach { a ->
            val leftN = (a.x - a.w / 2f).coerceIn(0f, 1f)
            val topN = (a.y - a.h / 2f).coerceIn(0f, 1f)
            val rightN = (a.x + a.w / 2f).coerceIn(0f, 1f)
            val bottomN = (a.y + a.h / 2f).coerceIn(0f, 1f)

            val src = Rect(
                (leftN * backgroundBitmap.width).toInt(),
                (topN * backgroundBitmap.height).toInt(),
                (rightN * backgroundBitmap.width).toInt(),
                (bottomN * backgroundBitmap.height).toInt()
            )
            val tl = worldPoint(leftN, topN)
            val br = worldPoint(rightN, bottomN)
            val dx = 6f * sin(t * a.speed + a.phase)
            val dy = 2.5f * sin(t * a.speed * 1.7f + a.phase)
            val dst = RectF(tl.x + dx, tl.y + dy, br.x + dx, br.y + dy)

            bgPaint.alpha = 245
            canvas.drawBitmap(backgroundBitmap, src, dst, bgPaint)
            bgPaint.alpha = 255

            // Small head nod marker blended in dark brown so movement is visible but not neon/cartoonish.
            val p = worldPoint(a.x, a.y)
            lifePaint.color = Color.argb(105, 58, 44, 34)
            canvas.drawCircle(p.x + dx * 0.8f + 10f, p.y + dy - 10f, 4.5f, lifePaint)
        }
    }

    private fun drawHorseTails'''
text, n = pat.subn(rep, text, count=1)
if n != 1:
    raise SystemExit('Could not patch drawAnimalMotion')

path.write_text(text)
print('Applied v8 life patch: sky aurora, visible animals, people at fire')
