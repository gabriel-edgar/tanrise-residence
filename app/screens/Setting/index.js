import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  TouchableOpacity,
  Switch,
  ScrollView,
  TouchableHighlight,
  //modal
  Modal,
  StyleSheet,
  Button,
  TextInput,
  Platform,
} from "react-native";
import { BaseStyle, useTheme } from "@/config";
import { BaseSetting } from "@/config";
import { Header, SafeAreaView, Icon, Text } from "@/components";
import { useTranslation } from "react-i18next";
import * as Utils from "@/utils";
import styles from "./styles";
import { baseURL as API_URL_LOKAL } from "@/controllers/HttpClient";
import VersionInfo from "react-native-version-info";
import messaging from "@react-native-firebase/messaging";

export default function Setting({ navigation }) {
  console.log("13 API_URL_LOKAL", API_URL_LOKAL);
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const forceDark = useSelector((state) => state.application.force_dark);
  const font = useSelector((state) => state.application.font);
  const [modalVisible, setModalVisible] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [token, setToken] = useState("");

  // Function to handle the tap
  const handleTap = () => {
    setTapCount((prevCount) => {
      const newCount = prevCount + 1;
      console.log("35 :", newCount);
      if (newCount === 2) {
        setModalVisible(true);
        // setTapCount(0); // Reset the counter after showing the modal
        return 0;
      }
      return newCount;
    });
  };

  const [reminders, setReminders] = useState(true);

  /**
   * @description Call when reminder option switch on/off
   */
  const toggleSwitch = (value) => {
    setReminders(value);
  };

  console.log("26 darkOption: ", forceDark);

  const darkOption = forceDark ? "ON" : forceDark != null ? "OFF" : "OFF"; //t("dynamic_system");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    //alert(API_URL_LOKAL);
    const fcmToken = await messaging()
      .getToken()
      .catch((error) => {
        return JSON.stringify(error);
      });

    console.log("77 fcmToken: ", fcmToken);

    setToken(fcmToken);
  };

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={["right", "top", "left"]}
    >
      <Header
        title={t("setting")}
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
      <ScrollView contentContainerStyle={styles.contain}>
        {/* <TouchableOpacity
          style={[
            styles.profileItem,
            {
              borderBottomColor: colors.border,
              borderBottomWidth: 1,
            },
          ]}
          onPress={() => {
            // navigation.navigate("ChangeLanguage");
          }}
        >
          <Text body1>{t("language")}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text body1 grayColor>
              {Utils.languageFromCode(i18n.language)}
            </Text>
            <Icon
              name="angle-right"
              size={18}
              color={colors.primary}
              style={{ marginLeft: 5 }}
              enableRTL={true}
            />
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={[
            styles.profileItem,
            {
              borderBottomColor: colors.border,
              borderBottomWidth: 1,
            },
          ]}
          onPress={() => {
            navigation.navigate("ThemeSetting");
          }}
        >
          <Text body1>{t("theme")}</Text>
          <View
            style={[styles.themeIcon, { backgroundColor: colors.primary }]}
          />
        </TouchableOpacity>
        {Platform.OS == "ios" ? null : (
          <TouchableOpacity
            style={[
              styles.profileItem,
              {
                borderBottomColor: colors.border,
                borderBottomWidth: 1,
              },
            ]}
            onPress={() => navigation.navigate("SelectFontOption")}
          >
            <Text body1>{t("font")}</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text body1 grayColor>
                {font ?? t("default")}
              </Text>
              <Icon
                name="angle-right"
                size={18}
                color={colors.primary}
                style={{ marginLeft: 5 }}
                enableRTL={true}
              />
            </View>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[
            styles.profileItem,
            {
              borderBottomColor: colors.border,
              borderBottomWidth: 1,
            },
          ]}
          onPress={() => {
            navigation.navigate("SelectDarkOption");
          }}
        >
          <Text body1>{t("dark_theme")}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text body1 grayColor>
              {darkOption}
            </Text>
            <Icon
              name="angle-right"
              size={18}
              color={colors.primary}
              style={{ marginLeft: 5 }}
              enableRTL={true}
            />
          </View>
        </TouchableOpacity>
        {/* <View
          style={[
            styles.profileItem,
            {
              borderBottomColor: colors.border,
              borderBottomWidth: 1,
            },
            { paddingVertical: 15 },
          ]}
        >
          <Text body1>{t("notification")}</Text>
          <Switch
            thumbColor={reminders ? colors.primary : "#D3D3D3"}
            size={18}
            onValueChange={toggleSwitch}
            value={reminders}
          />
        </View> */}
        <View style={styles.profileItem}>
          <Text body1>{t("app_version")}</Text>
          <Text body1 grayColor>
            {VersionInfo.appVersion}
          </Text>
        </View>
        {/* <View style={styles.profileItem}>
          <Text body1>{"Build Version"}</Text>
          <Text body1 grayColor>
            {VersionInfo.buildVersion}
          </Text>
        </View> */}
        {/* <View style={styles.profileItem}>
          <Text body1>{"Bundle Id"}</Text>
          <Text body1 grayColor>
            {VersionInfo.bundleIdentifier}
          </Text>
        </View> */}
        <View
          style={[
            styles.profileItem,
            {
              borderTopColor: colors.border,
              borderTopWidth: 1,
            },
            { paddingVertical: 15 },
          ]}
        >
          <Text body1>{t("App Code")}</Text>
          <TouchableHighlight
            //onPress={() => setModalVisible(true)}
            //onPress={handleTap}
            underlayColor={colors.background}
          >
            <Text body1 grayColor>
              {API_URL_LOKAL.slice(46, 47).toUpperCase() + ""}
            </Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
      <Modal
        transparent={true}
        visible={modalVisible}
        //animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        {/* <TouchableOpacity
          style={styles2.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles2.card}>
            <Text style={styles2.cardTitle}>Dev</Text>
            <Text style={styles2.cardContent}>
              this is development screen, dont too mind about it
            </Text>
            <TouchableOpacity
              style={styles2.closeButton}
              onPress={() => {
                navigation.navigate("Messaging", {
                  username: "MGR",
                  targetPerson: "Report123",
                });
              }}
            >
              <Text style={styles2.closeButtonText}>dev m1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles2.closeButton}
              onPress={() => {
                navigation.navigate("Messages", {
                  username: "MGR",
                  targetPerson: "Report123",
                });
              }}
            >
              <Text style={styles2.closeButtonText}>dev ms</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles2.closeButton}
              onPress={() => {
                navigation.navigate("Messenger", {
                  username: "MGR",
                  targetPerson: "Report123",
                });
              }}
            >
              <Text style={styles2.closeButtonText}>dev mr</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles2.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles2.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity> */}
        <View
          style={
            //styles.modalBackground
            {
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }
          }
        >
          <View
            style={
              //styles.modalContainer
              {
                width: 300,
                padding: 20,
                backgroundColor: "white",
                borderRadius: 10,
                alignItems: "center",
              }
            }
          >
            <TextInput
              style={
                //styles.input
                {
                  height: 40,
                  borderColor: "gray",
                  borderWidth: 1,
                  width: "100%",
                  marginBottom: 20,
                  paddingHorizontal: 10,
                }
              }
              value={token}
            />
            <TouchableOpacity
              style={styles2.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles2.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// import Messages from "../screens/Messages";
// import Messenger from "../screens/Messenger";

const styles2 = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0)",
  },
  card: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // for Android shadow
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});
