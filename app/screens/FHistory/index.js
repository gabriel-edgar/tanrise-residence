import {
    ProfileGridSmall,
    SafeAreaView,
    Text,
    Header,
    Icon,
    ListSearchResultLabel,
} from "@components";
import { BaseStyle, useTheme, Images } from "@config";
import { FHistory } from "@data";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, RefreshControl, View } from "react-native";

const FHistoryScreen = ({ navigation }) => {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const renderContent = () => {
        return (
            <View style={{ flex: 1, backgroundColor: "transparent" }}>
                <Header
                    title={t("transfer_history")}
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
                    renderRight={() => {
                        return (
                            <Text body1 lightPrimaryColor>
                                {t("close")}
                            </Text>
                        );
                    }}
                    onPressLeft={() => navigation.goBack()}
                    onPressRight={() => navigation.navigate("FHome")}
                />
                <View style={{ alignItems: "center" }}>
                    <ProfileGridSmall
                        image={Images.profile2}
                        name="Seave Garret"
                    />
                </View>
                <View style={{ flex: 1 }}>
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
                        data={FHistory}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <ListSearchResultLabel
                                title={item.title}
                                textRight={item.textRight}
                                textLeft={item.textLeft}
                                onPress={() => navigation.navigate("FHistoryDetail")}
                            />
                        )}
                    />
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView
            style={[BaseStyle.safeAreaView]}
            edges={["right", "top", "left"]}
        >
            {renderContent()}
        </SafeAreaView>
    );
};

export default FHistoryScreen;
