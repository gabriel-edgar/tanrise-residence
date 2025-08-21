import { Text, Button, Icon } from "@/components";
import ListTransaction from "@/components/List/Transaction";
import PropTypes from "prop-types";
import React, { useState, Fragment, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import styles from "./styles";
import { useTheme } from "@/config";
import numFormat from "../../numFormat";
import { useNavigation, useRoute } from "@react-navigation/core";
import Modal from "react-native-modal";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";
import numFormattanpaRupiah from "../../numFormattanpaRupiah";
import { baseURL as API_URL_LOKAL } from "@/controllers/HttpClient";
import httpClient from "../../../controllers/HttpClient";

const TransactionExpand = ({
  number,
  style = {
    paddingTop: 5,
  },
  tradingPairTitle = "",
  tradingPairValue = "",
  priceTitle = "",
  price = "",
  name = "",
  doc_no = "",
  descs = "",
  mbal_amt = "",
  trx_type = "",
  due_date = "",
  doc_date = "",
  tower = "",
  lot_no = "",
  feeTitle = "",
  feeValue = "",
  costTitle = "",
  costValue = "",
  changeTitle = "",
  changeValue = "",
  currentTitle = "",
  currentValue = "",
  debtor_acct = "",
  entity_cd = "",
  project_no = "",
  email = "",
  tab_id = "",
  item = {},
  scrollToBottom = () => {},
  isLast = false,
  isPaymentActive = 0,
  ListTransactionProps = {
    icon: "exchange-alt",
    name: name,
    tower: tower,
    descs: descs,
    due_date: due_date,
    doc_date: doc_date,
    doc_no: doc_no,
    mbal_amt: mbal_amt,
    disabled: true,
    lot_no: lot_no,
    debtor_acct: debtor_acct,
    entity_cd: entity_cd,
    project_no: project_no,
    email: email,
    tab_id: tab_id,
  },
  isExpandInit = false,
  checkBoxValue = null,
  checkBoxOnValueChange = ()=>{},
}) => {
  const { colors } = useTheme();
  const [isExpand, setIsExpand] = useState(false); //number == 0 ? true :
  const navigation = useNavigation();
  const [modalSuccessVisible, showModalSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [hasError, setErrors] = useState(false);
  const { t } = useTranslation();
  const [datadetailDateDue, setDetailDateDue] = useState([]);
  const [datadetailNotDue, setDetailNotDue] = useState([]);

  const [loading, setLoading] = useState(true);
  console.log("83 ListTransactionProps", ListTransactionProps);
  console.log("83 item", item);

  //paid
  const detailDateDue = async () => {
    setLoading(true);
    console.log(
      "84 url: ",
      `/modules/billing/detail-history?email=${email}&entity_cd=${item.entity_cd}&project_no=${item.project_no}&debtor_acct=${debtor_acct}&doc_no=${doc_no}`
    );
    try {
      // Paid
      const res = await httpClient.request({
        url: `/modules/billing/detail-history?email=${email}&entity_cd=${item.entity_cd}&project_no=${item.project_no}&debtor_acct=${debtor_acct}&doc_no=${doc_no}`,
        method: "GET",
      });

      console.log("84 res detail-history: ", res.data);
      setDetailDateDue(res.data.data);

      res.data.data.length == 0 ? setErrors("Data empty") : null;
      setLoading(false);
    } catch (error) {
      setLoading(false);
      error.status == 429
        ? setErrors("Try again later")
        : setErrors(
            "Please hide and show to refresh,\n" + error.message.toString()
          );
      console.log("84 error detail date due -->", error);

      // alert(hasError.toString());
    }
  };

  //not paid
  const detailNotDue = async () => {
    setLoading(true);
    console.log(
      "84111 ",
      `/modules/billing/summary-history?email=${email}&entity_cd=${item.entity_cd}&project_no=${item.project_no}&debtor_acct=${debtor_acct}&doc_no=${doc_no}`
    );
    try {
      //not Paid
      const res = await httpClient.request({
        url: `/modules/billing/summary-history?email=${email}&entity_cd=${item.entity_cd}&project_no=${item.project_no}&debtor_acct=${debtor_acct}&doc_no=${doc_no}`,
        method: "GET",
      });
      console.log("84 res summary-history", res);
      setDetailNotDue(res.data.data);
      // alert(JSON.stringify(res.data.data))
      res.data.data.length == 0 ? setErrors("Data empty") : null;
      //setDetailNotDue(dummyDataSummaryHistory);
      console.log("84111 detail not due -->", res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      error.status == 429
        ? setErrors("Try again later")
        : setErrors(
            "Please hide and show to refresh,\n" + error.message.toString()
          );
      console.log("84111 error detail not due -->", JSON.stringify(error));
      // alert(hasError.toString());
    }
  };

  const sumTotal =
    datadetailDateDue != 0
      ? datadetailDateDue.reduceRight((max, bills) => {
          return max + parseFloat(bills.mfinal_amt);
        }, 0)
      : 0;

  const replaceTotal = sumTotal
    .toFixed(2) // Keep 2 decimals, e.g., "442604.75"
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Adds thousand separator

  console.log("sum detail mbal mont", sumTotal);
  console.log("replace total", replaceTotal);

  const datadetailNotDue_null = datadetailNotDue == null ? 0 : datadetailNotDue;

  const sumTotalNotDue =
    datadetailNotDue_null != 0
      ? datadetailNotDue.reduceRight((max, bills) => {
          return (max += parseFloat(bills.mfinal_amt));
        }, 0)
      : 0;
  const math_total_notdue = Math.floor(sumTotalNotDue);
  // const replaceTotal_notdue = math_total_notdue
  // .toFixed(2)
  // .replace('.', ',')
  // .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  // change to more pure from mfinal_amt
  const replaceTotal_notdue = numFormattanpaRupiah(item?.mfinal_amt);
  console.log("c", math_total_notdue);
  console.log("replace total due date", replaceTotal_notdue);

  useEffect(() => {
    if (number == 0 && tab_id == 1) {
      clickExpand();
    }
  }, []);

  const clickExpand = async () => {
    console.log("177 item: ", item);
    console.log("177 email: ", email);
    await setIsExpand(!isExpand);
    tab_id == 2 ? await detailDateDue() : await detailNotDue();
    (await isLast) ? scrollToBottom() : null;
  };

  const clickAttachment = () => {
    const params = {
      entity_cd: item.entity_cd,
      project_no: item.project_no,
      debtor_acct: debtor_acct,
      doc_no: doc_no,
      tab_id: tab_id,
    };
    console.log("params for click attach", params);
    navigation.navigate("AttachmentBilling", params);
    // if (data.debtor_acct == '') {
    //   // alert('Please Choose Debtor First');
    //   setMessage('Please choose debtor first');
    //   showModalSuccess(true);
    // } else {

    // }
  };

  const clickPaymentDetail = () => {
    if (isPaymentActive != 0) {
      alert(
        'There is an active payment,\nPlease "pay and wait" or "cancel" payment'
      );
      return;
    }
    if (
      item.entity_cd.trim() == "1006" &&
      item.project_no.trim() == "1006001"
    ) {
      if (number != 0) {
        alert("Please pay the previous invoice first");
        return;
      }
    }
    const params = {
      // entity_cd: item.entity_cd,
      // project_no: item.project_no,
      // debtor_acct: debtor_acct,
      // doc_no: doc_no,
      item: item,
      datadetailNotDue,
      replaceTotal_notdue,
      sumTotalNotDue,
    };
    navigation.navigate("PaymentDetail", params);
  };

  const onCloseModal = () => {
    showModalSuccess(false);
  };

  return (
    <View style={style}>
      <ListTransaction
        style={StyleSheet.flatten([
          {
            borderBottomWidth: 1,
            paddingBottom: 1,
            borderBottomColor: colors.background,
          },
          !isExpand && {
            borderBottomWidth: 0,
            paddingBottom: 1,
            borderBottomColor: colors.border,
          },
        ])}
        {...ListTransactionProps}
        onPress={() => clickExpand()}
        item={item}
        tab_id={tab_id}
        checkBoxValue={checkBoxValue}
        checkBoxOnValueChange={checkBoxOnValueChange}
      />

      <Button
        style={{ height: 35, backgroundColor: "lightgray" }}
        onPress={() => clickExpand()}
      >
        <Text style={{ color: "black", fontSize: 14 }}>
          {" "}
          <Icon name={isExpand ? "chevron-up" : "chevron-down"} size={20} />
        </Text>
      </Button>
      {/* 
      <Button style={{ height: 35 }} onPress={() => clickExpand()}>
        <Text style={{ color: "#fff", fontSize: 14 }}>Show Detail</Text>
      </Button> */}
      {isExpand && (
        <View
          style={StyleSheet.flatten([
            { paddingBottom: 20 },
            isExpand && {
              marginTop: 15,
              padding: 10,
              borderBottomWidth: 1,
              borderRightWidth: 1,
              borderLeftWidth: 1,
              borderColor: colors.border,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              //borderColor: "lightgray",
            },
          ])}
        >
          {
            //tab_id == 1 &&
            tab_id == 2 && loading ? (
              <ActivityIndicator
                color={colors.primary}
                style={{ marginTop: 20 }}
              />
            ) : //tab_id == 1 &&
            tab_id == 2 && datadetailDateDue != 0 ? (
              <View>
                {/* <Button
                  style={{ height: 35 }}
                  onPress={() => clickAttachment()}
                >
                  <Text style={{ color: "#fff", fontSize: 14 }}>
                    Attachment
                  </Text>
                </Button> */}
                <Button
                  style={{
                    height: 35,
                    backgroundColor: "lightgray",
                    marginBottom: 10,
                  }}
                  onPress={() => clickAttachment()}
                >
                  <Text style={{ color: "black", fontSize: 14 }}>
                    Attachment
                  </Text>
                </Button>
                {datadetailDateDue.map((item, key) => (
                  <View key={key}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                        // paddingHorizontal: 10,
                        paddingVertical: 5,
                      }}
                    >
                      <View style={{ width: "50%", paddingLeft: 10 }}>
                        <Text subhead>{item.descs}</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",

                          width: "40%",
                        }}
                      >
                        <Text>Rp. </Text>
                        <Text subhead>
                          {numFormattanpaRupiah(item.mfinal_amt)}
                          {/* //tadinya ini mbal_amt */}
                          {/* 100.000.000.00 */}
                        </Text>
                        {/* <Text subhead>{numFormat(item.mbal_amt)}</Text> */}
                      </View>
                    </View>
                  </View>
                ))}
                <View
                  style={{
                    borderTopWidth: 0.5,
                    borderStyle: "dashed",
                    borderColor: colors.primary,
                    marginLeft: 9,
                  }}
                ></View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    // paddingHorizontal: 10,
                    paddingVertical: 5,
                  }}
                >
                  <View style={{ width: "50%", paddingLeft: 10 }}>
                    <Text subhead bold style={{ fontSize: 16 }}>
                      Total
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",

                      width: "45%",
                    }}
                  >
                    <Text subhead bold style={{ fontSize: 16 }}>
                      Rp.{" "}
                    </Text>
                    <Text subhead bold style={{ fontSize: 16 }}>
                      {replaceTotal}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              //tab_id == 1 &&
              tab_id == 2 && (
                <View style={{ alignSelf: "center" }}>
                  <Text> {hasError}</Text>
                </View>
              )
            )
          }
          {
            //tab_id == 2 &&
            tab_id == 1 && loading ? (
              <ActivityIndicator
                color={colors.primary}
                style={{ marginTop: 20 }}
              />
            ) : //tab_id == 2 &&
            tab_id == 1 && datadetailNotDue != 0 ? (
              <View>
                <Button
                  style={{ height: 35, marginBottom: 10 }}
                  onPress={() => clickPaymentDetail()}
                >
                  <Text style={{ color: "#fff", fontSize: 14 }}>
                    Pay Invoice
                  </Text>
                </Button>
                <Button
                  style={{
                    height: 35,
                    backgroundColor: "lightgray",
                    marginBottom: 10,
                  }}
                  onPress={() => clickAttachment()}
                >
                  <Text style={{ color: "black", fontSize: 14 }}>
                    Attachment
                  </Text>
                </Button>
                {datadetailNotDue.map((item, key) => (
                  <View key={key}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                        // paddingHorizontal: 10,
                        paddingVertical: 5,
                      }}
                    >
                      <View style={{ width: "50%", paddingLeft: 10 }}>
                        <Text subhead>{item.descs}</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",

                          width: "40%",
                        }}
                      >
                        <Text>Rp. </Text>
                        <Text subhead>
                          {/* {item.mbal_amt.replace(
                          /(\d)(?=(\d{3})+(?!\d))/g,
                          '$1.',
                        )} */}
                          {numFormattanpaRupiah(item.mfinal_amt)}
                          {/* 100.000.000.00 */}
                        </Text>
                        {/* <Text subhead>{numFormat(item.mbal_amt)}</Text> */}
                      </View>
                    </View>
                  </View>
                ))}
                <View
                  style={{
                    borderTopWidth: 0.5,
                    borderStyle: "dashed",
                    borderColor: colors.primary,
                    marginLeft: 9,
                  }}
                ></View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    // paddingHorizontal: 10,
                    paddingVertical: 5,
                  }}
                >
                  <View style={{ width: "50%", paddingLeft: 10 }}>
                    <Text subhead bold style={{ fontSize: 16 }}>
                      Total
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",

                      width: "45%",
                    }}
                  >
                    <Text subhead bold style={{ fontSize: 16 }}>
                      Rp.{" "}
                    </Text>
                    <Text subhead bold style={{ fontSize: 16 }}>
                      {numFormattanpaRupiah(item?.mfinal_amt)}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              //tab_id == 2 &&
              tab_id == 1 && (
                <View style={{ alignSelf: "center" }}>
                  <Text> {hasError}</Text>
                </View>
              )
            )
          }
        </View>
      )}
    </View>
  );
};

TransactionExpand.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  tradingPairTitle: PropTypes.string,
  tradingPairValue: PropTypes.string,
  priceTitle: PropTypes.string,
  price: PropTypes.string,
  email: PropTypes.string,
  lot_no: PropTypes.string,
  debtor_acct: PropTypes.string,
  entity_cd: PropTypes.string,
  project_no: PropTypes.string,
  feeTitle: PropTypes.string,
  feeValue: PropTypes.string,
  costTitle: PropTypes.string,
  costValue: PropTypes.string,
  changeTitle: PropTypes.string,
  changeValue: PropTypes.string,
  currentTitle: PropTypes.string,
  currentValue: PropTypes.string,
};

export default TransactionExpand;
