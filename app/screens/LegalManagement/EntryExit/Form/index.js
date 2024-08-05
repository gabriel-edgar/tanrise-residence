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
  // Text,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import axios from "axios";
import styles from "./styles";

export default function ContractInformation() {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const [loading, setLoading] = useState(true);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedValue1, setSelectedValue1] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [formData, setFormData] = useState({
    company_name: "",
    address: "",
    phone: "",
    trade_name: "",
  });
  const [option1Checked, setOption1Checked] = useState(false);
  const [option2Checked, setOption2Checked] = useState(false);
  const [option3Checked, setOption3Checked] = useState(false);
  const [option4Checked, setOption4Checked] = useState(false);
  const [option5Checked, setOption5Checked] = useState(false);

  const iosPickerStyle = Platform.OS === "ios" ? styles.iosPicker : null;

  const handleOptionSelect = (option) => {
    setOption1Checked(false);
    setOption2Checked(false);
    setOption3Checked(false);
    setOption4Checked(false);
    setOption5Checked(false);

    switch (option) {
      case "option1":
        setOption1Checked(true);
        break;
      case "option2":
        setOption2Checked(true);
        break;
      case "option3":
        setOption3Checked(true);
        break;
      case "option4":
        setOption4Checked(true);
        break;
      case "option5":
        setOption5Checked(true);
        break;
      default:
        break;
    }
  };
  const navigation = useNavigation();
  const handleNextScreen = () => {
    // Ganti 'NextScreen' dengan nama screen tujuan untuk navigasi
    navigation.navigate("ContractorPermitExit");
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={["right", "top", "left"]}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 120,
        }}
      >
        <Image
          source={require("@assets/images/goods.png")}
          style={{
            height: 200,
            width: 300,
            // marginHorizontal: 100,
            // flexDirection: 'row',
            resizeMode: "cover",
            // alignSelf: 'center',
          }}
        />
        <View style={{ marginTop: 20 }}>
          <Text
            style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}
          >
            Fill your form below
          </Text>
          <Text
            style={{
              marginTop: 10,
              fontSize: 16,
              fontWeight: "100",
              textAlign: "center",
            }}
          >
            Please fill in the forms
          </Text>
          <Text
            style={{ fontSize: 16, fontWeight: "100", textAlign: "center" }}
          >
            below for permit request data
          </Text>
        </View>

        <View
          style={{
            marginTop: 30,
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "center",
              // marginBottom: 20,
            }}
          >
            Company Information
          </Text>

          <ScrollView
            style={{
              marginTop: 10,
              paddingHorizontal: 10,
            }}
          >
            <View style={{ width: 350 }}>
              <TextInput
                style={{ marginBottom: 10, marginTop: 10 }}
                placeholder="Company Name"
                value={formData.company_name}
                onChangeText={(text) =>
                  setFormData({ ...formData, company_name: text })
                }
              />
              <TextInput
                style={{ marginBottom: 10 }}
                placeholder="Address"
                value={formData.address}
                onChangeText={(text) =>
                  setFormData({ ...formData, address: text })
                }
              />
              <TextInput
                style={{ marginBottom: 10 }}
                placeholder="Phone"
                value={formData.phone}
                onChangeText={(text) =>
                  setFormData({ ...formData, phone: text })
                }
              />
              <TextInput
                style={{ marginBottom: 10 }}
                placeholder="Tenant Trade Name"
                value={formData.trade_name}
                onChangeText={(text) =>
                  setFormData({ ...formData, trade_name: text })
                }
              />
            </View>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.button}
            >
              <Text
                style={
                  selectedValue === ""
                    ? { color: "#A4A4A4" }
                    : { color: "black" }
                }
              >
                {selectedValue !== "" ? selectedValue : "Unit Number"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible1(true)}
              style={styles.button}
            >
              <Text
                style={
                  selectedValue1 === ""
                    ? { color: "#A4A4A4" }
                    : { color: "black" }
                }
              >
                {selectedValue1 !== "" ? selectedValue1 : "Location"}
              </Text>
            </TouchableOpacity>
          </ScrollView>

          <Modal
            transparent={true}
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Picker
                  selectedValue={selectedValue}
                  style={[styles.picker, iosPickerStyle]}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedValue(itemValue)
                  }
                >
                  <Picker.Item label="Select an option" value="" />
                  <Picker.Item label="E11A" value="E11A" />
                  {/* ... add more dropdown options */}
                </Picker>

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
            transparent={false}
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
                  <Picker.Item label="UG # 1" value="UG # 1" />
                  <Picker.Item label="UG # 2" value="UG # 2" />
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
        </View>
      </View>
      <View style={styles.nextButtonContainer}>
        <TouchableOpacity
          onPress={() => handleNextScreen()}
          style={styles.nextButton}
        >
          <Text style={styles.nextButtonText}>Next</Text>
          <Icon name="chevron-right" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
