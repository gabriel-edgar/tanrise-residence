import {
  Header,
  Icon,
  ListThumbCircleNotif,
  SafeAreaView,
  Text,
} from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
// Load sample data
// import {NotificationData} from '@data';
import React, { useState, useEffect, useRef } from "react";
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
} from "react-native";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
// import getUser from '../../selectors/UserSelectors';
import Pdf from "react-native-pdf";
import ReactNativeBlobUtil from "react-native-blob-util";
// import RNFetchBlob from 'rn-fetch-blob';

const PDFShow = (props) => {
  const { navigation, route } = props;
  //console.log("route params", route);
  const paramsItem = route.params;
  console.log("34 paramsItem", paramsItem);
  const { t } = useTranslation();
  const { colors } = useTheme();
  const repl = paramsItem.link_url?.replace("https", "https");
  console.log("repl", repl);
  // const pdfSource = {
  //   //uri: "https://drive.google.com/file/d/1FZalOrcH_rD2ud0rqKlujtR1_GzZ_FeQ/view?usp=sharing"
  //   //uri: "https://drive.google.com/uc?export=download&id=1FZalOrcH_rD2ud0rqKlujtR1_GzZ_FeQ",
  //   cache: true,
  // };
  // 1permata:https://drive.google.com/file/d/1YjEYQh8ibmVyYzAb1DHgfBS-1ncZFw0g/view?usp=sharing
  // 2danamon:https://drive.google.com/file/d/1KwetUbAgS5LBhAS-9j2XYubWE8i_5icn/view?usp=sharing
  // 3mandiri: https://drive.google.com/file/d/1_QdtrDB05BblXQzkNkZnqLVc1l_Wcn42/view?usp=sharing
  // 4maybank: https://drive.google.com/file/d/1FYarm1tOD4j06X_DeEOhVvta_Xf5Rodp/view?usp=sharing
  // 5bca: https://drive.google.com/file/d/1WAnERWsaGGDLHf3Ipb8LJr77zopzN210/view?usp=sharing
  // 6bni: https://drive.google.com/file/d/1sPXmwoaZiW4j47WTRSPnWfFeY16B6g0z/view?usp=sharing
  // 7sinarmas: https://drive.google.com/file/d/1UIJL7N3t0NW--imLAzq_MJNy0fv13ykb/view?usp=sharing
  // 8bnc:https://drive.google.com/file/d/1mczFG7UPpMowH0sRB6bM5biNEpmjKq5k/view?usp=sharing
  // 9btn: https://drive.google.com/file/d/106EZEk3Br_rPeWczAIujAHQpGjKRfUD7/view?usp=sharing
  // cs1-indomaret: https://drive.google.com/file/d/1yGfxkPJLmyX2YAvxvysiQdfWCphOTbbN/view?usp=sharing
  // cs2-alfamart: https://drive.google.com/file/d/1ofqbli3hqVIhZXTjWsgACIstAT3gZHVk/view?usp=sharing

  // const merchant = {
  //   permata:
  //     "https://drive.google.com/uc?export=download&id=1YjEYQh8ibmVyYzAb1DHgfBS-1ncZFw0g",
  //   danamon:
  //     "https://drive.google.com/uc?export=download&id=1KwetUbAgS5LBhAS-9j2XYubWE8i_5icn",
  //   mandiri:
  //     "https://drive.google.com/uc?export=download&id=1_QdtrDB05BblXQzkNkZnqLVc1l_Wcn42",
  //   maybank:
  //     "https://drive.google.com/uc?export=download&id=1FYarm1tOD4j06X_DeEOhVvta_Xf5Rodp",
  //   bca: "https://drive.google.com/uc?export=download&id=1WAnERWsaGGDLHf3Ipb8LJr77zopzN210",
  //   bni: "https://drive.google.com/uc?export=download&id=1sPXmwoaZiW4j47WTRSPnWfFeY16B6g0z",
  //   sinarmas:
  //     "https://drive.google.com/uc?export=download&id=1UIJL7N3t0NW--imLAzq_MJNy0fv13ykb",
  //   bnc: "https://drive.google.com/uc?export=download&id=1mczFG7UPpMowH0sRB6bM5biNEpmjKq5k",
  //   btn: "https://drive.google.com/uc?export=download&id=106EZEk3Br_rPeWczAIujAHQpGjKRfUD7",
  //   cs1_indomaret:
  //     "https://drive.google.com/uc?export=download&id=1yGfxkPJLmyX2YAvxvysiQdfWCphOTbbN",
  //   cs2_alfamart:
  //     "https://drive.google.com/uc?export=download&id=1ofqbli3hqVIhZXTjWsgACIstAT3gZHVk",
  // };

  // switch (paramsItem.merchant) {
  //   case "PERMATA":
  //     pdfSource.uri = merchant.permata;
  //     break;
  //   case "DANAMON":
  //     pdfSource.uri = merchant.danamon;
  //     break;
  //   case "MANDIRI":
  //     pdfSource.uri = merchant.mandiri;
  //     break;
  //   case "MAYBANK":
  //     pdfSource.uri = merchant.maybank;
  //     break;
  //   case "BCA":
  //     pdfSource.uri = merchant.bca;
  //     break;
  //   case "BNI":
  //     pdfSource.uri = merchant.bni;
  //     break;
  //   case "SINARMAS":
  //     pdfSource.uri = merchant.sinarmas;
  //     break;
  //   case "BNC":
  //     pdfSource.uri = merchant.bnc;
  //     break;
  //   case "BTN":
  //     pdfSource.uri = merchant.btn;
  //     break;
  //   case "INDOMARET":
  //     pdfSource.uri = merchant.cs1_indomaret;
  //     break;
  //   case "ALFAMART":
  //     pdfSource.uri = merchant.cs2_alfamart;
  //     break;
  //   default:
  //     pdfSource.uri = "";
  //   // "https://drive.google.com/uc?export=download&id=1FZalOrcH_rD2ud0rqKlujtR1_GzZ_FeQ";
  // }

  const pagesToShow = [3, 4, 5, 6, 7]; // Array of page numbers to display

  // const pdfRef = useRef(null);
  // const [currentPage, setCurrentPage] = useState(1);

  // const handlePageChange = (pageNumber) => {
  //   //setCurrentPage(pageNumber);
  //   //alert(pageNumber);
  //   if (pageNumber <= 3) {
  //     pdfRef.current.setPage(3);
  //   } else if (pageNumber >= 6) {
  //     pdfRef.current.setPage(5);
  //     //pdfRef.current.setPage(pageNumber);
  //   }
  // };

  // return (
  //   <div>
  //     <Pdf
  //       ref={pdfRef}
  //       source="your_pdf_source.pdf"
  //       onPageChange={handlePageChange}
  //     />
  //     <button onClick={() => handlePageChange(currentPage + 1)}>
  //       Next Page
  //     </button>
  //     <button onClick={() => handlePageChange(currentPage - 1)}>
  //       Previous Page
  //     </button>
  //     <p>Current Page: {currentPage}</p>
  //   </div>
  // );

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
      edges={["right", "top", "left"]}
    >
      <Header
        // title={t("Attachment Invoice") + paramsItem.doc_no}
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
          navigation.goBack();
          //navigation.pop(3);
        }}
      />
      {/* <ScrollView style={styles.containerPdf} horizontal={true}>
        {pagesToShow.map((pageNumber) => (
          <View key={pageNumber} style={styles.pageContainer}>
            <Text>{pageNumber}</Text> */}
      <Pdf
        source={paramsItem.pdfSource}
        //source={{ uri: "https://www.pdf995.com/samples/pdf.pdf" }}
        //page={6}
        // page={3}
        style={styles.pdf}
        // scale={1.3}
        //onPageChanged={(page, numberOfPages) => {}}
        // minScale={1.0}
        // maxScale={3.0}
        // ref={(pdf) => {
        //   //alert(JSON.stringify(pdf));
        //   //this.pdf = pdf;
        //   //this.pdf.setPage(42);
        // }}
        // horizontal={false}
        // ref={pdfRef}
        //source="your_pdf_source.pdf"
        // onPageChanged={handlePageChange}
      />
      {/* </View>
        ))}
      </ScrollView> */}
    </SafeAreaView>
  );
};

export default PDFShow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 25,
  },
  containerPdf: {
    flex: 1,
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  pageContainer: {
    width: "100%", // Set width to fill the ScrollView
    //height: 400, // Adjust height as needed
  },
});
