import {
  Text,
  TextInput,
  // CheckBox,
  PlaceholderLine,
  Placeholder,
  Button,
  SafeAreaView,
  Header,
  Icon,
} from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
import { CheckBox } from "react-native-elements";

import { useNavigation } from "@react-navigation/native";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, TouchableOpacity, View, ScrollView } from "react-native";

import { useSelector } from "react-redux";
import getUser from "../../selectors/UserSelectors";
import axios from "axios";
import client from "../../controllers/HttpClient";
import styles from "./styles";

import ModalDropdown_debtor from "@components/ModalDropdown_debtor";
import ModalDropdown_lotno from "@components/ModalDropdown_lotno";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL_LOKAL } from "@env";
export default function SpecTrofficeHouse(props) {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  console.log("propzzz", props);
  console.log("pecah data props", props.route.params);
  const [dataCategory, setDataCategory] = useState(props.route.params.data);
  const [indexCategory, setIndexCategory] = useState(props.route.params.index);

  const [dataTowerUser, setdataTowerUser] = useState([]);
  const [arrDataTowerUser, setArrDataTowerUser] = useState([]);
  const users = useSelector((state) => getUser(state));
  const [email, setEmail] = useState(users.user);

  const [urlApi, seturlApi] = useState(client);
  const [checkedEntity, setCheckedEntity] = useState(false);
  const [dataDebtor, setDataDebtor] = useState([]);
  const [entity, setEntity] = useState("");
  const [project_no, setProjectNo] = useState("");
  const [db_profile, setDb_Profile] = useState("");
  const [spinner, setSpinner] = useState(true);

  const [debtor, setDebtor] = useState("");
  const [textDebtor, settextDebtor] = useState("");
  const [textNameDebtor, settextNameDebtor] = useState("");
  const [dataLotno, setDataLotno] = useState([]);
  const [textLot, setLotno] = useState("");
  const [textSlot, setSlot] = useState("");
  const [zoneCode, setZone] = useState("");
  const [reportName, setreportName] = useState(users.name);
  const [contactNo, setcontactNo] = useState("");
  const [requiredText, setrequiredText] = useState(false);
  const [textFloor, settextFloor] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const [tenant_no, setTenantNo] = useState("");

  const [defaulTower, setDefaultTower] = useState(false);
  const [defaultDebtor, setDefaultDebtor] = useState(false);
  const [defaultLotNo, setDefaultLotNo] = useState(false);
  const [workRequested, setworkRequested] = useState("");

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
        API_URL_LOKAL + `/home/common-project/mysql/${data.email}/${data.app}`,
        {
          config,
        }
      )
      .then((res) => {
        const datas = res.data;

        const arrDataTower = datas.Data;
        console.log("data tower ada berapa", arrDataTower.length);

        // arrDataTower.length > 1
        if (arrDataTower.length > 1) {
          setDefaultTower(false);
        } else {
          setDefaultTower(true);
          setCheckedEntity(true);
          setEntity(arrDataTower[0].entity_cd);
          setProjectNo(arrDataTower[0].project_no);
          setDb_Profile(arrDataTower[0].db_profile);
          const params = {
            entity_cd: arrDataTower[0].entity_cd,
            project_no: arrDataTower[0].project_no,
            db_profile: arrDataTower[0].db_profile,
          };
          console.log("params for debtor tower default", params);
          getDebtor(params);
        }

        arrDataTower.map((dat) => {
          if (dat) {
            setdataTowerUser(dat);
            // const jsonValue = JSON.stringify(dat);
            //   setdataFormHelp(saveStorage);
            // console.log('storage', saveStorage);
            // dataArr.push(jsonValue);
          }
        });
        // console.log('arrdatatower yang 1 aja default', arrDataTower);
        setArrDataTowerUser(arrDataTower);

        setSpinner(false);
        // let dataArr = {};

        // return res.data;
      })
      .catch((error) => {
        console.log("error get tower api", error);
        // alert('error get');
      });
  };

  //-----FOR GET DEBTOR
  const getDebtor = async (data) => {
    // console.log(object)
    console.log("data for debtor", data);

    const params =
      "?" +
      "entity_cd=" +
      data.entity_cd +
      "&" +
      "project_no=" +
      data.project_no +
      "&" +
      "email=" +
      email;

    console.log("data for", params);

    const config = {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        token: "",
      },
    };
    await axios
      .post(API_URL_LOKAL + "/modules/cs/debtor" + params, {
        config,
      })
      .then((res) => {
        // console.log('res', res);
        const datas = res.data;
        const dataDebtors = datas.Data;
        console.log("res debtor", dataDebtors);
        console.log("ada berapa length debtor", dataDebtors.length);

        if (dataDebtors.length > 1) {
          setDefaultDebtor(false);
        } else {
          setDefaultDebtor(true);
          setDebtor(dataDebtors[0].debtor_acct);
          setTenantNo(dataDebtors[0].tenant_no);
          settextDebtor(
            dataDebtors[0].debtor_acct + " - " + dataDebtors[0].name
          );
          settextNameDebtor(dataDebtors[0].name);
          const params = {
            entity_cd: data.entity_cd,
            project_no: data.project_no,
            tenant_no: dataDebtors[0].tenant_no,
          };
          console.log("params for lotno default", params);

          // setCheckedEntity(true);

          getLot(params, "");
          setSpinner(false);
          // console.log('params for debtor tower default', params);
          // getDebtor(params);
        }

        setDataDebtor(dataDebtors);

        // return res.data;
      })
      .catch((error) => {
        console.log("error get tower api", error.response);
        // alert('error get');
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      getTower(users);
      // setSpinner(false);
    }, 3000);
  }, []);

  const handleCheckChange = (index, data) => {
    setCheckedEntity(index);

    setEntity(data.entity_cd);
    setProjectNo(data.project_no);
    setDb_Profile(data.db_profile);
    getDebtor(data);
  };

  const handleChangeModal = ({ data, index }) => {
    console.log("index,", index);
    // console.log('data chjange', data);
    // data.data.map(dat => {
    //   console.log('data for text debtor', dat);
    //   if (dat) {

    setDebtor(index.debtor_acct);
    setTenantNo(index.tenant_no);
    settextDebtor(index.debtor_acct + " - " + index.name);
    settextNameDebtor(index.name);
    getLot("", index.tenant_no);
    //   }
    // });
    setSpinner(false);
  };

  const getLot = async (data, tenantno) => {
    console.log("tenant_no lot", data);
    const params = {
      entity_cd: entity || data.entity_cd,
      project_no: project_no || data.project_no,
      email: email,
      tenant_no: tenantno || data.tenant_no,
    };
    const config = {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        token: "",
      },
    };

    console.log(
      "url lotSlot",
      "http://apps.pakubuwono-residence.com/apiwebpbi/api/csentry-lotSlot",
      params
    );

    await axios
      .post(API_URL_LOKAL + "/modules/troffice/lot-no", params, {
        config,
      })
      .then((res) => {
        // console.log('datalotno', res);
        const datas = res.data;
        const dataLotno = datas.Data;
        console.log("datalotno >", dataLotno);
        console.log("datalotno >", datas);

        console.log("ada berapa length debtor", dataLotno.length);
        // console.log(object)

        if (dataLotno.length > 1) {
          setDefaultLotNo(false);
        } else {
          setDefaultLotNo(true);
          setLotno(dataLotno[0].lot_no);
          setSlot(dataLotno[0].slot);
          setZone(dataLotno[0].zone_cd);
          // this.setState({textLot: lot});
          getFloor(dataLotno[0].lot_no);
          setSpinner(false);
          // console.log('params for debtor tower default', params);
          // getDebtor(params);
        }

        setDataLotno(dataLotno);

        // return res.data;
      })
      .catch((error) => {
        console.log("error get lotno api", error.response);
        // alert('error get');
      });
  };

  const handleLotChange = (lot, zone, slot) => {
    console.log("lot", lot);
    console.log("zones", zone);
    setSlot(slot);
    setLotno(lot);
    setZone(zone);
    // this.setState({textLot: lot});
    getFloor(lot);
  };

  const getFloor = async (lot) => {
    console.log("lot getfloor", lot);
    const lotno = lot;

    const params = {
      lotno: lotno,
    };

    const config = {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        token: "",
      },
    };

    await axios
      .post(API_URL_LOKAL + "/modules/cs/floor", params, {
        config,
      })
      .then((res) => {
        // console.log('res floor', res);
        const datas = res.data;

        const dataFloor = datas.Data;

        settextFloor(dataFloor);

        // return res.data;
      })
      .catch((error) => {
        console.log("error get floor api", error.response);
        alert("error get");
      });
  };

  const handleNavigation = async () => {
    // try {
    console.log("textfloor spec help", textFloor);
    if (
      (!contactNo && !reportName && textLot.length < 0) ||
      textLot == "" ||
      textLot == null
    ) {
      alert("Please Check Field Lot No Entry");
    } else {
      const saveStorage = {
        contactNo: contactNo,
        workRequested: workRequested,
        reportName: reportName,
        entity_cd: entity,
        project_no: project_no,
        dataDebtor: dataDebtor[0],
        lot_no: dataLotno[0],
        slot: textSlot,
        floor: textFloor,
        category_cd: dataCategory.category_cd,
        zone_cd: zoneCode,
        select_lot_no: textLot,
      };
      const jsonValue = JSON.stringify(saveStorage);
      //   setdataFormHelp(saveStorage);
      console.log("awal mula props", saveStorage);

      await AsyncStorage.setItem("@troStorage", jsonValue);
      // navigation.navigate('CategoryHelp', {saveStorage});
      // if()
      navigation.navigate("SeatBokings", saveStorage);
      // navigation.navigate('SeatBooking', saveStorage);
    }
  };

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={["right", "top", "left"]}
    >
      <Header
        title={t("ticket")} //belum dibuat lang
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
      <View style={styles.wrap}>
        <Text title>Ticket</Text>
        <Text headline style={{ fontWeight: "normal" }}>
          Form TR Office
        </Text>

        {/* {dataCategory.descs.includes('AC') ? <Text>ini klik ac</Text> : <Text>ini klik water</Text>} */}
        {/* {indexCategory == 0 ? <Text>ini klik ac</Text> : <Text>ini klik water</Text>} */}

        <View style={[styles.subWrap, { paddingBottom: 0, marginBottom: 10 }]}>
          <View>
            <Text style={{ color: "#3f3b38", fontSize: 14 }}>
              Choose Project
            </Text>
            {spinner ? (
              <View>
                {/* <Spinner visible={this.state.spinner} /> */}
                <Placeholder
                  style={{ marginVertical: 4, paddingHorizontal: 10 }}
                >
                  <PlaceholderLine
                    width={100}
                    noMargin
                    style={{ height: 40 }}
                  />
                </Placeholder>
              </View>
            ) : defaulTower ? (
              <CheckBox
                checked={checkedEntity}
                title={arrDataTowerUser[0].project_descs}
                onPress={() => setCheckedEntity(!checkedEntity)}
              ></CheckBox>
            ) : (
              arrDataTowerUser.map((data, index) => (
                <CheckBox
                  key={index}
                  // checkedIcon="dot-circle-o"
                  // uncheckedIcon="circle-o"
                  title={data.project_descs}
                  checked={checkedEntity === index}
                  onPress={() => handleCheckChange(index, data)}
                />
              ))
            )}
          </View>
        </View>
        {checkedEntity === false ? null : (
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
          >
            <View>
              <View style={{ marginBottom: 5, paddingBottom: 0, marginTop: 5 }}>
                <ModalDropdown_debtor
                  label="Debtor"
                  data={dataDebtor}
                  onChange={(index) =>
                    handleChangeModal({ data: dataDebtor, index })
                  }
                  value={textDebtor}
                  style={{ marginBottom: 0, paddingBottom: 0 }}
                />
              </View>

              <Text
                style={{
                  color: "#3f3b38",
                  fontSize: 14,
                  marginBottom: 0,
                  paddingBottom: 0,
                  marginTop: 0,
                  paddingTop: 0,
                }}
              >
                Username
              </Text>
              <TextInput
                editable={false} //wajib true kalo mau di klik-klik / di isi manual
                value={textNameDebtor} //dari nama debtor
                onChangeText={(text) => settextNameDebtor(text)}
                style={{
                  marginBottom: 0,
                  paddingBottom: 0,
                  marginTop: 0,
                  paddingTop: 0,
                }}
              />
              <View style={{ marginTop: 15 }}>
                <ModalDropdown_lotno
                  label="Lot No"
                  data={dataLotno}
                  onChange={(option) =>
                    handleLotChange(option.lot_no, option.zone_cd, option.slot)
                  }
                  value={textLot}
                />
              </View>
              <View style={{ marginTop: 0 }}>
                <Text
                  style={{
                    color: "#3f3b38",
                    fontSize: 14,
                    marginBottom: 0,
                    paddingBottom: 0,
                    marginTop: 0,
                    paddingTop: 0,
                  }}
                >
                  Taken By
                </Text>
                <TextInput
                  placeholder="Reported By"
                  editable={true}
                  value={reportName}
                  onChangeText={(text) => setreportName(text)}
                />
              </View>
              <View style={{ marginTop: 15 }}>
                <Text
                  style={{
                    color: "#3f3b38",
                    fontSize: 14,
                    marginBottom: 0,
                    paddingBottom: 0,
                    marginTop: 0,
                    paddingTop: 0,
                  }}
                >
                  Contact No
                </Text>
                <TextInput
                  keyboardType="number-pad"
                  placeholder="Contact No"
                  editable={true}
                  value={contactNo}
                  onChangeText={(text) => setcontactNo(text)}
                />
              </View>
              <View style={{ marginTop: 15 }}>
                <Text
                  style={{
                    color: "#3f3b38",
                    fontSize: 14,
                    marginBottom: 0,
                    paddingBottom: 0,
                    marginTop: 0,
                    paddingTop: 0,
                  }}
                >
                  Work Requested
                </Text>
                <TextInput
                  placeholder="Work Requested"
                  editable={true}
                  value={workRequested}
                  onChangeText={(text) => setworkRequested(text)}
                  required={requiredText}
                />
              </View>

              <Button
                style={{
                  width: 100,
                  height: 45,
                  alignSelf: "center",
                  marginTop: 20,
                }}
                onPress={() => handleNavigation()}
              >
                <Text style={{ color: "#FFF" }}>Next</Text>
              </Button>
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
