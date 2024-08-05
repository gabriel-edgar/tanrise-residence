import { Text } from "@components";
import { useTheme } from "@config";
import { parseHexTransparency } from "@utils";
import React, { useState } from "react";
import {
    FlatList,
    ImageBackground,
    TouchableOpacity,
    View,
    StyleSheet,
    ScrollView,
} from "react-native";
import styles from "./styles";
import { MaziListApp } from "@data";
import { BaseColor } from "@config";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const Screens = () => {
    const ScreensData = MaziListApp.filter((item) => !item.isHideInScreens);
    const [app, setApp] = useState(ScreensData[0]);
    const { colors } = useTheme();
    const navigation = useNavigation();
    const { t } = useTranslation();

    const renderItem = ({ item, index }) => {
        const isSelect = item.id == app.id;

        return (
            <TouchableOpacity
                style={[
                    styles.itemLeftScreen,
                    {
                        // borderBottomColor: colors.border,
                        backgroundColor: isSelect
                            ? parseHexTransparency(colors.primary, 30)
                            : "transparent",
                        borderLeftColor: isSelect
                            ? colors.primary
                            : "transparent",
                    },
                ]}
                onPress={() => setApp(item)}
            >
                <ImageBackground
                    source={item.image}
                    style={{ height: 60, width: 60 }}
                    borderRadius={8}
                />
                <Text
                    body2
                    style={{
                        alignItems: "center",
                        marginTop: 5,
                        color: isSelect ? BaseColor.whiteColor : colors.text,
                    }}
                    numberOfLines={1}
                >
                    {t(item.title)}
                </Text>
                <Text overline grayColor>
                    {item.subtitle}
                </Text>
            </TouchableOpacity>
        );
    };
    return (
        <View
            style={[
                styles.containerScreens,
                {
                    borderTopColor: parseHexTransparency(colors.border, 30),
                },
            ]}
        >
            <View
                style={{
                    flex: 2.5,
                    backgroundColor: parseHexTransparency(colors.border, 30),
                }}
            >
                <FlatList
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={1}
                    data={ScreensData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                />
            </View>
            <View
                style={{
                    flex: 7.5,
                }}
            >
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    {Object.keys(app.screens).map((name, index) => {
                        const { title } = app?.screens?.[name]?.options ?? {};
                        return (
                            <TouchableOpacity
                                key={name}
                                style={[
                                    styles.itemRightScreen,
                                    {
                                        borderBottomWidth:
                                            StyleSheet.hairlineWidth,
                                        borderBottomColor: colors.border,
                                    },
                                ]}
                                onPress={() => navigation.navigate(name, {})}
                            >
                                <View
                                    style={[
                                        styles.contentRightScreen,
                                        {
                                            backgroundColor:
                                                parseHexTransparency(
                                                    colors.primary,
                                                    30
                                                ),
                                        },
                                    ]}
                                >
                                    <Text subhead bold primaryColor>
                                        {index + 1}
                                    </Text>
                                </View>
                                <Text body1>{t(title)}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>
        </View>
    );
};

export default Screens;
