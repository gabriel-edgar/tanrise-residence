import {
  Button,
  CardBooking,
  Header,
  Icon,
  ModalFilter,
  // ProductCard1,
  SafeAreaView,
  TextInput,
  Text,
  FormCounterSelect,
} from '@components';
import Checkout from '../Checkout';
import {BaseColor, BaseStyle, useTheme} from '@config';
import {ProductsData} from '@data';
import React, {Fragment, useEffect, useState, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, RefreshControl, View} from 'react-native';

import getProject from '../../../selectors/ProjectSelector';
import {useSelector, useDispatch} from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Modal from 'react-native-modal';

import getCartData from '../../../selectors/cartSelectors';

const sortOptionInit = [
  {
    value: 'remove',
    icon: 'sort-amount-up',
    text: 'remove',
  },
  {
    value: 'share_this_article',
    icon: 'sort-amount-down',
    text: 'share_this_article',
  },
  {
    value: 'view_detail',
    icon: 'sort-amount-up',
    text: 'view_detail',
  },
  {
    value: 'reset_all',
    icon: 'sort-amount-up',
    text: 'reset_all',
  },
];

const CartStore = props => {
  const {navigation, route} = props;
  // console.log('route from list store', route.params.itemsforCheckout);

  const params = route.params.itemsforCheckout;
  const [dataListCheckout, setDataListCheckout] = useState(params);

  //  const storage_cart = await AsyncStorage.getItem('@storage_cart');
  //   const parse_storage = JSON.parse(storage_cart);

  //   console.log('store storage', parse_storage);

  const projectSelector = useSelector(state => getProject(state));

  const cartSelector = useSelector(state => getCartData(state));
  console.log('cart selector', cartSelector);
  // console.log('project selector', projectSelector);
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [products, setProducts] = useState(ProductsData);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [sortOption, setSortOption] = useState(sortOptionInit);

  const [tambahItem, setTambahItem] = useState(false);

  const [promotionCode, setPromotionCode] = useState('');
  const [totalHarga, setTotal] = useState(0);
  const [totalHargaParams, setTotalParams] = useState(0);
  const [jumlahTotalHarga, setJumlahTotalHarga] = useState(0);
  const [totalQty, setQty] = useState(0);
  const [totalTax, setTotalTax] = useState(0);

  const [ArrayDataCheckout, setArrayDataCheckout] = useState([]);
  const [taxRatePerItem, setTaxRatePerItem] = useState(0);

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      // getData();
    }, 1000);
  }, []);

  // const getData = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem('@storage_Key');
  //     console.log('store storage', jsonValue);
  //     // return jsonValue != null ? JSON.parse(jsonValue) : null;

  //     // const parse = JSON.parse(jsonValue);
  //     // console.log('parse store', parse);
  //     // return parse;
  //   } catch (e) {
  //     // error reading value
  //   }
  // };

  // const itemFortotal = dataListCheckout.filter(dataListCheckout=>dataListCheckout.totalHarga)

  const itemFortotal = dataListCheckout.reduceRight((max, bills) => {
    // return (max += parseInt(bills.totalHarga));
    return (max += parseInt(bills.unit_price));
    // unit_price
  }, 0);
  // const itemForQuantity = dataListCheckout.reduceRight((max, bills) => {
  //   return (max += parseInt(bills.quantity));
  // }, 0);

  useEffect(() => {
    // setTambahItem(false);
    // setTotalParams(itemFortotal);
    // tambahItem == false ? setTotal(itemFortotal) : setTotal(totalHarga);
    // tambahItem == false ? setQty(itemForQuantity) : setQty(totalQty);
  });

  // console.log('item for total', itemFortotal);

  const onSelectFilter = selected => {
    setSortOption(
      sortOption.map(item => {
        return {
          ...item,
          checked: item.value == selected.value,
        };
      }),
    );
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
      setSortOption(sortOptionInit);
    }
  };

  const onDelete = () => {
    var myArray = dataListCheckout;
    var myIndex = myArray.indexOf(dataListCheckout.trx_code);
    console.log('myindex', myIndex);
    if (myIndex !== -1) {
      myArray.splice(myIndex, 1);
    }
    console.log('myarray', myArray);
  };

  const changeQty = (value, unit_price, index, item) => {
    // console.log('total qty kalo change qty', totalQty);

    setTambahItem(true);
    setTaxRatePerItem(item.tax_rate);

    // setTotal(value * unit_price);

    const totalAwal = value * unit_price;
    const totalAwaldenganTax = totalAwal + (value * unit_price) / item.tax_rate;
    const taxSebelumdiJumlah = (value * unit_price) / item.tax_rate;

    const dataCheckout = {
      totalHarga: value * unit_price,
      trx_qty: value,
      ...item,
      // ...dataMember,
      indexToCart: index,
      count_tax_rate_per_item: (value * unit_price) / item.tax_rate,
      total_harga_with_tax: totalAwaldenganTax,
    };
    console.log('databuy ???', dataCheckout);

    const arrayCart = [...ArrayDataCheckout, dataCheckout];
    console.log('array checkout', arrayCart);

    const newArray = [
      ...new Map(arrayCart.map(item => [item.trx_code, item])).values(),
    ];

    console.log('newarray', newArray);

    // const filterCart = [...newArray];

    setArrayDataCheckout(newArray);

    const itemFortotal =
      ArrayDataCheckout.length == 0
        ? totalAwaldenganTax
        : newArray.reduce(
            (total, currentItem) =>
              (total = total + currentItem.total_harga_with_tax),
            0,
          );

    const itemFortax =
      ArrayDataCheckout.length == 0
        ? taxSebelumdiJumlah
        : newArray.reduce(
            (tax, currentItem) =>
              (tax = tax + currentItem.count_tax_rate_per_item),
            0,
          );

    // const total = newArray.reduce(
    //   (total, currentItem) =>
    //     (total = total + currentItem.total_harga_with_tax),
    //   0,
    // );

    console.log('tes tax', itemFortax);
    setTotalTax(itemFortax);
    setTotal(itemFortotal);
  };

  const onCloseAlert = () => {
    setShowAlert(false);
  };

  const checkoutSave = () => {
    console.log('dataListCheckout di button checkout save', dataListCheckout);

    const formData = {
      entity_cd: dataListCheckout[0].entity_cd, // sebenernya ini cukup ambil dari data array 0, karena termasuk member item yang sama disetiap array produk
      project_no: dataListCheckout[0].project_no, // sebenernya ini cukup ambil dari data array 0, karena termasuk member item yang sama disetiap array produk
      facility_type: dataListCheckout[0].facility_type, // sebenernya ini cukup ambil dari data array 0, karena termasuk member item yang sama disetiap array produk
      member_id: dataListCheckout[0].member_id, // sebenernya ini cukup ambil dari data array 0, karena termasuk member item yang sama disetiap array produk
      member_name: dataListCheckout[0].member_name, // sebenernya ini cukup ambil dari data array 0, karena termasuk member item yang sama disetiap array produk
      audit_user: dataListCheckout[0].audit_user, // sebenernya ini cukup ambil dari data array 0, karena termasuk member item yang sama disetiap array produk
      tenant_no: dataListCheckout[0].tenant_no,
      datadetail: ArrayDataCheckout, // dapet dari isi redux (ini yg nantinya ada kode item, qty, total, dll)
    };

    console.log('formdata', formData);

    navigation.navigate('DeliveryAndPayment', formData);
  };

  const renderContent = () => {
    return (
      <View style={{flex: 1}}>
        <Header
          title={t('checkout')}
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
        <View style={[{flex: 1, paddingHorizontal: 20, paddingBottom: 10}]}>
          {/* <View style={{flexDirection: 'row', marginBottom: 20}}>
            <TextInput
              style={{flex: 1}}
              onChangeText={text => setPromotionCode(text)}
              autoCorrect={false}
              placeholder={t('promotion_code')}
              placeholderTextColor={BaseColor.grayColor}
              value={promotionCode}
              selectionColor={colors.primary}
              onSubmitEditing={() => {
                navigation.goBack();
              }}
            />
            <Button small style={{height: 45, marginLeft: 8}}>
              {t('check')}
            </Button>
          </View> */}

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
            data={dataListCheckout}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <Checkout
                loading={loading}
                style={{marginTop: 10}}
                title={item.trx_descs}
                // image={item.image}
                image={require('@assets/images/logo.png')} //image di component checkoutnya sengaja di tutup, karena tidak pakai url uri
                salePrice={item.unit_price}
                // description={item.tax_rate}
                secondDescription={item.tax_rate}
                onDelete={() =>
                  setDataListCheckout(
                    dataListCheckout.filter(
                      dataListCheckout =>
                        dataListCheckout.trx_code != item.trx_code,
                    ),
                  )
                }
                // onDelete={() => onDelete()}
                // onChange={total => console.log('total', total)}
                onChange={value =>
                  changeQty(value, item.unit_price, index, item)
                }
                // CurrentValue={item.quantity}
              />
            )}
          />

          <ModalFilter
            options={sortOption}
            isVisible={modalVisible}
            onSwipeComplete={() => {
              setModalVisible(false);
              setSortOption(sortOptionInit);
            }}
            onApply={onApply}
            onSelectFilter={onSelectFilter}
          />
        </View>
        <CardBooking
          loading={loading}
          description={t('total_price')}
          // price={tambahItem == false ? itemFortotal : totalHarga}
          price={totalHarga}
          // price={'1000'}
          secondDescription={'Tax included'}
          textButton={t('checkout')}
          // onPress={() => navigation.navigate('EShipping')}
          onPress={() =>
            totalHarga == 0 ? setShowAlert(true) : checkoutSave()
          }
        />

        {/* ---- MODAL ALERT UNTUK SUKSES PAYMENT ---- */}
        <View>
          <Modal
            isVisible={showAlert}
            style={{height: '100%'}}
            onBackdropPress={() => onCloseAlert()}>
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
                <Text>You have to set the quantity</Text>
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
                  onPress={() => onCloseAlert()}>
                  <Text style={{fontSize: 13, color: colors.whiteColor}}>
                    {t('OK')}
                  </Text>
                </Button>
              </View>
            </View>
          </Modal>
        </View>
        {/* ---- CLOSE MODAL ALERT UNTUK SUKSES PAYMENT ---- */}
      </View>
    );
  };

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'top', 'left']}>
      {renderContent()}
    </SafeAreaView>
  );
};

export default CartStore;
