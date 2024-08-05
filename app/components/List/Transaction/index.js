import Text from '@components/Text';
import Icon from '@components/Icon';
import {useTheme, BaseColor} from '@config';
import PropTypes from 'prop-types';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import styles from './styles';
import numFormat from '../../numFormat';

const ListTransaction = ({
  style = {},
  icon = '',
  name = '',
  doc_no = '',
  descs = '',
  mbal_amt = '',
  trx_type = '',
  due_date = '',
  doc_date = '',
  tower = '',
  date = '',
  status = '',
  price = '',
  lot_no = '',
  debtor_acct = '',
  onPress = () => {},
}) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      {/* <View style={[styles.image, {backgroundColor: colors.primaryLight}]}>
        <Icon name={icon} size={24} solid color={BaseColor.whiteColor} />
      </View> */}
      <View style={{paddingLeft: 8, flex: 1}}>
        <Text subhead>{tower}</Text>
        <Text footnote style={{marginTop: 5}}>
          {name} - {debtor_acct}
        </Text>
      </View>
      <View style={{flex: 1}}>
        <Text subhead style={styles.text}>
          {lot_no} - {doc_no}
        </Text>
        <Text footnote light style={[styles.text, {marginTop: 5}]}>
          {due_date}
        </Text>
        <Text
          bold
          footnote
          light
          grayColor
          numberOfLines={1}
          style={styles.text}>
          {descs}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

ListTransaction.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.string,
  name: PropTypes.string,
  descs: PropTypes.string,
  mbal_amt: PropTypes.string,
  due_date: PropTypes.string,
  doc_no: PropTypes.string,
  price: PropTypes.string,
  lot_no: PropTypes.string,
  onPress: PropTypes.func,
};

export default ListTransaction;
