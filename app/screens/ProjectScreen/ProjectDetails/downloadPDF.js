import axios from "axios";
import RNFS from "react-native-fs";
import { Alert, Platform } from "react-native";

const downloadPDF = async (url) => {
  try {
    // Define the path where the file will be saved
    const downloadDest = `${RNFS.DocumentDirectoryPath}/file.pdf`;

    // Fetch the PDF from the URL
    const response = await axios({
      url: url,
      method: "GET",
      responseType: "blob", // For binary data
    });

    // Convert the response to a base64 string
    const base64Data = await response.data.text();
    const fileData = `data:application/pdf;base64,${base64Data}`;

    // Write the base64 data to the file system
    await RNFS.writeFile(downloadDest, base64Data, "base64");

    Alert.alert("Download Complete", `File saved to ${downloadDest}`);

    // Optional: Open the PDF using a library or built-in viewer
    // For example, using react-native-pdf or react-native-file-viewer
    // ...
  } catch (error) {
    console.error("Error downloading PDF:", error);
    Alert.alert("Error", "Failed to download PDF");
  }
};

// Example usage
//downloadPDF("https://example.com/path/to/pdf");

// choose the file location

import React from "react";
import { Button, Alert, Platform } from "react-native";
import RNFS from "react-native-fs";
import DocumentPicker from "react-native-document-picker";
import axios from "axios";

const downloadAndSavePDF = async (url) => {
  try {
    // Open file picker to choose location
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    });

    // Define the path where the file will be saved
    const downloadDest = `${res.uri}/file.pdf`;

    // Fetch the PDF from the URL
    const response = await axios({
      url: url,
      method: "GET",
      responseType: "arraybuffer", // For binary data
    });

    // Convert response data to base64
    const base64Data = Buffer.from(response.data, "binary").toString("base64");

    // Write the base64 data to the file system
    await RNFS.writeFile(downloadDest, base64Data, "base64");

    Alert.alert("Download Complete", `File saved to ${downloadDest}`);
  } catch (error) {
    console.error("Error downloading or saving PDF:", error);
    Alert.alert("Error", "Failed to download or save PDF");
  }
};

// Component to trigger the download
const App = () => {
  return (
    <Button
      title="Download PDF"
      onPress={() => downloadAndSavePDF("https://example.com/path/to/pdf")}
    />
  );
};

export default App;
