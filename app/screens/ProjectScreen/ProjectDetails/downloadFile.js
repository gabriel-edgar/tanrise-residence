import { Alert } from "react-native";
import RNFS from "react-native-fs";

const downloadFile = async (url, filename) => {
  url = "https://example.com/file.pdf";
  //const fileName = "file.pdf";
  console.log("7 downloadFile: ", filename);
  const downloadDest = `${RNFS.DocumentDirectoryPath}/${filename}`;

  try {
    const result = await RNFS.downloadFile({
      fromUrl: url,
      toFile: downloadDest,
    }).promise;

    if (result.statusCode === 200) {
      alert("Download successful \n" + `File downloaded to ${downloadDest}`);
    } else {
      alert("Download failed \n" + `Status code: ${result.statusCode}`);
    }
  } catch (error) {
    alert("Download error \n", error.message);
  }
};

export { downloadFile };
