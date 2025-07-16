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
  TabSlider,
  Icon,
  Image,
  Tag,
  CategoryIconSoft,
} from "@/components";
import { BaseColor, BaseStyle, useTheme, Images } from "@/config";
import { CheckBox, Badge } from "react-native-elements";
import IconAnt from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { enableExperimental } from "@/utils";
import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  TouchableOpacity,
  View,
  Platform,
  TouchableHighlight,
  ScrollView,
  Dimensions,
  //   Button,
  StyleSheet,
} from "react-native";

import { useSelector } from "react-redux";
import getUser from "../../selectors/UserSelectors";
import axios from "axios";
import client from "../../controllers/HttpClient";
// import styles from './styles';

import { RadioButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import moment from "moment";

import Modal from "react-native-modal";

import Signature from "react-native-signature-canvas";
import { Divider, DataTable, List } from "react-native-paper";
import numFormat from "../../components/numFormat";
import { SceneMap } from "react-native-tab-view";

import numFormattanpaRupiah from "../../components/numFormattanpaRupiah";
// import RNFetchBlob from 'rn-fetch-blob';

import { baseURL as API_URL_LOKAL } from "@/controllers/HttpClient";

const Header_Before = (props) => {
  console.log("props header", props);
  const { route } = props;
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const paramsItem = route.props.datas.resTiketMulti;
  console.log("params items res tiket", paramsItem);
  const paramsItemss = route;
  console.log("params items signature", paramsItemss);

  const paramsItemsHdr = route.props.datas.resHDR;
  console.log("items hdr", paramsItemsHdr);

  const paramsItemsLabour = route.props.datas.resLabour;
  const paramsItemsLabour_array = route.props.datas.resLabour;
  console.log("item labour", paramsItemsLabour);
  console.log("item labour", paramsItemsLabour_array.sum[0]);

  const paramsItemsMaterial = route.props.datas.resMaterial;

  console.log("item material", paramsItemsMaterial);
  console.log("item material elngth", paramsItemsMaterial.detail.length);

  const paramsItemsOther = route.props.datas.resOther;
  console.log("item other", paramsItemsOther);

  const grand_total_base =
    Math.floor(paramsItemsMaterial.sum[0].base_amt) +
    Math.floor(paramsItemsLabour.sum[0].base_amt) +
    Math.floor(paramsItemsOther.sum[0].base_amt);

  const grand_total_tax =
    Math.floor(paramsItemsMaterial.sum[0].tax_amt) +
    Math.floor(paramsItemsLabour.sum[0].tax_amt) +
    Math.floor(paramsItemsOther.sum[0].tax_amt);

  const grand_total_total =
    Math.floor(paramsItemsMaterial.sum[0].total_amt) +
    Math.floor(paramsItemsLabour.sum[0].total_amt) +
    Math.floor(paramsItemsOther.sum[0].total_amt);

  const status_button = route.props.status_button;
  console.log("status button di signature", status_button);

  const [dataTowerUser, setdataTowerUser] = useState([]);
  const [arrDataTowerUser, setArrDataTowerUser] = useState([]);
  const users = useSelector((state) => getUser(state));
  const [email, setEmail] = useState(users.user);
  const [name, setName] = useState(users.name);
  const [urlApi, seturlApi] = useState(client);

  const [spinner, setSpinner] = useState(true);
  const [signature, setSign] = useState(null);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const logo = {
    uri: "https://reactnative.dev/img/tiny_logo.png",
    width: 64,
    height: 64,
  };

  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const ref = useRef();

  const buttonNext = (status_button) => {
    console.log("status button di table before", status_button);
    console.log("params item di table before", { resTiketMulti: paramsItem });
    navigation.navigate("ScreenSignature", {
      resTiketMulti: paramsItem,
      status_button,
    });
  };

  const renderContent = () => {
    return (
      <SafeAreaView>
        <ScrollView>
          {paramsItem.status == "P" &&
          status_button == "before_wo" &&
          paramsItem.status_approval == null ? (
            //true
            <View style={{ paddingBottom: 20 }}>
              <View
                style={{
                  // display: 'flex',
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                  alignItems: "center",
                  // marginHorizontal: 10,
                }}
              >
                <View style={{ flexDirection: "column", marginHorizontal: 10 }}>
                  <View style={{ alignItems: "center", marginVertical: 10 }}>
                    <View>
                      <Text style={{ fontWeight: "bold" }}>From</Text>
                    </View>
                    <View>
                      <Text>{paramsItemsHdr.name}</Text>
                    </View>
                  </View>
                  <View style={{ alignItems: "center", marginVertical: 10 }}>
                    <View>
                      <Text style={{ fontWeight: "bold" }}>Twr/LT/Unit</Text>
                    </View>
                    <View>
                      <Text>{paramsItemsHdr.lot_no}</Text>
                    </View>
                  </View>
                  <View style={{ alignItems: "center", marginVertical: 10 }}>
                    <View>
                      <Text style={{ fontWeight: "bold" }}>Requested by</Text>
                    </View>
                    <View>
                      <Text>{paramsItemsHdr.serv_req_by}</Text>
                    </View>
                  </View>
                </View>
                <View style={{ flexDirection: "column", marginHorizontal: 10 }}>
                  <View style={{ alignItems: "center", marginVertical: 10 }}>
                    <View>
                      <Text style={{ fontWeight: "bold" }}>Doc No</Text>
                    </View>
                    <View>
                      <Text>{paramsItemsHdr.report_no}</Text>
                    </View>
                  </View>
                  <View style={{ alignItems: "center", marginVertical: 10 }}>
                    <View>
                      <Text style={{ fontWeight: "bold" }}>Date</Text>
                    </View>
                    <View>
                      <Text>
                        {moment(paramsItemsHdr.reported_date).format(
                          "DD-MM-YYYY hh:ss"
                        )}
                      </Text>
                    </View>
                  </View>
                  <View style={{ alignItems: "center", marginVertical: 10 }}>
                    <View>
                      <Text style={{ fontWeight: "bold" }}>Audit by</Text>
                    </View>
                    <View>
                      <Text>{paramsItemsHdr.reported_by}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "center",
                  marginHorizontal: 10,
                  marginTop: 10,
                  marginVertical: 10,
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <View>
                    <Text style={{ fontWeight: "bold" }}>
                      Description of Works
                    </Text>
                  </View>
                  <View>
                    <Text>{paramsItemsHdr.work_requested}</Text>
                  </View>
                </View>
              </View>

              <Divider
                style={{ marginHorizontal: 10, marginVertical: 10 }}
              ></Divider>

              <View>
                <View style={{ paddingLeft: 10 }}>
                  <Text style={{ fontWeight: "bold" }}>
                    Description of Expenses
                  </Text>
                </View>

                {/* ------- LABOUR TOTAL HERE -------- */}

                <View style={{ marginVertical: 5 }}>
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        flexDirection: "column",
                        width: "50%",
                        paddingLeft: 20,
                      }}
                    >
                      <Text>1. Labour :</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",

                        width: "10%",
                      }}
                    >
                      <Text semibold>Base</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        width: "40%",
                        justifyContent: "flex-end",

                        paddingRight: 10,
                      }}
                    >
                      <Text style={{ textAlign: "right" }}>
                        {numFormattanpaRupiah(
                          paramsItemsLabour.sum[0].base_amt
                        )}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        flexDirection: "column",
                        width: "50%",
                        paddingLeft: 20,
                      }}
                    >
                      <Text></Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",

                        width: "10%",
                      }}
                    >
                      <Text semibold>Disc</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        width: "40%",
                        justifyContent: "flex-end",

                        paddingRight: 10,
                      }}
                    >
                      <Text style={{ textAlign: "right" }}>
                        {numFormattanpaRupiah(
                          paramsItemsLabour.sum[0].disc_amt
                        )}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        flexDirection: "column",
                        width: "50%",
                        paddingLeft: 20,
                      }}
                    >
                      <Text></Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        width: "10%",
                      }}
                    >
                      <Text semibold>Tax</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        width: "40%",
                        // justifyContent: 'flex-end',

                        paddingRight: 10,
                      }}
                    >
                      <Text style={{ textAlign: "right" }}>
                        {numFormattanpaRupiah(paramsItemsLabour.sum[0].tax_amt)}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        flexDirection: "column",
                        width: "50%",
                        paddingLeft: 20,
                      }}
                    >
                      <Text></Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        width: "10%",
                      }}
                    >
                      <Text semibold>Total</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        width: "40%",
                        // justifyContent: 'flex-end',

                        paddingRight: 10,
                      }}
                    >
                      <Text style={{ textAlign: "right" }}>
                        {numFormattanpaRupiah(
                          paramsItemsLabour.sum[0].total_amt
                        )}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* ------- CLOSE LABOUR TOTAL HERE -------- */}

                {/* ------- MATERIAL TOTAL HERE -------- */}
                <View style={{ marginVertical: 5 }}>
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        flexDirection: "column",
                        width: "50%",
                        paddingLeft: 20,
                      }}
                    >
                      <Text>2. Material :</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",

                        width: "10%",
                      }}
                    >
                      <Text semibold>Base</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        width: "40%",
                        justifyContent: "flex-end",

                        paddingRight: 10,
                      }}
                    >
                      <Text style={{ textAlign: "right" }}>
                        {numFormattanpaRupiah(
                          paramsItemsMaterial.sum[0].base_amt
                        )}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        flexDirection: "column",
                        width: "50%",
                        paddingLeft: 20,
                      }}
                    >
                      <Text></Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",

                        width: "10%",
                      }}
                    >
                      <Text semibold>Disc</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        width: "40%",
                        justifyContent: "flex-end",

                        paddingRight: 10,
                      }}
                    >
                      <Text style={{ textAlign: "right" }}>
                        {numFormattanpaRupiah(
                          paramsItemsMaterial.sum[0].disc_amt
                        )}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        flexDirection: "column",
                        width: "50%",
                        paddingLeft: 20,
                      }}
                    >
                      <Text></Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        width: "10%",
                      }}
                    >
                      <Text semibold>Tax</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        width: "40%",
                        // justifyContent: 'flex-end',

                        paddingRight: 10,
                      }}
                    >
                      <Text style={{ textAlign: "right" }}>
                        {numFormattanpaRupiah(
                          paramsItemsMaterial.sum[0].tax_amt
                        )}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        flexDirection: "column",
                        width: "50%",
                        paddingLeft: 20,
                      }}
                    >
                      <Text></Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        width: "10%",
                      }}
                    >
                      <Text semibold>Total</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        width: "40%",
                        // justifyContent: 'flex-end',

                        paddingRight: 10,
                      }}
                    >
                      <Text style={{ textAlign: "right" }}>
                        {numFormattanpaRupiah(
                          paramsItemsMaterial.sum[0].total_amt
                        )}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* ------- CLOSE MATERIAL TOTAL HERE -------- */}

                {/* ------- OTHERS TOTAL HERE -------- */}
                <View style={{ marginVertical: 5 }}>
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        flexDirection: "column",
                        width: "50%",
                        paddingLeft: 20,
                      }}
                    >
                      <Text>3. Others :</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",

                        width: "10%",
                      }}
                    >
                      <Text semibold>Base</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        width: "40%",
                        justifyContent: "flex-end",

                        paddingRight: 10,
                      }}
                    >
                      <Text style={{ textAlign: "right" }}>
                        {numFormattanpaRupiah(paramsItemsOther.sum[0].base_amt)}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        flexDirection: "column",
                        width: "50%",
                        paddingLeft: 20,
                      }}
                    >
                      <Text></Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",

                        width: "10%",
                      }}
                    >
                      <Text semibold>Disc</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        width: "40%",
                        justifyContent: "flex-end",

                        paddingRight: 10,
                      }}
                    >
                      <Text style={{ textAlign: "right" }}>
                        {numFormattanpaRupiah(paramsItemsOther.sum[0].disc_amt)}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        flexDirection: "column",
                        width: "50%",
                        paddingLeft: 20,
                      }}
                    >
                      <Text></Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        width: "10%",
                      }}
                    >
                      <Text semibold>Tax</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        width: "40%",
                        // justifyContent: 'flex-end',

                        paddingRight: 10,
                      }}
                    >
                      <Text style={{ textAlign: "right" }}>
                        {numFormattanpaRupiah(paramsItemsOther.sum[0].tax_amt)}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        flexDirection: "column",
                        width: "50%",
                        paddingLeft: 20,
                      }}
                    >
                      <Text></Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        width: "10%",
                      }}
                    >
                      <Text semibold>Total</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        width: "40%",
                        // justifyContent: 'flex-end',

                        paddingRight: 10,
                      }}
                    >
                      <Text style={{ textAlign: "right" }}>
                        {numFormattanpaRupiah(
                          paramsItemsOther.sum[0].total_amt
                        )}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* ------- CLOSE OTHERS TOTAL HERE -------- */}

                <Divider style={{ marginHorizontal: 10, marginVertical: 10 }} />

                {/* ------- GRAND TOTAL HERE -------- */}
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "column",
                      width: "50%",
                      paddingLeft: 20,
                    }}
                  ></View>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "50%",

                      paddingRight: 10,
                    }}
                  >
                    <Text semibold style={{ alignSelf: "center" }}>
                      GRANDTOTAL
                    </Text>
                  </View>
                </View>
                {/* <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: '50%',
                      paddingLeft: 20,
                    }}></View>
                  <View
                    style={{
                      flexDirection: 'column',

                      width: '10%',
                    }}>
                    <Text semibold>Base</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: '40%',
                      justifyContent: 'flex-end',

                      paddingRight: 10,
                    }}>
                    <Text style={{textAlign: 'right'}}>
                      {numFormattanpaRupiah(grand_total_base)}
                    </Text>
                  </View>
                </View> */}
                {/* <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: '50%',
                      paddingLeft: 20,
                    }}>
                    <Text></Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: '10%',
                    }}>
                    <Text semibold>Tax</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: '40%',
                      // justifyContent: 'flex-end',

                      paddingRight: 10,
                    }}>
                    <Text style={{textAlign: 'right'}}>
                      {numFormattanpaRupiah(grand_total_tax)}
                    </Text>
                  </View>
                </View> */}

                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "50%",
                      paddingLeft: 20,
                    }}
                  >
                    <Text></Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "10%",
                    }}
                  >
                    <Text semibold>Total</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "40%",
                      // justifyContent: 'flex-end',

                      paddingRight: 10,
                    }}
                  >
                    <Text style={{ textAlign: "right" }}>
                      {numFormattanpaRupiah(grand_total_total)}
                    </Text>
                  </View>
                </View>
                {/* ------- CLOSE GRAND TOTAL HERE -------- */}
              </View>
            </View>
          ) : (
            <Text>null</Text>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={["right", "top", "left"]}
    >
      {renderContent()}
    </SafeAreaView>
  );
};

const Detail = (props) => {
  console.log("props header", props);
  const { route } = props;
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const paramsItem = route.props.datas.resTiketMulti;
  console.log("params items res tiket", paramsItem);
  const paramsItemss = route;
  console.log("params items signature", paramsItemss);

  const paramsItemsHdr = route.props.datas.resHDR;
  console.log("items hdr", paramsItemsHdr);

  const paramsItemsLabour = route.props.datas.resLabour;
  const paramsItemsLabour_array = route.props.datas.resLabour;
  console.log("item labour", paramsItemsLabour);
  console.log("item labour", paramsItemsLabour_array.sum[0]);

  const paramsItemsMaterial = route.props.datas.resMaterial;
  console.log("item material", paramsItemsMaterial);

  const paramsItemsOther = route.props.datas.resOther;
  console.log("item other", paramsItemsOther);

  const grand_total_base =
    Math.floor(paramsItemsMaterial.sum[0].base_amt) +
    Math.floor(paramsItemsLabour.sum[0].base_amt) +
    Math.floor(paramsItemsOther.sum[0].base_amt);

  const grand_total_tax =
    Math.floor(paramsItemsMaterial.sum[0].tax_amt) +
    Math.floor(paramsItemsLabour.sum[0].tax_amt) +
    Math.floor(paramsItemsOther.sum[0].tax_amt);

  const grand_total_total =
    Math.floor(paramsItemsMaterial.sum[0].total_amt) +
    Math.floor(paramsItemsLabour.sum[0].total_amt) +
    Math.floor(paramsItemsOther.sum[0].total_amt);

  const status_button = route.props.status_button;
  console.log("status button di signature", status_button);

  const [dataTowerUser, setdataTowerUser] = useState([]);
  const [arrDataTowerUser, setArrDataTowerUser] = useState([]);
  const users = useSelector((state) => getUser(state));
  const [email, setEmail] = useState(users.user);
  const [name, setName] = useState(users.name);
  const [urlApi, seturlApi] = useState(client);

  const [spinner, setSpinner] = useState(true);
  const [signature, setSign] = useState(null);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const logo = {
    uri: "https://reactnative.dev/img/tiny_logo.png",
    width: 64,
    height: 64,
  };

  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const ref = useRef();

  const buttonNext = (status_button) => {
    console.log("status button di table before", status_button);
    console.log("params item di table before", { resTiketMulti: paramsItem });
    navigation.navigate("ScreenSignature", {
      resTiketMulti: paramsItem,
      status_button,
    });
  };

  const renderContent = () => {
    return (
      <SafeAreaView>
        <ScrollView>
          {paramsItem.status == "P" &&
          status_button == "before_wo" &&
          paramsItem.status_approval == null ? (
            <View style={{ paddingBottom: 20 }}>
              <View>
                <View style={{ paddingLeft: 10 }}>
                  <Text style={{ fontWeight: "bold" }}>
                    Details Description of Expenses
                  </Text>
                </View>

                {/* ------- LABOUR TOTAL HERE -------- */}

                <View style={{ marginVertical: 5 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      width: "100%",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "column",
                        width: "50%",
                        paddingLeft: 20,
                        // borderWidth: 2,
                        // borderStyle: 'solid',
                      }}
                    >
                      <Text>1. Details Labour :</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        width: "50%",
                        paddingLeft: 20,
                      }}
                    >
                      {/* <Text>halo</Text> */}
                    </View>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        flexDirection: "column",
                        width: "45%",
                        // flexBasis: 180,
                        paddingLeft: 10,
                      }}
                    >
                      <Text semibold>Description</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        width: "10%",
                        // flexBasis: 40,
                      }}
                    >
                      <Text semibold>Qty</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        width: "22%",
                        justifyContent: "flex-end",
                        // flexBasis: 90,
                        paddingRight: 10,
                      }}
                    >
                      <Text style={{ textAlign: "right" }} semibold>
                        Unit Price
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        // flexBasis: 100,
                        justifyContent: "flex-end",
                        width: "23%",
                        paddingRight: 10,
                      }}
                    >
                      <Text style={{ textAlign: "right" }} semibold>
                        Total Price
                      </Text>
                    </View>
                  </View>

                  {paramsItemsLabour.detail.length != 0 ? (
                    paramsItemsLabour.detail.map((item, index) => (
                      <View style={{ flexDirection: "row" }} key={index}>
                        <View
                          style={{
                            flexDirection: "column",
                            // flexBasis: 180,
                            width: "45%",
                            paddingLeft: 10,
                            borderWidth: 0.5,
                            borderStyle: "solid",
                          }}
                        >
                          <Text>{item.descs}</Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "column",
                            // flexBasis: 40,
                            width: "10%",
                            borderWidth: 0.5,
                            borderStyle: "solid",
                          }}
                        >
                          <Text style={{ alignSelf: "center" }}>
                            {parseFloat(item.qty).toFixed(0)}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "column",
                            // flexBasis: 90,
                            width: "22%",
                            borderWidth: 0.5,
                            borderStyle: "solid",
                            // justifyContent: 'flex-end',

                            paddingRight: 10,
                          }}
                        >
                          <Text style={{ textAlign: "right" }}>
                            {numFormattanpaRupiah(item.charge_rate)}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "column",
                            // flexBasis: 100,
                            width: "23%",
                            borderWidth: 0.5,
                            borderStyle: "solid",
                            // justifyContent: 'flex-end',

                            paddingRight: 10,
                          }}
                        >
                          <Text style={{ textAlign: "right" }}>
                            {numFormattanpaRupiah(item.base_amt)}
                            {/* 800000000 */}
                          </Text>
                        </View>
                      </View>
                    ))
                  ) : (
                    <View
                      style={{
                        alignItems: "center",
                        marginTop: 10,
                        backgroundColor: "lightgrey",
                      }}
                    >
                      <Text>No Data Detail</Text>
                    </View>
                  )}
                </View>

                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "50%",
                      paddingLeft: 20,
                    }}
                  ></View>
                  <View
                    style={{
                      flexDirection: "column",

                      width: "10%",
                    }}
                  >
                    <Text semibold>Base</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "40%",
                      justifyContent: "flex-end",

                      paddingRight: 10,
                    }}
                  >
                    <Text style={{ textAlign: "right" }}>
                      {numFormattanpaRupiah(paramsItemsLabour.sum[0].base_amt)}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "50%",
                      paddingLeft: 20,
                    }}
                  ></View>
                  <View
                    style={{
                      flexDirection: "column",

                      width: "10%",
                    }}
                  >
                    <Text semibold>Disc</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "40%",
                      justifyContent: "flex-end",

                      paddingRight: 10,
                    }}
                  >
                    <Text style={{ textAlign: "right" }}>
                      {numFormattanpaRupiah(paramsItemsLabour.sum[0].disc_amt)}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "50%",
                      paddingLeft: 20,
                    }}
                  >
                    <Text></Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "10%",
                    }}
                  >
                    <Text semibold>Tax</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "40%",
                      // justifyContent: 'flex-end',

                      paddingRight: 10,
                    }}
                  >
                    <Text style={{ textAlign: "right" }}>
                      {numFormattanpaRupiah(paramsItemsLabour.sum[0].tax_amt)}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "50%",
                      paddingLeft: 20,
                    }}
                  >
                    <Text></Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "10%",
                    }}
                  >
                    <Text semibold>Total</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "40%",
                      // justifyContent: 'flex-end',

                      paddingRight: 10,
                    }}
                  >
                    <Text style={{ textAlign: "right" }}>
                      {numFormattanpaRupiah(paramsItemsLabour.sum[0].total_amt)}
                    </Text>
                  </View>
                </View>

                {/* ------- CLOSE LABOUR TOTAL HERE -------- */}

                <Divider style={{ marginHorizontal: 10, marginVertical: 10 }} />

                {/* ------- MATERIAL TOTAL HERE -------- */}
                <View style={{ marginVertical: 5 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      width: "100%",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "column",
                        width: "50%",
                        paddingLeft: 20,
                        // borderWidth: 2,
                        // borderStyle: 'solid',
                      }}
                    >
                      <Text>2. Details Material :</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        width: "50%",
                        paddingLeft: 20,
                      }}
                    >
                      {/* <Text>halo</Text> */}
                    </View>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        flexDirection: "column",
                        // width: '45%',
                        // flexBasis: 180,
                        width: "45%",
                        paddingLeft: 20,
                      }}
                    >
                      <Text semibold>Description</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",

                        width: "10%",
                      }}
                    >
                      <Text semibold>Qty</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        // width: '20%',
                        justifyContent: "flex-end",
                        // flexBasis: 90,
                        width: "22%",
                        paddingRight: 10,
                      }}
                    >
                      <Text style={{ textAlign: "right" }} semibold>
                        Unit Price
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        // flexBasis: 100,
                        width: "23%",
                        justifyContent: "flex-end",

                        paddingRight: 10,
                      }}
                    >
                      <Text style={{ textAlign: "right" }} semibold>
                        Total Price
                      </Text>
                    </View>
                  </View>

                  {paramsItemsMaterial.detail.length != 0 ? (
                    paramsItemsMaterial.detail.map((item, index) => (
                      <View style={{ flexDirection: "row" }} key={index}>
                        <View
                          style={{
                            flexDirection: "column",
                            // flexBasis: 180,
                            width: "45%",
                            paddingLeft: 20,
                            borderWidth: 0.5,
                            borderStyle: "solid",
                          }}
                        >
                          <Text>{item.descz}</Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "column",
                            // flexBasis: 40,
                            width: "10%",
                            borderWidth: 0.5,
                            borderStyle: "solid",
                          }}
                        >
                          <Text style={{ alignSelf: "center" }}>
                            {parseFloat(item.qty).toFixed(0)}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "column",
                            // flexBasis: 90,
                            width: "22%",
                            borderWidth: 0.5,
                            borderStyle: "solid",
                            // justifyContent: 'flex-end',

                            paddingRight: 10,
                          }}
                        >
                          <Text style={{ textAlign: "right" }}>
                            {numFormattanpaRupiah(item.charge_rate)}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "column",
                            // flexBasis: 100,
                            width: "23%",
                            borderWidth: 0.5,
                            borderStyle: "solid",
                            // justifyContent: 'flex-end',

                            paddingRight: 10,
                          }}
                        >
                          <Text style={{ textAlign: "right" }}>
                            {numFormattanpaRupiah(item.base_amt)}
                            {/* 800000000 */}
                          </Text>
                        </View>
                      </View>
                    ))
                  ) : (
                    <View
                      style={{
                        alignItems: "center",
                        marginTop: 10,
                        backgroundColor: "lightgrey",
                      }}
                    >
                      <Text>No Data Detail</Text>
                    </View>
                  )}
                </View>

                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "50%",
                      paddingLeft: 20,
                    }}
                  ></View>
                  <View
                    style={{
                      flexDirection: "column",

                      width: "10%",
                    }}
                  >
                    <Text semibold>Base</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "40%",
                      justifyContent: "flex-end",

                      paddingRight: 10,
                    }}
                  >
                    <Text style={{ textAlign: "right" }}>
                      {numFormattanpaRupiah(
                        paramsItemsMaterial.sum[0].base_amt
                      )}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "50%",
                      paddingLeft: 20,
                    }}
                  ></View>
                  <View
                    style={{
                      flexDirection: "column",

                      width: "10%",
                    }}
                  >
                    <Text semibold>Disc</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "40%",
                      justifyContent: "flex-end",

                      paddingRight: 10,
                    }}
                  >
                    <Text style={{ textAlign: "right" }}>
                      {numFormattanpaRupiah(
                        paramsItemsMaterial.sum[0].disc_amt
                      )}
                      {/* {paramsItemsMaterial.sum[0].disc_amt} */}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "50%",
                      paddingLeft: 20,
                    }}
                  >
                    <Text></Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "10%",
                    }}
                  >
                    <Text semibold>Tax</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "40%",
                      // justifyContent: 'flex-end',

                      paddingRight: 10,
                    }}
                  >
                    <Text style={{ textAlign: "right" }}>
                      {numFormattanpaRupiah(paramsItemsMaterial.sum[0].tax_amt)}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "50%",
                      paddingLeft: 20,
                    }}
                  >
                    <Text></Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "10%",
                    }}
                  >
                    <Text semibold>Total</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "40%",
                      // justifyContent: 'flex-end',

                      paddingRight: 10,
                    }}
                  >
                    <Text style={{ textAlign: "right" }}>
                      {numFormattanpaRupiah(
                        paramsItemsMaterial.sum[0].total_amt
                      )}
                    </Text>
                  </View>
                </View>

                {/* ------- CLOSE MATERIAL TOTAL HERE -------- */}

                <Divider style={{ marginHorizontal: 10, marginVertical: 10 }} />

                {/* ------- OTHERS TOTAL HERE -------- */}
                <View style={{ marginVertical: 5 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      width: "100%",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "column",
                        width: "50%",
                        paddingLeft: 20,
                        // borderWidth: 2,
                        // borderStyle: 'solid',
                      }}
                    >
                      <Text>3. Details Others :</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        width: "50%",
                        paddingLeft: 20,
                      }}
                    >
                      {/* <Text>halo</Text> */}
                    </View>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        flexDirection: "column",
                        width: "45%",
                        // flexBasis: 180,
                        paddingLeft: 20,
                      }}
                    >
                      <Text semibold>Description</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        width: "10%",
                        // flexBasis: 40,
                      }}
                    >
                      <Text semibold>Qty</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        width: "22%",
                        justifyContent: "flex-end",
                        // flexBasis: 90,
                        paddingRight: 10,
                      }}
                    >
                      <Text style={{ textAlign: "right" }} semibold>
                        Unit Price
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        // flexBasis: 100,
                        width: "23%",
                        justifyContent: "flex-end",

                        paddingRight: 10,
                      }}
                    >
                      <Text style={{ textAlign: "right" }} semibold>
                        Total Price
                      </Text>
                    </View>
                  </View>

                  {paramsItemsOther.detail.length != 0 ? (
                    paramsItemsOther.detail.map((item, index) => (
                      <View style={{ flexDirection: "row" }} key={index}>
                        <View
                          style={{
                            flexDirection: "column",
                            width: "45%",
                            paddingLeft: 20,
                            borderWidth: 0.5,
                            borderStyle: "solid",
                          }}
                        >
                          <Text>{item.descs}</Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "column",
                            width: "10%",
                            borderWidth: 0.5,
                            borderStyle: "solid",
                          }}
                        >
                          <Text style={{ alignSelf: "center" }}>
                            {parseFloat(item.qty).toFixed(0)}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "column",
                            width: "22%",
                            borderWidth: 0.5,
                            borderStyle: "solid",
                            // justifyContent: 'flex-end',

                            paddingRight: 10,
                          }}
                        >
                          <Text style={{ textAlign: "right" }}>
                            {numFormattanpaRupiah(item.charge_rate)}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "column",
                            width: "23%",
                            borderWidth: 0.5,
                            borderStyle: "solid",
                            // justifyContent: 'flex-end',

                            paddingRight: 10,
                          }}
                        >
                          <Text style={{ textAlign: "right" }}>
                            {numFormattanpaRupiah(item.base_amt)}
                            {/* 800000000 */}
                          </Text>
                        </View>
                      </View>
                    ))
                  ) : (
                    <View
                      style={{
                        alignItems: "center",
                        marginTop: 10,
                        backgroundColor: "lightgrey",
                      }}
                    >
                      <Text>No Data Detail</Text>
                    </View>
                  )}
                </View>

                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "50%",
                      paddingLeft: 20,
                    }}
                  ></View>
                  <View
                    style={{
                      flexDirection: "column",

                      width: "10%",
                    }}
                  >
                    <Text semibold>Base</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "40%",
                      justifyContent: "flex-end",

                      paddingRight: 10,
                    }}
                  >
                    <Text style={{ textAlign: "right" }}>
                      {numFormattanpaRupiah(paramsItemsOther.sum[0].base_amt)}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "50%",
                      paddingLeft: 20,
                    }}
                  ></View>
                  <View
                    style={{
                      flexDirection: "column",

                      width: "10%",
                    }}
                  >
                    <Text semibold>Disc</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "40%",
                      justifyContent: "flex-end",

                      paddingRight: 10,
                    }}
                  >
                    <Text style={{ textAlign: "right" }}>
                      {numFormattanpaRupiah(paramsItemsOther.sum[0].disc_amt)}
                      {/* {paramsItemsMaterial.sum[0].disc_amt} */}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "50%",
                      paddingLeft: 20,
                    }}
                  >
                    <Text></Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "10%",
                    }}
                  >
                    <Text semibold>Tax</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "40%",
                      // justifyContent: 'flex-end',

                      paddingRight: 10,
                    }}
                  >
                    <Text style={{ textAlign: "right" }}>
                      {numFormattanpaRupiah(paramsItemsOther.sum[0].tax_amt)}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "50%",
                      paddingLeft: 20,
                    }}
                  >
                    <Text></Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "10%",
                    }}
                  >
                    <Text semibold>Total</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "40%",
                      // justifyContent: 'flex-end',

                      paddingRight: 10,
                    }}
                  >
                    <Text style={{ textAlign: "right" }}>
                      {numFormattanpaRupiah(paramsItemsOther.sum[0].total_amt)}
                    </Text>
                  </View>
                </View>

                {/* ------- CLOSE OTHERS TOTAL HERE -------- */}

                <Divider style={{ marginHorizontal: 10, marginVertical: 10 }} />

                {/* ------- GRAND TOTAL HERE -------- */}
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "column",
                      width: "50%",
                      paddingLeft: 20,
                    }}
                  ></View>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "50%",

                      paddingRight: 10,
                    }}
                  >
                    <Text semibold style={{ alignSelf: "center" }}>
                      GRANDTOTAL
                    </Text>
                  </View>
                </View>
                {/* <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: '50%',
                      paddingLeft: 20,
                    }}>
               
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',

                      width: '10%',
                    }}>
                    <Text semibold>Base</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: '40%',
                      justifyContent: 'flex-end',

                      paddingRight: 10,
                    }}>
                    <Text style={{textAlign: 'right'}}>
                      {numFormattanpaRupiah(grand_total_base)}
                    </Text>
                  </View>
                </View>
                 */}
                {/* <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: '50%',
                      paddingLeft: 20,
                    }}>
                    <Text></Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: '10%',
                    }}>
                    <Text semibold>Tax</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: '40%',
                      // justifyContent: 'flex-end',

                      paddingRight: 10,
                    }}>
                    <Text style={{textAlign: 'right'}}>
                      {numFormattanpaRupiah(grand_total_tax)}
                    </Text>
                  </View>
                </View> */}
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "50%",
                      paddingLeft: 20,
                    }}
                  >
                    <Text></Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "10%",
                    }}
                  >
                    <Text semibold>Total</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "40%",
                      // justifyContent: 'flex-end',

                      paddingRight: 10,
                    }}
                  >
                    <Text style={{ textAlign: "right" }} semibold>
                      {numFormattanpaRupiah(grand_total_total)}
                    </Text>
                  </View>
                </View>
                {/* ------- CLOSE GRAND TOTAL HERE -------- */}
              </View>
            </View>
          ) : (
            <Text>detail null</Text>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={["right", "top", "left"]}
    >
      {renderContent()}
    </SafeAreaView>
  );
};

const SignatureBefore = (props) => {
  const { route } = props;
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const paramsItem = route.props.datas.resTiketMulti;
  const status_button = route.props.status_button;
  // const paramsItemss = route.params.datas;
  console.log("params items signature", paramsItem);

  const [dataTowerUser, setdataTowerUser] = useState([]);
  const [arrDataTowerUser, setArrDataTowerUser] = useState([]);
  const users = useSelector((state) => getUser(state));
  const [email, setEmail] = useState(users.user);
  const [name, setName] = useState(users.name);
  const [urlApi, seturlApi] = useState(client);

  const [spinner, setSpinner] = useState(true);
  const [signature, setSign] = useState(null);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const [modalSuccessVisible, showModalSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [messageResult, setMessageResult] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [DateIsActive, setDateIsActive] = useState();
  const [statusResult, setStatus] = useState("");

  const logo = {
    uri: "https://reactnative.dev/img/tiny_logo.png",
    width: 64,
    height: 64,
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const ref = useRef();

  const handleOKBefore = async (signature) => {
    console.log(signature);
    console.log("ok process");

    setSign(signature);

    const data = {
      dataSign: signature,

      name_approval: paramsItem.name,

      report_no: paramsItem.report_no,
      status_approval: "B",
    };

    console.log("data save signature", data);
    const config = {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        token: "",
      },
    };
    await axios
      .post(API_URL_LOKAL + "/modules/cs/save-signature", data, {
        config,
      })
      .then((res) => {
        console.log("res save signature", res.data);
        setMessage(res.data.Pesan);
        //   setMessageResult(resJson.report_no);
        setStatus(res.data.Error);
        showModalSuccess(true);

        // return res.json().then(resJson => {
        //   // alert(resJson.Pesan);
        //   console.log('resKsspn', resJson);
        //   setMessage(resJson.Pesan);
        //   setMessageResult(resJson.report_no);
        //   setStatus(resJson.Error);
        //   showModalSuccess(true);
        // });
      })
      .catch((error) => {
        console.log("error get tower api", error.response.data);
        alert("error get");
      });
  };

  const onCloseModal = () => {
    showModalSuccess(false);
    navigation.navigate("StatusHelp");
  };

  const handleEmpty = () => {
    console.log("Empty");
  };

  const style = `.m-signature-pad--footer
    .button {
      background-color: red;
      color: #FFF;
    }`;

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={["right", "top", "left"]}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <View style={styles.preview}>
          {signature ? (
            <Image
              resizeMode={"contain"}
              style={{ width: 335, height: 114 }}
              source={{ uri: signature }}
            />
          ) : null}
        </View>

        <Signature
          onOK={handleOKBefore} //status_approval: B && status: P
          onEmpty={handleEmpty}
          descriptionText="Signature Approve"
          clearText="Clear"
          confirmText="Save"
          webStyle={style}
          imageType={"image/jpeg"}
          backgroundColor={"#ffffff"}
        />
      </View>

      <View>
        <Modal
          isVisible={modalSuccessVisible}
          style={{ height: "100%" }}
          onBackdropPress={() => showModalSuccess(true)}
        >
          <View
            style={{
              // flex: 1,

              // alignContent: 'center',
              padding: 10,
              backgroundColor: "#fff",
              // height: ,
              borderRadius: 8,
            }}
          >
            {statusResult == false ? (
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: colors.primary,
                    marginBottom: 10,
                  }}
                >
                  {message}
                </Text>
                {/* <Text>{message}</Text> */}
                <IconAnt
                  name="checkcircleo"
                  size={80}
                  color={colors.primary}
                ></IconAnt>
                <Text> </Text>
                <Text>Result</Text>
                <Text>Signature Before WO Success</Text>
                {/* <Text bold>{messageResult}</Text> */}
              </View>
            ) : (
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "salmon",
                    marginBottom: 10,
                  }}
                >
                  {message}
                </Text>
                {/* <Text>{message}</Text> */}
                <IconAnt
                  name="closecircleo"
                  size={80}
                  color={"salmon"}
                ></IconAnt>
                <Text> </Text>
                {/* <Text bold>{messageResult}</Text> */}
              </View>
            )}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Button
                style={{
                  marginTop: 10,
                  // marginBottom: 10,

                  width: 70,
                  height: 40,
                }}
                onPress={() => {
                  onCloseModal();
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    color: "#FFF",
                    alignContent: "center",
                  }}
                >
                  {t("OK")}
                </Text>
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

// export default TableBeforeSignatureWO;
export default function TableBeforeSignatureWO({ route }) {
  console.log("route ada gaksi", route);
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const [loading, setLoading] = useState("");
  const navigation = useNavigation();

  const [datas, setData] = useState(route.params);

  console.log("data route params before", datas);
  const status_button = route.params.status_button;
  console.log("status button di signature", status_button);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "header_before",
      title: "Total",
      props: datas,
    },
    { key: "detail", title: "Detail", props: datas },
    { key: "signature_before", title: "Signature Before WO", props: datas },
  ]);
  const renderScene = SceneMap({
    header_before: Header_Before,
    detail: Detail,
    signature_before: SignatureBefore,
  });

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={["right", "top", "left"]}
    >
      <Header
        title={
          status_button == "before_wo"
            ? "RECTIFICATION / WORK REQUEST"
            : t("Signatures")
        }
        renderLeft={() => {
          return (
            <Icon
              name="angle-left"
              size={20}
              color={colors.text}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <TabSlider
        swipeEnabled={false}
        // onSwipeEnd={() => }
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 250,
    padding: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
});
