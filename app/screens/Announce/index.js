import {
  CardChannelGrid,
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
import {object} from 'prop-types';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, ScrollView, View, ActivityIndicator} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CardReport01, CardReport08} from '../../components';
import List from '../../components/Product/List';
import styles from './styles';
import {API_URL_LOKAL} from '@env';

const Announce = props => {
  const {navigation} = props;
  const {t} = useTranslation();
  const {colors} = useTheme();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setErrors] = useState(false);

  useEffect(() => {
    axios
      .get(API_URL_LOKAL + '/announcement')
      .then(({data}) => {
        console.log('defaultApp -> data', data.data);
        const peopleArray = Object.values(data);
        console.log('peopleArray', peopleArray);
        setData(data.data);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const goPost = item => () => {
    navigation.navigate('Post', {item: item});
  };

  // const goAnnouceDetail = item => () => {
  // const announce_file = item.announce_file.replace('https', 'http');
  // const replJ = JSON.stringify({announce_file});
  // let items = new Object();
  // items.push(announce_file);

  // console.log('repl', items);
  // item.forEach(function (key, val) {
  //   item[key] = val.replace('https', 'http');
  // });
  // const repl = item.announce_file.replace('https', 'http');
  //   console.log('announce detail', item);
  //   navigation.navigate('AnnouceDetail', {item: item});
  // };
  const goAnnouceDetail = item => {
    console.log('announce detail', item);
    navigation.navigate('AnnouceDetail', {item: item});
  };

  const goToCategory = () => {
    navigation.navigate('Category');
  };

  const renderContent = () => {
    const mainNews = PostListData[0];
    return (
      <SafeAreaView
        style={[BaseStyle.safeAreaView, {flex: 1}]}
        edges={['right', 'top', 'left']}>
        <Header
          title={t('Announcement')}
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
        <ScrollView contentContainerStyle={styles.paddingSrollView}>
          <FlatList
            scrollEnabled={false}
            contentContainerStyle={styles.paddingFlatList}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <CardReport01
                loading={loading}
                subtitle={item.announce_descs}
                title={item.announce_title}
                // icon="bullhorn"

                images={require('../../assets/images/logoannounce.png')}
                date={moment(item.date_created).startOf('hour').fromNow()}
                style={{
                  marginBottom: index == data.length - 1 ? 0 : 15,
                }}
                onPress={() => goAnnouceDetail(item)}
              />
            )}
          />
        </ScrollView>
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

export default Announce;
