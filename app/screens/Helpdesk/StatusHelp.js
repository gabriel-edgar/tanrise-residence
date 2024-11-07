// status help
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

import React, { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  TouchableOpacity,
  View,
  Platform,
  TouchableHighlight,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import getUser from "../../selectors/UserSelectors";
import axios from "axios";
import client from "../../controllers/HttpClient";
import styles from "./styles";

import { RadioButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_URL_LOKAL } from "@env";
import httpClient from "../../controllers/HttpClient";
import ModalSelector from "react-native-modal-selector";
import {
  action_data_notification,
  choosed_unit,
} from "../../actions/ProjectActions";

export default function StatusHelp({ route }) {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const params = route.params;
  const [dataTowerUser, setdataTowerUser] = useState([]);
  const [arrDataTowerUser, setArrDataTowerUser] = useState([]);
  const users = useSelector((state) => getUser(state));
  const [email, setEmail] = useState(users.email);
  const [urlApi, seturlApi] = useState(client);
  const [entity, setEntity] = useState("");
  const [project_no, setProjectNo] = useState("");
  const [db_profile, setDb_Profile] = useState("");
  const [checkedEntity, setCheckedEntity] = useState(false);
  const [spinner, setSpinner] = useState(true);
  const [dataStatus, setDataStatus] = useState({
    cntopen: "",
    cntassign: "",
    cntprocces: "",
    cntcompleted: "",
    cntcancel: "",
    cntclose: "",
  });
  const [dotForStatus, setDotForStatus] = useState({
    open: false,
    assign: false,
    procces: false,
    completed: false,
    cancel: false,
    close: false,
  });
  const [show, setShow] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [defaulTower, setDefaultTower] = useState(false);
  const [defaultStatus, setDefaultStatus] = useState(false);
  const [byStatusAll, setByStatusAll] = useState({});
  const [viewFront, setViewFront] = useState("Change lot no");
  const stateReduxDataUnit = useSelector(
    (state) => state.Dataproject.dataUnit //.Dataproject.Dataproject
  );
  const stateReduxChoosedUnit = useSelector(
    (state) => state.Dataproject.choosedUnit
  );
  const stateReduxNotificationData = useSelector(
    (state) => state.Dataproject.notificationData
  );
  const stateReduxNotificationDataPersist = useSelector(
    (state) => state.Dataproject.notificationDataPersist
  );
  console.log(
    "82 stateReduxNotificationDataPersist: ",
    stateReduxNotificationDataPersist
  );
  console.log("83 stateReduxNotificationData: ", stateReduxNotificationData);
  const stateReduxChoosedProject = useSelector(
    (state) => state.Dataproject.chooseProject
  );
  const [choosedUnit, setChoosedUnit] = useState(stateReduxChoosedUnit);

  const [dotList, setDotList] = useState([]);
  const [dotChangeUnit, setDotChangeUnit] = useState(false);
  const dispatch = useDispatch();

  const saveDataNotification = useCallback((state) =>
    dispatch(action_data_notification(state))
  );
  const saveUnit = useCallback((unit) => dispatch(choosed_unit(unit)));

  // Function to handle clicking on the item
  const handleCangeDot = (lot_no) => {
    // setDotList((prevLotNumbers) =>
    //   prevLotNumbers.filter((lot) => lot !== lot_no)
    // );
    // console.log("647 dotList.length: ", dotList.length);
    // if (dotList.length == 0) {
    //   setDotChangeUnit(false);
    // }
    const newNotifData = stateReduxNotificationData.filter(
      (obj) =>
        !(
          obj.lot_no === lot_no &&
          obj.entity_cd === stateReduxChoosedUnit.entity_cd &&
          obj.project_no === stateReduxChoosedUnit.project_no
        )
    );
    console.log("112 new array: ", newNotifData);
    //saveDataNotification(newNotifData);
  };

  console.log("89 dotList: ", dotList);

  // const saveHelpdeskDotNotification = useCallback((state) =>
  //   dispatch(action_helpdesk_dot(state))
  // );

  //   console.log('passprop kategori help', passProp);
  const styleItem = {
    ...styles.profileItem,
    borderBottomColor: colors.border,
  };
  //-----FOR GET ENTITY & PROJJECT

  // Effect that runs after notifications change
  useEffect(() => {
    // if (notifications.length > 0) {
    //   console.log("Notifications updated:", notifications);
    //   // Perform any side effect you need here, e.g., show a toast, log, etc.
    // }
    const dots = stateReduxNotificationData
      .filter(
        (item) =>
          item.entity_cd === stateReduxChoosedProject.entity_cd &&
          item.project_no === stateReduxChoosedProject.project_no
      )
      .map((item) => item.lot_no);
    console.log("127 stateReduxNotificationData: ", stateReduxNotificationData);
    const filterDots = dots.filter((lot) => lot !== choosedUnit.lot_no);
    const newNotifData = stateReduxNotificationData.filter(
      (obj) =>
        !(
          obj.lot_no === choosedUnit.lot_no &&
          obj.entity_cd === stateReduxChoosedUnit.entity_cd &&
          obj.project_no === stateReduxChoosedUnit.project_no
        )
    );
    console.log("112 new array: ", newNotifData);
    console.log("113 filterDots: ", filterDots);
    //saveDataNotification(newNotifData);
    setDotList(dots);

    setDotForStatus({
      open: byStatusAll.statusOpen
        ?.map((status) => {
          if (
            stateReduxNotificationDataPersist.some(
              (item) =>
                item.report_no === status.report_no &&
                item.lot_no == choosedUnit.lot_no
            ) == true
          ) {
            return 1;
          } else {
            return 0;
          }
        })
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0),
      assign: byStatusAll.statusAssign
        ?.map((status) => {
          if (
            stateReduxNotificationDataPersist.some(
              (item) =>
                item.report_no === status.report_no &&
                item.lot_no == choosedUnit.lot_no
            ) == true
          ) {
            return 1;
          } else {
            return 0;
          }
        })
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0),
      procces: byStatusAll.statusProcess
        ?.map((status) => {
          if (
            stateReduxNotificationDataPersist.some(
              (item) =>
                item.report_no === status.report_no &&
                item.lot_no == choosedUnit.lot_no
            ) == true
          ) {
            return 1;
          } else {
            return 0;
          }
        })
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0),
      completed: byStatusAll.statusCompleted
        ?.map((status) => {
          if (
            stateReduxNotificationDataPersist.some(
              (item) =>
                item.report_no === status.report_no &&
                item.lot_no == choosedUnit.lot_no
            ) == true
          ) {
            return 1;
          } else {
            return 0;
          }
        })
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0),
      cancel: byStatusAll.statusCancel
        ?.map((status) => {
          if (
            stateReduxNotificationDataPersist.some(
              (item) =>
                item.report_no === status.report_no &&
                item.lot_no == choosedUnit.lot_no
            ) == true
          ) {
            return 1;
          } else {
            return 0;
          }
        })
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0),
      close: byStatusAll.statusClose
        ?.map((status) => {
          if (
            stateReduxNotificationDataPersist.some(
              (item) =>
                item.report_no === status.report_no &&
                item.lot_no == choosedUnit.lot_no
            ) == true
          ) {
            return 1;
          } else {
            return 0;
          }
        })
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0),
    });
  }, [stateReduxNotificationData]); // Dependency array

  useEffect(() => {
    setEntity(params?.entity_cd);
    setProjectNo(params?.project_no);
    setDb_Profile(params?.db_profile);
    loadData();

    // setTimeout(() => {
    //   setLoading(false);
    //   getTower();

    //   // getCategoryHelp;
    //   // setSpinner(false);
    // }, 3000);
  }, []);

  const loadData = async () => {
    // Create a new array with just the names
    //const dots = stateReduxDataUnit.map((item) => item.lot_no);
    // Filter for lot_no where entity_cd is "1001" and project_no is "1001001"
    const dots = stateReduxNotificationData
      .filter(
        (item) =>
          item.entity_cd === stateReduxChoosedProject.entity_cd &&
          item.project_no === stateReduxChoosedProject.project_no
      )
      .map((item) => item.lot_no);
    console.log("127 stateReduxNotificationData: ", stateReduxNotificationData);
    const filterDots = dots.filter((lot) => lot !== choosedUnit.lot_no);
    const newNotifData = stateReduxNotificationData.filter(
      (obj) =>
        !(
          obj.lot_no === choosedUnit.lot_no &&
          obj.entity_cd === stateReduxChoosedUnit.entity_cd &&
          obj.project_no === stateReduxChoosedUnit.project_no
        )
    );
    console.log("112 new array: ", newNotifData);
    console.log("113 filterDots: ", filterDots);
    //saveDataNotification(newNotifData);
    await setDotList(dots);
    //await setDotList(filterDots);
    //await setDotChangeUnit(true);
    //await getTicketStatus(params);
    await getTicketStatus2();
    //handleCangeDot(stateReduxChoosedUnit.lot_no);
    //console.log("107 choosedUnit.lot_no: ", choosedUnit.lot_no);
    //console.log("107 byStatusAll?.statusOpen: ", byStatusAll?.statusOpen);
    //await filterByUnit(choosedUnit.lot_no);
    //getDotFromNotif();
  };

  const getDotFromNotif = () => {
    setDotForStatus({
      open: false,
      assign: false,
      procces: false,
      completed: false,
      cancel: false,
      close: false,
    });
  };

  const filterByUnit = (lot_no) => {
    function checkLotno(currentValue, index, arr) {
      return currentValue.lot_no == lot_no;
    }
    //const result = datastatuswhere.filter(checkLotno);

    setDataStatus({
      cntopen: byStatusAll?.statusOpen?.filter(checkLotno).length.toString(),
      cntassign: byStatusAll?.statusAssign
        ?.filter(checkLotno)
        .length.toString(),
      cntcompleted: byStatusAll?.statusCompleted
        ?.filter(checkLotno)
        .length.toString(),
      cntprocces: byStatusAll?.statusProcess
        ?.filter(checkLotno)
        .length.toString(),
      cntcancel: byStatusAll?.statusCancel
        ?.filter(checkLotno)
        .length.toString(),
      cntclose: byStatusAll?.statusClose?.filter(checkLotno).length.toString(),
    });

    setDotForStatus({
      open: byStatusAll.statusOpen
        ?.map((status) => {
          if (
            stateReduxNotificationDataPersist.some(
              (item) =>
                item.report_no === status.report_no && item.lot_no == lot_no
            ) == true
          ) {
            return 1;
          } else {
            return 0;
          }
        })
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0),
      assign: byStatusAll.statusAssign
        ?.map((status) => {
          if (
            stateReduxNotificationDataPersist.some(
              (item) =>
                item.report_no === status.report_no && item.lot_no == lot_no
            ) == true
          ) {
            return 1;
          } else {
            return 0;
          }
        })
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0),
      procces: byStatusAll.statusProcess
        ?.map((status) => {
          if (
            stateReduxNotificationDataPersist.some(
              (item) =>
                item.report_no === status.report_no && item.lot_no == lot_no
            ) == true
          ) {
            return 1;
          } else {
            return 0;
          }
        })
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0),
      completed: byStatusAll.statusCompleted
        ?.map((status) => {
          if (
            stateReduxNotificationDataPersist.some(
              (item) =>
                item.report_no === status.report_no && item.lot_no == lot_no
            ) == true
          ) {
            return 1;
          } else {
            return 0;
          }
        })
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0),
      cancel: byStatusAll.statusCancel
        ?.map((status) => {
          if (
            stateReduxNotificationDataPersist.some(
              (item) =>
                item.report_no === status.report_no && item.lot_no == lot_no
            ) == true
          ) {
            return 1;
          } else {
            return 0;
          }
        })
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0),
      close: byStatusAll.statusClose
        ?.map((status) => {
          if (
            stateReduxNotificationDataPersist.some(
              (item) =>
                item.report_no === status.report_no && item.lot_no == lot_no
            ) == true
          ) {
            return 1;
          } else {
            return 0;
          }
        })
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0),
    });
  };

  const handleCheckChange = (index, data) => {
    setCheckedEntity(index);
    setShow(true);

    setEntity(data.entity_cd);
    setProjectNo(data.project_no);
    setDb_Profile(data.db_profile);
    // getTicketStatus(data);
    //getTicketStatus2();
  };

  const getTicketStatus2 = async () => {
    // const formData = {
    //   email: email,
    //   status: ticketStatus,
    //   //status: ["A", "P", "M", "F", "Y", "Z"], //"A,P,M,F,Y,Z",
    //   date_start: "",
    //   date_end: "",
    // };

    //"'A','P','M','F','Y','Z'"
    //"'V'"
    //"'C'"

    const statusOpen = await httpClient
      .request({
        url: "/modules/cs/ticket-by-status",
        method: "GET",
        params: {
          email: email,
          status: "'R'",
          date_start: "0",
          date_end: "0",
        },
      })
      .then((res) => {
        const datas = res.data;
        console.log("136 data Open: ", res.data.data);
        const datastatuswhere = datas.data;
        return datastatuswhere;
      })
      .catch((error) => {
        return [];
        //console.log("error get where status api", error.response.message);
      });

    const statusProcess = await httpClient
      .request({
        url: "/modules/cs/ticket-by-status",
        method: "GET",
        params: {
          email: email,
          status: "'P'",
          date_start: "0",
          date_end: "0",
        },
      })
      .then((res) => {
        const datas = res.data;
        console.log("136 data Process: ", res.data.data);
        const datastatuswhere = datas.data;
        return datastatuswhere;
      })
      .catch((error) => {
        return [];
        //console.log("error get where status api", error.response.message);
      });

    const statusCancel = await httpClient
      .request({
        url: "/modules/cs/ticket-by-status",
        method: "GET",
        params: {
          email: email,
          status: "'X'",
          date_start: "0",
          date_end: "0",
        },
      })
      .then((res) => {
        const datas = res.data;
        console.log("136 data Cancel: ", res.data.data);
        const datastatuswhere = datas.data;
        return datastatuswhere;
      })
      .catch((error) => {
        return [];
        //console.log("error get where status api", error.response.message);
      });

    const statusClose = await httpClient
      .request({
        url: "/modules/cs/ticket-by-status",
        method: "GET",
        params: {
          email: email,
          status: "'C'",
          date_start: "0",
          date_end: "0",
        },
      })
      .then((res) => {
        const datas = res.data;
        console.log("136 data Close: ", res.data.data);
        const datastatuswhere = datas.data;
        return datastatuswhere;
      })
      .catch((error) => {
        return [];
        //console.log("error get where status api", error.response.message);
      });

    const statusAssign = await httpClient
      .request({
        url: "/modules/cs/ticket-by-status",
        method: "GET",
        params: {
          email: email,
          status: "'A'",
          date_start: "0",
          date_end: "0",
        },
      })
      .then((res) => {
        const datas = res.data;
        console.log("136 data Close: ", res.data.data);
        const datastatuswhere = datas.data;
        return datastatuswhere;
      })
      .catch((error) => {
        return [];
        //console.log("error get where status api", error.response.message);
      });

    const statusCompleted = await httpClient
      .request({
        url: "/modules/cs/ticket-by-status",
        method: "GET",
        params: {
          email: email,
          status: "'D'",
          date_start: "0",
          date_end: "0",
        },
      })
      .then((res) => {
        const datas = res.data;
        console.log("136 data Close: ", res.data.data);
        const datastatuswhere = datas.data;
        return datastatuswhere;
      })
      .catch((error) => {
        //alert(error);
        return [];
        //console.log("error get where status api", error.response.message);
      });

    setByStatusAll({
      statusOpen,
      statusProcess,
      statusCancel,
      statusClose,
      statusCompleted,
      statusAssign,
    });

    console.log("136 stateReduxNotificationData: ", stateReduxNotificationData);

    setDotForStatus({
      open: statusOpen
        .map((status) => {
          if (
            stateReduxNotificationDataPersist.some(
              (item) =>
                item.report_no === status.report_no &&
                item.lot_no == choosedUnit.lot_no
            ) == true
          ) {
            return 1;
          } else {
            return 0;
          }
        })
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0),
      assign: statusAssign
        .map((status) => {
          if (
            stateReduxNotificationDataPersist.some(
              (item) =>
                item.report_no === status.report_no &&
                item.lot_no == choosedUnit.lot_no
            ) == true
          ) {
            return 1;
          } else {
            return 0;
          }
        })
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0),
      procces: statusProcess
        .map((status) => {
          if (
            stateReduxNotificationDataPersist.some(
              (item) =>
                item.report_no === status.report_no &&
                item.lot_no == choosedUnit.lot_no
            ) == true
          ) {
            return 1;
          } else {
            return 0;
          }
        })
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0),
      completed: statusCompleted
        .map((status) => {
          if (
            stateReduxNotificationDataPersist.some(
              (item) =>
                item.report_no === status.report_no &&
                item.lot_no == choosedUnit.lot_no
            ) == true
          ) {
            return 1;
          } else {
            return 0;
          }
        })
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0),
      cancel: statusCancel
        .map((status) => {
          if (
            stateReduxNotificationDataPersist.some(
              (item) =>
                item.report_no === status.report_no &&
                item.lot_no == choosedUnit.lot_no
            ) == true
          ) {
            return 1;
          } else {
            return 0;
          }
        })
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0),
      close: statusClose
        .map((status) => {
          if (
            stateReduxNotificationDataPersist.some(
              (item) =>
                item.report_no === status.report_no &&
                item.lot_no == choosedUnit.lot_no
            ) == true
          ) {
            return 1;
          } else {
            return 0;
          }
        })
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0),
    });

    function checkLotno(currentValue, index, arr) {
      return currentValue.lot_no == stateReduxChoosedUnit.lot_no;
    }
    console.log(
      "136 statusOpen: ",
      statusOpen.filter(checkLotno).length.toString()
    );
    setDataStatus({
      cntopen: statusOpen.filter(checkLotno).length.toString(),
      cntprocces: statusProcess.filter(checkLotno).length.toString(),
      cntcancel: statusCancel.filter(checkLotno).length.toString(),
      cntclose: statusClose.filter(checkLotno).length.toString(),
      cntassign: statusAssign.filter(checkLotno).length.toString(),
      cntcompleted: statusCompleted.filter(checkLotno).length.toString(),
    });

    //filterByUnit(choosedUnit.lot_no);

    // const dataStatusCount = {
    //   cntopen: statusOpen.length.toString(),
    //   cntprocces: statusProcess.length.toString(),
    //   cntcancel: statusCancel.length.toString(),
    //   cntclose: statusClose.length.toString(),
    // };
    // console.log("136 dataStatusCount: ", dataStatusCount);
    // setDataStatus({
    //   cntopen: statusOpen.length.toString(),
    //   cntprocces: statusProcess.length.toString(),
    //   cntcancel: statusCancel.length.toString(),
    //   cntclose: statusClose.length.toString(),
    // });
  };

  const getTicketStatus = async (data) => {
    // console.log("216 data for status", data);
    // const dT = data;

    const formData = {
      // entity_cd: dT.entity_cd,
      // project_no: dT.project_no,
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

    // await axios
    //   .get(
    //     API_URL_LOKAL + "/modules/cs/ticket-status-count",
    //     formData,
    //     {
    //       config,
    //     }
    //   )
    await httpClient
      .request({
        url: "/modules/cs/ticket-status-count",
        method: "GET",
        params: formData,
      })
      .then((res) => {
        const datas = res.data;

        console.log("216 data kategori", datas.success);
        if (datas.success === true) {
          const datastatus = datas.data;
          console.log("216 datastatus", datastatus);

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
        //alert("216 error: " + error.response.data.message);
        console.log("216 error: ", error.response.data.message);
        if (
          error.response.data.message ==
          "Key material must be a string, resource, or OpenSSLAsymmetricKey"
        ) {
          console.log("Key material error detected");
          loadData();
        }
        // alert('error get');
      });
  };

  const handleNavigation = (data, ticketStatus) => {
    console.log("165 handleNavigation, data where tiket statuss", data);
    console.log("165 handleNavigation, tikett status", ticketStatus);
    setDisabled(true);
    getTicketWhereStatus(data, ticketStatus);
  };
  const getTicketWhereStatus = async (data, ticketStatus) => {
    console.log("171 data where: ", data);
    console.log("171 tiket state where: ", ticketStatus);

    //Open = "R";
    //Process = "A,   (P,M,F,Y,Z")
    //cancel = "V"
    //close = "C"

    // cntopen = status R
    // cntprocces = status A, P, M
    // cntcancel = status V
    // cntclose = status C

    //? what is A, Cancel V or X, who can update to Y Z,

    //form R (can update to P X/V)
    //update X/V P M F Y Z (can update to P X/V M F)
    //history Close (C)

    // <Picker.Item label="Cancel (X)" value="X" /> FUS
    // <Picker.Item label="Process (P)" value="P" /> FUS
    // <Picker.Item label="Modify (M)" value="M" /> FUS
    // <Picker.Item label="Confirm (F)" value="F" /> FUS
    // <Picker.Item label="Approved (Y)" value="Y" />
    // <Picker.Item label="Posted (Z)" value="Z" />

    //form update status engineer
    // Process (P), Cancel (X), Modify (M), confirm (F)

    const formData = {
      email: email,
      status: ticketStatus,
      //status: ["A", "P", "M", "F", "Y", "Z"], //"A,P,M,F,Y,Z",
      date_start: "0",
      date_end: "0",
    };
    console.log("171 formData: ", formData);
    // const config = {
    //   headers: {
    //     accept: "application/json",
    //     "Content-Type": "application/json",
    //     token: "",
    //   },
    // };
    // await axios
    //   .post(API_URL_LOKAL + "/modules/cs/ticket-by-status/IFCAPB", formData, {
    //     config,
    //   })

    //stateReduxChoosedProject;
    //ticketStatus;
    // where report_no = bla bla;
    // if navigate to x has report_no ???
    let rowID;
    if (ticketStatus == "'R'") {
      //byStatusAll.statusOpen;
      const isExist = byStatusAll.statusOpen
        .map((status) => {
          if (
            stateReduxNotificationDataPersist.some(
              (item) => item.report_no === status.report_no
            ) == true
          ) {
            console.log("649 run find: ", status.report_no);
            const foundItem = stateReduxNotificationDataPersist.find(
              (item) => item.report_no === status.report_no
            );
            console.log("649 FoundItem: ", foundItem);
            if (foundItem) {
              rowID = foundItem.rowID;
              console.log("649 Found rowID:", rowID); // Output: Found rowID: 2
            } else {
              console.log("649 No matching report_no found.");
            }
            return 1;
          } else {
            return 0;
          }
        })
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    }

    if (ticketStatus == "'A'") {
      //byStatusAll.statusOpen;
      const isExist = byStatusAll.statusAssign
        .map((status) => {
          if (
            stateReduxNotificationDataPersist.some(
              (item) => item.report_no === status.report_no
            ) == true
          ) {
            console.log("649 run find: ", status.report_no);
            const foundItem = stateReduxNotificationDataPersist.find(
              (item) => item.report_no === status.report_no
            );
            console.log("649 FoundItem: ", foundItem);
            if (foundItem) {
              rowID = foundItem.rowID;
              console.log("649 Found rowID:", rowID); // Output: Found rowID: 2
            } else {
              console.log("649 No matching report_no found.");
            }
            return 1;
          } else {
            return 0;
          }
        })
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    }

    if (ticketStatus == "'P'") {
      //byStatusAll.statusOpen;
      const isExist = byStatusAll.statusProcess
        .map((status) => {
          if (
            stateReduxNotificationDataPersist.some(
              (item) => item.report_no === status.report_no
            ) == true
          ) {
            console.log("649 run find: ", status.report_no);
            const foundItem = stateReduxNotificationDataPersist.find(
              (item) => item.report_no === status.report_no
            );
            console.log("649 FoundItem: ", foundItem);
            if (foundItem) {
              rowID = foundItem.rowID;
              console.log("649 Found rowID:", rowID); // Output: Found rowID: 2
            } else {
              console.log("649 No matching report_no found.");
            }
            return 1;
          } else {
            return 0;
          }
        })
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    }

    if (ticketStatus == "'D'") {
      //byStatusAll.statusOpen;
      const isExist = byStatusAll.statusCompleted
        .map((status) => {
          if (
            stateReduxNotificationDataPersist.some(
              (item) => item.report_no === status.report_no
            ) == true
          ) {
            console.log("649 run find: ", status.report_no);
            const foundItem = stateReduxNotificationDataPersist.find(
              (item) => item.report_no === status.report_no
            );
            console.log("649 FoundItem: ", foundItem);
            if (foundItem) {
              rowID = foundItem.rowID;
              console.log("649 Found rowID:", rowID); // Output: Found rowID: 2
            } else {
              console.log("649 No matching report_no found.");
            }
            return 1;
          } else {
            return 0;
          }
        })
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    }

    if (ticketStatus == "'C'") {
      //byStatusAll.statusOpen;
      // console.log("741 run ticket C");
      // console.log("741 byStatusAll.statusClose: ", byStatusAll.statusClose);
      // console.log(
      //   "741 stateReduxNotificationData: ",
      //   stateReduxNotificationData
      // );
      // console.log(
      //   "741 byStatusAll.statusClose: ",
      //   byStatusAll.statusClose.map((status) => {
      //     if (
      //       stateReduxNotificationData.some(
      //         (item) => item.report_no === status.report_no
      //       ) == true
      //     ) {
      //       return 1;
      //     } else {
      //       return 0;
      //     }
      //   })
      // );
      const isExist = byStatusAll.statusClose
        .map((status) => {
          if (
            stateReduxNotificationDataPersist.some(
              (item) => item.report_no === status.report_no
            ) == true
          ) {
            console.log("649 run find: ", status.report_no);
            const foundItem = stateReduxNotificationDataPersist.find(
              (item) => item.report_no === status.report_no
            );
            console.log("649 FoundItem: ", foundItem);
            if (foundItem) {
              rowID = foundItem.rowID;
              console.log("649 Found rowID:", rowID); // Output: Found rowID: 2
            } else {
              console.log("649 No matching report_no found.");
            }
            return 1;
          } else {
            return 0;
          }
        })
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      console.log("741 isExist: ", isExist);
    }

    if (ticketStatus == "'V'") {
      //byStatusAll.statusOpen;
      const isExist = byStatusAll.statusCancel
        .map((status) => {
          if (
            stateReduxNotificationDataPersist.some(
              (item) => item.report_no === status.report_no
            ) == true
          ) {
            console.log("649 run find: ", status.report_no);
            const foundItem = stateReduxNotificationDataPersist.find(
              (item) => item.report_no === status.report_no
            );
            console.log("649 FoundItem: ", foundItem);
            if (foundItem) {
              rowID = foundItem.rowID;
              console.log("649 Found rowID:", rowID); // Output: Found rowID: 2
            } else {
              console.log("649 No matching report_no found.");
            }
            return 1;
          } else {
            return 0;
          }
        })
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    }

    // byStatusAll.statusProcess,
    //   byStatusAll.statusCancel,
    //   byStatusAll.statusClose,
    //   byStatusAll.statusCompleted,
    //   byStatusAll.statusAssign,
    //   stateReduxNotificationData;

    const dataRead = {
      notif_id: rowID,
      entity_cd: stateReduxChoosedProject.entity_cd,
      project_no: stateReduxChoosedProject.project_no,
    };
    console.log("526 data: ", dataRead);

    // await httpClient
    //   .request({
    //     url: "/setting/notification-read",
    //     method: "POST",
    //     data: dataRead,
    //   })
    //   .then((res) => {
    //     console.log("526 res: ", res.data.data);
    //     //return res.data.data;
    //   })
    //   .catch((error) => {
    //     console.log("526 error: " + error.response.data.message);
    //     //return [];
    //   });

    await httpClient
      .request({
        url: "/modules/cs/ticket-by-status",
        method: "GET",
        params: formData,
      })
      .then((res) => {
        const datas = res.data;

        console.log("171 data ticket-by-status: ", res.data.data);

        //navigation.navigate("ViewHistoryStatus", { datastatuswhere }); //sementara krn data 0
        if (datas.success === true) {
          const datastatuswhere = datas.data;
          // filter by unit

          function checkLotno(currentValue, index, arr) {
            return currentValue.lot_no == choosedUnit.lot_no;
          }
          const result = datastatuswhere.filter(checkLotno);

          // setDataStatus(datastatus);
          //console.log("171 datastatuswhere", datastatuswhere);
          //navigation.navigate("ViewHistoryStatus", datastatuswhere);
          navigation.navigate("ViewHistoryStatus", {
            list: result,
            unit: choosedUnit,
          });
        } else {
          setDisabled(false);
        }

        // setSpinner(false);
        // return res.data;
      })
      .catch((error) => {
        //console.log("error get where status api", error.response.message);
        alert("e1127 " + error.response.data.message);
      });
  };

  //    const onCategoryPress = cat => {
  //        this.setState({isDisabled: true}, () => {
  //          this.goToScreen('screen.SelectCategory', cat);
  //        });
  //      };
  const ds = dataStatus;
  console.log("ds", ds);

  const renderOption = (item) => (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        //justifyContent: "center",
        //backgroundColor: "blue",
        //alignSelf: "center",
        //textAlign: "center",
        //marginLeft: "90%",
        //width: "135%",
        //marginVertical: 0,
      }}
    >
      <Text
        style={{
          // color: "#333",
          // flexDirection: "row",
          // alignItems: "center",
          //marginLeft: 125,
          //backgroundColor: "pink",
          //marginLeft: "60%",
          //paddingLeft: "60%",
          color: "black",
        }}
      >
        {item.lot_no}
      </Text>
      {dotList.includes(item.lot_no) && (
        // true ? (
        <View
          style={{
            width: 10,
            height: 10,
            backgroundColor: "red",
            borderRadius: 5,
            //marginLeft: 10,
            position: "absolute",
            //top: 0,
            right: -20,
          }}
        />
      )}
    </View>
  );

  // return (
  //   <View
  //     style={{
  //       flex: 1,
  //       flexDirection: "row",
  //       alignItems: "center",
  //       justifyContent: "center",
  //       backgroundColor: "blue",
  //       //alignSelf: "center",
  //       //textAlign: "center",
  //     }}
  //   >
  //     <Text
  //       style={{
  //         color: "#333",
  //         flexDirection: "row",
  //         alignItems: "center",
  //       }}
  //     >
  //       lot no
  //     </Text>
  //     <View
  //       style={{
  //         width: 10,
  //         height: 10,
  //         backgroundColor: "red",
  //         borderRadius: 5,
  //         marginLeft: 10,
  //       }}
  //     />
  //   </View>
  // );

  const renderOption2 = (item) => (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifySelf: "center",
        backgroundColor: "blue",
        alignSelf: "center",
        textAlign: "center",
      }}
    >
      <Text
        style={{
          color: "#333",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {item.lot_no}
      </Text>
      <View
        style={{
          width: 10,
          height: 10,
          backgroundColor: "red",
          borderRadius: 5,
          marginLeft: 10,
          position: "absolute",
          //top: 0,
          right: -20,
        }}
      />
    </View>
  );

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
        <View style={{ marginLeft: 10 }}>
          <Text title2>Ticket {choosedUnit?.lot_no}</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text headline style={{ fontWeight: "normal" }}>
              Status Help{"\n"}
              {params?.project_descs}
            </Text>
            <View>
              <ModalSelector
                style={{
                  marginRight: 30,
                  //backgroundColor: '#fff',
                  borderWidth: Platform.OS == "ios" ? 0.1 : 0,
                  padding: Platform.OS == "ios" ? 10 : 20,
                  borderRadius: Platform.OS == "ios" ? 10 : 10,
                  //borderRadius: 50,
                  //shadowColor: "#000",
                  // shadowOffset: {
                  //   width: 0,
                  //   height: 2,
                  // },
                  shadowOpacity: 0.25,
                  shadowRadius: 1,
                  elevation: 5, // For Android
                  margin: 10,
                  overflow: "hidden",
                }}
                //value={choosedUnit}
                //data={stateReduxDataUnit}
                data={stateReduxDataUnit.map((item) => ({
                  ...item,
                  label: renderOption(item),
                }))}
                keyExtractor={(item) => item.lot_no}
                //labelExtractor={(item) => item.lot_no}
                optionTextStyle={{ color: "#333" }}
                selectedItemTextStyle={{ color: "#3C85F1" }}
                initValue="Change unit"
                //value={viewFront}
                //viewFront, setViewFront
                onChange={(option) => {
                  //alert(`${option.label} (${option.key}) nom nom nom`);
                  //setViewFront("Change lot no");
                  setChoosedUnit(option);
                  saveUnit(option);
                  // const newbyStatusAll = {
                  // statusOpen,
                  // statusProcess,
                  // statusCancel,
                  // statusClose,
                  // };
                  filterByUnit(option.lot_no);
                  handleCangeDot(option.lot_no);
                }}
              >
                <Text headline style={{ fontWeight: "normal" }}>
                  Change unit
                </Text>
              </ModalSelector>
              {dotList.length != 0 &&
              dotList.some((item) => item != choosedUnit.lot_no) ? (
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
                    top: 5,
                    right: 25,
                    borderRadius: 10,
                  }}
                ></View>
              ) : null}
            </View>
          </View>
        </View>

        <View style={[styles.subWrap, { paddingBottom: 0, marginBottom: 10 }]}>
          {/* <View>
            <Text style={{ color: "#3f3b38", fontSize: 14 }}>
              Choose Project
            </Text>
            {spinner ? (
              <View>
                {/* <Spinner visible={this.state.spinner} /> 
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
                disabled
                checked={checkedEntity}
                title={arrDataTowerUser[0].project_descs}
                onPress={() => setCheckedEntity(!checkedEntity)}
              ></CheckBox>
            ) : (
              arrDataTowerUser.map((data, index) => (
                <CheckBox
                  disabled
                  key={index}
                  // checkedIcon="dot-circle-o"
                  // uncheckedIcon="circle-o"
                  title={data.project_descs}
                  checked={checkedEntity === index}
                  onPress={() => handleCheckChange(index, data)}
                />
              ))
            )}
          </View> */}

          {true === true ? (
            <View style={{ marginTop: 30, marginHorizontal: 10 }}>
              <TouchableOpacity
                onPress={() => handleNavigation(dataTowerUser, "'R'")}
                disabled={ds.cntopen == 0 ? true : false}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#555",
                  //   paddingTop: 1,
                  //backgroundColor: "blue",
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
                      minWidth: 80,
                      textAlign: "center",
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
                  {dotForStatus.open ? (
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
                        top: 10,
                        right: 20,
                        borderRadius: 10,
                      }}
                    ></View>
                  ) : null}
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleNavigation(dataTowerUser, "'A'")}
                disabled={ds.cntassign == 0 ? true : false}
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
                      minWidth: 80,
                      textAlign: "center",
                    }}
                  >
                    Assign
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
                        {ds.cntassign}
                      </Text>
                    }
                  ></Badge>
                  {ds.cntassign != "0" && ds.cntassign != "" ? (
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
                        top: 10,
                        right: 20,
                        borderRadius: 10,
                      }}
                    ></View>
                  ) : null}
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleNavigation(dataTowerUser, "'P'")}
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
                      minWidth: 80,
                      textAlign: "center",
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
                  {dotForStatus.procces ? (
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
                        top: 10,
                        right: 20,
                        borderRadius: 10,
                      }}
                    ></View>
                  ) : null}
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleNavigation(dataTowerUser, "'D'")}
                disabled={ds.cntcompleted == 0 ? true : false}
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
                    //backgroundColor: "red",
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
                      minWidth: 80,
                      textAlign: "center",
                    }}
                  >
                    Completed
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
                        {ds.cntcompleted}
                      </Text>
                    }
                  ></Badge>
                  {ds.cntcompleted != "0" && ds.cntcompleted != "" ? (
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
                        top: 10,
                        right: 20,
                        borderRadius: 10,
                      }}
                    ></View>
                  ) : null}
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
                      minWidth: 80,
                      textAlign: "center",
                    }}
                  >
                    Closed
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
                  {dotForStatus.close ? (
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
                        top: 10,
                        right: 20,
                        borderRadius: 10,
                      }}
                    ></View>
                  ) : null}
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleNavigation(dataTowerUser, "'X'")}
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
                      minWidth: 80,
                      textAlign: "center",
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
                  {dotForStatus.cancel ? (
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
                        top: 10,
                        right: 20,
                        borderRadius: 10,
                      }}
                    ></View>
                  ) : null}
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
