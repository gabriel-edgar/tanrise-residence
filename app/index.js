import {persistor, store} from './store';
import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import App from './navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import * as Utils from '@utils';
import {NavigationContainer} from '@react-navigation/native';
// import OneSignal from 'react-native-onesignal';
import NotifService from './NotifService';
import {Alert} from 'react-native';
// import {useNavigation} from '@react-navigation/native';

Utils.setupLayoutAnimation();

const Mazi = () => {
  // const {navigation} = props;
  const [registerToken, setRegisterToken] = useState('');
  const [fcmRegistered, setFcmRegistered] = useState(false);
  // const navigation = useNavigation();

  const onRegister = token => {
    setRegisterToken(token.token);
    console.log('token', registerToken);
    setFcmRegistered(true);
  };

  const onNotif = notif => {
    console.log('notif di on notif', notif);
    // navigation.navigate('Notification', notif);
    console.log('notif data title di onnotif', notif.data.title);
    console.log('notif data body di onnotif', notif.data.body);
    // Alert.alert('di index.app on notif');
  };

  const notif = new NotifService(onRegister, onNotif);
  const handlePerm = perms => {
    Alert.alert('Permissions', JSON.stringify(perms));
  };

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    // OneSignal.setLogLevel(6, 0);
    // OneSignal.setAppId('385c0c28-b228-4bd6-8d0b-b92593966f25');
    // //END OneSignal Init Code
    // //Prompt for push on iOS
    // OneSignal.promptForPushNotificationsWithUserResponse(response => {
    //   console.log('Prompt response:', response);
    // });
    // //Method for handling notifications received while app in foreground
    // OneSignal.setNotificationWillShowInForegroundHandler(
    //   notificationReceivedEvent => {
    //     console.log(
    //       'OneSignal: notification will show in foreground:',
    //       notificationReceivedEvent,
    //     );
    //     let notification = notificationReceivedEvent.getNotification();
    //     console.log('notification: ', notification);
    //     const data = notification.additionalData;
    //     console.log('additionalData: ', data);
    //     // Complete with null means don't show a notification.
    //     notificationReceivedEvent.complete(notification);
    //   },
    // );
    // //Method for handling notifications opened
    // OneSignal.setNotificationOpenedHandler(notification => {
    //   console.log('OneSignal: notification opened:', notification);
    // });
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <App />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default Mazi;
