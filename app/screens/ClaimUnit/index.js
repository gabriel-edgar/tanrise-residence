import {
  Button,
  Header,
  Icon,
  SafeAreaView,
  TextInput,
  Text,
} from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
import React, { useState, useEffect } from "react";
import { ScrollView, View, FlatList, TouchableOpacity } from "react-native";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import { Dropdown } from "react-native-element-dropdown";
import DropDownPicker from "react-native-dropdown-picker";
import httpClient from "../../controllers/HttpClient";
import { useCustomTriggerOnFocus } from "../function/funcFocusEffect";
import { widthPixel } from "../Home/normalize";
import getUser from "../../selectors/UserSelectors";
import { useSelector, useDispatch } from "react-redux";

// individual, child, pembantu

const successInit = {
  name: true,
  email: true,
  address: true,
};

const dataDummyProject = [
  {
    db_profile: "DBLIVE",
    descs: "Voza Tower",
    email: "pppsrs.arc100@gmail.com",
    entity_cd: "1003",
    entity_name: "PPPSRSKCS VOZA PREMIUM OFFICE",
    picture_url:
      "https://ifcamobileapp.tanrise.com/tanrise_admin/public/storage/project/featuredimage-office.jpg",
    project_descs: "Voza Tower",
    project_no: "1003001",
    rowID: "7",
    seq_no: "3",
    status: "Y",
    userID: "FINANCE",
  },
  {
    db_profile: "DBLIVE",
    descs: "ARC100",
    email: "pppsrs.arc100@gmail.com",
    entity_cd: "1004",
    entity_name: "PPPSRSS ARC 100",
    picture_url:
      "https://ifcamobileapp.tanrise.com/tanrise_admin/public/storage/project/featuredimage-apartment.jpg",
    project_descs: "ARC100",
    project_no: "1004001",
    rowID: "8",
    seq_no: "4",
    status: "Y",
    userID: "FINANCE",
  },
];

const dataDummyUnit = [
  {
    cluster_cd: "ARC",
    entity_cd: "1004",
    lot_no: "TR-09-07",
    project_no: "1004001",
  },
  {
    cluster_cd: "ARC2",
    entity_cd: "1004",
    lot_no: "TR-09-08",
    project_no: "1004001",
  },
  {
    cluster_cd: "ARC3",
    entity_cd: "1004",
    lot_no: "TR-09-09",
    project_no: "1004001",
  },
];

const dataDummyUnitVorza = [
  {
    cluster_cd: "Vorza",
    entity_cd: "1003",
    lot_no: "VR-09-07",
    project_no: "1003001",
  },
  {
    cluster_cd: "Vorza2",
    entity_cd: "1003",
    lot_no: "VR-09-08",
    project_no: "1003001",
  },
  {
    cluster_cd: "Vorza3",
    entity_cd: "1003",
    lot_no: "VR-09-09",
    project_no: "1003001",
  },
];

const ClaimUnit = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(successInit);
  const [entityList, setEntityList] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [unitList, setUnitList] = useState([]);
  const [entity, setEntity] = useState(null);
  const [project, setProject] = useState(null);
  const [unit, setUnit] = useState("");
  const [selectedUnits, setSelectedUnits] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [open, setOpen] = useState(false);
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

  useEffect(() => {
    //setProjectList(dataDummy);
    //setUnitList(dataDummyUnit);
    onRefresh();
    //console.log("54 colors: ", colors);
  }, []);

  useEffect(() => {
    //setProjectList(dataDummy);
    // setUnitList(dataDummyUnit);
    // onRefresh();
    //console.log("54 colors: ", colors);
    if (entity) {
      // if (project.project_no == "1003001") {
      //   setUnitList(dataDummyUnitVorza);
      // } else {
      //   setUnitList(dataDummyUnit);
      // }
      setIsDisabledCUnit(true);

      setProject(null);
    }
  }, [entity]);

  useEffect(() => {
    //setProjectList(dataDummy);
    // setUnitList(dataDummyUnit);
    // onRefresh();
    //console.log("54 colors: ", colors);
    if (project) {
      // if (project.project_no == "1003001") {
      //   setUnitList(dataDummyUnitVorza);
      // } else {
      //   setUnitList(dataDummyUnit);
      // }
      setIsDisabledCUnit(false);
      loadDataUnitList();
    }
  }, [project]);

  const onRefresh = () => {
    //alert("run onRefresh");
    loadData();
  };

  //useCustomTriggerOnFocus(onRefresh);

  const loadData = async () => {
    //loadDataEntityList();
    //loadDataProjectList();
    setProjectList(dataDummyProject);
  };

  const loadDataEntityList = async () => {
    await httpClient
      .request({
        url: "/auth/get-entity",
        method: "GET",
        //data,
        //params: { email: user.email },
      })
      .then((res) => {
        console.log("190 entity res: ", res.data.data);
        setEntityList(res.data.data);
        // {
        //     "entity_cd": "0001",
        //     "entity_name": "PT JAYA SUKSES MAKMUR SENTOSA TBK"
        // }
        //loadDataUnit(res.data.project);
      })
      .catch((err) => {
        // setProjectList(dataDummy);
        alert(err);
      });
  };

  const loadDataProjectList = async () => {
    console.log("96 p entity: ", entity.value.entity_cd);
    await httpClient
      .request({
        url: "/auth/get-project",
        method: "GET",
        //data,
        params: { entity_cd: entity.value.entity_cd },
      })
      .then((res) => {
        //console.log("96 project res: ", res.data.data);
        setProjectList(res.data.data);
        //loadDataUnit(res.data.project);
      })
      .catch((err) => {
        console.log("96 project err: ", err);
        // setProjectList(dataDummy);
        alert(err);
      });
  };

  const loadDataUnitList = async () => {
    const dataParams = {
      entity_cd: project?.entity_cd,
      project_no: project?.project_no,
      //email: user.email,
    };
    console.log("120 dataParams: ", dataParams);
    await httpClient
      .request({
        url: "/auth/get-lot-no",
        method: "GET",
        params: dataParams,
      })
      .then((res) => {
        console.log("133 unit res: ", res.data.data);
        setUnitList(res.data.data);
      })
      .catch((err) => {
        alert(JSON.stringify(err));
      });
  };

  const handleSelectUnit = (item) => {
    // Toggle item selection
    // item = {
    //   // ...item,
    //   _index: item._index,
    //   cluster_cd: item.cluster_cd,
    //   entity_cd: item.entity_cd,
    //   project_no: item.project_no,
    //   lot_no: item.lot_no,
    //   //projectDescs: "Est GRAND SUNRISE ESPLANADE", //project.descs
    // };
    // Modify the existing object directly to maintain the same reference

    item.projectDescs = project.descs; //"Est GRAND SUNRISE ESPLANADE"; // Modify the property directly
    // console.log("182 item: ", item);
    // if (selectedUnits.includes(item)) {
    //   //setSelectedUnits(selectedUnits.filter((item) => item !== item));
    // } else {
    //   setSelectedUnits([...selectedUnits, item]);
    // }

    const isSelected = selectedUnits.some(
      (unit) => JSON.stringify(unit) === JSON.stringify(item)
    );

    if (isSelected) {
      // setSelectedUnits(
      //   selectedUnits.filter(
      //     (unit) => JSON.stringify(unit) !== JSON.stringify(item)
      //   )
      // );
    } else {
      setSelectedUnits([...selectedUnits, item]);
    }
  };

  const renderLabel1 = (text) => {
    // if (project || isFocus) {
    //   return (
    //     <Text style={[styles.label, isFocus && { color: "black" }]}>
    //       Choose project
    //     </Text>
    //   );
    // }
    // return null;
    return (
      <View
        style={[
          styles.label,
          {
            //backgroundColor: "lightblue",
            //paddingHorizontal: 20,
            //paddingVertical: 10,
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
          { marginTop: 10, alignSelf: "left", marginLeft: 10 },
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

      // await httpClient
      //   .request({
      //     url: "/modules/cs/save",
      //     method: "POST",
      //     data,
      //   })
      //   .then((res) => {
      //     alert(
      //       "You will receive an email if your account request is successful."
      //     );
      //     navigation.navigate.goBack();
      //   })
      //   .catch((err) => {
      //     alert(JSON.stringify(err));
      //   });
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
          {/* <View
            style={[styles.container, { backgroundColor: colors.background }]}
          >
            {renderLabel1("Choose Entity")}
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
              data={entityList.map((item, index) => ({
                label: `${[index + 1] + ". " + item.entity_name} (${
                  item.entity_cd
                })`, // Combine firstName and lastName as the label
                value: item,
              }))}
              search
              itemTextStyle={{
                //backgroundColor: colors.background,
                color: colors.text, // Set the label color here
                //fontSize: 16,
              }}
              maxHeight={300}
              labelField="label"
              valueField="value"
              activeColor={colors.background}
              containerStyle={{
                backgroundColor: colors.background,
              }}
              placeholder={"Choose Entity"}
              searchPlaceholder="Search..."
              value={entity}
              // onFocus={() => setIsFocus(true)}
              // onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setEntity(item);
                // setIsFocus(false);
              }}
            />
          </View> */}
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
          {/* choose role */}
          {/* <View
            style={[styles.container, { backgroundColor: colors.background }]}
          >
            {renderLabel1("Choose Role")}
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
              selectedTextStyle={[
                styles.selectedTextStyle,
                { color: colors.text },
              ]}
              inputSearchStyle={[
                styles.inputSearchStyle,
                { color: colors.text },
              ]}
              iconStyle={styles.iconStyle}
              containerStyle={{
                backgroundColor: colors.background,
              }}
              itemTextStyle={{
                //backgroundColor: colors.background,
                color: colors.text, // Set the label color here
                //fontSize: 16,
              }}
              data={roleList}
              search
              activeColor={colors.background}
              maxHeight={300}
              labelField="descs"
              valueField="descs"
              placeholder={"Choose Role"}
              searchPlaceholder="Search..."
              value={role}
              // onFocus={() => setIsFocus(true)}
              // onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setRole(item);
                //setIsFocus(false);
              }}
            />
          </View> */}
          {/* end choose role */}
          {/* {true ? ( */}
          {true ? (
            <>
              {/* {renderLabel2("Unit")}
              <TextInput
                style={[BaseStyle.textInput, { marginBottom: 10 }]}
                onChangeText={(text) => setUnit(text)}
                autoCorrect={false}
                placeholder={t("")}
                // placeholderTextColor={
                //   success.address ? BaseColor.grayColor : colors.primary
                // }
                value={unit}
              /> */}
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
                  data={unitList}
                  search
                  maxHeight={300}
                  labelField="lot_no"
                  valueField="lot_no"
                  placeholder={!isFocus ? placeholderState : "..."}
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
              </View>
              {/* {renderLabel1(
                selectedUnits.length > 0 ? "Selected Units" : "Selected Unit"
              )} */}
              <View
                // style={[
                //   styles.container,
                //   { backgroundColor: colors.background },
                // ]}
                style={{ width: "100%", alignItems: "center" }}
              >
                <View
                  style={[
                    //styles.label,
                    {
                      //backgroundColor: "lightblue",
                      //paddingHorizontal: 20,
                      //paddingVertical: 10,
                      backgroundColor: colors.background,
                      borderRadius: 15,
                      //borderWidth: 0.5,
                      borderColor:
                        selectedUnits.length == 0 ? null : colors.background,
                      alignSelf: "start",
                      marginLeft: 30,

                      position: "absolute",
                      //backgroundColor: "white",
                      left: -3,
                      top: -5,
                      zIndex: 999,
                      paddingHorizontal: 8,
                      fontSize: 14,
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
                    {selectedUnits.length == 0
                      ? null
                      : selectedUnits.length > 1
                      ? "Selected " + selectedUnits.length + " Units:"
                      : "Selected Unit:"}
                  </Text>
                </View>
                <FlatList
                  style={{ width: "90%" }}
                  data={selectedUnits}
                  renderItem={renderItemList}
                  keyExtractor={(item) => item.value}
                  numColumns={2} // Set number of columns to 2
                  columnWrapperStyle={{
                    justifyContent: "space-between", // Spacing between columns
                  }} // Styling for the row of items
                />
              </View>
            </>
          ) : null}

          {/* <View style={{ width: "100%" }}>
            <Button
              full
              style={{ marginTop: 20 }}
              loading={loading}
              onPress={() => onSignUp()}
            >
              {t("Claim Unit")}
            </Button>
          </View> */}
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
