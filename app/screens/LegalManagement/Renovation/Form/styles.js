import {StyleSheet, Dimensions, PixelRatio} from 'react-native';
import {BaseColor, useTheme} from '@config';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const colors = useTheme;

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  button: {
    padding: 15,
    backgroundColor: '#f4f4f4',
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#A4A4A4',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  picker: {
    width: '100%',
  },
  iosPicker: {
    height: 200,
  },
  closeButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#315447',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  checkBoxSize: {
    transform: [{scale: 0.8}],
    marginRight: 10,
  },
  checkBoxFontSize: {
    fontSize: 12,
    marginTop: 10,
    marginRight: 50,
  },
  nextButtonContainer: {
    position: 'absolute',
    bottom: 40,
    right: 20,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#315447',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    marginRight: 10,
  },
});
