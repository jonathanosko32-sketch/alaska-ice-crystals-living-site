from pathlib import Path

path = Path('app/src/main/java/com/osko/launcher/LayoverLivingV6Activity.kt')
text = path.read_text()

old = '''            "hq" -> showPanel(id, "HQ INTERIOR — SCHOOL & LIBRARY", "School, books and training stay together here.", listOf(\n                PanelAction("SCHOOL / TRAINING", "GED • college • simulator") { openSchool() },'''
new = '''            "hq" -> showPanel(id, "HQ INTERIOR — SCHOOL & LIBRARY", "School, books and training stay together here.", listOf(\n                PanelAction("SCHOOL / TRAINING", "GED • college • simulator") { openSchool() },\n                PanelAction("HQ MASTER LIBRARY", "Mechanics • CDL • aviation • drones • medical • veterinary • cooking • carpentry") { openHqLibrary() },'''
if old not in text:
    raise SystemExit('Could not find HQ action list insertion point')
text = text.replace(old, new, 1)

old_method = '''    private fun openSchool() { try { startActivity(Intent(Intent.ACTION_VIEW, Uri.parse("https://jonathanosko32-sketch.github.io/alaska-ice-crystals-living-site/TEST/v157-student1-winter-traction-black-ice-knowledge-lab.html"))) } catch (_: Exception) { toast("School page unavailable") } }'''
new_method = '''    private fun openSchool() { try { startActivity(Intent(Intent.ACTION_VIEW, Uri.parse("https://jonathanosko32-sketch.github.io/alaska-ice-crystals-living-site/TEST/v157-student1-winter-traction-black-ice-knowledge-lab.html"))) } catch (_: Exception) { toast("School page unavailable") } }\n    private fun openHqLibrary() { try { startActivity(Intent(Intent.ACTION_VIEW, Uri.parse("https://jonathanosko32-sketch.github.io/alaska-ice-crystals-living-site/TEST/v213-hq-master-library-standalone.html"))) } catch (_: Exception) { toast("HQ library unavailable") } }'''
if old_method not in text:
    raise SystemExit('Could not find openSchool method insertion point')
text = text.replace(old_method, new_method, 1)

path.write_text(text)
print('Applied v10 school library connection inside actual Living Layover HQ panel')
