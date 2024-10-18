import {
  Text,
  TextInput,
  // CheckBox,
  PlaceholderLine,
  Placeholder,
  Button,
  SafeAreaView,
  RefreshControl,
  Header,
  Icon,
  CategoryIconSoft,
} from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
import { CheckBox, Badge } from "react-native-elements";
import { Image } from "react-native";
import { parseHexTransparency } from "@utils";
import { useNavigation } from "@react-navigation/native";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  TouchableOpacity,
  View,
  Platform,
  TouchableHighlight,
} from "react-native";

import { useSelector } from "react-redux";
import getUser from "../../selectors/UserSelectors";
import axios from "axios";
import client from "../../controllers/HttpClient";
import styles from "./styles";

import { RadioButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL_LOKAL } from "@env";
export default function StatusHelpHouseNeo({ route }) {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const [dataTowerUser, setdataTowerUser] = useState([]);
  const [arrDataTowerUser, setArrDataTowerUser] = useState([]);
  const users = useSelector((state) => getUser(state));
  const [email, setEmail] = useState(users.user);
  const [urlApi, seturlApi] = useState(client);
  const [entity, setEntity] = useState("");
  const [project_no, setProjectNo] = useState("");
  const [db_profile, setDb_Profile] = useState("");
  const [checkedEntity, setCheckedEntity] = useState(false);
  const [spinner, setSpinner] = useState(true);
  const [dataStatus, setDataStatus] = useState([]);
  const [show, setShow] = useState(false);
  const [isDisabled, setDisabled] = useState(false);

  const [defaulTower, setDefaultTower] = useState(false);
  const [defaultStatus, setDefaultStatus] = useState(false);

  //   console.log('passprop kategori help', passProp);
  const styleItem = {
    ...styles.profileItem,
    borderBottomColor: colors.border,
  };
  //-----FOR GET ENTITY & PROJJECT
  const getTower = async () => {
    const data = {
      email: email,
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
        API_URL_LOKAL + `/home/common-project/mysql/${data.email}/${data.app}`,
        {
          config,
        }
      )
      .then((res) => {
        const datas = res.data;

        const arrDataTower = datas.Data;
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
          // getDebtor(params);
          getTicketStatus(params);
          setShow(true);
        }
        arrDataTower.map((dat) => {
          if (dat) {
            setdataTowerUser(dat);
          }
        });
        setArrDataTowerUser(arrDataTower);
        setSpinner(false);

        // return res.data;
      })
      .catch((error) => {
        console.log("error get tower api", error);
        // alert('error get');
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      getTower();

      // getCategoryHelp;
      // setSpinner(false);
    }, 3000);
  }, []);

  const handleCheckChange = (index, data) => {
    setCheckedEntity(index);
    setShow(true);

    setEntity(data.entity_cd);
    setProjectNo(data.project_no);
    setDb_Profile(data.db_profile);
    getTicketStatus(data);
  };

  const getTicketStatus = async (data) => {
    console.log("data for status", data);
    const dT = data;

    const formData = {
      entity_cd: dT.entity_cd,
      project_no: dT.project_no,
      email: email,
    };

    console.log("formdata", formData);
    const config = {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        token: "",
      },
    };

    await axios
      .post(
        API_URL_LOKAL + "/modules/troffice/ticket-status-count/IFCAPB",
        formData,
        {
          config,
        }
      )
      .then((res) => {
        const datas = res.data;

        console.log("data kategori", datas.Error);
        if (datas.Error === false) {
          const datastatus = datas.Data;
          console.log("datastatus", datastatus);

          if (datastatus.length > 1) {
            setDefaultStatus(false);
          } else {
            setDefaultStatus(true);
            setSpinner(false);
          }

          setDataStatus(datastatus);
        } else {
          setDisabled(false);
        }

        // setSpinner(false);
        // return res.data;
      })
      .catch((error) => {
        console.log("error get status api", error.response);
        // alert('error get');
      });
  };

  const handleNavigation = (data, ticketStatus) => {
    console.log("data where tiket statuss", data);
    console.log("tikett status", ticketStatus);
    setDisabled(true);
    getTicketWhereStatus(data, ticketStatus);
  };
  const getTicketWhereStatus = async (data, ticketStatus) => {
    console.log("data where", data);
    console.log("tiket state where", ticketStatus);

    const formData = {
      email: email,
      status: ticketStatus,
      category_cd: "'AC01','PL07'",
    };
    console.log("formData", formData);
    const config = {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        token: "",
      },
    };
    console.log(
      "test get data > ",

      `http://apps.pakubuwono-residence.com/apiwebpbi/api/modules/troffice/ticket-by-status/IFCAPB?email=${formData.email}&status=${formData.status}&category_cd=${formData.category_cd}`,
      //   formData,
      {
        config,
      }
    );
    await axios
      .post(
        API_URL_LOKAL + "/modules/troffice/ticket-by-status/IFCAPB",
        // `http://apps.pakubuwono-residence.com/apiwebpbi/api/modules/troffice/ticket-by-status/IFCAPB?email=${formData.email}&status=${formData.status}&category_cd=${formData.category_cd}`,
        formData,
        {
          config,
        }
      )
      .then((res) => {
        const datas = res.data;

        console.log("data datastatuswhere", datas);
        const datastatuswhere = datas.Data;
        // navigation.navigate('ViewHistoryStatus', {datastatuswhere}); //sementara krn data 0
        if (datas.Error === false) {
          const datastatuswhere = datas.Data;
          // setDataStatus(datastatus);
          navigation.navigate("ViewHistoryStatusTRO", datastatuswhere);
          console.log("datastatuswhere", datastatuswhere);
        } else {
          setDisabled(false);
        }

        // setSpinner(false);
        // return res.data;
      })
      .catch((error) => {
        console.log("error get where status api", error.response);
        alert("error get");
      });
  };

  //    const onCategoryPress = cat => {
  //        this.setState({isDisabled: true}, () => {
  //          this.goToScreen('screen.SelectCategory', cat);
  //        });
  //      };
  const ds = dataStatus;
  console.log("ds", ds);
  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={["right", "top", "left"]}
    >
      <Header
        title={t("status")} //belum dibuat lang
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
        <Text title2>Ticket</Text>
        <Text headline style={{ fontWeight: "normal" }}>
          Status Help TR Office
        </Text>

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

          {show && checkedEntity === true ? (
            <View style={{ marginTop: 30, marginHorizontal: 10 }}>
              <TouchableOpacity
                // onPress={() => handleNavigation(dataTowerUser, "'R'")}
                onPress={() => handleNavigation(dataTowerUser, "R")}
                disabled={ds.cntopen == 0 ? true : false}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#555",
                  //   paddingTop: 1,
                }}
              >
                <View
                  style={{
                    justifyContent: "space-around",
                    flexDirection: "row",
                    alignContent: "center",
                    alignItems: "center",

                    // alignSelf: 'center',
                  }}
                >
                  {/* <CategoryIconSoft
                      isRound
                      size={25}
                      name="angle-left"
                      // style={{marginTop: 10}}
                    /> */}
                  <View
                    style={{
                      borderRadius: 20,
                      // width: 50,
                      // height: 50,
                      width: 60,
                      height: 60,
                      // borderRadius: 8,
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 10,
                      backgroundColor: parseHexTransparency(
                        colors.primary,
                        100
                      ),
                    }}
                  >
                    <Icon
                      name={"tasks"}
                      size={25}
                      color={BaseColor.whiteColor}
                      solid
                    />
                  </View>

                  {/* <Image
                      source={require('@assets/images/icon-helpdesk/newtiket.png')}
                      style={styles.img}></Image> */}
                  <Text
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                      marginBottom: 10,
                    }}
                  >
                    Open
                  </Text>

                  <Badge
                    badgeStyle={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      backgroundColor: "#42B649",
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                      marginBottom: 5,
                    }}
                    value={
                      <Text
                        style={{
                          color: "#fff",
                          textAlign: "center",
                          alignItems: "center",
                          alignSelf: "center",
                        }}
                      >
                        {ds.cntopen}
                      </Text>
                    }
                  ></Badge>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={
                  () => handleNavigation(dataTowerUser, "P")
                  //   handleNavigation(dataTowerUser, "'A','P','M','F','Y','Z'")
                }
                disabled={ds.cntprocces == 0 ? true : false}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#555",
                  //   marginBottom: 10,
                }}
              >
                <View
                  style={{
                    justifyContent: "space-around",
                    flexDirection: "row",
                    alignContent: "center",
                    alignItems: "center",
                    // alignSelf: 'center',
                  }}
                >
                  {/* <CategoryIconSoft
                      isRound
                      size={25}
                      icon={'hourglass-half'}
                      style={{marginTop: 10}}
                    /> */}
                  <View
                    style={{
                      borderRadius: 20,
                      // width: 50,
                      // height: 50,
                      width: 60,
                      height: 60,
                      // borderRadius: 8,
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 10,
                      marginBottom: 10,
                      backgroundColor: parseHexTransparency(
                        colors.primary,
                        100
                      ),
                    }}
                  >
                    <Icon
                      name={"tasks"}
                      size={25}
                      color={BaseColor.whiteColor}
                      solid
                    />
                  </View>
                  {/* <Image
                      source={require('@assets/images/icon-helpdesk/newtiket.png')}
                      style={styles.img}></Image> */}
                  <Text
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                      marginBottom: 10,
                    }}
                  >
                    Process
                  </Text>

                  <Badge
                    badgeStyle={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      backgroundColor: "#42B649",
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                      marginBottom: 5,
                    }}
                    value={
                      <Text
                        style={{
                          color: "#fff",
                          textAlign: "center",
                          alignItems: "center",
                          alignSelf: "center",
                        }}
                      >
                        {ds.cntprocces}
                      </Text>
                    }
                  ></Badge>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleNavigation(dataTowerUser, "X")}
                disabled={ds.cntcancel == 0 ? true : false}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#555",
                  //   marginBottom: 10,
                }}
              >
                <View
                  style={{
                    justifyContent: "space-around",
                    flexDirection: "row",
                    alignContent: "center",
                    alignItems: "center",
                    // alignSelf: 'center',
                  }}
                >
                  {/* <CategoryIconSoft
                      isRound
                      size={25}
                      icon={'times'}
                      style={{marginTop: 10}}
                    /> */}

                  <View
                    style={{
                      borderRadius: 20,
                      // width: 50,
                      // height: 50,
                      width: 60,
                      height: 60,
                      // borderRadius: 8,
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 10,
                      marginBottom: 10,
                      backgroundColor: parseHexTransparency(
                        colors.primary,
                        100
                      ),
                    }}
                  >
                    <Icon
                      name={"tasks"}
                      size={25}
                      color={BaseColor.whiteColor}
                      solid
                    />
                  </View>

                  {/* <Image
                      source={require('@assets/images/icon-helpdesk/newtiket.png')}
                      style={styles.img}></Image> */}
                  <Text
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                      marginBottom: 10,
                    }}
                  >
                    Cancel
                  </Text>

                  <Badge
                    badgeStyle={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      backgroundColor: "#42B649",
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                      marginBottom: 5,
                    }}
                    value={
                      <Text
                        style={{
                          color: "#fff",
                          textAlign: "center",
                          alignItems: "center",
                          alignSelf: "center",
                        }}
                      >
                        {ds.cntcancel}
                      </Text>
                    }
                  ></Badge>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleNavigation(dataTowerUser, "'C'")}
                disabled={ds.cntclose == 0 ? true : false}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#555",
                  //   marginBottom: 10,
                }}
              >
                <View
                  style={{
                    justifyContent: "space-around",
                    flexDirection: "row",
                    alignContent: "center",
                    alignItems: "center",
                    // alignSelf: 'center',
                  }}
                >
                  {/* <CategoryIconSoft
                      isRound
                      size={25}
                      icon={'check-double'}
                      style={{marginTop: 10}}
                    /> */}
                  <View
                    style={{
                      borderRadius: 20,
                      // width: 50,
                      // height: 50,
                      width: 60,
                      height: 60,
                      // borderRadius: 8,
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 10,
                      marginBottom: 10,
                      backgroundColor: parseHexTransparency(
                        colors.primary,
                        100
                      ),
                    }}
                  >
                    <Icon
                      name={"tasks"}
                      size={25}
                      color={BaseColor.whiteColor}
                      solid
                    />
                  </View>
                  {/* <Image
                      source={require('@assets/images/icon-helpdesk/newtiket.png')}
                      style={styles.img}></Image> */}
                  <Text
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                      marginBottom: 10,
                    }}
                  >
                    Close
                  </Text>

                  <Badge
                    badgeStyle={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      backgroundColor: "#42B649",
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                      marginBottom: 5,
                    }}
                    value={
                      <Text
                        style={{
                          color: "#fff",
                          textAlign: "center",
                          alignItems: "center",
                          alignSelf: "center",
                        }}
                      >
                        {ds.cntclose}
                      </Text>
                    }
                  ></Badge>
                </View>
              </TouchableOpacity>
            </View>
          ) : // <Text>Choose Project First</Text>
          null}
        </View>
      </View>
    </SafeAreaView>
  );
}
