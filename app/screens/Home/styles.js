import {StyleSheet} from 'react-native';
import * as Utils from '@utils';
import {BaseColor} from '@config';

export default StyleSheet.create({
  imageBackground: {
    height: ((Utils.getWidthDevice() - 30) * 3) / 6,
    width: '100%',
    borderRadius: 25,
  },
  viewBackground: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    padding: 10,
  },
  viewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 1,
  },
  thumb: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 5,
  },

  styleThumb: {
    borderWidth: 1,
    borderColor: BaseColor.whiteColor,
  },
  paddingSrollView: {padding: 20},
  paddingFlatList: {
    paddingTop: 24,
  },
  topicsView: {
    marginVertical: 24,
  },
  title: {marginBottom: 5},
  notyHeader: {
    position: 'absolute',
    width: '100%',
    height: 10,
    borderWidth: 1,
    borderRadius: 5,
    right: 0,
  },
  container: {
    padding: 20,
    paddingTop: 0,
  },
  header: {
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 10,
    paddingHorizontal: 20,
  },
  contentHeader: {paddingLeft: 8, flex: 1},
  notyHeader: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderWidth: 1,
    borderRadius: 5,
    right: 0,
  },
  avatar: {
    height: 46,
    width: 46,
    borderRadius: 50,
    borderColor: BaseColor.grayColor,
    borderWidth: 2,
  },
  titleList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  headerCard: {
    borderRadius: 10,
    height: 108,
    width: '100%',
    marginVertical: 15,
    backgroundColor: BaseColor.fieldColor,
    justifyContent: 'center',
    padding: 15,
  },
  headerCardPrimary: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCardCenter: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    height: 'auto',
    marginVertical: 0,
  },
  paddingContent: {
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    backgroundColor: '#f5f5f5',
    color: 'black',
    paddingHorizontal: 10,
    marginBottom: 16,
    width: null,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
