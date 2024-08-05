import Icon from "@components/Icon";
import PaymentItem from "@components/Payment/Item";
import { useTheme } from "@config";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import Modal from "react-native-modal";
import styles from "./styles";

const ModalChoosePayment = (props) => {
    const { colors } = useTheme();
    const { t } = useTranslation();
    const cardColor = colors.card;
    const { options, onApply, onSelectFilter, option, onChange, ...attrs } =
        props;

    return (
        <Modal swipeDirection={["down"]} style={styles.bottomModal} {...attrs}>
            <View
                style={[
                    styles.contentFilterBottom,
                    { backgroundColor: cardColor },
                ]}
            >
                <View style={styles.contentSwipeDown}>
                    <View style={styles.lineSwipeDown} />
                </View>
                {options.map((item, index) => (
                    <PaymentItem
                        onPress={() => onChange(item)}
                        key={item.id}
                        id={item.id}
                        expiryDate={item.expiryDate}
                        iconName={item.iconName}
                        isPrimary={true}
                        textPrimary={
                            item.id == option?.id ? (
                                <Icon name="check" size={18} />
                            ) : (
                                " "
                            )
                        }
                    />
                ))}
            </View>
        </Modal>
    );
};

ModalChoosePayment.defaultProps = {
    onChange: () => {},
    options: [],
    onApply: () => {},
    onSelectFilter: () => {},
};

ModalChoosePayment.propTypes = {
    onChange: PropTypes.func,
    option: PropTypes.object,
    options: PropTypes.array,
    onApply: PropTypes.func,
    onSelectFilter: PropTypes.func,
};

export default ModalChoosePayment;
