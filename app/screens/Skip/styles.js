import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
  contain: {
    width: '100%',
  },
  titleAbout: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  address: {
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#f5f5f5',
    width: '100%',
    marginVertical: 10,
    borderColor: '#f5f5f5',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  paddingSrollView: {padding: 10},
  paddingFlatList: {
    paddingTop: 5,
    paddingVertical: 45,
  },
  topicsView: {
    marginVertical: 10,
  },
  title: {marginBottom: 5},
});
