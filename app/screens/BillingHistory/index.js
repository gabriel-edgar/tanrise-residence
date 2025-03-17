import {
  CardReport03,
  CardReport08,
  CardReport07,
  ProfileGridSmall,
  PlaceholderLine,
  Placeholder,
  SafeAreaView,
  Text,
  Header,
  Transaction2Col,
  Icon,
  Tag,
  Price3Col,
  ListTransactionExpand,
} from "@components";
import { BaseStyle, useTheme } from "@config";
import { FRecentTransactions, FHotNews } from "@data";
import { useNavigation, useRoute } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { enableExperimental } from "@utils";
import { pdfSourceFunc } from "../Billing/pdfSourceFunc";

import moment from "moment";

import {
  ScrollView,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Modal,
  Button,
  Platform,
} from "react-native";
import HeaderHome from "./HeaderHome";
import styles from "./styles";
import HeaderCard from "./HeaderCard";
import getUser from "../../selectors/UserSelectors";
import { useDispatch, useSelector } from "react-redux";
//import axios from "axios";
import numFormat from "../../components/numFormat";
import CurrencyFormatter from "../../components/CurrencyFormatter";
import { TransactionExpandHistory } from "../../components";
//import { API_URL_LOKAL } from "@env";
import httpClient from "../../controllers/HttpClient";
import CheckBox from "@react-native-community/checkbox";
import Clipboard from "@react-native-clipboard/clipboard";
import { useCustomTriggerOnFocus } from "../Billing/funcFocusEffect";

const dummyPayment = [
  {
    //desc: "Mandiri Virtual Account",
    doc_no: "BL12345",
    va: "88812345",
    type: "va",
    url: "",
    channel: "MANDIRI",
    isFinished: "0",
  },
  // {
  //   //desc: "BRI Virtual Account",
  //   //value: "BRI",
  //   doc_no: "BL00001",
  //   va: "88812347",
  //   type: "va",
  //   url: "",
  //   channel: "BRI",
  //   isFinished: "1",
  // },
  // {
  //   //desc: "BRI Virtual Account",
  //   //value: "BRI",
  //   doc_no: "BL00002",
  //   va: "",
  //   type: "url",
  //   url: "https://www.google.com",
  //   channel: "BNI",
  //   isFinished: "1",
  // },
];

const responseExample = [
  {
    created_at: "2024-11-05 14:58:09.000",
    debtor_acct: "L-TR-11-02",
    debtor_name: "PT AVIA AVIAN, TBK",
    doc_amt: "15000.00",
    doc_no: "BL24110005",
    entity_cd: "1004",
    expiry_link: "2024-11-06 14:58:09.000",
    json: '{"response":"Transmisi Info Detil Pembelian","trx_id":"8189360409250958","merchant_id":"36040","merchant":"PPPSRSS Arc 100","bill_no":"BL24110005","external_id":"","bill_items":[{"product":"Invoice No. BL24110005","amount":"1500000","qty":"1","payment_plan":"01","tenor":"00","merchant_id":"36040"}],"response_code":"00","response_desc":"Sukses","redirect_url":"https:\\/\\/debit-sandbox.faspay.co.id\\/pws\\/100003\\/0830000010100000\\/a177989513f8127812e0bfc6f2ea39afb9c59a59?trx_id=8189360409250958&merchant_id=36040&bill_no=BL24110005"}',
    paid_amt: null,
    payment_channel: "BNI",
    project_no: "1004001",
    response_url:
      "https://debit-sandbox.faspay.co.id/pws/100003/0830000010100000/a177989513f8127812e0bfc6f2ea39afb9c59a59?trx_id=8189360409250958&merchant_id=36040&bill_no=BL24110005",
    rowID: "22",
    status_payment: "Process",
    type_payment: "Close",
    updated_at: null,
    virtual_acct: "8189360409250958",
  },
];

const BillingHistory = ({
  isCenter = false,
  isPrimary = false,
  style = {},
  onPress = () => {},
  disabled = false,
}) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => getUser(state));
  const [hasError, setErrors] = useState(false);
  const [bill, setBill] = useState([]);
  const [data, setData] = useState([]);
  const [dataCurrent, setDataCurrent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(null);

  const stateReduxChoosedUnit = useSelector(
    (state) => state.Dataproject.choosedUnit
  );
  const stateReduxChoosedProject = useSelector(
    (state) => state.Dataproject.chooseProject
  );

  // Make function to call the api
  async function fetchData() {
    // try {
    //   const res = await axios.get(
    //     API_URL_LOKAL + `/modules/billing/summary-history/IFCAPB/${user.user}`
    //   );
    //   // console.log('res datacurrent', res.data.Data);
    //   setDataCurrent(res.data.Data);
    //   setLoading(false);
    //   // console.log('DATA DUE DATE -->', dataCurrent);
    // } catch (error) {
    //   setErrors(error);
    //   // alert(hasError.toString());
    // }

    const getParams = {
      //entity_cd: "1004",
      entity_cd: stateReduxChoosedUnit.entity_cd,
      //project_no: "1004001",
      project_no: stateReduxChoosedUnit.project_no,
      //debtor_acct: "GSE/AA-50/1",
      email: user.email,
      lot_no: stateReduxChoosedUnit.lot_no,
    };

    // alert(JSON.stringify(getParams));
    // return;
    const res = await httpClient
      .request({
        url: `/modules/billing/get-data-payment`,
        method: "GET",
        params: getParams,
        //baseURL: "https://api.property365.co.id:4421/tanrise_api/api",
      })
      .then((res) => {
        function checkLotno(currentValue, index, arr) {
          return (
            currentValue.lot_no == stateReduxChoosedUnit.lot_no
            //&&
            // currentValue.entity_cd == stateReduxChoosedUnit.entity_cd &&
            // currentValue.project_no == stateReduxChoosedUnit.project_no
          );
        }

        const filter = res.data.data.filter(checkLotno);
        setDataCurrent(filter);
        //setDataCurrent(dummyPayment);
        setLoading(false);
        console.log("133 dataCurrent: ", dataCurrent);
      })
      .catch((error) => {
        setDataCurrent([]);
        alert(JSON.stringify(error.response.data.message));
        //setDataCurrent(dummyPayment);
        setLoading(false);
      });
  }

  useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = () => {
    fetchData();
  };

  useCustomTriggerOnFocus(onRefresh);

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    Alert.alert("Copied!", '"' + text + '" has been copied to clipboard.');
  };

  const ObjectStyleCard = {
    //card
    backgroundColor: colors.background, //common
    borderRadius: 10, //common
    margin: 10, //common

    elevation: 3, // For Android shadow

    shadowColor: colors.text, // For iOS shadow
    shadowOffset: { width: 0, height: 1 }, // For iOS shadow
    shadowOpacity: 0.2, // For iOS shadow
    shadowRadius: 1.5, // For iOS shadow
  };

  const showAlert = (item) => {
    Alert.alert(
      "", // Title of the alert
      "Are you sure you want to cancel the payment?", // Message
      [
        { text: "No", onPress: () => console.log("Cancel Pressed") }, // First button
        { text: "Yes", onPress: () => cancelPayment(item) }, // Second button
      ],
      { cancelable: false } // Disable dismissing by tapping outside
    );
    // Alert.alert(
    //   "Title", // Title of the alert
    //   "This is a custom alert message", // Message
    //   [
    //     { text: "No", onPress: () => console.log("Cancel Pressed") }, // First button
    //     { text: "Yes", onPress: () => console.log("OK Pressed") }, // Second button
    //   ],
    //   { cancelable: false } // Disable dismissing by tapping outside
    // );
  };

  const cancelPayment = async (item) => {
    // alert("Payment Cancelled");
    setModalVisible(null);
    const dataPost = {
      entity_cd: item.entity_cd,
      project_no: item.project_no,
      debtor_acct: item.debtor_acct,
      virtual_acct: item.virtual_acct,
      doc_no: item.doc_no,
    };
    // alert(JSON.stringify(dataPost));
    // return;
    await httpClient
      .request({
        url: `/modules/billing/update-status-payment`,
        method: "POST",
        data: dataPost,
        //baseURL: "https://api.property365.co.id:4421/tanrise_api/api",
      })
      .then((res) => {
        alert(JSON.stringify(res.data.message));
        onRefresh();
      })
      .catch((e) => {
        alert(JSON.stringify(e.response.data.message));
        setLoading(false);
        onRefresh();
      });
  };

  function removeAfterDot(input) {
    const index = input.indexOf(".");
    //alert('index +',index);
    if (index !== -1) {
      return formatNumber(parseInt(input.substring(0, index))); // Return substring before the dot
    }
    return formatNumber(parseInt(input)); // Return original string if no dot is found
  }

  const formatNumber = (num) => {
    return "Rp " + new Intl.NumberFormat("de-DE").format(num); // Using German formatting
  };

  const checkHowToPay = (channel) => {
    const pdfSource = pdfSourceFunc(channel);
    return pdfSource;
  };

  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView, { flex: 1 }]}
      edges={["right", "top", "left"]}
    >
      <Header
        //title={t("Invoice History")}
        title={t("Payment Active")}
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
      <Text style={{ textAlign: "center", marginBottom: 10 }}>
        {stateReduxChoosedUnit.lot_no}
      </Text>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {TABS.map((item, index) => (
            <View key={index} style={{flex: 1, paddingHorizontal: 20}}>
              <Tag
                primary
                style={{
                  backgroundColor:
                    tab.id == item.id ? colors.primary : colors.background,
                }}
                onPress={() => {
                  enableExperimental();
                  setTab(item);
                }}>
                <Text
                  body1={tab.id != item.id}
                  light={tab.id != item.id}
                  whiteColor={tab.id == item.id}>
                  {item.title}
                </Text>
              </Tag>
            </View>
          ))}
        </View> */}
        {loading == true ? (
          <View>
            {/* <Spinner visible={this.state.spinner} /> */}
            <Placeholder style={{ marginVertical: 4, paddingHorizontal: 10 }}>
              <PlaceholderLine width={100} noMargin style={{ height: 40 }} />
            </Placeholder>
          </View>
        ) : dataCurrent == 0 ? (
          // <Text>tidak ada data current (kasih no data available)</Text>
          <Text style={{ textAlign: "center" }}>No data available</Text>
        ) : (
          <View style={{ flex: 1, paddingHorizontal: 20 }}>
            {/* {dataCurrent.map((item, key) => (
              <TransactionExpandHistory
                key={key}
                onPress={() => navigation.navigate("FHistoryDetail")}
                tower={item.tower}
                name={item.name}
                lot_no={item.lot_no}
                doc_no={item.doc_no}
                project_no={item.project_no}
                entity_cd={item.entity_cd}
                doc_date={moment(item.doc_date).format("DD MMMM YYYY")}
                debtor_acct={item.debtor_acct}
                due_date={moment(item.due_date).format("DD MMMM YYYY")}
                mdoc_amt={`${numFormat(`${item.mdoc_amt}`)}`}
              />
            ))} */}
            {dataCurrent?.map((item, index) => (
              <>
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    //copyToClipboard(item.va)
                    setModalVisible(index)
                  }
                  style={{
                    padding: 15,
                    marginVertical: 8,
                    borderRadius: 5,

                    //card
                    backgroundColor: colors.background, //common
                    borderRadius: 10, //common
                    elevation: 3, // For Android shadow
                    shadowColor: colors.text, // For iOS shadow
                    shadowOffset: { width: 0, height: 1 }, // For iOS shadow
                    shadowOpacity: 0.2, // For iOS shadow
                    shadowRadius: 1.5, // For iOS shadow
                    margin: 10, //common

                    //overflow: "hidden",
                  }}
                >
                  <View
                    style={{
                      justifyContent: "space-between",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ alignSelf: "start" }}>
                      <Text
                        style={
                          {
                            //fontSize: 18,
                          }
                        }
                      >
                        Invoice
                      </Text>
                      <Text
                        style={
                          {
                            //fontSize: 18,
                            //textAlign: "center",
                          }
                        }
                      >
                        Payment
                      </Text>
                      <Text>Amount</Text>
                      <Text>Processed by</Text>
                      {/* <Text>Lot No</Text> */}
                      {/* <Text
                      style={
                        {
                          //fontSize: 18,
                        }
                      }
                    >
                      {" "}
                      {/* {item.type == "va" ? "VA" : "Payment Link"} *
                    </Text> */}
                    </View>
                    {/* <CheckBox
                  value={item.isFinished == "1" ? true : false}
                  //onValueChange={setIsChecked}
                  disabled={true} // Set the disabled prop
                  style={{ marginRight: 8 }}
                /> */}
                    <View style={{ alignSelf: "start" }}>
                      <Text
                        style={
                          {
                            //fontSize: 18,
                          }
                        }
                      >
                        : {item.doc_no}
                      </Text>
                      <Text>: {item.payment_channel}</Text>
                      <Text>: {removeAfterDot(item.doc_amt)}</Text>
                      {/* <Text>: {item.email}</Text> */}
                      {item.email?.length <= 25 ? (
                        <Text>: {item.email}</Text>
                      ) : null}

                      {/* <Text>: {item.lot_no}</Text> */}
                      {/* <Text
                      style={
                        {
                          //fontSize: 18,
                        }
                      }
                    >
                      {" "}
                    </Text> */}
                    </View>
                    <View>
                      <Icon
                        name="angle-right"
                        size={20}
                        color={colors.primary}
                        enableRTL={true}
                      />
                    </View>
                  </View>
                  {item.email?.length > 25 ? (
                    <Text>
                      {"       "}: {item.email}
                    </Text>
                  ) : null}
                </TouchableOpacity>
                <Modal
                  animationType="slide" // 'slide', 'fade', or 'none'
                  transparent={true} // Use a transparent background
                  visible={modalVisible == index} // Modal visibility controlled by state
                  onRequestClose={() => setModalVisible(false)} // Android back button closes the modal
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
                        //backgroundColor: "#fff",
                        backgroundColor: colors.background,
                        borderRadius: 10,
                        alignItems: "center",
                        borderColor: colors.text,
                        borderWidth: 0.5,
                      }}
                    >
                      {/* <Button
                        title="Close Modal"
                        onPress={() => setModalVisible(false)} // Close modal
                      /> */}
                      {/* <View
                        style={{
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      > */}
                      <TouchableOpacity
                        style={{
                          alignSelf: "flex-end",
                          //backgroundColor: "blue",
                        }}
                        onPress={() => setModalVisible(null)}
                      >
                        <Icon
                          name="times-circle"
                          size={30}
                          color={colors.text}
                          enableRTL={true}
                        />
                      </TouchableOpacity>
                      {/* </View> */}
                      <Text
                        style={{
                          fontSize: 18,
                          marginBottom: 10,
                          //color: "black",
                        }}
                      >
                        {item.payment_channel}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {item.payment_channel != "BNI" ? (
                          <>
                            <Text
                              style={{
                                fontSize: 18,
                                //marginBottom: 15,
                                //color: "black",
                              }}
                            >
                              {item.virtual_acct}
                            </Text>
                            <View style={ObjectStyleCard}>
                              <TouchableOpacity
                                //title="Copy"
                                onPress={() =>
                                  copyToClipboard(item.virtual_acct)
                                } // Close modal
                                //color={colors.text}
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                  //backgroundColor: colors.primary,
                                  paddingVertical: 10,
                                  paddingHorizontal: 15,
                                  borderRadius: 10,
                                }}
                              >
                                <Icon
                                  name="copy"
                                  size={20}
                                  color={colors.text}
                                  enableRTL={true}
                                />
                              </TouchableOpacity>
                            </View>
                          </>
                        ) : (
                          <>
                            <View style={ObjectStyleCard}>
                              <Button
                                title="Go to Payment Screen"
                                onPress={() => {
                                  if (item.response_url != null) {
                                    navigation.navigate("WebviewScreen", {
                                      title: "Payment Screen",
                                      doc_no: item.doc_no,
                                      url: item.response_url,
                                    });
                                    setModalVisible(null);
                                  }
                                }} // Close modal
                                color={colors.text}
                              />
                            </View>
                          </>
                        )}
                      </View>
                      {item.payment_channel != "BNI" &&
                      checkHowToPay(item.payment_channel).uri != "" ? (
                        <View style={ObjectStyleCard}>
                          <Button
                            title="See How to Pay"
                            //onPress={() => setModalVisible(null)} // Close modal
                            onPress={() => {
                              navigation.navigate("PDFShow", {
                                title: "Cara Bayar",
                                //pdf_uri: "http://www.pdf995.com/samples/pdf.pdf",
                                pdfSource: checkHowToPay(item.payment_channel),
                                merchant: item.payment_channel,
                              });
                              setModalVisible(null);
                            }}
                            color={colors.text}
                          />
                        </View>
                      ) : null}
                      <View
                        style={[ObjectStyleCard, { backgroundColor: "red" }]}
                      >
                        <Button
                          title="Cancel Payment"
                          //onPress={() => setModalVisible(null)} // Close modal
                          onPress={() => showAlert(item)}
                          //color={colors.text}
                          color={Platform.OS === "ios" ? "white" : "red"}
                        />
                      </View>
                      {/* <Button
                        title="Close Modal"
                        onPress={() => setModalVisible(false)} // Close modal
                      /> */}
                    </View>
                  </View>
                </Modal>
              </>
            ))}
          </View>
        )}
        {/* {dataCurrent == 0 ? (
          <Text>tidak ada data current (kasih no data available)</Text>
        ) : (
          <View style={{flex: 1, paddingHorizontal: 20}}>
            {dataCurrent.map(item => (
              <TransactionExpandHistory
                onPress={() => navigation.navigate('FHistoryDetail')}
                tower={item.tower}
                name={item.name}
                lot_no={item.lot_no}
                doc_no={item.doc_no}
                project_no={item.project_no}
                entity_cd={item.entity_cd}
                doc_date={moment(item.doc_date).format('DD MMMM YYYY')}
                debtor_acct={item.debtor_acct}
                due_date={moment(item.due_date).format('DD MMMM YYYY')}
                mdoc_amt={`${numFormat(`${item.mdoc_amt}`)}`}
              />
            ))}
          </View>
        )} */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BillingHistory;
