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
  Tag,
} from "@/components";
import { enableExperimental } from "@/utils";
import { BaseColor, BaseStyle, useTheme } from "@/config";
import { CheckBox } from "react-native-elements";

import { useNavigation } from "@react-navigation/native";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  TouchableOpacity,
  View,
  Platform,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import { ProgressBar, MD3Colors, ToggleButton } from "react-native-paper";
// import DatePicker from "react-native-date-picker";
import moment from "moment";
import { useSelector } from "react-redux";
import getUser from "../../selectors/UserSelectors";
import axios from "axios";
import client from "../../controllers/HttpClient";
import styles from "./styles";

//   import {RadioButton} from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseURL as API_URL_LOKAL } from "@/controllers/HttpClient";
export default function SeatBooking(props) {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const [dataTowerUser, setdataTowerUser] = useState([]);
  const [arrDataTowerUser, setArrDataTowerUser] = useState([]);
  const users = useSelector((state) => getUser(state));
  const [email, setEmail] = useState(users.user);
  const [urlApi, seturlApi] = useState(client);

  const [spinner, setSpinner] = useState(true);

  const [dataCategory, setDataCategory] = useState([]);

  const [passPropStorage, setPassPropStorage] = useState();
  const [passProp, setpassProp] = useState(props.route.params);
  const [selected, setSelected] = useState(null);
  const [getBookingTime, setBookingTime] = useState([]);
  const [getBookingSlot, setBookingSlot] = useState([]);
  const [loadingTab, setLoadingTab] = useState(true);
  const [getDataOnClick, setDataOnClick] = useState();
  const [getSlotOnClick, setSlotOnClick] = useState([]);
  const [getHourOnClick, setHourOnClick] = useState([]);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  console.log("dataTowerUser", dataTowerUser);
  console.log("arrDataTowerUser", arrDataTowerUser);
  console.log("passProp", passProp);
  console.log("passPropStorage", passPropStorage);
  const TABS = [
    {
      id: "R",
      title: t("Reguler"),
    },
    {
      id: "O",
      title: t("Overhaul"),
    },
  ];
  const [tab, setTab] = useState(TABS[0]);

  useEffect(() => {
    const id = props?.params?.id;
    if (id) {
      TABS.forEach((tab) => {
        tab.id == id && setTab(tab);
      });
    }
  }, [props?.params?.id]);

  // console.log('passprop kategori help', passProp);

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
        alert("error get");
      });
  };

  const getDataStorage = async () => {
    const value = await AsyncStorage.getItem("@troStorage");
    // const DataTower = await AsyncStorage.getItem('@/dataTower');

    const passPropStorage = JSON.parse(value);

    setPassPropStorage(passPropStorage);
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      getTower(users);
      getDataStorage();
      //func baru
      getTime();

      // getCategoryHelp;
      // setSpinner(false);
    }, 3000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoadingTab(false);
    }, 8000);
  }, []);

  // console.log('dataTowerUserzzz', dataTowerUser.entity_cd); //kalau data berupa object
  // console.log('dataTowerUserzzz', dataTowerUser.project_no);
  // console.log('dataTowerUserzzz utama', dataTowerUser);

  const getTime = async () => {
    const entity = passProp.entity_cd;
    const project = passProp.project_no;
    try {
      await axios
        .get(
          API_URL_LOKAL +
            `/modules/troffice/master-booking-time?entity_cd=${entity}&project_no=${project}`
        )
        .then((res) => {
          const datas = res.data.data;

          //   const uniqueObjArray = [
          //     ...new Map(datas.map((item) => [item["hours"], item])).values(),
          // ];
          let ans = datas.reduce((agg, curr) => {
            console.log("agg", agg);
            let found = agg.find((x) => x.hours === curr.hours);
            if (found) {
              found.subslot.push(curr.subslot);
            } else {
              agg.push({
                hours: curr.hours,
                subslot: [curr.subslot],
                // subslot: [curr.subslot],
              });
            }
            return agg;
          }, []);

          const result = ans.reduce((acc, curr) => {
            console.log("curr >", curr);
            console.log("acc >", acc);
            if (acc[curr.hours] === undefined) acc[curr.hours] = 0;
            curr.subslot.forEach((x) => (acc[curr.hours] += x.length));
            return acc;
          }, {});

          console.log("counters >", result);

          //   const uniqueObjArray = [
          //     ...new Map(ans.map((item) => [item["hours"], item])).values(),
          // ];
          console.log("jam >", ans);
          // setBookingTime(uniqueObjArray);
          setBookingTime(ans);
          // setBookingSlot(ans.subslot);
          getMasterTime(date);
          // setBookingTime(uniqueObjArray);
        });
    } catch (error) {
      console.log("Error from getTime", error);
    }
    // console.log('entity?', ...entity) //untuk pecahin array jadi object pake ...
    // console.log('project?', ...project)
  };

  const getMasterTime = async (props) => {
    const entity = passProp.entity_cd;
    const project = passProp.project_no;
    const dates = moment(props).format("YYYY-MM-DD");
    try {
      await axios
        .get(
          API_URL_LOKAL +
            `/modules/troffice/master-booking-slot?entity_cd=${entity}&project_no=${project}&category_cd=${passProp.category_cd}&type=${tab.id}&req_date=${dates}`
        )
        .then((res) => {
          const datas = res.data.data;
          setBookingSlot(datas);
          console.log("data setbookingslot", datas);
        });
    } catch (error) {
      console.log("Error from getMasterTime", error);
    }
  };

  const handleGetSlot = (data, slot, hours) => {
    setDataOnClick(data);
    setSlotOnClick(slot);
    setHourOnClick(hours);
  };

  // const handleSetRadio = (checked, type) => {
  //   setSpinner(true);
  //   // console.log('dataTowerUser', dataTowerUser);
  //   // console.log('type', type);
  //   // setTypeLocation(type);
  //   if (type === 'P') {
  //     //   console.log('type p');
  //     //   getCategoryHelp();
  //     setTypeLocation('P');
  //     getTower(users);
  //     getCategoryHelp(type);
  //   } else {
  //     setTypeLocation('U');
  //     //   console.log('type u');
  //     getTower(users);
  //     getCategoryHelp(type);
  //     //   getCategoryHelp(type);
  //   }
  // };

  // const getCategoryHelp = async type => {
  //   const params = {
  //     entity: dataTowerUser.entity_cd,
  //     project: dataTowerUser.project_no,

  //   };
  //   console.log('params category', params);

  //   const config = {
  //     headers: {
  //       accept: 'application/json',
  //       'Content-Type': 'application/json',
  //       token: '',
  //     },
  //   };

  //   await axios
  //     .post(
  //       'http://apps.pakubuwono-residence.com/apiwebpbi/api/modules/cs/category-help',
  //       params,
  //       {
  //         config,
  //       },
  //     )
  //     .then(res => {
  //       const datas = res.data;
  //       const dataCategorys = datas.Data;
  //       console.log('data kategori', dataCategorys);

  //       setDataCategory(dataCategorys);
  //       setSpinner(false);
  //       // return res.data;
  //     })
  //     .catch(error => {
  //       console.log('error get tower api', error.response);
  //       alert('error get');
  //     });
  // };

  // const handleClick = async (data, index) => {
  //   console.log('category_grop_cd', data.category_group_cd);
  //   console.log('loc_type', data.location_type);
  //   console.log('passprops', passProp);
  //   const saveParams = {
  //     //   ...passPropStorage,
  //     passProp,
  //     category_group_cd: data.category_group_cd,
  //     location_type: data.location_type,
  //   };
  //   const saveStorage = {
  //     ...passPropStorage,
  //     //   ...passProp,
  //     category_group_cd: data.category_group_cd,
  //     location_type: data.location_type,
  //   };
  //   console.log('urutan kedua props', saveStorage);
  //   console.log('urutan kedua params', saveParams);

  //   const jsonValue = JSON.stringify(saveStorage);
  //   await AsyncStorage.setItem('@helpdeskStorage', jsonValue);

  //   const jsonValueNullLocation = JSON.stringify('');
  //   await AsyncStorage.setItem('@locationStorage', jsonValueNullLocation);

  //   navigation.navigate('SelectCategory', {
  //     // screen: 'Settings',
  //     saveParams,
  //   });
  // };

  //    const onCategoryPress = cat => {
  //        this.setState({isDisabled: true}, () => {
  //          this.goToScreen('screen.SelectCategory', cat);
  //        });
  //      };
  console.log("slot checked : ", getSlotOnClick);
  console.log("slot checked : ", getBookingSlot);
  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={["top", "right", "bottom", "left"]}
    >
      <Header
        title={t("category_tro")} //belum dibuat lang
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

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
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

        <View style={{ marginTop: 30, paddingHorizontal: 10 }}>
          <Text subheadline bold>
            Today
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "space-between",
            borderRadius: 15,
            borderColor: colors.dark,
            borderBottomWidth: 1,
            padding: 10,
            marginBottom: 15,
            marginTop: 10,
          }}
        >
          {/* <DatePicker
            modal
            mode="date"
            open={open}
            date={date}
            onConfirm={(date) => {
              setOpen(false);
              getMasterTime(date);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          /> */}
          <Text>{moment(date).format("DD-MM-YYYY")}</Text>
          <Icon
            name="calendar-week"
            size={20}
            color={colors.primary}
            enableRTL={true}
            onPress={() => setOpen(true)}
          />
        </View>

        <View>
          {tab.id == "R" ? (
            <View style={{ flexDirection: "column" }}>
              {loadingTab ? (
                <View style={{ marginTop: 10 }}>
                  {/* <Spinner visible={this.state.spinner} /> */}
                  {/* <Placeholder style={{marginVertical: 4, paddingHorizontal: 10}}>
                      <PlaceholderLine width={100} noMargin style={{height: 40}} />
                    </Placeholder> */}
                  <ProgressBar
                    progress={1}
                    color={colors.primary}
                    indeterminate={true}
                  />
                </View>
              ) : (
                <View>
                  {getBookingTime.map((data, index) => (
                    <View
                      style={{
                        flexDirection: "row",
                        marginLeft: 10,
                        marginRight: 20,
                        marginTop: 10,
                        justifyContent: "center",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          marginLeft: 10,
                          marginRight: 20,
                          marginTop: 10,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text key={index}>{data.hours}</Text>
                      </View>

                      {data.hours > "10:30:00"
                        ? data.subslot.map((slot, key) =>
                            getBookingSlot.map((slottime, slotkey) => (
                              <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity
                                  key={key}
                                  style={{
                                    backgroundColor:
                                      slottime.subslot == getSlotOnClick ||
                                      slottime.hours == getHourOnClick
                                        ? "tomato"
                                        : "cyan",

                                    padding: 50,
                                    margin: 10,
                                    justifyContent: "center",
                                  }}
                                  onPress={() =>
                                    // alert(data.subslot)
                                    data.hours == slottime.hours &&
                                    slottime.subslot == slot
                                      ? alert("Cannot Click")
                                      : handleGetSlot(data, slot, data.hours)
                                  }
                                >
                                  <Text>Slot {slot}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                  style={{
                                    backgroundColor: "cyan",
                                    padding: 25,
                                    margin: 10,
                                    justifyContent: "center",
                                  }}
                                  disabled
                                >
                                  <Text>Not Available</Text>
                                </TouchableOpacity>
                              </View>
                            ))
                          )
                        : data.subslot.map((slot, key) =>
                            getBookingSlot.map((slottime, slotkey) => (
                              <View>
                                <TouchableOpacity
                                  key={key}
                                  style={{
                                    backgroundColor: "tomato",
                                    padding: 50,
                                    margin: 10,
                                    justifyContent: "center",
                                  }}
                                  onPress={() =>
                                    data.hours == slottime.hours &&
                                    slottime.subslot == slot
                                      ? alert("Cannot Click")
                                      : handleGetSlot(data, slot, data.hours)
                                  }
                                >
                                  <Text>slot {slot}</Text>
                                </TouchableOpacity>
                              </View>
                            ))
                          )}
                    </View>
                  ))}
                </View>
              )}
            </View>
          ) : (
            <Text>Ini Overhaul</Text>
          )}
        </View>
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          width: "100%",
          height: "15%",
          borderWidth: 1,
          borderStyle: "solid",
          borderTopEndRadius: 15,
          borderTopLeftRadius: 15,
          justifyContent: "center",
          // flex: 1,
        }}
      >
        <View
          style={{
            alignItems: "center",
            borderRightWidth: 2,
            borderRightColor: colors.primary,
          }}
        >
          <View
            style={{
              marginBottom: 20,
              marginLeft: "15%",
              marginRight: "15%",
              marginTop: 10,
              borderStyle: "solid",
              borderWidth: 1,
            }}
          >
            <Text>Choosed Slot</Text>
          </View>
          {/* {getSlotOnClick.map((data, index) => (
                  <Text>{data}</Text>
                ))}  */}
          <Text></Text>
          <Text>
            Slot {getSlotOnClick}, Hours {getHourOnClick}
          </Text>
        </View>
        {/* <Button
                  medium
                  outline
                  style={{
                    marginTop: 10,
                    marginBottom: 20,
                    marginHorizontal: 5,
                    backgroundColor: '#fff',
                    flex: 1,
                  }}
                  onPress={() => {
                    // goBackFacility();
                  }}>
                  <Text style={{color: colors.primary}}>
                    {' '}
                    {t('Back To Schedule')}
                  </Text>
                </Button> */}

        <Button
          medium
          style={{
            marginTop: 35,
            marginHorizontal: "auto",
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 20,
            flex: 1,
          }}
          onPress={() => {
            bookFacility();
          }}
        >
          <Text style={{ textAlign: "center" }}>{t("Book Facility")}</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
