import {StyleSheet, Dimensions, PixelRatio} from 'react-native';
import {BaseColor, useTheme} from '@config';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  paddingSrollView: {padding: 20},
  paddingFlatList: {
    paddingTop: 24,
  },
  topicsView: {
    marginVertical: 24,
  },
  title: {marginBottom: 5, color: 'black'},
  specifications: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
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
});
