from pathlib import Path
import re

path = Path('app/src/main/java/com/osko/launcher/LayoverLivingV6Activity.kt')
text = path.read_text()

old_draw = re.compile(r'''    private fun drawAnimalMotion\(canvas: Canvas, t: Float\) \{.*?^    \}\n\n    private fun drawHorseTails''', re.S | re.M)
new_draw = r'''    private fun drawAnimalMotion(canvas: Canvas, t: Float) {
        // Living-animal pass. The yard art remains protected; these overlays add
        // head turns, stepping, ear/tail movement and breathing without replacing it.
        val animals = listOf(
            AnimalLife(0.105f, 0.340f, 1.00f, 0), // moose / left herd
            AnimalLife(0.655f, 0.365f, 0.86f, 1), // horse 1
            AnimalLife(0.715f, 0.372f, 0.92f, 1), // horse 2
            AnimalLife(0.785f, 0.366f, 0.80f, 1), // horse 3
            AnimalLife(0.845f, 0.458f, 0.72f, 2), // bison
            AnimalLife(0.730f, 0.600f, 0.88f, 3)  // wolf / lower yard
        )

        animals.forEachIndexed { i, a ->
            val p = worldPoint(a.x, a.y)
            val breathe = sin(t * (1.25f * a.speed) + i * 0.9f)
            val headTurn = sin(t * (0.72f * a.speed) + i * 1.7f)
            val step = sin(t * (1.55f * a.speed) + i * 0.65f)

            // Ground contact / stepping gives visible motion without covering the animal artwork.
            lifePaint.style = Paint.Style.STROKE
            lifePaint.strokeCap = Paint.Cap.ROUND
            lifePaint.strokeWidth = 4f
            lifePaint.color = Color.argb(150, 35, 28, 24)
            val legSpread = 8f + 5f * step
            canvas.drawLine(p.x - 9f, p.y + 7f, p.x - legSpread, p.y + 22f, lifePaint)
            canvas.drawLine(p.x + 8f, p.y + 7f, p.x + legSpread, p.y + 22f, lifePaint)

            // Head/neck motion. Different sizes keep horse/bison/wolf cues natural.
            val headRadius = when (a.kind) { 2 -> 7f; 3 -> 5f; else -> 6f }
            lifePaint.style = Paint.Style.FILL
            lifePaint.color = Color.argb(150, 62, 47, 36)
            canvas.drawCircle(p.x + headTurn * 10f, p.y - 14f + breathe * 2.5f, headRadius, lifePaint)

            // Ear flicks / horn movement.
            lifePaint.style = Paint.Style.STROKE
            lifePaint.strokeWidth = 3f
            val ear = 4f + 3f * sin(t * (2.2f + i * 0.08f) + i)
            canvas.drawLine(p.x + headTurn * 10f - 3f, p.y - 19f, p.x + headTurn * 10f - 7f, p.y - 19f - ear, lifePaint)
            canvas.drawLine(p.x + headTurn * 10f + 3f, p.y - 19f, p.x + headTurn * 10f + 7f, p.y - 19f - ear, lifePaint)

            // Tail swish for every large animal; horses also get the dedicated longer tail pass.
            val swish = sin(t * (1.9f + i * 0.11f) + i * 1.4f)
            lifePaint.strokeWidth = if (a.kind == 2) 5f else 3.5f
            val tail = Path()
            tail.moveTo(p.x - 14f, p.y - 1f)
            tail.quadTo(p.x - 22f + swish * 11f, p.y + 8f, p.x - 17f + swish * 17f, p.y + 18f)
            canvas.drawPath(tail, lifePaint)
            lifePaint.style = Paint.Style.FILL
        }
    }

    private fun drawHorseTails'''
text, count = old_draw.subn(new_draw, text, count=1)
if count != 1:
    raise SystemExit('Could not patch drawAnimalMotion')

old_drawer = re.compile(r'''    private fun openAppDrawer\(\) \{.*?^    \}\n\n    companion object''', re.S | re.M)
new_drawer = r'''    private fun openAppDrawer() {
        val pm = packageManager
        val apps = pm.queryIntentActivities(Intent(Intent.ACTION_MAIN).addCategory(Intent.CATEGORY_LAUNCHER), 0)
            .sortedBy { it.loadLabel(pm).toString().lowercase() }

        val overlay = FrameLayout(this).apply {
            setBackgroundColor(Color.argb(185, 0, 5, 12))
            isClickable = true
        }
        val panel = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(dp(12), dp(12), dp(12), dp(12))
            background = GradientDrawable().apply {
                setColor(Color.rgb(2, 16, 30))
                cornerRadius = dp(22).toFloat()
                setStroke(dp(2), cyan)
            }
        }
        val top = LinearLayout(this).apply { orientation = LinearLayout.HORIZONTAL; gravity = Gravity.CENTER_VERTICAL }
        top.addView(TextView(this).apply {
            text = "ALL APPS"; textSize = 22f; setTextColor(Color.WHITE); setShadowLayer(8f, 0f, 0f, cyan)
        }, LinearLayout.LayoutParams(0, dp(50), 1f))
        top.addView(TextView(this).apply {
            text = "✕"; textSize = 26f; setTextColor(cyan); gravity = Gravity.CENTER
            setOnClickListener { root.removeView(overlay) }
        }, LinearLayout.LayoutParams(dp(48), dp(48)))
        panel.addView(top)
        panel.addView(TextView(this).apply {
            text = "OSKO APP YARD  •  TAP AN APP TO OPEN"
            textSize = 10f; setTextColor(Color.rgb(135, 205, 225)); setPadding(0, 0, 0, dp(8))
        })

        val scroll = ScrollView(this).apply { isFillViewport = true; isVerticalScrollBarEnabled = false }
        val list = LinearLayout(this).apply { orientation = LinearLayout.VERTICAL }
        apps.forEach { app ->
            val info = app.activityInfo
            val row = LinearLayout(this).apply {
                orientation = LinearLayout.HORIZONTAL; gravity = Gravity.CENTER_VERTICAL
                setPadding(dp(10), dp(7), dp(10), dp(7))
                background = GradientDrawable().apply {
                    setColor(Color.rgb(6, 31, 49)); cornerRadius = dp(15).toFloat(); setStroke(dp(1), Color.rgb(65, 188, 224))
                }
                setOnClickListener {
                    try {
                        startActivity(Intent(Intent.ACTION_MAIN).addCategory(Intent.CATEGORY_LAUNCHER).setClassName(info.packageName, info.name))
                    } catch (_: Exception) { toast("App could not open") }
                }
            }
            val icon = ImageView(this).apply { setImageDrawable(app.loadIcon(pm)); scaleType = ImageView.ScaleType.CENTER_INSIDE }
            row.addView(icon, LinearLayout.LayoutParams(dp(44), dp(44)).apply { rightMargin = dp(10) })
            val textCol = LinearLayout(this).apply { orientation = LinearLayout.VERTICAL }
            textCol.addView(TextView(this).apply { text = app.loadLabel(pm); textSize = 15f; setTextColor(Color.WHITE) })
            textCol.addView(TextView(this).apply { text = info.packageName; textSize = 9f; setTextColor(Color.rgb(110, 170, 195)); maxLines = 1 })
            row.addView(textCol, LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1f))
            list.addView(row, LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, dp(62)).apply { bottomMargin = dp(7) })
        }
        scroll.addView(list)
        panel.addView(scroll, LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, 0, 1f))
        overlay.addView(panel, FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, (resources.displayMetrics.heightPixels * 0.78f).toInt(), Gravity.BOTTOM).apply {
            leftMargin = dp(10); rightMargin = dp(10); bottomMargin = dp(66)
        })
        overlay.setOnClickListener { if (it === overlay) root.removeView(overlay) }
        root.addView(overlay, FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT))
    }

    companion object'''
text, count = old_drawer.subn(new_drawer, text, count=1)
if count != 1:
    raise SystemExit('Could not patch openAppDrawer')

# Add the small animal data class beside existing private data classes.
needle = '    private data class SnowFlake('
if needle not in text:
    raise SystemExit('Could not find SnowFlake data class')
text = text.replace(needle, '    private data class AnimalLife(val x: Float, val y: Float, val speed: Float, val kind: Int)\n    private data class SnowFlake(', 1)

path.write_text(text)
print('Applied v7 animal + dark app yard patch')
