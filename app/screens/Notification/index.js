import {
  Header,
  Icon,
  ListThumbCircleNotif,
  SafeAreaView,
  Text,
  Button,
} from "@/components";
import { BaseColor, BaseStyle, useTheme } from "@/config";
// Load sample data
import { NotificationData } from "@/data";
import React, { useState, useEffect, useCallback } from "react";
import {
  FlatList,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import getUser from "../../selectors/UserSelectors";
import axios from "axios";
import { API_URL } from "@env";
import styles from "./styles";
import NotifService from "../../NotifService";
import getNotifRed from "../../selectors/NotifSelectors";
import { notifikasi_nbadge_decrease } from "../../actions/NotifActions";
import apiCall from "../../config/ApiActionCreator";

import { decrement } from "../../actions/actionsTotal";
import Modal from "react-native-modal";
import moment from "moment";
import { baseURL as API_URL_LOKAL } from "@/controllers/HttpClient";

const Notification = (props) => {
  const { navigation, route, notification } = props;
  // console.log('route props', route);
  // console.log('route notification', notification);
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  // const [notification, setNotification] = useState(NotificationData);
  const users = useSelector((state) => getUser(state));
  const [email, setEmail] = useState(users != null ? users.user : "");
  console.log("users di notif", users.user);
  const [loading, setLoading] = useState(true);
  const [dataTowerUser, setdataTowerUser] = useState([]);
  const [arrDataTowerUser, setArrDataTowerUser] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const [urlApi, seturlApi] = useState(API_URL);
  const [dataNotif, setDataNotif] = useState([]);
  const dataNotifBadge = useSelector((state) => getNotifRed(state));
  console.log("data notif badge di notif", dataNotifBadge.data);
  const dispatch = useDispatch();
  const [minusKlikNotif, setMinusKlikNotif] = useState(0);
  const [read, setRead] = useState(false);
  const [color, setColor] = useState("blue");
  const [indexList, setIndexList] = useState();
  const [entity_cd, setEntity] = useState("");
  const [project_no, setProject] = useState("");
  const data = useSelector((state) => state.apiReducer.data);
  console.log("data notif length", data);
  const [isRead, setisRead] = useState(data.IsRead);

  const [modalSuccessVisible, showModalSuccess] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState();

  const loadings = useSelector((state) => state.apiReducer.loading);
  const counter = useSelector((state) => state.counter);

  useEffect(() => {
    dispatch(
      apiCall(
        API_URL_LOKAL +
          `/setting/notification?email=${email}&entity_cd=01&project_no=01`
      )
    );
  }, []);

  const refreshDataNotif = () => {
    dispatch(
      apiCall(
        API_URL_LOKAL +
          `/setting/notification?email=${email}&entity_cd=01&project_no=01`
      )
    );
  };

  const goNotif = decrement;
  console.log("minus", goNotif);
  // const cobanotif = useSelector(state => getNotifRed(state));

  // http://apps.pakubuwono-residence.com/apiwebpbi/api/setting/notification

  // POST
  // body : email, entity_cd, project_no, device (hardcode aja valuenya Mobile)
  //-----FOR GET ENTITY & PROJJECT
  const notif = new NotifService(onNotif);

  const onNotif = (notif) => {
    console.log("notif di screen notification", notif);
    // navigation.navigate('Notification', notif);
    console.log("notif data screen notification", notif.data.title);
    console.log("notif data screen notification", notif.data.body);
    // Alert.alert('di index.app on notif');
  };

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
        API_URL_LOKAL + `/home/common-project/mysql/${data.email}/${data.app}`
      )
      .then((res) => {
        const datas = res.data;

        const arrDataTower = datas.Data;
        arrDataTower.map((dat) => {
          if (dat) {
            setdataTowerUser(dat);
            getNotification(dat);
            setEntity(dat.entity_cd);
            setProject(dat.project_no);
          }
        });
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
    setTimeout(() => {
      setLoading(false);
      getTower(users);
    }, 3000);
  }, []);

  const getNotification = async (data) => {
    const formData = {
      email: email,
      entity_cd: data.entity_cd || entity_cd,
      project_no: data.project_no || project_no,
    };
    // setEntity(data.entity_cd);
    // setProject(data.project_no);

    console.log("form data notif", formData);

    const config = {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        token: "",
      },
    };

    console.log(
      `http://apps.pakubuwono-residence.com/apiwebpbi/api/setting/notification?email=${formData.email}&entity_cd=${formData.entity_cd}&project_no=${formData.project_no}`
    );

    await axios
      .get(
        API_URL_LOKAL +
          `/setting/notification?email=${formData.email}&entity_cd=${formData.entity_cd}&project_no=${formData.project_no}`
      )
      .then((res) => {
        // console.log('res tiket multi', res.data);
        const resNotif = res.data;

        // console.log('resNotif', res);
        setDataNotif(resNotif);
        setSpinner(false);
        // return res.data;
      })
      .catch((error) => {
        console.log("err data notif", error);
        // alert('error nih');
      });
  };
  const goNotifDetail = (item, index) => () => {
    console.log("index klik", item);
    dispatch({ type: "DECREMENT" });
    // setMessageSuccess({item});
    // showModalSuccess(true);
    changesRead(item.NotificationID);
    // setIndexList(index);
    // setisRead(1);
    navigation.navigate("NotificationDetail", { item: item });
    // navigation.navigate('')

    // if (index === true) {
    //   // setRead(!read);
    //   setColor('red');
    // }
  };

  const changesRead = async (notifID) => {
    const params = {
      id: notifID,
      entity_cd: entity_cd,
      project_no: project_no,
    };
    console.log("params", params);
    await axios
      .post(API_URL_LOKAL + `/setting/setting/notification-read`, params)
      .then((res) => {
        console.log("res change read", res.data);
        //  const resNotif = res.data;
        // getNotification(email, entity_cd, project_no);
        refreshDataNotif();
        // console.log('resNotif', res);
        //  setDataNotif(resNotif);
        //  setSpinner(false);
        // return res.data;
      })
      .catch((error) => {
        console.log("err data notif", error);
        // alert('error nih');
      });
  };

  const onCloseModal = () => {
    showModalSuccess(false);
  };

  //untuk refresh screen, load data notif dan badge notif
  const refreshPull = () => {
    // alert('refresh  pull');
    refreshDataNotif(); //badge notif
    getNotification(data); //data notif
  };

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={["top", "right", "bottom", "left"]}
    >
      <Header
        title={t("notification")}
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
          // navigation.navigate('MainStack');
        }}
      />
      {loadings ? (
        <ActivityIndicator size="large" color="red" />
      ) : (
        <FlatList
          // contentContainerStyle={{paddingHorizontal: 20}}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={() => refreshPull()}
            />
          }
          // data={dataNotif}
          data={data}
          keyExtractor={(item, index) => item.NotificationID}
          renderItem={({ item, index }) => (
            // console.log('index notif', index),
            <ListThumbCircleNotif
              key={index}
              disabled={item.IsRead == 1 ? true : false}
              style={{
                paddingHorizontal: 20,
                backgroundColor:
                  colors.background == "white"
                    ? item.IsRead == 0
                      ? "white"
                      : "lightgrey"
                    : item.IsRead == 0
                    ? "#191919"
                    : "#010101",
              }}
              // image={item.image}
              txtLeftTitle1={item.Report_no}
              txtLeftTitle2={
                item.NotificationCd == "NEW"
                  ? "Customer Service"
                  : item.NotificationCd
              }
              txtContent={item.Remarks}
              txtRight={item.NotificationDate}
              onPress={goNotifDetail(item, index)}
              // onPress={() => clickNotif()}
            />
          )}
        />
      )}
      {/* {modalSuccessVisible == true ? (
        <Text>{messageSuccess.item.Device}</Text>
      ) : (
        <Text>visible false</Text>
      )} */}
    </SafeAreaView>
  );
};

export default Notification;
