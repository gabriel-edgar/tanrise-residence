import RNFS from "react-native-fs";
import { PermissionsAndroid, Platform, Alert } from "react-native";
import React from "react";

async function requestPermission() {
  if (Platform.OS === "android") {
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

const downloadFile = async (url, filename) => {
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

  const directory =
    Platform.OS === "android"
      ? RNFS.DownloadDirectoryPath
      : RNFS.DocumentDirectoryPath;

  const directoryShort = Platform.OS === "android" ? "Download" : "Document";

  const downloadDest = `${RNFS.DownloadDirectoryPath}/${filename}`;

  //alert(downloadDest);

  try {
    //await requestPermission();
    const result = await RNFS.downloadFile({
      fromUrl: url,
      toFile: downloadDest,
    }).promise;
    console.log("7 download directoryShort: ", Platform.OS);
    if (result?.statusCode === 200) {
      console.log(`7 File downloaded to ${directoryShort + "/" + filename}`);
      alert(
        "Download successful \n" +
          `File downloaded to ${directoryShort + "/" + filename}`
      );
      Alert.alert("Alert Title", "My Alert Msg", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
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
};

export { downloadFile };
