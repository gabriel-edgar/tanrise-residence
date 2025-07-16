import {
  Image,
  SafeAreaView,
  Header,
  Button,
  PlaceholderLine,
  Placeholder,
} from "@/components";
import Icon from "@/components/Icon";
// import LabelUpper2Row from '@/components/Label/Upper2Row';
import { BaseColor, Images, useTheme, BaseStyle } from "@/config";
// import {FLinks} from '@/data';
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "react-native-modal";
import IconFontisto from "react-native-vector-icons/Fontisto";
import IconIonicons from "react-native-vector-icons/Ionicons";
import {
  ScrollView,
  View,
  Text,
  FlatList,
  // CheckBox,
  // Button,
  // Modal,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
// // import { Checkbox } from '@react-native-community/checkbox';
// import CheckBox from '@react-native-community/checkbox';
// import {Button, ProfileGroup} from '../../components';
import axios from "axios";
// import Timeline from "react-native-timeline-flatlist";
// import {EFilterColors, EFilterSizes, FRecentTransactions} from '@/data';
// import ModalProduct from './ModalProduct';

// // or any pure javascript modules available in npm
import { Card } from "react-native-paper";
import styles from "./styles";
// import Modal from 'react-native-modal';
import { useSelector } from "react-redux";
import getUser from "../../selectors/UserSelectors";

import * as Utils from "@/utils";
import moment from "moment";

import CheckBox from "@react-native-community/checkbox";
import { baseURL as API_URL_LOKAL } from "@/controllers/HttpClient";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default BookingListDetail = (props) => {
  const { navigation, route } = props;
  // const {params} = props;
  console.log("routes from booking list", route.params);
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [spinner, setSpinner] = useState(true);
  const users = useSelector((state) => getUser(state));
  const [email, setEmail] = useState(users.user);
  const [userId, setUserId] = useState(users.UserId);

  const [onDetailBooking, setDetailBooking] = useState([]);
  const [partners, setPartnerBooking] = useState([]);

  const [modalSuccessVisible, showModalSuccess] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState();
  const [errorSubmit, setErrorSubmit] = useState(false);

  const reservation_no = route.params.reservation_no;

  const [datalogEdited, setDataLog] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  //   const deviceWidth = Dimensions.get('window').width;

  const [confirmModal, showConfirmModal] = useState(false);

  const dataDummy = [
    { time: "09:00", title: "Event 1", description: "Event 1 Description" },
    { time: "10:45", title: "Event 2", description: "Event 2 Description" },
    { time: "12:00", title: "Event 3", description: "Event 3 Description" },
    { time: "14:00", title: "Event 4", description: "Event 4 Description" },
    { time: "16:30", title: "Event 5", description: "Event 5 Description" },
  ];

  const getDetailList = async () => {
    // fdura;
    const reservation_no = route.params.reservation_no;
    console.log(
      "url datalist detail",
      API_URL_LOKAL +
        `/modules/facilites/booking-by-reservation/` +
        reservation_no
    );
    try {
      const res = await axios.get(
        API_URL_LOKAL +
          `/modules/facilites/booking-by-reservation/` +
          reservation_no
      );
      if (res) {
        console.log("res post", res.data.Data);
        setDetailBooking(res.data.Data);
        const datalog = res.data.Data.datalog;
        let temp = datalog.map((datalog) => {
          if (
            datalog.status == "B" ||
            datalog.status == "O" ||
            datalog.status == "N" ||
            datalog.status == "D" ||
            datalog.status == "C"
          ) {
            return {
              title: datalog.check_by_name,
              title2: null,
              time: moment(datalog.check_date).format("DD-MM-YYYY   HH:mm:ss"),
              description: datalog.remarks,
              reason:
                datalog.reason == null || datalog.reason == ""
                  ? null
                  : "Reason : " + datalog.reason,
            };
          } else {
            return {
              title: datalog.check_by_name,
              title2:
                "Staff : " +
                datalog.staff_first_name +
                " " +
                datalog.staff_last_name,
              time: moment(datalog.check_date).format("DD-MM-YYYY   HH:mm:ss"),
              description: datalog.remarks,
              reason:
                datalog.reason == null ||
                datalog.reason == "-" ||
                datalog.reason == " "
                  ? null
                  : "Reason : " + datalog.reason,
            };
          }
        });
        console.log("datalog edited", temp);
        setDataLog(temp);
        setSpinner(false);
      }
      return res;
    } catch (err) {
      console.log("error disini ya", err.response);
    }
  };

  const getPartnerBooking = async () => {
    const reservation_no = route.params.reservation_no;
    await axios
      .get(
        API_URL_LOKAL +
          `/modules/facilities/available-partner-by-reservation/` +
          reservation_no
      )
      .then((data) => {
        // console.log('data on partner booking', data.data.Data);
        setPartnerBooking(data.data.Data);
        setSpinner(false);
      })
      .catch((error) => console.error(error))
      // .catch(error => console.error(error.response.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getDetailList();
  }, []);

  useEffect(() => {
    getPartnerBooking();
  }, []);

  const renderFilterPartner = (renderData) => {
    return (
      <View style={{ flexDirection: "row" }}>
        {/* <TouchableOpacity onPress={() => onFilter('Coach')}>
          <View style={{marginVertical: 10, marginHorizontal: 10}}>
            <Text>Coach</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onFilter('Hitting Partner')}>
          <View style={{marginVertical: 10, marginHorizontal: 10}}>
            <Text>Hitting Partner</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onFilter('Ball Boy')}>
          <View style={{marginVertical: 10, marginHorizontal: 10}}>
            <Text>Ballboy</Text>
          </View>
        </TouchableOpacity> */}
      </View>
    );
  };

  const onFilter = (statusPartner) => {
    console.log("sebagai", statusPartner);

    const newArray = partners.filter(function (item) {
      // console.log('item filter be', item);
      // console.log('item filter', item.position);
      console.log("item hittinh partner", item.hittingpartner);
      let itemFilter = {};
      if (item.coach == "1") {
        itemFilter = "Coach";
        // console.log('item filter ya', itemFilter);
      } else if (item.hittingpartner == "1") {
        itemFilter = "hitting";
        // console.log('item filter ya', itemFilter);
      }

      console.log("item filter ya", itemFilter);
      return itemFilter === statusPartner;
    });
    console.log("new array", newArray);
  };

  const handleChangePartner = (rowID) => {
    let temp = partners.map((partners) => {
      if (rowID === partners.rowID) {
        return { ...partners, isChecked: !partners.isChecked };
      }
      return partners;
    });
    console.log("handlechange partner", temp);
    setPartnerBooking(temp);
  };

  // let selectedpartner = partners.filter(
  //   partners => partners.isChecked,
  //   partners.staff_first_name,
  // );

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
                <TouchableOpacity onPress={() => chooseCoba(item)}>
                  <Image
                    source={{ uri: item.url_picture }}
                    style={{ width: 60, height: 60, borderRadius: 50 }}
                  />
                  <Text style={{ textAlign: "center" }}>
                    {item.staff_first_name} {item.staff_last_name}
                  </Text>
                  <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                    {item.ballboy == 1
                      ? "Ballboy"
                      : item.coach == 1
                      ? "Coach"
                      : item.hittingpartner == 1
                      ? "Hitting Partner"
                      : null}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        )}
      />
    );
  };

  const onEditPartner = async (reservation_no, datapartner) => {
    console.log("reserv", reservation_no);
    console.log("data partner yg sudah terpilih", datapartner);
    //  setErrorSubmit(data.data.Error);
    setMessageSuccess(
      "Are you sure to change partner? The partner you previously selected will be deleted."
    );
    showConfirmModal(true);
    // const datapartner_choosed = datapartner;
    // navigation.navigate('ChooseEditPartner', {
    //   reservation_no,
    //   datapartner_choosed,
    // });
  };

  const onRemovePartner = async (data, reservation_no) => {
    console.log("data remove", data);
    console.log("reserv", reservation_no);

    await axios
      .delete(
        API_URL_LOKAL +
          `/modules/facilites/delete-reservation-parnter/` +
          reservation_no +
          "/" +
          data.staff_id
      )
      .then((data) => {
        console.log("data remove partner", data);
        //    setPartnerBooking(data.data.Data);

        setSpinner(false);
        onRefresh();
        getPartnerBooking();

        console.log("res pesan", data.data.Pesan);
        console.log("res error", data.data.Error);
        setErrorSubmit(data.data.Error);
        setMessageSuccess(data.data.Pesan);
        showModalSuccess(true);
      })
      .catch((error) => console.error(error))
      // .catch(error => console.error(error.response.data))
      .finally(() => setLoading(false));
  };

  //   const onRefresh = React.useCallback(() => {
  //     setRefreshing(true);
  //     wait(2000).then(() => setRefreshing(false));
  //   }, []);

  React.useEffect(() => {
    getPartnerBooking();
    const willFocusSubscription = props.navigation.addListener("focus", () => {
      getPartnerBooking();
    });

    return willFocusSubscription;
  }, []);

  const onRefresh = () => {
    setSpinner(true);
    setTimeout(() => {
      setSpinner(false);
    }, 5000);
  };

  const onAddPartner = () => {
    navigation.navigate("ChoosePartner", { reservation_no });
  };

  const onCancelBooking = async (onDetailBooking) => {
    // alert('ubah status cancel');
    //   console.log('data cancel', onDetailBooking);

    // const beforeHours = jambooking - h * 60 * 60 * 1000;
    const jambooking = onDetailBooking.databooking[0].start_date;
    console.log("jambooking", jambooking);

    const currentDateObj = new Date(jambooking);
    const numberOfMlSeconds = currentDateObj.getTime();
    const addMlSeconds = 60 * 60 * 1000;
    const newDateObj = new Date(numberOfMlSeconds + addMlSeconds);
    console.log(
      "newdateibj",
      currentDateObj
      //   moment(newDateObj).format('YYYY-MM-DD, HH:mm:ss'),
    );

    const data = {
      reservation_no: onDetailBooking.databooking[0].reservation_no,
      remarks: "Cancel",
      userid: onDetailBooking.databooking[0].audit_user,
      email: email,
    };

    console.log("data cancel booking", data);

    try {
      const res = await axios.post(
        API_URL_LOKAL + "/modules/facilities/cancel-booking",
        data
      );
      if (res) {
        console.log("res post", res);
        //  setDetailBooking(res.data.Data);
        //  setSpinner(false);
        setErrorSubmit(res.data.Error);
        setMessageSuccess(res.data.Pesan);
        showModalSuccess(true);
      }
      return res;
    } catch (err) {
      console.log("error cancel booking ya", err.response);
    }
  };

  const onCloseModal = () => {
    showModalSuccess(false);
    // navigation.navigate('Home');
    navigation.navigate("Facility");
  };

  const onKlikNo = () => {
    showConfirmModal(false);
    //  navigation.navigate('Home');
  };

  const onKlikYes = (reservation_no) => {
    console.log("reserv", reservation_no);
    showConfirmModal(false);
    onDeleteAllPartner(reservation_no);
    // onAddPartner();
  };

  const onDeleteAllPartner = async (reservation_no) => {
    const reserv_no = reservation_no;
    try {
      const data = await axios.delete(
        API_URL_LOKAL +
          `/modules/facilites/delete-reservation-parnter/` +
          reserv_no
      );
      if (data) {
        console.log("callback data delete all partner", data);
        setSpinner(false);
        getPartnerBooking();
        onAddPartner();

        // console.log('res pesan', data.data.Pesan);
        // console.log('res error', data.data.Error);
        // setErrorSubmit(data.data.Error);
        // setMessageSuccess(data.data.Pesan);
        // showModalSuccess(true);
      }
      return res;
    } catch (err) {
      console.log("error remove partner", err.response);
    }
  };

  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView, { flex: 1 }]}
      edges={["right", "top", "left"]}
    >
      <Header
        title={t("Booking List Detail")}
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

      <View>
        {spinner || onDetailBooking?.databooking?.length == 0 ? (
          //   <Text>loading</Text>
          <View>
            {/* <Spinner visible={this.state.spinner} /> */}
            <Placeholder style={{ marginVertical: 4, paddingHorizontal: 10 }}>
              <PlaceholderLine width={100} noMargin style={{ height: 40 }} />
            </Placeholder>
          </View>
        ) : onDetailBooking.databooking != undefined ||
          onDetailBooking.databooking != null ? (
          <View>
            {onDetailBooking?.databooking?.map((datas, index) => (
              <View key={index}>
                <Card
                  style={{ margin: 5, padding: 10 }}
                  key={index}
                  //   onPress={() => onDetailList(datas)}
                >
                  <View style={{ marginVertical: 10 }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        color:
                          datas.status == "B"
                            ? colors.primary
                            : datas.status == "C"
                            ? BaseColor.redColor
                            : datas.status == "D"
                            ? BaseColor.blueColor
                            : BaseColor.orangeColor,
                      }}
                    >
                      # {datas.reservation_no}
                    </Text>
                  </View>

                  <View style={{ marginVertical: 5 }}>
                    <Text style={{ fontSize: 14 }}>
                      {datas.status == "B"
                        ? "Booked"
                        : datas.status == "C"
                        ? "Canceled"
                        : datas.status == "O"
                        ? "Ongoing"
                        : datas.status == "D"
                        ? "Done"
                        : datas.status == "N"
                        ? "Not Show"
                        : null}{" "}
                      by {datas.last_update_by || route.params.last_update_by}
                      {/* ini berfungsi kalau datas.last update by nya kosong, jadinya ambil dari params list booking */}
                    </Text>
                  </View>

                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                      {datas.facility_name} - {datas.venue_name}
                    </Text>
                  </View>

                  <View style={{ marginTop: 5 }}>
                    <Text style={{ fontSize: 15 }}>
                      Start Play :{" "}
                      {/* {moment(datas.start_date).format('DD MMM YYYY HH:mm A')} */}
                      {moment(datas.start_date).format("DD MMM YYYY HH:mm")} -{" "}
                      {moment(datas.end_date).format("HH:mm")}
                    </Text>
                    <Text style={{ marginTop: 5, fontSize: 15 }}>
                      Duration time : {datas.duration}{" "}
                      {datas.duration > 1 ? "Hours" : "Hour"}
                    </Text>
                  </View>

                  {/* ------ untuk partner  */}
                  {onDetailBooking?.datapartner?.length != 0 ||
                  datas.status == "C" ||
                  datas.status == "N" ? (
                    <View
                      refreshControl={
                        <RefreshControl
                          colors={[colors.primary]}
                          tintColor={colors.primary}
                          refreshing={refreshing}
                          onRefresh={() => {}}
                        />
                      }
                    >
                      {/* <Text>{datapartner.staff_first_name}</Text> */}
                      {/* <View>{renderFilterPartner(onDetailBooking.datapartner)}</View> */}
                      {/* <Text>{userId}</Text>
                      <Text>{datas.audit_user}</Text> */}

                      {/* <ScrollView> */}

                      <View
                        style={{
                          //   paddingVertical: 20,
                          paddingTop: 20,
                          paddingBottom: 10,
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        {datas.status == "C" || datas.status == "N" ? null : (
                          <View style={{ alignSelf: "center" }}>
                            <Text style={{ fontWeight: "bold" }}>
                              Your Partners
                            </Text>
                          </View>
                        )}

                        {datas.countpartner <= 0 ? (
                          <Button
                            onPress={() => onAddPartner()}
                            style={{ height: 60, width: 60 }}
                          >
                            <IconIonicons
                              name="person-add"
                              size={20}
                              color={BaseColor.whiteColor}
                              style={{
                                justifyContent: "center",
                                alignContent: "center",
                                alignItems: "center",
                                alignSelf: "center",
                              }}
                            ></IconIonicons>
                            {/* <Text style={{fontSize: 14}}>Add Partner</Text> */}
                          </Button>
                        ) : null}
                      </View>

                      {onDetailBooking.datapartner.map((data, key) => (
                        <View>
                          <View
                            key={key}
                            style={{
                              flexDirection: "row",
                              marginTop: 10,
                              justifyContent: "space-between",
                            }}
                          >
                            <View style={{ flexDirection: "row" }}>
                              <Image
                                source={{ uri: data.url_picture }}
                                style={{
                                  width: 80,
                                  height: 80,
                                  borderRadius: 50,
                                }}
                              ></Image>
                              <View
                                style={{
                                  flexDirection: "column",
                                  paddingHorizontal: 10,

                                  alignSelf: "center",
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: 14,
                                    fontWeight: "bold",
                                  }}
                                >
                                  {data.staff_first_name} {data.staff_last_name}
                                </Text>
                                <Text>as a {data.position}</Text>
                                <Text>
                                  Status :{" "}
                                  {data.confirm_status == "U"
                                    ? "Unconfirm"
                                    : data.confirm_status == "W"
                                    ? "Waiting Confirm"
                                    : "Confirm"}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      ))}

                      {/* </ScrollView> */}
                    </View>
                  ) : (
                    <View>
                      <View
                        style={{
                          //   paddingVertical: 20,
                          paddingTop: 20,
                          paddingBottom: 10,
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <View style={{ alignSelf: "center" }}>
                          <Text style={{ fontWeight: "bold" }}>
                            Your Partners
                          </Text>
                        </View>

                        <Button
                          onPress={() => onAddPartner()}
                          style={{ height: 60, width: 60 }}
                        >
                          <IconIonicons
                            name="person-add"
                            size={20}
                            color={BaseColor.whiteColor}
                            style={{
                              justifyContent: "center",
                              alignContent: "center",
                              alignItems: "center",
                              alignSelf: "center",
                            }}
                          ></IconIonicons>
                          {/* <Text style={{fontSize: 14}}>Add Partner</Text> */}
                        </Button>
                      </View>

                      {/*
                      <Button onPress={() => onAddPartner()}>
                        <IconFontisto
                          name="trash"
                          size={20}
                          color={BaseColor.whiteColor}
                          style={{
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                          }}></IconFontisto>
                        <Text>Add Partner</Text>
                      </Button> */}
                      <View
                        style={{
                          alignSelf: "center",
                          justifyContent: "center",
                          alignContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            alignSelf: "center",
                            justifyContent: "center",
                            alignContent: "center",
                            alignItems: "center",
                          }}
                        >
                          You need a Hitting Partner? Click here to choose.
                        </Text>
                      </View>
                    </View>
                  )}
                  {/* ----- tutup untuk partner  */}

                  <View style={{ flexDirection: "row", paddingTop: 30 }}>
                    <View style={{ justifyContent: "flex-start", flex: 1 }}>
                      <View style={{ flexDirection: "row" }}>
                        {/* <Icon
                name="clock"
                size={20}
                color={colors.primary}
                enableRTL={true}
              /> */}
                        <Text
                          style={{
                            marginLeft: 18,
                            fontSize: 12,
                            color: BaseColor.grayColor,
                          }}
                        >
                          Reservation Time
                        </Text>
                      </View>

                      <View style={{ flexDirection: "row" }}>
                        <Icon
                          name="clock"
                          size={17}
                          color={BaseColor.grayColor}
                          enableRTL={true}
                        />
                        <Text
                          style={{ color: BaseColor.grayColor, fontSize: 12 }}
                        >
                          {" "}
                          {moment(datas.reservation_date).format(
                            "DD MMM YYYY,  HH:mm:ss"
                          )}
                        </Text>
                      </View>
                    </View>

                    {userId != datas.audit_user ? null : (
                      <View style={{ justifyContent: "flex-end" }}>
                        {datas.status == "B" ? (
                          <Button
                            onPress={() => onCancelBooking(onDetailBooking)}
                            style={{
                              height: 30,
                              width: 150,

                              backgroundColor: BaseColor.redColor,
                            }}
                          >
                            <Text style={{ fontSize: 15 }}>Cancel Booking</Text>
                          </Button>
                        ) : null}
                      </View>
                    )}
                  </View>
                </Card>
              </View>
            ))}
          </View>
        ) : (
          <Text>Not Available Data Booking</Text>
        )}
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

      <View
        style={{
          flex: 1,
          padding: 20,
          paddingTop: 20,
          backgroundColor: "white",
          // width: 200,
        }}
      >
        <Text style={{ fontWeight: "bold", marginBottom: 20 }}>Status Log</Text>
        {/* <Timeline
          timeContainerStyle={{ width: 130 }}
          lineColor={colors.primary}
          circleColor={colors.primary}
          options={{
            removeClippedSubviews: false,
          }}
          style={{ marginTop: 20, flex: 1, marginLeft: 10 }}
          data={datalogEdited}
          // data={dataDummy}
        /> */}
      </View>

      <View>
        <Modal
          isVisible={confirmModal}
          style={{ height: "100%" }}
          onBackdropPress={() => showConfirmModal(false)}
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
                {/* {errorSubmit == false ? 'Success!' : 'Ups, Failed!'}
                 */}
                Warning!
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
                  marginHorizontal: 15,
                  width: 70,
                  height: 40,
                }}
                onPress={() => onKlikNo()}
              >
                <Text style={{ fontSize: 13, color: BaseColor.whiteColor }}>
                  {t("No")}
                </Text>
              </Button>
              <Button
                style={{
                  marginTop: 10,
                  // marginBottom: 10,
                  backgroundColor: "#fff",
                  borderColor: colors.primary,
                  borderWidth: 2,
                  width: 70,
                  height: 40,
                }}
                onPress={() => onKlikYes(reservation_no)}
              >
                <Text style={{ fontSize: 13, color: colors.primary }}>
                  {t("Yes")}
                </Text>
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};
