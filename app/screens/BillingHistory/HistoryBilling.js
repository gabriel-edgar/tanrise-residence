import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  ImageBackground,
  ScrollView,
} from "react-native";
import {
  CardReport03,
  CardReport08,
  CardReport07,
  ProfileGridSmall,
  SafeAreaView,
  Text,
  Header,
  Transaction2Col,
  Icon,
  Tag,
  Price3Col,
  Button,
  ListTransactionExpand,
} from "@components";
import { BaseStyle, useTheme } from "@config";

import { useNavigation, useRoute } from "@react-navigation/core";
import { useTranslation } from "react-i18next";
import { enableExperimental } from "@utils";
import getUser from "../../selectors/UserSelectors";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import numFormat from "../../components/numFormat";
import CurrencyFormatter from "../../components/CurrencyFormatter";
import { TransactionExpandHistory } from "../../components";

import moment from "moment";
import { API_URL_LOKAL } from "@env";

const BlockLine = () => {
  return (
    <>
      <View style={styles.blockLine}>
        <View style={[styles.circle, styles.circleLeft]}></View>
        <View style={styles.line}></View>
        <View style={[styles.circle, styles.circleRight]}></View>
      </View>
    </>
  );
};

function HistoryBilling({ route }) {
  const [params, setParams] = useState(route?.params);
  console.log("params for venue code ?", params);
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const user = useSelector((state) => getUser(state));
  const [hasError, setErrors] = useState(false);
  const [bill, setBill] = useState([]);
  const [data, setData] = useState([]);
  const [dataCurrent, setDataCurrent] = useState([]);

  async function fetchData() {
    try {
      const entity_cd = params.entity_cd;
      const project_no = params.project_no;
      const debtor_acct = params.debtor_acct;
      const doc_no = params.doc_no;

      console.log("entirty", entity_cd);
      const res = await axios.get(
        API_URL_LOKAL +
          `/modules/billing/detail-history/IFCAPB/${user.user}/${entity_cd}/${project_no}/${debtor_acct}/${doc_no}`
      );
      console.log("res detail history", res.data.Data);
      setDataCurrent(res.data.Data);
      // console.log('DATA DUE DATE -->', dataCurrent);
    } catch (error) {
      setErrors(error.ressponse.data);
      // alert(hasError.toString());
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const clickAttachment = () => {
    const param = {
      entity_cd: params.entity_cd,
      project_no: params.project_no,
      debtor_acct: params.debtor_acct,
      doc_no: params.doc_no,
    };
    console.log("params for click attach]", param);
    navigation.navigate("AttachmentBilling", param);
    // if (data.debtor_acct == '') {
    //   // alert('Please Choose Debtor First');
    //   setMessage('Please choose debtor first');
    //   showModalSuccess(true);
    // } else {

    // }
  };

  return (
    <>
      <SafeAreaView
        style={[BaseStyle.safeAreaView, { flex: 1 }]}
        edges={["right", "top", "left"]}
      >
        <Header
          title={"Invoice History"}
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
        <ScrollView>
          <View style={styles.wrapper}>
            <View style={styles.block}>
              <View style={styles.contentWrapper}>
                <Text headline style={styles.title}>
                  {params.doc_no}
                </Text>
                <Text semibold style={styles.subTitle}>
                  {params.name}
                </Text>
                <View>
                  <Text semibold style={styles.subTitle}>
                    Doc date : {params.doc_date}
                  </Text>
                </View>
              </View>

              <View style={styles.logo}>
                <ImageBackground
                  source={require("../../assets/images/logo.png")}
                  style={styles.img}
                />
              </View>
            </View>
            <BlockLine />
            {dataCurrent.map((item, key) => (
              <View style={styles.blockTime} key={key}>
                <View style={styles.blockFrom}>
                  <View style={styles.contentWrapper}>
                    <Text
                      headline
                      semibold
                      numberOfLines={2}
                      style={styles.title}
                    >
                      {item.descs}
                    </Text>
                  </View>
                  <View semibold style={styles.contentWrapper}>
                    <Text style={styles.title}>{numFormat(item.mdoc_amt)}</Text>
                  </View>
                </View>
              </View>
            ))}

            {/* {dataCurrent.map((item, key) => (
              <View style={styles.blockTime} key={key}>
                <View style={styles.time}>
                  <View style={styles.contentWrapper}>
                    <Text semibold numberOfLines={2}>
                      {moment(item.doc_date).format('DD/MM/YY')}
                    </Text>
                  </View>

                  <View style={styles.contentWrapper}>
                  <Text semibold>
                    {moment(item.due_date).format('DD/MM/YY')}
                  </Text>
                </View>
                </View>

                <View style={styles.lineHori}>
                  <View style={[styles.dot, styles.dotBorder]}></View>
                  <View style={styles.lineDash}></View>
                  <View style={[styles.dot, styles.dotBack]}></View>
                </View>
                <View style={styles.blockFrom}>
                  <View style={styles.contentWrapper}>
                    <Text
                      headline
                      semibold
                      numberOfLines={2}
                      style={styles.title}>
                      {item.descs}
                    </Text>
                  </View>
                  <View semibold style={styles.contentWrapper}>
                    <Text style={styles.title}>{numFormat(item.mdoc_amt)}</Text>
                  </View>
                </View>
              </View>
            ))} */}

            <BlockLine />
            <View style={styles.blockCode}>
              <Text style={styles.titleCode}>Debtor</Text>
              <Text style={styles.title}>{params.debtor_acct}</Text>
            </View>
            <BlockLine />
            <View style={styles.blockCode}>
              <Text style={styles.title}>Total</Text>
              <View style={{ marginTop: 10, flexDirection: "row" }}>
                <View style={{ flexDirection: "column" }}>
                  <Text headline style={styles.title}>
                    Total Billing
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: "flex-end",
                    flexDirection: "row",
                    flex: 1,
                    alignItems: "center",
                    borderRadius: 4,
                  }}
                >
                  <Text bold style={{ backgroundColor: "#ededed", padding: 6 }}>
                    {params.mdoc_amt}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ marginHorizontal: 20, paddingBottom: 20 }}>
            <Button style={{ height: 35 }} onPress={() => clickAttachment()}>
              <Text style={{ color: "#fff", fontSize: 14 }}>Attachment</Text>
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ededed",
    padding: 10,
  },
  wrapper: {
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    // shadowOpacity: 0.2,
  },
  block: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contentWrapper: {
    flexDirection: "column",
  },
  title: {
    width: 250,
    paddingTop: 10,
  },
  subTitle: {
    color: "#8d9192",
  },
  logo: {},
  img: {
    width: 60,
    height: 60,
  },
  blockLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: -10,
    marginRight: -10,
    zIndex: 100,
  },
  circle: {
    width: 0,
    height: 0,
    borderTopWidth: 10,
    borderTopColor: "#ececec",
    borderRightWidth: 10,
    borderRightColor: "#ececec",
    borderBottomWidth: 10,
    borderBottomColor: "transparent",
    borderLeftWidth: 10,
    borderLeftColor: "transparent",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    shadowColor: "#b6b6b6",
    shadowRadius: 3,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    // shadowOpacity: 0.2,
    zIndex: 999,
  },
  circleLeft: {
    transform: [{ rotate: "45deg" }],
  },
  circleRight: {
    transform: [{ rotate: "-135deg" }],
  },
  blockTime: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  line: {
    borderWidth: 1,
    borderStyle: "dashed",
    flex: 1,
    borderColor: "#dbdbdb",
  },
  time: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
  lineHori: {
    // flexDirection: 'column',
    alignItems: "center",
    paddingHorizontal: 20,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  dotBorder: {
    borderColor: "red",
    borderStyle: "solid",
    borderWidth: 1,
  },
  dotBack: {
    backgroundColor: "red",
  },
  lineDash: {
    borderWidth: 1,
    borderStyle: "dashed",
    flex: 1,
    borderColor: "#dbdbdb",
  },
  blockFrom: {
    flexDirection: "column",
    alignSelf: "center",
  },
  blockCode: {
    flexDirection: "column",
    padding: 10,
  },
  titleCode: {
    fontSize: 16,
  },
  code: {
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold",
    color: "#f14d68",
    fontSize: 16,
  },
});

export default HistoryBilling;
