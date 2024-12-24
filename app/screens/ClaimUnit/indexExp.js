import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Icon from "react-native-vector-icons/Feather";

const MultiSelectDropdown = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [isFocus, setIsFocus] = useState(false);

  const data = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Cherry", value: "cherry" },
    { label: "Date", value: "date" },
  ];

  const handleSelect = (item) => {
    // Toggle item selection
    if (selectedItems.includes(item.value)) {
      setSelectedItems(selectedItems.filter((value) => value !== item.value));
    } else {
      setSelectedItems([...selectedItems, item.value]);
    }
  };

  const renderItem = (item) => (
    <TouchableOpacity onPress={() => handleSelect(item)}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon
          name={selectedItems.includes(item.value) ? "check-square" : "square"}
          size={20}
          color="black"
        />
        <Text style={{ marginLeft: 10 }}>{item.label}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ margin: 20 }}>
      <Dropdown
        style={{
          height: 50,
          borderColor: "gray",
          borderWidth: 1,
          borderRadius: 8,
        }}
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Select fruits"
        value={selectedItems.join(", ")} // Display selected items as a comma-separated string
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        renderItem={renderItem}
        search={false} // Optionally disable search functionality
      />

      <FlatList
        data={data}
        keyExtractor={(item) => item.value}
        renderItem={({ item }) => renderItem(item)}
        style={{ marginTop: 10 }}
      />

      <Text>Selected: {selectedItems.join(", ")}</Text>
    </View>
  );
};

export default MultiSelectDropdown;
