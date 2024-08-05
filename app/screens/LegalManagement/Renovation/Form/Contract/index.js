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
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import axios from 'axios';
import styles from './styles';

export default function ContractInformation() {
  const {t, i18n} = useTranslation();
  const {colors} = useTheme();
  const [loading, setLoading] = useState(true);
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedValue1, setSelectedValue1] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [formData, setFormData] = useState({
    contractor_name: '',
    address: '',
    person_responsible: '',
    phone: '',
    number_works: '',
  });
  const iosPickerStyle = Platform.OS === 'ios' ? styles.iosPicker : null;

  const tomorrow = new Date();
  // const format = moment(tomorrow).add(1, 'days').format('YYYY-MM-DD');
  const format = moment(tomorrow).format('YYYY-MM-DD');
  const [date, setDate] = useState(new Date());
  const [selectedDate, setselectedDate] = useState(false);
  const [open, setOpen] = useState(false);

  const navigation = useNavigation();
  const handleNextScreen = () => {
    // Ganti 'NextScreen' dengan nama screen tujuan untuk navigasi
    // navigation.navigate('TenantInformation');
    alert('Data submitted! Thank You');
    navigation.navigate('LegalManagement');
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
        <View
          style={{
            alignContent: 'center',
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
            Contractor Information
          </Text>
          <View>
            <TextInput
              style={{marginBottom: 10, paddingHorizontal: 15}}
              placeholder="Name of Contractor"
              value={formData.contractor_name}
              onChangeText={text =>
                setFormData({...formData, contractor_name: text})
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
              placeholder="Person Responsible"
              value={formData.person_responsible}
              onChangeText={text =>
                setFormData({...formData, person_responsible: text})
              }
            />
            <TextInput
              style={{marginBottom: 10}}
              placeholder="Phone"
              value={formData.phone}
              onChangeText={text => setFormData({...formData, phone: text})}
            />
            <TextInput
              style={{marginBottom: 20}}
              placeholder="Number of Works"
              keyboardType="numeric"
              value={formData.number_works}
              onChangeText={text =>
                setFormData({...formData, number_works: text})
              }
            />


            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: 20,
              }}>
              Working Purpose
            </Text>
            <View style={styles.containerDate}>
              {/* <View style={{flexDirection: "row", justifyContent: "space-around"}}> */}
              <TouchableOpacity
                  style={{
                    backgroundColor: '#F5F5F5',
                    // colors.primary,
                    paddingVertical: 15,
                    paddingHorizontal: 15,
                    borderRadius: 10,
                    marginBottom: 20,
                  }}
                  onPress={() => setOpen(true)}>
                    {selectedDate ? <Text>{moment(date).format('DD-MM-YYYY')}</Text> : <Text style={{color: '#aeaeae'}}>Due Date</Text>}

                  <DatePicker
                    modal
                    // minimumDate={new Date(moment(format).format('YYYY-MM-DD'))}
                    minimumDate={new Date(format)}
                    mode="date"
                    open={open}
                    date={date}
                    onConfirm={date => {
                      setOpen(false);
                      if(date){
                        setselectedDate(true);
                        setDate(date);
                      }
                    }}
                    onCancel={() => {
                      setOpen(false);
                    }}
                  />
              </TouchableOpacity>
              {/* </View> */}
              
            </View>

            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.button}>
              <Text style={selectedValue === '' ? {color: '#A4A4A4'} : null}>
                {selectedValue !== '' ? selectedValue : 'Type of Works'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setModalVisible1(true)}
              style={styles.button}>
              <Text style={selectedValue1 === '' ? {color: '#A4A4A4'} : null}>
                {selectedValue1 !== '' ? selectedValue1 : 'Delivery Through'}
              </Text>
            </TouchableOpacity>

            {/* <View style={{marginTop: 10}}>
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
            </View> */}
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
                  <Picker.Item label="Electronic" value="Electronic" />
                  <Picker.Item label="Mechanical Plumbing" value="Mechanical Plumbing" />
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
          <Modal
            transparent={true}
            animationType="slide"
            visible={modalVisible1}
            onRequestClose={() => {
              setModalVisible1(false);
            }}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Picker
                  selectedValue={selectedValue1}
                  style={[styles.picker, iosPickerStyle]}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedValue1(itemValue)
                  }>
                  <Picker.Item label="Select an option" value="" />
                  <Picker.Item label="GATE 1" value="GATE 1" />
                  <Picker.Item label="GATE 2" value="GATE 2" />
                  {/* ... add more dropdown options */}
                </Picker>

                <TouchableOpacity
                  onPress={() => setModalVisible1(false)}
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
