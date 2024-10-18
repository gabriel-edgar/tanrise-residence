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
import * as Utils from "@utils";

import { API_URL_LOKAL } from "@env";

const dataProduk = [
  { id: 1, txt: "first check", isChecked: false },
  { id: 2, txt: "second check", isChecked: false },
  { id: 3, txt: "third check", isChecked: false },
  { id: 4, txt: "fourth check", isChecked: false },
  { id: 5, txt: "fifth check", isChecked: false },
  { id: 6, txt: "sixth check", isChecked: false },
  { id: 7, txt: "seventh check", isChecked: false },
];

export default ChooseEditPartner = (props) => {
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

  const chooseCoba = (item) => {
    console.log("item partner details", item);
    // setCeklis(true);

    setPartnerDetail(item);
    setModalVisible(true);
  };

  const getPartners = async () => {
    try {
      const reservation_no = route.params.reservation_no;

      const res = await axios.get(
        API_URL_LOKAL +
          `/modules/facilities/available-partner-by-reservation/` +
          reservation_no
      );
      if (res) {
        console.log("res post get partners edit", res);
        const resPartner = res.data.Data;
        setPartner(resPartner); //akan ditambah ischecklis
        setPartnerItems(resPartner);
        setSpinner(false);
      }
      return res;
    } catch (err) {
      console.log("error", err.response);
    }
  };

  useEffect(() => {
    getPartners();
  }, []);

  const renderFlatListPartner = (renderData) => {
    console.log("render data params", renderData);
    return (
      <FlatList
        data={renderData}
        // keyExtractor={(item, index) => item.ro}
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
                <TouchableOpacity onPress={() => chooseCoba(item)}>
                  <Image
                    source={{ uri: item.url_picture }}
                    style={{ width: 60, height: 60, borderRadius: 50 }}
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

  useEffect(() => {
    // choosedPartnerBefore();
  }, []);

  const choosedPartnerBefore = (index) => {
    // console.log('row id partner', rowID);

    const choosed = route.params.datapartner_choosed;
    console.log("choosed for rowid", choosed);
    // console.log('partners.rowID', partners[0].staff_id);s
    // console.log('choosed.rowID', choosed.rowID);

    let temp = choosed?.map((choosed) => {
      if (choosed.isChecked == "1" || choosed.staff_id == partners.staff_id) {
        let isChecked__ = true;
        return { ...partners, isChecked: isChecked__ }; //true
      }
      return partners;
      //   console.log('partner choose', partners);
    });

    console.log("choosed partner before", temp);
    // setChoosedPartner(temp);
    setPartner(temp);
  };

  let selectedpartner = partners.filter(
    (partners) => partners.isChecked,
    partners.staff_first_name
  );

  const bookFacility = async () => {
    try {
      const reservation_no = route.params;
      const audit_user = users.UserId;
      console.log("audit_user", audit_user);
      const dataselected_partner = selectedpartner
        .filter(function (item) {
          return item.rowID;
        })
        .map(function ({ staff_first_name, staff_last_name, staff_id }) {
          return { staff_first_name, staff_last_name, staff_id };
        });

      const data = {
        reservation_no: reservation_no,
        userid: audit_user,
        datapartner: dataselected_partner,
      };
      const res = await axios.post(
        API_URL_LOKAL + "/modules/facilities/update-reservation-partner",
        data
      );
      if (res) {
        console.log("res post", res);
      }
      return res;
    } catch (err) {
      console.log("error", err.response);
    }
  };

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
      <View style={{ flex: 1 }}>
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
            <View style={{ flex: 1 }}>
              {/* // coba dulu height nya 100%, kayak gimana */}
              {renderFlatListPartner(partners)}
            </View>
          </ScrollView>
        </ScrollView>
      </View>
      <Button
        small
        style={{
          marginTop: 10,
          marginHorizontal: 5,
          marginBottom: 20,
          // flex: 1,
        }}
        onPress={() => {
          bookFacility();
        }}
      >
        <Text style={{ textAlign: "center" }}>{t("Book Facility")}</Text>
      </Button>
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
    </View>
  );
};
