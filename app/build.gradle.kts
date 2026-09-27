plugins { id("com.android.application") }

android {
    namespace = "com.animebreak.alpha"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.animebreak.alpha"
        minSdk = 26
        targetSdk = 35
        versionCode = 6
        versionName = "0.6-visual-rework"
    }

    sourceSets {
        getByName("main") {
            assets.srcDir("../web")
        }
    }
}
