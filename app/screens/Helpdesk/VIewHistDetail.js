import {
  Header,
  Icon,
  ListTextButton,
  SafeAreaView,
  TabSlider,
  Tag,
  TextInput,
  PlaceholderLine,
  Placeholder,
  Text,
} from "@/components";
import { BaseColor, BaseStyle, useTheme } from "@/config";
import { FFriends } from "@/data";
import { useNavigation } from "@react-navigation/native";
import { haveChildren } from "@/utils";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
} from "react-native";
import { SceneMap } from "react-native-tab-view";
import client from "../../controllers/HttpClient";
import { useSelector } from "react-redux";
import getUser from "../../selectors/UserSelectors";
import axios from "axios";

import moment from "moment";
import { baseURL as API_URL_LOKAL } from "@/controllers/HttpClient";

const Detail = (dataTiketPassProp) => {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const [keyword, setKeyword] = useState("");
  const [friends, setFriends] = useState(FFriends);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  const [spinner, setSpinner] = useState(true);
  const [urlApi, seturlApi] = useState(client);
  const users = useSelector((state) => getUser(state));
  const [email, setEmail] = useState(users.user);

  const [dataTowerUser, setdataTowerUser] = useState([]);
  const [arrDataTowerUser, setArrDataTowerUser] = useState([]);

  const [isImageViewVisible, setImageViewVisible] = useState();

  const [url_image, setUrl_Image] = useState();

  const [dataTiketMulti, setDataTiketMulti] = useState([]);
  const [dataImageMulti, setDataImageMulti] = useState([]);
  const [dataAction, setDataAction] = useState([]);
  //   const [dataTiketPassProp, setDataTiketPassProp] = useState(route.params);
  console.log("data tiket passprop", dataTiketPassProp);

  const deviceWidth = Dimensions.get("window").width;
  const widthStyle = {
    width: (deviceWidth * 2) / 5,
    // width: deviceWidth / 2,
  };

  const filterCategory = (text) => {
    setKeyword(text);
    if (text) {
      setFriends(
        FFriends.filter(
          (item) =>
            haveChildren(item.name, text) || haveChildren(item.total, text)
        )
      );
    } else {
      setFriends(FFriends);
    }
  };

  const onSend = () => {
    navigation.navigate("FSendMoney");
  };

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

  const getTicketDetailMulti = async (data) => {
    console.log("data from props", data.dataTiketPassProp);
    const formData = {
      entity: data.entity_cd,
      project: data.project_no,
      report_no: data.report_no,
      email: email,
    };

    // console.log('form data multi', formData);

    const config = {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        token: "",
      },
    };

    await axios
      .post(
        API_URL_LOKAL + "/modules/cs/ticket-all-by-report/IFCAPB",
        formData,
        {
          config,
        }
      )
      .then((res) => {
        // console.log('res tiket multi', res.data);
        const resTiketMulti = res.data.Data[0];
        const resImageMulti = res.data.DataImage;
        const resDataAction = res.data.DataAction;

        console.log("resImageMulti", resImageMulti);
        // console.log('resDataAction', resDataAction);

        setDataTiketMulti(resTiketMulti);
        setDataImageMulti(resImageMulti);
        setDataAction(resDataAction);
        setSpinner(false);
        // return res.data;
      })
      .catch((error) => {
        console.log("err data multi", error);
        // alert('error nih');
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      getTower(users);
      setImageViewVisible(false); // getCategoryHelp;
      // setSpinner(false);
      //   console.log('routeparams', route.params);
      //   setDataHistoryStatus(route.params);
      getTicketDetailMulti(dataTiketPassProp);
    }, 3000);
  }, []);

  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      {spinner ? (
        <View>
          {/* <Spinner visible={this.state.spinner} /> */}
          <Placeholder style={{ marginVertical: 4, paddingHorizontal: 10 }}>
            <PlaceholderLine width={100} noMargin style={{ height: 40 }} />
          </Placeholder>
        </View>
      ) : (
        <ScrollView>
          <View style={{ margin: 5, paddingRight: 10 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={widthStyle}>
                <Text>Ticket No</Text>
              </View>
              <View style={{ width: 10 }}>
                <Text>:</Text>
              </View>
              <View>
                <Text style={{ fontWeight: "bold" }}>
                  # {dataTiketMulti.report_no}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={widthStyle}>
                <Text>Date</Text>
              </View>
              <View style={{ width: 10 }}>
                <Text>:</Text>
              </View>
              <View>
                <Text>
                  {moment(dataTiketMulti.reported_date).format(
                    "DD-MM-YYYY HH:mm"
                  )}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={widthStyle}>
                <Text>Name</Text>
              </View>
              <View style={{ width: 10 }}>
                <Text>:</Text>
              </View>
              <View>
                <Text>{dataTiketMulti.name}</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={widthStyle}>
                <Text>Unit</Text>
              </View>
              <View style={{ width: 10 }}>
                <Text>:</Text>
              </View>
              <View>
                <Text>{dataTiketMulti.lot_no}</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={widthStyle}>
                <Text>Contact No</Text>
              </View>
              <View style={{ width: 10 }}>
                <Text>:</Text>
              </View>
              <View>
                <Text>{dataTiketMulti.contact_no}</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={widthStyle}>
                <Text>Reported By</Text>
              </View>
              <View style={{ width: 10 }}>
                <Text>:</Text>
              </View>
              <View>
                <Text>{dataTiketPassProp.reported_by}</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                // width: '60%', //sementara, kalo udah ada isinya, ini di hide lagi
              }}
            >
              <View style={widthStyle}>
                <Text>Complain Type</Text>
              </View>
              <View style={{ width: 10 }}>
                <Text>:</Text>
              </View>
              <View>
                <Text style={{ flexWrap: "wrap" }}>
                  Requested
                  {/* hardcode coy */}
                  {/* dari get data multi gak ada complain_type? */}
                  {/* {dataTiketMulti.status == 'C' ? 'Complain' : 'Request'} */}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={widthStyle}>
                <Text>Category</Text>
              </View>
              <View style={{ width: 10 }}>
                <Text>:</Text>
              </View>
              <View>
                <Text>{dataTiketMulti.category}</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={widthStyle}>
                <Text>Status</Text>
              </View>
              <View style={{ width: 10 }}>
                <Text>:</Text>
              </View>
              <View>
                <Text>
                  {dataTiketMulti.status == "R"
                    ? "Open"
                    : dataTiketMulti.status == "A"
                    ? "Assign"
                    : dataTiketMulti.status == "S"
                    ? "Need Confirmation"
                    : dataTiketMulti.status == "P"
                    ? "Process"
                    : dataTiketMulti.status == "F"
                    ? "Confirm"
                    : // : dataTiketMulti.status == "V"
                    // ? "Solve"
                    dataTiketMulti.status == "V"
                    ? "Cancel"
                    : dataTiketMulti.status == "C"
                    ? "Close"
                    : dataTiketMulti.status == "D"
                    ? "Completed"
                    : ""}
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <View>
                <Text>Work Requested</Text>
              </View>
              <View>
                <View
                  style={{
                    width: "100%",
                    height: "auto",
                    borderColor: "#555",
                    borderRadius: 10,
                    borderWidth: 1,
                    padding: 5,
                  }}
                >
                  <Text style={{ width: "100%" }}>
                    {dataTiketMulti.work_requested}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                paddingTop: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {dataImageMulti.map((data, index) => (
                <TouchableOpacity
                  onPress={
                    (() => setImageViewVisible(true),
                    setUrl_Image(data.file_url))
                  }
                  key={index}
                >
                  <View style={{ flexDirection: "column" }}>
                    <Image
                      source={{ uri: data.file_url }}
                      style={{
                        width: 200,
                        height: 100,
                        resizeMode: "center",
                      }}
                    ></Image>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            {/* //contoh image slider view */}
            {/* <View style={{flexDirection: 'row', marginTop: 10}}>
                    <ScrollView horizontal>
                      {imagesDummy.map((item, key) => {
                        return (
                          <TouchableOpacity
                            key={key}
                            //   style={{flex: 1}}
                            activeOpacity={1}
                            onPress={() =>
                              navigation.navigate('PreviewImage', {
                                images: imagesDummy,
                              })
                            }>
                            <Image
                              key={key}
                              style={{width: 100, height: 100}}
                              source={item.image}
                            />
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                  </View>
                  */}
            {/* //contoh image slider view */}

            {/* //contoh bikin signature  dtaro  sini */}
            {/* {
                    (dataTiketMulti.status == 'A',
                    'P',
                    'M',
                    'F',
                    'Y',
                    'Z' ? (
                      <View>
                        <Button>
                          <Text>{dataTiketMulti.status} ada</Text>
                        </Button>
                      </View>
                    ) : (
                      <Text>{dataTiketMulti.status} gada</Text>
                    ))
                  } */}
            {/* //contoh bikin signature  dtaro  sini */}

            {/* //contoh image slider view */}
            {/* <View style={{marginTop: 50}}>
                    <Text style={{fontWeight: 'bold'}}>Finish of Services</Text>
                  </View>
                  <View style={{flexDirection: 'row', marginTop: 10}}>
                    <ScrollView horizontal>
                      {imagesDummy.map((item, key) => {
                        return (
                          <TouchableOpacity
                            key={key}
                            //   style={{flex: 1}}
                            activeOpacity={1}
                            onPress={() =>
                              navigation.navigate('PreviewImage', {
                                images: imagesDummy,
                              })
                            }>
                            <Image
                              key={key}
                              style={{width: 100, height: 100}}
                              source={item.image}
                            />
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                  </View> */}
            {/* //contoh image slider view */}
          </View>
        </ScrollView>
      )}
    </View>
  );
};
const Feedback = () => {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const [keyword, setKeyword] = useState("");
  const [friends, setFriends] = useState(FFriends);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  const [spinner, setSpinner] = useState(true);
  const [urlApi, seturlApi] = useState(API_URL);
  const users = useSelector((state) => getUser(state));
  const [email, setEmail] = useState(users.user);

  const [dataTowerUser, setdataTowerUser] = useState([]);
  const [arrDataTowerUser, setArrDataTowerUser] = useState([]);

  const [isImageViewVisible, setImageViewVisible] = useState();

  const [url_image, setUrl_Image] = useState();

  const filterCategory = (text) => {
    setKeyword(text);
    if (text) {
      setFriends(
        FFriends.filter(
          (item) =>
            haveChildren(item.name, text) || haveChildren(item.total, text)
        )
      );
    } else {
      setFriends(FFriends);
    }
  };

  const onSend = () => {
    navigation.navigate("FSendMoney");
  };

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

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      getTower(users);
      setImageViewVisible(false); // getCategoryHelp;
      // setSpinner(false);
      //   console.log('routeparams', route.params);
      //   setDataHistoryStatus(route.params);
      //   getTicketDetailMulti(route.params);
    }, 3000);
  }, []);

  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      {spinner ? (
        <View>
          {/* <Spinner visible={this.state.spinner} /> */}
          <Placeholder style={{ marginVertical: 4, paddingHorizontal: 10 }}>
            <PlaceholderLine width={100} noMargin style={{ height: 40 }} />
          </Placeholder>
        </View>
      ) : (
        <ScrollView>
          <View>
            <Text>Halo</Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default function ViewHistDetail({ route }) {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const [loading, setLoading] = useState("");
  const navigation = useNavigation();

  const [dataTiketPassProp, setDataTiketPassProp] = useState(route.params);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "detail", title: "Detail", dataTiketPassProp: dataTiketPassProp },
    { key: "feedback", title: "Feedback" },
  ]);
  const renderScene = SceneMap({
    detail: Detail,
    feedback: Feedback,
  });

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={["right", "top", "left"]}
    >
      <Header
        title={t("status")}
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
