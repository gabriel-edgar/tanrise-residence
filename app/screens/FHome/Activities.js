import { Transaction2Col } from "@components";
import { FActivites } from "@data";
import { useNavigation } from "@react-navigation/native";
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import TitleList from "./TitleList";

const Activities = () => {
    const navigation = useNavigation();
    const { t } = useTranslation();
    return (
        <Fragment>
            <TitleList
                title={t("activities")}
                textMore={t("view_all")}
                onPress={() => navigation.navigate("FActivity")}
            />
            {FActivites.map((item) => (
                <Transaction2Col
                    onPress={() => navigation.navigate("FHistoryDetail")}
                    key={item.id}
                    icon={item.icon}
                    name={item.name}
                    date={item.date}
                    status={item.status}
                    price={item.price}
                    isUp={item.isUp}
                    backgroundIcon={item.backgroundIcon}
                />
            ))}
        </Fragment>
    );
};

export default Activities;
