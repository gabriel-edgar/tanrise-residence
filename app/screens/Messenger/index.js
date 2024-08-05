import { Header, Icon, ListThumbSquare, SafeAreaView } from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
// Load sample data
import { MessagesData } from "@data";
import React, { useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import { useTranslation } from "react-i18next";

const Messenger = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [messenger, setMessenger] = useState(MessagesData);

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={t("messenger")}
        renderLeft={() => {
          return (
            <Icon
              name="angle-left"
              size={20}
              color={colors.primary}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <FlatList
        refreshControl={
          <RefreshControl
            colors={[colors.primary]}
            tintColor={colors.primary}
            refreshing={refreshing}
            onRefresh={() => {}}
          />
        }
        data={messenger}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item, index }) => (
          <ListThumbSquare
            onPress={() => {
              navigation.navigate("Messages");
            }}
            image={item.image}
            txtLeftTitle={item.user}
            txtContent={item.message}
            txtRight={item.date}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Messenger;
