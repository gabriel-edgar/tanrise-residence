import {Header, Icon, Image, SafeAreaView, Text} from '@components';
import {BaseColor, BaseStyle, Images, useTheme} from '@config';
import React, {useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import Swiper from 'react-native-swiper';
import styles from './styles';

const imagesInit = [
  {id: '1', image: Images.location1, selected: true},
  {id: '2', image: Images.location2},
  {id: '3', image: Images.location3},
  {id: '4', image: Images.location4},
  {id: '5', image: Images.location5},
  {id: '6', image: Images.location6},
  {id: '7', image: Images.location7},
];

export default function PreviewImageHome({navigation, route}) {
  const {colors} = useTheme();
  const imagesParam = route?.params?.images ?? imagesInit;
  let flatListRef = null;
  let swiperRef = null;

  const [images, setImages] = useState(imagesParam);

  const [indexSelected, setIndexSelected] = useState(0);

  console.log('images preview', images);

  /**
   * call when select image
   *
   * @param {*} indexSelected
   */
  const onSelect = indexSelected => {
    setIndexSelected(indexSelected);
    setImages(
      images.map((item, index) => {
        if (index == indexSelected) {
          return {
            ...item,
            selected: true,
          };
        } else {
          return {
            ...item,
            selected: false,
          };
        }
      }),
    );
    flatListRef.scrollToIndex({
      animated: true,
      index: indexSelected,
    });
  };

  /**
   * @description Called when image item is selected or activated
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @param {*} touched
   * @returns
   */
  const onTouchImage = touched => {
    if (touched == indexSelected) return;
    swiperRef.scrollBy(touched - indexSelected, false);
  };

  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView, {backgroundColor: 'black'}]}
      edges={['right', 'top', 'left']}>
      <Header
        style={{backgroundColor: 'black'}}
        title=""
        renderRight={() => {
          return <Icon name="times" size={20} color={BaseColor.whiteColor} />;
        }}
        onPressRight={() => {
          navigation.goBack();
        }}
        barStyle="light-content"
      />

      <View>
        <Image
          // key={key}
          style={{width: '100%', height: '95%'}}
          resizeMode="contain"
          source={{uri: images}}
        />
      </View>
    </SafeAreaView>
  );
}
