import {
    Header,
    Icon,
    PaymentItem,
    ProfileGridSmall,
    SafeAreaView,
    Text,
    TitleFintech,
} from "@components";
import { BaseStyle, useTheme } from "@config";
import { FPaymentItemsData, FRecentTransactions } from "@data";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { LayoutAnimation, View } from "react-native";

const FBank = (props) => {
    const { navigation } = props;
    const { t } = useTranslation();
    const { colors } = useTheme();
    const [payments, setPayments] = useState(FPaymentItemsData);
    const [add, setAdd] = useState(false);

    const [success] = useState({
        street: true,
        city: true,
        postCode: true,
        country: true,
        contactName: true,
        email: true,
        phone: true,
    });

    const onAdd = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setAdd(!add);
    };

    return (
        <SafeAreaView
            style={BaseStyle.safeAreaView}
            edges={["right", "top", "left"]}
        >
            <Header
                title={t("send_money")}
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
                renderRight={() =>
                    add && (
                        <Text body1 style={{ color: colors.primaryDark }}>
                            {t("save")}
                        </Text>
                    )
                }
                onPressLeft={() => {
                    navigation.goBack();
                }}
            />
            <View style={{ paddingHorizontal: 20 }}>
                {payments.map((item, index) => (
                    <PaymentItem
                        key={item.id}
                        style={{ marginTop: 20 }}
                        id={item.id}
                        expiryDate={item.expiryDate}
                        iconName={item.iconName}
                        isPrimary={index == 0}
                        textPrimary={t("free")}
                        onPress={() => navigation.navigate("FChooseFriend")}
                    />
                ))}

                <TitleFintech
                    style={{ marginTop: 30 }}
                    title={t("recent_transactions")}
                    textMore={t("view_all")}
                    onPress={() => navigation.navigate("FChooseFriend")}
                />
                <View style={{ flexDirection: "row" }}>
                    {FRecentTransactions.map((item, index) => (
                        <View
                            key={index}
                            style={{
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <ProfileGridSmall
                                onPress={() =>
                                    navigation.navigate("FSendMoney")
                                }
                                image={item.image}
                                name={item.name}
                            />
                        </View>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
};

export default FBank;
