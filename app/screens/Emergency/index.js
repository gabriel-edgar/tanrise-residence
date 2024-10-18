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
import { FlatList, RefreshControl, View, Linking, Text } from "react-native";
import { API_URL_LOKAL } from "@env";
import userReducer from "../../reducers/UserReducer";
import getUser from "../../selectors/UserSelectors";
import { useSelector } from "react-redux";
import httpClient from "../../controllers/HttpClient";

const Emergency = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [modeView, setModeView] = useState("list");
  const [data, setData] = useState([]);
  //const [dataHelp, setDataHelp] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => getUser(state));

  const stateReduxChoosedProject = useSelector(
    (state) => state.Dataproject.chooseProject
  );

  //console.log("29 user: ", user);

  // async function fetchDataDue() {
  //   try {
  //     const res = await axios.get(API_URL_LOKAL + "/setting/emergency_contact");
  //     setData(res.data.data);
  //     console.log("data", data);
  //   } catch (error) {
  //     setErrors(error);
  //     // alert(hasError.toString());
  //   }
  // }

  const email = {
    subject: "Help Tanrise Residence email:" + user.email,
    body:
      "Halo saya " +
      user.name +
      ", email akun saya " +
      user.email +
      ", saya membutuhkan informasi ",
  };

  const whatsapp = {
    message:
      "Halo saya " +
      user.name +
      ", email akun saya " +
      user.email +
      ", saya membutuhkan informasi ",
  };

  const dataAddress = [
    {
      contact_name: "Email",
      contact_no: "m.hafid@ifca.co.id",
    },
    {
      contact_name: "Whatsapp",
      contact_no: "628112777873",
    },
  ];

  useEffect(() => {
    // setTimeout(() => {
    //fetchDataDue();
    loadData();
    //setData(dataAddress);
    setLoading(false);
    // }, 500);
  }, []);

  const loadData = async () => {
    const loadHelp = await httpClient
      .request({
        url: "/setting/get-config-help",
        method: "GET",
        params: {
          entity_cd: stateReduxChoosedProject.entity_cd,
          project_no: stateReduxChoosedProject.project_no,
        },
      })
      .then((res) => {
        console.log("435 res: ", res.data.data);
        return res.data.data;
      })
      .catch((error) => {
        console.log("435 error: ", error.response.data.message);
        return [];
      });

    //setDataHelp(loadHelp);
    loadHelp?.length == 0
      ? null
      : setData([
          {
            contact_name: "Email",
            contact_no: loadHelp[0].email,
          },
          {
            contact_name: "Whatsapp",
            contact_no: loadHelp[0].whatsapp,
          },
        ]);
  };

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

  // const onChangeText = (text) => {
  //   setSearch(text);
  //   setData(
  //     text ? data.filter((item) => item.contact_name.includes(text)) : data
  //   );
  // };

  const renderContent = () => {
    return (
      <SafeAreaView
        style={[BaseStyle.safeAreaView]}
        edges={["right", "top", "left"]}
      >
        <Header
          title={t("Help")}
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
        <Text
          style={{
            color: colors.text,
            textAlign: "center",
            marginTop: 40,
            fontSize: 15,
          }}
        >
          {stateReduxChoosedProject.descs}
        </Text>
        <Text
          style={{
            color: colors.text,
            textAlign: "center",
            marginTop: 10,
            fontSize: 15,
          }}
        >
          For further assistance, please contact us via:
        </Text>
        <FlatList
          style={{}}
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
          renderItem={({ item, index }) => {
            // if (item.contact_no == "") {
            //   return;
            // }
            return (
              <View
                style={{
                  backgroundColor: colors.background,
                  borderRadius: 10,
                  shadowColor: colors.text,
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 8,
                  elevation: 5, // For Android shadow
                  margin: 10,
                  overflow: "hidden", // To make the corners round
                  flex: 1,
                  //alignContent: "center",
                  justifyContent: "space-between",
                  //backgroundColor: "blue",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <CategoryIcon
                  loading={loading}
                  style={{
                    margin: 10,
                    //backgroundColor: "blue",
                    alignItems: "center",
                  }}
                  title={item.contact_name}
                  subtitle={
                    item.contact_no == "" ? "empty data" : item.contact_no
                  }
                  icon={item.contact_name == "Email" ? "envelope" : "phone-alt"}
                  // color={item.color}
                  //onPress={() => Linking.openURL(`tel:${item.contact_no}`)}
                  onPress={() =>
                    item.contact_name == "Email"
                      ? item.contact_no == ""
                        ? null
                        : Linking.openURL(
                            `mailto:${
                              item.contact_no
                            }?subject=${encodeURIComponent(
                              email.subject
                            )}&body=${encodeURIComponent(email.body)}`
                          ).catch((err) => alert("Error opening email client"))
                      : item.contact_no == ""
                      ? null
                      : Linking.openURL(
                          `whatsapp://send?phone=${
                            item.contact_no
                          }&text=${encodeURIComponent(whatsapp.message)}`
                        ).catch((err) =>
                          alert(
                            "Make sure WhatsApp is installed on your device"
                          )
                        )
                  }
                />
              </View>
            );
          }}
        />
      </SafeAreaView>
    );
  };

  return renderContent();
};

export default Emergency;
