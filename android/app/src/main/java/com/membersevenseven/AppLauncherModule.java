package com.cpajak; // Ganti dengan nama paket proyek Anda

import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.Context;
import android.util.Log;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class AppLauncherModule extends ReactContextBaseJavaModule {
    private static final String TAG = "AppLauncherModule";
    private ReactApplicationContext reactContext;

    public AppLauncherModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
    }

    @Override
    public String getName() {
        return "AppLauncher";
    }

    @ReactMethod
    public void openApp(String packageName) {
        try {
            PackageManager pm = reactContext.getPackageManager();
            Intent launchIntent = pm.getLaunchIntentForPackage(packageName);
            if (launchIntent != null) {
                launchIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                reactContext.startActivity(launchIntent);
                Log.d(TAG, "App launched successfully: " + packageName);
            } else {
                Log.e(TAG, "App not found: " + packageName);
            }
        } catch (Exception e) {
            Log.e(TAG, "Error launching app: " + packageName, e);
        }
    }
}
