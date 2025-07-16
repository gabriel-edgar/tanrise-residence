// list
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
} from "@/components";
import { BaseColor, BaseStyle, useTheme } from "@/config";

import { useNavigation } from "@react-navigation/native";
import {
  data_project,
  data_unit,
  choosed_unit,
  choosed_project,
  action_helpdesk_dot,
  action_project_dot,
  action_data_notification,
  action_data_notification_persist,
} from "../../actions/ProjectActions";

import React, { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  TouchableOpacity,
  View,
  Platform,
  TouchableHighlight,
  ScrollView,
  Dimensions,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import getUser from "../../selectors/UserSelectors";
import axios from "axios";
import client from "../../controllers/HttpClient";
import styles from "./styles";

import { RadioButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import moment from "moment";

import Modal from "react-native-modal";

import { baseURL as API_URL_LOKAL } from "@/controllers/HttpClient";
import httpClient from "../../controllers/HttpClient";

export default function ViewHistoryStatus({ route }) {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();

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
  const [dataHistoryStatus, setDataHistoryStatus] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [starCount, setStarCount] = useState(0);
  const [audit_user, setAudit_User] = useState("");
  const [selectedReportNo, setSelectedReportNo] = useState("");
  const deviceWidth = Dimensions.get("window").width;
  const stateReduxChoosedUnit = useSelector(
    (state) => state.Dataproject.choosedUnit
  );
  const stateReduxNotificationData = useSelector(
    (state) => state.Dataproject.notificationData
  );
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

  // const stateReduxChoosedUnit = useSelector(
  //   (state) => state.Dataproject.choosedUnit
  // );
  // console.log("123 stateReduxChoosedUnit: ", stateReduxChoosedUnit);

  useEffect(() => {
    // setTimeout(() => {
    //   //setLoading(false);
    //   //getTower(users);

    //   // getCategoryHelp;
    //   // setSpinner(false);
    //   console.log("routeparams", route.params.list);
    //   setDataHistoryStatus(route.params.list);
    // }, 3000);
    asyncFunc();
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (dataHistoryStatus != null) {
  //       setSpinner(false);
  //     }
  //   }, 5000);
  // }, []);

  const asyncFunc = async () => {
    await setDataHistoryStatus(route.params.list);
    if (dataHistoryStatus != null) {
      setSpinner(false);
    }
  };

  //for modal and rating
  const _setModalVisible = (visible, report_no) => {
    let rNo = !visible ? "" : report_no;
    setModalVisible(visible);

    setSelectedReportNo(rNo);
  };

  const onStarRatingPress = (rating) => {
    setStarCount(rating);
  };

  const stateReduxChoosedProject = useSelector(
    (state) => state.Dataproject.chooseProject
  );

  //callback
  const saveDataNotification = useCallback((state) =>
    dispatch(action_data_notification(state))
  );

  const saveDataNotificationPersist = useCallback((state) =>
    dispatch(action_data_notification_persist(state))
  );

  const handleNavigation = async (data) => {
    console.log("data for history detail", data);

    const foundItem = stateReduxNotificationData.find(
      (item) => item.report_no === data.report_no
    );
    console.log("649 FoundItem: ", foundItem);
    let rowID;
    if (foundItem) {
      rowID = foundItem.rowID;
      console.log("649 Found rowID:", rowID); // Output: Found rowID: 2
    } else {
      console.log("649 No matching report_no found.");
    }

    const dataRead = {
      notif_id: rowID,
      entity_cd: stateReduxChoosedProject.entity_cd,
      project_no: stateReduxChoosedProject.project_no,
    };
    console.log("526 data: ", dataRead);

    await httpClient
      .request({
        url: "/setting/notification-read",
        method: "POST",
        data: dataRead,
      })
      .then((res) => {
        console.log("526 res: ", res.data.data);
        //return res.data.data;
      })
      .catch((error) => {
        console.log("526 error: " + error.response.data.message);
        //return [];
      });

    const newNotifData = stateReduxNotificationData.filter(
      (obj) =>
        !(
          obj.report_no === data.report_no &&
          obj.entity_cd === stateReduxChoosedUnit.entity_cd &&
          obj.project_no === stateReduxChoosedUnit.project_no
        )
    ); //obj.lot_no === lot_no &&

    saveDataNotification(newNotifData);
    saveDataNotificationPersist(newNotifData);

    navigation.navigate("ViewHistoryDetail", data);
  };
  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={["right", "top", "left"]}
    >
      <Header
        title={t("Ticket List")} //belum dibuat lang
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
        <Text title2>Ticket {route.params.unit?.lot_no}</Text>
        <Text headline style={{ fontWeight: "normal" }}>
          View History Ticket
        </Text>
        {/* {dataHistoryStatus ? (
          dataHistoryStatus.map((data, key) => <Text>{data.descs}</Text>)
        ) : (
          <Text>no data</Text>
        )} */}
        {spinner ? (
          <View>
            {/* <Spinner visible={this.state.spinner} /> */}
            <Placeholder style={{ marginVertical: 4, paddingHorizontal: 10 }}>
              <PlaceholderLine width={100} noMargin style={{ height: 40 }} />
            </Placeholder>
            <Placeholder style={{ marginVertical: 4, paddingHorizontal: 10 }}>
              <PlaceholderLine width={100} noMargin style={{ height: 20 }} />
            </Placeholder>
          </View>
        ) : (
          <ScrollView style={{ marginTop: 20 }}>
            {dataHistoryStatus != undefined ? (
              dataHistoryStatus.map((data, key) => {
                return (
                  <View key={key}>
                    <TouchableOpacity onPress={() => handleNavigation(data)}>
                      <View
                        style={{
                          height: null,
                          backgroundColor: colors.background,
                          //   shadowOffset: {width: 1, height: 1},
                          //   shadowColor: colors.bg_hijautua,
                          //   shadowOpacity: 1,
                          //   elevation: 5,
                          paddingHorizontal: 10,
                          paddingVertical: 10,

                          // -- create shadow
                          shadowColor: "#000",
                          shadowOffset: {
                            width: 0,
                            height: 1,
                          },
                          shadowOpacity: 0.22,
                          shadowRadius: 2.22,
                          elevation: 3,
                          // -- end create shadows
                          //   borderWidth: 1,
                        }}
                      >
                        <View>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 13,
                                fontWeight: "bold",
                                textAlign: "left",
                              }}
                            >
                              # {data.report_no} - {data.debtor_acct}
                            </Text>
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: "500",
                                textAlign: "right",
                                color: "#9B9B9B",
                              }}
                            >
                              Date :{" "}
                              {moment(data.reported_date).format("DD-MM-YYYY")}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 13,
                                fontWeight: "300",
                                textAlign: "left",
                              }}
                            >
                              {/* nama dari await name {data.name} */}
                              {users.name}
                              {/* nama dari aawait name */}
                            </Text>
                            <Text
                              style={{
                                fontSize: 13,
                                fontWeight: "300",
                                textAlign: "left",
                              }}
                            >
                              Status:
                              {" " +
                                data.status +
                                " (" +
                                (data.status == "V"
                                  ? ""
                                  : data.status == "P"
                                  ? "Proses"
                                  : data.status == "M"
                                  ? "Modify"
                                  : data.status == "F"
                                  ? "Confirm"
                                  : data.status == "Y"
                                  ? "Approved"
                                  : data.status == "Z"
                                  ? "Confirm"
                                  : data.status == "A"
                                  ? "Assign"
                                  : data.status == "D"
                                  ? "Completed"
                                  : data.status == "C"
                                  ? "Closed"
                                  : data.status == "R"
                                  ? "Open"
                                  : data.status == "X"
                                  ? "Cancel"
                                  : "") +
                                ")"}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 13,
                                fontWeight: "300",
                                // marginBottom: 10,
                                color: BaseColor.hijau_pkbw,
                              }}
                            >
                              {data.lot_no}
                            </Text>
                            {/* <Text
                              style={{
                                fontSize: 13,
                                fontWeight: "300",
                                // marginBottom: 10,
                                color: BaseColor.hijau_pkbw,
                              }}
                            >
                              {data.status == "R"
                                ? "Open"
                                : data.status == "A"
                                ? "Assign"
                                : data.status == "S"
                                ? "Need Confirmation"
                                : data.status == "P"
                                ? "Process"
                                : data.status == "F"
                                ? "Confirm"
                                : data.status == "X"
                                ? "Cancel"
                                : data.status == "C"
                                ? "Close"
                                : data.status == "D"
                                ? "Completed"
                                : ""}
                            </Text> */}
                          </View>
                          <View
                            style={{
                              //flexDirection: "row",
                              justifyContent: "space-between",
                              marginBottom: 7,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 13,
                                fontWeight: "300",
                                //marginBottom: 10,
                              }}
                            >
                              Reported by {data.serv_req_by}
                            </Text>
                            <Text
                              style={{
                                fontSize: 13,
                                fontWeight: "300",
                                // marginBottom: 10,
                                marginTop: 3,
                              }}
                            >
                              {data.status == "D" || data.status == "C"
                                ? [
                                    "Completion date: ",
                                    data.completion_date != null
                                      ? data.completion_date?.slice(0, 16)
                                      : "null",
                                  ]
                                : null}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                    {
                      //dotList.length != 0 &&
                      stateReduxNotificationData.some(
                        (item) => item.report_no == data.report_no
                      ) ? (
                        //dotList.some((item) => item != project.entity_cd) ? (
                        <View
                          style={{
                            borderWidth: 1,
                            borderColor: "white",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "absolute",
                            width: 20,
                            height: 20,
                            backgroundColor: "red",
                            top: 62,
                            right: 10,
                            borderRadius: 10,
                          }}
                        >
                          {/* <Text whiteColor caption2>
            {finalCount < 0 ? 0 : finalCount}
          </Text> */}
                        </View>
                      ) : null
                    }
                  </View>
                );
              })
            ) : (
              <Text>no data</Text>
            )}
          </ScrollView>
        )}

        <Modal
          animationType="slide"
          isVisible={modalVisible}
          deviceWidth={deviceWidth}
          style={styles.bottomModal}
        >
          <View style={styles.modalView}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.textModal}>{selectedReportNo}</Text>
                <Icon
                  style={styles.iconModal}
                  name="times"
                  onPress={() => _setModalVisible(!modalVisible)}
                />
              </View>
              <View style={styles.modalBody}>
                <View>
                  <Text style={styles.modalBodyTitle}>
                    Please rate our work !
                  </Text>
                </View>
                <View style={styles.starWrap}></View>

                <View style={styles.btnWrapModal}>
                  <TouchableOpacity
                    style={styles.btnNo}
                    onPress={() => _setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textNo}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btnYes}
                    onPress={() => alert("submit")}
                  >
                    <Text style={styles.textYes}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}
