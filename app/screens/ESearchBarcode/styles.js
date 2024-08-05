import { StyleSheet } from "react-native";
import { BaseColor, BaseStyle } from "@config";

export default StyleSheet.create({
  btnClearSearch: {
    position: "absolute",
    right: 16,
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: "100%",
  },
  rowTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemHistory: {
    marginTop: 5,
    padding: 5,
    marginRight: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    position: "relative",
  },
  preview: {
    height: 200,
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20,
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: "#777",
  },
  textBold: {
    fontWeight: "500",
    color: "#000",
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)",
  },
  buttonTouchable: {
    padding: 16,
  },
  viewWidth: {
    position: "absolute",
    height: 2,
    width: 30,
    backgroundColor: "#F6BD18",
    zIndex: 99999,
  },
  viewHeight: {
    position: "absolute",
    height: 30,
    width: 2,
    backgroundColor: "#F6BD18",
    zIndex: 999999,
  },
  viewMarker: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
  },
  viewNone: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  viewMain: {
    flex: 1,
    height: "100%",
    flexDirection: "row",
  },
  viewMainBarCode: {
    width: "100%",
    height: "100%",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  textCancel: {
    color: BaseColor.GRAY2,
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  loading: { backgroundColor: "transparent" },
  viewWaiting: {
    width: "100%",
    height: "100%",
    backgroundColor: "lightgreen",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  textWaiting: {
    color: "white",
  },
});
