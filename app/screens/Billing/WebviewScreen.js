import {
  Header,
  Icon,
  ListThumbCircleNotif,
  SafeAreaView,
  Text,
} from "@/components";
import { BaseColor, BaseStyle, useTheme } from "@/config";
// Load sample data
// import {NotificationData} from '@/data';
import React, { useState, useEffect } from "react";
import {
  FlatList,
  RefreshControl,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  Platform,
  PermissionsAndroid,
  ScrollView,
  Linking,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
// import getUser from '../../selectors/UserSelectors';
import Pdf from "react-native-pdf";
import ReactNativeBlobUtil from "react-native-blob-util";
// import RNFetchBlob from 'rn-fetch-blob';
import { WebView } from "react-native-webview";

const WebviewScreen = (props) => {
  const { navigation, route } = props;
  console.log("route params", route);
  const paramsItem = route.params;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const repl = paramsItem.link_url?.replace("https", "https");
  console.log("repl", repl);
  const pdfSource = {
    uri: "http://www.pdf995.com/samples/pdf.pdf",
    cache: true,
  };
  const pagesToShow = [2, 3, 4]; // Array of page numbers to display

  const source = {
    uri: repl,
    //uri: "https://api.property365.co.id:4421/tanrise_admin/public/storage/project-download/1001_1001001_GebbySyntia_QuizzizNAT.pdf",
    //uri: "http://www.pdf995.com/samples/pdf.pdf",
    //uri: "https://www.sharedfilespro.com/shared-files/38/?sample.pdf",
    cache: true,
  };
  //   const [refreshing, setRefreshing] = useState(false);
  //   const [notification, setNotification] = useState(NotificationData);
  //   const users = useSelector(state => getUser(state));
  //   const [email, setEmail] = useState(users.user);
  //   const [loading, setLoading] = useState(true);
  //   const [dataTowerUser, setdataTowerUser] = useState([]);
  //   const [arrDataTowerUser, setArrDataTowerUser] = useState([]);
  //   const [spinner, setSpinner] = useState(true);
  //   const [dataNotif, setDataNotif] = useState([]);

  const downloadFile__ = () => {
    const url = repl;
    console.log("url", url);
    const android = RNFetchBlob.android;
    let dirs = RNFetchBlob.fs.dirs;
    console.log("dirs", dirs);
    const title = paramsItem.doc_no + "_" + paramsItem.remark + ".pdf";
    RNFetchBlob.config({
      // response data will be saved to this path if it has access right.

      fileCache: true,
      addAndroidDownloads: {
        path:
          dirs.DownloadDir +
          "/downloads/" +
          paramsItem.doc_no +
          "_" +
          paramsItem.remark +
          ".pdf",
        useDownloadManager: true,
        // Show notification when response data transmitted
        notification: true,
        // Title of download notification
        title: title,
        // File description (not notification description)
        description: "downloading content...",
        mime: "application/pdf",
        // Make the file scannable  by media scanner
        mediaScannable: true,
      },
    })
      .fetch("GET", url)
      .then((res) => {
        // the path should be dirs.DocumentDir + 'path-to-file.anything'
        console.log("The file saved to ", res.path());
        alert("Saved at : " + res.path());
      });
  };

  async function requestPermission() {
    const isIOS = Platform.constants?.systemName;
    if (isIOS != "iOS") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage Permission",
            message: "This app needs access to your storage.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  }

  const downloadForIOS = async (url) => {
    //const item = items;

    //const url = items.link_url;
    // Extract the filename from the URL
    console.log("121 url: ", url);
    const filenameWithExtension = url.split("/").pop();

    // Remove the .pdf extension (case insensitive)
    const filename = filenameWithExtension.replace(/\.pdf$/i, "");
    const path =
      ReactNativeBlobUtil.fs.dirs.DocumentDir + "/" + filename + ".pdf";
    const response = await ReactNativeBlobUtil.config({
      fileCache: true,
      appendExt: "pdf",
      path,
    })
      .fetch("GET", url, {
        Accept: "application/pdf",
        "Content-Type": "application/pdf",
      })
      .progress((received, total) => {
        console.log("progress", received / total);
      })
      .then(async (res) => {
        console.log("The file saved to ", res.path());
      });

    ReactNativeBlobUtil.ios.previewDocument(path); //ini untuk memunculkan menu preview document di ios
    return response;
  };

  const downloadFile = async () => {
    if (!repl) {
      alert("url is empty");
      return;
    }

    if (Platform.OS == "ios") {
      console.log("155 run ios");
      const url = repl;
      downloadForIOS(url);
    } else {
      await requestPermission();

      const url = repl;
      console.log("url", url);
      //  const android = RNFetchBlob.android;
      let dirs = ReactNativeBlobUtil.fs.dirs;
      //  console.log('dirs', dirs);

      //const title = paramsItem.doc_no + "_" + paramsItem.remark + ".pdf";
      const title = paramsItem.doc_no + ".pdf";

      // send http request in a new thread (using native code)

      ReactNativeBlobUtil.config({
        // add this option that makes response data to be stored as a file,
        // this is much more performant.
        fileCache: true,

        // android only options, these options be a no-op on IOS
        addAndroidDownloads: {
          path:
            dirs.DownloadDir +
            "/downloads/" +
            paramsItem.doc_no +
            "_" +
            paramsItem.remark +
            ".pdf",
          useDownloadManager: true,
          // Show notification when response data transmitted
          notification: true,
          // Title of download notification
          title: title,
          // File description (not notification description)
          description: "downloading content...",
          mime: "application/pdf",
          // Make the file scannable  by media scanner
          mediaScannable: true,
        },
      })
        .fetch("GET", url, {
          //some headers ..
        })
        .then((res) => {
          // the temp file path
          console.log("The file saved to ", res.path());
          alert("The file saved to " + res.path());
        });
    }
  };

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={["top", "right", "bottom", "left"]}
    >
      <Header
        //title={"Payment Screen"}
        title={paramsItem.title}
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
          navigation.pop(3);
        }}
        renderRight={() => {
          return (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "lightgray",
                borderRadius: 10,
                padding: 5,
              }}
            >
              <Icon
                name="globe"
                size={20}
                color={colors.primary}
                enableRTL={true}
              />
              <Text
                style={{
                  textAlign: "center",
                  marginLeft: 10,
                  fontSize: 10,
                  color: "black",
                }}
              >
                {"Open in Browser"}
              </Text>
            </View>
          );
        }}
        onPressRight={() => {
          Linking.openURL(
            paramsItem.url
            // `mailto:${item.contact_no}?subject=${encodeURIComponent(
            //   email.subject
            // )}&body=${encodeURIComponent(email.body)}`
          ).catch((err) => alert("Error opening payment link"));
        }}
      />
      <Text subhead bold style={{ textAlign: "center", marginBottom: 10 }}>
        {"Invoice " + paramsItem.doc_no}
      </Text>
      <WebView
        source={{ uri: paramsItem.url }}
        style={{ flex: 1 }}
        // onNavigationStateChange={(navState) => {
        //   if (!navState.url.startsWith(url)) {
        //     // Optionally handle external links
        //     setWebViewVisible(false);
        //   }
        // }}
      />
    </SafeAreaView>
  );
};

export default WebviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 25,
  },
  containerPdf: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  pageContainer: {
    width: "100%", // Set width to fill the ScrollView
    height: 400, // Adjust height as needed
  },
});
