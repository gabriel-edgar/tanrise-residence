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
} from '@components';
import {BaseColor, BaseStyle, useTheme} from '@config';
import {Images} from '@config';
import {HomeListData, HomePopularData} from '@data';
import * as Utils from '@utils';
import React, {Fragment, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Animated,
  FlatList,
  I18nManager,
  ScrollView,
  Share,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import {PlaceholderLine, Placeholder} from '@components';
import moment from 'moment';

const AnnouceDetail = props => {
  const {navigation, route} = props;
  const {t} = useTranslation();
  const {colors} = useTheme();
  const {item} = route.params;
  const [loading, setLoading] = useState(true);
  const [popular, setPopular] = useState(HomePopularData);
  const [list, setList] = useState(HomeListData);
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const scrollY = useRef(new Animated.Value(0)).current;
  const productData = {...item};
  // console.log('from home', productData);
  console.log('from home', item);

  const {
    style,
    onPress,
    // images,
    news_descs,
    facility_descs,
    title,
    subtitle,
    announce_title,
    url_image,
    announce_descs,
    announce_file,
    date,
  } = item[0];

  console.log('announce_file', announce_file);
  const repl = announce_file.replace('https', 'http');
  console.log('annc', repl);

  useEffect(() => {
    // console.log('liattt', annoe);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // const annoe = [...images];

  const goPostDetail = item => () => {
    navigation.push('PostDetail', {item: item});
  };

  // const onShare = async () => {
  //   try {
  //     const result = await Share.share({
  //       message: announce_descs,
  //       // title: item.news_title,
  //       url: announce_file,
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
    extrapolate: 'clamp',
    useNativeDriver: true,
  });

  //For header image opacity
  const headerImageOpacity = scrollY.interpolate({
    inputRange: [0, 250 - heightHeader - 20],
    outputRange: [1, 0],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });

  //artist profile image position from top
  const heightViewImg = scrollY.interpolate({
    inputRange: [0, 450 - heightHeader],
    outputRange: [250, heightHeader],
    // extrapolate: "clamp",
    useNativeDriver: true,
  });

  const renderPlaceholder = () => {
    let holders = Array.from(Array(5));

    return (
      <Placeholder>
        <View style={{padding: 20}}>
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
            <TouchableOpacity
              // key={key}
              // style={{flex: 1}}
              activeOpacity={1}
              onPress={() =>
                navigation.navigate('PreviewImagesAnnounceHome', {
                  images: announce_file,
                })
              }>
              <Image
                // key={key}
                style={{
                  // flex: 1,
                  // width: '100%',
                  height: 500,
                  marginTop: 20,
                }}
                resizeMode="contain"
                source={{uri: `${announce_file}`}}
              />
            </TouchableOpacity>
            {/* {annoe.map((item, key) => {
              return (
                <TouchableOpacity
                  key={key}
                  // style={{flex: 1}}
                  activeOpacity={1}
                  onPress={() =>
                    navigation.navigate('PreviewImages', {images: images})
                  }>
                  <Image
                    key={key}
                    style={{
                      // flex: 1,
                      // width: '100%',
                      height: 500,
                      marginTop: 20,
                    }}
                    resizeMode="contain"
                    source={{uri: `${item.pict}`}}
                  />
                </TouchableOpacity>
              );
            })} */}
          </View>
          {/* <View
            style={{
              marginVertical: 10,
            }}>
            <Text subhead light style={{marginTop: 15}}>
              {moment(item.date).startOf('hour').fromNow()}
            </Text>
          </View> */}
          <View
            style={{
              marginVertical: 10,
            }}>
            <Text bold style={{marginTop: 15, fontSize: 20}}>
              Information
            </Text>
            <Text
              body2
              style={{
                lineHeight: 20,
                paddingTop: 10,
                paddingBottom: 20,
              }}
              numberOfLines={100}>
              {announce_descs}
              {/* {announce_descs.replace(/\&nbsp;/g, '')} */}
            </Text>
          </View>
        </View>
      </Fragment>
    );
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView
        style={[BaseStyle.safeAreaView]}
        forceInset={{top: 'always', bottom: 'always'}}>
        <Header
          style={{
            width: '90%',
            // textAlign: 'center',
            alignSelf: 'center',
            // flex: 1,
          }}
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
          title={announce_title}
        />
        <ScrollView
          onContentSizeChange={() => {
            setHeightHeader(Utils.heightHeader());
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          overScrollMode={'never'}
          style={{zIndex: 10}}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {y: scrollY},
                },
              },
            ],
            {
              useNativeDriver: false,
            },
          )}>
          {loading ? renderPlaceholder() : renderContent()}
        </ScrollView>
      </SafeAreaView>

      <Animated.View style={[styles.headerStyle, {position: 'absolute'}]}>
        <SafeAreaView
          style={{width: '100%'}}
          forceInset={{top: 'always', bottom: 'never'}}>
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
