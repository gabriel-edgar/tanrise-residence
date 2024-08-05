import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';
import * as Utils from '@utils';

export default StyleSheet.create({
  inputItem: {
    flex: 6.5,
    paddingLeft: 10,
  },
  checkbox: {
    alignSelf: 'center',
    width: 20,
    height: 20,
  },
  label: {
    margin: 8,
  },
  Dropdown1: {
    // fontFamily: Fonts.type.sfuiDisplaySemibold,
    borderBottomWidth: 0,
    borderColor: '#DDD',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 18,
    width: 250,
    marginBottom: 10,
    marginLeft: 10,
    borderRadius: 5,
    textAlignVertical: 'top',
    color: '#777777',
    // paddingLeft: Fonts.moderateScale(10),
  },
  contain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageBackgroundCard1: {
    width: Utils.scaleWithPixel(80),
    height: Utils.scaleWithPixel(80),
  },
  containLoading: {
    flexDirection: 'row',
  },
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
  },
});
