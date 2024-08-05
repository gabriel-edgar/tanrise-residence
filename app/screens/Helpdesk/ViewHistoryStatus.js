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
  CategoryIconSoft,
} from '@components';
import {BaseColor, BaseStyle, useTheme} from '@config';
import {CheckBox, Badge} from 'react-native-elements';
import {Image} from 'react-native';
import StarRating from 'react-native-star-rating';
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
  Dimensions,
} from 'react-native';

import {useSelector} from 'react-redux';
import getUser from '../../selectors/UserSelectors';
import axios from 'axios';
import client from '../../controllers/HttpClient';
import styles from './styles';

import {RadioButton} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import moment from 'moment';

import Modal from 'react-native-modal';

import {API_URL_LOKAL} from '@env';

export default function ViewHistoryStatus({route}) {
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
  const [entity, setEntity] = useState('');
  const [project_no, setProjectNo] = useState('');
  const [db_profile, setDb_Profile] = useState('');
  const [checkedEntity, setCheckedEntity] = useState(false);
  const [spinner, setSpinner] = useState(true);
  const [dataStatus, setDataStatus] = useState([]);
  const [show, setShow] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [dataHistoryStatus, setDataHistoryStatus] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [starCount, setStarCount] = useState(0);
  const [audit_user, setAudit_User] = useState('');
  const [selectedReportNo, setSelectedReportNo] = useState('');
  const deviceWidth = Dimensions.get('window').width;
  //   console.log('passprop kategori help', passProp);
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

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      getTower(users);

      // getCategoryHelp;
      // setSpinner(false);
      console.log('routeparams', route.params);
      setDataHistoryStatus(route.params);
    }, 3000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (dataHistoryStatus != null) {
        setSpinner(false);
      }
    }, 5000);
  }, []);

  //for modal and rating
  const _setModalVisible = (visible, report_no) => {
    let rNo = !visible ? '' : report_no;
    setModalVisible(visible);

    setSelectedReportNo(rNo);
  };

  const onStarRatingPress = rating => {
    setStarCount(rating);
  };

  const handleNavigation = data => {
    console.log('data for history detail', data);
    navigation.navigate('ViewHistoryDetail', data);
  };
  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'top', 'left']}>
      <Header
        title={t('status')} //belum dibuat lang
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
          View History Ticket
        </Text>
        {/* {dataHistoryStatus ? (
          dataHistoryStatus.map((data, key) => <Text>{data.descs}</Text>)
        ) : (
          <Text>no data</Text>
        )} */}
        {spinner ? (
          <View>
            {/* <Spinner visible={this.state.spinner} /> */}
            <Placeholder style={{marginVertical: 4, paddingHorizontal: 10}}>
              <PlaceholderLine width={100} noMargin style={{height: 40}} />
            </Placeholder>
            <Placeholder style={{marginVertical: 4, paddingHorizontal: 10}}>
              <PlaceholderLine width={100} noMargin style={{height: 20}} />
            </Placeholder>
          </View>
        ) : (
          <ScrollView style={{marginTop: 20}}>
            {dataHistoryStatus != undefined ? (
              dataHistoryStatus.map((data, key) => (
                <View key={key}>
                  <TouchableOpacity onPress={() => handleNavigation(data)}>
                    <View
                      style={{
                        height: null,
                        backgroundColor: 'white',
                        //   shadowOffset: {width: 1, height: 1},
                        //   shadowColor: colors.bg_hijautua,
                        //   shadowOpacity: 1,
                        //   elevation: 5,
                        paddingHorizontal: 10,
                        paddingVertical: 10,

                        // -- create shadow
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,
                        elevation: 3,
                        // -- end create shadows
                        //   borderWidth: 1,
                      }}>
                      <View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text
                            style={{
                              fontSize: 13,
                              fontWeight: 'bold',
                              textAlign: 'left',
                            }}>
                            # {data.report_no} - {data.debtor_acct}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: '500',
                              textAlign: 'right',
                              color: '#9B9B9B',
                            }}>
                            Date :{' '}
                            {moment(data.reported_date).format('DD-MM-YYYY')}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text
                            style={{
                              fontSize: 13,
                              fontWeight: '300',
                              textAlign: 'left',
                            }}>
                            {/* nama dari await name {data.name} */}
                            {users.name}
                            {/* nama dari aawait name */}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text
                            style={{
                              fontSize: 13,
                              fontWeight: '300',
                              // marginBottom: 10,
                              color: BaseColor.hijau_pkbw,
                            }}>
                            {data.lot_no}
                          </Text>
                          <Text
                            style={{
                              fontSize: 13,
                              fontWeight: '300',
                              // marginBottom: 10,
                              color: BaseColor.hijau_pkbw,
                            }}>
                            {data.status == 'R'
                              ? 'Open'
                              : data.status == 'A'
                              ? 'Assign'
                              : data.status == 'S'
                              ? 'Need Confirmation'
                              : data.status == 'P'
                              ? 'Process'
                              : data.status == 'F'
                              ? 'Confirm'
                              : data.status == 'V'
                              ? 'Solve'
                              : data.status == 'C'
                              ? 'Completed'
                              : data.status == 'D'
                              ? 'Done'
                              : ''}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text
                            style={{
                              fontSize: 13,
                              fontWeight: '300',
                              marginBottom: 10,
                            }}>
                            Reported by {data.serv_req_by}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text>no data</Text>
            )}
          </ScrollView>
        )}

        <Modal
          animationType="slide"
          isVisible={modalVisible}
          deviceWidth={deviceWidth}
          style={styles.bottomModal}>
          <View style={styles.modalView}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.textModal}>{selectedReportNo}</Text>
                <Icon
                  style={styles.iconModal}
                  name="times"
                  onPress={() => _setModalVisible(!modalVisible)}
                />
              </View>
              <View style={styles.modalBody}>
                <View>
                  <Text style={styles.modalBodyTitle}>
                    Please rate our work !
                  </Text>
                </View>
                <View style={styles.starWrap}>
                  <StarRating
                    fullStarColor={'#F9A233'}
                    disabled={false}
                    maxStars={5}
                    rating={starCount}
                    selectedStar={rating => onStarRatingPress(rating)}
                  />
                </View>

                <View style={styles.btnWrapModal}>
                  <TouchableOpacity
                    style={styles.btnNo}
                    onPress={() => _setModalVisible(!modalVisible)}>
                    <Text style={styles.textNo}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btnYes}
                    onPress={() => alert('submit')}>
                    <Text style={styles.textYes}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}
