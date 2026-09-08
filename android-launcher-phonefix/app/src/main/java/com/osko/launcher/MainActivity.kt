package com.osko.launcher

import android.app.Activity
import android.app.AlertDialog
import android.content.Intent
import android.graphics.Color
import android.graphics.drawable.GradientDrawable
import android.net.Uri
import android.os.Bundle
import android.provider.MediaStore
import android.provider.Settings
import android.view.Gravity
import android.view.View
import android.view.ViewGroup
import android.widget.*
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

class MainActivity : Activity() {
    private val navy = Color.rgb(5, 24, 40)
    private val panel = Color.rgb(10, 58, 82)
    private val blue = Color.rgb(50, 190, 235)
    private val white = Color.WHITE

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        window.statusBarColor = navy
        window.navigationBarColor = navy
        showHome()
    }

    override fun onResume() {
        super.onResume()
    }

    @Deprecated("Deprecated in Java")
    override fun onBackPressed() {
        showHome()
    }

    private fun cardBg(): GradientDrawable = GradientDrawable().apply {
        color = panel
        cornerRadius = 30f
        setStroke(3, blue)
    }

    private fun button(text: String, action: () -> Unit): Button = Button(this).apply {
        this.text = text
        textSize = 16f
        setTextColor(white)
        isAllCaps = false
        gravity = Gravity.CENTER
        background = cardBg()
        setPadding(10, 10, 10, 10)
        setOnClickListener { action() }
    }

    private fun addRow(parent: LinearLayout, vararg views: View) {
        val row = LinearLayout(this).apply {
            orientation = LinearLayout.HORIZONTAL
            gravity = Gravity.CENTER
        }
        views.forEach { v ->
            row.addView(v, LinearLayout.LayoutParams(0, dp(66), 1f).apply {
                setMargins(dp(5), dp(5), dp(5), dp(5))
            })
        }
        parent.addView(row, LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT))
    }

    private fun showHome() {
        val scroll = ScrollView(this).apply { setBackgroundColor(navy) }
        val root = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(dp(14), dp(18), dp(14), dp(18))
            gravity = Gravity.CENTER_HORIZONTAL
        }

        root.addView(TextView(this).apply {
            text = "ALASKA ICE CRYSTALS"
            textSize = 26f
            setTextColor(white)
            gravity = Gravity.CENTER
            setPadding(0, 4, 0, 2)
        })
        root.addView(TextView(this).apply {
            text = "OSKO LIVING LAUNCHER"
            textSize = 15f
            setTextColor(blue)
            gravity = Gravity.CENTER
            setPadding(0, 0, 0, 12)
        })

        val clock = TextView(this).apply {
            text = nowText()
            textSize = 28f
            setTextColor(white)
            gravity = Gravity.CENTER
            background = cardBg()
            setPadding(dp(12), dp(16), dp(12), dp(16))
            setOnClickListener { openClock() }
        }
        root.addView(clock, LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT).apply {
            setMargins(0, 0, 0, dp(10))
        })

        addRow(root,
            button("HQ") { showHQ() },
            button("COMMAND") { showCommand() },
            button("ALL APPS") { showAppDrawer() }
        )
        addRow(root,
            button("PHONE") { openPhone() },
            button("TEXT") { openMessages() },
            button("CAMERA") { openCamera() }
        )
        addRow(root,
            button("PICTURES") { launchAny(listOf("com.sec.android.gallery3d", "com.google.android.apps.photos"), "Pictures") },
            button("MAPS") { launchAny(listOf("com.google.android.apps.maps"), "Maps") },
            button("YOUTUBE") { launchAny(listOf("com.google.android.youtube"), "YouTube") }
        )
        addRow(root,
            button("FILES") { openFiles() },
            button("CHROME") { launchAny(listOf("com.android.chrome"), "Chrome") },
            button("STARLINK") { launchAny(listOf("com.starlink.mobile"), "Starlink") }
        )
        addRow(root,
            button("TRUCK") { showTruck() },
            button("BUILDER") { showBuilder() },
            button("AURORA") { showAurora() }
        )
        addRow(root,
            button("NOTES") { showNotes() },
            button("CLOCK") { openClock() },
            button("SETTINGS") { openHomeSettings() }
        )

        root.addView(TextView(this).apply {
            text = "Bright phone-fix build • Microsoft Launcher stays available as backup"
            textSize = 12f
            setTextColor(Color.rgb(185, 225, 240))
            gravity = Gravity.CENTER
            setPadding(0, dp(14), 0, dp(6))
        })

        scroll.addView(root)
        setContentView(scroll)
    }

    private fun nowText(): String {
        val time = SimpleDateFormat("h:mm a", Locale.getDefault()).format(Date())
        val date = SimpleDateFormat("EEEE, MMMM d, yyyy", Locale.getDefault()).format(Date())
        return "$time\n$date"
    }

    private fun showHQ() {
        val items = arrayOf("Business & Office", "Work & Daily Tools", "OSKO Command Center")
        AlertDialog.Builder(this).setTitle("Alaska Ice Crystals Headquarters").setItems(items) { _, i ->
            when (i) {
                0 -> showRoom("Business & Office", listOf(
                    "Gmail" to listOf("com.google.android.gm"),
                    "Outlook" to listOf("com.microsoft.office.outlook"),
                    "Google Drive" to listOf("com.google.android.apps.docs"),
                    "ChatGPT" to listOf("com.openai.chatgpt"),
                    "GitHub" to listOf("com.github.android")
                ))
                1 -> showRoom("Work & Daily Tools", listOf(
                    "Camera" to listOf("com.osko.camera", "com.sec.android.app.camera"),
                    "Maps" to listOf("com.google.android.apps.maps"),
                    "Starlink" to listOf("com.starlink.mobile"),
                    "Clock" to listOf("com.sec.android.app.clockpackage", "com.google.android.deskclock")
                ))
                2 -> showCommand()
            }
        }.setNegativeButton("Close", null).show()
    }

    private fun showCommand() {
        val items = arrayOf("All Apps", "Files", "Camera", "Phone", "Home Settings", "Emergency Dialer")
        AlertDialog.Builder(this).setTitle("OSKO Command Center").setItems(items) { _, i ->
            when (i) {
                0 -> showAppDrawer()
                1 -> openFiles()
                2 -> openCamera()
                3 -> openPhone()
                4 -> openHomeSettings()
                5 -> startActivity(Intent(Intent.ACTION_DIAL, Uri.parse("tel:911")))
            }
        }.setNegativeButton("Close", null).show()
    }

    private fun showTruck() {
        val items = arrayOf("Maps", "Files", "Camera", "Notes")
        AlertDialog.Builder(this).setTitle("OSKO Truck").setItems(items) { _, i ->
            when (i) { 0 -> launchAny(listOf("com.google.android.apps.maps"), "Maps"); 1 -> openFiles(); 2 -> openCamera(); 3 -> showNotes() }
        }.setNegativeButton("Close", null).show()
    }

    private fun showBuilder() = AlertDialog.Builder(this).setTitle("OSKO Builder").setMessage("Builder is connected and ready for project tools.").setPositiveButton("Open Files") { _, _ -> openFiles() }.setNegativeButton("Close", null).show()
    private fun showAurora() = AlertDialog.Builder(this).setTitle("Aurora").setMessage("Aurora quick access").setPositiveButton("Pictures") { _, _ -> launchAny(listOf("com.sec.android.gallery3d", "com.google.android.apps.photos"), "Pictures") }.setNeutralButton("Camera") { _, _ -> openCamera() }.setNegativeButton("Close", null).show()

    private fun showNotes() {
        val prefs = getSharedPreferences("osko_launcher", MODE_PRIVATE)
        val input = EditText(this).apply { setText(prefs.getString("quick_note", "")); minLines = 5; hint = "Write a quick note" }
        AlertDialog.Builder(this).setTitle("OSKO Quick Notes").setView(input).setPositiveButton("Save") { _, _ -> prefs.edit().putString("quick_note", input.text.toString()).apply() }.setNegativeButton("Close", null).show()
    }

    private fun showRoom(title: String, apps: List<Pair<String, List<String>>>) {
        AlertDialog.Builder(this).setTitle(title).setItems(apps.map { it.first }.toTypedArray()) { _, i -> launchAny(apps[i].second, apps[i].first) }.setNeutralButton("All Apps") { _, _ -> showAppDrawer() }.setNegativeButton("Close", null).show()
    }

    private fun showAppDrawer() {
        val pm = packageManager
        val intent = Intent(Intent.ACTION_MAIN).addCategory(Intent.CATEGORY_LAUNCHER)
        val apps = pm.queryIntentActivities(intent, 0).sortedBy { it.loadLabel(pm).toString().lowercase() }
        AlertDialog.Builder(this).setTitle("All Apps").setItems(apps.map { it.loadLabel(pm).toString() }.toTypedArray()) { _, i ->
            val info = apps[i].activityInfo
            startActivity(Intent(Intent.ACTION_MAIN).addCategory(Intent.CATEGORY_LAUNCHER).setClassName(info.packageName, info.name).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK))
        }.setNegativeButton("Close", null).show()
    }

    private fun openClock() = launchAny(listOf("com.sec.android.app.clockpackage", "com.google.android.deskclock", "com.android.deskclock"), "Clock")
    private fun openPhone() { try { startActivity(Intent(Intent.ACTION_DIAL)) } catch (_: Exception) { toast("Phone app unavailable") } }
    private fun openMessages() { try { startActivity(Intent(Intent.ACTION_SENDTO, Uri.parse("smsto:"))) } catch (_: Exception) { toast("Messages app unavailable") } }
    private fun openCamera() { try { startActivity(Intent(MediaStore.INTENT_ACTION_STILL_IMAGE_CAMERA).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)) } catch (_: Exception) { toast("Camera unavailable") } }
    private fun openFiles() { try { startActivity(Intent(Intent.ACTION_OPEN_DOCUMENT).addCategory(Intent.CATEGORY_OPENABLE).setType("*/*")) } catch (_: Exception) { toast("Files unavailable") } }
    private fun openHomeSettings() { try { startActivity(Intent(Settings.ACTION_HOME_SETTINGS)) } catch (_: Exception) { startActivity(Intent(Settings.ACTION_SETTINGS)) } }

    private fun launchAny(packages: List<String>, label: String) {
        for (pkg in packages) {
            val launch = packageManager.getLaunchIntentForPackage(pkg)
            if (launch != null) { startActivity(launch); return }
        }
        toast("$label is not installed")
    }

    private fun toast(s: String) = Toast.makeText(this, s, Toast.LENGTH_SHORT).show()
    private fun dp(v: Int): Int = (v * resources.displayMetrics.density).toInt()
}
