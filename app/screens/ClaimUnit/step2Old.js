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
  const [selectedUnits, setSelectedUnits] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [open, setOpen] = useState(false);
  const params = props.route.params;
  console.log("68 params: ", params);
  const [images, setImages] = useState([]);
  const [fileUri, setFileUri] = useState(null);
  const [arrayFile, setArrayFile] = useState([]);

  useEffect(() => {
    onRefresh();
    //console.log("54 colors: ", colors);
  }, []);

  const onRefresh = () => {
    //alert("run onRefresh");
    //loadData();
  };

  const loadData = async () => {};

  const handleSelectUnit = (item) => {
    // Toggle item selection
    if (selectedUnits.includes(item)) {
      //setSelectedUnits(selectedUnits.filter((item) => item !== item));
    } else {
      setSelectedUnits([...selectedUnits, item]);
    }
  };

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
          { marginTop: 10, alignSelf: "flex-start", marginLeft: 10 },
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

  const renderItem = (item) => (
    <TouchableOpacity onPress={() => handleSelectUnits(item)}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon
          name={selectedUnits.includes(item.value) ? "check-square" : "square"}
          size={20}
          color="black"
        />
        <Text style={{ marginLeft: 10 }}>{item.label}</Text>
      </View>
    </TouchableOpacity>
  );

  const onSubmit = async () => {
    try {
      setLoading(true);
      const arrayB64Image = await Promise.all(
        images.map(async (item, index) => {
          // let fileImg = ReactNativeBlobUtil.wrap(
          //   images[0].uri.replace("file://", "")
          // );
          // Read the file as Base64
          //   const base64Encoded = await RNFS.readFile(res.uri, 'base64');
          const b64 = await ReactNativeBlobUtil.fs
            .readFile(item.uri.replace("file://", ""), "base64")
            .catch((error) => {
              alert("readFile error 495: " + error);
            });
          //const dataPhoto = "data:image/png;base64," + b64;
          const dataJPEGBase64 = "data:image/jpeg;base64," + b64;

          // console.log(
          //   "431 " + index + " Base64 Encoded Data:",
          //   dataImageBase64.slice(0, 50)
          // );
          return {
            height: item.height,
            mime: item.mime,
            uri: item.uri,
            width: item.width,
            b64: dataJPEGBase64,
          };
        })
      );
      //setArrayFile([...arrayFile, ...arrayB64Image]);
      const smallarrayB64Image = arrayB64Image.map((item) => {
        return { ...item, b64: item.b64.slice(-50) };
      });
      console.log("230 smallarrayB64Image: ", smallarrayB64Image);
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
      alert("submit success");
      //for url of urls code
      // for (const [index, value] of arr.entries()) {
      //   console.log(index, value);
      // }
      // for (const [index, value] of arrayA.entries()) {
      //   try {
      //     const response = await httpClient.request({
      //       url: "/modules/cs/save",
      //       method: "POST",
      //       // data,
      //       // params,
      //     });
      //     console.log("Response Data:", data); // Detect each result's response here
      //   } catch (error) {
      //     console.error("Error fetching data from", url, error);
      //   }
      // }
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
      setLoading(false);
    } catch (e) {
      alert("264 error: " + e);
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    console.log("255 id: ", id);
    // Alert.alert(
    //   "Confirm Deletion",
    //   "Are you sure you want to delete this item?",
    //   [
    //     { text: "Cancel", style: "cancel" },
    //     {
    //       text: "Delete",
    //       onPress: () => {
    //         const newData = data.filter((item) => item.id !== id);
    //         setData(newData); // Remove item from the list
    //       },
    //     },
    //   ]
    // );
    const newData = selectedUnits.filter((item) => item._index !== id);
    setSelectedUnits(newData); // Remove item from the list
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

  const fromCamera = () => {
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
        const dataImage = {
          uri: img.path,
          width: img.width,
          height: img.height,
          mime: img.mime,
        };
        //{"height": 1280, "width": 960} image resolution emulator
        console.log("264 dataImage: ", dataImage);
        setImages([...images, dataImage]);
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
        console.log("tag", e);
        //alert("353 e: ", e);
      });
  };

  const fromGallery = (cropping, mediaType = "photo") => {
    let imageList = [];

    ImagePicker.openPicker({
      // width: 500,
      // height: 500,
      // maxHeight: 50,
      // maxWidth: 50,

      //multiple: true,
      compressImageMaxWidth: 960,
      compressImageMaxHeight: 1280,
      multiple: true,
    })
      .then((image) => {
        //alert(JSON.stringify(image));
        console.log("received images", image);

        image.map((img) => {
          imageList.push({
            uri: img.path,
            width: img.width,
            height: img.height,
            mime: img.mime,
          });
        });

        //console.log("received images", image);
        console.log("366 received images : ", imageList);
        setImages([...images, ...imageList]);
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

  const handlePhotoPick = () => {
    console.log("datImage", images);
    Alert.alert(
      "Add Photo",
      "Choose the place where you want to get photo",
      [
        { text: "Gallery", onPress: () => fromGallery() },
        { text: "Camera", onPress: () => fromCamera() },
        {
          text: "Cancel",
          onPress: () => console.log("User Cancel"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  const removePhoto = async (key) => {
    console.log("411 images: ", images);
    const dummyImages = [
      {
        height: 637,
        mime: "image/jpeg",
        uri: "/Users/haniyya/Library/Developer/CoreSimulator/Devices/7D859DB8-4FBC-464E-BF5D-F051B441FFF4/data/Containers/Data/Application/BEB42D1E-D837-4069-AC71-014CA5A1A20F/tmp/react-native-image-crop-picker/EA48A5E2-C0D6-42AB-9124-0C45F9DC2AA1.jpg",
        width: 960,
      },
    ];
    let imageArray = [...images];
    imageArray.splice(key, 1);
    setImages(imageArray);
    //    let imageArray = [...this.state.image];
    //    imageArray.splice(key, 1);
    //    this.setState({image: imageArray});
  };

  const removeArrayFile = async (key) => {
    console.log("key remove", key);
    let letArrayFile = [...arrayFile];
    letArrayFile.splice(key, 1);
    setArrayFile(letArrayFile);
    //    let imageArray = [...this.state.image];
    //    imageArray.splice(key, 1);
    //    this.setState({image: imageArray});
  };

  // Function to handle file pick
  const pickDocument = async () => {
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
            name: item.name,
            size: item.size,
            type: item.type,
            uri: item.uri,
            b64: dataPdfBase64,
          };
        })
      );
      setArrayFile([...arrayFile, ...arrayB64]);
      const smallarrayB64 = arrayB64.map((item) => {
        return { ...item, b64: item.b64.slice(0, 50) };
      });
      console.log("431 smallarrayB64: ", smallarrayB64);
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
          Make sure you send one or more documents containing proof of ownership
          of the{" "}
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
        {params.selectedUnits.map((item, index) => (
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
                marginHorizontal: 50,
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
            </View>
          </View>
        ))}
        <View style={styles.contain}>
          <View style={styles.pickerWrap}>
            <Text
              style={{
                marginVertical: 10,
                fontWeight: "bold",
                color: "black",
              }}
            >
              {images.length + arrayFile.length == 0
                ? null
                : images.length + arrayFile.length}{" "}
              Documents:
            </Text>
            {images.length === 0 ? (
              arrayFile.length > 0 ? null : (
                <View style={{ height: 100, justifyContent: "center" }}>
                  {/* <Text>image</Text> */}
                </View>
              )
            ) : (
              <View style={{ marginBottom: 10 }}>
                {images?.map((data, key) => (
                  <TouchableOpacity
                    key={key}
                    style={styles.avatarContainer}
                    onPress={() => console.log("Photo Tapped")}
                  >
                    <View>
                      <Image style={styles.avatar} source={images[key]} />

                      <Icon
                        onPress={() => removePhoto(key)}
                        name="times"
                        size={18}
                        // color="#5A110D"
                        color={colors.primary}
                        style={[styles.iconRemove, { marginLeft: 5 }]}
                        enableRTL={true}
                      />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            {arrayFile.length === 0 ? null : (
              <View style={{ marginBottom: 10 }}>
                {arrayFile?.map((data, key) => (
                  <TouchableOpacity
                    key={key}
                    style={[
                      styles.avatarContainer,
                      {
                        height: null,
                        padding: 10,
                        backgroundColor: colors.background,
                      },
                    ]}
                    //onPress={() => console.log("Photo Tapped")}
                  >
                    <View>
                      {/* <Image style={styles.avatar} source={images[key]} /> */}
                      <Text>{data.name}</Text>
                    </View>
                    <Icon
                      onPress={() => removeArrayFile(key)}
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
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "90%",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => handlePhotoPick()}
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
                  marginRight: 20,
                },
                { marginBottom: 20, alignSelf: "center" },
              ]}
            >
              <Text style={{ color: colors.text }}>Add Photo</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => pickDocument()}
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
            </TouchableOpacity> */}
          </View>
          {/* {fileUri && <Text>Picked File: {fileUri}</Text>} */}
        </View>
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
            if (images.length + arrayFile.length == 0) {
              alert("Please add document");
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
