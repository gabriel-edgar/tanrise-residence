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
import { pdfSourceFunc } from "./pdfSourceFunc";

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
    value: "mandiri",
  },
  {
    descs: "BRI Virtual Account",
    value: "bri",
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
  console.log("75VAS route.params: ", route.params);

  const [backgroundColor, setBackgroundColor] = useState(colors.background); // Default background color

  const [textToCopy, setTextToCopy] = useState(
    //"Example VA Number"
    "123410011001001BL23090008"
  );

  // Sample data array
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  // const pdfSource = {
  //   uri: "",
  //   //uri: "https://drive.google.com/file/d/1FZalOrcH_rD2ud0rqKlujtR1_GzZ_FeQ/view?usp=sharing"
  //   //uri: "https://drive.google.com/uc?export=download&id=1FZalOrcH_rD2ud0rqKlujtR1_GzZ_FeQ",
  //   cache: true,
  // };

  // const merchant = {
  //   permata:
  //     "https://drive.google.com/uc?export=download&id=1YjEYQh8ibmVyYzAb1DHgfBS-1ncZFw0g",
  //   danamon:
  //     "https://drive.google.com/uc?export=download&id=1KwetUbAgS5LBhAS-9j2XYubWE8i_5icn",
  //   mandiri:
  //     "https://drive.google.com/uc?export=download&id=1_QdtrDB05BblXQzkNkZnqLVc1l_Wcn42",
  //   maybank:
  //     "https://drive.google.com/uc?export=download&id=1FYarm1tOD4j06X_DeEOhVvta_Xf5Rodp",
  //   bca: "https://drive.google.com/uc?export=download&id=1WAnERWsaGGDLHf3Ipb8LJr77zopzN210",
  //   bni: "https://drive.google.com/uc?export=download&id=1sPXmwoaZiW4j47WTRSPnWfFeY16B6g0z",
  //   sinarmas:
  //     "https://drive.google.com/uc?export=download&id=1UIJL7N3t0NW--imLAzq_MJNy0fv13ykb",
  //   bnc: "https://drive.google.com/uc?export=download&id=1mczFG7UPpMowH0sRB6bM5biNEpmjKq5k",
  //   btn: "https://drive.google.com/uc?export=download&id=106EZEk3Br_rPeWczAIujAHQpGjKRfUD7",
  //   cs1_indomaret:
  //     "https://drive.google.com/uc?export=download&id=1yGfxkPJLmyX2YAvxvysiQdfWCphOTbbN",
  //   cs2_alfamart:
  //     "https://drive.google.com/uc?export=download&id=1ofqbli3hqVIhZXTjWsgACIstAT3gZHVk",
  // };

  // switch (route.params.paymentMethod.payment_channel) {
  //   case "PERMATA":
  //     pdfSource.uri = merchant.permata;
  //     break;
  //   case "DANAMON":
  //     pdfSource.uri = merchant.danamon;
  //     break;
  //   case "MANDIRI":
  //     pdfSource.uri = merchant.mandiri;
  //     break;
  //   case "MAYBANK":
  //     pdfSource.uri = merchant.maybank;
  //     break;
  //   case "BCA":
  //     pdfSource.uri = merchant.bca;
  //     break;
  //   case "BNI":
  //     pdfSource.uri = merchant.bni;
  //     break;
  //   case "SINARMAS":
  //     pdfSource.uri = merchant.sinarmas;
  //     break;
  //   case "BNC":
  //     pdfSource.uri = merchant.bnc;
  //     break;
  //   case "BTN":
  //     pdfSource.uri = merchant.btn;
  //     break;
  //   case "INDOMARET":
  //     pdfSource.uri = merchant.cs1_indomaret;
  //     break;
  //   case "ALFAMART":
  //     pdfSource.uri = merchant.cs2_alfamart;
  //     break;
  //   default:
  //     pdfSource.uri = "";
  //   // "https://drive.google.com/uc?export=download&id=1FZalOrcH_rD2ud0rqKlujtR1_GzZ_FeQ";
  // }

  const pdfSource = pdfSourceFunc(route.params.paymentMethod.payment_channel);

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    Alert.alert("Copied!", '"' + text + '" has been copied to clipboard.');
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
    await getAttachment();
  };

  // Function to toggle checkbox
  const toggleCheckbox = (value) => {
    // const newData = dummyPaymentMethod.map((item) =>
    //   item.value === value ? { ...item, checked: !item.checked } : item
    // );
    setPaymentMethod(value);
  };

  const getAttachment = async () => {
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
        url: `/modules/billing/attach?entity_cd=${entity_cd}&project_no=${project_no}&debtor_acct=${debtor_acct}&doc_no=${doc_no}`,
        method: "GET",
      });

      console.log("60 attachment: res: ", res.data.data);
      setAttachment(res.data.data);
    } catch (error) {
      console.log("60 attachment: error: ", error);
      setErrors(error.response.data.message);
      // alert(hasError.toString());
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
    const valueHasilConvert = removeAfterDot(datadetailNotDue[0].mdoc_amt);

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
        title={"Payment"}
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
          //navigation.goBack();
          navigation.pop(3);
        }}
      />
      <Text subhead bold style={{ textAlign: "center", marginBottom: 10 }}>
        {"Invoice " + route.params.datadetailNotDue[0].doc_no}
      </Text>
      <View
        style={{
          flex: 1,
          //justifyContent: "center",
          //alignItems: "center",
          //backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
          margin: 20,

          backgroundColor: colors.background,
          borderRadius: 10,
          elevation: 3, // For Android shadow
          shadowColor: colors.text, // For iOS shadow
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.7,
          shadowRadius: 2,
          margin: 20,
          padding: 15,
        }}
      >
        {/* <View
          style={{
            width: 300,
            padding: 20,
            backgroundColor: "white",
            borderRadius: 10,
            alignItems: "center",
          }}
        > */}
        <Text
          style={{
            marginBottom: 20,
            //textAlign: "center",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          {route.params.paymentMethod.payment_channel}
        </Text>
        <Text
          style={
            {
              //marginBottom: 5,
              //textAlign: "center",
              //fontWeight: "bold",
            }
          }
        >
          Virtual Account Number
        </Text>
        <View
          style={{
            //padding: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            //backgroundColor: "blue",
          }}
        >
          <Text>{route.params.VA}</Text>
          {/* <Button title="Copy Text" onPress={copyToClipboard} /> */}
          <Button
            style={{
              height: 35,
              //margin: 10,
              //marginTop: 30,
              //width: "40%",
              alignSelf: "center",
            }}
            onPress={() => copyToClipboard(route.params.VA)}
          >
            {/* <Text style={{ color: "#fff", fontSize: 14 }}>Copy Text</Text> */}
            <Icon
              name="copy"
              size={20}
              color={colors.background}
              enableRTL={true}
            />
          </Button>
        </View>
        <View
          style={
            {
              //padding: 20,
              //flexDirection: "row",
              //alignItems: "center",
              //justifyContent: "space-between",
            }
          }
        >
          <Text
            style={{
              marginTop: 10,
              //textAlign: "center",
              //fontWeight: "bold",
            }}
          >
            Total Payment
          </Text>
          <View
            style={{
              paddingVertical: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              //backgroundColor: "blue",
            }}
          >
            <Text>
              {/* {formatNumber(route.params.datadetailNotDue[0].mfinal_amt)} */}
              Rp {replaceTotal_notdue}
            </Text>
            {/* <Button title="Copy Text" onPress={copyToClipboard} /> */}
            {/* <Button
              style={{
                height: 35,
                //margin: 10,
                //marginTop: 30,
                //width: "40%",
                alignSelf: "center",
              }}
              onPress={() => copyToClipboard("Rp " + replaceTotal_notdue)}
            >
              <Text style={{ color: "#fff", fontSize: 14 }}>Copy Text</Text>
            </Button> */}
          </View>
        </View>
        {/* <Button
              title="Close Modal"
              onPress={() => setModalVisible(false)}
            /> */}
        {pdfSource.uri == "" ? null : (
          <Button
            style={{
              height: 35,
              margin: 10,
              marginTop: 30,
              //width: "40%",
              alignSelf: "center",
            }}
            onPress={() =>
              navigation.navigate("PDFShow", {
                title: "Cara Bayar",
                //pdf_uri: "http://www.pdf995.com/samples/pdf.pdf",
                pdfSource,
                merchant: route.params.paymentMethod.payment_channel,
              })
            }
          >
            <Text style={{ color: "#fff", fontSize: 14 }}>See How to Pay</Text>
          </Button>
        )}
        {/* <Button
          style={{
            height: 35,
            margin: 10,
            marginTop: 30,
            //width: "40%",
            alignSelf: "center",
          }}
          onPress={() =>
            navigation.navigate("WebviewScreen", {
              title: "Payment Screen",
              url: "https://www.google.com",
            })
          }
        >
          <Text style={{ color: "#fff", fontSize: 14 }}>WebviewScreen</Text>
        </Button> */}
        {/* </View> */}
      </View>
      {/* <View style={styles.container}> */}
      {/* {dummyPaymentMethod.map((item) => (
          <CustomComponent key={item.value} title={item.desc} />
        ))} */}

      {/* </View> */}
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
                onPress={() => copyToClipboard()}
              >
                {/* <Text style={{ color: "#fff", fontSize: 14 }}>Copy Text</Text> */}
                <Icon
                  name="globe"
                  size={20}
                  color={colors.primary}
                  enableRTL={true}
                />
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
