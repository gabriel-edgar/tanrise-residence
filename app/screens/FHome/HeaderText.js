import {
    CategoryBlock,
    CategoryBoxColor,
    CategoryBoxColor2,
    CategoryGrid,
    CategoryIcon,
    CategoryList,
    Header,
    Icon,
    SafeAreaView,
    Text,
    TextInput,
} from "@components";
import { BaseColor, BaseStyle, Typography, useTheme } from "@config";
import { CategoryData } from "@data";
import * as Utils from "@utils";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { useTranslation } from "react-i18next";
let timeoutChangeMode = null;

function HeaderText() {
    const { t } = useTranslation();

    return (
        <Header
            renderLeft={() => (
                <Text header bold>
                    {t("Report")}
                </Text>
            )}
            title={""}
            styleLeft={{
                flex: 1,
            }}
            styleContentLeft={{
                flex: 1,
                justifyContent: "center",
                paddingHorizontal: 0,
                width: "100%",
                paddingHorizontal: 20
            }}
            styleContentCenter={{
                flex: 0,
                alignItems: "flex-start",
                justifyContent: "flex-start",
            }}
            styleRight={{ flex: 0 }}
            onPressRight={() => {}}
        />
    );
}

export default HeaderText
