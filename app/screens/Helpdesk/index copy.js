import {
  Header,
  Icon,
  ListTextButton,
  SafeAreaView,
  TabSlider,
  Tag,
  Text,
  TextInput,
  // CheckBox,
  PlaceholderLine,
  Placeholder,
} from "@/components";
import { BaseColor, BaseStyle, useTheme } from "@/config";
import { CheckBox } from "react-native-elements";
import { FFriends } from "@/data";
import { useNavigation } from "@react-navigation/native";
import { haveChildren } from "@/utils";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, TouchableOpacity, View } from "react-native";
import { SceneMap } from "react-native-tab-view";
import { useSelector } from "react-redux";
import getUser from "../../selectors/UserSelectors";
import axios from "axios";
import { API_URL } from "@env";
import styles from "./styles";

import ModalDropdown_debtor from "@/components/ModalDropdown_debtor";
import ModalDropdown_lotno from "@/components/ModalDropdown_lotno";

const sortOptionInit = [
  {
    value: "remove",
    icon: "sort-amount-up",
    text: "remove",
  },
  {
    value: "share_this_article",
    icon: "sort-amount-down",
    text: "share_this_article",
  },
  {
    value: "view_detail",
    icon: "sort-amount-up",
    text: "view_detail",
  },
  {
    value: "reset_all",
    icon: "sort-amount-up",
    text: "reset_all",
  },
];

const Friends = () => {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const [keyword, setKeyword] = useState("");
  const [friends, setFriends] = useState(FFriends);
  const navigation = useNavigation();

  //   const filterCategory = text => {
  //     console.log('text filter', text);
  //     setKeyword(text);
  //     if (text) {
  //       setFriends(
  //         FFriends.filter(
  //           item =>
  //             haveChildren(item.name, text) || haveChildren(item.total, text),
  //         ),
  //       );
  //     } else {
  //       setFriends(FFriends);
  //     }
  //   };

  const onSend = () => {
    navigation.navigate("FSendMoney");
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      {/* <View
        style={{
          paddingTop: 15,
          paddingBottom: 20,
        }}>
        <TextInput
          onChangeText={filterCategory}
          placeholder={t('name_username_or_email')}
          value={keyword}
          icon={
            <TouchableOpacity onPress={() => filterCategory('')}>
              <Icon name="times" size={16} color={BaseColor.grayColor} />
            </TouchableOpacity>
          }
        />
      </View> */}
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={friends}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <ListTextButton
            image={item.image}
            name={item.name}
            description={item.total}
            componentRight={
              <Tag
                onPress={(e) => {
                  e.stopPropagation();
                  onSend(item);
                }}
                outline
                style={{
                  paddingHorizontal: 20,
                  backgroundColor: colors.background,
                }}
              >
                {`${t("send")}`}
              </Tag>
            }
          />
        )}
      />
    </View>
  );
};

const SpecHelp = (props) => {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [dataSpec, setdataSpec] = useState([]);
  const [dataTowerUser, setdataTowerUser] = useState([]);
  const [arrDataTowerUser, setArrDataTowerUser] = useState([]);
  const users = useSelector((state) => getUser(state));
  const [email, setEmail] = useState(users.user);
  const [urlApi, seturlApi] = useState(API_URL);
  const [checkedEntity, setCheckedEntity] = useState(false);
  const [dataDebtor, setDataDebtor] = useState([]);
  const [entity, setEntity] = useState("");
  const [project_no, setProjectNo] = useState("");
  const [db_profile, setDb_Profile] = useState("");
  const [spinner, setSpinner] = useState(true);

  const [sortOption, setSortOption] = useState(sortOptionInit);
  const [modalVisible, setModalVisible] = useState(false);

  const [debtor, setDebtor] = useState("");
  const [textDebtor, settextDebtor] = useState("");
  const [textNameDebtor, settextNameDebtor] = useState("");
  const [dataLotno, setDataLotno] = useState([]);
  const [textLot, setLotno] = useState("");
  const [reportName, setreportName] = useState(users.name);

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
        `http://apps.pakubuwono-residence.com/apiwebpbi/api/home/common-project/mysql/${data.email}/${data.app}`,
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

  //-----FOR GET DEBTOR
  const getDebtor = async (data) => {
    console.log("data for debtor", data);

    const params =
      "?" +
      "entity_cd=" +
      data.entity_cd +
      "&" +
      "project_no=" +
      data.project_no +
      "&" +
      "email=" +
      email;

    const config = {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        token: "",
      },
    };
    await axios
      .post(urlApi + "/modules/cs/debtor" + params, {
        config,
      })
      .then((res) => {
        // console.log('res', res);
        const datas = res.data;
        const dataDebtors = datas.Data;
        setDataDebtor(dataDebtors);

        // return res.data;
      })
      .catch((error) => {
        console.log("error get tower api", error.response);
        alert("error get");
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      getTower(users);
      // setSpinner(false);
    }, 3000);
  }, []);

  const handleCheckChange = (index, data) => {
    setCheckedEntity(index);

    setEntity(data.entity_cd);
    setProjectNo(data.project_no);
    setDb_Profile(data.db_profile);
    getDebtor(data);
  };

  const onSelectFilter = (selected) => {
    setSortOption(
      sortOption.map((item) => {
        return {
          ...item,
          checked: item.value == selected.value,
        };
      })
    );
  };

  const onApply = () => {
    let itemSelected = null;
    for (const item of sortOption) {
      if (item.checked) {
        itemSelected = item;
      }
    }
    if (itemSelected) {
      setModalVisible(false);
      setSortOption(sortOptionInit);
    }
  };

  const handleChangeModal = (data) => {
    data.data.map((dat) => {
      if (dat) {
        setDebtor(dat.debtor_acct);
        settextDebtor(dat.debtor_acct + " - " + dat.name);
        settextNameDebtor(dat.name);
        getLot(dat.debtor_acct);
      }
    });
    setSpinner(false);
  };

  const getLot = async (data) => {
    // const params =
    //   '?' +
    //   'entity=' +
    //   entity +
    //   '&' +
    //   'project=' +
    //   project_no +
    //   '&' +
    //   'email=' +
    //   email;
    console.log("params lotno", params);
    const params = {
      entity_cd: entity,
      project_no: project_no,
      email: email,
    };
    const config = {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        token: "",
      },
    };

    await axios
      .post(urlApi + "/modules/cs/lot-no", params, {
        config,
      })
      .then((res) => {
        const datas = res.data;
        const dataLotno = datas.Data;
        setDataLotno(dataLotno);

        // return res.data;
      })
      .catch((error) => {
        console.log("error get tower api", error.response);
        alert("error get");
      });
  };

  const handleLotChange = (lot) => {
    console.log("lot", lot);
    setLotno(lot);
    // this.setState({textLot: lot});
    getFloor(lot);
  };

  const getFloor = (lot) => {
    console.log("lot floor", lot);
  };

  return (
    <View style={styles.wrap}>
      <Text title2>Ticket</Text>
      <Text headline style={{ fontWeight: "normal" }}>
        Specification Help Desk
      </Text>
      <View style={[styles.subWrap, { paddingBottom: 0, marginBottom: 10 }]}>
        <View>
          <Text style={{ color: "#3f3b38", fontSize: 14 }}>Choose Project</Text>
          {spinner ? (
            <View>
              {/* <Spinner visible={this.state.spinner} /> */}
              <Placeholder style={{ marginVertical: 4, paddingHorizontal: 10 }}>
                <PlaceholderLine width={100} noMargin style={{ height: 40 }} />
              </Placeholder>
            </View>
          ) : (
            arrDataTowerUser.map((data, index) => (
              <CheckBox
                key={index}
                // checkedIcon="dot-circle-o"
                // uncheckedIcon="circle-o"
                title={data.project_descs}
                checked={checkedEntity === index}
                onPress={() => handleCheckChange(index, data)}
              />
            ))
          )}
        </View>
      </View>
      {checkedEntity === false ? null : (
        <View>
          <View style={{ marginBottom: 5, paddingBottom: 0, marginTop: 5 }}>
            <ModalDropdown_debtor
              label="Debtor"
              data={dataDebtor}
              onChange={() => handleChangeModal({ data: dataDebtor })}
              value={textDebtor}
              style={{ marginBottom: 0, paddingBottom: 0 }}
            />
          </View>

          <Text
            style={{
              color: "#3f3b38",
              fontSize: 14,
              marginBottom: 0,
              paddingBottom: 0,
              marginTop: 0,
              paddingTop: 0,
            }}
          >
            Username
          </Text>
          <TextInput
            editable={false} //wajib true kalo mau di klik-klik / di isi manual
            value={textNameDebtor} //dari nama debtor
            onChangeText={(text) => settextNameDebtor(text)}
            style={{
              marginBottom: 0,
              paddingBottom: 0,
              marginTop: 0,
              paddingTop: 0,
            }}
          />

          <View style={{ marginTop: 15 }}>
            <ModalDropdown_lotno
              label="Lot No"
              data={dataLotno}
              onChange={(option) => handleLotChange(option.lot_no)}
              value={textLot}
            />
          </View>

          <Text
            style={{
              color: "#3f3b38",
              fontSize: 14,
              marginBottom: 0,
              paddingBottom: 0,
              marginTop: 0,
              paddingTop: 0,
            }}
          >
            Report No
          </Text>
          <TextInput
            label="Reported By"
            editable={true}
            value={reportName}
            onChangeText={(text) => setreportName(text)}
          />
        </View>
      )}
    </View>
  );
};

export default function Helpdesk() {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const [loading, setLoading] = useState("");
  const navigation = useNavigation();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "newticket", title: "New Ticket" },
    { key: "status", title: "Status" },
  ]);
  const renderScene = SceneMap({
    newticket: SpecHelp,
    status: Friends,
  });

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={["right", "top", "left"]}
    >
      <Header
        // title={t('choose_friend')}
        title={t("helpdesk")} //belum ada lang translatenya
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
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
      />
    </SafeAreaView>
  );
}
