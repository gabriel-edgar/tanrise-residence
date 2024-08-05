import { SafeAreaView, TabSlider, Text } from "@components";
import { BaseStyle, Images, useTheme } from "@config";
import { MaziListApp } from "@data";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import { SceneMap } from "react-native-tab-view";
import ProductGrid1 from "./Grid1";
import Screens from "./Screens";
import PreviewComponent from "@screens/PreviewComponent";

const Apps = () => {
    const AppData = MaziListApp.filter((item) => !item.isHideInHome);
    const navigation = useNavigation();
    const { t } = useTranslation();

    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
        >
            <View style={{ flex: 1, padding: 15, paddingTop: 10 }}>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    {AppData.map((item, index) => (
                        <View key={index.toString()} style={{ width: "50%" }}>
                            <ProductGrid1
                                style={{
                                    width: "100%",
                                    paddingRight: index % 2 == 0 ? 10 : 0,
                                    paddingLeft: index % 2 != 0 ? 10 : 0,
                                }}
                                description={item.subtitle}
                                title={t(item.title)}
                                image={item.image}
                                costPrice={item.costPrice}
                                salePrice={item.salePrice}
                                isFavorite={item.isFavorite}
                                onPress={() => navigation.navigate(item.id)}
                            />
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

const Components = () => {
    return <PreviewComponent isShowHeader={false} />;
};

const MaziHome = ({ navigation }) => {
    const { t } = useTranslation();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: "apps", title: "apps" },
        { key: "screens", title: "screens" },
        { key: "components", title: "components" },
    ]);

    const renderScene = SceneMap({
        apps: Apps,
        screens: Screens,
        components: Components,
    });

    return (
        <SafeAreaView
            style={[BaseStyle.safeAreaView]}
            edges={["right", "top", "left"]}
        >
            <View style={{ padding: 15, paddingBottom: 5 }}>
                <Text header bold>
                    {t("mazi_home")}
                </Text>
                <Text subhead grayColor style={{ marginTop: 5 }}>
                    {t("description_mazi_home")}
                </Text>
            </View>
            <TabSlider
                navigationState={{
                    index,
                    routes: routes,
                }}
                renderScene={renderScene}
                onIndexChange={setIndex}
            />
        </SafeAreaView>
    );
};

export default MaziHome;
