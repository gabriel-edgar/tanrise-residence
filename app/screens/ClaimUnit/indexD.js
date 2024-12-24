import React, { useState } from "react";
import { View, Button, Text } from "react-native";
import DocumentPicker from "react-native-document-picker";
import axios from "axios";
import RNFS from "react-native-fs"; // File system module for reading files

const App = () => {
  const [fileUri, setFileUri] = useState(null);
  const [base64Data, setBase64Data] = useState(null);

  // Function to handle file pick
  const pickDocument = async () => {
    try {
      // Allow user to pick a document
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });

      setFileUri(res.uri);
      console.log("URI of picked file:", res.uri);

      // Read the file as Base64
      const base64Encoded = await RNFS.readFile(res.uri, "base64");
      setBase64Data(base64Encoded);

      console.log("Base64 Encoded Data:", base64Encoded);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User cancelled the picker");
      } else {
        console.error("Error picking document:", err);
      }
    }
  };

  // Function to upload PDF (Base64) to the server
  const uploadDocument = async () => {
    if (!base64Data) {
      console.log("No file to upload");
      return;
    }

    try {
      const response = await axios.post("http://your-server-url/upload", {
        file: base64Data,
      });

      console.log("Upload successful", response.data);
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  };

  return (
    <View>
      <Button title="Pick a PDF" onPress={pickDocument} />
      {fileUri && <Text>Picked File: {fileUri}</Text>}
      {base64Data && <Button title="Upload PDF" onPress={uploadDocument} />}
    </View>
  );
};

export default App;
