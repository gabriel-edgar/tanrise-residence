import {
  Image,
  ListMenuIcon,
  ListOptionSelected,
  LotNoSelectOption,
  ProfileGridSmall,
  FilterESort,
  Header,
} from "@components";
import Icon from "@components/Icon";
import LabelUpper2Row from "@components/Label/Upper2Row";
import { BaseColor, Images, useTheme } from "@config";
import { FLinks } from "@data";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  View,
  Text,
  FlatList,
  // CheckBox,
  // Button,
  // Modal,
  TouchableOpacity,
  Dimensions,
} from "react-native";
// import { Checkbox } from '@react-native-community/checkbox';
import CheckBox from "@react-native-community/checkbox";
import { Button, ProfileGroup } from "../../components";
import axios from "axios";
import { EFilterColors, EFilterSizes, FRecentTransactions } from "@data";
import ModalProduct from "./ModalProduct";

// or any pure javascript modules available in npm
import { Card } from "react-native-paper";
import styles from "./styles";
import Modal from "react-native-modal";
import { useSelector } from "react-redux";
import getUser from "../../selectors/UserSelectors";

import { EPostListData, ESortOption } from "@data";

import SegmentControl from "react-native-segment-control";
import * as Utils from "@utils";
import { API_URL_LOKAL } from "@env";

export default ChoosePartner = (props) => {
  const { navigation, route } = props;
  // const {params} = props;
  console.log("routes from bookinglistdetail", route.params);
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [spinner, setSpinner] = useState(true);
  const users = useSelector((state) => getUser(state));
  const [email, setEmail] = useState(users.user);
  // const navigation = useNavigation();
  // const [params, setParams] = useState(route?.params);
  // console.log('params dari screen sblm', params);

  const [LotNo, setLotno] = useState([]);
  const [lotnoChoosed, setLotnoChoosed] = useState();

  const [modalVisible_2, setModalVisible_2] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [titlenull, setTitle] = useState(false);

  const [partners, setPartner] = useState([]);
  const [items, setPartnerItems] = useState([]);
  const [choosedPartner, setChoosedPartner] = useState([]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [partnerDetail, setPartnerDetail] = useState([]);
  const [choosepartnerDetail, setChoosePartnerDetail] = useState([]);
  const [ceklis, setCeklis] = useState(false);
  const [modalSuccessVisible, showModalSuccess] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState();
  const [errorSubmit, setErrorSubmit] = useState(false);

  const [modalAlertVisible, showModalAlert] = useState(false);
  const deviceWidth = Dimensions.get("window").width;

  const [list, setList] = useState(EPostListData);

  const [showButton, setShowButton] = useState(false);

  const getPartners = async () => {
    try {
      const reservation_no = route.params.reservation_no;

      const res = await axios.get(
        API_URL_LOKAL +
          `/modules/facilities/available-partner-by-reservation/` +
          reservation_no
      );
      if (res) {
        // console.log('res post get partners edit', res);
        const resPartner = res.data.Data;
        setPartner(resPartner); //akan ditambah ischecklis
        setPartnerItems(resPartner);
        setSpinner(false);
        setShowButton(true);
      }
      return res;
    } catch (err) {
      console.log("error", err.response);
    }
  };

  useEffect(() => {
    getPartners();
  }, []);

  const chooseCoba = (item) => {
    console.log("item partner details", item);
    // setCeklis(true);

    setPartnerDetail(item);
    setModalVisible(true);
  };

  const renderFlatListPartner = (renderData) => {
    return (
      <FlatList
        data={renderData}
        renderItem={({ item, key }) => (
          <Card style={{ margin: 5 }} key={key}>
            <View
              style={{
                padding: 10,
                margin: 5,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
              key={key}
            >
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <CheckBox
                  style={{ justifyContent: "center", alignSelf: "center" }}
                  value={item.isChecked}
                  onChange={() => {
                    handleChangePartner(item.rowID);
                  }}
                  //   onChange={() => {
                  //     onCheck(key);
                  //   }}
                  //   onPress={() => onCheck(item.rowID)}
                />
                <TouchableOpacity
                  onPress={() => chooseCoba(item)}
                  style={{ width: 110 }}
                >
                  <Image
                    source={{ uri: item.url_picture.replace("https", "http") }}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 50,
                      alignSelf: "center",
                      alignContent: "center",
                      alignItems: "center",
                    }}
                  />
                  <Text style={{ textAlign: "center" }}>
                    {item.staff_first_name} {item.staff_last_name}
                  </Text>
                  <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                    {item.position}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        )}
        keyExtractor={(item, index) => item.rowID}
      />
    );
  };

  const handleChangePartner = (rowID) => {
    // console.log('row id partner', rowID);
    console.log("coba partner disini array apa ga", partners);
    let temp = partners.map((partners) => {
      if (rowID === partners.rowID) {
        return { ...partners, isChecked: !partners.isChecked };
      }
      return partners;
      //   console.log('partner choose', partners);
    });
    console.log("handlechange partner", temp);
    setPartner(temp);
  };

  //tambah kolom isChecked (true, false) di table saat gue submit partner awal di facility booking

  let selectedpartner =
    partners != null
      ? partners.filter(
          (partners) => partners.isChecked,
          partners.staff_first_name
        )
      : null;

  const bookFacility = async () => {
    try {
      const reservation_no = route.params.reservation_no;
      // console.log('routeparams')
      const status = route.params.status != "W" ? route.params.status : "W";
      const audit_user = users.UserId;
      console.log("audit_user", audit_user);
      const isChecked = true;
      const dataselected_partner = selectedpartner
        .filter(function (item) {
          return item.rowID;
        })
        .map(function ({
          staff_first_name,
          staff_last_name,
          staff_id,
          isChecked,
          status,
        }) {
          return {
            staff_first_name,
            staff_last_name,
            staff_id,
            isChecked,
            status,
          };
        });

      const data = {
        reservation_no: reservation_no,
        userid: audit_user,
        datapartner: dataselected_partner,
      };
      console.log("save data partner", data);
      const res = await axios.post(
        API_URL_LOKAL + "/modules/facilities/update-reservation-partner",
        data
      );
      if (res) {
        //   console.log('res book partner', res);
        console.log("res", res);
        // return res.data;
        console.log("res pesan", res.data.Pesan);
        console.log("res error", res.data.Error);
        setErrorSubmit(res.data.Error);
        setMessageSuccess(res.data.Pesan);
        showModalSuccess(true);
      }
      return res;
    } catch (err) {
      console.log("error", err.response);
    }
  };

  const onCloseModal = () => {
    showModalSuccess(false);
    navigation.navigate("Home");
  };

  const All = () => {
    console.log("all", All);
    return (
      <FlatList
        data={partners}
        keyExtractor={(item, index) => item.rowID}
        renderItem={({ item, key }) => (
          <Card style={{ margin: 5 }} key={key}>
            <View
              style={{
                padding: 10,
                margin: 5,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
              key={key}
            >
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <CheckBox
                  style={{ justifyContent: "center", alignSelf: "center" }}
                  value={item.isChecked}
                  onChange={() => {
                    handleChangePartner(item.rowID);
                  }}
                />
                <TouchableOpacity
                  onPress={() => chooseCoba(item)}
                  style={{ width: 110 }}
                >
                  <Image
                    source={{ uri: item.url_picture.replace("https", "http") }}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 50,
                      alignSelf: "center",
                      alignContent: "center",
                      alignItems: "center",
                    }}
                  />
                  <Text style={{ textAlign: "center" }}>
                    {item.staff_first_name} {item.staff_last_name}
                  </Text>
                  <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                    {item.position}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        )}
      />
    );
  };
  const BallBoy = () => {
    return (
      <FlatList
        data={partners}
        keyExtractor={(item, index) => item.rowID}
        renderItem={({ item, key }) =>
          item.ballboy == 1 ? (
            <Card style={{ margin: 5 }} key={key}>
              <View
                style={{
                  padding: 10,
                  margin: 5,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
                key={key}
              >
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "space-between",
                  }}
                >
                  <CheckBox
                    style={{ justifyContent: "center", alignSelf: "center" }}
                    value={item.isChecked}
                    onChange={() => {
                      handleChangePartner(item.rowID);
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => chooseCoba(item)}
                    style={{ width: 110 }}
                  >
                    <Image
                      source={{
                        uri: item.url_picture.replace("https", "http"),
                      }}
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 50,
                        alignSelf: "center",
                        alignContent: "center",
                        alignItems: "center",
                      }}
                    />
                    <Text style={{ textAlign: "center" }}>
                      {item.staff_first_name} {item.staff_last_name}
                    </Text>
                    <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                      {item.ballboy == 1 ? "Ballboy" : null}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
          ) : null
        }
      />
    );
  };
  const Coach = () => {
    return (
      <FlatList
        data={partners}
        keyExtractor={(item, index) => item.rowID}
        renderItem={({ item, key }) =>
          item.coach == 1 ? (
            <Card style={{ margin: 5 }} key={key}>
              <View
                style={{
                  padding: 10,
                  margin: 5,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
                key={key}
              >
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "space-between",
                  }}
                >
                  <CheckBox
                    style={{ justifyContent: "center", alignSelf: "center" }}
                    value={item.isChecked}
                    onChange={() => {
                      handleChangePartner(item.rowID);
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => chooseCoba(item)}
                    style={{ width: 110 }}
                  >
                    <Image
                      source={{
                        uri: item.url_picture.replace("https", "http"),
                      }}
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 50,
                        alignSelf: "center",
                        alignContent: "center",
                        alignItems: "center",
                      }}
                    />
                    <Text style={{ textAlign: "center" }}>
                      {item.staff_first_name} {item.staff_last_name}
                    </Text>
                    <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                      {item.coach === 1 ? "Coach" : null}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
          ) : null
        }
      />
    );
  };
  const HittingPartner = () => {
    return (
      <FlatList
        data={partners}
        keyExtractor={(item, index) => item.rowID}
        renderItem={({ item, key }) =>
          item.hittingpartner == 1 ? (
            <Card style={{ margin: 5 }} key={key}>
              <View
                style={{
                  padding: 10,
                  margin: 5,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
                key={key}
              >
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "space-between",
                  }}
                >
                  <CheckBox
                    style={{ justifyContent: "center", alignSelf: "center" }}
                    value={item.isChecked}
                    onChange={() => {
                      handleChangePartner(item.rowID);
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => chooseCoba(item)}
                    style={{ width: 110 }}
                  >
                    <Image
                      source={{
                        uri: item.url_picture.replace("https", "http"),
                      }}
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 50,
                        alignSelf: "center",
                        alignContent: "center",
                        alignItems: "center",
                      }}
                    />
                    <Text style={{ textAlign: "center" }}>
                      {item.staff_first_name} {item.staff_last_name}
                    </Text>
                    <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                      {item.hittingpartner == 1 ? "Hitting Partner" : null}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
          ) : null
        }
      />
    );
  };

  const segments = [
    {
      title: "All",
      view: All,
    },
    {
      title: "Ballboy",
      view: BallBoy,
    },
    {
      title: "Coach",
      view: Coach,
    },
    {
      title: "Hitting Partner",
      view: HittingPartner,
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={t("Booking List Detail")}
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
      <View style={{ paddingBottom: 50 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {/* <View>{renderFilterPartner(partners)}</View> */}
          <View style={{ paddingVertical: 20 }}>
            <Text>Choose Partners</Text>
          </View>
          <ScrollView>
            <View
              style={{ flex: 1, height: "100%", backgroundColor: "#F5F7FA" }}
            >
              <SegmentControl
                segments={segments}
                color={colors.primary}
                fontSize={12}
                title={{ fontSize: 12 }}
                style={{ backgroundColor: "red", height: 50, fontSize: 12 }}
                height={50}
              />

              {/* // coba dulu height nya 100%, kayak gimana */}
              {/* {renderFlatListPartner(partners)} */}
            </View>
          </ScrollView>

          {showButton ? (
            <View style={{ marginBottom: 50 }}>
              <Button
                small
                style={{
                  marginTop: 10,
                  marginHorizontal: 5,
                  marginBottom: 20,
                  // flex: 1,
                  // position: 'absolute',
                }}
                onPress={() => {
                  bookFacility();
                }}
              >
                <Text style={{ textAlign: "center" }}>
                  {t("Choose Partner")}
                </Text>
              </Button>
            </View>
          ) : null}
        </ScrollView>
      </View>

      <ScrollView>
        <ModalProduct
          // colorChoosedInit={colorChoosed}
          // sizeChoosedInit={sizeChoosed}
          item={partnerDetail}
          isVisible={modalVisible}
          onSwipeComplete={() => setModalVisible(false)}
          onApply={() => {
            // choosePartnerDetail(item);
            setModalVisible(false);
            // console.log('item from choose partner');
            // navigation.navigate('BookingDetail');s
          }}
        />
      </ScrollView>

      <View>
        <Modal
          isVisible={modalSuccessVisible}
          style={{ height: "100%" }}
          onBackdropPress={() => showModalSuccess(false)}
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
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: colors.primary,
                  marginBottom: 10,
                }}
              >
                {errorSubmit == false ? "Success!" : "Ups, Failed!"}
              </Text>
              <Text>{messageSuccess}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <Button
                style={{
                  marginTop: 10,
                  // marginBottom: 10,

                  width: 70,
                  height: 40,
                }}
                onPress={() => onCloseModal()}
              >
                <Text style={{ fontSize: 13 }}>{t("OK")}</Text>
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};
