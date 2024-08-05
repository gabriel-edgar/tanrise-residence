import {
  Header,
  Icon,
  ListThumbCircleNotif,
  SafeAreaView,
  Text,
} from '@components';
import {BaseColor, BaseStyle, useTheme} from '@config';
// Load sample data
// import {NotificationData} from '@data';
import React, {useState, useEffect} from 'react';
import {
  FlatList,
  RefreshControl,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
// import getUser from '../../selectors/UserSelectors';
import Pdf from 'react-native-pdf';
import ReactNativeBlobUtil from 'react-native-blob-util';
// import RNFetchBlob from 'rn-fetch-blob';

const PDFAttach = props => {
  const {navigation, route} = props;
  console.log('route params', route);
  const paramsItem = "http://dev.ifca.co.id:8080/webpbi/images/letter/FITOUT-LETTEROFPERMIT.pdf";
  const {t} = useTranslation();
  const {colors} = useTheme();
  const repl = paramsItem.replace('https', 'http');
  console.log('repl', repl);
  const source = {
    uri: repl,
    cache: true,
  };
  //   const [refreshing, setRefreshing] = useState(false);
  //   const [notification, setNotification] = useState(NotificationData);
  //   const users = useSelector(state => getUser(state));
  //   const [email, setEmail] = useState(users.user);
  //   const [loading, setLoading] = useState(true);
  //   const [dataTowerUser, setdataTowerUser] = useState([]);
  //   const [arrDataTowerUser, setArrDataTowerUser] = useState([]);
  //   const [spinner, setSpinner] = useState(true);
  //   const [dataNotif, setDataNotif] = useState([]);
  const downloadFile__ = () => {
    const url = repl;
    console.log('url', url);
    const android = RNFetchBlob.android;
    let dirs = RNFetchBlob.fs.dirs;
    console.log('dirs', dirs);
    const title = paramsItem.doc_no + '_' + paramsItem.remark + '.pdf';
    RNFetchBlob.config({
      // response data will be saved to this path if it has access right.

      fileCache: true,
      addAndroidDownloads: {
        path:
          dirs.DownloadDir +
          '/downloads/' +
          paramsItem.doc_no +
          '_' +
          paramsItem.remark +
          '.pdf',
        useDownloadManager: true,
        // Show notification when response data transmitted
        notification: true,
        // Title of download notification
        title: title,
        // File description (not notification description)
        description: 'downloading content...',
        mime: 'application/pdf',
        // Make the file scannable  by media scanner
        mediaScannable: true,
      },
    })
      .fetch('GET', url)
      .then(res => {
        // the path should be dirs.DocumentDir + 'path-to-file.anything'
        console.log('The file saved to ', res.path());
        alert('Saved at : ' + res.path());
      });
  };

  const downloadFile = () => {
    const url = repl;
    console.log('url', url);
    //  const android = RNFetchBlob.android;
    let dirs = ReactNativeBlobUtil.fs.dirs;
    //  console.log('dirs', dirs);
    const title = paramsItem.doc_no + '_' + paramsItem.remark + '.pdf';
    // send http request in a new thread (using native code)
    ReactNativeBlobUtil.config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.
      fileCache: true,

      // android only options, these options be a no-op on IOS
      addAndroidDownloads: {
        path:
          dirs.DownloadDir +
          '/downloads/' +
          paramsItem.doc_no +
          '_' +
          paramsItem.remark +
          '.pdf',
        useDownloadManager: true,
        // Show notification when response data transmitted
        notification: true,
        // Title of download notification
        title: title,
        // File description (not notification description)
        description: 'downloading content...',
        mime: 'application/pdf',
        // Make the file scannable  by media scanner
        mediaScannable: true,
      },
    })
      .fetch('GET', url, {
        //some headers ..
      })
      .then(res => {
        // the temp file path
        console.log('The file saved to ', res.path());
      });
  };

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'top', 'left']}>
      <Header
        title={t('Attachment Letter')}
        renderLeft={() => {
          return (
            <Icon
              name="angle-left"
              size={20}
              color={colors.primary}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        renderRight={() => {
          return (
            <Icon
              name="download"
              size={20}
              color={colors.primary}
              enableRTL={true}
            />
          );
        }}
        onPressRight={() => {
          downloadFile();
        }}
      />
      <View style={stylesCurrent.container}>
        {/* <Pdf
          source={{
            uri: paramsItem.link_url,
            cache: true,
          }}
          // source={require('@assets/termsconditions/Facility_Booking_System_Regulation.pdf')}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
          }}
          onPressLink={uri => {
            console.log(`Link pressed: ${uri}`);
          }}
          password={'220359'}
          style={stylesCurrent.pdf}
          fitWidth={true}
        /> */}
        <Pdf
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
          }}
          onPressLink={uri => {
            console.log(`Link pressed: ${uri}`);
          }}
          password={'220359'}
          style={stylesCurrent.pdf}
        />
        {/* <Text>{paramsItem.link_url}</Text> */}
      </View>
    </SafeAreaView>
  );
};

export default PDFAttach;

const stylesCurrent = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
