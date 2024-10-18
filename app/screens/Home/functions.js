import checkVersion from "react-native-store-version";
import VersionInfo from "react-native-version-info";
import {
  View,
  Button,
  Alert,
  StyleSheet,
  Linking,
  Platform,
} from "react-native";

const check_version = async () => {
  const iosStoreURL =
    "https://apps.apple.com/id/app/mobile-legends-bang-bang/id1160056295";
  const androidStoreURL =
    "https://play.google.com/store/apps/details?id=com.ifcasoftware.tanriseresidence";

  try {
    const check = await checkVersion({
      version: VersionInfo.appVersion, // app local version
      iosStoreURL: iosStoreURL,
      androidStoreURL: androidStoreURL,
      country: "id", // default value is 'jp'
    });

    const showAlert = () => {
      Alert.alert(
        "New App Version Available",
        //"My Alert Msg",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "Update",
            onPress: () =>
              Linking.openURL(
                Platform.OS == "ios" ? iosStoreURL : androidStoreURL
              ).catch((err) =>
                console.error("Home16 Failed to open URL: ", err)
              ),
          },
        ],
        { cancelable: false } // Prevents dismissing by tapping outside
      );
      alert("update");
    };

    console.log("Home16 check: ", check);
    if (check.result === "new") {
      // if app store version is new
      console.log("Home16 new detected ");
      showAlert();
    }
  } catch (e) {
    console.log("Home16 error:" + e);
  }
};

export { check_version };
