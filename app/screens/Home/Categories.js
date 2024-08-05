import { CategoryIconSoft, Text, Icon } from "@components";
import { FCategories } from "@data";
import React, { useState } from "react";
import {
  FlatList,
  View,
  Button,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useTranslation } from "react-i18next";
import Modal from "react-native-modal";
import styles from "./styles";
import getUser from "../../selectors/UserSelectors";
import { useSelector } from "react-redux";
import * as Utils from "@utils";
import { BaseColor, BaseStyle, Images, useTheme } from "@config";

const Categories = ({ style = {} }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const goToScreen = (name) => name && navigation.navigate(name);
  const [expand, setExpand] = useState(false);
  const user = useSelector((state) => getUser(state));
  console.log("user for user faccility ->", user);
  console.log("user for user Pesan_Facility ->", user.Pesan_Facility);
  // "Pesan_Facility": "Facility Not Available"

  // const user.UserFacility = 'Y';
  //dari database nih, sementara hardcode
  //valildasi menu facility, kalo facility nya sama, barti bisa masuk. kalo facilitynya beda, gabisa masuk
  const onExpand = () => {
    Utils.enableExperimental();
    setExpand(true);
  };

  return (
    <View>
      <View style={[{ flexDirection: "row" }, style]}>
        <FlatList
          data={FCategories}
          renderItem={({ item }) => (
            // console.log(
            //   'coba userfacility == user_facility,',
            //   user.UserFacility != item.user_facility,
            // ),
            // console.log(
            //   'coba userfacility == user_menu,',
            //   user.UserFacility == item.user_menu,
            // ),
            <View
              style={{
                flex: 1,
                marginVertical: 12,
                // marginHorizontal: 20,
                // width: 60,
                // alignItems: 'center',
                // justifyContent: 'center',
              }}
            >
              <CategoryIconSoft
                isRound
                // icon={item.icon}
                style={{ padding: 0 }}
                icon_url={item.icon_url}
                icon={item.icon}
                title={t(item.title)}
                onPress={() =>
                  user.UserFacility == item.user_facility ||
                  item.user_menu == "Y"
                    ? goToScreen(item.screen)
                    : onExpand(user.Pesan_Facility)
                }
              />
            </View>
          )}
          //Setting the number of column
          numColumns={4}
          keyExtractor={(item, index) => index}
        />
      </View>

      <View>
        <Modal isVisible={expand}>
          <View
            style={{
              // flex: 1,
              backgroundColor: "#fff",
              height: 150,
              width: "90%",
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
              borderRadius: 8,
            }}
          >
            <Icon
              name="sad-tear"
              size={30}
              color={colors.primary}
              enableRTL={true}
              style={{ marginBottom: 10 }}
            />
            <Text>{user.Pesan_Facility}</Text>

            <View
              style={{
                position: "absolute",
                right: 25,
                bottom: 15,
              }}
            >
              <TouchableOpacity onPress={() => setExpand(false)}>
                <Text>OK</Text>
              </TouchableOpacity>
            </View>
            {/* <Button title="Hide modal" /> */}
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default Categories;
