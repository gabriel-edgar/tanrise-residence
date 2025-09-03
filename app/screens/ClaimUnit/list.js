import {
  Button,
  Header,
  Icon,
  SafeAreaView,
  TextInput,
  Text,
} from "@/components";
import { BaseColor, BaseStyle, useTheme } from "@/config";
import React, { useState, useEffect, useCallback } from "react";
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
import httpClient from "../../controllers/HttpClient";
import { useCustomTriggerOnFocus } from "../function/funcFocusEffect";
import ImagePicker from "react-native-image-crop-picker";
import DocumentPicker from '@react-native-documents/picker';
import ReactNativeBlobUtil from "react-native-blob-util";
import { useSelector, useDispatch } from "react-redux";
import getUser from "../../selectors/UserSelectors";

// R = Register; process
// A = Approved; A
// C = Cancel; R

const ClaimUnitList = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [selectedUnits, setSelectedUnits] = useState([]);
  const [images, setImages] = useState([]);
  const [arrayFile, setArrayFile] = useState([]);
  const user = useSelector((state) => getUser(state));
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    onRefresh();
  }, []);

  useEffect(() => {
    const smallarrayB64Image = selectedUnits.map((item) => {
      return {
        ...item,
        photo: { ...item.photo, b64: item.photo?.b64?.slice(0, 50) },
        pdf: { ...item.pdf, b64: item.pdf?.b64?.slice(0, 50) },
      };
    });
    console.log("231 smallarrayB64Image: ", JSON.stringify(smallarrayB64Image));
  }, [selectedUnits]);

  const onRefresh = () => {
    loadData();
  };

  // useFocusEffect(
  //   useCallback(() => {
  //     onRefresh();
  //   }, [])
  //   //onRefresh
  // );

  useCustomTriggerOnFocus(onRefresh, 7500);

  const loadData = async () => {
    const dataParams = {
      email: user.email,
    };
    await httpClient
      .request({
        url: "auth/get-approval",
        method: "GET",
        params: dataParams,
        // params,
      })
      .then((res) => {
        const data = res.data.data;
        const updatedData = data.map((item) => {
          const isPNG =
            item.link_url?.slice(-3) == "png" ||
            item.link_url?.slice(-4) == "jpeg" ||
            item.link_url?.slice(-3) == "jpg" ||
            item.link_url?.slice(-3) == "gif"
              ? true
              : false;

          return {
            ...item, // Spread the original properties of the item
            resubmitButton: false,
            pdf: isPNG
              ? null
              : {
                  name: item.audit_date.slice(0, 16) + ".pdf",
                  uri: item.link_url,
                },
            photo: isPNG ? { uri: item.link_url } : null,
          };
        });
        setSelectedUnits(updatedData);
      })
      .catch((e) => {
        //alert(e);
      });
  };

  const removePhoto = async (itemParam) => {
    const updatedData = selectedUnits.map((item) =>
      item.lot_no === itemParam.lot_no &&
      item.entity_cd === itemParam.entity_cd &&
      item.project_no === itemParam.project_no
        ? { ...item, photo: null, resubmitButton: true }
        : item
    );
    setSelectedUnits(updatedData);
  };

  const removeArrayFile = async (itemParam) => {
    const updatedData = selectedUnits.map((item) =>
      item.lot_no === itemParam.lot_no &&
      item.entity_cd === itemParam.entity_cd &&
      item.project_no === itemParam.project_no
        ? { ...item, pdf: null, resubmitButton: true }
        : item
    );
    setSelectedUnits(updatedData);
  };

  // Categories for dropdown filter
  const categories = [
    { label: "All", value: "All" },
    { label: "Approved", value: "A" },
    { label: "Rejected", value: "C" },
    { label: "Process", value: "R" },
  ];

  //Filter the list based on the search query
  const filterTextInput = selectedUnits.filter(
    (item, index) =>
      item.lot_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.audit_date
        .slice(0, 16)
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const filteredSelectedUnits = selectedItem
    ? filterTextInput.filter(
        (item) => item?.status === selectedItem || selectedItem === "All"
      )
    : filterTextInput;

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={["top", "right", "bottom", "left"]}
    >
      <Header
        title={t("Claim Unit History")}
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
            marginTop: 15,
            marginBottom: 3,
            textAlign: "center",
            fontSize: 16,
          }}
        >
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <TextInput
            style={{
              height: 40,
              borderColor: "#ddd",
              borderWidth: 1,
              borderRadius: 8,
              paddingLeft: 10,
              marginBottom: 20,
              width: "40%",
            }}
            placeholder="Search unit..."
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
          <Dropdown
            data={categories}
            labelField="label"
            valueField="value"
            placeholder="Filter by status"
            placeholderStyle={{ color: colors.text }}
            selectedTextStyle={{ color: colors.text }}
            value={selectedItem}
            onChange={(item) => setSelectedItem(item.value)}
            style={{
              height: 40,
              borderColor: "#ddd",
              borderWidth: 1,
              borderRadius: 8,
              marginBottom: 20,
              paddingHorizontal: 10,
              width: "40%",
            }}
          />
        </View>
        {filteredSelectedUnits.length != 0 ? (
          filteredSelectedUnits.map((item, index) => {
            return (
              <View
                key={index}
              >
                <View
                  style={{
                    marginHorizontal: 40,
                    marginBottom: 20,
                    fontSize: 20,
                    borderRadius: 10,
                    marginVertical: 3,
                    padding: 5,
                    borderColor: colors.primary,
                    backgroundColor: colors.background, // Card's background color
                    shadowColor: "#000", // Shadow color for iOS and Android
                    shadowOffset: { width: 0, height: 2 }, // Shadow offset
                    shadowOpacity: 0.2, // Shadow opacity (iOS)
                    shadowRadius: 5, // Shadow blur (iOS)
                    elevation: 3,
                    borderWidth: colors.background == "#010101" ? 1 : 0,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginRight: 10,
                    }}
                  >
                    <View>
                      <Text
                        style={{ borderWidth: 0, width: 200, fontWeight: 600 }}
                      >
                        {/* {[index + 1] + ". " + item.label} */}
                        {/*index + 1.*/}
                        {"   "}
                        {
                          item.lot_no +
                            "\n   " +
                            item.audit_date.slice(0, 16) +
                            "\n   Claim ID: " +
                            item.registerdtlID
                          //+ "\n    " //+
                          //"Submit date: \n    " +

                          //item?.date
                          // "\n    entity/project code: (" +
                          // item.entity_cd +
                          // "/" +
                          // item.project_no +
                          // ") "
                        }
                      </Text>
                      {item ? (
                        item?.status != "C" ? null : (
                          <TouchableOpacity
                            onPress={() => {
                            }}
                            style={{
                              borderRadius: 10,
                              padding: 7,
                              marginLeft: 10,
                              width: 200,
                              marginTop: 10,
                              backgroundColor: colors.background, // Card's background color
                              shadowColor: "#000", // Shadow color for iOS and Android
                              shadowOffset: { width: 0, height: 2 }, // Shadow offset
                              shadowOpacity: 0.2, // Shadow opacity (iOS)
                              shadowRadius: 5, // Shadow blur (iOS)
                              elevation: 3,
                            }}
                          >
                            <Text style={{ fontWeight: 600 }}>
                              Rejected reason:
                            </Text>
                            <Text>{item.reason}</Text>
                          </TouchableOpacity>
                        )
                      ) : null}
                    </View>
                    {item ? (
                      item?.status != "C" ? (
                        item?.status == "A" ? (
                          <Text
                            style={{
                              color: "green",
                              borderColor: "green",
                              borderRadius: 5,
                              borderWidth: 1,
                              padding: 3,
                              marginTop: 10,
                              marginBottom: 15,
                            }}
                          >
                            Approved
                          </Text>
                        ) : (
                          <Text
                            style={{
                              color: colors.text,
                              borderColor: colors.text,
                              borderRadius: 5,
                              borderWidth: 1,
                              padding: 3,
                              marginTop: 10,
                              paddingBottom: 0,
                              marginBottom: 15,
                            }}
                          >
                            Process
                          </Text>
                        )
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                          }}
                          style={{ marginTop: 10 }}
                        >
                          <Text
                            style={{
                              color: "red",
                              borderColor: "red",
                              borderRadius: 5,
                              borderWidth: 1,
                              padding: 3,
                            }}
                          >
                            Rejected
                          </Text>
                        </TouchableOpacity>
                      )
                    ) : null}
                  </View>
                  <View style={{ alignSelf: "center" }}>
                    {false ? null
                     : item?.photo != null ? (
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
                          </View>
                        </TouchableOpacity>
                      </View>
                    ) : item?.pdf != null ? (
                      <TouchableOpacity
                        activeOpacity={1}
                        style={[
                          styles.avatarContainer,
                          {
                            backgroundColor: colors.background,
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
                          <Text>{item.pdf?.name}</Text>
                          {true ? null : (
                            <Icon
                              onPress={() => removeArrayFile(item)}
                              name="times"
                              size={18}
                   
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
                          )}
                        </View>
                      </TouchableOpacity>
                    ) : null}
                    {item ? (
                      true ? null : (
null
                      )
                    ) : null}
                  </View>
                </View>
              </View>
            );
          })
        ) : (
          <Text style={{ textAlign: "center" }}>No Data</Text>
        )}
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
          onPress={() => navigation.navigate("ClaimUnit")}
        >
          {t("Claim Unit Form")}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ClaimUnitList;
