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
  }, [route?.params?.id]);

  //   console.log('images dummy', imagesDummy[0].image);
  //-----FOR GET ENTITY & PROJJECT
  // const getTower = async () => {
  //   const data = {
  //     email: email,
  //     app: "O",
  //   };

  //   const config = {
  //     headers: {
  //       accept: "application/json",
  //       "Content-Type": "application/json",
  //       // token: "",
  //     },
  //   };

  //   await axios
  //     .get(
  //       API_URL_LOKAL + `/home/common-project/mysql/${data.email}/${data.app}`,
  //       {
  //         config,
  //       }
  //     )
  //     .then((res) => {
  //       const datas = res.data;

  //       const arrDataTower = datas.Data;
  //       arrDataTower.map((dat) => {
  //         if (dat) {
  //           setdataTowerUser(dat);
  //         }
  //       });
  //       setArrDataTowerUser(arrDataTower);
  //       setSpinner(false);

  //       // return res.data;
  //     })
  //     .catch((error) => {
  //       console.log("error get tower api", error);
  //       alert("error get");
  //     });
  // };

  const getTicketDetailMulti = async (data) => {
    const formData = {
      entity_cd: data.entity_cd,
      project_no: data.project_no,
      report_no: data.report_no,
      email: email,
    };

    console.log("196 form data multi: ", formData);

    // const config = {
    //   headers: {
    //     accept: "application/json",
    //     "Content-Type": "application/json",
    //     token: "",
    //   },
    // };

    // await axios
    //   .post(
    //     API_URL_LOKAL + "/modules/cs/ticket-all-by-report/IFCAPB",
    //     formData,
    //     {
    //       config,
    //     }
    //   )
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

        // data_entry
        // data_image
        // data_action
        // data_hd
        // data_labour
        // data_material
        // data_other

        // const cekdata = res.data;
        // console.log("cek data detail", cekdata);

        //console.log("bingung ih res hdr apa", { ...resLabour });

        const alldata = {
          resTiketMulti,
          resHDR,
          resLabour,
          resMaterial,
          resOther,
        };
        setAllDataforDetail(alldata);
        // console.log('tes data nih', tesdata);
        // console.log('resImageMulti', resImageMulti);
        // console.log('res.data', res.data.Data[0]);

        setDataTiketMulti(resTiketMulti);
        setDataImageMulti(resImageMulti);
        setDataAction(resDataAction);
        // setDataHdr(resHDR);
        // setDataLabour(resLabour)
        // setDataMaterial(resMaterial)
        // setDataOther(resOther)

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

    // await axios
    //   .post(API_URL_LOKAL + "/modules/cs/solved-picture", formData, { config })
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
    // setTimeout(() => {
    //setLoading(false);
    //getTower(users);
    //setImageViewVisible(false); // getCategoryHelp;
    // setSpinner(false);
    //   console.log('routeparams', route.params);
    //   setDataHistoryStatus(route.params);
    asyncFunc();
    // }, 3000);
  }, []);

  const asyncFunc = async () => {
    getTicketDetailMulti(route.params);
    getSolvedPicture(route.params);
  };

  const handleIndexChange = (index) => {
    console.log("index langsung klik", index);

    // this.setState({
    //   selectedIndex: index,
    // });
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

  //   const saveConfirm = () => {
  //     const data = dataTiketPassProp;
  //     const formData = {
  //       entity: data.entity_cd,
  //       project: data.project_no,
  //       reportno: data.report_no,
  //       name: name,
  //       email: email,
  //       assignto: data.assign_to,
  //       payment_method: selectedPayment.type,
  //     };
  //     console.log('dataTicket', formData);

  //     // fetch(urlApi + 'c_ticket_history/saveConfirm/IFCAPB/', {
  //     //   method: 'POST',
  //     //   body: JSON.stringify(formData),
  //     // })
  //     //   .then(response => response.json())
  //     //   .then(res => {
  //     //     console.log('saveConfirm', res);
  //     //     this.showAlert(res.Pesan);
  //     //   })
  //     //   .catch(error => {
  //     //     console.log(error);
  //     //   });
  //   };
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
            marginVertical: 10,
          }}
        >
          {TABS.map((item, index) => (
            <View key={index} style={{ flex: 1, paddingHorizontal: 20 }}>
              <Tag
                primary
                style={{
                  backgroundColor:
                    tab.id == item.id ? colors.primary : colors.background,
                }}
                onPress={() => {
                  enableExperimental();
                  setTab(item);
                }}
              >
                <Text
                  body1={tab.id != item.id}
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
                    style={
                      {
                        //marginBottom: 50
                      }
                    }
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
                            }}
                            source={{
                              uri:
                                image_solved[0]?.file_url +
                                `?timestamp=${new Date().getTime()}`,
                              //uri: "https://api.property365.co.id:4421/tanrise_api/public/storage/image/CSsignature/AD24080003/Signature_AD24080003.png",
                            }}
                          />
                        </TouchableOpacity>
                        {/* {image_solved?.map((item, key) => {
                      console.log("920 item.file_url: ", item.file_url);
                      return (
                        // <View key={key}>
                        <TouchableOpacity
                          key={key}
                          style={{ flex: 1 }}
                          activeOpacity={1}
                          onPress={() =>
                            navigation.navigate("PreviewImageHelpdesk", {
                              images: image_solved,
                            })
                          }
                        >
                          <Image
                            key={key}
                            style={{
                              flex: 1,
                              width: "100%",
                              height: 400,
                              marginTop: 10,
                            }}
                            source={{ uri: `${item.file_url}` }}
                          />
                        </TouchableOpacity>
                        // </View>
                      );
                    })} */}
                      </View>
                    </>
                  ) : (
                    <Text style={{ marginBottom: 200, marginTop: 10 }}>
                      this gallery will show when problem is solved
                    </Text>
                  )}

                  {/* //contoh bikin signature  dtaro  sini */}
                  {/* {
                    (dataTiketMulti.status == 'A',
                    'P',
                    'M',
                    'F',
                    'Y',
                    'Z' ? (
                      <View>
                        <Button>
                          <Text>{dataTiketMulti.status} ada</Text>
                        </Button>
                      </View>
                    ) : (
                      <Text>{dataTiketMulti.status} gada</Text>
                    ))
                  } */}
                  {/* //contoh bikin signature  dtaro  sini */}
                  {/* //contoh image slider view */}
                  {/* <View style={{marginTop: 50}}>
                    <Text style={{fontWeight: 'bold'}}>Finish of Services</Text>
                  </View>
                  <View style={{flexDirection: 'row', marginTop: 10}}>
                    <ScrollView horizontal>
                      {imagesDummy.map((item, key) => {
                        return (
                          <TouchableOpacity
                            key={key}
                            //   style={{flex: 1}}
                            activeOpacity={1}
                            onPress={() =>
                              navigation.navigate('PreviewImage', {
                                images: imagesDummy,
                              })
                            }>
                            <Image
                              key={key}
                              style={{width: 100, height: 100}}
                              source={item.image}
                            />
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                  </View> */}
                  {/* //contoh image slider view */}
                </View>
              </ScrollView>
            )}
            {tab.id == 2 && (
              <ScrollView>
                <View>
                  {
                    //dataTiketMulti.status != "R" ? ( == (normal)
                    dataTiketMulti.status == "R" ||
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
                        {/* <View style={{ marginTop: 10 }}>
                          <View>
                            <Text>Data Labour</Text>
                          </View>
                          <View style={{ marginTop: 10 }}>
                            <View
                              style={{
                                width: "100%",
                                height: "auto",
                                borderColor: "#555",
                                borderRadius: 10,
                                //borderWidth: 1,
                                padding: 5,
                              }}
                            >
                              <Text style={{ width: "100%" }}>
                                {allDataforDetail.resLabour.sum?.map(
                                  (item, index) =>
                                    allDataforDetail.resLabour.sum[index]
                                      .total_amt +
                                    " (" +
                                    allDataforDetail.resLabour.detail[index]
                                      .descs +
                                    ")"
                                )}
                              </Text>
                            </View>
                          </View>
                        </View> */}

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

                        {/* <TouchableOpacity
                        //   style={btnConfirm}
                        onPress={() => saveConfirm()}>
                        <Text>Confirm</Text>
                      </TouchableOpacity> */}
                      </View>
                    )
                  }
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
