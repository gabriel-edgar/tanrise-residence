import { StyleSheet } from 'react-native';
import Colors from '../helpers/Colors';

const styles = StyleSheet.create({
  darkTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.black,
    fontFamily: "Montserrat-Regular",
  },
  lightTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.white,
    fontFamily: "Montserrat-Regular",
  },
  textField: {
    fontSize: 15,
    fontWeight: 'normal',
    fontFamily: "Montserrat-Regular",
  },
  fieldTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: "Montserrat-Regular",
  },
  error: {
    fontSize: 14,
    color: Colors.red,
    fontFamily: "Montserrat-Regular",
  },
});

export default styles;
