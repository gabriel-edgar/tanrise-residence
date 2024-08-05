import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  content: {
    padding: 20,
    width: '100%',
    borderRadius: 8,
    marginBottom: 0,
    borderWidth: StyleSheet.hairlineWidth,
    ...Platform.select({
      android: {
        elevation: 1,
      },
      default: {
        shadowColor: 'rgba(255,255,255, .2)',
        shadowOffset: {height: 0, width: 0},
        shadowOpacity: 3,
        shadowRadius: 3,
      },
    }),
  },
  container: {
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewIcon: {
    borderRadius: 25,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
