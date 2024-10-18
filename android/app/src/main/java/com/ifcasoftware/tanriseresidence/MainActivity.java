package com.ifcasoftware.tanriseresidence;
import android.os.Build;
import android.os.Bundle; // here
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import android.app.NotificationChannel;
import android.app.NotificationManager;

// react-native-splash-screen >= 0.3.1
import org.devio.rn.splashscreen.SplashScreen; // here

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Tanrise Residence";
  }

  @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // here
        super.onCreate(savedInstanceState);
        createNotificationChannel();
        
    }

// IMPORTANCE_LOW
// IMPORTANCE_DEFAULT
// IMPORTANCE_HIGH

        private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            // NotificationChannel channel = new NotificationChannel("default-channel-id", "Default Channel", NotificationManager.IMPORTANCE_HIGH);
            // NotificationManager manager = getSystemService(NotificationManager.class);
            // manager.createNotificationChannel(channel);

        // Channel 1
        NotificationChannel channel1 = new NotificationChannel(
            "default-channel-id", // Unique channel ID
            "Default Channel", // Channel name
            NotificationManager.IMPORTANCE_DEFAULT // Importance level
        );
        channel1.setDescription("This is the default channel for general notifications."); // Optional description

        // Channel 2
        NotificationChannel channel2 = new NotificationChannel(
            "high-priority-channel-id", // Unique channel ID for the second channel
            "High Priority Channel", // Channel name
            NotificationManager.IMPORTANCE_HIGH // Higher importance level
        );
        channel2.setDescription("This channel is used for high priority notifications."); // Optional description

        // Register the channels
        NotificationManager manager = getSystemService(NotificationManager.class);
        if (manager != null) {
            manager.createNotificationChannel(channel1);
            manager.createNotificationChannel(channel2);
        }

        }
    }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        DefaultNewArchitectureEntryPoint.getFabricEnabled());
  }
    //   @Override
    // protected ReactActivityDelegate createReactActivityDelegate() {
    //     return new ReactActivityDelegate(this, getMainComponentName()) {
    //         @Override
    //         protected ReactRootView createRootView() {
    //             return new RNGestureHandlerEnabledRootView(MainActivity.this);
    //         }
    //     };
    // }
}
