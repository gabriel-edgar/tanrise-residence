// import {
//   Text,
//   TextInput,
//   // CheckBox,
//   PlaceholderLine,
//   Placeholder,
//   Button,
//   SafeAreaView,
//   Header,
//   Icon,
// } from "@/components";
// import { BaseColor, BaseStyle, useTheme } from "@/config";
// import { CheckBox } from "react-native-elements";

// import { useNavigation } from "@react-navigation/native";
// import IconAnt from "react-native-vector-icons/AntDesign";
// import React, { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import {
//   FlatList,
//   TouchableOpacity,
//   View,
//   ScrollView,
//   Alert,
// } from "react-native";
// import moment from "moment";
// import Modal from "react-native-modal";
// import "moment/locale/id";

// import { useSelector } from "react-redux";
// import getUser from "../../../selectors/UserSelectors";
// import axios from "axios";
// import client from "../../../controllers/HttpClient";
// import styles from "../styles";

// import ModalDropdown_debtor from "@/components/ModalDropdown_debtor";
// import ModalDropdown_lotno from "@/components/ModalDropdown_lotno";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import numFormattanpaRupiah from "../../../components/numFormattanpaRupiah";
// import { ActivityIndicator, Divider } from "react-native-paper";
// import RadioForm, {
//   RadioButton,
//   RadioButtonInput,
//   RadioButtonLabel,
// } from "react-native-simple-radio-button";
// import { lightGreen100 } from "react-native-paper/lib/typescript/styles/colors";
// import { baseURL as API_URL_LOKAL } from '@/controllers/HttpClient';
// export default function PriceList(props) {
//   const { t, i18n } = useTranslation();
//   const { colors } = useTheme();
//   const [keyword, setKeyword] = useState("");
//   const [loading, setLoading] = useState(true);
//   const navigation = useNavigation();
//   console.log("propzzz", props);
//   console.log("pecah data props", props.route.params);
//   const [dataCategory, setDataCategory] = useState(props.route.params);
//   // const [indexCategory, setIndexCategory] = useState(props.route.params.index);

//   const [dataTowerUser, setdataTowerUser] = useState([]);
//   const [arrDataTowerUser, setArrDataTowerUser] = useState([]);
//   const users = useSelector((state) => getUser(state));
//   const [email, setEmail] = useState(users.user);

//   const [urlApi, seturlApi] = useState(client);
//   const [checkedEntity, setCheckedEntity] = useState(false);
//   const [dataDebtor, setDataDebtor] = useState([]);
//   const [entity, setEntity] = useState("");
//   const [project_no, setProjectNo] = useState("");
//   const [db_profile, setDb_Profile] = useState("");
//   const [spinner, setSpinner] = useState(true);

//   const [debtor, setDebtor] = useState("");
//   const [textDebtor, settextDebtor] = useState("");
//   const [textNameDebtor, settextNameDebtor] = useState("");
//   const [dataLotno, setDataLotno] = useState([]);
//   const [textLot, setLotno] = useState("");
//   const [textSlot, setSlot] = useState("");
//   const [zoneCode, setZone] = useState("");
//   const [reportName, setreportName] = useState(users.name);
//   const [contactNo, setcontactNo] = useState("");
//   const [requiredText, setrequiredText] = useState(false);
//   const [textFloor, settextFloor] = useState("");
//   const [isDisabled, setDisabled] = useState(false);
//   const [tenant_no, setTenantNo] = useState("");

//   const [defaulTower, setDefaultTower] = useState(false);
//   const [defaultDebtor, setDefaultDebtor] = useState(false);
//   const [defaultLotNo, setDefaultLotNo] = useState(false);
//   const [workRequested, setworkRequested] = useState("");

//   const [date, setDate] = useState(new Date());
//   const [open, setOpen] = useState(false);
//   const [time, setTime] = useState({});
//   const [value, setValue] = useState([]);

//   const [valueTerms, setValueTerms] = useState("");
//   const [checkedTerms, setCheckedTerms] = useState(false);
//   const [click, setClick] = useState(true);
//   const [message, setMessage] = useState("");
//   const [statusResult, setStatus] = useState("");
//   const [reportNo, setReport] = useState("");
//   const [modalSuccessVisible, showModalSuccess] = useState(false);
//   const [radioGet, setRadio] = useState({
//     regular: "",
//     // onceaweek: '',
//     // twiceaweek: '',
//     // thriceaweek: '',
//     // disinfectant: '',
//   });
//   console.log("value >", value);
//   const VATIn = (11 / 100) * value.value;
//   const totalCost = parseInt(value.value) + parseInt(VATIn);
//   const formNanPrice = parseInt(value.value) || 0;
//   const formNanVAT = parseInt(VATIn) || 0;
//   const formNanTotal = parseInt(totalCost) || 0;
//   const terms = [{ value: 1 }];
//   const onPressTitle = () => {
//     setClick(!click);
//     // navigation.navigate('TermsCondition');
//   };
//   const radio_props = [
//     {
//       label: `Regular 1x Request \nIDR ${numFormattanpaRupiah(
//         radioGet.regular
//       )}`,
//       value: radioGet.regular,
//     },
//   ];

//   const tomorrow = new Date();
//   moment.locale("id");
//   // const format = moment(tomorrow).add(1, 'days').format('DD-MM-YYYY');
//   const format = moment(tomorrow).add(1, "days").format("YYYY-MM-DD");

//   console.log("TESTING MOMENT");
//   console.log("tomorrow >", format);

//   //-----FOR GET ENTITY & PROJJECT
//   const getTower = async () => {
//     const data = {
//       email: email,
//       //   email: 'haniyya.ulfah@ifca.co.id',
//       app: "O",
//     };

//     const config = {
//       headers: {
//         accept: "application/json",
//         "Content-Type": "application/json",
//         // token: "",
//       },
//     };

//     await axios
//       .get(
//         // `http://apps.pakubuwono-residence.com/apisysadmin/api/getProject/${data.email}`,
//         API_URL_LOKAL + `/home/common-project/mysql/${data.email}/${data.app}`,
//         {
//           config,
//         }
//       )
//       .then((res) => {
//         const datas = res.data;

//         const arrDataTower = datas.Data;
//         console.log("data tower ada berapa", arrDataTower.length);

//         // arrDataTower.length > 1
//         if (arrDataTower.length > 1) {
//           setDefaultTower(false);
//         } else {
//           setDefaultTower(true);
//           setCheckedEntity(true);
//           setEntity(arrDataTower[0].entity_cd);
//           setProjectNo(arrDataTower[0].project_no);
//           setDb_Profile(arrDataTower[0].db_profile);
//           const params = {
//             entity_cd: arrDataTower[0].entity_cd,
//             project_no: arrDataTower[0].project_no,
//             db_profile: arrDataTower[0].db_profile,
//           };
//           console.log("params for debtor tower default", params);
//           getDebtor(params);
//         }

//         arrDataTower.map((dat) => {
//           if (dat) {
//             setdataTowerUser(dat);
//             // const jsonValue = JSON.stringify(dat);
//             //   setdataFormHelp(saveStorage);
//             // console.log('storage', saveStorage);
//             // dataArr.push(jsonValue);
//           }
//         });
//         // console.log('arrdatatower yang 1 aja default', arrDataTower);
//         setArrDataTowerUser(arrDataTower);

//         setSpinner(false);
//         // let dataArr = {};

//         // return res.data;
//       })
//       .catch((error) => {
//         console.log("error get tower api", error);
//         // alert('error get');
//       });
//   };

//   //-----FOR GET DEBTOR
//   const getDebtor = async (data) => {
//     // console.log(object)
//     console.log("data for debtor", data);

//     const params =
//       "?" +
//       "entity_cd=" +
//       data.entity_cd +
//       "&" +
//       "project_no=" +
//       data.project_no +
//       "&" +
//       "email=" +
//       email;

//     console.log("data for", params);

//     const config = {
//       headers: {
//         accept: "application/json",
//         "Content-Type": "application/json",
//         token: "",
//       },
//     };
//     await axios
//       .post(API_URL_LOKAL + "/modules/cs/debtor" + params, {
//         config,
//       })
//       .then((res) => {
//         // console.log('res', res);
//         const datas = res.data;
//         const dataDebtors = datas.Data;
//         console.log("res debtor", dataDebtors);
//         console.log("ada berapa length debtor", dataDebtors.length);

//         if (dataDebtors.length > 1) {
//           setDefaultDebtor(false);

//           getLot();
//         } else {
//           setDefaultDebtor(true);
//           setDebtor(dataDebtors[0].debtor_acct);
//           setTenantNo(dataDebtors[0].tenant_no);
//           settextDebtor(
//             dataDebtors[0].debtor_acct + " - " + dataDebtors[0].name
//           );
//           settextNameDebtor(dataDebtors[0].name);
//           const params = {
//             entity_cd: data.entity_cd,
//             project_no: data.project_no,
//             tenant_no: dataDebtors[0].tenant_no,
//           };
//           console.log("params for lotno defaultss", params);

//           // setCheckedEntity(true);

//           getLot(params, "");
//           setSpinner(false);
//           // console.log('params for debtor tower default', params);
//           // getDebtor(params);
//         }

//         setDataDebtor(dataDebtors);

//         // return res.data;
//       })
//       .catch((error) => {
//         console.log("error get tower api", error.response);
//         // alert('error get');
//       });
//   };
//   console.log("textLotNo", textLot);
//   console.log("dataLotno", dataLotno);
//   useEffect(() => {
//     setTimeout(() => {
//       setLoading(false);
//       getTower(users);
//       // setSpinner(false);
//     }, 3000);
//     radio_props;
//   }, []);
//   useEffect(() => {
//     axios
//       .get(API_URL_LOKAL + "/home/common-current-time")
//       .then((time) => {
//         // console.log('time from server?', time.data);
//         setTime(time.data);
//       })
//       // .catch(error => console.error(error))
//       .catch((error) => console.error(error.response.data))
//       .finally(() => setLoading(false));
//   }, []);

//   const datatime = {
//     timeget: time.tanggal,
//     daily: time.jam,
//   };

//   const getLot = async () => {
//     console.log("kenapa kamu tidak loading");
//     console.log(
//       "url lotSlot",
//       `http://apps.pakubuwono-residence.com/apiwebpbi/api/modules/troffice/price-pest-control?entity_cd=${dataCategory.entity_cd}&project_no=${dataCategory.project_no}&zone_cd=${dataCategory.zone_cd}&lot_type=${dataCategory.lot_type}`
//     );

//     console.log(
//       "url get prices",
//       `http://apps.pakubuwono-residence.com/apiwebpbi/api/modules/troffice/price-pest-control?entity_cd=${dataCategory.entity_cd}&project_no=${dataCategory.project_no}&zone_cd=${dataCategory.zone_cd}&lot_type=${dataCategory.lot_type}`
//     );

//     await axios
//       .get(
//         API_URL_LOKAL +
//           `/modules/troffice/price-pest-control?entity_cd=${dataCategory.entity_cd}&project_no=${dataCategory.project_no}&zone_cd=${dataCategory.zone_cd}&lot_type=${dataCategory.lot_type}`
//       )
//       .then((res) => {
//         // console.log('datalotno', res);
//         const datas = res.data;

//         const dataPrice = datas.Data;
//         const dataPrices = dataPrice[0].price;
//         console.log("dataPrices >", dataPrices);
//         // const dataOnce = datas.Data.once_week.value;
//         // const dataThrice = datas.Data.thrice_week.value;
//         // const dataTwice = datas.Data.twice_week.value;
//         // const dataDis = datas.Data.disinfectant.value;

//         // const radio = [
//         //   dataLotno.single.value,
//         //   dataLotno.onceaweek.value,
//         //   dataLotno.twiceaweek,
//         //   dataLotno.thriceaweek,
//         //   dataLotno.disinfectant,
//         // ];

//         setRadio({
//           ...radioGet,
//           regular: dataPrices,
//           // onceaweek: dataOnce,
//           // twiceaweek: dataTwice,
//           // thriceaweek: dataThrice,
//           // disinfectant: dataDis,
//         });
//         setSpinner(false);
//       })
//       .catch((error) => {
//         console.log("error get lotno api", error.response);
//         // alert('error get');
//       });
//   };

//   const handleLotChange = (lot, zone, slot) => {
//     console.log("lot", lot);
//     console.log("zones", zone);
//     setSlot(slot);
//     setLotno(lot);
//     setZone(zone);
//     // this.setState({textLot: lot});
//     getFloor(lot);
//   };

//   let labelz = "";
//   if (value.index == 0) {
//     labelz = "single";
//   } else if (value.index == 1) {
//     labelz = "once_week";
//   } else if (value.index == 2) {
//     labelz = "twice_week";
//   } else if (value.index == 3) {
//     labelz = "thrice_week";
//   } else if (value.index == 4) {
//     labelz = "disinfectant";
//   }
//   console.log("labelz", labelz);

//   const handleNavigation = async () => {
//     // try {
//     console.log("textfloor spec help", textFloor);
//     // if (
//     //   (!contactNo && !reportName && textLot.length < 0) ||
//     //   textLot == '' ||
//     //   textLot == null
//     // ) {
//     //   alert('Please Check Field Lot No Entry');
//     // } else {
//     const saveStorage = {
//       contactNo: dataCategory.contactNo,
//       entity_cd: dataCategory.entity_cd,
//       project_no: dataCategory.project_no,
//       dataDebtor: dataCategory.dataDebtor,
//       lot_no: dataCategory.select_lot_no,
//       slot: dataCategory.slot,
//       category_cd: dataCategory.category_cd,
//       zone_cd: dataCategory.zone_cd,
//       base_amt: value.value,
//       tax_amt: VATIn,
//       trx_amt: totalCost,
//       sch_date: dataCategory.sch_date,
//       lot_type: dataCategory.lot_type,
//       reported_by: dataCategory.reportName,
//       valueDesc:
//         "Pest Control" +
//         " " +
//         "( " +
//         moment(dataCategory.sch_date).format("DD MMM YYYY") +
//         " )",
//     };
//     const jsonValue = JSON.stringify(saveStorage);
//     //   setdataFormHelp(saveStorage);
//     console.log("awal mula props", saveStorage);

//     await AsyncStorage.setItem("@troStorage", jsonValue);
//     navigation.navigate("SeatBokingsPest", { saveStorage });
//     // if()
//     // navigation.navigate('SeatBokingsWaterHeater', saveStorage);
//     // navigation.navigate('SeatBooking', saveStorage);
//     // }
//   };
//   const onCloseModal = () => {
//     showModalSuccess(false);
//     navigation.navigate("SpecTrofficeUnitCleaning");
//   };

//   return (
//     <SafeAreaView
//       style={BaseStyle.safeAreaView}
//       edges={["right", "top", "left"]}
//     >
//       <Header
//         title={t("Form")} //belum dibuat lang
//         renderLeft={() => {
//           return (
//             <Icon
//               name="angle-left"
//               size={20}
//               color={colors.primary}
//               enableRTL={true}
//             />
//           );
//         }}
//         onPressLeft={() => {
//           navigation.goBack();
//         }}
//       />
//       <ScrollView>
//         <View style={styles.wrap}>
//           {/* <View style={{flexDirection: 'center'}}> */}
//           <Text
//             headline
//             style={{
//               fontWeight: "normal",
//               // fontFamily: 'KaiseiHarunoUmi',
//               alignSelf: "center",
//             }}
//           >
//             Unit Attendant
//           </Text>
//           <Text
//             headline
//             style={{
//               fontWeight: "normal",
//               // fontFamily: 'KaiseiHarunoUmi',
//               alignSelf: "center",
//             }}
//           >
//             Pest Control Request
//           </Text>
//           {/* </View> */}

//           {/* {dataCategory.descs.includes('AC') ? <Text>ini klik ac</Text> : <Text>ini klik water</Text>} */}
//           {/* {indexCategory == 0 ? <Text>ini klik ac</Text> : <Text>ini klik water</Text>} */}

//           <View
//             style={[
//               styles.subWrap,
//               {
//                 paddingBottom: 0,
//                 marginBottom: 10,
//                 padding: 10,
//                 marginTop: 50,
//               },
//             ]}
//           >
//             <View>
//               <Text
//                 style={{
//                   color: "#000",
//                   fontSize: 16,
//                   marginBottom: 20,
//                   // fontFamily: 'KaiseiHarunoUmi',
//                 }}
//               >
//                 Category Cleaning
//               </Text>

//               <RadioForm
//                 animation={true}
//                 labelStyle={{ fontWeight: "bold" }}
//                 buttonColor={colors.primary}
//                 selectedButtonColor={colors.primary}
//                 radio_props={radio_props}
//                 initial={-1}
//                 // onPress={radio_props}
//                 onPress={(values, index) => {
//                   setValue({ value: values, index: index });
//                 }}
//               />

//               <Divider style={{ marginBottom: 30, marginTop: 60 }} />
//               {spinner ? (
//                 <ActivityIndicator color={colors.primary} />
//               ) : (
//                 <View style={{ padding: 10 }}>
//                   <Divider style={{ marginBottom: 10, marginTop: 30 }} />
//                   <View
//                     style={{
//                       flexDirection: "row",
//                     }}
//                   >
//                     <View
//                       style={{
//                         alignSelf: "flex-start",
//                         width: 150,
//                       }}
//                     >
//                       <Text
//                         style={{
//                           fontSize: 16,
//                           alignSelf: "flex-start",
//                         }}
//                       >
//                         PRICE
//                       </Text>
//                     </View>
//                     <View
//                       style={{
//                         justifyContent: "flex-end",
//                         flex: 1,
//                         flexDirection: "row",
//                       }}
//                     >
//                       <Text style={{ fontSize: 16, alignSelf: "flex-end" }}>
//                         {/* {parseFloat(totalHarga).toFixed(2)} */}
//                         {numFormattanpaRupiah(formNanPrice)}
//                       </Text>
//                     </View>
//                   </View>

//                   <View
//                     style={{
//                       flexDirection: "row",
//                       marginBottom: 15,
//                     }}
//                   >
//                     <View
//                       style={{
//                         alignSelf: "flex-start",
//                         width: 150,
//                       }}
//                     >
//                       <Text
//                         style={{
//                           fontSize: 16,

//                           alignSelf: "flex-start",
//                         }}
//                       >
//                         VAT In 11%
//                       </Text>
//                     </View>
//                     <View
//                       style={{
//                         justifyContent: "flex-end",
//                         flex: 1,
//                         flexDirection: "row",
//                       }}
//                     >
//                       <Text style={{ fontSize: 16, alignSelf: "flex-end" }}>
//                         {/* {parseFloat(totalHarga).toFixed(2)} */}
//                         {numFormattanpaRupiah(formNanVAT)}
//                       </Text>
//                     </View>
//                   </View>

//                   <View
//                     style={{
//                       flexDirection: "row",
//                     }}
//                   >
//                     <View
//                       style={{
//                         alignSelf: "flex-start",
//                         width: 150,
//                       }}
//                     >
//                       <Text
//                         style={{
//                           fontSize: 16,
//                           fontWeight: "bold",
//                           alignSelf: "flex-start",
//                         }}
//                       >
//                         TOTAL COST
//                       </Text>
//                     </View>
//                     <View
//                       style={{
//                         justifyContent: "flex-end",
//                         flex: 1,
//                         flexDirection: "row",
//                       }}
//                     >
//                       <Text
//                         semibold
//                         style={{ fontSize: 16, alignSelf: "flex-end" }}
//                       >
//                         {/* {parseFloat(totalHarga).toFixed(2)} */}
//                         IDR {numFormattanpaRupiah(formNanTotal)}
//                       </Text>
//                     </View>
//                   </View>
//                   <Divider style={{ marginBottom: 10, marginTop: 30 }} />
//                 </View>
//               )}
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//       {/* <CheckBox
//         checked={checkedTerms}
//         title={'Agree to Terms & Conditions'}
//         onPress={() => setCheckedTerms(checkedEntity)}></CheckBox> */}

//       {/* BUTTON SUBMIT */}
//       <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
//         {formNanTotal != 0 || formNanTotal != "" ? (
//           <Button
//             medium
//             onPress={() => {
//               handleNavigation();
//             }}
//           >
//             <Text
//               style={{
//                 textAlign: "center",
//                 color: "white",
//                 fontSize: 14,
//               }}
//             >
//               {t("Next")}
//             </Text>
//           </Button>
//         ) : (
//           <Button
//             disabled
//             small
//             onPress={() => {
//               handleNavigation();
//               // navigation.navigate('SpecTroffice');
//             }}
//           >
//             <Text
//               style={{
//                 textAlign: "center",
//                 color: "black",
//                 fontSize: 14,
//               }}
//             >
//               {t("Next")}
//             </Text>
//           </Button>
//         )}
//       </View>
//       <View>
//         <Modal
//           isVisible={modalSuccessVisible}
//           style={{ height: "100%" }}
//           backdropColor={"#000"}
//           animationIn={"fancy"}
//           onBackdropPress={() => showModalSuccess(false)}
//         >
//           <View
//             style={{
//               // flex: 1,

//               // alignContent: 'center',
//               padding: 10,
//               backgroundColor: "#fff",
//               // height: ,
//               borderRadius: 8,
//             }}
//           >
//             {statusResult == false ? (
//               <View style={{ alignItems: "center" }}>
//                 <Text
//                   style={{
//                     fontSize: 16,
//                     fontWeight: "bold",
//                     color: colors.primary,
//                     marginBottom: 10,
//                   }}
//                 >
//                   {message}
//                 </Text>
//                 {/* <Text>{message}</Text> */}
//                 <IconAnt
//                   name="checkcircleo"
//                   size={80}
//                   color={colors.primary}
//                 ></IconAnt>
//                 <Text> </Text>
//                 <Text>Result</Text>
//                 <Text>Report no : </Text>
//                 <Text bold>{reportNo}</Text>
//               </View>
//             ) : (
//               <View style={{ alignItems: "center" }}>
//                 <Text
//                   style={{
//                     fontSize: 16,
//                     fontWeight: "bold",
//                     color: "salmon",
//                     marginBottom: 10,
//                   }}
//                 >
//                   {message}
//                 </Text>
//                 {/* <Text>{message}</Text> */}
//                 <IconAnt
//                   name="closecircleo"
//                   size={80}
//                   color={"salmon"}
//                 ></IconAnt>
//                 <Text> </Text>
//                 <Text bold>{reportNo}</Text>
//               </View>
//             )}

//             <View
//               style={{
//                 flexDirection: "row",
//                 // justifyContent: 'flex-end',
//                 justifyContent: "center",
//               }}
//             >
//               <Button
//                 style={{
//                   marginTop: 10,
//                   // marginBottom: 10,

//                   width: 70,
//                   height: 40,
//                 }}
//                 onPress={() => {
//                   onCloseModal();
//                 }}
//               >
//                 <Text style={{ fontSize: 13, color: "#FFF" }}>{t("OK")}</Text>
//               </Button>
//             </View>
//           </View>
//         </Modal>
//       </View>
//     </SafeAreaView>
//   );
// }
