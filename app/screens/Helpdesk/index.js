import {
  Header,
  Icon,
  ListTextButton,
  SafeAreaView,
  Tag,
  Text,
  Button,
  CategoryGrid,
  CategoryBoxColor,
  ModalFilterLocation,
} from '@components';
import {BaseColor, BaseStyle, useTheme} from '@config';
import {CheckBox} from 'react-native-elements';
import {FFriends} from '@data';
import {useNavigation} from '@react-navigation/native';
import {haveChildren} from '@utils';
import React, {useEffect, useState, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {SceneMap} from 'react-native-tab-view';
import {useSelector} from 'react-redux';
import getUser from '../../selectors/UserSelectors';
import axios from 'axios';
import client from '../../controllers/HttpClient';
import styles from './styles';

import ModalDropdown_debtor from '@components/ModalDropdown_debtor';
import ModalDropdown_lotno from '@components/ModalDropdown_lotno';

const Friends = () => {
  const {t, i18n} = useTranslation();
  const {colors} = useTheme();
  const [keyword, setKeyword] = useState('');
  const [friends, setFriends] = useState(FFriends);
  const navigation = useNavigation();

  //   const filterCategory = text => {
  //     console.log('text filter', text);
  //     setKeyword(text);
  //     if (text) {
  //       setFriends(
  //         FFriends.filter(
  //           item =>
  //             haveChildren(item.name, text) || haveChildren(item.total, text),
  //         ),
  //       );
  //     } else {
  //       setFriends(FFriends);
  //     }
  //   };

  const onSend = () => {
    navigation.navigate('FSendMoney');
  };

  return (
    <View style={{flex: 1, paddingHorizontal: 20}}>
      {/* <View
        style={{
          paddingTop: 15,
          paddingBottom: 20,
        }}>
        <TextInput
          onChangeText={filterCategory}
          placeholder={t('name_username_or_email')}
          value={keyword}
          icon={
            <TouchableOpacity onPress={() => filterCategory('')}>
              <Icon name="times" size={16} color={BaseColor.grayColor} />
            </TouchableOpacity>
          }
        />
      </View> */}
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={friends}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <ListTextButton
            image={item.image}
            name={item.name}
            description={item.total}
            componentRight={
              <Tag
                onPress={e => {
                  e.stopPropagation();
                  onSend(item);
                }}
                outline
                style={{
                  paddingHorizontal: 20,
                  backgroundColor: colors.background,
                }}>
                {`${t('send')}`}
              </Tag>
            }
          />
        )}
      />
    </View>
  );
};

export default function Helpdesk() {
  const {t, i18n} = useTranslation();
  const {colors} = useTheme();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [dataLocation, setLocation] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [urlApi, seturlApi] = useState(client);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'newticket', title: 'New Ticket'},
    {key: 'status', title: 'Status'},
  ]);

  const icons = [
    {key: '1', icon: 'home'},
    {key: '2', icon: 'bell'},
  ];
  const [search, setSearch] = useState('');
  const renderScene = SceneMap({
    newticket: Friends,
    status: Friends,
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'top', 'left']}>
      <Header
        // title={t('choose_friend')}
        title={t('helpdesk')} //belum ada lang translatenya
        renderLeft={() => {
          return (
            <Icon
              name="angle-left"
              size={20}
              color={colors.text}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      {/* {dataLocation.map((data, index) => (
        <ModalFilterLocation
          options={data}
          isVisible={modalVisible}
          onSwipeComplete={() => {
            setModalVisible(false);
            //   setSortOption(sortOptionInit);
          }}
          onApply={onApply}
          onSelectFilter={onSelectFilter}
        />
      ))} */}
      <View
        style={{
          flexDirection: 'row',
        }}>
        <CategoryBoxColor
          loading={loading}
          style={{
            // paddingLeft: index % 2 == 0 ? 0 : 15,
            paddingBottom: 15,
            justifyContent: 'space-between',
            paddingHorizontal: 10,
          }}
          title={'Helpdesk'}
          icon={'headset'}
          color={colors.primary}
          onPress={() => navigation.navigate('SpecHelpDesk')}
        />
        <CategoryBoxColor
          loading={loading}
          style={{
            // paddingLeft: index % 2 == 0 ? 0 : 15,
            paddingBottom: 15,
            justifyContent: 'space-between',
            paddingHorizontal: 10,
          }}
          title={'Status'}
          icon={'list-alt'}
          color={colors.primary}
          onPress={() => navigation.navigate('StatusHelp')}
        />
      </View>

      {/* <TabSlider
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
      /> */}
    </SafeAreaView>
  );
}
