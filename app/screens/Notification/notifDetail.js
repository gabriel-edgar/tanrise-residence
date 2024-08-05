import {
  Header,
  Icon,
  Text,
  ListThumbCircleNotif,
  SafeAreaView,
} from '@components';
import {BaseColor, BaseStyle, useTheme} from '@config';
// Load sample data
import {NotificationData} from '@data';
import React, {useState, useEffect} from 'react';
import {FlatList, RefreshControl, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import getUser from '../../selectors/UserSelectors';
import axios from 'axios';
import styles from './styles';
import moment from 'moment';

const NotificationDetail = props => {
  //   const {navigation} = props;
  const {navigation, route} = props;
  console.log('route paarams', route?.params?.item);
  const paramsDataNotif = route?.params?.item;
  const {t} = useTranslation();
  const {colors} = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [notification, setNotification] = useState(NotificationData);
  const users = useSelector(state => getUser(state));
  const [email, setEmail] = useState(users.user);
  const [loading, setLoading] = useState(true);
  const [dataTowerUser, setdataTowerUser] = useState([]);
  const [arrDataTowerUser, setArrDataTowerUser] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const [dataNotif, setDataNotif] = useState([]);

  //   const [propsParams, setPropsParams] = useState(route.params);
  //   console.log('props params', propsParams);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'top', 'left']}>
      <Header
        title={t('Notification Detail')}
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

      {/* <View>
          <Text>{paramsDataNotif.Report_no}</Text>
          <Text>{paramsDataNotif.Remarks}</Text>
          <Text>
            {moment(paramsDataNotif.NotificationDate).format(
              'DD MMMM YYYY hh:mm:ss',
            )}
          </Text>
          <Text>{paramsDataNotif.NotificationCd}</Text>
          <Text>{paramsDataNotif.Email_addr}</Text>
        </View> */}
      <View style={{justifyContent: 'center', margin: 20}}>
        <View style={styles.content}>
          <View style={styles.left}>
            <Text text2 semibold numberOfLines={1}>
              {paramsDataNotif.Report_no} - {paramsDataNotif.NotificationCd}
            </Text>
          </View>
          <View style={styles.right}>
            <Text caption2 grayColor numberOfLines={1}>
              {moment(paramsDataNotif.NotificationDate).format(
                'DD MMMM YYYY hh:mm:ss',
              )}
            </Text>
          </View>
        </View>
        <View style={{marginTop: 10}}>
          <Text
            note
            // numberOfLines={1}
            footnote
            grayColor
            style={{paddingTop: 5}}>
            {paramsDataNotif.Remarks}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NotificationDetail;
