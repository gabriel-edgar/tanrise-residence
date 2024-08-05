import {Icon, Image, Text} from '@components';
import {Images} from '@config';
import PropTypes from 'prop-types';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {BaseColor} from '@config';

const Transaction2Col = ({
  style = {},
  backgroundIcon = 'red',
  icon = '',
  name = '',
  due_date = '',
  doc_no = '',
  status = '',
  mbal_amt = '',
  descs = '',
  isUp = true,
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      {/* <View style={[styles.image, {backgroundColor: backgroundIcon}]}>
        <Icon name={icon} size={20} color={BaseColor.whiteColor} solid />
      </View> */}
      <View style={{paddingLeft: 8, flex: 1}}>
        <Text subhead light>
          {descs}
        </Text>
        <Text subhead light style={{marginTop: 5}}>
          {due_date}
        </Text>
      </View>
      <View>
        <Text
          headline
          darkPrimaryColor={isUp}
          accentColor={!isUp}
          style={styles.text}>
          {mbal_amt}
        </Text>
        <Text subhead light style={[styles.text, {marginTop: 5}]}>
          {status}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

Transaction2Col.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.string,
  name: PropTypes.string,
  mbal_amt: PropTypes.string,
  due_date: PropTypes.string,
  status: PropTypes.string,
  price: PropTypes.string,
  onPress: PropTypes.func,
  isUp: PropTypes.bool,
  backgroundIcon: PropTypes.string,
};

export default Transaction2Col;
