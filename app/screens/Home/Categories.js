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
import Helpdesk from "../Helpdesk/index copy";

const Categories = ({ style = {}, menu = [], font }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { colors } = useTheme();

  const stateReduxChoosedProject = useSelector(
    (state) => state.Dataproject.chooseProject
  );

  const stateReduxChoosedUnit = useSelector(
    (state) => state.Dataproject.choosedUnit
  );

  const goToScreen = (name, item) => {
    if (
      (item.Title == "Helpdesk" || item.Title == "Help") &&
      !stateReduxChoosedProject
    ) {
      return alert("Please choose project first");
    }
    console.log("38 stateReduxChoosedUnit: ", stateReduxChoosedUnit);
    if (
      (item.Title == "Helpdesk" || item.Title == "Billing") &&
      Object?.keys(stateReduxChoosedUnit).length === 0
    ) {
      return alert("Please choose unit first");
    }

    name && navigation.navigate(name, { item: item });
  };

  //navigation.navigate('ChooseProject', {goTo: item.URL});
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

  const menuSandbox = {
    id: 123,
    Title: "SandBox",
    IconClass: "hotel",
    Screen: "SandBox",
    user_facility: "N",
    user_menu: "Y",
    //icon_url: require("../assets/images/icon_at_home/icon-6.jpeg"),
    //isProject: 0,
  };
  const menuHelp = {
    id: 234,
    Title: "Help",
    IconClass: "headset",
    //IconClass: "phone-alt",
    Screen: "Emergency",
    user_facility: "N",
    user_menu: "Y",
    //icon_url: require("../assets/images/icon_at_home/icon-6.jpeg"),
    //isProject: 0,
  };

  const menuOther = {
    id: 88,
    Title: "Others",
    IconClass: "bars", //"ellipsis-v",
    Screen: "FCategory",
    user_facility: "N",
    user_menu: "Y",
    //icon_url: require("../assets/images/icon_at_home/icon-8.jpeg"),
  };

  const modMenu = [...menu];

  return (
    <View>
      <View style={[{ flexDirection: "row" }, style]}>
        <FlatList
          data={modMenu}
          //data={FCategories}
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
                //marginLeft: 15,
                //marginRight: 0,
                //width: "25%",
                //alignItems: "center",
                // justifyContent: 'center',
                //backgroundColor: "blue",

                // borderWidth: 1,
                // borderColor: "red",
                //backgroundColor: "red",
              }}
            >
              <CategoryIconSoft
                font={font}
                isRound
                // icon={item.icon}
                style={
                  {
                    //padding: 0,
                    //backgroundColor: "blue",
                    //maxWidth: 120,
                    //alignSelf: "center",
                  }
                }
                icon_url={item.icon_url}
                icon={item.IconClass}
                title={t(item.Title)}
                onPress={() =>
                  user.UserFacility == item.user_facility ||
                  item.user_menu == "Y"
                    ? goToScreen(item.Screen, item)
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
