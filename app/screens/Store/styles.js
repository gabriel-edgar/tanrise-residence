import {StyleSheet} from 'react-native';
import * as Utils from '@utils';
import {BaseColor} from '@config';

export default StyleSheet.create({
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  contentPicker: {
    padding: 10,
    // borderRadius: 8,
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentFilterBottom: {
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingHorizontal: 20,
  },
  contentSwipeDown: {
    paddingTop: 10,
    alignItems: 'center',
  },
  lineSwipeDown: {
    width: 30,
    height: 2.5,
    backgroundColor: BaseColor.dividerColor,
  },
  paddingSrollView: {padding: 20},
  paddingFlatList: {
    paddingTop: 24,
  },
  topicsView: {
    marginVertical: 24,
  },
  title: {marginBottom: 5},
  imageBackgroundGrid2: {
    width: 85,
    // height: Utils.scaleWithPixel(165),
    height: 85,
    // aspectRatio: 1.0,
    // resizeMode: 'contain',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  viewCart: {
    width: Utils.scaleWithPixel(80),
    height: Utils.scaleWithPixel(80),
    borderRadius: Utils.scaleWithPixel(80 / 2),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  navbar: {
    backgroundColor: BaseColor.whiteColor,
    height: 40,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },

  followLocationIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BaseColor.whiteColor,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabbar: {
    backgroundColor: BaseColor.whiteColor,
    shadowOffset: {height: 0, width: 0},
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
    padding: 0,
    paddingHorizontal: 5,
  },
  tab: {
    width: 'auto',
    padding: 4,
  },
});
