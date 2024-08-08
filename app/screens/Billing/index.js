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
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { enableExperimental } from "@utils";

import moment from "moment";
import Modal from "react-native-modal";
import { API_URL_LOKAL } from "@env";

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

const Billing = ({
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
  console.log("user,", user);
  const [dataTowerUser, setdataTowerUser] = useState([]);
  const [arrDataTowerUser, setArrDataTowerUser] = useState([]);

  const [email, setEmail] = useState(user.user);
  const [entity, setEntity] = useState("");
  const [project_no, setProjectNo] = useState("");
  const [db_profile, setDb_Profile] = useState("");
  const [spinner, setSpinner] = useState(true);
  const [loading, setLoading] = useState(true);
  const TABS = [
    {
      id: 1,
      title: t("Paid"),
    },
    {
      id: 2,
      title: t("Not Paid"),
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
  const getTower = async () => {
    const data = {
      email: email,
      //   email: 'haniyya.ulfah@ifca.co.id',
      app: "O",
    };

    const config = {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        // token: "",
      },
    };

    await axios
      .get(
        // `http://apps.pakubuwono-residence.com/apisysadmin/api/getProject/${data.email}`,
        API_URL_LOKAL + `/getData/mysql/${data.email}/${data.app}`,
        {
          config,
        }
      )
      .then((res) => {
        const datas = res.data;

        const arrDataTower = datas.Data;
        // let dataArr = {};
        arrDataTower.map((dat) => {
          if (dat) {
            console.log("data trower", dat.entity_cd);
            setdataTowerUser(dat);
            setEntity(dat.entity_cd);
            setProjectNo(dat.project_no);
            // const jsonValue = JSON.stringify(dat);
            //   setdataFormHelp(saveStorage);
            // console.log('storage', saveStorage);
            // dataArr.push(jsonValue);
            // getDebtor(dat);
          }
        });
        // AsyncStorage.setItem('@DataTower', dataArr);
        setArrDataTowerUser(arrDataTower);

        setSpinner(false);
        // return res.data;
      })
      .catch((error) => {
        console.log("error get tower api", error);
        alert("error get");
      });
  };

  useEffect(() => {
    getTower(user);
    setLoading(false);
    // setTimeout(() => {
    //   setLoading(false);
    //   getTower(user);
    //   // setSpinner(false);
    // }, 3000);
  }, []);
  // Make function to call the api
  async function fetchData() {
    try {
      const res = await axios.get(
        API_URL_LOKAL + `/getDataDueSummary/IFCAPB/${user.user}`
      );
      setDataCurrent(res.data.Data);
      console.log("DATA DUE DATE -->", res.data.Data);
      setLoading(false);
    } catch (error) {
      setErrors(error.ressponse.data);
      // alert(hasError.toString());
    }
  }

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
      const res = await axios.get(
        API_URL_LOKAL + `/getDataCurrentSummary/IFCAPB/${user.user}`
      );
      setData(res.data.Data);
      console.log("data current", res.data.Data);
      setLoading(false);
    } catch (error) {
      setErrors(error.ressponse.data);
      // alert(hasError.toString());
    }
  }

  useEffect(() => {
    fetchData();
    fetchDataCurrent();
  }, []);

  //dropdownProject
  const [choosedProject, setChoosedProject] = useState("");
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
      <ButtonChooseProject
        items={dropdownItems}
        placeholder="Select project"
        onSelect={handleSelect}
      />
      <Text>Choosed project: {choosedProject}</Text>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
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
                    email={user.user}
                    tab_id={1}
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
                      Sorry! Data not available.
                    </Text>
                  </View>
                )}
          </View>
        )}

        <View style={{ flex: 1, paddingHorizontal: 20 }}>
          {tab.id == 2 && data != null
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
                  email={user.user}
                  tab_id={2}
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
                    }}
                  >
                    Sorry! Data not available.
                  </Text>
                </View>
              )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Billing;
