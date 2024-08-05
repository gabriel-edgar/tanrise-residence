import {
  Text,
  TextInput,
  // CheckBox,
  PlaceholderLine,
  Placeholder,
  Button,
  SafeAreaView,
  RefreshControl,
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
} from 'react-native';

import {useSelector} from 'react-redux';
import getUser from '../../selectors/UserSelectors';
import axios from 'axios';
import client from '../../controllers/HttpClient';
import styles from './styles';

import {RadioButton} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL_LOKAL} from '@env';
export default function CategoryHelp({route}) {
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

  const [dataCategory, setDataCategory] = useState([]);

  const [typeLocation, setTypeLocation] = useState('');
  const [passPropStorage, setPassPropStorage] = useState();
  const [passProp, setpassProp] = useState(route.params.saveStorage);
  //   console.log('passprop kategori help', passProp);
  console.log('arrDataTowerUser', arrDataTowerUser);
  console.log('dataTowerUser >', dataTowerUser.project_no);
  const styleItem = {
    ...styles.profileItem,
    borderBottomColor: colors.border,
  };
  //-----FOR GET ENTITY & PROJJECT
  const getTower = async () => {
    setEmail(passProp.dataDebtor.email);
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
        arrDataTower.map(dat => {
          if (dat) {
            setdataTowerUser(dat);
          }
        });
        setArrDataTowerUser(arrDataTower);
        console.log('arrDataTower', arrDataTower);
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
    const DataTower = await AsyncStorage.getItem('@DataTower');
    console.log('data tower', DataTower);

    const passPropStorage = JSON.parse(value);

    setPassPropStorage(passPropStorage);
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      getTower(users);
      getDataStorage();
      defaultLocation();
      // getCategoryHelp;
      // setSpinner(false);
    }, 3000);
  }, []);

  const defaultLocation = () => {
    getTower(users);
    getCategoryHelp('U');
  };

  // const handleSetRadio = (checked, type) => {
  //   setSpinner(true);
  //   // console.log('dataTowerUser', dataTowerUser);
  //   // console.log('type', type);
  //   // setTypeLocation(type);
  //   if (type === 'P') {
  //     //   console.log('type p');
  //     //   getCategoryHelp();
  //     setTypeLocation('P');
  //     getTower(users);
  //     getCategoryHelp(type);
  //   } else {
  //     setTypeLocation('U');
  //     //   console.log('type u');
  //     getTower(users);
  //     getCategoryHelp(type);
  //     //   getCategoryHelp(type);
  //   }
  // };

  const getCategoryHelp = async type => {
    const params = {
      entity: dataTowerUser.entity_cd,
      project: dataTowerUser.project_no,
      location_type: type, //ini nanti pake radiobutton
    };
    console.log('params category', params);

    const config = {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        token: '',
      },
    };

    await axios
      .post(API_URL_LOKAL + '/csentry-getCategoryHelp', params, {
        config,
      })
      .then(res => {
        const datas = res.data;
        const dataCategorys = datas.Data;
        console.log('data kategori', dataCategorys);

        setDataCategory(dataCategorys);
        setSpinner(false);
        // return res.data;
      })
      .catch(error => {
        console.log('error get tower api', error.response);
        alert('error get');
      });
  };

  const handleClick = async (data, index) => {
    console.log('category_grop_cd', data.category_group_cd);
    console.log('loc_type', data.location_type);
    console.log('passprops', passProp);
    const saveParams = {
      //   ...passPropStorage,
      passProp,
      category_group_cd: data.category_group_cd,
      location_type: data.location_type,
    };
    const saveStorage = {
      ...passPropStorage,
      //   ...passProp,
      category_group_cd: data.category_group_cd,
      location_type: data.location_type,
    };
    console.log('urutan kedua props', saveStorage);
    console.log('urutan kedua params', saveParams);

    const jsonValue = JSON.stringify(saveStorage);
    await AsyncStorage.setItem('@helpdeskStorage', jsonValue);

    const jsonValueNullLocation = JSON.stringify('');
    await AsyncStorage.setItem('@locationStorage', jsonValueNullLocation);

    navigation.navigate('SelectCategory', {
      // screen: 'Settings',
      saveParams,
    });
  };

  //    const onCategoryPress = cat => {
  //        this.setState({isDisabled: true}, () => {
  //          this.goToScreen('screen.SelectCategory', cat);
  //        });
  //      };
  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'top', 'left']}>
      <Header
        title={t('category_help')} //belum dibuat lang
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
      <View style={styles.wrap}>
        <Text title2>Ticket</Text>
        <Text headline style={{fontWeight: 'normal'}}>
          Service Request Form
        </Text>
        <Text headline style={{fontWeight: 'normal', paddingTop: 20}}>
          Location
        </Text>

        <View style={{flexDirection: 'row'}}>
          {/* <View style={{flexDirection: 'row'}}>
            <RadioButton
              color={BaseColor.hijau_pkbw}
              //   uncheckedColor={'blue'}
              value="P"
              status={typeLocation == 'P' ? 'checked' : 'unchecked'}
              // onPress={() => }
              onPress={() => handleSetRadio(true, 'P')}
            />
            <Text headline style={{alignSelf: 'center', fontWeight: 'normal'}}>
              Public Area
            </Text>
          </View> */}
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <RadioButton
              color={BaseColor.hijau_pkbw}
              value="U"
              // status={typeLocation == 'U' ? 'checked' : 'unchecked'}
              status={'checked'}
              // onPress={() => setTypeLocation('U')}
              // onPress={() => handleSetRadio(true, 'U')}
            />
            <Text headline style={{alignSelf: 'center', fontWeight: 'normal'}}>
              Unit
            </Text>
          </View>
        </View>
        <View style={{marginTop: 20}}>
          {/* {!typeLocation ? (
            <Text
              headline
              style={{
                fontWeight: 'normal',
                paddingTop: 20,
                color: 'red',
                textAlign: 'center',
              }}>
              Choose Location Type First
            </Text>
          ) : */}
          {spinner ? (
            <View>
              {/* <Spinner visible={this.state.spinner} /> */}
              <Placeholder style={{marginVertical: 4, paddingHorizontal: 10}}>
                <PlaceholderLine width={100} noMargin style={{height: 40}} />
              </Placeholder>
            </View>
          ) : (
            <ScrollView style={{marginHorizontal: 10}}>
              {/* <Text headline style={{fontWeight: 'normal', paddingTop: 20}}>
                Choose Category
              </Text> */}
              {dataCategory.map((data, index) => (
                <View key={index}>
                  <TouchableOpacity
                    style={styleItem}
                    onPress={() => handleClick(data, index)}>
                    <Text body1>{data.descs}</Text>
                    <Icon
                      name="angle-right"
                      size={18}
                      color={colors.primary}
                      style={{marginLeft: 5}}
                      enableRTL={true}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
