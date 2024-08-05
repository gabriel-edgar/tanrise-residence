import * as Utils from '@utils';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  contain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageBackgroundCard1: {
    width: Utils.scaleWithPixel(110),
    height: Utils.scaleWithPixel(110),
  },
  containLoading: {
    flexDirection: 'row',
  },
});
