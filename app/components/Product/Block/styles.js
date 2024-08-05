import * as Utils from '@utils';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  imageBackground: {
    height: ((Utils.getWidthDevice() - 30) * 9) / 15,
    width: '100%',
    position: 'relative',
  },
  salePercent: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingBottom: 2,
  },
  thumb: {
    width: 45,
    height: 45,
    borderRadius: 30,
    marginRight: 10,
  },
  avatar: {
    height: 46,
    width: 46,
    borderRadius: 50,
    borderWidth: 2,
  },
  costPrice: {paddingHorizontal: 8, textDecorationLine: 'line-through'},
  content: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
  },
  left: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  contentRight: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  viewIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});
