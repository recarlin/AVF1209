package com.fullsail.everydayepics;

import android.app.Activity;
import android.os.Bundle;
import org.apache.cordova.DroidGap;

public class EverydayEpics extends DroidGap {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/launcher.html");
    }
}