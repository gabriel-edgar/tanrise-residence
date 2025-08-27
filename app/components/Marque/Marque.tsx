import React, { useRef, useEffect } from 'react';
import { Animated, Text, View, Dimensions, Easing } from 'react-native';

const { width } = Dimensions.get('window');

export default function Marquee({ text }: { text: string }) {
  const animatedValue = useRef(new Animated.Value(width)).current;

  useEffect(() => {
    const startScrolling = () => {
      animatedValue.setValue(width); // Reset to right before starting

      Animated.timing(animatedValue, {
        toValue: -width, // Scroll all the way left
        duration: 8000,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start(() => {
        // After finishing, restart from right
        startScrolling();
      });
    };

    startScrolling();
  }, []);

  return (
    <View style={{ overflow: 'hidden', width, marginTop:10 }}>
      <Animated.Text
        style={{
          transform: [{ translateX: animatedValue }],
          fontSize: 16,
          color: 'black',
        }}
      >
        {text}
      </Animated.Text>
    </View>
  );
}
