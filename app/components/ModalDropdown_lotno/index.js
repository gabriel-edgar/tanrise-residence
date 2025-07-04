import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Image from "@/components/Image";
import Text from "@/components/Text";
import TextInput from "@/components/TextInput";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import styles from "./styles";
import ModalSelector from "react-native-modal-selector";
import { BaseColor, BaseStyle, useTheme } from "@/config";

const ModalDropdown_lotno = (props) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const cardColor = colors.card;
  const { options, icon, onApply, onSelectFilter, ...attrs } = props;
  console.log("20 prop.data: ", props.data);

  return (
    <View {...attrs}>
      {props.data == null || props.data.length == 0 ? (
        <View {...attrs}>
          {props.label && (
            <Text style={{ color: "grey" }}>{`Select ${props.label}`}</Text>
          )}
          <TextInput
            style={[{ colors: "#000" }, _styles.input]}
            onFocus={() => this.selector.open()}
            //placeholder={"Lot No not Available. Please choose another Debtor."}
            placeholder={"Lot No not Available."}
            editable={false}
            placeholderTextColor="#a9a9a9"
            value={props.value}
          />
        </View>
      ) : (
        <View {...attrs}>
          {props.label && (
            <Text style={{ color: "grey" }}>{`Select ${props.label}`}</Text>
          )}

          <ModalSelector
            data={props.data}
            optionTextStyle={{ color: "#333" }}
            selectedItemTextStyle={{ color: "#3C85F1" }}
            accessible={true}
            keyExtractor={(item) => item.lot_no}
            labelExtractor={(item) => item.lot_no} //khusus untuk lotno
            cancelButtonAccessibilityLabel={"Cancel Button"}
            cancelText={"Cancel"}
            onChange={(option) => {
              props.onChange(option);
            }}
          >
            <TextInput
              style={[
                { colors: "#000" },
                _styles.input,
                {
                  backgroundColor:
                    colors.background == "#010101" ? "gray" : "#f5f5f5",
                },
              ]}
              onFocus={() => this.selector.open()}
              placeholder={props.label}
              editable={false}
              placeholderTextColor="#a9a9a9"
              value={props.value}
              icon={icon}
            />
          </ModalSelector>
        </View>
      )}
    </View>
  );
};

ModalDropdown_lotno.defaultProps = {
  options: [],
  onApply: () => {},
  onSelectFilter: () => {},
  icon: PropTypes.node,
};

ModalDropdown_lotno.propTypes = {
  options: PropTypes.array,
  onApply: PropTypes.func,
  onSelectFilter: PropTypes.func,
  icon: null,
};

export default ModalDropdown_lotno;

const _styles = StyleSheet.create({
  input: {
    height: 40,
    backgroundColor: "#f5f5f5",
    color: "black",
    paddingHorizontal: 10,
    marginBottom: 16,
    width: null,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
