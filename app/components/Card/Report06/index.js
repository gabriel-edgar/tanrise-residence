import Icon from '@components/Icon';
import Text from '@components/Text';
import {useTheme, BaseColor} from '@config';
import PropTypes from 'prop-types';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {parseHexTransparency} from '@utils';

const CardReport06 = ({
  title = '',
  price = '',
  icon = '',
  style = {},
  percent = '',
  onPress = () => {},
}) => {
  const {colors} = useTheme();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View
        style={[
          styles.content,
          {
            backgroundColor: colors.primaryLight,
            borderColor: colors.border,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          },
          style,
        ]}>
        <View style={[styles.header]}>
          <View
            style={[
              styles.viewIcon,
              {
                backgroundColor: parseHexTransparency(BaseColor.whiteColor, 30),
              },
            ]}>
            {/* <Icon
              name={icon}
              size={12}
              style={{color: BaseColor.whiteColor}}
              solid
            /> */}
            <Text headline whiteColor style={{fontSize: 18}}>
              {price}
            </Text>
          </View>
        </View>
        <Text subhead whiteColor style={{marginTop: 10}}>
          {title}
        </Text>
        <Text headline whiteColor style={{marginTop: 10}}>
          {percent}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

CardReport06.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
  price: PropTypes.string,
  icon: PropTypes.string,
  percent: PropTypes.string,
};

export default CardReport06;
