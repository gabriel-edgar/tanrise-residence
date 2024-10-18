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
  colors,
  PlaceItem,
} from "@components";
import { BaseStyle, useTheme } from "@config";
import {
  HomeChannelData,
  HomeListData,
  HomePopularData,
  HomeTopicData,
  PostListData,
} from "@data";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, ScrollView, View, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ProductBlock } from "../../components";
import numFormat from "../../components/numFormat";
import List from "../../components/Product/List";
import styles from "./styles";

const Rent = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setErrors] = useState(false);

  useEffect(() => {
    axios
      .get(
        "http://apps.pakubuwono-residence.com/apiwebpbi/api/modules/rs/rent-unit/"
      )
      .then(({ data }) => {
        console.log("defaultApp -> data", data);
        setData(data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

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

  const renderContent = () => {
    const mainNews = PostListData[0];
    return (
      <SafeAreaView edges={["right", "top", "left"]}>
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
        <ScrollView contentContainerStyle={styles.paddingSrollView}>
          <FlatList
            scrollEnabled={false}
            contentContainerStyle={styles.paddingFlatList}
            data={data}
            renderItem={({ item, index }) => (
              <ProductBlock
                loading={loading}
                description={item.description}
                subject={item.subject}
                style={{ marginVertical: 8 }}
                pict={item.pict}
                avatar={item.avatar}
                email={item.email}
                bath_room={item.bath_room}
                bed_room={item.bed_room}
                land_area={item.land_area}
                build_area={item.build_area}
                agent_name={item.agent_name}
                publish_date={moment(item.publish_date).format("H:mm:ss")}
                price_descs={item.price_descs}
                onPress={() => goProductDetail(item)}
                isFavorite={item.isFavorite}
                salePercent={item.salePercent}
              />
            )}
          />
        </ScrollView>
      </SafeAreaView>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={["right", "top", "left"]}
      >
        {renderContent()}
      </SafeAreaView>
    </View>
  );
};

export default Rent;
