import {StyleSheet, Dimensions, PixelRatio} from 'react-native';
import {BaseColor, useTheme} from '@config';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const colors = useTheme;

export default StyleSheet.create({
  buttonPermitTop: {
    marginTop: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
    alignItems: 'center',
    elevation: 5, // Efek bayangan (juga berlaku untuk Android)
  },
  buttonPermitTopIos: {
    marginTop: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
    backgroundColor: 'white',
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Efek bayangan (juga berlaku untuk Android)
  },
  buttonPermitMid: {
    marginTop: 2,
    padding: 10,
    alignItems: 'center',
  },
  buttonPermitMidIos: {
    marginTop: 2,
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    padding: 10,
    backgroundColor: 'white',
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Efek bayangan (juga berlaku untuk Android)
  },
  buttonPermitBottom: {
    marginTop: 2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  buttonPermitBottomIos: {
    marginTop: 2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: 'white',
    padding: 10,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Efek bayangan (juga berlaku untuk Android)
  },
  contentTop: {
    marginRight: 70,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  contentMid: {
    marginVertical: 30,
    marginHorizontal: 100,
    borderWidth: 1,
    borderColor: '#315447',
    elevation: 5, // Efek bayangan (juga berlaku untuk Android)
  },
  contentMidIos: {
    marginVertical: 20,
    marginHorizontal: 100,
    borderWidth: 1,
    borderColor: '#315447',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Efek bayangan (juga berlaku untuk Android)
  },
  shadowContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowBox: {
    width: 200,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5, // Efek bayangan (juga berlaku untuk Android)
  },
  shadowBoxIos: {
    width: 200,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Efek bayangan (juga berlaku untuk Android)
  },
  additionalContent: {
    padding: 5,
    // backgroundColor: '#e0e0e0',
  },
  lineStyle:{
    borderWidth: 0.5,
    borderColor:'black',
    margin:10,
},
  trackingContainer: {
    flex: 1,
    padding: 16,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  stepText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  line: {
    flex: 1,
    borderLeftWidth: 1,
    borderColor: '#ccc',
    marginLeft: 10,  // Sesuaikan margin sesuai kebutuhan
  },
  buttonAttach: {
    paddingHorizontal: 10, 
    paddingVertical: 11,
    borderRadius: 8,
    backgroundColor: '#315447',
  },
  fontAttach: {
    color: '#FFF'
  }
});
