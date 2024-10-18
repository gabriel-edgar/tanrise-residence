import {
  CardSlide,
  Header,
  Icon,
  Image,
  NewsList,
  SafeAreaView,
  StarRating,
  Tag,
  Text,
} from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
import { Images } from "@config";
import { HomeListData, HomePopularData } from "@data";
import * as Utils from "@utils";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Animated,
  FlatList,
  I18nManager,
  ScrollView,
  Share,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";
import { PlaceholderLine, Placeholder } from "@components";
import moment from "moment";
import RenderHtml from "react-native-render-html";
import { useWindowDimensions } from "react-native";

const AnnouceDetail = (props) => {
  const { navigation, route } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { item } = route.params;
  console.log("36 item: ", item);
  const [loading, setLoading] = useState(true);
  const [popular, setPopular] = useState(HomePopularData);
  const [list, setList] = useState(HomeListData);
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const scrollY = useRef(new Animated.Value(0)).current;
  const productData = { ...item };
  const { width } = useWindowDimensions();
  // console.log('productData', productData.images);

  const {
    style,
    onPress,
    images,
    news_descs,
    facility_descs,
    title,
    subtitle,
    announce_title,
    url_image,
    announce_descs,
    announce_file,
    date,
  } = productData;

  useEffect(() => {
    // console.log('liattt', annoe);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // let ann = announce_file?.replace("https", "http");
  let ann = images;
  // const annoe = [...ann];
  const annoe = ann;
  console.log("annoe", annoe);
  const goPostDetail = (item) => () => {
    navigation.push("PostDetail", { item: item });
  };

  // const onShare = async () => {
  //   try {
  //     const result = await Share.share({
  //       message: item.announce_descs,
  //       // title: item.news_title,
  //       url: item.images,
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
    outputRange: [BaseColor.greyColor, colors.primary],
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
    inputRange: [0, 450 - heightHeader],
    outputRange: [250, heightHeader],
    // extrapolate: "clamp",
    useNativeDriver: true,
  });

  const tagsStyles = {
    h1: { fontSize: 24, fontWeight: "bold", color: "blue" },
    p: { fontSize: 17, color: colors.text, textAlign: "justify" },
    a: { color: "purple", textDecorationLine: "underline" },
    strong: { fontWeight: "bold" },
  };

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
      <Fragment>
        <View style={styles.contentDescription}>
          <View>
            {annoe.map((item, key) => {
              return (
                <TouchableOpacity
                  key={key}
                  // style={{flex: 1, width: '100%'}};'

                  activeOpacity={1}
                  // onPress={() =>
                  //   navigation.navigate('PreviewImages', {images: item})
                  // }
                >
                  <Image
                    key={key}
                    style={{
                      // flex: 1,
                      // width: 800,
                      height: 250,
                      //marginTop: 20,
                      //backgroundColor: "blue",
                      //paddingTop: 5,
                    }}
                    resizeMode="contain"
                    source={{
                      uri: `${item.pict}`,
                      //uri: "https://reactnative.dev/img/tiny_logo.png",
                    }}
                  />
                  <Text subhead light style={{ marginTop: 10 }}>
                    Image Description: {item.descs}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View
            style={{
              marginVertical: 10,
            }}
          >
            <Text subhead light style={{ marginTop: 15 }}>
              {/* {moment(item.date).lang("en").startOf("hour").fromNow()} */}
              Posted{" "}
              {moment(item.audit_date).lang("en").startOf("hour").fromNow()}
            </Text>
          </View>
          <View
            style={{
              marginVertical: 10,
            }}
          >
            <Text bold style={{ marginTop: 15, fontSize: 20 }}>
              Information
            </Text>
            {/* <Text
              body2
              style={{
                lineHeight: 20,
                paddingTop: 10,
                paddingBottom: 20,
              }}
              numberOfLines={100}
            >
              {announce_descs}
            </Text> */}
            <RenderHtml
              source={{ html: announce_descs }}
              contentWidth={width}
              tagsStyles={tagsStyles}
            />
          </View>
        </View>
      </Fragment>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={[BaseStyle.safeAreaView]}
        forceInset={{ top: "always", bottom: "always" }}
      >
        <Header
          // style={{
          //   width: "90%",
          //   alignSelf: "center",
          // }}
          _numberOfLines={0}
          // title={t('Announce')}
          // renderLeft={() => {
          //   return (
          //     <Icon
          //       name="angle-left"
          //       size={20}
          //       color={colors.primary}
          //       enableRTL={true}
          //     />
          //   );
          // }}
          onPressLeft={() => {
            navigation.goBack();
          }}
          //title={announce_title}
          title={"Announcement"}
        />
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
          {loading ? renderPlaceholder() : renderContent()}
        </ScrollView>
      </SafeAreaView>

      <Animated.View style={[styles.headerStyle, { position: "absolute" }]}>
        <SafeAreaView
          style={{ width: "100%" }}
          forceInset={{ top: "always", bottom: "never" }}
        >
          <Header
            style={{ marginTop: 5 }}
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
                      tintColor: colors.primary,
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
                  style={[
                    styles.icon,
                    {
                      tintColor: headerBackgroundColor,
                    },
                  ]}
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
    </View>
  );
};

export default AnnouceDetail;
