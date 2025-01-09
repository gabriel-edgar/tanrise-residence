import {
  Button,
  Header,
  Icon,
  SafeAreaView,
  TextInput,
  Text,
} from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
import React, { useState, useEffect } from "react";
import { ScrollView, View, Platform } from "react-native";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import { Dropdown } from "react-native-element-dropdown";
import httpClient from "../../controllers/HttpClient";
import { useCustomTriggerOnFocus } from "../function/funcFocusEffect";
import JustifyTextComponent from "../LegalManagement/SuratIzinKerja/cobaJustify";

// individual, child, pembantu

const successInit = {
  name: true,
  email: true,
  address: true,
};

const genderList = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const SignUp = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(successInit);
  const [projectList, setProjectList] = useState([]);
  const [project, setProject] = useState(null);
  const [unit, setUnit] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [hideCPass, setHideCPass] = useState(true);
  const [hidePass, setHidePass] = useState(true);

  useEffect(() => {
    //setProjectList(dataDummy);
    onRefresh();
    //console.log("54 colors: ", colors);
  }, []);

  const onRefresh = () => {
    //alert("run onRefresh");
    //loadData();
  };

  //useCustomTriggerOnFocus(onRefresh);

  const loadData = async () => {
    await httpClient
      .request({
        url: "/modules/cs/save",
        method: "GET",
        //data,
        //params
      })
      .then((res) => {
        setProjectList(res.data.data);
      })
      .catch((err) => {
        // setProjectList(dataDummy);
        alert(JSON.stringify(err));
      });
  };

  const renderLabel1 = () => {
    // if (project || isFocus) {
    //   return (
    //     <Text style={[styles.label, isFocus && { color: "black" }]}>
    //       Choose project
    //     </Text>
    //   );
    // }
    // return null;
    return (
      <View
        style={[
          styles.label,
          {
            //backgroundColor: "lightblue",
            //paddingHorizontal: 20,
            //paddingVertical: 10,
            backgroundColor: colors.background,
            borderRadius: 15,
          },
        ]}
      >
        <Text
          style={[
            {
              color: colors.text,
              //backgroundColor: colors.background,
              borderRadius: 50,
            },
          ]}
        >
          Choose Project
        </Text>
      </View>
    );
  };

  const renderLabel2 = (text, customStyle) => {
    return (
      <Text
        style={[
          {
            marginTop: 10,
            alignSelf: "flex-start",
            marginLeft: 10,
            //JustifySelf: "left",
            //textAlign: "left",
            //flex: 1,
            //backgroundColor: "blue",
          },
          customStyle,
        ]}
      >
        {text}
      </Text>
    );
  };

  const validateEmail = (input) => {
    // Regular expression for basic email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    //setEmail(input);
    //emailRegex.test(input) ? null : alert("Please enter a valid email address");
    if (emailRegex.test(input)) {
      return true;
    } else {
      alert("Please enter a valid email address");
      return false;
    }
  };

  const onSignUp = async () => {
    if (
      name == "" ||
      email == "" ||
      password == "" ||
      confirmPassword == "" ||
      address == ""
    ) {
      alert(
        "Please complete form: \n" +
          [name == "" ? " name," : null] +
          [email == "" ? " email," : null] +
          [password == "" ? " password," : null] +
          [confirmPassword == "" ? " confirm password," : null] +
          [address == "" ? " phone number," : null] +
          [gender == "" ? " gender." : null]
      );
    } else {
      if (!validateEmail(email)) {
        return;
      }
      if (password != confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      if (password.length <= 4) {
        alert("Password must be at least 5 characters long");
        return;
      }
      setLoading(true);
      // const dataPost = { name, email, address };
      const dataPost = {
        // "entity_cd" : "1001",
        // "project_no" : "1001001",
        name: name,
        email: email,
        handphone: address,
        password: password,
        confirm_password: password,
        gender: gender.value,
        platform: Platform.OS,
      };
      //alert(JSON.stringify(dataPost));
      //return;
      // setTimeout(() => {
      //   setLoading(false);
      //   //navigation.navigate("SignIn");
      //   alert(JSON.stringify(dataPost));
      //   alert("You will receive an email if your account request is approved.");
      //   navigation.goBack();
      // }, 500);

      await httpClient
        .request({
          url: "/auth/register",
          method: "POST",
          data: dataPost,
        })
        .then((res) => {
          if (res.data.message == "User already exist") {
            alert("User already exist");
            setLoading(false);
            return;
          }
          if (res.data.message == "User has been registered successfully") {
            alert(
              "Account has been requested, please wait for email to get account and password"
            );
            setLoading(false);
            navigation.goBack();
            return;
          }
          setLoading(false);
          alert(res.data.message);
        })
        .catch((err) => {
          setLoading(false);
          alert(JSON.stringify(err.response.data.message));
        });
    }
  };

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={["right", "top", "left"]}
    >
      <Header
        title={t("Register")}
        renderLeft={() => {
          return (
            <Icon
              name="angle-left"
              size={20}
              color={colors.primary}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <Text
          style={{
            marginTop: 20,
            textAlign: "center",
            fontSize: 16,
            paddingHorizontal: 40,
          }}
        >
          This form is intended for people who already have a unit in Tanrise
          Property.
          {/* You will receive an email if your account request is
          approved. */}
        </Text>
        <View style={styles.contain}>
          {renderLabel2("Name")}
          <TextInput
            style={[BaseStyle.textInput]}
            onChangeText={(text) => setName(text)}
            autoCorrect={false}
            placeholder={t("")}
            placeholderTextColor={
              success.name ? BaseColor.grayColor : colors.primary
            }
            value={name}
          />
          {renderLabel2("Email")}
          <TextInput
            style={[BaseStyle.textInput]}
            onChangeText={(text) => setEmail(text)}
            autoCorrect={false}
            placeholder={t("")}
            keyboardType="email-address"
            placeholderTextColor={
              success.email ? BaseColor.grayColor : colors.primary
            }
            value={email}
          />

          {renderLabel2("Password")}
          <TextInput
            style={[BaseStyle.textInput]}
            onChangeText={(text) => setPassword(text)}
            autoCorrect={false}
            placeholder={t("")}
            //keyboardType="email-address"
            // placeholderTextColor={
            //   success.email ? BaseColor.grayColor : colors.primary
            // }
            value={password}
            secureTextEntry={hidePass}
            icon={
              <Icon
                onPress={() => setHidePass(!hidePass)}
                active
                name={hidePass ? "eye-slash" : "eye"}
                size={20}
                color={colors.text}
              />
            }
          />
          {renderLabel2("Confirm Password")}
          <TextInput
            style={[BaseStyle.textInput]}
            onChangeText={(text) => setConfirmPassword(text)}
            autoCorrect={false}
            placeholder={t("")}
            //keyboardType="email-address"
            // placeholderTextColor={
            //   success.email ? BaseColor.grayColor : colors.primary
            // }
            value={confirmPassword}
            secureTextEntry={hideCPass}
            icon={
              <Icon
                onPress={() => setHideCPass(!hideCPass)}
                active
                name={hideCPass ? "eye-slash" : "eye"}
                size={20}
                color={colors.text}
              />
            }
          />
          {renderLabel2("Phone Number")}
          <TextInput
            style={[BaseStyle.textInput, { marginBottom: 0 }]}
            onChangeText={(text) => setAddress(text)}
            autoCorrect={false}
            placeholder={t("")}
            keyboardType="numeric"
            placeholderTextColor={
              success.address ? BaseColor.grayColor : colors.primary
            }
            value={address}
          />
          {renderLabel2("Gender")}
          <Dropdown
            style={[
              styles.dropdown,
              {
                // color: colors.text,
                color: "blue",
                backgroundColor:
                  colors.background == "#010101" ? "#222222" : "#eeeeee",
                marginBottom: 20,
              },
              isFocus && { borderColor: "blue" },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={[
              styles.selectedTextStyle,
              { color: colors.text },
            ]}
            inputSearchStyle={[styles.inputSearchStyle, { color: colors.text }]}
            iconStyle={styles.iconStyle}
            data={genderList}
            //search
            itemTextStyle={{
              //backgroundColor: colors.background,
              color: colors.text, // Set the label color here
              //fontSize: 16,
            }}
            maxHeight={300}
            labelField="label"
            valueField="label"
            activeColor={colors.background}
            containerStyle={{
              backgroundColor: colors.background,
            }}
            placeholder={
              genderList.length != 0 ? "Choose Gender" : "No Data Gender"
            }
            disable={genderList.length == 0}
            //searchPlaceholder="Search..."
            value={gender}
            //onFocus={() => setIsFocus(true)}
            //onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setGender(item);
              //setProject(item);
              //setIsFocus(false);
            }}
          />
          <View style={{ width: "100%" }}>
            <Button
              full
              style={{ marginTop: 20 }}
              loading={loading}
              onPress={() => onSignUp()}
            >
              {t("Register")}
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
