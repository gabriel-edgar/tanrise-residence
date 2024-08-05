import Button from '@components/Button';
import Icon from '@components/Icon';
import Image from '@components/Image';
import Text from '@components/Text';
import TextInput from '@components/TextInput';
import {useTheme, BaseStyle, BaseColor} from '@config';
import PropTypes from 'prop-types';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView} from 'react-native';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';

const ModalFilterLocation = props => {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const cardColor = colors.card;
  const {options, onApply, onSelectFilter, textSearch, onChangeText, ...attrs} =
    props;

  // clg;

  return (
    <Modal swipeDirection={['down']} style={styles.bottomModal} {...attrs}>
      <ScrollView>
        <View
          style={[styles.contentFilterBottom, {backgroundColor: cardColor}]}>
          <View style={styles.contentSwipeDown}>
            <View style={styles.lineSwipeDown} />
          </View>
          <TextInput
            style={BaseStyle.textInput}
            onChangeText={onChangeText}
            autoCorrect={false}
            placeholder={t('enter_keywords')}
            placeholderTextColor={BaseColor.grayColor}
            value={textSearch}
            selectionColor={colors.primary}
            onSubmitEditing={() => {
              navigation.goBack();
            }}
          />
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
              key={item.location_cd}
              onPress={() => onSelectFilter(item)}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {/* {item.image && <Image source={item.image} style={styles.image} />} */}
                <Text body2 semibold primaryColor={item.checked}>
                  {t(item.descs)}
                </Text>
              </View>
              {item.checked && (
                <Icon name="check" size={14} color={colors.primary} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <Button full style={{marginTop: 10, marginBottom: 20}} onPress={onApply}>
        {t('apply')}
      </Button>
    </Modal>
  );
};

ModalFilterLocation.defaultProps = {
  options: [],
  onApply: () => {},
  onSelectFilter: () => {},
};

ModalFilterLocation.propTypes = {
  options: PropTypes.array,
  onApply: PropTypes.func,
  onSelectFilter: PropTypes.func,
};

export default ModalFilterLocation;
