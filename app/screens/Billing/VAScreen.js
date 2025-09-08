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
} from "react-native";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Clipboard from "@react-native-clipboard/clipboard";
import { pdfSourceFunc } from "./pdfSourceFunc";

const VAScreen = (props) => {
  const { navigation, route } = props;
  console.log("30 route params", route);
  const { t } = useTranslation();
  const { colors } = useTheme();
  const stateReduxChoosedProject = useSelector(
    (state) => state.Dataproject.chooseProject
  );
  const replaceTotal_notdue = route.params.replaceTotal_notdue;
  console.log("75VAS route.params: ", route?.params);

  const pdfSource = pdfSourceFunc(route.params.paymentMethod.payment_channel);

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    Alert.alert("Copied!", '"' + text + '" has been copied to clipboard.');
  };

  useEffect(() => {}, []);

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={["top", "right", "bottom", "left"]}
    >
      <Header
        title={"Payment"}
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
          //navigation.goBack();
          navigation.pop(3);
        }}
      />
      <Text subhead bold style={{ textAlign: "center", marginBottom: 10 }}>
        {"Invoice " + route.params.datadetailNotDue[0].doc_no}
      </Text>
      <View
        style={{
          // flex: 1,
          margin: 20,

          backgroundColor: colors.background,
          borderRadius: 10,
          elevation: 3, // For Android shadow
          shadowColor: colors.text, // For iOS shadow
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.7,
          shadowRadius: 2,
          margin: 20,
          padding: 15,
        }}
      >
        <Text
          style={{
            marginBottom: 20,
            //textAlign: "center",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          {route.params.paymentMethod.payment_channel}
        </Text>
        <Text>Virtual Account Number</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text>{route.params.VA}</Text>
          <Button
            style={{
              height: 40,
              alignSelf: "center",
            }}
            onPress={() => copyToClipboard(route.params.VA)}
          >
            <Icon
              name="copy"
              size={20}
              color={colors.background}
              enableRTL={true}
            />
          </Button>
        </View>
        <View>
          <Text
            style={{
              marginTop: 10,
            }}
          >
            Total Payment
          </Text>
          <View
            style={{
              paddingVertical: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text>Rp {replaceTotal_notdue}</Text>
          </View>
        </View>
        {pdfSource.uri == "" ? null : (
          <Button
            style={{
              height: 40,
              margin: 10,
              marginTop: 30,
              alignSelf: "center",
            }}
            onPress={() =>
              navigation.navigate("PDFShow", {
                title: "Cara Bayar",
                pdfSource,
                merchant: route.params.paymentMethod.payment_channel,
              })
            }
          >
            <Text style={{ color: "#fff", fontSize: 14 }}>See How to Pay</Text>
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
};

export default VAScreen;
