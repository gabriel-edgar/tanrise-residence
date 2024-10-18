import {
  Card,
  Header,
  Icon,
  Image,
  ProfileDescription,
  SafeAreaView,
  Text,
  ProductBlock,
} from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
import { Images } from "@config";
import { AboutUsData } from "@data";
import * as Utils from "@utils";
import React, { useState, useEffect } from "react";
import { ScrollView, View, FlatList } from "react-native";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import axios from "axios";
import moment from "moment";
import { ActivityIndicator } from "react-native-paper";

import { useSelector, useDispatch } from "react-redux";
import getProject from "../../selectors/ProjectSelector";
import getUser from "../../selectors/UserSelectors";
// import {ProductBlock} from '../../components';
import { API_URL_LOKAL } from "@env";
const Skip = (props) => {
  const { navigation } = props;
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [rent, setRent] = useState([]);
  const [data, setData] = useState([]);

  const [entity, setEntity] = useState("");
  const [project, setProjectNo] = useState("");

  //-----FOR GET ENTITY & PROJJECT
  const getTower = async () => {
    const data = {
      email: "guest@ifca.co.id",
      //   email: 'haniyya.ulfah@ifca.co.id',
      app: "O",
    };

    const config = {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        // token: "",
      },
    };

    await axios
      .get(
        // `http://apps.pakubuwono-residence.com/apisysadmin/api/getProject/${data.email}`,
        API_URL_LOKAL + `/home/common-project/mysql/${data.email}/${data.app}`,
        {
          config,
        }
      )
      .then((res) => {
        const datas = res.data;
        // console.log('res tower', res.data.Data[0]);

        const arrDataTower = datas.Data;
        // let dataArr = {};
        arrDataTower.map((dat) => {
          if (dat) {
            console.log("data trower", dat.entity_cd);
            // setdataTowerUser(dat);
            setEntity(dat.entity_cd);
            setProjectNo(dat.project_no);
            // const jsonValue = JSON.stringify(dat);
            //   setdataFormHelp(saveStorage);
            // console.log('storage', saveStorage);
            // dataArr.push(jsonValue);
            // getDebtor(dat);
            dataAbout(dat);
          }
        });

        // AsyncStorage.setItem('@DataTower', dataArr);
        // setArrDataTowerUser(arrDataTower);

        // setSpinner(false);
        // return res.data;
      })
      .catch((error) => {
        console.log("error get tower api", error);
        // alert('error get');
      });
  };

  // useEffect(() => {
  //   axios
  //     .get('http://apps.pakubuwono-residence.com/ifcaprop-api/api/about')
  //     .then(({data}) => {
  //       console.log('data', data);
  //       setData(data[0]);
  //     })
  //     .catch(error => console.error(error));
  //   // .finally(() => setLoading(false));
  // }, []);

  const dataAbout = async (data) => {
    console.log("data param about us", data);
    const params = {
      entity_cd: data.entity_cd,
      project_no: data.project_no,
    };
    const config = {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        // token: "",
      },
    };
    await axios
      // .get(`http://apps.pakubuwono-residence.com/apiwebpbi/api/setting/about-us`) //url ini mengeluarkan semua data tanpa where entity dan project
      .post(API_URL_LOKAL + `/about`, params, {
        config,
      })

      .then((res) => {
        console.log("res about", res.data);
        console.log("res about us", res.data.data[0]);
        // console.log('data images', res.data[0].images);

        setData(res.data.data[0]);
        // return res.data;
        setLoading(false);
      })
      .catch((error) => {
        console.log("error get about us", error.response);
        // alert('error get');
      });
  };

  useEffect(() => {
    axios
      .get(API_URL_LOKAL + "/modules/rs/rent-unit")
      .then(({ data }) => {
        console.log("defaultApp -> data", rent);
        setRent(data);
      })
      .catch((error) => console.error(error));
    // .finally(() => setLoading(false));
  }, []);

  const goProductDetail = (item) => {
    navigation.navigate("EProductDetail", { item: item });
  };

  useEffect(() => {
    console.log("datauser", data);
    setTimeout(() => {
      setLoading(false);
      // dataAbout();
      getTower();
      setLoading(false);
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
      {loading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView>
          <View>
            {/* <Image source={Images.trip4} style={{width: '100%', height: 135}} /> */}
            <Image
              source={require("../../assets/images/logoIFCA.png")}
              style={{
                height: 200,
                width: 250,
                alignItems: "center",
                marginHorizontal: 100,
                flexDirection: "row",
                justifyContent: "center",
                alignSelf: "center",
                marginTop: 20,
              }}
            />
          </View>
          <View style={{ paddingTop: 3 }}>
            <Text
              headline
              semibold
              style={{ textAlign: "center", paddingBottom: 20 }}
            >
              {/* {t('who_we_are')} */}
              {/* {data.about_title} */}
              {data?.about_title?.replace(/<\/?[^>]+(>|$;)/gi, "")}
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
                  paddingTop: 0,
                  paddingBottom: 10,
                  fontSize: 15,
                }}
              >
                {data?.contact_name}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Icon name="mobile" size={20} />
                <Text> {data?.contact_no}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Icon name="envelope" size={20} />
                <Text> {data?.contact_email}</Text>
              </View>

              <Text
                semibold
                style={{
                  fontSize: 18,
                  paddingBottom: 10,
                  paddingTop: 15,
                }}
              >
                Contact Us
              </Text>
              <Text body style={{ paddingBottom: 5 }}>
                {data?.address}
              </Text>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Skip;
