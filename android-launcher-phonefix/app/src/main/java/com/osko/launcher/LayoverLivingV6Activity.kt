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

/**
 * V11 CODED DUPLICATE — CONSOLIDATED LIVING LAYOVER MASTER
 *
 * IMPORTANT:
 * - This file exists only on branch v11-coded-duplicate.
 * - Protected V11 is not to be edited from this work.
 * - One world-coordinate system drives the background, roads, buildings,
 *   hotspots, Aurora route, life animation, zoom and pan.
 * - Future AI/voice and robot routing should address named destinations in
 *   this world instead of screen pixels.
 */
class LayoverLivingV6Activity : Activity() {
    private lateinit var root: FrameLayout
    private lateinit var scene: LivingWorldMasterView
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
        scene = LivingWorldMasterView(this) { id -> handleHotspot(id) }
        root.addView(scene, FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT))

        val header = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            gravity = Gravity.CENTER
            setPadding(dp(8), dp(6), dp(8), dp(6))
            background = panelBg(140)
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
            setPadding(dp(5), dp(5), dp(5), dp(5))
            background = panelBg(150)
        }
        controls.addView(control("APPS") { openAppDrawer() }, weighted())
        controls.addView(control("−") { scene.zoomBy(0.84f) }, weighted())
        controls.addView(control("RESET") { scene.resetView() }, weighted())
        controls.addView(control("+") { scene.zoomBy(1.18f) }, weighted())
        controls.addView(control("LIFE") { scene.toggleLife() }, weighted())
        controls.addView(control("LOCK") { scene.toggleLock() }, weighted())
        root.addView(controls, FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, dp(48), Gravity.BOTTOM).apply {
            leftMargin = dp(8); rightMargin = dp(8); bottomMargin = dp(10)
        })

        setContentView(root)
    }

    private fun panelBg(alpha: Int) = GradientDrawable().apply {
        setColor(Color.argb(alpha, 0, 12, 26))
        cornerRadius = dp(18).toFloat()
        setStroke(dp(1), cyan)
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
            setColor(Color.argb(170, 5, 28, 44)); cornerRadius = dp(12).toFloat(); setStroke(dp(1), cyan)
        }
        setOnClickListener { action() }
    }

    private data class PanelAction(val title: String, val subtitle: String, val action: () -> Unit)

    private fun handleHotspot(id: String) {
        when (id) {
            "hq" -> showPanel("HQ INTERIOR — SCHOOL & LIBRARY", "School, books and training stay together here.", listOf(
                PanelAction("SCHOOL / TRAINING", "GED • college • simulator") { openSchool() },
                PanelAction("DICTIONARY", "Library shelf") { toast("Dictionary shelf") },
                PanelAction("MECHANICS", "Gas • diesel • on-road • off-road") { toast("Mechanics library") },
                PanelAction("CDL / TRUCKING", "Training • loads • safety") { toast("CDL and trucking library") },
                PanelAction("GOOGLE DRIVE", "School and project files") { launchAny(listOf("com.google.android.apps.docs"), "Google Drive") },
                PanelAction("FILES", "Phone files") { openFiles() }
            ))
            "truck" -> showPanel("TRUCK CAB — MOBILE COMMAND", "Truck tools live together inside the truck.", listOf(
                PanelAction("TRIP PLANNING", "Maps and route") { launchAny(listOf("com.google.android.apps.maps"), "Maps") },
                PanelAction("LOADS / NAVIGATION", "Routes and loads") { launchAny(listOf("com.google.android.apps.maps"), "Maps") },
                PanelAction("FUEL / DEF", "Fuel tools") { toast("Fuel and DEF area") },
                PanelAction("CALCULATOR", "Scale • pay • math") { launchAny(listOf("com.sec.android.app.popupcalculator", "com.google.android.calculator"), "Calculator") },
                PanelAction("CAMERA", "Road • loads • documents") { openCamera() },
                PanelAction("FILES", "Loads • BOL • paperwork") { openFiles() },
                PanelAction("SKIE CB — CH 27", "Talk to SKIE") { openSkieCb() }
            ))
            "workshop" -> showPanel("WORKSHOP INTERIOR", "Tools, builds, manuals and robot work live here.", listOf(
                PanelAction("TOOLS", "Shop tools and references") { openFiles() },
                PanelAction("3D PRINTER", "Printer work area") { toast("3D printer area") },
                PanelAction("BUILD PLANS", "Project plans") { openFiles() },
                PanelAction("TRUCK MODS", "Truck build work") { openFiles() },
                PanelAction("FILES / MANUALS", "Project files") { openFiles() },
                PanelAction("GITHUB", "Code and builds") { launchAny(listOf("com.github.android"), "GitHub") },
                PanelAction("ROBOT BAY", "Service robot work area") { toast("Robot service bay") }
            ))
            "cb" -> showPanel("CB RADIO — SKIE — CHANNEL 27", "Channel 27 is the Living Layover doorway to SKIE.", listOf(
                PanelAction("TALK TO SKIE", "Open live CB") { openSkieCb() },
                PanelAction("VOICE COMMANDS", "Voice control") { openSkieCb() },
                PanelAction("RADIO SETTINGS", "CB setup") { openSkieCb() }
            ))
            "aurora" -> showPanel("AURORA", "Aurora follows an approved route inside the same world coordinates.", listOf(
                PanelAction("PICTURES", "Aurora photos") { launchAny(listOf("com.sec.android.gallery3d", "com.google.android.apps.photos"), "Pictures") },
                PanelAction("CAMERA", "Take a picture") { openCamera() },
                PanelAction("CARE / INFO", "Aurora records") { toast("Aurora care area") }
            ))
            "gate" -> showPanel("CONTROL • CREATE • CONNECT", "Main system controls stay at the gate.", listOf(
                PanelAction("SETTINGS", "Phone and system settings") { openSettings() },
                PanelAction("ALL APPS", "Complete app list") { openAppDrawer() },
                PanelAction("GOOGLE DRIVE", "Connected files") { launchAny(listOf("com.google.android.apps.docs"), "Google Drive") },
                PanelAction("CHATGPT", "Current assistant") { launchAny(listOf("com.openai.chatgpt"), "ChatGPT") }
            ))
            "lake" -> showPanel("LAKE / OUTDOORS", "Maps, fishing, weather and recreation access.", listOf(
                PanelAction("MAPS", "Explore and route") { launchAny(listOf("com.google.android.apps.maps"), "Maps") },
                PanelAction("WEATHER / WEB", "Outdoor information") { launchAny(listOf("com.android.chrome", "com.sec.android.app.sbrowser"), "Browser") },
                PanelAction("CAMERA", "Outdoor photos") { openCamera() }
            ))
            "animals" -> showPanel("ANIMALS", "Living-yard animal area.", listOf(
                PanelAction("CAMERA", "Take a picture") { openCamera() },
                PanelAction("PHOTOS", "Open pictures") { launchAny(listOf("com.sec.android.gallery3d", "com.google.android.apps.photos"), "Pictures") }
            ))
            "eagle" -> showPanel("EAGLE — NEWS / WEATHER", "Quick outside information.", listOf(
                PanelAction("NEWS / WEB", "Open browser") { launchAny(listOf("com.android.chrome", "com.sec.android.app.sbrowser"), "Browser") },
                PanelAction("MAPS", "Current area") { launchAny(listOf("com.google.android.apps.maps"), "Maps") }
            ))
            "tower" -> showPanel("TOWER — CAMERA", "Camera and security access.", listOf(
                PanelAction("CAMERA", "Open camera") { openCamera() },
                PanelAction("SETTINGS", "Security settings") { openSettings() }
            ))
        }
    }

    private fun showPanel(title: String, subtitle: String, actions: List<PanelAction>) {
        closePanel()
        val shell = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(dp(10), dp(8), dp(10), dp(10))
            background = GradientDrawable().apply {
                setColor(Color.argb(246, 2, 12, 24)); cornerRadius = dp(22).toFloat(); setStroke(dp(2), cyan)
            }
        }
        val heading = LinearLayout(this).apply { orientation = LinearLayout.HORIZONTAL; gravity = Gravity.CENTER_VERTICAL }
        heading.addView(TextView(this).apply {
            text = title; textSize = 17f; setTextColor(Color.WHITE); setShadowLayer(8f, 0f, 0f, cyan)
        }, LinearLayout.LayoutParams(0, dp(42), 1f))
        heading.addView(TextView(this).apply {
            text = "✕"; textSize = 22f; setTextColor(Color.WHITE); gravity = Gravity.CENTER; setOnClickListener { closePanel() }
        }, LinearLayout.LayoutParams(dp(42), dp(42)))
        shell.addView(heading)
        shell.addView(TextView(this).apply {
            text = subtitle; textSize = 11f; setTextColor(Color.rgb(180, 210, 225)); setPadding(0, 0, 0, dp(8))
        })
        val scroll = ScrollView(this)
        val list = LinearLayout(this).apply { orientation = LinearLayout.VERTICAL }
        actions.forEach { item ->
            val card = LinearLayout(this).apply {
                orientation = LinearLayout.VERTICAL; setPadding(dp(12), dp(7), dp(12), dp(7))
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
    private fun openFiles() { try { startActivity(Intent(Intent.ACTION_OPEN_DOCUMENT).setType("*/*").addCategory(Intent.CATEGORY_OPENABLE)) } catch (_: Exception) { launchAny(listOf("com.sec.android.app.myfiles", "com.google.android.documentsui"), "Files") } }
    private fun openCamera() { try { startActivity(Intent(MediaStore.INTENT_ACTION_STILL_IMAGE_CAMERA)) } catch (_: Exception) { launchAny(listOf("com.sec.android.app.camera"), "Camera") } }
    private fun openSettings() { try { startActivity(Intent(Settings.ACTION_SETTINGS)) } catch (_: Exception) { toast("Settings unavailable") } }
    private fun launchAny(packages: List<String>, label: String) { for (pkg in packages) packageManager.getLaunchIntentForPackage(pkg)?.let { startActivity(it); return }; toast("$label is not installed") }
    private fun toast(text: String) = Toast.makeText(this, text, Toast.LENGTH_SHORT).show()
    private fun dp(v: Int) = (v * resources.displayMetrics.density).toInt()

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

    companion object { private val cyan = Color.rgb(74, 221, 255) }
}

/** One transform for every object in the Living Layover. */
private class LivingWorldMasterView(context: Context, private val onHotspot: (String) -> Unit) : View(context) {
    private val backgroundBitmap = BitmapFactory.decodeResource(resources, R.drawable.layover_background, BitmapFactory.Options().apply {
        inScaled = false; inPreferredConfig = Bitmap.Config.ARGB_8888
    })
    private val bgPaint = Paint(Paint.ANTI_ALIAS_FLAG or Paint.FILTER_BITMAP_FLAG or Paint.DITHER_FLAG)
    private val lifePaint = Paint(Paint.ANTI_ALIAS_FLAG)
    private val snowPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply { color = Color.WHITE }
    private val roadPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply { style = Paint.Style.STROKE; strokeCap = Paint.Cap.ROUND; color = Color.argb(120, 55, 62, 70) }
    private val roadEdgePaint = Paint(Paint.ANTI_ALIAS_FLAG).apply { style = Paint.Style.STROKE; strokeCap = Paint.Cap.ROUND; color = Color.argb(120, 210, 220, 225) }
    private val labelFill = Paint(Paint.ANTI_ALIAS_FLAG).apply { color = Color.argb(205, 0, 19, 34) }
    private val labelStroke = Paint(Paint.ANTI_ALIAS_FLAG).apply { color = Color.rgb(69, 225, 255); style = Paint.Style.STROKE; strokeWidth = 2f }
    private val titlePaint = Paint(Paint.ANTI_ALIAS_FLAG).apply { color = Color.rgb(100, 235, 255); textSize = 25f; typeface = Typeface.DEFAULT_BOLD }
    private val subPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply { color = Color.WHITE; textSize = 17f }
    private val random = Random(27L)
    private val flakes = List(120) { SnowFlake(random.nextFloat(), random.nextFloat(), 1.4f + random.nextFloat() * 4.8f, 0.045f + random.nextFloat() * 0.10f, random.nextFloat() * 8f) }

    // Future additions belong here as normalized world coordinates, not screen pixels.
    private val roadMain = listOf(
        WorldPt(0.49f, 0.78f), WorldPt(0.51f, 0.69f), WorldPt(0.54f, 0.61f),
        WorldPt(0.58f, 0.55f), WorldPt(0.63f, 0.51f), WorldPt(0.69f, 0.50f),
        WorldPt(0.74f, 0.53f), WorldPt(0.79f, 0.59f), WorldPt(0.82f, 0.68f)
    )
    private val auroraRoute = roadMain + roadMain.asReversed().drop(1)
    private val hotspots = listOf(
        Hotspot("eagle", "EAGLE", "NEWS / WEATHER", 0.90f, 0.10f),
        Hotspot("tower", "TOWER", "CAMERA", 0.78f, 0.25f),
        Hotspot("hq", "HQ", "SCHOOL / LIBRARY", 0.61f, 0.30f),
        Hotspot("truck", "TRUCK", "TRUCK TOOLS", 0.33f, 0.44f),
        Hotspot("cb", "CB", "SKIE • CH 27", 0.59f, 0.42f),
        Hotspot("workshop", "WORKSHOP", "TOOLS / BUILD / FILES", 0.90f, 0.53f),
        Hotspot("aurora", "AURORA", "INFO / CARE", 0.55f, 0.70f),
        Hotspot("gate", "GATE", "SETTINGS / SECURITY", 0.78f, 0.72f),
        Hotspot("lake", "LAKE", "MAPS / RECREATION", 0.10f, 0.40f),
        Hotspot("animals", "ANIMALS", "FUN / INFO", 0.12f, 0.33f)
    )

    private var userScale = 1f
    private var offsetX = 0f
    private var offsetY = 0f
    private var initialized = false
    private var locked = false
    private var lifeOn = true
    private var snowOn = true
    private var downX = 0f
    private var downY = 0f
    private var lastX = 0f
    private var lastY = 0f
    private var dragging = false
    private var downTime = 0L

    private val scaleDetector = ScaleGestureDetector(context, object : ScaleGestureDetector.SimpleOnScaleGestureListener() {
        override fun onScale(detector: ScaleGestureDetector): Boolean {
            if (locked) return false
            setScaleAround(userScale * detector.scaleFactor, detector.focusX, detector.focusY)
            return true
        }
    })

    fun resetView() { userScale = 1f; initialized = false; offsetX = 0f; offsetY = 0f; invalidate() }
    fun toggleLife() { lifeOn = !lifeOn; invalidate() }
    fun toggleLock() { locked = !locked; invalidate() }
    fun zoomBy(factor: Float) { setScaleAround(userScale * factor, width / 2f, height / 2f) }

    private fun setScaleAround(newScale: Float, focusX: Float, focusY: Float) {
        if (width <= 0 || height <= 0 || locked) return
        val old = userScale
        userScale = newScale.coerceIn(0.78f, 3.6f)
        val ratio = userScale / old
        offsetX = focusX - (focusX - offsetX) * ratio
        offsetY = focusY - (focusY - offsetY) * ratio
        clampOffsets(); invalidate()
    }

    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)
        if (width <= 0 || height <= 0) return
        drawBackground(canvas)
        val t = System.nanoTime() / 1_000_000_000f
        drawRoads(canvas)
        if (lifeOn) {
            drawAuroraSky(canvas, t)
            drawSmoke(canvas, t)
            drawFire(canvas, t)
            drawPeople(canvas, t)
            drawAnimalLife(canvas, t)
            drawFlag(canvas, t)
            drawAuroraDog(canvas, t)
            drawEagle(canvas, t)
        }
        drawHotspotLabels(canvas)
        if (snowOn) drawSnow(canvas, t)
        postInvalidateOnAnimation()
    }

    private fun baseScale() = (height * 0.96f) / backgroundBitmap.height.toFloat()
    private fun totalScale() = baseScale() * userScale

    private fun drawBackground(canvas: Canvas) {
        val s = totalScale(); val dw = backgroundBitmap.width * s; val dh = backgroundBitmap.height * s
        if (!initialized) { offsetX = (width - dw) / 2f; offsetY = (height - dh) / 2f; initialized = true }
        clampOffsets()
        canvas.drawBitmap(backgroundBitmap, null, RectF(offsetX, offsetY, offsetX + dw, offsetY + dh), bgPaint)
    }

    private fun clampOffsets() {
        if (width <= 0 || height <= 0) return
        val s = totalScale(); val dw = backgroundBitmap.width * s; val dh = backgroundBitmap.height * s
        val marginX = width * 0.18f; val marginY = height * 0.18f
        val minX = min(marginX, width - dw - marginX); val maxX = max(-marginX, width - dw + marginX)
        val minY = min(marginY, height - dh - marginY); val maxY = max(-marginY, height - dh + marginY)
        offsetX = offsetX.coerceIn(minX, maxX); offsetY = offsetY.coerceIn(minY, maxY)
    }

    private fun worldPoint(nx: Float, ny: Float): PointF {
        val s = totalScale(); return PointF(offsetX + nx * backgroundBitmap.width * s, offsetY + ny * backgroundBitmap.height * s)
    }

    private fun drawRoads(canvas: Canvas) {
        val s = totalScale()
        roadPaint.strokeWidth = 30f * s.coerceIn(0.6f, 2.0f)
        roadEdgePaint.strokeWidth = 35f * s.coerceIn(0.6f, 2.0f)
        val p = Path()
        roadMain.forEachIndexed { i, pt -> val q = worldPoint(pt.x, pt.y); if (i == 0) p.moveTo(q.x, q.y) else p.lineTo(q.x, q.y) }
        canvas.drawPath(p, roadEdgePaint); canvas.drawPath(p, roadPaint)
    }

    private fun drawAuroraSky(canvas: Canvas, t: Float) {
        val colors = intArrayOf(Color.rgb(65,255,170), Color.rgb(70,205,255), Color.rgb(180,75,255))
        for (band in 0..2) {
            lifePaint.style = Paint.Style.STROKE; lifePaint.strokeCap = Paint.Cap.ROUND; lifePaint.strokeWidth = 18f + band * 4f
            lifePaint.color = colors[band]; lifePaint.alpha = (68 + 28 * sin(t * 0.55f + band)).toInt().coerceIn(35, 100)
            val path = Path()
            for (i in 0..34) {
                val nx = -0.06f + i / 30f
                val ny = 0.055f + band * 0.022f + 0.014f * sin(nx * 9f + t * 0.7f + band)
                val q = worldPoint(nx, ny); if (i == 0) path.moveTo(q.x, q.y) else path.lineTo(q.x, q.y)
            }
            canvas.drawPath(path, lifePaint)
        }
        lifePaint.alpha = 255; lifePaint.style = Paint.Style.FILL
    }

    private fun drawSmoke(canvas: Canvas, t: Float) {
        val sources = listOf(WorldPt(0.33f,0.34f), WorldPt(0.585f,0.44f), WorldPt(0.925f,0.25f), WorldPt(0.71f,0.25f))
        sources.forEachIndexed { si, src ->
            val base = worldPoint(src.x, src.y)
            for (i in 0..6) {
                val phase = (t * (0.72f + si * 0.08f) + i * 0.22f) % 1.8f
                lifePaint.color = Color.argb((72 * (1f - phase / 1.8f)).toInt().coerceIn(5,72), 235,240,246)
                canvas.drawCircle(base.x + sin(t * 0.8f + i) * 15f, base.y - phase * 95f, 9f + i * 2f, lifePaint)
            }
        }
    }

    private fun drawFire(canvas: Canvas, t: Float) {
        val q = worldPoint(0.58f, 0.49f)
        val flicker = 1f + 0.14f * sin(t * 10f)
        lifePaint.color = Color.argb(95,255,110,25); canvas.drawCircle(q.x,q.y,55f*flicker,lifePaint)
        repeat(3) { i ->
            lifePaint.color = if (i == 2) Color.argb(230,255,230,105) else Color.argb(225,255,90+i*40,25)
            val sway = sin(t*(8f+i*2f)+i)*7f
            canvas.drawOval(RectF(q.x-7f+sway,q.y-(22f+i*7f)*flicker,q.x+7f+sway,q.y+7f), lifePaint)
        }
    }

    private fun drawPeople(canvas: Canvas, t: Float) {
        val seats = listOf(WorldPt(0.51f,0.49f),WorldPt(0.54f,0.515f),WorldPt(0.62f,0.505f),WorldPt(0.65f,0.48f))
        seats.forEachIndexed { i, s ->
            val q = worldPoint(s.x,s.y); val bob = sin(t*1.2f+i)*2.3f
            lifePaint.color = Color.argb(205,45+i*20,35,38)
            canvas.drawCircle(q.x,q.y-14f+bob,6f,lifePaint)
            canvas.drawRoundRect(RectF(q.x-6f,q.y-7f+bob,q.x+7f,q.y+14f+bob),5f,5f,lifePaint)
        }
    }

    private fun drawAnimalLife(canvas: Canvas, t: Float) {
        val animals = listOf(WorldPt(0.105f,0.34f),WorldPt(0.655f,0.365f),WorldPt(0.715f,0.372f),WorldPt(0.785f,0.366f),WorldPt(0.845f,0.458f))
        animals.forEachIndexed { i, a ->
            val q = worldPoint(a.x,a.y); val step = sin(t*(0.65f+i*0.05f)+i)
            lifePaint.color = Color.argb(95,58,44,34)
            canvas.drawCircle(q.x+step*7f,q.y-10f+abs(step)*2f,4.5f,lifePaint)
        }
    }

    private fun drawFlag(canvas: Canvas, t: Float) {
        val top = worldPoint(0.365f,0.255f); val bottom = worldPoint(0.365f,0.335f)
        lifePaint.style = Paint.Style.STROKE; lifePaint.strokeWidth = 3f; lifePaint.color = Color.argb(210,190,195,200)
        canvas.drawLine(top.x,top.y,bottom.x,bottom.y,lifePaint)
        repeat(7) { r ->
            lifePaint.strokeWidth = 3.5f; lifePaint.color = if (r%2==0) Color.argb(235,190,35,48) else Color.argb(235,238,238,235)
            val y = top.y+4f+r*3.5f; val wave = sin(t*3f+r*.35f)*3f
            canvas.drawLine(top.x+2f,y,top.x+40f,y+wave,lifePaint)
        }
        lifePaint.style = Paint.Style.FILL
    }

    private fun pointOnRoute(route: List<WorldPt>, phase: Float): WorldPt {
        if (route.size < 2) return route.firstOrNull() ?: WorldPt(.5f,.5f)
        val scaled = phase.coerceIn(0f, .9999f) * (route.size - 1)
        val i = min(route.size - 2, scaled.toInt()); val u = scaled - i
        return WorldPt(route[i].x + (route[i+1].x-route[i].x)*u, route[i].y + (route[i+1].y-route[i].y)*u)
    }

    private fun drawAuroraDog(canvas: Canvas, t: Float) {
        val phase = (t * 0.035f) % 1f
        val a = pointOnRoute(auroraRoute, phase)
        val q = worldPoint(a.x,a.y); val step = sin(t*8f)
        lifePaint.color = Color.argb(95,0,0,0); canvas.drawOval(RectF(q.x-17f,q.y+13f,q.x+17f,q.y+20f),lifePaint)
        lifePaint.color = Color.argb(240,38,33,30); canvas.drawOval(RectF(q.x-18f,q.y-7f,q.x+11f,q.y+11f),lifePaint); canvas.drawCircle(q.x+13f,q.y-8f,9f,lifePaint)
        lifePaint.color = Color.argb(240,235,230,220); canvas.drawOval(RectF(q.x+12f,q.y-7f,q.x+21f,q.y+1f),lifePaint)
        lifePaint.style = Paint.Style.STROKE; lifePaint.strokeCap = Paint.Cap.ROUND; lifePaint.strokeWidth = 4f; lifePaint.color = Color.argb(235,35,30,28)
        canvas.drawLine(q.x-11f,q.y+8f,q.x-13f+5f*step,q.y+20f,lifePaint); canvas.drawLine(q.x+5f,q.y+7f,q.x+7f-5f*step,q.y+19f,lifePaint)
        lifePaint.style = Paint.Style.FILL; lifePaint.color = Color.argb(245,255,92,170); canvas.drawRoundRect(RectF(q.x+4f,q.y-4f,q.x+14f,q.y+2f),3f,3f,lifePaint)
    }

    private fun drawEagle(canvas: Canvas, t: Float) {
        val q = worldPoint(0.90f + 0.028f*sin(t*.22f), 0.10f + 0.014f*sin(t*.35f))
        lifePaint.style = Paint.Style.STROKE; lifePaint.strokeWidth = 4f; lifePaint.color = Color.argb(160,35,30,25)
        canvas.drawLine(q.x-14f,q.y,q.x,q.y-5f,lifePaint); canvas.drawLine(q.x,q.y-5f,q.x+14f,q.y,lifePaint); lifePaint.style = Paint.Style.FILL
    }

    private fun drawHotspotLabels(canvas: Canvas) {
        hotspots.forEach { h ->
            val q = worldPoint(h.x,h.y)
            val w = 150f; val rect = RectF(q.x-w/2,q.y-28f,q.x+w/2,q.y+24f)
            canvas.drawRoundRect(rect,13f,13f,labelFill); canvas.drawRoundRect(rect,13f,13f,labelStroke)
            titlePaint.textAlign = Paint.Align.CENTER; subPaint.textAlign = Paint.Align.CENTER
            canvas.drawText(h.title,q.x,q.y-4f,titlePaint); canvas.drawText(h.subtitle,q.x,q.y+16f,subPaint)
        }
    }

    private fun drawSnow(canvas: Canvas, t: Float) {
        flakes.forEach { f ->
            val x = ((f.x + sin(t*.25f+f.phase)*.018f + 1f) % 1f) * width
            val y = ((f.y + t*f.speed*.022f) % 1f) * height
            snowPaint.alpha = 135; canvas.drawCircle(x,y,f.size,snowPaint)
        }
        snowPaint.alpha = 255
    }

    override fun onTouchEvent(event: MotionEvent): Boolean {
        scaleDetector.onTouchEvent(event)
        when (event.actionMasked) {
            MotionEvent.ACTION_DOWN -> {
                downX=event.x; downY=event.y; lastX=event.x; lastY=event.y; downTime=System.currentTimeMillis(); dragging=false; return true
            }
            MotionEvent.ACTION_MOVE -> {
                if (!locked && event.pointerCount==1 && !scaleDetector.isInProgress) {
                    val dx=event.x-lastX; val dy=event.y-lastY
                    if (abs(event.x-downX)>10f || abs(event.y-downY)>10f) dragging=true
                    offsetX+=dx; offsetY+=dy; clampOffsets(); invalidate()
                }
                lastX=event.x; lastY=event.y; return true
            }
            MotionEvent.ACTION_UP -> {
                if (!dragging && System.currentTimeMillis()-downTime<450) hitTest(event.x,event.y)
                return true
            }
            MotionEvent.ACTION_CANCEL -> return true
        }
        return true
    }

    private fun hitTest(x: Float, y: Float) {
        var best: Hotspot? = null; var bestD = Float.MAX_VALUE
        hotspots.forEach { h ->
            val q=worldPoint(h.x,h.y); val dx=x-q.x; val dy=y-q.y; val d=dx*dx+dy*dy
            if (d<bestD) { bestD=d; best=h }
        }
        if (bestD < 95f*95f) best?.let { onHotspot(it.id) }
    }

    private data class WorldPt(val x: Float,val y: Float)
    private data class Hotspot(val id:String,val title:String,val subtitle:String,val x:Float,val y:Float)
    private data class SnowFlake(val x:Float,val y:Float,val size:Float,val speed:Float,val phase:Float)
}
