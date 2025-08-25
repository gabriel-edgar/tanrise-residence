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
  ListTransactionExpand,
  ListTransactionExpandNotPaid,
  Button,
  ButtonChooseProject,
} from "@/components";
import { BaseStyle, useTheme } from "@/config";
import { FRecentTransactions, FHotNews } from "@/data";
import { useNavigation, useRoute } from "@react-navigation/core";
import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { enableExperimental } from "@/utils";

import moment from "moment";
import Modal from "react-native-modal";
import { baseURL as API_URL_LOKAL } from "@/controllers/HttpClient";
import httpClient from "../../controllers/HttpClient";

import {
  ScrollView,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import HeaderHome from "./HeaderHome";
import styles from "./styles";
import HeaderCard from "./HeaderCard";
import getUser from "../../selectors/UserSelectors";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import numFormat from "../../components/numFormat";
import CurrencyFormatter from "../../components/CurrencyFormatter";
import ModalDropdown_debtor from "@/components/ModalDropdown_debtor";
import { ActivityIndicator } from "react-native-paper";
//import { store, persist } from "../../reducers";
import { store, persist } from "../../store";
// import { homeCommonProject } from "../FunctionAxios/home-common-project";
import { useCustomTriggerOnFocus } from "./funcFocusEffect";
import CheckBox from "@react-native-community/checkbox";
import numFormattanpaRupiah from "../../components/numFormattanpaRupiah";
import { normalizeFontSize } from "../function/dinamicFontSize";
import { FontWeight } from "../../config";

const Billing = (props) => {
  const itemData = props.route.params.item;
  //console.log("54 itemData: ", itemData);
  const { t } = useTranslation();
  const { colors } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const scrollViewRef = useRef(null);
  const user = useSelector((state) => getUser(state));
  const [hasError, setErrors] = useState(false);
  const [bill, setBill] = useState([]);
  const [data, setData] = useState([]);
  const [dataCurrent, setDataCurrent] = useState([]);
  console.log("user,", user);
  const [dataTowerUser, setdataTowerUser] = useState([]);
  const [arrDataProject, setArrDataProject] = useState([]);
  const [dataDD, setDataDD] = useState([]);

  const [email, setEmail] = useState(user.email);
  const [entity, setEntity] = useState("");
  const [project_no, setProjectNo] = useState("");
  const [db_profile, setDb_Profile] = useState("");
  const [spinner, setSpinner] = useState(true);
  const [loading, setLoading] = useState(true);
  const [paymentActive, setPaymentActive] = useState([]);
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [isStartMulti, setIsStartMulti] = useState(false);

  // const stateRedux = useSelector((state) => state.user);
  // console.log("81 accessTokenStateRedux: ", stateRedux.accessToken);

  const stateStore = store.getState();
  const token = stateStore.user.accessToken;
  console.log("82 accessToken: ", token);

  const stateReduxChoosedUnit = useSelector(
    (state) => state.Dataproject.choosedUnit
  );
  const stateReduxChoosedProject = useSelector(
    (state) => state.Dataproject.chooseProject
  );

  const TABS = [
    {
      id: 1,
      title: t("Not Paid"),
    },
    {
      id: 2,
      title: t("Paid"),
    },
  ];
  const [tab, setTab] = useState(TABS[0]);

  useEffect(() => {
    const id = route?.params?.id;
    if (id) {
      TABS.forEach((tab) => {
        tab.id == id && setTab(tab);
      });
    }
  }, [route?.params?.id]);

  useEffect(() => {
    //getTower(user);

    onRefresh();

    //setLoading(false);
    // setTimeout(() => {
    //   setLoading(false);
    //   getTower(user);
    //   // setSpinner(false);
    // }, 3000);
  }, []);

  const onRefresh = () => {
    // alert("run onRefresh");
    fetchData(); // not paid
    fetchDataCurrent(); // paid
    fetchDataPaymentActive();
  };

  const fetchDataPaymentActive = async () => {
    const getParams = {
      entity_cd: stateReduxChoosedUnit.entity_cd,
      project_no: stateReduxChoosedUnit.project_no,
      email: user.email,
      lot_no: stateReduxChoosedUnit.lot_no,
    };

    await httpClient
      .request({
        url: `/modules/billing/get-data-payment`,
        method: "GET",
        params: getParams,
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

        setPaymentActive(filter);
      })
      .catch((error) => {});
  };

  useCustomTriggerOnFocus(onRefresh, 8000);

  // not paid
  async function fetchData() {
    try {
      const res = await httpClient.request({
        url: `/modules/billing/due-summary/${user.email}`,
        method: "GET",
      });

      function checkLotno(currentValue, index, arr) {
        return (
          currentValue.lot_no == stateReduxChoosedUnit.lot_no &&
          currentValue.entity_cd == stateReduxChoosedProject.entity_cd &&
          currentValue.project_no == stateReduxChoosedProject.project_no
        );
      }

      const filter = res.data.data.filter(checkLotno);

      //console.log("214 stateReduxChoosedUnit: ", stateReduxChoosedUnit);

      function isEmptyObject(obj) {
        return Object.keys(obj).length === 0 && obj.constructor === Object;
      }

      if (isEmptyObject(stateReduxChoosedUnit)) {
        setDataCurrent(res.data.data);
      } else {
        setDataCurrent(filter);
      }

      console.log("200 DATA DUE DATE -->", res.data);
      setLoading(false);
    } catch (error) {
      setErrors(error.response.data);
      // alert(hasError.toString());
      setLoading(false);
    }
  }

  const scrollToBottom = () => {
    console.log("237 run scroll");
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  // ----- ini gak kepake kan? ga ada yang panggil const sum
  const sum =
    dataCurrent != 0
      ? dataCurrent.reduceRight((max, bills) => {
          return (max += parseInt(bills.mbal_amt));
        }, 0)
      : null;
  console.log("sum", sum);

  // paid
  async function fetchDataCurrent() {
    try {
      const res = await httpClient.request({
        url: `/modules/billing/current-summary/${user.email}`,
        method: "GET",
      });
      function checkLotno(currentValue, index, arr) {
        return (
          currentValue.lot_no == stateReduxChoosedUnit.lot_no &&
          currentValue.entity_cd == stateReduxChoosedProject.entity_cd &&
          currentValue.project_no == stateReduxChoosedProject.project_no
        );
      }

      const filter = res.data.data.filter(checkLotno);

      function isEmptyObject(obj) {
        return Object.keys(obj).length === 0 && obj.constructor === Object;
      }

      if (isEmptyObject(stateReduxChoosedUnit)) {
        setData(res.data.data);
      } else {
        setData(filter);
      }
      console.log("billing/current-summary: ", res.data);
      setLoading(false);
    } catch (error) {
      setErrors(error.response.data);
      // alert(hasError.toString());
      setLoading(false);
    }
  }

  console.log("240 data: ", data);

  //dropdownProject
  const [choosedProject, setChoosedProject] = useState();
  const handleSelect = (value) => {
    console.log("Selected Value:", value);
    //setState(value);
    setChoosedProject(value);
  };
  const dropdownItems = [
    // { label: "choose project", value: "" },
    { label: "Project 1", value: "Project 1" },
    { label: "Project 2", value: "Project 2" },
    { label: "Project 3", value: "Project 3" },
  ];

  const totalAmtNumber = selectedInvoices.reduce((sum, item) => {
    return sum + (parseFloat(item.mfinal_amt) || 0);
  }, 0);

  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView, { flex: 1 }]}
      edges={["right", "top", "left"]}
    >
      <View
        style={{
          backgroundColor: colors.background,
          shadowColor: colors.text, // Shadow color for iOS and Android
          shadowOffset: { width: 0, height: 2 }, // Shadow offset
          shadowOpacity: 0.2, // Shadow opacity (iOS)
          shadowRadius: 5, // Shadow blur (iOS)
          elevation: 3,
        }}
      >
        <Header
          title={"Invoice " + stateReduxChoosedUnit.lot_no}
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
        {/* {itemData.isProject == null && (
        <>
          <ButtonChooseProject
            items={dataDD}
            placeholder="Select project"
            onSelect={handleSelect}
            value2={choosedProject}
          />
          <Text>Choosed Project: {choosedProject}</Text>
        </>
      )} */}

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("BillingHistory");
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.primary,
            borderRadius: 10,
            padding: 10,
            margin: 20,
            marginTop: 10,
            width: "60%",
            alignSelf: "center",

            shadowColor: colors.text, // Shadow color for iOS and Android
            shadowOffset: { width: 0, height: 2 }, // Shadow offset
            shadowOpacity: 0.2, // Shadow opacity (iOS)
            shadowRadius: 5, // Shadow blur (iOS)
            elevation: 3,
          }}
        >
          <Icon
            name="clipboard-list"
            size={20}
            color="white"
            enableRTL={true}
          />
          <Text
            style={{
              textAlign: "center",
              marginLeft: 10,
              fontSize: normalizeFontSize(13),
              color: "white",
            }}
            allowFontScaling={true}
          >
            {"Payment Active ( "}
            <Text style={{ color: paymentActive.length > 0 ? "red" : "white" }}>
              {paymentActive.length}
            </Text>
            {" ) "}
            {/* {paymentActive.length > 0 ? "🔴" : ""} */}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        style={{
          // backgroundColor: "blue",
          paddingBottom: 20,
          paddingTop: 15,
          // borderTopWidth: 0.5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            //backgroundColor: "blue",
            paddingTop: 5,
          }}
        >
          {TABS.map((item, index) => (
            <View key={index} style={{ flex: 1, paddingHorizontal: 20 }}>
              <Tag
                primary
                style={{
                  backgroundColor:
                    tab.id == item.id ? colors.primary : colors.background,
                  shadowColor: colors.text, // Shadow color for iOS and Android
                  shadowOffset: { width: 0, height: 2 }, // Shadow offset
                  shadowOpacity: 0.2, // Shadow opacity (iOS)
                  shadowRadius: 5, // Shadow blur (iOS)
                  elevation: 3,
                }}
                onPress={() => {
                  enableExperimental();
                  setTab(item);
                }}
              >
                <Text
                  body1={tab.id != item.id}
                  light={tab.id != item.id}
                  whiteColor={tab.id == item.id}
                  style={{ fontSize: 16 }}
                >
                  {item.title}
                </Text>
              </Tag>
            </View>
          ))}
        </View>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <View
            style={{
              flex: 1,
              paddingHorizontal: 20,
              // backgroundColor: "blue",
              paddingBottom: 5,
              display: tab.id === 1 ? "flex" : "none",
            }}
          >
            {dataCurrent != 0 ? (
              dataCurrent.map((item, key) => (
                //not paid
                <>
                  <ListTransactionExpand
                    onPress={() => navigation.navigate("FHistoryDetail")}
                    // key={item.id}
                    key={key}
                    number={key}
                    tower={item.tower}
                    name={item.name}
                    trx_type={item.trx_type}
                    doc_no={item.doc_no}
                    doc_date={moment(item.doc_date).format("DD MMMM YYYY")}
                    descs={item.descs}
                    due_date={moment(item.due_date).format("DD MMMM YYYY")}
                    payment_date={"dummy payment"}
                    mbal_amt={`${numFormat(`${item.mbal_amt}`)}`}
                    lot_no={item.lot_no}
                    debtor_acct={item.debtor_acct}
                    entity_cd={entity}
                    project_no={project_no}
                    email={user.email}
                    tab_id={1}
                    item={item}
                    scrollToBottom={scrollToBottom}
                    isLast={dataCurrent.length == key + 1}
                    isPaymentActive={paymentActive.length}
                    style={{
                      borderRadius: 10,
                      marginTop: 20,
                      padding: 10,
                      backgroundColor: colors.background,
                      shadowColor: colors.text, // Shadow color for iOS and Android
                      shadowOffset: { width: 0, height: 2 }, // Shadow offset
                      shadowOpacity: 0.2, // Shadow opacity (iOS)
                      shadowRadius: 5, // Shadow blur (iOS)
                      elevation: 3,
                    }}
                    // checkBoxValue={true}
                    checkBoxValue={
                      !!selectedInvoices.find((i) => item.doc_no == i.doc_no)
                    }
                    checkBoxOnValueChange={() => {
                      if (!isStartMulti) {
                        setIsStartMulti(true);
                      }
                      const exists = selectedInvoices.find(
                        (i) => i.doc_no === item.doc_no
                      );
                      let newArray;

                      if (exists) {
                        // Remove the item
                        newArray = selectedInvoices.filter(
                          (i) => i.doc_no !== item.doc_no
                        );
                      } else {
                        // Add the item
                        newArray = [...selectedInvoices, item];
                      }

                      setSelectedInvoices(newArray);
                    }}
                  />
                </>
              ))
            ) : (
              <View
                style={{
                  flex: 1,
                  // height: '100%',
                  marginTop: "70%",
                  // justifyContent: 'center',
                  // alignContent: 'center',
                  // alignItems: 'center',
                  // alignSelf: 'center',
                }}
              >
                <Text
                  style={{
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                    fontSize: 16,
                    marginTop: 10,
                  }}
                >
                  Data not available.
                </Text>
              </View>
            )}
          </View>
        )}

        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            paddingBottom: 5,
            // backgroundColor: "blue",
            display: tab.id === 2 ? "flex" : "none",
          }}
        >
          {data.length != 0 ? (
            data.map((item, key) => (
              <ListTransactionExpand
                onPress={() => navigation.navigate("FHistoryDetail")}
                // key={item.id}
                key={key}
                number={key}
                tower={item.tower}
                name={item.name}
                trx_type={item.trx_type}
                doc_no={item.doc_no}
                doc_date={moment(item.doc_date).format("DD MMMM YYYY")}
                descs={item.descs}
                due_date={moment(item.due_date).format("DD MMMM YYYY")}
                payment_date={"dummy payment"}
                mbal_amt={`${numFormat(`${item.mbal_amt}`)}`}
                lot_no={item.lot_no}
                debtor_acct={item.debtor_acct}
                entity_cd={entity}
                project_no={project_no}
                email={user.email}
                tab_id={2}
                item={item}
                scrollToBottom={scrollToBottom}
                isLast={data.length == key + 1}
                isPaymentActive={paymentActive.length}
                style={{
                  borderRadius: 10,
                  marginTop: 20,
                  padding: 10,
                  backgroundColor: colors.background,
                  shadowColor: colors.text, // Shadow color for iOS and Android
                  shadowOffset: { width: 0, height: 2 }, // Shadow offset
                  shadowOpacity: 0.2, // Shadow opacity (iOS)
                  shadowRadius: 5, // Shadow blur (iOS)
                  elevation: 3,
                }}
              />
            ))
          ) : (
            <View
              style={{
                flex: 1,
                // height: '100%',
                marginTop: "70%",
                // justifyContent: 'center',
                // alignContent: 'center',
                // alignItems: 'center',
                // alignSelf: 'center',
              }}
            >
              <Text
                style={{
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  fontSize: 16,
                  marginTop: 10,
                  //color: "white",
                }}
              >
                Data not available.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      {tab.id == 1 && dataCurrent != 0 ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            paddingBottom: 20,

            backgroundColor: colors.background,
            shadowColor: colors.text, // Shadow color for iOS and Android
            shadowOffset: { width: 0, height: 2 }, // Shadow offset
            shadowOpacity: 0.2, // Shadow opacity (iOS)
            shadowRadius: 5, // Shadow blur (iOS)
            elevation: 3,
          }}
        >
          {/* <Text
            style={{
              flex: 0.2,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 10,
              padding: 10,
              marginRight: 10,
            }}
          >
            0
            
          </Text> */}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              gap: 3,
              flexDirection: "row",
            }}
          >
            <Text style={{ marginRight: 5 }}>All</Text>
            <CheckBox
              value={dataCurrent?.length == selectedInvoices.length}
              onValueChange={() => {
                if (dataCurrent?.length == selectedInvoices.length) {
                  setSelectedInvoices([]);
                } else {
                  setSelectedInvoices(dataCurrent);
                }
              }}
              disable={false}
              style={{ marginRight: 10 }}
              tintColors={{
                true: colors.primary,
                false: colors.background != "white" ? "white" : "black",
              }}
            />
          </View>
          <Text
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 10,
              padding: 10,
              marginRight: 10,
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 16,
            }}
            //value={message}
            //onChangeText={setMessage}
            //placeholder="Type a message"
          >
            {/* Rp. {numFormattanpaRupiah(selectedInvoices.reduce((sum,item)=>{return sum +(parseFloat(item.mfinal_amt) || 0)}, 0))} */}
            Rp. {numFormattanpaRupiah(totalAmtNumber.toFixed(2))}
          </Text>
          <TouchableOpacity
            style={{
              flex: 0.4,
              backgroundColor: colors.primary,
              padding: 10,
              borderRadius: 10,
            }}
            onPress={() => {
              if (paymentActive.length > 0) {
                alert(
                  'There is an active payment,\nPlease "pay and wait" or "cancel" payment'
                );
                return;
              }
              if (selectedInvoices.length == 0) {
                alert("Please select invoice");
                return;
              }
              navigation.navigate("MultiPaymentDetail", {
                selectedInvoices,
                totalAmt: numFormattanpaRupiah(totalAmtNumber.toFixed(2)),
                totalAmtNumber: totalAmtNumber,
              });
            }}
          >
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
              }}
            >
              Pay ({selectedInvoices.length})
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default Billing;
