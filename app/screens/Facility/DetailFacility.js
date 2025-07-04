import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  ScrollView,
  View,
  Animated,
  ActivityIndicator,
  TouchableOpacity,
  Picker,
  Text,
  useWindowDimensions,
} from "react-native";
import styles from "./styles";
import {
  CardChannelGrid,
  CardSlide,
  CategoryList,
  News43,
  ListFacility,
  SafeAreaView,
  ProductSpecGrid,
  // Text,
  Header,
  Image,
  Icon,
  colors,
  PlaceholderLine,
  Placeholder,
} from "@/components";
import axios from "axios";
import Swiper from "react-native-swiper";
import { BaseColor, BaseStyle, Images, useTheme } from "@/config";
import * as Utils from "@/utils";
import RNPickerSelect from "@react-native-picker/picker";
import { Button } from "../../components";

import { useSelector } from "react-redux";
import getUser from "../../selectors/UserSelectors";
import RenderHtml from "react-native-render-html";
import { API_URL_LOKAL } from "@env";
const DetailFacility = (props) => {
  const { navigation, route } = props;
  // const {params} = props;
  console.log("routes from facility menu", route.params);
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const scrollY = useRef(new Animated.Value(0)).current;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setErrors] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const users = useSelector((state) => getUser(state));
  const [email, setEmail] = useState(users.user);
  const [dataTowerUser, setdataTowerUser] = useState([]);
  const [arrDataTowerUser, setArrDataTowerUser] = useState([]);
  const [arrImages, setArrayImage] = useState();

  const [spinner, setSpinner] = useState(true);
  const [terms, setDataTerms] = useState([]);
  const onSelect = (indexSelected) => {};
  // --- for get tower
  const getTower = async () => {
    const data = {
      email: email,
      app: "O",
    };

    const config = {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        // token: "",
      },
    };
    axios
      .get(
        API_URL_LOKAL + `/home/common-project/mysql/${data.email}/${data.app}`,
        {
          config,
        }
      )
      .then((res) => {
        const datas = res.data;
        // console.log('tower entity projek', datas);
        const arrDataTower = datas.Data;
        arrDataTower.map((dat) => {
          if (dat) {
            // console.log('map arrdatatower', dat);
            setdataTowerUser(dat);
          }
        });
        setArrDataTowerUser(arrDataTower);

        setSpinner(false);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getTower();
    // getData();
  }, []);

  // useEffect(() => {
  //   console.log('arrdatatower', dataTowerUser);
  // }, [dataTowerUser]);

  useEffect(() => {
    // getTower();
    getData();
    getTermsConditions();
  }, [dataTowerUser]);

  useEffect(() => {}, []);

  const getData = async () => {
    console.log("dataTowerUser", dataTowerUser);
    const entity_cd = dataTowerUser.entity_cd;
    const project_no = dataTowerUser.project_no;
    const facility_cd = route.params.facility_cd;
    console.log(
      "url data detail facility",
      API_URL_LOKAL +
        "/modules/facilities/facility-detail/" +
        entity_cd +
        "/" +
        project_no +
        "/" +
        facility_cd
    );
    const response = await axios(
      API_URL_LOKAL +
        "/modules/facilities/facility-detail/" +
        entity_cd +
        "/" +
        project_no +
        "/" +
        facility_cd
    );
    console.log("response fasility detail: ", response.data);
    setData(response.data);

    // const dataArr = response.data[0];
    const dataAll = response.data;
    console.log("data all", dataAll);

    // const imagefor = dataAll.forEach((image, i) => {
    //   console.log('images foreach', image.images);

    //   setArrayImage(image.images);
    // });
    const arrImage = dataAll.map((imgs, keyimgs) => {
      console.log("imgs[0", imgs.images);
      return imgs.images;
    });
    console.log("coba arrimages isinya", ...arrImage);
    setArrayImage(...arrImage);

    setSpinner(arrImage != "" ? false : true);
  };

  const getTermsConditions = async () => {
    const entity_cd = dataTowerUser.entity_cd;
    const project_no = dataTowerUser.project_no;
    const response = await axios(
      API_URL_LOKAL +
        "/modules/facilities/facility-tnc/" +
        entity_cd +
        "/" +
        project_no
    );
    console.log("response terms data: ", response.data);
    setDataTerms(response.data.Data);
    setSpinner(false);
  };

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
  const detail = data?.map((post) => {
    return (
      <View key={post.id}>
        <Text
          headline
          style={{ marginTop: 0, fontSize: 20, fontWeight: "bold" }}
        >
          {post.title}
        </Text>

        {/* <View style={styles.specifications}>
          <Text style={{fontSize: 16}}>
            Status :{' '}
            <Text style={{color: colors.primary, fontWeight: 'bold'}}>
              Open
            </Text>{' '}
            /{' '}
            <Text style={{color: BaseColor.redColor, fontWeight: 'bold'}}>
              Close
            </Text>
          </Text>
          <Text></Text>
          <ProductSpecGrid
            style={{flex: 1, fontSize: 20}}
            description={'Status'}
            title={post.openjam}
          /> 
        </View> */}

        <View style={[styles.specifications, { marginTop: 10 }]}>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 16, color: BaseColor.grayColor }}>
              Phone
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: colors.primary,
                fontWeight: "bold",
              }}
            >
              {post.phone}
            </Text>
          </View>

          {/* <ProductSpecGrid
            style={{flex: 1}}
            description={'Phone'}
            title={post.phone}
          /> */}
        </View>
        <View style={{ margin: 0, paddingBottom: 0 }}>
          <Text
            style={{
              fontSize: 16,
              color: BaseColor.grayColor,
              paddingBottom: 5,
            }}
          >
            Description
          </Text>
          <Text
            style={{
              textAlign: "justify",
              width: "100%",
              color: colors.primary,
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            {post.description.replace(/<\/?[^>]+(>|$;)/gi, "")}
          </Text>
          {/* <Text style={{textAlign: 'justify'}}>{post.description}</Text> */}
        </View>
        <View style={styles.specifications}>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ flex: 1, fontSize: 16, color: BaseColor.grayColor }}>
              Location
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: colors.primary,
                fontWeight: "bold",
              }}
            >
              {post.location}
            </Text>
          </View>
          {/* <ProductSpecGrid
            style={{flex: 1}}
            description={'Location'}
            title={post.location}
          /> */}
        </View>

        <View style={styles.specifications}>
          <View>
            <Text
              style={{
                fontSize: 16,
                color: BaseColor.grayColor,
                // fontWeight: 'bold',
              }}
            >
              Terms & Conditions
            </Text>
            {terms.map((dataTerms, index) => (
              <View
                key={index}
                style={{ marginRight: 20, textAlign: "justify" }}
              >
                <RenderHtml
                  source={{ html: dataTerms.description }}
                  contentWidth={width}
                />
              </View>
            ))}
          </View>

          {/* <TouchableOpacity
            onPress={() => {
              navigation.navigate('TermsConditions', dataTowerUser);
            }}>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  color: BaseColor.grayColor,
                  fontWeight: 'bold',
                }}>
                Terms & Conditions
              </Text>
            </View>
          </TouchableOpacity> */}
        </View>
      </View>
    );
  });

  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView, { flex: 1 }]}
      edges={["right", "top", "left"]}
    >
      <Header
        title={t("Detail")}
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
      {spinner ? (
        <View>
          {/* <Spinner visible={this.state.spinner} /> */}
          <Placeholder style={{ marginVertical: 4, paddingHorizontal: 10 }}>
            <PlaceholderLine width={100} noMargin style={{ height: 40 }} />
          </Placeholder>
        </View>
      ) : (
        <ScrollView
          // contentContainerStyle={styles.paddingSrollView}
          height={"100%"}
        >
          <Animated.View
            style={[
              styles.headerImageStyle,
              {
                opacity: headerImageOpacity,
                height: heightViewImg,
                padding: 0,
              },
            ]}
          >
            <Swiper
              // showsButtons
              style={{ padding: 0 }}
              dotStyle={{
                backgroundColor: BaseColor.dividerColor,
                marginBottom: 8,
              }}
              activeDotStyle={{
                marginBottom: 8,
              }}
              paginationStyle={{ bottom: 0 }}
              loop={true}
              autoplay={true}
              autoplayTimeout={3}
              activeDotColor={colors.primary}
              removeClippedSubviews={false}
              onIndexChanged={(index) => onSelect(index)}
            >
              {arrImages != undefined ? (
                arrImages.map &&
                arrImages.map((item, key) => {
                  return (
                    <TouchableOpacity
                      key={key}
                      style={{ flex: 1, padding: 0 }}
                      activeOpacity={1}
                      onPress={() =>
                        navigation.navigate("PreviewImages", {
                          images: arrImages,
                        })
                      }
                    >
                      <View key={key}>
                        {/* <Text style={{color: 'black'}}>{item.pict}</Text> */}
                        <Image
                          key={key}
                          style={{
                            width: "100%",
                            height: Utils.scaleWithPixel(250),
                          }}
                          source={{ uri: `${item.pict}` }}
                        />
                      </View>
                    </TouchableOpacity>
                  );
                })
              ) : (
                <View>
                  {/* <Spinner visible={this.state.spinner} /> */}
                  <Placeholder
                    style={{ marginVertical: 4, paddingHorizontal: 10 }}
                  >
                    <PlaceholderLine
                      width={100}
                      noMargin
                      style={{ height: 40 }}
                    />
                  </Placeholder>
                </View>
              )}
            </Swiper>
          </Animated.View>
          <View style={styles.paddingSrollView}>{data && detail}</View>
        </ScrollView>
      )}

      <TouchableOpacity
        onPress={() => navigation.navigate("BookingFacility", route.params)}
      >
        <View
          style={{
            // flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            height: 70,
            backgroundColor: colors.primary,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16, color: "#FFF" }}>
            View Schedule
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DetailFacility;
