import {
  Header,
  Icon,
  ListThumbCircleNotif,
  SafeAreaView,
  Text,
  Button,
} from "@/components";
import { BaseColor, BaseStyle, useTheme } from "@/config";
// Load sample data
// import {NotificationData} from '@/data';
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
} from "react-native";
import { useTranslation } from "react-i18next";
import { Card } from "react-native-paper";
import { useSelector } from "react-redux";
import axios from "axios";
// import getUser from '../../selectors/UserSelectors';
//import { API_URL_LOKAL } from "@env";
import httpClient from "../../controllers/HttpClient";
import numFormattanpaRupiah from "../../components/numFormattanpaRupiah";

const fileDummy = [
  {
    rowId: "1",
    descs: "descs meter",
    url_link: "",
  },
];

const AttachmentBilling = (props) => {
  const { navigation, route } = props;
  console.log("route params", route);
  //   const url_attachment = route.params;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [attachment, setAttachment] = useState([]);
  const [hasError, setErrors] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const stateReduxChoosedProject = useSelector(
    (state) => state.Dataproject.chooseProject
  );
  const datadetailNotDue = route.params.datadetailNotDue;
  const replaceTotal_notdue = route.params.replaceTotal_notdue;
  const [price, setPrice] = useState("");
  console.log("54 route.params: ", route.params);

  const [backgroundColor, setBackgroundColor] = useState(colors.background); // Default background color

  const changeBackgroundColor = () => {
    setBackgroundColor("#28a745"); // Set to active color
    setTimeout(() => {
      setBackgroundColor(colors.background); // Revert back to default color after 1 second
    }, 1000); // Duration in milliseconds
  };

  useEffect(() => {
    loadData();
  }, []);

  const clickPayment = () => {
    Alert.alert(
      "Confirm Payment",
      "Are you sure you want to pay?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Payment cancelled"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () =>
            alert(
              "Succes paid to this invoice with the price: Rp. " +
                formatNumber(price)
            ),
          style: "default",
        },
      ],
      { cancelable: false } // Prevent dismissing the alert by tapping outside
    );
  };

  const loadData = async () => {
    await getAttachment();
  };

  const getAttachment = async () => {
    const entity_cd = route.params.entity_cd; //route.params.entity_cd;
    const project_no = route.params.project_no; //route.params.project_no;
    const debtor_acct = route.params.debtor_acct;
    const doc_no = route.params.doc_no;

    console.log("60 attachment: ", entity_cd, project_no, debtor_acct, doc_no);

    // console.log(
    //   'params api attach',
    //   API_URL_LOKAL +
    //     `/getDataAttach/IFCAPB/${entity_cd}/${project_no}/${debtor_acct}/${doc_no}`,
    // );
    try {
      // const res = await axios.get(
      //   API_URL_LOKAL +
      //     ` /getDataAttach/IFCAPB/${entity_cd}/${project_no}/${debtor_acct}/${doc_no}`,
      // );

      // /modules/billing/attach?entity_cd=1001&project_no=1001001&debtor_acct=GSE/AA-50/1&doc_no=BL23090008

      const res = await httpClient.request({
        url: `/modules/billing/attach?entity_cd=${entity_cd}&project_no=${project_no}&debtor_acct=${debtor_acct}&doc_no=${doc_no}`,
        method: "GET",
      });

      console.log("60 attachment: res: ", res.data.data);
      setAttachment(res.data.data);
    } catch (error) {
      console.log("60 attachment: error: ", error);
      setErrors(error.response.data.message);
      // alert(hasError.toString());
    }
  };

  const openAttach = (item) => {
    console.log("itm", item);
    navigation.navigate("PDFAttach", item);
  };

  function removeAfterDot(input) {
    const index = input.indexOf(".");
    //alert('index +',index);
    if (index !== -1) {
      return input.substring(0, index); // Return substring before the dot
    }
    return input; // Return original string if no dot is found
  }

  const handleChangePrice = (text) => {
    // Example usage
    const valueHasilConvert = removeAfterDot(datadetailNotDue[0].mdoc_amt);

    // Remove all non-numeric characters
    const numericValue = text.replace(/\D/g, "");

    if (parseInt(valueHasilConvert) < parseInt(numericValue)) {
      alert("Price cannot be higher than the original price");
      return;
    }

    // Use a regular expression to allow only numbers
    const regex = /^[0-9]*$/;
    if (regex.test(numericValue) || numericValue === "") {
      setPrice(numericValue);
    } else {
      alert("Invalid Input", "Please enter only numbers.");
    }
  };

  // Function to format the number
  const formatNumber = (num) => {
    return new Intl.NumberFormat("de-DE").format(num); // Using German formatting
  };

  const renderItem = ({ item, index }) => {
    return (
      <Card key={index} style={{ paddingVertical: 20 }}>
        <TouchableOpacity
          onPress={() => {
            openAttach(item);
          }}
        >
          <View style={{ flexDirection: "row", flex: 1, marginHorizontal: 10 }}>
            <View style={{ justifyContent: "space-between", flex: 1 }}>
              <Text style={{ fontSize: 18, marginRight: 5 }} bold>
                {item.descs + " " + item.debtor_acct}
              </Text>
            </View>
            <Icon
              name="file-pdf"
              size={34}
              color={BaseColor.grayColor}
              enableRTL={true}
            />
          </View>
        </TouchableOpacity>
      </Card>
      //   <View key={index} style={{}}>
      //     <Text>{item.descs}</Text>
      //     <Text>{item.remark}</Text>
      //     <Text>{item.link_url}</Text>
      //   </View>
    );
  };

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={["right", "top", "left"]}
    >
      <Header
        title={"Payment Detail"}
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
        {"Invoice " + route.params.datadetailNotDue[0].doc_no}
      </Text>
      <View style={{ flex: 1, padding: 10 }}>
        {datadetailNotDue?.map((item, key) => (
          <View key={key}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                // paddingHorizontal: 10,
                paddingVertical: 5,
              }}
            >
              <View style={{ width: "50%", paddingLeft: 10 }}>
                <Text subhead>{item.descs}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",

                  width: "35%",
                }}
              >
                <Text>Rp. </Text>
                <Text subhead>
                  {/* {item.mbal_amt.replace(
                          /(\d)(?=(\d{3})+(?!\d))/g,
                          '$1.',
                        )} */}
                  {/* {numFormattanpaRupiah(item.mbal_amt)} */}
                  {numFormattanpaRupiah(item.mdoc_amt)}
                  {/* 100.000.000.00 */}
                </Text>
                {/* <Text subhead>{numFormat(item.mbal_amt)}</Text> */}
              </View>
            </View>
          </View>
        ))}
        <View
          style={{
            borderTopWidth: 0.5,
            borderStyle: "dashed",
            borderColor: colors.primary,
            marginLeft: 9,
          }}
        ></View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            // paddingHorizontal: 10,
            paddingVertical: 5,
          }}
        >
          <View style={{ width: "50%", paddingLeft: 10 }}>
            <Text subhead bold style={{ fontSize: 16 }}>
              Total
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",

              width: "35%",
            }}
          >
            <Text subhead bold style={{ fontSize: 16 }}>
              Rp.{" "}
            </Text>
            <Text subhead bold style={{ fontSize: 16 }}>
              {replaceTotal_notdue}
              {/* 100.000.000.00 */}
            </Text>
            {/* <Text subhead>{numFormat(item.mbal_amt)}</Text> */}
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            marginHorizontal: 20,
            alignItems: "center",
            //backgroundColor:'blue'
          }}
        >
          <Text subhead bold style={{ fontSize: 16 }}>
            Rp.{"   "}
          </Text>
          <TextInput
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 10,
              padding: 10,
              fontSize: 18,
              //marginRight: 10,
              backgroundColor,
              color: colors.text,
            }}
            //value={price}
            value={formatNumber(price)} // Format for display
            onChangeText={handleChangePrice}
            placeholder="Type a price"
            keyboardType="numeric"
          />
        </View>
        <Button
          style={{
            height: 35,
            margin: 10,
            marginTop: 30,
            width: "40%",
            alignSelf: "flex-end",
          }}
          onPress={() => {
            changeBackgroundColor();
            handleChangePrice(removeAfterDot(datadetailNotDue[0].mdoc_amt));
          }}
        >
          <Text style={{ color: "#fff", fontSize: 14 }}>Set to Full Price</Text>
        </Button>
        {/* <Text subhead bold style={{ fontSize: 16 }}>
          {price}
        </Text> */}
        <Button
          style={{ height: 45, margin: 10, marginTop: 20 }}
          onPress={() => clickPayment()}
        >
          <Text style={{ color: "#fff", fontSize: 14 }}>Pay</Text>
        </Button>
      </View>
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
