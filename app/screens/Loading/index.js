import {Image, Text} from '@components';
import {Images, useTheme} from '@config';
import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import styles from './styles';

const Loading = props => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Image source={Images.logo} style={styles.logo} resizeMode="contain" />
        {/* <Text title1 style={{marginTop: 10}}>
          The Pakubuwono
        </Text> */}
      </View>
      <ActivityIndicator
        size="large"
        color={colors.text}
        style={{
          position: 'absolute',
          top: 260,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
      <View style={{position: 'absolute', bottom: 10}}>
        <Text
          style={{
            // top: 100,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          Copyright@PT.IFCA PROPERTY365
        </Text>
      </View>
    </View>
  );
};

export default Loading;
