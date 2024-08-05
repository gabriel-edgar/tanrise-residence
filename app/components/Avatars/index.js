import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import Image from "@components/Image";

const index = ({ styleThumb, users = [] }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginRight: 7,
      }}
    >
      {users.map((item, index) => {
        return (
          <Image
            key={index}
            source={item.image}
            style={[
              styles.thumb,
              index != 0 ? { marginLeft: -15 } : {},
              styleThumb,
            ]}
          />
        );
      })}
    </View>
  );
};

export default index;
