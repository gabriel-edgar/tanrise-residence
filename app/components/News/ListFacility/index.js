import Image from '@components/Image';
import Text from '@components/Text';
import {Images} from '@config';
import PropTypes from 'prop-types';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import styles from './styles';
import Loading from './Loading';

const ListFacility = props => {
  const {style, onPress, facility_name, image, title, subtitle, date, loading} =
    props;
  if (loading) {
    return <Loading style={style} />;
  }
  return (
    <TouchableOpacity
      style={[styles.contain, style]}
      onPress={onPress}
      activeOpacity={0.9}>
      <Image source={image} style={styles.image} />
      <View
        style={{
          paddingHorizontal: 10,
          flex: 1,
          paddingVertical: 5,
        }}>
        <Text light footnote semibold grayColor>
          {facility_name}
        </Text>
        <Text
          headline
          semibold
          numberOfLines={2}
          style={styles.marginVertical5}>
          {facility_name}
        </Text>
        <Text caption1 light grayColor>
          {date}
        </Text>
        <View style={styles.contentRate} />
      </View>
    </TouchableOpacity>
  );
};

ListFacility.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  onPress: PropTypes.func,
  title: PropTypes.string,
  facility_name: PropTypes.string,
  date: PropTypes.string,
};

ListFacility.defaultProps = {
  style: {},
  onPress: () => {},
  image: Images.news,
  title: '',
  facility_name: '',
  date: '',
};

export default ListFacility;
