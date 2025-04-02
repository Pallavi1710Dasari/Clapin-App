=> To start the app "npm start"
=> To run it on android device "npm run android"

=>  APK Installization

    Follow this document for keys and text "https://reactnative.dev/docs/signed-apk-android"

    -> Open cmd as a administrator.
    -> first add key to the java/jdk/bin folder and add password and enter all the details.
    -> A file will be generated as "my-upload-key.keystore", Place the my-upload-key.keystore file under the android/app directory in your project folder.
    -> Edit the file ~/.gradle/gradle.properties or android/gradle.properties, and add the following (replace ***** with the correct keystore password, alias and key password),
    -> The last configuration step that needs to be done is to setup release builds to be signed using upload key. Edit the file android/app/build.gradle in your project folder, and add the signing config,
    -> In terminal, go to android /cd android.
    ->"./gradlew clean"   give this command to clean.
    ->"./gradlew assembleRelease"   The command ./gradlew assembleRelease is used to generate a release APK for your React Native app on Android.