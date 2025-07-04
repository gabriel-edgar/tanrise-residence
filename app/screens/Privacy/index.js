import {
  Card,
  Header,
  Icon,
  Image,
  ProfileDescription,
  SafeAreaView,
  Text,
} from '@/components';
import {BaseColor, BaseStyle, useTheme} from '@/config';
import {Images} from '@/config';
import {AboutUsData} from '@/data';
import * as Utils from '@/utils';
import React, {useState, useEffect} from 'react';
import {ScrollView, View, useWindowDimensions} from 'react-native';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import axios from 'axios';
import RenderHTML from 'react-native-render-html';
import {API_URL_LOKAL} from '@env';
import {useSelector, useDispatch} from 'react-redux';
import httpClient from '../../controllers/HttpClient';

const Privacy = props => {
  const {width} = useWindowDimensions();
  const {navigation} = props;
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [loading, setLoading] = useState(true);
  console.log('30 colors: ', colors);
  // const [ourTeam, setOurTeam] = useState(AboutUsData);

  const [data, setData] = useState([]);
  const stateRedux = useSelector(state => state.user);
  const token = stateRedux.accessToken;

  const stateReduxChoosedProject = useSelector(
    state => state.Dataproject.chooseProject,
  );

  useEffect(() => {
    setTimeout(() => {
      httpClient
        .request({
          url: '/setting/privacy-policy',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            entity_cd: stateReduxChoosedProject?.entity_cd,
            project_no: stateReduxChoosedProject?.project_no,
          },
        })
        .then(({data}) => {
          console.log('49 data >', data.data[0]);
          setData(data.data[0]);
        })
        .catch(error => console.error('49 error: ', error))
        .finally(() => setLoading(false));
    }, 1000);
  }, []);

  useEffect(() => {
    console.log('datauser', data);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const tagsStyles = {
    h1: {
      color: colors.text,
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    p: {
      color: colors.text,
      fontSize: 16,
      lineHeight: 24,
      marginBottom: 10,
    },
    a: {
      color: colors.text,
      textDecorationLine: 'underline',
    },
  };

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
            //source={require("../../assets/images/pakubuwono.png")}
            //source={require("../../assets/images/logoIFCA.png")}
            source={require('../../assets/images/image-home/logo-tanrise-blackfont.png')}
            resizeMode="contain"
            style={{
              height: 140,
              width: '80%',
              alignSelf: 'center',
              //marginHorizontal: 100,
              flexDirection: 'row',
              //resizeMode: "contain",
              marginTop: 10,
              //padding: 20,
              //backgroundColor: "white",
              borderRadius: 15,
            }}
          />
        </View>
        <View style={{padding: 20}}>
          <View>
            <RenderHTML
              source={{
                html: data?.descriptions ?? 'Deskripsi Privacy Policy',
                // Optional Chaining (?.), Nullish Coalescing (??)
              }}
              contentWidth={width}
              tagsStyles={tagsStyles}></RenderHTML>
            {/* <Text
              body2
              style={{
                paddingTop: 10,
                paddingBottom: 10,
              }}
              numberOfLines={100}>
              {data.descriptions?.replace(/<\/?[^>]+(>|$;)/gi, '')}
            </Text> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Privacy;
