import {
  CardChannelGrid,
  CardSlide,
  CategoryList,
  CardReport06,
  News43,
  Price2Col,
  Icon,
  PlaceholderLine,
  Placeholder,
  NewsList,
  SafeAreaView,
  Text,
  //Button,
  Transaction2Col,
  SearchInput,
  TextInput,
  Preview,
  FlatListSlider,
  FlexWrapLayout,
} from "@components";
import {
  BaseColor,
  BaseStyle,
  useTheme,
  Typography,
  FontWeight,
  useFont,
} from "@config";
import {
  HomeChannelData,
  HomeListData,
  HomePopularData,
  HomeTopicData,
  PostListData,
} from "@data";
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  ScrollView,
  View,
  Image,
  Animated,
  ImageBackground,
  RefreshControl,
  Dimensions,
  Pressable,
  PixelRatio,
  Button,
  AppState,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ImageZoom from "react-native-image-pan-zoom";
import { useSelector, useDispatch } from "react-redux";
import getUser from "../../selectors/UserSelectors";
import HeaderCard from "./HeaderCard";
import HeaderHome from "./HeaderHome";
import styles from "./styles";
import Swiper from "react-native-swiper";
import Categories from "./Categories";
import SliderNews from "./SliderNews";
import axios from "axios";
import * as Utils from "@utils";
import numFormat from "../../components/numFormat";

import { notifikasi_nbadge, actionTypes } from "../../actions/NotifActions";
import getNotifRed from "../../selectors/NotifSelectors";
import getProject from "../../selectors/ProjectSelector";
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
import messaging from "@react-native-firebase/messaging";
import apiCall from "../../config/ApiActionCreator";
// import {TextInput} from '../../components';

import LinearGradient from "react-native-linear-gradient";
import ModalSelector from "react-native-modal-selector";

import MasonryList from "@react-native-seoul/masonry-list";
import { ActivityIndicator } from "react-native-paper";
//import { Platform } from "react-native";

import Modal from "react-native-modal";
//import { color } from "react-native-reanimated";
//import { useFocusEffect } from "@react-navigation/native";

import { fontPixel, pixelSizeVertical } from "./normalize";

import { API_URL_LOKAL } from "@env";
import httpClient from "../../controllers/HttpClient";
import ProjectController from "../../controllers/ProjectController";
import { store, persist } from "../../reducers";
import { SwiperFlatList } from "react-native-swiper-flatlist";
const { width } = Dimensions.get("window");
// import { useIsFocused } from "@react-navigation/native";
import { check_version } from "./functions";
import { useCustomTriggerOnFocus } from "../function/funcFocusEffect";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Home = (props) => {
  const stateStore = store.getState();
  //console.log("100 RT:", stateStore.user.refreshToken);
  const { navigation, route } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const font = useFont();
  //console.log("106 font: ", font);
  const [homeMenu, setHomeMenu] = useState([]);
  const [topics, setTopics] = useState(HomeTopicData);
  const [channels, setChannels] = useState(HomeChannelData);
  const [popular, setPopular] = useState(HomePopularData);
  const [list, setList] = useState(HomeListData);
  const [loading, setLoading] = useState(true);
  const [loadingImg, setLoadingImg] = useState(true);
  const [appState, setAppState] = useState(AppState.currentState);
  const user = useSelector((state) => getUser(state));
  //console.log("119 user: ", user);
  const stateRedux = useSelector((state) => state.user);
  const stateReduxDataProject = useSelector(
    (state) => state.Dataproject.Dataproject
  );
  const stateReduxDataUnit = useSelector(
    (state) => state.Dataproject.dataUnit //.Dataproject.Dataproject
  );
  const stateReduxChoosedUnit = useSelector(
    (state) => state.Dataproject.choosedUnit
  );
  const stateReduxChoosedProject = useSelector(
    (state) => state.Dataproject.chooseProject
  );
  const stateReduxHelpdeskDot = useSelector(
    (state) => state.Dataproject.helpdesk_dot
  );
  const stateReduxProjectDot = useSelector(
    (state) => state.Dataproject.project_dot
  );
  const stateReduxNotificationData = useSelector(
    (state) => state.Dataproject.notificationData
  );

  const [token, setToken] = useState(stateRedux.accessToken);
  const notif = useSelector((state) => getNotifRed(state));
  const project = useSelector((state) => getProject(state));

  const [email, setEmail] = useState(user != null ? user?.email : "");

  const [fotoprofil, setFotoProfil] = useState(
    user?.pict != null
      ? { uri: user?.pict }
      : require("../../assets/images/image-home/Main_Image.png")
  );
  const [name, setName] = useState(user != null ? user?.name : "");
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const scrollY = useRef(new Animated.Value(0)).current;
  const [getDataDue, setDataDue] = useState([]);
  const [getDataNotDue, setDataNotDue] = useState([]);
  const [hasError, setErrors] = useState(false);
  const [data, setData] = useState([]);

  const [getDataHistory, setDataHistory] = useState([]);

  const [dataTowerUser, setdataTowerUser] = useState([]);
  const [arrDataTowerUser, setArrDataTowerUser] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const [entity_cd, setEntity] = useState("01");
  const [project_no, setProjectNo] = useState("01");
  const [projectListUseState, setProjectListUseState] = useState([]);

  //const [lotno, setLotno] = useState([]);
  //console.log("lotno array 0", lotno.lot_no);
  //console.log("fotoprofil >", fotoprofil);
  const repl =
    user?.pict != null
      ? fotoprofil.uri //.replace("https", "http")
      : require("../../assets/images/image-home/Main_Image.png");
  //console.log("repll", repl);
  const [text_lotno, setTextLotno] = useState(stateReduxChoosedUnit);
  const [text_project, setTextProject] = useState(stateReduxChoosedProject);
  const [isChooseProject, setIsChooseProject] = useState(false);

  const [default_text_lotno, setDefaultLotno] = useState(true);
  const [keyword, setKeyword] = useState("");

  const [newsannounce, setNewsAnnounce] = useState([]);
  const [newsannounceslice, setNewsAnnounceSlice] = useState([]);
  const [loadNewsAnnounce, setLoadNews] = useState(true);

  const [promoclubfac, setPromoClubFac] = useState([]);
  const [promoclubfacslice, setPromoClubFacSlice] = useState([]);
  const [loadpromoclubAnnounce, setLoadPromoClub] = useState(true);
  const [imagePromoClubFac, setImagePromoClubFac] = useState([]);

  const [eventresto, setEventRestaurant] = useState([]);
  const [eventrestoslice, setEventRestaurantSlice] = useState([]);
  const [loadeventresto, setLoadEventResto] = useState(true);
  const [imageEventResto, setImageEventResto] = useState([]);

  const [statusUser, setStatusUser] = useState("");
  const [modalImage, setModalImage] = useState(false);
  const [imageGreetings, setImageGreetings] = useState([]);
  const [modalShowImage, setmodalShowImage] = useState(false);
  const [urlImageGreetings, setUrlGreetingsImage] = useState("");
  const [dotList, setDotList] = useState([]);
  const [dotChooseUnit, setDotChooseUnit] = useState(false);

  const [claimUnit, setClaimUnit] = useState(false);

  const [dataNotif, setDataNotif] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const [dummyArray, setDummyArray] = useState([
    {
      cluster_cd: "GSE",
      entity_cd: "1001",
      lot_no: "AA-23",
      project_no: "1001001",
    },
    // {
    //   cluster_cd: "GSE",
    //   entity_cd: "1001",
    //   lot_no: "AA-25",
    //   project_no: "1001001",
    // },
  ]);

  useEffect(() => {
    let intervalIdNotif;
    if (appState === "active") {
      intervalIdNotif = setInterval(() => {
        console.log("308 appState: ", appState);
        if (appState === "active") {
          //alert("run");
          projectDot();
        }
      }, 15000); // Update every 1000 milliseconds (1 second)
    }
    // Clean up the interval on component unmount
    return () => clearInterval(intervalIdNotif);
  }, [appState]);

  useEffect(() => {
    text_project ? setIsChooseProject(false) : setIsChooseProject(true);
  }, [text_project]);

  //appState
  // active
  // background
  // inactive

  //dummy notification
  //dotList;
  useEffect(() => {
    onChangelot(stateReduxChoosedUnit);
  }, [dotList]);

  const dataImageHeader = [
    {
      img_url:
        "https://api.property365.co.id:4421/tanrise_admin/assets/images/slides/featuredimage-apartment.jpg",
    },
    {
      img_url:
        "https://api.property365.co.id:4421/tanrise_admin/assets/images/slides/featuredimage-apartment.jpg",
    },
  ];

  // const [urlImageHeader, setUrlImageHeader] = useState(dataImageHeader);

  const [urlImageHeader, setUrlImageHeader] = useState([
    {
      img_url: "null",
    },
  ]);

  const [refreshing, setRefreshing] = useState(false);
  const [dataDD, setDataDD] = useState([]);

  // const isFocused = useFocusEffect();
  const dispatch = useDispatch();

  //const isFocused = useIsFocused();

  const headerAuth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const onRefresh = () => {
    setRefreshing(true);
    //user;
    loadData();
    check_version();
    wait(2000).then(() => setRefreshing(false));
  };

  // useEffect List
  //UE1
  // useEffect(() => {
  //   messaging().onNotificationOpenedApp((remoteMessage) => {
  //     console.log(
  //       "Notification caused app to open from background state:",
  //       remoteMessage.notification
  //     );
  //     navigation.navigate("Notification", remoteMessage);
  //   });

  //   // Check whether an initial notification is available
  //   messaging()
  //     .getInitialNotification()
  //     .then((remoteMessage) => {
  //       if (remoteMessage) {
  //         console.log(
  //           "Notification caused app to open from quit state:",
  //           remoteMessage.notification
  //         );
  //         navigation.navigate("Notification", remoteMessage);
  //       }
  //       //setLoading(false);
  //     });
  // }, []);

  useEffect(() => {
    //console.log("332_home useeffect");
    // This effect will run whenever stateReduxChoosedUnit changes
    if (stateReduxNotificationData) {
      //console.log("332_home useeffect true");
      setDotList(stateReduxNotificationData);
      //console.log("332_home notifRedux: ", stateReduxNotificationData);
      if (
        stateReduxNotificationData.some(
          (obj) =>
            obj?.entity_cd === text_project?.entity_cd &&
            obj?.project_no === text_project?.project_no &&
            obj?.lot_no === stateReduxChoosedUnit?.lot_no
        )
      ) {
        //masih ada
      } else {
        //setDotChooseUnit(false);
        //onChangelot(stateReduxChoosedUnit);
        saveHelpdeskDotNotification(false);
      }

      if (
        stateReduxNotificationData.some(
          (obj) =>
            obj?.entity_cd === text_project?.entity_cd &&
            obj?.project_no === text_project?.project_no
          //obj.lot_no === stateReduxChoosedUnit.lot_no
        )
      ) {
        //masih ada
      } else {
        setDotChooseUnit(false);
        //onChangelot(stateReduxChoosedUnit);
        //saveHelpdeskDotNotification(false);
      }
      // Perform any actions based on the new state
      // For example, fetching data or updating local state
    }
  }, [stateReduxNotificationData]); // Dependency array includes stateReduxChoosedUnit

  useEffect(() => {
    //console.log("119_1 user?.pict: ", user?.pict);
    setFotoProfil({ uri: user?.pict });
  }, [user]);

  useEffect(() => {
    onChangelot(stateReduxChoosedUnit, true);
    console.log("410 stateReduxChoosedUnit: ", stateReduxChoosedUnit);
  }, [stateReduxChoosedUnit]);

  //UE4
  useEffect(() => {
    setLoading(true);

    //console.log("uE 0: ", user?.pict);
    setFotoProfil({ uri: user?.pict });

    loadData();
    check_version();
    //alert("276 test");
    setLoading(false);
  }, []);

  const loadUnitReact = useCallback((item) =>
    dispatch(data_unit(item.entity_cd, item.project_no, email))
  );

  const loadData = async () => {
    //alert("test loadData");
    // const fcmToken = await messaging()
    //   .getToken()
    //   .catch((error) => {
    //     console.log("460 error: ", error);
    //   });
    // console.log("460 run0 : ", fcmToken);
    ////console.log("galery", galery);
    //console.log("uE 1");
    await loadDataClaimUnit();
    await doSomething();
    //dataImage();
    //console.log("uE 2");

    console.log("460 run1 :", text_project);
    if (text_project) {
      console.log("460 run2");
      loadUnitReact(text_project);
    }

    //console.log("uE 4");
    await dataMobileHeader();
    // carouselRef.current.snapToItem(0);
    ////console.log("about", data);
    //fetchDataDue();
    //fetchDataNotDue();
    //fetchDataHistory();

    //getLotNo();
    //getLotNo2();
    //console.log("uE 5");
    //await getHelpdeskNotification();
    await firstLogin();
    //await notifUser();
    //console.log("uE 6");

    //const dataproject = await ProjectController.data_project(email);
    // try {
    //   //console.log("15c start try " + token);
    //   const result = await httpClient({
    //     method: "GET",
    //     params: { email: email },
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
    //   //console.log("15c res: ", result);
    //   // if (!result.data.success) {
    //   //   return Promise.reject(result.data.message);
    //   // } else {
    //   //return result.data.data;
    //   // }
    //   loadProject(result.data.data);
    // } catch (error) {
    //   //console.log("15c error: ", error.response.data.message);
    //   alert(error.response.data.message);
    //   //return Promise.reject(error);
    // }

    await httpClient
      .request({
        url: "/home/common-project",
        method: "GET",
        params: { email: email },
      })
      .then((res) => {
        //setHomeMenu(res.data.data);
        //console.log("333 res: ", res.data.data);
        setProjectListUseState(res.data.data);
        dispatch(data_project(res.data.data));
        //loadProject(dataproject);
        ////console.log("333 loadFinish: ");
      })
      .catch((error) => {
        alert(error);
        //console.log("333 error: " + error.response.data.message);
      });

    //loadProject(dataproject);

    //news and promo
    await dataNewsAnnounce();
    await dataPromoClubFacilities();

    await projectDot();
  };

  //useCustomTriggerOnFocus(loadData, 120000);

  const projectDot = async () => {
    const arrayNotification = await httpClient
      .request({
        url: "/setting/notification",
        method: "GET",
        params: { email: user.email },
      })
      .then((res) => {
        //console.log("435 res: ", res.data.data);
        return res.data.data;
      })
      .catch((error) => {
        //console.log("435 error: " + error.response.data.message);
        return [];
      });

    const dots = arrayNotification.notifications.filter(
      (item) => item.isRead === "0"
    );
    // Filter notifications with isRead = 0
    ////console.log("436 stateReduxDataProject: ", stateReduxDataProject);
    console.log("435 notif dots: ", dots);
    ////console.log("436 notif arrayNotification: ", arrayNotification);
    saveDataNotification(dots);
    saveDataNotificationPersist(dots);
    await setDotList(dots);
    if (text_project) {
      // //console.log(
      //   "436 condition: ",
      //   dots.some((obj) => obj.entity_cd != text_project.entity_cd),
      //   text_project.entity_cd
      // );
      if (
        dots.some((obj) => obj.entity_cd != text_project.entity_cd)
        //|| dots?.length > 1
      ) {
        saveProjectDotNotification(true);
      } else {
        saveProjectDotNotification(false);
      }

      if (
        dots.some(
          (obj) =>
            obj.entity_cd === text_project.entity_cd &&
            obj.lot_no === stateReduxChoosedUnit.lot_no
        )
      ) {
        saveHelpdeskDotNotification(true);
      } else {
        saveHelpdeskDotNotification(false);
      }
    }
  };

  const firstLogin = async () => {
    //fetch api

    await httpClient
      .request({
        // url: "/home/menu",
        method: "GET",
        params: { group_cd: user.Group_Cd },
      })
      .then((res) => {
        //console.log("249 res: ", res.data.data);

        const firstLogin = res.data.data;
        if (firstLogin) {
          navigation.navigate("ChangePassword", null);
        }
      })
      .catch((error) => {
        //console.log("249 error: " + error.response.data.message);
      });

    //ChangePassword;
  };

  const loadDataClaimUnit = async () => {
    const dataParams = {
      email: user.email,
      //email: "m.hafid@ifca.co.id",
    };
    await httpClient
      .request({
        url: "auth/get-approval",
        method: "GET",
        params: dataParams,
      })
      .then((res) => {
        setClaimUnit(true);
      })
      .catch((e) => {
        //alert(e.response.data.message);
        setClaimUnit(false);
      });
  };

  //untuk load data get chairman message
  // (sebenernya terpakai hanya sekali, saat open screen pertama kali.
  // jika tidak dibatasi dengan akhir[] maka akan menimbulkan load limit.
  // tidak error parah, cuma mengganggu saja)

  const loadProject = useCallback(
    (dataproject) => dispatch(data_project(dataproject))
    //,[email, dispatch]
  );

  const saveUnit = useCallback((unit) => dispatch(choosed_unit(unit)));
  const saveProject = useCallback((project) =>
    dispatch(choosed_project(project))
  );
  const saveHelpdeskDotNotification = useCallback((state) =>
    dispatch(action_helpdesk_dot(state))
  );
  const saveProjectDotNotification = useCallback((state) =>
    dispatch(action_project_dot(state))
  );
  const saveDataNotification = useCallback((state) =>
    dispatch(action_data_notification(state))
  );
  const saveDataNotificationPersist = useCallback((state) =>
    dispatch(action_data_notification_persist(state))
  );

  const doSomething = async () => {
    // //console.log(
    //   'url greetings chairman',
    //   `http://apps.pakubuwono-residence.com/apiwebpbi/api/home/greetings-change-status_Get/` + email,
    // );

    await httpClient
      .request({
        url: "/home/menu",
        method: "GET",
        params: { group_cd: user.Group_Cd },
      })
      .then((res) => {
        // alert(user.Group_Cd);
        setHomeMenu(res.data.data);
        //console.log("249 res: ", res.data.data);
      })
      .catch((error) => {
        //console.log("249 error: " + error.response.data.message);
      });
  };

  const getImageGreetings = async () => {
    // //console.log(
    //   'url greetings chairman',
    //   `http://apps.pakubuwono-residence.com/apiwebpbi/api/home/greetings-change-status_Get/` + email,
    // );
    await axios
      .get(API_URL_LOKAL + `/home/greetings`)
      .then((res) => {
        // //console.log('res greetings', res.data.data);
        const image_greetings = res.data.data;
        //console.log("image_greetings", image_greetings);
        setImageGreetings(image_greetings);
        setLoadNews(false);
        // return res.data;
      })
      .catch((error) => {
        //console.log("error res image greeting", error);
        // alert('error get');
      });
  };

  const pressChairmanMessage = async () => {
    //sementara ditutup dulu prosesnya update status dan tanggalnya
    // setModalImage(false);

    await axios
      .post(API_URL_LOKAL + `/home/greetings-change-status/` + email)
      .then((res) => {
        //console.log("res update tanggal greetings", res.data.data);
        // //console.log('status user new old', status_user);
        setModalImage(false);
        setLoadNews(false);
        // return res.data;
      })
      .catch((error) => {
        //console.log("error update tanggal greetings", error);
        // alert('error get');
      });

    //setelah itu jalanin disini update data status jadi Old dan tanggal first_logindate today where email
  };

  const previewZoomGreeting = (item) => {
    // navigation.navigate('PreviewImageHome', {images: item});
    // navigation.navigate('PinchZoom');
    setUrlGreetingsImage(item);
    setmodalShowImage(true);
  };

  async function fetchDataHistory() {
    try {
      const res = await axios.get(
        API_URL_LOKAL + `/modules/billing/summary-history/IFCAPB/${user?.email}`
      );
      setDataHistory(res.data.Data);
      // //console.log('data get history', res.data.Data);
    } catch (error) {
      setErrors(error);
      // alert(hasError.toString());
    }
  }

  const dataNewsAnnounce = async (project = null) => {
    let params;
    if (project == null) {
      params = {
        entity_cd: text_project.entity_cd,
        project_no: text_project.project_no,
        //descs: text_project.descs,
      };
    } else {
      params = {
        entity_cd: project.entity_cd,
        project_no: project.project_no,
      };
    }
    //alert(JSON.stringify(params));
    try {
      const result = await httpClient.request({
        url: "/home/news",
        method: "GET",
        params: params,
      });
      const datanews = result.data.data;
      const slicedatanews = datanews.slice(0, 6);
      setNewsAnnounceSlice(slicedatanews);
      setNewsAnnounce(datanews);
      setLoadNews(false);
    } catch (error) {
      //console.log("445 error get news announce home", error);
      // alert('error get');
    }
  };

  const dataPromoClubFacilities = async (project = null) => {
    // await axios
    //   .get(API_URL_LOKAL + `/home/promo`, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })

    let params;
    if (project == null) {
      params = {
        entity_cd: text_project.entity_cd,
        project_no: text_project.project_no,
        //descs: text_project.descs,
      };
    } else {
      params = {
        entity_cd: project.entity_cd,
        project_no: project.project_no,
      };
    }

    await httpClient
      .request({
        url: "/home/promo",
        method: "GET",
        params: params,
      })
      .then((res) => {
        //console.log("445 res promoclubfacilities", res.data.data);
        const datapromoclub = res.data.data;

        //console.log("445 1run");
        // filter by category

        const filterForPromo = datapromoclub
          .filter((item) => item.category === "P")
          .map((items) => items);

        const filterForClubFacilities = datapromoclub
          .filter((item) => item.category === "CF")
          .map((items) => items);

        const filterForEvent = datapromoclub
          .filter((item) => item.category == "E")
          .map((items) => items);

        const filterForRestaurant = datapromoclub
          .filter((item) => item.category == "R")
          .map((items) => items);

        //console.log("445 2run");
        // join data atau data gabungan all per 2 category

        const joinFilterDataPromoClubFac = [
          ...filterForPromo,
          ...filterForClubFacilities,
        ];

        const joinFilterDataEventRestaurant = [
          ...filterForEvent,
          ...filterForRestaurant,
        ];

        //console.log("445 3run");
        // slice data for image

        const slicedatapromoclubfac = joinFilterDataPromoClubFac.slice(0, 6);
        const slicedataeventresto = joinFilterDataEventRestaurant.slice(0, 6);

        //console.log("445 4run ", slicedatapromoclubfac);
        // pecah array images from data slice

        const arrayImagePromoClubFac = slicedatapromoclubfac.map(
          (item, key) => {
            return {
              //...item?.images[0],
              pict: item?.url_image,
              title: item?.promo_title,
            };
          }
        );

        //console.log("445 5run ", arrayImagePromoClubFac);

        const arrayImageEventResto = slicedataeventresto.map((item, key) => {
          return {
            //...item?.images[0],
            pict: item?.url_image,
            title: item?.promo_title,
          };
        });
        //console.log("445 5.5 ", slicedataeventresto);
        //console.log("445 6 ", arrayImageEventResto);

        // const slicedatapromo = datapromoclub.slice(0, 6);
        // //console.log('slice data promo', slicedatapromo);
        // //console.log('image promo club', datapromoclub.image);

        // const tes = slicedatapromo.map((item, key) => {
        //   return {
        //     ...item.images[0],
        //   };
        // });
        // //console.log('tes gambar map', tes);

        //console.log("445 7image club fac", arrayImagePromoClubFac);

        setImagePromoClubFac(arrayImagePromoClubFac);
        setPromoClubFacSlice(slicedatapromoclubfac);
        setPromoClubFac(joinFilterDataPromoClubFac);

        setImageEventResto(arrayImageEventResto);
        setEventRestaurantSlice(slicedatapromoclubfac);
        setEventRestaurant(joinFilterDataEventRestaurant);

        setLoadNews(false);
        // return res.data;
      })
      .catch((error) => {
        //console.log("445 error get news announce home", error);
        // alert('error get');

        if (error.response) {
          // Request made and server responded with a status code
          // that falls out of the range of 2xx
          //console.log("445 Error Message:", error.response.data.message); // 404
          //console.log("445 Error Status:", error.response.status); // 404
          ////console.log("445 Error Data:", error.response.data); // Response data if available
          //console.log("445 Error Headers:", error.response.headers); // Response headers if available
        }
      });
  };

  const dataMobileHeader = async () => {
    await httpClient
      .request({
        url: "/home/common-mobile-header",
        method: "GET",
      })
      .then((res) => {
        //console.log("848 header: ", res.data.data);
        //const datapromoclub = res.data.data;

        if (res.data.success == true) {
          setUrlImageHeader(res.data.data);
        } else {
          //setUrlImageHeader(dataImageHeader);
        }
      })
      .catch((error) => {
        //console.log("848 error header: ", error);
        //setUrlImageHeader(dataImageHeader);
      });
  };

  //const galery = [...data];

  //TOTAL DATE DUE
  const sum =
    getDataDue == 0
      ? 0
      : getDataDue.reduceRight((max, bills) => {
          return (max += parseInt(bills.mbal_amt));
        }, 0);

  //console.log("sum", sum);

  //TOTAL DATE NOT DUE
  const sumNotDue =
    getDataNotDue == 0 || getDataNotDue == null
      ? 0
      : getDataNotDue.reduceRight((max, bills) => {
          return (max += parseInt(bills.mbal_amt));
        }, 0);

  //console.log("sumNotDue", sumNotDue);

  const math_total = Math.floor(sumNotDue) + Math.floor(sum);
  //console.log("math total", math_total);

  // const sumHistory =
  //   getDataHistory == null
  //     ? 0
  //     : getDataHistory.reduceRight((max, bills) => {
  //         return (max += parseInt(bills.mdoc_amt));
  //       }, 0);

  // //console.log('sumHistory', sumHistory);

  //LENGTH
  const onSelect = (indexSelected) => {};

  const unique =
    getDataDue == 0 ? 0 : [...new Set(getDataDue.map((item) => item.doc_no))];
  //console.log("unique", unique);

  const uniqueNotDue =
    getDataNotDue == 0 || getDataNotDue == null
      ? 0
      : [...new Set(getDataNotDue.map((item) => item.doc_no))];
  //console.log("uniqueNotDue", uniqueNotDue);

  const invoice = unique == 0 ? 0 : unique.length;
  //console.log("invoice", invoice);

  const invoiceNotDue = uniqueNotDue == 0 ? 0 : uniqueNotDue.length;
  //console.log("invoiceNotDue", invoiceNotDue);

  const total_outstanding = Math.floor(invoice) + Math.floor(invoiceNotDue);
  //console.log("total_outstanding", total_outstanding);

  // const uniqueHistory =
  //   getDataHistory == null
  //     ? setDataHistory([])
  //     : [...new Set(getDataHistory.map(item => item.doc_no))];
  // //console.log('uniqueHistory', uniqueHistory);

  // const invoiceHistory = uniqueHistory.length;
  // //console.log('invoiceHistory', invoiceHistory);

  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, 140],
    outputRange: [BaseColor.whiteColor, colors.text],
    extrapolate: "clamp",
    useNativeDriver: true,
  });

  //For header image opacity
  const headerImageOpacity = scrollY.interpolate({
    inputRange: [0, 250 - heightHeader - 20],
    outputRange: [1, 0],
    extrapolate: "clamp",
    useNativeDriver: true,
  });

  //artist profile image position from top
  const heightViewImg = scrollY.interpolate({
    inputRange: [0, 250 - heightHeader],
    outputRange: [250, heightHeader],
    useNativeDriver: true,
  });

  const goPostDetail = (item) => () => {
    navigation.navigate("PostDetail", { item: item });
  };

  const onChangeText = (text) => {
    setKeyword(text);
    // setCategory(
    //   text
    //     ? category.filter(item => item.title.includes(text))
    //     : CategoryData,
    // );
  };

  const onChangelot = (lot, fromUseEffectState = false) => {
    //setDefaultLotno(false);
    //choosed_unit;
    fromUseEffectState ? null : saveUnit(lot);

    //console.log("861 lot: ", lot);
    setTextLotno(lot);

    //dot choose unit
    if (
      dotList
        .filter(
          (item) =>
            item?.entity_cd === stateReduxChoosedProject?.entity_cd &&
            item?.project_no === stateReduxChoosedProject?.project_no
        )
        .some((obj) => obj?.lot_no != lot?.lot_no)
      //|| dotList?.length > 1
    ) {
      setDotChooseUnit(true);
    } else {
      setDotChooseUnit(false);
    }

    //dot helpdesk
    if (
      dotList.some(
        (obj) =>
          obj?.entity_cd === text_project?.entity_cd &&
          obj?.lot_no === lot?.lot_no
      )
    ) {
      saveHelpdeskDotNotification(true);
    } else {
      saveHelpdeskDotNotification(false);
    }
  };

  const onChangeProject = (project) => {
    saveProject(project);

    setTextProject(project);

    loadUnitReact(project);
    setTextLotno("");

    saveUnit({});

    //news and promo
    dataNewsAnnounce(project);
    dataPromoClubFacilities(project);

    //dot management
    console.log(
      "861 dotList.some: ",
      dotList.some((obj) => obj.entity_cd != project.entity_cd)
    );
    if (
      dotList.some((obj) => obj.entity_cd != project.entity_cd)
      //|| dotList?.length > 1
    ) {
      saveProjectDotNotification(true);
    } else {
      saveProjectDotNotification(false);
    }
    saveHelpdeskDotNotification(false);
  };

  const goToMoreNewsAnnounce = (item) => {
    //console.log("item go to", item.length);
    navigation.navigate("NewsAnnounce", { items: item });
  };

  const goToEventResto = (item) => {
    // //console.log('item go to', item.length);
    navigation.navigate("EventResto", { items: item });
  };

  const goToPromoClubFac = (item) => {
    //console.log("item go to", item.length);
    navigation.navigate("ClubFacilities", { items: item });
  };

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
          //marginLeft: 20,
          //backgroundColor: "pink",
          //marginLeft: "60%",
          //paddingLeft: "60%",
          color: "black",
        }}
      >
        {item.descs}
      </Text>
      {
        //dotList.includes(item.entity_cd) && (
        dotList.some((obj) => obj.entity_cd === item.entity_cd) && (
          // true ? (
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
        )
      }
    </View>
  );

  const renderOptionUnit = (item) => (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          //marginLeft: 125,
          color: "black",
        }}
      >
        {item.lot_no}
      </Text>
      {
        //dotList.includes(item.entity_cd) && (
        dotList.some(
          (obj) =>
            obj.lot_no === item.lot_no &&
            obj.entity_cd === stateReduxChoosedProject.entity_cd &&
            obj.project_no === stateReduxChoosedProject.project_no
        ) && (
          // true ? (
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
        )
      }
    </View>
  );

  const [activeIndex, setActiveIndex] = useState(0);

  // //console.log("1042 stateScreen: ", urlImageHeader);

  const renderItemCarousel_ = ({ item }) => {
    //console.log("1061 item.img_url: " + item.img_url);
    // <View
    //   style={{
    //     width: width,
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    // >
    //   <Image
    //     source={{ uri: item.img_url }}
    //     style={{
    //       width: "100%",
    //       height: 200,
    //       resizeMode: "cover",
    //     }}
    //   />
    // </View>
    return (
      <View style={[{ width, justifyContent: "center" }]}>
        <ImageBackground
          //source={require("../../assets/images/image-home/Main_Image.png")}
          //source={require("../../assets/images/image-home/carstensz.webp")}
          source={{ uri: item.img_url }}
          // source={{
          //   uri: "https://api.property365.co.id:4421/tanrise_admin/assets/images/slides/Bangunan-apartemen-di-Jakarta.jpg",
          // }}
          //source={{ uri: "https://via.placeholder.com/600x400?text=Image+2" }}
          style={{
            // height: '100%',
            height: 400,
            width: "100%",
            flex: 1,
            // resizeMode: 'cover',
            // borderBottomLeftRadius: 500,
            // borderBottomRightRadius: 175,
            backgroundColor: "lightgray",
          }}
          imageStyle={
            {
              //height: 400,
              //width: "100%",
              // borderBottomLeftRadius: 175,
              // borderBottomRightRadius: 175,
            }
          }
        ></ImageBackground>
      </View>
    );
  };
  const renderItemCarousel = ({ item }) => {
    // Pastikan item berisi URL gambar yang valid atau data lain yang diperlukan
    return (
      <View style={{ flex: 1 }}>
        <Text>ini image</Text>
        {/* <Image
          source={{ uri: item }}
          style={{ width: '100%', height: 200 }} // Sesuaikan style sesuai kebutuhan
          resizeMode="cover"
        /> */}
      </View>
    );
  };

  const CardItem = ({ i, item }) => {
    //console.log("key card item", i);
    //console.log("item card", item);
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("PreviewImageHome", {
            images: item?.pict,
            title: item?.title,
          })
        }
      >
        <View key={i} style={([styles.shadow], {})}>
          {/* <Text style={{ alignSelf: "center" }}>{item?.title}</Text> */}
          <Image
            source={{ uri: item?.pict }}
            style={
              ([styles.shadow],
              {
                height: i % 2 ? 300 : 200,
                width: 200,
                margin: 5,
                borderRadius: 10,
                alignSelf: "stretch",
                backgroundColor: "lightgray",
              })
            }
            resizeMode={"cover"}
          ></Image>
        </View>
      </TouchableOpacity>
    );
  };

  // return (
  //   <View style={{ flex: 1, backgroundColor: "white" }}>
  //     <SwiperFlatList
  //       autoplay
  //       autoplayDelay={2}
  //       autoplayLoop
  //       index={0}
  //       showPagination
  //       data={urlImageHeader}
  //       renderItem={({ item }) => (
  //         <View
  //           style={[
  //             { width, justifyContent: "center" },
  //             { backgroundColor: item },
  //           ]}
  //         >
  //           {/* <Text style={{ fontSize: width * 0.5, textAlign: "center" }}>
  //             {item}
  //           </Text> */}
  //           <ImageBackground
  //             //source={require("../../assets/images/image-home/Main_Image.png")}
  //             //source={require("../../assets/images/image-home/carstensz.webp")}
  //             source={{ uri: item.img_url }}
  //             // source={{
  //             //   uri: "https://api.property365.co.id:4421/tanrise_admin/assets/images/slides/Bangunan-apartemen-di-Jakarta.jpg",
  //             // }}
  //             //source={{ uri: "https://via.placeholder.com/600x400?text=Image+2" }}
  //             style={{
  //               // height: '100%',
  //               height: 400,
  //               width: "100%",
  //               flex: 1,
  //               // resizeMode: 'cover',
  //               // borderBottomLeftRadius: 500,
  //               // borderBottomRightRadius: 175,
  //             }}
  //             imageStyle={{
  //               height: 400,
  //               width: "100%",
  //               // borderBottomLeftRadius: 175,
  //               // borderBottomRightRadius: 175,
  //             }}
  //           ></ImageBackground>
  //         </View>
  //       )}
  //     />
  //   </View>
  // );

  const renderContent = () => {
    const mainNews = PostListData[0];

    return (
      <View
        style={[BaseStyle.safeAreaView, { backgroundColor: colors.background }]}
        edges={["right", "top", "left"]}
      >
        {user == null || user == "" ? (
          <Text>data user dihome null</Text>
        ) : // <HeaderHome />
        null}

        <ScrollView
          // contentContainerStyle={styles.paddingSrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* IMAGE HEADER SWIPER  */}
          <View style={{ flex: 1 }}>
            <SwiperFlatList
              autoplay
              autoplayDelay={10}
              autoplayLoop
              index={0}
              showPagination
              autoplayLoopKeepAnimation
              data={urlImageHeader}
              //data={dataImageHeader}
              renderItem={renderItemCarousel_}
            />
            <LinearGradient
              //colors={["rgba(73, 73, 73, 0)", "rgba(73, 73, 73, 1)"]}
              colors={["rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.3)"]}
              // colors={['#4c669f', '#3b5998', '#192f6a']}
              // {...otherGradientProps}
              style={{
                height: 400,
                // height: '85%',
                width: "100%",

                flexDirection: "column",
                // flex: 1,
                justifyContent: "center",
                // top: 30,
                // borderBottomLeftRadius: 175,
                // borderBottomRightRadius: 175,
                position: "absolute",
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  flex: 1,
                  justifyContent: "center",
                  top: 30,
                }}
              >
                {/* ------- TEXT WELCOME HOME ------- */}
                <View style={{ alignItems: "center", top: 10 }}>
                  <Image
                    style={{
                      height: 140,
                      width: "80%",
                      //padding: 100,
                      resizeMode: "contain",
                    }}
                    //source={require("../../assets/images/image-home/vector-logo-carstensz.webp")}
                    source={require("../../assets/images/image-home/logo-tanrise-white.png")}
                  ></Image>
                </View>
                <View
                  style={{
                    // flex: 1,
                    alignItems: "center",
                    alignSelf: "center",
                    //left: 47,
                    justifyContent: "center",

                    width: "80%",
                    marginTop: 50,
                    //backgroundColor: "blue",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 25,
                      color: "white",
                      fontFamily: font, //"DMSerifDisplay",
                      lineHeight: 30,
                      textAlign: "center",
                    }}
                  >
                    Welcome
                    {"\n"}
                    {user?.name}
                  </Text>
                </View>
                {/* ------- CLOSE TEXT WELCOME HOME ------- */}

                {/* ----- SEARCH INPUT ----- */}
                {/* <View
                    style={{
                      // flex: 1,
                      alignItems: 'center',
                      left: 47,
                      justifyContent: 'center',
                      width: '80%',
                    }}>
                    <SearchInput
                      style={[BaseStyle.textInput, Typography.body1]}
                      onChangeText={onChangeText}
                      autoCorrect={false}
                      placeholder={t('Explore your luxury lifestyle')}
                      placeholderTextColor={BaseColor.grayColor}
                      value={keyword}
                      selectionColor={colors.primary}
                      onSubmitEditing={() => {}}
                      icon={
                        <Icon
                          name="search"
                          solid
                          size={24}
                          color={colors.primary}
                        />
                      }
                    />
                  </View> */}
                {/* <View style={{ alignItems: "center", top: 20 }}>
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "DMSerifDisplay",
                      fontSize: 10,
                    }}
                  >
                    Once Upon Your Lifetime
                  </Text>
                </View> */}
              </View>
            </LinearGradient>
          </View>

          <View
            style={{
              flexDirection: "row",
              //marginLeft: 35,
              marginTop: 10,
              marginBottom: 10,
              //backgroundColor: "red",
              //alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <Image
              style={{
                height: 60,
                width: 60,
                borderRadius: 30,
                marginRight: 15,
                marginTop: 10,
              }}
              // source={require('../../assets/images/image-home/Main_Image.png')}
              source={user?.pict != null ? { uri: repl } : fotoprofil}
            ></Image> */}
            <View
              style={{
                //alignSelf: "center",
                //justifyContent: "center",
                alignItems: "center",
                //backgroundColor: "blue",
                //marginLeft: 10
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  onLoadStart={() => setLoadingImg(true)}
                  onLoadEnd={() => setLoadingImg(false)}
                  onError={() => setLoadingImg(false)} // Handle image loading errors
                  style={{
                    height: 60,
                    width: 60,
                    borderRadius: 30,
                    marginRight: 15,
                    marginTop: 10,
                    // backgroundColor: "lightgray",
                    backgroundColor: colors.primaryLight,
                  }}
                  // source={require('../../assets/images/image-home/Main_Image.png')}
                  source={user?.pict != null ? { uri: repl } : fotoprofil}
                ></Image>
                {/* {loadingImg && (
                  <ActivityIndicator //size="large" color="#0000ff"
                  />
                )} */}
                <Text
                  // adjustsFontSizeToFit={true}
                  // allowFontScaling={true}
                  style={{
                    // fontSize: 18,s
                    fontSize: fontPixel(18),
                    paddingVertical: pixelSizeVertical(10),
                    // marginVertical: 3,
                    fontFamily: font, //"DMSerifDisplay",
                  }}
                >
                  {/* Nama pemilik */}
                  {user?.name}
                </Text>
                <Icon
                  name="star"
                  solid
                  size={18}
                  color={colors.primary}
                  style={{ marginHorizontal: 5 }}
                />
              </View>
              {/* <Text>{lotno.length}</Text> */}
              {projectListUseState.length != 0 ? (
                <View
                  style={{
                    //backgroundColor: "blue",
                    backgroundColor: colors.primary, //"#315447",
                    height: 35,
                    // width: '100%',
                    width: 350,
                    //justifyContent: "center",
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    alignContent: "center",
                    justifyContent: "center",
                    marginVertical: 15,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      //paddingLeft: 0,
                      //alignContent: "space-between",
                    }}
                  >
                    <ModalSelector
                      style={{
                        justifyContent: "center",
                        alignSelf: "center",
                        flex: 1,
                      }}
                      childrenContainerStyle={{
                        color: "#CDB04A",
                        alignSelf: "center",
                        fontSize: 16,
                        // top: 10,
                        // flex: 1,
                        justifyContent: "center",
                        fontWeight: "800",
                        fontFamily: "KaiseiHarunoUmi",
                        flexDirection: "row",
                      }}
                      data={projectListUseState.map((item) => ({
                        ...item,
                        label: renderOption(item),
                      }))}
                      optionTextStyle={{ color: "#333" }}
                      selectedItemTextStyle={{ color: "#3C85F1" }}
                      accessible={true}
                      keyExtractor={(item) => item}
                      cancelButtonAccessibilityLabel={"Cancel Button"}
                      cancelText={"Cancel"}
                      onChange={(option) => {
                        onChangeProject(option);
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          flex: 1,
                          justifyContent: "space-between",
                          //paddingRight: 15,
                        }}
                      >
                        <Text
                          adjustsFontSizeToFit={true}
                          allowFontScaling={true}
                          style={{
                            color: "#fff",
                            alignSelf: "center",
                            fontSize: 14,
                            justifyContent: "center",
                            //paddingRight: 10,

                            fontWeight: "800",
                            fontFamily: font, //"KaiseiHarunoUmi",
                          }}
                        >
                          {text_project ? "" : "Choose Project"}
                        </Text>
                        <Text
                          style={{
                            color: "#CDB04A",
                            alignSelf: "center",
                            fontSize: 16,
                            // top: 10,
                            // flex: 1,
                            justifyContent: "center",
                            fontWeight: "800",
                            fontFamily: font, //"KaiseiHarunoUmi",
                          }}
                        >
                          {text_project?.project_descs}
                        </Text>
                        <Icon
                          name="caret-down"
                          solid
                          size={26}
                          // color={colors.primary}
                          style={{ marginLeft: 5 }}
                          color={"#CDB04A"}
                        />
                      </View>
                    </ModalSelector>
                    {stateReduxProjectDot ? (
                      <View
                        style={{
                          borderWidth: 1,
                          borderColor: BaseColor.whiteColor,
                          justifyContent: "center",
                          alignItems: "center",
                          width: 20,
                          height: 35,
                          backgroundColor: "red",
                          position: "absolute",
                          top: -10,
                          right: -15,
                          borderRadius: 10,
                        }}
                      >
                        {/* <Text whiteColor caption2>
            {finalCount < 0 ? 0 : finalCount}
          </Text> */}
                      </View>
                    ) : null}
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    backgroundColor: colors.primary, //"#315447",
                    height: 50,
                    // width: '100%',
                    //width: 150,
                    //justifyContent: "center",
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 20,
                    marginBottom: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      paddingLeft: 5,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        //backgroundColor: "blue",
                        alignSelf: "center",
                        fontSize: 16,
                        justifyContent: "center",
                        paddingRight: 5,

                        fontWeight: "600",
                        fontFamily: font, //"KaiseiHarunoUmi",
                        textAlign: "center",
                      }}
                      //ellipsizeMode="tail"
                      numberOfLines={2}
                    >
                      Please claim your unit before using this mobile app
                    </Text>

                    {
                      <ModalSelector
                        style={{
                          justifyContent: "center",
                          alignSelf: "center",
                        }}
                        childrenContainerStyle={{
                          color: "#CDB04A",
                          alignSelf: "center",
                          fontSize: 16,
                          // top: 10,
                          // flex: 1,
                          justifyContent: "center",
                          fontWeight: "800",
                          fontFamily: "KaiseiHarunoUmi",
                        }}
                        //data={lotno}
                        optionTextStyle={{ color: "#333" }}
                        selectedItemTextStyle={{ color: "#3C85F1" }}
                        accessible={true}
                        keyExtractor={(item) => item.lot_no}
                        // initValue={'ahlo'}
                        labelExtractor={(item) => item.lot_no} //khusus untuk lotno
                        cancelButtonAccessibilityLabel={"Cancel Button"}
                        cancelText={"Cancel"}
                        onChange={(option) => {
                          onChangelot(option);
                        }}
                      >
                        <Text
                          style={{
                            color: "#CDB04A",
                            alignSelf: "center",
                            fontSize: 16,
                            // top: 10,
                            // flex: 1,
                            justifyContent: "center",
                            fontWeight: "800",
                            fontFamily: "KaiseiHarunoUmi",
                          }}
                        ></Text>
                      </ModalSelector>
                    }
                  </View>
                </View>
              )}
              {projectListUseState.length != 0 ? (
                stateReduxDataUnit.length != 0 ? (
                  <View
                    style={{
                      backgroundColor: colors.primary, //"#315447",
                      height: 35,
                      // width: '100%',
                      width: 180,
                      justifyContent: "center",
                      paddingHorizontal: 10,
                      borderRadius: 10,
                      //alignSelf:'center'
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        paddingLeft: 0,
                        //alignContent: "space-between",
                      }}
                    >
                      <ModalSelector
                        disabled={isChooseProject}
                        //disabled={true}
                        style={{
                          justifyContent: "center",
                          alignSelf: "center",
                          flex: 1,
                        }}
                        childrenContainerStyle={{
                          color: "#CDB04A",
                          alignSelf: "center",
                          fontSize: 16,
                          // top: 10,
                          // flex: 1,
                          justifyContent: "center",
                          fontWeight: "800",
                          fontFamily: "KaiseiHarunoUmi",
                          flexDirection: "row",
                        }}
                        data={stateReduxDataUnit}
                        optionTextStyle={{ color: "#333" }}
                        selectedItemTextStyle={{ color: "#3C85F1" }}
                        accessible={true}
                        keyExtractor={(item) => item.lot_no}
                        // initValue={'ahlo'}
                        labelExtractor={(item) => renderOptionUnit(item)} //khusus untuk lotno
                        cancelButtonAccessibilityLabel={"Cancel Button"}
                        cancelText={"Cancel"}
                        onChange={(option) => {
                          onChangelot(option);
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            flex: 1,
                            justifyContent: "space-between",
                            paddingRight: 10,
                          }}
                        >
                          <Text
                            adjustsFontSizeToFit={true}
                            allowFontScaling={true}
                            style={{
                              color: "#fff",
                              alignSelf: "center",
                              fontSize: 14,
                              justifyContent: "center",
                              paddingRight: 10,

                              fontWeight: "800",
                              fontFamily: font, //"KaiseiHarunoUmi",
                            }}
                          >
                            {text_lotno?.lot_no ? "Unit" : "Choose Unit"}
                          </Text>
                          <Text
                            style={{
                              color: "#CDB04A",
                              alignSelf: "center",
                              fontSize: 16,
                              // top: 10,
                              // flex: 1,
                              justifyContent: "center",
                              fontWeight: "800",
                              fontFamily: font, //"KaiseiHarunoUmi",
                            }}
                          >
                            {text_lotno?.lot_no}
                          </Text>
                          <Icon
                            name="caret-down"
                            solid
                            size={26}
                            // color={colors.primary}
                            style={{ marginLeft: 5 }}
                            color={"#CDB04A"}
                          />
                        </View>
                      </ModalSelector>
                      {dotChooseUnit ? (
                        <View
                          style={{
                            borderWidth: 1,
                            borderColor: BaseColor.whiteColor,
                            justifyContent: "center",
                            alignItems: "center",
                            position: "absolute",
                            width: 20,
                            height: 35,
                            backgroundColor: "red",
                            top: -10,
                            right: -20,
                            borderRadius: 10,
                          }}
                        >
                          {/* <Text whiteColor caption2>
            {finalCount < 0 ? 0 : finalCount}
          </Text> */}
                        </View>
                      ) : null}
                    </View>
                  </View>
                ) : (
                  <View
                    style={{
                      backgroundColor: colors.primary, //"#315447",
                      height: 35,
                      // width: '100%',
                      //width: 150,
                      justifyContent: "center",
                      paddingHorizontal: 10,
                      borderRadius: 10,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        paddingLeft: 5,
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          alignSelf: "center",
                          fontSize: 14,
                          justifyContent: "center",
                          paddingRight: 5,

                          fontWeight: "800",
                          fontFamily: font, //"KaiseiHarunoUmi",
                        }}
                      >
                        Unit not found
                      </Text>

                      <ModalSelector
                        style={{
                          justifyContent: "center",
                          alignSelf: "center",
                        }}
                        childrenContainerStyle={{
                          color: "#CDB04A",
                          alignSelf: "center",
                          fontSize: 16,
                          // top: 10,
                          // flex: 1,
                          justifyContent: "center",
                          fontWeight: "800",
                          fontFamily: "KaiseiHarunoUmi",
                        }}
                        //data={lotno}
                        optionTextStyle={{ color: "#333" }}
                        selectedItemTextStyle={{ color: "#3C85F1" }}
                        accessible={true}
                        keyExtractor={(item) => item.lot_no}
                        // initValue={'ahlo'}
                        labelExtractor={(item) => item.lot_no} //khusus untuk lotno
                        cancelButtonAccessibilityLabel={"Cancel Button"}
                        cancelText={"Cancel"}
                        onChange={(option) => {
                          onChangelot(option);
                        }}
                      >
                        <Text
                          style={{
                            color: "#CDB04A",
                            alignSelf: "center",
                            fontSize: 16,
                            // top: 10,
                            // flex: 1,
                            justifyContent: "center",
                            fontWeight: "800",
                            fontFamily: "KaiseiHarunoUmi",
                          }}
                        ></Text>
                      </ModalSelector>
                    </View>
                  </View>
                )
              ) : null}
            </View>
          </View>

          <View style={styles.paddingContent}>
            {/* {loading && <ActivityIndicator />} */}
            {user == null || user == "" ? (
              <Text>user not available</Text>
            ) : !loading ? (
              <Categories
                style={{ marginTop: 10, fontFamily: font }}
                menu={homeMenu}
                font={font}
                isClaimUnit={claimUnit}
                isOtherMenu={projectListUseState.length != 0}
              />
            ) : (
              <ActivityIndicator />
            )}
          </View>
          {/**errot */}
          <View
            style={{
              marginBottom: 10,
              flex: 1,
              fontFamily: font,
              //backgroundColor: "blue",
            }}
          >
            <View
              style={{
                //backgroundColor: "red",
                marginHorizontal: 30,
                marginTop: 20,
                //marginBottom: 10,
                //backgroundColor: colors.primary,
                //padding: 5,
                // borderTopLeftRadius: 20,
                // borderBottomLeftRadius: 7,
                // borderBottomRightRadius: 20,
                // borderTopRightRadius: 7,
                //borderRadius: 20,
              }}
            >
              <View
                style={{
                  borderRadius: 15,
                  // borderTopLeftRadius: 15,
                  // borderBottomRightRadius: 15,
                  //alignItems: "center",
                  borderColor: colors.primary,
                  //borderWidth: 2,
                  borderLeftWidth: 0,
                  borderRightWidth: 0,
                  borderBottomWidth: 0,
                  //backgroundColor: colors.primary,
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    color: colors.text,
                    fontFamily: font, //"DMSerifDisplay",
                    //padding: 3,
                    //borderTopLeftRadius: 20,
                  }}
                >
                  Our Bulletin
                </Text>
                <Text
                  style={{
                    //padding: 3,
                    color: colors.text,
                  }}
                >
                  News
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginRight: 20,
                }}
              >
                {
                  // newsannounce.length >= 6 ? (
                  false ? (
                    <TouchableOpacity
                      onPress={() => goToMoreNewsAnnounce(newsannounce)}
                    >
                      <View
                        style={{ alignSelf: "center", flexDirection: "row" }}
                      >
                        <Text style={{ marginHorizontal: 5, fontSize: 14 }}>
                          More
                        </Text>
                        <Icon
                          name="arrow-right"
                          solid
                          size={16}
                          color={colors.primary}
                        />
                      </View>
                    </TouchableOpacity>
                  ) : null
                  // <Text>kurang dari 6</Text>
                }
              </View>
            </View>
            <View
              style={
                {
                  //marginVertical: 10,
                  //marginLeft: 20,
                  //backgroundColor: "blue",
                }
              }
            >
              {loading ? (
                <ActivityIndicator />
              ) : newsannounce.length != 0 ? (
                <SliderNews
                  data={newsannounce}
                  local={true}
                  // contentContainerStyle={{paddingHorizontal: 16}}
                  // onPress={//console.log('klik')}
                />
              ) : (
                <>
                  <Text
                    style={{
                      marginLeft: 30,
                      //backgroundColor: "blue"
                      color: "gray",
                      marginTop: 20,
                    }}
                  >
                    No news right now
                  </Text>
                </>
              )}
            </View>
          </View>

          <View style={{ marginBottom: 20, flex: 1, fontFamily: font }}>
            <View style={{ marginLeft: 30, marginTop: 20, marginBottom: 10 }}>
              <Text
                style={{
                  fontSize: 24,
                  // color: 'white',
                  //fontFamily: "DMSerifDisplay",
                }}
              >
                This Weekend
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginRight: 20,
                }}
              >
                <Text>Event and Restaurant</Text>
                {
                  // eventresto.length >= 6 ? (
                  false ? (
                    <TouchableOpacity
                      onPress={() => goToEventResto(eventresto)}
                    >
                      <View
                        style={{ alignSelf: "center", flexDirection: "row" }}
                      >
                        <Text style={{ marginHorizontal: 5, fontSize: 14 }}>
                          More
                        </Text>
                        <Icon
                          name="arrow-right"
                          solid
                          size={16}
                          color={colors.primary}
                        />
                      </View>
                    </TouchableOpacity>
                  ) : null
                  // <Text>kurang dari 6</Text>
                }
              </View>
            </View>

            <View
              style={{
                marginVertical: 10,
                marginHorizontal: 10,
                fontFamily: font,
              }}
            >
              {loading ? (
                <ActivityIndicator />
              ) : imageEventResto.length != 0 ? (
                <ScrollView horizontal>
                  <MasonryList
                    data={imageEventResto}
                    // data={sliceArrEvent}
                    style={{ alignSelf: "stretch" }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                    contentContainerStyle={{
                      paddingHorizontal: 10,
                      alignSelf: "stretch",
                      // alignSelf: 'flex-start',
                    }}
                    keyExtractor={(item, index) => index}
                    numColumns={3}
                    renderItem={CardItem}
                  />
                </ScrollView>
              ) : (
                <>
                  <Text
                    style={{
                      marginLeft: 20,
                      //backgroundColor: "blue"
                      color: "grey",
                    }}
                  >
                    No event right now
                  </Text>
                </>
              )}
            </View>
          </View>

          <View style={{ marginBottom: 20, flex: 1, fontFamily: font }}>
            <View style={{ marginLeft: 30, marginTop: 20, marginBottom: 10 }}>
              <Text
                style={{
                  fontSize: 24,
                  // color: 'white',
                  //fontFamily: "DMSerifDisplay",
                }}
              >
                Club And Facilities
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginRight: 20,
                }}
              >
                <Text>Check Our Promo Here</Text>
                {
                  // promoclubfac.length >= 6 ? (
                  false ? (
                    <TouchableOpacity
                      onPress={() => goToPromoClubFac(promoclubfac)}
                    >
                      <View
                        style={{ alignSelf: "center", flexDirection: "row" }}
                      >
                        <Text style={{ marginHorizontal: 5, fontSize: 14 }}>
                          More
                        </Text>
                        <Icon
                          name="arrow-right"
                          solid
                          size={16}
                          color={colors.primary}
                        />
                      </View>
                    </TouchableOpacity>
                  ) : null
                  // <Text>kurang dari 6</Text>
                }
              </View>
            </View>
            <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
              {loading ? (
                <ActivityIndicator />
              ) : imagePromoClubFac.length != 0 ? (
                <ScrollView horizontal>
                  <FlatList
                    pagingEnabled={true}
                    decelerationRate="fast"
                    bounces={false}
                    data={imagePromoClubFac}
                    numColumns={3}
                    contentContainerStyle={{
                      paddingHorizontal: 10,
                    }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("PreviewImageHome", {
                            images: item?.pict,
                          })
                        }
                      >
                        <View
                          style={[
                            {
                              width: 250, //Dimensions.get("window").width, // Width of the cropped area
                              height: 450, // Height of the cropped area
                              overflow: "hidden", // Crops the image to the container
                              position: "relative",
                              borderRadius: 10,
                            },
                            styles.shadow,
                          ]}
                        >
                          <Image
                            source={{
                              uri: item?.pict,
                            }}
                            style={[
                              {
                                height: "100%", // Height of the image
                                position: "absolute",
                                left: 0, // Start cropping from the left
                              },
                              { width: 450 },
                            ]}
                            resizeMode="cover"
                          />
                        </View>
                        {/* </View> */}
                      </TouchableOpacity>
                    )}
                    // keyExtractor={(item, index) => item.toString() + index}
                    keyExtractor={(item, index) => index}
                  />
                </ScrollView>
              ) : (
                <>
                  <Text
                    style={{
                      marginLeft: 20,
                      //backgroundColor: "blue"
                      color: "grey",
                    }}
                  >
                    No promo right now
                  </Text>
                </>
              )}
            </View>
          </View>
          {/*           <Button
            title={
              "simulasi notifikasi " +
              JSON.stringify(dummyArray.length) +
              " unit"
            }
            onPress={
              () => {
                if (dummyArray.length == 2) {
                  const newArray = [
                    {
                      cluster_cd: "GSE",
                      entity_cd: "1001",
                      lot_no: "AA-23",
                      project_no: "1001001",
                    },
                  ];
                  setDummyArray(newArray);
                  saveDataNotification(newArray);
                  setDotList(newArray);
                  //await onChangelot(stateReduxChoosedUnit);
                } else {
                  const newArray = [
                    {
                      cluster_cd: "GSE",
                      entity_cd: "1001",
                      lot_no: "AA-23",
                      project_no: "1001001",
                    },
                    {
                      cluster_cd: "GSE",
                      entity_cd: "1001",
                      lot_no: "AA-25",
                      project_no: "1001001",
                    },
                  ];
                  setDummyArray(newArray);
                  saveDataNotification(newArray);
                  setDotList(newArray);
                  //await onChangelot(stateReduxChoosedUnit);
                }
              }
              // setDummyArray([
              //   {
              //     cluster_cd: "GSE",
              //     entity_cd: "1001",
              //     lot_no: "AA-23",
              //     project_no: "1001001",
              //   },
              // ])
            }
          /> */}
        </ScrollView>
        {/* Close Modal Greeting Chairman  */}
        <View>
          <Modal
            isVisible={modalImage}
            animationType={"slide"}
            style={{ height: "100%", padding: 0, margin: 0 }}
            onBackdropPress={() => pressChairmanMessage()}
          >
            <View
              style={{
                // flex: 1,
                // backgroundColor: BaseColor.whiteColor,
                height: "90%",
                // backgroundColor: BaseColor.whiteColor,
                // borderRadius: 30,
                marginTop: "10%",
                // justifyContent: 'center',
              }}
            >
              {/* Button close X  */}
              <View
                style={{ flexDirection: "row", width: "100%", marginBottom: 5 }}
              >
                <View
                  style={{
                    marginTop: 20,
                    justifyContent: "space-between",
                    flex: 1,
                  }}
                ></View>
                {/* <View
                  style={{
                    marginTop: 20,
                    justifyContent: 'space-between',
                    marginRight: 10,
                  }}>
                  <Pressable onPress={() => pressChairmanMessage()}>
                    <View style={{width: 30, height: 20}}>
                      <Icon name={'times'} size={20}></Icon>
                    </View>
                  </Pressable>
                </View>
              */}
              </View>
              {imageGreetings.map((item, index) => (
                <View
                  style={{
                    // flex: 1,
                    // position: 'absolute',
                    // top: 0,
                    height: "70%",
                    width: "100%",
                    backgroundColor: BaseColor.whiteColor,
                    borderRadius: 30,
                  }}
                  key={index}
                >
                  <ImageBackground
                    source={{
                      uri: item.greetings_file.replace("https", "http"),
                    }}
                    // resizeMode="stretch"
                    // resizeMode="stretch"
                    // resizeMode="cover"
                    resizeMode="contain"
                    // source={require('@assets/images/ChairmanMessage.jpeg')}
                    style={{
                      // width: Dimensions.get('window').width,
                      marginLeft: "5%",
                      width: "95%",
                      flexDirection: "column",
                      alignContent: "center",
                      alignItems: "center",
                      height: "100%",
                      // marginTop: 20,
                      // height: Dimensions.get('window').height,
                      // resizeMode: 'cover',
                      // justifyContent: 'center',
                      // paddingVertical: 10,
                    }}
                  ></ImageBackground>
                </View>
                // {/* Button Next Here  */}
                // <View
                //   style={{
                //     flex: 1,
                //     justifyContent: 'flex-end',
                //     marginBottom: 36,
                //   }}>
                //   <View style={{flexDirection: 'row', width: '100%'}}>
                //     <View
                //       style={{
                //         marginTop: 10,
                //         justifyContent: 'space-between',
                //         flex: 1,
                //         // backgroundColor: 'red',
                //         // width: '50%',
                //       }}>
                //       {/* <Text>halo</Text> */}
                //       <Pressable
                //         onPress={() =>
                //           previewZoomGreeting(item.greetings_file)
                //         }>
                //         <View
                //           style={{
                //             alignItems: 'center',
                //             flexDirection: 'row',
                //           }}>
                //           <Text
                //             style={{
                //               paddingHorizontal: 10,
                //               fontSize: 16,
                //               color: colors.primary,
                //             }}>
                //             Preview Zoom
                //           </Text>
                //           <Icon
                //             name="search"
                //             solid
                //             size={16}
                //             color={colors.primary}
                //           />
                //         </View>
                //       </Pressable>
                //     </View>
                //     <View
                //       style={{
                //         marginTop: 10,
                //         justifyContent: 'space-between',
                //         // marginRight: 10,
                //         // flex: 1,
                //         // backgroundColor: 'blue',
                //         // width: '50%',
                //       }}>
                //       <Pressable onPress={() => pressChairmanMessage()}>
                //         <View
                //           style={{
                //             alignItems: 'center',
                //             marginRight: 20,
                //             flexDirection: 'row',
                //           }}>
                //           <Text
                //             style={{
                //               paddingHorizontal: 10,
                //               fontSize: 16,
                //               color: colors.primary,
                //             }}>
                //             Next
                //           </Text>
                //           <Icon
                //             name="arrow-right"
                //             solid
                //             size={16}
                //             color={colors.primary}
                //           />
                //         </View>
                //       </Pressable>
                //     </View>
                //   </View>
                // </View>
              ))}
            </View>
            <View
              style={{
                marginBottom: "10%",
                backgroundColor: BaseColor.whiteColor,
                paddingVertical: 20,
                // flex: 1,
                //     justifyContent: 'flex-end',
                //     marginBottom: 36,
              }}
            >
              {/* <Button style={{backgroundColor: colors.primary}}>
              </Button> */}
              {imageGreetings.map((item, index) => (
                <View style={{ flexDirection: "row", width: "100%" }}>
                  <View
                    style={{
                      marginTop: 10,
                      justifyContent: "space-between",
                      flex: 1,
                      // backgroundColor: 'red',
                      // width: '50%',
                    }}
                  >
                    {/* <Text>halo</Text> */}
                    <Pressable
                      onPress={() =>
                        previewZoomGreeting(
                          item.greetings_file.replace("https", "http")
                        )
                      }
                    >
                      <View
                        style={{
                          alignItems: "center",
                          flexDirection: "row",
                        }}
                      >
                        <Text
                          style={{
                            paddingHorizontal: 10,
                            fontSize: 16,
                            color: colors.primary,
                          }}
                        >
                          Preview Zoom
                        </Text>
                        <Icon
                          name="search"
                          solid
                          size={16}
                          color={colors.primary}
                        />
                      </View>
                    </Pressable>
                  </View>
                  <View
                    style={{
                      marginTop: 10,
                      justifyContent: "space-between",
                      // marginRight: 10,
                      // flex: 1,
                      // backgroundColor: 'blue',
                      // width: '50%',
                    }}
                  >
                    <Pressable onPress={() => pressChairmanMessage()}>
                      <View
                        style={{
                          alignItems: "center",
                          marginRight: 20,
                          flexDirection: "row",
                        }}
                      >
                        <Text
                          style={{
                            paddingHorizontal: 10,
                            fontSize: 16,
                            color: colors.primary,
                          }}
                        >
                          Next
                        </Text>
                        <Icon
                          name="arrow-right"
                          solid
                          size={16}
                          color={colors.primary}
                        />
                      </View>
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
          </Modal>
        </View>
        {/* Close Modal Greeting Chairman  */}

        {/* Modal Show Image Greeting Chairman  */}
        <View>
          <Modal
            // style={{margin: 10, padding: 10}}
            isVisible={modalShowImage}
            onBackdropPress={() => setmodalShowImage(false)}
          >
            <View>
              {/* Button close X  */}
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    // marginTop: 10,
                    justifyContent: "space-between",
                    flex: 1,
                  }}
                ></View>
                <View
                  style={{
                    // marginTop: 10,
                    justifyContent: "space-between",
                    // marginRight: 10,
                  }}
                >
                  <Pressable onPress={() => setmodalShowImage(false)}>
                    <View style={{ height: 25 }}>
                      <Icon name={"times"} size={20} color={"white"}></Icon>
                    </View>
                  </Pressable>
                </View>
              </View>
              <View
                style={{
                  // flex: 1,
                  // position: 'absolute',
                  // left: 0,
                  height: "90%",
                  // width: Dimensions.get('window').width,
                  width: "100%",
                  backgroundColor: BaseColor.whiteColor,
                  borderRadius: 30,
                }}
              >
                <ImageZoom
                  cropWidth={320}
                  cropHeight={570}
                  // cropWidth={100}
                  // cropHeight={100}
                  // imageWidth={325.5}
                  // imageHeight={360}
                  imageWidth={360}
                  imageHeight={360}
                >
                  <Image
                    // key={key}
                    style={{
                      width: "100%",
                      height: "100%",
                      marginLeft: 5,
                    }}
                    resizeMode="contain"
                    // resizeMode="stretch"
                    // resizeMode="cover"
                    // resizeMode="center"
                    source={{ uri: urlImageGreetings }}
                  />
                </ImageZoom>
              </View>
            </View>
          </Modal>
        </View>
        {/* Modal Show Image Greeting Chairman  */}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, color: "white" }}>
      <SafeAreaView
        style={[
          BaseStyle.safeAreaView,
          {
            //backgroundColor: "black",
            color: "white",
          },
        ]}
        edges={["right", "top", "left"]}
      >
        {renderContent()}
      </SafeAreaView>
    </View>
  );
};

export default Home;
