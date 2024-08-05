import {
  Header,
  Icon,
  ListTextButton,
  SafeAreaView,
  Tag,
  Image,
  Text,
  Button,
  CategoryGrid,
  CategoryBoxColor,
  ModalFilterLocation,
} from '@components';
import {BaseColor, BaseStyle, useTheme} from '@config';
import {CheckBox} from 'react-native-elements';
import {FFriends} from '@data';
import {useNavigation} from '@react-navigation/native';
import {haveChildren} from '@utils';
import React, {useEffect, useState, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, TouchableOpacity, View} from 'react-native';
import axios from 'axios';
import styles from './styles';


export default function EntryExit() {
  const {t, i18n} = useTranslation();
  const {colors} = useTheme();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'top', 'left']}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={require('@assets/images/renovation.png')}
          style={{
            height: 300,
            width: 300,
            // marginHorizontal: 100,
            // flexDirection: 'row',
            resizeMode: 'contain',
            // alignSelf: 'center',
          }}
        />
        <View style={{marginTop: 10}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>
            Request your
          </Text>
          <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>
          Letter of Renovation Permit
          </Text>
          <Text style={{marginTop: 10, fontSize: 16, fontWeight: '100', textAlign: 'center'}}>
          Please fill in the forms
          </Text>
          <Text style={{fontSize: 16, fontWeight: '100', textAlign: 'center'}}>
          below for permit request data
          </Text>
        </View>

        <View style={{marginTop: 20}}>
          <TouchableOpacity
            style={{
              marginTop: 10,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#315447',
              padding: 10,
              alignItems: 'center',
            }}
            onPress={() => navigation.navigate('FormPermitRenovation')}
            >
            <Text
              style={{fontSize: 16, fontWeight: '100', textAlign: 'center'}}>
              Complete the form
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 10,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#315447',
              padding: 10,
              alignItems: 'center',
            }}
            onPress={()=> navigation.navigate('TrackPermitRenov')}
            >
            <Text
              style={{fontSize: 16, fontWeight: '100', textAlign: 'center'}}>
              Track your permit
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}
