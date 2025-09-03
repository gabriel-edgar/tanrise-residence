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
  ListItem,
  ListItem3,
} from '@/components';
import {BaseColor, BaseStyle, useTheme} from '@/config';
import {FFriends} from '@/data';
import {useNavigation} from '@react-navigation/native';
import {haveChildren} from '@/utils';
import React, {useEffect, useState, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  TouchableOpacity,
  View,
  //Picker,
  Modal,
  Platform,
  ScrollView,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import moment from 'moment';
import axios from 'axios';
import styles from './styles';
import {Picker} from '@react-native-picker/picker';

export default function SuratIzinKeluarMasukBarang() {
  const {t, i18n} = useTranslation();
  const {colors} = useTheme();
  console.log('41 colors: ', colors);
  const [loading, setLoading] = useState(true);
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedValue1, setSelectedValue1] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);

  const [typeInOut, setTypeInOut] = useState('');
  const [formData, setFormData] = useState({
    contractor_name: '',
    subcontractor_name: '',
    site_supervisor: '',
    person_responsible: '',
    contact_number: '',
    number_works: '',

    TenantName: '',
    //FloorNoUnitTower: "",
    ContractorName: '',
    NameofResponsiblePerson: '',
    TelOfficeMobile: '',
    Typeofwork: '',
    Dateofwork: '',
    //Hoursofwork: "",
    numberofWorkers: '',

    ApplicantName: '',
    FloorNoUnitTower: '', //
    ExitEntryDate: '',
    NameofOwnerTenant: '',
    NoTelephone: '', //
    Typeofwork: '',

    NameSenderTaker: '',
    NoKTPSIM: '',
    Address: '',
    NoPhone: '',
    DayDate: '',
    clock: '',
    to: '',
    VehicleType: '',
    VehicleNumber: '',
  });
  const iosPickerStyle = Platform.OS === 'ios' ? styles.iosPicker : null;

  const tomorrow = new Date();
  // const format = moment(tomorrow).add(1, 'days').format('YYYY-MM-DD');
  const format = moment(tomorrow).format('YYYY-MM-DD');
  const [date, setDate] = useState(new Date());
  const [selectedDate, setselectedDate] = useState(false);
  const [open, setOpen] = useState(false);

  const [items, setItems] = useState([]);
  // const [itemName, setItemName] = useState("");
  // const [itemQuantity, setItemQuantity] = useState("");
  const [item1, setItem1] = useState('');
  const [item2, setItem2] = useState('');
  const [item3, setItem3] = useState('');

  // const handleAddItem = () => {
  //   if (itemName && itemQuantity) {
  //     setItems([...items, { name: itemName, quantity: itemQuantity }]);
  //     setItemName("");
  //     setItemQuantity("");
  //   }
  // };

  const handleAddItem = () => {
    if (item1 && item2 && item3) {
      setItems([...items, {column1: item1, column2: item2, column3: item3}]);
      setItem1('');
      setItem2('');
      setItem3('');
    }
  };

  const navigation = useNavigation();

  const handleSubmit = () => {
    // setModalVisible(true);
    // Ganti 'NextScreen' dengan nama screen tujuan untuk navigasi
    // navigation.navigate('TenantInformation');
    // alert("Data submitted! Thank You");
    // navigation.navigate("LegalManagement");
  };

  const handleNextScreen = () => {
    if (typeInOut != 'no') {
      setModalVisible(true);
    } else {
      alert('Tipe surat izin mengeluarkan / memasukkan barang belum dipilih');
    }

    // Ganti 'NextScreen' dengan nama screen tujuan untuk navigasi
    // navigation.navigate('TenantInformation');
    // alert("Data submitted! Thank You");
    // navigation.navigate("LegalManagement");
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleDelete = targetIndex => {
    const updatedItems = items.filter((item, index) => index !== targetIndex);
    setItems(updatedItems);
  };

  const [option1Checked, setOption1Checked] = useState(false);
  const [option2Checked, setOption2Checked] = useState(false);
  const [option3Checked, setOption3Checked] = useState(false);
  const [lainLain, setlainLain] = useState('');
  // const [option4Checked, setOption4Checked] = useState(false);
  // const [option5Checked, setOption5Checked] = useState(false);
  // const [optionJamKerja, setOptionJamKerja] = useState({
  //   option1: false,
  //   option2: false,
  //   option3: false,
  // });

  const [jamKerja, setJamKerja] = useState('');

  dummyArrayValue = ['Pkl 10.00 - 22.00', 'Pkl 22.00 - 10.00', 'Lain-lain'];

  const handleOptionSelect = option => {
    setOption1Checked(false);
    setOption2Checked(false);
    setOption3Checked(false);
    // setOption4Checked(false);
    // setOption5Checked(false);

    // setOptionJamKerja({
    //   ...optionJamKerja,
    //   option1:true
    // })

    switch (option) {
      case 'option1':
        setOption1Checked(true);
        setJamKerja(dummyArrayValue[0]);
        break;
      case 'option2':
        setOption2Checked(true);
        setJamKerja(dummyArrayValue[1]);
        break;
      case 'option3':
        setOption3Checked(true);
        setJamKerja(lainLain);
        break;
      // case "option4":
      //   setOption4Checked(true);
      //   setJamKerja(dummyArrayValue[0]);
      //   break;
      // case "option5":
      //   setOption5Checked(true);
      //   setJamKerja(dummyArrayValue[0]);
      //   break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={["top", "right", "bottom", "left"]}>
      <View style={{justifyContent: 'center'}}>
        <View
          style={{
            alignContent: 'center',
            marginHorizontal: 30,
            // borderWidth: 1,
            // borderColor: '#000'
          }}>
          {/* <Image
            source={require("@/assets/images/form.png")}
            style={{
              height: 200,
              width: 300,
              // marginHorizontal: 100,
              // flexDirection: 'row',
              resizeMode: "cover",
              // alignSelf: 'center',
            }}
          /> */}
        </View>

        <ScrollView
          style={{
            // marginTop: 30,
            paddingHorizontal: 20,
            // marginVertical: 200,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
              margin: 20,
              marginBottom: 0,
              //padding: 0,
              textDecorationLine: 'underline',
            }}>
            SURAT IZIN KELUAR / MASUK BARANG
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
              margin: 10,
              marginTop: 0,
            }}>
            LETTER OF PERMISSION TO EXIT/ENTRY GOODS
          </Text>
          <View>
            {/* <TextInput
              style={{ marginBottom: 10, paddingHorizontal: 15 }}
              placeholder="Name of Contractor"
              value={formData.contractor_name}
              onChangeText={(text) =>
                setFormData({ ...formData, contractor_name: text })
              }
            />
            <TextInput
              style={{ marginBottom: 10, paddingHorizontal: 15 }}
              placeholder="Name of Sub Contractor"
              value={formData.subcontractor_name}
              onChangeText={(text) =>
                setFormData({ ...formData, subcontractor_name: text })
              }
            />
            <TextInput
              style={{ marginBottom: 10 }}
              placeholder="Name of Site Supervisor"
              value={formData.site_supervisor}
              onChangeText={(text) =>
                setFormData({ ...formData, site_supervisor: text })
              }
            />
            <TextInput
              style={{ marginBottom: 10 }}
              placeholder="Person Responsible"
              value={formData.person_responsible}
              onChangeText={(text) =>
                setFormData({ ...formData, person_responsible: text })
              }
            />
            <TextInput
              style={{ marginBottom: 10 }}
              placeholder="Contact numbers"
              value={formData.contact_number}
              onChangeText={(text) =>
                setFormData({ ...formData, contact_number: text })
              }
            /> */}
            {/* <Text
              style={{
                fontSize: 16,
                //fontWeight: "bold",
                //textAlign: "center",
                margin: 20,
              }}
            >
              Mohon diizinkan kepada pembawa surat ini mengeluarkan / memasukkan
              (*) barang untuk:
            </Text> */}
            <Text
              style={{
                fontSize: 17,
                //fontWeight: "bold",
                //textAlign: "center",
                marginLeft: 10,
              }}>
              Mohon diizinkan kepada pembawa surat ini
            </Text>
            <Picker
              // itemStyle={{
              //   color: "blue",
              // }}
              dropdownIconColor={
                colors.background != 'white' ? 'white' : 'black'
              }
              dropdownIconRippleColor={colors.primary}
              selectedValue={typeInOut}
              style={
                colors.background != 'white'
                  ? {color: 'white'}
                  : {color: 'black'}
              }
              onValueChange={(itemValue, itemIndex) => setTypeInOut(itemValue)}
              numberOfLines={2}>
              <Picker.Item label="mengeluarkan/memasukkan" value="no" />
              <Picker.Item
                //color="blue"
                label="mengeluarkan barang untuk pemohon:"
                value="out"
              />
              <Picker.Item
                label="memasukkan barang untuk pemohon:"
                value="in"
              />
            </Picker>
            {/* <Text
              style={{
                fontSize: 16,
                //fontWeight: "bold",
                //textAlign: "center",
                margin: 20,
              }}
            >
              barang untuk:
            </Text> */}
            {/* <Picker
              selectedValue={typeInOut}
              //style={[styles.picker, iosPickerStyle]}
              onValueChange={(itemValue, itemIndex) => setTypeInOut(itemValue)}
            >
              <Picker.Item label="Pilih keluar/masuk" value="" />
              <Picker.Item label="Keluar" value="out" />
              <Picker.Item label="Masuk" value="in" />
            </Picker> */}
            <Text
              style={{paddingHorizontal: 7, paddingBottom: 2, paddingTop: 20}}>
              Nama Pemohon:{' '}
            </Text>
            <TextInput
              style={{marginBottom: 10, paddingHorizontal: 15}}
              placeholder="Nama Pemohon"
              value={formData.ApplicantName}
              onChangeText={text =>
                setFormData({...formData, ApplicantName: text})
              }
            />
            <Text style={{paddingHorizontal: 7, paddingBottom: 2}}>
              Lantai & No. Unit / Tower:{' '}
            </Text>
            <TextInput
              style={{marginBottom: 10, paddingHorizontal: 15}}
              placeholder="Lantai & No. Unit / Tower"
              value={formData.FloorNoUnitTower}
              onChangeText={text =>
                setFormData({...formData, FloorNoUnitTower: text})
              }
            />
            <Text style={{paddingHorizontal: 7, paddingBottom: 2}}>
              Tanggal Keluar / Masuk Barang:{' '}
            </Text>
            <TextInput
              style={{marginBottom: 10, paddingHorizontal: 15}}
              placeholder="Tanggal Keluar / Masuk Barang"
              value={formData.ExitEntryDate}
              onChangeText={text =>
                setFormData({...formData, ExitEntryDate: text})
              }
            />
            <Text style={{paddingHorizontal: 7, paddingBottom: 2}}>
              Nama Pemilik / Penyewa:{' '}
            </Text>
            <TextInput
              style={{marginBottom: 10, paddingHorizontal: 15}}
              placeholder="Nama Pemilik / Penyewa"
              value={formData.NameofOwnerTenant}
              onChangeText={text =>
                setFormData({...formData, NameofOwnerTenant: text})
              }
            />
            <Text style={{paddingHorizontal: 7, paddingBottom: 2}}>
              No. Telepon:{' '}
            </Text>
            <TextInput
              keyboardType="numeric"
              style={{marginBottom: 10, paddingHorizontal: 15}}
              placeholder="No. Telepon"
              value={formData.NoTelephone}
              onChangeText={text =>
                setFormData({...formData, NoTelephone: text})
              }
            />
            <Text style={{paddingHorizontal: 7, paddingBottom: 2}}>
              Jenis Pekerjaan:{' '}
            </Text>
            <TextInput
              style={{marginBottom: 10, paddingHorizontal: 15}}
              placeholder="Jenis Pekerjaan"
              value={formData.Typeofwork}
              onChangeText={text =>
                setFormData({...formData, Typeofwork: text})
              }
            />

            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
                margin: 20,
              }}>
              Tabel Jenis Barang
            </Text>

            <View>
              {items.length == 0 ? null : (
                <>
                  <ListItem3
                    item={{
                      column1: 'Jenis Barang',
                      column2: 'Jumlah',
                      column3: 'Keterangan',
                    }}
                    onDelete={'header'}
                  />
                </>
              )}
              <FlatList
                data={items}
                renderItem={({item, index}) => (
                  <ListItem3
                    item={item}
                    index={index}
                    onDelete={handleDelete}
                  />
                )}
                keyExtractor={(item, index) => index.toString()}
              />
              {items.length == 0 ? null : (
                <>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      marginVertical: 10,
                    }}>
                    Add Item
                  </Text>
                </>
              )}
              {/* <TextInput
                placeholder="Nama Barang"
                value={itemName}
                onChangeText={(text) => setItemName(text)}
              />
              <TextInput
                style={{ marginTop: 10 }}
                keyboardType="numeric"
                placeholder="Jumlah"
                value={itemQuantity}
                onChangeText={(text) => setItemQuantity(text)}
              /> */}
              <TextInput
                placeholder="Jenis Barang"
                value={item1}
                onChangeText={text => setItem1(text)}
              />
              <TextInput
                style={{marginTop: 10}}
                //keyboardType="numeric"
                placeholder="Jumlah"
                value={item2}
                onChangeText={text => setItem2(text)}
              />
              <TextInput
                style={{marginTop: 10}}
                placeholder="Keterangan"
                value={item3}
                onChangeText={text => setItem3(text)}
              />
              <TouchableOpacity
                style={{
                  paddingVertical: 10,
                  width: 90,
                  marginTop: 20,
                  alignItems: 'center',
                  borderRadius: 8,
                  backgroundColor: colors.primary, //"#315447",
                  alignSelf: 'flex-end',
                }}
                onPress={handleAddItem}>
                <Text style={{color: '#FFF'}}>Tambah Item</Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{paddingHorizontal: 7, paddingBottom: 2, marginTop: 20}}>
              Nama / Pengirim / Pengambil:{' '}
            </Text>
            <TextInput
              style={{marginBottom: 10, paddingHorizontal: 15}}
              placeholder="Nama / Pengirim / Pengambil"
              value={formData.NameSenderTaker}
              onChangeText={text =>
                setFormData({...formData, NameSenderTaker: text})
              }
            />
            <Text style={{paddingHorizontal: 7, paddingBottom: 2}}>
              No. KTP / SIM:{' '}
            </Text>
            <TextInput
              style={{marginBottom: 10, paddingHorizontal: 15}}
              placeholder="No. KTP / SIM"
              value={formData.NoKTPSIM}
              onChangeText={text => setFormData({...formData, NoKTPSIM: text})}
            />
            <Text style={{paddingHorizontal: 7, paddingBottom: 2}}>
              Alamat:{' '}
            </Text>
            <TextInput
              style={{marginBottom: 10, paddingHorizontal: 15}}
              placeholder="Alamat"
              value={formData.Address}
              onChangeText={text => setFormData({...formData, Address: text})}
            />
            <Text style={{paddingHorizontal: 7, paddingBottom: 2}}>
              No. Telepon:{' '}
            </Text>
            <TextInput
              style={{marginBottom: 10, paddingHorizontal: 15}}
              placeholder="No. Telepon"
              value={formData.NoPhone}
              onChangeText={text => setFormData({...formData, NoPhone: text})}
            />
            <Text style={{paddingHorizontal: 7, paddingBottom: 2}}>
              Hari / Tanggal:{' '}
            </Text>
            <TextInput
              style={{marginBottom: 10, paddingHorizontal: 15}}
              placeholder="Hari / Tanggal"
              value={formData.DayDate}
              onChangeText={text => setFormData({...formData, DayDate: text})}
            />
            <Text style={{paddingHorizontal: 7, paddingBottom: 2}}>Jam: </Text>
            <View
              style={{
                //flex: 1,
                flexDirection: 'row',
                //justifyContent: "center", // Center vertically
                alignItems: 'center', // Center horizontally
              }}>
              <TextInput
                //keyboardType="numeric"
                style={{flex: 1, marginBottom: 10, paddingHorizontal: 15}}
                placeholder="00:00"
                value={formData.clock}
                onChangeText={text => setFormData({...formData, clock: text})}
              />
              <Text
                style={{
                  flex: 1,
                  paddingHorizontal: 7,
                  paddingBottom: 2,
                  //justifyContent: "center",
                  textAlign: 'center',
                }}>
                s.d.{' '}
              </Text>
              <TextInput
                style={{flex: 1, marginBottom: 10, paddingHorizontal: 15}}
                placeholder="00:00"
                value={formData.to}
                onChangeText={text => setFormData({...formData, to: text})}
              />
            </View>
            <Text style={{paddingHorizontal: 7, paddingBottom: 2}}>
              Jenis Kendaraan:{' '}
            </Text>
            <TextInput
              style={{marginBottom: 10, paddingHorizontal: 15}}
              placeholder="Jenis Kendaraan"
              value={formData.VehicleType}
              onChangeText={text =>
                setFormData({...formData, VehicleType: text})
              }
            />
            <Text style={{paddingHorizontal: 7, paddingBottom: 2}}>
              No Kendaraan:{' '}
            </Text>
            <TextInput
              style={{marginBottom: 10, paddingHorizontal: 15}}
              placeholder="No Kendaraan"
              value={formData.VehicleNumber}
              onChangeText={text =>
                setFormData({...formData, VehicleNumber: text})
              }
            />

            <Text
              style={{
                fontSize: 16,
                //fontWeight: "bold",
                //textAlign: "center",
                margin: 20,
              }}>
              Tenant / Kontraktor harus memenuhi peraturan yang berlaku sbb:
            </Text>
            <Text
              style={{
                fontSize: 16,
                marginHorizontal: 20,
                textAlign: 'justify',
                //textAlignLast: "justify",
                marginBottom: 7,
              }}>
              1. Waktu memasukkan / mengeluarkan barang diizinkan pkl 22.00 –
              10.00 WIB kecuali ada izin khusus. ( sebelum dan setelah selesai
              memasukkan / mengeluarkan barang harus melapor kepada security )
            </Text>
            <Text
              style={{
                fontSize: 16,
                marginHorizontal: 20,
                textAlign: 'justify',
                //textAlignLast: "justify",
                marginBottom: 7,
              }}>
              2. Menjaga kebersihan pada saat dan setelah memasukkan /
              mengeluarkan barang.
            </Text>
            <Text
              style={{
                fontSize: 16,
                marginHorizontal: 20,
                textAlign: 'justify',
                //textAlignLast: "justify",
                marginBottom: 7,
              }}>
              3. Bertanggung jawab atas segala akibat yang disebabkan oleh
              karyawan yang bersangkutan.
            </Text>
            <Text
              style={{
                fontSize: 16,
                marginHorizontal: 20,
                textAlign: 'justify',
                //textAlignLast: "justify",
                marginBottom: 7,
              }}>
              4. Untuk tenant / unit yang tutup , kunci harap diserahkan kepada
              Badan Pengelola pada saat batas akhir tanggal masuk / keluar
              barang.
            </Text>
            <Text
              style={{
                fontSize: 16,
                marginHorizontal: 20,
                textAlign: 'justify',
                //textAlignLast: "justify",
                marginBottom: 7,
              }}>
              5. Badan Pengelola berhak memberhentikan dan mencabut surat izin
              keluar masuk barang sewaktu-waktu jika terjadi pelanggaran tata
              tertib ini.
            </Text>
          </View>
          <View style={styles.nextButtonContainer}>
            <TouchableOpacity
              onPress={() => handleNextScreen()}
              style={[styles.nextButton, {backgroundColor: colors.primary}]}>
              <Text style={styles.nextButtonText}>Submit</Text>
              <Icon name="chevron-right" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <Modal
            transparent={false}
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}>
            <ScrollView>
              <View style={styles.modalContainer}>
                <View
                  style={[
                    styles.modalContent,
                    {
                      backgroundColor:
                        colors.background != 'white' ? 'black' : 'white',
                    },
                  ]}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      margin: 20,
                    }}>
                    Confirm Form
                  </Text>
                  {/* <Text>Name of Contractor</Text>
                <Text style={{ marginBottom: 8 }}>
                  {"          : " + formData.contractor_name}
                </Text>
                <Text>Name of Sub Contractor</Text>
                <Text style={{ marginBottom: 8 }}>
                  {"          : " + formData.subcontractor_name}
                </Text> */}
                  <Text
                    style={{
                      fontSize: 16,
                      //fontWeight: "bold",
                      //textAlign: "center",
                      margin: 20,
                    }}>
                    Mohon diizinkan kepada pembawa surat ini{' '}
                    <Text
                      style={{
                        //textDecorationLine: "underline",
                        fontWeight: 'bold',
                      }}>
                      {typeInOut == 'in'
                        ? 'memasukkan barang'
                        : 'mengeluarkan barang'}
                    </Text>{' '}
                    untuk:
                  </Text>
                  <Text>Nama Pemohon</Text>
                  <Text style={{marginBottom: 8}}>
                    {'          : ' + formData.ApplicantName}
                  </Text>
                  <Text>Lantai & No . Unit / Tower</Text>
                  <Text style={{marginBottom: 8}}>
                    {'          : ' + formData.FloorNoUnitTower}
                  </Text>
                  <Text>Tanggal Keluar / Masuk Barang</Text>
                  <Text style={{marginBottom: 8}}>
                    {'          : ' + formData.ExitEntryDate}
                  </Text>
                  <Text>Nama Pemilik / Penyewa</Text>
                  <Text style={{marginBottom: 8}}>
                    {'          : ' + formData.NameofOwnerTenant}
                  </Text>
                  <Text>No. Telepon</Text>
                  <Text style={{marginBottom: 8}}>
                    {'          : ' + formData.NoTelephone}
                  </Text>
                  <Text>Jenis Pekerjaan</Text>
                  <Text style={{marginBottom: 8}}>
                    {'          : ' + formData.Typeofwork}
                  </Text>

                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      margin: 20,
                    }}>
                    Tabel Jenis Barang
                  </Text>

                  {items.length == 0 ? null : (
                    <>
                      <ListItem3
                        item={{
                          column1: 'Jenis Barang',
                          column2: 'Jumlah',
                          column3: 'Keterangan',
                        }}
                        onDelete={'header'}
                      />
                    </>
                  )}
                  <FlatList
                    data={items}
                    renderItem={({item, index}) => (
                      <ListItem3 item={item} index={index} onDelete={'modal'} />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                  />

                  <Text style={{marginTop: 25}}>
                    Nama / Pengirim / Pengambil
                  </Text>
                  <Text style={{marginBottom: 8}}>
                    {'          : ' + formData.NameSenderTaker}
                  </Text>
                  <Text>No. KTP / SIM</Text>
                  <Text style={{marginBottom: 8}}>
                    {'          : ' + formData.NoKTPSIM}
                  </Text>
                  <Text>Alamat</Text>
                  <Text style={{marginBottom: 8}}>
                    {'          : ' + formData.Address}
                  </Text>
                  <Text>No. Telepon</Text>
                  <Text style={{marginBottom: 8}}>
                    {'          : ' + formData.NoPhone}
                  </Text>
                  <Text>Hari / Tanggal</Text>
                  <Text style={{marginBottom: 8}}>
                    {'          : ' + formData.DayDate}
                  </Text>
                  <Text>Jam</Text>
                  <View
                    style={{
                      //flex: 1,
                      flexDirection: 'row',
                      //justifyContent: "center", // Center vertically
                      alignItems: 'center', // Center horizontally
                    }}>
                    <Text style={{marginBottom: 8}}>
                      {'          : ' + formData.clock + ' s.d. ' + formData.to}
                    </Text>
                  </View>
                  <Text>Jenis Kendaraan</Text>
                  <Text style={{marginBottom: 8}}>
                    {'          : ' + formData.VehicleType}
                  </Text>
                  <Text>No Kendaraan</Text>
                  <Text style={{marginBottom: 8}}>
                    {'          : ' + formData.VehicleNumber}
                  </Text>

                  <TouchableOpacity
                    onPress={() => handleSubmit()}
                    style={[
                      styles.closeButton,
                      {
                        marginVertical: 10,
                        marginTop: 40,
                        marginHorizontal: 100,
                        backgroundColor: colors.primary,
                      },
                    ]}>
                    <Text style={styles.closeButtonText}>Submit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={[
                      styles.closeButton,
                      {backgroundColor: colors.primary},
                    ]}>
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
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
                  <Picker.Item label="Electronic" value="Electronic" />
                  <Picker.Item
                    label="Mechanical Plumbing"
                    value="Mechanical Plumbing"
                  />
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
    </SafeAreaView>
  );
}
