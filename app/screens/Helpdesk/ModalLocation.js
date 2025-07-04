import {
  Header,
  Icon,
  ListTextButton,
  SafeAreaView,
  Tag,
  PlaceholderLine,
  Placeholder,
  Text,
  Button,
  CategoryGrid,
  ModalFilterLocation,
} from "@/components";
import { BaseColor, BaseStyle, useTheme } from "@/config";
import { CheckBox } from "react-native-elements";
import { FFriends } from "@/data";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { haveChildren } from "@/utils";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  TouchableOpacity,
  View,
  TextInput,
  RefreshControl,
  ActivityIndicator,
  TouchableHighlight,
} from "react-native";
import { SceneMap } from "react-native-tab-view";
import { useSelector } from "react-redux";
import getUser from "../../selectors/UserSelectors";
import axios from "axios";
import httpClient from "../../controllers/HttpClient";
import styles from "./styles";

import ModalDropdown_debtor from "@/components/ModalDropdown_debtor";
import ModalDropdown_lotno from "@/components/ModalDropdown_lotno";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL_LOKAL } from "@env";

export default function ModalLocation(props) {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [dataLocation, setLocation] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  //const [urlApi, seturlApi] = useState(client);

  const [arrayholder, setArrayHolder] = useState([]);
  const [getLocationFilter, setLocationFilter] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const [itemBank, setItemBank] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const [propsparams, setPropsParams] = useState(props);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      getLocation();
      searchFilterFunction();
    }, 1000);
  }, []);
  const getLocation = async () => {
    // const config = {
    //   headers: {
    //     accept: "application/json",
    //     "Content-Type": "application/json",
    //     // token: "",
    //   },
    // };
    console.log("74 location1 ");

    // await axios
    //   .get(API_URL_LOKAL + "/modules/cs/location", {
    //     config,
    //   })
    await httpClient
      .request({
        url: "/modules/cs/location",
        method: "GET",
      })
      .then((res) => {
        //console.log(res.data.success);
        if (res.data.success == true) {
          const arrLocation = res.data.data;

          console.log("74 location2 res: ", arrLocation);

          setLocationFilter(arrLocation);
          setSpinner(false);
          // this.setState({isLoaded: !this.state.isLoaded}, () => {
          //   // alert(res.Pesan)
          //   this.setState({getbank: resData});
          // });
        } else {
          setSpinner(false);
          alert(res.data.message);
        }

        setArrayHolder(res.data.data);
      })
      .catch((error) => {
        console.log("74 location3 error get location api", error.response);
        // alert('error get');
      });
  };

  const searchFilterFunction = (text) => {
    console.log("text", text);
    // console.log('arrayholder', arrayholder);
    const newData = arrayholder.filter((item) => {
      const itemData = `${item.descs.toUpperCase()}`;
      console.log("itemdata", itemData);
      const textData = text;
      return itemData.indexOf(textData) > -1;
    });
    console.log("new data", newData);
    setLocationFilter(newData);
  };

  const selectedItem = async (item) => {
    console.log("item select loc", item);

    // alert(val);
    setPropsParams(item);
    // alert(val);
    if (item) {
      //   console.log('props', propsparams);
      const itemLocation = item;
      const jsonValue = JSON.stringify(itemLocation);
      //   setdataFormHelp(saveStorage);
      // console.log('storage', saveStorage);

      await AsyncStorage.setItem("@locationStorage", jsonValue);
      navigation.goBack({ passLocation: item });

      //   navigation.navigate('SubmitHelpdesk', {passLocation: item});
    }

    // this.setModalVisible(!this.state.modalVisible)
  };

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={["right", "top", "left"]}
    >
      <Header
        // title={t('choose_friend')}
        title={t("location")} //belum ada lang translatenya
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
      <TextInput
        placeholder="Search"
        style={{
          color: colors.text, //"#555",
          fontSize: 14,
          borderColor: "#000",
          borderWidth: 0.5,
          borderRadius: 10,
          marginHorizontal: 20,
          padding: 13,
        }}
        // onChangeText={this.handleSearch}
        onChangeText={(text) => searchFilterFunction(text.toUpperCase())}
        autoCorrect={false}
        placeholderTextColor={colors.text}
      />

      {spinner ? (
        <View>
          {/* <Spinner visible={this.state.spinner} /> */}
          <Placeholder style={{ marginVertical: 4, paddingHorizontal: 10 }}>
            <PlaceholderLine width={100} noMargin style={{ height: 40 }} />
          </Placeholder>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 20 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={true}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={() => {}}
            />
          }
          data={getLocationFilter}
          keyExtractor={(item, index) => index}
          // keyExtractor={(item, index) => item.descs}
          renderItem={({ item, index, separators }) => (
            <View key={index} style={{ marginHorizontal: 10, flex: 1 }}>
              <TouchableOpacity
                // style={styleItem}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottomColor: colors.border,
                  borderBottomWidth: 2,
                  paddingBottom: 20,
                  paddingTop: 20,
                }}
                onPress={() => selectedItem(item)}
              >
                <Text body1>{item.descs}</Text>
                <Icon
                  name="angle-right"
                  size={18}
                  color={colors.primary}
                  style={{ marginLeft: 5 }}
                  enableRTL={true}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}
