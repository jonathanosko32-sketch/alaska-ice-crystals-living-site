package com.osko.launcher

import android.app.Activity
import android.app.AlertDialog
import android.content.Intent
import android.graphics.Color
import android.graphics.drawable.Drawable
import android.graphics.drawable.GradientDrawable
import android.net.Uri
import android.os.Bundle
import android.provider.MediaStore
import android.provider.Settings
import android.view.Gravity
import android.view.MotionEvent
import android.view.View
import android.view.ViewGroup
import android.widget.*

class MainActivity : Activity() {
    private val white = Color.WHITE
    private val blue = Color.rgb(83, 227, 255)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        window.statusBarColor = Color.TRANSPARENT
        window.navigationBarColor = Color.argb(80, 0, 0, 0)
        showHome()
    }

    override fun onResume() {
        super.onResume()
        showHome()
    }

    @Deprecated("Deprecated in Java")
    override fun onBackPressed() {
        showHome()
    }

    private fun showHome() {
        val root = FrameLayout(this).apply {
            setBackgroundColor(Color.TRANSPARENT)
            isLongClickable = true
            setOnLongClickListener {
                showCommand()
                true
            }
        }

        val top = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(dp(18), dp(18), dp(18), 0)
        }

        val topApps = LinearLayout(this).apply {
            orientation = LinearLayout.HORIZONTAL
            gravity = Gravity.START
        }
        topApps.addView(shortcut("File Manager", listOf("com.sec.android.app.myfiles", "com.google.android.documentsui"), android.R.drawable.ic_menu_agenda, weighted()) { openFiles() })
        topApps.addView(shortcut("Indeed", listOf("com.indeed.android.jobsearch", "com.indeed.android.jobsearch.app"), android.R.drawable.ic_menu_search, weighted()) { launchAny(listOf("com.indeed.android.jobsearch", "com.indeed.android.jobsearch.app"), "Indeed") })
        topApps.addView(shortcut("ZArchiver", listOf("ru.zdevs.zarchiver"), android.R.drawable.ic_menu_save, weighted()) { launchAny(listOf("ru.zdevs.zarchiver"), "ZArchiver") })
        top.addView(topApps)

        val quickRow = LinearLayout(this).apply {
            orientation = LinearLayout.HORIZONTAL
            gravity = Gravity.CENTER
            setPadding(0, dp(12), 0, 0)
        }
        quickRow.addView(chip("HQ") { showHQ() }, LinearLayout.LayoutParams(0, dp(40), 1f).apply { setMargins(dp(4), 0, dp(4), 0) })
        quickRow.addView(chip("COMMAND") { showCommand() }, LinearLayout.LayoutParams(0, dp(40), 1f).apply { setMargins(dp(4), 0, dp(4), 0) })
        quickRow.addView(chip("ALL APPS") { showAppDrawer() }, LinearLayout.LayoutParams(0, dp(40), 1f).apply { setMargins(dp(4), 0, dp(4), 0) })
        top.addView(quickRow)

        root.addView(top, FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT, Gravity.TOP))

        val skieCb = chip("SKIE CB") { showSkieCB() }.apply { textSize = 14f }
        root.addView(skieCb, FrameLayout.LayoutParams(dp(112), dp(44), Gravity.END or Gravity.CENTER_VERTICAL).apply {
            setMargins(0, 0, dp(18), dp(20))
        })

        val dockPanel = LinearLayout(this).apply {
            orientation = LinearLayout.HORIZONTAL
            gravity = Gravity.CENTER
            setPadding(dp(10), dp(8), dp(10), dp(8))
            background = GradientDrawable().apply {
                setColor(Color.argb(72, 0, 0, 0))
                cornerRadius = dp(24).toFloat()
            }
        }

        dockPanel.addView(shortcut("Text", listOf("com.google.android.apps.messaging", "com.samsung.android.messaging"), android.R.drawable.ic_dialog_email, weighted()) { openMessages() })
        dockPanel.addView(shortcut("Chrome", listOf("com.android.chrome"), android.R.drawable.ic_menu_view, weighted()) { launchAny(listOf("com.android.chrome"), "Chrome") })
        dockPanel.addView(shortcut("Camera", listOf("com.sec.android.app.camera"), android.R.drawable.ic_menu_camera, weighted()) { openCamera() })
        dockPanel.addView(shortcut("Calculator", listOf("com.sec.android.app.popupcalculator", "com.google.android.calculator"), android.R.drawable.ic_menu_edit, weighted()) { launchAny(listOf("com.sec.android.app.popupcalculator", "com.google.android.calculator"), "Calculator") })
        dockPanel.addView(shortcut("Settings", listOf("com.android.settings"), android.R.drawable.ic_menu_manage, weighted()) { openSettings() })

        root.addView(dockPanel, FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, dp(112), Gravity.BOTTOM).apply {
            setMargins(dp(12), 0, dp(12), dp(20))
        })

        setContentView(root)
    }

    private fun showSkieCB() {
        val root = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            gravity = Gravity.CENTER_HORIZONTAL
            setPadding(dp(18), dp(28), dp(18), dp(18))
            background = GradientDrawable().apply {
                setColor(Color.rgb(7, 14, 24))
                cornerRadius = dp(24).toFloat()
                setStroke(dp(2), blue)
            }
        }

        root.addView(TextView(this).apply {
            text = "ALASKA ICE CRYSTALS"
            textSize = 15f
            setTextColor(blue)
            gravity = Gravity.CENTER
        })
        root.addView(TextView(this).apply {
            text = "SKIE CB RADIO"
            textSize = 28f
            setTextColor(white)
            gravity = Gravity.CENTER
            setPadding(0, dp(4), 0, dp(18))
        })

        val display = LinearLayout(this).apply {
            orientation = LinearLayout.HORIZONTAL
            gravity = Gravity.CENTER
            setPadding(dp(14), dp(12), dp(14), dp(12))
            background = GradientDrawable().apply {
                setColor(Color.rgb(1, 35, 30))
                cornerRadius = dp(12).toFloat()
                setStroke(dp(1), Color.rgb(54, 255, 192))
            }
        }
        val channel = TextView(this).apply {
            text = "CH 19"
            textSize = 30f
            setTextColor(Color.rgb(83, 255, 197))
            gravity = Gravity.CENTER
        }
        val signal = TextView(this).apply {
            text = "  S  ▂ ▃ ▅ ▆ █"
            textSize = 17f
            setTextColor(Color.rgb(83, 255, 197))
            gravity = Gravity.CENTER
        }
        display.addView(channel, LinearLayout.LayoutParams(0, dp(58), 1f))
        display.addView(signal, LinearLayout.LayoutParams(0, dp(58), 1.4f))
        root.addView(display, LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT))

        val lamps = LinearLayout(this).apply {
            orientation = LinearLayout.HORIZONTAL
            gravity = Gravity.CENTER
            setPadding(0, dp(18), 0, dp(12))
        }
        val rxLamp = lamp("RX", Color.rgb(40, 190, 90))
        val txLamp = lamp("TX", Color.rgb(90, 30, 30))
        lamps.addView(rxLamp, LinearLayout.LayoutParams(0, dp(52), 1f).apply { setMargins(dp(5), 0, dp(5), 0) })
        lamps.addView(txLamp, LinearLayout.LayoutParams(0, dp(52), 1f).apply { setMargins(dp(5), 0, dp(5), 0) })
        root.addView(lamps, LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT))

        root.addView(TextView(this).apply {
            text = "Skie now stays inside the launcher. Hold the mic button to enter the live CB room."
            textSize = 14f
            setTextColor(Color.LTGRAY)
            gravity = Gravity.CENTER
            setPadding(dp(10), dp(4), dp(10), dp(18))
        })

        val ptt = TextView(this).apply {
            text = "🎙  HOLD TO TALK TO SKIE"
            textSize = 18f
            setTextColor(white)
            gravity = Gravity.CENTER
            background = GradientDrawable().apply {
                setColor(Color.rgb(28, 65, 92))
                cornerRadius = dp(18).toFloat()
                setStroke(dp(2), blue)
            }
            setOnTouchListener { _, event ->
                when (event.action) {
                    MotionEvent.ACTION_DOWN -> {
                        setLampState(txLamp, "TX • TRANSMIT", Color.rgb(255, 70, 55))
                        setLampState(rxLamp, "RX", Color.rgb(25, 85, 45))
                        true
                    }
                    MotionEvent.ACTION_UP -> {
                        setLampState(txLamp, "TX", Color.rgb(90, 30, 30))
                        setLampState(rxLamp, "RX • READY", Color.rgb(40, 190, 90))
                        openSkie()
                        true
                    }
                    MotionEvent.ACTION_CANCEL -> {
                        setLampState(txLamp, "TX", Color.rgb(90, 30, 30))
                        true
                    }
                    else -> true
                }
            }
        }
        root.addView(ptt, LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, dp(64)).apply { setMargins(0, 0, 0, dp(12)) })

        val home = chip("BACK TO HOME") { showHome() }
        root.addView(home, LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, dp(48)))

        val outer = FrameLayout(this).apply {
            setBackgroundColor(Color.argb(235, 0, 0, 0))
            addView(root, FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT, Gravity.CENTER).apply {
                setMargins(dp(14), dp(18), dp(14), dp(18))
            })
        }
        setContentView(outer)
    }

    private fun lamp(text: String, color: Int): TextView = TextView(this).apply {
        this.text = text
        textSize = 15f
        setTextColor(white)
        gravity = Gravity.CENTER
        background = GradientDrawable().apply {
            setColor(color)
            cornerRadius = dp(14).toFloat()
        }
    }

    private fun setLampState(view: TextView, text: String, color: Int) {
        view.text = text
        view.background = GradientDrawable().apply {
            setColor(color)
            cornerRadius = dp(14).toFloat()
        }
    }

    private fun weighted() = LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1f)

    private fun shortcut(label: String, packages: List<String>, fallbackIcon: Int, lp: LinearLayout.LayoutParams, action: () -> Unit): View {
        val box = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            gravity = Gravity.CENTER
            setPadding(dp(2), dp(4), dp(2), dp(2))
            setOnClickListener { action() }
        }
        val icon = ImageView(this).apply {
            setImageDrawable(findIcon(packages) ?: getDrawable(fallbackIcon))
            scaleType = ImageView.ScaleType.FIT_CENTER
        }
        box.addView(icon, LinearLayout.LayoutParams(dp(58), dp(58)))
        box.addView(TextView(this).apply {
            text = label
            textSize = 13f
            setTextColor(white)
            gravity = Gravity.CENTER
            maxLines = 1
            setShadowLayer(6f, 1f, 2f, Color.BLACK)
        }, LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, dp(28)))
        box.layoutParams = lp
        return box
    }

    private fun findIcon(packages: List<String>): Drawable? {
        for (pkg in packages) {
            try { return packageManager.getApplicationIcon(pkg) } catch (_: Exception) { }
        }
        return null
    }

    private fun chip(text: String, action: () -> Unit): TextView = TextView(this).apply {
        this.text = text
        textSize = 13f
        setTextColor(white)
        gravity = Gravity.CENTER
        setShadowLayer(4f, 1f, 1f, Color.BLACK)
        background = GradientDrawable().apply {
            setColor(Color.argb(125, 4, 25, 39))
            cornerRadius = dp(18).toFloat()
            setStroke(dp(1), blue)
        }
        setOnClickListener { action() }
    }

    private fun showHQ() {
        val items = arrayOf("Business & Office", "Work & Daily Tools", "Skie CB", "Truck", "Builder", "Aurora", "Notes")
        AlertDialog.Builder(this).setTitle("Alaska Ice Crystals Headquarters").setItems(items) { _, i ->
            when (i) {
                0 -> showRoom("Business & Office", listOf("Gmail" to listOf("com.google.android.gm"), "Outlook" to listOf("com.microsoft.office.outlook"), "Google Drive" to listOf("com.google.android.apps.docs"), "ChatGPT" to listOf("com.openai.chatgpt"), "GitHub" to listOf("com.github.android")))
                1 -> showRoom("Work & Daily Tools", listOf("Camera" to listOf("com.sec.android.app.camera"), "Maps" to listOf("com.google.android.apps.maps"), "Starlink" to listOf("com.starlink.mobile"), "Clock" to listOf("com.sec.android.app.clockpackage", "com.google.android.deskclock")))
                2 -> showSkieCB()
                3 -> showTruck()
                4 -> showBuilder()
                5 -> showAurora()
                6 -> showNotes()
            }
        }.setNegativeButton("Close", null).show()
    }

    private fun showCommand() {
        val items = arrayOf("All Apps", "Skie CB", "Chrome", "Files", "Camera", "Phone", "Normal Android Home Settings", "Emergency Dialer")
        AlertDialog.Builder(this).setTitle("OSKO Command Center").setItems(items) { _, i ->
            when (i) {
                0 -> showAppDrawer()
                1 -> showSkieCB()
                2 -> launchAny(listOf("com.android.chrome"), "Chrome")
                3 -> openFiles()
                4 -> openCamera()
                5 -> openPhone()
                6 -> openHomeSettings()
                7 -> startActivity(Intent(Intent.ACTION_DIAL, Uri.parse("tel:911")))
            }
        }.setNegativeButton("Close", null).show()
    }

    private fun showTruck() {
        val items = arrayOf("Maps", "Files", "Camera", "Notes")
        AlertDialog.Builder(this).setTitle("OSKO Truck").setItems(items) { _, i ->
            when (i) {
                0 -> launchAny(listOf("com.google.android.apps.maps"), "Maps")
                1 -> openFiles()
                2 -> openCamera()
                3 -> showNotes()
            }
        }.setNegativeButton("Close", null).show()
    }

    private fun showBuilder() = AlertDialog.Builder(this).setTitle("OSKO Builder").setMessage("Builder is connected and ready for project tools.").setPositiveButton("Open Files") { _, _ -> openFiles() }.setNegativeButton("Close", null).show()

    private fun showAurora() = AlertDialog.Builder(this).setTitle("Aurora").setMessage("Aurora quick access").setPositiveButton("Pictures") { _, _ -> launchAny(listOf("com.sec.android.gallery3d", "com.google.android.apps.photos"), "Pictures") }.setNeutralButton("Camera") { _, _ -> openCamera() }.setNegativeButton("Close", null).show()

    private fun showNotes() {
        val prefs = getSharedPreferences("osko_launcher", MODE_PRIVATE)
        val input = EditText(this).apply {
            setText(prefs.getString("quick_note", ""))
            minLines = 5
            hint = "Write a quick note"
        }
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

    private fun openSkie() { startActivity(Intent(this, SkieCbActivity::class.java)) }
    private fun openPhone() { try { startActivity(Intent(Intent.ACTION_DIAL)) } catch (_: Exception) { toast("Phone app unavailable") } }
    private fun openMessages() { try { startActivity(Intent(Intent.ACTION_SENDTO, Uri.parse("smsto:"))) } catch (_: Exception) { toast("Messages app unavailable") } }
    private fun openCamera() { try { startActivity(Intent(MediaStore.INTENT_ACTION_STILL_IMAGE_CAMERA).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)) } catch (_: Exception) { toast("Camera unavailable") } }
    private fun openFiles() { try { startActivity(Intent(Intent.ACTION_OPEN_DOCUMENT).addCategory(Intent.CATEGORY_OPENABLE).setType("*/*")) } catch (_: Exception) { toast("Files unavailable") } }
    private fun openSettings() { try { startActivity(Intent(Settings.ACTION_SETTINGS)) } catch (_: Exception) { toast("Settings unavailable") } }
    private fun openHomeSettings() { try { startActivity(Intent(Settings.ACTION_HOME_SETTINGS)) } catch (_: Exception) { openSettings() } }

    private fun launchAny(packages: List<String>, label: String) {
        for (pkg in packages) {
            val launch = packageManager.getLaunchIntentForPackage(pkg)
            if (launch != null) {
                startActivity(launch)
                return
            }
        }
        toast("$label is not installed")
    }

    private fun toast(s: String) = Toast.makeText(this, s, Toast.LENGTH_SHORT).show()
    private fun dp(v: Int): Int = (v * resources.displayMetrics.density).toInt()
}
