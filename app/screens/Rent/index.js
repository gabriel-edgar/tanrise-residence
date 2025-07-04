import {
  CardChannelGrid,
  CardSlide,
  CategoryList,
  News43,
  ListFacility,
  SafeAreaView,
  Text,
  NewsList,
  Header,
  Icon,
  Tag,
  colors,
  PlaceItem,
  ButtonChooseProject,
} from "@/components";
import { BaseStyle, useTheme } from "@/config";
import {
  HomeChannelData,
  HomeListData,
  HomePopularData,
  HomeTopicData,
  PostListData,
} from "@/data";
import { useRoute } from "@react-navigation/core";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, ScrollView, View, ActivityIndicator } from "react-native";
import { ProductBlock } from "../../components";
import numFormat from "../../components/numFormat";
import List from "../../components/Product/List";
import styles from "./styles";
import { enableExperimental } from "@/utils";
import { API_URL_LOKAL } from "@env";
import { store, persist } from "../../store";
import { homeCommonProject } from "../FunctionAxios/home-common-project";
import httpClient from "../../controllers/HttpClient";

const Rent = (props) => {
  const { navigation } = props;
  const itemData = props.route.params.item;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const route = useRoute();
  const [data, setData] = useState([]);
  const [rent, setRent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setErrors] = useState(false);
  const [arrDataProject, setArrDataProject] = useState([]);
  const [dataDD, setDataDD] = useState([]);

  const stateStore = store.getState();
  const token = stateStore.user.accessToken;

  const TABS = [
    {
      id: 1,
      title: t("Rent"),
    },
    {
      id: 2,
      title: t("Sale"),
    },
  ];
  const [tab, setTab] = useState(TABS[0]);

  useEffect(() => {
    const id = route?.params?.id;
    if (id) {
      TABS.forEach((tab) => {
        tab.id == id && setTab(tab);
      });
    }
  }, [route?.params?.id]);

  useEffect(() => {
    const data = {
      email: stateStore.user.user.userData.email,
    };

    console.log("83 data: ", data);

    loadData();
    setLoading(false);
    // setTimeout(() => {
    //   setLoading(false);
    // }, 1000);
  }, []);

  const loadData = async () => {
    //await homeCommonProject(token, data, setDataDD, setArrDataProject);
    //await getSale();
    //await delay(1000);
    await getRent();
    await getSale();
  };

  const getRent = async () => {
    // axios
    //   .get(API_URL_LOKAL + "/modules/rs/rent-unit")
    console.log("102 run getRent");
    await httpClient
      .request({
        url: "/modules/rs/rent-unit",
        method: "GET",
      })
      .then(({ data }) => {
        console.log("96 rent: ", data.data);
        setRent(data.data);
      })
      .catch((error) => console.error("96 errorRent: ", error));
    // .finally(() => setLoading(false));
  };

  const getSale = async () => {
    // axios
    //   .get(API_URL_LOKAL + "/modules/rs/sale-unit/")
    console.log("102 run getSale");
    await httpClient
      .request({
        url: "/modules/rs/sale-unit",
        method: "GET",
      })
      .then(({ data }) => {
        console.log("96 sale: ", data.data);
        setData(data.data);
        //console.log("data >", data.data[0].images);
      })
      .catch((error) =>
        console.error("96 errorSale1234: ", error.response.data.message)
      );
    // .finally(() => setLoading(false));
  };

  const goPost = (item) => () => {
    navigation.navigate("Post", { item: item });
  };
  const goProductDetail = (item) => {
    navigation.navigate("EProductDetail", { item: item });
  };
  const goPostDetail = (item) => () => {
    navigation.navigate("PostDetail", { item: item });
  };

  const goToCategory = () => {
    navigation.navigate("Category");
  };

  //dropdownProject
  const [choosedProject, setChoosedProject] = useState();
  const handleSelect = (value) => {
    console.log("Selected Value:", value);
    //setState(value);
    setChoosedProject(value);
  };
  const dropdownItems = [
    // { label: "choose project", value: "" },
    { label: "Project 1", value: "Project 1" },
    { label: "Project 2", value: "Project 2" },
    { label: "Project 3", value: "Project 3" },
  ];

  if (itemData.isProject == 1) {
    if (choosedProject == null) {
      return (
        <SafeAreaView
          style={[BaseStyle.safeAreaView, { backgroundColor: "blue" }]}
          edges={["right", "top", "left"]}
        >
          <Header
            // title={t('choose_friend')}
            title={t("Rent or Sale2")} //belum ada lang translatenya
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
          <ButtonChooseProject
            items={dataDD}
            placeholder="Select project"
            onSelect={handleSelect}
          />
        </SafeAreaView>
      );
    }
  }

  const renderContent = () => {
    const mainNews = PostListData[0];
    return (
      // <SafeAreaView edges={["right", "top", "left"]}>
      <>
        <Header
          title={t("Rent or Sale")}
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
        {itemData.isProject == 1 && (
          <>
            <ButtonChooseProject
              items={dataDD}
              placeholder="Select project"
              onSelect={handleSelect}
              value2={choosedProject}
            />
          </>
        )}
        <ScrollView contentContainerStyle={styles.paddingSrollView}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
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
          <View style={{ flex: 1 }}>
            {tab.id == 1 && (
              <FlatList
                scrollEnabled={false}
                contentContainerStyle={styles.paddingFlatList}
                data={rent}
                keyExtractor={(item, index) => item.rowID}
                renderItem={({ item, index }) => (
                  <ProductBlock
                    key={index}
                    loading={loading}
                    description={item.adv_descs}
                    subject={item.adv_title}
                    style={{ marginVertical: 8 }}
                    // images={item.images[0].pict}
                    images={item.images}
                    avatar={item.avatar}
                    email={item.email}
                    bath_room={item.qty_bathroom}
                    bed_room={item.qty_bedroom}
                    land_area={item.nett} // nett
                    build_area={item.semi_gross} //semi gross
                    agent_name={item.agent_name}
                    publish_date={moment(item.date_created).format("H:mm:ss")}
                    price_descs={item.price_descs}
                    onPress={() => goProductDetail(item)}
                    isFavorite={item.isFavorite}
                    salePercent={item.salePercent}
                    currency={item.currency}
                    price={item.price}
                  />
                )}
              />
            )}
          </View>
          <View style={{ flex: 1 }}>
            {tab.id == 2 && (
              <FlatList
                scrollEnabled={false}
                contentContainerStyle={styles.paddingFlatList}
                data={data}
                keyExtractor={(item, index) => item.rowID}
                renderItem={({ item, index }) => (
                  <ProductBlock
                    key={index}
                    loading={loading}
                    description={item.adv_descs}
                    subject={item.adv_title}
                    style={{ marginVertical: 8 }}
                    // images={item.images[0].pict}
                    images={item.images}
                    avatar={item.avatar}
                    email={item.email}
                    advID={item.adv_no}
                    bath_room={item.qty_bathroom}
                    bed_room={item.qty_bedroom}
                    land_area={item.nett}
                    build_area={item.semi_gross}
                    agent_name={item.agent_name}
                    publish_date={moment(item.date_created).format("H:mm:ss")}
                    price_descs={item.price_descs}
                    onPress={() => goProductDetail(item)}
                    isFavorite={item.isFavorite}
                    salePercent={item.salePercent}
                    currency={item.currency}
                    price={item.price}
                  />
                )}
              />
            )}
          </View>
          {/* <FlatList
            scrollEnabled={false}
            contentContainerStyle={styles.paddingFlatList}
            data={data}
            renderItem={({item, index}) => (
              <ProductBlock
                loading={loading}
                description={item.description}
                subject={item.subject}
                style={{marginVertical: 8}}
                images={item.images[0].pict}
                avatar={item.avatar}
                email={item.email}
                bath_room={item.bath_room}
                bed_room={item.bed_room}
                land_area={item.land_area}
                build_area={item.build_area}
                agent_name={item.agent_name}
                publish_date={moment(item.publish_date).format('H:mm:ss')}
                price_descs={item.price_descs}
                onPress={() => goProductDetail(item)}
                isFavorite={item.isFavorite}
                salePercent={item.salePercent}
              />
            )}
          /> */}
        </ScrollView>
      </>
      // </SafeAreaView>
    );
  };

  return (
    // <View style={{ flex: 1 }}>
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={["right", "top", "left"]}
    >
      {renderContent()}
    </SafeAreaView>
    // </View>
  );
};

export default Rent;
