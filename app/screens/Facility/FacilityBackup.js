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
} from "@components";
import moment from "moment";
import { enableExperimental } from "@utils";

import axios from "axios";
import { BaseColor, BaseStyle, Images, useTheme } from "@config";
import { useNavigation, useRoute } from "@react-navigation/core";

function BookingFacility1({ route }) {
  const [data, setData] = useState([]);
  const [timedate, setTimeDate] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState({});
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [selectedValue, setSelectedValue] = useState("");
  const [IDTab, setIDTab] = useState("");
  const [tabsDate, setTabDate] = useState([]);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    axios
      .get(
        "http://apps.pakubuwono-residence.com/apiwebpbi/api/home/common-current-time"
      )
      .then((time) => {
        console.log("time", time.data);
        setTime(time.data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const datatime = {
    timeget: time.tanggal,
    daily: time.jam,
  };
  console.log("timeee", datatime);

  const d = datatime.daily;
  console.log("daily", d);

  const setBody = {
    entity_cd: "01",
    project_no: "01",
    facility_cd: "CA",
    book_date: datatime.timeget,
  };

  useEffect(() => {
    axios
      .get(
        `http://apps.pakubuwono-residence.com/apiwebpbi/api/modules/facilitites/booking-hours`,
        {
          params: setBody,
        }
      )
      .then((res) => {
        console.log("data", res.data);
        setData(res.data);
        setSpinner(false);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://apps.pakubuwono-residence.com/apiwebpbi/api/facility/book/days?entity_cd=01&project_no=01&facility_cd=CA`,
        {}
      )
      .then((data) => {
        const arrTabDate = data.data;

        // console.log('timedate', data.data);
        setTimeDate(arrTabDate);
        setTab(arrTabDate[0]);
        setIDTab(arrTabDate[0]);
        setSpinner(false);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  // const slot = {
  //   slottime: data.map.slot_hours,
  // };
  // console.log('slottt', slot);

  const [tab, setTab] = useState("");
  console.log("tab set", tab);

  useEffect(() => {
    const id = route?.params?.id;
    // console.log('id', id);
    timedate.forEach((tab) => {
      tab.id == id && setTab(tab);
    });
  }, [route?.params?.id]);

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
        <View style={{ marginVertical: 32 }}>
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
            borderColor: colors.primary,
            borderBottomWidth: 1,
            padding: 10,
          }}
        >
          {/* <Text headline whiteColor>
            Tennis
          </Text> */}
          <Text>{datatime.timeget}</Text>
          <Text>{datatime.daily}</Text>

          <Icon
            name="calendar-week"
            size={20}
            color={colors.primary}
            enableRTL={true}
          />
        </View>
        <View style={{ marginVertical: 20 }}>
          {/* <Text title2>Ticket</Text>
          <Text headline style={{fontWeight: 'normal'}}>
            Book Screen
          </Text> */}
          {spinner ? (
            <View>
              {/* <Spinner visible={this.state.spinner} /> */}
              <Placeholder style={{ marginVertical: 4, paddingHorizontal: 10 }}>
                <PlaceholderLine width={100} noMargin style={{ height: 40 }} />
              </Placeholder>
            </View>
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {timedate.map((item, index) => (
                // console.log('tab id', tab),
                // console.log('item id', item.id),

                <View key={index} style={{ flex: 1, paddingHorizontal: 5 }}>
                  <Tag
                    primary
                    style={{
                      height: 70,
                      width: 70,
                      flexDirection: "column",
                      backgroundColor:
                        tab.id == item.id ? colors.primary : colors.background,
                    }}
                    onPress={() => {
                      enableExperimental();
                      setTab(item);
                      setIDTab(item);
                      setData(item);
                    }}
                  >
                    <View style={{ flexGrow: 1, flexDirection: "row" }}>
                      <Text
                        body1={tab.id != item.id}
                        light={tab.id != item.id}
                        whiteColor={tab.id == item.id}
                        style={{ textAlign: "center" }}
                      >
                        {moment(item.book_date_descs)
                          .format("DD MMM")
                          .replace(" ", "\n")}
                      </Text>
                    </View>
                  </Tag>
                </View>
              ))}
            </View>
          )}

          {spinner ? (
            <View>
              {/* <Spinner visible={this.state.spinner} /> */}
              <Placeholder style={{ marginVertical: 4, paddingHorizontal: 10 }}>
                <PlaceholderLine width={100} noMargin style={{ height: 40 }} />
              </Placeholder>
            </View>
          ) : (
            <View>
              {tab.id === IDTab.id ? (
                <ScrollView>
                  {data.map((item, index) => {
                    return (
                      <View
                        key={index}
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
                        <Text bold key={index}>
                          {item.slot_hours}
                        </Text>
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
                  })}
                </ScrollView>
              ) : (
                <Text>gak sama</Text>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default BookingFacility1;
