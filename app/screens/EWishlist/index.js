import { ProductCard4, SafeAreaView, Header, Icon } from "@components";
import { BaseStyle, useTheme } from "@config";
import { WishlistsData, EYourStores, EOptions } from "@data";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, RefreshControl, View } from "react-native";
import ModalOption from "./ModalOption";

const EWishlist = ({ navigation }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(WishlistsData);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);

  const renderContent = () => {
    return (
      <View style={{ flex: 1, backgroundColor: "transparent" }}>
        <Header
          title={t("wishlist")}
          renderLeft={() => {
            return (
              <Icon
                name="angle-left"
                size={20}
                color={colors.text}
                enableRTL={true}
              />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />

        <View style={{ flex: 1, paddingBottom: 20 }}>
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 20 }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={true}
            refreshControl={
              <RefreshControl
                colors={[colors.primary]}
                tintColor={colors.primary}
                refreshing={refreshing}
                onRefresh={() => {}}
              />
            }
            data={products}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <ProductCard4
                image={item.image}
                style={{ marginTop: 20 }}
                title={item.title}
                description={item.description}
                salePrice={item.salePrice}
                addToCard={() => navigation.navigate("ECart")}
                onOption={() => setModalVisible(true)}
              />
            )}
          />
        </View>
        <ModalOption
          options={EOptions}
          isVisible={modalVisible}
          onSwipeComplete={() => {
            setModalVisible(false);
          }}
          onPress={() => setModalVisible(false)}
        />
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView]}
      edges={['right', 'top', 'left']}
    >
      {renderContent()}
    </SafeAreaView>
  );
};

export default EWishlist;
