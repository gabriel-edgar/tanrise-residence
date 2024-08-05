import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 15,
    paddingRight: 15,
  },
  text: {
    textAlign: 'right',
  },
  title: {
    textTransform: 'uppercase',
  },
  viewRight: {
    alignItems: 'flex-end',
  },
  content: {
    maxWidth: 150,
    marginTop: 10,
  },
});
