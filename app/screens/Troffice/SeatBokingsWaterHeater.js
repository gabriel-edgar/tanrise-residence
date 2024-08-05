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
  Tag,
  ListOptionSelected,
} from '@components';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import IconAnt from 'react-native-vector-icons/AntDesign';
import {enableExperimental} from '@utils';
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
  StyleSheet,
  Alert,
} from 'react-native';
import {ProgressBar, MD3Colors, ToggleButton} from 'react-native-paper';
import Modal from 'react-native-modal';
// import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {useSelector} from 'react-redux';
import getUser from '../../selectors/UserSelectors';
import axios from 'axios';
import client from '../../controllers/HttpClient';
import styles from './styles';

//   import {RadioButton} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL_LOKAL} from '@env';
export default function SeatBooking(props) {
  const {t, i18n} = useTranslation();
  const {colors} = useTheme();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const [dataTowerUser, setdataTowerUser] = useState([]);
  const [entity, setEntity] = useState('');
  const [project_no, setProjectNo] = useState('');
  const [arrDataTowerUser, setArrDataTowerUser] = useState([]);
  const users = useSelector(state => getUser(state));
  const [email, setEmail] = useState(users.user);
  const [urlApi, seturlApi] = useState(client);

  const [spinner, setSpinner] = useState(true);
  const [spinnerHour, setSpinnerHours] = useState(true);
  const [dataCategory, setDataCategory] = useState([]);

  const [passPropStorage, setPassPropStorage] = useState();
  const [passProp, setpassProp] = useState(props.route.params);
  const [selected, setSelected] = useState(null);
  const [getBookingTime, setBookingTime] = useState([]);
  const [loadingTab, setLoadingTab] = useState(true);
  const [getDataOnClick, setDataOnClick] = useState();
  const [getDateOnClick, setDateOnClick] = useState([]);
  const [getSlotOnClick, setSlotOnClick] = useState([]);
  const [getHourOnClick, setHourOnClick] = useState([]);
  const [time, setTime] = useState({});
  const [timedate, setTimeDate] = useState([]);
  const [data, setData] = useState([]);
  const [databookdate, setDatabookDate] = useState([]);
  const [dataBooked1, setDataBooked1] = useState([]);
  const [dataBooked2, setDataBooked2] = useState([]);
  const [dataBooked3, setDataBooked3] = useState([]);
  const [dataBooked4, setDataBooked4] = useState([]);
  const [isExpand, setIsExpand] = useState(false);
  // const [isExpandReason, setIsExpandReason] = useState(false);
  const [isIconUp, setIconUp] = useState(false);

  const [modalSuccessVisible, showModalSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [messageResult, setMessageResult] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [DateIsActive, setDateIsActive] = useState();

  console.log('gethours', getHourOnClick);
  console.log('passProp :', passProp);
  console.log('parameter :', props.route.params);
  console.log('parameter :', passPropStorage);
  console.log('dataTowerUser', dataTowerUser);
  console.log('arrDataTowerUser', arrDataTowerUser);
  console.log('passProp', passProp);
  console.log('passPropStorage', passPropStorage);
  console.log('messageResult', messageResult);
  const TABS = [
    {
      id: 'O',
      title: t('Water Heater Overhaul'),
    },
  ];

  console.log('Overhaul Clg', TABS[1]);
  const [tab, setTab] = useState(TABS[0]);

  console.log('bookdate', data[4]?.book_date);
  const TABSDATE = [
    {
      id: 1,
      title: data[0]?.book_date,
    },
    {
      id: 2,
      title: data[1]?.book_date,
    },
    {
      id: 3,
      title: data[2]?.book_date,
    },
    {
      id: 4,
      title: data[3]?.book_date,
    },
  ];
  const [tabDate, setTabDate] = useState(TABSDATE[0]);
  console.log('tabDate >', tabDate);
  const tab1 = data.filter(x => x.id == '1');
  const tab2 = data.filter(x => x.id == '2');
  const tab3 = data.filter(x => x.id == '3');
  const tab4 = data.filter(x => x.id == '4');

  useEffect(() => {
    getDateBook(dataTowerUser);
  }, [dataTowerUser]);

  const getDateBook = async datas => {
    const entity_cd = datas.entity_cd;
    const project_no = datas.project_no;
    const category_cd = passProp.category_cd;
    console.log(
      'test url >',
      `http://apps.pakubuwono-residence.com/apiwebpbi/api/troffice/hours?entity_cd=` +
        entity_cd +
        `&project_no=` +
        project_no +
        `&category_cd=` +
        category_cd,
    );
    await axios
      .get(
        API_URL_LOKAL +
          `/troffice/hours?entity_cd=` +
          entity_cd +
          `&project_no=` +
          project_no +
          `&category_cd=` +
          category_cd,
      )
      .then(res => {
        // console.log('data get date book', res.data[0]);
        // console.log('datas nih dipake buat entity projek', datas);
        setData(res.data);
        setDatabookDate(res.data);
        // getdata();
        getBooked(datas, res.data);
        setSpinner(false);
      })
      // .catch(error => console.error(error))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  };
  const getBooked = async (datas, databookdates) => {
    const entity_cd = datas.entity_cd;
    console.log('next abis tower', datas);
    const project_no = datas.project_no;
    const category_cd = passProp.category_cd;
    // const databookdates = databookdate;
    // console.log('data obj_data', obj_data);
    console.log('params :', category_cd);
    console.log('data book date atas', databookdates);
    console.log('next abis tower if', entity_cd);

    // const databookdates = databookdate;
    // console.log('data obj_data', obj_data);
    console.log('data book date if', databookdates);

    // alert('undefined');
    const params_api =
      '?' +
      'entity_cd=' +
      entity_cd +
      '&' +
      'project_no=' +
      project_no +
      '&' +
      'category_cd=' +
      category_cd +
      '&' +
      'req_type=' +
      tab.id;

    console.log(
      'url params',
      'http://apps.pakubuwono-residence.com/apiwebpbi/api/troffice/hours_category' +
        params_api +
        '&' +
        'book_date=' +
        databookdates[2].book_date +
        '&id=1',
    );
    let endpoints = [
      API_URL_LOKAL +
        `/troffice/hours_category` +
        params_api +
        '&' +
        'book_date=' +
        databookdates[0].book_date +
        // '2021-12-15' +
        `&id=1`,
      API_URL_LOKAL +
        `/troffice/hours_category` +
        params_api +
        '&' +
        'book_date=' +
        databookdates[1].book_date +
        // '2021-12-15' +
        `&id=2`,
      API_URL_LOKAL +
        `/troffice/hours_category` +
        params_api +
        '&' +
        'book_date=' +
        databookdates[2].book_date +
        // '2021-12-15' +
        `&id=3`,
      API_URL_LOKAL +
        `/troffice/hours_category` +
        params_api +
        '&' +
        'book_date=' +
        databookdates[3].book_date + // '2021-12-15' + // data[3]?.book_date +
        `&id=4`,
    ];
    axios
      .all(endpoints.map(endpoint => axios.get(endpoint)))
      .then(
        axios.spread(
          (
            {data: dataBooked1},
            {data: dataBooked2},
            {data: dataBooked3},
            {data: dataBooked4},
          ) => {
            console.log('res1: ', dataBooked1);
            console.log('res2: ', dataBooked2);
            console.log('res3: ', dataBooked3);
            console.log('res4: ', dataBooked4);

            if (dataBooked1) {
              setDataBooked1(dataBooked1);
            }
            if (dataBooked2) {
              setDataBooked2(dataBooked2);
            }
            if (dataBooked3) {
              setDataBooked3(dataBooked3);
            }
            if (dataBooked4) {
              setDataBooked4(dataBooked4);
            }
          },
        ),
      )
      .catch(error => console.error('ini error if getbooking', error))
      .finally(
        () => setLoading(false),
        setSpinnerHours(false),
        setSpinner(false),
      );
  };

  useEffect(() => {
    setTimeout(() => {
      setSpinnerHours(false);
    }, 5000);
  }, []);

  const setExpandIcon = indexs => {
    console.log('indexs', indexs);
    setIsExpand(!isExpand);
    setIconUp(indexs ? !isIconUp : isIconUp);
  };

  // const setExpandIconReason = indexs => {
  //   console.log('indexs', indexs);
  //   // setIsExpandReason(!isExpandReason);
  //   setIconUp(indexs ? !isIconUp : isIconUp);
  // };

  const onBookingPress = (dtbook, jam_booking, slt) => {
    console.log('dtbook', dtbook);
    console.log('dtbook length', ...dtbook.slot_hours);
    // const obj = {...dtbook.slot_hours};
    const obj = dtbook.slot_hours;

    obj.map(function (value, i) {
      console.log('result dtbook loop', i, value);
      return i, value;
    });

    const result = obj.filter(booked);

    function booked(book) {
      return (book = dtbook.databook !== null || dtbook.databook !== '');
    }

    // const booked = book => {
    //   return (book = dtbook.databook !== null || dtbook.databook !== '');
    // };

    console.log('result filter databook', result);
    console.log('obj databook', obj);
    // console.log('datab databook', datab);
    const item = {
      databook: dtbook,
      items: dtbook.book_date,
      jam_booking: jam_booking,
      slot: slt,
    };

    setDateOnClick(item.items);
    setHourOnClick(item.jam_booking);
    setSlotOnClick(item.slot);
    // setModalVisible(true);
    // navigation.navigate('BookingDetail', item);
  };
  const handleClick = (jam, date) => {
    // setIsActive(current => !current);
    setIsActive(jam);
    setDateIsActive(date);
  };

  useEffect(() => {
    const id = props?.params?.id;
    if (id) {
      TABSDATE.forEach(tab => {
        tab.id == id && setTabDate(tab);
      });
    }
  }, [props?.params?.id]);

  // console.log('passprop kategori help', passProp);

  const styleItem = {
    ...styles.profileItem,
    borderBottomColor: colors.border,
  };
  //-----FOR GET ENTITY & PROJJECT
  const getTower = async () => {
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
            setEntity(dat.entity_cd);
            setProjectNo(dat.project_no);
            getDateBook(dat);
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
    const value = await AsyncStorage.getItem('@troStorage');
    // const DataTower = await AsyncStorage.getItem('@DataTower');

    const passPropStorage = JSON.parse(value);

    setPassPropStorage(passPropStorage);
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      getTower(users);
      getDataStorage();
      //func baru
      getTime();
      // getCategoryHelp;
      // setSpinner(false);
    }, 3000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoadingTab(false);
    }, 8000);
  }, []);

  useEffect(() => {
    axios
      .get(API_URL_LOKAL + '/troffice/time')
      .then(time => {
        console.log('time from server?', time.data);
        setTime(time.data);
      })
      // .catch(error => console.error(error))
      .catch(error => console.error(error.response.data))
      .finally(() => setLoading(false));
  }, []);

  // const addDate = time.setDate(time.getDate() + 1);
  // console.log('addDate >', addDate);

  const datatime = {
    timeget: time.tanggal,
    daily: time.jam,
  };

  useEffect(() => {
    axios
      .get(
        API_URL_LOKAL +
          `/facility/book/hours_id?entity_cd=01&project_no=01&facility_cd=CA&book_date=2021-12-07&id=1`,
      )
      .then(data => {
        console.log('timedate', data.data);
        setTimeDate(data[0]);

        setSpinner(false);
      })
      // .catch(error => console.error(error))
      .catch(error => console.error(error.response.data))
      .finally(() => setLoading(false));
  }, []);

  const getTime = async () => {
    const entity = passProp.entity_cd;
    const project = passProp.project_no;
    try {
      await axios
        .get(
          API_URL_LOKAL +
            `/tro_masterBookingTime?entity_cd=${entity}&project_no=${project}`,
        )
        .then(res => {
          const datas = res.data.data;

          let ans = datas.reduce((agg, curr) => {
            console.log('agg', agg);
            let found = agg.find(x => x.hours === curr.hours);
            if (found) {
              found.subslot.push(curr.subslot);
            } else {
              agg.push({
                hours: curr.hours,
                subslot: [curr.subslot],
              });
            }
            return agg;
          }, []);

          const result = ans.reduce((acc, curr) => {
            if (acc[curr.hours] === undefined) acc[curr.hours] = 0;
            curr.subslot.forEach(x => (acc[curr.hours] += x.length));
            return acc;
          }, {});

          console.log('counters datas >', datas);
          console.log('counters >', result);

          // setBookingTime(ans);
          setBookingTime(ans);
          console.log('ans >', ...ans);
        });
    } catch (error) {
      console.log('Error from getTime', error);
    }
    // console.log('entity?', ...entity) //untuk pecahin array jadi object pake ...
    // console.log('project?', ...project)
  };

  // const handleGetSlot = (data, slot, hours) => {
  //   setDataOnClick(data);
  //   setSlotOnClick(slot);
  //   setHourOnClick(hours);
  // };

  const getMasterHours = getBookingTime.map(data => data.hours);
  const getMaster = getBookingTime.map(data => data);

  console.log('master', getMaster);
  console.log('splice', getMasterHours);

  const getMasterSlot = getBookingTime.map(data => data.subslot);
  const getLoopSlot = [{...getMasterSlot}];
  console.log('splice slot >', getMasterSlot);
  console.log('loop', getLoopSlot);
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

  // const getCategoryHelp = async type => {
  //   const params = {
  //     entity: dataTowerUser.entity_cd,
  //     project: dataTowerUser.project_no,

  //   };
  //   console.log('params category', params);

  //   const config = {
  //     headers: {
  //       accept: 'application/json',
  //       'Content-Type': 'application/json',
  //       token: '',
  //     },
  //   };

  //   await axios
  //     .post(
  //       'http://apps.pakubuwono-residence.com/apiwebpbi/api/csentry-getCategoryHelp',
  //       params,
  //       {
  //         config,
  //       },
  //     )
  //     .then(res => {
  //       const datas = res.data;
  //       const dataCategorys = datas.Data;
  //       console.log('data kategori', dataCategorys);

  //       setDataCategory(dataCategorys);
  //       setSpinner(false);
  //       // return res.data;
  //     })
  //     .catch(error => {
  //       console.log('error get tower api', error.response);
  //       alert('error get');
  //     });
  // };

  // const handleClick = async (data, index) => {
  //   console.log('category_grop_cd', data.category_group_cd);
  //   console.log('loc_type', data.location_type);
  //   console.log('passprops', passProp);
  //   const saveParams = {
  //     //   ...passPropStorage,
  //     passProp,
  //     category_group_cd: data.category_group_cd,
  //     location_type: data.location_type,
  //   };
  //   const saveStorage = {
  //     ...passPropStorage,
  //     //   ...passProp,
  //     category_group_cd: data.category_group_cd,
  //     location_type: data.location_type,
  //   };
  //   console.log('urutan kedua props', saveStorage);
  //   console.log('urutan kedua params', saveParams);

  //   const jsonValue = JSON.stringify(saveStorage);
  //   await AsyncStorage.setItem('@helpdeskStorage', jsonValue);

  //   const jsonValueNullLocation = JSON.stringify('');
  //   await AsyncStorage.setItem('@locationStorage', jsonValueNullLocation);

  //   navigation.navigate('SelectCategory', {
  //     // screen: 'Settings',
  //     saveParams,
  //   });
  // };

  //    const onCategoryPress = cat => {
  //        this.setState({isDisabled: true}, () => {
  //          this.goToScreen('screen.SelectCategory', cat);
  //        });
  //      };
  console.log('slot checked : ', getSlotOnClick);

  // console.log('aajam', moment(dataBooked3.slot_hours[0].jam).format());
  // console.log('aajams', dataBooked3.slot_hours[0].jam.substring(0, 5));
  function submitTicket() {
    console.log('getdata storage,', passPropStorage);
    const passProps = passProp;
    console.log('passprops', passProps);
    const body = passPropStorage;

    // const fileImg = image.uri.replace('file://', '');

    const bodyData = new FormData();
    bodyData.append('entity_cd', passProp.entity_cd);
    bodyData.append('project_no', passProp.project_no);
    bodyData.append('debtor_acct', passProp.dataDebtor.debtor_acct);
    bodyData.append('category_cd', passProp.category_cd);
    bodyData.append('work_requested', passProp.workRequested);
    bodyData.append('hours', getHourOnClick);
    bodyData.append('req_date', getDateOnClick);
    bodyData.append('subslot', getSlotOnClick);
    bodyData.append('reported_by', 'MGR');
    bodyData.append('serv_req_by', passProp.reportName);
    bodyData.append('contact_no', passProp.contactNo);
    bodyData.append('complain_source', 'MOBILE');
    bodyData.append('lot_no', passProp.select_lot_no);
    bodyData.append('req_email', passProp.dataDebtor.email);
    bodyData.append('respond_time', '');
    bodyData.append('req_type', tab.id);
    bodyData.append('zone_cd', passProp.zone_cd);
    bodyData.append('audit_user', 'MGR');
    // bodyData.append('audit_user', passProp.reportName);
    // bodyData.append('reportdate', '04 Nov 2021 08:47');
    bodyData.append(
      'reported_date',
      moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    );
    bodyData.append(
      'audit_date',
      moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    );

    console.log('liatbody', bodyData);
    return fetch(API_URL_LOKAL + '/troffice/savemaintenance_web', {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: bodyData,
    })
      .then(res => {
        console.log('res >', res);
        return res.json().then(resJson => {
          // alert(resJson.Pesan);
          console.log('resKsspn', resJson);
          setMessage(resJson.Pesan);
          setMessageResult(resJson.Result);
          showModalSuccess(true);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  const onCloseModal = () => {
    showModalSuccess(false);
    navigation.navigate('SpecTrofficeWaterHeater');
  };

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'top', 'left']}>
      <Header
        title={t('category_tro')} //belum dibuat lang
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

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 20}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {TABS.map((item, index) => (
            <View key={index} style={{flex: 1, paddingHorizontal: 10}}>
              <Tag
                primary
                style={{
                  borderWidth: 1,
                  backgroundColor:
                    tab.id == item.id ? colors.dark : colors.background,
                  paddingVertical: 10,
                }}
                onPress={() => {
                  enableExperimental();
                  setTab(item);
                }}>
                <Text
                  bold
                  body1={tab.id != item.id}
                  light={tab.id != item.id}
                  style={{colors: colors.primary}}>
                  {item.title}
                </Text>
              </Tag>
            </View>
          ))}
        </View>

        <View style={{marginTop: 30, paddingHorizontal: 10}}>
          <Text subheadline bold>
            Today
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'space-between',
            borderRadius: 15,
            borderColor: colors.dark,
            borderBottomWidth: 1,
            padding: 10,
            marginBottom: 15,
            marginTop: 10,
          }}>
          <Text>{datatime.timeget}</Text>

          {/* <DatePicker
            modal
            mode="date"
            open={open}
            date={date}
            onConfirm={date => {
              setOpen(false);
              getMasterTime(date);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          /> */}
          {/* <Text>{moment(date).format('DD-MM-YYYY')}</Text> */}
          <Icon
            name="calendar-week"
            size={20}
            color={colors.primary}
            enableRTL={true}
            // onPress={() => setOpen(true)}
          />
        </View>

        <View>
          {/* REGULER */}
          {tab.id == 'O' ? (
            <View style={{flexDirection: 'column'}}>
              {loadingTab ? (
                <View style={{marginTop: 10}}>
                  {/* <Spinner visible={this.state.spinner} /> */}
                  {/* <Placeholder style={{marginVertical: 4, paddingHorizontal: 10}}>
                      <PlaceholderLine width={100} noMargin style={{height: 40}} />
                    </Placeholder> */}
                  <ProgressBar
                    progress={1}
                    color={colors.primary}
                    indeterminate={true}
                  />
                </View>
              ) : (
                <View>
                  <View style={{flexDirection: 'row'}}>
                    {TABSDATE.map((item, index) => (
                      <View key={index} style={{flex: 1, paddingHorizontal: 5}}>
                        <Tag
                          outline
                          style={{
                            height: 60,
                            width: 60,
                            marginBottom: 20,

                            flexDirection: 'column',
                            backgroundColor:
                              tabDate.id == item.id
                                ? colors.primary
                                : colors.background,
                          }}
                          onPress={() => {
                            enableExperimental();
                            setTabDate(item);
                          }}>
                          <View
                            style={{
                              flexGrow: 1,
                              flexDirection: 'row',
                            }}>
                            <Text
                              bold
                              body1={tabDate.id != item.id}
                              light={tabDate.id != item.id}
                              whiteColor={tabDate.id == item.id}
                              style={{textAlign: 'center', fontSize: 14}}>
                              {moment(item.title)
                                .locale('en')
                                .format('ddd DD')
                                .replace(' ', '\n')}
                            </Text>
                          </View>
                        </Tag>
                      </View>
                    ))}
                  </View>

                  {spinnerHour ? (
                    <View></View>
                  ) : (
                    <View
                      style={{
                        flex: 1,
                        paddingHorizontal: 5,
                      }}>
                      {/*SLOT B*/}
                      {tabDate.id == 1 && (
                        <Text style={{fontStyle: 'italic'}}>
                          Open Booking : {dataBooked1.open_book} -{' '}
                          {dataBooked1.close_book}
                        </Text>
                      )}

                      {tabDate.id == 1 && dataBooked1.close_status == 'Y'
                        ? dataBooked1?.slot_hours.map &&
                          dataBooked1?.slot_hours.map((items, indexs) => (
                            <View
                              key={indexs}
                              style={StyleSheet.flatten([
                                {
                                  paddingVertical: 15,
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  alignContent: 'space-between',
                                  borderRadius: 15,
                                  borderColor: '#dbdbdb',
                                  borderBottomWidth: 1,
                                },
                                !isExpand && {
                                  borderBottomWidth: 1,

                                  borderBottomColor: colors.border,
                                },
                              ])}>
                              <View style={{flexDirection: 'column'}}>
                                <Text key={items.id} bold>
                                  {items.jam.substring(0, 5)}
                                </Text>
                                <Text
                                  key={items.id}
                                  bold
                                  style={{justifyContent: 'center'}}>
                                  Slot : {items.subslot}
                                </Text>
                              </View>
                              {/* <Text key={items.id} bold>
                        {time.jam > items.jam
                          ? 'lebih dari jam'
                          : 'kurang dari jam'}
                      </Text> */}
                              <View>
                                {items.databook != ''
                                  ? items.databook.map((itemdatabook, keys) => (
                                      <View key={keys}>
                                        <Text
                                          bold
                                          style={{
                                            width: 200,
                                          }}>
                                          {itemdatabook.serv_req_by}
                                        </Text>
                                        <Text bold>{itemdatabook.lot_no}</Text>
                                      </View>
                                    ))
                                  : null}

                                {isExpand && (
                                  <View key={indexs}>
                                    {items.databook !== ''
                                      ? items.databook.map(
                                          (itemdatabook, keys) => (
                                            <View
                                              key={keys}
                                              style={{width: '100%'}}>
                                              <Text>
                                                {/* Created date :{' '}
                                                {moment(
                                                  itemdatabook.audit_date,
                                                ).format(
                                                  'DD MMM YYYY HH:mm:ss',
                                                )} */}
                                                Report No :{' '}
                                                {itemdatabook.report_no}
                                              </Text>
                                              <Text>
                                                Category :{' '}
                                                {itemdatabook.category_cd}
                                              </Text>
                                            </View>
                                          ),
                                        )
                                      : null}
                                  </View>
                                )}
                              </View>
                              {items.status_avail == 'Y' ||
                              items.databook == '' ||
                              dataBooked1.open_book > items.jam ||
                              dataBooked1.close_book < items.jam ? (
                                <TouchableOpacity
                                  key={indexs}
                                  disabled={
                                    items.status_avail != 'Y'
                                      ? // ||
                                        // time.jam > items.jam

                                        true
                                      : (false && items.databook == '') ||
                                        items.databook == null ||
                                        dataBooked1.open_book > items.jam
                                      ? true
                                      : false ||
                                        dataBooked1.close_book < items.jam
                                  }
                                  onPress={() => {
                                    onBookingPress(
                                      dataBooked1,
                                      items.jam,
                                      items.subslot,
                                    );
                                    handleClick(items.jam, tabDate.id);
                                  }}
                                  style={StyleSheet.flatten([
                                    {
                                      height: 50,
                                      backgroundColor:
                                        // items.status_avail == 'Y' &&
                                        //   ? // &&
                                        //     // time.jam < items.jam
                                        //     colors.primary
                                        //   : items.databook[0].status == 'O'
                                        //   ? BaseColor.orangeColor
                                        //   : BaseColor.redColor
                                        isActive == items.jam &&
                                        DateIsActive == tabDate.id
                                          ? 'salmon'
                                          : colors.primary,
                                      padding: 15,
                                      borderRadius: 15,
                                      justifyContent: 'center',
                                    },
                                    isExpand && {
                                      height: 50,
                                      backgroundColor:
                                        items.status_avail == 'Y'
                                          ? // &&
                                            // time.jam < items.jam
                                            colors.primary
                                          : items.databook[0].status == 'O'
                                          ? BaseColor.orangeColor
                                          : BaseColor.redColor,
                                      padding: 15,
                                      borderRadius: 15,
                                      justifyContent: 'center',
                                    },
                                  ])}>
                                  <Text whiteColor subheadline bold>
                                    Select
                                  </Text>
                                </TouchableOpacity>
                              ) : (
                                <TouchableOpacity
                                  style={{marginRight: 5}}
                                  // onPress={() => setExpandIcon(indexs)}
                                  onPress={() => setExpandIcon(indexs)}>
                                  {/* {console.log('boolean apasi ini', indexs)} */}
                                  <View
                                    style={{
                                      width: 25,
                                      height: 25,
                                      borderRadius: 10,
                                      backgroundColor: colors.primary,
                                      alignSelf: 'center',
                                      alignItems: 'center',
                                      alignContent: 'center',
                                      justifyContent: 'center',
                                    }}>
                                    <Icon
                                      name={
                                        'chevron-down'
                                        // isIconUp ? 'chevron-up' : 'chevron-down'
                                      }
                                      color={'#fff'}></Icon>
                                  </View>
                                </TouchableOpacity>
                              )}
                            </View>
                          ))
                        : tabDate.id == 1 &&
                          dataBooked1.close_status == 'N' && (
                            <View
                              style={{
                                flex: 1,
                                marginTop: '50%',
                              }}>
                              <IconFontisto
                                name="holiday-village"
                                size={40}
                                color={colors.primary}
                                style={{
                                  justifyContent: 'center',
                                  alignContent: 'center',
                                  alignItems: 'center',
                                  alignSelf: 'center',
                                }}></IconFontisto>
                              <Text
                                style={{
                                  justifyContent: 'center',
                                  alignContent: 'center',
                                  alignItems: 'center',
                                  alignSelf: 'center',
                                  fontSize: 16,
                                  marginTop: 10,
                                }}>
                                Sorry! The Facility is closed.
                              </Text>
                            </View>
                          )}
                    </View>
                  )}

                  {spinnerHour ? (
                    <View>
                      {/* <Spinner visible={this.state.spinner} /> */}
                      {/* <Placeholder style={{marginVertical: 4, paddingHorizontal: 10}}>
                  <PlaceholderLine width={100} noMargin style={{height: 40}} />
                </Placeholder> */}
                    </View>
                  ) : (
                    <View style={{flex: 1, paddingHorizontal: 5}}>
                      {tabDate.id == 2 && (
                        <Text style={{fontStyle: 'italic'}}>
                          Open Booking : {dataBooked2.open_book} -{' '}
                          {dataBooked2.close_book}
                        </Text>
                      )}
                      {tabDate.id == 2 && dataBooked2.close_status == 'Y'
                        ? dataBooked2.slot_hours.map &&
                          dataBooked2.slot_hours.map((items, indexs) => (
                            <View
                              key={indexs}
                              style={StyleSheet.flatten([
                                {
                                  paddingVertical: 15,
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  alignContent: 'space-between',
                                  borderRadius: 15,
                                  borderColor: '#dbdbdb',
                                  borderBottomWidth: 1,
                                },
                                !isExpand && {
                                  borderBottomWidth: 1,
                                  borderBottomColor: colors.border,
                                },
                              ])}>
                              <View style={{flexDirection: 'column'}}>
                                <Text key={items.id} bold>
                                  {items.jam.substring(0, 5)}
                                </Text>
                                <Text
                                  key={items.id}
                                  bold
                                  style={{justifyContent: 'center'}}>
                                  Slot : {items.subslot}
                                </Text>
                              </View>

                              <View>
                                {items.databook != ''
                                  ? items.databook.map((itemdatabook, keys) => (
                                      <View key={keys}>
                                        <Text
                                          bold
                                          style={{
                                            width: 200,
                                          }}>
                                          {itemdatabook.serv_req_by}
                                        </Text>
                                        <Text bold>{itemdatabook.lot_no}</Text>
                                      </View>
                                    ))
                                  : null}

                                {isExpand && (
                                  <View>
                                    {items.databook != ''
                                      ? items.databook.map(
                                          (itemdatabook, keys) => (
                                            <View
                                              key={keys}
                                              style={{width: '100%'}}>
                                              <Text>
                                                Report No :{' '}
                                                {itemdatabook.report_no}
                                              </Text>
                                              <Text>
                                                Category :{' '}
                                                {itemdatabook.category_cd}
                                              </Text>
                                            </View>
                                          ),
                                        )
                                      : null}
                                  </View>
                                )}
                              </View>

                              {items.status_avail == 'Y' ||
                              items.databook == '' ||
                              dataBooked2.open_book > items.jam ||
                              dataBooked2.close_book < items.jam ? (
                                <TouchableOpacity
                                  disabled={
                                    items.status_avail != 'Y'
                                      ? true
                                      : false ||
                                        dataBooked2.open_book > items.jam
                                      ? true
                                      : false ||
                                        dataBooked2.close_book < items.jam
                                      ? true
                                      : false
                                  }
                                  onPress={() => {
                                    onBookingPress(
                                      dataBooked2,
                                      items.jam,
                                      items.subslot,
                                    );
                                    handleClick(items.jam, tabDate.id);
                                  }}
                                  style={{
                                    backgroundColor:
                                      isActive == items.jam &&
                                      DateIsActive == tabDate.id
                                        ? 'salmon'
                                        : colors.primary,
                                    // items.status_avail == 'Y'
                                    //   ? colors.primary
                                    //   : items.databook[0].status == 'O'
                                    //   ? BaseColor.orangeColor
                                    //   : BaseColor.redColor,
                                    padding: 15,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                  }}>
                                  <Text whiteColor subheadline bold>
                                    Select
                                  </Text>
                                </TouchableOpacity>
                              ) : (
                                <TouchableOpacity
                                  style={{marginRight: 5}}
                                  onPress={() => setExpandIcon(indexs)}
                                  // onPress={() => setExpandIcon(indexs)}
                                >
                                  {/* {console.log('boolean apasi ini', indexs)} */}
                                  <View
                                    style={{
                                      width: 25,
                                      height: 25,
                                      borderRadius: 10,
                                      backgroundColor: colors.primary,
                                      alignSelf: 'center',
                                      alignItems: 'center',
                                      alignContent: 'center',
                                      justifyContent: 'center',
                                    }}>
                                    <Icon
                                      name={
                                        'chevron-down'
                                        // isIconUp ? 'chevron-up' : 'chevron-down'
                                      }
                                      color={'#fff'}></Icon>
                                  </View>
                                </TouchableOpacity>
                              )}
                            </View>
                          ))
                        : tabDate.id == 2 &&
                          dataBooked2.close_status == 'N' && (
                            <View
                              style={{
                                flex: 1,
                                marginTop: '50%',
                              }}>
                              <IconFontisto
                                name="holiday-village"
                                size={40}
                                color={colors.primary}
                                style={{
                                  justifyContent: 'center',
                                  alignContent: 'center',
                                  alignItems: 'center',
                                  alignSelf: 'center',
                                }}></IconFontisto>
                              <Text
                                style={{
                                  justifyContent: 'center',
                                  alignContent: 'center',
                                  alignItems: 'center',
                                  alignSelf: 'center',
                                  fontSize: 16,
                                  marginTop: 10,
                                }}>
                                Sorry! The Facility is closed.
                              </Text>
                            </View>
                          )}
                    </View>
                  )}

                  {spinnerHour ? (
                    <View>
                      {/* <Spinner visible={this.state.spinner} /> */}
                      {/* <Placeholder style={{marginVertical: 4, paddingHorizontal: 10}}>
                  <PlaceholderLine width={100} noMargin style={{height: 40}} />
                </Placeholder> */}
                    </View>
                  ) : (
                    <View style={{flex: 1, paddingHorizontal: 5}}>
                      {tabDate.id == 3 && (
                        <Text style={{fontStyle: 'italic'}}>
                          Open Booking : {dataBooked3.open_book} -{' '}
                          {dataBooked3.close_book}
                        </Text>
                      )}
                      {tabDate.id == 3 && dataBooked3.close_status == 'Y'
                        ? dataBooked3.slot_hours.map &&
                          dataBooked3.slot_hours.map((items, indexs) => (
                            <View
                              key={indexs}
                              style={StyleSheet.flatten([
                                {
                                  paddingVertical: 15,
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  alignContent: 'space-between',
                                  borderRadius: 15,
                                  borderColor: '#dbdbdb',
                                  borderBottomWidth: 1,
                                },
                                !isExpand && {
                                  borderBottomWidth: 1,
                                  borderBottomColor: colors.border,
                                },
                              ])}>
                              <View style={{flexDirection: 'column'}}>
                                <Text key={items.id} bold>
                                  {items.jam.substring(0, 5)}
                                </Text>
                                <Text
                                  key={items.id}
                                  bold
                                  style={{justifyContent: 'center'}}>
                                  Slot : {items.subslot}
                                </Text>
                              </View>

                              <View>
                                {items.databook != ''
                                  ? items.databook.map((itemdatabook, keys) => {
                                      return (
                                        <View key={keys}>
                                          <Text
                                            bold
                                            style={{
                                              width: 200,
                                            }}>
                                            Name : {itemdatabook.serv_req_by}
                                          </Text>
                                          <Text>
                                            Unit : {itemdatabook.lot_no}
                                          </Text>
                                        </View>
                                      );
                                    })
                                  : null}

                                {/* {items.status_avail == 'N' &&
                                items.reason != '' ? (
                                  <View>
                                    <Text
                                      bold
                                      style={{
                                        width: 200,
                                      }}>
                                      {items.reason}
                                    </Text>
                                  </View>
                                ) : null} */}

                                {/* {isExpandReason &&
                                  (items.reason != '' ? (
                                    <Text key={items.id}> {items.reason}</Text>
                                  ) : null)} */}

                                {isExpand && (
                                  <View>
                                    {items.databook != ''
                                      ? items.databook.map(
                                          (itemdatabook, keys) => (
                                            <View
                                              key={keys}
                                              style={{width: '100%'}}>
                                              <Text>
                                                Report No :{' '}
                                                {itemdatabook.report_no}
                                              </Text>
                                              <Text>
                                                Category :{' '}
                                                {itemdatabook.category_cd}
                                              </Text>
                                            </View>
                                          ),
                                        )
                                      : null}
                                  </View>
                                )}
                              </View>

                              {items.status_avail == 'Y' ||
                              items.databook == '' ||
                              dataBooked3.open_book > items.jam ||
                              dataBooked3.close_book < items.jam ? (
                                <TouchableOpacity
                                  disabled={
                                    items.status_avail != 'Y'
                                      ? true
                                      : false ||
                                        dataBooked3.open_book > items.jam
                                      ? true
                                      : false ||
                                        dataBooked3.close_book < items.jam
                                      ? true
                                      : false
                                  }
                                  onPress={() => {
                                    onBookingPress(
                                      dataBooked3,
                                      items.jam,
                                      items.subslot,
                                    );
                                    handleClick(items.jam, tabDate.id);
                                  }}
                                  style={{
                                    backgroundColor:
                                      isActive == items.jam &&
                                      DateIsActive == tabDate.id
                                        ? 'salmon'
                                        : colors.primary,
                                    // items.status_avail == 'Y'
                                    //   ? colors.primary
                                    //   : items.databook[0].status == 'O'
                                    //   ? BaseColor.orangeColor
                                    //   : BaseColor.redColor,
                                    padding: 15,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                  }}>
                                  <Text whiteColor subheadline bold>
                                    Select
                                  </Text>
                                </TouchableOpacity>
                              ) : (
                                <TouchableOpacity
                                  style={{marginRight: 5}}
                                  onPress={() => setExpandIcon(indexs)}
                                  // onPress={() => setExpandIcon(indexs)}
                                >
                                  {/* {console.log('boolean apasi ini', indexs)} */}
                                  <View
                                    style={{
                                      width: 25,
                                      height: 25,
                                      borderRadius: 10,
                                      backgroundColor: colors.primary,
                                      alignSelf: 'center',
                                      alignItems: 'center',
                                      alignContent: 'center',
                                      justifyContent: 'center',
                                    }}>
                                    <Icon
                                      name={
                                        'chevron-down'
                                        // isIconUp ? 'chevron-up' : 'chevron-down'
                                      }
                                      color={'#fff'}></Icon>
                                  </View>
                                </TouchableOpacity>
                              )}
                            </View>
                          ))
                        : tabDate.id == 3 &&
                          dataBooked3.close_status == 'N' && (
                            <View
                              style={{
                                flex: 1,
                                marginTop: '50%',
                              }}>
                              <IconFontisto
                                name="holiday-village"
                                size={40}
                                color={colors.primary}
                                style={{
                                  justifyContent: 'center',
                                  alignContent: 'center',
                                  alignItems: 'center',
                                  alignSelf: 'center',
                                }}></IconFontisto>
                              <Text
                                style={{
                                  justifyContent: 'center',
                                  alignContent: 'center',
                                  alignItems: 'center',
                                  alignSelf: 'center',
                                  fontSize: 16,
                                  marginTop: 10,
                                }}>
                                Sorry! The Facility is closed.
                              </Text>
                            </View>
                          )}
                    </View>
                  )}

                  {spinnerHour ? (
                    <View>
                      {/* <Spinner visible={this.state.spinner} /> */}
                      {/* <Placeholder style={{marginVertical: 4, paddingHorizontal: 10}}>
                  <PlaceholderLine width={100} noMargin style={{height: 40}} />
                </Placeholder> */}
                    </View>
                  ) : (
                    <View style={{flex: 1, paddingHorizontal: 5}}>
                      {tabDate.id == 4 && (
                        <Text style={{fontStyle: 'italic'}}>
                          Open Booking : {dataBooked4.open_book} -{' '}
                          {dataBooked4.close_book}
                        </Text>
                      )}
                      {tabDate.id == 4 && dataBooked4.close_status == 'Y'
                        ? dataBooked4.slot_hours.map &&
                          dataBooked4.slot_hours.map((items, indexs) => (
                            <View
                              key={indexs}
                              style={StyleSheet.flatten([
                                {
                                  paddingVertical: 15,
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  alignContent: 'space-between',
                                  borderRadius: 15,
                                  borderColor: '#dbdbdb',
                                  borderBottomWidth: 1,
                                },
                                !isExpand && {
                                  borderBottomWidth: 1,

                                  borderBottomColor: colors.border,
                                },
                              ])}>
                              <View style={{flexDirection: 'column'}}>
                                <Text key={items.id} bold>
                                  {items.jam.substring(0, 5)}
                                </Text>
                                <Text
                                  key={items.id}
                                  bold
                                  style={{justifyContent: 'center'}}>
                                  Slot : {items.subslot}
                                </Text>
                              </View>

                              <View>
                                {items.databook != ''
                                  ? items.databook.map((itemdatabook, keys) => (
                                      <View key={keys}>
                                        <Text
                                          bold
                                          style={{
                                            width: 200,
                                          }}>
                                          {itemdatabook.serv_req_by}
                                        </Text>
                                        <Text bold>{itemdatabook.lot_no}</Text>
                                      </View>
                                    ))
                                  : null}

                                {isExpand && (
                                  <View>
                                    {items.databook != ''
                                      ? items.databook.map(
                                          (itemdatabook, keys) => (
                                            <View
                                              key={keys}
                                              style={{width: '100%'}}>
                                              <Text>
                                                Report No :{' '}
                                                {itemdatabook.report_no}
                                              </Text>
                                              <Text>
                                                Category :{' '}
                                                {itemdatabook.category_cd}
                                              </Text>
                                            </View>
                                          ),
                                        )
                                      : null}
                                  </View>
                                )}
                              </View>

                              {items.status_avail == 'Y' ||
                              dataBooked4.open_book > items.jam ||
                              dataBooked4.close_book < items.jam ? (
                                <TouchableOpacity
                                  disabled={
                                    items.status_avail != 'Y'
                                      ? true
                                      : false ||
                                        dataBooked4.open_book > items.jam
                                      ? true
                                      : false ||
                                        dataBooked4.close_book < items.jam
                                      ? true
                                      : false
                                  }
                                  onPress={() => {
                                    onBookingPress(
                                      dataBooked4,
                                      items.jam,
                                      items.subslot,
                                    );
                                    handleClick(items.jam, tabDate.id);
                                  }}
                                  style={{
                                    backgroundColor:
                                      isActive == items.jam &&
                                      DateIsActive == tabDate.id
                                        ? 'salmon'
                                        : colors.primary,
                                    // items.status_avail == 'Y'
                                    //   ? colors.primary
                                    //   : items.databook[0].status == 'O'
                                    //   ? BaseColor.orangeColor
                                    //   : BaseColor.redColor,
                                    padding: 15,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                  }}>
                                  <Text whiteColor subheadline bold>
                                    Select
                                  </Text>
                                </TouchableOpacity>
                              ) : (
                                <TouchableOpacity
                                  style={{marginRight: 5}}
                                  onPress={() => setExpandIcon(indexs)}
                                  // onPress={() => setExpandIcon(indexs)}
                                >
                                  {/* {console.log('boolean apasi ini', indexs)} */}
                                  <View
                                    style={{
                                      width: 25,
                                      height: 25,
                                      borderRadius: 10,
                                      backgroundColor: colors.primary,
                                      alignSelf: 'center',
                                      alignItems: 'center',
                                      alignContent: 'center',
                                      justifyContent: 'center',
                                    }}>
                                    <Icon
                                      name={
                                        'chevron-down'
                                        // isIconUp ? 'chevron-up' : 'chevron-down'
                                      }
                                      color={'#fff'}></Icon>
                                  </View>
                                </TouchableOpacity>
                              )}
                            </View>
                          ))
                        : tabDate.id == 4 &&
                          dataBooked4.close_status == 'N' && (
                            <View
                              style={{
                                flex: 1,
                                marginTop: '50%',
                              }}>
                              <IconFontisto
                                name="holiday-village"
                                size={40}
                                color={colors.primary}
                                style={{
                                  justifyContent: 'center',
                                  alignContent: 'center',
                                  alignItems: 'center',
                                  alignSelf: 'center',
                                }}></IconFontisto>
                              <Text
                                style={{
                                  justifyContent: 'center',
                                  alignContent: 'center',
                                  alignItems: 'center',
                                  alignSelf: 'center',
                                  fontSize: 16,
                                  marginTop: 10,
                                }}>
                                Sorry! The Facility is closed.
                              </Text>
                            </View>
                          )}
                    </View>
                  )}
                </View>
              )}
            </View>
          ) : null}
        </View>
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: '17%',
          borderWidth: 1,
          borderStyle: 'solid',
          borderTopEndRadius: 15,
          borderTopLeftRadius: 15,
          justifyContent: 'center',
          // flex: 1,
        }}>
        <View
          style={{
            alignItems: 'center',
            borderRightWidth: 2,
            borderRightColor: colors.primary,
          }}>
          <View
            style={{
              marginBottom: 15,
              marginLeft: '15%',
              marginRight: '15%',
              marginTop: 8,
            }}>
            <Text bold>Selected Slot</Text>
          </View>
          {/* {getSlotOnClick.map((data, index) => (
                  <Text>{data}</Text>
                ))}  */}
          <Text>
            Date : {moment(getDateOnClick).locale('en').format('DD ddd')}
          </Text>
          <Text>
            Hours : {getHourOnClick} - Slot : {getSlotOnClick}
          </Text>
          {/* <Text>
            Hours : {getHourOnClick} - Slot : {getSlotOnClick}
          </Text>
          <Text>
            Hours : {getHourOnClick} - Slot : {getSlotOnClick}
          </Text>
          <Text>
            Hours : {getHourOnClick} - Slot : {getSlotOnClick}
          </Text> */}

          {/* <Text>Slot : {getSlotOnClick}</Text>
          <Text>Hours : {getHourOnClick}</Text>
          <Text>Date : {getDateOnClick}</Text> */}
        </View>
        {/* <Button
                  medium
                  outline
                  style={{
                    marginTop: 10,
                    marginBottom: 20,
                    marginHorizontal: 5,
                    backgroundColor: '#fff',
                    flex: 1,
                  }}
                  onPress={() => {
                    // goBackFacility();
                  }}>
                  <Text style={{color: colors.primary}}>
                    {' '}
                    {t('Back To Schedule')}
                  </Text>
                </Button> */}
        {getHourOnClick == null || getHourOnClick == '' ? (
          <Button
            disabled
            medium
            style={{
              marginTop: 35,
              marginHorizontal: 'auto',
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 20,
              flex: 1,
            }}
            onPress={() => {
              submitTicket();
              navigation.navigate('SpecTrofficeWaterHeater');
            }}>
            <Text style={{textAlign: 'center', color: 'black', fontSize: 14}}>
              {t('Booking')}
            </Text>
          </Button>
        ) : (
          <Button
            medium
            style={{
              marginTop: 35,
              marginHorizontal: 'auto',
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 20,
              flex: 1,
            }}
            onPress={() => {
              submitTicket();
            }}>
            <Text style={{textAlign: 'center', color: 'white', fontSize: 14}}>
              {t('Booking')}
            </Text>
          </Button>
        )}
      </View>

      <View>
        <Modal
          isVisible={modalSuccessVisible}
          style={{height: '100%'}}
          onBackdropPress={() => showModalSuccess(false)}>
          <View
            style={{
              // flex: 1,

              // alignContent: 'center',
              padding: 10,
              backgroundColor: '#fff',
              // height: ,
              borderRadius: 8,
            }}>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: colors.primary,
                  marginBottom: 10,
                }}>
                {message}
              </Text>
              <IconAnt
                name="checkcircleo"
                size={80}
                color={colors.primary}></IconAnt>
              <Text> </Text>
              <Text>Result</Text>
              <Text>Schedule Success Booked on Ticket</Text>
              <Text bold>{messageResult}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <Button
                style={{
                  marginTop: 10,
                  // marginBottom: 10,

                  width: 70,
                  height: 40,
                }}
                onPress={() => {
                  onCloseModal();
                }}>
                <Text style={{fontSize: 13}}>{t('OK')}</Text>
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}
