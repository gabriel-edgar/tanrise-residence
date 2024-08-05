import Image from '@components/Image';
import Text from '@components/Text';
import {useTheme} from '@config';
import PropTypes from 'prop-types';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import styles from './styles';

export default function ProfileGridSmall(props) {
  const {style, image, onPress, name, url_picture} = props;
  const {colors} = useTheme();

  return (
    <TouchableOpacity style={[styles.contain, style]} onPress={onPress}>
      <Image
        source={url_picture}
        style={[styles.thumb, {borderColor: colors.border}]}
      />
      <Text body1>{name}</Text>
    </TouchableOpacity>
  );
}

ProfileGridSmall.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  url_picture: PropTypes.node.isRequired,
  name: PropTypes.string,
  onPress: PropTypes.func,
};

ProfileGridSmall.defaultProps = {
  url_picture: '',
  name: '',
  style: {},
  onPress: () => {},
};
