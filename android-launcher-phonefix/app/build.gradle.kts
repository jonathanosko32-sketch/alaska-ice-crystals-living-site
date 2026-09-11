plugins { id("com.android.application"); id("org.jetbrains.kotlin.android") }
android {
    namespace = "com.osko.launcher"
    compileSdk = 35
    defaultConfig {
        applicationId = "com.alaskaicecrystals.livinglayover.cameratest"
        minSdk = 26
        targetSdk = 35
        versionCode = 1204
        versionName = "12.0.4-camera-test-fresh-package"
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions { jvmTarget = "17" }
}
