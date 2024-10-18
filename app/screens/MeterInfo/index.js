import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  ActivityIndicator,
  Modal,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Platform,
  Text,
  Button,
} from "react-native";

import { Card, Header } from "../../components";
import Icon from "react-native-vector-icons/FontAwesome";

// import {
//   Text,
//   NativeBaseProvider,
//   List,
//   Box,
//   Stack,
//   Heading,
//   Button
// } from 'native-base';

import { BaseStyle, useTheme, BaseColor } from "@config";
// import { ListItem } from 'react-native-elements'
// import numFormat from "@Component/numFormat";

const { height: deviceHeight, width: deviceWidth } = Dimensions.get("window");
import moment from "moment";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import Style from "./styles";
import { connect } from "react-redux";
import { API_URL_LOKAL } from "@env";

// import getUser from '../../selectors/UserSelectors';
// import {useSelector} from 'react-redux';
// const user = useSelector(state => getUser(state));
// const {colors} = useTheme();
let isMount = false;

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const color = useTheme();
    return <Component {...props} myHookValue={color} />;
  };
}

// class MyComponent extends React.Component {
//   render(){
//     const myHookValue = this.props.myHookValue;
//     return <div>{myHookValue}</div>;
//   }
// }

// export default withMyHook(MyComponent);

class MeterInfo extends React.Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: "Meter Info",
        },
      },
      bottomTabs: {
        visible: false,
        drawBehind: true,
        animate: true,
      },
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      mounted: false,
      isDisabled: false,
      isLoaded: true,
      isVisible: false,
      spinner: true,

      username: "",
      email: "",
      token: "",
      userId: "",
      project_descs: "",

      dataMeter: [],
      dataProject: [],
      currentdate: [],
      docdate: [],
      mbalamt: [],
      duedate: [],
      due_date: [],

      // untuk tanggalan
      chooseMonths: "",
      defaultMonths: [
        { value: "1", descs: "January" },
        { value: "2", descs: "February" },
        { value: "3", descs: "March" },
        { value: "4", descs: "April" },
        { value: "5", descs: "May" },
        { value: "6", descs: "June" },
        { value: "7", descs: "July" },
        { value: "8", descs: "August" },
        { value: "9", descs: "September" },
        { value: "10", descs: "October" },
        { value: "11", descs: "November" },
        { value: "12", descs: "December" },
      ],
      defaultYears: moment(new Date()).format("YYYY"),
      getYears: "",

      toMonth: moment(new Date()).format("MM"),
      toYears: moment(new Date()).format("YYYY"),
      toMonthName: moment(new Date()).format("MMMM"),

      selectedIndex: 0,
      customStyleIndex: 0,
      setSelectedLanguage: 0,
      selectedLanguage: 0,
      setVisible: false,
      userIDs: "A0101",
      doc_nos: "WE10281173",
      trxtypes: "O113",
    };
  }
  // ---------------- FUNCTION FOR GET API ----------------------
  async componentDidMount() {
    console.log("138 run: ");
    isMount = true;
    this.setState(() => this.getProject());

    //const color = this.props.myHookValue;
    const color = useTheme();
    console.log("303 color: " + color);
  }

  getProject = () => {
    const userData = this.props.user;
    const getEmail = userData.user.user;

    console.log("check User", getEmail);

    fetch(API_URL_LOKAL + "/getProject" + "/" + `${getEmail}`, {
      method: "GET",
      headers: this.state.hd,
    })
      .then((response) => response.json())
      .then((res) => {
        if (!res.Error) {
          let resData = res.Data;
          this.setState({
            dataProject: resData,
            spinner: false,
            isEmail: getEmail,
          });
          // ---- getMeterLoad baru di load jika data yang ada di getProject muncul.
          this.getMeterLoad(resData);
        } else {
          this.setState({ isLoaded: true }, () => {
            alert(res.Pesan);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getMeterLoad = (data) => {
    const entitycds = data[0].entity_cd;
    const projectnos = data[0].project_no;
    const emails = data[0].email;

    console.log("entity_cd", entitycds);
    console.log("project_no", projectnos);
    console.log("emails", emails);

    const { user } = this.props.user;
    const dates = {
      monthsNow: this.state.toMonth,
      yearsNow: this.state.toYears,
    };

    fetch(
      API_URL_LOKAL +
        "/modules/meter/data-filter/IFCAPB/" +
        entitycds +
        "/" +
        projectnos +
        "/" +
        emails +
        "/" +
        dates.monthsNow +
        "/" +
        dates.yearsNow,
      {
        method: "GET",
        headers: this.state.hd,
      }
    )
      .then((response) => response.json())
      .then((res) => {
        if (!res.Error) {
          let resData = res.Data;
          this.setState({ dataMeter: resData, spinner: false });
          console.log("getMeterLoad", this.state.dataMeter);
        } else {
          this.setState({ isLoaded: true }, () => {
            // alert(res.Pesan);
          });
        }
        // console.log('getDuedate2', res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  showMode = (currentMode) => {
    this.state.setShow(true);
    this.state.setMode(currentMode);
  };

  showDatepicker = () => {
    this.showMode("date");
  };

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.startDate;
    this.state.setShow(Platform.OS === "ios");
    this.state.setDate(currentDate);
  };

  meterType(type) {
    if (type == "E") {
      return " KWH";
    }

    return " M3";
  }

  onRetrieve = () => {
    this.setState({ spinner: true });

    const data = {
      toEmail: this.state.isEmail,
      Entitycdz: this.state.dataProject[0].entity_cd,
      Projectnoz: this.state.dataProject[0].project_no,
      Monthz: this.state.chooseMonths,
      Yearz: this.state.getYears,
    };

    console.log("cek isi retrieve", data);
    fetch(
      API_URL_LOKAL +
        "/modules/meter/data-filter/IFCAPB/" +
        data.Entitycdz +
        "/" +
        data.Projectnoz +
        "/" +
        data.toEmail +
        "/" +
        data.Monthz +
        "/" +
        data.Yearz,
      {
        method: "GET",
        headers: this.state.hd,
      }
    )
      .then((response) => response.json())
      .then((res) => {
        console.log("cek isi RES", res);
        if (!res.Error) {
          let resData = res.Data;
          this.setState({ dataMeter: resData, spinner: false });
          // console.log('getMeterLoad', this);
        } else {
          this.setState({ isLoaded: true }, () => {
            alert(res.Pesan);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // ---------------- (end) FUNCTION FOR GET API ----------------------

  render() {
    // -------------- FOR CONST ------------------
    const { customStyleIndex } = this.state;
    // -------------- (end) FOR CONST ------------------

    return (
      <View>
        <ScrollView
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
            backgroundColor: BaseColor.whiteColor,
          }}
        >
          <View style={Style.wrap}>
            {/* <View style={Style.subWrap}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={Style.title}>Meter Utility</Text>
              </View>
            </View> */}
            <View style={Style.subWrap}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <Text style={Style.subTitle2}>Project</Text>
                <Picker
                  style={styles.Dropdown1}
                  mode={"dropdown"}
                  selectedValue={this.state.project_descs}
                  onValueChange={(val) => this.setState({ project_descs: val })}
                >
                  {/* <Picker.Item label="Ini Project 1" value="java" /> */}
                  {this.state.dataProject.map((data, key) => (
                    <Picker.Item
                      key={key}
                      label={data.descs}
                      value={data.project_no}
                    />
                  ))}
                  {/* <Picker.Item label="Ini Project 2" value="js" /> */}
                </Picker>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Montserrat-SemiBold",
                    color: "#4E4E4E",
                    marginTop: 5,
                  }}
                >
                  Month
                </Text>
                <Picker
                  style={styles.Dropdown2}
                  mode={"dropdown"}
                  selectedValue={
                    (this.state && this.state.chooseMonths) ||
                    this.state.toMonth
                  }
                  onValueChange={(val) => this.setState({ chooseMonths: val })}
                >
                  {this.state.defaultMonths.map((data, key) => (
                    <Picker.Item
                      key={key}
                      label={data.descs}
                      value={data.value}
                    />
                  ))}
                </Picker>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Montserrat-SemiBold",
                    color: "#4E4E4E",
                    marginTop: 5,
                  }}
                >
                  Years
                </Text>
                <TextInput
                  style={{
                    height: 40,
                    backgroundColor: "#f5f5f5",
                    color: "black",
                    paddingHorizontal: 10,
                    marginBottom: 10,
                    marginLeft: 18,
                    width: 248,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  placeholder={this.state.defaultYears}
                  placeholderTextColor="#a9a9a9"
                  // defaultValue={this.state.defaultYears}
                  value={this.state.getYears}
                  onChangeText={(val) => this.setState({ getYears: val })}
                />
              </View>
              <View
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
                    marginTop: 20,
                    backgroundColor: "#58D68D",
                    color: "black",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => this.onRetrieve()}
                >
                  <Text>Retrieve</Text>
                </TouchableOpacity>
              </View>
            </View>

            {customStyleIndex === 0 && (
              <View style={styles.listview}>
                {this.state.spinner ? (
                  <ActivityIndicator size="large" color="#37BEB7" />
                ) : (
                  this.state.dataMeter.map((data, key) => (
                    <View key={key} style={styles.card}>
                      <View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: "500",
                              textAlign: "left",
                            }}
                          >
                            {data.lot_no}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: "500",
                              textAlign: "right",
                              color: "#9B9B9B",
                            }}
                          >
                            {data.descs}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: "500",
                              textAlign: "left",
                              color: "#F99B23",
                            }}
                          >
                            {data.name}
                          </Text>
                          <View>
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: "500",
                                textAlign: "right",
                                color: "#9B9B9B",
                              }}
                            >
                              {data.meter_id}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            borderBottomWidth: 1,
                            borderBottomColor: "#F3F3F3",
                            marginTop: 5,
                          }}
                        />
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: 5,
                            justifyContent: "space-between",
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            {/* <Icon name="event" size={13} color="#9B9B9B"/> */}
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: "500",
                                textAlign: "left",
                                color: "#9B9B9B",
                              }}
                            >
                              {moment(data.doc_date).format("DD MMM YYYY")}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            {/* <Icon name="attach-money" size={13} color="#F99B23"/> */}
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: "500",
                                textAlign: "left",
                                color: "#333",
                              }}
                            >
                              {/* {numFormat(data.trx_amt)} */}
                              {data.trx_amt}
                            </Text>
                          </View>
                        </View>

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
                              fontSize: 12,
                              fontWeight: "500",
                            }}
                          >
                            Current
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: "500",
                            }}
                          >
                            Last
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: "500",
                            }}
                          >
                            Total x{parseInt(data.multiplier)}
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
                              fontSize: 12,
                              fontWeight: "500",
                              textAlign: "left",
                            }}
                          >
                            {data.curr_read + this.meterType(data.meter_type)}
                          </Text>
                          <Text>|</Text>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: "500",
                              textAlign: "left",
                            }}
                          >
                            {data.last_read + this.meterType(data.meter_type)}
                          </Text>
                          <Text>|</Text>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: "500",
                              textAlign: "left",
                            }}
                          >
                            {data.usage + this.meterType(data.meter_type)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))
                )}
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

//export default connect(mapStateToProps, null)(withMyHook(MeterInfo));
export default connect(mapStateToProps, null)(MeterInfo);

// export default Billing;
const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#fff",
    shadowOpacity: 0.5,
    // elevation:5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    margin: 10,
  },
  listview: {
    marginTop: "1%",
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
    // fontFamily: Fonts.type.sfuiDisplaySemibold,
    borderBottomWidth: 0,
    borderColor: "#DDD",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 18,
    width: 250,
    marginBottom: 10,
    marginLeft: 15,
    borderRadius: 5,
    textAlignVertical: "top",
    color: "#777777",
    // paddingLeft: Fonts.moderateScale(10),
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
});
