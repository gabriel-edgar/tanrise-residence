import React from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

export default function YouTubeIframe({id}) {
  const html = `
    <!DOCTYPE html>
    <html>
      <body >
        <iframe

          src="https://www.youtube.com/embed/${id}"
   
        ></iframe>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        //source={{html}}
        source={{uri: 'https://www.youtube.com/embed/' + id}}
        javaScriptEnabled
        domStorageEnabled
        style={{flex: 1, height: 400}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});
