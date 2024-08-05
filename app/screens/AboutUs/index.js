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

const AboutUs = (props) => {
  const { navigation } = props;
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  // const [ourTeam, setOurTeam] = useState(AboutUsData);

  const [data, setData] = useState([]);

  //https://dev.ifca.co.id/apiifcares/api/about_mobile
  const dataAbout = async () => {
    await axios
      .get(API_URL_LOKAL + `/about_mobile`)
      .then((res) => {
        console.log("35 res.data[0]: ", res);
        // console.log('data images', res.data[0].images);

        setData(res.data[0]);
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
        <View>
          {/* <Image source={Images.trip4} style={{width: '100%', height: 135}} /> */}
          <Image
            //source={require("../../assets/images/Logo-Carstensz.png")}
            source={require("../../assets/images/logoIFCA.png")}
            style={{
              //height: 150,
              //width: 250,
              //alignItems: "center",
              // marginHorizontal: 100,

              //flexDirection: "row",
              //justifyContent: "center",
              //alignSelf: "center",
              marginTop: 20,
              height: 130,
              width: "40%",
              alignSelf: "center",
              //marginHorizontal: 100,
              flexDirection: "row",
              resizeMode: "contain",
              //objectFit: "fill",
              padding: 50,
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
          <View style={styles.address}>
            <Text
              semibold
              style={{
                fontSize: 20,
                paddingBottom: 20,
                paddingTop: 15,
              }}
            >
              Contact Us
            </Text>
            <Text
              semibold
              style={{
                paddingTop: 0,
                paddingBottom: 10,
                fontSize: 15,
                textAlign: "center",
              }}
            >
              {data.contact_name}
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Icon name="mobile" size={20} />
              <Text> {data.contact_no}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <Icon name="envelope" size={20} />
              <Text> {data.contact_email}</Text>
            </View>

            <Text
              semibold
              style={{
                fontSize: 15,
                paddingBottom: 10,
                paddingTop: 15,
              }}
            >
              Address
            </Text>
            <Text
              body
              style={{
                paddingBottom: 5,
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {data.address}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutUs;
