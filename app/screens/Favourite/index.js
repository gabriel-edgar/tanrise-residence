import {
    Header,
    NewsWishlist,
    SafeAreaView,
    Text,
    ModalFilter,
} from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
import { FavouriteData } from "@data";
import React, { Fragment, useEffect, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { useTranslation } from "react-i18next";
import styles from "./styles";

const sortOptionInit = [
    {
        value: "remove",
        icon: "sort-amount-up",
        text: "remove",
    },
    {
        value: "share_this_article",
        icon: "sort-amount-down",
        text: "share_this_article",
    },
    {
        value: "view_detail",
        icon: "sort-amount-up",
        text: "view_detail",
    },
    {
        value: "reset_all",
        icon: "sort-amount-up",
        text: "reset_all",
    },
];

const Favourite = (props) => {
    const { navigation } = props;
    const { t } = useTranslation();
    const { colors } = useTheme();
    const [refreshing, setRefreshing] = useState(false);
    const [favourite, setFavourite] = useState(FavouriteData);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [sortOption, setSortOption] = useState(sortOptionInit);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const onSelectFilter = (selected) => {
        setSortOption(
            sortOption.map((item) => {
                return {
                    ...item,
                    checked: item.value == selected.value,
                };
            })
        );
    };

    const onApply = () => {
        let itemSelected = null;
        for (const item of sortOption) {
            if (item.checked) {
                itemSelected = item;
            }
        }
        if (itemSelected) {
            setModalVisible(false);
            setSortOption(sortOptionInit);
        }
    };

    const renderContent = () => {
        return (
            <View style={[{ flex: 1, paddingTop: 20 }]}>
                <View style={{ marginBottom: 16, paddingHorizontal: 20 }}>
                    <Text header bold>
                        {t("favorites")}
                    </Text>
                </View>

                <FlatList
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            colors={[colors.primary]}
                            tintColor={colors.primary}
                            refreshing={refreshing}
                            onRefresh={() => {}}
                        />
                    }
                    data={favourite}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item, index }) => (
                        <NewsWishlist
                            loading={loading}
                            image={item.image}
                            title={item.title}
                            subtitle={item.subtitle}
                            rate={item.rate}
                            onPress={() =>
                                navigation.navigate("PostDetail", {
                                    item: item,
                                })
                            }
                            onAction={() => setModalVisible(true)}
                        />
                    )}
                />
                <ModalFilter
                    options={sortOption}
                    isVisible={modalVisible}
                    onSwipeComplete={() => {
                        setModalVisible(false);
                        setSortOption(sortOptionInit);
                    }}
                    onApply={onApply}
                    onSelectFilter={onSelectFilter}
                />
            </View>
        );
    };

    return (
        <SafeAreaView
            style={BaseStyle.safeAreaView}
            edges={['right', 'top', 'left']}
        >
            {renderContent()}
        </SafeAreaView>
    );
};

export default Favourite;
