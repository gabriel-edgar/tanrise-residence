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
} from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
import { FFriends } from "@data";
import { useNavigation } from "@react-navigation/native";
import { haveChildren } from "@utils";
import React, { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  TouchableOpacity,
  View,
  //Picker,
  Modal,
  Platform,
  ScrollView,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import axios from "axios";
import styles from "./styles";

import { Picker } from "@react-native-picker/picker";

export default function SuratIzinKerja() {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  console.log("42 colors: ", colors);
  const [loading, setLoading] = useState(true);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedValue1, setSelectedValue1] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [formData, setFormData] = useState({
    contractor_name: "",
    subcontractor_name: "",
    site_supervisor: "",
    person_responsible: "",
    contact_number: "",
    number_works: "",

    TenantName: "",
    FloorNoUnitTower: "",
    ContractorName: "",
    NameofResponsiblePerson: "",
    TelOfficeMobile: "",
    Typeofwork: "",
    Dateofwork: "",
    //Hoursofwork: "",
    numberofWorkers: "",
  });
  const iosPickerStyle = Platform.OS === "ios" ? styles.iosPicker : null;

  const tomorrow = new Date();
  // const format = moment(tomorrow).add(1, 'days').format('YYYY-MM-DD');
  const format = moment(tomorrow).format("YYYY-MM-DD");
  const [date, setDate] = useState(new Date());
  const [selectedDate, setselectedDate] = useState(false);
  const [open, setOpen] = useState(false);

  const [items, setItems] = useState([]);
  // const [itemName, setItemName] = useState("");
  // const [itemQuantity, setItemQuantity] = useState("");
  const [item1, setItem1] = useState("");
  const [item2, setItem2] = useState("");
  const [item3, setItem3] = useState("");

  // const handleAddItem = () => {
  //   if (itemName && itemQuantity) {
  //     setItems([...items, { name: itemName, quantity: itemQuantity }]);
  //     setItemName("");
  //     setItemQuantity("");
  //   }
  // };

  const handleAddItem = () => {
    if (item1 && item2 && item3) {
      setItems([...items, { column1: item1, column2: item2, column3: item3 }]);
      setItem1("");
      setItem2("");
      setItem3("");
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
    setModalVisible(true);

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

  const handleDelete = (targetIndex) => {
    const updatedItems = items.filter((item, index) => index !== targetIndex);
    setItems(updatedItems);
  };

  const [option1Checked, setOption1Checked] = useState(false);
  const [option2Checked, setOption2Checked] = useState(false);
  const [option3Checked, setOption3Checked] = useState(false);
  const [lainLain, setlainLain] = useState("");
  // const [option4Checked, setOption4Checked] = useState(false);
  // const [option5Checked, setOption5Checked] = useState(false);
  // const [optionJamKerja, setOptionJamKerja] = useState({
  //   option1: false,
  //   option2: false,
  //   option3: false,
  // });

  const [jamKerja, setJamKerja] = useState("");

  dummyArrayValue = ["Pkl 10.00 - 22.00", "Pkl 22.00 - 10.00", "Lain-lain"];

  const handleOptionSelect = (option) => {
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
      case "option1":
        setOption1Checked(true);
        setJamKerja(dummyArrayValue[0]);
        break;
      case "option2":
        setOption2Checked(true);
        setJamKerja(dummyArrayValue[1]);
        break;
      case "option3":
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
      edges={["right", "top", "left"]}
    >
      <View style={{ justifyContent: "center" }}>
        <View
          style={{
            alignContent: "center",
            marginHorizontal: 30,
            // borderWidth: 1,
            // borderColor: '#000'
          }}
        >
          {/* <Image
            source={require("@assets/images/form.png")}
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
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "center",
              margin: 20,
              marginBottom: 0,
              //padding: 0,
              textDecorationLine: "underline",
            }}
          >
            SURAT IZIN KERJA
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "center",
              margin: 10,
              marginTop: 0,
            }}
          >
            WORKING PERMIT
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
            <Text style={{ paddingHorizontal: 7, paddingBottom: 2 }}>
              Nama Tenant:{" "}
            </Text>
            <TextInput
              style={{ marginBottom: 10, paddingHorizontal: 15 }}
              placeholder="Nama Tenant"
              value={formData.TenantName}
              onChangeText={(text) =>
                setFormData({ ...formData, TenantName: text })
              }
            />
            <Text style={{ paddingHorizontal: 7, paddingBottom: 2 }}>
              Lantai & No . Unit / Tower:{" "}
            </Text>
            <TextInput
              style={{ marginBottom: 10, paddingHorizontal: 15 }}
              placeholder="Lantai & No . Unit / Tower"
              value={formData.FloorNoUnitTower}
              onChangeText={(text) =>
                setFormData({ ...formData, FloorNoUnitTower: text })
              }
            />
            <Text style={{ paddingHorizontal: 7, paddingBottom: 2 }}>
              Nama Kontraktor:{" "}
            </Text>
            <TextInput
              style={{ marginBottom: 10, paddingHorizontal: 15 }}
              placeholder="Nama Kontraktor"
              value={formData.ContractorName}
              onChangeText={(text) =>
                setFormData({ ...formData, ContractorName: text })
              }
            />
            <Text style={{ paddingHorizontal: 7, paddingBottom: 2 }}>
              Nama Penanggung Jawab:{" "}
            </Text>
            <TextInput
              style={{ marginBottom: 10, paddingHorizontal: 15 }}
              placeholder="Nama Penanggung Jawab"
              value={formData.NameofResponsiblePerson}
              onChangeText={(text) =>
                setFormData({ ...formData, NameofResponsiblePerson: text })
              }
            />
            <Text style={{ paddingHorizontal: 7, paddingBottom: 2 }}>
              Telp. Kantor / HP:{" "}
            </Text>
            <TextInput
              style={{ marginBottom: 10, paddingHorizontal: 15 }}
              placeholder="Telp. Kantor / HP"
              value={formData.TelOfficeMobile}
              onChangeText={(text) =>
                setFormData({ ...formData, TelOfficeMobile: text })
              }
            />
            <Text style={{ paddingHorizontal: 7, paddingBottom: 2 }}>
              Jenis Pekerjaan:{" "}
            </Text>
            <TextInput
              style={{ marginBottom: 10, paddingHorizontal: 15 }}
              placeholder="Jenis Pekerjaan"
              value={formData.Typeofwork}
              onChangeText={(text) =>
                setFormData({ ...formData, Typeofwork: text })
              }
            />
            <Text style={{ paddingHorizontal: 7, paddingBottom: 2 }}>
              Tanggal Kerja:{" "}
            </Text>
            <TextInput
              style={{ marginBottom: 10, paddingHorizontal: 15 }}
              placeholder="Tanggal Kerja"
              value={formData.Dateofwork}
              onChangeText={(text) =>
                setFormData({ ...formData, Dateofwork: text })
              }
            />

            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
                marginVertical: 20,
              }}
            >
              Jam Kerja
            </Text>

            <View
              style={{
                flexDirection: "row",
                //justifyContent: "space-around",
              }}
            >
              <CheckBox
                tintColors={{
                  true: colors.primary,
                  false: colors.background != "white" ? "white" : "black",
                }}
                disabled={false}
                animationDuration={0.2}
                value={option1Checked}
                style={[
                  styles.checkBoxSize,
                  {
                    // backgroundColor:
                    //   colors.background != "white" ? "white" : null,
                  },
                ]}
                onValueChange={() => handleOptionSelect("option1")}
              />
              <Text style={styles.checkBoxFontSize}>Pkl 10.00 - 22.00</Text>

              <CheckBox
                tintColors={{
                  true: colors.primary,
                  false: colors.background != "white" ? "white" : "black",
                }}
                disabled={false}
                animationDuration={0.2}
                value={option2Checked}
                style={[
                  styles.checkBoxSize,
                  {
                    // backgroundColor:
                    //   colors.background != "white" ? "white" : null,
                  },
                ]}
                onValueChange={() => handleOptionSelect("option2")}
              />
              <Text style={styles.checkBoxFontSize}>Pkl 22.00 - 10.00</Text>

              {/* <CheckBox
                disabled={false}
                animationDuration={0.2}
                value={option3Checked}
                style={styles.checkBoxSize}
                onValueChange={() => handleOptionSelect("option3")}
              />
              <Text style={styles.checkBoxFontSize}>Lain-lain</Text> */}
            </View>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <CheckBox
                tintColors={{
                  true: colors.primary,
                  false: colors.background != "white" ? "white" : "black",
                }}
                disabled={false}
                animationDuration={0.2}
                value={option3Checked}
                style={[
                  styles.checkBoxSize,
                  {
                    // backgroundColor:
                    //   colors.background != "white" ? "white" : null,
                  },
                ]}
                onValueChange={() => handleOptionSelect("option3")}
              />
              <Text style={styles.checkBoxFontSize}>Lain-lain:</Text>
              <TextInput
                style={{ marginBottom: 10, paddingHorizontal: 15 }}
                placeholder="Isi Jam Kerja"
                value={lainLain}
                onChangeText={
                  option3Checked == false
                    ? (text) => setlainLain(text)
                    : (text) => {
                        setlainLain(text);
                        setJamKerja(text);
                      }
                }
              />
              {/* <CheckBox
                disabled={false}
                animationDuration={0.2}
                value={option4Checked}
                style={styles.checkBoxSize}
                onValueChange={() => handleOptionSelect("option4")}
              />
              <Text style={styles.checkBoxFontSize}>
                Renewal {"(Redesign)"}
              </Text>

              <CheckBox
                disabled={false}
                animationDuration={0.2}
                value={option5Checked}
                style={styles.checkBoxSize}
                onValueChange={() => handleOptionSelect("option5")}
              />
              <Text style={styles.checkBoxFontSize}>Relocation</Text> */}
            </View>

            <Text
              style={{
                fontSize: 16,
                //fontWeight: "bold",
                //textAlign: "center",
                margin: 20,
              }}
            >
              Dengan ini diberikan izin pekerjaan di area Carstensz Residence &
              Mall , dengan rincian sebagai berikut :
            </Text>

            <View>
              {items.length == 0 ? null : (
                <>
                  <ListItem3
                    item={{
                      column1: "Jenis Pekerjaan / Kegiatan",
                      column2: "Peralatan / Alat Pelindung Diri",
                      column3: "Keterangan",
                    }}
                    onDelete={"header"}
                  />
                </>
              )}
              <FlatList
                data={items}
                renderItem={({ item, index }) => (
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
                      fontWeight: "bold",
                      textAlign: "center",
                      marginVertical: 10,
                    }}
                  >
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
                placeholder="Jenis Pekerjaan / Kegiatan"
                value={item1}
                onChangeText={(text) => setItem1(text)}
              />
              <TextInput
                style={{ marginTop: 10 }}
                //keyboardType="numeric"
                placeholder="Peralatan / Alat Pelindung Diri"
                value={item2}
                onChangeText={(text) => setItem2(text)}
              />
              <TextInput
                style={{ marginTop: 10 }}
                placeholder="Keterangan"
                value={item3}
                onChangeText={(text) => setItem3(text)}
              />
              <TouchableOpacity
                style={{
                  paddingVertical: 10,
                  width: 90,
                  marginTop: 20,
                  alignItems: "center",
                  borderRadius: 8,
                  backgroundColor: colors.primary, //"#315447",
                  alignSelf: "flex-end",
                }}
                onPress={handleAddItem}
              >
                <Text style={{ color: "#FFF" }}>Tambah Item</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ paddingHorizontal: 7, paddingBottom: 2 }}>
              Jumlah Pekerja (Orang):{" "}
            </Text>
            <TextInput
              style={{ marginVertical: 10, paddingHorizontal: 15 }}
              keyboardType="numeric"
              placeholder="Jumlah Pekerja (Orang)"
              value={formData.numberofWorkers}
              onChangeText={(text) =>
                setFormData({ ...formData, numberofWorkers: text })
              }
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                //textAlign: "center",
                margin: 20,
              }}
            >
              Catatan:
            </Text>
            <Text
              style={{
                fontSize: 16,
                marginHorizontal: 20,
                textAlign: "justify",
                //textAlignLast: "justify",
                marginBottom: 7,
              }}
            >
              1. Setiap pekerja diwajibkan membawa peralatan safety yang sesuai
              dengan bidang pekerjaannya. Untuk itu, setiap kontraktor diminta
              untuk menanyakan / mendapatkan informasi jelas mengenai Standart
              of Safety Prosedure dari Departement HSE. Building Management
              berhak menghentikan pekerjaan apabila tidak melaksanakan prosedur
              Safety selama bekerja di lingkungan gedung.
            </Text>
            <Text
              style={{
                fontSize: 16,
                marginHorizontal: 20,
                textAlign: "justify",
                //textAlignLast: "justify",
                marginBottom: 7,
              }}
            >
              2. Setiap pekerja wajib menggunakan kartu pengenal (No ID, No
              Entry) di area Carstensz Residence & Mall .
            </Text>
            <Text
              style={{
                fontSize: 16,
                marginHorizontal: 20,
                textAlign: "justify",
                //textAlignLast: "justify",
                marginBottom: 7,
              }}
            >
              3. Puing dan Sampah setiap pekerjaan harus dibungkus dan dibuang
              keluar area Carstensz Residence & Mall .
            </Text>
            <Text
              style={{
                fontSize: 16,
                marginHorizontal: 20,
                textAlign: "justify",
                //textAlignLast: "justify",
                marginBottom: 7,
              }}
            >
              4. Waktu pengurusan izin kerja adalah pada hari kerja 09.00 -
              17.00 ( Senin - Jumat ) di Badan Pengelola lantai 3 .
            </Text>
            <Text
              style={{
                fontSize: 16,
                marginHorizontal: 20,
                textAlign: "justify",
                //textAlignLast: "justify",
                marginBottom: 0,
              }}
            >
              5. Badan Pengelola berhak memberhentikan dan mencabut surat izin
              kerja ini sewaktu - waktu jika tenant / kontraktor melanggar tata
              tertib kerja .
            </Text>
          </View>
          <View style={styles.nextButtonContainer}>
            <TouchableOpacity
              onPress={() => handleNextScreen()}
              style={[styles.nextButton, { backgroundColor: colors.primary }]}
            >
              <Text
                style={[
                  styles.nextButtonText,
                  colors.primary == "#FDC60A" ? { color: "white" } : null,
                ]}
              >
                Submit
              </Text>
              <Icon name="chevron-right" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <Modal
            transparent={false}
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
            <ScrollView>
              <View style={styles.modalContainer}>
                <View
                  style={[
                    styles.modalContent,
                    {
                      backgroundColor:
                        colors.background != "white" ? "black" : "white",
                    },
                  ]}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      textAlign: "center",
                      margin: 20,
                    }}
                  >
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
                  <Text>Nama Tenant</Text>
                  <Text style={{ marginBottom: 8 }}>
                    {"          : " + formData.TenantName}
                  </Text>
                  <Text>Lantai & No . Unit / Tower</Text>
                  <Text style={{ marginBottom: 8 }}>
                    {"          : " + formData.FloorNoUnitTower}
                  </Text>
                  <Text>Nama Kontraktor</Text>
                  <Text style={{ marginBottom: 8 }}>
                    {"          : " + formData.ContractorName}
                  </Text>
                  <Text>Nama Penanggung Jawab</Text>
                  <Text style={{ marginBottom: 8 }}>
                    {"          : " + formData.NameofResponsiblePerson}
                  </Text>
                  <Text>Telp. Kantor / HP</Text>
                  <Text style={{ marginBottom: 8 }}>
                    {"          : " + formData.TelOfficeMobile}
                  </Text>
                  <Text>Jenis Pekerjaan</Text>
                  <Text style={{ marginBottom: 8 }}>
                    {"          : " + formData.Typeofwork}
                  </Text>
                  <Text>Tanggal Kerja</Text>
                  <Text style={{ marginBottom: 8 }}>
                    {"          : " + formData.Dateofwork}
                  </Text>
                  <Text>Jam Kerja</Text>
                  <Text style={{ marginBottom: 8 }}>
                    {"          : " + jamKerja}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      //fontWeight: "bold",
                      //textAlign: "center",
                      margin: 20,
                    }}
                  >
                    Dengan ini diberikan izin pekerjaan di area Carstensz
                    Residence & Mall , dengan rincian sebagai berikut :
                  </Text>
                  {items.length == 0 ? null : (
                    <>
                      <ListItem3
                        item={{
                          column1: "Jenis Pekerjaan / Kegiatan",
                          column2: "Peralatan / Alat Pelindung Diri",
                          column3: "Keterangan",
                        }}
                        onDelete={"header"}
                      />
                    </>
                  )}
                  <FlatList
                    data={items}
                    renderItem={({ item, index }) => (
                      <ListItem3 item={item} index={index} onDelete={"modal"} />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                  />
                  <Text style={{ marginTop: 20 }}>Jumlah Pekerja</Text>
                  <Text style={{ marginBottom: 8 }}>
                    {formData.numberofWorkers != ""
                      ? "          : " + formData.numberofWorkers + " Orang"
                      : "          : " + formData.numberofWorkers}
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
                    ]}
                  >
                    <Text style={styles.closeButtonText}>Submit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={[
                      styles.closeButton,
                      { backgroundColor: colors.primary },
                    ]}
                  >
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
            }}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Picker
                  selectedValue={selectedValue1}
                  style={[styles.picker, iosPickerStyle]}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedValue1(itemValue)
                  }
                >
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
                  style={styles.closeButton}
                >
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
