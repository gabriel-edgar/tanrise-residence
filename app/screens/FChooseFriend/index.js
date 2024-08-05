import {
    Header,
    Icon,
    ListTextButton,
    SafeAreaView,
    TabSlider,
    Tag,
    TextInput,
} from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
import { FFriends } from "@data";
import { useNavigation } from "@react-navigation/native";
import { haveChildren } from "@utils";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, TouchableOpacity, View } from "react-native";
import { SceneMap } from "react-native-tab-view";

const Friends = () => {
    const { t, i18n } = useTranslation();
    const { colors } = useTheme();
    const [keyword, setKeyword] = useState("");
    const [friends, setFriends] = useState(FFriends);
    const navigation = useNavigation();

    const filterCategory = (text) => {
        setKeyword(text);
        if (text) {
            setFriends(
                FFriends.filter(
                    (item) =>
                        haveChildren(item.name, text) ||
                        haveChildren(item.total, text)
                )
            );
        } else {
            setFriends(FFriends);
        }
    };

    const onSend = () => {
        navigation.navigate("FSendMoney")
    };

    return (
        <View style={{ flex: 1, paddingHorizontal: 20 }}>
            <View
                style={{
                    paddingTop: 15,
                    paddingBottom: 20,
                }}
            >
                <TextInput
                    onChangeText={filterCategory}
                    placeholder={t("name_username_or_email")}
                    value={keyword}
                    icon={
                        <TouchableOpacity onPress={() => filterCategory("")}>
                            <Icon
                                name="times"
                                size={16}
                                color={BaseColor.grayColor}
                            />
                        </TouchableOpacity>
                    }
                />
            </View>
            <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={friends}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <ListTextButton
                        image={item.image}
                        name={item.name}
                        description={item.total}
                        componentRight={
                            <Tag
                                onPress={(e) => {
                                    e.stopPropagation();
                                    onSend(item);
                                }}
                                outline
                                style={{
                                    paddingHorizontal: 20,
                                    backgroundColor: colors.background,
                                }}
                            >
                                {`${t("send")}`}
                            </Tag>
                        }
                    />
                )}
            />
        </View>
    );
};

export default function FChooseFriend() {
    const { t, i18n } = useTranslation();
    const { colors } = useTheme();
    const [loading, setLoading] = useState("");
    const navigation = useNavigation();

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: "sugguested", title: "sugguested" },
        { key: "contacts", title: "contacts" },
    ]);
    const renderScene = SceneMap({
        sugguested: Friends,
        contacts: Friends,
    });

    return (
        <SafeAreaView
            style={BaseStyle.safeAreaView}
            edges={["right", "top", "left"]}
        >
            <Header
                title={t("choose_friend")}
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
            <TabSlider
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
            />
        </SafeAreaView>
    );
}
