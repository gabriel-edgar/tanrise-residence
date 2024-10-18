import {
  CardChannelGrid,
  CardSlide,
  CategoryList,
  News43,
  ListFacility,
  SafeAreaView,
  Text,
  Header,
  Icon,
  Tag,
  colors,
} from "@components";
import { BaseStyle, useTheme, BaseColor } from "@config";
import {
  HomeChannelData,
  HomeListData,
  HomePopularData,
  HomeTopicData,
  PostListData,
} from "@data";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  ScrollView,
  View,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NewsList, NotFound } from "../../components";

import { useSelector } from "react-redux";
import getUser from "../../selectors/UserSelectors";

import styles from "./styles";
import { API_URL_LOKAL } from "@env";

const TABS = [
  {
    id: 1,
    title: "Pending",
    status: "P",
  },
  {
    id: 2,
    title: "Close",
    status: "C",
  },
];

const Package = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setErrors] = useState(false);
  const [dataPackage, setDataPackage] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const users = useSelector((state) => getUser(state));
  const [dataPackageClose, setDataPackageClose] = useState([]);
  const [dataPackagePending, setDataPackagePending] = useState([]);

  const [tabChoosed, setTabChoosed] = useState(TABS[0]);

  useEffect(() => {
    // console.log('email di useefect', email);
    getPackage();
    setLoading(true);
  }, [tabChoosed]);

  // useEffect(() => {
  //   // enableExperimental();
  //   console.log('tab', [tabChoosed.status]);
  //   console.log('dummy package', dataPackage);

  //   const dataFilter = dataPackage.filter(data =>
  //     // console.log(
  //     //   'data filter',
  //     //   data.status === tabChoosed.status ? data.status : null,
  //     // ),
  //     data.status === tabChoosed.status ? data : null,
  //   );
  //   // setDataPackage(dummyPackage.filter(data => data[tabChoosed.id]));
  //   console.log('filter', dataFilter);
  //   setDataPackage(dataFilter);
  // }, [tabChoosed]);

  async function getPackage() {
    try {
      const email = users.user;
      console.log("email where", email);
      const res = await axios.get(
        API_URL_LOKAL + `/modules/package/index/` + email
      );
      const datas = res.data.Data;

      console.log("data package", datas);

      if (datas != null) {
        const dataFilter = datas.filter((data) =>
          // console.log(
          //   'data filter',
          //   data.status === tabChoosed.status ? data.status : null,
          // ),

          data.status === tabChoosed.status ? data : null
        );
        const dataFilterPending = datas.filter((data) =>
          // console.log(
          //   'data filter',
          //   data.status === tabChoosed.status ? data.status : null,
          // ),
          data.status === tabChoosed.status ? data : null
        );
        const dataFilterClose = datas.filter((data) =>
          // console.log(
          //   'data filter',
          //   data.status === tabChoosed.status ? data.status : null,
          // ),
          data.status === tabChoosed.status ? data : null
        );
        console.log("datafilter", dataFilter);
        console.log("dataFilterPending", dataFilterPending);
        console.log("dataFilterClose", dataFilterClose);
        setDataPackage(dataFilter);
        setDataPackagePending(dataFilterPending);
        setDataPackageClose(dataFilterClose);
        setLoading(false);
      } else {
        setDataPackage(datas);
        setLoading(false);
      }
    } catch (error) {
      setErrors(error);
      setLoading(false);
      // alert(hasError.toString());
    }
  }

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 5000);
  // }, []);

  const goPost = (item) => () => {
    navigation.navigate("Post", { item: item });
  };

  const goPostDetail = (item) => () => {
    navigation.navigate("PostDetail", { item: item });
  };
  const goToCategory = () => {
    navigation.navigate("Category");
  };

  //untuk refresh data
  const refreshPull = () => {
    // alert('refresh  pull');
    getPackage(); //data package
  };

  const renderContent = () => {
    const mainNews = PostListData[0];
    return (
      <View
        style={[BaseStyle.safeAreaView, { flex: 1 }]}
        edges={["right", "top", "left"]}
      >
        <Header
          title={t("Package")}
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
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            paddingVertical: 16,
          }}
        >
          {TABS.map((tab) => (
            <View key={tab.id} style={{ flex: 1, padding: 4 }}>
              <Tag
                primary={true}
                style={{
                  backgroundColor:
                    tab.id == tabChoosed.id
                      ? colors.primary
                      : colors.background,
                }}
                textStyle={{
                  color:
                    tab.id == tabChoosed.id
                      ? BaseColor.whiteColor
                      : colors.text,
                  fontSize: 14,
                }}
                onPress={() => setTabChoosed(tab)}
              >
                {tab.title}
              </Tag>
            </View>
          ))}
        </View>

        {/* {dataPackage != null ? (
          <Text>tidak sama dengan null</Text>
        ) : (
          <Text>sama dengan null</Text>
        )} */}

        {loading ? (
          <View>
            <ActivityIndicator size="large" color="#37BEB7" />
          </View>
        ) : (
          <SafeAreaView style={[styles.paddingSrollView, { flex: 1 }]}>
            {tabChoosed.id == 1 && dataPackagePending != "" ? (
              <FlatList
                scrollEnabled={true}
                contentContainerStyle={styles.paddingFlatList}
                data={dataPackage}
                refreshControl={
                  <RefreshControl
                    colors={[colors.primary]}
                    tintColor={colors.primary}
                    refreshing={refreshing}
                    onRefresh={() => refreshPull()}
                  />
                }
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => navigation.navigate("PackageDetail", item)}
                  >
                    <View>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 16,
                          paddingBottom: 15,
                          paddingTop: 15,
                        }}
                      >
                        Your Package has arrived at{" "}
                        {item.status == "P" ? "Security" : "Resident"}
                      </Text>
                    </View>
                    <View>
                      <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                        # {item.package_id}
                      </Text>
                    </View>

                    <View
                      style={{ flexDirection: "row", alignContent: "center" }}
                    >
                      <View
                        style={{
                          justifyContent: "flex-start",
                          flex: 1,
                          alignSelf: "center",
                        }}
                      >
                        <View style={{ paddingVertical: 5 }}>
                          <Text>To : {item.tenant_name}</Text>
                        </View>
                        <View style={{ paddingVertical: 5 }}>
                          <Text>From : {item.sender_name}</Text>
                        </View>
                      </View>
                      <View
                        style={{
                          paddingRight: 10,
                        }}
                      >
                        <View style={{ paddingVertical: 5 }}>
                          <Text>Type : {item.package_descs}</Text>
                        </View>

                        <View style={{ paddingVertical: 5 }}>
                          <Text>Quantity : {item.package_qty}</Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{ flexDirection: "row", alignContent: "center" }}
                    >
                      <View
                        style={{
                          justifyContent: "flex-start",
                          flex: 1,
                          alignSelf: "center",
                        }}
                      >
                        <Text>Received date: {item.received_date}</Text>
                      </View>
                      <View
                        style={{
                          height: 30,
                          width: 80,
                          marginHorizontal: 10,
                          marginVertical: 10,
                          backgroundColor:
                            item.status == "P"
                              ? "#b2b200"
                              : BaseColor.blueColor,
                          alignItems: "center",
                          borderRadius: 8,
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "center",
                          }}
                        >
                          {item.status == "P" ? "Pending" : "Close"}
                        </Text>
                      </View>
                    </View>
                    {/* ----- DIVIDER HERE---- */}
                    <View
                      style={{
                        // width: 1,
                        // backgroundColor: BaseColor.dividerColor,
                        marginRight: 10,
                        borderBottomWidth: 1,
                        borderColor: BaseColor.dividerColor,
                      }}
                    ></View>
                    {/* ----- CLSOE DIVIDER HERE---- */}
                  </TouchableOpacity>
                )}
              />
            ) : (
              tabChoosed.id == 1 && (
                <View>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                    }}
                  >
                    <Text style={{ paddingTop: 50 }}>Not Available Data</Text>
                  </View>
                  <NotFound />
                </View>
              )
            )}
            {tabChoosed.id == 2 && dataPackageClose != "" ? (
              <FlatList
                scrollEnabled={true}
                contentContainerStyle={styles.paddingFlatList}
                data={dataPackage}
                refreshControl={
                  <RefreshControl
                    colors={[colors.primary]}
                    tintColor={colors.primary}
                    refreshing={refreshing}
                    onRefresh={() => refreshPull()}
                  />
                }
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => navigation.navigate("PackageDetail", item)}
                  >
                    <View>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 16,
                          paddingBottom: 15,
                          paddingTop: 15,
                        }}
                      >
                        Your Package has arrived at{" "}
                        {item.status == "P" ? "Security" : "Resident"}
                      </Text>
                    </View>
                    <View>
                      <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                        # {item.package_id}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        alignContent: "center",
                      }}
                    >
                      <View
                        style={{
                          justifyContent: "flex-start",
                          flex: 1,
                          alignSelf: "center",
                        }}
                      >
                        <View style={{ paddingVertical: 5 }}>
                          <Text>To : {item.tenant_name}</Text>
                        </View>
                        <View style={{ paddingVertical: 5 }}>
                          <Text>From : {item.sender_name}</Text>
                        </View>
                      </View>
                      <View
                        style={{
                          paddingRight: 10,
                        }}
                      >
                        <View style={{ paddingVertical: 5 }}>
                          <Text>Type : {item.package_descs}</Text>
                        </View>

                        <View style={{ paddingVertical: 5 }}>
                          <Text>Quantity : {item.package_qty}</Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignContent: "center",
                      }}
                    >
                      <View
                        style={{
                          justifyContent: "flex-start",
                          flex: 1,
                          alignSelf: "center",
                        }}
                      >
                        <Text>Received date: {item.received_date}</Text>
                      </View>
                      <View
                        style={{
                          height: 30,
                          width: 80,
                          marginHorizontal: 10,
                          marginVertical: 10,
                          backgroundColor:
                            item.status == "P"
                              ? BaseColor.yellowColor
                              : BaseColor.blueColor,
                          alignItems: "center",
                          borderRadius: 8,
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "center",
                          }}
                        >
                          {item.status == "P" ? "Pending" : "Close"}
                        </Text>
                      </View>
                    </View>
                    {/* ----- DIVIDER HERE---- */}
                    <View
                      style={{
                        // width: 1,
                        // backgroundColor: BaseColor.dividerColor,
                        marginRight: 10,
                        borderBottomWidth: 1,
                        borderColor: BaseColor.dividerColor,
                      }}
                    ></View>
                    {/* ----- CLSOE DIVIDER HERE---- */}
                  </TouchableOpacity>
                )}
              />
            ) : (
              tabChoosed.id == 2 && (
                <View>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                    }}
                  >
                    <Text style={{ paddingTop: 50 }}>Not Available Data</Text>
                  </View>
                  <NotFound />
                </View>
              )
            )}
          </SafeAreaView>
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={["right", "top", "left"]}
      >
        {renderContent()}
      </SafeAreaView>
    </View>
  );
};

export default Package;
