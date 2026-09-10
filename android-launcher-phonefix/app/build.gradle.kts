plugins { id("com.android.application"); id("org.jetbrains.kotlin.android") }
android {
    namespace = "com.osko.launcher"
    compileSdk = 35
    defaultConfig {
        applicationId = "com.osko.launcher.home"
        minSdk = 26
        targetSdk = 35
        versionCode = 105
        versionName = "2.5.0-living-layover-v6"
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions { jvmTarget = "17" }
}