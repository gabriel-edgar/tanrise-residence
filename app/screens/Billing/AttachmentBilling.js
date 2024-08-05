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
import {Card} from 'react-native-paper';
import {useSelector} from 'react-redux';
import axios from 'axios';
// import getUser from '../../selectors/UserSelectors';
import {API_URL_LOKAL} from '@env';

const fileDummy = [
  {
    rowId: '1',
    descs: 'descs meter',
    url_link: '',
  },
];

const AttachmentBilling = props => {
  const {navigation, route} = props;
  console.log('route params', route);
  //   const url_attachment = route.params;
  const {t} = useTranslation();
  const {colors} = useTheme();
  const [attachment, setAttachment] = useState([]);
  const [hasError, setErrors] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getAttachment();
  }, []);

  const getAttachment = async () => {
    const entity_cd = route.params.entity_cd;
    const project_no = route.params.project_no;
    const debtor_acct = route.params.debtor_acct;
    const doc_no = route.params.doc_no;

    console.log(
      'params api attach',
      API_URL_LOKAL +
        `/getDataAttach/IFCAPB/${entity_cd}/${project_no}/${debtor_acct}/${doc_no}`,
    );
    try {
      const res = await axios.get(
        API_URL_LOKAL +
          `/getDataAttach/IFCAPB/${entity_cd}/${project_no}/${debtor_acct}/${doc_no}`,
      );
      console.log('res atatchment billing', res.data.Data);
      setAttachment(res.data.Data);
    } catch (error) {
      console.log('error attach get', error);
      setErrors(error);
      // alert(hasError.toString());
    }
  };

  const openAttach = item => {
    console.log('itm', item);
    navigation.navigate('PDFAttach', item);
  };

  const renderItem = ({item, index}) => {
    return (
      <Card key={index} style={{paddingVertical: 20}}>
        <TouchableOpacity
          onPress={() => {
            openAttach(item);
          }}>
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{justifyContent: 'space-between', flex: 1}}>
              <Text style={{fontSize: 18}} bold>
                {item.remark}
              </Text>
            </View>
            <Icon
              name="file-pdf"
              size={34}
              color={BaseColor.grayColor}
              enableRTL={true}
            />
          </View>
        </TouchableOpacity>
      </Card>
      //   <View key={index} style={{}}>
      //     <Text>{item.descs}</Text>
      //     <Text>{item.remark}</Text>
      //     <Text>{item.link_url}</Text>
      //   </View>
    );
  };

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'top', 'left']}>
      <Header
        title={t('Attachment Invoice')}
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
      />
      {attachment == null ? (
        <View
          style={{
            flex: 1,

            justifyContent: 'center',
          }}>
          <Text
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              fontSize: 16,
              marginTop: 10,
            }}>
            Not Available Attachment Invoice
          </Text>
        </View>
      ) : (
        <View style={{flex: 1}}>
          <FlatList
            //   key={key}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 20,
            }}
            //   numColumns={getTotalCol()}
            refreshControl={
              <RefreshControl
                colors={[colors.primary]}
                tintColor={colors.primary}
                refreshing={refreshing}
                onRefresh={() => {}}
              />
            }
            data={attachment}
            keyExtractor={item => item.rowid}
            renderItem={renderItem}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default AttachmentBilling;

const stylesCurrent = StyleSheet.create({
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
