/** @format */

import {ApplicationActions} from '@/actions';
import {AssistiveTouch} from '@/components';
import {BaseSetting, useTheme} from '@/config';
// import { NavigationContainer } from '@react-navigation/native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';
import {languageSelect} from '@/selectors';
import * as Utils from '@/utils';
import i18n from 'i18next';
import React, {useEffect, useRef, useState} from 'react';
import {initReactI18next} from 'react-i18next';
import {Platform, StatusBar, View} from 'react-native';
//import { DarkModeProvider, useDarkMode } from "react-native-dark-mode";
import {useDispatch, useSelector} from 'react-redux';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Loading from '../screens/Loading';

//import { Alert } from "react-native";
// import PushNotification from "react-native-push-notification";

const RootStack = createStackNavigator();
import {StackActions} from '@react-navigation/native';
import MainStack from './MainStack';
import Notification from '../screens/Notification';
import getUser from '../selectors/UserSelectors';
import Skip from '../screens/Skip';
import EProductDetail from '../screens/EProductDetail';
import Home from '../screens/Home';
import ResetPassword from '../screens/ResetPassword';
import AboutUs from '@/screens/AboutUs';
import ChangePassword from '../screens/ChangePassword';
import App from '../../App';

const Navigator = props => {
  const {theme, colors} = useTheme();
  const isDarkMode = false; //useDarkMode();
  const language = useSelector(languageSelect);
  const {navigation, route} = props;
  // const {route} = props;
  console.log('navigation from app for notif', props);
  // const navigation = useNavigation();
  console.log('route from app for notif', route);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const navigationRef = useRef(null);
  const user = useSelector(state => getUser(state));
  const [initialRoute, setInitialRoute] = useState('MainStack');
  const [dataNotif, setDataNotif] = useState(false);
  const [isidataNotif, setisidataNotif] = useState([]);
  const [noti, setNoti] = useState(false);

  console.log('user null ?? ', user);

  useEffect(() => {
    console.log('60 nav start');
    // Config status bar
    // if (Platform.OS == 'android') {
    //   StatusBar.setBackgroundColor(colors.primary, true);
    // }
    //StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content', true);
    const onProcess = async () => {
      // Get current language of device
      const languageCode = language ?? BaseSetting.defaultLanguage;
      dispatch(ApplicationActions.onChangeLanguage(languageCode));
      // Config language for app
      try {
        await i18n.use(initReactI18next).init({
          resources: BaseSetting.resourcesLanguage,
          lng: languageCode,
          fallbackLng: languageCode,
        });
        console.log('i18n initialized successfully');
      } catch (error) {
        console.log('i18n failed to initialize:', error);
      }
      setTimeout(() => {
        Utils.enableExperimental();
        setLoading(false);
        //    navigationRef?.current?.dispatch(StackActions.replace('OnBoard'));
      }, 300);
    };
    onProcess();
  }, []);

  // return (
  //   <App/>
  // )

  if (loading) {
    return null;
  }

  return (
    <View style={{flex: 1, position: 'relative'}}>
      {/* <DarkModeProvider> */}
      <NavigationContainer theme={theme} ref={navigationRef}>
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          //initialRouteName={initialRoute}
        >
          {loading ? (
            <RootStack.Screen name="Loading" component={Loading} />
          ) : user == null || user == '' || user == 0 ? (
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
          <RootStack.Screen name="SignUp" component={SignUp} />
        </RootStack.Navigator>
      </NavigationContainer>
      {/* </DarkModeProvider> */}
      {/* {!loading && <AssistiveTouch goToApp={goToApp} />} */}
    </View>
  );
};

export default Navigator;
