import {
  Button,
  Header,
  Icon,
  SafeAreaView,
  TextInput,
  Text,
} from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import { Dropdown } from "react-native-element-dropdown";
import DropDownPicker from "react-native-dropdown-picker";
import httpClient from "../../controllers/HttpClient";
import { useCustomTriggerOnFocus } from "../function/funcFocusEffect";
import { widthPixel } from "../Home/normalize";
import ImagePicker from "react-native-image-crop-picker";
import DocumentPicker from "react-native-document-picker";
//import RNFS from "react-native-fs"; // File system module for reading files
import ReactNativeBlobUtil from "react-native-blob-util";
import { useSelector, useDispatch } from "react-redux";
import getUser from "../../selectors/UserSelectors";
import { ListItem2 } from "../../components";

// individual, child, pembantu

const successInit = {
  name: true,
  email: true,
  address: true,
};

const ClaimUnit2 = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(successInit);
  const [projectList, setProjectList] = useState([]);
  const [unitList, setUnitList] = useState([]);
  const [project, setProject] = useState(null);
  const [unit, setUnit] = useState("");
  const params = props.route.params;
  const [selectedUnits, setSelectedUnits] = useState(
    params.selectedUnits.map((item) => {
      return {
        ...item,
        photo: null,
        pdf: null,
        statusUpload: false,
        //response: null,
      };
    })
  );
  const [responseUnits, setResponseUnits] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [open, setOpen] = useState(false);
  console.log("68 params: ", params);
  const [images, setImages] = useState([]);
  const [fileUri, setFileUri] = useState(null);
  const [arrayFile, setArrayFile] = useState([]);
  const user = useSelector((state) => getUser(state));

  useEffect(() => {
    onRefresh();
    //console.log("54 colors: ", colors);
  }, []);

  useEffect(() => {
    const smallarrayB64Image = selectedUnits.map((item) => {
      return {
        ...item,
        photo: { ...item.photo, b64: item.photo?.b64?.slice(-50) },
        pdf: { ...item.pdf, b64: item.pdf?.b64?.slice(-50) },
      };
    });
    console.log("231 smallarrayB64Image: ", JSON.stringify(smallarrayB64Image));
  }, [selectedUnits]);

  const onRefresh = () => {
    //alert("run onRefresh");
    //loadData();
  };

  const loadData = async () => {};

  const renderLabel1 = (text) => {
    // if (project || isFocus) {
    //   return (
    //     <Text style={[styles.label, isFocus && { color: "black" }]}>
    //       Choose project
    //     </Text>
    //   );
    // }
    // return null;
    return (
      <View
        style={[
          styles.label,
          {
            //backgroundColor: "lightblue",
            //paddingHorizontal: 20,
            //paddingVertical: 10,
            backgroundColor: colors.background,
            borderRadius: 15,
          },
        ]}
      >
        <Text
          style={[
            {
              color: colors.text,
              //backgroundColor: colors.background,
              borderRadius: 50,
            },
          ]}
        >
          {text}
        </Text>
      </View>
    );
  };

  const renderLabel2 = (text, customStyle) => {
    return (
      <Text
        style={[
          { marginTop: 10, alignSelf: "left", marginLeft: 10 },
          customStyle,
        ]}
      >
        {text}
      </Text>
    );
  };

  const validateEmail = (input) => {
    // Regular expression for basic email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    //setEmail(input);
    //emailRegex.test(input) ? null : alert("Please enter a valid email address");
    if (emailRegex.test(input)) {
      return true;
    } else {
      alert("Please enter a valid email address");
      return false;
    }
  };

  const onSubmit = async () => {
    //alert("onSubmit");
    //return;
    try {
      setLoading(true);
      const arrayB64Image = await Promise.all(
        selectedUnits.map(async (item, index) => {
          if (item.photo == null) {
            return item;
          }
          // let fileImg = ReactNativeBlobUtil.wrap(
          //   images[0].uri.replace("file://", "")
          // );
          // Read the file as Base64
          //   const base64Encoded = await RNFS.readFile(res.uri, 'base64');
          const b64 = await ReactNativeBlobUtil.fs
            .readFile(item.photo.uri.replace("file://", ""), "base64")
            .catch((error) => {
              alert([index + 1] + "readPhoto error 495: " + error);
            });
          //const dataPhoto = "data:image/png;base64," + b64;
          const dataJPEGBase64 = "data:image/png;base64," + b64;

          // console.log(
          //   "431 " + index + " Base64 Encoded Data:",
          //   dataImageBase64.slice(0, 50)
          // );
          // return {
          //   height: item.height,
          //   mime: item.mime,
          //   uri: item.uri,
          //   width: item.width,
          //   b64: dataJPEGBase64,
          // };
          return { ...item, photo: { ...item.photo, b64: dataJPEGBase64 } };

          // const updatedData = selectedUnits.map((item) =>
          //   item.lot_no === itemParam.lot_no &&
          //   item.entity_cd === itemParam.entity_cd &&
          //   item.project_no === itemParam.project_no
          //     ? { ...item, photo: null }
          //     : item
          // );
          // setSelectedUnits(updatedData);
        })
      );
      //setArrayFile([...arrayFile, ...arrayB64Image]);
      // const smallarrayB64Image = arrayB64Image.map((item) => {
      //   return {
      //     ...item,
      //     photo: { ...item.photo, b64: item.photo?.b64.slice(-50) },
      //   };
      // });
      //console.log("230 smallarrayB64Image: ", smallarrayB64Image);
      // if (!validateEmail(email)) {
      //   return;
      // }
      // setLoading(true);
      // const dataPost = { name, email, address, project, unit };
      // setTimeout(() => {
      //   setLoading(false);
      //   //navigation.navigate("SignIn");
      //   alert(JSON.stringify(dataPost));
      //   alert(
      //     "You will receive an email if your account request is successful."
      //   );
      //   navigation.goBack();
      // }, 500);

      //for url of urls code
      // for (const [index, value] of arr.entries()) {
      //   console.log(index, value);
      // }
      let letResponseUnits = [];
      for (const [index, itemParam] of arrayB64Image.entries()) {
        const dataPost = {
          email: user.email,
          lot_no: itemParam.lot_no,
          entity_cd: itemParam.entity_cd,
          project_no: itemParam.project_no,
          project_descs: itemParam.projectDescs,
          dataPhoto:
            itemParam?.photo == null ? itemParam.pdf.b64 : itemParam.photo.b64,
          // "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII",
        };
        const dataPost2 = {
          email: user.email,
          lot_no: itemParam.lot_no,
          entity_cd: itemParam.entity_cd,
          project_no: itemParam.project_no,
          project_descs: itemParam.projectDescs,
          dataPhoto:
            itemParam?.photo == null
              ? itemParam.pdf.b64.slice(0, 50)
              : itemParam.photo.b64.slice(0, 50),
          // "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII",
        };
        console.log("247 dataPost2: ", dataPost2);

        //console.log("216 dataPost: ", dataPost);
        //setLoading(false);
        //return;
        try {
          const response = await httpClient.request({
            url: "/auth/upload-lot-no",
            method: "POST",
            data: dataPost,
            // params,
          });
          // const message = response.data.message;
          console.log("246 response: ", response.data);
          // const updatedData = selectedUnits.map((item) =>
          //   item.lot_no === itemParam.lot_no &&
          //   item.entity_cd === itemParam.entity_cd &&
          //   item.project_no === itemParam.project_no
          //     ? { ...item, response: response.data }
          //     : item
          // );
          letResponseUnits.push({
            lot_no: itemParam.lot_no,
            entity_cd: itemParam.entity_cd,
            project_no: itemParam.project_no,
            response: response.data,
          });
          //setSelectedUnits(updatedData);
        } catch (error) {
          alert(
            ["error unit no " + (index + 1) + ": "] +
              error.response.data.message
          );
          // const updatedData = selectedUnits.map((item) =>
          //   item.lot_no === itemParam.lot_no &&
          //   item.entity_cd === itemParam.entity_cd &&
          //   item.project_no === itemParam.project_no
          //     ? {
          //         ...item,
          //         response: { success: false, message: error, data: null },
          //       }
          //     : item
          // );
          letResponseUnits.push({
            lot_no: itemParam.lot_no,
            entity_cd: itemParam.entity_cd,
            project_no: itemParam.project_no,
            response: {
              success: false,
              message: JSON.stringify(error.response.data.message),
              data: null,
            },
          });
          //setSelectedUnits(updatedData);

          //console.error("Error fetching data from", url, error);
        }
      }
      console.log("286 letResponseUnits: ", JSON.stringify(letResponseUnits));
      setResponseUnits(letResponseUnits);
      // if success then handle delete photo/file function
      //navigation.pop(2); // next put after httpclient
      // await httpClient
      //   .request({
      //     url: "/modules/cs/save",
      //     method: "POST",
      //     data,
      //   })
      //   .then((res) => {
      //     alert(
      //       "You will receive an email if your account request is successful."
      //     );
      //     navigation.navigate.goBack();
      //   })
      //   .catch((err) => {
      //     alert(JSON.stringify(err));
      //   });

      // Check if every item.message is 'success message'
      const allSuccess = letResponseUnits.every(
        (item) =>
          item.response.message === "Your photo has been uploaded successfully"
      );
      if (!allSuccess) {
        throw "Some file not uploaded";
      }
      //console.log(allSuccess); // true (since every item.message is 'success message')

      alert("Submit success");
      setLoading(false);
      navigation.pop(2);
    } catch (e) {
      alert("264 error: " + e);
      setLoading(false);
    }
  };

  // Render each item in the FlatList
  const renderItemList = ({ item }) => (
    <View
      style={{
        flex: 1,
        padding: 10,
        margin: 5,
        backgroundColor: "#f0f0f0",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 18,
          marginBottom: 10,
        }}
      >
        {item.label}
      </Text>
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: "#ff6347",
          borderRadius: 5,
        }}
        onPress={() => handleDelete(item._index)}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Remove
        </Text>
      </TouchableOpacity>
    </View>
  );

  const fromCamera = (itemParam) => {
    ImagePicker.openCamera({
      // width: 500,
      // height: 500,
      // maxHeight: 50,
      // maxWidth: 50,
      //cropping: false,
      //cropping: true,
      compressImageMaxWidth: 960,
      compressImageMaxHeight: 1280,
    })
      .then((img) => {
        //alert(JSON.stringify(image));
        //console.log("received image", images);
        // const dataImage = {
        //   uri: img.path,
        //   width: img.width,
        //   height: img.height,
        //   mime: img.mime,
        // };
        //{"height": 1280, "width": 960} image resolution emulator
        //console.log("264 dataImage: ", dataImage);

        const imgObj = {
          uri: img.path,
          width: img.width,
          height: img.height,
          mime: img.mime,
          size: img.size,
        };

        const updatedData = selectedUnits.map((item) =>
          item.lot_no === itemParam.lot_no &&
          item.entity_cd === itemParam.entity_cd &&
          item.project_no === itemParam.project_no
            ? { ...item, photo: imgObj }
            : item
        );
        setSelectedUnits(updatedData);

        //setImages([...images, dataImage]);
        // setImages(prevState => ({
        //   image: [
        //     ...prevState.image,
        //     {
        //       uri: image.path,
        //       width: image.width,
        //       height: image.height,
        //       mime: image.mime,
        //     },
        //   ],
        // }));
      })
      .catch((e) => {
        //console.log("tag", e);
        alert("353 e: ", e);
      });
  };

  const fromGallery = (itemParam) => {
    let imageList = [];

    ImagePicker.openPicker({
      // width: 500,
      // height: 500,
      // maxHeight: 50,
      // maxWidth: 50,

      //multiple: true,
      compressImageMaxWidth: 960,
      compressImageMaxHeight: 1280,
      //multiple: true,
    })
      .then((img) => {
        //alert(JSON.stringify(image));
        console.log("received images", img);

        // image.map((img) => {
        const imgObj = {
          uri: img.path,
          width: img.width,
          height: img.height,
          mime: img.mime,
          size: img.size,
        };
        // });

        //console.log("received images", image);
        //console.log("366 received images : ", imageList);
        //setImages([...images, imageList]);

        // Use map to create a new array with the updated photo for lot_no 2
        const updatedData = selectedUnits.map((item) =>
          item.lot_no === itemParam.lot_no &&
          item.entity_cd === itemParam.entity_cd &&
          item.project_no === itemParam.project_no
            ? { ...item, photo: imgObj }
            : item
        );
        setSelectedUnits(updatedData);

        console.log("354 updatedData: ", updatedData);
        // for (var i = 0; i < image.length; i++) {
        //   setImages({
        //     images: [
        //       {
        //         uri: image[i].path,
        //         width: image[i].width,
        //         height: image[i].height,
        //         mime: image[i].mime,
        //       },
        //     ],
        //   });
        // }
      })
      .catch((e) => console.log("tag", e));
  };

  const handlePhotoPick = (item) => {
    console.log("datImage", images);
    Alert.alert(
      "Add Photo",
      "Choose the place where you want to get photo",
      [
        { text: "Gallery", onPress: () => fromGallery(item) },
        { text: "Camera", onPress: () => fromCamera(item) },
        {
          text: "Cancel",
          onPress: () => console.log("User Cancel"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  const removePhoto = async (itemParam) => {
    const updatedData = selectedUnits.map((item) =>
      item.lot_no === itemParam.lot_no &&
      item.entity_cd === itemParam.entity_cd &&
      item.project_no === itemParam.project_no
        ? { ...item, photo: null }
        : item
    );
    setSelectedUnits(updatedData);
    // console.log("411 images: ", images);
    // const dummyImages = [
    //   {
    //     height: 637,
    //     mime: "image/jpeg",
    //     uri: "/Users/haniyya/Library/Developer/CoreSimulator/Devices/7D859DB8-4FBC-464E-BF5D-F051B441FFF4/data/Containers/Data/Application/BEB42D1E-D837-4069-AC71-014CA5A1A20F/tmp/react-native-image-crop-picker/EA48A5E2-C0D6-42AB-9124-0C45F9DC2AA1.jpg",
    //     width: 960,
    //   },
    // ];
    // let imageArray = [...images];
    // imageArray.splice(key, 1);
    // setImages(imageArray);
    //    let imageArray = [...this.state.image];
    //    imageArray.splice(key, 1);
    //    this.setState({image: imageArray});
  };

  const removeArrayFile = async (itemParam) => {
    const updatedData = selectedUnits.map((item) =>
      item.lot_no === itemParam.lot_no &&
      item.entity_cd === itemParam.entity_cd &&
      item.project_no === itemParam.project_no
        ? { ...item, pdf: null }
        : item
    );
    setSelectedUnits(updatedData);
    // console.log("key remove", key);
    // let letArrayFile = [...arrayFile];
    // letArrayFile.splice(key, 1);
    // setArrayFile(letArrayFile);
    //    let imageArray = [...this.state.image];
    //    imageArray.splice(key, 1);
    //    this.setState({image: imageArray});
  };

  // Function to handle file pick
  const pickDocument = async (itemParam) => {
    try {
      // Allow user to pick a document
      //DocumentPicker.pick
      // console.log(
      //   "434 DocumentPicker: ",
      //   JSON.stringify(typeof DocumentPicker)
      // );
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
        //type: [DocumentPicker.types.images],
      });
      const dummyRes = [
        {
          fileCopyUri: null,
          name: "1001_1001001_G2rand_Sunrise_Gresik___Private_Cluster,_Rumah_Modern_Industrial_compressed.pdf",
          size: 231510,
          type: "application/pdf",
          uri: "file:///Users/haniyya/Library/Developer/CoreSimulator/Devices/7D859DB8-4FBC-464E-BF5D-F051B441FFF4/data/Containers/Data/Application/BEB42D1E-D837-4069-AC71-014CA5A1A20F/tmp/com.ifcasoftware.tanriseresidence-Inbox/1001_1001001_G2rand_Sunrise_Gresik___Private_Cluster,_Rumah_Modern_Industrial_compressed.pdf",
        },
      ];
      //return;

      //setFileUri(res.uri);
      console.log("431 URI of picked file:", res);

      const arrayB64 = await Promise.all(
        res.map(async (item, index) => {
          // let fileImg = ReactNativeBlobUtil.wrap(
          //   images[0].uri.replace("file://", "")
          // );
          // Read the file as Base64
          //   const base64Encoded = await RNFS.readFile(res.uri, 'base64');
          const b64 = await ReactNativeBlobUtil.fs.readFile(
            item.uri.replace("file://", ""),
            "base64"
          );
          //const dataPhoto = "data:image/png;base64," + b64;
          const dataPdfBase64 = "data:application/pdf;base64," + b64;

          console.log(
            "431 " + index + " Base64 Encoded Data:",
            dataPdfBase64.slice(0, 50)
          );
          return {
            // lot_no: itemParam.lot_no,
            // project_no: itemParam.project_no,
            // entity_cd: itemParam.entity_cd,
            pdf: {
              name: item.name,
              size: item.size,
              type: item.type,
              uri: item.uri,
              b64: dataPdfBase64,
            },
          };
        })
      );
      //setArrayFile([...arrayFile, ...arrayB64]);
      const updatedData = selectedUnits.map((item) =>
        item.lot_no === itemParam.lot_no &&
        item.entity_cd === itemParam.entity_cd &&
        item.project_no === itemParam.project_no
          ? { ...item, pdf: arrayB64[0].pdf }
          : item
      );
      setSelectedUnits(updatedData);

      const smallarrayB64 = arrayB64.map((item) => {
        return {
          ...item,
          pdf: { ...item.pdf, b64: item.pdf.b64.slice(0, 50) },
        };
      });
      //console.log("587 smallarrayB64: ", smallarrayB64);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("431 User cancelled the picker");
      } else {
        console.error("431 Error picking document:", err);
        alert("431 Error picking document:" + err);
      }
    }
  };

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={["right", "top", "left"]}
    >
      <Header
        title={t("Claim Unit")}
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
      <ScrollView>
        <Text
          style={{
            //marginTop: 65,
            textAlign: "center",
            fontSize: 16,
            paddingHorizontal: 40,
          }}
        >
          Step 2 of 2
        </Text>
        <Text
          style={{
            marginTop: 10,
            marginHorizontal: 50,
            marginBottom: 3,
            textAlign: "justify",
            fontSize: 16,
            //paddingHorizontal: 40,
          }}
        >
          {/* You have selected
          {params.selectedUnits.length == 1
            ? " 1 unit"
            : " " + params.selectedUnits.length + " units"}
          ,  */}
          Make sure you send document containing proof of ownership of the{" "}
          {params.selectedUnits.length == 1
            ? "unit"
            : params.selectedUnits.length + " units"}
        </Text>
        <Text
          style={{
            marginTop: 25,
            //marginLeft: 100,
            marginBottom: 3,
            textAlign: "center",
            fontSize: 16,
            //paddingHorizontal: 40,
          }}
        >
          {params.selectedUnits.length > 1
            ? "Selected Units:"
            : "Selected Unit:"}
        </Text>
        {selectedUnits.map((item, index) => {
          const itemFound = responseUnits.find(
            (itm) =>
              itm.lot_no === item.lot_no &&
              itm.entity_cd === item.entity_cd &&
              itm.project_no === item.project_no
          );
          //console.log("654 itemFound: ", itemFound);
          return (
            <View
              key={index}
              // style={{
              //   flex: 1, // This makes the container take up the full screen
              //   justifyContent: "center", // Centers children vertically
              //   alignItems: "center", // Centers children horizontally
              // }}
            >
              <View
                style={{
                  marginHorizontal: 40,
                  //width: 250, // Fixed width
                  //textAlign: "center",
                  fontSize: 20,
                  //paddingHorizontal: 40,

                  borderRadius: 5,
                  marginVertical: 3,
                  //borderWidth: 1,
                  padding: 5,
                  borderColor: colors.primary,
                  //width: "50%",
                  backgroundColor: colors.background, // Card's background color
                  //borderRadius: 10, // Rounded corners
                  //margin: 10, // Margin around the card
                  //padding: 15, // Padding inside the card
                  shadowColor: "#000", // Shadow color for iOS and Android
                  shadowOffset: { width: 0, height: 2 }, // Shadow offset
                  shadowOpacity: 0.1, // Shadow opacity (iOS)
                  shadowRadius: 5, // Shadow blur (iOS)
                  elevation: 3,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginRight: 10,
                  }}
                >
                  <Text>
                    {/* {[index + 1] + ". " + item.label} */}
                    {index + 1}.{" "}
                    {
                      item.lot_no + "\n    " + item.projectDescs
                      // "\n    entity/project code: (" +
                      // item.entity_cd +
                      // "/" +
                      // item.project_no +
                      // ") "
                    }
                  </Text>
                  {itemFound ? (
                    itemFound?.response.success == true ? (
                      <Text
                        style={{
                          color: "green",
                          borderColor: "green",
                          borderRadius: 3,
                          borderWidth: 1,
                          padding: 3,
                        }}
                      >
                        {" "}
                        Success
                      </Text>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          alert(itemFound.response?.message);
                        }}
                      >
                        <Text
                          style={{
                            color: "red",
                            borderColor: "red",
                            borderRadius: 3,
                            borderWidth: 1,
                            padding: 3,
                          }}
                        >
                          {" "}
                          Failed
                        </Text>
                      </TouchableOpacity>
                    )
                  ) : null}
                </View>
                {/* <Text style={{ fontSize: 13 }}>
                {
                  "    " + item.projectDescs
                  // "\n    entity/project code: (" +
                  // item.entity_cd +
                  // "/" +
                  // item.project_no +
                  // ") "
                }
              </Text> */}
                <View style={{ alignSelf: "center" }}>
                  {item?.photo == null && item?.pdf == null ? (
                    arrayFile.length > 0 ? null : (
                      // <View style={{ height: 100, justifyContent: "center" }}>
                      //   {/* <Text>image</Text> */}
                      // </View>
                      <View
                        style={{
                          height: 230,
                          justifyContent: "center",
                          flexDirection: "row",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => handlePhotoPick(item)}
                          style={[
                            {
                              width: "40%",
                              marginVertical: 10,
                              padding: 10,
                              borderColor: "#9B9B9B",
                              borderWidth: 1,
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: 5,
                              marginRight: 20,
                            },
                            { marginBottom: 20, alignSelf: "center" },
                          ]}
                        >
                          <Text style={{ color: colors.text }}>Add Photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => pickDocument(item)}
                          style={[
                            {
                              width: "40%",
                              marginVertical: 10,
                              paddingVertical: 10,
                              borderColor: "#9B9B9B",
                              borderWidth: 1,
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: 5,
                              height: null,
                            },
                            { marginBottom: 20, alignSelf: "center" },
                          ]}
                        >
                          <Text style={{ color: colors.text }}>Add PDF</Text>
                        </TouchableOpacity>
                      </View>
                    )
                  ) : item?.photo != null ? (
                    <View style={{ marginBottom: 10 }}>
                      <TouchableOpacity
                        activeOpacity={1}
                        style={styles.avatarContainer}
                        onPress={() =>
                          navigation.navigate("PreviewImageHome", {
                            images: item.photo.uri, // uri
                          })
                        }
                      >
                        <View>
                          <Image style={styles.avatar} source={item.photo} />

                          <Icon
                            onPress={() => removePhoto(item)}
                            name="times"
                            size={18}
                            // color="#5A110D"
                            color={colors.primary}
                            style={[styles.iconRemove, { marginLeft: 5 }]}
                            enableRTL={true}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : item?.pdf != null ? (
                    <TouchableOpacity
                      //key={key}
                      activeOpacity={1}
                      style={[
                        styles.avatarContainer,
                        {
                          //height: null,
                          //padding: 10,
                          //backgroundColor: colors.background,
                          marginBottom: 20,
                          borderWidth: 0,
                        },
                      ]}
                      //onPress={() => console.log("Photo Tapped")}
                    >
                      <View
                        style={[
                          styles.avatarContainer,
                          {
                            height: null,
                            padding: 10,
                            backgroundColor: colors.background,
                            marginBottom: 20,
                          },
                        ]}
                      >
                        {/* <Image style={styles.avatar} source={images[key]} /> */}
                        <Text>{item.pdf?.name}</Text>
                        <Icon
                          onPress={() => removeArrayFile(item)}
                          name="times"
                          size={18}
                          // color="#5A110D"
                          color={colors.primary}
                          style={[
                            styles.iconRemove,
                            {
                              //marginLeft: 5,
                              position: "absolute",
                              right: -5,
                              top: -10,
                              //backgroundColor: "red",
                              borderRadius: 100,
                            },
                          ]}
                          enableRTL={true}
                        />
                      </View>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View
        style={{
          width: "100%",
          //justifyContent: "center"
          //backgroundColor: "lightgray",
          //borderTopLeftRadius: 30,
          //borderTopRightRadius: 30,
          //borderWidth: 3,
          //backgroundColor: "black",
          borderColor: colors.primary,
          backgroundColor: colors.background, // Card's background color
          //borderRadius: 10, // Rounded corners
          //margin: 10, // Margin around the card
          //padding: 15, // Padding inside the card
          shadowColor: "#000", // Shadow color for iOS and Android
          shadowOffset: { width: 0, height: 2 }, // Shadow offset
          shadowOpacity: 0.2, // Shadow opacity (iOS)
          shadowRadius: 5, // Shadow blur (iOS)
          elevation: 3,
        }}
      >
        <Button
          //full
          style={{
            margin: 30,
            marginTop: 20,
            //marginLeft: 20,
          }}
          disable={loading}
          loading={loading}
          //onPress={() => onSubmit()}
          onPress={() => {
            const isNullExist = selectedUnits.some(
              (item) => item.photo == null && item.pdf == null
            );
            if (isNullExist) {
              selectedUnits.length > 1
                ? alert("Please add document for all unit")
                : alert("Please add document");
              //return;
              //     }
              // if (images.length + arrayFile.length == 0) {
              //   alert("Please add document");
            } else {
              Alert.alert("Confirm", "Are you sure you want to submit?", [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                { text: "Submit", onPress: () => onSubmit() },
              ]);
            }
          }}
        >
          {t("Submit")}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ClaimUnit2;
