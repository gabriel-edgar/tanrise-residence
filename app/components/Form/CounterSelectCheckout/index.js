import Icon from '@components/Icon';
import Text from '@components/Text';
import {BaseColor, useTheme} from '@config';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import styles from './styles';

export default function CounterSelectCheckout(props) {
  // const [value, setValue] = useState(props.value);
  // const [value, setValue] = useState(0);
  // console.log('props value counter', props.value);
  const {style, onChange, valueCurrent} = props;
  const [value, setValue] =
    valueCurrent != '' ? useState(valueCurrent) : useState(0);
  // useState(props.CurrentValue);

  // const [value, setValue] = useState(CurrentValue);
  // console.log('curent value di counter', value);
  // console.log('props buat current', props);
  // console.log('CurrentValue', valueCurrent);

  const {colors} = useTheme();

  const onHandleChange = type => {
    let valueNew = 0;

    if (type == 'up') {
      valueNew = value + 1;
    } else {
      valueNew = value - 1 > 0 ? value - 1 : 0;
    }
    setValue(valueNew);
    onChange(valueNew);
  };

  return (
    <View
      style={[
        styles.contentPicker,
        {
          backgroundColor: colors.background,
          flexDirection: 'column',
        },
        style,
      ]}>
      <TouchableOpacity onPress={() => onHandleChange('up')}>
        <Icon name="plus-circle" size={24} color={colors.primary} />
      </TouchableOpacity>
      <Text title2 style={{width: 'auto', textAlign: 'center'}}>
        {value}
      </Text>
      <TouchableOpacity onPress={() => onHandleChange('down')}>
        <Icon name="minus-circle" size={24} color={BaseColor.grayColor} />
      </TouchableOpacity>
    </View>
  );
}

CounterSelectCheckout.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  label: PropTypes.string,
  detail: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func,
  // CurrentValue: PropTypes.string,
};

CounterSelectCheckout.defaultProps = {
  style: {},
  label: 'sdsa',
  detail: '>= 12 years',
  value: 0,
  // CurrentValue: '',
  onChange: () => {},
};
