import React, {useState, useEffect} from 'react';
import {View, Dimensions, Animated, Image} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';

// const {width} = Dimensions.get('window');

const PinchZoom = () => {
  return (
    <ImageZoom
      cropWidth={Dimensions.get('window').width}
      cropHeight={Dimensions.get('window').height}
      imageWidth={200}
      imageHeight={200}>
      <Image
        style={{width: 200, height: 200}}
        source={{
          uri: 'https://miro.medium.com/max/1080/1*7SYuZvH2pZnM0H79V4ttPg.jpeg',
        }}
      />
    </ImageZoom>
  );
};

export default PinchZoom;
