// CustomDropdownPicker.js
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { View, Text, StyleSheet } from "react-native";
import { BaseStyle, useTheme } from "@config";

const CustomDropdownPicker = ({ items, placeholder, onSelect }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {/* <Text style={styles.label}>Choose an option:</Text> */}
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={() => {}}
        placeholder={placeholder}
        onChangeValue={(itemValue) => {
          setValue(itemValue);
          onSelect(itemValue); // Callback when item is selected
        }}
        style={[styles.dropdown, { borderColor: colors.primary, color: "red" }]}
        textStyle={styles.dropdownText}
        dropDownContainerStyle={[
          styles.dropdownContainer,
          { borderColor: colors.primary, color: "red" },
        ]}
        labelStyle={[styles.labelStyle, { color: "black" }]}
      />
      {/* {value && <Text style={styles.selectedValue}>Selected: {value}</Text>} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  dropdown: {
    width: "100%",
    borderColor: "#007BFF",
    //borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: "#f8f8f8",
  },
  dropdownText: {
    fontSize: 16,
  },
  dropdownContainer: {
    borderColor: "#007BFF",
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: "#f8f8f8",
    //backgroundColor: "green",
  },
  labelStyle: {
    color: "#007BFF",
    //color: "green",
  },
  selectedValue: {
    marginTop: 16,
    fontSize: 16,
    color: "gray",
  },
});

export default CustomDropdownPicker;
