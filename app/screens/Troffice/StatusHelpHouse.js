import { Image, SafeAreaView, Header, Tag } from "@components";
import Icon from "@components/Icon";
// import LabelUpper2Row from '@components/Label/Upper2Row';
import { BaseColor, Images, useTheme, BaseStyle } from "@config";
// import {FLinks} from '@data';
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
  TouchableHighlight,
  TouchableWithoutFeedback,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
// // import { Checkbox } from '@react-native-community/checkbox';
// import CheckBox from '@react-native-community/checkbox';
// import {Button, ProfileGroup} from '../../components';
import axios from "axios";
// import {EFilterColors, EFilterSizes, FRecentTransactions} from '@data';
// import ModalProduct from './ModalProduct';

// // or any pure javascript modules available in npm
import { Card } from "react-native-paper";
import styles from "./styles";
// import Modal from 'react-native-modal';
import { useSelector } from "react-redux";
import getUser from "../../selectors/UserSelectors";

import * as Utils from "@utils";
import moment from "moment";
import StatusHelp from "../Helpdesk/StatusHelp";
import { API_URL_LOKAL } from "@env";

const TABS = [
  {
    id: 1,
    title: "Approved",
    status: "A",
  },
  {
    id: 2,
    title: "On Process",
    status: "O",
  },
  // {
  //   id: 3,
  //   title: 'Done',
  //   status: 'D',
  // },
  {
    id: 3,
    title: "Cancel",
    status: "C",
  },
  // {
  //   id: 5,
  //   title: 'Not Show',
  //   status: 'N',
  // },
];

export default function StatusHelpHouse(props) {
  const { navigation, route } = props;
  //   // const {params} = props;
  //   console.log('routes from booking facility', route.params);
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [spinner, setSpinner] = useState(true);
  const users = useSelector((state) => getUser(state));
  const [email, setEmail] = useState(users.user);

  //   const deviceWidth = Dimensions.get('window').width;
  // const [loadingTab, setLoadingTab] = useState(true);
  const [dataBooking, setdataBooking] = useState([]);
  const [dataStatus1, setDataStatus1] = useState([]);
  const [dataStatus2, setDataStatus2] = useState([]);
  const [dataStatus3, setDataStatus3] = useState([]);
  console.log("dataStatus1", dataStatus1);
  // console.log('dataStatus2', dataStatus2);
  // console.log('dataStatus3', dataStatus3);
  const [tabChoosed, setTabChoosed] = useState(TABS[0]);

  const getListBooking = () => {
    setSpinner(true);
    const status1 = "A";
    const status2 = "O";
    const status3 = "C";

    const endpoints = [
      API_URL_LOKAL +
        `/modules/troffice/housekeeping-booking-status/` +
        email +
        "?" +
        "status=" +
        status1,
      API_URL_LOKAL +
        `/modules/troffice/housekeeping-booking-status/` +
        email +
        "?" +
        "status=" +
        status2,
      API_URL_LOKAL +
        `/modules/troffice/housekeeping-booking-status/` +
        email +
        "?" +
        "status=" +
        status3,
    ];
    console.log("endpoints", endpoints);
    axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then(
        axios.spread(
          (
            { data: dataStatus1 },
            { data: dataStatus2 },
            { data: dataStatus3 }
          ) => {
            console.log("res1: ", dataStatus1.Data);
            console.log("res2: ", dataStatus2.Data);
            console.log("res3: ", dataStatus3.Data);

            if (dataStatus1.Data) {
              setDataStatus1(dataStatus1.Data);
            }
            if (dataStatus2.Data) {
              setDataStatus2(dataStatus2.Data);
            }
            if (dataStatus3.Data) {
              setDataStatus3(dataStatus3.Data);
            }
          }
        )
      )
      .catch((error) => console.error("ini error if getbooking", error))
      .finally(() =>
        // setLoading(false),
        // setSpinnerHours(false),
        setSpinner(false)
      );
  };

  // useEffect(() => {
  //   getListBooking();
  // }, []);
  useEffect(() => {
    getListBooking();
  }, [tabChoosed]);

  const renderItemList1 = ({ item, index }) => {
    return (
      <Card
        style={{ margin: 5, padding: 10 }}
        key={index}
        // onPress={() => onDetailList(item)}
      >
        <View style={{ flexDirection: "row", flex: 1 }}>
          <View style={{ flex: 1 }}>
            <View style={{ marginVertical: 10 }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: colors.primary,
                }}
              >
                # {item.report_no}
              </Text>
            </View>

            <View style={{ marginVertical: 5 }}>
              <Text style={{ fontSize: 14 }}>
                {"Booking"} by {item.tenant_name}
                {/* nanti name berubah pake kolom baru */}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                {item.descs}
              </Text>
            </View>
          </View>
          {/* <View style={{justifyContent: 'space-between', marginTop: 10}}>
            <Image
              source={{uri: item.facility_picture}}
              style={{height: 100, width: 140, borderRadius: 10}}></Image>
          </View> */}
        </View>

        <View style={{ flexDirection: "row", flex: 1, paddingTop: 25 }}>
          <View style={{ justifyContent: "flex-start", flex: 1 }}></View>
          <View style={{ justifyContent: "flex-end" }}>
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
                {" "}
                Schedule Date
              </Text>
            </View>

            <View style={{ flexDirection: "row", marginLeft: 10 }}>
              <Icon
                name="clock"
                size={17}
                color={BaseColor.grayColor}
                enableRTL={true}
              />

              <Text style={{ color: BaseColor.grayColor, fontSize: 12 }}>
                {" "}
                {item.sch_date == null ? (
                  <Text>Subcscribe</Text>
                ) : (
                  moment(item.sch_date).format("DD MMM YYYY")
                )}
                {/* {moment(item.sch_date).format('DD MMM YYYY,  HH:mm:ss')} */}
              </Text>
            </View>
          </View>
        </View>
      </Card>
    );
  };
  const renderItemList2 = ({ item, index }) => {
    return (
      <Card
        style={{ margin: 5, padding: 10 }}
        key={index}
        // onPress={() => onDetailList(item)}
      >
        <View style={{ flexDirection: "row", flex: 1 }}>
          <View style={{ flex: 1 }}>
            <View style={{ marginVertical: 10 }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: BaseColor.blueColor,
                }}
              >
                # {item.report_no}
              </Text>
            </View>

            <View style={{ marginVertical: 5 }}>
              <Text style={{ fontSize: 14 }}>
                {"On Process"} by {item.tenant_name}
                {/* nanti name berubah pake kolom baru */}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                {item.descs}
              </Text>
            </View>
          </View>
          {/* <View style={{justifyContent: 'space-between', marginTop: 10}}>
            <Image
              source={{uri: item.facility_picture}}
              style={{height: 100, width: 140, borderRadius: 10}}></Image>
          </View> */}
        </View>

        <View style={{ flexDirection: "row", flex: 1, paddingTop: 25 }}>
          <View style={{ justifyContent: "flex-start", flex: 1 }}></View>
          <View style={{ justifyContent: "flex-end" }}>
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
                {" "}
                Schedule Date
              </Text>
            </View>

            <View style={{ flexDirection: "row", marginLeft: 10 }}>
              <Icon
                name="clock"
                size={17}
                color={BaseColor.grayColor}
                enableRTL={true}
              />
              <Text style={{ color: BaseColor.grayColor, fontSize: 12 }}>
                {" "}
                {item.sch_date == null ? (
                  <Text>Subcscribe</Text>
                ) : (
                  moment(item.sch_date).format("DD MMM YYYY")
                )}
                {/* {moment(item.sch_date).format('DD MMM YYYY,  HH:mm:ss')} */}
              </Text>
            </View>
          </View>
        </View>
      </Card>
    );
  };
  const renderItemList3 = ({ item, index }) => {
    return (
      <Card
        style={{ margin: 5, padding: 10 }}
        key={index}
        // onPress={() => onDetailList(item)}
      >
        <View style={{ flexDirection: "row", flex: 1 }}>
          <View style={{ flex: 1 }}>
            <View style={{ marginVertical: 10 }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: BaseColor.redColor,
                }}
              >
                # {item.report_no}
              </Text>
            </View>

            <View style={{ marginVertical: 5 }}>
              <Text style={{ fontSize: 14 }}>
                {"Canceled"} by {item.tenant_name}
                {/* nanti name berubah pake kolom baru */}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                {item.descs}
              </Text>
            </View>
          </View>
          {/* <View style={{justifyContent: 'space-between', marginTop: 10}}>
            <Image
              source={{uri: item.facility_picture}}
              style={{height: 100, width: 140, borderRadius: 10}}></Image>
          </View> */}
        </View>

        <View style={{ flexDirection: "row", flex: 1, paddingTop: 25 }}>
          <View style={{ justifyContent: "flex-start", flex: 1 }}></View>
          <View style={{ justifyContent: "flex-end" }}>
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
                {" "}
                Schedule Date
              </Text>
            </View>

            <View style={{ flexDirection: "row", marginLeft: 10 }}>
              <Icon
                name="clock"
                size={17}
                color={BaseColor.grayColor}
                enableRTL={true}
              />
              <Text style={{ color: BaseColor.grayColor, fontSize: 12 }}>
                {" "}
                {item.sch_date == null ? (
                  <Text>Subcscribe</Text>
                ) : (
                  moment(item.sch_date).format("DD MMM YYYY")
                )}
                {/* {moment(item.sch_date).format('DD MMM YYYY,  HH:mm:ss')} */}
              </Text>
            </View>
          </View>
        </View>
      </Card>
    );
  };

  const onDetailList = (item) => {
    console.log("item for detail list", item);
    navigation.navigate("BookingListDetail", item);
  };
  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView, { flex: 1 }]}
      edges={["right", "top", "left"]}
    >
      <Header
        title={t("Booking List")}
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
          paddingHorizontal: 15,
          paddingVertical: 14,
        }}
      >
        {TABS.map((tab) => (
          <View key={tab.id} style={{ flex: 1, padding: 2, paddingLeft: 20 }}>
            <Tag
              primary={true}
              style={{
                height: 50,
                width: 100,
                backgroundColor:
                  tab.id == tabChoosed.id ? colors.primary : colors.background,
              }}
              textStyle={{
                textAlign: "center",
                color:
                  tab.id == tabChoosed.id ? BaseColor.whiteColor : colors.text,
                fontSize: 15,
              }}
              _numberOfLines={0}
              onPress={() => setTabChoosed(tab)}
            >
              {/* <View style={{}}> */}
              <Text
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignContent: "space-between",
                }}
              >
                {tab.title}
              </Text>
              {/* </View> */}
            </Tag>
          </View>
        ))}
      </View>

      <View style={{ flex: 1 }}>
        {tabChoosed.status == "A" ? (
          spinner == true ? (
            <View>
              <ActivityIndicator size="large" color="#37BEB7" />
            </View>
          ) : dataStatus1 == null || dataStatus1 == "" ? (
            <View
              style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}
            >
              <Text>Data not available</Text>
            </View>
          ) : (
            <FlatList
              contentContainerStyle={{ paddingHorizontal: 20 }}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={dataStatus1.sort((a, b) =>
                a.report_no.localeCompare(b.report_no)
              )}
              keyExtractor={(item) => item.report_no}
              renderItem={renderItemList1}
              //   renderItem={({item, index}) => (
              //     <View key={index}>
              //       <Text>{item.facility_name}</Text>
              //     </View>

              //   )}
            />
          )
        ) : null}

        {tabChoosed.status == "O" ? (
          spinner == true ? (
            <View>
              <ActivityIndicator size="large" color="#37BEB7" />
            </View>
          ) : dataStatus2 == null || dataStatus2 == "" ? (
            <View
              style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}
            >
              <Text>Data not available</Text>
            </View>
          ) : (
            <FlatList
              contentContainerStyle={{ paddingHorizontal: 20 }}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={dataStatus2.sort((a, b) =>
                a.report_no.localeCompare(b.report_no)
              )}
              keyExtractor={(item) => item.report_no}
              renderItem={renderItemList2}
              //   renderItem={({item, index}) => (
              //     <View key={index}>
              //       <Text>{item.facility_name}</Text>
              //     </View>

              //   )}
            />
          )
        ) : null}

        {tabChoosed.status == "C" ? (
          spinner == true ? (
            <View>
              <ActivityIndicator size="large" color="#37BEB7" />
            </View>
          ) : dataStatus3 == null || dataStatus3 == "" ? (
            <View
              style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}
            >
              <Text>Data not available</Text>
            </View>
          ) : (
            <FlatList
              contentContainerStyle={{ paddingHorizontal: 20 }}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={dataStatus3.sort((a, b) =>
                a.report_no.localeCompare(b.report_no)
              )}
              keyExtractor={(item) => item.report_no}
              renderItem={renderItemList3}
              //   renderItem={({item, index}) => (
              //     <View key={index}>
              //       <Text>{item.facility_name}</Text>
              //     </View>

              //   )}
            />
          )
        ) : null}
      </View>

      {/* <View>
        <Text>ini booking list</Text>
      </View> */}
    </SafeAreaView>
  );
}
