import {Icon, SafeAreaView, Text} from '@/components';
import {BaseColor, BaseStyle, useTheme, useFont} from '@/config';
import {PostListData} from '@/data';
import React, {useEffect, useState, useRef, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
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
  AppState,
  TouchableOpacity,
} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import {useSelector, useDispatch} from 'react-redux';
import getUser from '../../selectors/UserSelectors';
import styles from './styles';
import Categories from './Categories';
import SliderNews from './SliderNews';
import axios from 'axios';
import * as Utils from '@/utils';

import {
  data_project,
  data_unit,
  choosed_unit,
  choosed_project,
  action_helpdesk_dot,
  action_project_dot,
  action_data_notification,
  action_data_notification_persist,
} from '../../actions/ProjectActions';

import LinearGradient from 'react-native-linear-gradient';
import ModalSelector from 'react-native-modal-selector';

import MasonryList from '@react-native-seoul/masonry-list';
import {ActivityIndicator} from 'react-native-paper';

import Modal from 'react-native-modal';

import {fontPixel, pixelSizeVertical} from './normalize';

import {API_URL_LOKAL} from '@env';
import httpClient from '../../controllers/HttpClient';
import ProjectController from '../../controllers/ProjectController';
import {store, persist} from '../../reducers';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
const {width} = Dimensions.get('window');
import {check_version} from './functions';
import {useCustomTriggerOnFocus} from '../function/funcFocusEffect';
import {useFocusEffect} from '@react-navigation/native';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Home = props => {
  const stateStore = store.getState();
  const {navigation, route} = props;
  const {t} = useTranslation();
  const {colors} = useTheme();
  const font = useFont();
  const [homeMenu, setHomeMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingImg, setLoadingImg] = useState(true);
  const [appState, setAppState] = useState(AppState.currentState);
  const user = useSelector(state => getUser(state));
  const stateRedux = useSelector(state => state.user);
  const stateReduxDataProject = useSelector(
    state => state.Dataproject.Dataproject,
  );
  const stateReduxDataUnit = useSelector(
    state => state.Dataproject.dataUnit, //.Dataproject.Dataproject
  );
  const stateReduxChoosedUnit = useSelector(
    state => state.Dataproject.choosedUnit,
  );
  const stateReduxChoosedProject = useSelector(
    state => state.Dataproject.chooseProject,
  );
  const stateReduxHelpdeskDot = useSelector(
    state => state.Dataproject.helpdesk_dot,
  );
  const stateReduxProjectDot = useSelector(
    state => state.Dataproject.project_dot,
  );
  const stateReduxNotificationData = useSelector(
    state => state.Dataproject.notificationData,
  );

  const [token, setToken] = useState(stateRedux.accessToken);

  const [email, setEmail] = useState(user != null ? user?.email : '');

  const [fotoprofil, setFotoProfil] = useState(
    user?.pict != null
      ? {uri: user?.pict}
      : require('../../assets/images/image-home/Main_Image.png'),
  );
  const scrollY = useRef(new Animated.Value(0)).current;
  const [getDataDue, setDataDue] = useState([]);
  const [getDataNotDue, setDataNotDue] = useState([]);
  const [projectListUseState, setProjectListUseState] = useState([]);

  const repl =
    user?.pict != null
      ? fotoprofil.uri //.replace("https", "http")
      : require('../../assets/images/image-home/Main_Image.png');

  const [text_lotno, setTextLotno] = useState(stateReduxChoosedUnit);
  const [text_project, setTextProject] = useState(stateReduxChoosedProject);
  const [isChooseProject, setIsChooseProject] = useState(false);

  const [newsannounce, setNewsAnnounce] = useState([]);
  const [newsannounceslice, setNewsAnnounceSlice] = useState([]);
  const [loadNewsAnnounce, setLoadNews] = useState(true);

  const [promoclubfac, setPromoClubFac] = useState([]);
  const [promoclubfacslice, setPromoClubFacSlice] = useState([]);
  const [imagePromoClubFac, setImagePromoClubFac] = useState([]);

  const [eventresto, setEventRestaurant] = useState([]);
  const [eventrestoslice, setEventRestaurantSlice] = useState([]);
  const [imageEventResto, setImageEventResto] = useState([]);

  const [modalImage, setModalImage] = useState(false);
  const [imageGreetings, setImageGreetings] = useState([]);
  const [modalShowImage, setmodalShowImage] = useState(false);
  const [urlImageGreetings, setUrlGreetingsImage] = useState('');
  const [dotList, setDotList] = useState([]);
  const [dotChooseUnit, setDotChooseUnit] = useState(false);
  const [claimUnit, setClaimUnit] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      let intervalIdNotif;
      intervalIdNotif = setInterval(() => {
        projectDot();
        getProjectList();
        if (text_project) {
          if (Object.keys(text_project).length !== 0) {
            loadUnitReact(text_project);
            dataNewsAnnounce(text_project);
            dataPromoClubFacilities(text_project);
          }
        }
      }, 15000); // Update every 1000 milliseconds (1 second)

      return () => clearInterval(intervalIdNotif);
    }, [text_project]),
  );

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

  const [urlImageHeader, setUrlImageHeader] = useState([
    {
      img_url: 'null',
    },
  ]);

  const [refreshing, setRefreshing] = useState(false);
  const [dataDD, setDataDD] = useState([]);

  const dispatch = useDispatch();

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

  useEffect(() => {
    if (stateReduxNotificationData) {
      setDotList(stateReduxNotificationData);

      if (
        stateReduxNotificationData.some(
          obj =>
            obj?.entity_cd === text_project?.entity_cd &&
            obj?.project_no === text_project?.project_no &&
            obj?.lot_no === stateReduxChoosedUnit?.lot_no,
        )
      ) {
      } else {
        saveHelpdeskDotNotification(false);
      }

      if (
        stateReduxNotificationData.some(
          obj =>
            obj?.entity_cd === text_project?.entity_cd &&
            obj?.project_no === text_project?.project_no,
        )
      ) {
      } else {
        setDotChooseUnit(false);
      }
    }
  }, [stateReduxNotificationData]);

  useEffect(() => {
    setFotoProfil({uri: user?.pict});
  }, [user]);

  useEffect(() => {
    onChangelot(stateReduxChoosedUnit, true);
    console.log('410 stateReduxChoosedUnit: ', stateReduxChoosedUnit);
  }, [stateReduxChoosedUnit]);

  //UE4
  useEffect(() => {
    setLoading(true);

    setFotoProfil({uri: user?.pict});

    loadData();
    check_version();

    setLoading(false);
  }, []);

  const loadUnitReact = item => {
    dispatch(data_unit(item.entity_cd, item.project_no, email)).then(() => {
      // alert("load unit react");
    });
  };

  const loadData = async () => {
    await loadDataClaimUnit();
    await doSomething();

    console.log('460 run1 :', text_project);
    if (text_project) {
      console.log('460 run2');
      loadUnitReact(text_project);
    }

    await dataMobileHeader();

    // await firstLogin();

    await getProjectList();

    //loadProject(dataproject);

    //news and promo
    await dataNewsAnnounce();
    await dataPromoClubFacilities();

    await projectDot();
  };

  const getProjectList = async () => {
    await httpClient
      .request({
        url: '/home/common-project',
        method: 'GET',
        params: {email: email},
      })
      .then(res => {
        setProjectListUseState(res.data.data);
        dispatch(data_project(res.data.data));
      })
      .catch(error => {
        alert(error);
      });
  };

  //useCustomTriggerOnFocus(loadData, 120000);

  const projectDot = async () => {
    const arrayNotification = await httpClient
      .request({
        url: '/setting/notification',
        method: 'GET',
        params: {email: user.email},
      })
      .then(res => {
        return res.data.data;
      })
      .catch(error => {
        return [];
      });

    const dots = arrayNotification.notifications.filter(
      item => item.isRead === '0',
    );
    console.log('435 notif dots: ', dots);
    saveDataNotification(dots);
    saveDataNotificationPersist(dots);
    await setDotList(dots);
    if (text_project) {
      if (dots.some(obj => obj.entity_cd != text_project.entity_cd)) {
        saveProjectDotNotification(true);
      } else {
        saveProjectDotNotification(false);
      }

      if (
        dots.some(
          obj =>
            obj.entity_cd === text_project.entity_cd &&
            obj.lot_no === stateReduxChoosedUnit.lot_no,
        )
      ) {
        saveHelpdeskDotNotification(true);
      } else {
        saveHelpdeskDotNotification(false);
      }
    }
  };

  // const firstLogin = async () => {
  //   await httpClient
  //     .request({
  //       // url: "/home/menu",
  //       method: "GET",
  //       params: { group_cd: user.Group_Cd },
  //     })
  //     .then((res) => {
  //       //console.log("249 res: ", res.data.data);

  //       const firstLogin = res.data.data;
  //       if (firstLogin) {
  //         navigation.navigate("ChangePassword", null);
  //       }
  //     })
  //     .catch((error) => {
  //       //console.log("249 error: " + error.response.data.message);
  //     });

  //   //ChangePassword;
  // };

  const loadDataClaimUnit = async () => {
    const dataParams = {
      email: user.email,
    };
    await httpClient
      .request({
        url: 'auth/get-approval',
        method: 'GET',
        params: dataParams,
      })
      .then(res => {
        setClaimUnit(true);
      })
      .catch(e => {
        setClaimUnit(false);
      });
  };

  const loadProject = useCallback(dataproject =>
    dispatch(data_project(dataproject)),
  );

  const saveUnit = useCallback(unit => dispatch(choosed_unit(unit)));
  const saveProject = useCallback(project =>
    dispatch(choosed_project(project)),
  );
  const saveHelpdeskDotNotification = useCallback(state =>
    dispatch(action_helpdesk_dot(state)),
  );
  const saveProjectDotNotification = useCallback(state =>
    dispatch(action_project_dot(state)),
  );
  const saveDataNotification = useCallback(state =>
    dispatch(action_data_notification(state)),
  );
  const saveDataNotificationPersist = useCallback(state =>
    dispatch(action_data_notification_persist(state)),
  );

  const doSomething = async () => {
    await httpClient
      .request({
        url: '/home/menu',
        method: 'GET',
        params: {group_cd: user.Group_Cd},
      })
      .then(res => {
        setHomeMenu(res.data.data);
      })
      .catch(error => {});
  };

  const pressChairmanMessage = async () => {
    //sementara ditutup dulu prosesnya update status dan tanggalnya
    // setModalImage(false);

    await axios
      .post(API_URL_LOKAL + `/home/greetings-change-status/` + email)
      .then(res => {
        //console.log("res update tanggal greetings", res.data.data);
        // //console.log('status user new old', status_user);
        setModalImage(false);
        setLoadNews(false);
        // return res.data;
      })
      .catch(error => {
        //console.log("error update tanggal greetings", error);
        // alert('error get');
      });

    //setelah itu jalanin disini update data status jadi Old dan tanggal first_logindate today where email
  };

  const previewZoomGreeting = item => {
    // navigation.navigate('PreviewImageHome', {images: item});
    // navigation.navigate('PinchZoom');
    setUrlGreetingsImage(item);
    setmodalShowImage(true);
  };

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
        url: '/home/news',
        method: 'GET',
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
        url: '/home/promo',
        method: 'GET',
        params: params,
      })
      .then(res => {
        //console.log("445 res promoclubfacilities", res.data.data);
        const datapromoclub = res.data.data;

        //console.log("445 1run");
        // filter by category

        const filterForPromo = datapromoclub
          .filter(item => item.category === 'P')
          .map(items => items);

        const filterForClubFacilities = datapromoclub
          .filter(item => item.category === 'CF')
          .map(items => items);

        const filterForEvent = datapromoclub
          .filter(item => item.category == 'E')
          .map(items => items);

        const filterForRestaurant = datapromoclub
          .filter(item => item.category == 'R')
          .map(items => items);

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
          },
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
      .catch(error => {
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
        url: '/home/common-mobile-header',
        method: 'GET',
      })
      .then(res => {
        //console.log("848 header: ", res.data.data);
        //const datapromoclub = res.data.data;

        if (res.data.success == true) {
          setUrlImageHeader(res.data.data);
        } else {
          //setUrlImageHeader(dataImageHeader);
        }
      })
      .catch(error => {
        //console.log("848 error header: ", error);
        //setUrlImageHeader(dataImageHeader);
      });
  };

  //TOTAL DATE DUE
  const sum =
    getDataDue == 0
      ? 0
      : getDataDue.reduceRight((max, bills) => {
          return (max += parseInt(bills.mbal_amt));
        }, 0);

  //TOTAL DATE NOT DUE
  const sumNotDue =
    getDataNotDue == 0 || getDataNotDue == null
      ? 0
      : getDataNotDue.reduceRight((max, bills) => {
          return (max += parseInt(bills.mbal_amt));
        }, 0);

  const math_total = Math.floor(sumNotDue) + Math.floor(sum);

  //LENGTH
  const onSelect = indexSelected => {};

  const unique =
    getDataDue == 0 ? 0 : [...new Set(getDataDue.map(item => item.doc_no))];

  const uniqueNotDue =
    getDataNotDue == 0 || getDataNotDue == null
      ? 0
      : [...new Set(getDataNotDue.map(item => item.doc_no))];

  const invoice = unique == 0 ? 0 : unique.length;

  const invoiceNotDue = uniqueNotDue == 0 ? 0 : uniqueNotDue.length;

  const onChangelot = (lot, fromUseEffectState = false) => {
    //setDefaultLotno(false);

    fromUseEffectState ? null : saveUnit(lot);

    setTextLotno(lot);

    //dot choose unit
    if (
      dotList
        .filter(
          item =>
            item?.entity_cd === stateReduxChoosedProject?.entity_cd &&
            item?.project_no === stateReduxChoosedProject?.project_no,
        )
        .some(obj => obj?.lot_no != lot?.lot_no)
    ) {
      setDotChooseUnit(true);
    } else {
      setDotChooseUnit(false);
    }

    //dot helpdesk
    if (
      dotList.some(
        obj =>
          obj?.entity_cd === text_project?.entity_cd &&
          obj?.lot_no === lot?.lot_no,
      )
    ) {
      saveHelpdeskDotNotification(true);
    } else {
      saveHelpdeskDotNotification(false);
    }
  };

  const onChangeProject = project => {
    saveProject(project);

    setTextProject(project);

    loadUnitReact(project);
    setTextLotno('');

    saveUnit({});

    //news and promo
    dataNewsAnnounce(project);
    dataPromoClubFacilities(project);

    //dot management
    // console.log(
    //   '861 dotList.some: ',
    //   dotList.some(obj => obj.entity_cd != project.entity_cd),
    // );
    if (
      dotList.some(obj => obj.entity_cd != project.entity_cd)
      //|| dotList?.length > 1
    ) {
      saveProjectDotNotification(true);
    } else {
      saveProjectDotNotification(false);
    }
    saveHelpdeskDotNotification(false);
  };

  const goToMoreNewsAnnounce = item => {
    navigation.navigate('NewsAnnounce', {items: item});
  };

  const goToEventResto = item => {
    navigation.navigate('EventResto', {items: item});
  };

  const goToPromoClubFac = item => {
    navigation.navigate('ClubFacilities', {items: item});
  };

  const renderOption = item => (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: 'black',
        }}>
        {item.descs}
      </Text>
      {dotList.some(obj => obj.entity_cd === item.entity_cd) && (
        <View
          style={{
            width: 10,
            height: 10,
            backgroundColor: 'red',
            borderRadius: 5,
            marginLeft: 10,
            position: 'absolute',
            right: -20,
          }}
        />
      )}
    </View>
  );

  const renderOptionUnit = item => (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: 'black',
        }}>
        {item.lot_no}
      </Text>
      {dotList.some(
        obj =>
          obj.lot_no === item.lot_no &&
          obj.entity_cd === stateReduxChoosedProject.entity_cd &&
          obj.project_no === stateReduxChoosedProject.project_no,
      ) && (
        <View
          style={{
            width: 10,
            height: 10,
            backgroundColor: 'red',
            borderRadius: 5,
            marginLeft: 10,
            position: 'absolute',
            right: -20,
          }}
        />
      )}
    </View>
  );

  const [activeIndex, setActiveIndex] = useState(0);

  const renderItemCarousel_ = ({item}) => {
    return (
      <View style={[{width, justifyContent: 'center'}]}>
        <ImageBackground
          source={{uri: item.img_url}}
          style={{
            height: 400,
            width: '100%',
            flex: 1,
            backgroundColor: 'lightgray',
          }}
          imageStyle={
            {
              //height: 400,
              //width: "100%",
              // borderBottomLeftRadius: 175,
              // borderBottomRightRadius: 175,
            }
          }></ImageBackground>
      </View>
    );
  };

  const CardItem = ({i, item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('PreviewImageHome', {
            images: item?.pict,
            title: item?.title,
          })
        }>
        <View key={i} style={([styles.shadow], {})}>
          <Image
            source={{uri: item?.pict}}
            style={
              ([styles.shadow],
              {
                height: i % 2 ? 300 : 200,
                width: 200,
                margin: 5,
                borderRadius: 10,
                alignSelf: 'stretch',
                backgroundColor: 'lightgray',
              })
            }
            resizeMode={'cover'}></Image>
        </View>
      </TouchableOpacity>
    );
  };

  const renderContent = () => {
    const mainNews = PostListData[0];

    return (
      <View
        style={[BaseStyle.safeAreaView, {backgroundColor: colors.background}]}
        edges={['right', 'top', 'left']}>
        {user == null || user == '' ? <Text>data user dihome null</Text> : null}

        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {/* IMAGE HEADER SWIPER  */}
          <View style={{flex: 1}}>
            <SwiperFlatList
              autoplay
              autoplayDelay={10}
              autoplayLoop
              index={0}
              showPagination
              autoplayLoopKeepAnimation
              data={urlImageHeader}
              renderItem={renderItemCarousel_}
            />
            <LinearGradient
              colors={['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.3)']}
              style={{
                height: 400,
                width: '100%',
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'absolute',
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  flex: 1,
                  justifyContent: 'center',
                  top: 30,
                }}>
                {/* ------- TEXT WELCOME HOME ------- */}
                <View style={{alignItems: 'center', top: 10}}>
                  <Image
                    style={{
                      height: 140,
                      width: '80%',
                      resizeMode: 'contain',
                    }}
                    source={require('../../assets/images/image-home/logo-tanrise-white.png')}></Image>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    width: '80%',
                    marginTop: 50,
                  }}>
                  <Text
                    style={{
                      fontSize: 25,
                      color: 'white',
                      fontFamily: font, //"DMSerifDisplay",
                      lineHeight: 30,
                      textAlign: 'center',
                    }}>
                    Welcome
                    {'\n'}
                    {user?.name}
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              marginBottom: 10,
              justifyContent: 'center',
            }}>
            <View
              style={{
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
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
                    backgroundColor: colors.primaryLight,
                  }}
                  source={
                    user?.pict != null ? {uri: repl} : fotoprofil
                  }></Image>
                <Text
                  style={{
                    fontSize: fontPixel(18),
                    paddingVertical: pixelSizeVertical(10),
                    fontFamily: font, //"DMSerifDisplay",
                  }}>
                  {/* Nama pemilik */}
                  {user?.name}
                </Text>
                <Icon
                  name="star"
                  solid
                  size={18}
                  color={colors.primary}
                  style={{marginHorizontal: 5}}
                />
              </View>
              {projectListUseState.length != 0 ? (
                <View
                  style={{
                    backgroundColor: colors.primary, //"#315447",
                    height: 35,
                    width: 350,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    alignContent: 'center',
                    justifyContent: 'center',
                    marginVertical: 15,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <ModalSelector
                      style={{
                        justifyContent: 'center',
                        alignSelf: 'center',
                        flex: 1,
                      }}
                      childrenContainerStyle={{
                        color: '#CDB04A',
                        alignSelf: 'center',
                        fontSize: 16,
                        justifyContent: 'center',
                        fontWeight: '800',
                        fontFamily: 'KaiseiHarunoUmi',
                        flexDirection: 'row',
                      }}
                      data={projectListUseState.map(item => ({
                        ...item,
                        label: renderOption(item),
                      }))}
                      optionTextStyle={{color: '#333'}}
                      selectedItemTextStyle={{color: '#3C85F1'}}
                      accessible={true}
                      keyExtractor={item => item}
                      cancelButtonAccessibilityLabel={'Cancel Button'}
                      cancelText={'Cancel'}
                      onChange={option => {
                        onChangeProject(option);
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 1,
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          adjustsFontSizeToFit={true}
                          style={{
                            color: '#fff',
                            alignSelf: 'center',
                            fontSize: 14,
                            justifyContent: 'center',
                            fontWeight: '800',
                            fontFamily: font, //"KaiseiHarunoUmi",
                          }}>
                          {text_project ? '' : 'Choose Project'}
                        </Text>
                        <Text
                          style={{
                            color: '#CDB04A',
                            alignSelf: 'center',
                            fontSize: 16,
                            justifyContent: 'center',
                            fontWeight: '800',
                            fontFamily: font, //"KaiseiHarunoUmi",
                          }}>
                          {text_project?.project_descs}
                        </Text>
                        <Icon
                          name="caret-down"
                          solid
                          size={26}
                          style={{marginLeft: 5}}
                          color={'#CDB04A'}
                        />
                      </View>
                    </ModalSelector>
                    {stateReduxProjectDot ? (
                      <View
                        style={{
                          borderWidth: 1,
                          borderColor: BaseColor.whiteColor,
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: 20,
                          height: 35,
                          backgroundColor: 'red',
                          position: 'absolute',
                          top: -10,
                          right: -15,
                          borderRadius: 10,
                        }}></View>
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
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 20,
                    marginBottom: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingLeft: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        alignSelf: 'center',
                        fontSize: 16,
                        justifyContent: 'center',
                        paddingRight: 5,

                        fontWeight: '600',
                        fontFamily: font, //"KaiseiHarunoUmi",
                        textAlign: 'center',
                      }}
                      numberOfLines={2}>
                      Please claim your unit before using this mobile app
                    </Text>

                    {/* {
                      <ModalSelector
                        style={{
                          justifyContent: "center",
                          alignSelf: "center",
                        }}
                        childrenContainerStyle={{
                          color: "#CDB04A",
                          alignSelf: "center",
                          fontSize: 16,
                          justifyContent: "center",
                          fontWeight: "800",
                          fontFamily: "KaiseiHarunoUmi",
                        }}
                        //data={lotno}
                        optionTextStyle={{ color: "#333" }}
                        selectedItemTextStyle={{ color: "#3C85F1" }}
                        accessible={true}
                        keyExtractor={(item) => item.lot_no}
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

                            justifyContent: "center",
                            fontWeight: "800",
                            fontFamily: "KaiseiHarunoUmi",
                          }}
                        ></Text>
                      </ModalSelector>
                    } */}
                  </View>
                </View>
              )}
              {projectListUseState.length != 0 ? (
                stateReduxDataUnit.length != 0 ? (
                  <View
                    style={{
                      backgroundColor: colors.primary, //"#315447",
                      height: 35,
                      width: 180,
                      justifyContent: 'center',
                      paddingHorizontal: 10,
                      borderRadius: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingLeft: 0,
                      }}>
                      <ModalSelector
                        disabled={isChooseProject}
                        style={{
                          justifyContent: 'center',
                          alignSelf: 'center',
                          flex: 1,
                        }}
                        childrenContainerStyle={{
                          color: '#CDB04A',
                          alignSelf: 'center',
                          fontSize: 16,
                          justifyContent: 'center',
                          fontWeight: '800',
                          fontFamily: 'KaiseiHarunoUmi',
                          flexDirection: 'row',
                        }}
                        data={stateReduxDataUnit}
                        optionTextStyle={{color: '#333'}}
                        selectedItemTextStyle={{color: '#3C85F1'}}
                        accessible={true}
                        keyExtractor={item => item.lot_no}
                        labelExtractor={item => renderOptionUnit(item)} //khusus untuk lotno
                        cancelButtonAccessibilityLabel={'Cancel Button'}
                        cancelText={'Cancel'}
                        onChange={option => {
                          onChangelot(option);
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            justifyContent: 'space-between',
                            paddingRight: 10,
                          }}>
                          <Text
                            adjustsFontSizeToFit={true}
                            style={{
                              color: '#fff',
                              alignSelf: 'center',
                              fontSize: 14,
                              justifyContent: 'center',
                              paddingRight: 10,

                              fontWeight: '800',
                              fontFamily: font, //"KaiseiHarunoUmi",
                            }}>
                            {text_lotno?.lot_no ? 'Unit' : 'Choose Unit'}
                          </Text>
                          <Text
                            style={{
                              color: '#CDB04A',
                              alignSelf: 'center',
                              fontSize: 16,
                              justifyContent: 'center',
                              fontWeight: '800',
                              fontFamily: font, //"KaiseiHarunoUmi",
                            }}>
                            {text_lotno?.lot_no}
                          </Text>
                          <Icon
                            name="caret-down"
                            solid
                            size={26}
                            style={{marginLeft: 5}}
                            color={'#CDB04A'}
                          />
                        </View>
                      </ModalSelector>
                      {dotChooseUnit ? (
                        <View
                          style={{
                            borderWidth: 1,
                            borderColor: BaseColor.whiteColor,
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            width: 20,
                            height: 35,
                            backgroundColor: 'red',
                            top: -10,
                            right: -20,
                            borderRadius: 10,
                          }}></View>
                      ) : null}
                    </View>
                  </View>
                ) : (
                  <View
                    style={{
                      backgroundColor: colors.primary, //"#315447",
                      height: 35,
                      justifyContent: 'center',
                      paddingHorizontal: 10,
                      borderRadius: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingLeft: 5,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                          alignSelf: 'center',
                          fontSize: 14,
                          justifyContent: 'center',
                          paddingRight: 5,

                          fontWeight: '800',
                          fontFamily: font, //"KaiseiHarunoUmi",
                        }}>
                        Unit not found
                      </Text>

                      <ModalSelector
                        style={{
                          justifyContent: 'center',
                          alignSelf: 'center',
                        }}
                        childrenContainerStyle={{
                          color: '#CDB04A',
                          alignSelf: 'center',
                          fontSize: 16,
                          justifyContent: 'center',
                          fontWeight: '800',
                          fontFamily: 'KaiseiHarunoUmi',
                        }}
                        //data={lotno}
                        optionTextStyle={{color: '#333'}}
                        selectedItemTextStyle={{color: '#3C85F1'}}
                        accessible={true}
                        keyExtractor={item => item.lot_no}
                        labelExtractor={item => item.lot_no} //khusus untuk lotno
                        cancelButtonAccessibilityLabel={'Cancel Button'}
                        cancelText={'Cancel'}
                        onChange={option => {
                          onChangelot(option);
                        }}>
                        <Text
                          style={{
                            color: '#CDB04A',
                            alignSelf: 'center',
                            fontSize: 16,
                            justifyContent: 'center',
                            fontWeight: '800',
                            fontFamily: 'KaiseiHarunoUmi',
                          }}></Text>
                      </ModalSelector>
                    </View>
                  </View>
                )
              ) : null}
            </View>
          </View>

          <View style={styles.paddingContent}>
            {user == null || user == '' ? (
              <Text>user not available</Text>
            ) : !loading ? (
              <Categories
                style={{marginTop: 10, fontFamily: font}}
                menu={homeMenu}
                font={font}
                isClaimUnit={claimUnit}
                isOtherMenu={projectListUseState.length != 0}
              />
            ) : (
              <ActivityIndicator />
            )}
          </View>
          <View
            style={{
              marginBottom: 10,
              flex: 1,
              fontFamily: font,
            }}>
            <View
              style={{
                marginHorizontal: 30,
                marginTop: 20,
              }}>
              <View
                style={{
                  borderRadius: 15,
                  borderColor: colors.primary,
                  borderLeftWidth: 0,
                  borderRightWidth: 0,
                  borderBottomWidth: 0,
                }}>
                <Text
                  style={{
                    fontSize: 24,
                    color: colors.text,
                    fontFamily: font, //"DMSerifDisplay",
                  }}>
                  Our Bulletin
                </Text>
                <Text
                  style={{
                    color: colors.text,
                  }}>
                  News
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginRight: 20,
                }}>
                {
                  // newsannounce.length >= 6 ? (
                  false ? (
                    <TouchableOpacity
                      onPress={() => goToMoreNewsAnnounce(newsannounce)}>
                      <View style={{alignSelf: 'center', flexDirection: 'row'}}>
                        <Text style={{marginHorizontal: 5, fontSize: 14}}>
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
                }
              </View>
            </View>
            <View style={{}}>
              {loading ? (
                <ActivityIndicator />
              ) : newsannounce.length != 0 ? (
                <SliderNews data={newsannounce} local={true} />
              ) : (
                <>
                  <Text
                    style={{
                      marginLeft: 30,
                      color: 'gray',
                      marginTop: 20,
                    }}>
                    No news right now
                  </Text>
                </>
              )}
            </View>
          </View>

          <View style={{marginBottom: 20, flex: 1, fontFamily: font}}>
            <View style={{marginLeft: 30, marginTop: 20, marginBottom: 10}}>
              <Text
                style={{
                  fontSize: 24,
                }}>
                This Weekend
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginRight: 20,
                }}>
                <Text>Event and Restaurant</Text>
                {
                  // eventresto.length >= 6 ? (
                  false ? (
                    <TouchableOpacity
                      onPress={() => goToEventResto(eventresto)}>
                      <View style={{alignSelf: 'center', flexDirection: 'row'}}>
                        <Text style={{marginHorizontal: 5, fontSize: 14}}>
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
              }}>
              {loading ? (
                <ActivityIndicator />
              ) : imageEventResto.length != 0 ? (
                <ScrollView horizontal>
                  <MasonryList
                    data={imageEventResto}
                    style={{alignSelf: 'stretch'}}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                    contentContainerStyle={{
                      paddingHorizontal: 10,
                      alignSelf: 'stretch',
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
                      color: 'grey',
                    }}>
                    No event right now
                  </Text>
                </>
              )}
            </View>
          </View>

          <View style={{marginBottom: 20, flex: 1, fontFamily: font}}>
            <View style={{marginLeft: 30, marginTop: 20, marginBottom: 10}}>
              <Text
                style={{
                  fontSize: 24,
                }}>
                Club And Facilities
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginRight: 20,
                }}>
                <Text>Check Our Promo Here</Text>
                {
                  // promoclubfac.length >= 6 ? (
                  false ? (
                    <TouchableOpacity
                      onPress={() => goToPromoClubFac(promoclubfac)}>
                      <View style={{alignSelf: 'center', flexDirection: 'row'}}>
                        <Text style={{marginHorizontal: 5, fontSize: 14}}>
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
            <View style={{marginVertical: 10, marginHorizontal: 10}}>
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
                    renderItem={({item, index}) => (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('PreviewImageHome', {
                            images: item?.pict,
                          })
                        }>
                        <View
                          style={[
                            {
                              width: 250, //Dimensions.get("window").width, // Width of the cropped area
                              height: 450, // Height of the cropped area
                              overflow: 'hidden', // Crops the image to the container
                              position: 'relative',
                              borderRadius: 10,
                              marginRight: 18,
                            },
                            styles.shadow,
                          ]}>
                          <Image
                            source={{
                              uri: item?.pict,
                            }}
                            style={[
                              {
                                height: '100%', // Height of the image
                                position: 'absolute',
                                left: 0, // Start cropping from the left
                              },
                              {width: 450},
                            ]}
                            resizeMode="cover"
                          />
                        </View>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index}
                  />
                </ScrollView>
              ) : (
                <>
                  <Text
                    style={{
                      marginLeft: 20,
                      color: 'grey',
                    }}>
                    No promo right now
                  </Text>
                </>
              )}
            </View>
          </View>
        </ScrollView>
        {/* Close Modal Greeting Chairman  */}
        <View>
          <Modal
            isVisible={modalImage}
            animationType={'slide'}
            style={{height: '100%', padding: 0, margin: 0}}
            onBackdropPress={() => pressChairmanMessage()}>
            <View
              style={{
                height: '90%',
                marginTop: '10%',
              }}>
              {/* Button close X  */}
              <View
                style={{flexDirection: 'row', width: '100%', marginBottom: 5}}>
                <View
                  style={{
                    marginTop: 20,
                    justifyContent: 'space-between',
                    flex: 1,
                  }}></View>
              </View>
              {imageGreetings.map((item, index) => (
                <View
                  style={{
                    height: '70%',
                    width: '100%',
                    backgroundColor: BaseColor.whiteColor,
                    borderRadius: 30,
                  }}
                  key={index}>
                  <ImageBackground
                    source={{
                      uri: item.greetings_file.replace('https', 'http'),
                    }}
                    resizeMode="contain"
                    style={{
                      marginLeft: '5%',
                      width: '95%',
                      flexDirection: 'column',
                      alignContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                    }}></ImageBackground>
                </View>
              ))}
            </View>
            <View
              style={{
                marginBottom: '10%',
                backgroundColor: BaseColor.whiteColor,
                paddingVertical: 20,
              }}>
              {imageGreetings.map((item, index) => (
                <View style={{flexDirection: 'row', width: '100%'}}>
                  <View
                    style={{
                      marginTop: 10,
                      justifyContent: 'space-between',
                      flex: 1,
                    }}>
                    <Pressable
                      onPress={() =>
                        previewZoomGreeting(
                          item.greetings_file.replace('https', 'http'),
                        )
                      }>
                      <View
                        style={{
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}>
                        <Text
                          style={{
                            paddingHorizontal: 10,
                            fontSize: 16,
                            color: colors.primary,
                          }}>
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
                      justifyContent: 'space-between',
                    }}>
                    <Pressable onPress={() => pressChairmanMessage()}>
                      <View
                        style={{
                          alignItems: 'center',
                          marginRight: 20,
                          flexDirection: 'row',
                        }}>
                        <Text
                          style={{
                            paddingHorizontal: 10,
                            fontSize: 16,
                            color: colors.primary,
                          }}>
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
            isVisible={modalShowImage}
            onBackdropPress={() => setmodalShowImage(false)}>
            <View>
              {/* Button close X  */}
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  marginBottom: 10,
                }}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flex: 1,
                  }}></View>
                <View
                  style={{
                    justifyContent: 'space-between',
                  }}>
                  <Pressable onPress={() => setmodalShowImage(false)}>
                    <View style={{height: 25}}>
                      <Icon name={'times'} size={20} color={'white'}></Icon>
                    </View>
                  </Pressable>
                </View>
              </View>
              <View
                style={{
                  height: '90%',
                  width: '100%',
                  backgroundColor: BaseColor.whiteColor,
                  borderRadius: 30,
                }}>
                <ImageZoom
                  cropWidth={320}
                  cropHeight={570}
                  imageWidth={360}
                  imageHeight={360}>
                  <Image
                    style={{
                      width: '100%',
                      height: '100%',
                      marginLeft: 5,
                    }}
                    resizeMode="contain"
                    source={{uri: urlImageGreetings}}
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
    <View style={{flex: 1, color: 'white'}}>
      <SafeAreaView
        style={[
          BaseStyle.safeAreaView,
          {
            color: 'white',
          },
        ]}
        edges={['right', 'top', 'left']}>
        {renderContent()}
      </SafeAreaView>
    </View>
  );
};

export default Home;
