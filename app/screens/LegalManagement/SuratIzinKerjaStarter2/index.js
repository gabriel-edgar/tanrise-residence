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
  ListItem2,
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
  Picker,
  Modal,
  Platform,
  ScrollView,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import axios from "axios";
import styles from "./styles";

export default function SuratIzinKerja() {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
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
  });
  const iosPickerStyle = Platform.OS === "ios" ? styles.iosPicker : null;

  const tomorrow = new Date();
  // const format = moment(tomorrow).add(1, 'days').format('YYYY-MM-DD');
  const format = moment(tomorrow).format("YYYY-MM-DD");
  const [date, setDate] = useState(new Date());
  const [selectedDate, setselectedDate] = useState(false);
  const [open, setOpen] = useState(false);

  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");

  const handleAddItem = () => {
    if (itemName && itemQuantity) {
      setItems([...items, { name: itemName, quantity: itemQuantity }]);
      setItemName("");
      setItemQuantity("");
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
            }}
          >
            Contractor Information
          </Text>
          <View>
            <TextInput
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
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <CheckBox
                disabled={false}
                animationDuration={0.2}
                value={option1Checked}
                style={styles.checkBoxSize}
                onValueChange={() => handleOptionSelect("option1")}
              />
              <Text style={styles.checkBoxFontSize}>Pkl 10.00 - 22.00</Text>

              <CheckBox
                disabled={false}
                animationDuration={0.2}
                value={option2Checked}
                style={styles.checkBoxSize}
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
                disabled={false}
                animationDuration={0.2}
                value={option3Checked}
                style={styles.checkBoxSize}
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
                fontWeight: "bold",
                textAlign: "center",
                margin: 20,
              }}
            >
              List of Items
            </Text>

            <View>
              {items.length == 0 ? null : (
                <>
                  <ListItem2
                    item={{ name: "Nama Barang", quantity: "Jumlah" }}
                    onDelete={"header"}
                  />
                </>
              )}
              <FlatList
                data={items}
                renderItem={({ item, index }) => (
                  <ListItem2
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
                      marginBottom: 10,
                    }}
                  >
                    Add Item
                  </Text>
                </>
              )}
              <TextInput
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
              />
              <TouchableOpacity
                style={{
                  paddingVertical: 10,
                  width: 90,
                  marginTop: 20,
                  alignItems: "center",
                  borderRadius: 8,
                  backgroundColor: "#315447",
                  alignSelf: "flex-end",
                }}
                onPress={handleAddItem}
              >
                <Text style={{ color: "#FFF" }}>Tambah Item</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.nextButtonContainer}>
            <TouchableOpacity
              onPress={() => handleNextScreen()}
              style={styles.nextButton}
            >
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
            }}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
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
                <Text>Name of Contractor</Text>
                <Text style={{ marginBottom: 8 }}>
                  {"          : " + formData.contractor_name}
                </Text>
                <Text>Name of Sub Contractor</Text>
                <Text style={{ marginBottom: 8 }}>
                  {"          : " + formData.subcontractor_name}
                </Text>
                <Text>Jam Kerja</Text>
                <Text style={{ marginBottom: 8 }}>
                  {"          : " + jamKerja}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    textAlign: "center",
                    margin: 20,
                  }}
                >
                  List of Items
                </Text>
                {items.length == 0 ? null : (
                  <>
                    <ListItem2
                      item={{ name: "Nama Barang", quantity: "Jumlah" }}
                      onDelete={"header"}
                    />
                  </>
                )}
                <FlatList
                  data={items}
                  renderItem={({ item, index }) => (
                    <ListItem2 item={item} index={index} onDelete={"modal"} />
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  style={[
                    styles.closeButton,
                    {
                      marginVertical: 10,
                      marginTop: 40,
                      marginHorizontal: 100,
                    },
                  ]}
                >
                  <Text style={styles.closeButtonText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.closeButton}
                >
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
