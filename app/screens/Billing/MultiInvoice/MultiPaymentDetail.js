import {
  Header,
  Icon,
  ListThumbCircleNotif,
  SafeAreaView,
  Text,
  Button,
} from "@/components";
import { BaseColor, BaseStyle, useTheme } from "@/config";
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
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useTranslation } from "react-i18next";
import { Card } from "react-native-paper";
import { useSelector } from "react-redux";
import axios from "axios";
import httpClient from "../../../controllers/HttpClient";
import numFormattanpaRupiah from "../../../components/numFormattanpaRupiah";
import { WebView } from "react-native-webview";
import Clipboard from "@react-native-clipboard/clipboard";
import getUser from "../../../selectors/UserSelectors";

const fileDummy = [
  {
    rowId: "1",
    descs: "descs meter",
    url_link: "",
  },
];

const MultiPaymentDetail = (props) => {
  const { navigation, route } = props;
  console.log("route params", route);
  //   const url_attachment = route.params;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [attachment, setAttachment] = useState([]);
  const [hasError, setErrors] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const stateReduxChoosedProject = useSelector(
    (state) => state.Dataproject.chooseProject
  );
  const selectedInvoices = route.params.selectedInvoices;
  const replaceTotal_notdue = route.params.replaceTotal_notdue;
  const sumTotalNotDue = route.params.sumTotalNotDue;
  const params = route.params;
  console.log("61 sumTotalNotDue: ", sumTotalNotDue);
  const [price, setPrice] = useState("");
  const [webViewPayment, setWebViewPayment] = useState(false);
  const [urlPayment, setUrlPayment] = useState("https://www.google.com");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedInvoicesExtended, setSelectedInvoicesExtended] =
    useState(selectedInvoices);
  console.log("54 route.params: ", route.params);
  const [loading, setLoading] = useState(false);

  const [backgroundColor, setBackgroundColor] = useState(colors.background); // Default background color

  const [textToCopy, setTextToCopy] = useState("Example VA Number");
  const user = useSelector((state) => getUser(state));
  const [isExpand, setIsExpand] = useState(false);

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
    console.log(107, { params });
    loadData();
  }, []);

  const detailNotPaid = async (item, index, newArray) => {
    try {
      //not Paid
      const res = await httpClient.request({
        url: `/modules/billing/summary-history?email=${user.email}&entity_cd=${item.entity_cd}&project_no=${item.project_no}&debtor_acct=${item.debtor_acct}&doc_no=${item.doc_no}`,
        method: "GET",
      });
      console.log("84 res summary-history", res);
      // alert(JSON.stringify(res.data.data))
      res.data.data.length == 0
        ? (newArray[index] = {
            ...newArray[index],
            detail: [{ descs: "not found" }],
          })
        : (newArray[index] = {
            ...newArray[index],
            detail: res.data.data,
          });
      console.log("84111 detail not due -->", res.data);
    } catch (error) {
      alert(error?.message);
      setLoading(false);
      newArray[index] = {
        ...newArray[index],
        detail: [{ descs: "error " + error?.message }],
      };
      error.status == 429
        ? setErrors("Try again later")
        : setErrors(
            "Please hide and show to refresh,\n" + error.message.toString()
          );
      console.log("84111 error detail not due -->", JSON.stringify(error));
      // alert(hasError.toString());
    }
  };

  const onDetail = async () => {
    setIsExpand(true);
    setLoading(true);
    let newArray = [...selectedInvoicesExtended];
    let array = [...selectedInvoicesExtended];

    const promises = [];

    for (const [index, item] of array.entries()) {
      promises.push(detailNotPaid(item, index, newArray));
    }

    await Promise.all(promises); // Waits for all to finish

    setSelectedInvoicesExtended(newArray);
    setLoading(false);
  };

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
    onDetail();
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
    return new Intl.NumberFormat("de-DE").format(num); // Using German formatting
  };

  // if (webViewPayment) {
  //   return (
  //     <SafeAreaView
  //       style={BaseStyle.safeAreaView}
  //       edges={["right", "top", "left"]}
  //     >
  //       <Header
  //         title={"Payment Screen"}
  //         renderLeft={() => {
  //           return (
  //             <Icon
  //               name="angle-left"
  //               size={20}
  //               color={colors.primary}
  //               enableRTL={true}
  //             />
  //           );
  //         }}
  //         onPressLeft={() => {
  //           setWebViewPayment(false);
  //         }}
  //         renderRight={() => {
  //           return (
  //             <View
  //               style={{
  //                 flexDirection: "row",
  //                 alignItems: "center",
  //                 backgroundColor: "lightgray",
  //                 borderRadius: 10,
  //                 padding: 5,
  //               }}
  //             >
  //               <Icon
  //                 name="globe"
  //                 size={20}
  //                 color={colors.primary}
  //                 enableRTL={true}
  //               />
  //               <Text
  //                 style={{ textAlign: "center", marginLeft: 10, fontSize: 10 }}
  //               >
  //                 {"Open in Browser"}
  //               </Text>
  //             </View>
  //           );
  //         }}
  //         onPressRight={() => {
  //           Linking.openURL(
  //             urlPayment
  //             // `mailto:${item.contact_no}?subject=${encodeURIComponent(
  //             //   email.subject
  //             // )}&body=${encodeURIComponent(email.body)}`
  //           ).catch((err) => alert("Error opening payment link"));
  //         }}
  //       />
  //       <WebView
  //         source={{ uri: urlPayment }}
  //         style={{ flex: 1 }}
  //         // onNavigationStateChange={(navState) => {
  //         //   if (!navState.url.startsWith(url)) {
  //         //     // Optionally handle external links
  //         //     setWebViewVisible(false);
  //         //   }
  //         // }}
  //       />
  //     </SafeAreaView>
  //   );
  // }

  // const getPaymentDetailList = async (item) => {
  //   try {
  //     const res = await httpClient.request({
  //       url: `/modules/billing/summary-history`,
  //       method: "GET",
  //       params: {
  //         email: user.email,
  //         entity_cd: stateReduxChoosedProject.entity_cd,
  //         project_no: stateReduxChoosedProject.project_no,
  //         debtor_acct: item.debtor_acct,
  //         doc_no: item.doc_no,
  //       },
  //     });

  //     console.log("327 getPaymentDetailList: res: ", res.data.data);
  //     // add to
  //     setPaymentMethodList(res.data.data);
  //   } catch (error) {
  //     setPaymentMethodList([]);
  //     console.log("60 PaymentMethodList: error: ", error);
  //     //setErrors(error.response.data.message);
  //   }
  // };

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={["right", "top", "left"]}
    >
      <Header
        title={"Payment Detail"}
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
        {"Selected Invoices (" + selectedInvoicesExtended.length + ")"}
      </Text>

      <ScrollView>
        {/* <Text subhead bold style={{ textAlign: "center", marginBottom: 10 }}>
        {JSON.stringify(selectedInvoicesExtended, null, 2)}
      </Text> */}
        <View style={{ flex: 1, padding: 10 }}>
          {selectedInvoicesExtended?.map((item, key) => (
            <View
              key={key}
              style={{
                backgroundColor:
                  colors.background == "white"
                    ? key % 2 == 0
                      ? "lightgray"
                      : ""
                    : "",
                paddingHorizontal: 5,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                  // paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
              >
                <View style={{ width: "50%" }}>
                  <Text subhead>
                    {[key + 1] +
                      ". " +
                      item.doc_no +
                      "\n\n" +
                      item?.detail
                        ?.map(
                          (item, index) =>
                            [key + 1] +
                            "." +
                            [index + 1] +
                            ". " +
                            item?.descs +
                            "\n\n"
                        )
                        .join("")}
                  </Text>
                </View>
                <View style={{ justifyContent: "center" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      // justifyContent: "space-between",
                      // alignItems:'flex-start'

                      // width: "35%",
                    }}
                  >
                    <Text>Rp. </Text>
                    <Text subhead>
                      {/* {item.mbal_amt.replace(
                          /(\d)(?=(\d{3})+(?!\d))/g,
                          '$1.',
                        )} */}
                      {/* {numFormattanpaRupiah(item.mbal_amt)} */}
                      {numFormattanpaRupiah(item.mfinal_amt)}
                      {/* 100.000.000.00 */}
                    </Text>
                    {/* <Text subhead>{numFormat(item.mbal_amt)}</Text> */}
                  </View>
                </View>
              </View>
            </View>
          ))}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              // paddingHorizontal: 10,
              paddingVertical: 5,
              backgroundColor:
                colors.background == "white"
                  ? selectedInvoicesExtended.length % 2 == 0
                    ? "lightgray"
                    : ""
                  : "",
              paddingHorizontal: 5,
            }}
          >
            <View style={{ width: "50%", paddingLeft: 10 }}>
              <Text subhead bold>
                Total
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",

                width: "35%",
              }}
            >
              <Text subhead bold>
                Rp.{" "}
              </Text>
              <Text subhead bold>
                {params.totalAmt}
                {/* 100.000.000.00 */}
              </Text>
              {/* <Text subhead>{numFormat(item.mbal_amt)}</Text> */}
            </View>
          </View>

          <Button
            disable={loading}
            style={{ height: 45, margin: 10, marginTop: 20 }}
            onPress={() => {
              // Find the first detail that starts with "not found"
              let notFoundDetail = null;

              for (const item of selectedInvoicesExtended) {
                const match = item.detail?.find((detailItem) =>
                  detailItem?.descs?.toLowerCase().startsWith("not found")
                );
                if (match) {
                  notFoundDetail = item;
                  break;
                }
              }

              // Handle "not found" case
              if (notFoundDetail) {
                Alert.alert(
                  "Warning",
                  `${notFoundDetail?.doc_no} does not have data detail`,
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancelled"),
                      style: "cancel",
                    },
                    {
                      text: "OK",
                      onPress: () => {},
                    },
                  ]
                );
                return;
              }

              let error;
              // Handle "error" case
              for (const item of selectedInvoicesExtended) {
                const match2 = item.detail?.find((detailItem) =>
                  detailItem?.descs?.toLowerCase().startsWith("error")
                );
                if (match2) {
                  error = item;
                  break;
                }
              }

              // Handle "not found" case
              if (error) {
                Alert.alert(
                  "Warning",
                  `${error?.doc_no} error get data detail`,
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancelled"),
                      style: "cancel",
                    },
                    {
                      text: "OK",
                      onPress: () => {},
                    },
                  ]
                );
                return;
              }

              // All good, proceed with navigation
              navigation.navigate("MultiMerchantList", {
                ...route.params,
              });
            }}
          >
            <Text style={{ color: "#fff", fontSize: 14, marginLeft: 10 }}>
              Select Payment Method
            </Text>
            {loading ? <ActivityIndicator></ActivityIndicator> : null}
          </Button>
          {loading ? (
            <ActivityIndicator></ActivityIndicator>
          ) : (
            <Button
              style={{
                height: 30,
                margin: 10,
                marginTop: 20,
                width: "50%",
                backgroundColor: "gray",
                alignSelf: "center",
              }}
              onPress={() => {
                onDetail();
              }}
            >
              {/* <Icon name={isExpand ? "" : "chevron-down"} size={20} /> */}
              <Text style={{ color: "white" }}> Refresh</Text>
            </Button>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MultiPaymentDetail;

const stylesCurrent = StyleSheet.create({
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
