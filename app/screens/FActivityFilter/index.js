import {
    Header,
    Icon,
    SafeAreaView,
    Button,
    PaymentOption,
    Text
} from "@components";
import { BaseColor, BaseStyle, useTheme } from "@config";
import { FPayment, FPeriod } from "@data";
import { useNavigation, useRoute } from "@react-navigation/native";
import { haveChildren } from "@utils";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, ScrollView, TouchableOpacity, View } from "react-native";
import styles from "./styles";

export default function FActivityFilter() {
    const { t, i18n } = useTranslation();
    const { colors } = useTheme();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [payments, setPayments] = useState(FPayment);
    const [payment, setPayment] = useState(FPayment[0]);
    const [periods, setPeriods] = useState(FPeriod);
    const [period, setPeriod] = useState(FPeriod[0]);

    return (
        <SafeAreaView style={BaseStyle.safeAreaView}>
            <Header
                title={t("activity_filter")}
                renderLeft={() => {
                    return (
                        <Icon
                            name="angle-left"
                            size={20}
                            enableRTL={true}
                            color={colors.text}
                        />
                    );
                }}
                onPressLeft={() => {
                    navigation.goBack();
                }}
            />
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                <Text title3>{t("payment")}</Text>
                <View style={{ paddingVertical: 20 }}>
                    {payments.map((item, index) => (
                        <PaymentOption
                            key={index}
                            style={{ paddingVertical: 10 }}
                            isIcon={false}
                            checked={item.id == payment.id}
                            title={item.title}
                            onPress={() => setPayment(item)}
                        />
                    ))}
                </View>
                <Text title3>{t("period")}</Text>
                <View style={{ paddingVertical: 20 }}>
                    {periods.map((item, index) => (
                        <PaymentOption
                            key={index}
                            style={{ paddingVertical: 10 }}
                            isIcon={false}
                            checked={item.id == period.id}
                            title={item.title}
                            onPress={() => setPeriod(item)}
                        />
                    ))}
                </View>
            </ScrollView>
            <Button
                style={{ marginHorizontal: 20, marginTop: 20 }}
                onPress={() => {
                    setLoading(true);
                    setTimeout(() => {
                        setLoading(false);
                        navigation.goBack();
                    }, 500);
                }}
                loading={loading}
            >{t("ok")}</Button>
        </SafeAreaView>
    );
}
