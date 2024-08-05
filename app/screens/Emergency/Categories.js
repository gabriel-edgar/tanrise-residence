import { CategoryIconSoft } from "@components";
import { FCategories } from "@data";
import React from "react";
import { FlatList, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useTranslation } from "react-i18next";

const Categories = ({ style = {} }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const goToScreen = (name) => name && navigation.navigate(name);

  return (
    <View style={[{ flexDirection: "row" }, style]}>
      <FlatList
        data={FCategories}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              marginVertical: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CategoryIconSoft
              isRound
              icon={item.icon}
              title={t(item.title)}
              onPress={() => goToScreen(item.screen)}
            />
          </View>
        )}
        //Setting the number of column
        numColumns={4}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

export default Categories;
