import React from 'react';
// import * as RNPlaceholder from 'rn-placeholder';
import {BaseStyle, useTheme} from '@/config';
import Progressive from './Progressive';
import {ActivityIndicator} from 'react-native-paper';
import {View} from 'react-native';

export const PlaceholderLine = ({style, ...attrs}) => {
  const {colors} = useTheme();
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      <ActivityIndicator
        {...attrs}
        style={[style, {}]}
        color={colors.primary}
      />
    </View>
  );
};

export const Placeholder = ({...attrs}) => {
  const {colors} = useTheme();
  return (
    <View
      {...attrs}
      style={{
        flex: 1,
        backgroundColor: colors.card,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      //Animation={props => <Progressive {...props} duration={1500} />}
    />
  );
};
