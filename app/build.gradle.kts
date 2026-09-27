plugins { id("com.android.application") }

android {
    namespace = "com.animebreak.alpha"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.animebreak.alpha"
        minSdk = 26
        targetSdk = 35
        versionCode = 5
        versionName = "0.5-gameplay-controls"
    }

    sourceSets {
        getByName("main") {
            assets.srcDir("../web")
        }
    }
}
