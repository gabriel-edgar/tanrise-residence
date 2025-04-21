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
  Platform,
  PermissionsAndroid,
} from "react-native";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import { Dropdown } from "react-native-element-dropdown";
import DropDownPicker from "react-native-dropdown-picker";
import httpClient, { baseURL } from "../../controllers/HttpClient";
import { useCustomTriggerOnFocus } from "../function/funcFocusEffect";
import { widthPixel } from "../Home/normalize";
import ImagePicker from "react-native-image-crop-picker";
import DocumentPicker from "react-native-document-picker";
//import RNFS from "react-native-fs"; // File system module for reading files
import ReactNativeBlobUtil from "react-native-blob-util";
import { useSelector, useDispatch } from "react-redux";
import getUser from "../../selectors/UserSelectors";
import { ListItem2 } from "../../components";
import axios from "axios";

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
        photo: { ...item.photo, uri: item.photo?.uri?.slice(-50) },
        pdf: { ...item.pdf, uri: item.pdf?.uri?.slice(-50) },
      };
    });
    console.log("231 smallarrayB64Image: ", JSON.stringify(smallarrayB64Image));
  }, [selectedUnits]);

  const onRefresh = () => {};

  const onSubmit = async () => {
    try {
      setLoading(true);
      const arrayB64Image = await Promise.all(
        selectedUnits.map(async (item, index) => {
          if (item.photo == null) {
            return item;
          }
          return { ...item, photo: { ...item.photo } };
        })
      );

      let letResponseUnits = [];
      for (const [index, itemParam] of arrayB64Image.entries()) {
        // Create FormData

        const formData = new FormData();
        formData.append("email", user.email);
        formData.append("lot_no", itemParam.lot_no);
        formData.append("entity_cd", itemParam.entity_cd);
        formData.append("project_no", itemParam.project_no);
        // formData.append('project_descs', itemParam.projectDescs,
        formData.append("platform", Platform.OS);
        formData.append("dataPhoto", {
          uri:
            itemParam?.photo == null ? itemParam.pdf.uri : itemParam.photo.uri,
          type:
            itemParam?.photo == null
              ? itemParam.pdf.type
              : itemParam.photo.mime, // 'image/jpeg', 'image/png', etc.
          name:
            itemParam?.photo == null
              ? itemParam.pdf.name
              : user.email +
                "-" +
                itemParam.lot_no +
                "." +
                itemParam.photo.mime.split("/")[1], // You can assign a custom filename
        });

        console.log("133 formData: ", JSON.stringify(formData));
        try {
          const response = await httpClient.request({
            url: "/auth/upload-lot-no",
            method: "POST",
            data: formData,
            headers: {
              "Content-Type": "multipart/form-data", // Important for sending form data
            },
            // params,
          });
          // const response = await axios.post(
          //   `${baseURL}/auth/upload-lot-no`,
          //   formData,
          //   {
          //     headers: {
          //       "Content-Type": "multipart/form-data", // Important for multipart data
          //     },
          //   }
          // );
          // const message = response.data.message;
          console.log("246 response: ", response?.data);

          letResponseUnits.push({
            lot_no: itemParam.lot_no,
            entity_cd: itemParam.entity_cd,
            project_no: itemParam.project_no,
            response: response?.data,
          });
        } catch (error) {
          console.log("error3411: ", error);
          letResponseUnits.push({
            lot_no: itemParam.lot_no,
            entity_cd: itemParam.entity_cd,
            project_no: itemParam.project_no,
            response: {
              success: false,
              message: error.response?.data?.message
                ? JSON.stringify(error?.response?.data?.message)
                : error.response?.data
                ? JSON.stringify(error.response?.data)
                : error?.response
                ? error?.response
                : error
                ? error
                : "unknown error",
              data: null,
            },
          });
          const message =
            "File too large for unit no " +
            (index + 1) +
            ", please reduce the size of the file";
          setLoading(false);
          if (error.response?.status == 413) {
            alert(message);
          } else {
            alert(JSON.stringify(error?.response?.data?.message));
          }
        }
      }
      console.log("286 letResponseUnits: ", JSON.stringify(letResponseUnits));
      setResponseUnits(letResponseUnits);

      const allSuccess = letResponseUnits.every(
        (item) => item.response.success == true
      );
      const message = "File too large" + ", please reduce the size of the file";
      if (!allSuccess) {
        throw letResponseUnits[0]?.response?.message ?? "unknown error";
      }

      alert("Submit success");
      setLoading(false);
      navigation.pop(2);
    } catch (e) {
      console.log("error3412: ", e);
      alert(JSON.stringify(e));
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
      compressImageMaxWidth: 960,
      compressImageMaxHeight: 1280,
    })
      .then((img) => {
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
      })
      .catch((e) => {
        //console.log("tag", e);
        // alert("353 e: " + e);
      });
  };

  const fromGallery = (itemParam) => {
    let imageList = [];

    ImagePicker.openPicker({
      compressImageMaxWidth: 960,
      compressImageMaxHeight: 1280,
      //multiple: true,
    })
      .then((img) => {
        console.log("received images", img);

        const imgObj = {
          uri: img.path,
          width: img.width,
          height: img.height,
          mime: img.mime,
          size: img.size,
        };

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
  };

  // Function to handle file pick
  const pickDocument = async (itemParam) => {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "Storage Permission",
          message: "We need access to your storage to pick pdf",
          //buttonNeutral: "Ask Me Later",
          //buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
        //type: [DocumentPicker.types.images],
      });
      if (res[0].size > 10000000) {
        return alert("Can not exceed more than 10 MB");
      }
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

      console.log("431 URI of picked file:", res);

      const updatedData = selectedUnits.map((item) =>
        item.lot_no === itemParam.lot_no &&
        item.entity_cd === itemParam.entity_cd &&
        item.project_no === itemParam.project_no
          ? { ...item, pdf: res[0] }
          : item
      );
      console.log("665 updatedData: ", updatedData);
      setSelectedUnits(updatedData);
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
          Make sure you send document containing proof of ownership of the{" "}
          {params.selectedUnits.length == 1
            ? "unit"
            : params.selectedUnits.length + " units"}
        </Text>
        <Text
          style={{
            marginTop: 25,

            marginBottom: 3,
            textAlign: "center",
            fontSize: 16,
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

          return (
            <View key={index}>
              <View
                style={{
                  marginHorizontal: 40,

                  fontSize: 20,

                  borderRadius: 5,
                  marginVertical: 3,

                  padding: 5,
                  borderColor: colors.primary,

                  backgroundColor: colors.background, // Card's background color

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
                      <View
                        style={{
                          height: 230,
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                      >
                        <View
                          style={{
                            // height: 230,
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
                            <Text style={{ color: colors.text }}>
                              Add Photo
                            </Text>
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

                        <Text
                          style={{ color: colors.text, textAlign: "center" }}
                        >
                          (max file size 10 MB)
                        </Text>
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
                          marginBottom: 20,
                          borderWidth: 0,
                        },
                      ]}
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
                              position: "absolute",
                              right: -5,
                              top: -10,

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

          borderColor: colors.primary,
          backgroundColor: colors.background, // Card's background color

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
          }}
          disable={loading}
          loading={loading}
          onPress={() => {
            const isNullExist = selectedUnits.some(
              (item) => item.photo == null && item.pdf == null
            );
            if (isNullExist) {
              selectedUnits.length > 1
                ? alert("Please add document for all unit")
                : alert("Please add document");
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
