import Button from '@components/Button';
import Icon from '@components/Icon';
import Image from '@components/Image';
import Text from '@components/Text';
import {useTheme} from '@config';
import PropTypes from 'prop-types';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';

const SelectOptionIcon = props => {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const cardColor = colors.card;
  const {lotnoChoosed, options, onChange, ...attrs} = props;
  console.log('venuechoosed di selcted,', lotnoChoosed);

  return (
    <Modal swipeDirection={['down']} style={styles.bottomModal} {...attrs}>
      <View style={[styles.contentFilterBottom, {backgroundColor: cardColor}]}>
        <View style={styles.contentSwipeDown}>
          <View style={styles.lineSwipeDown} />
        </View>
        {options.map((item, index) => (
          <TouchableOpacity
            style={[
              styles.contentActionModalBottom,
              {
                borderBottomColor: colors.border,
                borderBottomWidth:
                  index == options.length - 1 ? 0 : StyleSheet.hairlineWidth,
              },
            ]}
            key={index}
            onPress={() => onChange(item)}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {item.iconName && (
                <Icon
                  solid
                  name={item.iconName}
                  color={item.iconColor}
                  style={styles.image}
                  size={18}
                />
              )}
              <Text body2 primaryColor={item.checked}>
                {t(item.lot_no)}
              </Text>
            </View>
            {item.lot_no == lotnoChoosed.lot_no && (
              <Icon name="check" size={14} color={colors.primary} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );
};

SelectOptionIcon.defaultProps = {
  lotnoChoosed: {},
  options: [],
  onPress: () => {},
  onChange: () => {},
};

SelectOptionIcon.propTypes = {
  lotnoChoosed: PropTypes.object,
  options: PropTypes.array,
  onPress: PropTypes.func,
};

export default SelectOptionIcon;
