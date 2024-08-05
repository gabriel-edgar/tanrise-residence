import {
  CategoryIcon,
  Header,
  Icon,
  SafeAreaView,
  TextInput,
} from "@components";
import { BaseColor, BaseStyle, Typography, useTheme } from "@config";
//import { FCategoryData } from "@data";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, RefreshControl, View, Linking } from "react-native";
import { API_URL_LOKAL } from "@env";

const Emergency = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [modeView, setModeView] = useState("list");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchDataDue() {
    try {
      const res = await axios.get(API_URL_LOKAL + "/emergency");
      setData(res.data.data);
      console.log("data", data);
    } catch (error) {
      setErrors(error);
      // alert(hasError.toString());
    }
  }

  useEffect(() => {
    setTimeout(() => {
      fetchDataDue();
      setLoading(false);
    }, 500);
  }, []);

  const renderItem = ({ item, index }) => {
    return (
      <CategoryIcon
        loading={loading}
        style={{
          marginBottom: 10,
        }}
        title={item.contact_name}
        subtitle={item.contact_name}
        icon="phone"
        // color={item.color}
        onPress={() => Linking.openURL(`tel:${item.contact_no}`)}
      />
    );
  };

  const onChangeText = (text) => {
    setSearch(text);
    setData(
      text ? data.filter((item) => item.contact_name.includes(text)) : data
    );
  };

  const renderContent = () => {
    return (
      <SafeAreaView
        style={[BaseStyle.safeAreaView]}
        edges={["right", "top", "left"]}
      >
        <Header
          title={t("Emergency Call")}
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
        {/* <View style={{paddingHorizontal: 20, marginVertical: 20}}>
          <TextInput
            style={[BaseStyle.textInput, Typography.body1]}
            onChangeText={onChangeText}
            autoCorrect={false}
            placeholder={t('search')}
            placeholderTextColor={BaseColor.grayColor}
            value={search}
            selectionColor={colors.primary}
            onSubmitEditing={() => {}}
          />
        </View> */}

        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            marginVertical: 40,
          }}
          numColumns={1}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={() => {}}
            />
          }
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <CategoryIcon
              loading={loading}
              style={{
                marginBottom: 10,
              }}
              title={item.contact_name}
              subtitle={item.contact_no}
              icon="phone"
              // color={item.color}
              onPress={() => Linking.openURL(`tel:${item.contact_no}`)}
            />
          )}
        />
      </SafeAreaView>
    );
  };

  return renderContent();
};

export default Emergency;
