import { Text, Header, Icon, Button } from "@/components";
// import data_dummy from '../Home/data_dummy.json';
import RNFS from "react-native-fs";

import {
  View,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Modal,
  useWindowDimensions,
  Linking,
  RefreshControl,
  Platform,
  Alert,
  PermissionsAndroid,
} from "react-native";
import styles from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { BaseStyle, Fonts, BaseColor, useTheme } from "@/config";
// import {
//   BaseColor,
//   BaseStyle,
//   useTheme,
//   Typography,
//   FontWeight,
// } from "@/config";
import { useTranslation } from "react-i18next";
import React, { useState, useCallback, useRef, useEffect } from "react";

import axios from "axios";
//import { API_URL } from "@env";
import { useSelector, useDispatch, connect } from "react-redux";

//import MapView from 'react-native-maps';
//import {Marker} from 'react-native-maps';
import RenderHtml, { defaultSystemFonts } from "react-native-render-html";
import CustomAlert2 from "../components/CustomAlert2";

//import { downloadFile } from "./downloadFile";
//import { downloadFile } from "./downloadFile21Aug";
import Pdf from "react-native-pdf";
import ReactNativeBlobUtil from "react-native-blob-util";
import { color } from "react-native-elements/dist/helpers";
import WebView from "react-native-webview";

const DownloadBrochure = (props) => {
  const { colors } = useTheme();
  console.log("props dari project", props);
  const { t } = useTranslation();
  const { navigation } = props;
  //const [playing, setPlaying] = useState(false);

  const paramsDetail = props.route.params;
  //const entity_cd = paramsDetail.entity_cd;
  //const project_no = paramsDetail.project_no;
  console.log("56 paramsdetail projek detail", paramsDetail);
  // const dummyArray = [
  //   paramsDetail.downloadProject[0],
  //   paramsDetail.downloadProject[0],
  // ];
  const [modalVisible, setModalVisible] = useState(false);

  const stateRedux = useSelector((state) => state);
  console.log("74 stateRedux: ", stateRedux);

  const [downloadProject, setDownloadProject] = useState(
    paramsDetail.downloadProject
  );
  //const { width } = useWindowDimensions().width;
  // const {widthRender} = useWindowDimensions();
  const { width: contentWidth } = useWindowDimensions();
  const systemFonts = [
    ...defaultSystemFonts,

    "Arial Black",
    "Comic-Sans MS",
    "Courier New",
    "Lato-Bold",
    "Lato-Regular",
    "Lato-Black",
    "Lato-Italic",
  ];

  const [itemsOverview, setItemsOverview] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isDAlertVisible, setDAlertVisible] = useState(false);
  const [indexDownload, setIndexDownload] = useState(null);
  const [messageDownload, setMessageDownload] = useState(null);

  //useEffect(() => {}, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

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

  const downloadFile = async (url, filename) => {
    if (Platform.OS == "ios") {
      downloadForIOS(url);
    } else {
      await requestPermission();

      //url = "https://example.com/file.pdf";
      //const filename2 = "example.txt";
      console.log("7 downloadFile: ", filename, " ", url);

      //RNFS.DownloadDirectoryPath
      //RNFS.DocumentDirectoryPath
      //RNFS.ExternalDirectoryPath

      // const directory =
      //   Platform.OS === "android"
      //     ? RNFS.DownloadDirectoryPath
      //     : RNFS.DocumentDirectoryPath;
      const isIOS = Platform.constants?.systemName;
      const directory =
        isIOS == "iOS"
          ? RNFS.DocumentDirectoryPath
          : RNFS.DownloadDirectoryPath;

      const directoryShort = isIOS == "iOS" ? "Document" : "Download";

      const downloadDest = `${directory}/${filename}`;

      //alert(downloadDest);

      console.log("7 download 2");
      try {
        //await requestPermission();
        const result = await RNFS.downloadFile({
          fromUrl: url,
          toFile: downloadDest,
        }).promise;
        console.log(
          "7 download directoryShort: ",
          isIOS,
          " "
          // JSON.stringify(Platform)
        );
        if (result?.statusCode === 200) {
          console.log(
            `7 File downloaded to ${directoryShort + "/" + filename}`
          );
          Alert.alert(
            "Download successful",
            `File downloaded to ${directoryShort + "/" + filename}`,
            [
              {
                text: "OK",
                //onPress: () => Alert.alert("Cancel Pressed"),
                //style: "cancel",
              },
            ],
            {
              //cancelable: true,
              // onDismiss: () =>
              //   Alert.alert(
              //     "This alert was dismissed by tapping outside of the alert dialog."
              //   ),
            }
          );
        } else {
          alert("Download failed \n" + `Status code: ${result?.statusCode}`);
        }
        // console.log(
        //   "7 Download successful \n" +
        //     `File downloaded to ${directoryShort + "/" + filename}`
        // );
        // //return alert("abc");
        // alert(
        //   "Download successful \n" +
        //     `File downloaded to ${directoryShort + "/" + filename}`
        // );
      } catch (error) {
        console.log("Download error \n" + error);
        alert("Download error \n" + error);
      }
    }
  };

  return (
    <SafeAreaView
      edges={["right", "top", "left"]}
      style={[BaseStyle.safeAreaView, { backgroundColor: colors.background }]}
    >
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Header
          title={t("Brochure")}
          //title={t("")}
          renderLeft={() => {
            return (
              <Icon
                // name="angle-left"
                name="arrow-left"
                size={18}
                //color={BaseColor.corn70}
                color={colors.primary}
                enableRTL={true}
              />
            );
          }}
          style={{
            //height: 80,
            borderRadius: 40,
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
        <View
          style={{
            //position: "absolute",
            backgroundColor: colors.background,
            // top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            // height: 80,

            //marginHorizontal: 25,
            marginVertical: 5,
            borderRadius: 20,
            //opacity: 0.8,
            // justifyContent: 'center',
            alignItems: "center",
          }}
        >
          <View
            style={{
              marginVertical: 0,
              marginHorizontal: 25,
              //backgroundColor: colors.background,
            }}
          >
            <Text
              style={{
                fontFamily: "DMSerifDisplay",
                color: colors.text, //BaseColor.corn90,
                marginVertical: 10,
                fontSize: 17,
                // marginHorizontal: 3,
                fontWeight: "bold",
              }}
            >
              {/* {item.project_name} */}
              {/* Project name */}
              {/* {paramsDetail.project_descs} */}
              {paramsDetail.descs}
            </Text>

            <Text
              style={{
                fontFamily: "DMSerifDisplay",
                color: colors.text,
                marginVertical: 5,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              {/* {item.location} */}
              {/* lokasi */}
              {paramsDetail.caption_address}
            </Text>
          </View>
        </View>
        {/* </ImageBackground> */}
        {/* brosur ----  */}
        {paramsDetail.downloadProject.map((currentValue, index, arr) => {
          //dummyArray.map((currentValue, index, arr) => {
          return (
            <>
              <Text
                style={{
                  fontFamily: "DMSerifDisplay",
                  color: colors.text,
                  marginVertical: 0,
                  fontSize: 16,
                  fontWeight: "bold",
                  marginHorizontal: 20,
                }}
              >
                {index + 1}. Brochure {currentValue?.descs}
              </Text>
              <View
                style={{
                  flex: 1,
                  // justifyContent: "center",
                  // alignItems: "center",
                  marginTop: 10,
                }}
              >
                {/* <Pdf
                  trustAllCerts={false}
                  source={{
                    uri: currentValue?.url,
                    //uri: "https://api.property365.co.id:4421/tanrise_admin/public/storage/project-download/1001_1001001_GebbySyntia_QuizzizNAT.pdf",
                    //uri: "http://www.pdf995.com/samples/pdf.pdf",
                    //uri: "https://www.sharedfilespro.com/shared-files/38/?sample.pdf",
                    cache: true,
                  }}
                  onError={error => {
                    console.log('251 ' + error);
                  }}
                  style={{
                    flex: 1,
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height / 2,
                    backgroundColor: colors.background,
                    borderRadius: 20,
                  }}
                /> */}
                {Platform.OS == "android" ? (
                  <Pdf
                    trustAllCerts={false}
                    source={{
                      uri: currentValue?.url,
                      cache: true,
                    }}
                    style={{
                      flex: 1,
                      width: Dimensions.get("window").width,
                      height: Dimensions.get("window").height / 2,
                      backgroundColor: colors.background,
                      borderRadius: 20,
                    }}
                  />
                ) : (
                  <WebView
                    originWhitelist={["*"]}
                    source={{
                      uri: currentValue?.url,
                      cache: true,
                    }}
                    style={{
                      flex: 1,
                      width: Dimensions.get("window").width,
                      height: Dimensions.get("window").height / 2,
                      backgroundColor: colors.background,
                      borderRadius: 20,
                    }}
                  />
                )}
              </View>
              <TouchableOpacity
                onPress={() => {
                  //navigation.navigate("DownloadBrochure", paramsDetail);
                  setDAlertVisible(true);
                  setIndexDownload(index);
                  // setMessageDownload(
                  //   "Are you sure you want to download brochure " +
                  //     [index + 1] +
                  //     "?"
                  // );
                  setMessageDownload(
                    'Want to download \n"Brochure ' +
                      paramsDetail.descs +
                      "" +
                      //downloadProject[indexDownload]?.descs +
                      '"?'
                  );
                }}
              >
                <View
                  style={{
                    marginTop: 20,
                    backgroundColor: colors.primary,
                    borderRadius: 15,

                    height: 50,
                    marginBottom: 30,
                    marginHorizontal: 20,
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "DMSerifDisplay",
                      fontSize: 14,
                      alignSelf: "center",
                      alignItems: "center",
                    }}
                  >
                    Download Brochure {index + 1}
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          );
        })}

        <View>
          <CustomAlert2
            visible={isDAlertVisible}
            message={messageDownload} //"Are you sure you want to download?"
            onConfirm={() => {
              //alert("test");
              setDAlertVisible(false);
              //handleLinking();
              console.log(
                "949 confirm: ",
                indexDownload,
                " ",
                downloadProject,
                " ",
                downloadProject[indexDownload]?.url,
                "Brochure " + paramsDetail.descs + ".pdf"
              );
              downloadFile(
                downloadProject[indexDownload]?.url,
                //"Brochure " + paramsDetail.descs + ".pdf"
                "Brochure " +
                  paramsDetail.descs +
                  "_" +
                  downloadProject[indexDownload]?.descs +
                  ".pdf"
              );
            }}
            onCancel={() => {
              setDAlertVisible(false);
            }}
            style={{ color: colors.text, backgroundColor: colors.background }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default DownloadBrochure;
