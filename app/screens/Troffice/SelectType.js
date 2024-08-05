import {
    Header,
    Icon,
    ListTextButton,
    SafeAreaView,
    Tag,
    Text,
    Button,
    CategoryGrid,
    CategoryBoxColor,
    ModalFilterLocation,
  } from '@components';
  import {BaseColor, BaseStyle, useTheme} from '@config';
  import {CheckBox} from 'react-native-elements';
  
  import {useNavigation} from '@react-navigation/native';
  import {haveChildren} from '@utils';
  import React, {useEffect, useState, useMemo} from 'react';
  import {useTranslation} from 'react-i18next';
  import {FlatList, TouchableOpacity, View} from 'react-native';
  import {SceneMap} from 'react-native-tab-view';
  import {useSelector} from 'react-redux';
  import getUser from '../../selectors/UserSelectors';
  import axios from 'axios';
  import client from '../../controllers/HttpClient';
  import styles from './styles';
  

  
  export default function SelectType(props) {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const [dataLocation, setLocation] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [urlApi, seturlApi] = useState(client);
    const [index, setIndex] = useState(0);
  
    const [search, setSearch] = useState('');
    const [data, setData] = useState(props.route.params);
    
  
    useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }, []);

    
   console.log('prooopsss',props.route.params)
   const handleSelectType = (type) => {
    const types = {
        category_cd: data.category_cd,
        descs: data.descs,
        type: type
    };
    navigation.navigate('SpecTroffice', types);
   };

        // console.log('status user new old', status_user);
        // setStatusUser(status_user);

        // if (status_user == 'N') {
        //   setModalImage(true); // sementara di jadiin false dulu, untuk hide modal.
        //   getImageGreetings();
        // } else {
        //   setModalImage(false);
        // }
        // setLoadNews(false);
        // // return res.data;
      


  
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'top', 'left']}>
        <Header
          // title={t('choose_friend')}
          title={t('Water Heater')} //belum ada lang translatenya
          renderLeft={() => {
            return (
              <Icon
                name="angle-left"
                size={20}
                color={colors.text}
                enableRTL={true}
              />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
        <View
        style={{
            flexDirection: 'row',
          }}>
            {/* {getCategories.map((data, index)=>( */}
              <CategoryBoxColor
              loading={loading}
              style={{
                // paddingLeft: index % 2 == 0 ? 0 : 15,
                paddingBottom: 15,
                justifyContent: 'space-between',
                paddingHorizontal: 10,
              }}
              title={'REGULER'}
              icon={'list-alt'}
              color={colors.primary}
              onPress={() => handleSelectType('R')}
            />
              <CategoryBoxColor
              loading={loading}
              style={{
                // paddingLeft: index % 2 == 0 ? 0 : 15,
                paddingBottom: 15,
                justifyContent: 'space-between',
                paddingHorizontal: 10,
              }}
              title={'OVERHAUL'}
              icon={'list-alt'}
              color={colors.primary}
              onPress={() => handleSelectType('O')}
            />
            {/* ))} */}
       
        
        </View> 
       
      
     
      </SafeAreaView>
    );
  }
  