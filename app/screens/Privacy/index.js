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
import { ScrollView, View, useWindowDimensions } from "react-native";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import axios from "axios";
import RenderHTML from "react-native-render-html";
import { API_URL_LOKAL } from "@env";

const Privacy = (props) => {
  const { width } = useWindowDimensions();
  const { navigation } = props;
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  // const [ourTeam, setOurTeam] = useState(AboutUsData);

  const [data, setData] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get('http://34.87.121.155:8000/ifcaprop-api/api/privacy/01/01')
  //     .then(({data}) => {
  //       console.log('data', data);
  //       setData(data[0]);
  //     })
  //     .catch(error => console.error(error))
  //     .finally(() => setLoading(false));
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      axios
        .post(API_URL_LOKAL + "/privacy?entity_cd=01&project_no=01")
        .then(({ data }) => {
          console.log("49 data >", data.data[0]);
          setData(data.data[0]);
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, 1000);
  }, []);

  useEffect(() => {
    console.log("datauser", data);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={["right", "top", "left"]}
    >
      <Header
        title={t("Privacy Policy")}
        renderLeft={() => {
          // return (
          //   <Icon
          //     name="angle-left"
          //     size={20}
          //     color={colors.primary}
          //     enableRTL={true}
          //   />
          // );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <View>
          {/* <Image source={Images.trip4} style={{width: '100%', height: 135}} /> */}
          <Image
            //source={require("../../assets/images/pakubuwono.png")}
            source={require("../../assets/images/logoIFCA.png")}
            style={{
              height: 190,
              width: "60%",
              alignSelf: "center",
              //marginHorizontal: 100,
              flexDirection: "row",
              resizeMode: "contain",
              marginTop: 20,
              //paddingTop: 20,
            }}
          />
        </View>
        <View style={{ padding: 20 }}>
          <View>
            <RenderHTML
              source={{
                html: data?.descriptions ?? "Deskripsi Privacy Policy",
                // Optional Chaining (?.), Nullish Coalescing (??)
              }}
              contentWidth={width}
            ></RenderHTML>
            {/* <Text
              body2
              style={{
                paddingTop: 10,
                paddingBottom: 10,
              }}
              numberOfLines={100}>
              {data.descriptions?.replace(/<\/?[^>]+(>|$;)/gi, '')}
            </Text> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Privacy;
