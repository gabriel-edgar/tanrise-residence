import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  paddingSrollView: {padding: 20},
  paddingFlatList: {
    paddingTop: 4,
  },
  topicsView: {
    marginVertical: 24,
  },
  title: {marginBottom: 5},
  paddingContent: {
    paddingHorizontal: 20,
  },
  item: {
    paddingVertical: 15,
    borderBottomColor: BaseColor.dividerColor,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
