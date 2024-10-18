import {
  CardReport03,
  CardReport08,
  CardReport07,
  ProfileGridSmall,
  SafeAreaView,
  Text,
  Header,
  Transaction2Col,
  Icon,
  Price3Col,
  ListMeterExpand,
  TextInput,
  Button,
} from "@components";
import { BaseStyle, useTheme, BaseColor } from "@config";
import { FRecentTransactions, FHotNews } from "@data";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";

import { Picker } from "@react-native-picker/picker";

import {
  ScrollView,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import HeaderHome from "./HeaderHome";
import styles from "./styles";
import HeaderCard from "./HeaderCard";
import getUser from "../../selectors/UserSelectors";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Modal from "react-native-modal";
import numFormat from "../../components/numFormat";
import CurrencyFormatter from "../../components/CurrencyFormatter";

const MeterInfos = ({
  isCenter = false,
  isPrimary = false,
  style = {},
  onPress = () => {},
  disabled = false,
}) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => getUser(state));
  const [hasError, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [towerz, setTowerz] = useState([]);
  const [userMeter, setUserMeter] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [night, setNight] = useState(1);
  const [loading, setLoading] = useState(false);

  // Make function to call the api : get meter info
  async function fetchData() {
    try {
      const res = await axios.get(
        `http://apps.pakubuwono-residence.com/apiwebpbi/api/modules/meter/data-filter/IFCAPB/01/01/andi@ifca.co.id/09/2017`
      );
      setData(res.data.Data);
      setUserMeter(res.data.Data[0].trx_amt);
      console.log("data Meter", data);
      console.log("Cek trx_amt", userMeter);
    } catch (error) {
      setErrors(error.ressponse.data);
      alert(hasError.toString());
    }
  }

  // Make function to call the api : get data tower
  async function getTower() {
    try {
      const res = await axios.get(
        `http://apps.pakubuwono-residence.com/apisysadmin/api/getProject/${user.user}`
      );
      setTowerz(res.data.Data);
      console.log("data Tower", towerz);
    } catch (error) {
      setErrors(error.ressponse.data);
      alert(hasError.toString());
    }
  }

  const totalIncome = () => {
    Object.entries(userMeter).map(([key, value]) => {
      let total = 0;
      console.log(value);
      for (let i = 0; i < value.length; i++) {
        total += value[i];
      }
      return total;
    });
  };

  useEffect(() => {
    fetchData();
    getTower();
  }, []);

  // ---------- FOR MODAL GET PROJECT ----------
  const renderModal = () => {
    <View>
      <Modal
        isVisible={modalVisible === "duration"}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection={["down"]}
        style={styles.bottomModal}
      >
        <View style={styles.contentFilterBottom}>
          <View style={styles.contentSwipeDown}>
            <View style={styles.lineSwipeDown} />
          </View>
          <View style={styles.contentActionModalBottom}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text body1>{t("cancel")}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text body1 primaryColor>
                {t("save")}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.lineRow, { marginBottom: 40 }]}>
            <View>
              <Text body1>{t("duration")}</Text>
              <Text caption1 grayColor>
                {t("night")}
              </Text>
            </View>
            <View style={styles.iconRight}>
              <TouchableOpacity onPress={() => setValue("down", "night")}>
                <Icon
                  name="minus-circle"
                  size={24}
                  color={BaseColor.grayColor}
                />
              </TouchableOpacity>
              <Text title1>{night}</Text>
              <TouchableOpacity onPress={() => setValue("up", "night")}>
                <Icon name="plus-circle" size={24} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>;
  };

  const openModal = (modal) => {
    setModalVisible(modal);
  };

  const setValue = (mode, value) => {
    switch (value) {
      case "night":
        if (mode == "up") {
          setNight(night + 1);
        } else {
          setNight(night - 1 > 0 ? night - 1 : 0);
        }
        break;
    }
  };
  // ---------- FOR MODAL GET PROJECT ----------

  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView, { flex: 1 }]}
      edges={["right", "top", "left"]}
    >
      {renderModal()}
      <Header
        title={t("Meter Info")}
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
      >
        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <Text body1 grayColor>
            {t("Choose Tower")}{" "}
          </Text>
          <Picker
            style={styles.Dropdown1}
            mode={"dropdown"}
            selectedValue={this.state.project_descs}
            onValueChange={(val) => this.setState({ project_descs: val })}
          ></Picker>
          {/* <TouchableOpacity
                style={styles.duration}
                onPress={() => openModal("duration")}
            >
                <Text body1 grayColor>
                    {t("Choose Tower")}
                </Text>
           </TouchableOpacity> */}
        </View>
        {/* <View style={{flex: 1, paddingHorizontal: 20, paddingVertical: 10}}>
        <TouchableOpacity
                style={styles.duration}
                onPress={() => openModal("duration")}
            >
            
                <Text body1 grayColor>
                    {t("Choose Month")}
                </Text>
           </TouchableOpacity>
        </View> */}
        <View style={{ flex: 1, paddingHorizontal: 20 }}>
          <TextInput
            style={BaseStyle.textInput}
            // onChangeText={(text) => setKeyword(text)}
            autoCorrect={false}
            placeholder="Type Years"
            placeholderTextColor={BaseColor.grayColor}
            // value={keyword}
            selectionColor={colors.primary}
          />
        </View>
        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <Button
            full
            style={{ width: "80%" }}
            // onPress={() => {
            //     setLoading(true);
            //     setTimeout(() => {
            //         navigation.navigate("Hotel");
            //         setLoading(false);
            //     }, 500);
            // }}
            loading={loading}
          >
            {t("apply")}
          </Button>
        </View>
        <View style={{ flex: 1, paddingHorizontal: 20 }}>
          {data.map((item, i) => (
            <ListMeterExpand
              onPress={() => navigation.navigate("FHistoryDetail")}
              key={i}
              business_id={item.business_id}
              name={item.name}
              descs={item.descs}
              meter_id={item.meter_id}
              doc_date={moment(item.doc_date).format("DD MMMM YYYY")}
              last_read={item.last_read}
              usages={item.usages}
              curr_read={item.curr_read}
              trx_amt={`${numFormat(`${item.trx_amt}`)}`}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MeterInfos;
