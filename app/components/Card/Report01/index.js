import Icon from '@components/Icon';
import Text from '@components/Text';
import {useTheme} from '@config';
import PropTypes from 'prop-types';
import React from 'react';
import {TouchableOpacity, View, Image} from 'react-native';
import styles from './styles';
import {parseHexTransparency} from '@utils';

const CardReport01 = ({
  title = '',
  price = '',
  icon = '',
  images = '',
  subtitle = '',
  date = '',
  style = {},
  onPress = () => {},
  disabled = false,
}) => {
  const {colors} = useTheme();

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.container, style]}
      onPress={onPress}>
      <View
        style={[
          styles.content,
          {
            backgroundColor: colors.background,
            borderColor: colors.border,
          },
        ]}>
        <View style={[styles.header]}>
          <View
            style={[
              styles.viewIcon,
              {
                backgroundColor: parseHexTransparency(colors.primaryLight, 30),
              },
            ]}>
            <Image
              style={{
                height: 40,
                width: 40,
                borderRadius: 30,
              }}
              source={require('../../../assets/images/logoannounce.png')}></Image>
            {/* <Icon name={icon} size={15} style={{color: colors.primary}} solid /> */}
          </View>
          <Text headline style={{marginLeft: 5, width: '85%'}}>
            {title}
          </Text>
        </View>
        <Text subhead light style={{marginTop: 8}}>
          {subtitle}
        </Text>
        {/* <Text subhead light style={{marginTop: 8}}>
          {date}
        </Text> */}
      </View>
    </TouchableOpacity>
  );
};

CardReport01.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
  price: PropTypes.string,
  icon: PropTypes.string,
};

export default CardReport01;
