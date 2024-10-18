import {
  Button,
  Header,
  Icon,
  Image,
  ProductColorPicker,
  ProductSize,
  ProductSpecGrid,
  SafeAreaView,
  StarRating,
  Tag,
  Text,
} from "@components";
import { BaseColor, BaseStyle, Images, useTheme } from "@config";
import { EFilterColors, EFilterSizes } from "@data";
import * as Utils from "@utils";
import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import PreviewImages from "../EProductDetail/PreviewImages";
import {
  Animated,
  I18nManager,
  ScrollView,
  Share,
  TouchableOpacity,
  View,
  Linking,
  Alert,
} from "react-native";
import ModalProduct from "./ModalProduct";
import styles from "./styles";
import Swiper from "react-native-swiper";
import { PlaceholderLine, Placeholder } from "@components";
import moment from "moment";
import numFormat from "../../components/numFormat";
//import Mailer from 'react-native-mail';
import getUser from "../../selectors/UserSelectors";
import { useSelector } from "react-redux";
import { ListThumbCircle } from "../../components";

const EProductDetail = (props) => {
  const { navigation, route } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { item } = route.params;
  const [loading, setLoading] = useState(true);
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const [modalVisible, setModalVisible] = useState(false);
  const [eColors, setEcolors] = useState(EFilterColors);
  const [eSizes, setESizes] = useState(EFilterSizes);
  const [colorChoosed, setColorChoosed] = useState(EFilterColors[0]);
  const [sizeChoosed, setSizeChoosed] = useState(EFilterSizes[0]);
  const [isFavourite, setIsFavourtie] = useState(false);
  const user = useSelector((state) => getUser(state));

  const scrollY = useRef(new Animated.Value(0)).current;
  const productData = { ...item };
  const {
    id,
    adv_descs,
    title,
    style,
    image,
    qty_maid_bedroom,
    styleThumb,
    costPrice,
    salePrice,
    pict,
    agent_name,
    onPress,
    point,
    qty_bedroom,
    adv_title,
    floor,
    email,
    advID,
    no_wa,
    nett,
    publish_date,
    semi_gross,
    property_type,
    qty_bathroom,
    price,
    price_descs,
    status,
    certificate,
    electrical_power,
    qty_parking,
    avatar,
    images,
    market_type,
    currency,
    adv_type,
    no_hp,
  } = productData;

  useEffect(() => {
    console.log("texttdsadas", productData);
    console.log("98 message: ", message);
    console.log("98 qty_bathroom: ", qty_bathroom);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const message =
    "\n Advertising ID : " +
    productData.adv_no +
    "\n Name : " +
    user.name +
    "\n Email : " +
    user.email +
    "\n Phone Number : " +
    user.Handphone +
    "\n Contact me for the details information.";

  // const sendEmail = () => {
  //   const datas = {
  //     dataEmail: productData.email,
  //     dataProject: productData.subject,
  //     name: productData.agent_name,
  //     emailUser: productData.email,
  //     handphone: productData.no_wa,
  //   };
  //   console.log('datas', datas);
  //   const message =
  //     "<!DOCTYPE html> <meta http-equiv='Content-Type' content='text/html; charset=iso-8859-1'> <body> <div>  Name : " +
  //     datas.name +
  //     '<br> Email : ' +
  //     datas.dataEmail +
  //     '<br> Phone Number : ' +
  //     datas.handphone +
  //     '<br><br> Contact me for the details information. </div> </body> </html>';

  //   console.log('datas', datas);
  //   console.log('cek messages', message);

  //   Mailer.mail(
  //     {
  //       subject: "I'm interested about reservation " + datas.dataProject,
  //       recipients: [`${datas.dataEmail}`],
  //       ccRecipients: [''],
  //       bccRecipients: [''],
  //       body: message,
  //       isHTML: true,
  //     },
  //     (error, event) => {
  //       Alert.alert(
  //         error,
  //         event,
  //         [
  //           {
  //             text: 'Ok',
  //             onPress: () => console.log('OK: Email Error Response'),
  //           },
  //           {
  //             text: 'Cancel',
  //             onPress: () => console.log('CANCEL: Email Error Response'),
  //           },
  //         ],
  //         {cancelable: true},
  //       );
  //     },
  //   );
  // };
  const galery = [...images];

  const goPostDetail = (item) => () => {
    navigation.push("PostDetail", { item: item });
  };

  // const onShare = async () => {
  //   try {
  //     const result = await Share.share({
  //       message: 'www.pakubuwono-residence.com',
  //     });

  //     if (result.action === Share.sharedAction) {
  //       if (result.activityType) {
  //         // shared with activity type of result.activityType
  //       } else {
  //         // shared
  //       }
  //     } else if (result.action === Share.dismissedAction) {
  //       // dismissed
  //     }
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  //For header background color from transparent to header color
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

  const onSelect = (indexSelected) => {};

  const renderPlaceholder = () => {
    let holders = Array.from(Array(5));

    return (
      <Placeholder>
        <View style={{ padding: 20 }}>
          {holders.map((item, index) => (
            <PlaceholderLine key={index} width={100} />
          ))}
        </View>
      </Placeholder>
    );
  };

  const renderContent = () => {
    return (
      <View style={{ paddingHorizontal: 20 }}>
        <View style={styles.contentDescription}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 4,
            }}
          >
            <Text title3>
              {/* {currency} {price_descs} */}
              {currency} {price}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Icon
            name="bath"
            size={14}
            style={{
              flexDirection: "row",
              marginRight: 10,
              color: colors.text,
            }}
          >
            {" "}
            {qty_bathroom}
          </Icon>
          <Icon
            name="bed"
            size={14}
            style={{
              flexDirection: "row",
              marginRight: 10,
              color: colors.text,
            }}
          >
            {" "}
            {/* {parseInt(qty_bedroom) + parseInt(qty_maid_bedroom)} */}
            {qty_bedroom}
          </Icon>
          <Icon
            name="building"
            size={14}
            style={{
              flexDirection: "row",
              marginRight: 10,
              color: colors.text,
            }}
          >
            {" "}
            {nett}
          </Icon>
          <Icon
            name="map"
            size={14}
            style={{
              flexDirection: "row",
              marginRight: 10,
              color: colors.text,
            }}
          >
            {" "}
            {semi_gross}
          </Icon>
          {/* <Icon
            name="clock"
            size={14}
            style={{
              flexDirection: 'row-reverse',
              marginRight: 60,
              color: BaseColor.grayColor,
            }}>
            {' '}
            {moment(publish_date).format('H:mm:ss')}
          </Icon> */}
        </View>
        <View>
          <Text headline style={{ marginTop: 20 }}>
            {t("Descriptions")}
          </Text>
          <Text
            light
            style={{
              paddingVertical: 15,
            }}
          >
            {adv_descs}
          </Text>
        </View>
        <View>
          <Text headline style={{ marginTop: 20 }}>
            {t("Type Market")}
          </Text>
          <Text subhead style={{ marginTop: 10, color: BaseColor.grayColor }}>
            {market_type}
          </Text>
        </View>

        <Text headline style={{ marginTop: 20 }}>
          {t("specifications")}
        </Text>

        <View style={styles.specifications}>
          <ProductSpecGrid
            style={{ flex: 1 }}
            description={"Property Type"}
            title={property_type}
          />
          <ProductSpecGrid
            style={{ flex: 1 }}
            description={"Price"}
            title={`${currency} ` + `${price}`}
          />
        </View>
        <View style={styles.specifications}>
          <ProductSpecGrid
            style={{ flex: 1 }}
            description={"Bedroom"}
            title={qty_bedroom}
          />

          <ProductSpecGrid
            style={{ flex: 1 }}
            description={"Maid Bedroom"}
            title={qty_maid_bedroom}
          />
        </View>
        <View style={styles.specifications}>
          <ProductSpecGrid
            style={{ flex: 1 }}
            description={"Semi Gross Area (m²)"}
            title={semi_gross}
          />
          <ProductSpecGrid
            style={{ flex: 1 }}
            description={"Bathroom"}
            title={qty_bathroom}
          />
        </View>
        <View style={styles.specifications}>
          <ProductSpecGrid
            style={{ flex: 1 }}
            description={"Nett Area (m²)"}
            title={nett}
          />
          {/* <ProductSpecGrid
            style={{flex: 1}}
            description={'Floor'}
            title={floor}
          /> */}
        </View>
        <View style={styles.specifications}>
          <ProductSpecGrid
            style={{ flex: 1 }}
            description={"Certificate"}
            title={certificate}
          />
          {/* <ProductSpecGrid
            style={{ flex: 1 }}
            description={"Status"}
            title={status}
          /> */}
        </View>
        <View style={styles.specifications}>
          <ProductSpecGrid
            style={{ flex: 1 }}
            description={"Electrical Power (watts)"}
            title={electrical_power}
          />
          <ProductSpecGrid
            style={{ flex: 1 }}
            description={"Parking"}
            title={qty_parking}
          />
        </View>
        <View>
          {/* <ListThumbCircle source={avatar} /> */}
          <ListThumbCircle
            image={{ uri: `${avatar}` }}
            txtLeftTitle={agent_name}
            txtContent={email}
          />
          {/* <Text title4 semibold style={{marginTop: 5}}>
            {agent_name}
          </Text>
          <Text title4 light style={styles.contentRight}>
            {email}
          </Text> */}
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={[BaseStyle.safeAreaView]}
        forceInset={{ top: "always", bottom: "always" }}
      >
        <Header title={adv_type} />
        <ScrollView
          onContentSizeChange={() => {
            setHeightHeader(Utils.heightHeader());
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          overScrollMode={"never"}
          style={{ zIndex: 10 }}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { y: scrollY },
                },
              },
            ],
            {
              useNativeDriver: false,
            }
          )}
        >
          <View style={{ height: 230 - heightHeader }} />
          <View
            style={{
              marginVertical: 10,
              paddingHorizontal: 20,
            }}
          >
            <Text title3 style={{ marginVertical: 10, marginVertical: 4 }}>
              {adv_title}
            </Text>
          </View>

          {loading ? renderPlaceholder() : renderContent()}
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
          }}
        >
          {/* <Button full style={{flex: 1}} onPress={() => setModalVisible(true)}>
            {t('I am Interested')}
          </Button> */}

          <TouchableOpacity
            style={{
              marginTop: 10,
              marginBottom: 20,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() =>
              user !== null
                ? Linking.openURL(
                    `mailto:${email}?subject=${
                      adv_type + adv_title
                    }&body=${message}`
                  )
                : navigation.navigate("SignIn")
            }
          >
            <Icon
              name="envelope"
              size={24}
              style={{
                color: BaseColor.blueColor,
              }}
            />
            <Text subheadline>{t("Send Email")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 10,
              marginBottom: 20,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() =>
              user !== null
                ? Linking.openURL(`tel:${no_hp}`)
                : navigation.navigate("SignIn")
            }
          >
            <Icon
              name="phone"
              size={24}
              style={{
                color: BaseColor.blueColor,
              }}
            />
            <Text subheadline>{t("Call Me")}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              marginTop: 10,
              marginBottom: 20,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() =>
              user !== null
                ? Linking.openURL(
                    // `mailto:${email}?subject=${subject}&body=Description`,
                    `whatsapp://send?text=${
                      adv_type + adv_title
                    }\n${message}&phone=${no_wa}`
                  )
                : navigation.navigate("SignIn")
            }
          >
            <Icon
              name="whatsapp"
              size={24}
              style={{
                color: BaseColor.blueColor,
              }}
            />
            <Text subheadline>{t("Send Whatsapp")}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <Animated.View
        style={[
          styles.headerImageStyle,
          {
            opacity: headerImageOpacity,
            height: heightViewImg,
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
          paginationStyle={{ bottom: 0 }}
          loop={true}
          autoplayTimeout={5}
          autoplay={true}
          activeDotColor={colors.primary}
          removeClippedSubviews={false}
          onIndexChanged={(index) => onSelect(index)}
        >
          {galery.map((item, key) => {
            return (
              <TouchableOpacity
                key={key}
                style={{ flex: 1 }}
                activeOpacity={1}
                onPress={() =>
                  navigation.navigate("PreviewImages", { images: images })
                }
              >
                <Image
                  key={key}
                  style={{
                    flex: 1,
                    width: "100%",
                    backgroundColor: "lightgrey",
                  }}
                  resizeMode="contain"
                  source={{ uri: `${item.pict.replace("https", "https")}` }}
                />
              </TouchableOpacity>
            );
          })}
        </Swiper>
      </Animated.View>
      <Animated.View style={[styles.headerStyle, { position: "absolute" }]}>
        <SafeAreaView
          style={{ width: "100%" }}
          forceInset={{ top: "always", bottom: "never" }}
        >
          <Header
            title=""
            renderLeft={() => {
              return (
                <Animated.Image
                  resizeMode="contain"
                  style={[
                    styles.icon,
                    {
                      transform: [
                        {
                          scaleX: I18nManager.isRTL ? -1 : 1,
                        },
                      ],
                      tintColor: headerBackgroundColor,
                    },
                  ]}
                  source={Images.angleLeft}
                />
              );
            }}
            renderRight={() => {
              return (
                <Animated.Image
                  resizeMode="contain"
                  // style={[
                  //   styles.icon,
                  //   {
                  //     tintColor: headerBackgroundColor,
                  //   },
                  // ]}
                  // source={Images.shareAltSolid}
                />
              );
            }}
            onPressLeft={() => {
              navigation.goBack();
            }}
            // onPressRight={onShare}
          />
        </SafeAreaView>
      </Animated.View>
      {/* <ModalProduct
        isVisible={modalVisible}
        onSwipeComplete={() => setModalVisible(false)}
        onApply={() => {
          setModalVisible(false);
          sendEmail();
        }}
      /> */}
    </View>
  );
};

export default EProductDetail;
