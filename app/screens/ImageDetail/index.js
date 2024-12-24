import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  View,
  TouchableOpacity,
  Switch,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { BaseStyle, useTheme } from "@config";
import { BaseSetting } from "@config";
import { Header, SafeAreaView, Icon, Text } from "@components";
import { useTranslation } from "react-i18next";
import * as Utils from "@utils";
import styles from "./styles";

export default ImageDetail = (props) => {
  const { navigation, route } = props;

  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const forceDark = useSelector((state) => state.application.force_dark);
  const font = useSelector((state) => state.application.font);

  const [reminders, setReminders] = useState(true);
  const [fotoProfil, setFotoProfil] = useState(route.params);
  const [loading, setLoading] = useState(true);

  console.log(
    "28 props,: " + JSON.stringify(props) + "\n fotoprofil: " + fotoProfil
  );

  /**
   * @description Call when reminder option switch on/off
   */
  const toggleSwitch = (value) => {
    setReminders(value);
  };

  const darkOption = forceDark
    ? t("always_on")
    : forceDark != null
    ? t("always_off")
    : t("dynamic_system");

  const handleLoadStart = () => {
    setLoading(true);
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false); // Handle any loading errors
  };

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={["right", "top", "left"]}
    >
      <Header
        title={t("Account Image")}
        renderLeft={() => {
          return (
            <Icon
              name="angle-left"
              size={20}
              color={colors.primary}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />

      <ImageBackground
        // source={require('../../assets/images/image-home/Main_Image.png')}
        source={{ uri: fotoProfil }}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        style={{
          // height: '100%',
          // height: 400,
          // width: '100%',
          // flex: 1,
          // resizeMode: 'cover',
          // borderBottomLeftRadius: 500,
          // borderBottomRightRadius: 175,
          flex: 1,
          justifyContent: "center",
          backgroundColor: "lightgray",
        }}
        resizeMode="contain"
        imageStyle={
          {
            // height: 900,
            // width: "100%",
            // borderBottomLeftRadius: 175,
            // borderBottomRightRadius: 175,
          }
        }
      >
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
      </ImageBackground>
    </SafeAreaView>
  );
};
