import React, { useEffect, useRef, useState } from "react";
import { View, Text, Dimensions, Button } from "react-native";
import Carousel from "react-native-snap-carousel";
import { useIsFocused } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const MyCarousel = () => {
  const isFocused = useIsFocused();
  //This hook returns true when the screen is focused and false when it's not.
  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    let timer;
    if (isFocused && autoPlay) {
      timer = setInterval(() => {
        setActiveSlide((prevSlide) => (prevSlide + 1) % data.length);
        carouselRef.current.snapToNext();
      }, 3000); // Adjust interval as needed
    } else {
      if (timer) clearInterval(timer);
    }

    // Cleanup timer on unmount or when isFocused changes
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isFocused, autoPlay]);

  const data = [
    // Your carousel data here
  ];

  return (
    <View>
      <Carousel
        ref={carouselRef}
        data={data}
        renderItem={({ item }) => <Text>{item}</Text>}
        sliderWidth={width}
        itemWidth={width - 60}
        onSnapToItem={(index) => setActiveSlide(index)}
      />
      <Button title="Toggle Auto-Play" onPress={() => setAutoPlay(!autoPlay)} />
    </View>
  );
};

export default MyCarousel;
