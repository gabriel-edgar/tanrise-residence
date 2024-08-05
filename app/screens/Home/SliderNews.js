import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  createRef,
} from 'react';
import {useNavigation} from '@react-navigation/core';
import {
  FlatList,
  ScrollView,
  View,
  Image,
  // Animated,
  ImageBackground,
  RefreshControl,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

import {Header, SafeAreaView, Icon} from '@components';
import {BaseStyle, useTheme} from '@config';
import {useTranslation} from 'react-i18next';
import axios from 'axios';

import Carousel from 'react-native-reanimated-carousel';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import {API_URL_LOKAL} from '@env';

const SliderNews = ({
  style = {},
  separatorWidth = 0,
  contentContainerStyle = {},
  data = [],
  //   item,
  imageKey,
  //   onPress,
  //   index,
  active,
  local,
  loop = false,
}) => {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const slider = createRef();
  const navigation = useNavigation();
  const itemWidth = Math.round(Dimensions.get('window').width);
  //   const separatorWidth = separatorWidth;
  const totalItemWidth = itemWidth + separatorWidth;

  const [index, setIndex] = useState('');
  const progressValue = 0;
  //   const [data, setData] = useState([]);

  //   const onViewableItemsChanged = ({viewableItems, changed}) => {
  //     console.log('onViewableItemsChanged Calling on Scroll...');
  //     // if (viewableItems.length > 0) {
  //     //   console.log('object', viewableItems[0].index);
  //     //   //   let currentIndex = viewableItems[0].index;
  //     //   //   if (currentIndex % data.length === data.length - 1 && loop) {
  //     //   //     setIndex(currentIndex);
  //     //   //     setData([...data, ...data]);
  //     //   //   } else {
  //     //   //     setIndex(currentIndex);
  //     //   //   }

  //     //   //   if (currentIndexCallback) {
  //     //   //     currentIndexCallback(currentIndex);
  //     //   //   }
  //     // }
  //   };
  const onViewableCall = () => {
    console.log('onViewableItemsChanged Calling on Scroll...');
  };

  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 50,
  };

  const goPostDetail = item => {
    console.log('for news', item);

    item.category == 'N' ? getNewsDetail(item) : getAnnounceDetail(item);
  };

  const getNewsDetail = async item => {
    console.log('rowid for detail', item.rowID);
    await axios
      .get(API_URL_LOKAL + `/news/id/${item.rowID}`)
      .then(res => {
        console.log('res news detail', res.data.data);

        navigation.navigate('PostDetail', {item: res.data.data});
      })
      .catch(error => {
        console.log('error get news announce detail', error);
        // alert('error get');
      });
  };

  const getAnnounceDetail = async item => {
    console.log('rowid for detail', item.rowID);
    await axios
      .get(API_URL_LOKAL + `/announce/id/${item.rowID}`)
      .then(res => {
        console.log('res announce detail', res.data.data);

        navigation.navigate('AnnounceDetailHome', {item: res.data.data});
      })
      .catch(error => {
        console.log('error get news announce detail', error);
        // alert('error get');
      });
  };

  const width = Dimensions.get('window').width;
  // const width = Dimensions.get('window').width - 45;
  const IMAGE_WIDTH = 250;
  // const image_margin = 70; //70 pas slide ke 1 dan ke 4 bagus
  const image_margin = 100; //70 pas slide ke 1 dan ke 4 bagus
  const nishhar = width - ((IMAGE_WIDTH + image_margin) * 2 + image_margin * 2);

  return (
    // <FlatList
    //   ref={slider}
    //   horizontal
    //   pagingEnabled={true}
    //   snapToInterval={totalItemWidth}
    //   snapToAlignment="start"
    //   // snapToInterval={Dimensions.get('window').width - 200}
    //   // snapToOffsets={[...Array(data.length)].map((x, i) => {
    //   //   console.log('index', x);
    //   //   i * (IMAGE_WIDTH + 2 * image_margin) - nishhar * 0.5;
    //   // })}
    //   decelerationRate="fast"
    //   bounces={true}
    //   contentContainerStyle={contentContainerStyle}
    //   data={data}
    //   showsHorizontalScrollIndicator={false}
    //   // initialScrollIndex={500}
    //   renderItem={({item, index}) => (
    //     <TouchableOpacity
    //       //   style={[styles.videoContainer]}
    //       style={{
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //         marginVertical: 10,
    //         marginHorizontal: 10,

    //         // marginRight: 10,
    //         // marginLeft: 10,
    //       }}
    //       //   onPress={() => onPress(item)}
    //       onPress={() => goPostDetail(item)}>
    //       <View style={[styles.imageContainer, styles.shadow]}>
    //         <Image
    //           //   style={[
    //           //     styles.videoPreview,
    //           //     active ? {} : {height: 220, width: 300},
    //           //   ]}
    //           style={{
    //             // height: 220,
    //             // width: 370,
    //             height: 450,
    //             margin: 5,
    //             width: 250,
    //             resizeMode: 'cover',
    //             // marginHorizontal: 10,
    //             borderRadius: 10,
    //           }}
    //           source={{uri: item.url_image.replace('https', 'http')}}
    //           // source={item.url_image}
    //           //   source={local ? item.image : {uri: item.image}}
    //         />
    //         {/* <Text>{item.image}</Text> */}
    //       </View>
    //       {/* <Text style={styles.desc}>{item.desc}</Text> */}
    //     </TouchableOpacity>
    //   )}
    //   ItemSeparatorComponent={() => <View style={{width: separatorWidth}} />}
    //   keyExtractor={(item, index) => item.toString() + index}
    // />
    <View style={{flex: 1}}>
      <Carousel
        loop={false}
        pagingEnabled={true}
        snapEnabled={true}
        // autoPlay={false}
        autoPlayInterval={1500}
        // onProgressChange={(_, absoluteProgress) =>
        //   (progressValue.value = absoluteProgress)
        // }
        width={width}
        height={420}
        // mode="normal-horizontal"
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 130,
        }}
        data={data}
        renderItem={({index, item}) => (
          <TouchableOpacity
            //   style={[styles.videoContainer]}
            style={{
              // backgroundColor: 'yellow',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 10,
              // marginHorizontal: 10,

              // marginRight: 10,
              // marginLeft: 10,
            }}
            //   onPress={() => onPress(item)}
            onPress={() => goPostDetail(item)}>
            <View style={[styles.imageContainer, styles.shadow]}>
              <Image
                //   style={[
                //     styles.videoPreview,
                //     active ? {} : {height: 220, width: 300},
                //   ]}
                style={{
                  // height: 220,
                  // width: 370,
                  height: 450,
                  margin: 5,
                  width: 250,
                  resizeMode: 'cover',
                  // marginHorizontal: 10,
                  borderRadius: 10,
                }}
                source={{uri: item.url_image.replace('https', 'http')}}
                // source={item.url_image}
                //   source={local ? item.image : {uri: item.image}}
              />
              {/* <Text>{item.image}</Text> */}
            </View>
            {/* <Text style={styles.desc}>{item.desc}</Text> */}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
export default SliderNews;

const styles = StyleSheet.create({
  videoContainer: {
    width: 275,
    paddingVertical: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  videoPreview: {
    width: 275,
    // height: 155,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  desc: {
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 24,
    marginTop: 18,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
