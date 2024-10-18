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
import client from "../../controllers/HttpClient";
// import styles from './styles';

import { RadioButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import moment from "moment";

import Modal from "react-native-modal";

import Signature from "react-native-signature-canvas";
import IconAnt from "react-native-vector-icons/AntDesign";
import ViewHistoryDetail from "./ViewHistoryDetailTRO";
// import RNFetchBlob from 'rn-fetch-blob';
import { API_URL_LOKAL } from "@env";
export default function ScreenSignatureTRO({ route }) {
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
  const [email, setEmail] = useState(users.user);
  const [name, setName] = useState(users.name);
  const [urlApi, seturlApi] = useState(client);

  const [spinner, setSpinner] = useState(true);
  const [signature, setSign] = useState(null);
  const [pesan, setPesan] = useState("");
  const [modalSuccessVisible, showModalSuccess] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const ref = useRef();

  const handleOK = async (signature) => {
    console.log(signature);

    setSign(signature);

    const data = {
      dataSign: signature,

      name_approval: paramsItem.name,

      report_no: paramsItem.report_no,
    };
    console.log("datasign", data);

    console.log("data save signature", data);
    const config = {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        token: "",
      },
    };
    await axios
      .post(API_URL_LOKAL + "/modules/cs/save-signature", data, {
        config,
      })
      .then((res) => {
        console.log("res save signature >", res);
        console.log("res save signature", res.data);
        setPesan(res.data.Pesan);
        showModalSuccess(true);
      })
      .catch((error) => {
        console.log("error get tower api", error.response.data);
        alert("error get");
      });
  };

  console.log("res pesan", pesan);
  const handleEmpty = () => {
    console.log("Empty");
  };

  const style = `.m-signature-pad--footer
    .button {
      background-color: red;
      color: #FFF;
    }`;

  const onCloseModal = () => {
    showModalSuccess(false);
    // navigation.navigate('SpecTroffice');
    navigation.navigate("ViewHistoryDetailTRO");
  };

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={["right", "top", "left"]}
    >
      <Header
        title={t("Signatures TR Office")} //belum dibuat lang
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

      <View style={{ flex: 1 }}>
        <View style={styles.preview}>
          {signature ? (
            <Image
              resizeMode={"contain"}
              style={{ width: 335, height: 114 }}
              source={{ uri: signature }}
            />
          ) : null}
        </View>
        <Signature
          onOK={handleOK}
          onEmpty={handleEmpty}
          descriptionText="Signature Approve"
          clearText="Clear"
          confirmText="Save"
          webStyle={style}
        />
      </View>
      <View>
        <Modal
          isVisible={modalSuccessVisible}
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
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: colors.primary,
                  marginBottom: 10,
                }}
              >
                {pesan}
              </Text>
              {/* <Text>{message}</Text> */}
              <IconAnt
                name="checkcircleo"
                size={80}
                color={colors.primary}
              ></IconAnt>
              <Text> </Text>
              <Text>Result</Text>
              <Text>Schedule Success Booked on Ticket</Text>
              {/* <Text>Ticket Success Approved</Text> */}
              <Text bold>{pesan}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
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
                <Text style={{ fontSize: 13, color: "#FFF" }}>{t("OK")}</Text>
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
