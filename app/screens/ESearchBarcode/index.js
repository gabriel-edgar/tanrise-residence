import { Button, Header, Icon, Text } from "@components";
import { useTheme } from "@config";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Animated, View } from "react-native";
//import { RNCamera } from "react-native-camera";
import styles from "./styles";

const SearchHistory = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [focusedScreen, setFocusedScreen] = useState(false);
  //const [type, setType] = useState(RNCamera.Constants.Type.back);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    navigation.addListener("didFocus", () => setFocusedScreen(true));
    navigation.addListener("willBlur", () => setFocusedScreen(false));
    // Animate for UI barcode
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: false,
        }),
      ]),
      {
        // iterations: 4,
      }
    ).start();
  }, []);

  const onReadSuccess = (barCode) => {};

  const changeType = () => {
    // setType(
    //   type == RNCamera.Constants.Type.back
    //     ? RNCamera.Constants.Type.front
    //     : RNCamera.Constants.Type.back
    // );
  };

  const renderWaiting = () => {
    return (
      <View style={styles.viewWaiting}>
        <Text style={styles.textWaiting}>{t("loading")}</Text>
      </View>
    );
  };

  const renderMarker = () => {
    return (
      <View style={styles.viewMarker}>
        <View style={styles.viewNone} />
        <View style={styles.viewMain}>
          <View style={styles.viewNone} />
          <View
            style={{
              flex: 8,
            }}
          >
            <View style={styles.viewMainBarCode}>
              <Animated.View
                style={{
                  width: "100%",
                  height: loading ? 0 : 1,
                  backgroundColor: "red",
                  opacity: fadeAnim,
                }}
              />
              {loading ? <ActivityIndicator color={colors.primary} /> : null}
            </View>
            <View style={[styles.viewWidth, { left: 0, top: 0 }]} />
            <View style={[styles.viewWidth, { left: 0, bottom: 0 }]} />
            <View style={[styles.viewWidth, { right: 0, top: 0 }]} />
            <View style={[styles.viewWidth, { right: 0, bottom: 0 }]} />
            <View style={[styles.viewHeight, { left: 0, top: 0 }]} />
            <View style={[styles.viewHeight, { left: 0, bottom: 0 }]} />
            <View style={[styles.viewHeight, { right: 0, top: 0 }]} />
            <View style={[styles.viewHeight, { right: 0, bottom: 0 }]} />
          </View>
          <View style={styles.viewNone} />
        </View>
        <View style={[styles.viewNone, { justifyContent: "flex-end" }]}>
          <Button
            style={{ marginBottom: 30, marginHorizontal: 20 }}
            transparent
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.textCancel}>{t("cancel")}</Text>
          </Button>
        </View>
      </View>
    );
  };

  /**
 *       <RNCamera
        // style={styles.preview}
        // type={type}
        // onGoogleVisionBarcodesDetected={({ barcodes }) => {
        //   if (focusedScreen) {
        //     if (barcodes.length > 0) {
        //       setFocusedScreen(false);
        //       return onReadSuccess(barcodes[0]);
        //     } else {
        //       return true;
        //     }
        //   } else {
        //     return null;
        //   }
        // }}
      >
        {({ camera, status, recordAudioPermissionStatus }) => {
          if (status !== "READY") return renderWaiting();
          return renderMarker();
        }}
      </RNCamera>
 * 
 */

  return (
    <View style={styles.container}>
      <Header
        style={{
          // backgroundColor: "transparent",
          position: "absolute",
          width: "100%",
          top: 40,
        }}
        title={t("")}
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
        renderRight={() => (
          <Icon
            name="sync-alt"
            size={20}
            color={colors.primary}
            enableRTL={true}
          />
        )}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={changeType}
      />
    </View>
  );
};

export default SearchHistory;
