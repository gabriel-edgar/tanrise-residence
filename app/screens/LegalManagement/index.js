import {
  Header,
  Icon,
  ListTextButton,
  SafeAreaView,
  Tag,
  Image,
  Text,
  Button,
  CategoryGrid,
  CategoryBoxColor,
  ModalFilterLocation,
} from "@components";

import { BaseColor, BaseStyle, useTheme } from "@config";
import { CheckBox } from "react-native-elements";
import { FFriends } from "@data";
import { useNavigation } from "@react-navigation/native";
import { haveChildren } from "@utils";
import React, { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { FlatList, TouchableOpacity, View, ScrollView } from "react-native";

import { SceneMap } from "react-native-tab-view";
import { useSelector } from "react-redux";
import getUser from "../../selectors/UserSelectors";
import axios from "axios";
import client from "../../controllers/HttpClient";
import styles from "./styles";
import ModalDropdown_debtor from "@components/ModalDropdown_debtor";
import ModalDropdown_lotno from "@components/ModalDropdown_lotno";

const Friends = () => {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const [keyword, setKeyword] = useState("");
  const [friends, setFriends] = useState(FFriends);
  const navigation = useNavigation();
  const onSend = () => {
    navigation.navigate("FSendMoney");
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
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

export default function Helpdesk() {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={["right", "top", "left"]}
    >
      <ScrollView>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Image
            source={require("@assets/images/contract.png")}
            style={{
              height: 300,
              width: 300,
              // marginHorizontal: 100,
              // flexDirection: 'row',
              resizeMode: "contain",
              // alignSelf: 'center',
            }}
          />
          <View style={{ marginTop: 10 }}>
            <Text
              style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}
            >
              Choose your Letter
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontSize: 16,
                fontWeight: "100",
                textAlign: "center",
              }}
            >
              Select the letter category
            </Text>
            <Text
              style={{ fontSize: 16, fontWeight: "100", textAlign: "center" }}
            >
              to continue with the next step
            </Text>
          </View>

          <View style={{ marginVertical: 20 }}>
            <TouchableOpacity
              style={{
                marginTop: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#315447",
                padding: 10,
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("RenovationPermit")}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "100", textAlign: "center" }}
              >
                Renovation Permit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginTop: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#315447",
                padding: 10,
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("FitOut")}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "100", textAlign: "center" }}
              >
                Fit Out
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginTop: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#315447",
                padding: 10,
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("EntryExit")}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "100", textAlign: "center" }}
              >
                Entry and Exit Permit of Goods
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginTop: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#315447",
                padding: 10,
                alignItems: "center",
              }}
              onPress={() => alert("Coming Soon")}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "100", textAlign: "center" }}
              >
                Other
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginTop: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#315447",
                padding: 10,
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("SuratIzinKerja")}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "100", textAlign: "center" }}
              >
                Surat Izin Kerja
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginTop: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#315447",
                padding: 10,
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("SuratIzinKeluarMasukBarang")}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "100", textAlign: "center" }}
              >
                Surat Izin Keluar / Masuk Barang
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
