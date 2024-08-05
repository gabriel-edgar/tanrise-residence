import {
  Text,
  // TextInput,
  // CheckBox,
  PlaceholderLine,
  Placeholder,
  Button,
  SafeAreaView,
  // RefreshControl,
  Header,
  Icon,
} from '@components';
import {BaseColor, BaseStyle, useTheme} from '@config';
import {CheckBox} from 'react-native-elements';

import {useNavigation} from '@react-navigation/native';

import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  TouchableOpacity,
  View,
  Platform,
  TouchableHighlight,
  ScrollView,
  TextInput,
  RefreshControl,
} from 'react-native';

import {useSelector} from 'react-redux';
import getUser from '../../selectors/UserSelectors';
import axios from 'axios';
import client from '../../controllers/HttpClient';
import styles from './styles';

import {RadioButton} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL_LOKAL} from '@env';

export default function SelectCategory({route}) {
  const {t, i18n} = useTranslation();
  const {colors} = useTheme();
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const [dataTowerUser, setdataTowerUser] = useState([]);
  const [arrDataTowerUser, setArrDataTowerUser] = useState([]);
  const users = useSelector(state => getUser(state));
  const [email, setEmail] = useState(users.user);
  const [urlApi, seturlApi] = useState(client);

  const [spinner, setSpinner] = useState(true);

  const [arrayholder, setArrayHolder] = useState([]);

  const [dataCategoryDetail, setDataCategoryDetail] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [typeLocation, setTypeLocation] = useState('');
  const [passProp, setpassProp] = useState(route.params.saveParams);
  //   console.log('passProps urutan ketiga', passProp);
  //   const [passProp, setPassProps] = useState();
  const [passPropStorage, setPassPropStorage] = useState();
  console.log('passProp >', passProp);
  const styleItem = {
    ...styles.profileItem,
    borderBottomColor: colors.border,
  };
  //-----FOR GET ENTITY & PROJJECT
  const getTower = async () => {
    console.log('email get tower', email);
    const data = {
      email: email,
      app: 'O',
    };

    const config = {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        // token: "",
      },
    };

    await axios
      .get(API_URL_LOKAL + `/getData/mysql/${data.email}/${data.app}`, {
        config,
      })
      .then(res => {
        const datas = res.data;

        const arrDataTower = datas.Data;
        console.log('get data tower', arrDataTower);
        arrDataTower.map(dat => {
          if (dat) {
            setdataTowerUser(dat);
            getSelectCategoryDetail(dat);
          }
        });
        setArrDataTowerUser(arrDataTower);
        setSpinner(false);

        // return res.data;
      })
      .catch(error => {
        console.log('error get tower api', error);
        alert('error get');
      });
  };

  const getDataStorage = async () => {
    const value = await AsyncStorage.getItem('@helpdeskStorage');

    const passPropStorage = JSON.parse(value);

    setPassPropStorage(passPropStorage);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      getTower(users);
      getDataStorage();
      searchFilterFunction();
      setSpinner(false);
      // setSpinner(false);
    }, 3000);
  }, []);

  const getSelectCategoryDetail = async data => {
    // console.log('passProp', passProp);
    const params = {
      entity_cd: data.entity_cd,
      project_no: data.project_no,
      //   category_group: 'CS',
      //   location_type: 'U', //ini nanti pake radiobutton
      category_group_cd: passProp.category_group_cd,
      // group_cd: passProp.category_group_cd, //hanya beda kolom sajaa, tetapi isi sama
      location_type: passProp.location_type, //ini nanti pake radiobutton
    };
    console.log('params >', params);

    const config = {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        token: '',
      },
    };

    const urlparams =
      '?entity_cd=' +
      params.entity +
      '&' +
      'project_no=' +
      params.project +
      '&' +
      'location_type=' +
      params.location_type +
      '&' +
      'category_group_cd=' +
      params.category_group_cd;

    // console.log('urlparams', urlApi + '/csentry-getCategoryDetail' + urlparams);

    await axios
      .post(API_URL_LOKAL + '/csentry-getCategoryDetail', params, {
        config,
      })
      .then(res => {
        // console.log('res detail', res);
        if (res.data.Error == false) {
          const datas = res.data;
          const dataCategoryDetails = datas.Data;
          console.log('data kategori', dataCategoryDetails);

          setDataCategoryDetail(dataCategoryDetails);
          setSpinner(false);
          // this.setState({isLoaded: !this.state.isLoaded}, () => {
          //   // alert(res.Pesan)
          //   this.setState({getbank: resData});
          // });
        } else {
          setSpinner(false);
          alert(res.Pesan);
        }
        console.log('ini isinya sama ga?', res.data.Data);
        setArrayHolder(res.data.Data);
        setSpinner(false);
        // return res.data;
      })
      .catch(error => {
        console.log('error get detail api', error.response);
        alert('error get');
      });
  };

  const searchFilterFunction = text => {
    setSpinner(true);
    console.log('text', text);

    const newData = arrayholder.filter(item => {
      const itemData = `${item.descs.toUpperCase()}`;
      const textData = text;
      return itemData.indexOf(textData) > -1;
    });
    console.log('new data', newData);
    setDataCategoryDetail(newData);
    setSpinner(false);
  };

  const handleClick = async (data, index) => {
    // const value = await AsyncStorage.getItem('@helpdeskStorage');

    // const passPropStorage = JSON.parse(value);
    console.log('params for submit storage', passPropStorage);
    console.log('params for submit passProp', passProp);

    console.log('data select category', data);
    const saveStorage = {
      ...passPropStorage,
      data,
    };

    const jsonValue = JSON.stringify(saveStorage);
    await AsyncStorage.setItem('@helpdeskStorage', jsonValue);
    console.log('params select category', saveStorage);
    //    console.log('loc_type', data.location_type);
    //    const passProp = {
    //      category_group_cd: data.category_group_cd,
    //      location_type: data.location_type,
    //    };
    navigation.navigate('SubmitHelpdesk', {saveStorage});
    //    navigation.navigate('SelectCategory', {
    //      // screen: 'Settings',
    //      params: passProp,
    //    });
  };

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'top', 'left']}>
      <Header
        title={t('select_category')} //belum dibuat lang
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
      {spinner ? (
        <View>
          {/* <Spinner visible={this.state.spinner} /> */}
          <Placeholder style={{marginVertical: 4, paddingHorizontal: 10}}>
            <PlaceholderLine width={100} noMargin style={{height: 40}} />
          </Placeholder>
        </View>
      ) : (
        <ScrollView>
          <View style={styles.wrap}>
            <Text title2>Ticket</Text>
            <Text headline style={{fontWeight: 'normal'}}>
              Select Category Details
            </Text>
            {dataCategoryDetail ? (
              <View>
                {/* // <ScrollView contentContainerStyle={{padding: 20}}> */}
                <TextInput
                  placeholder="Search Category"
                  style={{
                    color: '#555',
                    fontSize: 14,
                    borderColor: '#000',
                    borderWidth: 0.5,
                    borderRadius: 10,
                  }}
                  // onChangeText={this.handleSearch}
                  onChangeText={text =>
                    searchFilterFunction(text.toUpperCase())
                  }
                  autoCorrect={false}
                />
                <FlatList
                  contentContainerStyle={{paddingHorizontal: 20}}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={true}
                  refreshControl={
                    <RefreshControl
                      colors={[colors.primary]}
                      tintColor={colors.primary}
                      refreshing={refreshing}
                      onRefresh={() => {}}
                    />
                  }
                  data={dataCategoryDetail}
                  // keyExtractor={(item, index) => index}
                  keyExtractor={item => item.descs}
                  renderItem={({item, index, separators}) => (
                    <View key={index} style={{marginHorizontal: 10}}>
                      <TouchableOpacity
                        style={styleItem}
                        onPress={() => handleClick(item, index)}>
                        <Text body1>{item.descs}</Text>
                        <Icon
                          name="angle-right"
                          size={18}
                          color={colors.primary}
                          style={{marginLeft: 5}}
                          enableRTL={true}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>
            ) : (
              // {/* // </ScrollView> */}
              <Text>No Data</Text>
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
