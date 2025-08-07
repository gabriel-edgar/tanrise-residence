import {
  CardReport03,
  CardReport08,
  CardReport07,
  ProfileGridSmall,
  PlaceholderLine,
  Placeholder,
  SafeAreaView,
  Text,
  Header,
  Transaction2Col,
  Icon,
  Tag,
  Price3Col,
  ListTransactionExpand,
} from '@/components';
import {BaseStyle, useTheme} from '@/config';
import {useNavigation, useRoute} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {pdfSourceFunc} from '../Billing/pdfSourceFunc';

import {
  ScrollView,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Modal,
  Button,
  Platform,
  ActivityIndicator,
} from 'react-native';
import getUser from '../../selectors/UserSelectors';
import {useDispatch, useSelector} from 'react-redux';
import httpClient from '../../controllers/HttpClient';
import Clipboard from '@react-native-clipboard/clipboard';
import {useCustomTriggerOnFocus} from '../Billing/funcFocusEffect';

const BillingHistory = () => {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(state => getUser(state));
  const [dataCurrent, setDataCurrent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(null);
  const [error, setError] = useState('');

  const stateReduxChoosedUnit = useSelector(
    state => state.Dataproject.choosedUnit,
  );
  const stateReduxChoosedProject = useSelector(
    state => state.Dataproject.chooseProject,
  );

  // Make function to call the api
  async function fetchData() {
    const getParams = {
      entity_cd: stateReduxChoosedUnit.entity_cd,
      project_no: stateReduxChoosedUnit.project_no,
      email: user.email,
      lot_no: stateReduxChoosedUnit.lot_no,
    };

    const res = await httpClient
      .request({
        url: `/modules/billing/get-data-payment`,
        method: 'GET',
        params: getParams,
      })
      .then(res => {
        function checkLotno(currentValue, index, arr) {
          return (
            currentValue.lot_no == stateReduxChoosedUnit.lot_no
            //&&
            // currentValue.entity_cd == stateReduxChoosedUnit.entity_cd &&
            // currentValue.project_no == stateReduxChoosedUnit.project_no
          );
        }

        const filter = res.data.data.filter(checkLotno);
        setDataCurrent(filter);
        setLoading(false);
        console.log('133 dataCurrent: ', dataCurrent);
      })
      .catch(error => {
        setDataCurrent([]);
        //alert(JSON.stringify(error.response.data.message));
        setLoading(false);
      });
  }

  useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = () => {
    fetchData();
  };

  useCustomTriggerOnFocus(onRefresh);

  const copyToClipboard = text => {
    Clipboard.setString(text);
    Alert.alert('Copied!', '"' + text + '" has been copied to clipboard.');
  };

  const ObjectStyleCard = {
    //card
    backgroundColor: colors.background, //common
    borderRadius: 10, //common
    margin: 10, //common

    elevation: 3, // For Android shadow

    shadowColor: colors.text, // For iOS shadow
    shadowOffset: {width: 0, height: 1}, // For iOS shadow
    shadowOpacity: 0.2, // For iOS shadow
    shadowRadius: 1.5, // For iOS shadow
  };

  const showAlert = item => {
    Alert.alert(
      'Confirm', // Title of the alert
      'Are you sure you want to cancel the payment?', // Message
      [
        {text: 'No', onPress: () => console.log('Cancel Pressed')}, // First button
        {text: 'Yes', onPress: () => cancelPayment(item)}, // Second button
      ],
      {cancelable: false}, // Disable dismissing by tapping outside
    );
  };

  const cancelPayment = async item => {
    setModalVisible(null);
    const dataPost = {
      entity_cd: item.entity_cd,
      project_no: item.project_no,
      debtor_acct: item.debtor_acct,
      virtual_acct: item.virtual_acct,
      doc_no: item.doc_no,
    };
    await httpClient
      .request({
        url: `/modules/billing/update-status-payment`,
        method: 'POST',
        data: dataPost,
      })
      .then(res => {
        alert(JSON.stringify(res.data.message));
        onRefresh();
      })
      .catch(e => {
        alert(JSON.stringify(e.response.data.message));
        setLoading(false);
        onRefresh();
      });
  };

  function removeAfterDot(input) {
    // return input
    const index = input.indexOf('.');
    // if (index !== -1) {
    //   return formatNumber(parseInt(input.substring(0, index))); // Return substring before the dot
    // }
    return formatNumber(input); // Return original string if no dot is found
  }

  const formatNumber = num => {
    //  return num;
    return num.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    // return 'Rp ' + new Intl.NumberFormat('de-DE').format(num); // Using German formatting
  };

  const checkHowToPay = channel => {
    const pdfSource = pdfSourceFunc(channel);
    return pdfSource;
  };

  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView, {flex: 1}]}
      edges={['right', 'top', 'left']}>
      <Header
        title={t('Payment Active')}
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
      <Text style={{textAlign: 'center', marginBottom: 10}}>
        {stateReduxChoosedUnit.lot_no}
      </Text>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {loading == true ? (
          <ActivityIndicator></ActivityIndicator>
        ) : dataCurrent == 0 ? (
          <Text style={{textAlign: 'center'}}>No data available</Text>
        ) : (
          <View style={{flex: 1, paddingHorizontal: 20}}>
            {dataCurrent?.map((item, index) => (
              <View key={index}>
                <TouchableOpacity
                  key={index}
                  onPress={() => setModalVisible(index)}
                  style={{
                    padding: 15,
                    marginVertical: 8,
                    borderRadius: 5,

                    //card
                    backgroundColor: colors.background, //common
                    borderRadius: 10, //common
                    elevation: 3, // For Android shadow
                    shadowColor: colors.text, // For iOS shadow
                    shadowOffset: {width: 0, height: 1}, // For iOS shadow
                    shadowOpacity: 0.2, // For iOS shadow
                    shadowRadius: 1.5, // For iOS shadow
                    margin: 10, //common

                    //overflow: "hidden",
                  }}>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View style={{alignSelf: 'start'}}>
                      <Text style={{}}>Invoice</Text>
                      <Text style={{}}>Payment</Text>
                      <Text>Amount</Text>
                      <Text>Processed by</Text>
                    </View>

                    <View style={{alignSelf: 'start'}}>
                      <Text style={{}}>: {item.doc_no}</Text>
                      <Text>: {item.payment_channel}</Text>
                      <Text>: {removeAfterDot(item.doc_amt)}</Text>

                      {item.email?.length <= 25 ? (
                        <Text>: {item.email}</Text>
                      ) : null}
                    </View>
                    <View>
                      <Icon
                        name="angle-right"
                        size={20}
                        color={colors.primary}
                        enableRTL={true}
                      />
                    </View>
                  </View>
                  {item.email?.length > 25 ? (
                    <Text>
                      {'       '}: {item.email}
                    </Text>
                  ) : null}
                </TouchableOpacity>
                <Modal
                  animationType="slide" // 'slide', 'fade', or 'none'
                  transparent={true} // Use a transparent background
                  visible={modalVisible == index} // Modal visibility controlled by state
                  onRequestClose={() => setModalVisible(false)} // Android back button closes the modal
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
                    }}>
                    <View
                      style={{
                        width: 300,
                        padding: 20,
                        //backgroundColor: "#fff",
                        backgroundColor: colors.background,
                        borderRadius: 10,
                        alignItems: 'center',
                        borderColor: colors.text,
                        borderWidth: 0.5,
                      }}>
                      <TouchableOpacity
                        style={{
                          alignSelf: 'flex-end',
                        }}
                        onPress={() => setModalVisible(null)}>
                        <Icon
                          name="times-circle"
                          size={30}
                          color={colors.text}
                          enableRTL={true}
                        />
                      </TouchableOpacity>

                      <Text
                        style={{
                          fontSize: 18,
                          marginBottom: 10,
                        }}>
                        {item.payment_channel}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {item.payment_channel != 'BNI' ? (
                          <>
                            <Text
                              style={{
                                fontSize: 18,
                                //marginBottom: 15,
                                //color: "black",
                              }}>
                              {item.virtual_acct}
                            </Text>
                            <View style={ObjectStyleCard}>
                              <TouchableOpacity
                                //title="Copy"
                                onPress={() =>
                                  copyToClipboard(item.virtual_acct)
                                } // Close modal
                                //color={colors.text}
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  //backgroundColor: colors.primary,
                                  paddingVertical: 10,
                                  paddingHorizontal: 15,
                                  borderRadius: 10,
                                }}>
                                <Icon
                                  name="copy"
                                  size={20}
                                  color={colors.text}
                                  enableRTL={true}
                                />
                              </TouchableOpacity>
                            </View>
                          </>
                        ) : (
                          <>
                            <View style={ObjectStyleCard}>
                              <Button
                                title="Go to Payment Screen"
                                onPress={() => {
                                  if (item.response_url != null) {
                                    navigation.navigate('WebviewScreen', {
                                      title: 'Payment Screen',
                                      doc_no: item.doc_no,
                                      url: item.response_url,
                                    });
                                    setModalVisible(null);
                                  }
                                }} // Close modal
                                color={colors.text}
                              />
                            </View>
                          </>
                        )}
                      </View>
                      {item.payment_channel != 'BNI' &&
                      checkHowToPay(item.payment_channel).uri != '' ? (
                        <View style={ObjectStyleCard}>
                          <Button
                            title="See How to Pay"
                            onPress={() => {
                              navigation.navigate('PDFShow', {
                                title: 'Cara Bayar',
                                //pdf_uri: "http://www.pdf995.com/samples/pdf.pdf",
                                pdfSource: checkHowToPay(item.payment_channel),
                                merchant: item.payment_channel,
                              });
                              setModalVisible(null);
                            }}
                            color={colors.text}
                          />
                        </View>
                      ) : null}
                      <View style={[ObjectStyleCard, {backgroundColor: 'red'}]}>
                        <Button
                          title="Cancel Payment"
                          //onPress={() => setModalVisible(null)} // Close modal
                          onPress={() => showAlert(item)}
                          //color={colors.text}
                          color={Platform.OS === 'ios' ? 'white' : 'red'}
                        />
                      </View>
                    </View>
                  </View>
                </Modal>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BillingHistory;
