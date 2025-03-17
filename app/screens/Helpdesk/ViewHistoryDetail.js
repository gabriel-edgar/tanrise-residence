//detail last
import {
  Text,
  TextInput,
  // CheckBox,
  PlaceholderLine,
  Placeholder,
  Button,
  SafeAreaView,
  RefreshControl,
  Header,
  Icon,
  Image,
  Tag,
  CategoryIconSoft,
} from "@components";
import { BaseColor, BaseStyle, useTheme, Images } from "@config";
import { CheckBox, Badge } from "react-native-elements";
// import {Image} from 'react-native';
import StarRating from "react-native-star-rating";
import { useNavigation } from "@react-navigation/native";
import { enableExperimental } from "@utils";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  TouchableOpacity,
  View,
  Platform,
  TouchableHighlight,
  ScrollView,
  Dimensions,
} from "react-native";

import { useSelector } from "react-redux";
import getUser from "../../selectors/UserSelectors";
import axios from "axios";
import client from "../../controllers/HttpClient";
import styles from "./styles";

import { RadioButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import moment from "moment";

import Modal from "react-native-modal";

import SegmentedControlTab from "react-native-segmented-control-tab";

import { API_URL_LOKAL } from "@env";
import httpClient from "../../controllers/HttpClient";

export default function ViewHistoryDetail({ route }) {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const [dataTowerUser, setdataTowerUser] = useState([]);
  const [arrDataTowerUser, setArrDataTowerUser] = useState([]);
  const users = useSelector((state) => getUser(state));
  const [email, setEmail] = useState(users.email);
  const [name, setName] = useState(users.name);
  const [urlApi, seturlApi] = useState(client);

  const [spinner, setSpinner] = useState(true);

  const [dataTiketMulti, setDataTiketMulti] = useState([]);
  const [dataImageMulti, setDataImageMulti] = useState([]);
  const [dataAction, setDataAction] = useState([]);
  const [dataTiketPassProp, setDataTiketPassProp] = useState(route.params);
  const deviceWidth = Dimensions.get("window").width;
  const [isImageViewVisible, setImageViewVisible] = useState();
  const [url_image, setUrl_Image] = useState();
  const [image_solved, setImageSolved] = useState([]);
  //   const [images, setImage] = useState(url_image);
  const [images, setImage] = useState(imagesDummy); //sementara aja

  const [link_url, setLinkUrl] = useState("");
  const [name_approval, setNameApproval] = useState("");
  const [date_approval, setDateApproval] = useState("");
  const [modalImage, setModalImage] = useState(false);

  const [allDataforDetail, setAllDataforDetail] = useState([]);

  // const [dataHdr, setDataHdr] = useState([])
  // const [dataLabour, setDataLabour] = useState([])
  // const [dataMaterial, setDataMaterial] = useState([])
  // const [dataOther, setDataOther] =useState([])

  const selectedPayment = {
    type: "C",
    descs: "Cash",
  };
  const widthStyle = {
    width: (deviceWidth * 2) / 5,
    // width: deviceWidth / 2,
  };
  const [selectedIndex, setSelectedIndex] = useState(0);
  //   console.log('passprop kategori help', passProp);
  const styleItem = {
    ...styles.profileItem,
    borderBottomColor: colors.border,
  };

  const imagesDummy = [
    {
      id: "1",
      image: require("@assets/images/icon-helpdesk/newtiket.png"),
      selected: true,
    },
    {
      id: "2",
      image: require("@assets/images/icon-helpdesk/history.png"),
      //   selected: true,
    },
    { id: "3", image: Images.location2 },
    { id: "4", image: Images.location3 },
    { id: "5", image: Images.location4 },
    { id: "6", image: Images.location5 },
    { id: "7", image: Images.location6 },
    { id: "8", image: Images.location7 },
  ];

  // ---- create tabs
  const TABS = [
    {
      id: 1,
      title: t("detail"),
    },
    {
      id: 2,
      title: t("feedback"),
    },
  ];
  const [tab, setTab] = useState(TABS[0]);

  useEffect(() => {
    const id = route?.params?.id;
    TABS.forEach((tab) => {
      tab.id == id && setTab(tab);
    });
    // console.log("144: dataTiketMulti: ", dataTiketMulti);
  }, [route?.params?.id]);

  const getTicketDetailMulti = async (data) => {
    const formData = {
      entity_cd: data.entity_cd,
      project_no: data.project_no,
      report_no: data.report_no,
      email: email,
    };

    console.log("196 form data multi: ", formData);

    await httpClient
      .request({
        url: "/modules/cs/ticket-all-by-report",
        method: "GET",
        params: formData,
      })
      .then((res) => {
        console.log("196 res tiket multi: ", JSON.stringify(res.data.data));
        //return;
        const resTiketMulti = res.data.data.data_entry[0]; //res.data.data[0];
        const resImageMulti = res.data.data.data_attach; //
        //const resDataAction = res.data.data.data_report;
        const resDataAction = res.data.data.data_action; //.DataAction; //diisi oleh engineer,
        // const resDataLabourdankawankawan = res.data.DataLabourdankawankawan

        //old 27 Aug
        const resHDR = res.data.data.data_hd[0];
        const resLabour = res.data.data.data_labour[0];
        const resMaterial = res.data.data.data_material[0];
        const resOther = res.data.data.data_other[0];

        const alldata = {
          resTiketMulti,
          resHDR,
          resLabour,
          resMaterial,
          resOther,
        };
        setAllDataforDetail(alldata);
        console.log("186 all data for detail: ", alldata);
        setDataTiketMulti(resTiketMulti);
        setDataImageMulti(resImageMulti);
        setDataAction(resDataAction);

        setSpinner(false);
        // return res.data;
      })
      .catch((error) => {
        //console.log("err data multi2", error.response.data.message);
        alert(error.response.data.message);
      });
  };

  const getSolvedPicture = async (data) => {
    const formData = {
      // report_no: 'EX21090021', //hardcode dulu
      report_no: data.report_no,
      entity_cd: data.entity_cd,
      project_no: data.project_no,
    };

    // console.log('form data multi', formData);

    const config = {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        token: "",
      },
    };

    await httpClient
      .request({
        url: "/modules/cs/solved-picture",
        method: "GET",
        params: formData,
      })
      .then((res) => {
        console.log("290 solved-picture: ", res.data);
        const resGalleryService = res.data.data;

        console.log("290 resGalleryService: ", resGalleryService?.length);
        if (resGalleryService?.length != 0) {
          setImageSolved(resGalleryService);
        }

        setSpinner(false);
        // return res.data;
      })
      .catch((error) => {
        console.log("err data multi", error);
        // alert('error nih');
      });
  };

  useEffect(() => {
    asyncFunc();
  }, []);

  const asyncFunc = async () => {
    getTicketDetailMulti(route.params);
    getSolvedPicture(route.params);
  };

  const handleIndexChange = (index) => {
    console.log("index langsung klik", index);

    setSelectedIndex(index);

    console.log("Selected index", selectedIndex);
  };

  const buttonSignature = (datas, status_button) => {
    console.log("status button", status_button);
    console.log("datas for signature", datas);
    navigation.navigate("TableBeforeSignatureWO", { datas, status_button });
  };

  const buttonSignatureAfter = (datas, status_button, status) => {
    console.log("status button", status_button);
    console.log("datas for signature", datas);
    navigation.navigate("TableAfterSignatureWO", {
      datas,
      status_button,
      status,
    });
  };

  const showModalImage = ({
    link_url,
    name_approval,
    date_approval,
    // status_approval,
  }) => {
    // console.log('status approval', status_approval);
    console.log("link url image", link_url);
    setLinkUrl(link_url);
    setNameApproval(name_approval);
    setDateApproval(date_approval);
    setModalImage(true);
  };

  console.log("385 beforeReturn: ", dataImageMulti?.length);

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={["right", "top", "left"]}
    >
      <Header
        title={t("Ticket Detail")} //belum dibuat lang
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
      <View style={styles.wrap}>
        <Text title2>Ticket</Text>
        <Text headline style={{ fontWeight: "normal" }}>
          View History Ticket Detail
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 10,
            //backgroundColor: "blue",
            // borderBottomWidth: 0.5,
            // width: 300,
            // borderRadius: 10,
            // elevation: 5,
            // backgroundColor: colors.background,
            // shadowColor: colors.text,
            // shadowOffset: { width: 0, height: 2 },
            // shadowOpacity: 0.1,
            // shadowRadius: 3,
            // // marginBottom: 20,
            // overflow: "hidden",
          }}
        >
          {TABS.map((item, index) => (
            <View key={index} style={{ flex: 1, paddingHorizontal: 20 }}>
              <Tag
                primary
                style={{
                  backgroundColor:
                    tab.id == item.id ? colors.primary : "lightgray",
                }}
                onPress={() => {
                  enableExperimental();
                  setTab(item);
                }}
              >
                <Text
                  body1={tab.id == item.id}
                  light={tab.id != item.id}
                  whiteColor={tab.id == item.id}
                >
                  {item.title}
                </Text>
              </Tag>
            </View>
          ))}
        </View>

        {spinner ? (
          <View>
            {/* <Spinner visible={this.state.spinner} /> */}
            <Placeholder style={{ marginVertical: 4, paddingHorizontal: 10 }}>
              <PlaceholderLine width={100} noMargin style={{ height: 40 }} />
            </Placeholder>
          </View>
        ) : (
          <View>
            {tab.id == 1 && (
              <ScrollView>
                <View style={{ margin: 5, paddingRight: 10 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View style={widthStyle}>
                      <Text>Ticket No</Text>
                    </View>
                    <View style={{ width: 10 }}>
                      <Text>:</Text>
                    </View>
                    <View>
                      <Text style={{ fontWeight: "bold" }}>
                        # {dataTiketMulti.report_no}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View style={widthStyle}>
                      <Text>Date</Text>
                    </View>
                    <View style={{ width: 10 }}>
                      <Text>:</Text>
                    </View>
                    <View>
                      <Text>
                        {moment(dataTiketMulti.reported_date).format(
                          "DD-MM-YYYY HH:mm"
                        )}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View style={widthStyle}>
                      <Text>Name</Text>
                    </View>
                    <View style={{ width: 10 }}>
                      <Text>:</Text>
                    </View>
                    <View>
                      <Text>{dataTiketMulti.name}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View style={widthStyle}>
                      <Text>Unit</Text>
                    </View>
                    <View style={{ width: 10 }}>
                      <Text>:</Text>
                    </View>
                    <View>
                      <Text>{dataTiketMulti.lot_no}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View style={widthStyle}>
                      <Text>Contact No</Text>
                    </View>
                    <View style={{ width: 10 }}>
                      <Text>:</Text>
                    </View>
                    <View>
                      <Text>{dataTiketMulti.contact_no}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View style={widthStyle}>
                      <Text>Reported By</Text>
                    </View>
                    <View style={{ width: 10 }}>
                      <Text>:</Text>
                    </View>
                    <View>
                      <Text>{dataTiketPassProp.reported_by}</Text>
                    </View>
                  </View>
                  {/* <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      // width: '60%', //sementara, kalo udah ada isinya, ini di hide lagi
                    }}
                  >
                    <View style={widthStyle}>
                      <Text>Complain Type</Text>
                    </View>
                    <View style={{ width: 10 }}>
                      <Text>:</Text>
                    </View>
                    <View>
                      <Text style={{ flexWrap: "wrap" }}>
                        Requested
                        {/* hardcode coy *
                        {/* dari get data multi gak ada complain_type? *
                        {/* {dataTiketMulti.status == 'C' ? 'Complain' : 'Request'} *
                      </Text>
                    </View>
                  </View> */}
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View style={widthStyle}>
                      <Text>Category</Text>
                    </View>
                    <View style={{ width: 10 }}>
                      <Text>:</Text>
                    </View>
                    <View>
                      <Text>{dataTiketMulti.category}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View style={widthStyle}>
                      <Text>Status</Text>
                    </View>
                    <View style={{ width: 10 }}>
                      <Text>:</Text>
                    </View>
                    <View>
                      <Text>
                        {dataTiketMulti.status == "R"
                          ? "Open"
                          : dataTiketMulti.status == "A"
                          ? "Assign"
                          : dataTiketMulti.status == "S"
                          ? "Need Confirmation"
                          : dataTiketMulti.status == "P"
                          ? "Process"
                          : dataTiketMulti.status == "F"
                          ? "Confirm"
                          : dataTiketMulti.status == "X"
                          ? "Cancel"
                          : dataTiketMulti.status == "C"
                          ? "Close"
                          : dataTiketMulti.status == "D"
                          ? "Completed"
                          : ""}
                      </Text>
                    </View>
                  </View>
                  <View style={{ marginTop: 10 }}>
                    <View style={{ marginBottom: 5 }}>
                      <Text>Work Requested (Special Notes):</Text>
                    </View>
                    <View>
                      <View
                        style={{
                          width: "100%",
                          height: "auto",
                          borderColor: "#555",
                          borderRadius: 10,
                          borderWidth: 1,
                          padding: 5,
                        }}
                      >
                        <Text style={{ width: "100%" }}>
                          {dataTiketMulti.work_requested}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {dataTiketMulti.status == "R" ? null : ( // dataTiketMulti.status == "A" // || //|| dataTiketMulti.status == "P"
                    <View style={{ marginTop: 10 }}>
                      <Button
                        style={{
                          height: 40,
                          width: 200,
                          alignSelf: "center",
                        }}
                        onPress={
                          () =>
                            buttonSignatureAfter(
                              allDataforDetail,
                              "after_wo",
                              dataTiketMulti.status
                            )
                          // buttonSignatureAfter(allDataforDetail, {
                          //   status: dataTiketMulti.status,
                          // })
                        }
                      >
                        <Text
                          style={{
                            color: BaseColor.whiteColor,
                            fontSize: 14,
                          }}
                        >
                          Expenses
                        </Text>
                      </Button>
                      {dataTiketMulti.status == "A" ? (
                        <View
                          style={{
                            borderWidth: 1,
                            borderColor: "white",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "absolute",
                            width: 20,
                            height: 20,
                            backgroundColor: "red",
                            top: 0,
                            right: 75,
                            borderRadius: 10,
                          }}
                        ></View>
                      ) : null}
                    </View>
                  )}

                  {dataTiketMulti.status == "D" ? (
                    <View style={{ marginTop: 10 }}>
                      <Button
                        style={{
                          height: 40,
                          //width: 200,
                          alignSelf: "center",
                        }}
                        onPress={() =>
                          navigation.navigate("ScreenSignature", {
                            ...dataTiketMulti,
                            resHDR: allDataforDetail.resHDR,
                          })
                        }
                      >
                        <Text
                          style={{
                            color: BaseColor.whiteColor,
                            fontSize: 14,
                          }}
                        >
                          Approve to Close Ticket
                        </Text>
                      </Button>
                    </View>
                  ) : null}

                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                      Gallery of Request
                    </Text>
                  </View>
                  <View
                    style={{
                      paddingBottom: 150,
                      // backgroundColor: "red",
                    }}
                  >
                    {dataImageMulti?.length == 1 ? (
                      //const uri = dataTiketMulti.link_url;

                      <TouchableOpacity
                        //key={key}
                        style={{ flex: 1 }}
                        activeOpacity={1}
                        onPress={() =>
                          navigation.navigate("PreviewImageHelpdesk", {
                            images: [
                              {
                                file_url:
                                  dataImageMulti[0]?.file_url +
                                  `?timestamp=${new Date().getTime()}`,
                              },
                            ],
                          })
                        }
                      >
                        <Image
                          //key={key}
                          style={{
                            flex: 1,
                            width: "100%",
                            height: 400,
                            marginTop: 20,
                            borderRadius: 10,
                          }}
                          source={{
                            uri:
                              dataImageMulti[0]?.file_url +
                              `?timestamp=${new Date().getTime()}`,
                            //uri: "https://api.property365.co.id:4421/tanrise_api/public/storage/image/CSsignature/AD24080003/Signature_AD24080003.png",
                          }}
                        />
                      </TouchableOpacity>
                    ) : (
                      dataImageMulti.map((item, key) => {
                        const uri = item?.file_url;
                        // ? item?.file_url
                        // : dataTiketMulti.link_url;
                        const images = item?.file_url;
                        // ? dataImageMulti
                        // : [{ file_url: dataTiketMulti.link_url }];
                        return (
                          <TouchableOpacity
                            key={key}
                            style={{ flex: 1 }}
                            activeOpacity={1}
                            onPress={() =>
                              navigation.navigate("PreviewImageHelpdesk", {
                                images: dataImageMulti,
                              })
                            }
                          >
                            <Image
                              key={key}
                              style={{
                                flex: 1,
                                width: "100%",
                                height: 400,
                                marginTop: 20,
                              }}
                              source={{ uri }}
                            />
                          </TouchableOpacity>
                        );
                      })
                    )}
                  </View>
                </View>
              </ScrollView>
            )}
            {tab.id == 2 && (
              <ScrollView>
                <View>
                  {dataTiketMulti.status == "R" ||
                  dataTiketMulti.status == "A" ? (
                    <View>
                      <Text style={{ textAlign: "center", marginTop: 10 }}>
                        Feedback not available at status open or status assign
                      </Text>
                    </View>
                  ) : (
                    <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <View style={{}}>
                          <Text>Assign To{"           "} :</Text>
                        </View>
                        {/* <View style={{ width: 10 }}>
                            <Text>:</Text>
                          </View> */}
                        <View
                          style={
                            {
                              //backgroundColor: "blue"
                            }
                          }
                        >
                          <Text
                            style={
                              {
                                //flexWrap: "wrap"
                              }
                            }
                          >
                            {"  " + dataTiketMulti.assign_to}
                          </Text>
                        </View>
                      </View>
                      <View style={{ marginTop: 10 }}>
                        <View>
                          <Text>Problem Cause</Text>
                        </View>
                        <View style={{ marginTop: 10 }}>
                          <View
                            style={{
                              width: "100%",
                              height: "auto",
                              borderColor: "#555",
                              borderRadius: 10,
                              borderWidth: 1,
                              padding: 5,
                            }}
                          >
                            <Text style={{ width: "100%" }}>
                              {dataTiketMulti.problem_cause}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={{ marginTop: 10 }}>
                        <View>
                          <Text>Action Taken</Text>
                        </View>
                        <View style={{ marginTop: 10 }}>
                          <View
                            style={{
                              width: "100%",
                              height: "auto",
                              borderColor: "#555",
                              borderRadius: 10,
                              borderWidth: 1,
                              padding: 5,
                            }}
                          >
                            <Text style={{ width: "100%" }}>
                              {dataTiketMulti.action_taken}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={{ marginTop: 10 }}>
                        <View>
                          <Text>Remark</Text>
                        </View>
                        <View style={{ marginTop: 10 }}>
                          <View
                            style={{
                              width: "100%",
                              height: "auto",
                              borderColor: "#555",
                              borderRadius: 10,
                              borderWidth: 1,
                              padding: 5,
                            }}
                          >
                            <Text style={{ width: "100%" }}>
                              {dataTiketMulti.remarks}
                            </Text>
                          </View>
                        </View>
                      </View>

                      {dataAction?.length != 0
                        ? dataAction?.map((data, index) => {
                            <View key={index} style={{ marginVertical: 5 }}>
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}
                              >
                                <View style={widthStyle}>
                                  <Text>Action By</Text>
                                </View>
                                <View style={{ width: 10 }}>
                                  <Text>:</Text>
                                </View>
                                <View>
                                  <Text>{data.action_by}</Text>
                                </View>
                              </View>
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}
                              >
                                <View style={widthStyle}>
                                  <Text>Action Taken</Text>
                                </View>
                                <View style={{ width: 10 }}>
                                  <Text>:</Text>
                                </View>
                                <View>
                                  <Text>{data.action_taken}</Text>
                                </View>
                              </View>
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}
                              >
                                <View style={widthStyle}>
                                  <Text>Action Date</Text>
                                </View>
                                <View style={{ width: 10 }}>
                                  <Text>:</Text>
                                </View>
                                <View>
                                  <Text>{data.action_date}</Text>
                                </View>
                              </View>
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}
                              >
                                <View style={widthStyle}>
                                  <Text>Action Date</Text>
                                </View>
                                <View style={{ width: 10 }}>
                                  <Text>:</Text>
                                </View>
                                <View>
                                  <Text>{data.action_date}</Text>
                                </View>
                              </View>
                            </View>;
                          })
                        : null}

                      <View
                        style={{
                          marginTop: 20,
                        }}
                      >
                        <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                          Gallery of Solved
                        </Text>
                      </View>
                      {image_solved[0]?.file_url ? (
                        <>
                          <View style={{ marginBottom: "40%" }}>
                            <TouchableOpacity
                              //key={key}
                              style={{ flex: 1 }}
                              activeOpacity={1}
                              onPress={() =>
                                navigation.navigate("PreviewImageHelpdesk", {
                                  images: [
                                    {
                                      file_url:
                                        image_solved[0]?.file_url +
                                        `?timestamp=${new Date().getTime()}`,
                                    },
                                  ],
                                })
                              }
                            >
                              <Image
                                //key={key}
                                style={{
                                  flex: 1,
                                  width: "100%",
                                  height: 400,
                                  marginTop: 20,
                                  borderRadius: 10,
                                }}
                                source={{
                                  uri:
                                    image_solved[0]?.file_url +
                                    `?timestamp=${new Date().getTime()}`,
                                  //uri: "https://api.property365.co.id:4421/tanrise_api/public/storage/image/CSsignature/AD24080003/Signature_AD24080003.png",
                                }}
                              />
                            </TouchableOpacity>
                          </View>
                        </>
                      ) : (
                        <Text style={{ marginBottom: 200, marginTop: 10 }}>
                          this gallery will show when problem is solved
                        </Text>
                      )}
                    </View>
                  )}
                </View>
              </ScrollView>
            )}
          </View>
        )}

        <View>
          <Modal
            isVisible={modalImage}
            style={{ height: "100%" }}
            onBackdropPress={() => setModalImage(false)}
          >
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
                  <TouchableOpacity onPress={() => setModalImage(false)}>
                    <View style={{ width: 30, height: 20 }}>
                      <Icon name={"times"} size={20}></Icon>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",

                  // flex: 1,
                  // margin: 10,
                  marginTop: "20%",
                  margin: 10,
                  borderColor: BaseColor.grayColor,
                  borderRadius: 15,
                  borderWidth: 1,
                  width: "90%",
                  // height: 300,
                }}
              >
                <Image
                  source={{ uri: link_url }}
                  style={{
                    width: 200,
                    height: 200,
                  }}
                ></Image>
              </View>
              <View>
                <Text style={{ textAlign: "center" }}>
                  Signature Name : {name_approval}
                </Text>
              </View>
              <View>
                <Text style={{ textAlign: "center" }}>
                  Date Approval :{" "}
                  {moment(date_approval).format("DD-MM-YYYY H:mm")}
                </Text>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </SafeAreaView>
  );
}
