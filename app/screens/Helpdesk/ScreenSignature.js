import {
  Text,
  TextInput,
  // CheckBox,
  PlaceholderLine,
  Placeholder,
  Button,
  SafeAreaView,
  RefreshControl,
  Header,
  Icon,
  Image,
  Tag,
  CategoryIconSoft,
} from "@components";
import { BaseColor, BaseStyle, useTheme, Images } from "@config";
import { CheckBox, Badge } from "react-native-elements";
import IconAnt from "react-native-vector-icons/AntDesign";
// import {Image} from 'react-native';
import StarRating from "react-native-star-rating";
import { useNavigation } from "@react-navigation/native";
import { enableExperimental } from "@utils";
import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  TouchableOpacity,
  View,
  Platform,
  TouchableHighlight,
  ScrollView,
  Dimensions,
  // Button,
  StyleSheet,
} from "react-native";

import { useSelector } from "react-redux";
import getUser from "../../selectors/UserSelectors";
import axios from "axios";
import httpClient from "../../controllers/HttpClient";
// import styles from './styles';

import { RadioButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import moment from "moment";

import Modal from "react-native-modal";

import Signature from "react-native-signature-canvas";
// import RNFetchBlob from 'rn-fetch-blob';
import { API_URL_LOKAL } from "@env";

export default function ScreenSignature({ route }) {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const paramsItem = route.params;
  console.log("params items", paramsItem);

  const [dataTowerUser, setdataTowerUser] = useState([]);
  const [arrDataTowerUser, setArrDataTowerUser] = useState([]);
  const users = useSelector((state) => getUser(state));
  const [email, setEmail] = useState(users.email);
  const [name, setName] = useState(users.name);
  //const [urlApi, seturlApi] = useState(client);

  const [spinner, setSpinner] = useState(true);
  const [signature, setSign] = useState(null);

  const [modalSuccessVisible, showModalSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [messageResult, setMessageResult] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [DateIsActive, setDateIsActive] = useState();
  const [statusResult, setStatus] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const ref = useRef();

  const handleOK = async (signature) => {
    //console.log(signature);

    setSign(signature);

    const data = {
      dataSign: signature,

      name_approval: email,

      report_no: paramsItem.report_no,
      entity_cd: paramsItem.resHDR.entity_cd,
      project_no: paramsItem.resHDR.project_no,
    };

    const data2 = {
      //dataSign: signature,

      name_approval: email,

      report_no: paramsItem.report_no,
      entity_cd: paramsItem.resHDR.entity_cd,
      project_no: paramsItem.resHDR.project_no,
    };

    // console.log("101 data save signature: ", paramsItem);
    // alert("104 data: " + JSON.stringify(data2));
    // return;
    // const config = {
    //   headers: {
    //     accept: "application/json",
    //     "Content-Type": "application/json",
    //     token: "",
    //   },
    // };
    // await axios
    //   .post(API_URL_LOKAL + "/modules/cs/save-signature", data, {
    //     config,
    //   })
    await httpClient
      .request({
        url: "/modules/cs/save-signature",
        method: "POST",
        data,
      })
      .then((res) => {
        console.log("121 res save signature: ", res.data);
        setMessage(res.data.message);
        //   setMessageResult(resJson.report_no);
        setStatus(!res.data.success);
        showModalSuccess(true);
      })
      .catch((error) => {
        console.log("121 error save signature: ", error.response.data.message);
        alert(error.response.data.message);
      });
  };

  const onCloseModal = () => {
    showModalSuccess(false);
    //navigation.navigate("StatusHelp");
    navigation.pop(4);
  };

  const handleEmpty = () => {
    console.log("Empty");
  };

  const styleS = `.m-signature-pad--footer
    .button {
      background-color: ${colors.primary};
      color: #FFF;
    }`;

  // const style = `.m-signature-pad--footer
  //   .button {
  //     background-color: 'green';
  //     color: #FFF;
  //   }`;

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={["right", "top", "left"]}
    >
      <Header
        title={t("Signatures")} //belum dibuat lang
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

      <View
        style={{
          flex: 1,
          //height: 500,
          //backgroundColor: "black",
        }}
      >
        <View style={styles.preview}>
          {/* {signature ? (
            <Image
              resizeMode={"contain"}
              style={{ width: 335, height: 114 }}
              source={{ uri: signature }}
            />
          ) : null} */}
        </View>
        <Signature
          onOK={handleOK}
          onEmpty={handleEmpty}
          descriptionText="Signature Approve"
          clearText="Clear"
          confirmText="Save"
          webStyle={styleS}
          imageType={"image/jpeg"}
          backgroundColor={"#ffffff"}
          //backgroundColor={"black"}
        />
        {/* <Text>abcdddddd</Text> */}
      </View>
      <View>
        <Modal
          isVisible={modalSuccessVisible}
          //isVisible={true}
          style={{ height: "100%" }}
          onBackdropPress={() => showModalSuccess(true)}
        >
          <View
            style={{
              // flex: 1,

              // alignContent: 'center',
              padding: 10,
              backgroundColor: "#fff",
              // height: ,
              borderRadius: 8,
            }}
          >
            {statusResult == false ? (
              //true ? (
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: colors.primary,
                    marginBottom: 10,
                    textAlign: "center",
                  }}
                >
                  {message}
                </Text>
                {/* <Text>{message}</Text> */}
                <IconAnt
                  name="checkcircleo"
                  //name="home"
                  size={80}
                  color={colors.primary}
                ></IconAnt>
                <Text> </Text>
                {/* <Text>Result</Text> */}
                <Text>Your ticket is now 'Closed'</Text>
                {/* <Text bold>{messageResult}</Text> */}
              </View>
            ) : (
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "salmon",
                    marginBottom: 10,
                    textAlign: "center",
                  }}
                >
                  {message}
                </Text>
                {/* <Text>{message}</Text> */}
                <IconAnt
                  name="closecircleo"
                  size={80}
                  color={"salmon"}
                ></IconAnt>
                <Text> </Text>
                {/* <Text bold>{messageResult}</Text> */}
              </View>
            )}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Button
                style={{
                  marginTop: 10,
                  // marginBottom: 10,

                  width: 70,
                  height: 40,
                }}
                onPress={() => {
                  onCloseModal();
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    color: "#FFF",
                    alignContent: "center",
                  }}
                >
                  {t("OK")}
                </Text>
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 250,
    padding: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
});
