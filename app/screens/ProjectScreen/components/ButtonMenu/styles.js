import { StyleSheet } from "react-native";
import { BaseColor } from "@/config";
import * as Utils from "@/utils";
import Fonts from "../Fonts";

export default StyleSheet.create({
  loading: {
    width: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: 0,
  },
  container: {
    width: 75,
    height: 80,
    // borderTopLeftRadius: 8,
    // borderTopRightRadius: 8,
    borderRadius: 16,
    // marginBottom: 0,
    borderWidth: StyleSheet.hairlineWidth,
    ...Platform.select({
      android: {
        elevation: 2,
      },
      default: {
        shadowColor: "rgba(0,0,0, .2)",
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 3,
        shadowRadius: 3,
      },
    }),
  },
  imageBackground: {
    // height: 335,
    height: 120,
    width: 200,
  },
  viewBackground: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingBottom: 30,
    paddingLeft: 20,
    paddingRight: 20,
  },
  viewItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  thumb: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 5,
  },
  title: {
    width: "100%",
    // paddingTop: 5,
    padding: 3,
    fontSize: 10,
    fontFamily: Fonts.type.Lato,
    color: BaseColor.corn70,
    // alignItems: 'center',
    // alignSelf: 'center',
    // alignContent: 'center',
  },
  description: {
    width: "100%",
    padding: 5,
    paddingTop: 0,
  },
});
