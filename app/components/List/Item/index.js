import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const ListItem = ({ item }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
      <Text>{item.name}</Text>
      <Text>{item.quantity}</Text>
    </View>
  );
};

export default ListItem;
