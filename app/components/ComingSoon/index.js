import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {BaseStyle, useTheme} from '@config';
import {useTranslation} from 'react-i18next';
import Text from '@components/Text';
import Icon from '@components/Icon';
import {parseHexTransparency} from '@utils';
import LottieView from 'lottie-react-native';

const ComingSoon = () => {
  const {t} = useTranslation();
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <View>
        {/* <Icon
          name={'exclamation-triangle'}
          style={{
            fontSize: 32,
            color: parseHexTransparency(colors.text, 30),
          }}
        /> */}
        <LottieView
          source={require('@data/notfound.json')}
          autoPlay
          style={{width: 300, height: 300}}
        />
      </View>
      <Text
        headline
        bold
        style={{
          color: parseHexTransparency(colors.text, 50),
        }}>
        Coming Soon
      </Text>
    </View>
  );
};

export default ComingSoon;
