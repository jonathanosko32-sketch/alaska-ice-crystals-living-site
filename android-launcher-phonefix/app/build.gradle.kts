plugins { id("com.android.application"); id("org.jetbrains.kotlin.android") }
android {
    namespace = "com.osko.launcher"
    compileSdk = 35
    defaultConfig {
        applicationId = "com.alaskaicecrystals.livinglayover.codedtest"
        minSdk = 26
        targetSdk = 35
        versionCode = 1203
        versionName = "12.0.3-coded-duplicate-android-stability"
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions { jvmTarget = "17" }
}
