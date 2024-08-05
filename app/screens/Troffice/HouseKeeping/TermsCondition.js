import {
  Card,
  Header,
  Icon,
  Image,
  ProfileDescription,
  SafeAreaView,
  Text,
} from '@components';
import {BaseColor, BaseStyle, useTheme} from '@config';
import {Images} from '@config';
import {AboutUsData} from '@data';
import * as Utils from '@utils';
import React, {useState, useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import axios from 'axios';

const TermsCondition = props => {
  const {navigation} = props;
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [loading, setLoading] = useState(true);

  // const [ourTeam, setOurTeam] = useState(AboutUsData);

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://34.87.121.155:8000/ifcaprop-api/api/privacy/01/01')
      .then(({data}) => {
        console.log('data', data);
        setData(data[0]);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    console.log('datauser', data);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'top', 'left']}>
      <Header
        title={t('Privacy Policy')}
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
      <ScrollView>
        <View>
          {/* <Image source={Images.trip4} style={{width: '100%', height: 135}} /> */}
          <Image
            source={require('../../../assets/images/pakubuwono.png')}
            style={{
              height: 60,
              width: 180,
              alignItems: 'center',
              marginHorizontal: 100,
              flexDirection: 'row',
            }}
          />
        </View>
        <View style={{padding: 20}}>
          <View>
            <Text
              body2
              style={{
                paddingTop: 10,
                paddingBottom: 10,
              }}
              numberOfLines={100}>
              {data.descriptions?.replace(/<\/?[^>]+(>|$;)/gi, '')}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsCondition;
