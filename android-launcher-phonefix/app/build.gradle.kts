plugins { id("com.android.application"); id("org.jetbrains.kotlin.android") }
android {
    namespace = "com.osko.launcher"
    compileSdk = 35
    defaultConfig {
        applicationId = "com.osko.launcher.home"
        minSdk = 26
        targetSdk = 35
        versionCode = 1010
        versionName = "2.9.0-living-layover-v10-school-library"
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions { jvmTarget = "17" }
}
