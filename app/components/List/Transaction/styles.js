import {StyleSheet} from 'react-native';
import * as Utils from '@/utils';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    // alignItems: 'start',
    // height: Utils.scaleWithPixel(65),
    padding:7,
    marginBottom:15
  },
  image: {
    height: Utils.scaleWithPixel(48),
    width: Utils.scaleWithPixel(48),
    borderRadius: Utils.scaleWithPixel(48) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'right',
  },
});
