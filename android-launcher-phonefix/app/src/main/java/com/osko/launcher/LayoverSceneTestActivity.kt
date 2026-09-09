package com.osko.launcher

import android.app.Activity
import android.app.AlertDialog
import android.content.Context
import android.content.Intent
import android.graphics.*
import android.net.Uri
import android.os.Bundle
import android.provider.MediaStore
import android.provider.Settings
import android.view.*
import android.widget.FrameLayout
import android.widget.TextView
import android.widget.Toast
import java.util.Random
import kotlin.math.abs
import kotlin.math.max
import kotlin.math.min

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

        val controls = arrayOf(
            control("ALL APPS") { openAppDrawer() },
            control("RESET") { scene.resetView() },
            control("SNOW") { scene.toggleSnow() },
            control("LOCK") { scene.toggleLock() }
        )
        controls.forEachIndexed { index, view ->
            root.addView(view, FrameLayout.LayoutParams(dp(84), dp(38), Gravity.TOP or Gravity.START).apply {
                leftMargin = dp(8 + index * 88)
                topMargin = dp(10)
            })
        }

        root.addView(TextView(this).apply {
            text = "Drag to explore • Pinch to zoom • Tap objects"
            textSize = 12f
            setTextColor(Color.WHITE)
            gravity = Gravity.CENTER
            setShadowLayer(5f, 1f, 2f, Color.BLACK)
            setPadding(dp(8), dp(4), dp(8), dp(4))
            setBackgroundColor(Color.argb(110, 0, 0, 0))
        }, FrameLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, dp(30), Gravity.BOTTOM or Gravity.CENTER_HORIZONTAL).apply {
            bottomMargin = dp(12)
        })

        setContentView(root)
    }

    private fun control(label: String, action: () -> Unit) = TextView(this).apply {
        text = label
        textSize = 12f
        setTextColor(Color.WHITE)
        gravity = Gravity.CENTER
        setBackgroundColor(Color.argb(145, 5, 28, 44))
        setOnClickListener { action() }
    }

    private fun handleHotspot(id: String) {
        when (id) {
            "hq" -> showHQ()
            "truck" -> showTruck()
            "workshop" -> showWorkshop()
            "cb" -> showCb27()
            "aurora" -> showAurora()
            "gate" -> openSettings()
            "lake" -> launchAny(listOf("com.google.android.apps.maps"), "Maps")
        }
    }

    private fun showHQ() {
        val items = arrayOf("Google Drive", "Gmail", "ChatGPT / Skie", "GitHub", "Files", "All Apps")
        AlertDialog.Builder(this).setTitle("ALASKA ICE CRYSTALS HQ").setItems(items) { _, i ->
            when (i) {
                0 -> launchAny(listOf("com.google.android.apps.docs"), "Google Drive")
                1 -> launchAny(listOf("com.google.android.gm"), "Gmail")
                2 -> launchAny(listOf("com.openai.chatgpt"), "ChatGPT")
                3 -> launchAny(listOf("com.github.android"), "GitHub")
                4 -> openFiles()
                5 -> openAppDrawer()
            }
        }.setNegativeButton("Close", null).show()
    }

    private fun showTruck() {
        val items = arrayOf("Calculator", "Maps", "Camera", "Files", "Notes")
        AlertDialog.Builder(this).setTitle("OSKO TRUCK").setItems(items) { _, i ->
            when (i) {
                0 -> launchAny(listOf("com.sec.android.app.popupcalculator", "com.google.android.calculator"), "Calculator")
                1 -> launchAny(listOf("com.google.android.apps.maps"), "Maps")
                2 -> openCamera()
                3 -> openFiles()
                4 -> launchAny(listOf("com.samsung.android.app.notes", "com.google.android.keep"), "Notes")
            }
        }.setNegativeButton("Close", null).show()
    }

    private fun showWorkshop() {
        val items = arrayOf("Files", "ZArchiver", "Camera", "Calculator", "GitHub")
        AlertDialog.Builder(this).setTitle("OSKO WORKSHOP").setItems(items) { _, i ->
            when (i) {
                0 -> openFiles()
                1 -> launchAny(listOf("ru.zdevs.zarchiver"), "ZArchiver")
                2 -> openCamera()
                3 -> launchAny(listOf("com.sec.android.app.popupcalculator", "com.google.android.calculator"), "Calculator")
                4 -> launchAny(listOf("com.github.android"), "GitHub")
            }
        }.setNegativeButton("Close", null).show()
    }

    private fun showCb27() {
        AlertDialog.Builder(this)
            .setTitle("SKIE CB RADIO — CHANNEL 27")
            .setMessage("Channel 27 is the Layover CB doorway. Open the live Skie radio from here.")
            .setPositiveButton("OPEN SKIE CB") { _, _ -> startActivity(Intent(this, SkieCbActivity::class.java)) }
            .setNegativeButton("Close", null)
            .show()
    }

    private fun showAurora() {
        AlertDialog.Builder(this).setTitle("AURORA").setItems(arrayOf("Pictures", "Camera")) { _, i ->
            if (i == 0) launchAny(listOf("com.sec.android.gallery3d", "com.google.android.apps.photos"), "Pictures") else openCamera()
        }.setNegativeButton("Close", null).show()
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

    private fun openSettings() { startActivity(Intent(Settings.ACTION_SETTINGS)) }

    private fun launchAny(packages: List<String>, label: String) {
        for (pkg in packages) {
            val intent = packageManager.getLaunchIntentForPackage(pkg)
            if (intent != null) { startActivity(intent); return }
        }
        Toast.makeText(this, "$label is not installed", Toast.LENGTH_SHORT).show()
    }

    private fun dp(v: Int) = (v * resources.displayMetrics.density).toInt()
}

private class LayoverSceneView(
    context: Context,
    private val onHotspot: (String) -> Unit
) : View(context) {
    private val backgroundBitmap: Bitmap = BitmapFactory.decodeResource(resources, R.drawable.layover_background)
    private val bgPaint = Paint(Paint.ANTI_ALIAS_FLAG or Paint.FILTER_BITMAP_FLAG)
    private val snowPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply { color = Color.WHITE }
    private val random = Random(27L)
    private val flakes = List(85) {
        SnowFlake(random.nextFloat(), random.nextFloat(), 1.5f + random.nextFloat() * 4.5f, 0.12f + random.nextFloat() * 0.30f, random.nextFloat() * 1000f)
    }
    private val scaleDetector = ScaleGestureDetector(context, object : ScaleGestureDetector.SimpleOnScaleGestureListener() {
        override fun onScale(detector: ScaleGestureDetector): Boolean {
            if (locked) return false
            val old = userScale
            userScale = (userScale * detector.scaleFactor).coerceIn(1f, 3.2f)
            val factor = userScale / old
            offsetX = detector.focusX - (detector.focusX - offsetX) * factor
            offsetY = detector.focusY - (detector.focusY - offsetY) * factor
            clampOffsets()
            invalidate()
            return true
        }
    })

    private var userScale = 1.15f
    private var offsetX = 0f
    private var offsetY = 0f
    private var downX = 0f
    private var downY = 0f
    private var lastX = 0f
    private var lastY = 0f
    private var dragging = false
    private var snowOn = true
    private var locked = false
    private var initialized = false
    private var downTime = 0L

    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)
        drawBackground(canvas)
        if (snowOn) drawSnow(canvas)
        if (snowOn) postInvalidateDelayed(33)
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

    private fun drawSnow(canvas: Canvas) {
        val t = (System.currentTimeMillis() % 100000L) / 1000f
        for (f in flakes) {
            val y = ((f.y + t * f.speed + f.phase) % 1.08f) * height
            val x = (f.x * width + kotlin.math.sin(t * 1.2f + f.phase * 4f) * 18f)
            snowPaint.alpha = (150 + min(105f, f.radius * 18f)).toInt()
            canvas.drawCircle(x, y, f.radius, snowPaint)
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
                    val dx = event.x - lastX; val dy = event.y - lastY
                    if (abs(event.x - downX) > 12f || abs(event.y - downY) > 12f) dragging = true
                    offsetX += dx; offsetY += dy
                    lastX = event.x; lastY = event.y
                    clampOffsets()
                    invalidate()
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
        userScale = 1.15f
        initialized = false
        invalidate()
    }

    fun toggleSnow() {
        snowOn = !snowOn
        Toast.makeText(context, if (snowOn) "Snow on" else "Snow off", Toast.LENGTH_SHORT).show()
        invalidate()
    }

    fun toggleLock() {
        locked = !locked
        Toast.makeText(context, if (locked) "Layover view locked" else "Layover view unlocked", Toast.LENGTH_SHORT).show()
    }

    private data class SnowFlake(val x: Float, val y: Float, val radius: Float, val speed: Float, val phase: Float)
    private data class Hotspot(val id: String, val left: Float, val top: Float, val right: Float, val bottom: Float)

    companion object {
        private val HOTSPOTS = listOf(
            Hotspot("hq", 0.34f, 0.34f, 0.78f, 0.50f),
            Hotspot("truck", 0.05f, 0.47f, 0.64f, 0.69f),
            Hotspot("workshop", 0.73f, 0.49f, 1.00f, 0.70f),
            Hotspot("cb", 0.48f, 0.56f, 0.72f, 0.72f),
            Hotspot("aurora", 0.38f, 0.72f, 0.68f, 0.91f),
            Hotspot("gate", 0.72f, 0.76f, 1.00f, 1.00f),
            Hotspot("lake", 0.00f, 0.42f, 0.28f, 0.60f)
        )
    }
}
