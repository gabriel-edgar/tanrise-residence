import {
  FilterESort,
  ProductBlock,
  ProductGrid2,
  SafeAreaView,
  Tag,
  Header,
  Icon,
  Text,
  Button,
  FormCounterSelect,
} from '@components';
import ProductList from './List';
import numFormat from '../../components/numFormat';
import {BaseColor, BaseStyle, useTheme} from '@config';
// Load sample data
import {EPostListData, ESortOption} from '@data';
import {useNavigation} from '@react-navigation/native';
import * as Utils from '@utils';
import React, {Fragment, useEffect, useRef, useState, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {addItemToCart, updateCartItem} from '../../actions/cartActions';
import {
  Dimensions,
  FlatList,
  RefreshControl,
  View,
  TextInput,
  ScrollView,
  Pressable,
} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import styles from './styles';
import getProject from '../../selectors/ProjectSelector';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {ActivityIndicator} from 'react-native-paper';

import Modal from 'react-native-modal';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CheckBox, Badge} from 'react-native-elements';

import AsyncStorage from '@react-native-async-storage/async-storage';

import getCartData from '../../selectors/cartSelectors';
import {data_cart} from '../../actions/cartActions';

let timeoutChangeMode = null;

const initialLayout = {width: Dimensions.get('window').width};

const Product = params => {
  //   console.log('routes di product', params.params);
  const [dataMember, setDataMember] = useState(params.params);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {colors} = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [modeView, setModeView] = useState('list');
  const [list, setList] = useState(EPostListData);
  const [loading, setLoading] = useState(true);
  const [spinner, setSpinner] = useState(true);

  const [dataItemStore, setItemStore] = useState([]);
  const [dataItemStoreFilter, setItemStoreFilter] = useState([]);
  const projectSelector = useSelector(state => getProject(state));
  //   console.log('project selector di product', projectSelector);

  const [modalVisible, setModalVisible] = useState(false);

  const [dataBuy, setDataBuy] = useState([]);
  const [total, setTotal] = useState(0);
  const [qty, setQty] = useState(0);

  const [showAddQuantity, setShowAddQuantity] = useState(false);
  const [showButtonToCart, setButtonToCart] = useState(false);

  const [ArrayDataBuy, setArrayDataBuy] = useState([]);

  const [disableAddToCart, setDisableAddToCart] = useState(false);

  const cartSelector = useSelector(state => getCartData(state));
  console.log('cart selector item store', cartSelector.length);
  //   const {navigation, route} = props;

  const getItemStore = () => {
    const entity_cd = projectSelector.Data[0].entity_cd;
    console.log('entity', entity_cd);
    const project_no = projectSelector.Data[0].project_no;
    console.log(
      'url menu store di product',
      `http://apps.pakubuwono-residence.com/apiwebpbi/api/pos/getProducts?entity_cd=${entity_cd}&project_no=${project_no}&trx_class=H`,
    );
    axios
      .get(
        `http://apps.pakubuwono-residence.com/apiwebpbi/api/pos/getProducts?entity_cd=${entity_cd}&project_no=${project_no}&trx_class=H`,
      )
      .then(res => {
        console.log(res.data.Error);
        if (res.data.Error == false) {
          const datas = res.data;
          const arrLocation = datas.Data;

          //   console.log('bank arrLocationsdsa', arrLocation);

          setItemStoreFilter(arrLocation);
          setSpinner(false);
        } else {
          setSpinner(false);
        }

        setItemStore(res.data.Data);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      getItemStore();
      searchFilterFunction();
      // setItemCart();
    }, 1000);
  }, [cartSelector]);

  const goProductDetail = item => {
    navigation.navigate('EProductDetailStore', {item: item});
  };

  const goStore = item => {
    navigation.goBack();
  };

  const searchFilterFunction = text => {
    console.log('text', text);
    // console.log('arrayholder', arrayholder);
    const newData = dataItemStore.filter(item => {
      const itemData = `${item.descs.toUpperCase()}`;
      //   console.log('itemdata', itemData);
      const textData = text;
      return itemData.indexOf(textData) > -1;
    });
    console.log('new data', newData);
    setItemStoreFilter(newData);
  };

  const pressBuy = async (item, index) => {
    //get trx_code by product ID
    const entity_cd = projectSelector.Data[0].entity_cd;
    console.log('entity', entity_cd);
    const project_no = projectSelector.Data[0].project_no;
    const trx_code = item.trx_code;
    console.log('item yang akan diambil', item);
    console.log(
      'get trx_code by product ID',
      `http://apps.pakubuwono-residence.com/apiwebpbi/api/pos/productID?entity_cd=${entity_cd}&project_no=${project_no}&trx_class=H&trx_code=${trx_code}`,
    );
    axios
      .get(
        `http://apps.pakubuwono-residence.com/apiwebpbi/api/pos/productID?entity_cd=${entity_cd}&project_no=${project_no}&trx_class=H&trx_code=${trx_code}`,
      )
      .then(res => {
        console.log(res.data.Error);
        if (res.data.Error == false) {
          const datas = res.data.Data[0];

          console.log('get trx_code by product ID', datas);
          const dataBuyNow = {
            //   totalHarga: total,
            //   quantity: qty,

            // ---- pengganti ...item
            trx_code: item.trx_code,
            trx_descs: item.descs,
            unit_price: item.default_price,
            currency_cd: datas.currency_cd,
            currency_rate: datas.currency_cd,
            discountTotal: 0,
            discountPercent: 0,
            // ---- pengganti ...item

            tax_rate: datas.tax_rate,
            // ...item,
            ...dataMember,
            indexToCart: index,
          };

          const arrayCart = [...ArrayDataBuy, dataBuyNow];
          console.log('array', arrayCart);

          setArrayDataBuy(arrayCart);
          dispatch(data_cart(arrayCart));
          setButtonToCart(true);

          setDisableAddToCart(true);
          setSpinner(false);
          // tesfunction();
          // setItemCart();
        } else {
          setSpinner(false);
        }
      });

    console.log('cek quantity', qty);
  };

  const tesfunction = () => {
    console.log('array databuy tes', ArrayDataBuy);
  };

  // const setItemCart = useCallback(
  //   () => dispatch(data_cart(ArrayDataBuy)),
  //   [ArrayDataBuy, dispatch],
  // );

  const setItemCart = () => {
    console.log('set item cart tes', ArrayDataBuy);
  };

  const toCheckout = async () => {
    navigation.navigate('CartStore', {itemsforCheckout: cartSelector});
    //  navigation.navigate('EProductDetailStore', {item: item});
    // try {
    //   const jsonValue = JSON.stringify({ArrayDataBuy});
    //   console.log('json', jsonValue);
    //   const json = await AsyncStorage.setItem('@Value', jsonValue);
    //   console.log('jsonnnnn', json);
    // } catch (e) {
    //   // saving error
    //   console.log(e);
    // }

    // console.log('cek index array', ArrayDataBuy[0]);
    // console.log('to checkout', ArrayDataBuy);
  };

  const removebyIndex = (item, index) => {
    console.log('index remove', index);
    // const remainingArr = ArrayDataBuy.splice(index, 1);
    // setArrayDataBuy(remainingArr);
    // setItemCart();

    const dataSplice = ArrayDataBuy;

    // dataSplice.splice(0, 1);
    const indexOfObject = dataSplice.findIndex(object => {
      return object.trx_code === item.trx_code;
    });

    console.log(indexOfObject); // 👉️ 1

    dataSplice.splice(indexOfObject, 1);

    // console.log(arr); // 👉️ [{id: 1}, {id: 5}]
    console.log('remaining', dataSplice);
    setArrayDataBuy(dataSplice);
    dispatch(data_cart(dataSplice));
    // console.log('remaining', remainingArr);
  };

  const renderItem = ({item, index}) => {
    return (
      <View key={index}>
        <ProductList
          loading={loading}
          // description={item.descs}
          title={item.descs}
          style={{marginVertical: 8}}
          // image={item.picture}
          image={require('@assets/images/logo.png')}
          // costPrice={item.default_price}
          salePrice={item.default_price}
          //   pressBuy={() => pressBuy(item)}
          //   quantity={qty}
          // onPress={() => goProductDetail(item)}
          // isFavorite={item.isFavorite}
          // salePercent={'30%'}
        />
        {/* gimana caranya trx code di array redux per index == trx code dari item ? */}
        <View style={{alignItems: 'flex-end'}} key={index}>
          {cartSelector[index] ? (
            <TouchableOpacity
              key={index}
              onPress={() => removebyIndex(item, index)}
              // disabled={true}
              style={{
                backgroundColor: Utils.parseHexTransparency(colors.primary, 30),

                padding: 15,
                width: 150,
                borderRadius: 10,

                alignItems: 'center',
              }}>
              {/* <Button></Button></Button> */}
              {/* <Text style={{color: colors.primary}}>Already in the cart</Text>
               */}
              <Text>remove</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              key={index}
              onPress={() => pressBuy(item, index)}
              style={{
                backgroundColor: colors.primary,

                padding: 15,
                width: 150,
                borderRadius: 10,

                alignItems: 'center',
              }}>
              <Text style={{color: BaseColor.whiteColor}}>Add to cart</Text>
            </TouchableOpacity>
          )}
        </View>
        <Text>{item.indexToCart}</Text>

        {/* <View>
          <FormCounterSelect
            isRow={true}
            label={''}
            detail={''}
            style={{
              marginTop: 8,
              backgroundColor: 'transparent',
              padding: 0,
              justifyContent: 'center',
              flex: 0,
            }}
            onChange={value =>
              changeQty(value, item.default_price, item, index)
            }
          />
        </View> */}
      </View>
    );
  };

  const renderList = () => {
    return spinner ? (
      <ActivityIndicator color={colors.primary} />
    ) : (
      <View style={{flex: 1}}>
        <View
          style={{
            alignItems: 'flex-end',
            marginHorizontal: 10,
            marginBottom: 10,
          }}>
          <Button
            onPress={() => toCheckout()}
            style={{
              //   marginTop: 10,
              //   marginBottom: 20,
              //   width: 70,
              padding: 5,
              // flex: 1,
              // bottom: 0,
            }}>
            {/* {t('Cart')} */}
            <Icon
              solid
              name="cart-plus"
              size={20}
              color={BaseColor.whiteColor}
            />
            <Badge
              // value={ArrayDataBuy.length}
              value={cartSelector.length}
              status="success"
              containerStyle={{position: 'absolute', top: 10, left: 40}}
            />
          </Button>
        </View>

        <TextInput
          placeholder="Search"
          style={{
            color: '#555',
            fontSize: 14,
            borderColor: '#000',
            borderWidth: 0.5,
            borderRadius: 10,
            marginHorizontal: 20,
          }}
          // onChangeText={this.handleSearch}
          onChangeText={text => searchFilterFunction(text.toUpperCase())}
          autoCorrect={false}
        />

        <FlatList
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={() => {}}
            />
          }
          scrollEventThrottle={1}
          data={dataItemStoreFilter}
          key={1}
          numColumns={1}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
    );
  };

  const changeQty = (value, default_price, item, index) => {
    console.log('value qty', value);
    console.log('index ? ', index);
    setQty(value);
    setTotal(value * default_price);

    // console.log('databut default price', default_price);
    // console.log('set total harga', value * default_price);

    //   console.log('item change add', item);

    // updateDataQty(item, index);

    const dataBuyNow = {
      totalHarga: value * default_price,
      quantity: value,
      ...item,
      ...dataMember,
    };

    const array = [...ArrayDataBuy, dataBuyNow];
    console.log('array di change qty', array);

    setArrayDataBuy(array);
    toCheckout(index);

    // const arrayTower = ArrayDataBuy;
  };

  //   const tes = () => {
  //     const qty__ = ArrayDataBuy;
  //     console.log('qtyyy', qty__);
  //   };

  const buyNow = () => {
    // setModalVisible(false); // harus di nyalain kalo mau abis klik buy now modal hilang

    const dataBuyNow = {
      totalHarga: total,
      quantity: qty,
      data_buy: dataBuy,
    };
    console.log('data buynow', dataBuyNow);
    // navigation.navigate('CartStore', {itemsdataBuyNow: dataBuyNow}); // ini tidak ngambil dari params route, ini pasti ada data yang udah di set
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Fragment>{renderList()}</Fragment>

        {/* <Modal
          isVisible={modalVisible}
          animationType={'slide'}
          swipeDirection={['down']}
          style={styles.bottomModal}
          onSwipeComplete={() => setModalVisible(!modalVisible)}
          onBackdropPress={() => setModalVisible(!modalVisible)}>
          <View
            style={[
              styles.contentFilterBottom,
              {backgroundColor: colors.card},
            ]}>
            <View style={styles.contentSwipeDown}>
              <View style={styles.lineSwipeDown} />
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginBottom: 8,
                marginTop: 20,
                justifyContent: 'space-between',
              }}>
              <View>
                <Text body1>{t('quantity').toUpperCase()}</Text>
                <FormCounterSelect
                  isRow={true}
                  label={''}
                  detail={''}
                  style={{
                    marginTop: 8,
                    backgroundColor: 'transparent',
                    padding: 0,
                    justifyContent: 'center',
                    flex: 0,
                  }}
                  onChange={value => changeQty(value)}
                />
              </View>
              <View>
                <Text body1 style={{textAlign: 'right'}}>
                  {t('total').toUpperCase()}
                </Text>
                <Text title3 style={{textAlign: 'right', marginTop: 12}}>
                  {`${numFormat(`${total}`)}`}
                </Text>
              </View>
            </View>

            <Button
              full
              style={{marginTop: 10, marginBottom: 20}}
              onPress={() => buyNow()}>
              {t('Add To Cart')}
            </Button>
          </View>
        </Modal>
       */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default function ItemStore({route}) {
  const {colors} = useTheme();
  console.log('routeee', route);
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'all', title: 'All'},
    // {key: 'feedback', title: 'Feedback'},
  ]);
  console.log('rputes', routes);
  const renderScene = SceneMap({
    all: Product,
    // feedback: Product,
  });
  const renderTabBar = props => (
    <TabBar
      {...props}
      renderIndicator={() => null}
      scrollEnabled
      style={[styles.tabbar, {backgroundColor: colors.background}]}
      tabStyle={styles.tab}
      activeColor={BaseColor.whiteColor}
      inactiveColor={colors.text}
      renderLabel={({route, focused, color}) => (
        <Tag
          primary={true}
          style={{
            backgroundColor: focused ? colors.primary : colors.background,
          }}
          textStyle={{
            color: color,
          }}>
          {route.title}
        </Tag>
      )}
    />
  );

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'top', 'left']}>
      <Header
        title={'Items Store'}
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
      <Product params={route.params} />

      {/* Kalo mau pake tab dibuka aja ini, tapi harus ada kondisi id / kode buat filter tab nya */}
      {/* <TabView
        scrollEnabled={true}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
      /> */}
    </SafeAreaView>
  );
}
