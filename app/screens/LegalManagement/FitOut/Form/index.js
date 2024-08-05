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
  // Text,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import axios from "axios";
import styles from "./styles";

export default function FormPermitFitOut() {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const [loading, setLoading] = useState(true);
  const [selectedValue, setSelectedValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    shop_name: "",
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
    navigation.navigate("TenantInformation");
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
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          source={require("@assets/images/form.png")}
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
            paddingHorizontal: 30,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            Shop Information
          </Text>
          <View
            style={{
              paddingHorizontal: 10,
            }}
          >
            <TextInput
              style={{ marginBottom: 10 }}
              placeholder="Shop Name"
              value={formData.shop_name}
              onChangeText={(text) =>
                setFormData({ ...formData, shop_name: text })
              }
            />
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
            {/* checkbox */}
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "left",
                marginBottom: 20,
              }}
            >
              Leasing Status
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
              <Text style={styles.checkBoxFontSize}>Food Beverage</Text>

              <CheckBox
                disabled={false}
                animationDuration={0.2}
                value={option2Checked}
                style={styles.checkBoxSize}
                onValueChange={() => handleOptionSelect("option2")}
              />
              <Text style={styles.checkBoxFontSize}>Non F & B</Text>

              <CheckBox
                disabled={false}
                animationDuration={0.2}
                value={option3Checked}
                style={styles.checkBoxSize}
                onValueChange={() => handleOptionSelect("option3")}
              />
              <Text style={styles.checkBoxFontSize}>New Tenant</Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <CheckBox
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
              <Text style={styles.checkBoxFontSize}>Relocation</Text>
            </View>
            {/* checkbox end*/}
            <View style={{ marginTop: 20 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  textAlign: "left",
                  marginBottom: 20,
                }}
              >
                Lease Period
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
                01 Oct 2023 - 31 Oct 2024 {"(12 Months)"}
              </Text>
            </View>
          </View>

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
