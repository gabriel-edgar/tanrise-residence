import {
  CardChannelGrid,
  CardSlide,
  CategoryList,
  CardReport06,
  News43,
  Price2Col,
  Icon,
  PlaceholderLine,
  Placeholder,
  NewsList,
  SafeAreaView,
  Text,
  Transaction2Col,
} from "@/components";
import { BaseColor, BaseStyle, useTheme } from "@/config";
import {
  HomeChannelData,
  HomeListData,
  HomePopularData,
  HomeTopicData,
  PostListData,
} from "@/data";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  ScrollView,
  View,
  Image,
  Animated,
  ImageBackground,
  RefreshControl,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import getUser from "../../selectors/UserSelectors";
import HeaderCard from "./HeaderCard";
import HeaderHome from "./HeaderHome";
import styles from "./styles";
import Swiper from "react-native-swiper";
import Categories from "./Categories";
import axios from "axios";
import * as Utils from "@/utils";
import numFormat from "../../components/numFormat";

import { notifikasi_nbadge, actionTypes } from "../../actions/NotifActions";
import getNotifRed from "../../selectors/NotifSelectors";
//import messaging from "@react-native-firebase/messaging";
import apiCall from "../../config/ApiActionCreator";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Home = (props) => {
  const { navigation, route } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [topics, setTopics] = useState(HomeTopicData);
  const [channels, setChannels] = useState(HomeChannelData);
  const [popular, setPopular] = useState(HomePopularData);
  const [list, setList] = useState(HomeListData);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => getUser(state));
  const notif = useSelector((state) => getNotifRed(state));
  console.log("cobanotif di home", notif);
  // const email = user.user;
  const [email, setEmail] = useState(user != null ? user.user : "");
  console.log("user di home", user);
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const scrollY = useRef(new Animated.Value(0)).current;
  const [getDataDue, setDataDue] = useState([]);
  const [getDataNotDue, setDataNotDue] = useState([]);
  const [hasError, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const { width } = Dimensions.get("window");
  const [getDataHistory, setDataHistory] = useState([]);

  const [dataTowerUser, setdataTowerUser] = useState([]);
  const [arrDataTowerUser, setArrDataTowerUser] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const [entity_cd, setEntity] = useState("");
  const [project_no, setProjectNo] = useState("");

  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.notification
      );
      navigation.navigate("Notification", remoteMessage);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification
          );
          navigation.navigate("Notification", remoteMessage);
        }
        setLoading(false);
      });
  }, []);

  //untuk load badge notif
  useEffect(() => {
    dispatch(
      apiCall(
        `http://apps.pakubuwono-residence.com/apiwebpbi/api/setting/notification?email=${email}&entity_cd=01&project_no=01`
      )
    );
  }, []);

  const getTower = async () => {
    const data = {
      email: user.user,
      app: "O",
    };
    console.log("params for tower", data);
    const config = {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        // token: "",
      },
    };

    await axios
      .get(
        `http://apps.pakubuwono-residence.com/apiwebpbi/api/home/common-project/mysql/${data.email}/${data.app}`
      )
      .then((res) => {
        const datas = res.data;

        const arrDataTower = datas.Data;
        arrDataTower.map((dat) => {
          if (dat) {
            setdataTowerUser(dat);
            setEntity(dat.entity_cd);
            setProjectNo(dat.project_no);
            console.log("entity dari tower map", dat.entity_cd);
            console.log("project dari tower map", dat.project_no);
            notifUser(dat.entity_cd, dat.project_no);
          }
        });
        setArrDataTowerUser(arrDataTower);
        setSpinner(false);

        // return res.data;
      })
      .catch((error) => {
        console.log("error get tower api", error);
        alert("error get");
      });
  };

  const notifUser = useCallback(
    (entity_cd, project_no) =>
      dispatch(notifikasi_nbadge(email, entity_cd, project_no)),
    [email, entity_cd, project_no, dispatch]
  );
  // const notifUser = () => {
  //   console.log('entity dari tower', entity_cd);
  //   console.log('project dari tower', project_no);
  // };

  // useEffect(() => {
  //   axios
  //     .get('http://34.87.121.155:8000/ifcaprop-api/api/about/01/01')
  //     .then(({data}) => {
  //       console.log('data images?', data[0]);
  //       setData(data[0].images);
  //     })
  //     .catch(error => console.error(error))
  //     .finally(() => setLoading(false));
  // }, []);

  const dataImage = async () => {
    await axios
      .get(`http://apps.pakubuwono-residence.com/apiwebpbi/api/about/image`)
      .then((res) => {
        console.log("res image", res.data.data);
        // console.log('data images', res.data[0].images);
        setData(res.data.data);
        // return res.data;
      })
      .catch((error) => {
        console.log("error get about us image", error);
        // alert('error get');
      });
  };

  async function fetchDataDue() {
    try {
      const res = await axios.get(
        `http://apps.pakubuwono-residence.com/apiwebpbi/api/modules/billing/due-summary/IFCAPB/${user.user}`
      );
      setDataDue(res.data.Data);
      console.log("data get data due", res.data.Data);
    } catch (error) {
      setErrors(error);
      // alert(hasError.toString());
    }
  }

  async function fetchDataNotDue() {
    try {
      const res = await axios.get(
        `http://apps.pakubuwono-residence.com/apiwebpbi/api/modules/billing/current-summary/IFCAPB/${user.user}`
      );
      setDataNotDue(res.data.Data);
      console.log("data get data not due", res.data.Data);
    } catch (error) {
      setErrors(error);
      // alert(hasError.toString());
    }
  }

  async function fetchDataHistory() {
    try {
      const res = await axios.get(
        `http://apps.pakubuwono-residence.com/apiwebpbi/api/modules/billing/summary-history/IFCAPB/${user.user}`
      );
      setDataHistory(res.data.Data);
      console.log("data get history", res.data.Data);
    } catch (error) {
      setErrors(error);
      // alert(hasError.toString());
    }
  }

  const galery = [...data];

  //TOTAL DATE DUE
  const sum =
    getDataDue == 0
      ? 0
      : getDataDue.reduceRight((max, bills) => {
          return (max += parseInt(bills.mbal_amt));
        }, 0);

  console.log("sum", sum);

  //TOTAL DATE NOT DUE
  const sumNotDue =
    getDataNotDue == 0 || getDataNotDue == null
      ? 0
      : getDataNotDue.reduceRight((max, bills) => {
          return (max += parseInt(bills.mbal_amt));
        }, 0);

  console.log("sumNotDue", sumNotDue);

  const math_total = Math.floor(sumNotDue) + Math.floor(sum);
  console.log("math total", math_total);

  const sumHistory =
    getDataHistory == null
      ? 0
      : getDataHistory.reduceRight((max, bills) => {
          return (max += parseInt(bills.mdoc_amt));
        }, 0);

  console.log("sumHistory", sumHistory);

  //LENGTH
  const onSelect = (indexSelected) => {};

  const unique =
    getDataDue == 0 ? 0 : [...new Set(getDataDue.map((item) => item.doc_no))];
  console.log("unique", unique);

  const uniqueNotDue =
    getDataNotDue == 0 || getDataNotDue == null
      ? 0
      : [...new Set(getDataNotDue.map((item) => item.doc_no))];
  console.log("uniqueNotDue", uniqueNotDue);

  const invoice = unique == 0 ? 0 : unique.length;
  console.log("invoice", invoice);

  const invoiceNotDue = uniqueNotDue == 0 ? 0 : uniqueNotDue.length;
  console.log("invoiceNotDue", invoiceNotDue);

  const total_outstanding = Math.floor(invoice) + Math.floor(invoiceNotDue);
  console.log("total_outstanding", total_outstanding);

  const uniqueHistory =
    getDataHistory == null
      ? 0
      : [...new Set(getDataHistory.map((item) => item.doc_no))];
  // console.log('uniqueHistory', uniqueHistory);

  const invoiceHistory = uniqueHistory.length;
  console.log("invoiceHistory", invoiceHistory);

  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, 140],
    outputRange: [BaseColor.whiteColor, colors.text],
    extrapolate: "clamp",
    useNativeDriver: true,
  });

  //For header image opacity
  const headerImageOpacity = scrollY.interpolate({
    inputRange: [0, 250 - heightHeader - 20],
    outputRange: [1, 0],
    extrapolate: "clamp",
    useNativeDriver: true,
  });

  //artist profile image position from top
  const heightViewImg = scrollY.interpolate({
    inputRange: [0, 250 - heightHeader],
    outputRange: [250, heightHeader],
    useNativeDriver: true,
  });

  useEffect(() => {
    console.log("galery", galery);
    dataImage();
    console.log("datauser", user);
    console.log("about", data);
    fetchDataDue();
    fetchDataNotDue();
    fetchDataHistory();
    getTower();
    // fetchAbout();
    setLoading(false);
    // setTimeout(() => {
    //   fetchDataDue();
    //   fetchDataHistory();
    //   getTower();
    //   // fetchAbout();
    //   setLoading(false);
    // }, 1000);
  }, []);

  // useEffect(() => {
  //   notifUser();
  // }, []);

  const goPostDetail = (item) => () => {
    navigation.navigate("PostDetail", { item: item });
  };

  const renderContent = () => {
    const mainNews = PostListData[0];

    return (
      <SafeAreaView
        style={[BaseStyle.safeAreaView, { flex: 1 }]}
        edges={["top", "right", "bottom", "left"]}
      >
        {user == null || user == "" ? (
          <Text>data user dihome null</Text>
        ) : (
          <HeaderHome />
        )}

        <ScrollView
          // contentContainerStyle={styles.paddingSrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* <Image
            source={require('../../assets/images/pakubuwono.png')}
            style={{
              height: 60,
              width: 180,
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 80,
              marginBottom: 15,
              marginTop: -15,
              flexDirection: 'row',
              alignSelf: 'center',
            }}
          /> */}
          {/* <V style={{paddingTop: 10}}> */}

          {/* </ScrollView> */}

          <Animated.View
            style={[
              styles.headerImageStyle,
              {
                opacity: headerImageOpacity,
                height: heightViewImg,
                // flex: 1,
              },
            ]}
          >
            <Swiper
              dotStyle={{
                backgroundColor: BaseColor.dividerColor,
                marginBottom: 8,
              }}
              activeDotStyle={{
                marginBottom: 8,
              }}
              paginationStyle={{
                bottom: -18,
                // left: null,
                // right: 10,
              }}
              loop={true}
              autoplayTimeout={5}
              autoplay={true}
              activeDotColor={colors.primary}
              removeClippedSubviews={false}
              onIndexChanged={(index) => onSelect(index)}
            >
              {data.map((item, key) => {
                return (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      backgroundColor: "transparent",
                    }}
                    key={key}
                  >
                    <Image
                      key={key}
                      // key={'fast-' + `${item.id}`}
                      // key={item.length}
                      style={{
                        flex: 1,
                        width,
                        // borderRadius: 10,
                      }}
                      source={{ uri: `${item.pict}` }}
                    />
                  </View>
                  // <TouchableOpacity
                  //   key={key}
                  //   style={{flex: 1}}
                  //   activeOpacity={1}
                  //   onPress={() =>
                  //     navigation.navigate('PreviewImages', {images: data})
                  //   }>
                  //   <Image
                  //     key={key}
                  //     style={{flex: 1, width: '100%'}}
                  //     // source={{uri: `${item.pict}`}}
                  //     source={{uri: item.pict}}
                  //   />
                  // </TouchableOpacity>
                );
              })}
            </Swiper>
          </Animated.View>

          {/* <News43
            loading={loading}
            onPress={goPostDetail(mainNews)}
            style={{marginTop: 1}}
            title={mainNews.title}
          /> */}
          <View
            style={{ flexDirection: "row", marginVertical: 15, padding: 20 }}
          >
            <View style={{ flex: 1, paddingRight: 7 }}>
              <CardReport06
                style={{ backgroundColor: colors.primary, borderRadius: 25 }}
                icon="arrow-up"
                title="Invoice Outstanding"
                // price={invoice == undefined ? 0 : invoice}
                price={total_outstanding == undefined ? 0 : total_outstanding}
                // percent={numFormat(sum)}
                percent={numFormat(math_total)}
                onPress={() => navigation.navigate("Billing")}
              />
            </View>
            <View style={{ flex: 1, paddingLeft: 7 }}>
              <CardReport06
                style={{ backgroundColor: colors.primary, borderRadius: 25 }}
                icon="arrow-up"
                title="Invoice History"
                price={invoiceHistory == undefined ? 0 : invoiceHistory}
                percent={numFormat(sumHistory)}
                onPress={() => navigation.navigate("BillingHistory")}
              />
            </View>
          </View>
          <View style={styles.paddingContent}>
            {user == null || user == "" ? (
              <Text>user not available</Text>
            ) : (
              <Categories style={{ marginTop: 10 }} />
            )}
          </View>

          {/* {loading ? renderPlaceholder() : renderContent()} */}
        </ScrollView>
      </SafeAreaView>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={["top", "right", "bottom", "left"]}
      >
        {renderContent()}
      </SafeAreaView>
    </View>
  );
};

export default Home;
