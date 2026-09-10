package com.osko.launcher

import android.app.Activity
import android.app.AlertDialog
import android.content.Context
import android.content.Intent
import android.graphics.*
import android.graphics.drawable.GradientDrawable
import android.net.Uri
import android.os.Bundle
import android.provider.MediaStore
import android.provider.Settings
import android.view.*
import android.widget.*
import java.util.Random
import kotlin.math.abs
import kotlin.math.cos
import kotlin.math.max
import kotlin.math.min
import kotlin.math.sin

class LayoverLivingV5Activity : Activity() {
    private lateinit var root: FrameLayout
    private lateinit var scene: LivingYardV5View
    private var openPanel: View? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        window.statusBarColor = Color.TRANSPARENT
        window.navigationBarColor = Color.rgb(1, 8, 17)
        showScene()
    }

    @Deprecated("Deprecated in Java")
    override fun onBackPressed() {
        if (openPanel != null) closePanel() else super.onBackPressed()
    }

    private fun showScene() {
        root = FrameLayout(this).apply { setBackgroundColor(Color.BLACK) }
        scene = LivingYardV5View(this) { id -> handleHotspot(id) }
        root.addView(scene, FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT))

        val header = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            gravity = Gravity.CENTER
            setPadding(dp(8), dp(6), dp(8), dp(6))
            background = GradientDrawable().apply {
                setColor(Color.argb(140, 0, 9, 20))
                cornerRadius = dp(18).toFloat()
                setStroke(dp(1), cyan)
            }
        }
        header.addView(TextView(this).apply {
            text = "WELCOME HOME  •  OSKO"
            textSize = 17f
            setTextColor(Color.WHITE)
            gravity = Gravity.CENTER
            setShadowLayer(8f, 0f, 0f, cyan)
        })
        header.addView(TextView(this).apply {
            text = "ALASKA ICE CRYSTALS  •  LIVING LAYOVER"
            textSize = 10f
            setTextColor(cyan)
            gravity = Gravity.CENTER
        })
        root.addView(header, FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, dp(56), Gravity.TOP).apply {
            leftMargin = dp(8); rightMargin = dp(8); topMargin = dp(8)
        })

        val controls = LinearLayout(this).apply {
            orientation = LinearLayout.HORIZONTAL
            gravity = Gravity.CENTER
            setPadding(dp(6), dp(5), dp(6), dp(5))
            background = GradientDrawable().apply {
                setColor(Color.argb(145, 0, 12, 26))
                cornerRadius = dp(18).toFloat()
                setStroke(dp(1), Color.argb(180, 75, 220, 255))
            }
        }
        controls.addView(control("APPS") { openAppDrawer() }, weighted())
        controls.addView(control("RESET") { scene.resetView() }, weighted())
        controls.addView(control("SNOW") { scene.toggleSnow() }, weighted())
        controls.addView(control("LIFE") { scene.toggleLife() }, weighted())
        controls.addView(control("LOCK") { scene.toggleLock() }, weighted())
        root.addView(controls, FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, dp(46), Gravity.BOTTOM).apply {
            leftMargin = dp(8); rightMargin = dp(8); bottomMargin = dp(12)
        })

        setContentView(root)
    }

    private fun weighted() = LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.MATCH_PARENT, 1f).apply {
        setMargins(dp(2), dp(2), dp(2), dp(2))
    }

    private fun control(label: String, action: () -> Unit) = TextView(this).apply {
        text = label
        textSize = 11f
        setTextColor(Color.WHITE)
        gravity = Gravity.CENTER
        background = GradientDrawable().apply {
            setColor(Color.argb(160, 5, 28, 44))
            cornerRadius = dp(12).toFloat()
            setStroke(dp(1), cyan)
        }
        setOnClickListener { action() }
    }

    private fun handleHotspot(id: String) {
        when (id) {
            "hq" -> showPanel(id, "HQ INTERIOR — SCHOOL & LIBRARY", "Your main building. School books and training stay together here as the library grows.", listOf(
                PanelAction("SCHOOL / TRAINING", "GED • college • simulator") { openSchool() },
                PanelAction("DICTIONARY", "Reserved library shelf") { toast("Dictionary shelf is reserved here") },
                PanelAction("MECHANICS", "Gas • diesel • on-road • off-road") { toast("Mechanics library shelf is reserved here") },
                PanelAction("CDL / TRUCKING", "Training • loads • safety") { toast("CDL and trucking library shelf is reserved here") },
                PanelAction("FLIGHT / AVIATION", "Pilot • drone • flight material") { toast("Flight library shelf is reserved here") },
                PanelAction("GOOGLE DRIVE", "School and project files") { launchAny(listOf("com.google.android.apps.docs"), "Google Drive") },
                PanelAction("FILES", "Phone files") { openFiles() },
                PanelAction("ALL APPS", "Find anything installed") { openAppDrawer() }
            ))
            "truck" -> showPanel(id, "TRUCK CAB — MOBILE COMMAND", "Truck tools live together inside the truck.", listOf(
                PanelAction("TRIP PLANNING", "Maps and route") { launchAny(listOf("com.google.android.apps.maps"), "Maps") },
                PanelAction("TRUCK CHECKLISTS", "Inspection and road lists") { toast("Truck checklist area reserved") },
                PanelAction("LOADS / NAVIGATION", "Routes and loads") { launchAny(listOf("com.google.android.apps.maps"), "Maps") },
                PanelAction("FUEL / DEF", "Fuel tools") { toast("Fuel and DEF tool area reserved") },
                PanelAction("CALCULATOR", "Scale • pay • math") { launchAny(listOf("com.sec.android.app.popupcalculator", "com.google.android.calculator"), "Calculator") },
                PanelAction("CAMERA", "Road • loads • documents") { openCamera() },
                PanelAction("FILES", "Loads • BOL • paperwork") { openFiles() },
                PanelAction("SKIE CB — CH 27", "Talk to Skie") { openSkieCb() }
            ))
            "workshop" -> showPanel(id, "WORKSHOP INTERIOR", "Tools, build plans, files, fabrication and robot work live here.", listOf(
                PanelAction("TOOLS", "Shop tools and references") { openFiles() },
                PanelAction("3D PRINTER", "Printer work area") { toast("3D printer area reserved") },
                PanelAction("BUILD PLANS", "Project plans") { openFiles() },
                PanelAction("TRUCK MODS", "Truck build work") { openFiles() },
                PanelAction("FILES / MANUALS", "Project files") { openFiles() },
                PanelAction("GITHUB", "Code and builds") { launchAny(listOf("com.github.android"), "GitHub") },
                PanelAction("ROBOT BAY", "SKIE • DENALI • WILLOW • KODIAK") { toast("Robot service bay reserved") }
            ))
            "cb" -> showPanel(id, "CB RADIO — SKIE — CHANNEL 27", "Channel 27 is the Layover doorway to Skie.", listOf(
                PanelAction("TALK TO SKIE", "Open live CB") { openSkieCb() },
                PanelAction("VOICE COMMANDS", "Skie controls") { openSkieCb() },
                PanelAction("SETTINGS", "CB setup") { openSkieCb() },
                PanelAction("LOG / NOTES", "Quick notes") { launchAny(listOf("com.samsung.android.app.notes", "com.google.android.keep"), "Notes") },
                PanelAction("CLOSE", "Back to living yard") { closePanel() }
            ))
            "aurora" -> showPanel(id, "AURORA", "Aurora has her own place in the Layover.", listOf(
                PanelAction("PICTURES", "Aurora photos") { launchAny(listOf("com.sec.android.gallery3d", "com.google.android.apps.photos"), "Pictures") },
                PanelAction("CAMERA", "Take a picture") { openCamera() },
                PanelAction("CARE / INFO", "Aurora records") { toast("Aurora care area reserved") }
            ))
            "gate" -> showPanel(id, "CONTROL • CREATE • CONNECT", "Main system controls stay at the gate.", listOf(
                PanelAction("SETTINGS", "Phone and system settings") { openSettings() },
                PanelAction("ALL APPS", "Complete app list") { openAppDrawer() },
                PanelAction("GOOGLE DRIVE", "Connected files") { launchAny(listOf("com.google.android.apps.docs"), "Google Drive") },
                PanelAction("CHATGPT", "Current assistant") { launchAny(listOf("com.openai.chatgpt"), "ChatGPT") }
            ))
            "lake" -> showPanel(id, "LAKE / OUTDOORS", "Maps, fishing, weather and recreation access.", listOf(
                PanelAction("MAPS", "Explore and route") { launchAny(listOf("com.google.android.apps.maps"), "Maps") },
                PanelAction("WEATHER / WEB", "Outdoor information") { launchAny(listOf("com.android.chrome", "com.sec.android.app.sbrowser"), "Browser") },
                PanelAction("CAMERA", "Outdoor photos") { openCamera() }
            ))
            "animals" -> showPanel(id, "ANIMALS", "Living-yard animal area.", listOf(
                PanelAction("CAMERA", "Take a picture") { openCamera() },
                PanelAction("PHOTOS", "Open pictures") { launchAny(listOf("com.sec.android.gallery3d", "com.google.android.apps.photos"), "Pictures") },
                PanelAction("INFO", "Animal information") { toast("Animal information area reserved") }
            ))
            "eagle" -> showPanel(id, "EAGLE — NEWS / WEATHER", "Quick outside information from the upper yard.", listOf(
                PanelAction("NEWS / WEB", "Open browser") { launchAny(listOf("com.android.chrome", "com.sec.android.app.sbrowser"), "Browser") },
                PanelAction("MAPS", "Current area") { launchAny(listOf("com.google.android.apps.maps"), "Maps") }
            ))
            "tower" -> showPanel(id, "TOWER — CAMERA", "Camera and security access.", listOf(
                PanelAction("CAMERA", "Open camera") { openCamera() },
                PanelAction("SETTINGS", "Security settings") { openSettings() }
            ))
        }
    }

    private data class PanelAction(val title: String, val subtitle: String, val action: () -> Unit)

    private fun showPanel(previewKey: String, title: String, subtitle: String, actions: List<PanelAction>) {
        closePanel()
        val shell = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(dp(10), dp(8), dp(10), dp(10))
            background = GradientDrawable().apply {
                setColor(Color.argb(246, 2, 12, 24))
                cornerRadius = dp(22).toFloat()
                setStroke(dp(2), cyan)
            }
        }

        shell.addView(ScenePreviewView(this, previewKey), LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, dp(118)).apply { bottomMargin = dp(6) })

        val headingRow = LinearLayout(this).apply { orientation = LinearLayout.HORIZONTAL; gravity = Gravity.CENTER_VERTICAL }
        headingRow.addView(TextView(this).apply {
            text = title
            textSize = 17f
            setTextColor(Color.WHITE)
            setShadowLayer(8f, 0f, 0f, cyan)
        }, LinearLayout.LayoutParams(0, dp(38), 1f))
        headingRow.addView(TextView(this).apply {
            text = "✕"
            textSize = 22f
            setTextColor(Color.WHITE)
            gravity = Gravity.CENTER
            setOnClickListener { closePanel() }
        }, LinearLayout.LayoutParams(dp(42), dp(38)))
        shell.addView(headingRow)
        shell.addView(TextView(this).apply {
            text = subtitle
            textSize = 11f
            setTextColor(Color.rgb(180, 210, 225))
            setPadding(0, 0, 0, dp(7))
        })

        val scroll = ScrollView(this).apply { isFillViewport = true; isVerticalScrollBarEnabled = true }
        val list = LinearLayout(this).apply { orientation = LinearLayout.VERTICAL }
        actions.forEach { item ->
            val card = LinearLayout(this).apply {
                orientation = LinearLayout.VERTICAL
                setPadding(dp(12), dp(7), dp(12), dp(7))
                background = GradientDrawable().apply {
                    setColor(Color.rgb(7, 28, 45)); cornerRadius = dp(14).toFloat(); setStroke(dp(1), Color.rgb(68, 190, 225))
                }
                setOnClickListener { item.action() }
            }
            card.addView(TextView(this).apply { text = item.title; textSize = 14f; setTextColor(Color.WHITE) })
            card.addView(TextView(this).apply { text = item.subtitle; textSize = 10f; setTextColor(Color.rgb(145, 188, 205)) })
            list.addView(card, LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, dp(54)).apply { bottomMargin = dp(6) })
        }
        scroll.addView(list)
        shell.addView(scroll, LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, 0, 1f))

        val panelHeight = (resources.displayMetrics.heightPixels * 0.58f).toInt()
        root.addView(shell, FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, panelHeight, Gravity.BOTTOM).apply {
            leftMargin = dp(8); rightMargin = dp(8); bottomMargin = dp(62)
        })
        openPanel = shell
    }

    private fun closePanel() { openPanel?.let { root.removeView(it) }; openPanel = null }
    private fun openSchool() { try { startActivity(Intent(Intent.ACTION_VIEW, Uri.parse("https://jonathanosko32-sketch.github.io/alaska-ice-crystals-living-site/TEST/v157-student1-winter-traction-black-ice-knowledge-lab.html"))) } catch (_: Exception) { toast("School page unavailable") } }
    private fun openSkieCb() = startActivity(Intent(this, SkieCbActivity::class.java))

    private fun openAppDrawer() {
        val pm = packageManager
        val apps = pm.queryIntentActivities(Intent(Intent.ACTION_MAIN).addCategory(Intent.CATEGORY_LAUNCHER), 0).sortedBy { it.loadLabel(pm).toString().lowercase() }
        val labels = apps.map { it.loadLabel(pm).toString() }.toTypedArray()
        AlertDialog.Builder(this).setTitle("ALL APPS").setItems(labels) { _, i ->
            val info = apps[i].activityInfo
            startActivity(Intent(Intent.ACTION_MAIN).addCategory(Intent.CATEGORY_LAUNCHER).setClassName(info.packageName, info.name))
        }.setNegativeButton("Close", null).show()
    }

    private fun openFiles() { try { startActivity(Intent(Intent.ACTION_OPEN_DOCUMENT).setType("*/*").addCategory(Intent.CATEGORY_OPENABLE)) } catch (_: Exception) { launchAny(listOf("com.sec.android.app.myfiles", "com.google.android.documentsui"), "Files") } }
    private fun openCamera() { try { startActivity(Intent(MediaStore.INTENT_ACTION_STILL_IMAGE_CAMERA)) } catch (_: Exception) { launchAny(listOf("com.sec.android.app.camera"), "Camera") } }
    private fun openSettings() { try { startActivity(Intent(Settings.ACTION_SETTINGS)) } catch (_: Exception) { toast("Settings unavailable") } }
    private fun launchAny(packages: List<String>, label: String) { for (pkg in packages) packageManager.getLaunchIntentForPackage(pkg)?.let { startActivity(it); return }; toast("$label is not installed") }
    private fun toast(text: String) = Toast.makeText(this, text, Toast.LENGTH_SHORT).show()
    private fun dp(v: Int) = (v * resources.displayMetrics.density).toInt()
    companion object { private val cyan = Color.rgb(74, 221, 255) }
}

private class ScenePreviewView(context: Context, private val key: String) : View(context) {
    private val bitmap = BitmapFactory.decodeResource(resources, R.drawable.layover_background, BitmapFactory.Options().apply { inScaled = false })
    private val paint = Paint(Paint.ANTI_ALIAS_FLAG or Paint.FILTER_BITMAP_FLAG)
    private val border = Paint(Paint.ANTI_ALIAS_FLAG).apply { style = Paint.Style.STROKE; strokeWidth = 2f; color = Color.rgb(74, 221, 255) }
    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)
        val c = when (key) {
            "hq" -> 0.61f to 0.30f; "truck" -> 0.33f to 0.44f; "workshop" -> 0.90f to 0.53f; "cb" -> 0.59f to 0.42f
            "aurora" -> 0.55f to 0.70f; "gate" -> 0.78f to 0.72f; "lake" -> 0.10f to 0.40f; "animals" -> 0.12f to 0.33f
            "eagle" -> 0.90f to 0.10f; "tower" -> 0.78f to 0.25f; else -> 0.5f to 0.5f
        }
        val cropW = bitmap.width * 0.34f
        val cropH = bitmap.height * 0.23f
        val cx = c.first * bitmap.width
        val cy = c.second * bitmap.height
        val src = Rect(
            (cx - cropW / 2).toInt().coerceIn(0, bitmap.width - 1),
            (cy - cropH / 2).toInt().coerceIn(0, bitmap.height - 1),
            (cx + cropW / 2).toInt().coerceIn(1, bitmap.width),
            (cy + cropH / 2).toInt().coerceIn(1, bitmap.height)
        )
        val dst = RectF(0f, 0f, width.toFloat(), height.toFloat())
        canvas.drawBitmap(bitmap, src, dst, paint)
        canvas.drawRoundRect(RectF(1f, 1f, width - 1f, height - 1f), 18f, 18f, border)
    }
}

private class LivingYardV5View(context: Context, private val onHotspot: (String) -> Unit) : View(context) {
    private val backgroundBitmap = BitmapFactory.decodeResource(resources, R.drawable.layover_background, BitmapFactory.Options().apply { inScaled = false; inPreferredConfig = Bitmap.Config.ARGB_8888 })
    private val bgPaint = Paint(Paint.ANTI_ALIAS_FLAG or Paint.FILTER_BITMAP_FLAG or Paint.DITHER_FLAG)
    private val snowPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply { color = Color.WHITE }
    private val auroraPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply { style = Paint.Style.STROKE; strokeCap = Paint.Cap.ROUND }
    private val firePaint = Paint(Paint.ANTI_ALIAS_FLAG)
    private val smokePaint = Paint(Paint.ANTI_ALIAS_FLAG)
    private val lightPaint = Paint(Paint.ANTI_ALIAS_FLAG)
    private val lifePaint = Paint(Paint.ANTI_ALIAS_FLAG)
    private val bubbleFill = Paint(Paint.ANTI_ALIAS_FLAG).apply { color = Color.argb(205, 0, 19, 34) }
    private val bubbleStroke = Paint(Paint.ANTI_ALIAS_FLAG).apply { color = Color.rgb(69, 225, 255); style = Paint.Style.STROKE; strokeWidth = 2f }
    private val titlePaint = Paint(Paint.ANTI_ALIAS_FLAG).apply { color = Color.rgb(100, 235, 255); textSize = 26f; typeface = Typeface.DEFAULT_BOLD }
    private val subPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply { color = Color.WHITE; textSize = 18f }
    private val random = Random(27L)
    private val flakes = List(115) { SnowFlake(random.nextFloat(), random.nextFloat(), 1.2f + random.nextFloat() * 4.2f, 0.032f + random.nextFloat() * 0.085f, random.nextFloat() * 8f) }

    private val scaleDetector = ScaleGestureDetector(context, object : ScaleGestureDetector.SimpleOnScaleGestureListener() {
        override fun onScale(detector: ScaleGestureDetector): Boolean {
            if (locked) return false
            val before = userScale
            userScale = (userScale * detector.scaleFactor).coerceIn(0.88f, 2.7f)
            val ratio = userScale / before
            offsetX = detector.focusX - (detector.focusX - offsetX) * ratio
            offsetY = detector.focusY - (detector.focusY - offsetY) * ratio
            clampOffsets(); invalidate(); return true
        }
    })

    private var userScale = 1f
    private var offsetX = 0f
    private var offsetY = 0f
    private var initialized = false
    private var downX = 0f; private var downY = 0f; private var lastX = 0f; private var lastY = 0f
    private var dragging = false; private var downTime = 0L
    private var snowOn = true; private var lifeOn = true; private var locked = false

    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)
        if (width <= 0 || height <= 0) return
        drawBackground(canvas)
        val t = System.currentTimeMillis() / 1000f
        if (lifeOn) {
            drawAurora(canvas, t)
            drawSmoke(canvas, t)
            drawFire(canvas, t)
            drawPropertyLights(canvas, t)
            drawPeople(canvas, t)
            drawAnimalMotion(canvas, t)
            drawAuroraRoute(canvas, t)
            drawEagleMotion(canvas, t)
        }
        drawHotspotLabels(canvas)
        if (snowOn) drawSnow(canvas, t)
        postInvalidateDelayed(33)
    }

    private fun baseScale() = (height * 0.96f) / backgroundBitmap.height.toFloat()
    private fun totalScale() = baseScale() * userScale
    private fun drawBackground(canvas: Canvas) {
        val s = totalScale(); val dw = backgroundBitmap.width * s; val dh = backgroundBitmap.height * s
        if (!initialized) { offsetX = (width - dw) / 2f; offsetY = (height - dh) / 2f; initialized = true }
        clampOffsets(); canvas.drawBitmap(backgroundBitmap, null, RectF(offsetX, offsetY, offsetX + dw, offsetY + dh), bgPaint)
    }
    private fun clampOffsets() {
        if (width <= 0 || height <= 0) return
        val s = totalScale(); val dw = backgroundBitmap.width * s; val dh = backgroundBitmap.height * s
        offsetX = offsetX.coerceIn(min(0f, width - dw), max(0f, width - dw)); offsetY = offsetY.coerceIn(min(0f, height - dh), max(0f, height - dh))
    }
    private fun worldPoint(nx: Float, ny: Float): PointF { val s = totalScale(); return PointF(offsetX + nx * backgroundBitmap.width * s, offsetY + ny * backgroundBitmap.height * s) }

    private fun drawAurora(canvas: Canvas, t: Float) {
        val colors = intArrayOf(Color.argb(105, 55, 255, 175), Color.argb(90, 75, 210, 255), Color.argb(85, 190, 85, 255), Color.argb(70, 80, 255, 210))
        for (band in 0..3) {
            auroraPaint.color = colors[band]
            auroraPaint.strokeWidth = 24f + band * 7f
            auroraPaint.alpha = (78 + 36 * sin(t * 0.45f + band * 0.7f)).toInt().coerceIn(38, 125)
            val path = Path(); val start = worldPoint(-0.04f, 0.07f + band * 0.035f); path.moveTo(start.x, start.y)
            for (i in 1..30) {
                val nx = -0.04f + i / 28f
                val wave = sin(nx * 10f + t * (0.46f + band * 0.04f)) + 0.45f * sin(nx * 19f - t * 0.31f)
                val breathe = 1f + 0.22f * sin(t * 0.22f + band)
                val ny = 0.075f + band * 0.038f + 0.028f * wave * breathe
                val p = worldPoint(nx, ny); path.lineTo(p.x, p.y)
            }
            canvas.drawPath(path, auroraPaint)
        }
    }

    private fun drawFire(canvas: Canvas, t: Float) {
        val p = worldPoint(0.58f, 0.49f); val flicker = 1f + 0.16f * sin(t * 9f) + 0.08f * sin(t * 15f)
        firePaint.shader = RadialGradient(p.x, p.y, 64f * flicker, intArrayOf(Color.argb(215, 255, 188, 68), Color.argb(110, 255, 82, 20), Color.TRANSPARENT), floatArrayOf(0f, 0.42f, 1f), Shader.TileMode.CLAMP)
        canvas.drawCircle(p.x, p.y, 64f * flicker, firePaint); firePaint.shader = null
        val flameH = 22f + 8f * sin(t * 12f)
        firePaint.color = Color.argb(220, 255, 205, 75)
        canvas.drawOval(RectF(p.x - 7f, p.y - flameH, p.x + 7f, p.y + 6f), firePaint)
        firePaint.color = Color.argb(210, 255, 85, 20)
        canvas.drawOval(RectF(p.x - 4f + 7f * sin(t * 8f), p.y - flameH * 0.7f, p.x + 5f + 7f * sin(t * 8f), p.y + 5f), firePaint)
    }

    private fun drawSmoke(canvas: Canvas, t: Float) {
        val sources = listOf(Triple(0.33f, 0.34f, 1.0f), Triple(0.585f, 0.44f, 0.72f), Triple(0.925f, 0.25f, 0.8f), Triple(0.71f, 0.25f, 0.72f))
        for ((sx, sy, speed) in sources) {
            val base = worldPoint(sx, sy)
            for (i in 0..7) {
                val phase = (t * speed + i * 0.21f) % 1.6f
                smokePaint.color = Color.argb((62 * (1f - phase / 1.6f)).toInt().coerceIn(4, 62), 232, 238, 244)
                canvas.drawCircle(base.x + sin(t * 0.7f + i) * 13f + phase * 7f, base.y - phase * 92f, 9f + i * 1.9f, smokePaint)
            }
        }
    }

    private fun drawPropertyLights(canvas: Canvas, t: Float) {
        val lights = listOf(0.36f to 0.30f, 0.45f to 0.31f, 0.55f to 0.30f, 0.68f to 0.31f, 0.88f to 0.53f, 0.12f to 0.67f, 0.79f to 0.67f)
        lights.forEachIndexed { i, v ->
            val p = worldPoint(v.first, v.second); val pulse = 0.55f + 0.45f * sin(t * (1.3f + i * 0.08f) + i)
            lightPaint.shader = RadialGradient(p.x, p.y, 18f + 8f * pulse, intArrayOf(Color.argb((105 + 90 * pulse).toInt(), 100, 235, 255), Color.TRANSPARENT), null, Shader.TileMode.CLAMP)
            canvas.drawCircle(p.x, p.y, 25f, lightPaint)
        }
        lightPaint.shader = null
    }

    private fun drawPeople(canvas: Canvas, t: Float) {
        val seats = listOf(0.51f to 0.49f, 0.54f to 0.515f, 0.62f to 0.505f, 0.65f to 0.48f)
        seats.forEachIndexed { index, seat ->
            val p = worldPoint(seat.first, seat.second); val bob = sin(t * 0.9f + index * 1.3f) * 2.4f; val lean = sin(t * 0.45f + index) * 2.2f
            lifePaint.color = Color.argb(170, 20 + index * 12, 16, 15)
            canvas.drawCircle(p.x + lean, p.y - 13f + bob, 6f, lifePaint)
            canvas.drawRoundRect(RectF(p.x - 6f + lean, p.y - 8f + bob, p.x + 7f + lean, p.y + 12f + bob), 5f, 5f, lifePaint)
            lifePaint.strokeWidth = 3f; lifePaint.style = Paint.Style.STROKE
            canvas.drawLine(p.x, p.y + bob, p.x + 10f * sin(t * 0.55f + index), p.y + 7f + bob, lifePaint)
            lifePaint.style = Paint.Style.FILL
        }
    }

    private fun drawAnimalMotion(canvas: Canvas, t: Float) {
        val herd = listOf(Triple(0.11f, 0.34f, 0.18f), Triple(0.66f, 0.36f, 0.15f), Triple(0.72f, 0.37f, 0.14f), Triple(0.84f, 0.46f, 0.12f), Triple(0.73f, 0.60f, 0.16f))
        herd.forEachIndexed { i, a ->
            val p = worldPoint(a.first + 0.014f * sin(t * a.third + i), a.second + 0.004f * sin(t * 0.28f + i))
            lifePaint.color = Color.argb(75, 0, 0, 0); canvas.drawOval(RectF(p.x - 15f, p.y + 8f, p.x + 15f, p.y + 14f), lifePaint)
            lifePaint.color = Color.argb(90, 120, 210, 230); canvas.drawCircle(p.x + 13f * sin(t * 0.35f + i), p.y - 3f, 2.2f, lifePaint)
        }
    }

    private fun drawAuroraRoute(canvas: Canvas, t: Float) {
        val phase = (t * 0.045f) % 1f
        val pts = arrayOf(0.55f to 0.70f, 0.55f to 0.60f, 0.54f to 0.53f, 0.50f to 0.49f, 0.58f to 0.46f, 0.65f to 0.49f, 0.60f to 0.55f, 0.56f to 0.62f, 0.55f to 0.70f)
        val segF = phase * (pts.size - 1); val seg = min(pts.size - 2, segF.toInt()); val u = segF - seg
        val x = pts[seg].first + (pts[seg + 1].first - pts[seg].first) * u
        val y = pts[seg].second + (pts[seg + 1].second - pts[seg].second) * u
        val p = worldPoint(x, y)
        lifePaint.shader = RadialGradient(p.x, p.y, 18f, intArrayOf(Color.argb(110, 255, 90, 185), Color.TRANSPARENT), null, Shader.TileMode.CLAMP)
        canvas.drawCircle(p.x, p.y, 18f, lifePaint); lifePaint.shader = null
        lifePaint.color = Color.argb(190, 255, 130, 205)
        canvas.drawCircle(p.x - 5f, p.y, 3f, lifePaint); canvas.drawCircle(p.x + 5f, p.y, 3f, lifePaint); canvas.drawCircle(p.x, p.y - 5f, 3f, lifePaint); canvas.drawOval(RectF(p.x - 5f, p.y + 2f, p.x + 5f, p.y + 10f), lifePaint)
    }

    private fun drawEagleMotion(canvas: Canvas, t: Float) {
        val x = 0.80f + 0.11f * sin(t * 0.08f); val y = 0.10f + 0.02f * sin(t * 0.17f); val p = worldPoint(x, y)
        lifePaint.color = Color.argb(100, 5, 10, 15); lifePaint.style = Paint.Style.STROKE; lifePaint.strokeWidth = 4f
        val flap = 11f + 7f * sin(t * 3.2f); canvas.drawLine(p.x, p.y, p.x - 20f, p.y - flap, lifePaint); canvas.drawLine(p.x, p.y, p.x + 20f, p.y - flap, lifePaint); lifePaint.style = Paint.Style.FILL
    }

    private fun drawSnow(canvas: Canvas, t: Float) {
        for (f in flakes) {
            val y = ((f.y + t * f.speed + f.phase) % 1.08f) * height
            val x = f.x * width + sin(t * 0.7f + f.phase * 5f) * 18f
            snowPaint.alpha = (130 + min(125f, f.radius * 21f)).toInt(); canvas.drawCircle(x, y, f.radius, snowPaint)
        }
    }

    private fun drawHotspotLabels(canvas: Canvas) {
        HOTSPOTS.forEach { h ->
            val p = worldPoint(h.cx, h.cy); val w = 150f; val hh = 58f; val r = RectF(p.x - w / 2f, p.y - hh / 2f, p.x + w / 2f, p.y + hh / 2f)
            canvas.drawRoundRect(r, 14f, 14f, bubbleFill); canvas.drawRoundRect(r, 14f, 14f, bubbleStroke); canvas.drawCircle(r.left + 13f, r.centerY(), 7f, bubbleStroke)
            canvas.drawText(h.title, r.left + 27f, r.top + 23f, titlePaint); canvas.drawText(h.subtitle, r.left + 27f, r.top + 46f, subPaint)
        }
    }

    override fun onTouchEvent(event: MotionEvent): Boolean {
        scaleDetector.onTouchEvent(event)
        when (event.actionMasked) {
            MotionEvent.ACTION_DOWN -> { downX = event.x; downY = event.y; lastX = event.x; lastY = event.y; downTime = System.currentTimeMillis(); dragging = false; return true }
            MotionEvent.ACTION_MOVE -> { if (!locked && !scaleDetector.isInProgress && event.pointerCount == 1) { val dx = event.x - lastX; val dy = event.y - lastY; if (abs(event.x - downX) > 12f || abs(event.y - downY) > 12f) dragging = true; offsetX += dx; offsetY += dy; lastX = event.x; lastY = event.y; clampOffsets(); invalidate() }; return true }
            MotionEvent.ACTION_UP -> { if (!dragging && !scaleDetector.isInProgress && System.currentTimeMillis() - downTime < 500L) detectTap(event.x, event.y); return true }
        }
        return true
    }

    private fun detectTap(screenX: Float, screenY: Float) {
        val s = totalScale(); val nx = (screenX - offsetX) / (backgroundBitmap.width * s); val ny = (screenY - offsetY) / (backgroundBitmap.height * s)
        HOTSPOTS.firstOrNull { abs(nx - it.cx) <= it.hitW && abs(ny - it.cy) <= it.hitH }?.let { onHotspot(it.id) }
    }

    fun resetView() { userScale = 1f; initialized = false; invalidate() }
    fun toggleSnow() { snowOn = !snowOn; Toast.makeText(context, if (snowOn) "Snow on" else "Snow off", Toast.LENGTH_SHORT).show(); invalidate() }
    fun toggleLife() { lifeOn = !lifeOn; Toast.makeText(context, if (lifeOn) "Living effects on" else "Living effects off", Toast.LENGTH_SHORT).show(); invalidate() }
    fun toggleLock() { locked = !locked; Toast.makeText(context, if (locked) "Layover locked" else "Layover unlocked", Toast.LENGTH_SHORT).show() }

    private data class SnowFlake(val x: Float, val y: Float, val radius: Float, val speed: Float, val phase: Float)
    private data class Hotspot(val id: String, val title: String, val subtitle: String, val cx: Float, val cy: Float, val hitW: Float = 0.075f, val hitH: Float = 0.055f)
    companion object {
        private val HOTSPOTS = listOf(
            Hotspot("eagle", "Eagle", "News / Weather", 0.90f, 0.10f), Hotspot("tower", "Tower", "Camera", 0.78f, 0.25f),
            Hotspot("lake", "Lake", "Maps / Recreation", 0.10f, 0.40f), Hotspot("animals", "Animals", "Fun / Info", 0.12f, 0.33f),
            Hotspot("hq", "HQ Building", "School / Library", 0.61f, 0.30f, 0.09f, 0.065f), Hotspot("truck", "Truck", "Truck Tools", 0.33f, 0.44f, 0.11f, 0.075f),
            Hotspot("cb", "CB Radio", "SKIE • CH 27", 0.59f, 0.42f), Hotspot("workshop", "Workshop", "Tools / Build / Files", 0.90f, 0.53f, 0.09f, 0.07f),
            Hotspot("aurora", "Aurora", "Info / Care", 0.55f, 0.70f), Hotspot("gate", "Gate", "Settings / Security", 0.78f, 0.72f)
        )
    }
}
