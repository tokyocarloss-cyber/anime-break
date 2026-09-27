plugins { id("com.android.application") }

android {
    namespace = "com.animebreak.alpha"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.animebreak.alpha"
        minSdk = 26
        targetSdk = 35
        versionCode = 1
        versionName = "0.1-alpha"
    }

    sourceSets {
        getByName("main") {
            assets.srcDir("../web")
        }
    }
}
