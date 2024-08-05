import {
  CardSlide,
  CategoryList,
  News43,
  ListFacility,
  SafeAreaView,
  Text,
  Header,
  Icon,
  colors,
} from '@components';
import {BaseStyle, useTheme} from '@config';
import {
  HomeChannelData,
  HomeListData,
  HomePopularData,
  HomeTopicData,
  PostListData,
} from '@data';
import axios from 'axios';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, ScrollView, View, ActivityIndicator} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {NewsList, NotFound, CategoryGrid} from '../../components';
import List from '../../components/Product/List';
import styles from './styles';
import {CardReport01, CardReport08} from '../../components';

const ClubFacilities = props => {
  const {navigation} = props;
  const {route} = props;
  const {t} = useTranslation();
  const {colors} = useTheme();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setErrors] = useState(false);
  const [dataItems, setdataItems] = useState(route.params.items);
  console.log('dataItems', dataItems);

  const filterForPromo = dataItems
    .filter(item => item.category === 'P')
    .map(items => items);

  const filterForClubFacilities = dataItems
    .filter(item => item.category === 'CF')
    .map(items => items);

  const joinFilterDataPromoClubFac = [
    ...filterForPromo,
    ...filterForClubFacilities,
  ];

  const arrayImagePromoClubFac = joinFilterDataPromoClubFac.map((item, key) => {
    return {
      ...item.images[0],
    };
  });

  console.log('array image', arrayImagePromoClubFac);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const renderContent = () => {
    const mainNews = PostListData[0];
    return (
      <SafeAreaView
        style={[BaseStyle.safeAreaView, {flex: 1}]}
        edges={['right', 'top', 'left']}>
        <Header
          title={t('Event & Restaurant')}
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
        {/* <ScrollView contentContainerStyle={styles.paddingSrollView}> */}
        {arrayImagePromoClubFac.length > 0 ? (
          <FlatList
            scrollEnabled={false}
            contentContainerStyle={styles.paddingFlatList}
            data={arrayImagePromoClubFac}
            numColumns={2}
            key={2}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <CategoryGrid
                onPress={() =>
                  navigation.navigate('PreviewImageHome', {
                    images: item.pict,
                  })
                }
                // style={{paddingHorizontal: 5}}
                image={{uri: item.pict}}
                //   title={item.descs} //bisa aja dimunculin, tapi harus deskripsi / textnya betul
              ></CategoryGrid>
            )}
          />
        ) : loading ? (
          <View>
            <ActivityIndicator size="large" color="#37BEB7" />
          </View>
        ) : (
          <NotFound />
        )}
        {/* </ScrollView> */}
      </SafeAreaView>
    );
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'top', 'left']}>
        {renderContent()}
      </SafeAreaView>
    </View>
  );
};

export default ClubFacilities;
