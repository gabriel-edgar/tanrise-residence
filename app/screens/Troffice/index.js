import {
  Header,
  Icon,
  ListTextButton,
  SafeAreaView,
  Tag,
  Text,
  Button,
  CategoryGrid,
  CategoryBoxColor,
  CategoryBoxColor2,
  ModalFilterLocation,
} from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
import { CheckBox } from "react-native-elements";
import { enableExperimental } from "@utils";

import { useNavigation } from "@react-navigation/native";
import { haveChildren } from "@utils";
import React, { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, TouchableOpacity, View } from "react-native";
import { SceneMap } from "react-native-tab-view";
import { useSelector } from "react-redux";
import getUser from "../../selectors/UserSelectors";
import axios from "axios";
import client from "../../controllers/HttpClient";
import styles from "./styles";
import { API_URL_LOKAL } from "@env";

export default function Troffice() {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [dataLocation, setLocation] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [urlApi, seturlApi] = useState(client);
  const [index, setIndex] = useState(0);
  const [getCategories, setGetCategory] = useState([]);

  const [search, setSearch] = useState("");

  const TABS = [
    {
      id: "C",
      title: t("Customer Service"),
    },
    {
      id: "H",
      title: t("House Keeping"),
    },
  ];

  const [tab, setTab] = useState(TABS[0]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      getCategory();
    }, 1000);
  }, []);

  const getCategory = async () => {
    await axios
      .get(API_URL_LOKAL + `/modules/troffice/category`)
      .then((res) => {
        // console.log('res greetings', res.data.data);
        // const getdata = res.data.data[0].status;
        const getdata = res.data.data;
        setGetCategory(getdata);
        console.log("res greetings", getdata);
      })
      .catch((error) => {
        console.log("error res get category", error);
      });
  };

  //  const handleCategory = ({data, index}) => {
  //   console.log('handlecategory',data);
  //   (data.descs.includes('AC') ?
  //   navigation.navigate('SelectType', data)
  //   : navigation.navigate('SpecTroffice', data));
  //  }
  // console.log('status user new old', status_user);
  // setStatusUser(status_user);

  // if (status_user == 'N') {
  //   setModalImage(true); // sementara di jadiin false dulu, untuk hide modal.
  //   getImageGreetings();
  // } else {
  //   setModalImage(false);
  // }
  // setLoadNews(false);
  // // return res.data;

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={["right", "top", "left"]}
    >
      <Header
        // title={t('choose_friend')}
        title={t("TR Office")} //belum ada lang translatenya
        renderLeft={() => {
          return (
            <Icon
              name="angle-left"
              size={20}
              color={colors.text}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {TABS.map((item, index) => (
          <View
            key={index}
            style={{ flex: 1, paddingHorizontal: 20, marginBottom: 30 }}
          >
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

      <View>
        {tab.id == "C" ? (
          <View>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              {getCategories.map((data, index) => (
                <CategoryBoxColor
                  loading={loading}
                  style={{
                    // paddingLeft: index % 2 == 0 ? 0 : 15,
                    paddingBottom: 15,
                    justifyContent: "space-between",
                    paddingHorizontal: 10,
                  }}
                  title={
                    data.category_cd == "MU52" ? "Water Heater" : data.descs
                  }
                  // icon={'list-alt'}
                  icon={data.category_cd == "AU01" ? "wind" : "water"}
                  color={colors.primary}
                  onPress={() => {
                    data.category_cd == "AU01"
                      ? navigation.navigate("SpecTroffice", { data, index })
                      : data.category_cd == "MU52" &&
                        navigation.navigate("SpecTrofficeWaterHeater", {
                          data,
                          index,
                        });
                  }}
                  // onPress={() => handleCategory({data, index})}
                />
              ))}
            </View>
            <View style={{ flexDirection: "column" }}>
              <CategoryBoxColor
                loading={loading}
                style={{
                  // paddingLeft: index % 2 == 0 ? 0 : 15,
                  paddingBottom: 15,
                  // justifyContent: 'space-between',
                  justifyContent: "center",
                  paddingHorizontal: 10,
                }}
                title={"Booking List"}
                icon={"list-alt"}
                color={colors.primary}
                onPress={() => navigation.navigate("StatusHelpTROffice")}
              />
            </View>
          </View>
        ) : null}

        {tab.id == "H" ? (
          <View style={{ flexDirection: "column" }}>
            <View style={{ flexDirection: "row" }}>
              {getCategories.map(
                (data, index) =>
                  data.category_cd == "PC01" && (
                    <CategoryBoxColor
                      loading={loading}
                      style={{
                        // paddingLeft: index % 2 == 0 ? 0 : 15,
                        paddingBottom: 15,
                        // justifyContent: 'space-between',
                        justifyContent: "center",
                        paddingHorizontal: 10,
                      }}
                      title={"Pest Control"}
                      icon={"spider"}
                      color={colors.primary}
                      onPress={() =>
                        data.category_cd == "PC01" &&
                        navigation.navigate("SpecTrofficePestControl", {
                          data,
                          index,
                        })
                      }
                    />
                  )
              )}
              <CategoryBoxColor
                loading={loading}
                style={{
                  // paddingLeft: index % 2 == 0 ? 0 : 15,
                  paddingBottom: 15,
                  // justifyContent: 'space-between',
                  justifyContent: "center",
                  paddingHorizontal: 10,
                }}
                title={"Unit Cleaning Attendant"}
                icon={"home"}
                color={colors.primary}
                onPress={() => navigation.navigate("SpecTrofficeUnitCleaning")}
              />
            </View>
            <View style={{ flexDirection: "column" }}>
              <CategoryBoxColor
                loading={loading}
                style={{
                  // paddingLeft: index % 2 == 0 ? 0 : 15,
                  paddingBottom: 15,
                  // justifyContent: 'space-between',
                  justifyContent: "center",
                  paddingHorizontal: 10,
                }}
                title={"Booking List"}
                icon={"list-alt"}
                color={colors.primary}
                onPress={() => navigation.navigate("StatusHelpHouse")}
              />
            </View>
            {/* <View style={{flexDirection: 'row'}}>
              
              <CategoryBoxColor
                loading={loading}
                style={{
                  // paddingLeft: index % 2 == 0 ? 0 : 15,
                  paddingBottom: 15,
                  // justifyContent: 'space-between',
                  justifyContent: 'center',
                  paddingHorizontal: 10,
                }}
                title={'Move in Move out'}
                icon={'home'}
                color={colors.primary}
                onPress={() => navigation.navigate('ComingSoon')}
              />
            </View> */}
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}
