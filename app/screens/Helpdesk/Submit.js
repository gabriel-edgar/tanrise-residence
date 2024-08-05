import {
  Text,
  PlaceholderLine,
  Placeholder,
  Button,
  SafeAreaView,
  RefreshControl,
  Header,
  Icon,
  ModalFilterLocation,
} from '@components';
import {BaseColor, BaseStyle, useTheme} from '@config';
import {CheckBox} from 'react-native-elements';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  TouchableOpacity,
  View,
  Platform,
  TouchableHighlight,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import getUser from '../../selectors/UserSelectors';
import axios from 'axios';
import {API_URL} from '@env';
import styles from './styles';
import {RadioButton} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import ImagePicker from 'react-native-image-crop-picker';
// import RNFetchBlob from 'rn-fetch-blob';
import mime from 'mime';
import Modal from 'react-native-modal';
import {API_URL_LOKAL} from '@env';
export default function SubmitHelpdesk({route, props}) {
  const {t, i18n} = useTranslation();
  const {colors} = useTheme();
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const navigation = useNavigation();

  const [dataTowerUser, setdataTowerUser] = useState([]);
  const [arrDataTowerUser, setArrDataTowerUser] = useState([]);
  const users = useSelector(state => getUser(state));
  const [email, setEmail] = useState(users.user);
  const [userName, setUserName] = useState(users.name);
  const [urlApi, seturlApi] = useState(API_URL);

  const [spinner, setSpinner] = useState(true);

  const [dataCategory, setDataCategory] = useState([]);

  const [typeLocation, setTypeLocation] = useState('');
  const [passPropStorage, setPassPropStorage] = useState();
  const [passProp, setPassProp] = useState(route.params.saveStorage);
  console.log('urutan ke empat props', passProp);
  const [titles, setTitles] = useState('');
  const [textLocation, setTextLocation] = useState('');
  const [textLocationCode, setTextLocationCode] = useState('');
  const [textContact, setTextContact] = useState('');
  const [textDescs, setTextDescs] = useState('');
  // const [images, setImage] = useState('');
  const [images, setImage] = useState([]);
  const [groupCd, setGroupCd] = useState('');
  const [reportDate, setReportDate] = useState('');
  const [_isMount, set_isMount] = useState(false);
  const [dataLocation, setLocation] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [singleFile, setSingleFile] = useState(null);

  const [modalSuccessVisible, showModalSuccess] = useState(false);
  const [modalErrorVisible, showModalError] = useState(false);
  const [message, setMessage] = useState('');
  const [errorz, setError] = useState('');

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
          }
        });
        setArrDataTowerUser(arrDataTower);
        setSpinner(false);

        // return res.data;
      })
      .catch(error => {
        console.log('error get tower api', error);
        // alert('error get');
      });
  };

  const getDataStorage = async () => {
    // --- get data storage all helpdesk dari depan form
    const value = await AsyncStorage.getItem('@helpdeskStorage');
    const passPropStorage = JSON.parse(value);
    console.log('getdata storage,', passPropStorage);
    setPassPropStorage(passPropStorage);

    //   -- get data storage location
    const loc = await AsyncStorage.getItem('@locationStorage');
    const passLocStorage = JSON.parse(loc);
    console.log('getdata passLocStorage,', passLocStorage);

    setTextLocation(passLocStorage.descs);
    setTextLocationCode(passLocStorage.location_cd);
  };

  useEffect(() => {
    navigation.addListener('focus', () => {
      // if (!route.params.passLocation) {
      //   setTextLocation('');
      //   setTextLocationCode('');
      // } else {
      // console.log('text location', route);
      //   setTextLocation(route.params.passLocation.descs);
      //   setTextLocationCode(route.params.passLocation.location_cd);
      // }

      getDataStorage();
    });
  }, []);

  const onSelect = data => {
    console.log('data from onselect modal', data);
  };

  useEffect(() => {
    setTimeout(() => {
      setTextLocation('');
      setLoading(false);
      getTower(users);
      getDataStorage();
      //   getLocation();
      // setSpinner(false);
    }, 3000);
  }, []);

  useEffect(() => {
    // getDataStorage();
    setTimeout(() => {
      const passProps = passProp;
      console.log('props dari select category ke submit', passProps);
      let titles = '';
      if (passProps.complain_type == 'C') {
        titles = 'Complain';
      } else if (passProps.complain_type == 'R') {
        titles = 'Request';
      } else {
        titles = 'Application';
      }
      const group_cd = users.Group;
      const reportdate = moment(new Date()).format('DD MMMM YYYY h:mm');
      console.log('group_cd', group_cd);

      console.log('porprs', submitTicket);

      setTitles(titles);
      setGroupCd(group_cd);
      setReportDate(reportdate);
    }, 3000);
  }, []);

  useEffect(() => {
    set_isMount(true);

    // returned function will be called on component unmount
    return () => {
      set_isMount(false);
    };
  }, []);

  //   useFocusEffect(
  //     useEffect(() => {
  //       console.log('rutes', props);
  //       return;
  //     }, [props]),
  //   );

  const handlePhotoPick = () => {
    console.log('datImage', images);
    Alert.alert(
      'Select a Photo',
      'Choose the place where you want to get a photo',
      [
        {text: 'Gallery', onPress: () => fromGallery()},
        {text: 'Camera', onPress: () => fromCamera()},
        {
          text: 'Cancel',
          onPress: () => console.log('User Cancel'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  const fromCamera = () => {
    ImagePicker.openCamera({
      width: 500,
      height: 500,
      cropping: false,
    })
      .then(images => {
        console.log('received image', images);

        setImage([
          {
            uri: images.path,
            width: images.width,
            height: images.height,
            mime: images.mime,
          },
        ]);
        // setImage(prevState => ({
        //   image: [
        //     ...prevState.image,
        //     {
        //       uri: image.path,
        //       width: image.width,
        //       height: image.height,
        //       mime: image.mime,
        //     },
        //   ],
        // }));
      })
      .catch(e => console.log('tag', e));
  };

  const fromGallery = (cropping, mediaType = 'photo') => {
    let imageList = [];

    ImagePicker.openPicker({
      width: 500,
      height: 500,

      multiple: true,
    })
      .then(image => {
        console.log('received images', image);
        image.map(image => {
          imageList.push({
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          });
        });
        console.log('received images', image);
        console.log('received images >', imageList);
        setImage(imageList);
        // for (var i = 0; i < image.length; i++) {
        //   setImage({
        //     images: [
        //       {
        //         uri: image[i].path,
        //         width: image[i].width,
        //         height: image[i].height,
        //         mime: image[i].mime,
        //       },
        //     ],
        //   });
        // }
      })
      .catch(e => console.log('tag', e));
  };

  const modalBankMaster = () => {
    navigation.navigate('ModalLocation');
  };

  function submitTicket() {
    if (images == 0 || images == '' || images == null) {
      alert('Please Select Photo');
    } else {
      console.log('getdata storage,', passPropStorage);
      const passProps = passProp;
      console.log('passprops', passProps);
      const body = passPropStorage;

      // const fileImg = image.uri.replace('file://', '');
      setLoading(true);
      setDisable(true);
      const fileUpload = singleFile;
      const bodyData = new FormData();
      bodyData.append('email', passProp.dataDebtor.email);
      bodyData.append('entity_cd', passProp.entity_cd);
      bodyData.append('project_no', passProp.project_no);
      // bodyData.append('reportdate', '04 Nov 2021 08:47');
      bodyData.append(
        'reportdate',
        moment(new Date()).format('DD/MM/YYYY h:mm'),
      );
      bodyData.append('takenby', 'MOBILE');
      bodyData.append('lotno', passProp.lot_no.lot_no);
      bodyData.append('debtoracct', passProp.dataDebtor.debtor_acct);
      bodyData.append('category', passProp.data.category_cd);
      bodyData.append('floor', passProp.floor);
      bodyData.append(
        'location_unit',
        textLocationCode == undefined ? 'null' : textLocationCode,
      );
      bodyData.append('reqtype', passProp.location_type);
      bodyData.append('workreq', textDescs);
      bodyData.append('reqby', passProp.reportName);
      bodyData.append('contactno', passProp.contactNo);
      bodyData.append('audit_user', passProp.data.audit_user);
      bodyData.append(
        'responddate',
        moment(new Date()).format('DD/MM/YYYY h:mm'),
      );
      // bodyData.append('userfile', {
      //   uri: images[0].uri,
      //   name: 'images.jpg',
      //   type: 'images/jpeg',
      // });
      console.log('liatbody', bodyData);
      console.log(
        'liatbody userfile',
        bodyData.append('userfile', {
          uri: images[0].uri,
          name: 'images.jpg',
          type: 'images/jpeg',
        }),
      );
      return fetch(API_URL_LOKAL + '/csentry-saveTicketWithImage', {
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: bodyData,
      })
        .then(res => {
          console.log('res', res);
          return res.json().then(resJson => {
            // alert(resJson.Pesan);
            console.log('resKsspn', resJson);
            setMessage(resJson.Pesan);
            showModalSuccess(true);
            setLoading(false);
            // setDisable(false);
          });
        })
        .catch(err => {
          showModalError(true);
          setError(err);
          console.log('errz', err);
        });
    }
  }

  const removePhoto = async key => {
    console.log('key remove', key);
    let imageArray = [...images];
    imageArray.splice(key, 1);
    setImage(imageArray);
    //    let imageArray = [...this.state.image];
    //    imageArray.splice(key, 1);
    //    this.setState({image: imageArray});
  };

  const onApply = () => {
    let itemSelected = null;
    for (const item of sortOption) {
      if (item.checked) {
        itemSelected = item;
      }
    }
    if (itemSelected) {
      setModalVisible(false);
      //   setSortOption(sortOptionInit);
    }
  };

  const onSelectFilter = selected => {
    console.log('selected filter', selected);
    // setSortOption(
    //   sortOption.map(item => {
    //     return {
    //       ...item,
    //       checked: item.value == selected.value,
    //     };
    //   }),
    // );
  };

  const onCloseModal = () => {
    showModalSuccess(false);
    navigation.navigate('Helpdesk');
  };

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
      {/* <Button onPress={() => modalBankMaster()}>
        <Text>choose location</Text>
      </Button> */}
      <TouchableOpacity onPress={() => modalBankMaster()}>
        <TextInput
          onChangeText={val => setTextLocation(val)}
          placeholder="Choose Location"
          placeholderTextColor="#171717"
          editable={false}
          value={textLocation}
          style={{
            color: '#171717',
            fontSize: 14,
            borderColor: '#000',
            borderWidth: 0.5,
            borderRadius: 10,
            marginHorizontal: 20,
          }}></TextInput>
      </TouchableOpacity>

      <View style={{marginHorizontal: 20, marginTop: 20}}>
        <Text
          style={{
            color: '#171717',
            fontSize: 14,
            marginBottom: 0,
            paddingBottom: 0,
            marginTop: 0,
            paddingTop: 0,
          }}>
          Special Notes (Schedule Visit Arrangement)
        </Text>
        <TextInput
          multiline
          numberOfLines={4}
          blurOnSubmit
          placeholder="Special Notes"
          placeholderTextColor="#171717"
          style={styles.textArea}
          onChangeText={text => setTextDescs(text)}
        />
      </View>
      <View style={styles.pickerWrap}>
        <Text>Attachment</Text>
        {images.length === 0 ? (
          <TouchableOpacity
            onPress={() => handlePhotoPick()}
            style={[styles.sel, {marginBottom: 20, alignSelf: 'center'}]}>
            <Text>Select a photo</Text>
          </TouchableOpacity>
        ) : (
          <View>
            {images.map((data, key) => (
              <TouchableOpacity
                key={key}
                style={styles.avatarContainer}
                onPress={() => console.log('Photo Tapped')}>
                <View>
                  <Image style={styles.avatar} source={images[key]} />

                  <Icon
                    onPress={() => removePhoto(key)}
                    name="times"
                    size={18}
                    // color="#5A110D"
                    color={colors.primary}
                    style={[styles.iconRemove, {marginLeft: 5}]}
                    enableRTL={true}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      <Button
        loading={loading}
        disable={disable}
        onPress={() => submitTicket()}>
        <Text style={{color: '#FFF'}}>Submit</Text>
      </Button>

      <View>
        <Modal
          isVisible={modalSuccessVisible}
          style={{height: '100%'}}
          // onBackdropPress={() => showModalSuccess(false)}>
          onBackdropPress={() => showModalSuccess(true)}>
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
                {'Thank You!'}
              </Text>
              <Text>{message}</Text>
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
                onPress={() => onCloseModal()}>
                <Text style={{fontSize: 13, color: '#FFF'}}>{t('OK')}</Text>
              </Button>
            </View>
          </View>
        </Modal>
      </View>
      <View>
        <Modal
          isVisible={modalErrorVisible}
          style={{height: '100%'}}
          // onBackdropPress={() => showModalSuccess(false)}>
          onBackdropPress={() => showModalError(true)}>
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
                  color: 'salmon',
                  marginBottom: 10,
                }}>
                {'Error!'}
              </Text>
              <Text>{errorz}</Text>
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
                  // colors: 'salmon',
                  backgroundColor: 'salmon',
                  width: 70,
                  height: 40,
                }}
                onPress={() => onCloseModal()}>
                <Text style={{fontSize: 13, color: '#FFF'}}>{t('OK')}</Text>
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}
