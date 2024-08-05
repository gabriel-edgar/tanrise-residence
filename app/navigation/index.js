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

const RootStack = createStackNavigator();
import { StackActions } from "@react-navigation/native";
import MainStack from "./MainStack";
import Notification from "../screens/Notification";
import getUser from "../selectors/UserSelectors";
import Skip from "../screens/Skip";
import EProductDetail from "../screens/EProductDetail";
import messaging from "@react-native-firebase/messaging";
import Home from "../screens/Home";
import ResetPassword from "../screens/ResetPassword";

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
          ) : (
            <RootStack.Screen name="MainStack" component={MainStack} />
          )}
          {/* <RootStack.Screen name="MainStack" component={MainStack} /> */}
          <RootStack.Screen name="Notification" component={Notification} />
          {/* <RootStack.Screen name="Home" component={Home} /> */}
          <RootStack.Screen name="Skip" component={Skip} />
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
