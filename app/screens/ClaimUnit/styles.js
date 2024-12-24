import React from "react";
import { StyleSheet, Dimensions, PixelRatio } from "react-native";
import { BaseColor } from "@config";
//const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default StyleSheet.create({
  contain: {
    alignItems: "center",
    padding: 20,
    width: "100%",
  },
  textInput: {
    height: 46,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
    width: "100%",
  },
  container: {
    backgroundColor: "white",
    padding: 16,
    //flex: 1,
    width: "100%",
  },
  dropdown: {
    //width: 300,
    //flex: 1,
    width: "100%",
    height: 50,
    borderColor: "gray",
    //borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: BaseColor.fieldColor,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 7,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  pickerWrap: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#E2DFE4",
    backgroundColor: "#F6F6F6",
  },
  sel: {
    width: deviceWidth - 100,
    marginVertical: 10,
    paddingVertical: 10,
    borderColor: "#9B9B9B",
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    height: null,
  },
  avatar: {
    width: deviceWidth - 100,
    height: 200,
    borderRadius: 5,
  },
  avatarContainer: {
    width: deviceWidth - 100,
    marginVertical: 10,
    borderColor: "#9B9B9B",
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    height: 200,
    backgroundColor: "white",
  },
  iconRemove: {
    // backgroundColor: '#EE6B60',
    backgroundColor: "#fff",
    // color: '#ff1744',
    position: "absolute",
    borderRadius: 5,
    padding: 5,
    right: 0,
    top: 0,
  },
});
