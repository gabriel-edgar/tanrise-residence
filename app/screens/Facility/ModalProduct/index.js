import {
  Button,
  ProductColorPicker,
  ProductList,
  ProductSize,
  FormCounterSelect,
  // Text,
  CheckBox,
  ProfileGridSmall,
  Image,
} from '@components';
import {useWindowDimensions} from 'react-native';
import {useTheme, Images} from '@config';
import {EFilterColors, EFilterSizes, FRecentTransactions} from '@data';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LabelUpper2Row from '@components/Label/Upper2Row';
import {useNavigation} from '@react-navigation/native';
import RenderHtml from 'react-native-render-html';

const ModalProduct = props => {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {width} = useWindowDimensions();

  const cardColor = colors.card;
  const {
    onApply,
    onItems,
    item,
    colorChoosedInit,
    sizeChoosedInit,
    ...attrs
  } = props;
  console.log('item for partner detail', item.url_picture);
  const [eColors, setEcolors] = useState(EFilterColors);
  const [eSizes, setESizes] = useState(EFilterSizes);
  const [colorChoosed, setColorChoosed] = useState(colorChoosedInit);
  const [sizeChoosed, setSizeChoosed] = useState(sizeChoosedInit);
  const [total, setTotal] = useState(0);
  const countries = ['Lot-01', 'Lot-02'];
  const ballboy = ['riki', 'doni'];
  const [isSelected, setSelection] = useState(false);
  const goToScreen = name => name && navigation.navigate(name);

  // useEffect(() => {
  //   setColorChoosed(colorChoosedInit);
  // }, [colorChoosedInit]);

  // useEffect(() => {
  //   setSizeChoosed(sizeChoosedInit);
  // }, [sizeChoosedInit]);

  // useEffect(() => {
  //   setTotal(item.price);
  // }, [item]);

  const {staff_first_name} = item;
  const image = {uri: item.url_picture};

  return (
    <View>
      {/* // <ScrollView style={{backgroundColor: cardColor}}> */}
      <Modal style={styles.bottomModal} {...attrs}>
        <ScrollView style={{width: '100%', backgroundColor: cardColor}}>
          <View
            style={[
              styles.contentFilterBottom,
              {backgroundColor: cardColor, width: '100%'},
            ]}>
            {/* <View style={{paddingVertical: 20}}>
          <Text>Choose Partners</Text>
        </View>
        <View
          // key={index}
          style={{
            // flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ProfileGridSmall
            image={image}
            name={item.staff_first_name}
            desc={item.resume}
            onPress={() => goToScreen('FSendMoney')}
          />
        </View> */}
            {/* <View style={{flexDirection: 'row', marginBottom: 10}}>
          {item.map((items, index) => (
            <View
              key={index}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ProfileGridSmall
                image={items.url_picture}
                name={items.staff_first_name}
                desc={items.resume}
                onPress={() => goToScreen('FSendMoney')}
              />
            </View>
          ))}
        </View> */}
            <View style={{paddingVertical: 20}}>
              <Text style={{fontSize: 16}}>Detail Partners</Text>
            </View>

            <View key={item.rowID}>
              <Image
                source={{uri: item.url_picture}}
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 50,
                  alignSelf: 'center',
                }}
              />

              <Text
                style={{alignSelf: 'center', fontSize: 20, fontWeight: 'bold'}}>
                {item.staff_first_name} {item.staff_last_name}
              </Text>
              <Text
                style={{alignSelf: 'center', fontSize: 14, fontWeight: 'bold'}}>
                {item.sex}
              </Text>
              <Text
                style={{alignSelf: 'center', fontSize: 16, fontWeight: 'bold'}}>
                {item.position}
                {/* {item.ballboy == 1
                ? 'Ballboy'
                : null || item.coach == 1
                ? 'Coach'
                : null || item.hittingpartner == 1
                ? 'Hitting Partner'
                : null} */}
              </Text>
            </View>
            <View style={{justifyContent: 'center', alignSelf: 'center'}}>
              <Button
                style={{
                  marginTop: 10,
                  marginBottom: 20,
                  width: 100,
                  height: 50,
                }}
                onPress={onApply}
                // onItems={item}
              >
                {t('Back')}
              </Button>
            </View>

            {/* <RenderHtml source={{html: item.resume}} contentWidth={width} /> */}
            <View
              style={{
                marginTop: 30,
                backgroundColor: '#fff',
                padding: 20,
                borderRadius: 10,
              }}>
              {item.resume ? (
                // <Text>{item.resume}</Text>
                <RenderHtml source={{html: item.resume}} contentWidth={width} />
              ) : (
                <Text>{item.resume}</Text>
              )}

              {/* kalo dipakein  .replace, error. error undefined item.resume */}
            </View>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

ModalProduct.defaultProps = {
  onApply: () => {},
  // onItems: () => {},
};

ModalProduct.propTypes = {
  onApply: PropTypes.func,
  // onItems: PropTypes.func,
};

export default ModalProduct;
