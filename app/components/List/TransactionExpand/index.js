import { Text, Button } from "@components";
import ListTransaction from "@components/List/Transaction";
import PropTypes from "prop-types";
import React, { useState, Fragment, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import styles from "./styles";
import { useTheme } from "@config";
import numFormat from "../../numFormat";
import { useNavigation, useRoute } from "@react-navigation/core";
import Modal from "react-native-modal";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";
import numFormattanpaRupiah from "../../numFormattanpaRupiah";
import { API_URL_LOKAL } from "@env";
import httpClient from "../../../controllers/HttpClient";

const TransactionExpand = ({
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
  item = "",
  scrollToBottom = () => {},
  isLast = false,
  ListTransactionProps = {
    icon: "exchange-alt",
    name: name,
    tower: tower,
    descs: descs,
    due_date: due_date,
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
}) => {
  const { colors } = useTheme();
  const [isExpand, setIsExpand] = useState(isExpandInit);
  const navigation = useNavigation();
  const [modalSuccessVisible, showModalSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [hasError, setErrors] = useState(false);
  const { t } = useTranslation();
  const [datadetailDateDue, setDetailDateDue] = useState([]);
  const [datadetailNotDue, setDetailNotDue] = useState([]);

  const [loading, setLoading] = useState(true);

  const detailDateDue = async () => {
    // console.log(
    //   "url getDataDue",
    //   API_URL_LOKAL +
    //     `/home/common-projectDue/IFCAPB/${email}/${entity_cd}/${project_no}/${debtor_acct}/${doc_no}`
    // );
    console.log(
      "84 url: ",
      `/modules/billing/detail-history?email=${email}&entity_cd=${item.entity_cd}&project_no=${item.project_no}&debtor_acct=${debtor_acct}&doc_no=${doc_no}`
    );
    try {
      // const res = await axios.get(
      //   API_URL_LOKAL +
      //     `/home/common-projectDue/IFCAPB/${email}/${entity_cd}/${project_no}/${debtor_acct}/${doc_no}`
      // );

      // /modules/billing/detail-history/mgr@ifca.co.id/01/02/C10/D121

      const res = await httpClient.request({
        url: `/modules/billing/detail-history?email=${email}&entity_cd=${item.entity_cd}&project_no=${item.project_no}&debtor_acct=${debtor_acct}&doc_no=${doc_no}`,
        method: "GET",
      });

      console.log("84 resssssss: ", res.data);
      setDetailDateDue(res.data.data);
      //console.log("84 detail date due -->", res);
      setLoading(false);
    } catch (error) {
      setErrors(error);
      console.log("84 error detail date due -->", error);

      // alert(hasError.toString());
    }
  };

  const detailNotDue = async () => {
    console.log(
      "84111 ",
      `/modules/billing/summary-history?email=${email}&entity_cd=${item.entity_cd}&project_no=${item.project_no}&debtor_acct=${debtor_acct}&doc_no=${doc_no}`
    );
    try {
      // console.log(
      //   "api not due detail",
      //   API_URL_LOKAL +
      //     `/home/common-projectCurrent/IFCAPB/${email}/${entity_cd}/${project_no}/${debtor_acct}/${doc_no}`
      // );
      // const res = await axios.get(
      //   API_URL_LOKAL +
      //     `/home/common-projectCurrent/IFCAPB/${email}/${entity_cd}/${project_no}/${debtor_acct}/${doc_no}`
      // );
      const res = await httpClient.request({
        url: `/modules/billing/summary-history?email=${email}&entity_cd=${item.entity_cd}&project_no=${item.project_no}&debtor_acct=${debtor_acct}&doc_no=${doc_no}`,
        method: "GET",
      });
      //console.log("resCobasss", res);
      setDetailNotDue(res.data.data);
      console.log("84111 detail not due -->", res.data);
      setLoading(false);
    } catch (error) {
      setErrors(error);
      console.log("84111 error detail not due -->", error);
      // alert(hasError.toString());
    }
  };

  const sumTotal =
    datadetailDateDue != 0
      ? datadetailDateDue.reduceRight((max, bills) => {
          // return (max += parseInt(bills.mbal_amt));
          // return (max += parseInt(bills.mdoc_amt));
          return (max += parseInt(bills.mfinal_amt));
        }, 0)
      : null;
  const math_total = Math.floor(sumTotal);
  const replaceTotal = math_total
    .toFixed()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  console.log("sum detail mbal mont", sumTotal);
  console.log("replace total", replaceTotal);

  const datadetailNotDue_null = datadetailNotDue == null ? 0 : datadetailNotDue;

  const sumTotalNotDue =
    datadetailNotDue_null != 0
      ? datadetailNotDue.reduceRight((max, bills) => {
          // return (max += parseInt(bills.mdoc_amt));
          return (max += parseInt(bills.mfinal_amt));
        }, 0)
      : null;
  const math_total_notdue = Math.floor(sumTotalNotDue);
  const replaceTotal_notdue = math_total_notdue
    .toFixed()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  console.log("c", math_total_notdue);
  console.log("replace total due date", replaceTotal_notdue);

  // useEffect(() => {
  //   detailDateDue();
  // }, []);

  const clickExpand = async () => {
    console.log("177 item: ", item);
    console.log("177 email: ", email);
    await setIsExpand(!isExpand);
    await detailDateDue();
    await detailNotDue();
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
    const params = {
      // entity_cd: item.entity_cd,
      // project_no: item.project_no,
      // debtor_acct: debtor_acct,
      // doc_no: doc_no,
      datadetailNotDue,
      replaceTotal_notdue,
      sumTotalNotDue,
    };
    //console.log("params for click attach", params);
    navigation.navigate("PaymentDetail", params);
    // if (data.debtor_acct == '') {
    //   // alert('Please Choose Debtor First');
    //   setMessage('Please choose debtor first');
    //   showModalSuccess(true);
    // } else {

    // }
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
            borderBottomWidth: 1,
            paddingBottom: 1,
            borderBottomColor: colors.border,
          },
        ])}
        {...ListTransactionProps}
        onPress={() => clickExpand()}
      />
      <Button style={{ height: 35 }} onPress={() => clickAttachment()}>
        <Text style={{ color: "#fff", fontSize: 14 }}>Attachment</Text>
      </Button>
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

                          width: "35%",
                        }}
                      >
                        <Text>Rp. </Text>
                        <Text subhead>
                          {/* {numFormattanpaRupiah(item.mdoc_amt)} */}
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

                      width: "35%",
                    }}
                  >
                    <Text subhead bold style={{ fontSize: 16 }}>
                      Rp.{" "}
                    </Text>
                    <Text subhead bold style={{ fontSize: 16 }}>
                      {replaceTotal}
                      {/* 100.000.000.00 */}
                    </Text>
                    {/* <Text subhead>{numFormat(item.mbal_amt)}</Text> */}
                  </View>
                </View>
              </View>
            ) : (
              //tab_id == 1 &&
              tab_id == 2 && (
                <View style={{ alignSelf: "center" }}>
                  <Text>Not have data detailss </Text>
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
                    Payment Billing
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

                          width: "35%",
                        }}
                      >
                        <Text>Rp. </Text>
                        <Text subhead>
                          {/* {item.mbal_amt.replace(
                          /(\d)(?=(\d{3})+(?!\d))/g,
                          '$1.',
                        )} */}
                          {/* {numFormattanpaRupiah(item.mbal_amt)} */}
                          {/* {numFormattanpaRupiah(item.mdoc_amt)} */}
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

                      width: "35%",
                    }}
                  >
                    <Text subhead bold style={{ fontSize: 16 }}>
                      Rp.{" "}
                    </Text>
                    <Text subhead bold style={{ fontSize: 16 }}>
                      {replaceTotal_notdue}
                      {/* 100.000.000.00 */}
                    </Text>
                    {/* <Text subhead>{numFormat(item.mbal_amt)}</Text> */}
                  </View>
                </View>
              </View>
            ) : (
              //tab_id == 2 &&
              tab_id == 1 &&
              datadetailNotDue == null && (
                <View style={{ alignSelf: "center" }}>
                  <Text>Not have data detail </Text>
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
