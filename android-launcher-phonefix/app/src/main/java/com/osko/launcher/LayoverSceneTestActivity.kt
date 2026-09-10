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
    private lateinit var scene: LayoverSceneView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        window.statusBarColor = Color.TRANSPARENT
        window.navigationBarColor = Color.argb(90, 0, 0, 0)
        showScene()
    }

    private fun showScene() {
        val root = FrameLayout(this)
        scene = LayoverSceneView(this) { hotspot -> handleHotspot(hotspot) }
        root.addView(scene, FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT))

        val topBar = LinearLayout(this).apply {
            orientation = LinearLayout.HORIZONTAL
            gravity = Gravity.CENTER
            setPadding(dp(6), dp(8), dp(6), dp(4))
            background = GradientDrawable().apply {
                setColor(Color.argb(120, 0, 14, 28))
                cornerRadius = dp(14).toFloat()
            }
        }
        topBar.addView(control("ALL APPS") { openAppDrawer() }, weighted())
        topBar.addView(control("RESET") { scene.resetView() }, weighted())
        topBar.addView(control("SNOW") { scene.toggleSnow() }, weighted())
        topBar.addView(control("LIFE") { scene.toggleLife() }, weighted())
        root.addView(topBar, FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, dp(54), Gravity.TOP).apply {
            leftMargin = dp(6); rightMargin = dp(6); topMargin = dp(6)
        })

        val bottomBar = LinearLayout(this).apply {
            orientation = LinearLayout.HORIZONTAL
            gravity = Gravity.CENTER
            setPadding(dp(6), 0, dp(6), 0)
            background = GradientDrawable().apply {
                setColor(Color.argb(125, 0, 10, 22))
                cornerRadius = dp(14).toFloat()
            }
        }
        bottomBar.addView(TextView(this).apply {
            text = "Drag • Pinch zoom • Tap the world"
            textSize = 12f
            setTextColor(Color.WHITE)
            gravity = Gravity.CENTER
        }, LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.MATCH_PARENT, 1f))
        bottomBar.addView(control("LOCK") { scene.toggleLock() }, LinearLayout.LayoutParams(dp(76), dp(34)).apply { setMargins(dp(4), 0, 0, 0) })
        root.addView(bottomBar, FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, dp(42), Gravity.BOTTOM).apply {
            leftMargin = dp(8); rightMargin = dp(8); bottomMargin = dp(10)
        })

        setContentView(root)
    }

    private fun weighted() = LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.MATCH_PARENT, 1f).apply {
        setMargins(dp(3), dp(3), dp(3), dp(3))
    }

    private fun control(label: String, action: () -> Unit) = TextView(this).apply {
        text = label
        textSize = 11f
        setTextColor(Color.WHITE)
        gravity = Gravity.CENTER
        setShadowLayer(4f, 1f, 1f, Color.BLACK)
        background = GradientDrawable().apply {
            setColor(Color.argb(150, 4, 28, 44))
            cornerRadius = dp(12).toFloat()
            setStroke(dp(1), Color.rgb(79, 218, 255))
        }
        setOnClickListener { action() }
    }

    private fun handleHotspot(id: String) {
        when (id) {
            "school" -> showSchool()
            "truck" -> showTruckRoom()
            "workshop" -> showWorkshopRoom()
            "cb" -> showCb27()
            "auroraDog" -> showAuroraRoom()
            "gate" -> showControlGate()
            "lake" -> showLakeRoom()
        }
    }

    private fun showSchool() {
        showLivingRoom(
            "ALASKA ICE CRYSTALS — SCHOOL & LIBRARY",
            "Your special school building. The full book library is reserved here while the collection is being completed.",
            listOf(
                RoomAction("DIGITAL SCHOOL", "School / simulator", null) { openWeb("https://jonathanosko32-sketch.github.io/alaska-ice-crystals-living-site/TEST/v157-student1-winter-traction-black-ice-knowledge-lab.html") },
                RoomAction("DICTIONARY", "Reserved shelf", null) { toast("Dictionary shelf reserved") },
                RoomAction("CDL / TRUCKING", "Books + simulator", null) { toast("CDL / trucking library shelf reserved") },
                RoomAction("MECHANICS", "Gas + diesel", null) { toast("Mechanics library shelf reserved") },
                RoomAction("FLIGHT / AVIATION", "Pilot + drone", null) { toast("Flight library shelf reserved") },
                RoomAction("FILES", "School files", "com.sec.android.app.myfiles") { openFiles() }
            )
        )
    }

    private fun showTruckRoom() {
        showLivingRoom(
            "OSKO TRUCK — MOBILE COMMAND",
            "Truck tools live here instead of floating as normal launcher icons.",
            listOf(
                RoomAction("CALCULATOR", "Scale / pay / math", "com.sec.android.app.popupcalculator") { launchAny(listOf("com.sec.android.app.popupcalculator", "com.google.android.calculator"), "Calculator") },
                RoomAction("MAPS", "Route / location", "com.google.android.apps.maps") { launchAny(listOf("com.google.android.apps.maps"), "Maps") },
                RoomAction("CAMERA", "Road / load / documents", "com.sec.android.app.camera") { openCamera() },
                RoomAction("FILES", "Loads / paperwork", "com.sec.android.app.myfiles") { openFiles() },
                RoomAction("NOTES", "Quick road notes", "com.samsung.android.app.notes") { launchAny(listOf("com.samsung.android.app.notes", "com.google.android.keep"), "Notes") },
                RoomAction("SKIE CB — CH 27", "Talk from the truck", null) { showCb27() }
            )
        )
    }

    private fun showWorkshopRoom() {
        showLivingRoom(
            "OSKO WORKSHOP",
            "Mechanics, fabrication, files and build tools live inside the workshop.",
            listOf(
                RoomAction("FILES", "Project files", "com.sec.android.app.myfiles") { openFiles() },
                RoomAction("ZARCHIVER", "Archives", "ru.zdevs.zarchiver") { launchAny(listOf("ru.zdevs.zarchiver"), "ZArchiver") },
                RoomAction("CAMERA", "Parts / build photos", "com.sec.android.app.camera") { openCamera() },
                RoomAction("CALCULATOR", "Measurements / shop math", "com.sec.android.app.popupcalculator") { launchAny(listOf("com.sec.android.app.popupcalculator", "com.google.android.calculator"), "Calculator") },
                RoomAction("GITHUB", "Code / builds", "com.github.android") { launchAny(listOf("com.github.android"), "GitHub") },
                RoomAction("ROBOT BAY", "SKIE • DENALI • WILLOW • KODIAK", null) { toast("Robot service bay reserved") }
            )
        )
    }

    private fun showAuroraRoom() {
        showLivingRoom(
            "AURORA",
            "Aurora has her own place in the Layover.",
            listOf(
                RoomAction("PICTURES", "Aurora photos", "com.sec.android.gallery3d") { launchAny(listOf("com.sec.android.gallery3d", "com.google.android.apps.photos"), "Pictures") },
                RoomAction("CAMERA", "Take a picture", "com.sec.android.app.camera") { openCamera() }
            )
        )
    }

    private fun showControlGate() {
        showLivingRoom(
            "CONTROL • CREATE • CONNECT",
            "The gate is the system-control doorway.",
            listOf(
                RoomAction("SETTINGS", "Android settings", "com.android.settings") { openSettings() },
                RoomAction("ALL APPS", "Emergency app drawer", null) { openAppDrawer() },
                RoomAction("GOOGLE DRIVE", "Connected files", "com.google.android.apps.docs") { launchAny(listOf("com.google.android.apps.docs"), "Google Drive") },
                RoomAction("CHATGPT", "Current assistant", "com.openai.chatgpt") { launchAny(listOf("com.openai.chatgpt"), "ChatGPT") }
            )
        )
    }

    private fun showLakeRoom() {
        showLivingRoom(
            "ALASKA OUTDOORS",
            "Outdoor and map access from the left side of the property.",
            listOf(
                RoomAction("MAPS", "Explore / route", "com.google.android.apps.maps") { launchAny(listOf("com.google.android.apps.maps"), "Maps") },
                RoomAction("CAMERA", "Outdoor photos", "com.sec.android.app.camera") { openCamera() }
            )
        )
    }

    private fun showCb27() {
        AlertDialog.Builder(this)
            .setTitle("SKIE CB RADIO — CHANNEL 27")
            .setMessage("Channel 27 is the Layover doorway to SKIE.")
            .setPositiveButton("OPEN SKIE CB") { _, _ -> startActivity(Intent(this, SkieCbActivity::class.java)) }
            .setNegativeButton("Close", null)
            .show()
    }

    private data class RoomAction(val title: String, val subtitle: String, val packageName: String?, val action: () -> Unit)

    private fun showLivingRoom(title: String, subtitle: String, actions: List<RoomAction>) {
        val outer = FrameLayout(this).apply { setBackgroundColor(Color.rgb(4, 13, 23)) }
        val scroll = ScrollView(this)
        val room = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(dp(16), dp(22), dp(16), dp(28))
        }
        room.addView(TextView(this).apply {
            text = title
            textSize = 24f
            setTextColor(Color.WHITE)
            gravity = Gravity.CENTER
            setShadowLayer(10f, 0f, 0f, Color.rgb(55, 210, 255))
        }, LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT))
        room.addView(TextView(this).apply {
            text = subtitle
            textSize = 14f
            setTextColor(Color.rgb(195, 220, 232))
            gravity = Gravity.CENTER
            setPadding(dp(12), dp(8), dp(12), dp(18))
        })

        actions.forEach { item ->
            val card = LinearLayout(this).apply {
                orientation = LinearLayout.HORIZONTAL
                gravity = Gravity.CENTER_VERTICAL
                setPadding(dp(14), dp(10), dp(14), dp(10))
                background = GradientDrawable().apply {
                    setColor(Color.rgb(9, 31, 47))
                    cornerRadius = dp(18).toFloat()
                    setStroke(dp(1), Color.rgb(62, 199, 232))
                }
                setOnClickListener { item.action() }
            }
            val icon = ImageView(this).apply {
                val d = item.packageName?.let { pkg -> try { packageManager.getApplicationIcon(pkg) } catch (_: Exception) { null } }
                if (d != null) setImageDrawable(d) else setImageResource(android.R.drawable.ic_menu_agenda)
                scaleType = ImageView.ScaleType.FIT_CENTER
            }
            card.addView(icon, LinearLayout.LayoutParams(dp(48), dp(48)).apply { rightMargin = dp(12) })
            val words = LinearLayout(this).apply { orientation = LinearLayout.VERTICAL }
            words.addView(TextView(this).apply {
                text = item.title
                textSize = 16f
                setTextColor(Color.WHITE)
            })
            words.addView(TextView(this).apply {
                text = item.subtitle
                textSize = 12f
                setTextColor(Color.rgb(155, 195, 210))
            })
            card.addView(words, LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1f))
            room.addView(card, LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, dp(74)).apply { bottomMargin = dp(10) })
        }

        val back = TextView(this).apply {
            text = "BACK TO LAYOVER"
            textSize = 14f
            setTextColor(Color.WHITE)
            gravity = Gravity.CENTER
            background = GradientDrawable().apply {
                setColor(Color.rgb(20, 66, 91)); cornerRadius = dp(16).toFloat(); setStroke(dp(1), Color.rgb(83, 227, 255))
            }
            setOnClickListener { showScene() }
        }
        room.addView(back, LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, dp(52)).apply { topMargin = dp(8) })
        scroll.addView(room)
        outer.addView(scroll, FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT))
        setContentView(outer)
    }

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

    private fun openSettings() { try { startActivity(Intent(Settings.ACTION_SETTINGS)) } catch (_: Exception) { toast("Settings unavailable") } }

    private fun openWeb(url: String) {
        try { startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(url))) } catch (_: Exception) { toast("Browser unavailable") }
    }

    private fun launchAny(packages: List<String>, label: String) {
        for (pkg in packages) {
            val intent = packageManager.getLaunchIntentForPackage(pkg)
            if (intent != null) { startActivity(intent); return }
        }
        toast("$label is not installed")
    }

    private fun toast(text: String) = Toast.makeText(this, text, Toast.LENGTH_SHORT).show()
    private fun dp(v: Int) = (v * resources.displayMetrics.density).toInt()
}

private class LayoverSceneView(
    context: Context,
    private val onHotspot: (String) -> Unit
) : View(context) {
    private val bitmapOptions = BitmapFactory.Options().apply { inScaled = false; inPreferredConfig = Bitmap.Config.ARGB_8888 }
    private val backgroundBitmap: Bitmap = BitmapFactory.decodeResource(resources, R.drawable.layover_background, bitmapOptions)
    private val bgPaint = Paint(Paint.ANTI_ALIAS_FLAG or Paint.FILTER_BITMAP_FLAG or Paint.DITHER_FLAG)
    private val snowPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply { color = Color.WHITE }
    private val glowPaint = Paint(Paint.ANTI_ALIAS_FLAG)
    private val smokePaint = Paint(Paint.ANTI_ALIAS_FLAG)
    private val lifePaint = Paint(Paint.ANTI_ALIAS_FLAG or Paint.FILTER_BITMAP_FLAG)
    private val random = Random(27L)

    private val flakes = List(105) {
        SnowFlake(random.nextFloat(), random.nextFloat(), 1.2f + random.nextFloat() * 4.0f, 0.055f + random.nextFloat() * 0.13f, random.nextFloat() * 20f)
    }

    private val scaleDetector = ScaleGestureDetector(context, object : ScaleGestureDetector.SimpleOnScaleGestureListener() {
        override fun onScale(detector: ScaleGestureDetector): Boolean {
            if (locked) return false
            val old = userScale
            userScale = (userScale * detector.scaleFactor).coerceIn(1f, 3.0f)
            val factor = userScale / old
            offsetX = detector.focusX - (detector.focusX - offsetX) * factor
            offsetY = detector.focusY - (detector.focusY - offsetY) * factor
            clampOffsets()
            invalidate()
            return true
        }
    })

    private var userScale = 1.02f
    private var offsetX = 0f
    private var offsetY = 0f
    private var downX = 0f
    private var downY = 0f
    private var lastX = 0f
    private var lastY = 0f
    private var dragging = false
    private var snowOn = true
    private var lifeOn = true
    private var locked = false
    private var initialized = false
    private var downTime = 0L

    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)
        drawBackground(canvas)
        if (lifeOn) {
            drawAurora(canvas)
            drawFire(canvas)
            drawSmoke(canvas)
            drawLivingLights(canvas)
            drawAnimalLife(canvas)
        }
        if (snowOn) drawSnow(canvas)
        if (snowOn || lifeOn) postInvalidateDelayed(33)
    }

    private fun totalScale(): Float {
        val cover = max(width.toFloat() / backgroundBitmap.width, height.toFloat() / backgroundBitmap.height)
        return cover * userScale
    }

    private fun drawBackground(canvas: Canvas) {
        if (width == 0 || height == 0) return
        val total = totalScale()
        val dw = backgroundBitmap.width * total
        val dh = backgroundBitmap.height * total
        if (!initialized) {
            offsetX = (width - dw) / 2f
            offsetY = (height - dh) / 2f
            initialized = true
        }
        clampOffsets()
        val dst = RectF(offsetX, offsetY, offsetX + dw, offsetY + dh)
        canvas.drawBitmap(backgroundBitmap, null, dst, bgPaint)
    }

    private fun scenePoint(nx: Float, ny: Float): PointF {
        val total = totalScale()
        return PointF(offsetX + nx * backgroundBitmap.width * total, offsetY + ny * backgroundBitmap.height * total)
    }

    private fun drawAurora(canvas: Canvas) {
        val t = System.currentTimeMillis() / 1000f
        val save = canvas.save()
        val topLeft = scenePoint(0f, 0f)
        val bottomRight = scenePoint(1f, 0.30f)
        canvas.clipRect(topLeft.x, topLeft.y, bottomRight.x, bottomRight.y)

        val colors = intArrayOf(
            Color.argb(0, 30, 255, 170),
            Color.argb(115, 65, 255, 185),
            Color.argb(80, 60, 170, 255),
            Color.argb(0, 90, 60, 255)
        )
        val phase = sin(t * 0.28f) * 0.05f
        for (band in 0..4) {
            val path = Path()
            val baseY = 0.035f + band * 0.032f
            val start = scenePoint(-0.05f, baseY)
            path.moveTo(start.x, start.y)
            var x = -0.05f
            while (x <= 1.05f) {
                val wave = sin((x * 9.5f) + t * (0.45f + band * 0.06f) + band) * (0.018f + band * 0.002f)
                val breathe = sin(t * 0.18f + x * 3f + band) * 0.008f
                val p = scenePoint(x, baseY + wave + breathe + phase)
                path.lineTo(p.x, p.y)
                x += 0.035f
            }
            val lower = scenePoint(1.05f, baseY + 0.09f + sin(t * 0.22f + band) * 0.015f)
            path.lineTo(lower.x, lower.y)
            x = 1.05f
            while (x >= -0.05f) {
                val wave = sin((x * 8.2f) + t * 0.38f + band) * 0.015f
                val p = scenePoint(x, baseY + 0.075f + wave)
                path.lineTo(p.x, p.y)
                x -= 0.04f
            }
            path.close()
            val l = scenePoint(0f, baseY).y
            val r = scenePoint(0f, baseY + 0.12f).y
            glowPaint.shader = LinearGradient(0f, l, 0f, r, colors, null, Shader.TileMode.CLAMP)
            glowPaint.alpha = 115 + (20 * sin(t * 0.34f + band)).toInt()
            canvas.drawPath(path, glowPaint)
        }
        glowPaint.shader = null
        canvas.restoreToCount(save)
    }

    private fun drawFire(canvas: Canvas) {
        val t = System.currentTimeMillis() / 1000f
        val c = scenePoint(0.586f, 0.505f)
        val s = totalScale() * backgroundBitmap.width / 1536f
        val flicker = 0.82f + 0.18f * sin(t * 7.2f)
        val flame = Path().apply {
            moveTo(c.x, c.y + 14f * s)
            cubicTo(c.x - 15f * s, c.y + 2f * s, c.x - 7f * s, c.y - 20f * s * flicker, c.x, c.y - 33f * s * flicker)
            cubicTo(c.x + 5f * s, c.y - 18f * s, c.x + 17f * s, c.y - 3f * s, c.x + 9f * s, c.y + 14f * s)
            close()
        }
        glowPaint.shader = RadialGradient(c.x, c.y, 42f * s, intArrayOf(Color.argb(215,255,220,110), Color.argb(165,255,95,20), Color.TRANSPARENT), null, Shader.TileMode.CLAMP)
        canvas.drawCircle(c.x, c.y, 42f * s, glowPaint)
        glowPaint.shader = LinearGradient(c.x, c.y - 35f*s, c.x, c.y + 15f*s, Color.rgb(255,245,180), Color.rgb(255,65,10), Shader.TileMode.CLAMP)
        canvas.drawPath(flame, glowPaint)
        glowPaint.shader = null
    }

    private fun drawSmoke(canvas: Canvas) {
        val t = System.currentTimeMillis() / 1000f
        val sources = listOf(
            Triple(0.938f, 0.173f, 1.0f),
            Triple(0.338f, 0.352f, 0.65f)
        )
        for ((sx, sy, strength) in sources) {
            val base = scenePoint(sx, sy)
            val scale = totalScale() * backgroundBitmap.width / 1536f
            for (i in 0..6) {
                val age = ((t * (0.20f + strength * 0.05f) + i * 0.14f) % 1f)
                val y = base.y - age * 95f * scale
                val x = base.x + sin(t * 0.7f + i * 1.7f) * (8f + age * 16f) * scale
                val radius = (5f + age * 15f) * scale
                smokePaint.color = Color.argb((70 * (1f-age)).toInt().coerceAtLeast(8), 225, 235, 242)
                canvas.drawCircle(x, y, radius, smokePaint)
            }
        }
    }

    private fun drawLivingLights(canvas: Canvas) {
        val t = System.currentTimeMillis() / 1000f
        val pulse = 0.72f + 0.28f * ((sin(t * 1.4f) + 1f) / 2f)
        val lamps = listOf(
            0.188f to 0.545f, 0.757f to 0.523f, 0.668f to 0.360f,
            0.617f to 0.337f, 0.547f to 0.344f, 0.303f to 0.546f
        )
        val scale = totalScale() * backgroundBitmap.width / 1536f
        for ((x,y) in lamps) {
            val p = scenePoint(x,y)
            glowPaint.shader = RadialGradient(p.x,p.y,22f*scale, Color.argb((115*pulse).toInt(),60,225,255), Color.TRANSPARENT, Shader.TileMode.CLAMP)
            canvas.drawCircle(p.x,p.y,22f*scale,glowPaint)
        }
        glowPaint.shader = null
    }

    private fun drawAnimalLife(canvas: Canvas) {
        val t = System.currentTimeMillis() / 1000f
        // Subtle localized movement pass over existing animals. This keeps the original artwork intact
        // while giving the dog, horses and wildlife a small breathing/weight-shift motion.
        val zones = listOf(
            MotionZone(0.500f,0.645f,0.585f,0.765f, 1.8f, 0f),
            MotionZone(0.634f,0.342f,0.753f,0.431f, 1.4f, 1.7f),
            MotionZone(0.024f,0.294f,0.112f,0.420f, 1.1f, 3.2f),
            MotionZone(0.704f,0.421f,0.777f,0.515f, 1.0f, 4.4f),
            MotionZone(0.882f,0.586f,0.963f,0.735f, 1.2f, 5.1f)
        )
        val total = totalScale()
        for (z in zones) {
            val src = Rect(
                (z.l * backgroundBitmap.width).toInt(),
                (z.t * backgroundBitmap.height).toInt(),
                (z.r * backgroundBitmap.width).toInt(),
                (z.b * backgroundBitmap.height).toInt()
            )
            val p1 = scenePoint(z.l,z.t)
            val p2 = scenePoint(z.r,z.b)
            val dx = sin(t * 0.75f + z.phase) * z.amount * total
            val dy = sin(t * 0.48f + z.phase) * z.amount * 0.45f * total
            lifePaint.alpha = 58
            canvas.drawBitmap(backgroundBitmap, src, RectF(p1.x+dx,p1.y+dy,p2.x+dx,p2.y+dy), lifePaint)
        }
        lifePaint.alpha = 255
    }

    private fun drawSnow(canvas: Canvas) {
        val t = System.currentTimeMillis() / 1000f
        for (f in flakes) {
            val y = ((f.y + t * f.speed + f.phase) % 1.08f) * height
            val x = f.x * width + sin(t * 0.75f + f.phase * 3f) * 16f
            snowPaint.alpha = (145 + min(110f, f.radius * 20f)).toInt()
            canvas.drawCircle(x, y, f.radius, snowPaint)
        }
    }

    private fun clampOffsets() {
        if (width == 0 || height == 0) return
        val total = totalScale()
        val dw = backgroundBitmap.width * total
        val dh = backgroundBitmap.height * total
        val minX = min(0f, width - dw)
        val minY = min(0f, height - dh)
        offsetX = offsetX.coerceIn(minX, 0f)
        offsetY = offsetY.coerceIn(minY, 0f)
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
                    val dx = event.x - lastX; val dy = event.y - lastY
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
        val total = totalScale()
        val nx = ((screenX - offsetX) / total) / backgroundBitmap.width
        val ny = ((screenY - offsetY) / total) / backgroundBitmap.height
        val hit = HOTSPOTS.firstOrNull { nx in it.left..it.right && ny in it.top..it.bottom }
        if (hit != null) onHotspot(hit.id)
    }

    fun resetView() {
        userScale = 1.02f
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
        Toast.makeText(context, if (locked) "Layover view locked" else "Layover view unlocked", Toast.LENGTH_SHORT).show()
    }

    private data class SnowFlake(val x: Float, val y: Float, val radius: Float, val speed: Float, val phase: Float)
    private data class Hotspot(val id: String, val left: Float, val top: Float, val right: Float, val bottom: Float)
    private data class MotionZone(val l: Float,val t: Float,val r: Float,val b: Float,val amount: Float,val phase: Float)

    companion object {
        private val HOTSPOTS = listOf(
            Hotspot("school", 0.52f, 0.19f, 0.70f, 0.34f),
            Hotspot("truck", 0.12f, 0.31f, 0.53f, 0.52f),
            Hotspot("workshop", 0.82f, 0.43f, 1.00f, 0.68f),
            Hotspot("cb", 0.52f, 0.37f, 0.66f, 0.56f),
            Hotspot("auroraDog", 0.48f, 0.61f, 0.61f, 0.78f),
            Hotspot("gate", 0.68f, 0.55f, 1.00f, 0.94f),
            Hotspot("lake", 0.00f, 0.26f, 0.25f, 0.49f)
        )
    }
}
