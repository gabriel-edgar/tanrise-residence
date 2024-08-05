import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const ListItem2 = ({ item, onDelete, index }) => {
  const handleDelete = () => {
    onDelete(index);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingHorizontal: 10,
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
              }
            : {
                paddingRight: 10,
                width: "30%",
                fontWeight: "bold",
                borderBottomWidth: 1,
                //borderBottomWidth: 1,
                // paddingRight: 10,
              }
        }
      >
        {item.name}
      </Text>
      <Text
        style={
          onDelete != "header"
            ? {
                paddingTop: 10,
                paddingLeft: 10,
                borderLeftWidth: 1,
                width: "30%",
              }
            : {
                paddingLeft: 10,
                borderLeftWidth: 1,
                borderBottomWidth: 1,
                width: "30%",
                fontWeight: "bold",
              }
        }
      >
        {item.quantity}
      </Text>
      {/* <Text>test</Text> */}
      {onDelete != "header" && onDelete != "modal" ? (
        <TouchableOpacity
          onPress={handleDelete}
          style={{
            margin: 10,
            padding: 10,
            backgroundColor: "red",
            borderRadius: 5,
            justifySelf: "flex-end",
          }}
        >
          <Text style={{ color: "white" }}>Delete</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{ paddingHorizontal: 10, borderRadius: 5 }}
          //style={{ padding: 10, backgroundColor: "red", borderRadius: 5 }}
        >
          <Text style={{ color: "white" }}>Delete</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ListItem2;
