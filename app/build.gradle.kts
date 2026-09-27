plugins { id("com.android.application") }

android {
    namespace = "com.animebreak.alpha"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.animebreak.alpha"
        minSdk = 26
        targetSdk = 35
        versionCode = 4
        versionName = "0.4-art-slice-3d"
    }

    sourceSets {
        getByName("main") {
            assets.srcDir("../web")
        }
    }
}
