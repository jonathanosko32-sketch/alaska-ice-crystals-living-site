plugins { id("com.android.application"); id("org.jetbrains.kotlin.android") }
android {
    namespace = "com.osko.launcher"
    compileSdk = 35
    defaultConfig {
        applicationId = "com.alaskaicecrystals.livinglayover.codedtest"
        minSdk = 26
        targetSdk = 35
        versionCode = 1202
        versionName = "12.0.2-coded-duplicate-new-identity"
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions { jvmTarget = "17" }
}
