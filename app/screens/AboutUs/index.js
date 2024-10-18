import {
  Card,
  Header,
  Icon,
  Image,
  ProfileDescription,
  SafeAreaView,
  Text,
} from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
import { Images } from "@config";
import { AboutUsData } from "@data";
import * as Utils from "@utils";
import React, { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { API_URL_LOKAL } from "@env";
import { useSelector, useDispatch } from "react-redux";
import httpClient from "../../controllers/HttpClient";
import RenderHtml from "react-native-render-html";
import { color } from "react-native-elements/dist/helpers";

const AboutUs = (props) => {
  const { navigation } = props;
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  //console.log("26 colors: ", colors);
  const stateRedux = useSelector((state) => state.user);
  const token = stateRedux.accessToken;

  // const [ourTeam, setOurTeam] = useState(AboutUsData);

  const [data, setData] = useState([]);

  //https://dev.ifca.co.id/apiifcares/api/setting/about-us
  const dataAbout = async () => {
    // await axios
    //   .get(API_URL_LOKAL + `/setting/about-us`)
    await httpClient
      .request({
        url: "/setting/about-us",
        method: "GET",
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      })
      .then((res) => {
        //console.log("35 res.data.data[0]: ", res.data.data[0]);
        // console.log('data images', res.data[0].images);

        setData(res.data.data[0]);
        // return res.data;
      })
      .catch((error) => {
        console.log("error get about us", error);
        // alert('error get');
      });
  };

  useEffect(() => {
    console.log("datauser", data);
    setTimeout(() => {
      setLoading(false);
      dataAbout();
    }, 1000);
  }, []);

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={["right", "top", "left"]}
    >
      <Header
        title={t("about_us")}
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
      <ScrollView>
        <View
          style={
            {
              //padding: 0,
              //backgroundColor: "white",
              //alignSelf: "center",
              //width: "80%",
            }
          }
        >
          {/* <Image source={Images.trip4} style={{width: '100%', height: 135}} /> */}
          <Image
            //source={require("../../assets/images/Logo-Carstensz.png")}
            //source={require("../../assets/images/logoIFCA.png")}
            source={require("../../assets/images/image-home/logo-tanrise-blackfont.png")}
            resizeMode="contain"
            style={{
              //height: 150,
              //width: 250,
              //alignItems: "center",
              // marginHorizontal: 100,

              //flexDirection: "row",
              //justifyContent: "center",
              //alignSelf: "center",
              marginVertical: 10,
              height: 150,
              width: "80%",
              alignSelf: "center",
              //marginHorizontal: 100,
              //flexDirection: "row",
              //objectFit: "fill",
              //padding: 60,
              //backgroundColor: "white",
              borderRadius: 5,
            }}
          />
        </View>
        <View style={{ paddingTop: 3 }}>
          <Text
            headline
            semibold
            style={{
              textAlign: "center",
              paddingBottom: 20,
              alignItems: "center",
            }}
          >
            {/* {t('who_we_are')} */}
            {data.about_title}
          </Text>
          {/* <View>
            <Text
              body2
              style={{
                paddingTop: 10,
                paddingBottom: 10,
              }}
              numberOfLines={100}>
              {data.about_us?.replace(/<\/?[^>]+(>|$;)/gi, '')}
            </Text>
          </View> */}
          <View style={{ marginHorizontal: 30 }}>
            <RenderHtml
              source={{ html: data.about_descs }}
              //contentWidth={"70%"}
              tagsStyles={{ p: { color: colors.text } }}
            />
          </View>
          <View
            style={[styles.address, { backgroundColor: colors.background }]}
          >
            <Text
              semibold
              style={{
                fontSize: 20,
                paddingBottom: 0,
                paddingTop: 15,
                marginBottom: 0,
              }}
            >
              Contact Us
            </Text>
            <Text
              semibold
              style={{
                paddingTop: 0,
                //paddingBottom: 10,
                fontSize: 15,
                textAlign: "center",
              }}
            >
              {data.contact_name}
            </Text>
            <View
              style={{
                flexDirection: "row",
                //justifyContent: "center",
                alignItems: "center",
                //backgroundColor: "blue",
                marginTop: 0,
                paddingTop: 0,
              }}
            >
              <Icon
                style={{
                  alignSelf: "center", //backgroundColor: "blue"
                  marginRight: 10,
                  color: colors.text,
                }}
                name="mobile"
                size={20}
              />
              {/* <Text> {data.contact_no}</Text> */}
              <View
                style={{
                  //justifyContent: "center",
                  marginTop: 20,
                  //backgroundColor: "blue",
                }}
              >
                <RenderHtml
                  source={{ html: data.contact_info }}
                  contentWidth={"90%"}
                  tagsStyles={{ p: { color: colors.text } }}
                  style={{
                    //marginTop: 50,
                    backgroundColor: "red",
                    alignSelf: "center",
                  }}
                />
              </View>
            </View>
            {/* <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <Icon name="envelope" size={20} />
              <Text> {data.contact_email}</Text>
            </View> */}

            <Text
              semibold
              style={{
                fontSize: 15,
                paddingBottom: 30,
                paddingTop: 15,
                color: colors.text,
              }}
            >
              Address
            </Text>
            {/* <Text
              body
              style={{
                paddingBottom: 5,
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {data.address}
            </Text> */}
            <RenderHtml
              source={{ html: data.address }}
              contentWidth={"90%"}
              tagsStyles={{
                p: { color: colors.text },
                div: { color: colors.text },
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutUs;
