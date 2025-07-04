package com.ifcasoftware.tanriseresidence;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;

public class SplashActivity extends Activity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.launch_screen); // Show your splash layout

    new android.os.Handler().postDelayed(() -> {
      startActivity(new Intent(this, MainActivity.class));
      finish();
    }, 1500); // 1.5 seconds
  }
}
