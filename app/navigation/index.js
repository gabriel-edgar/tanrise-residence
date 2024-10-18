/** @format */

import { ApplicationActions } from "@actions";
import { AssistiveTouch } from "@components";
import { BaseSetting, useTheme } from "@config";
// import { NavigationContainer } from '@react-navigation/native';
import { NavigationContainer, useNavigation } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import { languageSelect } from "@selectors";
import * as Utils from "@utils";
import i18n from "i18next";
import React, { useEffect, useRef, useState } from "react";
import { initReactI18next } from "react-i18next";
import { Platform, StatusBar, View } from "react-native";
//import { DarkModeProvider, useDarkMode } from "react-native-dark-mode";
import SplashScreen from "react-native-splash-screen";
import { useDispatch, useSelector } from "react-redux";
import { AllScreens, ModalScreens } from "./config";
import Profile from "@screens/Profile";
import SignIn from "../screens/SignIn";
import Loading from "../screens/Loading";

//import { Alert } from "react-native";
import messaging from "@react-native-firebase/messaging";
import PushNotification from "react-native-push-notification";

const RootStack = createStackNavigator();
import { StackActions } from "@react-navigation/native";
import MainStack from "./MainStack";
import Notification from "../screens/Notification";
import getUser from "../selectors/UserSelectors";
import Skip from "../screens/Skip";
import EProductDetail from "../screens/EProductDetail";
import Home from "../screens/Home";
import ResetPassword from "../screens/ResetPassword";
import AboutUs from "@screens/AboutUs";
import ChangePassword from "../screens/ChangePassword";

const Navigator = (props) => {
  const { theme, colors } = useTheme();
  const isDarkMode = false; //useDarkMode();
  const language = useSelector(languageSelect);
  const { navigation, route } = props;
  // const {route} = props;
  console.log("navigation from app for notif", props);
  // const navigation = useNavigation();
  console.log("route from app for notif", route);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const navigationRef = useRef(null);
  const user = useSelector((state) => getUser(state));
  const [initialRoute, setInitialRoute] = useState("MainStack");
  const [dataNotif, setDataNotif] = useState(false);
  const [isidataNotif, setisidataNotif] = useState([]);
  const [noti, setNoti] = useState(false);

  console.log("user null ?? ", user);

  useEffect(() => {
    // Hide screen loading
    SplashScreen.hide();

    // Config status bar
    if (Platform.OS == "android") {
      StatusBar.setBackgroundColor(colors.primary, true);
    }
    StatusBar.setBarStyle(isDarkMode ? "light-content" : "dark-content", true);
    const onProcess = async () => {
      // Get current language of device
      const languageCode = language ?? BaseSetting.defaultLanguage;
      dispatch(ApplicationActions.onChangeLanguage(languageCode));
      // Config language for app
      await i18n.use(initReactI18next).init({
        resources: BaseSetting.resourcesLanguage,
        lng: languageCode,
        fallbackLng: languageCode,
      });
      setTimeout(() => {
        Utils.enableExperimental();
        setLoading(false);
        //    navigationRef?.current?.dispatch(StackActions.replace('OnBoard'));
      }, 300);
    };
    onProcess();
  }, []);

  useEffect(() => {
    const handleNotification = (notification) => {
      // Your notification handling logic
      // if (notification.data && notification.data.screen) {
      //   const currentRoute =
      //     navigation.getState().routes[navigation.getState().index].name;
      //   // Check if the current screen is not the target screen
      //   if (currentRoute !== notification.data.screen) {
      //     // If the target screen is the root screen, pop to top
      //     if (notification.data.screen === "RootScreen") {
      //       navigation.popToTop();
      //     } else {
      //       // Navigate to the specific screen
      //       navigation.navigate(notification.data.screen);
      //     }
      //   }
      // }
      //navigation.popToTop();
    };

    PushNotification.onNotification(handleNotification);

    // Handle background messages (for when the app is not running)
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      if (!user || user.isResetLogin === 1) {
      } else {
        console.log("888 Background message received:", remoteMessage);

        const notificationConfig = {
          //channelId: "high-priority-channel-id",
          title: remoteMessage.notification.title,
          message: remoteMessage.notification.body,
          //vibrate
          vibrate: true,
          //sound
          //sound: "default", // use built-in default sound
          playSound: true, // ensure sound is played
        };

        // Only include channelId for Android O and above
        if (Platform.OS === "android" && parseInt(Platform.Version, 10) >= 26) {
          notificationConfig.channelId = "high-priority-channel-id";
          //PushNotification.localNotification(notificationConfig);
        }
      }
    });

    return () => {
      PushNotification.offNotification(handleNotification);
    };
  }, []); // Include user in the dependency array

  useEffect(() => {
    const handleNotifications = async () => {
      if (!user || user.isResetLogin === 1) {
        await messaging().deleteToken();
        return;
      }

      // Handle background and quit state notifications
      const unsubscribeOnNotificationOpenedApp =
        messaging().onNotificationOpenedApp((remoteMessage) => {
          // console.log(
          //   "Notification caused app to open from background state:",
          //   remoteMessage.notification
          // );
          // alert(
          //   "Notification caused app to open from background state: " +
          //     remoteMessage.notification
          // );
          // Handle navigation or any other logic here
          navigation.popToTop();
        });

      // Handle foreground notifications
      const unsubscribeOnMessage = messaging().onMessage(
        async (remoteMessage) => {
          console.log("A new FCM message arrived!", remoteMessage);

          const notificationConfig = {
            //channelId: "high-priority-channel-id",
            title: remoteMessage.notification.title,
            message: remoteMessage.notification.body,
            //vibrate
            //vibrate: true, //bisa
            //sound
            //sound: "default", // use built-in default sound
            playSound: true, // ensure sound is played
          };

          // Only include channelId for Android O and above
          if (
            Platform.OS === "android" &&
            parseInt(Platform.Version, 10) >= 26
          ) {
            notificationConfig.channelId = "high-priority-channel-id";
          }

          PushNotification.localNotification(notificationConfig);
        }
      );

      // Handle background messages (for when the app is not running)
      // messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      //   console.log("888 Background message received:", remoteMessage);
      //   PushNotification.localNotification({
      //     channelId: "high-priority-channel-id",
      //     title: remoteMessage.notification.title,
      //     message: remoteMessage.notification.body,
      //   });
      // });

      // Clean up the listeners on unmount
      return () => {
        unsubscribeOnNotificationOpenedApp();
        unsubscribeOnMessage();
      };
    };

    handleNotifications();
  }, [user]); // Include user in the dependency array

  // Request permissions and get the FCM token
  // useEffect(() => {
  //   //sudah di login screen
  //   // const requestUserPermission = async () => {
  //   //   const authStatus = await messaging().requestPermission();
  //   //   const enabled =
  //   //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //   //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   //   if (enabled) {
  //   //     console.log('Authorization status:', authStatus);
  //   //     const fcmToken = await messaging().getToken();
  //   //     console.log('FCM Token:', fcmToken); // Save this token if needed
  //   //   }
  //   // };

  //   // requestUserPermission();

  //   user == null || user == "" || user == 0 || user == []
  //     ? null
  //     : user.isResetLogin == 1
  //     ? null
  //     : (() => {
  //         // Handle background and quit state notifications
  //         const unsubscribeOnNotificationOpenedApp =
  //           messaging().onNotificationOpenedApp((remoteMessage) => {
  //             console.log(
  //               "888 act Notification caused app to open from background state:",
  //               remoteMessage.notification
  //             );
  //             alert(
  //               "888 act Notification caused app to open from background state:" +
  //                 remoteMessage.notification
  //             );
  //             // Handle navigation or any other logic here
  //             // PushNotification.localNotification({
  //             //   channelId: "high-priority-channel-id",
  //             //   title: remoteMessage.notification.title,
  //             //   message: remoteMessage.notification.body,
  //             // });
  //           });

  //         // Handle foreground notifications
  //         const unsubscribeOnMessage = messaging().onMessage(
  //           async (remoteMessage) => {
  //             console.log("888 A new FCM message arrived!", remoteMessage);
  //             PushNotification.localNotification({
  //               channelId: "high-priority-channel-id",
  //               title: remoteMessage.notification.title,
  //               message: remoteMessage.notification.body,
  //             });
  //           }
  //         );

  //         // Handle background and quit state notifications
  //         messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  //           console.log("Background message received:", remoteMessage);
  //           PushNotification.localNotification({
  //             channelId: "high-priority-channel-id",
  //             title: remoteMessage.notification.title,
  //             message: remoteMessage.notification.body,
  //           });
  //         });

  //         // Clean up the listeners on unmount
  //         return () => {
  //           unsubscribeOnNotificationOpenedApp();
  //           unsubscribeOnMessage();
  //         };
  //       })(); //immediately invoked function expression (IIFE)
  // }, []);

  // useEffect(() => {
  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log(
  //       'Notification caused app to open from background state:',
  //       remoteMessage.notification,
  //     );
  //     console.log('remoteMessage.data.type', remoteMessage.data.type);
  //     // navigation.navigate('Notification');
  //     // navigation.navigate('Notification', remoteMessage.notification);
  //     navigation.navigate('Notification');
  //     setDataNotif(true);
  //     setisidataNotif(remoteMessage.notification);
  //   });

  //   // Check whether an initial notification is available
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage.notification,
  //         );
  //         console.log('remoteMessage get initial notification', remoteMessage);
  //         // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"/
  //         // setInitialRoute('Notification', {params: remoteMessage.notification});
  //         // navigation.navigate('Notification', remoteMessage.notification);
  //         setDataNotif(true);
  //         setisidataNotif(remoteMessage.notification);
  //         // navigation.navigate('Notification');
  //       }
  //       setLoading(false);
  //     });

  //   messaging().setBackgroundMessageHandler(function (payload) {
  //     console.log('Message received: ', payload);
  //     console.log('PAYLOAD DATA->>>', payload.data);
  //     // const parsedJSON = JSON.parse(payload.data['json-data']);
  //     // console.log('Actions:', parsedJSON);
  //   });
  // }, []);

  // useEffect(() => {
  //   // Assume a message-notification contains a "type" property in the data payload of the screen to open
  //   messaging().setBackgroundMessageHandler(async remoteMessage => {
  //     console.log('Message handled in the background!', remoteMessage);
  //   });

  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log(
  //       'Notification caused app to open from background state:',
  //       remoteMessage.notification,
  //     );
  //     navigation.navigate('Notification');
  //     setNoti(true);
  //     setInitialRoute('Notification');
  //   });

  //   // Check whether an initial notification is available
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage.notification,
  //         );
  //         setNoti(true);
  //         setInitialRoute('Notification'); // e.g. "Settings"
  //       }
  //       setLoading(false);
  //     });
  // }, []);

  const goToNotification = () => {
    // navigation.navigate('Notification');
  };

  if (loading) {
    return null;
  }

  // const goToApp = name => {
  //   navigationRef?.current?.navigate(name);
  // };

  return (
    <View style={{ flex: 1, position: "relative" }}>
      {/* <DarkModeProvider> */}
      <NavigationContainer theme={theme} ref={navigationRef}>
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={initialRoute}
        >
          {loading ? (
            <RootStack.Screen name="Loading" component={Loading} />
          ) : user == null || user == "" || user == 0 || user == [] ? (
            <RootStack.Screen name="SignIn" component={SignIn} />
          ) : user.isResetLogin == 1 ? (
            <RootStack.Screen
              name="ChangePassword"
              component={ChangePassword}
            />
          ) : (
            <RootStack.Screen name="MainStack" component={MainStack} />
          )}
          {/* <RootStack.Screen name="MainStack" component={MainStack} /> */}
          <RootStack.Screen name="Notification" component={Notification} />
          {/* <RootStack.Screen name="Home" component={Home} /> */}
          <RootStack.Screen name="Skip" component={Skip} />
          <RootStack.Screen
            name="AboutUs"
            component={AboutUs}
            //options={{ headerShown: false }}
          />
          <RootStack.Screen name="ResetPassword" component={ResetPassword} />
          <RootStack.Screen name="EProductDetail" component={EProductDetail} />
        </RootStack.Navigator>
      </NavigationContainer>
      {/* </DarkModeProvider> */}
      {/* {!loading && <AssistiveTouch goToApp={goToApp} />} */}
    </View>
  );
};

export default Navigator;
