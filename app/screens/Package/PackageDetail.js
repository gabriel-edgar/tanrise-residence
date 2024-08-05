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
import QRCode from "react-native-qrcode-svg";
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
import Timeline from "react-native-timeline-flatlist";
import {
  FlatList,
  ScrollView,
  View,
  ActivityIndicator,
  RefreshControl,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
// import {TouchableOpacity} from 'react-native-gesture-handler';
import { NewsList, NotFound } from "../../components";

import { useSelector } from "react-redux";
import getUser from "../../selectors/UserSelectors";
import Modal from "react-native-modal";

import styles from "./styles";

const PackageDetail = (props) => {
  const { navigation, route } = props;
  //   console.log('route params', route);
  const [detailPackage, setDetailPackage] = useState([route.params]);
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setErrors] = useState(false);
  const [dataPackage, setDataPackage] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const users = useSelector((state) => getUser(state));
  const [datalogEdited, setDataLog] = useState([]);
  const [modalQrcode, setModalQrcode] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      datalog();
    }, 5000);
  }, [detailPackage]);

  const datalog = () => {
    const datalog = detailPackage[0];
    console.log("detailpackage", detailPackage);
    console.log("received date resident", datalog.received_date_resident);
    let temp = [
      {
        time: moment(datalog.received_date).format("DD-MM-YYYY   HH:mm:ss"),
        title: "Package received by Security",
        description: "On Proccess at Security",
      },
      {
        time:
          datalog.received_date_tro != null
            ? moment(datalog.received_date_tro).format("DD-MM-YYYY   HH:mm:ss")
            : "",
        title:
          datalog.received_date_tro != null ? "Package received by TRO" : "",
        description:
          datalog.received_date_tro != null
            ? "Take your package at TRO, or Call TRO soon"
            : "",
      },
      {
        time:
          datalog.received_date_resident != null
            ? moment(datalog.received_date_resident).format(
                "DD-MM-YYYY   HH:mm:ss"
              )
            : "",
        title:
          datalog.received_date_resident != null
            ? "Package received by Resident"
            : "",
        description:
          datalog.received_date_resident != null
            ? "Success delivered package!"
            : "",
      },
    ];
    console.log("datalog edited", temp);
    setDataLog(temp);
  };

  const renderContent = () => {
    return (
      <SafeAreaView
        style={[BaseStyle.safeAreaView, { flex: 1 }]}
        edges={["right", "top", "left"]}
      >
        <Header
          title={t("Package Detail")}
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

        {loading == true ? (
          <View>
            <ActivityIndicator size="large" color="#37BEB7" />
          </View>
        ) : (
          <SafeAreaView
            style={[styles.paddingSrollView, { flex: 1, marginBottom: 20 }]}
          >
            {/* <ScrollView contentContainerStyle={styles.paddingSrollView}> */}
            {detailPackage != null ? (
              <FlatList
                scrollEnabled={true}
                contentContainerStyle={styles.paddingFlatList}
                data={detailPackage}
                // style={{paddingBottom: 20, marginBottom: 20}}
                refreshControl={
                  <RefreshControl
                    colors={[colors.primary]}
                    tintColor={colors.primary}
                    refreshing={refreshing}
                    onRefresh={() => {}}
                  />
                }
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <View key={index}>
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
                    <View
                      style={{
                        flexDirection: "row",
                        flex: 1,
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={{ justifyContent: "space-between" }}>
                        <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                          # {item.package_id}
                        </Text>
                      </View>

                      <TouchableOpacity
                        onPress={() => {
                          setModalQrcode(true);
                        }}
                      >
                        <View>
                          <Text
                            style={{
                              fontWeight: "bold",
                              fontSize: 14,
                              color: colors.primary,
                            }}
                          >
                            Show QrCode
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: 10 }}>
                      <Text
                        style={{
                          color: colors.primary,
                          fontWeight: "bold",
                          marginTop: 5,
                        }}
                      >
                        Gate : {item.gate_cd} - Tower {item.tower_descs}
                      </Text>
                      <Text
                        style={{
                          color: colors.primary,
                          fontWeight: "bold",
                          marginTop: 5,
                        }}
                      >
                        Lot No : {item.lot_no}
                      </Text>
                    </View>

                    <View
                      style={{
                        marginTop: 10,
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

                    {/* ----  BADGE STATUS --- */}
                    <View
                      style={{
                        flexDirection: "row",
                        alignContent: "center",
                        marginTop: 5,
                      }}
                    >
                      <View
                        style={{
                          justifyContent: "flex-start",
                          flex: 1,
                          alignSelf: "center",
                        }}
                      >
                        {/* <Text>Received date: {item.received_date}</Text> */}
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
                    {/* ----  CLOSE BADGE STATUS --- */}

                    {/* ----- DIVIDER HERE---- */}
                    <View
                      style={{
                        // width: 1,
                        // backgroundColor: BaseColor.dividerColor,
                        marginRight: 10,
                        marginTop: 8,
                        flex: 1,
                        borderBottomWidth: 3,
                        borderColor: BaseColor.dividerColor,
                        borderStyle: "dashed",
                      }}
                    ></View>
                    {/* ----- CLSOE DIVIDER HERE---- */}

                    {/* --- COURIR DETAIL ---- */}
                    <View>
                      <Text style={{ marginTop: 10, fontWeight: "bold" }}>
                        Courir Detail
                      </Text>
                      <Text style={{ marginTop: 5 }}>
                        Deliveryman : {item.deliveryman_name}
                      </Text>
                      <Text style={{ marginTop: 5 }}>
                        Deliveryman Phone : {item.deliveryman_hp}
                      </Text>
                      <Text style={{ marginTop: 5 }}>
                        Description : {item.package_descs}
                      </Text>
                    </View>

                    <View>
                      <Text style={{ marginTop: 10, fontWeight: "bold" }}>
                        Package Photo
                      </Text>
                      {item.package_picture == null ||
                      item.package_picture == "" ? (
                        <View
                          style={{
                            borderWidth: 1,
                            borderColor: colors.primary,
                            width: 200,
                            height: 200,
                            marginTop: 10,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Text
                            style={{
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            No Image
                          </Text>
                        </View>
                      ) : (
                        <View
                          style={{
                            borderWidth: 1,
                            borderColor: colors.primary,
                            width: 300,
                            height: 200,
                            marginTop: 10,
                          }}
                        >
                          <Image
                            source={{
                              uri: item.package_picture.replace(
                                "https",
                                "http"
                              ),
                            }}
                            style={{
                              width: "100%",
                              height: 200,
                              // marginTop: 10,

                              resizeMode: "cover", //auto center dengan maksimal height width hardcode 200px
                            }}
                          ></Image>
                        </View>
                      )}
                    </View>
                    {/* --- CLOSE COURIR DETAIL ---- */}

                    {/* ----- DIVIDER HERE---- */}
                    <View
                      style={{
                        // width: 1,
                        // backgroundColor: BaseColor.dividerColor,
                        marginRight: 10,
                        marginTop: 20,
                        borderBottomWidth: 1,
                        borderColor: BaseColor.dividerColor,
                      }}
                    ></View>
                    {/* ----- CLSOE DIVIDER HERE---- */}

                    {/* ---- STATUS DELIVERY ---- */}
                    <View
                      style={{
                        flex: 1,
                        // height: 250,
                        paddingBottom: 0,
                        paddingTop: 15,
                        backgroundColor: "white",
                        // width: 200,
                      }}
                    >
                      <Text style={{ fontWeight: "bold", marginBottom: 20 }}>
                        Status Delivery
                      </Text>
                      <Timeline
                        timeContainerStyle={{ width: 130 }}
                        lineColor={colors.primary}
                        circleColor={colors.primary}
                        options={{
                          removeClippedSubviews: false,
                        }}
                        style={{
                          marginTop: 10,
                          flex: 1,
                          marginLeft: 10,
                          paddingRight: 20,
                          paddingLeft: 20,
                        }}
                        data={datalogEdited}
                        // renderDetail={renderDetail(detailPackage)}
                      />
                    </View>
                    {/* ---- CLOSE STATUS DELIVERY ---- */}

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

                    {/* --- COURIR DETAIL ---- */}
                    <View>
                      <Text style={{ marginTop: 10, fontWeight: "bold" }}>
                        Delivery Package Completed
                      </Text>
                      <Text style={{ marginTop: 5 }}>
                        Received by : {item.received_by_resident}
                      </Text>
                    </View>

                    <View>
                      <Text style={{ marginTop: 10, fontWeight: "bold" }}>
                        Sign Photo
                      </Text>

                      <View
                        style={{
                          borderWidth: 1,
                          borderColor: colors.primary,
                          width: "100%",
                          height: 200,
                          marginTop: 10,
                          justifyContent: "center",
                          alignItems: "center",
                          alignSelf: "center",
                          alignContent: "center",
                          //   flex: 1,
                        }}
                      >
                        {/* <Text>sign resident{item.received_sign_resident}</Text> */}
                        {item.received_photo_resident != null ? (
                          <Image
                            source={{
                              uri: item.received_sign_resident.replace(
                                "https",
                                "http"
                              ),
                            }}
                            style={{
                              width: "100%",
                              height: 200,
                              // marginTop: 10,
                              justifyContent: "center",
                              alignItems: "center",
                              alignSelf: "center",

                              resizeMode: "contain", //auto center dengan maksimal height width hardcode 200px
                            }}
                          ></Image>
                        ) : (
                          <Text>No Photo</Text>
                        )}
                      </View>
                    </View>

                    <View>
                      <Text style={{ marginTop: 10, fontWeight: "bold" }}>
                        Received Package Photo
                      </Text>
                      <View
                        style={{
                          borderWidth: 1,
                          borderColor: colors.primary,
                          width: "100%",
                          height: 200,
                          marginTop: 10,
                          justifyContent: "center",
                          alignItems: "center",
                          alignSelf: "center",
                          alignContent: "center",
                        }}
                      >
                        {/* <Text>{item.received_photo_resident}</Text> */}
                        {item.received_photo_resident != null ? (
                          <Image
                            source={{
                              uri: item.received_photo_resident.replace(
                                "https",
                                "http"
                              ),
                            }}
                            style={{
                              width: "100%",
                              height: 200,
                              // marginTop: 10,
                              justifyContent: "center",
                              alignItems: "center",
                              alignSelf: "center",
                              resizeMode: "cover", //auto center dengan maksimal height width hardcode 200px
                            }}
                          ></Image>
                        ) : (
                          <Text>No Photo</Text>
                        )}
                      </View>
                    </View>

                    {/* --- CLOSE COURIR DETAIL ---- */}

                    <View>
                      <Modal
                        isVisible={modalQrcode}
                        style={{ height: "100%" }}
                        onBackdropPress={() => setModalQrcode(false)}
                      >
                        {/* <View>
                          <Icon name={'times'}></Icon>
                        </View> */}
                        <View
                          style={{
                            backgroundColor: BaseColor.whiteColor,
                            height: "60%",
                            borderRadius: 30,
                            // justifyContent: 'center',
                          }}
                        >
                          <View style={{ flexDirection: "row", width: "100%" }}>
                            <View
                              style={{
                                marginTop: 20,
                                justifyContent: "space-between",
                                flex: 1,
                              }}
                            ></View>
                            <View
                              style={{
                                marginTop: 20,
                                justifyContent: "space-between",
                                marginRight: 10,
                              }}
                            >
                              <TouchableOpacity
                                onPress={() => setModalQrcode(false)}
                              >
                                <View style={{ width: 30, height: 20 }}>
                                  <Icon name={"times"} size={20}></Icon>
                                </View>
                              </TouchableOpacity>
                            </View>
                          </View>

                          <Text
                            style={{
                              fontWeight: "bold",
                              fontSize: 16,
                              marginLeft: 30,
                              marginRight: 30,
                              marginTop: 15,
                            }}
                          >
                            Scan this for your Package ID {item.package_id} -{" "}
                            Lot No {item.lot_no}
                          </Text>

                          <View
                            style={{
                              justifyContent: "center",
                              alignItems: "center",
                              flex: 1,
                            }}
                          >
                            <QRCode value={item.package_id} size={200} />
                          </View>
                        </View>
                      </Modal>
                    </View>
                  </View>
                )}
              />
            ) : (
              <NotFound />
            )}
            {/* </ScrollView> */}
          </SafeAreaView>
        )}
      </SafeAreaView>
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

export default PackageDetail;
