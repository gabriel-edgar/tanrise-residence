import Image from '@components/Image';
import Text from '@components/Text';
import {useTheme} from '@config';
import PropTypes from 'prop-types';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import styles from './styles';

export default function ProfileGridSmall(props) {
  const {style, image, onPress, name, desc} = props;
  const {colors} = useTheme();

  return (
    <TouchableOpacity style={[styles.contain, style]} onPress={onPress}>
      <Image
        source={image}
        style={[styles.thumb, {borderColor: colors.border}]}
      />
      <Text caption2 light>
        {name}
      </Text>
      <Text caption2 semibold>
        {desc}
      </Text>
    </TouchableOpacity>
  );
}

ProfileGridSmall.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  name: PropTypes.string,
  desc: PropTypes.string,

  onPress: PropTypes.func,
};

ProfileGridSmall.defaultProps = {
  image: '',
  name: '',
  desc: '',

  style: {},
  onPress: () => {},
};
