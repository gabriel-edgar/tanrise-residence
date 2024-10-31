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

import moment from "moment";

import {
  ScrollView,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
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

const dummyPayment = [
  {
    //desc: "Mandiri Virtual Account",
    doc_no: "BL12345",
    va: "88812345",
    merchant: "MANDIRI",
    isFinished: "0",
  },
  {
    //desc: "BRI Virtual Account",
    //value: "BRI",
    doc_no: "BL00001",
    va: "88812347",
    merchant: "BRI",
    isFinished: "1",
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

    const res = await httpClient
      .request({
        url: `/pg/get-payment-channel`,
        method: "GET",
        params: {
          entity_cd: "",
          project_no: "",
        },
      })
      .then((res) => {
        setDataCurrent(dummyPayment);
        setLoading(false);
      })
      .catch((e) => {
        setDataCurrent(dummyPayment);
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    Alert.alert("Copied!", '"' + text + '" has been copied to clipboard.');
  };

  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView, { flex: 1 }]}
      edges={["right", "top", "left"]}
    >
      <Header
        //title={t("Invoice History")}
        title={t("Payment List")}
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
            {dataCurrent?.map((item) => (
              <TouchableOpacity
                key={item.rowID}
                onPress={() => copyToClipboard(item.va)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 15,
                  marginVertical: 8,
                  borderRadius: 5,
                  justifyContent: "space-between",

                  //card
                  backgroundColor: colors.background,
                  borderRadius: 10,
                  elevation: 3, // For Android shadow
                  shadowColor: colors.text, // For iOS shadow
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.2,
                  shadowRadius: 1.5,
                  margin: 10,

                  //overflow: "hidden",
                }}
              >
                <View>
                  <Text
                    style={
                      {
                        //fontSize: 18,
                      }
                    }
                  >
                    {item.doc_no}
                  </Text>
                </View>
                {/* <CheckBox
                  value={item.isFinished == "1" ? true : false}
                  //onValueChange={setIsChecked}
                  disabled={true} // Set the disabled prop
                  style={{ marginRight: 8 }}
                /> */}
                <View>
                  <Text
                    style={{
                      //fontSize: 18,
                      textAlign: "center",
                    }}
                  >
                    {item.merchant}
                  </Text>
                  <Text
                    style={
                      {
                        //fontSize: 18,
                      }
                    }
                  >
                    {item.va}
                  </Text>
                </View>
              </TouchableOpacity>
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
