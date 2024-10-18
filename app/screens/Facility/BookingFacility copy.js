import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  ScrollView,
  View,
  Animated,
  ActivityIndicator,
  TouchableOpacity,
  Picker,
  Dimensions,
} from "react-native";
import styles from "./styles";
import {
  CardChannelGrid,
  CardSlide,
  CategoryList,
  News43,
  ListFacility,
  PlaceholderLine,
  Placeholder,
  Button,
  SafeAreaView,
  ProductSpecGrid,
  Text,
  Header,
  Image,
  Icon,
  Tag,
  colors,
  ListOptionSelected,
  VenueSelectOption,
} from "@components";
import moment from "moment";
import { enableExperimental } from "@utils";

import axios from "axios";
import { BaseColor, BaseStyle, Images, useTheme } from "@config";
import { useNavigation, useRoute } from "@react-navigation/core";
import { ListTransactionExpand } from "../../components";
import { TabView, SceneMap } from "react-native-tab-view";
import ModalProduct from "./ModalProduct";

import { useSelector } from "react-redux";
import getUser from "../../selectors/UserSelectors";

import { FTypes } from "@data";
import { API_URL_LOKAL } from "@env";

function BookingFacility({ route }) {
  // console.log('route in booking facility', route.params);
  const [data, setData] = useState([]);
  const [databookdate, setDatabookDate] = useState([]);
  const [params, setParams] = useState(route?.params);
  // console.log('params for venue code ?', params);
  const [timedate, setTimeDate] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState({});
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [selectedValue, setSelectedValue] = useState("");
  const [IDTab, setIDTab] = useState("");
  const [tabsDate, setTabDate] = useState([]);
  const [days, setDays] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible_2, setModalVisible_2] = useState(false);

  const [spinner, setSpinner] = useState(true);
  const [spinnerHour, setSpinnerHours] = useState(true);

  const users = useSelector((state) => getUser(state));
  const [email, setEmail] = useState(users.user);
  const [dataTowerUser, setdataTowerUser] = useState([]);
  const [arrDataTowerUser, setArrDataTowerUser] = useState([]);

  const [venueChoosed, setVenueChoosed] = useState({ dataVenue });
  const [dataVenue, setDataVenue] = useState([]);
  const [titlenull, setTitle] = useState(false);
  const [dataBooked1, setDataBooked1] = useState([]);
  const [dataBooked2, setDataBooked2] = useState([]);
  const [dataBooked3, setDataBooked3] = useState([]);
  const [dataBooked4, setDataBooked4] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL_LOKAL + "/home/common-current-time")
      .then((time) => {
        console.log("time from server?", time.data);
        setTime(time.data);
      })
      // .catch(error => console.error(error))
      .catch((error) => console.error(error.response.data))
      .finally(() => setLoading(false));
  }, []);

  const datatime = {
    timeget: time.tanggal,
    daily: time.jam,
  };
  // console.log('timeee', datatime);

  const d = datatime.daily;
  // console.log('daily', d);

  const setBody = {
    entity_cd: "01",
    project_no: "01",
    facility_cd: "CA",
    book_date: datatime.timeget,
  };

  useEffect(() => {
    axios
      .get(
        API_URL_LOKAL +
          `/modules/facilities/booking-hours-by-date?entity_cd=01&project_no=01&facility_cd=CA&book_date=2021-12-07&id=1`
      )
      .then((data) => {
        console.log("timedate", data.data);
        setTimeDate(data[0]);

        setSpinner(false);
      })
      // .catch(error => console.error(error))
      .catch((error) => console.error(error.response.data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    // fetchDataDays();
  }, []);

  const TABS = [
    {
      id: 1,
      title: data[0]?.book_date,
      close: data[0]?.close_status,
    },
    {
      id: 2,
      title: data[1]?.book_date,
      close: data[1]?.close_status,
    },
    {
      id: 3,
      title: data[2]?.book_date,
      close: data[2]?.close_status,
    },
    {
      id: 4,
      title: data[3]?.book_date,
      close: data[3]?.close_status,
    },
  ];
  const [tab, setTab] = useState(TABS[0]);

  const tab1 = data.filter((x) => x.id == "1");
  const tab2 = data.filter((x) => x.id == "2");
  const tab3 = data.filter((x) => x.id == "3");
  const tab4 = data.filter((x) => x.id == "4");

  useEffect(() => {
    const id = route?.params?.id;
    console.log("id akan di foreach", route?.params);
    if (id) {
      TABS.forEach((tab) => {
        tab.id == id && setTab(tab);
      });
    }
  }, [route?.params?.id]);
  const obj = [{ ...data }];

  // console.log('losdsa', obj);

  const ItemView = ({ item }) => {
    return (
      <View
        style={{
          marginVertical: 5,
          paddingHorizontal: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignContent: "space-between",
          borderRadius: 15,
          borderColor: "#dbdbdb",
          borderBottomWidth: 1,
          padding: 10,
        }}
      >
        <Text bold>{item.slot_hours}</Text>
        <TouchableOpacity
          style={{
            backgroundColor: colors.primary,
            padding: 15,
            borderRadius: 15,
          }}
        >
          <Text whiteColor subheadline bold>
            Booking
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    // getTower();
    // const getTower = () => {
    const datas = {
      email: email,
      app: "O",
    };

    // console.log('for  data daate', datas);

    const config = {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        // token: "",
      },
    };
    console.log(
      "url api tower",
      API_URL_LOKAL + `/home/common-project/mysql/${datas.email}/${datas.app}`
    );
    axios
      .get(
        API_URL_LOKAL +
          `/home/common-project/mysql/${datas.email}/${datas.app}`,
        {
          config,
        }
      )
      .then((res) => {
        const datas = res.data;
        // console.log('tower entity projek', datas);
        const arrDataTower = datas.Data;
        console.log("tower entity arrDataTower", arrDataTower[0]);
        setdataTowerUser(arrDataTower[0]);
        // getDateBook(arrDataTower[0]);

        // getBooked(arrDataTower[0], databookdate, '');
        // arrDataTower.map(dat => {
        //   if (dat) {
        //     setdataTowerUser(dat);
        //     getDateBook(dat);

        //     getBooked(dat);
        //   }
        // });
        setArrDataTowerUser(arrDataTower);

        setTimeout(() => {
          setSpinner(false);
        }, 1000);
      })
      // .catch(error => console.error(error))
      .catch((error) => console.error(error.response.data))
      .finally(() => setLoading(false));
    // };
  }, []);

  useEffect(() => {
    getDateBook(dataTowerUser);
  }, [dataTowerUser]);

  const getDateBook = (datas) => {
    // console.log('tes save entioty,', dataTowerUser);
    const entity_cd = datas.entity_cd;
    // console.log('next abis tower datebook', entity_cd);
    const project_no = datas.project_no;
    const obj_data = params;

    axios
      .get(
        API_URL_LOKAL +
          `/modules/facilitites/booking-hours?entity_cd=` +
          entity_cd +
          `&project_no=` +
          project_no +
          `&facility_cd=` +
          obj_data.facility_cd
      )
      .then((res) => {
        // console.log('data get date book', res.data[0]);
        // console.log('datas nih dipake buat entity projek', datas);
        setData(res.data);
        setDatabookDate(res.data);
        getdata();
        getBooked(datas, res.data, "");
        setSpinner(false);
      })
      // .catch(error => console.error(error))
      .catch((error) => console.error(error.response.data))
      .finally(() => setLoading(false));
  };

  const getdata = () => {
    const entity_cd = dataTowerUser.entity_cd;
    // console.log('next abis tower getdata', dataTowerUser);
    const project_no = dataTowerUser.project_no;
    const obj_data = params;
    //ini bentuknya array, hany ambil yang array 0 aja, krn kayaknya sama semua deh facility_cd nya
    // console.log('obj data', obj_data);
    const params_api =
      "?" +
      "entity_cd=" +
      entity_cd +
      "&" +
      "project_no=" +
      project_no +
      "&" +
      "facility_cd=" +
      obj_data.facility_cd;

    axios
      .get(API_URL_LOKAL + "/facility/book/venue" + params_api)
      .then((res) => {
        // console.log('ress facility book venue:', res.data);
        // setData(res.data);
        setDataVenue(res.data.data);
        // console.log('datavenue', res.data.data);
      })
      .catch((error) => console.error(error.response.data));
  };

  // useEffect(() => {
  //   console.log('sblm dilempar params bookdate', databookdate);
  //   getBooked(dataTowerUser, databookdate, '');
  // }, [dataTowerUser, databookdate]);

  const getBooked = (datas, databookdates, venue_klik) => {
    console.log("option", venue_klik);
    const entity_cd = datas.entity_cd;
    console.log("next abis tower", datas);
    const project_no = datas.project_no;
    const obj_data = params;
    // const databookdates = databookdate;
    // console.log('data obj_data', obj_data);
    console.log("data book date atas", databookdates);

    if (venue_klik == undefined || venue_klik == null || venue_klik == "") {
      console.log("option if", venue_klik);
      const entity_cd = datas.entity_cd;
      console.log("next abis tower if", entity_cd);
      const project_no = datas.project_no;
      const obj_data = params;
      // const databookdates = databookdate;
      // console.log('data obj_data', obj_data);
      console.log("data book date if", databookdates);

      // alert('undefined');
      const params_api =
        "?" +
        "entity_cd=" +
        entity_cd +
        "&" +
        "project_no=" +
        project_no +
        "&" +
        "facility_cd=" +
        obj_data.facility_cd +
        "&" +
        "venue_cd=" +
        obj_data.venue[0].venue_cd;
      //  venue_klik;
      // 'SB';

      // console.log(
      //   'params booked',
      //   params_api + '&' + 'book_date=' + databookdates.book_date + '&id=1',
      // );
      console.log(
        "url params",
        API_URL_LOKAL +
          "/modules/facilities/booking-hours-by-venue" +
          params_api +
          "&" +
          "book_date=" +
          // '2021-12-15' +
          databookdates[2].book_date +
          "&id=1"
      );
      axios
        .all([
          axios.get(
            API_URL_LOKAL +
              `/modules/facilities/booking-hours-by-venue` +
              params_api +
              "&" +
              "book_date=" +
              databookdates[0].book_date +
              // '2021-12-15' +
              `&id=1`
          ),
          axios.get(
            API_URL_LOKAL +
              `/modules/facilities/booking-hours-by-venue` +
              params_api +
              "&" +
              "book_date=" +
              databookdates[1].book_date +
              // '2021-12-15' +
              `&id=2`
          ),
          axios.get(
            API_URL_LOKAL +
              `/modules/facilities/booking-hours-by-venue` +
              params_api +
              "&" +
              "book_date=" +
              databookdates[2].book_date +
              // '2021-12-15' +
              `&id=3`
          ),
          axios.get(
            API_URL_LOKAL +
              `/modules/facilities/booking-hours-by-venue` +
              params_api +
              "&" +
              "book_date=" +
              databookdates[3].book_date + // '2021-12-15' + // data[3]?.book_date +
              `&id=4`
          ),
        ])
        .then(
          axios.spread((res1, res2, res3, res4) => {
            // console.log('data', res.data[0])s
            console.log("res1 created if: ", res1.data);
            console.log("res2 created: ", res2.data);
            // console.log('res3 created: ', res3.data);
            // console.log('res4 created: ', res4.data);

            // setData(res1.data);
            setDataBooked1(res1.data);
            setDataBooked2(res2.data);
            setDataBooked3(res3.data);
            setDataBooked4(res4.data);

            setTimeout(() => {
              setSpinnerHours(false);
              // setSpinner(false);
            }, 8000);
          })
        )
        .catch((error) => console.error(error.response.data))
        .finally(
          () => setLoading(false)
          // setSpinnerHours(false),
          // setSpinner(false),
        );
    } else {
      console.log("option else", venue_klik);
      const entity_cd = datas.entity_cd;
      console.log("next abis tower else", entity_cd);
      const project_no = datas.project_no;
      const obj_data = params;
      // const databookdates = databookdate;
      // console.log('data obj_data', obj_data);
      console.log("data book date else", databookdates);

      const params_api =
        "?" +
        "entity_cd=" +
        entity_cd +
        "&" +
        "project_no=" +
        project_no +
        "&" +
        "facility_cd=" +
        obj_data.facility_cd +
        "&" +
        "venue_cd=" +
        // obj_data.venue[0].venue_cd;
        venue_klik;
      // 'SB';

      axios
        .all([
          axios.get(
            API_URL_LOKAL +
              `/modules/facilities/booking-hours-by-venue` +
              params_api +
              "&" +
              "book_date=" +
              databookdates[0].book_date +
              // '2021-12-15' +
              `&id=1`
          ),
          axios.get(
            API_URL_LOKAL +
              `/modules/facilities/booking-hours-by-venue` +
              params_api +
              "&" +
              "book_date=" +
              databookdates[1].book_date +
              `&id=2`
          ),
          axios.get(
            API_URL_LOKAL +
              `/modules/facilities/booking-hours-by-venue` +
              params_api +
              "&" +
              "book_date=" +
              databookdates[2].book_date +
              `&id=3`
          ),
          axios.get(
            API_URL_LOKAL +
              `/modules/facilities/booking-hours-by-venue` +
              params_api +
              "&" +
              "book_date=" +
              databookdates[3].book_date +
              // '2021-12-15' +
              `&id=4`
          ),
        ])
        .then(
          axios.spread((res1, res2, res3, res4) => {
            // console.log('data', res.data[0])s
            console.log("res1 created else: ", res1.data);
            console.log("res2 created: ", res2.data);
            // console.log('res3 created: ', res3.data);
            // console.log('res4 created: ', res4.data);

            // setData(res1.data);
            // setDataBooked1(res1.data);
            // setDataBooked2(res2.data);
            // setDataBooked3(res3.data);
            // setDataBooked4(res4.data);
            setDataBooked1(res1.data);
            setDataBooked2(res2.data);
            setDataBooked3(res3.data);
            setDataBooked4(res4.data);
            setTimeout(() => {
              setSpinnerHours(false);
              // setSpinner(false);
            }, 8000);
          })
        )
        .catch((error) => console.error(error.response.data))

        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setSpinnerHours(false);
    }, 8000);
  }, []);

  const onChangeOption = (option) => {
    console.log("option klik", option.venue_cd);
    const venue_klik = option.venue_cd;
    setVenueChoosed(option);
    setTitle(true);
    getBooked(dataTowerUser, databookdate, venue_klik);
    setTimeout(() => {
      setModalVisible_2(false);
    }, 200);
  };

  const onBookingPress = (items, jam_booking) => {
    console.log("items for booking detail", items);
    console.log("jam booking", jam_booking);
    const item = {
      items: items,
      jam_booking: jam_booking,
    };
    console.log("items all", item);
    // setModalVisible(true);
    navigation.navigate("BookingDetail", item);
  };

  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView, { flex: 1 }]}
      edges={["right", "top", "left"]}
    >
      <Header
        title={t("Choose Schedule")}
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
      <ScrollView contentContainerStyle={styles.paddingSrollView}>
        <View
          style={{
            backgroundColor: colors.primary,
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
            borderRadius: 15,
            padding: 10,
          }}
        >
          <Text headline whiteColor>
            Tennis
          </Text>
          {/* <Text>{datatime.timeget}</Text> */}
        </View>
        <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
          <Text subheadline bold>
            Choose Venue
          </Text>
          <ListOptionSelected
            style={{ marginTop: 10 }}
            textLeft={
              titlenull == false
                ? params.venue[0].venue_name
                : venueChoosed?.venue_name
            }
            // textRight={venueChoosed?.venue_name}
            onPress={() => setModalVisible_2(true)}
          />

          <VenueSelectOption
            isVisible={modalVisible_2}
            options={dataVenue}
            onChange={onChangeOption}
            venueChoosed={venueChoosed}
            onSwipeComplete={() => setModalVisible_2(false)}
          />
        </View>

        <View style={{ marginTop: 30, paddingHorizontal: 10 }}>
          <Text subheadline bold>
            Today
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "space-between",
            borderRadius: 15,
            borderColor: colors.dark,
            borderBottomWidth: 1,
            padding: 10,
            marginBottom: 15,
            marginTop: 10,
          }}
        >
          {/* <Text headline whiteColor>
            Tennis
          </Text> */}
          <Text>{datatime.timeget}</Text>
          {/* <Text>{datatime.daily}</Text> */}

          <Icon
            name="calendar-week"
            size={20}
            color={colors.primary}
            enableRTL={true}
          />
        </View>

        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginVertical: 20 }}>
            {/* <Text title2>Ticket</Text>
          <Text headline style={{fontWeight: 'normal'}}>
            Book Screen
          </Text> */}
            {spinner ? (
              <View>
                {/* <Spinner visible={this.state.spinner} /> */}
                <Placeholder
                  style={{ marginVertical: 4, paddingHorizontal: 10 }}
                >
                  <PlaceholderLine
                    width={100}
                    noMargin
                    style={{ height: 40 }}
                  />
                </Placeholder>
              </View>
            ) : (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {TABS.map((item, index) => (
                  <View key={index} style={{ flex: 1, paddingHorizontal: 5 }}>
                    <Tag
                      outline
                      style={{
                        height: 60,
                        width: 60,
                        marginBottom: 20,

                        flexDirection: "column",
                        backgroundColor:
                          tab.id == item.id
                            ? colors.primary
                            : colors.background,
                      }}
                      onPress={() => {
                        enableExperimental();
                        setTab(item);
                      }}
                    >
                      <View
                        style={{
                          flexGrow: 1,
                          flexDirection: "row",
                        }}
                      >
                        <Text
                          bold
                          body1={tab.id != item.id}
                          light={tab.id != item.id}
                          whiteColor={tab.id == item.id}
                          style={{ textAlign: "center" }}
                        >
                          {moment(item.title)
                            .format("DD MMM")
                            .replace(" ", "\n")}
                        </Text>
                      </View>
                    </Tag>
                  </View>
                ))}
              </View>
            )}

            {/* ---coba ya */}
            {spinnerHour ? (
              <View>
                {/* <Spinner visible={this.state.spinner} /> */}
                <Placeholder
                  style={{ marginVertical: 4, paddingHorizontal: 10 }}
                >
                  <PlaceholderLine
                    width={100}
                    noMargin
                    style={{ height: 40 }}
                  />
                </Placeholder>
              </View>
            ) : (
              <View style={{ flex: 1, paddingHorizontal: 20 }}>
                {(tab.id == 1 && dataBooked1.close_status == "N") ||
                dataBooked1.slot_hours == null ||
                dataBooked1.slot_hours.length == 0 ? (
                  <Text>not available facility</Text>
                ) : dataBooked1.slot_hours == null ||
                  dataBooked1.slot_hours.length == 0 ||
                  dataBooked1.slot_hours == undefined ||
                  dataBooked1.slot_hours == "Data Not Avalable" ? (
                  <Text>nit available</Text>
                ) : (
                  dataBooked1.slot_hours.map((items, indexs) => (
                    <View
                      key={indexs}
                      style={{
                        paddingVertical: 15,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignContent: "space-between",
                        borderRadius: 15,
                        borderColor: "#dbdbdb",
                        borderBottomWidth: 1,
                      }}
                    >
                      <Text key={items.id} bold>
                        {items.jam}
                      </Text>
                      {/* <Text key={items.id} bold>
                        {time.jam > items.jam
                          ? 'lebih dari jam'
                          : 'kurang dari jam'}
                      </Text> */}
                      {/* <Text>
                        {console.log('items databook', items.databook)}
                      </Text> */}
                      {items.databook != ""
                        ? items.databook.map((itemdatabook, keys) => (
                            <View key={keys}>
                              <Text>{itemdatabook.remarks}</Text>
                              <Text>{itemdatabook.name}</Text>
                              <Text>{itemdatabook.reservation_no}</Text>
                              <Text>{itemdatabook.venue_name}</Text>
                            </View>
                          ))
                        : null}

                      <TouchableOpacity
                        disabled={
                          items.status_avail != "Y" || time.jam > items.jam
                            ? true
                            : false
                        }
                        onPress={() => onBookingPress(dataBooked1, items.jam)}
                        style={{
                          backgroundColor:
                            items.status_avail == "Y" && time.jam < items.jam
                              ? colors.primary
                              : BaseColor.redColor,
                          padding: 15,
                          borderRadius: 15,
                        }}
                      >
                        <Text whiteColor subheadline bold>
                          Booking
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ))
                )}
              </View>
            )}

            {spinnerHour ? (
              <View>
                {/* <Spinner visible={this.state.spinner} /> */}
                <Placeholder
                  style={{ marginVertical: 4, paddingHorizontal: 10 }}
                >
                  <PlaceholderLine
                    width={100}
                    noMargin
                    style={{ height: 40 }}
                  />
                </Placeholder>
              </View>
            ) : (
              <View style={{ flex: 1, paddingHorizontal: 20 }}>
                {tab.id == 2 && dataBooked2.close_status == "N" ? (
                  <Text
                    style={{
                      alignSelf: "center",
                      alignContent: "center",
                      alignItems: "center",
                      flex: 1,
                      height: "100%",
                    }}
                  >
                    Not Available Facility
                  </Text>
                ) : (
                  dataBooked2.slot_hours.map((items, indexs) => (
                    <Text>ini id 2</Text>
                  ))
                )}
                {/* // null */}
              </View>
            )}

            {spinnerHour ? (
              <View>
                {/* <Spinner visible={this.state.spinner} /> */}
                <Placeholder
                  style={{ marginVertical: 4, paddingHorizontal: 10 }}
                >
                  <PlaceholderLine
                    width={100}
                    noMargin
                    style={{ height: 40 }}
                  />
                </Placeholder>
              </View>
            ) : (
              <View style={{ flex: 1, paddingHorizontal: 20 }}>
                {tab.id == 3 &&
                  dataBooked3.slot_hours.map((items, indexs) => (
                    <View
                      key={indexs}
                      style={{
                        paddingVertical: 15,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignContent: "space-between",
                        borderRadius: 15,
                        borderColor: "#dbdbdb",
                        borderBottomWidth: 1,
                      }}
                    >
                      <Text key={items.id} bold>
                        {items.jam}
                      </Text>

                      {items.databook != ""
                        ? items.databook.map((itemdatabook, keys) => (
                            <View key={keys}>
                              <Text>{itemdatabook.remarks}</Text>
                              <Text>{itemdatabook.name}</Text>
                              <Text>{itemdatabook.reservation_no}</Text>
                            </View>
                          ))
                        : null}

                      <TouchableOpacity
                        disabled={
                          items.status_avail != "Y" || time.jam > items.jam
                            ? true
                            : false
                        }
                        onPress={() => onBookingPress()}
                        style={{
                          backgroundColor:
                            items.status_avail == "Y"
                              ? colors.primary
                              : BaseColor.redColor,
                          padding: 15,
                          borderRadius: 15,
                        }}
                      >
                        <Text whiteColor subheadline bold>
                          Booking
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ))}
              </View>
            )}

            {spinnerHour ? (
              <View>
                {/* <Spinner visible={this.state.spinner} /> */}
                <Placeholder
                  style={{ marginVertical: 4, paddingHorizontal: 10 }}
                >
                  <PlaceholderLine
                    width={100}
                    noMargin
                    style={{ height: 40 }}
                  />
                </Placeholder>
              </View>
            ) : (
              <View style={{ flex: 1, paddingHorizontal: 20 }}>
                {tab.id == 4 &&
                  dataBooked4.slot_hours.map((items, indexs) => (
                    <View
                      key={indexs}
                      style={{
                        paddingVertical: 15,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignContent: "space-between",
                        borderRadius: 15,
                        borderColor: "#dbdbdb",
                        borderBottomWidth: 1,
                      }}
                    >
                      <Text key={items.id} bold>
                        {items.jam}
                      </Text>

                      {items.databook != ""
                        ? items.databook.map((itemdatabook, keys) => (
                            <View key={keys}>
                              <Text>{itemdatabook.remarks}</Text>
                              <Text>{itemdatabook.name}</Text>
                              <Text>{itemdatabook.reservation_no}</Text>
                            </View>
                          ))
                        : null}

                      <TouchableOpacity
                        disabled={
                          items.status_avail != "Y" || time.jam > items.jam
                            ? true
                            : false
                        }
                        onPress={() => onBookingPress()}
                        style={{
                          backgroundColor:
                            items.status_avail == "Y"
                              ? colors.primary
                              : BaseColor.redColor,
                          padding: 15,
                          borderRadius: 15,
                        }}
                      >
                        <Text whiteColor subheadline bold>
                          Booking
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ))}
              </View>
            )}
          </View>
        </ScrollView>
      </ScrollView>
      {/* <ModalProduct
        // colorChoosedInit={colorChoosed}
        // sizeChoosedInit={sizeChoosed}
        // item={productData}
        isVisible={modalVisible}
        onSwipeComplete={() => setModalVisible(false)}
        onApply={() => {
          setModalVisible(false);
          navigation.navigate('BookingDetail');
        }}
      /> */}
    </SafeAreaView>
  );
}

export default BookingFacility;
