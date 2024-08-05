import React, {useEffect, useState, useRef} from 'react';
import {Text, View, StyleSheet, Animated, Button} from 'react-native';
import {BaseStyle, useTheme} from '@config';

export const LoadingCount = () => {
  const counter = useRef(new Animated.Value(0)).current;
  //   console.log('counter loading', counter);
  const countInterval = useRef(null);
  const [count, setCount] = useState(0);
  //   console.log('count', count);
  useEffect(() => {
    countInterval.current = setInterval(() => setCount(old => old + 5), 1000);
    return () => {
      clearInterval(countInterval);
    };
  }, []);

  useEffect(() => {
    load(count);
    if (count >= 100) {
      setCount(100);
      clearInterval(countInterval);
    }
  }, [count]);

  const load = count => {
    Animated.timing(counter, {
      toValue: count,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const widthCounter = counter.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    //   outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Text>Loading....</Text>
      <View style={styles.progressBar}>
        {/* <Animated.View
          //   style={{
          //     backgroundColor: '#8BED4F',
          //     widthCounter,
          //           }}
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: '#8BED4F',
              widthCounter,
            },
          ]}></Animated.View> */}
      </View>

      <Text>{count}%</Text>
      {/* <Text>{widthCounter}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  progressBar: {
    height: 20,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 5,
  },
});
