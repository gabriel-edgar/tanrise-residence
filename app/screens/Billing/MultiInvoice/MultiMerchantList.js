import {
  Header,
  Icon,
  ListThumbCircleNotif,
  SafeAreaView,
  Text,
  Button,
} from "@/components";
import { BaseColor, BaseStyle, useTheme } from "@/config";
import React, { useState, useEffect } from "react";
import {
  FlatList,
  RefreshControl,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  Alert,
  Linking,
  Modal,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import httpClient from "../../../controllers/HttpClient";
import numFormattanpaRupiah from "../../../components/numFormattanpaRupiah";
import CheckBox from "@react-native-community/checkbox";
import getUser from "../../../selectors/UserSelectors";
import { transparent } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";
import moment from "moment";

const AttachmentBilling = (props) => {
  const { navigation, route } = props;
  const { colors } = useTheme();
  const [hasError, setErrors] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const reduxProject = useSelector((state) => state.Dataproject.chooseProject);
  const params = route.params;
  const item = route.params.selectedInvoices[0];
  const replaceTotal_notdue = route.params.replaceTotal_notdue;

  const [backgroundColor, setBackgroundColor] = useState(colors.background); // Default background color

  // Sample data array
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentMethodList, setPaymentMethodList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentMethodError, setPaymentMethodError] = useState("");
  const [loadingMethod, setLoadingMethod] = useState(false);
  const user = useSelector((state) => getUser(state));

  const changeBackgroundColor = () => {
    setBackgroundColor("#28a745"); // Set to active color
    setTimeout(() => {
      setBackgroundColor(colors.background); // Revert back to default color after 1 second
    }, 1000); // Duration in milliseconds
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await getPaymentMethodList();
  };

  // Function to toggle checkbox
  const toggleCheckbox = (value) => {
    // const newData = dummyPaymentMethod.map((item) =>
    //   item.value === value ? { ...item, checked: !item.checked } : item
    // );
    setPaymentMethod(value);
  };

  const getPaymentMethodList = async () => {
    setLoadingMethod(true);
    try {
      const res = await httpClient.request({
        url: `/pg/get-payment-channel`,
        method: "GET",
        params: {
          entity_cd: reduxProject.entity_cd,
          project_no: reduxProject.project_no,
        },
      });

      console.log("60 PaymentMethodList: res: ", res.data.data);
      setPaymentMethodList(res.data.data);
      setPaymentMethodError("");
    } catch (error) {
      setPaymentMethodError(error.message);
      console.log("60 PaymentMethodList: error: ", error);
    }
    setLoadingMethod(false);
  };

  const handlePay = async () => {
    if (paymentMethod == null) {
      alert("Please select payment method");
      return;
    }

    if (user.Handphone == null || user.Handphone == "") {
      alert("Please add phone number in Edit Profile in Settings");
      return;
    }

    setLoading(true);

    const dataPostDummy = {
      entity_cd: "1004",
      project_no: "1004001",
      debtor_acct: "L-TR-09-07",
      debtor_name: "PT SARIGUNA PRIMATIRTA, Tbk",
      doc_no: "BL23090009",
      virtual_acct: "36040202400001234",
      doc_amt: "205000",
      payment_channel: "BRI",
      type_payment: "Close",
    };

    if (paymentMethod.payment_channel == "BNI") {
      try {
        const dataPost = {
          entity_cd: item.entity_cd,
          project_no: item.project_no,
          debtor_acct: item.debtor_acct,
          debtor_name: item.name,
          lot_no: item.lot_no,
          debtor_phone: user.Handphone,
          debtor_email: user.email,
          list_doc_no: params.selectedInvoices.map((item) => item.doc_no),
          total_amt: params?.totalAmtNumber,
          virtual_acct: "",
          payment_channel: paymentMethod.payment_channel,
          type_payment: "Close",
        };
        console.log("289 post", dataPost);
        alert(JSON.stringify(dataPost, null, 2));

        return;
        //post
        const res = await httpClient.request({
          url: `/modules/billing/store`,
          method: "POST",
          data: dataPost,
          //baseURL: "",
        });

        const condition = res.data.success;

        if (condition) {
          console.log("291 Pay1: res: ", res.data);
          const dataPay = res.data.data?.response_url;
          if (dataPay != null) {
            navigation.navigate("WebviewScreen", {
              title: "Payment Screen",
              doc_no: item.doc_no,
              url: dataPay,
            });
          }
        } else {
          alert(JSON.stringify(res.data?.message));
        }
      } catch (error) {
        const status = error.response.status
          ? "Status: " + error.response.status
          : "";
        alert(JSON.stringify(error.response.data.message) + "\n" + status);
      }
    } else {
      try {
        let dataVA;
        const dataGet = {
          entity_cd: item.entity_cd,
          project_no: item.project_no,
          lot_no: item.lot_no,
          bank_grp: paymentMethod.payment_channel,
        };
        const resGet = await httpClient.request({
          url: `/modules/billing/get-virtual-acc`,
          method: "GET",
          params: dataGet,
          //baseURL: "",
        });
        if (resGet.data.success == true) {
          dataVA = resGet.data.data?.virtual_acct;
        } else {
          alert("VA " + resGet.data.message);
          setLoading(false);
          return;
        }

        const dataPost = {
          entity_cd: item.entity_cd,
          project_no: item.project_no,
          debtor_acct: item.debtor_acct,
          debtor_name: item.name,
          lot_no: item.lot_no,
          debtor_phone: user.Handphone,
          debtor_email: user.email,
          virtual_acct: dataVA,
          list_doc_no: params.selectedInvoices.map((item) => item.doc_no),
          total_amt: params?.totalAmtNumber,
          payment_channel: paymentMethod.payment_channel,
          type_payment: "Close",
        };
        console.log("289 post", dataPost);
        alert(JSON.stringify(dataPost, null, 2));
        // Alert.alert('Data Post', JSON.stringify(dataPost, null, 2));

        return;
        //post
        const res = await httpClient.request({
          url: `/modules/billing/store`,
          method: "POST",
          data: dataPost,
          //baseURL: "",
        });

        const condition = res.data.success;

        if (condition) {
          console.log("60 Pay: res: ", res.data);
          const dataPay = res.data.data;
          navigation.navigate("VAScreen", {
            ...route.params,
            paymentMethod,
            VA: dataPost.virtual_acct,
            dataPay,
          });
        } else {
          alert(res.data.message);
        }
      } catch (error) {
        const status = error.response.status
          ? "Status: " + error.response.status
          : "";
        alert(JSON.stringify(error.response.data.message) + "\n" + status);
      }
    }
    setLoading(false);
  };

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={["right", "top", "left"]}
    >
      <Header
        title={"Payment Method"}
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
      <Text subhead bold style={{ textAlign: "center", marginBottom: 10 }}>
        {"Unit " + item.lot_no + " | "}
        {" All Invoice"}
      </Text>

      <ScrollView>
        <View style={{ marginHorizontal: 20 }}>
          {params.selectedInvoices.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 5,
                backgroundColor: colors.primary,
                paddingVertical: 10,
                paddingHorizontal: 10,
                // marginHorizontal: 5,
              }}
            >
              <Text style={{ color: "white", flex: 1, textAlign: "left" }}>
                {moment(item.doc_date).format("DD MMMM YYYY")}
              </Text>
              <Text style={{ color: "white", flex: 1, textAlign: "right" }}>
                {item.doc_no}
              </Text>
            </View>
          ))}
          <View
            style={{
              justifyContent: "space-between",
              marginTop: 7,
              paddingTop: 10,
              borderTopWidth: 0.5,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 15, marginTop: 10 }}>
              Payment
            </Text>
          </View>
          {loadingMethod ? (
            <ActivityIndicator></ActivityIndicator>
          ) : paymentMethodError ? (
            <>
              <Text style={{ textAlign: "center" }}>
                {"Payment method error: " + paymentMethodError}
              </Text>
              <Button
                style={{
                  height: 45,
                  margin: 10,
                  marginVertical: 30,
                  alignContent: "center",
                }}
                onPress={() => getPaymentMethodList()}
              >
                <Text style={{ color: "#fff", fontSize: 14 }}>
                  Refresh Method{" "}
                </Text>
              </Button>
            </>
          ) : null}
          {paymentMethodList?.length == 0 ? (
            <Text style={{ textAlign: "center" }}>
              Payment Channel not found for{"\n"} entity code {item.entity_cd}{" "}
              and project number {item.project_no}
            </Text>
          ) : (
            paymentMethodList?.map((item) => (
              <TouchableOpacity
                key={item.rowID}
                onPress={() => toggleCheckbox(item)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 15,
                  marginVertical: 8,
                  //backgroundColor: "#f9c2ff",
                  borderRadius: 5,
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                  }}
                >
                  {item.payment_channel}
                </Text>
                <CheckBox
                  value={item.payment_channel == paymentMethod?.payment_channel}
                  disabled={true} // Set the disabled prop
                  style={{ marginRight: 8 }}
                  tintColors={{
                    true: colors.primary,
                    false: colors.background != "white" ? "white" : "black",
                  }}
                />
              </TouchableOpacity>
            ))
          )}
          <View
            style={{
              justifyContent: "space-between",
              marginTop: 7,
              paddingTop: 20,
              borderTopWidth: 0.5,
              borderRadius: 10,
            }}
          >
            <Text
              style={{ fontWeight: "bold", fontSize: 15, marginBottom: 10 }}
            >
              Payment Summary
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>Total Payment:</Text>
              <Text>Rp {params.totalAmt}</Text>
            </View>
          </View>
          <View>
            <Button
              style={{
                opacity: loading ? 0.5 : 1,
                height: 45,
                margin: 10,
                marginVertical: 30,
                alignContent: "center",
              }}
              onPress={handlePay}
              disable={loading}
              loading={loading}
            >
              <Text style={{ color: "#fff", fontSize: 14 }}>Pay </Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AttachmentBilling;

const stylesCurrent = StyleSheet.create({
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
