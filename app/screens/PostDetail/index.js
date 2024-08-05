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
  Linking,
  ScrollView,
  Share,
  TouchableOpacity,
  View,
} from 'react-native';
import {Dimensions} from 'react-native';
import styles from './styles';
import DeviceInfo from 'react-native-device-info';
import {PlaceholderLine, Placeholder} from '@components';
import {Button} from '../../components';
import RenderHtml from 'react-native-render-html';
import moment from 'moment';
const PostDetail = props => {
  let isTablet = DeviceInfo.isTablet();
  console.log('istablet', isTablet);
  const {navigation, route} = props;
  const {t} = useTranslation();
  const {colors} = useTheme();
  const {item} = route.params;
  const [loading, setLoading] = useState(true);
  const [popular, setPopular] = useState(HomePopularData);
  const [list, setList] = useState(HomeListData);
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const scrollY = useRef(new Animated.Value(0)).current;
  const {
    style,
    onPress,
    image,
    news_descs,
    facility_descs,
    title,
    subtitle,
    news_title,
    url_image,
    date,
    source,
    date_created,
  } = item[0];
  const reps = url_image.replace('https', 'http');
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const goPostDetail = item => () => {
    navigation.push('PostDetail', {item: item});
  };

  // const onShare = async () => {
  //   console.log('options', options);
  //   const htmlnews = item.news_descs.replace(/<\/?[^>]+(>|$;)/gi, '');

  //   const htmlnewsnbsp = htmlnews.replace(/&nbsp;/g, ' ');

  //   const htmlnewsquot = htmlnewsnbsp.replace(/&quot;/g, '');

  //   try {
  //     const result = await Share.share({
  //       message: item.source != null ? item.source : htmlnewsquot,
  //       title: item.news_title,
  //       url: item.source,
  //     });

  //     if (result.action === Share.sharedAction) {
  //       if (result.activityType) {
  //         alert('Post Shared');
  //       }
  //     } else if (result.action === Share.dismissedAction) {
  //       alert('Post cancelled');
  //     }
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  //For header background color from transparent to header color
  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, 140],
    outputRange: [colors.primary, colors.primary],
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
    inputRange: [0, 250 - heightHeader],
    outputRange: [250, heightHeader],
    // extrapolate: "clamp",
    useNativeDriver: true,
  });

  const heightViewImgTab = scrollY.interpolate({
    inputRange: [0, 350 - heightHeader],
    outputRange: [350, heightHeader],
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
          <Text
            body2
            style={{
              lineHeight: 20,
              paddingTop: 10,
              paddingBottom: 20,
            }}
            numberOfLines={100}>
            {/* {news_descs.replace(/<\/?[^>]+(>|$;)/gi, '')} */}
            {news_descs
              .replace(/\&nbsp;/g, '')
              .replace(/<\/?[^>]+(>|$;)/gi, '')}
          </Text>
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
          // title={item.news_title}
          title={news_title}
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
          {/* <View
            style={{
              height: isTablet ? 250 - heightHeader : 240 - heightHeader,
              borderWidth: 1,
              borderColor: '#000',
            }}
          /> */}
          <View style={{marginBottom: 20}}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() =>
                navigation.navigate('PreviewImagesAnnounceHome', {
                  images: reps,
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
                // source={{uri: `${announce_file}`}}
                source={{uri: `${reps}`}}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginVertical: 10,
              marginTop: isTablet ? 250 : 0,
              paddingHorizontal: 20,
            }}>
            <Text medium caption1 grayColor>
              {/* {item.date}
              {moment(item.date_created).startOf('hour').fromNow()} */}
              {date}
              {moment(date_created).lang('en').startOf('hour').fromNow()}
            </Text>
            <Text title1 semibold style={{marginVertical: 10}}>
              {/* {item.news_title} */}
              {news_title}
            </Text>
          </View>

          {loading ? renderPlaceholder() : renderContent()}
        </ScrollView>
      </SafeAreaView>

      {/*
      <Animated.View
        style={[
          isTablet ? styles.headerImageStyle : styles.headerImageStyle,
          {
            opacity: headerImageOpacity,
            height: isTablet ? heightViewImgTab : heightViewImg,
          },
        ]}>
        <Image
          source={{uri: `${url_image}`}}
          style={{
            // height: isTablet ? Dimensions.get('window').height / 2.5 : '100%',
            height: isTablet ? Dimensions.get('window').height / 2.5 : '100%',
            width: isTablet ? Dimensions.get('window').width : '100%',

            // resizeMode: 'cover',
          }}
        />
        {/* <TouchableOpacity
          style={[styles.viewIcon, {backgroundColor: colors.primaryLight}]}
          onPress={() => {
            Linking.openURL(`${item.source}`);
          }}>
          <Icon
            solid
            name="paper-plane"
            size={20}
            color={BaseColor.whiteColor}
            // onPress={() => console.log("Your code")}
          />
        </TouchableOpacity> 
      </Animated.View>
      */}
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

export default PostDetail;
