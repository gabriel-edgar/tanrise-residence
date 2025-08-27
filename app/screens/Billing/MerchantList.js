import {
  Header,
  Icon,
  ListThumbCircleNotif,
  SafeAreaView,
  Text,
  Button,
} from "@/components";
import { BaseColor, BaseStyle, useTheme } from "@/config";
// Load sample data
// import {NotificationData} from '@/data';
import React, { useState, useEffect } from "react";
import {
  FlatList,
  RefreshControl,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  Alert,
  Linking,
  Modal,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useTranslation } from "react-i18next";
import { Card } from "react-native-paper";
import { useSelector } from "react-redux";
import axios from "axios";
// import getUser from '../../selectors/UserSelectors';
//import { baseURL as API_URL_LOKAL } from '@/controllers/HttpClient';
import httpClient from "../../controllers/HttpClient";
import numFormattanpaRupiah from "../../components/numFormattanpaRupiah";
import { WebView } from "react-native-webview";
import Clipboard from "@react-native-clipboard/clipboard";
import { FontWeight } from "../../config";
import CheckBox from "@react-native-community/checkbox";
import { storeStorage, getStorage } from "../function/asyncStorage";
import getUser from "../../selectors/UserSelectors";
import moment from "moment";

const fileDummy = [
  {
    rowId: "1",
    descs: "descs meter",
    url_link: "",
  },
];

const dummyPaymentMethod = [
  {
    descs: "Mandiri Virtual Account",
    value: "MANDIRI",
  },
  {
    descs: "BRI Virtual Account",
    value: "BRI",
  },
];

const AttachmentBilling = (props) => {
  const { navigation, route } = props;
  console.log("route params", route);
  //   const url_attachment = route.params;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [attachment, setAttachment] = useState([]);
  const [hasError, setErrors] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const stateReduxChoosedProject = useSelector(
    (state) => state.Dataproject.chooseProject
  );
  const item = route.params.item;
  const datadetailNotDue = route.params.datadetailNotDue;
  const replaceTotal_notdue = route.params.replaceTotal_notdue;
  const sumTotalNotDue = route.params.sumTotalNotDue;
  const [price, setPrice] = useState("");
  const [urlPayment, setUrlPayment] = useState("https://www.google.com");
  const [modalVisible, setModalVisible] = useState(false);
  console.log("75 route.params: ", route.params);

  const [backgroundColor, setBackgroundColor] = useState(colors.background); // Default background color

  const [textToCopy, setTextToCopy] = useState("Example VA Number");

  // Sample data array
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentMethodList, setPaymentMethodList] = useState(null);
  const [paymentMethodError, setPaymentMethodError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMethod, setLoadingMethod] = useState(false);
  const user = useSelector((state) => getUser(state));
  console.log("90 user: ", user);

  const copyToClipboard = () => {
    Clipboard.setString(textToCopy);
    Alert.alert("Copied!", "Text has been copied to clipboard.");
  };

  const changeBackgroundColor = () => {
    setBackgroundColor("#28a745"); // Set to active color
    setTimeout(() => {
      setBackgroundColor(colors.background); // Revert back to default color after 1 second
    }, 1000); // Duration in milliseconds
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await getPaymentMethodList();
  };

  // Function to toggle checkbox
  const toggleCheckbox = (value) => {
    // const newData = dummyPaymentMethod.map((item) =>
    //   item.value === value ? { ...item, checked: !item.checked } : item
    // );
    setPaymentMethod(value);
  };

  const getPaymentMethodList = async () => {
    setLoadingMethod(true);
    try {
      const res = await httpClient.request({
        url: `/pg/get-payment-channel`,
        method: "GET",
        params: {
          entity_cd: item.entity_cd,
          project_no: item.project_no,
        },
      });

      console.log("60 PaymentMethodList: res: ", res.data.data);
      setPaymentMethodList(res.data.data);
      setPaymentMethodError("");
    } catch (error) {
      setPaymentMethodError(error?.message);
      console.log("60 PaymentMethodList: error: ", error);
    }
    setLoadingMethod(false);
  };

  function removeAfterDot(input) {
    const index = input.indexOf(".");
    //alert('index +',index);
    if (index !== -1) {
      return input.substring(0, index); // Return substring before the dot
    }
    return input; // Return original string if no dot is found
  }

  // Function to format the number
  const formatNumber = (num) => {
    return "Rp " + new Intl.NumberFormat("de-DE").format(num); // Using German formatting
  };

  const handlePay = async () => {
    if (paymentMethod == null) {
      alert("Please select payment method");
      return;
    }

    if (
      user.Handphone == null ||
      user.Handphone == ""
      //user.email == null
    ) {
      alert("Please add phone number in Edit Profile in Settings");
      return;
    }

    setLoading(true);

    if (paymentMethod.payment_channel == "BNI") {
      try {

        const dataPost = {
          entity_cd: item.entity_cd,
          project_no: item.project_no,
          debtor_acct: item.debtor_acct, //"L-TR-09-07",
          debtor_name: item.name, //"PT SARIGUNA PRIMATIRTA, Tbk",
          debtor_phone: user.Handphone,
          debtor_email: user.email,
          doc_no: item.doc_no,
          virtual_acct: "",
          doc_amt: parseFloat(item?.mfinal_amt),
          payment_channel: paymentMethod.payment_channel,
          type_payment: "Close",
          lot_no: item.lot_no,
        };
        console.log("289 " + JSON.stringify(dataPost));

        //post
        const res = await httpClient.request({
          url: `/modules/billing/store`,
          method: "POST",
          data: dataPost,
          //baseURL: "https://api.property365.co.id:4421/tanrise_api/api",
        });

        const condition = res.data.success;
        //const condition = true;

        if (condition) {
          console.log("291 Pay1: res: ", res.data);
          const dataPay = res.data.data?.response_url;
          if (dataPay != null) {
            navigation.navigate("WebviewScreen", {
              title: "Payment Screen",
              doc_no: item.doc_no,
              url: dataPay,
            });
          }
        } else {
          console.log("291 Pay2: res: ", res.data);
          alert(JSON.stringify(res.data.message));
        }
      } catch (error) {
        console.log("320 Pay: error: ", error);
        console.log("291" + error.response.data.message);

        const status = error.response.status
          ? "Status: " + error.response.status
          : "";
        alert(JSON.stringify(error.response.data.message) + "\n" + status);
      }
    } else {
      try {
        let dataVA;
        const dataGet = {
          entity_cd: item.entity_cd,
          project_no: item.project_no,
          lot_no: item.lot_no,
          bank_grp: paymentMethod.payment_channel,
        };

        const resGet = await httpClient.request({
          url: `/modules/billing/get-virtual-acc`,
          method: "GET",
          params: dataGet,
        });
        if (resGet.data.success == true) {
          dataVA = resGet.data.data?.virtual_acct;
        } else {
          alert("VA " + resGet.data.message);
          setLoading(false);
          return;
        }

        const dataPost = {
          entity_cd: item.entity_cd,
          project_no: item.project_no,
          debtor_acct: item.debtor_acct, 
          debtor_name: item.name, 
          debtor_phone: user.Handphone,
          debtor_email: user.email,
          doc_no: item.doc_no,
          virtual_acct: dataVA,
          doc_amt: parseFloat(item?.mfinal_amt),
          payment_channel: paymentMethod.payment_channel,
          type_payment: "Close",
          lot_no: item.lot_no,
        };
        console.log("415 dataPost", dataPost);

        //post
        const res = await httpClient.request({
          url: `/modules/billing/store`,
          method: "POST",
          data: dataPost,
          //baseURL: "",
        });

        const condition = res.data.success;

        if (condition) {
          console.log("60 Pay: res: ", res.data);
          const dataPay = res.data.data;
          navigation.navigate("VAScreen", {
            ...route.params,
            paymentMethod,
            VA: dataPost.virtual_acct,
            dataPay,
          });
        } else {
          alert(res.data.message);
        }
      } catch (error) {
        console.log("320 Pay: error: ", error);
        console.log("320" + error.response.data.message);

        const status = error.response.status
          ? "Status: " + error.response.status
          : "";
        alert(JSON.stringify(error.response.data.message) + "\n" + status);
      }
    }
    setLoading(false);
  };

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={["right", "top", "left"]}
    >
      <Header
        title={"Payment Method"}
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
      <Text subhead bold style={{ textAlign: "center", marginBottom: 10 }}>
        {moment(item.doc_date).format("DD MMMM YYYY")+" | "}
        {"Unit " + item.lot_no + " | "}
        {item.doc_no}
      </Text>
      <ScrollView>
        <View style={{ marginHorizontal: 20 }}>
          {loadingMethod ? (
            <ActivityIndicator></ActivityIndicator>
          ) : paymentMethodError ? (
            <>
              <Text style={{textAlign:'center'}}>{'Payment method error: '+paymentMethodError}</Text>
            <Button
              style={{
                height: 45,
                margin: 10,
                marginVertical: 30,
                alignContent: "center",
              }}
              onPress={()=>getPaymentMethodList()}
            >
              <Text style={{ color: "#fff", fontSize: 14 }}>Refresh Method </Text>
            </Button>
            </>
          ) : null}
          {paymentMethodList?.length == 0 ? (
            <Text style={{ textAlign: "center" }}>
              Payment Channel not found for{"\n"} entity code {item.entity_cd}{" "}
              and project number {item.project_no}
            </Text>
          ) : (
            paymentMethodList?.map((item) => (
              <TouchableOpacity
                key={item.rowID}
                onPress={() => toggleCheckbox(item)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 15,
                  marginVertical: 8,
                  //backgroundColor: "#f9c2ff",
                  borderRadius: 5,
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                  }}
                >
                  {item.payment_channel}
                </Text>
                <CheckBox
                  value={item.payment_channel == paymentMethod?.payment_channel}
                  //onValueChange={setIsChecked}
                  disabled={true} // Set the disabled prop
                  style={{ marginRight: 8 }}
                  tintColors={{
                    true: colors.primary,
                    false: colors.background != "white" ? "white" : "black",
                  }}
                />
              </TouchableOpacity>
            ))
          )}
          <View
            style={{
              justifyContent: "space-between",
              marginTop: 7,
              paddingTop: 20,
              borderTopWidth: 0.5,
              borderRadius: 10,
            }}
          >
            <Text
              style={{ fontWeight: "bold", fontSize: 15, marginBottom: 10 }}
            >
              Payment Summary
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>Total Payment:</Text>
              <Text>Rp {replaceTotal_notdue}</Text>
            </View>
          </View>
          <View>
            <Button
              style={{
                height: 45,
                margin: 10,
                marginVertical: 30,
                alignContent: "center",
              }}
              onPress={handlePay}
              disable={loading}
              loading={loading}
            >
              <Text style={{ color: "#fff", fontSize: 14 }}>Pay </Text>
              {/* {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : null} */}
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AttachmentBilling;

const stylesCurrent = StyleSheet.create({
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
