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
  Button,
  ButtonChooseProject,
} from "@components";
import { BaseStyle, useTheme } from "@config";
import { FRecentTransactions, FHotNews } from "@data";
import { useNavigation, useRoute } from "@react-navigation/core";
import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { enableExperimental } from "@utils";

import moment from "moment";
import Modal from "react-native-modal";
import { API_URL_LOKAL } from "@env";
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
import ModalDropdown_debtor from "@components/ModalDropdown_debtor";
import { ActivityIndicator } from "react-native-paper";
//import { store, persist } from "../../reducers";
import { store, persist } from "../../store";
import { homeCommonProject } from "../FunctionAxios/home-common-project";

const Billing = (
  props,
  {
    isCenter = false,
    isPrimary = false,
    style = {},
    onPress = () => {},
    disabled = false,
  }
) => {
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

  const stateRedux = useSelector((state) => state.user);
  console.log("81 accessTokenStateRedux: ", stateRedux.accessToken);

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
  //-----FOR GET ENTITY & PROJJECT
  // const getTower = async () => {
  //   const data = {
  //     email: email,
  //     //   email: 'haniyya.ulfah@ifca.co.id',
  //     //app: "O",
  //   };

  //   await homeCommonProject(token, data, setDataDD, setArrDataProject);

  //   return;

  //   console.log("105 token: ", token);

  //   const config = {
  //     // headers: {
  //     //   accept: "application/json",
  //     //   "Content-Type": "application/json",
  //     //   // token: "",
  //     // },
  //     params: data,
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       //Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjcmVkZW50aWFscyI6eyJlbWFpbCI6Im1nckBpZmNhLmNvLmlkIiwicGFzc3dvcmQiOiJwYXNzMTIzNCJ9LCJleHAiOjE3MjM0NDc1NDR9.nQdbeI7VN6t0g5QvUn0vsNhp1frkYNjwr_dMuinMRZA`,
  //     },
  //   };

  //   await axios
  //     .get(API_URL_LOKAL + `/home/common-project`, config)
  //     .then((res) => {
  //       console.log("125 res: ", res.data.data);

  //       const arrDataTower = res.data.data;
  //       console.log("141 res: ", arrDataTower);

  //       const arrayDropDown = arrDataTower.map((item, index) => {
  //         return { label: item.descs, value: index };
  //       });

  //       console.log("147 arrayDropDown: ", arrayDropDown);
  //       setDataDD(arrayDropDown);

  //       // let dataArr = {};
  //       arrDataTower.map((dat) => {
  //         if (dat) {
  //           console.log("data trower", dat.entity_cd);
  //           setdataTowerUser(dat);
  //           setEntity(dat.entity_cd);
  //           setProjectNo(dat.project_no);
  //           // const jsonValue = JSON.stringify(dat);
  //           //   setdataFormHelp(saveStorage);
  //           // console.log('storage', saveStorage);
  //           // dataArr.push(jsonValue);
  //           // getDebtor(dat);
  //         }
  //       });
  //       // AsyncStorage.setItem('@DataTower', dataArr);
  //       setArrDataTowerUser(arrDataTower);

  //       setSpinner(false);
  //       // return res.data;
  //     })
  //     .catch((error) => {
  //       console.log("125 error get tower api", error);
  //       //alert("125 error get: ", error);
  //     });
  // };

  useEffect(() => {
    //getTower(user);

    fetchData();
    fetchDataCurrent();

    //setLoading(false);
    // setTimeout(() => {
    //   setLoading(false);
    //   getTower(user);
    //   // setSpinner(false);
    // }, 3000);
  }, []);

  // Make function to call the api
  async function fetchData() {
    try {
      // const res = await axios.get(
      //   API_URL_LOKAL + `/modules/billing/due-summary/${user.email}`
      // );
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

  async function fetchDataCurrent() {
    try {
      // const res = await axios.get(
      //   API_URL_LOKAL + `/modules/billing/current-summary/IFCAPB/${user.user}`
      // );
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

      console.log("251 stateReduxChoosedUnit: ", stateReduxChoosedUnit);

      if (isEmptyObject(stateReduxChoosedUnit)) {
        setData(res.data.data);
      } else {
        setData(filter);
      }
      console.log("data current", res.data);
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

  if (itemData.isProject == 1) {
    if (
      choosedProject == null //|| choosedProject == ""
    ) {
      return (
        <SafeAreaView
          style={BaseStyle.safeAreaView}
          edges={["right", "top", "left"]}
        >
          <Header
            // title={t('choose_friend')}
            title={t("Invoice")} //belum ada lang translatenya
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
          <ButtonChooseProject
            items={dataDD}
            placeholder="Select project"
            onSelect={handleSelect}
          />
        </SafeAreaView>
      );
    }
  }

  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView, { flex: 1 }]}
      edges={["right", "top", "left"]}
    >
      <Header
        title={t("Invoice")}
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
      {itemData.isProject == 1 && (
        <>
          <ButtonChooseProject
            items={dataDD}
            placeholder="Select project"
            onSelect={handleSelect}
            value2={choosedProject}
          />
          <Text>Choosed Project: {choosedProject}</Text>
        </>
      )}
      {/* <View
        style={{
          //borderWidth: 1,
          padding: 10,
          margin: 10,
          backgroundColor: "white",
          borderRadius: 8,
          padding: 16,
          margin: 16,
          shadowColor: "#000", // Shadow color for iOS
          shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
          shadowOpacity: 0.25, // Shadow opacity for iOS
          shadowRadius: 4, // Shadow radius for iOS
          elevation: 5, // Elevation for Android
        }}
      >
        <Text>
          Entity Code {"   "}: {stateReduxChoosedUnit.entity_cd}
        </Text>
        <Text>
          Project No {"     "}: {stateReduxChoosedUnit.project_no}
        </Text>
        <Text>Cluster Code : {stateReduxChoosedUnit.cluster_cd}</Text>
        <Text>
          Lot No {"            "}: {stateReduxChoosedUnit.lot_no}
        </Text>
      </View> */}
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {TABS.map((item, index) => (
            <View key={index} style={{ flex: 1, paddingHorizontal: 20 }}>
              <Tag
                primary
                style={{
                  backgroundColor:
                    tab.id == item.id ? colors.primary : colors.background,
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
          <View style={{ flex: 1, paddingHorizontal: 20 }}>
            {tab.id == 1 && dataCurrent != 0
              ? dataCurrent.map((item, key) => (
                  <ListTransactionExpand
                    onPress={() => navigation.navigate("FHistoryDetail")}
                    // key={item.id}
                    key={key}
                    tower={item.tower}
                    name={item.name}
                    trx_type={item.trx_type}
                    doc_no={item.doc_no}
                    doc_date={moment(item.doc_date).format("DD MMMM YYYY")}
                    descs={item.descs}
                    due_date={moment(item.due_date).format("DD MMMM YYYY")}
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
                  />
                ))
              : tab.id == 1 &&
                dataCurrent == 0 && (
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
                    {/* <IconFontisto
                    name="holiday-village"
                    size={40}
                    color={colors.primary}
                    style={{
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}></IconFontisto> */}
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

        <View style={{ flex: 1, paddingHorizontal: 20 }}>
          {tab.id == 2 && data.length != 0
            ? data.map((item, key) => (
                <ListTransactionExpand
                  onPress={() => navigation.navigate("FHistoryDetail")}
                  // key={item.id}
                  key={key}
                  tower={item.tower}
                  name={item.name}
                  trx_type={item.trx_type}
                  doc_no={item.doc_no}
                  doc_date={moment(item.doc_date).format("DD MMMM YYYY")}
                  descs={item.descs}
                  due_date={moment(item.due_date).format("DD MMMM YYYY")}
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
                />
              ))
            : tab.id == 2 && (
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
                  {/* <IconFontisto
                    name="holiday-village"
                    size={40}
                    color={colors.primary}
                    style={{
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}></IconFontisto> */}
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
    </SafeAreaView>
  );
};

export default Billing;
