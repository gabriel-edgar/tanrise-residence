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
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    owner_name: "",
    person_charge: "",
    phone: "",
    email: "",
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
    navigation.navigate("ContractorPermit");
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setFormData({
        ...formData,
        owner_name: "Renaldy Mukriyanto",
        phone: "082361286343",
      });
      setSelectedValue("E11A");
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
          source={require("@assets/images/formrenovation.png")}
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
            Owner / Tenant Information
          </Text>

          <ScrollView
            style={{
              marginTop: 10,
              paddingHorizontal: 10,
            }}
          >
            <View style={{ width: 350 }}>
              <TextInput
                style={{ marginBottom: 10 }}
                placeholder="Owner / Tenant Name"
                value={formData.owner_name}
                onChangeText={(text) =>
                  setFormData({ ...formData, owner_name: text })
                }
              />
              <TextInput
                style={{ marginBottom: 10 }}
                placeholder="Person in charge"
                value={formData.person_charge}
                onChangeText={(text) =>
                  setFormData({ ...formData, person_charge: text })
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
                placeholder="Email"
                value={formData.email}
                onChangeText={(text) =>
                  setFormData({ ...formData, email: text })
                }
              />
            </View>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.button}
            >
              <Text
                style={
                  selectedValue === "" ? { color: "black" } : { color: "black" }
                }
              >
                {selectedValue !== "" ? selectedValue : "Unit Number"}
              </Text>
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "left",
                marginBottom: 20,
              }}
            >
              Building Status
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
              <Text style={styles.checkBoxFontSize}>Business</Text>

              <CheckBox
                disabled={false}
                animationDuration={0.2}
                value={option2Checked}
                style={styles.checkBoxSize}
                onValueChange={() => handleOptionSelect("option2")}
              />
              <Text style={styles.checkBoxFontSize}>Non Business</Text>
            </View>

            <View style={{ marginTop: 20 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  textAlign: "left",
                  marginBottom: 20,
                }}
              >
                Working Period
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  // fontWeight: 'bold',
                  textAlign: "left",
                  marginBottom: 20,
                  fontStyle: "italic",
                }}
              >
                04 Oct 2023
              </Text>
            </View>
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
