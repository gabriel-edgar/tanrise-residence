import {
  Header,
  Icon,
  ListThumbCircleNotif,
  SafeAreaView,
  Text,
} from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
// Load sample data
import { NotificationData } from "@data";
import React, { useState, useEffect } from "react";
import {
  FlatList,
  RefreshControl,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import getUser from "../../selectors/UserSelectors";
import axios from "axios";
import Pdf from "react-native-pdf";
import { API_URL_LOKAL } from "@env";

const TermsConditions = (props) => {
  const { navigation, route } = props;
  console.log("props params", route.params);
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [notification, setNotification] = useState(NotificationData);
  const users = useSelector((state) => getUser(state));
  const [email, setEmail] = useState(users.user);
  const [loading, setLoading] = useState(true);

  const [spinner, setSpinner] = useState(true);

  const [dataTerms, setData] = useState([]);

  const getTermsConditions = async () => {
    const entity_cd = route.params.entity_cd;
    const project_no = route.params.project_no;

    const response = await axios(
      API_URL_LOKAL +
        "/modules/facilities/facility-tnc/" +
        entity_cd +
        "/" +
        project_no
    );
    console.log("response terms data: ", response.data);
    setData(response.data.Data);
    setSpinner(false);
  };

  useEffect(() => {
    getTermsConditions();
    // getData();
  }, []);

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={["right", "top", "left"]}
    >
      <Header
        title={t("terms_conditions")}
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
      {dataTerms.map((datas, index) => (
        <View style={stylesCurrent.container} key={index}>
          <Pdf
            source={{
              uri: datas.file,
            }}
            // source={require('@assets/termsconditions/Facility_Booking_System_Regulation.pdf')}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={(error) => {
              console.log(error);
            }}
            onPressLink={(uri) => {
              console.log(`Link pressed: ${uri}`);
            }}
            style={stylesCurrent.pdf}
          />
        </View>
      ))}
    </SafeAreaView>
  );
};

export default TermsConditions;

const stylesCurrent = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    // marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
