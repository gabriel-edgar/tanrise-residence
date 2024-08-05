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
  Animated,
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

const MasonryEvent = ({
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

  const goPostDetail = item => {
    console.log('for news', item);
    const itemDummy = {
      news_descs: 'Window Cleaning Ironwood 01 s/d 04 Maret 2022',
      news_title: 'Window Cleaning',
      audit_date: '2022-03-05 22:55:42',
      audit_user: 'MGR',
      date_created: '2022-03-05 22:53:45',
      entity_cd: '01',
      url_image:
        'http://103.111.204.131/webpbi/storage/file_announce/Window_Cleaning_periode_01_sd_04_Mar_2022_Ironjpg_Page1.jpg',

      project_no: '01',
      ref_no: 'RSD/03/002',
      rowID: 25,
      status: 'Active',
    };
    console.log('item dummy for news', itemDummy);
    navigation.navigate('PostDetail', {item: itemDummy});
  };

  return (
    <ScrollView horizontal>
      <FlatList
        ref={slider}
        //   horizontal
        pagingEnabled={true}
        scrollEnabled={false}
        snapToInterval={totalItemWidth}
        decelerationRate="fast"
        bounces={false}
        contentContainerStyle={contentContainerStyle}
        // columnWrapperStyle={{flexWrap: 'wrap'}}
        data={data}
        numColumns={3}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <View key={item.id} style={{marginTop: 12}}>
            <Image
              source={{uri: item.imgURL}}
              style={{
                height: item.id % 2 ? 250 : 150,
                width: 200,
                alignSelf: 'stretch',
              }}
              resizeMode={'cover'}></Image>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{width: separatorWidth}} />}
        keyExtractor={(item, index) => item.toString() + index}
      />
    </ScrollView>
  );
};
export default MasonryEvent;

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
