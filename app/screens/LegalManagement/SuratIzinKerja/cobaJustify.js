import React from "react";
import { View, Text, StyleSheet } from "react-native";

const JustifyTextComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.justifyText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  justifyText: {
    textAlign: "justify",
    //textAlignLast: "justify", // For Android (since Android 8.0)
    fontSize: 16,
    lineHeight: 24,
  },
});

export default JustifyTextComponent;
