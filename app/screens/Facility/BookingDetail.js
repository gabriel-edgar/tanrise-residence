import {
  Image,
  ListMenuIcon,
  ListOptionSelected,
  LotNoSelectOption,
  ProfileGridSmall,
  FilterESort,
  Header,
  Tag,
} from "@components";

import { TabBar, TabView, SceneMap } from "react-native-tab-view";
import Icon from "@components/Icon";
import LabelUpper2Row from "@components/Label/Upper2Row";
import { BaseColor, Images, useTheme } from "@config";
import { FLinks } from "@data";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  View,
  Text,
  FlatList,
  // CheckBox,
  // Button,
  // Modal,
  TouchableOpacity,
  Dimensions,
} from "react-native";
// import { Checkbox } from '@react-native-community/checkbox';
import CheckBox from "@react-native-community/checkbox";
import { Button, ProfileGroup } from "../../components";
import axios from "axios";
import { EFilterColors, EFilterSizes, FRecentTransactions } from "@data";
import ModalProduct from "./ModalProduct";

// or any pure javascript modules available in npm
import { Card } from "react-native-paper";
import styles from "./styles";
import Modal from "react-native-modal";
import { useSelector } from "react-redux";
import getUser from "../../selectors/UserSelectors";

import { EPostListData, ESortOption } from "@data";
import * as Utils from "@utils";

import SegmentControl from "react-native-segment-control";

import { API_URL_LOKAL } from "@env";

const dataProduk = [
  { id: 1, txt: "first check", isChecked: false },
  { id: 2, txt: "second check", isChecked: false },
  { id: 3, txt: "third check", isChecked: false },
  { id: 4, txt: "fourth check", isChecked: false },
  { id: 5, txt: "fifth check", isChecked: false },
  { id: 6, txt: "sixth check", isChecked: false },
  { id: 7, txt: "seventh check", isChecked: false },
];

export default BookingDetail = (props) => {
  const { navigation, route } = props;
  // const {params} = props;
  console.log("routes from booking facility", route.params);
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [spinner, setSpinner] = useState(true);
  const users = useSelector((state) => getUser(state));
  const [email, setEmail] = useState(users.user);
  // const navigation = useNavigation();
  // const [params, setParams] = useState(route?.params);
  // console.log('params dari screen sblm', params);

  const [LotNo, setLotno] = useState([]);
  const [lotnoChoosed, setLotnoChoosed] = useState();
  const [allowBook, setStatusAllowBook] = useState();

  const [modalVisible_2, setModalVisible_2] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [titlenull, setTitle] = useState(false);

  const [partners, setPartner] = useState([]);
  const [items, setPartnerItems] = useState([]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [partnerDetail, setPartnerDetail] = useState([]);
  const [choosepartnerDetail, setChoosePartnerDetail] = useState([]);
  const [ceklis, setCeklis] = useState(false);
  const [modalSuccessVisible, showModalSuccess] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState();
  const [errorSubmit, setErrorSubmit] = useState(false);

  const [modalStatusBookFacility, showModalStatusBookFacility] =
    useState(false);

  const [modalAlertVisible, showModalAlert] = useState(false);
  const deviceWidth = Dimensions.get("window").width;

  const [list, setList] = useState(EPostListData);

  const [allFilter, setallFilter] = useState("All");
  const [coachFilter, setcoachFilter] = useState("");

  const getLotNo = async () => {
    const entity_cd = route?.params.items.entity_cd;
    const project_no = route?.params.items.project_no;
    try {
      console.log(
        "url api lotno",
        API_URL_LOKAL +
          "/home/common-unit?entity=" +
          entity_cd +
          "&" +
          "project=" +
          project_no +
          "&" +
          "email=" +
          email
      );
      const res = await axios.get(
        API_URL_LOKAL +
          "/home/common-unit?entity=" +
          entity_cd +
          "&" +
          "project=" +
          project_no +
          "&" +
          "email=" +
          email
      );
      if (res) {
        const resLotno = res.data.data;
        console.log("reslotno", resLotno);

        // console.log('reslotno', resLotno[0].lot_no);
        setLotno(resLotno);

        // setTimeDate(data[0]);

        setSpinner(false);
      }
      return res;
    } catch (err) {
      console.log("error lotno ya", err.response);
    }
  };
  useEffect(() => {
    getLotNo();
  }, []);

  const getPartners = () => {
    const entity_cd = route?.params.items.entity_cd;
    const project_no = route?.params.items.project_no;
    const facility_cd = route?.params.items.facility_cd;
    const book_date = route?.params.items.book_date;
    const id = route?.params.items.id;
    const jam_booking = route?.params.jam_booking;
    console.log("entity", entity_cd);
    console.log("project_no", project_no);
    console.log("facility_cd", facility_cd);
    console.log("book_date", book_date);
    console.log("id", id);
    console.log("jam_booking", jam_booking);

    console.log(
      "url api partner",
      API_URL_LOKAL +
        `/modules/facilities/available-partner?entity_cd=` +
        entity_cd +
        "&project_no=" +
        project_no +
        "&facility_cd=" +
        facility_cd +
        "&book_date=" +
        book_date +
        "&book_hour=" +
        jam_booking
    );
    axios
      .get(
        API_URL_LOKAL +
          `/modules/facilities/available-partner?entity_cd=` +
          entity_cd +
          "&project_no=" +
          project_no +
          "&facility_cd=" +
          facility_cd +
          "&book_date=" +
          book_date +
          "&book_hour=" +
          jam_booking
      )
      .then((data) => {
        console.log("data partners", data.data.data);
        const resPartner = data.data.data;
        setPartner(resPartner);
        setPartnerItems(resPartner);

        // setTimeDate(data[0]);

        setSpinner(false);
      })
      .catch((error) => console.error(error))
      // .catch(error => console.error(error.response.data))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    getPartners();
  }, []);

  const onChangeOption = (option) => {
    console.log("option klik", option);

    setLotnoChoosed(option);
    setStatusAllowBook(option.status_allow_book);
    setTitle(true);
    // getBooked(dataTowerUser, databookdate, venue_klik);
    setTimeout(() => {
      setModalVisible_2(false);
    }, 200);
  };

  const onChangeSort = (sortOption) => {
    Utils.enableExperimental();
    const { value } = sortOption;
    console.log("value sort", value);
    // switch (value) {
    //   case 'all':
    //     setList(EPostListData);
    //     break;
    //   case 'Coach':
    //     setList(EPostListData.filter(product => product.isBestMatch));
    //     break;
    //   case 'Hitting Partner':
    //     const products = [...EPostListData];
    //     products.sort((a, b) => {
    //       return a.price - b.price;
    //     });
    //     setList(products);
    //     break;
    //   case 'Ball boy':
    //     const productHights = [...EPostListData];
    //     productHights.sort((a, b) => {
    //       return b.price - a.price;
    //     });
    //     setList(productHights);
    //     break;
    //   default:
    //     setList(EPostListData);
    //     break;
    // }
  };

  // const choosePartnerDetail = item => {
  //   console.log('choose partner detail', choosepartnerDetail);
  //   // setModalVisible(false);
  //   setChoosePartnerDetail(item);
  //   if (choosepartnerDetail != null) {
  //     setModalVisible(false);
  //   }
  //   // arrayPartner = [];
  //   // console.log(item);
  //   // for (let i = 0; i < item.length; i++) {
  //   //   arrayPartner += item[i];
  //   // }
  // };

  const chooseCoba = (item) => {
    console.log("item partner details", item);
    // setCeklis(true);

    setPartnerDetail(item);
    setModalVisible(true);
  };

  const onSelectedItemsChange = (selectedItems) => {
    console.log("selected items multi", selectedItems);
    //  this.setState({selectedItems});
  };

  const handleChangePartner = (rowID) => {
    let temp = partners.map((partners) => {
      if (rowID === partners.rowID) {
        return { ...partners, isChecked: !partners.isChecked };
      }
      return partners;
    });
    console.log("handlechange partner", temp);
    setPartner(temp);
  };

  // let selected = products.filter(product => product.isChecked);

  let selectedpartner = partners.filter(
    (partners) => partners.isChecked,
    partners.staff_first_name
  );

  // const renderFlatList = renderData => {
  //   return (
  //     <FlatList
  //       data={renderData}
  //       renderItem={({item}) => (
  //         <Card style={{margin: 5}}>
  //           <View
  //             style={{
  //               padding: 10,
  //               margin: 5,
  //               flexDirection: 'row',
  //               justifyContent: 'space-between',
  //             }}>
  //             <View
  //               style={{
  //                 flexDirection: 'row',
  //                 flex: 1,
  //                 justifyContent: 'space-between',
  //               }}>
  //               <CheckBox
  //                 value={item.isChecked}
  //                 onChange={() => {
  //                   handleChange(item.id);
  //                 }}
  //               />
  //               <Text>{item.txt}</Text>
  //             </View>
  //           </View>
  //         </Card>
  //       )}
  //     />
  //   );
  // };

  const renderFlatListPartner = (renderData) => {
    return (
      <FlatList
        data={renderData}
        keyExtractor={(item, index) => item.rowID}
        renderItem={({ item, key }) => (
          <Card style={{ margin: 5 }} key={key}>
            <View
              style={{
                padding: 10,
                margin: 5,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
              key={key}
            >
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <CheckBox
                  style={{ justifyContent: "center", alignSelf: "center" }}
                  value={item.isChecked}
                  onChange={() => {
                    handleChangePartner(item.rowID);
                  }}
                />
                <TouchableOpacity
                  onPress={() => chooseCoba(item)}
                  style={{ width: 110 }}
                >
                  <Image
                    source={{
                      uri: item.url_picture
                        .replace("https", "http")
                        .replace("https", "http"),
                    }}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 50,
                      alignSelf: "center",
                      alignContent: "center",
                      alignItems: "center",
                    }}
                  />
                  <Text style={{ textAlign: "center" }}>
                    {item.staff_first_name} {item.staff_last_name}
                  </Text>
                  <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                    {/* {item.ballboy == 1
                      ? 'Ballboy'
                      : item.coach == 1
                      ? 'Coach'
                      : item.hittingpartner == 1
                      ? 'Hitting Partner'
                      : null} */}
                    {item.position}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        )}
      />
    );
  };

  // const All = () => {
  //   console.log('all', All);
  //   return (
  //     <FlatList
  //       data={partners}
  //       keyExtractor={(item, index) => item.rowID}
  //       renderItem={({item, key}) => (
  //         <Card style={{margin: 5}} key={key}>
  //           <View
  //             style={{
  //               padding: 10,
  //               margin: 5,
  //               flexDirection: 'row',
  //               justifyContent: 'space-between',
  //             }}
  //             key={key}>
  //             <View
  //               style={{
  //                 flexDirection: 'row',
  //                 flex: 1,
  //                 justifyContent: 'space-between',
  //               }}>
  //               <CheckBox
  //                 style={{justifyContent: 'center', alignSelf: 'center'}}
  //                 value={item.isChecked}
  //                 onChange={() => {
  //                   handleChangePartner(item.rowID);
  //                 }}
  //               />
  //               <TouchableOpacity
  //                 onPress={() => chooseCoba(item)}
  //                 style={{width: 110}}>
  //                 <Image
  //                   source={{uri: item.url_picture.replace('https', 'http')}}
  //                   style={{
  //                     width: 60,
  //                     height: 60,
  //                     borderRadius: 50,
  //                     alignSelf: 'center',
  //                     alignContent: 'center',
  //                     alignItems: 'center',
  //                   }}
  //                 />
  //                 <Text style={{textAlign: 'center'}}>
  //                   {item.staff_first_name} {item.staff_last_name}
  //                 </Text>
  //                 <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
  //                   {item.position}
  //                 </Text>
  //               </TouchableOpacity>
  //             </View>
  //           </View>
  //         </Card>
  //       )}
  //     />
  //   );
  // };
  const BallBoy = () => {
    return (
      <FlatList
        data={partners}
        keyExtractor={(item, index) => item.rowID}
        renderItem={({ item, key }) =>
          item.ballboy == 1 ? (
            <Card style={{ margin: 5 }} key={key}>
              <View
                style={{
                  padding: 10,
                  margin: 5,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
                key={key}
              >
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "space-between",
                  }}
                >
                  <CheckBox
                    style={{ justifyContent: "center", alignSelf: "center" }}
                    value={item.isChecked}
                    onChange={() => {
                      handleChangePartner(item.rowID);
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => chooseCoba(item)}
                    style={{ width: 110 }}
                  >
                    <Image
                      source={{
                        uri: item.url_picture.replace("https", "http"),
                      }}
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 50,
                        alignSelf: "center",
                        alignContent: "center",
                        alignItems: "center",
                      }}
                    />
                    <Text style={{ textAlign: "center" }}>
                      {item.staff_first_name} {item.staff_last_name}
                    </Text>
                    <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                      {item.ballboy == 1 ? "Ballboy" : null}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
          ) : null
        }
      />
    );
  };
  const Coach = () => {
    return (
      <FlatList
        data={partners}
        keyExtractor={(item, index) => item.rowID}
        renderItem={({ item, key }) =>
          item.coach == 1 ? (
            <Card style={{ margin: 5 }} key={key}>
              <View
                style={{
                  padding: 10,
                  margin: 5,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
                key={key}
              >
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "space-between",
                  }}
                >
                  <CheckBox
                    style={{ justifyContent: "center", alignSelf: "center" }}
                    value={item.isChecked}
                    onChange={() => {
                      handleChangePartner(item.rowID);
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => chooseCoba(item)}
                    style={{ width: 110 }}
                  >
                    <Image
                      source={{
                        uri: item.url_picture.replace("https", "http"),
                      }}
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 50,
                        alignSelf: "center",
                        alignContent: "center",
                        alignItems: "center",
                      }}
                    />
                    <Text style={{ textAlign: "center" }}>
                      {item.staff_first_name} {item.staff_last_name}
                    </Text>
                    <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                      {item.coach === 1 ? "Coach" : null}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
          ) : null
        }
      />
    );
  };
  const HittingPartner = () => {
    return (
      <FlatList
        data={partners}
        keyExtractor={(item, index) => item.rowID}
        renderItem={({ item, key }) =>
          item.hittingpartner == 1 ? (
            <Card style={{ margin: 5 }} key={key}>
              <View
                style={{
                  padding: 10,
                  margin: 5,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
                key={key}
              >
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "space-between",
                  }}
                >
                  <CheckBox
                    style={{ justifyContent: "center", alignSelf: "center" }}
                    value={item.isChecked}
                    onChange={() => {
                      handleChangePartner(item.rowID);
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => chooseCoba(item)}
                    style={{ width: 110 }}
                  >
                    <Image
                      source={{
                        uri: item.url_picture.replace("https", "http"),
                      }}
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 50,
                        alignSelf: "center",
                        alignContent: "center",
                        alignItems: "center",
                      }}
                    />
                    <Text style={{ textAlign: "center" }}>
                      {item.staff_first_name} {item.staff_last_name}
                    </Text>
                    <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                      {item.hittingpartner == 1 ? "Hitting Partner" : null}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
          ) : null
        }
      />
    );
  };
  const segments = [
    // {
    //   title: 'All',
    //   view: All,
    // },
    {
      title: "Hitting Partner",
      view: HittingPartner,
    },
    {
      title: "Ballboy",
      view: BallBoy,
    },
    {
      title: "Coach",
      view: Coach,
    },
  ];

  const goBackFacility = () => {
    const itemsForBack = {
      lotno: lotnoChoosed,
      partner: selectedpartner,
    };
    console.log("items for back", itemsForBack);
    navigation.goBack("BookingFacility", itemsForBack);
  };

  const bookFacility = async () => {
    console.log("users isinya apa aja", users);

    //dipecah / difilter kolom/field mana yang mau di submit
    const isChecked = true;
    const dataselected_partner = selectedpartner
      .filter(function (item) {
        return item.rowID;
      })
      .map(function ({
        staff_first_name,
        staff_last_name,
        staff_id,
        isChecked,
      }) {
        return { staff_first_name, staff_last_name, staff_id, isChecked };
      });
    // console.log('dataselected_partner', dataselected_partner);
    if (lotnoChoosed == undefined) {
      // alert('choose lot no first');
      const lotno_arr = LotNo;

      // showModalAlert(true);

      const data = {
        entity_cd: route.params.items.entity_cd,
        project_no: route.params.items.project_no,
        facility_cd: route.params.items.facility_cd,
        venue_cd: route.params.items.venue_cd,
        book_date: route.params.items.book_date,
        book_hour: route.params.jam_booking,
        unit: lotno_arr[0].lot_no,
        name: users.name,
        handphone: users.handphone,
        remarks: "", //ini hardcode ya
        userid: users.UserId,
        datapartner: dataselected_partner,
        // email: email,
      };

      console.log("data submit default", data);

      //

      //submit here
      const config = {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          token: "",
        },
      };
      await axios
        .post(API_URL_LOKAL + "/modules/facilities/save-booking", data, {
          config,
        })
        .then((res) => {
          console.log("res save book", res.data);
          // return res.data;
          console.log("res pesan", res.data.Pesan);
          console.log("res error", res.data.Error);
          setErrorSubmit(res.data.Error);
          setMessageSuccess(res.data.Pesan);
          showModalSuccess(true);
        })
        .catch((error) => {
          console.log("error get tower api", error.response.data);
          alert("error get");
        });
    } else {
      const data = {
        entity_cd: route.params.items.entity_cd,
        project_no: route.params.items.project_no,
        facility_cd: route.params.items.facility_cd,
        venue_cd: route.params.items.venue_cd,
        book_date: route.params.items.book_date,
        book_hour: route.params.jam_booking,
        unit: lotnoChoosed.lot_no,
        name: users.name,
        handphone: users.handphone,
        remarks: "Booked", //ini hardcode ya
        userid: users.UserId,
        datapartner: dataselected_partner,
        // email: email,
      };
      console.log("data submit book", data);

      console.log(
        "url submit",
        API_URL_LOKAL + "/modules/facilities/save-booking" + data
      );

      //submit here
      const config = {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          token: "",
        },
      };
      await axios
        .post(API_URL_LOKAL + "/modules/facilities/save-booking", data, {
          config,
        })
        .then((res) => {
          // console.log('res', res);
          // return res.data;
          console.log("res pesan", res.data.Pesan);
          console.log("res error", res.data.Error);
          setErrorSubmit(res.data.Error);
          setMessageSuccess(res.data.Pesan);
          showModalSuccess(true);
        })
        .catch((error) => {
          console.log("error get tower api", error.response.data);
          alert("error get");
        });
    }
  };

  const onCloseModal = () => {
    showModalSuccess(false);
    navigation.navigate("Facility");
  };

  const onCloseModalBookFacility = () => {
    showModalStatusBookFacility(false);
  };
  return (
    <View style={{ flex: 1 }}>
      <Header
        title={t("Booking Detail")}
        // renderLeft={() => {
        //   return (
        //     <Icon
        //       name="angle-left"
        //       size={20}
        //       color={colors.primary}
        //       enableRTL={true}
        //     />
        //   );
        // }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
            <Text subheadline bold>
              Choose Lot No
            </Text>
            <ListOptionSelected
              style={{ marginTop: 10 }}
              textLeft={
                titlenull == false ? LotNo[0]?.lot_no : lotnoChoosed?.lot_no
              }
              // textRight={venueChoosed?.venue_name}
              onPress={() => setModalVisible_2(true)}
            />

            <LotNoSelectOption
              isVisible={modalVisible_2}
              options={LotNo}
              onChange={onChangeOption}
              lotnoChoosed={lotnoChoosed}
              onSwipeComplete={() => setModalVisible_2(false)}
            />
          </View>

          {/* // ---- filter partner  */}
          {/* <FilterESort
            title={`${partners.length} ${t('partners')}`}
            modeView={'list'}
            sortOption={partners}
            onChangeSort={onChangeSort}
            // onChangeView={onChangeView}
            // onFilter={onFilter}
          /> */}

          <View style={{ paddingTop: 25, paddingLeft: 10 }}>
            <Text>Choose Partners</Text>
          </View>
          {/* <View>{renderFilterPartner(partners)}</View>
           */}

          <ScrollView>
            <View
              style={{ flex: 1, height: "100%", backgroundColor: "#F5F7FA" }}
            >
              <SegmentControl
                segments={segments}
                color={colors.primary}
                style={{ backgroundColor: "red", height: 50, fontSize: 12 }}
                height={50}
              />

              {/* // coba dulu height nya 100%, kayak gimana */}
              {/* {renderFlatListPartner(partners)} */}
            </View>
          </ScrollView>
          {/* //kalo mau munculin partner yang udah kepilih */}
          {/* <Text style={{fontSize: 12}}>Selected Partners</Text>
          <View style={{flex: 1, height: 200}}>
            {renderFlatListPartner(selectedpartner)}
          </View> */}
          <ModalProduct
            // colorChoosedInit={colorChoosed}
            // sizeChoosedInit={sizeChoosed}
            item={partnerDetail}
            isVisible={modalVisible}
            onSwipeComplete={() => setModalVisible(false)}
            onApply={() => {
              // choosePartnerDetail(item);
              setModalVisible(false);
              // console.log('item from choose partner');
              // navigation.navigate('BookingDetail');s
            }}
          />
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            // flex: 1,
          }}
        >
          <Button
            medium
            outline
            style={{
              marginTop: 10,
              marginBottom: 20,
              marginHorizontal: 5,
              backgroundColor: "#fff",
              flex: 1,
            }}
            onPress={() => {
              goBackFacility();
            }}
          >
            <Text style={{ color: colors.primary }}> {t("Back")}</Text>
          </Button>

          {/* <Button
            medium
            style={{
              marginTop: 10,
              marginHorizontal: 5,
              marginBottom: 20,
              flex: 1,
            }}
            onPress={() => {
              bookFacility();
            }}>
            <Text style={{textAlign: 'center'}}>{t('Book Facility')}</Text>
          </Button> */}

          {/* <Text>{LotNo[0]?.lot_no}</Text> */}

          {lotnoChoosed == undefined ? (
            LotNo[0]?.status_allow_book == "Inactive" ? (
              <Button
                medium
                style={{
                  marginTop: 10,
                  marginHorizontal: 5,
                  marginBottom: 20,
                  flex: 1,
                  backgroundColor: "red",
                }}
                onPress={() => {
                  // alert('You are Inactive for Facility');
                  showModalStatusBookFacility(true);
                }}
              >
                <Text style={{ textAlign: "center" }}>
                  {t("Book Facility")}
                </Text>
              </Button>
            ) : (
              <Button
                medium
                style={{
                  marginTop: 10,
                  marginHorizontal: 5,
                  marginBottom: 20,
                  flex: 1,
                }}
                onPress={() => {
                  bookFacility();
                }}
              >
                <Text style={{ textAlign: "center" }}>
                  {t("Book Facility")}
                </Text>
              </Button>
            )
          ) : allowBook == "Inactive" ? (
            <Button
              medium
              style={{
                marginTop: 10,
                marginHorizontal: 5,
                marginBottom: 20,
                flex: 1,
                backgroundColor: "red",
              }}
              onPress={() => {
                // alert('You are Inactive for Facility');
                showModalStatusBookFacility(true);
              }}
            >
              <Text style={{ textAlign: "center" }}>{t("Book Facility")}</Text>
            </Button>
          ) : (
            <Button
              medium
              style={{
                marginTop: 10,
                marginHorizontal: 5,
                marginBottom: 20,
                flex: 1,
              }}
              onPress={() => {
                bookFacility();
              }}
            >
              <Text style={{ textAlign: "center" }}>{t("Book Facility")}</Text>
            </Button>
          )}
        </View>
        <View>
          <Modal
            isVisible={modalAlertVisible}
            style={{ height: "70%" }}
            onBackdropPress={() => showModalAlert(false)}
          >
            <View
              style={{
                // flex: 1,

                // alignContent: 'center',
                padding: 10,
                backgroundColor: "#fff",
                height: 120,
                borderRadius: 8,
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: colors.primary,
                    marginBottom: 10,
                  }}
                >
                  Warning!
                </Text>
                <Text>You have to choose Lot No</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  style={{
                    marginTop: 10,
                    marginBottom: 10,

                    width: 70,
                    height: 40,
                  }}
                  onPress={() => showModalAlert(false)}
                >
                  <Text style={{ fontSize: 13 }}>{t("OK")}</Text>
                </Button>
              </View>
            </View>
          </Modal>
        </View>

        <View>
          <Modal
            isVisible={modalSuccessVisible}
            style={{ height: "100%" }}
            onBackdropPress={() => showModalSuccess(false)}
          >
            <View
              style={{
                // flex: 1,

                // alignContent: 'center',
                padding: 10,
                backgroundColor: "#fff",
                // height: ,
                borderRadius: 8,
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: colors.primary,
                    marginBottom: 10,
                  }}
                >
                  {errorSubmit == false ? "Success!" : "Ups, Failed!"}
                </Text>
                <Text>{messageSuccess}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  style={{
                    marginTop: 10,
                    // marginBottom: 10,

                    width: 70,
                    height: 40,
                  }}
                  onPress={() => onCloseModal()}
                >
                  <Text style={{ fontSize: 13 }}>{t("OK")}</Text>
                </Button>
              </View>
            </View>
          </Modal>
        </View>

        {/* ------ MODAL INACTIVE BOOK FACILITY */}
        <View>
          <Modal
            isVisible={modalStatusBookFacility}
            style={{ height: "100%" }}
            onBackdropPress={() => showModalStatusBookFacility(false)}
          >
            <View
              style={{
                // flex: 1,

                // alignContent: 'center',
                padding: 10,
                backgroundColor: "#fff",
                // height: ,
                borderRadius: 8,
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: colors.primary,
                    marginBottom: 10,
                  }}
                >
                  {/* {errorSubmit == false ? 'Success!' : 'Ups, Failed!'} */}
                  Warning!
                </Text>
                <Text>You don't have permission to use facility booking</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  style={{
                    marginTop: 10,
                    // marginBottom: 10,

                    width: 70,
                    height: 40,
                  }}
                  onPress={() => onCloseModalBookFacility()}
                >
                  <Text style={{ fontSize: 13 }}>{t("OK")}</Text>
                </Button>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
};
