import Tag from "@components/Tag";
import TextInput from "@components/TextInput";
import { BaseColor, Typography, useTheme } from "@config";
import { FCurrencies } from "@data";
import FChooseCurrency from "@screens/FChooseCurrency";
import React, { useMemo, useState } from "react";
import { View } from "react-native";
import Modal from "react-native-modal";

const configCountry = {
    USD: {
        currencyCode: "USD",
        languageCode: "en-US",
        symbol: "$"
    },
    AUD: {
        currencyCode: "AUD",
        languageCode: "en-AU",
        symbol: "$"
    },
    KPW: {
        currencyCode: "KPW",
        languageCode: "ko-KR",
        symbol: "₩"
    },
    AED: {
        currencyCode: "AED",
        languageCode: "ar-AE",
        symbol: "د.إ"
    },
    CNY: {
        currencyCode: "CNY",
        languageCode: "zh-CN",
        symbol: "¥"
    },
    INR: {
        currencyCode: "INR",
        languageCode: "ar-DZ",
        symbol: "₹"
    },
    EUR: {
        currencyCode: "EUR",
        languageCode: "fr-FR",
        symbol: "€"
    },
    BRL: {
        currencyCode: "BRL",
        languageCode: "pt-BR",
        symbol: "R$"
    },
};

const MONEY = [
    {
        label: 20000,
        value: 20000,
    },
    {
        label: 50000,
        value: 50000,
    },
    {
        label: 100000,
        value: 100000,
    },
];

const formatter = (number = 0) => {
    try {
        return Number(parseFloat(number).toFixed(2)).toLocaleString();
    } catch (error) {
        return "0";
    }
};

const TextInputMoney = ({ value = 0, onChange = () => {} }) => {
    const [currency, setCurrency] = useState(FCurrencies[0]);
    const { colors } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);

    const symbol = useMemo(() => {
        const { symbol } = configCountry[currency.date];
        return symbol;
    }, [currency.date]);

    return (
        <View style={{ alignItems: "center" }}>
            <TextInput
                style={{
                    marginVertical: 15,
                    height: "auto",
                    fontSize: 18,
                    textAlign: "center",
                }}
                keyboardType="numeric"
                inputStyle={Typography.header}
                onChangeText={(text) => {
                    const number = Number(text.replace(/[^0-9.-]+/g, ""));
                    onChange(number);
                }}
                textAlign={"center"}
                autoCorrect={false}
                placeholder={"$0"}
                placeholderTextColor={BaseColor.grayColor}
                value={`${symbol}${value ? formatter(value) : ""}`}
                selectionColor={colors.primary}
                numberOfLines={1}
            />
            <View style={{ flexDirection: "row", paddingBottom: 20 }}>
                {MONEY.map((item, index) => (
                    <Tag
                        key={item.value}
                        onPress={() => onChange(item.value)}
                        style={{
                            flex: 1,
                            marginLeft: index == 0 ? 0 : 5,
                            borderRadius: 4,
                            backgroundColor: colors.card,
                        }}
                        gray
                        textStyle={{ color: colors.text, fontSize: 14 }}
                    >
                        {formatter(item.value)}
                    </Tag>
                ))}
            </View>
            <Tag
                chip
                style={{ paddingHorizontal: 20 }}
                onPress={() => setModalVisible(true)}
            >
                {currency.date}
            </Tag>
            <Modal
                isVisible={modalVisible}
                onSwipeComplete={() => {
                    setModalVisible(false);
                }}
                style={{ margin: 0 }}
                backdropOpacity={1}
                backdropColor={colors.background}
            >
                <FChooseCurrency
                    setModalVisible={setModalVisible}
                    value={currency}
                    onChange={(currency) => setCurrency(currency)}
                />
            </Modal>
        </View>
    );
};

export default TextInputMoney;
