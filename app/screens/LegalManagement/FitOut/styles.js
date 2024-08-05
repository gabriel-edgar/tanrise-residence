import {StyleSheet, Dimensions, PixelRatio} from 'react-native';
import {BaseColor, useTheme} from '@config';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const colors = useTheme;

export default StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    padding: 10,
    width: '100%',
  },
  contain: {
    flex: 1,
  },
  item: {
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  subWrap: {
    marginVertical: 20,
  },
  subWrap2: {
    marginVertical: 10,
  },
  wrap: {
    marginHorizontal: 10,
    marginTop: 16,
    flex: 1,
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 20,
    paddingTop: 20,
  },
  textArea: {
    borderRadius: 5,
    backgroundColor: '#F6F6F6',
  },
  pickerWrap: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E2DFE4',
    backgroundColor: '#F6F6F6',
  },
  sel: {
    width: deviceWidth - 100,
    marginVertical: 10,
    paddingVertical: 10,
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: null,
  },
  pickerWrap: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E2DFE4',
    backgroundColor: '#F6F6F6',
  },
  avatar: {
    width: deviceWidth - 100,
    height: 200,
    borderRadius: 5,
  },
  avatarContainer: {
    width: deviceWidth - 100,
    marginVertical: 10,
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 200,
  },
  iconRemove: {
    // backgroundColor: '#EE6B60',
    backgroundColor: '#fff',
    // color: '#ff1744',
    position: 'absolute',
    borderRadius: 50,
    padding: 5,
    right: 0,
    top: 0,
  },
  img: {
    borderRadius: 10,
    height: 50,
    width: 50,
    marginTop: 10,
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    height: deviceHeight / 2,
    width: deviceWidth,
    // justifyContent : 'center',
    alignItems: 'center',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: deviceWidth,
    paddingHorizontal: 25,
    paddingTop: 22,
  },
  textModal: {
    fontSize: 18,
    color: '#333',
  },
  iconModal: {
    fontSize: 25,
    color: '#333',
  },
  modalBody: {
    justifyContent: 'center',
    height: deviceHeight - deviceHeight / 1.5,
    width: deviceWidth,
    paddingHorizontal: 25,
    paddingTop: 22,
  },
  modalBodyTitle: {
    paddingVertical: 15,
    textAlign: 'center',
  },
  starWrap: {
    paddingBottom: 40,
    paddingHorizontal: 10,
  },
  btnWrapModal: {
    marginHorizontal: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnNo: {
    width: 100,
    borderRadius: 5,
    backgroundColor: '#F99B23',
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  textNo: {
    color: '#fff',
    textAlign: 'center',
  },
  btnYes: {
    width: 100,
    borderWidth: 1,
    borderColor: '#F9A233',
    borderRadius: 5,
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  textYes: {
    color: '#F9A233',
    textAlign: 'center',
  },
  activeTabStyle: {backgroundColor: BaseColor.hijau_pkbw},
  activeTabTextStyle: {
    color: '#000',
    fontFamily: 'Montserrat-SemiBold',
  },
  tabStyle: {
    borderColor: BaseColor.hijau_pkbw,
    backgroundColor: '#F6F9FC',
    paddingVertical: 10,
  },
  tabTextStyle: {
    color: BaseColor.hijau_pkbw,
    fontFamily: 'Montserrat-SemiBold',
  },
});
