import {
  Button,
  Header,
  Icon,
  SafeAreaView,
  TextInput,
  Text,
} from "@/components";
import { BaseColor, BaseStyle, useTheme } from "@/config";
import React, { useState, useEffect } from "react";
import { ScrollView, View, FlatList, TouchableOpacity } from "react-native";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import { Dropdown } from "react-native-element-dropdown";
import httpClient from "../../controllers/HttpClient";
import { useCustomTriggerOnFocus } from "../function/funcFocusEffect";
import { widthPixel } from "../Home/normalize";
import getUser from "../../selectors/UserSelectors";
import { useSelector, useDispatch } from "react-redux";
import { ActivityIndicator } from "react-native-paper";

// individual, child, pembantu

const successInit = {
  name: true,
  email: true,
  address: true,
};

const ClaimUnit = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [projectList, setProjectList] = useState([]);
  const [clusterList, setClusterList] = useState([]);
  const [unitList, setUnitList] = useState([]);
  const [entity, setEntity] = useState(null);
  const [project, setProject] = useState(null);
  const [cluster, setCluster] = useState(null);
  const [unit, setUnit] = useState("");
  const [selectedUnits, setSelectedUnits] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const user = useSelector((state) => getUser(state));
  console.log("66 selectedUnits: ", selectedUnits);
  const [roleList, setRoleList] = useState([
    { descs: "Individual" },
    { descs: "Child" },
    { descs: "Maid" },
  ]);
  const [role, setRole] = useState("");
  const [placeholderState, setPlaceholderState] = useState("Choose Unit");
  const [isDisabledCUnit, setIsDisabledCUnit] = useState(true);
  const [isDisabledCCluster, setIsDisabledCCluster] = useState(true);

  const [isLoadingCluster, setLoadingCluster] = useState();
  const [isLoadingUnit, setLoadingUnit] = useState();

  useEffect(() => {
    onRefresh();
  }, []);

  useEffect(() => {
    if (project) {
      loadDataClusterList();
      setIsDisabledCCluster(false);
      setIsDisabledCUnit(true);
    }
  }, [project]);

  const onRefresh = () => {
    loadData();
  };

  //useCustomTriggerOnFocus(onRefresh);

  const loadData = async () => {
    loadDataProjectList();
  };

  const loadDataProjectList = async () => {
    await httpClient
      .request({
        url: "/auth/get-entity",
        method: "GET",
      })
      .then((res) => {
        setProjectList(res.data.data);
      })
      .catch((err) => {
        console.log("96 project err: ", err);
        alert(err);
      });
  };

  const loadDataClusterList = async () => {
    setLoadingCluster(true);
    const dataParams = {
      entity_cd: project?.entity_cd,
      project_no: project?.project_no,
    };
    await httpClient
      .request({
        url: "/auth/get-cluster",
        method: "GET",
        //data,
        params: dataParams,
      })
      .then((res) => {
        // alert(res.data.data);
        console.log("96 cluster res: ", res.data.data);
        setClusterList(res.data.data);
      })
      .catch((err) => {
        console.log("96 cluster err: ", err);
        alert(err);
      });
    setLoadingCluster(false);
  };

  const loadDataUnitList = async (cluster) => {
    setLoadingUnit(true);
    const dataParams = {
      entity_cd: project?.entity_cd,
      project_no: project?.project_no,
      cluster_cd: cluster?.cluster_cd,
    };
    console.log("120 dataParams: ", dataParams);
    await httpClient
      .request({
        url: "/auth/get-lot-no",
        method: "GET",
        params: dataParams,
      })
      .then((res) => {
        // alert(res.data.data)
        console.log("133 unit res: ", res.data.data);
        setUnitList(res.data.data);
      })
      .catch((err) => {
        alert(JSON.stringify(err));
      });
    setLoadingUnit(false);
  };

  const handleSelectUnit = (item) => {
    item.projectDescs = project.descs; //"Est GRAND SUNRISE ESPLANADE"; // Modify the property directly

    const isSelected = selectedUnits.some(
      (unit) => JSON.stringify(unit) === JSON.stringify(item)
    );

    if (isSelected) {
    } else {
      setSelectedUnits([...selectedUnits, item]);
    }
  };

  const renderLabel1 = (text) => {
    return (
      <View
        style={[
          styles.label,
          {
            backgroundColor: colors.background,
            borderRadius: 15,
            borderWidth: 0.5,
            borderColor: colors.background,
          },
        ]}
      >
        <Text
          style={[
            {
              color: colors.text,
              //backgroundColor: colors.background,
              borderRadius: 50,
            },
          ]}
        >
          {text}
        </Text>
      </View>
    );
  };

  const renderLabel2 = (text, customStyle) => {
    return (
      <Text
        style={[
          { marginTop: 10, alignSelf: "flex-start", marginLeft: 10 },
          customStyle,
        ]}
      >
        {text}
      </Text>
    );
  };

  const validateEmail = (input) => {
    // Regular expression for basic email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    //setEmail(input);
    //emailRegex.test(input) ? null : alert("Please enter a valid email address");
    if (emailRegex.test(input)) {
      return true;
    } else {
      alert("Please enter a valid email address");
      return false;
    }
  };

  const renderItem = (item) => (
    <TouchableOpacity onPress={() => handleSelectUnits(item)}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon
          name={selectedUnits.includes(item.value) ? "check-square" : "square"}
          size={20}
          color="black"
        />
        <Text style={{ marginLeft: 10 }}>{item.label}</Text>
      </View>
    </TouchableOpacity>
  );

  const onNext = async () => {
    if (selectedUnits.length == 0) {
      alert("Please choose unit");
    } else {
      const params = {
        selectedUnits: selectedUnits,
      };
      console.log("params for click attach", params);
      navigation.navigate("ClaimUnit2", params);
    }
  };

  const handleDelete = (itemParam) => {
    //console.log("255 id: ", item);
    // Alert.alert(
    //   "Confirm Deletion",
    //   "Are you sure you want to delete this item?",
    //   [
    //     { text: "Cancel", style: "cancel" },
    //     {
    //       text: "Delete",
    //       onPress: () => {
    //         const newData = data.filter((item) => item.id !== id);
    //         setData(newData); // Remove item from the list
    //       },
    //     },
    //   ]
    // );
    const newData = selectedUnits.filter(
      (item) =>
        item.lot_no != itemParam.lot_no ||
        item.entity_cd != itemParam.entity_cd ||
        item.project_no != itemParam.project_no
    );
    setSelectedUnits(newData); // Remove item from the list
    newData.length == 0 ? setPlaceholderState("Choose Unit") : null;
  };

  // Render each item in the FlatList
  const renderItemList = ({ item }) => (
    <View
      style={{
        flex: 1,
        padding: 10,
        margin: 5,
        //backgroundColor: colors.background,
        backgroundColor: "#f0f0f0",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderColor: "white",
        borderWidth: 1,
      }}
    >
      <View
        style={{
          marginRight: 8,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            //marginBottom: 10,
            //marginRight: 8,
            color: "black",
          }}
        >
          {item.lot_no}
        </Text>
        <Text
          style={{
            fontSize: 13,
            //marginBottom: 10,
            //marginRight: 8,
            color: "black",
          }}
        >
          {item.projectDescs}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          padding: 3,
          paddingHorizontal: 15,
          //backgroundColor: "red",
          backgroundColor: "white",
          borderRadius: 13,
          justifyContent: "center",
        }}
        onPress={() => handleDelete(item)}
      >
        <Text
          style={{
            //   color: "#fff",
            color: "black",
            fontWeight: "bold",
            fontSize: 20,
            //backgroundColor: "blue",
          }}
        >
          X
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={["right", "top", "left"]}
    >
      <Header
        title={t("Claim Unit")}
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
      <ScrollView>
        <Text
          style={{
            //marginTop: 65,
            textAlign: "center",
            fontSize: 16,
            paddingHorizontal: 40,
          }}
        >
          Step 1 of 2
        </Text>
        <Text
          style={{
            marginTop: 45,
            textAlign: "center",
            fontSize: 16,
            paddingHorizontal: 40,
          }}
        >
          This form is intended for people who already have a unit
        </Text>
        <View style={styles.contain}>
          <View
            style={[
              styles.container,
              {
                backgroundColor: colors.background,
                opacity: projectList.length == 0 ? 0.5 : null,
              },
            ]}
          >
            {renderLabel1("Choose Project")}
            <Dropdown
              style={[
                styles.dropdown,
                {
                  // color: colors.text,
                  color: "blue",
                  backgroundColor:
                    colors.background == "#010101" ? "#222222" : "#eeeeee",
                },
                isFocus && { borderColor: "blue" },
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={[
                styles.selectedTextStyle,
                { color: colors.text },
              ]}
              inputSearchStyle={[
                styles.inputSearchStyle,
                { color: colors.text },
              ]}
              iconStyle={styles.iconStyle}
              data={projectList.map((item, index) => ({
                ...item,
                label: `${[index + 1] + ". " + item.descs} (${
                  // item.entity_cd + "/" + item.project_no
                  item.project_no
                })`, // Combine firstName and lastName as the label
              }))}
              search
              itemTextStyle={{
                //backgroundColor: colors.background,
                color: colors.text, // Set the label color here
                //fontSize: 16,
              }}
              maxHeight={300}
              labelField="label"
              valueField="label"
              activeColor={colors.background}
              containerStyle={{
                backgroundColor: colors.background,
              }}
              placeholder={
                projectList.length != 0 ? "Choose Project" : "No Data Project"
              }
              disable={projectList.length == 0}
              searchPlaceholder="Search..."
              value={project}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setProject(item);
                setIsFocus(false);
              }}
            />
          </View>

          <>
            <View
              style={[
                styles.container,
                {
                  backgroundColor: colors.background,
                  opacity: isDisabledCCluster ? 0.5 : null,
                },
              ]}
            >
              {renderLabel1("Choose Cluster")}
              {isLoadingCluster ? (
                <ActivityIndicator></ActivityIndicator>
              ) : (
                <Dropdown
                  style={[
                    styles.dropdown,
                    {
                      color: colors.text,
                      backgroundColor:
                        colors.background == "#010101" ? "#222222" : "#eeeeee",
                    },
                    isFocus && { borderColor: "blue" },
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  disable={isDisabledCCluster}
                  selectedTextStyle={[
                    styles.selectedTextStyle,
                    { color: colors.text },
                  ]}
                  inputSearchStyle={[
                    styles.inputSearchStyle,
                    { color: colors.text },
                  ]}
                  iconStyle={styles.iconStyle}
                  // data={clusterList}
                  data={clusterList.map((item, index) => ({
                    ...item,
                    label: `${[index + 1] + ". " + item.descs}`,
                  }))}
                  search
                  maxHeight={300}
                  // labelField="descs"
                  labelField="label"
                  valueField="label"
                  // valueField="lot_no"
                  placeholder={"Choose..."}
                  searchPlaceholder="Search..."
                  value={cluster}
                  containerStyle={{
                    backgroundColor: colors.background,
                  }}
                  itemTextStyle={{
                    //backgroundColor: colors.background,
                    color: colors.text, // Set the label color here
                    //fontSize: 16,
                  }}
                  activeColor={colors.background}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setIsFocus(false);
                    setCluster(item);
                    setIsDisabledCUnit(false);
                    loadDataUnitList(item);
                  }}
                />
              )}
            </View>
          </>

          <>
            <View
              style={[
                styles.container,
                {
                  backgroundColor: colors.background,
                  opacity: isDisabledCUnit ? 0.5 : null,
                },
              ]}
            >
              {renderLabel1(
                selectedUnits.length > 0 ? "Choose Unit" : "Choose Unit"
              )}
              {isLoadingUnit ? (
                <ActivityIndicator></ActivityIndicator>
              ) : (
                <Dropdown
                  style={[
                    styles.dropdown,
                    {
                      color: colors.text,
                      backgroundColor:
                        colors.background == "#010101" ? "#222222" : "#eeeeee",
                    },
                    isFocus && { borderColor: "blue" },
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  disable={isDisabledCUnit}
                  selectedTextStyle={[
                    styles.selectedTextStyle,
                    { color: colors.text },
                  ]}
                  inputSearchStyle={[
                    styles.inputSearchStyle,
                    { color: colors.text },
                  ]}
                  iconStyle={styles.iconStyle}
                  // data={unitList}
                  data={unitList.map((item, index) => ({
                    ...item,
                    label: `${[item.cluster_cd] + ". " + item.lot_no}`,
                  }))}
                  search
                  maxHeight={300}
                  labelField="lot_no"
                  // labelField="label"
                  valueField="lot_no"
                  placeholder={unitList.length==0?'Unit not Found':!isFocus ? placeholderState : "..."}
                  searchPlaceholder="Search..."
                  value={unit}
                  containerStyle={{
                    backgroundColor: colors.background,
                  }}
                  itemTextStyle={{
                    //backgroundColor: colors.background,
                    color: colors.text, // Set the label color here
                    //fontSize: 16,
                  }}
                  activeColor={colors.background}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setIsFocus(false);
                    handleSelectUnit(item);
                    //setUnit({ label: "Add Unit", value: "999" });
                    setUnit({ label: "Add Unit", value: "999" });
                    setPlaceholderState("Choose More Unit");
                  }}
                />
              )}
            </View>

            <View
              // style={[
              //   styles.container,
              //   { backgroundColor: colors.background },
              // ]}
              style={{ width: "100%", alignItems: "center" }}
            >
              <FlatList
                style={{ width: "90%" }}
                data={selectedUnits}
                renderItem={renderItemList}
                keyExtractor={(item) => item.value}
                // numColumns={2} // Set number of columns to 2
                // columnWrapperStyle={{
                //   justifyContent: "space-between", // Spacing between columns
                // }} // Styling for the row of items
              />
            </View>
          </>
        </View>
        <View
          style={{
            width: "100%",
            //justifyContent: "center"
          }}
        >
          <Button
            //full
            style={{
              margin: 30,
              //marginLeft: 20,
            }}
            loading={loading}
            onPress={() => onNext()}
          >
            {t("Next")}
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ClaimUnit;
