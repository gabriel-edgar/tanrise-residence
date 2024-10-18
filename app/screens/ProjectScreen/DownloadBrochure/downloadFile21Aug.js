import RNFS from "react-native-fs";
import { PermissionsAndroid, Platform } from "react-native";

// Request permission
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

// Write file to Download directory
async function writeFile() {
  const hasPermission = await requestPermission();
  if (!hasPermission) {
    console.log("Permission denied");
    return;
  }

  const downloadDir = RNFS.DownloadDirectoryPath;
  const filePath = `${downloadDir}/example.txt`;

  try {
    await RNFS.writeFile(filePath, "Hello, world!", "utf8");
    console.log("File written successfully");
  } catch (error) {
    console.error("Error writing file:", error);
  }
}

const downloadFile = () => {
  // Usage
  writeFile();
};

export { downloadFile };
