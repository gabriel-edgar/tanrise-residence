import { Text, Header, Icon } from "@/components";
//import data_dummy from '../Home/data_dummy.json';

import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from "react-native";
import styles from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { BaseStyle, Fonts, BaseColor, useTheme } from "@/config";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import getUser from "../../selectors/UserSelectors";
import axios from "axios";
//import {API_URL} from '@env'; // shila
import { API_URL_LOKAL } from "@env";
//const API_URL = "https://dev.ifca.co.id:4414/apishilla/api";
import { store, persist } from "../../store";
import { homeCommonProject } from "../FunctionAxios/home-common-project";

const ProjectScreen = (props) => {
  const { colors } = useTheme();
  //console.log("data dummy", data_dummy);
  //const datas = data_dummy.data_dummy;
  //console.log('image', datas[0].image);
  const { navigation } = props;
  const { t } = useTranslation();
  const user = useSelector((state) => getUser(state));
  const [projectData, setProjectData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [arrDataProject, setArrDataProject] = useState([]);
  const [dataDD, setDataDD] = useState([]);
  const stateStore = store.getState();
  const token = stateStore.user.accessToken;

  useEffect(() => {
    loadData();
    //getProject();
  }, []);

  const loadData = async () => {
    const data = {
      email: stateStore.user.user.userData.email,
    };
    await homeCommonProject(token, data, setDataDD, setProjectData);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    //getProject();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  const getProject = () => {
    try {
      const config = {
        method: "get",
        // url: 'http://dev.ifca.co.id:8080/apiciputra/api/approval/groupMenu?approval_user=MGR',
        url: API_URL + "/project/index",
        headers: {
          "content-type": "application/json",
          // 'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${user.Token}`,
        },
        // params: {approval_user: user.userIDToken.UserId},
        params: { email: user.user },
      };
      console.log("formdaata get project", config);
      axios(config)
        .then((result) => {
          const pasing = result.data.Data;
          console.log("data di project", pasing);
          setProjectData(pasing);
        })
        .catch((error) =>
          console.log("error getdata project error", error.response)
        );
    } catch (error) {
      console.log("ini konsol eror", error);
    }
  };

  console.log("85 projectData: ", projectData);
  return (
    <SafeAreaView
      edges={["right", "top", "left"]}
      style={[
        BaseStyle.safeAreaView,
        { flex: 1 },
        { backgroundColor: colors.background },
      ]}
    >
      {/* <SafeAreaView
      style={[BaseStyle.safeAreaView, { flex: 1 }]}
      edges={["right", "top", "left"]}
    ></SafeAreaView> */}
      <Header
        title={t("List Property")}
        renderLeft={() => {
          return (
            <Icon
              name="angle-left"
              //name="arrow-left"
              size={18}
              color={colors.primary}
              enableRTL={true}
            />
          );
        }}
        //style={{ height: 80 }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ marginBottom: 100 }}>
          {projectData.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate("ProjectDetails", item)}
            >
              <View
                // key={index}
                // style={styles.item}
                style={{
                  width: "90%",
                  height: Dimensions.get("screen").height * 0.3,
                  // height: 300,
                  paddingHorizontal: 30,
                  marginVertical: 10,
                  alignSelf: "center",
                }}
              >
                {/* <Text>{item.image}</Text> */}
                <Image
                  source={{ uri: item.picture_url }}
                  // source={require('@/assets/images/home/slider-project/sudirmansuite.jpeg')}
                  // src={item.image}
                  // source={}
                  // containerStyle={styles.imageContainer}
                  // style={styles.image}
                  style={{
                    width: "100%",
                    // width: 300,
                    // height: 300,
                    height: Dimensions.get("screen").height * 0.3,
                    // marginTop: 10,
                    // paddingTop: 10,
                    // ...StyleSheet.absoluteFillObject,
                    resizeMode: "cover",
                    borderRadius: 25,
                  }}
                />

                <View
                  style={{
                    position: "absolute",
                    backgroundColor: "white",
                    // top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    // height: 80,

                    marginHorizontal: 55,
                    marginVertical: 20,
                    borderRadius: 20,
                    opacity: 0.8,
                    // justifyContent: 'center',
                    // alignItems: 'center',
                  }}
                >
                  <View style={{ marginVertical: 10, marginHorizontal: 25 }}>
                    <Text
                      style={{
                        fontFamily: "DMSerifDisplay",
                        color: "black",
                        marginVertical: 5,
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      {item.descs}
                      {/* {item.project_descs} */}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "DMSerifDisplay",
                        color: "grey",
                        marginVertical: 5,
                        fontWeight: "bold",
                      }}
                    >
                      {/* {item.caption_address} */}
                      {item.entity_name}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProjectScreen;
