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
import kotlin.math.max
import kotlin.math.min
import kotlin.math.sin

class LayoverSceneTestActivity : Activity() {
    private lateinit var root: FrameLayout
    private lateinit var scene: LivingSceneView
    private var openPanel: View? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        window.statusBarColor = Color.TRANSPARENT
        window.navigationBarColor = Color.rgb(1, 8, 17)
        showScene()
    }

    override fun onBackPressed() {
        if (openPanel != null) closePanel() else super.onBackPressed()
    }

    private fun showScene() {
        root = FrameLayout(this).apply { setBackgroundColor(Color.BLACK) }
        scene = LivingSceneView(this) { id -> handleHotspot(id) }
        root.addView(scene, FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT))

        val header = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            gravity = Gravity.CENTER
            setPadding(dp(8), dp(6), dp(8), dp(6))
            background = GradientDrawable().apply {
                setColor(Color.argb(150, 0, 9, 20))
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
            "hq" -> showPanel(
                "ALASKA ICE CRYSTALS — SCHOOL & LIBRARY",
                "Your main building. School books and training stay together here as the library grows.",
                listOf(
                    PanelAction("SCHOOL / TRAINING", "GED • college • simulator") { openSchool() },
                    PanelAction("DICTIONARY", "Reserved library shelf") { toast("Dictionary shelf is reserved here") },
                    PanelAction("MECHANICS", "Gas • diesel • on-road • off-road") { toast("Mechanics library shelf is reserved here") },
                    PanelAction("CDL / TRUCKING", "Training • loads • safety") { toast("CDL and trucking library shelf is reserved here") },
                    PanelAction("FLIGHT / AVIATION", "Pilot • drone • flight material") { toast("Flight library shelf is reserved here") },
                    PanelAction("GOOGLE DRIVE", "School and project files") { launchAny(listOf("com.google.android.apps.docs"), "Google Drive") },
                    PanelAction("FILES", "Phone files") { openFiles() },
                    PanelAction("ALL APPS", "Find anything installed") { openAppDrawer() }
                )
            )
            "truck" -> showPanel(
                "OSKO TRUCK — MOBILE COMMAND",
                "Truck tools live together inside the truck.",
                listOf(
                    PanelAction("TRIP PLANNING", "Maps and route") { launchAny(listOf("com.google.android.apps.maps"), "Maps") },
                    PanelAction("CALCULATOR", "Scale • pay • math") { launchAny(listOf("com.sec.android.app.popupcalculator", "com.google.android.calculator"), "Calculator") },
                    PanelAction("CAMERA", "Road • loads • documents") { openCamera() },
                    PanelAction("FILES", "Loads • BOL • paperwork") { openFiles() },
                    PanelAction("NOTES", "Road notes") { launchAny(listOf("com.samsung.android.app.notes", "com.google.android.keep"), "Notes") },
                    PanelAction("SKIE CB — CH 27", "Talk to Skie") { openSkieCb() }
                )
            )
            "workshop" -> showPanel(
                "OSKO WORKSHOP",
                "Tools, build plans, files, fabrication and robot work live here.",
                listOf(
                    PanelAction("TOOLS / FILES", "Project files") { openFiles() },
                    PanelAction("ZARCHIVER", "Archives and packages") { launchAny(listOf("ru.zdevs.zarchiver"), "ZArchiver") },
                    PanelAction("CAMERA", "Parts and build photos") { openCamera() },
                    PanelAction("CALCULATOR", "Measurements and shop math") { launchAny(listOf("com.sec.android.app.popupcalculator", "com.google.android.calculator"), "Calculator") },
                    PanelAction("GITHUB", "Code and builds") { launchAny(listOf("com.github.android"), "GitHub") },
                    PanelAction("ROBOT BAY", "SKIE • DENALI • WILLOW • KODIAK") { toast("Robot service bay reserved") }
                )
            )
            "cb" -> showPanel(
                "SKIE CB RADIO — CHANNEL 27",
                "Channel 27 is the Layover doorway to Skie.",
                listOf(
                    PanelAction("TALK TO SKIE", "Open live CB") { openSkieCb() },
                    PanelAction("VOICE COMMANDS", "Skie controls") { openSkieCb() },
                    PanelAction("RADIO SETTINGS", "CB setup") { openSkieCb() },
                    PanelAction("LOG / NOTES", "Quick notes") { launchAny(listOf("com.samsung.android.app.notes", "com.google.android.keep"), "Notes") }
                )
            )
            "aurora" -> showPanel(
                "AURORA",
                "Aurora has her own place in the Layover.",
                listOf(
                    PanelAction("PICTURES", "Aurora photos") { launchAny(listOf("com.sec.android.gallery3d", "com.google.android.apps.photos"), "Pictures") },
                    PanelAction("CAMERA", "Take a picture") { openCamera() }
                )
            )
            "gate" -> showPanel(
                "CONTROL • CREATE • CONNECT",
                "Main system controls stay at the gate.",
                listOf(
                    PanelAction("SETTINGS", "Phone and system settings") { openSettings() },
                    PanelAction("ALL APPS", "Complete app list") { openAppDrawer() },
                    PanelAction("GOOGLE DRIVE", "Connected files") { launchAny(listOf("com.google.android.apps.docs"), "Google Drive") },
                    PanelAction("CHATGPT", "Current assistant") { launchAny(listOf("com.openai.chatgpt"), "ChatGPT") }
                )
            )
            "lake" -> showPanel(
                "LAKE / OUTDOORS",
                "Maps, outdoor tools and recreation access.",
                listOf(
                    PanelAction("MAPS", "Explore and route") { launchAny(listOf("com.google.android.apps.maps"), "Maps") },
                    PanelAction("CAMERA", "Outdoor photos") { openCamera() }
                )
            )
            "animals" -> showPanel(
                "ANIMALS",
                "Living-yard animal area.",
                listOf(
                    PanelAction("CAMERA", "Take a picture") { openCamera() },
                    PanelAction("PHOTOS", "Open pictures") { launchAny(listOf("com.sec.android.gallery3d", "com.google.android.apps.photos"), "Pictures") }
                )
            )
            "eagle" -> showPanel(
                "EAGLE — NEWS / WEATHER",
                "Quick outside information from the upper yard.",
                listOf(
                    PanelAction("WEB", "Open browser") { launchAny(listOf("com.android.chrome", "com.sec.android.app.sbrowser"), "Browser") },
                    PanelAction("MAPS", "Current area") { launchAny(listOf("com.google.android.apps.maps"), "Maps") }
                )
            )
        }
    }

    private data class PanelAction(val title: String, val subtitle: String, val action: () -> Unit)

    private fun showPanel(title: String, subtitle: String, actions: List<PanelAction>) {
        closePanel()

        val shell = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(dp(12), dp(10), dp(12), dp(12))
            background = GradientDrawable().apply {
                setColor(Color.argb(245, 2, 12, 24))
                cornerRadius = dp(22).toFloat()
                setStroke(dp(2), cyan)
            }
        }

        val headingRow = LinearLayout(this).apply {
            orientation = LinearLayout.HORIZONTAL
            gravity = Gravity.CENTER_VERTICAL
        }
        val heading = TextView(this).apply {
            text = title
            textSize = 18f
            setTextColor(Color.WHITE)
            setShadowLayer(8f, 0f, 0f, cyan)
        }
        val close = TextView(this).apply {
            text = "✕"
            textSize = 22f
            setTextColor(Color.WHITE)
            gravity = Gravity.CENTER
            setOnClickListener { closePanel() }
        }
        headingRow.addView(heading, LinearLayout.LayoutParams(0, dp(38), 1f))
        headingRow.addView(close, LinearLayout.LayoutParams(dp(42), dp(38)))
        shell.addView(headingRow)
        shell.addView(TextView(this).apply {
            text = subtitle
            textSize = 12f
            setTextColor(Color.rgb(180, 210, 225))
            setPadding(0, 0, 0, dp(8))
        })

        val scroll = ScrollView(this).apply { isFillViewport = true }
        val list = LinearLayout(this).apply { orientation = LinearLayout.VERTICAL }
        actions.forEach { item ->
            val card = LinearLayout(this).apply {
                orientation = LinearLayout.VERTICAL
                setPadding(dp(12), dp(8), dp(12), dp(8))
                background = GradientDrawable().apply {
                    setColor(Color.rgb(7, 28, 45))
                    cornerRadius = dp(14).toFloat()
                    setStroke(dp(1), Color.rgb(68, 190, 225))
                }
                setOnClickListener { item.action() }
            }
            card.addView(TextView(this).apply {
                text = item.title
                textSize = 15f
                setTextColor(Color.WHITE)
            })
            card.addView(TextView(this).apply {
                text = item.subtitle
                textSize = 11f
                setTextColor(Color.rgb(145, 188, 205))
            })
            list.addView(card, LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, dp(58)).apply { bottomMargin = dp(7) })
        }
        scroll.addView(list)
        shell.addView(scroll, LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, 0, 1f))

        val panelHeight = (resources.displayMetrics.heightPixels * 0.46f).toInt()
        root.addView(shell, FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, panelHeight, Gravity.BOTTOM).apply {
            leftMargin = dp(8); rightMargin = dp(8); bottomMargin = dp(64)
        })
        openPanel = shell
    }

    private fun closePanel() {
        openPanel?.let { root.removeView(it) }
        openPanel = null
    }

    private fun openSchool() {
        try {
            startActivity(Intent(Intent.ACTION_VIEW, Uri.parse("https://jonathanosko32-sketch.github.io/alaska-ice-crystals-living-site/TEST/v157-student1-winter-traction-black-ice-knowledge-lab.html")))
        } catch (_: Exception) {
            toast("School page unavailable")
        }
    }

    private fun openSkieCb() = startActivity(Intent(this, SkieCbActivity::class.java))

    private fun openAppDrawer() {
        val pm = packageManager
        val apps = pm.queryIntentActivities(Intent(Intent.ACTION_MAIN).addCategory(Intent.CATEGORY_LAUNCHER), 0)
            .sortedBy { it.loadLabel(pm).toString().lowercase() }
        val labels = apps.map { it.loadLabel(pm).toString() }.toTypedArray()
        AlertDialog.Builder(this).setTitle("ALL APPS").setItems(labels) { _, i ->
            val info = apps[i].activityInfo
            startActivity(Intent(Intent.ACTION_MAIN).addCategory(Intent.CATEGORY_LAUNCHER).setClassName(info.packageName, info.name))
        }.setNegativeButton("Close", null).show()
    }

    private fun openFiles() {
        try { startActivity(Intent(Intent.ACTION_OPEN_DOCUMENT).setType("*/*").addCategory(Intent.CATEGORY_OPENABLE)) }
        catch (_: Exception) { launchAny(listOf("com.sec.android.app.myfiles", "com.google.android.documentsui"), "Files") }
    }

    private fun openCamera() {
        try { startActivity(Intent(MediaStore.INTENT_ACTION_STILL_IMAGE_CAMERA)) }
        catch (_: Exception) { launchAny(listOf("com.sec.android.app.camera"), "Camera") }
    }

    private fun openSettings() {
        try { startActivity(Intent(Settings.ACTION_SETTINGS)) } catch (_: Exception) { toast("Settings unavailable") }
    }

    private fun launchAny(packages: List<String>, label: String) {
        for (pkg in packages) {
            packageManager.getLaunchIntentForPackage(pkg)?.let { startActivity(it); return }
        }
        toast("$label is not installed")
    }

    private fun toast(text: String) = Toast.makeText(this, text, Toast.LENGTH_SHORT).show()
    private fun dp(v: Int) = (v * resources.displayMetrics.density).toInt()

    companion object { private val cyan = Color.rgb(74, 221, 255) }
}

private class LivingSceneView(
    context: Context,
    private val onHotspot: (String) -> Unit
) : View(context) {
    private val backgroundBitmap: Bitmap = BitmapFactory.decodeResource(
        resources,
        R.drawable.layover_background,
        BitmapFactory.Options().apply { inScaled = false; inPreferredConfig = Bitmap.Config.ARGB_8888 }
    )

    private val bgPaint = Paint(Paint.ANTI_ALIAS_FLAG or Paint.FILTER_BITMAP_FLAG or Paint.DITHER_FLAG)
    private val snowPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply { color = Color.WHITE }
    private val auroraPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply { style = Paint.Style.STROKE; strokeCap = Paint.Cap.ROUND }
    private val firePaint = Paint(Paint.ANTI_ALIAS_FLAG)
    private val smokePaint = Paint(Paint.ANTI_ALIAS_FLAG)
    private val bubbleFill = Paint(Paint.ANTI_ALIAS_FLAG).apply { color = Color.argb(205, 0, 19, 34) }
    private val bubbleStroke = Paint(Paint.ANTI_ALIAS_FLAG).apply { color = Color.rgb(69, 225, 255); style = Paint.Style.STROKE; strokeWidth = 2f }
    private val titlePaint = Paint(Paint.ANTI_ALIAS_FLAG).apply { color = Color.rgb(100, 235, 255); textSize = 26f; typeface = Typeface.DEFAULT_BOLD }
    private val subPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply { color = Color.WHITE; textSize = 18f }
    private val lifePaint = Paint(Paint.ANTI_ALIAS_FLAG).apply { color = Color.argb(155, 20, 15, 12) }
    private val random = Random(27L)

    private val flakes = List(92) {
        SnowFlake(random.nextFloat(), random.nextFloat(), 1.4f + random.nextFloat() * 3.8f, 0.035f + random.nextFloat() * 0.075f, random.nextFloat() * 8f)
    }

    private val scaleDetector = ScaleGestureDetector(context, object : ScaleGestureDetector.SimpleOnScaleGestureListener() {
        override fun onScale(detector: ScaleGestureDetector): Boolean {
            if (locked) return false
            val before = userScale
            userScale = (userScale * detector.scaleFactor).coerceIn(0.88f, 2.6f)
            val ratio = userScale / before
            offsetX = detector.focusX - (detector.focusX - offsetX) * ratio
            offsetY = detector.focusY - (detector.focusY - offsetY) * ratio
            clampOffsets()
            invalidate()
            return true
        }
    })

    private var userScale = 1f
    private var offsetX = 0f
    private var offsetY = 0f
    private var initialized = false
    private var downX = 0f
    private var downY = 0f
    private var lastX = 0f
    private var lastY = 0f
    private var dragging = false
    private var downTime = 0L
    private var snowOn = true
    private var lifeOn = true
    private var locked = false

    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)
        if (width <= 0 || height <= 0) return

        drawBackground(canvas)
        val t = System.currentTimeMillis() / 1000f
        if (lifeOn) {
            drawAurora(canvas, t)
            drawSmoke(canvas, t)
            drawFire(canvas, t)
            drawPeople(canvas, t)
            drawLivingMotion(canvas, t)
        }
        drawHotspotLabels(canvas)
        if (snowOn) drawSnow(canvas, t)

        if (snowOn || lifeOn) postInvalidateDelayed(33)
    }

    private fun baseScale(): Float {
        val usableHeight = height * 0.96f
        return usableHeight / backgroundBitmap.height.toFloat()
    }

    private fun totalScale() = baseScale() * userScale

    private fun drawBackground(canvas: Canvas) {
        val s = totalScale()
        val dw = backgroundBitmap.width * s
        val dh = backgroundBitmap.height * s
        if (!initialized) {
            offsetX = (width - dw) / 2f
            offsetY = (height - dh) / 2f
            initialized = true
        }
        clampOffsets()
        canvas.drawBitmap(backgroundBitmap, null, RectF(offsetX, offsetY, offsetX + dw, offsetY + dh), bgPaint)
    }

    private fun clampOffsets() {
        if (width <= 0 || height <= 0) return
        val s = totalScale()
        val dw = backgroundBitmap.width * s
        val dh = backgroundBitmap.height * s
        val minX = min(0f, width - dw)
        val maxX = max(0f, width - dw)
        val minY = min(0f, height - dh)
        val maxY = max(0f, height - dh)
        offsetX = offsetX.coerceIn(minX, maxX)
        offsetY = offsetY.coerceIn(minY, maxY)
    }

    private fun worldPoint(nx: Float, ny: Float): PointF {
        val s = totalScale()
        return PointF(offsetX + nx * backgroundBitmap.width * s, offsetY + ny * backgroundBitmap.height * s)
    }

    private fun drawAurora(canvas: Canvas, t: Float) {
        val colors = intArrayOf(
            Color.argb(90, 74, 255, 190),
            Color.argb(75, 80, 210, 255),
            Color.argb(70, 185, 90, 255)
        )
        for (band in 0..2) {
            auroraPaint.color = colors[band]
            auroraPaint.strokeWidth = 24f + band * 8f
            auroraPaint.alpha = (70 + 30 * sin(t * 0.55f + band)).toInt().coerceIn(35, 120)
            val path = Path()
            val start = worldPoint(0.02f, 0.08f + band * 0.045f)
            path.moveTo(start.x, start.y)
            for (i in 1..20) {
                val nx = i / 20f
                val ny = 0.09f + band * 0.045f + 0.035f * sin(nx * 9f + t * (0.55f + band * 0.06f))
                val p = worldPoint(nx, ny)
                path.lineTo(p.x, p.y)
            }
            canvas.drawPath(path, auroraPaint)
        }
    }

    private fun drawFire(canvas: Canvas, t: Float) {
        val p = worldPoint(0.58f, 0.49f)
        val flicker = 1f + 0.15f * sin(t * 9f) + 0.07f * sin(t * 15f)
        firePaint.shader = RadialGradient(
            p.x, p.y,
            58f * flicker,
            intArrayOf(Color.argb(205, 255, 180, 60), Color.argb(95, 255, 75, 18), Color.TRANSPARENT),
            floatArrayOf(0f, 0.4f, 1f),
            Shader.TileMode.CLAMP
        )
        canvas.drawCircle(p.x, p.y, 58f * flicker, firePaint)
        firePaint.shader = null
    }

    private fun drawSmoke(canvas: Canvas, t: Float) {
        val sources = listOf(
            Triple(0.33f, 0.34f, 1.0f),
            Triple(0.585f, 0.44f, 0.65f),
            Triple(0.925f, 0.25f, 0.8f)
        )
        smokePaint.color = Color.argb(55, 225, 235, 242)
        for ((sx, sy, speed) in sources) {
            val base = worldPoint(sx, sy)
            for (i in 0..5) {
                val phase = (t * speed + i * 0.24f) % 1.5f
                val y = base.y - phase * 80f
                val x = base.x + sin(t * 0.8f + i) * 10f
                smokePaint.alpha = (55 * (1f - phase / 1.5f)).toInt().coerceIn(5, 55)
                canvas.drawCircle(x, y, 10f + i * 2f, smokePaint)
            }
        }
    }

    private fun drawPeople(canvas: Canvas, t: Float) {
        val seats = listOf(0.51f to 0.49f, 0.54f to 0.515f, 0.62f to 0.505f, 0.65f to 0.48f)
        for ((index, seat) in seats.withIndex()) {
            val p = worldPoint(seat.first, seat.second)
            val bob = sin(t * 1.1f + index) * 2.5f
            lifePaint.color = Color.argb(185, 18, 15, 15)
            canvas.drawCircle(p.x, p.y - 13f + bob, 6f, lifePaint)
            canvas.drawRoundRect(RectF(p.x - 6f, p.y - 8f + bob, p.x + 7f, p.y + 12f + bob), 5f, 5f, lifePaint)
        }
    }

    private fun drawLivingMotion(canvas: Canvas, t: Float) {
        val dog = worldPoint(0.55f + 0.075f * sin(t * 0.22f), 0.70f + 0.015f * sin(t * 0.6f))
        lifePaint.color = Color.argb(95, 0, 0, 0)
        canvas.drawOval(RectF(dog.x - 19f, dog.y + 18f, dog.x + 19f, dog.y + 26f), lifePaint)

        val herd = listOf(
            0.11f to 0.34f,
            0.66f to 0.36f,
            0.72f to 0.37f,
            0.84f to 0.46f
        )
        herd.forEachIndexed { i, pair ->
            val p = worldPoint(pair.first + 0.012f * sin(t * (0.18f + i * 0.025f) + i), pair.second)
            lifePaint.color = Color.argb(65, 0, 0, 0)
            canvas.drawOval(RectF(p.x - 13f, p.y + 8f, p.x + 13f, p.y + 13f), lifePaint)
        }
    }

    private fun drawSnow(canvas: Canvas, t: Float) {
        for (f in flakes) {
            val y = ((f.y + t * f.speed + f.phase) % 1.08f) * height
            val x = f.x * width + sin(t * 0.7f + f.phase * 5f) * 15f
            snowPaint.alpha = (135 + min(120f, f.radius * 20f)).toInt()
            canvas.drawCircle(x, y, f.radius, snowPaint)
        }
    }

    private fun drawHotspotLabels(canvas: Canvas) {
        HOTSPOTS.forEach { h ->
            val p = worldPoint(h.cx, h.cy)
            val w = 150f
            val hgt = 58f
            val r = RectF(p.x - w / 2f, p.y - hgt / 2f, p.x + w / 2f, p.y + hgt / 2f)
            canvas.drawRoundRect(r, 14f, 14f, bubbleFill)
            canvas.drawRoundRect(r, 14f, 14f, bubbleStroke)
            canvas.drawCircle(r.left + 13f, r.centerY(), 7f, bubbleStroke)
            canvas.drawText(h.title, r.left + 27f, r.top + 23f, titlePaint)
            canvas.drawText(h.subtitle, r.left + 27f, r.top + 46f, subPaint)
        }
    }

    override fun onTouchEvent(event: MotionEvent): Boolean {
        scaleDetector.onTouchEvent(event)
        when (event.actionMasked) {
            MotionEvent.ACTION_DOWN -> {
                downX = event.x; downY = event.y; lastX = event.x; lastY = event.y
                downTime = System.currentTimeMillis(); dragging = false
                return true
            }
            MotionEvent.ACTION_MOVE -> {
                if (!locked && !scaleDetector.isInProgress && event.pointerCount == 1) {
                    val dx = event.x - lastX
                    val dy = event.y - lastY
                    if (abs(event.x - downX) > 12f || abs(event.y - downY) > 12f) dragging = true
                    offsetX += dx; offsetY += dy
                    lastX = event.x; lastY = event.y
                    clampOffsets(); invalidate()
                }
                return true
            }
            MotionEvent.ACTION_UP -> {
                if (!dragging && !scaleDetector.isInProgress && System.currentTimeMillis() - downTime < 500L) detectTap(event.x, event.y)
                return true
            }
        }
        return true
    }

    private fun detectTap(screenX: Float, screenY: Float) {
        val s = totalScale()
        val nx = (screenX - offsetX) / (backgroundBitmap.width * s)
        val ny = (screenY - offsetY) / (backgroundBitmap.height * s)
        val hit = HOTSPOTS.firstOrNull { abs(nx - it.cx) <= it.hitW && abs(ny - it.cy) <= it.hitH }
        if (hit != null) onHotspot(hit.id)
    }

    fun resetView() {
        userScale = 1f
        initialized = false
        invalidate()
    }

    fun toggleSnow() {
        snowOn = !snowOn
        Toast.makeText(context, if (snowOn) "Snow on" else "Snow off", Toast.LENGTH_SHORT).show()
        invalidate()
    }

    fun toggleLife() {
        lifeOn = !lifeOn
        Toast.makeText(context, if (lifeOn) "Living effects on" else "Living effects off", Toast.LENGTH_SHORT).show()
        invalidate()
    }

    fun toggleLock() {
        locked = !locked
        Toast.makeText(context, if (locked) "Layover locked" else "Layover unlocked", Toast.LENGTH_SHORT).show()
    }

    private data class SnowFlake(val x: Float, val y: Float, val radius: Float, val speed: Float, val phase: Float)
    private data class Hotspot(val id: String, val title: String, val subtitle: String, val cx: Float, val cy: Float, val hitW: Float = 0.075f, val hitH: Float = 0.055f)

    companion object {
        private val HOTSPOTS = listOf(
            Hotspot("eagle", "Eagle", "News / Weather", 0.90f, 0.10f),
            Hotspot("lake", "Lake", "Maps / Recreation", 0.10f, 0.40f),
            Hotspot("animals", "Animals", "Fun / Info", 0.12f, 0.33f),
            Hotspot("hq", "HQ Building", "School / Library", 0.61f, 0.30f, 0.09f, 0.065f),
            Hotspot("truck", "Truck", "Truck Tools", 0.33f, 0.44f, 0.11f, 0.075f),
            Hotspot("cb", "CB Radio", "SKIE • CH 27", 0.59f, 0.42f),
            Hotspot("workshop", "Workshop", "Tools / Build / Files", 0.90f, 0.53f, 0.09f, 0.07f),
            Hotspot("aurora", "Aurora", "Info / Care", 0.55f, 0.70f),
            Hotspot("gate", "Gate", "Settings / Security", 0.78f, 0.72f)
        )
    }
}
