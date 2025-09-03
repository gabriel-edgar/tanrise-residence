import { AuthActions } from "@/actions";
import {
  Button,
  Header,
  Icon,
  SafeAreaView,
  Text,
  TextInput,
} from "@/components";
import { BaseColor, BaseStyle, useTheme } from "@/config";
import { Images } from "@/config";
import React, { useCallback, useEffect, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import getUser from "../../selectors/UserSelectors";
import getProject from "../../selectors/ProjectSelector";
import errorsSelector from "../../selectors/ErrorSelectors";
import { isLoadingSelector } from "../../selectors/StatusSelectors";
import { login, actionTypes } from "../../actions/UserActions";
import { data_project } from "../../actions/ProjectActions";

import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";
import { baseURL as API_URL_LOKAL } from "@/controllers/HttpClient";
import { useNavigation, useRoute } from "@react-navigation/core";
import { FontWeight } from "../../config";

const SignIn = (props) => {
  const { navigation } = props;
  //const navigation = useNavigation();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePass, setHidePass] = useState(true);

  const [token_firebase, setTokenFirebase] = useState("");
  const [token, setTokenBasic] = useState("");

  const user = useSelector((state) => getUser(state));
  const project = useSelector((state) => getProject(state));

  const isLoading = useSelector((state) =>
    isLoadingSelector([actionTypes.LOGIN], state)
  );
  const errors = useSelector((state) =>
    errorsSelector([actionTypes.LOGIN], state)
  );
  const loginklik = async () => {
    console.log("63 run login");
    if (email === "" || password === "") {
      alert("Please input email and password");
      return;
    }

    console.log("54 run loginKlik");
    setLoading(true);
    await loginUser();
    //loadProject();
    //fastLoginUser();
    //fastLoadProject();
    setLoading(false);
  };

  const loginklikMGR = () => {
    console.log("54 run loginKlik");
    setLoading(true);
    fastLoginUser("mgr@ifca.co.id", "pass1234");
    //fastLoadProject("mgr@ifca.co.id", "pass1234");
    //setLoading(false);
  };

  const loginklikAriffandy = () => {
    console.log("54 run loginKlik");
    setLoading(true);
    fastLoginUser("ahmad.ariffandy@ifca.co.id", "pass1234");
    //fastLoadProject("ahmad.ariffandy@ifca.co.id", "pass1234");
    //setLoading(false);
  };

  const loginklikGhalung = async () => {
    console.log("64 run loginKlik");
    setLoading(true);
    await fastLoginUser("ghalung.sandhika@ifca.co.id", "pass1234");
    //fastLoadProject("ahmad.ariffandy@ifca.co.id", "pass1234");
    setLoading(false);
  };

  const loginUser = useCallback(
    () => dispatch(login(email, password, token_firebase)),
    [email, password, token_firebase, dispatch]
  );

  const fastLoginUser = useCallback((emailFunction, passwordFunction) =>
    dispatch(login(emailFunction, passwordFunction, token_firebase))
  );

  const fastLoadProject = useCallback((emailFunction) =>
    dispatch(data_project({ emails: emailFunction }))
  );

  const loadProject = useCallback(
    () => dispatch(data_project({ emails: email })),
    [{ emails: email }, dispatch]
  );

  // const loadProject = useCallback(
  //   () => dispatch(data_project({emails: email})),
  //   [{emails: email}, dispatch],
  // );

  const passwordChanged = useCallback((value) => setPassword(value), []);
  const emailChanged = useCallback((value) => setEmail(value), []);

  useEffect(() => {
    console.log("user for reset? ", user);
    console.log("project di useeffect signin -->", project);
    if (user !== null && project !== null && user?.length < 0) {
      // loadProject();
      //props.navigation.navigate("Index");
      props.navigation.navigate("MainStack");

      // props.navigation.reset({
      //   index: 0,
      //   routes: [{ name: "MainStack" }],
      // });

      //navigation.navigate("MainStack");

      //props.navigation.goBack();
      // props.navigation.dispatch(
      //   CommonActions.reset({
      //     index: 0,
      //   })
      // );
    }
  });

  useEffect(() => {
    requestUserPermission();
  }, []);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getFcmToken();
      console.log("Authorization status:", authStatus);
    }
  };

  const getFcmToken = async () => {
    //alert("test");
    //await messaging().deleteToken();
    console.log("171 run ");
    // Optionally, you can get the new token
    // await messaging()
    //   .registerDeviceForRemoteMessages()
    //   .catch((e) => {
    //     console.log("171 errorReg: " + e);
    //   });
    const fcmToken = await messaging()
      .getToken()
      .catch((e) => {
        console.log("171 error: " + e);
      });
    console.log("171 token: ", fcmToken);
    if (fcmToken) {
      console.log(fcmToken);
      console.log("888 Your Firebase Token is:", fcmToken);
      //alert("Your Firebase Token is: " + fcmToken);
      setTokenFirebase(fcmToken);
      //setEmail(fcmToken);
    } else {
      console.log("888 Failed", "No token received");
      //alert("Failed", "No token received");
    }
  };

  const handleSignUp = () => {
    // Alert.alert("How to get account:", "Please contact admin to get account", [
    //   {
    //     text: "OK",
    //     onPress: () => console.log("Cancel Pressed"),
    //     style: "cancel",
    //   },
    //   //{ text: "OK", onPress: () => console.log("OK Pressed") },
    // ]);
    props.navigation.navigate("SignUp");
  };

  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={80}
      behavior={Platform.OS == "ios" ? "padding" : "height"} //height
      style={{
        flex: 1,
      }}
    >
      {/* <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={["top", "right", "bottom", "left"]}
      > */}
      <View style={{ marginVertical: 50 }} />

      <View style={styles.contain}>
        <Image
          // source={require('../../assets/images/pakubuwono.png')}
          //source={require("../../assets/images/Default-Black.webp")}
          //source={require("../../assets/images/logoIFCA.png")}
          source={require("../../assets/images/image-home/logo-tanrise-blackfont.png")}
          //resizeMode="cover"
          style={{
            height: 180,
            width: "100%",
            alignSelf: "center",
            //marginHorizontal: 100,
            //marginBottom: 40,
            //marginTop: 10,
            //flexDirection: "row",
            resizeMode: "contain",
            // backgroundColor: "white",
            //borderRadius: 10,
            marginBottom: 100,
          }}
        />
        <TextInput
          style={[BaseStyle.textInput]}
          onChangeText={emailChanged}
          autoCorrect={false}
          placeholder={"Input email"}
          value={email}
          selectionColor={colors.primary}
        />
        <TextInput
          style={[BaseStyle.textInput, { marginTop: 10 }]}
          onChangeText={passwordChanged}
          autoCorrect={false}
          placeholder={t("input_password")}
          secureTextEntry={hidePass}
          value={password}
          selectionColor={colors.primary}
          icon={
            <Icon
              onPress={() => setHidePass(!hidePass)}
              active
              name={hidePass ? "eye-slash" : "eye"}
              size={20}
              color={colors.text}
            />
          }
        />
        <View style={{ width: "100%", marginVertical: 16 }}>
          <Button
            full
            loading={loading}
            disabled={loading}
            style={{ marginTop: 20 }}
            // onPress={loginUser}
            onPress={loginklik}
          >
            {t("sign_in")}
          </Button>
        </View>
        <TouchableOpacity
          //onPress={loginklikGhalung}
          onPress={handleSignUp}
          style={{
            //flex: 0,
            backgroundColor: colors.background,
            color: colors.primary,
            borderWidth: 1,
            borderColor: colors.primary,
            padding: 15,
            marginBottom: 20,
            borderRadius: 10,
            marginHorizontal: 0,
          }}
        >
          <Text
            body2
            grayColor
            style={{
              //color: colors.background,
              color: colors.primary,
              //backgroundColor: "black",
              alignSelf: "center",
              fontSize: 15,
              //marginRight: 10,
              //marginBottom: 10,
              fontWeight: 600,
            }}
          >
            {/* {t("Sign Up")} */}
            {t("Register")}
          </Text>
        </TouchableOpacity>
        {/* <View
          style={{
            alignSelf: "center",
            width: "80%",
            marginBottom: 10,
            height: "5",
          }}
        >
          <Button
            full
            loading={loading}
            disabled={loading}
            style={{
              //marginTop: 20
              // backgroundColor: colors.background,
              backgroundColor: "blue",
              color: "red",
            }}
            // onPress={loginUser}
            onPress={loginklik}
          >
            {t("sign_in")}
          </Button>
        </View> */}
        <View style={styles.contentActionBottom}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ResetPassword")}
          >
            <Text body2 grayColor>
              {t("forgot_your_password")}
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={loginklikMGR}>
            <Text body2 grayColor>
              {t("MGR")}
            </Text>
          </TouchableOpacity> */}

          {/* <TouchableOpacity onPress={() => navigation.navigate("AboutUs")}>
            <Text body2 primaryColor>
              {t("About Us")}
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>

      {/* <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={offsetKeyboard}
        style={{
          flex: 1,
        }}></KeyboardAvoidingView> */}
      {/* </SafeAreaView> */}
    </KeyboardAvoidingView>
  );
};

export default SignIn;
