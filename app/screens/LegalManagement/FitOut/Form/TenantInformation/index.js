import {
  Header,
  Icon,
  ListTextButton,
  SafeAreaView,
  Tag,
  Image,
  Text,
  TextInput,
  Button,
  CategoryGrid,
  CategoryBoxColor,
  ModalFilterLocation,
} from '@components';
import {BaseColor, BaseStyle, useTheme} from '@config';
import {FFriends} from '@data';
import {useNavigation} from '@react-navigation/native';
import {haveChildren} from '@utils';
import React, {useEffect, useState, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  TouchableOpacity,
  View,
  Picker,
  Modal,
  Platform,
  ScrollView,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import styles from './styles';

export default function TenantInformation() {
  const {t, i18n} = useTranslation();
  const {colors} = useTheme();
  const [loading, setLoading] = useState(true);
  const [selectedValue, setSelectedValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    tenant_name: '',
    address: '',
    phone: '',
    fax: '',
    email: ''
  });
  const iosPickerStyle = Platform.OS === 'ios' ? styles.iosPicker : null;

  const navigation = useNavigation();
  const handleNextScreen = () => {
    // Ganti 'NextScreen' dengan nama screen tujuan untuk navigasi
    // navigation.navigate('TenantInformation');
    alert('Data submitted! Thank You')
    navigation.navigate('LegalManagement')
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'top', 'left']}>
      <View style={{justifyContent: 'center'}}>
        <View style={{alignContent: 'center', 
        marginHorizontal: 30, 
        // borderWidth: 1, 
        // borderColor: '#000'
        }}>
        <Image
          source={require('@assets/images/form.png')}
          style={{
            height: 200,
            width: 300,
            // marginHorizontal: 100,
            // flexDirection: 'row',
            resizeMode: 'cover',
            // alignSelf: 'center',
          }}
        />
        </View>

        <ScrollView
          style={{
            marginTop: 30,
            paddingHorizontal: 20,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: 20,
            }}>
            Tenant Information
          </Text>
          <View>
            <TextInput
              style={{marginBottom: 10, paddingHorizontal: 15}}
              placeholder="Tenant Name"
              value={formData.tenant_name}
              onChangeText={text =>
                setFormData({...formData, tenant_name: text})
              }
            />
            <TextInput
              style={{marginBottom: 10}}
              placeholder="Address"
              value={formData.address}
              onChangeText={text => setFormData({...formData, address: text})}
            />
            <TextInput
              style={{marginBottom: 10}}
              placeholder="Phone"
              value={formData.phone}
              onChangeText={text => setFormData({...formData, phone: text})}
            />
            <TextInput
              style={{marginBottom: 10}}
              placeholder="Fax"
              value={formData.fax}
              onChangeText={text => setFormData({...formData, fax: text})}
            />
            <TextInput
              style={{marginBottom: 10}}
              placeholder="Email"
              value={formData.email}
              onChangeText={text => setFormData({...formData, email: text})}
            />
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.button}>
              <Text style={selectedValue === '' ? {color: '#A4A4A4'} : null}>
                {selectedValue !== '' ? selectedValue : 'Unit Number'}
              </Text>
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'left',
                marginBottom: 20,
              }}>
              Area
            </Text>
            <Text
              style={{
                fontSize: 14,
                // fontWeight: 'bold',
                textAlign: 'left',
                marginBottom: 20,
                fontStyle: 'italic',
              }}>
              34.68 Sqm
            </Text>

            <View style={{marginTop: 10}}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  textAlign: 'left',
                  marginBottom: 20,
                }}>
                Lease Period
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  // fontWeight: 'bold',
                  textAlign: 'left',
                  marginBottom: 20,
                  fontStyle: 'italic',
                }}>
                01 Oct 2023 - 31 Oct 2024 {'(12 Months)'}
              </Text>
            </View>
          </View>

          <Modal
            transparent={true}
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Picker
                  selectedValue={selectedValue}
                  style={[styles.picker, iosPickerStyle]}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedValue(itemValue)
                  }>
                  <Picker.Item label="Select an option" value="" />
                  <Picker.Item label="E11A" value="E11A" />
                  {/* ... add more dropdown options */}
                </Picker>

                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>
      <View style={styles.nextButtonContainer}>
            <TouchableOpacity
              onPress={() => handleNextScreen()}
              style={styles.nextButton}>
              <Text style={styles.nextButtonText}>Submit</Text>
              <Icon name="chevron-right" size={24} color="white" />
            </TouchableOpacity>
          </View>
    </SafeAreaView>
  );
}
