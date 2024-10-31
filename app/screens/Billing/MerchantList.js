import {
  Header,
  Icon,
  ListThumbCircleNotif,
  SafeAreaView,
  Text,
  Button,
} from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
// Load sample data
// import {NotificationData} from '@data';
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
//import { API_URL_LOKAL } from "@env";
import httpClient from "../../controllers/HttpClient";
import numFormattanpaRupiah from "../../components/numFormattanpaRupiah";
import { WebView } from "react-native-webview";
import Clipboard from "@react-native-clipboard/clipboard";
import { FontWeight } from "../../config";
import CheckBox from "@react-native-community/checkbox";
import { storeStorage, getStorage } from "../function/asyncStorage";

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
  const datadetailNotDue = route.params.datadetailNotDue;
  const replaceTotal_notdue = route.params.replaceTotal_notdue;
  const [price, setPrice] = useState("");
  const [webViewPayment, setWebViewPayment] = useState(false);
  const [urlPayment, setUrlPayment] = useState("https://www.google.com");
  const [modalVisible, setModalVisible] = useState(false);
  console.log("75 route.params: ", route.params);

  const [backgroundColor, setBackgroundColor] = useState(colors.background); // Default background color

  const [textToCopy, setTextToCopy] = useState("Example VA Number");

  // Sample data array
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentMethodList, setPaymentMethodList] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const clickPayment = () => {
    Alert.alert(
      "Confirm Payment",
      "Are you sure you want to pay?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Payment cancelled"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            // alert(
            //   "Succes paid to this invoice with the price: Rp. " +
            //     formatNumber(price)
            // );
            setWebViewPayment(true);
            //setModalVisible(true);
          },
          style: "default",
        },
      ],
      { cancelable: false } // Prevent dismissing the alert by tapping outside
    );
  };

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
    const entity_cd = route.params.entity_cd; //route.params.entity_cd;
    const project_no = route.params.project_no; //route.params.project_no;
    const debtor_acct = route.params.debtor_acct;
    const doc_no = route.params.doc_no;

    console.log("60 attachment: ", entity_cd, project_no, debtor_acct, doc_no);

    // console.log(
    //   'params api attach',
    //   API_URL_LOKAL +
    //     `/getDataAttach/IFCAPB/${entity_cd}/${project_no}/${debtor_acct}/${doc_no}`,
    // );
    try {
      // const res = await axios.get(
      //   API_URL_LOKAL +
      //     ` /getDataAttach/IFCAPB/${entity_cd}/${project_no}/${debtor_acct}/${doc_no}`,
      // );

      // /modules/billing/attach?entity_cd=1001&project_no=1001001&debtor_acct=GSE/AA-50/1&doc_no=BL23090008

      const res = await httpClient.request({
        url: `/pg/get-payment-channel`,
        method: "GET",
        params: {
          entity_cd: datadetailNotDue[0].entity_cd,
          project_no: datadetailNotDue[0].project_no,
        },
      });

      console.log("60 PaymentMethodList: res: ", res.data.data);
      setPaymentMethodList(res.data.data);
    } catch (error) {
      setPaymentMethodList([]);
      console.log("60 PaymentMethodList: error: ", error);
      //setErrors(error.response.data.message);
      //alert(error.toString());
    }
  };

  const openAttach = (item) => {
    console.log("itm", item);
    navigation.navigate("PDFAttach", item);
  };

  function removeAfterDot(input) {
    const index = input.indexOf(".");
    //alert('index +',index);
    if (index !== -1) {
      return input.substring(0, index); // Return substring before the dot
    }
    return input; // Return original string if no dot is found
  }

  const handleChangePrice = (text) => {
    // Example usage
    const valueHasilConvert = removeAfterDot(datadetailNotDue[0].mfinal_amt);

    // Remove all non-numeric characters
    const numericValue = text.replace(/\D/g, "");

    if (parseInt(valueHasilConvert) < parseInt(numericValue)) {
      alert("Price cannot be higher than the original price");
      return;
    }

    // Use a regular expression to allow only numbers
    const regex = /^[0-9]*$/;
    if (regex.test(numericValue) || numericValue === "") {
      setPrice(numericValue);
    } else {
      alert("Invalid Input", "Please enter only numbers.");
    }
  };

  // Function to format the number
  const formatNumber = (num) => {
    return "Rp " + new Intl.NumberFormat("de-DE").format(num); // Using German formatting
  };

  const handlePay = async () => {
    if (paymentMethod == null) {
      alert("Please select payment method");
      return;
    }

    setLoading(true);

    // Simulate a data fetch
    const fetchData = async () => {
      // Simulating network request delay
      setTimeout(() => {
        //setData("Data loaded successfully!");
        setLoading(false);
        //navigation.navigate("VAScreen", { ...route.params, paymentMethod });
      }, 3000); // 3 seconds delay
    };

    const dataPostDummy = {
      entity_cd: "1004",
      project_no: "1004001",
      debtor_acct: "L-TR-09-07",
      debtor_name: "PT SARIGUNA PRIMATIRTA, Tbk",
      doc_no: "BL23090009",
      virtual_acct: "36040202400001234",
      doc_amt: "205000",
      payment_channel: "BRI",
      type_payment: "Close",
    };

    // alert(JSON.stringify(dataGet))
    // return;

    try {
      let dataVA;

      const dataGet = {
        entity_cd: datadetailNotDue[0].entity_cd,
        project_no: datadetailNotDue[0].project_no,
        lot_no: datadetailNotDue[0].lot_no,
        bank_grp: paymentMethod.payment_channel,
      };

      //get
      const resGet = await httpClient.request({
        url: `/modules/billing/get-virtual-acc`,
        method: "GET",
        params: dataGet,
      });

      if (resGet.data.success) {
        console.log("315 Pay: res: ", resGet.data.data);
        dataVA = resGet.data.data.virtual_acct;
        //alert("320a" + dataVA);
      } else {
        console.log("315 Pay: res: ", resGet.data.data);
        //alert("320b" + res.data.message);
        setLoading(false);
        return;
      }

      const dataPost = {
        entity_cd: datadetailNotDue[0].entity_cd,
        project_no: datadetailNotDue[0].project_no,
        debtor_acct: datadetailNotDue[0].debtor_acct, //"L-TR-09-07",
        debtor_name: datadetailNotDue[0].name, //"PT SARIGUNA PRIMATIRTA, Tbk",
        doc_no: datadetailNotDue[0].doc_no,
        virtual_acct: dataVA,
        doc_amt: removeAfterDot(datadetailNotDue[0].mfinal_amt), //"205000",
        payment_channel: paymentMethod.payment_channel,
        type_payment: "Close",
      };

      //post
      const res = await httpClient.request({
        url: `/modules/billing/store`,
        method: "POST",
        data: dataPost,
      });

      const condition = res.data.success;
      //const condition = true;

      if (condition) {
        alert(JSON.stringify(res.data.message));
        //alert("You are now active in this payment");
        console.log("60 Pay: res: ", res.data);
        const dataPay = res.data.data;
        navigation.navigate("VAScreen", {
          ...route.params,
          paymentMethod,
          VA: dataPost.virtual_acct,
          dataPay,
        });
      } else {
        //alert(JSON.stringify(res.data));
        const dataPay = res.data.data;
        navigation.navigate("VAScreen", {
          ...route.params,
          paymentMethod,
          VA: dataPost.virtual_acct,
          dataPay,
        });
        alert(res.data.message);
      }
    } catch (error) {
      console.log("320 Pay: error: ", error);
      //setErrors(error.response.data.message);
      alert("320c" + error.toString());
    }
    setLoading(false);

    // navigation.navigate("VAScreen", { ...route.params, paymentMethod });
  };

  const renderItem = ({ item, index }) => {
    return (
      <Card key={index} style={{ paddingVertical: 20 }}>
        <TouchableOpacity
          onPress={() => {
            openAttach(item);
          }}
        >
          <View style={{ flexDirection: "row", flex: 1, marginHorizontal: 10 }}>
            <View style={{ justifyContent: "space-between", flex: 1 }}>
              <Text style={{ fontSize: 18, marginRight: 5 }} bold>
                {item.descs + " " + item.debtor_acct}
              </Text>
            </View>
            <Icon
              name="file-pdf"
              size={34}
              color={BaseColor.grayColor}
              enableRTL={true}
            />
          </View>
        </TouchableOpacity>
      </Card>
      //   <View key={index} style={{}}>
      //     <Text>{item.descs}</Text>
      //     <Text>{item.remark}</Text>
      //     <Text>{item.link_url}</Text>
      //   </View>
    );
  };

  const CustomComponent = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{title}</Text>
    </View>
  );

  if (webViewPayment) {
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={["right", "top", "left"]}
      >
        <Header
          title={"Payment Screen"}
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
            setWebViewPayment(false);
          }}
          renderRight={() => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "lightgray",
                  borderRadius: 10,
                  padding: 5,
                }}
              >
                <Icon
                  name="globe"
                  size={20}
                  color={colors.primary}
                  enableRTL={true}
                />
                <Text
                  style={{ textAlign: "center", marginLeft: 10, fontSize: 10 }}
                >
                  {"Open in Browser"}
                </Text>
              </View>
            );
          }}
          onPressRight={() => {
            Linking.openURL(
              urlPayment
              // `mailto:${item.contact_no}?subject=${encodeURIComponent(
              //   email.subject
              // )}&body=${encodeURIComponent(email.body)}`
            ).catch((err) => alert("Error opening payment link"));
          }}
        />
        <WebView
          source={{ uri: urlPayment }}
          style={{ flex: 1 }}
          // onNavigationStateChange={(navState) => {
          //   if (!navState.url.startsWith(url)) {
          //     // Optionally handle external links
          //     setWebViewVisible(false);
          //   }
          // }}
        />
      </SafeAreaView>
    );
  }

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
        {"Invoice " + route.params.datadetailNotDue[0].doc_no}
      </Text>
      <ScrollView>
        <View style={{ marginHorizontal: 20 }}>
          {/* <View style={styles.container}> */}
          {/* {dummyPaymentMethod.map((item) => (
          <CustomComponent key={item.value} title={item.desc} />
        ))} */}
          {paymentMethodList?.length == 0 ? (
            <Text style={{ textAlign: "center" }}>
              Payment Channel not found for{"\n"} entity code{" "}
              {route.params.datadetailNotDue[0].entity_cd} and project number{" "}
              {route.params.datadetailNotDue[0].project_no}
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
                />
              </TouchableOpacity>
            ))
          )}
          {/* </View> */}
          {/* <View
            style={{
              marginTop: 16,
              borderBottomWidth: 0.5, //paddingTop: 10
            }}
          ></View> */}
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
              <Text>
                {/* {formatNumber(route.params.datadetailNotDue[0].mfinal_amt)} */}
                Rp {replaceTotal_notdue}
              </Text>
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
      <Modal
        animationType="slide" // You can use "slide", "fade", or "none"
        transparent={true} // Set to false if you want a solid background
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // For Android back button
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
          }}
        >
          <View
            style={{
              width: 300,
              padding: 20,
              backgroundColor: "white",
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                marginBottom: 5,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              VA Number
            </Text>
            <View
              style={{
                padding: 20,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text>{textToCopy}</Text>
              {/* <Button title="Copy Text" onPress={copyToClipboard} /> */}
              <Button
                style={{
                  height: 35,
                  margin: 10,
                  //marginTop: 30,
                  //width: "40%",
                  alignSelf: "center",
                }}
                onPress={copyToClipboard}
              >
                <Text style={{ color: "#fff", fontSize: 14 }}>Copy Text</Text>
              </Button>
            </View>
            {/* <Button
              title="Close Modal"
              onPress={() => setModalVisible(false)}
            /> */}
            <Button
              style={{
                height: 35,
                margin: 10,
                marginTop: 10,
                //width: "40%",
                alignSelf: "center",
              }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: "#fff", fontSize: 14 }}>Close</Text>
            </Button>
          </View>
        </View>
      </Modal>
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
