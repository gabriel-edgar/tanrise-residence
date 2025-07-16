import {
  CardReport03,
  CardReport08,
  CardReport07,
  ProfileGridSmall,
  SafeAreaView,
  Text,
  Header,
  Transaction2Col,
  Icon,
  Tag,
  Price3Col,
  ListTransactionExpand,
} from "@/components";
import { BaseStyle, useTheme } from "@/config";
import { FRecentTransactions, FHotNews } from "@/data";
import { useNavigation, useRoute } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { enableExperimental } from "@/utils";
import SegmentedControl from "./SegmendControl";

import moment from "moment";

import {
  ScrollView,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

import getUser from "../../selectors/UserSelectors";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import numFormat from "../../components/numFormat";
import DynamicTabView from "react-native-dynamic-tab-view";
import styles from "./styles";
import { baseURL as API_URL_LOKAL } from "@/controllers/HttpClient";

const Segmented = ({
  isCenter = false,
  isPrimary = false,
  style = {},
  onPress = () => {},
  disabled = false,
}) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const user = useSelector((state) => getUser(state));
  const [hasError, setErrors] = useState(false);
  const [bill, setBill] = useState([]);
  const [data, setData] = useState([]);
  const [time, setTime] = useState([]);
  const [hours, setHours] = useState([]);
  const [days, setDays] = useState([]);
  const [tabIndex, setTabIndex] = React.useState(1);
  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  const [dataCurrent, setDataCurrent] = useState([]);

  // Make function to call the api
  async function fetchData() {
    try {
      const res = await axios.get(
        API_URL_LOKAL + `/home/common-projectDue/IFCAPB/${user.user}`
      );
      setDataCurrent(res.data.Data);
      console.log("datasss", data);
    } catch (error) {
      setErrors(error.ressponse.data);
      alert(hasError.toString());
    }
  }

  async function fetchDataTime() {
    try {
      const res = await axios.get(API_URL_LOKAL + "/home/common-current-time");
      setTime(res.data.Data);
      console.log("time", time);
    } catch (error) {
      setErrors(error.ressponse.data);
      alert(hasError.toString());
    }
  }

  async function fetchDataDays() {
    try {
      const res = await axios.get(
        API_URL_LOKAL +
          "/facility/book/days?entity_cd=01&project_no=01&facility_cd=CA"
      );
      setDays(res.data);
      console.log("days", res.data);
    } catch (error) {
      setErrors(error.ressponse.data);
      alert(hasError.toString());
    }
  }

  async function fetchDataHours() {
    try {
      const res = await axios.get(
        API_URL_LOKAL + "/modules/facilitites/booking-hours",
        {
          params: {
            id: "01",
            entity_cd: "01",
            project_no: "01",
            facility_cd: "CA",
            book_date: "2021-12-06",
          },
        }
      );
      setHours(res.data);
      console.log("hours", res.data);
    } catch (error) {
      setErrors(error.ressponse.data);
      alert(hasError.toString());
    }
  }

  // const daysTime = days.map(y =>
  //   y.slot_hours.map(x => {
  //     return (
  //       <View>
  //         <Text>{x.jam}</Text>
  //       </View>
  //     );
  //   }),
  // );

  // // console.log('daytimess', daysTimes);
  // console.log('daytime', daysTime);

  const daysArray = days.map((sweetItem) => {
    return {
      id: sweetItem.id,
      title: moment(sweetItem.book_date).format("DD MMM").replace(" ", "\n"),
      book: sweetItem.slot_hours.map((x) => x.jam),
    };
  });
  console.log("daytime", daysArray);

  // let arr3 = daysArray.map((item, i) =>
  //   Object.assign({}, item, hours[i].slot_hours),
  // );
  // console.log('arr3', arr3);

  const renderItem = (item, index) => {
    console.log("rendder", renderItem);

    return (
      // <View key={item['id']} style={{flex: 1}}>
      //   <Text key={item['id']}>{item['book']}</Text>
      // </View>
      <View
        key={item["id"]}
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
        <TouchableOpacity>
          <Text bold style={{ padding: 20 }}>
            {item["book"]}
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={{
            backgroundColor: colors.primary,
            padding: 15,
            borderRadius: 15,
          }}>
          <Text whiteColor subheadline bold>
            Booking
          </Text>
        </TouchableOpacity> */}
      </View>
    );
  };

  const defaultIndex = useState(0);

  const onChangeTab = (index) => {};

  useEffect(() => {
    fetchData();
    fetchDataTime();
    fetchDataDays();
    fetchDataHours();
  }, []);

  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView, { flex: 1 }]}
      edges={["right", "top", "left"]}
    >
      <Header
        title={t("Billing")}
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
      {/* <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}> */}
      <DynamicTabView
        data={daysArray}
        renderTab={renderItem}
        defaultIndex={defaultIndex}
        onChangeTab={onChangeTab}
        DynamicdefaultStyle
        headerTextStyle={styles.title}
        containerStyle={styles.container}
        headerBackgroundColor={"white"}
        headerUnderLayColor={"blue"}
      />
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default Segmented;
