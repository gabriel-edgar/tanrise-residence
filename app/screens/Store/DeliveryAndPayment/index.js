import {
  Button,
  CheckBox,
  Header,
  Icon,
  SafeAreaView,
  Text,
  TextInput,
} from '@components';
import {BaseColor, BaseStyle, useTheme} from '@config';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import styles from './styles';
import {Picker} from '@react-native-picker/picker';
import {useSelector, useDispatch} from 'react-redux';
import getUser from '../../../selectors/UserSelectors';
import getProject from '../../../selectors/ProjectSelector';
import axios from 'axios';
import ModalDropdown_lotno from '@components/ModalDropdown_lotno';
import ModalDropdown_ListPayment from '../../../components/ModalDropdown_ListPayment';
import ModalDropdown_debtor from '../../../components/ModalDropdown_debtor';
import Modal from 'react-native-modal';
import IconAnt from 'react-native-vector-icons/AntDesign';

import {Divider} from 'react-native-paper';
import numFormattanpaRupiah from '../../../components/numFormattanpaRupiah';
import MaskInput, {Masks, createNumberMask} from 'react-native-mask-input';
import {API_URL_LOKAL} from '@env';
const rupiahMask = createNumberMask({
  prefix: [],
  delimiter: '.',
  separator: ',',
  precision: 0,
});

// import TextInputs as TextInput from 'react-native-paper';
// import {TextInput} from 'react-native-paper';

export default function DeliveryAndPayment({route, navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [dataParams, setDataParams] = useState(route.params);
  const [dataParamsTransaction, setDataParamsTransaction] = useState(
    route.params.datadetail,
  );
  console.log('data params', dataParams);
  console.log('data params ?', dataParams.facility_type);

  const [refreshing, setRefreshing] = useState(false);
  const [spinner, setSpinner] = useState(true);

  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postCode, setPostCode] = useState('');
  const [country, setCountry] = useState('');
  const [contactName, setContactName] = useState('');

  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('home'); // home or office
  const [hasError, setErrors] = useState(false);
  const user = useSelector(state => getUser(state));
  // console.log('user cek debtor', user);

  const project = useSelector(state => getProject(state));
  const facility_type = dataParams.facility_type;

  const [email, setEmail] = useState(user != null ? user.user : '');

  const [lotNo, setLotno] = useState([]);
  const [entity_cd, setEntity] = useState(project.Data[0].entity_cd);
  const [project_no, setProjectNo] = useState(project.Data[0].project_no);
  const [default_text_lotno, setDefaultLotno] = useState(false);
  const [text_lotno, setTextLotno] = useState('');

  const [listPayment, setListPayment] = useState([]);
  const [textPayment, setTextPayment] = useState('');
  const [trxCode, setTrxCode] = useState('');

  const [amountPaid, setAmountPaid] = useState('');
  const [balancetoPay, setBalancetoPay] = useState('');

  const [debtor, setDebtor] = useState('');
  const [dataDebtor, setDataDebtor] = useState([]);
  const [textDebtor, settextDebtor] = useState('');
  const [textNameDebtor, settextNameDebtor] = useState('');
  const [defaultDebtor, setDefaultDebtor] = useState(false);

  const [showAlertMinusPayment, setShowAlertMinusPayment] = useState(false);

  const [modalSuccessPayment, setModalSuccessPayment] = useState(false);
  const [statusResult, setStatus] = useState('');
  const [messageAlert, setMessageAlert] = useState('');
  const [message, setMessage] = useState('');
  const [amountPaidMask, setAmountPaidMask] = useState('');

  const [success] = useState({
    street: true,
    city: true,
    postCode: true,
    country: true,
    contactName: true,
    email: true,
    phone: true,
    amountPaid: true,
    balancetoPay: true,
  });

  useEffect(() => {
    // getLotNo();
    getListPayment();
    getDebtor();
  }, []);

  const totalTax = dataParamsTransaction.reduce(
    (total, currentItem) =>
      (total = total + currentItem.count_tax_rate_per_item),
    0,
  );

  const totalHarga = dataParamsTransaction.reduce(
    (total, currentItem) => (total = total + currentItem.totalHarga),
    0,
  );

  const round = Math.ceil(totalHarga);
  console.log('rounds', round);
  console.log('rounds', totalHarga);
  const totalHargadenganTax = dataParamsTransaction.reduce(
    (total, currentItem) => (total = total + currentItem.total_harga_with_tax),
    0,
  );

  /**
   *
   * Called when process checkout
   */

  async function getLotNo() {
    console.log(
      'url api lotno',
      'http://apps.pakubuwono-residence.com/apiwebpbi/api/facility/book/unit?entity=' +
        entity_cd +
        '&' +
        'project=' +
        project_no +
        '&' +
        'email=' +
        email,
    );
    try {
      const res = await axios.get(
        API_URL_LOKAL +
          `/facility/book/unit?entity=` +
          entity_cd +
          '&' +
          'project=' +
          project_no +
          '&' +
          'email=' +
          email,
      );
      const resLotno = res.data.data;
      console.log('reslotno', resLotno);

      // setTextLotno(resLotno[0].lot_no);

      if (resLotno.length > 1) {
        setDefaultLotno(false);
      } else {
        setDefaultLotno(true);
        setTextLotno(resLotno[0].lot_no);
      }
      setLotno(resLotno);
      // if (default_text_lotno == true) {
      //   setTextLotno(resLotno[0].lot_no);
      // }

      setSpinner(false);
    } catch (error) {
      setErrors(error);
      // alert(hasError.toString());
    }
  }

  async function getListPayment() {
    console.log(
      'url api lotno',
      'http://apps.pakubuwono-residence.com/apiwebpbi/api/pos/getPayment?entity_cd=' +
        entity_cd +
        '&' +
        'project_no=' +
        project_no +
        '&' +
        'facility_type=' +
        facility_type,
    );
    try {
      const res = await axios.get(
        API_URL_LOKAL +
          `/pos/getPayment?entity_cd=` +
          entity_cd +
          '&' +
          'project_no=' +
          project_no +
          '&' +
          'facility_type=' +
          facility_type,
      );
      const resPayment = res.data.Data;
      // resPayment.push({trx_code: 'others', descs: 'Others'});

      console.log('listpayment', resPayment);

      setListPayment(resPayment);

      setSpinner(false);
    } catch (error) {
      setErrors(error);
      // alert(hasError.toString());
    }
  }

  const chooseListPayment = ({data, index}) => {
    console.log('data list choose', data);
    console.log('index list choose', index);

    setTextPayment(index.descs);
    setTrxCode(index.trx_code);
  };

  //-----FOR GET DEBTOR
  const getDebtor = async data => {
    // console.log(object)
    console.log('data for debtor', data);

    const params =
      '?' +
      'entity_cd=' +
      entity_cd +
      '&' +
      'project_no=' +
      project_no +
      '&' +
      'email=' +
      email;

    console.log(
      'api debtor',
      'http://apps.pakubuwono-residence.com/apiwebpbi/api/csentry-getDebtor' +
        params,
    );

    console.log('data for', params);
    console.log('text_lotno>', text_lotno);
    // console.log('dataDebtors[0]', dataDebtor);

    const config = {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        token: '',
      },
    };
    await axios
      .post(API_URL_LOKAL + '/csentry-getDebtor' + params, {
        config,
      })
      .then(res => {
        // console.log('res', res);
        const datas = res.data;
        const dataDebtors = datas.Data;
        console.log('res debtor', dataDebtors);
        console.log('ada berapa length debtor', dataDebtors.length);

        if (dataDebtors.length > 1) {
          setDefaultDebtor(false);
          // getLotNo();
          // setDebtor(dataDebtors[0].debtor_acct);

          // settextDebtor(
          //   dataDebtors[0].debtor_acct + ' - ' + dataDebtors[0].name,
          // );
          // console.log(
          //   'debn',
          //   dataDebtors[0].debtor_acct + ' - ' + dataDebtors[0].name,
          // );
          // settextNameDebtor(dataDebtors[0].name);
        } else {
          setDefaultDebtor(true);

          setDebtor(dataDebtors[0].debtor_acct);

          settextDebtor(
            dataDebtors[0].debtor_acct + ' - ' + dataDebtors[0].name,
          );
          console.log(
            'debn',
            dataDebtors[0].debtor_acct + ' - ' + dataDebtors[0].name,
          );
          settextNameDebtor(dataDebtors[0].name);

          setSpinner(false);
          getLotNo();
          // console.log('params for debtor tower default', params);
          // getDebtor(params);
        }

        setDataDebtor(dataDebtors);

        // return res.data;
      })
      .catch(error => {
        console.log('error get debtor api', error);
        // alert('error get');
      });
  };

  const handleChangeModal = ({data, index}) => {
    console.log('index,', index);
    setDefaultDebtor(index);
    // console.log('data change debtor', data);
    // data.data.map(dat => {
    //   console.log('data for text debtor', dat);
    //   if (dat) {

    setDebtor(index.debtor_acct);
    // setTenantNo(index.tenant_no);
    setTextLotno(index.lot_no);
    console.log('text_lot', text_lotno);
    settextDebtor(index.debtor_acct + ' - ' + index.name);
    settextNameDebtor(index.name);
    // getLot('', index.tenant_no);
    //   }
    // });
    getLotNo();
    setSpinner(false);
  };

  const changeBalancePay = items => {
    console.log('items amount paid', items);
    setAmountPaid(items);

    const balance = items - totalHargadenganTax;

    // const fixBalance = balance > 0 ? balance : 0;
    // const fixBalance = balance > 0 ? balance : balance;
    const fixBalance =
      Number(balance.toFixed()) > 0
        ? Number(balance.toFixed())
        : Number(balance.toFixed());

    // const showAlertMinusPayment = totalHargadenganTax > items ? false : true;

    console.log('kembalian', Number(balance.toFixed()));
    // setShowAlertMinusPayment(showAlertMinusPayment);
    setBalancetoPay(fixBalance);
  };

  const onCloseModal = () => {
    setShowAlertMinusPayment(false);
  };

  const onCloseAlertPayment = () => {
    setModalSuccessPayment(false);
    navigation.navigate('Store');
  };

  const onCheckOut = () => {
    // const fixBalance = balance ;
    console.log('balance to pay = 0', balancetoPay);
    if (!trxCode && !textPayment) {
      alert('Please Choose Payment');
    }
    // check if number is greater than 0
    else if (balancetoPay > 0) {
      setShowAlertMinusPayment(false);
      const formData = {
        entity_cd: dataParams.entity_cd, // udah dijelasin di sebelumnya ka
        project_no: dataParams.project_no, // udah dijelasin di sebelumnya ka
        facility_type: dataParams.facility_type, // udah dijelasin di sebelumnya ka
        member_id: dataParams.member_id, // udah dijelasin di sebelumnya ka
        member_name: dataParams.member_name, // udah dijelasin di sebelumnya ka
        payment_trx_code: trxCode, // ambil dari payment code ketika choose payment type
        payment_trx_descs: textPayment, // ambil dari payment descs ketika choose payment type
        debtor_acct: dataParams.tenant_no, // dapet dari choose member_id di screen index.js choose member id
        lot_no: text_lotno.lot_no, //
        audit_user: dataParams.member_id, // udah dijelasin di sebelumnya ka
        cash: amountPaid == '' ? 0 : amountPaid, // ini tuh nominal kita bayar berapa ka
        return: balancetoPay == '' ? 0 : balancetoPay, // ini nominal kembaliannya
        datadetail: dataParams.datadetail, // udah dijelasin di sebelumnya ka
        status_order: 'M', // ini untuk validasi status pembelian dari Mobiles
      };
      console.log('form data payment', formData);

      axios
        .post(API_URL_LOKAL + '/pos/save/order_payment', formData)
        .then(res => {
          if (res.data.Error == false) {
            setModalSuccessPayment(true);
            setMessageAlert(res.data.Pesan);
            setMessage(res.data.bill_no);
            setStatus(res.data.Error);
            // alert(res.data.Pesan);
          } else {
            setModalSuccessPayment(true);
            setMessageAlert(res.data.Pesan);
            setStatus(res.data.Error);
            // alert(res.data.Pesan);
          }
        })
        .catch(error => {
          console.log(error.response);
        });
    }

    // check if number is 0
    else if (balancetoPay == 0) {
      setShowAlertMinusPayment(false);
      const formData = {
        entity_cd: dataParams.entity_cd, // udah dijelasin di sebelumnya ka
        project_no: dataParams.project_no, // udah dijelasin di sebelumnya ka
        facility_type: dataParams.facility_type, // udah dijelasin di sebelumnya ka
        member_id: dataParams.member_id, // udah dijelasin di sebelumnya ka
        member_name: dataParams.member_name, // udah dijelasin di sebelumnya ka
        payment_trx_code: trxCode, // ambil dari payment code ketika choose payment type
        payment_trx_descs: textPayment, // ambil dari payment descs ketika choose payment type
        debtor_acct: dataParams.tenant_no, // dapet dari choose member_id di screen index.js choose member id
        lot_no: text_lotno, //
        audit_user: dataParams.member_id, // udah dijelasin di sebelumnya ka
        cash: amountPaid == '' ? 0 : amountPaid, // ini tuh nominal kita bayar berapa ka
        return: balancetoPay == '' ? 0 : balancetoPay, // ini nominal kembaliannya
        datadetail: dataParams.datadetail, // udah dijelasin di sebelumnya ka
        status_order: 'M', // ini untuk validasi status pembelian dari Mobiles
      };
      console.log('form data payment', formData);

      axios
        .post(API_URL_LOKAL + '/pos/save/order_payment', formData)
        .then(res => {
          if (res.data.Error == false) {
            setModalSuccessPayment(true);
            setMessageAlert(res.data.Pesan);
            setMessage(res.data.bill_no);
            setStatus(res.data.Error);
            // alert(res.data.Pesan);
          } else {
            setModalSuccessPayment(true);
            setMessageAlert(res.data.Pesan);
            setStatus(res.data.Error);
            // alert(res.data.Pesan);
          }
        })
        .catch(error => {
          console.log(error.response);
        });
    }

    // if number is less than 0
    else {
      setShowAlertMinusPayment(true);
    }
  };

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'top', 'left']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        style={{flex: 1}}>
        <Header
          title={t('Payment')}
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
        <ScrollView
          contentContainerStyle={{paddingHorizontal: 20, paddingTop: 20}}>
          <ModalDropdown_debtor
            label="Debtor"
            data={dataDebtor}
            onChange={index => handleChangeModal({data: dataDebtor, index})}
            value={textDebtor}
            style={{marginBottom: 0, paddingBottom: 0}}
          />

          <View style={{flexDirection: 'row', marginTop: 10}}>
            <View
              style={{
                flex: 3,
                paddingTop: 10,
              }}>
              <Text style={{fontSize: 14}}>Unit No : </Text>
            </View>
            <View style={[styles.inputItem]}>
              <ModalDropdown_lotno
                // label="Unit"
                data={lotNo}
                onChange={(itemValue, itemIndex) =>
                  // {
                  //   setTextLotno(
                  //     itemValue.lot_no,
                  //     console.log('itemvalue', itemValue.lot_no),
                  //   ),
                  //     setDefaultLotno(itemIndex);
                  // }
                  setTextLotno(
                    itemValue.lot_no,
                    console.log('itemvalue', itemValue.lot_no),
                  )
                }
                value={text_lotno}
                icon={
                  <Icon
                    name="chevron-down"
                    size={12}
                    solid
                    color={BaseColor.grayColor}
                  />
                }
              />
            </View>
          </View>

          <Divider style={{marginVertical: 10}} />

          {/* ------- ITEMS CHECKOUT HERE ------- */}
          <View>
            {/* <Text>Items Checkout</Text> */}

            <View>
              <FlatList
                // contentContainerStyle={{ paddingVertical: 12 }}
                showsHorizontalScrollIndicator={true}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    colors={[colors.primary]}
                    tintColor={colors.primary}
                    refreshing={refreshing}
                    onRefresh={() => {}}
                  />
                }
                data={dataParamsTransaction}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                  <View style={[styles.contain]} activeOpacity={0.9}>
                    <TouchableOpacity>
                      <ImageBackground
                        // source={image}
                        source={
                          // {uri: item.images}
                          item.images != '' && item.images != null
                            ? {uri: item.images}
                            : require('@assets/images/logo.png')
                          // require('@assets/images/logo.png')
                        }
                        style={styles.imageBackgroundCard1}
                        imageStyle={{borderRadius: 8}}
                      />
                    </TouchableOpacity>
                    <View style={{flex: 1, paddingVertical: 4}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          paddingHorizontal: 10,
                          flex: 1,
                        }}>
                        <View style={{flex: 1, paddingBottom: 4}}>
                          <View style={{flex: 1}}>
                            <View>
                              <Text semibold style={{fontSize: 16}}>
                                {item.trx_descs}
                              </Text>
                            </View>
                            <View>
                              <Text semibold style={{fontSize: 16}}>
                                {item.trx_qty} x{' '}
                                {numFormattanpaRupiah(item.unit_price)}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View>
                          <View>
                            <Text semibold style={{fontSize: 16}}>
                              {numFormattanpaRupiah(item.totalHarga)}
                            </Text>
                          </View>
                        </View>
                        {/* <Text>{CurrentValue}</Text> */}
                      </View>
                    </View>
                  </View>
                )}
              />
            </View>
          </View>
          {/* ------- CLOSE ITEMS CHECKOUT HERE ------- */}

          <Divider style={{marginVertical: 10}} />

          {/* ------- SUM TOTAL HERE -------- */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                alignSelf: 'flex-start',
                width: 150,
              }}>
              <Text
                style={{
                  fontSize: 16,

                  alignSelf: 'flex-start',
                }}>
                Subtotal
              </Text>
            </View>
            <View style={{justifyContent: 'flex-end', width: 80}}>
              <Text semibold style={{fontSize: 16, alignSelf: 'flex-end'}}>
                {/* {parseFloat(totalHarga).toFixed(2)} */}
                {numFormattanpaRupiah(totalHarga)}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <View
              style={{
                alignSelf: 'flex-start',
                width: 150,
              }}>
              <Text
                style={{
                  fontSize: 16,

                  alignSelf: 'flex-start',
                }}>
                Tax
              </Text>
            </View>
            <View style={{justifyContent: 'flex-end', width: 80}}>
              <Text semibold style={{fontSize: 16, alignSelf: 'flex-end'}}>
                {/* {parseFloat(totalTax).toFixed(2)}
                 */}
                {numFormattanpaRupiah(totalTax)}
              </Text>
            </View>
          </View>
          <View
            style={{flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
            <View
              style={{
                // justifyContent: 'flex-start',
                alignSelf: 'flex-start',
                // paddingHorizontal: 20,

                width: 150,
              }}>
              <Text
                style={{
                  fontSize: 16,

                  alignSelf: 'flex-start',
                }}>
                Total
              </Text>
            </View>
            <View style={{justifyContent: 'flex-end', width: 80}}>
              <Text semibold style={{fontSize: 16, alignSelf: 'flex-end'}}>
                {/* {parseFloat(totalHargadenganTax).toFixed(2)} */}
                {numFormattanpaRupiah(totalHargadenganTax)}
              </Text>
            </View>
          </View>
          {/* ------- CLOSE SUM TOTAL HERE -------- */}

          <Divider style={{marginVertical: 10}} />

          {/* ----- PAYMENT TYPE HERE ----- */}
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <View
              style={{
                flex: 3,
                paddingTop: 10,
              }}>
              <Text style={{fontSize: 14}}>Payment Type : </Text>
            </View>
            <View style={[styles.inputItem]}>
              <ModalDropdown_ListPayment
                // label="Unit"
                data={listPayment.sort((a, b) =>
                  a.descs.localeCompare(b.descs),
                )}
                // onChange={(itemValue, itemIndex) =>
                //   setTextPayment(itemValue.trx_code)
                // }
                placeholder={'halo'}
                onChange={index =>
                  chooseListPayment({data: listPayment, index})
                }
                value={textPayment}
                icon={
                  <Icon
                    name="chevron-down"
                    size={12}
                    solid
                    color={BaseColor.grayColor}
                  />
                }
              />
            </View>
          </View>
          {/* ----- CLOSE PAYMENT TYPE HERE ----- */}

          {/* ------ AMOUNT PAID HERE ----- */}
          {textPayment.includes('CASH') ? (
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <View style={{flex: 3.5}}>
                <Text>Amount Paid</Text>
                <MaskInput
                  style={{backgroundColor: colors.card, borderRadius: 10}}
                  placeholder={'0'}
                  value={amountPaidMask}
                  // onChangeText={text => changeBalancePay(text)}
                  onChangeText={(masked, unmasked) => {
                    changeBalancePay(unmasked); // you can use the masked value as well
                    setAmountPaidMask(masked);
                    // assuming you typed "123456":
                    console.log(masked); // "R$ 1.234,56"
                    console.log(unmasked); // "123456"
                  }}
                  mask={rupiahMask}
                />

                {/* <TextInput
                  // onChangeText={text => setAmountPaid(text)}
                  onChangeText={text => changeBalancePay(text)}
                  keyboardType="numeric"
                  placeholder={t('Amount Paid')}
                  // success={success.amountPaid}

                  value={amountPaid} //tidak pakai numformat karena tidak bisa terbentuk angka dengan sempurna, (angka hilang-hilangan)
                /> */}
              </View>

              <View style={styles.inputItem}>
                <Text>Change</Text>
                <TextInput
                  // onChangeText={text => setBalancetoPay(text)}
                  // onChangeText={balancetoPay}
                  editable={false}
                  keyboardType="numeric"
                  placeholder={t('Change')}
                  // success={success.postCode}
                  value={
                    balancetoPay.toString() <= '0'
                      ? '0'
                      : numFormattanpaRupiah(balancetoPay)
                  }
                  // defaultValue={balancetoPay.toString()}
                />
                {/* <Text>{balancetoPay}</Text> */}
              </View>
            </View>
          ) : null}
          {/* ------ CLOSE AMOUNT PAID HERE ----- */}
        </ScrollView>

        {/* ---- BUTTON PAYMENT HERE ---- */}
        <View style={{paddingHorizontal: 20, paddingVertical: 15}}>
          <Button
            loading={loading}
            full
            onPress={() => {
              onCheckOut();
            }}>
            {t('payment')}
          </Button>
        </View>
        {/* ---- CLOSE BUTTON PAYMENT HERE ---- */}
      </KeyboardAvoidingView>

      {/* ----- MODAL ALERT UNTUK BALANCE PAYMENT ----- */}
      <View>
        <Modal
          isVisible={showAlertMinusPayment}
          style={{height: '100%'}}
          onBackdropPress={() => onCloseModal()}>
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
                {'Alert'}
              </Text>
              <Text>Payment is Less than the Total Price</Text>
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
                <Text style={{fontSize: 13, color: colors.whiteColor}}>
                  {t('OK')}
                </Text>
              </Button>
            </View>
          </View>
        </Modal>
      </View>
      {/* -----CLOSE MODAL ALERT UNTUK BALANCE PAYMENT ----- */}

      {/* ---- MODAL ALERT UNTUK SUKSES PAYMENT ---- */}
      <View>
        <Modal
          isVisible={modalSuccessPayment}
          style={{height: '100%'}}
          onBackdropPress={() => onCloseAlertPayment()}>
          <View
            style={{
              // flex: 1,

              // alignContent: 'center',
              padding: 10,
              backgroundColor: '#fff',
              // height: ,
              borderRadius: 8,
            }}>
            {statusResult == false ? (
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: colors.primary,
                    marginBottom: 10,
                  }}>
                  {/* {messageAlert.includes('success') ? 'Success' : 'Failed'} */}
                </Text>
                <Text>{messageAlert}</Text>
                <Text></Text>
                <IconAnt
                  name="checkcircleo"
                  size={80}
                  color={colors.primary}></IconAnt>
                <Text></Text>
                <Text>On Bill No :</Text>
                <Text>{message}</Text>
              </View>
            ) : (
              statusResult == true && (
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: 'salmon',
                      marginBottom: 10,
                    }}>
                    {messageAlert.includes('success') ? 'Success' : 'Failed'}
                  </Text>
                  <Text></Text>
                  <IconAnt
                    name="closecircleo"
                    size={80}
                    color={'salmon'}></IconAnt>
                  <Text></Text>
                  <Text>Result :</Text>
                  <Text></Text>
                  {/* <Text>{message}</Text> */}
                  <Text style={{alignSelf: 'center', textAlign: 'center'}}>
                    {messageAlert}
                  </Text>
                </View>
              )
            )}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Button
                style={{
                  marginTop: 10,
                  // marginBottom: 10,

                  width: 70,
                  height: 40,
                }}
                onPress={() => onCloseAlertPayment()}>
                <Text style={{fontSize: 13, color: colors.whiteColor}}>
                  {t('OK')}
                </Text>
              </Button>
            </View>
          </View>
        </Modal>
      </View>
      {/* ---- CLOSE MODAL ALERT UNTUK SUKSES PAYMENT ---- */}
    </SafeAreaView>
  );
}
