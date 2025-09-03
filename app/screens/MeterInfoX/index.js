import {
  FilterESort,
  ProductBlock,
  ProductGrid2,
  SafeAreaView,
  Tag,
  Header,
  Icon,
  Text,
  Button,
  CardBooking,
  FormCounterSelect,
} from "@/components";
import {
  StyleSheet,
  Dimensions,
  FlatList,
  RefreshControl,
  View,
  TextInput,
  ScrollView,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { BaseStyle, useTheme, BaseColor } from "@/config";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
// react native select dropdown
import getUser from "../../selectors/UserSelectors";
import getProject from "../../selectors/ProjectSelector";
import React, {
  Fragment,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
const { height: deviceHeight, width: deviceWidth } = Dimensions.get("window");
import moment from "moment";
import httpClient from "../../controllers/HttpClient";

const MeterInfoX = (params) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const nowMonth = moment(new Date()).format("MM");
  const lastMonth = moment().subtract(1, "months").format("MM");

  // alert('55'+nowMonth)
  const [chooseMonths, setChooseMonths] = useState(lastMonth);
  const nowYears = moment(new Date()).format("YYYY");
  const [getYears, setGetYears] = useState(nowYears);
  const projectSelector = useSelector((state) => getProject(state));
  const user = useSelector((state) => getUser(state));
  const [email, setEmail] = useState(user != null ? user.email : "");
  const [dataMeter, setDataMeter] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [spinner, setSpinner] = useState(false);

  const stateReduxChoosedUnit = useSelector(
    (state) => state.Dataproject.choosedUnit
  );

  // const toMonth = moment(new Date()).format("MM");

  const toMonthName = moment(new Date()).format("MMMM");

  const customStyleIndex = 0;

  const meterType = (type) => {
    if (type == "E") {
      return "kWh";
    } else {
      return "m3";
    }
  };
  const defaultMonths = [
    { value: "01", descs: "January" },
    { value: "02", descs: "February" },
    { value: "03", descs: "March" },
    { value: "04", descs: "April" },
    { value: "05", descs: "May" },
    { value: "06", descs: "June" },
    { value: "07", descs: "July" },
    { value: "08", descs: "August" },
    { value: "09", descs: "September" },
    { value: "10", descs: "October" },
    { value: "11", descs: "November" },
    { value: "12", descs: "December" },
  ];

  const defaultYears = moment(new Date()).format("YYYY");

  const onRetrieve = (val = null, year = null) => {
    // alert(JSON.stringify({getYears, chooseMonths, toMonth }));
    if (!getYears || !chooseMonths) {
      alert("Please fill in Years and Month");
    } else {
      setSpinner(true);

      const Entitycdz = stateReduxChoosedUnit.entity_cd;
      const Projectnoz = stateReduxChoosedUnit.project_no;
      const lot_no = stateReduxChoosedUnit.lot_no;

      const dataParams = {
        entity_cd: Entitycdz,
        project_no: Projectnoz,
        email: email,
        month: val ? val : chooseMonths,
        year: year ? year : getYears,
        lot_no: lot_no,
      };
      // alert(JSON.stringify(dataParams));
      httpClient
        .request({
          url: `/modules/mu/get-detail`,
          method: "GET",
          params: dataParams,
        })
        .then((res) => {
          // alert(JSON.stringify(res));
          if (res.data.success) {
            let resData = res.data.data;
            let resMessage = res.data.message;
            setDataMeter(resData);
            setErrorMsg("");
            setSpinner(false);
          } else {
            setDataMeter([]);
            setErrorMsg(res.data.message);
            setSpinner(false);
          }
        })
        .catch((error) => {
          // alert(error?.message);
          setErrorMsg(JSON.stringify(error.message.response.data.message));
          setDataMeter([]);
          console.log(error);
          setSpinner(false);
        });
    }
  };

  useEffect(() => {
    onRetrieve();
  }, []);

  return (
    <SafeAreaView>
      <Header
        title={t("Meter Info "+stateReduxChoosedUnit.lot_no)}
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
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
        style={{
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 10,
          backgroundColor: colors.backgroundColor, //BaseColor.whiteColor,
          height: "100%",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            {/* <Text
              style={{
                fontSize: 16,
                fontFamily: "Montserrat-SemiBold",
                color: colors.background == "white" ? "#4E4E4E" : "white",
                marginTop: 15,
                //alignSelf: "baseline",
                //backgroundColor: "blue",
              }}
            >
              Years
            </Text> */}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            {/* <Text
              style={{
                fontSize: 16,
                fontFamily: "Montserrat-SemiBold",
                color: colors.background == "white" ? "#4E4E4E" : "white",
                marginTop: 15,
                //alignSelf: "center",
              }}
            >
              Month
            </Text> */}
            <View
              style={{
                borderRadius: 10,
                overflow: "hidden",
                marginBottom: 12,
                marginLeft: 15,
              }}
            >
              <Picker
                style={[
                  styles.Dropdown2,
                  {
                    backgroundColor:
                      colors.background == "white" ? "#f0f0f0" : "#323232",
                    //color: colors.background == "white" ? "#777777" : "white",
                    color: colors.text,
                  },
                ]}
                itemStyle={{ color: colors.text }}
                mode={"dropdown"}
                selectedValue={chooseMonths}
                onValueChange={(val) => {
                  if (chooseMonths != val) {
                    onRetrieve(val);
                    setChooseMonths(val);
                  }
                }}
              >
                {defaultMonths.map((data, key) => (
                  <Picker.Item
                    //style={{ color: "white" }}
                    key={key}
                    label={data.descs}
                    value={data.value}
                  />
                ))}
              </Picker>
            </View>
            <TextInput
              style={{
                height: 55,
                backgroundColor:
                  colors.background == "white" ? "#f5f5f5" : "#323232",
                color: colors.background == "white" ? "black" : "white",
                marginBottom: 10,
                marginLeft: 20,
                width: 70,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                textAlign: "center",
                fontSize: 18,
                padding: 10,
                alignSelf: "center",
              }}
              // placeholder="YYYY"
              placeholderTextColor="#a9a9a9"
              defaultValue={getYears}
              // value={getYears}
              keyboardType="numeric"
              onChangeText={(val) => {
                if (val.length == 4) {
                  if (getYears != val) {
                    onRetrieve(null, val);
                    setGetYears(val);
                  }
                }
              }}
            />
          </View>
        </View>
        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={Style.title}></Text>
          <TouchableOpacity
            style={{
              width: 100,
              height: 45,
              alignSelf: "center",
              marginTop: 0,
              backgroundColor: "#58D68D",
              color: "black",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 30,
              borderRadius: 10,
              marginRight: 20,
            }}
            onPress={() => onRetrieve()}
          >
            <Text
              style={{
                fontSize: 18,
                color: "black",
              }}
            >
              Retrieve
            </Text>
          </TouchableOpacity>
        </View> */}
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            textAlign: "left",
            color: colors.text,
            marginHorizontal: 15,
          }}
        >
          Data Meter ({dataMeter.length}) :
        </Text>
        {customStyleIndex === 0 && (
          <ScrollView style={styles.listview}>
            {spinner ? (
              <ActivityIndicator size="large" color="#37BEB7" />
            ) : errorMsg ? (
              <Text
                style={{
                  marginTop: 15,
                  textAlign: "center",
                  backgroundColor: colors.primary,
                  color: colors.text,
                  padding: 10,
                  borderRadius: 10,
                  marginHorizontal: 10,

                  borderColor: colors.primary,
                  backgroundColor: colors.background, // Card's background color
                  shadowColor: "#000", // Shadow color for iOS and Android
                  shadowOffset: { width: 0, height: 2 }, // Shadow offset
                  shadowOpacity: 0.2, // Shadow opacity (iOS)
                  shadowRadius: 5, // Shadow blur (iOS)
                  elevation: 3,
                  borderWidth: colors.background == "#010101" ? 1 : 0,
                  marginBottom:10
                }}
              >
                {errorMsg}
              </Text>
            ) : dataMeter != null ? (
              dataMeter.map((data, key) => {
                return (
                  <View
                    key={key}
                    style={{
                      ...styles.card,
                      backgroundColor: colors.background,

                      borderColor: colors.primary,
                      backgroundColor: colors.background, // Card's background color
                      shadowColor: "#000", // Shadow color for iOS and Android
                      shadowOffset: { width: 0, height: 2 }, // Shadow offset
                      shadowOpacity: 0.2, // Shadow opacity (iOS)
                      shadowRadius: 5, // Shadow blur (iOS)
                      elevation: 3,
                      borderWidth: colors.background == "#010101" ? 1 : 0,
                    }}
                  >
                    <View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: "500",
                            textAlign: "left",
                            color: colors.text,
                          }}
                        >
                          {data.meter_id} ({meterType(data.meter_type)})
                        </Text>
                        <View>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: "500",
                              textAlign: "right",
                              color: colors.text,
                            }}
                          >
{moment(data.read_date).format("DD MMMM YYYY")}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          borderBottomWidth: 1,
                          borderBottomColor: colors.text,
                          marginTop: 5,
                        }}
                      />
         

                      {/* Title */}
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginTop: 8,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "500",
                            color: colors.text,
                          }}
                        >
                          Current 
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "500",
                            color: colors.text,
                          }}
                        >
                          Last
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "500",
                            color: colors.text,
                          }}
                        >
                          Usage
                        </Text>
                      </View>

                      {/* Value */}
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "500",
                            textAlign: "left",
                            color: colors.text,
                          }}
                        >
                          {parseFloat(data.curr_read).toFixed(2)}
                        </Text>
                        <Text
                          style={{
                            color: colors.text,
                          }}
                        >
                          |
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "500",
                            textAlign: "left",
                            color: colors.text,
                          }}
                        >
                          {parseFloat(data.last_read).toFixed(2)}
                        </Text>
                        <Text
                          style={{
                            color: colors.text,
                          }}
                        >
                          |
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "500",
                            textAlign: "left",
                            color: colors.text,
                          }}
                        >
                          {parseFloat(data.usage).toFixed(2)}
                        </Text>
                      </View>
                      <View style={{ alignItems: "center" }}>
                        <TouchableOpacity
                          activeOpacity={1}
                          style={styles.avatarContainer}
                          onPress={() =>
                            navigation.navigate("PreviewImageHome", {
                              images: data.file_url, // uri
                            })
                          }
                        >
                          <View>
                            <Image
                              style={styles.avatar}
                              source={{ uri: data.file_url }}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              })
            ) : null}
          </ScrollView>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MeterInfoX;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#fff",
    shadowOpacity: 0.5,
    // elevation:5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 15,
    margin: 10,
  },
  listview: {
    // marginTop: "1%",
    // height: "100%",
    marginBottom: 100,
  },
  listitemm: {
    height: 100,
  },
  input: {
    height: 40,
    backgroundColor: "#f5f5f5",
    color: "black",
    paddingHorizontal: 10,
    marginBottom: 10,
    marginLeft: 20,
    width: null,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  inputTime: {
    height: 40,
    backgroundColor: "#f5f5f5",
    color: "black",
    paddingHorizontal: 10,
    marginBottom: 16,
    width: deviceWidth * 0.4,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  inputUsage: {
    height: 40,
    color: "black",
    marginBottom: 16,
    // borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  inputDate: {
    height: 40,
    backgroundColor: "#f5f5f5",
    color: "black",
    paddingHorizontal: 10,
    marginBottom: 16,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "left",
  },
  btnMin: {
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: "#f1f1f1",
    width: deviceWidth * 0.08,
  },
  btnPlus: {
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#f1f1f1",
    width: deviceWidth * 0.08,
  },
  textBlack: {
    color: "#3f3b38",
    //fontFamily: 'Montserrat-Regular',
  },
  Dropdown1: {
    // fontFamily: Fonts.type.sfuiDisplaySemibold,
    borderBottomWidth: 0,
    borderColor: "#DDD",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 18,
    width: 250,
    marginBottom: 10,
    marginLeft: 10,
    borderRadius: 5,
    textAlignVertical: "top",
    color: "#777777",
    // paddingLeft: Fonts.moderateScale(10),
  },
  Dropdown2: {
    borderColor: "#DDD",
    backgroundColor: "#f0f0f0",
    fontSize: 18,
    width: 190,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  showPickerBtn: {
    height: 44,
    backgroundColor: "#973BC2",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  yearMonthText: {
    fontSize: 20,
    marginTop: 12,
  },
  avatar: {
    width: deviceWidth - 100,
    height: 200,
    borderRadius: 5,
  },
  avatarContainer: {
    width: deviceWidth - 100,
    marginVertical: 10,
    marginTop: 15,
    borderColor: "#9B9B9B",
    borderWidth: 0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    height: 200,
    backgroundColor: "white",
  },
});
