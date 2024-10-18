import {
  CardChannelGrid,
  CardSlide,
  CategoryList,
  News43,
  ListFacility,
  SafeAreaView,
  Text,
  Header,
  Icon,
  colors,
  PlaceholderLine,
  Placeholder,
} from "@components";
import { BaseStyle, useTheme, BaseColor } from "@config";
import {
  HomeChannelData,
  HomeListData,
  HomePopularData,
  HomeTopicData,
  PostListData,
} from "@data";
import * as Utils from "@utils";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  ScrollView,
  View,
  ActivityIndicator,
  Animated,
  ImageBackground,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  NewsList,
  NotFound,
  ProductGrid1,
  ProductGrid2,
} from "../../components";
import List from "../../components/Product/List";
import styles from "./styles";
import LottieView from "lottie-react-native";
import getProject from "../../selectors/ProjectSelector";
import { useSelector, useDispatch } from "react-redux";
import { CheckBox, Badge } from "react-native-elements";
import ModalSelector from "react-native-modal-selector";
import getUser from "../../selectors/UserSelectors";
import { API_URL_LOKAL } from "@env";
const Store = (props) => {
  // const {navigation} = props;
  const { navigation, route } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [spinner, setSpinner] = useState(true);
  const [hasError, setErrors] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const projectSelector = useSelector((state) => getProject(state));
  const user = useSelector((state) => getUser(state));
  console.log("project selector", projectSelector);
  console.log("user selector", user);

  const [defaulTower, setDefaultTower] = useState(false);
  const [checkedEntity, setCheckedEntity] = useState(false);
  const [show, setShow] = useState(false);

  const [entity, setEntity] = useState("");
  const [projectno, setProjectNo] = useState("");
  const [db_profile, setDb_Profile] = useState("");

  const [defaultprojectName, setDefaultProjectName] = useState(true);
  const [textProjectName, setTextProjectName] = useState("");
  //   const [defaulTower, setDefaultTower] = projectSelector.length > 1 ? useState(false) : useState(true);
  // const [checkedEntity, setCheckedEntity] =
  //   projectSelector.length > 1 ? useState(false) : useState(true);

  const [dataMember, setDataMember] = useState([]);
  const [memberID, setMemberID] = useState("");
  const [memberName, setMemberName] = useState("");
  const [tenantNo, setTenantNo] = useState("");
  const [lotNo, setLotNo] = useState("");
  const [defaultMemberID, setDefaultMemberID] = useState(true);

  console.log("memberID", memberID);
  console.log("lotNo", lotNo);
  console.log("data >", data);

  useEffect(() => {
    console.log("lengt project selector", projectSelector.Data.length);
    if (projectSelector.Data.length > 1) {
      setDefaultTower(false);
    } else {
      setDefaultTower(true);
      setSpinner(false);
      setCheckedEntity(true);
      setShow(true);
      setEntity(projectSelector.Data[0].entity_cd);
      setProjectNo(projectSelector.Data[0].project_no);
      setDb_Profile(projectSelector.Data[0].db_profile);
    }
  }, []);

  useEffect(() => {
    if (defaultprojectName == true) {
      setTextProjectName(projectSelector.Data[0]);
    }
  }, []);

  const getMenuStore = () => {
    const entity_cd = projectSelector.Data[0].entity_cd;
    console.log("entity", entity_cd);
    const project_no = projectSelector.Data[0].project_no;
    console.log(
      "url menu store",
      `http://apps.pakubuwono-residence.com/apiwebpbi/api/modules/store/facility-type?entity_cd=${entity_cd}&project_no=${project_no}`
    );
    axios
      .get(
        API_URL_LOKAL +
          `/modules/store/facility-type?entity_cd=${entity_cd}&project_no=${project_no}`
      )
      .then((res) => {
        // console.log('ress :', res.data.data);
        const cekdata = res.data.data;
        const filterdata = cekdata
          .filter((item) => item.facility_type != "RS")
          .map((items) => items);
        console.log("cek filter data menu store", filterdata);
        // setData(res.data.data);
        setData(filterdata);
      });
  };

  const getMember = () => {
    const entity_cd = projectSelector.Data[0].entity_cd;
    console.log("entity", entity_cd);
    const project_no = projectSelector.Data[0].project_no;
    const email = user.user;
    console.log(
      "url menu store",
      `http://apps.pakubuwono-residence.com/apiwebpbi/api/modules/store/member?entity_cd=${entity_cd}&project_no=${project_no}&email=${email}`
    );
    axios
      .get(
        API_URL_LOKAL +
          `/modules/store/member?entity_cd=${entity_cd}&project_no=${project_no}&email=${email}`
      )
      .then((res) => {
        console.log("ress member:", res.data.Data);
        const data = res.data.Data;
        setDataMember(data);
        if (defaultMemberID == true) {
          // setTextLotno(resLotno[0]);
          setMemberID(res.data.Data[0].member_id);
          setMemberName(res.data.Data[0].member_name);
          setTenantNo(res.data.Data[0].tenant_no);
          setLotNo(res.data.Data[0].lot_no);
        }
        // if (data.length > 1) {
        //   setDefaultMemberID(false);
        //   setDataMember(data);
        //   // setMemberID(res.data.Data[0].member_id);
        //   // setMemberName(res.data.Data[0].member_name);
        //   // setTenantNo(res.data.Data[0].tenant_no);
        // } else {
        //   setDefaultMemberID(true);
        //   setMemberID(res.data.Data[0].member_id);
        //   setMemberName(res.data.Data[0].member_name);
        //   setTenantNo(res.data.Data[0].tenant_no);
        // }
        // setDataMember(res.data.Data);
      })
      .catch((error) => {
        console.log("error get member api", error);
        // alert('error get');
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      getMenuStore();
      getMember();
    }, 1000);
  }, []);

  useEffect(() => {
    // getMenuStore();
  });

  const handleCheckChange = (index, data) => {
    console.log("klik handle change", index);
    setCheckedEntity(index);
    setShow(true);

    setEntity(data.entity_cd);
    setProjectNo(data.project_no);
    setDb_Profile(data.db_profile);
  };

  const onChangeprojectname = (data) => {
    setCheckedEntity(true);
    setShow(true);

    setEntity(data.entity_cd);
    setProjectNo(data.project_no);
    setDb_Profile(data.db_profile);
    setDefaultProjectName(false);
    console.log("projectname", data);
    setTextProjectName(data);
  };

  const onChangeMemberID = (data) => {
    setDefaultMemberID(false);
    setMemberID(data.member_id);
    setMemberName(data.member_name);
    setTenantNo(data.tenant_no);
  };

  const toItemStore = (item) => {
    const dataForItemStore = {
      entity_cd: entity,
      project_no: projectno,
      facility_type: item.facility_type,
      member_id: memberID,
      member_name: memberName,
      audit_user: user.name,
      tenant_no: tenantNo,
      lot_no: lotNo,

      // ...item,
    };
    console.log("for item store", dataForItemStore);
    navigation.navigate("ItemStore", dataForItemStore);
  };

  // cfs_user_project_customer where email login. memberID == business-ID di table tersebut
  //memberName mungkin join dari table atasnya
  const renderContent = () => {
    const mainNews = PostListData[0];
    return (
      <SafeAreaView
        style={[BaseStyle.safeAreaView]}
        forceInset={{ top: "always", bottom: "always" }}
      >
        <Header
          title={t("Store")}
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
          onContentSizeChange={() => {
            setHeightHeader(Utils.heightHeader());
          }}
          // showsHorizontalScrollIndicator={false}
          // showsVerticalScrollIndicator={false}
          overScrollMode={"never"}
          style={{ zIndex: 10 }}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { y: scrollY },
                },
              },
            ],
            {
              useNativeDriver: false,
            }
          )}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "flex-end",
              marginRight: 10,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: colors.primary,
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderRadius: 10,
              }}
              onPress={() => navigation.navigate("RiwayatPesanan")}
              // onPress={() => navigation.navigate('FChooseFriend')}
            >
              <Text style={{ color: BaseColor.whiteColor, fontSize: 14 }}>
                Order History
              </Text>
            </TouchableOpacity>
          </View>

          {/* CHOOSE PROJECT HERE */}
          {spinner ? (
            <View>
              <Placeholder style={{ marginVertical: 4, paddingHorizontal: 10 }}>
                <PlaceholderLine width={100} noMargin style={{ height: 40 }} />
              </Placeholder>
            </View>
          ) : (
            <View
              style={{ marginTop: 10, marginBottom: 5, marginHorizontal: 10 }}
            >
              <Text style={{ color: "#3f3b38", fontSize: 14 }}>
                Choose Project
              </Text>
              <View
                style={{
                  paddingVertical: 5,
                }}
              >
                <ModalSelector
                  style={{ justifyContent: "center" }}
                  childrenContainerStyle={{
                    color: "#CDB04A",
                    // alignSelf: 'center',
                    fontSize: 16,
                    // top: 10,
                    // flex: 1,
                    justifyContent: "center",
                    fontWeight: "800",
                    fontFamily: "KaiseiHarunoUmi",
                  }}
                  data={projectSelector.Data}
                  optionTextStyle={{ color: "#333" }}
                  selectedItemTextStyle={{ color: "#3C85F1" }}
                  accessible={true}
                  keyExtractor={(item) => item.project_descs}
                  // initValue={'ahlo'}
                  labelExtractor={(item) => item.project_descs} //khusus untuk lotno
                  cancelButtonAccessibilityLabel={"Cancel Button"}
                  cancelText={"Cancel"}
                  onChange={(option) => {
                    onChangeprojectname(option);
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",

                      paddingLeft: 10,
                      paddingVertical: 5,
                      backgroundColor: colors.primary,
                      justifyContent: "space-between",
                      borderRadius: 12,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        alignSelf: "center",
                        fontSize: 16,

                        // top: 10,
                        // flex: 1,
                        // justifyContent: 'center',
                        fontWeight: "800",
                        fontFamily: "KaiseiHarunoUmi",
                      }}
                    >
                      {textProjectName.project_descs}
                    </Text>
                    <Icon
                      name="caret-down"
                      solid
                      size={27}
                      // color={colors.primary}
                      style={{ marginLeft: 10, marginRight: 10 }}
                      color={"#CDB04A"}
                    />
                  </View>
                </ModalSelector>
              </View>
            </View>
          )}

          {/* CHOOSE MEMBER HERE */}
          {spinner ? (
            <View>
              <Placeholder style={{ marginVertical: 4, paddingHorizontal: 10 }}>
                <PlaceholderLine width={100} noMargin style={{ height: 40 }} />
              </Placeholder>
            </View>
          ) : (
            <View
              style={{
                marginTop: 5,
                marginBottom: 20,

                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ marginHorizontal: 10 }}>
                <Text style={{ color: "#3f3b38", fontSize: 14 }}>
                  Choose Member ID
                </Text>
                <View
                  style={{
                    paddingVertical: 5,
                  }}
                >
                  <ModalSelector
                    style={{ justifyContent: "center" }}
                    childrenContainerStyle={{
                      color: "#CDB04A",
                      // alignSelf: 'center',
                      fontSize: 16,
                      // top: 10,
                      // flex: 1,
                      justifyContent: "center",
                      fontWeight: "800",
                      fontFamily: "KaiseiHarunoUmi",
                    }}
                    data={dataMember}
                    optionTextStyle={{ color: "#333" }}
                    selectedItemTextStyle={{ color: "#3C85F1" }}
                    cancelText={"Cancel"}
                    accessible={true}
                    keyExtractor={(item) => item.card_no}
                    // initValue={'ahlo'}
                    labelExtractor={(item) => item.member_id + " - " + lotNo} //khusus untuk lotno
                    cancelButtonAccessibilityLabel={"Cancel Button"}
                    onChange={(option) => {
                      onChangeMemberID(option);
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        paddingHorizontal: 20,
                        // paddingLeft: 10,
                        paddingVertical: 5,
                        backgroundColor: colors.primary,
                        justifyContent: "space-between",
                        borderRadius: 12,
                      }}
                    >
                      <Text
                        style={{
                          color: "#CDB04A",
                          alignSelf: "center",
                          fontSize: 16,

                          // top: 10,
                          // flex: 1,
                          // justifyContent: 'center',
                          fontWeight: "800",
                          fontFamily: "KaiseiHarunoUmi",
                        }}
                      >
                        {memberID + " - " + lotNo}
                      </Text>
                      <Icon
                        name="caret-down"
                        solid
                        size={26}
                        // color={colors.primary}
                        style={{ marginLeft: 10 }}
                        color={"#CDB04A"}
                      />
                    </View>
                  </ModalSelector>
                </View>
              </View>

              <View style={{ marginHorizontal: 10 }}>
                <Text style={{ color: "#3f3b38", fontSize: 14 }}>
                  Member Name
                </Text>
                <View
                  style={{
                    marginVertical: 5,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    backgroundColor: colors.primary,
                    justifyContent: "center",
                    borderRadius: 12,
                  }}
                >
                  <Text
                    style={{
                      color: "#CDB04A",
                      alignSelf: "center",
                      fontSize: 16,
                      flexWrap: "wrap",
                      flex: 1,
                      // width: '80%',
                      // top: 10,
                      // flex: 1,
                      // justifyContent: 'center',
                      fontWeight: "800",
                      fontFamily: "KaiseiHarunoUmi",
                    }}
                  >
                    {memberName}

                    {/* Choose Projesadadact Chsasaoose Project Choose */}
                  </Text>
                </View>
              </View>

              {/* <View>
                <Text style={{color: '#3f3b38', fontSize: 14, paddingLeft: 10}}>
                  Member Name
                </Text>
                <Text>{memberName}</Text>
              </View> */}
            </View>
          )}

          {/* CLOSE CHOOSE PROJECT HERE */}

          {show && checkedEntity === true ? (
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {data.map((item, index) => (
                <View key={index.toString()} style={{ width: "50%" }}>
                  <TouchableOpacity
                    style={{
                      marginVertical: 30,
                      width: "100%",
                      alignItems: "center",
                      paddingRight: index % 2 == 0 ? 1 : 0,
                      paddingLeft: index % 2 != 0 ? 1 : 0,

                      marginBottom: 20,
                      // borderColor: '#000',
                      // borderWidth: 1,
                    }}
                    onPress={() => toItemStore(item)}
                  >
                    <ImageBackground
                      source={
                        item.images == "" || item.images == null
                          ? require("@assets/images/logo.png")
                          : {
                              uri: item.images,
                            }
                      }
                      style={styles.imageBackgroundGrid2}
                      imageStyle={{ borderRadius: 8 }}
                    ></ImageBackground>

                    <View>
                      <Text
                        subhead
                        numberOfLines={2}
                        style={{ marginTop: 10, marginLeft: 10 }}
                      >
                        {item.descs}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  {/* <ProductGrid2
                    style={{
                      width: '100%',
                      paddingRight: index % 2 == 0 ? 10 : 0,
                      paddingLeft: index % 2 != 0 ? 10 : 0,
                      marginBottom: 20,
                      borderColor: '#000',
                      borderWidth: 1,
                    }}
                    // description={item.description}
                    title={item.descs}
                    image={require('@assets/images/logo.png')}
                    // costPrice={item.costPrice}
                    // salePrice={item.salePrice}
                    // onPress={() => {}}
                    onPress={() => navigation.navigate('ItemStore', item)}
                    // onPress={() => console.log('items for store', item)}
                  /> */}
                </View>
              ))}
            </View>
          ) : null}
        </ScrollView>
        {/* <NotFound /> */}
        {/* <View style={{flex: 1, padding: 15, paddingTop: 10}}>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          
            {data.map((item, index) => {
              return (
                <View key={index} style={{width: '50%', height: 200}}>
                  <ProductGrid1
                    key={index}
                    style={{
                      width: '100%',
                      paddingRight: index % 2 == 0 ? 10 : 0,
                      paddingLeft: index % 2 != 0 ? 10 : 0,
                    }}
                    // description={item.available}
                    title={item.descs}
                    // image={item.image}
                    // image={item.image}
                    image={require('@assets/images/logo.png')}
                    // costPrice={item.costPrice}
                    // salePrice={item.salePrice}
                    // isFavorite={item.isFavorite}
                    onPress={() => navigation.navigate('EProduct', item)}
                  />
                </View>
              );
            })}
          </View>
        </View> */}
      </SafeAreaView>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={["right", "top", "left"]}
      >
        {renderContent()}
      </SafeAreaView>
    </View>
  );
};

export default Store;
