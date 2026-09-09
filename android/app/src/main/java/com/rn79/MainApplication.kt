package com.ifcasoftware.tanriseresidence

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.soloader.OpenSourceMergedSoMapping
import com.facebook.soloader.SoLoader

// ---> Imports for SSL Bypass <---
import com.facebook.react.modules.network.OkHttpClientFactory
import com.facebook.react.modules.network.OkHttpClientProvider
import okhttp3.OkHttpClient
import java.security.cert.X509Certificate
import javax.net.ssl.SSLContext
import javax.net.ssl.TrustManager
import javax.net.ssl.X509TrustManager

class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost =
    object : DefaultReactNativeHost(this) {
      override fun getPackages(): List<ReactPackage> =
        PackageList(this).packages.apply {
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // add(MyReactNativePackage())
        }

      override fun getJSMainModuleName(): String = "index"

      override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

      override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
      override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
    }

  override val reactHost: ReactHost
    get() = getDefaultReactHost(applicationContext, reactNativeHost)

  override fun onCreate() {
    super.onCreate()
    try {
      val trustAllCerts = arrayOf<TrustManager>(
        object : X509TrustManager {
          override fun checkClientTrusted(
            chain: Array<X509Certificate>,
            authType: String
          ) {}

          override fun checkServerTrusted(
            chain: Array<X509Certificate>,
            authType: String
          ) {}

          override fun getAcceptedIssuers(): Array<X509Certificate> = arrayOf()
        }
      )

      val sslContext = SSLContext.getInstance("TLS")
      sslContext.init(
        null,
        trustAllCerts,
        java.security.SecureRandom()
      )

      OkHttpClientProvider.setOkHttpClientFactory(
        object : OkHttpClientFactory {
          override fun createNewNetworkModuleClient(): OkHttpClient {
            return OkHttpClientProvider
              .createClientBuilder()
              .sslSocketFactory(
                sslContext.socketFactory,
                trustAllCerts[0] as X509TrustManager
              )
              .hostnameVerifier { _, _ ->
                true
              }
              .build()
          }
        }
      )
    } catch (e: Exception) {
      e.printStackTrace()
    }

    SoLoader.init(this, OpenSourceMergedSoMapping)

    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      load()
    }
  }
}