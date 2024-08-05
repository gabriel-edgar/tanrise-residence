import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";

const ListItem3 = ({ item, onDelete, index }) => {
  const { colors } = useTheme();
  const handleDelete = () => {
    onDelete(index);
  };

  const color = colors.background != "white" ? "white" : "black";
  const borderColor = colors.background != "white" ? "white" : "black";

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingHorizontal: 10,
        //alignItems: "baseline",
      }}
    >
      <Text
        style={
          onDelete != "header"
            ? {
                paddingTop: 10,
                paddingRight: 10,
                width: "30%",
                // paddingRight: 10,
                color,
              }
            : {
                paddingRight: 10,
                width: "30%",
                fontWeight: "bold",
                borderBottomWidth: 1,
                //borderBottomWidth: 1,
                // paddingRight: 10,
                textAlign: "center",
                color,
                borderColor,
              }
        }
      >
        {item.column1}
      </Text>
      <Text
        style={
          onDelete != "header"
            ? {
                paddingTop: 10,
                paddingLeft: 10,
                borderLeftWidth: 1,
                width: "30%",
                color,
                borderColor,
              }
            : {
                paddingHorizontal: 10,
                borderLeftWidth: 1,
                borderBottomWidth: 1,
                width: "30%",
                fontWeight: "bold",
                textAlign: "center",
                color,
                borderColor,
              }
        }
      >
        {item.column2}
      </Text>
      <Text
        style={
          onDelete != "header"
            ? {
                paddingTop: 10,
                paddingLeft: 10,
                borderLeftWidth: 1,
                width: "30%",
                color,
                borderColor,
              }
            : {
                paddingHorizontal: 10,
                borderLeftWidth: 1,
                borderBottomWidth: 1,
                width: "30%",
                fontWeight: "bold",
                textAlign: "center",
                //paddingVertical: "6%",
                color,
                borderColor,
              }
        }
      >
        {item.column3}
      </Text>
      {/* <Text>test</Text> */}
      {onDelete != "header" && onDelete != "modal" ? (
        <TouchableOpacity
          onPress={handleDelete}
          style={{
            margin: 5,
            padding: 10,
            backgroundColor: "red",
            borderRadius: 5,
            justifySelf: "flex-end",
          }}
        >
          {/* <Text style={{ color: "white" }}>Delete</Text> */}
          <Icon name="times" solid size={16} color={"white"} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{ paddingHorizontal: 10, borderRadius: 5 }}
          //style={{ padding: 10, backgroundColor: "red", borderRadius: 5 }}
        >
          <Text style={{ color: "white" }}></Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ListItem3;
